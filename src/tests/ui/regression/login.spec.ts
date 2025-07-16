import { test, expect } from '../../../testSetup';
import { DemoblazeHomePage } from '../../../pages/DemoblazeHomePage';
import { DemoblazeLoginPage } from '../../../pages/DemoblazeLoginPage';
import demoblazeLocators from '../../../locators/demoblaze.json';
import users from '../../../data/demoblazeUsers.json';
import logger from '../../../utils/logger';

function uniqueUser() {
  const rand = Math.floor(Math.random() * 100000);
  return { username: `testuser${rand}`, password: 'TestPass123!' };
}

test.describe('Demoblaze Login Regression', () => {
  test('should register, login and logout successfully', async ({ page }) => {
    const home = new DemoblazeHomePage(page);
    const login = new DemoblazeLoginPage(page);
    const { username, password } = users[0];
    await home.gotoHome();
    // Register
    await page.click('#signin2');
    await page.waitForSelector('#signInModal', { state: 'visible' });
    await page.fill('#sign-username', username);
    await page.fill('#sign-password', password);
    await page.click("button:has-text('Sign up')");
    await page.on('dialog', dialog => dialog.accept());
    await page.waitForTimeout(1000);
    logger.info(`Registered user: ${username}`);
    // Login
    await login.openLoginModal();
    await login.login(username, password);
    await expect(page.locator('#nameofuser')).toBeVisible();
    logger.info('User is visible after login');
    await expect(page.locator('#nameofuser')).toContainText(username);
    logger.info('Username is correct after login');
    await page.click('#logout2');
    await expect(page.locator(demoblazeLocators.loginPage.loginButton)).toBeVisible();
  });
}); 