import type { Lang } from '../i18n/ui';

/** "225–227" → 225. The schema guarantees the string starts with digits. */
export function firstSourcePage(pages: string): number {
  const match = pages.trim().match(/^\d+/);
  if (!match) throw new Error(`source_pages "${pages}" does not start with a page number`);
  return Number(match[0]);
}

/** True for one page ("225"), false for a range or a list. Picks "p." or "pp.". */
export function isSinglePage(pages: string): boolean {
  return /^\d+$/.test(pages.trim());
}

/** The source link: the PDF opened at the first page when pages are recorded. */
export function sourceHref(source: string, pages: string | null): string {
  if (pages === null) return source;
  return `${source.split('#')[0]}#page=${firstSourcePage(pages)}`;
}

const locales: Record<Lang, string> = { en: 'en-US', fil: 'fil-PH' };

/** "November 14, 2026" / "Nobyembre 14, 2026". YAML dates are UTC midnight. */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(locales[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(
    date,
  );
}

/** "2026-11-14", for <time datetime>. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
