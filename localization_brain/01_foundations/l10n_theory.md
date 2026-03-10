# Localization Theory — Authoritative Foundation

Localization is not translation. Translation converts words between languages.
Localization adapts an entire product experience for a target market — language,
culture, conventions, legal requirements, and user expectations. This document
codifies the theoretical foundations governing all localization work.

---

## 1. DEFINITIONAL FRAMEWORK

### i18n vs. l10n vs. Translation

| Term | Full Name | Definition | Scope |
|------|-----------|-----------|-------|
| i18n | Internationalization | Engineering a product to support multiple locales without code changes | Architecture |
| l10n | Localization | Adapting a product for a specific locale (language, culture, market) | Content + Culture |
| t9n | Translation | Converting text from one language to another | Text only |
| g11n | Globalization | The entire process of taking a product global (i18n + l10n + business) | Strategy |

### The Relationship

```
Globalization (g11n)
├── Internationalization (i18n) — Engineering foundation
│   ├── String externalization
│   ├── Locale-aware formatting
│   ├── UI flexibility
│   └── Technical preparation
├── Localization (l10n) — Market adaptation
│   ├── Translation (t9n)
│   ├── Cultural adaptation
│   ├── Visual adaptation
│   └── Legal compliance
└── Market strategy — Business decisions
    ├── Market selection
    ├── Go-to-market
    └── Local operations
```

**Critical distinction:** i18n is done once (engineering). l10n is done per
locale (content + culture). If i18n is done poorly, every l10n effort is
more expensive and error-prone.

---

## 2. THE LOCALE CONCEPT

### What Is a Locale?

A locale is a combination of language, region, and optional variants that
determines how content is displayed and processed.

### Locale Identifier Format (BCP 47)

```
language[-script][-region][-variant]

Examples:
  en          — English (generic)
  en-US       — English (United States)
  en-GB       — English (United Kingdom)
  zh-Hans     — Chinese (Simplified script)
  zh-Hant-TW  — Chinese (Traditional script, Taiwan)
  pt-BR       — Portuguese (Brazil)
  pt-PT       — Portuguese (Portugal)
  sr-Latn     — Serbian (Latin script)
  sr-Cyrl     — Serbian (Cyrillic script)
```

### Locale Components

| Component | Code | What It Determines |
|-----------|------|-------------------|
| Language | ISO 639-1/2 | Base language (en, fr, de, ja) |
| Script | ISO 15924 | Writing system (Latn, Cyrl, Hans, Arab) |
| Region | ISO 3166-1 | Country/territory (US, GB, DE, JP) |
| Variant | IANA registry | Specific variant (traditional, revised) |

### Language vs. Locale

**Language is not locale.** Spanish is a language. es-MX (Mexican Spanish),
es-ES (Castilian Spanish), and es-AR (Argentine Spanish) are different
locales with different vocabulary, formatting, and cultural conventions.

| Locale | Currency | Date Format | Decimal | "Computer" |
|--------|----------|-------------|---------|-----------|
| es-ES | EUR (1.234,56) | dd/MM/yyyy | , | ordenador |
| es-MX | MXN ($1,234.56) | dd/MM/yyyy | . | computadora |
| es-AR | ARS ($1.234,56) | dd/MM/yyyy | , | computadora |

---

## 3. UNICODE AND UTF-8

### The Character Encoding Problem

Before Unicode, every writing system had its own encoding standard:
ASCII (English), ISO-8859-1 (Western European), Shift-JIS (Japanese),
Big5 (Traditional Chinese), KOI8-R (Russian). Mixing encodings in a
single application was fragile and error-prone.

### Unicode

Unicode assigns a unique code point to every character in every writing
system. Current version (15.1) defines 149,813 characters across 161
scripts.

### UTF-8

UTF-8 is the dominant encoding of Unicode. It is:
- **Variable-width:** 1–4 bytes per character
- **ASCII-compatible:** ASCII characters use 1 byte
- **Self-synchronizing:** Can detect character boundaries from any byte
- **Dominant:** ~98% of web pages use UTF-8

**Engineering rule:** All text storage, transmission, and processing
MUST use UTF-8. No exceptions. Legacy encodings are technical debt.

### Common Unicode Issues

| Issue | Example | Solution |
|-------|---------|---------|
| Mojibake | "CafÃ©" instead of "Cafe" | Ensure UTF-8 end-to-end |
| NFC vs. NFD | "e" (precomposed) vs. "e" + "combining accent" | Normalize to NFC |
| BOM | Invisible byte order mark at file start | Strip BOM, use UTF-8 without BOM |
| Surrogate pairs | Characters above U+FFFF in UTF-16 | Use UTF-8 instead of UTF-16 |
| Zero-width characters | Invisible characters that affect string comparison | Normalize and strip |

---

## 4. CLDR (Common Locale Data Repository)

### What Is CLDR?

CLDR is the Unicode Consortium's repository of locale-specific data. It is
the authoritative source for how locales format dates, numbers, currencies,
lists, and more.

### CLDR Data Categories

| Category | Data Provided | Example |
|----------|-------------|---------|
| Date/time formatting | Patterns, calendars, eras | "MMM d, y" vs. "d. MMM y" |
| Number formatting | Decimal, grouping, percent | 1,234.56 vs. 1.234,56 |
| Currency | Symbols, placement, formatting | $1,234.56 vs. 1.234,56 EUR |
| Pluralization | Plural rule categories per language | one, few, many, other |
| List formatting | Conjunction patterns | "A, B, and C" vs. "A, B et C" |
| Measurement | Units, measurement systems | Metric vs. imperial |
| Calendar | Calendar systems, week data | Gregorian, Islamic, Japanese |
| Collation | Sort order rules | Language-specific alphabetical order |

### CLDR Pluralization Rules

Pluralization is far more complex than English (singular/plural):

| Language | Categories | Example |
|----------|-----------|---------|
| English | one, other | 1 item, 2 items |
| French | one, other | 1 element, 2 elements (but: 0 element) |
| Arabic | zero, one, two, few, many, other | 6 categories |
| Polish | one, few, many, other | 1 plik, 2 pliki, 5 plikow |
| Japanese | other | 1 item, 2 item (no plural) |
| Russian | one, few, many, other | 1 файл, 2 файла, 5 файлов |
| Welsh | zero, one, two, few, many, other | 6 categories |

**Engineering rule:** Never hardcode plural logic. Always use CLDR plural
rules via ICU or an equivalent library.

---

## 5. ICU MESSAGE FORMAT

### What Is ICU MessageFormat?

The International Components for Unicode (ICU) project provides MessageFormat,
the standard for locale-aware message formatting with variable interpolation,
pluralization, and gender agreement.

### ICU MessageFormat Syntax

**Simple variable:**
```
Hello, {name}!
```

**Plural:**
```
{count, plural,
  =0 {No items}
  one {1 item}
  other {{count} items}
}
```

**Select (gender):**
```
{gender, select,
  male {He left}
  female {She left}
  other {They left}
}
```

**Nested (plural + gender):**
```
{gender, select,
  male {{count, plural,
    one {He has 1 item}
    other {He has {count} items}
  }}
  female {{count, plural,
    one {She has 1 item}
    other {She has {count} items}
  }}
  other {{count, plural,
    one {They have 1 item}
    other {They have {count} items}
  }}
}
```

### Why ICU MessageFormat Matters

Without proper message formatting:
- Pluralization breaks ("1 items")
- Gender agreement fails
- Number formatting is wrong
- Date formatting is inconsistent
- Concatenated strings produce grammatically incorrect translations

---

## 6. HOFSTEDE CULTURAL DIMENSIONS

### Geert Hofstede's Framework

Hofstede's cultural dimensions theory provides a framework for understanding
cultural differences that impact product localization beyond language.

### The Six Dimensions

| Dimension | Low Score | High Score | Design Impact |
|-----------|----------|-----------|---------------|
| Power Distance (PDI) | Flat hierarchy, informal | Hierarchical, formal | Tone, formality, authority signals |
| Individualism (IDV) | Collectivist, group-focused | Individualist, self-focused | Messaging, social proof, personalization |
| Masculinity (MAS) | Quality of life, consensus | Achievement, competition | Gamification, competitive elements |
| Uncertainty Avoidance (UAI) | Comfort with ambiguity | Need for structure | Error messages, guidance, explicitness |
| Long-Term Orientation (LTO) | Tradition, short-term | Pragmatic, long-term | Value propositions, savings messaging |
| Indulgence (IVR) | Restrained | Indulgent | Emotional appeals, playfulness |

### Country Examples

| Country | PDI | IDV | MAS | UAI | LTO | IVR |
|---------|-----|-----|-----|-----|-----|-----|
| USA | 40 | 91 | 62 | 46 | 26 | 68 |
| Japan | 54 | 46 | 95 | 92 | 88 | 42 |
| Germany | 35 | 67 | 66 | 65 | 83 | 40 |
| Brazil | 69 | 38 | 49 | 76 | 44 | 59 |
| China | 80 | 20 | 66 | 30 | 87 | 24 |
| India | 77 | 48 | 56 | 40 | 51 | 26 |
| Saudi Arabia | 95 | 25 | 60 | 80 | 36 | 52 |

### Applying Hofstede to Localization

| Dimension | High Score Locale Adaptation |
|-----------|---------------------------|
| High PDI | Use formal language, show authority credentials |
| High IDV | Personalized messaging, individual achievement |
| High MAS | Competitive language, achievement-oriented |
| High UAI | Detailed explanations, error prevention, explicit guidance |
| High LTO | Long-term value propositions, tradition references |
| High IVR | Playful tone, emotional imagery, lifestyle messaging |

---

## 7. TEXT DIRECTIONALITY

### Left-to-Right (LTR) vs. Right-to-Left (RTL)

| Direction | Languages | % of Web | UI Impact |
|-----------|-----------|---------|----------|
| LTR | English, most European, CJK | ~85% | Default |
| RTL | Arabic, Hebrew, Persian, Urdu | ~12% | Full mirror required |
| Vertical | Traditional Japanese, Chinese, Mongolian | ~3% | Specialized layout |

### RTL Adaptation Requirements

When adapting for RTL:
- **Mirror the layout** — Everything flips horizontally
- **Icons with direction** — Arrows, progress indicators must flip
- **Text alignment** — Right-aligned by default
- **Bidirectional text** — Mixed LTR/RTL content (BiDi) requires special handling
- **Numbers stay LTR** — Even in RTL contexts, numbers read left-to-right
- **CSS logical properties** — Use `margin-inline-start` not `margin-left`

---

## 8. LOCALIZATION MATURITY MODEL

| Level | Name | Description |
|-------|------|-------------|
| 0 | Absent | No localization; English only |
| 1 | Reactive | Localization done ad hoc when requested |
| 2 | Managed | Defined l10n process, basic tooling |
| 3 | Defined | Continuous l10n, TMS, glossary, style guides |
| 4 | Optimized | Automated pipelines, quality metrics, ROI tracking |
| 5 | Strategic | L10n informs product strategy, market-driven prioritization |

---

## 9. THEORETICAL INTEGRATION

Localization work within this brain synthesizes:

1. **Locale theory** provides the structural model (language + region + script)
2. **Unicode/UTF-8** provides the technical foundation (character encoding)
3. **CLDR** provides the data model (formatting rules per locale)
4. **ICU MessageFormat** provides the string model (variable, plural, gender)
5. **Hofstede** provides the cultural model (adaptation beyond language)
6. **Maturity model** provides the organizational model (capability progression)

No localization decision should be made without considering all dimensions.

---

## 10. ANTI-PATTERNS IN LOCALIZATION THEORY

| Anti-Pattern | Description | Consequence |
|-------------|-------------|-------------|
| Translation = localization | Only translating text, ignoring culture | Culturally inappropriate product |
| English-first forever | Treating l10n as an afterthought | Expensive retrofitting |
| One language = one locale | Ignoring regional variants (pt-BR vs. pt-PT) | Alienated users |
| Hardcoded formatting | Dates, numbers, currencies in code | Broken formatting per locale |
| Ignoring plurals | Using simple singular/plural | Grammatically incorrect in many languages |
| ASCII assumption | 7-bit character processing | Broken for non-Latin scripts |

---

**Localization theory is the foundation upon which all internationalization
engineering, localization operations, and global content strategy rest.
Understanding the theoretical distinction between translation, localization,
and globalization — and the technical infrastructure of locales, Unicode,
CLDR, and ICU — is prerequisite to any effective localization work.**
