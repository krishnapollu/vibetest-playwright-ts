import { test } from '@playwright/test';
import percySnapshot from '@percy/playwright';
import { BASE_URL } from '../../config/env';

test('Percy visual snapshot of home page', async ({ page }) => {
  await page.goto(BASE_URL);
  await percySnapshot(page, 'Home Page Percy');
}); 