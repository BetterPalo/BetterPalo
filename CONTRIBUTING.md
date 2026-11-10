# Contributing to BetterPalo

Thanks for helping. BetterPalo is built by residents, students, researchers, LGU
staff, designers, translators, and developers. You do not need to write code to
contribute.

## Read first

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Charter](docs/charter.md)
- [Licensing](docs/licensing.md)
- [Team and roles](docs/team.md)
- [Architecture](docs/architecture.md)

## Ways to contribute

- **Data correction.** Fix a wrong office, service, fee, official, or contact.
- **Translation.** Turn English content into Filipino, or the reverse.
- **Design and accessibility.** Improve layout, contrast, keyboard use, and
  screen-reader support.
- **Code.** Build pages, components, search, and tooling for the site.
- **Documentation.** Clarify a guide, fix a broken link, or record a decision.

## Data contributions

Every fact needs:

- an official source URL;
- a retrieval date;
- a verification date;
- who verified it.

Use the data-correction issue form if you are not editing files directly.
Publish only contact details the LGU has already published for public offices
and public officials. Do not add signatures, personal emails, home addresses, or
unpublished phone numbers. See [docs/data-sources.md](docs/data-sources.md).

## Translation

- v1 is English and Filipino.
- Do not translate official office names, personal names, or legal terms that
  must stay verbatim.
- Keep links, figures, and dates unchanged.
- If a page is not translated yet, mark it `translation-pending` rather than
  mixing languages silently.
- Translations are content contributions under CC BY-SA 4.0.

## Development

The stack is Astro 7, TypeScript, React islands, Tailwind CSS, and Cloudflare
Workers with static assets. See
[ADR 0010](docs/decisions/0010-technology-stack-and-hosting.md), including its
performance budget.

### Set up

On Windows, pick one environment and stay in it:

- **WSL:** clone the repository inside your Linux home folder (`~/BetterPalo`),
  not under `/mnt/c/`. Installs on `/mnt/c/` are very slow and can break
  symlinks.
- **Native Windows:** use PowerShell, install Node with nvm-windows or fnm, and
  keep the repository under `C:\Users\...`.

Do not run WSL and Windows Node against the same folder.

1. Install Node.js 26.13.0 (the version in `.nvmrc`). With nvm: `nvm install`
   then `nvm use`. On Windows, nvm-windows or fnm work too.
2. Install pnpm: `npm install -g pnpm@12.18.0`.
3. Clone the repository and run `pnpm install`.
4. Install the test browser once: `pnpm exec playwright install chromium`.
5. Start the dev server: `pnpm dev`, then open the address it prints.

Where things live, and the rules for data access and secrets, are in
[docs/architecture.md](docs/architecture.md). Local secrets go in `.dev.vars`
(copy `.dev.vars.example`); v1 has none.

### Before you open a pull request

Run these and fix anything they report:

```sh
pnpm format
pnpm lint
pnpm check
pnpm test
pnpm build
```

Run `pnpm test:e2e` too if you changed a page layout or a React component. Run
`pnpm test:lighthouse` if you changed a page's markup, styles, fonts, or
scripts: it audits the built `dist/` against [ADR 0010](docs/decisions/0010-technology-stack-and-hosting.md#performance-budget)'s
performance budget and needs Chrome installed.

CI runs `quality`, `build`, `e2e`, and `lighthouse` on every pull request, and
all four must pass before merge. When `e2e` fails, download the
`playwright-report` artifact from the run; when `lighthouse` fails, download
`lighthouse-report` for the HTML and JSON results. Cloudflare also posts a
preview link on the pull request so you can check it on a phone.

### Rules

- Pages are `.astro` by default; use React only for interactive parts, and keep
  within the performance budget in ADR 0010.
- Add dependencies with `pnpm add`, which pins exact versions. Explain any new
  dependency in the pull request.
- Do not edit `pnpm-lock.yaml` by hand.
- Use short-lived branches.
- Write imperative commit subjects, for example `docs: fix barangay contact`.
- Keep pull requests small enough for one review sitting.
- Pages and components get data only through `src/lib/data.ts`, never by
  calling `getCollection()` directly.
- Routine pull requests need one maintainer approval.

## Workflow

There is one long-lived branch, `main`. There is no `dev` or `develop` branch
([ADR 0004](docs/decisions/0004-trunk-based-development-and-squash-merge.md)). Pull requests are squash merged.
Cloudflare preview links on each pull request are where changes are tested
before merge.

Core team members branch in the main repository. Everyone else forks first.

```sh
git switch main
git pull
git switch -c feat/service-page
# ...work, commit...
git push -u origin feat/service-page
```

- Name branches `type/short-description`, for example `data/add-barangay-list`.
  Use the commit types below.
- One topic per PR, kept small. Open as a draft early if you want feedback.
- Keep your branch current with the "Update branch" button on the pull request,
  or `git fetch` then `git merge origin/main`. Either is fine, because the pull
  request is squash merged.
- Fill in the PR template, add labels from [docs/labels.md](docs/labels.md),
  set the milestone, and link the issue with `Closes #12`.
- **The PR title must be a conventional commit** (see below). Pull requests
  are squash merged, so the title becomes the one commit on `main`. Commit on
  your branch as often as you like; branch commits are not checked and do not
  reach `main`.
- CI must pass and one approval from a code owner is required. `CODEOWNERS`
  requests the right reviewer automatically.
- Only maintainers merge (see [docs/maintainers.md](docs/maintainers.md)). Do
  not merge your own PR.
- Do not push directly to `main`; branch protection blocks it.
- Data changes are checked by someone other than the person who transcribed
  them before `status` becomes `verified` (see [docs/team.md](docs/team.md)).

## Commit messages

Format: `type(scope): short summary` — imperative, lowercase, no period, under
72 characters.

| Type | Use for |
| --- | --- |
| `feat` | New page, feature, or component |
| `fix` | Bug fix or broken link/typo fix |
| `docs` | Documentation only |
| `data` | Adding or updating datasets or content records |
| `content` | Written page content |
| `i18n` | Translations (Filipino, Waray) |
| `style` | Formatting or CSS with no logic change |
| `refactor` | Restructuring with no behavior change |
| `test` | Adding or changing tests |
| `ci` | Workflows and automation |
| `chore` | Config, dependencies, housekeeping |

Optional scopes: `services`, `government`, `legislation`, `transparency`,
`search`, `a11y`, `deps`. Add `!` for breaking changes (`feat!:`), and use
`Closes #12` in the PR body. See `docs/labels.md` for the full tables.

## Review and decisions

Routine pull requests need one maintainer approval. License, charter,
governance, or data-policy changes need two approvals, or unanimous approval of
active maintainers if fewer than two are active. Disputes get a written summary
and a seven-day comment period, then a maintainer vote. Ties keep the status quo.
See [docs/charter.md](docs/charter.md).

## Labels and milestones

Labels are grouped by area, type, and status; milestones track M0–M3. See
[`docs/labels.md`](docs/labels.md) for the full tables, colors, and milestone
descriptions. Labels and milestones are created in GitHub; the definitions live
in `docs/labels.md` so they stay versioned.

## Licensing of contributions

Contributions are inbound = outbound:

- code is MIT;
- content and translations are CC BY-SA 4.0;
- data is CC0 1.0.

By submitting a contribution, you confirm you have the right to license it on
these terms and that you cited your sources. No contributor license agreement is
required. See [docs/licensing.md](docs/licensing.md).

## Using GitHub without a local setup

1. Open the file you want to change on GitHub.
2. Use the pencil icon to edit it.
3. Describe the change in the commit message.
4. Choose "Create a new branch for this commit and start a pull request".
5. Open the pull request and fill in the template.

## Getting help

Open an issue with your question. Do not send private personal information,
passwords, or unpublished documents. For conduct reports, see
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
