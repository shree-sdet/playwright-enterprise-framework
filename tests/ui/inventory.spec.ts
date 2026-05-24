import { test, expect } from '../../fixtures/baseFixture';

test('Authenticated user should access inventory page', async ({ 
    page,
    inventoryPage
}) => {

    await page.goto('/inventory.html'); 
    await inventoryPage.verifyInventoryPageLoaded();

    await expect(page).toHaveURL(/inventory/);
});