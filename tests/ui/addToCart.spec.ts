import { test, expect } from '../../fixtures/baseFixture';
import * as allure from 'allure-js-commons';

test('User should add product to cart @regression @ui', async ({
    inventoryPage
}) => {

    await test.step('Add product to cart', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
    });

    await test.step('Validate cart badge count', async () => {
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
    });
  
});

