import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import { QuickTransferPage } from '../pages/QuickTransferPage';
import {generateRandomWord} from '../utils/DataGenerator';
import quickTransferData from '../data/quick_transfer_page.json';

test('Quick transfer form should be visible', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const quickTransferPage = new QuickTransferPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.quickTransferCategory.click();
    await expect(quickTransferPage.quickTransferForm).toBeVisible();
});

test('Quick transfer form should work', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const quickTransferPage = new QuickTransferPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.quickTransferCategory.click();
    await quickTransferPage.receiverDropdown.selectOption(quickTransferData.receiver);
    await quickTransferPage.amountInput.fill(quickTransferData.amount);
    await quickTransferPage.titleInput.fill(quickTransferData.title);
    await quickTransferPage.executeButton.click();
    await expect(quickTransferPage.quickTransferSuccessDialog).toBeVisible();
    await expect(quickTransferPage.quickTransferSuccessDialog).toContainText(quickTransferData.receiver);
    await expect(quickTransferPage.quickTransferSuccessDialog).toContainText(quickTransferData.amount);
    await expect(quickTransferPage.quickTransferSuccessDialog).toContainText(quickTransferData.title);
});

test('Quick transfer form errors should be visible when executed with no data', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const quickTransferPage = new QuickTransferPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.quickTransferCategory.click();
    await quickTransferPage.executeButton.click();
    await expect(quickTransferPage.receiverDropdownError).toBeVisible();
    await expect(quickTransferPage.receiverDropdownError).toContainText(quickTransferData.errorText);
    await expect(quickTransferPage.amountInputError).toBeVisible();
    await expect(quickTransferPage.amountInputError).toContainText(quickTransferData.errorText);
    await expect(quickTransferPage.titleInputError).toBeVisible();
    await expect(quickTransferPage.titleInputError).toContainText(quickTransferData.errorText);
});

test('Quick transfer form tooltip should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const quickTransferPage = new QuickTransferPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.quickTransferCategory.click();
    await quickTransferPage.tooltip.hover();
    const tooltipText = await quickTransferPage.tooltipSpan.textContent();
    expect(tooltipText).toContain(quickTransferData.tooltipMessagePart1);
    expect(tooltipText).toContain(quickTransferData.tooltipMessagePart2);
});