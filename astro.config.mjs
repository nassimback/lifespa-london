// @ts-check
import { defineConfig } from 'astro/config';

// Deployed to GitHub Pages at https://nassimback.github.io/lifespa-london/
// `build.format: 'file'` outputs index.html, hydrafacial.html, index-v2.html ...
// so the relative links between pages (and to assets/, css/, js/) work at any base path.
export default defineConfig({
  site: 'https://nassimback.github.io',
  base: '/lifespa-london',
  build: { format: 'file' },
});
