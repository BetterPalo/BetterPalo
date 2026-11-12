# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 (static output), TypeScript, Tailwind CSS v4, Pagefind search,
hosted on Cloudflare Workers static assets. System font stack for body text;
one self-hosted display font (Inter Tight 800, Latin subset) for headlines.
See `docs/decisions/0010-technology-stack-and-hosting.md` and
`docs/decisions/0013-display-web-font.md`. Visual system: `DESIGN.md`.

## Users

Residents of Palo, Leyte, plus students, researchers, and LGU staff, who need
an answer on a phone. Many are on a slow connection or a mid-range phone, and
some read in Filipino. They come with one job: find out where to go, what to
bring, how much it costs, and how long it takes for a municipal service.

## Product Purpose

BetterPalo is a community-run, unofficial service-guide portal for the
Municipality of Palo. It makes Palo's government information and public
services easier to find, understand, and verify. It complements official
channels (the LGU website, COMPASS); it does not replace them. Success: a
resident finishes their errand without a wasted trip, and can check every fact
against the official source.

## Positioning

Every guide is cited to an official source (the Palo Citizen's Charter 2026,
2nd Edition) with an edition date and a last-verified date, reachable in two
clicks. A Facebook post cannot be a verified, dated, searchable service page.
Nothing is published without passing the verified-only gate.

## Operating Context

- v1 scope: about 10 to 12 service guides, offices and officials, About Palo
  with the 33-barangay list and PSA 2024 census figures, official resource
  links, search, English and Filipino, printable one-page service sheets.
- An "unofficial" banner and a "report a wrong detail" link appear on every
  page.
- Part of the BetterGov.ph / BetterLGU community of civic portals (for
  example BetterSolano.org); listed in the BetterLGU directory.

## Capabilities and Constraints

- Publishes information only: no payments, applications, accounts, or acting
  as an official channel.
- Out of scope for v1: legislation, budget/COA/procurement views, project
  tracking, maps, citizen reports, Waray, a CMS.
- Unconfirmed items (hotlines, office phone numbers, BPLS online claims) stay
  unpublished until confirmed.
- No placeholders (`TBD`, `TODO`); a missing page is better than a wrong one.
- Untranslated pages are marked `translation-pending`.

## Brand Commitments

- Name: BetterPalo (domain betterpalo.org, not yet registered; currently
  served at betterpalo.betterpalogov.workers.dev).
- Visual kinship with the BetterGov.ph family: Philippine-flag blue palette,
  as used by bettersolano.org, about.bettergov.ph, and the BetterGov
  transparency portal (user request, 2026-11-12).
- Nonpartisan: no office ratings, no credit-claiming, no photos in v1.

## Evidence on Hand

- Palo Citizen's Charter 2026 (2nd Edition): 112 external services across 20
  offices; see `docs/research/citizens-charter-2026-inventory.md`.
- PSA 2024 Census: population 80,291 (reference date July 1, 2024).
- 33 barangays.
- No testimonials, usage numbers, or LGU endorsement exist; do not invent them.

## Product Principles

- Accuracy first: a missing page beats a wrong one.
- Cite the source: every fact two clicks from its official document.
- Plain language for a reader in a hurry.
- Mobile first, low bandwidth.
- Open and community-built; anyone can contribute.

## Accessibility & Inclusion

WCAG 2.1 AA is the floor. English and Filipino from day one. Works on
low-end phones and slow connections.
