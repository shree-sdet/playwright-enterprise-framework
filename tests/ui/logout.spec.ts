import { test, expect } from '../../fixtures/baseFixture';

test('User should logout successfully', async ({
  page,
  headerComponent
}) => {

    await page.goto('/inventory.html');
    await headerComponent.logout();
    await expect(page).toHaveURL(/saucedemo/);
});