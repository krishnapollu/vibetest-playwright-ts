import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import demoblazeLocators from '../locators/demoblaze.json';
import logger from '../utils/logger';
import { takeScreenshot } from '../utils/screenshot';

export class DemoblazeCartPage extends BasePage {
  private locators = demoblazeLocators.cartPage;
  constructor(page: Page) {
    super(page);
  }

  async gotoCart() {
    logger.info('Navigating to cart page');
    await this.page.click(this.locators.cartButton);
    await this.page.waitForURL(this.locators.cartUrl);
  }

  async getCartItems(): Promise<string[]> {
    logger.info('Getting cart items');
    const items = await this.page.$$eval(this.locators.cartItems, els => els.map(e => e.textContent || ''));
    await takeScreenshot(this.page, 'cart-items');
    return items;
  }

  async removeFirstItem() {
    logger.info('Removing first item from cart');
    await this.page.click(this.locators.deleteButton);
  }
} 