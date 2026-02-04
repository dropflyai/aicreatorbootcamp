# Localization QA Automation — Authoritative Module

Automated QA catches the majority of localization defects at near-zero marginal cost. Completeness checks, glossary compliance, placeholder validation, length limits, and screenshot comparison form the automated QA pipeline that operates on every translation delivery. This document codifies the automated QA framework.

---

## 1. AUTOMATED QA CHECKS

### Check Taxonomy

| Check | Type | Catches | Priority |
|-------|------|---------|----------|
| Completeness | Translation coverage | Missing translations | Critical |
| Placeholder validation | Variable integrity | Missing/extra {variables} | Critical |
| Tag consistency | Markup integrity | Broken HTML/XML tags | Critical |
| Number consistency | Numeric accuracy | Numbers changed in translation | High |
| Glossary compliance | Terminology | Inconsistent terminology | High |
| Length limits | UI constraints | Text too long for UI element | High |
| Punctuation | Formatting | Inconsistent punctuation | Medium |
| Spelling | Linguistic | Spelling errors | Medium |
| Consistency | Uniformity | Same source, different translations | Medium |
| Whitespace | Formatting | Extra/missing spaces | Low |
| Capitalization | Formatting | Wrong capitalization pattern | Low |

---

## 2. COMPLETENESS CHECKS

### Translation Coverage Verification

```python
def check_completeness(source_file, target_file, locale):
    source_keys = extract_keys(source_file)
    target_keys = extract_keys(target_file)

    missing = source_keys - target_keys
    extra = target_keys - source_keys
    empty = {k for k in target_keys if not target_file[k].strip()}

    coverage = (len(target_keys) - len(missing) - len(empty)) / len(source_keys) * 100

    return {
        'locale': locale,
        'coverage': coverage,
        'missing_keys': missing,
        'extra_keys': extra,
        'empty_values': empty,
        'status': 'PASS' if coverage >= 95 else 'FAIL'
    }
```

### Coverage Thresholds

| Locale Tier | Minimum Coverage | Action if Below |
|------------|-----------------|-----------------|
| Tier 1 (top markets) | 100% | Block release |
| Tier 2 (secondary) | 95% | Warn, ship with fallback |
| Tier 3 (emerging) | 80% | Ship with fallback to English |
| Tier 4 (long-tail) | 50% | Ship with extensive fallback |

---

## 3. PLACEHOLDER VALIDATION

### Variable Consistency Check

```python
import re

def validate_placeholders(source, target):
    """Ensure all placeholders in source exist in target and vice versa."""
    source_vars = set(re.findall(r'\{(\w+)\}', source))
    target_vars = set(re.findall(r'\{(\w+)\}', target))

    errors = []
    missing_in_target = source_vars - target_vars
    extra_in_target = target_vars - source_vars

    if missing_in_target:
        errors.append(f"Missing in target: {missing_in_target}")
    if extra_in_target:
        errors.append(f"Extra in target: {extra_in_target}")

    return errors
```

### Placeholder Types to Validate

| Placeholder Type | Format | Example |
|-----------------|--------|---------|
| Named ICU | `{name}` | `Hello, {name}!` |
| Positional | `%1$s`, `%2$d` | `%1$s has %2$d items` |
| Printf | `%s`, `%d`, `%f` | `Hello, %s!` |
| HTML tags | `<b>`, `<a>` | `Click <a>here</a>` |
| React components | `<Bold>`, `<Link>` | `<Bold>Welcome</Bold>` |

---

## 4. GLOSSARY COMPLIANCE

### Automated Terminology Check

```python
def check_glossary(translation, glossary, locale):
    """Check if glossary terms are used correctly in translation."""
    errors = []
    for term in glossary:
        source_term = term['source']
        expected_target = term['targets'][locale]

        if source_term.lower() in get_source_for(translation).lower():
            if expected_target.lower() not in translation.lower():
                errors.append({
                    'term': source_term,
                    'expected': expected_target,
                    'found': 'Term not found or different translation used',
                    'severity': 'major' if term.get('mandatory') else 'minor'
                })
    return errors
```

### Do-Not-Translate Validation

```python
def check_dnt(source, target, dnt_list):
    """Verify Do-Not-Translate terms are preserved."""
    errors = []
    for term in dnt_list:
        if term in source and term not in target:
            errors.append(f"DNT term '{term}' was translated or removed")
    return errors
```

---

## 5. LENGTH LIMIT VALIDATION

### Character Limit Checks

```python
def check_length(key, translation, limits):
    """Check if translation exceeds character limits."""
    if key in limits:
        max_length = limits[key]
        actual_length = len(translation)
        if actual_length > max_length:
            return {
                'key': key,
                'max': max_length,
                'actual': actual_length,
                'overflow': actual_length - max_length,
                'severity': 'major'
            }
    return None
```

### Where Length Limits Apply

| UI Element | Typical Limit | Consequence of Overflow |
|-----------|--------------|----------------------|
| Button label | 20–30 chars | Button breaks or text wraps |
| Tab label | 15–25 chars | Tab bar overflows |
| Menu item | 25–40 chars | Menu too wide |
| Toast message | 80–120 chars | Text truncated |
| Column header | 15–30 chars | Table misalignment |
| Mobile button | 12–20 chars | Touch target issues |

---

## 6. SCREENSHOT COMPARISON

### Visual QA Automation

```javascript
// Capture and compare screenshots across locales
async function captureLocaleScreenshots(page, route, locales) {
  const results = [];

  for (const locale of locales) {
    await page.goto(`/${locale}/${route}`);
    await page.waitForLoadState('networkidle');

    const screenshot = await page.screenshot({ fullPage: true });
    const baseline = loadBaseline(route, locale);

    if (baseline) {
      const diff = await compareImages(baseline, screenshot);
      results.push({
        locale,
        route,
        diffPercentage: diff.percentage,
        diffPixels: diff.pixels,
        status: diff.percentage < 0.5 ? 'PASS' : 'REVIEW'
      });
    }

    saveScreenshot(screenshot, route, locale);
  }

  return results;
}
```

### Screenshot QA Checks

| Check | Method | Catches |
|-------|--------|---------|
| Text overflow | Bounding box comparison | Truncated translations |
| Layout shift | Element position comparison | Displaced elements |
| Missing text | OCR or element inspection | Untranslated strings |
| RTL mirror | Baseline comparison | Non-mirrored elements |
| Font rendering | Visual comparison | Wrong font, broken glyphs |

---

## 7. QA PIPELINE ARCHITECTURE

### Automated QA Pipeline

```
Translation Delivered (from TMS)
    │
    ▼
Stage 1: File Validation
├── UTF-8 encoding check
├── JSON/XLIFF syntax validation
├── Key structure validation
└── Result: PASS / BLOCK
    │
    ▼
Stage 2: Content Validation
├── Completeness check (all keys present)
├── Placeholder validation
├── Tag consistency
├── Number consistency
├── DNT compliance
└── Result: PASS / WARN / BLOCK
    │
    ▼
Stage 3: Terminology Validation
├── Glossary compliance
├── Consistency check (same source = same target)
└── Result: PASS / WARN
    │
    ▼
Stage 4: UI Validation
├── Length limit check
├── Screenshot comparison (if infrastructure exists)
└── Result: PASS / WARN / BLOCK
    │
    ▼
Stage 5: Report Generation
├── Aggregate results per locale
├── Generate QA report
├── Notify team of issues
└── Block or approve delivery
```

### QA Decision Matrix

| Stage Result | Action |
|-------------|--------|
| All stages PASS | Auto-merge translations |
| Any stage WARN, no BLOCK | Merge with notification to review |
| Any stage BLOCK | Block merge, create issue for translator |

---

## 8. QA TOOLS

### Available QA Tools

| Tool | Type | Best For |
|------|------|---------|
| Xbench | Standalone | Comprehensive QA checks |
| QA Distiller | Standalone | Enterprise QA |
| TMS built-in QA | Integrated | Real-time during translation |
| Custom scripts | Programmatic | Project-specific rules |
| Playwright | Visual | Screenshot comparison |
| ESLint plugins | Static analysis | Code-level i18n checks |

### Custom QA Script Template

```python
#!/usr/bin/env python3
"""Localization QA script for automated checks."""

import json
import sys
from pathlib import Path

def run_qa(source_path, target_path, locale, glossary_path=None, limits_path=None):
    source = json.loads(Path(source_path).read_text())
    target = json.loads(Path(target_path).read_text())

    results = {
        'locale': locale,
        'checks': [],
        'total_errors': 0,
        'blocking_errors': 0
    }

    # Run all checks
    results['checks'].append(check_completeness(source, target))
    results['checks'].append(check_placeholders(source, target))

    if glossary_path:
        glossary = json.loads(Path(glossary_path).read_text())
        results['checks'].append(check_glossary(target, glossary, locale))

    if limits_path:
        limits = json.loads(Path(limits_path).read_text())
        results['checks'].append(check_lengths(target, limits))

    # Aggregate
    for check in results['checks']:
        results['total_errors'] += check.get('error_count', 0)
        if check.get('blocking'):
            results['blocking_errors'] += check['error_count']

    return results

if __name__ == '__main__':
    results = run_qa(sys.argv[1], sys.argv[2], sys.argv[3])
    print(json.dumps(results, indent=2))
    sys.exit(1 if results['blocking_errors'] > 0 else 0)
```

---

## 9. QA METRICS

| Metric | Formula | Target |
|--------|---------|--------|
| QA pass rate | Translations passing all checks / total | >95% |
| Blocking issues per delivery | Blocking errors per delivery | 0 |
| Time to QA resolution | Hours from QA fail to fix | <24 hours |
| False positive rate | Incorrect QA flags / total flags | <5% |
| QA coverage | Checks automated / total checks possible | >80% |

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| No automated QA | Manual review only | Build automated pipeline |
| Too strict | Every minor issue blocks | Severity-based routing |
| Too lenient | Blocking issues ignored | Enforce blocking gates |
| No false positive review | QA rules create noise | Regularly tune rules |
| QA after deploy | Checking production, not staging | Pre-deploy QA pipeline |
| Single check only | Only completeness, nothing else | Full check taxonomy |

---

**Automated localization QA is the safety net that catches defects before
they reach users. A well-configured QA pipeline eliminates entire categories
of bugs (placeholder errors, untranslated strings, format violations) with
zero ongoing human effort. The initial investment in building the pipeline
pays for itself within the first localization cycle.**
