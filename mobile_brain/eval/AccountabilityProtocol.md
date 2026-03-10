# Mobile Brain -- Accountability Protocol (Authoritative)

This document defines the accountability framework for all mobile application work.
Every release, every crash, every user experience issue has an owner.
Every metric is tracked. Every regression is investigated.

Mobile users vote with uninstalls. There is no second impression.
This protocol ensures we never give them a reason to leave.

---

## CORE PRINCIPLES

1. **Every release has an owner.** One person is accountable for the quality of each release. Not the team -- one person.
2. **Every crash is investigated.** No crash is "acceptable" without explicit triage. Top crashes are assigned, tracked, and resolved.
3. **Every metric has a threshold.** If crash rate, startup time, or store rating crosses the threshold, work stops until it is fixed.
4. **Every regression is caught before users.** Automated tests, staged rollouts, and monitoring exist to prevent regressions from reaching 100% of users.
5. **Every platform is equal.** iOS and Android receive equal attention, equal quality, and equal accountability.

---

## SECTION 1: RELEASE OWNERSHIP

### 1.1 Release Manager Role

Each release cycle designates a Release Manager. This role rotates.

| Responsibility | Details |
|---------------|---------|
| Release readiness | Ensures all checklist items are complete |
| Staged rollout monitoring | Watches metrics during 1% -> 10% -> 50% -> 100% |
| Go/no-go decision | Decides whether to proceed or halt rollout |
| Hotfix coordination | Owns the hotfix process if rollout reveals issues |
| Release retrospective | Conducts retro within 3 days of full rollout |

### 1.2 Release Ownership Registry

Every release must record:

```
Release: [App Name] v[X.Y.Z]
Platform: [iOS / Android / Both]
Release Manager: [Name]
Release Date: YYYY-MM-DD
Key Changes: [Brief description]
Risk Assessment: [Low / Medium / High]
Rollout Strategy: [Percentage stages and timeline]
Monitoring Dashboard: [Link]
Rollback Plan: [How to revert]
```

### 1.3 Release Quality Gates

The Release Manager CANNOT proceed past each gate without verification:

| Gate | Criteria | Who Verifies |
|------|----------|-------------|
| Code Freeze | All features merged, branch cut | Release Manager |
| QA Sign-off | Review Checklist completed, all critical items PASS | QA Lead |
| Performance Sign-off | MobileScore performance dimension >= 4 | Tech Lead |
| Security Sign-off | No critical or high security findings | Security Contact |
| Store Submission | Build uploaded, metadata updated | Release Manager |
| 1% Rollout | Crash rate < 0.5%, no new critical crashes | Release Manager |
| 10% Rollout | Crash rate < 0.2%, no regressions | Release Manager |
| 50% Rollout | Metrics stable, no negative review spike | Release Manager |
| 100% Rollout | All metrics within thresholds | Release Manager |

### 1.4 Rollout Halt Criteria

The rollout MUST be halted immediately if any of these occur:

- Crash rate > 1% at any rollout stage
- ANR rate > 0.2% (Android)
- Startup time regresses > 50%
- New crash in top 5 that was not in previous release
- Data loss reported by any user
- Security vulnerability discovered
- Store rating drops > 0.3 stars in 24 hours

Halting is not failure -- it is accountability in action.

---

## SECTION 2: CRASH ACCOUNTABILITY

### 2.1 Crash Severity Classification

| Severity | Definition | Response SLA |
|----------|-----------|-------------|
| P0 | Data loss, security breach, or > 1% of sessions affected | Hotfix within 24 hours |
| P1 | Core flow blocked, > 0.5% of sessions affected | Fix in next release (expedited if needed) |
| P2 | Non-core flow affected, < 0.5% of sessions | Fix in next release |
| P3 | Edge case, < 0.01% of sessions, workaround exists | Fix in next 2 releases |

### 2.2 Crash Triage Process

**Daily (during active rollout):**
1. Review top 10 crashes by frequency
2. Classify new crashes (P0-P3)
3. Assign owner for P0 and P1 crashes
4. Update crash tracking dashboard

**Weekly (steady state):**
1. Review crash-free rate trend
2. Review top 20 crashes
3. Assign or reassign unresolved crashes
4. Update crash backlog priorities

### 2.3 Crash Investigation Requirements

Every P0 and P1 crash must have a written investigation that includes:

1. **Crash signature:** Exception type, stack trace summary
2. **Affected scope:** Percentage of users, specific OS versions, device models
3. **Root cause:** Actual code-level explanation (not "null pointer exception")
4. **Fix description:** What changed and why it resolves the issue
5. **Regression test:** Automated test that would have caught this
6. **Prevention:** What systemic change prevents this class of crash

### 2.4 Crash Rate Accountability

| Metric | Target | Warning | Critical |
|--------|--------|---------|----------|
| Crash-free users (daily) | > 99.9% | < 99.7% | < 99% |
| Crash-free sessions | > 99.95% | < 99.9% | < 99.5% |
| New crash clusters per release | < 3 | 3-5 | > 5 |
| P0 crashes open | 0 | 1 | > 1 |

When Critical threshold is hit:
1. Feature development stops
2. Entire mobile team focuses on stability
3. Root cause analysis for each top crash
4. Stability sprint until metrics return to Warning or better
5. Retrospective on why crashes were not caught pre-release

---

## SECTION 3: PERFORMANCE ACCOUNTABILITY

### 3.1 Performance Budgets

Each metric has an owner and a budget:

| Metric | Budget | Hard Limit | Owner | Measured On |
|--------|--------|------------|-------|-------------|
| Cold start | < 2s | < 5s | Platform Lead | Mid-range device (2yr old) |
| Warm start | < 500ms | < 1.5s | Platform Lead | Mid-range device |
| Scroll FPS | 60fps | > 45fps | Feature Owner | Mid-range device |
| Memory (steady) | < 200MB | < 300MB | Feature Owner | After 10 min use |
| App size (iOS) | < 50MB | < 100MB | Release Manager | IPA download |
| App size (Android) | < 30MB | < 80MB | Release Manager | AAB download |
| API P95 latency | < 200ms | < 2s | Backend Owner | Production |

### 3.2 Performance Regression Protocol

When a performance metric exceeds its budget:

1. **Immediate:** Identify which change caused the regression (git bisect if needed)
2. **24 hours:** Root cause documented, fix committed or revert decided
3. **Next release:** Fix verified in production
4. **Prevention:** CI performance test added for this metric

When a performance metric exceeds its hard limit:

1. **Immediate:** Release blocked (if pre-release) or hotfix started (if in production)
2. **Same day:** Root cause identified, fix in progress
3. **48 hours:** Fix deployed

### 3.3 Performance Review Cadence

| Cadence | Activity | Owner |
|---------|----------|-------|
| Per PR | Automated performance check (bundle size, test time) | CI/CD |
| Per release | Full performance profile on target devices | QA + Release Manager |
| Monthly | Performance trend analysis (are we getting faster or slower?) | Tech Lead |
| Quarterly | Performance budget review and adjustment | Mobile Lead |

---

## SECTION 4: STORE RATING ACCOUNTABILITY

### 4.1 Rating Monitoring

- Store rating checked daily during rollouts
- Weekly during steady state
- 1-star and 2-star reviews read individually (not just aggregated)
- Review themes categorized (crashes, UX issues, missing features, performance)

### 4.2 Rating Thresholds

| Rating | Status | Action |
|--------|--------|--------|
| > 4.5 | Healthy | Continue normal work |
| 4.0 - 4.5 | Watch | Address top review complaints in next sprint |
| 3.5 - 4.0 | Warning | Dedicated improvement sprint, review in-app rating prompt timing |
| < 3.5 | Critical | All hands on improvement, executive escalation |

### 4.3 Review Response Protocol

- All 1-star reviews responded to within 48 hours (if store allows)
- Response must be empathetic, specific, and include next steps
- Crash-related reviews: link to fix timeline
- Feature requests: acknowledge and track
- Never argue with a reviewer
- Never reveal internal information or timelines in public responses

### 4.4 In-App Rating Prompt

Rules for when to show the rating prompt:
- User has completed at least 3 key actions
- User has used the app on at least 3 separate days
- User has not been prompted in the last 90 days
- User's most recent session did not include an error
- Never prompt after a negative experience (failed payment, error screen)
- Use the native system prompt (SKStoreReviewController / In-app Review API)

---

## SECTION 5: SECURITY ACCOUNTABILITY

### 5.1 Security Finding SLAs

| Severity | Remediation SLA | Escalation If Missed |
|----------|----------------|---------------------|
| Critical | 24 hours (hotfix) | VP Engineering |
| High | 7 days (next release) | Engineering Manager |
| Medium | 30 days | Team Lead |
| Low | 90 days | Tracked in backlog |

### 5.2 Security Review Triggers

A security review is REQUIRED when:
- New third-party SDK is added
- Authentication flow is modified
- Local data storage changes
- New network endpoint is added
- Deep link handler is modified
- Any work touching payment flows
- Any work touching PII

### 5.3 Third-Party SDK Accountability

Before adding any third-party SDK:
1. Privacy review: what data does it collect? Is it disclosed in our privacy policy?
2. Size impact: how many MB does it add?
3. Performance impact: does it affect startup time?
4. Maintenance: is it actively maintained? When was the last update?
5. Security: has it been audited? Any known vulnerabilities?
6. Legal: are the license terms compatible?

Every SDK has an internal owner who is responsible for keeping it updated.

---

## SECTION 6: TESTING ACCOUNTABILITY

### 6.1 Test Coverage Requirements

| Test Type | Coverage Target | Measured By | Owner |
|-----------|----------------|-------------|-------|
| Unit tests (business logic) | > 80% | Code coverage tool | Feature Developer |
| Unit tests (ViewModels/Presenters) | > 70% | Code coverage tool | Feature Developer |
| UI tests (critical flows) | 100% of P0 flows | Flow completion | QA Lead |
| Integration tests (API) | All endpoints | Contract tests | Backend + Mobile |
| Accessibility tests | All screens | Automated scan | QA Lead |
| Performance tests | Key screens | Profiling | Performance Owner |

### 6.2 Test Reliability

- Flaky test rate must be < 2%
- Flaky tests are fixed within 5 business days or quarantined
- Quarantined tests cannot remain quarantined > 14 days
- Test suite must complete in < 15 minutes (unit) and < 30 minutes (UI)
- Test failure in CI blocks merge (no "just re-run it" culture)

### 6.3 Manual Testing Accountability

For each release, the following manual tests are required and signed off:

- [ ] Onboarding / first launch experience
- [ ] Login and authentication
- [ ] Primary user flow (end to end)
- [ ] Payment flow (if applicable)
- [ ] Push notification receipt and deep link
- [ ] Offline mode behavior
- [ ] Background / foreground transition
- [ ] Force quit and relaunch (state restoration)
- [ ] OS permission dialogs (camera, location, notifications)
- [ ] Dark mode on all key screens

Each test is signed off by name, not by team.

---

## SECTION 7: PLATFORM PARITY ACCOUNTABILITY

### 7.1 Feature Parity Tracking

Maintain a living feature matrix:

| Feature | iOS Status | Android Status | Gap Owner | Target Date |
|---------|-----------|---------------|-----------|-------------|
| [Feature] | [Shipped/In Dev/Missing] | [Shipped/In Dev/Missing] | [Name] | YYYY-MM-DD |

### 7.2 Parity Rules

- No feature ships on one platform without a plan (with date) for the other
- Feature gap > 1 release cycle requires VP sign-off with justification
- Bug severity parity: if a P0 exists on one platform, it is P0 on the other
- Performance parity: > 50% performance difference triggers investigation
- Release cadence: platforms must be within 2 weeks of each other

### 7.3 Parity Review

Monthly review of:
- Feature gaps between platforms
- Crash rate comparison between platforms
- Performance comparison between platforms
- Store rating comparison between platforms

Persistent gaps are escalated to Mobile Lead.

---

## SECTION 8: REPORTING AND METRICS

### 8.1 Mobile Health Dashboard

The following metrics must be tracked and visible to the entire team:

| Metric | Target | Warning | Critical | Cadence |
|--------|--------|---------|----------|---------|
| Crash-free rate | > 99.9% | < 99.7% | < 99% | Daily |
| ANR rate (Android) | < 0.05% | > 0.1% | > 0.2% | Daily |
| Cold start (P50) | < 2s | > 3s | > 5s | Per release |
| App size | < budget | Budget + 20% | Budget + 50% | Per release |
| Store rating | > 4.5 | < 4.0 | < 3.5 | Weekly |
| Test coverage | > 80% | < 70% | < 50% | Per PR |
| Flaky test rate | < 2% | > 5% | > 10% | Weekly |
| Release cycle time | < 2 weeks | > 3 weeks | > 4 weeks | Per release |
| Hotfix frequency | < 1/month | 2-3/month | > 3/month | Monthly |

### 8.2 Weekly Mobile Report

Must include:
1. Release status (what shipped, what is in progress)
2. Crash rate and top crash updates
3. Performance metrics vs budget
4. Store rating trend and notable reviews
5. Feature parity status
6. Test reliability metrics
7. Blockers and risks

### 8.3 Monthly Mobile Review

Must include:
1. Everything from weekly, aggregated
2. MobileScore trend per app section
3. User retention and uninstall rate correlation with releases
4. Third-party SDK audit status
5. Security finding status
6. Performance budget adjustments (if needed)
7. Team velocity and capacity planning

---

## SECTION 9: ESCALATION MATRIX

### When to Escalate

| Situation | Escalation Target | Timeline |
|-----------|-------------------|----------|
| Crash rate > 1% in production | Mobile Lead + VP | Immediate |
| P0 crash not fixed in 24 hours | Engineering Manager | Immediate |
| Store rating drops below 3.5 | Mobile Lead + Product | Same day |
| Security critical finding | Security Lead + VP | Immediate |
| Store rejection (3rd attempt) | Mobile Lead + Product | Same day |
| Release blocked > 5 days | Engineering Manager | 5 days |
| Performance hard limit exceeded | Tech Lead | Same day |
| Feature parity gap > 2 months | Mobile Lead | Monthly review |
| Hotfix frequency > 3/month | Engineering Manager | Monthly review |

### Escalation Is Prevention

Escalation is not an admission of failure. It is a request for resources and attention.
The cost of not escalating is always higher than the cost of escalating.

---

## SECTION 10: CONTINUOUS IMPROVEMENT

### 10.1 Release Retrospectives

Every release gets a retrospective within 3 business days of full rollout:
1. What went well (keep doing)
2. What went wrong (fix it)
3. What was surprising (investigate it)
4. Action items with owners and deadlines

### 10.2 Improvement Tracking

Every improvement action item must be:
1. Documented as a ticket
2. Assigned to an owner
3. Given a deadline
4. Verified after implementation
5. Tracked in the monthly report

### 10.3 Protocol Updates

This protocol is reviewed quarterly:
- Are thresholds still appropriate?
- Are SLAs achievable?
- Do new platforms or features require new protocols?
- Has the team outgrown any process?

Changes require review by Mobile Lead and Engineering Manager.

---

**Mobile quality is a team commitment enforced by individual accountability.
Every crash has an owner. Every metric has a threshold. Every regression has a response.
This protocol ensures it.**
