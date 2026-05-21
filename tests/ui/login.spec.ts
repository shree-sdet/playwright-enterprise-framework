import { test, expect } from '../../fixtures/baseFixture';
import { ENV } from '../../config/env';

test('Valid user should login successfully', async ({ loginPage, inventoryPage, page }) => {

    await loginPage.navigateToLoginPage();
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await inventoryPage.verifyInventoryPageLoaded();
    await expect(page).toHaveURL(/inventory/);
});