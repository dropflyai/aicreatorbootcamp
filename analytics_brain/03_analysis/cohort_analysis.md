# Cohort Analysis — The Definitive Guide

---

## Overview

Cohort analysis is the most powerful technique in the analyst's toolkit for separating genuine behavioral trends from composition effects. When an aggregate metric changes — say, average revenue per user declines — cohort analysis reveals whether existing users are spending less (a behavioral change) or whether the user mix has shifted toward lower-value segments (a composition change). These require radically different responses.

This module covers retention cohorts, revenue cohorts, behavioral cohorts, and survival analysis — the mathematical formalization of cohort-based churn modeling.

---

## The Composition Problem

### Why Aggregate Metrics Lie

Consider this scenario:
- January cohort: 1,000 users, $50 ARPU, 60% D30 retention
- February cohort: 3,000 users, $30 ARPU, 45% D30 retention
- Blended ARPU: (1,000 * $50 + 3,000 * $30) / 4,000 = $35

If March's blended ARPU is $33, did user behavior change? Or did the February cohort (with lower ARPU) simply age into a larger proportion of the active base?

**Without cohort analysis, this question is unanswerable.** Aggregate metrics confound behavioral change with composition change. Cohort analysis separates them by tracking the same group of users (the cohort) over time, holding the population constant.

### Simpson's Paradox in Cohort Data

Simpson's Paradox occurs when a trend that appears in every cohort reverses in the aggregate. This is not rare — it is common in growing products where cohort sizes and quality shift over time.

**Example:** Every monthly cohort shows improving D30 retention (good), but the aggregate D30 retention declines (apparently bad). Cause: rapid growth is bringing in large, low-retention cohorts that dilute the improving cohort-level performance.

**The only defense against Simpson's Paradox is cohort-level analysis.** Never trust aggregate behavioral metrics without cohort decomposition.

---

## Retention Cohorts

### The Retention Matrix

The canonical retention cohort display is a triangular matrix:

```
                    Periods Since Signup
Cohort    │  M0    M1     M2     M3     M4     M5
──────────┼──────────────────────────────────────
Jan 2024  │ 100%   42%    31%    26%    23%    21%
Feb 2024  │ 100%   45%    34%    28%    25%
Mar 2024  │ 100%   48%    36%    30%
Apr 2024  │ 100%   50%    38%
May 2024  │ 100%   52%
Jun 2024  │ 100%
```

**Reading the matrix:**
- **Rows:** Each row is a cohort (users who signed up in that month)
- **Columns:** Each column is the number of periods since signup (M0 = signup month)
- **Cells:** Percentage of the cohort that was active in that period
- **Diagonal:** Each diagonal represents the same calendar month across different cohorts

**What to look for:**
- **Column trends (reading down):** Are newer cohorts retaining better at the same age? (Improving product)
- **Row trends (reading right):** How does retention decay within a cohort? (Natural churn curve)
- **Diagonal trends:** How does the same calendar period affect different cohorts? (Seasonality, market effects)
- **Flattening:** Does the retention curve flatten? At what percentage? (The retention floor = steady-state active users)

### Retention Definitions

**N-day retention (bounded):** Was the user active on exactly day N?
```
D7_retention = users_active_on_day_7 / cohort_size
```
Most precise but noisiest — a user active on days 6 and 8 but not day 7 appears as churned.

**N-day retention (rolling/unbounded):** Was the user active on day N or any day after?
```
Rolling_D7_retention = users_active_on_day_7_or_later / cohort_size
```
Smooths out daily volatility. Better for products with irregular usage patterns.

**Bracket retention:** Was the user active within a time bracket?
```
Week_2_retention = users_active_between_day_8_and_day_14 / cohort_size
```
Good for products with weekly or monthly usage cadences.

### Retention Curve Analysis

**The power law decay model:**
```
R(t) = a * t^(-b) + c

Where:
  R(t) = retention at time t
  a    = initial retention coefficient
  b    = decay rate (higher = faster churn)
  c    = retention floor (asymptotic long-term retention)
```

The retention floor `c` is the most important parameter. If `c > 0`, the product has a core of users who will retain indefinitely. If `c ≈ 0`, eventually all users churn — the product lacks sustainable value.

**Cohort improvement analysis:**
To determine if product changes are improving retention, compare the same-age retention across cohorts:

```
Improvement = R(t, cohort_new) - R(t, cohort_old)
```

For this comparison to be valid, the cohorts must be comparable in composition (acquisition channel mix, user demographics). If composition changed, use propensity score matching or stratified comparison to control for mix effects.

---

## Revenue Cohorts

### Beyond Retention: Monetization Over Time

Revenue cohorts track how much economic value each cohort generates over its lifetime. The key insight: retention and revenue can diverge. A cohort might retain at 30% but generate increasing revenue because retained users spend more over time (expansion).

### Revenue Cohort Matrix

```
                    Months Since Signup
Cohort    │   M1      M2      M3      M4      M5      M6
──────────┼──────────────────────────────────────────────
Jan 2024  │ $45K    $38K    $42K    $44K    $46K    $47K
Feb 2024  │ $62K    $51K    $55K    $58K    $60K
Mar 2024  │ $78K    $64K    $69K    $72K
Apr 2024  │ $85K    $70K    $76K
May 2024  │ $91K    $75K
Jun 2024  │ $95K
```

**Revenue cohort patterns:**

**Pattern 1: Declining revenue (common in transactional models)**
Revenue per cohort declines each month as users churn. The key question: how quickly? Does it flatten?

**Pattern 2: Expanding revenue (healthy SaaS)**
Revenue per cohort increases over time because upgrades and expansion exceed churn and contraction. This is the hallmark of strong product-market fit in subscription businesses.

**Pattern 3: U-shaped revenue**
Initial purchase, then decline, then resurgence. Common in e-commerce with seasonal buying patterns.

### Net Revenue Retention (NRR) by Cohort

```
NRR_cohort(t) = Revenue(cohort, month t) / Revenue(cohort, month t-1)

NRR > 100%: Expansion exceeds churn (excellent)
NRR = 100%: Expansion equals churn (stable)
NRR < 100%: Churn exceeds expansion (shrinking)
```

**Benchmark:** Best-in-class SaaS companies achieve NRR of 120-140%, meaning the installed base grows 20-40% annually even without new customer acquisition.

---

## Behavioral Cohorts

### Beyond Time-Based Cohorts

Traditional cohorts group users by signup date. Behavioral cohorts group users by actions they have or have not taken. This reveals the relationship between specific behaviors and outcomes.

### Behavioral Cohort Types

**Action-based cohorts:**
- Users who completed onboarding vs. those who did not
- Users who used Feature X in their first week vs. those who did not
- Users who invited a teammate vs. solo users
- Users who integrated with another tool vs. standalone users

**Intensity-based cohorts:**
- Power users (top 10% by activity) vs. casual users
- High-frequency (daily) vs. low-frequency (weekly) users
- Multi-feature users vs. single-feature users

**Outcome-based cohorts:**
- Users who churned vs. those who retained
- Users who upgraded vs. those who stayed on free
- Users who referred vs. those who did not

### The Behavioral Cohort Analysis Framework

**Step 1: Hypothesize a magic moment**
"Users who [perform action X] within [time window] have [Y]x higher [outcome metric]."

Example: "Users who create a project within 24 hours of signup have 3x higher D30 retention."

**Step 2: Validate with data**
```sql
SELECT
  CASE WHEN first_project_within_24h THEN 'Created Project' ELSE 'No Project' END as cohort,
  COUNT(DISTINCT user_id) as users,
  AVG(CASE WHEN active_day_30 THEN 1 ELSE 0 END) as d30_retention
FROM user_cohorts
GROUP BY 1
```

**Step 3: Check for causation vs. selection**
The correlation between "created a project within 24 hours" and "high retention" could mean:
- Creating a project causes retention (causal — intervene by encouraging project creation)
- Users who would retain anyway are the type who create projects quickly (selection — intervention is wasted)
- Both are caused by a third factor like motivation or use-case clarity

**Step 4: Test with an experiment**
Run an A/B test where the treatment group receives nudges to create a project within 24 hours. If the treatment group has higher retention, the relationship is causal. If not, it is selection.

---

## Survival Analysis

### From Cohort Tables to Statistical Models

Survival analysis (also called time-to-event analysis) formalizes cohort-based churn modeling using statistical methods originally developed for medical research (Kaplan & Meier, 1958; Cox, 1972).

### Key Concepts

**Survival function S(t):**
The probability that a user survives (remains active) beyond time t.
```
S(t) = P(T > t) = 1 - F(t)

Where T is the random variable representing time-to-churn
and F(t) is the cumulative distribution function of churn
```

**Hazard function h(t):**
The instantaneous rate of churn at time t, given survival up to time t.
```
h(t) = f(t) / S(t)

Where f(t) is the probability density of churn at time t
```

**The hazard function reveals churn dynamics:**
- Decreasing hazard: churn risk decreases over time (users who survive become more loyal)
- Constant hazard: churn risk is time-independent (memoryless process — exponential survival)
- Increasing hazard: churn risk increases over time (users wear out — concerning pattern)
- Bathtub curve: high initial churn, stable middle period, increasing late churn

### Kaplan-Meier Estimator

The non-parametric estimator of the survival function, handling censored data (users who have not yet churned at the time of analysis).

```
S_hat(t) = Product over all event times t_i <= t of [(n_i - d_i) / n_i]

Where:
  t_i = distinct event times (churn dates)
  n_i = number of users at risk just before t_i
  d_i = number of churn events at t_i
```

**Censoring:** A user who signed up last month and has not yet churned is censored — we know they survived at least this long, but we do not know when (or if) they will churn. The Kaplan-Meier estimator correctly incorporates this partial information rather than ignoring these users.

### Cox Proportional Hazards Model

When you want to understand which factors influence churn risk, the Cox model relates covariates to the hazard function:

```
h(t|X) = h_0(t) * exp(beta_1*X_1 + beta_2*X_2 + ... + beta_p*X_p)

Where:
  h_0(t)  = baseline hazard function (unspecified — this is the "semi-parametric" part)
  X_1...X_p = covariates (user attributes, behaviors)
  beta_1...beta_p = coefficients (log hazard ratios)
```

**Interpretation:** exp(beta_i) is the hazard ratio. If exp(beta) = 1.5 for variable X, a one-unit increase in X increases churn hazard by 50%.

**Example covariates for churn modeling:**
- Plan tier (free vs. paid)
- Onboarding completion (binary)
- Feature adoption count
- Days since last login
- Support ticket count
- Team size
- Acquisition channel

### Practical Applications of Survival Analysis

**1. Median customer lifetime estimation**
The median survival time (where S(t) = 0.5) provides a robust estimate of typical customer lifetime, properly accounting for censoring.

**2. Lifetime Value (LTV) calculation**
```
LTV = Sum over all t of [S(t) * Expected_Revenue(t)]
```
Survival-based LTV is more accurate than simple "1/churn rate" formulas because it accounts for time-varying churn and does not assume constant hazard.

**3. Churn risk scoring**
The Cox model produces individual-level churn risk scores that can be used for proactive intervention (targeting at-risk users with retention campaigns).

**4. Comparing interventions**
Log-rank tests compare survival curves between groups (e.g., users who received an intervention vs. control) to test whether the intervention reduced churn.

---

## Cohort Analysis Best Practices

### 1. Always Start with Cohort-Level Analysis
Before presenting any aggregate behavioral metric, verify that the cohort-level pattern matches the aggregate pattern. If they diverge, present cohort-level data.

### 2. Standardize Cohort Definitions
Document and enforce consistent definitions: What event defines cohort entry? What event defines "active"? What is the time window for each period? Inconsistent definitions across analyses create conflicting results.

### 3. Account for Cohort Size
Small cohorts produce volatile retention rates. A cohort of 50 users with 40% D30 retention has a 95% confidence interval of roughly [27%, 54%]. Report confidence intervals for small cohorts.

### 4. Control for Mix Shifts
When comparing cohort performance over time, control for changes in acquisition channel, geography, and other compositional factors. A "better" cohort might just be drawing from a better channel.

### 5. Use Both Retention Rate and Absolute Numbers
A cohort with 90% retention from 100 users (90 retained) may be less valuable than a cohort with 50% retention from 10,000 users (5,000 retained). Always pair rates with volumes.

### 6. Look for Cohort Flattening
The most important signal in a retention cohort is whether the curve flattens. A curve that flattens at 20% D90 indicates a sustainable core user base. A curve that continues declining toward zero indicates no sustainable value.

### 7. Decompose Retention Into Return and Resurrection
```
Active in Period T = Retained from Period T-1 + Resurrected from Earlier + New
```
A stable retention rate can mask offsetting trends — declining same-period retention offset by increasing resurrection. Decompose to understand the dynamics.

---

## Cohort Visualization

### The Retention Heatmap
Color-code the retention matrix: green for above-benchmark cells, yellow for at-benchmark, red for below-benchmark. This enables instant visual pattern recognition across dozens of cohorts.

### Cohort Retention Curves (Overlay)
Plot each cohort's retention curve on the same axes. Newer cohorts should be darker/bolder. This immediately reveals whether newer cohorts are performing better or worse than older ones.

### Cohort Waterfall
For revenue cohorts, use a waterfall chart showing new, expansion, contraction, and churn components for each period. This decomposes the net change into its drivers.

---

**Cohort analysis is not optional — it is the minimum viable analytical technique for any business with users over time. Without it, you are navigating by aggregate mirages.**
