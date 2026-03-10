# LBO Modeling

## Foundation

A leveraged buyout (LBO) is the acquisition of a company using a significant
amount of debt (leverage) to finance the purchase price. The acquired company's
cash flows service and repay the debt, and value is created through a combination
of debt paydown, operational improvements, and multiple expansion. LBO modeling is
a core skill in private equity and investment banking, testing whether a financial
sponsor can achieve target returns (typically 20-25% IRR) on the equity invested.

Reference: Rosenbaum & Pearl, Investment Banking (3rd Edition), Chapters 4-5.
Koller/Goedhart/Wessels, Valuation (McKinsey), Chapter 19. Kaplan & Stromberg,
"Leveraged Buyouts and Private Equity" (Journal of Economic Perspectives).

---

## LBO Value Creation Framework

Value creation in an LBO comes from three sources:

```
Total Value Created = Debt Paydown + EBITDA Growth + Multiple Expansion

1. DEBT PAYDOWN (Financial Engineering)
   - Company cash flows used to repay acquisition debt
   - Equity value increases dollar-for-dollar as debt decreases
   - This is "forced savings" -- mechanical value creation

2. EBITDA GROWTH (Operational Improvement)
   - Revenue growth (organic + add-on acquisitions)
   - Margin expansion (cost reduction, efficiency gains)
   - Combination of top-line and bottom-line improvements

3. MULTIPLE EXPANSION (Market/Timing)
   - Exit at a higher EV/EBITDA multiple than entry
   - Driven by: improved growth profile, larger scale, better market conditions
   - Least reliable source -- cannot be controlled
```

### Historical Value Creation Attribution (PE Industry)

```
Source               1980s-1990s    2000s-2010s    2010s-2020s
Leverage/Debt Paydown   50-60%       30-40%         20-30%
EBITDA Growth           20-30%       35-45%         40-50%
Multiple Expansion      10-20%       15-25%         20-30%
```

The shift toward operational improvement reflects increased competition for
deals and lower baseline interest rates reducing the leverage advantage.

---

## LBO Model Architecture

### Sources and Uses

```
SOURCES AND USES ($M):

SOURCES:
  Revolving Credit Facility        $0      (undrawn at close)
  Term Loan A                     $150     (amortizing)
  Term Loan B                     $200     (bullet)
  Senior Notes                    $100     (high yield)
  Mezzanine Debt                   $50     (subordinated)
  Sponsor Equity                  $200     (PE fund)
  Management Rollover              $25     (existing mgmt reinvests)
  Total Sources                   $725

USES:
  Purchase Enterprise Value       $650     (8.0x LTM EBITDA of $81.25M)
  Refinance Existing Debt          $30
  Transaction Fees                 $25     (advisory, legal, financing)
  Cash to Balance Sheet            $20
  Total Uses                      $725

LEVERAGE RATIOS AT CLOSE:
  Total Debt / EBITDA:            $500M / $81.25M = 6.2x
  Senior Debt / EBITDA:          $350M / $81.25M = 4.3x
  Equity / Total Cap:            $225M / $725M = 31.0%
```

### Debt Structure Detail

```
DEBT SCHEDULE:

Tranche      Amount   Rate    Maturity  Amortization  Priority
Revolver      $50M*   SOFR+250  5yr     None          1st Lien
Term Loan A  $150M    SOFR+300  5yr     10% annual    1st Lien
Term Loan B  $200M    SOFR+400  7yr     1% annual     1st Lien
Sr Notes     $100M    8.5%      8yr     Bullet        2nd Lien
Mezz Debt     $50M    12.0%     9yr     PIK toggle    Subordinated
                                                      (unsecured)

* Revolver: $50M capacity, undrawn at close, available for working capital

Total Debt: $500M
Weighted Average Cost of Debt: approximately 7.2%
```

### Operating Model (5-Year Projection)

```
                        Year 0    Year 1    Year 2    Year 3    Year 4    Year 5
                        (LTM)
Revenue                $250.0M   $262.5M   $278.3M   $295.0M   $312.7M   $331.5M
  Growth                  --       5.0%      6.0%      6.0%      6.0%      6.0%

EBITDA                  $81.3M    $86.6M    $94.8M   $103.3M   $112.5M   $122.7M
  Margin                32.5%     33.0%     34.0%     35.0%     36.0%     37.0%

Less: D&A              ($12.5M)  ($13.1M)  ($13.9M)  ($14.8M)  ($15.6M)  ($16.6M)
EBIT                    $68.8M    $73.5M    $80.9M    $88.5M    $96.9M   $106.1M
Less: Cash Interest    ($35.0M)  ($32.0M)  ($29.0M)  ($26.0M)  ($23.0M)  ($20.0M)
EBT                     $33.8M    $41.5M    $51.9M    $62.5M    $73.9M    $86.1M
Less: Taxes (25%)       ($8.4M)  ($10.4M)  ($13.0M)  ($15.6M)  ($18.5M)  ($21.5M)
Net Income              $25.4M    $31.1M    $38.9M    $46.9M    $55.4M    $64.6M
```

### Free Cash Flow and Debt Paydown

```
FREE CASH FLOW FOR DEBT SERVICE:

                        Year 1    Year 2    Year 3    Year 4    Year 5
EBITDA                  $86.6M    $94.8M   $103.3M   $112.5M   $122.7M
Less: Cash Interest    ($32.0M)  ($29.0M)  ($26.0M)  ($23.0M)  ($20.0M)
Less: Taxes            ($10.4M)  ($13.0M)  ($15.6M)  ($18.5M)  ($21.5M)
Less: CapEx            ($13.1M)  ($13.9M)  ($14.8M)  ($15.6M)  ($16.6M)
Less: Change in NWC     ($2.5M)   ($3.2M)   ($3.3M)   ($3.5M)   ($3.8M)
                       --------  --------  --------  --------  --------
FCFF Available          $28.6M    $35.7M    $43.6M    $51.9M    $60.8M

MANDATORY AMORTIZATION:
  Term Loan A           $15.0M    $15.0M    $15.0M    $15.0M    $15.0M
  Term Loan B            $2.0M     $2.0M     $2.0M     $2.0M     $2.0M
  Total Mandatory       $17.0M    $17.0M    $17.0M    $17.0M    $17.0M

VOLUNTARY PREPAYMENT (CASH SWEEP):
  Available for Sweep   $11.6M    $18.7M    $26.6M    $34.9M    $43.8M
  Sweep %                 50%       50%       50%       50%       50%
  Actual Sweep           $5.8M     $9.4M    $13.3M    $17.5M    $21.9M

TOTAL DEBT PAYDOWN:     $22.8M    $26.4M    $30.3M    $34.5M    $38.9M

DEBT BALANCE:
  Beginning             $500.0M   $477.2M   $450.8M   $420.5M   $386.0M
  Paydown              ($22.8M)  ($26.4M)  ($30.3M)  ($34.5M)  ($38.9M)
  Ending               $477.2M   $450.8M   $420.5M   $386.0M   $347.1M

NET DEBT REDUCTION: $500M - $347.1M = $152.9M over 5 years
```

---

## Returns Analysis

### Exit Valuation

```
EXIT SCENARIOS (Year 5):

                        Low Exit   Base Exit  High Exit
Exit EBITDA             $122.7M    $122.7M    $122.7M
Exit Multiple            7.0x       8.0x       9.0x
Enterprise Value        $858.9M    $981.6M   $1,104.3M
Less: Net Debt         ($347.1M)  ($347.1M)   ($347.1M)
Equity Value            $511.8M    $634.5M     $757.2M
```

### IRR Calculation

```
SPONSOR RETURNS:

                        Low Exit   Base Exit  High Exit
Equity Invested         $200.0M    $200.0M    $200.0M
Equity Value at Exit    $511.8M    $634.5M    $757.2M
MOIC (Money on Invested Capital)
                          2.6x       3.2x       3.8x

IRR Calculation:
  0 = -$200M + $511.8M / (1+IRR)^5
  IRR = ($511.8/$200)^(1/5) - 1 = 20.7%

Full IRR Table:
                        Low Exit   Base Exit  High Exit
IRR                      20.7%      26.0%      30.5%
MOIC                      2.6x       3.2x       3.8x
```

### IRR Attribution Analysis

```
VALUE CREATION BRIDGE (Base Case):

Entry Equity                    $200.0M
+ Debt Paydown                  $152.9M     (24.1% of value created)
+ EBITDA Growth Effect          $331.6M     (52.4% of value created)
  (($122.7M - $81.3M) * 8.0x)
+ Multiple Expansion              $0.0M     (0% -- same entry/exit multiple)
- Entry Multiple Effect        ($50.0M)     (accounting adjustment)
= Exit Equity                   $634.5M

Attribution:
  Leverage (Debt Paydown):       35%
  Operations (EBITDA Growth):    65%
  Multiple Expansion:             0%
```

---

## Key LBO Metrics

### Credit Metrics

```
                        Close     Year 1    Year 3    Year 5
Total Debt/EBITDA        6.2x      5.5x      4.1x      2.8x
Senior Debt/EBITDA       4.3x      3.8x      2.6x      1.6x
Interest Coverage        2.3x      2.7x      3.4x      4.3x
  (EBITDA/Cash Interest)
FCCR                     1.7x      2.1x      2.6x      3.2x
  (EBITDA-CapEx)/
  (Interest+Mand Amort)
Debt/Total Cap          69.0%     65.5%     57.3%     47.9%
```

### Minimum Equity Return Thresholds

| Metric | PE Minimum | Target | Exceptional |
|--------|-----------|--------|-------------|
| IRR (5-year) | 20% | 25% | 30%+ |
| MOIC | 2.0x | 2.5-3.0x | 3.5x+ |
| Cash-on-Cash (if dividends) | 1.5x | 2.0x | 2.5x+ |

---

## Sensitivity Analysis

### Entry Multiple Sensitivity

```
IRR SENSITIVITY TO ENTRY AND EXIT MULTIPLES:

Entry -->        7.0x     7.5x     8.0x     8.5x     9.0x
Exit = 7.0x     26.5%    22.0%    18.2%    14.8%    12.0%
Exit = 7.5x     30.2%    25.5%    21.5%    18.0%    15.0%
Exit = 8.0x     33.5%    28.7%    24.5%    21.0%    17.8%
Exit = 8.5x     36.5%    31.7%    27.3%    23.5%    20.3%
Exit = 9.0x     39.3%    34.3%    30.0%    26.0%    22.7%
```

### Leverage Sensitivity

```
IRR SENSITIVITY TO LEVERAGE (Base Case Exit at 8.0x):

Total Debt/EBITDA   Equity Required   Exit Equity    MOIC    IRR
4.0x                $325M             $634.5M        2.0x    14.3%
5.0x                $244M             $634.5M        2.6x    21.1%
6.0x                $206M             $634.5M        3.1x    25.2%
6.2x (base)         $200M             $634.5M        3.2x    26.0%
7.0x                $163M             $634.5M        3.9x    31.2%
```

Higher leverage amplifies equity returns but increases risk.

### EBITDA Growth Sensitivity

```
IRR SENSITIVITY TO EBITDA GROWTH AND EXIT MULTIPLE:

EBITDA CAGR -->   2%      4%      6%      8%      10%
Exit = 7.0x      12.0%   16.5%   20.7%   24.8%   28.7%
Exit = 8.0x      17.8%   22.0%   26.0%   29.8%   33.5%
Exit = 9.0x      22.7%   26.7%   30.5%   34.2%   37.8%
```

---

## Ideal LBO Candidate Characteristics

Per Kaplan and Stromberg, the ideal LBO target has:

| Characteristic | Why It Matters |
|---------------|---------------|
| Stable, predictable cash flows | Debt service requires reliable FCF |
| Strong market position | Pricing power, defensible moat |
| Low capital intensity | More FCF for debt paydown |
| Margin expansion opportunity | Operational value creation |
| Experienced management team | Can execute improvement plan |
| Low customer concentration | Reduces revenue risk |
| Tangible asset base | Collateral for senior debt |
| Minimal cyclicality | Cash flows through economic cycles |
| Clear exit path | Multiple potential acquirers or IPO viable |
| Fragmented industry | Buy-and-build / roll-up opportunity |

### Industries with Strong LBO Activity

```
Healthcare services, business services, industrial distribution,
specialty chemicals, food and beverage, insurance brokerage,
software (increasingly), education services, waste management,
auto aftermarket, building products
```

---

## Dividend Recapitalization

A dividend recap allows the PE sponsor to extract value before exit:

```
Post-LBO (Year 3):
  EBITDA: $103.3M
  Current Debt: $420.5M (4.1x leverage)
  Target Re-Leveraged: 5.5x EBITDA = $568.2M
  Additional Debt Capacity: $568.2M - $420.5M = $147.7M

Dividend Recap:
  New Debt Raised: $147.7M
  Distributed to Sponsor: $147.7M
  Sponsor Equity Remaining: same (equity value unchanged minus new debt)

Updated Returns (Year 5):
  Total Cash to Sponsor = $147.7M (Year 3) + Exit Equity (Year 5)
  IRR increases because cash returned earlier reduces J-curve
```

---

## LBO Model Checklist

```
STRUCTURE
[ ] Sources and uses balance
[ ] Debt tranches correctly prioritized (revolver, TLA, TLB, notes, mezz)
[ ] Financing fees amortized correctly
[ ] Goodwill and intangibles calculated from purchase price allocation
[ ] Management rollover modeled if applicable

OPERATIONS
[ ] Revenue growth and margin assumptions are realistic
[ ] CapEx sufficient to support projected growth
[ ] Working capital assumptions consistent with historical
[ ] Synergies (if any) phased in realistically

DEBT
[ ] Mandatory amortization correctly modeled per credit agreement
[ ] Cash sweep mechanism correctly implemented
[ ] Interest calculated on average or beginning balance (per agreement)
[ ] Revolver draws/repays based on minimum cash balance
[ ] PIK interest accretes to principal (if applicable)

RETURNS
[ ] IRR calculated using XIRR for non-annual intervals
[ ] MOIC calculated as total distributions / total invested
[ ] Management returns shown separately (including carried interest split)
[ ] Sensitivity tables cover entry/exit multiple and EBITDA scenarios
```

---

**An LBO model is a stress test for cash flow. If a company can support 4-6x
leverage, service the debt, and still generate enough cash to create equity
value, its cash flows are genuinely robust. The LBO is finance's ultimate test
of operational quality.**
