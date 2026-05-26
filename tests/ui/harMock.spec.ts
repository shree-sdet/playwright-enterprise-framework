import { test, expect } from '../../fixtures/baseFixture';

test.use({
    contextOptions: {
        recordHar: {
           path: 'mocks/saucedemo.har'
        }
    }
});

test('HAR recording example', async ({page}) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
});

test('HAR replay example', async ({ page}) => {

    await page.context().routeFromHAR('mocks/saucedemo.har');
    await page.goto('/');
    await expect(page).toHaveTitle(/Swag Labs/);
});