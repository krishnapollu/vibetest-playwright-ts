# Playwright TypeScript All-Inclusive Test Framework

## 🚀 Capabilities
- **UI Automation**: Playwright with TypeScript for robust, cross-browser UI testing (Chromium, Firefox, WebKit)
- **API Testing**: Standalone and integrated API tests using axios
- **Advanced Logging**: Winston-based logging for all UI/API actions, assertions, and failures (console + logs/test.log)
- **Screenshots**: Automatic screenshots on UI test failure, custom screenshot utility for on-demand capture
- **Detailed Reports**: Allure and Playwright HTML reports, with logs and screenshots
- **Page Object Model (POM)**: Modular, maintainable POMs with all locators in a single JSON file per app
- **Separation of Concerns**: Locators, test data, and schemas are all externalized (JSON)
- **Test Data Management**: Data-driven tests with all static data in JSON files
- **Schema Validation**: API response validation using Ajv and externalized schemas
- **Accessibility & Visual Regression**: axe-core for a11y, Playwright/Percy for visual diffs
- **Extensible CLI**: Scaffold tests/pages, clean logs/reports, and more
- **Platform Independent**: Works on Windows, Mac, and Linux

---

## 📁 Project Structure
```
playwright-ts/
├── src/
│   ├── api/           # API test modules
│   ├── config/        # Config files (env, test data)
│   ├── data/          # Test data, schemas, endpoints (JSON)
│   ├── locators/      # All selectors per app (JSON)
│   ├── pages/         # Page Object Models (POM)
│   ├── tests/         # Test cases (UI & API, organized by type)
│   ├── utils/         # Utilities (logger, screenshot, helpers)
│   └── testSetup.ts   # Global test hooks (logging, screenshots)
├── logs/              # Log files and screenshots
├── reports/           # Test reports (Allure, HTML)
├── .env               # Environment variables
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup
1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure environment variables:**
   - Edit `.env` for BASE_URL, API_URL, etc.
3. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

---

## 🧑‍💻 Usage
- **Run all UI tests (across browsers):**
  ```sh
  npm run test:ui
  ```
- **Run all API tests:**
  ```sh
  npm run test:api
  ```
- **Run a specific test file:**
  ```sh
  npx playwright test src/tests/ui/smoke/homepage.spec.ts --project=Chromium
  ```
- **Generate and open Allure report:**
  ```sh
  npm run test:report
  ```
- **Run tests by tag:**
  ```sh
  npx playwright test --grep @smoke
  ```
- **Run visual regression or Percy tests:**
  ```sh
  npx playwright test src/tests/ui/visual/homepage.spec.ts
  npx percy exec -- npx playwright test src/tests/ui/percyVisual.spec.ts
  ```

---

## 📝 Logging & Screenshots
- **All UI/API actions, assertions, and failures are logged** to both the console and `logs/test.log`.
- **Automatic screenshots** are taken on UI test failure and saved in `logs/`.
- **Custom screenshots** can be taken in any POM or test:
  ```ts
  import { takeScreenshot } from '../utils/screenshot';
  await takeScreenshot(page, 'custom-name');
  ```

---

## 📊 Reporting
- **Allure Reports:**
  - Generate: `npm run allure:generate`
  - Open: `npm run allure:open`
- **Playwright HTML Reports:**
  - After any test run: `npx playwright show-report reports/html-report`
- **Logs and screenshots** are included for debugging.

---

## 🏗️ Extending the Framework
- **Add new POMs:** Place in `src/pages/`, reference locators from the app's JSON file.
- **Add new API modules:** Place in `src/api/`.
- **Add new tests:** Place in the appropriate `src/tests/` subfolder.
- **Add new test data:** Add to `src/data/` and reference in your tests.
- **Add new locators:** Update the app's JSON file in `src/locators/`.
- **Use the CLI:**
  - Scaffold a new test: `npm run scaffold:test myTest`
  - Scaffold a new page: `npm run scaffold:page myPage`
  - Clean logs: `npm run clean:logs`
  - Clean reports: `npm run clean:reports`

---

## 🧩 Best Practices
- **Keep locators and test data out of code** for maintainability.
- **Use the logger and screenshot utilities** for all debugging.
- **Leverage global hooks** for consistent logging and screenshots.
- **Tag tests** for easy filtering (e.g., `@smoke`, `@regression`).
- **Review Allure/HTML reports** after every run for full traceability.
- **Keep tests atomic and independent** for reliability.

---

## 🛠️ Advanced Features
- **Parallel & cross-browser execution**
- **Retry logic for flaky tests**
- **API schema validation (Ajv)**
- **Accessibility testing (axe-core)**
- **Visual regression (Playwright/Percy)**
- **Custom CLI for scaffolding and cleaning**
- **Data-driven and parameterized testing**
- **Automatic and custom screenshots**
- **Centralized logging and reporting**

---

## 🙌 Contributing & Support
- Fork, branch, and PR as usual.
- Add new locators/data in JSON, not in code.
- Use the CLI for scaffolding and cleaning.
- For help or feature requests, open an issue or contact the maintainer.

---

## 🎉 Happy Testing!
This framework is designed for scale, maintainability, and real-world automation. Use it for web, API, and integrated testing with confidence! 