import { test, expect } from '../../fixtures/baseFixture';

test('Valid user should login successfully', async ({ loginPage, inventoryPage, page }) => {

    await loginPage.navigateToLoginPage();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.verifyInventoryPageLoaded();
    await expect(page).toHaveURL(/inventory/);
});