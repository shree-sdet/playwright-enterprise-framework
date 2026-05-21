import { Page, Locator, expect } from '@playwright/test';

import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {

    readonly inventoryTitle: Locator;

    constructor(page: Page) {

        super(page);

        this.inventoryTitle = page.locator('.title');
    }

    async verifyInventoryPageLoaded() {

        await expect(this.inventoryTitle).toHaveText('Products');
    }
}