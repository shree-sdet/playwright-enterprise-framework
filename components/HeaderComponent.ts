import { Locator, Page } from '@playwright/test';

export class HeaderComponent {

    readonly page: Page;
    readonly menuButton: Locator;
    readonly logoutLink: Locator;
    readonly cartIcon: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    async clickCartIcon() {
        await this.cartIcon.click();
    }
}