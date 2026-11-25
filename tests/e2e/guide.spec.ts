import { readFileSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

import { lgu } from '../../src/config/lgu';

// The published cedula guide, in both languages. Unlike sample.spec.ts this runs
// against the real build, so it guards the pages production serves: one h1, no
// missing interface strings, no accessibility violations, no sideways scroll at
// 360 px, a source link that opens the Charter at page 225, and a print sheet
// without the site chrome.

// The cedula is published only while its status is verified (ADR 0017). Until the
// second check is recorded (#26) there is no page to test, so skip, don't fail.
test.skip(
  !/^status: verified$/m.test(readFileSync('src/content/services/cedula.yaml', 'utf8')),
  'the cedula guide is not published yet',
);

const EN = '/services/cedula/';
const FIL = '/fil/services/cedula/';
const pageUrl = (path: string) => new URL(path, lgu.siteUrl).href;
const SECTIONS = [
  'guide-where',
  'guide-bring',
  'guide-cost',
  'guide-time',
  'guide-about',
  'guide-eligibility',
  'guide-steps',
  'guide-channels',
  'guide-complaint',
  'guide-notes',
  'guide-source',
];
// The four questions on the printed sheet.
const ANSWERS = ['guide-where', 'guide-bring', 'guide-cost', 'guide-time'];
// The site chrome that the printed sheet hides.
const CHROME = ['body > header', 'body > aside', 'body > footer', '#guide-details', '#guide-share'];

// `toBeHidden()` also passes when nothing matches, so check on screen first that each
// piece exists and is shown. Then a markup change cannot make the print checks pass on nothing.
async function expectChromeOnScreen(page: Page) {
  for (const selector of CHROME) {
    await expect(page.locator(selector), selector).toBeVisible();
  }
  expect(await page.locator('nav').count(), 'no nav on screen').toBeGreaterThan(0);
}

async function expectSheetOnly(page: Page) {
  for (const selector of CHROME) {
    await expect(page.locator(selector), selector).toBeHidden();
  }
  for (const nav of await page.locator('nav').all()) {
    await expect(nav).toBeHidden();
  }
  for (const id of ANSWERS) {
    await expect(page.locator(`#${id}`), id).toBeVisible();
  }
  await expect(page.locator('#guide-source')).toBeVisible();
  await expect(page.locator('#guide-source-link')).toBeVisible();
  await expect(page.locator('#guide-print-url')).toBeVisible();
  await expect(page.locator('#guide-qr')).toBeVisible();
}

for (const path of [EN, FIL]) {
  test(`${path}: every section, one h1, no "undefined" or "{", no axe violations, no sideways scroll at 360 px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 360, height: 720 });
    await page.goto(path);

    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`), id).toBeVisible();
    }
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);

    const text = await page.locator('body').innerText();
    expect(text).not.toContain('undefined');
    expect(text, 'a placeholder was not filled').not.toContain('{');

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow, 'page scrolls sideways').toBeLessThanOrEqual(0);

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((v) => v.id)).toEqual([]);
  });
}

test('the directory links to the cedula guide in both languages', async ({ page }) => {
  await page.goto('/services/');
  await expect(page.locator(`main a[href="${EN}"]`).first()).toBeVisible();

  await page.goto('/fil/services/');
  await expect(page.locator(`main a[href="${FIL}"]`).first()).toBeVisible();
});

test('the source link opens the Charter at page 225', async ({ page }) => {
  await page.goto(EN);
  const source = page.locator('#guide-source');
  await expect(source).toContainText('pp. 225–227');
  await expect(page.locator('#guide-source-link')).toHaveAttribute('href', /#page=225$/);
});

test('the Filipino guide tags its English content and shows the translation notice', async ({
  page,
}) => {
  await page.goto(FIL);
  await expect(page.locator('html')).toHaveAttribute('lang', 'fil');
  await expect(page.locator('#guide-where h3')).toContainText('Saan pupunta');
  await expect(page.locator('#guide-pending')).toBeVisible();
  await expect(page.locator('#guide-pending')).toContainText('translation-pending');
  // The guide answers are English on the Filipino page (ADR 0007, D6).
  await expect(page.locator('#guide-sheet [lang="en"]').first()).toBeVisible();
  expect(await page.locator('#guide-sheet [lang="en"]').count()).toBeGreaterThan(10);

  await page.goto(EN);
  await expect(page.locator('#guide-pending')).toHaveCount(0);
});

test('print shows the sheet and hides the site chrome', async ({ page }) => {
  await page.goto(EN);
  await expectChromeOnScreen(page);
  await page.emulateMedia({ media: 'print' });
  await expectSheetOnly(page);
  expect(await page.locator('#guide-qr path').getAttribute('d')).toMatch(/^M\d/);
  // The sheet never promises a page count.
  await expect(page.locator('#guide-sheet')).not.toContainText('Page 1 of 1');

  await page.emulateMedia({ media: 'screen' });
  await expect(page.locator('#guide-print-url')).toBeHidden();
  await expect(page.locator('#guide-qr')).toBeHidden();
});

for (const path of [EN, FIL]) {
  test(`${path}: share links carry the encoded page URL`, async ({ page }) => {
    await page.goto(path);
    const url = encodeURIComponent(pageUrl(path));
    const facebook = page.locator('#guide-share a[href^="https://www.facebook.com/sharer/"]');
    await expect(facebook).toHaveAttribute(
      'href',
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    );
    await expect(facebook).toHaveAttribute('target', '_blank');
    await expect(facebook).toHaveAttribute('rel', /noopener/);
    await expect(page.locator('#guide-share a[href^="fb-messenger:"]')).toHaveAttribute(
      'href',
      `fb-messenger://share/?link=${url}`,
    );
  });
}

test('the print button shows with JS and calls window.print', async ({ page }) => {
  await page.goto(EN);
  await page.evaluate(() => {
    (window as unknown as { printed: boolean }).printed = false;
    window.print = () => {
      (window as unknown as { printed: boolean }).printed = true;
    };
  });
  const button = page.locator('#guide-share [data-share-print] button');
  await expect(button).toBeVisible();
  await button.click();
  expect(await page.evaluate(() => (window as unknown as { printed: boolean }).printed)).toBe(true);
});

test.describe('with JavaScript off', () => {
  test.use({ javaScriptEnabled: false });

  test('the print and native share buttons stay hidden, the Facebook link shows', async ({
    page,
  }) => {
    await page.goto(EN);
    await expect(page.locator('#guide-share [data-share-print] button')).toBeHidden();
    await expect(page.locator('#guide-share [data-share-native] button')).toBeHidden();
    await expect(
      page.locator('#guide-share a[href^="https://www.facebook.com/sharer/"]'),
    ).toBeVisible();
  });
});
