import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
} 