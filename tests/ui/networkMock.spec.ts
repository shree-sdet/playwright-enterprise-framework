 import { test, expect } from '../../fixtures/baseFixture';

// test('Mock API response example', async ({page}) => {

//     // INTERCEPT NETWORK REQUEST
//     // await page.route('**/inventory.html',
//     //     async route => {
//     //       console.log('Intercepted Request');
//     //     await route.continue();
//     //     }
//     // );

//     // await page.goto('/inventory.html');
//     // await expect(page).toHaveURL(/inventory/);

// });


test.describe('Network Mocking Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Clear all routes before each test in this suite
        await page.unroute('**/*');
    });

    test('Mock API response example', async ({ page }) => {
        // Set up route BEFORE navigation
        await page.route('**/api/**', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    mocked: true
                })
            });
        });

        await page.goto('/inventory.html');
        await expect(page).toHaveURL(/inventory/);
    });

    test.afterEach(async ({ page }) => {
        // Clean up routes after each test
        await page.unroute('**/*');
    });
});