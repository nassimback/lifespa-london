# Life Spa London – website redesign

Draft redesign for **Life Spa London** (South Ealing), built with [Astro](https://astro.build).

Live preview: **https://nassimback.github.io/lifespa-london/**

Pages: `index.html` (home), `hydrafacial.html`, `environ.html` – one design (the former "Style 2"),
updated with the first round of team feedback (17 Nov 2026).

## Project structure

```
src/
  data/site.ts          page list, fonts, treatments menu, contact details, opening hours
  layouts/Base.astro    page shell: <head>, awards bar, header, footer, scripts
  components/           Header (with treatments dropdown), Footer, WhatsApp button
  pages/*.astro         one file per page (page content only)
public/
  css/style.css         shared styles (Style 1 base)
  css/home-v2.css       design layer (fonts, sections)
  css/site.css          feedback round 1: black & white, dropdown, footer, framed photos
  js/main.js            menu, tabs, accordions, sliders, counters, team carousel
  js/reveal.js          Style 2 reveal-on-scroll
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
To publish an update: `npm run build`, then push the contents of `dist/` to the `gh-pages` branch.

To deploy automatically on every push instead, move `deploy/github-pages-workflow.yml` to
`.github/workflows/deploy.yml` (needs a GitHub token with the `workflow` scope:
`gh auth refresh -h github.com -s workflow,repo,read:org,gist`) and set Pages > Source to "GitHub Actions".

## Still to come from the client

Content follows the design brief (9 Nov 2026). Some items are stand-ins until Jo sends the real ones:

- Team portraits and Jo's portrait (`assets/team-*.jpg` are stock placeholders)
- HydraFacial before/after photos (`assets/demo-result-*.jpg` are placeholders; the "before" is the same photo filtered)
- Perk Lip, Perk Eye and Keravive prices (shown as "Ask us")
- Real booking links (Book buttons currently point to `#`)
