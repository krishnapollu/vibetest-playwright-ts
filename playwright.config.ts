import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  retries: 1, // Enable retries for flaky tests
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],
  projects: [
    {
      name: 'Chromium',
      testMatch: /.*ui\/.*/, // Only run UI tests
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Firefox',
      testMatch: /.*ui\/.*/, // Only run UI tests
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'WebKit',
      testMatch: /.*ui\/.*/, // Only run UI tests
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'API',
      testMatch: /.*api\/.*/, // Only run API tests
      use: {}, // No browser context
    },
  ],
  workers: 4, // Parallel execution
}); 