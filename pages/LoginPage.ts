import {Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input#login_id');
        this.passwordInput = page.locator('input#login_password');
        this.loginButton = page.locator('button#login-btn');
    }

    async goto() {
        await this.page.goto('https://demo-bank.vercel.app/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}