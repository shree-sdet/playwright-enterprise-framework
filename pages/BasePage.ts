import { Page, Locator } from '@playwright/test';

export class BasePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string) {
        await this.page.goto(url);
    }

    async clickElement(locator: Locator) {
        await locator.click();
    }

    async fillInput(locator: Locator, text: string) {
        await locator.fill(text);
    }

    async getPageTitle() {
        return await this.page.title();
    }
}