#!/usr/bin/env node
// Checks a deployed BetterPalo site, production by default.
//
//   pnpm smoke
//   SMOKE_BASE_URL=https://preview.example.workers.dev pnpm smoke
//
// The deploy workflow runs this after `wrangler deploy`. It retries because a
// new version can take a few seconds to answer everywhere.

const baseURL = (
  process.env.SMOKE_BASE_URL ??
  process.argv[2] ??
  'https://betterpalo.betterpalogov.workers.dev'
).replace(/\/+$/, '');

const attempts = Number(process.env.SMOKE_ATTEMPTS ?? 6);
const delayMs = Number(process.env.SMOKE_DELAY_MS ?? 5_000);
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 10_000);

const missingPage = '/-smoke-test-missing-page/';

async function get(path) {
  const response = await fetch(`${baseURL}${path}`, {
    redirect: 'follow',
    signal: AbortSignal.timeout(timeoutMs),
    headers: { 'user-agent': 'betterpalo-smoke-test' },
  });
  return { response, body: await response.text() };
}

async function audit() {
  const failures = [];
  const check = (name, condition, detail) => {
    if (condition) return;
    failures.push(detail ? `${name}: ${detail}` : name);
  };

  const home = await get('/');
  const homeType = home.response.headers.get('content-type') ?? '';
  check('GET / returns 200', home.response.status === 200, String(home.response.status));
  check('GET / is HTML', homeType.includes('text/html'), homeType);
  check('GET / has an <h1>', /<h1[\s>]/.test(home.body));
  // The strings checked here ("Skip to content", "Page not found") come from
  // the base layout and the 404 page. Update them here if that copy changes.
  check('GET / has the skip link', home.body.includes('Skip to content'));

  check(
    'GET / sends X-Content-Type-Options',
    home.response.headers.get('x-content-type-options') === 'nosniff',
  );
  check('GET / sends X-Frame-Options', home.response.headers.get('x-frame-options') === 'DENY');
  check(
    'GET / sends Referrer-Policy',
    home.response.headers.get('referrer-policy') === 'strict-origin-when-cross-origin',
  );
  check(
    'GET / sends Permissions-Policy',
    (home.response.headers.get('permissions-policy') ?? '').includes('camera=()'),
  );

  const fil = await get('/fil/');
  check('GET /fil/ returns 200', fil.response.status === 200, String(fil.response.status));
  check('GET /fil/ is in Filipino', fil.body.includes('<html lang="fil"'));

  const cssHref = home.body.match(/href="(\/_astro\/[^"]+\.css)"/)?.[1];
  check('GET / links a stylesheet', Boolean(cssHref));
  if (cssHref) {
    const css = await get(cssHref);
    const cssType = css.response.headers.get('content-type') ?? '';
    check(`GET ${cssHref} returns 200`, css.response.status === 200, String(css.response.status));
    check(`GET ${cssHref} is CSS`, cssType.includes('text/css'), cssType);
    check(
      `GET ${cssHref} is cached immutably`,
      (css.response.headers.get('cache-control') ?? '').includes('immutable'),
      css.response.headers.get('cache-control') ?? 'no Cache-Control',
    );
  }

  const robots = await get('/robots.txt');
  check(
    'GET /robots.txt returns 200',
    robots.response.status === 200,
    String(robots.response.status),
  );
  check('GET /robots.txt names the sitemap', robots.body.includes('Sitemap:'));

  const sitemap = await get('/sitemap-index.xml');
  check(
    'GET /sitemap-index.xml returns 200',
    sitemap.response.status === 200,
    String(sitemap.response.status),
  );
  check('GET /sitemap-index.xml is XML', sitemap.body.includes('<sitemapindex'));

  const favicon = await get('/favicon.svg');
  check(
    'GET /favicon.svg returns 200',
    favicon.response.status === 200,
    String(favicon.response.status),
  );
  check(
    'GET /favicon.svg is an SVG',
    (favicon.response.headers.get('content-type') ?? '').includes('image/svg+xml'),
    favicon.response.headers.get('content-type') ?? 'no Content-Type',
  );

  const missing = await get(missingPage);
  check(
    `GET ${missingPage} returns 404`,
    missing.response.status === 404,
    String(missing.response.status),
  );
  check('the 404 page is the custom one', missing.body.includes('Page not found'));

  return failures;
}

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  let failures;
  try {
    failures = await audit();
  } catch (error) {
    failures = [`request failed: ${error.message}`];
  }

  if (failures.length === 0) {
    console.log(`${baseURL} passed the smoke test.`);
    process.exit(0);
  }

  if (attempt === attempts) {
    console.error(`${baseURL} failed the smoke test:`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.error(`Attempt ${attempt} of ${attempts} failed, retrying in ${delayMs} ms.`);
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}
