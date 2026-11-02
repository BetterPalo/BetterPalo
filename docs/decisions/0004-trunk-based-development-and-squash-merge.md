# 0004: Trunk-based development and squash merge

- Status: Accepted
- Date: 2026-11-03

## Context

BetterPalo is a small community project with contributors of mixed experience
levels. History must stay readable and easy to bisect, and the merge process
must not depend on a complex branching model or release branches.

## Decision

Use trunk-based development on a single `main` branch:

- Contributors branch from `main` using short-lived branches named
  `type/short-description`.
- One topic per pull request, kept small; drafts are encouraged for early
  feedback.
- Maintainers squash-merge pull requests into `main`.
- No direct pushes to `main`; branch protection enforces review and CI.
- Branches are deleted after merge.

## Consequences

- Linear history that is easy to read and bisect.
- Small, reviewable pull requests.
- No release branches or version tags until a release process is needed.
- Contributors must keep branches short-lived to avoid drift from `main`.

## Alternatives

- Git Flow: rejected. Release and develop branches add overhead this project
  does not need yet.
- Merge commits: rejected. They clutter history and make bisect harder.
- Direct pushes to `main`: rejected. They bypass review and CI.
