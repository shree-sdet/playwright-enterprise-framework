import { test, expect }from '../../fixtures/baseFixture';

test('User should add product to cart', async ({
    inventoryPage
}) => {

    await inventoryPage.addBackpackToCart();
    const cartCount =await inventoryPage.getCartBadgeCount();
    expect(cartCount).toBe('1');
});