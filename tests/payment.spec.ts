import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payments.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    // Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3456 1234 5612 3456 1234 567';
    const transferAmount = '220';
    const transferTitle = 'za pizze';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    // Act
    await paymentPage.makeTransfer(
      transferReceiver,
      transferAccount,
      transferAmount,
      transferTitle,
    );

    //Assert
    await expect(paymentPage.actionMessage).toHaveText(expectedMessage);
  });
});
