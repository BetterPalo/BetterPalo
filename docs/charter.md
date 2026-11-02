# BetterPalo Charter

Adopted: 2026-11-03

## Purpose

Make Palo's government information and public services easier to find,
understand, and verify.

## v1 scope

- A department and office directory.
- Service guides with requirements, steps, fees, and contacts.
- Elected officials and their positions.
- Barangay profiles and contacts.
- Key municipal contacts.

## Out of scope for v1

Legislation, transparency dashboards, report forms, user accounts, and a CMS.

## Who this is for

Residents, students, researchers, and LGU staff who need an answer on a phone.
They may be on a slow connection, using a mid-range phone, or reading in
Filipino. The site should answer their question without an account.

## Scope boundaries

v1 publishes information. It does not process payments, accept applications, or
act as an official channel for any office. Links to official services point to
the office's own page.

## Principles

- Accuracy first. A missing page is better than a wrong one.
- Cite the source. Every fact links to the official document or page it came
  from.
- Plain language. Write for a reader who is in a hurry and on a slow
  connection.
- Mobile first. Design and test on the smallest screen before the desktop.
- Accessibility by default. WCAG 2.1 AA is the floor, not an enhancement.
- Open by default. Public information stays public, and the work happens in the
  open.
- Community over hierarchy. Anyone can contribute; maintainers review.

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

## How we work

- Every page names the office or dataset it came from.
- Corrections are published with the same care as new pages.
- Work is split into small pull requests that one reviewer can check in a
  sitting.
- Discussions happen in issues or pull requests so the reasoning stays
  searchable.
- Anyone may propose a change; maintainers are responsible for the final check
  against this charter.

## Definition of done

- Data is accurate and has a cited official source and a verification date.
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
- M2: legislation, transparency, and report forms.

## Amending this charter

Charter changes follow the decision rules above and are recorded in
[`docs/decisions/`](decisions/README.md). A change takes effect when its pull
request merges.
