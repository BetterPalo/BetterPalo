import { getCollection } from 'astro:content';
import { isPublishable } from './publishing';
import type { ServiceData } from './schemas/service';
import type { TourismSpotData } from './schemas/tourism';

export type Service = ServiceData;
export type TourismSpot = TourismSpotData;

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

/**
 * Every tourist spot, verified or not, sorted by name. The tourism page shows
 * unverified entries with a badge rather than dropping a community lead.
 */
export async function listSpots(): Promise<TourismSpot[]> {
  const entries = await getCollection('tourism');
  checkIds(entries, 'src/content/tourism');
  return entries.map((entry) => entry.data).sort((a, b) => a.name.localeCompare(b.name));
}
