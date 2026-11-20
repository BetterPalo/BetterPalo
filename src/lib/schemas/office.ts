import { z } from 'astro/zod';
import { checkVerified, provenanceFields } from './provenance';

const stated = z.string().trim().min(1).nullable();

export const officeSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words joined by hyphens.'),
    /** As printed in the Charter's List of Offices (p. 256). */
    name: z.string().trim().min(1),
    /** One line summarising the services the office lists in the Charter; null when the Charter has no section for it. */
    description: stated,
    /**
     * As printed on Charter p. 256. Shown as a tel: link on verified offices; the
     * lead checked the numbers on 2026-11-21.
     */
    phone: stated,
    ...provenanceFields,
  })
  .superRefine(checkVerified);

export type OfficeData = z.infer<typeof officeSchema>;
