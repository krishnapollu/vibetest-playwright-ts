import { test, expect } from '@playwright/test';
import { Auth } from '../../utils/auth';
import { BASE_URL } from '../../config/env';

const credentials = { email: 'john.doe@example.com', password: 'Password123!' };

test('UI login using API session', async ({ page, context }) => {
  // Login via API and get token (simulate session)
  const token = await Auth.loginAndGetToken(credentials);
  // Optionally, fetch cookies from API and set in browser
  // const cookies = await fetchCookiesSomehow(token);
  // await context.addCookies(cookies);

  // Or set localStorage/sessionStorage if app uses JWT
  await page.goto(BASE_URL);
  await page.evaluate((token) => {
    localStorage.setItem('token', token);
  }, token);

  // Reload and verify login state
  await page.reload();
  // Add assertion for logged-in state (e.g., user profile visible)
  expect(await page.isVisible('text=Logout')).toBeTruthy();
}); 