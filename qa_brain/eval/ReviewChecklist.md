# QA Review Checklist -- Quality Gate (Authoritative)

This checklist must be completed before any release is approved by QA.
It serves as the structured verification that QA has done its job
and the product meets quality standards.

Every item must be explicitly marked PASS, FAIL, or N/A with justification.
A single unjustified FAIL in a critical section blocks the release.

---

## HOW TO USE THIS CHECKLIST

1. Copy the checklist at the beginning of each release cycle
2. Items are completed incrementally as testing progresses
3. Every item must be reviewed by the designated role
4. Mark each item: PASS / FAIL / N/A
5. N/A requires written justification
6. Any FAIL must include: root cause, impact, remediation, timeline
7. Critical section FAILs block release unconditionally
8. Non-critical FAILs require risk acceptance sign-off to proceed
9. Archive completed checklists for trend analysis

---

## SECTION 1: TEST STRATEGY VERIFICATION (CRITICAL)

### 1.1 Test Plan

- [ ] Test plan exists for this release
- [ ] Test plan covers all features in the release
- [ ] Test plan identifies risk areas with proportional test effort
- [ ] Test plan reviewed by at least one person besides the author
- [ ] Test plan includes entry and exit criteria
- [ ] Testing pyramid distribution appropriate (unit > integration > e2e)
- [ ] Non-functional testing scoped (performance, security, accessibility)

### 1.2 Test Design

- [ ] Test cases derived from requirements/acceptance criteria
- [ ] Positive test cases cover all happy paths
- [ ] Negative test cases cover invalid inputs, error conditions
- [ ] Boundary value analysis applied to numeric/string inputs
- [ ] Equivalence partitioning used to reduce redundant tests
- [ ] State transition testing for stateful features (workflows, wizards)
- [ ] Pairwise / combinatorial testing for multi-parameter features
- [ ] Test data requirements identified and prepared

### 1.3 Coverage Assessment

- [ ] Code coverage measured: ___% (target: > 80% for business logic)
- [ ] Requirement coverage: ___% of requirements have tests (target: 100%)
- [ ] Risk coverage: all high-risk areas have multiple test types
- [ ] API endpoint coverage: all endpoints have positive and negative tests
- [ ] Coverage gaps documented with risk acceptance if applicable

---

## SECTION 2: TEST EXECUTION VERIFICATION (CRITICAL)

### 2.1 Automated Test Results

- [ ] Unit test suite: ___/___  passed (target: 100%)
- [ ] Integration test suite: ___/___ passed (target: 100%)
- [ ] E2E test suite: ___/___ passed (target: 100% non-flaky)
- [ ] API contract tests: ___/___ passed (target: 100%)
- [ ] All test failures investigated (not just re-run until green)
- [ ] No tests disabled or skipped without documented justification
- [ ] Flaky tests identified and quarantined (not masking real failures)
- [ ] Test execution logs retained for audit

### 2.2 Manual Test Results

- [ ] Manual test cases executed: ___/___ (target: 100% for release scope)
- [ ] Exploratory testing session completed: ___ hours (target: >= 2 hours per feature)
- [ ] Exploratory testing charter documented
- [ ] Exploratory testing findings documented
- [ ] Cross-browser testing completed (if web)
- [ ] Cross-device testing completed (if mobile)
- [ ] Usability issues noted during testing documented

### 2.3 Regression Verification

- [ ] Full regression suite executed
- [ ] Regression suite pass rate: ___% (target: 100% non-flaky)
- [ ] Regression execution time: ___ minutes (within acceptable limit)
- [ ] No new regression failures introduced
- [ ] Previous release defects verified fixed (not regressed)
- [ ] Smoke test passed after deployment to staging

---

## SECTION 3: DEFECT MANAGEMENT (CRITICAL)

### 3.1 Defect Status

- [ ] All defects logged with proper severity and priority
- [ ] Critical defects: ___ found / ___ fixed / ___ open
- [ ] High defects: ___ found / ___ fixed / ___ open
- [ ] Medium defects: ___ found / ___ fixed / ___ open
- [ ] Low defects: ___ found / ___ fixed / ___ open
- [ ] Zero open Critical defects (hard requirement for release)
- [ ] Zero open High defects impacting primary user flows
- [ ] All deferred defects have documented justification and risk acceptance

### 3.2 Defect Quality

- [ ] Every defect has: reproduction steps, expected result, actual result
- [ ] Every defect has: severity, priority, component, environment
- [ ] Every defect has: screenshot or video (for UI issues)
- [ ] Defect root causes categorized
- [ ] Duplicate defects consolidated
- [ ] Defect fix verification completed (fixes re-tested)
- [ ] Fix verification includes regression check (fix did not break something else)

### 3.3 Defect Metrics

- [ ] Defect density calculated: ___ defects per KLOC or per feature
- [ ] Defect discovery rate plotted (are we still finding defects or stabilizing?)
- [ ] Defect severity distribution reasonable (not all "medium" -- honest severity)
- [ ] Escape rate from previous release documented: ___%
- [ ] Defect clustering identified (which modules are most defect-prone)

---

## SECTION 4: PERFORMANCE VERIFICATION

### 4.1 Load Testing

- [ ] Load test executed at expected peak traffic
- [ ] Load test executed at 2x expected peak
- [ ] Load test executed at 3x expected peak (stress test)
- [ ] Response time SLOs met under load (P50, P95, P99)
- [ ] Throughput SLOs met under load
- [ ] Error rate under load < acceptable threshold
- [ ] Resource utilization under load documented (CPU, memory, disk, network)
- [ ] No resource exhaustion at expected load

### 4.2 Performance Baselines

- [ ] Performance baselines established for key transactions
- [ ] Current performance compared to baseline
- [ ] Regression: any transaction > 20% slower than baseline investigated
- [ ] Performance improvement: any transaction > 20% faster validated as real

### 4.3 Endurance and Stability

- [ ] Soak test completed (24+ hours at expected load)
- [ ] No memory leaks detected during soak test
- [ ] No connection pool exhaustion
- [ ] No disk space accumulation (logs, temp files)
- [ ] Performance stable over extended period (no degradation)

### 4.4 Client-Side Performance (if applicable)

- [ ] Page load time / screen render time measured
- [ ] Core Web Vitals measured (if web)
- [ ] Mobile startup time measured
- [ ] Scroll/animation performance verified (60fps)
- [ ] Bundle / app size within budget

---

## SECTION 5: SECURITY VERIFICATION

### 5.1 Security Scanning

- [ ] Static Application Security Testing (SAST) executed
- [ ] SAST findings triaged: ___ critical, ___ high, ___ medium, ___ low
- [ ] Zero critical SAST findings open
- [ ] Dynamic Application Security Testing (DAST) executed (if applicable)
- [ ] Dependency vulnerability scan executed
- [ ] Zero known critical vulnerabilities in dependencies
- [ ] Container image scan executed (if applicable)

### 5.2 Security Test Cases

- [ ] Authentication tested (login, logout, session management)
- [ ] Authorization tested (role-based access, privilege escalation attempts)
- [ ] Input validation tested (XSS, SQL injection, command injection)
- [ ] Sensitive data handling verified (encryption, masking, no logging)
- [ ] API security tested (authentication, rate limiting, input validation)
- [ ] File upload security tested (type validation, size limits, malware scan)
- [ ] CSRF protection verified (if web)
- [ ] CORS configuration verified (if API)

### 5.3 Compliance

- [ ] Privacy requirements met (data collection, consent, deletion)
- [ ] Regulatory requirements met (GDPR, HIPAA, PCI-DSS as applicable)
- [ ] Audit logging verified (who did what, when)
- [ ] Data retention policies implemented and verified

---

## SECTION 6: ACCESSIBILITY VERIFICATION

### 6.1 Automated Accessibility Testing

- [ ] Automated accessibility scan completed (axe, Lighthouse, etc.)
- [ ] WCAG 2.1 AA violations: ___ (target: 0 for new features)
- [ ] Color contrast ratios verified (>= 4.5:1 text, >= 3:1 large text)
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Heading hierarchy is logical

### 6.2 Manual Accessibility Testing

- [ ] Keyboard navigation tested (all features reachable, logical tab order)
- [ ] Screen reader tested (VoiceOver, NVDA/JAWS, TalkBack)
- [ ] Screen reader can complete all critical user flows
- [ ] Focus management correct (modal focus trap, return focus on close)
- [ ] Error messages associated with form fields and announced
- [ ] Loading states communicated to assistive technology
- [ ] Motion/animation respects reduced motion preference

---

## SECTION 7: ENVIRONMENT AND DATA VERIFICATION

### 7.1 Environment Readiness

- [ ] Test environment configuration matches production
- [ ] Test environment OS/browser/device versions match supported range
- [ ] Third-party integrations tested (not just mocked)
- [ ] Environment data is representative and fresh
- [ ] PII scrubbed from test environment
- [ ] Environment stable during test execution (no outages affecting results)

### 7.2 Data Verification

- [ ] Data migration tested (if applicable)
- [ ] Backward compatibility verified (old data works with new code)
- [ ] Data integrity verified (no corruption, no orphaned records)
- [ ] Edge cases with data: empty database, maximum data volume, special characters
- [ ] Database performance verified (no slow queries under load)
- [ ] Cache behavior verified (invalidation, TTL, stale data handling)

---

## SECTION 8: RELEASE READINESS

### 8.1 Documentation

- [ ] Release notes accurate and complete
- [ ] Known issues documented
- [ ] API documentation updated (if API changes)
- [ ] User documentation updated (if UX changes)
- [ ] Runbooks updated (if operational changes)
- [ ] Monitoring dashboards updated (new metrics, alerts)

### 8.2 Deployment Readiness

- [ ] Deployment procedure documented and tested in staging
- [ ] Rollback procedure documented and tested
- [ ] Database migration reversible (if applicable)
- [ ] Feature flags configured for gradual rollout (if applicable)
- [ ] Monitoring and alerting ready for post-deployment verification
- [ ] On-call team aware of deployment and key changes

### 8.3 Risk Assessment

- [ ] Residual risks documented with mitigation plans
- [ ] Deferred defects do not impact primary user flows
- [ ] Third-party dependency risks assessed
- [ ] Rollback tested and verified (< 5 minutes)
- [ ] Customer communication prepared (if significant changes)

---

## SECTION 9: POST-RELEASE VERIFICATION

### 9.1 Smoke Test (Immediately After Deployment)

- [ ] Application is accessible
- [ ] Primary user flow works end to end
- [ ] Authentication works
- [ ] Key APIs responding correctly
- [ ] Monitoring shows healthy metrics
- [ ] No error spike in logs

### 9.2 Validation Period (First 24-48 Hours)

- [ ] Error rates within normal range
- [ ] Performance metrics within SLOs
- [ ] No new crash clusters
- [ ] Customer support tickets normal volume
- [ ] No critical user-facing issues reported

---

## SIGN-OFF

```
## QA Release Review: [Product] v[X.Y.Z]
## Date: YYYY-MM-DD
## Release Type: [Major / Minor / Patch / Hotfix]

### Results Summary
- Total items reviewed: [X]
- PASS: [X]
- FAIL: [X]
- N/A (with justification): [X]

### Critical Section Results
- Section 1 (Test Strategy): [PASS/FAIL]
- Section 2 (Test Execution): [PASS/FAIL]
- Section 3 (Defect Management): [PASS/FAIL]

### Blocking Failures
1. [Item -- severity -- impact -- remediation -- deadline]

### Deferred Items (Risk Accepted)
1. [Item -- risk -- accepted by -- date]

### Defect Summary
| Severity | Found | Fixed | Open | Deferred |
|----------|-------|-------|------|----------|
| Critical | | | | |
| High | | | | |
| Medium | | | | |
| Low | | | | |

### QA Recommendation
- [ ] RELEASE: All criteria met. Confident in quality.
- [ ] RELEASE WITH CONDITIONS: Minor gaps. Monitoring recommended.
- [ ] DO NOT RELEASE: Critical gaps. Remediation required.

### Reviewers
- QA Lead: [Name] -- Date: YYYY-MM-DD
- Dev Lead: [Name] -- Date: YYYY-MM-DD
- Product Owner: [Name] -- Date: YYYY-MM-DD

### Post-Release Monitoring Owner: [Name]
```

---

**The release checklist is the last line of defense. Complete it honestly or do not release.**
