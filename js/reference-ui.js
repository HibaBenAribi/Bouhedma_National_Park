/* Shared attribution UI: loads public/data/references.json, renders the
   per-asset "i" icon and its popup, and builds the tables of the
   standalone References page (references.html). */

export const REFERENCES_URL = "public/data/references.json";

export const REFERENCE_KINDS = [
  ["paper", "Scientific papers of the park"],
  ["image", "Photographs"],
  ["audio", "Sound recordings"],
];

const REF_ICON = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 4.2a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Zm1.6 11.3h-3.2v-1.4h1.1v-4h-1.1V7.7h2.2v5.4h1.1v1.4Z"/>
</svg>`;

let pop = null; // the popup element of the current page
let trigger = null; // icon that opened it
let wired = false;

function popupEl() {
  if (!pop) pop = document.getElementById("ref-pop");
  return pop;
}

export function closeRefPop() {
  const node = popupEl();
  if (!node || node.hidden) return;
  node.hidden = true;
  node.replaceChildren();
  if (trigger) {
    trigger.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    trigger = null;
  }
}

export function refPopIsOpen() {
  const node = popupEl();
  return Boolean(node && !node.hidden);
}

function wireGlobalListeners() {
  if (wired) return;
  wired = true;
  document.addEventListener("click", (event) => {
    if (!refPopIsOpen()) return;
    if (event.target.closest("#ref-pop") || event.target.closest(".bio-ref-button")) return;
    closeRefPop();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && refPopIsOpen()) {
      event.stopPropagation();
      closeRefPop();
    }
  });
  window.addEventListener("resize", closeRefPop);
  window.addEventListener("scroll", closeRefPop, true);
}

function openRefPop(button, entry, what) {
  const node = popupEl();
  if (!node) return;
  if (trigger === button) {
    closeRefPop(); // second click closes
    return;
  }
  closeRefPop();

  const head = document.createElement("h4");
  head.textContent = what || "Reference & copyright";

  const rows = [
    ["Reference", entry.reference_title || ""],
    ["Sources", (entry.sources || []).length ? "1" : ""],
    ["Copyright type", entry.license_type || ""],
    ["Copyright holder", entry.copyright_holder || ""],
    ["Notes", entry.notes || ""],
  ];
  const dl = document.createElement("dl");
  for (const [label, value] of rows) {
    if (!value) continue;
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    if (label === "Reference" && entry.reference) {
      const link = document.createElement("a");
      link.href = entry.reference;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = value;
      dd.appendChild(link);
    } else if (label === "Sources") {
      // both official photograph sources, listed on every iNaturalist row
      (entry.sources || []).forEach((source, index) => {
        if (index) dd.appendChild(document.createElement("br"));
        const link = document.createElement("a");
        link.href = source.url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = source.title || source.url;
        dd.appendChild(link);
      });
    } else {
      dd.textContent = value;
    }
    dl.append(dt, dd);
  }

  const file = document.createElement("p");
  file.className = "bio-ref-pop-file";
  file.textContent = entry.asset || "";

  node.replaceChildren(head, dl, file);
  node.hidden = false;

  // position next to the icon, clamped to the viewport
  const box = button.getBoundingClientRect();
  const size = node.getBoundingClientRect();
  const margin = 10;
  let left = box.right + margin;
  if (left + size.width > window.innerWidth - 8) {
    left = Math.max(8, box.left - size.width - margin);
  }
  let top = box.top;
  if (top + size.height > window.innerHeight - 8) {
    top = Math.max(8, window.innerHeight - size.height - 8);
  }
  node.style.left = `${Math.round(left)}px`;
  node.style.top = `${Math.round(top)}px`;

  trigger = button;
  button.classList.add("is-open");
  button.setAttribute("aria-expanded", "true");
}

/** Small circular "i" button that opens the reference popup for one asset. */
export function refButton(entry, what, extraClass) {
  wireGlobalListeners();
  const button = document.createElement("button");
  button.type = "button";
  button.className = "bio-ref-button" + (extraClass ? ` ${extraClass}` : "");
  button.innerHTML = REF_ICON;
  button.setAttribute("aria-label", `Reference and copyright: ${what}`);
  button.setAttribute("aria-expanded", "false");
  button.title = "Reference & copyright";
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openRefPop(button, entry, what);
  });
  return button;
}

/** Fetch the rows of the attribution registry.
    Returns [] when the file cannot be read (file://). */
export async function loadReferences() {
  try {
    const response = await fetch(REFERENCES_URL);
    if (!response.ok) throw new Error(`${REFERENCES_URL} → ${response.status}`);
    const document_ = await response.json();
    return Array.isArray(document_.items) ? document_.items : [];
  } catch (error) {
    console.warn("Could not load the reference registry:", error);
    return [];
  }
}

/** Build the grouped tables of the References page into `container`. */
export function renderReferenceTables(container, items) {
  if (!container) return;
  if (!items.length) {
    container.innerHTML =
      '<p class="bio-empty">No reference registry found — run ' +
      "<code>python scripts/generate_media_references.py</code> to create " +
      "<code>public/data/references.json</code>.</p>";
    return;
  }

  const groups = new Map();
  for (const entry of items) {
    if (!groups.has(entry.kind)) groups.set(entry.kind, []);
    groups.get(entry.kind).push(entry);
  }

  const sections = REFERENCE_KINDS.filter(([kind]) => groups.has(kind)).map(
    ([kind, heading]) => {
      const group = groups.get(kind);
      const section = document.createElement("section");
      section.className = "bio-ref-group";

      const title = document.createElement("h3");
      title.textContent = `${heading} (${group.length})`;
      section.appendChild(title);

      const table = document.createElement("table");
      table.className = "bio-ref-table";
      table.innerHTML =
        "<thead><tr><th>Content</th><th>Reference</th>" +
        "<th>Copyright type</th><th>Copyright holder</th>" +
        '<th class="ref-action"><span class="sr-only">Show</span></th></tr></thead>';
      const body = document.createElement("tbody");

      for (const item of group) {
        const row = document.createElement("tr");
        if (item.missing) row.className = "is-missing";

        const cell = (label, build) => {
          const td = document.createElement("td");
          td.dataset.label = label;
          build(td);
          return td;
        };
        const name = cell("Content", (td) => {
          const strong = document.createElement("span");
          strong.textContent = item.label || item.id;
          td.appendChild(strong);
          if (item.asset) {
            const file = document.createElement("small");
            file.textContent = item.asset;
            td.appendChild(file);
          }
          if (item.missing) {
            const warn = document.createElement("small");
            warn.className = "bio-ref-warn";
            warn.textContent = "local file missing";
            td.appendChild(warn);
          }
        });
        const source = cell("Reference", (td) => {
          if (item.reference) {
            const link = document.createElement("a");
            link.href = item.reference;
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = item.reference_title || item.reference;
            td.appendChild(link);
          } else {
            td.textContent = "—";
          }
          // every iNaturalist photograph keeps both official source links here
          const extra = (item.sources || []).filter((s) => s.url !== item.reference);
          if (extra.length) {
            const more = document.createElement("small");
            more.className = "bio-ref-more";
            more.append("also: ");
            extra.forEach((s, index) => {
              if (index) more.append(" · ");
              const link = document.createElement("a");
              link.href = s.url;
              link.target = "_blank";
              link.rel = "noopener";
              link.textContent = s.short || s.title || s.url;
              more.appendChild(link);
            });
            td.appendChild(more);
          }
        });
        const licence = cell("Copyright type", (td) => {
          td.textContent = item.license_type || "—";
        });
        const holder = cell("Copyright holder", (td) => {
          td.textContent = item.copyright_holder || "—";
        });
        row.append(name, source, licence, holder);
        row.appendChild(
          cell("Details", (td) => {
            td.className = "ref-action";
            td.appendChild(refButton(item, item.label || item.id));
          })
        );
        body.appendChild(row);
      }

      table.appendChild(body);
      section.appendChild(table);
      return section;
    }
  );

  container.replaceChildren(...sections);
}