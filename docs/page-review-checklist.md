---
title: Page review checklist
---

Use this list when a person reviews a page by hand. The automated checks cannot cover these.

- [ ] One h1 on the page, and the heading levels follow in order.
- [ ] The header, main content and footer landmarks are present, with one main.
- [ ] The skip link works and moves focus to the main content.
- [ ] A keyboard-only walk-through reaches every control, with a visible focus state.
- [ ] At 200% zoom and at 360 px wide, there is no sideways scroll.
- [ ] With a larger browser text size, the text still reads and nothing is cut off.
- [ ] With JavaScript off, the page is still readable.
- [ ] English text inside a Filipino page has `lang="en"`.
- [ ] Link text makes sense on its own.
- [ ] Images have alt text, or are marked as decorative.
- [ ] Colours come from the design tokens, and the text contrast passes.
- [ ] `pnpm test:e2e` (axe) passes with no violations.
- [ ] Filipino strings are present, or marked as pending translation.
- [ ] No claim on the page goes beyond what was checked.
- [ ] The reviewer and the date are recorded in the pull request.
