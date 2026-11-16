---
title: "0007: Service guide content model"
---

- Status: Accepted (2026-11-12)
- Date: 2026-11-06
- Revised: 2026-11-14. Adds the optional `source_pages` field (#33). Approved
  by the lead and @STR4T-coder on 2026-11-15 in #65.

## Context

[ADR 0006](0006-content-format-for-service-guides.md) fixes the provenance
fields every service guide must carry, but not the fields that hold the guide
itself. The "content format for data files" decision is still pending. The
November 2026 team review brief proposed a fuller model with nested
requirements, steps, fees, and application channels, plus five verification
statuses.

RA 11032 Section 6 lists what a Citizen's Charter must contain for each service:
a checklist of requirements, the procedure, the person responsible for each
step, the maximum time, the documents to present, the fees, and the complaint
procedure. The content model should mirror those fields so a Charter entry can
be transcribed without reshaping it.

This ADR extends ADR 0006; it does not replace it. Because it is a data-policy
change, it needs two approvals under the charter.

## Decision

Each service guide is one YAML file (or Markdown with YAML front matter). It
keeps the ADR 0006 provenance fields exactly as named and adds these content
fields.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable slug, also the page URL, for example `business-permit-renewal` |
| `name` | string | Service name as written in the source |
| `category` | string | For example `business`, `civil-registry`, `social-welfare` |
| `office` | string | Responsible office, as named in the source |
| `classification` | string | `simple`, `complex`, or `highly_technical`, as stated in the Charter |
| `transaction_type` | string | For example `G2C`, as stated in the Charter |
| `description` | string | Plain-language summary |
| `eligibility` | string or null | Only if the source states it |
| `requirements` | list | `document`, `copies`, `form` (original, photocopy, certified true copy), `where_to_get`, `conditions` |
| `steps` | list | `step`, `applicant_action`, `office_action`, `responsible` (office or position, never a staff member's name), `max_time` |
| `fees` | list | `amount`, `purpose`, `where_to_pay`, `conditions`, `basis` (the ordinance or code an amount comes from; used alone when the source gives no amount) |
| `processing_time` | string or null | Total maximum time, as stated in the source |
| `application_channels` | list | `type` (`online` or `walk-in`), `url` or `location`, `supports`, `account_required`, `last_tested` |
| `complaint_procedure` | string or null | As stated in the source |
| `effective_date` | date or null | Only when it differs from `edition`, for example after an ordinance changes a fee |
| `notes` | string or null | Limits of the source, such as "official source could not be accessed" |
| `source_pages` | string or null | PDF page numbers of this service in `source`, for example `"225–227"`. Optional; see "Revision: source pages" |

Rules:

- Verification stays at the three ADR 0006 statuses: `verified`,
  `needs_confirmation`, `outdated`. The brief's `official_source_unavailable`
  is recorded as `needs_confirmation` with an explanation in `notes`; its
  `superseded` is handled by version history, as ADR 0006 already says.
- `null` means the official source does not say. The site shows "Not stated in
  the official source. Ask the [office]." It never fills the gap with a guess.
- An online channel is described only by what was tested: `supports` lists what
  a user can actually do (for example "log in and check status") and
  `last_tested` records when.
- Amounts and times are copied as written in the source, not recalculated.
- Staff names in the Charter's "person responsible" column are not published;
  guides name the office or position.
- When the source gives a fee only by reference (for example, "based on the
  Municipal Tax and Revenue Code"), `amount` is `null` and `basis` names the
  reference.

Example (illustrative; values are intentionally empty):

```yaml
id: business-permit-renewal
name: Business Permit Renewal
category: business
office: null
description: >
  Renewing a business permit in the Municipality of Palo.
eligibility: null
requirements: []
steps: []
fees: []
processing_time: null
application_channels:
  - type: online
    url: https://bpbc.ibpls.com/paloleyte/
    supports: null
    account_required: true
    last_tested: null
complaint_procedure: null
effective_date: null
notes: Populate only from the current Citizen's Charter.

source: null
edition: null
retrieved: null
verified_by: null
last_verified: null
status: needs_confirmation
```

## Revision: source pages (2026-11-14)

Why: a guide's source link opens the whole Charter PDF at its first page, so a
reader has to search for the service. The guide now records where the service
is in the PDF. Its source link opens the PDF at the first recorded page, and
the printed sheet says which pages to read, for example "pp. 225–227".

Format: `source_pages` is a string of PDF page numbers. It takes one of three
forms: one page (`"225"`), a range with an en dash or a hyphen (`"225–227"` or
`"225-227"`), or a comma-separated list (`"7, 9–10"` or `"7,9–10"`; a space
after the comma is optional). Surrounding spaces are trimmed. An empty string
is rejected. Leave the field out, or write `null`, when the pages are not
recorded. As for every other content field, `null` is the only "not stated"
value. The build checks the shape, that every page is 1 or more, and that each
range runs upward. It does not check that the pages exist in the PDF or hold
the service; the second checker confirms that.

Page numbers: the numbers are the page numbers the PDF viewer shows, not the
folio printed on the page. The link has to land on the right page, and the
printed folio can differ from the viewer's count. The transcriber records the
viewer's numbers.

Optional: the field is not required for `status: verified`. Guides without it
still pass the publishing gate. The ADR 0006 provenance field names do not
change.

Rejected alternative: keep the pages only in the `source` URL fragment (for
example `#page=225`). The link would land on the right page, but the printed
sheet would have no page numbers to show, and the build would have to read
them back out of a URL.

Decided on 2026-11-14 (#33). It is a data-model change, so it needs two
approvals, from the lead and @STR4T-coder, before it is in force.

## Consequences

- A Charter entry maps onto a guide field by field, which makes transcription
  and review faster.
- The build can check structure as well as provenance once the scaffold exists.
- Gaps in the official source are visible to residents instead of hidden.
- The schema is larger, so contributors need a template file and a short guide.

## Alternatives

- Adopt the brief's five statuses: rejected for the reason in ADR 0006; the
  extra states do not change what a maintainer does.
- Nest provenance under a `source:` object as the brief proposed: rejected to
  keep the ADR 0006 field names and avoid a migration.
- Free-form Markdown body only: rejected. Fees, steps, and times could not be
  validated or reused in print sheets.
