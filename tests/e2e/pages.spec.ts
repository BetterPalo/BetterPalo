import { readFileSync } from 'node:fs';
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { parse } from 'yaml';

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
  'tourism',
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

// The directory YAML lists, read so each check follows what the data says.
function readList<T extends { status: string }>(name: string): T[] {
  return parse(readFileSync(`src/content/${name}.yaml`, 'utf8')) as T[];
}

const isVerified = (item: { status: string }) => item.status === 'verified';

test('/offices/ and /fil/offices/ never show an office phone', async ({ page }) => {
  const phones = readList<{ status: string; phone: string | null }>('offices').flatMap((o) =>
    o.phone === null ? [] : [o.phone],
  );

  for (const path of ['/offices/', '/fil/offices/']) {
    await page.goto(path);
    // The whole HTML, so a tel: link or a title attribute counts as well as visible text.
    const html = await page.content();
    for (const phone of phones) {
      expect(html, `${path} shows ${phone}`).not.toContain(phone);
    }
  }
});

test('unverified officials are not shown on /offices/ or /fil/offices/', async ({ page }) => {
  const unverified = readList<{ status: string; name: string }>('officials').filter(
    (o) => !isVerified(o),
  );

  for (const path of ['/offices/', '/fil/offices/']) {
    await page.goto(path);
    const text = await page.locator('body').innerText();
    for (const official of unverified) {
      expect(text, `${path} shows ${official.name}`).not.toContain(official.name);
    }
  }
});

// One check per list. Each skips once that list has a verified item, so the test
// stays true after the lead verifies items.
test('the offices pending note shows while no office is verified', async ({ page }) => {
  test.skip(readList<{ status: string }>('offices').some(isVerified), 'an office is verified');
  for (const path of ['/offices/', '/fil/offices/']) {
    await page.goto(path);
    await expect(page.locator('#offices-details-pending'), path).toBeVisible();
  }
});

test('the officials pending note shows while no official is verified', async ({ page }) => {
  test.skip(readList<{ status: string }>('officials').some(isVerified), 'an official is verified');
  for (const path of ['/offices/', '/fil/offices/']) {
    await page.goto(path);
    await expect(page.locator('#officials-pending'), path).toBeVisible();
  }
});

test('the barangays pending note shows while no barangay is verified', async ({ page }) => {
  test.skip(readList<{ status: string }>('barangays').some(isVerified), 'a barangay is verified');
  for (const path of ['/about/', '/fil/about/']) {
    await page.goto(path);
    await expect(page.locator('#barangays-pending'), path).toBeVisible();
  }
});

test('the official resources pending note shows while no official link is verified', async ({
  page,
}) => {
  const group = readList<{ status: string; group: string }>('resources').filter(
    (r) => r.group === 'official',
  );
  test.skip(group.some(isVerified), 'an official link is verified');
  for (const path of ['/resources/', '/fil/resources/']) {
    await page.goto(path);
    await expect(page.locator('#resources-official-pending'), path).toBeVisible();
  }
});

test('the other-agency resources pending note shows while no agency link is verified', async ({
  page,
}) => {
  const group = readList<{ status: string; group: string }>('resources').filter(
    (r) => r.group === 'other-agency',
  );
  test.skip(group.some(isVerified), 'an agency link is verified');
  for (const path of ['/resources/', '/fil/resources/']) {
    await page.goto(path);
    await expect(page.locator('#resources-other-pending'), path).toBeVisible();
  }
});

test('external links on /resources/ and /fil/resources/ use rel="external"', async ({ page }) => {
  for (const path of ['/resources/', '/fil/resources/']) {
    await page.goto(path);
    const links = page.locator('main a[href^="http"]');
    expect(await links.count(), `${path} has no external links to check`).toBeGreaterThan(0);
    for (const link of await links.all()) {
      expect(
        await link.getAttribute('rel'),
        `${path}: ${await link.getAttribute('href')}`,
      ).toContain('external');
    }
  }
});
