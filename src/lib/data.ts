import { getCollection } from 'astro:content';
import { isPublishable } from './publishing';
import type { ServiceData } from './schemas/service';

export type Service = ServiceData;

function checkIds(entries: { id: string; data: { id: string } }[], dir: string): void {
  for (const entry of entries) {
    if (entry.id !== entry.data.id) {
      throw new Error(
        `${dir}/${entry.id}.yaml has id "${entry.data.id}". The file name and id must match.`,
      );
    }
  }
}

/** All published (verified) services, sorted by name. */
export async function listServices(): Promise<Service[]> {
  const [real, samples] = await Promise.all([getCollection('services'), getCollection('samples')]);
  checkIds(real, 'src/content/services');
  checkIds(samples, 'examples/services');
  return [...real, ...samples]
    .map((entry) => entry.data)
    .filter(isPublishable)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function getService(id: string): Promise<Service | undefined> {
  return (await listServices()).find((service) => service.id === id);
}
