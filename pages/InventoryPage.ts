import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

    readonly inventoryTitle: Locator;
    readonly removeBackpackButton: Locator;
    readonly cartBadge: Locator;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {

        super(page);
        this.inventoryTitle = page.locator('.title');
        this.removeBackpackButton = page.locator('#remove-sauce-labs-backpack');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');

    }

    async verifyInventoryPageLoaded() {
        await this.page.waitForLoadState('load');
        await expect(this.inventoryTitle).toHaveText('Products');
    }

    async getInventoryItemText() {
        const locator = this.page.locator('.inventory_item_name').first();
        // Wait for element AND parent container to be visible
        await this.page.locator('.inventory_item').first().waitFor({ state: 'visible', timeout: 5000 });
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        return await locator.textContent();
    }

    // async addBackpackToCart() {
    //     await this.page.locator('.inventory_item:has-text("Sauce Labs Backpack") button').click();
    // }

    async addProductToCart(productName: string) {
        // Add retry logic for better reliability
        const locator = this.page.locator(`.inventory_item:has-text("${productName}") button`);
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        await locator.click({ timeout: 5000 });
    }

    async removeBackpackFromCart() {
        await this.removeBackpackButton.click();
    }

    async getCartBadgeCount() {
        return await this.cartBadge.textContent();
    }

    async getInventoryItemByName(productName: string) {
        return this.page.locator('.inventory_item_name', { hasText: productName });
    }


}