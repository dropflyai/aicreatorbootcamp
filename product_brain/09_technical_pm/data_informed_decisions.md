# Data-Informed Decisions

## What This Enables

The analytical literacy and operational practices that transform raw data into product decisions. Data-informed decision-making is not data-driven decision-making — a critical distinction. Data-driven implies the data decides; data-informed means the PM uses data as one input alongside customer context, strategic judgment, and domain expertise. This module provides the SQL literacy, dashboard design principles, and investigative methodology that every product manager needs to navigate a world of dashboards, metrics, and analytical claims.

---

## The Core Insight

The goal is not to have more data. It is to make better decisions faster. Most product organizations suffer from one of two failure modes: decisions made without data (intuition-only) or decisions paralyzed by data (analysis-paralysis). The data-informed PM uses data to reduce uncertainty about a specific decision, then acts. The quality of a data-informed culture is measured not by the number of dashboards but by the number of decisions that data visibly influenced.

DJ Patil and Hilary Mason (Data Driven, 2015): "The purpose of data is to provide the context for making decisions."

---

## Data Literacy for Product Managers

### What PMs Must Understand

| Concept | Why It Matters | Minimum Competency |
|---------|---------------|-------------------|
| **Descriptive statistics** | Summarize data (mean, median, distribution) | Can interpret a histogram and identify skew |
| **Correlation vs causation** | Avoid false conclusions from observational data | Can explain why correlated metrics are not necessarily causal |
| **Statistical significance** | Know when a result is real vs noise | Can read a p-value and confidence interval |
| **Selection bias** | Understand when a sample is not representative | Can identify when data is missing non-random subsets |
| **Simpson's paradox** | Aggregated data can reverse when segmented | Can recognize when segment-level analysis contradicts aggregate |
| **Survivorship bias** | Analyzing only survivors misses the full picture | Can identify when churned users are excluded from analysis |
| **Regression to the mean** | Extreme values naturally moderate over time | Can distinguish regression from real improvement |
| **Cohort effects** | Different cohorts may behave differently | Can segment data by cohort before drawing conclusions |

### Data Interpretation Pitfalls

| Pitfall | Description | Example | Protection |
|---------|-------------|---------|------------|
| **Cherry-picking** | Selecting data that supports a predetermined conclusion | Showing only the segment where the metric improved | Pre-declare analysis plan; show all segments |
| **Vanity metrics** | Measuring impressive but meaningless numbers | "10M page views" (but 80% are bot traffic) | Use metrics tied to customer value |
| **Metric gaming** | Optimizing the metric without improving the underlying reality | Reducing "average resolution time" by auto-closing tickets | Use guardrail metrics; triangulate with qualitative data |
| **Temporal bias** | Comparing time periods with different context | Q4 vs Q1 comparison ignoring holiday effects | Compare same periods year-over-year; control for seasonality |
| **Denominator games** | Changing the denominator to improve a rate | "Active user" redefined to exclude inactive users | Lock metric definitions; document changes |

---

## SQL for Product Managers

### Why PMs Should Know SQL

SQL is the lingua franca of data. A PM who can write SQL can:
- Answer their own questions without waiting for analysts
- Verify claims made by others ("trust but verify")
- Explore data to find patterns and generate hypotheses
- Build quick analyses during discovery

### Essential SQL Patterns for PMs

**Pattern 1: Funnel Conversion**

```sql
-- Onboarding funnel conversion rates
SELECT
  COUNT(DISTINCT CASE WHEN step = 'signup' THEN user_id END) AS signups,
  COUNT(DISTINCT CASE WHEN step = 'email_verified' THEN user_id END) AS verified,
  COUNT(DISTINCT CASE WHEN step = 'profile_completed' THEN user_id END) AS profiled,
  COUNT(DISTINCT CASE WHEN step = 'first_action' THEN user_id END) AS activated,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN step = 'first_action' THEN user_id END)
    / NULLIF(COUNT(DISTINCT CASE WHEN step = 'signup' THEN user_id END), 0), 1)
    AS activation_rate_pct
FROM onboarding_events
WHERE event_date >= CURRENT_DATE - INTERVAL '30 days';
```

**Pattern 2: Cohort Retention**

```sql
-- Weekly retention by signup cohort
SELECT
  DATE_TRUNC('week', u.created_at) AS cohort_week,
  FLOOR(EXTRACT(EPOCH FROM (e.event_date - u.created_at)) / 604800) AS weeks_since_signup,
  COUNT(DISTINCT e.user_id) AS active_users,
  COUNT(DISTINCT e.user_id)::float
    / NULLIF(COUNT(DISTINCT u.user_id), 0) AS retention_rate
FROM users u
LEFT JOIN events e ON u.user_id = e.user_id
  AND e.event_name = 'core_action'
GROUP BY 1, 2
ORDER BY 1, 2;
```

**Pattern 3: Feature Adoption**

```sql
-- Feature adoption rate and engagement
SELECT
  feature_name,
  COUNT(DISTINCT user_id) AS unique_users,
  COUNT(*) AS total_uses,
  COUNT(*)::float / NULLIF(COUNT(DISTINCT user_id), 0) AS uses_per_user,
  ROUND(100.0 * COUNT(DISTINCT user_id)
    / (SELECT COUNT(DISTINCT user_id) FROM active_users), 1)
    AS adoption_rate_pct
FROM feature_usage_events
WHERE event_date >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY 1
ORDER BY adoption_rate_pct DESC;
```

**Pattern 4: Metric Trend**

```sql
-- Weekly trend of key metric with week-over-week change
WITH weekly AS (
  SELECT
    DATE_TRUNC('week', event_date) AS week,
    COUNT(DISTINCT user_id) AS active_users
  FROM events
  WHERE event_name = 'core_action'
    AND event_date >= CURRENT_DATE - INTERVAL '12 weeks'
  GROUP BY 1
)
SELECT
  week,
  active_users,
  LAG(active_users) OVER (ORDER BY week) AS prev_week,
  ROUND(100.0 * (active_users - LAG(active_users) OVER (ORDER BY week))
    / NULLIF(LAG(active_users) OVER (ORDER BY week), 0), 1) AS wow_change_pct
FROM weekly
ORDER BY week;
```

**Pattern 5: Segmented Analysis**

```sql
-- Retention by customer segment
SELECT
  u.plan_type,
  u.company_size_bucket,
  COUNT(DISTINCT u.user_id) AS total_users,
  COUNT(DISTINCT CASE WHEN e.event_date >= CURRENT_DATE - INTERVAL '30 days'
    THEN e.user_id END) AS active_last_30d,
  ROUND(100.0 * COUNT(DISTINCT CASE WHEN e.event_date >= CURRENT_DATE - INTERVAL '30 days'
    THEN e.user_id END) / NULLIF(COUNT(DISTINCT u.user_id), 0), 1) AS retention_pct
FROM users u
LEFT JOIN events e ON u.user_id = e.user_id AND e.event_name = 'core_action'
WHERE u.created_at < CURRENT_DATE - INTERVAL '90 days'
GROUP BY 1, 2
ORDER BY retention_pct DESC;
```

---

## Dashboard Design

### Dashboard Design Principles

| Principle | Description | Anti-Pattern |
|-----------|-------------|-------------|
| **Decision-oriented** | Every dashboard exists to inform a specific decision | Dashboard has 50 metrics with no clear purpose |
| **Hierarchical** | Start with summary; drill down to detail | All metrics at the same level of detail |
| **Comparative** | Show current vs benchmark (last period, target, plan) | Absolute numbers without context |
| **Timely** | Data refresh matches decision cadence | Dashboard refreshes weekly but decisions are daily |
| **Scannable** | Key information visible at a glance | Requires 5 minutes of study to understand |
| **Actionable** | Anomalies are visible and suggest investigation | Numbers displayed but no alerts or thresholds |

### Dashboard Hierarchy

```
LEVEL 1: EXECUTIVE DASHBOARD (weekly review)
├── North Star Metric + trend
├── AARRR funnel summary
├── Revenue metrics (MRR, NRR, churn)
├── Key alerts (red/yellow/green)
└── Strategic OKR progress

LEVEL 2: PRODUCT HEALTH DASHBOARD (daily check)
├── Acquisition: signups, sources, cost
├── Activation: onboarding funnel, aha moment rate
├── Engagement: DAU/WAU/MAU, session metrics
├── Retention: cohort curves, churn rate
├── Revenue: conversion, ARPU, expansion
└── Feature adoption: new features, usage trends

LEVEL 3: FEATURE DASHBOARDS (per feature/squad)
├── Feature-specific adoption and retention
├── Feature-specific funnel
├── Error rates and performance
├── User feedback summary
└── Experiment results
```

### Dashboard Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Wall of numbers | Too many metrics, no hierarchy | Limit to 5-7 key metrics per dashboard |
| No comparison | Current value without context | Always show vs last period, target, or benchmark |
| Vanity front page | Dashboard leads with total users (ever) | Lead with active users and trend |
| Stale dashboards | Data is days or weeks old | Match refresh to decision cadence |
| No ownership | Nobody responsible for dashboard accuracy | Assign an owner who verifies data quality monthly |

---

## Metric Anomaly Investigation

### The Investigation Framework

When a metric changes unexpectedly (up or down), use this systematic investigation:

```
ANOMALY INVESTIGATION PROTOCOL

Step 1: VERIFY
  - Is the data correct? (Check for tracking bugs, data pipeline issues)
  - Is the metric definition unchanged? (No denominator changes)
  - Is the time period comparable? (No holidays, outages, seasonal effects)

Step 2: SCOPE
  - When did the change start? (Pinpoint the inflection)
  - How large is the change? (Absolute and percentage)
  - Is it a gradual trend or a sudden shift?

Step 3: SEGMENT
  - Is the change across all segments or concentrated?
  - Check by: geography, platform, plan type, cohort, acquisition channel
  - The segment where the change is concentrated reveals the cause

Step 4: CORRELATE
  - What else changed at the same time?
  - Product changes: features launched, flags toggled, bugs fixed
  - External events: competitor moves, market events, seasonal factors
  - Internal changes: marketing campaigns, pricing changes, team changes

Step 5: HYPOTHESIZE
  - Based on segmentation and correlation, form 2-3 hypotheses
  - Each hypothesis should be testable with available data

Step 6: TEST
  - Query data to validate or invalidate each hypothesis
  - The hypothesis that best explains the segmented data is likely correct

Step 7: ACT
  - If the change is positive: understand and amplify
  - If the change is negative: diagnose and fix
  - If uncertain: monitor for another period before acting

Step 8: DOCUMENT
  - Record the anomaly, investigation, finding, and action in a log
  - This builds institutional knowledge for future investigations
```

### Common Anomaly Causes

| Cause Category | Examples | How to Detect |
|---------------|----------|---------------|
| **Product changes** | Feature launch, bug, config change | Correlate with deployment timeline |
| **Tracking changes** | New events, broken events, SDK update | Check event volumes for discontinuities |
| **Seasonality** | Holiday, end of quarter, school year | Compare year-over-year |
| **Marketing** | Campaign launch/end, viral content | Check acquisition channel mix |
| **External** | Competitor change, press coverage, outage | Monitor external signals |
| **Data quality** | Pipeline delay, duplicate events, missing data | Check data freshness and completeness |

---

## Data-Informed Decision Framework

### When to Use Data vs Judgment

| Situation | Use Data | Use Judgment |
|-----------|----------|-------------|
| Optimization of existing experience | Yes — A/B test to find the better variant | For the initial hypothesis |
| Strategic direction | As input, not as the decision | Yes — strategy requires vision beyond data |
| New market entry | Market sizing, trend data | Yes — data on a non-existent market is limited |
| Customer requests | Frequency and segment analysis | Yes — customers are experts on problems, not solutions |
| Technical architecture | Performance benchmarks, capacity projections | Yes — architecture decisions involve judgment about future state |
| Pricing decisions | Willingness-to-pay research, competitor analysis | Yes — pricing is strategic, not purely analytical |

### The Data-Informed Decision Template

```
DECISION: [What decision are we making?]

HYPOTHESIS: [What do we believe and why?]

DATA INPUTS:
1. [Data point 1] — Source: [where] — Confidence: [high/medium/low]
2. [Data point 2] — Source: [where] — Confidence: [high/medium/low]
3. [Data point 3] — Source: [where] — Confidence: [high/medium/low]

QUALITATIVE INPUTS:
1. [Customer interview insight]
2. [Expert opinion]
3. [Strategic consideration]

DATA GAPS: [What data would we want but do not have?]

ANALYSIS: [How the data and qualitative inputs inform the decision]

RECOMMENDATION: [What we should do, and why]

REVERSIBILITY: [Is this a one-way or two-way door?]

MONITORING PLAN: [How we will know if the decision was correct]
```

---

## Building an Analytics Culture

### The Analytics Maturity Model

| Level | Characteristics | PM Behavior |
|-------|----------------|-------------|
| **Level 0: No data** | No tracking, no analytics | Decisions based on intuition and stakeholder opinion |
| **Level 1: Reporting** | Basic dashboards, event tracking | PM reviews reports; asks analysts for answers |
| **Level 2: Analysis** | Funnel analysis, cohort analysis, segmentation | PM asks questions; works with analyst to investigate |
| **Level 3: Self-serve** | PM can query data directly; well-designed dashboards | PM answers own questions; uses data in every decision |
| **Level 4: Predictive** | ML models, predictive analytics, automated insights | PM uses predictions to prioritize; proactive anomaly detection |
| **Level 5: Prescriptive** | System recommends actions based on data | PM reviews recommendations and applies strategic judgment |

### Accelerating Analytics Maturity

| From Level | To Level | Key Actions |
|-----------|----------|-------------|
| 0 -> 1 | Implement basic event tracking; build first dashboards | Choose analytics tool; instrument top 20 events |
| 1 -> 2 | Build funnel and cohort analysis capabilities | Hire or embed analyst; build key funnels |
| 2 -> 3 | Enable PM self-service; improve data quality | PM SQL training; self-serve BI tool; data catalog |
| 3 -> 4 | Add predictive models; automated anomaly detection | Data science capability; alerting infrastructure |
| 4 -> 5 | Build recommendation systems; automated decisions | Advanced ML; feedback loops; human-in-the-loop |

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Data worship | Every decision requires weeks of analysis | Fear of making mistakes; risk aversion | Define "good enough" evidence thresholds per decision type |
| HiPPO override | Data presented then ignored in favor of opinion | Leadership does not value data | Make data visible; track prediction accuracy |
| Metric fishing | Searching through metrics until a favorable one is found | Confirmation bias; no pre-registered metrics | Pre-declare metrics before analysis |
| Dashboard coma | Dozens of dashboards, no decisions changed | Dashboards not tied to decisions | For every dashboard, require: "what decision does this support?" |
| Analyst bottleneck | PM waits weeks for analyst to answer a question | PM cannot self-serve; analyst overloaded | SQL training for PMs; self-serve BI tools |

---

## The Operator's Framework

When making data-informed decisions:

1. **Start with the decision** — what are you trying to decide? Define this before touching data.
2. **Identify what data matters** — which metrics would change your decision?
3. **Check data quality** — is the data accurate, complete, and current?
4. **Analyze with discipline** — pre-declare hypotheses; segment before concluding; check for bias
5. **Investigate anomalies systematically** — verify, scope, segment, correlate, hypothesize, test
6. **Combine data with judgment** — data informs; it does not decide
7. **Document and share** — decisions, rationale, and outcomes build institutional learning

---

## Summary

Data-informed decision-making is the practice of using data as one input — alongside customer context, strategic judgment, and domain expertise — to make better product decisions. Data literacy requires understanding descriptive statistics, correlation vs causation, statistical significance, and common biases (survivorship, selection, Simpson's paradox). SQL fluency enables PMs to answer their own questions, verify claims, and explore data independently. Well-designed dashboards are decision-oriented, hierarchical, comparative, and scannable. Metric anomaly investigation follows a systematic protocol: verify, scope, segment, correlate, hypothesize, test, act, and document. The data-informed PM is neither data-worshipping (paralyzed by analysis) nor data-ignoring (relying on intuition) — they use data to reduce uncertainty about specific decisions and then act with confidence.
