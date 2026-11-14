import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { isPublishable } from '../../src/lib/publishing';
import { serviceSchema } from '../../src/lib/schemas/service';
import { SAMPLE_ID, SAMPLE_MARKER } from '../../src/lib/sample-content';

// The fictional sample guides in examples/services/ are for testing the template
// only. They must be valid, marked as samples, and never copied into src/content/.
const sampleFiles = readdirSync('examples/services').filter(
  (file) => file.endsWith('.yaml') && !file.startsWith('_'),
);

const samples = sampleFiles.map((file) => ({
  file,
  data: parse(readFileSync(`examples/services/${file}`, 'utf8')),
}));

describe('sample guides', () => {
  it('has at least one sample guide', () => {
    expect(sampleFiles.length).toBeGreaterThan(0);
  });

  it.each(samples)('$file parses with the service schema', ({ data }) => {
    expect(serviceSchema.safeParse(data).success).toBe(true);
  });

  it.each(samples)(
    '$file has an id that matches its file name and starts with sample-',
    ({ file, data }) => {
      expect(data.id).toBe(file.replace(/\.yaml$/, ''));
      expect(data.id.startsWith('sample-')).toBe(true);
    },
  );

  it('includes the sample id the e2e test opens', () => {
    expect(samples.map((sample) => sample.data.id)).toContain(SAMPLE_ID);
  });

  it.each(samples)('$file is marked in its description and named as fictional', ({ data }) => {
    expect(data.description).toContain(SAMPLE_MARKER);
    expect(data.name).toContain('fictional');
  });

  it('keeps the sample marker out of the real guides', () => {
    for (const file of readdirSync('src/content/services')) {
      const text = readFileSync(`src/content/services/${file}`, 'utf8');
      expect(text, `src/content/services/${file}`).not.toContain(SAMPLE_MARKER);
    }
  });

  // Guards the human step H1 (plan D1) without asserting the file's current state:
  // the lead sets these three fields by hand, and the sample must then pass the
  // schema and the publish gate. The file on disk is never written here.
  it('becomes publishable once the lead fills the three verified fields', () => {
    const data = parse(readFileSync('examples/services/sample-business-permit.yaml', 'utf8'));
    const copy = {
      ...data,
      status: 'verified',
      verified_by: 'Sample reviewer (fictional)',
      last_verified: '2026-11-14',
    };
    const result = serviceSchema.safeParse(copy);
    const issues = JSON.stringify(result.error?.issues ?? [], null, 2);
    expect(result.success, `schema issues: ${issues}`).toBe(true);
    if (!result.success) return;
    const parsedData = result.data;
    expect(isPublishable(parsedData)).toBe(true);
  });
});
