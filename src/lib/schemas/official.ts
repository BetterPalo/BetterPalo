import { z } from 'astro/zod';
import { checkVerified, provenanceFields } from './provenance';

/** Order on the offices page. */
export const positions = ['mayor', 'vice-mayor', 'sb-member'] as const;

/** Name and position only. No photos, no party, no votes. */
export const officialSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words joined by hyphens.'),
    name: z.string().trim().min(1),
    position: z.enum(positions),
    term: z.string().trim().min(1).nullable(),
    ...provenanceFields,
  })
  .superRefine(checkVerified);

export type OfficialData = z.infer<typeof officialSchema>;
