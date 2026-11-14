// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
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
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', fil: 'fil' } },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
