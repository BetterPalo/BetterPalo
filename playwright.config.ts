import { defineConfig, devices } from '@playwright/test';

// In CI the `build` job uploads `dist/` and the `e2e` job downloads it, so the
// tests run against the artifact that would deploy. Set
// PLAYWRIGHT_SERVE_PREBUILT=1 in that case to skip the rebuild.
const servePrebuilt = process.env.PLAYWRIGHT_SERVE_PREBUILT === '1';
const preview = 'pnpm astro preview --port 4321 --ignore-lock';

export default defineConfig({
  testDir: 'tests/e2e',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'mobile-chrome',
      // CI sets PLAYWRIGHT_CHANNEL=chrome to use the Chrome on the runner.
      // Locally this is unset, so Playwright uses its own Chromium.
      use: { ...devices['Pixel 5'], channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
    },
  ],
  webServer: {
    command: servePrebuilt ? preview : `pnpm build && ${preview}`,
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
