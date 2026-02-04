# Financial Modeling

## Foundation

A financial model is a mathematical representation of a company's financial
performance. The integrated 3-statement model is the workhorse of corporate
finance: it connects the income statement, balance sheet, and cash flow statement
through a system of formulas driven by explicit assumptions. This module covers
model architecture, best practices, and the major model types used in valuation,
fundraising, and strategic planning.

Reference: Rosenbaum & Pearl, Investment Banking (3rd Edition). Koller/Goedhart/
Wessels, Valuation (McKinsey, 7th Edition). Damodaran, Investment Valuation.

---

## Model Architecture Principles

### The Three Zones

Every well-built financial model separates content into three zones:

```
ZONE 1: INPUTS (Assumptions)
  - Revenue drivers, growth rates, margins
  - Clearly labeled, easy to change
  - Color coded BLUE in spreadsheets
  - All in one section or tab

ZONE 2: CALCULATIONS (Engine)
  - Formulas that transform inputs into outputs
  - No hard-coded numbers (reference inputs only)
  - Color coded BLACK in spreadsheets
  - Intermediate calculations visible

ZONE 3: OUTPUTS (Results)
  - Financial statements, charts, summaries
  - Formatted for presentation
  - Color coded GREEN for links to other sheets
  - Dashboard or summary tab
```

### Best Practices (Per Investment Banking Standards)

1. **One formula per row**: Each row should use a single formula copied across
   columns (time periods). No column-specific formulas.
2. **No circular references**: Avoid iterative calculations. If interest expense
   depends on debt, which depends on cash, which depends on interest, break the
   circularity with a prior-period balance or a circularity switch.
3. **Error checks on every sheet**: Add a row that tests whether balance sheet
   balances, cash reconciles, and key relationships hold.
4. **Sign convention**: Be consistent. Either all expenses are negative, or all
   expenses are positive with subtraction in formulas. Never mix.
5. **Units row**: Include a row specifying units ($000s, %, #, days) for every section.
6. **Time period consistency**: Label columns clearly (FY2023A, FY2024E, FY2025E).
   "A" for actual, "E" for estimated, "P" for projected.
7. **Version control**: Include model version, date, and author in the header.

---

## The Integrated 3-Statement Model

### Architecture

```
Tab: Assumptions
  Revenue drivers
  Operating expense assumptions
  Working capital assumptions
  CapEx and depreciation assumptions
  Debt and equity assumptions
  Tax assumptions

Tab: Income Statement
  Revenue build-up
  COGS and gross profit
  Operating expenses by category
  EBIT, EBT, net income
  EPS calculation

Tab: Balance Sheet
  Current assets
  Non-current assets
  Current liabilities
  Non-current liabilities
  Shareholders' equity
  Balance check row

Tab: Cash Flow Statement
  Operating activities (indirect method)
  Investing activities
  Financing activities
  Net change in cash
  Cash reconciliation check

Tab: Supporting Schedules
  Debt schedule (borrowings, repayments, interest)
  Depreciation schedule (by asset category)
  Working capital schedule (DSO, DPO, DIO drivers)
  Share count schedule (options, dilution)
  Tax schedule (current, deferred, effective rate)

Tab: Output / Dashboard
  Key metrics summary
  Valuation summary
  Scenario comparison
  Charts and graphs
```

### Building Sequence

Build the model in this order to ensure proper linkages:

```
Step 1: Set up time periods and structure
Step 2: Build revenue model (top-down or bottoms-up)
Step 3: Build COGS and gross profit
Step 4: Build operating expenses
Step 5: Complete income statement through net income
Step 6: Build working capital schedule
Step 7: Build CapEx and depreciation schedule
Step 8: Build balance sheet (assets, then liabilities, then equity)
Step 9: Build cash flow statement (verify cash reconciles to BS)
Step 10: Build debt schedule (if needed)
Step 11: Add error checks on every sheet
Step 12: Build output/dashboard tab
Step 13: Build scenario manager
```

---

## Revenue Modeling Approaches

### Top-Down Revenue Model

```
Total Addressable Market (TAM)              $50,000,000,000
  x Serviceable Addressable Market (SAM)            10%
  = SAM                                      $5,000,000,000
  x Market Share (Year 5)                           0.5%
  = Revenue Target                             $25,000,000
```

Useful for: investor presentations, sanity-checking bottoms-up models.
Weakness: imprecise, requires strong market sizing data.

### Bottoms-Up Revenue Model (SaaS)

```
Beginning Customers                               1,000
  + New Customers (from pipeline conversion)         300
  - Churned Customers (logo churn rate * beginning)  (80)
  = Ending Customers                               1,220

Revenue Build:
  Beginning MRR (beginning customers * ARPU)   $100,000
  + New MRR (new customers * ARPU)               30,000
  + Expansion MRR (upsell rate * beginning MRR)  10,000
  - Contraction MRR (downgrade rate * beg MRR)   (3,000)
  - Churned MRR (churn rate * beginning MRR)     (5,000)
  = Ending MRR                                  $132,000

  Monthly Revenue = Average MRR * months
  Annual Revenue = Ending MRR * 12 (run-rate) or sum of monthly MRR
```

### Cohort-Based Revenue Model

Track each customer cohort separately through time:

```
Cohort: Q1 2024 Customers (100 customers, $100 ARPU)

         Month 1  Month 2  Month 3  ...  Month 12  Month 24
Cust:      100      97       94           82         71
ARPU:     $100    $102     $104          $115       $130
MRR:    $10,000  $9,894   $9,776       $9,430     $9,230

Retention:  --    97.0%    96.9%         89.1%      77.4%
NRR:        --   98.9%    98.8%        103.2%     105.5%
```

Most sophisticated approach. Required for accurate SaaS forecasting.

---

## Operating Expense Modeling

### Driver-Based Expense Modeling

Tie expenses to operational drivers rather than arbitrary growth rates:

```
Engineering Headcount (driver: product roadmap)
  x Average Fully-Loaded Cost per Engineer
  = Engineering Personnel Cost

Sales Headcount (driver: revenue target / quota)
  Revenue Target: $20,000,000
  Average Quota: $500,000
  Quota Attainment: 80%
  Required Sales Reps: $20M / ($500K * 80%) = 50 reps
  x Average OTE: $150,000
  x OTE Ratio at Attainment: 100%
  = Sales Personnel Cost: $7,500,000

Marketing Spend (driver: target CAC and new customer target)
  New Customer Target: 500
  Target Blended CAC: $5,000
  Required Marketing Spend: $2,500,000

Infrastructure (driver: revenue or usage volume)
  Revenue: $20,000,000
  Hosting as % of Revenue: 8%
  Infrastructure Cost: $1,600,000
```

### Headcount Planning Model

```
Department    Q1 HC  Q2 HC  Q3 HC  Q4 HC  Avg HC  Avg Cost  Total
Engineering     40     45     48     52    46.25  $180,000  $8,325,000
Sales           30     35     40     45    37.50  $150,000  $5,625,000
Marketing       10     12     12     14    12.00  $140,000  $1,680,000
G&A             15     16     17     18    16.50  $130,000  $2,145,000
CS/Support      12     14     16     18    15.00  $100,000  $1,500,000
                                                           ----------
Total          107    122    133    147   127.25           $19,275,000

Add: Benefits and Taxes (25% of salary)                     $4,818,750
Add: Stock-Based Compensation                               $2,500,000
                                                           ----------
Total People Cost                                          $26,593,750
```

---

## DCF Model Structure

### FCFF-Based DCF

```
INCOME APPROACH:
                        Year 1     Year 2     Year 3     Year 4     Year 5
Revenue               $20.0M     $28.0M     $37.8M     $49.1M     $61.4M
  Growth Rate           40%        40%        35%        30%        25%
EBITDA                 $2.0M      $4.2M      $7.6M     $11.8M     $16.0M
  Margin               10.0%      15.0%      20.0%      24.0%      26.0%
D&A                   ($0.5M)    ($0.7M)    ($0.9M)    ($1.2M)    ($1.5M)
EBIT                   $1.5M      $3.5M      $6.7M     $10.6M     $14.5M
Taxes (21%)           ($0.3M)    ($0.7M)    ($1.4M)    ($2.2M)    ($3.0M)
NOPAT                  $1.2M      $2.8M      $5.3M      $8.4M     $11.5M
+ D&A                  $0.5M      $0.7M      $0.9M      $1.2M      $1.5M
- CapEx               ($0.8M)    ($1.1M)    ($1.5M)    ($2.0M)    ($2.5M)
- Change in NWC       ($0.4M)    ($0.5M)    ($0.6M)    ($0.7M)    ($0.8M)
                      -------    -------    -------    -------    -------
FCFF                   $0.5M      $1.9M      $4.1M      $6.9M      $9.7M

Discount Factor        0.909      0.826      0.751      0.683      0.621
  (at WACC = 10%)
PV of FCFF             $0.5M      $1.6M      $3.1M      $4.7M      $6.0M

Sum of PV of FCFF:    $15.9M

Terminal Value (Gordon Growth, g=3%):
  TV = FCFF_5 * (1+g) / (WACC - g) = $9.7M * 1.03 / (0.10 - 0.03) = $142.7M
  PV of TV = $142.7M * 0.621 = $88.6M

Enterprise Value = $15.9M + $88.6M = $104.5M
- Net Debt = ($5.0M)
+ Cash = $10.0M
Equity Value = $109.5M
```

---

## Comparable Company Analysis Model

### Structure

```
TRADING COMPARABLES:

Company    EV/Rev  EV/Rev  EV/EBITDA  Rev Growth  EBITDA Margin  Rule of 40
           LTM     NTM     NTM        NTM         NTM
Comp A     12.5x   9.8x    45.0x      28%          22%            50
Comp B      8.2x   6.5x    35.0x      22%          19%            41
Comp C     15.0x  11.2x    55.0x      35%          20%            55
Comp D      6.0x   5.0x    28.0x      18%          18%            36
Comp E     10.0x   7.5x    40.0x      25%          20%            45

Mean        10.3x   8.0x   40.6x      25.6%        19.8%          45.4
Median      10.0x   7.5x   40.0x      25.0%        20.0%          45.0
25th Pctl    7.1x   5.8x   31.5x      20.0%        18.5%          38.5
75th Pctl   11.3x   8.7x   42.5x      26.5%        20.5%          47.5

Target Revenue (NTM): $28.0M
Applied Multiple Range: 7.5x - 10.0x (median to 75th percentile)
Implied EV Range: $210M - $280M
```

---

## Scenario Analysis Framework

### Three-Scenario Standard

```
                    Bear Case    Base Case    Bull Case
Revenue Growth         15%          30%          45%
Gross Margin          78%          83%          85%
Operating Margin      -5%           8%          18%
FCFF (Year 5)       ($2M)         $9.7M       $22M
Terminal Growth        2%           3%           3.5%
WACC                  12%          10%           9%

Enterprise Value     $45M        $104.5M      $220M
Probability           25%          50%          25%

Expected Value = 0.25*$45M + 0.50*$104.5M + 0.25*$220M = $118.5M
```

### Sensitivity Table (Data Table)

```
Enterprise Value Sensitivity to WACC and Terminal Growth Rate:

WACC -->      8.0%     9.0%    10.0%    11.0%    12.0%
g = 1.5%    $98.0M   $82.5M   $70.5M   $61.0M   $53.5M
g = 2.0%   $108.0M   $89.5M   $76.0M   $65.0M   $57.0M
g = 2.5%   $120.5M   $98.0M   $82.0M   $70.0M   $60.5M
g = 3.0%   $137.0M  $109.0M  $104.5M   $75.5M   $64.5M
g = 3.5%   $158.5M  $123.0M   $99.5M   $82.5M   $70.0M

Shaded region = reasonable range (WACC 9-11%, g 2-3%)
```

---

## Model Audit Checklist

Before delivering any financial model, verify:

```
STRUCTURAL CHECKS
[ ] Balance sheet balances in every period
[ ] Cash flow statement reconciles to balance sheet cash
[ ] Retained earnings roll forward correctly
[ ] Debt schedule reconciles to balance sheet debt
[ ] Share count schedule reconciles to equity section
[ ] No circular references (or circularity switch exists and is documented)

FORMULA CHECKS
[ ] One formula per row, copied across columns
[ ] No hard-coded numbers in formula cells
[ ] All inputs are clearly labeled and in the assumptions section
[ ] Error check row on every tab shows PASS

ASSUMPTION CHECKS
[ ] All assumptions documented with source or rationale
[ ] Growth rates are reasonable relative to market size
[ ] Margins converge to sustainable levels in terminal year
[ ] Working capital assumptions are consistent with industry
[ ] CapEx is sufficient to support projected growth
[ ] Tax rate is appropriate for entity structure

OUTPUT CHECKS
[ ] Terminal value is < 75% of total enterprise value (if > 75%, extend forecast)
[ ] WACC components are individually defensible
[ ] Implied multiples from DCF are within reasonable range of comparables
[ ] Scenario analysis covers meaningful range of outcomes
```

---

## Common Modeling Errors

| Error | Consequence | Prevention |
|-------|------------|------------|
| Forgetting SBC in FCFF | Overstates FCF | Always subtract SBC or treat consistently |
| Double-counting cash in EV-to-equity bridge | Understates/overstates equity value | Verify: EV - net debt = equity value |
| Using book value for WACC weights | Incorrect WACC | Use market values for E and D |
| Terminal growth > GDP growth | Unrealistic terminal value | Cap terminal growth at 2-3% |
| Inconsistent units | Model errors | Units row on every schedule |
| Mixing calendar year and fiscal year | Misalignment | Clearly label all periods |

---

**A financial model is not a forecast -- it is a framework for thinking about
the future. The value lies not in the output number but in the discipline of
making every assumption explicit and testable.**
