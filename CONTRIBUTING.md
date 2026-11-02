# Contributing to BetterPalo

Thanks for helping. BetterPalo is built by residents, students, researchers, LGU
staff, designers, translators, and developers. You do not need to write code to
contribute.

## Read first

- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Charter](docs/charter.md)
- [Licensing](docs/licensing.md)

## Ways to contribute

- **Data correction.** Fix a wrong office, service, fee, official, or contact.
- **Translation.** Turn English content into Filipino, or the reverse.
- **Design and accessibility.** Improve layout, contrast, keyboard use, and
  screen-reader support.
- **Code.** Build the site once the stack is chosen.
- **Documentation.** Clarify a guide, fix a broken link, or record a decision.

## Data contributions

Every fact needs:

- an official source URL;
- a retrieval date;
- a verification date;
- who verified it.

Use the data-correction issue form if you are not editing files directly.
Publish only contact details the LGU has already published for public offices
and public officials. Do not add signatures, personal emails, home addresses, or
unpublished phone numbers. See [docs/data-sources.md](docs/data-sources.md).

## Translation

- v1 is English and Filipino.
- Do not translate official office names, personal names, or legal terms that
  must stay verbatim.
- Keep links, figures, and dates unchanged.
- If a page is not translated yet, mark it `translation-pending` rather than
  mixing languages silently.
- Translations are content contributions under CC BY-SA 4.0.

## Development

The technology stack is not chosen yet. Do not add framework-specific files,
`package.json`, `src/`, `public/`, or hosting configuration until the tech-stack
decision record is accepted.

When the stack exists:

- Use short-lived branches.
- Write imperative commit subjects, for example `docs: fix barangay contact`.
- Keep pull requests small enough for one review sitting.
- Routine pull requests need one maintainer approval.

## Workflow

- Fork the repo (or branch directly if you are a core member), then branch from
  `main`.
- Name branches `type/short-description`, for example `data/add-barangay-list`.
- One topic per PR, kept small. Open as a draft early if you want feedback.
- Link the issue in the PR and follow the PR template.
- CI must pass and one maintainer approval is required.
- Maintainers squash-merge. Do not merge your own PR if it touches data or
  licensing.
- Do not push directly to `main`.

## Commit messages

Format: `type(scope): short summary` — imperative, lowercase, no period, under
72 characters.

| Type | Use for |
| --- | --- |
| `feat` | New page, feature, or component |
| `fix` | Bug fix or broken link/typo fix |
| `docs` | Documentation only |
| `data` | Adding or updating datasets or content records |
| `content` | Written page content |
| `i18n` | Translations (Filipino, Waray) |
| `style` | Formatting or CSS with no logic change |
| `refactor` | Restructuring with no behavior change |
| `test` | Adding or changing tests |
| `ci` | Workflows and automation |
| `chore` | Config, dependencies, housekeeping |

Optional scopes: `services`, `government`, `legislation`, `transparency`,
`search`, `a11y`, `deps`. Add `!` for breaking changes (`feat!:`), and use
`Closes #12` in the PR body. See `docs/labels.md` for the full tables.

## Review and decisions

Routine pull requests need one maintainer approval. License, charter,
governance, or data-policy changes need two approvals, or unanimous approval of
active maintainers if fewer than two are active. Disputes get a written summary
and a seven-day comment period, then a maintainer vote. Ties keep the status quo.
See [docs/charter.md](docs/charter.md).

## Labels and milestones

Labels are grouped by area, type, and status; milestones track M0–M3. See
[`docs/labels.md`](docs/labels.md) for the full tables, colors, and milestone
descriptions. Labels and milestones are created in GitHub; the definitions live
in `docs/labels.md` so they stay versioned.

## Licensing of contributions

Contributions are inbound = outbound:

- code is MIT;
- content and translations are CC BY-SA 4.0;
- data is CC0 1.0.

By submitting a contribution, you confirm you have the right to license it on
these terms and that you cited your sources. No contributor license agreement is
required. See [docs/licensing.md](docs/licensing.md).

## Using GitHub without a local setup

1. Open the file you want to change on GitHub.
2. Use the pencil icon to edit it.
3. Describe the change in the commit message.
4. Choose "Create a new branch for this commit and start a pull request".
5. Open the pull request and fill in the template.

## Getting help

Open an issue with your question. Do not send private personal information,
passwords, or unpublished documents. For conduct reports, see
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
