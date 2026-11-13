import { describe, expect, it } from 'vitest';
import {
  alternateOf,
  areaOf,
  fileToRoute,
  filVariantOf,
  humanize,
  labelFor,
  labelKey,
  listEnglishPaths,
  listRoutes,
  localizedPath,
  normalizePath,
  routeExists,
} from '../../src/lib/routes';

describe('fileToRoute', () => {
  it('maps a page file to its URL with a trailing slash', () => {
    expect(fileToRoute('../pages/index.astro')).toBe('/');
    expect(fileToRoute('../pages/sitemap.astro')).toBe('/sitemap/');
    expect(fileToRoute('../pages/fil/index.astro')).toBe('/fil/');
    expect(fileToRoute('../pages/fil/sitemap.astro')).toBe('/fil/sitemap/');
    expect(fileToRoute('../pages/services/index.astro')).toBe('/services/');
  });

  it('keeps dynamic segments so the collection can fill them in', () => {
    expect(fileToRoute('../pages/services/[id].astro')).toBe('/services/[id]/');
  });

  it('never lists the 404 page', () => {
    expect(fileToRoute('../pages/404.astro')).toBeNull();
  });
});

describe('listRoutes', () => {
  it('reads every routable page in the repository', () => {
    expect(listRoutes()).toEqual(
      expect.arrayContaining(['/', '/sitemap/', '/fil/', '/fil/sitemap/', '/services/[id]/']),
    );
    expect(listRoutes()).not.toContain('/404/');
    expect(listRoutes()).toEqual([...listRoutes()].sort());
  });

  it('lists each English page once, never its Filipino file or a template', () => {
    expect(listEnglishPaths()).toEqual(expect.arrayContaining(['/', '/sitemap/']));
    expect(
      listEnglishPaths().every(
        (path) => !path.startsWith('/fil/') && !path.includes('[') && path !== '/404/',
      ),
    ).toBe(true);
  });
});

describe('areaOf', () => {
  it('groups pages by their first URL segment', () => {
    expect(areaOf('/services/cedula/')).toBe('services');
    expect(areaOf('/offices/municipal-treasurer/')).toBe('offices');
    expect(areaOf('/about/palo/')).toBe('about');
    expect(areaOf('/')).toBe('site');
    expect(areaOf('/sitemap/')).toBe('site');
  });
});

describe('filVariantOf', () => {
  it('finds the Filipino page when its file exists', () => {
    expect(filVariantOf('/')).toBe('/fil/');
    expect(filVariantOf('/sitemap/')).toBe('/fil/sitemap/');
  });

  it('matches a collection page against its Filipino template when there is one', () => {
    const hasTemplate = listRoutes().includes('/fil/services/[id]/');
    expect(filVariantOf('/services/cedula/')).toBe(hasTemplate ? '/fil/services/cedula/' : null);
  });

  it('returns null when the page is only published in English', () => {
    expect(filVariantOf('/english-only/')).toBeNull();
  });
});

describe('labelFor', () => {
  it('uses the interface string when the page has one', () => {
    expect(labelKey('/sitemap/')).toBe('page.sitemap');
    expect(labelFor('en', '/')).toEqual({ text: 'Home', pending: false });
    expect(labelFor('fil', '/sitemap/')).toEqual({ text: 'Sitemap', pending: false });
  });

  it('falls back to an English name and marks it pending on a Filipino page', () => {
    expect(humanize('/how-it-works/')).toBe('How It Works');
    expect(labelFor('en', '/how-it-works/')).toEqual({ text: 'How It Works', pending: false });
    expect(labelFor('fil', '/how-it-works/')).toEqual({ text: 'How It Works', pending: true });
  });
});

describe('normalizePath', () => {
  it('adds the trailing slash the build uses', () => {
    expect(normalizePath('/sitemap')).toBe('/sitemap/');
    expect(normalizePath('/sitemap/')).toBe('/sitemap/');
    expect(normalizePath('/')).toBe('/');
    expect(normalizePath('/fil/index.html')).toBe('/fil/');
  });
});

describe('routeExists', () => {
  it('knows the pages in src/pages', () => {
    expect(routeExists('/')).toBe(true);
    expect(routeExists('/sitemap')).toBe(true);
    expect(routeExists('/fil/sitemap/')).toBe(true);
  });

  it('does not treat a dynamic template or a missing page as a page', () => {
    expect(routeExists('/services/a-service-that-does-not-exist/')).toBe(false);
    expect(routeExists('/no-such-page/')).toBe(false);
  });
});

describe('localizedPath', () => {
  it('keeps English paths and finds the Filipino page when there is one', () => {
    expect(localizedPath('en', '/sitemap/')).toBe('/sitemap/');
    expect(localizedPath('fil', '/sitemap/')).toBe('/fil/sitemap/');
    expect(localizedPath('fil', '/no-such-page/')).toBe('/no-such-page/');
  });
});

describe('alternateOf', () => {
  it('maps an English page to its Filipino version', () => {
    expect(alternateOf('en', '/sitemap/')).toEqual({ path: '/fil/sitemap/', exact: true });
    expect(alternateOf('en', '/')).toEqual({ path: '/fil/', exact: true });
  });

  it('falls back to the Filipino home page when there is no translation', () => {
    expect(alternateOf('en', '/404')).toEqual({ path: '/fil/', exact: false });
  });

  it('maps a Filipino page back to English', () => {
    expect(alternateOf('fil', '/fil/sitemap/')).toEqual({ path: '/sitemap/', exact: true });
    expect(alternateOf('fil', '/fil/')).toEqual({ path: '/', exact: true });
  });
});
