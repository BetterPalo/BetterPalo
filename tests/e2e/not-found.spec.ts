import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// The 404 page is one static page for both languages, so it carries the
// English and Filipino copy, the search box, and the recovery links.
test('404 page shows both languages, search, and recovery links', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');

  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toHaveCount(1);
  await expect(heading).toHaveText('Page not found');

  // Filipino sits beside English: "Hindi nakita ang pahina".
  const filipino = page.locator('div[lang="fil"]');
  await expect(filipino).toContainText('Hindi nakita ang pahina');

  const search = page.getByRole('search');
  await expect(search).toBeVisible();
  await expect(search).toHaveAttribute('action', '/search/');

  await expect(page.getByRole('link', { name: /home page/ })).toHaveAttribute('href', '/');
  await expect(page.getByRole('link', { name: /services directory/ })).toHaveAttribute(
    'href',
    '/services/',
  );

  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
});

test('404 page has no accessibility violations and no sideways scroll', async ({ page }) => {
  await page.goto('/this-page-does-not-exist');

  // Let the entrance animation finish so axe reads final colours, not
  // half-faded text.
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState === 'finished'),
  );

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
