---
title: Data sources
---

How BetterPalo records where its data came from and what terms apply.

## Source hierarchy

| Level | Source type | Use |
| --- | --- | --- |
| 1 | Current official LGU document, issuance, or office confirmation | Primary authority for Palo-specific service rules, fees, and contacts |
| 2 | Official national government source | Primary authority for national services, official statistics, and national programs |
| 3 | Official government directory (for example, a DILG provincial profile) | Reference for officials and public contacts; check freshness before use |
| 4 | Official LGU social media | Discovery of announcements and updates; link the supporting document where one exists |
| 5 | Third-party aggregator or mirror | Research lead only; verify against levels 1 to 3 |
| 6 | Community contribution | Unverified until a maintainer checks it against levels 1 to 3 |

Levels 4 to 6 are never enough on their own to publish a fee, requirement,
processing time, or contact number.

## Register

| Dataset | Fields published | Source | Source URL | Retrieved | Verified by | Terms | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Palo Citizen's Charter 2026 (2nd Edition): cedula service | Requirements, steps, fees, processing time, complaint procedure | Level 1: official LGU PDF | [Charter PDF](http://210.213.142.34/home/homepage_data/pdf_chart/20260512/20260512.pdf) | 2026-11-06 | Zyxavy (transcriber); second checker not recorded | Public official document | PDF pages 225-227 and 255 (#26). `verified_by` must name the second checker before the guide claims `verified`. |

## Source leads

Leads are sources the team has found but not yet verified. They are not register
entries and nothing from them is published until it reaches the register.

| Lead | Location | Level | What to check | Status |
| --- | --- | --- | --- | --- |
| Official LGU of Palo website | [http://210.213.142.34/home/?page=home](http://210.213.142.34/home/?page=home) | 1 (once confirmed) | Whether it hosts the current Citizen's Charter, officials, offices, and hotlines; confirm with the LGU that this address is official | Reported by the team, 2026-11-06 |
| `palo-leyte.gov.ph` | [https://www.palo-leyte.gov.ph](https://www.palo-leyte.gov.ph) | 1 (once confirmed) | Listed on Wikipedia as the official site; check whether it is live or replaced by the address above | Did not resolve in an automated check, 2026-11-12; recheck from a normal connection before dropping it |
| Palo BPLS (iBPLS) | [https://bpbc.ibpls.com/paloleyte/](https://bpbc.ibpls.com/paloleyte/) | 1 (once confirmed) | Which transactions work end to end; see the BPLS caution below | Page identifies as Palo, 2026-11-06 |
| Sangguniang Bayan of Palo | [https://palosb.com/official_website/](https://palosb.com/official_website/) | 1 | Ordinance texts and COA report downloads; hotlines look like placeholders | Unverified |
| DILG Province of Leyte, Palo profile | [https://sites.google.com/view/dilg-province-of-leyte/lgus/palo](https://sites.google.com/view/dilg-province-of-leyte/lgus/palo) | 3 | No visible update date; confirm officials and contacts with the LGU | Unverified |
| PSA 2024 Census of Population | PSA release for Palo (exact table to be recorded) | 2 | Record the table title, release date, and reference date (July 1, 2024) | Headline total (80,291) matches a secondary source |
| Palo Citizen's Charter (PDF) | [http://210.213.142.34/home/homepage_data/pdf_chart/20260512/20260512.pdf](http://210.213.142.34/home/homepage_data/pdf_chart/20260512/20260512.pdf) | 1 | Cover says "2026 (2nd Edition)"; approval date still unconfirmed by the LGU; see [the service inventory](research/citizens-charter-2026-inventory.md) and [Verifying without an LGU reply](#verifying-without-an-lgu-reply) | Downloaded and inventoried, 2026-11-06; accepted as the source for service guides, 2026-11-12 |
| Palo Tourism Portal | Project copy of the portal (no public URL recorded) | 5 | Spot names, descriptions, and offers; confirm each with the tourism office. Place types are the team's classification, not the portal's | Ported 2026-11-14; the portal cited no official sources |
| Citizen's Charter announcement | LGU Facebook page (via Govserv mirror) | 4 / 5 | The linked download goes to a third-party PDFfiller page; do not use it | Rejected as a source |
| Scribd upload "PALO-Leyte" | [https://www.scribd.com/document/566303202/PALO-Leyte](https://www.scribd.com/document/566303202/PALO-Leyte) | 5 | Unknown content and date; open it to see whether it is an older Charter edition. Research lead only | Found in web search, 2026-11-12; not opened |

## Rules

- Record a source URL and a retrieval date for every dataset.
- Record who verified it and when. A service guide needs a second checker who
  did not transcribe it. Other data (tourism spots, statistics, officials,
  hotlines) can be verified by one team member, with a second check
  encouraged.
- Prefer primary sources. If only a secondary source exists, say why.
- Extract only the fields the site needs. Do not copy whole pages.
- Review each dataset quarterly or when the source changes.
- Corrections arrive through the data-correction issue form, which requires a
  source URL and a verification date.
- Two-click source rule: every fact links to the official document or page it
  came from, reachable in two clicks.
- Record the edition or effective date of the source (for example, the
  Citizen's Charter edition).
- Verified-only publishing gate for service guides: a guide is published only
  when it has a source, an edition or effective date, and a last-verified date.
  Unverified guides are not published.
- A missing page is better than a wrong one.

## Tourism spots

The spots in `src/content/tourism/` come from the Palo Tourism Portal, which
cites no official source. They are level 5 leads and are the one deliberate
exception to the verified-only gate: the page shows them with an **Unverified**
badge and a note to confirm details with the tourism office, instead of hiding
community leads. A spot loses the badge when `source`, `retrieved`,
`verified_by`, and `last_verified` are filled and `status` is `verified`. One
team member can do this; a second check is encouraged.

Photos follow [`licensing.md`](licensing.md). A third-party photo with unknown
terms is not used; [issue #64](https://github.com/BetterPalo/BetterPalo/issues/64)
tracks cleared photos.

## Verifying without an LGU reply

Decided 2026-11-12 in issue #24. The LGU of Palo has not answered the team's
letter, so M1 does not wait for a reply.

- A service guide may be marked `verified` when a second checker, who did not
  transcribe it, has compared it page by page against the Citizen's Charter PDF
  published on the LGU's own server (the 2026, 2nd Edition entry in the source
  leads). `verified` means "matches the published official source", not
  "confirmed by the LGU".
- Each guide's `notes` says that the Charter's approval date has not been
  confirmed by the LGU.
- The unofficial-site banner and the "report a wrong detail" link stay on every
  page.
- Phone numbers and hotlines follow the source level:
  - From a level 1 to 3 source (the Charter, an official LGU or national
    agency page, or an official directory), a team member may publish the
    number without a test call. Show the source and an "as of" date.
  - From level 4 or lower (a Facebook post, a mirror, a third-party site, word
    of mouth), the number stays unpublished until a test call or the LGU
    confirms it.
  - Contacts of national agencies that the Charter itself prints (for example
    ARTA, PCC, and CCB on its Feedback and Complaint Mechanism page) may be
    published as printed, with the page cited. Decided 2026-11-14 for the cedula
    guide (#26) by the lead and the second checker.
- Claims that a transaction can be completed online through the BPLS stay
  unpublished until the permits office or an end-to-end test confirms it.
- Anything the Charter does not state stays `null`.
- If the LGU replies, record the confirmed approval date and official website
  address here and in the source leads, and recheck published guides against
  any newer Charter edition.
- Keep following up with the LGU (issue #24). A reply is still wanted, but it no
  longer blocks publishing.

## Verification cautions

- **BPLS link.** A permit-system URL seen in earlier research pointed at a
  different LGU. The page at `bpbc.ibpls.com/paloleyte/` now identifies itself
  as the Municipality of Palo BPLS and is run on DICT's iBPLS (its privacy
  notice names DICT's Data Protection Officer). As of 2026-11-06, Business
  Permit and Working Permit lead to a login page, and Building Permit and
  Occupancy Permit are marked "Soon". Confirm with the permits office which
  transactions can be completed online before a service guide says so.
  The Citizen's Charter's business permit service points to a different host,
  `bpbc4.ibpls.com/paloleyte/`; test both and confirm which is current.
- **Official website address.** The LGU site the team found is served from a
  bare IP address over plain HTTP. Addresses like this can change without
  notice and browsers may show a "not secure" warning. Confirm with the LGU that
  it is the official site, record the retrieval date for every document taken
  from it, and save the document's own title and date so it can be found again
  if the address moves.
- **Census editions.** The PSA Region VIII special release for Palo found in
  research reports the 2020 census (76,213 as of May 1, 2020), not the 2024
  census. Always label a figure with its census year and reference date, and
  cite the 2024 table for 2024 figures.
- **Emergency hotlines.** Numbers on third-party sites may be placeholders. For
  a hotline, a wrong number is a safety problem. A number from a level 1 to 3
  source can be published with its source and date; from level 4 or lower,
  confirm it by calling the office first.
- **Mirrors and third-party sites** (for example, the Govserv Facebook mirror)
  are leads, not sources. Re-verify names, population figures, and contacts
  against the primary document or the office.
- **RA 11032.** Section 6 requires every office, including LGUs, to post an
  up-to-date Citizen's Charter on an information billboard, on its website, and
  in published materials, in English, Filipino, or the local dialect. Section 6
  itself sets no update schedule; confirm any annual-update rule against the
  implementing rules before citing a deadline.

## Government works

Under Republic Act No. 8293 (RA 8293), Section 176, no copyright subsists in a
work of the Government of the Philippines, but prior approval is necessary for
exploitation for profit. Record the source agency and do not claim ownership of
the government's work. See [`licensing.md`](licensing.md).

## Privacy

- Publish only contact details the LGU has already published for public offices
  and public officials.
- Do not publish signatures, personal emails, home addresses, or unpublished
  phone numbers.
- Remove personal data from uploaded screenshots and documents.

## Review

Review the register quarterly. A dataset with no verified source is removed or
marked unverified until a source is found.
