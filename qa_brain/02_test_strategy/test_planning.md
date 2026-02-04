# Test Planning

Systematic approaches to planning testing activities, including risk-based testing, test estimation, and test strategy documentation. Grounded in ISTQB Advanced Level Test Manager syllabus and industry practice.

---

## Risk-Based Testing

### The Risk Model

Risk-based testing allocates testing effort proportional to the risk of each feature or component.

```
Risk = Likelihood of Failure × Impact of Failure

Where:
  Likelihood = f(complexity, change frequency, developer experience, technology maturity)
  Impact = f(user impact, business impact, safety impact, regulatory impact)
```

### Risk Identification

**Technical Risk Factors (Likelihood):**

| Factor | Low Risk (1) | Medium Risk (2) | High Risk (3) |
|--------|-------------|-----------------|----------------|
| Code complexity | Simple CRUD | Business logic with conditions | Complex algorithms, concurrency |
| Change frequency | Stable, rarely changed | Moderate changes | Frequent changes, active development |
| Developer experience | Senior, domain expert | Mid-level, some domain knowledge | Junior, new to domain |
| Technology maturity | Well-established stack | Some new components | Experimental/new technology |
| Integration points | Standalone | 2-3 integrations | Many external dependencies |
| Data sensitivity | Public data | Internal data | PII, financial, health data |

**Business Risk Factors (Impact):**

| Factor | Low Impact (1) | Medium Impact (2) | High Impact (3) |
|--------|---------------|-------------------|------------------|
| User base affected | Admin users only | Subset of users | All users |
| Revenue impact | No direct revenue | Minor revenue | Core revenue stream |
| Regulatory | No regulation | Industry standards | Legal/compliance required |
| Reputation | Internal tool | B2B product | Consumer-facing, public |
| Safety | No safety concern | Indirect safety | Direct safety (medical, automotive) |
| Recovery | Easy rollback | Moderate recovery | Difficult/impossible to recover |

### Risk Matrix

```
Impact
  High │  Medium   High    Critical
       │
  Med  │  Low      Medium  High
       │
  Low  │  Info     Low     Medium
       │
       └──────────────────────────
          Low       Med     High
                Likelihood
```

### Risk-Based Test Allocation

| Risk Level | Testing Depth | Automation | Review |
|------------|--------------|------------|--------|
| **Critical** | Full test design (all techniques), performance testing, security testing | Full automation + exploratory | Formal review + pair testing |
| **High** | Equivalence partitioning + BVA + decision tables, integration testing | Full automation at unit + integration | Code review + test review |
| **Medium** | Equivalence partitioning + BVA, smoke testing | Unit tests + critical path e2e | Standard code review |
| **Low** | Smoke testing, basic happy path | Unit tests only | Self-review |
| **Info** | No dedicated testing (covered by existing regression) | Existing tests sufficient | No additional review |

### Risk Register Template

```markdown
| ID | Feature/Component | Likelihood (1-3) | Impact (1-3) | Risk Score | Mitigation | Test Approach |
|----|-------------------|-------------------|--------------|------------|------------|---------------|
| R1 | Payment processing | 2 | 3 | 6 (High) | Contract testing, idempotency | Full pyramid + security scan |
| R2 | User registration | 1 | 2 | 2 (Low) | Input validation, rate limiting | Unit + e2e happy path |
| R3 | Search indexing | 3 | 2 | 6 (High) | Retry logic, monitoring | Integration + performance |
| R4 | Admin dashboard | 1 | 1 | 1 (Info) | Access control | Existing regression |
```

---

## Test Estimation

### Work Breakdown Estimation

Break testing effort into estimatable components:

```
Total Testing Effort =
  Test Planning (10-15%) +
  Test Design (20-25%) +
  Test Environment Setup (10-15%) +
  Test Execution (30-40%) +
  Defect Retesting (10-15%) +
  Test Reporting (5-10%)
```

### Estimation Techniques

#### 1. Expert Judgment (Wideband Delphi)

Multiple experienced testers independently estimate, then converge:

```
Step 1: Present the feature to 3+ experienced testers
Step 2: Each estimates independently (in story points or hours)
Step 3: Reveal estimates simultaneously
Step 4: Discuss outliers (why did someone estimate 2x more?)
Step 5: Re-estimate until convergence (within 20% spread)
```

#### 2. Test Point Analysis (TPA)

A formal estimation method based on test case complexity:

```
Test Points = Sum(test_case_weight × complexity_factor × priority_factor)

Where:
  test_case_weight = {simple: 1, medium: 2, complex: 3}
  complexity_factor = {low: 0.5, medium: 1.0, high: 1.5}
  priority_factor = {must: 1.0, should: 0.7, could: 0.4}

Effort (hours) = Test Points × Productivity Factor
Productivity Factor = historical hours per test point (typically 0.5-2.0)
```

#### 3. Ratio-Based Estimation

Use historical ratios from similar projects:

| Project Type | Dev:Test Ratio | Notes |
|-------------|---------------|-------|
| New feature (high risk) | 1:1 | Equal development and testing effort |
| New feature (medium risk) | 2:1 | Half the development effort for testing |
| Bug fix | 3:1 | Less testing effort, targeted |
| Refactoring (with existing tests) | 4:1 | Mostly running existing tests |
| Infrastructure change | 2:1 | Integration testing dominates |

#### 4. Three-Point Estimation

```
Estimate = (Optimistic + 4 × Most Likely + Pessimistic) / 6

Example:
  Optimistic: 3 days (everything goes perfectly)
  Most Likely: 5 days (normal pace, some minor issues)
  Pessimistic: 12 days (major blockers, environment issues)
  Estimate = (3 + 20 + 12) / 6 = 5.8 days
  Standard Deviation = (12 - 3) / 6 = 1.5 days
```

---

## Test Strategy Document

### When to Write a Test Strategy

| Project Scope | Strategy Level | Document |
|---------------|---------------|----------|
| Single feature | Lightweight | Test approach section in ticket |
| Epic / multi-sprint | Standard | Test strategy document |
| New product | Comprehensive | Full test strategy + test plan |
| Regulatory / safety-critical | Formal | IEEE 829 compliant test documentation |

### Test Strategy Structure

```
1. Introduction
   ├── Purpose of this document
   ├── Project overview
   ├── Scope (in scope / out of scope)
   └── References (requirements, architecture docs)

2. Test Approach
   ├── Testing levels (unit, integration, e2e)
   ├── Testing types (functional, performance, security, a11y)
   ├── Test design techniques to be used
   └── Automation strategy (what to automate, what stays manual)

3. Risk Analysis
   ├── Risk identification (features × likelihood × impact)
   ├── Risk-based test prioritization
   └── Mitigation strategies for top risks

4. Test Environment
   ├── Environment architecture
   ├── Test data strategy
   ├── External dependencies and mocking approach
   └── Environment provisioning and teardown

5. Quality Gates
   ├── Entry criteria (when testing can start)
   ├── Exit criteria (when testing is complete)
   ├── Defect management process
   └── Go/no-go decision criteria

6. Test Schedule
   ├── Testing phases and milestones
   ├── Resource allocation
   ├── Dependencies and constraints
   └── Contingency plans

7. Metrics and Reporting
   ├── Quality metrics to track
   ├── Reporting frequency and audience
   ├── Dashboard locations
   └── Escalation triggers

8. Tools
   ├── Test management tool
   ├── Automation frameworks
   ├── CI/CD integration
   └── Monitoring and observability
```

---

## Test Plan vs. Test Strategy

| Aspect | Test Strategy | Test Plan |
|--------|--------------|-----------|
| Scope | Organization-wide or project-wide | Specific test level or test cycle |
| Duration | Long-lived, evolves slowly | Per release or per sprint |
| Author | QA lead / Test architect | QA engineer / Test lead |
| Content | Approach, principles, standards | Specific test cases, schedule, assignments |
| Changes | Infrequent, formal approval | Frequent, per-sprint updates |

---

## Entry and Exit Criteria

### Entry Criteria (Prerequisites for Testing to Begin)

| Criterion | Verification | Blocker? |
|-----------|-------------|----------|
| Code is complete and builds successfully | CI green | Yes |
| Unit tests pass | CI report | Yes |
| Code review approved | PR status | Yes |
| Test environment available | Health check | Yes |
| Test data prepared | Data verification script | Yes |
| Requirements/acceptance criteria documented | Story review | Yes |
| Dependent services available or mocked | Integration check | Partial (mock if unavailable) |

### Exit Criteria (When Testing Is Complete)

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| All critical test cases executed | 100% | Test management tool |
| All high-priority test cases executed | 100% | Test management tool |
| All medium-priority test cases executed | 95%+ | Test management tool |
| No open critical/blocker defects | 0 | Bug tracker |
| No open high defects (or accepted risk) | 0 (or risk-accepted) | Bug tracker + risk log |
| Code coverage meets threshold | Branch coverage > 80% | Coverage report |
| Performance SLOs met | All SLOs green | Performance test results |
| No known security vulnerabilities (critical/high) | 0 | Security scan report |
| Accessibility audit passed | WCAG AA compliance | a11y audit report |

---

## Sprint-Level Test Planning

For agile teams, test planning happens at multiple levels:

### Sprint Planning (Testing Perspective)

```
For each user story in the sprint:
1. Review acceptance criteria — are they testable?
2. Identify test scenarios (Three Amigos output)
3. Classify risk level (High/Medium/Low)
4. Estimate testing effort
5. Identify automation candidates
6. Identify test data needs
7. Identify environment dependencies
8. Add testing tasks to sprint backlog
```

### Daily Testing Activities

```
Daily standup contribution:
├── What testing was completed yesterday?
├── What testing is planned for today?
├── Are there any blockers?
│   ├── Environment issues?
│   ├── Missing test data?
│   ├── Unclear requirements?
│   └── Defects blocking test execution?
└── Are any defects at risk of not being fixed this sprint?
```

### Sprint Retrospective (Quality Focus)

```
Quality questions for retrospective:
├── How many defects escaped to staging/production?
├── Were our test estimates accurate?
├── Did any test environment issues block testing?
├── Were acceptance criteria clear enough to test?
├── Did we have enough time for exploratory testing?
├── What testing practices should we start/stop/continue?
└── Are there automation gaps we should address?
```

---

## Test Planning Decision Tree

```
New work arrives →
│
├── Is it a bug fix?
│   ├── Write regression test covering the bug
│   ├── Verify fix in affected environment(s)
│   └── Run related regression suite
│
├── Is it a new feature?
│   ├── Assess risk (risk matrix)
│   ├── Write test scenarios (Three Amigos)
│   ├── Design test cases (EP, BVA, decision tables)
│   ├── Identify automation candidates
│   ├── Estimate testing effort
│   └── Create test plan (lightweight or formal per risk)
│
├── Is it a refactoring?
│   ├── Verify existing tests still pass
│   ├── Assess if existing coverage is adequate
│   ├── Add tests for any uncovered behavior
│   └── Run full regression
│
└── Is it an infrastructure change?
    ├── Verify deployment pipeline works
    ├── Run smoke tests in all environments
    ├── Verify monitoring and alerting
    └── Run performance baseline comparison
```

---

## References

- ISTQB Advanced Level Test Manager Syllabus v3.0 — Chapter 2: Test Management
- van Veenendaal, E. *Practical Risk-Based Testing* (2012)
- Crispin, L. & Gregory, J. *Agile Testing* (2009) — Chapter on Test Planning
- Black, R. *Managing the Testing Process* (3rd ed., 2009)
- ISTQB Foundation Level Syllabus v4.0 — Chapter 5: Test Management
- IEEE 829 — Standard for Software and System Test Documentation

---

**A test plan without risk analysis is a wish list. A risk analysis without test execution is a paperweight.**
