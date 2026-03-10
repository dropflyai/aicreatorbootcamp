# Verification

## What This Enables

Verification establishes objective evidence that the system does what it claims to
do (verification) and that it solves the right problem (validation). Without formal
verification, confidence in software correctness is anecdotal -- based on "it worked
when I tried it" rather than systematic, reproducible evidence. This document
distinguishes verification from validation per IEEE 1012, defines test execution
strategy across lifecycle phases, prescribes static and dynamic analysis tooling,
specifies evidence collection protocols, enforces the Definition of Done, and
introduces formal verification concepts for safety-critical components. Every
artifact that exits the Engineering Brain carries verifiable proof of correctness.

---

## 1. Verification and Validation Distinction (IEEE 1012)

IEEE 1012-2016 defines V&V as complementary but distinct activities:

| Concept        | Question Answered                        | Method                           |
|----------------|------------------------------------------|----------------------------------|
| **Verification** | "Are we building the product right?"   | Reviews, inspections, testing    |
| **Validation**   | "Are we building the right product?"   | User acceptance, stakeholder demo|

### 1.1 Verification Activities

- Code review (human inspection of implementation against design)
- Static analysis (automated inspection without execution)
- Unit testing (isolated component behavior)
- Integration testing (component interaction behavior)
- System testing (end-to-end behavior against requirements)
- Regression testing (previously verified behavior is preserved)

### 1.2 Validation Activities

- User acceptance testing (stakeholders execute acceptance criteria)
- Beta testing (real users in real environments)
- A/B testing (statistical comparison of behavioral outcomes)
- Demo / review sessions (stakeholder feedback on working software)

### 1.3 Relationship

Verification is necessary but not sufficient for validation. A system can be
perfectly verified (meets all specifications) yet fail validation (specifications
were wrong). Both are required.

---

## 2. Test Execution Strategy

### 2.1 Test Pyramid (Cohn, 2009)

The test pyramid prescribes the relative quantity and execution frequency of
tests at each level. The shape reflects cost-effectiveness: lower levels are
cheaper, faster, and more diagnostic.

```
          ┌─────┐
          │ E2E │          Few, slow, expensive
         ─┴─────┴─
        │Integration│      Moderate count, moderate speed
       ─┴───────────┴─
      │   Unit Tests   │   Many, fast, cheap
     ─┴────────────────┴─
```

### 2.2 Which Tests When

| Event                    | Tests Executed                                    | Time Budget   |
|--------------------------|---------------------------------------------------|---------------|
| **On save (local)**      | Affected unit tests (watch mode)                  | < 5 seconds   |
| **Pre-commit hook**      | Linting, formatting, type checking                | < 30 seconds  |
| **PR / CI pipeline**     | All unit tests + integration tests + SAST         | < 10 minutes  |
| **Pre-merge**            | Full test suite including E2E                     | < 30 minutes  |
| **Pre-deploy (staging)** | Smoke tests + critical path E2E                   | < 15 minutes  |
| **Post-deploy (prod)**   | Synthetic monitoring + canary health checks       | Continuous     |
| **Nightly**              | Full regression + performance + DAST + SCA        | < 2 hours     |

### 2.3 Test Isolation Requirements

| Level        | Database  | Network   | File System | Clock      |
|--------------|-----------|-----------|-------------|------------|
| Unit         | Mocked    | Mocked    | Mocked      | Controlled |
| Integration  | Test DB   | Localhost | Temp dir    | Real       |
| E2E          | Staging DB| Real      | Real        | Real       |

Unit tests that touch the database, network, or file system are integration
tests in disguise. Reclassify them to maintain pyramid integrity.

---

## 3. Static Analysis

Static analysis examines code without executing it. It catches defect classes
that are invisible to testing (unreachable code, type errors, style violations,
known vulnerability patterns).

### 3.1 Linting

Linters enforce code style and catch common programming errors.

| Language    | Linter                | Configuration                         |
|-------------|-----------------------|---------------------------------------|
| JavaScript  | ESLint                | Strict preset + project overrides     |
| TypeScript  | ESLint + typescript-eslint | Type-aware rules enabled          |
| Python      | Ruff (replaces flake8, isort, black) | Default strict              |
| Go          | golangci-lint         | Full metalinter suite                 |
| Rust        | clippy                | `#![deny(clippy::all)]`              |

**Enforcement:** Linting runs in pre-commit hooks and CI. Linting failures block
merge. No exceptions without documented, reviewed rationale.

### 3.2 Type Checking

Type systems are the most cost-effective static verification tool available.
Strong typing catches entire categories of defects at compile time that would
otherwise manifest as runtime errors in production.

| Language    | Type Checker     | Strictness Setting                    |
|-------------|------------------|---------------------------------------|
| TypeScript  | tsc              | `strict: true` (all strict flags)     |
| Python      | mypy or pyright  | `strict = true`                       |
| Java/Kotlin | Compiler         | Default (already strict)              |

**Rule:** `any` types in TypeScript and `# type: ignore` in Python require
explicit justification comments and are tracked as tech debt.

### 3.3 Complexity Analysis

| Metric                    | Threshold   | Action if Exceeded                    |
|---------------------------|-------------|---------------------------------------|
| Cyclomatic complexity     | <= 10       | Refactor: extract methods             |
| Cognitive complexity      | <= 15       | Refactor: simplify control flow       |
| Function length           | <= 50 lines | Extract helper functions              |
| File length               | <= 500 lines| Split into modules                    |
| Dependency fan-out        | <= 10       | Introduce facade or mediator          |

---

## 4. Dynamic Analysis

Dynamic analysis examines the system during execution, detecting runtime
behaviors that static analysis cannot observe.

### 4.1 DAST (Dynamic Application Security Testing)

DAST tools test the running application from the outside, simulating attack
patterns against deployed endpoints.

| Tool       | Capability                                         | When to Run    |
|------------|----------------------------------------------------|----------------|
| OWASP ZAP  | Automated vulnerability scanning (OWASP Top 10)   | Nightly        |
| Burp Suite | Manual + automated pen testing                     | Pre-release    |
| Nuclei     | Template-based vulnerability detection              | Nightly        |

**Protocol:** DAST runs against staging environment only (never production).
Findings are triaged within 24 hours. Critical/High findings block release.

### 4.2 SAST (Static Application Security Testing)

Despite the name, SAST is categorized here alongside DAST for completeness of
the security testing toolchain.

| Tool        | Language Support        | Integration Point       |
|-------------|------------------------|-------------------------|
| Semgrep     | Multi-language          | CI pipeline (every PR)  |
| CodeQL      | Multi-language          | CI pipeline (every PR)  |
| Bandit      | Python                  | CI pipeline (every PR)  |

**Rule:** SAST findings at severity High or Critical block merge. Medium findings
are tracked and must be resolved within one sprint.

### 4.3 SCA (Software Composition Analysis)

SCA identifies known vulnerabilities in third-party dependencies.

| Tool              | Ecosystem    | Integration Point            |
|-------------------|-------------|------------------------------|
| npm audit         | Node.js     | CI pipeline + weekly scan    |
| pip-audit         | Python      | CI pipeline + weekly scan    |
| cargo audit       | Rust        | CI pipeline + weekly scan    |
| Snyk / Dependabot | Multi       | Continuous monitoring        |

**Policy:**
- Critical CVEs: Patch within 24 hours or apply workaround
- High CVEs: Patch within 7 days
- Medium CVEs: Patch within 30 days
- Low CVEs: Patch at next dependency update cycle

---

## 5. Evidence Collection Protocols

Verification without evidence is assertion. Every verification claim must be
backed by reproducible, auditable evidence.

### 5.1 Evidence Types

| Verification Activity    | Evidence Artifact                                  |
|--------------------------|----------------------------------------------------|
| Unit tests               | Test report (pass/fail counts, coverage %)         |
| Integration tests        | Test report + test database state snapshots         |
| E2E tests                | Test report + screenshots/video + HAR files        |
| Static analysis          | Linter output + type checker output (zero errors)  |
| Security scanning        | SAST/DAST/SCA reports with finding counts          |
| Performance testing      | Latency percentiles (p50, p95, p99) + throughput   |
| Code review              | Approved PR with reviewer comments resolved        |
| Accessibility            | axe-core or Lighthouse audit report                |

### 5.2 Evidence Storage

- All evidence is stored as CI pipeline artifacts with 90-day retention
- Critical path evidence (security scans, compliance tests) is archived indefinitely
- Evidence is linked from the PR description and the deployment record

### 5.3 Evidence Completeness Gate

A deployment cannot proceed unless all evidence artifacts for the changed
components are present and passing. Missing evidence is treated as a failed
verification, not a gap to be filled post-deploy.

---

## 6. Definition of Done (DoD)

The DoD is a checklist that every work item must satisfy before it can be
considered complete. It is the exit gate from implementation into shipping.

### 6.1 Mandatory Criteria

| #  | Criterion                                                        | Evidence Required              |
|----|------------------------------------------------------------------|--------------------------------|
| 1  | All acceptance criteria from the story are met                   | Test results mapping to ACs    |
| 2  | Unit test coverage >= 80% for changed code                       | Coverage report                |
| 3  | All unit and integration tests pass                              | CI pipeline green              |
| 4  | No linting or type checking errors                               | Static analysis output         |
| 5  | No SAST/SCA findings at High or Critical                         | Security scan report           |
| 6  | PR reviewed and approved by minimum 1 engineer                   | Approved PR                    |
| 7  | Documentation updated (API docs, README, ADR if applicable)      | Diff showing doc changes       |
| 8  | Feature flag configured for progressive rollout                  | Flag configuration screenshot  |
| 9  | Rollback procedure documented                                    | Rollback section in PR         |
| 10 | Performance impact assessed (no regression > 10% on p95 latency) | Performance test results       |

### 6.2 Enforcement

The DoD is enforced by CI automation where possible (criteria 2-5) and by the
reviewer for criteria that require human judgment (1, 6-10). If any criterion
is unmet, the work item returns to implementation. There are no partial passes.

### 6.3 Relationship to Definition of Ready

The Definition of Ready (`Planning.md` Section 8) governs entry into
implementation. The Definition of Done governs exit. Together they form the
quality gate pair that brackets the implementation phase.

---

## 7. Formal Verification Concepts

For safety-critical or high-assurance components, testing alone is insufficient
because it can only demonstrate the presence of defects, never their absence
(Dijkstra, 1970). Formal verification provides mathematical proof of correctness.

### 7.1 Techniques Spectrum

| Technique              | Effort   | Assurance Level  | Applicability                    |
|------------------------|----------|------------------|----------------------------------|
| Type checking          | Low      | Moderate         | All code                         |
| Property-based testing | Moderate | High             | Pure functions, state machines   |
| Model checking         | High     | Very high        | Concurrent protocols, FSMs       |
| Theorem proving        | Very high| Maximal          | Cryptographic primitives, kernels|

### 7.2 Property-Based Testing (QuickCheck, Hypothesis)

Instead of specifying individual test cases, define properties that must hold
for ALL inputs. The framework generates hundreds of random inputs and searches
for counterexamples.

Properties to test:
- **Idempotency:** `f(f(x)) == f(x)` for operations that should be idempotent
- **Roundtrip:** `decode(encode(x)) == x` for serialization
- **Invariants:** `balance >= 0` after any sequence of operations
- **Commutativity:** `merge(a, b) == merge(b, a)` for CRDT operations

### 7.3 When to Apply Formal Methods

| Component                    | Minimum Verification Level                    |
|------------------------------|-----------------------------------------------|
| Business logic (CRUD)        | Unit + integration testing                    |
| Financial calculations       | Property-based testing + unit testing         |
| Authentication/authorization | Property-based testing + SAST                 |
| Cryptographic implementations| Do not implement; use audited libraries       |
| Consensus protocols          | Model checking (TLA+ or Alloy)               |
| Smart contracts              | Formal verification (mandatory)               |

---

## Cross-References

- Definition of Done pairs with Definition of Ready (`Planning.md` Section 8)
- Evidence collection feeds deployment approval (`Shipping.md` Section 3)
- SAST/DAST findings feed threat model updates (`Design.md` Section 6)
- SCA findings feed dependency audit (`Cleanup.md` Section 3)
- Test maintenance (flaky tests) covered in `Cleanup.md` Section 4
- Verification automation recipes in `../Automations/Recipes/`
- Verification governance in `../Verification/`

---

## Key References

- Cohn, M. (2009). *Succeeding with Agile*. Addison-Wesley.
- Dijkstra, E.W. (1970). Notes on Structured Programming. EWD249.
- IEEE 1012-2016. *IEEE Standard for System, Software, and Hardware Verification and Validation*.
- Lamport, L. (2002). *Specifying Systems: The TLA+ Language and Tools for Hardware and Software Engineers*. Addison-Wesley.
- MacIver, D. et al. (2019). Hypothesis: Property-based Testing for Python. *JOSS*, 4(43).
- OWASP Foundation. (2021). *OWASP Testing Guide v4.2*.
