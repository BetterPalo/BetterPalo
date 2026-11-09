// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://betterpalo.org',
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
