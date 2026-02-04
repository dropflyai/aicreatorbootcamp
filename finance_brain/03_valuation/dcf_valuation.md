# DCF Valuation

## Foundation

The discounted cash flow (DCF) model is the gold standard of intrinsic valuation.
It derives a company's value from its ability to generate future cash flows,
discounted to present value at a rate reflecting the risk of those cash flows.
Unlike relative valuation, DCF does not depend on market sentiment or comparable
company availability -- it derives value from fundamentals alone.

Reference: Damodaran, Investment Valuation (3rd Edition), Chapters 12-15.
Koller/Goedhart/Wessels, Valuation (McKinsey, 7th Edition), Chapters 7-12.
Brealey/Myers/Allen, Principles of Corporate Finance, Chapters 4-6.

---

## DCF Architecture

### The Fundamental Equation

```
Enterprise Value = sum from t=1 to n of [FCFF_t / (1 + WACC)^t]
                 + Terminal Value / (1 + WACC)^n

Equity Value = Enterprise Value - Net Debt - Preferred Stock
             - Minority Interest + Value of Associates
```

### Two Approaches

**FCFF Model (Enterprise DCF):**
- Discount FCFF at WACC
- Produces enterprise value
- Bridge to equity value by subtracting net debt
- Standard approach for most valuations

**FCFE Model (Equity DCF):**
- Discount FCFE at cost of equity
- Produces equity value directly
- Used when capital structure is changing significantly
- Common for financial institutions

---

## Step 1: Forecast Free Cash Flow to Firm (FCFF)

### FCFF Derivation

```
Method 1: From EBIT
  FCFF = EBIT * (1 - Tax Rate) + Depreciation & Amortization
       - Capital Expenditures - Change in Net Working Capital

Method 2: From Net Income
  FCFF = Net Income + Interest Expense * (1 - Tax Rate) + D&A
       - CapEx - Change in NWC

Method 3: From EBITDA
  FCFF = EBITDA * (1 - Tax Rate) + D&A * Tax Rate
       - CapEx - Change in NWC
```

### FCFF Components in Detail

**NOPAT (Net Operating Profit After Tax):**
```
NOPAT = EBIT * (1 - Marginal Tax Rate)
```
Use the marginal tax rate, not the effective rate. The marginal rate represents
the tax impact of incremental operating income. For US C-corps: 21% federal +
state (typically 3-8%) = approximately 24-29% combined.

**Depreciation and Amortization:**
Non-cash charge added back to NOPAT. However, D&A is a proxy for maintenance
CapEx required to sustain existing operations. If CapEx = D&A, the company is
maintaining its asset base. If CapEx >> D&A, it is investing for growth.

**Capital Expenditures:**
```
CapEx = Maintenance CapEx + Growth CapEx
      = D&A + Growth CapEx (approximation)
```

For SaaS companies, CapEx includes capitalized software development costs (if
the company capitalizes per ASC 350-40 or ASC 985-20).

**Change in Net Working Capital:**
```
NWC = (Current Assets - Cash) - (Current Liabilities - Current Debt)
Change in NWC = NWC_t - NWC_{t-1}

For SaaS companies:
  NWC = Accounts Receivable + Prepaid Expenses
      - Accounts Payable - Accrued Liabilities - Deferred Revenue

Note: Increase in deferred revenue is a cash inflow (collected ahead of
recognition), which reduces NWC and increases FCFF.
```

### SBC Treatment in DCF

Stock-based compensation is a genuine economic cost (dilution to shareholders).
Two approaches:

**Approach 1 (Damodaran recommended):** Treat SBC as a cash expense. Do NOT
add it back when calculating FCFF. This captures the dilution cost.

**Approach 2 (Common practice):** Add SBC back (treating it as non-cash), but
then subtract the value of expected future option/RSU grants from enterprise
value. Mathematically equivalent if done correctly, but easier to execute
incorrectly.

This brain uses Approach 1 as the default.

---

## Step 2: Determine the Discount Rate (WACC)

### WACC Formula

```
WACC = (E/V) * R_e + (D/V) * R_d * (1 - T)

Where:
  E = Market value of equity
  D = Market value of debt (book value if no traded debt)
  V = E + D
  R_e = Cost of equity
  R_d = Pre-tax cost of debt
  T = Marginal tax rate
```

### Cost of Equity (CAPM)

```
R_e = R_f + beta * ERP + Size Premium + CSRP

Where:
  R_f = Risk-free rate (current 10-year US Treasury yield)
  beta = Levered beta (regressed or estimated from comparables)
  ERP = Equity risk premium (Damodaran: ~4.6% for US, varies by country)
  Size Premium = Duff & Phelps size premium (1-6% for small companies)
  CSRP = Company-specific risk premium (0-5% for private companies)
```

### Beta Estimation

**For public companies:**
```
1. Regress stock returns against market returns (S&P 500)
2. Use 2-5 years of monthly data (60 observations ideal)
3. Slope coefficient = raw beta
4. Adjusted beta = 0.67 * raw beta + 0.33 * 1.0 (Bloomberg adjustment)
```

**For private companies (using comparable public companies):**
```
1. Identify 5-10 comparable public companies
2. Obtain each company's levered beta
3. Unlever each: beta_u = beta_l / (1 + (1-T) * D/E)
4. Calculate the median unlevered beta of the peer set
5. Re-lever at the target company's capital structure:
   beta_l = beta_u * (1 + (1-T) * D/E_target)
```

### Cost of Debt

```
For companies with traded bonds:
  R_d = Yield to maturity on long-term bonds

For companies without traded bonds:
  R_d = R_f + Default Spread based on synthetic credit rating

Synthetic rating approach (Damodaran):
  1. Calculate interest coverage ratio = EBIT / Interest Expense
  2. Map to rating using Damodaran's lookup table
  3. R_d = R_f + spread for that rating
```

### WACC Calculation Example

```
Given:
  Market cap: $200M
  Debt: $50M (YTM = 6%)
  Levered beta: 1.3
  Risk-free rate: 4.2%
  ERP: 5.0%
  Tax rate: 25%

Cost of Equity:
  R_e = 4.2% + 1.3 * 5.0% = 10.7%

After-Tax Cost of Debt:
  R_d * (1-T) = 6.0% * 0.75 = 4.5%

Weights:
  E/V = 200/250 = 80%
  D/V = 50/250 = 20%

WACC = 0.80 * 10.7% + 0.20 * 4.5% = 8.56% + 0.90% = 9.46%
```

---

## Step 3: Calculate Terminal Value

Terminal value (TV) represents all cash flows beyond the explicit forecast period.
It typically accounts for 60-80% of enterprise value, making it the most
important and most scrutinized element of a DCF.

### Method 1: Gordon Growth Model (Perpetuity Growth)

```
TV = FCFF_{n+1} / (WACC - g)
   = FCFF_n * (1 + g) / (WACC - g)

Where:
  g = perpetual growth rate of FCFF
```

**Constraints on g (Per Damodaran):**
- g should NOT exceed long-term nominal GDP growth (typically 2-3% for developed
  economies)
- If g > WACC, the formula produces negative or infinite value (nonsensical)
- At terminal state, the company must have: ROIC >= WACC, growth is sustainable,
  margins are stable, reinvestment rate is consistent with growth and ROIC

**The Reinvestment Consistency Check:**

```
g = ROIC * Reinvestment Rate

Where:
  Reinvestment Rate = (CapEx - D&A + Change in NWC) / NOPAT

If g = 3% and ROIC = 15%:
  Required Reinvestment Rate = 3% / 15% = 20%
  Meaning: 20% of NOPAT must be reinvested to sustain 3% growth
  FCFF = NOPAT * (1 - Reinvestment Rate) = NOPAT * 80%
```

This check ensures that the terminal FCFF, growth rate, and ROIC are internally
consistent. Many models fail this test.

### Method 2: Exit Multiple

```
TV = EBITDA_n * Exit Multiple
   = EBITDA_n * (EV/EBITDA)_comparable

Common exit multiples:
  - Industrial companies: 8-12x EBITDA
  - Technology companies: 15-25x EBITDA
  - SaaS companies: 20-40x EBITDA (varies dramatically with growth)
```

**When to use which method:**
- Gordon Growth: theoretically pure, makes all assumptions explicit
- Exit Multiple: easier to implement, but embeds current market sentiment
- Best practice: calculate both and compare. If they diverge significantly,
  investigate which assumptions are inconsistent.

### Implied Perpetuity Growth from Exit Multiple

```
g_implied = WACC - (FCFF_{n+1} / TV)
```

If the implied growth rate exceeds GDP growth, the exit multiple may be too high.

---

## Step 4: Enterprise Value to Equity Value Bridge

```
Enterprise Value (from DCF)               $250,000,000
  - Total Debt                            ($50,000,000)
  + Cash and Equivalents                   $30,000,000
  - Preferred Stock                                  $0
  - Minority Interest                                $0
  + Value of Equity Investments             $5,000,000
  - Unfunded Pension Obligations                     $0
  - Capitalized Operating Leases          ($10,000,000)
    (if not already in FCFF)
  - Value of Outstanding Options           ($8,000,000)
    (using Treasury Stock Method or Black-Scholes)
                                          -----------
Equity Value                              $217,000,000

Shares Outstanding (fully diluted)          50,000,000
Value per Share                                  $4.34
```

### Option Value Adjustment

**Treasury Stock Method (for options):**
```
Diluted Shares = Basic Shares + In-the-Money Options
               - Shares Repurchased with Proceeds
               = Basic Shares + (ITM Options - (Options * Strike / Share Price))
```

**Black-Scholes Method (more precise for valuation):**
```
Option Value = sum of [N_i * BS(S, K_i, T_i, r, sigma)]

Where:
  N_i = number of options in tranche i
  S = equity value per share (before option adjustment)
  K_i = exercise price of tranche i
  T_i = remaining contractual term of tranche i
```

---

## Step 5: Sensitivity Analysis

### Two-Variable Sensitivity Table

```
Equity Value Sensitivity ($M)

WACC -->         8.0%    9.0%    9.5%   10.0%   11.0%
g = 1.5%       $260    $225    $210    $198    $175
g = 2.0%       $290    $245    $228    $213    $187
g = 2.5%       $328    $270    $248    $230    $200
g = 3.0%       $378    $300    $272    $250    $215
g = 3.5%       $445    $340    $304    $275    $233
```

### Football Field Chart Data

```
Methodology              Low        Mid       High
DCF (Gordon Growth)     $198M      $250M     $328M
DCF (Exit Multiple)     $210M      $265M     $340M
Trading Comps           $180M      $230M     $300M
Precedent Transactions  $220M      $280M     $360M
52-Week Range           $190M      $240M     $290M

Recommended Range: $230M - $280M
```

---

## DCF Checklist

```
PRE-MODEL
[ ] Narrative articulated: what is the story of this company's future?
[ ] Historical financials cleaned and adjusted (3-5 years)
[ ] Comparable companies identified for beta and multiple cross-checks

FORECAST PERIOD
[ ] Revenue forecast based on drivers (not arbitrary growth rates)
[ ] Margins converge to sustainable steady-state by terminal year
[ ] CapEx and D&A are reasonable relative to revenue and asset base
[ ] Working capital assumptions based on historical days or industry norms
[ ] Forecast period is long enough that terminal value < 75% of EV

WACC
[ ] Risk-free rate is current (10-year Treasury)
[ ] Beta sourced from comparable companies and re-levered appropriately
[ ] ERP sourced from Damodaran or equivalent (not assumed)
[ ] Cost of debt based on actual yield or synthetic rating
[ ] Weights based on market values (not book values)

TERMINAL VALUE
[ ] Perpetuity growth rate does not exceed long-term GDP growth
[ ] Reinvestment rate is consistent with growth rate and ROIC
[ ] Exit multiple (if used) is reasonable vs. current market levels
[ ] Implied perpetuity growth from exit multiple is checked

EV-TO-EQUITY BRIDGE
[ ] All debt subtracted (including off-balance-sheet if applicable)
[ ] Cash added back
[ ] Options valued and subtracted from equity value
[ ] Minority interest and preferred stock accounted for

SENSITIVITY AND OUTPUT
[ ] Two-variable sensitivity table on WACC and terminal growth
[ ] Scenario analysis (base, bull, bear)
[ ] Cross-check against trading multiples
[ ] Cross-check against precedent transactions
[ ] Implied multiples from DCF are reasonable
```

---

**The DCF is not a mechanical exercise -- it is a structured thought experiment
about the future. The value of the DCF lies not in the single number it produces
but in the discipline of making every assumption about growth, risk, and
reinvestment explicit and defensible.**
