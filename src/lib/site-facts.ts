/**
 * Verified facts shown on the home page. Nothing here is a fee or a processing
 * time: none are verified yet. Change a number only with its source.
 */

/**
 * Palo Citizen's Charter 2026, 2nd Edition: 112 external services across 20
 * offices or units. Source: docs/research/citizens-charter-2026-inventory.md.
 */
export const charter = {
  title: "Palo Citizen's Charter 2026",
  edition: '2nd Edition',
  services: 112,
  offices: 20,
} as const;

/** PSA 2024 Census and the barangay count, as recorded in PRODUCT.md. */
export const census = {
  population: 80291,
  source: 'PSA 2024 Census',
  referenceDate: 'July 1, 2024',
  barangays: 33,
} as const;

export interface OfficeFact {
  /** Name as printed in the Charter. */
  name: string;
  /** Short key used to group offices into service tiles. */
  short: string;
  /** External services this office lists in the Charter. */
  services: number;
}

/** External services per office or unit, in the Charter's order of size (sum: 112). */
export const offices: readonly OfficeFact[] = [
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
];

/** Charter services handled by the offices with these short keys. */
export function servicesOf(...shorts: string[]): number {
  return offices.filter((o) => shorts.includes(o.short)).reduce((sum, o) => sum + o.services, 0);
}

/** 80291 → "80,291", in both languages. */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-PH');
}
