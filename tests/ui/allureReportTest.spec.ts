import { test, expect } from '../../fixtures/baseFixture';
import * as allure from 'allure-js-commons';

test('Get users API test @api @smoke', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
    // Attach API response to Allure report
    await test.info().attach('API Response',
        {
            body: JSON.stringify(
                responseBody,
                null,
                2
            ),
            contentType: 'application/json'
        }
    );

});

//intentional failure test to validate screenshot attachment in allure report
test.fail('incorrect product to cart', async ({
    inventoryPage,
}) => {
    await allure.severity('critical');
    await allure.owner('Shree SDET');
    await allure.feature('Cart Functionality');
    
     await test.step('Add product to cart', async () => {
        await inventoryPage.addProductToCart('Sauce Labs dark');
    });
    await test.step('Validate cart badge count', async () => {
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toBe('1');
    });

});