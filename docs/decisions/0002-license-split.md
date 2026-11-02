# 0002: License split for code, content, and data

- Status: Accepted
- Date: 2026-11-03

## Context

BetterPalo takes contributions from residents, students, researchers, and LGU
staff, not only developers. Every contribution needs clear terms so that
contributors know what they give, users know what they may do, and the project
can reuse the work without chasing permission later.

One license does not fit every artifact. Software and written content have
different expectations. Software licenses deal with source distribution,
patents, and warranty. Content licenses deal with attribution and derivative
works. Structured data needs the fewest possible restrictions so it can be
merged, compared, and reused by other tools.

Creative Commons advises against using its licenses for software because they do
not address source code, patents, or installation. The project therefore needs
an OSI-approved software license plus Creative Commons licenses for the other
artifacts.

Government works add a second constraint. Under Republic Act No. 8293 (RA 8293),
Section 176, no copyright subsists in a work of the Government of the
Philippines, but prior approval of the agency that created the work is necessary
for exploitation for profit. The project must not claim ownership of
government-authored material.

The full license map and the mixed-file rule live in
[`docs/licensing.md`](../licensing.md). The design spec is
`docs/superpowers/specs/2026-11-03-betterpalo-repo-skeleton-design.md`.

## Decision

- Source code, scripts, build configuration, and GitHub workflows: MIT.
- Site prose, documentation, translations, original images, and diagrams:
  CC BY-SA 4.0.
- Structured data such as officials, barangays, departments, services, and
  contacts: CC0 1.0.

## Rationale

### Code: MIT

MIT is short, familiar, and OSI-approved. It lets volunteers read, run, modify,
and self-host the site without legal review, which matters for a small community
project. It stays compatible with the broadest set of future choices.

Why not CC0 for code: CC0 is not recommended for software. It waives copyright
but says nothing about patents or warranty, and it leaves downstream users
without a clear software grant.

Why not Apache-2.0: Apache-2.0 adds a patent grant and a notice file. Those are
useful for companies with patent portfolios, but they add paperwork this project
does not need, and a short license is easier for non-lawyers to read.

Why not GPL-3.0: copyleft is a legitimate choice, but it would force every fork,
including a small barangay tool, to adopt the same terms. The project wants
reuse, not a licensing gate.

### Content: CC BY-SA 4.0

The site's prose and translations are creative work. CC BY-SA 4.0 is the
standard license for open reference content. It requires attribution and
share-alike, so improvements to the text return to the commons, while still
allowing reuse in other guides, newsletters, and mirrors.

Why not CC BY 4.0: without share-alike, a modified copy could be published
without the improvements coming back. The project wants translations and
corrections to stay open.

### Data: CC0 1.0

Factual data about offices, services, and officials should be usable without
friction. CC0 removes attribution and share-alike requirements, so a researcher
can merge the register into another dataset, a student can build a map, and
another LGU can reuse it without tracking provenance. The project still records
sources in [`docs/data-sources.md`](../data-sources.md); that is a project rule,
not a license condition.

Why not ODbL: ODbL is designed for databases and imposes share-alike on
derivative databases. That is heavier than needed for a small, source-cited
register, and it can conflict with the way public bodies publish their own data.

## Consequences

- Contributors license code under MIT, content under CC BY-SA 4.0, and data
  under CC0. This is inbound = outbound.
- Files that mix facts and original prose need the mixed-file rule in
  `docs/licensing.md`: facts and arrangement are CC0; prose is CC BY-SA 4.0.
- Reusers of content must attribute the project and share adaptations under the
  same license.
- Government-authored material is excluded from the project's licenses. The
  project claims only its own selection, arrangement, normalization, and
  original write-ups.
- Third-party photos, logos, screenshots, quoted text, and datasets need their
  own terms recorded in `docs/data-sources.md`.
- Three licenses mean three notices, but each artifact gets terms that fit it.

## Alternatives

- A single license for everything: rejected because no license fits code, prose,
  and data at once.
- No license: rejected because it leaves contributors and users without clear
  rights.
- A contributor license agreement: rejected because it adds friction for
  non-developer contributors.

This is a project decision, not legal advice.
