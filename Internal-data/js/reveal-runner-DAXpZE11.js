function setImportant(element, properties) {
  for (const [name, value] of Object.entries(properties)) element.style.setProperty(name, value, "important");
}

let activeDeckCleanup = () => {};

function disposeDeck() {
  activeDeckCleanup();
}

function splitIntoPages(block, maxCharacters) {
  const pages = [];
  let heading = null;
  let nodes = [];
  let size = 0;
  const flush = () => {
    if (nodes.length) pages.push({ heading, nodes });
    nodes = []; size = 0;
  };
  const add = (node) => {
    const length = node.textContent.trim().length;
    if (nodes.length && size + length > maxCharacters) flush();
    nodes.push(node); size += length;
  };
  for (const node of [...block.children]) {
    if (node.matches("figure, .deck-figure, .deck-diagram, .deck-figures, img")) continue;
    if (/^H[1-3]$/.test(node.tagName)) {
      flush(); heading = node.cloneNode(true); continue;
    }
    if (node.matches("ul, ol")) {
      let list = node.cloneNode(false);
      for (const item of [...node.children]) {
        const copy = item.cloneNode(true);
        const itemSize = copy.textContent.trim().length;
        if (list.children.length && list.textContent.length + itemSize > maxCharacters) {
          add(list);
          list = node.cloneNode(false);
        }
        list.append(copy);
      }
      if (list.children.length) add(list);
      continue;
    }
    if (node.matches("p") && node.textContent.length > maxCharacters) {
      const sentences = node.textContent.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [node.textContent];
      let paragraph = node.cloneNode(false);
      for (const sentence of sentences) {
        const trimmed = sentence.trim();
        if (paragraph.textContent && paragraph.textContent.length + trimmed.length > maxCharacters) {
          add(paragraph); paragraph = node.cloneNode(false);
        }
        paragraph.append(document.createTextNode(`${paragraph.textContent ? " " : ""}${trimmed}`));
      }
      if (paragraph.textContent) add(paragraph);
      continue;
    }
    add(node.cloneNode(true));
  }
  flush();
  return pages.length ? pages : [{ heading, nodes: [] }];
}

function svgElement(name, attributes = {}, text = "") {
  const element = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, String(value));
  if (text) element.textContent = text;
  return element;
}

async function renderPamSitesChart(figure, lang) {
  try {
    const response = await fetch("/Public-data/layers/pam-acoustic-network.geojson");
    if (!response.ok) throw new Error(`Station data unavailable: ${response.status}`);
    const data = await response.json();
    const sites = data.features.filter(feature => feature.properties.layer === "pam_sites");
    if (!sites.length) throw new Error("No proposed recorder stations found");
    const labels = {
      en: { x: "Distance to water (m)", y: "Dry-season SAVI", title: "Proposed recorder stations by distance to water and dry-season vegetation index" },
      fr: { x: "Distance à l’eau (m)", y: "SAVI en saison sèche", title: "Stations proposées selon la distance à l’eau et l’indice de végétation en saison sèche" },
      ar: { x: "المسافة إلى الماء (م)", y: "SAVI في موسم الجفاف", title: "مواقع أجهزة التسجيل المقترحة حسب المسافة إلى الماء ومؤشر الغطاء النباتي" }
    }[lang] || { x: "Distance to water (m)", y: "Dry-season SAVI", title: "Proposed recorder stations by distance to water and dry-season vegetation index" };
    const svg = svgElement("svg", { class: "pam-sites-chart__svg", viewBox: "0 0 600 360", role: "img", "aria-label": labels.title, preserveAspectRatio: "xMidYMid meet" });
    const left = 72, right = 20, top = 24, bottom = 66, width = 600 - left - right, height = 360 - top - bottom;
    const x = value => left + Math.max(0, Math.min(3000, value)) / 3000 * width;
    const y = value => top + height - Math.max(0, Math.min(.55, value)) / .55 * height;
    for (let tick = 0; tick <= 3000; tick += 500) {
      const px = x(tick);
      svg.append(svgElement("line", { x1: px, y1: top, x2: px, y2: top + height, stroke: "#e5e0d4", "stroke-width": 1 }));
      svg.append(svgElement("text", { x: px, y: top + height + 20, fill: "#77746c", "font-size": 14, "text-anchor": "middle" }, tick.toLocaleString(lang)));
    }
    for (let tick = 0; tick <= .5; tick += .1) {
      const py = y(tick);
      svg.append(svgElement("line", { x1: left, y1: py, x2: left + width, y2: py, stroke: "#e5e0d4", "stroke-width": 1 }));
      svg.append(svgElement("text", { x: left - 10, y: py + 5, fill: "#77746c", "font-size": 14, "text-anchor": "end" }, tick.toFixed(1)));
    }
    svg.append(svgElement("line", { x1: left, y1: top, x2: left, y2: top + height, stroke: "#77746c", "stroke-width": 1.5 }));
    svg.append(svgElement("line", { x1: left, y1: top + height, x2: left + width, y2: top + height, stroke: "#77746c", "stroke-width": 1.5 }));
    svg.append(svgElement("text", { x: left + width / 2, y: 337, fill: "#685f50", "font-size": 15, "text-anchor": "middle" }, labels.x));
    svg.append(svgElement("text", { x: 19, y: top + height / 2, fill: "#685f50", "font-size": 14, "text-anchor": "middle", transform: `rotate(-90 19 ${top + height / 2})` }, labels.y));
    for (const feature of sites) {
      const properties = feature.properties;
      const distance = Number(properties.DIST_WATER_M ?? properties.DIST_WATER);
      const savi = Number(properties.SAVI_DRY);
      if (!Number.isFinite(distance) || !Number.isFinite(savi)) continue;
      const point = svgElement("circle", { cx: x(distance), cy: y(savi), r: 6, fill: "#4f8245", stroke: "#fffdf7", "stroke-width": 2 });
      point.append(svgElement("title", {}, `${properties.SITE_ID || "Station"}: ${Math.round(distance)} m, SAVI ${savi.toFixed(2)}`));
      svg.append(point);
    }
    figure.insertBefore(svg, figure.querySelector("figcaption"));
  } catch (error) {
    figure.setAttribute("data-visual-error", "chart");
    figure.insertBefore(document.createTextNode("Station chart could not be loaded."), figure.querySelector("figcaption"));
    console.error(error);
  }
}

function fft(real, imaginary) {
  const n = real.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [real[i], real[j]] = [real[j], real[i]]; [imaginary[i], imaginary[j]] = [imaginary[j], imaginary[i]]; }
  }
  for (let size = 2; size <= n; size <<= 1) {
    const angle = -2 * Math.PI / size, stepReal = Math.cos(angle), stepImaginary = Math.sin(angle);
    for (let start = 0; start < n; start += size) {
      let wr = 1, wi = 0;
      for (let offset = 0; offset < size / 2; offset++) {
        const even = start + offset, odd = even + size / 2;
        const tr = wr * real[odd] - wi * imaginary[odd], ti = wr * imaginary[odd] + wi * real[odd];
        real[odd] = real[even] - tr; imaginary[odd] = imaginary[even] - ti;
        real[even] += tr; imaginary[even] += ti;
        [wr, wi] = [wr * stepReal - wi * stepImaginary, wr * stepImaginary + wi * stepReal];
      }
    }
  }
}

async function renderSpectrogram(canvas) {
  let context;
  try {
    const response = await fetch(canvas.dataset.spectrogram);
    if (!response.ok) throw new Error(`Reference audio unavailable: ${response.status}`);
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) throw new Error("Web Audio is unavailable");
    context = new AudioContextClass();
    const buffer = await context.decodeAudioData(await response.arrayBuffer());
    const samples = buffer.getChannelData(0);
    const size = 1024, hop = 512, width = 1200, height = 360;
    const real = new Float32Array(size), imaginary = new Float32Array(size);
    const image = document.createElement("canvas"); image.width = width; image.height = height;
    const drawing = image.getContext("2d"), pixels = drawing.createImageData(width, height);
    const maxStart = Math.max(0, samples.length - size);
    for (let column = 0; column < width; column++) {
      const start = Math.floor(column / Math.max(1, width - 1) * maxStart);
      for (let i = 0; i < size; i++) { real[i] = (samples[start + i] || 0) * (.5 - .5 * Math.cos(2 * Math.PI * i / (size - 1))); imaginary[i] = 0; }
      fft(real, imaginary);
      for (let row = 0; row < height; row++) {
        const frequency = 80 * Math.pow(100, 1 - row / (height - 1));
        const bin = Math.max(1, Math.min(size / 2 - 1, Math.round(frequency * size / buffer.sampleRate)));
        const magnitude = Math.hypot(real[bin], imaginary[bin]) / size;
        const level = Math.max(0, Math.min(1, (20 * Math.log10(magnitude + 1e-7) + 82) / 62));
        const index = (row * width + column) * 4;
        pixels.data[index] = Math.round(250 - level * 165);
        pixels.data[index + 1] = Math.round(244 - level * 121);
        pixels.data[index + 2] = Math.round(222 - level * 35);
        pixels.data[index + 3] = 255;
      }
    }
    drawing.putImageData(pixels, 0, 0);
    canvas.width = width; canvas.height = height;
    canvas.getContext("2d").drawImage(image, 0, 0);
  } catch (error) {
    canvas.closest(".deck-spectrogram__frame")?.setAttribute("data-visual-error", "spectrogram");
    console.error(error);
  } finally {
    if (context && context.state !== "closed") await context.close().catch(() => {});
  }
}

async function hydrateProtocolVisuals(root, lang) {
  await Promise.all([
    ...[...root.querySelectorAll('[data-component="pam-sites-chart"]')].map(figure => renderPamSitesChart(figure, lang)),
    ...[...root.querySelectorAll("canvas[data-spectrogram]")].map(renderSpectrogram)
  ]);
}
async function mountDeck(root, content, lang = "en") {
  disposeDeck();
  const slides = root.querySelector(".slides");
  const dialog = root.closest("dialog");
  const previous = dialog?.querySelector("[data-protocol-prev]");
  const next = dialog?.querySelector("[data-protocol-next]");
  const position = dialog?.querySelector("[data-protocol-position]");
  if (!slides || !previous || !next || !position) throw new Error("Protocol dialog is missing its navigation controls");
  const cleanContent = content.replace(/<!-- Code injected by live-server -->[\s\S]*?<\/script>\s*/gi, "");
  const parsed = new DOMParser().parseFromString(`<main>${cleanContent.replaceAll("data/media/", "/Public-data/media/")}</main>`, "text/html");
  const sourceSections = [...parsed.querySelectorAll("main section[data-section]")].filter(section => [...section.children].some(child => child.matches("[lang]")));
  if (!sourceSections.length) throw new Error("Protocol content contains no sections");
  const fallbackFigure = parsed.querySelector("figure, .deck-figure, .deck-diagram");
  const maxCharacters = Math.max(500, Math.min(1300, Math.round((root.clientWidth * root.clientHeight) / 1400)));
  const sectionPages = [];
  for (const source of sourceSections) {
    const selected = source.querySelector(`[lang="${lang}"]`) || source.querySelector('[lang="en"]') || source.firstElementChild;
    if (!selected) continue;
    const figures = [...selected.querySelectorAll("figure, .deck-figure, .deck-diagram")];
    if (!figures.length && fallbackFigure) figures.push(fallbackFigure);
    const pages = splitIntoPages(selected, maxCharacters);
    const pageCount = Math.max(pages.length, figures.length);
    for (let pageIndex = 0; pageIndex < pageCount; pageIndex++) {
      const pageData = pages[pageIndex] ?? { heading: null, nodes: [] };
      const figure = figures[Math.min(pageIndex, figures.length - 1)];
      const page = document.createElement("section");
      page.dataset.section = source.dataset.section || "protocol";
      const body = document.createElement("div");
      body.lang = selected.lang || lang;
      body.dir = body.lang === "ar" ? "rtl" : "ltr";
      const text = document.createElement("div");
      text.className = "protocol-slide__text";
      if (pageData.heading) text.append(pageData.heading.cloneNode(true));
      for (const node of pageData.nodes) text.append(node.cloneNode(true));
      body.append(text);
      if (figure) body.append(figure.cloneNode(true));
      page.append(body);
      setImportant(page, { position: "relative", display: "block", visibility: "visible", opacity: "1", transform: "none", width: "100%", height: "100%", "box-sizing": "border-box", overflow: "hidden", left: "auto", top: "auto", margin: "0" });
      sectionPages.push(page);
    }
  }
  slides.replaceChildren(...sectionPages);
  await hydrateProtocolVisuals(slides, lang);
  setImportant(root, { display: "block", overflow: "hidden", "min-height": "0" });
  setImportant(slides, { position: "static", display: "block", width: "100%", height: "100%", transform: "none", overflow: "hidden" });
  const labels = { en: ["Previous", "Next", "Protocol navigation"], fr: ["Previous", "Next", "Protocol navigation"], ar: ["Previous", "Next", "Protocol navigation"] }[lang];
  previous.textContent = labels[0]; previous.setAttribute("aria-label", labels[0]);
  next.textContent = labels[1]; next.setAttribute("aria-label", labels[1]);
  dialog.querySelector(".protocol-modal__nav")?.setAttribute("aria-label", labels[2]);
  let activeIndex = 0;
  const showSection = (index) => {
    activeIndex = Math.max(0, Math.min(index, sectionPages.length - 1));
    sectionPages.forEach((section, i) => { const active = i === activeIndex; section.hidden = !active; section.style.setProperty("display", active ? "block" : "none", "important"); section.classList.toggle("present", active); section.setAttribute("aria-hidden", String(!active)); });
    previous.disabled = activeIndex === 0; next.disabled = activeIndex === sectionPages.length - 1; position.textContent = `${activeIndex + 1} / ${sectionPages.length}`;
    previous.hidden = false; next.hidden = false; position.hidden = false;
  };
  const onPrevious = () => showSection(activeIndex - 1), onNext = () => showSection(activeIndex + 1);
  const onKeyDown = (event) => { if (event.key === "ArrowLeft") { event.preventDefault(); onPrevious(); } if (event.key === "ArrowRight") { event.preventDefault(); onNext(); } };
  previous.addEventListener("click", onPrevious); next.addEventListener("click", onNext); dialog.addEventListener("keydown", onKeyDown); showSection(0);
  let disposed = false;
  const cleanup = () => {
    if (disposed) return;
    disposed = true;
    previous.removeEventListener("click", onPrevious);
    next.removeEventListener("click", onNext);
    dialog.removeEventListener("keydown", onKeyDown);
    slides.replaceChildren();
    if (activeDeckCleanup === cleanup) activeDeckCleanup = () => {};
  };
  activeDeckCleanup = cleanup;
  return { disposeDeck: cleanup };
}

export { disposeDeck, mountDeck };

