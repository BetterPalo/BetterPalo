# Team

Who owns what in BetterPalo, and how work moves between people. This fills in
the roles listed in the [charter](charter.md#roles). Ownership means "first
reviewer and the person who keeps this area healthy", not "the only person
allowed to touch it". Anyone can contribute anywhere.

## Roles

| Role | Person | GitHub | Owns |
| --- | --- | --- | --- |
| Project lead, maintainer, and data and verification | Project lead | `@Zyxary` | Architecture, ADRs, review and merge to `main`, LGU contact, releases; service guide YAML, the source register in `docs/data-sources.md`, test calls, the demand check, letters to the LGU |
| Frontend development | Frontend developer | `@khalmahi` | Astro pages and components, content collections and schemas, Pagefind search, EN/FIL routing |
| Design and accessibility | Designer | `@jaimedesu` | Figma wireframes, design tokens for Tailwind, print sheet with QR code, WCAG 2.1 AA checks, visual identity |
| Infrastructure and DevOps | Infrastructure | `@Rurur8` | Cloudflare (Workers, DNS, analytics), Workers Builds previews, GitHub Actions, Playwright, Lighthouse CI, Renovate |
| Infrastructure, second reviewer, and second checker | Infrastructure | `@STR4T-coder` | Co-owns infrastructure and CI; second approval on charter, licence, governance, and data-policy changes; second check of every transcribed guide |
| Translation and QA | Not yet assigned | TBD | Filipino (and Waray pilot) translation, phone and browser testing. Until assigned, the lead asks the frontend developer or designer for translation review |

Replace `TBD` in the table and in [`.github/CODEOWNERS`](../.github/CODEOWNERS)
when the translation and QA owner is named.

## Merging

- The project lead merges into `main`. Nobody else merges until a backup
  maintainer is named (see [maintainers.md](maintainers.md)).
- The second reviewer, `@STR4T-coder`, gives the second approval on every
  charter, licence, governance, and data-policy change.
- GitHub does not let an author approve their own pull request, so the lead's
  pull requests are approved by `@STR4T-coder` or a frontend or infrastructure
  owner.
- License, charter, governance, and data-policy changes need two approvals under
  the [charter](charter.md#decision-rules).

## Review routing

`CODEOWNERS` requests the area owner automatically. As a rule of thumb:

| Change | First reviewer | Also needed |
| --- | --- | --- |
| Service guide or other data | Second checker (`@STR4T-coder`) | Lead merges |
| Pages, components, schemas | Frontend (`@khalmahi`) | Designer for visual changes |
| Styles and tokens | Designer (`@jaimedesu`) | Frontend |
| Wrangler, workflows, `_headers` | Infrastructure (`@Rurur8`) | Second reviewer; lead merges |
| Translations | Translation and QA owner (TBD) | Frontend or designer until assigned |
| ADRs, charter, licensing | Lead | Second reviewer (`@STR4T-coder`) and one more approval |

## Second checker rule

Every transcribed service guide is checked by a person who did not transcribe
it before its `status` becomes `verified`. The checker reads the official
source page by page against the YAML and records themselves in
`verified_by`. The second reviewer, `@STR4T-coder`, is the default second
checker for the lead's transcriptions. When they are unavailable, the designer
(`@jaimedesu`) checks instead, so the lead never checks their own work.

## Design files

- Figma: link to be added once the file exists. Use view-only links in public
  places.
- Designs are handed off as design tokens (a pull request to
  `src/styles/global.css`) and annotated frames. Developers build from the
  tokens, not from pixel values.

## Accounts and access

| System | Owner | Others |
| --- | --- | --- |
| GitHub organisation | Lead (Owner) | Core team with Write on the repository |
| Cloudflare account (`betterpalolgu@gmail.com`) | Lead (Super Administrator) | `@Rurur8` and `@STR4T-coder` invited as Administrators, each with their own login |
| Domain and DNS | Lead | `@Rurur8` and `@STR4T-coder` |
| Project Gmail | Lead | Not shared. Use invitations instead of the password |
| Figma | Designer (`@jaimedesu`) | Team members as viewers or editors |

Nobody deploys from a laptop. Production deploys come from `main` through
Cloudflare Workers Builds. Secrets never go into the repository; see
[architecture.md](architecture.md#secrets).

## Joining the team

1. Read the [charter](charter.md), [CONTRIBUTING.md](../CONTRIBUTING.md), and
   [architecture.md](architecture.md).
2. Accept the GitHub organisation invitation.
3. Follow the set-up steps in [CONTRIBUTING.md](../CONTRIBUTING.md#set-up).
4. Pick up an issue assigned to you, or one labelled `good first issue`.
