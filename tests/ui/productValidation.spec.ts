import { ENV } from '../../config/env';
import { test, expect } from '../../fixtures/baseFixture';
import { getProduct } from '../../utils/testDataManager';

// test.beforeEach(async ({ page }) => {
//     // await page.goto('/inventory.html');
//   //await page.goto('https://www.saucedemo.com/inventory.html');
//   await page.goto(`${ENV.BASE_URL}/inventory.html`);
//     console.log('Navigation completed');
// });

test.afterEach(async () => {
    console.log('Test execution completed');
});

test('Validate inventory product name', async ({
    inventoryPage, workerLogger
}) => {

    const expectedProduct = getProduct('backpack');
    const actualProductName = await inventoryPage.getInventoryItemText();
    expect(actualProductName).toBe(expectedProduct.name);
});

test('Validate second product', async ({
  inventoryPage
}) => {
  const actualProductName = await inventoryPage.getInventoryItemText();
  expect(actualProductName) .toContain('Sauce Labs');
});