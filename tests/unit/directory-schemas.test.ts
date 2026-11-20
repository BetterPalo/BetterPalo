import { readFileSync } from 'node:fs';
import type { z } from 'astro/zod';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { SAMPLE_MARKER } from '../../src/lib/sample-content';
import { barangaySchema } from '../../src/lib/schemas/barangay';
import { officeSchema } from '../../src/lib/schemas/office';
import { officialSchema } from '../../src/lib/schemas/official';
import { isPublished } from '../../src/lib/publishing';
import { resourceSchema, textIn } from '../../src/lib/schemas/resource';

// Fictional items for tests only. Never copied into src/content/.
const unchecked = {
  source: null,
  source_level: null,
  source_pages: null,
  retrieved: null,
  verified_by: null,
  last_verified: null,
  status: 'needs_confirmation',
  notes: null,
};

const verified = {
  source: 'https://example.gov.ph/directory',
  source_level: 1,
  source_pages: '256',
  retrieved: '2026-01-01',
  verified_by: 'Example Checker',
  last_verified: '2026-01-02',
  status: 'verified',
};

const office = {
  id: 'example-office',
  name: 'Example Office',
  description: null,
  phone: null,
  ...unchecked,
};
const official = {
  id: 'example-mayor',
  name: 'Example Official',
  position: 'mayor',
  term: null,
  ...unchecked,
};
const barangay = {
  id: 'example-barangay',
  name: 'Example Barangay',
  population: null,
  census_year: null,
  ...unchecked,
};
const resource = {
  id: 'example-link',
  group: 'official',
  label: { en: 'Example link', fil: null },
  purpose: { en: 'Example purpose', fil: null },
  agency: null,
  url: 'https://example.gov.ph/',
  featured: false,
  ...unchecked,
};

/** The paths of every issue the schema reports, so a test checks the reason it is about. */
function issuesOf(schema: z.ZodType, input: unknown): PropertyKey[][] {
  const result = schema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path);
}

const cases: [string, z.ZodType, Record<string, unknown>][] = [
  ['office', officeSchema, office],
  ['official', officialSchema, official],
  ['barangay', barangaySchema, barangay],
  ['resource', resourceSchema, resource],
];

describe.each(cases)('%s schema', (_name, schema, base) => {
  it('accepts an unchecked item with no provenance', () => {
    expect(issuesOf(schema, base)).toEqual([]);
  });

  it('refuses verified without verified_by', () => {
    expect(issuesOf(schema, { ...base, ...verified, verified_by: null })).toContainEqual([
      'verified_by',
    ]);
  });

  it('refuses verified from a level 5 source', () => {
    expect(issuesOf(schema, { ...base, ...verified, source_level: 5 })).toContainEqual([
      'source_level',
    ]);
  });

  it('accepts a complete verified item from a level 1 source', () => {
    expect(issuesOf(schema, { ...base, ...verified })).toEqual([]);
  });
});

describe('barangay schema', () => {
  it('refuses a population without its census year', () => {
    expect(issuesOf(barangaySchema, { ...barangay, population: 1234 })).toEqual([['census_year']]);
  });

  it('refuses a census year without a population', () => {
    expect(issuesOf(barangaySchema, { ...barangay, census_year: 2024 })).toEqual([['population']]);
  });

  it('refuses a verified population from a level 3 source', () => {
    const item = { ...barangay, ...verified, source_level: 3, population: 1234, census_year: 2024 };
    expect(issuesOf(barangaySchema, item)).toEqual([['source_level']]);
  });

  it('accepts a verified population from the PSA table (level 2)', () => {
    const item = { ...barangay, ...verified, source_level: 2, population: 1234, census_year: 2024 };
    expect(issuesOf(barangaySchema, item)).toEqual([]);
  });
});

describe('resource schema', () => {
  it('refuses an IBPLS link', () => {
    const url = 'https://bpbc4.ibpls.com/paloleyte/';
    expect(issuesOf(resourceSchema, { ...resource, url })).toEqual([['url']]);
  });

  it('refuses a Facebook link', () => {
    const url = 'https://www.facebook.com/PaloLeyte';
    expect(issuesOf(resourceSchema, { ...resource, url })).toEqual([['url']]);
  });
});

describe('source_pages', () => {
  it('accepts a page list that runs upward', () => {
    expect(issuesOf(officeSchema, { ...office, source_pages: '224, 256' })).toEqual([]);
  });

  it('refuses a range that runs downward', () => {
    expect(issuesOf(officeSchema, { ...office, source_pages: '256–224' })).toEqual([
      ['source_pages'],
    ]);
  });
});

describe('textIn', () => {
  const value = { en: 'Office', fil: 'Opisina' };

  it('gives the English text in English', () => {
    expect(textIn(value, 'en')).toEqual({ text: 'Office', pending: false });
  });

  it('gives the Filipino draft in Filipino when there is one', () => {
    expect(textIn(value, 'fil')).toEqual({ text: 'Opisina', pending: false });
  });

  it('falls back to English, marked pending, when there is no Filipino draft', () => {
    expect(textIn({ en: 'Office', fil: null }, 'fil')).toEqual({ text: 'Office', pending: true });
  });
});

describe('isPublished', () => {
  const published = {
    status: 'verified',
    source: 'https://example.gov.ph/',
    last_verified: new Date('2026-01-02'),
  };

  it('publishes a verified item with a source and a verification date', () => {
    expect(isPublished(published)).toBe(true);
  });

  it('does not publish an item that is not verified', () => {
    expect(isPublished({ ...published, status: 'needs_confirmation' })).toBe(false);
  });

  it('does not publish without a source', () => {
    expect(isPublished({ ...published, source: null })).toBe(false);
  });

  it('does not publish without a verification date', () => {
    expect(isPublished({ ...published, last_verified: null })).toBe(false);
  });
});

describe('sample lists', () => {
  const lists: [string, z.ZodType][] = [
    ['offices', officeSchema],
    ['officials', officialSchema],
    ['barangays', barangaySchema],
    ['resources', resourceSchema],
  ];

  for (const [name, schema] of lists) {
    it(`examples/${name}.yaml: every item is valid and carries the sample marker`, () => {
      const items: unknown[] = parse(readFileSync(`examples/${name}.yaml`, 'utf8'));
      expect(items.length).toBeGreaterThan(0);
      for (const item of items) {
        expect(issuesOf(schema, item)).toEqual([]);
        expect(JSON.stringify(item)).toContain(SAMPLE_MARKER);
      }
    });
  }
});
