const __vite__mapDeps = (i, m = __vite__mapDeps, d = (m.f || (m.f = [
    "./vendor-audio-Da_AWI87.js",
    "./vendor-maplibre-DUgWaH7r.js",
    "../css/vendor-maplibre-MGNviBeR.css",
    "./reveal-runner-DAXpZE11.js",
    "./vendor-reveal-BJmlfHVG.js",
    "../css/vendor-reveal-CmIfNh0j.css",
    "./vendor-scroll-CPqyXdOc.js"
]))) => i.map(i => d[i]);
import { m as t } from "./vendor-maplibre-DUgWaH7r.js";
import { s as e } from "./vendor-scroll-CPqyXdOc.js";
!function () {
    const t = document.createElement("link").relList;
    if (!(t && t.supports && t.supports("modulepreload"))) {
        for (const t of document.querySelectorAll('link[rel="modulepreload"]'))
            e(t);
        new MutationObserver(t => {
            for (const n of t)
                if ("childList" === n.type)
                    for (const t of n.addedNodes)
                        "LINK" === t.tagName && "modulepreload" === t.rel && e(t);
        }).observe(document, {
            childList: !0, subtree: !0
        });
    }
    function e(t) {
        if (t.ep)
            return;
        t.ep = !0;
        const e = function (t) {
            const e = {};
            return t.integrity && (e.integrity = t.integrity), t.referrerPolicy && (e.referrerPolicy = t.referrerPolicy), "use-credentials" === t.crossOrigin ? e.credentials = "include" : "anonymous" === t.crossOrigin ? e.credentials = "omit" : e.credentials = "same-origin", e;
        }(t);
        fetch(t.href, e);
    }
}();
const n = new Map, a = {
    on: (t, e) => (n.has(t) || n.set(t, new Set), n.get(t).add(e), () => a.off(t, e)), off(t, e) {
        n.get(t)?.delete(e);
    }, emit(t, e) {
        for (const a of [...n.get(t) ?? []])
            a(e);
    }
}, o = "undefined" != typeof window ? window.matchMedia("(prefers-reduced-motion: reduce)") : null, r = {
    lang: "en", chapterIndex: 0, chapterId: null, theme: "day", basemap: "saharan", dayFilter: null, soundOn: !1, trackKey: null, reducedMotion: o?.matches ?? !1
}, i = new Map;
function s() {
    return { ...r };
}
function l(t) {
    const e = Object.keys(t).filter(e => r[e] !== t[e]);
    Object.assign(r, t);
    for (const n of e)
        for (const t of [...i.get(n) ?? []])
            t(r[n], s());
}
function c(t, e) {
    return i.has(t) || i.set(t, new Set), i.get(t).add(e), () => i.get(t).delete(e);
}
function d(t) {
    return `/${t}?v=media-path-repair-20261121`;
}
o?.addEventListener("change", t => {
    l({ reducedMotion: t.matches });
});
const u = ["en", "fr", "ar"], p = "en", m = new Set(["ar"]), h = "bouhedma.lang", g = new Map;
function f() {
    try {
        return localStorage.getItem(h);
    }
    catch {
        return null;
    }
}
async function y(t) {
    if (g.has(t))
        return g.get(t);
    let e = {};
    try {
        const n = await fetch(d(`Internal-data/translations/${t}.json`));
        n.ok && (e = await n.json());
    }
    catch {
    }
    return g.set(t, e), e;
}
function _(t, e = {}) {
    const { lang: n } = s();
    return (g.get(n)?.[t] ?? g.get(p)?.[t] ?? t).replace(/\{(\w+)\}/g, (t, n) => e[n] ?? t);
}
function b(t) {
    return t && (t[s().lang] || t[p]) || "";
}
const w = [["i18nAriaLabel", "aria-label"], ["i18nAlt", "alt"], ["i18nTitle", "title"]];
function v(t = document) {
    for (const e of t.querySelectorAll("[data-i18n]"))
        e.textContent = _(e.dataset.i18n);
    for (const [e, n] of w) {
        const a = `[data-${e.replace(/[A-Z]/g, t => `-${t.toLowerCase()}`)}]`;
        for (const o of t.querySelectorAll(a))
            o.setAttribute(n, _(o.dataset[e]));
    }
}
function x(t) {
    document.documentElement.lang = t, document.documentElement.dir = m.has(t) ? "rtl" : "ltr";
}
async function k(t) {
    u.includes(t) && (await Promise.all([y(p), y(t)]), x(t), l({ lang: t }), function (t) {
        try {
            localStorage.setItem(h, t);
        }
        catch {
        }
    }(t), function (t) {
        const e = new URL(window.location.href);
        e.searchParams.set("lang", t), window.history.replaceState(window.history.state, "", e);
    }(t), v(), a.emit("lang:change", {
        lang: t, dir: document.documentElement.dir
    }));
}
async function E() {
    const t = [new URLSearchParams(window.location.search).get("lang"), f(), navigator.language?.slice(0, 2)].find(t => u.includes(t)) ?? p;
    await Promise.all([y(p), y(t)]), x(t), l({ lang: t }), v();
}
const S = {}, A = function (t, e, n) {
    let a = Promise.resolve();
    if (e && e.length > 0) {
        document.getElementsByTagName("link");
        const t = document.querySelector("meta[property=csp-nonce]"), n = t?.nonce || t?.getAttribute("nonce");
        a = Promise.allSettled(e.map(t => {
            if ((t = function (t) {
                return "/" + t;
            }(t)) in S)
                return;
            S[t] = !0;
            const e = t.endsWith(".css"), a = e ? '[rel="stylesheet"]' : "";
            if (document.querySelector(`link[href="${t}"]${a}`))
                return;
            const o = document.createElement("link");
            return o.rel = e ? "stylesheet" : "modulepreload", e || (o.as = "script"), o.crossOrigin = "", o.href = t, n && o.setAttribute("nonce", n), document.head.appendChild(o), e ? new Promise((e, n) => {
                o.addEventListener("load", e), o.addEventListener("error", () => n(new Error(`Unable to preload CSS for ${t}`)));
            }) : void 0;
        }));
    }
    function o(t) {
        const e = new Event("vite:preloadError", { cancelable: !0 });
        if (e.payload = t, window.dispatchEvent(e), !e.defaultPrevented)
            throw t;
    }
    return a.then(e => {
        for (const t of e || [])
            "rejected" === t.status && o(t.reason);
        return t().catch(o);
    });
};
let C = {
    featured: [], dawn: null, sounds: []
}, $ = new Map, L = null, M = null;
async function I() {
    try {
        const t = await fetch(d("Internal-data/json/sounds.json"));
        t.ok && (C = await t.json());
    }
    catch {
    }
    return $ = new Map(C.sounds.map(t => [t.id, t])), C;
}
function T() {
    return C;
}
function B(t) {
    return "dawn" === t ? C.dawn : $.has(t) ? t : null;
}
function P(t) {
    return $.get(B(t)) ?? null;
}
function F(t) {
    return Boolean(B(t));
}
async function j(t) {
    const e = B(t);
    return !!e && (M !== e && (await async function (t) {
        const e = $.get(t);
        if (!e)
            return !1;
        const { Howl: n } = await A(async () => {
            const { Howl: t } = await import("./vendor-audio-Da_AWI87.js").then(t => t.h);
            return { Howl: t };
        }, __vite__mapDeps([0, 1, 2]));
        return L?.unload(), M = t, L = new n({
            src: [e.audio], html5: !0, preload: !0, autoplay: !1, volume: .85, onend: () => l({ soundOn: !1 }), onloaderror: () => l({
                soundOn: !1, soundError: t
            }), onplayerror: () => l({
                soundOn: !1, soundError: t
            })
        }), !0;
    }(e), l({
        trackKey: e, soundError: null
    })), L.playing() ? (L.pause(), l({ soundOn: !1 }), !1) : (L.play(), l({ soundOn: !0 }), !0));
}
function N(t) {
    return s().soundOn && s().trackKey === t;
}
function O(t, e = {}, ...n) {
    const a = document.createElement(t);
    for (const [o, r] of Object.entries(e))
        null != r && !1 !== r && ("class" === o ? a.className = r : "text" === o ? a.textContent = r : o.startsWith("on") ? a.addEventListener(o.slice(2).toLowerCase(), r) : a.setAttribute(o, !0 === r ? "" : r));
    return a.append(...n.filter(Boolean)), a;
}
const z = [
    null, 1, 2, 3, 4, 5
];
const D = {
    geopackage: "download.geopackage", "geojson-layers": "download.geojson", "qgis-styles": "download.qgis_styles"
}, R = {
    metadata: "download.metadata", attributes: "download.attributes", dictionary: "download.dictionary"
}, q = ["download.darwin_core", "download.zenodo"];
let V = null;
function W(t) {
    return t >= 1e6 ? `${(t / 1e6).toFixed(1)} MB` : `${Math.round(t / 1e3)} KB`;
}
function H(t) {
    const e = _(R[t.kind] ?? D[t.id] ?? t.id), n = [t.format, t.lang?.toUpperCase(), W(t.bytes)].filter(Boolean).join(" · ");
    return O("a", {
        class: "download-card", href: t.path, download: !0, hreflang: t.lang
    }, O("span", {
        class: "download-card__title", text: e
    }), O("span", {
        class: "download-card__meta", dir: "ltr", text: n
    }), O("span", {
        class: "download-card__action", text: _("download.action")
    }));
}
function K(t) {
    return O("div", { class: "download-card" }, O("span", {
        class: "download-card__title", text: _(t)
    }), O("span", {
        class: "status-pill", text: _("placeholder.coming_soon")
    }));
}
function U() {
return O("div", {});
}
let Z = {}, G = {}, Y = {}, X = {}, J = {};
async function Q() {
    const t = await fetch(d("Internal-data/json/media.json")).then(t => t.ok ? t.json() : {});
    Z = t.images ?? {}, G = t.video ?? {}, Y = t.photos ?? {}, X = t.videos ?? {}, J = t.credits ?? {};
}
function tt(t) {
    const e = Z[t];
    return e ? {
        id: t, src: e.src, sm: e.sm, xs: e.xs ?? null, md: e.md ?? null, mdW: e.mdW ?? null, color: e.color ?? null, w: e.w, h: e.h, caption: Y[t] ?? null, credit: J[t] ?? J[t.split("/")[0]] ?? null
    } : null;
}
function et(t) {
    const e = Math.round(t.w / 2);
    return [
        t.xs && `${t.xs} ${Math.min(400, t.w)}w`, `${t.sm} ${e}w`, t.md && t.mdW > e && t.mdW < t.w && `${t.md} ${t.mdW}w`, `${t.src} ${t.w}w`
    ].filter(Boolean).join(", ");
}
function nt(t, e) {
    if (t.complete && t.naturalWidth)
        return t;
    e && queueMicrotask(() => t.parentElement?.style.setProperty("background-color", e)), t.classList.add("is-pending");
    const n = () => t.classList.remove("is-pending");
    return t.addEventListener("load", n, { once: !0 }), t.addEventListener("error", n, { once: !0 }), t;
}
let at = null, ot = null, rt = [], it = 0, st = null, lt = null;
function ct(t, e) {
    const n = O("button", {
        type: "button", class: t, onClick: e
    });
    return n.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>', n;
}
function dt(t) {
    if (!rt.length)
        return;
    it = (t + rt.length) % rt.length;
    const e = rt[it], n = b(e.caption), { image: a } = ot;
    a.classList.remove("is-ready"), a.onload = () => a.classList.add("is-ready"), a.srcset = et(e), a.sizes = "(min-width: 1024px) 80vw, 100vw", a.src = e.src, a.width = e.w, a.height = e.h, a.alt = n, a.complete && a.classList.add("is-ready");
    for (const r of [1, -1]) {
        const t = rt[(it + r + rt.length) % rt.length];
        if (!t || t === e)
            continue;
        const n = new Image;
        n.sizes = a.sizes, n.srcset = et(t), n.src = t.src;
    }
    ot.caption.textContent = n, ot.credit.textContent = b(e.credit), ot.counter.textContent = _("lightbox.counter", {
        n: it + 1, total: rt.length
    });
    const o = rt.length < 2;
    ot.prev.hidden = o, ot.next.hidden = o;
}
function ut(t, e = 0, n = null) {
    at || function () {
        at = document.getElementById("lightbox-dialog");
        const t = O("img", {
            class: "lightbox__image", alt: "", decoding: "async"
        }), e = O("p", { class: "lightbox__caption" }), n = O("p", { class: "lightbox__credit" }), a = O("p", {
            class: "lightbox__counter", "aria-live": "polite"
        }), o = ct("lightbox__nav lightbox__nav--prev", () => dt(it - 1)), r = ct("lightbox__nav lightbox__nav--next", () => dt(it + 1)), i = O("button", {
            type: "button", class: "lightbox__close", text: "×", onClick: () => at.close()
        }), s = O("figure", { class: "lightbox__frame" }, t, O("figcaption", {}, e, n));
        at.append(i, s, O("div", { class: "lightbox__bar" }, o, a, r)), ot = {
            image: t, caption: e, credit: n, counter: a, prev: o, next: r, close: i
        }, at.addEventListener("keydown", t => {
            const e = "rtl" === document.documentElement.dir;
            "ArrowRight" === t.key && dt(it + (e ? -1 : 1)), "ArrowLeft" === t.key && dt(it + (e ? 1 : -1));
        }), at.addEventListener("click", t => {
            t.target === at && at.close();
        }), at.addEventListener("touchstart", t => {
            lt = t.touches[0].clientX;
        }, { passive: !0 }), at.addEventListener("touchend", t => {
            if (null === lt)
                return;
            const e = t.changedTouches[0].clientX - lt;
            if (lt = null, Math.abs(e) < 50)
                return;
            const n = "rtl" === document.documentElement.dir ? e > 0 : e < 0;
            dt(it + (n ? 1 : -1));
        }), at.addEventListener("close", () => {
            st?.focus({ preventScroll: !0 }), st = null;
        });
    }(), rt = t.filter(Boolean), st = n, at.setAttribute("aria-label", _("gallery.label")), ot.prev.setAttribute("aria-label", _("action.previous")), ot.next.setAttribute("aria-label", _("action.next")), ot.close.setAttribute("aria-label", _("action.close")), at.dataset.motion = s().reducedMotion ? "reduced" : "full", dt(e), at.showModal();
}
const pt = 1024, mt = new Map;
function ht(t, e) {
    const n = t.length;
    for (let a = 1, o = 0; a < n; a++) {
        let r = n >> 1;
        for (; o & r; r >>= 1)
            o ^= r;
        o ^= r, a < o && ([t[a], t[o]] = [t[o], t[a]], [e[a], e[o]] = [e[o], e[a]]);
    }
    for (let a = 2; a <= n; a <<= 1) {
        const o = -2 * Math.PI / a;
        for (let r = 0; r < n; r += a)
            for (let n = 0; n < a / 2; n++) {
                const i = o * n, s = Math.cos(i), l = Math.sin(i), c = r + n, d = c + a / 2, u = t[d] * s - e[d] * l, p = t[d] * l + e[d] * s;
                t[d] = t[c] - u, e[d] = e[c] - p, t[c] += u, e[c] += p;
            }
    }
}
function gt(t) {
    const e = getComputedStyle(t), n = ["--spec-low", "--spec-mid", "--spec-high"].map(t => function (t) {
        const e = t.trim().replace("#", ""), n = 3 === e.length ? [...e].map(t => t + t).join("") : e, a = parseInt(n, 16);
        return [a >> 16 & 255, a >> 8 & 255, 255 & a];
    }(e.getPropertyValue(t) || "#000"));
    return t => {
        const [e, a, o] = t < .5 ? [n[0], n[1], 2 * t] : [n[1], n[2], 2 * (t - .5)];
        return e.map((t, e) => Math.round(t + (a[e] - t) * o));
    };
}
async function ft(t, e) {
    const n = 480;
    mt.has(e) || mt.set(e, async function (t, e) {
        const n = await fetch(t).then(e => {
            if (!e.ok)
                throw new Error(`${t}: ${e.status}`);
            return e.arrayBuffer();
        }), a = new OfflineAudioContext(1, 44100, 44100), o = await a.decodeAudioData(n), r = o.getChannelData(0), i = o.sampleRate, s = Math.floor(11e3 / (i / 2) * 512), l = Math.max(1, Math.floor((r.length - pt) / e)), c = new Float32Array(pt).map((t, e) => .5 - .5 * Math.cos(2 * Math.PI * e / 1023)), d = new Float32Array(e * s), u = new Float32Array(pt), p = new Float32Array(pt);
        let m = -90;
        for (let h = 0; h < e; h++) {
            const t = h * l;
            for (let e = 0; e < pt; e++)
                u[e] = (r[t + e] ?? 0) * c[e], p[e] = 0;
            ht(u, p);
            for (let e = 0; e < s; e++) {
                const t = Math.hypot(u[e], p[e]) / pt, n = Math.max(-90, 20 * Math.log10(t + 1e-12));
                d[h * s + e] = n, n > m && (m = n);
            }
        }
        return {
            columns: e, rows: s, data: d, peak: m, duration: o.duration
        };
    }(e, n).catch(t => {
        throw mt.delete(e), t;
    }));
    const { rows: a, data: o, peak: r, duration: i } = await mt.get(e);
    t.width = n, t.height = a;
    const s = t.getContext("2d"), l = s.createImageData(n, a), c = gt(t), d = Math.min(55, r - -90);
    for (let u = 0; u < n; u++)
        for (let t = 0; t < a; t++) {
            const e = Math.min(1, Math.max(0, (o[u * a + t] - (r - d)) / d)), [i, s, p] = c(e ** 1.15), m = 4 * ((a - 1 - t) * n + u);
            l.data[m] = i, l.data[m + 1] = s, l.data[m + 2] = p, l.data[m + 3] = 255;
        }
    return s.putImageData(l, 0, 0), i;
}
const yt = Object.freeze(Object.defineProperty({
    __proto__: null, drawSpectrogram: ft
}, Symbol.toStringTag, { value: "Module" }));
let _t = null;
function bt() {
    return _t ??= fetch(d("Internal-data/json/species.json")).then(t => t.json()).then(t => t.species), _t;
}
let wt = null, vt = null, xt = null;
const kt = t => (t ?? "").toLowerCase().split(/\s+/).slice(0, 2).join(" ");
async function Et(t) {
    const e = await bt();
    if (t.startsWith("group:")) {
        const n = t.slice(6), a = "all" === n ? e : e.filter(t => t.group === n);
        return "birds" === n ? function (t) {
            const e = T().sounds ?? [], n = t.map(t => {
                const n = e.find(e => kt(e.scientificName) === kt(t.scientificName));
                return n ? {
                    ...t, sound: n.id, subgroup: t.subgroup ?? n.subgroup
                } : t;
            });
            return n;
        }(a) : a;
    }
    return t.split(",").map(t => e.find(e => e.code === t)).filter(Boolean);
}
function St(t) {
    if (!t)
        return "";
    return _("species.photo_credit", { author: "string" == typeof t ? t : [t.author, t.licence, t.source].filter(Boolean).join(", ") });
}
function At(t) {
    return t.photo ? O("figure", { class: "species-card__figure" }, O("div", { class: "species-card__frame" }, O("img", {
        class: "species-card__thumb", src: t.photo.sm ?? t.photo.src, alt: b(t.photo.alt), loading: "lazy", decoding: "async", width: 420, height: 315
    }), t.photo.inPark && O("span", {
        class: "species-card__in-park", text: _("species.in_park")
    })), t.photo.credit && function (t) {
        const e = St(t), n = t.url && O("a", {
            href: t.url, target: "_blank", rel: "noopener", text: e
        });
        return O("figcaption", { class: "species-card__credit" }, n || e);
    }(t.photo.credit)) : O("div", {
        class: "species-card__thumb media-placeholder", "data-kind": "photo", text: _("species.no_photo")
    });
}
function Ct(t) {
    const { trackKey: e, soundOn: n } = s(), a = e === t.dataset.sound && n;
    t.setAttribute("aria-pressed", String(a)), t.querySelector(".species-card__listen-icon").innerHTML = a ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
}
const $t = () => document.querySelectorAll(".species-card__listen").forEach(Ct);
function Lt(t) {
    const e = t.iucn, n = b(t.description), a = b(t.habitat);
    return O("article", { class: "species-card" }, At(t), O("div", { class: "species-card__body" }, O("h3", {
        class: "species-card__name", text: b(t.name)
    }), O("p", {
        class: "species-card__scientific", lang: "la", dir: "ltr", text: t.scientificName
    }), n && O("p", {
        class: "species-card__description", text: n
    }), t.sound && function (t) {
        const e = O("span", {
            class: "species-card__listen-icon", "aria-hidden": "true"
        }), n = O("button", {
            type: "button", class: "species-card__listen", "data-sound": t.sound, onClick: () => j(t.sound)
        }, e, O("span", { text: _("species.listen") }));
        return Ct(n), n;
    }(t), O("div", { class: "species-card__meta" }, O("span", {
        class: "iucn-pill", "data-status": e ?? "NE", text: e ? `${e} · ${_(`iucn.${e}`)}` : _("species.not_assessed")
    }), t.code && O("span", {
        class: "meta-badge meta-badge--code", dir: "ltr", text: t.code
    }), t.reintroduced && O("span", {
        class: "meta-badge", text: `${_("species.reintroduced")} ${t.reintroduced}`
    })), a && O("p", { class: "species-card__habitat" }, O("strong", { text: `${_("species.habitat")} ` }), a)));
}
c("trackKey", $t), c("soundOn", $t);
const Mt = t => (t ?? "").normalize("NFKD").replace(/[̀-ًͯ-ْ]/g, "").toLowerCase();
function It(t) {
    return Mt([
        t.name?.en, t.name?.fr, t.name?.ar, t.scientificName, t.code
    ].join(" "));
}
async function Tt(t, e) {
    wt || function () {
        wt = document.getElementById("species-dialog");
        const t = O("h2", {
            class: "species-modal__title", id: "species-modal-title"
        }), e = O("p", {
            class: "species-modal__count", role: "status"
        }), n = O("input", {
            type: "search", class: "species-modal__search", id: "species-search", autocomplete: "off", spellcheck: "false"
        }), a = O("label", {
            class: "species-modal__search-label", for: "species-search"
        }), o = O("div", { class: "species-modal__search-box" }, a, n), i = O("p", { class: "species-modal__note" }), s = O("div", { class: "species-modal__list" }), l = O("p", {
            class: "species-modal__empty", hidden: !0
        }), c = O("button", {
            type: "button", class: "species-modal__close", text: "×", onClick: () => wt.close()
        });
        wt.setAttribute("aria-labelledby", "species-modal-title"), wt.append(O("div", { class: "species-modal__close-dock" }, c), O("header", { class: "species-modal__header" }, t, e, O("div", { class: "species-modal__tools" }, o), i), s, l), wt.addEventListener("close", () => {
            xt?.focus({ preventScroll: !0 }), xt = null;
        }), vt = {
            title: t, count: e, search: n, searchLabel: a, searchBox: o, note: i, list: s, empty: l, close: c
        };
    }(), xt = e ?? null;
    const { title: n, count: a, search: o, searchLabel: r, note: l, list: c, empty: d, close: u } = vt;
    u.setAttribute("aria-label", _("action.close")), n.textContent = e?.textContent?.trim() || _("species.dialog_title"), r.textContent = _("species.search"), c.replaceChildren(), a.textContent = "", l.textContent = "", d.hidden = !0, o.value = "", wt.showModal();
    const p = await Et(t), m = p.map(t => ({
        species: t, node: Lt(t), text: It(t)
    }));
    c.replaceChildren(...m.map(({ node: t }) => t));
    const g = p.some(t => t.sound);
    const b = () => {
        const t = Mt(o.value.trim());
        let e = 0;
        for (const { species: n, node: a, text: o } of m) {
            const r = !t || o.includes(t);
            a.hidden = !r, r && e++;
        }
        a.textContent = _("species.count", { n: e }), d.hidden = e > 0, d.textContent = e ? "" : _("species.no_match", { q: o.value.trim() });
    };
    o.oninput = b, l.textContent = [g ? _("species.recording_note") : "", p.some(t => t.photo && !t.photo.credit) ? _("species.photo_credit_unknown") : ""].filter(Boolean).join(" "), l.hidden = !l.textContent, b();
}
const Bt = [
    "steppe", "raptors", "wetland", "coast"
];
let Pt = null, Ft = null;
const jt = new Set;
function Nt(t) {
    const e = s().trackKey === t.dataset.sound;
    t.setAttribute("aria-pressed", String(e && s().soundOn)), t.classList.toggle("is-current", e);
}
function Ot(t) {
    for (const e of jt)
        e.node.isConnected ? e[t]() : jt.delete(e);
}
function zt() {
    Ot("render"), document.querySelectorAll(".soundpick[data-sound]").forEach(Nt);
}
function Dt(t) {
    const { xc: e, recordist: n, country: a } = t.source ?? {}, o = e && n ? _("sound.recorded_by", {
        xc: e, recordist: n, country: a ?? ""
    }).replace(/[,،]\s*$/, "") : _("sound.source_unknown"), r = St(t.image?.credit);
    return r ? `${o} · ${r}` : o;
}
c("trackKey", zt), c("soundOn", zt), c("soundError", zt), c("theme", () => Ot("redraw"));
const Rt = new WeakMap;
function qt(t) {
    const e = O("button", {
        type: "button", class: "soundstage__play"
    }), n = O("p", { class: "soundstage__name" }), a = O("p", {
        class: "soundstage__scientific", lang: "la", dir: "ltr"
    }), o = O("p", { class: "soundstage__credit" }), r = O("canvas", {
        class: "soundstage__canvas", role: "img"
    }), i = O("span", {
        class: "soundstage__playhead", "aria-hidden": "true"
    }), l = O("p", {
        class: "soundstage__status", role: "status"
    }), c = O("div", {
        class: "soundstage__spectrogram", dir: "ltr"
    }, r, i), d = O("div", { class: "soundstage" }, e, O("div", { class: "soundstage__meta" }, n, a), c, O("div", { class: "soundstage__foot" }, o, l));
    let u = null, p = 0;
    const m = () => s().trackKey ?? t, h = () => {
        if ((() => {
            const t = document.querySelector("dialog[open]");
            return t && !t.contains(d);
        })())
            return void (N(u) && (p = requestAnimationFrame(h)));
        const { id: t, seek: e, duration: n } = function () {
            const t = L?.seek();
            return {
                id: M, seek: "number" == typeof t ? t : 0, duration: L?.duration() || $.get(M)?.duration || 0
            };
        }(), a = t === u && n > 0 ? Math.min(1, e / n) : 0;
        i.style.transform = `translateX(${(a * c.clientWidth).toFixed(1)}px)`, N(u) && (p = requestAnimationFrame(h));
    }, g = async () => {
        const t = m(), i = P(t);
        if (!i)
            return;
        const c = N(t), g = b(i.name);
        var f;
        if ((e.innerHTML = c ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>', e.setAttribute("aria-label", _(c ? "sound.pause_name" : "sound.play_name", { name: g })), e.setAttribute("aria-pressed", String(c)), n.textContent = g, a.textContent = i.scientificName, o.textContent = Dt(i), r.setAttribute("aria-label", _("sound.spectrogram_label", { name: g })), d.classList.toggle("is-playing", c), cancelAnimationFrame(p), h(), s().soundError === t && (l.textContent = _("sound.error")), u !== t) && (u = t, await (f = d, Rt.has(f) || Rt.set(f, new Promise(t => {
            if (!("IntersectionObserver" in window))
                return t();
            const e = new IntersectionObserver(n => {
                n.some(t => t.isIntersecting) && (e.disconnect(), t());
            }, { rootMargin: "100% 0px" });
            e.observe(f);
        })), Rt.get(f)), u === t)) {
            l.textContent = _("sound.decoding"), d.classList.add("is-loading");
            try {
                await ft(r, i.audio), u === t && (l.textContent = "");
            }
            catch {
                u === t && (l.textContent = _("sound.error"));
            }
            finally {
                d.classList.remove("is-loading");
            }
        }
    };
    return e.addEventListener("click", () => j(m())), jt.add({
        node: d, render: g, redraw: () => {
            u = null, g();
        }
    }), requestAnimationFrame(g), d;
}
function Vt(t) {
    const e = b(t.name), n = O("button", {
        type: "button", class: "soundpick", "data-sound": t.id
    }, t.image ? O("img", {
        class: "soundpick__thumb", src: t.image.src, alt: "", loading: "lazy", width: 56, height: 56
    }) : O("span", { class: "soundpick__thumb" }), O("span", {
        class: "soundpick__name", text: e
    }), O("span", {
        class: "soundpick__time", text: (a = t.duration, _("sound.seconds", { s: a < 10 ? a.toFixed(1) : Math.round(a) }))
    }));
    var a;
    return n.addEventListener("click", () => j(t.id)), Nt(n), O("li", {}, n);
}
function Wt(t) {
    Pt || (Pt = document.getElementById("sound-dialog"), Pt.addEventListener("close", () => {
        Pt.replaceChildren(), Ft?.focus({ preventScroll: !0 }), Ft = null;
    }), Pt.addEventListener("click", t => {
        t.target === Pt && Pt.close();
    })), Ft = t ?? null;
    const e = T(), n = Bt.map(t => {
        const n = e.sounds.filter(e => e.group === t);
        return n.length ? O("section", { class: "soundlibrary__group" }, O("h3", { text: _(`sound.group.${t}`) }), O("ul", { class: "soundboard__picks soundboard__picks--grid" }, ...n.map(Vt))) : null;
    });
    Pt.setAttribute("aria-label", _("sound.library_title")), Pt.replaceChildren(O("button", {
        type: "button", class: "species-modal__close", "aria-label": _("action.close"), text: "×", onClick: () => Pt.close()
    }), O("h2", {
        class: "soundlibrary__title", text: _("sound.library_title")
    }), O("p", {
        class: "soundlibrary__intro", text: _("sound.library_intro", { n: e.sounds.length })
    }), qt(e.featured[0]), ...n, O("p", {
        class: "soundboard__note", text: _("sound.reference_note")
    })), Pt.showModal();
}
const Ht = {
    1: "ui/banner-conservation-page", 2: "ui/banner-reserahc-page", 3: "ui/park-bg", 4: "ui/banner-coexistance-page"
};
function Kt(t) {
    const [e, n] = function (t) {
        const e = t.match(/^(.+?)\s*[:：]\s*(.+)$/);
        return e ? [e[1], e[2]] : ["", t];
    }(_(`chapter.act_${t}`)), a = tt(Ht[t]);
    return O("section", {
        class: "act-divider", "data-act": t, "aria-labelledby": `act-${t}-title`
    }, a && nt(O("img", {
        class: "act-divider__plate", src: a.sm, srcset: et(a), sizes: "(min-width: 1024px) 620px, 100vw", width: a.w, height: a.h, alt: "", loading: "lazy", decoding: "async"
    })), O("div", { class: "act-divider__text" }, e && O("p", {
        class: "act-divider__number", text: e
    }), O("h2", {
        class: "act-divider__title", id: `act-${t}-title`, text: n
    }), O("p", {
        class: "act-divider__intro", text: _(`chapter.act_${t}_intro`)
    })));
}
function Ut() {
    return null;
}
let Zt = 0;
const Gt = {
    "protocol-drawer": "btn-primary", "audio-play": "btn-secondary", "sound-library": "btn-secondary", "scroll-to": "btn-ghost", "species-modal": "btn-ghost", "show-map": "btn-secondary", download: "btn-secondary"
}, Yt = t => t.id.startsWith("ui/"), Xt = t => t.id.startsWith("illustrations/");
function Jt(t, e) {
    const n = t.media;
    if (!n)
        return null;
    if (!e.length)
        return n.src ? null : function (t) {
            const e = "audio" === t.type ? "audio" : "photo";
            return O("div", { class: "chapter-card__media" }, O("div", {
                class: "media-placeholder", "data-kind": e, role: "img", "aria-label": b(t.alt) || _(`placeholder.${e}`), text: b(t.caption) || _(`placeholder.${e}`)
            }));
        }(n);

    const a = e[0], s = Yt(a), l = Xt(a);
    let r = 0;

    const i = O("caption", { class: "chapter-card__caption" }),
          c = O("span", { class: "chapter-card__credit" }),
          d = O("span", { class: "chapter-carousel__counter", "aria-live": "polite" });

    const u = O("ul", { class: "chapter-carousel__track", role: "list" }, ...e.map((n, a) => {
        const o = b(n.caption), r = nt(O("img", {
            src: n.sm,
            srcset: et(n),
            sizes: "(min-width: 1024px) 496px, calc(100vw - 48px)",
            width: n.w,
            height: n.h,
            alt: o,
            loading: t.index < 2 && 0 === a ? "eager" : "lazy",
            fetchpriority: t.index < 2 && 0 === a ? "high" : null,
            decoding: "async"
        }), s || l ? null : n.color),
        i = s ? r : O("button", {
            type: "button",
            class: "chapter-card__zoom",
            "aria-label": `${_("lightbox.enlarge")}: ${o}`,
            onClick: t => ut(e, a, t.currentTarget)
        }, r);
        return O("li", { class: "chapter-carousel__slide" }, i);
    }));

    const p = t => {
        const n = e[t];
        if (!n) return;
        r = t;
        i.textContent = b(n.caption);
        const a = b(n.credit);
        c.replaceChildren();
        if (a) {
            c.append(n.credit?.url ? O("a", {
                href: n.credit.url, target: "_blank", rel: "noopener", text: a
            }) : a);
        }
        d.textContent = e.length > 1 ? `${t + 1} / ${e.length}` : "";
    };

    const m = t => {
        const n = (r + t + e.length) % e.length;
        u.scrollTo({
            left: n * u.clientWidth * ("rtl" === document.documentElement.dir ? -1 : 1),
            behavior: "smooth"
        });
        p(n);
    };

    const h = O("button", {
        type: "button",
        class: "chapter-carousel__nav chapter-carousel__nav--prev",
        "aria-label": _("action.previous"),
        hidden: e.length < 2,
        onClick: () => m(-1)
    });
    h.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';

    const g = O("button", {
        type: "button",
        class: "chapter-carousel__nav chapter-carousel__nav--next",
        "aria-label": _("action.next"),
        hidden: e.length < 2,
        onClick: () => m(1)
    });
    g.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';

    let f = 0;
    u.addEventListener("scroll", () => {
        cancelAnimationFrame(f);
        f = requestAnimationFrame(() => {
            if (!u.clientWidth) return;
            const t = Math.min(e.length - 1, Math.max(0, Math.round(Math.abs(u.scrollLeft) / u.clientWidth)));
            t !== r && p(t);
        });
    }, { passive: !0 });

    p(0);

    return O("figure", {
        class: `chapter-card__media${s ? " chapter-card__media--plate" : ""}${l ? " chapter-card__media--whole" : ""}`
    }, O("div", { class: "chapter-carousel" }, u, h, g, e.length > 1 && d), O("figcaption", {}, i, c));
}
function Qt(t) {
    return t >= 1e6 ? `${(t / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(t / 1e3))} KB`;
}
function te(t) {
    return "WWF NA Bootcamp" === t.id ? function () {
        const t = O("div", {
            class: "day-timeline", role: "group", "aria-label": _("timeline.label")
        }), e = z.map(t => O("button", {
            type: "button", class: "day-chip", text: null === t ? _("timeline.all_days") : _("timeline.day", { n: t }), "aria-pressed": String(s().dayFilter === t), onClick: () => {
                l({ dayFilter: t }), e.forEach((e, n) => e.setAttribute("aria-pressed", String(z[n] === t)));
            }
        }));
        return t.append(...e), t;
    }() : "chapter-06-birds" === t.id ? function () {
    return null;
}() : "chapter-12-camera-traps"  === t.id ? Ut() : "chapter-13-epilogue" === t.id ? U() : null;
}
function ee(t) {
    const e = function (t) {
        const e = t.media?.id ? tt(t.media.id) : null, n = (t.gallery ?? []).map(tt).filter(Boolean);
        return e ? [e, ...n] : n;
    }(t), n = O("div", { class: "chapter-card__narrative" });
    for (const a of b(t.narrative).split(/\n{2,}/))
        n.append(O("p", { text: a }));
    const o = b(t.strikingFact), r = b(t.dayChip).replace(/\s·\s/g, ", "), i = t.buttons.find(t => "audio-play" === t.type);
    return O("div", { class: "chapter-card" + ((e.length || "Human-Wildlife-Coexistance" === t.id || "WWF NA Bootcamp" === t.id || "Reintroduction and Conservation" === t.id) ? " chapter-card--image-banner" : "") }, O("div", { class: "chapter-card__visual" }, O("header", { class: "chapter-card__header" }, O("h2", {
        class: "chapter-card__title", text: b(t.title)
    }), O("p", { class: "chapter-card__dateline" }, t.index > 0 && O("span", {
        class: "chapter-card__index", text: _("nav.chapter_of", {
            current: t.index, total: Zt
        })
    }), r && O("span", {
        class: "chapter-card__day-chip", text: r
    }))), "Human-Wildlife-Coexistance" === t.id && O("img", { class: "chapter-card__coexistence-banner", src: "Internal-data/ui-assets/banner-coexistance-page.webp", alt: "Illustration of human-wildlife coexistence", loading: "lazy", decoding: "async" }), "WWF NA Bootcamp" === t.id && O("img", { class: "chapter-card__section-banner", src: "Internal-data/ui-assets/banner-camp.webp", alt: "Savanna camp landscape", loading: "lazy", decoding: "async" }), "Reintroduction and Conservation" === t.id && O("img", { class: "chapter-card__section-banner", src: "Internal-data/ui-assets/banner-camp.webp", alt: "Reintroduction and conservation at Bouhedma", loading: "lazy", decoding: "async" }), ("WWF NA Bootcamp" === t.id || "Reintroduction and Conservation" === t.id) ? null : Jt(t, e)), n, o && O("aside", { class: "chapter-card__fact" }, O("p", {
        class: "chapter-card__fact-label", text: _("chapter.striking_fact")
    }), O("p", { text: o })), te(t), O("div", { class: "chapter-card__actions" }, ...t.buttons.map(e => function (t, e) {
        const n = b(t.label), o = `btn ${Gt[t.type] ?? "btn-secondary"}`;
        if ("download" === t.type)
            return O("a", {
                class: o, href: t.target, download: !0, text: n
            });
        const r = "audio-play" === t.type && !F(t.target);
        return O("button", {
            type: "button", class: o, text: n, "data-action": t.type, "data-target": t.target ?? null, "aria-label": r ? `${n}: ${_("audio.unavailable")}` : null, "aria-disabled": r ? "true" : null, onClick: n => {
                r || a.emit("chapter:action", {
                    button: t, chapter: e, trigger: n.currentTarget
                });
            }
        });
    }(e, t))), i && F(i.target) && O("p", {
        class: "chapter-card__sound-credit", "data-sound-credit": i.target
    }), function (t) {
        return t.data?.length ? O("aside", {
            class: "section-data", "aria-label": _("data.title")
        }, O("p", {
            class: "section-data__title", text: _("data.title")
        }), O("ul", {
            class: "section-data__files", role: "list"
        }, ...t.data.map(({ group: t, bytes: e }) => O("li", {}, O("a", {
            class: "section-data__file", href: `Public-data/layers/${t}.geojson`, download: `bouhedma-${t}.geojson`, type: "application/geo+json"
        }, O("span", {
            class: "section-data__name", dir: "ltr", text: `${t}.geojson`
        }), O("span", {
            class: "section-data__size", dir: "ltr", text: `GeoJSON · ${Qt(e)}`
        }))))), O("a", {
            class: "section-data__all", href: "#chapter-13-epilogue", text: _("data.all")
        })) : null;
    }(t));
}
const ne = {
    en: "EN", fr: "FR", ar: "العربية"
};
function ae(t) {
    const e = _(`lang.${t}`);
    return e === ne[t] ? e : `${ne[t]}, ${e}`;
}
function oe(t) {
     return b(t.title);
}
function re(t, e) {
    const n = O("select", {
        "aria-label": _("nav.chapters"), onChange: t => a.emit("chapter:jump", { chapterId: t.target.value })
    }), o = () => {
        n.replaceChildren(...e.chapters.map(t => O("option", {
            value: t.id, text: oe(t)
        }))), n.value = s().chapterId ?? e.chapters[0].id, n.setAttribute("aria-label", _("nav.chapters"));
    };
    o();
    const r = O("button", {
        type: "button", class: "nav-bar__sound", onClick: () => j(M || "dawn")
    });
    r.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
    const i = () => {
        const { trackKey: t, soundOn: e } = s(), n = t ? P(t) : null, a = n ? _(e ? "sound.pause_name" : "sound.play_name", { name: b(n.name) }) : _("nav.sound_none");
        r.setAttribute("aria-label", a), r.title = a, r.setAttribute("aria-disabled", String(!n)), r.setAttribute("aria-pressed", String(Boolean(n && e)));
    };
    i(), c("trackKey", i), c("soundOn", i);
    const l = O("span", {
        class: "nav-bar__title", text: _("site.park_name")
    }), d = O("div", { class: "nav-bar__actions" });
    !function (t) {
        const e = O("div", {
            class: "language-switcher", role: "group", "aria-label": _("lang.label")
        }), n = u.map(t => O("button", {
            type: "button", class: "language-switcher__option", lang: t, text: ne[t], "aria-label": ae(t), "aria-pressed": String(s().lang === t), onClick: () => k(t)
        }));
        e.append(...n), t.append(e), c("lang", t => {
            e.setAttribute("aria-label", _("lang.label")), n.forEach((e, n) => {
                const a = u[n];
                e.setAttribute("aria-pressed", String(a === t)), e.setAttribute("aria-label", ae(a));
            });
        });
        
    }(d), d.append(r), 
    t.append(O("a", { class: "nav-bar__brand", href: "#", style: "text-decoration: none; display: flex; align-items: center; gap: 12px; cursor: pointer;" }, O("img", {
    class: "nav-bar__logo", src: tt("ui/logo")?.sm ?? "Internal-data/ui-assets/partners/bouhedma-logo.png", alt: "", width: 40, height: 40
   }), l), O("div", { class: "nav-bar__breadcrumb" }, function () {
        const t = O("span", {
            class: "nav-bar__chapters-icon", "aria-hidden": "true"
        });
        return t.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>', t;
    }(), n), d), c("chapterId", t => {
        n.value = t;
    }), c("lang", () => {
        o(), l.textContent = _("site.park_name"), i();
    });
}
const ie = [
    {
        name: "WWF North Africa", logo: "Internal-data/ui-assets/partners/wwf-logo.png"
    }, {
        name: "Marwell Wildlife", logo: "Internal-data/ui-assets/partners/marwell-logo.png"
    }, {
        name: "GIZ Tunisie", logo: "Internal-data/ui-assets/partners/giz-logo.png"
    }, {
        name: "Parc National de Bouhedma", logo: "Internal-data/ui-assets/partners/bouhedma-logo.png"
    }
];
function se() {
    const t = ie.map(({ name: t, logo: e }) => O("li", { class: "partner-ribbon__item" }, O("img", {
        class: "partner-ribbon__logo", src: e, alt: t, loading: "lazy"
    })));
    return t.push(O("li", { class: "partner-ribbon__item" }, O("img", {
        class: "partner-ribbon__logo", src: "Internal-data/ui-assets/partners/DGF_logo.jpg", alt: _("footer.dgf"), loading: "lazy"
    }))), O("ul", {
        class: "partner-ribbon", "aria-label": _("footer.partners")
    }, ...t);
}
const le = [
    {
        name: "WWF North Africa", logo: "Internal-data/ui-assets/partners/wwf-logo.png"
    }, {
        name: "Marwell Wildlife", logo: "Internal-data/ui-assets/partners/marwell-logo.png"
    }, {
        name: "GIZ Tunisie", logo: "Internal-data/ui-assets/partners/giz-logo.png"
    }, {
        dgf: !0, logo: "Internal-data/ui-assets/partners/DGF_logo.jpg"
    }
];
function ce(t, e) {
    const [n, o] = function (t) {
        const e = t.match(/^(.+?)\s*[:：]\s*(.+)$/);
        return e ? [e[1], e[2]] : [t, ""];
    }(b(e.metadata.title)), r = tt("ui/banner-biodiversity-page");
    t.replaceChildren(O("div", { class: "cover__inner" }, O("h1", {
        class: "cover__title", id: "cover-title", text: n
    }), o && O("p", {
        class: "cover__subtitle", text: o
    }), O("p", { class: "cover__event" }, O("span", { text: _("cover.event") }), O("span", { text: _("cover.dates") })), O("div", { class: "cover__actions" }, O("button", {
        type: "button", class: "btn btn-primary", text: _("cover.begin"), onClick: () => a.emit("chapter:jump", { chapterId: e.chapters[0].id })
    }))), r && O("div", {
        class: "cover__plate", "aria-hidden": "true"
    }, O("img", {
        src: r.src, srcset: `${r.sm} 1100w, ${r.src} ${r.w}w`, sizes: "100vw", width: r.w, height: r.h, alt: "", decoding: "async", fetchpriority: "high"
    })), O("div", { class: "cover__foot" }, O("ul", {
        class: "cover__partners", "aria-label": _("footer.partners")
    }, ...le.map(({ name: t, logo: e, dgf: n }) => O("li", {}, O("img", {
        src: e, alt: n ? _("footer.dgf") : t, loading: "eager", height: 36
    })))), O("p", {
        class: "cover__hint", text: _("cover.scroll_hint")
    })));
}
const de = {
    dawn: 6.3, morning: 9, afternoon: 16.4, dusk: 18.6, evening: 20.4, night: 23.4, allnight: 2.4
}, ue = 120, pe = 60, me = 44;
function he(t, e = {}) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", t);
    for (const [a, o] of Object.entries(e))
        n.setAttribute(a, o);
    return n;
}
function ge(t) {
    const e = (t - 6) / 24 * 2 * Math.PI;
    return {
        x: pe - me * Math.cos(e), y: pe - me * Math.sin(e)
    };
}
function fe(t) {
    const e = he("svg", {
        viewBox: "0 0 120 120", width: ue, height: ue, "aria-hidden": "true", class: "field-clock__dial"
    }), n = he("defs"), a = he("clipPath", { id: "field-clock-sky" });
    a.append(he("rect", {
        x: 0, y: 0, width: ue, height: pe
    })), n.append(a);
    const o = he("circle", {
        cx: pe, cy: pe, r: me, class: "field-clock__sky", "clip-path": "url(#field-clock-sky)"
    }), r = he("circle", {
        cx: pe, cy: pe, r: me, class: "field-clock__ground"
    }), i = he("circle", {
        cx: pe, cy: pe, r: me, class: "field-clock__ring"
    }), l = he("circle", {
        cx: pe, cy: pe, r: me, class: "field-clock__sweep", pathLength: 100, transform: "rotate(180 60 60)"
    }), d = he("line", {
        x1: 8, y1: pe, x2: 112, y2: pe, class: "field-clock__horizon"
    }), u = he("g", { class: "field-clock__ticks" });
    for (const s of [
        0, 6, 12, 18
    ]) {
        const t = ge(s), e = {
            x: pe + .84 * (t.x - pe), y: pe + .84 * (t.y - pe)
        };
        u.append(he("line", {
            x1: e.x, y1: e.y, x2: t.x, y2: t.y
        }));
    }
    const p = he("g", { class: "field-clock__body" }), m = he("circle", {
        r: 8, class: "field-clock__disc"
    }), h = he("circle", {
        r: 7, cx: 4, cy: -3, class: "field-clock__shade"
    });
    p.append(m, h), e.append(n, r, o, d, i, l, u, p);
    const g = O("span", { class: "field-clock__label" }), f = O("span", { class: "field-clock__caption" }), y = O("div", {
        class: "field-clock", role: "status", hidden: !0
    }, e, O("span", { class: "field-clock__text" }, f, g));
    t.append(y);
    let b = null, w = null, v = 0;
    const x = t => {
        const { x: e, y: n } = ge(t);
        p.setAttribute("transform", `translate(${e.toFixed(2)} ${n.toFixed(2)})`);
        const a = t < 6 || t > 18;
        p.classList.toggle("is-moon", a);
    }, k = () => {
        if (y.hidden = !b, !b)
            return;
        const t = _(`time.${b}`);
        g.textContent = t, f.textContent = _("time.label"), y.setAttribute("aria-label", _("time.aria", { time: t })), y.classList.toggle("is-allnight", "allnight" === b);
    };
    return c("lang", k), { set(t) {
            const e = t && void 0 !== de[t] ? t : null;
            e !== b && (b = e, k(), e && (t => {
                if (cancelAnimationFrame(v), null === w || s().reducedMotion)
                    return w = t, void x(t);
                const e = w;
                let n = t;
                for (; n < e;)
                    n += 24;
                n - e > 18 && (n -= 24);
                const a = 700 + 60 * Math.min(Math.abs(n - e), 12), o = performance.now(), r = t => {
                    const i = Math.min(1, (t - o) / a), s = ((e + (n - e) * (t => {
                        let e = 0, n = 1;
                        for (let o = 0; o < 18; o++) {
                            const a = (e + n) / 2;
                            3 * a * (1 - a) ** 2 * .45 + 3 * a ** 2 * (1 - a) * .1 + a ** 3 < t ? e = a : n = a;
                        }
                        const a = (e + n) / 2;
                        return 3 * a ** 2 * (1 - a) + a ** 3;
                    })(i)) % 24 + 24) % 24;
                    x(s), i < 1 ? v = requestAnimationFrame(r) : w = (n % 24 + 24) % 24;
                };
                v = requestAnimationFrame(r);
            })(de[e]));
        } };
}
const ye = "#2D5016", _e = "#4A7C3F", be = "#C8A96E", we = "#B85C38", ve = "#3B82A6", xe = "#6E685F", ke = "#FAFAF5", Ee = "#E8A838", Se = "#9D72FF", Ae = "#E63946", Ce = "#0D1B2A", $e = {
    bat_net: ["diamond", Se], camera_traps: ["triangle", Ae], insect_station: ["circle", Ee], rodent_cage: ["square", we], bio_index_points: ["triangle", we], gps1_species: ["triangle", be], gps5_species: ["circle", be], pam_sites: ["diamond", ye], pam_trees: ["circle", _e], water_sources: ["circle", ve], ain_charchara: ["diamond", ve], group1_plants: ["circle", _e], group2_stakes: ["square", _e], transect_plant: ["triangle", _e], eco_parc: ["square", ye], chateau_francais: ["square", xe], powerlines: ["circle", xe]
}, Le = {
    park_boundary: ye, aoi_2km: be, camp: we, enclos_autriche: we, enclos_mouflon: we, roads: xe, road_exclusion: we, gps4_trail: be, gps6_trail: Ae, itinerary_camera_trap: Ae, bio_index_transect: we, itinerary_ain_charchara: ve, plan_transect: _e, group3_track: _e, zone_integral: "#0a7a3a", zone_buffer: "#5fb38a", zone_exploit: "#c9d63a"
}, Me = new Set([
    "park_boundary", "aoi_2km", "camp", "enclos_autriche", "enclos_mouflon", "road_exclusion", "zone_integral", "zone_buffer", "zone_exploit"
]), Ie = new Set(["park_boundary", "aoi_2km", "road_exclusion", "zone_integral", "zone_buffer", "zone_exploit"]), Te = [
    ...Object.keys($e), "gps4_trail", "gps6_trail", "itinerary_camera_trap", "bio_index_transect", "plan_transect", "group3_track", "itinerary_ain_charchara", "roads", "camp", "enclos_autriche", "enclos_mouflon", "road_exclusion", "aoi_2km", "zone_integral", "zone_buffer", "zone_exploit", "park_boundary"
];
function Be(t) {
    return $e[t] ? {
        kind: "point", shape: $e[t][0], color: $e[t][1]
    } : {
        kind: Me.has(t) ? "area" : "line", color: Le[t] ?? ye
    };
}
function Pe(t, e) {
    const n = _(t);
    return n === t ? e : n;
}
function Fe() {
    const { lang: t } = s();
    return "ar" === t ? "ar-TN-u-nu-latn" : "fr" === t ? "fr-FR" : "en-GB";
}
const je = (t, e = 0) => new Intl.NumberFormat(Fe(), { maximumFractionDigits: e }).format(t), Ne = t => null == t || "" === t ? null : new Intl.NumberFormat(Fe(), {
    style: "unit", unit: "meter", maximumFractionDigits: 0
}).format(Number(t)), Oe = t => t.EXPERTS ?? t.EXPERT ?? null, ze = t => t ? String(t).match(/(\d+)$/)?.[1] ?? null : null;
function De(t, e, n) {
    const a = _(`layer.${t}`), o = Pe(`layer.${t}.hint`, null), r = function (t) {
        if (!t)
            return null;
        const [e, n, a] = String(t).slice(0, 10).split("-").map(Number);
        return e ? new Intl.DateTimeFormat(Fe(), {
            day: "numeric", month: "short", year: "numeric", timeZone: "UTC"
        }).format(Date.UTC(e, n - 1, a)) : null;
    }(e.DATE), i = function (t, e) {
        if (!t)
            return null;
        const n = new Date(t);
        if (Number.isNaN(n.getTime()))
            return null;
        const a = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Africa/Tunis", year: "numeric", month: "2-digit", day: "2-digit"
        }).format(n);
        return e && a !== String(e).slice(0, 10) ? null : new Intl.DateTimeFormat(Fe(), {
            hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Africa/Tunis"
        }).format(n);
    }(e.TIME_UTC ?? e.time, e.DATE), s = [[_("pop.date"), r], [_("pop.time"), i]], l = [_("pop.lead"), Oe(e)], c = [_("pop.elevation"), Ne(e.ELEV_M ?? e.ELEVATION ?? e.ele)];
    switch (t) {
        case "gps1_species":
        case "gps5_species": {
            const t = Number(e.NB_MALE) + Number(e.NB_FEM) > 0 ? `${e.NB_MALE} / ${e.NB_FEM}` : null;
            return {
                title: n(e.SPEC_CODE) ?? e.VERNACULAR ?? a, scientific: e.SCIENTIFIC, rows: [
                    [_("pop.count"), e.INDIV_CNT ?? null], [_("pop.sexes"), t], [_("pop.group"), e.SOC_STRUCT ? Pe(`val.social.${e.SOC_STRUCT}`, e.SOC_STRUCT) : null], ...s, l
                ]
            };
        }
        case "enclos_autriche":
        case "enclos_mouflon": return {
            title: a, scientific: e.SPEC_SCI, rows: [[_("pop.what"), o], [_("pop.individuals"), e.NB_INDIV ?? null]]
        };
        case "pam_sites":
        case "pam_trees": return {
            title: `${a} ${ze(e.SITE_ID) ?? ""}`.trim(), rows: [
                [_("pop.what"), o], [_("pop.setting"), e.ECOZONE ? Pe(`val.ecozone.${e.ECOZONE}`, e.ECOZONE) : null], [_("pop.host"), /Vachellia/.test(e.SUBSTRATE ?? "") ? _("val.host.acacia") : null], [_("pop.dist_water"), Ne(e.DIST_WATER_M ?? e.DIST_WATER)], c, [_("pop.order"), e.DEPLOY_ORDER ?? null]
            ]
        };
        case "water_sources": return {
            title: e.NAME ? Pe(`val.waterName.${e.NAME}`, e.NAME) : a, rows: [[_("pop.type"), e.TYPE ? Pe(`val.water.${e.TYPE}`, e.TYPE) : null]]
        };
        case "bio_index_points": return {
            title: e.SIGN_CODE ? Pe(`val.sign.${e.SIGN_CODE}`, a) : a, rows: [
                [_("pop.freshness"), e.FRESHNESS ? Pe(`val.fresh.${e.FRESHNESS}`, e.FRESHNESS) : null], ...s, c, l
            ]
        };
        case "roads": return {
            title: e.name ?? a, rows: [[_("pop.road"), e.highway ? Pe(`val.road.${e.highway}`, null) : null]]
        };
        case "park_boundary": return {
            title: _("site.park_name"), rows: [
                [_("pop.what"), _("val.designation")], [_("pop.since"), e.STATUS_YR ?? null], [_("pop.area"), e.REP_AREA ? `${je(e.REP_AREA, 0)} km²` : null], [_("pop.manager"), _("val.manager")]
            ]
        };
        case "transect_plant":
        case "group2_stakes": {
            const t = e.STATION_LABEL ?? e.STAKE_LABEL;
            return {
                title: a, rows: [
                    [_("pop.what"), o], [_("pop.station"), t ?? null], ...s, c, l
                ]
            };
        }
        case "group1_plants": return {
            title: `${a} ${ze(e.OBS_ID) ?? ""}`.trim(), rows: [
                [_("pop.what"), o], ...s, c, l
            ]
        };
        default: return {
            title: a, rows: [
                [_("pop.what"), o], ...s, c, l
            ]
        };
    }
}
const Re = window.matchMedia("(max-width: 1023.98px)");
function qe(t, e) {
    const n = document.createElementNS("http://www.w3.org/2000/svg", t);
    for (const [a, o] of Object.entries(e))
        n.setAttribute(a, o);
    return n;
}
function Ve(t) {
    const e = O("ul", {
        class: "map-legend__list", role: "list", id: "map-legend-list"
    }), n = O("span", { class: "map-legend__title" }), o = O("button", {
        type: "button", class: "map-legend__toggle", "aria-expanded": "true", "aria-controls": "map-legend-list"
    }, n), r = O("p", { class: "map-legend__tip" }), i = O("div", {
        class: "map-legend__body", tabindex: "0"
    }, e, r), s = O("section", {
        class: "map-legend", hidden: !0
    }, o, i);
    t.append(s);
    let l = [], d = !Re.matches, u = !0;
    const p = t => {
        d = t, s.classList.toggle("is-open", d), o.setAttribute("aria-expanded", String(d)), o.setAttribute("aria-label", `${_("legend.title")}, ${_(d ? "legend.hide" : "legend.show")}`);
    };
    o.addEventListener("click", () => p(!d));
    const m = () => {
        s.hidden = !l.length, n.textContent = _("legend.title"), i.setAttribute("aria-label", _("legend.title")), s.setAttribute("aria-label", _("legend.title")), r.textContent = _("legend.tap"), e.replaceChildren(...l.map(({ slug: t, count: e }, n) => {
            const a = _(`layer.${t}.hint`), o = "point" === Be(t).kind && e > 1;
            return O("li", {
                class: "map-legend__item", style: `--i:${n}`
            }, function (t) {
                const e = Be(t), n = qe("svg", {
                    viewBox: "0 0 24 24", width: 22, height: 22, "aria-hidden": "true", class: "map-legend__swatch"
                }), a = {
                    fill: e.color, stroke: "#FAFAF5", "stroke-width": 2
                };
                return "point" === e.kind ? ("circle" === e.shape && n.append(qe("circle", {
                    cx: 12, cy: 12, r: 7, ...a
                })), "square" === e.shape && n.append(qe("rect", {
                    x: 5.5, y: 5.5, width: 13, height: 13, ...a
                })), "diamond" === e.shape && n.append(qe("path", {
                    d: "M12 3.5 20.5 12 12 20.5 3.5 12Z", ...a
                })), "triangle" === e.shape && n.append(qe("path", {
                    d: "M12 4 20 18.5H4Z", ...a
                }))) : "line" === e.kind ? n.append(qe("path", {
                    d: "M3 16c4-8 8 0 12-6 2-3 4-3 6-3", fill: "none", stroke: e.color, "stroke-width": 3, "stroke-linecap": "round"
                })) : n.append(qe("rect", {
                    x: 3, y: 5, width: 18, height: 14, rx: 3, fill: e.color, "fill-opacity": .18, stroke: e.color, "stroke-width": 2
                })), n;
            }(t), O("span", { class: "map-legend__text" }, O("span", {
                class: "map-legend__label", text: _(`layer.${t}`)
            }), a !== `layer.${t}.hint` && O("span", {
                class: "map-legend__hint", text: a
            })), o && O("span", {
                class: "map-legend__count", dir: "ltr", text: String(e)
            }));
        })), s.classList.toggle("is-entering", !u), u = !1, p(d);
    };
    a.on("map:legend", ({ entries: t }) => {
        const e = t.length === l.length && t.every((t, e) => t.slug === l[e]?.slug && t.count === l[e]?.count);
        l = t, e || m();
    }), c("lang", m), Re.addEventListener("change", t => p(!t.matches));
}
const We = {
    version: 8, name: "Bouhedma Saharan", sources: { openmaptiles: {
            type: "vector", url: "https://tiles.openfreemap.org/planet"
        } }, glyphs: "https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf", layers: [
        {
            id: "background", type: "background", paint: { "background-color": "#F5F0E8" }
        }, {
            id: "landcover", type: "fill", source: "openmaptiles", "source-layer": "landcover", paint: {
                "fill-color": "#4A7C3F", "fill-opacity": .14
            }
        }, {
            id: "park", type: "fill", source: "openmaptiles", "source-layer": "park", paint: {
                "fill-color": "#4A7C3F", "fill-opacity": .1
            }
        }, {
            id: "water", type: "fill", source: "openmaptiles", "source-layer": "water", paint: {
                "fill-color": "#3B82A6", "fill-opacity": .55
            }
        }, {
            id: "waterway", type: "line", source: "openmaptiles", "source-layer": "waterway", paint: {
                "line-color": "#3B82A6", "line-opacity": .55, "line-width": [
                    "interpolate", ["linear"], ["zoom"], 8, .5, 14, 1.6
                ]
            }
        }, {
            id: "roads", type: "line", source: "openmaptiles", "source-layer": "transportation", minzoom: 7, filter: ["in", ["get", "class"], ["literal", [
                        "motorway", "trunk", "primary", "secondary", "tertiary", "minor", "service", "track"
                    ]]], layout: {
                "line-cap": "round", "line-join": "round"
            }, paint: {
                "line-color": "#6E685F", "line-opacity": .7, "line-width": [
                    "interpolate", ["linear"], ["zoom"], 7, .4, 12, 1, 16, 3
                ]
            }
        }, {
            id: "boundaries", type: "line", source: "openmaptiles", "source-layer": "boundary", filter: ["<=", ["get", "admin_level"], 4], layout: { "line-join": "round" }, paint: {
                "line-color": "#C8A96E", "line-dasharray": [3, 2], "line-width": [
                    "interpolate", ["linear"], ["zoom"], 3, .6, 10, 1.6
                ]
            }
        }, {
            id: "water-labels", type: "symbol", source: "openmaptiles", "source-layer": "water_name", layout: {
                "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]], "text-font": ["Noto Sans Italic"], "text-size": 12
            }, paint: {
                "text-color": "#2D5016", "text-halo-color": "#F5F0E8", "text-halo-width": 1.2
            }
        }, {
            id: "road-labels", type: "symbol", source: "openmaptiles", "source-layer": "transportation_name", minzoom: 11, layout: {
                "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]], "text-font": ["Noto Sans Regular"], "text-size": 11, "symbol-placement": "line"
            }, paint: {
                "text-color": "#6E685F", "text-halo-color": "#F5F0E8", "text-halo-width": 1.2
            }
        }, {
            id: "place-labels", type: "symbol", source: "openmaptiles", "source-layer": "place", filter: ["in", ["get", "class"], ["literal", [
                        "country", "state", "city", "town", "village", "suburb", "hamlet"
                    ]]], layout: {
                "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]], "text-font": ["Noto Sans Regular"], "text-size": [
                    "interpolate", ["linear"], ["zoom"], 4, 11, 12, 15
                ], "text-max-width": 8
            }, paint: {
                "text-color": "#2C2C2C", "text-halo-color": "#F5F0E8", "text-halo-width": 1.4
            }
        }
    ]
}, He = { layers: [
        {
            id: "background", type: "background", paint: { "background-color": "#0D1B2A" }
        }, {
            id: "landcover", type: "fill", source: "openmaptiles", "source-layer": "landcover", paint: {
                "fill-color": "#24384E", "fill-opacity": .35
            }
        }, {
            id: "park", type: "fill", source: "openmaptiles", "source-layer": "park", paint: {
                "fill-color": "#24384E", "fill-opacity": .3
            }
        }, {
            id: "water", type: "fill", source: "openmaptiles", "source-layer": "water", paint: {
                "fill-color": "#162536", "fill-opacity": 1
            }
        }, {
            id: "waterway", type: "line", source: "openmaptiles", "source-layer": "waterway", paint: {
                "line-color": "#24384E", "line-opacity": 1, "line-width": [
                    "interpolate", ["linear"], ["zoom"], 8, .5, 14, 1.6
                ]
            }
        }, {
            id: "roads", type: "line", source: "openmaptiles", "source-layer": "transportation", minzoom: 7, filter: ["in", ["get", "class"], ["literal", [
                        "motorway", "trunk", "primary", "secondary", "tertiary", "minor", "service", "track"
                    ]]], layout: {
                "line-cap": "round", "line-join": "round"
            }, paint: {
                "line-color": "#24384E", "line-opacity": 1, "line-width": [
                    "interpolate", ["linear"], ["zoom"], 7, .4, 12, 1, 16, 3
                ]
            }
        }, {
            id: "boundaries", type: "line", source: "openmaptiles", "source-layer": "boundary", filter: ["<=", ["get", "admin_level"], 4], layout: { "line-join": "round" }, paint: {
                "line-color": "#8C9BAE", "line-dasharray": [3, 2], "line-width": [
                    "interpolate", ["linear"], ["zoom"], 3, .6, 10, 1.6
                ]
            }
        }, {
            id: "water-labels", type: "symbol", source: "openmaptiles", "source-layer": "water_name", layout: {
                "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]], "text-font": ["Noto Sans Italic"], "text-size": 12
            }, paint: {
                "text-color": "#8C9BAE", "text-halo-color": "#0D1B2A", "text-halo-width": 1.2
            }
        }, {
            id: "road-labels", type: "symbol", source: "openmaptiles", "source-layer": "transportation_name", minzoom: 11, layout: {
                "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]], "text-font": ["Noto Sans Regular"], "text-size": 11, "symbol-placement": "line"
            }, paint: {
                "text-color": "#8C9BAE", "text-halo-color": "#0D1B2A", "text-halo-width": 1.2
            }
        }, {
            id: "place-labels", type: "symbol", source: "openmaptiles", "source-layer": "place", filter: ["in", ["get", "class"], ["literal", [
                        "country", "state", "city", "town", "village", "suburb", "hamlet"
                    ]]], layout: {
                "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]], "text-font": ["Noto Sans Regular"], "text-size": [
                    "interpolate", ["linear"], ["zoom"], 4, 11, 12, 15
                ], "text-max-width": 8
            }, paint: {
                "text-color": "#EAE6DF", "text-halo-color": "#0D1B2A", "text-halo-width": 1.4
            }
        }
    ] }, Ke = "sentinel2-cloudless", Ue = "satellite-imagery", Ze = ["https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg"], Ge = {
    day: {
        "raster-brightness-max": 1, "raster-saturation": 0, "raster-contrast": 0
    }, night: {
        "raster-brightness-max": .38, "raster-saturation": -.55, "raster-contrast": .1
    }
};
const Ye = "terrain-dem", Xe = "terrain-hillshade", Je = ["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"], Qe = {
    day: {
        "hillshade-shadow-color": "#6E685F", "hillshade-highlight-color": "#FAFAF5", "hillshade-accent-color": "#E8DCC8"
    }, night: {
        "hillshade-shadow-color": "#0D1B2A", "hillshade-highlight-color": "#8C9BAE", "hillshade-accent-color": "#24384E"
    }
};
const tn = "ov-", en = [
    "park-boundary", "day1-infrastructures", "day2-herbivores-bats", "day3-carnivores", "day3-insects", "day4-rodents", "day5-phytoecology", "pam-acoustic-network"
], nn = [
    "match", ["get", "layer"], ...Object.entries(Le).flat(), ye
], an = [
    "match", ["get", "layer"], "insect_station", Ee, "bat_net", Se, "camera_traps", Ae, Ce
], on = ["insect_station", "bat_net", "camera_traps"], rn = ["==", ["geometry-type"], "Point"], sn = ["in", ["geometry-type"], ["literal", ["Polygon", "MultiPolygon"]]], ln = ["!=", ["geometry-type"], "Point"], cn = new Map;
let dn = null, un = new Map, pn = null, mn = "day", hn = 0;
const gn = t => `${tn}src-${t}`, fn = (t, e) => `${tn}${t}-${e}`;
function yn(t) {
    if (!cn.has(t)) {
        const e = d(`Public-data/layers/${t}.geojson`);
        cn.set(t, fetch(e).then(t => {
            if (!t.ok)
                throw new Error(`${e}: ${t.status}`);
            return t.json();
        }));
    }
    return cn.get(t);
}
function _n(t, e) {
    const n = 44, a = document.createElement("canvas");
    a.width = n, a.height = n;
    const o = a.getContext("2d", { willReadFrequently: !0 }), r = 22, i = 16;
    return o.beginPath(), "circle" === t && o.arc(r, r, i, 0, 2 * Math.PI), "square" === t && o.rect(8.4, 8.4, 27.2, 27.2), "diamond" === t && (o.moveTo(r, r - 18.4), o.lineTo(40.4, r), o.lineTo(r, 40.4), o.lineTo(r - 18.4, r), o.closePath()), "triangle" === t && (o.moveTo(r, r - 18.4), o.lineTo(39.6, 35.6), o.lineTo(r - 17.6, 35.6), o.closePath()), o.fillStyle = e, o.fill(), o.lineWidth = 4, o.strokeStyle = ke, o.stroke(), o.getImageData(0, 0, n, n);
}
function bn(t, e) {
    const n = ["all", t];
    return e && n.push(["in", ["get", "layer"], ["literal", e]]), null !== pn && n.push(["==", ["get", "day"], pn]), n;
}
function wn(t) {
    const e = t ? on.filter(e => t.includes(e)) : on;
    return bn(rn, e);
}
function vn(t) {
    if (!dn?.getLayer(fn(t, "line")))
        return;
    const e = un.has(t), n = un.get(t) ?? null, a = {
        fill: bn(sn, n), line: bn(ln, n), glow: wn(n), point: bn(rn, n)
    };
    for (const [o, r] of Object.entries(a)) {
        const n = fn(t, o);
        dn.setFilter(n, r);
        const a = e && ("glow" !== o || "night" === mn);
        dn.setLayoutProperty(n, "visibility", a ? "visible" : "none");
    }
}
async function xn(t) {
    const e = await yn(t);
    dn?.getStyle() && (dn.getSource(gn(t)) || dn.addSource(gn(t), {
        type: "geojson", data: e
    }), function (t) {
        const e = gn(t), n = { visibility: "none" }, a = (n, a) => {
            const o = fn(t, n);
            dn.getLayer(o) || dn.addLayer({
                id: o, source: e, ...a
            });
        };
        a("fill", {
            type: "fill", filter: sn, layout: n, paint: {
                "fill-color": nn, "fill-opacity": ["case", ["in", ["get", "layer"], ["literal", ["zone_integral", "zone_buffer", "zone_exploit"]]], .55, .14]
            }
        }), a("line", {
            type: "line", filter: ln, layout: {
                ...n, "line-cap": "round", "line-join": "round"
            }, paint: {
                "line-color": nn, "line-width": 2.5
            }
        }), a("glow", {
            type: "circle", filter: rn, layout: n, paint: {
                "circle-color": an, "circle-radius": 22, "circle-blur": 1, "circle-opacity": 0
            }
        }), a("point", {
            type: "symbol", filter: rn, layout: {
                ...n, "icon-image": ["concat", tn, ["get", "layer"]], "icon-allow-overlap": !0, "icon-ignore-placement": !0
            }
        });
    }(t), vn(t));
}
function kn(t) {
    dn = t, function () {
        for (const [t, [e, n]] of Object.entries($e)) {
            const a = `${tn}${t}`;
            dn.hasImage(a) || dn.addImage(a, _n(e, n), { pixelRatio: 2 });
        }
    }();
    for (const e of un.keys())
        xn(e).catch(() => {
        });
}
function En(t) {
    const e = new Map;
    for (const n of t) {
        const [t, a] = n.split("/");
        a ? null !== e.get(t) && e.set(t, [...e.get(t) ?? [], a]) : e.set(t, null);
    }
    un = e, An?.remove(), An = null;
    for (const n of en)
        un.has(n) ? xn(n).catch(() => {
        }) : vn(n);
    Cn();
}
let Sn = 0, An = null;
async function Cn() {
    const t = ++Sn, e = new Map;
    for (const [a, o] of un) {
        const t = await yn(a).catch(() => null);
        for (const n of t?.features ?? []) {
            const t = n.properties.layer;
            o && !o.includes(t) || (null !== pn && n.properties.day !== pn || e.set(t, (e.get(t) ?? 0) + 1));
        }
    }
    if (t !== Sn)
        return;
    const n = [...e].map(([t, e]) => ({
        slug: t, count: e
    })).sort((t, e) => Te.indexOf(t.slug) - Te.indexOf(e.slug));
    a.emit("map:legend", { entries: n });
}
function $n(t) {
    pn = t;
    for (const e of un.keys())
        vn(e);
    Cn();
}
function Ln() {
    clearInterval(hn);
}
function Mn(t, e) {
    for (const n of un.keys()) {
        const a = fn(n, "glow");
        dn.getLayer(a) && (dn.setPaintProperty(a, "circle-radius", t), dn.setPaintProperty(a, "circle-opacity", e));
    }
}
function In(t) {
    if (mn = t, dn) {
        for (const t of un.keys())
            vn(t);
        "night" === mn ? (Ln(), s().reducedMotion ? Mn(26, .55) : hn = setInterval(() => {
            const t = (Math.sin(performance.now() / 600) + 1) / 2;
            Mn(20 + 14 * t, .35 + .35 * t);
        }, 120)) : Ln();
    }
}
async function Tn(t) {
    const e = await bt().catch(() => null), n = t.layer, { title: a, scientific: o, rows: r } = De(n, t, function (t) {
        return e => {
            const n = e && t?.find(t => t.code === e);
            return n ? b(n.name) : null;
        };
    }(e)), i = document.createElement("div"), s = document.createElement("p");
    if (s.className = "map-popup__title", s.textContent = a, i.append(s), o) {
        const t = document.createElement("p");
        t.className = "map-popup__scientific", t.lang = "la", t.dir = "ltr", t.textContent = o, i.append(t);
    }
    const l = r.filter(([, t]) => null != t && "" !== t);
    if (l.length) {
        const t = document.createElement("dl");
        t.className = "map-popup__rows";
        for (const [e, n] of l) {
            const a = document.createElement("dt");
            a.textContent = e;
            const o = document.createElement("dd");
            o.textContent = String(n), t.append(a, o);
        }
        i.append(t);
    }
    return i;
}
function Bn(t, e) {
    const n = e => en.map(t => fn(t, e)).filter(e => t.getLayer(e)), a = [[e.x - 8, e.y - 8], [e.x + 8, e.y + 8]];
    return t.queryRenderedFeatures(e, { layers: n("point") })[0] ?? t.queryRenderedFeatures(a, { layers: n("line") })[0] ?? t.queryRenderedFeatures(e, { layers: n("fill") }).find(t => !Ie.has(t.properties.layer));
}
const Pn = "#0D1B2A", Fn = "#162536", jn = "#24384E", Nn = "#24384E", On = "#8C9BAE", zn = "#0D1B2A";
let Dn = null, Rn = 0, qn = !1, Vn = !1, Wn = new Map;
function Hn() {
    return Dn;
}
const Kn = ["saharan", "satellite", "carto"];
function Un(t) {
    return "carto" === t ? "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json" : "satellite" === t ? {
        version: 8, name: "Bouhedma satellite", glyphs: We.glyphs, sources: {
            ...We.sources, [Ke]: {
                type: "raster", tiles: Ze, tileSize: 256, maxzoom: 15, attribution: '<a href="https://cloudless.eox.at" target="_blank" rel="noopener">Sentinel-2 cloudless 2025</a> by EOX IT Services GmbH (contains modified Copernicus Sentinel data 2025), <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener">CC BY-NC-SA 4.0</a>'
            }
        }, layers: [{
                id: Ue, type: "raster", source: Ke, paint: Ge.day
            }, ...We.layers.filter(t => "symbol" === t.type && "openmaptiles" === t.source).map(t => ({
                ...t, paint: {
                    ...t.paint, "text-color": "#FAFAF5", "text-halo-color": "#0D1B2A", "text-halo-width": 1.4
                }
            }))]
    } : We;
}
function Zn(t) {
    return t.id.startsWith(tn);
}
function Gn(t) {
    return "background" === t.type ? { "background-color": Pn } : "fill" === t.type ? { "fill-color": t.id.includes("water") ? jn : Fn } : "line" === t.type ? { "line-color": Nn } : "symbol" === t.type ? {
        "text-color": On, "text-halo-color": zn
    } : {};
}
function Yn(t, e) {
    const { basemap: n } = s();
    "carto" === n ? function (t, e) {
        for (const n of Dn.getStyle().layers)
            if (!Zn(n))
                for (const [a, o] of Object.entries(Gn(n))) {
                    const r = "night" === t ? o : Wn.get(`${n.id}|${a}`);
                    void 0 !== r && (Dn.setPaintProperty(n.id, `${a}-transition`, {
                        duration: e, delay: 0
                    }), Dn.setPaintProperty(n.id, a, r));
                }
    }(t, e) : "satellite" === n ? function (t, e) {
        if (Dn.getLayer(Ue))
            for (const [n, a] of Object.entries(Ge["night" === t ? "night" : "day"]))
                Dn.setPaintProperty(Ue, `${n}-transition`, {
                    duration: e, delay: 0
                }), Dn.setPaintProperty(Ue, n, a);
    }(t, e) : function (t, e) {
        for (const n of t.layers)
            if (Dn.getLayer(n.id))
                for (const [t, a] of Object.entries(n.paint ?? {}))
                    Dn.setPaintProperty(n.id, `${t}-transition`, {
                        duration: e, delay: 0
                    }), Dn.setPaintProperty(n.id, t, a);
    }("night" === t ? He : We, e), function (t, e) {
        if (!t?.getLayer(Xe))
            return;
        const n = Qe["night" === e ? "night" : "day"];
        for (const [a, o] of Object.entries(n))
            t.setPaintProperty(Xe, a, o);
    }(Dn, t), In(t);
}
function Xn(t) {
    if (Dn?.getStyle())
        for (const e of Dn.getStyle().layers) {
            if ("symbol" !== e.type || Zn(e))
                continue;
            const n = Dn.getLayoutProperty(e.id, "text-field");
            n && JSON.stringify(n).includes("name") && Dn.setLayoutProperty(e.id, "text-field", [
                "coalesce", ["get", `name:${t}`], ["get", `name_${t}`], ["get", "name"]
            ]);
        }
}
function Jn(t) {
    Dn && s().basemap !== t && (l({ basemap: t }), Vn = !1, Dn.setStyle(Un(t), { diff: !1 }));
}
function Qn() {
    const { basemap: t, lang: e, theme: n } = s();
    var o, r;
    "carto" === t && function () {
        Wn = new Map;
        for (const t of Dn.getStyle().layers)
            if (!Zn(t))
                for (const e of Object.keys(Gn(t)))
                    Wn.set(`${t.id}|${e}`, Dn.getPaintProperty(t.id, e));
    }(), Xn(e), function (t) {
        if (t && t.getStyle()) {
            if (t.getSource(Ye) || t.addSource(Ye, {
                type: "raster-dem", encoding: "terrarium", tiles: Je, tileSize: 256, maxzoom: 15, attribution: "Terrain: Mapzen / AWS Terrain Tiles"
            }), !t.getLayer(Xe)) {
                const e = "night" === document.documentElement.dataset.theme ? "night" : "day";
                t.addLayer({
                    id: Xe, type: "hillshade", source: Ye, paint: {
                        ...Qe[e], "hillshade-exaggeration": .5
                    }
                }, function (t) {
                    const e = t.getStyle()?.layers ?? [];
                    return e.find(t => "symbol" === t.type)?.id;
                }(t));
            }
            t.setTerrain({
                source: Ye, exaggeration: 1.35
            });
        }
    }(Dn), o = Dn, r = "satellite" === t ? .15 : .5, o?.getLayer(Xe) && o.setPaintProperty(Xe, "hillshade-exaggeration", r), kn(Dn), Vn = !0, "night" === n && Yn("night", 0), a.emit("map:style-load", {
        map: Dn, basemap: t
    });
}
function ta(t) {
    if ("saharan" !== s().basemap || qn)
        return;
    const e = t.error?.url ?? "";
    if (!("openmaptiles" === t.sourceId || e.includes("tiles.openfreemap.org")))
        return;
    Rn += 1;
    ("openmaptiles" === t.sourceId && !t.tile || /openfreemap\.org\/planet\/?$/.test(e) || Rn >= 3) && (Jn("carto"), a.emit("map:basemap-fallback", {
        from: "saharan", to: "carto"
    }));
}
function ea(t) {
    "openmaptiles" === t.sourceId && t.isSourceLoaded && (qn = !0);
}
function na([t, e, n, a]) {
    const o = .03;
    return [[t - o, e - o], [n + o, a + o]];
}
function aa(e, { mapView: n, bbox: o }) {
    const r = new URLSearchParams(window.location.search).get("basemap"), i = Kn.includes(r) ? r : "saharan";
    l({ basemap: i }), t.setRTLTextPlugin("/data/vendor/mapbox-gl-rtl-text-0.2.3.js", !0).catch(() => {
    });
    try {
        Dn = new t.Map({
            container: e, style: Un(i), center: n.center, zoom: n.zoom, pitch: n.pitch, bearing: n.bearing, maxBounds: na(o), minZoom: 11.3, maxPitch: 60, scrollZoom: !1, attributionControl: { compact: !0 }
        });
    }
    catch {
        return null;
    }
    return Dn.addControl(new t.NavigationControl({ visualizePitch: !0 }), "top-right"), Dn.on("style.load", Qn), Dn.on("error", ta), Dn.on("sourcedata", ea), function (t) {
        const e = t.querySelector(".maplibregl-ctrl-attrib");
        if (!e)
            return;
        let n = !1;
        e.querySelector(".maplibregl-ctrl-attrib-button")?.addEventListener("click", () => {
            n = e.classList.contains("maplibregl-compact-show");
        });
        const a = () => {
            !n && e.classList.contains("maplibregl-compact-show") && e.classList.remove("maplibregl-compact-show");
        };
        new MutationObserver(a).observe(e, {
            attributes: !0, attributeFilter: ["class"]
        }), a();
    }(e), Dn.once("load", () => {
        a.emit("map:ready", { map: Dn });
    }), function (t, e) {
        t.on("click", async (n) => {
            const a = Bn(t, n.point);
            if (!a)
                return;
            const o = await Tn(a.properties);
            An?.remove(), An = new e({
                className: "map-popup", closeButton: !0, maxWidth: "300px"
            }).setLngLat(n.lngLat).setDOMContent(o).addTo(t);
        });
        let n = 0;
        t.on("mousemove", e => {
            n || (n = requestAnimationFrame(() => {
                n = 0, t.getCanvas().style.cursor = Bn(t, e.point) ? "pointer" : "";
            }));
        });
    }(Dn, t.Popup), new URLSearchParams(window.location.search).has("e2e") && (window.__storymapMap = Dn), Dn;
}
const oa = t => t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
function ra(t) {
    const { clientWidth: e, clientHeight: n } = t.getContainer(), a = Math.round(Math.min(60, .08 * e)), o = Math.round(Math.min(60, .08 * n)), r = document.querySelector(".basemap-toggle"), i = r ? r.getBoundingClientRect().height + 16 : 0;
    return {
        top: o, bottom: Math.round(Math.min(Math.max(1.5 * o, i), .4 * n)), left: a, right: a
    };
}
function ia(t) {
    const e = Hn();
    if (!e)
        return;
    const { duration: n = 2e3, transition: a = "flyTo" } = t, o = function (t, e) {
        const { center: n, zoom: a, pitch: o = 0, bearing: r = 0, bounds: i } = e;
        if (i) {
            const e = t.cameraForBounds([[i[0], i[1]], [i[2], i[3]]], {
                padding: ra(t), bearing: r, maxZoom: 16
            });
            if (e)
                return {
                    center: e.center, zoom: e.zoom, pitch: o, bearing: r
                };
        }
        return {
            center: n, zoom: a, pitch: o, bearing: r
        };
    }(e, t);
    s().reducedMotion || "fade" === a ? e.jumpTo(o) : "easeTo" === a ? e.easeTo({
        ...o, duration: n, easing: oa
    }) : e.flyTo({
        ...o, duration: n, easing: oa, essential: !1
    });
}
let sa = null, la = 0, ca = 0;
function da() {
    const t = window.innerHeight / 2;
    for (const e of document.querySelectorAll(".narrative-step")) {
        const { top: n, bottom: o } = e.getBoundingClientRect();
        if (n <= t && o > t)
            return void (e.dataset.chapterId !== s().chapterId && a.emit("chapter:enter", {
                chapterId: e.dataset.chapterId, index: Number(e.dataset.chapterIndex), direction: "down"
            }));
    }
}
function ua() {
    clearTimeout(ca), ca = setTimeout(da, 250);
}
function pa() {
    sa?.resize();
}
const ma = Object.assign({
    "/html/tutorials/antelopes-protocol.html": () => A(() => import("./antelopes-protocol-B_9hPLX8.js"), []).then(t => t.default), "/html/tutorials/bats-protocol.html": () => A(() => import("./bats-protocol-DoukPBO4.js"), []).then(t => t.default), "/html/tutorials/birds-bioacoustics.html": () => A(() => import("./birds-bioacoustics-DeKe1pf7.js"), []).then(t => t.default), "/html/tutorials/carnivores-protocol.html": () => A(() => import("./carnivores-protocol-D78OBEDu.js"), []).then(t => t.default), "/html/tutorials/flora-protocol.html": () => A(() => import("./flora-protocol-CSxK6GH9.js"), []).then(t => t.default), "/html/tutorials/insects-protocol.html": () => A(() => import("./insects-protocol-DhRnFSNr.js"), []).then(t => t.default), "/html/tutorials/rodents-protocol.html": () => A(() => import("./rodents-protocol-et9g4NhU.js"), []).then(t => t.default)
});
let ha = null, ga = null, fa = null, ya = null;
function _a() {
    ha = document.getElementById("protocol-dialog"), ha.innerHTML = '\n    <button type="button" class="protocol-modal__close"></button>\n    <p class="protocol-modal__status" role="status"></p>\n    <nav class="protocol-modal__nav" aria-label="Protocol navigation"><button type="button" data-protocol-prev></button><span data-protocol-position aria-live="polite"></span><button type="button" data-protocol-next></button></nav>\n    <div class="reveal"><div class="slides"></div></div>', ha.querySelector(".protocol-modal__close").addEventListener("click", () => ha.close()), ha.addEventListener("close", xa), ha.addEventListener("keydown", t => {
        if ("Escape" === t.key)
            return t.stopPropagation(), t.preventDefault(), void ha.close();
        "ArrowDown" !== t.key && "ArrowUp" !== t.key || function (t) {
            const e = ha.querySelector(".slides section.present:not(.stack)");
            if (!e || e.scrollHeight <= e.clientHeight + 1)
                return;
            t.stopPropagation(), t.preventDefault();
            const n = "ArrowDown" === t.key ? ba : -ba;
            e.scrollBy({
                top: n, behavior: s().reducedMotion ? "auto" : "smooth"
            });
        }(t), "Tab" === t.key && function (t) {
            const e = [...ha.querySelectorAll(wa)].filter(t => t.checkVisibility({ visibilityProperty: !0 }) && !t.closest('[aria-hidden="true"]'));
            if (!e.length)
                return;
            const n = e[0], a = e[e.length - 1];
            t.shiftKey && document.activeElement === n ? (t.preventDefault(), a.focus()) : t.shiftKey || document.activeElement !== a || (t.preventDefault(), n.focus());
        }(t);
    }, !0);
}
const ba = 80;
const wa = 'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';
function va(t) {
    ha.querySelector(".protocol-modal__status").textContent = t;
}
function xa() {
    ga?.disposeDeck(), a.emit("protocol:close", { deckId: fa }), fa = null, ya?.focus({ preventScroll: !0 }), ya = null;
}
const ka = void 0, Ea = new Set;
function Sa() {
    return Boolean(ka) && !/^(localhost|127\.|\[::1\])/.test(window.location.hostname);
}
function Aa(t) {
    const e = new URLSearchParams({
        ...t, s: [window.screen.width, window.screen.height, window.devicePixelRatio || 1].join(","), rnd: Math.random().toString(36).slice(2)
    });
    (new Image).src = `https://${ka}.goatcounter.com/count?${e}`;
}
function Ca(t) {
    Sa() && !Ea.has(t) && (Ea.add(t), Aa({
        p: t, t: t, e: "true"
    }));
}
function $a() {
    Sa() && (Aa({
        p: window.location.pathname || "/", t: document.title, r: document.referrer
    }), function () {
        const t = [1, 3, 5];
        let e = 0, n = performance.now();
        const a = setInterval(() => {
            const o = performance.now();
            for ("visible" === document.visibilityState && (e += o - n), n = o; t.length && e >= 6e4 * t[0];)
                Ca(`time-${t.shift()}min`);
            t.length || clearInterval(a);
        }, 5e3);
    }(), c("chapterIndex", t => Ca(`chapter-${String(t).padStart(2, "0")}`)), c("lang", t => Ca(`lang-${t}`)), c("basemap", t => Ca(`basemap-${t}`)), c("soundOn", t => {
        if (!t)
            return;
        Ca("audio-play");
        const { trackKey: e } = s();
        e && Ca(`audio-${e}`);
    }), a.on("protocol:open", ({ deckId: t }) => Ca(`deep-dive-${t}`)), document.addEventListener("click", t => {
        const e = t.target.closest?.("a[download]");
        e && Ca(`download-${e.pathname.split("/").pop()}`);
    }));
}
const La = new Set(["chapter-02-zoning"]), Ma = {
    "chapter-06-insects": "chapter-10-insects", "chapter-07-rodents": "chapter-08-rodents", "chapter-08-bats": "chapter-09-bats", "chapter-09-birds": "chapter-06-birds", "chapter-10-carnivores": "chapter-11-carnivores", "chapter-11-antelopes": "chapter-07-antelopes", "chapter-12-pam": "chapter-06-birds", "chapter-13-geoai": "chapter-06-birds", "chapter-14-coexist": "chapter-13-epilogue", "chapter-15-download": "chapter-13-epilogue"
};
async function Ia() {
    const t = await fetch(d("Internal-data/json/story.json"));
    if (!t.ok)
        throw new Error(`story.json: ${t.status}`);
    return t.json();
}
function Ta(t) {
    const e = s().reducedMotion ? "auto" : "smooth";
    document.getElementById(t)?.scrollIntoView({
        behavior: e, block: "start"
    });
}
function Ba(t, e) {
    const n = "nocturnal-night" === t.theme ? "night" : "day", a = n !== s().theme;
    l({
        chapterId: t.id, chapterIndex: t.index, theme: n
    }), document.documentElement.dataset.theme = n, a && function (t) {
        Vn && Yn(t, s().reducedMotion ? 0 : 1200);
    }(n);
    for (const i of document.querySelectorAll(".chapter-card.is-active"))
        i.classList.remove("is-active");
    const o = document.getElementById(t.id);
    o?.querySelector(".chapter-card")?.classList.add("is-active"), function (t) {
        let e = t?.nextElementSibling;
        for (; e && !e.classList.contains("narrative-step");)
            e = e.nextElementSibling;
        for (const n of e?.querySelectorAll('img[loading="lazy"]') ?? [])
            n.loading = "eager";
    }(o), "WWF NA Bootcamp" !== t.id && l({ dayFilter: null }), En(t.activeLayers), ia(t.mapView), e.schematic.hidden = !La.has(t.id), e.clock.set(t.timeOfDay);
    const r = new URL(window.location.href);
    r.hash = t.id, window.history.replaceState(window.history.state, "", r);
}
function Pa() {
    const { trackKey: t } = s();
    for (const e of document.querySelectorAll("[data-sound-credit]")) {
        const n = P(e.dataset.soundCredit), a = n && n.id === t;
        e.textContent = a ? `${b(n.name)}. ${Dt(n)}` : "";
    }
    for (const e of document.querySelectorAll('[data-action="audio-play"]')) {
        const n = P(e.dataset.target);
        e.setAttribute("aria-pressed", String(Boolean(n && s().soundOn && n.id === t)));
    }
}
function Fa({ button: t, chapter: e, trigger: n }) {
    "protocol-drawer" === t.type && async function (t, e) {
        ha || _a(), ya = e ?? null, fa = t;
        const n = ha.querySelector(".protocol-modal__close");
        n.textContent = _("action.back_to_story"), n.setAttribute("aria-label", `${_("action.back_to_story")}: ${_("tutorial.close")}`), va(_("tutorial.loading")), ha.showModal(), a.emit("protocol:open", { deckId: t });
        try {
            const e = { "Camera Trap": "camera-trap", "Open Source Database": "opensource-database" }[t] ?? t;
            const [n, o] = await Promise.all([
                fetch(`/protocols/${e}.html`).then(t => {
                    if (!t.ok) throw new Error(`Protocol content unavailable: ${t.status}`);
                    return t.text();
                }),
                A(() => import("./reveal-runner-DAXpZE11.js"), [])
            ]);
            if (fa !== t) return;
            ga = o;
            await ga.mountDeck(ha.querySelector(".reveal"), n, s().lang);
            va("");
        } catch {
            va(_("tutorial.error"));
        }
    }(t.target, n), "species-modal" === t.type && Tt(t.target, n), "scroll-to" === t.type && Ta(t.target), "show-map" === t.type && ia(e.mapView), "audio-play" === t.type && j(t.target), "sound-library" === t.type && Wt(n);
}
function ja(t, e, n) {
    const { chapterId: a } = s();
    !function (t, e, n) {
        for (const a of e.chapters) {
            const e = t.querySelector(`#${a.id}`), o = ee(a);
            o.classList.toggle("is-active", a.id === n), e.replaceChildren(o);
        }
        for (const a of t.querySelectorAll(".act-divider"))
            a.replaceWith(Kt(Number(a.dataset.act)));
    }(e, t, a), Pa(), Xn(n), pa(), a && document.getElementById(a)?.scrollIntoView({
        behavior: "auto", block: "center"
    });
}
(async function () {
    !function () {
        const t = Ma[window.location.hash.slice(1)];
        if (!t)
            return;
        const e = new URL(window.location.href);
        e.hash = t, window.history.replaceState(window.history.state, "", e);
    }(), await E(), $a();
    const [t] = await Promise.all([Ia(), Q(), I()]), n = document.getElementById("narrative"), o = t.chapters[0];
    !function (t, e) {
        ce(t, e), c("lang", () => ce(t, e));
    }(document.getElementById("cover"), t), re(document.getElementById("nav-bar"), t), function (t, e) {
        Zt = e.chapters.length - 1;
        let n = null;
        for (const a of e.chapters) {
            a.act !== n && a.act > 0 && t.append(Kt(a.act)), n = a.act;
            const e = O("article", {
                class: "narrative-step", id: a.id, "data-chapter-id": a.id, "data-chapter-index": a.index, "data-theme": "nocturnal-night" === a.theme ? "night" : "day"
            });
            e.append(ee(a)), t.append(e);
        }
    }(n, t), function (t) {
        const e = () => {
            const t = tt("");
            return t && O("img", {
                class: "site-footer__plate", src: t.sm, srcset: et(t), sizes: "(min-width: 900px) 860px, 100vw", width: t.w, height: t.h, alt: "", loading: "lazy", decoding: "async"
            });
        }, n = () => t.replaceChildren(...[e(), se(), O("div", { class: "site-footer__credits" }, O("p", {
                class: "site-footer__lead", text: _("footer.credits")
            }), O("p", { text: _("footer.media_credits") }), O("p", {}, O("a", {
                href: "https://creativecommons.org/licenses/by-nc-sa/4.0/", rel: "license noopener", text: _("footer.license")
            })), O("p", {}, O("a", {
                href: "https://github.com/kacemamine721-star/wwf-bouhedma-geospatial-database", rel: "noopener", text: _("footer.source_code")
            })))].filter(Boolean));
        n(), c("lang", n);
    }(document.getElementById("site-footer"));
    const r = function (t) {
        const e = Kn.filter(t => "carto" !== t), n = e.map(t => O("button", {
            type: "button", "data-i18n": `map.basemap_${t}`, "aria-pressed": String(s().basemap === t), onClick: () => Jn(t)
        })), o = O("div", {
            class: "basemap-toggle", role: "group", "data-i18n-aria-label": "map.basemap_label"
        }, ...n), r = O("p", {
            class: "status-pill schematic-badge", "data-i18n": "map.schematic_badge", hidden: !0
        }), i = O("p", {
            class: "status-pill map-notice", role: "status", "data-i18n": "map.basemap_fallback_notice", hidden: !0
        });
        t.append(o, r, i), v(t);
        const l = fe(t);
        return Ve(t), c("basemap", t => {
            n.forEach((n, a) => n.setAttribute("aria-pressed", String(e[a] === t)));
        }), a.on("map:basemap-fallback", () => {
            i.hidden = !1;
        }), {
            schematic: r, clock: l
        };
    }(document.getElementById("map-pane")), i = () => t.chapters.find(t => t.id === s().chapterId) ?? o, l = Boolean(window.location.hash.slice(1));
    var d;
    (d = l ? 0 : 4e3, new Promise(t => {
        const e = [
            "scroll", "pointerdown", "keydown", "touchstart", "wheel"
        ];
        let n = 0;
        const a = () => {
            clearTimeout(n);
            for (const t of e)
                window.removeEventListener(t, a, !0);
            t();
        };
        if (!d)
            return a();
        for (const o of e)
            window.addEventListener(o, a, {
                capture: !0, passive: !0, once: !0
            });
        n = setTimeout(a, d);
    })).then(() => {
        if (Hn())
            return;
        const e = i(), n = aa(document.getElementById("map"), {
            mapView: e.mapView, bbox: t.metadata.bbox
        });
        n ? n.once("load", () => ia({
            ...i().mapView, transition: "fade"
        })) : document.getElementById("map").textContent = _("map.error");
    }), a.on("chapter:enter", ({ chapterId: e }) => {
        Ba(t.chapters.find(t => t.id === e), r);
    }), a.on("chapter:jump", ({ chapterId: t }) => Ta(t)), a.on("chapter:action", Fa), a.on("lang:change", ({ lang: e }) => ja(t, n, e)), c("dayFilter", $n), c("trackKey", Pa), c("soundOn", Pa), c("lang", Pa), sa = e(), sa.setup({
        step: ".narrative-step", offset: .5
    }).onStepEnter(({ element: t, index: e, direction: n }) => {
        clearTimeout(la), la = setTimeout(() => {
            a.emit("chapter:enter", {
                chapterId: t.dataset.chapterId, index: e, direction: n
            });
        }, 100);
    }).onStepExit(({ index: t, direction: e }) => {
        a.emit("chapter:exit", {
            index: t, direction: e
        });
    }), window.addEventListener("resize", pa), window.addEventListener("scroll", ua, { passive: !0 }), window.addEventListener("load", ua), setTimeout(da, 1500), setTimeout(da, 4e3), function () {
        const t = document.getElementById("progress-bar");
        let e = !1;
        const n = () => {
            e = !1;
            const n = document.documentElement.scrollHeight - window.innerHeight, a = n > 0 ? Math.min(window.scrollY / n, 1) : 0;
            t.style.setProperty("--progress", a.toFixed(4));
        }, a = () => {
            e || (e = !0, requestAnimationFrame(n));
        };
        window.addEventListener("scroll", a, { passive: !0 }), window.addEventListener("resize", a), n();
    }();
    const u = window.location.hash.slice(1), p = u ? document.getElementById(u) : null;
    if (p) {
        p.scrollIntoView({ block: "center" });
        let t = !1;
        const e = () => {
            t = !0;
        };
        for (const n of [
            "wheel", "touchstart", "keydown", "pointerdown"
        ])
            window.addEventListener(n, e, {
                capture: !0, passive: !0, once: !0
            });
        setTimeout(() => {
            t || p.scrollIntoView({ block: "center" });
        }, 1500);
    }
    s().chapterId || En(o.activeLayers);
})().catch(function () {
    document.getElementById("narrative").append(O("p", {
        role: "alert", text: _("site.load_error")
    }));
});
export { A as _, d, O as e, s as g, yt as s, _ as t };

