import { z } from 'astro/zod';
import { statuses } from './service';

/** A string the source states, or null when the source doesn't say. */
const stated = z.string().trim().min(1).nullable();
const date = z.coerce.date().nullable();

/** Visitor groups, in the order the tourism page filters them. */
export const tourismGroups = ['see', 'eat', 'stay', 'do'] as const;
export type TourismGroup = (typeof tourismGroups)[number];

/**
 * Place types, in taxonomy order. Adding one here also needs a
 * `tourism.cat.<slug>` string in `src/i18n/ui.ts`; a unit test enforces it.
 */
export const tourismCategories = [
  'heritage',
  'church',
  'museum',
  'park',
  'nature',
  'beach',
  'view-deck',
  'cafe',
  'restaurant',
  'market',
  'villa',
  'resort',
  'homestay',
  'inn',
  'festival',
  'tour',
  'adventure',
  'school',
  'salon',
  'computer-shop',
  'bakery',
] as const;
export type TourismCategory = (typeof tourismCategories)[number];

/**
 * The visitor group for each type. A spot takes its group from its first
 * category, so a multi-category spot never appears under two groups.
 */
export const tourismCategoryGroups: Record<TourismCategory, TourismGroup> = {
  heritage: 'see',
  church: 'see',
  museum: 'see',
  park: 'see',
  nature: 'see',
  beach: 'see',
  'view-deck': 'see',
  cafe: 'eat',
  restaurant: 'eat',
  market: 'eat',
  villa: 'stay',
  resort: 'stay',
  homestay: 'stay',
  inn: 'stay',
  festival: 'do',
  tour: 'do',
  adventure: 'do',
  school: 'see',
  salon: 'do',
  'computer-shop': 'do',
  bakery: 'eat',
};

export function tourismGroupOf(category: TourismCategory): TourismGroup {
  return tourismCategoryGroups[category];
}

/**
 * A tourist spot, ported from the Palo Tourism Portal.
 *
 * Provenance follows the service-guide model (ADR 0006). A spot with
 * `status: verified` must carry a source and a verification date; until then
 * the page shows it with an "unverified" badge instead of hiding it, so a
 * community lead never passes for an official fact.
 */
export const tourismSpotSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words joined by hyphens.'),
    name: z.string().trim().min(1),
    /**
     * One or more place types. The first is the card's primary label and sets
     * the spot's visitor group; all of them are listed on the card and used by
     * the filters.
     */
    categories: z.array(z.enum(tourismCategories)).min(1, 'Pick at least one category.'),
    description: z.string().trim().min(1),
    address: stated,
    offer: stated,
    /** Path under `public/`, or null when there is no photo. */
    image: stated,
    image_alt: stated,

    // Provenance (ADR 0006). Names must not change.
    source: z.url().nullable(),
    edition: stated,
    retrieved: date,
    verified_by: stated,
    last_verified: date,
    status: z.enum(statuses),
  })
  .superRefine((spot, ctx) => {
    const unique = new Set(spot.categories);
    if (unique.size !== spot.categories.length) {
      ctx.addIssue({
        code: 'custom',
        path: ['categories'],
        message: 'List each category only once.',
      });
    }

    const groups = new Set(spot.categories.map(tourismGroupOf));
    if (groups.size > 1) {
      ctx.addIssue({
        code: 'custom',
        path: ['categories'],
        message:
          'Pick categories from one group (see, eat, stay, or do). Use the first type for the spot\u2019s main draw and describe any other in the text.',
      });
    }

    if (spot.image !== null && spot.image_alt === null) {
      ctx.addIssue({
        code: 'custom',
        path: ['image_alt'],
        message: 'A spot with an image needs "image_alt".',
      });
    }
    if (spot.status !== 'verified') return;
    const required = ['source', 'retrieved', 'verified_by', 'last_verified'] as const;
    for (const key of required) {
      if (spot[key] === null) {
        ctx.addIssue({
          code: 'custom',
          path: [key],
          message: `A verified spot must have "${key}". Set status to needs_confirmation until it does.`,
        });
      }
    }
  });

export type TourismSpotData = z.infer<typeof tourismSpotSchema>;

type Categorised = Pick<TourismSpotData, 'categories'>;

/** The categories at least one spot uses, in taxonomy order. */
export function categoriesInUse(spots: Categorised[]): TourismCategory[] {
  const used = new Set(spots.flatMap((spot) => spot.categories));
  return tourismCategories.filter((category) => used.has(category));
}

/** The visitor groups at least one spot uses, in filter order. */
export function tourismGroupsInUse(spots: Categorised[]): TourismGroup[] {
  const used = new Set(categoriesInUse(spots).map(tourismGroupOf));
  return tourismGroups.filter((group) => used.has(group));
}
