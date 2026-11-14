import type { ServiceData } from './schemas/service';
import type { TourismSpotData } from './schemas/tourism';

/** The verified-only gate (ADR 0006). Only these entries get a page. */
export function isPublishable(service: ServiceData): boolean {
  return (
    service.status === 'verified' &&
    service.source !== null &&
    service.edition !== null &&
    service.last_verified !== null
  );
}

/** True when a tourist spot carries a source and a verification date. */
export function isVerifiedSpot(spot: TourismSpotData): boolean {
  return spot.status === 'verified' && spot.source !== null && spot.last_verified !== null;
}
