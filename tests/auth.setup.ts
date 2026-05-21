import { test as setup } from '@playwright/test';

const authFile = 'auth/userAuth.json';

setup('Authenticate User', async ({ page }) => {

    await page.goto('https://www.saucedemo.com');

    await page.locator('#user-name').fill('standard_user');

    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await page.context().storageState({
        path: authFile
    });
});