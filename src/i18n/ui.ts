export const languages = { en: 'English', fil: 'Filipino' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

const en = {
  'site.name': 'BetterPalo',
  'site.skip': 'Skip to content',
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
