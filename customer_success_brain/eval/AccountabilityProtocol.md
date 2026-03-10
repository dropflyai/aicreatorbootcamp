# Customer Success Brain — Accountability Protocol (Authoritative)

This document defines how the Customer Success Brain is held accountable for its work.
Accountability is not optional. Every CS decision, intervention, and program must be
traceable, reviewable, and tied to customer outcomes.

If accountability is not enforced, customer success becomes customer service with a nicer title.

---

## PRINCIPLES OF CS ACCOUNTABILITY

1. **Every account has an owner.** No orphan accounts, not even for one day.
2. **Every intervention has a rationale.** No random outreach.
3. **Every churn has a post-mortem.** No silent losses.
4. **Every expansion has attribution.** No accidental revenue claims.
5. **Every health score is validated.** No green-washed portfolios.
6. **Customer outcomes are the measure.** Activity metrics are inputs, not outputs.
7. **Accountability protects the customer.** The goal is better outcomes, not blame assignment.

---

## ACCOUNTABILITY STRUCTURE

### Level 1: Account-Level Accountability

Every managed account must have:

| Element | Requirement | When | Owner |
|---------|-------------|------|-------|
| Assigned CSM | Named individual responsible | At contract signing | CS Operations |
| Success plan | Documented goals, milestones, KPIs | Within 30 days of onboarding | CSM |
| Health score | Updated and validated | Continuously (automated + CSM review) | CSM + CS Ops |
| QBR cadence | Scheduled and completed per segment SLA | Quarterly (Enterprise), Semi-annual (MM) | CSM |
| Renewal plan | Documented 120 days before renewal | 120 days pre-renewal | CSM |
| Risk flag | Raised within 48 hours of detection | On signal detection | CSM |
| Stakeholder map | Current contacts, champions, sponsors | Updated quarterly | CSM |

### Level 2: CSM-Level Accountability

Every CSM is accountable for:

| Metric | Target | Review Cadence | Consequence of Miss |
|--------|--------|---------------|-------------------|
| GRR for portfolio | Segment target (see CSScore) | Monthly | Performance review, coaching plan |
| NRR for portfolio | Segment target (see CSScore) | Monthly | Performance review, coaching plan |
| Onboarding TTFV | Within segment SLA | Per onboarding | Process review if 3+ misses |
| QBR completion rate | >90% | Quarterly | Accountability discussion |
| Health score accuracy | >70% (validated against outcomes) | Quarterly | Model training, process review |
| Activity compliance | Meeting CRM logging requirements | Weekly | Manager conversation |
| Risk response time | Within SLA for risk severity | Per event | Escalation if SLA missed |
| Expansion pipeline | Contribution to expansion target | Monthly | Coaching on commercial skills |

### Level 3: CS Team Accountability

The CS function is accountable for:

| Deliverable | Frequency | Audience | Owner |
|-------------|-----------|----------|-------|
| CS scorecard (all 8 dimensions) | Monthly | VP CS + CRO | CS Operations |
| Retention report (GRR/NRR by segment, cohort) | Monthly | Executive team | CS Operations |
| Churn analysis report | Monthly | Product + Sales + CS | CS Operations |
| Expansion pipeline report | Monthly | CRO + Sales | CS Lead |
| Health score validation report | Quarterly | CS Leadership | CS Operations |
| Customer advocacy report | Quarterly | Marketing + CS | CS Lead |
| NPS/CSAT report | Quarterly | Executive team | CS Operations |
| Cross-functional feedback report | Monthly | Product | CS Lead |

### Level 4: Quarterly CS Accountability

Every quarter:

| Deliverable | Contents | Audience |
|-------------|----------|----------|
| CS strategy review | GRR/NRR trends, program effectiveness, team performance | Executive team |
| OKR retrospective | Objectives hit or missed with root cause analysis | Executive team |
| Customer health portfolio review | Segment-level health trends, at-risk accounts, saves | CS Leadership |
| Churn deep-dive | Systemic patterns, preventable vs unpreventable, competitive losses | Exec + Product |
| Expansion retrospective | What worked, what did not, pipeline accuracy | CS + Sales |
| CS Ops effectiveness | Automation impact, health score accuracy, process adoption | CS Leadership |

---

## CHURN ACCOUNTABILITY PROTOCOL

### Every Churn Event Requires:

```
## Churn Record

### Account Information
- Account Name: [Name]
- ARR at Churn: [$Amount]
- Contract Start Date: [YYYY-MM-DD]
- Churn Date: [YYYY-MM-DD]
- Customer Lifetime: [X months]
- Total Revenue from Account: [$Amount]

### Churn Classification
- Type: [Voluntary / Involuntary]
- Category: [Product gap / Adoption failure / Champion loss / Budget/Reorg / Competitive / Support failure / Misaligned expectations / Other]
- Preventable: [Yes / No / Partially]
- Predicted: [Yes (health score flagged) / No (surprise churn)]

### CSM Assigned
- Name: [CSM Name]
- Time on Account: [X months]

### Timeline of Events
- [Date]: First risk signal (or "No signal detected")
- [Date]: Risk flagged internally
- [Date]: Intervention initiated
- [Date]: Save attempt made
- [Date]: Customer confirmed churn
- [Date]: Contract ended

### Root Cause Analysis
- Customer's stated reason: [In their words]
- Our assessment: [Our analysis]
- Was the health score accurate in the 90 days before churn?
- Were risk signals detected and acted on?
- Was the save attempt appropriate and timely?

### Preventability Assessment
- What could we have done differently?
- At what point was this churn inevitable?
- Was there a systemic failure (not just account-specific)?

### Action Items
1. [Specific action to prevent similar churn, with owner and deadline]
2. [Specific action]

### Distribution
- Shared with: CS team, Product, Sales, [other teams as relevant]
```

### Churn Accountability Rules

1. **Every churn >$10K ARR requires a written post-mortem within 10 business days**
2. **Every churn >$50K ARR requires a post-mortem meeting with CS leadership**
3. **Every churn >$100K ARR requires a post-mortem meeting with executive team**
4. **Surprise churn (no prior risk flag) requires ADDITIONAL process failure investigation**
5. **3+ surprise churns in a quarter triggers a systemic CS process review**
6. **Churn patterns are reviewed monthly for systemic trends**

### Surprise Churn Investigation

When a customer churns without any prior risk flag:

```
## Surprise Churn Investigation

### What Happened
- Account: [Name], ARR: [$Amount]
- Health score at time of churn notice: [Score / Color]
- Last CSM interaction: [Date and type]
- Last QBR: [Date]

### Signal Analysis
- Were there usage signals we missed? [Analyze]
- Were there engagement signals we missed? [Analyze]
- Were there sentiment signals we missed? [Analyze]
- Were there external signals we missed? [Analyze]

### Health Score Failure
- Which component(s) should have flagged risk?
- What signal would have caught this?
- Should this signal be added to the health score?

### Process Failure
- Was the check-in cadence appropriate?
- Was the QBR cadence followed?
- Was the stakeholder map current?
- Were there unresolved support issues?

### Corrective Actions
1. [Health score model change]
2. [Process change]
3. [Training or enablement need]

### Verification
- How will we verify this fix prevents similar misses?
- When will we validate? [Date]
```

---

## RENEWAL ACCOUNTABILITY PROTOCOL

### Renewal Management Timeline

| Milestone | Days Before Renewal | Action | Owner |
|-----------|-------------------|--------|-------|
| T-180 | 180 days | Flag account for renewal prep | CS Operations |
| T-120 | 120 days | Health assessment and risk classification | CSM |
| T-120 | 120 days | Success plan review (value delivered, goals met?) | CSM |
| T-90 | 90 days | Renewal conversation initiated | CSM |
| T-90 | 90 days | Expansion opportunity assessed | CSM |
| T-60 | 60 days | Renewal proposal or contract sent | CSM + Sales |
| T-60 | 60 days | At-risk renewals escalated to management | CSM Manager |
| T-30 | 30 days | Final decision expected | CSM |
| T-30 | 30 days | Unresolved renewals escalated to VP | VP CS |
| T-14 | 14 days | Auto-renew confirmed or manual action required | CS Operations |
| T-0 | 0 days | Renewal completed or churn processed | CS Operations |

### Renewal Accountability Rules

1. **No renewal should be a surprise (either direction).** Outcome must be predicted at T-90.
2. **Every at-risk renewal must have a save plan by T-90.**
3. **Every renewal with expansion potential must have a proposal by T-60.**
4. **Renewal forecast accuracy must be >85%.** If lower, forecasting process is broken.
5. **Late renewals (processed after expiration) require a process review.**

---

## EXPANSION ACCOUNTABILITY PROTOCOL

### Expansion Attribution Rules

| Scenario | Attribution |
|----------|------------|
| CSM identified the opportunity and ran the process | CS gets full attribution |
| CSM identified the opportunity, Sales closed | Shared attribution (CS sourced, Sales closed) |
| Sales identified the opportunity during upsell campaign | Sales gets attribution, CS gets assist |
| Expansion is automatic (usage-based billing) | Product-led, CS gets retention attribution |

### Expansion Tracking Requirements

| Element | Requirement |
|---------|-------------|
| Pipeline visibility | All expansion opportunities logged in CRM |
| Stage tracking | Identified -> Qualified -> Proposed -> Closed |
| Revenue attribution | Clear attribution per the rules above |
| Win/loss analysis | Why did expansion close or not close? |
| Impact on health | Verify expansion did not hurt customer satisfaction |

### Expansion Guardrails

- **Never expand an at-risk account** without resolving the risk first
- **Never expand without documented value** from the existing product
- **Never pressure a customer** into expansion they do not need
- **Always verify post-expansion satisfaction** within 30 days
- **Track NPS before and after expansion** to ensure no relationship damage

---

## HEALTH SCORE ACCOUNTABILITY

### Health Score Audit Protocol

Monthly:
1. Pull all accounts where health score changed significantly (2+ points)
2. Verify the change reflects reality (not a data glitch)
3. For accounts that moved to red: was intervention initiated within SLA?
4. For accounts that moved to green: was the improvement real and sustained?

Quarterly:
1. Pull all accounts that churned in the prior quarter
2. What was their health score 30, 60, 90 days before churn?
3. Calculate: what % of churn was predicted by health score?
4. Calculate: what % of green accounts actually churned? (false negatives)
5. Calculate: what % of red accounts are still active? (false positives)
6. Adjust model weights based on findings

### Health Score Manipulation Prevention

| Anti-Pattern | Description | Detection | Response |
|-------------|-------------|-----------|----------|
| Green-washing | CSM overrides score to green without justification | Override audit | Require manager approval for overrides |
| Activity padding | CSM logs superficial activities to improve engagement score | Activity quality review | Train on meaningful engagement |
| Data cherry-picking | Highlighting metrics that support green while ignoring red signals | Multi-signal validation | Require all signal categories to be reviewed |
| Score ignoring | CSM does not look at or act on health scores | Activity tracking | Include health score review in weekly process |

---

## CSM PERFORMANCE ACCOUNTABILITY

### CSM Performance Review Framework

| Category | Weight | Metrics |
|----------|--------|---------|
| Retention | 35% | GRR for portfolio, logo retention |
| Expansion | 25% | NRR for portfolio, expansion pipeline |
| Customer satisfaction | 20% | NPS, CSAT, customer feedback |
| Process compliance | 10% | QBR completion, CRM hygiene, risk response SLA |
| Cross-functional impact | 10% | Product feedback, advocacy generation, knowledge sharing |

### Performance Tiers

| Tier | Criteria | Actions |
|------|----------|---------|
| Exceeds | GRR and NRR above target, NPS above benchmark | Recognition, expanded portfolio, mentor role |
| Meets | GRR and NRR at target, NPS at benchmark | Continue development, maintain |
| Below | GRR or NRR below target for 1 quarter | Coaching plan, weekly manager check-ins |
| Critical | GRR or NRR below target for 2+ quarters | Performance improvement plan |

### Performance Review Cadence

| Review Type | Frequency | Participants | Focus |
|-------------|-----------|-------------|-------|
| 1:1 with manager | Weekly | CSM + Manager | Account review, coaching, blockers |
| Portfolio review | Monthly | CSM + Manager | Metrics, trends, risk accounts |
| Performance review | Quarterly | CSM + Manager + VP | Performance against targets, development |
| Calibration | Semi-annual | All CS Managers + VP | Cross-team calibration, consistency |

---

## ACCOUNTABILITY CADENCES

### Daily (Async)
- Health score alerts monitored and responded to within SLA
- Customer communications responded to within SLA
- CRM updated with customer interactions

### Weekly (30-Minute Sync per CSM)
- Portfolio health review (any changes in red/yellow?)
- At-risk account updates
- Upcoming renewals status
- Expansion pipeline review
- Blockers and support needs

### Monthly (60-Minute CS Team)
- CS scorecard review
- Churn analysis and learnings
- Expansion wins and misses
- Process compliance review
- Cross-functional feedback summary
- Best practices sharing

### Quarterly (Half-Day Session)
- CS strategy review and planning
- OKR setting and retrospective
- Health score model validation
- Team performance calibration
- Customer advisory board readout
- Budget and resource planning

---

## ESCALATION PROTOCOL

### When to Escalate

| Trigger | Escalation Level | Timeline |
|---------|-----------------|----------|
| Customer mentions competitor or evaluation | CSM Manager | Within 24 hours |
| Executive sponsor departure | CSM Manager + VP | Within 24 hours |
| Usage drops >40% in 2 weeks | CSM Manager | Within 48 hours |
| Customer escalation to VP+ level | VP CS + CRO | Immediate |
| Renewal at risk >$100K ARR | VP CS | Within 48 hours |
| Critical bug affecting customer operations | VP CS + Engineering | Immediate |
| Customer threatens legal action | VP CS + Legal | Immediate |
| CSM has >5 red accounts simultaneously | CSM Manager | Within 1 week |
| NPS drops >10 points quarter-over-quarter | VP CS | Within 1 week |

### Escalation Format

```
## CS Escalation

### Trigger: [What triggered the escalation]
### Account: [Name, ARR, Segment]
### Severity: [Critical / High / Medium]
### Date: [YYYY-MM-DD]
### CSM: [Name]

### Situation
[What is happening, with data and timeline]

### Customer Impact
[How the customer is affected]

### Revenue at Risk
[$Amount and contract details]

### Actions Taken So Far
[What has been done]

### Recommended Next Step
[What we propose]

### Decision Needed
[What decision is needed from the escalation recipient]

### Timeline
[How quickly we need to act]
```

---

## ACCOUNTABILITY ANTI-PATTERNS

These behaviors undermine CS accountability and must be called out:

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Activity theater | Logging calls and emails without meaningful outcomes | Measure outcomes, not activities |
| Green-washing | Overriding health scores without justification | Require documented justification for overrides |
| Blame shifting | "Product broke it" without providing specifics | Own the outcome, escalate with data |
| Renewal sandbagging | Marking renewals at-risk to look good when saved | Track forecasting accuracy |
| Expansion cherry-picking | Only pursuing easy expansions | Measure expansion across full portfolio |
| Post-mortem avoidance | Skipping churn analysis for uncomfortable churns | Mandatory post-mortems, no exceptions |
| Relationship hoarding | CSM gatekeeps customer relationships | Multi-threaded relationships required |
| Data avoidance | Not checking health scores or usage data | Include in weekly review process |

---

## ACCOUNTABILITY REWARDS

Accountability is not just about catching failures. Recognize excellence:

| Achievement | Recognition |
|-------------|------------|
| Highest GRR portfolio for the quarter | Performance spotlight |
| Largest expansion closed by CSM-sourced opportunity | Revenue impact recognition |
| Best churn post-mortem (most actionable learnings) | Process excellence recognition |
| Customer-nominated CSM (customer explicitly credits CSM) | Customer advocacy award |
| Proactive risk identification that saved a large account | Risk prevention recognition |
| Cross-functional impact (CS feedback directly influenced product change) | Collaboration award |
| Highest NPS in portfolio | Customer satisfaction recognition |

---

## CONTINUOUS IMPROVEMENT PROTOCOL

### Monthly Improvement Cycle

1. **Collect:** Gather data from churn post-mortems, expansion wins/losses, NPS feedback, CSM observations
2. **Analyze:** Identify patterns and systemic issues
3. **Propose:** Document proposed process, tool, or strategy changes
4. **Validate:** Test changes with a subset before broad rollout
5. **Implement:** Roll out changes with training and communication
6. **Verify:** Measure whether changes improved outcomes

### Quarterly Process Audit

- [ ] All churn post-mortems completed?
- [ ] Health score validated against outcomes?
- [ ] Renewal forecast accuracy measured?
- [ ] CSM performance reviews conducted?
- [ ] Cross-functional feedback loop functioning?
- [ ] Playbooks updated based on new learnings?
- [ ] CS scorecard reflecting reality?

---

**Accountability is the foundation of customer trust.**
**Without it, customer success is customer hope. With it, customer success compounds.**
