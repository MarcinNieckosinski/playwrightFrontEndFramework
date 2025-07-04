import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import {generateRandomWord} from '../utils/DataGenerator';

test('logout button should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.logoutButton.click();
    await expect(page).toHaveURL('https://demo-bank.vercel.app/index.html');
});

test('logo and timer should be visible after login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(dashboardPage.logo).toBeVisible();
    await expect(dashboardPage.sessionTime).toBeVisible();
});

test('categories in menu should be visible after login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const categories = Object.values(dashboardPage.categories);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    categories.forEach((category) => {
        expect(category).toBeVisible();
    });
});

test('headers should be visible on dashboard', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(dashboardPage.personalAccount.personalAccountsHeader).toBeVisible();
    await expect(dashboardPage.savingsAccounts.savingsAccountsHeader).toBeVisible();
    await expect(dashboardPage.deposit.depositsHeader).toBeVisible();
    await expect(dashboardPage.debitCard.debitCardsHeader).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardsHeader).toBeVisible();
    await expect(dashboardPage.loans.loansHeader).toBeVisible();
    await expect(dashboardPage.insurance.insuranceHeader).toBeVisible();
});

test('personal accounts should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.personalAccount.accountDetailsRow.click();
    await expect(dashboardPage.personalAccount.accountLocksRow).toBeVisible();
    await expect(dashboardPage.personalAccount.accountLimitsRow).toBeVisible();
    await expect(dashboardPage.personalAccount.accountOwnerRow).toBeVisible();
});

test('quick transfer on dashboard should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.quickTransfer.quickTransferReceiverDropdown.selectOption('Michael Scott');
    await dashboardPage.quickTransfer.quickTransferAmountInput.fill('1000');
    await dashboardPage.quickTransfer.quickTransferTitleInput.fill('title');
    await dashboardPage.quickTransfer.quickTransferButton.click();
    await expect(dashboardPage.quickTransfer.quickTransferSuccessDialog).toBeVisible();
    await expect(dashboardPage.quickTransfer.quickTransferSuccessDialog).toContainText('Michael Scott');
})