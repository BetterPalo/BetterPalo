# Examples

This folder holds fictional examples for testing the template. Nothing in it is
real service data. The sample guide in `services/` describes a place that does
not exist, "Sample City".

- The sample loads only in a build with the flag set:
  `SAMPLE_CONTENT=true pnpm build`. The e2e tests use that build.
- A plain `pnpm build` leaves the sample out. The deploy check
  (`scripts/check-no-sample.mjs`) fails if the sample marker reaches `dist/`, so a
  sample can never reach the live site.
- Never copy a file from here into `src/content/`. Real guides are written from
  the official source and are never fictional. See ADR 0014.
