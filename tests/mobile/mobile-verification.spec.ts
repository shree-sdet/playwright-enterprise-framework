import { expect, test } from '../../fixtures/baseFixture';
import { getLoginUser } from '../../utils/testDataManager';

// Mobile verification tests to ensure the application behaves correctly on mobile devices, including viewport checks, menu functionality, offline behavior, and handling of slow networks and API failures.
    test('Verify mobile viewport @mobile', async ({ page }) => {
        test.skip(
            !test.info().project.name.includes('Mobile'),
            'Mobile only test'
        );
        await page.goto('/');
        const viewport = page.viewportSize();
        expect(viewport?.width).toBeLessThan(600);

    });

    test('Verify hamburger menu on mobile @mobile', async ({ loginPage, inventoryPage }) => {
        test.skip(
            !test.info().project.name.includes('Mobile'),
            'Mobile only test'
        );
        const validUser = getLoginUser('validUser');
        await loginPage.navigateToLoginPage();
        await loginPage.login(validUser.username, validUser.password);
        await inventoryPage.menuButton.click();
        await expect(inventoryPage.logoutLink).toBeVisible();

    });

// Additional tests to verify app behavior under various conditions on mobile devices, such as offline mode, slow network, and API failures.
test.fail('Verify app behavior when offline', async ({ browser }) => {
    test.skip(
        !test.info().project.name.includes('Mobile'),
        'Mobile only test'
    );
    const context = await browser.newContext();
    await context.setOffline(true);
    const page = await context.newPage();

    await page.goto('https://www.saucedemo.com');

    await expect(page.locator('body')).toBeVisible();

});

test('Verify login on slow network', async ({ loginPage }) => {
    test.skip(
        !test.info().project.name.includes('Mobile'),
        'Mobile only test'
    );
    await loginPage.page.route('**/*', async route => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        await route.continue();
    });

    await loginPage.navigateToLoginPage();

});

test('Verify app handles API failure @mobile', async ({ page }) => {
    test.skip(
        !test.info().project.name.includes('Mobile'),
        'Mobile only test'
    );
    await page.route('**/inventory.html',
        route => route.abort()
    );
    await page.goto('/');
});