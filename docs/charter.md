# BetterPalo Charter

Adopted: 2026-11-03

## Purpose

Make Palo's government information and public services easier to find,
understand, and verify. BetterPalo complements official channels such as
COMPASS and the LGU website; it does not replace them and publishes no
financial dashboards.

## v1 scope

v1 is a service-guide portal: "Where do I go, what do I bring, how much, how
long."

- Service guides (about 10 to 12), each fully verified: where to go, what to
  bring, cost, and processing time.
- Offices and officials: elected officials, departments, what each does, where
  it is, and verified public contacts.
- About Palo and barangays: municipal profile, the 33-barangay list, and PSA
  2024 census figures labeled by census year.
- Official resources: links to the LGU site, the Citizen's Charter, the SB
  site, BPLS (once confirmed), PSA, and COMPASS.
- Site basics: search (Pagefind), About, Accessibility, Contribute, Sitemap, an
  "unofficial" banner, and a "report a wrong detail" link that opens the
  data-correction issue form.
- English and Filipino. Anything untranslated is marked `translation-pending`.
- Printable one-page service sheets (PDF or print CSS).

## Out of scope for v1

Legislation, budget, COA and procurement views, project tracking, maps, citizen
reports, user accounts, Waray, a CMS, and barangay official contacts unless
they are officially published.

## Who this is for

Residents, students, researchers, and LGU staff who need an answer on a phone.
They may be on a slow connection, using a mid-range phone, or reading in
Filipino. The site should answer their question without an account.

## Scope boundaries

v1 publishes information. It does not process payments, accept applications, or
act as an official channel for any office. Links to official services point to
the office's own page.

## Why not just Facebook?

A Facebook post cannot be a verified, dated, searchable service page. BetterPalo
keeps each service guide cited to an official source with a retrieval and
verification date, so a resident can check it and a maintainer can correct it.

## Principles

- Accuracy first. A missing page is better than a wrong one.
- Cite the source. Every fact links to the official document or page it came
  from, reachable in two clicks.
- Plain language. Write for a reader who is in a hurry and on a slow
  connection.
- Mobile first. Design and test on the smallest screen before the desktop.
- Accessibility by default. WCAG 2.1 AA is the floor, not an enhancement.
- Open by default. Public information stays public, and the work happens in the
  open.
- Community over hierarchy. Anyone can contribute; maintainers review.
- Nonpartisan. No office ratings, no credit-claiming, no photos in v1.

## Roles

The founding team owns all areas collectively until named leads and GitHub
handles exist:

- data and verification;
- design and accessibility;
- development;
- translation and QA;
- maintenance and releases.

Named leads and `CODEOWNERS` are added when handles exist.

## Decision rules

- Routine pull requests need one maintainer approval.
- License, charter, governance, or data-policy changes need two approvals, or
  unanimous approval of active maintainers if fewer than two are active.
- Disputes get a written summary and a seven-day comment period, then a
  maintainer vote. Ties keep the status quo.

## Definition of done

- Data is accurate and has a cited official source and a verification date.
- Every published service has a source, an edition or effective date, and a
  last-verified date. Unverified items are not published.
- Pages meet WCAG 2.1 AA.
- Pages work on a phone first.
- User-facing content is in English and Filipino, or explicitly marked
  translation-pending.
- No personal data is published beyond officially published public-official
  contacts.

## Disclaimer

BetterPalo is community-run and unofficial. It is not affiliated with or
endorsed by the Palo local government. Verify information with official sources.
The project provides no warranty.

## Milestones

- M1: static MVP covering the v1 scope.
- M2: v1.1 scope (remaining charter services, barangay profiles, change log)
  and v2 scope (Waray, legislation index, transparency links).
