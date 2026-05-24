import { test, expect } from '../../fixtures/baseFixture';

test('Add backpack to cart', async ({

    inventoryPage,
    page

}) => {

    await inventoryPage.addBackpackToCart();
    await page.waitForTimeout(3000);
    await expect(inventoryPage.cartBadge).toHaveText('1');
});


test('Cart should initially be empty', async ({
    inventoryPage,
    page
}) => {

    await page.waitForTimeout(1000);
    await expect(inventoryPage.cartBadge).not.toBeVisible();
});