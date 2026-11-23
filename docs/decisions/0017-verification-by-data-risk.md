---
title: "0017: Verification by data risk"
---

- Status: Accepted (2026-11-18)
- Date: 2026-11-17
- Approval: only @Zyxavy and @STR4T-coder are actively working on the
  project, so both approve. @STR4T-coder approves on GitHub; @Zyxavy records
  their approval as the author in the PR thread, because GitHub does not let
  the author approve their own PR.
- Depends on: issue #26 closing first (the cedula guide's second check).
- Amends: the verification rules in [data-sources.md](../data-sources.md),
  [team.md](../team.md), and [CONTRIBUTING.md](https://github.com/betterpalo/betterpalo/blob/main/CONTRIBUTING.md).

## Supersedes

The standing rule that every data change gets a second check by
`@STR4T-coder` before the lead merges (`team.md`, review routing and second
checker rule). It now applies only to service guides. Other data needs one
verifier. The rule is replaced in those files in this PR, so only one version
remains.

## Context

The team is small, and every extra approval slows the work. But the cedula
guide (PRs #65 and #66) reached the site with a single review, and it needed
three follow-up PRs to fix an unreadable print sheet, a missing citation page,
and a layout shift. A wrong detail in a service guide, or a wrong emergency
number, costs a resident more than a missing one. Not every kind of data
carries that risk, so one rule for everything is either too slow or too loose.

## Decision

Match the checking to the risk.

- **Service guides** keep the second-checker rule. A person who did not
  transcribe the guide checks it page by page before `status` becomes
  `verified`. The default second checker is `@STR4T-coder`, then
  `@jaimedesu`.
- **Other data** (tourism spots, statistics, officials, hotlines) can be
  verified by any one team member listed in [team.md](../team.md), who records
  their handle in `verified_by`. A second check is encouraged, not required.
- **Phone numbers and hotlines** follow the source level in
  [data-sources.md](../data-sources.md):
  - From a level 1 to 3 source (the Charter, an official LGU or national agency
    page, an official directory), a team member may publish the number without
    a test call, with its source and an "as of" date.
  - From level 4 or lower (a Facebook post, a mirror, a third-party site, word
    of mouth), the number stays unpublished until a test call or the LGU
    confirms it.
- **Unchanged:** every verified item carries a source, a retrieval date,
  `verified_by`, and `last_verified`; anything not stated stays `null`; the
  "unofficial" banner and the "report a wrong detail" link stay on every page;
  BPLS online claims still need the permits office or an end-to-end test. The
  code gate in `src/lib/publishing.ts` does not change.

## Consequences

- Guides stay as safe as today. Lower-risk data moves faster.
- Hotlines from official sources can be published right away; the risky ones
  (unofficial sources) still wait for a call.
- This ADR should merge after #26 closes, so the rule is not used to skip the
  open second check on the cedula guide.
- The general second-checker rule lives in `team.md` and `data-sources.md`,
  the files this ADR amends. ADR 0006 does not mention a second checker, and
  ADR 0007 mentions one only for the `source_pages` check, so neither needs to
  change.

## Alternatives

- One bar for everything ("factual, with a reasonable claim"): rejected. It
  was the part of the first proposal the second reviewer objected to most, and
  the cedula defects show where a single check falls short.
- A second check for everything: rejected. Tourism and statistics errors are
  cheap to correct, and the team has two active people.
