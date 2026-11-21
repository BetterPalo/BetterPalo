import { readdirSync, readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { parse } from 'yaml';
import { lgu } from '../../src/config/lgu';

// Counts only real guides: a SAMPLE_CONTENT build adds the fictional sample.
test.skip(process.env.SAMPLE_CONTENT === 'true', 'counts only real guides');

interface GuideFile {
  id: string;
  office: string;
  status: string;
  last_verified: string;
}

// The published guides, read from the same YAML files the build reads.
const verified = readdirSync('src/content/services')
  .filter((file) => file.endsWith('.yaml') && !file.startsWith('_'))
  .map((file) => parse(readFileSync(`src/content/services/${file}`, 'utf8')) as GuideFile)
  .filter((guide) => guide.status === 'verified');
const offices = new Set(verified.map((guide) => guide.office));

for (const [path, prefix] of [
  ['/services/', ''],
  ['/fil/services/', '/fil'],
] as const) {
  test(`${path}: one section per office, each guide under its office with its date`, async ({
    page,
  }) => {
    await page.goto(path);
    await expect(page.locator('main section[data-office]')).toHaveCount(offices.size);
    for (const guide of verified) {
      const card = page.locator(
        `main section[data-office=${JSON.stringify(guide.office)}] a[href="${prefix}/services/${guide.id}/"]`,
      );
      await expect(card, guide.id).toBeVisible();
      await expect(card.locator(`time[datetime="${String(guide.last_verified)}"]`)).toBeVisible();
    }
  });
}

test('an empty directory says so and shows the Charter counts', async ({ page }) => {
  test.skip(verified.length > 0, 'guides are published');
  await page.goto('/services/');
  const empty = page.locator('#services-empty');
  await expect(empty).toBeVisible();
  await expect(empty).toContainText(String(lgu.charter.services));
  await expect(empty.locator('a[href="/contribute/"]')).toBeVisible();
});
