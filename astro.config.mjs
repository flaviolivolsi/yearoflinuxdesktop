// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yearoflinuxdesktop.com',
  // Whitespace-collapsing kept eating the space between text and inline
  // links/expressions. The HTML is tiny; correctness beats minification.
  compressHTML: false,
  vite: {
    // Local preview over the tailnet (http://flarchy:4321). Dev-only concern;
    // production is static files behind a real host.
    preview: {
      allowedHosts: ['flarchy', '.ts.net'],
    },
  },
});
