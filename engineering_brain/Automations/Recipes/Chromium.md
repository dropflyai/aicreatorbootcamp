# Chromium Recipe -- Browser Automation

> Practical recipes for Chromium browser automation, debugging, and profiling.
> Copy, adapt, ship.

---

## Table of Contents

1. [Installation and Version Management](#installation-and-version-management)
2. [Headless vs Headed Modes](#headless-vs-headed-modes)
3. [Chrome DevTools Protocol (CDP)](#chrome-devtools-protocol)
4. [Debugging with chrome://inspect](#debugging-with-chromeinspect)
5. [Browser Context Isolation](#browser-context-isolation)
6. [Download Management](#download-management)
7. [Network Interception](#network-interception)
8. [Performance Profiling with Lighthouse](#performance-profiling-with-lighthouse)

---

## Installation and Version Management

### Playwright-bundled Chromium (recommended)

```bash
# Install Chromium via Playwright (pinned, reproducible version)
npx playwright install chromium

# Install with OS dependencies (for CI / fresh machines)
npx playwright install --with-deps chromium

# Check installed version
npx playwright --version
```

Playwright bundles a specific Chromium revision per release. This guarantees
consistent behavior across local dev and CI. You do not need a system Chrome
installation.

### System Chrome (when needed)

```typescript
// Use system Chrome instead of Playwright-bundled Chromium
import { chromium } from "playwright";

const browser = await chromium.launch({
  channel: "chrome",          // uses system Google Chrome
  // channel: "chrome-beta",  // or Chrome Beta
  // channel: "msedge",       // or Microsoft Edge (Chromium)
});
```

When to use system Chrome:
- Testing with extensions (Chromium bundled by Playwright does not support extensions).
- Reproducing user-reported bugs with a specific Chrome version.
- Using Chrome-specific features not yet in the bundled Chromium.

### Version pinning in CI

```yaml
# Pin Playwright version in package.json for reproducible browser versions
"devDependencies": {
  "@playwright/test": "1.48.0"
}
```

Each Playwright release pins an exact Chromium revision. Upgrading Playwright
upgrades the browser version. Lock it in `package-lock.json`.

---

## Headless vs Headed Modes

### Headless (default -- for CI and automation)

```typescript
const browser = await chromium.launch();  // headless by default
```

New headless mode (Chrome 112+) runs the full browser UI code path in headless
mode, making it identical to headed mode. Playwright uses this automatically.

### Headed (for debugging)

```typescript
const browser = await chromium.launch({ headless: false });
```

```bash
# Run Playwright tests in headed mode
npx playwright test --headed
```

### Slow motion (for demos and debugging)

```typescript
const browser = await chromium.launch({
  headless: false,
  slowMo: 500,           // 500ms delay between each action
});
```

---

## Chrome DevTools Protocol

CDP gives you low-level control over Chromium. Playwright wraps most of it,
but you can use raw CDP when needed.

### Creating a CDP session

```typescript
import { chromium } from "playwright";

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

// Create a CDP session on the page
const cdp = await context.newCDPSession(page);

// Enable network domain
await cdp.send("Network.enable");

// Listen for events
cdp.on("Network.requestWillBeSent", (event) => {
  console.log("Request:", event.request.url);
});

// Emulate network conditions (slow 3G)
await cdp.send("Network.emulateNetworkConditions", {
  offline: false,
  downloadThroughput: (400 * 1024) / 8,    // 400 kbps
  uploadThroughput: (400 * 1024) / 8,
  latency: 400,                             // 400ms RTT
});
```

### Common CDP domains

| Domain           | Use Case                                |
|------------------|-----------------------------------------|
| `Network`        | Request interception, throttling        |
| `Performance`    | Runtime metrics, trace collection       |
| `DOM`            | Low-level DOM inspection                |
| `Emulation`      | Device emulation, geolocation           |
| `Console`        | Console message capture                 |
| `Runtime`        | JavaScript evaluation                   |
| `Tracing`        | Chrome tracing (performance profiling)  |

---

## Debugging with chrome://inspect

### Start Chromium with remote debugging

```bash
# Launch Chrome with debugging port
google-chrome --remote-debugging-port=9222 --user-data-dir=/tmp/chrome-debug
```

### Connect from another browser

1. Open `chrome://inspect` in any Chrome window.
2. Click "Configure..." and add `localhost:9222`.
3. Your remote pages appear under "Remote Target".
4. Click "inspect" to open DevTools for that page.

### Connect from Playwright

```typescript
// Connect to an already-running browser
const browser = await chromium.connectOverCDP("http://localhost:9222");
const contexts = browser.contexts();
const page = contexts[0].pages()[0];
```

This is useful for debugging a browser that was launched outside of Playwright
(e.g., a long-running scraping session or a manually opened Chrome).

---

## Browser Context Isolation

Browser contexts provide isolated sessions within a single browser instance.
Each context has its own cookies, local storage, and cache.

```typescript
const browser = await chromium.launch();

// Context 1: logged-in admin
const adminContext = await browser.newContext({
  storageState: ".auth/admin.json",
});
const adminPage = await adminContext.newPage();

// Context 2: anonymous visitor
const anonContext = await browser.newContext();
const anonPage = await anonContext.newPage();

// Context 3: mobile device
const mobileContext = await browser.newContext({
  ...devices["iPhone 14"],
  locale: "fr-FR",
  geolocation: { latitude: 48.8566, longitude: 2.3522 },
  permissions: ["geolocation"],
});
const mobilePage = await mobileContext.newPage();
```

Key points:
- Contexts are lightweight (much cheaper than launching new browsers).
- Contexts are fully isolated from each other.
- Use `storageState` to pre-load authentication cookies.
- Use `devices[...]` presets for accurate device emulation.

---

## Download Management

### Handle file downloads

```typescript
const [download] = await Promise.all([
  page.waitForEvent("download"),
  page.getByRole("link", { name: "Download Report" }).click(),
]);

// Get suggested filename
const filename = download.suggestedFilename();  // "report-2024.pdf"

// Save to specific path
await download.saveAs(`./downloads/${filename}`);

// Get download path (temporary)
const tempPath = await download.path();

// Cancel a download
await download.cancel();

// Check for failure
const failure = await download.failure();
if (failure) {
  console.error("Download failed:", failure);
}
```

### Configure download behavior

```typescript
const context = await browser.newContext({
  acceptDownloads: true,  // default is true
});
```

---

## Network Interception

### Route and modify requests

```typescript
// Block images for faster page loads
await page.route("**/*.{png,jpg,jpeg,gif,svg}", (route) => route.abort());

// Mock an API response
await page.route("**/api/users", (route) => {
  route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ]),
  });
});

// Modify a request before it reaches the server
await page.route("**/api/data", (route) => {
  const headers = {
    ...route.request().headers(),
    "X-Custom-Header": "test-value",
  };
  route.continue({ headers });
});
```

### Record and replay network (HAR)

```typescript
// Record network to HAR file
const context = await browser.newContext({
  recordHar: { path: "network.har", urlFilter: "**/api/**" },
});
// ... perform actions ...
await context.close();  // HAR is saved on close

// Replay from HAR file (use recorded responses)
const replayContext = await browser.newContext();
const replayPage = await replayContext.newPage();
await replayPage.routeFromHAR("network.har", { notFound: "fallback" });
```

---

## Performance Profiling with Lighthouse

### Run Lighthouse from CLI

```bash
# Install Lighthouse
npm install -g lighthouse

# Run against a URL
lighthouse http://localhost:3000 \
  --output html \
  --output-path ./reports/lighthouse.html \
  --chrome-flags="--headless"

# Run specific categories only
lighthouse http://localhost:3000 \
  --only-categories=performance,accessibility \
  --output json \
  --output-path ./reports/lighthouse.json
```

### Run Lighthouse programmatically

```typescript
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
const result = await lighthouse("http://localhost:3000", {
  port: chrome.port,
  onlyCategories: ["performance", "accessibility"],
  output: "json",
});

const { categories } = result.lhr;
console.log("Performance:", categories.performance.score * 100);
console.log("Accessibility:", categories.accessibility.score * 100);

await chrome.kill();
```

### Key Lighthouse metrics

| Metric                    | Target    | Description                    |
|---------------------------|-----------|--------------------------------|
| First Contentful Paint    | < 1.8s    | First text/image rendered      |
| Largest Contentful Paint  | < 2.5s    | Largest visible element         |
| Total Blocking Time       | < 200ms   | Time main thread is blocked    |
| Cumulative Layout Shift   | < 0.1     | Visual stability score         |
| Speed Index               | < 3.4s    | How quickly content fills page |

### CI integration for Lighthouse

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      http://localhost:3000/
      http://localhost:3000/dashboard
    budgetPath: ./lighthouse-budget.json
    uploadArtifacts: true
```

---

*Engineering Brain -- Automations/Recipes/Chromium.md*
