---
title: "0016: One approval for every change"
---

- Status: Proposed
- Date: 2026-11-17
- Approval: only @Zyxavy and @STR4T-coder are actively working on the
  project, so both approve. @STR4T-coder approves on GitHub; @Zyxavy records
  their approval as the author in the PR thread, because GitHub does not let
  the author approve their own PR. This is a governance change, so it is
  ratified under the two-approval rule it removes, and it takes effect only
  after both approvals.
- Amends: the decision rules in the [charter](../charter.md), and the
  approval wording in [ADR 0005](0005-positioning-and-phased-roadmap.md),
  [CONTRIBUTING.md](https://github.com/betterpalo/betterpalo/blob/main/CONTRIBUTING.md), [team.md](../team.md), and
  [maintainers.md](../maintainers.md).

## Context

The charter requires two approvals for license, charter, governance, and
data-policy changes. With two active maintainers, and GitHub not letting the
author approve their own PR, every such change needs both people, and neither
can be away. The `protect-main` ruleset on GitHub already requires 1 approval
and does not require code owner review (checked 2026-11-17). The two-approval
rule is enforced by convention, not by GitHub.

## Decision

- Every pull request needs one maintainer approval, including license,
  charter, governance, and data-policy changes.
- A second approval is welcome on those four kinds of change, and the author
  should ask for one when a change is large or contested. It is not required.
- Data pull requests keep their first reviewer from `CODEOWNERS`, so nothing in
  `src/content/` merges without a review from someone other than the author.
- Disputes keep the written summary, seven-day comment period, and maintainer
  vote. Ties keep the status quo.

## Consequences

- Faster merges for governance and docs changes.
- A governance change can be approved by a single person. The author should
  still ask for a second approval when the change is contested.
- No GitHub setting changes, because the ruleset already asks for one approval.

## Alternatives

- Keep two approvals only for the license: rejected for now. It rarely changes
  and the author can still ask for a second look.
- Keep two approvals everywhere: rejected. With two active maintainers it
  blocks work whenever one of them is away.
