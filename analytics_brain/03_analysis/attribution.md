# Attribution — Measuring Marketing's True Impact

---

## Overview

Attribution is the process of assigning credit for a conversion or business outcome to the marketing touchpoints, channels, and campaigns that influenced it. It answers the fundamental marketing measurement question: "Which of our efforts actually caused this result?"

Attribution is also the most contentious domain in analytics. Every model is wrong. Every stakeholder wants credit. Every channel has an incentive to overstate its contribution. This module covers multi-touch attribution (MTA), incrementality testing, media mix modeling (MMM), and lift testing — the complementary approaches that, together, provide the most complete picture of marketing effectiveness.

The governing insight: **attribution and incrementality answer different questions.** Attribution asks "who touched the converter before conversion?" Incrementality asks "would the conversion have happened without the intervention?" Only the second question measures causal impact.

---

## The Attribution Problem

### Why Attribution Is Hard

**Problem 1: Correlation is not causation**
A user who sees a Facebook ad and then converts may have converted anyway. The ad's presence in the journey does not prove it caused the conversion. This is the fundamental limitation of all touchpoint-based attribution models.

**Problem 2: Incomplete journey data**
Users interact with brands across devices, browsers, and offline channels. No tracking system captures 100% of touchpoints. The average B2B buying journey involves 6-10 touchpoints; consumer journeys can involve dozens.

**Problem 3: Cross-device blindness**
A user who sees a mobile ad and converts on desktop appears as two separate journeys in most analytics systems. Identity resolution helps but introduces its own errors.

**Problem 4: Walled gardens**
Google, Meta, and Amazon each report attribution within their own ecosystems, using proprietary methodologies that systematically overcount their own contributions.

**Problem 5: Time decay ambiguity**
A touchpoint from 30 days ago may have planted a seed of awareness; a touchpoint from 1 hour ago may have triggered the conversion. How to weight temporal distance is fundamentally subjective.

---

## Multi-Touch Attribution (MTA) Models

### Heuristic Models

**Last-Touch Attribution**
100% of credit goes to the final touchpoint before conversion.
```
Journey: Organic Search → Email → Paid Search → [CONVERSION]
Credit:   0%              0%       100%
```
**Pros:** Simple, deterministic, aligns with conversion-focused channels.
**Cons:** Ignores all upper-funnel and mid-funnel touchpoints. Systematically overcredits branded search and retargeting.

**First-Touch Attribution**
100% of credit goes to the first known touchpoint.
```
Journey: Organic Search → Email → Paid Search → [CONVERSION]
Credit:   100%           0%       0%
```
**Pros:** Values awareness and discovery.
**Cons:** Ignores everything that happens after initial awareness.

**Linear Attribution**
Equal credit distributed across all touchpoints.
```
Journey: Organic Search → Email → Paid Search → [CONVERSION]
Credit:   33.3%          33.3%    33.3%
```
**Pros:** Acknowledges every touchpoint. No single channel is invisible.
**Cons:** Treats all touchpoints as equally important, which they clearly are not.

**Time-Decay Attribution**
More credit to touchpoints closer to conversion, with exponentially decaying weight for earlier touchpoints.
```
Journey: Organic Search → Email → Paid Search → [CONVERSION]
Credit:   15%             30%      55%
```
**Pros:** Respects the intuition that recency matters.
**Cons:** Half-life parameter is arbitrary. Undervalues awareness.

**Position-Based (U-Shaped) Attribution**
40% to first touch, 40% to last touch, 20% distributed among middle touchpoints.
```
Journey: Organic Search → Email → Paid Search → [CONVERSION]
Credit:   40%             20%      40%
```
**Pros:** Values both discovery and conversion. Acknowledges the "bookend" touchpoints that research suggests are most impactful.
**Cons:** 40/20/40 split is arbitrary.

### Algorithmic (Data-Driven) Attribution

**Approach:** Use statistical or machine learning methods to determine credit allocation based on observed data patterns.

**Shapley Value Attribution**
Borrowed from cooperative game theory (Shapley, 1953). Calculates each channel's marginal contribution by considering all possible subsets of channels.

```
Shapley Value for Channel i = Average marginal contribution of i
across all possible orderings of channels

For each subset S that does not include i:
  Marginal contribution = Conversion rate with S ∪ {i} - Conversion rate with S
Average across all subsets, weighted by |S|!(n-|S|-1)!/n!
```

**Pros:** Theoretically sound, provably fair (satisfies efficiency, symmetry, null player, and additivity axioms).
**Cons:** Computationally expensive (2^n subsets for n channels), assumes channels are separable (they are not — there are interaction effects), still based on observational data (correlation, not causation).

**Markov Chain Attribution**
Models the customer journey as a Markov process and calculates each channel's removal effect — how much total conversion would decrease if that channel were removed.

```
Removal effect for Channel C:
  = Total conversions with all channels
  - Total conversions with Channel C removed

Credit for Channel C = Removal_effect(C) / Sum(all removal effects)
```

**Pros:** Accounts for channel position in the journey, handles variable-length paths.
**Cons:** Assumes Markov property (memoryless transitions), computationally intensive for many channels.

### MTA Limitations (Fundamental)

All MTA models share a fundamental limitation: **they distribute credit among observed touchpoints but cannot determine which touchpoints caused the conversion.** A user exposed to 5 touchpoints might have converted after seeing only the first one. MTA provides a structured way to allocate credit but does not measure causal impact.

---

## Incrementality Testing

### The Causal Question

Incrementality answers: "How many additional conversions did this marketing activity cause that would not have happened otherwise?"

```
Incrementality = Conversions(with intervention) - Conversions(without intervention)
                 ─────────────────────────────────────────────────────────────────
                           Conversions(without intervention)
```

This requires a counterfactual — what would have happened without the intervention — which can only be estimated through experimentation.

### Holdout Experiments

**Design:** Randomly assign users (or geographic regions, or time periods) to treatment (exposed to marketing) and control (not exposed). Compare conversion rates.

```
Treatment Group (exposed to ads):    5.2% conversion rate
Control Group (no ads):              3.8% conversion rate
Incremental Lift:                    1.4 percentage points (37% lift)
```

**Randomization methods:**
- **User-level holdout:** Randomly assign individual users. Cleanest design but operationally complex (must suppress ads for control users).
- **Geo-level holdout:** Assign entire geographic regions to treatment/control. Easier to implement but fewer "units" (regions) reduce statistical power.
- **Time-based holdout:** Alternate intervention on/off across time periods. Confounded by temporal trends but requires no control group suppression.

### Ghost Ads / PSA Tests

**Problem:** In digital advertising, the control group ideally would have seen the ad but was shown something else instead. Simply not bidding on the control group creates selection bias (the control group was never eligible to see the ad).

**Solution: Ghost ads (or PSA tests).** The control group is shown a "placebo" ad (public service announcement, generic brand ad) in the same placement, at the same time, targeting the same criteria. The only difference is the creative/message.

This design isolates the incremental effect of the specific ad creative/message versus the baseline conversion rate of the target audience.

### Intent-to-Treat (ITT) Analysis

When not all treatment group members are actually exposed to the treatment (e.g., some users had ad blockers), analyze based on assignment rather than actual exposure:

```
ITT Effect = Conversion(assigned to treatment) - Conversion(assigned to control)
```

ITT avoids selection bias from self-selection into actual exposure. It provides a conservative (underestimated) measure of the treatment effect.

### Average Treatment Effect on the Treated (ATT)

To estimate the effect on those actually exposed:
```
ATT = ITT Effect / Compliance Rate

Where Compliance Rate = % of treatment group actually exposed
```

---

## Media Mix Modeling (MMM)

### Overview

Media Mix Modeling uses aggregate time-series data (typically weekly or monthly) and regression analysis to estimate each channel's contribution to business outcomes. Unlike MTA, MMM does not require user-level tracking.

### The MMM Regression

```
Y(t) = alpha + Sum over channels [beta_c * Adstock(X_c(t))]
       + Sum over controls [gamma_j * Z_j(t)]
       + epsilon(t)

Where:
  Y(t)     = Business outcome (revenue, conversions) in period t
  X_c(t)   = Spend or impressions in channel c in period t
  Adstock() = Transformation accounting for carry-over effects
  Z_j(t)   = Control variables (seasonality, promotions, macro economy)
  beta_c   = Channel coefficient (marginal effect)
  alpha    = Baseline (organic conversions)
  epsilon  = Error term
```

### Adstock Transformation

Marketing effects carry over beyond the exposure period. A TV ad seen this week influences purchases next week. Adstock models this decay:

```
Adstock(t) = X(t) + decay_rate * Adstock(t-1)

Where decay_rate is between 0 (no carry-over) and 1 (permanent effect)
Typical values: 0.3-0.7 depending on channel
```

**Channel-specific decay rates (typical):**
- TV: 0.5-0.7 (long carry-over)
- Digital display: 0.1-0.3 (short carry-over)
- Paid search: 0.05-0.15 (very short — mostly in-session)
- Email: 0.1-0.2 (short but predictable)
- Content marketing: 0.6-0.8 (long, compounding)

### Diminishing Returns

Channel response curves are typically concave — each additional dollar spent produces less incremental return. MMM models this using saturation functions:

```
Hill function: Response = Spend^alpha / (K^alpha + Spend^alpha)

Where:
  alpha = shape parameter (steepness of saturation)
  K     = half-saturation point (spend level at 50% of max response)
```

### MMM Strengths and Limitations

**Strengths:**
- No user-level tracking required (privacy-friendly)
- Includes offline channels (TV, radio, OOH, print)
- Naturally accounts for seasonality and macro factors
- Provides budget optimization guidance
- Works at aggregate level, avoiding identity resolution challenges

**Limitations:**
- Requires long time series (2+ years ideally) for reliable coefficient estimation
- Cannot capture within-channel variation (specific creatives, audiences)
- Assumes stable relationships (coefficients may shift with strategy changes)
- Multicollinearity: channels often scale together, making individual effects hard to isolate
- Aggregate level only — cannot attribute individual conversions

---

## Lift Testing

### Definition

A lift test is a controlled experiment specifically designed to measure the incremental impact of a marketing intervention on a defined audience.

### Geo-Experiment Design

When user-level randomization is impossible (e.g., brand advertising), geo-experiments randomize at the geographic level:

**Step 1:** Select matched pairs of geographic regions (similar in population, baseline conversion, demographics)

**Step 2:** Randomly assign one region in each pair to treatment, the other to control

**Step 3:** Run the marketing intervention in treatment regions only

**Step 4:** Compare conversion rates between treatment and control regions

**Step 5:** Calculate lift = (Treatment - Control) / Control

### Synthetic Control Method

When matched geographic pairs are unavailable, the synthetic control method constructs a counterfactual by weighting a combination of control regions to match the treatment region's pre-intervention trend:

```
Synthetic_Treatment(t) = Sum over control regions [w_i * Region_i(t)]

Where weights w_i are chosen to minimize pre-period difference between
actual treatment region and the synthetic control
```

The post-intervention difference between the actual treatment region and its synthetic control estimates the causal effect.

---

## The Unified Measurement Framework

### Combining MTA, Incrementality, and MMM

No single attribution methodology is sufficient. Best practice combines all three:

| Method | Question Answered | Granularity | Causal? | Coverage |
|--------|------------------|-------------|---------|----------|
| MTA | Who touched the converter? | User-level | No | Digital only |
| Incrementality | Did this intervention cause conversions? | Campaign-level | Yes | One channel at a time |
| MMM | How does each channel contribute to outcomes? | Channel-level | Partially | All channels |

### The Triangulation Approach

1. **Use MMM** for strategic budget allocation across channels (quarterly cadence)
2. **Use incrementality tests** to validate MMM coefficients and calibrate channel-level assumptions (monthly cadence)
3. **Use MTA** for tactical within-channel optimization (real-time)
4. **Cross-validate:** If MTA says Channel X is 30% of conversions, MMM says 15%, and incrementality tests say 10%, trust incrementality > MMM > MTA

### Attribution Governance

**Rule 1:** No single model is the source of truth. Use triangulation.
**Rule 2:** Report attributed conversions with explicit model labels ("Last-touch attributed" vs. "Incremental lift measured").
**Rule 3:** Never compare attributed conversions across different models. "Google reported 1,000 conversions" and "Facebook reported 800 conversions" are not comparable — they use different attribution windows, methods, and counting rules.
**Rule 4:** Run incrementality tests before scaling any channel. A channel that looks great in MTA but shows zero incrementality is getting credit for organic conversions.
**Rule 5:** Refresh MMM at least quarterly. Recalibrate with fresh incrementality data.

---

## Attribution Anti-Patterns

### Anti-Pattern 1: Platform-Reported Attribution
Accepting Google's or Meta's self-reported conversions at face value. Each platform uses attribution models that systematically overcredit their own channel. Always compare platform reporting against an independent measurement system.

### Anti-Pattern 2: Attribution as Truth
Treating attributed conversions as if they represent causal reality. All attribution models produce estimates, not facts. Communicate this uncertainty.

### Anti-Pattern 3: Last-Touch for Strategic Decisions
Using last-touch attribution to allocate budget across channels. This systematically underfunds upper-funnel awareness channels and overfunds lower-funnel conversion channels.

### Anti-Pattern 4: No Attribution Holdouts
Running attribution analysis without ever testing incrementality. Without causal validation, attribution is sophisticated guesswork.

### Anti-Pattern 5: Ignoring the Baseline
Attributing all conversions to marketing without estimating organic baseline. A business that would generate 1,000 conversions with zero marketing and generates 1,200 with $100K spend has 200 incremental conversions — not 1,200.

---

**Attribution is not about assigning credit fairly. It is about understanding causation accurately. The goal is not to make every channel happy — it is to allocate resources to the channels that genuinely create incremental value.**
