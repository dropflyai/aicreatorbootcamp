# Marketing Reporting — Executive Dashboards, KPI Trees, and Forecasting

## The Purpose of Marketing Reporting

Marketing reporting serves three audiences with different needs:

1. **The Board and CEO:** "Is marketing generating enough pipeline and revenue to
   justify the investment?" They need high-level efficiency metrics and trend lines.

2. **The CMO and VP Marketing:** "Where should we invest more, and where should we
   cut?" They need channel-level performance and optimization signals.

3. **Marketing Managers and ICs:** "Are my campaigns working, and what should I
   change?" They need tactical, real-time performance data.

Most marketing reporting fails because it serves one audience while confusing the
others. This module provides frameworks for each audience and the KPI structures
that connect tactical activity to strategic outcomes.

---

## Executive Marketing Report

### Board-Level Marketing Report (Monthly/Quarterly)

**Page 1: Pipeline and Revenue Contribution**

| Metric | This Period | Prior Period | Change | Target | Status |
|--------|-----------|-------------|--------|--------|--------|
| Marketing-Sourced Pipeline | $[X]M | $[Y]M | [+/-X]% | $[Z]M | [On/Off Track] |
| Marketing-Influenced Pipeline | $[X]M | $[Y]M | [+/-X]% | $[Z]M | [On/Off Track] |
| Marketing-Sourced Revenue | $[X]M | $[Y]M | [+/-X]% | $[Z]M | [On/Off Track] |
| Marketing-Influenced Revenue | $[X]M | $[Y]M | [+/-X]% | $[Z]M | [On/Off Track] |
| Pipeline Coverage (Marketing) | [X]x | [Y]x | [+/-] | [Z]x | [On/Off Track] |

**Page 2: Efficiency Metrics**

| Metric | This Period | Prior Period | Change | Benchmark |
|--------|-----------|-------------|--------|-----------|
| Blended CAC | $[X] | $[Y] | [+/-X]% | $[Z] |
| Marketing CAC | $[X] | $[Y] | [+/-X]% | $[Z] |
| CAC Payback (months) | [X] | [Y] | [+/-X] | [Z] |
| LTV:CAC | [X]:1 | [Y]:1 | [+/-] | 3-5:1 |
| Magic Number | [X] | [Y] | [+/-] | 0.75-1.0 |

**Page 3: Channel Performance Summary**

| Channel | Spend | Pipeline | Revenue | ROAS | CAC | Trend |
|---------|-------|----------|---------|------|-----|-------|
| Paid Search | $[X]K | $[X]M | $[X]M | [X]x | $[X]K | [arrow] |
| Paid Social | $[X]K | $[X]M | $[X]M | [X]x | $[X]K | [arrow] |
| Content/SEO | $[X]K | $[X]M | $[X]M | [X]x | $[X]K | [arrow] |
| Events | $[X]K | $[X]M | $[X]M | [X]x | $[X]K | [arrow] |
| Outbound (SDR) | $[X]K | $[X]M | $[X]M | [X]x | $[X]K | [arrow] |
| Partner | $[X]K | $[X]M | $[X]M | [X]x | $[X]K | [arrow] |
| **Total** | **$[X]K** | **$[X]M** | **$[X]M** | **[X]x** | **$[X]K** | |

**Page 4: Key Insights and Recommendations**

- Insight 1: [What happened + why + what we are doing about it]
- Insight 2: [What happened + why + what we are doing about it]
- Insight 3: [What happened + why + what we are doing about it]
- Budget Recommendation: [Where to shift investment based on data]

### Executive Reporting Principles

1. **Lead with outcomes, not activity.** Never open with "we published 12 blog posts."
   Open with "marketing generated $3.2M in pipeline this month."
2. **Compare to targets, not just prior periods.** Period-over-period comparison is
   context. Comparison to target is accountability.
3. **Explain the "why."** Numbers without narrative are data, not intelligence.
4. **Include recommendations.** Every report should end with "here is what we should
   do next" based on the data.
5. **One page per audience.** Board members read one page. CMOs read four. Managers
   read ten. Design accordingly.

---

## KPI Trees

### What Is a KPI Tree?

A KPI tree is a hierarchical decomposition of a top-level business metric into its
component parts. It shows the mathematical and causal relationships between metrics,
enabling root cause diagnosis when a top-level metric moves.

### Marketing KPI Tree

```
                    REVENUE
                       │
          ┌────────────┼────────────┐
          │            │            │
     New Revenue  Expansion    Churn
          │        Revenue     Reduction
          │
    ┌─────┴──────┐
    │            │
  Pipeline    Win Rate
  Created
    │
  ┌─┴──┐
  │    │
MQLs  SQL
      Conversion
  │
┌─┴──┐
│    │
Traffic  Conversion
         Rate
│
├── Organic (SEO)
├── Paid Search
├── Paid Social
├── Direct
├── Referral
├── Email
└── Events
```

### KPI Tree Diagnostic Example

**Problem:** Pipeline is down 20% this quarter.

**Diagnosis using KPI tree:**
```
Pipeline Down 20%
├── MQLs down 15%
│   ├── Traffic flat
│   └── Conversion rate down 15%
│       ├── Landing page CVR down 20% ← ROOT CAUSE: redesign degraded performance
│       └── Form completion rate flat
├── SQL conversion rate down 5%
│   └── SDR follow-up time increased 2x ← SECONDARY CAUSE: SDR capacity issue
└── Average deal size flat (no contribution)
```

**Action:** Revert landing page design, hire additional SDR.

---

## Pipeline Source Reporting

### Pipeline Source Definitions

| Source | Definition | Attribution Rule |
|--------|-----------|-----------------|
| Marketing-Sourced | Opportunity where marketing created the lead | First-touch attribution: marketing campaign was first interaction |
| Marketing-Influenced | Opportunity where contact engaged with marketing during the deal cycle | Multi-touch: any marketing touch between lead creation and opportunity close |
| Sales-Sourced | Opportunity where sales (AE/SDR) created the contact with no prior marketing interaction | No marketing first-touch |
| Partner-Sourced | Opportunity where partner referred or co-created the opportunity | Partner tagged as source in CRM |
| PLG-Sourced | Opportunity where product usage triggered sales engagement | Product-qualified lead pathway |

### Pipeline Source Dashboard

| Source | Pipeline Created | % of Total | Win Rate | Avg. Cycle | Avg. ACV |
|--------|-----------------|-----------|----------|-----------|---------|
| Marketing-Sourced | $[X]M | [X]% | [X]% | [X] days | $[X]K |
| Marketing-Influenced | $[X]M | [X]% | [X]% | [X] days | $[X]K |
| Sales-Sourced | $[X]M | [X]% | [X]% | [X] days | $[X]K |
| Partner-Sourced | $[X]M | [X]% | [X]% | [X] days | $[X]K |
| PLG-Sourced | $[X]M | [X]% | [X]% | [X] days | $[X]K |

### Pipeline Source Benchmarks (B2B SaaS)

| Company Stage | Marketing-Sourced | Marketing-Influenced | Sales-Sourced |
|--------------|------------------|---------------------|---------------|
| Early Stage (< $5M ARR) | 60-80% | 70-90% | 10-30% |
| Growth ($5-50M ARR) | 40-60% | 60-80% | 20-40% |
| Scale ($50M+ ARR) | 30-50% | 50-70% | 30-50% |

---

## Marketing Forecasting

### Pipeline Forecasting for Marketing

Marketing should forecast pipeline contribution 1-2 quarters ahead:

**Method 1: Historical Run Rate**
```
Next Quarter Pipeline = Average of Last 3 Quarters Pipeline x (1 + Growth Rate)
```

**Method 2: Funnel-Based Forecasting**
```
Projected Pipeline = Projected Traffic x Conversion Rate x MQL-to-SQL Rate
                     x SQL-to-Opp Rate x Average Deal Size
```

**Method 3: Investment-Based Forecasting**
```
Projected Pipeline = Planned Spend x Historical Pipeline ROAS (by channel)
```

### Marketing Forecast Template

| Channel | Planned Spend | Expected MQLs | Expected SQLs | Expected Pipeline | Confidence |
|---------|-------------|---------------|---------------|-------------------|------------|
| Paid Search | $[X]K | [X] | [X] | $[X]M | High |
| LinkedIn Ads | $[X]K | [X] | [X] | $[X]M | Medium |
| Content/SEO | $[X]K | [X] | [X] | $[X]M | High |
| Events | $[X]K | [X] | [X] | $[X]M | Medium |
| SDR Outbound | $[X]K | [X] | [X] | $[X]M | Medium |
| **Total** | **$[X]K** | **[X]** | **[X]** | **$[X]M** | |

### Forecast Accuracy Tracking

Track forecast accuracy quarterly to improve prediction over time:

| Quarter | Forecasted Pipeline | Actual Pipeline | Accuracy | Variance |
|---------|-------------------|----------------|----------|----------|
| Q1 | $[X]M | $[X]M | [X]% | [+/-X]% |
| Q2 | $[X]M | $[X]M | [X]% | [+/-X]% |
| Q3 | $[X]M | $[X]M | [X]% | [+/-X]% |
| Q4 | $[X]M | $[X]M | [X]% | [+/-X]% |

**Target Accuracy:** +/-15% by Q2 of implementing forecasting, +/-10% by year-end.

---

## Reporting Cadence

| Report | Frequency | Audience | Content | Delivery |
|--------|-----------|----------|---------|----------|
| Campaign Pulse | Daily | Marketing Managers | Real-time campaign metrics | Dashboard |
| Weekly Marketing Review | Weekly | Marketing Team | Channel performance, pipeline created | Meeting + doc |
| Monthly Marketing Report | Monthly | CMO + VP Sales | Pipeline, efficiency, channel mix | Deck + discussion |
| Board Marketing Report | Quarterly | Board/CEO | Revenue contribution, efficiency, forecast | Deck (4 pages max) |
| Annual Marketing Review | Annually | Leadership | Year in review, next year strategy | Strategy deck |

---

## Reporting Anti-Patterns

### Vanity Metrics
Reporting impressions, followers, and page views without connecting them to pipeline.
These metrics feel good but do not inform decisions.

### Activity Over Outcomes
"We sent 50,000 emails this month" is activity. "Email campaigns generated 45 SQLs
and $1.2M in pipeline" is outcomes. Report outcomes first, activity as context.

### Data Without Insight
Presenting 30 slides of charts without interpretation. Every metric presented should
answer: "What does this mean, and what should we do about it?"

### Cherry-Picking
Only showing metrics that are improving while hiding metrics that are declining.
Credibility requires transparency about both wins and challenges.

---

**Marketing reporting is not about proving marketing's value — it is about
improving marketing's value. The best reports create action, not applause.**
