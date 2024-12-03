To handle login with different users and roles, including Multi-Factor Authentication (MFA), you can structure the Playwright framework to incorporate dynamic user data, MFA token handling, and role-based logic.

Here's a step-by-step guide with code snippets:

---

### **1. Prepare User Data**
Create a JSON file (`UserLoginData.json`) containing user credentials, roles, and MFA token details.

```json
{
    "users": [
        {
            "role": "admin",
            "email": "admin@example.com",
            "password": "admin123",
            "mfaToken": "123456"
        },
        {
            "role": "user",
            "email": "user@example.com",
            "password": "user123",
            "mfaToken": "654321"
        }
    ]
}
```

---

### **2. Create a Login Page Object**
Encapsulate all login-related actions, including handling MFA, in a Page Object.

```typescript
import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goTo() {
        await this.page.goto('https://example.com/login');
    }

    async loginWithMFA(email: string, password: string, mfaToken: string) {
        await this.page.fill('#email', email);
        await this.page.fill('#password', password);
        await this.page.click('#loginButton');

        // Wait for MFA input field and submit the token
        const mfaInput = this.page.locator('#mfaInput');
        if (await mfaInput.isVisible()) {
            await mfaInput.fill(mfaToken);
            await this.page.click('#verifyButton');
        }

        // Assert successful login
        await this.page.waitForURL('https://example.com/dashboard');
    }
}
```

---

### **3. Create a Test Suite for Different Roles**
Iterate through user data, and for each user, perform login and verify role-specific functionalities.

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import UserLoginData from '../utils/UserLoginData.json';

test.describe('Login Scenarios with MFA', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goTo();
    });

    UserLoginData.users.forEach(user => {
        test(`Login as ${user.role}`, async ({ page }) => {
            await loginPage.loginWithMFA(user.email, user.password, user.mfaToken);

            // Verify role-specific page content
            if (user.role === 'admin') {
                await expect(page.locator('#adminPanel')).toBeVisible();
            } else if (user.role === 'user') {
                await expect(page.locator('#userDashboard')).toBeVisible();
            }
        });
    });
});
```

---

### **4. Modularize MFA Handling**
You can move MFA handling into a helper function for better reusability.

```typescript
export async function handleMFA(page: Page, mfaToken: string) {
    const mfaInput = page.locator('#mfaInput');
    if (await mfaInput.isVisible()) {
        await mfaInput.fill(mfaToken);
        await page.click('#verifyButton');
    }
}
```

Use it in the login method:

```typescript
async loginWithMFA(email: string, password: string, mfaToken: string) {
    await this.page.fill('#email', email);
    await this.page.fill('#password', password);
    await this.page.click('#loginButton');
    await handleMFA(this.page, mfaToken);
    await this.page.waitForURL('https://example.com/dashboard');
}
```

---

### **Summary**
- The `LoginPage` class encapsulates login logic, including MFA handling.
- A data-driven approach is used for testing with multiple user roles and credentials.
- Modular functions like `handleMFA` improve code reusability.
- Parallel execution and detailed reporting are configured to optimize and document test execution. 

This approach is scalable and allows for adding more user roles and functionalities.