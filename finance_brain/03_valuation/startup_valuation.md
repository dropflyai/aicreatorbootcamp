# Startup Valuation

## Foundation

Startup valuation operates in a fundamentally different paradigm from public
company valuation. Pre-revenue or early-revenue companies lack the financial
history required for traditional DCF or comparable analysis. Instead, startup
valuation relies on negotiation dynamics, market benchmarks, dilution mechanics,
and forward-looking metrics. This module covers the methods, mechanics, and
frameworks specific to venture-backed startup valuation.

Reference: Damodaran, "Valuing Young, Start-up and Growth Companies" (NYU Stern).
Metrick & Yasuda, Venture Capital and the Finance of Innovation (3rd Edition).
Kaplan/Stromberg, "Characteristics, Contracts, and Actions" (Journal of Finance).

---

## Why Startup Valuation Is Different

### The Problem

Traditional valuation methods assume:
- Reliable historical financials (startups: 0-2 years of data)
- Positive cash flows or clear path to profitability (startups: burning cash)
- Stable capital structure (startups: multiple classes, convertibles, SAFEs)
- Comparable public companies (startups: may be in new categories)
- Mean-reverting growth (startups: non-linear, potentially exponential)

### The Reality

Startup valuation is driven by:
1. **Supply and demand** for capital (investor appetite vs. deal flow)
2. **Stage-based benchmarks** (what other companies raised at similar stages)
3. **Forward-looking metrics** (growth rate, engagement, market size)
4. **Negotiation leverage** (competitive term sheets, FOMO, founder reputation)
5. **Option value** (the upside potential, not the expected value)

---

## Valuation by Stage

### Typical Valuation Ranges (US, 2023-2024)

| Stage | Revenue | Typical Pre-Money | Check Size | Key Metrics |
|-------|---------|------------------|------------|-------------|
| Pre-Seed | $0 | $2-6M | $250K-$1M | Team, idea, TAM |
| Seed | $0-$500K ARR | $5-15M | $1-3M | MVP, early users, engagement |
| Series A | $500K-$3M ARR | $15-40M | $5-15M | PMF signals, growth rate, retention |
| Series B | $3-15M ARR | $40-150M | $15-50M | Repeatable sales, unit economics |
| Series C | $15-50M ARR | $150-500M | $50-150M | Market leadership, path to profit |
| Series D+ | $50M+ ARR | $500M+ | $100M+ | Category dominance, IPO readiness |

These ranges vary significantly by geography, sector, and market conditions.

### Pre-Seed / Seed Valuation Methods

**The Berkus Method:**

Assign value to five risk factors:

| Factor | If Good | Value Add |
|--------|---------|-----------|
| Sound Idea (attractiveness) | Yes | $0-500K |
| Prototype (technology risk) | Working | $0-500K |
| Quality Team (execution risk) | Strong | $0-500K |
| Strategic Relationships | Established | $0-500K |
| Product Rollout / Sales | Evidence | $0-500K |

Maximum pre-money: $2.5M (originally designed for pre-revenue companies).

**The Scorecard Method (Bill Payne):**

Compare to typical seed-stage valuation in the region, then adjust:

```
Base Valuation: $3M (median seed in region)

Adjustment Factors:
  Team: 0-150% weight * above/below average = multiplier
  Market Size: 0-120% weight * assessment
  Product/Technology: 0-100% weight * assessment
  Competition: 0-100% weight * assessment
  Marketing/Sales: 0-80% weight * assessment
  Need for Additional Investment: 0-80% weight * assessment

Example:
  Team (30% weight, 125% of average): 0.30 * 1.25 = 0.375
  Market (25% weight, 110%): 0.25 * 1.10 = 0.275
  Product (15% weight, 100%): 0.15 * 1.00 = 0.150
  Competition (10% weight, 80%): 0.10 * 0.80 = 0.080
  Marketing (10% weight, 100%): 0.10 * 1.00 = 0.100
  Add'l Investment (10% weight, 90%): 0.10 * 0.90 = 0.090
  Total Factor: 1.07

  Valuation = $3M * 1.07 = $3.21M
```

---

## Pre-Money and Post-Money Mechanics

### Basic Calculation

```
Post-Money Valuation = Pre-Money Valuation + Investment Amount

Investor Ownership = Investment Amount / Post-Money Valuation

Price Per Share = Pre-Money Valuation / Pre-Money Shares Outstanding

New Shares Issued = Investment Amount / Price Per Share
```

### Example: Series A

```
Pre-Money Valuation: $20,000,000
Investment Amount: $5,000,000
Post-Money Valuation: $25,000,000

Pre-Money Shares Outstanding: 10,000,000
Price Per Share: $20M / 10M = $2.00
New Shares to Investor: $5M / $2.00 = 2,500,000

Post-Money Shares: 10,000,000 + 2,500,000 = 12,500,000
Investor Ownership: 2,500,000 / 12,500,000 = 20%
Founder Ownership: 10,000,000 / 12,500,000 = 80%
```

### The Option Pool Shuffle

VCs typically require an option pool to be created or expanded BEFORE the
investment (included in the pre-money capitalization). This is called the
"option pool shuffle" and effectively lowers the true pre-money valuation.

```
Standard Term: "15-20% option pool on a post-money basis"

Scenario: $20M pre-money, $5M investment, 20% option pool post-money

Post-Money Shares: 12,500,000
Required Option Pool: 20% * 12,500,000 = 2,500,000 shares

BUT: option pool comes from pre-money, so:
  Pre-Money Shares (original): 10,000,000
  - Option Pool Shares: 2,500,000
  = Founder Shares: 7,500,000

Effective Ownership Post-Money:
  Founders: 7,500,000 / 12,500,000 = 60%
  Investors: 2,500,000 / 12,500,000 = 20%
  Option Pool: 2,500,000 / 12,500,000 = 20%

Effective Pre-Money (founder perspective):
  True Pre-Money = $25M * 60% = $15M (not $20M)
  The $5M "difference" went to the option pool
```

This is the most important negotiation dynamic in VC term sheets. Always
compute the effective pre-money after accounting for the option pool.

---

## SAFE and Convertible Note Valuation

### SAFE (Simple Agreement for Future Equity)

**Post-Money SAFE (Y Combinator 2018+ standard):**

The SAFE amount is included in the post-money capitalization.

```
SAFE Terms: $1M investment, $10M valuation cap

At Next Priced Round:
  If pre-money >= $10M cap:
    SAFE conversion price = $10M / Post-Money Capitalization (at SAFE close)
    SAFE shares = $1M / conversion price

  Post-Money Capitalization includes the SAFE itself:
    Company Equity = existing shares worth $9M
    SAFE = $1M worth of future shares
    Total Post-Money = $10M
    SAFE ownership = $1M / $10M = 10%
```

**Pre-Money SAFE (older Y Combinator standard):**

The SAFE amount is NOT included in the pre-money capitalization. More founder-
friendly than post-money SAFE.

### Convertible Note

```
Terms: $500K principal, 6% annual interest, 24-month maturity,
       $8M valuation cap, 20% discount

At Series A (12 months later, $15M pre-money):

  Accrued Interest: $500K * 6% * 1 year = $30,000
  Total Converting: $530,000

  Cap Price: $8,000,000 / Pre-Money Shares = $8M / 10M = $0.80
  Discount Price: Series A PPS * (1 - 20%) = $1.50 * 0.80 = $1.20
  Conversion Price: min($0.80, $1.20) = $0.80

  Shares Issued: $530,000 / $0.80 = 662,500 shares
```

### Multiple SAFE/Note Stacking

When multiple SAFEs and notes are outstanding, model each instrument separately
at conversion, accounting for the cumulative dilution effect.

---

## 409A Valuation

### Purpose

IRC Section 409A requires that stock options be granted at fair market value
(FMV) to avoid adverse tax consequences. Private companies must obtain an
independent 409A valuation to establish FMV.

### Common Methods

**Method 1: Market Approach (Most Common for Post-Revenue)**
```
Select comparable public companies
Apply appropriate discount for:
  - Illiquidity (DLOM): 15-35%
  - Lack of control: 10-25%
  - Size: varies

Example:
  Comparable public median EV/Revenue: 8.0x
  Company Revenue: $5M
  Implied EV: $40M
  Less: DLOM (25%): ($10M)
  Indicated EV: $30M
  Less: Debt: ($2M)
  Plus: Cash: $5M
  Indicated Equity Value: $33M
  Shares Outstanding: 10M
  Common Stock FMV: $3.30/share

  BUT: Common stock is worth less than preferred stock
  Allocation methods needed (see below)
```

**Method 2: Income Approach (DCF with adjustments)**

Standard DCF with additional discounts for illiquidity and stage risk.

**Method 3: Cost Approach (Pre-Revenue Only)**

Value based on cost of assets created (development costs, IP). Rarely used
except for very early stage.

### Equity Allocation Methods

When a company has multiple classes of stock (common and preferred), the total
equity value must be allocated among classes:

**Option Pricing Method (OPM) -- Black-Scholes Based:**

Model each class of stock as a call option on the enterprise value:
```
Preferred Stock (Series A, $2.00 liquidation preference):
  = Call(EV, Strike=$0) - Call(EV, Strike=$2.00*shares)

Common Stock:
  = Call(EV, Strike=breakpoint where common participates)
  = portion above aggregate liquidation preferences

Use Black-Scholes with:
  S = Current enterprise value
  K = Breakpoints in the waterfall
  T = Expected time to liquidity event
  sigma = Equity volatility (60-90% for startups)
  r = Risk-free rate
```

**Probability-Weighted Expected Return Method (PWERM):**

Model specific exit scenarios with probabilities:

```
Scenario      Probability  Exit Value  Common Value/Share
IPO at $500M     15%         $500M          $8.50
Acquisition      30%         $200M          $3.20
Stay Private     40%         $100M          $1.50
Shutdown         15%            $0          $0.00

Expected Common Value = 0.15*$8.50 + 0.30*$3.20 + 0.40*$1.50 + 0.15*$0
                      = $1.275 + $0.960 + $0.600 + $0
                      = $2.835

Apply DLOM (25%): $2.835 * 0.75 = $2.13/share
```

---

## Dilution Analysis

### Waterfall Analysis

Shows how exit proceeds are distributed among all stakeholders:

```
EXIT WATERFALL: $100M Acquisition

                                    $100M Exit  $50M Exit  $20M Exit
Step 1: Liquidation Preferences
  Series B (1x, $15M invested)      $15.0M      $15.0M     $15.0M
  Series A (1x, $5M invested)        $5.0M       $5.0M      $5.0M
  Remaining                          $80.0M      $30.0M         $0

Step 2: Distribution (non-participating)
  Option A: Pro-rata participation
    Series B (25%): $25.0M            $25.0M > $15M, take pro-rata
    Series A (15%): $15.0M            $15.0M > $5M, take pro-rata
    Common (60%): $60.0M              Remaining

  Series B receives:                  $25.0M      $15.0M     $15.0M
  Series A receives:                  $15.0M       $7.5M      $5.0M
  Common receives:                    $60.0M      $27.5M      $0.0M
  Option Pool:                        included in common pro-rata

Per Share:
  Common (6M shares):                 $10.00       $4.58      $0.00
  Series A (1.5M shares):             $10.00       $5.00      $3.33
  Series B (2.5M shares):             $10.00       $6.00      $6.00
```

### Round-by-Round Dilution

```
                     Shares      %        Post-$     Effective   Dilution
                                         Ownership   Pre-Money   from Round
Founding             8,000,000  100.0%     --          --          --
+ Option Pool 1      1,000,000   11.1%     --          --          --
= Pre-Seed Base      9,000,000  100.0%

+ Seed ($2M at $8M)  2,000,000   18.2%     81.8%     $8M          18.2%
= Post-Seed         11,000,000  100.0%

+ Option Pool 2      1,500,000   12.0%     88.0%      --           --
= Pre-Series A      12,500,000  100.0%

+ Series A ($5M @    2,500,000   16.7%     83.3%     $25M         16.7%
  $25M post)
= Post-Series A     15,000,000  100.0%

Founder Ownership After Series A:
  8,000,000 / 15,000,000 = 53.3%
```

---

## Venture Capital Method (VC Method)

The VC method works backward from an expected exit:

```
Step 1: Estimate Exit Value
  Exit Year: Year 5
  Projected Revenue at Exit: $50M
  Exit Multiple (EV/Revenue): 8x
  Exit Enterprise Value: $400M

Step 2: Determine Required Return
  VC Target Return: 10x over 5 years (approximately 58% IRR)

Step 3: Calculate Required Post-Money Today
  Required Post-Money = Exit Value / Target Return
  = $400M / 10x = $40M

Step 4: Determine Ownership Required
  Investment: $8M
  Required Ownership: $8M / $40M = 20%

Step 5: Pre-Money Valuation
  Pre-Money = Post-Money - Investment = $40M - $8M = $32M

Step 6: Adjust for Expected Dilution
  Expected future dilution: 30% (2 more rounds + option pools)
  Retention Ratio: 70%
  Adjusted Ownership Required: 20% / 0.70 = 28.6%
  Adjusted Post-Money: $8M / 28.6% = $28M
  Adjusted Pre-Money: $28M - $8M = $20M
```

---

## Valuation Negotiation Framework

### Founder Perspective
- Maximize pre-money valuation
- Minimize option pool shuffle
- Prefer non-participating preferred
- Seek pro-rata rights for existing investors (controls future dilution)

### Investor Perspective
- Price reflects risk-adjusted expected return
- Option pool sufficient for 2-3 years of hiring
- Liquidation preferences protect downside
- Anti-dilution protects against down rounds

### Negotiation Leverage Factors

| Increases Valuation | Decreases Valuation |
|--------------------|-------------------|
| Multiple competing term sheets | Single interested investor |
| Strong revenue growth trajectory | Flat or declining metrics |
| Prominent lead investor | Unknown investors |
| Large and growing market | Niche or shrinking market |
| Proven founding team | First-time founders |
| Capital-efficient model | High burn rate with low traction |
| Strong NRR and retention | High churn |
| Clear path to profitability | Unclear unit economics |

---

**Startup valuation is part art, part science, and part negotiation. The Finance
Brain provides the analytical rigor; the founder provides the vision; and the
market determines the price. Our job is to ensure that the price is informed
by fundamentals, even when the fundamentals are forward-looking.**
