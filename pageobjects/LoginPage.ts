import { expect, Locator, Page } from '@playwright/test';


export class LoginPage {
    userEmail: Locator;
    password: Locator;
    loginButton: Locator;
    userEmailInvalidFeedback: Locator;
    userPasswordInvalidFeedback: Locator;
    alert: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.userEmail = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.loginButton = page.locator("#login");
        this.userEmailInvalidFeedback = page.locator("#userEmail").locator("..").locator(".invalid-feedback");
        this.userPasswordInvalidFeedback = page.locator("#userPassword").locator("..").locator(".invalid-feedback");
        // this.alert = page.locator("div[role='alert']");
        // this.alert = page.locator("#toast-container div[role='alert']");
        this.alert = page.getByLabel('Incorrect email or password.');
    }

    async goTo() {
        // await this.page.goto("https://rahulshettyacademy.com/client");
        await this.page.goto('/client');
    }

    async validLogin(username: string, password: string) {
        await this.userEmail.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async assertErrorMessage(useremail: string, password: string, errorMessages: string[]) {
        if (useremail === '' && password === '') {
            await expect(this.userEmailInvalidFeedback).toHaveText(errorMessages[0]);
            await expect(this.userPasswordInvalidFeedback).toHaveText(errorMessages[1]);
        } else if (useremail === '') {
            await expect(this.userEmailInvalidFeedback).toHaveText(errorMessages[0]);
        } else if (password === '') {
            await expect(this.userPasswordInvalidFeedback).toHaveText(errorMessages[0]);
        } else {
            await expect(this.alert).toBeVisible();
        }
    }

    async captureToastMessage() {
        await this.page.screenshot({ path: 'screenshots/toast-message.png' });
    }

}