# Translation Management — Authoritative Module

Translation management is the operational backbone of localization. It
encompasses the systems, processes, and workflows that move content from
source language through translation and review to delivery in target
locales. This document codifies TMS selection, CAT tool integration,
translation memory management, terminology governance, and workflow design.

---

## 1. TRANSLATION MANAGEMENT SYSTEMS (TMS)

### What Is a TMS?

A TMS is software that orchestrates the translation workflow: string
extraction, assignment to translators, translation memory leveraging,
quality checks, review, and delivery. It is the central hub of
localization operations.

### Leading TMS Platforms

| Platform | Best For | Pricing Model | Key Differentiator |
|----------|---------|---------------|-------------------|
| Crowdin | Developer-centric, OSS, SaaS | Per-word or subscription | Git integration, developer UX |
| Lokalise | Product teams, agile workflows | Per-user subscription | Figma/design integration, OTA |
| Phrase (Memsource) | Enterprise, LSP partnerships | Per-user + volume | Advanced TM, CAT integration |
| Smartling | Enterprise, marketing content | Usage-based | Neural MT, GDN (proxy l10n) |
| Transifex | Community translation, OSS | Per-user subscription | Crowdsourced translation support |
| memoQ | LSPs, complex workflows | Per-seat license | Advanced CAT, project management |
| XTM | Enterprise, compliance | Per-seat license | Compliance features, workflow |

### TMS Selection Criteria

| Criterion | Weight | Questions to Ask |
|-----------|--------|-----------------|
| Developer integration | 25% | Git integration? CLI? API? CI/CD hooks? |
| File format support | 15% | JSON, XLIFF, PO, YAML, strings? |
| TM and glossary | 15% | TM leverage, shared TM, terminology management? |
| Workflow flexibility | 10% | Custom workflows, review steps, approval? |
| MT integration | 10% | Which MT engines? MTPE workflow? |
| QA tools | 10% | Built-in QA checks, LQA scoring? |
| Reporting | 5% | Progress tracking, cost reporting, quality metrics? |
| Scalability | 5% | Performance at volume, concurrent languages? |
| Cost | 5% | Total cost at current and projected scale? |

---

## 2. CAT TOOLS

### Computer-Assisted Translation Tools

CAT tools are the translator's workbench, providing a side-by-side editing
environment with TM suggestions, terminology lookup, QA checks, and MT
pre-translation.

| Feature | Function | Impact |
|---------|----------|--------|
| Segment editor | Side-by-side source/target | Core translation UX |
| TM suggestions | Auto-suggest from translation memory | 30–70% cost savings |
| MT pre-translation | Machine translation as starting point | Speed increase |
| Terminology | In-context glossary lookup | Consistency |
| QA checks | Real-time quality validation | Error prevention |
| Concordance search | Search across entire TM | Consistency |
| Preview | See translation in context | Quality improvement |
| Comments | Translator-developer communication | Context sharing |

---

## 3. TRANSLATION MEMORY

### TM Architecture

| TM Type | Scope | Use Case |
|---------|-------|----------|
| Project TM | Single project | Consistency within project |
| Product TM | Product-wide | Shared across product versions |
| Organization TM | Company-wide | Shared across all products |
| Shared TM | Cross-organization | Industry-specific terminology |

### TM Maintenance

| Task | Frequency | Purpose |
|------|-----------|---------|
| Duplicate cleanup | Quarterly | Remove redundant entries |
| Quality review | Bi-annually | Remove low-quality entries |
| Domain segmentation | Annually | Separate UI from docs from marketing |
| TM alignment | On legacy content import | Create TM from existing translations |
| TM export/backup | Monthly | Disaster recovery |

### TM Leverage Optimization

| Strategy | Description | Impact |
|----------|-------------|--------|
| Consistent source writing | Reuse phrases across product | +10–20% leverage |
| String reuse | Share common strings (OK, Cancel, Save) | +5–10% leverage |
| Style guide enforcement | Consistent writing style | +5–15% leverage |
| Pre-translation | Apply TM before translator assignment | Faster turnaround |
| Cross-project TM sharing | Leverage translations across products | +10–20% leverage |

---

## 4. TERMINOLOGY MANAGEMENT

### Glossary Structure

| Field | Required | Description |
|-------|----------|-------------|
| Source term | Yes | English term |
| Target term | Yes (per locale) | Approved translation |
| Part of speech | Recommended | Noun, verb, adjective |
| Definition | Recommended | Meaning in product context |
| Context | Recommended | Where the term appears |
| Do not translate | If applicable | Terms that stay in English |
| Forbidden translation | If applicable | Incorrect translations to avoid |
| Notes | Optional | Additional guidance |

### Terminology Governance

```
New Term Identified
    │
    ▼
Term Proposed (with context and suggested translation)
    │
    ▼
Linguist Review (in-market native speaker)
    │
    ▼
Approval (terminology manager or product owner)
    │
    ▼
Added to Term Base (all locales updated)
    │
    ▼
Propagated to TMS (auto-suggested in future translations)
```

### Do-Not-Translate (DNT) List

Maintain a list of terms that should never be translated:
- Brand names and product names
- Technical API names and code references
- Third-party product names
- Acronyms that are used globally
- URLs, email addresses, social handles

---

## 5. TRANSLATION WORKFLOW

### Standard Workflow (TEP: Translation, Editing, Proofreading)

```
Source Content
    │
    ▼
Pre-Processing
├── File engineering (format conversion if needed)
├── TM pre-translation (apply 100% and fuzzy matches)
├── MT pre-translation (for new segments)
└── Context preparation (screenshots, glossary, instructions)
    │
    ▼
Translation
├── Translator works in CAT tool
├── Leverages TM, MT, glossary
├── Flags questions/issues
└── Completes and submits
    │
    ▼
Editing (Review)
├── Second linguist reviews for accuracy and fluency
├── Compares against source
├── Checks terminology compliance
└── Provides feedback to translator
    │
    ▼
Quality Assurance
├── Automated QA checks (placeholders, formatting)
├── Terminology compliance check
├── Completeness verification
└── LQA scoring (if applicable)
    │
    ▼
Delivery
├── File engineering (format conversion back)
├── Integration into product/repository
├── Sanity check in context
└── Sign-off
```

### Agile/Continuous Workflow

```
Developer commits new/changed strings
    │ (automated detection)
    ▼
TMS pulls new strings automatically
    │
    ▼
Pre-processing (TM + MT pre-translation)
    │ (automated)
    ▼
Translation assignment (to translator team)
    │
    ▼
Translation completed in TMS
    │
    ▼
Automated QA checks
    │
    ▼
Review (if required for content type)
    │
    ▼
Automated delivery back to repository
    │ (PR or direct commit)
    ▼
Deployed with next release
```

### Workflow by Content Type

| Content Type | Workflow | Quality Level | Turnaround |
|-------------|---------|--------------|------------|
| UI strings | Translation + review + automated QA | High | 2–3 days |
| Help/docs | Translation + review | High | 3–5 days |
| Marketing | Transcreation + review | Highest | 5–10 days |
| Legal | Translation + legal review + review | Highest | 5–15 days |
| User-generated | MT + light post-editing | Adequate | Hours |
| Support articles | Translation + review | High | 2–4 days |

---

## 6. WORKFLOW AUTOMATION

### Automatable Steps

| Step | Automation Method | Tool |
|------|------------------|------|
| String extraction | Git hook, CI trigger | TMS CLI, GitHub Action |
| TM pre-translation | TMS automation | Built-in TMS feature |
| MT pre-translation | TMS + MT API | TMS + DeepL/Google/custom |
| QA checks | Automated rules | TMS QA or Xbench |
| Delivery | API/webhook/Git | TMS + CI/CD pipeline |
| Progress notification | Webhook/Slack | TMS integration |
| Cost estimation | TM analysis | TMS reporting |

### CI/CD Integration Pattern

```yaml
# GitHub Actions example
on:
  push:
    paths:
      - 'src/locales/en.json'

jobs:
  push-to-tms:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Push source strings to Crowdin
        uses: crowdin/github-action@v1
        with:
          upload_sources: true
          download_translations: false

  pull-translations:
    runs-on: ubuntu-latest
    # Triggered by TMS webhook when translations complete
    steps:
      - uses: actions/checkout@v4
      - name: Pull translations from Crowdin
        uses: crowdin/github-action@v1
        with:
          upload_sources: false
          download_translations: true
          create_pull_request: true
```

---

## 7. VENDOR MANAGEMENT IN TMS

### Multi-Vendor Workflow

Many organizations use multiple translation vendors, assigning by:
- Language pair specialization
- Content type expertise
- Availability and turnaround
- Cost tier

### Vendor Assignment Rules

| Criterion | Rule |
|-----------|------|
| Content type | Marketing → agency A, UI → agency B |
| Language | FIGS → agency A, CJK → agency B |
| Volume | Overflow → secondary vendor |
| Quality score | Top scorer gets priority assignment |
| Turnaround | Urgent → fastest vendor with quality threshold |

---

## 8. METRICS

| Metric | Formula | Target |
|--------|---------|--------|
| TM leverage | % of words matched from TM | >40% |
| Translation throughput | Words translated per day | Benchmark per vendor |
| Turnaround time | Submission to delivery | Per content type SLA |
| First-pass quality | % of segments accepted without edit | >85% |
| Cost per word | Total cost / total words | Decreasing trend |
| On-time delivery | % of projects delivered on time | >95% |
| Translator satisfaction | Survey score | >4/5 |

---

## 9. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Email-based workflow | Sending files via email | Use a TMS |
| No TM | Translating same strings repeatedly | Implement TM immediately |
| No glossary | Inconsistent terminology | Create and enforce glossary |
| No context | Translators work blind | Screenshots, comments, context |
| No review | Single pass translation only | At minimum automated QA |
| Manual file management | Copy-pasting between systems | Automated pipeline |

---

**Translation management is the operational engine of localization. The
right TMS, properly configured with automated workflows, TM leverage,
and quality controls, transforms localization from a bottleneck into a
scalable, predictable process. Invest in the workflow infrastructure
before scaling the number of target languages.**
