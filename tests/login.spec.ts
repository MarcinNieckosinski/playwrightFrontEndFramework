import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {generateRandomWord} from '../utils/DataGenerator';
import loginPageData from '../data/login_page.json';

test('User can log in with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(page).toHaveURL(loginPageData.dashboardUrl);
});

test('There is an error message when logging in with empty username and password', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginWithEmptyUsernameAndPassword();
    await expect(loginPage.usernameInputError).toHaveText(loginPageData.emptyInputError);
    await expect(loginPage.passwordInputError).toHaveText(loginPageData.emptyInputError);
});

test('There is an error message when logging in with too short username and password', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameInput.fill(generateRandomWord(4));
    await loginPage.passwordInput.fill(generateRandomWord(4));
    await loginPage.usernameInput.click();
    expect(await loginPage.usernameInputError.textContent()).toContain(loginPageData.tooShortUsernameError);
    expect(await loginPage.passwordInputError.textContent()).toContain(loginPageData.tooShortPasswordError);
});

test('There is a tooltip with information about username requirements', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.usernameTooltip.hover();
    const tooltipText = await loginPage.usernameTooltipSpan.textContent();
    expect(tooltipText).toContain(loginPageData.usernameTooltipTextPart1);
    expect(tooltipText).toContain(loginPageData.usernameTooltipTextPart2);
});

test('There is a tooltip with information about password requirements', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.passwordTooltip.hover();
    const tooltipText = await loginPage.passwordTooltipSpan.textContent();
    expect(tooltipText).toContain(loginPageData.passwordTooltipTextPart1);
    expect(tooltipText).toContain(loginPageData.passwordTooltipTextPart2);
    expect(tooltipText).toContain(loginPageData.passwordTooltipTextPart3);
});

test('There is working keyboard icon for username input', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.usernameKeyboard).toBeVisible();
    await loginPage.usernameKeyboard.click();
    await expect(loginPage.uiKeyboard).toBeVisible();
});

test('There is working keyboard icon for password input', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.passwordKeyboard).toBeVisible();
    await loginPage.passwordKeyboard.click();
    await expect(loginPage.uiKeyboard).toBeVisible();
});

test('User can click on the security link', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await expect(loginPage.securityLink).toBeVisible();
    await loginPage.securityLink.click();
    await expect(page).toHaveURL(loginPageData.securityUrl);
});