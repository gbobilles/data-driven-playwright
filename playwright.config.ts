import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'html',
  workers: 7,
  use: {
    baseURL: 'https://www.theautomationchallenge.com/',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use the browser preinstalled in this environment instead of
        // downloading one that matches @playwright/test's pinned revision.
        // Safe to remove this launchOptions override on a machine where
        // `npx playwright install` has been run normally.
        launchOptions: {
          executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH,
        },
      },
    },
  ],
});
