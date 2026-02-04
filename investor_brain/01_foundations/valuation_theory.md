# Valuation Theory -- Pre-Money, Post-Money, Dilution, and Ownership

## Overview

Valuation is the mathematical foundation of venture financing. Every term sheet,
every cap table decision, and every exit scenario depends on precise valuation
mechanics. This module provides rigorous treatment of valuation methodologies,
dilution mathematics, liquidation preferences, and ownership modeling.

Primary references: Feld "Venture Deals" Chapter 4, Kupor "Secrets of Sand Hill Road"
Chapters 8-9, Damodaran "The Dark Side of Valuation", HBS Note on Valuation in VC.

---

## Core Valuation Mechanics

### Pre-Money and Post-Money

The most fundamental equations in venture financing:

```
POST-MONEY VALUATION = PRE-MONEY VALUATION + NEW INVESTMENT

INVESTOR OWNERSHIP = NEW INVESTMENT / POST-MONEY VALUATION

PRICE PER SHARE = PRE-MONEY VALUATION / PRE-MONEY FULLY DILUTED SHARES

EXAMPLE:
Pre-money: $10M
Investment: $2.5M
Post-money: $12.5M

Investor ownership: $2.5M / $12.5M = 20.0%
Existing shareholders: retain 80.0% of post-money

If 10M shares pre-money:
  Price per share: $10M / 10M = $1.00
  New shares issued: $2.5M / $1.00 = 2.5M shares
  Total post-money shares: 12.5M
  Verify: 2.5M / 12.5M = 20.0% ✓
```

### Fully Diluted Shares Outstanding

"Fully diluted" includes all shares that could exist, not just issued shares:

```
FULLY DILUTED SHARES =
    Common Stock Outstanding
  + Preferred Stock (on as-converted basis)
  + Vested Options
  + Unvested Options (in option pool)
  + Warrants
  + Shares from converted SAFEs/Notes

THIS MATTERS BECAUSE:
Price per share uses fully diluted count.
If you forget unvested options, price per share is artificially high.
Investors ALWAYS price on fully diluted basis.

EXAMPLE:
Common stock: 7,000,000
Preferred stock: 2,000,000 (1:1 conversion)
Option pool: 1,000,000 (500K vested, 500K unvested)
Warrants: 0
Converted SAFEs: 0

Fully diluted: 10,000,000

Pre-money: $10M
PPS: $10M / 10M = $1.00 per share
```

---

## Dilution Mathematics

### Single-Round Dilution

```
DILUTION FORMULA

If existing holder owns X% before round:
After-round ownership = X% * (1 - New Investor %)

EXAMPLE:
Founder owns 60% before Series A
Series A investor buys 20%

Founder after: 60% * (1 - 20%) = 60% * 80% = 48.0%

GENERAL MULTI-HOLDER DILUTION:
All existing holders are diluted proportionally.
If round sells 20%, every existing holder retains 80% of their pre-round %.
```

### Multi-Round Dilution (Compounding)

```
CUMULATIVE DILUTION ACROSS ROUNDS

Ownership_after_N_rounds = Initial_% * Product(1 - dilution_i) for each round i

EXAMPLE: Founder starts with 100% (solo founder)

Pre-Seed: Sell 10% → Founder: 100% * 0.90 = 90.0%
Seed: Sell 20% → Founder: 90% * 0.80 = 72.0%
Series A: Sell 20% → Founder: 72% * 0.80 = 57.6%
Series B: Sell 15% → Founder: 57.6% * 0.85 = 48.96%
Series C: Sell 12% → Founder: 48.96% * 0.88 = 43.08%

CUMULATIVE DILUTION TABLE (Solo Founder):
┌──────────┬────────────┬──────────────┬──────────────────┐
│ Round    │ % Sold     │ Founder %    │ Cumulative       │
│          │            │ After Round  │ Dilution         │
├──────────┼────────────┼──────────────┼──────────────────┤
│ Start    │ -          │ 100.00%      │ 0%               │
│ Pre-Seed │ 10%        │ 90.00%       │ 10.0%            │
│ Seed     │ 20%        │ 72.00%       │ 28.0%            │
│ Series A │ 20%        │ 57.60%       │ 42.4%            │
│ Series B │ 15%        │ 48.96%       │ 51.0%            │
│ Series C │ 12%        │ 43.08%       │ 56.9%            │
└──────────┴────────────┴──────────────┴──────────────────┘

KEY INSIGHT (per Feld):
Even with "standard" dilution at each round, a solo founder
ends up below 50% by Series B. This is normal and expected.
Control comes from voting agreements, not ownership percentage.
```

### Option Pool Shuffle

The option pool is one of the most misunderstood dilution mechanisms. Per Feld,
the "option pool shuffle" is the #1 way investors extract additional economics
beyond stated valuation.

```
THE OPTION POOL SHUFFLE (per Brad Feld)

Investor says: "$10M pre-money, and we need a 20% post-money option pool."

WHAT FOUNDER HEARS:
"Company is worth $10M, investor buys 20% for $2.5M"

WHAT ACTUALLY HAPPENS:
Post-money: $12.5M
Investor gets: 20% ($2.5M / $12.5M)
Option pool: 20% of post-money = 2.5M shares
These shares come from PRE-MONEY allocation.

EFFECTIVE PRE-MONEY TO EXISTING HOLDERS:
$10M pre-money - $2.5M option pool value = $7.5M
Founder's effective pre-money: $7.5M (not $10M)

THE MATH:
Total post-money: $12.5M (100%)
Investor: $2.5M = 20%
Option pool: $2.5M = 20%
Existing holders: $7.5M = 60%

VERSUS what founder expected:
Total post-money: $12.5M (100%)
Investor: $2.5M = 20%
Existing holders: $10M = 80%

DILUTION FROM POOL SHUFFLE: 80% expected → 60% actual = 25% additional dilution

DEFENSE STRATEGIES:
1. Negotiate pool size based on actual 12-month hiring plan
2. Push for smaller pool (10-15%) with refresh commitment
3. Negotiate pool creation BEFORE valuation is set
4. Ensure pool sizing is discussed explicitly, not buried
```

---

## Valuation Methodologies

### Comparable Company Analysis (Comps)

The most common approach for venture-stage companies:

```
COMPARABLE COMPANY VALUATION

Step 1: Identify comparable companies
  - Same stage, sector, geography, business model
  - Recent fundraises (within 12 months)
  - Similar growth profiles

Step 2: Determine relevant multiple
  - SaaS: ARR multiple (most common)
  - Marketplace: GMV or revenue multiple
  - Consumer: MAU or DAU multiple
  - Enterprise: Contract value multiple

Step 3: Apply multiple to your metrics

EXAMPLE (SaaS Series A):
Company ARR: $2M, growing 150% YoY
Comparable Series A raises: 15-25x ARR
Estimated valuation range: $30M - $50M pre-money

TYPICAL ARR MULTIPLES BY STAGE (2024-2025 market):
  Seed: 20-50x (high uncertainty, growth potential)
  Series A: 15-30x
  Series B: 10-20x
  Series C: 8-15x
  Growth: 6-12x
  Pre-IPO: 5-10x

ADJUSTMENTS:
  + Premium for: >150% growth, >120% NRR, >80% gross margin
  - Discount for: high churn, low margins, concentrated revenue
  +/- Market conditions (bull vs. bear)
```

### Discounted Cash Flow (DCF) in Venture

DCF is theoretically correct but practically difficult for early-stage companies:

```
DCF FRAMEWORK

Enterprise Value = Sum of [FCF_t / (1 + r)^t] + Terminal Value / (1 + r)^n

WHERE:
FCF_t = Free Cash Flow in year t
r = Discount rate (cost of capital)
n = Projection period

WHY DCF IS PROBLEMATIC FOR STARTUPS:
1. Cash flows are negative for years (no positive FCF to discount)
2. Terminal value dominates (90%+ of value)
3. Discount rate is arbitrary for private companies
4. Small assumption changes create massive value swings

WHEN DCF IS USEFUL:
- Late-stage companies with visible profitability path
- Companies with predictable recurring revenue
- As a sanity check against multiple-based valuations
- IPO pricing exercises

VENTURE DISCOUNT RATES:
  Seed: 50-70% (extreme uncertainty)
  Series A: 40-50%
  Series B: 30-40%
  Growth: 20-30%
  Pre-IPO: 15-20%
  Public: 8-12% (WACC)
```

### Venture Capital Method (HBS Framework)

The VC method works backward from expected exit to determine today's valuation:

```
VC METHOD

Step 1: Estimate exit value
  Exit Value = Exit Year Revenue * Exit Multiple
  Example: $100M revenue * 10x = $1B exit

Step 2: Determine required return
  Target: 10-20x for seed, 5-10x for A, 3-5x for B

Step 3: Calculate post-money valuation
  Post-Money Today = Exit Value / Target Return
  $1B / 10x = $100M post-money

Step 4: Calculate pre-money valuation
  Pre-Money = Post-Money - Investment
  $100M - $15M = $85M pre-money

REALITY CHECK:
If asking for $15M at $85M pre-money for a company with $1M ARR:
Implied ARR multiple: 85x
This only works if $1B exit is highly credible.

VC RETURN EXPECTATIONS BY STAGE:
  Pre-Seed: 100x+ (power law requirement)
  Seed: 20-50x
  Series A: 10-20x
  Series B: 5-10x
  Growth: 3-5x
```

### Scorecard Method (Angel Stage)

For pre-revenue companies where metrics-based valuation is impossible:

```
SCORECARD METHOD (Bill Payne, Angel Capital Association)

Step 1: Determine average pre-money for similar companies in region
  Example: Average seed in Austin = $5M

Step 2: Score company across factors vs. average:

Factor                  Weight    Score (0.5-1.5x)    Weighted
─────────────────────────────────────────────────────────────
Team                    30%       1.2x                 0.36
Market Opportunity      25%       1.0x                 0.25
Product/Technology      15%       0.8x                 0.12
Competitive Position    10%       1.1x                 0.11
Marketing/Sales         10%       0.9x                 0.09
Need for Funding        5%        1.0x                 0.05
Other                   5%        1.0x                 0.05
─────────────────────────────────────────────────────────────
TOTAL                   100%                           1.03

Step 3: Apply to average
  Valuation = $5M * 1.03 = $5.15M pre-money
```

---

## Liquidation Preferences Deep Dive

### Economic Impact Analysis

Liquidation preferences determine who gets paid what in an exit. Understanding the
math is essential for evaluating term sheets.

```
SCENARIO ANALYSIS: $10M SERIES A AT $40M POST-MONEY (25% ownership)

Exit at $200M:
  1x Non-Part: Investor converts → 25% * $200M = $50M (25x return)
  1x Part:     $10M + 25% * $190M = $10M + $47.5M = $57.5M (5.75x)
  2x Non-Part: Investor converts → 25% * $200M = $50M (5x)
  2x Part:     $20M + 25% * $180M = $20M + $45M = $65M (6.5x)

Exit at $40M (flat):
  1x Non-Part: MAX($10M, 25% * $40M) = MAX($10M, $10M) = $10M (1x)
  1x Part:     $10M + 25% * $30M = $10M + $7.5M = $17.5M (1.75x)
  2x Non-Part: MAX($20M, 25% * $40M) = $20M (2x)
  2x Part:     $20M + 25% * $20M = $20M + $5M = $25M (2.5x)

Exit at $20M (down):
  1x Non-Part: MAX($10M, 25% * $20M) = $10M (1x)
  1x Part:     $10M + 25% * $10M = $10M + $2.5M = $12.5M (1.25x)
  2x Non-Part: $20M (everything goes to investor, 2x)
  2x Part:     $20M (everything, investors take it all)

FOUNDER PAYOUT AT EACH EXIT:
                    $200M Exit   $40M Exit    $20M Exit
1x Non-Part:       $150M        $30M         $10M
1x Participating:  $142.5M      $22.5M       $7.5M
2x Non-Part:       $150M        $20M         $0
2x Participating:  $135M        $15M         $0
```

### Conversion Analysis

The "conversion point" is the exit value where preferred holders choose to convert
to common rather than take their liquidation preference:

```
CONVERSION POINT FORMULA (1x Non-Participating)

Conversion Point = Liquidation Preference / Ownership Percentage

EXAMPLE:
$10M invested for 25% ownership (1x non-participating)
Conversion Point = $10M / 0.25 = $40M

Below $40M exit: Investor takes $10M preference
Above $40M exit: Investor converts (25% > $10M)

FOR PARTICIPATING PREFERRED:
There is NO conversion point -- investor always gets preference PLUS share.
This is why participating preferred is worse for founders.

PARTICIPATING WITH CAP:
Cap sets maximum total return (e.g., 3x cap)
Conversion point = where uncapped participation > capped return
```

---

## Ownership Modeling

### Multi-Round Cap Table Simulation

```
FULL CAP TABLE EVOLUTION

FOUNDING:
Founder A: 5,000,000 shares (50%)
Founder B: 3,000,000 shares (30%)
Option Pool: 2,000,000 shares (20%)
Total: 10,000,000 shares

SEED ($2M on $8M pre-money, post-money $10M):
PPS: $8M / 10M shares = $0.80
New shares: $2M / $0.80 = 2,500,000
Option pool refresh: 500,000 shares (from pre-money)

POST-SEED CAP TABLE:
Founder A:    5,000,000    38.46%
Founder B:    3,000,000    23.08%
Option Pool:  2,500,000    19.23%
Seed Investor: 2,500,000   19.23%
Total:       13,000,000   100.00%

SERIES A ($5M on $20M pre-money, post-money $25M):
PPS: $20M / 13M shares = $1.538
New shares: $5M / $1.538 = 3,250,000
Option pool refresh: 750,000 shares (from pre-money)

POST-SERIES A CAP TABLE:
Founder A:     5,000,000    29.41%
Founder B:     3,000,000    17.65%
Option Pool:   3,250,000    19.12%
Seed Investor: 2,500,000    14.71%
Series A Lead: 3,250,000    19.12%
Total:        17,000,000   100.00%
```

### Pro-Rata Rights and Follow-On Impact

```
PRO-RATA MECHANICS

Pro-rata right = right to invest enough to maintain ownership percentage

EXAMPLE:
Seed investor owns 19.23% post-seed
Series A: $5M raise at $20M pre-money

Pro-rata investment needed:
  New shares = $5M / $1.538 PPS = 3,250,000
  Total new shares (including pool) = 4,000,000
  Total post-A shares = 17,000,000

  To maintain 19.23%:
  Seed investor needs: 19.23% * 17M - 2.5M existing = 768,000 new shares
  Cost: 768,000 * $1.538 = $1,181,000

  If seed investor exercises full pro-rata:
  They invest additional $1.18M in Series A
  Their ownership: (2,500,000 + 768,000) / 17,000,000 = 19.23%

STRATEGIC CONSIDERATION:
  - Pro-rata is a right, not an obligation
  - Small seed funds may not have reserves for pro-rata
  - Pro-rata signals (exercising = confidence; declining = concern)
  - Super pro-rata = investing more than pro-rata (requires allocation)
```

---

## Valuation Negotiation Frameworks

### Anchoring and Range Setting

```
VALUATION NEGOTIATION TACTICS (per Feld)

FOUNDER APPROACH:
1. Never name a number first if possible
2. If forced to anchor, anchor high with justification
3. Use comparables as external validation
4. Frame valuation in terms of dilution, not number

"We're looking for a round that keeps founder ownership above X%
with enough capital for 24 months of runway"
vs.
"We want a $50M pre-money valuation"

INVESTOR APPROACH:
1. Reference comparable deals they've done
2. Use option pool shuffle to lower effective pre-money
3. Introduce structure (preferences) as alternative to higher valuation
4. Time pressure ("this is our standard, non-negotiable")

NEGOTIATION RANGE:
  Bottom: Walk-away point (minimum acceptable valuation)
  ZOPA: Zone of Possible Agreement
  Target: Optimal outcome
  Anchor: Starting ask (above target)

EXAMPLE:
  Bottom: $15M pre-money (below this, too much dilution)
  Target: $20M pre-money
  Anchor: $25M pre-money
  Open with $25M, expect to settle at $18-22M
```

### When Valuation Matters Less Than Terms

```
TERM STRUCTURE CAN NEGATE VALUATION ADVANTAGE

Scenario A: $20M pre-money, 1x non-participating preferred
Scenario B: $25M pre-money, 1x participating preferred

At $100M exit:
Scenario A founder payout: 80% * $100M = $80M
Scenario B founder payout: $100M - $5M - (20% * $75M) = $80M

At $50M exit:
Scenario A founder payout: 80% * $50M = $40M
Scenario B founder payout: $50M - $5M - (20% * $45M) = $36M

INSIGHT: The $5M higher pre-money in Scenario B is
offset by the participating preference in moderate exits.

RULE OF THUMB (per Feld):
"Take a lower valuation with clean terms over a higher
valuation with complex terms. You'll almost always come
out ahead."
```

---

## Advanced Valuation Concepts

### Down Round Mechanics

```
DOWN ROUND ANALYSIS

Previous round: Series A at $40M post-money
Series B offer: $30M pre-money ($10M investment, $40M post-money)

Series A PPS was: $40M / shares = $2.00
Series B PPS: $30M / shares = lower than $2.00

THIS TRIGGERS:
1. Anti-dilution adjustment for Series A holders
2. Psychological impact on team (underwater options)
3. Signal to market (may scare future investors)
4. Potential ratchet on earlier rounds

MITIGATION STRATEGIES:
- Pay-to-play provisions (investors must participate or lose protection)
- Pull-up provisions (adjust conversion if company recovers)
- Management carve-out (reserve pool for team despite dilution)
- Narrative control (frame as strategic repositioning)
```

### 409A Valuation and Common Stock Pricing

```
409A VALUATION

Purpose: Set fair market value of common stock for option grants
Required by: IRS Section 409A (penalties for incorrect pricing)
Frequency: Every 12 months or after material event

TYPICAL 409A DISCOUNT TO PREFERRED:
  Early stage: 60-80% discount (common = 20-40% of preferred PPS)
  Growth stage: 40-60% discount
  Late stage: 10-30% discount
  Pre-IPO: 5-15% discount

EXAMPLE:
Series A PPS (preferred): $2.00
409A value (common): $0.50 (75% discount)
Strike price for new options: $0.50

WHY THE DISCOUNT EXISTS:
1. Common has no liquidation preference (less economic protection)
2. Common has no anti-dilution protection
3. Common is less liquid (no registration rights)
4. Minority discount (common holders lack control)
5. Marketability discount (private company, no market)

IMPACT ON EMPLOYEES:
Lower 409A = lower strike price = more upside for option holders
This is why timing of 409A relative to fundraising matters.
Get 409A done BEFORE announcing a round (while price is lower).
```

---

**This module provides the mathematical and theoretical foundation for all valuation
work in the Investor Brain. Every term sheet analysis, cap table model, and fundraising
strategy must be grounded in these principles. Precision in valuation math is non-negotiable.**
