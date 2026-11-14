import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { serviceSchema } from './lib/schemas/service';
import { SAMPLE_CONTENT_ENABLED } from './lib/sample-content';

const services = defineCollection({
  // Files starting with "_" (like _template.yaml) are not loaded.
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/content/services' }),
  schema: serviceSchema,
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

export const collections = { services, samples };
