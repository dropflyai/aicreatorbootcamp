import { defineConfig, devices } from '@playwright/test'

/**
 * AI Creator Bootcamp - Playwright E2E Test Configuration
 *
 * This config supports:
 * - Local development testing (npm run test:e2e)
 * - CI/CD pipeline testing
 * - Multiple browser testing
 * - Visual regression testing
 */

export default defineConfig({
  // Test directory
  testDir: './e2e',

  // Run tests in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI for stability
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-results.json' }],
  ],

  // Global test timeout
  timeout: 30000,

  // Expect timeout for assertions
  expect: {
    timeout: 10000,
  },

  // Shared settings for all projects
  use: {
    // Base URL for testing - can be overridden by CI
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3001',

    // Collect trace when retrying
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on failure
    video: 'retain-on-failure',

    // Viewport size
    viewport: { width: 1280, height: 720 },

    // Navigation timeout
    navigationTimeout: 15000,

    // Action timeout
    actionTimeout: 10000,
  },

  // Configure projects for major browsers
  projects: [
    // Desktop Chrome - Primary browser
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Desktop Firefox
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // Desktop Safari
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Chrome
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },

    // Mobile Safari
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  // Run local dev server before starting tests
  // Set SKIP_WEB_SERVER=1 to skip starting the server (when already running)
  webServer: process.env.SKIP_WEB_SERVER ? undefined : {
    command: 'npm run dev -- -p 3001',
    url: 'http://localhost:3001',
    reuseExistingServer: true,
    timeout: 180000,
    stdout: 'pipe',
    stderr: 'pipe',
  },

  // Output directory for test artifacts
  outputDir: 'test-results',
})
