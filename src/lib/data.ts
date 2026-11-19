import { getCollection } from 'astro:content';
import { isPublishable, isPublished } from './publishing';
import type { BarangayData } from './schemas/barangay';
import type { OfficeData } from './schemas/office';
import { positions, type OfficialData } from './schemas/official';
import { resourceGroups, type ResourceData } from './schemas/resource';
import type { ServiceData } from './schemas/service';
import type { TourismSpotData } from './schemas/tourism';

export type Service = ServiceData;
export type TourismSpot = TourismSpotData;
export type Office = OfficeData;
export type Official = OfficialData;
export type Barangay = BarangayData;
export type Resource = ResourceData;

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

/** Only verified items; the page says what is still being checked. */
export async function listOffices(): Promise<Office[]> {
  const [real, samples] = await Promise.all([
    getCollection('offices'),
    getCollection('sampleOffices'),
  ]);
  return [...real, ...samples]
    .map((entry) => entry.data)
    .filter(isPublished)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Only verified items; the page says what is still being checked. */
export async function listOfficials(): Promise<Official[]> {
  const [real, samples] = await Promise.all([
    getCollection('officials'),
    getCollection('sampleOfficials'),
  ]);
  return [...real, ...samples]
    .map((entry) => entry.data)
    .filter(isPublished)
    .sort(
      (a, b) =>
        positions.indexOf(a.position) - positions.indexOf(b.position) ||
        a.name.localeCompare(b.name),
    );
}

/** Only verified items; the page says what is still being checked. */
export async function listBarangays(): Promise<Barangay[]> {
  const [real, samples] = await Promise.all([
    getCollection('barangays'),
    getCollection('sampleBarangays'),
  ]);
  return [...real, ...samples]
    .map((entry) => entry.data)
    .filter(isPublished)
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Only verified items; the page says what is still being checked. */
export async function listResources(): Promise<Resource[]> {
  const [real, samples] = await Promise.all([
    getCollection('resources'),
    getCollection('sampleResources'),
  ]);
  return [...real, ...samples]
    .map((entry) => entry.data)
    .filter(isPublished)
    .sort(
      (a, b) =>
        resourceGroups.indexOf(a.group) - resourceGroups.indexOf(b.group) ||
        a.label.en.localeCompare(b.label.en),
    );
}
