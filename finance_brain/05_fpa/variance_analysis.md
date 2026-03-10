# Variance Analysis — Budget vs Actual, Root Cause, and Reporting

## Overview

Variance analysis compares planned financial performance (budget/forecast) against
actual results to identify and explain deviations. The discipline of decomposing
variances into volume, price, mix, and timing components transforms raw numbers
into actionable insights. This module covers the variance analysis framework,
root cause decomposition techniques, the monthly close process, and management
reporting best practices for communicating financial performance.

References: Bragg (Financial Analysis: A Controller's Guide), Horngren et al.
(Cost Accounting: A Managerial Emphasis), Higgins (Analysis for Financial
Management), CFO Connect (Monthly Close Best Practices).

---

## Variance Analysis Framework

### Basic Variance

```
Variance = Actual - Budget (or Forecast)

Favorable:   Revenue actual > budget (positive variance)
Unfavorable: Revenue actual < budget (negative variance)
Favorable:   Expense actual < budget (positive variance)
Unfavorable: Expense actual > budget (negative variance)

Variance % = (Actual - Budget) / |Budget| * 100
```

### Materiality Thresholds

| Variance | Action Required |
|----------|----------------|
| < 5% | Note in commentary, no escalation |
| 5-10% | Department head explanation |
| 10-20% | VP-level review, corrective plan |
| > 20% | CFO/CEO review, board communication, reforecast |
| > $100K | Regardless of %, requires explanation |

---

## Root Cause Decomposition

### Revenue Variance

```
Revenue Variance = Actual Revenue - Budgeted Revenue

Decomposition:
  Volume Variance = (Actual Units - Budget Units) * Budget Price
  Price Variance  = (Actual Price - Budget Price) * Actual Units
  Mix Variance    = SUM across segments of:
                    (Actual Mix % - Budget Mix %) * Actual Total * Budget Margin

Total = Volume + Price + Mix
```

### Example: SaaS Revenue Variance

```
Budget:  130 new customers * $500 ARPU = $65,000 new MRR
Actual:  110 new customers * $550 ARPU = $60,500 new MRR
Total variance: -$4,500 (unfavorable)

Decomposition:
  Volume: (110 - 130) * $500 = -$10,000 (20 fewer customers)
  Price:  ($550 - $500) * 110 = +$5,500  (higher ARPU)
  Total:  -$10,000 + $5,500 = -$4,500 ✓

Insight: Revenue miss driven by volume (pipeline/conversion issue),
partially offset by larger deal sizes. Sales efficiency improved but
top-of-funnel underperformed.
```

### Cost Variance

```
Cost Variance = Actual Cost - Budgeted Cost

Decomposition:
  Spending Variance = (Actual Rate - Budget Rate) * Actual Quantity
  Efficiency Variance = (Actual Quantity - Budget Quantity) * Budget Rate

Example: AWS hosting costs
  Budget:  1,000 instance-hours * $0.50/hr = $500
  Actual:  1,200 instance-hours * $0.55/hr = $660
  Total variance: +$160 (unfavorable)

  Spending variance:   ($0.55 - $0.50) * 1,200 = +$60 (rate increase)
  Efficiency variance: (1,200 - 1,000) * $0.50 = +$100 (excess usage)
  Total: $60 + $100 = $160 ✓
```

### Headcount Variance

```
Budget: 45 FTE * $180K avg fully loaded = $8,100K annual
Actual: 42 FTE * $185K avg fully loaded = $7,770K annual
Variance: +$330K favorable

Decomposition:
  Headcount variance: (42 - 45) * $180K = -$540K (3 unfilled roles)
  Rate variance: ($185K - $180K) * 42 = +$210K (higher avg salary)
  Net: -$540K + $210K = -$330K favorable ✓

Insight: favorability is from hiring delays, not efficiency.
3 unfilled roles may be hurting product delivery.
```

---

## SaaS-Specific Variance Analysis

### ARR Bridge Variance

```
Component        | Budget    | Actual    | Variance  | Analysis
────────────────────────────────────────────────────────────────
Beginning ARR    | $10.0M    | $10.0M    | $0        |
+ New Business   | $3.0M     | $2.4M     | ($600K)   | 20% below (pipeline)
+ Expansion      | $1.5M     | $1.8M     | +$300K    | Strong upsells
- Contraction    | ($0.5M)   | ($0.7M)   | ($200K)   | More downgrades
- Churn           | ($1.0M)   | ($1.2M)   | ($200K)   | Higher SMB churn
= Net New ARR    | $3.0M     | $2.3M     | ($700K)   | 23% below plan
Ending ARR       | $13.0M    | $12.3M    | ($700K)   |
```

### Retention Variance

```
Gross Revenue Retention (GRR):
  Budget: 92%    Actual: 90%    Variance: -2pp

Net Revenue Retention (NRR):
  Budget: 115%   Actual: 112%   Variance: -3pp

Decomposition by segment:
  Enterprise:  NRR budget 125%, actual 128% (+3pp favorable)
  Mid-Market:  NRR budget 110%, actual 108% (-2pp unfavorable)
  SMB:         NRR budget 95%,  actual 88%  (-7pp unfavorable)

Root cause: SMB churn increased due to competitor pricing action.
Action: evaluate SMB retention intervention (CSM coverage, pricing).
```

### Unit Economics Variance

```
                Budget      Actual      Variance
────────────────────────────────────────────────
CAC             $8,000      $9,500      +$1,500 (worse)
LTV             $24,000     $22,000     -$2,000 (worse)
LTV:CAC         3.0x        2.3x        -0.7x   (below target)
CAC Payback     12 months   15 months   +3 mo   (worse)

Root cause analysis:
  CAC increase: S&M spend +10%, but new customers -20%
  LTV decrease: higher churn rate (2.5% vs 2.0% budget)
  Action: pause paid marketing spend increase until pipeline converts
```

---

## Monthly Close Process

### Close Calendar

```
Day 1:   Revenue recognized, billing reconciled
Day 2:   AP/AR posted, accruals estimated
Day 3:   Payroll finalized, SBC expense calculated
Day 4:   Departmental expense review
Day 5:   Preliminary P&L to CFO
Day 6:   Variance analysis completed
Day 7:   Management review meeting
Day 8:   Final adjustments
Day 10:  Board package prepared
Day 12:  Board package distributed
```

### Close Checklist

```
Revenue:
  [ ] All invoices for the period issued
  [ ] Revenue recognition applied per ASC 606
  [ ] Deferred revenue schedule updated
  [ ] MRR/ARR reconciled to billing system

Expenses:
  [ ] All vendor invoices received and posted
  [ ] Payroll posted with correct period allocation
  [ ] Accruals posted for incurred-not-invoiced expenses
  [ ] Prepaid expenses amortized
  [ ] Depreciation posted
  [ ] Stock-based compensation expense recorded

Balance Sheet:
  [ ] Bank reconciliation completed
  [ ] AR aging reviewed, bad debt reserve assessed
  [ ] AP aging reviewed
  [ ] Deferred revenue roll-forward reconciled
  [ ] Intercompany balances eliminated (if applicable)

Reconciliation:
  [ ] Balance sheet balances (A = L + E)
  [ ] Cash flow reconciles to bank statements
  [ ] ARR reconciles to billing system
  [ ] Headcount reconciles to HRIS
```

---

## Management Reporting

### Executive Summary Format

```
┌──────────────────────────────────────────────────────────┐
│  FINANCIAL SUMMARY — June 2024                           │
│                                                           │
│  Revenue:  $1.42M vs $1.50M budget (-5.3%)   BELOW PLAN │
│  Gross Margin: 76.2% vs 76.0% budget (+0.2pp) ON PLAN   │
│  OPEX:     $1.38M vs $1.45M budget (-4.8%)   FAVORABLE  │
│  Net Income: $42K vs $25K budget              FAVORABLE  │
│  Cash:     $4.8M (17.2 months runway)        HEALTHY    │
│  ARR:      $17.1M vs $17.5M target (-2.3%)   MONITOR    │
│                                                           │
│  Key Takeaway:                                            │
│  Revenue miss driven by Q2 pipeline weakness in SMB       │
│  segment. Enterprise performing above plan. OPEX savings  │
│  from hiring delays partially offset the revenue miss.    │
│  Net cash position strong.                                │
└──────────────────────────────────────────────────────────┘
```

### Variance Commentary Standards

Good commentary explains **WHY**, not just **WHAT**:

```
BAD:  "Revenue was $80K below budget."
OK:   "Revenue was $80K below budget due to fewer new customers."
GOOD: "Revenue was $80K below budget ($4,500/mo MRR impact) because
       SMB pipeline conversion dropped from 22% to 15% following
       a competitor's pricing reduction in April. Enterprise pipeline
       remains strong. We are implementing a competitive response
       pricing tier (launching August) and expect recovery by Q4."
```

### Dashboard Components

| Component | Metrics | Audience |
|-----------|---------|---------|
| Headline KPIs | ARR, growth rate, runway, headcount | CEO, board |
| Revenue waterfall | New, expansion, churn, net new ARR | VP Sales, CFO |
| P&L summary | Revenue, GM, OPEX, net income vs budget | Leadership team |
| Cash bridge | Beginning cash, inflows, outflows, ending | CFO, CEO |
| Unit economics | CAC, LTV, payback, efficiency | VP Marketing, CFO |
| Departmental | Budget vs actual by department | Department heads |

---

## Forecasting Accuracy Tracking

### Forecast vs Actual Over Time

```
Month    | Forecast | Actual  | Error  | Error %
─────────────────────────────────────────────────
Jan      | $1.30M   | $1.28M  | -$20K  | -1.5%
Feb      | $1.35M   | $1.32M  | -$30K  | -2.2%
Mar      | $1.40M   | $1.38M  | -$20K  | -1.4%
Apr      | $1.45M   | $1.40M  | -$50K  | -3.4%
May      | $1.50M   | $1.42M  | -$80K  | -5.3%
Jun      | $1.55M   | $1.42M  | -$130K | -8.4%

MAPE (Mean Absolute Percentage Error): 3.7%
Bias: consistently over-forecasting (optimistic bias)
```

### Improving Forecast Accuracy

```
Common sources of forecast error:
  1. Pipeline optimism (win rates assumed too high)
  2. Hiring plan delays (roles take 3-6 months to fill)
  3. Expansion assumptions (not all customers expand)
  4. Churn underestimate (especially new segments)
  5. Seasonality not captured

Corrective actions:
  - Use bottoms-up pipeline data, not top-down growth rates
  - Discount hiring plan by historical fill rate
  - Base expansion on observed cohort behavior
  - Track forecast accuracy and adjust for systematic bias
  - Build seasonality into monthly patterns
```

---

## Board Reporting Package

### Standard Board Financial Package

```
1. Executive financial summary (1 page)
2. P&L: budget vs actual, with YTD (1 page)
3. ARR bridge and SaaS metrics (1 page)
4. Cash flow and runway analysis (1 page)
5. Variance commentary (1 page)
6. Updated forecast for remainder of year (1 page)
7. Key risks and mitigations (0.5 page)
8. Asks of the board (0.5 page)
```

---

## Production Checklist

- [ ] Monthly close completed within 10 business days
- [ ] Variance analysis decomposed into volume/price/mix components
- [ ] Commentary explains root causes, not just magnitudes
- [ ] ARR bridge reconciles to billing system
- [ ] Unit economics tracked monthly
- [ ] Management report distributed to leadership by close +7
- [ ] Board package prepared by close +10
- [ ] Forecast accuracy tracked and bias corrected
- [ ] Materiality thresholds defined and escalation process active
- [ ] Quarterly reforecast completed when variances exceed 10%
