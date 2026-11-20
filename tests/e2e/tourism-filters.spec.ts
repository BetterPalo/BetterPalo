import { expect, test } from '@playwright/test';

test.describe('tourism filters', () => {
  test('lists every spot and reports the full count', async ({ page }) => {
    await page.goto('/tourism/');

    const all = await page.locator('[data-spot]').count();
    expect(all).toBeGreaterThan(0);
    await expect(page.locator('[data-spot]:visible')).toHaveCount(all);
    await expect(page.getByRole('status')).toContainText(`Spots shown: ${all}`);
  });

  test('filters by type, syncs the group row and the hash', async ({ page }) => {
    await page.goto('/tourism/');
    const all = await page.locator('[data-spot]').count();
    const churchCount = await page.locator('[data-spot][data-categories~="church"]').count();

    await page.getByRole('button', { name: 'Churches', exact: true }).click();
    await expect(page.locator('[data-spot]:visible')).toHaveCount(churchCount);
    await expect(page.getByRole('status')).toContainText(`Spots shown: ${churchCount}`);
    await expect(page.getByRole('button', { name: 'See', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page).toHaveURL(/\/tourism\/#church$/);

    await page.getByRole('button', { name: 'All kinds of visit' }).click();
    await expect(page.locator('[data-spot]:visible')).toHaveCount(all);
    await expect(page).toHaveURL(/\/tourism\/$/);
  });

  test('opens a filtered list from the hash', async ({ page }) => {
    await page.goto('/tourism/');
    const viewDeckCount = await page.locator('[data-spot][data-categories~="view-deck"]').count();
    await page.goto('/tourism/#view-deck');

    await expect(page.getByRole('button', { name: 'View decks', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await expect(page.locator('[data-spot]:visible')).toHaveCount(viewDeckCount);
    await expect(page.getByRole('status')).toContainText(`Spots shown: ${viewDeckCount}`);
  });

  test('keeps the filter when an in-page anchor changes the hash', async ({ page }) => {
    await page.goto('/tourism/');
    const churchCount = await page.locator('[data-spot][data-categories~="church"]').count();
    await page.goto('/tourism/#church');
    await expect(page.locator('[data-spot]:visible')).toHaveCount(churchCount);

    // The skip link also uses the hash, so it must not clear the filter.
    await page.getByRole('link', { name: 'Skip to content' }).focus();
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('[data-spot]:visible')).toHaveCount(churchCount);
    await expect(page.getByRole('button', { name: 'Churches', exact: true })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });
});

test.describe('tourism without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('keeps every spot readable and hides the inert chips', async ({ page }) => {
    await page.goto('/tourism/');

    const all = await page.locator('[data-spot]').count();
    expect(all).toBeGreaterThan(0);
    await expect(page.locator('[data-spot]:visible')).toHaveCount(all);
    await expect(page.locator('noscript p')).toContainText('Filters need JavaScript');
    await expect(page.locator('[data-tourism-filters]')).toBeHidden();
  });
});
