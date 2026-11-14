# BetterPalo

A community-run, unofficial portal that makes Palo's government information and public services easier to find, understand, and verify.

> **Status:** early development. The site is live and the pages, search index,
> English and Filipino routing, and the deploy pipeline work. No service guides
> are published yet; each one is added only after it has been verified
> against the Citizen's Charter.

## Use this as a template for your own LGU

BetterPalo is a **template repository**. Click **Use this template** on GitHub to
start a portal for another municipality or city. It gives you:

- an Astro, TypeScript, and Tailwind static site that ships almost no JavaScript;
- a **verified-only service guide model** based on the Citizen's Charter layout
  that every Philippine LGU publishes under RA 11032: a guide is published only
  with a source, an edition, a verifier, and a verification date, and the build
  fails otherwise;
- English and Filipino routes, a sitemap, a 404 page, and a Pagefind search
  index (the search page itself is still being built);
- CI with unit, end-to-end, accessibility, and Lighthouse checks, a dependency
  audit, and a free deploy to Cloudflare Workers.

What you must replace is Palo's identity, figures, and text, and the project
documents about Palo. Everything you need to change is listed, file by file, in
[`docs/adapt-for-your-lgu.md`](docs/adapt-for-your-lgu.md).

Do not copy Palo's data, charter, or team documents as your own. They describe
Palo and are not facts about your LGU. See [Licenses](#licenses).

## Run it locally

You need Node.js (the version in [`.nvmrc`](.nvmrc)) and pnpm (the version in the
`packageManager` field of [`package.json`](package.json)).

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

With no service guides yet, the services page shows an empty state and the build
prints a warning that the `services` collection is empty. That is expected until
you add your first guide (copy [`src/content/services/_template.yaml`](src/content/services/_template.yaml)).

Before you open a pull request, run:

```sh
pnpm format && pnpm lint && pnpm check && pnpm test && pnpm build
```

Run `pnpm test:e2e` after changing a page or component, and `pnpm test:lighthouse`
after changing markup, styles, fonts, or scripts. The full set-up notes, including
Windows and WSL, are in [`CONTRIBUTING.md`](CONTRIBUTING.md#set-up).

## Deploy for free on Cloudflare

The site is plain static files, so it runs on the Cloudflare Workers free plan.
To publish a first version from your computer:

1. Create a free Cloudflare account.
2. In [`wrangler.jsonc`](wrangler.jsonc), change `name` to your own Worker name.
3. Build the site: `pnpm build`.
4. Sign in: `pnpm exec wrangler login`.
5. Deploy: `pnpm exec wrangler deploy`. It prints your `workers.dev` address.
6. Put that address in `site` in [`astro.config.mjs`](astro.config.mjs) and in the
   `Sitemap:` line of [`public/robots.txt`](public/robots.txt), then build and
   deploy again.

To deploy automatically from GitHub after every merge, follow
[Automatic deploys](docs/adapt-for-your-lgu.md#automatic-deploys-from-github). Set
`PRODUCTION_URL` first, or the workflows will check Palo's site instead of yours.

## What the Palo portal includes (v1)

- Service guides (about 10 to 12), each fully verified: where to go, what to
  bring, cost, and processing time.
- Offices and officials: elected officials, departments, what each does, where
  it is, and verified public contacts.
- About Palo and barangays: municipal profile, the 33-barangay list, and PSA
  2024 census figures labeled by census year.
- Official resources: links to the LGU site, the Citizen's Charter, the SB
  site, BPLS (once confirmed), PSA, and COMPASS.
- Site basics: search (Pagefind), About, Accessibility, Contribute, Sitemap, an
  "unofficial" banner, and a "report a wrong detail" link.
- English and Filipino. Anything untranslated is marked `translation-pending`.
- Printable one-page service sheets (PDF or print CSS).

## Not in v1

Legislation, budget, COA and procurement views, project tracking, maps, citizen
reports, user accounts, Waray, a CMS, and barangay official contacts unless
officially published.

## Contact

Email <betterpalogov@gmail.com>. To report a wrong detail on the site, use the
data-correction issue form instead so the fix is tracked in public.

## Disclaimer

BetterPalo is community-run and unofficial. It is not affiliated with or endorsed by the Palo local government. Verify information with official sources. The project provides no warranty.

## Repository map

```text
src/         Astro site: content (service guide YAML), pages, layouts, schemas
public/      static files copied as is (robots.txt, _headers)
tests/       unit tests (Vitest) and end-to-end tests (Playwright)
docs/        charter, team, architecture, licensing, data sources, decisions
.github/     issue forms, pull request template, CI workflows, CODEOWNERS
LICENSES/    CC BY-SA 4.0 and CC0 1.0 legal texts
```

The stack is Astro, TypeScript, Tailwind CSS, and Cloudflare Workers; see
[`docs/architecture.md`](docs/architecture.md). Set-up steps are in
[`CONTRIBUTING.md`](CONTRIBUTING.md#set-up). The team and their roles are in
[`docs/team.md`](docs/team.md).

## Licenses

| Artifact | License |
| --- | --- |
| Code, scripts, configuration, workflows | MIT |
| Site prose, documentation, translations, original images | CC BY-SA 4.0 |
| Structured data | CC0 1.0 |
| Third-party material | Not covered; see the data register |

See [`docs/licensing.md`](docs/licensing.md) for the full map and the mixed-file rule.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Data corrections are welcome through the issue forms.

## Data sources

See [`docs/data-sources.md`](docs/data-sources.md) for provenance and privacy rules.

## Decisions

See [`docs/decisions/README.md`](docs/decisions/README.md) for accepted and pending decisions.
