import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

// The shared layout from #35: notice, header, footer on every page, in both
// themes. Add new pages to this list as they are built.
const pages = ['/', '/fil/', '/sitemap/', '/fil/sitemap/', '/this-page-does-not-exist'];

const REPORT = /\/issues\/new\?template=data-correction\.yml$/;

async function animationsDone(page: Page) {
  await page.waitForFunction(() =>
    document.getAnimations().every((animation) => animation.playState === 'finished'),
  );
}

// The site is light only. Run on a dark device too, so the page must still look light.
test.describe('light theme on a dark device', () => {
  test.use({ colorScheme: 'dark' });

  for (const path of pages) {
    test(`${path}: notice, report link, and no axe violations`, async ({ page }) => {
      await page.goto(path);
      const notice = page.getByRole('complementary', { name: /^(Site notice|Paalala)$/ });
      await expect(notice).toBeVisible();
      await expect(notice.getByRole('link')).toHaveAttribute('href', REPORT);

      await animationsDone(page);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});

test('the page is light by default, even on a dark device', async ({ browser }) => {
  const context = await browser.newContext({ colorScheme: 'dark' });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await context.close();
});

test('the language switch opens the same page in the other language', async ({ page }) => {
  await page.goto('/sitemap/');
  await page.getByRole('group', { name: 'Language' }).getByRole('link', { name: /^FIL/ }).click();
  await expect(page).toHaveURL(/\/fil\/sitemap\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fil');

  await page.getByRole('group', { name: 'Wika' }).getByRole('link', { name: /^EN/ }).click();
  await expect(page).toHaveURL(/\/sitemap\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('the skip link moves focus to the main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('header and footer links only point at pages that exist', async ({ page }) => {
  for (const path of ['/', '/fil/']) {
    await page.goto(path);
    const links = page.locator('header a, footer a');
    const count = await links.count();
    for (let index = 0; index < count; index += 1) {
      const href = await links.nth(index).getAttribute('href');
      if (!href || !href.startsWith('/')) continue; // external links are not checked here
      const response = await page.request.get(href);
      expect(response.status(), `${path} links to ${href}`).toBe(200);
    }
  }
});

test.describe('phone, no JavaScript', () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 360, height: 720 } });

  test('the menu opens and closes as a popover', async ({ page }) => {
    await page.goto('/sitemap/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    const link = nav.getByRole('link', { name: 'Sitemap' });
    await expect(link).toBeHidden();

    await nav.getByRole('button', { name: 'Menu' }).click();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('aria-current', 'page');

    await page.keyboard.press('Escape');
    await expect(link).toBeHidden();
  });

  test('no page scrolls sideways at 360 px', async ({ page }) => {
    for (const path of pages) {
      await page.goto(path);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow, `${path} at 360 px`).toBeLessThanOrEqual(0);
    }
  });
});

test.describe('wide screen', () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test('nav links show inline and the menu button is hidden', async ({ page }) => {
    await page.goto('/sitemap/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    await expect(nav.getByRole('link', { name: 'Sitemap' })).toBeVisible();
    await expect(nav.getByRole('button', { name: 'Menu' })).toBeHidden();
  });
});
