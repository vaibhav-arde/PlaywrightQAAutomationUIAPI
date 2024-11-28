import { test, expect } from '@playwright/test';
import { POManager } from '../../pageobjects/POManager';
import UserLoginData from '../../utils/UserLoginData.json';
import errorMessages from '../../testData/loginErrors.json';

let poManager: POManager;
let loginPage: any;

test.describe("Login Scenarios", () => {
  test.beforeEach(async ({ page }) => {
    poManager = new POManager(page);
    loginPage = poManager.getLoginPage();
    await loginPage.goTo();
  });

  test('Successful login with valid standard user', async ({ page }) => {
    await loginPage.validLogin(
      UserLoginData.standard_user.username,
      UserLoginData.standard_user.password
    );

    const productsPage = poManager.getProductsPage();
    await productsPage.verifyProductPage();
  });

  test('Verify Logout functionality', async ({ page }) => {
    await loginPage.validLogin(
      UserLoginData.standard_user.username,
      UserLoginData.standard_user.password
    );

    const productsPage = poManager.getProductsPage();
    await productsPage.logout();
    await loginPage.verifyLoginPage();
  });

  const invalidLoginScenarios = [
    {
      name: 'locked out user',
      username: UserLoginData.locked_out_user.username,
      password: UserLoginData.locked_out_user.password,
      expectedError: errorMessages.locked_out_user,
    },
    {
      name: 'empty Username and Password',
      username: '',
      password: '',
      expectedError: errorMessages.emptyUsername,
    },
    {
      name: 'empty Username Only',
      username: '',
      password: UserLoginData.standard_user.password,
      expectedError: errorMessages.emptyUsername,
    },
    {
      name: 'empty Password Only',
      username: UserLoginData.standard_user.username,
      password: '',
      expectedError: errorMessages.emptyPassword,
    },
    {
      name: 'Wrong Password',
      username: UserLoginData.standard_user.username,
      password: UserLoginData.standard_user.username,
      expectedError: errorMessages.wrongPassword,
    },
  ];

  invalidLoginScenarios.forEach(({ name, username, password, expectedError }) => {
    test(`Verify invalid login: ${name}`, async () => {
      await loginPage.validLogin(username, password);
      await loginPage.verifyPresenceErrorIcons();
      await expect(loginPage.errorMessage).toHaveText(expectedError);
    });
  });
});
