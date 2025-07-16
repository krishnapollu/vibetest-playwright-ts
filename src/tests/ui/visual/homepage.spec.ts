import { test, expect } from '../../../testSetup';
import { DemoblazeHomePage } from '../../../pages/DemoblazeHomePage';
import demoblazeLocators from '../../../locators/demoblaze.json';

test('Demoblaze Home Visual Regression', async ({ page }) => {
  const home = new DemoblazeHomePage(page);
  await home.gotoHome();
  await page.waitForSelector(demoblazeLocators.homePage.productTitles);
  expect(await page.screenshot()).toMatchSnapshot('demoblaze-home.png', { threshold: 0.2 });
}); 