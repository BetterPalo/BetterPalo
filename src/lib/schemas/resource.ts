import { z } from 'astro/zod';
import type { Lang } from '../../i18n/ui';
import { checkVerified, provenanceFields } from './provenance';

export const resourceGroups = ['official', 'other-agency'] as const;

const stated = z.string().trim().min(1).nullable();
/** English is required; the Filipino draft may be missing, and the page then says so. */
const text = z.object({ en: z.string().trim().min(1), fil: stated.default(null) });

/** Hosts the site never links to (docs/data-sources.md). */
const blockedHosts = ['ibpls.com', 'facebook.com'];

export const resourceSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words joined by hyphens.'),
    group: z.enum(resourceGroups),
    label: text,
    purpose: text,
    agency: stated.default(null),
    url: z.url(),
    featured: z.boolean().default(false),
    ...provenanceFields,
  })
  .superRefine((r, ctx) => {
    checkVerified(r, ctx);
    // Refinements also run after a bad url, so only parse a url that is valid.
    if (!URL.canParse(r.url)) return;
    const host = new URL(r.url).hostname;
    if (blockedHosts.some((blocked) => host === blocked || host.endsWith(`.${blocked}`))) {
      ctx.addIssue({
        code: 'custom',
        path: ['url'],
        message: 'BPLS and Facebook links stay off the site (docs/data-sources.md).',
      });
    }
  });

export type ResourceData = z.infer<typeof resourceSchema>;

/** The Filipino draft when the page is in Filipino and one exists; otherwise English, marked pending. */
export function textIn(
  value: { en: string; fil: string | null },
  lang: Lang,
): { text: string; pending: boolean } {
  if (lang === 'fil' && value.fil !== null) return { text: value.fil, pending: false };
  if (lang === 'en') return { text: value.en, pending: false };
  return { text: value.en, pending: true };
}
