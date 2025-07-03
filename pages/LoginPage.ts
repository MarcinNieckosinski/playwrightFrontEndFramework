import {Page, Locator} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly usernameInputError: Locator;
    readonly passwordInputError: Locator;
    readonly usernameTooltip: Locator;
    readonly passwordTooltip: Locator;
    readonly usernameTooltipSpan: Locator;
    readonly passwordTooltipSpan: Locator;
    readonly securityLink: Locator;
    readonly usernameKeyboard: Locator;
    readonly passwordKeyboard: Locator;
    readonly uiKeyboard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input#login_id');
        this.passwordInput = page.locator('input#login_password');
        this.loginButton = page.locator('button#login-btn');
        this.usernameInputError = page.locator('div#error_login_id');
        this.passwordInputError = page.locator('div#error_login_password');
        this.usernameTooltip = page.locator('#login_id_container > div.login-tooltip-wrapper > div > i');
        this.passwordTooltip = page.locator('#login_password_container > div.login-tooltip-wrapper > div > i');
        this.usernameTooltipSpan = page.locator('#login_id_container > div.login-tooltip-wrapper > div > i > span');
        this.passwordTooltipSpan = page.locator('#login_password_container > div.login-tooltip-wrapper > div > i > span');
        this.securityLink = page.locator('a[data-testid="security-link"]');
        this.usernameKeyboard = page.locator('#kb_login_id');
        this.passwordKeyboard = page.locator('#login_password_container > div.login-kb.ms-hide > i');
        this.uiKeyboard = page.locator('div.ui-keyboard');
    }

    async goto() {
        await this.page.goto('https://demo-bank.vercel.app/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginWithEmptyUsernameAndPassword() {
        await this.usernameInput.click();
        await this.passwordInput.click();
        await this.usernameInput.click();
    }
}