export const languages = { en: 'English', fil: 'Filipino' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const en = {
  'site.name': 'BetterPalo',
  'site.skip': 'Skip to content',
  'sitemap.title': 'Sitemap',
  'sitemap.lead': 'Every page on BetterPalo, grouped by area.',
  'sitemap.lang': 'Read this page in:',
  'sitemap.xml': 'Machine-readable sitemap (XML)',
  'sitemap.area.services': 'Services',
  'sitemap.area.offices': 'Offices',
  'sitemap.area.about': 'About',
  'sitemap.area.site': 'Site pages',
  'sitemap.empty': 'No pages in this area yet.',
  'sitemap.pending': 'translation-pending',
  'page.home': 'Home',
  'page.sitemap': 'Sitemap',
  'site.banner':
    'Unofficial. BetterPalo is community-run and not affiliated with the Palo local government. Check official sources.',
  'home.title': 'Hello, Palo',
  'home.lead': 'Where to go, what to bring, how much, and how long, for public services in Palo.',
  'notFound.title': 'Page not found',
  'notFound.body': 'We could not find that page.',
  'notFound.home': 'Go to the home page',
  'missing.stated': 'Not stated in the official source. Ask the office.',
} as const;

type Key = keyof typeof en;

// Draft Filipino. Translation owner (not yet assigned) reviews before M1.
const fil: Partial<Record<Key, string>> = {
  'site.skip': 'Laktawan papunta sa nilalaman',
  'sitemap.title': 'Sitemap',
  'sitemap.lead': 'Lahat ng pahina ng BetterPalo, nakagrupo ayon sa seksyon.',
  'sitemap.lang': 'Basahin ang pahinang ito sa:',
  'sitemap.xml': 'Sitemap para sa makina (XML)',
  'sitemap.area.services': 'Mga serbisyo',
  'sitemap.area.offices': 'Mga opisina',
  'sitemap.area.about': 'Tungkol sa Palo',
  'sitemap.area.site': 'Mga pahina ng site',
  'sitemap.empty': 'Wala pang pahina sa seksyong ito.',
  'sitemap.pending': 'translation-pending',
  'page.home': 'Home',
  'page.sitemap': 'Sitemap',
  'site.banner':
    'Hindi ito opisyal. Ang BetterPalo ay pinapatakbo ng komunidad at hindi kaugnay ng pamahalaang bayan ng Palo. Tingnan ang mga opisyal na sanggunian.',
  'home.title': 'Kumusta, Palo',
  'home.lead':
    'Saan pupunta, ano ang dadalhin, magkano, at gaano katagal, para sa mga serbisyong pampubliko sa Palo.',
  'notFound.title': 'Hindi nakita ang pahina',
  'notFound.body': 'Hindi namin mahanap ang pahinang iyan.',
  'notFound.home': 'Pumunta sa home page',
  'missing.stated': 'Hindi nakasaad sa opisyal na sanggunian. Magtanong sa opisina.',
};

const ui: Record<Lang, Partial<Record<Key, string>>> = { en, fil };

/** Translated string, falling back to English if a key is not translated yet. */
export function t(lang: Lang, key: Key): string {
  return ui[lang][key] ?? en[key];
}

export interface Lookup {
  text: string;
  /** False when `lang` has no string of its own and the English is showing. */
  translated: boolean;
}

/**
 * String for a key that only exists at build time, such as the `page.sitemap`
 * label of a route discovered in `src/lib/routes.ts`. Returns undefined when no
 * language has the key, so callers can fall back to their own English name.
 */
export function lookup(lang: Lang, key: string): Lookup | undefined {
  const fallback = (en as Record<string, string>)[key];
  if (fallback === undefined) return undefined;
  if (lang === 'en') return { text: fallback, translated: true };
  const value = (fil as Record<string, string>)[key];
  return value === undefined
    ? { text: fallback, translated: false }
    : { text: value, translated: true };
}
