import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import demoblazeLocators from '../locators/demoblaze.json';
import logger from '../utils/logger';

export class DemoblazeHomePage extends BasePage {
  private locators = demoblazeLocators.homePage;
  constructor(page: Page) {
    super(page);
  }

  async gotoHome() {
    logger.info('Navigating to Demoblaze home page');
    await this.page.goto('https://demoblaze.com');
  }

  async selectCategory(category: string) {
    const selector = this.locators.category.replace('${category}', category);
    logger.info(`Selecting category: ${category} (selector: ${selector})`);
    await this.page.click(selector);
  }

  async selectProduct(product: string) {
    const selector = this.locators.product.replace('${product}', product);
    logger.info(`Selecting product: ${product} (selector: ${selector})`);
    await this.page.click(selector);
  }

  async getProductTitles(): Promise<string[]> {
    logger.info('Getting product titles from home page');
    return this.page.$$eval(this.locators.productTitles, els => els.map(e => e.textContent || ''));
  }
} 