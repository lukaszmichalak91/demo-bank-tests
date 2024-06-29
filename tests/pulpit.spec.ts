import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '150';
    const transferTitle = 'pizza';
    const expectedTransferReceiver = 'Chuck Demobankowy';

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiverDropdown.selectOption(receiverId);
    await pulpitPage.transferAmountInput.fill(transferAmount);
    await pulpitPage.transferTitleInput.fill(transferTitle);

    await pulpitPage.executeTransferButton.click();
    await pulpitPage.closeConfirmationBox.click();

    // Assert
    await expect(pulpitPage.actionMessage).toHaveText(
      `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const expectedSuccessfulTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

    // Act
    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topUpReceiverDropdown.selectOption(topUpReceiver);
    await pulpitPage.topUpAmountInput.fill(topUpAmount);

    await pulpitPage.regulationsCheckbox.check();
    await pulpitPage.executeTopUpButton.click();
    await pulpitPage.closeConfirmationBox.click();

    // Assert
    await expect(pulpitPage.actionMessage).toHaveText(
      expectedSuccessfulTopUpMessage,
    );
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const pulpitPage = new PulpitPage(page);
    const topUpReceiver = '500 xxx xxx';
    const topUpAmount = '50';
    const initialBalance = await pulpitPage.moneyBalanceLabel.innerText();
    const expectedBalance = Number(initialBalance) - Number(topUpAmount);

    // Act

    await pulpitPage.topUpReceiverDropdown.selectOption(topUpReceiver);
    await pulpitPage.topUpAmountInput.fill(topUpAmount);

    await pulpitPage.regulationsCheckbox.click();
    await pulpitPage.executeTopUpButton.click();
    await pulpitPage.closeConfirmationBox.click();
    // Assert
    await expect(pulpitPage.moneyBalanceLabel).toHaveText(`${expectedBalance}`);
  });
});
