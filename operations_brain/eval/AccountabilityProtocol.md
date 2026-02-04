# Operations Accountability Protocol — Governance Framework (Authoritative)

This document defines how the Operations Brain is held accountable for its outputs.
Every recommendation, process design, and operational decision is subject to this protocol.

Accountability without consequences is theater.

---

## CORE ACCOUNTABILITY PRINCIPLES

1. **Every output has an owner.** No orphaned recommendations.
2. **Every commitment has a deadline.** No open-ended promises.
3. **Every metric has a target.** No vanity dashboards.
4. **Every failure has a root cause analysis.** No blame without learning.
5. **Every improvement has measured ROI.** No improvement theater.

---

## SECTION 1: OUTPUT ACCOUNTABILITY

### 1.1 Deliverable Registry

Every operations deliverable must be registered:

```markdown
| Deliverable | Owner | Due Date | Status | Quality Gate |
|-------------|-------|----------|--------|-------------|
| [Name] | [Person] | [Date] | Draft/Review/Approved/Implemented | Pending/Passed/Failed |
```

**Rules:**
- No deliverable exists without a registered owner
- No deliverable ships without a passed quality gate (ReviewChecklist.md)
- No deliverable is "done" until post-implementation validation confirms effectiveness
- Overdue deliverables trigger escalation within 24 hours

### 1.2 Recommendation Tracking

Every recommendation made by the Operations Brain must be tracked to outcome:

```markdown
| Recommendation | Date | Implemented? | Outcome Measured? | Outcome vs. Prediction |
|----------------|------|-------------|-------------------|----------------------|
| [Description] | [Date] | Yes/No/Partial | Yes/No | Better/Worse/As Expected |
```

**Rules:**
- Recommendations not implemented within 30 days require justification
- Implemented recommendations must have outcome measurement within 90 days
- Predictions that miss by >25% trigger analysis of prediction methodology
- Track record is reviewed quarterly to calibrate confidence levels

### 1.3 Decision Log

Every significant operational decision must be logged:

```markdown
| Decision | Date | Decider | Rationale | Data Used | Expected Outcome | Actual Outcome |
|----------|------|---------|-----------|-----------|-----------------|---------------|
```

**Rules:**
- "Significant" = affects >5 people, >$10K, or >1 week of work
- Rationale must reference data, not just intuition
- Expected outcome must be measurable and time-bound
- Actual outcome must be recorded (no decision log entries without follow-up)

---

## SECTION 2: PERFORMANCE ACCOUNTABILITY

### 2.1 Ops Score Accountability

The OpsScore.md defines 8 dimensions. Accountability is enforced as follows:

| Score Range | Accountability Action |
|-------------|----------------------|
| 5 (Excellent) | Document and share best practices |
| 4 (Good) | Continue current trajectory |
| 3 (Adequate) | Improvement plan required within 2 weeks |
| 2 (Poor) | Escalation to leadership, remediation plan within 1 week |
| 1 (Failing) | Emergency intervention, daily standup until resolved |

**Hard Fail Consequences:**
- Process Efficiency <3 → Process redesign initiative launched within 5 business days
- Quality Control <3 → Quality war room, daily reviews until score >= 3
- Reliability <3 → Incident commander assigned, recovery plan within 48 hours

### 2.2 Benchmark Test Accountability

Benchmark test results (BenchmarkTests.md) trigger the following:

| Average Score | Accountability Action |
|---------------|----------------------|
| >= 4.5 | Competency verified, re-test in 6 months |
| 4.0 - 4.4 | Competency adequate, re-test in 3 months |
| 3.0 - 3.9 | Competency gap, targeted training within 30 days, re-test in 60 days |
| < 3.0 | Critical gap, intensive remediation program, supervised operations |

### 2.3 Trend Accountability

Scores are tracked over time. Trends trigger action:

| Trend | Accountability Action |
|-------|----------------------|
| 3 consecutive months improving | Recognize and share approach |
| 3 consecutive months stable | Evaluate if improvement is possible or if ceiling is reached |
| 2 consecutive months declining | Root cause analysis required |
| 3 consecutive months declining | Escalation to leadership with remediation plan |
| Any dimension drops 2+ points in one period | Emergency review |

---

## SECTION 3: COMMITMENT ACCOUNTABILITY

### 3.1 SLA Commitments

When the Operations Brain defines or recommends SLAs:

- SLA targets must be achievable based on current capacity analysis
- SLA compliance must be measured and reported at defined cadence
- SLA breaches must be explained with root cause and corrective action
- Repeated SLA breaches (3+ consecutive periods) trigger SLA redesign

### 3.2 Project Commitments

When the Operations Brain commits to project timelines:

- Estimates must include confidence intervals (e.g., "4-6 weeks, 80% confidence")
- Estimates must identify assumptions and dependencies explicitly
- Variance >20% from estimate triggers analysis of estimation methodology
- Track record of estimate accuracy is maintained and reviewed quarterly

### 3.3 Cost Commitments

When the Operations Brain projects costs or savings:

- Projections must include methodology and assumptions
- Projected savings must be validated with actual savings within 90 days of implementation
- Variance >15% triggers analysis of projection methodology
- "Soft savings" (e.g., time saved) must be converted to dollar equivalents with stated conversion rationale
- Cost avoidance must be distinguished from cost reduction

---

## SECTION 4: FAILURE ACCOUNTABILITY

### 4.1 Incident Accountability

When operational incidents occur:

| Severity | Accountability Requirements |
|----------|-----------------------------|
| Critical (P1) | Post-incident review within 48 hours, executive summary within 24 hours, corrective actions with owners and deadlines |
| Major (P2) | Post-incident review within 1 week, corrective actions documented |
| Minor (P3) | Logged and categorized, reviewed in weekly operations meeting |
| Low (P4) | Logged for trend analysis, reviewed monthly |

**Blameless PIR Protocol:**
1. Focus on system and process failures, not individual mistakes
2. Identify contributing factors at all levels (process, technology, people, environment)
3. Distinguish between root cause and contributing factors
4. Assign corrective actions to system improvements, not individual discipline
5. Share findings openly for organizational learning
6. Track corrective action completion to 100%

### 4.2 Failed Improvement Accountability

When an improvement initiative fails to deliver expected results:

1. **Acknowledge the failure** — No hiding or reframing
2. **Quantify the gap** — Expected vs. actual results with data
3. **Root cause analysis** — Why did the improvement fail?
4. **Extract learning** — What will be done differently next time?
5. **Update methodology** — Incorporate learning into improvement approach
6. **Communicate transparently** — Share the failure and learning with stakeholders

**Rules:**
- Failed improvements are not punished (this kills innovation)
- Failure to analyze failed improvements IS punished (this kills learning)
- Failed improvements that were foreseeable with available data trigger process review
- Repeated failures of the same type indicate systemic methodology issue

### 4.3 Missed Deadline Accountability

When operational deadlines are missed:

1. **Early warning required** — Deadline risk must be communicated as soon as known, not at deadline
2. **Impact assessment** — What downstream processes are affected?
3. **Recovery plan** — New timeline with mitigation for downstream impact
4. **Root cause** — Was the deadline unrealistic, execution flawed, or dependencies unmet?
5. **Prevention** — Update estimation or planning methodology

**Escalation Timeline:**
- 48 hours before deadline: Risk must be flagged if completion is uncertain
- At deadline: If missed, immediate communication to all affected parties
- 24 hours after deadline: Recovery plan must be documented
- 1 week after deadline: Root cause analysis must be complete

---

## SECTION 5: REVIEW CADENCE

### 5.1 Daily Operations Review
- **Duration:** 15 minutes
- **Participants:** Operations team
- **Agenda:** Yesterday's metrics, today's priorities, blockers
- **Accountability:** Blockers must have owners and resolution timelines

### 5.2 Weekly Operations Review
- **Duration:** 60 minutes
- **Participants:** Operations team + stakeholders
- **Agenda:** Weekly KPIs, incident review, improvement pipeline, risk register
- **Accountability:** Action items from previous week reviewed for completion

### 5.3 Monthly Operations Review
- **Duration:** 90 minutes
- **Participants:** Operations leadership + cross-functional partners
- **Agenda:** Monthly scorecard (OpsScore), trend analysis, strategic alignment, resource planning
- **Accountability:** OpsScore must be presented with evidence

### 5.4 Quarterly Business Review
- **Duration:** Half day
- **Participants:** Operations leadership + executive team
- **Agenda:** Quarterly performance, benchmark comparison, strategic initiatives, budget review
- **Accountability:** Full OpsScore with quarter-over-quarter trends, benchmark test results, ROI of improvements

### 5.5 Annual Operations Audit
- **Duration:** Full day
- **Participants:** Operations team + external reviewers (if available)
- **Agenda:** Complete ReviewChecklist for all critical processes, annual benchmarking, strategic planning
- **Accountability:** Audit findings must have remediation plans within 30 days

---

## SECTION 6: ESCALATION FRAMEWORK

### 6.1 Escalation Triggers

| Trigger | Escalation Level | Response Time |
|---------|-----------------|---------------|
| OpsScore hard fail dimension <3 | Operations leadership | 24 hours |
| OpsScore average <3.0 | Executive team | 48 hours |
| Critical incident (P1) | Operations leadership + executives | Immediate |
| Budget variance >20% | Finance + operations leadership | 1 week |
| SLA breach (3+ consecutive) | Service owner + operations leadership | 1 week |
| Benchmark score <3.0 | Operations leadership | 2 weeks |
| Failed improvement with >$50K invested | Executive team | 1 week |
| Regulatory compliance risk | Legal + operations leadership | Immediate |

### 6.2 Escalation Protocol

1. **Document** — Describe the issue with data and impact
2. **Assess** — Determine severity and urgency
3. **Notify** — Alert the appropriate escalation level
4. **Propose** — Present options with recommendations (not just problems)
5. **Decide** — Obtain decision from appropriate authority
6. **Execute** — Implement the decision with tracking
7. **Verify** — Confirm resolution and update stakeholders
8. **Learn** — Conduct post-escalation review

---

## SECTION 7: TRANSPARENCY REQUIREMENTS

### 7.1 What Must Be Visible

- All operational KPIs and their trend direction
- All active incidents and their status
- All improvement initiatives and their ROI
- All vendor scorecards and SLA compliance
- All risk register items and their mitigation status
- All accountability actions and their resolution status

### 7.2 What Must Be Reported

| Report | Audience | Frequency | Content |
|--------|----------|-----------|---------|
| Daily Ops Brief | Operations team | Daily | Key metrics, incidents, blockers |
| Weekly Scorecard | Stakeholders | Weekly | KPIs, SLA compliance, improvements |
| Monthly Dashboard | Leadership | Monthly | OpsScore, trends, risks, costs |
| Quarterly Review | Executives | Quarterly | Strategic alignment, benchmarks, ROI |

### 7.3 Anti-Hiding Rules

- Bad news must be communicated faster than good news
- Metrics must not be cherry-picked (report all dimensions, not just favorable ones)
- Trends must be shown alongside point-in-time numbers
- Targets must be shown alongside actuals
- Confidence intervals must accompany projections

---

## SECTION 8: CONTINUOUS CALIBRATION

### 8.1 Protocol Review

This accountability protocol itself is subject to review:

- Quarterly: Are the thresholds appropriate?
- Quarterly: Are the escalation triggers working?
- Annually: Full protocol review and revision
- Ad-hoc: After any significant operational failure

### 8.2 Calibration Criteria

- **Too Strict:** If >50% of items are in escalation at any time, thresholds may be too aggressive
- **Too Lenient:** If <5% of items ever trigger escalation, thresholds may be too relaxed
- **Right-Sized:** 10-20% of items should be in active improvement at any time

### 8.3 Evolution Log

```markdown
| Date | Change | Rationale | Approved By |
|------|--------|-----------|-------------|
| [Date] | [What changed] | [Why] | [Who approved] |
```

---

## ENFORCEMENT RULE

Accountability is a system, not an attitude.
If the system does not catch problems, the system is broken.
If caught problems do not get fixed, the accountability is theater.
Measure, act, verify, repeat.

---

## END OF ACCOUNTABILITY PROTOCOL
