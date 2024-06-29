import { Page } from '@playwright/test';
import { SideMenuComponent } from '../componenets/side-menu.component';

export class PaymentPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

  transferReceiverNameInput = this.page.getByTestId('transfer_receiver');
  transferReceiverAccountNoInput = this.page.getByTestId('form_account_to');
  transferAmountInput = this.page.getByTestId('form_amount');
  transferFormTitle = this.page.getByTestId('form_title');

  executeTransferButton = this.page.getByRole('button', {
    name: 'wykonaj przelew',
  });
  closeConfirmationBox = this.page.getByTestId('close-button');
  actionMessage = this.page.locator('#show_messages');

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverNameInput.fill(transferReceiver);
    await this.transferReceiverAccountNoInput.fill(transferAccount);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferFormTitle.fill(transferTitle);

    await this.executeTransferButton.click();
    await this.closeConfirmationBox.click();
  }
}
