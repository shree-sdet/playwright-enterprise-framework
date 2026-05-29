import { test, expect } from '../../fixtures/baseFixture';
import * as allure from 'allure-js-commons';
import { getLoginUser } from '../../utils/testDataManager';

test('Login page visual validation', async ({ page }) => {
  await page.goto('/');

  //await page.evaluate(() => {document.body.style.zoom = '110%'});
  await expect(page).toHaveScreenshot('login-page.png');
  const screenshot = await page.screenshot();
   await allure.attachment('Login Page',screenshot,'image/png');

});

test('Login logo visual validation', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.login_logo')).toHaveScreenshot('login-logo.png');
});

test('Inventory page visual validation', async ({loginPage, page}) => {

  const user = getLoginUser('validUser');
  await loginPage.navigateToLoginPage();
  await loginPage.login(user.username,user.password);
  await expect(page).toHaveScreenshot('inventory-page.png',
  {
    mask: [
      page.locator('.shopping_cart_badge')
    ]
  }
);
});