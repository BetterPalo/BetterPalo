import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { lgu } from '../../src/config/lgu';
import { t, tFor, uiKeys, type Key, type Lang } from '../../src/i18n/ui';
import { cityConfig } from '../fixtures/lgu-city';
import { municipalityConfig } from '../fixtures/lgu-municipality';

const langs = ['en', 'fil'] as const;
const configs = { municipality: municipalityConfig, city: cityConfig, live: lgu };

describe('ui.ts names no LGU', () => {
  const source = readFileSync('src/i18n/ui.ts', 'utf8');

  it('does not name Palo', () => {
    expect(source).not.toMatch(/palo/i);
  });

  it('does not name Leyte', () => {
    expect(source).not.toMatch(/leyte/i);
  });
});

describe('every filled string is complete', () => {
  for (const [label, config] of Object.entries(configs)) {
    for (const lang of langs) {
      it(`has no unfilled placeholder for ${label} (${lang})`, () => {
        for (const key of uiKeys) {
          const text = tFor(config, lang, key);
          expect(text, `${key} (${lang}, ${label}): "{"`).not.toContain('{');
          expect(text, `${key} (${lang}, ${label}): "}"`).not.toContain('}');
          expect(text, `${key} (${lang}, ${label}): "undefined"`).not.toContain('undefined');
        }
      });
    }
  }
});

describe('a municipality', () => {
  const m = municipalityConfig;

  it('uses the municipal words in English and Filipino', () => {
    expect(tFor(m, 'en', 'offices.lead')).toBe(
      'Where to go for the services of the Municipality of Halimbawa.',
    );
    expect(tFor(m, 'fil', 'offices.lead')).toBe(
      'Saan pupunta para sa mga serbisyo ng Bayan ng Halimbawa.',
    );
    expect(tFor(m, 'fil', 'notice.body')).toBe(
      'Pinapatakbo ng komunidad, hindi kaugnay ng pamahalaang bayan ng Halimbawa.',
    );
    expect(tFor(m, 'fil', 'home.offices.body')).toBe(
      "Nakalista ayon sa opisina ang mga serbisyo ng munisipyo sa Citizen's Charter.",
    );
  });
});

describe('a city', () => {
  const c = cityConfig;

  it('uses the city words in English and Filipino', () => {
    expect(tFor(c, 'en', 'offices.lead')).toBe(
      'Where to go for the services of the City of Sample.',
    );
    expect(tFor(c, 'fil', 'offices.lead')).toBe(
      'Saan pupunta para sa mga serbisyo ng Lungsod ng Sample.',
    );
    expect(tFor(c, 'en', 'footer.about')).toContain('City of Sample');
    expect(tFor(c, 'en', 'footer.about')).toContain(
      "Sample City Citizen's Charter 2025 (1st Edition)",
    );
    expect(tFor(c, 'fil', 'footer.about')).toContain('Lungsod ng Sample');
    expect(tFor(c, 'en', 'resources.r3.name')).toBe('Sangguniang Panlungsod of Sample');
    expect(tFor(c, 'en', 'resources.notHandledTitle')).toBe('Not handled by the city');
    expect(tFor(c, 'fil', 'resources.notHandledTitle')).toBe('Hindi sakop ng pamahalaang lungsod');
    expect(tFor(c, 'en', 'home.sheet.where.val')).toBe('City Treasurer');
    expect(tFor(c, 'en', 'about.barangaysTitle')).toBe('The 10 barangays');
  });

  it('never says Palo', () => {
    for (const lang of langs) {
      for (const key of uiKeys) {
        expect(tFor(c, lang, key), `${key} (${lang})`).not.toMatch(/palo/i);
      }
    }
  });
});

describe('the live config', () => {
  it('fills the brand and the place name', () => {
    expect(t('en', 'site.name')).toBe(lgu.brand);
    expect(t('en', 'home.title')).toBe(`Hello, ${lgu.name}`);
  });
});

// Palo's built site must not change. Each row is a key whose text changed when the
// placeholders were added; the value is the old literal from git HEAD's src/i18n/ui.ts.
// Only Palo's config has these words, so the block is skipped in a copy for another LGU.
const before: Array<[Lang, Key, string]> = [
  ['en', 'site.name', 'BetterPalo'],
  ['en', 'site.place', 'Palo, Leyte'],
  ['en', 'notice.body', 'Community-run, not affiliated with the Palo local government.'],
  ['en', 'nav.about', 'About Palo'],
  ['en', 'footer.tag', 'Unofficial service guide · Palo, Leyte'],
  [
    'en',
    'footer.about',
    "A community-run guide to the public services of the Municipality of Palo. Every guide is cited to the Palo Citizen's Charter 2026 (2nd Edition). It complements official channels; it does not replace them.",
  ],
  ['en', 'footer.official.charter', "Citizen's Charter 2026 (PDF)"],
  ['en', 'footer.official.lgu', 'Palo LGU website'],
  ['en', 'sitemap.lead', 'Every page on BetterPalo, grouped by area.'],
  [
    'en',
    'site.banner',
    'Unofficial. BetterPalo is community-run and not affiliated with the Palo local government. Check official sources.',
  ],
  ['en', 'home.title', 'Hello, Palo'],
  [
    'en',
    'home.lead',
    'Where to go, what to bring, how much, and how long, for public services in Palo.',
  ],
  ['en', 'home.eyebrow', 'Unofficial service guide · Palo, Leyte'],
  ['en', 'home.hero.line2', 'BetterPalo.'],
  ['en', 'home.find.note', "Every answer comes from the Palo Citizen's Charter 2026, 2nd Edition."],
  ['en', 'home.sheet.where.val', 'Municipal Treasurer'],
  ['en', 'home.glance.a', 'Palo'],
  ['en', 'home.glance.barangays.src', 'Full list on About Palo'],
  ['en', 'home.glance.src.charter', "Citizen's Charter, 2nd Edition"],
  ['en', 'home.offices.body', "Municipal services are listed by office in the Citizen's Charter."],
  ['en', 'home.offices.population', 'Population (2024)'],
  [
    'en',
    'home.step.1.body',
    "Each service starts from its page in the Palo Citizen's Charter 2026.",
  ],
  [
    'en',
    'home.sources.sub',
    'BetterPalo complements official channels; it does not replace them. These are the documents and sites behind every guide.',
  ],
  ['en', 'home.sources.check.charter', "Palo Citizen's Charter 2026, 2nd Edition"],
  ['en', 'home.sources.check.census', 'PSA 2024 Census, reference date July 1, 2024'],
  ['en', 'home.help.build.title', 'Help build BetterPalo'],
  ['en', 'home.help.lgu.title', 'Palo LGU'],
  ['en', 'home.cta.a', 'Know Palo?'],
  ['en', 'notFound.searchLabel', 'Search BetterPalo'],
  [
    'en',
    'howItWorks.lead',
    'Every guide on BetterPalo follows the same four steps, so you can trust what you read.',
  ],
  [
    'en',
    'howItWorks.step.1.body',
    "Each service starts from its page in the Palo Citizen's Charter 2026.",
  ],
  [
    'en',
    'contribute.lead',
    'BetterPalo is community-built. You do not need to write code to contribute.',
  ],
  [
    'en',
    'accessibility.lead',
    'BetterPalo aims to be usable by everyone, on any device, on a slow connection.',
  ],
  ['en', 'resources.lead', 'The documents and sites behind every guide on BetterPalo.'],
  [
    'en',
    'resources.officialBody',
    'These are the sources we cite. BetterPalo complements them; it does not replace them.',
  ],
  ['en', 'resources.r1.name', 'Palo LGU website'],
  ['en', 'resources.r2.name', "Citizen's Charter 2026 (PDF)"],
  ['en', 'resources.r3.name', 'Sangguniang Bayan of Palo'],
  ['en', 'resources.notHandledTitle', 'Not handled by the municipality'],
  ['en', 'about.title', 'About Palo'],
  ['en', 'about.lead', 'Palo, Leyte: facts from the official sources, not guesses.'],
  ['en', 'about.factsTitle', 'Palo at a glance'],
  ['en', 'about.stat.pop.src', 'PSA 2024 Census'],
  ['en', 'about.stat.brgy.src', 'Full list on About Palo'],
  ['en', 'about.stat.services.src', "Citizen's Charter, 2nd Edition"],
  ['en', 'about.stat.offices.src', "Citizen's Charter, 2nd Edition"],
  ['en', 'about.barangaysTitle', 'The 33 barangays'],
  [
    'en',
    'about.barangaysBody',
    'The full list of the 33 barangays is being transcribed from the official source.',
  ],
  ['en', 'about.sources.li1', 'PSA 2024 Census, reference date July 1, 2024'],
  ['en', 'about.sources.li2', "Palo Citizen's Charter 2026, 2nd Edition"],
  ['en', 'offices.lead', 'Where to go for the services of the Municipality of Palo.'],
  ['en', 'offices.place', 'Palo, Leyte'],
  ['en', 'offices.placeSub', 'Municipal services are listed by office in the Citizen’s Charter.'],
  ['fil', 'site.place', 'Palo, Leyte'],
  ['fil', 'notice.body', 'Pinapatakbo ng komunidad, hindi kaugnay ng pamahalaang bayan ng Palo.'],
  ['fil', 'nav.about', 'Tungkol sa Palo'],
  ['fil', 'footer.tag', 'Hindi opisyal na gabay sa serbisyo · Palo, Leyte'],
  [
    'fil',
    'footer.about',
    "Gabay ng komunidad sa mga serbisyong pampubliko ng Bayan ng Palo. Bawat gabay ay hango sa Palo Citizen's Charter 2026 (2nd Edition). Kaagapay ito ng mga opisyal na daluyan; hindi nito pinapalitan ang mga iyon.",
  ],
  ['fil', 'footer.official.charter', "Citizen's Charter 2026 (PDF)"],
  ['fil', 'footer.official.lgu', 'Website ng LGU ng Palo'],
  ['fil', 'sitemap.lead', 'Lahat ng pahina ng BetterPalo, nakagrupo ayon sa seksyon.'],
  ['fil', 'sitemap.area.about', 'Tungkol sa Palo'],
  [
    'fil',
    'site.banner',
    'Hindi ito opisyal. Ang BetterPalo ay pinapatakbo ng komunidad at hindi kaugnay ng pamahalaang bayan ng Palo. Tingnan ang mga opisyal na sanggunian.',
  ],
  ['fil', 'home.title', 'Kumusta, Palo'],
  [
    'fil',
    'home.lead',
    'Saan pupunta, ano ang dadalhin, magkano, at gaano katagal, para sa mga serbisyong pampubliko sa Palo.',
  ],
  ['fil', 'home.eyebrow', 'Hindi opisyal na gabay sa serbisyo · Palo, Leyte'],
  ['fil', 'home.hero.line2', 'BetterPalo.'],
  ['fil', 'home.find.note', "Ang bawat sagot ay mula sa Palo Citizen's Charter 2026, 2nd Edition."],
  ['fil', 'home.sheet.where.val', 'Municipal Treasurer'],
  ['fil', 'home.glance.a', 'Palo'],
  ['fil', 'home.glance.barangays.src', 'Buong listahan sa Tungkol sa Palo'],
  ['fil', 'home.glance.src.charter', "Citizen's Charter, 2nd Edition"],
  [
    'fil',
    'home.offices.body',
    "Nakalista ayon sa opisina ang mga serbisyo ng munisipyo sa Citizen's Charter.",
  ],
  ['fil', 'home.offices.population', 'Populasyon (2024)'],
  [
    'fil',
    'home.step.1.body',
    "Nagsisimula ang bawat serbisyo sa pahina nito sa Palo Citizen's Charter 2026.",
  ],
  [
    'fil',
    'home.sources.sub',
    'Kaagapay ng BetterPalo ang mga opisyal na daluyan; hindi nito pinapalitan ang mga iyon. Ito ang mga dokumento at site sa likod ng bawat gabay.',
  ],
  ['fil', 'home.sources.check.charter', "Palo Citizen's Charter 2026, 2nd Edition"],
  ['fil', 'home.sources.check.census', 'PSA 2024 Census, petsa ng sanggunian: Hulyo 1, 2024'],
  ['fil', 'home.help.build.title', 'Tumulong sa pagbuo ng BetterPalo'],
  ['fil', 'home.help.lgu.title', 'LGU ng Palo'],
  ['fil', 'home.cta.a', 'Kilala mo ang Palo?'],
  ['fil', 'notFound.searchLabel', 'Hanapin sa BetterPalo'],
  [
    'fil',
    'howItWorks.lead',
    'Bawat gabay sa BetterPalo ay sumusunod sa parehong apat na hakbang, kaya mapagkakatiwalaan mo ang binabasa mo.',
  ],
  [
    'fil',
    'contribute.lead',
    'Gawa ng komunidad ang BetterPalo. Hindi kailangan ng coding para makibahagi.',
  ],
  [
    'fil',
    'accessibility.lead',
    'Layunin ng BetterPalo na magamit ng lahat, sa anumang device, sa mabagal na koneksyon.',
  ],
  ['fil', 'resources.lead', 'Mga dokumento at site sa likod ng bawat gabay sa BetterPalo.'],
  [
    'fil',
    'resources.officialBody',
    'Ito ang mga sanggunian na tinutukoy namin. Kaagapay ang BetterPalo; hindi nito pinapalitan ang mga ito.',
  ],
  ['fil', 'resources.notHandledTitle', 'Hindi sakop ng pamahalaang bayan'],
  ['fil', 'about.title', 'Tungkol sa Palo'],
  [
    'fil',
    'about.lead',
    'Palo, Leyte: mga katotohanan mula sa opisyal na sanggunian, hindi haka-haka.',
  ],
  ['fil', 'about.factsTitle', 'Palo sa isang tingin'],
  ['fil', 'about.barangaysTitle', 'Ang 33 barangay'],
  [
    'fil',
    'about.barangaysBody',
    'Isinusulat pa ang kumpletong listahan ng 33 barangay mula sa opisyal na sanggunian.',
  ],
  ['fil', 'offices.lead', 'Saan pupunta para sa mga serbisyo ng Bayan ng Palo.'],
  ['fil', 'offices.place', 'Palo, Leyte'],
  [
    'fil',
    'howItWorks.step.1.body',
    "Nagsisimula ang bawat serbisyo sa pahina nito sa Palo Citizen's Charter 2026.",
  ],
  ['fil', 'resources.r1.name', 'Website ng LGU ng Palo'],
  ['fil', 'resources.r2.name', "Citizen's Charter 2026 (PDF)"],
  ['fil', 'resources.r3.name', 'Sangguniang Bayan ng Palo'],
  ['fil', 'about.stat.pop.src', 'PSA 2024 Census'],
  ['fil', 'about.stat.brgy.src', 'Buong listahan sa Tungkol sa Palo'],
  ['fil', 'about.stat.services.src', "Citizen's Charter, 2nd Edition"],
  ['fil', 'about.stat.offices.src', "Citizen's Charter, 2nd Edition"],
  ['fil', 'about.sources.li1', 'PSA 2024 Census, petsa ng sanggunian: Hulyo 1, 2024'],
  ['fil', 'about.sources.li2', "Palo Citizen's Charter 2026, 2nd Edition"],
  [
    'fil',
    'offices.placeSub',
    "Nakalista ayon sa opisina ang mga serbisyo ng bayan sa Citizen's Charter.",
  ],
];

describe.skipIf(lgu.name !== 'Palo')('Palo output is unchanged by the placeholders', () => {
  for (const [lang, key, text] of before) {
    it(`${lang} ${key}`, () => {
      expect(t(lang, key)).toBe(text);
    });
  }
});
