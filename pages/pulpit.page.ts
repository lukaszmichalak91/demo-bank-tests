import { Page } from '@playwright/test';
import { SideMenuComponent } from '../componenets/side-menu.component';

export class PulpitPage {
  constructor(private page: Page) {}

  sideMenu = new SideMenuComponent(this.page);

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

  async executeQuickPayment(
    receiverId: string,
    transferAmount: string,
    transferTitle: string,
  ): Promise<void> {
    await this.transferReceiverDropdown.selectOption(receiverId);
    await this.transferAmountInput.fill(transferAmount);
    await this.transferTitleInput.fill(transferTitle);

    await this.executeTransferButton.click();
    await this.closeConfirmationBox.click();
  }

  async executeMobileTopUp(
    topUpReceiver: string,
    topUpAmount: string,
  ): Promise<void> {
    await this.topUpReceiverDropdown.selectOption(topUpReceiver);
    await this.topUpAmountInput.fill(topUpAmount);

    await this.regulationsCheckbox.check();
    await this.executeTopUpButton.click();
    await this.closeConfirmationBox.click();
  }
}
