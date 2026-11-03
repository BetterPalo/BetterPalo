# 0005: Positioning and phased roadmap

- Status: Accepted
- Date: 2026-11-03

## Context

BetterPalo started as a general "government information portal." Research and
the charter review show that the highest-value, lowest-risk v1 is a
service-guide portal: "Where do I go, what do I bring, how much, how long."
Legislation, budget, COA, procurement, project tracking, maps, citizen reports,
accounts, Waray, and a CMS add cost and risk without helping a resident finish
a transaction. A Facebook post cannot be a verified, dated, searchable service
page, which is the answer to "why not just Facebook?"

This ADR changes the charter's v1 scope, so under the charter's decision rules
it requires two approvals.

## Decision

- v1 is a service-guide portal. Everything else is a later phase.
- v1 complements COMPASS and the LGU website; it does not replace them and
  publishes no financial dashboards.
- Roadmap:
  - v1 (MVP): service guides (10 to 12), offices and officials, About Palo,
    barangay list and census data, official resources, search, EN/FIL, print
    sheets.
  - v1.1: remaining charter services, barangay profiles and verified contacts,
    a "what changed" log, an annual-update reminder issue.
  - v2: Waray, an ordinance and resolution index (title, number, date, link to
    the original), and a "where to find the money and project data" page linking
    COMPASS, COA, DILG Full Disclosure Policy, and PhilGEPS.
  - v3: hand-verified project records, a barangay map, a small API for the
    report form.
  - Later: citizen feedback or report intake (needs a backend, moderation, Data
    Privacy Act handling, and clear "unverified" labeling).

## Consequences

- The charter's v1 scope and "What v1 will include" list are rewritten.
- Legislation and transparency move to v2 and later.
- The MVP is small enough for a small core team; the M1 pilot (three services
  end to end) proves the pipeline before committing to twelve.
- The project stays independent of the LGU: friendly contacts help, but no
  approval is needed to publish public records.

## Alternatives

- Keep the broader v1 (legislation, transparency, reports): rejected. Too much
  scope for a small team and higher risk of unverified content.
- Build everything at once: rejected. The M1 pilot exists to learn why three
  services are painful before committing to twelve.
