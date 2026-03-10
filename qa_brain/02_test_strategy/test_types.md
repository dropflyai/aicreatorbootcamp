# Test Types

A comprehensive taxonomy of testing types with clear definitions, purposes, execution timing, and practical decision criteria. Aligned with ISTQB classification and augmented with modern practice.

---

## Functional Testing

Testing that evaluates what the system does — its features and behaviors against functional requirements.

### Smoke Testing

**Purpose:** Quickly verify that the most critical functionality works after a new build or deployment. The "does it even turn on?" check.

**Origin:** Hardware testing — if you power on a circuit board and smoke comes out, you stop testing.

**Characteristics:**
- Broad but shallow coverage
- Executes in minutes (5-15 min)
- Automated and runs on every build
- Covers core user journeys only
- Failure means the build is rejected immediately

**Example Smoke Suite:**
```javascript
describe('Smoke Tests', () => {
  test('homepage loads', async () => {
    const response = await fetch('/');
    expect(response.status).toBe(200);
  });

  test('user can log in', async () => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'test@example.com', password: 'test123' }),
    });
    expect(response.status).toBe(200);
    expect(await response.json()).toHaveProperty('token');
  });

  test('main dashboard renders', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('database connection healthy', async () => {
    const health = await fetch('/api/health');
    const data = await health.json();
    expect(data.database).toBe('connected');
  });
});
```

**When to run:** Every CI build, every deployment, every environment provisioning.

---

### Sanity Testing

**Purpose:** Narrow, focused verification that a specific function works after a targeted change. Not a broad sweep — just "does this specific thing still work?"

**Sanity vs. Smoke:**

| Aspect | Smoke | Sanity |
|--------|-------|--------|
| Scope | Broad (core journeys) | Narrow (specific function) |
| Depth | Shallow | Moderate depth on targeted area |
| Trigger | New build/deployment | Specific code change |
| Goal | "Is the build stable?" | "Does the fix actually work?" |
| Automation | Always automated | Often manual or semi-automated |

---

### Regression Testing

**Purpose:** Verify that existing functionality has not been broken by new changes. The safety net that prevents fixes from creating new problems.

**Strategies for Regression Suite Management:**

```
Full Regression:
├── Run: Before major releases, after large refactors
├── Duration: Hours to days
├── Coverage: Complete test suite
└── Frequency: Weekly or per release

Risk-Based Regression:
├── Run: Every sprint, every merge to main
├── Duration: 30-60 minutes
├── Coverage: Tests mapped to changed/impacted areas
└── Frequency: Every PR merge

Smoke Regression:
├── Run: Every build
├── Duration: 5-15 minutes
├── Coverage: Core user journeys only
└── Frequency: Every CI build
```

**Impact Analysis for Regression Selection:**
```
Code change in module X →
├── Direct tests: Tests that directly test module X
├── Integration tests: Tests that test modules calling X
├── E2E tests: User flows that traverse module X
└── Regression set = Direct ∪ Integration ∪ E2E (for module X)
```

---

### Exploratory Testing (James Bach)

**Purpose:** Simultaneously learning, test design, and test execution. The tester explores the system, discovers its behavior, and designs tests in real time based on observations.

**This is NOT random clicking.** Exploratory testing is structured, skilled, and documented.

**Session-Based Test Management (SBTM):**

```
SESSION CHARTER
═══════════════
Mission: Explore [feature/area] with [specific focus]
Time Box: 90 minutes
Environment: Staging (v2.4.1)
Tester: [Name]

AREAS TO EXPLORE:
- Primary: [main area of focus]
- Secondary: [related areas]
- Out of scope: [explicitly excluded areas]

SESSION NOTES:
[timestamp] Observation: ...
[timestamp] Question: ...
[timestamp] Bug found: ...
[timestamp] Risk identified: ...

SESSION METRICS:
- Time spent: 85 minutes
- Test design: 30%
- Test execution: 50%
- Bug investigation: 15%
- Session setup: 5%

BUGS FOUND: 3
- BUG-101: [description] (severity: high)
- BUG-102: [description] (severity: medium)
- BUG-103: [description] (severity: low)

AREAS NOT COVERED: [what remains unexplored]
CHARTER SUGGESTIONS: [follow-up sessions recommended]
```

**Heuristics for Exploratory Testing (SFDPOT — James Bach):**

| Mnemonic | Focus | Example Exploration |
|----------|-------|---------------------|
| **S**tructure | Internal components and dependencies | "What happens if the database is slow?" |
| **F**unction | What the product does | "Does discount calculation work for all customer types?" |
| **D**ata | Input/output data characteristics | "What happens with Unicode in the name field?" |
| **P**latform | Environment dependencies | "Does it work on Safari? On mobile?" |
| **O**perations | How users actually use it | "What if the user double-clicks submit?" |
| **T**ime | Time-related aspects | "What happens at midnight? During DST change?" |

---

### Acceptance Testing

**Purpose:** Verify the system meets business requirements and is acceptable for delivery. This is the final validation that the right thing was built.

**Types of Acceptance Testing:**

| Type | Who | What | When |
|------|-----|------|------|
| **User Acceptance Testing (UAT)** | End users / business stakeholders | Real-world scenarios with production-like data | Pre-release |
| **Business Acceptance Testing (BAT)** | Business analysts | Business process verification | Pre-release |
| **Contract Acceptance Testing** | Customer / procurement | Contractual requirements verification | Formal milestone |
| **Regulatory Acceptance Testing** | Compliance team | Regulatory requirement verification | Pre-release (mandatory) |
| **Alpha Testing** | Internal users at dev site | Real usage in controlled environment | Pre-beta |
| **Beta Testing** | External users at their sites | Real usage in uncontrolled environment | Pre-GA |

**BDD-Style Acceptance Criteria:**
```gherkin
Feature: Shopping Cart Checkout

  Scenario: Successful checkout with valid credit card
    Given I have items in my cart totaling $50.00
    And I am logged in as a registered customer
    When I enter valid credit card details
    And I click "Place Order"
    Then I should see an order confirmation page
    And I should receive a confirmation email
    And my credit card should be charged $50.00
    And the inventory should be reduced accordingly

  Scenario: Checkout fails with expired credit card
    Given I have items in my cart totaling $50.00
    When I enter an expired credit card
    And I click "Place Order"
    Then I should see an error message "Card expired"
    And no charge should be made
    And my cart should remain intact
```

---

## Non-Functional Testing Types

### Performance Testing

Testing how well the system performs under various conditions. Detailed coverage in `04_performance/`.

| Sub-Type | Purpose | Duration |
|----------|---------|----------|
| Load testing | Behavior under expected load | 30-60 min |
| Stress testing | Behavior beyond expected load | Until failure |
| Soak testing | Behavior under sustained load | 4-24 hours |
| Spike testing | Behavior under sudden load increase | 15-30 min |

### Security Testing

Testing the system's ability to protect data and maintain function under attack. Detailed in `05_specialized/`.

| Sub-Type | Purpose | Tools |
|----------|---------|-------|
| Vulnerability scanning | Known vulnerability detection | OWASP ZAP, Snyk |
| Penetration testing | Active exploitation attempts | Burp Suite, manual |
| Dependency scanning | Known CVEs in dependencies | npm audit, Dependabot |
| Static Application Security Testing (SAST) | Source code vulnerability patterns | SonarQube, Semgrep |
| Dynamic Application Security Testing (DAST) | Running application vulnerability testing | OWASP ZAP |

### Accessibility Testing

Verifying the system is usable by people with disabilities. Detailed in `05_specialized/accessibility_testing.md`.

| Level | Standard | Requirements |
|-------|----------|--------------|
| A | WCAG 2.1 Level A | Minimum (essential) |
| AA | WCAG 2.1 Level AA | Standard (recommended for most) |
| AAA | WCAG 2.1 Level AAA | Enhanced (aspirational) |

### Usability Testing

Evaluating how easy and satisfying the product is to use. Typically conducted with real users observing task completion.

**Metrics:**
- Task completion rate
- Time on task
- Error rate
- User satisfaction (SUS score)
- Learnability (improvement over repeated tasks)

### Compatibility Testing

Verifying the system works across different environments:

```
Browser Matrix:
├── Chrome (latest, latest-1)
├── Firefox (latest, latest-1)
├── Safari (latest, latest-1)
├── Edge (latest)
└── Mobile browsers (Chrome Android, Safari iOS)

OS Matrix:
├── Windows 10, 11
├── macOS (latest, latest-1)
├── Ubuntu LTS
├── iOS (latest, latest-1)
└── Android (latest, latest-1, latest-2)

Screen Sizes:
├── Mobile: 375px, 390px, 414px
├── Tablet: 768px, 1024px
└── Desktop: 1280px, 1440px, 1920px
```

---

## Test Type Selection Matrix

```
Change Type → Required Test Types
─────────────────────────────────────────────────
New feature (user-facing):
  ✓ Unit tests
  ✓ Integration tests
  ✓ E2E tests (critical paths)
  ✓ Exploratory testing
  ✓ Accessibility testing
  ○ Performance testing (if >100 users or data-intensive)
  ○ Security testing (if handles sensitive data)

New API endpoint:
  ✓ Unit tests
  ✓ Integration tests (database, external services)
  ✓ Contract tests (if consumed by other services)
  ✓ API-level functional tests
  ○ Load testing (if expected high traffic)
  ○ Security testing (authentication, authorization)

Bug fix:
  ✓ Regression test (proving the fix)
  ✓ Related regression suite
  ○ Exploratory testing (around the fixed area)

Refactoring:
  ✓ Existing test suite (must pass)
  ○ Coverage analysis (ensure no gaps)
  ○ Performance comparison (before/after)

Infrastructure change:
  ✓ Smoke tests
  ✓ Integration tests
  ○ Performance baseline comparison
  ○ Disaster recovery testing

Legend: ✓ = required, ○ = conditional
```

---

## Test Type Timing in CI/CD

```
Developer Machine:
└── Pre-commit: Linting, formatting, type checking

Pull Request:
├── Unit tests (all)
├── Integration tests (all)
├── E2E tests (critical paths only — smoke)
├── Accessibility scan (automated)
└── Security dependency scan

Merge to Main:
├── Full unit test suite
├── Full integration test suite
├── Full E2E test suite
├── Visual regression tests
├── Performance benchmark comparison
└── Full security scan

Pre-Release:
├── Full regression suite
├── Performance load test
├── Exploratory testing session
├── UAT (if applicable)
└── Accessibility audit

Post-Deploy:
├── Smoke tests (production)
├── Synthetic monitoring activation
├── Canary analysis (if canary deployment)
└── Real-user monitoring validation
```

---

## References

- ISTQB Foundation Level Syllabus v4.0 — Chapter 2: Testing Throughout the Software Development Lifecycle
- ISTQB Advanced Level Test Analyst — Test Types
- Bach, J. "Session-Based Test Management" (satisfice.com)
- Bach, J. "Heuristic Test Strategy Model" (satisfice.com)
- Whittaker, J. *Exploratory Software Testing* (2009)
- Kaner, C. "An Introduction to Scenario Testing" (kaner.com)

---

**The right test type for the right context. No more. No less.**
