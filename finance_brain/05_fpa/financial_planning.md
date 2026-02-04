# Financial Planning — Annual Plans, Forecasting, and Cash Flow Management

## Overview

Financial planning translates business strategy into quantified financial
projections that guide resource allocation, set expectations with stakeholders,
and provide the guardrails for execution. This module covers the annual planning
process, revenue forecasting methodologies (cohort-based, pipeline-based,
driver-based), expense planning, scenario analysis (bull/base/bear), and the
rolling 13-week cash flow forecast that prevents cash crises.

References: Serven & Davis (The Essentials of Finance and Accounting for
Nonfinancial Managers), SaaS Capital (Annual Planning for SaaS Companies),
Bessemer Venture Partners (BVP Cloud Index), CFO Connect best practices.

---

## Annual Planning Process

### Timeline

```
T-3 months:   Kickoff — CEO sets strategic priorities for next year
T-2.5 months: Department heads submit bottom-up forecasts
T-2 months:   Finance consolidates, identifies gaps vs targets
T-1.5 months: Iteration — leadership aligns on targets and trade-offs
T-1 month:    Board approval of annual plan
T-0:          New fiscal year begins
T+1 month:    First month close vs plan comparison
```

### Planning Components

```
┌─────────────────────────────────────────────────┐
│              ANNUAL PLAN                         │
│                                                  │
│  ┌────────────┐  ┌────────────┐  ┌───────────┐ │
│  │  Revenue   │  │  Expense   │  │  Headcount│ │
│  │  Forecast  │  │  Budget    │  │  Plan     │ │
│  └─────┬──────┘  └─────┬──────┘  └─────┬─────┘ │
│        │               │               │        │
│  ┌─────▼───────────────▼───────────────▼─────┐  │
│  │              P&L Projection                │  │
│  └─────────────────┬─────────────────────────┘  │
│                    │                             │
│  ┌─────────────────▼─────────────────────────┐  │
│  │           Cash Flow Forecast               │  │
│  └─────────────────┬─────────────────────────┘  │
│                    │                             │
│  ┌─────────────────▼─────────────────────────┐  │
│  │        Scenario Analysis (Bull/Base/Bear)  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## Revenue Forecasting

### Cohort-Based Forecasting

Best for subscription businesses with predictable retention patterns.

```
Revenue(Month M) = SUM over all cohorts C:
    New_Customers(C) * ARPU(C) * Retention_Rate(C, Age_in_Months)

Example:
  Jan cohort: 100 customers * $200 ARPU * 0.85 retention at M3 = $17,000
  Feb cohort: 120 customers * $200 ARPU * 0.90 retention at M2 = $21,600
  Mar cohort: 150 customers * $200 ARPU * 1.00 retention at M1 = $30,000
  Total March revenue: $68,600

Steps:
1. Forecast new customer acquisition per month
2. Apply historical retention curves by cohort vintage
3. Layer in expansion revenue (ARPU growth over time)
4. Sum across all active cohorts
```

### Pipeline-Based Forecasting

Best for sales-led businesses with a CRM pipeline.

```
Expected Revenue = SUM(Deal_Value * Stage_Probability)

Pipeline Stage     | Deals | Total Value | Win Rate | Expected
────────────────────────────────────────────────────────────
Discovery          |   50  | $2,500,000  |   10%    | $250,000
Qualified          |   30  | $1,800,000  |   25%    | $450,000
Proposal           |   20  | $1,200,000  |   50%    | $600,000
Negotiation        |   10  | $800,000    |   75%    | $600,000
Verbal Commit      |    5  | $400,000    |   90%    | $360,000
────────────────────────────────────────────────────────────
Total Pipeline     |  115  | $6,700,000  |          | $2,260,000
```

### Driver-Based Forecasting

Build revenue from first principles.

```
Revenue = Traffic * Conversion_Rate * ARPU * Retention

Example (SaaS):
  Website visitors/month:     100,000
  Free trial conversion:      5% = 5,000 trials
  Trial to paid conversion:   20% = 1,000 new customers
  Average MRR per customer:   $150
  New MRR per month:          $150,000
  Month-over-month retention: 96%

  Ending MRR at Month 12:
    MRR(12) = SUM_{m=1}^{12} New_MRR(m) * Retention^(12-m)
    = $150K * (1 + 0.96 + 0.96^2 + ... + 0.96^11)
    = $150K * 9.13 = $1,369,500
```

### Revenue Recognition Considerations

```
Bookings ≠ Revenue ≠ Cash

TCV (Total Contract Value): full contract value
ACV (Annual Contract Value): annualized value
Revenue: recognized per ASC 606 (over service period)
Cash: when payment is received

Example: 3-year contract, $360K TCV, paid annually
  ACV: $120K
  Monthly revenue recognized: $10K
  Cash: $120K at signing, $120K at Y2, $120K at Y3
  Deferred revenue at signing: $110K
```

---

## Expense Planning

### Expense Categories

| Category | Components | Planning Method |
|----------|-----------|----------------|
| Headcount | Salaries, benefits, taxes, equity | Bottom-up by role |
| COGS | Hosting, support, professional services | % of revenue |
| Sales & Marketing | SDRs, AEs, marketing, events | Payback-based |
| R&D | Engineers, product, design | Headcount plan |
| G&A | Finance, legal, HR, office, insurance | Fixed + variable |

### Headcount Planning

```
Headcount Cost = Base Salary + Benefits Load + Equity

Benefits load (US): typically 20-30% of base salary
  Health insurance:    ~$15K/person/year
  401K match:          ~3-4% of salary
  Payroll taxes:       ~7.65% (FICA)
  Workers comp:        ~1-2%
  Other benefits:      varies

Fully loaded cost example:
  Software engineer: $180K base
  Benefits load (25%): $45K
  Equity (20% of base): $36K
  Total cost: $261K/year = $21,750/month

Hiring ramp assumption:
  Month hired: 50% productive (onboarding)
  Month 2: 75% productive
  Month 3+: 100% productive
```

### Rule of Thumb Expense Ratios (SaaS at Scale)

```
Revenue allocation (% of revenue):
  COGS:             20-30% (target gross margin 70-80%)
  Sales & Marketing: 30-50% (higher at growth stage)
  R&D:              15-25%
  G&A:              8-15%
  Operating Income: -20% to +20% (depends on growth strategy)
```

---

## Scenario Analysis

### Three Scenarios

```
                Bull Case       Base Case       Bear Case
─────────────────────────────────────────────────────────────
Revenue growth   +50%           +35%            +15%
New customers    180            130             80
NRR              120%           112%            100%
Gross margin     78%            75%             70%
Headcount adds   25             18              8
Ending cash      $8M            $5M             $2M
Runway           24 months      18 months       10 months
Next raise       Optional       Q4 next year    Q2 next year
─────────────────────────────────────────────────────────────

Key assumptions that differ:
  Bull:  Pipeline converts at historical high, expansion accelerates
  Base:  Pipeline converts at historical average, steady execution
  Bear:  Win rates decline 20%, churn increases 2pp, hiring slows
```

### Sensitivity Analysis

```
Revenue sensitivity to key drivers:

Driver               | -20%      | Base     | +20%
─────────────────────────────────────────────────────
New customer count   | -$720K ARR| $3.6M    | +$720K ARR
Win rate             | -$540K ARR| $3.6M    | +$540K ARR
ARPU                 | -$600K ARR| $3.6M    | +$600K ARR
Churn rate           | +$360K ARR| $3.6M    | -$360K ARR

Highest sensitivity: new customer count
Implication: invest in top-of-funnel
```

---

## Rolling 13-Week Cash Flow Forecast

### Purpose

The 13-week cash flow forecast is the most critical short-term financial tool.
It provides week-by-week visibility into cash position, enabling early detection
of cash shortfalls.

### Structure

```
                    Wk1     Wk2     Wk3     Wk4    ... Wk13
───────────────────────────────────────────────────────────
OPENING CASH        $2.0M   $1.85M  $1.72M  $1.60M
───────────────────────────────────────────────────────────
INFLOWS
  Customer payments $120K   $80K    $150K   $90K
  Other income      $5K     $0      $0      $5K
Total inflows       $125K   $80K    $150K   $95K
───────────────────────────────────────────────────────────
OUTFLOWS
  Payroll           $180K   $0      $0      $180K
  Rent              $0      $0      $25K    $0
  AWS/hosting       $0      $35K    $0      $0
  Software/tools    $15K    $0      $0      $15K
  Marketing         $30K    $20K    $20K    $30K
  Professional svcs $10K    $10K    $10K    $10K
  Insurance         $0      $0      $0      $20K
  Other             $5K     $5K     $5K     $5K
Total outflows      $240K   $70K    $60K    $260K
───────────────────────────────────────────────────────────
NET CASH FLOW       ($115K) $10K    $90K    ($165K)
CLOSING CASH        $1.85M  $1.86M  $1.95M  $1.79M
───────────────────────────────────────────────────────────
Min cash threshold: $500K
Weeks above min:    13/13 ✓
```

### Key Rules

1. **Update weekly**: every Monday, roll forward one week
2. **Use actual dates**: payroll hits on specific dates, not evenly spread
3. **Be conservative**: inflows at 80% confidence, outflows at 100%
4. **Flag minimum cash**: set a floor (typically 3 months of burn)
5. **Two versions**: known-committed and best-estimate
6. **Share with board**: when cash < 6 months runway

---

## Budget Management

### Budget vs Actual Tracking

```
Monthly budget review format:

Department: Engineering
Month: June 2024

Category          | Budget  | Actual  | Variance | Var %  | YTD Budget | YTD Actual
─────────────────────────────────────────────────────────────────────────────────────
Headcount (salaries)| $350K  | $340K   | +$10K    | +2.9%  | $2,100K    | $2,050K
Contractors         | $30K   | $45K    | -$15K    | -50%   | $180K      | $210K
AWS/Infrastructure  | $40K   | $42K    | -$2K     | -5%    | $240K      | $245K
Software licenses   | $15K   | $15K    | $0       | 0%     | $90K       | $88K
Total               | $435K  | $442K   | -$7K     | -1.6%  | $2,610K    | $2,593K

Notes: Contractor overage due to Supabase migration (temporary, ending July).
```

### Reforecasting

```
Trigger reforecast when:
  - Revenue is >10% below plan for 2 consecutive months
  - A major strategic change occurs (pivot, new product, M&A)
  - Macroeconomic conditions shift materially
  - Actual burn is >15% above plan

Reforecast process:
  1. Update actuals through current month
  2. Revise assumptions for remaining months
  3. Present to leadership: what changed and why
  4. Board communication if material deviation
  5. Adjust quarterly targets and departmental budgets
```

---

## Key Financial Ratios for Planning

```
Burn Rate = Monthly Cash Outflow - Monthly Cash Inflow
Gross Burn = Total monthly cash outflow (ignoring revenue)
Net Burn = Gross Burn - Revenue (net cash consumption)

Runway = Cash Balance / Net Burn Rate

Operating Leverage = (Revenue Growth %) / (OPEX Growth %)
  > 1.0: scaling efficiently (revenue growing faster than costs)
  < 1.0: scaling inefficiently

Cash Conversion Score = FCF / Net Income
  Measures how well profits convert to actual cash
```

---

## Production Checklist

- [ ] Annual planning timeline established with milestone dates
- [ ] Revenue forecast built with cohort/pipeline/driver methodology
- [ ] Expense budget built bottom-up by department
- [ ] Headcount plan with fully loaded costs and hiring ramps
- [ ] Three scenarios modeled (bull/base/bear)
- [ ] Sensitivity analysis completed for key revenue drivers
- [ ] 13-week cash flow forecast operational and updated weekly
- [ ] Budget vs actual tracking automated monthly
- [ ] Reforecast triggers defined and process documented
- [ ] Board-ready financial package prepared monthly
