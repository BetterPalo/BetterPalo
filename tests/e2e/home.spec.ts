import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { lgu } from '../../src/config/lgu';
import { formatNumber } from '../../src/lib/site-facts';

// The White Portal home page, in English and Filipino.
// Names and figures come from src/config/lgu.ts, so this spec works for any LGU.

test('home page has one heading and every section', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(`${lgu.brand}.`);

  for (const name of [
    'Find a service',
    'One errand, one printed page.',
    'Popular services.',
    `${lgu.name} at a glance.`,
    'Offices and where to go.',
    'How a guide gets made.',
    'Check it against the official source.',
    'Get in touch, or pitch in.',
    `Know ${lgu.name}? Help write its guides.`,
  ]) {
    await expect(page.getByRole('heading', { level: 2, name })).toBeVisible();
  }
});

test('the facts come from the Charter and the census', async ({ page }) => {
  await page.goto('/');
  const glance = page.getByRole('region', { name: `${lgu.name} at a glance.` });
  await expect(glance).toContainText(formatNumber(lgu.census.population));
  await expect(glance).toContainText(lgu.census.source);
  await expect(glance).toContainText(String(lgu.charter.services));
  await expect(glance).toContainText(String(lgu.charter.offices));
  await expect(glance).toContainText(String(lgu.census.barangays));
});

test('tile counts say they are Charter counts, not published guides', async ({ page }) => {
  await page.goto('/');
  const tiles = page.getByRole('region', { name: 'Popular services.' });
  await expect(tiles).toContainText('Grouped by the offices that handle them');
  // "112 services in the Charter" is readable by screen readers on the featured tile.
  await expect(tiles.getByText('services in the Charter')).toHaveCount(6);
  await expect(tiles.getByRole('link', { name: /All services/ })).toHaveAttribute(
    'href',
    '/services/',
  );
});

test('nothing is shown that points at a guide that does not exist', async ({ page }) => {
  await page.goto('/');
  // No published guide yet: no "Popular:" shortcuts and no sample-sheet button.
  await expect(page.getByText('Popular:')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'See a sample sheet' })).toHaveCount(0);
  // No search page yet: the card links to the directory instead of a form.
  await expect(page.getByRole('search')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Browse the services directory' })).toHaveAttribute(
    'href',
    '/services/',
  );
});

test('every internal link on the home page resolves', async ({ page }) => {
  for (const path of ['/', '/fil/']) {
    await page.goto(path);
    const hrefs = await page
      .locator('main a[href^="/"]')
      .evaluateAll((links) => [...new Set(links.map((link) => link.getAttribute('href')))]);
    for (const href of hrefs) {
      const response = await page.request.get(href as string);
      expect(response.status(), `${path} links to ${href}`).toBe(200);
    }
  }
});

test('the Filipino home page is in Filipino and links to Filipino pages', async ({ page }) => {
  await page.goto('/fil/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fil');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Maligayang pagdating sa');
  await expect(
    page.getByRole('heading', { level: 2, name: 'Mga sikat na serbisyo.' }),
  ).toBeVisible();
  await expect(
    page.getByRole('region', { name: 'Mga sikat na serbisyo.' }).getByRole('link').first(),
  ).toHaveAttribute('href', '/fil/services/');
});

test('the home page has no accessibility violations on a phone and a laptop', async ({ page }) => {
  for (const [width, height] of [
    [360, 720],
    [1280, 800],
  ] as [number, number][]) {
    await page.setViewportSize({ width, height });
    for (const path of ['/', '/fil/']) {
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${path} at ${width}px`).toEqual([]);
    }
  }
});

test('the home page does not scroll sideways from 320 px to a wide screen', async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1024, 1280, 1920]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ['/', '/fil/']) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

test('phone buttons and links are big enough to tap', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 720 });
  await page.goto('/');
  for (const name of ['Browse services', 'Report a wrong detail']) {
    const box = await page.getByRole('main').getByRole('link', { name }).first().boundingBox();
    expect(box?.height, `${name} is at least 44px tall`).toBeGreaterThanOrEqual(44);
  }
});
