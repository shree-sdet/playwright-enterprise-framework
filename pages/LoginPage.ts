import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { envConfig } from '../config/env';

export class LoginPage extends BasePage {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {

        super(page);

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async navigateToLoginPage() {
        await this.navigate(envConfig.baseURL);
    }

    async login(username: string, password: string) {
        await this.fillInput(this.usernameInput, username);
        await this.fillInput(this.passwordInput, password);
        await this.clickElement(this.loginButton);
    }
}