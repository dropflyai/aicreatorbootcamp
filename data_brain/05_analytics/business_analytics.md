# Business Analytics — Cohort, Retention, LTV, and Time Series

## Overview

Business analytics translates raw data into actionable business insights. This module
covers the analytical frameworks that drive product and business decisions: cohort
analysis, funnel analysis, retention modeling, lifetime value (LTV) estimation using
probabilistic models, churn prediction, customer segmentation via RFM analysis, and
time series forecasting with ARIMA and Prophet. Every metric must be defined precisely,
computed reproducibly, and communicated with confidence intervals.

References: Fader & Hardie (BG/NBD model papers), Box, Jenkins & Reinsel (Time Series
Analysis), Taylor & Letham (Prophet paper), Blattberg, Kim & Neslin (Database Marketing),
Croll & Yoskovitz (Lean Analytics).

---

## Cohort Analysis

### Definition

A cohort is a group of users who share a common characteristic at a defined point
in time. Cohort analysis tracks how these groups behave over subsequent time periods.

### Cohort Types

| Type | Definition | Example |
|------|-----------|---------|
| Acquisition | Sign-up date | "January 2024 sign-ups" |
| Behavioral | First action | "Users who made first purchase in Q1" |
| Campaign | Marketing source | "Users acquired via Google Ads" |
| Feature | Feature adoption | "Users who enabled notifications" |

### Retention Table (Cohort Triangle)

```
              Month 0   Month 1   Month 2   Month 3   Month 4
Jan cohort    1,000     450       320       280       250
              (100%)    (45%)     (32%)     (28%)     (25%)
Feb cohort    1,200     540       360       300
              (100%)    (45%)     (30%)     (25%)
Mar cohort    900       380       250
              (100%)    (42%)     (28%)
Apr cohort    1,100     470
              (100%)    (43%)
May cohort    1,300
              (100%)
```

### Retention Curves

Retention typically follows a power-law decay:

```
R(t) = a * t^(-b) + c

where:
  a = initial drop scaling
  b = decay rate
  c = asymptotic retention (steady-state)
```

A healthy product shows flattening retention (c > 0).
If the curve keeps declining, there is no product-market fit.

### Revenue Cohort Analysis

Extend retention to track revenue per cohort:

```
ARPU(cohort, month) = Revenue(cohort, month) / Users(cohort, month=0)

Cumulative ARPU(t) = SUM_{m=0}^{t} ARPU(cohort, m)
```

If cumulative ARPU exceeds CAC, the cohort is profitable from that point.

---

## Funnel Analysis

### Funnel Structure

```
Visitors:         100,000 (100%)
    |
Sign-ups:         10,000  (10.0% conversion)
    |
Activated:        3,000   (30.0% activation)
    |
Subscribed:       600     (20.0% subscription)
    |
Retained (M3):    400     (66.7% 3-month retention)
```

### Key Metrics

- **Conversion rate**: users completing step / users entering step
- **Drop-off rate**: 1 - conversion rate
- **Time to convert**: median days between funnel steps
- **Funnel velocity**: rate of users flowing through the funnel

### Funnel Optimization Framework

1. Identify the step with the largest absolute drop-off
2. Segment by user attributes (device, source, plan)
3. Analyze behavioral differences between converters and non-converters
4. Hypothesize root causes and design experiments
5. A/B test changes and measure conversion lift

### Statistical Testing for Funnels

For comparing conversion rates between variants:

```
z = (p_1 - p_2) / sqrt(p_pool * (1 - p_pool) * (1/n_1 + 1/n_2))
where p_pool = (x_1 + x_2) / (n_1 + n_2)
```

Minimum detectable effect (MDE) for sample size planning:

```
n_per_group = (z_alpha/2 + z_beta)^2 * (p_1*(1-p_1) + p_2*(1-p_2)) / (p_1 - p_2)^2
```

---

## Retention Analysis

### Retention Types

| Metric | Definition | Formula |
|--------|-----------|---------|
| Day-N retention | % of users active on day N | Active(N) / Cohort |
| Unbounded retention | % active on day N or later | Active(>= N) / Cohort |
| Bracket retention | % active in a window [N, N+k] | Active(N to N+k) / Cohort |
| Rolling retention | % active in last 7/30 days | Active(last 7d) / Cohort |

### Retention Benchmarks (Mobile Apps)

| Category | Day 1 | Day 7 | Day 30 |
|----------|-------|-------|--------|
| Top 10% | 50%+ | 25%+ | 15%+ |
| Median | 25% | 12% | 6% |
| Bottom | < 15% | < 5% | < 2% |

### Dollar Retention (Net Revenue Retention)

```
NRR = (Beginning MRR + Expansion - Contraction - Churn) / Beginning MRR

NRR > 100% means existing customers generate more revenue over time.
Best-in-class SaaS: NRR > 120%.
```

---

## Lifetime Value (LTV) Modeling

### Simple LTV

```
LTV_simple = ARPU * Average_Lifespan
           = ARPU / Churn_Rate
           = ARPU * (1 / churn)

With discount rate:
LTV_discounted = ARPU * (1 / (churn + discount_rate))
```

### BG/NBD Model (Buy Till You Die)

The BG/NBD model (Fader, Hardie, Lee 2005) models repeat purchase behavior
using two processes:

1. **Transaction process**: while "alive," customers transact according to
   a Poisson process with rate lambda_i (heterogeneous across customers,
   Gamma-distributed)

2. **Dropout process**: after each transaction, a customer becomes inactive
   with probability p_i (heterogeneous, Beta-distributed)

```
Parameters: r, alpha (Gamma for lambda), a, b (Beta for p)

E[transactions in (0,T)] for a customer with x purchases, last at t_x:

E[X(T) | x, t_x, T, r, alpha, a, b] =
    (a + b + x - 1) / (a - 1) *
    [1 - ((alpha + T) / (alpha + T))^(r+x) *
     hypergeometric_2F1(r+x, b+x, a+b+x-1, alpha/(alpha+T))]
```

### Gamma-Gamma Model (Monetary Value)

Complements BG/NBD by modeling average transaction value:

```
E[M | x, m_x, p, q, gamma] = (q * gamma + x * m_x) / (q + x - 1)

where:
  m_x = average observed transaction value
  p, q, gamma = model parameters

Total CLV = E[transactions] * E[monetary_value] * profit_margin
```

### Implementation

```python
from lifetimes import BetaGeoFitter, GammaGammaFitter

# Prepare RFM data
rfm = summary_data_from_transaction_data(
    transactions, 'customer_id', 'date', 'revenue'
)

# Fit BG/NBD
bgf = BetaGeoFitter()
bgf.fit(rfm['frequency'], rfm['recency'], rfm['T'])

# Predict next 12 months of transactions
rfm['predicted_purchases'] = bgf.conditional_expected_number_of_purchases_up_to_time(
    365, rfm['frequency'], rfm['recency'], rfm['T']
)

# Fit Gamma-Gamma for monetary value
ggf = GammaGammaFitter()
ggf.fit(rfm['frequency'], rfm['monetary_value'])

# Calculate CLV
rfm['clv'] = ggf.customer_lifetime_value(
    bgf, rfm['frequency'], rfm['recency'], rfm['T'],
    rfm['monetary_value'], time=12, discount_rate=0.01
)
```

---

## Churn Prediction

### Definition

Churn = a customer stops using the product or cancels their subscription.

### Feature Engineering for Churn Models

| Category | Features |
|----------|----------|
| Usage | Login frequency, feature usage, session duration |
| Engagement | Days since last login, declining usage trend |
| Financial | Payment failures, plan downgrades, discount usage |
| Support | Ticket volume, NPS score, complaint frequency |
| Lifecycle | Tenure, onboarding completion, time to value |
| Social | Referrals made, team size, collaboration activity |

### Modeling Approach

1. **Define churn window**: e.g., no activity in 30 days
2. **Create observation date**: snapshot features at time T
3. **Label**: churned within [T, T+30] or not
4. **Train**: logistic regression, random forest, or gradient boosting
5. **Evaluate**: AUC-ROC, precision-recall, calibration curve
6. **Deploy**: score users weekly, trigger interventions

### Survival Analysis for Churn

Cox Proportional Hazards model:

```
h(t | X) = h_0(t) * exp(beta' * X)

Hazard ratio: HR = exp(beta_j) for a one-unit increase in X_j
HR > 1: increased risk of churn
HR < 1: decreased risk of churn (protective)
```

Kaplan-Meier estimator for survival curves:

```
S(t) = PRODUCT_{t_i <= t} (1 - d_i / n_i)

where d_i = events at time t_i, n_i = at risk at time t_i
```

---

## Customer Segmentation (RFM)

### RFM Framework

| Dimension | Definition | Scoring |
|-----------|-----------|---------|
| Recency | Days since last purchase | Lower is better |
| Frequency | Number of purchases in period | Higher is better |
| Monetary | Total spend in period | Higher is better |

### Scoring Method

Quintile-based scoring (1-5 for each dimension):

```sql
SELECT
    customer_id,
    NTILE(5) OVER (ORDER BY days_since_last_purchase ASC) AS r_score,
    NTILE(5) OVER (ORDER BY purchase_count DESC) AS f_score,
    NTILE(5) OVER (ORDER BY total_spend DESC) AS m_score,
    CONCAT(r_score, f_score, m_score) AS rfm_segment
FROM customer_summary;
```

### Segment Interpretation

| Segment | RFM Pattern | Strategy |
|---------|------------|----------|
| Champions | 5-5-5 | Reward, upsell |
| Loyal | 4-4-4 | Cross-sell, engage |
| Potential Loyal | 5-2-2 | Nurture, onboard |
| At Risk | 2-4-4 | Win-back campaign |
| Hibernating | 1-1-1 | Reactivation or sunset |

---

## Time Series Forecasting

### ARIMA (AutoRegressive Integrated Moving Average)

ARIMA(p, d, q):
- p = number of autoregressive terms
- d = degree of differencing for stationarity
- q = number of moving average terms

```
Model: (1 - phi_1*B - ... - phi_p*B^p)(1-B)^d * Y_t =
       (1 + theta_1*B + ... + theta_q*B^q) * epsilon_t

where B is the backshift operator: B*Y_t = Y_{t-1}
```

### Seasonal ARIMA: SARIMA(p,d,q)(P,D,Q)[s]

Adds seasonal components with period s:

```
(1 - PHI_1*B^s - ... - PHI_P*B^{Ps})(1 - B^s)^D * ARIMA(p,d,q) =
(1 + THETA_1*B^s + ... + THETA_Q*B^{Qs}) * epsilon_t
```

### Model Selection

- AIC = -2*log(L) + 2*k (penalizes complexity)
- BIC = -2*log(L) + k*log(n) (stronger penalty)
- auto.arima (R) / pmdarima (Python) automates order selection
- Residual diagnostics: Ljung-Box test for autocorrelation

### Facebook Prophet

Additive decomposition model:

```
y(t) = g(t) + s(t) + h(t) + epsilon(t)

g(t) = trend (linear or logistic growth with changepoints)
s(t) = seasonality (Fourier series)
h(t) = holiday effects
epsilon(t) = noise
```

Advantages:
- Handles missing data and outliers robustly
- Automatic changepoint detection
- Intuitive hyperparameters (changepoint_prior_scale, seasonality_prior_scale)
- Uncertainty intervals built in

```python
from prophet import Prophet

model = Prophet(
    changepoint_prior_scale=0.05,
    seasonality_mode='multiplicative',
    yearly_seasonality=True,
    weekly_seasonality=True,
)
model.add_country_holidays(country_name='US')
model.fit(df[['ds', 'y']])

future = model.make_future_dataframe(periods=90)
forecast = model.predict(future)
```

---

## Metric Trees

### Framework

A metric tree decomposes a north star metric into its component drivers:

```
Revenue
├── Number of Customers
│   ├── New Customers (Acquisition)
│   │   ├── Traffic * Conversion Rate
│   │   └── Channel: Organic, Paid, Referral
│   └── Existing Customers (Retention)
│       ├── Active Users * Retention Rate
│       └── Win-back Rate
└── Revenue per Customer (ARPU)
    ├── Average Order Value
    │   ├── Items per Order
    │   └── Price per Item
    └── Purchase Frequency
```

### Using Metric Trees

1. Identify which leaf metrics are actionable
2. Quantify the leverage of each lever (elasticity)
3. Prioritize interventions by impact * feasibility
4. Track leading indicators (leaves) not just lagging (root)

---

## Production Checklist

- [ ] Metrics defined with precise SQL definitions
- [ ] Cohort analysis automated with daily refresh
- [ ] Retention curves computed for each acquisition channel
- [ ] LTV model validated against holdout period actuals
- [ ] Churn model evaluated with precision-recall at operational threshold
- [ ] RFM segments refreshed monthly with action triggers
- [ ] Time series forecasts include prediction intervals
- [ ] Dashboard shows metric tree with drill-down capability
- [ ] Data quality checks on all upstream data sources
- [ ] Documentation of all assumptions and limitations
