import {
  closeRefPop,
  loadReferences,
  refButton,
  refPopIsOpen,
} from "./reference-ui.js";

const DATA_URL = "public/data/biodiversity_data.csv";
const ASSET_BASE = "public/assets/";

/* Which half of the catalogue this page shows.

   flora.html carries <body data-bio-group="flora"> and fauna.html
   data-bio-group="fauna": the same script then filters the CSV to the
   categories of that group, builds the sidebar from them and adapts the wording.
   Without the attribute (or with an unknown value) the page shows the whole
   catalogue, exactly as before. */
const GROUPS = {
  flora: {
    label: "Flora",
    categories: ["Flora"],
    subject: "plant",
    subjectPlural: "plants",
    closeHint: "morphology, photographs and its conservation status",
  },
  fauna: {
    label: "Fauna",
    categories: ["Mammals", "Insects", "Reptiles", "Birds", "Amphibians", "Arachnids", "Other Invertebrates"],
    subject: "animal",
    subjectPlural: "animals",
    closeHint: "morphology, camera-trap footage and sound",
  },
};
const GROUP = GROUPS[(document.body.dataset.bioGroup || "").toLowerCase()] || null;
const PAGE_LABEL = GROUP ? GROUP.label : "Biodiversity";
const SUBJECT = GROUP ? GROUP.subject : "animal";

const els = {
  note: document.getElementById("bio-note"),
  tree: document.getElementById("category-tree"),
  grid: document.getElementById("species-grid"),
  empty: document.getElementById("empty-state"),
  title: document.getElementById("filter-title"),
  breadcrumb: document.getElementById("bio-breadcrumb"),
  count: document.getElementById("result-count"),
  modal: document.getElementById("species-modal"),
  panel: document.querySelector(".bio-modal-panel"),
  figure: document.getElementById("bio-figure"),
  image: document.getElementById("modal-image"),
  thumbs: document.getElementById("modal-thumbs"),
  players: document.getElementById("modal-players"),
  cat: document.getElementById("modal-cat"),
  name: document.getElementById("modal-name"),
  latin: document.getElementById("modal-latin"),
  french: document.getElementById("modal-french"),
  arabic: document.getElementById("modal-arabic"),
  status: document.getElementById("modal-status"),
  statusBadge: document.getElementById("modal-status-badge"),
  statusIucn: document.getElementById("modal-status-iucn"),
  desc: document.getElementById("modal-desc"),
  traits: document.getElementById("modal-traits"),
};

const state = {
  rows: [],
  taxonomy: [],
  references: [],
  filter: { category: null, subcategory: null },
  activeRow: null,
  gallery: [],
  galleryPosition: 0,
  lastFocus: null,
};

/* ------------------------------------------------------------------ CSV -- */
function parseCSV(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += ch;
      }
      continue;
    }
    if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch !== "\r") {
      field += ch;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows;
  return body
    .filter((cells) => cells.some((cell) => cell.trim() !== ""))
    .map((cells) => Object.fromEntries(header.map((key, i) => [key, cells[i] ?? ""])));
}

/* ------------------------------------------------------------- taxonomy -- */
/* Display order of the categories on the chips row and the sidebar.
    Anything not listed here keeps its natural (CSV) order after these. */
const CATEGORY_ORDER = [
  "Mammals",
  "Birds",
  "Reptiles",
  "Insects",
  "Amphibians",
  "Arachnids",
  "Other Invertebrates",
  "Flora",
];
const orderOf = (name) => {
  const i = CATEGORY_ORDER.indexOf(name);
  return i === -1 ? CATEGORY_ORDER.length : i;
};

function buildTaxonomy(rows) {
  const map = new Map();
  for (const row of rows) {
    if (!map.has(row.category)) {
      map.set(row.category, { name: row.category, count: 0, subcategories: [] });
    }
    const cat = map.get(row.category);
    cat.count++;
    let sub = cat.subcategories.find((s) => s.name === row.subcategory);
    if (!sub) {
      sub = { name: row.subcategory, count: 0 };
      cat.subcategories.push(sub);
    }
    sub.count++;
  }
  return [...map.values()].sort((a, b) => orderOf(a.name) - orderOf(b.name));
}

function filteredRows() {
  const { category, subcategory } = state.filter;
  return state.rows.filter(
    (row) =>
      (!category || row.category === category) &&
      (!subcategory || row.subcategory === subcategory)
  );
}

/* --------------------------------------------------------------- render -- */
/* A page showing a single group (the flora page) needs none of the chrome
   that only makes sense when there is a choice to make: no "all species"
   shortcut in the sidebar, no breadcrumb above the grid — each of them would
   just repeat the group's own name. */
const singleGroup = () => state.taxonomy.length < 2;

function renderTree() {
  const groups = [];

  // one group (the flora page) starts on its own rows, so the "all species"
  // shortcut would simply repeat what is already listed under it
  if (!singleGroup()) {
    const all = document.createElement("div");
    all.className = "cat-group";
    const allButton = document.createElement("button");
    allButton.type = "button";
    allButton.className = "cat-button all-button";
    allButton.dataset.category = "";
    allButton.innerHTML = `<span>All species</span><span class="count">${state.rows.length}</span>`;
    allButton.addEventListener("click", () => select({ category: null, subcategory: null }));
    all.appendChild(allButton);
    groups.push(all);
  }

  state.taxonomy.forEach((cat) => {
    const group = document.createElement("div");
    group.className = "cat-group";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "cat-button";
    button.dataset.category = cat.name;
    button.innerHTML = `<span>${cat.name}</span><span class="count">${cat.count}</span>`;
    button.addEventListener("click", () => toggleCategory(cat.name));
    group.appendChild(button);

    const list = document.createElement("ul");
    list.className = "sub-list";
    for (const sub of cat.subcategories) {
      const item = document.createElement("li");
      const subButton = document.createElement("button");
      subButton.type = "button";
      subButton.className = "sub-button";
      subButton.dataset.category = cat.name;
      subButton.dataset.subcategory = sub.name;
      subButton.innerHTML = `<span>${sub.name}</span><span class="count">${sub.count}</span>`;
      subButton.addEventListener("click", () =>
        select({ category: cat.name, subcategory: sub.name })
      );
      item.appendChild(subButton);
      list.appendChild(item);
    }
    group.appendChild(list);
    groups.push(group);
  });

  els.tree.replaceChildren(...groups);
}

function markActive() {
  const { category, subcategory } = state.filter;
  document.querySelectorAll(".cat-button").forEach((button) => {
    const isAll = button.dataset.category === "";
    // with one group there is no "all" row, so the group itself stands for it
    button.classList.toggle(
      "is-active",
      isAll
        ? !category
        : singleGroup()
          ? !subcategory
          : button.dataset.category === category && !subcategory
    );
  });  document.querySelectorAll(".sub-button").forEach((button) => {
    button.classList.toggle(
      "is-active",
      button.dataset.category === category && button.dataset.subcategory === subcategory
    );
  });
}

function mediaDots(row) {
  const dots = document.createElement("span");
  dots.className = "bio-media-dots";
  const flags = [
    ["Sound recording", row.category === "Birds" ? row.audio_filename : ""],
    ["Extra photographs", galleryOf(row).length > 1],
  ];
  for (const [label, value] of flags) {
    const dot = document.createElement("i");
    dot.classList.toggle("on", Boolean(value));
    dot.title = `${label}: ${value ? "available" : "not available"}`;
    dots.appendChild(dot);
  }
  return dots;
}

/* --------------------------------------------------- conservation status -- */
const IUCN_NAMES = {
  CR: "Critically Endangered",
  EN: "Endangered",
  VU: "Vulnerable",
  NT: "Near Threatened",
  LC: "Least Concern",
  EW: "Extinct in the Wild",
  RE: "Extinct",
  DD: "Data Deficient",
  NE: "Not Evaluated",
};

/** Protection label -> badge variant; the wording itself comes from the CSV. */
const PROTECTION_VARIANT = {
  "Protected & endangered": "endangered",
  Protected: "protected",
  Wild: "wild",
};

function protectionLevel(row) {
  return PROTECTION_VARIANT[(row.protection || "").trim()] || "wild";
}

function statusBadge(row) {
  const badge = document.createElement("span");
  badge.className = `bio-badge bio-badge--${protectionLevel(row)}`;
  badge.textContent = (row.protection || "Wild").trim();
  return badge;
}

/** "IUCN Red List: Vulnerable (VU)" — or why there is no code at all. */
function iucnSentence(row) {
  const code = (row.iucn || "").trim().toUpperCase();
  const note = (row.protection_note || "").trim();
  let sentence;
  if (code && IUCN_NAMES[code]) sentence = `IUCN Red List: ${IUCN_NAMES[code]} (${code})`;
  else if (code) sentence = `IUCN Red List: ${code}`;
  else sentence = "Not assessed on the IUCN Red List";
  return note ? `${sentence} · ${note}` : sentence;
}

function renderStatus(row) {
  els.statusBadge.className = `bio-badge bio-badge--${protectionLevel(row)}`;
  els.statusBadge.textContent = (row.protection || "Wild").trim();
  els.statusIucn.textContent = iucnSentence(row);
  els.status.hidden = false;
}

function cardFor(row) {
  const card = document.createElement("div");
  card.className = "bio-card";
  card.role = "button";
  card.tabIndex = 0;
  card.setAttribute("aria-label", `Open details for ${row.name_en}`);

  const figure = document.createElement("figure");
  if (row.image_filename) {
    const img = document.createElement("img");
    img.src = ASSET_BASE + "images/" + row.image_filename;
    img.alt = `${row.name_en} (${row.name_latin})`;
    img.loading = "lazy";
    img.decoding = "async";
    img.addEventListener("error", () => {
      figure.replaceChildren(placeholder(row.name_en));
    });
    figure.appendChild(img);
  } else {
    figure.appendChild(placeholder(row.name_en));
  }

  const body = document.createElement("div");
  body.className = "bio-card-body";
  const tag = document.createElement("span");
  tag.className = "bio-tag";
  tag.textContent = row.subcategory;
  const heading = document.createElement("h3");
  heading.textContent = row.name_en;
  const latin = document.createElement("span");
  latin.className = "latin";
  latin.textContent = row.name_latin;
  const arabic = document.createElement("span");
  arabic.className = "arabic";
  arabic.lang = "ar";
  arabic.dir = "rtl";
  arabic.textContent = row.name_ar;
  body.append(tag, heading, latin, arabic, mediaDots(row));

  card.append(figure, body);

  // conservation badge, top-left of the photo (the credit icon keeps the corner)
  const badge = statusBadge(row);
  badge.classList.add("bio-badge--card");
  card.appendChild(badge);
  card.addEventListener("click", () => openModal(row, card));
  card.addEventListener("keydown", (event) => {
    if (event.target !== card) return; // the reference icon handles its own keys
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(row, card);
    }
  });

  // every card also carries its own reference icon (photo + clip credits)
  const photoRef = creditFor(row, "image");
  if (photoRef) {
    card.appendChild(
      refButton(photoRef, `Photograph — ${photoRef.label || row.name_en}`, "bio-ref-button--on-photo")
    );
  }
  return card;
}

function placeholder(name) {
  const box = document.createElement("div");
  box.className = "placeholder";
  box.textContent = name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return box;
}

function renderGrid() {
  const rows = filteredRows();
  els.grid.replaceChildren(...rows.map(cardFor));
  els.empty.hidden = rows.length > 0;

  const { category, subcategory } = state.filter;
  els.title.textContent = subcategory || category || "All species";
  els.breadcrumb.textContent = category
    ? `${PAGE_LABEL} · ${category}`
    : `${PAGE_LABEL} · all groups`;
  // with one group the line only ever repeats the group's own name
  els.breadcrumb.hidden = singleGroup();
  els.count.textContent = `${rows.length} of ${state.rows.length} species`;

  markActive();
}

function select(filter) {
  state.filter = filter;
  renderGrid();
}

/** Clicking the category you are already in takes you back to the full list. */
function toggleCategory(category) {
  if (state.filter.category === category && !state.filter.subcategory) {
    select({ category: null, subcategory: null });
  } else {
    select({ category, subcategory: null });
  }
}

/* ----------------------------------------------------------- references -- */
function referenceFor(kind, species) {
  return (
    state.references.find(
      (entry) => entry.kind === kind && (!species || entry.species === species)
    ) || null
  );
}

/** Media files are named after the species slug (acacia-raddiana.png …). */
function slugOf(row) {
  const file =
    row.image_filename ||
    (row.video_morning_filename || "").replace(/_(morning|night)\.\w+$/, "") ||
    row.video_night_filename ||
    row.audio_filename ||
    "";
  return file.replace(/\.\w+$/, "").replace(/_(morning|night)$/, "");
}

/** Registry entry for one media file of a species row.
    For a video, `flavour` is "morning" / "night"; for the photographs it is
    the picture number — no flavour means the main photograph (image:<slug>). */
function creditFor(row, kind, flavour) {
  const slug = slugOf(row);
  if (flavour === undefined || flavour === null || flavour === "") {
    return referenceFor(kind, slug);
  }
  return (
    state.references.find(
      (entry) =>
        entry.kind === kind &&
        entry.species === slug &&
        (kind === "video"
          ? entry.id.endsWith(`:${flavour}`)
          : entry.id === `${kind}:${slug}:${flavour}`)
    ) || null
  );
}

/* -------------------------------------------------------------- gallery -- */
/** Every photograph of a species: the main one first, then the extras. */
function galleryOf(row) {
  const files = [];
  if (row.image_filename) files.push({ file: row.image_filename, index: 0 });
  for (const raw of String(row.image_gallery || "").split(";")) {
    const file = raw.trim();
    if (!file) continue;
    const match = file.match(/-(\d+)\.\w+$/);
    files.push({ file, index: match ? Number(match[1]) : files.length + 1 });
  }
  return files;
}

function photoRefFor(row, entry) {
  if (!entry) return null;
  return refButton(
    entry,
    `Photograph — ${entry.label || row.name_en}`,
    "bio-ref-button--float"
  );
}

/** Swap the figure to one picture of the gallery; every picture keeps its
    own credit icon. */
function showPhoto(position) {
  const row = state.activeRow;
  const entry = state.gallery[position];
  if (!row || !entry) return;
  state.galleryPosition = position;

  els.image.src = ASSET_BASE + "images/" + entry.file;
  els.image.alt = `${row.name_en} — ${row.name_latin}`;
  els.image.hidden = false;

  renderFigureHint(true);
  renderFigureRef(row, entry);

  els.thumbs.querySelectorAll(".bio-thumb").forEach((thumb, i) => {
    const active = i === position;
    thumb.classList.toggle("is-active", active);
    thumb.setAttribute("aria-selected", String(active));
    thumb.tabIndex = active ? 0 : -1;
  });
}

/** The little credit icon floating on the figure, for the picture shown. */
function renderFigureRef(row, entry) {
  els.figure.querySelectorAll(".bio-ref-button").forEach((node) => node.remove());
  if (!entry) return;
  const credit = entry.index
    ? creditFor(row, "image", entry.index)
    : creditFor(row, "image");
  const button = photoRefFor(row, credit);
  if (button) els.figure.appendChild(button);
}

function renderThumbs(row) {
  const gallery = galleryOf(row);
  state.gallery = gallery;
  state.galleryPosition = 0;
  els.thumbs.replaceChildren();
  if (gallery.length < 2) {
    els.thumbs.hidden = true;
    return;
  }
  els.thumbs.hidden = false;
  gallery.forEach((entry, position) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "bio-thumb";
    thumb.setAttribute("role", "tab");
    thumb.setAttribute(
      "aria-label",
      position === 0 ? "Main photograph" : `Photograph ${position + 1} of ${gallery.length}`
    );
    const img = document.createElement("img");
    img.src = ASSET_BASE + "images/" + entry.file;
    img.alt = "";
    img.loading = "lazy";
    img.decoding = "async";
    thumb.appendChild(img);
    thumb.addEventListener("click", () => showPhoto(position));
    thumb.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        const step = event.key === "ArrowRight" ? 1 : -1;
        const next = (position + step + gallery.length) % gallery.length;
        showPhoto(next);
        els.thumbs.querySelectorAll(".bio-thumb")[next].focus();
      }
    });
    els.thumbs.appendChild(thumb);
  });
  showPhoto(0);
}

/* ---------------------------------------------------------------- modal -- */
function parseMorphology(row) {
  try {
    const data = JSON.parse(row.morphology_data);
    return { summary: Array.isArray(data.summary) ? data.summary : [] };
  } catch (error) {
    console.warn("morphology_data is not valid JSON for", row.name_en, error);
    return { summary: [] };
  }
}

function renderTraits(morphology) {
  els.traits.replaceChildren(
    ...morphology.summary.map((trait) => {
      const wrap = document.createElement("div");
      const dt = document.createElement("dt");
      dt.textContent = trait.label;
      const dd = document.createElement("dd");
      dd.textContent = trait.value;
      wrap.append(dt, dd);
      return wrap;
    })
  );
}

/** Caption hint under the figure: only needed when the species has no picture. */
function renderFigureHint(hasImage) {
  document.getElementById("figure-hint").textContent = hasImage
    ? ""
    : "No image on file for this species.";
}

function player(label, build, note, refEntry) {
  const box = document.createElement("section");
  box.className = "bio-player";
  const head = document.createElement("div");
  head.className = "bio-player-head";
  const heading = document.createElement("h4");
  heading.textContent = label;
  head.appendChild(heading);
  if (refEntry) {
    head.appendChild(
      refButton(refEntry, `${label} — ${refEntry.label || ""}`, "bio-ref-button--sm")
    );
  }
  box.append(head, build());
  if (note) {
    const caption = document.createElement("p");
    caption.className = "bio-player-note";
    caption.textContent = note;
    box.appendChild(caption);
  }
  return box;
}

function renderPlayers(row) {
  const blocks = [];
  
  // Only display audio players if the species category is "Birds" and an audio file exists
  if (row.category === "Birds" && row.audio_filename) {
    blocks.push(
      player(
        "Call / sound recording",
        () => {
          const audio = document.createElement("audio");
          audio.src = ASSET_BASE + "audio/" + row.audio_filename;
          audio.controls = true;
          audio.preload = "none";
          return audio;
        },
        `Recording · ${row.audio_filename}`,
        creditFor(row, "audio")
      )
    );
  }
  
  els.players.replaceChildren(...blocks);
}

function openModal(row, trigger) {
  const morphology = parseMorphology(row);
  state.activeRow = row;
  state.lastFocus = trigger || document.activeElement;

  els.cat.textContent = `${row.category} · ${row.subcategory}`;
  els.name.textContent = row.name_en;
  els.latin.textContent = row.name_latin;
  if (els.french) {
    // the French vernacular name, when Wikidata confirmed one (name_fr)
    els.french.textContent = row.name_fr || "";
    els.french.hidden = !row.name_fr;
  }
  els.arabic.textContent = row.name_ar;
  renderStatus(row);
  els.desc.textContent = row.description;
  renderTraits(morphology);

  const hasImage = Boolean(row.image_filename);
  if (hasImage) {
    els.image.src = ASSET_BASE + "images/" + row.image_filename;
    els.image.alt = `${row.name_en} — ${row.name_latin}`;
    els.image.hidden = false;
    els.image.onerror = () => {
      els.image.hidden = true;
      renderFigureHint(false);
    };
  } else {
    els.image.hidden = true;
    els.image.removeAttribute("src");
  }
  renderFigureHint(hasImage);
  renderPlayers(row);

  // one info icon per unique element: every photograph gets its own
  renderThumbs(row); // sets the figure and, when there is more than one
  // picture, fills the thumbnail strip (which re-applies the credit icon)
  els.figure.querySelectorAll(".bio-ref-button").forEach((node) => node.remove());
  if (hasImage) renderFigureRef(row, state.gallery[0] || null);

  els.modal.hidden = false;
  document.body.style.overflow = "hidden";
  els.panel.scrollTop = 0;
  els.panel.focus();
}

function closeModal() {
  if (els.modal.hidden) return;
  els.modal.hidden = true;
  document.body.style.overflow = "";
  els.image.removeAttribute("src");
  els.players.replaceChildren();
  els.thumbs.replaceChildren();
  els.thumbs.hidden = true;
  state.gallery = [];
  els.figure.querySelectorAll(".bio-ref-button").forEach((node) => node.remove());
  closeRefPop();
  state.activeRow = null;
  if (state.lastFocus && document.contains(state.lastFocus)) {
    state.lastFocus.focus();
  }
}

document.querySelectorAll("[data-close]").forEach((node) =>
  node.addEventListener("click", closeModal)
);
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (refPopIsOpen()) closeRefPop(); // popup first, then the modal
  else closeModal();
});

/* ----------------------------------------------------------------- boot -- */
async function boot() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Could not read ${DATA_URL} (${response.status})`);
    const text = await response.text();
    state.rows = parseCSV(text);
    if (GROUP) {
      state.rows = state.rows.filter((row) => GROUP.categories.includes(row.category));
    }
    if (!state.rows.length) throw new Error("The species CSV is empty for this page.");
  } catch (error) {
    console.error(error);
    els.note.textContent =
      "Could not load the species data. Serve the folder with `npm start` and reload — " +
      "browsers block fetch() on file:// pages.";
    els.empty.hidden = false;
    els.empty.textContent = "Species list unavailable.";
    return;
  }

  state.taxonomy = buildTaxonomy(state.rows);
  // reference registry first: cards and players show their own info icon
  state.references = await loadReferences();

  els.note.textContent = "";
  renderTree();
  renderGrid();
  applyDeepLink();
}

/** Deep links from the other pages: fauna.html?category=Mammals&
    subcategory=Herbivores, or fauna.html?species=scimitar-oryx which opens
    that species' card straight away. */
function applyDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const wantCategory = (params.get("category") || "").trim();
  const wantSub = (params.get("subcategory") || "").trim();
  const wantSpecies = (params.get("species") || "").trim();
  if (wantCategory) {
    const cat = state.taxonomy.find((item) => item.name === wantCategory);
    if (cat) {
      select({
        category: wantCategory,
        subcategory: cat.subcategories.some((item) => item.name === wantSub)
          ? wantSub
          : null,
      });
    }
  }
  if (wantSpecies) {
    const row = state.rows.find((item) => slugOf(item) === wantSpecies);
    if (row) openModal(row, null);
  }
}

boot();
