import { test, expect } from '../../../testSetup';
import { DemoblazeHomePage } from '../../../pages/DemoblazeHomePage';
import { DemoblazeCartPage } from '../../../pages/DemoblazeCartPage';
import demoblazeLocators from '../../../locators/demoblaze.json';
import products from '../../../data/demoblazeProducts.json';

test.describe('Demoblaze Cart Regression', () => {
  test('should add and remove product from cart', async ({ page }) => {
    const home = new DemoblazeHomePage(page);
    const cart = new DemoblazeCartPage(page);
    await home.gotoHome();
    await home.selectCategory('Phones');
    await page.waitForSelector(demoblazeLocators.homePage.productTitles);
    await home.selectProduct(products[0]);
    await page.click('a:has-text("Add to cart")');
    await page.once('dialog', dialog => dialog.accept());
    await page.waitForTimeout(1500); // Wait for cart update
    await cart.gotoCart();
    let items = await cart.getCartItems();
    expect(items).toContain(products[0]);
    await cart.removeFirstItem();
    await page.waitForTimeout(1500); // Wait for cart update
    items = await cart.getCartItems();
    expect(items).not.toContain(products[0]);
  });
}); 