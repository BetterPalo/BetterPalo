# Adapt BetterPalo for your LGU

How to turn a copy of this repository into the portal for another municipality
or city. Work through the steps in order. This is a checklist for the template
as it is today; [Known gaps](#known-gaps) lists what a later version should make
easier.

The template assumes the same approach as Palo: guides are transcribed from the
LGU's own Citizen's Charter, checked by a second person, and published only when
they carry a source and a verification date. If you want a different approach,
read [ADR 0006](decisions/0006-content-format-for-service-guides.md) and
[ADR 0007](decisions/0007-service-guide-content-model.md) first.

## Before you start

- Get your LGU's current Citizen's Charter and note its edition and where you
  found it. Without a source you cannot publish a guide.
- Decide who transcribes and who checks. A guide's checker must be a different
  person from its transcriber ([`team.md`](team.md#second-checker-rule)).
- Click **Use this template** on GitHub to create your own repository. A copy
  does not carry over the Palo repository's history, secrets, variables,
  branch rules, or labels.

Find every place Palo is named with:

```sh
grep -rIn -i "palo" --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude-dir=.astro .
```

## Step 1: Identity and configuration

| File | What to change |
| --- | --- |
| `package.json` | `name` |
| `wrangler.jsonc` | `name`: your Worker name |
| `astro.config.mjs` | `site`: your public URL, and remove the Palo `TODO` comment |
| `public/robots.txt` | the `Sitemap:` URL |
| `src/lib/site.ts` | `REPO_URL`, the official links (Charter PDF and LGU site), and the navigation if your pages differ |
| `scripts/smoke-test.mjs` | the default URL and the user agent |
| `.github/workflows/ci-cd.yml` and `monitor.yml` | the fallback URL after `vars.PRODUCTION_URL` (five places). See [Automatic deploys](#automatic-deploys-from-github) |
| `.github/ISSUE_TEMPLATE/config.yml`, `data-correction.yml`, `feature-request.yml` | links that point at the Palo repository |
| `LICENSE` | keep the existing MIT text and copyright line, and add your own line below it |

## Step 2: Facts and text

| File | What to change |
| --- | --- |
| `src/lib/site-facts.ts` | the Charter title, edition, service and office counts, the census figures, and the office list with its counts. Change a number only together with its source |
| `src/i18n/ui.ts` | every string that names Palo (about 76 lines), in English and Filipino. Official office names and legal terms stay verbatim |
| `src/components/home/Glance.astro`, `Volunteer.astro` | the section id and the place name |
| `tests/e2e/home.spec.ts` | the headings and figures the test expects |

After this step, `pnpm check`, `pnpm test`, `pnpm build`, and `pnpm test:e2e`
must pass again. A missing string is a type error, so the check names it.

## Step 3: Project documents

These describe Palo's project, not yours. Replace or remove them before you
publish, so that your repository does not claim Palo's decisions, people, or
sources.

| Document | What to do |
| --- | --- |
| `docs/charter.md` | Rewrite for your project: purpose, v1 scope, principles, roles |
| `docs/team.md`, `.github/CODEOWNERS` | Replace the people, handles, and routing with yours |
| `docs/maintainers.md` | Keep the structure; replace the handles, URLs, and ruleset commands |
| `docs/data-sources.md` | Keep the source hierarchy and rules; empty the register and source leads and add your own |
| `docs/research/` | Palo's Charter inventory. Delete it and write your own inventory |
| `docs/decisions/` | The decision history of this project. ADRs 0006, 0007, 0010, 0012, and 0013 describe design you inherit and can stay as reference. Palo-specific ADRs (0005, 0009) should be rewritten or removed. Number your own decisions from where you start |
| `PRODUCT.md`, `DESIGN.md` | Rewrite `PRODUCT.md`. `DESIGN.md` is the visual system; keep it, or restyle it in `src/styles/global.css` and update the document to match |
| `README.md`, `CONTRIBUTING.md` | Describe your project. Keep the set-up steps |

## Step 4: GitHub settings

A new repository starts without these. The commands and the reasoning are in
[`maintainers.md`](maintainers.md).

- Branch protection on `main`: pull request required, squash merge only, and the
  checks `ci` and `docs` required. A check can only be required after its
  workflow has run once.
- Create the labels in [`labels.md`](labels.md) and the milestones you need.
  Renovate also needs the labels `major` and `security`.
- Install the Renovate GitHub App on the repository if you want
  [`renovate.json`](../renovate.json) to open dependency pull requests.

## Automatic deploys from GitHub

The `deploy` job in `ci-cd.yml` publishes `main` to Cloudflare Workers after every
check passes ([ADR 0012](decisions/0012-deploy-after-ci.md)). It does nothing
until you turn it on. Do these in order:

1. Deploy once by hand, as in the README, so that the Worker exists.
2. Set the repository variable **`PRODUCTION_URL`** to your site address.
   **Do this first.** If it is unset, the deploy check and the hourly monitor
   test Palo's site instead of yours and report on it.
3. Create an environment named `production` under **Settings** then
   **Environments**, and allow only the `main` branch to use it.
4. Create a Cloudflare API token that can edit your Worker (the **Workers
   Scripts: Edit** permission), and add it with your account ID as the
   environment secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
5. Set the repository variable `DEPLOY_ENABLED` to `true`.

After that, a merge to `main` that passes every check deploys, runs the smoke
test, and rolls back to the previous version if the site is broken. Production
deploys are never started from a pull request. To get a preview link on each
pull request, connect the repository to Cloudflare Workers Builds; this is
optional.

## Add your first guide

1. Copy `src/content/services/_template.yaml` to `src/content/services/<id>.yaml`.
   The file name must equal the `id`.
2. Fill it in from the Charter page. Use `null` for anything the source does not
   state. Never guess.
3. Keep `status: needs_confirmation` until a second person has checked it page by
   page. Then set `status: verified` and fill `verified_by` and `last_verified`.
4. Run `pnpm build`. The build fails if a verified guide is missing a source, an
   edition, a retrieval date, a verifier, a verification date, or an office.

Only guides with `status: verified` get a page. The rules for each field are in
[ADR 0007](decisions/0007-service-guide-content-model.md).

## Licenses

Code, scripts, and workflows are MIT, and the license requires you to keep the
copyright notice. The site prose, documentation, and translations in this
repository are CC BY-SA 4.0 (attribution, and share adaptations alike), and
structured data is CC0. Your own guides, which describe your LGU's services, are
yours to license; record the choice in your own `docs/licensing.md`. Government
documents are not covered by any of these licenses
([`licensing.md`](licensing.md#government-works)). This is a project guide, not
legal advice.

## Known gaps

The template does not yet do these. Each is a reason this guide has so many manual
steps:

- There is **no single configuration file**. The LGU's name, URL, and figures are
  spread over the files in steps 1 and 2.
- There is **no sample guide**. A new copy builds and shows empty states until you
  add a guide, and the build warns that the `services` collection is empty.
- The Palo name is in the **interface strings and tests**, so the e2e tests fail
  until you update them.
- The **workflows fall back to Palo's URL** when `PRODUCTION_URL` is not set.
- The service guide page, the printable sheet, and the search page are still being
  built for Palo (issues #33 and #34).
