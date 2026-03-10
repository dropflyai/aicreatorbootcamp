# Pricing Metrics — ARPU, Realization, Discount Depth, Conversion, and Expansion

## Overview

Pricing metrics are the quantitative indicators that measure whether your pricing strategy
is working. Unlike vanity metrics that measure activity, pricing metrics measure value
capture — how effectively you convert the value you create into revenue you collect.
This module defines the canonical set of pricing metrics: ARPU trending and decomposition,
price realization rate and pocket price analysis, discount depth and frequency tracking,
conversion rate by price point, expansion revenue rate, net revenue retention, pricing
page metrics, and the meta-metrics that measure the health of your pricing function
itself. Every metric includes its formula, target range, diagnostic interpretation,
and recommended action when the metric is off-target.

---

## 1. ARPU (Average Revenue Per User/Account)

### ARPU Definition and Calculation

```
ARPU FORMULAS:

  BASIC ARPU:
    ARPU = Total MRR / Total Paying Customers
    Example: $500,000 MRR / 5,000 customers = $100 ARPU

  ARPU VARIANTS:
    ARPA (per account):  MRR / paying accounts (if multi-user)
    ARPS (per seat):     MRR / total paid seats
    New ARPU:            MRR from customers acquired this month / new customers
    Existing ARPU:       MRR from pre-existing customers / existing customer count

  ARPU DECOMPOSITION:
    ARPU = Plan ARPU + Seat ARPU + Usage ARPU + Add-On ARPU

    Where:
      Plan ARPU:    Average plan price (weighted by plan distribution)
      Seat ARPU:    Average per-seat revenue above base plan
      Usage ARPU:   Average usage/overage revenue
      Add-On ARPU:  Average add-on revenue per customer

    Example:
      Plan ARPU:   $65 (weighted: 30% at $29, 50% at $79, 20% at $199)
      Seat ARPU:   $22 (average 2.2 extra seats at $10/seat)
      Usage ARPU:  $8  (average API overage)
      Add-On ARPU: $5  (15% of customers have $33/mo in add-ons)
      Total ARPU:  $100
```

### ARPU Trending

```
ARPU TREND ANALYSIS:

  Track monthly for at least 12 months:

  Month    ARPU    Change   Driver
  ──────────────────────────────────────────────
  Jan      $95     —        Baseline
  Feb      $96     +1.1%    Seat expansion (Q1 hiring)
  Mar      $97     +1.0%    Continued seat growth
  Apr      $98     +1.0%    Tier upgrades post-trial end
  May      $99     +1.0%    New Pro features driving upgrades
  Jun      $100    +1.0%    Steady expansion
  Jul      $102    +2.0%    Price increase on new customers
  Aug      $104    +2.0%    Price increase expanding to renewals
  Sep      $105    +1.0%    Expansion normalizing
  Oct      $106    +1.0%    Add-on adoption campaign
  Nov      $107    +0.9%    Holiday slowdown
  Dec      $108    +0.9%    Year-end enterprise deals (high ARPU)

  Annual ARPU growth: ($108 - $95) / $95 = +13.7%

  TARGETS:
    Healthy:     5-10% annual ARPU growth
    Strong:      10-20% annual ARPU growth
    Exceptional: 20%+ annual ARPU growth

  IF ARPU IS DECLINING:
    Diagnosis: Which ARPU component is dropping?
    Plan ARPU down → Customers choosing lower tiers (packaging issue)
    Seat ARPU down → Customers reducing seats (product value issue)
    Usage ARPU down → Consumption declining (engagement issue)
    New ARPU < Existing ARPU → New pricing is lower or mix is shifting
```

---

## 2. Price Realization Rate

### Definition and Calculation

```
PRICE REALIZATION RATE:

  Formula:
    Realization = Actual Revenue Collected / Theoretical Maximum Revenue

    Theoretical Max = Sum of (List Price * Quantity) for all customers
    Actual Collected = Sum of all payments received

  DECOMPOSITION:
    List Price
      minus: Standard discounts (annual, volume)         = Invoice Price
      minus: Negotiated discounts                         = Contracted Price
      minus: Off-invoice adjustments (credits, refunds)   = Pocket Price

    Realization = Pocket Price / List Price

  EXAMPLE:
    Customer on $99/month plan:
      List:       $99/month
      Annual:     -20% ($79.20)
      Negotiated: -10% ($71.28)
      Credit:     -$10 (one-time outage credit)
      Pocket:     $61.28 this month

    Realization: $61.28 / $99 = 61.9% (BELOW THRESHOLD)

  AGGREGATE:
    Total list value:     $1,200,000/month
    Total pocket value:   $960,000/month
    Realization:          80.0%

  TARGETS:
    Excellent: >90% realization
    Healthy:   80-90%
    Warning:   70-80%
    Critical:  <70%
```

### Realization Improvement Levers

```
IMPROVING PRICE REALIZATION:

  LEVER 1: REDUCE DISCOUNT DEPTH
    Tighten authority matrix
    Train sales on value selling
    Track discount depth by rep (identify heavy discounters)
    Target: Reduce average discount by 2-3pp per quarter

  LEVER 2: ELIMINATE UNNECESSARY CREDITS
    Audit all service credits in past 6 months
    Root cause: Are credits due to bugs, outages, or policy?
    Fix root cause to prevent future credits
    Target: Reduce credit volume by 50%

  LEVER 3: IMPROVE PAYMENT COLLECTION
    Optimize dunning sequence (see 06_operations)
    Implement smart retry logic (optimal retry timing)
    Pre-dunning alerts at payment method expiration
    Target: Recover 10-20% more failed payments

  LEVER 4: MIGRATE GRANDFATHERED PRICING
    Identify customers on legacy pricing below current list
    Plan migration with communication (see 05_experimentation)
    Phase 1: New features at new price only
    Phase 2: Grandfather expiration with notice
    Target: Close 50% of grandfather gap within 12 months
```

---

## 3. Discount Metrics

### Discount Depth

```
DISCOUNT DEPTH:

  Formula:
    Discount Depth = (List Price - Actual Price) / List Price * 100

  TRACKING DIMENSIONS:
    By segment:     SMB / Mid-Market / Enterprise
    By sales rep:   Individual rep discount patterns
    By deal size:   Correlation between ACV and discount
    By quarter:     Seasonality and quarter-end behavior
    By competitor:  Discount when competing vs not

  BENCHMARKS:
    Overall average:          10-15% (healthy)
    SMB:                      5-10% (mostly standard discounts)
    Mid-Market:               10-20% (negotiated)
    Enterprise:               15-30% (complex deals)

  RED FLAGS:
    Average discount >20%:         Pricing too high or sales over-discounting
    Discount increasing QoQ:       Sales team learned to discount
    >50% of deals discounted:      Discount is default, not exception
    Specific rep >25% average:     Coaching needed
    Quarter-end spike >2x normal:  End-of-quarter desperation discounting
```

### Discount Frequency

```
DISCOUNT FREQUENCY:

  Formula:
    Frequency = Deals with any discount / Total deals closed * 100

  TRACKING:
    Month    Deals Closed    Deals Discounted    Frequency
    ─────────────────────────────────────────────────────────
    Jan      120             48                  40%
    Feb      115             52                  45%
    Mar      145             87                  60% ← Quarter-end
    Apr      110             44                  40%
    May      125             56                  45%
    Jun      160             104                 65% ← Quarter-end
    Jul      108             43                  40%

  PATTERN: Quarter-end months have 50%+ higher discount frequency
  ROOT CAUSE: Pipeline pressure driving discounting to close deals
  FIX: Pipeline discipline; reduce reliance on quarter-end deals

  TARGETS:
    Healthy:   <40% of deals discounted
    Warning:   40-60%
    Critical:  >60% (discounting is the default; price integrity lost)
```

---

## 4. Conversion Metrics

### Conversion by Price Point

```
CONVERSION RATE BY PLAN:

  Track conversion from pricing page visit to plan selection to purchase.

  Plan        Page Views    Selections    Purchases    Conv Rate
  ──────────────────────────────────────────────────────────────
  Starter     12,000        3,600         720          6.0%
  Pro         12,000        4,800         624          5.2%
  Business    12,000        2,400         192          1.6%
  Enterprise  12,000        1,200         —            (contact sales)

  SELECTION RATE (which plan do visitors click?):
    Starter:    30%
    Pro:        40% ← "Recommended" badge effect
    Business:   20%
    Enterprise: 10%

  SELECTION-TO-PURCHASE RATE:
    Starter:    720/3,600 = 20.0%
    Pro:        624/4,800 = 13.0%
    Business:   192/2,400 = 8.0%

  REVENUE PER VISITOR (RPV):
    Starter:    $29 * 6.0%  = $1.74/visitor
    Pro:        $79 * 5.2%  = $4.11/visitor ← Highest RPV
    Business:   $199 * 1.6% = $3.18/visitor

  INSIGHT:
    Pro generates the highest RPV despite not having the highest conversion
    Optimizing for Pro selection (+10% selection → +$0.41 RPV) is more
    valuable than optimizing Starter conversion
```

### Pricing Page Funnel

```
PRICING PAGE CONVERSION FUNNEL:

  Stage                     Volume      Rate       Drop-off
  ──────────────────────────────────────────────────────────
  Site visitors             100,000     —          —
  Pricing page views        12,000      12.0%      88.0%
  Plan selected/clicked     8,400       70.0%      30.0%
  Checkout started          3,360       40.0%      60.0%
  Payment completed         1,536       45.7%      54.3%
  Activation (first use)    1,382       90.0%      10.0%

  OVERALL: 1.5% of site visitors → paying customer

  OPTIMIZATION PRIORITIES (by impact):
    1. Plan selection rate (70%): Is it clear which plan to choose?
    2. Checkout start rate (40%): Why do 60% not proceed to checkout?
    3. Payment completion (46%): Is checkout friction too high?
    4. Pricing page visit rate (12%): Is CTA to pricing visible enough?

  DIAGNOSTIC:
    Low selection rate (<60%): Plans are confusing or too many options
    Low checkout start (<30%): Price shock at checkout; sticker shock
    Low completion (<40%):     Payment form friction; trust issues
    Low activation (<80%):     Onboarding failure (not a pricing issue)
```

---

## 5. Expansion Revenue Metrics

### Expansion Revenue Rate

```
EXPANSION REVENUE RATE:

  Formula:
    Expansion Rate = Expansion MRR / Beginning of Period MRR * 100

  EXPANSION MRR SOURCES:
    Seat expansion:    Existing customers adding users
    Tier upgrade:      Customers moving to higher plan
    Usage growth:      Customers consuming more (metered billing)
    Add-on purchase:   Customers adding optional modules
    Price increase:    Existing customers moved to new higher price

  MONTHLY TRACKING:
    Month    Begin MRR    Expansion    Rate     Source Breakdown
    ────────────────────────────────────────────────────────────
    Jan      $500K        $25K         5.0%     Seats: $12K, Upgrade: $8K, Usage: $5K
    Feb      $510K        $22K         4.3%     Seats: $10K, Upgrade: $7K, Usage: $5K
    Mar      $520K        $30K         5.8%     Seats: $14K, Upgrade: $10K, Usage: $6K
    ...

  TARGETS:
    Healthy:      3-5% monthly expansion rate
    Strong:       5-8% monthly expansion rate
    Exceptional:  8%+ monthly expansion rate

  ANNUAL EQUIVALENT:
    5% monthly = ~80% annual expansion (compounding)
    This means each cohort grows 80% in its first year through expansion alone
```

### Net Revenue Retention (NRR)

```
NET REVENUE RETENTION:

  Formula:
    NRR = (Beginning MRR + Expansion - Contraction - Churn) / Beginning MRR * 100

  COMPONENTS:
    Beginning MRR:    MRR from existing customers at period start
    Expansion:        Revenue growth from existing customers
    Contraction:      Revenue decrease from downgrades
    Churn:           Revenue lost from cancellations

  EXAMPLE:
    Beginning MRR:    $500,000
    Expansion:        +$50,000 (10%)
    Contraction:      -$10,000 (2%)
    Churn:           -$25,000 (5%)
    Ending MRR:       $515,000
    NRR:              103% ($515K / $500K)

  ANNUAL NRR:
    Monthly NRR 103% → Annual NRR ~142% (compounding)
    Each dollar of MRR becomes $1.42 after 12 months

  BENCHMARKS (Annual NRR):
    World-class:   130%+ (Snowflake, Twilio, Datadog)
    Excellent:     120-130%
    Good:          110-120%
    Acceptable:    100-110%
    Concerning:    <100% (revenue shrinking per cohort)

  NRR BY SEGMENT:
    SMB:          90-100% (higher churn, less expansion)
    Mid-Market:   105-115% (moderate churn, moderate expansion)
    Enterprise:   120-140% (low churn, high expansion)

  IF NRR IS BELOW TARGET:
    NRR = Expansion - Contraction - Churn
    Diagnose which component is the problem:
      High churn → Retention issue (product, support, competitive)
      High contraction → Downgrades (packaging or value issue)
      Low expansion → Expansion pricing not working (triggers, upsell)
```

---

## 6. Plan Distribution Metrics

### Plan Mix Analysis

```
PLAN DISTRIBUTION:

  Track what percentage of customers are on each plan.

  Plan        Customers    %        MRR         % of MRR
  ──────────────────────────────────────────────────────
  Free        10,000       66.7%    $0          0%
  Starter     2,500        16.7%    $72,500     14.5%
  Pro         2,000        13.3%    $158,000    31.6%
  Business    400          2.7%     $79,600     15.9%
  Enterprise  100          0.7%     $190,000    38.0%

  INSIGHTS:
    67% of users are free (typical for freemium)
    Enterprise is 0.7% of customers but 38% of MRR
    Pro is the "sweet spot" — highest MRR contribution per tier

  HEALTHY DISTRIBUTION (paid customers only):
    Lowest tier:   30-40% of paid customers
    Middle tier:   40-50% of paid customers ← majority here
    Highest tier:  10-20% of paid customers

  WARNING SIGNS:
    >60% on lowest tier:  Customers not seeing upgrade value
    >50% on highest tier: Tiers are not differentiated enough
    Middle tier <30%:     Middle tier is poorly positioned (pricing or features)
```

### Plan Migration Tracking

```
MONTHLY PLAN MOVEMENT:

  Track net movement between plans.

  Flow              Volume    MRR Impact
  ──────────────────────────────────────────
  Free → Starter    +150      +$4,350
  Free → Pro        +30       +$2,370
  Starter → Pro     +45       +$2,250
  Pro → Business    +12       +$1,440
  Business → Ent    +3        +$2,400
  Pro → Starter     -20       -$1,000
  Starter → Free    -60       -$1,740
  Business → Pro    -5        -$600

  NET MOVEMENT:
    Upgrades:   +240 moves, +$12,810 MRR
    Downgrades: -85 moves, -$3,340 MRR
    Net:        +155 moves, +$9,470 MRR

  UPGRADE/DOWNGRADE RATIO:
    240/85 = 2.8:1 (healthy: >2:1 target)

  TRACK MONTHLY:
    Upgrade ratio trending up → packaging/pricing working
    Upgrade ratio trending down → value gap closing or competitors pulling
    Downgrade spike → investigate (price increase? product issue? competitive?)
```

---

## 7. Pricing Function Health Metrics

### Meta-Metrics for the Pricing Team

```
PRICING FUNCTION EFFECTIVENESS:

  These metrics measure how well the pricing function itself operates.

  DECISION QUALITY:
    Pricing decisions backed by data:      Target >80%
    Pricing experiments run per quarter:   Target 2-4
    Time from hypothesis to test result:   Target <8 weeks
    Pricing committee meeting frequency:   Target monthly

  EXECUTION QUALITY:
    Time to implement pricing change:      Target <2 weeks
    Billing error rate:                    Target <0.5%
    Discount compliance rate:              Target >95%
    Price realization rate:                Target >85%

  OUTCOME QUALITY:
    ARPU growth YoY:                       Target >10%
    NRR:                                   Target >110%
    Conversion rate trend:                 Target stable or improving
    RPV (Revenue Per Visitor):             Target improving QoQ

  LEARNING VELOCITY:
    Pricing insights documented per quarter: Target 5+
    Pricing playbooks updated per quarter:   Target 2+
    Cross-functional pricing alignment:      Target annual survey >4/5
```

### Pricing Scorecard Template

```
QUARTERLY PRICING SCORECARD:

  METRIC                        Q1      Q2      Target   Status
  ─────────────────────────────────────────────────────────────
  ARPU (monthly)                $98     $104    +10% YoY  On Track
  Price Realization              82%     84%     >85%     Improving
  Avg Discount Depth             14%     13%     <15%     On Track
  Discount Frequency             45%     42%     <40%     Improving
  Free-to-Paid Conversion        4.2%    4.5%    >5%      Below
  Pricing Page Conversion        8.1%    8.4%    >10%     Below
  Expansion Rate (monthly)       4.8%    5.1%    >5%      On Track
  NRR (annual)                   112%    115%    >110%    On Track
  RPV                            $3.80   $4.10   >$4.00   Met
  Plan Distribution (% on Pro)   38%     41%     >40%     Met

  OVERALL: 7/10 metrics on track or met
  FOCUS AREAS: Free-to-paid conversion, pricing page conversion

  ACTIONS FOR NEXT QUARTER:
    1. Reverse trial experiment to boost free-to-paid
    2. Pricing page A/B test (layout and recommended plan)
    3. Continue discount governance tightening
    4. Enterprise deal structure review (high expansion opportunity)
```

---

## 8. Metric Instrumentation

### How to Track These Metrics

```
DATA REQUIREMENTS PER METRIC:

  ARPU:
    Source: Billing system (Stripe, Chargebee)
    Data: Total MRR, total paying customer count
    Frequency: Daily calculation, monthly reporting

  Price Realization:
    Source: Billing + CRM + accounting
    Data: List prices, actual invoiced, actual collected
    Frequency: Monthly calculation
    Note: Requires matching list price to each customer's plan

  Discount Metrics:
    Source: CRM (deal records) + CPQ
    Data: List price, quoted price, discount approval records
    Frequency: Weekly for ops, monthly for reporting

  Conversion Metrics:
    Source: Web analytics (GA4, Mixpanel) + billing
    Data: Pricing page visits, plan selections, checkouts, purchases
    Frequency: Daily monitoring, weekly reporting

  Expansion/NRR:
    Source: Billing system
    Data: MRR by customer, change type (expansion/contraction/churn)
    Frequency: Monthly calculation
    Tool: ChartMogul, Baremetrics, ProfitWell/Paddle

  Plan Distribution:
    Source: Billing system
    Data: Customer count and MRR by plan
    Frequency: Monthly snapshot

RECOMMENDED TOOLING:
  ChartMogul:     Subscription analytics (ARPU, NRR, churn, MRR movements)
  Baremetrics:    SaaS metrics dashboard (similar to ChartMogul)
  ProfitWell:     Free SaaS metrics + pricing optimization tools
  Stripe Sigma:   SQL access to Stripe billing data
  Custom (dbt):   Transform raw billing data into metric tables
  Looker/Tableau: Dashboard and visualization layer
```

---

## References

1. ProfitWell/Paddle (2023). "The State of SaaS Pricing."
2. OpenView Partners (2024). "SaaS Pricing Benchmarks."
3. Bessemer Venture Partners (2024). "Cloud Index."
4. ChartMogul (2024). "SaaS Metrics Guide."
5. Simon, H. (2015). "Confessions of the Pricing Man."
6. Campbell, P. (2023). "SaaS Pricing Strategy." Price Intelligently/Paddle.

---

**This document is authoritative for pricing metrics within the Pricing Brain.**
