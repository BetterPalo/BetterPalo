# 0015: Wider scope, one approval, and team verification

- Status: Proposed
- Date: 2026-11-17
- Approval: needs two approvals under the current rule. The author is
  @Zyxavy and cannot approve their own PR, so the approvals must come from
  @STR4T-coder and one of @Rurur8, @khalmahi, or @jaimedesu. This is the last
  change that needs two approvals, because it removes that rule.
- Amends: [ADR 0005](0005-positioning-and-phased-roadmap.md) (roadmap and the
  two-approval rule), the [charter](../charter.md) decision rules, and the
  verification rules in [data-sources.md](../data-sources.md).

## Context

A comparison with other BetterLGU portals (Solano, Los Baños, Marikina, Ormoc)
showed three things:

- BetterLGU sets no content standard. Its directory only asks that a portal is
  registered, built, and kept up to date.
- The established portals all carry hotlines, officials, statistics, and
  legislation. Most also link to budget and transparency data. Few have deep
  service pages, none print a one-page sheet, and none label what is verified.
  The service guide is our niche, but a resident also expects the rest.
- BetterPalo has one published guide, no hotlines page, and no statistics
  page. A guide site with one guide does not yet answer "why use this".

The team is also small. Two approvals for every charter, licence, governance,
or data-policy change, and a mandatory second checker for every guide, slow the
work more than they reduce errors. The team wants one accountable verifier per
item, a second check when someone is free, and a "reasonable and factual" bar
rather than a bar that blocks publishing.

## Decision

### 1. Scope: keep the guide as the core and add what residents expect

The service guide stays the main feature and the first priority. The roadmap in
ADR 0005 becomes:

| Release | Adds |
| --- | --- |
| v1 | Service guides (10 to 12); offices and officials; About Palo, barangay list, and a statistics page (PSA 2024, labeled by census year); **hotlines**; official resources; search; EN/FIL; print sheets; tourism |
| v1.1 | Remaining charter services; barangay profiles and contacts; a "what changed" log; an annual-update reminder issue |
| v2 | Waray; an ordinance and resolution index (title, number, date, link to the original); a "where to find the money and project data" page linking COMPASS, COA, DILG Full Disclosure Policy, and PhilGEPS |
| v3 | Hand-verified project records; a barangay map; a small API for the report form |
| Later | Citizen feedback or report intake (needs a backend, moderation, and Data Privacy Act handling) |

Budget stays a links page, not our own dashboards. A news section is not
planned.

### 2. One approval for every change

The charter's decision rules become:

- Every pull request needs one maintainer approval, including license, charter,
  governance, and data-policy changes.
- A second approval is welcome on those four kinds of change, and the author
  should ask for one when a change is large or contested. It is not required.
- Disputes keep the written summary, seven-day comment period, and maintainer
  vote. Ties keep the status quo.

### 3. Team verification, with a lenient bar

- A guide, hotline, contact, spot, or other fact may be set to `verified` by any
  team member listed in [team.md](../team.md), including
  (`@Zyxavy`), `@STR4T-coder`, and the other members. That person writes
  their handle in `verified_by`.
- A second checker is **encouraged, not required**. When a second person
  checks, they add themselves in `notes` or the pull request.
- The bar is "factual, with a reasonable claim": the verifier has seen a cited
  source (any level in the source hierarchy, not only levels 1 to 3) and
  believes it is accurate and current. A test call or LGU confirmation is a
  strong source but is no longer required.
- This covers phone numbers and hotlines. Each is published with its source and
  an "as of" date, so a reader can judge it.
- What does not change: every verified item still carries a source, a
  retrieval date, `verified_by`, and `last_verified`; anything not stated stays
  `null`; the "unofficial" banner and the "report a wrong detail" link stay on
  every page. The code gate in `src/lib/publishing.ts` is unchanged.

## Consequences

- Faster publishing and fewer blocked pull requests.
- More risk of a wrong detail reaching the site, especially a phone number,
  where a wrong value is worse than a missing one. The mitigations are the
  source and date shown with each item, the report link, and the quarterly
  review in `data-sources.md`. If a wrong emergency number is ever published,
  revisit the lenient bar for hotlines.
- The `protect-main` ruleset on GitHub requires 1 approval and does not
  require code owner review (checked 2026-11-17). The two-approval rule for
  charter, licence, governance, and data-policy changes is enforced by
  convention and review, not by GitHub, so no setting needs to change.
- The "second checker" wording in ADRs 0006 and 0007 and in
  `docs/research/` describes the earlier rule and is left as history.
- `docs/adapt-for-your-lgu.md` can keep the stricter rule as a recommendation
  for LGUs that want it.

## Alternatives

- Keep two approvals only for the licence: rejected. The licence rarely
  changes.
- Keep the second checker mandatory for hotlines only: rejected for now. It is
  the safest place for the lenient bar to fail, so it is the first thing to
  tighten if a wrong number ever gets published.
- Stay a pure guide portal (the ADR 0005 scope): rejected. Residents compare
  the site to other BetterLGU portals and expect hotlines, officials, and
  statistics.
