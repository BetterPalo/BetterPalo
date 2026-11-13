import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// The sitemap builds itself from the page files, so these tests check the two
// things that could drift: that the pages it lists really resolve, and that the
// page itself is readable and accessible in both languages.

test('the sitemap only links to pages that exist', async ({ page }) => {
  await page.goto('/sitemap/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sitemap');

  const links = page.locator('main a');
  const count = await links.count();
  expect(count).toBeGreaterThan(0);

  for (let index = 0; index < count; index += 1) {
    const href = await links.nth(index).getAttribute('href');
    expect(href, 'every sitemap link has a href').toBeTruthy();
    const response = await page.request.get(href as string);
    expect(response.status(), `${href} resolves`).toBe(200);
  }
});

test('the sitemap groups pages by area', async ({ page }) => {
  await page.goto('/sitemap/');
  const main = page.getByRole('main');
  for (const area of ['Services', 'Offices', 'About', 'Site pages']) {
    await expect(main.getByRole('heading', { level: 2, name: area })).toBeVisible();
  }
  await expect(main.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute('href', '/');
  await expect(main.getByRole('link', { name: 'Sitemap', exact: true })).toHaveAttribute(
    'href',
    '/sitemap/',
  );
  await expect(main.getByRole('link', { name: 'Filipino', exact: true }).first()).toHaveAttribute(
    'href',
    '/fil/sitemap/',
  );
});

test('the Filipino sitemap links to the Filipino pages', async ({ page }) => {
  await page.goto('/fil/sitemap/');
  const main = page.getByRole('main');
  await expect(page.locator('html')).toHaveAttribute('lang', 'fil');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sitemap');
  await expect(main.getByRole('link', { name: 'Home', exact: true })).toHaveAttribute(
    'href',
    '/fil/',
  );
  await expect(main.getByRole('link', { name: 'English', exact: true }).first()).toHaveAttribute(
    'href',
    '/sitemap/',
  );
});

test('the sitemap fits a 360 px screen without sideways scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 720 });
  for (const path of ['/sitemap/', '/fil/sitemap/']) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, `${path} does not scroll sideways at 360 px`).toBeLessThanOrEqual(0);
  }
});

test('the sitemap has no accessibility violations', async ({ page }) => {
  for (const path of ['/sitemap/', '/fil/sitemap/']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      // WCAG 2.1 A and AA, the level the site is reviewed against.
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(results.violations, `${path} passes axe`).toEqual([]);
  }
});
