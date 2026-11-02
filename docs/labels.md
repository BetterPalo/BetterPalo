# Labels and milestones

Definitions for the labels and milestones used in BetterPalo. Apply them in
GitHub (UI or `gh`); this file keeps them versioned.

## Labels

### Area

| Label | Color | Description |
| --- | --- | --- |
| `data` | `#0E8A16` | Datasets, sources, provenance |
| `design` | `#D93F0B` | UX, wireframes, visual design |
| `dev` | `#1D76DB` | Code, tooling, infrastructure |
| `content` | `#FBCA04` | Page copy and written information |
| `translation` | `#5319E7` | Filipino, Waray, or other languages |
| `docs` | `#0075CA` | Project documentation |

### Type

| Label | Color | Description |
| --- | --- | --- |
| `bug` | `#D73A4A` | Something is broken or wrong |
| `enhancement` | `#A2EEEF` | New feature or improvement |
| `data-correction` | `#F9D0C4` | Incorrect or outdated information |
| `question` | `#D876E3` | Needs discussion or clarification |

### Status and priority

| Label | Color | Description |
| --- | --- | --- |
| `good first issue` | `#7057FF` | Beginner-friendly |
| `help wanted` | `#008672` | Extra hands needed |
| `blocked` | `#B60205` | Waiting on something else |
| `needs-source` | `#E99695` | Needs a verifiable public source |
| `needs-decision` | `#FEF2C0` | Waiting on a decision (ADR) |
| `wontfix` | `#FFFFFF` | GitHub default; keep |
| `duplicate` | `#FFFFFF` | GitHub default; keep |

Priorities are optional. If you want them, add `priority: high` and `priority: low`
and leave medium unlabeled.

## Milestones

| Milestone | Description |
| --- | --- |
| **M0: Setup** | Org, repo, charter, licensing, CI, board, stack decision (ADR 0003), "hello Palo" deployed |
| **M1: Static MVP launch** | Services, Government, About, Accessibility, Contribute, and Sitemap pages live on the custom domain with Pagefind search |
| **M2: Legislation and transparency** | Ordinances, resolutions, budget, and COA reports, each with provenance |
| **M3: Translations and polish** (optional) | Filipino/Waray, accessibility audit |

## Conventional commits

Format: `type(scope): short summary` — imperative, lowercase, no period, under
72 characters.

| Type | Use for |
| --- | --- |
| `feat` | New page, feature, or component |
| `fix` | Bug fix or broken link/typo fix |
| `docs` | Documentation only (README, charter, ADRs) |
| `data` | Adding or updating datasets or content records |
| `content` | Written page content (services, officials, etc.) |
| `i18n` | Translations (Filipino, Waray) |
| `style` | Formatting or CSS with no logic change |
| `refactor` | Restructuring with no behavior change |
| `test` | Adding or changing tests |
| `ci` | Workflows and automation |
| `chore` | Config, dependencies, housekeeping |

Optional scopes: `services`, `government`, `legislation`, `transparency`, `search`,
`a11y`, `deps`. Add `!` for breaking changes (`feat!:`), and use `Closes #12` in
the PR body.
