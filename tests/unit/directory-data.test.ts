import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse } from 'yaml';
import { lgu } from '../../src/config/lgu';
import { barangaySchema } from '../../src/lib/schemas/barangay';
import { officeSchema } from '../../src/lib/schemas/office';
import { officialSchema } from '../../src/lib/schemas/official';
import { resourceSchema } from '../../src/lib/schemas/resource';

type Row = Record<string, unknown>;

const load = (name: string): Row[] =>
  parse(readFileSync(`src/content/${name}.yaml`, 'utf8')) as Row[];

const offices = load('offices');
const officials = load('officials');
const barangays = load('barangays');
const resources = load('resources');

describe('directory data files', () => {
  it('has the expected number of items', () => {
    expect(offices).toHaveLength(27);
    expect(officials).toHaveLength(10);
    expect(barangays).toHaveLength(lgu.census.barangays);
    expect(resources).toHaveLength(17);
  });

  it('every item passes its schema', () => {
    for (const item of offices)
      expect(officeSchema.safeParse(item).success, `office ${String(item.id)}`).toBe(true);
    for (const item of officials)
      expect(officialSchema.safeParse(item).success, `official ${String(item.id)}`).toBe(true);
    for (const item of barangays)
      expect(barangaySchema.safeParse(item).success, `barangay ${String(item.id)}`).toBe(true);
    for (const item of resources)
      expect(resourceSchema.safeParse(item).success, `resource ${String(item.id)}`).toBe(true);
  });

  it('ids are unique in each file', () => {
    for (const [name, items] of Object.entries({ offices, officials, barangays, resources })) {
      const ids = items.map((item) => item.id);
      expect(new Set(ids).size, name).toBe(ids.length);
    }
  });

  it('barangay names are unique', () => {
    const names = barangays.map((b) => b.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it('no resource URL points to BPLS or Facebook', () => {
    for (const r of resources) {
      expect(String(r.url), String(r.id)).not.toMatch(/ibpls\.com|facebook\.com/);
    }
  });

  it('every verified service names an office in offices.yaml', () => {
    const officeNames = new Set(offices.map((o) => o.name));
    const dir = 'src/content/services';
    const files = readdirSync(dir).filter((f) => f.endsWith('.yaml') && !f.startsWith('_'));
    for (const file of files) {
      const service = parse(readFileSync(join(dir, file), 'utf8')) as Row;
      if (service.status !== 'verified') continue;
      expect(officeNames.has(service.office), file).toBe(true);
    }
  });
});
