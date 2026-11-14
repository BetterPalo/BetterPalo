import type { Lang } from '../i18n/ui';

/** Kind of local government. Drives the words in `placeholderValues`. */
export type LguType = 'municipality' | 'city';

export interface OfficeFact {
  /** Name as printed in the Charter. */
  name: string;
  /** Short key used to group offices into service tiles. */
  short: string;
  /** External services this office lists in the Charter. */
  services: number;
}

/** Everything that identifies one LGU. Values live in `src/config/lgu.ts`. */
export interface LguConfig {
  /** Place name only, for example "Palo". */
  name: string;
  type: LguType;
  province: string;
  /** Site brand, for example "BetterPalo". */
  brand: string;
  siteUrl: string;
  repoUrl: string;
  officialSiteUrl: string;
  charter: {
    title: string;
    edition: string;
    year: number;
    url: string;
    services: number;
    offices: number;
  };
  census: {
    population: number;
    source: string;
    year: number;
    referenceDate: Record<Lang, string>;
    barangays: number;
  };
  offices: readonly OfficeFact[];
}

/** Names of the placeholders that `{name}` in `src/i18n/ui.ts` may use. */
export const placeholders = [
  'brand',
  'place',
  'province',
  'lguPhrase',
  'lguKind',
  'lguHall',
  'lguAdj',
  'council',
  'charterTitle',
  'charterEdition',
  'charterYear',
  'censusSource',
  'censusYear',
  'censusDate',
  'barangays',
] as const;
export type Placeholder = (typeof placeholders)[number];

/** Words that depend on the LGU type, per language. */
const terms = {
  municipality: {
    en: { phrase: 'Municipality of', kind: 'municipality', hall: 'municipality' },
    fil: { phrase: 'Bayan ng', kind: 'bayan', hall: 'munisipyo' },
    adj: 'Municipal',
    council: 'Sangguniang Bayan',
  },
  city: {
    en: { phrase: 'City of', kind: 'city', hall: 'city' },
    fil: { phrase: 'Lungsod ng', kind: 'lungsod', hall: 'lungsod' },
    adj: 'City',
    council: 'Sangguniang Panlungsod',
  },
} as const;

/** The value for every placeholder, for one config and one language. */
export function placeholderValues(config: LguConfig, lang: Lang): Record<Placeholder, string> {
  const t = terms[config.type];
  return {
    brand: config.brand,
    place: config.name,
    province: config.province,
    lguPhrase: `${t[lang].phrase} ${config.name}`,
    lguKind: t[lang].kind,
    lguHall: t[lang].hall,
    lguAdj: t.adj,
    council: t.council,
    charterTitle: config.charter.title,
    charterEdition: config.charter.edition,
    charterYear: String(config.charter.year),
    censusSource: config.census.source,
    censusYear: String(config.census.year),
    censusDate: config.census.referenceDate[lang],
    barangays: String(config.census.barangays),
  };
}

/** Fills `{name}` placeholders. Throws on an unknown name so a typo fails the build. */
export function fillPlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (_match, name: string) => {
    const value = values[name];
    if (value === undefined) throw new Error(`Unknown placeholder {${name}} in "${text}"`);
    return value;
  });
}

/**
 * "Palo" -> "palo"; used for stable anchors such as the Glance section id. A name with
 * no Latin letters or digits gives "lgu", so the anchor is never empty.
 */
export function lguSlug(config: Pick<LguConfig, 'name'>): string {
  const slug = config.name
    .normalize('NFD')
    .replace(/[\u0300-\u036F]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return slug === '' ? 'lgu' : slug;
}
