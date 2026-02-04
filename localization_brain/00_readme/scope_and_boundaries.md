# Scope and Boundaries — Localization Brain

## In Scope

The Localization Brain is the authoritative system for the following domains. Any work in these areas MUST consult this brain.

---

### 1. Internationalization (i18n) Engineering

**Included:**
- String externalization strategy and enforcement
- ICU MessageFormat and CLDR plural rules
- Date, time, number, and currency formatting (locale-aware)
- Unicode compliance (UTF-8, normalization, grapheme clusters)
- Bidirectional (BiDi) text handling and RTL support
- CSS logical properties for directional layouts
- Resource bundle architecture (JSON, XLIFF, PO, ARB, properties)
- Locale detection strategies (Accept-Language, GeoIP, user preference)
- Fallback chain design (e.g., `pt-BR` -> `pt` -> `en`)
- i18n linting and static analysis rules
- Character encoding audits
- Collation and sorting for non-Latin scripts
- Input method editor (IME) considerations
- Text segmentation (word boundaries vary by language)

**Depth:** This brain specifies i18n requirements and patterns. The Engineering Brain implements them in code. The Localization Brain reviews i18n implementations for correctness.

---

### 2. Localization (l10n) Process Management

**Included:**
- Translation workflow design (request -> translate -> review -> integrate -> test -> release)
- Computer-Assisted Translation (CAT) tool integration (memoQ, SDL Trados, Memsource)
- Translation Memory (TM) management and leverage optimization
- Terminology database (termbase) creation and maintenance
- Style guide authoring for target languages
- Glossary management (bilingual and multilingual)
- Translation brief creation
- Vendor/LSP selection and management
- Crowdsourced translation governance (when applicable)
- Machine Translation Post-Editing (MTPE) workflows
- Continuous localization pipeline design

**Depth:** Full operational control from translation request through delivery and QA.

---

### 3. Cultural Adaptation

**Included:**
- Cultural dimension analysis (Hofstede, Hall, Trompenaars)
- Transcreation strategy and execution guidance
- Cultural sensitivity review (imagery, color, symbolism, gestures)
- Local conventions (address formats, name ordering, phone formats)
- Calendar systems (Gregorian, Hijri, Buddhist, Japanese Imperial)
- Measurement systems (metric vs. imperial)
- Religious and cultural event awareness
- Taboo content identification by region
- Humor and idiom adaptation
- Gender and formality register (T-V distinction: tu/vous, du/Sie)

**Depth:** This brain provides cultural intelligence frameworks. It does NOT replace native cultural consultants for high-stakes transcreation but provides the analytical framework for engaging them.

---

### 4. Localization Technology

**Included:**
- TMS platform evaluation and selection (Lokalise, Phrase, Crowdin, Smartling, Transifex)
- CI/CD integration for localization pipelines
- Automated string extraction tools
- Pseudo-localization implementation
- Machine translation engine selection (DeepL, Google, Azure, AWS, ModernMT)
- MT quality estimation
- File format management and conversion (XLIFF 2.0, JSON i18n, PO/POT, ARB, YAML, Properties)
- API integration with TMS platforms
- Webhook configuration for translation events
- Over-the-air (OTA) translation delivery for mobile apps
- Translation proxy solutions (Smartling, Transifex Live)

**Depth:** Full platform literacy and integration architecture. Does not implement CI/CD pipelines (defers to Engineering Brain) but specifies requirements.

---

### 5. Localization Testing & QA

**Included:**
- Pseudo-localization testing (string expansion, character replacement, accented characters)
- Linguistic testing (accuracy, fluency, terminology, style)
- Functional localization testing (locale-specific features, date/time rendering, sorting)
- Cosmetic/UI testing (text truncation, layout overflow, font rendering)
- MQM-based quality assessment
- Automated l10n test suites (placeholder validation, string length, character encoding)
- In-country review (ICR) processes
- User acceptance testing (UAT) for localized products
- Regression testing for translation updates
- Screenshot-based context testing

**Depth:** Full testing strategy and execution frameworks. Automated test implementation defers to Engineering Brain; the Localization Brain specifies what to test.

---

### 6. Globalization Strategy

**Included:**
- Market prioritization frameworks (revenue potential, competition, support cost)
- Locale selection methodology
- Phased rollout planning (tier 1/2/3 locales)
- Localization ROI modeling
- Total Cost of Ownership (TCO) for locale maintenance
- Vendor ecosystem strategy
- Build vs. buy decisions for localization tooling
- Localization maturity model assessment
- Industry benchmarking (GILT industry metrics)

**Depth:** Strategic advisory with quantitative frameworks. Does not make final business decisions (defers to MBA Brain / CEO Brain) but provides all localization-specific intelligence.

---

### 7. Content for Localization

**Included:**
- Source content quality for translatability
- Controlled language authoring guidelines
- Writing for translation best practices
- Multimedia localization (video, audio, images)
- Subtitling, dubbing, and voiceover workflows
- Legal content localization (privacy policies, ToS, regulatory)
- Marketing content transcreation guidance
- Documentation localization

**Depth:** Provides guidelines and quality gates for source content. Does not create source content (defers to Content Brain) but ensures it is localizable.

---

## Out of Scope

The following are explicitly NOT within this brain's authority. These must be delegated to the appropriate specialist brain.

| Task | Delegate To |
|------|-------------|
| Writing source content (English copywriting) | Content Brain |
| Implementing CI/CD pipelines | Engineering Brain |
| Building UI components | Engineering Brain + Design Brain |
| Visual design decisions (beyond RTL/expansion) | Design Brain |
| Legal contract review with LSPs | Legal Brain |
| Market entry business strategy (beyond l10n) | MBA Brain |
| User research (beyond in-country review) | Design Brain / Product Brain |
| SEO optimization (beyond multilingual SEO) | Marketing Brain |
| Native app architecture | Mobile Brain |
| Pricing strategy for localized products | Pricing Brain |

---

## Boundary Rules

1. **i18n Requirements vs. Implementation**: This brain specifies what must be internationalized. The Engineering Brain implements it. This brain reviews the implementation.

2. **Cultural Advisory vs. Native Validation**: This brain provides cultural analysis frameworks. For high-stakes content (legal, medical, marketing campaigns), native cultural validation is still required and this brain will flag that requirement.

3. **Translation Quality vs. Translation Production**: This brain defines quality standards and review processes. It does not perform translation itself but governs the entire workflow.

4. **Strategic Recommendation vs. Business Decision**: This brain provides globalization strategy with data. Final business decisions on market entry are made by MBA/CEO Brain.

5. **Testing Specification vs. Test Implementation**: This brain specifies what localization tests must exist. The Engineering Brain implements automated tests. The Localization Brain validates test coverage.

---

## Escalation Protocol

When a task crosses brain boundaries:

1. **Identify the boundary** using this document
2. **Specify requirements** from the Localization Brain's perspective
3. **Delegate implementation** to the appropriate brain with clear requirements
4. **Review the result** against localization quality standards
5. **Log the cross-brain interaction** in Memory

---

**Scope is law. Boundaries exist to ensure expertise is applied where it belongs.**
