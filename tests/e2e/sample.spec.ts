import { expect, test } from '@playwright/test';
import { SAMPLE_ID, SAMPLE_MARKER } from '../../src/lib/sample-content';

// Runs only against a build made with SAMPLE_CONTENT=true (CI's e2e job, second phase).
test.skip(process.env.SAMPLE_CONTENT !== 'true', 'needs a SAMPLE_CONTENT=true build');

test('the fictional sample guide gets a page', async ({ page }) => {
  const response = await page.goto(`/services/${SAMPLE_ID}/`);
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('fictional sample');
  await expect(page.locator('main')).toContainText(SAMPLE_MARKER);
});

test('the directory links to the sample guide', async ({ page }) => {
  await page.goto('/services/');
  await expect(page.locator(`main a[href="/services/${SAMPLE_ID}/"]`).first()).toBeVisible();
});
