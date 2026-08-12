// @ts-check
import { defineConfig } from 'astro/config';

// Custom domain served at the root (see public/CNAME).
// Default build.format is 'directory' -> clean URLs like /about/, /news/.
export default defineConfig({
  site: 'https://stormbreaker.squadri.me',
  trailingSlash: 'ignore',
  // Disable Shiki's default dark-themed highlighting; code blocks are styled as
  // ink terminal blocks in article.css so they read in both light and dark.
  markdown: {
    syntaxHighlight: false,
  },
});
