# 0006: Content format for service guides

- Status: Accepted
- Date: 2026-11-03

## Context

Service guides are the core feature of v1. Each one needs a source, an edition
or effective date, a last-verified date, and a status, so that the
verified-only publishing gate in `docs/data-sources.md` can be enforced by
automation rather than by memory.

## Decision

One file per service, using Markdown with YAML front matter (or a YAML file),
with these required fields:

- `source`: official source URL.
- `edition`: edition or effective date of the source.
- `retrieved`: retrieval date.
- `verified_by`: who verified it.
- `last_verified`: verification date.
- `status`: one of `verified`, `needs_confirmation`, `outdated`.

Statuses are intentionally limited to three; superseded versions are handled by
version history, not by a status value.

The build fails if a published service lacks a source or a verification date.
That turns the data policy into CI.

## Consequences

- Every service guide carries its own provenance.
- The publishing gate is enforced by the build, not by review alone.
- Contributors add a service by adding one file.
- When the application scaffold arrives, the content loader must validate these
  fields and fail the build on missing values.

## Alternatives

- Five or more statuses: rejected. The extra states add ambiguity without
  changing what a maintainer does.
- A single data file for all services: rejected. One file per service keeps
  diffs small and reviews focused.
- No required fields: rejected. That leaves the verified-only gate unenforced.
