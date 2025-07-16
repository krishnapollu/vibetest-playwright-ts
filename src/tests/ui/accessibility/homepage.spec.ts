import { test, expect } from '../../../testSetup';
import AxeBuilder from '@axe-core/playwright';
import { DemoblazeHomePage } from '../../../pages/DemoblazeHomePage';
import logger from '../../../utils/logger';
import demoblazeLocators from '../../../locators/demoblaze.json';

test('Demoblaze Home Accessibility', async ({ page }) => {
  const home = new DemoblazeHomePage(page);
  await home.gotoHome();
  await page.waitForSelector(demoblazeLocators.homePage.productTitles);
  const results = await new AxeBuilder({ page }).analyze();
  logger.info(`Accessibility violations: ${JSON.stringify(results.violations, null, 2)}`);
  const critical = results.violations.filter(v => v.impact === 'critical');
  expect(critical, `Critical accessibility violations: ${JSON.stringify(critical, null, 2)}`).toEqual([]);
}); 