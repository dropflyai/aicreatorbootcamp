# Localization Score -- Quality Enforcement (Authoritative)

This document defines how localization quality is evaluated.
Every localization deliverable must be scored before it is considered complete.

If quality is not measurable, it is not enforced.
If a locale ships with errors, trust is broken.

---

## SCORING RULES (MANDATORY)

Each localization deliverable must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Linguistic Quality**
- **Technical Quality**
- **Cultural Appropriateness**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- Coverage must be >= 99% for any shipping locale
- All dimensions must be explicitly scored -- no skipping

### Locale Context Rule

Scores must be evaluated per locale. A Japanese localization and a French localization
have different challenges (character expansion, text direction, cultural norms). The
evaluator MUST state the source locale, target locale, and content type before scoring.

---

## 1. LINGUISTIC QUALITY

**Question:**
Does the translated content read naturally, accurately, and consistently in the target language?

### What to Evaluate

- **MQM Error Rate:** Multidimensional Quality Metrics error rate <2% of total word count
- **Fluency:** Text reads naturally to a native speaker, not as a translation
- **Accuracy:** Meaning is preserved without additions, omissions, or distortions
- **Terminology Consistency:** Domain-specific terms are used consistently throughout
- **Style Adherence:** Translation matches the defined style guide for the locale
- **Grammar and Spelling:** No grammatical errors, typos, or misspellings

### MQM Error Categories and Weights

| Category | Weight | Description |
|----------|--------|-------------|
| Critical | 25 | Meaning is opposite or dangerously wrong |
| Major Accuracy | 10 | Significant meaning change or omission |
| Major Fluency | 10 | Text is clearly unnatural or confusing |
| Minor Accuracy | 5 | Small meaning deviation, still understandable |
| Minor Fluency | 5 | Slightly unnatural but understandable |
| Preferential | 1 | Style preference, not an error |

### Error Rate Calculation

Error Rate = (Sum of weighted errors) / (Total word count) x 100

### Scoring Guide

- **5** -- MQM error rate <0.5%; text reads as if originally written in the target language; perfect terminology consistency; style guide fully adhered to; zero grammar/spelling errors
- **4** -- MQM error rate 0.5-1.5%; text reads naturally with rare awkward phrasing; terminology mostly consistent; minor style deviations; no critical grammar errors
- **3** -- MQM error rate 1.5-2.5%; text is understandable but reads as translated; terminology inconsistencies across files; style guide partially followed; occasional grammar issues
- **2** -- MQM error rate 2.5-5%; text frequently reads unnaturally; significant terminology inconsistencies; style guide ignored; multiple grammar errors
- **1** -- MQM error rate >5%; text is incomprehensible or seriously misleading; no terminology management; no style adherence; pervasive grammar errors

### Red Flags

- Machine translation output shipped without human review
- Terminology glossary does not exist or is not maintained
- Same term translated differently within the same screen
- Source text ambiguity was not clarified before translation
- Translator lacks domain expertise for the content type

Score <3 --> HARD FAIL. Retranslate the affected content with qualified linguists.

---

## 2. CULTURAL APPROPRIATENESS

**Question:**
Is the localized content culturally appropriate, respectful, and relevant for the target market?

### What to Evaluate

- **Cultural Review Passed:** Content reviewed by a native of the target culture
- **Imagery Appropriate:** Visuals, icons, and symbols are culturally safe
- **Date/Currency/Number Formats:** Locale-correct formatting throughout
- **Cultural References:** Idioms, humor, and references are adapted, not literally translated
- **Color Semantics:** Colors do not carry unintended cultural meanings
- **Legal and Regulatory:** Content complies with local regulations (privacy notices, disclaimers)

### Scoring Guide

- **5** -- Full cultural review completed; all imagery validated; formats are locale-perfect; cultural references adapted skillfully; no culturally sensitive issues; full regulatory compliance
- **4** -- Cultural review completed with minor findings; most imagery validated; formats correct with rare exceptions; cultural references mostly adapted; regulatory compliance confirmed
- **3** -- Partial cultural review; some imagery not validated; format inconsistencies present; literal translations of cultural references; minor regulatory gaps
- **2** -- No formal cultural review; culturally inappropriate imagery found; format errors visible to users; cultural references are confusing or offensive; regulatory non-compliance
- **1** -- Culturally offensive content present; formats are wrong throughout; no adaptation of cultural references; regulatory violations; content could cause brand damage

### Cultural Risk Matrix

| Risk Level | Description | Action Required |
|------------|-------------|-----------------|
| Critical | Offensive, illegal, or brand-damaging | Immediate removal and remediation |
| High | Culturally insensitive or confusing | Fix before release |
| Medium | Suboptimal cultural adaptation | Fix in next update |
| Low | Minor cultural preference | Track and batch-fix |

### Red Flags

- Hand gestures in imagery (thumbs up, OK sign, pointing) without cultural review
- Animals or food items that may be taboo in target culture
- Religious symbols or references without cultural validation
- Humor that relies on wordplay in the source language
- US-centric date formats (MM/DD/YYYY) in non-US locales
- Currency symbols in wrong position for the locale

Score <3 --> HARD FAIL. Conduct full cultural review before release.

---

## 3. TECHNICAL QUALITY

**Question:**
Does the localized content render correctly without technical defects across all platforms?

### What to Evaluate

- **No String Truncation:** Translated text fits within UI containers at all supported sizes
- **RTL Rendering Correct:** Right-to-left languages render properly in all views
- **Character Encoding Valid:** UTF-8 encoding used consistently; no mojibake or broken characters
- **Placeholder Integrity:** Variables, tags, and placeholders are preserved and functional
- **Concatenation-Free:** No programmatic string concatenation that breaks grammar
- **Pluralization Correct:** Plural forms follow CLDR rules for each locale

### Scoring Guide

- **5** -- Zero truncation issues; RTL rendering flawless; encoding perfect; all placeholders intact; no concatenation; pluralization uses CLDR rules for all locales; all platforms tested
- **4** -- Rare truncation in edge cases; RTL rendering works with minor alignment issues; encoding correct; placeholders intact; minimal concatenation; pluralization mostly correct
- **3** -- Noticeable truncation in several views; RTL has visible rendering issues; occasional encoding problems; some broken placeholders; concatenation present; pluralization uses simplified rules
- **2** -- Frequent truncation; RTL is partially broken; encoding errors visible to users; multiple broken placeholders; concatenation causes grammar errors; pluralization wrong for several locales
- **1** -- Widespread truncation; RTL is non-functional; encoding is broken throughout; placeholders cause crashes; concatenation is the primary string building method; no pluralization support

### Technical Requirements Checklist

| Requirement | Standard | Test Method |
|-------------|----------|-------------|
| Text Expansion | Allow 30-40% expansion from English | Pseudo-localization |
| RTL Support | Mirrored layouts for AR, HE, FA, UR | Visual review + automated |
| Encoding | UTF-8 throughout | Automated scan |
| Placeholders | ICU MessageFormat or equivalent | Unit tests |
| Plurals | CLDR plural categories per locale | Unit tests per locale |
| Line Breaks | Locale-aware line breaking (CJK, Thai) | Visual review |
| Sorting | Locale-aware collation | Automated tests |
| Bi-directional Text | Proper embedding for mixed LTR/RTL | Visual review |

### Red Flags

- Hardcoded strings discovered in production
- String concatenation used for sentences ("Welcome " + name + " to " + place)
- Pseudo-localization never run during development
- No automated screenshot comparison for localized builds
- Date/time formatting done manually instead of using locale APIs
- Character limits based on English string length

Score <3 --> HARD FAIL. Fix technical infrastructure before translating more content.

---

## 4. COVERAGE

**Question:**
Is the localized content complete for the target locale with no untranslated strings visible to users?

### What to Evaluate

- **Target Locale Completeness:** >99% of user-facing strings are translated
- **No Untranslated Strings in UI:** Zero English (or source language) strings visible in localized UI
- **All Content Types Covered:** UI, help text, error messages, notifications, emails, legal
- **Asset Localization:** Images with text, videos with subtitles, audio with localized alternatives
- **Metadata Localization:** App store listings, SEO metadata, social media content
- **New Content Pipeline:** Process exists to localize new content before release

### Scoring Guide

- **5** -- 100% of user-facing strings translated; zero source strings visible; all content types covered; all assets localized; metadata complete; new content pipeline fully operational
- **4** -- 99-99.9% coverage; rare untranslated strings in edge cases; nearly all content types covered; most assets localized; metadata mostly complete; pipeline exists with minor gaps
- **3** -- 97-99% coverage; occasional untranslated strings in secondary flows; some content types incomplete; asset localization partial; metadata gaps; pipeline is manual
- **2** -- 90-97% coverage; untranslated strings visible in main flows; significant content type gaps; minimal asset localization; metadata not localized; no pipeline
- **1** -- <90% coverage; untranslated strings throughout; only primary UI translated; no asset localization; no metadata; no process for new content

### Coverage Tracking

```markdown
## Coverage Report: [Locale]

| Content Type | Total Strings | Translated | Coverage | Status |
|-------------|---------------|------------|----------|--------|
| UI Strings | | | | |
| Error Messages | | | | |
| Help Text | | | | |
| Notifications | | | | |
| Emails | | | | |
| Legal | | | | |
| App Store | | | | |
| **Total** | | | | |
```

### Red Flags

- Source language strings visible on primary user paths
- Error messages not translated (users see English errors in a Japanese app)
- Legal content not localized (potential regulatory issue)
- App store listing not localized (impacts discoverability)
- Images with baked-in text not adapted for target locale
- New features ship without localized strings

Score <3 --> do not ship the locale until coverage reaches 99%.

---

## 5. PROCESS EFFICIENCY

**Question:**
Is the localization process efficient, leveraging technology and past work to minimize cost and time?

### What to Evaluate

- **Turnaround Time:** Translation delivery meets project timeline requirements
- **TM Leverage:** Translation Memory leverage >60% for established products
- **MT+PE Quality:** Machine translation post-editing meets quality standards where used
- **Automation Level:** Process steps are automated where possible (file handoff, TM updates, QA)
- **Vendor Management:** Vendor performance tracked and optimized
- **Pipeline Throughput:** Volume handled per sprint/cycle meets demand

### Scoring Guide

- **5** -- Turnaround consistently meets or beats deadlines; TM leverage >75%; MT+PE quality equals human translation for appropriate content; fully automated pipeline; vendor SLAs exceeded; throughput exceeds demand
- **4** -- Turnaround meets deadlines with rare exceptions; TM leverage 60-75%; MT+PE quality is good for low-risk content; mostly automated pipeline; vendor SLAs met; throughput meets demand
- **3** -- Turnaround occasionally misses deadlines; TM leverage 40-60%; MT+PE quality is inconsistent; partial automation; vendor performance variable; throughput sometimes insufficient
- **2** -- Turnaround frequently misses deadlines; TM leverage 20-40%; MT+PE quality is poor; minimal automation; vendor issues unresolved; throughput insufficient
- **1** -- Turnaround is unpredictable; TM leverage <20%; no MT+PE capability; manual processes throughout; no vendor management; cannot meet demand

### Efficiency Metrics Dashboard

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Avg Turnaround (per 1000 words) | | | |
| TM Leverage Rate | >60% | | |
| MT+PE Adoption Rate | | | |
| Automation Coverage | >80% of steps | | |
| Vendor On-Time Delivery | >95% | | |
| Cost Per Word (avg) | | | |

### Red Flags

- Translation Memory not maintained or updated after corrections
- Same content retranslated from scratch on every release
- Manual file handoff via email instead of integrated tools
- No MT+PE evaluation for high-volume, low-risk content
- Vendor selection based solely on cost, not quality metrics
- Translation started after development freeze (too late in cycle)

Score <3 --> audit and redesign the localization pipeline.

---

## 6. TESTING RIGOR

**Question:**
Has the localized product been thoroughly tested for linguistic, functional, and cosmetic quality?

### What to Evaluate

- **Pseudo-Localization Passed:** Pseudo-loc run to catch i18n bugs before real translation
- **Functional L10n Testing:** All locale-dependent functionality tested (date pickers, sorting, input)
- **In-Country Review (ICR):** Native speakers in the target market reviewed the final product
- **Linguistic QA:** Translated content reviewed in context (not just in spreadsheets)
- **Screenshot Testing:** Automated or manual visual comparison of localized screens
- **Regression Testing:** Localization updates do not break previously validated content

### Scoring Guide

- **5** -- Pseudo-loc run in CI/CD; comprehensive functional testing per locale; ICR completed for all primary locales; linguistic QA done in-context; automated screenshot comparison; full regression suite
- **4** -- Pseudo-loc run periodically; functional testing covers critical paths; ICR completed for tier-1 locales; linguistic QA mostly in-context; manual screenshot review; regression covers critical areas
- **3** -- Pseudo-loc run once; functional testing is basic; ICR completed for some locales; linguistic QA done in spreadsheets (out of context); limited screenshot review; minimal regression
- **2** -- No pseudo-loc; functional testing only for default locale; no ICR; linguistic QA by non-native speakers; no screenshot review; no regression testing
- **1** -- No testing of any kind; localized build not verified before release; issues discovered by end users

### Testing Matrix

| Test Type | When | Who | Coverage |
|-----------|------|-----|----------|
| Pseudo-localization | Every build | Automated | All strings |
| Functional L10n | Per release | QA team | All locales |
| Linguistic QA | Post-translation | Linguists | All content |
| In-Country Review | Pre-release | In-market reviewers | Tier-1 locales |
| Screenshot Testing | Per release | Automated + manual | All screens |
| Regression | Per update | Automated | Changed content |

### Red Flags

- Localized build never run before release
- Linguistic QA done only in translation management tool, not in the product
- No pseudo-localization at any point in development
- In-country review skipped to meet deadlines
- Testing done by speakers of the source language, not the target language
- Cosmetic issues (truncation, overlap) discovered by end users

Score <3 --> implement minimum testing requirements before next release.

---

## 7. SCALABILITY

**Question:**
Can the localization process scale to new locales, new content types, and increased volume without degrading quality?

### What to Evaluate

- **Continuous Localization Pipeline:** Translation integrated into CI/CD
- **CI/CD Integration:** Localization builds and tests run automatically
- **New Locale Onboarding:** A new locale can be added in <2 weeks
- **Content Type Flexibility:** Pipeline handles UI strings, docs, multimedia, marketing
- **Volume Handling:** Process scales linearly (2x content does not mean 4x effort)
- **Tool Infrastructure:** TMS, TM, MT engines, QA tools support growth

### Scoring Guide

- **5** -- Fully continuous localization in CI/CD; new locale in <1 week; all content types supported; volume scales linearly; tool infrastructure is enterprise-grade; zero manual bottlenecks
- **4** -- Mostly continuous with minor manual steps; new locale in 1-2 weeks; most content types supported; volume scales with manageable overhead; tools are adequate; few manual bottlenecks
- **3** -- Batch localization with weekly syncs; new locale in 2-4 weeks; some content types require special handling; volume scaling requires additional headcount; tool gaps exist
- **2** -- Manual batch localization; new locale in 4-8 weeks; limited content type support; volume scaling is painful; tools are inadequate; many manual bottlenecks
- **1** -- No scalable process; new locale requires project-level effort; limited to one content type; volume increases cause quality drops; no tools beyond spreadsheets

### Scalability Assessment

```markdown
## Scalability Report

| Factor | Current State | Target State | Gap |
|--------|--------------|--------------|-----|
| Locale Count Supported | | | |
| Time to Add New Locale | | <2 weeks | |
| Content Types Supported | | All | |
| Monthly Volume Capacity | | | |
| Automation Coverage | | >80% | |
| Tool Stack | | Enterprise TMS | |
```

### Red Flags

- Adding a new locale requires code changes
- Locale-specific configurations are hardcoded
- Translation files are manually copied between environments
- No translation management system (using spreadsheets or email)
- Single points of failure in the pipeline (one person, one tool)
- Scaling requires proportional headcount increases

Score <3 --> invest in localization infrastructure before adding more locales.

---

## 8. COST EFFICIENCY

**Question:**
Is the localization program delivering quality at a sustainable cost relative to industry benchmarks?

### What to Evaluate

- **Cost Per Word vs Benchmark:** Translation cost per word is competitive for quality tier
- **Quality-Cost Balance:** Higher spend correlates with higher quality outcomes
- **TM Savings Realized:** Translation Memory reduces cost over time
- **MT Savings Realized:** Machine translation reduces cost for appropriate content
- **Waste Reduction:** Rework, retranslation, and duplicate effort minimized
- **ROI Measurable:** Localization investment correlates with market revenue

### Scoring Guide

- **5** -- Cost per word at or below benchmark for quality tier; TM savings >40% of total cost; MT reduces cost by >20% for eligible content; rework rate <5%; localization ROI clearly positive and measured
- **4** -- Cost per word within 15% of benchmark; TM savings 25-40%; MT provides measurable savings; rework rate 5-10%; ROI appears positive but measurement is informal
- **3** -- Cost per word within 30% of benchmark; TM savings 10-25%; MT savings minimal; rework rate 10-20%; ROI not measured
- **2** -- Cost per word significantly above benchmark; TM savings <10%; no MT utilization; rework rate 20-30%; spending with no measurable return
- **1** -- Cost is uncontrolled; no TM savings; no MT; rework rate >30%; no ROI measurement; localization budget frequently exceeded

### Cost Benchmarks (Per Word, 2024-2025)

| Quality Tier | Range (USD/word) | Use Case |
|-------------|-------------------|----------|
| MT Only | $0.02-0.05 | Internal docs, low-risk content |
| MT + Post-Edit (Light) | $0.05-0.08 | User-facing, non-critical |
| MT + Post-Edit (Full) | $0.08-0.12 | User-facing, quality-sensitive |
| Human Translation | $0.10-0.20 | Marketing, legal, brand content |
| Transcreation | $0.20-0.40 | Creative, culturally adapted content |

### Red Flags

- Same content translated multiple times due to poor TM management
- Premium rates paid for content that could use MT+PE
- No cost tracking per locale, content type, or vendor
- Localization budget set without reference to content volume
- No measurement of revenue impact per localized market
- Vendor lock-in preventing competitive pricing

Score <3 --> conduct cost audit and optimize vendor/technology strategy.

---

## FINAL LOCALIZATION SCORE DECISION

### Hard Fail Dimensions (Linguistic Quality, Technical Quality, Cultural Appropriateness)

- Score <3 --> **IMMEDIATE REMEDIATION REQUIRED**
- These represent quality failures that directly harm user experience and brand trust

### All Dimensions

- Average score >= 4.0 --> **LOCALE MAY SHIP**
- Average score 3.5-3.9 --> **CONDITIONAL APPROVAL** -- ship with documented remediation plan
- Average score < 3.5 --> **DO NOT SHIP** -- locale is not ready

### Coverage Exception

- Coverage <99% for a shipping locale is an automatic FAIL regardless of average score
- Coverage <95% blocks the locale from any release

### Locale Tier Consideration

- Tier 1 locales (top revenue markets): All dimensions must be >= 4
- Tier 2 locales (growth markets): Average >= 3.5 acceptable with improvement plan
- Tier 3 locales (exploratory): Average >= 3.0 acceptable for soft launch

---

## SCORE CARD TEMPLATE

```markdown
## Localization Score: [Product/Feature Name]

**Source Locale:** [e.g., en-US]
**Target Locale:** [e.g., ja-JP]
**Content Type:** [e.g., UI strings, marketing, legal]
**Locale Tier:** [1/2/3]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Linguistic Quality | /5 | MQM Error Rate: X% |
| Cultural Appropriateness | /5 | |
| Technical Quality | /5 | |
| Coverage | /5 | Coverage: X% |
| Process Efficiency | /5 | TM Leverage: X% |
| Testing Rigor | /5 | |
| Scalability | /5 | |
| Cost Efficiency | /5 | Cost/word: $X.XX |

**Average Score:** X.X/5
**Hard Fail Check:** PASS / FAIL
**Coverage Check:** PASS / FAIL (X%)
**Verdict:** SHIP / CONDITIONAL / DO NOT SHIP
**Required Actions:** [if any]
```

---

## SCORING PROCESS

1. State source locale, target locale, content type, and locale tier
2. Review all translation deliverables and test reports
3. Score each dimension independently with written justification
4. Check hard fail dimensions first -- if any fail, stop and remediate
5. Check coverage -- if below 99%, locale cannot ship
6. Calculate average score
7. Document required actions for any dimension scoring below 4
8. Record the score card in project documentation

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Do not ship locales that fail hard dimensions.
Linguistic quality is non-negotiable.
Cultural respect is non-negotiable.
Remediate until standards are met.

---

## END OF LOCALIZATION SCORE
