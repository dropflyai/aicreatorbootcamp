# Localization Testing — Authoritative Module

Localization testing verifies that a localized product functions correctly, displays properly, and is linguistically and culturally appropriate for the target market. It encompasses linguistic testing, functional testing, cosmetic testing, and locale-specific testing. This document codifies the testing framework.

---

## 1. TESTING TAXONOMY

| Test Type | What It Verifies | When | Who |
|-----------|-----------------|------|-----|
| Linguistic | Translation accuracy, fluency, terminology | Post-translation | Linguist/reviewer |
| Functional | Features work correctly in each locale | Post-integration | QA engineer |
| Cosmetic | UI displays correctly with translated content | Post-integration | QA engineer + linguist |
| Locale-specific | Date, number, currency, sorting work per locale | Post-integration | QA engineer |
| Cultural | Content is culturally appropriate | Pre-launch | In-market reviewer |
| Regression | Previous l10n fixes still work | Every release | Automated + QA |

---

## 2. LINGUISTIC TESTING

### Linguistic Review Process

```
Translated Content Delivered
    │
    ▼
Linguistic Tester Reviews In-Context
├── Accuracy: Does translation match source meaning?
├── Fluency: Does it read naturally in target language?
├── Terminology: Are glossary terms used correctly?
├── Style: Does it match the style guide?
├── Completeness: Is anything missing or untranslated?
└── Register: Is formality level appropriate?
    │
    ▼
Issues Logged (with severity, type, suggestion)
    │
    ▼
Translator Corrects
    │
    ▼
Retesting (spot check)
```

### Linguistic Test Cases

| Category | Test | Expected Result |
|----------|------|----------------|
| Accuracy | Compare source and target meaning | Meaning preserved |
| Completeness | Check all UI elements translated | No English in localized UI |
| Terminology | Verify glossary terms used | Consistent term usage |
| Grammar | Check grammatical correctness | Native-level grammar |
| Spelling | Verify correct spelling | Zero spelling errors |
| Punctuation | Check locale-appropriate punctuation | Correct per locale conventions |
| Truncation | Verify no critical text cut off | All text visible or truncated gracefully |

---

## 3. FUNCTIONAL LOCALIZATION TESTING

### Functional Test Matrix

| Function | What to Test | Test Locales |
|----------|-------------|-------------|
| Locale switching | App responds to locale change | All supported |
| Text input | Typing, editing in target script | CJK, Arabic, Cyrillic |
| Search | Search works with local characters | CJK, accented chars |
| Sorting | Sort order correct per locale | Swedish, Czech, Chinese |
| Date input | Date picker uses locale format | US, EU, Japan |
| Number input | Decimal and grouping per locale | DE (comma decimal), US (dot decimal) |
| Currency | Correct symbol, placement, decimals | USD, EUR, JPY, SAR |
| Text direction | RTL layout correct | Arabic, Hebrew |
| Plurals | Correct plural forms displayed | Arabic (6 forms), Polish (4 forms) |
| Gender | Gender agreement in messages | French, German, Arabic |
| Encoding | Unicode characters display correctly | All scripts |
| Email/SMS | Localized content delivered correctly | All supported |
| PDF/export | Exported documents correctly localized | All supported |

### RTL-Specific Test Cases

| Test | Expected | Common Bug |
|------|----------|-----------|
| Layout mirrors | All elements flip horizontally | Some elements stay LTR |
| Text alignment | Right-aligned by default | Left-aligned English remnants |
| Icons | Directional icons flip | Arrows point wrong way |
| Progress bars | Right-to-left fill | Left-to-right fill |
| Navigation | Menu order reversed | Western order preserved |
| Scrollbars | Left side of viewport | Right side (LTR default) |
| Forms | Labels right-aligned, fields left-to-right for data | Mixed alignment |
| Numbers | LTR within RTL context | Numbers reversed |

---

## 4. COSMETIC TESTING

### Visual Verification

| Element | What to Check | Common Issues |
|---------|-------------|---------------|
| Buttons | Text fits, not truncated | German expansion overflows |
| Labels | Aligned correctly, not overlapping | Long translations overlap |
| Menus | All items visible, correctly formatted | Dropdown too narrow |
| Dialogs | Content fits, scrollable if needed | Content spills outside |
| Tables | Column widths accommodate translations | Headers truncated |
| Navigation | Tabs/links readable, not cramped | Tabs wrap unexpectedly |
| Tooltips | Fully visible, correctly positioned | Cut off by viewport |
| Toast notifications | Fully visible, readable | Truncated messages |
| Error messages | Complete and properly formatted | Partial translation or overflow |

### Visual Regression Testing

```javascript
// Automated visual regression for localized UI
const locales = ['en', 'de', 'ja', 'ar', 'ru'];
const pages = ['login', 'dashboard', 'settings', 'profile'];

for (const locale of locales) {
  for (const page of pages) {
    test(`${page} - ${locale}`, async ({ page: p }) => {
      await p.goto(`/${locale}/${page}`);
      await expect(p).toHaveScreenshot(
        `${page}-${locale}.png`,
        { maxDiffPixels: 50 }
      );
    });
  }
}
```

---

## 5. LOCALE-SPECIFIC TESTING

### Date/Time Formatting Tests

| Locale | Test Date | Expected Format |
|--------|-----------|----------------|
| en-US | 2026-02-03 | 2/3/2026 or February 3, 2026 |
| en-GB | 2026-02-03 | 03/02/2026 or 3 February 2026 |
| de-DE | 2026-02-03 | 03.02.2026 or 3. Februar 2026 |
| ja-JP | 2026-02-03 | 2026/02/03 or 2026年2月3日 |

### Number Formatting Tests

| Locale | Test Number | Expected Format |
|--------|-------------|----------------|
| en-US | 1234567.89 | 1,234,567.89 |
| de-DE | 1234567.89 | 1.234.567,89 |
| fr-FR | 1234567.89 | 1 234 567,89 |

### Currency Tests

| Locale | Amount | Currency | Expected |
|--------|--------|----------|----------|
| en-US | 1234.56 | USD | $1,234.56 |
| de-DE | 1234.56 | EUR | 1.234,56 EUR |
| ja-JP | 1234 | JPY | ¥1,234 |

---

## 6. TEST ENVIRONMENT SETUP

### Multi-Locale Test Environment

| Requirement | Implementation |
|------------|---------------|
| Locale switching | URL-based (`/en/`, `/de/`) or cookie/header |
| All locales available | Deploy all translations to test environment |
| Consistent test data | Locale-aware test data (names, addresses) |
| Time/date manipulation | Control system time for date testing |
| Screenshot infrastructure | Automated capture per locale |

### Test Data Localization

| Data Type | English | German | Japanese |
|-----------|---------|--------|----------|
| Person name | John Smith | Hans Mueller | 田中太郎 |
| Address | 123 Main St | Hauptstr. 123 | 東京都千代田区 |
| Phone | (555) 123-4567 | +49 30 12345678 | 03-1234-5678 |
| Date | 02/03/2026 | 03.02.2026 | 2026/02/03 |
| Currency | $1,234.56 | 1.234,56 EUR | ¥1,234 |

---

## 7. TEST AUTOMATION STRATEGY

### Automation Pyramid for l10n

```
     ╱╲
    ╱  ╲     Manual: Cultural review, linguistic deep dive
   ╱────╲
  ╱      ╲   UI: Visual regression, RTL, cosmetic
 ╱────────╲
╱          ╲  Integration: Locale switch, formatting, plurals
╱────────────╲
╱              ╲ Unit: String extraction, format validation, placeholder checks
```

### Automation Coverage Targets

| Test Layer | Automation Target | Tools |
|-----------|------------------|-------|
| Unit | 95%+ | Jest, pytest, custom validators |
| Integration | 80%+ | Playwright, Cypress |
| UI/Visual | 70%+ | Playwright visual comparison |
| Manual | Remaining edge cases | Human testers |

---

## 8. DEFECT TAXONOMY

| Defect Type | Severity | Example |
|------------|----------|---------|
| Untranslated string | High | English text in German UI |
| Incorrect translation | High | Wrong meaning conveyed |
| Truncated text | Medium | "Speiche..." instead of "Speichern" |
| Wrong format | Medium | US date format in German locale |
| Cosmetic | Low | Minor spacing issue with translation |
| Encoding | High | Mojibake (garbled characters) |
| Placeholder error | Critical | "{name}" shown instead of user name |
| Plural error | Medium | "1 items" instead of "1 item" |
| RTL layout | High | Non-mirrored element in RTL |
| Cultural | Variable | Inappropriate content for market |

---

## 9. TEST REPORTING

### L10n Test Report Template

```
LOCALIZATION TEST REPORT
========================
Product: [name]     Version: [X.X]
Locale: [locale]    Date: [date]
Tester: [name]

SUMMARY
├── Total test cases: [N]
├── Passed: [N] ([%])
├── Failed: [N] ([%])
├── Blocked: [N] ([%])
└── Overall status: [PASS/FAIL]

DEFECTS BY TYPE
├── Untranslated: [N]
├── Incorrect translation: [N]
├── Cosmetic: [N]
├── Functional: [N]
└── Total: [N]

AREAS TESTED
├── UI screens: [list]
├── Features tested: [list]
├── Locale-specific: [date, number, currency]
└── RTL (if applicable): [yes/no]

RECOMMENDATION: [Ship / Fix and retest / Block]
```

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| No l10n testing | Ship translations without testing | Minimum visual + functional |
| English-only QA | Only test source language | Include key locales in QA cycle |
| Manual-only testing | No automation for l10n checks | Automated formatting + visual checks |
| Testing after release | Find l10n bugs in production | Test in staging per release |
| Single-locale testing | Test one locale, assume all work | Representative locale matrix |
| Ignoring RTL | Skip RTL testing for Arabic/Hebrew | Always test if RTL supported |

---

**Localization testing is the quality gate between translation and user
experience. Every untested translation is a potential defect in a market
you are investing to win. The cost of testing is a fraction of the cost
of fixing localization defects after launch — or worse, the cost of
lost users who encounter a broken localized experience.**
