# QA Brain -- Benchmark Tests (Authoritative)

These benchmark scenarios test the QA Brain's ability to design test strategies,
optimize automation, manage defects, and make sound release decisions under pressure.
Each scenario must be approached with the rigor of a senior QA architect.

Testing is not about finding bugs. It is about providing information for decisions.
Demonstrate that you understand the difference.

---

## HOW TO USE THESE BENCHMARKS

1. Each scenario presents a realistic quality assurance challenge
2. The QA Brain must produce a complete, actionable response
3. Responses are scored against the criteria listed with each scenario
4. Minimum passing score: meet ALL required criteria for the scenario
5. Scenarios are grouped by domain -- complete at least 3 from each group

---

## GROUP A: TEST STRATEGY AND PLANNING

### Scenario A1: Payment Processing Test Strategy

**Context:** New payment processing feature handles 10 currencies (USD, EUR, GBP, JPY,
CAD, AUD, CHF, CNY, INR, BRL), 3 payment methods (credit card, bank transfer, digital
wallet), 4 card networks (Visa, Mastercard, Amex, Discover), and must be PCI-DSS
compliant. Feature includes: payment initiation, 3D Secure authentication,
partial refunds, recurring payments, and currency conversion.

**Challenge:** Write the complete test strategy for this feature.

**Required in response:**
- [ ] Risk assessment (what are the highest-risk combinations and scenarios)
- [ ] Test types needed (unit, integration, e2e, performance, security, compliance)
- [ ] Combinatorial analysis (how to handle 10 x 3 x 4 matrix without testing everything)
- [ ] Pairwise testing application (which combinations, which can be skipped)
- [ ] PCI-DSS specific test requirements (data handling, logging, encryption)
- [ ] Security testing approach (injection, authentication bypass, data exposure)
- [ ] Performance testing approach (concurrent payments, peak load, timeout handling)
- [ ] Test data strategy (test card numbers, sandbox environments, synthetic data)
- [ ] Negative test cases (declined cards, insufficient funds, network timeout, fraud)
- [ ] Regression impact analysis (what existing features might break)
- [ ] Compliance evidence collection (what artifacts to retain for audit)
- [ ] Estimated test effort (hours, distributed across test types)

---

### Scenario A2: Microservices Test Strategy

**Context:** Monolith decomposed into 12 microservices. Services communicate via REST APIs
and event queues. Each service has its own database. Team has 3 QA engineers and
40 developers. CI/CD pipeline exists but only runs unit tests currently.
Deployments are service-independent (any service can deploy any time).

**Challenge:** Design the testing strategy for the microservices architecture.

**Required in response:**
- [ ] Test pyramid for microservices (different from monolith pyramid)
- [ ] Contract testing strategy (consumer-driven contracts, Pact or similar)
- [ ] Integration testing approach (which integrations to test, how)
- [ ] Service virtualization for dependent services
- [ ] End-to-end testing strategy (what to test e2e vs what to trust from contracts)
- [ ] Event queue testing (message format, ordering, idempotency, dead letters)
- [ ] Data consistency testing across services
- [ ] Deployment testing (canary, blue/green verification)
- [ ] Chaos testing recommendations (what to inject, where)
- [ ] CI/CD pipeline design (what runs when, parallelization)
- [ ] Test environment strategy (ephemeral per PR vs shared)
- [ ] QA team allocation (3 QA across 12 services -- how?)

---

### Scenario A3: Migration Test Strategy

**Context:** Enterprise application migrating from on-premise Oracle database to
AWS Aurora PostgreSQL. 500 tables, 2TB of data, 300 stored procedures,
50 scheduled jobs. Application has 200 active users and handles financial data
(audit trail required). Migration must happen with < 4 hours downtime.

**Challenge:** Design the migration testing strategy.

**Required in response:**
- [ ] Data validation approach (row counts, checksums, sampling, full compare)
- [ ] Schema compatibility testing (data types, constraints, indexes)
- [ ] Stored procedure migration verification (Oracle to PostgreSQL syntax)
- [ ] Performance comparison (before vs after migration for key queries)
- [ ] Application regression testing (all features work with new database)
- [ ] Data integrity verification (referential integrity, audit trail continuity)
- [ ] Rollback testing (can we revert to Oracle if Aurora has issues)
- [ ] Scheduled job verification (all 50 jobs run correctly on new platform)
- [ ] Cutover rehearsal plan (practice the 4-hour window end to end)
- [ ] User acceptance testing approach
- [ ] Post-migration monitoring (what to watch for first 72 hours)
- [ ] Test timeline aligned with migration phases

---

### Scenario A4: Mobile App Test Strategy for Multiple Markets

**Context:** Mobile app launching in 5 markets (US, UK, Germany, Japan, Brazil).
Each market has: different language, different regulations (GDPR, LGPD, etc.),
different payment providers, different date/number formats, and
different content moderation rules. App supports iOS 15+ and Android 10+.

**Challenge:** Design the test strategy that covers localization, compliance, and functionality.

**Required in response:**
- [ ] Localization testing approach (string completeness, layout, RTL if applicable)
- [ ] Internationalization testing (date formats, currency, number separators, time zones)
- [ ] Per-market compliance testing (what is different per regulation)
- [ ] Payment provider testing per market
- [ ] Device and OS version matrix (which combinations per market)
- [ ] Performance testing per market (CDN, API latency from each region)
- [ ] Content moderation testing per market rules
- [ ] Accessibility testing per market requirements
- [ ] Test data per market (valid phone numbers, addresses, tax IDs)
- [ ] Automation approach for multi-market testing
- [ ] Manual testing allocation (which markets need more manual focus)
- [ ] Launch sequence recommendation (which market first, why)

---

### Scenario A5: AI/ML Feature Test Strategy

**Context:** Application integrating an AI-powered recommendation engine. The model
recommends products based on user behavior, purchase history, and similar user patterns.
Requirements: recommendations must be "relevant" (click-through rate > 5%),
must not recommend out-of-stock items, must respect user preferences (blocked categories),
must not exhibit bias (demographic parity), and model updates deploy weekly.

**Challenge:** Design the test strategy for the AI/ML feature.

**Required in response:**
- [ ] Functional testing (recommendations appear, respect filters, handle edge cases)
- [ ] Data pipeline testing (input data quality, transformation correctness)
- [ ] Model output validation (format, range, constraints)
- [ ] Relevance testing (how to measure "relevant" before production traffic)
- [ ] Bias testing methodology (what metrics, what thresholds)
- [ ] A/B testing framework for model comparison
- [ ] Cold start testing (new user with no history)
- [ ] Edge case testing (user with no purchases, item with no views, new item)
- [ ] Performance testing (recommendation latency under load)
- [ ] Model regression testing (new model vs previous model on known inputs)
- [ ] Monitoring strategy for production (drift detection, performance degradation)
- [ ] Rollback testing (revert to previous model quickly)

---

## GROUP B: TEST AUTOMATION

### Scenario B1: Test Suite Optimization

**Context:** Test suite takes 45 minutes to run. Product team wants 10-minute feedback
on every PR. Suite composition: 2,000 unit tests (5 minutes), 500 integration tests
(15 minutes), 200 e2e tests (25 minutes). Flaky test rate: 8%. CI infrastructure:
8 parallel runners. 80 PRs per week.

**Challenge:** Design the optimization strategy to achieve 10-minute feedback.

**Required in response:**
- [ ] Analysis of where time is spent (which test types, which specific tests)
- [ ] Flaky test remediation plan (8% to < 2%)
- [ ] Test parallelization strategy (how to distribute across 8 runners)
- [ ] Test selection/sharding strategy (run only relevant tests per change)
- [ ] Integration test optimization (in-memory databases, service virtualization)
- [ ] E2E test optimization (parallel execution, headless, shared setup)
- [ ] CI pipeline restructuring (what runs when, fast feedback vs full suite)
- [ ] Cost analysis (more runners vs test optimization)
- [ ] Migration timeline with measurable milestones
- [ ] Monitoring to verify improvements are sustained

---

### Scenario B2: Automation Framework Selection

**Context:** Growing startup, 15 developers, 2 QA engineers. Product is a web application
(React frontend, Node.js backend, PostgreSQL database, REST API).
No existing test automation. Manual regression takes 5 days before each biweekly release.
Budget is constrained. Team has JavaScript expertise but limited test automation experience.

**Challenge:** Select and design the automation framework stack.

**Required in response:**
- [ ] Framework selection for each test level (unit, integration, API, e2e) with justification
- [ ] Why this framework over alternatives (comparison matrix)
- [ ] Architecture design (page objects, fixtures, test data management)
- [ ] CI/CD integration plan (when tests run, what blocks merge)
- [ ] Test data strategy (factories, fixtures, database seeding)
- [ ] Environment strategy (local, CI, staging)
- [ ] Getting started plan (first 10 tests to write, which flows)
- [ ] Ramp-up timeline (weeks to first value, months to full coverage)
- [ ] Maintenance plan (who maintains, how much time per sprint)
- [ ] Training plan for the team
- [ ] Success metrics (how to know automation is working)

---

### Scenario B3: Flaky Test Epidemic

**Context:** Team has 300 automated e2e tests. 25 are consistently flaky (pass sometimes,
fail sometimes). Team has adopted the practice of re-running failed tests up to 3 times.
Test results are no longer trusted. Developers ignore test failures.
"Just re-run it" is the standard response. Real bugs are hiding in the noise.

**Challenge:** Fix the flaky test problem and restore trust in the test suite.

**Required in response:**
- [ ] Flaky test identification methodology (how to find all flaky tests systematically)
- [ ] Root cause categorization (timing, data, environment, ordering, async, shared state)
- [ ] Triage process (fix, quarantine, or delete each flaky test)
- [ ] Quarantine strategy (separate suite, visibility, SLA for fix)
- [ ] Fix patterns for each root cause category
- [ ] Anti-retry policy (why retrying masks problems, how to stop)
- [ ] Trust restoration plan (how to get developers to look at test results again)
- [ ] Prevention measures (test design patterns that prevent flakiness)
- [ ] Monitoring for new flaky tests (detect before they spread)
- [ ] Success metric and timeline (flaky rate target and when to achieve it)

---

### Scenario B4: Visual Regression Testing

**Context:** Design system with 50 components, each with 3-5 states and 2 themes
(light/dark). Total: ~400 visual states. Manual visual review takes 2 days per release.
Designers report that visual regressions ship regularly (spacing changes,
color shifts, font rendering issues). Need automated visual regression testing.

**Challenge:** Design and implement the visual regression testing strategy.

**Required in response:**
- [ ] Tool selection (Chromatic, Percy, BackstopJS, Playwright screenshots) with justification
- [ ] Snapshot strategy (what to capture: components, pages, responsive breakpoints)
- [ ] Baseline management (how baselines are updated, who approves)
- [ ] Threshold configuration (pixel diff tolerance, anti-aliasing handling)
- [ ] Integration with component library (Storybook, isolated component rendering)
- [ ] CI/CD integration (when to run, how to report results)
- [ ] Review workflow (who reviews visual diffs, approval process)
- [ ] Theme and responsive testing (dark mode, mobile/tablet/desktop)
- [ ] Performance (how long the visual test suite takes, parallelization)
- [ ] False positive management (fonts, animation frames, dynamic content)
- [ ] Cost analysis (tool licensing, CI compute time)

---

### Scenario B5: API Test Automation at Scale

**Context:** Platform has 150 API endpoints across 8 microservices. Endpoints have
complex business rules, role-based access control (5 roles), and interdependencies
(order requires product and user). Currently: 30% of endpoints have automated tests.
New endpoints added weekly. No contract testing. Production incidents from API
breaking changes are monthly.

**Challenge:** Design the API testing automation strategy to prevent breaking changes.

**Required in response:**
- [ ] API test framework selection (Postman/Newman, RestAssured, Supertest, Karate)
- [ ] Contract testing implementation (Pact, API schema validation, OpenAPI)
- [ ] Test categorization (smoke, functional, security, performance per endpoint)
- [ ] Role-based access testing strategy (5 roles x 150 endpoints)
- [ ] Request/response validation approach (schema, business rules, error formats)
- [ ] Dependency management (how to handle service interdependencies in tests)
- [ ] Data setup and teardown strategy
- [ ] CI/CD integration (contract tests on PR, full suite on merge)
- [ ] Coverage tracking (which endpoints are tested, which are not)
- [ ] Breaking change detection (how to catch before production)
- [ ] Prioritization (which 120 untested endpoints to automate first)
- [ ] Timeline to reach 100% endpoint coverage

---

## GROUP C: DEFECT MANAGEMENT AND TRIAGE

### Scenario C1: Critical Bug Before Release

**Context:** QA finds a critical bug 1 hour before scheduled release. The bug:
corrupts user data when editing a profile field that contains emoji characters.
Affects approximately 15% of user profiles (based on emoji usage analysis).
Release contains 3 months of work from 20 developers. Marketing has announced
the launch date. Customers are expecting new features.

**Challenge:** Walk through the complete triage and decision process.

**Required in response:**
- [ ] Immediate assessment (scope, impact, reproducibility)
- [ ] Stakeholder notification (who to tell, what to tell them, when)
- [ ] Impact analysis (which users affected, what data is at risk, reversibility)
- [ ] Decision framework (release, delay, release without feature, hotfix plan)
- [ ] If delay: communication plan, timeline for fix, re-testing scope
- [ ] If release with fix: minimum testing required, risk of fix being worse
- [ ] If release without feature: feature flag approach, scope of re-testing
- [ ] Rollback plan if released and bug manifests in production
- [ ] Root cause analysis (why was this not caught earlier in the cycle)
- [ ] Process improvement (what changes prevent this class of last-minute discovery)

---

### Scenario C2: Defect Escape Analysis

**Context:** Last 3 releases had the following escaped defects:
- Release 1: Payment rounding error (found by customer, $50K in incorrect charges)
- Release 2: Search returning results from other tenants (found by customer, security)
- Release 3: CSV export crashes on > 10K rows (found by customer, data loss)

All three were missed by QA despite having test plans for each feature.
Engineering leadership is questioning QA effectiveness.

**Challenge:** Analyze the escapes and redesign the QA approach to prevent recurrence.

**Required in response:**
- [ ] Per-defect root cause analysis (why was it not caught? What test gap?)
- [ ] Pattern analysis across the 3 escapes (common themes, systemic issues)
- [ ] Test strategy gaps identified (what types of tests were missing)
- [ ] Payment rounding: test design improvements (boundary values, currency-specific)
- [ ] Multi-tenant isolation: test design improvements (cross-tenant verification)
- [ ] Large data: test design improvements (volume testing, boundary testing)
- [ ] Process improvements (shift-left, risk assessment, exploratory testing)
- [ ] Metrics to track improvement (escape rate target, time to detect)
- [ ] QA capability assessment (does the team have the right skills and tools)
- [ ] Communication plan to engineering leadership (accountability + improvement plan)
- [ ] Timeline for implementing improvements

---

### Scenario C3: Defect Prioritization Under Resource Constraints

**Context:** Sprint ends in 3 days. Open defect backlog:
- 2 Critical: payment failure for Amex cards, data export missing last column
- 5 High: search relevance degraded, slow page load on dashboard, broken pagination,
  incorrect email template, mobile layout broken on Android 10
- 12 Medium: various UI issues, minor calculation errors, tooltip text wrong
- 8 Low: cosmetic issues, typos, minor alignment problems

Development capacity remaining: 5 developer-days. QA capacity: 3 QA-days.
Not everything can be fixed and tested.

**Challenge:** Make the prioritization and release decision.

**Required in response:**
- [ ] Prioritization framework (criteria used to rank defects)
- [ ] Estimated effort per defect (dev time + QA time)
- [ ] Recommended fix list that fits within 5 developer-days
- [ ] Regression testing scope for each fix
- [ ] Deferred defect justification (why each deferred defect is acceptable)
- [ ] Risk assessment for releasing with deferred defects
- [ ] Workaround documentation for deferred user-facing defects
- [ ] Go/no-go recommendation with quantitative justification
- [ ] Post-release plan for deferred defects
- [ ] Communication to stakeholders (what ships, what does not, why)

---

### Scenario C4: Regression Investigation

**Context:** After a routine dependency update (React 18.2 to 18.3), the test suite
shows 47 failures out of 500 tests. Failures span multiple test types:
15 unit test failures (snapshot mismatches), 20 integration test failures
(timing-related), 12 e2e test failures (element not found). No functional
changes were made. The dependency update was supposed to be non-breaking.

**Challenge:** Investigate, categorize, and resolve the test failures.

**Required in response:**
- [ ] Triage methodology (how to efficiently categorize 47 failures)
- [ ] Categorization: real bugs vs test issues vs expected changes
- [ ] Snapshot test analysis (are the changes cosmetic or behavioral?)
- [ ] Timing-related failures analysis (are these flaky or real race conditions?)
- [ ] Element-not-found analysis (DOM changes, timing, rendering changes?)
- [ ] Decision framework for each category (update test, fix code, report to library)
- [ ] Systematic fix approach (which to fix first, how to batch similar fixes)
- [ ] Verification that fixes are correct (not just making tests pass again)
- [ ] Changelog review for the dependency update (what actually changed)
- [ ] Process improvement (how to handle dependency updates more safely)

---

### Scenario C5: Production Incident Post-Mortem

**Context:** Production outage: 4 hours of degraded service. Root cause:
database query added in the latest release performs a full table scan on a table
with 50 million rows. Query was not caught in code review, was not covered
by performance tests (test database has only 1,000 rows), and was deployed
without issue in staging (staging database has 10,000 rows).

**Challenge:** Conduct the QA-focused post-mortem and design prevention measures.

**Required in response:**
- [ ] QA perspective on why this was not caught (testing gaps analysis)
- [ ] Test data representativeness problem (1K rows vs 50M rows)
- [ ] Performance testing gaps (what should have been tested, was not)
- [ ] Code review process improvement (query plan review for data-touching changes)
- [ ] Test environment parity improvement plan
- [ ] Specific test to add that would have caught this
- [ ] Performance testing strategy for database-heavy features
- [ ] Data volume testing approach (how to test at scale without production data)
- [ ] Deployment safety nets (canary deployment with performance monitoring)
- [ ] Metrics and monitoring improvements
- [ ] Action items with owners and deadlines

---

## GROUP D: SPECIALIZED TESTING

### Scenario D1: Chaos Engineering Test Plan

**Context:** Distributed system with 8 microservices, 3 databases, 2 message queues,
and external payment and email providers. System claims 99.9% availability SLO.
No chaos testing has been performed. Recent incidents suggest the system is
more fragile than assumed.

**Challenge:** Design the chaos engineering test plan.

**Required in response:**
- [ ] Chaos engineering principles (why, when, how -- not just break things)
- [ ] Steady-state hypothesis for each experiment
- [ ] Experiment catalog (what to inject: latency, failure, partition, resource exhaustion)
- [ ] Priority order (which experiments first, based on risk)
- [ ] Blast radius control (how to limit impact of experiments)
- [ ] Tooling selection (Chaos Monkey, Litmus, Gremlin, custom)
- [ ] Environment strategy (start in staging, graduate to production)
- [ ] Monitoring during experiments (what to watch, when to abort)
- [ ] Expected findings and remediation patterns
- [ ] Schedule and cadence (how often, who runs experiments)
- [ ] Documentation and knowledge sharing from experiments
- [ ] Integration with incident response (experiments inform runbooks)

---

### Scenario D2: Compliance Testing (SOC 2 + HIPAA)

**Context:** SaaS healthcare platform needs SOC 2 Type II and HIPAA compliance.
Platform handles PHI (patient health information). Audit is in 6 months.
Current testing: functional tests only. No compliance-specific testing.
No evidence collection. Auditor will need proof that controls are tested.

**Challenge:** Design the compliance testing strategy.

**Required in response:**
- [ ] SOC 2 control categories relevant to testing (CC6, CC7, CC8)
- [ ] HIPAA technical safeguard requirements mapped to tests
- [ ] Access control testing (authentication, authorization, audit trails)
- [ ] Data protection testing (encryption at rest, in transit, PHI handling)
- [ ] Audit logging testing (completeness, immutability, retention)
- [ ] Breach notification testing (detection, alerting, communication)
- [ ] Business continuity testing (backup, recovery, failover)
- [ ] Vulnerability management testing (scanning, patching, validation)
- [ ] Evidence collection approach (automated where possible)
- [ ] Test execution schedule aligned with audit timeline
- [ ] Gap analysis (what is missing vs what is needed for audit)
- [ ] Documentation requirements for auditor

---

### Scenario D3: Accessibility Testing Program

**Context:** Enterprise web application with 100 screens. No accessibility testing
has ever been performed. Legal team received an ADA compliance inquiry.
Application is used by government agencies (Section 508 applies).
Budget: 2 QA engineers can spend 50% of their time for 3 months.

**Challenge:** Build the accessibility testing program from scratch.

**Required in response:**
- [ ] WCAG 2.1 AA criteria mapped to testable items
- [ ] Automated testing tool selection and setup (axe, Lighthouse, pa11y)
- [ ] Manual testing methodology (keyboard, screen reader, visual)
- [ ] Screen reader testing approach (which readers, which browsers)
- [ ] Prioritization of 100 screens (which to test first, by user impact)
- [ ] Common issue patterns to check (contrast, labels, focus, landmarks)
- [ ] Remediation tracking (how to report, track, verify fixes)
- [ ] Developer training plan (prevent new violations)
- [ ] CI integration for automated accessibility checks
- [ ] Regression testing (prevent fixed issues from returning)
- [ ] Reporting for legal team (compliance status, progress, timeline)
- [ ] Timeline with milestones for the 3-month program

---

### Scenario D4: Data Quality Testing

**Context:** Data pipeline processes 10 million events daily from 15 sources.
Pipeline: ingestion -> validation -> transformation -> enrichment -> storage -> API.
Recent incidents: duplicate records in analytics, missing fields causing downstream
failures, timezone inconsistencies between sources, and stale cached data
served to users.

**Challenge:** Design the data quality testing strategy.

**Required in response:**
- [ ] Data quality dimensions to test (completeness, accuracy, consistency, timeliness, uniqueness)
- [ ] Per-stage testing approach (what to validate at each pipeline stage)
- [ ] Schema validation strategy (input schema, output schema, evolution)
- [ ] Duplicate detection and prevention testing
- [ ] Data freshness testing (SLA for data availability)
- [ ] Cross-source consistency testing (do sources agree?)
- [ ] Transformation correctness testing (input -> expected output)
- [ ] Volume testing (10M events, peak handling, backpressure)
- [ ] Monitoring and alerting for data quality (automated, not manual)
- [ ] Data reconciliation approach (end-to-end record count, checksum)
- [ ] Tooling selection (Great Expectations, dbt tests, custom)
- [ ] Incident response for data quality issues (notification, investigation, remediation)

---

### Scenario D5: IoT Device Testing

**Context:** Smart home device (thermostat) with mobile app and cloud backend.
Device firmware, mobile app (iOS + Android), and cloud API all need testing.
Device has limited memory (256KB RAM), communicates via BLE and WiFi,
receives OTA firmware updates, and must work offline when cloud is unreachable.

**Challenge:** Design the complete testing strategy for the IoT ecosystem.

**Required in response:**
- [ ] Firmware testing approach (unit tests on embedded, hardware-in-loop)
- [ ] BLE communication testing (pairing, data transfer, reconnection)
- [ ] WiFi connectivity testing (WPA2/3, network switching, poor signal)
- [ ] Mobile app testing (pairing flow, device control, offline behavior)
- [ ] Cloud API testing (device registration, telemetry, commands)
- [ ] OTA update testing (successful update, interrupted update, rollback)
- [ ] Offline behavior testing (device operates independently, syncs later)
- [ ] Interoperability testing (multiple devices, different firmware versions)
- [ ] Security testing (firmware extraction, BLE sniffing, cloud API auth)
- [ ] Environmental testing (temperature range, power cycling, memory constraints)
- [ ] End-to-end scenario testing (user adjusts temp -> device responds -> cloud records)
- [ ] Long-duration testing (device stability over weeks of operation)

---

## GROUP E: PROCESS AND LEADERSHIP

### Scenario E1: QA Transformation

**Context:** Organization's QA is entirely manual. 10 manual testers, 80 developers.
Test cycle takes 2 weeks before each monthly release. Development wants to move
to weekly releases. Testers have no automation skills. Budget for 2 new automation
engineers approved. Current manual testers are anxious about their future.

**Challenge:** Design the QA transformation plan.

**Required in response:**
- [ ] Vision: target state for QA in 12 months
- [ ] Training plan for existing manual testers (what skills, how to learn)
- [ ] Automation engineer hiring and onboarding plan
- [ ] Phase 1 (months 1-3): quick wins and foundation
- [ ] Phase 2 (months 4-6): automation scaling and test reduction
- [ ] Phase 3 (months 7-12): developer-owned testing and QA as enablers
- [ ] Manual testing that remains valuable (exploratory, usability, edge cases)
- [ ] Metrics to track transformation progress
- [ ] Risk mitigation (what if automation takes longer? what if testers cannot upskill?)
- [ ] Communication plan (managing anxiety, celebrating progress)
- [ ] Budget breakdown (tools, training, hiring)
- [ ] Success criteria at each phase

---

### Scenario E2: Quality Metrics Program

**Context:** VP of Engineering asks: "How good is our quality? Are we getting better
or worse?" QA team has no metrics program. Defects are tracked in Jira but
not analyzed. No one knows the escape rate, defect density, or test effectiveness.

**Challenge:** Design the quality metrics program from scratch.

**Required in response:**
- [ ] Metric selection (which metrics matter, which are vanity)
- [ ] Leading indicators (predict quality) vs lagging indicators (measure quality)
- [ ] Per-metric: definition, data source, calculation, target, audience
- [ ] Dashboard design (what stakeholders see, drill-down capability)
- [ ] Data collection automation (minimize manual data entry)
- [ ] Reporting cadence (who sees what, how often)
- [ ] Metric interpretation guide (what each metric means, what to do when it changes)
- [ ] Anti-gaming measures (how to prevent metrics from being gamed)
- [ ] Baseline establishment plan (measure current state before setting targets)
- [ ] Continuous improvement loop (how metrics drive action)
- [ ] Tool selection for metrics collection and visualization
- [ ] Timeline to first actionable report

---

### Scenario E3: Shift-Left Implementation

**Context:** Defect analysis reveals: 60% of defects originate in requirements,
25% in design, 15% in code. But testing starts only after code is complete.
Average defect costs: requirements phase $100, design phase $500,
code phase $1,000, testing phase $5,000, production $50,000.
Organization wants to shift testing left.

**Challenge:** Design the shift-left testing implementation plan.

**Required in response:**
- [ ] Requirements testing (how to test requirements before they become code)
- [ ] Design testing (how to validate design decisions early)
- [ ] Developer testing enablement (how to help developers write better tests)
- [ ] TDD adoption strategy (realistic, not dogmatic)
- [ ] Code review quality gate (what QA contributes to code reviews)
- [ ] Static analysis integration (what tools, what rules)
- [ ] Pair testing / mob testing sessions
- [ ] Acceptance criteria review process (QA involved before development)
- [ ] Defect prevention vs defect detection metrics
- [ ] Cultural change management (shifting mindsets, not just processes)
- [ ] ROI projection (cost savings from earlier defect detection)
- [ ] Implementation timeline with realistic milestones

---

## SCORING GUIDE

### Per-Scenario Scoring

| Criteria | Points |
|----------|--------|
| All required items addressed | 40 |
| Technical accuracy and depth | 20 |
| Practicality (can actually be implemented with real constraints) | 15 |
| Trade-off analysis (what you gain and lose with each decision) | 10 |
| Stakeholder awareness (different audiences need different things) | 10 |
| Measurability (how do you know it is working) | 5 |

### Passing Threshold

- Individual scenario: >= 70 points
- Overall benchmark: >= 75% of scenarios passed
- No GROUP with 0 passes

### Disqualifying Responses

- "Test everything" without prioritization
- No risk-based thinking (treating all features as equal risk)
- Ignoring resource constraints (unlimited time, people, tools)
- No measurement plan (how do you know it is working?)
- Theoretical answers without practical implementation steps
- Solutions that require halting all development
- Ignoring the human element (training, communication, buy-in)

---

**QA is about providing the right information at the right time for the right decisions.**
**These benchmarks verify you can do that under realistic constraints.**
