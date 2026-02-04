# BenchmarkTests.md -- PhD-Level Data Science Challenges

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Data Brain / CEO Brain
> Purpose: The Data Brain must answer these questions correctly to demonstrate
> competence at the level of a senior data scientist with deep statistical
> training. Each question tests a specific advanced skill. Model answers
> represent the minimum acceptable response.

---

## How to Use These Benchmarks

1. Present the scenario to the Data Brain without the model answer.
2. Score the response against the model answer using the DataScore rubric.
3. A passing response must address ALL key points in the model answer.
4. A superior response identifies additional considerations not covered.
5. Record results in the Accountability Protocol.
6. Re-test quarterly.

---

## Test 1: Premature Experiment Conclusion

**Scenario:** An A/B test shows a 5% lift in conversion, p=0.03, after 2
days with 500 users per variant. The PM wants to ship the winning variant
immediately. Should you? Defend your answer with statistical reasoning.

**Model Answer:**

Do NOT ship. The result is likely unreliable despite the p-value. Here is why:

**Key points that must be addressed:**
1. POWER ANALYSIS: With 500 users per variant, the minimum detectable effect
   for a typical conversion rate (say 5% baseline) with 80% power at alpha=0.05
   is approximately 3-4 percentage points (absolute). A "5% lift" might mean
   5.0% -> 5.25% (relative), which would require ~60,000 users per variant
   to detect reliably. Clarify whether 5% is absolute or relative.
2. PEEKING PROBLEM: Looking at results after only 2 days inflates the false
   positive rate dramatically. If the experiment was designed for 14 days and
   you check every day, the effective alpha is much higher than 0.05 (can
   exceed 0.20-0.30). Sequential testing methods (group sequential, always-valid
   p-values) are needed if early stopping is desired.
3. MULTIPLE PEEKING CORRECTION: If using group sequential design (O'Brien-Fleming,
   Pocock), early stopping boundaries are much more stringent than p=0.03.
   For O'Brien-Fleming at 2/14 of the planned duration, you would need
   approximately p < 0.001 to stop early.
4. NOVELTY EFFECTS: 2 days is far too short to distinguish real improvement
   from novelty effects. Users may behave differently simply because something
   changed.
5. TEMPORAL EFFECTS: 2 days captures one part of the weekly cycle. Behavior
   on Tuesday-Wednesday may differ from weekends. Need at least one full
   business cycle (1-2 weeks minimum).
6. RECOMMENDATION: Continue the experiment for the pre-planned duration. If
   the PM insists on a decision framework, implement a proper sequential
   testing procedure (e.g., mSPRT, always-valid confidence intervals) that
   controls the Type I error rate under continuous monitoring.

**Automatic fail if:** Response says "p < 0.05 so ship it" or does not
address the peeking problem and power analysis.

---

## Test 2: Causal Inference Without RCT

**Scenario:** The marketing team ran a campaign targeting specific users (not
randomly assigned). They want to know if the campaign caused an increase in
purchases. You cannot run an RCT retroactively. Design a causal inference
approach.

**Model Answer:**

**Key points that must be addressed:**
1. THE FUNDAMENTAL PROBLEM: Users who were targeted may differ systematically
   from those who were not. A simple comparison of purchase rates between
   targeted and non-targeted users confounds the campaign effect with selection
   bias.
2. RECOMMENDED APPROACHES (pick based on data availability):
   - **Propensity Score Matching:** Estimate probability of being targeted
     based on pre-campaign observables. Match treated to control on propensity
     score. Requires: strong ignorability assumption (no unmeasured confounders),
     overlap (common support), and sufficient pre-campaign covariates.
   - **Difference-in-Differences:** If pre-campaign data available for both
     groups, compare the CHANGE in purchase rate for targeted vs. untargeted.
     Requires: parallel trends assumption in pre-period.
   - **Instrumental Variable:** If there is a variable that influenced who was
     targeted but does not directly affect purchases (e.g., a targeting system
     glitch that quasi-randomly included/excluded some users). Requires:
     relevance, exclusion restriction.
   - **Regression Discontinuity:** If targeting was based on a threshold (e.g.,
     users with engagement score > X were targeted). Compare users just above
     and just below the threshold. Requires: no manipulation of the running
     variable at the cutoff.
3. SENSITIVITY ANALYSIS IS ESSENTIAL: For any observational approach, compute
   how strong an unmeasured confounder would need to be to explain away the
   result (Rosenbaum bounds, E-value).
4. SPECIFIC IMPLEMENTATION for propensity score matching:
   - Covariates: pre-campaign purchase history, engagement, demographics,
     recency, frequency, monetary value.
   - Matching method: nearest-neighbor with caliper, or inverse propensity
     weighting.
   - Balance diagnostics: standardized mean differences < 0.1 on all covariates.
   - Estimate ATT (average treatment effect on the treated) since targeting
     was selective.
5. WHAT TO REPORT: Estimated effect with confidence interval, sensitivity
   to unmeasured confounding, comparison across multiple methods (if results
   agree, more confidence), and honest acknowledgment that the causal estimate
   is weaker than from an RCT.

**Automatic fail if:** Response suggests comparing purchase rates directly
without addressing selection bias, or claims any method can definitively
prove causation from observational data.

---

## Test 3: Model Accuracy vs. Business Value Gap

**Scenario:** Your ML model has 95% accuracy. The business stakeholders say
it is useless. Diagnose the problem and propose a solution.

**Model Answer:**

**Key points that must be addressed:**
1. CLASS IMBALANCE: 95% accuracy on a 95/5 class split means the model could
   be predicting the majority class for everything (0% recall on the minority
   class). Check the confusion matrix.
2. WRONG METRIC: Accuracy is almost never the right metric for business
   problems. The right metric depends on the cost structure:
   - If false negatives are costly (fraud detection, disease screening):
     optimize for recall.
   - If false positives are costly (spam filtering, credit approval):
     optimize for precision.
   - If both matter: F1 score or custom cost-weighted metric.
3. COST-SENSITIVE EVALUATION: Create a cost matrix:
   - True Positive: business value gained (e.g., fraud prevented).
   - False Positive: business cost (e.g., legitimate transaction blocked).
   - True Negative: neutral.
   - False Negative: business cost (e.g., fraud not caught).
   Evaluate: Total Business Value = sum of (count x value) for each cell.
4. CALIBRATION: If the model outputs probabilities, they may be poorly
   calibrated. A model that says "90% chance" when the true rate is 50%
   is useless for decision-making even if accuracy is high.
5. THRESHOLD OPTIMIZATION: The default 0.5 threshold may be wrong. Use the
   cost matrix to find the optimal threshold that maximizes business value.
   Plot precision-recall curve and find the operating point that matches
   business needs.
6. ACTIONABILITY: The model may be accurate but not actionable. If the
   prediction comes too late, is about the wrong entity, or does not
   integrate into the workflow, it has no business value.
7. SOLUTION: Reframe the model evaluation around business value, not
   statistical accuracy. Define the dollar value of each prediction outcome
   and optimize for that.

**Automatic fail if:** Response does not immediately identify class imbalance
and the accuracy paradox, or does not introduce cost-sensitive evaluation.

---

## Test 4: Simpson's Paradox in Product Metrics

**Scenario:** Overall, mobile users have higher conversion (4.2%) than desktop
users (3.8%). The PM concludes mobile is better and wants to shift resources
to mobile. You are asked to validate. What do you check?

**Model Answer:**

**Key points that must be addressed:**
1. CHECK FOR SIMPSON'S PARADOX: The aggregate relationship may reverse within
   subgroups. This is a textbook case where you must disaggregate.
2. EXAMPLE OF HOW THIS COULD REVERSE:
   - Segment users by intent (high-intent vs. browsing).
   - High-intent users: desktop 12%, mobile 10% (desktop wins).
   - Browsing users: desktop 1%, mobile 0.8% (desktop wins).
   - But mobile has proportionally more high-intent users, so the aggregate
     mobile rate is higher despite being worse in every segment.
3. WHAT TO CHECK:
   - Break down conversion by user segment (new vs. returning, traffic source,
     product category, geography).
   - Check if mobile vs. desktop users are compositionally different (different
     mix of high-intent vs. low-intent).
   - Check if the same users behave differently on mobile vs. desktop (within-
     user comparison is more informative than between-user).
4. THE CORRECT ANALYSIS: Use a model that controls for confounders:
   - Logistic regression: conversion ~ device + user_segment + traffic_source + ...
   - The coefficient on "device" after controlling for confounders is the
     real device effect.
   - Alternatively: stratified analysis showing conversion by device within
     each segment.
5. RECOMMENDATION TO PM: Do not make resource allocation decisions based on
   aggregate conversion rates. The aggregate masks the causal story. We need
   to understand WHY mobile users convert more (composition effect vs. true
   device effect) before allocating resources.

**Automatic fail if:** Response does not mention Simpson's Paradox or does
not recommend disaggregating by subgroups before drawing conclusions.

---

## Test 5: Survivorship Bias in Churn Analysis

**Scenario:** You are asked to analyze what makes customers successful (high
usage, high satisfaction). You have data on your current active customers.
What is the fundamental flaw in this analysis, and how do you fix it?

**Model Answer:**

**Key points that must be addressed:**
1. SURVIVORSHIP BIAS: You only have data on customers who SURVIVED (are still
   active). You are missing the most important data: customers who churned.
   Analyzing only survivors tells you what survivors look like, not what
   causes survival.
2. WHY THIS IS DANGEROUS:
   - A feature that high-usage survivors use might also be used by churned
     users. Without churned user data, you cannot tell.
   - You might conclude "successful customers use Feature X" when in reality,
     all customers use Feature X -- it just does not prevent churn.
   - Classic survivorship bias: analyzing bullet holes on planes that returned.
     The missing planes had holes in different places.
3. FIX:
   - Include churned customers in the analysis. Pull historical data for
     customers who left.
   - Compare BEHAVIORAL PATTERNS of retained vs. churned customers BEFORE
     the churn event.
   - Use survival analysis (Cox proportional hazards, Kaplan-Meier) which
     explicitly models time-to-event and handles right-censoring (currently
     active customers who may churn later).
4. ADDITIONAL CONSIDERATIONS:
   - Cohort effects: earlier customers may have different characteristics
     than recent ones. Analyze by cohort.
   - Feature adoption timing: did they adopt the feature before becoming
     successful, or after? (Reverse causality check.)
   - Definition of "successful": define rigorously. Avoid circular definitions
     (e.g., "successful = still here" is tautological for this analysis).
5. PROPER STUDY DESIGN:
   - Retrospective cohort study: define the cohort at signup time, follow
     forward to outcome (retained or churned).
   - Match on signup cohort, acquisition channel, initial engagement.
   - Use difference in early behavior (first 7/14/30 days) to predict
     long-term retention.

**Automatic fail if:** Response analyzes only current active customers
without identifying the survivorship bias, or does not include churned
customers in the proposed analysis.

---

## Test 6: Feature Importance Misinterpretation

**Scenario:** Your gradient-boosted model for predicting customer lifetime
value shows "days since last login" as the most important feature. The PM
wants to send push notifications to get users to log in, assuming it will
increase LTV. Is this a good idea?

**Model Answer:**

**Key points that must be addressed:**
1. FEATURE IMPORTANCE IS NOT CAUSAL: "Days since last login" being the most
   important feature for PREDICTING LTV does not mean that CHANGING login
   frequency will CHANGE LTV. This is the difference between prediction and
   causation.
2. WHY INTERVENTION MAY FAIL:
   - "Days since last login" is likely a PROXY for engagement/intent.
   - A user who logs in frequently is engaged because they find value.
   - Forcing a login via push notification does not create the underlying
     engagement. It just changes the proxy without changing the real driver.
   - Analogy: hospital patients with high thermometer readings are sicker.
     Putting the thermometer in ice water does not cure them.
3. GOODHART'S LAW: "When a measure becomes a target, it ceases to be a
   good measure." If you optimize for login frequency, you will increase
   logins without increasing the underlying value that drives LTV.
4. WHAT TO DO INSTEAD:
   - Ask: WHY do high-LTV users log in more? What value are they getting?
   - Analyze WHAT high-LTV users do when they log in (specific features,
     workflows, outcomes).
   - Design interventions that increase the VALUE users get, not just the
     frequency of visits.
   - Run a proper experiment: send push notifications to a random subset
     and measure LTV (not just logins) over a long period. If LTV does
     not change despite more logins, the hypothesis is wrong.
5. SHAP VALUES for better understanding: Use SHAP values (not just feature
   importance) to understand the DIRECTION of the effect. SHAP shows that
   low values of "days since last login" predict high LTV. This confirms
   the association but still does not establish causation.

**Automatic fail if:** Response agrees that push notifications will increase
LTV, or does not distinguish predictive importance from causal effect.

---

## Test 7: Distribution Shift in Production

**Scenario:** Your recommendation model was trained on data from January-June.
It is now September and recommendation CTR has dropped 30%. The model has not
been retrained. Diagnose and propose a solution.

**Model Answer:**

**Key points that must be addressed:**
1. DISTRIBUTION SHIFT DIAGNOSIS:
   - **Covariate shift:** The distribution of input features has changed.
     New users, new items, seasonal behavior changes.
   - **Concept drift:** The relationship between features and outcomes has
     changed. User preferences evolved.
   - **Label shift:** The distribution of the target variable changed
     (overall CTR changed independent of model quality).
2. DIAGNOSTIC STEPS:
   - Compare feature distributions: Jan-Jun vs. Jul-Sep. Use PSI (Population
     Stability Index) or KS test for each feature.
   - Check for new categories/items not seen in training (cold start problem).
   - Plot model confidence distribution over time (declining confidence =
     out-of-distribution inputs).
   - Compare actual vs. predicted CTR over time (calibration drift).
   - Check for external factors: seasonality, competitive changes, UI changes
     that affect recommendations display.
3. IMMEDIATE MITIGATION:
   - If specific features have shifted: retrain on recent data (weighted
     toward recent).
   - If new items dominate: implement cold-start handling (content-based
     features, popularity-based fallback).
   - If concept drift: retrain with a sliding window, implement online
     learning, or use a model that adapts (e.g., contextual bandits).
4. LONG-TERM SOLUTION:
   - Automated retraining pipeline with validation gates.
   - Continuous monitoring for distribution shift (PSI, KL divergence).
   - Alerting when shift exceeds threshold.
   - A/B test retrained model against current model before full deployment.
   - Consider model architectures robust to distribution shift (e.g., causal
     models, domain adaptation).
5. ROOT CAUSE: The real failure is not the model degradation -- it is the
   lack of monitoring and automated retraining. A model that is trained once
   and never updated will always degrade. The system should prevent this.

**Automatic fail if:** Response just says "retrain the model" without
diagnosing the type of shift or proposing monitoring and prevention.

---

## Test 8: Experiment Interference Effects

**Scenario:** You are running an A/B test on a social feature (e.g., team
collaboration tool). Treatment users interact with control users. The
experiment shows no significant effect. Should you conclude the feature
does not work?

**Model Answer:**

**Key points that must be addressed:**
1. SUTVA VIOLATION: The Stable Unit Treatment Value Assumption assumes that
   one user's treatment assignment does not affect another user's outcome.
   Social features violate this fundamentally -- treatment users interact
   with control users, causing spillover effects.
2. WHY THIS BIASES TOWARD NULL:
   - If the feature helps treatment users collaborate better, and treatment
     users collaborate with control users, control users ALSO benefit
     (spillover).
   - This reduces the observed difference between treatment and control,
     biasing toward finding no effect.
   - The true effect is larger than what the experiment measured.
3. SOLUTIONS:
   - **Cluster randomization:** Randomize at the team/group level, not
     individual level. All members of a team get the same variant.
   - **Network-based randomization:** Use graph clustering to create clusters
     with minimal between-cluster interaction.
   - **Ego-network randomization:** Randomize based on the user and their
     immediate connections.
   - **Switchback design:** Alternate between treatment and control over time
     for the whole population.
4. ANALYSIS ADJUSTMENTS:
   - Estimate the degree of spillover by measuring interaction rates between
     treatment and control.
   - If spillover is high, the experiment is fundamentally compromised for
     individual-level analysis.
   - Bound the true effect: at minimum, the effect is >= the observed effect
     (spillover can only bias toward null in this case).
5. RECOMMENDATION: Do NOT conclude the feature does not work. Re-run the
   experiment with cluster randomization. The null result is uninformative
   due to SUTVA violation.

**Automatic fail if:** Response concludes the feature does not work based
on the null result, or does not identify the SUTVA violation.

---

## Test 9: Metric Definition Ambiguity

**Scenario:** Three teams report different "monthly active user" (MAU) numbers:
Product says 1.2M, Marketing says 1.5M, Finance says 900K. All claim to be
correct. How do you resolve this?

**Model Answer:**

**Key points that must be addressed:**
1. EACH TEAM LIKELY HAS A DIFFERENT DEFINITION:
   - Product: Users who performed a "core action" in 30 days (narrower).
   - Marketing: Users who visited the site/app in 30 days (broader, includes
     bounces).
   - Finance: Users with a paid subscription active in 30 days (narrowest,
     revenue-relevant).
2. ALL THREE CAN BE "CORRECT" given their definitions. The problem is not
   that someone is wrong -- the problem is that there is no single source
   of truth.
3. RESOLUTION PROCESS:
   - Audit each team's definition: exact event/action counted, time window,
     deduplication logic, bot filtering, inclusion/exclusion criteria.
   - Document the differences in a comparison table.
   - Determine which definition serves which purpose (product health vs.
     marketing reach vs. financial reporting).
   - Choose ONE canonical definition for company-level MAU. All other
     definitions become named differently (e.g., "site visitors,"
     "active subscribers").
4. IMPLEMENTATION:
   - Canonical metric defined in a metric dictionary with:
     - Exact SQL/logic definition.
     - Data source.
     - Filters applied.
     - Known caveats.
   - Single computation: one team owns the canonical metric pipeline.
   - Other teams derive their specific metrics from the canonical pipeline
     (not independent calculations).
5. GOVERNANCE:
   - Metric dictionary is the source of truth. Any metric reported externally
     (investors, board) must use the canonical definition.
   - Changes to metric definitions require documented justification and
     historical restatement.
   - Periodic reconciliation between related metrics.
6. DEEPER ISSUE: This is a data governance failure, not a data quality failure.
   Prevent recurrence by establishing metric definition standards and ownership
   before new metrics are created.

**Automatic fail if:** Response tries to determine which team is "right"
without recognizing that the root cause is definitional ambiguity, or does
not propose a governance framework.

---

## Test 10: Ethical Data Use Dilemma

**Scenario:** Your model for personalizing content recommendations performs
significantly better for users who share more personal data. Users who share
less data get worse recommendations and lower engagement. The business wants
to prompt users to share more data "to improve their experience." Evaluate
the ethical implications.

**Model Answer:**

**Key points that must be addressed:**
1. GENUINE IMPROVEMENT vs. MANIPULATION:
   - If sharing data genuinely improves the user's experience AND the user
     understands the trade-off: this can be ethical.
   - If the prompt uses dark patterns, creates urgency, or obscures what
     data is being shared: this is manipulation.
   - The key question: would the user, fully informed, make the same choice?
2. INFORMED CONSENT:
   - Users must understand WHAT data is being collected, HOW it is used,
     and WHAT the benefit is.
   - "Share data to improve your experience" is too vague to be informed.
   - Specific: "Sharing your interests helps us recommend articles you will
     enjoy. Here is exactly what we collect and how long we keep it."
3. DISPARATE IMPACT:
   - Users with more privacy concerns (which correlate with marginalized
     communities) get a worse experience.
   - This creates a two-tier system: "pay with your data" or get inferior
     service.
   - Evaluate if the model can be improved for low-data users (content-based
     features, contextual signals, collaborative filtering).
4. ALTERNATIVE APPROACHES:
   - Invest in methods that work well with less data (federated learning,
     differential privacy, on-device personalization).
   - Allow users to provide preferences explicitly (less invasive than
     behavioral tracking).
   - Transparency tools: let users see what the model knows and control it.
5. BUSINESS vs. ETHICS TENSION:
   - Short term: more data = better metrics = more revenue.
   - Long term: privacy violations erode trust, invite regulation, and
     cause reputational damage.
   - Regulatory risk: GDPR, CCPA, and emerging regulations increasingly
     restrict this approach.
6. RECOMMENDATION: Pursue ethical personalization. Improve the model for
   low-data users. Make data sharing truly optional with clear, specific
   consent. Do NOT make the default experience intentionally worse to
   coerce data sharing.

**Automatic fail if:** Response focuses only on the business upside of more
data without addressing consent, disparate impact, or manipulation concerns.

---

## Test 11: Time Series Forecasting Pitfalls

**Scenario:** Your revenue forecasting model (ARIMA-based) predicted Q3
revenue within 2% for the past 3 quarters. The CEO wants to use it for
5-year financial projections in the investor deck. What do you advise?

**Model Answer:**

**Key points that must be addressed:**
1. SHORT-TERM ACCURACY DOES NOT IMPLY LONG-TERM ACCURACY:
   - ARIMA captures autocorrelation and seasonal patterns in recent data.
   - These patterns may not persist over 5 years (regime changes, market
     shifts, competitive disruption).
   - Forecast uncertainty grows with horizon. 2% error for 1 quarter could
     become 50%+ error over 5 years.
2. CONFIDENCE INTERVALS EXPLODE:
   - Show the CEO the confidence intervals for 1-quarter vs. 5-year forecasts.
   - A 5-year ARIMA forecast confidence interval likely encompasses the range
     from bankruptcy to 10x growth.
3. STRUCTURAL BREAKS:
   - ARIMA assumes stationarity (or stationarity after differencing).
   - Over 5 years: market conditions change, new competitors enter, technology
     shifts, regulatory changes occur.
   - The model cannot predict structural breaks.
4. APPROPRIATE LONG-TERM FORECASTING:
   - Scenario-based planning: best case, base case, worst case with explicit
     assumptions.
   - Driver-based models: revenue = customers x ARPU x retention. Model each
     driver with assumptions.
   - Monte Carlo simulation: model uncertainty in each driver and simulate
     thousands of scenarios.
5. WHAT TO TELL THE CEO:
   - "The ARIMA model is excellent for next-quarter forecasting. For 5-year
     projections, we need a different approach."
   - Propose scenario-based projections with explicit assumptions.
   - Include sensitivity tables: "If growth rate varies by +/-2%, revenue
     ranges from X to Y."
   - Investors respect honest uncertainty ranges more than false precision.
6. RED FLAG: If the CEO wants a single number for 5-year revenue, that is
   a communication problem to address. The goal is to convey a range with
   conviction about the assumptions, not precision about the outcome.

**Automatic fail if:** Response endorses using ARIMA for 5-year projections,
or does not explain why short-term accuracy does not imply long-term accuracy.

---

## Test 12: Label Leakage Detection

**Scenario:** A junior data scientist built a model predicting customer churn
with 99% AUC. This seems too good to be true. How do you investigate?

**Model Answer:**

**Key points that must be addressed:**
1. 99% AUC IS ALMOST CERTAINLY DATA LEAKAGE. Real churn models typically
   achieve 0.70-0.85 AUC. Investigate aggressively.
2. LABEL LEAKAGE INVESTIGATION:
   - **Temporal leakage:** Are any features computed using data from AFTER
     the churn event? Example: "account_balance_at_cancellation" or
     "support_tickets_about_cancellation."
   - **Direct leakage:** Are any features directly derived from the label?
     Example: "subscription_status" as a feature when predicting churn.
   - **Indirect leakage:** Features that are near-perfect proxies for the
     label. Example: "days_since_last_payment" where churned users have
     very high values by definition.
3. INVESTIGATION STEPS:
   - Examine feature importance: the top features likely contain the leak.
   - For each top feature: verify it would be available at PREDICTION TIME
     (not just at training time).
   - Check temporal ordering: when was each feature value computed relative
     to the churn event?
   - Plot feature distributions for churned vs. non-churned: any feature
     that perfectly separates the classes is suspect.
   - Remove top features one at a time and retrain: a large performance
     drop indicates that feature was carrying the model.
4. COMMON LEAKAGE PATTERNS:
   - Aggregation window includes post-event data.
   - Join condition does not enforce temporal ordering.
   - Feature engineering pipeline processes the full dataset (not just
     pre-event data).
   - Target encoding computed on the full dataset (including test set).
5. PREVENTION:
   - Define a "prediction point" for each customer and ensure ALL features
     are computed using only data available at that point.
   - Implement temporal validation: train on past, predict future.
   - Code review of feature engineering by a senior data scientist.
   - Automated checks for temporal ordering in the pipeline.

**Automatic fail if:** Response does not immediately suspect data leakage,
or does not provide a systematic investigation methodology.

---

## Test 13: Bayesian vs. Frequentist Decision

**Scenario:** You are testing a new checkout flow. After 1 week, the Bayesian
analysis shows P(treatment > control) = 87%. The frequentist analysis shows
p=0.12 (not significant). The PM asks: which should I trust?

**Model Answer:**

**Key points that must be addressed:**
1. THESE ARE NOT CONTRADICTORY -- they answer different questions:
   - Frequentist: "If there were NO real difference, how likely is data this
     extreme?" p=0.12 means 12% chance of seeing this result under the null.
     With alpha=0.05, this does not reach the threshold.
   - Bayesian: "Given the data and our prior, what is the probability that
     treatment is better?" 87% probability means 13% chance treatment is
     worse. This directly answers the PM's question.
2. NEITHER IS "WRONG" BUT THEY HAVE DIFFERENT PROPERTIES:
   - Frequentist: controls Type I error rate at alpha. If you ship at p<0.05,
     you will ship bad changes ~5% of the time.
   - Bayesian: depends on prior. With a flat prior, the posterior is driven
     by data. With an informative prior, prior assumptions influence the result.
3. WHEN TO USE WHICH:
   - Use frequentist when you need fixed error rate guarantees (regulatory,
     high-stakes).
   - Use Bayesian when you need to make a decision under uncertainty and can
     quantify the cost of being wrong.
4. THE RIGHT FRAMEWORK FOR THIS DECISION:
   - What is the cost of shipping a change that is actually worse?
   - What is the cost of NOT shipping a change that is actually better?
   - With 87% probability of treatment being better:
     - Expected value = 0.87 * (value of improvement) - 0.13 * (cost of
       degradation).
     - If expected value is positive, shipping is the rational decision even
       without "statistical significance."
5. RECOMMENDATION:
   - Run the experiment longer if possible (more data helps both approaches).
   - If a decision MUST be made now: use the Bayesian framework with decision
     theory. Compute expected value of shipping vs. not shipping.
   - If the effect is small and the cost of a wrong decision is high: wait
     for more data.
   - CRITICAL: whatever framework you choose, decide BEFORE seeing results,
     not after.

**Automatic fail if:** Response says one approach is "right" and the other
is "wrong," or does not explain the different questions they answer.

---

## Test 14: Data Pipeline Failure Forensics

**Scenario:** A dashboard that was working yesterday now shows revenue as $0
for today. The PM is panicking. Walk through your diagnostic process.

**Model Answer:**

**Key points that must be addressed:**
1. TRIAGE (first 5 minutes):
   - Is this REALLY zero revenue or a data pipeline failure? Check the raw
     source system (payment processor dashboard, database directly).
   - If source shows revenue: pipeline failure. If source also shows zero:
     business problem (different escalation).
2. SYSTEMATIC DIAGNOSIS (pipeline failure path):
   - **Layer 1 - Ingestion:** Is data arriving from the source? Check landing
     zone / raw tables. Last successful load timestamp.
   - **Layer 2 - Transformation:** Is the ETL/ELT job running? Check job logs
     for errors, timeouts, OOM kills.
   - **Layer 3 - Aggregation:** Is the aggregation query correct? Check for
     schema changes, new NULL values, join failures.
   - **Layer 4 - Presentation:** Is the dashboard cache stale? Check last
     refresh timestamp. Try hard refresh.
3. COMMON ROOT CAUSES (check in order of likelihood):
   - Schema change in source system (new column, renamed column, type change).
   - Pipeline job failed silently (no alerting).
   - Timezone issue: "today" is computed in wrong timezone, showing future
     date with no data.
   - Permission change: service account lost access to source.
   - Source system maintenance/downtime.
   - Partition pruning issue: query filtering on wrong partition key.
4. IMMEDIATE ACTIONS:
   - Communicate to stakeholders: "Dashboard data issue identified. Revenue
     is not actually zero. ETA for fix: X hours."
   - Do NOT guess at the fix. Diagnose before changing anything.
   - If fix will take time: provide manual data from source system as interim.
5. POST-INCIDENT:
   - Add the failed-check scenario to monitoring/alerting.
   - Implement the "zero revenue" anomaly detection (if today's revenue is
     <50% of trailing average, alert before dashboard refreshes).
   - Root cause analysis: why did the pipeline fail silently?
   - Update runbook for on-call.

**Automatic fail if:** Response does not immediately check the source system
to distinguish pipeline failure from business problem, or does not follow a
layered diagnostic approach.

---

## Test 15: Designing a Metric Ecosystem

**Scenario:** A new product has no analytics. The CEO says "tell me if the
product is working." Design a complete metric framework from scratch.

**Model Answer:**

**Key points that must be addressed:**
1. METRIC HIERARCHY:
   - **North Star Metric:** One metric that captures the core value exchange.
     Must satisfy: it moves when customers get value, it is measurable, it
     is leading (not just lagging), it is not gameable.
   - **Input Metrics:** Levers that drive the North Star (acquisition,
     activation, engagement, monetization, retention -- adapt AARRR framework
     to the specific product).
   - **Health Metrics / Guardrails:** Things that must NOT degrade (performance,
     error rate, customer satisfaction).
2. FOR EACH METRIC, DEFINE:
   - Exact calculation (SQL-level precision).
   - Data source.
   - Update frequency.
   - Owner (who is responsible for this metric).
   - Target (what "good" looks like, even if initially a guess).
   - Segmentation dimensions (by cohort, by plan, by geography).
3. SPECIFIC FRAMEWORK (example for a SaaS product):
   - **North Star:** Weekly qualified users (users who perform core action).
   - **Acquisition:** Signup rate, source attribution, CAC by channel.
   - **Activation:** Onboarding completion rate, time-to-first-value.
   - **Engagement:** DAU/MAU ratio, core feature usage frequency, session
     depth.
   - **Revenue:** MRR, ARPU, expansion revenue rate.
   - **Retention:** D7/D30/D90 retention by cohort, net revenue retention.
   - **Guardrails:** p95 latency, error rate, NPS/CSAT.
4. INSTRUMENTATION PLAN:
   - Event taxonomy: naming convention, required properties, validation.
   - Implementation: SDK/library, server-side vs. client-side.
   - Validation: automated tests that events fire correctly.
   - Privacy: PII handling, consent management.
5. DASHBOARD STRUCTURE:
   - Executive dashboard: North Star + top-line input metrics.
   - Team dashboards: detailed metrics for each team's area.
   - Alerting: automated alerts for metric anomalies.
6. COMMON PITFALLS TO AVOID:
   - Too many metrics (decision paralysis). Start with 5-7, expand as needed.
   - Vanity metrics (total users, pageviews) without context.
   - Lagging-only metrics (revenue) without leading indicators.
   - Metrics no one looks at (waste of instrumentation effort).

**Automatic fail if:** Response provides a flat list of metrics without
hierarchy, does not define how metrics are calculated, or does not include
guardrail/health metrics.

---

## Test 16: Power Analysis for Non-Standard Design

**Scenario:** You want to run a cluster-randomized experiment (randomizing
at the team level, not user level). There are 200 teams with an average of
15 users each. You expect an intra-cluster correlation (ICC) of 0.05. The
baseline conversion rate is 10%. What is the minimum detectable effect, and
how does clustering change your power compared to individual randomization?

**Model Answer:**

**Key points that must be addressed:**
1. DESIGN EFFECT: The clustering inflates the effective sample size needed.
   Design Effect (DEFF) = 1 + (m - 1) * ICC where m = cluster size.
   DEFF = 1 + (15 - 1) * 0.05 = 1.70.
2. EFFECTIVE SAMPLE SIZE: Total users = 200 * 15 = 3,000. But effective
   sample size = 3,000 / 1.70 = 1,765.
3. POWER CALCULATION:
   - With individual randomization (n=3,000): MDE for conversion at 10%
     baseline, 80% power, alpha=0.05: approximately 2.0 percentage points.
   - With cluster randomization (effective n=1,765): MDE increases to
     approximately 2.6 percentage points.
   - Clustering costs approximately 30% increase in MDE for this design.
4. IMPLICATIONS:
   - If the expected effect is smaller than 2.6pp, the experiment is
     underpowered. Options: more teams, longer duration, or accept lower power.
   - The ICC of 0.05 is moderate. If actual ICC is higher, power degrades
     further.
5. RECOMMENDATIONS:
   - Estimate ICC from historical data if possible (do not assume).
   - Consider stratified randomization (balance key team characteristics).
   - Adjust analysis to account for clustering (mixed effects model or
     GEE, not standard t-test).
   - Report design effect and effective sample size alongside results.
6. SENSITIVITY: Show how MDE changes with ICC:
   - ICC = 0.01: DEFF = 1.14, effective n = 2,632, MDE ~ 2.1pp
   - ICC = 0.05: DEFF = 1.70, effective n = 1,765, MDE ~ 2.6pp
   - ICC = 0.10: DEFF = 2.40, effective n = 1,250, MDE ~ 3.1pp

**Automatic fail if:** Response ignores the clustering and calculates power
as if users were individually randomized, or does not compute the design effect.

---

## Scoring Summary

| Test | Primary Dimension | Secondary Dimensions |
|------|-------------------|---------------------|
| 1 | Statistical Rigor | Communication, Ethical Rigor |
| 2 | Causal Reasoning | Statistical Rigor, Reproducibility |
| 3 | Model Evaluation | Communication, Production Readiness |
| 4 | Statistical Rigor | Causal Reasoning, Communication |
| 5 | Data Quality | Statistical Rigor, Causal Reasoning |
| 6 | Causal Reasoning | Model Evaluation, Communication |
| 7 | Production Readiness | Model Evaluation, Data Quality |
| 8 | Statistical Rigor | Causal Reasoning, Communication |
| 9 | Communication | Data Quality, Reproducibility |
| 10 | Ethical Rigor | Communication, Model Evaluation |
| 11 | Communication | Statistical Rigor, Model Evaluation |
| 12 | Data Quality | Model Evaluation, Reproducibility |
| 13 | Statistical Rigor | Communication, Causal Reasoning |
| 14 | Production Readiness | Data Quality, Communication |
| 15 | Communication | Data Quality, Production Readiness |
| 16 | Statistical Rigor | Reproducibility, Communication |

**Passing threshold:** 13 of 16 tests must pass.
**Exceptional threshold:** 13 pass + 5 score as "superior."

---

*Data science without statistical rigor is storytelling with numbers.
Every conclusion must withstand adversarial scrutiny.*
