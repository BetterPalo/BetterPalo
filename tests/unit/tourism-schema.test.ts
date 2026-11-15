import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import {
  categoriesInUse,
  tourismCategories,
  tourismCategoryGroups,
  tourismGroups,
  tourismGroupsInUse,
  tourismGroupOf,
  tourismSpotSchema,
  type TourismSpotData,
} from '../../src/lib/schemas/tourism';
import { uiKeys } from '../../src/i18n/ui';

const dir = 'src/content/tourism';
const template = parse(readFileSync(`${dir}/_template.yaml`, 'utf8'));

// A fictional draft for tests only, never copied into src/content/.
const spot = {
  id: 'example-spot',
  name: 'Example Spot',
  categories: ['heritage', 'museum'],
  description: 'A place used only by tests.',
  address: null,
  offer: null,
  image: null,
  image_alt: null,
  source: null,
  edition: null,
  retrieved: null,
  verified_by: null,
  last_verified: null,
  status: 'needs_confirmation',
};

/**
 * The paths of every issue the schema reports, so a test can check it failed
 * for the reason it is about and not because the fixture broke elsewhere.
 */
function issuePaths(input: unknown): PropertyKey[][] {
  const result = tourismSpotSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path);
}

describe('tourism schema', () => {
  it('accepts the template as a draft', () => {
    expect(tourismSpotSchema.safeParse(template).success).toBe(true);
  });

  it('accepts one category', () => {
    expect(tourismSpotSchema.safeParse({ ...spot, categories: ['church'] }).success).toBe(true);
  });

  it('accepts several categories from one group', () => {
    expect(tourismSpotSchema.safeParse(spot).success).toBe(true);
  });

  it('rejects an empty category list', () => {
    expect(issuePaths({ ...spot, categories: [] })).toEqual([['categories']]);
  });

  it('rejects a duplicate category', () => {
    expect(issuePaths({ ...spot, categories: ['church', 'church'] })).toEqual([['categories']]);
  });

  it('rejects categories from two groups', () => {
    expect(issuePaths({ ...spot, categories: ['church', 'cafe'] })).toEqual([['categories']]);
  });

  it('rejects an unknown category', () => {
    expect(issuePaths({ ...spot, categories: ['spaceport'] })).toEqual([['categories', 0]]);
  });

  it('rejects a malformed id', () => {
    expect(issuePaths({ ...spot, id: 'Example Spot' })).toEqual([['id']]);
  });

  it('requires image_alt when a spot has an image', () => {
    expect(issuePaths({ ...spot, image: '/images/example.jpg' })).toEqual([['image_alt']]);
  });

  it('accepts an image with alt text', () => {
    expect(
      tourismSpotSchema.safeParse({
        ...spot,
        image: '/images/example.jpg',
        image_alt: 'A view of the example spot',
      }).success,
    ).toBe(true);
  });

  it('requires provenance before a spot is marked verified', () => {
    const paths = issuePaths({ ...spot, status: 'verified' });
    for (const key of ['source', 'retrieved', 'verified_by', 'last_verified']) {
      expect(paths).toContainEqual([key]);
    }
  });

  it('accepts a verified spot with full provenance', () => {
    const verified = {
      ...spot,
      status: 'verified',
      source: 'https://example.gov.ph/tourism/example-spot',
      retrieved: '2026-03-10',
      verified_by: '@STR4T-coder',
      last_verified: '2026-03-15',
    };
    expect(tourismSpotSchema.safeParse(verified).success).toBe(true);
  });
});

describe('tourism content files', () => {
  const files = readdirSync(dir).filter((name) => name.endsWith('.yaml') && !name.startsWith('_'));

  for (const file of files) {
    it(`accepts ${file}`, () => {
      const data = parse(readFileSync(`${dir}/${file}`, 'utf8'));
      const result = tourismSpotSchema.safeParse(data);
      const issues = result.success ? [] : result.error.issues;
      expect(issues, file).toEqual([]);
    });
  }
});

describe('tourism taxonomy', () => {
  it('gives every category a group', () => {
    for (const category of tourismCategories) {
      expect(tourismGroups, category).toContain(tourismGroupOf(category));
      expect(tourismCategoryGroups[category], category).toBe(tourismGroupOf(category));
    }
  });

  it('gives every category and group an English label', () => {
    const keys = new Set<string>(uiKeys);
    for (const category of tourismCategories) {
      expect(keys.has(`tourism.cat.${category}`), category).toBe(true);
    }
    for (const group of tourismGroups) {
      expect(keys.has(`tourism.group.${group}`), group).toBe(true);
    }
  });

  it('lists the categories a spot uses once each, in taxonomy order', () => {
    const spots: Pick<TourismSpotData, 'categories'>[] = [
      { categories: ['museum', 'heritage'] },
      { categories: ['church', 'heritage'] },
    ];
    expect(categoriesInUse(spots)).toEqual(['heritage', 'church', 'museum']);
  });

  it('lists the groups a spot uses, in filter order', () => {
    const spots: Pick<TourismSpotData, 'categories'>[] = [
      { categories: ['villa'] },
      { categories: ['cafe'] },
      { categories: ['heritage'] },
    ];
    expect(tourismGroupsInUse(spots)).toEqual(['see', 'eat', 'stay']);
  });
});
