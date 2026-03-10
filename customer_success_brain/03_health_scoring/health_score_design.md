# Health Score Design

## Purpose of Health Scoring

A customer health score is a composite metric that predicts the likelihood of
a customer renewing, expanding, or churning. It transforms disparate data
signals into a single actionable indicator that drives CSM prioritization,
playbook triggers, and management reporting. Gainsight Academy identifies
health scoring as the foundational capability of any mature CS organization.

---

## Health Score Architecture

### Design Principles

1. **Predictive, not descriptive**: The score must predict future behavior
   (renewal, churn, expansion), not merely describe current state
2. **Composite, not singular**: Multiple dimensions weighted by predictive power
3. **Actionable**: Each score level must map to specific CSM actions
4. **Transparent**: Customers should understand (at a high level) what drives
   their health assessment
5. **Calibrated**: Regular validation against actual outcomes with adjustments

### The Four-Dimension Model

The industry-standard health score model (Gainsight, Totango, ChurnZero)
uses four primary dimensions:

```
CUSTOMER HEALTH SCORE (0-100)
═════════════════════════════

┌─────────────────────────────────────────────────────────┐
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   PRODUCT    │  │  ENGAGEMENT  │  │   SUPPORT    │  │
│  │    USAGE     │  │              │  │  SENTIMENT   │  │
│  │  (30-40%)    │  │  (20-30%)    │  │  (15-20%)    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │   BUSINESS   │  │   CONTRACT   │                     │
│  │  OUTCOMES    │  │   SIGNALS    │                     │
│  │  (15-20%)    │  │  (5-10%)     │                     │
│  └──────────────┘  └──────────────┘                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Dimension 1: Product Usage (30-40% Weight)

Product usage is the strongest predictor of retention. Customers who use the
product frequently and deeply are significantly less likely to churn.

### Usage Sub-Metrics

```
PRODUCT USAGE SCORE (0-100)
───────────────────────────
Sub-Metric                          Weight    Calculation
─────────────────────────────────── ──────── ──────────────────────────
Login Frequency                     15%      Actual logins / Expected logins x 100
Feature Breadth                     25%      Features used / Relevant features x 100
Feature Depth                       25%      Usage intensity / Expected intensity x 100
User Penetration                    20%      Active users / Licensed users x 100
Usage Trend (30-day)                15%      Current period / Prior period x 100

Usage Score = Σ (Sub-Metric Score x Weight)
```

### Usage Decay Detection

Usage trends matter more than absolute levels. A customer declining from 80%
to 50% usage is a stronger churn signal than a customer stable at 50%.

```
Usage Trend Scoring:
  Growing (>10% increase):      100 points
  Stable (±10%):                 70 points
  Declining (10-25% decrease):   40 points
  Rapid Decline (>25% decrease): 10 points
  Zero usage (inactive):          0 points
```

---

## Dimension 2: Engagement (20-30% Weight)

Engagement measures the quality and frequency of the relationship between the
CS team and the customer's stakeholders.

### Engagement Sub-Metrics

```
ENGAGEMENT SCORE (0-100)
────────────────────────
Sub-Metric                          Weight    Calculation
─────────────────────────────────── ──────── ──────────────────────────
Meeting Cadence Adherence           25%      Meetings held / Meetings planned x 100
Stakeholder Breadth                 25%      Active contacts / Target contacts x 100
Executive Sponsor Engaged           20%      Binary: engaged (100) or not (0)
Response Time to CS Outreach        15%      Avg response time scored inversely
Event/Webinar Participation         15%      Events attended / Events invited x 100

Engagement Score = Σ (Sub-Metric Score x Weight)
```

### Multi-Threading Score

Single-threaded accounts (one primary contact) are the highest churn risk
when that contact leaves. The multi-threading score measures relationship depth:

```
Multi-Threading Score:
  1 active contact:    20 (Critical risk)
  2 active contacts:   40 (High risk)
  3 active contacts:   60 (Moderate risk)
  4 active contacts:   80 (Good)
  5+ active contacts: 100 (Excellent)

"Active" = Has engaged with CS team in the past 90 days
```

---

## Dimension 3: Support Sentiment (15-20% Weight)

Support interactions are a window into customer satisfaction. The pattern of
support tickets — volume, severity, resolution, and sentiment — reveals
customer health.

### Support Sub-Metrics

```
SUPPORT SENTIMENT SCORE (0-100)
───────────────────────────────
Sub-Metric                          Weight    Calculation
─────────────────────────────────── ──────── ──────────────────────────
Ticket Volume Trend                 25%      Normalized trend (lower is better)
Open Critical Tickets               25%      Binary: 0 critical = 100, any = 30
CSAT on Recent Tickets              25%      Average CSAT (scaled to 0-100)
Escalation History (90 days)        25%      0 escalations = 100, scaled down

Support Score = Σ (Sub-Metric Score x Weight)
```

### Support Sentiment Signals

```
POSITIVE SIGNALS:
+ Decreasing ticket volume over time
+ High CSAT scores (>4.5/5.0)
+ No escalations in 90 days
+ Customer submitting feature requests (engaged, not just complaining)

NEGATIVE SIGNALS:
- Increasing ticket volume trend
- Multiple critical/blocker tickets
- Low CSAT scores (<3.0/5.0)
- Repeated escalations
- "We're evaluating alternatives" language in tickets
- Tickets from executive stakeholders
```

---

## Dimension 4: Business Outcomes (15-20% Weight)

Business outcomes measure whether the customer is achieving the results they
purchased the product for. This is the hardest dimension to measure but the
most meaningful.

### Outcome Sub-Metrics

```
BUSINESS OUTCOMES SCORE (0-100)
───────────────────────────────
Sub-Metric                          Weight    Calculation
─────────────────────────────────── ──────── ──────────────────────────
Success Plan Progress               30%      Milestones met / Milestones planned x 100
ROI Documented                      25%      Binary: documented (100) or not (30)
Customer-Confirmed Value            25%      From QBR/survey: 0-100 scale
NPS Score                           20%      Promoter=100, Passive=60, Detractor=20

Outcomes Score = Σ (Sub-Metric Score x Weight)
```

---

## Dimension 5: Contract Signals (5-10% Weight)

Contract and commercial signals provide additional context:

```
CONTRACT SIGNALS SCORE (0-100)
──────────────────────────────
Sub-Metric                          Weight    Calculation
─────────────────────────────────── ──────── ──────────────────────────
Time to Renewal                     30%      >180 days=100, <90 days=scaled
Contract Growth History             30%      Expanded=100, Flat=60, Contracted=20
Payment Timeliness                  20%      On-time=100, Late=50, Very late=20
Multi-Year Contract                 20%      Multi-year=100, Annual=60, Month-to-month=30
```

---

## Composite Score Calculation

### The Master Formula

```
Health Score = (Usage Score x Usage Weight)
             + (Engagement Score x Engagement Weight)
             + (Support Score x Support Weight)
             + (Outcomes Score x Outcomes Weight)
             + (Contract Score x Contract Weight)

Default Weights (adjust by validation):
  Usage:      35%
  Engagement: 25%
  Support:    15%
  Outcomes:   15%
  Contract:   10%

Example:
  Usage Score:      72 x 0.35 = 25.2
  Engagement Score: 85 x 0.25 = 21.3
  Support Score:    90 x 0.15 = 13.5
  Outcomes Score:   65 x 0.15 =  9.8
  Contract Score:   80 x 0.10 =  8.0
  ─────────────────────────────────
  Composite Health Score:     77.8
```

### Score Bands

```
HEALTH SCORE BANDS
──────────────────
90-100: Excellent (Green+)  → Advocacy candidate, expansion priority
75-89:  Healthy (Green)     → Standard engagement, monitor for changes
60-74:  Moderate (Yellow)   → Increased attention, proactive outreach
40-59:  At-Risk (Orange)    → Active intervention, rescue playbook
0-39:   Critical (Red)      → Immediate escalation, executive engagement
```

---

## Predictive Validation

### Why Validation Matters

A health score is only valuable if it predicts outcomes. An unvalidated health
score is organizational theater — it creates the illusion of insight without
delivering predictive power.

### Validation Methodology

```
HEALTH SCORE VALIDATION PROCESS
═══════════════════════════════

Step 1: Capture Baseline
  ├── Record health scores for all accounts at a point in time
  └── Note the score band (Green, Yellow, Orange, Red)

Step 2: Track Outcomes (6-12 months later)
  ├── For each account: Did they renew, expand, contract, or churn?
  └── Record the actual outcome

Step 3: Calculate Predictive Accuracy
  ├── True Positive: Red/Orange score → Churned (correct prediction)
  ├── True Negative: Green score → Renewed (correct prediction)
  ├── False Positive: Red/Orange score → Renewed (false alarm)
  ├── False Negative: Green score → Churned (missed signal)
  │
  ├── Precision = TP / (TP + FP)  [Of predicted churns, how many actually churned?]
  ├── Recall = TP / (TP + FN)  [Of actual churns, how many did we predict?]
  └── F1 Score = 2 x (Precision x Recall) / (Precision + Recall)

Step 4: Calibrate
  ├── If precision is low: Tighten score thresholds (reduce false alarms)
  ├── If recall is low: Broaden signals (catch more true churns)
  └── Adjust dimension weights based on which dimensions predict best

Target Metrics:
  Precision: > 70%
  Recall: > 80% (better to over-flag than miss churns)
  F1 Score: > 75%
```

### Continuous Calibration Cycle

```
Quarterly Health Score Review:
1. Run validation analysis against actual churn/renewal data
2. Identify dimensions with strongest/weakest predictive power
3. Adjust weights based on evidence
4. Test adjusted model against historical data
5. Deploy updated weights
6. Document changes in Memory
```

---

## Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Over-weighting engagement | CSMs inflate scores by increasing touches | Weight product usage more heavily |
| Ignoring trends | Static scores miss declining health | Include 30-day trend in each dimension |
| Equal weighting | Not all signals are equally predictive | Use validation data to set weights |
| Binary inputs | "Has executive sponsor: yes/no" loses nuance | Use gradient scoring where possible |
| Stale data | Score based on data > 30 days old | Ensure data freshness SLAs |
| No baseline | "75 is good" without context | Establish percentile rankings across portfolio |

---

## References

1. Gainsight. (2024). *Health Score Best Practices*. Gainsight Academy.
2. TSIA. (2023). *Customer Health Scoring Frameworks*.
3. Murphy, L. (2019). "Health Scores That Actually Predict Churn." Sixteen
   Ventures.
4. ChurnZero. (2023). *Health Score Design Guide*.
5. Mehta, N. (2020). "The Science of Customer Health." Pulse Conference.

---

**A health score without predictive validation is a vanity metric. Validate
relentlessly, calibrate continuously.**
