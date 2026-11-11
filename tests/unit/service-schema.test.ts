import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { serviceSchema } from '../../src/lib/schemas/service';
import { isPublishable } from '../../src/lib/publishing';

const template = parse(readFileSync('src/content/services/_template.yaml', 'utf8'));

// A fictional verified service for tests only. It is not transcribed from a real
// Citizen's Charter (the source URL is a placeholder), so never copy it into
// src/content/. Every provenance field is filled, so it is publishable.
const verifiedService = {
  id: 'cedula',
  name: 'Community Tax Certificate (Cedula)',
  category: 'taxation',
  office: 'Office of the Municipal Treasurer',
  classification: 'simple',
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
  status: 'verified',
};

/**
 * The paths of every issue the schema reports, so a test can check it failed
 * for the reason it is about and not because the fixture broke elsewhere.
 */
function issuePaths(input: unknown): PropertyKey[][] {
  const result = serviceSchema.safeParse(input);
  return result.success ? [] : result.error.issues.map((issue) => issue.path);
}

describe('service schema', () => {
  it('accepts the template as a draft', () => {
    expect(serviceSchema.safeParse(template).success).toBe(true);
  });

  it('accepts a verified service with full provenance', () => {
    expect(serviceSchema.safeParse(verifiedService).success).toBe(true);
  });

  // Every field the schema requires before a service may be marked verified.
  it.each(['source', 'edition', 'retrieved', 'verified_by', 'last_verified', 'office'])(
    'rejects a verified service with no %s',
    (key) => {
      expect(issuePaths({ ...verifiedService, [key]: null })).toEqual([[key]]);
    },
  );

  it('accepts missing provenance while the service needs confirmation', () => {
    const draft = { ...verifiedService, source: null, last_verified: null };
    expect(serviceSchema.safeParse({ ...draft, status: 'needs_confirmation' }).success).toBe(true);
  });

  it('rejects a fee with neither an amount nor a basis', () => {
    const fees = [{ amount: null, purpose: 'Certification fee', basis: null }];
    expect(issuePaths({ ...verifiedService, fees })).toEqual([['fees', 0]]);
  });

  it('accepts a fee with only a basis', () => {
    const fees = [{ amount: null, basis: 'Local Government Code, Section 157' }];
    expect(serviceSchema.safeParse({ ...verifiedService, fees }).success).toBe(true);
  });

  it('rejects a malformed id', () => {
    expect(issuePaths({ ...verifiedService, id: 'Cedula Service' })).toEqual([['id']]);
  });

  it('rejects a malformed source url', () => {
    expect(issuePaths({ ...verifiedService, source: 'not-a-url' })).toEqual([['source']]);
  });

  it('rejects a malformed channel url', () => {
    const application_channels = [{ type: 'online', url: 'not-a-url' }];
    expect(issuePaths({ ...verifiedService, application_channels })).toEqual([
      ['application_channels', 0, 'url'],
    ]);
  });
});

describe('isPublishable', () => {
  it('returns false for drafts', () => {
    expect(isPublishable(serviceSchema.parse(template))).toBe(false);
  });

  it('returns false for an outdated service, even with full provenance', () => {
    const outdated = serviceSchema.parse({ ...verifiedService, status: 'outdated' });
    expect(isPublishable(outdated)).toBe(false);
  });

  it('returns true for a verified service with full provenance', () => {
    expect(isPublishable(serviceSchema.parse(verifiedService))).toBe(true);
  });
});
