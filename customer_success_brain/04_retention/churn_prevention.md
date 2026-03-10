# Churn Prevention — Churn Taxonomy, Root Cause Analysis, Predictive Models, Intervention Playbooks, Save Rate Tracking

## Overview

Churn prevention is the highest-leverage activity in customer success. Acquiring a new customer costs 5-25x more than retaining an existing one (Harvard Business Review). Every churned customer represents lost revenue, wasted acquisition cost, and a potential detractor in the market. This module covers the complete churn prevention discipline: classifying churn by type and cause, conducting root cause analysis, deploying predictive models for early detection, executing intervention playbooks, and measuring save rate effectiveness.

---

## Section 1: Churn Taxonomy

### Churn Classification by Controllability

**Voluntary Churn (Customer-Initiated)**
The customer actively decides to cancel. This is the primary focus of CS intervention because it is potentially preventable.

Subtypes:
- Value churn: Customer does not perceive sufficient value for the price
- Fit churn: Customer's needs evolved beyond the product's capabilities
- Experience churn: Poor support, buggy product, or frustrating UX
- Competitive churn: Customer switches to a competitor product
- Champion churn: Internal advocate leaves the organization
- Budget churn: Customer's budget is cut or reallocated
- Strategic churn: Customer's business direction changes

**Involuntary Churn (Payment-Related)**
The customer's payment fails without their active decision to cancel.
- Expired credit card
- Insufficient funds
- Bank declines (fraud flags, limits)
- Payment processor errors

Involuntary churn typically represents 20-40% of total churn in self-serve SaaS. It is largely preventable through dunning management.

**Planned Churn (Known in Advance)**
- Contract non-renewal (decision made before expiration)
- Seasonal businesses (predictable usage patterns)
- Project-based usage (one-time need)
- Acquisition/merger (customer absorbed into another entity)

### Churn Segmentation

Segment churn analysis by:
- Customer segment (enterprise, mid-market, SMB)
- Tenure (first 90 days vs. established customers)
- ARR band (impact varies by revenue)
- Acquisition channel (do some channels produce higher-churn customers?)
- Industry vertical
- Geographic region

---

## Section 2: Root Cause Analysis

### The Churn Investigation Framework

For every churned customer above a defined ARR threshold, conduct a root cause analysis:

**Step 1: Data Review**
Before contacting the customer, review all available data:
- Usage trends (login frequency, feature adoption, engagement decline)
- Health score history (when did the score start declining?)
- Support history (ticket volume, sentiment, unresolved issues)
- NPS/CSAT responses (any detractor scores?)
- CSM notes (any flagged risks or concerns?)
- Business context (news about the company, leadership changes)

**Step 2: Exit Interview**
Conduct a structured exit conversation:
- What initially prompted the decision to evaluate leaving?
- When did you first start considering alternatives?
- What could we have done differently?
- Where are you moving to? (competitor intelligence)
- Would you consider returning under different circumstances?
- What would need to change for you to recommend us to others?

**Step 3: Categorization**
Classify the root cause using the churn taxonomy. If multiple causes contributed, identify the primary and secondary causes.

**Step 4: Pattern Analysis**
Aggregate root causes quarterly to identify systemic issues:

| Root Cause | Q1 Count | Q2 Count | Trend | Action Owner |
|-----------|---------|---------|-------|-------------|
| Value perception | | | | Product |
| Poor onboarding | | | | CS |
| Feature gaps | | | | Product |
| Support experience | | | | Support |
| Champion loss | | | | CS |
| Budget/strategic | | | | Not controllable |
| Competitive switch | | | | Product + Marketing |

### Involuntary Churn Prevention (Dunning)

**Pre-Dunning Prevention:**
- Card expiration alerts (30, 15, 7 days before)
- Account updater integration (automatic card refresh)
- Multiple payment methods on file
- Annual billing conversion (eliminates 12 monthly payment points)

**Dunning Sequence:**
```
Day 0: Payment fails
  - Auto-retry payment immediately
  - Email: "We had trouble processing your payment"
  - In-app: Banner notification

Day 3: Second retry
  - Email: "Action needed: Update your payment method"
  - Push notification (if enabled)

Day 7: Third retry
  - Email: "Your account will be limited in 7 days"
  - CSM notification (for high-value accounts)

Day 14: Final retry
  - Email: "Final notice: Update payment to keep your account"
  - Restrict non-essential features (not core data access)

Day 21: Graceful degradation
  - Account moved to read-only (preserve data)
  - Email: "Your account is on hold. Update payment to reactivate."

Day 60: Account suspension
  - Data preserved for 90 more days
  - Reactivation available with payment update
```

---

## Section 3: Predictive Churn Models

### Health Score as Churn Predictor

The customer health score is the primary tool for predicting churn risk. A well-designed health score synthesizes multiple signals into a single risk assessment.

**Health Score Components:**

| Component | Weight | Data Source | Measurement |
|-----------|--------|-----------|-------------|
| Product usage | 30% | Analytics | Login frequency, feature adoption, core action volume |
| Engagement | 20% | CRM + Events | CSM meeting attendance, email response, event participation |
| Support health | 15% | Ticketing | Ticket volume, sentiment, resolution satisfaction |
| Relationship | 15% | CRM | Stakeholder count, champion status, multi-threading |
| Outcome achievement | 10% | Success plan | Progress toward defined business outcomes |
| Contract health | 10% | Billing | Payment history, contract tenure, expansion history |

**Score Ranges:**
- 80-100: Healthy (low churn risk, expansion opportunity)
- 60-79: Neutral (monitor, maintain engagement)
- 40-59: At-risk (proactive intervention needed)
- 0-39: Critical (immediate escalation required)

### Machine Learning Churn Prediction

Beyond rule-based health scores, ML models can detect subtle patterns:

**Feature Engineering:**
- Usage velocity (rate of change in usage, not just absolute level)
- Engagement trend (increasing, stable, or declining over 30/60/90 days)
- Support sentiment trajectory
- Login gap (days since last login vs. historical average)
- Feature breadth decline (using fewer features than previously)
- Stakeholder engagement breadth (are fewer people engaging?)

**Model Output:**
- Churn probability score (0-100%) for each account
- Risk drivers (which factors are contributing most to the risk)
- Recommended intervention (based on risk driver pattern)
- Time to predicted churn (urgency estimation)

---

## Section 4: Intervention Playbooks

### Risk-Based Intervention Matrix

| Risk Level | Health Score | Response Time | Intervention Owner | Escalation Path |
|-----------|------------|--------------|-------------------|----------------|
| Critical | 0-39 | 24 hours | CSM + Manager | VP of CS → CRO |
| High | 40-59 | 48 hours | CSM | CS Manager |
| Medium | 60-69 | 1 week | CSM (standard cadence) | CSM Manager |
| Low | 70-79 | Standard cadence | CSM | None |
| Healthy | 80-100 | Standard cadence | CSM | None (focus on expansion) |

### Critical Risk Playbook (Score 0-39)

```
Hour 0-4: Assessment
  [ ] Review all health score components
  [ ] Identify primary risk driver
  [ ] Review recent support interactions
  [ ] Check for champion changes or organizational shifts

Hour 4-24: Outreach
  [ ] CSM personal outreach (call preferred over email)
  [ ] Acknowledge the situation openly
  [ ] Listen before solving (understand their perspective)
  [ ] Schedule an in-depth review within 48 hours

Day 2-5: Action Plan
  [ ] Deliver a written remediation plan with specific timelines
  [ ] Involve product/engineering if technical issues are root cause
  [ ] Offer executive sponsor engagement
  [ ] Set weekly check-in cadence until resolved

Day 5-14: Execution
  [ ] Execute remediation plan with daily internal tracking
  [ ] Provide progress updates to customer every 48 hours
  [ ] Escalate any blocked items immediately
  [ ] Prepare retention offer if value/price is the root cause

Day 14-30: Stabilization
  [ ] Confirm resolution of root cause
  [ ] Re-assess health score
  [ ] Document lessons learned
  [ ] Maintain elevated check-in cadence for 60 days
```

### Champion Loss Playbook

```
Detection: Primary contact leaves the organization

Day 1:
  [ ] Confirm departure through LinkedIn, email bounce, or internal contact
  [ ] Identify replacement contact (ask departing champion for intro)
  [ ] Notify CSM manager and account team

Day 2-5:
  [ ] Connect with new contact (warm intro from champion or cold outreach)
  [ ] Provide product overview tailored to new contact's priorities
  [ ] Share value summary (ROI, outcomes achieved, usage data)
  [ ] Offer onboarding session for new stakeholder

Day 5-14:
  [ ] Schedule strategic alignment meeting
  [ ] Re-establish success plan with new contact's goals
  [ ] Identify and engage additional stakeholders (multi-threading)
  [ ] Assess whether the new contact is a supporter, neutral, or detractor

Ongoing:
  [ ] Elevated check-in cadence for 90 days
  [ ] Monitor usage patterns for any decline post-transition
  [ ] Build relationship depth with multiple stakeholders
```

---

## Section 5: Save Rate Tracking

### Save Rate Metrics

```
Save Rate = Accounts Retained After Intervention / Total At-Risk Accounts
```

**Segmented Save Rates:**

| Risk Type | Attempted Saves | Successful Saves | Save Rate | Revenue Saved |
|----------|----------------|-----------------|-----------|--------------|
| Value churn | | | ___% | $_____ |
| Champion loss | | | ___% | $_____ |
| Competitive | | | ___% | $_____ |
| Experience | | | ___% | $_____ |
| Budget | | | ___% | $_____ |
| **Total** | | | **___%** | **$_____** |

**Save Rate Benchmarks:**
- Overall save rate: 25-40% is good, 40-60% is excellent
- Value churn save rate: 30-50% (addressable through value realization)
- Competitive churn save rate: 15-25% (harder to reverse)
- Champion loss save rate: 40-60% (relationship-dependent)
- Budget churn save rate: 10-20% (often non-controllable)

### Re-Churn Tracking

Saved customers who churn again within 6-12 months indicate that the
save was temporary rather than genuine. Track re-churn rate:

```
Re-Churn Rate = Saved Customers Who Churn Within 12 Months
                / Total Saved Customers
```

Target: Re-churn rate below 30%. If higher, saves are superficial and
the underlying issues are not being resolved.

---

## Key References

- Lincoln Murphy: Customer Success churn prevention
- Nick Mehta, *Customer Success* (Wiley)
- Gainsight: Churn analysis frameworks
- ProfitWell: Involuntary churn research
- Bain & Company: Customer retention economics

---

## Summary

Churn prevention requires taxonomic precision (understanding why customers leave), investigative rigor (root cause analysis for every significant churn event), predictive capability (health scores and ML models that detect risk before it becomes cancellation), playbook discipline (structured interventions calibrated to risk type and severity), and measurement accountability (save rate tracking with re-churn monitoring). The Customer Success Brain treats every preventable churn as a system failure to be diagnosed, addressed, and prevented from recurring.
