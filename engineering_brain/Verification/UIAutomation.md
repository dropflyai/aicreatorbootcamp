# UI AUTOMATION PROTOCOL
**Playwright-Based UI Verification, Visual Regression, and Accessibility Testing**

---

## 1. Purpose

UI Automation is the enforcement mechanism for the Engineering Brain's
principle that UI correctness must be verified via automation, never via
manual inspection (Constitution.md Section 8, Tool Authority). This document
defines the complete Playwright-based testing infrastructure: configuration,
patterns, visual regression, accessibility auditing, cross-browser strategy,
flaky test management, and CI integration.

Manual UI verification is a governance violation under GEAR: BUILD and
GEAR: SHIP. The only exceptions are GEAR: EXPLORE (where Playwright is
recommended but not required) and GEAR: HOTFIX (where manual smoke testing
is permitted if automation would delay the fix unacceptably).

---

## 2. Playwright Setup and Configuration

### 2.1 Installation

```bash
npm init playwright@latest
# Select TypeScript, tests directory, GitHub Actions workflow, install browsers
```

### 2.2 Configuration File

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'reports/test-results.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

### 2.3 Browser Default

Chromium is the default browser per Tool Authority (Solutions/ToolAuthority.md).
All development testing runs against Chromium unless explicitly overridden.
Cross-browser testing (Firefox, WebKit) is required under GEAR: SHIP
(see Section 6).

### 2.4 Directory Structure

```
tests/
  e2e/
    pages/                    # Page Object Models
      BasePage.ts
      LoginPage.ts
      DashboardPage.ts
    fixtures/                 # Test fixtures and helpers
      auth.fixture.ts
      data.fixture.ts
    specs/                    # Test specifications
      auth.spec.ts
      dashboard.spec.ts
    visual/                   # Visual regression tests
      dashboard.visual.ts
    accessibility/            # Accessibility tests
      dashboard.a11y.ts
evidence/
  screenshots/               # Generated screenshots
  traces/                    # Playwright traces
```

---

## 3. Page Object Pattern

### 3.1 Rationale

Page Objects encapsulate page-specific selectors and interactions, creating
a stable abstraction layer between tests and the DOM. When the UI changes,
only the Page Object needs updating -- not every test that interacts with
that page.

### 3.2 Base Page

```typescript
// tests/e2e/pages/BasePage.ts
import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  abstract readonly url: string;

  async navigate(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForReady();
  }

  async waitForReady(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async screenshot(name: string): Promise<Buffer> {
    return this.page.screenshot({
      path: `evidence/screenshots/${name}.png`,
      fullPage: true,
    });
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }
}
```

### 3.3 Concrete Page Object

```typescript
// tests/e2e/pages/DashboardPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
  readonly url = '/dashboard';

  // Locators (prefer data-testid for stability)
  readonly heading: Locator;
  readonly metricCards: Locator;
  readonly refreshButton: Locator;
  readonly errorBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /dashboard/i });
    this.metricCards = page.getByTestId('metric-card');
    this.refreshButton = page.getByRole('button', { name: /refresh/i });
    this.errorBanner = page.getByRole('alert');
  }

  async getMetricCount(): Promise<number> {
    return this.metricCards.count();
  }

  async refresh(): Promise<void> {
    await this.refreshButton.click();
    await this.page.waitForResponse(resp =>
      resp.url().includes('/api/metrics') && resp.status() === 200
    );
  }

  async expectNoErrors(): Promise<void> {
    await expect(this.errorBanner).not.toBeVisible();
  }
}
```

### 3.4 Selector Strategy (Priority Order)

1. **`data-testid`**: Most stable. Not affected by CSS or text changes.
2. **Accessibility roles**: `getByRole('button', { name: ... })`. Semantic
   and accessibility-friendly.
3. **Text content**: `getByText(...)`. Fragile to copy changes.
4. **CSS selectors**: Last resort. Fragile to refactoring.

Never use auto-generated class names (e.g., CSS modules hashes, Tailwind
utility classes) as selectors.

---

## 4. Visual Regression Testing

### 4.1 Concept

Visual regression testing compares screenshots of the current UI against
stored baselines. Any pixel difference beyond the configured tolerance
triggers a failure, catching unintended visual changes that functional
tests would miss.

### 4.2 Implementation

```typescript
// tests/e2e/visual/dashboard.visual.ts
import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Dashboard Visual Regression', () => {
  test('matches baseline screenshot', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    await expect(page).toHaveScreenshot('dashboard-full.png', {
      maxDiffPixelRatio: 0.01,   // 1% tolerance
      threshold: 0.2,             // Per-pixel color threshold
      animations: 'disabled',     // Freeze animations
    });
  });

  test('metric cards match baseline', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    const cards = dashboard.metricCards;
    const count = await cards.count();

    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toHaveScreenshot(
        `metric-card-${i}.png`,
        { maxDiffPixelRatio: 0.01 }
      );
    }
  });
});
```

### 4.3 Baseline Management

- **Initial creation**: Run tests with `--update-snapshots` to generate
  baselines. Baselines are committed to the repository.
- **Updating baselines**: When intentional visual changes are made, update
  with `npx playwright test --update-snapshots`. Review the diff before
  committing.
- **Baseline storage**: `tests/e2e/visual/*.visual.ts-snapshots/` (default
  Playwright snapshot directory).
- **Platform normalization**: Baselines are platform-specific (rendering
  differs across OS). CI must use a consistent OS (Linux recommended).

### 4.4 Tolerance Configuration

- **`maxDiffPixelRatio`**: Maximum percentage of differing pixels (0.01 = 1%).
  Start conservative, increase only with documented justification.
- **`threshold`**: Per-pixel color difference tolerance (0-1). 0.2 is a
  reasonable default that catches meaningful changes while tolerating
  anti-aliasing differences.
- **`animations: 'disabled'`**: Always disable animations during visual
  comparison to prevent non-deterministic diffs.

---

## 5. Accessibility Testing with axe-core

### 5.1 Integration

```bash
npm install -D @axe-core/playwright
```

```typescript
// tests/e2e/accessibility/dashboard.a11y.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Dashboard Accessibility', () => {
  test('has no critical accessibility violations', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();

    // Save evidence artifact
    const fs = await import('fs');
    fs.writeFileSync(
      'evidence/reports/accessibility-dashboard.json',
      JSON.stringify(results, null, 2)
    );

    expect(results.violations.filter(v =>
      v.impact === 'critical' || v.impact === 'serious'
    )).toEqual([]);
  });

  test('form inputs have accessible labels', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();

    const results = await new AxeBuilder({ page })
      .include('[data-testid="filter-form"]')
      .withRules(['label', 'label-title-only'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
```

### 5.2 WCAG Compliance Targets

| Execution Gear | Minimum Compliance | Required Tags |
|---------------|-------------------|---------------|
| GEAR: EXPLORE | None (recommended) | -- |
| GEAR: BUILD | WCAG 2.1 AA | wcag2a, wcag2aa |
| GEAR: SHIP | WCAG 2.1 AA (full) | wcag2a, wcag2aa, wcag21aa |

### 5.3 Common Violations and Fixes

| Violation | WCAG Rule | Fix |
|-----------|-----------|-----|
| Missing alt text | 1.1.1 | Add `alt` attribute to images |
| Insufficient contrast | 1.4.3 | Adjust foreground/background colors |
| Missing form labels | 1.3.1 | Add `<label>` or `aria-label` |
| Missing landmark regions | 1.3.1 | Add `<main>`, `<nav>`, `<header>` |
| Keyboard inaccessible | 2.1.1 | Ensure all interactive elements are focusable |
| Missing focus indicators | 2.4.7 | Add visible `:focus` styles |

---

## 6. Cross-Browser Testing Strategy

### 6.1 Browser Matrix

| Browser | Engine | When Required |
|---------|--------|---------------|
| Chromium | Blink | Always (default) |
| Firefox | Gecko | GEAR: SHIP |
| WebKit | WebKit | GEAR: SHIP |

### 6.2 Execution

```bash
# Development (Chromium only)
npx playwright test --project=chromium

# Pre-ship (all browsers)
npx playwright test --project=chromium --project=firefox --project=webkit
```

### 6.3 Browser-Specific Considerations

- **Chromium**: Baseline browser. All tests must pass here first.
- **Firefox**: Watch for flexbox/grid rendering differences, date input
  behavior, and `scrollIntoView` timing.
- **WebKit**: Watch for date picker differences, `position: sticky` edge
  cases, and font rendering differences.

### 6.4 Handling Browser-Specific Failures

If a test fails in one browser but passes in others:

1. Determine if the failure is a genuine cross-browser bug or a test issue.
2. If genuine: fix the application code to be cross-browser compatible.
3. If test issue: adjust the test with browser-specific expectations using
   `test.describe` with `test.skip` for known browser limitations.
4. Document the browser difference in the test file.

---

## 7. Mobile Viewport Testing

### 7.1 Viewport Definitions

```typescript
// Standard viewports (defined in playwright.config.ts projects)
const viewports = {
  mobile: { width: 375, height: 812 },    // iPhone 13
  tablet: { width: 768, height: 1024 },   // iPad
  desktop: { width: 1280, height: 720 },  // Standard desktop
  wide: { width: 1920, height: 1080 },    // Wide desktop
};
```

### 7.2 Responsive Testing Pattern

```typescript
test.describe('Responsive Navigation', () => {
  for (const [name, viewport] of Object.entries(viewports)) {
    test(`navigation renders correctly at ${name}`, async ({ browser }) => {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      await page.goto('/');

      if (viewport.width < 768) {
        // Mobile: hamburger menu should be visible
        await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();
        await expect(page.getByTestId('desktop-nav')).not.toBeVisible();
      } else {
        // Desktop: full nav should be visible
        await expect(page.getByTestId('desktop-nav')).toBeVisible();
        await expect(page.getByTestId('mobile-menu-toggle')).not.toBeVisible();
      }

      await page.screenshot({
        path: `evidence/screenshots/nav-${name}.png`,
        fullPage: true,
      });

      await context.close();
    });
  }
});
```

---

## 8. Flaky Test Management

### 8.1 Definition

A flaky test is one that non-deterministically passes or fails without
code changes. Flaky tests erode trust in the test suite and must be
managed aggressively.

### 8.2 Retry Strategy

```typescript
// playwright.config.ts
export default defineConfig({
  retries: process.env.CI ? 2 : 0,  // Retry twice in CI, never locally
});
```

Retries mask flakiness. They are a mitigation, not a solution. Every test
that requires a retry to pass must be investigated.

### 8.3 Quarantine Protocol

When a flaky test is identified:

1. **Tag it**: Add `test.fixme()` or move to a quarantine test suite.
2. **Log it**: Record in `Memory/RegressionHistory.md` with:
   - Test name and file path
   - Observed flakiness pattern (timing? network? race condition?)
   - Date quarantined
   - Assigned owner for investigation
3. **Investigate**: Root-cause the flakiness within 5 business days.
4. **Fix or remove**: Either fix the underlying issue or delete the test
   if it provides no stable value.

### 8.4 Common Flakiness Causes and Fixes

| Cause | Symptom | Fix |
|-------|---------|-----|
| Race condition | Intermittent element not found | Use `waitForSelector` or `expect().toBeVisible()` |
| Animation timing | Screenshot diff | Disable animations: `animations: 'disabled'` |
| Network timing | API response not received | Use `waitForResponse` with explicit URL match |
| Shared state | Test passes alone, fails in suite | Isolate state per test, use `test.describe.serial` sparingly |
| Popup/dialog | Unexpected dialog blocks interaction | Register dialog handler before triggering action |
| Viewport race | Element position incorrect | Wait for layout stability: `waitForLoadState('networkidle')` |

---

## 9. CI Integration

### 9.1 Headless Execution

All CI runs must use headless mode (default in Playwright). Headed mode
is for local debugging only.

```bash
# CI execution
npx playwright test --reporter=junit,html

# Local debugging (headed, single test)
npx playwright test tests/e2e/specs/auth.spec.ts --headed --debug
```

### 9.2 GitHub Actions Configuration

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run Playwright tests
  run: npx playwright test --project=chromium
  env:
    CI: true
    BASE_URL: http://localhost:3000

- name: Upload Playwright report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 30

- name: Upload test artifacts
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: test-artifacts
    path: |
      evidence/screenshots/
      test-results/
    retention-days: 30
```

### 9.3 Parallelism and Sharding

For large test suites, use Playwright's built-in sharding:

```bash
# Shard across 4 CI runners
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

---

## 10. Performance Testing with Playwright

### 10.1 Navigation Timing

```typescript
test('page loads within performance budget', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;

  // Evidence artifact
  const perfData = await page.evaluate(() =>
    JSON.stringify(performance.getEntriesByType('navigation'))
  );
  const fs = await import('fs');
  fs.writeFileSync('evidence/benchmarks/dashboard-nav-timing.json', perfData);

  expect(loadTime).toBeLessThan(3000); // 3-second budget
});
```

### 10.2 Web Vitals Collection

```typescript
test('collects Core Web Vitals', async ({ page }) => {
  await page.goto('/dashboard');

  const vitals = await page.evaluate(async () => {
    const lcp = await new Promise(resolve => {
      new PerformanceObserver(list => {
        const entries = list.getEntries();
        resolve(entries[entries.length - 1].startTime);
      }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    return { lcp };
  });

  expect(vitals.lcp).toBeLessThan(2500); // LCP budget: 2.5s
});
```

---

## 11. Best Practices and Common Pitfalls

### 11.1 Best Practices

- **Prefer `data-testid`** over CSS selectors for element targeting.
- **Use `expect` auto-waiting** instead of manual `waitForSelector` where
  possible.
- **Isolate tests**: Each test should set up its own state and not depend
  on other tests having run.
- **Capture evidence**: Every test that verifies UI behavior should produce
  a screenshot or trace artifact.
- **Keep tests fast**: Target under 10 seconds per test. Investigate any
  test exceeding 30 seconds.

### 11.2 Common Pitfalls

- **Hardcoded waits**: Never use `page.waitForTimeout(5000)`. Always wait
  for a specific condition.
- **Selector fragility**: Avoid selectors tied to implementation details
  (class names, nth-child, complex CSS paths).
- **Test interdependence**: Tests that depend on execution order will
  become flaky when parallelized.
- **Missing error handling**: Always check for console errors and unhandled
  exceptions in tests.
- **Ignoring CI/local parity**: Tests that pass locally but fail in CI
  indicate environment assumptions. Pin browser versions, use consistent
  viewports, disable system fonts.

---

## 12. Cross-References

- **Triple Verification (Layer 1 and Layer 2)**: `Verification/TripleVerification.md`
- **Evidence storage and naming**: `Verification/Evidence.md`
- **Playwright recipes**: `Automations/Recipes/Playwright.md`
- **Chromium configuration**: `Automations/Recipes/Chromium.md`
- **UI test failure runbook**: `Solutions/Runbooks/UITestFailure.md`
- **Flaky test runbook**: `Automations/Runbooks/PlaywrightFlaky.md`
- **Tool Authority (UI verification)**: `Solutions/ToolAuthority.md`
- **Testing patterns**: `Patterns/Testing.md`

---

**UI Automation via Playwright is mandatory. Manual UI verification is a governance violation.**
