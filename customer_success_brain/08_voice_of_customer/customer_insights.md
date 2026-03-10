# Customer Insights

## What This Enables

Customer insights transform raw behavioral data, survey responses, and interaction records into actionable intelligence about customer needs, motivations, and risks. When customer insights are generated at the highest level, behavioral analytics reveal how customers actually use the product (versus how they say they use it), cohort analysis uncovers lifecycle patterns that predict retention and expansion, segmentation creates operationally useful customer groupings, predictive modeling identifies at-risk customers before they signal intent to churn, and sentiment analysis extracts emotional signal from unstructured text at scale.

---

## The Core Insight

The foundational principle of customer insights, grounded in the work of Daniel Kahneman (*Thinking, Fast and Slow*) and applied to customer success by Lincoln Murphy and the Gainsight methodology, is that **customers are unreliable narrators of their own behavior**. What customers say (survey responses, support tickets, QBR conversations) and what customers do (login frequency, feature adoption, support ticket volume) frequently diverge. The most dangerous customer is the one who says "everything is fine" while their usage has declined 40% over the last quarter.

Therefore, a mature customer insights function relies primarily on behavioral data (what customers do) and uses attitudinal data (what customers say) as context and interpretation. The combination is more predictive than either alone: behavioral data detects the signal; attitudinal data explains the signal.

---

## Behavioral Analytics

### The Behavioral Data Hierarchy

Not all behavioral data is equally predictive of customer outcomes. The hierarchy, from most to least predictive:

```
Tier 1: Value Realization Behaviors (highest predictive power)
├── Achievement of the customer's stated business outcome
├── Usage of the feature that delivers the core value proposition
├── Expansion of use cases beyond initial implementation
└── Organic user growth within the account

Tier 2: Engagement Depth Behaviors
├── Feature breadth (number of distinct features used)
├── Feature depth (advanced features vs. basic only)
├── Integration adoption (connecting to other tools)
├── Admin configuration activity (customization investment)
└── Content creation (data, reports, workflows created)

Tier 3: Engagement Frequency Behaviors
├── Login frequency (DAU/WAU/MAU)
├── Session duration
├── API call volume
└── Notification engagement rate

Tier 4: Support Behaviors (lagging indicators)
├── Support ticket volume and trend
├── Ticket severity distribution
├── Self-service vs. agent-assisted ratio
└── Escalation frequency
```

### Key Behavioral Metrics

| Metric | Calculation | What It Reveals |
|--------|------------|-----------------|
| DAU/MAU Ratio | Daily active users / Monthly active users | User stickiness (>25% is strong for B2B) |
| Feature Adoption Rate | Users using feature / Total users | Feature-market fit |
| Time to First Value (TTFV) | Time from signup to first value milestone | Onboarding effectiveness |
| Breadth of Use | Distinct features used / Total features available | Depth of product dependency |
| License Utilization | Active licenses / Purchased licenses | Seat-based expansion/contraction signal |
| Power User Ratio | Power users / Total users | Risk of champion dependency |
| Integration Count | Active integrations per account | Switching cost / stickiness |

### Usage Trend Analysis

Raw usage numbers are misleading without trend context. A customer with 100 DAU is healthy if they started at 50 and dangerous if they started at 200.

**Trend Classification:**
```
Growth:     ▲ >10% increase over rolling 90-day average
Stable:     ─  Within +/-10% of rolling 90-day average
Declining:  ▼ >10% decrease over rolling 90-day average
Critical:   ▼▼ >25% decrease over rolling 90-day average
```

---

## Cohort Analysis

### Definition and Methodology

Cohort analysis groups customers by a shared characteristic (typically the time period they became customers) and tracks their behavior over time. This eliminates the composition bias that plagues aggregate metrics: if 50% of your customers are brand new, your average usage will always look low -- even if mature customers are highly engaged.

### Common Cohort Definitions

| Cohort Type | Grouping Variable | Use Case |
|-------------|-------------------|----------|
| Acquisition cohort | Month/quarter of first purchase | Retention curve analysis |
| Plan cohort | Product plan or tier | Plan-specific outcome analysis |
| Industry cohort | Customer industry | Vertical-specific engagement patterns |
| Size cohort | Employee count or ARR | Segment-specific lifecycle analysis |
| Onboarding cohort | Onboarding approach used | Onboarding method effectiveness |
| CSM cohort | Assigned CSM | CSM performance comparison |

### Retention Cohort Table

The canonical retention cohort table tracks what percentage of each acquisition cohort remains active N months after acquisition:

```
         Month 1  Month 2  Month 3  Month 6  Month 12
Q1 2024:   100%     92%      87%      78%      71%
Q2 2024:   100%     94%      90%      82%      --
Q3 2024:   100%     91%      85%      --       --
Q4 2024:   100%     95%      --       --       --
```

**Reading the table:**
- Read columns to compare cohorts at the same lifecycle stage (is Q4 retaining better than Q1 at month 2?)
- Read rows to track a single cohort over time (where does Q1 2024's retention flatten?)
- Identify the "cliff": the point where retention drops most sharply (often month 2-3 for SaaS)

### Cohort-Based Insights

| Pattern | Interpretation | Action |
|---------|---------------|--------|
| Newer cohorts retain better | Product/onboarding improvement is working | Continue investment; quantify ROI |
| Newer cohorts retain worse | Recent changes (pricing, onboarding, ICP drift) causing problems | Investigate what changed |
| Retention cliff at month 2 | Onboarding fails to deliver value quickly enough | Redesign onboarding for faster TTFV |
| Retention flat after month 6 | Customers who survive 6 months are sticky | Focus churn prevention on months 1-6 |
| Enterprise cohorts retain much better | Product-market fit is stronger for enterprise | Adjust ICP, pricing, and CS allocation |

---

## Segmentation

### Segmentation Frameworks

**Value-Based Segmentation (Recommended Primary):**

| Segment | Definition | CS Model |
|---------|-----------|----------|
| Strategic | Top 5-10% by ARR, high growth potential | High-touch, dedicated CSM, executive sponsor |
| Growth | Top 20% by ARR (excluding strategic) | Mid-touch, pooled CSM, proactive quarterly engagement |
| Scale | Middle 50% by ARR | Low-touch, digital-led, automated touchpoints |
| Self-Serve | Bottom 30% by ARR | Tech-touch, in-app only, community support |

**Behavioral Segmentation (Overlay):**

| Segment | Behavioral Profile | Risk/Opportunity |
|---------|-------------------|-----------------|
| Champions | High usage, multiple power users, advocate | Expansion opportunity |
| Engaged | Steady usage, meeting milestones | Stable, nurture |
| Underutilized | Low feature breadth, low user count | At risk, needs enablement |
| Declining | Negative usage trend | At risk, needs intervention |
| Zombie | Paying but minimal usage | High churn risk at renewal |

### Segmentation Implementation

Effective segmentation must be:
1. **Operationally actionable**: Each segment maps to a different CS playbook
2. **Mutually exclusive**: Every customer belongs to exactly one primary segment
3. **Dynamically reassigned**: Customers move between segments as behavior changes
4. **Data-driven**: Segment boundaries are based on data thresholds, not intuition
5. **Regularly validated**: Segment definitions are reviewed quarterly against outcome data

---

## Predictive Modeling

### Churn Prediction

The most valuable application of customer insights is predicting which customers will churn before they signal intent. Predictive churn models use historical data to identify patterns that precede churn.

**Feature Engineering for Churn Prediction:**

| Feature Category | Specific Features | Predictive Power |
|-----------------|-------------------|-----------------|
| Usage trends | 30/60/90-day usage change rate | Very high |
| Engagement depth | Feature breadth decline, advanced feature abandonment | High |
| Support signals | Ticket volume increase, escalation frequency | High |
| Stakeholder changes | Champion departure, executive sponsor change | Very high |
| Financial signals | Payment failure, discount request, downtier inquiry | High |
| NPS/CSAT trend | Score decline over consecutive surveys | Medium |
| Contract signals | Auto-renew disabled, RFP to competitors | Very high |
| Onboarding | TTFV > median, incomplete onboarding milestones | Medium (early) |

### Propensity Models

| Model | Predicts | Business Value |
|-------|---------|---------------|
| Churn propensity | Probability of non-renewal | Prioritize retention interventions |
| Expansion propensity | Probability of upsell/cross-sell | Prioritize expansion conversations |
| Advocacy propensity | Probability of referral/case study | Prioritize advocacy asks |
| Escalation propensity | Probability of support escalation | Preemptive executive engagement |

### Model Validation

Predictive models must be validated continuously:
- **AUC-ROC**: Discrimination ability (target > 0.75 for operational use)
- **Precision at top decile**: What percentage of the top 10% predicted churners actually churn? (Target > 50%)
- **Lead time**: How far in advance does the model detect risk? (Target: 60-90 days before renewal)
- **Calibration**: Does a 30% churn probability actually mean 30% of those customers churn?

---

## Sentiment Analysis

### Extracting Signal from Unstructured Text

Customers express sentiment in many channels: support tickets, NPS comments, call transcripts, emails, reviews, and social media. Sentiment analysis extracts emotional signal from this text at scale.

### Sentiment Analysis Approaches

| Approach | Method | Accuracy | Scale |
|----------|--------|----------|-------|
| Rule-based | Keyword matching, lexicon scoring | Low-Medium | Very high |
| ML classification | Trained classifiers (BERT, fine-tuned LLMs) | High | High |
| LLM-based | Prompt-based analysis with GPT-4/Claude | Very high | Medium-High |
| Human coding | Manual reading and categorization | Highest | Very low |

### Actionable Sentiment Outputs

**Theme extraction**: Automatically categorize feedback into themes (pricing, performance, support quality, missing feature, UX friction).

**Emotion detection**: Beyond positive/negative, detect specific emotions (frustration, delight, confusion, urgency).

**Topic trend analysis**: Track theme frequency over time. A rising "performance" theme may signal a scaling issue before metrics detect it.

**Competitive mentions**: Detect mentions of competitors in feedback text as an early warning of evaluation risk.

### Text-to-Action Pipeline

```
Raw text (support ticket, NPS comment, call transcript)
       │
       ▼
Preprocessing (clean, normalize, segment)
       │
       ▼
Sentiment scoring (-1.0 to +1.0)
       │
       ▼
Theme classification (pricing, feature, UX, performance, support)
       │
       ▼
Routing:
├── Negative sentiment + pricing → Alert renewals team
├── Negative sentiment + feature → Log in product feedback
├── Negative sentiment + support → Escalate to support manager
├── Positive sentiment + feature → Advocacy candidate
└── Competitive mention → Alert CSM + account exec
```

---

## Failure Modes

1. **Data Without Action**: Generating sophisticated dashboards and models that nobody uses to make decisions
2. **Behavioral Tunnel Vision**: Relying exclusively on usage data while ignoring attitudinal context (a customer may reduce usage because they restructured teams, not because they are unhappy)
3. **Cohort Confusion**: Comparing cohorts at different lifecycle stages (month-3 retention of Q1 vs. month-12 retention of Q4)
4. **Over-Segmentation**: Creating so many segments that each contains too few customers for statistical significance
5. **Model Decay**: Deploying a churn prediction model and never retraining it as customer behavior evolves
6. **Sentiment Washing**: Using sentiment analysis to filter out negative feedback before it reaches leadership

---

## The Operator's Framework

When evaluating customer insights maturity, assess:

1. **Behavioral vs. attitudinal balance**: Are both data types integrated, or does the team rely on one alone?
2. **Cohort awareness**: Are retention and expansion metrics reported by cohort rather than aggregate?
3. **Segmentation operationalization**: Does each segment have a distinct CS playbook with measurably different outcomes?
4. **Prediction accuracy**: Are churn/expansion models validated with AUC > 0.75 and calibrated?
5. **Insight-to-action latency**: How quickly does a behavioral signal trigger a CS action? (Target: < 48 hours for declining accounts)
6. **Text analysis coverage**: What percentage of unstructured customer feedback is processed through sentiment/theme analysis?
7. **Insights democratization**: Can non-analysts access customer insights through self-service dashboards?

---

## Summary

Customer insights bridge the gap between raw customer data and actionable intelligence. Behavioral analytics reveal what customers actually do, providing the most reliable signal for customer health assessment. Cohort analysis eliminates composition bias and reveals lifecycle patterns that aggregate metrics hide. Segmentation creates operationally useful customer groupings that drive differentiated engagement strategies. Predictive modeling identifies at-risk and expansion-ready customers before traditional signals appear, providing lead time for intervention. Sentiment analysis extracts emotional signal from unstructured text at scale, complementing quantitative metrics with qualitative context. The ultimate measure of customer insights maturity is not the sophistication of the models but the speed at which an insight changes a customer interaction for the better.
