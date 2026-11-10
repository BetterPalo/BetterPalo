# Architecture decision records

An architecture decision record (ADR) is a short Markdown file that captures one
durable decision: the context, the choice, and what follows from it. The project
uses them so decisions about the stack, hosting, licensing, and data policy have
a stable link and a visible history instead of disappearing into chat or pull
request comments.

## Naming

Files are named `NNNN-short-title.md`, where `NNNN` is the next zero-padded
number. Numbers are never reused.

## Status values

- Proposed: under discussion; not binding.
- Accepted: the current decision.
- Superseded: replaced by a later ADR, which is linked.
- Rejected: considered and declined; keep the record so the reasoning is not
  lost.

## Template

Copy this block into a new file and fill it in.

```markdown
# NNNN: Short title

- Status: Proposed
- Date: YYYY-MM-DD

## Context

What problem or constraint forces a decision? Include links to issues, specs, or
prior ADRs.

## Decision

What is decided, in one or two sentences.

## Consequences

What becomes easier or harder? What must contributors do differently?

## Alternatives

What else was considered, and why was it rejected?
```

## Index

- [0001: Record architecture decisions](0001-record-architecture-decisions.md)
  — Accepted.
- [0002: License split for code, content, and data](0002-license-split.md) —
  Accepted.
- [0004: Trunk-based development and squash merge](0004-trunk-based-development-and-squash-merge.md) — Accepted; its squash-merge part is superseded by 0011.
- [0011: Rebase and merge keeps branch commits on main](0011-rebase-and-merge-keeps-branch-commits.md) — Proposed.
- [0005: Positioning and phased roadmap](0005-positioning-and-phased-roadmap.md) — Accepted.
- [0006: Content format for service guides](0006-content-format-for-service-guides.md) — Accepted.
- [0007: Service guide content model](0007-service-guide-content-model.md) —
  Proposed.
- [0008: Own stack and template, with BetterLGU as reference](0008-own-stack-with-betterlgu-as-reference.md)
  — Proposed.
- [0009: Additions from the November 2026 research review](0009-additions-from-november-2026-review.md)
  — Proposed.
- [0010: Technology stack and hosting](0010-technology-stack-and-hosting.md) —
  Accepted.
- [0012: Production deploys follow CI from GitHub Actions](0012-deploy-after-ci.md)
  — Proposed.

## Pending decisions

- Content format for data files (service guides proposed in ADR 0007).
- External link monitoring.

The tech stack is set in [ADR 0010](0010-technology-stack-and-hosting.md).
Named leads and `CODEOWNERS` are recorded in [team.md](../team.md).
