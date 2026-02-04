# i18n Testing — Authoritative Module

Internationalization testing verifies that the engineering foundation
supports localization correctly. It catches issues before translators
start work, when fixes are cheapest. This document codifies testing
methodologies, automation strategies, and quality gates for i18n.

---

## 1. PSEUDO-LOCALIZATION

### What Is Pseudo-Localization?

Pseudo-localization transforms English strings into modified versions that
simulate localization challenges without actual translation. It is the
single most effective i18n testing technique.

### Pseudo-Localization Transformations

| Transformation | Purpose | Example |
|---------------|---------|---------|
| Accented characters | Test Unicode rendering | "Save" → "Šààvé" |
| Text expansion | Simulate longer translations | "Save" → "Šààvé____" |
| Brackets | Identify non-externalized strings | "Save" → "[Šààvé____]" |
| Mirror/RTL | Simulate RTL layout | "Save" → "evaŠ" (reversed) |
| CJK characters | Test East Asian rendering | "Save" → "保存テスト" |

### Pseudo-Locale Configuration

**Standard pseudo-locale (recommended):**
```
Transform: Accent + Expand 30% + Bracket
Input:  "Welcome to the Dashboard"
Output: "[Ẁéĺçöḿé ţö ţĥé Ðàšĥƀöàŕð_______]"
```

**What pseudo-localization reveals:**
- Hardcoded strings (not bracketed)
- Truncated text (brackets cut off)
- Layout breaks from expansion
- Encoding issues (accented chars render wrong)
- Concatenation problems (partial translation)

### Implementation

**i18next pseudo-localization:**
```javascript
i18next.init({
  debug: true,
  lng: 'pseudo',
  resources: {
    pseudo: {
      translation: pseudoLocalize(englishResources)
    }
  }
});
```

**Build-time pseudo generation:**
```bash
# Generate pseudo-localized resource file
npx pseudo-localize src/locales/en.json > src/locales/pseudo.json
```

### Pseudo-Localization in CI

Add pseudo-localization testing to the CI pipeline:
```yaml
test-i18n:
  steps:
    - generate-pseudo-locale
    - run-app-with-pseudo-locale
    - screenshot-comparison
    - report-layout-issues
```

---

## 2. AUTOMATED I18N TESTING

### Static Analysis

| Check | Tool | What It Catches |
|-------|------|----------------|
| Hardcoded strings | ESLint plugin (eslint-plugin-i18n-json) | Strings not externalized |
| Missing translations | Build-time comparison script | Keys in source missing in locale |
| Unused translations | Build-time comparison script | Keys in locale not in source |
| ICU syntax errors | ICU message parser | Malformed plural/select messages |
| Key naming violations | Custom linter | Non-conforming key names |
| Duplicate keys | JSON/YAML parser | Same key defined twice |
| Encoding errors | File analysis | Non-UTF-8 files |

### ESLint Configuration for i18n

```javascript
// .eslintrc.js
module.exports = {
  plugins: ['i18n-json'],
  rules: {
    'i18n-json/valid-message-syntax': ['error', {
      syntax: 'icu'  // Enforce ICU MessageFormat
    }],
    'i18n-json/identical-keys': ['error', {
      filePath: 'src/locales/en.json'  // Compare against source
    }]
  }
};
```

### Custom Hardcoded String Detection

```python
# Script to find potential hardcoded strings in JSX/TSX
import re
import sys

PATTERNS = [
    r'>\s*[A-Z][a-z]+.*?</',     # Text content in JSX tags
    r"title=['\"].*?['\"]",       # Title attributes with text
    r"placeholder=['\"].*?['\"]", # Placeholder with text
    r"label=['\"].*?['\"]",       # Label with text
    r"alt=['\"].*?['\"]",         # Alt text
]

EXCLUSIONS = [
    r't\([\'"]',      # Already using translation function
    r'FormattedMessage',  # Already using FormatJS
    r'data-testid',   # Test attributes (not user-facing)
]
```

---

## 3. HARDCODING DETECTION

### Categories of Hardcoded Content

| Category | Example | Priority |
|----------|---------|----------|
| UI labels | `<label>Email</label>` | Critical |
| Error messages | `alert("Something went wrong")` | Critical |
| Placeholder text | `placeholder="Enter your name"` | High |
| Toast/notifications | `toast.success("Saved!")` | High |
| Alt text | `alt="User avatar"` | Medium |
| Aria labels | `aria-label="Close dialog"` | Medium |
| Console messages | `console.log("Processing...")` | Low (if user-visible) |
| Comments in code | `// This is a comment` | None |

### Detection Strategy

1. **Static analysis** — Lint rules catch 70–80% of hardcoded strings
2. **Pseudo-localization** — Visual inspection catches 15–20% more
3. **Manual review** — Code review catches remaining edge cases
4. **User testing** — End users report missed strings

---

## 4. LOCALE SWITCHING TESTING

### What to Test When Switching Locales

| Test | Description | Method |
|------|-------------|--------|
| Full locale switch | Change from en-US to target locale | Manual + automated |
| All text updates | Every visible string changes | Visual comparison |
| Formatting updates | Dates, numbers, currencies change format | Automated assertion |
| Layout adaptation | RTL mirror, text expansion accommodation | Visual comparison |
| Asset swap | Locale-specific images, icons update | Automated check |
| Persistence | Locale preference persists across sessions | Automated test |
| URL structure | Locale reflected in URL if applicable | Automated test |
| SEO tags | hreflang, meta language updated | Automated check |

### Automated Locale Switch Test

```javascript
// Playwright test for locale switching
test('locale switch updates all content', async ({ page }) => {
  // Start in English
  await page.goto('/en');
  await expect(page.locator('h1')).toHaveText('Dashboard');

  // Switch to German
  await page.click('[data-testid="locale-switcher"]');
  await page.click('[data-testid="locale-de"]');

  // Verify content updated
  await expect(page.locator('h1')).toHaveText('Übersicht');

  // Verify date format changed
  const dateElement = page.locator('[data-testid="date-display"]');
  await expect(dateElement).toMatch(/\d{2}\.\d{2}\.\d{4}/); // DD.MM.YYYY
});
```

---

## 5. BOUNDARY TESTING

### Character Boundary Tests

| Test Case | Input | Purpose |
|-----------|-------|---------|
| Empty string | "" | Handle gracefully |
| Very long string | 500+ characters | Layout and truncation |
| Special characters | `<>&"'` | XSS prevention in translations |
| Unicode edge cases | ZWJ sequences, combining marks | Rendering |
| Emoji in translations | Some translators add emoji | Rendering |
| RTL marks | U+200F (RTL mark) in strings | BiDi handling |
| Null/undefined | Missing translation key | Fallback behavior |

### Numeric Boundary Tests

| Test Case | Input | Purpose |
|-----------|-------|---------|
| Zero | 0 | Plural form for zero |
| One | 1 | Singular form |
| Negative | -1 | Negative number formatting |
| Large number | 1,234,567,890 | Grouping separators |
| Decimal | 3.14159 | Decimal separator |
| Currency | $0.00, $999,999.99 | Currency extremes |

### Date Boundary Tests

| Test Case | Input | Purpose |
|-----------|-------|---------|
| Epoch | Jan 1, 1970 | Historical date |
| Leap year | Feb 29 | Calendar edge case |
| Year boundary | Dec 31 → Jan 1 | Year transition |
| Far future | Year 2099+ | Long year formatting |
| Timezone edge | DST transition times | Timezone handling |

---

## 6. VISUAL REGRESSION TESTING

### Screenshot-Based i18n Testing

Capture screenshots in each locale and compare for layout issues:

```javascript
// Playwright visual regression for i18n
const locales = ['en', 'de', 'fr', 'ja', 'ar'];

for (const locale of locales) {
  test(`visual regression - ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}/dashboard`);
    await expect(page).toHaveScreenshot(`dashboard-${locale}.png`, {
      maxDiffPixels: 100
    });
  });
}
```

### What Visual Regression Catches

- Text overflow/truncation
- Layout breaks from expansion
- RTL mirroring failures
- Font rendering issues
- Spacing problems
- Alignment shifts

---

## 7. ACCESSIBILITY AND I18N

### Combined A11y + i18n Testing

| Test | Description | Tool |
|------|-------------|------|
| Screen reader + locale | Does screen reader pronounce locale correctly? | Manual + axe |
| Lang attribute | Is `lang` attribute set correctly per locale? | Automated (axe) |
| Direction attribute | Is `dir` attribute set for RTL? | Automated |
| Alt text translated | Are image alt texts in target locale? | Automated comparison |
| ARIA labels translated | Are ARIA labels localized? | Automated comparison |
| Focus order + RTL | Is focus order correct in RTL? | Manual testing |

---

## 8. I18N TESTING MATRIX

### Test Coverage Matrix

| Test Type | Frequency | Automation | Priority |
|-----------|-----------|-----------|----------|
| Pseudo-localization | Every build | Full | Critical |
| Hardcoded string detection | Every build | Full | Critical |
| Missing translation check | Every build | Full | Critical |
| Locale switch functional | Every release | Full | High |
| Visual regression (key locales) | Every release | Full | High |
| Boundary testing | Monthly | Semi-auto | Medium |
| Full locale testing (all locales) | Quarterly | Semi-auto | Medium |
| Cultural review | Per locale launch | Manual | High |
| RTL testing | Per release | Semi-auto | High (if RTL supported) |
| A11y + i18n | Quarterly | Semi-auto | Medium |

### Minimum Test Locales

If you cannot test every locale, always test these representative samples:

| Locale | Why | Tests |
|--------|-----|-------|
| en-US | Source language | Baseline |
| de-DE | Maximum text expansion | Layout |
| ja-JP | CJK characters, text contraction | Rendering |
| ar-SA | RTL, different script | Layout + direction |
| ru-RU | Cyrillic, complex plurals | Encoding + plurals |
| pseudo | All i18n issues | Comprehensive |

---

## 9. CI/CD INTEGRATION

### I18n Tests in CI Pipeline

```yaml
i18n-checks:
  stage: test
  steps:
    - name: Lint translation files
      run: npx i18n-lint src/locales/*.json

    - name: Check for missing translations
      run: node scripts/check-missing-translations.js

    - name: Check for unused translations
      run: node scripts/check-unused-translations.js

    - name: Validate ICU message syntax
      run: node scripts/validate-icu-syntax.js

    - name: Generate pseudo-locale
      run: node scripts/generate-pseudo.js

    - name: Run pseudo-locale screenshots
      run: npx playwright test --project=pseudo-locale

    - name: Check hardcoded strings
      run: node scripts/detect-hardcoded-strings.js
```

### Quality Gates

| Gate | Threshold | Action if Failed |
|------|-----------|-----------------|
| Missing translations | 0 missing keys | Block release |
| ICU syntax errors | 0 errors | Block release |
| Hardcoded strings | 0 new hardcoded | Block PR |
| Pseudo-locale screenshots | 0 layout breaks | Block release |
| Encoding issues | 0 non-UTF-8 files | Block PR |

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| No i18n testing | Ship and hope translations work | CI-integrated testing |
| Manual-only testing | Rely on human review | Automate everything possible |
| English-only CI | Tests only run in English | Pseudo-locale in CI |
| Test last locale only | Only test the most recent translation | Representative locale matrix |
| Ignore pseudo-locale | Skip pseudo because "it looks weird" | Embrace pseudo as primary tool |
| Fix forward | Find i18n bug, plan to fix later | Block on i18n issues |

---

**i18n testing is the quality gate that prevents localization defects from
reaching users. Automated testing catches the majority of issues at near-zero
marginal cost per build. Pseudo-localization alone catches 80% of common i18n
problems. The investment in i18n testing infrastructure pays for itself with
the first localization cycle.**
