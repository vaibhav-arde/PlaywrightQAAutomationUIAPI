
# Technical Overview

I have covered the following tests:

## Repository
[GitHub Repository: PlaywrightQAAutomationUIAPI](https://github.com/vaibhav-arde/PlaywrightQAAutomationUIAPI)

This repository features a robust **Playwright Automation Framework** designed for both **UI and API testing**. It utilizes the **Page Object Model (POM)** architecture, incorporates **Allure Reports** for comprehensive reporting, and supports testing across multiple browsers, devices, and environments.

## Test Descriptions

### 1. **API Schema Validation**  
**File**: `tests/apiTestsSchemaValidation.spec.ts`  
- Validates the API responses, status codes, and schema attributes comprehensively.  

### 2. **Login Functionality**  
**File**: `tests/loginFunctionality.spec.ts`  
- A UI test validating the login functionality through positive and negative test scenarios.  
- Includes negative testing using an array of four scenarios, all validated within a single test.  

### 3. **Mocking Requests Using Routes**  
**File**: `tests/mockingRequestUsingRoute.spec.ts`  
- Demonstrates modifying outgoing requests using Playwright's `route` functionality.  
- Useful for security testing scenarios.  

### 4. **Mocking Responses Using Routes**  
**File**: `tests/mockingResponseUsingRoute.spec.ts`  
- Modifies backend responses to simulate edge cases that are difficult to replicate in standard environments.  

### 5. **Skipping Login Using Browser Context Storage**  
**File**: `tests/skipLoginUsingBrowserContextStorageState.spec.ts`  
- Logs in once, captures the browser state, and reuses it in other tests to bypass the UI login process.  
- Optimizes test execution time significantly.  

### 6. **UI and API Integration for Order Placement**  
**File**: `tests/UIAPIIntegrationToOrder.spec.ts`  
- Combines UI and API testing by retrieving an authentication token via APIs and utilizing it in subsequent tests.  
- Reduces execution time by leveraging API-based authentication.  

### 7. **MFA Scenario**  
**File**: `MFAScenario.md`  
- Details a comprehensive MFA implementation scenario with accompanying code.

## Additional Configurations

- **Environment Support**:  
  Configured in `playwright.config.ts` to support various environments such as `dev`, `test`, and `uat`.  

- **Device Compatibility**:  
  Supports testing on desktop and mobile browsers, including Android and iOS.  

- **Viewport Customization**:  
  Configurable to handle different viewports for testing responsiveness.

This framework is designed for scalability, efficiency, and ease of use, making it a powerful solution for comprehensive UI and API testing.
