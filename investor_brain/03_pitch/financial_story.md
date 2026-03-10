# Financial Story -- Unit Economics, Growth Trajectory, and Path to Profitability

## Overview

The financial story translates business performance into investor language. It is not
accounting -- it is the narrative of how capital creates value, how unit economics
compound, and how the business reaches sustainable profitability at venture scale.
This module covers the construction of investor-grade financial narratives, metrics
presentation, and scenario modeling.

Primary references: a16z "16 Startup Metrics", Bill Gurley on unit economics,
David Sacks on burn multiple, YC financial modeling guidance, HBS Note on Financial
Analysis for Startups.

---

## Unit Economics Framework

### The Core Unit Economics Stack

```
UNIT ECONOMICS HIERARCHY

Revenue Per Unit:
  ARPU (Average Revenue Per User/Account)
  ACV (Annual Contract Value)
  ARPA (Average Revenue Per Account)

Cost to Acquire:
  CAC (Customer Acquisition Cost)
  Blended CAC (paid + organic)
  Paid CAC (paid channels only)

Value Over Lifetime:
  LTV (Lifetime Value)
  Gross LTV (before cost of service)
  Net LTV (after cost of service)

Efficiency Ratios:
  LTV/CAC (must be > 3x for sustainable growth)
  Payback Period (months to recover CAC)
  Burn Multiple (net burn / net new ARR)

FUNDAMENTAL FORMULAS:

CAC = Total Sales & Marketing Spend / New Customers Acquired

LTV = ARPU * Gross Margin / Churn Rate (monthly)
LTV = ARPU * Gross Margin * Average Customer Lifetime

Payback Period = CAC / (Monthly ARPU * Gross Margin)

LTV/CAC = LTV / CAC

Burn Multiple = Net Burn / Net New ARR
```

### Unit Economics by Business Model

```
SAAS UNIT ECONOMICS:

Customer Level:
  Monthly ARPU: $200
  Gross Margin: 80%
  Monthly Churn: 2%
  Net Revenue Retention: 115%

Derived Metrics:
  LTV = $200 * 0.80 / 0.02 = $8,000
  CAC = $2,000 (blended)
  LTV/CAC = 4.0x ✓ (target: > 3x)
  Payback = $2,000 / ($200 * 0.80) = 12.5 months

With Expansion Revenue:
  Adjusted LTV = LTV * (NRR / (1 - gross churn))
  If NRR = 115% and gross churn = 5%/month...
  Expansion dramatically increases LTV

MARKETPLACE UNIT ECONOMICS:

  GMV per Transaction: $100
  Take Rate: 15%
  Revenue per Transaction: $15
  Transactions per Buyer per Month: 3
  Monthly Revenue per Buyer: $45
  Buyer CAC: $30
  Buyer Payback: < 1 month ✓

  Supply-Side:
  Revenue per Seller per Month: $500
  Seller CAC: $200
  Seller LTV: $6,000
  Seller LTV/CAC: 30x ✓

CONSUMER SUBSCRIPTION:

  Monthly ARPU: $10
  Gross Margin: 85%
  Monthly Churn: 5%
  LTV: $10 * 0.85 / 0.05 = $170
  CAC (paid): $50
  LTV/CAC: 3.4x ✓ (marginal)

  Key: Consumer models need organic acquisition (viral, SEO)
  to achieve blended CAC < $20 for strong LTV/CAC
```

---

## Growth Trajectory Presentation

### The Growth Story Arc

```
GROWTH NARRATIVE STRUCTURE

PHASE 1: INITIAL TRACTION (past)
  "We launched [X months] ago and have grown to [metric]."
  Present actual data. No projections here.
  Show the trajectory, not just the endpoint.

PHASE 2: CURRENT MOMENTUM (present)
  "We're currently growing at [rate] with [efficiency]."
  Month-over-month growth rate
  Customer acquisition channels and mix
  Cohort behavior (retention, expansion)

PHASE 3: SCALING THESIS (future)
  "With this capital, we'll accelerate growth by [mechanism]."
  Explain WHY growth will continue or accelerate
  Identify specific growth drivers
  Connect capital deployment to growth levers

GROWTH PRESENTATION VISUAL:

  Revenue ($K)
  │
  │                                      ╱ Projected
  │                                   ╱   (with funding)
  │                                ╱
  │                             ╱
  │                          ╱
  │                       ╱    ← Inflection point
  │                    ╱         (funding deployed)
  │                 ╱
  │              ╱ Actual
  │           ╱
  │        ╱
  │     ╱
  │  ╱
  │╱
  └──────────────────────────────────────→ Time
       Past              Now        Future
```

### MRR Waterfall (SaaS)

```
MRR WATERFALL ANALYSIS

The MRR waterfall shows the components of revenue growth:

Beginning MRR:        $100,000
+ New MRR:            +$15,000  (new customers)
+ Expansion MRR:      +$8,000   (upgrades, add-ons)
+ Reactivation MRR:   +$2,000   (churned customers returning)
- Contraction MRR:    -$3,000   (downgrades)
- Churned MRR:        -$5,000   (lost customers)
= Ending MRR:        $117,000
= Net New MRR:        $17,000   (17% MoM growth)

NET REVENUE RETENTION:
  NRR = (Beginning MRR + Expansion - Contraction - Churn) / Beginning MRR
  NRR = ($100K + $8K - $3K - $5K) / $100K = 100%

  NOTE: If expansion > contraction + churn → NRR > 100%
  This means revenue grows even without new customers.

  NRR BENCHMARKS:
  < 80%: Concerning (leaky bucket)
  80-100%: Acceptable (early stage)
  100-120%: Good (strong product-market fit)
  120-140%: Excellent (best SaaS companies)
  > 140%: Exceptional (Snowflake, Twilio at scale)

PRESENTING THE WATERFALL:
  - Show 6-12 months of waterfall data
  - Highlight positive trends (growing expansion, shrinking churn)
  - Explain what drives each component
  - Use stacked bar chart visualization
```

### Cohort Analysis

```
COHORT RETENTION PRESENTATION

Cohort analysis is the most powerful proof of product-market fit.

RETENTION COHORT CHART:

Month    M0    M1    M2    M3    M4    M5    M6
─────────────────────────────────────────────────
Jan      100%  85%   75%   70%   68%   67%   66%
Feb      100%  87%   78%   73%   71%   70%
Mar      100%  88%   80%   76%   74%
Apr      100%  90%   82%   78%
May      100%  91%   84%
Jun      100%  92%

WHAT INVESTORS LOOK FOR:
1. FLATTENING CURVES: Cohorts stabilize (not continuous decline)
   If curves flatten at 60-70%+, strong PMF signal

2. IMPROVING COHORTS: Later cohorts retain better than earlier
   Jan cohort: 66% at M6
   Jun cohort: 92% at M1 (trending to flatten higher)
   This shows product improvement over time

3. REVENUE RETENTION > USER RETENTION:
   Users may churn but remaining users spend more
   Dollar retention > logo retention = expansion revenue

4. TIME TO VALUE:
   Steep drop M0→M1 = onboarding problem
   Gradual decline M1→M6 = engagement problem
   Flat after M3 = strong retention

NEGATIVE SIGNAL:
  Cohorts that never flatten → continuous churn → no PMF
  Each cohort worse than previous → product degradation
  Revenue retention < user retention → customers shrinking
```

---

## Path to Profitability

### The Profitability Narrative

```
PATH TO PROFITABILITY FRAMEWORK

Not every company needs to be profitable when raising, but every
company needs to show a CREDIBLE PATH to profitability.

THE NARRATIVE:
"Today we're investing in growth. Here's how and when
 the business reaches profitability."

COMPONENTS:

1. GROSS MARGIN TRAJECTORY
   Current: 65%
   Target (at scale): 80%
   Driver: Fixed infrastructure costs amortize over more customers
   Timeline: Reach 80% at $10M ARR

2. OPERATING LEVERAGE
   Show how OpEx grows slower than revenue:

   Revenue     OpEx    OpEx/Rev  Operating Margin
   $1M         $3M     300%      -200%
   $5M         $6M     120%      -20%
   $10M        $8M     80%       +20% ← Profitability
   $25M        $15M    60%       +40%

   "Each incremental dollar of revenue costs less to generate"

3. BURN RATE AND EFFICIENCY
   Burn Multiple = Net Burn / Net New ARR

   Benchmarks (per David Sacks):
   < 1x: "Amazing" (capital efficient)
   1-1.5x: "Great"
   1.5-2x: "Good"
   2-3x: "Concerning"
   > 3x: "Burning cash" (need to improve efficiency)

4. BREAK-EVEN ANALYSIS
   Break-even Revenue = Fixed Costs / Contribution Margin %

   Example:
   Fixed costs: $500K/month
   Contribution margin: 60%
   Break-even: $500K / 0.60 = $833K/month = $10M ARR
```

### Rule of 40

```
RULE OF 40 (for growth-stage companies)

Revenue Growth Rate (%) + Profit Margin (%) >= 40%

EXAMPLES:
  Company A: 100% growth + (-60%) margin = 40% ✓
  Company B: 50% growth + (-10%) margin = 40% ✓
  Company C: 30% growth + 15% margin = 45% ✓
  Company D: 20% growth + (-5%) margin = 15% ✗

WHY THIS MATTERS:
  The Rule of 40 gives investors a single metric that balances
  growth against profitability. Companies above 40% trade at
  significant valuation premiums.

PRESENTATION:
  Show historical Rule of 40 trajectory
  Show projected path to maintaining > 40%
  Explain the lever (growth or margin) that improves over time

NUANCE:
  - Below Series B, growth rate alone matters more
  - At Series C+, Rule of 40 becomes a primary filter
  - Public SaaS companies are valued heavily on Rule of 40
```

---

## Financial Projections

### Building Credible Projections

```
THE THREE-YEAR FINANCIAL MODEL

Investors expect a 3-year financial projection.
The model must be bottom-up, assumption-driven, and defensible.

REVENUE BUILD (bottom-up):

Year 1:
  Starting customers: 50
  New customers/month: 10 → 25 (ramping)
  Monthly churn: 3%
  Average ACV: $24,000
  Expansion rate: 10%/year

  End of Y1 customers: ~200
  Y1 ARR: $4.8M
  Y1 Revenue: $2.4M (ramp effect)

Year 2:
  New customers/month: 25 → 50 (new sales hires)
  Monthly churn: 2.5% (improving)
  Average ACV: $28,000 (upsell, new tiers)

  End of Y2 customers: ~500
  Y2 ARR: $14M
  Y2 Revenue: $9M

Year 3:
  New customers/month: 50 → 80
  Monthly churn: 2%
  Average ACV: $32,000

  End of Y3 customers: ~1,000
  Y3 ARR: $32M
  Y3 Revenue: $23M

EXPENSE BUILD (role-based):

  Engineering: X engineers * $avg_comp * 1.3 (benefits)
  Sales: Y AEs * $OTE + commission structure
  Marketing: X% of revenue target + fixed programs
  G&A: Finance, HR, legal, office
  Infrastructure: Hosting, tools, per-customer costs

MARGIN TRAJECTORY:
  Y1: -100% (investing in growth)
  Y2: -20% (approaching profitability)
  Y3: +15% (operating leverage kicks in)

ASSUMPTION DOCUMENTATION:
Every number must trace to an assumption.
Assumptions must be labeled: "proven", "estimated", or "aspirational"
```

### Scenario Modeling

```
SCENARIO ANALYSIS FRAMEWORK

BASE CASE: Management's best estimate
  Revenue growth: 150% → 100% → 80% (YoY)
  Burn multiple: 1.5x declining to 1.0x
  Result: $32M ARR by Year 3, approaching profitability

UPSIDE CASE: Everything goes right
  Revenue growth: 200% → 150% → 100%
  Burn multiple: 1.0x
  Result: $50M ARR by Year 3, profitable
  Probability estimate: 20-30%

DOWNSIDE CASE: Things take longer
  Revenue growth: 80% → 60% → 40%
  Burn multiple: 2.5x
  Result: $12M ARR by Year 3, needs additional capital
  Probability estimate: 20-30%

SURVIVAL CASE: Worst case
  Growth stalls at 30% YoY
  Company cuts to break-even
  Runway: 36+ months at reduced burn
  Probability estimate: 10-15%

PRESENTATION:
  Show all four scenarios
  Demonstrate that downside case still supports the business
  Show management's plan for each scenario
  "We've stress-tested our model. Even in the downside case,
   we reach $12M ARR with runway to adjust."
```

---

## Metrics Presentation

### The Metrics Hierarchy

```
METRICS BY STAGE AND WHAT TO EMPHASIZE

PRE-SEED / SEED:
  Primary: User growth, engagement, qualitative feedback
  Secondary: Early revenue, waitlist size, conversion rates
  Don't show: Detailed unit economics (too early to be meaningful)

SERIES A:
  Primary: ARR, MoM growth rate, retention/cohorts
  Secondary: CAC, LTV/CAC, gross margin, NRR
  Don't show: Long-term financial projections without assumptions

SERIES B:
  Primary: ARR, growth rate, NRR, burn multiple, Rule of 40
  Secondary: By-segment analysis, channel mix, LTV/CAC by cohort
  Must show: Detailed financial model, path to profitability

SERIES C+:
  Primary: Revenue scale, operating leverage, market share
  Secondary: Efficiency metrics, competitive benchmarking
  Must show: Clear path to cash flow positive, IPO readiness
```

### Presenting Difficult Metrics

```
HANDLING WEAK METRICS HONESTLY

If a metric is weak, do NOT hide it. Investors will find it.
Instead, use this framework:

1. ACKNOWLEDGE the weakness directly
   "Our current monthly churn is 5%. We know this needs to improve."

2. EXPLAIN the root cause
   "This is driven by our SMB segment. Enterprise churn is 1.5%."

3. SHOW the improvement trajectory
   "Churn has improved from 8% to 5% over 6 months as we've
    improved onboarding and added customer success."

4. PRESENT the plan
   "We're investing in [specific initiative] to bring churn
    below 3% within the next two quarters."

METRICS THAT INVESTORS WILL SCRUTINIZE:
  - Churn rate (is the bucket leaking?)
  - Growth deceleration (is momentum fading?)
  - CAC payback > 18 months (capital inefficiency)
  - Concentration (>25% revenue from one customer)
  - Negative gross margin (unsustainable unit economics)
  - Burn multiple > 3x (inefficient capital deployment)
```

---

## Financial Model Red Flags

```
WHAT MAKES INVESTORS DISMISS A FINANCIAL MODEL

1. TOP-DOWN REVENUE ("1% of a $100B market")
   FIX: Bottom-up from customers * ACV * conversion

2. HOCKEY STICK WITHOUT EXPLANATION
   Revenue flat for 18 months then 10x in 6 months
   FIX: Explain every inflection point (hire, product launch, channel)

3. NO EXPENSE GROWTH WITH REVENUE GROWTH
   Revenue 5x but headcount flat
   FIX: Show realistic hiring plan tied to growth

4. 90%+ GROSS MARGINS DAY ONE
   Unrealistic for most businesses
   FIX: Show margin improvement over time with drivers

5. BREAK-EVEN IN 12 MONTHS
   If you could break even in 12 months, why raise?
   FIX: Show that capital is deployed for growth, not survival

6. NO SENSITIVITY ANALYSIS
   Only one scenario presented
   FIX: Show base, up, and down cases

7. ASSUMPTIONS NOT STATED
   Numbers without underlying logic
   FIX: Assumption table with sources and confidence levels

8. IGNORING WORKING CAPITAL
   Revenue booked but cash not collected
   FIX: Include AR/AP cycle in cash flow projections
```

---

**This module provides the framework for constructing investor-grade financial narratives.
The financial story must combine rigorous quantitative analysis with clear narrative
structure. Numbers tell; stories sell; the financial story does both.**
