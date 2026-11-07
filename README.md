# BetterPalo

A community-run, unofficial portal that makes Palo's government information and public services easier to find, understand, and verify.

> **Status:** M0 Setup. The site scaffold is being built; no service guides are
> published yet.

## What v1 will include

- Service guides (about 10 to 12), each fully verified: where to go, what to
  bring, cost, and processing time.
- Offices and officials: elected officials, departments, what each does, where
  it is, and verified public contacts.
- About Palo and barangays: municipal profile, the 33-barangay list, and PSA
  2024 census figures labeled by census year.
- Official resources: links to the LGU site, the Citizen's Charter, the SB
  site, BPLS (once confirmed), PSA, and COMPASS.
- Site basics: search (Pagefind), About, Accessibility, Contribute, Sitemap, an
  "unofficial" banner, and a "report a wrong detail" link.
- English and Filipino. Anything untranslated is marked `translation-pending`.
- Printable one-page service sheets (PDF or print CSS).

## Not in v1

Legislation, budget, COA and procurement views, project tracking, maps, citizen
reports, user accounts, Waray, a CMS, and barangay official contacts unless
officially published.

## Contact

Email <betterpalogov@gmail.com>. To report a wrong detail on the site, use the
data-correction issue form instead so the fix is tracked in public.

## Disclaimer

BetterPalo is community-run and unofficial. It is not affiliated with or endorsed by the Palo local government. Verify information with official sources. The project provides no warranty.

## Repository map

```text
src/         Astro site: content (service guide YAML), pages, layouts, schemas
public/      static files copied as is (robots.txt, _headers)
tests/       unit tests (Vitest) and end-to-end tests (Playwright)
docs/        charter, team, architecture, licensing, data sources, decisions
.github/     issue forms, pull request template, CI workflows, CODEOWNERS
LICENSES/    CC BY-SA 4.0 and CC0 1.0 legal texts
```

The stack is Astro, TypeScript, Tailwind CSS, and Cloudflare Workers; see
[`docs/architecture.md`](docs/architecture.md). Set-up steps are in
[`CONTRIBUTING.md`](CONTRIBUTING.md#set-up). The team and their roles are in
[`docs/team.md`](docs/team.md).

## Licenses

| Artifact | License |
| --- | --- |
| Code, scripts, configuration, workflows | MIT |
| Site prose, documentation, translations, original images | CC BY-SA 4.0 |
| Structured data | CC0 1.0 |
| Third-party material | Not covered; see the data register |

See [`docs/licensing.md`](docs/licensing.md) for the full map and the mixed-file rule.

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) and the [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md). Data corrections are welcome through the issue forms.

## Data sources

See [`docs/data-sources.md`](docs/data-sources.md) for provenance and privacy rules.

## Decisions

See [`docs/decisions/README.md`](docs/decisions/README.md) for accepted and pending decisions.
