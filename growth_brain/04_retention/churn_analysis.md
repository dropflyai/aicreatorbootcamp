# Churn Analysis — Logo vs Revenue Churn, Survival Analysis, Churn Prediction, Intervention Strategies

## Overview

Churn is the inverse of retention and the primary destroyer of company
value. For every percentage point of churn reduced, compound growth
improves exponentially. Yet most organizations lack a rigorous framework
for understanding churn: they measure it poorly, analyze it superficially,
and intervene too late. This module covers four dimensions of churn
mastery: distinguishing logo from revenue churn, applying survival
analysis for statistical rigor, building predictive churn models, and
designing intervention strategies that measurably reduce churn rates.

---

## Section 1: Logo vs. Revenue Churn

### Definitions

**Logo Churn (Customer Churn)**
The percentage of customers who cancel or do not renew within a period.
```
Logo Churn Rate = Customers Lost in Period / Customers at Start of Period
```

**Revenue Churn (MRR Churn / Dollar Churn)**
The percentage of recurring revenue lost from existing customers within
a period, including downgrades.
```
Gross Revenue Churn = (MRR Lost from Cancellations + Downgrades)
                      / MRR at Start of Period

Net Revenue Churn = (MRR Lost - MRR Gained from Expansion)
                    / MRR at Start of Period
```

### Why Both Metrics Matter

Logo churn and revenue churn tell different stories:

**High Logo Churn, Low Revenue Churn**
Many small customers leaving, but large customers staying and expanding.
Diagnosis: Product-market fit exists for enterprise segment; SMB segment
has a retention problem. Action: Either fix SMB experience or
strategically focus upmarket.

**Low Logo Churn, High Revenue Churn**
Few customers leaving, but many downgrading to smaller plans.
Diagnosis: Customers find some value but not enough to justify current
pricing. Action: Improve value delivery for premium features or adjust
pricing tiers.

**High Logo + High Revenue Churn**
Customers of all sizes are leaving.
Diagnosis: Fundamental product-market fit problem. Action: Pause
acquisition and focus entirely on understanding why users leave.

**Low Logo + Low Revenue Churn (or Negative Net Revenue Churn)**
Few customers leaving, and expansion revenue exceeds contraction.
Diagnosis: Healthy product with strong retention and expansion.
Net revenue retention above 100% means the business grows even without
new customers.

### Churn Rate Benchmarks (Monthly)

| Segment | Good Monthly Logo Churn | Great Monthly Logo Churn |
|---------|------------------------|------------------------|
| SMB SaaS | < 5% | < 3% |
| Mid-Market SaaS | < 2% | < 1% |
| Enterprise SaaS | < 1% | < 0.5% |

| Segment | Good Annual Net Revenue Retention | Great Annual NRR |
|---------|----------------------------------|-----------------|
| SMB SaaS | > 90% | > 100% |
| Mid-Market SaaS | > 100% | > 110% |
| Enterprise SaaS | > 110% | > 130% |

---

## Section 2: Survival Analysis

### Why Survival Analysis for Churn

Traditional churn rates assume all customers have equal churn risk at
all times. This is false. Churn risk varies by:
- Customer tenure (new customers churn at different rates than veterans)
- Time since last engagement (dormancy predicts churn)
- Cohort effects (customers acquired at different times behave
  differently)
- Censoring (customers who joined recently have not had the opportunity
  to churn yet—standard churn calculations mishandle this)

Survival analysis, borrowed from medical research (originally designed
to study patient survival times), properly handles these complexities.

### Kaplan-Meier Survival Estimation

The Kaplan-Meier estimator produces a survival curve—the probability
of "surviving" (remaining a customer) past time t.

**Key Properties:**
- Non-parametric: No assumption about the shape of the survival curve
- Handles censored data: Customers who have not yet churned are
  properly accounted for (right-censoring)
- Produces step-function survival curves that show exactly when
  churn risk is highest

**Interpreting Kaplan-Meier Curves**
- Steep drops indicate periods of high churn risk (common at contract
  renewal dates, end of trial periods, end of onboarding window)
- Flat regions indicate periods of low churn risk (stable customers)
- Median survival time: The point at which 50% of customers have
  churned—the "half-life" of a customer

**Segmented Survival Curves**
Plot separate survival curves for different customer segments to
identify which segments retain best:
- By acquisition channel
- By initial plan type
- By onboarding completion
- By industry or company size
- By geographic region

### Cox Proportional Hazards Model

The Cox model identifies which factors increase or decrease churn risk
while controlling for time.

**Output: Hazard Ratios**
- Hazard ratio > 1: Factor increases churn risk
- Hazard ratio < 1: Factor decreases churn risk
- Hazard ratio = 1: Factor has no effect

**Example Output:**
```
Factor                    Hazard Ratio    p-value
No onboarding completed   2.3            <0.001
Enterprise plan            0.4            <0.001
Monthly billing            1.8            <0.001
3+ integrations active     0.5            <0.01
Support ticket unresolved  1.6            <0.01
```

Interpretation: Customers who did not complete onboarding are 2.3x
more likely to churn at any given time. Enterprise customers are 60%
less likely to churn. Monthly billing customers are 1.8x more likely
to churn than annual.

### Practical Application

Use survival analysis to:
- Set realistic retention targets by segment and tenure
- Identify the highest-risk periods for targeted intervention
- Quantify the retention impact of product features and onboarding
- Forecast future churn with greater accuracy than simple rates
- Design experiments that target the right customers at the right time

---

## Section 3: Churn Prediction

### Building a Churn Prediction Model

Predictive churn models use machine learning to identify customers
likely to churn before they do, enabling proactive intervention.

**Step 1: Define the Prediction Target**
- Binary classification: Will this customer churn in the next 30/60/90
  days? (Most common)
- Probability estimation: What is the probability of churn? (More
  nuanced, enables risk scoring)
- Time-to-event prediction: When will this customer churn? (Survival
  models, most sophisticated)

**Step 2: Feature Engineering**
The quality of features determines model performance. Critical feature
categories:

**Usage Features (Strongest Predictors)**
- Login frequency (daily, weekly, monthly)
- Core action frequency (the product's critical event)
- Feature breadth (number of features used)
- Usage trend (increasing, stable, declining over last 30 days)
- Time since last login
- Session duration trend

**Account Features**
- Plan type (free, starter, pro, enterprise)
- Billing cycle (monthly vs. annual)
- Customer tenure (months since sign-up)
- Number of users/seats on account
- Contract renewal date proximity

**Support Features**
- Number of support tickets in last 90 days
- Ticket sentiment (positive, negative, neutral)
- Average resolution time
- NPS or CSAT score
- Feature requests submitted

**Financial Features**
- Payment failures (involuntary churn risk)
- Discount or promotion applied
- Revenue per user trend
- Expansion or contraction history

**Engagement Features**
- Email open rate trend
- Webinar or training attendance
- Community participation
- Product update adoption rate

**Step 3: Model Selection**

| Model | Strengths | Weaknesses |
|-------|-----------|------------|
| Logistic Regression | Interpretable, fast, baseline | Linear assumptions |
| Random Forest | Handles non-linear, robust | Less interpretable |
| Gradient Boosting (XGBoost) | Highest accuracy typically | Requires tuning |
| Neural Networks | Complex pattern detection | Black box, needs data |
| Survival Models | Handles censoring, time-aware | Specialized expertise |

**Recommendation:** Start with logistic regression for interpretability.
Upgrade to gradient boosting when accuracy is more important than
explainability. Use survival models when time-to-churn is important.

**Step 4: Model Evaluation**

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| AUC-ROC | Overall discrimination ability | > 0.80 |
| Precision | Of predicted churners, how many actually churn | > 0.60 |
| Recall | Of actual churners, how many were predicted | > 0.70 |
| F1 Score | Balance of precision and recall | > 0.65 |
| Calibration | Does 80% predicted risk = 80% actual churn? | Well-calibrated |

**Step 5: Operationalization**
- Run the model weekly or daily (depending on data freshness)
- Output risk scores for every account (0–100 scale)
- Set thresholds for intervention tiers (high/medium/low risk)
- Route high-risk accounts to CSM or automated intervention
- Track save rates by risk tier to validate model accuracy

---

## Section 4: Intervention Strategies

### The Churn Intervention Framework

Interventions are actions taken to prevent predicted or detected churn.
The effectiveness of an intervention depends on timing, relevance, and
execution quality.

### Intervention Timing

**Proactive Interventions (Before Churn Signals)**
- Onboarding excellence (first 7–30 days)
- Regular value delivery check-ins
- Milestone celebrations (usage achievements)
- Education and training (feature adoption)

**Reactive Interventions (After Churn Signals Detected)**
- Triggered by: Usage decline, negative sentiment, low health score
- Timing: Within 48 hours of signal detection
- Escalation path: Automated → CSM → Manager → Executive

**Last-Resort Interventions (Cancellation Initiated)**
- Off-ramp survey (mandatory before cancellation)
- Retention offers (discount, downgrade, pause)
- Executive save call (for high-value accounts)
- Downgrade offer (retain relationship at lower revenue)

### Intervention Playbooks

**Usage Decline Playbook**
Trigger: Core action frequency drops >40% over 14 days
```
Day 1: Automated email — "We noticed you haven't [action].
        Here's what's new."
Day 3: In-app message — "Need help with [feature]?
        Book a quick call."
Day 7: CSM outreach — Personal email from assigned CSM
Day 14: Phone call — CSM calls to understand blockers
Day 21: Executive outreach — If high-value, manager engages
```

**Negative Sentiment Playbook**
Trigger: Negative support ticket, low NPS score, or social mention
```
Hour 0: Alert to CSM and support manager
Hour 4: CSM reviews account history and prepares response
Hour 8: CSM contacts customer with acknowledgment and plan
Day 3: Follow-up with resolution or escalation
Day 7: Check-in to confirm satisfaction
Day 30: NPS re-survey to confirm recovery
```

**Contract Renewal Risk Playbook**
Trigger: 90 days before renewal with health score below threshold
```
Day -90: Executive business review scheduled
Day -75: EBR delivered with value summary and roadmap
Day -60: Renewal proposal sent with growth recommendations
Day -45: Negotiation window opens
Day -30: Escalation if renewal not confirmed
Day -15: Final executive engagement if still at risk
Day -7: Last offer (terms adjustment, multi-year incentive)
```

### Retention Offers

**Discount Offers**
- Effective for price-sensitive segments
- Typically 20–30% discount for 3–6 months
- Risk: Trains customers to threaten churn for discounts
- Best practice: Offer once per customer lifetime, track LTV impact

**Downgrade Offers**
- Effective when customers are over-subscribed
- Move to a lower plan rather than losing the account entirely
- Preserves the relationship for future expansion
- Better long-term economics than full churn

**Pause Offers**
- Effective for seasonal businesses or temporary financial constraints
- 1–3 month pause with guaranteed return
- Reduces friction of reactivation vs. full cancellation and re-signup
- Track resume rate by pause duration

**Feature Access Extension**
- Effective when the customer has not adopted key features
- Grant temporary access to premium features with guided onboarding
- If adoption increases, customer sees value and retains
- If adoption does not increase, churn was not price-driven

### Measuring Intervention Effectiveness

| Metric | Definition | Target |
|--------|-----------|--------|
| Save rate | % of at-risk accounts retained after intervention | > 30% |
| Intervention ROI | Revenue saved / cost of intervention | > 5x |
| Time to intervention | Hours from signal to first action | < 48 hours |
| False positive rate | % of flagged accounts that were not at risk | < 30% |
| Re-churn rate | % of saved accounts that churn within 6 months | < 40% |

---

## Key References

- David Skok: SaaS churn benchmarks (forentrepreneurs.com)
- Tomasz Tunguz: Churn analysis for SaaS (tomtunguz.com)
- Lenny Rachitsky: Retention and churn frameworks
- Hosmer and Lemeshow, *Applied Survival Analysis* (Wiley)
- XGBoost documentation for churn prediction implementation
- ProfitWell/Paddle: Involuntary churn research

---

## Summary

Churn analysis requires distinguishing between logo churn (customer
count) and revenue churn (dollar impact)—they tell different stories
and demand different responses. Survival analysis provides statistical
rigor by handling censored data and time-varying risk that simple churn
rates cannot capture. Predictive churn models use machine learning to
identify at-risk customers before they leave, enabling proactive
intervention. Intervention strategies must be timed, relevant, and
measured—from proactive value delivery through reactive save motions to
last-resort retention offers. The Growth Brain treats churn not as an
inevitable loss but as a solvable problem that yields compounding
returns when addressed systematically.
