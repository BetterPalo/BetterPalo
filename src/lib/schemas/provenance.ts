import { z } from 'astro/zod';
import { pageNumbers, pagesRunUpward, statuses } from './service';

const stated = z.string().trim().min(1).nullable();

/** Provenance for the directory records (offices, officials, barangays, resources). Same gate as ADR 0006. */
export const provenanceFields = {
  source: z.url().nullable(),
  /** docs/data-sources.md level, 1 (LGU document) to 6 (community). */
  source_level: z.number().int().min(1).max(6).nullable(),
  /** PDF page numbers as in service guides ("224, 256"). */
  source_pages: z
    .string()
    .trim()
    .regex(pageNumbers, 'Use PDF page numbers like "225" or "225–227".')
    .refine((pages) => !pageNumbers.test(pages) || pagesRunUpward(pages), {
      message:
        'source_pages must be page numbers from 1 up, with each range going upward, for example "225–227".',
    })
    .nullable()
    .default(null),
  retrieved: z.coerce.date().nullable(),
  verified_by: stated,
  last_verified: z.coerce.date().nullable(),
  status: z.enum(statuses),
  notes: stated.default(null),
};

export type Provenance = {
  source: string | null;
  source_level: number | null;
  status: (typeof statuses)[number];
  retrieved: Date | null;
  verified_by: string | null;
  last_verified: Date | null;
};

/** A verified item needs every provenance field and a level 1 to 3 source. */
export function checkVerified(item: Provenance, ctx: z.RefinementCtx): void {
  if (item.status !== 'verified') return;
  const required = ['source', 'source_level', 'retrieved', 'verified_by', 'last_verified'] as const;
  for (const key of required) {
    if (item[key] === null) {
      ctx.addIssue({
        code: 'custom',
        path: [key],
        message: `A verified item must have "${key}". Leave status as needs_confirmation until it does.`,
      });
    }
  }
  if (item.source_level !== null && item.source_level > 3) {
    ctx.addIssue({
      code: 'custom',
      path: ['source_level'],
      message:
        'Levels 4 to 6 are research leads (docs/data-sources.md). Find a level 1 to 3 source before verifying.',
    });
  }
}
