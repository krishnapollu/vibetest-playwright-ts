import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../config/env';

test('Home page visual regression', async ({ page }) => {
  await page.goto(BASE_URL);
  expect(await page.screenshot()).toMatchSnapshot('home-page.png', { threshold: 0.2 });
}); 