# 0010: Technology stack and hosting

- Status: Accepted
- Date: 2026-11-06

## Context

The charter asks for a site that answers a resident's question on a phone, on a
slow connection, without an account. Many Palo residents browse on mobile, some
on low-end devices. The reference device is the **Huawei P20 Lite** (2018):
Kirin 659 with eight Cortex-A53 cores, Mali-T830 GPU, 4 GB RAM, and a 2280 ×
1080 screen. It shipped with Android 8 and was updated to at most Android 9.
Chrome 138 is the last Chrome release for Android 8 and 9, so this device stays
on Chrome 138 (mid-2025) or the Huawei Browser from now on.

v1 is almost entirely static content: service guides, offices and officials,
About Palo, official resources, search, two languages, and print sheets
([ADR 0005](0005-positioning-and-phased-roadmap.md)). Every service guide must
pass the verified-only publishing gate
([ADR 0006](0006-content-format-for-service-guides.md),
[ADR 0007](0007-service-guide-content-model.md)). Later phases may add an
ordinance index, maps, and report forms.

The team has agreed on TypeScript, Astro, and Cloudflare, and is familiar with
React. [ADR 0008](0008-own-stack-with-betterlgu-as-reference.md) proposes an
own stack and template with BetterLGU as reference.

Cloudflare's Workers Free plan allows 100,000 requests per day and 10 ms of CPU
time per invocation. Requests to static assets are free and unlimited and do
not run Worker code.

## Decision

### Stack

| Area | Choice |
| --- | --- |
| Language | TypeScript, `strict` mode |
| Framework | Astro 6, static output (`output: "static"`) |
| UI components | `.astro` components by default; React (with TypeScript) islands for interactive parts and animations that need state |
| Content | Astro content collections with Zod schemas that implement ADR 0006 and ADR 0007 |
| Styling | Tailwind CSS v4 through its Vite plugin, plus a print stylesheet; system font stack, no web fonts |
| Search | Pagefind, built at deploy time, loaded only on the search page |
| Languages | Astro i18n routing: `en` (default) and `fil`; `war` (Waray) added if ADR 0009 is approved |
| Hosting | Cloudflare Workers with static assets, assets-only (no Worker script) in v1 |
| Analytics | Cloudflare Web Analytics (cookieless) |
| Maps (v3) | Leaflet, loaded only on map pages, OpenStreetMap tiles with attribution |
| Later backend | Workers + D1 for the ordinance index at scale and report forms; Turnstile as the CAPTCHA; KV and R2 only if a feature needs them |
| Runtime and tools | Node.js 26 LTS, pnpm 12; see Tooling |

### React islands

React is allowed, but only as islands. Astro ships zero JavaScript for a page
unless a component on it is hydrated, and the React runtime adds roughly 50 to
60 KB compressed to every page that hydrates one. On the reference device that
cost is real, so:

- Pages are `.astro` by default. Use React only where a component needs state
  or an animation that CSS cannot do.
- Hydrate with `client:visible` or `client:idle`. `client:load` needs a reason
  in the pull request.
- Prefer CSS transitions, CSS animations, and cross-document View Transitions
  (supported in Chrome 138) for motion. Add an animation library only through a
  pull request that shows its size against the budget.
- Every animation respects `prefers-reduced-motion`, and every page stays
  readable with JavaScript turned off.
- React components never fetch content at runtime; content comes from content
  collections at build time and is passed as props.

### Publishing gate in the build

- Each content collection has a Zod schema. A missing required field fails the
  build.
- Only entries with `status: verified` and a `source`, `edition`, and
  `last_verified` are rendered. Other entries stay in the repository but produce
  no page.
- `null` content fields render as "Not stated in the official source. Ask the
  [office]."

### Languages

- Locale codes: `en`, `fil`, and `war` (ISO 639 codes for English, Filipino,
  and Waray), with matching `lang` attributes.
- Routes: `/` for English, `/fil/…` and `/war/…` for the others.
- An untranslated page is not silently replaced. It shows the English text with
  a visible `translation-pending` notice in the reader's language, so the
  charter's marking rule holds.
- Official office names, personal names, and legal terms stay verbatim, as
  `CONTRIBUTING.md` requires.

### Hosting on Cloudflare

- Deploy with Wrangler to Workers with static assets. Pages is not used:
  Cloudflare now steers new projects to Workers, and the same project can add
  Worker routes later without moving.
- v1 has no Worker script, so every request is a static asset and the 10 ms CPU
  limit does not apply.
- Security and cache headers come from a `_headers` file; Astro's Content
  Security Policy support generates script and style hashes.
- A custom 404 page in all languages, configured through Wrangler's
  not-found handling.

### Site basics

- **Domain:** `betterpalo.org`, registered through Cloudflare Registrar so
  DNS, hosting, and analytics stay in one account.
- **Contact:** `betterpalolgu@gmail.com` is the public project address. No
  personal email of a team member is published.
- **Print sheets:** a print stylesheet only (`@media print`), no generated PDFs.
  Each sheet shows the service name, office, requirements, fees, processing
  time, source, last-verified date, and a QR code back to the live page.
- **Search engines and sharing:** `@astrojs/sitemap`, a `robots.txt`, `hreflang`
  links between the language versions of each page (plus `x-default` pointing
  to English), and a static share image per service page built at deploy time
  (ADR 0009).
- **Analytics:** Cloudflare Web Analytics only. No uptime monitor.
- **Content editing:** no CMS. Contributors edit content files through GitHub,
  including its web editor, or report problems through the issue forms.

### Staying inside 10 ms later

When a Worker route is added:

- Never render pages on request. Pages stay static; Workers handle only APIs
  such as form submission or ordinance queries.
- Time spent waiting on D1, KV, R2, or `fetch` is not CPU time. Keep CPU work
  small: validate input, run one indexed query, return JSON.
- Precompute at build time anything that can be precomputed, such as ordinance
  listings and search indexes.
- Measure CPU time in staging before release. If a route cannot fit, move it to
  the Workers Paid plan or redesign it, recorded in an ADR.
- Report forms need Turnstile, rate limiting, and the Data Privacy Act review
  that ADR 0005 already requires for citizen reports.

### Performance budget

Measured on a throttled mobile profile (Lighthouse "Slow 4G" with 4× CPU
slowdown) and checked on a real P20 Lite or similar device before each release:

| Metric | Budget |
| --- | --- |
| JavaScript on content pages without islands | 0 KB |
| JavaScript on pages with React islands | At most 90 KB compressed, including the React runtime |
| JavaScript on search or map pages | At most 100 KB compressed, loaded on interaction or when visible |
| HTML + CSS per page | At most 60 KB compressed |
| Total transfer for a service guide | At most 150 KB |
| Largest Contentful Paint | At most 2.5 s |
| Interaction to Next Paint | At most 200 ms |
| Cumulative Layout Shift | At most 0.1 |

### Browser support

- Floor: Chrome 138 on Android 8 and 9, plus current Huawei Browser, Samsung
  Internet, Safari on iOS 16.4 or later (Tailwind CSS v4's minimum), and
  Facebook's in-app browser.
- Use CSS and JavaScript features available in Chrome 138. Anything newer needs
  a fallback that keeps the page readable.
- Every page must be readable with JavaScript turned off.

### Tooling

Versions checked on 2026-11-06.

| Tool | Choice | Pinned in |
| --- | --- | --- |
| Node.js | 26.13.0, the current Active LTS line (security support until 2029-04-30) | `.nvmrc`, `engines.node` (`>=26.13.0 <27`) |
| pnpm | 12.18.0, the current stable line (pnpm 12, released 2026-08-26) | `packageManager` in `package.json` |
| npm | Only used once to install pnpm; the version bundled with Node is fine | Not pinned |
| Lockfile | `pnpm-lock.yaml`, committed; CI runs `pnpm install --frozen-lockfile` | Repository |
| Dependency versions | Exact versions only (`save-exact=true`), `engine-strict=true` | `.npmrc` |
| Updates | Renovate, weekly, grouped; Node, pnpm, Astro, and React majors reviewed by hand | `renovate.json` |
| Linting | ESLint (flat config) with `typescript-eslint`, `eslint-plugin-astro`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` | `eslint.config.js` |
| Formatting | Prettier with `prettier-plugin-astro` and `prettier-plugin-tailwindcss` | `.prettierrc` |
| Unit tests | Vitest, using Astro's `getViteConfig()`; covers content schemas, the publishing gate, and helpers | `vitest.config.ts` |
| End-to-end and accessibility | Playwright with `@axe-core/playwright`, mobile viewport | `playwright.config.ts` |
| Performance | Lighthouse CI against the performance budget | `lighthouserc.json` |
| Markdown | markdownlint-cli2 and lychee (existing) | `.markdownlint*` |

Notes:

- Node 25 and later no longer ship Corepack, so contributors install pnpm with
  `npm install -g pnpm@12.18.0`. pnpm then follows the `packageManager` field.
- Node 24 (security support until 2028-04-30) is the fallback if a dependency
  does not yet support Node 26.
- pnpm has no LTS label. Stay on the 12 line and take minor and patch updates
  through Renovate pull requests.
- Biome is not used yet because its Astro file support is still experimental.
  Revisit when it is stable.

Scripts in `package.json`:

| Script | Runs |
| --- | --- |
| `dev` | `astro dev` |
| `build` | `astro build`, then Pagefind |
| `preview` | Wrangler local preview of the built site |
| `check` | `astro check` and `tsc --noEmit` |
| `lint` | ESLint and markdownlint |
| `format` | Prettier (`format:check` in CI) |
| `test` | Vitest |
| `test:e2e` | Playwright and axe |

### Quality checks in CI

On every pull request, in this order: install with the frozen lockfile,
`format:check`, `lint`, `check`, `test`, `build`, `test:e2e`, Lighthouse CI,
and the existing Markdown and link checks. A scheduled job checks external
source URLs, since official sites move.

### Preview builds

Cloudflare Workers Builds deploys each pull request branch as a preview and can
comment the link on the pull request. The Free plan allows 3,000 build minutes
a month, one build at a time, and 20 minutes per build. A static build should
take one to two minutes, so this is enough for the project; pull requests pushed
close together wait in turn.

## Consequences

- v1 pages work on old phones and slow connections because they ship little or
  no JavaScript.
- Hosting is free for v1 and has no CPU limit to manage.
- The publishing gate lives in the schema, so it cannot be skipped by accident.
- The team's React experience carries over, but React must stay in islands;
  reviewers check the bundle size of any pull request that adds one.
- Tailwind keeps styling consistent; non-developers editing content do not need
  to touch it.
- `package.json`, `src/`, `public/`, and Wrangler configuration may be added once
  this ADR is accepted; `CONTRIBUTING.md` must be updated at the same time.
- Astro is owned by Cloudflare since January 2026 and remains MIT-licensed. The
  site stays portable because the output is plain static files.

## Future direction

These notes are not binding. Each item needs its own ADR when it is actually
built.

| Need | Likely choice | Why |
| --- | --- | --- |
| Worker routes (APIs, form handling) | Hono | Small, fast router built for Workers; validates input with Zod, which the content schemas already use; fits the 10 ms CPU budget |
| Database for the ordinance index and report forms | D1 with Drizzle ORM | Typed queries and migrations kept in git; light enough for Workers |
| Report form abuse protection | Turnstile plus the Workers Rate Limiting binding | Turnstile checks for bots; rate limiting stops floods that pass it |
| Report form privacy | Data Privacy Act review, minimal fields, clear "unverified" labels | Required by ADR 0005 before any citizen report intake |
| Copies of official documents | R2 | Keeps a dated copy of each cited PDF so links survive when LGU sites move; government works are not copyrighted (RA 8293 Section 176), and the source is still recorded |
| Maps | Leaflet with PMTiles (Protomaps) served from R2 | Avoids depending on OpenStreetMap's public tile servers, whose usage policy limits heavy use |
| Small caches or settings | KV | Only where D1 or static files do not fit |
| Offline use | A service worker that caches guides a resident has opened | Helps on weak signal; print sheets cover this in v1 |
| Error visibility | Workers Logs | Needed once Worker code exists |
| Waray | Third locale, `war` | Added through ADR 0009 if approved |

## Alternatives

- **No UI framework (vanilla TypeScript only):** considered. Lightest option,
  but the team wants React for interactive parts and animations.
- **Preact instead of React:** smaller runtime with a similar API. Can be
  revisited if React islands push pages over budget.
- **Next.js or another server-rendered React framework:** rejected. Server
  rendering on Workers runs into the 10 ms CPU limit and adds JavaScript the
  content does not need.
- **Cloudflare Pages:** acceptable, but not chosen. Workers with static assets
  covers the same static use case and grows into Worker routes, D1, and KV in one
  project.
- **Web fonts:** rejected for v1. The system font stack avoids extra downloads
  and covers Filipino and Waray text.
