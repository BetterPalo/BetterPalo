import type { APIRoute } from 'astro';

// Generated so the Sitemap line follows `site` in astro.config.mjs (from
// src/config/lgu.ts). Output must stay byte-identical to the old public/robots.txt.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`);
};
