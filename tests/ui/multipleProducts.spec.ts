import { test, expect } from '../../fixtures/baseFixture';
import products from '../../test-data/products.json';

// This test validates the presence of multiple products on the inventory page by iterating through the products defined in the products.json file and checking if each product is visible on the page using its name as a locator.
// test('Validate multiple inventory products', async ({

//     inventoryPage

// }) => {

//     for (const productKey in products) {

//         const product = products[productKey as keyof typeof products];
//         const productLocator = await inventoryPage.getInventoryItemByName(product.name);
//         await expect(productLocator).toBeVisible();
//     }
// });

// Refactored code to create separate test for each product using test.describe and test blocks
for (const productKey in products) {

    const product = products[productKey as keyof typeof products];

    test(`Validate ${product.name}`, async ({ inventoryPage}) => {
        const locator =await inventoryPage.getInventoryItemByName(product.name);
        await expect(locator).toBeVisible();
    });
}