# Reporting — Dashboards, Cadence, Trend Analysis, and VOC

## Overview

Support reporting transforms raw operational data into actionable intelligence for
decision makers at every level of the organization. Effective reporting answers three
questions: "How are we performing?" (descriptive), "Why are we performing this way?"
(diagnostic), and "What will happen next?" (predictive). This module covers executive
reporting, dashboard design, reporting cadence across weekly/monthly/quarterly cycles,
trend analysis methodology, root cause analysis, Voice of the Customer (VoC) programs
that feed product teams, and forecasting techniques.

---

## 1. Reporting Philosophy

### Reporting Principles

1. **Audience-first** — Every report is designed for a specific audience with specific
   decisions to make. An agent dashboard looks nothing like an executive QBR.

2. **Insight over data** — Raw numbers are not reports. Every metric needs context:
   trend direction, benchmark comparison, and recommended action.

3. **Balanced scorecard** — Never report a single metric in isolation. Pair efficiency
   with quality, speed with satisfaction, cost with experience.

4. **Exception-based** — Executives do not need to know that things are on track.
   They need to know what is off track, why, and what is being done about it.

5. **Forward-looking** — Historical data is the foundation, but the most valuable
   reports include forecasts and recommended actions.

---

## 2. Dashboard Design

### Dashboard Hierarchy

```
LEVEL 1: REAL-TIME OPERATIONS (Agents, Team Leads)
  Purpose: Manage the queue in real-time
  Refresh: Live (every 30 seconds)
  Metrics:
    - Current queue depth (total and by channel)
    - Agents available / busy / offline
    - Longest waiting ticket
    - SLA compliance (real-time %)
    - Today's ticket volume vs. forecast
    - Active incidents (if any)

LEVEL 2: DAILY DIGEST (Team Leads, Managers)
  Purpose: Identify yesterday's issues and today's priorities
  Refresh: Daily (automated morning delivery)
  Metrics:
    - Yesterday's volume (created vs. resolved)
    - FRT and ART performance vs. SLA
    - SLA breaches (list with details)
    - Backlog size and trend
    - Agent productivity (tickets per agent)
    - Notable tickets (escalations, VIP, complaints)

LEVEL 3: WEEKLY SCORECARD (Managers, Directors)
  Purpose: Track week-over-week trends and operational health
  Refresh: Weekly (Monday morning)
  Metrics:
    - Volume trend (4-week view)
    - FRT, ART, FCR trends
    - CSAT and CES trends
    - Backlog health (total, aged, growth rate)
    - Top 5 issue categories (volume and trend)
    - Escalation volume and reasons
    - Agent QA scores (team average)
    - Self-service deflection rate

LEVEL 4: MONTHLY EXECUTIVE REPORT (VP, C-Suite)
  Purpose: Strategic view of support health and business impact
  Refresh: Monthly
  Metrics:
    - All Level 3 metrics with 3-month trend
    - Cost per ticket trend
    - Support ROI analysis
    - Customer retention correlation
    - VoC insights (top product feedback themes)
    - Headcount and capacity forecast
    - Key initiatives status and impact

LEVEL 5: QUARTERLY BUSINESS REVIEW (C-Suite, Board)
  Purpose: Strategic positioning and investment case
  Refresh: Quarterly
  Metrics:
    - Executive summary (3 bullet points)
    - Key metrics vs. goals (OKR progress)
    - Industry benchmark comparison
    - Year-over-year trends
    - Support-influenced revenue and retention
    - Investment recommendations
    - Next quarter goals and initiatives
```

### Dashboard Design Best Practices

| Principle | Implementation |
|-----------|---------------|
| **Hierarchy** | Most important metric largest and top-left |
| **Color coding** | Green/yellow/red for status; consistent across all dashboards |
| **Trends over snapshots** | Every metric should show a trend line (not just current value) |
| **Comparison** | Show vs. target, vs. previous period, vs. benchmark |
| **Drill-down** | Click any metric to see underlying data |
| **Mobile-friendly** | Key dashboards accessible on mobile for on-call leads |
| **Annotation** | Mark anomalies (incidents, product launches, holidays) on timeline |

### Dashboard Tools

```
VISUALIZATION:
  - Looker / Looker Studio (Google)  -- SQL-based, flexible
  - Tableau                          -- Enterprise visualization
  - Metabase                         -- Open source, SQL-friendly
  - Mode Analytics                   -- SQL + Python notebooks
  - Power BI                         -- Microsoft ecosystem

HELPDESK NATIVE:
  - Zendesk Explore                  -- Built-in Zendesk reporting
  - Intercom Reports                 -- Built-in Intercom analytics
  - Freshdesk Analytics              -- Built-in Freshdesk reporting

SPREADSHEET:
  - Google Sheets + Apps Script      -- Lightweight, early stage
  - Excel + Power Query              -- For finance-oriented teams
```

---

## 3. Weekly Report Template

### Structure

```
WEEKLY SUPPORT REPORT — Week of [Date]

EXECUTIVE SUMMARY (3 sentences):
  [What happened. What's concerning. What's being done.]

───────────────────────────────────────────────

VOLUME:
  Created:     [N] ([+/-X%] vs. last week, [+/-X%] vs. 4-week avg)
  Resolved:    [N] ([+/-X%] vs. last week)
  Net Change:  [+/-N] (backlog [growing/shrinking])
  Open Backlog: [N] ([+/-X%] vs. last week)

PERFORMANCE:
  Metric          This Week    Target    Trend (4wk)    Status
  ──────────────────────────────────────────────────────────────
  FRT (median)    [X hours]    [target]  [↑↓→]         [G/Y/R]
  ART (median)    [X hours]    [target]  [↑↓→]         [G/Y/R]
  FCR             [X%]         [target]  [↑↓→]         [G/Y/R]
  CSAT            [X%]         [target]  [↑↓→]         [G/Y/R]
  CES             [X.X]        [target]  [↑↓→]         [G/Y/R]
  SLA Compliance  [X%]         [target]  [↑↓→]         [G/Y/R]

TOP ISSUES THIS WEEK:
  1. [Category] — [N] tickets ([+/-X%])  [Root cause / action]
  2. [Category] — [N] tickets ([+/-X%])  [Root cause / action]
  3. [Category] — [N] tickets ([+/-X%])  [Root cause / action]

ESCALATIONS:
  Total: [N] ([+/-X%] vs. last week)
  Notable: [Brief description of significant escalation]

TEAM:
  Headcount: [N] ([+/-] vs. plan)
  Agent Utilization: [X%]
  Training/PTO impact: [Any notable absences]

ACTION ITEMS:
  □ [Action 1] — Owner: [Name] — Due: [Date]
  □ [Action 2] — Owner: [Name] — Due: [Date]
```

---

## 4. Monthly Report Template

### Structure

```
MONTHLY SUPPORT REPORT — [Month Year]

EXECUTIVE SUMMARY:
  [2-3 paragraph narrative: What happened this month, what it means,
  and what we're doing about it. Written for non-support executives.]

───────────────────────────────────────────────

SCORECARD:

  Metric           This Month   Last Month   MoM Change   YTD Avg   Target   Status
  ─────────────────────────────────────────────────────────────────────────────────
  Volume            [N]          [N]          [+/-X%]      [N]       [N]      [G/Y/R]
  FRT (median)      [Xh]         [Xh]         [+/-X%]      [Xh]     [Xh]     [G/Y/R]
  ART (median)      [Xh]         [Xh]         [+/-X%]      [Xh]     [Xh]     [G/Y/R]
  FCR               [X%]         [X%]         [+/-X pp]    [X%]     [X%]     [G/Y/R]
  CSAT              [X%]         [X%]         [+/-X pp]    [X%]     [X%]     [G/Y/R]
  CES               [X.X]        [X.X]        [+/-X.X]     [X.X]    [X.X]    [G/Y/R]
  Cost/Ticket       [$X]         [$X]         [+/-X%]      [$X]     [$X]     [G/Y/R]
  Deflection        [X%]         [X%]         [+/-X pp]    [X%]     [X%]     [G/Y/R]
  Agent Satisfaction [X]         [X]          [+/-X]       [X]      [X]      [G/Y/R]

VOLUME ANALYSIS:
  [Chart: Daily volume over the month with 30-day moving average]
  [Chart: Volume by category — top 10 with MoM change]
  [Chart: Volume by channel — breakdown and trend]

  Key observations:
    - [Observation 1 with data]
    - [Observation 2 with data]

QUALITY DEEP DIVE:
  [Chart: CSAT trend with confidence interval]
  [Chart: CES distribution]
  [QA score distribution by dimension]

  Key observations:
    - [Observation 1]
    - [Observation 2]

VOICE OF THE CUSTOMER:
  [Top 5 customer feedback themes with ticket counts and sentiment]
  [Product feedback: Top 5 feature requests / product issues]
  [Verbatim quotes: 2-3 representative customer comments]

FINANCIAL:
  Total support cost: [$X]
  Cost per ticket: [$X] ([trend])
  Deflection savings: [$X] (estimated)
  Support-influenced retention: [X customers / $X ARR]

TEAM:
  Headcount: [Current] / [Plan]
  Turnover: [X%] (annualized)
  New hires: [N] (status: ramping / productive)
  Training hours: [N] (per agent average)

INITIATIVES:
  [Initiative 1]: [Status] — [Key progress / blockers]
  [Initiative 2]: [Status] — [Key progress / blockers]

NEXT MONTH OUTLOOK:
  Expected volume: [N] ([basis for forecast])
  Capacity assessment: [Adequate / At risk / Insufficient]
  Key focus areas: [1-3 priorities]
```

---

## 5. Trend Analysis Methodology

### Types of Trend Analysis

| Type | Method | Use Case |
|------|--------|----------|
| **Time series** | Plot metric over time; identify direction | Is CSAT improving or declining? |
| **Comparison** | Compare periods (MoM, QoQ, YoY) | How does Q1 compare to Q1 last year? |
| **Segmentation** | Break metric by segment (plan, channel, agent) | Which segment is driving the change? |
| **Correlation** | Plot two metrics against each other | Does FRT actually predict CSAT? |
| **Anomaly detection** | Statistical deviation from expected range | Why was Tuesday's volume 3x normal? |

### Trend Interpretation Framework

```
STEP 1: OBSERVE THE TREND
  What direction is the metric moving? Over what timeframe?
  Is the trend consistent or volatile?

STEP 2: QUANTIFY THE CHANGE
  What is the magnitude? (5% change vs. 50% change)
  Is it statistically significant? (not just noise)

STEP 3: SEGMENT THE DATA
  Is the trend uniform or driven by a specific segment?
  Break down by: channel, priority, category, agent, customer tier

STEP 4: IDENTIFY THE CAUSE
  What changed during this period?
  Product releases? Staffing changes? Seasonal effects?
  External factors? Process changes?

STEP 5: ASSESS THE IMPACT
  Is this trend impacting customer experience?
  Is it impacting cost or efficiency?
  Is it likely to continue?

STEP 6: RECOMMEND ACTION
  If positive trend: What is sustaining it? Can we accelerate it?
  If negative trend: What is causing it? What corrective action is needed?
  If neutral: Is stability appropriate, or should we be improving?
```

### Statistical Methods

| Method | When to Use | Complexity |
|--------|------------|-----------|
| **Moving average** | Smooth daily/weekly noise to see trend | Low |
| **Year-over-year comparison** | Remove seasonality | Low |
| **Control charts** | Detect anomalies (out of normal range) | Medium |
| **Regression** | Quantify relationship between variables | Medium |
| **Cohort analysis** | Track metric over customer lifecycle | Medium |
| **Forecasting (Holt-Winters)** | Predict future values with seasonality | High |

---

## 6. Root Cause Analysis

### The Five Whys

For any metric deviation, ask "Why?" five times to reach the root cause:

```
EXAMPLE:

Observation: CSAT dropped from 88% to 82% this month.

Why 1: Why did CSAT drop?
  → FRT increased from 2 hours to 6 hours.

Why 2: Why did FRT increase?
  → Ticket volume spiked 40% without additional staffing.

Why 3: Why did volume spike?
  → A product release introduced a breaking change in the API.

Why 4: Why did the breaking change go out?
  → The change was not covered by regression tests.

Why 5: Why was it not covered?
  → The API test suite did not include the affected endpoint.

ROOT CAUSE: Test coverage gap for the affected API endpoint.

CORRECTIVE ACTION:
  - Engineering: Add regression tests for all API endpoints
  - Support: Create KB article for the breaking change
  - Process: Add support review step before API-breaking releases
```

### Pareto Analysis (80/20)

For volume-related issues, apply the Pareto principle:

```
PARETO ANALYSIS:

  Rank ticket categories by volume:

  Rank  Category              Volume   Cumulative %
  ────────────────────────────────────────────────
  1     Login issues           320      24%
  2     Billing questions      280      45%
  3     API errors             210      61%
  4     Feature X bug          150      72%
  5     Onboarding confusion   120      81%
  ─── 80% line ───────────────────────────────
  6-20  (remaining 15 categories) 260   100%

  Action: Focus on top 5 categories (81% of volume).
  Each category gets a root cause analysis and reduction plan.
```

---

## 7. Voice of the Customer (VoC) Program

### VoC Data Sources

| Source | Data Type | Collection | Frequency |
|--------|----------|-----------|-----------|
| **CSAT surveys** | Quantitative + qualitative (comments) | Post-ticket survey | Continuous |
| **CES surveys** | Quantitative | Post-ticket survey | Continuous |
| **NPS surveys** | Quantitative + qualitative | Quarterly email | Quarterly |
| **Ticket data** | Structured (categories, tags) | Automatic | Continuous |
| **Agent observations** | Qualitative (patterns, frustrations) | Agent feedback channel | Continuous |
| **Social media** | Qualitative (sentiment, themes) | Social monitoring | Continuous |
| **Community forums** | Qualitative (feature requests, complaints) | Community moderation | Continuous |
| **Churned customer interviews** | Qualitative (reasons for leaving) | Exit interviews | Monthly |

### VoC Analysis Framework

```
STEP 1: AGGREGATE
  Collect all VoC data from all sources for the period

STEP 2: CATEGORIZE
  Group feedback into themes:
    - Product bugs / quality issues
    - Missing features / feature requests
    - Usability / UX problems
    - Documentation / guidance gaps
    - Pricing / billing concerns
    - Support experience feedback

STEP 3: QUANTIFY
  For each theme:
    - Number of mentions (volume)
    - Trend (growing, stable, declining)
    - Revenue at risk (ARR of customers mentioning this)
    - Sentiment (positive, neutral, negative)

STEP 4: PRIORITIZE
  Use ICE framework:
    Impact:     How much does this affect customer experience? (1-10)
    Confidence: How confident are we in the data? (1-10)
    Ease:       How easy is it to address? (1-10)
    ICE Score = Impact * Confidence * Ease

STEP 5: REPORT
  Deliver to product team:
    - Top 10 product feedback themes (ranked by ICE)
    - Supporting data (ticket volume, CSAT correlation, verbatim quotes)
    - Recommended priority
    - Customer impact quantification
```

### VoC to Product Feedback Loop

```
MONTHLY VoC REPORT TO PRODUCT:

  TOP PRODUCT FEEDBACK THEMES:

  Rank  Theme                  Tickets   Trend   ARR at Risk   ICE Score
  ──────────────────────────────────────────────────────────────────────
  1     [Theme]                [N]       [↑]     [$X]          [XX]
  2     [Theme]                [N]       [→]     [$X]          [XX]
  3     [Theme]                [N]       [↓]     [$X]          [XX]

  REPRESENTATIVE CUSTOMER QUOTES:
    "[Verbatim quote from customer]" — [Company, ARR tier]
    "[Verbatim quote from customer]" — [Company, ARR tier]

  SUPPORT RECOMMENDATION:
    [What support recommends product prioritize and why]
```

---

## 8. Forecasting

### Volume Forecasting for Reporting

```
FORECASTING METHODS:

  SHORT-TERM (next week):
    Method: Day-of-week pattern * recent trend adjustment
    Accuracy: +/- 10%

  MEDIUM-TERM (next month):
    Method: Monthly seasonal pattern * year-over-year growth rate
    Accuracy: +/- 15%

  LONG-TERM (next quarter):
    Method: User growth projection * contact rate * seasonality
    Accuracy: +/- 20%
```

### Including Forecasts in Reports

```
FORECAST SECTION (Monthly Report):

  Next Month Forecast:
    Volume:    [N] tickets (+/- [X]%)
    Basis:     [Historical pattern + known events]

    Known factors:
      + Product launch on [date]: Expected +[X]% volume spike for 2 weeks
      - KB expansion: Expected -[X]% from improved self-service
      + Seasonal increase: Historical [X]% increase in [month]

    Capacity assessment:
      Required agents: [N]
      Available agents: [N]
      Gap: [surplus/deficit of N agents]
      Recommendation: [Hire / BPO surge / OK as-is]
```

---

## References

1. Few, S. (2006). "Information Dashboard Design." Analytics Press.
2. Tufte, E. (2001). "The Visual Display of Quantitative Information." Graphics Press.
3. Kaushik, A. (2010). "Web Analytics 2.0." Sybex.
4. TSIA (2024). "Support Services Benchmark."
5. Zendesk (2024). "CX Trends Report."
6. McKinsey (2023). "The Value of Customer Experience."

---

**This document is authoritative for reporting within the Support Brain.**
