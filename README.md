### GitHub Repository Description

---

# Playwright Automation Framework: UI & API Testing

This repository contains a robust **Playwright Automation Framework** designed for both **UI and API testing** using the **Page Object Model (POM)** architecture. It leverages modern tools like **Allure Reports** for comprehensive reporting and supports testing across multiple browsers, devices, and environments.

---

## Key Features

### 1. **UI Automation**
- Implements Playwright's **Page Object Model (POM)** for reusable and maintainable UI automation.
- Supports testing on popular browsers (**Chrome**, **Firefox**, **Safari**) and devices (**Mobile Chrome**, **Mobile Safari**, **iPhone 14**, **Pixel 7**).
- Handles responsive and cross-browser testing scenarios.
- Captures **screenshots**, **videos**, and **traces** for debugging.

### 2. **API Automation**
- Fully integrated **API testing** using Playwright.
- Supports **RESTful API validation** with dynamic `baseURL` handling.
- Executes API tests in parallel with configurable retries for stability.

### 3. **Multi-Environment Support**
- Automatically loads environment-specific configurations via `.env` files (e.g., `dev`, `staging`, `prod`).
- Seamlessly switches between environments using `NODE_ENV`.

### 4. **Reporting**
- Generates beautiful and detailed **Allure Reports**:
  - Test execution results.
  - Screenshots, videos, and trace logs for failed tests.
- Easily view reports in the browser with one command.

### 5. **Run Tests with Scripts**
- Tests can be executed easily using predefined scripts in the `package.json` file, simplifying the process and improving efficiency.

### 6. **Scalable Architecture**
- Modular structure for easy scaling and maintenance.
- Separate directories for **UI tests**, **API tests**, and shared utilities.

---

## Repository Structure

```
.
├── tests/
│   ├── ui/                # UI tests organized by features
│   ├── api/               # API tests organized by endpoints
│   └── utils/             # Utility functions and shared code
├── pages/                 # Page Object Model implementation
├── configs/               # Environment-specific configurations
├── .env                   # Default environment variables
├── playwright.config.ts   # Playwright configuration
└── README.md              # Documentation
```

---

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<username>/<repository-name>.git
   cd <repository-name>
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set the Environment**:
   - Create `.env` files for each environment (e.g., `.env.dev`, `.env.staging`).
   - Example:
     ```env
     API_BASE_URL=https://dummyjson.com
     UI_BASE_URL=https://www.saucedemo.com
     ```

4. **Run Tests**:
   - **Using Scripts in `package.json`**:
     ```bash
     npm run test:ui
     npm run test:api
     ```
   - **Run Specific Project**:
     ```bash
     npx playwright test --project=UITestsChrome
     ```

5. **Generate and View Reports**:
   ```bash
   allure generate ./allure-results -o ./allure-report --clean
   allure open ./allure-report
   ```

---

## Technologies Used
- **Playwright**: Cross-browser and API automation.
- **Allure Reports**: Detailed reporting and debugging insights.
- **TypeScript**: Type-safe scripting for better maintainability.
- **Dotenv**: Environment variable management.
- **Node.js**: Backend support for scripts.

---

## Contributing
Feel free to contribute by submitting a pull request. Make sure to follow the coding standards and include tests for any new features.

---

This framework is perfect for teams looking for a **comprehensive solution** for UI and API test automation with advanced reporting capabilities.
