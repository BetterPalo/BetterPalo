import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import type { z } from 'astro/zod';
import { barangaySchema } from './lib/schemas/barangay';
import { officeSchema } from './lib/schemas/office';
import { officialSchema } from './lib/schemas/official';
import { resourceSchema } from './lib/schemas/resource';
import { serviceSchema } from './lib/schemas/service';
import { tourismSpotSchema } from './lib/schemas/tourism';
import { SAMPLE_CONTENT_ENABLED } from './lib/sample-content';

const services = defineCollection({
  // Files starting with "_" (like _template.yaml) are not loaded.
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/content/services' }),
  schema: serviceSchema,
});

const tourism = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/content/tourism' }),
  schema: tourismSpotSchema,
});

// Fictional sample guides (examples/services/), for testing the template only.
// Off by default. When off, the loader clears the store so a guide from an
// earlier sample build can never stay cached into a production build.
const samples = defineCollection({
  loader: SAMPLE_CONTENT_ENABLED
    ? glob({ pattern: '**/[^_]*.yaml', base: './examples/services' })
    : { name: 'samples-off', load: async ({ store }) => store.clear() },
  schema: serviceSchema,
});

// One YAML list per dataset (plan D5). The samples work the same way as `samples`.
function list<S extends z.ZodType>(name: string, schema: S) {
  return defineCollection({ loader: file(`src/content/${name}.yaml`), schema });
}

function sampleList<S extends z.ZodType>(name: string, schema: S) {
  return defineCollection({
    loader: SAMPLE_CONTENT_ENABLED
      ? file(`examples/${name}.yaml`)
      : { name: 'samples-off', load: async ({ store }) => store.clear() },
    schema,
  });
}

export const collections = {
  services,
  tourism,
  samples,
  offices: list('offices', officeSchema),
  officials: list('officials', officialSchema),
  barangays: list('barangays', barangaySchema),
  resources: list('resources', resourceSchema),
  sampleOffices: sampleList('offices', officeSchema),
  sampleOfficials: sampleList('officials', officialSchema),
  sampleBarangays: sampleList('barangays', barangaySchema),
  sampleResources: sampleList('resources', resourceSchema),
};
