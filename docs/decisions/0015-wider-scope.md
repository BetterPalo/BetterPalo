---
title: "0015: Wider scope for v1"
---

- Status: Accepted (2026-11-21)
- Date: 2026-11-17
- Approval: only @Zyxavy and @STR4T-coder are actively working on the
  project, so both approve. @STR4T-coder approves on GitHub; @Zyxavy records
  their approval as the author in the PR thread, because GitHub does not let
  the author approve their own PR. This is a scope change, so it needs two
  approvals under the charter's current rule.
- Amends: the roadmap in [ADR 0005](0005-positioning-and-phased-roadmap.md) and
  the v1 scope in the [charter](../charter.md).

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

## Decision

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
planned. This ADR does not change how hotlines are verified. Today
`data-sources.md` requires a test call for local and emergency hotlines, with
one exception: national-agency contacts that the Charter itself prints. ADR
0017 (#75) proposes to relax that for official sources.

## Consequences

- Residents get the hotlines, officials, and statistics they find on other
  BetterLGU portals, next to the guides.
- More pages to keep accurate. Each new page follows the same verified-only
  gate.
- The hotlines page cannot ship until at least one hotline passes the
  verification rules in force when it is published: today a test call (or a
  Charter-printed national-agency contact), and after ADR 0017 a level 1 to 3
  source.

## Alternatives

- Stay a pure guide portal (the ADR 0005 scope): rejected. Residents compare
  the site to other BetterLGU portals and expect hotlines, officials, and
  statistics.
- Build our own budget and legislation views now: rejected. They need data we
  cannot verify yet.
