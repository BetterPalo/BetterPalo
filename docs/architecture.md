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
  content/
    services/          one YAML file per service guide; _template.yaml to copy
  content.config.ts    content collections and their Zod schemas
  lib/
    schemas/           Zod schemas (plain TypeScript, unit-tested)
    publishing.ts      the verified-only publishing gate
    data.ts            the only module that reads content collections
  i18n/ui.ts           interface strings for en and fil
  layouts/             page shells (Base.astro)
  components/          .astro components; React islands as .tsx
  pages/               routes; /fil/ for Filipino
    api/               empty on purpose, reserved for future endpoints
  styles/global.css    Tailwind import, design tokens, print styles
public/                robots.txt, _headers, favicon; copied as is
tests/
  unit/                Vitest: schemas, the publishing gate, helpers
  e2e/                 Playwright and axe on a mobile viewport
wrangler.jsonc         Cloudflare Worker configuration (assets only in v1)
```

## Data flow

```text
src/content/services/*.yaml
  → Zod schema (build fails on a missing or malformed field)
  → src/lib/data.ts (drops anything not publishable)
  → pages under src/pages/ (static HTML)
  → dist/ → Pagefind index → Cloudflare static assets
```

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
- If a GitHub Actions job ever needs a credential, it is a scoped Cloudflare
  API token stored as a repository secret, not a personal password.
- Never commit a token, password, or `.dev.vars`. If one is committed by
  mistake, tell the lead at once so it can be revoked; deleting the commit is
  not enough.

## Languages

- English is served at `/`, Filipino at `/fil/`.
- Interface strings live in `src/i18n/ui.ts`. A missing Filipino string falls
  back to English.
- An untranslated page shows the English text with a visible
  `translation-pending` notice, as the charter requires.

## Deployment

- Production deploys from the `Deploy` workflow after the `CI` workflow
  succeeds on `main`, using the `dist/` artifact CI built
  ([ADR 0012](decisions/0012-deploy-after-ci.md)). Nobody deploys from a laptop.
- Cloudflare Workers Builds still builds every pull request branch as a preview
  version and comments the link on the pull request.
- Build command `pnpm build`; deploy command `pnpm exec wrangler deploy`;
  preview command `npx wrangler versions upload`.
- After a deploy, `pnpm smoke` checks the live site, its security headers, the
  stylesheet, `robots.txt`, the sitemap, and the custom 404.
- Security and cache headers come from `public/_headers`. Missing pages are
  served by `404.html` through `not_found_handling` in `wrangler.jsonc`.
