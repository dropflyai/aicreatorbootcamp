# Product Metrics

## What This Enables

A rigorous framework for measuring product success that goes beyond vanity metrics to capture genuine customer value creation and business impact. Without disciplined measurement, product teams operate on intuition — shipping features and hoping for the best. With the right metrics, teams can diagnose problems, validate hypotheses, and make evidence-based decisions about where to invest product development effort.

---

## The Core Insight

Not everything that can be measured matters, and not everything that matters can be easily measured. The art of product metrics is selecting the smallest set of measurements that accurately represent customer value and business health. As Goodhart's Law warns: "When a measure becomes a target, it ceases to be a good measure." The antidote is to use metric systems — interconnected sets of metrics with guardrails — rather than single metrics optimized in isolation.

---

## North Star Metric

### Definition

The North Star Metric (NSM) is the single metric that best captures the core value your product delivers to customers. It serves as the company-wide alignment mechanism — every team's work should ultimately improve the NSM.

### Criteria for a Strong NSM

| Criterion | Definition | Test |
|-----------|-----------|------|
| **Value-reflective** | Measures customer value received, not just company revenue | Does this metric increase when customers get more value? |
| **Leading** | Predicts future business success, not just past performance | If this metric improves, will revenue follow? |
| **Actionable** | Product teams can directly influence it | Can a feature change move this metric? |
| **Understandable** | Anyone in the company can explain it | Can a new hire understand what it means? |
| **Measurable** | Can be tracked accurately and frequently | Can we calculate this daily or weekly? |

### NSM Examples by Business Model

| Business Model | North Star Metric | Why |
|---------------|------------------|-----|
| Marketplace | Transactions completed per week | Reflects value exchange between buyers and sellers |
| SaaS B2B | Weekly Active Teams using core feature | Teams extracting value signals retention and expansion |
| Consumer subscription | Time spent in meaningful engagement | Engagement predicts retention (but must exclude empty calories) |
| E-commerce | Purchase frequency (orders per active customer per month) | Repeat purchases indicate product-market fit |
| Content platform | Content consumed per active user per week | Consumption reflects value delivery |
| Developer tools | Successful API calls per week | Developers integrating deeply indicates dependency |
| Communication | Messages sent per active user per day | Active communication indicates indispensable product |

### NSM Anti-Patterns

| Anti-Pattern | Why It Fails | Better Alternative |
|-------------|-------------|-------------------|
| Revenue as NSM | Lags behind product decisions by months; not customer-value-reflective | Use revenue as a business metric; NSM should be product-level |
| Registered users | Vanity metric — registration without activation is worthless | Active users performing the core action |
| Page views | Does not indicate value; can be inflated by confusion (users clicking around lost) | Task completion rate or engagement with value-producing features |
| NPS alone | Single survey metric with known biases; not real-time | Combine NPS with behavioral metrics |

### The NSM Ecosystem

A North Star Metric should be decomposed into input metrics that teams can directly influence:

```
NORTH STAR METRIC: Weekly Active Teams Using Core Feature
    │
    ├── INPUT 1: New team activation rate (% of new signups who complete core action)
    │   └── Sub-metrics: onboarding completion, first project creation, first invite sent
    │
    ├── INPUT 2: Feature adoption breadth (avg features used per active team)
    │   └── Sub-metrics: feature discovery rate, feature retention rate
    │
    ├── INPUT 3: Team expansion rate (avg users per active team)
    │   └── Sub-metrics: invite rate, invite acceptance rate
    │
    └── INPUT 4: Weekly return rate (% of last week's active teams who return this week)
        └── Sub-metrics: session frequency, workflow completion rate
```

---

## AARRR Pirate Metrics

### Origin

Dave McClure (500 Startups). The AARRR framework provides a lifecycle-based view of the customer journey:

### The Five Stages

```
ACQUISITION -> ACTIVATION -> RETENTION -> REVENUE -> REFERRAL

"How do       "Do they     "Do they    "Do they    "Do they
users find     have a       come back    pay us?"    tell others?"
us?"          great first   and keep
              experience?"  using it?"
```

| Stage | Definition | Key Metrics | Optimization Focus |
|-------|-----------|-------------|-------------------|
| **Acquisition** | Users discover and visit your product | Traffic by channel, signup rate, CAC | Channel efficiency, messaging, targeting |
| **Activation** | Users experience the core value for the first time | Onboarding completion, time to first key action, "aha moment" rate | Onboarding flow, first-use experience |
| **Retention** | Users return and continue using the product | Day 1/7/30 retention, WAU/MAU ratio, churn rate | Core loop strength, habit formation, engagement |
| **Revenue** | Users pay for the product | Conversion to paid, ARPU, LTV, expansion revenue | Pricing, packaging, upgrade triggers |
| **Referral** | Users recommend the product to others | Viral coefficient (k), referral rate, NPS | Sharing mechanics, referral programs, word-of-mouth triggers |

### AARRR Diagnostic

When a product is struggling, use AARRR to diagnose WHERE in the funnel the problem lies:

| Symptom | Likely AARRR Stage | Investigation |
|---------|-------------------|---------------|
| "We are not growing" | Acquisition or Activation | Are people finding us? Are they experiencing value? |
| "Users try it and leave" | Activation | Is the onboarding getting users to the "aha moment"? |
| "Users sign up but churn quickly" | Retention | Is the core loop strong? Is there a habit trigger? |
| "Users love it but we are not making money" | Revenue | Is pricing right? Is the upgrade trigger clear? |
| "Growth is linear, not exponential" | Referral | Are there viral loops or sharing mechanics? |

### The Aha Moment

The activation metric hinges on identifying the "aha moment" — the specific action that, once completed, predicts long-term retention.

| Product | Aha Moment | How Discovered |
|---------|-----------|----------------|
| Facebook (historical) | Adding 7 friends in 10 days | Cohort analysis: users who did this retained at 2x |
| Slack | Sending 2000 messages as a team | Usage data: teams above this threshold rarely churned |
| Dropbox | Placing first file in a shared folder | Retention analysis: this action predicted paid conversion |

**How to discover your aha moment:**
1. List all possible "first actions" users take
2. For each action, compare retention rates of users who did vs did not do the action
3. The action with the largest retention gap (done vs not done) is your aha moment candidate
4. Validate: can you causally influence this action? Does pushing users toward it actually improve retention?

---

## Metric Trees

### Definition

A metric tree (also called a metrics hierarchy or KPI tree) decomposes a high-level metric into its mathematical components, revealing the levers that drive it.

### Example: Revenue Metric Tree

```
MONTHLY RECURRING REVENUE (MRR)
│
├── New MRR
│   ├── New customers x Average starting MRR
│   │   ├── New signups x Trial-to-paid conversion rate x Avg plan price
│   │   │   ├── Signups by channel (organic, paid, referral)
│   │   │   ├── Conversion rate by plan tier
│   │   │   └── Plan mix (% basic, % pro, % enterprise)
│   │   └── Sales-assisted new MRR
│   │       ├── Qualified leads x Close rate x Deal size
│   │       └── Average sales cycle length
│   │
│   └── Expansion MRR
│       ├── Seat expansion (users added)
│       ├── Plan upgrades
│       └── Add-on purchases
│
├── Churned MRR (negative)
│   ├── Customer churn (accounts lost x their MRR)
│   └── Contraction (downgrades + seat removals)
│
└── Net New MRR = New MRR + Expansion MRR - Churned MRR
```

### Why Metric Trees Matter

1. **Diagnosis:** When MRR dips, the tree reveals whether it is an acquisition problem, conversion problem, churn problem, or expansion problem
2. **Leverage identification:** Some nodes in the tree are more moveable than others — focus effort on high-leverage nodes
3. **Team alignment:** Different teams own different branches of the tree
4. **Goal setting:** OKRs can target specific nodes with appropriate targets

---

## DAU/WAU/MAU and Engagement Ratios

### Definitions

| Metric | Definition | Typical Calculation |
|--------|-----------|-------------------|
| **DAU** | Daily Active Users | Unique users who performed a qualifying action in the last 24 hours |
| **WAU** | Weekly Active Users | Unique users who performed a qualifying action in the last 7 days |
| **MAU** | Monthly Active Users | Unique users who performed a qualifying action in the last 30 days |

### The Critical Question: What Counts as "Active"?

The definition of "active" determines whether your engagement metrics are meaningful or vanity:

| Definition | Quality | Example |
|-----------|---------|---------|
| Visited the website | Low — includes accidental visits | Anyone who loaded any page |
| Logged in | Medium — shows intent but not value | Anyone who authenticated |
| Performed core action | High — indicates value received | User who created or edited a document |

**Rule:** Define "active" as performing the action that delivers core product value. Logging in is not value delivery.

### Engagement Ratios

| Ratio | Formula | Interpretation | Benchmark |
|-------|---------|---------------|-----------|
| DAU/MAU | Daily Active / Monthly Active | What fraction of monthly users use it daily? | >25% is strong for consumer; >40% exceptional |
| WAU/MAU | Weekly Active / Monthly Active | What fraction of monthly users use it weekly? | >60% is healthy for B2B SaaS |
| DAU/WAU | Daily Active / Weekly Active | How daily is the weekly habit? | Higher is better; indicates daily utility |

### Stickiness and Engagement Matrix

```
HIGH FREQUENCY          LOW FREQUENCY
HIGH BREADTH            HIGH BREADTH
(Power users)           (Periodic deep users)

HIGH FREQUENCY          LOW FREQUENCY
LOW BREADTH             LOW BREADTH
(Routine users)         (At-risk users)
```

---

## Retention Curves

### Definition

A retention curve plots the percentage of a cohort (users who signed up in the same period) who are still active after N days/weeks/months.

### Reading Retention Curves

```
% Retained
100% ─┐
      │╲
      │ ╲
      │  ╲           Good: Curve flattens (asymptotic retention)
      │   ╲_____________________________
      │
      │╲
      │ ╲
      │  ╲
      │   ╲
      │    ╲         Bad: Curve approaches zero (everyone churns)
      │     ╲
      │      ╲___
      └──────────────────────────────── Time (days/weeks/months)
```

### Retention Benchmarks

| Product Type | Day 1 | Day 7 | Day 30 | Day 90 |
|-------------|-------|-------|--------|--------|
| Top consumer apps | 40-50% | 25-35% | 15-25% | 10-15% |
| Average consumer apps | 25-35% | 10-15% | 5-10% | 2-5% |
| B2B SaaS | 70-80% | 60-70% | 50-60% | 40-50% |
| Enterprise SaaS | 90-95% | 85-90% | 80-85% | 75-80% |

### Retention Analysis Techniques

| Technique | What It Reveals |
|-----------|----------------|
| **Cohort comparison** | Are newer cohorts retaining better than older ones? (product improving?) |
| **Segment comparison** | Which segments retain best? (who is your best customer?) |
| **Feature correlation** | Which features correlate with higher retention? (what to invest in?) |
| **Retention by activation** | Do users who complete onboarding retain better? (onboarding effective?) |
| **Unbounded retention** | Of all users who ever signed up, what % are active today? (overall health) |

---

## Guardrail Metrics

### Definition

Guardrail metrics are the metrics that must NOT degrade while you optimize the primary metric. They prevent the perverse incentives of single-metric optimization.

### Examples

| Primary Metric | Guardrail Metric | Why |
|---------------|-----------------|-----|
| Signup rate | Activation rate | Do not inflate signups with low-intent traffic |
| Revenue per user | Retention rate | Do not increase monetization at the cost of churn |
| Feature adoption | Customer satisfaction (CSAT) | Do not force adoption through annoying nudges |
| Page views | Time on task | Do not create confusing navigation that inflates clicks |
| Support ticket resolution time | Resolution quality (re-open rate) | Do not close tickets prematurely |

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Vanity metrics | Dashboard shows impressive numbers that do not predict business health | Measuring easy things, not important things | Use the NSM + AARRR framework; define "active" rigorously |
| Metric fixation | Team optimizes a number without understanding context | Goodhart's Law — measure becomes target | Use guardrail metrics; combine quant with qualitative |
| Data without insight | Dashboards exist but do not inform decisions | Data collected without decision framework | For every metric, define: what decision does this inform? |
| Metric overload | 50+ metrics tracked; no one knows which matter | No metric hierarchy | Build a metric tree; limit dashboards to 5-7 key metrics |
| Lagging focus | Only measuring outcomes (revenue, churn) without leading indicators | Missing the NSM and input metrics layer | Build the NSM ecosystem with input metrics |

---

## The Operator's Framework

When designing product metrics:

1. **Define your North Star Metric** — the single metric that best captures customer value delivery
2. **Decompose into input metrics** — 3-5 metrics that directly feed the NSM and that teams can influence
3. **Map the AARRR funnel** — understand where in the customer lifecycle value is created and lost
4. **Build metric trees** — decompose business metrics into their mathematical components to find leverage
5. **Define retention curves** — track cohort retention to assess product-market fit and improvement over time
6. **Set guardrail metrics** — for every primary metric, define what must not degrade
7. **Review weekly** — metrics without review cadence are metrics without impact

---

## Summary

Product metrics are the instrumentation of customer value creation. The North Star Metric aligns the organization around a single measure of core value delivery, decomposed into input metrics that individual teams can influence. The AARRR framework diagnoses where in the customer lifecycle value is being lost. Metric trees reveal the mathematical levers driving business outcomes. DAU/WAU/MAU ratios measure engagement stickiness, but only when "active" is defined as performing the core value action. Retention curves are the most honest assessment of product-market fit — a curve that flattens indicates sustainable value delivery; a curve that approaches zero indicates a product that fails to retain. Guardrail metrics prevent the perverse optimization of single metrics at the expense of overall product health. The goal is not to measure everything — it is to measure the right things and use those measurements to make better product decisions.
