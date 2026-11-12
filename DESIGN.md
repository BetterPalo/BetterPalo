---
name: BetterPalo
description: White Portal, the visual system for BetterPalo's unofficial, cited service guides for Palo, Leyte.
colors:
  flag: "#0038a8"
  flag-dark: "#002b82"
  flag-deep: "#00226e"
  flag-bright: "#0096ff"
  sun: "#fcd116"
  sun-light: "#ffe066"
  ink: "#0a0a0a"
  ink-raised: "#161718"
  ink-alt: "#111214"
  ink-line: "#2a2b2e"
  paper: "#ffffff"
  wash: "#f4f7fc"
  mist: "#e8f1ff"
  line: "#d1d8e6"
  muted: "#5a5a58"
  stone: "#b4b4b0"
  sky-ink: "#dbe6ff"
typography:
  display:
    fontFamily: "Inter Tight, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif"
    fontSize: "clamp(2.75rem, 6.2vw, 5.25rem)"
    fontWeight: 800
    lineHeight: 0.93
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.6vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  number:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 3.4vw, 2.9rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  lede:
    fontFamily: "system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "0.12em"
rounded:
  none: "0px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
  gutter: "clamp(1rem, 5vw, 5.375rem)"
  section: "clamp(3.5rem, 7vw, 5.5rem)"
components:
  button-sun:
    backgroundColor: "{colors.sun}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-sun-hover:
    backgroundColor: "{colors.sun-light}"
  button-flag:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-flag-hover:
    backgroundColor: "{colors.flag-deep}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-line-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-compact:
    padding: "0 1rem"
    height: "2.5rem"
  chip:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.flag-deep}"
    rounded: "{rounded.none}"
    padding: "0.4rem 0.75rem"
  chip-hover:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.paper}"
  search-input:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.9rem 1rem"
  search-submit:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.paper}"
    width: "3.4rem"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
  tile-featured:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.paper}"
    padding: "1.4rem 1.5rem"
  icon-well:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.flag}"
    size: "3.25rem"
  notice-bar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone}"
    padding: "0.45rem 0"
  nav:
    backgroundColor: "{colors.flag-deep}"
    textColor: "{colors.paper}"
    height: "4.25rem"
  infobar:
    backgroundColor: "{colors.flag}"
    textColor: "{colors.sky-ink}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stone}"
---

<!-- markdownlint-configure-file {"MD024": {"siblings_only": true}, "MD025": {"front_matter_title": ""}} -->

# Design System: BetterPalo

## Overview

<!-- markdownlint-disable-next-line MD036 -->
**Creative North Star: "The Posted Charter"**

BetterPalo looks like a notice that has been checked, dated, and pinned up at
the municipal hall: white paper, flag-blue ink, square edges, and a citation
under every claim. The style is called **White Portal**. It takes its palette
and heavy two-tone headlines from the BetterGov.ph family
(fellowship.bettergov.ph) and its section order from bettersolano.org: header
with search, popular services, at-a-glance figures, offices, sources,
contribute, footer.

The page is confident but never loud. Headlines are big, heavy, and short, with
the second half of the phrase in flag blue ("Popular **services.**"). Below
them, everything is quiet: system-font body text, thin ruled borders, generous
white space, and small figures in tabular numerals. Color does structural work.
Blue marks what you can act on, sun-yellow marks the single most important
action or a verified fact, and ink-black bands break up a long page.

The reader is in a hurry, on a mid-range phone, often on a slow connection.
Every visual decision earns its bytes. There are no photos, no illustrations
except the flag sun, and one web font.

**Key Characteristics:**

- Square corners everywhere (0px radius). Nothing is pill-shaped or rounded.
- Two-tone headlines: ink first half, flag-blue second half, ending in a period.
- Bands alternate white, wash, and ink-black (`inv`) to pace a long page.
- One sun-yellow action per view; flag blue for every other action.
- Thin 1px borders do the layering; a single soft shadow lifts the cards you can act on.
- The Philippine flag sun is the only ornament, drawn in `currentColor` at low opacity.
- Light by default, with a matching dark theme (Night) that follows the device setting.

## Colors

A flag palette (blue, sun, white) grounded by near-black ink and a cool wash.
Components use the theme roles (`canvas`, `surface`, `fg`, `fg-soft`, `edge`,
`accent`, `on-accent`, `frame`) so that light, dark, and inverted bands all
come from the same markup.

### Primary

- **Flag Blue** (`flag`): the voice of the site. Links, the second half of every
  headline, primary buttons, icon wells, the featured tile, and the search
  submit. Contrast is 9.85:1 on white.
- **Deep Flag Blue** (`flag-deep`): the sticky nav, chip text, and the hover
  state of flag buttons. `flag-dark` is the in-between step, used for pressed
  states.
- **Bright Flag Blue** (`flag-bright`): the accent on dark surfaces (Night theme
  and `inv` bands), and the focus ring everywhere. Contrast is 6.42:1 on ink.

### Secondary

- **Sun Yellow** (`sun`): the flag's sun. Used for the one main call to action,
  the "Unofficial." label in the notice bar, text selection, the skip link,
  printable-sheet tags, and the top rule of the sources card. Text on sun is
  always ink. `sun-light` is its hover state.

### Neutral

- **Ink** (`ink`): body text on light surfaces; the notice bar, footer, and `inv`
  band backgrounds. `ink-raised` (cards on ink), `ink-alt` (alternate band in
  Night), and `ink-line` (borders on ink) complete the dark ramp.
- **Paper** (`paper`) and **Wash** (`wash`): the two light backgrounds. Wash
  alternates with paper band by band and fills the search input.
- **Mist** (`mist`): the tint behind icon wells and chips.
- **Line** (`line`): every 1px border and ruled list on light surfaces.
- **Muted** (`muted`): secondary text on light surfaces (6.44:1 on wash).
  **Stone** (`stone`) is its counterpart on ink. **Sky Ink** (`sky-ink`) is
  secondary text on flag-blue panels (7.87:1).

### Named Rules

**The One Sun Rule.** At most one sun-yellow button per viewport. Every other
action is flag blue, outlined, or a text link.

**The Role-Not-Hex Rule.** Components read theme roles (`bg-canvas`,
`text-fg-soft`, `border-edge`, `text-accent`), never palette primitives, for
anything that must flip in Night or an `inv` band. Primitives are only for
things that never change: the nav, the notice bar, the footer, the featured
tile, and sun accents.

**The Ink-On-Bright Rule.** Text on a `flag-bright` fill is ink, never white
(white is 3.09:1). The `on-accent` role does this for you.

## Typography

**Display Font:** Inter Tight 800, self-hosted Latin subset (fallback `system-ui`)
**Body Font:** the system stack (`system-ui, -apple-system, Segoe UI, Roboto, Noto Sans`)

**Character:** A heavy, condensed display face does all of the shouting. Plain
system text does all of the explaining. The contrast between the two is the
hierarchy, so there are no medium weights in between.

### Hierarchy

- **Display** (800, `clamp(2.75rem, 6.2vw, 5.25rem)`, 0.93, -0.04em): the page `h1`
  only, set in two lines, the second in flag blue.
- **Headline** (800, `clamp(2rem, 4.6vw, 3.75rem)`, 0.98, -0.035em): section
  `h2`s, two-tone, ending with a period.
- **Title** (800, 1.15 to 1.5rem, 1.1, -0.025em): card titles, tile names, list
  headings, the brand wordmark.
- **Number** (800, `clamp(2.2rem, 3.4vw, 2.9rem)`, tabular): census and charter
  figures in stat cards, in the accent color.
- **Body** (400, 1.0625rem, 1.55): running text, capped at about 40rem (`p-sub`)
  or 36rem (hero lede).
- **Lede** (400, `clamp(1.05rem, 1.5vw, 1.3rem)`, 1.55): the one-paragraph
  summary under the `h1`.
- **Label** (700, 0.75 to 0.8125rem, +0.12em, uppercase in the source text):
  card kickers like OFFICIAL SOURCES and CORRECTIONS, and footer column heads.

### Named Rules

**The Tracking Floor Rule.** Display tracking never goes below -0.04em. Inter
Tight is already narrow, and the drafts' -0.055em closed up word spaces once
the real font loaded.

**The Two-Tone Rule.** A headline's second half (`<span class="hi">`) takes the
accent color. One split per headline, and never mid-word.

**The Display-Only Font Rule.** Inter Tight is for `h1` to `h3`, wordmarks,
titles, and big numbers. Paragraphs, labels, form fields, and the printed sheet
body stay on the system stack (ADR 0013).

## Layout

- **Container:** `max-width: 90rem` (`max-w-wrap`), side padding
  `clamp(1rem, 5vw, 5.375rem)` (`px-gutter`). That is a 16px gutter on phones.
- **Sections:** each band has vertical padding `clamp(3.5rem, 7vw, 5.5rem)`
  (`py-section`) and a section head (two-tone `h2`, optional `p-sub`, an
  optional right-aligned "more" link) with about 2.5rem below it.
- **Band rhythm:** paper → wash → paper → ink (`inv`) → paper → wash … The hero
  sits on paper with a faint 80px flag-blue grid.
- **Grids:** mobile first, a single column, then 2 columns from about 40rem and
  3 to 4 columns from about 66 to 72rem. Two-panel splits (hero, feature,
  sources, offices) go side by side at about 58 to 62rem, weighted 1.1 : 0.9 or
  0.8 : 1.2. Grid gaps are 1rem, or 1.25rem on wide screens.
- **Breakpoints:** use Tailwind's defaults (`sm` 40rem, `md` 48rem, `lg` 64rem,
  `xl` 80rem). Don't add one-off widths.
- **Density:** cards have about 1.5rem of padding; list rows have 0.75 to 1rem of
  vertical padding with a 1px rule. Leave more space above a heading than
  below it.

## Elevation & Depth

Mostly flat. Layering comes from tone (paper on wash, raised ink on ink) and 1px
borders. A single soft, offset shadow (`shadow-lift`) marks the two framed
cards (search and official sources) and appears on hover for tiles. The
printable-sheet illustration is the only object allowed a deeper shadow and a
slight rotation, because it is drawn as a real piece of paper.

### Shadow Vocabulary

- **Lift** (`0 18px 40px -26px rgb(0 34 110 / 0.35)`; in Night, `0 18px 40px -20px rgb(0 0 0 / 0.7)`):
  framed cards at rest, tiles on hover.
- **Paper** (`0 30px 60px -30px rgb(0 0 0 / 0.5)`): the service-sheet
  illustration only.

### Named Rules

**The Hover-Lifts Rule.** A card you can click is flat at rest. On hover its
border turns accent, it rises 3px, and it gains Lift, over 200ms with
`ease-lift`. Cards you can't click never move.

## Shapes

Square everywhere: 0px radius on buttons, inputs, cards, chips, icon wells, and
menus (Tailwind's `rounded-*` utilities are switched off). Framed cards carry a
6px top rule (`border-top: 6px solid var(--frame)`), flag blue on light and sun
in Night or on ink. Timeline markers are small squares, not dots. The flag sun
(a disc with eight triple-beam rays) is the one curved form. It appears as the
logo mark and as large, low-opacity background art, at 6% on paper or 10 to 20%
on blue.

## Components

### Buttons

- **Shape:** square (0px), at least 3.25rem tall (2.5rem for `compact`), 1.5rem
  side padding, 700 weight, with an optional trailing 1rem icon that nudges
  (2px, -2px) on hover.
- **Sun:** the one primary action per view ("Browse services", "Volunteer with
  us"). Sun background, ink text.
- **Flag:** every other filled action ("See a sample sheet", "Read the
  Charter").
- **Line:** 1px ink outline that fills with ink on hover. On ink or Night it is a
  white outline.
- **Ghost:** white outline on the blue nav only.
- **Focus:** a 3px `flag-bright` outline with a 3px offset on everything.
  Transitions run 160ms ease-out on color only.

### Chips

- **Style:** mist background, deep-flag text, 600 weight, 0.875rem, square. Used
  for "Popular:" search shortcuts.
- **Hover:** fills with the accent, and the text becomes `on-accent`.

### Cards / Containers

- **Corner Style:** square.
- **Background:** `surface`, on a `canvas` or `canvas-alt` band.
- **Border:** 1px `edge`. Framed cards add the 6px `frame` top rule.
- **Internal Padding:** about 1.5rem (`clamp(1.4rem, 3vw, 2.25rem)` on the search
  card).
- **Variants:** the *tile* (icon well, title, one-line description,
  right-aligned count; the last tile is the featured flag-blue "All services");
  the *stat card* (icon well, big accent number, bold label, small source line);
  the *help card* (flag-blue icon well, uppercase label, title, text, arrow
  link); the *place panel* (a solid flag-blue panel with sun-art and a ruled
  key-figure list).

### Inputs / Fields

- **Style:** wash fill, 1px `edge` border, square, 1.05rem text, 0.9rem by 1rem
  padding. Placeholder is `#6b6b66` on light and `#9a9a94` on dark (both at or
  above 4.5:1).
- **Focus:** a 3px accent outline with no offset, and the border goes
  transparent.
- **Search submit:** a 3.4rem-wide square block with an arrow icon, flag blue on
  light and sun on dark.

### Navigation

- **Notice bar (every page):** an ink strip, 0.8125rem stone text,
  "**Unofficial.**" in sun, and a white "Report a wrong detail" link on the
  right.
- **Nav:** sticky, deep flag blue at 96% opacity with a light blur, 4.25rem tall.
  The sun mark and Inter Tight wordmark sit on the left, with a sun-colored
  "Palo, Leyte" subtitle from 40rem up. 600-weight links at 82% white, full
  white on hover. On the right: an EN/FIL segmented switch (current language
  filled white) and a sun "Find a service" button that shrinks to its icon
  under 30rem. Below 66rem the links fold into a `<details>` menu with no
  JavaScript.
- **Infobar:** a thin flag-blue strip under the nav that shows the source
  edition, service and office counts, and languages, with sun icons.
- **Footer:** an ink background. On the left, the brand, a bright-blue tagline,
  the disclaimer, and the report link. Then two link columns: Guide and Official
  sources. A bottom bar reads "Community-built · Open source / Not an official
  government website / Part of the BetterGov.ph community".

### Directory list

Ruled rows (1px `edge` bottom border) with a small 800-weight accent count in
tabular numerals, then the office name. One column on phones, two from 44rem.
On hover the name takes the accent color and is underlined.

### Printable service sheet

The signature object. On screen it is drawn as a sheet of paper, rotated -2.5°
over a flag-blue backing square rotated 3°, with a sun "Printable" tag. In print
it is the real thing: ink on white, the four questions (Where to go / What to
bring / How much / How long) as uppercase flag-blue labels with icons, and the
Charter page reference and "Page 1 of 1" at the foot. Print always uses the
light palette.

### Icons

Stroke icons on a 24px grid with a 2px stroke and square caps, to match the
square buttons. They are inline SVG in `currentColor`. Sizes are 1rem inline,
1.25 to 1.5rem in icon wells.

## Do's and Don'ts

### Do

- **Do** cite the source under every figure (the stat card's `src` line, the
  sheet's footer). The design treats a citation as content, not a footnote.
- **Do** end two-tone headlines with a period, and keep them short enough to
  balance on two lines on a phone.
- **Do** use the theme roles and the `inv` class so a section works in light,
  Night, and inverted bands without new CSS.
- **Do** use tabular numerals for counts, fees, page numbers, and census
  figures.
- **Do** check every new pairing at or above 4.5:1 for body text (3:1 for
  large text), in both themes.
- **Do** keep the notice bar and the "Report a wrong detail" link on every
  page.

### Don't

- **Don't** round corners, use pill buttons, or add gradients to text.
- **Don't** put white text on `flag-bright`, or gray text on a blue panel (use
  `sky-ink`).
- **Don't** use more than one sun-yellow button in a viewport.
- **Don't** track display type tighter than -0.04em.
- **Don't** add photos, stock illustrations, office ratings, or badges. The flag
  sun is the only ornament.
- **Don't** add hard offset "brutalist" shadows, glass panels, or colored
  side-stripe borders on cards.
- **Don't** reuse the hero's "Unofficial service guide · Palo, Leyte" line as a
  generic eyebrow above other headings. It exists to carry the unofficial
  status, not as decoration.
- **Don't** load another font weight or family without a new ADR (see ADR 0013).
