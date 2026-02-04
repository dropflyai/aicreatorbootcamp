# Translation Quality — Authoritative Module

Translation quality is not a binary pass/fail. It exists on a spectrum
defined by accuracy, fluency, terminology, and fitness for purpose. This
document codifies quality frameworks (MQM, DQF, LQA), MT quality estimation,
post-editing best practices, and translator qualification standards.

---

## 1. QUALITY FRAMEWORKS

### MQM (Multidimensional Quality Metrics)

MQM is the industry-standard framework for evaluating translation quality.
Developed by QT21/DFKI, it defines a taxonomy of error types with severity
levels.

**MQM Error Taxonomy (Top Level):**

| Dimension | Description | Sub-Categories |
|-----------|-------------|---------------|
| Accuracy | Does the translation convey the source meaning? | Addition, omission, mistranslation, untranslated |
| Fluency | Does the translation read naturally? | Grammar, spelling, punctuation, register |
| Terminology | Are terms translated correctly and consistently? | Inconsistent, wrong term, untranslated term |
| Style | Does the translation match the style guide? | Awkward, unidiomatic, register mismatch |
| Design | Are formatting and layout correct? | Markup, truncation, character encoding |
| Locale | Is locale-specific content correct? | Date format, currency, measurement |

**MQM Severity Levels:**

| Severity | Definition | Weight |
|----------|-----------|--------|
| Critical | Renders content unusable or dangerous | 25 penalty points |
| Major | Significantly impacts understanding or usability | 10 penalty points |
| Minor | Noticeable but does not impair understanding | 1 penalty point |
| Neutral | Style preference, not an error | 0 penalty points |

**MQM Score Calculation:**
```
MQM Score = 100 - (Total Penalty Points / Word Count x 100)

Thresholds:
  98–100: Excellent (publication quality)
  95–97:  Good (professional quality)
  90–94:  Acceptable (functional quality)
  85–89:  Below average (needs improvement)
  <85:    Unacceptable (requires retranslation)
```

### DQF (Dynamic Quality Framework)

TAUS Dynamic Quality Framework provides a complementary approach focused on:
- **Adequacy:** Does the translation convey the meaning?
- **Fluency:** Does it read naturally?
- **Error typology:** Similar to MQM but simplified

### LQA (Linguistic Quality Assurance)

LQA is the process of systematically reviewing translations against
quality criteria. It typically involves:

1. **Sampling:** Review a statistically significant sample (5–15% of content)
2. **Error annotation:** Mark errors with type and severity
3. **Scoring:** Calculate quality score using MQM or similar
4. **Reporting:** Generate quality report per language and vendor
5. **Action:** Correct errors, provide feedback, adjust process

---

## 2. MT QUALITY ESTIMATION

### Automatic MT Quality Metrics

| Metric | Type | Description | Use Case |
|--------|------|-------------|----------|
| BLEU | Reference-based | N-gram overlap with human reference | Historical standard |
| COMET | Neural, reference-based | Trained on human judgments | Current best practice |
| COMET-QE | Neural, reference-free | Quality estimation without reference | Real-time estimation |
| chrF | Character-based | Character n-gram F-score | Morphologically rich languages |
| TER | Edit distance | Translation Edit Rate | Post-editing effort estimation |
| BERTScore | Neural, reference-based | Semantic similarity via BERT | Meaning preservation |

### BLEU Score Interpretation

| BLEU Score | Quality Level | Interpretation |
|-----------|--------------|---------------|
| 50+ | Very high | Comparable to human translation |
| 40–50 | High | High quality, minor post-editing |
| 30–40 | Medium | Understandable, moderate post-editing |
| 20–30 | Low | Gist understandable, heavy post-editing |
| <20 | Very low | Barely usable, may need retranslation |

### COMET Score Interpretation

| COMET Score | Quality Level |
|------------|--------------|
| >0.90 | Excellent — near-human quality |
| 0.80–0.90 | Good — light post-editing |
| 0.70–0.80 | Acceptable — moderate post-editing |
| 0.60–0.70 | Below average — heavy post-editing |
| <0.60 | Unacceptable — retranslation recommended |

### When to Use MT vs. Human Translation

| Content Type | MT Suitability | Recommended Approach |
|-------------|---------------|---------------------|
| UI strings | Medium | MT + human post-editing |
| Technical docs | Medium–High | MT + post-editing |
| Marketing copy | Low | Human translation (transcreation) |
| Legal content | Very Low | Human translation + legal review |
| User support | Medium | MT + light post-editing |
| User-generated content | High | MT only or MT + light editing |
| Safety-critical | Very Low | Human translation + expert review |

---

## 3. POST-EDITING (MTPE)

### Post-Editing Levels

| Level | Description | Effort | Use Case |
|-------|-------------|--------|----------|
| Light PE | Fix critical errors only | 20–30% of full translation | Internal content, gist |
| Full PE | Produce publication-quality output | 50–70% of full translation | Customer-facing content |

### Light Post-Editing Guidelines

Editors should:
- Fix factual/semantic errors
- Fix safety-critical content
- Fix brand name errors
- Leave stylistic variations unless they impair understanding
- Not rewrite for preference

### Full Post-Editing Guidelines

Editors should:
- Fix all accuracy errors
- Fix all fluency issues
- Ensure terminology compliance
- Ensure style guide compliance
- Produce output indistinguishable from human translation
- Flag systematic MT errors for engine improvement

### Post-Editing Productivity

| Content Type | Words/Hour (Light PE) | Words/Hour (Full PE) | Words/Hour (Full Translation) |
|-------------|----------------------|---------------------|------------------------------|
| General | 3,000–5,000 | 1,500–3,000 | 300–500 |
| Technical | 2,000–4,000 | 1,000–2,000 | 250–400 |
| Legal | 1,500–3,000 | 800–1,500 | 200–350 |
| Marketing | Not recommended | 500–1,000 | 200–300 |

---

## 4. TRANSLATOR QUALIFICATION

### ISO 17100 Requirements

| Requirement | Description |
|------------|-------------|
| Education | Recognized degree in translation, linguistics, or equivalent |
| Experience | 5+ years of professional translation experience (alt to degree) |
| Specialization | Demonstrated expertise in subject domain |
| Language proficiency | Native-level competence in target language |
| Tools proficiency | CAT tool and TMS competence |
| Continuing education | Ongoing professional development |

### Translator Evaluation Criteria

| Criterion | Weight | Evaluation Method |
|-----------|--------|------------------|
| Accuracy | 30% | LQA sample scoring |
| Fluency | 25% | LQA sample scoring |
| Terminology compliance | 20% | Glossary adherence rate |
| Speed/throughput | 10% | Words per day/hour |
| Reliability | 10% | On-time delivery rate |
| Communication | 5% | Responsiveness, question quality |

### Translator Feedback Loop

```
Translation Delivered
    │
    ▼
Quality Review (LQA)
    │
    ▼
Error Report Generated
    │
    ▼
Feedback Shared with Translator
├── Specific examples of errors
├── Error patterns identified
├── Positive feedback on strengths
└── Resources for improvement
    │
    ▼
Translator Acknowledges and Improves
    │
    ▼
Next Assignment (quality tracked over time)
```

---

## 5. QUALITY ASSURANCE AUTOMATION

### Automated QA Checks

| Check | Description | Automation Level |
|-------|-------------|-----------------|
| Placeholder validation | {variables} match between source and target | Fully automated |
| Tag consistency | HTML/XML tags preserved correctly | Fully automated |
| Number consistency | Numbers match between source and target | Fully automated |
| Terminology compliance | Terms match glossary | Fully automated |
| Length restriction | Translation within character/length limits | Fully automated |
| Punctuation | Consistent punctuation patterns | Semi-automated |
| Spelling | Target language spell check | Fully automated |
| Completeness | All source segments have translations | Fully automated |
| Consistency | Same source translated the same way | Semi-automated |
| Formatting | Whitespace, capitalization patterns | Semi-automated |

### QA Tools

| Tool | Type | Features |
|------|------|---------|
| Xbench | Standalone QA | Comprehensive checks, terminology, consistency |
| QA Distiller | Standalone QA | Configurable checks, batch processing |
| TMS built-in | Integrated QA | Real-time checks during translation |
| Custom scripts | Programmatic | Project-specific rules |

---

## 6. QUALITY PROCESS BY MATURITY LEVEL

| Maturity | Quality Process | Effort |
|----------|---------------|--------|
| Level 1 | Translator self-review only | Minimal |
| Level 2 | Translation + one review | Moderate |
| Level 3 | TEP + automated QA + LQA sampling | Significant |
| Level 4 | TEP + automated QA + LQA + MT quality estimation | Comprehensive |
| Level 5 | All above + predictive quality + continuous improvement | Full |

---

## 7. QUALITY METRICS AND REPORTING

### Quality Dashboard

| Metric | Formula | Target | Reporting |
|--------|---------|--------|-----------|
| MQM score per locale | MQM calculation | >95 | Monthly |
| Error rate per 1,000 words | Errors / (words/1000) | <5 major | Monthly |
| First-pass acceptance rate | Segments accepted without edit / total | >85% | Weekly |
| Terminology compliance | Terms matching glossary / total terms | >95% | Monthly |
| MT quality (COMET) | COMET score on MT output | >0.80 | Per engine update |
| Customer-reported issues | Localization bugs reported | Decreasing | Monthly |

### Quality Improvement Process

```
Measure quality (LQA, metrics)
    │
    ▼
Identify patterns (common errors, weak areas)
    │
    ▼
Root cause analysis (translator, MT, source, process)
    │
    ▼
Corrective action
├── Translator feedback and training
├── Glossary/style guide update
├── MT engine retraining
├── Source content improvement
└── Process adjustment
    │
    ▼
Verify improvement (next measurement cycle)
```

---

## 8. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| No quality measurement | Hope translations are good | Implement LQA sampling |
| BLEU-only for MT | Using only BLEU score | Use COMET + human evaluation |
| Cheapest translator wins | Selecting on price alone | Quality-weighted selection |
| No feedback loop | Errors found but not communicated | Structured feedback process |
| Over-engineering QA | Checking everything, shipping nothing | Risk-based QA (critical content gets more) |
| Ignoring MT output quality | Deploying raw MT without review | Always post-edit customer-facing MT |

---

**Translation quality is not a cost — it is an investment in user trust.
Poor translation erodes brand credibility, increases support costs, and can
create legal liability. The quality framework chosen should match the content
type, audience, and risk level. Not all content needs the same quality bar,
but all content needs a defined quality bar.**
