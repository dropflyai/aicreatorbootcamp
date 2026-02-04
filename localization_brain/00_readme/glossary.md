# Glossary — Localization Brain

## Canonical Terminology

This glossary defines the authoritative terminology used throughout the Localization Brain. All modules, patterns, templates, and evaluations MUST use these terms consistently. Ambiguous usage is forbidden.

---

## Core Concepts (GILT)

### Globalization (g11n)
The overarching business strategy of making products, services, and operations viable across international markets. Encompasses internationalization, localization, and translation as sub-disciplines. The "g11n" numeronym represents the 11 letters between "g" and "n." Globalization includes market analysis, locale prioritization, and organizational readiness --- not just linguistic work.

### Internationalization (i18n)
The engineering discipline of designing and developing software so it can be adapted to various languages, regions, and cultures **without requiring code changes**. The "i18n" numeronym represents the 18 letters between "i" and "n." i18n is a prerequisite to localization. Key i18n concerns: string externalization, locale-aware formatting, bidirectional text support, Unicode compliance, and resource bundle architecture.

### Localization (l10n)
The process of adapting a product for a specific locale, including translation of text, adaptation of graphics, modification of content to suit cultural preferences, conversion of units and formats, and compliance with local regulations. The "l10n" numeronym represents the 10 letters between "l" and "n." Localization is broader than translation --- it includes cultural, functional, and legal adaptation.

### Translation (t9n)
The conversion of text from one language (source) to another (target) while preserving meaning, intent, and tone. Translation is a **subset** of localization. A product can be translated without being localized (e.g., translated text with wrong date format). The "t9n" numeronym represents the 9 letters between "t" and "n."

### Locale
A specific combination of language, region, and optionally script and variant, identified by a locale code. Examples: `en-US` (English, United States), `pt-BR` (Portuguese, Brazil), `zh-Hans-CN` (Chinese, Simplified script, China). Defined by BCP 47 (IETF language tags). A locale determines all formatting conventions: date/time, number, currency, collation, text direction.

### Source Language
The original language in which content is authored. Typically English (en) in global software products. All translations derive from source language content.

### Target Language
The language into which source content is translated. A single source can have multiple targets.

---

## Translation Technology

### CAT Tool (Computer-Assisted Translation Tool)
Software that aids human translators by providing translation memory, terminology databases, quality checks, and segmentation. NOT machine translation --- CAT tools assist humans, not replace them. Examples: SDL Trados Studio, memoQ, Memsource (now Phrase TMS), Wordfast, OmegaT.

### Translation Memory (TM)
A database of previously translated segments (sentence-level or sub-sentence-level pairs of source and target text). When new content contains segments similar to previously translated segments, the TM suggests matches, reducing translation cost and improving consistency. Match types:
- **100% Match (Exact)**: Identical segment exists in TM
- **Context Match (101% / ICE)**: Identical segment with identical surrounding context
- **Fuzzy Match**: Similar but not identical (typically 75-99% similarity)
- **No Match**: No useful match in TM; requires new translation

### Termbase (Terminology Database)
A structured database of approved terminology with definitions, context, and translations. Ensures consistency of key terms across all translations. Managed in terminology management tools (SDL MultiTerm, Across crossTerm) or within TMS platforms.

### TMS (Translation Management System)
A platform that orchestrates the end-to-end localization workflow: string extraction, translation assignment, review, quality assurance, and delivery. Cloud-based TMS platforms (Lokalise, Phrase, Crowdin, Smartling) have largely replaced on-premise solutions. A TMS typically integrates with version control, CI/CD, and CAT tools.

### Machine Translation (MT)
Automated translation by software. Major engines: Google Translate (NMT), DeepL, Microsoft Translator, Amazon Translate, ModernMT. MT output requires post-editing for production use. Types:
- **Rule-Based MT (RBMT)**: Linguistic rules (legacy, mostly obsolete)
- **Statistical MT (SMT)**: Probability models from parallel corpora (largely superseded)
- **Neural MT (NMT)**: Deep learning models; current state of the art

### MTPE (Machine Translation Post-Editing)
The process of a human linguist editing machine-translated output to achieve required quality. Two levels:
- **Light Post-Editing (LPE)**: Correct critical errors only; "good enough" quality for informational content
- **Full Post-Editing (FPE)**: Edit to human-translation quality; indistinguishable from human translation

### Translation Proxy
A technology that serves localized versions of a website by intercepting HTTP requests and replacing content with translations, without modifying the source application. Examples: Smartling GDN, Transifex Live, Easyling.

---

## Quality Frameworks

### MQM (Multidimensional Quality Metrics)
An analytical framework for assessing translation quality through a taxonomy of error types. Developed by DFKI and the QTLaunchPad project. MQM categorizes errors into dimensions:
- **Accuracy**: Mistranslation, omission, addition, untranslated text
- **Fluency**: Grammar, spelling, punctuation, register, inconsistency
- **Terminology**: Wrong term, inconsistent use of terms
- **Style**: Awkward phrasing, not matching style guide
- **Locale Conventions**: Date/time format, number format, currency, measurement
- **Design**: Truncation, overlap, character corruption
Each error is weighted by severity (critical, major, minor) and a score is calculated per 1000 words.

### DQF (Dynamic Quality Framework)
A framework by TAUS (Translation Automation User Society) for benchmarking translation quality. Provides standardized metrics for comparing translation quality across projects, vendors, and MT engines. Complementary to MQM.

### LQA (Linguistic Quality Assurance)
The process of systematically reviewing translations against quality criteria. LQA typically uses MQM-based scorecards. Distinct from functional QA (which tests features) and cosmetic QA (which tests UI rendering).

---

## File Formats

### XLIFF (XML Localization Interchange File Format)
An OASIS standard (current version: XLIFF 2.0) for exchanging localization data between tools. XLIFF is the industry-standard interchange format. It separates translatable content from non-translatable structure. Supports notes, state tracking, and inline markup.

### PO/POT (Portable Object / Portable Object Template)
GNU gettext format. POT files contain source strings (template); PO files contain translations. Widely used in open-source projects, WordPress, Django, Ruby on Rails. Simple key-value format with context and plural support.

### ARB (Application Resource Bundle)
JSON-based format used by Flutter/Dart for localization. Supports ICU MessageFormat, metadata, and placeholders. Each ARB file represents one locale.

### JSON i18n
Generic JSON structures used for web application localization. No single standard; conventions vary by framework (react-intl, i18next, vue-i18n). Typically nested key-value pairs with namespace support.

### Properties (Java Resource Bundles)
Key-value pairs in `.properties` files, historically used in Java applications. One file per locale (e.g., `messages_ja.properties`). Limited support for context or plurals.

### YAML i18n
YAML-based localization files used by Ruby on Rails (`config/locales/`) and other frameworks. Hierarchical key-value structure with good readability but whitespace-sensitive formatting.

---

## Unicode and Encoding

### Unicode
A universal character encoding standard maintained by the Unicode Consortium. Assigns a unique code point (e.g., U+0041 for "A") to every character in every writing system. Current version covers over 149,000 characters across 161 scripts.

### UTF-8
A variable-width character encoding for Unicode. Uses 1-4 bytes per character. Backward-compatible with ASCII. The dominant encoding on the web (>98% of websites). UTF-8 is the ONLY acceptable encoding for modern software.

### UTF-16
A variable-width encoding using 2 or 4 bytes. Used internally by JavaScript, Java, and Windows. Not recommended for file storage or data interchange due to byte-order issues.

### CLDR (Common Locale Data Repository)
A project of the Unicode Consortium providing the world's largest repository of locale data: date/time formats, number formats, currency symbols, calendar systems, collation rules, and more. The authoritative source for locale-specific formatting rules. Used by ICU, Java, POSIX, and all major platforms.

### ICU (International Components for Unicode)
A mature, widely used set of C/C++ and Java libraries for Unicode support and internationalization. ICU provides: locale-aware formatting (dates, numbers, currencies), collation, transliteration, break iteration, and MessageFormat. ICU MessageFormat is the standard for handling plurals, gender, and select patterns in translatable strings.

### BCP 47
IETF Best Current Practice for language tags. Defines the syntax for locale identifiers: `language[-script][-region][-variant]`. Examples: `en`, `en-US`, `zh-Hans-CN`, `sr-Latn-RS`. The canonical format for locale codes.

### Grapheme Cluster
A user-perceived character that may consist of multiple Unicode code points. For example, the flag emoji consists of two regional indicator characters. Text operations (cursor movement, selection, truncation) must operate on grapheme clusters, not individual code points.

### Normalization (Unicode)
The process of converting Unicode text to a canonical form. Four normalization forms: NFC (Canonical Decomposition followed by Canonical Composition), NFD, NFKC, NFKD. Essential for string comparison, search, and sorting. NFC is the recommended form for storage and interchange.

---

## Bidirectional Text (BiDi)

### RTL (Right-to-Left)
Text direction where characters flow from right to left. Primary RTL scripts: Arabic, Hebrew, Thaana, Syriac, N'Ko. RTL affects not only text but also UI layout mirroring (navigation, icons, progress bars).

### LTR (Left-to-Right)
Text direction where characters flow from left to right. Most scripts worldwide are LTR, including Latin, Cyrillic, Devanagari, CJK, and Greek.

### BiDi (Bidirectional)
The handling of text that contains both RTL and LTR content in the same context. The Unicode Bidirectional Algorithm (UBA, UAX #9) defines how mixed-direction text is rendered. Example: an Arabic sentence containing an English product name.

### CSS Logical Properties
CSS properties that use logical directions (`inline-start`, `inline-end`, `block-start`, `block-end`) instead of physical directions (`left`, `right`, `top`, `bottom`). In an LTR context, `margin-inline-start` resolves to `margin-left`; in RTL, it resolves to `margin-right`. CSS logical properties are MANDATORY for RTL-compatible layouts.

---

## Localization Process Terms

### Transcreation
The creative adaptation of content for a target culture, going beyond literal translation. Used when the emotional impact, humor, or cultural resonance of the message matters more than literal accuracy. Common in marketing, advertising, and brand communications. Transcreation is often billed per hour rather than per word.

### Pseudo-localization
A testing technique that transforms source strings to simulate translation characteristics without actual translation. Applies: character accents (a -> a), string expansion (adds ~30-40% length), bracket wrapping ([text]) to detect hardcoded strings, and BiDi markers. Pseudo-localization reveals i18n defects before any real translation occurs.

### In-Country Review (ICR)
Review of localized content by a native speaker residing in the target market. ICR validates linguistic accuracy, cultural appropriateness, and market-specific conventions. Distinct from LQA (which uses professional linguists) --- ICR uses domain experts or end users.

### LSP (Language Service Provider)
A company that provides translation, localization, and related linguistic services. LSPs employ or contract with professional translators and manage localization projects. Major LSPs: RWS (SDL), TransPerfect, Lionbridge, Welocalize, Keywords Studios.

### Fuzzy Match
A TM match that is similar but not identical to the current source segment. Typically measured as a percentage (75-99%). Fuzzy matches reduce translation effort because the translator starts with a near-match rather than translating from scratch. TMS platforms display fuzzy match percentages to help prioritize review effort.

### Context Match (In-Context Exact / ICE Match)
A TM match where not only the segment is identical but the surrounding segments (preceding and following) are also identical. Provides highest confidence that the existing translation is correct in context. Also called 101% match.

### Continuous Localization
A workflow where new or changed strings are automatically sent to translation as part of the development CI/CD pipeline. Eliminates batch translation cycles. Strings are extracted from code, pushed to TMS, translated, and pulled back --- often multiple times per day.

### Locale Fallback
A strategy for handling missing translations by falling back to a related locale or the source language. Example chain: `es-MX` (Mexican Spanish) -> `es` (Spanish) -> `en` (English). Fallback chains ensure users always see content, even if their specific locale is incomplete.

---

## Cultural Frameworks

### Hofstede Cultural Dimensions
A framework by Geert Hofstede identifying six dimensions along which national cultures vary: Power Distance, Individualism vs. Collectivism, Masculinity vs. Femininity, Uncertainty Avoidance, Long-Term vs. Short-Term Orientation, Indulgence vs. Restraint. Used to inform localization decisions about formality, imagery, messaging tone, and UI preferences.

### Hall's Context Theory
Edward T. Hall's framework distinguishing high-context cultures (communication is implicit, relies on shared understanding; e.g., Japan, China, Arab nations) from low-context cultures (communication is explicit, detailed, direct; e.g., US, Germany, Scandinavia). Affects how much explanatory text is needed, how direct calls-to-action should be, and how error messages are phrased.

### T-V Distinction
The use of formal vs. informal second-person pronouns in languages that distinguish them. Named after the French tu (informal) and vous (formal). Examples: du/Sie (German), tu/usted (Spanish), ty/vy (Russian). The Localization Brain must specify the register for each locale and context (B2B typically formal; B2C varies by brand voice and culture).

---

**Terminology is precision. Ambiguity in localization produces errors in every locale.**
