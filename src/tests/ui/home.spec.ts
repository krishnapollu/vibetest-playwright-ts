import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import logger from '../../utils/logger';
import { BASE_URL } from '../../config/env';

test.describe('Home Page UI', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await page.context().tracing.start({ screenshots: true, snapshots: true });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({ path: `logs/${testInfo.title.replace(/\s+/g, '_')}.png`, fullPage: true });
      await page.context().tracing.stop({ path: `logs/${testInfo.title.replace(/\s+/g, '_')}-trace.zip` });
    } else {
      await page.context().tracing.stop();
    }
  });

  test('@smoke should have correct title', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goto(BASE_URL);
    const title = await homePage.getTitle();
    logger.info(`Page title: ${title}`);
    expect(title).toContain(''); // Add expected title
  });
}); 