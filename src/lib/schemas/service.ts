import { z } from 'astro/zod';

/** A string the source states, or null when the source doesn't say. */
const stated = z.string().trim().min(1).nullable();
/** Same, for nested fields that may be left out. */
const optionalStated = stated.default(null);
const date = z.coerce.date().nullable();

export const statuses = ['verified', 'needs_confirmation', 'outdated'] as const;

const requirement = z.object({
  document: z.string().trim().min(1),
  copies: z.number().int().positive().nullable().default(null),
  form: z.enum(['original', 'photocopy', 'certified_true_copy']).nullable().default(null),
  where_to_get: optionalStated,
  conditions: optionalStated,
});

const step = z.object({
  step: z.number().int().positive(),
  applicant_action: z.string().trim().min(1),
  office_action: optionalStated,
  // Office or position only. Never a staff member's name (ADR 0007).
  responsible: optionalStated,
  max_time: optionalStated,
});

const fee = z
  .object({
    // Copied as written in the source, not recalculated.
    amount: optionalStated,
    purpose: optionalStated,
    where_to_pay: optionalStated,
    conditions: optionalStated,
    basis: optionalStated,
  })
  .refine((f) => f.amount !== null || f.basis !== null, {
    message: 'A fee needs an amount or a basis (the ordinance or code it comes from).',
  });

const channel = z.object({
  type: z.enum(['online', 'walk-in']),
  url: z.url().nullable().default(null),
  location: optionalStated,
  supports: z.array(z.string().trim().min(1)).nullable().default(null),
  account_required: z.boolean().nullable().default(null),
  last_tested: date.default(null),
});

export const serviceSchema = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase words joined by hyphens.'),
    name: z.string().trim().min(1),
    category: z.string().trim().min(1),
    office: stated,
    classification: z.enum(['simple', 'complex', 'highly_technical']).nullable(),
    transaction_type: stated,
    description: z.string().trim().min(1),
    eligibility: stated,
    requirements: z.array(requirement),
    steps: z.array(step),
    fees: z.array(fee),
    processing_time: stated,
    application_channels: z.array(channel),
    complaint_procedure: stated,
    effective_date: date,
    notes: stated,

    // Provenance (ADR 0006). Names must not change.
    source: z.url().nullable(),
    edition: stated,
    retrieved: date,
    verified_by: stated,
    last_verified: date,
    status: z.enum(statuses),
  })
  .superRefine((s, ctx) => {
    if (s.status !== 'verified') return;
    const required = [
      'source',
      'edition',
      'retrieved',
      'verified_by',
      'last_verified',
      'office',
    ] as const;
    for (const key of required) {
      if (s[key] === null) {
        ctx.addIssue({
          code: 'custom',
          path: [key],
          message: `A verified service must have "${key}". Set status to needs_confirmation until it does.`,
        });
      }
    }
  });

export type ServiceData = z.infer<typeof serviceSchema>;
