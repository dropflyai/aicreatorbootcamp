# Localization Tooling — Authoritative Module

Localization tooling encompasses the file formats, string extraction
methods, plural handling systems, context provision mechanisms, and
screenshot integration that form the technical interface between
development and translation. This document codifies the tooling
standards and practices for efficient localization workflows.

---

## 1. FILE FORMATS

### JSON (JavaScript Ecosystem)

**Standard JSON (flat):**
```json
{
  "greeting": "Hello, {name}!",
  "items_count": "{count, plural, one {# item} other {# items}}",
  "save_button": "Save"
}
```

**Nested JSON (hierarchical):**
```json
{
  "auth": {
    "login": {
      "title": "Sign In",
      "submit": "Sign In",
      "error": "Invalid credentials"
    }
  }
}
```

**JSON with ICU MessageFormat (FormatJS):**
```json
{
  "greeting": {
    "defaultMessage": "Hello, {name}!",
    "description": "Greeting shown on the home page"
  }
}
```

| Pros | Cons |
|------|------|
| Ubiquitous, easy to parse | No built-in comment support |
| Nested structure available | No metadata without custom schema |
| Wide TMS support | Flat keys can become unwieldy |

### XLIFF 2.0 (Industry Standard)

```xml
<xliff version="2.0" srcLang="en" trgLang="de">
  <file id="f1">
    <unit id="greeting">
      <notes>
        <note category="context">Shown on the home page</note>
      </notes>
      <segment>
        <source>Hello, {name}!</source>
        <target>Hallo, {name}!</target>
      </segment>
    </unit>
  </file>
</xliff>
```

| Pros | Cons |
|------|------|
| Industry standard, rich metadata | Verbose XML |
| Notes, context, state tracking | Heavier to parse |
| CAT tool native support | Overkill for simple projects |

### PO/POT (gettext)

```po
# Greeting shown on the home page
#: src/components/Home.js:42
msgid "Hello, {name}!"
msgstr "Hallo, {name}!"

msgid "Save"
msgstr "Speichern"
```

| Pros | Cons |
|------|------|
| Mature, well-understood | Legacy format |
| Built-in comments and context | Not native to modern JS |
| Wide tool support | Flat structure only |

### YAML (Ruby, Python)

```yaml
en:
  auth:
    login:
      title: Sign In
      submit: Sign In
      error: Invalid credentials
```

| Pros | Cons |
|------|------|
| Human-readable, hierarchical | Indentation-sensitive (error-prone) |
| Comments supported | YAML spec complexity |
| Native to Ruby/Python | Less TMS support than JSON |

### Strings/Stringsdict (iOS)

```
/* Greeting on home screen */
"greeting" = "Hello, %@!";
```

```xml
<!-- Stringsdict for plurals -->
<dict>
  <key>items_count</key>
  <dict>
    <key>NSStringLocalizedFormatKey</key>
    <string>%#@count@</string>
    <key>count</key>
    <dict>
      <key>NSStringFormatSpecTypeKey</key>
      <string>NSStringPluralRuleType</string>
      <key>one</key>
      <string>%d item</string>
      <key>other</key>
      <string>%d items</string>
    </dict>
  </dict>
</dict>
```

### XML (Android)

```xml
<resources>
  <string name="greeting">Hello, %s!</string>
  <plurals name="items_count">
    <item quantity="one">%d item</item>
    <item quantity="other">%d items</item>
  </plurals>
</resources>
```

### Format Selection Guide

| Platform/Framework | Recommended Format | Plural Handling |
|-------------------|-------------------|----------------|
| React + i18next | JSON (nested) | i18next plural suffixes |
| React + FormatJS | JSON with ICU | ICU MessageFormat |
| Next.js | JSON | i18next or FormatJS |
| Vue + vue-i18n | JSON | vue-i18n plural syntax |
| Angular | XLIFF or JSON | ICU MessageFormat |
| iOS/Swift | .strings + .stringsdict | Stringsdict |
| Android/Kotlin | XML resources | XML plurals |
| Flutter/Dart | ARB | ICU MessageFormat |
| Python/Django | PO/POT | gettext plurals |
| Ruby/Rails | YAML | Rails i18n plurals |

---

## 2. STRING EXTRACTION

### Automated Extraction Methods

| Framework | Tool | Command |
|-----------|------|---------|
| FormatJS | @formatjs/cli | `formatjs extract 'src/**/*.tsx'` |
| i18next | i18next-parser | `i18next-parser 'src/**/*.tsx'` |
| Android | Android Studio | Built-in extraction |
| iOS | genstrings | `genstrings -o en.lproj src/*.swift` |
| Django | django-admin | `django-admin makemessages -l de` |
| Rails | i18n-tasks | `i18n-tasks missing` |

### Extraction Best Practices

1. **Extract to a single source-of-truth file** per module
2. **Generate IDs automatically** (FormatJS) or enforce naming convention
3. **Include source file references** for context
4. **Run extraction in CI** to catch new unexternalized strings
5. **Diff extraction output** to identify new/changed/removed strings

---

## 3. PLURAL HANDLING

### CLDR Plural Categories

| Language | Required Categories |
|----------|-------------------|
| English | one, other |
| French | one, other (0 is singular) |
| Arabic | zero, one, two, few, many, other |
| Polish | one, few, many, other |
| Japanese | other (only) |
| Russian | one, few, many, other |
| Czech | one, few, many, other |
| Welsh | zero, one, two, few, many, other |

### Plural Implementation Comparison

**i18next:**
```json
{
  "items_one": "{{count}} item",
  "items_other": "{{count}} items"
}
```

**ICU MessageFormat:**
```
{count, plural, one {# item} other {# items}}
```

**Android XML:**
```xml
<plurals name="items">
  <item quantity="one">%d item</item>
  <item quantity="other">%d items</item>
</plurals>
```

### Ordinals

Ordinals (1st, 2nd, 3rd) have their own CLDR rules:
```
{rank, selectordinal,
  one {#st}
  two {#nd}
  few {#rd}
  other {#th}
}
```

---

## 4. CONTEXT PROVISION

### Why Context Matters

Translators without context produce lower-quality translations. The word
"Save" could be a verb (save the file), a noun (a financial save), or
an adjective (save mode). Without context, translators guess.

### Context Methods

| Method | Description | Effectiveness |
|--------|-------------|---------------|
| Key naming | Descriptive keys (`auth.login.submit_button`) | Medium |
| Developer comments | Comments in resource files | Medium |
| Screenshots | Visual context of where string appears | High |
| Description field | Metadata in resource files | High |
| Character limits | Max length for UI constraints | Medium |
| Placeholder descriptions | What {variables} represent | High |

### Screenshot Integration

**Automated screenshot capture:**
```javascript
// Playwright script to capture screenshots with string context
const pages = ['login', 'dashboard', 'settings', 'profile'];

for (const page of pages) {
  await browser.goto(`/${page}`);
  const screenshot = await browser.screenshot();
  await tmsClient.uploadScreenshot(screenshot, {
    page: page,
    tags: extractVisibleStringKeys(page)
  });
}
```

**TMS screenshot features:**
| TMS | Screenshot Support | Automation |
|-----|-------------------|-----------|
| Crowdin | In-context editor, screenshot tagging | API + CLI |
| Lokalise | Screenshot upload + string tagging | API |
| Phrase | Visual context | API |
| Smartling | Visual context | Chrome extension |

---

## 5. LOCALE FILE MANAGEMENT

### File Organization Patterns

**Pattern 1: Locale per file**
```
src/locales/
├── en.json
├── de.json
├── fr.json
└── ja.json
```

**Pattern 2: Namespace per file**
```
src/locales/
├── en/
│   ├── common.json
│   ├── auth.json
│   └── dashboard.json
├── de/
│   ├── common.json
│   ├── auth.json
│   └── dashboard.json
```

**Pattern 3: Feature-colocated**
```
src/features/
├── auth/
│   ├── Auth.tsx
│   └── locales/
│       ├── en.json
│       └── de.json
├── dashboard/
│   ├── Dashboard.tsx
│   └── locales/
│       ├── en.json
│       └── de.json
```

### File Management Rules

1. **Source locale is the single source of truth** (usually `en.json`)
2. **Never manually edit target locale files** — TMS generates them
3. **Validate structure** — Target files must have same keys as source
4. **Version control** — All locale files in Git
5. **Atomic updates** — Update all locales in one commit/PR

---

## 6. TOOLING INTEGRATION ARCHITECTURE

### Full Stack Integration

```
                    ┌─────────────┐
                    │   Source     │
                    │   Code      │
                    └──────┬──────┘
                           │ (CI: push source strings)
                    ┌──────▼──────┐
                    │    TMS      │
                    │ (Crowdin)   │
                    └──────┬──────┘
                           │ (Webhook: translations ready)
                    ┌──────▼──────┐
                    │   CI/CD     │
                    │ (GitHub     │
                    │  Actions)   │
                    └──────┬──────┘
                           │ (Deploy or PR)
              ┌────────────┼────────────┐
              │            │            │
       ┌──────▼──────┐ ┌──▼───┐ ┌─────▼────┐
       │   Web App   │ │ iOS  │ │ Android  │
       │  (bundled   │ │ App  │ │   App    │
       │   or OTA)   │ │      │ │          │
       └─────────────┘ └──────┘ └──────────┘
```

---

## 7. TOOLING EVALUATION

### Evaluation Criteria for l10n Tooling

| Criterion | Weight | Questions |
|-----------|--------|-----------|
| Format support | 20% | Does it support our file formats natively? |
| Integration | 20% | Git, CI/CD, API quality? |
| Translator experience | 15% | Editor quality, context display, TM/MT? |
| Automation | 15% | Workflow automation, webhooks, scheduled tasks? |
| Quality tools | 10% | QA checks, glossary, style guide support? |
| Reporting | 10% | Progress, cost, quality dashboards? |
| Cost | 10% | Total cost at current and projected scale? |

---

## 8. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Wrong format choice | Using XML in a JavaScript project | Use ecosystem-native format |
| No context for translators | Bare keys with no description | Screenshots + comments |
| Manual plural logic | Custom plural code per language | CLDR rules via library |
| Hardcoded locale files | Translators cannot access via TMS | TMS-managed files |
| No extraction automation | Manually finding new strings | Automated extraction in CI |
| Monolith locale file | One massive file per locale | Namespace-based splitting |

---

**Localization tooling is the interface between development and translation.
When the tooling is well-chosen and properly configured, localization
becomes a seamless part of the development process. When it is poorly
chosen, every localization cycle involves manual work, format conversions,
and preventable errors. Invest in tooling early — it pays dividends with
every string translated.**
