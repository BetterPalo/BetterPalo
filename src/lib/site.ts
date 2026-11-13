/**
 * Fixed links for the site chrome (notice, header, footer).
 * Official URLs are the ones recorded in docs/data-sources.md; change both
 * together.
 */
import type { Key } from '../i18n/ui';

export const REPO_URL = 'https://github.com/BetterPalo/BetterPalo';
export const REPORT_URL = `${REPO_URL}/issues/new?template=data-correction.yml`;
export const BETTERGOV_URL = 'https://bettergov.ph';

/** English path of the search page; the Find button shows once it exists. */
export const SEARCH_PATH = '/search/';

export interface NavItem {
  /** English path. The Filipino path is derived with `localizedPath`. */
  path: string;
  key: Key;
}

/** Header and footer navigation. Items whose page does not exist are hidden. */
export const navItems: readonly NavItem[] = [
  { path: '/services/', key: 'nav.services' },
  { path: '/offices/', key: 'nav.offices' },
  { path: '/about/', key: 'nav.about' },
  { path: '/sitemap/', key: 'nav.sitemap' },
];

export interface ExternalLink {
  href: string;
  key: Key;
  /** One line saying what the source is for. */
  noteKey: Key;
}

export const officialLinks: readonly ExternalLink[] = [
  {
    key: 'footer.official.charter',
    noteKey: 'sources.note.charter',
    href: 'http://210.213.142.34/home/homepage_data/pdf_chart/20260512/20260512.pdf',
  },
  {
    key: 'footer.official.lgu',
    noteKey: 'sources.note.lgu',
    href: 'http://210.213.142.34/home/?page=home',
  },
];
