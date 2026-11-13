# Life Spa London – website redesign

Draft redesign for **Life Spa London** (South Ealing), built with [Astro](https://astro.build).

Live preview: **https://nassimback.github.io/lifespa-london/**

It contains three pages in three design styles, so the client can compare them side by side:

| | Style 1 – minimal | Style 2 – editorial | Style 3 – quiet classic |
|---|---|---|---|
| Home | `index.html` | `index-v2.html` | `index-v3.html` |
| HydraFacial | `hydrafacial.html` | `hydrafacial-v2.html` | `hydrafacial-v3.html` |
| Environ | `environ.html` | `environ-v2.html` | `environ-v3.html` |

A fixed **Preview** menu on the left of every page switches between the pages and the styles.
`what-we-offer-concepts.html` shows 7 alternative layouts for the "What we offer" and "Most booked" sections.

## Project structure

```
src/
  data/site.ts          styles, page list, fonts, treatments menu, contact details
  layouts/Base.astro    page shell: <head>, style bars, header, footer, preview menu, scripts
  components/           Header, Footer, PageSwitch (preview menu), WhatsApp button
  pages/*.astro         one file per page (page content only)
public/
  css/style.css         shared styles (Style 1 base)
  css/home-v2.css       Style 2 overrides
  css/home-v3.css       Style 3 overrides
  js/main.js            menu, tabs, accordions, sliders, counters, team carousel
  js/reveal.js          Style 2 reveal-on-scroll
  js/reviews-slider.js  Style 3 reviews slider
  assets/               images and videos
```

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/lifespa-london/
npm run build    # static site in dist/
```

## Deploy

The live site is served by GitHub Pages from the `gh-pages` branch (the built `dist/` folder).
To publish an update manually:

```bash
npm run build
npx gh-pages -d dist --dotfiles   # or push dist/ to the gh-pages branch
```

To deploy automatically on every push instead, move `deploy/github-pages-workflow.yml` to
`.github/workflows/deploy.yml` (this needs a GitHub token with the `workflow` scope:
`gh auth refresh -h github.com -s workflow`) and set Pages > Source to "GitHub Actions".

## Still to come from the client

Content follows the design brief (9 Nov 2026). Some items are stand-ins until Jo sends the real ones:

- Team portraits and Jo's portrait (`assets/team-*.jpg` are stock placeholders)
- HydraFacial before/after photos (`assets/demo-result-*.jpg` are placeholders; the "before" is the same photo filtered)
- Perk Lip, Perk Eye and Keravive prices (shown as "Ask us")
- Real booking links (Book buttons currently point to `#`)
