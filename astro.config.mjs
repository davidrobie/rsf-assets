import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lwi21c.com',
  // When you move to the permanent domain, change `site` above.
  // Set `base` only if hosting in a subdirectory (you aren't).
  build: {
    format: 'directory', // produces /chapter-1/index.html — matches Wix URL style and looks clean
  },
  trailingSlash: 'ignore',
});
