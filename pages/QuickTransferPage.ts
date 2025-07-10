import {Page, Locator} from '@playwright/test';

export class QuickTransferPage {
    readonly page: Page;
    readonly quickTransferForm: Locator;
    readonly receiverDropdown: Locator;
    readonly amountInput: Locator;
    readonly titleInput: Locator;
    readonly executeButton: Locator;
    readonly receiverDropdownError: Locator;
    readonly amountInputError: Locator;
    readonly titleInputError: Locator;
    readonly tooltip: Locator;
    readonly tooltipSpan: Locator;
    readonly quickTransferSuccessDialog: Locator;

    constructor (page: Page) {
        this.quickTransferForm = page.locator('#widget_transfer_1');
        this.receiverDropdown = page.locator('#widget_1_transfer_receiver');
        this.amountInput = page.locator('#widget_1_transfer_amount');
        this.titleInput = page.locator('#widget_1_transfer_title');
        this.executeButton = page.locator('#execute_btn');
        this.receiverDropdownError = page.locator('#error_widget_1_transfer_receiver');
        this.amountInputError = page.locator('#error_widget_1_transfer_amount');
        this.titleInputError = page.locator('#error_widget_1_transfer_title');
        this.tooltip = page.locator('#accounts_list > div > div > div > i');
        this.tooltipSpan = page.locator('#accounts_list > div > div > div > i > span');
        this.quickTransferSuccessDialog = page.locator('body > div.ui-dialog');
    }
}