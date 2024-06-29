import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test(
    'quick payment with correct data',
    {
      tag: ['@pulpit', '@integration'],
      annotation: {
        type: 'documentation',
        description: 'https://github.com/lukaszmichalak91/demo-bank-tests',
      },
    },
    async ({ page }) => {
      // Arrange
      const receiverId = '2';
      const transferAmount = '150';
      const transferTitle = 'pizza';
      const expectedTransferReceiver = 'Chuck Demobankowy';

      // Act
      await pulpitPage.executeQuickPayment(
        receiverId,
        transferAmount,
        transferTitle,
      );

      // Assert
      await expect(pulpitPage.actionMessage).toHaveText(
        `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`,
      );
    },
  );

  test(
    'successful mobile top-up',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const topUpReceiver = '500 xxx xxx';
      const topUpAmount = '50';
      const expectedSuccessfulTopUpMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${topUpReceiver}`;

      // Act
      await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

      // Assert
      await expect(pulpitPage.actionMessage).toHaveText(
        expectedSuccessfulTopUpMessage,
      );
    },
  );

  test(
    'correct balance after successful mobile top-up',
    { tag: ['@pulpit', '@integration'] },
    async ({ page }) => {
      // Arrange
      const topUpReceiver = '500 xxx xxx';
      const topUpAmount = '50';
      const initialBalance = await pulpitPage.moneyBalanceLabel.innerText();
      const expectedBalance = Number(initialBalance) - Number(topUpAmount);

      // Act
      await pulpitPage.executeMobileTopUp(topUpReceiver, topUpAmount);

      // Assert
      await expect(pulpitPage.moneyBalanceLabel).toHaveText(
        `${expectedBalance}`,
      );
    },
  );
});
