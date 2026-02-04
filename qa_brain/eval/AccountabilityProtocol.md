# QA Brain -- Accountability Protocol (Authoritative)

This document defines the accountability framework for all quality assurance work.
Every test strategy, every release decision, and every escaped defect has an owner.
Every QA process is measured. Every gap is addressed.

QA without accountability is theater.
A green test suite that does not catch bugs is worse than no test suite --
it provides false confidence.

---

## CORE PRINCIPLES

1. **Quality is a team responsibility, but QA owns the process.** Developers write code, QA ensures the process catches defects. If defects escape, the process failed.
2. **Every release decision is documented.** Go/no-go is never verbal. It is written, with data, with a name attached.
3. **Every escaped defect is a learning opportunity.** Not a blame event. But a mandatory learning event. If the same class of defect escapes twice, the process is broken.
4. **Metrics drive improvement, not punishment.** Metrics are published. Trends are discussed. Declining metrics trigger investigation, not reprimand.
5. **Test reliability is non-negotiable.** A flaky test suite is not a test suite. It is noise. Reliability is maintained before coverage is expanded.

---

## SECTION 1: QA OWNERSHIP MODEL

### 1.1 QA Roles and Responsibilities

| Role | Responsibility | Accountable For |
|------|---------------|----------------|
| QA Lead | Test strategy, process design, metrics program | Overall quality process effectiveness |
| QA Engineer | Test execution, automation, defect reporting | Coverage and accuracy of assigned areas |
| SDET | Framework development, CI integration, tooling | Automation reliability and efficiency |
| Release QA | Release checklist, go/no-go recommendation | Release quality decision |

### 1.2 Ownership Per Feature

Every feature under test must have:
- **QA Owner:** Single person accountable for test coverage of this feature
- **Test Plan:** Documented test approach (linked to feature requirements)
- **Coverage Report:** Metrics showing what is tested and what is not
- **Risk Assessment:** Documented risk areas and testing priority

### 1.3 Ownership Transfer

When QA ownership changes (team changes, attrition, reorg):
1. Knowledge transfer session (minimum 2 hours)
2. Test plan walkthrough
3. Known issues and risk areas briefing
4. Automation suite walkthrough (what exists, what is missing, what is flaky)
5. Transfer documented and acknowledged by both parties

---

## SECTION 2: RELEASE DECISION ACCOUNTABILITY

### 2.1 Go/No-Go Process

Every release decision must follow this process:

1. **QA presents:** Test execution summary, defect summary, risk assessment
2. **Data reviewed:** Coverage metrics, pass rates, escaped defect trends
3. **Open defects assessed:** Each open defect explicitly accepted or blocked on
4. **Decision recorded:** Written record with reasoning
5. **Decision signed:** QA Lead, Engineering Lead, Product Owner

### 2.2 Release Decision Record

Every release requires this record:

```
Release: [Product] v[X.Y.Z]
Date: YYYY-MM-DD
Decision: [GO / NO-GO / GO WITH CONDITIONS]
QA Recommendation: [Release / Do Not Release / Release With Conditions]
Decision Maker: [Name, role]

Evidence:
- Test pass rate: ___%
- Coverage: ___%
- Open Critical bugs: ___
- Open High bugs: ___
- Escape rate (last release): ___%
- Performance test result: [Pass / Fail]
- Security scan result: [Pass / Fail]

Conditions (if conditional release):
1. [Condition -- owner -- deadline]

Deferred Defects (accepted risk):
1. [Defect ID -- severity -- justification for deferral]

Signed:
- QA Lead: [Name]
- Engineering Lead: [Name]
- Product Owner: [Name]
```

### 2.3 Override Protocol

If the release decision is overridden (QA says no-go, leadership says go):

1. Override must be documented with name of person overriding
2. Risk acceptance must be explicitly signed
3. Additional monitoring must be in place for the overridden areas
4. Post-release review mandatory regardless of outcome
5. If escaped defect occurs in overridden area: escalation to VP and process review

Overrides are not inherently wrong -- but they must be visible and accountable.

---

## SECTION 3: DEFECT ESCAPE ACCOUNTABILITY

### 3.1 Escape Classification

Every defect found in production must be classified:

| Class | Definition | Response |
|-------|-----------|----------|
| Process Escape | Test exists but did not catch the defect | Fix the test |
| Coverage Escape | No test existed for this scenario | Add the test, review why gap existed |
| Environment Escape | Test passed in QA, fails in production | Fix environment parity |
| Data Escape | Test data did not cover this case | Improve test data strategy |
| Timing Escape | Defect only manifests under specific timing/load | Add performance/concurrency test |
| New Category | Defect type not previously considered | Update test strategy |

### 3.2 Escape Response Protocol

For every escaped defect of severity Critical or High:

**Within 24 hours:**
1. Defect classified (escape class above)
2. QA owner identified (who was responsible for this area)
3. Initial root cause documented (why was it missed)

**Within 5 business days:**
1. Full escape analysis complete
2. Test gap identified and documented
3. New test(s) written that would have caught this defect
4. Process improvement identified (if systemic)
5. Escape report filed and shared with team

**Within 30 days:**
1. Process improvement implemented
2. Verification that similar defects are now caught
3. Escape metrics updated

### 3.3 Escape Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Escape rate (per release) | < 2% | 2-5% | > 5% |
| Critical escapes per quarter | 0 | 1 | > 1 |
| Repeat escapes (same class) | 0 | 1 | > 1 |
| Mean time to detect (escaped) | < 24 hours | 24-72 hours | > 72 hours |
| Escape analysis completion rate | 100% | < 90% | < 70% |

### 3.4 Repeat Escape Escalation

If the same class of defect escapes twice:

1. **First repeat:** Process improvement mandatory within 14 days
2. **Second repeat:** QA Lead conducts formal review of the area's test strategy
3. **Third repeat:** Escalation to Engineering Manager. External assessment may be needed.

Repeat escapes indicate a systemic problem. Treating each as an isolated incident is itself a process failure.

---

## SECTION 4: TEST RELIABILITY ACCOUNTABILITY

### 4.1 Flaky Test SLAs

| Metric | Target | Owner |
|--------|--------|-------|
| Flaky test rate | < 2% | SDET / QA Lead |
| Time to fix flaky test | < 5 business days | Test owner |
| Quarantine duration | < 14 days | Test owner |
| Tests in quarantine at any time | < 5% of suite | QA Lead |

### 4.2 Flaky Test Process

When a flaky test is identified:
1. **Day 0:** Flag as flaky, move to quarantine suite (does not block PRs)
2. **Day 1-2:** Root cause investigation (timing, data, environment, ordering)
3. **Day 3-5:** Fix implemented, test returned to main suite
4. **Day 14:** If still not fixed: decision -- delete or rewrite from scratch

Flaky tests that remain in quarantine > 14 days are deleted.
A deleted test means a coverage gap that must be documented.

### 4.3 Test Suite Health Metrics

| Metric | Target | Cadence |
|--------|--------|---------|
| Suite pass rate (non-flaky) | 100% | Per run |
| Suite execution time | < 15 minutes (unit), < 30 minutes (e2e) | Per run |
| Test maintenance effort | < 20% of QA time | Monthly |
| New tests per sprint | Proportional to new features | Per sprint |
| Retired tests per sprint | Proportional to removed features | Per sprint |
| Test-to-code ratio | Stable or improving | Monthly |

### 4.4 CI Pipeline Health

- CI pipeline must not be red for > 2 hours during business hours
- CI pipeline failure rate due to test issues: < 5%
- If CI is red due to flaky tests, the SDET is notified immediately
- If CI is red due to infrastructure, the DevOps team is notified immediately
- "Just re-run it" is not an acceptable response. Ever.

---

## SECTION 5: COVERAGE ACCOUNTABILITY

### 5.1 Coverage Targets Per Feature Area

| Area | Unit Test | Integration | E2E | Performance | Security |
|------|-----------|-------------|-----|-------------|----------|
| Payment processing | > 90% | > 80% | Critical flows | Required | Required |
| User authentication | > 85% | > 70% | All flows | Required | Required |
| Data import/export | > 80% | > 70% | Critical flows | Required | N/A |
| Reporting | > 70% | > 60% | Key reports | Required | N/A |
| Admin features | > 70% | > 50% | Critical flows | Optional | Required |
| UI components | > 60% | N/A | Visual regression | N/A | N/A |

### 5.2 Coverage Gap Accountability

Every known coverage gap must be documented:

```
Area: [Feature/Module]
Gap: [What is not tested]
Risk: [Low / Medium / High / Critical]
Reason: [Why not tested -- resource, complexity, tool limitation]
Plan: [When it will be tested, or why it is accepted as-is]
Owner: [Name]
Review Date: [When to re-assess]
```

### 5.3 Coverage Review Cadence

| Cadence | Activity | Owner |
|---------|----------|-------|
| Per PR | Coverage does not decrease (CI gate) | CI/Automation |
| Per sprint | Coverage trend review | QA Lead |
| Per release | Full coverage report | QA Lead |
| Quarterly | Coverage gap audit | QA Lead + Engineering Lead |

---

## SECTION 6: AUTOMATION ACCOUNTABILITY

### 6.1 Automation Investment Tracking

Track quarterly:
- Hours invested in test automation (creation + maintenance)
- Hours saved by automation (manual testing avoided)
- Defects caught by automation (that manual would have missed or found later)
- Net ROI: (hours saved + defect cost avoided) - hours invested

If ROI is negative for 2 consecutive quarters: automation strategy review.

### 6.2 Automation Quality Standards

Automated tests are production code. They must meet the same standards:

- [ ] Code reviewed (same as application code)
- [ ] Follows established patterns (page objects, fixtures, helpers)
- [ ] No hardcoded waits (use explicit waits or retries)
- [ ] No shared state between tests (tests run independently)
- [ ] Meaningful assertions (not just "page loaded" -- verify actual data)
- [ ] Clear failure messages (when a test fails, the error explains why)
- [ ] Documented (complex test logic explained)
- [ ] Maintained (updated when application changes)

### 6.3 Automation Ownership

Every automated test has an owner (the person who wrote it or inherited it).
Owners are responsible for:
- Fixing the test when it breaks due to application changes
- Updating the test when requirements change
- Deleting the test when the feature is removed
- Escalating if the test is consistently flaky

---

## SECTION 7: REPORTING AND TRANSPARENCY

### 7.1 QA Dashboard

The following metrics must be visible to the entire engineering organization:

| Metric | Target | Update Cadence |
|--------|--------|---------------|
| Escape rate | < 2% | Per release |
| Test coverage | > 80% | Per sprint |
| Automation rate | > 60% | Per sprint |
| Flaky test rate | < 2% | Weekly |
| Suite execution time | < 15 min | Daily |
| Defect discovery curve | Stabilizing before release | Per sprint |
| Go/no-go accuracy | > 95% | Per release |
| Release cycle time (QA portion) | < 2 days | Per release |

### 7.2 Sprint QA Report

Every sprint, QA publishes:
1. Test execution summary (pass/fail/skip by test type)
2. Defect summary (found, fixed, open by severity)
3. Coverage changes (improved, degraded, gaps)
4. Automation progress (new tests, fixed tests, retired tests)
5. Flaky test status (identified, fixed, quarantined)
6. Risks and blockers

### 7.3 Release QA Report

Every release, QA publishes:
1. Release decision rationale
2. Test execution results (complete)
3. Defect analysis (found, fixed, deferred with justification)
4. Performance test results
5. Security scan results
6. Accessibility check results
7. Known issues shipping with this release
8. Confidence level (quantitative + qualitative)

### 7.4 Quarterly QA Health Report

Every quarter, QA publishes:
1. QA Score trend
2. Escape analysis summary
3. Automation ROI calculation
4. Test infrastructure health
5. Team capability assessment
6. Process improvement results from previous quarter
7. Improvement plan for next quarter
8. Budget and resource needs

---

## SECTION 8: ESCALATION MATRIX

### When to Escalate

| Situation | Escalation Target | Timeline |
|-----------|-------------------|----------|
| Critical defect escaped to production | QA Lead + Engineering Manager | Immediate |
| Escape rate > 5% for 2 consecutive releases | Engineering Manager | Within 1 week |
| Flaky test rate > 10% | QA Lead + SDET Lead | Within 2 days |
| CI pipeline red > 4 hours | SDET + DevOps | Immediate |
| Release blocked by QA > 3 days | QA Lead + Product Owner | Day 3 |
| Go/no-go override requested | QA Lead + VP Engineering | Per occurrence |
| Test environment down > 4 hours | QA Lead + DevOps | Immediate |
| QA capacity insufficient for release scope | QA Lead + Engineering Manager | Sprint planning |
| Same escape class repeated 3rd time | Engineering Manager + VP | Immediate |
| QA Score below 3.0 | QA Lead + Engineering Manager | Within 1 week |

### Escalation Is a Feature, Not a Bug

Escalation ensures the right people know about the right problems at the right time.
Not escalating when thresholds are met is an accountability failure.
Over-escalating without justification is noise. Use the thresholds.

---

## SECTION 9: CONTINUOUS IMPROVEMENT

### 9.1 Improvement Sources

Quality improvements come from:
1. **Escape analysis:** every escaped defect teaches something
2. **Retrospectives:** every release retrospective identifies process gaps
3. **Metrics trends:** declining metrics trigger investigation
4. **Benchmark reviews:** QA Brain benchmarks test current capability
5. **External learning:** conferences, publications, industry practices
6. **Incidents:** every production incident has a QA angle

### 9.2 Improvement Tracking

Every improvement action must be:
1. Documented as a ticket with clear acceptance criteria
2. Assigned to an owner
3. Given a deadline (aligned with severity)
4. Verified after implementation (did the metric actually improve?)
5. Reported in the quarterly QA Health Report

### 9.3 Improvement Velocity

Track quarterly:
- Number of improvements identified
- Number of improvements implemented
- Number of improvements verified as effective
- Time from identification to implementation
- Metrics impact of improvements

If improvements are identified but not implemented: resource or priority problem.
If improvements are implemented but metrics do not improve: wrong improvements.

### 9.4 Protocol Updates

This accountability protocol is reviewed quarterly:
- Are thresholds still appropriate?
- Are escalation paths still correct?
- Do new testing challenges require new protocols?
- Has the team outgrown any process?

Changes require review by QA Lead and Engineering Manager.

---

## SECTION 10: ACCOUNTABILITY IS NOT BLAME

### The Distinction

- **Blame** asks: whose fault was this?
- **Accountability** asks: who owns fixing this, and what systemic change prevents recurrence?

Blame creates hiding. Accountability creates improvement.

### Practical Application

When a defect escapes:
- We do NOT ask: "Why did QA miss this?"
- We DO ask: "What about our process allowed this to escape, and how do we fix the process?"

When metrics decline:
- We do NOT ask: "Who is not doing their job?"
- We DO ask: "What changed, and what do we need to change in response?"

When a release is delayed:
- We do NOT ask: "Why is QA so slow?"
- We DO ask: "Was the scope too large, the quality too low, or the testing approach inefficient?"

### The Commitment

Every person in the QA organization commits to:
1. Owning their area of responsibility completely
2. Reporting honestly (no hiding bad metrics or defects)
3. Investigating thoroughly (no surface-level root causes)
4. Improving continuously (no accepting "this is how we have always done it")
5. Supporting teammates (accountability is collective, not competitive)

---

**QA accountability means this: when the product ships, QA can explain exactly
why they believe it is ready, show the evidence, and stand behind the decision.
When it is not ready, QA can explain exactly what is wrong, what it will take to fix,
and when it will be done.**

**This protocol ensures both.**
