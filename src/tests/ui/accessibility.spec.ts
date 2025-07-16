import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { BASE_URL } from '../../config/env';

test('Home page should have no accessibility violations', async ({ page }) => {
  await page.goto(BASE_URL);
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations, `Accessibility violations: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
}); 