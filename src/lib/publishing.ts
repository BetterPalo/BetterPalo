import type { ServiceData } from './schemas/service';

/** The verified-only gate (ADR 0006). Only these entries get a page. */
export function isPublishable(service: ServiceData): boolean {
  return (
    service.status === 'verified' &&
    service.source !== null &&
    service.edition !== null &&
    service.last_verified !== null
  );
}
