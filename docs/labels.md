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
| `service` | `#2EA44F` | A specific service guide |
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
| `needs-verification` | `#E99695` | A service or fact not yet verified |
| `wontfix` | `#FFFFFF` | GitHub default; keep |
| `duplicate` | `#FFFFFF` | GitHub default; keep |

Priorities are optional. If you want them, add `priority: high` and `priority: low`
and leave medium unlabeled.

## Milestones

| Milestone | Outcome | Rough effort |
| --- | --- | --- |
| **M0: Setup** | Org, repo pushed, branch protection, board, ADR for stack, ADR for content format, "hello Palo" deployed | Days |
| **M1: Sources and pilot** | Citizen's Charter and office directory obtained. Three services published end to end (data, page, verification, print sheet) to prove the pipeline | 2 to 4 weeks |
| **M2: MVP build** | Remaining launch services, offices and officials, barangays, search, EN/FIL, accessibility pass, custom domain | 4 to 8 weeks |
| **M3: Soft launch** | LGU review, a handful of residents testing real tasks, fixes, QR sheets | 2 to 4 weeks |
| **M4: Full charter coverage** | v1.1 scope and a maintenance workflow | Ongoing |
| **M5+: Transparency links, legislation index** | v2 scope | After a scope vote |

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
