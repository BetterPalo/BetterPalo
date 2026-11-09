# Maintainers

How the repository is administered. These are GitHub and Cloudflare settings,
documented here because they cannot be stored in the repo. People and roles
are listed in [team.md](team.md).

## Who merges

- **Project lead** (`@Zyxary`): reviews and merges into `main`.
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
- Require status checks to pass and the branch to be up to date: `docs` (Docs
  workflow), and `build` and `e2e` (CI workflow).
- Restrict who can update `main` to the project lead and the backup
  maintainer once one is named.
- Block force pushes and deletions.
- Do not allow bypassing the above rules, including for administrators.

## Merge rules

- Rebase and merge only ([ADR 0011](decisions/0011-rebase-and-merge-keeps-branch-commits.md)).
  Every commit in the pull request lands on `main`, so each one must follow the
  conventional commit format in [labels.md](labels.md#conventional-commits).
- Merge commits and squash merges are turned off in the repository settings.
- Contributors do not merge their own pull requests. Maintainers do not merge
  their own pull requests that touch data or licensing without the required
  approvals.
- Delete the branch after merge (automatic).

## Repository access

- Core team members are in the `core` team with **Write** on the repository,
  so they can push branches without forking.
- The second reviewer has **Maintain** on the repository.
- The project lead is an organisation **Owner**.

## Cloudflare

- The account belongs to the project address `betterpalogov@gmail.com`, with
  the project lead as Super Administrator and two-factor authentication on.
- The infrastructure members (`@Rurur8` and `@STR4T-coder`) are invited as
  **Administrators**, each with their own login and two-factor authentication. The project Gmail password is not shared.
- Deploys run through Cloudflare Workers Builds from the GitHub repository.
  `main` deploys to production; other branches get preview versions linked on
  the pull request. Nobody deploys from a laptop.
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

The `PR title` workflow (`.github/workflows/pr-title.yml`) fails a pull request
whose title is not a conventional commit. It warns when the title is over 72
characters. Add it to the required checks once it has run once.
