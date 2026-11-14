import { describe, expect, it } from 'vitest';
import { lgu } from '../../src/config/lgu';
import { fillPlaceholders, lguSlug, placeholderValues, placeholders } from '../../src/lib/lgu';
import { cityConfig } from '../fixtures/lgu-city';
import { municipalityConfig } from '../fixtures/lgu-municipality';

describe('placeholder words for a municipality', () => {
  it('reads the municipal terms in English and Filipino', () => {
    const en = placeholderValues(municipalityConfig, 'en');
    const fil = placeholderValues(municipalityConfig, 'fil');
    expect(en.lguPhrase).toBe('Municipality of Halimbawa');
    expect(fil.lguPhrase).toBe('Bayan ng Halimbawa');
    expect(en.lguKind).toBe('municipality');
    expect(fil.lguKind).toBe('bayan');
    expect(fil.lguHall).toBe('munisipyo');
    expect(en.lguAdj).toBe('Municipal');
    expect(en.council).toBe('Sangguniang Bayan');
  });
});

describe('placeholder words for a city', () => {
  it('reads the city terms in English and Filipino', () => {
    const en = placeholderValues(cityConfig, 'en');
    const fil = placeholderValues(cityConfig, 'fil');
    expect(en.lguPhrase).toBe('City of Sample');
    expect(fil.lguPhrase).toBe('Lungsod ng Sample');
    expect(en.lguKind).toBe('city');
    expect(fil.lguKind).toBe('lungsod');
    expect(en.lguAdj).toBe('City');
    expect(en.council).toBe('Sangguniang Panlungsod');
    expect(fil.censusDate).toBe('Mayo 1, 2020');
  });
});

describe('placeholder values', () => {
  const configs = { municipality: municipalityConfig, city: cityConfig, live: lgu };

  for (const [label, config] of Object.entries(configs)) {
    for (const lang of ['en', 'fil'] as const) {
      it(`fills every placeholder for ${label} (${lang})`, () => {
        const values = placeholderValues(config, lang);
        for (const name of placeholders) {
          expect(values[name], `${name} for ${label} (${lang})`).toBeTruthy();
        }
      });
    }
  }
});

describe('fillPlaceholders', () => {
  it('fills a named placeholder', () => {
    expect(fillPlaceholders('Hi {place}', { place: 'X' })).toBe('Hi X');
  });

  it('throws on an unknown placeholder name', () => {
    expect(() => fillPlaceholders('Hi {nope}', { place: 'X' })).toThrow(/nope/);
  });

  it('returns text with no braces unchanged', () => {
    expect(fillPlaceholders('No braces here.', {})).toBe('No braces here.');
  });
});

describe('lguSlug', () => {
  it('turns a place name into a stable anchor', () => {
    expect(lguSlug({ name: 'Palo' })).toBe('palo');
    expect(lguSlug({ name: 'San José' })).toBe('san-jose');
  });
});

describe('live config sanity', () => {
  it('has a known LGU type', () => {
    expect(['municipality', 'city']).toContain(lgu.type);
  });

  it('has an https site URL with no trailing slash', () => {
    const url = new URL(lgu.siteUrl);
    expect(url.protocol).toBe('https:');
    expect(lgu.siteUrl.endsWith('/')).toBe(false);
  });
});
