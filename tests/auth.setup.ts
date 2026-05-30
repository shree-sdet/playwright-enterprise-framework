import { test as setup } from '@playwright/test';

const authFile = 'auth/userAuth.json';

setup('Authenticate User', async ({ page }) => {

    await page.goto('/');

    await page.locator('#user-name').fill(process.env.USERNAME || '');
    await page.locator('#password').fill(process.env.PASSWORD || '');

    await page.locator('#login-button').click();

    await page.context().storageState({
        path: authFile
    });
});