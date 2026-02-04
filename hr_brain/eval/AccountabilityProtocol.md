# HR Accountability Protocol — Governance and Oversight (Authoritative)

This document defines how HR Brain decisions are tracked, reviewed, and
held accountable. HR decisions affect people's careers and livelihoods.
Every recommendation must be traceable, every outcome must be measured,
and every failure must be analyzed.

If accountability is not enforced, people will be harmed.

---

## ACCOUNTABILITY PRINCIPLES

1. **Every recommendation must be traceable** — Who made it, when, why, and what happened
2. **Every decision affecting employees must be documented** — No undocumented employment decisions
3. **Every failure must be analyzed** — No HR failure is ignored or rationalized
4. **Every metric must be honest** — Vanity metrics are forbidden; only actionable metrics count
5. **Every process must be equitable** — Outcomes must be consistent across demographics
6. **Confidentiality must be maintained** — Employee information is protected at all times

---

## DECISION TRACKING

### HR Decision Log Format

Every significant HR decision must be logged:

```markdown
## Decision: [Title]

**Date:** [YYYY-MM-DD]
**Decision Type:** [Hiring / Compensation / Performance / Policy / Org Design / Termination / Other]
**Decision Maker:** [Name/Brain]
**Employees Affected:** [Number and description, no PII in shared logs]
**Context:** [What situation prompted this decision]

**Options Considered:**
1. [Option A] — [Pros/Cons]
2. [Option B] — [Pros/Cons]
3. [Option C] — [Pros/Cons]

**Decision:** [What was decided]
**Rationale:** [Why this option was chosen]
**Legal Review:** [Completed / Not Required / Pending]
**Expected Outcome:** [What we expect to happen]
**Success Metrics:** [How we will measure success]
**Equity Check:** [Was adverse impact/equity analysis conducted?]
**Review Date:** [When to evaluate the decision]
**Reversibility:** [Easy/Moderate/Difficult to reverse]
```

### What Requires a Full Decision Log
- Hiring decisions for senior roles (director+)
- Compensation structure changes affecting multiple employees
- Performance management process changes
- Organizational restructuring or reductions in force
- Policy changes affecting all employees
- Termination decisions
- Investigation outcomes
- DEI program design or changes
- Benefits changes

### What Requires a Brief Log
- Individual hiring decisions (standard roles)
- Individual compensation adjustments (within band)
- Routine performance reviews
- Standard policy application
- Training program delivery

---

## REVIEW CADENCE

### Weekly Review
**Who:** HR lead
**Duration:** 30 minutes
**What to review:**
- Open positions and hiring pipeline health
- Employee relations matters in progress
- Upcoming deadlines (reviews, compliance filings, leave expirations)
- Action items from previous week
- Employee sentiment signals (Slack, pulse surveys, manager reports)

**Output:** Weekly status update logged to memory

### Monthly Review
**Who:** HR team + department leads
**Duration:** 60 minutes
**What to review:**
- HRScore.md evaluation across all 8 dimensions
- Benchmark scenario performance (run 2-3 scenarios)
- Hiring metrics (time-to-fill, acceptance rate, pipeline diversity)
- Turnover analysis (overall, regrettable, by department and demographic)
- Employee relations case summary (volume, types, resolution)
- Compensation exceptions and off-cycle adjustments
- Compliance calendar (upcoming requirements)
- Training completion rates

**Output:** Monthly report with scores, trends, and action items

### Quarterly Review
**Who:** HR team + leadership
**Duration:** 90 minutes
**What to review:**
- Full HRScore.md evaluation with trend analysis
- Full benchmark test suite (all 16 scenarios)
- Pay equity analysis refresh
- Engagement pulse results
- DEI metrics and progress against goals
- Organizational effectiveness metrics
- Employee development program effectiveness
- Succession planning status
- Budget utilization

**Output:** Quarterly report with strategic recommendations

### Annual Review
**Who:** HR team + executive leadership + board (if applicable)
**Duration:** Half-day
**What to review:**
- Year-over-year HRScore.md trends
- Annual engagement survey deep dive
- Comprehensive pay equity audit
- DEI annual report
- Turnover analysis and cost-of-turnover calculation
- Benefits benchmarking and utilization analysis
- Compliance audit results
- Manager effectiveness trends
- Workforce planning for next year
- HR team development and capability gaps
- Budget proposal for next year

**Output:** Annual HR report and strategic plan

---

## FAILURE ANALYSIS PROTOCOL

### Failure Categories

| Category | Definition | Required Response |
|----------|-----------|-------------------|
| Critical | Legal violation, discrimination complaint, safety incident, data breach | Incident report within 24 hours |
| Major | Bad hire in leadership role, investigation mishandled, policy failure, significant retention event | Post-mortem within 48 hours |
| Moderate | Process breakdown, missed deadline, poor candidate experience, inconsistent policy application | Analysis within 1 week |
| Minor | Documentation gaps, training delay, communication misstep | Fix and log within 2 weeks |

### Post-Mortem Template

```markdown
## Post-Mortem: [Incident Title]

**Date of Incident:** [YYYY-MM-DD]
**Severity:** [Critical/Major/Moderate/Minor]
**Employees Affected:** [Number and impact description]
**Duration:** [How long the issue persisted]

### Timeline
- [Date/Time] — [What happened]
- [Date/Time] — [What happened]
- [Date/Time] — [Resolution]

### Root Cause
[Process, knowledge, or system failure analysis]

### Contributing Factors
1. [Factor 1]
2. [Factor 2]

### Impact Assessment
- **Employee Impact:** [How employees were affected]
- **Legal Exposure:** [Any legal risk created]
- **Financial Impact:** [Costs incurred or potential]
- **Reputational Impact:** [Internal and/or external]

### What Went Well
1. [Positive element]
2. [Positive element]

### What Went Poorly
1. [Problem]
2. [Problem]

### Action Items
| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 1 | [Action] | [Name] | [Date] | Open |
| 2 | [Action] | [Name] | [Date] | Open |

### Equity Review
[Did this failure disproportionately affect any demographic group?]

### Prevention Measures
[What will prevent this class of failure from recurring]

### Follow-Up Review Date
[When to verify action items are complete]
```

### Failure Escalation Rules
- Critical failures: Notify CEO and legal counsel within 2 hours. External counsel if needed.
- Major failures: Notify HR lead and relevant department head within 4 hours.
- Moderate failures: Log and assign within 24 hours. Analysis within 1 week.
- Minor failures: Fix within 2 weeks. Log for pattern analysis.

### Failure Pattern Analysis
- Review failure logs monthly for recurring patterns
- If same failure type occurs 2+ times, escalate to systemic issue
- Systemic issues require a process change, not just a fix
- Track failure rate by category and dimension
- Conduct equity analysis on failures (are certain groups disproportionately affected?)

---

## EQUITY AND FAIRNESS MONITORING

### Mandatory Equity Checks
The following analyses must be conducted on a regular cadence:

| Analysis | Cadence | Owner |
|----------|---------|-------|
| Pay equity (gender, race) | Semi-annual | Compensation |
| Hiring rate parity | Quarterly | Talent Acquisition |
| Promotion rate parity | Semi-annual | People Analytics |
| Termination rate parity | Quarterly | Employee Relations |
| Performance rating distribution | After each cycle | People Analytics |
| Engagement score parity | After each survey | People Analytics |
| Disciplinary action parity | Quarterly | Employee Relations |
| Training access parity | Semi-annual | Learning & Development |

### Equity Alert Thresholds
| Metric | Alert Threshold | Required Action |
|--------|----------------|-----------------|
| Pay gap (unexplained) | > 5% | Immediate investigation and remediation plan |
| Hiring rate gap | > 20% (4/5ths rule) | Process review and adverse impact mitigation |
| Promotion rate gap | > 15% | Manager calibration review and process audit |
| Termination rate gap | > 2x | Investigation of root cause and process review |
| Rating distribution gap | > 0.5 points mean difference | Calibration review and bias training |
| Engagement gap | > 10 points | Focus groups and targeted interventions |

### Equity Review Process
When an alert threshold is triggered:
1. Verify data accuracy (is the gap real or data error?)
2. Investigate root cause (systemic, individual manager, or situational)
3. Determine if legal review is needed
4. Design remediation plan with specific actions and timeline
5. Implement and monitor remediation
6. Report results to leadership
7. Document the entire process for compliance

---

## CONFIDENTIALITY PROTOCOL

### Data Classification
| Classification | Examples | Access |
|----------------|----------|--------|
| Restricted | Medical records, investigation files, salary details | Need-to-know only |
| Confidential | Performance reviews, disciplinary records, personal demographics | HR team + direct manager |
| Internal | Org charts, headcount data, policy documents | All employees |
| Public | Job postings, company benefits overview, public policies | Anyone |

### Confidentiality Rules
- Employee medical information is never shared without explicit consent or legal requirement
- Investigation details are shared only with parties who need to know
- Salary information is shared per the company's transparency policy (never without authorization)
- Performance reviews are shared only with the employee and their management chain
- Employee complaints are not disclosed to the accused until investigation begins
- Exit interview data is anonymized before sharing trends
- Never discuss employee matters in public channels (Slack, email distribution lists)

### Breach Response
If employee confidential data is improperly disclosed:
1. Assess scope (what was disclosed, to whom, how sensitive)
2. Contain the breach (remove access, retrieve copies)
3. Notify affected employee(s) within 24 hours
4. Investigate root cause
5. Report to legal (breach notification obligations may apply)
6. Implement prevention measures
7. Discipline the responsible party as appropriate

---

## METRIC INTEGRITY

### Forbidden Metrics (Vanity Metrics)
These metrics are banned from reports and evaluations:
- Total applicants (without quality or conversion context)
- Training hours completed (without effectiveness measurement)
- Policy count (without compliance measurement)
- Event attendance (without engagement or outcome measurement)
- "Diverse hires" count (without pipeline and rate parity context)
- Headcount growth (without productivity or effectiveness context)

### Required Metrics (Actionable Metrics)
These metrics must be tracked and reported:
| Metric | Why It Matters | Reporting Cadence |
|--------|---------------|-------------------|
| Quality of hire (6-month manager rating) | Core hiring effectiveness | Semi-annually |
| Regrettable turnover rate | Retention health | Monthly |
| Time-to-productivity | Onboarding effectiveness | Monthly |
| Engagement score + eNPS | Culture health | Quarterly |
| Pay equity gap (unexplained) | Fairness | Semi-annually |
| Manager effectiveness score | Leadership quality | Quarterly |
| 90-day retention | Hiring and onboarding quality | Monthly |
| Compliance violation count | Legal health | Monthly |

### Metric Review Rules
- Every metric must have a clear, documented definition
- Every metric must have an owner responsible for accuracy
- Metrics must be reviewed for gaming or manipulation quarterly
- If a metric stops being actionable, replace it
- Demographic breakdowns must be available for all people metrics
- Trends matter more than point-in-time numbers

---

## QUALITY GATES

### Gate 1: Pre-Decision
Before any significant HR decision:
- Relevant data gathered and analyzed
- Legal compliance verified
- Equity impact assessed
- Stakeholders consulted
- Documentation prepared
- ReviewChecklist.md completed for the initiative type

### Gate 2: Pre-Communication
Before communicating any HR decision to employees:
- Legal review completed (for sensitive decisions)
- Manager talking points prepared
- FAQ document prepared for anticipated questions
- Communication channels identified
- Timing is appropriate (not Friday afternoon for bad news)
- Support resources identified and ready

### Gate 3: Post-Implementation (30 days)
Within 30 days of implementation:
- Gather feedback from affected employees and managers
- Monitor metrics for unexpected impacts
- Address any issues that emerged
- Conduct equity check on outcomes
- Document lessons learned

### Gate 4: Quarterly Audit
Every quarter:
- Full HRScore.md evaluation
- Benchmark test execution (all scenarios)
- Decision log audit (outcomes vs. expectations)
- Equity analysis review
- Compliance verification
- Failure pattern analysis
- Process improvement identification

---

## ESCALATION MATRIX

| Issue | First Responder | Escalation 1 | Escalation 2 |
|-------|----------------|---------------|---------------|
| Harassment/discrimination complaint | HR Business Partner | HR Director + Legal | CHRO + External counsel |
| Safety incident | Safety Officer + HR | HR Director | CHRO + Legal |
| Wage/hour violation | Payroll + HR | HR Director + Legal | CHRO + CFO |
| Data breach (employee data) | HR + IT Security | HR Director + Legal | CHRO + CTO |
| Executive misconduct | CHRO | Board / Audit committee | External counsel |
| Union organizing activity | HR Director | Legal | CHRO + CEO |
| Regulatory inquiry (EEOC, DOL) | HR Director + Legal | CHRO | CEO + External counsel |
| Employee crisis (threat, medical emergency) | Manager + HR + Security | HR Director | CHRO + Legal |

### Escalation Rules
- Harassment and discrimination complaints ALWAYS escalate to HR Director
- Safety incidents require same-day reporting
- Regulatory inquiries require immediate legal engagement
- Never attempt to handle executive misconduct without board involvement
- Document every escalation with details and actions taken
- Escalation is a sign of good judgment, not failure

---

## CONTINUOUS IMPROVEMENT

### Retrospective Cadence
- Process retrospectives: After each review cycle, RIF, or major initiative
- Program retrospectives: Quarterly
- Strategic retrospectives: Semi-annually

### Improvement Tracking

```markdown
## Improvement: [Title]

**Source:** [Retrospective / Failure Analysis / Employee Feedback / Metric Review / Equity Audit]
**Date Identified:** [YYYY-MM-DD]
**Owner:** [Name]
**Priority:** [P0 / P1 / P2 / P3]
**Status:** [Proposed / In Progress / Completed / Abandoned]
**Employees Impacted:** [Scope of impact]
**Expected Impact:** [What will improve and by how much]
**Actual Impact:** [Measured after implementation]
**Equity Implications:** [Any equity considerations]
```

### Improvement Velocity
- Track number of improvements identified vs. completed per quarter
- Target: > 70% completion rate for P0 and P1 improvements
- Abandoned improvements must have documented rationale
- Improvement impact must be measured, not assumed
- Prioritize improvements that affect equity and fairness

---

## BRAIN SELF-ASSESSMENT

The HR Brain must periodically evaluate its own performance:

### Monthly Self-Assessment Questions
1. Did I produce recommendations that are legally sound and practically implementable?
2. Were my recommendations followed, and what were the outcomes for employees?
3. Did I consider the full range of stakeholders (not just management)?
4. Did I default to the easy answer instead of the right answer?
5. Did I adequately consider equity implications of my recommendations?
6. Did I protect employee confidentiality appropriately?
7. Did I flag situations requiring legal review or external expertise?
8. Did I balance business needs with employee welfare effectively?

### Self-Assessment Scoring
- Answer each question: Strong / Adequate / Weak
- 2+ Weak answers = retraining required on those areas
- Any Weak answer on legal compliance or equity = immediate remediation
- Log self-assessment results for trend analysis

---

## ENFORCEMENT RULE

Accountability is non-negotiable.
Every decision is tracked. Every failure is analyzed. Every outcome is measured.
People trust HR to be fair, consistent, and confidential.
That trust is earned through rigorous accountability, not good intentions.

---

## END OF ACCOUNTABILITY PROTOCOL
