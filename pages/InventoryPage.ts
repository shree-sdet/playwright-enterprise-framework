import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

    readonly inventoryTitle: Locator;
    readonly removeBackpackButton: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {

        super(page);
        this.inventoryTitle = page.locator('.title');
        this.removeBackpackButton = page.locator('#remove-sauce-labs-backpack');
        this.cartBadge = page.locator('.shopping_cart_badge');

    }

    async verifyInventoryPageLoaded() {
        await expect(this.inventoryTitle).toHaveText('Products');
    }

    async getInventoryItemText() {
        return await this.page.locator('.inventory_item_name').first().textContent();
    }

    async addBackpackToCart() {
        await this.page.locator('.inventory_item:has-text("Sauce Labs Backpack") button').click();
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