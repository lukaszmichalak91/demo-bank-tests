import { Page } from '@playwright/test';

export class PaymentPage {
  constructor(private page: Page) {}

  transferReceiverNameInput = this.page.getByTestId('transfer_receiver');
  transferReceiverAccountNoInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  transferFormTitle = this.page.getByTestId('form_title');

  executeTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeConfirmationBox = this.page.getByTestId('close-button');
  actionMessage = this.page.locator('#show_messages');
}
