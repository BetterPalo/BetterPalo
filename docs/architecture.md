# Architecture

How the site is put together, and the rules that keep it ready for a backend
later without building one now. The stack itself is decided in
[ADR 0010](decisions/0010-technology-stack-and-hosting.md); this page describes
how the code follows it.

## v1 in one paragraph

v1 has no backend. Astro builds every page to static HTML at deploy time from
YAML files in `src/content/`. Cloudflare Workers serves the built `dist/`
folder as static assets, with no Worker script. Pagefind builds a search index
at deploy time and runs in the browser. "Report a wrong detail" links to the
data-correction issue form on GitHub.

## Folder layout

```text
src/
  config/
    lgu.ts               the LGU's identity, facts, and URLs (LGU-owned)
  content/
    services/            one YAML file per service guide; _template.yaml to copy
  content.config.ts      content collections and their Zod schemas
  lib/
    lgu.ts               config type, derived terms, placeholder values
    schemas/             Zod schemas (plain TypeScript, unit-tested)
    publishing.ts        the verified-only publishing gate
    data.ts              the only module that reads content collections
    sample-content.ts    the SAMPLE_CONTENT flag (off by default)
  i18n/ui.ts             interface strings for en and fil, with placeholders
  layouts/               page shells (Base.astro)
  components/            .astro components; React islands as .tsx
  pages/                 routes; /fil/ for Filipino
    robots.txt.ts        generated from the config, not a static file
    api/                 empty on purpose, reserved for future endpoints
  styles/global.css      Tailwind import, design tokens, print styles
examples/
  services/              fictional sample guide, loaded only with SAMPLE_CONTENT=true
public/                  _headers, favicon; copied as is
scripts/                 smoke-test.mjs, check-no-sample.mjs, init-lgu.mjs
tests/
  unit/                  Vitest: schemas, the publishing gate, helpers
  e2e/                   Playwright and axe on a mobile viewport
wrangler.jsonc           Cloudflare Worker configuration (assets only in v1)
```

## Data flow

```text
src/content/services/*.yaml
  → Zod schema (build fails on a missing or malformed field)
  → src/lib/data.ts (drops anything not publishable)
  → pages under src/pages/ (static HTML)
  → dist/ → Pagefind index → Cloudflare static assets
```

## LGU configuration

The template and each LGU's copy meet at one seam. The template owns the code,
the placeholder strings, the workflows, and the tests. Each LGU owns one file,
`src/config/lgu.ts`, which holds its identity, facts, and URLs. The template
reads that file and never edits it, so a copy can take later template fixes
without conflicts ([ADR 0014](decisions/0014-lgu-configuration-seam.md)).

- `src/lib/lgu.ts` defines the config type, derives the English and Filipino
  terms from `type` (`municipality` or `city`), and builds the placeholder values.
- Strings in `src/i18n/ui.ts` use placeholders such as `{place}`. `t()` fills
  them from the config, in the language of the page.
- `pnpm init:lgu` asks for the values and writes `src/config/lgu.ts`, the Worker
  name in `wrangler.jsonc`, and the package name in `package.json`. It does no
  find-and-replace and never fills a fact with a default.

Placeholders, by name:

| Placeholder | What it is |
| --- | --- |
| `{brand}` | the site's brand name |
| `{place}` | the LGU's name |
| `{province}` | the province |
| `{lguPhrase}` | the type phrase with the name, for example "Municipality of X" or "City of X" |
| `{lguKind}` | the word for the type, in each language |
| `{lguHall}` | the word for the government hall, in each language |
| `{lguAdj}` | the adjective "Municipal" or "City", kept in English |
| `{council}` | the council's Filipino name, the same in both languages: "Sangguniang Bayan" or "Sangguniang Panlungsod" |
| `{charterTitle}`, `{charterEdition}`, `{charterYear}` | the Citizen's Charter title, edition, and year |
| `{censusSource}`, `{censusYear}`, `{censusDate}` | the census source, year, and reference date |
| `{barangays}` | the number of barangays |

Never write a place name or a figure in `src/i18n/ui.ts`. Add a placeholder in
`src/lib/lgu.ts` instead, and put the value in the config.

## Publishing gate

- The schema in `src/lib/schemas/service.ts` implements
  [ADR 0006](decisions/0006-content-format-for-service-guides.md) and
  [ADR 0007](decisions/0007-service-guide-content-model.md).
- A service with `status: verified` must have `source`, `edition`,
  `retrieved`, `verified_by`, `last_verified`, and `office`, or the build
  fails.
- Only `verified` services get a page. Drafts stay in the repository.
- A `null` field means the official source does not say. Pages show "Not
  stated in the official source. Ask the office." instead.
- The file name must match `id` (`cedula.yaml` has `id: cedula`).

## Rules that keep a backend easy to add

v1 builds none of these. Following the rules means adding them later is a
small change rather than a rewrite.

1. **One data module.** Pages and components get data only through
   `src/lib/data.ts` (`listServices()`, `getService(id)`, and later
   `listOffices()` and similar). They never call `getCollection()` directly.
   If data later moves to D1, only that file changes.
2. **Stable IDs.** Every record has a lowercase, hyphenated `id` that is also
   its URL. IDs are never reused or renamed without a redirect. These become
   primary keys if the records are loaded into a database.
3. **Typed records.** Every collection has a Zod schema. The same schema can
   validate API input later.
4. **Static by default.** `output: "static"` stays. When one route needs to
   run on request, add the `@astrojs/cloudflare` adapter and mark only that
   route with `export const prerender = false`. Pages are never rendered on
   request (ADR 0010, "Staying inside 10 ms later").
5. **Bindings in config.** `wrangler.jsonc` is the single place for Cloudflare
   resources. A database, cache, or bucket is added as a binding there
   (`d1_databases`, `kv_namespaces`, `r2_buckets`), in the same pull request
   as the ADR that approves it.
6. **Reserved API folder.** `src/pages/api/` is empty in v1. Future endpoints
   go there, for example a feedback form handler.
7. **No runtime fetching in components.** React islands receive content as
   props at build time.

Features that would need a backend, each needing its own ADR first because v1
scope excludes intake: a feedback form with Turnstile, ordinance change
alerts, and a queue for community corrections. Likely choices are listed in
ADR 0010 under "Future direction".

## Secrets

- v1 has no secrets.
- Local secrets for `wrangler dev` go in `.dev.vars`, which is gitignored.
  `.dev.vars.example` lists the names with empty values and is committed.
- Production secrets are set in the Cloudflare dashboard (or with
  `wrangler secret put`) by the infrastructure lead, never in a file.
- The deploy job's credentials, `CLOUDFLARE_API_TOKEN` and
  `CLOUDFLARE_ACCOUNT_ID`, are secrets of the `production` GitHub environment,
  which only the `main` branch can use. They are not repository secrets. Any
  other job that needs a credential gets a scoped Cloudflare API token the same
  way, never a personal password.
- Never commit a token, password, or `.dev.vars`. If one is committed by
  mistake, tell the lead at once so it can be revoked; deleting the commit is
  not enough.

## Languages

- English is served at `/`, Filipino at `/fil/`.
- Interface strings live in `src/i18n/ui.ts`. A missing Filipino string falls
  back to English. A string that names the LGU or a figure uses a
  [placeholder](#lgu-configuration), which `t()` fills in each language.
- An untranslated page shows the English text with a visible
  `translation-pending` notice, as the charter requires.

## Deployment

- Production deploys from the `deploy` job in `.github/workflows/ci-cd.yml`,
  after `quality`, `audit`, `build`, `e2e`, and `lighthouse` pass in the same run
  ([ADR 0012](decisions/0012-deploy-after-ci.md)). Nobody deploys from a laptop.
- Cloudflare Workers Builds still builds every pull request branch as a preview
  version and comments the link on the pull request.
- Workers Builds settings: build command `pnpm build`, preview command
  `npx wrangler preview` (the `"previews": {}` block in `wrangler.jsonc` is
  what it needs). Workers Builds does not deploy production.
- The production deploy command, `pnpm exec wrangler deploy`, runs in the
  `deploy` job, not in Workers Builds.
- `PRODUCTION_URL` is a required repository variable. No workflow has a default
  URL: without it the `deploy` job stops at its first step with an error, and the
  hourly monitor skips with a notice.
- The `build` and `deploy` jobs run `node scripts/check-no-sample.mjs dist`, which
  fails if sample content is in the site. The e2e job's second phase builds with
  `SAMPLE_CONTENT=true` and tests the sample guide page; that build is never
  uploaded, so it cannot deploy.
- After a deploy, `pnpm smoke` checks the live site, its security headers, the
  stylesheet, `robots.txt`, the sitemap, and the custom 404.
- Security and cache headers come from `public/_headers`. Missing pages are
  served by `404.html` through `not_found_handling` in `wrangler.jsonc`.
