# Cleanup

## What This Enables

Cleanup counteracts the thermodynamic tendency of software systems toward entropy.
Lehman's Law of Increasing Complexity (Lehman, 1980) states that as an evolving
system is continually changed, its complexity increases and its structure
degrades unless deliberate work is done to maintain or reduce it. Cleanup is that
deliberate work. Without it, dead code accumulates, stale feature flags create
combinatorial testing burdens, vulnerable dependencies persist, flaky tests erode
trust in the test suite, and technical debt compounds until forward progress becomes
economically irrational. This document codifies the systematic practices for dead
code removal, feature flag lifecycle management, dependency auditing, test
maintenance, tech debt governance, and the theoretical foundation for why entropy
management is a first-class engineering activity.

---

## 1. Dead Code Removal

Dead code is any code that is reachable by the compiler/interpreter but not
reachable by any production execution path. It imposes costs: cognitive load on
readers, maintenance burden during refactoring, false matches in code search,
and increased binary/bundle size.

### 1.1 Detection Strategies

| Strategy                     | Tools                           | Catches                           |
|------------------------------|---------------------------------|-----------------------------------|
| **Static reachability analysis** | Tree-shaking (webpack, esbuild), `knip`, `ts-prune` | Unreferenced exports, unused files |
| **Coverage-based detection** | Istanbul/c8, coverage.py        | Code never executed in test suite |
| **Feature flag inventory**   | Flag management platform        | Code behind permanently-off flags |
| **Import graph analysis**    | `madge`, `dependency-cruiser`   | Orphaned modules, circular deps   |
| **Version control archaeology** | `git log --diff-filter=D`    | Recently deleted then re-added code |

### 1.2 Removal Protocol

1. **Identify:** Use detection tools to produce a candidate list
2. **Verify:** Confirm the code is unreachable via both static analysis AND runtime coverage
3. **Remove:** Delete the code (do not comment it out; version control is the archive)
4. **Test:** Run full test suite to confirm no regression
5. **Document:** Reference the removal in the commit message with rationale

### 1.3 Removal Rules

- Commented-out code is dead code. Remove it. Git history preserves it.
- `TODO` comments older than 90 days without an associated ticket are dead TODOs. Create a ticket or remove.
- Unused dependencies in `package.json` / `requirements.txt` are dead dependencies. Remove them.
- Feature code behind a flag that has been OFF for > 30 days is dead code. Remove it.
- Test code for removed production code is dead test code. Remove it.

### 1.4 Cadence

Dead code audits are performed:
- **Continuously:** Automated linting rules flag unused imports and variables
- **Weekly:** `knip` or equivalent runs in CI and reports new dead code
- **Quarterly:** Full dead code audit using all five detection strategies

---

## 2. Feature Flag Cleanup Lifecycle

Feature flags that outlive their purpose become permanent conditional branches
that increase cyclomatic complexity and create a combinatorial explosion in the
testing matrix. Every flag added without a removal plan is technical debt.

### 2.1 Flag Lifecycle States

```
CREATED ──► ACTIVE ──► FULLY_ROLLED_OUT ──► CLEANUP_SCHEDULED ──► REMOVED
                │                                     │
                └──► KILLED (emergency off) ──────────┘
```

### 2.2 Lifecycle Rules

| State              | Duration Limit | Action Required                            |
|--------------------|----------------|--------------------------------------------|
| CREATED            | 0 days         | Flag is added with owner and expiration    |
| ACTIVE             | Per rollout plan| Monitored per `Implementation.md` 4.2     |
| FULLY_ROLLED_OUT   | Max 5 days     | Confirm metrics, schedule cleanup          |
| CLEANUP_SCHEDULED  | Max 2 sprints  | Remove flag, hardcode winning path         |
| REMOVED            | Terminal        | Code, config, and tests updated            |
| KILLED             | Max 1 sprint   | Investigate, then remove or re-enable      |

### 2.3 Cleanup Protocol

1. **Verify:** Confirm the flag is at 100% for all user segments
2. **Remove flag checks:** Replace conditional logic with the winning code path
3. **Remove losing path:** Delete the code for the path that was not selected
4. **Remove flag definition:** Delete from flag configuration and management platform
5. **Update tests:** Remove flag-conditional test logic; test only the winning path
6. **Deploy:** Ship the cleanup as a standalone, no-behavior-change deployment

### 2.4 Staleness Alerts

Flags that exceed their lifecycle duration limits trigger automated alerts:
- **FULLY_ROLLED_OUT > 5 days:** Warning to flag owner
- **FULLY_ROLLED_OUT > 14 days:** Escalation to tech lead
- **FULLY_ROLLED_OUT > 30 days:** Flagged as tech debt in sprint review

---

## 3. Dependency Audit

Third-party dependencies are a liability surface. Each dependency introduces:
- **Security risk:** Known vulnerabilities (CVEs)
- **License risk:** Incompatible licenses (copyleft in proprietary projects)
- **Maintenance risk:** Abandoned packages with no security patches
- **Supply chain risk:** Compromised packages (typosquatting, account takeover)

### 3.1 Audit Tools

| Ecosystem | Vulnerability Audit | License Audit         | Maintenance Check      |
|-----------|--------------------|-----------------------|------------------------|
| Node.js   | `npm audit`        | `license-checker`     | `npm-check-updates`    |
| Python    | `pip-audit`        | `pip-licenses`        | `safety`               |
| Rust      | `cargo audit`      | `cargo-deny`          | `cargo outdated`       |
| Go        | `govulncheck`      | `go-licenses`         | `go list -m -u all`    |
| Multi     | Snyk, Dependabot   | FOSSA, WhiteSource    | Renovate               |

### 3.2 Audit Cadence

| Audit Type         | Frequency    | Enforcement                              |
|--------------------|-------------|------------------------------------------|
| Vulnerability scan | Every PR     | CI gate (block on High/Critical)         |
| Full audit report  | Weekly       | Report to tech lead                      |
| License compliance | Monthly      | Report to legal/compliance               |
| Dependency freshness| Monthly     | Automated PR from Renovate/Dependabot    |
| Supply chain review| Quarterly    | Manual review of new transitive deps     |

### 3.3 Dependency Policy

| Criterion                          | Requirement                              |
|------------------------------------|------------------------------------------|
| Known critical/high CVEs           | Must be patched within SLA (see `Verification.md` 4.3) |
| License compatibility              | Must be compatible with project license  |
| Maintenance status                 | Must have a commit within the last 12 months |
| Download count / ecosystem trust   | Must not be a single-maintainer package for critical paths |
| Pinned versions                    | All production dependencies use exact versions (lockfile) |
| Transitive dependency transparency | All transitive deps audited at least quarterly |

### 3.4 Dependency Removal Criteria

A dependency should be considered for removal when:
- It is used in fewer than 3 call sites and can be replaced with < 50 lines of code
- Its maintenance has ceased (no commits in 12+ months, open CVEs unpatched)
- It introduces a license incompatibility
- It is a "convenience" dependency that wraps a trivial operation

---

## 4. Test Maintenance

### 4.1 Flaky Test Quarantine

A flaky test is one that produces non-deterministic results: sometimes passing,
sometimes failing, without any change to the code under test. Flaky tests are
corrosive because they train engineers to ignore test failures.

### Quarantine Protocol

```
1. Detection:   Test fails on retry with no code change (CI detects automatically)
2. Quarantine:  Move test to quarantine suite (still runs, but does not block CI)
3. Ticket:      Create a ticket with priority = High, assigned to test owner
4. Diagnosis:   Identify root cause (timing, ordering, shared state, external dependency)
5. Fix:         Repair the test (not skip or delete)
6. Reinstate:   Move back to main suite after 5 consecutive green runs
7. Monitor:     Watch for recurrence over next 2 weeks
```

### 4.2 Common Flakiness Root Causes

| Root Cause                  | Fix                                              |
|-----------------------------|--------------------------------------------------|
| Timing/race condition       | Use explicit waits, not sleep; mock time          |
| Shared mutable state        | Isolate test state; use setUp/tearDown            |
| Test ordering dependency    | Run tests in random order; fix shared state       |
| External service dependency | Mock external services; use contract tests        |
| Date/time sensitivity       | Freeze time in tests; avoid "today" comparisons   |
| Port conflicts              | Use dynamic port allocation                       |

### 4.3 Test Suite Health Metrics

| Metric                      | Target       | Action if Violated                    |
|-----------------------------|-------------|---------------------------------------|
| Flaky test rate             | < 0.5%      | Quarantine and fix within 1 sprint    |
| Test suite execution time   | < 10 min    | Parallelize or split suites           |
| Test coverage (changed code)| >= 80%      | Block PR until coverage met           |
| Quarantined test count      | < 5         | Sprint-level escalation               |
| Orphaned tests              | 0           | Remove with dead production code      |

---

## 5. Tech Debt Review Process

Technical debt is the implicit cost of future rework caused by choosing an
expedient solution now instead of a better approach that would take longer
(Cunningham, 1992). Not all tech debt is bad; strategic debt taken consciously
with a repayment plan is a valid engineering tradeoff.

### 5.1 Tech Debt Classification (Fowler's Quadrant)

|                    | **Deliberate**                      | **Inadvertent**                    |
|--------------------|-------------------------------------|------------------------------------|
| **Reckless**       | "We don't have time for design"     | "What's layering?"                 |
| **Prudent**        | "Ship now, refactor next sprint"    | "Now we know how we should've done it" |

Only **Prudent/Deliberate** debt is acceptable. It must be documented with a
repayment plan. All other debt is a process failure to be addressed at the
retrospective.

### 5.2 Tech Debt Inventory

Maintain a living tech debt register with the following fields:

| Field              | Description                                           |
|--------------------|-------------------------------------------------------|
| ID                 | Unique identifier (TD-001)                            |
| Title              | Brief description of the debt                         |
| Category           | Dead code, architecture, testing, dependency, infra   |
| Impact             | Low / Medium / High / Critical                        |
| Effort             | T-shirt size (S / M / L / XL)                         |
| Interest Rate      | How fast is this debt compounding? (Low/Med/High)     |
| Owner              | Engineer responsible for repayment                    |
| Repayment Plan     | Specific steps and target date                        |
| Created Date       | When the debt was incurred                            |
| Target Resolution  | Sprint or date by which debt should be resolved       |

### 5.3 Tech Debt Budget

Allocate a fixed percentage of engineering capacity to debt repayment:

| Project Phase      | Debt Budget (% of capacity) | Rationale                        |
|--------------------|-----------------------------|----------------------------------|
| Early (0-6 months) | 10%                         | Accumulation is expected         |
| Growth (6-18 months)| 20%                        | Compound interest accelerating   |
| Mature (18+ months)| 25-30%                      | Debt dominates if not managed    |

This budget is non-negotiable. Feature work cannot borrow from the debt budget
without explicit tech lead approval and a documented justification.

---

## 6. Lehman's Laws of Software Evolution (Lehman, 1980)

Manny Lehman's empirical laws, derived from studying the evolution of large
software systems over decades, provide the theoretical foundation for why
cleanup is not optional but a law of software physics.

### 6.1 The Eight Laws

| Law                          | Statement                                                       | Cleanup Implication                    |
|------------------------------|-----------------------------------------------------------------|----------------------------------------|
| I. Continuing Change         | A system must be continually adapted or it becomes progressively less satisfactory | Active maintenance is mandatory |
| II. Increasing Complexity    | As a system evolves, its complexity increases unless work is done to maintain or reduce it | Cleanup is the countervailing force |
| III. Self-Regulation         | Global system evolution is statistically self-regulating         | Metrics-driven cleanup budgets work   |
| IV. Conservation of Organizational Stability | Average effective global activity rate is invariant over the product lifetime | Cannot "sprint" through tech debt |
| V. Conservation of Familiarity | Incremental growth and long-term growth rate tend to decline | Cleanup preserves team velocity |
| VI. Continuing Growth        | Functional content must be continually increased to maintain user satisfaction | New features demand old code cleanup |
| VII. Declining Quality       | Quality will appear to decline unless rigorously maintained      | Quality requires active investment |
| VIII. Feedback System        | Evolution processes are multi-loop, multi-agent feedback systems | Retrospectives drive cleanup priorities |

### 6.2 Practical Application

Lehman's Law II is the most operationally relevant: complexity increases
monotonically unless explicit countermeasures are applied. This means:

- **Every feature addition increases the cleanup obligation**
- **Skipping cleanup does not save time; it borrows time at interest**
- **The interest rate is superlinear:** a system with 2x the debt does not
  take 2x the effort to maintain; it takes 3-4x (per empirical studies)
- **Cleanup velocity must be proportional to feature velocity** to maintain
  sustainable development pace

This is not a philosophical position. It is an empirical observation from
50+ years of software evolution research.

---

## 7. Cleanup Cadence Summary

| Activity                     | Frequency    | Owner              | Governance               |
|------------------------------|--------------|--------------------|--------------------------|
| Dead code lint               | Every PR     | Author             | CI gate                  |
| Feature flag staleness check | Daily        | Automated          | Alert to flag owner      |
| Dependency vulnerability scan| Every PR     | Automated          | CI gate                  |
| Flaky test quarantine        | Continuous   | Automated + author | CI quarantine suite      |
| Dead code audit (full)       | Quarterly    | Tech lead          | Sprint planning          |
| Dependency freshness update  | Monthly      | Automated (Renovate)| PR review               |
| License compliance audit     | Monthly      | Tech lead          | Compliance report        |
| Tech debt review             | Every sprint | Team               | Sprint retrospective     |
| Supply chain audit           | Quarterly    | Security lead      | Security review          |

---

## Cross-References

- Feature flag lifecycle begins in `Implementation.md` Section 4
- Dependency CVE response SLAs defined in `Verification.md` Section 4.3
- Database migration cleanup (contract phase) in `Shipping.md` Section 5
- Tech debt feeds into engineering scoring (`../Score.md`)
- Dead code removal patterns in `../Patterns/`
- Cleanup automation recipes in `../Automations/`
- Lehman's laws inform long-term architecture decisions (`Design.md`)

---

## Key References

- Cunningham, W. (1992). The WyCash Portfolio Management System. *OOPSLA '92 Experience Report*.
- Fowler, M. (2009). TechnicalDebtQuadrant. martinfowler.com.
- Lehman, M.M. (1980). Programs, Life Cycles, and Laws of Software Evolution. *Proceedings of the IEEE*, 68(9).
- Lehman, M.M. & Ramil, J.F. (2001). Rules and Tools for Software Evolution Planning and Management. *Annals of Software Engineering*, 11(1).
- Tornhill, A. (2015). *Your Code as a Crime Scene*. Pragmatic Bookshelf.
