# 0011: Rebase and merge keeps branch commits on main

- Status: Rejected (2026-11-10); squash merge stays, as in
  [ADR 0004](0004-trunk-based-development-and-squash-merge.md)
- Date: 2026-11-07

## Why it was rejected

Trying rebase and merge on the CI and deploy pull requests (#15 to #17) showed
costs that outweigh seeing every branch commit on `main`:

- A branch that merged `main` in, as this ADR told shared branches to do, could
  no longer be rebased onto `main` without conflicts.
- Stacked pull requests had to be rebased and force-pushed after each merge,
  and every force push dismissed the approvals already given.
- Every commit subject had to be tidy before review, which is a lot to ask of
  a volunteer team with mixed experience.

Squash merge needs only a clear pull request title, gives one commit per pull
request to revert if a deploy breaks, and does not care how a branch was kept
current. The work inside a branch stays visible on the closed pull request.

## Context

[ADR 0004](0004-trunk-based-development-and-squash-merge.md) chose squash merge
so that each pull request became one commit on `main`. The project lead wants
to see the real number of commits on `main` and the work inside each branch,
not one commit per pull request. Merge commits were rejected in ADR 0004
because they clutter history; the lead has accepted a linear history instead.

## Decision

- Pull requests are merged with **rebase and merge**. Each commit from the
  branch lands on `main` unchanged and in order. No merge commits are created.
- Branch commits may be as many as needed. They are part of the history on
  `main`, so each commit subject must be a conventional commit (see
  [labels.md](../labels.md#conventional-commits)).
- The pull request title no longer becomes a commit by itself. It still names
  the pull request and must be clear, but the commit check applies to every
  commit in the pull request.
- Squash merge is no longer used. This ADR supersedes the squash-merge part of
  ADR 0004. Trunk-based development, short-lived branch names, and "no direct
  pushes to `main`" still apply.

## Consequences

- `git log --oneline | wc -l` counts every commit the team has made.
- Commit messages on `main` are the project's history, so a messy branch
  commit lands as-is. Contributors should tidy commits before the review
  (interactive rebase is fine on a branch only they use).
- Rebasing a shared branch rewrites its commits. Teams sharing a branch
  update it by merging `main` in, not by rebasing, to avoid force pushes.
- A workflow checks every commit subject in a pull request, not only the title.

## Alternatives

- **Squash and merge (ADR 0004):** keeps one commit per pull request. Rejected
  for this decision.
- **Create a merge commit:** keeps the branch structure. Rejected for now
  because it adds one commit per pull request and makes `main` harder to read
  as a line of history.
