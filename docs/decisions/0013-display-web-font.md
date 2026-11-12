# 0013: One self-hosted display font for headlines

- Status: Proposed
- Date: 2026-11-12
- Supersedes: the "Web fonts: rejected for v1" line and the "system font stack,
  no web fonts" styling choice in [ADR 0010](0010-technology-stack-and-hosting.md).
  Everything else in ADR 0010, including the performance budget, stands.

## Context

The team chose the White Portal draft as BetterPalo's visual style. Its
headlines are set in a heavy, tightly tracked display face (Inter Tight), in
the BetterGov.ph family look. The drafts named the font but never loaded it, so
they rendered in whatever system sans each phone had, and the headline
character changed from device to device.

ADR 0010 rejected web fonts to protect the performance budget: at most 150 KB
total transfer for a service guide, and at most 60 KB of HTML and CSS per page.

## Decision

- Self-host **Inter Tight, weight 800, Latin subset only**, through the
  `@fontsource/inter-tight` package (`latin-800.css`). The WOFF2 file is
  about 23 KB. It is served from our own origin with `font-display: swap`.
- Use it for display text only: `h1` to `h3`, the brand wordmark, large
  numbers, and tile titles. Body text, labels, forms, and the printable sheet's
  body stay on the system font stack.
- No other weights, styles, or families. Adding one needs a new ADR that shows
  its size against the budget.
- `DESIGN.md` is where the type scale and tracking live.

## Consequences

- About 23 KB comes out of each page's 150 KB transfer target (the hard
  ceiling is 1 MB; see ADR 0010). Lighthouse CI keeps checking it.
- Headlines look the same on every device. Until the font loads, they show in
  the system fallback (`font-display: swap`). The swap can shift layout
  slightly; CLS stays within its 0.1 budget.
- The Latin subset covers English and Filipino (including ñ). Waray, if
  added, uses the same Latin alphabet.
