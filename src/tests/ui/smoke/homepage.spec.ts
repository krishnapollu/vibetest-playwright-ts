import { test, expect } from '../../../testSetup';
import { DemoblazeHomePage } from '../../../pages/DemoblazeHomePage';
import demoblazeLocators from '../../../locators/demoblaze.json';

test.describe('Demoblaze Home Smoke', () => {
  test('@smoke should load home and display categories and products', async ({ page }) => {
    const home = new DemoblazeHomePage(page);
    await home.gotoHome();
    await expect(page).toHaveTitle(/STORE/);
    await home.selectCategory('Phones');
    await page.waitForSelector(demoblazeLocators.homePage.productTitles);
    const products = await home.getProductTitles();
    expect(products.length).toBeGreaterThan(0);
  });
}); 