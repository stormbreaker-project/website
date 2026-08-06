// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain served at the root (see public/CNAME).
// Default build.format is 'directory' -> clean URLs like /about/, /news/.
export default defineConfig({
  site: 'https://stormbreaker.squadri.me',
  trailingSlash: 'ignore',
});
