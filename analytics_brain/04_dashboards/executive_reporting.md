# Executive Reporting — Communicating to Leadership and Boards

---

## Overview

Executive reporting is the art of compressing complex operational reality into decision-quality intelligence for people with limited time and broad responsibility. Executives do not need more data — they need less data, better contextualized, with clearer implications. Board members need even less, with even more context.

This module covers the design of board metrics, investor reporting, executive summaries, and the communication frameworks that ensure data drives decisions at the highest levels of the organization. The standard: an executive should be able to assess business health and identify areas requiring their attention within 60 seconds of opening a report.

---

## The Executive Attention Budget

### Cognitive Constraints

Executives make dozens of decisions daily across multiple domains. Their attention budget for any single report is:

- **Board presentation:** 5-10 minutes per section (30-60 minutes total)
- **Weekly executive review:** 15-30 minutes total for all metrics
- **Daily check-in:** 60-90 seconds to scan the health dashboard
- **Ad-hoc data request:** 2-5 minutes to absorb the answer

**Design implication:** Every element in an executive report must justify its claim on this scarce attention. Ruthless prioritization is not optional — it is the primary design challenge.

### The CEO Dashboard Rule of 5-8

Research on cognitive load (Miller, 1956) establishes that working memory holds 7 plus or minus 2 items. Executive dashboards should contain 5-8 primary metrics. Not 15. Not 25. Five to eight.

---

## Board Metrics

### The Board Reporting Package

A board of directors needs to assess four things:

1. **Is the business growing?** (Growth metrics)
2. **Is the growth efficient?** (Unit economics)
3. **Is the business sustainable?** (Retention and margin metrics)
4. **What are the risks?** (Leading indicators of potential problems)

### Standard Board Metrics by Business Model

**SaaS / Subscription:**

| Metric | Definition | Why Boards Care |
|--------|-----------|-----------------|
| ARR / MRR | Annualized / Monthly Recurring Revenue | Growth trajectory |
| ARR Growth Rate | YoY ARR change | Growth velocity |
| Net Revenue Retention (NRR) | Revenue from existing customers (expansion - churn) | Customer base health |
| Gross Revenue Retention (GRR) | Revenue retained excluding expansion | Churn severity |
| CAC | Customer Acquisition Cost | Growth efficiency |
| LTV:CAC | Lifetime Value to Acquisition Cost ratio | Unit economics |
| Payback Period | Months to recover CAC | Capital efficiency |
| Gross Margin | Revenue minus COGS / Revenue | Business model health |
| Rule of 40 | Growth Rate % + Profit Margin % | Balanced growth-profitability |
| Cash Runway | Cash / Monthly Burn Rate | Survival timeline |
| Net Burn | Cash consumed per month net of revenue | Financial sustainability |

**Marketplace:**

| Metric | Definition | Why Boards Care |
|--------|-----------|-----------------|
| GMV | Gross Merchandise Value (total transaction volume) | Market activity |
| Take Rate | Revenue / GMV | Monetization efficiency |
| Active Buyers | Unique buyers in period | Demand-side health |
| Active Sellers | Unique sellers in period | Supply-side health |
| Liquidity | % of listings that transact | Marketplace efficiency |
| Repeat Rate | % of buyers who transact again | Demand stickiness |

**Consumer / Ad-Supported:**

| Metric | Definition | Why Boards Care |
|--------|-----------|-----------------|
| DAU / MAU | Daily / Monthly Active Users | Engagement scale |
| DAU/MAU Ratio | Daily engagement intensity | Habit strength |
| ARPU | Revenue per user (ad-driven) | Monetization |
| Retention (D1, D7, D30) | Cohort retention rates | Product-market fit |
| Time Spent | Average daily usage | Engagement depth |
| Organic % | % of new users from organic channels | Growth sustainability |

### Board Metric Presentation Format

Each board metric should be presented with:

```
┌─────────────────────────────────────────────────────────────────┐
│  ANNUAL RECURRING REVENUE                                       │
│                                                                 │
│  $14.2M        ▲ 42% YoY        Target: $15M        Status: 🟡│
│                                                                 │
│  Commentary: ARR growth decelerated from 48% in Q2 to 42% in  │
│  Q3, primarily due to elongated enterprise sales cycles. Net   │
│  new ARR of $1.1M was below the $1.4M target. Pipeline for Q4 │
│  is $4.2M (3.0x coverage), suggesting recovery is possible     │
│  but not certain.                                               │
│                                                                 │
│  [12-month trend chart with quarterly target markers]           │
│                                                                 │
│  Key drivers:                                                   │
│  • Enterprise deal cycle extended from 45 to 62 days           │
│  • SMB new business on target ($420K vs $400K plan)            │
│  • Expansion revenue strong: $380K (110% of plan)              │
│  • Churn improved: 0.8% monthly (down from 1.1%)              │
└─────────────────────────────────────────────────────────────────┘
```

**Required elements:**
1. Current value (large, prominent)
2. Year-over-year change (boards think in annual terms)
3. Target or plan comparison
4. Status indicator (green/yellow/red)
5. 2-3 sentence written commentary explaining the "why"
6. Trend visualization (12 months minimum)
7. Key drivers (3-4 bullets decomposing the headline number)

---

## Investor Metrics

### Monthly Investor Update

For venture-backed startups, the monthly investor update has become a standard communication format. It serves two purposes: keeping investors informed and building a relationship that will support future fundraising.

### Standard Monthly Update Structure

```
1. HEADLINES (Top of email — 30-second read)
   • MRR: $X (▲ Y% MoM)
   • Cash position: $X (Z months runway)
   • Key win: [One significant achievement]
   • Key challenge: [One significant obstacle]

2. FINANCIAL METRICS (Table format)
   | Metric        | This Month | Last Month | Plan | YTD    |
   |─────────────|────────────|────────────|──────|────────|
   | MRR          | $X         | $X         | $X   | -      |
   | New MRR      | $X         | $X         | $X   | $X     |
   | Churn MRR    | ($X)       | ($X)       | ($X) | ($X)   |
   | Net New MRR  | $X         | $X         | $X   | $X     |
   | Burn Rate    | ($X)       | ($X)       | ($X) | ($X)   |
   | Cash         | $X         | $X         | $X   | -      |

3. OPERATING METRICS
   • Customers: X (net new: +Y)
   • Pipeline: $X (X deals in stage 3+)
   • NRR: X%
   • Retention: X% D30 / X% D90

4. PRODUCT & TEAM
   • Key launches or milestones
   • Hiring: X positions filled, Y open
   • Notable customer feedback

5. ASKS
   • Specific help needed from investors
   • Introductions, expertise, signal boost
```

### Investor Metric Credibility Rules

**Rule 1: Consistency**
Use the same metric definitions every month. Changing definitions mid-stream destroys credibility. If a definition must change, explain why and restate historicals.

**Rule 2: Include the bad news**
Investors trust founders who report challenges alongside wins. Cherry-picking only positive metrics signals either naivety or dishonesty.

**Rule 3: Explain the variance**
When a metric misses plan, explain why. "MRR missed by $40K due to two enterprise deals slipping to next month" is information. "$1.2M MRR vs. $1.24M plan" without explanation is noise.

**Rule 4: Contextualize with plan**
Every metric should be compared to plan. Investors track plan variance to assess execution quality and forecasting ability.

---

## Executive Summary Design

### The Pyramid Principle (Minto, 1987)

Barbara Minto's Pyramid Principle is the gold standard for executive communication:

**Start with the answer.** Lead with the conclusion, recommendation, or key finding. Then provide supporting arguments. Then provide evidence for each argument.

```
ANSWER: "We should increase marketing spend by 20% in Q4,
         focused on paid search and content marketing."

SUPPORTING ARGUMENT 1: "Paid search shows 3.5x ROAS with
                        room to scale (not yet at diminishing returns)"
  Evidence: Channel efficiency data, saturation curve analysis

SUPPORTING ARGUMENT 2: "Content marketing has 6-month payback
                        but 5x LTV of paid channels"
  Evidence: Cohort LTV by channel, content engagement data

SUPPORTING ARGUMENT 3: "Competitors are pulling back on spend,
                        creating lower CPAs in our target segments"
  Evidence: Auction data, competitive intelligence
```

### Executive Summary Template

```
EXECUTIVE SUMMARY: [Report Title]
Date: [Period covered]
Author: [Name / Team]

KEY FINDINGS:
1. [Most important finding — lead with the "so what"]
2. [Second most important finding]
3. [Third most important finding]

RECOMMENDATIONS:
1. [Specific action with expected impact]
2. [Specific action with expected impact]

RISK ASSESSMENT:
• [Primary risk and mitigation approach]
• [Secondary risk and mitigation approach]

SUPPORTING DATA:
[Refer to specific dashboard, appendix, or detailed analysis]
```

---

## The Weekly Executive Review

### Meeting Structure (30 minutes)

```
Minutes 1-5:   SCOREBOARD
               Review the 5-8 primary KPIs
               Status: Green (on track) / Yellow (at risk) / Red (off track)

Minutes 5-15:  DEEP DIVE
               Focus on 1-2 metrics that are yellow or red
               Root cause analysis
               Actions being taken

Minutes 15-25: FORWARD LOOK
               Forecast for current quarter
               Risks to achieving plan
               Experiments in flight and expected results

Minutes 25-30: DECISIONS
               What decisions need to be made?
               Who owns each action?
               When is the next checkpoint?
```

### Pre-Read Distribution

Distribute the data report 24 hours before the meeting. The meeting itself should be for discussion and decisions, not data presentation. If executives are seeing data for the first time in the meeting, the meeting will be spent understanding data rather than making decisions.

---

## Quarterly Business Review (QBR)

### QBR Structure

```
Section 1: QUARTER IN REVIEW (10 minutes)
  • Performance against plan (all board metrics)
  • Quarter-over-quarter trends
  • Notable achievements and setbacks

Section 2: MARKET CONTEXT (5 minutes)
  • Competitive landscape changes
  • Market trends affecting the business
  • External factors (economic, regulatory)

Section 3: DEEP DIVES (20 minutes)
  • 2-3 analytical deep dives on critical topics
  • Root cause analyses for misses
  • Attribution analysis for wins

Section 4: NEXT QUARTER PLAN (10 minutes)
  • Targets and milestones
  • Key initiatives and expected impact
  • Resource allocation decisions needed

Section 5: RISKS AND MITIGATIONS (5 minutes)
  • Top 3-5 risks to achieving next quarter plan
  • Mitigation strategies for each risk
  • Leading indicators to monitor
```

---

## Executive Reporting Anti-Patterns

### Anti-Pattern 1: The Data Dump
60 slides of charts with no narrative thread. Executives do not need data — they need intelligence. Intelligence is data processed through analysis and presented with implications.

### Anti-Pattern 2: The Victory Lap
Only positive metrics are presented. Misses are buried in appendices or omitted. This destroys credibility faster than any other behavior. Present challenges prominently and with proposed solutions.

### Anti-Pattern 3: The Moving Goalposts
Changing metric definitions, comparison periods, or targets to make results look better. This is analytically dishonest and eventually gets caught.

### Anti-Pattern 4: No Recommendations
"Revenue is down 15%" without "...and here is what we should do about it." Executive reports that present problems without proposed solutions waste executive time.

### Anti-Pattern 5: Precision Theater
Reporting metrics to four decimal places when the underlying data has significant uncertainty. "$1,247,893.42 MRR" implies false precision. "$1.25M MRR" communicates the same information more honestly.

### Anti-Pattern 6: The Orphan Chart
Charts included because the data was available, not because anyone asked a question the chart answers. Every chart must connect to a decision or question.

---

## Communication Principles for Executives

### 1. Lead with the conclusion
Do not build up to the answer. State it first, then provide evidence.

### 2. Quantify everything
"Revenue is growing well" means nothing. "Revenue grew 23% QoQ, 5pp above plan" is information.

### 3. Compare, do not just report
"$1.2M MRR" is a number. "$1.2M MRR vs. $1.1M plan, up 42% YoY" is intelligence.

### 4. State uncertainty explicitly
"We expect Q4 revenue between $4.5M and $5.2M with 80% confidence" is more useful than "$4.85M expected."

### 5. Make recommendations specific and actionable
"We should invest more in content" is vague. "We should allocate $50K to content marketing in Q4, targeting the enterprise segment, with expected ROI of 3.5x within 6 months" is actionable.

---

**Executive reporting is not about impressing executives with data sophistication. It is about compressing complexity into actionable intelligence that respects their time and enables better decisions.**
