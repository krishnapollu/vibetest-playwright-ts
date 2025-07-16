import { test as base, expect as baseExpect } from '@playwright/test';
import logger from './utils/logger';

export const test = base;
export const expect = baseExpect;

test.beforeEach(async ({}, testInfo) => {
  logger.info(`START: ${testInfo.title}`);
});

test.afterEach(async ({ page }, testInfo) => {
  logger.info(`END: ${testInfo.title}`);
  if (page && testInfo.status !== testInfo.expectedStatus) {
    const screenshotPath = `logs/${testInfo.title.replace(/\s+/g, '_')}-${testInfo.project.name}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    logger.info(`Screenshot taken for failed test: ${screenshotPath}`);
  }
}); 