import { expect, Locator, Page } from '@playwright/test';


export class LoginPage {
    signInbutton: Locator;
    userName: Locator;
    password: Locator;
    loginLogo: Locator;
    userNameError: Locator;
    passwordError: Locator;
    errorMessageBtn: Locator;
    errorMessage: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.signInbutton = page.locator("#login-button");
        this.userName = page.locator("#user-name");
        this.password = page.locator("#password");
        this.loginLogo = page.locator("div.login_logo");
        this.userNameError = page.locator("#user-name+svg[data-prefix='fas']");
        this.passwordError = page.locator("#password+svg[data-prefix='fas']");
        this.errorMessageBtn = page.locator("button svg[data-prefix='fas']");
        this.errorMessage = page.locator("h3[data-test='error']");
    }

    async goTo() {
        // await this.page.goto("https://www.saucedemo.com/");
        await this.page.goto('/');
    }

    async validLogin(username: string, password: string) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyLoginPage() {
        await expect(this.loginLogo).toBeVisible();
        await expect(this.userName).toBeVisible();
        await expect(this.password).toBeVisible();
        await expect(this.signInbutton).toBeVisible();
    }

    async verifyPresenceErrorIcons() {
        await expect(this.userNameError).toBeVisible()
        await expect(this.passwordError).toBeVisible()
        await expect(this.errorMessageBtn).toBeVisible()
    }

}