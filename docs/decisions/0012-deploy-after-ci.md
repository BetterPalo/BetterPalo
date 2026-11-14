# 0012: Production deploys follow CI from GitHub Actions

- Status: Accepted (2026-11-12)
- Date: 2026-11-10
- Revised: 2026-11-11. CI and deploy moved into one workflow,
  `.github/workflows/ci-cd.yml`. The deploy is now the `deploy` job, which
  needs `quality`, `build`, `e2e`, and `lighthouse`, instead of a separate
  workflow triggered by `workflow_run`. The heavy jobs are skipped when a
  change touches only documentation; the always-running `ci` job reports the
  combined result, so it is the required check and never hangs.
- Revised: 2026-11-14. The deploy job now rolls back by itself. It records the
  live version before deploying. If the smoke test fails, it checks again after
  30 seconds and, on a second failure, runs `wrangler rollback` to the recorded
  version, then fails the run. A single failed check never triggers a rollback.
  If the live version cannot be read, the deploy goes ahead without a rollback
  and says so in a warning. The consequence below, "a failed smoke test leaves
  the bad version live", now applies only when the live version could not be
  read.
- Supersedes: the production-deploy part of ADR 0010. Pull request previews stay
  on Cloudflare Workers Builds.

## Context

[ADR 0010](0010-technology-stack-and-hosting.md) put both previews and
production on Cloudflare Workers Builds. Workers Builds starts the moment a
branch moves. It has no way to wait for GitHub checks, so on `main` the deploy
and the CI workflow run side by side: a commit can be live before
`format:check`, `lint`, `check`, `test`, the build, Playwright, or Lighthouse
have said anything.

Required status checks fix this for pull requests, but they gate the merge, not
the push. A direct push by a maintainer, a revert, or a CI-only failure still
reaches production first. The project also had no post-deploy check, no
deployment history in GitHub, and no written rollback step.

Cloudflare Workers Builds is still the right tool for pull request previews: it
builds every branch, uploads a version, and comments the link, with no secrets
in the repository.

## Decision

- Production deploys run from the `deploy` job in `.github/workflows/ci-cd.yml`,
  which needs `quality`, `build`, `e2e`, and `lighthouse`. There is no separate
  workflow and no `workflow_run` trigger: the deploy starts only after every
  test in the same run has passed.
- The deploy downloads the `site` artifact from that exact CI run. The bytes
  that passed `quality`, `build`, `e2e`, and `lighthouse` are the bytes that
  deploy; nothing is rebuilt at deploy time.
- Workers Builds stops deploying the production branch and keeps building pull
  request previews only.
- The job runs in the `production` GitHub environment, so the lead can require a
  reviewer before a deploy and gets a deployment history per commit.
- Deploys are serialized with a `deploy-production` concurrency group. A new
  merge waits for the deploy in progress instead of cancelling it.
- After `wrangler deploy`, `pnpm smoke` checks the live site: both languages, the
  stylesheet and its cache header, `robots.txt`, the sitemap, the favicon, the
  security headers, and the custom 404. The workflow fails if the site does not
  answer, and the run summary carries the rollback commands.
- The Cloudflare credentials live in the secrets of the `production`
  environment: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. A repository variable,
  `DEPLOY_ENABLED`, keeps the job skipped until the lead has set them and created
  the environment.
- Nobody deploys from a laptop.

## Consequences

- A red `main` cannot reach production. The cost is one more wait: the deploy
  starts only after CI, about three to four minutes after a merge.
- The deploy needs two environment secrets, a repository variable, and a
  Cloudflare setting change that only an administrator can make. Until then the
  job is skipped and the notice in `docs/maintainers.md` applies.
- The deploy can be approved by hand, which is the only manual step; it is
  optional and off by default.
- A failed smoke test leaves the bad version live until someone rolls back. The
  workflow prints the command instead of rolling back automatically, so a
  transient network problem cannot silently undo a good deploy.
- Preview versions still come from Workers Builds, so a preview build does not
  prove the deploy path until the first merge after the switch.
- `wrangler` stays pinned in `devDependencies`, so the CI and deploy versions
  match.

## Alternatives

- **Keep Workers Builds for production and rely on required checks.** Rejected:
  checks gate the merge, not the push, and Workers Builds cannot read them.
- **Make the Workers Builds deploy command query the GitHub checks API.**
  Rejected: it needs a personal access token inside Cloudflare, and it makes the
  deploy depend on a race between two systems instead of one ordered pipeline.
- **Cloudflare Pages.** Rejected in ADR 0010, and it does not solve the gate.
- **Deploy by hand with `wrangler deploy`.** Rejected: the project has several
  maintainers, and a manual step is forgotten under pressure.
- **Roll back automatically when the smoke test fails.** Rejected on
  2026-11-10: a false alarm from a network blip would undo a good deploy.
  Accepted on 2026-11-14 because the team judged the smoke test reliable,
  with a guard against that failure (see the 2026-11-14 revision above).
