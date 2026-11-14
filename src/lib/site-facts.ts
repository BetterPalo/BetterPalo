/**
 * Verified facts shown on the home page. Nothing here is a fee or a processing
 * time: none are verified yet. The values live in `src/config/lgu.ts`; this module
 * re-exports them under the names the components use. Change a number only with its
 * source.
 */
import { lgu } from '../config/lgu';

export type { OfficeFact } from './lgu';

/** The Citizen's Charter in use: title, edition, services, and offices. */
export const charter = lgu.charter;

/** Census figures and the barangay count. */
export const census = lgu.census;

/** External services per office or unit, in the Charter's order of size. */
export const offices = lgu.offices;

/** Charter services handled by the offices with these short keys. */
export function servicesOf(...shorts: string[]): number {
  return offices.filter((o) => shorts.includes(o.short)).reduce((sum, o) => sum + o.services, 0);
}

/** 80291 → "80,291", in both languages. */
export function formatNumber(n: number): string {
  return n.toLocaleString('en-PH');
}
