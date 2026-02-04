# Localization Review Checklist -- Release Gate

This checklist must be completed before any localized product ships to end users.
Every item must be explicitly marked PASS, FAIL, or N/A with justification.
A single FAIL in a Critical section blocks release for that locale.

---

## HOW TO USE THIS CHECKLIST

1. Complete this checklist PER LOCALE before each release
2. Every item requires an explicit verdict: PASS / FAIL / N/A
3. N/A requires written justification for why the item does not apply
4. Critical items that FAIL block the locale from release
5. Important items that FAIL require a documented fix plan with deadline
6. Advisory items that FAIL are tracked for the next release cycle
7. This checklist is not optional, even for "minor" releases

---

## SECTION 1: INTERNATIONALIZATION READINESS (Critical)

All items in this section must PASS before any translation begins.

### 1.1 String Externalization

- [ ] All user-facing strings are externalized to resource files
- [ ] No hardcoded strings in source code (verified by automated scan)
- [ ] String keys follow a consistent, descriptive naming convention
- [ ] Context comments provided for every string (for translator reference)
- [ ] Maximum string length constraints documented where UI space is limited
- [ ] String files are in a standard format (JSON, XLIFF, ARB, PO, etc.)

### 1.2 String Architecture

- [ ] No string concatenation for sentence construction
- [ ] ICU MessageFormat or equivalent used for plurals, gender, and variables
- [ ] Plural forms support all CLDR categories for target locales (zero, one, two, few, many, other)
- [ ] Date, time, number, and currency formatting uses locale APIs, not manual formatting
- [ ] Bidirectional text embedding markers used for mixed LTR/RTL content
- [ ] Sort order uses locale-aware collation

### 1.3 Layout and Rendering

- [ ] UI containers allow 30-40% text expansion from English
- [ ] RTL layout mirroring implemented and testable
- [ ] Font stack includes fallback fonts for all target scripts (CJK, Arabic, Devanagari, etc.)
- [ ] Line breaking is locale-aware (CJK word boundaries, Thai segmentation)
- [ ] Text rendering tested for combining characters and diacriticals
- [ ] Dynamic text (user-generated content) handles all target scripts

### 1.4 Asset Preparation

- [ ] Images with text identified and flagged for localization
- [ ] Text in images is separate from the image layer (editable)
- [ ] Audio with speech identified and transcription provided
- [ ] Video with speech identified and subtitle tracks prepared
- [ ] Icons and symbols reviewed for cultural neutrality
- [ ] Color usage reviewed for cultural associations in target markets

---

## SECTION 2: TRANSLATION QUALITY (Critical)

### 2.1 Pre-Translation Setup

- [ ] Translation Memory loaded with all previous translations
- [ ] Terminology glossary provided to translators (locale-specific)
- [ ] Style guide provided to translators (locale-specific)
- [ ] Context screenshots or descriptions provided for all strings
- [ ] Source text reviewed for clarity and ambiguity before handoff
- [ ] Translator briefing completed covering product context and audience

### 2.2 Translation Execution

- [ ] Translation completed by qualified native speakers of the target locale
- [ ] Translator has domain expertise appropriate to the content
- [ ] Translation performed with context (in-product or with screenshots)
- [ ] Terminology glossary applied consistently
- [ ] Style guide followed for tone, formality, and register
- [ ] Sensitive content flagged and reviewed by a cultural consultant

### 2.3 Translation Review

- [ ] All translations reviewed by a second linguist (not the original translator)
- [ ] Review performed in-context (in the product, not in a spreadsheet)
- [ ] MQM scoring completed with error rate documented
- [ ] MQM error rate is below threshold for the content type
- [ ] All critical and major errors corrected
- [ ] Corrections fed back into Translation Memory
- [ ] Reviewer disagreements resolved with documented rationale

### 2.4 Specialized Content

- [ ] Legal content translated by a legal translation specialist
- [ ] Marketing content transcreated (not just translated)
- [ ] Technical content reviewed for accuracy by a domain expert
- [ ] Help and support content validated against the localized product
- [ ] Error messages tested in-context for clarity in target language
- [ ] Notifications tested for length and clarity on all platforms

---

## SECTION 3: CULTURAL ADAPTATION (Critical)

### 3.1 Content Review

- [ ] Cultural review completed by a native of the target market
- [ ] Humor, idioms, and colloquialisms adapted appropriately
- [ ] Metaphors and analogies verified for cultural relevance
- [ ] Examples and scenarios are relevant to the target market
- [ ] Name examples are appropriate for the target culture
- [ ] Gendered language handled according to locale norms

### 3.2 Visual and Media Review

- [ ] Images reviewed for cultural appropriateness
- [ ] Hand gestures in imagery verified for the target culture
- [ ] Clothing, food, and lifestyle imagery is culturally appropriate
- [ ] Religious and political symbols absent or appropriate
- [ ] Color usage checked for cultural associations
- [ ] People depicted are diverse and representative of the target market

### 3.3 Functional Adaptation

- [ ] Date formats follow locale convention (DD/MM/YYYY vs MM/DD/YYYY vs YYYY-MM-DD)
- [ ] Time formats follow locale convention (12h vs 24h)
- [ ] Number formats follow locale convention (decimal separator, thousands separator)
- [ ] Currency formats follow locale convention (symbol position, spacing)
- [ ] Address formats match target country structure
- [ ] Phone number formats and validation match target country
- [ ] Measurement units appropriate for target market (metric vs imperial)
- [ ] Paper sizes appropriate for target market (A4 vs Letter)

### 3.4 Legal and Regulatory

- [ ] Privacy policy localized and compliant with local regulations
- [ ] Terms of service localized and legally reviewed
- [ ] Cookie consent adapted to local requirements (GDPR, LGPD, PIPA, etc.)
- [ ] Age verification requirements met for the target market
- [ ] Content ratings appropriate for the target market
- [ ] Data residency requirements considered for the target market

---

## SECTION 4: TECHNICAL VERIFICATION (Critical)

### 4.1 Build Verification

- [ ] Localized build compiles without errors
- [ ] No resource file parsing errors for any locale
- [ ] All string placeholders resolve correctly with test data
- [ ] No crashes caused by localized content
- [ ] Memory usage is acceptable with all locales loaded
- [ ] Build size increase from localization is within budget

### 4.2 Rendering Verification

- [ ] All screens rendered and visually inspected for each locale
- [ ] No text truncation on any screen at any supported resolution
- [ ] No text overflow or overlap on any screen
- [ ] RTL layouts mirror correctly (for Arabic, Hebrew, Farsi, Urdu)
- [ ] Bidirectional text renders correctly in mixed-content contexts
- [ ] CJK text renders correctly with appropriate fonts
- [ ] Thai, Khmer, and other complex scripts render correctly
- [ ] Emoji render consistently across platforms (if used)

### 4.3 Functional Verification

- [ ] Date pickers display locale-correct format and calendar system
- [ ] Number input fields accept locale-correct decimal separators
- [ ] Search and sort produce locale-correct results
- [ ] Text input handles IME for CJK locales
- [ ] Autocomplete and spell check work in target language (where available)
- [ ] Copy/paste works correctly with target script
- [ ] Keyboard shortcuts do not conflict with target input method
- [ ] URL routing handles locale prefixes correctly

### 4.4 Performance Verification

- [ ] Page/screen load time not degraded by localization
- [ ] Font download time acceptable for web (for non-Latin scripts)
- [ ] Translation Memory lookups do not cause UI lag
- [ ] Locale switching is responsive (if supported at runtime)
- [ ] Offline locale data is within storage budget

---

## SECTION 5: COVERAGE VERIFICATION (Critical)

### 5.1 String Coverage

- [ ] String coverage is >= 99% for shipping locales
- [ ] All untranslated strings are documented with a plan
- [ ] No source language strings visible in the user-facing product
- [ ] Fallback behavior for missing translations is defined and graceful
- [ ] Developer-facing strings (logs, debug) are excluded from coverage metrics
- [ ] Third-party component strings are included in coverage

### 5.2 Content Coverage

- [ ] UI strings are 100% translated
- [ ] Error messages are 100% translated
- [ ] Help and documentation are translated (or a plan exists)
- [ ] Email templates are translated
- [ ] Push notification templates are translated
- [ ] In-app messaging content is translated
- [ ] Onboarding flows are translated
- [ ] Legal documents are translated
- [ ] App store metadata is translated (title, description, keywords, screenshots)

### 5.3 Asset Coverage

- [ ] Images with text are localized for each shipping locale
- [ ] Videos have subtitles or localized voice-over for each shipping locale
- [ ] Audio content has transcripts or localized alternatives
- [ ] Marketing materials are localized for launch markets
- [ ] Support documentation is available in target languages

---

## SECTION 6: TESTING VERIFICATION (Important)

### 6.1 Pseudo-Localization

- [ ] Pseudo-localization pass completed on latest build
- [ ] All i18n issues found in pseudo-loc have been fixed
- [ ] Accented characters display correctly throughout
- [ ] Expanded text (1.5x length) fits all UI containers
- [ ] Bracket markers confirm no hardcoded strings remain

### 6.2 Linguistic Testing

- [ ] In-context linguistic review completed per locale
- [ ] Context-dependent translations verified (same word, different context)
- [ ] Placeholder substitution tested with real data (names, numbers, dates)
- [ ] Plural forms tested for all CLDR categories per locale
- [ ] Gender-dependent content tested for all applicable forms
- [ ] Edge cases tested (empty strings, very long strings, special characters)

### 6.3 Functional Testing

- [ ] End-to-end user flows tested per locale
- [ ] Form submission tested with locale-specific data
- [ ] Payment flow tested with locale-specific payment methods
- [ ] Sharing functionality tested (shared content displays correctly)
- [ ] Deep links work with locale prefixes
- [ ] Analytics events fire correctly with locale parameters

### 6.4 Regression Testing

- [ ] Previous translations not broken by new updates
- [ ] Fixed issues do not recur
- [ ] TM updates have not introduced regressions
- [ ] Platform-specific issues from previous releases verified fixed

---

## SECTION 7: PROCESS AND DOCUMENTATION (Important)

### 7.1 Process Documentation

- [ ] Localization kit is complete and up to date
- [ ] Translator style guide exists for each locale
- [ ] Terminology glossary exists and is current for each locale
- [ ] Context documentation exists for all string files
- [ ] Localization testing plan is documented
- [ ] Vendor SLAs are documented and tracked

### 7.2 Handoff Documentation

- [ ] Source content change log provided to translators
- [ ] New and changed strings clearly identified
- [ ] Deprecated strings marked for removal
- [ ] Screenshots updated for new and changed screens
- [ ] Character limit documentation updated
- [ ] Translation instructions updated for new content types

### 7.3 Release Documentation

- [ ] Localization release notes prepared per locale
- [ ] Known issues documented per locale
- [ ] Post-release monitoring plan defined
- [ ] Rollback plan defined in case of critical localization issues
- [ ] User feedback channels set up for localization quality reports

---

## SECTION 8: MARKET READINESS (Advisory)

### 8.1 Go-to-Market

- [ ] App store listing optimized for target market (ASO)
- [ ] Local SEO strategy implemented
- [ ] Marketing materials adapted for the target market
- [ ] Support team prepared for target language inquiries
- [ ] Community management plan for target market
- [ ] Influencer and press outreach adapted for target market

### 8.2 Operational Readiness

- [ ] Customer support available in target language
- [ ] FAQ and knowledge base available in target language
- [ ] Social media accounts set up for target market (if applicable)
- [ ] Payment methods available for target market
- [ ] Legal entity and tax compliance for target market
- [ ] Data handling compliant with local regulations

---

## REVIEW SIGN-OFF

```markdown
## Localization Release Review: [Product] - [Locale]

**Reviewer:** [Name]
**Date:** [Date]
**Build Version:** [Version]
**Locale:** [Locale Code]

### Section Results

| Section | Result | Blockers |
|---------|--------|----------|
| 1. i18n Readiness | PASS/FAIL | |
| 2. Translation Quality | PASS/FAIL | |
| 3. Cultural Adaptation | PASS/FAIL | |
| 4. Technical Verification | PASS/FAIL | |
| 5. Coverage Verification | PASS/FAIL | |
| 6. Testing Verification | PASS/FAIL | |
| 7. Process & Documentation | PASS/FAIL | |
| 8. Market Readiness | PASS/FAIL/ADVISORY | |

**Critical Sections Passed:** [X/5]
**Overall Verdict:** SHIP / BLOCKED / CONDITIONAL
**Conditions (if conditional):** [list]
**Fix Deadline (if blocked):** [date]
**Next Review Date:** [date]
```

---

## ENFORCEMENT RULE

No localized product ships without passing this review.
Critical section failures block the locale from release entirely.
Important section failures require fix plans with deadlines.
Advisory section findings are tracked for the next release.
This checklist is not optional.

---

## END OF REVIEW CHECKLIST
