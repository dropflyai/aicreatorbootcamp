# Email Accountability Protocol — Governance Framework (Authoritative)

This document defines how the Email Brain is held accountable for its outputs.
Every campaign, automation, strategy recommendation, and program decision is subject to this protocol.

An email program without accountability is just noise in people's inboxes.

---

## CORE ACCOUNTABILITY PRINCIPLES

1. **Every email has a purpose.** No sends without a documented objective.
2. **Every campaign has expected metrics.** No sends without predicted performance.
3. **Every automation has an owner.** No set-and-forget automations.
4. **Every deliverability issue has a root cause.** No "it just happened."
5. **Every subscriber interaction is a trust transaction.** Every email either builds or erodes trust.

---

## SECTION 1: OUTPUT ACCOUNTABILITY

### 1.1 Campaign Registry

Every email campaign must be registered before sending:

```markdown
| Campaign | Owner | Send Date | Audience Size | Objective | Expected CTR | Actual CTR |
|----------|-------|-----------|---------------|-----------|-------------|------------|
| [Name] | [Person] | [Date] | [Number] | [Goal] | [%] | [%] |
```

**Rules:**
- No campaign sends without a registered entry
- Objectives must be specific and measurable (not "increase engagement")
- Expected metrics must be stated before send (forces thinking, enables learning)
- Actual metrics must be recorded within 48 hours of send
- Variance between expected and actual >30% triggers analysis

### 1.2 Automation Registry

Every active automation must be registered and monitored:

```markdown
| Automation | Owner | Launch Date | Last Reviewed | Monthly Volume | Performance vs. Benchmark |
|------------|-------|-------------|---------------|---------------|--------------------------|
| [Name] | [Person] | [Date] | [Date] | [Number] | Above/At/Below |
```

**Rules:**
- Every automation has a named owner (not "the team")
- Every automation must be reviewed at minimum quarterly
- Automations not reviewed for >6 months are flagged for immediate review
- Automations performing >20% below benchmark trigger optimization or retirement
- New automations require a 30-day post-launch review

### 1.3 Decision Log

Every significant email program decision must be logged:

```markdown
| Decision | Date | Decider | Rationale | Data Used | Expected Outcome | Actual Outcome |
|----------|------|---------|-----------|-----------|-----------------|---------------|
```

**Rules:**
- "Significant" = affects >10,000 subscribers, changes program frequency, alters segmentation, impacts deliverability, or involves budget >$1,000
- Rationale must reference data (performance data, industry benchmarks, test results)
- "Everyone does it" and "best practice says" are not sufficient rationale
- Expected outcome must include specific metric targets
- Actual outcome must be recorded and compared

### 1.4 Test Documentation

Every A/B test must be documented:

```markdown
| Test | Date | Hypothesis | Variable | Sample Size | Winner | Significance | Learning |
|------|------|-----------|----------|-------------|--------|-------------|----------|
```

**Rules:**
- Tests without hypotheses are not valid tests (random testing is waste)
- Tests must reach statistical significance before declaring a winner
- Test learnings must be applied to future campaigns within 2 send cycles
- Tests that do not reach significance are documented as "inconclusive" (not ignored)
- Test documentation is reviewed monthly to identify patterns

---

## SECTION 2: PERFORMANCE ACCOUNTABILITY

### 2.1 Email Score Accountability

The EmailScore.md defines 8 dimensions. Accountability is enforced as follows:

| Score Range | Accountability Action |
|-------------|----------------------|
| 5 (Excellent) | Document and share approach as case study |
| 4 (Good) | Continue current trajectory, seek marginal improvements |
| 3 (Adequate) | Improvement plan required within 2 weeks |
| 2 (Poor) | Escalation to marketing leadership, remediation plan within 1 week |
| 1 (Failing) | Emergency intervention, all non-critical sends paused |

**Hard Fail Consequences:**
- Deliverability <3 → All non-critical sends paused. Diagnostic within 48 hours. Recovery plan within 1 week.
- Compliance <3 → ALL sends stopped. Legal review. Remediation before any sends resume.
- List Health <3 → Emergency hygiene. Acquisition source audit. Suppression of disengaged segments.

### 2.2 Benchmark Test Accountability

Benchmark test results (BenchmarkTests.md) trigger the following:

| Average Score | Accountability Action |
|---------------|----------------------|
| >= 4.5 | Competency verified, re-test in 6 months |
| 4.0 - 4.4 | Competency adequate, re-test in 3 months |
| 3.0 - 3.9 | Competency gap, targeted training within 30 days, re-test in 60 days |
| < 3.0 | Critical gap, intensive training, supervised email program management |

### 2.3 Metric Accountability

Key metrics are monitored with accountability thresholds:

| Metric | Green | Yellow | Red | Red Action |
|--------|-------|--------|-----|------------|
| Inbox Placement | >95% | 90-95% | <90% | Pause sends, diagnose |
| Bounce Rate | <0.5% | 0.5-1% | >1% | List hygiene, source audit |
| Complaint Rate | <0.1% | 0.1-0.2% | >0.2% | Frequency reduction, content review |
| Unsubscribe Rate | <0.3% | 0.3-0.5% | >0.5% | Segmentation review, frequency audit |
| CTR | >3% | 1-3% | <1% | Content overhaul, personalization review |
| List Growth (net) | >2%/mo | 0-2%/mo | Shrinking | Acquisition strategy overhaul |

### 2.4 Trend Accountability

Metrics are tracked over time. Trends trigger action:

| Trend | Accountability Action |
|-------|----------------------|
| 3 consecutive months improving | Recognize and document what is working |
| 3 consecutive months stable | Evaluate if optimization ceiling reached |
| 2 consecutive months declining | Root cause analysis required within 1 week |
| 3 consecutive months declining | Escalation to leadership, comprehensive program review |
| Any metric crosses from Green to Red in one period | Emergency review within 48 hours |

---

## SECTION 3: SUBSCRIBER TRUST ACCOUNTABILITY

### 3.1 Trust Metrics

Every email interaction is a trust transaction. Track trust indicators:

- **Positive trust signals:** Opens, clicks, replies, forwards, whitelist additions
- **Negative trust signals:** Unsubscribes, complaints, spam reports, inactivity
- **Net trust score:** Positive signals - negative signals per send

### 3.2 Trust Violations

Actions that violate subscriber trust are tracked and prevented:

| Violation | Severity | Consequence |
|-----------|----------|-------------|
| Sending without consent | Critical | Immediate stop, compliance review |
| Ignoring unsubscribe request | Critical | Immediate fix, incident report |
| Misleading subject line | High | Content review, retraining |
| Excessive frequency | High | Frequency audit, preference center review |
| Irrelevant content | Medium | Segmentation review |
| Poor personalization (broken merge tags) | Medium | QA process review |
| Broken links in email | Low | Testing process review |

### 3.3 Subscriber Lifetime Trust

Track the cumulative trust relationship:

- New subscribers: trust is neutral (earned through relevant, respectful communication)
- Engaged subscribers: trust is positive (protect it — do not overmail)
- Disengaged subscribers: trust is declining (act before it reaches zero)
- Unsubscribed: trust was broken (analyze why, learn, prevent)

---

## SECTION 4: DELIVERABILITY ACCOUNTABILITY

### 4.1 Deliverability Monitoring

Deliverability must be monitored continuously, not reactively:

| Check | Frequency | Owner | Tool |
|-------|-----------|-------|------|
| Sender reputation (Google) | Daily | Email ops | Google Postmaster Tools |
| Sender reputation (Microsoft) | Daily | Email ops | Microsoft SNDS |
| Blacklist check | Daily | Email ops | Blacklist monitoring service |
| Inbox placement test | Weekly | Email ops | Litmus/GlockApps |
| Authentication check | Weekly | Email ops | MXToolbox or equivalent |
| Bounce rate review | Per send | Email ops | ESP dashboard |
| Complaint rate review | Per send | Email ops | ESP dashboard + feedback loops |

### 4.2 Deliverability Incident Response

When deliverability issues are detected:

| Severity | Definition | Response Time | Actions |
|----------|-----------|---------------|---------|
| Critical | Inbox placement <80% or blacklisted | Immediate | Pause sends, diagnose, fix, recover |
| High | Inbox placement 80-90% or complaint rate >0.2% | Within 4 hours | Reduce volume, investigate, remediate |
| Medium | Inbox placement 90-95% or bounce rate >1% | Within 24 hours | Investigate, clean list, adjust |
| Low | Minor reputation dip or isolated delivery issue | Within 1 week | Monitor, investigate if persists |

### 4.3 Deliverability Root Cause Registry

Every deliverability incident must be analyzed and logged:

```markdown
| Incident | Date | Severity | Root Cause | Fix Applied | Prevention Added |
|----------|------|----------|------------|-------------|-----------------|
```

---

## SECTION 5: REVIEW CADENCE

### 5.1 Per-Send Review
- **Duration:** 10 minutes
- **Participants:** Email sender
- **Agenda:** Pre-send checklist completion, metric prediction, post-send monitoring plan
- **Accountability:** Checklist must be completed (ReviewChecklist.md)

### 5.2 Weekly Email Review
- **Duration:** 30 minutes
- **Participants:** Email team
- **Agenda:** Week's campaign performance, automation performance, deliverability status, upcoming calendar
- **Accountability:** All campaigns from the week must have performance recorded

### 5.3 Monthly Program Review
- **Duration:** 60 minutes
- **Participants:** Email team + marketing leadership
- **Agenda:** Monthly Email Score, trend analysis, test learnings, automation review, list health
- **Accountability:** Email Score must be presented with evidence and action items

### 5.4 Quarterly Strategic Review
- **Duration:** 90 minutes
- **Participants:** Email team + marketing leadership + cross-functional stakeholders
- **Agenda:** Quarterly performance, revenue attribution, competitive analysis, strategic alignment, budget review
- **Accountability:** Full Email Score with quarter-over-quarter trends, benchmark comparison, ROI analysis

### 5.5 Annual Email Audit
- **Duration:** Comprehensive (multi-week process)
- **Participants:** Email team + external perspective (if available)
- **Agenda:** Full program audit, deliverability deep dive, automation architecture review, compliance audit, strategic planning
- **Accountability:** Audit findings must produce a prioritized action plan with owners and deadlines

---

## SECTION 6: ESCALATION FRAMEWORK

### 6.1 Escalation Triggers

| Trigger | Escalation Level | Response Time |
|---------|-----------------|---------------|
| Compliance violation | Legal + marketing leadership | Immediate |
| Deliverability <3 (Email Score) | Marketing leadership | 24 hours |
| Blacklist listing | Email ops + marketing leadership | 4 hours |
| Complaint rate >0.3% | Email ops | Immediate (reduce sends) |
| List Health <3 | Marketing leadership | 1 week |
| Revenue attribution declining 3 months | Marketing leadership | 2 weeks |
| Benchmark score <3.0 | Email team lead | 2 weeks |
| Automation failure affecting >1,000 subscribers | Email ops | 4 hours |

### 6.2 Escalation Protocol

1. **Detect** — Identify the issue through monitoring or reporting
2. **Assess** — Determine severity, scope, and impact
3. **Contain** — Take immediate action to prevent further damage (pause sends if needed)
4. **Notify** — Alert the appropriate escalation level with data
5. **Diagnose** — Identify root cause
6. **Fix** — Implement the solution
7. **Verify** — Confirm the fix resolved the issue
8. **Prevent** — Implement systemic changes to prevent recurrence
9. **Document** — Log the incident with full details and learnings

---

## SECTION 7: TRANSPARENCY REQUIREMENTS

### 7.1 What Must Be Visible

- All campaign performance metrics with benchmarks
- All automation performance with last review date
- Deliverability metrics dashboard (real-time or daily)
- List health metrics with trend data
- Compliance status and audit results
- Test log with learnings
- Revenue attribution data
- Subscriber trust indicators

### 7.2 What Must Be Reported

| Report | Audience | Frequency | Content |
|--------|----------|-----------|---------|
| Send report | Email team | Per send | Metrics vs. predictions |
| Weekly digest | Marketing team | Weekly | Performance summary, key learnings |
| Monthly dashboard | Marketing leadership | Monthly | Email Score, trends, revenue impact |
| Quarterly review | Cross-functional leaders | Quarterly | Strategic performance, benchmarks, ROI |

### 7.3 Anti-Hiding Rules

- Underperforming campaigns must be reported with the same detail as top performers
- Deliverability dips must be flagged proactively, not discovered by stakeholders
- Unsubscribe and complaint data must be visible alongside growth data
- Failed tests must be documented with the same rigor as successful tests
- Revenue attribution must use consistent methodology (no switching models to look better)

---

## SECTION 8: CONTINUOUS CALIBRATION

### 8.1 Protocol Review

This accountability protocol itself is subject to review:

- Quarterly: Are metric thresholds appropriate for the program's maturity?
- Quarterly: Are escalation triggers working (catching problems before they grow)?
- Annually: Full protocol review and revision
- Ad-hoc: After any significant deliverability incident or program failure

### 8.2 Calibration Criteria

- **Too Strict:** If the team is spending more time on reporting than optimizing, thresholds need adjustment
- **Too Lenient:** If deliverability issues or compliance violations are only caught by external parties, thresholds are too relaxed
- **Right-Sized:** Team catches and corrects issues before they impact subscribers or business results

### 8.3 Industry Benchmark Calibration

Metric thresholds should be calibrated against industry benchmarks:

- Review industry benchmark reports annually (Mailchimp, HubSpot, Litmus, etc.)
- Adjust Green/Yellow/Red thresholds based on industry movement
- Account for industry-specific variations (B2B vs. B2C vs. e-commerce vs. media)
- Account for list size effects (larger lists typically have lower engagement rates)

### 8.4 Evolution Log

```markdown
| Date | Change | Rationale | Approved By |
|------|--------|-----------|-------------|
| [Date] | [What changed] | [Why] | [Who approved] |
```

---

## ENFORCEMENT RULE

Accountability is a system, not an attitude.
Every email sent reflects on the brand and affects deliverability.
If the system does not catch problems, the system is broken.
If caught problems do not get fixed, the accountability is theater.
Measure, send, learn, improve.

---

## END OF ACCOUNTABILITY PROTOCOL
