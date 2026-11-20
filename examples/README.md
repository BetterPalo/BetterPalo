# Examples

This folder holds fictional examples for testing the template. Nothing in it is
real service data. The sample guide in `services/` describes a place that does
not exist, "Sample City".

- The sample loads only in a build with the flag set:
  `SAMPLE_CONTENT=true pnpm build`. The e2e tests use that build.
- A plain `pnpm build` leaves the sample out. The deploy check
  (`scripts/check-no-sample.mjs`) fails if the sample marker reaches `dist/`, so a
  sample can never reach the live site.
- `offices.yaml`, `officials.yaml`, `barangays.yaml`, and `resources.yaml` each hold
  fictional verified items (two resources) for testing the offices, about, and
  resources pages. They follow the same flag and deploy check as `services/`.
- Never copy a file from here into `src/content/`. Real guides are written from
  the official source and are never fictional. See [ADR 0014](../docs/decisions/0014-lgu-configuration-seam.md).
