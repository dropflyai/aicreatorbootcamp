# At-Risk Management — Risk Scoring, Escalation Protocols, Executive Business Review, Remediation Plans

## Overview

At-risk management is the systematic identification, escalation, and remediation of customer accounts showing signs of potential churn. The difference between organizations that retain 90% of revenue and those that retain 110% (net revenue retention) is not better products—it is better at-risk management. Early detection, structured escalation, executive engagement, and accountable remediation plans convert at-risk accounts into renewed, expanded customers. This module covers the complete at-risk management discipline.

---

## Section 1: Risk Scoring

### Multi-Signal Risk Assessment

No single signal reliably predicts churn. Risk scoring must synthesize multiple signals across behavioral, relationship, and business dimensions.

**Behavioral Signals (Product Usage)**

| Signal | Risk Threshold | Weight |
|--------|---------------|--------|
| Login frequency decline | >30% decline over 30 days | High |
| Core feature usage decline | >40% decline over 30 days | Critical |
| Feature breadth contraction | Using fewer features than 90-day average | Medium |
| Seat utilization decline | Active seats / licensed seats <50% | High |
| API/integration activity decline | >50% decline over 30 days | Medium |

**Relationship Signals**

| Signal | Risk Threshold | Weight |
|--------|---------------|--------|
| CSM meeting no-shows | 2+ consecutive no-shows | High |
| Email non-responsiveness | No response to 3+ outreach attempts | Critical |
| NPS/CSAT score | Detractor (NPS <7) or CSAT <3 | High |
| Champion departure | Primary contact leaves | Critical |
| Stakeholder disengagement | Multi-thread contacts inactive | Medium |

**Business Signals**

| Signal | Risk Threshold | Weight |
|--------|---------------|--------|
| Payment issues | 2+ failed payments in 90 days | Medium |
| Downsizing indicators | Layoff news, reduced headcount | High |
| Competitor evaluation | RFP issued, competitor demo requested | Critical |
| Budget changes | Budget cut communicated or rumored | High |
| Contract term approaching | <90 days to renewal, no engagement | High |

### Risk Score Calculation

```
Risk Score = (Behavioral Score x 0.40) +
             (Relationship Score x 0.35) +
             (Business Score x 0.25)

Each component scored 0-100:
0-25:   Low risk
26-50:  Medium risk
51-75:  High risk
76-100: Critical risk
```

### Risk Score Validation

Validate the risk score model quarterly:
- Calculate the churn rate for each risk tier
- If high-risk accounts are not churning at higher rates, the model is poorly calibrated
- If accounts churn from the "low risk" tier, the model is missing signals

**Target Calibration:**

| Risk Tier | Expected Annual Churn Rate |
|----------|--------------------------|
| Low (0-25) | <5% |
| Medium (26-50) | 5-15% |
| High (51-75) | 15-30% |
| Critical (76-100) | 30-60% |

---

## Section 2: Escalation Protocols

### Escalation Tiers

**Tier 1: CSM-Level Response (Risk Score 26-50)**
- Owner: Assigned CSM
- Timeline: Response within 1 week
- Actions: Increased check-in frequency, value reinforcement, proactive engagement
- Reporting: Weekly update to CS Manager
- Duration: 30-60 days before re-assessment

**Tier 2: Manager-Level Escalation (Risk Score 51-75)**
- Owner: CSM + CS Manager
- Timeline: Response within 48 hours
- Actions: Formal remediation plan, executive alignment, product escalation if needed
- Reporting: Bi-weekly update to CS Director
- Duration: 30-45 days with defined milestones

**Tier 3: Executive Escalation (Risk Score 76-100)**
- Owner: CS Director/VP + Executive Sponsor
- Timeline: Response within 24 hours
- Actions: Executive business review, cross-functional war room, retention offer authorization
- Reporting: Weekly update to CRO/CEO
- Duration: 14-30 days (accelerated timeline)

### Escalation Decision Tree

```
Is the account above ARR threshold for executive attention?
├── YES → Is the risk score >75?
│         ├── YES → Tier 3 (Executive Escalation)
│         └── NO  → Is the risk score >50?
│                   ├── YES → Tier 2 (Manager Escalation)
│                   └── NO  → Tier 1 (CSM Response)
└── NO  → Is the risk score >75?
          ├── YES → Tier 2 (Manager Escalation)
          └── NO  → Tier 1 (CSM Response)
```

### Cross-Functional Escalation

When the root cause extends beyond CS:

**Product/Engineering Escalation**
Trigger: Technical issues, bugs, feature gaps driving risk
Process: File priority bug/feature request with risk context, involve product liaison
SLA: Engineering acknowledgment within 24 hours, resolution timeline within 48 hours

**Sales/Leadership Escalation**
Trigger: Pricing concerns, competitive pressure, contract terms
Process: Brief account executive or sales leader, prepare negotiation parameters
SLA: Strategy alignment within 24 hours

**Executive Sponsor Escalation**
Trigger: Strategic misalignment, executive-level dissatisfaction
Process: C-level or VP engagement from your organization
SLA: Outreach within 24 hours, meeting scheduled within 72 hours

---

## Section 3: Executive Business Review

### EBR Purpose and Format

The Executive Business Review (EBR) is the most powerful at-risk intervention. It brings executive-level attention to the account, demonstrates strategic commitment, and reframes the relationship from vendor to partner.

### EBR Structure (60-90 Minutes)

**Attendees:**
- Customer: Executive sponsor, day-to-day stakeholders
- Vendor: CS executive, CSM, product/engineering representative (if relevant)

**Agenda:**

```
[0:00-0:10] Relationship Context
  - Acknowledge the challenges transparently
  - Express commitment to resolving them
  - Set the tone: this meeting is about their success, not our renewal

[0:10-0:25] Value Delivered (Retrospective)
  - Present quantified outcomes from the partnership
  - Reference specific achievements, not generic metrics
  - Show ROI calculation in customer's own terms
  - Acknowledge gaps honestly

[0:25-0:45] Issue Resolution (Current State)
  - Address each identified concern directly
  - Present the remediation plan with specific timelines
  - Assign named owners for each action item
  - Commit to specific milestones and check-in dates

[0:45-0:60] Strategic Alignment (Forward Look)
  - Understand the customer's evolving business priorities
  - Map product roadmap to their strategic goals
  - Propose an expanded success plan for the next period
  - Discuss expansion opportunities (if appropriate timing)

[0:60-0:75] Customer Feedback
  - Open floor for customer concerns, questions, suggestions
  - Listen more than speak during this section
  - Take notes visibly (signals that feedback is valued)

[0:75-0:90] Commitments and Next Steps
  - Summarize all commitments with owners and dates
  - Schedule follow-up meeting (typically 2-4 weeks)
  - Confirm communication cadence until issues are resolved
```

### EBR Preparation Checklist

- [ ] Customer's current business priorities researched
- [ ] Usage data and health score history reviewed
- [ ] ROI/value summary prepared with specific metrics
- [ ] All open issues cataloged with status and resolution plan
- [ ] Product roadmap items relevant to this customer identified
- [ ] Executive sponsor briefed on account context and strategy
- [ ] Presentation deck created and reviewed internally
- [ ] Meeting logistics confirmed (room/video, attendees, duration)

---

## Section 4: Remediation Plans

### Remediation Plan Structure

A remediation plan is a written commitment to the customer that specifies what will be done, by whom, and by when to address identified issues.

```
REMEDIATION PLAN

Account: _______________
Risk Level: _______________
CSM: _______________
Plan Created: _______________
Review Date: _______________

ROOT CAUSE SUMMARY:
[2-3 sentence description of the primary issues driving risk]

ACTION ITEMS:

| # | Action | Owner | Due Date | Status | Success Criteria |
|---|--------|-------|----------|--------|-----------------|
| 1 | | | | Not Started | |
| 2 | | | | Not Started | |
| 3 | | | | Not Started | |
| 4 | | | | Not Started | |
| 5 | | | | Not Started | |

CHECK-IN CADENCE:
[ ] Weekly [ ] Bi-weekly [ ] Other: _______________

ESCALATION TRIGGER:
If [specific condition], escalate to [person/level]

SUCCESS DEFINITION:
This remediation plan is complete when:
1. _______________
2. _______________
3. _______________

TARGET HEALTH SCORE: Move from ___ to ___ within ___ days
```

### Remediation Plan Best Practices

**Be Specific:** "Improve support response time" is not actionable. "Assign dedicated support engineer with 4-hour response SLA for all Tier 1 tickets" is actionable.

**Be Time-Bound:** Every action item needs a due date. Open-ended commitments signal low commitment.

**Share with the Customer:** Remediation plans should be shared externally (edited for internal-only items). Transparency builds trust.

**Track and Report:** Update the plan weekly. Share progress with the customer at every check-in.

**Close the Loop:** When the remediation is complete, formally close it with the customer. Celebrate the improvement.

### Common Remediation Actions by Root Cause

| Root Cause | Typical Remediation Actions |
|-----------|---------------------------|
| Value perception | QBR with ROI analysis, training sessions, success plan refresh |
| Technical issues | Engineering escalation, dedicated support, bug fix timeline |
| Poor adoption | Customized training, admin enablement, in-app guidance |
| Relationship | Multi-threading strategy, executive engagement, increased touchpoints |
| Feature gaps | Product roadmap alignment, workaround solutions, beta access |
| Support experience | Dedicated support contact, SLA upgrade, escalation path |

---

## Section 5: At-Risk Portfolio Management

### Portfolio Risk Dashboard

CS leaders need visibility across the entire at-risk portfolio:

```
AT-RISK PORTFOLIO SUMMARY

Total At-Risk Accounts: _____ (___% of total accounts)
Total At-Risk ARR: $_____ (___% of total ARR)

By Risk Level:
  Critical: _____ accounts, $_____ ARR
  High:     _____ accounts, $_____ ARR
  Medium:   _____ accounts, $_____ ARR

By Root Cause:
  Value perception:  _____ accounts
  Technical issues:  _____ accounts
  Champion loss:     _____ accounts
  Competitive:       _____ accounts
  Budget/strategic:  _____ accounts

Trend (vs. Last Month):
  New at-risk:       _____ accounts
  Resolved:          _____ accounts
  Net change:        _____
```

### At-Risk Review Meeting

**Frequency:** Weekly (30 minutes)
**Attendees:** CS Manager, CSMs with at-risk accounts
**Agenda:**
1. New at-risk accounts this week (5 min)
2. Critical/high accounts status update (15 min)
3. Accounts resolved this week (5 min)
4. Cross-functional escalation needs (5 min)

---

## Key References

- Gainsight: At-risk management playbooks
- Nick Mehta and Dan Steinman, *Customer Success* (Wiley)
- TSIA: Customer success at-risk management research
- ChurnZero: Risk scoring methodology
- Lincoln Murphy: Customer success risk frameworks

---

## Summary

At-risk management is the structured response to detected churn risk. Risk scoring synthesizes behavioral, relationship, and business signals into an actionable assessment. Escalation protocols ensure that the right level of organizational response matches the severity and strategic importance of the risk. Executive Business Reviews bring the highest-impact intervention to the most critical accounts. Remediation plans convert concern into commitment with specific, time-bound, accountable actions. Portfolio-level risk management gives CS leaders the visibility to allocate resources where they will have the greatest retention impact. The Customer Success Brain manages risk proactively, not reactively—detecting signals early, responding with discipline, and measuring outcomes rigorously.
