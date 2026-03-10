# Ratio Analysis

## Foundation

Financial ratio analysis transforms raw financial statements into actionable
intelligence. Ratios provide a standardized language for comparing companies
across size, geography, and time. The CFA Institute organizes ratios into
five categories: liquidity, solvency (leverage), profitability, efficiency
(activity), and valuation. This module covers each with formulas, benchmarks,
and interpretation frameworks.

Reference: CFA Level I, Financial Reporting and Analysis. Brealey/Myers/Allen,
Principles of Corporate Finance, Chapter 28. Damodaran, Investment Valuation,
Chapter 3.

---

## Category 1: Liquidity Ratios

Measure the company's ability to meet short-term obligations.

### Current Ratio

```
Current Ratio = Current Assets / Current Liabilities
```

| Range | Interpretation |
|-------|---------------|
| > 2.0 | Strong liquidity, possibly inefficient asset use |
| 1.5 - 2.0 | Healthy |
| 1.0 - 1.5 | Adequate but monitor closely |
| < 1.0 | Potential liquidity risk |

**SaaS Adjustment:** Deferred revenue inflates current liabilities but is not a
cash obligation. Adjusted current ratio excludes deferred revenue from CL.

### Quick Ratio (Acid Test)

```
Quick Ratio = (Cash + Short-Term Investments + Accounts Receivable) / Current Liabilities
```

More conservative: excludes inventory and prepaid expenses. For SaaS companies,
the quick ratio is often close to the current ratio (minimal inventory).

### Cash Ratio

```
Cash Ratio = (Cash + Cash Equivalents) / Current Liabilities
```

The most conservative liquidity measure. Shows immediate payment capacity.

### Operating Cash Flow Ratio

```
OCF Ratio = Operating Cash Flow / Current Liabilities
```

Uses actual cash generation rather than balance sheet snapshots. More reliable
for assessing ongoing ability to cover obligations.

---

## Category 2: Solvency / Leverage Ratios

Measure the company's long-term financial stability and capital structure.

### Debt-to-Equity Ratio

```
D/E = Total Debt / Total Shareholders' Equity
```

For WACC calculations, use market values:
```
D/E (market) = Market Value of Debt / Market Value of Equity
```

| Range | Interpretation |
|-------|---------------|
| 0 - 0.5 | Conservative, low financial risk |
| 0.5 - 1.0 | Moderate leverage |
| 1.0 - 2.0 | Significant leverage |
| > 2.0 | Highly leveraged, elevated risk |

### Debt-to-Capital Ratio

```
D/C = Total Debt / (Total Debt + Total Equity)
```

Ranges from 0 to 1. More intuitive than D/E for expressing capital structure.

### Interest Coverage Ratio

```
Interest Coverage = EBIT / Interest Expense
```

Critical for debt capacity analysis and credit rating estimation.

| Coverage | Implied Rating (Damodaran) | Spread |
|----------|---------------------------|--------|
| > 12.5 | AAA | 0.63% |
| 9.5 - 12.5 | AA | 0.78% |
| 7.5 - 9.5 | A+ | 0.98% |
| 6.0 - 7.5 | A | 1.13% |
| 4.5 - 6.0 | A- | 1.27% |
| 3.5 - 4.5 | BBB | 1.56% |
| 2.5 - 3.5 | BB+ | 2.00% |
| 2.0 - 2.5 | BB | 2.50% |
| 1.5 - 2.0 | B+ | 3.25% |
| 1.0 - 1.5 | B | 4.00% |
| 0.5 - 1.0 | CCC | 7.00% |
| < 0.5 | D | 12.00% |

### Debt Service Coverage Ratio (DSCR)

```
DSCR = (EBITDA - CapEx - Taxes) / (Interest + Principal Repayment)
```

Lenders typically require DSCR > 1.2x for term loans. Covenants often specify
minimum DSCR levels.

### Net Debt

```
Net Debt = Total Debt - Cash and Cash Equivalents
Net Debt / EBITDA = enterprise leverage measure
```

Negative net debt means the company has more cash than debt.

---

## Category 3: Profitability Ratios

Measure the company's ability to generate profits from its operations.

### Gross Margin

```
Gross Margin = (Revenue - COGS) / Revenue * 100%
```

| Business Type | Typical Gross Margin |
|--------------|---------------------|
| SaaS | 70-85% |
| Marketplace | 40-70% |
| E-commerce | 25-45% |
| Hardware | 30-50% |
| Professional Services | 30-50% |

### Operating Margin (EBIT Margin)

```
Operating Margin = EBIT / Revenue * 100%
```

Shows profitability from core operations before interest and taxes. At scale,
best-in-class SaaS: 20-30% operating margin.

### EBITDA Margin

```
EBITDA Margin = EBITDA / Revenue * 100%
```

```
EBITDA = Net Income + Interest + Taxes + Depreciation + Amortization
       = EBIT + D&A
       = Operating Income + D&A
```

EBITDA is a proxy for operating cash flow but imperfect (ignores working capital
changes and CapEx). Widely used in valuation multiples.

### Net Profit Margin

```
Net Margin = Net Income / Revenue * 100%
```

Bottom-line profitability after all expenses, interest, and taxes.

### Return on Equity (ROE)

```
ROE = Net Income / Average Shareholders' Equity * 100%
```

### DuPont Decomposition (3-Factor)

```
ROE = Net Margin * Asset Turnover * Equity Multiplier

Where:
  Net Margin = Net Income / Revenue
  Asset Turnover = Revenue / Average Total Assets
  Equity Multiplier = Average Total Assets / Average Equity
```

This decomposition reveals whether ROE is driven by profitability (margin),
efficiency (turnover), or leverage (multiplier).

### DuPont Decomposition (5-Factor)

```
ROE = (EBT/EBIT) * (EBIT/Revenue) * (Revenue/Assets) * (Assets/Equity) * (NI/EBT)

     = Tax Burden * Interest Burden * Operating Margin * Asset Turnover * Equity Multiplier
```

### Return on Assets (ROA)

```
ROA = Net Income / Average Total Assets * 100%
```

Measures how efficiently the company uses its asset base to generate profit.
Unlevered measure (not affected by capital structure).

### Return on Invested Capital (ROIC)

```
ROIC = NOPAT / Invested Capital

Where:
  NOPAT = EBIT * (1 - Tax Rate) = Net Operating Profit After Tax
  Invested Capital = Total Equity + Total Debt - Cash
                   = Net Working Capital + Net Fixed Assets + Goodwill + Intangibles
```

ROIC is the best single measure of operational value creation. Per McKinsey
(Koller/Goedhart/Wessels), value is created when ROIC > WACC.

```
Economic Profit = Invested Capital * (ROIC - WACC)
```

---

## Category 4: Efficiency / Activity Ratios

Measure how effectively the company uses its assets.

### Accounts Receivable Turnover and DSO

```
AR Turnover = Revenue / Average Accounts Receivable
DSO = 365 / AR Turnover = Average AR / (Revenue / 365)
```

Lower DSO = faster collections. SaaS benchmark: 30-45 days.

### Accounts Payable Turnover and DPO

```
AP Turnover = COGS / Average Accounts Payable
DPO = 365 / AP Turnover
```

Higher DPO = slower payments to vendors (preserves cash but may strain
relationships).

### Inventory Turnover and DIO

```
Inventory Turnover = COGS / Average Inventory
DIO = 365 / Inventory Turnover
```

Less relevant for SaaS but critical for hardware/physical goods companies.

### Cash Conversion Cycle (CCC)

```
CCC = DSO + DIO - DPO
```

The number of days between paying for inputs and collecting from customers.
Negative CCC (like Amazon) means the company is funded by its suppliers.

### Asset Turnover

```
Asset Turnover = Revenue / Average Total Assets
```

Higher is better -- more revenue generated per dollar of assets.

### Fixed Asset Turnover

```
Fixed Asset Turnover = Revenue / Average Net Fixed Assets
```

For asset-light SaaS companies, this ratio is typically very high.

---

## Category 5: Valuation Ratios

Bridge financial performance to market value. Used primarily for relative
valuation (see 03_valuation/relative_valuation.md for deep dive).

### Price-to-Earnings (P/E)

```
P/E = Stock Price / Earnings Per Share
    = Market Capitalization / Net Income
```

### Enterprise Value / EBITDA

```
EV/EBITDA = Enterprise Value / EBITDA
```

Capital-structure neutral. The workhorse multiple for M&A.

### Enterprise Value / Revenue

```
EV/Revenue = Enterprise Value / Total Revenue
```

Used for high-growth and unprofitable companies. Standard for SaaS.

### Price-to-Book (P/B)

```
P/B = Market Cap / Book Value of Equity
```

### PEG Ratio

```
PEG = (P/E) / Earnings Growth Rate (%)
```

PEG < 1 suggests undervaluation relative to growth. PEG > 1 may suggest
overvaluation. Peter Lynch popularized this heuristic.

---

## Ratio Analysis Framework

### Step 1: Calculate Current Period Ratios

Compute all relevant ratios for the most recent period.

### Step 2: Trend Analysis (Time Series)

Compare ratios across 4-8 quarters or 3-5 years. Look for:
- Improving or deteriorating trends
- Inflection points coinciding with strategic changes
- Seasonal patterns (especially in revenue and working capital)

### Step 3: Peer Comparison (Cross-Sectional)

Compare against:
- Direct competitors (same business model, similar stage)
- Industry medians (from databases: Capital IQ, PitchBook, public filings)
- Best-in-class benchmarks (top quartile of peer set)

### Step 4: Diagnostic Interpretation

Ratios do not exist in isolation. Interpret them as a system:

```
Declining Gross Margin + Rising Revenue Growth
  -> Possible: pricing pressure, mix shift to lower-margin products
  -> Investigate: customer segment analysis, product-level margin

Rising DSO + Stable Revenue
  -> Possible: collection deterioration, customer credit issues
  -> Investigate: AR aging report, largest customer payment patterns

ROIC < WACC + Positive Revenue Growth
  -> Possible: growth is value-destructive
  -> Investigate: unit economics, marginal ROIC on incremental investment
```

### Step 5: Red Flag Detection

| Red Flag | What It Means | Follow-Up |
|----------|--------------|-----------|
| Revenue growing, OCF declining | Earnings quality issue | Examine accruals |
| AR growing faster than revenue | Collection or recognition issue | AR aging analysis |
| Gross margin declining | Pricing power erosion | Unit economics deep dive |
| Interest coverage < 2x | Debt servicing stress | Cash flow forecast |
| Negative working capital trend | Liquidity risk building | 13-week cash flow |
| ROIC declining while revenue grows | Inefficient capital deployment | Segment ROIC |

---

## Ratio Dashboard Template

For board reporting and management review, present ratios in this format:

```
FINANCIAL HEALTH DASHBOARD -- Q4 2024

                          Q4 2024   Q3 2024   Q4 2023   Peer Median
                          -------   -------   -------   -----------
LIQUIDITY
  Current Ratio              2.1x     1.9x      1.7x       1.8x
  Quick Ratio                1.8x     1.6x      1.4x       1.5x
  Cash Ratio                 1.2x     1.1x      0.9x       0.8x

LEVERAGE
  D/E Ratio                 0.25x    0.28x     0.35x      0.40x
  Net Debt / EBITDA        -1.5x    -1.2x     -0.8x       1.2x
  Interest Coverage         10.0x     8.5x      6.0x       7.5x

PROFITABILITY
  Gross Margin              84.8%    83.5%     82.0%      78.0%
  Operating Margin           8.7%     5.2%      2.1%       5.0%
  EBITDA Margin             17.4%    14.0%     11.5%      15.0%
  ROIC                      12.5%    10.0%      7.5%      10.0%

EFFICIENCY
  DSO                      45 days  48 days   52 days    40 days
  Cash Conversion Cycle    -15 days -12 days   -8 days   -10 days

VALUATION
  EV/Revenue                8.5x     7.2x      6.0x       6.5x
  EV/EBITDA                48.9x    51.4x     52.2x      43.3x
```

---

## Limitations of Ratio Analysis

1. **Accounting policy differences**: Ratios are only comparable when accounting
   policies are consistent. GAAP vs. IFRS, capitalization vs. expensing choices,
   and revenue recognition timing all affect ratios.

2. **Point-in-time snapshots**: Balance sheet ratios reflect a single day. A
   company can manage period-end balances (window dressing).

3. **Industry context required**: A 2x D/E ratio is dangerous for a tech company
   but normal for a utility. Always interpret within industry context.

4. **Backward-looking**: Ratios describe the past. Combine with forward-looking
   metrics (backlog, pipeline, bookings) for a complete picture.

5. **Non-GAAP adjustments**: When comparing companies, ensure consistent treatment
   of SBC, restructuring charges, and other non-GAAP adjustments.

---

**Ratios are the diagnostic tools of finance. Like vital signs in medicine, no
single ratio tells the whole story -- but together they reveal the patient's
health with remarkable clarity.**
