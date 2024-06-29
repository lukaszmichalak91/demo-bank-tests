import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    await loginPage.login(userId, userPassword);

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.userTextName).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const incorrectShorterLogin = 'tester';
    const expectedErrorMessage = 'identyfikator ma min. 8 znaków';

    // Act
    await loginPage.loginInput.fill(incorrectShorterLogin);
    await loginPage.loginInput.blur();

    // Assert
    await expect(loginPage.loginErrorLabel).toHaveText(expectedErrorMessage);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const expectedErrorMessage = 'hasło ma min. 8 znaków';
    const tooShortPassword = '12345';

    // Act
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(tooShortPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.passwordErrorLabel).toHaveText(expectedErrorMessage);
  });
});
