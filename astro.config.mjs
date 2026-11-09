// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO(@Zyxary, @Rurur8): change to https://betterpalo.org once the domain is
  // registered, and update the Sitemap line in public/robots.txt too.
  site: 'https://betterpalo.betterpalogov.workers.dev',
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
