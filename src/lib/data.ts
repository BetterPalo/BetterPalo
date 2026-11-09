import { getCollection } from 'astro:content';
import { isPublishable } from './publishing';
import type { ServiceData } from './schemas/service';

export type Service = ServiceData;

/** All published (verified) services, sorted by name. */
export async function listServices(): Promise<Service[]> {
  const entries = await getCollection('services');
  for (const entry of entries) {
    if (entry.id !== entry.data.id) {
      throw new Error(
        `src/content/services/${entry.id}.yaml has id "${entry.data.id}". The file name and id must match.`,
      );
    }
  }
  return entries
    .map((entry) => entry.data)
    .filter(isPublishable)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getService(id: string): Promise<Service | undefined> {
  return (await listServices()).find((service) => service.id === id);
}
