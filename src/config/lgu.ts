/**
 * The LGU's identity, facts, and URLs. Owned by the LGU: the template never edits
 * this file, and `pnpm init:lgu` writes it. Change a number only with its source.
 *
 * Sources: the Charter's services and offices are from
 * docs/research/citizens-charter-2026-inventory.md. The census figures are the PSA 2024
 * Census and the barangay count as recorded in PRODUCT.md. Official URLs are the ones
 * recorded in docs/data-sources.md.
 */
import type { LguConfig } from '../lib/lgu';

export const lgu: LguConfig = {
  name: 'Palo',
  type: 'municipality',
  province: 'Leyte',
  brand: 'BetterPalo',
  // TODO(@Zyxavy, @Rurur8): update siteUrl to https://betterpalo.org once the domain
  // is registered.
  siteUrl: 'https://betterpalo.betterpalogov.workers.dev',
  repoUrl: 'https://github.com/BetterPalo/BetterPalo',
  officialSiteUrl: 'http://210.213.142.34/home/?page=home',
  charter: {
    title: "Palo Citizen's Charter 2026",
    edition: '2nd Edition',
    year: 2026,
    url: 'http://210.213.142.34/home/homepage_data/pdf_chart/20260512/20260512.pdf',
    services: 112,
    offices: 20,
  },
  census: {
    population: 80291,
    source: 'PSA 2024 Census',
    year: 2024,
    referenceDate: { en: 'July 1, 2024', fil: 'Hulyo 1, 2024' },
    barangays: 33,
  },
  /** External services per office or unit, in the Charter's order of size (sum: 112). */
  offices: [
    { name: 'Municipal Health Office', short: 'health', services: 15 },
    { name: 'Municipal Civil Registrar', short: 'civil-registry', services: 13 },
    { name: 'Municipal Assessor', short: 'assessor', services: 12 },
    { name: 'Social Welfare and Development', short: 'social-welfare', services: 10 },
    { name: 'Business Permits and Licensing', short: 'business-permits', services: 7 },
    { name: 'Public Market (Economic Enterprise)', short: 'public-market', services: 7 },
    { name: 'Municipal Engineer', short: 'engineering', services: 7 },
    { name: 'Planning and Development', short: 'planning', services: 7 },
    { name: "Mayor's Office (Admin and HR)", short: 'mayors-office', services: 5 },
    { name: 'MDRRMO', short: 'disaster-risk', services: 5 },
    { name: 'Senior Citizens Affairs (OSCA)', short: 'senior-citizens', services: 5 },
    { name: 'Municipal Treasurer', short: 'treasurer', services: 5 },
    { name: 'One Stop Health Shop', short: 'health-shop', services: 4 },
    { name: 'Municipal Agriculturist', short: 'agriculture', services: 3 },
    { name: 'Tourism, Culture, Arts and Media', short: 'tourism', services: 2 },
    { name: 'Public Employment Service', short: 'employment', services: 1 },
    { name: 'Sangguniang Bayan', short: 'sangguniang-bayan', services: 1 },
    { name: 'Municipal Accountant', short: 'accountant', services: 1 },
    { name: 'Municipal Budget Officer', short: 'budget', services: 1 },
    { name: 'Traffic and Security Management', short: 'traffic', services: 1 },
  ],
};
