# Localization Brain -- Benchmark Tests

This document contains benchmark scenarios used to evaluate the Localization Brain's
competence across core localization and internationalization disciplines. Each scenario
tests specific skills and has defined evaluation criteria.

The brain must demonstrate domain expertise, structured thinking, and actionable
recommendations to pass each benchmark.

---

## HOW TO USE BENCHMARK TESTS

1. Present the scenario to the Localization Brain exactly as written
2. Evaluate the response against the listed criteria
3. Score each criterion as MET or NOT MET
4. A benchmark passes only if ALL criteria are MET
5. Document the response quality and any gaps
6. The brain must pass at least 80% of benchmarks to be considered production-ready

---

## BENCHMARK 1: RTL Implementation (Arabic Launch)

**Scenario:**
"Our React Native app is launching in Arabic (ar-SA). Walk through the complete RTL
implementation checklist for the app. The app has 120 screens, uses a custom design
system, and includes maps, charts, and a chat interface. We have 6 weeks until launch."

### Evaluation Criteria

- [ ] Covers RTL layout mirroring as the foundation (flexDirection, text alignment, margins/padding)
- [ ] Addresses UI elements that should NOT mirror (media playback controls, timelines, maps)
- [ ] Addresses React Native-specific RTL APIs (I18nManager, writingDirection)
- [ ] Covers bidirectional text handling in chat (mixed Arabic + English)
- [ ] Addresses number rendering (Arabic-Indic vs Western Arabic numerals)
- [ ] Addresses chart and graph mirroring (or non-mirroring with justification)
- [ ] Proposes a testing strategy for visual verification of all 120 screens
- [ ] Provides a realistic 6-week timeline with milestones
- [ ] Identifies the highest-risk screens and prioritizes them
- [ ] Covers font selection for Arabic script with fallback chain

---

## BENCHMARK 2: Translation Memory Optimization

**Scenario:**
"Our product has 50,000 strings. Translation Memory leverage is only 20% despite
the product being 3 years old with incremental updates. Translation costs are 4x
higher than they should be. Diagnose the problem and provide a remediation plan."

### Evaluation Criteria

- [ ] Identifies at least 5 plausible root causes for low TM leverage
- [ ] Covers TM maintenance issues (stale entries, duplicate TMs, no cleanup)
- [ ] Covers source text issues (inconsistent terminology, over-engineering strings)
- [ ] Covers segmentation issues (sentence vs paragraph, tags breaking segments)
- [ ] Covers TM configuration issues (match thresholds, penalties, context matching)
- [ ] Proposes a TM audit methodology with specific steps
- [ ] Proposes a remediation plan with expected leverage improvement per action
- [ ] Estimates the cost savings from improved leverage
- [ ] Addresses prevention measures to maintain high leverage going forward
- [ ] Proposes a timeline with quick wins and strategic improvements

---

## BENCHMARK 3: Multi-Market Simultaneous Launch

**Scenario:**
"Our marketing team wants to launch the product in 10 new markets simultaneously:
Japan, South Korea, Brazil, Germany, France, Saudi Arabia, India (Hindi), Indonesia,
Thailand, and Turkey. Current product is English only. Design a phased approach with
quality gates. Budget is limited -- we cannot do all markets at full quality at once."

### Evaluation Criteria

- [ ] Proposes tiered approach based on market revenue potential and complexity
- [ ] Groups markets by linguistic/technical complexity (CJK, RTL, Latin-script)
- [ ] Defines quality gates between phases (what must pass before next phase)
- [ ] Addresses which content types to prioritize (UI first, docs later)
- [ ] Provides a realistic timeline accounting for dependencies
- [ ] Addresses the RTL requirement (Arabic) as a technical blocker needing early investment
- [ ] Addresses CJK requirements (Japanese, Korean) as high-complexity markets
- [ ] Proposes a "minimum viable localization" definition per market
- [ ] Includes a measurement framework (how to know if a market launch succeeded)
- [ ] Addresses vendor strategy (single vendor vs multi-vendor, specialist vs generalist)
- [ ] Considers in-country review requirements per market

---

## BENCHMARK 4: Machine Translation Strategy

**Scenario:**
"The engineering team wants to use raw machine translation for all product strings
to save money. The product is a healthcare app used by patients to manage medications
and communicate with doctors. The CEO is supportive. Respond to this proposal."

### Evaluation Criteria

- [ ] Clearly explains the risk of raw MT for healthcare content (safety-critical)
- [ ] Differentiates between content types suitable for MT vs those requiring human translation
- [ ] Proposes a content risk classification system (critical, high, medium, low)
- [ ] Recommends MT+PE (post-editing) for appropriate content tiers, not raw MT
- [ ] Identifies specific risks: medication names, dosage instructions, medical terminology
- [ ] Addresses regulatory requirements for healthcare content localization
- [ ] Proposes a quality assurance framework specific to MT output
- [ ] Provides cost comparison: raw MT vs MT+PE vs human translation for different tiers
- [ ] Does not simply reject MT outright but proposes responsible adoption
- [ ] Addresses liability concerns for mistranslated medical content

---

## BENCHMARK 5: Pseudo-Localization Setup

**Scenario:**
"Our development team has never used pseudo-localization. The product is a React web
application with 8,000 strings. Set up a pseudo-localization strategy including
tooling recommendations, what it tests for, how to integrate it into CI, and how to
interpret the results."

### Evaluation Criteria

- [ ] Explains what pseudo-localization is and why it matters
- [ ] Defines the pseudo-loc transformations: accenting, expansion, bracketing, mirroring
- [ ] Recommends specific tooling for a React application
- [ ] Proposes CI/CD integration (when to run, what to block on)
- [ ] Covers what pseudo-loc catches: truncation, hardcoded strings, concatenation, encoding
- [ ] Explains how to read pseudo-loc output and identify issues
- [ ] Addresses the expansion ratio to simulate German, Finnish, etc.
- [ ] Proposes visual regression testing against pseudo-loc builds
- [ ] Addresses developer workflow (how devs use pseudo-loc during development)
- [ ] Includes examples of common issues found by pseudo-localization

---

## BENCHMARK 6: Localization Bug Triage

**Scenario:**
"After launching in Japanese, we received 200+ bug reports from users. The reports
are a mix of: translation errors, text truncation, wrong date formats, encoding issues,
untranslated strings, and cultural inappropriateness complaints. Triage the bugs and
create a remediation plan. We cannot fix everything at once."

### Evaluation Criteria

- [ ] Proposes a bug classification taxonomy (linguistic, technical, cultural, functional)
- [ ] Defines severity levels with clear criteria for each
- [ ] Prioritization framework that balances user impact and fix difficulty
- [ ] Addresses encoding issues as highest technical priority (potential data loss)
- [ ] Addresses cultural inappropriateness as highest cultural priority (brand risk)
- [ ] Proposes a communication plan to Japanese users acknowledging the issues
- [ ] Separates quick fixes (string corrections) from systemic fixes (truncation, encoding)
- [ ] Proposes root cause analysis to prevent recurrence
- [ ] Includes a timeline with specific milestones for resolution
- [ ] Recommends a post-fix validation process

---

## BENCHMARK 7: Continuous Localization Pipeline Design

**Scenario:**
"We ship weekly. Our current localization process: developers export strings to a
spreadsheet, email it to the translation agency, wait 5-7 business days, receive a
spreadsheet back, manually import strings, discover issues, fix issues, delay the
release by 3-4 days. Design a continuous localization pipeline that eliminates this
bottleneck."

### Evaluation Criteria

- [ ] Identifies the bottlenecks in the current process (manual handoff, no automation, serial workflow)
- [ ] Proposes a TMS (Translation Management System) with specific recommendations
- [ ] Designs integration between source code repository and TMS
- [ ] Automates string extraction and delivery to translators
- [ ] Automates delivery of translations back to the codebase
- [ ] Includes in-context review in the pipeline (not just spreadsheet review)
- [ ] Addresses the weekly release cadence with appropriate SLAs
- [ ] Proposes parallel workflows (translation and development happen simultaneously)
- [ ] Includes automated quality checks in the pipeline
- [ ] Addresses how to handle "hot" strings that need faster turnaround
- [ ] Estimates time and cost to implement the new pipeline

---

## BENCHMARK 8: Plural and Gender Handling

**Scenario:**
"Our app displays messages like 'You have 1 new message' / 'You have 5 new messages'.
It also shows 'John liked your photo' / 'Jane liked your photo'. We are localizing
into Arabic (6 plural forms), Polish (complex plurals), and Turkish (no grammatical
gender but agglutinative). Design the string architecture to handle this correctly."

### Evaluation Criteria

- [ ] Recommends ICU MessageFormat or equivalent standard
- [ ] Explains CLDR plural categories (zero, one, two, few, many, other) per target locale
- [ ] Provides correct plural rules for Arabic, Polish, and Turkish
- [ ] Addresses gender handling with select statements or similar
- [ ] Addresses the agglutinative nature of Turkish (suffix implications)
- [ ] Provides concrete code examples for the string architecture
- [ ] Warns against string concatenation and explains why
- [ ] Addresses edge cases (zero items, very large numbers)
- [ ] Proposes a testing strategy for all plural/gender combinations
- [ ] Considers how this architecture scales to future locales

---

## BENCHMARK 9: App Store Optimization (ASO) for Localization

**Scenario:**
"Our app is live in English on the App Store and Google Play. We are launching
localized versions in 8 languages. Provide an ASO localization strategy covering
titles, descriptions, keywords, and screenshots. We want to maximize organic
discovery in each market."

### Evaluation Criteria

- [ ] Differentiates between translation and transcreation for ASO content
- [ ] Addresses keyword research per market (not just translated keywords)
- [ ] Covers title localization strategy (character limits differ by store and locale)
- [ ] Covers description optimization per locale
- [ ] Addresses screenshot localization (text overlays, device preferences, layout)
- [ ] Covers review response localization (responding in the user's language)
- [ ] Proposes A/B testing strategy for localized listings
- [ ] Addresses cultural expectations in app marketing per market
- [ ] Includes measurement framework (downloads per locale, conversion rate)
- [ ] Warns against common ASO localization mistakes (literal translation of keywords)

---

## BENCHMARK 10: String Freeze and Change Management

**Scenario:**
"Our product has no string freeze policy. Developers add and change strings up to
the day before release. This causes translations to be incomplete, creates rework,
and results in untranslated strings shipping. Design a string management policy
that balances developer agility with localization quality."

### Evaluation Criteria

- [ ] Proposes a string freeze policy with specific timing relative to release
- [ ] Addresses exceptions to the freeze (critical bug fixes, legal requirements)
- [ ] Defines a process for string changes after the freeze
- [ ] Proposes tooling to enforce the freeze (automated checks, CI gates)
- [ ] Balances developer flexibility with localization needs
- [ ] Addresses the continuous localization model as an alternative to strict freezes
- [ ] Proposes string change impact analysis (how many locales affected)
- [ ] Includes developer education on localization-friendly string practices
- [ ] Addresses the relationship between string freeze and release schedule
- [ ] Proposes a gradual adoption plan (not all-or-nothing)

---

## BENCHMARK 11: Quality Measurement Framework

**Scenario:**
"Leadership asks: 'How do we know our translations are good?' Currently there is
no quality measurement. Different vendors provide different quality levels. Design
a quality measurement framework that provides objective, comparable scores across
vendors, locales, and content types."

### Evaluation Criteria

- [ ] Proposes MQM (Multidimensional Quality Metrics) or equivalent standard
- [ ] Defines error categories and weights specific to the product
- [ ] Creates a scoring formula that produces a single comparable quality score
- [ ] Addresses vendor comparison methodology (same source, same scoring)
- [ ] Proposes sampling strategy (100% review vs statistical sampling)
- [ ] Includes inter-annotator agreement measurement (reviewer calibration)
- [ ] Defines quality thresholds per content type and locale tier
- [ ] Proposes a reporting dashboard for leadership visibility
- [ ] Addresses the cost of quality measurement (ROI of the framework)
- [ ] Includes a feedback loop from quality scores to vendor improvement

---

## BENCHMARK 12: Legacy Codebase i18n Retrofit

**Scenario:**
"A 5-year-old monolithic web application with 300,000 lines of code has never been
internationalized. Strings are hardcoded throughout. Date formatting is manual.
There are string concatenations everywhere. The app uses server-side rendering.
Design an incremental i18n retrofit plan that does not require a rewrite."

### Evaluation Criteria

- [ ] Proposes an incremental approach (not a "big bang" rewrite)
- [ ] Prioritizes user-facing pages by traffic and importance
- [ ] Addresses string extraction strategy (manual vs automated tooling)
- [ ] Proposes tooling to detect hardcoded strings
- [ ] Addresses date/time/number formatting migration strategy
- [ ] Covers string concatenation elimination with safe alternatives
- [ ] Proposes a locale routing strategy for the web application
- [ ] Includes a testing strategy to prevent regressions during migration
- [ ] Provides a realistic timeline for a phased rollout
- [ ] Addresses developer training and ongoing compliance enforcement

---

## BENCHMARK 13: Locale-Specific Data Validation

**Scenario:**
"Our registration form collects name, email, phone number, address, and date of
birth. It works in the US but breaks or rejects valid input in Japan (full-width
characters, name order), Saudi Arabia (Arabic script, Hijri calendar), and Brazil
(CPF number, CEP postal code). Fix the form for all four markets."

### Evaluation Criteria

- [ ] Addresses name field: order (family/given), length, character sets per locale
- [ ] Addresses phone number validation per country (format, length, prefix)
- [ ] Addresses address format differences (Japan: prefecture-city-block, Brazil: CEP, Saudi: limited structured addressing)
- [ ] Addresses calendar system differences (Hijri calendar for Saudi Arabia)
- [ ] Addresses character input (full-width Katakana for Japan, Arabic script for Saudi)
- [ ] Proposes a validation architecture that is locale-aware, not US-centric
- [ ] Addresses national ID fields (CPF for Brazil, etc.)
- [ ] Covers IME input handling for Japanese
- [ ] Proposes graceful handling of unexpected input (not hard rejection)
- [ ] Recommends specific libraries or APIs for locale-aware validation

---

## BENCHMARK 14: Translation Vendor Evaluation

**Scenario:**
"We need to select a translation vendor for our growing product. We have 30,000
strings, release bi-weekly, need 5 languages (Spanish, French, German, Japanese,
Korean), and want MT+PE for UI strings and human translation for marketing content.
Create an RFP outline and evaluation criteria for selecting a vendor."

### Evaluation Criteria

- [ ] RFP covers scope, volume, language pairs, content types, and cadence
- [ ] Evaluation criteria include quality metrics (not just price)
- [ ] Addresses technical integration capability (API, TMS compatibility)
- [ ] Includes MT+PE capability and quality benchmarking
- [ ] Covers translator qualification requirements per language
- [ ] Addresses turnaround time SLAs
- [ ] Proposes a pilot project for vendor evaluation (not just proposals)
- [ ] Includes pricing model evaluation (per-word, per-hour, retainer)
- [ ] Addresses scalability (can the vendor grow with us?)
- [ ] Covers data security and confidentiality requirements

---

## BENCHMARK 15: Accessibility and Localization Intersection

**Scenario:**
"Our app uses screen readers extensively. We are localizing into 5 languages. Screen
reader behavior differs by locale (different voices, reading order, pronunciation).
Accessibility labels are currently in English only. Address the intersection of
accessibility and localization for our product."

### Evaluation Criteria

- [ ] Identifies that all accessibility labels and ARIA attributes must be localized
- [ ] Addresses screen reader pronunciation differences across languages
- [ ] Covers reading order for RTL locales in screen readers
- [ ] Addresses alt text localization for images
- [ ] Covers locale-specific screen reader software (VoiceOver, TalkBack, NVDA)
- [ ] Proposes testing methodology for localized accessibility
- [ ] Addresses number, date, and currency announcement by screen readers per locale
- [ ] Covers live region announcements in localized content
- [ ] Proposes a priority order for locale accessibility implementation
- [ ] Addresses the resource requirements for accessibility + localization testing

---

## BENCHMARK 16: Content Management System Localization

**Scenario:**
"Our marketing team uses a CMS for blog posts, landing pages, and product documentation.
The CMS has no localization features. Content is published in English only. The team
wants to localize 200 existing pages and establish a process for ongoing localized
content creation. Propose a solution."

### Evaluation Criteria

- [ ] Evaluates CMS localization capabilities and recommends a path (plugin, migration, custom)
- [ ] Proposes a content prioritization strategy for the 200 existing pages
- [ ] Addresses content translation workflow integration with the CMS
- [ ] Covers SEO implications of localized content (hreflang tags, URL structure)
- [ ] Proposes a URL strategy (subdirectory, subdomain, or ccTLD)
- [ ] Addresses translation of dynamic content and user-generated content
- [ ] Covers image and media localization in the CMS context
- [ ] Proposes an editorial workflow for ongoing localized content
- [ ] Addresses content synchronization (what happens when the English version updates)
- [ ] Includes measurement framework for localized content performance

---

## BENCHMARK 17: Localization Crisis Response

**Scenario:**
"A mistranslation in our Japanese app caused a medication dosage to display incorrectly.
The error was live for 48 hours before a user reported it. No adverse health events
have been reported yet. Handle the immediate crisis, investigation, remediation, and
prevention."

### Evaluation Criteria

- [ ] Immediate action: hotfix or rollback within hours, not days
- [ ] User notification plan for all affected users in Japanese
- [ ] Internal incident escalation (legal, medical, executive)
- [ ] Root cause investigation covering the full translation pipeline
- [ ] Assessment of all medical/safety-critical strings across all locales
- [ ] Regulatory disclosure requirements assessment
- [ ] Media/PR response preparation
- [ ] Systemic fix to prevent recurrence (review process, automated checks)
- [ ] Post-incident review with documented lessons learned
- [ ] Updated quality gates specifically for safety-critical content

---

## SCORING SUMMARY

```markdown
## Benchmark Results: Localization Brain

**Date:** [Date]
**Evaluator:** [Name]

| # | Benchmark | Result | Notes |
|---|-----------|--------|-------|
| 1 | RTL Implementation | PASS/FAIL | |
| 2 | TM Optimization | PASS/FAIL | |
| 3 | Multi-Market Launch | PASS/FAIL | |
| 4 | MT Strategy | PASS/FAIL | |
| 5 | Pseudo-Localization | PASS/FAIL | |
| 6 | Bug Triage | PASS/FAIL | |
| 7 | Continuous Pipeline | PASS/FAIL | |
| 8 | Plural and Gender | PASS/FAIL | |
| 9 | ASO Localization | PASS/FAIL | |
| 10 | String Freeze | PASS/FAIL | |
| 11 | Quality Measurement | PASS/FAIL | |
| 12 | Legacy i18n Retrofit | PASS/FAIL | |
| 13 | Data Validation | PASS/FAIL | |
| 14 | Vendor Evaluation | PASS/FAIL | |
| 15 | Accessibility + L10n | PASS/FAIL | |
| 16 | CMS Localization | PASS/FAIL | |
| 17 | Crisis Response | PASS/FAIL | |

**Passed:** X/17
**Pass Rate:** X%
**Production Ready (>=80%):** YES/NO
```

---

## ENFORCEMENT RULE

Benchmark tests are the objective measure of brain competence.
A brain that cannot pass these scenarios cannot be trusted with real localization.
Run benchmarks after every major brain update.
Do not lower standards. Improve the brain.

---

## END OF BENCHMARK TESTS
