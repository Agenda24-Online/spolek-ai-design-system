import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://agenda24-online.github.io',
  base: '/spolek-ai-design-system',
  output: 'static',
  build: {
    assets: '_assets'
  }
});
