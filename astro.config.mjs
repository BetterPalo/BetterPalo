// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { lgu } from './src/config/lgu.ts';

export default defineConfig({
  site: lgu.siteUrl,
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fil'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    // React islands are allowed (ADR 0010), but the integration is only needed
    // once a page hydrates one. Registering it with no islands emits an unused
    // ~216 KB client runtime into dist/, so add it back with the first island.
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fil: 'fil' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
