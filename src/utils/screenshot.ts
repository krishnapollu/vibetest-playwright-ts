import { Page } from '@playwright/test';

export async function takeScreenshot(page: Page, name: string, fullPage: boolean = true) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `logs/${name}-${timestamp}.png`;
  await page.screenshot({ path: fileName, fullPage });
  return fileName;
} 