import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import {generateRandomWord} from '../utils/DataGenerator';
import dashboardPageData from '../data/dashboard_page.json';

test('logout button should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.logoutButton.click();
    await expect(page).toHaveURL(dashboardPageData.loginUrl);
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
    await expect(dashboardPage.personalAccount.accountLocksRow).toContainText(dashboardPageData.accountLocksText);
    await expect(dashboardPage.personalAccount.accountLocksRow).toContainText(dashboardPageData.accountLocksValue);
    await expect(dashboardPage.personalAccount.accountLimitsRow).toBeVisible();
    await expect(dashboardPage.personalAccount.accountLimitsRow).toContainText(dashboardPageData.accountLimitsText);
    await expect(dashboardPage.personalAccount.accountLimitsRow).toContainText(dashboardPageData.accountLimitsValue);
    await expect(dashboardPage.personalAccount.accountOwnerRow).toBeVisible();
    await expect(dashboardPage.personalAccount.accountOwnerRow).toContainText(dashboardPageData.accountOwnerText);
    await expect(dashboardPage.personalAccount.accountOwnerRow).toContainText(dashboardPageData.accountOwnerValue);
    await dashboardPage.personalAccount.accountDetailsRow.click();
    await expect(dashboardPage.personalAccount.accountLocksRow).not.toBeInViewport();
});

test('quick transfer on dashboard should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.quickTransfer.quickTransferReceiverDropdown.selectOption(dashboardPageData.quickTransferReceiverOption);
    await dashboardPage.quickTransfer.quickTransferAmountInput.fill(dashboardPageData.quickTransferAmountValue);
    await dashboardPage.quickTransfer.quickTransferTitleInput.fill(dashboardPageData.quickTransferTitleValue);
    await dashboardPage.quickTransfer.quickTransferButton.click();
    await expect(dashboardPage.quickTransfer.quickTransferSuccessDialog).toBeVisible();
    await expect(dashboardPage.quickTransfer.quickTransferSuccessDialog).toContainText(dashboardPageData.quickTransferReceiverOption);
});

test('there are error messages for quick transfer with empty fields', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.quickTransfer.quickTransferButton.click();
    await expect(dashboardPage.quickTransfer.quickTransferReceiverError).toBeVisible();
    await expect(dashboardPage.quickTransfer.quickTransferReceiverError).toHaveText(dashboardPageData.mandatoryField);
    await expect(dashboardPage.quickTransfer.quickTransferAmountError).toBeVisible();
    await expect(dashboardPage.quickTransfer.quickTransferAmountError).toHaveText(dashboardPageData.mandatoryField);
    await expect(dashboardPage.quickTransfer.quickTransferTitleError).toBeVisible();
    await expect(dashboardPage.quickTransfer.quickTransferTitleError).toHaveText(dashboardPageData.mandatoryField);
});

test('last transactions section should be visible', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(dashboardPage.lastTransactionsBox).toBeVisible();
});

test('phone top up should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.phoneTopUp.phoneTopUpDropdown.selectOption(dashboardPageData.phoneTopUpOption);
    await dashboardPage.phoneTopUp.phoneTopUpAmountInput.fill(dashboardPageData.phoneTopUpAmount);
    await dashboardPage.phoneTopUp.phoneTopUpCheckbox.check();
    await dashboardPage.phoneTopUp.phoneTopUpButton.click();
    await expect(dashboardPage.phoneTopUp.phoneTopUpSuccessDialog).toBeVisible();
    await expect(dashboardPage.phoneTopUp.phoneTopUpSuccessDialog).toContainText(dashboardPageData.phoneTopUpAmount);
    await expect(dashboardPage.phoneTopUp.phoneTopUpSuccessDialog).toContainText(dashboardPageData.phoneTopUpOption);
});

test('there are error messages for empty fields in phone top up', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.phoneTopUp.phoneTopUpButton.click();
    await expect(dashboardPage.phoneTopUp.phoneTopUpDropdownError).toBeVisible();
    await expect(dashboardPage.phoneTopUp.phoneTopUpDropdownError).toHaveText(dashboardPageData.mandatoryField);
    await expect(dashboardPage.phoneTopUp.phoneTopUpAmountError).toBeVisible();
    await expect(dashboardPage.phoneTopUp.phoneTopUpAmountError).toHaveText(dashboardPageData.mandatoryField);
    await expect(dashboardPage.phoneTopUp.phoneTopUpCheckboxError).toBeVisible();
    await expect(dashboardPage.phoneTopUp.phoneTopUpCheckboxError).toHaveText(dashboardPageData.mandatoryField);
});

test('finance manager should be working', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await expect(dashboardPage.financeManager.financeManagerBox).toBeVisible();
    await dashboardPage.financeManager.financeManagerDropdown.selectOption(dashboardPageData.financeManagerOption);
    await expect(dashboardPage.financeManager.financeManagerChart).toContainText(dashboardPageData.financeManagerChartValue);
});

test('savings accounts should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.savingsAccounts.savingsAccountsRow.click();
    await expect(dashboardPage.savingsAccounts.savingsAccountTypeRow).toBeVisible();
    await expect(dashboardPage.savingsAccounts.savingsAccountTypeRow).toContainText(dashboardPageData.savingsAccountsTypeText);
    await expect(dashboardPage.savingsAccounts.savingsAccountTypeRow).toContainText(dashboardPageData.savingsAccountsTypeValue);
    await expect(dashboardPage.savingsAccounts.savingsAccountPercentageRow).toBeVisible();
    await expect(dashboardPage.savingsAccounts.savingsAccountPercentageRow).toContainText(dashboardPageData.savingsAccountsPercentageText);
    await expect(dashboardPage.savingsAccounts.savingsAccountPercentageRow).toContainText(dashboardPageData.savingsAccountsPercentageValue);
    await dashboardPage.savingsAccounts.savingsAccountsRow.click();
    await expect(dashboardPage.savingsAccounts.savingsAccountTypeRow).not.toBeInViewport();
});

test('deposits accounts should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.deposit.depositsRow.click();
    await expect(dashboardPage.deposit.depositsTypeRow).toBeVisible();
    await expect(dashboardPage.deposit.depositsTypeRow).toContainText(dashboardPageData.depositsTypeText);
    await expect(dashboardPage.deposit.depositsTypeRow).toContainText(dashboardPageData.depositsTypeValue);
    await expect(dashboardPage.deposit.depositsTimeRow).toBeVisible();
    await expect(dashboardPage.deposit.depositsTimeRow).toContainText(dashboardPageData.depositsTimeText);
    await expect(dashboardPage.deposit.depositsTimeRow).toContainText(dashboardPageData.depositsTimeValue);
    await expect(dashboardPage.deposit.depositsPercentageRow).toBeVisible();
    await expect(dashboardPage.deposit.depositsPercentageRow).toContainText(dashboardPageData.depositsPercentageText);
    await expect(dashboardPage.deposit.depositsPercentageRow).toContainText(dashboardPageData.depositsPercentageValue);
    await dashboardPage.deposit.depositsRow.click();
    await expect(dashboardPage.deposit.depositsTypeRow).not.toBeInViewport();
});

test('debit cards should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.debitCard.debitCardsRow.click();
    await expect(dashboardPage.debitCard.debitCardNumberRow).toBeVisible();
    await expect(dashboardPage.debitCard.debitCardNumberRow).toContainText(dashboardPageData.debitCardNumberText);
    await expect(dashboardPage.debitCard.debitCardNumberRow).toContainText(dashboardPageData.debitCardNumberValue);
    await expect(dashboardPage.debitCard.debitCardStatusRow).toBeVisible();
    await expect(dashboardPage.debitCard.debitCardStatusRow).toContainText(dashboardPageData.debitCardStatusText);
    await expect(dashboardPage.debitCard.debitCardStatusRow).toContainText(dashboardPageData.debitCardStatusValue);
    await expect(dashboardPage.debitCard.debitCardAccountRow).toBeVisible();
    await expect(dashboardPage.debitCard.debitCardAccountRow).toContainText(dashboardPageData.debitCardAccountText);
    await expect(dashboardPage.debitCard.debitCardAccountRow).toContainText(dashboardPageData.debitCardAccountValue);
    await dashboardPage.debitCard.debitCardsRow.click();
    await expect(dashboardPage.debitCard.debitCardNumberRow).not.toBeInViewport();
});

test('credit cards should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.creditCard.creditCardsRow.click();
    await expect(dashboardPage.creditCard.creditCardNumberRow).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardNumberRow).toContainText(dashboardPageData.creditCardNumberText);
    await expect(dashboardPage.creditCard.creditCardNumberRow).toContainText(dashboardPageData.creditCardNumberValue);
    await expect(dashboardPage.creditCard.creditCardStatusRow).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardStatusRow).toContainText(dashboardPageData.creditCardStatusText);
    await expect(dashboardPage.creditCard.creditCardStatusRow).toContainText(dashboardPageData.creditCardStatusValue);
    await expect(dashboardPage.creditCard.creditCardRepaymentNowRow).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardRepaymentNowRow).toContainText(dashboardPageData.creditCardRepaymentNowText);
    await expect(dashboardPage.creditCard.creditCardRepaymentNowRow).toContainText(dashboardPageData.creditCardRepaymentNowValue);
    await expect(dashboardPage.creditCard.creditCardMinimumRepaymentRow).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardMinimumRepaymentRow).toContainText(dashboardPageData.creditCardMinimumRepaymentText);
    await expect(dashboardPage.creditCard.creditCardMinimumRepaymentRow).toContainText(dashboardPageData.creditCardMinimumRepaymentValue);
    await expect(dashboardPage.creditCard.creditCardArrearsRow).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardArrearsRow).toContainText(dashboardPageData.creditCardArrearsText);
    await expect(dashboardPage.creditCard.creditCardArrearsRow).toContainText(dashboardPageData.creditCardArrearsValue);
    await expect(dashboardPage.creditCard.creditCardPaymentDeadlineRow).toBeVisible();
    await expect(dashboardPage.creditCard.creditCardPaymentDeadlineRow).toContainText(dashboardPageData.creditCardPaymentDeadlineText);
    await expect(dashboardPage.creditCard.creditCardPaymentDeadlineRow).toContainText(dashboardPageData.creditCardPaymentDeadlineValue);
    await dashboardPage.creditCard.creditCardsRow.click();
    await expect(dashboardPage.creditCard.creditCardNumberRow).not.toBeInViewport();
});

test('loans should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.loans.loanRow.click();
    await expect(dashboardPage.loans.loanNearestPaymentDateRow).toBeVisible();
    await expect(dashboardPage.loans.loanNearestPaymentDateRow).toContainText(dashboardPageData.loanNearestDateText);
    await expect(dashboardPage.loans.loanNearestPaymentDateRow).toContainText(dashboardPageData.loanNearestDateValue);
    await expect(dashboardPage.loans.loanNearestPaymentAmountRow).toBeVisible();
    await expect(dashboardPage.loans.loanNearestPaymentAmountRow).toContainText(dashboardPageData.loanNearestAmountText);
    await expect(dashboardPage.loans.loanNearestPaymentAmountRow).toContainText(dashboardPageData.loanNearestAmountValue);
    await expect(dashboardPage.loans.loanAccountNumberRow).toBeVisible();
    await expect(dashboardPage.loans.loanAccountNumberRow).toContainText(dashboardPageData.loanAccountNumberText);
    await expect(dashboardPage.loans.loanAccountNumberRow).toContainText(dashboardPageData.loanAccountNumberValue);
    await dashboardPage.loans.loanRow.click();
    await expect(dashboardPage.loans.loanAccountNumberRow).not.toBeInViewport();
    await dashboardPage.loans.debitRow.click();
    await expect(dashboardPage.loans.debitMinimumPaymentRow).toBeVisible();
    await expect(dashboardPage.loans.debitMinimumPaymentRow).toContainText(dashboardPageData.debitMinimumPaymentText);
    await expect(dashboardPage.loans.debitMinimumPaymentRow).toContainText(dashboardPageData.debitMinimumPaymentValue);
    await expect(dashboardPage.loans.debitAccountNumberRow).toBeVisible();
    await expect(dashboardPage.loans.debitAccountNumberRow).toContainText(dashboardPageData.debitAccountText);
    await expect(dashboardPage.loans.debitAccountNumberRow).toContainText(dashboardPageData.debitAccountValue);
    await expect(dashboardPage.loans.debitAmountRow).toBeVisible();
    await expect(dashboardPage.loans.debitAmountRow).toContainText(dashboardPageData.debitAmountText);
    await expect(dashboardPage.loans.debitAmountRow).toContainText(dashboardPageData.debitAmountValue);
    await dashboardPage.loans.debitRow.click();
    await expect(dashboardPage.loans.debitMinimumPaymentRow).not.toBeInViewport();
});

test('insurances should be expandable', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.insurance.assistanceInsuranceRow.click();
    await expect(dashboardPage.insurance.assistanceDetailsRow).toBeVisible();
    await expect(dashboardPage.insurance.assistanceDetailsRow).toContainText(dashboardPageData.insuranceDetailsText);
    await expect(dashboardPage.insurance.assistanceDetailsRow).toContainText(dashboardPageData.insuranceDetailsValue);
    await expect(dashboardPage.insurance.assistanceCompanyRow).toBeVisible();
    await expect(dashboardPage.insurance.assistanceCompanyRow).toContainText(dashboardPageData.insuranceCompanyText);
    await expect(dashboardPage.insurance.assistanceCompanyRow).toContainText(dashboardPageData.insuranceCompanyValue);
    await expect(dashboardPage.insurance.assistanceInsuredRow).toBeVisible();
    await expect(dashboardPage.insurance.assistanceInsuredRow).toContainText(dashboardPageData.insuranceInsuredText);
    await expect(dashboardPage.insurance.assistanceInsuredRow).toContainText(dashboardPageData.insuranceInsuredValue);
    await expect(dashboardPage.insurance.assistanceAccountRow).toBeVisible();
    await expect(dashboardPage.insurance.assistanceAccountRow).toContainText(dashboardPageData.insuranceAccountText);
    await expect(dashboardPage.insurance.assistanceAccountRow).toContainText(dashboardPageData.insuranceAccountValue);
    await dashboardPage.insurance.assistanceInsuranceRow.click();
    await expect(dashboardPage.insurance.assistanceDetailsRow).not.toBeInViewport();
});

test('quick transfer category should transfer user to quick transfer page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.quickTransferCategory.click();
    await expect(page).toHaveURL(dashboardPageData.quickTransferUrl);
});

test('phone top up category should transfer user to phone top up page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.phoneTopUpCategory.click();
    await expect(page).toHaveURL(dashboardPageData.phoneTopUpUrl);
});

test('finance manager category should transfer user to finance manager page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.financeManagerCategory.click();
    await expect(page).toHaveURL(dashboardPageData.financeManagerUrl);
});

test('personal accounts category should transfer user to personal accounts page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.personalAccountsCategory.click();
    await expect(page).toHaveURL(dashboardPageData.personalAccountsUrl);
});

test('payments category should transfer user to payments page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.paymentsCategory.click();
    await expect(page).toHaveURL(dashboardPageData.paymentsUrl);
});

test('reports category should transfer user to reports page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.reportsCategory.click();
    await expect(page).toHaveURL(dashboardPageData.reportsUrl);
});

test('reports iframe category should transfer user to reports iframe page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.reportsIFrameCategory.click();
    await expect(page).toHaveURL(dashboardPageData.reportsIframeUrl);
});

test('transfer generate category should transfer user to transfer generate page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.transferGenerateCategory.click();
    await expect(page).toHaveURL(dashboardPageData.transferGenerateUrl);
});

test('charts category should transfer user to charts page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.chartsCategory.click();
    await expect(page).toHaveURL(dashboardPageData.chartsUrl);
});

test('datatables category should transfer user to datatables page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.dataTablesCategory.click();
    await expect(page).toHaveURL(dashboardPageData.datatablesUrl);
});

test('settings category should transfer user to settings page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomWord(8), generateRandomWord(8));
    await dashboardPage.categories.settingsCategory.click();
    await expect(page).toHaveURL(dashboardPageData.settingsUrl);
});