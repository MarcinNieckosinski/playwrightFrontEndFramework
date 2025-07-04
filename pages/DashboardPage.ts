import {Page, Locator} from '@playwright/test';

interface Categories {
    myDashboardCategory: Locator;
    quickTransferCategory: Locator;
    phoneTopUpCategory: Locator;
    financeManagerCategory: Locator;
    personalAccountsCategory: Locator;
    paymentsCategory: Locator;
    reportsCategory: Locator;
    reportsIFrameCategory: Locator;
    transferGenerateCategory: Locator;
    chartsCategory: Locator;
    dataTablesCategory: Locator;
    settingsCategory: Locator;
}

interface PersonalAccount {
    personalAccountsHeader: Locator;
    accountDetailsRow: Locator;
    accountLocksRow: Locator;
    accountLimitsRow: Locator;
    accountOwnerRow: Locator;
}

interface QuickTransfer {
    quickTransferBox: Locator;
    quickTransferReceiverDropdown: Locator;
    quickTransferReceiverError: Locator;
    quickTransferAmountInput: Locator;
    quickTransferAmountError: Locator;
    quickTransferTitleInput: Locator;
    quickTransferTitleError: Locator;
    quickTransferButton: Locator;
    quickTransferSuccessDialog: Locator;
}

interface PhoneTopUp {
    phoneTopUpBox: Locator;
    phoneTopUpDropdown: Locator;
    phoneTopUpDropdownError: Locator;
    phoneTopUpAmountInput: Locator;
    phoneTopUpAmountError: Locator;
    phoneTopUpCheckbox: Locator;
    phoneTopUpCheckboxError: Locator;
    phoneTopUpButton: Locator;
}

interface FinanceManager {
    financeManagerBox: Locator;
    financeManagerDropdown: Locator;
    financeManagerChart: Locator;
}

interface SavingsAccounts {
    savingsAccountsHeader: Locator;
    savingsAccountsRow: Locator;
    savingsAccountTypeRow: Locator;
    savingsAccountPercentageRow: Locator;
}

interface Deposit {
    depositsHeader: Locator;
    depositsRow: Locator;
    depositsTypeRow: Locator;
    depositsTimeRow: Locator;
    depositsPercentageRow: Locator;
}

interface DebitCards {
    debitCardsHeader: Locator;
    debitCardsRow: Locator;
    debitCardNumberRow: Locator;
    debitCardStatusRow: Locator;
    debitCardAccountRow: Locator;
}

interface CreditCard {
    creditCardsHeader: Locator;
    creditCardsRow: Locator;
    creditCardNumberRow: Locator;
    creditCardStatusRow: Locator;
    creditCardRepaymentNowRow: Locator;
    creditCardMinimumRepaymentRow: Locator;
    creditCardArrearsRow: Locator;
    creditCardPaymentDeadlineRow: Locator;
}

interface Loans {
    loansHeader: Locator;
    loanRow: Locator;
    loanNearestPaymentDateRow: Locator;
    loanNearestPaymentAmountRow: Locator;
    loanAccountNumberRow: Locator;
    debitRow: Locator;
    debitMinimumPaymentRow: Locator;
    debitAccountNumberRow: Locator;
    debitAmountRow: Locator;
}

interface Insurance {
    insuranceHeader: Locator;
    assistanceInsuranceRow: Locator;
    assistanceDetailsRow: Locator;
    assistanceCompanyRow: Locator;
    assistanceInsuredRow: Locator;
    assistanceAccountRow: Locator;
}

export class DashboardPage {
    readonly page: Page;
    readonly logo: Locator;
    readonly logoutButton: Locator;
    readonly sessionTime: Locator;
    readonly categories: Categories = {} as Categories;
    readonly personalAccount: PersonalAccount = {} as PersonalAccount;
    readonly quickTransfer: QuickTransfer = {} as QuickTransfer;
    readonly lastTransactionsBox: Locator = {} as Locator;
    readonly phoneTopUp: PhoneTopUp = {} as PhoneTopUp;
    readonly financeManager: FinanceManager = {} as FinanceManager;
    readonly savingsAccounts: SavingsAccounts = {} as SavingsAccounts;
    readonly deposit: Deposit = {} as Deposit;
    readonly debitCard: DebitCards = {} as DebitCards;
    readonly creditCard: CreditCard = {} as CreditCard;
    readonly loans: Loans = {} as Loans;
    readonly insurance: Insurance = {} as Insurance;

    constructor(page: Page) {
        const ACCOUNT_DETAILS_LOCATOR = '#accounts_list > article > div.row.account-details.box-white.table-alike';
        const SAVINGS_ACCOUNTS_ROW = '#aggregation_list > section:nth-child(1) > div.dashboard-list > article';
        const DEPOSIT_ROW = '#aggregation_list > section:nth-child(2) > div > article';
        const DEBIT_CARDS_ROW = '#aggregation_list > section:nth-child(3) > div.dashboard-list > article';
        const CREDIT_CARDS_ROW = '#aggregation_list > section:nth-child(4) > div.dashboard-list > article';
        const LOAN_ROW = '#aggregation_list > section:nth-child(5) > div.dashboard-list > article:nth-child(1)';
        const DEBIT_ROW = '#aggregation_list > section:nth-child(5) > div.dashboard-list > article:nth-child(2)';
        const ASSISTANCE_INSURANCE_ROW = '#aggregation_list > section:nth-child(6) > div.dashboard-list > article';

        function DIV_ROW_NTH_CHILD(n: number): string {
            return ` > div.row.account-details.hide > div > div:nth-child(${n})`
        }

        this.page = page;

        this.logo = page.locator('a.logo');
        this.logoutButton = page.locator('#log_out');
        this.sessionTime = page.locator('div.user-session');

        this.categories.myDashboardCategory = page.locator('i#pulpit_btn');
        this.categories.quickTransferCategory = page.locator('i#quick_btn');
        this.categories.phoneTopUpCategory = page.locator('i#phone_btn');
        this.categories.financeManagerCategory = page.locator('i#manager_fin_btn');
        this.categories.personalAccountsCategory = page.locator('i#privaccounts_btn');
        this.categories.paymentsCategory = page.locator('i#payments_btn');
        this.categories.reportsCategory = page.locator('i#reports_btn');
        this.categories.reportsIFrameCategory = page.locator('i#reports_iframe_btn');
        this.categories.transferGenerateCategory = page.locator('i#user_reports_btn');
        this.categories.chartsCategory = page.locator('i#charts_btn');
        this.categories.dataTablesCategory = page.locator('i#tables_btn');
        this.categories.settingsCategory = page.locator('i#settings_btn');

        this.personalAccount.personalAccountsHeader = page.locator('#main_content > section > h1');
        this.personalAccount.accountDetailsRow = page.locator(ACCOUNT_DETAILS_LOCATOR);
        this.personalAccount.accountLocksRow = page.locator(ACCOUNT_DETAILS_LOCATOR + '.active > div.row.table-details.hide > div > div:nth-child(1)');
        this.personalAccount.accountLimitsRow = page.locator(ACCOUNT_DETAILS_LOCATOR + '.active > div.row.table-details.hide > div > div:nth-child(2)');
        this.personalAccount.accountOwnerRow = page.locator(ACCOUNT_DETAILS_LOCATOR + '.active > div.row.table-details.hide > div > div:nth-child(3)');

        this.quickTransfer.quickTransferBox = page.locator('#accounts_list > article > div.grid.accounts-widgets > div:nth-child(1)');
        this.quickTransfer.quickTransferReceiverDropdown = page.locator('#widget_1_transfer_receiver');
        this.quickTransfer.quickTransferReceiverError = page.locator('#error_widget_1_transfer_receiver');
        this.quickTransfer.quickTransferAmountInput = page.locator('#widget_1_transfer_amount');
        this.quickTransfer.quickTransferAmountError = page.locator('#error_widget_1_transfer_amount');
        this.quickTransfer.quickTransferTitleInput = page.locator('#widget_1_transfer_title');
        this.quickTransfer.quickTransferTitleError = page.locator('#error_widget_1_transfer_title');
        this.quickTransfer.quickTransferButton = page.locator('#execute_btn');
        this.quickTransfer.quickTransferSuccessDialog = page.locator('div.ui-dialog');

        this.lastTransactionsBox = page.locator('div[data-action="konto/34263/historia/ostatnie"]');

        this.phoneTopUp.phoneTopUpBox = page.locator('#accounts_list > article > div.grid.accounts-widgets > div:nth-child(3) > div');
        this.phoneTopUp.phoneTopUpDropdown = page.locator('#widget_1_topup_receiver');
        this.phoneTopUp.phoneTopUpDropdownError = page.locator('#error_widget_1_topup_receiver');
        this.phoneTopUp.phoneTopUpAmountInput = page.locator('#widget_1_topup_amount');
        this.phoneTopUp.phoneTopUpAmountError = page.locator('#error_widget_1_topup_amount');
        this.phoneTopUp.phoneTopUpCheckbox = page.locator('#uniform-widget_1_topup_agreement');
        this.phoneTopUp.phoneTopUpCheckboxError = page.locator('#error_widget_1_topup_agreement');
        this.phoneTopUp.phoneTopUpButton = page.locator('#execute_phone_btn');

        this.financeManager.financeManagerBox = page.locator('form[action="ajax_pulpit_manager_finansowy_success.json"]');
        this.financeManager.financeManagerDropdown = page.locator('select[data-testid="financial-manager-select"]');
        this.financeManager.financeManagerChart = page.locator('#widget_financial_manager_1');

        this.savingsAccounts.savingsAccountsHeader = page.locator('#aggregation_list > section:nth-child(1) > h1');
        this.savingsAccounts.savingsAccountsRow = page.locator(SAVINGS_ACCOUNTS_ROW);
        this.savingsAccounts.savingsAccountTypeRow = page.locator(SAVINGS_ACCOUNTS_ROW + DIV_ROW_NTH_CHILD(1));
        this.savingsAccounts.savingsAccountPercentageRow = page.locator(SAVINGS_ACCOUNTS_ROW + DIV_ROW_NTH_CHILD(2));

        this.deposit.depositsHeader = page.locator('#aggregation_list > section:nth-child(2) > h1');
        this.deposit.depositsRow = page.locator(DEPOSIT_ROW);
        this.deposit.depositsTypeRow = page.locator(DEPOSIT_ROW + DIV_ROW_NTH_CHILD(1));
        this.deposit.depositsTimeRow = page.locator(DEPOSIT_ROW + DIV_ROW_NTH_CHILD(2));
        this.deposit.depositsPercentageRow = page.locator(DEPOSIT_ROW + DIV_ROW_NTH_CHILD(3));

        this.debitCard.debitCardsHeader = page.locator('#aggregation_list > section:nth-child(3) > h1');
        this.debitCard.debitCardsRow = page.locator(DEBIT_CARDS_ROW);
        this.debitCard.debitCardNumberRow = page.locator(DEBIT_CARDS_ROW + DIV_ROW_NTH_CHILD(1));
        this.debitCard.debitCardStatusRow = page.locator(DEBIT_CARDS_ROW + DIV_ROW_NTH_CHILD(2));
        this.debitCard.debitCardAccountRow = page.locator(DEBIT_CARDS_ROW + DIV_ROW_NTH_CHILD(3));

        this.creditCard.creditCardsHeader = page.locator('#aggregation_list > section:nth-child(4) > h1');
        this.creditCard.creditCardsRow = page.locator(CREDIT_CARDS_ROW);
        this.creditCard.creditCardNumberRow = page.locator(CREDIT_CARDS_ROW + DIV_ROW_NTH_CHILD(1));
        this.creditCard.creditCardStatusRow = page.locator(CREDIT_CARDS_ROW + DIV_ROW_NTH_CHILD(2));
        this.creditCard.creditCardRepaymentNowRow = page.locator(CREDIT_CARDS_ROW + DIV_ROW_NTH_CHILD(3));
        this.creditCard.creditCardMinimumRepaymentRow = page.locator(CREDIT_CARDS_ROW + DIV_ROW_NTH_CHILD(4));
        this.creditCard.creditCardArrearsRow = page.locator(CREDIT_CARDS_ROW + DIV_ROW_NTH_CHILD(5));
        this.creditCard.creditCardPaymentDeadlineRow = page.locator(CREDIT_CARDS_ROW + DIV_ROW_NTH_CHILD(6));

        this.loans.loansHeader = page.locator('#aggregation_list > section:nth-child(5) > h1');
        this.loans.loanRow = page.locator(LOAN_ROW);
        this.loans.loanNearestPaymentDateRow = page.locator(LOAN_ROW + DIV_ROW_NTH_CHILD(1));
        this.loans.loanNearestPaymentAmountRow = page.locator(LOAN_ROW + DIV_ROW_NTH_CHILD(2));
        this.loans.loanAccountNumberRow = page.locator(LOAN_ROW + DIV_ROW_NTH_CHILD(3));
        this.loans.debitRow = page.locator(DEBIT_ROW);
        this.loans.debitMinimumPaymentRow = page.locator(DEBIT_ROW + DIV_ROW_NTH_CHILD(1));
        this.loans.debitAccountNumberRow = page.locator(DEBIT_ROW + DIV_ROW_NTH_CHILD(2));
        this.loans.debitAmountRow = page.locator(DEBIT_ROW + DIV_ROW_NTH_CHILD(3));

        this.insurance.insuranceHeader = page.locator('#aggregation_list > section:nth-child(6) > h1');
        this.insurance.assistanceInsuranceRow = page.locator(ASSISTANCE_INSURANCE_ROW);
        this.insurance.assistanceDetailsRow = page.locator(ASSISTANCE_INSURANCE_ROW + DIV_ROW_NTH_CHILD(1));
        this.insurance.assistanceCompanyRow = page.locator(ASSISTANCE_INSURANCE_ROW + DIV_ROW_NTH_CHILD(2));
        this.insurance.assistanceInsuredRow = page.locator(ASSISTANCE_INSURANCE_ROW + DIV_ROW_NTH_CHILD(3));
        this.insurance.assistanceAccountRow = page.locator(ASSISTANCE_INSURANCE_ROW + DIV_ROW_NTH_CHILD(4));
    }
}