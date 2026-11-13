/**
 * The route inventory behind the human-readable sitemap (`/sitemap/`).
 *
 * Nothing here is a hand-written link. The list is read from the page files
 * under `src/pages/`, so a page added by a later pull request appears in the
 * sitemap on the next build and a page that is deleted disappears with it.
 * Service guides are listed from `src/lib/data.ts` in the page itself, because
 * only that module may read content collections.
 *
 * This module stays free of `astro:content` so the unit tests can import it.
 */
import { lookup, type Lang } from '../i18n/ui';

/** The four areas the sitemap groups pages under. */
export type Area = 'services' | 'offices' | 'about' | 'site';

/** A page's label, and whether it still needs translating. */
export interface PageLabel {
  text: string;
  /** English text on a Filipino page: show the `translation-pending` notice. */
  pending: boolean;
}

const PAGES_PREFIX = '../pages/';

/**
 * The URL a page file builds: `src/pages/fil/sitemap.astro` → `/fil/sitemap/`.
 *
 * Dynamic routes keep their `[id]` segment (see {@link filVariantOf}), and the
 * 404 page returns null because it answers for missing URLs instead of being a
 * page anyone links to.
 */
export function fileToRoute(file: string): string | null {
  if (!file.startsWith(PAGES_PREFIX) || !file.endsWith('.astro')) return null;
  const rel = file.slice(PAGES_PREFIX.length, -'.astro'.length);
  // The 404 page answers for missing URLs; it is not a page anyone links to.
  if (rel === '404') return null;
  const dir = rel === 'index' ? '' : rel.endsWith('/index') ? rel.slice(0, -'/index'.length) : rel;
  return dir === '' ? '/' : `/${dir}/`;
}

/** Every URL the build knows about, sorted, including `[id]` templates. */
const routes: string[] = [
  ...new Set(
    Object.keys(import.meta.glob('../pages/**/*.astro'))
      .map(fileToRoute)
      .filter((route): route is string => route !== null),
  ),
].sort();

/** Every page URL, including dynamic `[id]` templates and excluding the 404. */
export function listRoutes(): string[] {
  return [...routes];
}

/**
 * The pages a language's sitemap lists: every English page that anyone can
 * open. The `/fil/` versions are reached through {@link filVariantOf} instead
 * of being listed twice, and `[id]` templates are listed from the content
 * collection that actually builds them.
 */
export function listEnglishPaths(): string[] {
  return routes.filter((route) => !route.includes('[') && !route.startsWith('/fil/'));
}

/**
 * The `/fil/…` counterpart of an English path, when that page file exists.
 *
 * Static pages are an exact match (`/sitemap/` → `/fil/sitemap/`). A page built
 * from a collection matches its template (`/services/cedula/` →
 * `/fil/services/cedula/` only while `src/pages/fil/services/[id].astro` is in
 * the repository).
 */
export function filVariantOf(path: string): string | null {
  const candidate = `/fil${path}`;
  if (routes.includes(candidate)) return candidate;
  for (const template of routes) {
    const open = template.indexOf('[');
    if (open === -1) continue;
    const prefix = template.slice(0, open);
    const suffix = template.slice(template.indexOf(']') + 1);
    if (!candidate.startsWith(prefix) || !candidate.endsWith(suffix)) continue;
    const id = candidate.slice(prefix.length, candidate.length - suffix.length);
    if (id.length > 0 && !id.includes('/')) return candidate;
  }
  return null;
}

/** The area a path belongs to, by its first segment. */
export function areaOf(path: string): Area {
  if (path.startsWith('/services/')) return 'services';
  if (path.startsWith('/offices/')) return 'offices';
  if (path.startsWith('/about/')) return 'about';
  return 'site';
}

/** `/sitemap/` → `page.sitemap`, `/` → `page.home`. */
export function labelKey(path: string): string {
  const slug = path.replace(/^\/(fil\/)?/, '').replace(/\/$/, '');
  return `page.${slug === '' ? 'home' : slug}`;
}

/** English label for a page with no interface string yet: `how-it-works` → `How it works`. */
export function humanize(path: string): string {
  const slug = path.replace(/^\/(fil\/)?/, '').replace(/\/$/, '');
  if (slug === '') return 'Home';
  const last = slug.split('/').pop() ?? slug;
  return last
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * The label for a page in `lang`. A page with no string in `src/i18n/ui.ts`
 * falls back to its English name, which a Filipino page marks as
 * `translation-pending` rather than passing the English off as translated.
 */
export function labelFor(lang: Lang, path: string): PageLabel {
  const found = lookup(lang, labelKey(path));
  if (found) {
    return { text: found.text, pending: lang !== 'en' && !found.translated };
  }
  return { text: humanize(path), pending: lang !== 'en' };
}

/**
 * A URL path in the trailing-slash form the build writes: `/sitemap` →
 * `/sitemap/`, `/fil/index.html` → `/fil/`. Dev and preview servers do not
 * always add the slash, so compare paths only after this.
 */
export function normalizePath(pathname: string): string {
  const path = pathname.replace(/index\.html$/, '').replace(/\.html$/, '/');
  return path.endsWith('/') ? path : `${path}/`;
}

/** True when a page file builds exactly this path (static pages, not `[id]`). */
export function routeExists(path: string): boolean {
  return routes.includes(normalizePath(path));
}

/** Where an English path lives in `lang`: the Filipino page when it exists. */
export function localizedPath(lang: Lang, enPath: string): string {
  if (lang === 'en') return enPath;
  return filVariantOf(enPath) ?? enPath;
}

/** The other language's version of a page, for the header's EN/FIL switch. */
export interface Alternate {
  path: string;
  /** False when the page has no translation and `path` is that language's home. */
  exact: boolean;
}

/**
 * The same page in the other language. An English page without a Filipino
 * version falls back to `/fil/`. Every Filipino page has an English original
 * (they share one page component), so `/fil/x/` always maps to `/x/`.
 */
export function alternateOf(lang: Lang, pathname: string): Alternate {
  const path = normalizePath(pathname);
  if (lang === 'en') {
    const fil = filVariantOf(path);
    return fil ? { path: fil, exact: true } : { path: '/fil/', exact: false };
  }
  if (path.startsWith('/fil/')) return { path: path.slice('/fil'.length), exact: true };
  return { path: '/', exact: false };
}
