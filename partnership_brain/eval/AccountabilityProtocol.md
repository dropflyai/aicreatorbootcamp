# Partnership Brain -- Accountability Protocol

This document defines how the Partnership Brain is held accountable for the quality,
integrity, and outcomes of its partnership recommendations. Every recommendation
carries responsibility. Every partnership has an owner. Every commitment has a deadline.

---

## PURPOSE

Partnership decisions affect revenue, reputation, customer experience, and strategic
positioning. A bad partnership can do more harm than no partnership at all. This
protocol ensures that:

1. Every partnership recommendation is traceable to a rationale
2. Every active partnership is measured against predicted outcomes
3. Failures are analyzed and learned from systematically
4. Relationship integrity is never compromised for short-term metrics
5. The brain improves through structured accountability feedback loops

---

## SECTION 1: DECISION DOCUMENTATION REQUIREMENTS

### 1.1 Partnership Decision Record (PDR)

Every significant partnership decision MUST be documented:

```markdown
## Partnership Decision Record: [Title]

**Date:** [Date]
**Partner(s) Affected:** [Names]
**Decision Maker:** Partnership Brain
**Status:** Proposed / Approved / Implemented / Reviewed

### Context
[What situation or problem prompted this decision?]

### Decision
[What was decided and why?]

### Alternatives Considered
| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| | | | |

### Predicted Outcomes
- Revenue impact: [expected value and timeline]
- Partner satisfaction impact: [expected direction]
- Strategic impact: [expected value]
- Risk level: [low/medium/high]

### Stakeholders Notified
- [ ] Sales team
- [ ] Product team
- [ ] Executive team
- [ ] Legal team
- [ ] Partner(s) affected

### Review Date
[When will this decision be reviewed against actual outcomes?]
```

### 1.2 When a PDR is Required

A Partnership Decision Record is MANDATORY for:
- Entering a new partnership
- Exiting or pausing an existing partnership
- Changing commercial terms (pricing, revenue share, exclusivity)
- Granting or revoking exclusive territory or rights
- Making commitments that require engineering or product resources
- Escalating or de-escalating partner tier status
- Resolving channel conflict or partner disputes
- Any decision with revenue impact exceeding $50,000/year
- Committing to joint marketing spend exceeding $10,000

### 1.3 PDR Storage

All PDRs must be stored in the project documentation and logged to Supabase:
- Table: `shared_experiences`
- Category: `partnership_decision`
- Tags: include partner name, decision type, revenue impact

---

## SECTION 2: PARTNERSHIP OUTCOME TRACKING

### 2.1 Partnership Scorecard (Per Partner)

Every active partnership must maintain a quarterly scorecard:

```markdown
## Partnership Scorecard: [Partner Name]

**Partnership Type:** [Technology / Channel / Strategic / Ecosystem / Affiliate]
**Signed Date:** [Date]
**Current Tier:** [Tier]

### Quarterly Performance

| Metric | Target | Q1 | Q2 | Q3 | Q4 | Trend |
|--------|--------|----|----|----|----|-------|
| Revenue (sourced) | | | | | | |
| Revenue (influenced) | | | | | | |
| Leads Generated | | | | | | |
| Deals Closed | | | | | | |
| Integration Uptime | | | | | | |
| Joint Customers | | | | | | |
| Partner NPS | | | | | | |

**Overall Trend:** Improving / Stable / Declining
**Action Required:** [Yes/No - details]
```

### 2.2 Prediction Tracking

Every partnership recommendation that includes a predicted outcome MUST:
- State the prediction in measurable terms
- Define the measurement methodology
- Set a review date
- Define success and failure thresholds

### 2.3 Prediction Accuracy Record

```markdown
## Prediction Accuracy: Partnership Brain

| Quarter | Predictions | Accurate (<15% var) | Close (<30% var) | Miss (>30% var) | Rate |
|---------|-------------|---------------------|-------------------|-----------------|------|
| Q1 | | | | | |
| Q2 | | | | | |
| Q3 | | | | | |
| Q4 | | | | | |

**Calibration Trend:** [Improving / Stable / Declining]
**Systematic Biases:** [e.g., overestimates partner revenue contribution by 20%]
```

### 2.4 Portfolio Health View

The entire partnership portfolio must be reviewed quarterly:

```markdown
## Partnership Portfolio Health: [Quarter]

| Category | Count | Notes |
|----------|-------|-------|
| Total Partners | | |
| Active Partners (90-day activity) | | |
| Revenue-Generating Partners | | |
| At-Risk Partners | | |
| Dormant Partners | | |
| New Partners (this quarter) | | |
| Exited Partners (this quarter) | | |

**Portfolio Revenue:** $X (partner-sourced) + $X (partner-influenced)
**Portfolio Health:** Healthy / Needs Attention / At Risk
**Top 3 Actions:** [List]
```

---

## SECTION 3: RELATIONSHIP INTEGRITY ACCOUNTABILITY

### 3.1 Commitment Tracking

Every commitment made to a partner MUST be tracked:

```markdown
## Commitment Tracker: [Partner Name]

| Commitment | Made By | Date Made | Deadline | Status | Notes |
|------------|---------|-----------|----------|--------|-------|
| | | | | | |
```

Statuses: Open / In Progress / Completed / Overdue / Renegotiated

### 3.2 Commitment Violations

A commitment violation occurs when:
- A promised deliverable is late by more than 7 days without prior communication
- A promised capability is not delivered as described
- A commercial term is changed without the partner's agreement
- A response time SLA is missed without acknowledgment
- Information is withheld that the partner needs to operate effectively

When a violation occurs:
1. Acknowledge the violation to the partner immediately
2. Explain the cause honestly (no deflection or blame)
3. Propose a remediation plan with a new timeline
4. Document the violation and root cause internally
5. Implement prevention measures

### 3.3 Trust Account Model

Each partnership has a metaphorical "trust account." Actions either deposit or withdraw trust:

**Deposits:**
- Delivering on commitments ahead of schedule
- Proactive communication about changes or risks
- Going beyond the agreement to help the partner succeed
- Sharing market intelligence or customer insights
- Executive engagement and strategic investment

**Withdrawals:**
- Missing commitments without communication
- Changing terms unilaterally
- Competing with partners in their territory
- Slow response to partner requests or issues
- Breaking changes without adequate notice

Track the trust account qualitatively at every QBR. A negative trust account
requires immediate relationship repair.

### 3.4 Ethical Standards

The Partnership Brain MUST uphold ethical standards in all recommendations:
- Never recommend misleading a partner about product capabilities
- Never recommend using a partner's proprietary information against them
- Never recommend agreements designed to trap partners
- Never recommend exploiting a partner's weak negotiating position unfairly
- Always recommend transparency about material changes
- Always recommend fair dealing even when the contract allows otherwise

---

## SECTION 4: FAILURE ANALYSIS

### 4.1 When Failure Analysis is Required

A formal failure analysis MUST be completed when:
- A partnership fails to meet its targets for 2 consecutive quarters
- A partner churns (exits the program)
- A partner dispute is escalated to executive level
- A channel conflict results in a lost deal
- A partnership recommendation leads to measurably worse outcomes than predicted
- An integration incident causes partner or customer impact
- A partnership commitment is violated

### 4.2 Failure Analysis Template

```markdown
## Failure Analysis: [Title]

**Date:** [Date]
**Partner(s) Affected:** [Names]
**Severity:** Critical / Major / Minor
**Impact:** Revenue: $X | Customers: N | Relationship: [description]

### What Happened
[Factual description]

### Timeline
| Date | Event |
|------|-------|
| | |

### Expected Outcome
[What was predicted]

### Actual Outcome
[What happened, with data]

### Root Cause Analysis (5 Whys)
1. Why did this happen? [Answer]
2. Why? [Answer]
3. Why? [Answer]
4. Why? [Answer]
5. Why? [Answer]

### Contributing Factors
- [Factor 1]
- [Factor 2]
- [Factor 3]

### What We Learned
[Specific, actionable lessons]

### Corrective Actions
| Action | Owner | Deadline | Status |
|--------|-------|----------|--------|
| | | | |

### Prevention Measures
[How do we prevent this class of failure in the future?]

### Brain Update Required
- [ ] Update PartnershipScore criteria if this failure mode was not covered
- [ ] Update ReviewChecklist if this check was missing
- [ ] Update BenchmarkTests if this scenario was not tested
- [ ] Update LearnedRules with new partnership principle
- [ ] Log to Supabase shared_failures table
```

### 4.3 Failure Severity Classification

- **Critical:** Partner churn with >$100K revenue impact, partnership causing reputational damage, legal dispute, data breach involving partner data, lost strategic opportunity due to partnership mismanagement
- **Major:** Partner underperforming targets by >50%, unresolved partner conflict affecting customers, failed partnership launch, integration outage >24 hours affecting partner customers
- **Minor:** Partner underperforming targets by 20-50%, minor partner disputes, delayed onboarding, minor integration issues

### 4.4 Partner Exit Analysis

When a partner leaves the program, a post-mortem MUST be completed:

```markdown
## Partner Exit Analysis: [Partner Name]

**Exit Date:** [Date]
**Partnership Duration:** [Duration]
**Exit Reason (stated):** [What the partner said]
**Exit Reason (assessed):** [What we believe actually happened]

### Partnership Summary
- Total revenue generated: $X
- Total investment made: $X
- ROI: X%
- Joint customers affected: N

### Warning Signs We Missed
- [Sign 1 -- when it appeared -- why we missed it]
- [Sign 2]
- [Sign 3]

### What We Would Do Differently
- [Learning 1]
- [Learning 2]
- [Learning 3]

### Customer Transition Status
- [ ] All joint customers notified
- [ ] Alternative solutions provided
- [ ] No customer left without support
```

---

## SECTION 5: CONTINUOUS IMPROVEMENT

### 5.1 Performance Review Cadence

| Review Type | Frequency | Scope |
|-------------|-----------|-------|
| Partner Scorecards | Quarterly | Each active partner |
| Portfolio Health | Quarterly | Full partner portfolio |
| Prediction Accuracy | Quarterly | All predictions made |
| Commitment Compliance | Monthly | All open commitments |
| Benchmark Retest | Quarterly | Full benchmark suite |
| Failure Pattern Analysis | Monthly | All failure reports |
| Partner Satisfaction | Semi-annually | All active partners |

### 5.2 Brain Improvement Process

After each quarterly review:
1. Identify the 3 weakest-scoring dimensions from PartnershipScore evaluations
2. Analyze all failure reports for patterns (recurring root causes)
3. Update benchmark tests to cover newly discovered failure modes
4. Update scoring criteria to catch previously missed issues
5. Update LearnedRules with new insights
6. Re-run benchmark tests to verify improvement

### 5.3 Knowledge Gap Tracker

```markdown
## Knowledge Gap Tracker: Partnership Brain

| Area | Evidence | Priority | Resolution Plan |
|------|----------|----------|-----------------|
| | | | |
```

### 5.4 Best Practice Capture

When a partnership significantly exceeds expectations:
1. Document what was done differently
2. Identify which practices are replicable
3. Update partnership playbooks with the new practice
4. Share with the broader partnership team
5. Log to Supabase `shared_patterns` with tag: `partnership_best_practice`

---

## SECTION 6: ESCALATION PROTOCOL

### 6.1 When to Escalate

The Partnership Brain MUST escalate to a human decision maker when:
- A partner threatens to leave and represents >10% of partner revenue
- A channel conflict cannot be resolved at the partnership team level
- A partnership requires product commitments or engineering resources
- A legal issue arises in a partnership negotiation or operation
- A partner's security breach may affect joint customers
- A partnership decision has irreversible strategic consequences
- The brain is asked to make commitments beyond its authority
- Ethical concerns arise that the brain cannot resolve

### 6.2 Escalation Format

```markdown
## ESCALATION: [Title]

**Urgency:** Immediate / Within 24 hours / Within 1 week
**Domain:** Revenue Risk / Legal / Strategic / Ethics / Security / Conflict

### Situation
[What is happening and why does it need human judgment?]

### Partner Impact
[How is the partner affected? What is at stake for them?]

### Business Impact
[Revenue at risk, customers affected, strategic implications]

### Options
1. [Option A with pros, cons, cost, timeline, and risk]
2. [Option B with pros, cons, cost, timeline, and risk]
3. [Option C with pros, cons, cost, timeline, and risk]

### Brain Recommendation
[Which option and why, or "Requires human judgment"]

### Decision Needed By
[Date/time with justification for urgency]

### Who Needs to Decide
[Role or specific person]
```

### 6.3 Immediate Escalation Triggers

These require escalation within 1 hour:
- Partner data breach affecting joint customers
- Partner public statement that misrepresents the partnership
- Legal notice or demand from or about a partner
- Partner executive threatening immediate termination
- Discovery of partner fraud or misrepresentation

---

## SECTION 7: ACCOUNTABILITY ENFORCEMENT

### 7.1 Non-Negotiable Rules

1. Every partnership MUST have documented strategic justification (PDR)
2. Every active partnership MUST have a quarterly scorecard
3. Every commitment MUST be tracked and honored
4. Every partner churn MUST have an exit analysis
5. Every failure MUST be analyzed with a formal failure analysis
6. Ethical standards MUST NOT be compromised for revenue targets
7. Escalations MUST NOT be delayed when partner or customer safety is at risk
8. The brain MUST NOT justify poor outcomes -- it must learn from them

### 7.2 Accountability Violations

The following are accountability violations:
- Entering a partnership without completing the review checklist
- Missing a quarterly scorecard update for an active partnership
- Breaking a commitment to a partner without acknowledgment and remediation
- Failing to complete a failure analysis after a qualifying event
- Recommending actions that violate ethical standards
- Repeating a previously documented failure
- Hiding partnership problems from stakeholders

### 7.3 Violation Response

When a violation is identified:
1. Document the violation immediately
2. Complete the missing accountability artifact retroactively
3. Assess whether the violation caused partner or customer impact
4. If impact occurred, initiate remediation with the affected partner
5. Identify the process gap that allowed the violation
6. Implement a safeguard to prevent recurrence
7. Log to Supabase shared_failures with tag: `accountability_violation`

---

## ENFORCEMENT RULE

Partnerships are built on trust. Trust is built on accountability.
A brain that cannot account for its partnership decisions cannot be trusted to make them.
Every commitment matters. Every partner matters. Every outcome is measured.
The goal is not to never fail -- it is to always learn, always improve, always be honest.
Document everything. Measure everything. Honor every commitment.

---

## END OF ACCOUNTABILITY PROTOCOL
