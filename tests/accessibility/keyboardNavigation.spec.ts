import { test, expect } from '@playwright/test';

test('Verify keyboard tab navigation @accessibility', async ({ page }) => {

  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect( page.locator('#user-name')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#password')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.locator('#login-button')).toBeFocused();

});


test('Login using keyboard only @accessibility', async ({ page }) => {

  await page.goto('/');
  await page.keyboard.press('Tab');
  await page.keyboard.type('standard_user');
  await page.keyboard.press('Tab');
  await page.keyboard.type('secret_sauce');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inventory/);

});