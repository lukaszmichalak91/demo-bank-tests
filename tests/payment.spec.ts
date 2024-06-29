import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payments.page';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 1234 5612 3456 1234 567';
    const transferAmount = '220';
    const transferTitle = 'za pizze';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    const paymentPage = new PaymentPage(page);
    await paymentPage.transferReceiverNameInput.fill(transferReceiver);
    await paymentPage.transferReceiverAccountNoInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);
    await paymentPage.transferFormTitle.fill(transferTitle);
    await paymentPage.executeTransferButton.click();

    await paymentPage.closeConfirmationBox.click();

    //Assert
    await expect(paymentPage.actionMessage).toHaveText(expectedMessage);
  });
});
