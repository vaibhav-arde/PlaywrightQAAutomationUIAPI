import { test, expect } from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
import UserLoginData from '../utils/UserLoginData.json';
import errorMessages from '../testData/loginErrors.json';

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
            UserLoginData.valid_user.useremail,
            UserLoginData.valid_user.password
        );

        await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');

    });

    const invalidLoginScenarios = [
        {
            name: 'empty Username and Password',
            useremail: '',
            password: '',
            errorMessages: [errorMessages.emptyUserEmail, errorMessages.emptyPassword]
        },
        {
            name: 'empty Username Only',
            useremail: '',
            password: UserLoginData.valid_user.password,
            errorMessages: [errorMessages.emptyUserEmail]
        },
        {
            name: 'empty Password Only',
            useremail: UserLoginData.valid_user.useremail,
            password: '',
            errorMessages: [errorMessages.emptyPassword]
        },
        {
            name: 'Wrong Password',
            useremail: UserLoginData.invalid_user.useremail,
            password: UserLoginData.invalid_user.password,
            errorMessages: [errorMessages.alert]
        },
    ];

    invalidLoginScenarios.forEach(({ name, useremail, password, errorMessages}) => {
        test(`Verify invalid login: ${name}`, async () => {
            await loginPage.validLogin(useremail, password);
            await loginPage.assertErrorMessage(useremail, password, errorMessages);
            await loginPage.captureToastMessage();
        });
    });

});
