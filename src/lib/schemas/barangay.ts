import { z } from 'astro/zod';
import { checkVerified, provenanceFields } from './provenance';

/**
 * One status covers the name and the population. Set a population only from the
 * PSA table for that census year.
 */
export const barangaySchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words joined by hyphens.'),
    name: z.string().trim().min(1),
    population: z.number().int().positive().nullable().default(null),
    census_year: z.number().int().min(1900).max(2100).nullable().default(null),
    ...provenanceFields,
  })
  .superRefine((b, ctx) => {
    checkVerified(b, ctx);
    if (b.population !== null && b.census_year === null) {
      ctx.addIssue({
        code: 'custom',
        path: ['census_year'],
        message: 'A population needs its census year.',
      });
    }
    if (b.census_year !== null && b.population === null) {
      ctx.addIssue({
        code: 'custom',
        path: ['population'],
        message: 'A census year needs its population.',
      });
    }
    if (b.status === 'verified' && b.population !== null && b.source_level !== 2) {
      ctx.addIssue({
        code: 'custom',
        path: ['source_level'],
        message: 'Publish a population only from the PSA census table (level 2).',
      });
    }
  });

export type BarangayData = z.infer<typeof barangaySchema>;
