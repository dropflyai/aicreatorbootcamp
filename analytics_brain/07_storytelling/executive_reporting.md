# Executive Reporting — Board-Level Analytics and Decision Support

## The Executive Reporting Imperative

Executive reporting translates operational data into strategic intelligence for C-suite and board-level audiences. The failure mode is not insufficient data — it is insufficient synthesis. Executives are drowning in dashboards and starving for insight. Effective executive reporting distills complexity into clarity, presents metrics in the context of strategy, and provides the analytical foundation for the highest-stakes decisions in the organization.

---

## 1. Board-Level Analytics

### What the Board Needs (and Does Not Need)

| Board Needs | Board Does Not Need |
|-------------|-------------------|
| 5-10 key metrics with trends | 50-metric dashboards |
| Context: vs. plan, vs. prior period, vs. benchmark | Raw numbers without context |
| Variance explanation (why the miss or beat) | Data without analysis |
| Forward-looking projections | Only backward-looking actuals |
| Strategic implications | Operational granularity |
| Recommendations | Options without a recommendation |
| Confidence intervals | False precision |

### Board Reporting Cadence

| Report | Frequency | Content | Delivery |
|--------|-----------|---------|----------|
| Board deck | Quarterly (at board meeting) | Full financial and strategic review | Distributed 48 hours before meeting |
| Flash report | Monthly | Key metrics snapshot (1 page) | Email, first business day of month |
| Alert | Ad hoc | Material events requiring immediate attention | Phone + email within 24 hours |
| Annual plan | Annually | Budget, targets, strategic priorities | Board meeting at fiscal year start |

---

## 2. The One-Page Dashboard

### Why One Page

A one-page executive dashboard forces prioritization. If you cannot fit the most important information on a single page, you have not yet done the analytical work of determining what is most important.

### One-Page Dashboard Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  HEADLINE: [Key insight or status statement]                  │
│  Period: [Month/Quarter Year]                                │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│  REVENUE     │  GROWTH      │  EFFICIENCY  │  HEALTH         │
│              │              │              │                 │
│  ARR: $X.XM  │  MoM: X%     │  Burn: $XK   │  NPS: XX       │
│  vs Plan:+X% │  YoY: X%     │  Runway: XXmo│  Churn: X.X%   │
│  ▲ ▼ ─       │  ▲ ▼ ─       │  ▲ ▼ ─       │  ▲ ▼ ─         │
├──────────────┴──────────────┴──────────────┴─────────────────┤
│  KEY METRIC TRENDS (4-6 sparklines or small multiples)       │
│                                                              │
│  [Revenue]  [Customers]  [NRR]  [CAC]  [Burn]  [Pipeline]   │
│   ────/──   ────/──      ───── ──────  ──\───  ────/──      │
├──────────────────────────────────────────────────────────────┤
│  VARIANCE COMMENTARY                                         │
│  · Revenue +8% vs plan: Enterprise deal pulled forward       │
│  · Churn 1.2% vs 2.0% target: Improved onboarding impact    │
│  · Burn +12% vs plan: Accelerated engineering hiring          │
├──────────────────────────────────────────────────────────────┤
│  STRATEGIC PRIORITIES STATUS                                  │
│  1. [Priority]: 🟢 On Track / 🟡 At Risk / 🔴 Off Track     │
│  2. [Priority]: 🟢 / 🟡 / 🔴                                │
│  3. [Priority]: 🟢 / 🟡 / 🔴                                │
├──────────────────────────────────────────────────────────────┤
│  FORWARD LOOK                                                │
│  · Next quarter forecast: $X.XM (X% confidence)              │
│  · Key risks: [1-2 risks that could impact forecast]         │
│  · Key opportunities: [1-2 upside opportunities]             │
└──────────────────────────────────────────────────────────────┘
```

---

## 3. Metric Trees

### The Metric Tree as Strategic Map

A metric tree decomposes a top-level business metric into its component drivers, revealing which levers most influence the outcome:

```
Revenue ($)
├── New Revenue
│   ├── New Customers (#)
│   │   ├── Leads Generated (#)
│   │   ├── Lead-to-Opportunity Conversion (%)
│   │   ├── Opportunity-to-Close Conversion (%)
│   │   └── Average Sales Cycle (days)
│   └── Average Contract Value ($)
│       ├── Price per Seat ($)
│       ├── Seats per Customer (#)
│       └── Tier Mix (% Enterprise vs. SMB)
├── Expansion Revenue
│   ├── Net Revenue Retention (%)
│   ├── Upsell Rate (%)
│   └── Cross-sell Rate (%)
└── Churned Revenue (negative)
    ├── Gross Churn Rate (%)
    ├── Churn by Segment
    └── Churn by Cohort
```

### Using Metric Trees in Executive Reporting

| Level | Audience | Use |
|-------|----------|-----|
| Level 1 (top) | Board | "Revenue is $4.2M, up 15% QoQ" |
| Level 2 | C-Suite | "Growth driven by new customers (+22%) offset by churn increase (+3%)" |
| Level 3 | VP/Director | "New customer growth driven by 35% improvement in lead-to-opportunity conversion" |
| Level 4 | Manager/IC | "Conversion improved because of new qualification framework in SDR team" |

---

## 4. Variance Commentary

### The Variance Analysis Framework

Every metric in the executive report should include variance analysis when the actual deviates materially from plan or prior period.

**Variance Commentary Structure:**
```
[Metric] was [actual] vs. [plan/prior], a [favorable/unfavorable] variance of [amount, %].

Primary driver: [Explain the largest contributing factor]
Secondary driver: [If applicable]
Action taken: [What we are doing about it]
Expected resolution: [When we expect the metric to return to plan]
```

**Materiality Thresholds:**

| Metric Type | Commentary Required If |
|-------------|----------------------|
| Revenue | >5% variance vs. plan |
| Expenses | >10% variance vs. budget |
| Customer metrics | >10% variance vs. prior period |
| Cash/burn | >15% variance vs. plan |
| Growth rates | >3 percentage points vs. target |

### Red/Yellow/Green Status Framework

| Status | Criteria | Action Required |
|--------|----------|----------------|
| Green | Within 5% of plan; trend positive | Continue current approach |
| Yellow | 5-15% off plan; or trend deteriorating | Monitor closely; corrective action planned |
| Red | >15% off plan; or trend materially negative | Immediate corrective action; escalate to leadership |

---

## 5. Reporting Cadence Design

### Cadence by Audience

| Audience | Cadence | Format | Content Depth | Delivery |
|----------|---------|--------|--------------|----------|
| Board | Quarterly + ad hoc | Deck + 1-page | Strategic | 48hr pre-read + meeting |
| CEO | Weekly | Email/dashboard | Operational | Monday morning |
| C-Suite | Weekly/Monthly | 1-page + dashboard | Operational | Weekly meeting |
| VP/Director | Weekly | Dashboard + standup | Tactical | Dashboard + team meeting |
| All-hands | Monthly/Quarterly | Presentation | Company-level | All-hands meeting |
| Investors | Monthly | Email update | Curated | investor_update_template.md |

### Self-Serve vs. Curated Reporting

| Approach | Description | Best For | Risk |
|----------|-------------|----------|------|
| Self-serve (dashboards) | Users explore data themselves | Analysts, data-savvy users, exploratory questions | Misinterpretation, analysis paralysis |
| Curated (reports) | Analyst builds narrative around key findings | Executives, cross-functional audiences, decisions | Bottleneck on analyst time |
| Hybrid | Self-serve dashboards with curated narrative layer | Most organizations | Requires both infrastructure and analyst capability |

**Recommendation:** Executive audiences should receive curated reports. Self-serve dashboards complement but do not replace curated insight.

---

## 6. The Executive Reporting Operating Model

### Roles and Responsibilities

| Role | Responsibility |
|------|---------------|
| Analytics Lead | Defines metrics, builds dashboards, performs analysis |
| FP&A / Finance | Financial reporting, budget variance, forecasting |
| Department Heads | Provide context and action plans for their metrics |
| Chief of Staff / Ops | Coordinates reporting cadence, ensures quality and timeliness |
| CEO | Reviews, adds strategic context, presents to board |

### The Monthly Close-to-Report Timeline

| Day | Activity | Owner |
|-----|----------|-------|
| Month end + 3 | Financial close complete | Finance |
| Month end + 5 | Operating metrics finalized | Analytics |
| Month end + 7 | Department commentary collected | Department Heads |
| Month end + 8 | Executive report drafted | Analytics + FP&A |
| Month end + 9 | CEO review and approval | CEO |
| Month end + 10 | Report distributed | Analytics |

### Quality Standards for Executive Reports

| Standard | Specification |
|----------|--------------|
| Accuracy | All numbers reconciled to source of truth; no rounding errors |
| Consistency | Same metrics defined the same way across all reports |
| Timeliness | Distributed on schedule, every period, without exception |
| Completeness | All required sections populated; no gaps |
| Clarity | Non-technical language; insight-driven titles; clean design |
| Actionability | Every section includes "so what" and recommended action |

---

## 7. Common Executive Reporting Anti-Patterns

| Anti-Pattern | Problem | Solution |
|-------------|---------|---------|
| "Data dump" reporting | 50 pages of charts with no narrative | Limit to 1 page + appendix; lead with insight |
| Vanity metrics | Metrics that always go up but do not reflect business health | Report metrics that correlate with business outcomes |
| Inconsistent definitions | "Revenue" means different things in different reports | Canonical metric definitions in analytics glossary |
| Beautiful but late | Report arrives after the decision window | Timeliness > perfection; ship on schedule |
| All green, all the time | Report never shows problems; loses credibility | Calibrate RAG thresholds realistically |
| No forward look | Only shows what happened, not what will happen | Include forecast, risks, and opportunities |
| Different number in every report | Board deck says $4.2M; email says $4.1M | Single source of truth; reconciliation before distribution |

---

## References

- Nussbaumer Knaflic, C. (2015). *Storytelling with Data*. Wiley.
- Few, S. (2006). *Information Dashboard Design*. Analytics Press.
- Minto, B. (2009). *The Pyramid Principle* (3rd ed.). Pearson.
- Davenport, T. & Kim, J. (2013). *Keeping Up with the Quants*. Harvard Business Review Press.
- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
