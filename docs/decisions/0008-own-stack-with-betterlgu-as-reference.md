# 0008: Own stack and template, with BetterLGU as reference

- Status: Accepted (2026-11-12)
- Date: 2026-11-06

## Context

BetterLGU (<https://lgu.bettergov.ph/>) is a community directory of LGU portals
run by BetterGov.ph. Its contribution guide does not require a particular
template or stack; templates are optional and listed in its `TEMPLATES.md`.
Other Region VIII portals are in progress, for example Better Alangalang.

BetterPalo has requirements that a generic template may not cover: the
verified-only publishing gate (ADR 0006), the service guide content model
(ADR 0007), printable one-page service sheets, English and Filipino with
`translation-pending` marking, and WCAG 2.1 AA on low-end phones.

## Decision

BetterPalo builds its own stack and site template. BetterLGU templates and
existing portals are used as reference material for information architecture,
page types, data shapes, and components, not as a base to fork.

- The specific framework, hosting, and search setup are still decided in the
  pending tech-stack ADR.
- Any code or content copied from a reference project is used only under its
  license, with the required notice, and recorded in the pull request.
- BetterPalo stays listed in the BetterLGU directory, following its current
  contribution process, independent of which stack it uses.
- If the template becomes reusable, it may be offered back to BetterLGU's
  template list.

## Consequences

- The team controls the publishing gate, print styles, and translation
  workflow.
- More up-front work than starting from a template.
- Reviewing reference projects should happen before the tech-stack ADR is
  written, so the comparison is on the record.

## Alternatives

- Fork a BetterLGU template: rejected by the team. It would inherit decisions
  that do not fit the verification gate and service guide model.
- Ignore BetterLGU entirely: rejected. Existing portals already solve common
  problems, and staying in the directory helps residents find the site.
