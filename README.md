# Bouhedma National Park story map — WWF brand alternative

A proposed alternative design for the Bouhedma National Park story map
(WWF North Africa Talent Academy 2026), restyled on the WWF brand guidelines.

- Original site: https://bnpstorymap.vercel.app — source: https://github.com/HibaBenAribi/bnp_storymap
- This version keeps the original content, data, map and features; it changes the design and fixes bugs.

## What changed

**Fixes to the original**
- Fonts never loaded (all font URLs returned 404); fonts are now self-hosted in `Internal-data/fonts/`.
- The French interface fell back to English because `fr.json` had an unterminated string.
- Arabic map labels: the right-to-left text plugin pointed at a path that did not exist.
- Literal `*asterisks*` around species names now render as italics.
- Typos (Savana, Coexistance) and broken photographer credits.

**WWF brand design** (`Internal-data/css/wwf-brand.css`)
- WWF display font for upper-case headlines; Georgia for story text; Open Sans for UI and data; Noto Sans Arabic.
- Black and white as principal colours, one WWF secondary swatch per chapter (contrast-checked to WCAG AA).
- Publication-style cover, black title box per chapter with a WWF infographic icon, WWF boilerplate badge in the footer.
- Neutral basemap with field layers drawn in WWF swatches.

## Run locally

The site is prebuilt static files; any static server works:

```sh
npx serve .
```

## Licences

Story, data and illustrations: CC BY-NC-SA 4.0 (as in the original).
The WWF font, logo and infographic icons are WWF brand assets, used here for a WWF North Africa project.
