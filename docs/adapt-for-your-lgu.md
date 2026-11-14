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

## Step 1: Run `pnpm init:lgu`

Run the script once, in your copy, before you change anything else:

```sh
pnpm install
pnpm init:lgu
```

The script asks for each value in turn, and each prompt says what the value
means. It asks for the LGU's name; whether it is a municipality or a city; the
province; the brand, and the Worker and package name (both suggested, and you
can change them); the site address, the repository address, and the official
site address; the Charter's title, edition, year, address, service count, and
office count; the census population, source, year, reference dates in English
and Filipino, and barangay count; and then each office, with its name, short
key, and service count, until you enter a blank name.

Have your Citizen's Charter and your census source open. The script never
guesses a number. No fact has a default. A blank answer asks again, except where
a suggestion is shown (brand and tool name) or when you finish the list of
offices with a blank name.

It writes three files and no others:

- `src/config/lgu.ts`: your LGU's identity, facts, and URLs. This is the only
  file that holds your values; [how the seam works](architecture.md#lgu-configuration)
  is described in the architecture page.
- `wrangler.jsonc`: the Worker `name`. The comments in the file are kept.
- `package.json`: the package `name`.

It does no find-and-replace. Palo's documents, the issue template links, and the
licence line stay as they are until you handle them in Steps 2 and 3.

To answer from a file instead of the questions, pass `--answers <file.json>`.
The file has the same values as the config, plus `toolName`.
[`tests/fixtures/init-answers-city.json`](../tests/fixtures/init-answers-city.json)
is an example.

The script refuses to run with `--answers` alone. Without a target, a run would
overwrite this repository's own config by accident. Choose one:

- In your own copy of the template, to write into this repository:
  `pnpm init:lgu --answers my-answers.json --yes`
- To write into another folder instead, such as a separate copy of the template:
  `pnpm init:lgu --answers my-answers.json --root <dir>`. The folder must contain
  the template's `wrangler.jsonc` and `package.json`.

Then run the checks:

```sh
pnpm check && pnpm test && pnpm build
```

The built site should now show your LGU's name.

## Step 2: What is still manual

The script does not change these:

- **Issue template links.** `.github/ISSUE_TEMPLATE/config.yml` and
  `feature-request.yml` link to the Palo repository. Point them at your
  repository.
- **The licence line.** Keep the existing MIT text and copyright line in
  `LICENSE`, and add your own line below it.
- **Office short keys.** Each office's `short` key places it in the home page's
  service tiles. The tiles count only offices whose key is one of these:
  `civil-registry`, `business-permits`, `assessor`, `treasurer`,
  `social-welfare`, `senior-citizens`, `health`, and `health-shop`. Use them for
  the offices that should count. Each key must be unique; `pnpm init:lgu` checks
  this.

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
| `docs/decisions/` | The decision history of this project. ADRs 0006, 0007, 0010, 0012, 0013, and 0014 describe design you inherit and can stay as reference. Palo-specific ADRs (0005, 0009) should be rewritten or removed. Number your own decisions from where you start |
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
2. Set the repository variable **`PRODUCTION_URL`** to your site address. The
   workflows have no default address. Without it, the deploy job stops with an
   error at its first step, and the hourly monitor skips with a notice.
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

## Try the sample guide

The template includes one fictional guide, `examples/services/sample-business-permit.yaml`,
so you can see the guide page before you write your own. It describes Sample
City, which does not exist.

```sh
SAMPLE_CONTENT=true pnpm build
```

The sample appears only in a build made with that flag. Never deploy such a
build, and never copy the sample into `src/content/`. The deploy job runs
`scripts/check-no-sample.mjs` and fails if the sample reaches `dist/`, so the
sample cannot go live. Its fields are labelled fictional. It is marked
`verified` only so that it passes the same publishing gate as a real guide.
[ADR 0014](decisions/0014-lgu-configuration-seam.md) records this exception.

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

The template does not yet do these:

- The service guide page, the printable sheet, and the search page are still being
  built (#33, #34).
- The home page's drawn sample sheet uses Palo's cedula page numbers
  (`home.sheet.foot`).
- Issue template links are manual (see Step 2).
- Filipino placeholder phrasing awaits translator review (#13).
