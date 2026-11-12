# 0009: Additions from the November 2026 research review

- Status: Accepted (2026-11-12)
- Date: 2026-11-06

## Context

The November 2026 team review brief and a follow-up check of its sources
confirmed the v1 direction in [ADR 0005](0005-positioning-and-phased-roadmap.md)
and found several gaps:

- Waray is Palo's main language. RA 11032 Section 6 allows a Citizen's Charter
  in English, Filipino, or the local dialect, but the charter defers Waray to
  v2.
- Most Filipinos are online (DataReportal's Digital 2026 report puts internet
  users at about 98 million, 83.8% of the population), and the LGU itself
  announces through Facebook. Residents are likely to find BetterPalo through
  shared links rather than search.
- Residents do not separate municipal services from national ones. Many "where
  do I go" questions are about PSA certificates, the national ID, police or NBI
  clearance, or PhilHealth.
- Palo was devastated by Typhoon Yolanda (Haiyan) in 2013. Emergency contacts
  are the highest-stakes information the site could carry.
- The pilot services were to be chosen by source completeness alone.

Items 1 and 4 below change the charter's roadmap and need two approvals. The
rest fit the current v1 scope.

## Decision

1. **Waray pilot (charter change).** Translate the three M1 pilot service
   guides into Waray, labeled as a pilot. After M1, decide whether Waray moves
   up from v2. Language-specific rules from `CONTRIBUTING.md` apply.
2. **Choose pilot services by demand.** Before picking the three M1 services,
   review recent questions on the LGU's public Facebook page and talk to five to
   ten residents or front-desk staff. Pick from the services that are both asked
   about and present in the current Citizen's Charter.
3. **Baseline usability test.** Run a task test with at least five residents on
   a mid-range phone: find a service, name the office, list what to bring, and
   reach the source document. Repeat after launch.
4. **Emergency and disaster page in v1.1 (charter change).** MDRRMO and
   emergency numbers confirmed by calling the office, and evacuation centers
   only if officially published. Nothing here is published from third-party
   sites.
5. **"Not handled by the municipality" page in v1.** A short list of common
   national services with links to the responsible agency. This sits under
   Official Resources and needs no scope change.
6. **Built for sharing.** Every service page gets a stable short URL, a clear
   link preview (title, office, last-verified date), and a QR code on its print
   sheet that points back to the live page.

## Consequences

- The charter's v1.1 list and the language line change if items 1 and 4 are
  approved.
- The pilot needs a Waray translator and reviewer in addition to Filipino.
- Pilot service selection takes a little longer but is grounded in real
  questions.
- Link previews and QR codes become requirements for the page template.

## Alternatives

- Keep Waray in v2: possible, but it delays testing the language most residents
  speak.
- Publish emergency numbers in v1: rejected. A wrong number is a safety risk,
  and the confirmation process should exist first.
- Leave national services out: rejected. Residents would hit dead ends on the
  questions they ask most.
