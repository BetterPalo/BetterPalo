import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { serviceSchema } from '../../src/lib/schemas/service';

const template = parse(readFileSync('src/content/services/_template.yaml', 'utf8'));

describe('service schema', () => {
  // One example to copy from. Add the rest as you work on the schema.
  it('accepts the template as a draft', () => {
    const result = serviceSchema.safeParse(template);
    expect(result.success).toBe(true);
  });

  // TODO(@khalmahi): add tests for the cases below. @STR4T-coder can help with
  // realistic verified-service examples.
  // - a verified service with no source or verification date is rejected
  // - a verified service with full provenance is accepted
  // - a fee with neither an amount nor a basis is rejected
  // - a malformed id or url is rejected
  // - isPublishable() (src/lib/publishing.ts) returns false for drafts
});
