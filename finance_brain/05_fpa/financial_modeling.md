# Financial Modeling — Three-Statement, SaaS Architecture, and DCF

## Overview

A financial model is a quantitative representation of a company's financial
performance, built from assumptions that can be stress-tested. This module covers
the three-statement integrated model, SaaS-specific model architecture (the
bookings-to-revenue waterfall), unit economics modeling, sensitivity analysis
construction, and discounted cash flow (DCF) valuation. Every model must be
auditable, assumption-driven, and error-checked.

References: Rosenbaum & Pearl (Investment Banking: Valuation, LBOs, M&A),
Pignataro (Financial Modeling & Valuation), SaaS Capital (Financial Model
Best Practices), McKinsey (Valuation: Measuring and Managing Value).

---

## Three-Statement Model

### Architecture

```
┌────────────────────────────────────────────┐
│           ASSUMPTIONS SHEET                 │
│  (All inputs and drivers in one place)     │
├──────────┬──────────┬──────────────────────┤
│          │          │                       │
│  Income  │ Balance  │   Cash Flow           │
│  Statement│ Sheet   │   Statement           │
│          │          │                       │
│  Revenue │ Assets   │   Operating CF        │
│  - COGS  │ Liabilities│ + Investing CF      │
│  = Gross │ Equity   │   + Financing CF      │
│  - OPEX  │          │   = Net Change Cash   │
│  = EBIT  │          │                       │
│  - Tax   │          │                       │
│  = Net   │          │                       │
│  Income  │          │                       │
└──────────┴──────────┴──────────────────────┘
        │         │         │
        └─────────┼─────────┘
              INTEGRATED
     (Net Income flows to equity and cash)
```

### Income Statement

```
Revenue
  - Cost of Goods Sold (COGS)
────────────────────────────
= Gross Profit
  Gross Margin % = Gross Profit / Revenue

  - Sales & Marketing
  - Research & Development
  - General & Administrative
────────────────────────────
= Operating Income (EBIT)
  Operating Margin % = EBIT / Revenue

  +/- Other Income/Expense
  - Interest Expense
────────────────────────────
= Pre-Tax Income (EBT)

  - Income Tax (effective rate * EBT)
────────────────────────────
= Net Income
  Net Margin % = Net Income / Revenue
```

### Balance Sheet

```
ASSETS
  Current Assets:
    Cash & Cash Equivalents
    Accounts Receivable (Revenue * DSO / 365)
    Prepaid Expenses
  Non-Current Assets:
    Property & Equipment (net of depreciation)
    Intangible Assets
    Goodwill
────────────────────────────
TOTAL ASSETS

LIABILITIES
  Current Liabilities:
    Accounts Payable (COGS * DPO / 365)
    Deferred Revenue (prepaid subscriptions)
    Accrued Expenses
    Short-term Debt
  Non-Current Liabilities:
    Long-term Debt
    Other Long-term Liabilities
────────────────────────────
TOTAL LIABILITIES

EQUITY
  Common Stock
  Additional Paid-In Capital
  Retained Earnings (prior RE + Net Income - Dividends)
────────────────────────────
TOTAL EQUITY

CHECK: Assets = Liabilities + Equity (must balance)
```

### Cash Flow Statement (Indirect Method)

```
OPERATING CASH FLOW
  Net Income
  + Depreciation & Amortization (non-cash)
  + Stock-Based Compensation (non-cash)
  - Increase in Accounts Receivable
  + Increase in Deferred Revenue
  - Increase in Prepaid Expenses
  + Increase in Accounts Payable
  + Increase in Accrued Expenses
  = Cash from Operations (CFO)

INVESTING CASH FLOW
  - Capital Expenditures (CapEx)
  - Acquisitions
  + Proceeds from Asset Sales
  = Cash from Investing (CFI)

FINANCING CASH FLOW
  + Proceeds from Debt Issuance
  - Debt Repayment
  + Proceeds from Equity Issuance
  - Share Repurchases
  - Dividends Paid
  = Cash from Financing (CFF)

NET CHANGE IN CASH = CFO + CFI + CFF
ENDING CASH = Beginning Cash + Net Change in Cash

CHECK: Ending Cash must equal Cash on Balance Sheet
```

---

## SaaS Model Architecture

### Bookings-to-Revenue Waterfall

```
Beginning ARR:           $10,000,000
  + New Business ARR:    $3,000,000
  + Expansion ARR:       $1,500,000
  - Contraction ARR:     ($500,000)
  - Churn ARR:           ($1,000,000)
  = Net New ARR:         $3,000,000
Ending ARR:              $13,000,000
  ARR Growth:            30%

MRR Bridge:
  Beginning MRR:         $833,333
  + New MRR:             $250,000
  + Expansion MRR:       $125,000
  - Contraction MRR:     ($41,667)
  - Churn MRR:           ($83,333)
  = Ending MRR:          $1,083,333
```

### Revenue Recognition from Bookings

```
New booking in January: $120K ACV, 12-month contract, paid annually

Month:  Jan     Feb     Mar    ...    Dec
Revenue: $10K   $10K    $10K   ...    $10K    (recognized monthly)
Cash:    $120K  $0      $0     ...    $0      (paid upfront)
Def Rev: $110K  $100K   $90K   ...    $0      (decreases monthly)
```

### SaaS P&L Model

```
                    Q1        Q2        Q3        Q4        Annual
────────────────────────────────────────────────────────────────────
Subscription Rev    $3,000K   $3,500K   $4,100K   $4,800K   $15,400K
Prof Services Rev   $200K     $250K     $300K     $350K     $1,100K
Total Revenue       $3,200K   $3,750K   $4,400K   $5,150K   $16,500K

Subscription COGS   $600K     $700K     $820K     $960K     $3,080K
PS COGS             $160K     $200K     $240K     $280K     $880K
Total COGS          $760K     $900K     $1,060K   $1,240K   $3,960K

Gross Profit        $2,440K   $2,850K   $3,340K   $3,910K   $12,540K
Gross Margin        76.3%     76.0%     75.9%     75.9%     76.0%

S&M                 $1,200K   $1,350K   $1,500K   $1,650K   $5,700K
R&D                 $800K     $850K     $900K     $950K     $3,500K
G&A                 $400K     $420K     $440K     $460K     $1,720K
Total OPEX          $2,400K   $2,620K   $2,840K   $3,060K   $10,920K

Operating Income    $40K      $230K     $500K     $850K     $1,620K
Operating Margin    1.3%      6.1%      11.4%     16.5%     9.8%
```

---

## Unit Economics

### Customer Acquisition Cost (CAC)

```
CAC = Total Sales & Marketing Expense / New Customers Acquired

Fully loaded CAC includes:
  - Sales team compensation (base + commission + benefits)
  - Marketing spend (paid, content, events)
  - Sales tools and software
  - Allocated overhead

Example:
  S&M spend (Q1): $1,200,000
  New customers (Q1): 120
  CAC: $10,000
```

### Lifetime Value (LTV)

```
LTV = ARPU * Gross Margin % / Monthly Churn Rate

Example:
  ARPU: $500/month
  Gross margin: 80%
  Monthly churn: 2%
  LTV: $500 * 0.80 / 0.02 = $20,000

With discount rate:
  LTV = ARPU * Gross Margin % / (Monthly Churn + Monthly Discount Rate)
  LTV = $500 * 0.80 / (0.02 + 0.0083) = $14,085
```

### Key Ratios

```
LTV:CAC Ratio = LTV / CAC
  Target: > 3.0x
  Below 1.0x: losing money on every customer

CAC Payback = CAC / (ARPU * Gross Margin %)
  Target: < 18 months
  Example: $10,000 / ($500 * 0.80) = 25 months (too long)

Unit Margin = (LTV - CAC) / LTV
  Target: > 60%
```

---

## Sensitivity Analysis

### Two-Variable Data Table

```
                    Monthly Churn Rate
                2.0%    2.5%    3.0%    3.5%    4.0%
ARPU  $300      $12K    $9.6K   $8.0K   $6.9K   $6.0K
      $400      $16K    $12.8K  $10.7K  $9.1K   $8.0K
      $500      $20K    $16.0K  $13.3K  $11.4K  $10.0K
      $600      $24K    $19.2K  $16.0K  $13.7K  $12.0K
      $700      $28K    $22.4K  $18.7K  $16.0K  $14.0K

Cell values = LTV = ARPU * 0.80 / Monthly Churn
Highlighted cell = base case
```

### Tornado Chart (Sensitivity by Driver)

```
Driver              | -20% Impact | +20% Impact | Range
──────────────────────────────────────────────────────────
New customers       | -$720K ARR  | +$720K ARR  | $1,440K
ARPU                | -$600K ARR  | +$600K ARR  | $1,200K
Win rate            | -$540K ARR  | +$540K ARR  | $1,080K
Churn rate          | -$360K ARR  | +$360K ARR  | $720K
Expansion rate      | -$300K ARR  | +$300K ARR  | $600K

Ranked by range (highest sensitivity first)
```

---

## DCF Construction

### Methodology

```
Enterprise Value = SUM_{t=1}^{n} FCF_t / (1+WACC)^t + Terminal Value / (1+WACC)^n

Free Cash Flow (FCF) = EBIT * (1-Tax) + D&A - CapEx - Change in Working Capital

Terminal Value = FCF_n * (1 + g) / (WACC - g)
  where g = long-term growth rate (typically 2-3%)
```

### WACC Calculation

```
WACC = (E/V) * Re + (D/V) * Rd * (1-T)

where:
  E/V = equity weight
  D/V = debt weight
  Re = cost of equity = Rf + Beta * (Rm - Rf)
  Rd = cost of debt
  T = tax rate

For startups (no debt):
  WACC ≈ Re = Rf + Beta * ERP
  Typical startup discount rate: 25-50% (reflects high risk)
```

### DCF Example

```
Year              1       2       3       4       5      Terminal
────────────────────────────────────────────────────────────────
Revenue ($M)     16.5    24.8    34.7    45.1    54.1
EBIT ($M)        1.6     4.0     7.6     11.3    15.0
Tax (25%)        0.4     1.0     1.9     2.8     3.8
NOPAT            1.2     3.0     5.7     8.5     11.3
+ D&A            0.5     0.8     1.0     1.2     1.5
- CapEx          (0.8)   (1.0)   (1.2)   (1.5)   (1.8)
- Change in WC   (0.3)   (0.4)   (0.5)   (0.3)   (0.3)
FCF              0.6     2.4     5.0     7.9     10.7

Terminal Value = $10.7M * 1.03 / (0.12 - 0.03) = $122.5M

PV of FCFs = $0.5 + $1.9 + $3.6 + $5.0 + $6.1 = $17.1M
PV of TV = $122.5M / (1.12)^5 = $69.5M

Enterprise Value = $17.1M + $69.5M = $86.6M
- Net Debt = ($5.0M cash - $0 debt) = $5.0M
Equity Value = $91.6M
```

---

## Model Best Practices

### Structure

```
Tab order:
  1. Cover (model name, version, author, date)
  2. Assumptions (ALL inputs in one place, color-coded)
  3. Revenue model (detailed build-up)
  4. Expense model (by department)
  5. Headcount model (by role)
  6. Income Statement
  7. Balance Sheet
  8. Cash Flow Statement
  9. Unit Economics
  10. Scenarios (bull/base/bear toggle)
  11. Valuation (DCF, comps)
  12. Cap Table (ownership, dilution)
```

### Formatting Standards

| Color | Meaning |
|-------|---------|
| Blue font | Hard-coded input / assumption |
| Black font | Formula / calculated |
| Green font | Link to another sheet |
| Red font | Check / error flag |
| Yellow highlight | Cell requires update |
| Gray background | Historical (actual) data |
| White background | Projected data |

### Error Checks

```
Balance sheet balance check:    Assets - Liabilities - Equity = 0
Cash flow reconciliation:       Beginning Cash + Net CF = Ending Cash
Revenue build-up:               Detail sums to P&L revenue line
Headcount cost:                 Headcount * avg cost = P&L expense
Circular reference:             None (use iterative calculation if needed)
```

---

## Production Checklist

- [ ] Three-statement model integrated and balancing
- [ ] All assumptions isolated on a single sheet
- [ ] SaaS waterfall (bookings -> revenue) reconciles
- [ ] Unit economics computed (CAC, LTV, payback)
- [ ] Sensitivity analysis built for top 5 drivers
- [ ] Scenarios (bull/base/bear) toggle functional
- [ ] DCF valuation complete with terminal value
- [ ] Color coding and formatting standards applied
- [ ] Error checks passing (balance sheet, cash flow)
- [ ] Model reviewed by a second person before distribution
