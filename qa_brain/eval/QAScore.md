# QA Score -- Quality Enforcement (Authoritative)

This document defines how quality assurance effectiveness is evaluated.
Every test strategy, automation suite, and release gate must be scored
before it is considered production-ready.

QA that cannot measure its own effectiveness is not quality assurance.
It is hope.

---

## SCORING RULES (MANDATORY)

Each QA deliverable must be scored across all eight dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate intervention required:
- **Defect Detection**
- **Test Strategy Alignment**
- **Release Confidence**
- **Regression Efficiency**

A hard fail on ANY of these means the QA process is not protecting the product.

### Passing Criteria

- Average score across all eight dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 (even non-hard-fail)
- Trends must be stable or improving (declining scores trigger review)

### Escalation Rule

If QA scoring falls below 3.0 average, the QA Brain MUST:
1. Pause new test development
2. Conduct root cause analysis on the QA process itself
3. Create a QA improvement plan with measurable targets
4. Re-score after improvement sprint before resuming normal work

---

## 1. TEST COVERAGE

**Question:**
Do our tests adequately cover the codebase, requirements, and risk areas?

### Scoring Guide

- **5** -- Code coverage > 80% (meaningful, not just line coverage). Requirement traceability matrix complete (every requirement has at least one test). Risk-based coverage: high-risk areas have 3x more tests than low-risk. Mutation testing score > 70%. Coverage gaps documented with risk acceptance.
- **4** -- Code coverage > 70%. Most requirements traced to tests. Risk areas identified and heavily tested. Mutation testing performed on critical modules. Minor coverage gaps documented.
- **3** -- Code coverage > 60%. Some requirement traceability. Risk areas partially identified. No mutation testing. Coverage gaps exist but not documented.
- **2** -- Code coverage 40-60%. Minimal requirement traceability. Risk areas not systematically identified. Coverage is ad-hoc.
- **1** -- Code coverage < 40%. No requirement traceability. No risk-based approach. Testing is random.

### Coverage Metrics Checklist

- [ ] Code coverage measured and reported per module (target: > 80% for business logic)
- [ ] Branch coverage measured (not just line coverage)
- [ ] Requirement traceability matrix maintained
- [ ] Every user story has acceptance criteria with corresponding tests
- [ ] Risk-based coverage: critical paths have integration + e2e + unit tests
- [ ] API endpoint coverage: every endpoint has at least positive and negative tests
- [ ] Edge case coverage: boundary values, null/empty, maximum lengths
- [ ] Data combination coverage: pairwise testing for multi-parameter inputs
- [ ] Mutation testing score > 70% for critical business logic
- [ ] Coverage trend tracked over time (improving, stable, or declining)
- [ ] Uncovered areas explicitly documented with risk acceptance

### Coverage Anti-Patterns (Deductions)

- High line coverage but low branch coverage = inflated metric, score capped at 3
- Tests that assert nothing (coverage without verification) = score reduced by 1
- Coverage focused on trivial code, ignoring complex logic = score capped at 3
- No negative test cases = score capped at 3

### Failure Conditions

- Code coverage < 50% for business logic = score capped at 2
- No requirement traceability = score capped at 3
- Critical user flow with zero automated tests = score capped at 2
- Coverage decreasing over 3 consecutive sprints = score capped at 3

Score < 4 --> Coverage improvement sprint. Prioritize by risk.

---

## 2. AUTOMATION ROI

**Question:**
Is test automation delivering value proportional to its investment?

### Scoring Guide

- **5** -- Automation rate > 80% of repeatable tests. Maintenance cost < 15% of total QA effort. Test execution time < 15 minutes for full suite. Automation saves > 100 hours/month compared to manual. Automation catches > 30% of all defects. ROI calculated and positive.
- **4** -- Automation rate > 60%. Maintenance cost < 25%. Execution time < 30 minutes. Automation is a net time saver. Most regression is automated.
- **3** -- Automation rate > 40%. Maintenance cost 25-40%. Execution time < 60 minutes. Automation saves time on regression but maintenance is burdensome.
- **2** -- Automation rate 20-40%. Maintenance cost > 40%. Execution time > 60 minutes. Automation is as much work as it saves. Tests frequently break.
- **1** -- Automation rate < 20%. Maintenance cost exceeds value. Tests mostly broken or ignored. Automation is shelfware.

### Automation ROI Checklist

- [ ] Automation rate measured: ___% of repeatable test cases automated
- [ ] Time saved per sprint by automation calculated: ___ hours
- [ ] Maintenance cost tracked: ___% of QA effort spent maintaining existing tests
- [ ] Suite execution time: ___ minutes (target: < 15 minutes for CI, < 60 for full)
- [ ] Defects caught by automation in last quarter: ___ (target: > 30% of all defects)
- [ ] Flaky test rate: ___% (target: < 2%)
- [ ] Test creation velocity: ___ new tests per sprint
- [ ] Test retirement: obsolete tests removed regularly (not just accumulated)
- [ ] Automation framework documented and onboarding takes < 1 day
- [ ] Automation code reviewed with same rigor as production code

### ROI Calculation Template

```
Monthly Automation Cost:
- Engineer time maintaining tests: ___ hours x $___/hr = $___
- Engineer time creating tests: ___ hours x $___/hr = $___
- Infrastructure cost (CI, devices, licenses): $___
- Total: $___

Monthly Automation Value:
- Manual testing hours saved: ___ hours x $___/hr = $___
- Defects caught before release (estimated escape cost): ___ x $___  = $___
- Faster release cycles (time to market value): $___
- Total: $___

ROI: (Value - Cost) / Cost = ___%
```

### Failure Conditions

- Flaky test rate > 5% = SUITE UNRELIABLE, fix before adding new tests (score capped at 2)
- Maintenance cost > 50% of QA effort = score capped at 2
- Full suite takes > 2 hours = score capped at 3
- Automation rate < 30% for regression suite = score capped at 3
- Automation exists but is not run in CI = score capped at 2

Score < 3 --> Automation strategy overhaul. Focus on reliability before coverage.

---

## 3. DEFECT DETECTION

**Question:**
Is QA finding defects before customers do, and are we finding the right defects?

### Scoring Guide

- **5** -- Escape rate < 2% (defects found by customers vs total defects). Defect detection rate improving over 3+ sprints. Severity distribution matches risk model (more critical defects found proportionally). Time to detect < 24 hours from introduction. Defect clustering analyzed and used to focus testing.
- **4** -- Escape rate < 5%. Defect detection stable. Most critical defects found pre-release. Time to detect < 48 hours for critical. Defect analysis performed.
- **3** -- Escape rate 5-10%. Some critical defects escape. Detection is inconsistent. Limited defect analysis.
- **2** -- Escape rate 10-20%. Customers find critical defects regularly. No systematic detection improvement.
- **1** -- Escape rate > 20%. QA is not effectively catching defects. Customers are the primary QA.

### Defect Detection Metrics

- [ ] Escape rate tracked per release: ___% (target: < 5%)
- [ ] Defect density per module tracked (defects per KLOC or per feature)
- [ ] Severity distribution: Critical __%, High __%, Medium __%, Low __%
- [ ] Defect introduction rate by phase (requirements, design, code, integration)
- [ ] Mean time to detect (MTTDetect) from code commit to defect found: ___ hours
- [ ] Defect clustering analysis (which modules produce the most defects)
- [ ] Defect root cause categorization (logic error, integration, requirement gap, etc.)
- [ ] False positive rate for automated tests: ___% (target: < 3%)
- [ ] Defect reopen rate: ___% (target: < 5%)
- [ ] Defects found in code review vs testing vs production

### Defect Taxonomy

Every defect must be categorized:

| Dimension | Values |
|-----------|--------|
| Severity | Critical, High, Medium, Low |
| Found By | Unit test, Integration test, E2E test, Manual test, Code review, Customer |
| Root Cause | Logic error, Integration issue, Requirement gap, Data handling, Concurrency, UI/UX |
| Phase Introduced | Requirements, Design, Implementation, Integration |
| Escapee | Yes / No |

### Failure Conditions

- Escape rate trending up 3 consecutive sprints = STRATEGY REVIEW REQUIRED (score capped at 2)
- Critical defect escapes to production = score reduced by 1 per occurrence per quarter
- Defect reopen rate > 10% = fixes are not thorough, score capped at 3
- No defect root cause analysis = score capped at 3
- Zero defects found (suspicious) = validate test effectiveness, score capped at 3

Score < 3 --> Defect detection effectiveness is the core purpose of QA. Fix immediately.

---

## 4. TEST STRATEGY ALIGNMENT

**Question:**
Does our test strategy match the testing pyramid, address real risks, and serve the product's needs?

### Scoring Guide

- **5** -- Testing pyramid balanced: many unit tests, moderate integration, few e2e. Test types chosen based on risk (not habit). Exploratory testing scheduled and structured. Non-functional testing (performance, security, accessibility) integrated. Strategy reviewed and updated quarterly. Shift-left practices in place (testing in requirements and design).
- **4** -- Testing pyramid mostly balanced. Risk-based prioritization for test effort. Some exploratory testing. Non-functional testing performed for critical areas. Strategy reviewed semi-annually.
- **3** -- Testing pyramid inverted (too many e2e, not enough unit). Test selection not risk-based. Exploratory testing ad-hoc. Non-functional testing inconsistent. Strategy stale.
- **2** -- No pyramid awareness. Testing is all manual or all one type. No risk-based approach. Non-functional testing missing. No strategy document.
- **1** -- No test strategy. Testing is reactive and unplanned.

### Strategy Alignment Checklist

- [ ] Test strategy document exists and is current (updated within last quarter)
- [ ] Testing pyramid defined with target ratios (e.g., 70% unit, 20% integration, 10% e2e)
- [ ] Actual test distribution matches pyramid targets (+/- 10%)
- [ ] Risk assessment drives test prioritization (high risk = more tests + more types)
- [ ] Exploratory testing sessions scheduled (at least 2 hours per sprint)
- [ ] Exploratory test charters documented with findings
- [ ] Performance testing integrated for user-facing changes
- [ ] Security testing integrated for authentication and data handling changes
- [ ] Accessibility testing integrated for all UI changes
- [ ] Contract tests for service-to-service communication
- [ ] Shift-left: testability considered in design reviews
- [ ] Shift-left: acceptance criteria reviewed by QA before development starts
- [ ] Test environments mirror production (data, scale, configuration)
- [ ] Test strategy aligns with release cadence (tests fit in CI/CD pipeline)

### Strategy Anti-Patterns (Deductions)

- Ice cream cone (many e2e, few unit) = score capped at 3
- Testing only happy paths = score capped at 3
- No exploratory testing = score capped at 4
- QA involved only after development = score capped at 3
- Tests only in production-like environment (no fast feedback loop) = score capped at 3

### Failure Conditions

- No test strategy document = score capped at 2
- Testing pyramid inverted (more e2e than unit) = score capped at 3
- No performance testing for user-facing features = CANNOT RELEASE (score capped at 2)
- No security testing for features handling sensitive data = score capped at 2
- QA not involved until code complete = score capped at 3

Score < 4 --> Strategy workshop. Realign testing approach with risk and product needs.

---

## 5. ENVIRONMENT RELIABILITY

**Question:**
Are test environments stable, representative, and available when needed?

### Scoring Guide

- **5** -- Test environments uptime > 99.5%. Environment provisioning automated (< 30 minutes for new environment). Data refreshed weekly from sanitized production data. Environment parity with production verified monthly. Self-service environment creation for developers. Environment monitoring in place.
- **4** -- Uptime > 98%. Provisioning semi-automated (< 2 hours). Data refreshed monthly. Parity mostly maintained. Shared environments with booking system.
- **3** -- Uptime > 95%. Provisioning manual but documented (< 1 day). Data stale (refreshed quarterly). Some environment drift from production. Shared environments with conflicts.
- **2** -- Uptime 80-95%. Provisioning manual and slow (days). Data outdated. Significant drift from production. Environments frequently broken.
- **1** -- Environments unreliable. Provisioning weeks. Data does not represent production. Tests fail due to environment, not code.

### Environment Reliability Checklist

- [ ] Test environment uptime measured: ___% (target: > 99%)
- [ ] Environment provisioning time: ___ minutes (target: < 30 for ephemeral)
- [ ] Test data strategy defined (synthetic, sanitized production, or generated)
- [ ] Test data refreshed on schedule: ___ (target: weekly or on-demand)
- [ ] PII/PHI scrubbed from test data
- [ ] Environment configuration managed in code (same as production IaC)
- [ ] Environment parity verified (OS versions, service versions, configuration)
- [ ] Shared resources isolated (no test interference between teams)
- [ ] Environment monitoring (alerts when test environment is unhealthy)
- [ ] Cleanup automated (ephemeral environments destroyed after use)
- [ ] Database state resettable (tests start from known state)
- [ ] External dependencies stubbed or have sandboxed environments

### Failure Conditions

- Test environment down > 4 hours during business hours = ESCALATION (score capped at 2)
- Test data > 6 months old = score capped at 3
- PII in test environment = score capped at 2 (compliance risk)
- Tests fail due to environment issues > 10% of the time = score capped at 2
- No ability to reset test data = score capped at 3

Score < 3 --> Environment reliability is foundational. Fix before investing in more tests.

---

## 6. PERFORMANCE VALIDATION

**Question:**
Are we systematically validating that the product meets performance requirements?

### Scoring Guide

- **5** -- Load tests cover all critical user flows. Performance tested at 3x expected peak. SLO verification automated in CI. Performance baselines established with regression detection. Endurance (soak) testing performed weekly. Performance test results included in release decision. Client-side performance (Core Web Vitals, mobile metrics) tested.
- **4** -- Load tests cover primary flows. Tested at 2x peak. Some SLO verification automated. Baselines exist for key flows. Endurance testing performed monthly.
- **3** -- Load tests exist for main flow. Tested at expected peak only. Manual SLO verification. No established baselines. No endurance testing.
- **2** -- Minimal load testing. Ad-hoc performance checks. No SLO verification. No baselines.
- **1** -- No performance testing. Performance issues discovered in production.

### Performance Validation Checklist

- [ ] Performance test suite covers all critical user flows
- [ ] Load profiles defined (expected, peak, stress, endurance)
- [ ] Performance tested at 3x expected peak load
- [ ] Performance baselines established (response time, throughput, error rate)
- [ ] Regression detection: automatic comparison to baseline
- [ ] SLOs (latency, throughput, error rate) verified by performance tests
- [ ] Endurance (soak) test runs for 24+ hours weekly
- [ ] Stress test identifies breaking point
- [ ] Performance test data realistic (not just "test user 1, test user 2")
- [ ] Performance test environment matches production scale
- [ ] Client-side performance tested (render time, interaction delay)
- [ ] Performance test results reviewed before every release
- [ ] Performance degradation trends tracked over time

### Failure Conditions

- No performance test for user-facing feature change = CANNOT RELEASE (score capped at 2)
- Performance tested only at expected load (not peak or stress) = score capped at 3
- Performance test environment significantly different from production = score capped at 3
- Performance regression undetected for 2+ releases = score capped at 2
- No endurance testing for services with memory leak risk = score capped at 3

Score < 4 --> Performance testing gaps put production at risk. Address immediately.

---

## 7. REGRESSION EFFICIENCY

**Question:**
Can we confidently verify that new changes have not broken existing functionality, quickly and reliably?

### Scoring Guide

- **5** -- Full regression suite runs in < 15 minutes. Flaky test rate < 2%. Test selection intelligent (only relevant tests run per change). Regression catches > 90% of regressions before merge. Suite maintained weekly (obsolete tests removed, new tests added). Zero false positives in last sprint.
- **4** -- Regression suite runs in < 30 minutes. Flaky rate < 5%. Most relevant tests run per change. Catches > 80% of regressions. Suite maintained monthly.
- **3** -- Regression suite runs in 30-60 minutes. Flaky rate 5-10%. All tests run for every change (no selection). Catches some regressions but misses others. Maintenance ad-hoc.
- **2** -- Regression suite runs in > 60 minutes. Flaky rate > 10%. Tests frequently skipped due to time. Many false positives. Maintenance neglected.
- **1** -- No automated regression. Manual regression takes days. Regressions consistently ship.

### Regression Efficiency Checklist

- [ ] Full regression suite execution time: ___ minutes (target: < 15)
- [ ] Flaky test rate: ___% (target: < 2%)
- [ ] Flaky tests identified, tracked, and fixed within SLA (5 business days)
- [ ] Test selection/sharding implemented (run relevant tests per change)
- [ ] Regression suite runs on every PR (blocking merge if fails)
- [ ] False positive rate: ___% (target: < 1%)
- [ ] Test isolation verified (tests pass individually and in any order)
- [ ] Regression suite maintained (obsolete tests retired, new tests added per feature)
- [ ] Regression catch rate measured: ___% of regressions caught pre-merge
- [ ] Suite parallelized for maximum speed
- [ ] Test results clearly reported (which tests, which failures, links to logs)
- [ ] Historical test results tracked (trending, most-failed tests)

### Failure Conditions

- Flaky test rate > 5% = SUITE UNRELIABLE, fix before adding tests (score capped at 2)
- Regression suite > 60 minutes = too slow for CI, score capped at 3
- Tests not blocking merge = regressions will ship, score capped at 3
- False positive rate > 5% = team will stop trusting test results, score capped at 2
- No regression suite at all = automatic score 1

Score < 4 --> Regression reliability is the backbone of continuous delivery. Fix now.

---

## 8. RELEASE CONFIDENCE

**Question:**
When QA says "go," how confident can the organization be that the release is safe?

### Scoring Guide

- **5** -- Go/no-go accuracy > 95% (releases QA approved rarely have critical issues). Release decision backed by quantitative data (test results, coverage, performance, security). Release checklist comprehensive and completed for every release. Post-release defect rate trending down. Team trusts QA's recommendation.
- **4** -- Go/no-go accuracy > 85%. Release decision based on test results and manual verification. Checklist exists and mostly followed. Post-release defect rate stable. Team generally trusts QA.
- **3** -- Go/no-go accuracy 70-85%. Release decision partly gut feeling. Checklist incomplete or inconsistently applied. Some surprises post-release. Trust is conditional.
- **2** -- Go/no-go accuracy < 70%. Release decision is guess. No structured checklist. Frequent post-release surprises. Team does not trust QA verdict.
- **1** -- QA approval is meaningless. Releases routinely have critical issues. No release process.

### Release Confidence Checklist

- [ ] Release decision based on quantitative criteria (not just "it feels ready")
- [ ] Test execution report reviewed (pass rate, coverage, known issues)
- [ ] All critical and high-priority bugs resolved or explicitly deferred with sign-off
- [ ] Deferred bugs do not impact primary user flows
- [ ] Performance validation results reviewed
- [ ] Security scan results reviewed (no critical or high findings)
- [ ] Accessibility validation completed
- [ ] Regression suite passed (100% non-flaky tests pass)
- [ ] Exploratory testing session completed for new features
- [ ] Release notes accurate (what changed, known issues)
- [ ] Rollback plan documented and tested
- [ ] Monitoring and alerting ready for post-release verification
- [ ] Previous release post-mortem action items completed

### Release Confidence Metrics

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Go/no-go accuracy | > 95% | < 85% | < 70% |
| Post-release P0/P1 bugs | 0 | 1 | > 1 |
| Escaped defects per release | < 2 | 2-5 | > 5 |
| Rollback frequency | < 1 per quarter | 2 per quarter | > 2 per quarter |
| Release delay due to QA | < 1 day | 1-3 days | > 3 days |

### Failure Conditions

- Post-release P0 bug = score reduced by 1 per occurrence per quarter
- Release rolled back due to quality issue = score capped at 2 for that release
- Go/no-go based on incomplete test execution = score capped at 3
- Release without security scan = score capped at 2
- Release checklist not completed = score capped at 3

Score < 3 --> Release process needs overhaul. QA must be a reliable quality gate.

---

## COMPOSITE SCORING

### Score Calculation

| Dimension | Weight | Hard Fail? |
|-----------|--------|------------|
| Test Coverage | 10% | No |
| Automation ROI | 10% | No |
| Defect Detection | 15% | YES |
| Test Strategy Alignment | 15% | YES |
| Environment Reliability | 10% | No |
| Performance Validation | 10% | No |
| Regression Efficiency | 15% | YES |
| Release Confidence | 15% | YES |

### Grade Thresholds

| Grade | Score Range | Meaning |
|-------|------------|---------|
| A | 4.5 - 5.0 | Exceptional QA. High confidence in quality. |
| B | 4.0 - 4.4 | Strong QA. Reliable quality gate. Minor improvements. |
| C | 3.0 - 3.9 | Adequate QA. Gaps exist. Improvement plan required. |
| D | 2.0 - 2.9 | Insufficient QA. Quality is at risk. Immediate action. |
| F | < 2.0 | QA is not functioning. Rebuild the process. |

### Blocking Rules

- Any hard-fail dimension < 3 = release process is unreliable, escalate
- Average < 3.5 = QA cannot reliably gate releases
- Grade C = improvement plan required with 30-day milestones
- Grade D or F = QA process rebuild, external assessment recommended

---

## SCORING TEMPLATE

```
## QA Score: [Project/Product Name]
## Date: YYYY-MM-DD
## Scored By: [Name]
## Sprint/Release: [Identifier]

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Test Coverage | | |
| Automation ROI | | |
| Defect Detection | | |
| Test Strategy Alignment | | |
| Environment Reliability | | |
| Performance Validation | | |
| Regression Efficiency | | |
| Release Confidence | | |

**Weighted Average:** X.X
**Grade:** [A/B/C/D/F]
**Hard Fail Triggered:** [Yes/No -- which dimension]

### Top 3 Improvements Needed
1. [Improvement -- priority -- owner -- deadline]
2. [Improvement -- priority -- owner -- deadline]
3. [Improvement -- priority -- owner -- deadline]

### Trend
- Previous score: X.X
- Change: +/- X.X
- Direction: [Improving / Stable / Declining]

### Sign-off
- [ ] QA Lead reviewed
- [ ] Engineering Lead reviewed
- [ ] Product Owner reviewed
```

---

## WHEN TO SCORE

- Beginning of each quarter (baseline)
- After each release (release-specific)
- After QA process changes (validate improvement)
- After incidents caused by escaped defects
- When QA team composition changes significantly

---

**QA that does not measure itself cannot improve itself.**
**This scoring system is the mirror. Look honestly.**
