# SaaS Metrics — ARR, Retention, Efficiency, and Benchmarks

## Overview

SaaS metrics are the quantitative language of recurring revenue businesses.
They measure growth velocity, customer retention, unit economics, and capital
efficiency. This module covers the definitive definitions, formulas, and
interpretations of every key SaaS metric, along with benchmark data by stage.
Consistent metric definitions are essential because investors, board members,
and operators must be comparing the same numbers.

References: Bessemer Venture Partners (Cloud Index, 10 Laws of Cloud),
SaaStr (metrics definitions), SaaS Capital (surveys and benchmarks),
Redpoint (SaaS metrics guide), OpenView (expansion SaaS benchmarks).

---

## Revenue Metrics

### Annual Recurring Revenue (ARR)

```
ARR = Sum of all active subscription contracts, annualized

ARR includes:
  - Monthly subscriptions * 12
  - Annual subscriptions at contract value
  - Multi-year subscriptions at annual value

ARR excludes:
  - One-time fees (implementation, setup)
  - Professional services revenue
  - Usage/consumption overages (unless committed minimums)
  - Free trials and freemium users
```

### Monthly Recurring Revenue (MRR)

```
MRR = ARR / 12

MRR is preferred for monthly reporting; ARR for annual planning and valuation.
For companies with mixed contract lengths, MRR is calculated as:
  MRR = SUM(each customer's monthly subscription amount)
```

### Net New ARR Decomposition

```
Net New ARR = New ARR + Expansion ARR - Contraction ARR - Churned ARR

Components:
  New ARR:          Revenue from brand-new customers
  Expansion ARR:    Revenue increase from existing customers (upsell, cross-sell, price increase)
  Contraction ARR:  Revenue decrease from existing customers (downgrade, discount)
  Churned ARR:      Revenue lost from customers who cancelled

ARR Bridge:
  Beginning ARR:     $10,000,000
  + New:             $3,000,000
  + Expansion:       $1,500,000
  - Contraction:     ($500,000)
  - Churn:           ($1,000,000)
  = Net New ARR:     $3,000,000
  Ending ARR:        $13,000,000
  YoY Growth:        30%
```

---

## Retention Metrics

### Gross Revenue Retention (GRR)

```
GRR = (Beginning ARR - Contraction - Churn) / Beginning ARR

GRR measures: how much revenue you keep, ignoring expansion
Range: 0% to 100% (cannot exceed 100%)
Target: > 90% (SaaS), > 85% (SMB-heavy)

Example:
  Beginning ARR: $10M
  Contraction: $500K
  Churn: $1M
  GRR = ($10M - $0.5M - $1M) / $10M = 85%
```

### Net Revenue Retention (NRR / NDR)

```
NRR = (Beginning ARR + Expansion - Contraction - Churn) / Beginning ARR

NRR measures: total revenue change from existing customers
Range: can exceed 100% if expansion > contraction + churn
Target: > 110% (good), > 120% (elite), > 130% (exceptional)

Example:
  Beginning ARR: $10M
  Expansion: $1.5M
  Contraction: $0.5M
  Churn: $1M
  NRR = ($10M + $1.5M - $0.5M - $1M) / $10M = 100%
```

### Logo Retention

```
Logo Retention = 1 - (Customers Lost / Beginning Customers)

Customer churn rate = Customers Lost / Beginning Customers

Example:
  Beginning customers: 500
  Customers churned: 25
  Logo retention: 1 - 25/500 = 95%
  Customer churn rate: 5%

Note: Logo retention ignores revenue size.
A small customer and an enterprise customer count equally.
```

### Cohort Retention Table

```
                 Month 0   Month 3   Month 6   Month 12  Month 24
Q1-2023 cohort  $100K MRR  $95K      $92K      $88K      $95K
                (100%)     (95%)     (92%)     (88%)     (95%)

Q2-2023 cohort  $120K MRR  $116K     $114K     $112K
                (100%)     (96.7%)   (95%)     (93.3%)

If M24 > M0: expansion exceeds churn (NRR > 100%)
```

---

## Growth Metrics

### ARR Growth Rate

```
ARR Growth Rate = (Ending ARR - Beginning ARR) / Beginning ARR

Annualized from monthly:
  Annual Growth = (1 + Monthly Growth)^12 - 1

Example:
  January ARR: $10M
  December ARR: $13.5M
  Annual growth: 35%
  Monthly growth: (1.35)^(1/12) - 1 = 2.5%
```

### T2D3 Growth Framework

The gold standard VC growth expectation for SaaS:

```
Year 1: Triple revenue (3x)
Year 2: Triple revenue (3x)
Year 3: Double revenue (2x)
Year 4: Double revenue (2x)
Year 5: Double revenue (2x)

Starting from $2M ARR:
  Year 1: $6M
  Year 2: $18M
  Year 3: $36M
  Year 4: $72M
  Year 5: $144M

Reality check: < 5% of SaaS companies achieve this trajectory.
```

---

## Efficiency Metrics

### Rule of 40

```
Rule of 40 = Revenue Growth Rate + Free Cash Flow Margin

Example:
  Revenue growth: 35%
  FCF margin: -10%
  Rule of 40: 25% (below 40, growth is burning too much cash)

Interpretation:
  > 40%: excellent balance of growth and efficiency
  20-40%: acceptable, but identify improvement levers
  < 20%: concerning, review burn rate and growth strategy

Public SaaS benchmarks (2024):
  Top quartile: > 50%
  Median: ~30%
  Bottom quartile: < 15%
```

### Burn Multiple

```
Burn Multiple = Net Burn / Net New ARR

Example:
  Net burn: $6M (annual)
  Net new ARR: $4M
  Burn multiple: 1.5x

Interpretation:
  < 1x: excellent efficiency (capital efficient)
  1-1.5x: good efficiency
  1.5-2x: moderate (acceptable at early stage)
  > 2x: concerning (burning too much per dollar of new ARR)
  > 3x: alarming
```

### Magic Number

```
Magic Number = Net New ARR / S&M Spend (prior quarter, annualized)

Example:
  Q2 net new ARR: $1M (annualized: $4M)
  Q1 S&M spend: $2.5M (annualized: $10M)
  Magic Number: $4M / $10M = 0.4

Interpretation:
  > 1.0: very efficient, accelerate S&M spend
  0.75-1.0: efficient, continue scaling
  0.5-0.75: moderate, optimize before scaling
  < 0.5: inefficient, fix GTM before spending more
```

### CAC Payback Period

```
CAC Payback = CAC / (ARPU * Gross Margin %)

In months:
  CAC Payback = CAC / (Monthly ARPU * Gross Margin %)

Example:
  CAC: $12,000
  Monthly ARPU: $800
  Gross margin: 80%
  Monthly contribution: $640
  CAC payback: $12,000 / $640 = 18.75 months

Target: < 18 months (good), < 12 months (excellent)
```

### LTV:CAC Ratio

```
LTV:CAC = Customer Lifetime Value / Customer Acquisition Cost

LTV = ARPU * Gross Margin % / Churn Rate

Example:
  ARPU: $800/month
  Gross margin: 80%
  Monthly churn: 2%
  LTV: $800 * 0.80 / 0.02 = $32,000
  CAC: $12,000
  LTV:CAC: 2.67x

Target: > 3x (healthy), > 5x (may be under-investing in growth)
```

---

## Operational Metrics

### Remaining Performance Obligation (RPO)

```
RPO = Total contracted future revenue not yet recognized

Current RPO: revenue to be recognized in next 12 months
Non-current RPO: revenue beyond 12 months

Example:
  2-year contract signed today: $240K total
  Revenue recognized to date: $0
  RPO: $240K
  Current RPO: $120K (next 12 months)
  Non-current RPO: $120K (months 13-24)

RPO is a forward-looking indicator of revenue visibility.
```

### Average Revenue Per Account (ARPA)

```
ARPA = ARR / Number of Customers

Segment-level ARPA:
  Enterprise ARPA: $120K
  Mid-market ARPA: $30K
  SMB ARPA: $5K
  Blended ARPA: $25K

ARPA trends:
  Increasing ARPA: moving upmarket, good for unit economics
  Decreasing ARPA: moving downmarket or discounting
```

### Customer Concentration

```
Top 1 customer % of ARR: [%]  (target: < 10%)
Top 5 customers % of ARR: [%] (target: < 25%)
Top 10 customers % of ARR: [%] (target: < 40%)

High concentration = risk premium in valuation
If top customer churns, impact should be < 5% of ARR
```

---

## Benchmarks by ARR Scale

### Growth Rate Benchmarks

| ARR Scale | Top Quartile | Median | Bottom Quartile |
|-----------|-------------|--------|----------------|
| $1-5M | > 150% | 100% | < 50% |
| $5-10M | > 100% | 70% | < 30% |
| $10-25M | > 80% | 50% | < 25% |
| $25-50M | > 60% | 40% | < 20% |
| $50-100M | > 50% | 30% | < 15% |
| $100M+ | > 40% | 25% | < 10% |

### Retention Benchmarks

| Segment | GRR Target | NRR Target |
|---------|-----------|-----------|
| Enterprise | > 95% | > 120% |
| Mid-market | > 90% | > 110% |
| SMB | > 80% | > 100% |

### Efficiency Benchmarks

| Metric | Excellent | Good | Concerning |
|--------|----------|------|-----------|
| Rule of 40 | > 50% | 30-50% | < 20% |
| Burn multiple | < 1x | 1-2x | > 2x |
| Magic number | > 1.0 | 0.5-1.0 | < 0.5 |
| CAC payback | < 12 mo | 12-18 mo | > 24 mo |
| LTV:CAC | > 5x | 3-5x | < 3x |
| Gross margin | > 80% | 70-80% | < 70% |

---

## Metric Hygiene

### Common Measurement Errors

| Error | Problem | Correct Approach |
|-------|---------|-----------------|
| Including one-time revenue in ARR | Inflates recurring base | Only recurring components |
| Counting bookings as revenue | Revenue ≠ bookings | ASC 606 recognition |
| Monthly churn annualized incorrectly | 2%/month ≠ 24%/year | 1-(1-0.02)^12 = 21.5% |
| Blending logo and revenue churn | Different stories | Report both separately |
| Trailing vs annualized growth | Inconsistent comparison | Specify measurement period |

---

## Production Checklist

- [ ] ARR and MRR reconciled to billing system monthly
- [ ] Net new ARR decomposed (new, expansion, contraction, churn)
- [ ] GRR and NRR calculated by segment (enterprise, mid-market, SMB)
- [ ] Rule of 40 tracked monthly
- [ ] Burn multiple tracked monthly
- [ ] CAC calculated with fully loaded S&M spend
- [ ] LTV:CAC ratio computed with correct discount rate
- [ ] Magic number calculated quarterly
- [ ] Cohort retention tables maintained
- [ ] Benchmarks reviewed quarterly against stage-appropriate peers
