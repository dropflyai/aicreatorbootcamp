# Pricing Experiments — A/B Testing, WTP Research, and Feature Value Testing

## Overview

Pricing experimentation is the empirical foundation for pricing decisions. While theory
provides frameworks and intuition provides hypotheses, experimentation provides evidence.
This module covers the ethical and practical dimensions of A/B testing pricing, the
design and analysis of Van Westendorp and Gabor-Granger surveys, conjoint analysis
design and interpretation, and feature value testing methodologies. Every significant
pricing change should be supported by experimental evidence.

---

## 1. Ethics of Pricing Experiments

### The Ethical Framework

Pricing experiments involve showing different prices to different customers, which
raises legitimate fairness concerns. These must be addressed proactively.

```
ETHICAL PRINCIPLES:

  1. TRANSPARENCY
     If asked, do not deny that pricing varies
     "We regularly test different pricing configurations to find
     the best value for our customers"

  2. FAIRNESS
     No customer should be harmed by the experiment
     If a customer pays more during a test, offer retroactive adjustment
     Never test on protected characteristics (race, gender, location used as proxy)

  3. MINIMIZED EXPOSURE
     Keep test duration as short as possible (2-4 weeks)
     Keep test population as small as feasible for statistical significance
     Use new visitors only (not existing paying customers)

  4. VALUE ALIGNMENT
     Higher prices must correspond to higher value or better experience
     Never test a higher price with LESS value than the control

  5. CUSTOMER RECOURSE
     Customers who purchased during a test can receive price adjustment
     Honor the lower price if a customer discovers the disparity
```

### What Is Ethically Acceptable

| Test Type | Ethical? | Notes |
|-----------|---------|-------|
| **A/B test on new visitors (no purchase yet)** | Yes | No harm; they haven't paid |
| **A/B test on pricing page layout** | Yes | Same prices, different presentation |
| **A/B test on annual vs. monthly default** | Yes | Same prices, different framing |
| **A/B test with higher price for some new visitors** | Conditional | OK if transparent; offer adjustment if discovered |
| **A/B test with different prices for existing customers** | No | Violates fairness; existing customers should be treated equally |
| **Geographic pricing (PPP)** | Yes | Standard practice; addresses purchasing power differences |
| **Testing higher price with less features** | No | Clearly unfair; never do this |

---

## 2. A/B Testing Pricing

### Pricing A/B Test Design

```
STANDARD A/B TEST STRUCTURE:

  CONTROL: Current pricing page / current prices
  TREATMENT: Modified pricing page / modified prices

  POPULATION: New visitors only (never existing customers)
  RANDOMIZATION: 50/50 split (or 80/20 for cautious tests)
  DURATION: 2-4 weeks minimum (must capture full purchase cycle)
  SAMPLE SIZE: Minimum 1000 visitors per variant (for conversion tests)
               Minimum 100 purchases per variant (for ARPU tests)

  PRIMARY METRIC: Revenue per visitor (RPV)
    RPV = Conversion Rate * ARPU
    This captures both conversion and pricing impact in one metric

  SECONDARY METRICS:
    - Conversion rate (did more or fewer people buy?)
    - ARPU (did buyers spend more or less?)
    - Plan distribution (which plans were chosen?)
    - Annual/monthly split
    - Time to purchase (decision speed)
```

### What to A/B Test

```
SAFE TO TEST (no ethical concern):

  PRICING PAGE LAYOUT:
    - Number of plans shown (3 vs 4)
    - Plan ordering (expensive→cheap vs cheap→expensive)
    - Feature bullet points (more vs fewer)
    - Default billing period (annual vs monthly)
    - Highlighted/recommended plan

  PRICING FRAMING:
    - Monthly equivalent vs total annual price
    - Savings display ("Save 20%" vs "Save $240/year")
    - Price anchoring (showing crossed-out "regular" price)
    - Per-unit framing ($10/user vs $500/50-user team)

  CTA AND CONVERSION:
    - CTA copy ("Start free trial" vs "Get started free")
    - CTA color and placement
    - Social proof presence and type
    - FAQ section content

  CAREFULLY TEST (with ethical safeguards):

  ACTUAL PRICE POINTS:
    - Higher vs lower price for same tier
    - Different discount amounts (15% vs 25% annual)
    - Add-on pricing variations
```

### Statistical Rigor

```
SAMPLE SIZE CALCULATION:

  Minimum Detectable Effect (MDE):
    For conversion rate tests: Typically 10-20% relative change
    For ARPU tests: Typically 5-10% relative change

  Formula (simplified):
    n = (Z_alpha + Z_beta)^2 * 2 * p * (1-p) / (MDE * p)^2

    Where:
      Z_alpha = 1.96 (for 95% confidence)
      Z_beta = 0.84 (for 80% power)
      p = baseline conversion rate
      MDE = minimum relative change you want to detect

  EXAMPLE:
    Baseline conversion: 5%
    MDE: 20% relative (detect change from 5% to 6%)
    Required per variant: ~14,700 visitors

    Baseline conversion: 10%
    MDE: 15% relative (detect change from 10% to 11.5%)
    Required per variant: ~9,200 visitors

SIGNIFICANCE TESTING:
  Use: Chi-squared test for conversion rates
       t-test for ARPU (if normally distributed)
       Mann-Whitney for ARPU (if skewed)
  Threshold: p < 0.05 (95% confidence)
  Multiple comparisons: Apply Bonferroni correction if testing
                        more than 2 variants simultaneously
```

---

## 3. Van Westendorp Implementation

### Survey Design

```
VAN WESTENDORP PRICE SENSITIVITY METER:

  CONTEXT (show before questions):
    [Product description: What it does, key features, target user]
    [Any visuals: Screenshot, demo video link]

  QUESTIONS (in this order):

    Q1: "At what price would you consider [Product] to be priced
         so LOW that you would question its quality?"
    [Open numeric field: $___]

    Q2: "At what price would you consider [Product] to be a
         BARGAIN — a great buy for the money?"
    [Open numeric field: $___]

    Q3: "At what price would you consider [Product] to start to
         seem EXPENSIVE, but you would still consider buying it?"
    [Open numeric field: $___]

    Q4: "At what price would you consider [Product] to be TOO
         EXPENSIVE — you would never consider buying it?"
    [Open numeric field: $___]

  VALIDATION RULES:
    Q1 < Q2 < Q3 < Q4 (must be monotonically increasing)
    Remove responses where this condition is violated
```

### Analysis Procedure

```
STEP 1: CLEAN DATA
  Remove responses where Q1 >= Q2 or Q2 >= Q3 or Q3 >= Q4
  Remove extreme outliers (>3 standard deviations from median)
  Typical valid response rate: 80-90% of total

STEP 2: CALCULATE CUMULATIVE DISTRIBUTIONS
  For each price point on the x-axis:
    Too Cheap:      % of respondents who said Q1 >= that price (inverse cumulative)
    Bargain:        % of respondents who said Q2 >= that price (inverse cumulative)
    Expensive:      % of respondents who said Q3 <= that price (cumulative)
    Too Expensive:  % of respondents who said Q4 <= that price (cumulative)

STEP 3: FIND INTERSECTIONS
  OPP (Optimal Price Point): Where Too Cheap crosses Too Expensive
  IPP (Indifference Price): Where Bargain crosses Expensive
  PMC (Point of Marginal Cheapness): Where Too Cheap crosses Expensive
  PME (Point of Marginal Expensiveness): Where Bargain crosses Too Expensive

STEP 4: DETERMINE ACCEPTABLE PRICE RANGE
  Lower bound: PMC (below this = "too cheap" concerns)
  Upper bound: PME (above this = "too expensive" resistance)
  Optimal single price: OPP
  Expected market price: IPP

STEP 5: SEGMENT ANALYSIS
  Run the same analysis for each customer segment
  Different segments will have different acceptable ranges
  Use this to inform tier pricing (each tier matches a segment's range)
```

---

## 4. Gabor-Granger Implementation

### Survey Design

```
GABOR-GRANGER DIRECT PRICE TESTING:

  METHOD 1: SEQUENTIAL (Adaptive)

    Show product description.

    Q1: "Would you purchase [Product] at $79/month?"
        [ ] Definitely yes
        [ ] Probably yes
        [ ] Might or might not
        [ ] Probably not
        [ ] Definitely not

    If "Definitely/Probably yes":
      Q2: "Would you purchase at $99/month?" (increase)
    If "Probably/Definitely not":
      Q2: "Would you purchase at $59/month?" (decrease)

    Continue until crossing the purchase threshold.

  METHOD 2: MONADIC (Random Assignment)

    Randomly assign each respondent ONE price point.
    Each respondent sees only their assigned price.

    Groups:
      Group A (n=100): Sees $29/month
      Group B (n=100): Sees $49/month
      Group C (n=100): Sees $79/month
      Group D (n=100): Sees $99/month
      Group E (n=100): Sees $149/month

    Each group answers the same purchase intent question.
    Compare purchase intent across groups.

    ADVANTAGE: No anchoring bias (each person sees one price)
    DISADVANTAGE: Requires larger sample size
```

### Analysis

```
DEMAND CURVE CONSTRUCTION:

  Price Point   % "Definitely + Probably" Purchase    Estimated Demand
  ─────────────────────────────────────────────────────────────────
  $29           85%                                   85 of 100
  $49           72%                                   72 of 100
  $79           48%                                   48 of 100
  $99           30%                                   30 of 100
  $149          12%                                   12 of 100

REVENUE OPTIMIZATION:

  Revenue = Price * Demand (per 100 potential customers)

  $29:   $29 * 85  = $2,465
  $49:   $49 * 72  = $3,528
  $79:   $79 * 48  = $3,792  ← REVENUE MAXIMIZING
  $99:   $99 * 30  = $2,970
  $149:  $149 * 12 = $1,788

  Optimal price: $79 (highest revenue)
  Note: At $79, you lose 52% of potential customers but maximize revenue

PROFIT OPTIMIZATION (if cost data available):

  Profit = (Price - Cost) * Demand

  If marginal cost = $5/customer/month:
    $29:  ($29-$5) * 85  = $2,040
    $49:  ($49-$5) * 72  = $3,168
    $79:  ($79-$5) * 48  = $3,552  ← PROFIT MAXIMIZING (same as revenue for SaaS)
    $99:  ($99-$5) * 30  = $2,820
    $149: ($149-$5) * 12 = $1,728
```

---

## 5. Conjoint Analysis — Design and Execution

### Study Design

```
CONJOINT ANALYSIS DESIGN:

  STEP 1: DEFINE ATTRIBUTES AND LEVELS

    Attribute 1: PRICE
      Levels: $29/mo, $49/mo, $79/mo, $99/mo, $149/mo

    Attribute 2: USERS INCLUDED
      Levels: 5, 15, 50, Unlimited

    Attribute 3: FEATURES
      Levels: Basic, Standard, Premium

    Attribute 4: SUPPORT LEVEL
      Levels: Email only, Email + Chat, Full (Email + Chat + Phone)

    Attribute 5: STORAGE
      Levels: 10GB, 50GB, 200GB, Unlimited

  STEP 2: GENERATE CHOICE SETS

    Use experimental design software (Sawtooth, conjointly.com) to
    generate balanced, orthogonal choice sets.

    Typical: 12-15 choice sets per respondent
    Each set: 3-4 product configurations + "None of these"

  STEP 3: SURVEY RESPONDENT

    "If these were your only options, which would you choose?"

    Option A:          Option B:          Option C:
    $49/mo             $79/mo             $99/mo
    15 users           50 users           Unlimited users
    Standard           Premium            Premium
    Email + Chat       Email only         Full support
    50GB               200GB              Unlimited

    [ ] Option A       [ ] Option B       [ ] Option C       [ ] None

  STEP 4: REPEAT FOR ALL CHOICE SETS
```

### Conjoint Analysis Output Interpretation

```
HIERARCHICAL BAYESIAN ESTIMATION OUTPUT:

  ATTRIBUTE IMPORTANCE (how much each attribute matters):
    Price:         35%  (most important)
    Features:      28%
    Users:         18%
    Support:       12%
    Storage:        7%

  PART-WORTH UTILITIES (relative preference within each attribute):
    Price:    $29: +2.8   $49: +1.2   $79: -0.3   $99: -1.5   $149: -2.2
    Features: Basic: -1.8  Standard: +0.4  Premium: +1.4
    Users:    5: -1.2     15: +0.2    50: +0.6    Unlimited: +0.4
    Support:  Email: -0.5  E+Chat: +0.2  Full: +0.3
    Storage:  10GB: -0.6   50GB: +0.1   200GB: +0.3   Unlimited: +0.2

  WILLINGNESS TO PAY FOR FEATURES:
    Premium vs Basic features:    ~$42/month
    50 users vs 5 users:          ~$28/month
    Full support vs Email only:   ~$12/month
    Unlimited storage vs 10GB:    ~$11/month

  OPTIMAL CONFIGURATIONS (by segment):

    PRICE-SENSITIVE SEGMENT (40% of respondents):
      Optimal: $49, Standard, 15 users, Email+Chat, 50GB
      Max WTP: ~$60/month

    VALUE-SEEKING SEGMENT (35% of respondents):
      Optimal: $79, Premium, 50 users, Email+Chat, 200GB
      Max WTP: ~$110/month

    PREMIUM SEGMENT (25% of respondents):
      Optimal: $99, Premium, Unlimited, Full, Unlimited
      Max WTP: ~$180/month
```

---

## 6. Feature Value Testing

### Determining Individual Feature WTP

```
METHOD 1: MAX-DIFF ANALYSIS

  Show respondent sets of 4-5 features at a time.
  Ask: "Which feature is MOST valuable?" and "LEAST valuable?"
  Repeat for 10-15 sets (different feature combinations).

  Output: Ranked list of features by relative importance.
  Use: Determines which features drive tier selection.

METHOD 2: FEATURE-SPECIFIC CONJOINT

  Run conjoint with features as individual attributes.
  Each feature is an attribute with levels: Included / Not Included.
  Analysis yields WTP for each feature independently.

METHOD 3: UPGRADE INTENT SURVEY

  "Your current plan includes [feature list]."
  "Would you pay $X/month more to add [Feature Y]?"
  Scale: 1-5 purchase intent.
  Test multiple features and price points.
```

### Feature Value Application

```
FEATURE ALLOCATION BASED ON WTP:

  Feature               WTP ($)   Include In:
  ──────────────────────────────────────────────
  Advanced analytics    $25       Pro tier (high WTP, growth driver)
  Team collaboration    $20       Pro tier (drives seat expansion)
  API access            $18       Pro tier (technical users)
  Custom branding       $12       Pro tier (moderate WTP)
  SSO/SAML              $15       Enterprise (compliance requirement)
  Audit logs            $10       Enterprise (compliance requirement)
  Priority support      $20       Enterprise or add-on
  Custom roles          $8        Enterprise (niche need)

  TIER PRICING VALIDATION:
    Pro features value: $25 + $20 + $18 + $12 = $75
    Pro price: $49 (35% value capture) — good deal for customer

    Enterprise features value: $75 + $15 + $10 + $20 + $8 = $128
    Enterprise price: $99 (77% value capture) — include more value
    Consider adding features to Enterprise to justify the price
```

---

## 7. Experimentation Process

### End-to-End Pricing Experiment Workflow

```
PHASE 1: HYPOTHESIS (Week 1)
  "We believe [changing X] will [improve Y metric] by [Z%]
   because [reasoning]."

PHASE 2: DESIGN (Week 1-2)
  - Define control and treatment
  - Calculate required sample size
  - Define primary and secondary metrics
  - Set test duration
  - Get ethical review if needed

PHASE 3: IMPLEMENT (Week 2-3)
  - Build test variants
  - Configure A/B test platform
  - QA test variants thoroughly
  - Set up metric tracking

PHASE 4: RUN (Week 3-6)
  - Launch test
  - Monitor for anomalies daily
  - Do NOT peek at results early (avoid false positives)
  - Let test run to full duration

PHASE 5: ANALYZE (Week 6-7)
  - Calculate statistical significance
  - Analyze primary metric
  - Analyze secondary metrics
  - Segment analysis (does it work for all segments?)

PHASE 6: DECIDE (Week 7)
  - Significant positive result → Ship treatment
  - Significant negative result → Revert to control
  - Inconclusive → Extend test or redesign
  - Document findings regardless of outcome

PHASE 7: DOCUMENT (Week 7-8)
  - Record hypothesis, design, results, and decision
  - Update pricing knowledge base
  - Share learnings with team
```

---

## References

1. Green, P. E., & Srinivasan, V. (1990). "Conjoint Analysis in Marketing." JMR.
2. Van Westendorp, P. (1976). "NSS Price Sensitivity Meter."
3. Gabor, A., & Granger, C. (1966). "Price as an Indicator of Quality."
4. Kohavi, R., Tang, D., & Xu, Y. (2020). "Trustworthy Online Controlled Experiments."
5. Orme, B. (2014). "Getting Started with Conjoint Analysis." Research Publishers.
6. Sawtooth Software (2024). "Technical Papers: Choice-Based Conjoint."

---

**This document is authoritative for pricing experiments within the Pricing Brain.**
