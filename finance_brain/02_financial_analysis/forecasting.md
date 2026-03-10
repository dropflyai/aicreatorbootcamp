# Financial Forecasting

## Foundation

Forecasting is the forward-looking discipline of finance. While financial
statements describe the past, forecasts translate strategy into numbers and
provide the basis for capital allocation, fundraising, and operational
planning. This module covers revenue forecasting, expense modeling, scenario
analysis, and the statistical and judgment-based methods used by CFOs and
FP&A teams at the highest level.

Reference: Makridakis/Wheelwright/Hyndman, Forecasting: Methods and
Applications. CFA Level II, Quantitative Methods. Damodaran, Narrative
and Numbers.

---

## Forecasting Philosophy

### The Damodaran Framework: Narrative and Numbers

Per Aswath Damodaran, every forecast must connect a narrative (story about the
company's future) to numbers (financial projections). The narrative must be:

1. **Possible**: Not physically or logically impossible
2. **Plausible**: Consistent with market conditions and competitive dynamics
3. **Probable**: The most likely outcome given available evidence

The numbers must:
1. Flow from the narrative (not arbitrary growth rates)
2. Converge to sustainable steady-state levels
3. Be internally consistent (margins, returns, reinvestment)

### Forecasting Accuracy Realism

Studies consistently show that long-range forecasts have wide error bands:

```
Forecast Horizon    Typical Revenue Forecast Error (MAPE)
1 quarter           5-15%
1 year              10-25%
2 years             20-40%
3 years             30-60%
5 years             50-100%+
```

This is not a reason to avoid forecasting. It is a reason to:
- Use scenarios rather than point estimates
- Attach probability weights to scenarios
- Update forecasts frequently (rolling forecasts)
- Focus on the assumptions, not the outputs

---

## Revenue Forecasting Methods

### Method 1: Growth Rate Extrapolation

Simplest method. Apply a growth rate to the most recent period.

```
Revenue_t+1 = Revenue_t * (1 + growth_rate)
```

**When to use:** Quick estimates, early-stage when detailed drivers are not yet
available.

**Refinements:**
- Decaying growth: g_t+1 = g_t * decay_factor (e.g., 0.85)
- S-curve growth: growth accelerates, peaks, then decelerates
- Mean-reverting: growth converges to industry average over time

### Method 2: Driver-Based (Bottoms-Up)

Decompose revenue into fundamental drivers and forecast each independently.

**SaaS Revenue Drivers:**
```
Revenue = Customers * ARPU * 12

Detailed Build:
  Beginning Customers                    1,000
  + Gross New Customers                    400
    (Marketing Qualified Leads * Conversion Rate * Close Rate)
    (10,000 MQLs * 40% * 10% = 400)
  - Churned Customers                     (80)
    (Beginning Customers * Logo Churn Rate)
    (1,000 * 8% = 80)
  = Ending Customers                     1,320

  Beginning ARPU                          $100
  + Price Increases (annual, 5%)            $5
  + Upsell/Expansion (per customer)         $8
  = Ending ARPU                           $113

  Estimated Annual Revenue = Avg Customers * Avg ARPU * 12
                           = 1,160 * $106.50 * 12
                           = $1,482,480
```

**E-Commerce Revenue Drivers:**
```
Revenue = Traffic * Conversion Rate * Average Order Value

  Monthly Traffic: 500,000 visitors
  Conversion Rate: 2.5%
  Average Order Value: $85
  Monthly Revenue = 500,000 * 0.025 * $85 = $1,062,500
```

**Marketplace Revenue Drivers:**
```
GMV = Sellers * Avg Listings * Avg Transaction Value * Transactions per Listing
Revenue = GMV * Take Rate
```

### Method 3: Top-Down Market Sizing

Start with the total market and work down to company share.

```
TAM (Total Addressable Market)                $10,000,000,000
  x SAM Factor (serviceable segment)                    15%
SAM (Serviceable Addressable Market)           $1,500,000,000
  x Market Share (realistic for stage)                 0.5%
Revenue Estimate                                  $7,500,000
```

**Validation:** Cross-reference top-down with bottoms-up. If they differ by more
than 2x, investigate why and reconcile.

### Method 4: Cohort-Based Forecasting

The gold standard for subscription businesses. Track each customer cohort's
behavior separately and project forward.

```
COHORT REVENUE MODEL:

Cohort Q1-24  Month 1  Month 3  Month 6  Month 12  Month 18  Month 24
Customers       100      96       90        80        73        68
ARPU            $50     $52      $55       $62       $68       $74
MRR           $5,000  $4,992   $4,950    $4,960    $4,964    $5,032

Retention %     --      96%      94%       89%       85%       82%
NRR %           --     99.8%    99.0%     99.2%     99.3%    100.6%
```

Each new quarter's cohort has its own row. Total revenue = sum of all active
cohorts. This captures the compounding effect of improving retention and expansion.

### Method 5: Statistical / Time Series

For businesses with sufficient historical data:

**Moving Average:**
```
Forecast_t = (1/n) * sum(Revenue_{t-1} to Revenue_{t-n})
```

**Exponential Smoothing:**
```
Forecast_t = alpha * Actual_{t-1} + (1-alpha) * Forecast_{t-1}
Where alpha = smoothing parameter (0 < alpha < 1)
```

**Linear Regression:**
```
Revenue = a + b * time + epsilon
Where b = trend coefficient, estimated via OLS
```

**Seasonal Decomposition:**
```
Revenue_t = Trend_t * Seasonal_t * Residual_t  (multiplicative)
Revenue_t = Trend_t + Seasonal_t + Residual_t  (additive)
```

---

## Expense Forecasting

### Fixed vs. Variable Expense Framework

```
Total Expenses = Fixed Costs + (Variable Cost per Unit * Volume)

Fixed Costs (do not change with revenue in the short run):
  - Rent and facilities
  - Core team salaries (executive, base engineering)
  - Insurance and compliance
  - Software subscriptions (base tier)

Variable Costs (scale with revenue or volume):
  - Hosting/infrastructure (per user or per transaction)
  - Payment processing (per transaction)
  - Sales commissions (per deal)
  - Customer support (per ticket or per customer)

Semi-Variable Costs (step function):
  - Headcount (hire in batches as volume grows)
  - Office space (lease new space at thresholds)
  - Management layers (new VP at certain team sizes)
```

### Expense Ratio Approach

Forecast expenses as a percentage of revenue, with convergence to target margins:

```
                        Year 1   Year 2   Year 3   Year 4   Year 5
Revenue ($M)             $10.0    $16.0    $24.0    $33.6    $43.7
Revenue Growth             --      60%      50%      40%      30%

COGS (% of Rev)           20%      18%      16%      15%      15%
R&D (% of Rev)            35%      30%      25%      22%      20%
S&M (% of Rev)            50%      45%      38%      32%      28%
G&A (% of Rev)            20%      16%      13%      11%      10%

Total OpEx (% of Rev)    125%     109%      92%      80%      73%
Operating Margin         -25%      -9%       8%      20%      27%
```

**Key Principle:** As a company scales, operating leverage drives margin expansion.
R&D and G&A grow slower than revenue. S&M efficiency improves. COGS benefits from
scale economies in hosting and infrastructure.

### Headcount-Driven Expense Model

Most accurate for people-intensive businesses:

```
For each department:
  Headcount Plan (beginning, hires by month, attrition)
  x Average Compensation (base + bonus + equity + benefits)
  = Personnel Cost

  + Non-Personnel Costs
    Software and tools (per seat or fixed)
    Travel (per person or per customer visit)
    Professional services (event-driven)
    Facilities (per person)
  = Total Department Cost
```

---

## Scenario Analysis

### Standard Three-Scenario Framework

```
SCENARIO DEFINITIONS:

Bear Case (Probability: 20-25%)
  - Revenue growth 50% of base case
  - Higher churn, lower expansion
  - Delayed hiring, cost cuts needed
  - Trigger: market downturn, competitive pressure, product-market fit issues

Base Case (Probability: 50-60%)
  - Most likely outcome given current trajectory
  - Based on pipeline data and historical conversion rates
  - Assumes no major external shocks or windfalls
  - Calibrated to recent trend with moderate assumptions

Bull Case (Probability: 20-25%)
  - Revenue growth 150% of base case
  - Lower churn, higher expansion, faster new customer acquisition
  - Accelerated hiring to capture opportunity
  - Trigger: market tailwind, viral growth, large enterprise wins
```

### Probability-Weighted Expected Value

```
Expected Revenue = P(bear) * Rev_bear + P(base) * Rev_base + P(bull) * Rev_bull
                 = 0.25 * $12M + 0.50 * $20M + 0.25 * $32M
                 = $3M + $10M + $8M
                 = $21M
```

### Sensitivity Analysis

Test how output changes with variation in a single input:

```
Revenue Sensitivity to Conversion Rate:

Conversion Rate    New Customers    Revenue     Delta vs. Base
1.5%                   225         $14.2M         -29%
2.0%                   300         $18.0M         -10%
2.5% (base)            375         $20.0M          --
3.0%                   450         $22.0M         +10%
3.5%                   525         $24.0M         +20%
```

### Tornado Chart Data

Rank inputs by their impact on the output:

```
INPUT                     Low Case    High Case    Output Range
Logo Churn Rate           5% -> $22M  12% -> $16M    $6.0M
New Customer Growth       -20% -> $17M +20% -> $23M  $6.0M
ARPU                      $80 -> $16M  $120 -> $24M  $8.0M
Expansion Rate            3% -> $19M   10% -> $22M   $3.0M
Sales Cycle Length        +30d -> $18M -30d -> $22M   $4.0M
```

ARPU has the highest sensitivity, so it should receive the most scrutiny.

---

## Rolling Forecast Methodology

### Why Rolling Forecasts Beat Annual Budgets

| Dimension | Annual Budget | Rolling Forecast |
|-----------|--------------|-----------------|
| Horizon | Fixed (Jan-Dec) | Always 12-18 months forward |
| Update frequency | Once per year | Monthly or quarterly |
| Accuracy | Decays rapidly | Continuously refreshed |
| Effort | Massive annual exercise | Lighter, incremental updates |
| Agility | Locked for year | Adapts to changing conditions |

### Rolling Forecast Process

```
Each month:
1. Close the books (actual results)
2. Compare actual vs. forecast for completed month
3. Analyze variances (identify drivers of over/under performance)
4. Update the remaining forecast months
5. Add a new month at the end (extending the horizon)
6. Communicate changes to stakeholders

Monthly Cadence:
  Day 1-5: Close and actuals
  Day 6-8: Variance analysis
  Day 9-12: Forecast update (collaboration with department heads)
  Day 13-15: Review and finalize
  Day 16+: Communicate and implement
```

---

## Forecast Accuracy Measurement

### Mean Absolute Percentage Error (MAPE)

```
MAPE = (1/n) * sum(|Actual_t - Forecast_t| / |Actual_t|) * 100%
```

### Tracking Signal

```
Tracking Signal = sum(Actual - Forecast) / MAD

Where MAD = Mean Absolute Deviation = (1/n) * sum(|Actual - Forecast|)
```

A tracking signal that consistently exceeds +/- 4 indicates systematic bias.

### Forecast Bias

```
Bias = sum(Forecast - Actual) / n

Positive bias = consistently over-forecasting (optimistic)
Negative bias = consistently under-forecasting (conservative)
```

---

## Forecast Presentation Standards

### Board-Level Forecast

```
REVENUE FORECAST -- BOARD PRESENTATION

                    Q1 Actual  Q2 Forecast  Q3 Forecast  Q4 Forecast  FY Total
Subscription Rev      $5.2M      $5.8M        $6.5M        $7.2M      $24.7M
Services Rev          $0.3M      $0.4M        $0.3M        $0.5M       $1.5M
Total Revenue         $5.5M      $6.2M        $6.8M        $7.7M      $26.2M

vs. Budget            +5%        +2%          -1%          +3%         +2%
vs. Prior Year       +35%       +30%         +28%         +25%        +29%

Key Assumptions:
  - 50 net new customers per quarter (pipeline supports 55-65)
  - NRR stable at 115%
  - No price increases until Q1 next year
  - One large enterprise deal ($500K ACV) expected in Q4

Key Risks:
  - Enterprise deal timing could slip to Q1 next year (-$125K Q4 revenue)
  - Competitive pressure on mid-market pricing (-2% ARPU risk)
  - Macro uncertainty affecting expansion decisions
```

---

## Common Forecasting Pitfalls

| Pitfall | Description | Mitigation |
|---------|------------|------------|
| Hockey stick | Exponential growth with no supporting evidence | Require driver-based justification for acceleration |
| Anchoring | Over-weighting recent results | Use multiple reference points and methods |
| Confirmation bias | Only seeking data that supports the forecast | Assign a "devil's advocate" to challenge assumptions |
| False precision | Forecasting to the dollar when uncertainty is millions | Use ranges and scenarios |
| Ignoring base rates | Assuming your company is the exception | Compare to industry base rates and survival statistics |
| Linear extrapolation | Assuming straight-line growth forever | Model saturation, competition, and mean reversion |

---

**A forecast is not a promise -- it is a structured hypothesis about the future.
The discipline lies not in being right, but in being explicit about what you
believe and why, so that when reality diverges, you learn and adapt.**
