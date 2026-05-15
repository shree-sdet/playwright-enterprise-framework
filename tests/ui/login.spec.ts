import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';

test('Valid user should login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.navigateToLoginPage();

    await loginPage.login('standard_user','secret_sauce' );

    await expect(page).toHaveURL(/inventory/);
});