import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { serviceSchema } from '../../src/lib/schemas/service';
import { isPublishable } from '../../src/lib/publishing';

const template = parse(readFileSync('src/content/services/_template.yaml', 'utf8'));

// A realistic verified service, transcribed and checked by the second checker.
// Every provenance field is filled, so it is publishable.
const verifiedService = {
  ...template,
  id: 'cedula',
  name: 'Community Tax Certificate (Cedula)',
  category: 'taxation',
  office: 'Office of the Municipal Treasurer',
  classification: 'simple' as const,
  transaction_type: 'Application',
  description: 'A community tax certificate (cedula) issued to residents and businesses.',
  eligibility: 'All residents and businesses in the municipality.',
  requirements: [],
  steps: [],
  fees: [],
  processing_time: '15 minutes',
  application_channels: [],
  complaint_procedure: 'Office of the Municipal Treasurer',
  effective_date: '2026-01-01',
  notes: null,
  source: 'https://example.gov.ph/cedula',
  edition: 'Citizens Charter 2026',
  retrieved: '2026-03-10',
  verified_by: '@STR4T-coder',
  last_verified: '2026-03-15',
  status: 'verified' as const,
};

describe('service schema', () => {
  it('accepts the template as a draft', () => {
    const result = serviceSchema.safeParse(template);
    expect(result.success).toBe(true);
  });

  it('rejects a verified service with no source', () => {
    const result = serviceSchema.safeParse({ ...verifiedService, source: null });
    expect(result.success).toBe(false);
  });

  it('rejects a verified service with no verification date', () => {
    const result = serviceSchema.safeParse({ ...verifiedService, last_verified: null });
    expect(result.success).toBe(false);
  });

  it('accepts a verified service with full provenance', () => {
    const result = serviceSchema.safeParse(verifiedService);
    expect(result.success).toBe(true);
  });

  it('rejects a fee with neither an amount nor a basis', () => {
    const result = serviceSchema.safeParse({
      ...verifiedService,
      fees: [{ amount: null, purpose: null, where_to_pay: null, conditions: null, basis: null }],
    });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed id', () => {
    const result = serviceSchema.safeParse({ ...verifiedService, id: 'Cedula Service' });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed url', () => {
    const result = serviceSchema.safeParse({ ...verifiedService, source: 'not-a-url' });
    expect(result.success).toBe(false);
  });

  it('rejects a malformed channel url', () => {
    const result = serviceSchema.safeParse({
      ...verifiedService,
      application_channels: [{ type: 'online', url: 'not-a-url' }],
    });
    expect(result.success).toBe(false);
  });
});

describe('isPublishable', () => {
  it('returns false for drafts', () => {
    const result = serviceSchema.safeParse(template);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(isPublishable(result.data)).toBe(false);
    }
  });

  it('returns true for a verified service with full provenance', () => {
    const result = serviceSchema.safeParse(verifiedService);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(isPublishable(result.data)).toBe(true);
    }
  });
});
