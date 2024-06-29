import { Page } from '@playwright/test';

export class PulpitPage {
  constructor(private page: Page) {}

  transferReceiverDropdown = this.page.locator('#widget_1_transfer_receiver');
  transferAmountInput = this.page.locator('#widget_1_transfer_amount');
  transferTitleInput = this.page.locator('#widget_1_transfer_title');
  executeTransferButton = this.page.getByRole('button', { name: 'wykonaj' });

  topUpReceiverDropdown = this.page.locator('#widget_1_topup_receiver');
  topUpAmountInput = this.page.locator('#widget_1_topup_amount');
  executeTopUpButton = this.page.getByRole('button', {
    name: 'doładuj telefon',
  });
  regulationsCheckbox = this.page.getByLabel('zapoznałem się z regulaminem');

  closeConfirmationBox = this.page.getByTestId('close-button');
  actionMessage = this.page.locator('#show_messages');
  moneyBalanceLabel = this.page.locator('#money_value');

  userTextName = this.page.getByTestId('user-name');
}
