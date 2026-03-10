# Growth Models -- Quantitative Frameworks for Growth

## The Growth Equation

### Concept

Every product's growth can be decomposed into a mathematical equation where
each variable represents a measurable, optimizable input. The growth equation
transforms abstract "growth" into a concrete system of levers.

Brian Balfour's core insight: "If you cannot write your growth as an equation,
you do not understand your growth."

### SaaS Growth Equation

```
MRR Growth = New MRR + Expansion MRR - Contraction MRR - Churn MRR

Where:
  New MRR = Visitors x Signup Rate x Activation Rate x Conversion Rate x ARPU
  Expansion MRR = Active Customers x Expansion Rate x Expansion ARPU
  Contraction MRR = Active Customers x Contraction Rate x Contraction Amount
  Churn MRR = Active Customers x Churn Rate x Average MRR per Churned Customer
```

### Marketplace Growth Equation

```
GMV Growth = Transactions x Average Order Value

Where:
  Transactions = Active Buyers x Purchase Frequency
  Active Buyers = New Buyers + Retained Buyers + Resurrected Buyers - Churned Buyers
  New Buyers = Traffic x Signup Rate x First Purchase Rate
  Average Order Value = f(assortment, pricing, bundling)
```

### Consumer App Growth Equation

```
DAU = New Users(d) + Retained Users(d) + Resurrected Users(d)

Where:
  New Users(d) = Organic New + Paid New + Viral New
  Retained Users(d) = DAU(d-1) x Day-1 Retention Rate (for daily products)
  Viral New = DAU(d-1) x Invite Rate x Invitations Sent x Accept Rate
```

### Decomposing the Equation

The power of the growth equation is decomposition. Each variable can be:
1. **Measured**: What is the current value?
2. **Benchmarked**: How does it compare to best-in-class?
3. **Modeled**: What happens if we improve it by X%?
4. **Prioritized**: Which variable has the highest leverage?

Leverage analysis formula:
```
Leverage(variable) = (% improvement in output) / (% improvement in variable)
```

Variables early in the equation (large base, low conversion) typically have
higher leverage than variables late in the equation.

---

## Bottoms-Up Forecasting

### Why Bottoms-Up

Top-down forecasting (TAM x Market Share = Revenue) is useful for investor
narratives but useless for operations. Bottoms-up forecasting builds from
observable inputs and testable assumptions.

### The Bottoms-Up Method

Step 1: Identify all inputs to the growth equation
Step 2: Set current baseline for each input (measured, not assumed)
Step 3: Project each input independently with stated assumptions
Step 4: Combine inputs through the growth equation
Step 5: Validate against historical actuals (within 20% tolerance)
Step 6: Run sensitivity analysis on key assumptions

### Example: SaaS Bottoms-Up Forecast

```
Month 1 Baseline:
  Website Visitors: 50,000
  Signup Rate: 3.0%
  Activation Rate: 40%
  Free-to-Paid Conversion: 8%
  ARPU: $49/month
  Monthly Churn: 5%

Projected Improvements (quarterly):
  Visitors: +10% (SEO + content investment)
  Signup Rate: +0.5pp (landing page optimization)
  Activation Rate: +3pp (onboarding experiments)
  Conversion: +1pp (pricing page optimization)
  ARPU: +$5 (upsell features)
  Churn: -0.5pp (retention experiments)

Month 1 New MRR:
  50,000 x 0.030 x 0.40 x 0.08 x $49 = $2,352

Month 4 New MRR (with improvements):
  55,000 x 0.035 x 0.43 x 0.09 x $54 = $4,023 (+71%)
```

### Sensitivity Analysis

For each input, calculate:
```
Sensitivity = (% change in output) / (1% change in input)
```

High-sensitivity inputs deserve more experimental investment. In the example
above, activation rate has the highest sensitivity because it sits early in
the chain and affects all downstream conversion.

### Cohort-Based Forecasting

For mature products, forecast by cohort rather than aggregate:

```
Revenue(month t) = SUM over all cohorts c of:
  Cohort_Size(c) x Retention_Rate(c, age) x ARPU(c, age)

Where:
  age = t - cohort_start_month
  Retention_Rate(c, age) = fitted from historical retention curves
  ARPU(c, age) = fitted from historical revenue curves (includes expansion)
```

This method naturally accounts for cohort quality changes over time and
produces more accurate forecasts than aggregate models.

---

## Cohort Modeling

### What Cohort Analysis Reveals

Cohort analysis groups users by their start date and tracks behavior over
time. This eliminates the confounding effect of mixing users at different
stages of their lifecycle.

### Retention Cohort Table

```
         Week 0  Week 1  Week 2  Week 3  Week 4  Week 8  Week 12
Jan '24   100%    45%     35%     30%     28%     22%     20%
Feb '24   100%    48%     38%     33%     31%     25%     23%
Mar '24   100%    52%     42%     37%     35%     --      --
```

Reading this table:
- Each row is a cohort (users who started in that month)
- Each column is time since start
- Values show % of original cohort still active
- Improving rows (Jan < Feb < Mar) indicate product improvements are working

### Retention Curve Shapes

**Flattening curve** (healthy):
Steep initial drop-off, then stabilizes at a positive asymptote.
Mathematical model: R(t) = a + (1-a) x e^(-bt)
Where a = long-term retention rate, b = decay rate.

**Declining curve** (unhealthy):
Continuous decline toward zero with no flattening.
Mathematical model: R(t) = e^(-bt)
No long-term retention: product does not retain users.

**Smile curve** (exceptional):
Initial decline, then stabilization, then increase.
Occurs when retained users increase engagement over time.
Mathematical model: R(t) = a + (1-a) x e^(-bt) + c x ln(t+1)
The logarithmic term captures increasing engagement.

### LTV from Cohort Data

```
LTV = SUM over t=0 to T of: Retention(t) x ARPU(t) / (1+d)^t

Where:
  Retention(t) = cohort retention rate at time t
  ARPU(t) = average revenue per active user at time t
  d = discount rate (monthly)
  T = modeling horizon (typically 24-36 months)
```

For practical purposes, if the retention curve has flattened:
```
LTV_simplified = ARPU x (1 / Churn_Rate)
```

But this overestimates LTV if the curve has not truly flattened.

---

## The Growth Model Canvas

### Framework

A one-page model that captures the complete growth system:

```
┌─────────────────────────────────────────────────────────────┐
│                    GROWTH MODEL CANVAS                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│   ACQUIRE    │   ACTIVATE   │   RETAIN     │   MONETIZE     │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Channels:    │ Aha Moment:  │ Frequency:   │ Model:         │
│ - Primary    │ - Definition │ - Natural    │ - Freemium     │
│ - Secondary  │ - Metric     │ - Current    │ - Usage-based  │
│ - Emerging   │              │              │ - Subscription │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ CAC:         │ Activation   │ Retention:   │ ARPU:          │
│ - Blended    │ Rate:        │ - D1/D7/D30  │ - Free         │
│ - By channel │ - Current    │ - Curve type │ - Paid         │
│ - Trend      │ - Target     │ - Benchmark  │ - Expansion    │
├──────────────┼──────────────┼──────────────┼────────────────┤
│ Growth Loop: │ Setup        │ Engagement   │ LTV:           │
│ - Type       │ Moment:      │ Loop:        │ - By cohort    │
│ - K-factor   │ - Steps      │ - Trigger    │ - By channel   │
│ - Cycle time │ - Completion │ - Action     │ - By segment   │
│              │              │ - Reward     │                │
├──────────────┴──────────────┴──────────────┴────────────────┤
│ GROWTH EQUATION:                                             │
│ [Product-specific equation with all variables]               │
├──────────────────────────────────────────────────────────────┤
│ NORTH STAR METRIC: [Definition + Current + Target]           │
├──────────────────────────────────────────────────────────────┤
│ TOP 3 LEVERS: [Highest-leverage variables from equation]     │
└──────────────────────────────────────────────────────────────┘
```

### Using the Canvas

1. Fill in each cell with current data (not aspirational)
2. Identify the weakest cell (biggest gap to benchmark)
3. The weakest cell is your highest-priority growth area
4. Design experiments targeting that cell
5. Update the canvas monthly with new data

---

## Growth Modeling Techniques

### Monte Carlo Simulation for Growth

When input assumptions are uncertain, use Monte Carlo simulation:

```
For each simulation run (n=10,000):
  Sample each input from its probability distribution:
    Visitors ~ Normal(50000, 5000)
    Signup Rate ~ Beta(30, 970)  # 3% mean
    Activation Rate ~ Beta(40, 60)  # 40% mean
    ...
  Calculate output using growth equation
  Store result

Report:
  P10, P25, P50, P75, P90 of output distribution
```

This produces a range of outcomes instead of a single point estimate,
enabling better decision-making under uncertainty.

### Scenario Modeling

Define three scenarios with internally consistent assumptions:

**Bear case**: Conservative inputs, no improvement in conversion rates,
higher churn than baseline.

**Base case**: Current trends continue, moderate improvements from planned
experiments.

**Bull case**: Key experiments succeed, activation rate improves significantly,
new loop becomes operational.

### Growth Accounting Model

Track monthly:
```
┌─────────────────────────────────────────────┐
│           Jan    Feb    Mar    Apr    May    │
│ Starting  10000  11200  12544  14049  15735  │
│ + New     2000   2200   2420   2662   2928   │
│ + Resurr.  200    220    240    264    290   │
│ - Churned  1000   1076   1155   1240   1333  │
│ = Ending  11200  12544  14049  15735  17620  │
│ Quick Ratio 2.2   2.25   2.30   2.36   2.41 │
└─────────────────────────────────────────────┘
```

Healthy pattern: Quick Ratio improving over time as retention gains compound.

---

## Model Validation

### Backtesting

Apply the model to historical periods and compare predicted vs actual:
```
MAPE = (1/n) x SUM of |Actual - Predicted| / Actual x 100%
```

Target: MAPE < 20% for monthly forecasts, < 10% for weekly.

### Assumption Auditing

Every quarter, audit each input assumption:
1. Was the assumption based on data or intuition?
2. Has the underlying data changed?
3. Did the assumption prove accurate in the forecast period?
4. What new information should update the assumption?

### Model Drift Detection

Monitor forecast accuracy over time. If MAPE increases consistently:
1. Identify which input assumption drifted
2. Determine if drift is temporary (seasonal) or structural
3. Update the model with new data
4. Re-validate against recent actuals

---

## Key Formulas Reference

| Formula | Use Case |
|---------|----------|
| CMGR = (End/Start)^(1/months) - 1 | Compound monthly growth rate |
| LTV = ARPU / Churn Rate | Simplified lifetime value |
| Payback = CAC / (ARPU x Gross Margin) | Months to recover CAC |
| Quick Ratio = (New + Resurr.) / Churned | Growth health indicator |
| K = Invites x Conversion | Viral coefficient |
| Rule of 72: Doubling time = 72/g% | Time to double at growth rate g |
| NRR = (Start + Exp. - Contr. - Churn) / Start | Net revenue retention |
| DAU/MAU | Engagement stickiness ratio |
| Power User % = L28 >= 21 / Total | Percentage of highly engaged users |
