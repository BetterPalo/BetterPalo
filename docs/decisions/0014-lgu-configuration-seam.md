# 0014: LGU configuration seam for template reuse

- Status: Proposed
- Date: 2026-11-14
- Approval: requested from the lead and @STR4T-coder.

## Context

BetterPalo is the template for other LGUs ([ADR 0008](0008-own-stack-with-betterlgu-as-reference.md)).
Palo's identity was spread over about 20 files: about 76 lines of
`src/i18n/ui.ts`, the site facts, the site URL, `public/robots.txt`,
`wrangler.jsonc`, `package.json`, the smoke script, the workflows, and the e2e
tests. Adapting a copy was a manual search, as
[`docs/adapt-for-your-lgu.md`](../adapt-for-your-lgu.md) described.

Three problems follow from that:

- A copy cannot say "city" as opposed to "municipality". Find-and-replace cannot
  tell them apart, and the Filipino phrasing differs ("Bayan ng" or "Lungsod ng").
- Copies cannot pull later template fixes without conflicts, because every
  adapted line is a line the template also changes.
- The workflows fell back to Palo's production URL when `PRODUCTION_URL` was not
  set. A copy that had not set the variable tested Palo's site every hour.

The guide page and the search page (#33, #34) are still being built. They need
the same values, so they should read them from the seam, not from Palo's text.

## Decision

One typed file, `src/config/lgu.ts`, is the only LGU-owned place for an LGU's
identity, facts, and URLs. The template reads it and never edits it. The rest
of the code is template code that works for any LGU.

- `src/config/lgu.ts` holds the values: name, `type` (`municipality` or `city`),
  province, brand, URLs, the Charter and census facts, and the offices.
  `pnpm init:lgu` writes it.
- `src/lib/lgu.ts` (template-owned) defines the types, derives the English and
  Filipino terms from `type` (for example "Municipality of X" or "City of X",
  "Bayan ng X" or "Lungsod ng X"), and builds the placeholder values.
- Interface strings in `src/i18n/ui.ts` use placeholders such as `{place}` and
  `{lguPhrase}`, which `t()` fills in. A unit test fails if "Palo" or "Leyte"
  appears in `ui.ts`. A new string that needs a place name or a figure gets a
  placeholder, never the value itself.
- `astro.config.mjs` takes the site URL from the config. `robots.txt` is generated
  by `src/pages/robots.txt.ts` instead of being a static file.
- The smoke script and the workflows have no default URL. The `deploy` job stops
  at its first step if `PRODUCTION_URL` is not set, and the monitor skips with a
  notice instead of checking someone else's site.
- `pnpm init:lgu` asks for each value and writes `src/config/lgu.ts`, the Worker
  name in `wrangler.jsonc`, and the package name in `package.json`. It never
  guesses a fact, and it does no find-and-replace. Palo's documents stay where
  they are; the adaptation guide covers them.
- A fictional sample guide, `examples/services/sample-business-permit.yaml`, loads
  only when the build runs with `SAMPLE_CONTENT=true`. It goes through the same
  schema and publishing gate as a real guide. This is a data-policy exception for
  one fictional guide: it sits outside `src/content/`, the flag is off by default,
  a person (not an agent) sets its `status: verified`, and `scripts/check-no-sample.mjs`
  blocks it from production in the `build` and `deploy` jobs. Its fields are
  labelled fictional.

## Consequences

- Copies can merge later template fixes. Each copy's values sit in one file that
  the template does not change, so most fixes apply without conflicts.
- A string that names an LGU or a figure must use a placeholder. The unit test
  catches "Palo" and "Leyte" in `ui.ts`; other place-specific text is caught in
  review.
- Cities and municipalities are both supported, and the Filipino phrasing is
  derived from `type`. The placeholder phrasing needs translator review (#13).
- Palo's built site must not change. The acceptance check is a full diff of Palo's
  `dist/` before and after this work, which must show no difference.
- The sample guide breaks the data policy for one fictional guide, so this ADR
  needs two approvals before it is accepted. If any of its guards proves weak,
  the sample is dropped and the empty states stay. The data rules are in
  [ADR 0006](0006-content-format-for-service-guides.md) and
  [ADR 0007](0007-service-guide-content-model.md); the sample itself is described
  in [`examples/README.md`](../../examples/README.md).
- Palo's repository needs the repository variable `PRODUCTION_URL`. It is now set
  to Palo's address. The workflows have no fallback, so any copy must set the
  variable before deploys or monitoring can work. Without it, the deploy stops
  with an error and the monitor skips with a notice.

## Alternatives

- **A. Config and placeholders, no script.** Sound, but a new user still renames
  the Worker and the package by hand. The small init script removes that step, so
  the chosen option, C below, adds one.
- **B. Find-and-replace script only.** Rejected. It cannot tell a city from a
  municipality, it breaks the Filipino phrasing ("Bayan ng" or "Lungsod ng"), and
  every replaced line conflicts with later template fixes, so copies stop
  receiving them.
- **C. Config, placeholders, and a small init script (chosen).** The Decision
  above: the config is the only LGU-owned file, the placeholders derive the terms
  from it, and `pnpm init:lgu` writes it along with the Worker and package names.
- **A separate starter repository.** Rejected. BetterPalo stays the template, like
  the other listed starters.
