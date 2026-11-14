import { describe, expect, it } from 'vitest';
import { charter, formatNumber, offices, servicesOf } from '../../src/lib/site-facts';

describe('site facts', () => {
  it('has one row per Charter office, and the services add up to the Charter total', () => {
    expect(offices).toHaveLength(charter.offices);
    expect(offices.reduce((sum, o) => sum + o.services, 0)).toBe(charter.services);
  });

  it('uses each short key once', () => {
    expect(new Set(offices.map((o) => o.short)).size).toBe(offices.length);
  });

  it('adds up services for one or more offices', () => {
    expect(servicesOf(offices[0]!.short)).toBe(offices[0]!.services);
    expect(servicesOf(offices[0]!.short, offices[1]!.short)).toBe(
      offices[0]!.services + offices[1]!.services,
    );
    expect(servicesOf('no-such-office')).toBe(0);
  });

  it('formats numbers with a thousands separator', () => {
    expect(formatNumber(80291)).toBe('80,291');
  });
});
