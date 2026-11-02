# Maintainers

How the repository is administered. These are GitHub settings, documented here
because they cannot be stored in the repo.

## Branch protection (`main`)

- Require a pull request before merging.
- Require at least one approval (two for license, charter, governance, or
  data-policy changes).
- Require status checks to pass (the Docs workflow).
- Block force pushes and deletions.
- Dismiss stale reviews when new commits are pushed.
- Do not allow bypassing the above rules.

## Merge rules

- Squash-merge only. Maintainers merge; contributors do not merge their own PRs
  when they touch data or licensing.
- Delete the branch after merge.

## Owner roles

- Maintainers: triage, review, merge, release.
- The founding team owns all areas collectively until named leads exist (see
  `docs/charter.md`). Named leads and `CODEOWNERS` are added when handles exist.
