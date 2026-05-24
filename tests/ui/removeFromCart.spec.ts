import { test, expect }from '../../fixtures/baseFixture';

test('User should remove product from cart', async ({
    inventoryPage
}) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.removeBackpackFromCart();
    await expect(inventoryPage.cartBadge).not.toBeVisible();
});