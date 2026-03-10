# i18n Engineering — Authoritative Module

Internationalization engineering is the architectural foundation that enables
localization without code changes. Every i18n decision made (or not made)
during initial development determines the cost and quality of every future
localization effort. This document codifies the engineering practices for
building internationalized software.

---

## 1. STRING EXTERNALIZATION

### The Fundamental Rule

**No user-visible string shall exist in source code.** Every string that a
user might see must be externalized to a resource file and referenced by key.

### Resource File Formats

| Format | Extension | Ecosystem | Pros | Cons |
|--------|-----------|-----------|------|------|
| JSON | .json | JavaScript, React, Vue | Simple, ubiquitous | No comments, flat by default |
| YAML | .yml | Ruby, Python | Human-readable, hierarchical | Indentation sensitive |
| XLIFF | .xliff | Enterprise, CAT tools | Industry standard | Verbose XML |
| PO/POT | .po | GNU gettext, Python, PHP | Mature, well-supported | Legacy format |
| Properties | .properties | Java | Simple key=value | No nesting, ASCII limitations |
| Strings | .strings | iOS/macOS | Apple ecosystem standard | Platform-specific |
| XML | .xml | Android | Android standard | Verbose |
| ARB | .arb | Flutter/Dart | JSON-based, metadata support | Newer, smaller ecosystem |

### Key Naming Conventions

**Hierarchical keys (recommended):**
```json
{
  "auth.login.title": "Sign In",
  "auth.login.email_label": "Email Address",
  "auth.login.password_label": "Password",
  "auth.login.submit": "Sign In",
  "auth.login.error.invalid_credentials": "Invalid email or password",
  "auth.signup.title": "Create Account"
}
```

**Rules:**
- Use dot notation for hierarchy: `section.subsection.element`
- Use snake_case for key segments
- Be descriptive: `auth.login.submit` not `btn1`
- Never reuse keys for different contexts (same English text, different meaning)
- Include context in key name when disambiguation is needed

### String Externalization Anti-Patterns

| Anti-Pattern | Example | Fix |
|-------------|---------|-----|
| Hardcoded string | `<h1>Welcome</h1>` | `<h1>{t('home.welcome')}</h1>` |
| Concatenated strings | `"Hello " + name + "!"` | `t('greeting', { name })` |
| String in constant | `const TITLE = "Dashboard"` | `const TITLE_KEY = 'nav.dashboard'` |
| Partial externalization | Some strings externalized, some not | Audit and externalize all |
| Reused key, different meaning | Same key for "Save" (verb) and "Save" (noun) | Separate keys with context |

---

## 2. PLURALIZATION

### CLDR Plural Rules

Every language has its own pluralization rules defined by CLDR. The six
possible plural categories are:

| Category | Description | Example Languages |
|----------|-------------|------------------|
| zero | Special zero form | Arabic, Welsh |
| one | Singular or special "one" | English, French, German |
| two | Dual form | Arabic, Welsh, Slovenian |
| few | Paucal or small count | Polish, Russian, Czech |
| many | Large count or fraction | Arabic, Polish, Russian |
| other | General plural (always exists) | All languages |

### Implementation with i18next

```javascript
// Resource file
{
  "items": {
    "one": "{{count}} item",
    "other": "{{count}} items"
  }
}

// Usage
t('items', { count: 0 })  // "0 items"
t('items', { count: 1 })  // "1 item"
t('items', { count: 5 })  // "5 items"
```

### Implementation with ICU MessageFormat

```
{count, plural,
  =0 {No items in your cart}
  one {1 item in your cart}
  other {{count} items in your cart}
}
```

### Implementation with FormatJS (React Intl)

```jsx
<FormattedMessage
  id="cart.items"
  defaultMessage="{count, plural, one {# item} other {# items}} in your cart"
  values={{ count: itemCount }}
/>
```

### Pluralization Rules to Remember

- English has 2 forms (one, other) — **but most languages have more**
- Arabic has 6 forms — every form must be provided
- Japanese has 1 form (other) — no singular/plural distinction
- Never assume `count === 1` means singular (in French, 0 is singular)
- Always use CLDR rules, never custom logic

---

## 3. GENDER AGREEMENT

### The Problem

Many languages require grammatical gender agreement. A message like
"X invited you" requires knowing X's gender in French, German, Spanish,
Arabic, Hebrew, and many other languages.

### ICU Select for Gender

```
{gender, select,
  male {Il vous a invite}
  female {Elle vous a invitee}
  other {On vous a invite}
}
```

### Strategies for Gender-Neutral Design

| Strategy | Description | When to Use |
|----------|-------------|------------|
| Avoid gendered constructions | Restructure sentence | First choice |
| Use "they" / neutral form | Language-specific neutral | When available |
| ICU select | Provide all gender forms | When gender is known |
| Full name | Use name instead of pronoun | Context-appropriate |

---

## 4. TEXT EXPANSION

### The Expansion Problem

Translated text is almost always longer than English. UI must accommodate
expansion without breaking layout.

### Expansion Ratios by Language

| Target Language | Typical Expansion | Example |
|----------------|------------------|---------|
| German | +30–35% | "Save" → "Speichern" |
| French | +15–25% | "Save" → "Enregistrer" |
| Spanish | +20–30% | "Save" → "Guardar" |
| Italian | +15–25% | "Save" → "Salva" |
| Portuguese | +20–30% | "Save" → "Salvar" |
| Russian | +15–25% | "Save" → "Сохранить" |
| Japanese | -10–30% (shorter) | "Save" → "保存" |
| Chinese | -10–30% (shorter) | "Save" → "保存" |
| Korean | -10–20% (shorter) | "Save" → "저장" |
| Arabic | +20–25% | "Save" → "حفظ" (but longer sentences expand) |

### Engineering for Expansion

1. **Flexible layouts:** Use flexbox/grid, avoid fixed widths for text
2. **Text truncation:** Implement ellipsis with tooltip for overflow
3. **Min/max widths:** Set reasonable bounds, not exact sizes
4. **Button sizing:** Auto-size buttons to content, set min-width
5. **Line height:** Allow for taller characters (diacritics, CJK)
6. **Testing:** Use pseudo-localization to simulate expansion

---

## 5. RIGHT-TO-LEFT (RTL) SUPPORT

### CSS Logical Properties

Replace physical properties with logical equivalents:

| Physical (LTR-only) | Logical (LTR + RTL) |
|---------------------|---------------------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `text-align: left` | `text-align: start` |
| `float: left` | `float: inline-start` |
| `border-left` | `border-inline-start` |

### RTL Implementation Checklist

- [ ] HTML `dir="rtl"` attribute set per locale
- [ ] CSS uses logical properties throughout
- [ ] Directional icons flipped (arrows, progress bars)
- [ ] Non-directional icons preserved (search, settings)
- [ ] Bidirectional text handled (embedded LTR in RTL)
- [ ] Number input remains LTR
- [ ] Scrollbars appear on correct side
- [ ] Navigation order reversed
- [ ] Forms mirror correctly
- [ ] Shadow/gradient directions reversed where appropriate

---

## 6. I18N LIBRARIES

### i18next (JavaScript/TypeScript)

The dominant JavaScript i18n library.

```javascript
import i18next from 'i18next';

i18next.init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: { translation: { greeting: 'Hello, {{name}}!' } },
    fr: { translation: { greeting: 'Bonjour, {{name}} !' } }
  }
});

i18next.t('greeting', { name: 'World' }); // "Hello, World!"
```

**Ecosystem:** react-i18next, next-i18next, i18next-http-backend

### FormatJS / React Intl

ICU MessageFormat-based library for React.

```jsx
import { IntlProvider, FormattedMessage } from 'react-intl';

<IntlProvider locale="en" messages={messages}>
  <FormattedMessage id="greeting" values={{ name: 'World' }} />
</IntlProvider>
```

### ICU4J / ICU4C

The reference ICU implementation for Java and C/C++.

### Comparison

| Feature | i18next | FormatJS | ICU4J |
|---------|---------|----------|-------|
| Ecosystem | JavaScript | React | Java/C++ |
| Message format | Simple + ICU plugin | ICU MessageFormat | ICU MessageFormat |
| Plural support | CLDR via plugin | CLDR built-in | CLDR built-in |
| Gender support | ICU plugin | ICU built-in | ICU built-in |
| Lazy loading | Built-in | Manual | N/A |
| TMS integration | Excellent | Good | Limited |
| Learning curve | Low | Medium | High |

---

## 7. I18N ARCHITECTURE PATTERNS

### Pattern 1: Static Resource Loading

```
App Start → Load locale → Load resource file → Render
```

Best for: Server-rendered apps, static sites.

### Pattern 2: Dynamic/Lazy Loading

```
App Start → Load default locale →
  User changes locale → Fetch resource file → Re-render
```

Best for: SPAs with many languages.

### Pattern 3: Server-Side Rendering with Locale

```
Request with locale → Server loads resources → Render HTML → Hydrate client
```

Best for: Next.js, Nuxt, SEO-critical apps.

### Pattern 4: Edge Localization

```
Request → Edge function detects locale → Serve locale-specific content
```

Best for: High-performance global apps.

---

## 8. I18N TESTING

### Automated Checks

| Check | Tool | What It Catches |
|-------|------|----------------|
| Hardcoded string detection | ESLint plugin, custom scanner | Strings not externalized |
| Missing translations | Build-time check | Keys without translations |
| Unused keys | Script | Dead translation keys |
| Placeholder validation | QA tool | Missing or extra {variables} |
| ICU syntax validation | Parser | Malformed ICU messages |
| Pseudo-localization | i18next pseudo plugin | Layout issues, hardcoded strings |

### Pseudo-Localization

Pseudo-localization transforms English strings to simulate localization
challenges without actual translation:

```
"Save" → "[Šààvé____]"
             │││   │
             ││└── Accented chars (encoding test)
             │└─── Padding (expansion test)
             └──── Brackets (externalization test)
```

---

## 9. I18N CHECKLIST

### Before First Localization

- [ ] All user-visible strings externalized
- [ ] ICU MessageFormat or equivalent for plurals/gender
- [ ] CLDR plural rules used (not custom logic)
- [ ] Date/time formatting uses Intl API or ICU
- [ ] Number/currency formatting uses Intl API or ICU
- [ ] CSS uses logical properties (not left/right)
- [ ] Layout accommodates 40% text expansion
- [ ] RTL support implemented (if targeting RTL locales)
- [ ] Locale detection implemented (Accept-Language, user preference)
- [ ] Locale switching UI implemented
- [ ] Resource files organized by locale
- [ ] Build process includes locale validation
- [ ] Pseudo-localization testing passes
- [ ] No string concatenation for translatable content
- [ ] Images with text have locale-specific alternatives or are text-free

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| String concatenation | `"Hello " + name` | ICU MessageFormat: `Hello, {name}!` |
| Hardcoded plurals | `count === 1 ? "item" : "items"` | CLDR plural rules |
| CSS physical properties | `margin-left: 10px` | `margin-inline-start: 10px` |
| Fixed-width UI | Buttons with pixel widths | Flexible layout, min-width |
| Late i18n | Adding i18n after v1.0 | i18n from project start |
| English-only testing | Never testing with other locales | Pseudo-localization in CI |

---

**Internationalization engineering is a one-time investment that pays
dividends across every localization effort. The cost of retrofitting i18n
is 5–10x the cost of building it in from the start. Every hour spent on
proper i18n architecture saves days of localization engineering later.**
