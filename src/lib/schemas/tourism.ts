import { z } from 'astro/zod';
import { statuses } from './service';

/** A string the source states, or null when the source doesn't say. */
const stated = z.string().trim().min(1).nullable();
const date = z.coerce.date().nullable();

export const tourismCategories = ['historical', 'eco', 'cultural'] as const;
export type TourismCategory = (typeof tourismCategories)[number];

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
    category: z.enum(tourismCategories),
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
