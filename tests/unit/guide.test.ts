import { describe, expect, it } from 'vitest';
import {
  firstSourcePage,
  formatDate,
  groupByOffice,
  isSinglePage,
  isoDate,
  sourceHref,
} from '../../src/lib/guide';

describe('guide helpers', () => {
  it('links to the first page of a recorded range', () => {
    expect(sourceHref('https://example.org/c.pdf', '225–227')).toBe(
      'https://example.org/c.pdf#page=225',
    );
  });

  it('links to the source unchanged when no pages are recorded', () => {
    expect(sourceHref('https://example.org/c.pdf', null)).toBe('https://example.org/c.pdf');
  });

  it('replaces an existing page fragment in the source', () => {
    expect(sourceHref('https://example.org/c.pdf#page=3', '10')).toBe(
      'https://example.org/c.pdf#page=10',
    );
  });

  it('reads the first page from a list or a hyphenated range', () => {
    expect(firstSourcePage('7, 9–10')).toBe(7);
    expect(firstSourcePage('225-227')).toBe(225);
  });

  it('tells a single page from a range or a list', () => {
    expect(isSinglePage('225')).toBe(true);
    expect(isSinglePage('225–227')).toBe(false);
    expect(isSinglePage('7, 9')).toBe(false);
  });

  it('groups items by office, A to Z, keeping the input order inside each group', () => {
    const items = [
      { name: 'Zoning', office: 'Zoning Office' },
      { name: 'Permit', office: 'Business Office' },
      { name: 'Renewal', office: 'Business Office' },
      { name: 'Unknown', office: null },
    ];
    expect(groupByOffice(items)).toEqual([
      ['', [items[3]]],
      ['Business Office', [items[1], items[2]]],
      ['Zoning Office', [items[0]]],
    ]);
  });

  it('formats a UTC date in English', () => {
    expect(formatDate(new Date('2026-11-14'), 'en')).toBe('November 14, 2026');
  });

  it('formats a UTC date in Filipino', () => {
    expect(formatDate(new Date('2026-11-14'), 'fil')).toBe('Nobyembre 14, 2026');
  });

  it('writes the date as YYYY-MM-DD for a time element', () => {
    expect(isoDate(new Date('2026-11-14'))).toBe('2026-11-14');
  });
});
