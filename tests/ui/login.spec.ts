import { test, expect } from '../../fixtures/baseFixture';
import { ENV } from '../../config/env';
import { getLoginUser } from '../../utils/testDataManager';

test('Valid user should login successfully', async ({ loginPage, inventoryPage, page }) => {

    const validUser = getLoginUser('validUser');
    await loginPage.navigateToLoginPage();
    await loginPage.login(validUser.username, validUser.password);
    await inventoryPage.verifyInventoryPageLoaded();
    await expect(page).toHaveURL(/inventory/);
});

test('Locked user should not login', async ({ loginPage, page}) => {

    const lockedUser = getLoginUser('invalidUser');

    await loginPage.navigateToLoginPage();

    await loginPage.login(lockedUser.username,lockedUser.password);

    await expect(page.locator('[data-test="error"]')).toBeVisible();
});