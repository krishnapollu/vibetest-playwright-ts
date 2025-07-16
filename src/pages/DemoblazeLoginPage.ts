import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import demoblazeLocators from '../locators/demoblaze.json';
import logger from '../utils/logger';

export class DemoblazeLoginPage extends BasePage {
  private locators = demoblazeLocators.loginPage;
  constructor(page: Page) {
    super(page);
  }

  async openLoginModal() {
    logger.info('Opening login modal');
    await this.page.click(this.locators.loginButton);
    await this.page.waitForSelector(this.locators.loginModal, { state: 'visible' });
  }

  async login(username: string, password: string) {
    logger.info(`Logging in with username: ${username}`);
    await this.page.fill(this.locators.usernameInput, username);
    await this.page.fill(this.locators.passwordInput, password);
    await this.page.click(this.locators.submitButton);
    await this.page.waitForTimeout(1000); // Wait for login to process
  }
} 