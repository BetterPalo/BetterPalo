// Fictional. Tests only. Never copy into src/.
import type { LguConfig } from '../../src/lib/lgu';

export const cityConfig: LguConfig = {
  name: 'Sample',
  type: 'city',
  province: 'Sample Province',
  brand: 'BetterSample',
  siteUrl: 'https://bettersample.example.org',
  repoUrl: 'https://github.com/example/BetterSample',
  officialSiteUrl: 'https://example.org/',
  charter: {
    title: "Sample City Citizen's Charter 2025",
    edition: '1st Edition',
    year: 2025,
    url: 'https://example.org/charter.pdf',
    services: 3,
    offices: 2,
  },
  census: {
    population: 12345,
    source: 'Sample census (fictional)',
    year: 2020,
    referenceDate: { en: 'May 1, 2020', fil: 'Mayo 1, 2020' },
    barangays: 10,
  },
  offices: [
    { name: 'City Civil Registrar', short: 'civil-registry', services: 2 },
    { name: 'City Treasurer', short: 'treasurer', services: 1 },
  ],
};
