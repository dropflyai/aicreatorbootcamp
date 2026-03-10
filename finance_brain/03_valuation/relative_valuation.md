# Relative Valuation

## Foundation

Relative valuation -- also called multiples-based valuation or market approach --
determines a company's value by comparing it to similar companies using
standardized ratios. While DCF derives intrinsic value from fundamentals,
relative valuation derives value from what the market is willing to pay for
comparable assets. Both methods are essential; neither is sufficient alone.

Reference: Damodaran, The Little Book of Valuation, Chapters 7-9. Damodaran,
Investment Valuation, Chapters 17-20. Rosenbaum & Pearl, Investment Banking,
Chapters 1-3. CFA Level II, Equity Valuation.

---

## The Four Steps of Relative Valuation

Per Damodaran:

1. **Define the multiple** (what is being compared to what)
2. **Describe the distribution** (what does the multiple look like across companies)
3. **Analyze the fundamentals** (what drives the multiple)
4. **Apply to the target** (select and apply the appropriate multiple)

Each step must be executed rigorously to avoid the garbage-in, garbage-out problem
that plagues sloppy comp analysis.

---

## Enterprise Value Multiples

Enterprise value multiples are capital-structure neutral and compare firm-level
metrics. They are the preferred multiples for most valuation work.

### EV / Revenue

```
EV/Revenue = Enterprise Value / Total Revenue (LTM or NTM)
```

**When to use:**
- Unprofitable companies (no meaningful earnings to capitalize)
- High-growth companies where current margins are depressed by investment
- SaaS and technology companies (most common multiple for pre-profit SaaS)

**Fundamental drivers (per Damodaran):**

```
For a stable-growth firm:
  EV/Revenue = Operating Margin * (1-T) * (1-g/ROIC) / (WACC - g)

This shows that EV/Revenue is driven by:
  1. Operating margin (higher margin = higher multiple)
  2. Growth rate (higher growth = higher multiple)
  3. ROIC (higher returns on capital = higher multiple)
  4. WACC (lower risk = higher multiple)
```

**SaaS EV/Revenue Benchmarks (2024 ranges):**

| Growth Profile | Revenue Growth | EV/NTM Revenue |
|---------------|---------------|----------------|
| Hyper-growth | > 40% | 15-30x |
| High-growth | 25-40% | 8-15x |
| Moderate-growth | 15-25% | 5-8x |
| Low-growth | < 15% | 3-5x |

### EV / EBITDA

```
EV/EBITDA = Enterprise Value / EBITDA (LTM or NTM)
```

**The workhorse multiple for M&A.** EBITDA is a proxy for operating cash flow
before reinvestment. Capital-structure neutral (enterprise-level) and tax-neutral.

**Fundamental drivers:**
```
EV/EBITDA = (1-T) * (1-g/ROIC) / (WACC - g)
          + (D&A/EBITDA) * T / (WACC - g)
```

**Industry Benchmarks (approximate NTM ranges):**

| Industry | EV/EBITDA Range | Median |
|----------|----------------|--------|
| SaaS (high-growth) | 25-50x | 35x |
| SaaS (moderate) | 15-25x | 20x |
| Enterprise software | 15-30x | 22x |
| Fintech | 15-35x | 20x |
| E-commerce | 10-20x | 15x |
| Industrial | 8-14x | 10x |
| Retail | 6-12x | 8x |
| Financial services | 8-15x | 10x |

### EV / EBIT

```
EV/EBIT = Enterprise Value / EBIT
```

More conservative than EV/EBITDA because it includes D&A. Useful for capital-
intensive businesses where D&A is a meaningful proxy for required reinvestment.

### EV / Invested Capital

```
EV/IC = Enterprise Value / Invested Capital
```

Related to ROIC:
```
EV/IC = (ROIC - g) / (WACC - g)

If ROIC = WACC, then EV/IC = 1 (no value creation above cost of capital)
If ROIC > WACC, then EV/IC > 1 (value creation)
```

---

## Equity Value Multiples

Equity multiples reflect the residual value to shareholders after debt claims.
They are affected by capital structure.

### Price / Earnings (P/E)

```
P/E = Stock Price / Earnings Per Share
    = Market Cap / Net Income
```

**Fundamental drivers (Gordon Growth Model derivation):**
```
P/E = Payout Ratio / (R_e - g)
    = (1 - Retention Rate) / (R_e - g)
    = (1 - g/ROE) / (R_e - g)
```

This reveals that P/E is driven by:
1. **Growth rate (g)**: higher growth = higher P/E
2. **Risk (R_e)**: higher risk = lower P/E
3. **ROE**: higher returns on equity = higher P/E

**Variants:**
- Trailing P/E: market cap / last 12 months earnings
- Forward P/E: market cap / next 12 months estimated earnings
- Cyclically Adjusted P/E (CAPE/Shiller P/E): price / 10-year average real earnings

### PEG Ratio

```
PEG = P/E / Expected Earnings Growth Rate (%)
```

Normalizes the P/E ratio for growth. Per Peter Lynch:
- PEG < 1.0: potentially undervalued relative to growth
- PEG = 1.0: fairly valued
- PEG > 1.0: potentially overvalued relative to growth

Limitations: assumes linear relationship between P/E and growth (empirically
holds roughly but not precisely); sensitive to which growth rate is used.

### Price / Book (P/B)

```
P/B = Market Cap / Book Value of Equity
```

**Fundamental drivers:**
```
P/B = (ROE - g) / (R_e - g)

If ROE = R_e, then P/B = 1 (company earns its cost of equity)
If ROE > R_e, then P/B > 1 (company creates value)
If ROE < R_e, then P/B < 1 (company destroys value)
```

Most useful for financial institutions and asset-heavy businesses.

### Price / Free Cash Flow

```
P/FCF = Market Cap / Free Cash Flow to Equity
```

Preferred over P/E when earnings are distorted by non-cash items.

---

## Comparable Company Analysis (Trading Comps)

### Step 1: Select Comparable Companies

**Criteria for selecting comps:**
1. **Industry**: Same or closely related industry
2. **Business model**: Similar revenue model (SaaS vs. services vs. hardware)
3. **Size**: Within a reasonable size range (0.5x to 3x revenue as a guideline)
4. **Growth profile**: Similar revenue growth rate (+/- 10pp)
5. **Profitability**: Similar margin profile
6. **Geography**: Similar geographic exposure
7. **Stage**: Similar maturity (growth vs. mature)

Aim for 5-10 comparable companies. More is better for statistical reliability,
but relevance trumps quantity.

### Step 2: Calculate Multiples

For each comparable company, calculate:

```
COMPARABLE COMPANY ANALYSIS:

Company    EV      Rev     EBITDA   EV/Rev  EV/Rev  EV/EBITDA  Rev     EBITDA
          ($M)    LTM($M)  LTM($M)  LTM     NTM     NTM       Growth  Margin
--------  ------  -------  -------  ------  ------  ---------  ------  ------
Comp A    $2,500  $250     $50      10.0x    8.0x    40.0x      25%     20%
Comp B    $1,800  $200     $30       9.0x    7.0x    42.0x      28%     15%
Comp C    $3,200  $350     $70       9.1x    7.2x    36.0x      26%     20%
Comp D    $1,200  $180     $36       6.7x    5.5x    28.0x      18%     20%
Comp E    $4,000  $400     $60      10.0x    7.7x    46.0x      30%     15%
Comp F    $2,000  $250     $50       8.0x    6.3x    32.0x      22%     20%

Mean                                 8.8x    6.9x    37.3x      24.8%   18.3%
Median                               9.1x    7.1x    38.0x      25.5%   20.0%
25th Pctl                            7.7x    6.1x    31.0x      21.0%   15.0%
75th Pctl                            9.8x    7.6x    42.5x      27.5%   20.0%
```

### Step 3: Select the Appropriate Multiple

Do NOT blindly apply the median. Consider:

1. **Where does the target fall relative to comps on key metrics?**
   - If target growth > median comp growth: apply multiple above median
   - If target margins < median comp margins: apply multiple below median

2. **Regression-based approach (Damodaran):**
   ```
   EV/Revenue = a + b * Revenue Growth + c * EBITDA Margin
   ```
   Regress multiple against fundamental drivers across comp set, then plug in
   target's metrics to estimate the appropriate multiple.

3. **Rule of 40 adjustment for SaaS:**
   ```
   Implied Multiple = Base Multiple * (Target Rule of 40 / Median Rule of 40)
   ```

### Step 4: Apply to Target

```
TARGET VALUATION:

Target NTM Revenue: $30,000,000

Selected Multiple Range: 6.5x - 8.0x (25th to 75th percentile of NTM comps)
Justified by: Target growth of 30% (above median), margins of 15% (below median)

Implied Enterprise Value:
  Low:  $30M * 6.5x = $195,000,000
  Mid:  $30M * 7.2x = $216,000,000
  High: $30M * 8.0x = $240,000,000

EV-to-Equity Bridge:
  Enterprise Value (mid): $216,000,000
  - Debt:                 ($10,000,000)
  + Cash:                  $25,000,000
  = Equity Value:         $231,000,000
```

---

## Precedent Transaction Analysis

### Differences from Trading Comps

| Dimension | Trading Comps | Precedent Transactions |
|-----------|--------------|----------------------|
| Basis | Current public market values | Historical acquisition prices |
| Includes | Minority discount (liquid shares) | Control premium (typically 20-40%) |
| Timing | Current market conditions | Various points in time |
| Availability | Always available (public data) | Limited to disclosed transactions |
| Relevance | Market sentiment today | What acquirers actually paid |

### Transaction Multiple Adjustments

```
Transaction EV/EBITDA = Public Trading EV/EBITDA + Control Premium Effect

Control Premium = (Offer Price - Unaffected Price) / Unaffected Price
Typical Control Premium: 20-40%
```

### Precedent Transaction Table

```
PRECEDENT TRANSACTION ANALYSIS:

Date     Target    Acquirer    EV($M)   Rev($M)  EBITDA($M)  EV/Rev  EV/EBITDA
------   -------   --------   ------   -------  ----------  ------  ---------
2024-Q3  Target A  Acquirer X  $800     $80      $16         10.0x    50.0x
2024-Q1  Target B  Acquirer Y  $500     $60      $12          8.3x    41.7x
2023-Q4  Target C  Acquirer Z  $350     $50      $10          7.0x    35.0x
2023-Q2  Target D  PE Fund    $1,200   $150      $30          8.0x    40.0x
2023-Q1  Target E  Strategic   $600     $70      $14          8.6x    42.9x

Mean                                                          8.4x    41.9x
Median                                                        8.3x    41.7x
```

---

## SaaS-Specific Multiples

### ARR Multiple

```
EV/ARR = Enterprise Value / Annual Recurring Revenue
```

For pure SaaS, ARR is cleaner than total revenue (excludes services, one-time fees).

### The Rule of 40 Framework for Multiple Selection

```
Rule of 40 Score = Revenue Growth (%) + FCF Margin (%)

Empirical relationship (public SaaS):
  EV/NTM Revenue approximately = 0.3 * Rule of 40 Score + adjustment

Example:
  Company with 35% growth + 10% FCF margin = 45 Rule of 40
  Implied multiple approximately = 0.3 * 45 = 13.5x NTM Revenue
```

### NRR as a Multiple Driver

Net revenue retention is the strongest predictor of SaaS multiples:

```
NRR Tier          Typical EV/NTM Revenue
> 130%            12-20x
120-130%           8-15x
110-120%           5-10x
100-110%           3-6x
< 100%             1-4x
```

---

## Common Pitfalls in Relative Valuation

| Pitfall | Description | Prevention |
|---------|------------|------------|
| Apples to oranges | Comparing companies with different business models | Strict comp selection criteria |
| Ignoring growth differences | Applying median multiple without growth adjustment | Use regression or PEG-type adjustment |
| Using LTM for growing companies | Understates current run-rate | Use NTM or run-rate metrics |
| Circular reasoning | "It is worth X because comps are at X" | Always cross-check with DCF |
| Survivorship bias in transactions | Only see successful deals | Acknowledge selection bias |
| Stale data | Using multiples from different market conditions | Time-adjust or use current data |
| Mixing GAAP and non-GAAP | Inconsistent metric definitions | Standardize across comp set |

---

## Integration with DCF

### The Triangulation Framework

```
Method              Weight    Value        Contribution
DCF (Gordon)         35%      $250M          $87.5M
DCF (Exit Multiple)  20%      $265M          $53.0M
Trading Comps        25%      $230M          $57.5M
Precedent Txns       20%      $280M          $56.0M
                    -----                   --------
Blended Value        100%                   $254.0M
```

Weights should reflect:
- Quality of comparable data (more reliable = more weight)
- Forecast confidence (higher confidence = more DCF weight)
- Transaction relevance (recent, similar deals = more weight)
- Purpose of valuation (M&A context = more weight on precedent transactions)

---

**Relative valuation tells you what the market thinks a company is worth.
Intrinsic valuation (DCF) tells you what it should be worth. The gap between
the two is where investment insight lives.**
