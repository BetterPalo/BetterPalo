import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { serviceSchema } from './lib/schemas/service';

const services = defineCollection({
  // Files starting with "_" (like _template.yaml) are not loaded.
  loader: glob({ pattern: '**/[^_]*.yaml', base: './src/content/services' }),
  schema: serviceSchema,
});

export const collections = { services };
