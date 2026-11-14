import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Every secondary page, in both languages. A missing interface string used to
// print the word "undefined" on the page, and an unfilled {placeholder} prints a
// brace. Either one turns CI on main red, so these checks fail on both, on a
// missing or doubled h1, on accessibility violations, and on sideways scrolling
// at 360 px.

const pages = [
  'about',
  'offices',
  'resources',
  'how-it-works',
  'contribute',
  'accessibility',
  'services',
];
const paths = pages.flatMap((slug) => [`/${slug}/`, `/fil/${slug}/`]);

for (const path of paths) {
  test(`${path}: no "undefined" or "{", one h1, no axe violations, no sideways scroll`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 720 });
    await page.goto(path);

    const text = await page.locator('body').innerText();
    expect(text).not.toContain('undefined');
    expect(text, 'a placeholder was not filled').not.toContain('{');
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'page scrolls sideways').toBeLessThanOrEqual(0);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
}

// Home and sitemap pages: only the text checks (home and sitemap specs run axe).
for (const path of ['/', '/fil/', '/sitemap/', '/fil/sitemap/']) {
  test(`${path}: no "undefined" or "{"`, async ({ page }) => {
    await page.goto(path);

    const text = await page.locator('body').innerText();
    expect(text).not.toContain('undefined');
    expect(text, 'a placeholder was not filled').not.toContain('{');
  });
}
