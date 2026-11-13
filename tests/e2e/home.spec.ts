import { expect, test } from '@playwright/test';

// One example to copy from. Add the rest as you build the pages.
test('home page renders a heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

// TODO(@khalmahi, @jaimedesu): add tests for the cases below. @jaimedesu owns
// the accessibility checks; @Rurur8 owns the Playwright setup.
// - no accessibility violations (use AxeBuilder from '@axe-core/playwright')
// - a service page renders once there is a verified service to show
