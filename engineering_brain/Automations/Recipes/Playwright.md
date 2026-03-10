# Playwright Recipe -- End-to-End Testing

> Practical recipes for browser testing with Playwright.
> Copy, adapt, ship.

---

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Writing Tests](#writing-tests)
4. [Running Tests](#running-tests)
5. [Screenshots and Video Capture](#screenshots-and-video-capture)
6. [Debugging](#debugging)
7. [CI Integration](#ci-integration)
8. [Common Pitfalls and Solutions](#common-pitfalls-and-solutions)

---

## Installation

### Install Playwright

```bash
# Install Playwright and test runner
npm init playwright@latest

# Or add to existing project
npm install -D @playwright/test

# Install browser binaries (Chromium only for speed)
npx playwright install --with-deps chromium

# Install all browsers
npx playwright install --with-deps
```

### What gets installed

| Component         | Location                          |
|-------------------|-----------------------------------|
| Test runner       | `node_modules/@playwright/test`   |
| Browser binaries  | `~/Library/Caches/ms-playwright/` (macOS) |
| Config file       | `playwright.config.ts`            |
| Example tests     | `tests/`                          |

---

## Configuration

### Essential playwright.config.ts

```typescript
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,       // fail if .only() left in CI
  retries: process.env.CI ? 2 : 0,    // retry flaky tests in CI
  workers: process.env.CI ? 1 : undefined,  // parallel locally, serial in CI
  reporter: [
    ["html", { open: "never" }],       // always generate HTML report
    ["list"],                           // console output
  ],

  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",           // collect trace on retry
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],

  // Start dev server before tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
```

Key configuration options:
- `fullyParallel` runs tests in parallel across files and within files.
- `forbidOnly` prevents `.only()` from leaking into CI.
- `webServer` auto-starts your dev server before tests run.
- `trace: "on-first-retry"` captures a full trace when retrying failed tests.

---

## Writing Tests

### Basic test structure

```typescript
import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/My App/);
});

test("user can log in", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("user@example.com");
  await page.getByLabel("Password").fill("password123");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByText("Welcome back")).toBeVisible();
});
```

### Page Object Model

```typescript
// tests/pages/login.page.ts
import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Sign in" });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}

// tests/login.spec.ts
import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/login.page";

test("successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login("user@example.com", "password123");
  await expect(page.getByText("Dashboard")).toBeVisible();
});
```

### Preferred locator strategies (in order)

| Priority | Locator                                  | Why                          |
|----------|------------------------------------------|------------------------------|
| 1        | `page.getByRole("button", { name: })` | Accessible, resilient        |
| 2        | `page.getByLabel("Email")`             | Form fields by label         |
| 3        | `page.getByText("Welcome")`           | Visible text                 |
| 4        | `page.getByTestId("submit-btn")`      | Explicit test IDs            |
| 5        | `page.locator("css=.class")`          | Last resort                  |

### Assertions

```typescript
// Visibility
await expect(page.getByText("Hello")).toBeVisible();
await expect(page.getByText("Hello")).toBeHidden();

// Text content
await expect(page.getByRole("heading")).toHaveText("Dashboard");
await expect(page.getByRole("heading")).toContainText("Dash");

// Input values
await expect(page.getByLabel("Email")).toHaveValue("user@example.com");

// URL
await expect(page).toHaveURL(/\/dashboard/);

// Count
await expect(page.getByRole("listitem")).toHaveCount(5);
```

---

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a specific file
npx playwright test tests/login.spec.ts

# Run tests matching a pattern
npx playwright test -g "login"

# Run in headed mode (see the browser)
npx playwright test --headed

# Run in a specific browser
npx playwright test --project=chromium

# Run with UI mode (interactive)
npx playwright test --ui

# Show HTML report after run
npx playwright show-report
```

---

## Screenshots and Video Capture

### Automatic capture on failure (configured in playwright.config.ts)

```typescript
use: {
  screenshot: "only-on-failure",   // auto screenshot on failure
  video: "retain-on-failure",      // record video, keep only on failure
},
```

### Manual screenshots in tests

```typescript
test("capture state", async ({ page }) => {
  await page.goto("/dashboard");

  // Full page screenshot
  await page.screenshot({ path: "screenshots/dashboard.png", fullPage: true });

  // Element screenshot
  const chart = page.locator("#revenue-chart");
  await chart.screenshot({ path: "screenshots/chart.png" });
});
```

### Video options

| Option                | Behavior                             |
|-----------------------|--------------------------------------|
| `"off"`               | No video recording                   |
| `"on"`                | Record all tests                     |
| `"retain-on-failure"` | Record all, keep only failed         |
| `"on-first-retry"`   | Record only on retry                 |

Videos are saved to `test-results/` alongside the test artifacts.

---

## Debugging

### Interactive debug mode

```bash
# Opens inspector with step-through debugging
npx playwright test --debug

# Debug a specific test
npx playwright test tests/login.spec.ts --debug
```

### Codegen -- record tests by clicking

```bash
# Opens browser, records your actions as test code
npx playwright codegen http://localhost:3000

# With a specific device
npx playwright codegen --device="iPhone 14" http://localhost:3000
```

### Trace viewer

```bash
# View a trace file from a failed test
npx playwright show-trace test-results/login-chromium/trace.zip
```

Traces include:
- Screenshots at each step
- DOM snapshots
- Network requests
- Console logs
- Action timeline

### Debug in test code

```typescript
test("debug this test", async ({ page }) => {
  await page.goto("/");
  await page.pause();  // pauses execution, opens inspector
  await page.getByRole("button").click();
});
```

---

## CI Integration

### GitHub Actions workflow

```yaml
name: Playwright Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14

      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: test-results
          path: test-results/
          retention-days: 7
```

Key CI tips:
- Always upload the HTML report as an artifact (even on success).
- Upload `test-results/` only on failure (contains screenshots, videos, traces).
- Use `--with-deps` to install OS-level browser dependencies.
- Set `workers: 1` in config for CI to avoid resource contention.

---

## Common Pitfalls and Solutions

### Flaky tests from timing issues

Problem: Tests pass locally but fail in CI due to slower environments.

```typescript
// BAD -- arbitrary wait
await page.waitForTimeout(2000);

// GOOD -- wait for specific condition
await expect(page.getByText("Loaded")).toBeVisible({ timeout: 10_000 });
await page.waitForLoadState("networkidle");
```

### Element not found

Problem: Locator does not match because the page has not finished rendering.

```typescript
// GOOD -- Playwright auto-waits, but increase timeout if needed
await page.getByRole("button", { name: "Submit" }).click({ timeout: 10_000 });
```

### Test isolation

Problem: Tests interfere with each other through shared state.

```typescript
// Use a fresh browser context per test (default behavior)
// Or explicitly create isolated contexts:
test("isolated test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // ... test code ...
  await context.close();
});
```

### Authentication in multiple tests

Problem: Logging in for every test is slow.

```typescript
// tests/auth.setup.ts
import { test as setup } from "@playwright/test";

setup("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("admin@example.com");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.context().storageState({ path: ".auth/user.json" });
});

// playwright.config.ts
projects: [
  { name: "setup", testMatch: /.*\.setup\.ts/ },
  {
    name: "chromium",
    use: {
      ...devices["Desktop Chrome"],
      storageState: ".auth/user.json",
    },
    dependencies: ["setup"],
  },
],
```

### Waiting for API responses

```typescript
// Wait for a specific API call to complete
const responsePromise = page.waitForResponse("**/api/users");
await page.getByRole("button", { name: "Load users" }).click();
const response = await responsePromise;
expect(response.status()).toBe(200);
```

---

*Engineering Brain -- Automations/Recipes/Playwright.md*
