# Maintainers

How the repository is administered. These are GitHub and Cloudflare settings,
documented here because they cannot be stored in the repo. People and roles
are listed in [team.md](team.md).

## Who merges

- **Project lead** (`@Zyxavy`): reviews and merges into `main`.
- **Second reviewer** (`@STR4T-coder`): gives the second approval on charter,
  licence, governance, and data-policy changes, and checks the lead's data.
  Does not merge unless named as a backup maintainer below.
- **Backup maintainer:** not yet named. Until one is, `main` has no merge
  cover when the lead is away; the lead should plan around this. Add the name
  here and in `docs/team.md` when decided.

No one else merges into `main`.

## Branch protection (`main`)

- Require a pull request before merging.
- Require at least one approval (two for license, charter, governance, or
  data-policy changes).
- Require review from code owners (see `.github/CODEOWNERS`).
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution before merging.
- Require status checks to pass and the branch to be up to date: `quality`,
  `build`, `e2e`, and `lighthouse` (CI workflow), `docs` (Docs workflow), and
  `conventional-commits` (Commit messages workflow).
- Restrict who can update `main` to the project lead and the backup
  maintainer once one is named.
- Block force pushes and deletions.
- Do not allow bypassing the above rules, including for administrators.

The ruleset that enforces this is called `protect-main`. Required status checks
are set on the ruleset, not in the repository's legacy branch protection, and
a new check can only be added once its workflow has run at least once:

```sh
# Project lead (organisation owner) only.
gh api repos/BetterPalo/BetterPalo/rulesets \
  --jq '.[] | select(.name == "protect-main") | .id'
```

## Continuous integration

`.github/workflows/ci.yml` runs four jobs on every pull request and on `main`.
All share Node.js and pnpm with `.github/actions/setup`, which reads `.nvmrc`
and the `packageManager` field.

| Job | What it does | Fails the pull request |
| --- | --- | --- |
| `quality` | `format:check`, `lint`, `check`, `test` | yes |
| `build` | `build`, then uploads `dist/` for the next two jobs | yes |
| `e2e` | Playwright against the uploaded `dist/`, Chromium only | yes |
| `lighthouse` | Lighthouse CI against ADR 0010's performance budget | yes |

- A pull request push cancels the run already in progress for that branch.
  Runs on `main` are never cancelled.
- `e2e` uploads `playwright-report/` and `test-results/` when a test fails;
  `lighthouse` uploads `.lighthouseci/` on every run. Both are kept for seven
  days under the run's **Artifacts**.
- Lighthouse serves the uploaded `dist/` with its own static server, so it makes
  no network calls to Cloudflare and needs no secrets. It checks `/` and
  `/fil/`, with three runs per page and the median asserted.
- The zero-JavaScript budget in `lighthouserc.json` covers `/` and `/fil/`
  only. A pull request that adds JavaScript to either page must raise
  `resource-summary:script:size` to ADR 0010's island budget in the same change.
- No job needs a repository secret. `permissions` is `contents: read`.
- Workflow changes need `@Rurur8` as first reviewer and `@STR4T-coder` as
  second reviewer; the project lead merges.

## Dependency updates

Renovate (`renovate.json` at the repository root) runs weekly, before 06:00 on
Monday, Asia/Manila time.

- Minor and patch updates arrive as one grouped pull request.
- Node.js, pnpm, Astro, React, and TypeScript majors wait on the Dependency
  Dashboard until someone approves them, then arrive as one grouped pull
  request. See ADR 0010's tooling table.
- Security advisories open their own pull request as soon as Renovate sees
  them, outside the weekly schedule.
- New versions must be at least three days old before Renovate proposes them.
- The labels `major` and `security` must exist in the repository; Renovate
  applies them and cannot create them. Create them once under **Issues** →
  **Labels**.
- Renovate needs the Renovate GitHub App installed on the repository, with
  access to this repository only. It needs no repository secret.

## Merge rules

- Squash merge only ([ADR 0004](decisions/0004-trunk-based-development-and-squash-merge.md)).
  The pull request title becomes the commit subject on `main`, so it must
  follow the conventional commit format in
  [labels.md](labels.md#conventional-commits). Fix a bad title before merging.
- Merge commits and rebase merges are turned off in the repository settings.
- Contributors do not merge their own pull requests. Maintainers do not merge
  their own pull requests that touch data or licensing without the required
  approvals.
- Delete the branch after merge (automatic).

## Repository access

- Core team members are in the `core` team with **Write** on the repository,
  so they can push branches without forking.
- The second reviewer has **Maintain** on the repository.
- The project lead is an organisation **Owner**.

## Deploying

Production is deployed by `.github/workflows/deploy.yml`, not by Cloudflare
Workers Builds ([ADR 0012](decisions/0012-deploy-after-ci.md)).

- A merge to `main` starts the `CI` workflow. When all four jobs pass, the
  `Deploy` workflow starts by itself, downloads the `site` artifact from that
  run, and runs `pnpm exec wrangler deploy` against the `production`
  environment. The bytes CI tested are the bytes that deploy.
- The job is skipped until someone sets the repository variable
  `DEPLOY_ENABLED` to `true`. Leave it unset while the Cloudflare setup below is
  incomplete.
- After the deploy, `pnpm smoke` checks `https://betterpalo.betterpalogov.workers.dev`:
  `/` and `/fil/`, the stylesheet and its immutable cache header, `robots.txt`,
  the sitemap, the favicon, the security headers from `public/_headers`, and the
  custom 404. It retries for about 30 seconds before failing.
- Two merges in a row queue instead of overlapping; a deploy in progress is not
  cancelled.
- A deploy that fails is not rolled back automatically. Roll back from the
  `Deploy` run's summary, or by hand:

  ```sh
  pnpm exec wrangler deployments list
  pnpm exec wrangler rollback <version-id>
  ```

- Pull request previews still come from Cloudflare Workers Builds. They are not
  production deploys.

### Cloudflare setup for deploys

Only a repository administrator can do this, once:

1. Create the `production` environment under **Settings** → **Environments**.
   Under **Deployment branches and tags**, allow `main` only. Add required
   reviewers if the project wants a human gate.
2. Create a Cloudflare API token scoped to **Workers Scripts: Edit** on the
   `betterpalo` Worker, and copy the account ID from the Cloudflare dashboard.
3. Add them as **environment secrets** of `production`: `CLOUDFLARE_API_TOKEN`
   and `CLOUDFLARE_ACCOUNT_ID`. Do not add them as repository secrets;
   environment secrets reach only the deploy job.
4. In Cloudflare, open the `betterpalo` Worker's **Builds** settings and stop it
   from deploying the production branch. Keep builds for pull request branches.
   Workers Builds cannot wait for GitHub checks, which is why production moved.
5. Set the repository variable `DEPLOY_ENABLED` to `true` and merge a trivial
   change to confirm the first deploy.

When the domain is registered, set the repository variable `PRODUCTION_URL` to
the new address. The deploy workflow, the environment link, and the smoke test
all follow it.

Rotate `CLOUDFLARE_API_TOKEN` the same day a member with access to it leaves the
team.

## Monitoring

`.github/workflows/monitor.yml` is the "monitor" stage of the pipeline
([ADR 0010](decisions/0010-technology-stack-and-hosting.md)). It runs the same
smoke test as the deploy workflow every hour against
`https://betterpalo.betterpalogov.workers.dev` (or `PRODUCTION_URL`).

- A failure opens a GitHub issue titled "Production smoke test failed", or adds
  a comment to the one already open. The issue carries the run link and the
  rollback commands.
- The check covers both languages, the stylesheet and its cache header,
  `robots.txt`, the sitemap, the favicon, the security headers, and the custom
  404.
- It can be run by hand from the **Actions** tab (`workflow_dispatch`).
- Cloudflare Web Analytics stays the traffic analytics; this is an uptime and
  correctness check, not traffic analytics.

## Cloudflare

- The account belongs to the project address `betterpalogov@gmail.com`, with
  the project lead as Super Administrator and two-factor authentication on.
- The infrastructure members (`@Rurur8` and `@STR4T-coder`) are invited as
  **Administrators**, each with their own login and two-factor authentication. The project Gmail password is not shared.
- Cloudflare Workers hosts the site and Workers Builds builds the pull request
  previews. Production deploys run from GitHub Actions after CI
  (see [Deploying](#deploying)). Nobody deploys from a laptop.
- The Cloudflare GitHub app is installed on the organisation for this
  repository only.
- Domain and DNS changes are made only by the project lead or the
  infrastructure members.
- Remove a member's access the same day they leave the team.

## Owner roles

- Maintainers: triage, review, merge, release.
- Area leads (see [team.md](team.md)): first review in their area through
  `CODEOWNERS`.

## Project board

The Kanban is the org project at <https://github.com/orgs/BetterPalo/projects/3>.
Move cards by hand as work progresses:

| Event | Status |
| --- | --- |
| New idea or unscheduled issue | Backlog |
| Issue is clear and someone can start | Ready |
| Work has started, or a pull request is a draft | In progress |
| Pull request is open and ready for review | In review |
| Pull request merged, or issue closed | Done |

You can also turn on the project's built-in workflows (project menu, then
Workflows) to add new issues and pull requests automatically and to set Done
when they close. They need no token or repository secret.

The `Commit messages` workflow (`.github/workflows/commit-messages.yml`) fails
a pull request whose title or commit subjects are not conventional commits, and
warns when a subject is over 72 characters. It is a required check.
