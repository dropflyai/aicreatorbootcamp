# TRIPLE VERIFICATION FRAMEWORK
**Three-Layer Independent Verification Protocol**

---

## 1. Purpose and Theoretical Foundation

Triple Verification is a formal correctness assurance protocol modeled after
independent audit principles in safety-critical systems engineering. The core
insight is that no single verification mechanism is sufficient to establish
confidence in software correctness. A passing test suite does not prove the
system behaves correctly in production. A screenshot does not prove the code
is secure. A human review does not prove the tests are adequate.

By requiring three independent verification layers -- each operating on
different evidence classes -- the protocol achieves defense-in-depth
verification. A defect must evade all three layers simultaneously to escape
detection. The probability of escape is the product of individual layer
failure probabilities, yielding exponentially decreasing risk as layers are
added.

This framework is binding for all work performed under GEAR: BUILD and
GEAR: SHIP. Reduced verification applies under GEAR: EXPLORE and GEAR: HOTFIX
as defined in Section 6.

---

## 2. Layer 1: Automated Test Gate

### 2.1 Definition

Layer 1 comprises all machine-executable verification: automated test
suites, static analysis, type checking, and linting. This layer answers the
question: **"Does the code satisfy its programmatic contracts?"**

### 2.2 Components

| Component | Tool | Pass Criteria |
|-----------|------|---------------|
| Unit tests | pytest / jest / vitest | 100% pass, zero failures |
| Integration tests | pytest / Playwright | 100% pass, zero failures |
| Type checking | mypy / tsc --noEmit | Zero type errors |
| Linting | ruff / eslint | Zero errors (warnings acceptable with justification) |
| Security scanning | bandit / npm audit / trivy | Zero high/critical findings |
| Coverage threshold | coverage.py / istanbul | Meets project minimum (default 80%) |

### 2.3 Execution Protocol

1. Run the full test suite for the affected module(s).
2. Run the type checker across the affected codebase.
3. Run the linter on all changed files.
4. Run security scanning on changed dependencies and code.
5. Collect exit codes from all tools.

### 2.4 Pass/Fail Determination

Layer 1 passes if and only if ALL of the following hold:

- Every test suite returns exit code 0.
- The type checker returns exit code 0.
- The linter returns zero errors on changed files.
- Security scanning reports zero high or critical severity findings.
- Coverage does not regress below the project threshold.

A single failure in any component fails the entire layer.

### 2.5 Failure Handling

When Layer 1 fails:

1. **Identify** the specific failing component and error message.
2. **Classify** the failure: genuine defect, flaky test, environment issue, or
   false positive.
3. **Genuine defect**: Fix the code, re-run the full layer.
4. **Flaky test**: Quarantine the test (see UIAutomation.md Section 8),
   document in `Memory/RegressionHistory.md`, re-run.
5. **Environment issue**: Resolve the environment problem, re-run.
6. **False positive**: Document the false positive with justification, add a
   suppression with inline comment explaining the rationale, re-run.

Layer 1 failures block progression to Layer 2.

---

## 3. Layer 2: Evidence Artifact Gate

### 3.1 Definition

Layer 2 requires the existence and validity of physical evidence artifacts
that demonstrate system behavior. This layer answers the question:
**"Can an independent observer verify the claims made about this change?"**

Layer 2 is independent of Layer 1: a passing test suite does not exempt the
requirement for evidence artifacts. Tests prove code contracts hold; evidence
artifacts prove system behavior is observable and auditable.

### 3.2 Required Artifacts by Change Type

| Change Type | Required Artifacts |
|-------------|-------------------|
| Backend logic | Test report (JUnit XML), coverage report |
| API endpoint | Test report, example request/response logs |
| UI component | Screenshot (before/after), Playwright trace |
| UI layout change | Screenshot (before/after), accessibility audit |
| Database migration | Migration output log, schema diff |
| Performance change | Benchmark report with baseline comparison |
| Security fix | Security scan results (before/after) |
| Dependency update | Audit report, test report |
| Configuration change | Diff of config, verification log showing new behavior |
| Infrastructure change | Terraform plan output, deployment log |

### 3.3 Artifact Validation

An artifact is valid if:

- It was generated during or after the current change (timestamp verification).
- It corresponds to the code at the current commit (commit SHA linkage).
- It is machine-readable or human-readable (not corrupted).
- It is stored in the designated evidence directory (see Evidence.md).

### 3.4 Sufficiency Determination

The Sufficiency Matrix (defined in Evidence.md Section 5) governs which
artifacts are required for which change types. The matrix is authoritative.

Layer 2 passes if and only if ALL required artifacts for the declared change
type(s) exist and are valid.

### 3.5 Failure Handling

When Layer 2 fails:

1. **Missing artifact**: Generate the artifact using the appropriate
   automation recipe (see Automations/).
2. **Invalid artifact**: Regenerate from current code state.
3. **Artifact cannot be generated**: Document why with explicit justification.
   This is a stop condition under GEAR: SHIP. Under GEAR: BUILD, a justified
   waiver may be filed per Constitution.md Section 14.

Layer 2 failures block progression to Layer 3.

---

## 4. Layer 3: Review Gate

### 4.1 Definition

Layer 3 requires human or agent review of the change in context. This layer
answers the question: **"Does this change fulfill its intent, satisfy
acceptance criteria, and align with system architecture?"**

Automated tools verify contracts. Evidence artifacts verify behavior.
Review verifies intent and judgment.

### 4.2 Review Components

| Review Component | Reviewer | Verification Target |
|-----------------|----------|-------------------|
| Code review | Human or agent | Code quality, architecture alignment, readability |
| Acceptance criteria check | Human or agent | Requirements satisfaction |
| Security review | Agent (automated) or human | Threat model, attack surface |
| Accessibility review | Agent (axe-core) + human | WCAG compliance, usability |
| Architecture review | Human or agent | System design consistency |

### 4.3 Review Depth by Execution Gear

- **GEAR: BUILD** -- Code review and acceptance criteria check required.
  Security and architecture review required for changes affecting auth,
  data models, or public APIs.
- **GEAR: SHIP** -- All review components required. No exceptions.
- **GEAR: EXPLORE** -- See Section 6 (Reduced Verification).
- **GEAR: HOTFIX** -- See Section 6 (Reduced Verification).

### 4.4 Review Checklist

The reviewer (human or agent) must confirm:

- [ ] The change addresses the stated problem and nothing else.
- [ ] No unnecessary scope expansion.
- [ ] Error handling is explicit, not silent.
- [ ] No secrets, credentials, or PII introduced.
- [ ] No TODO comments without owners and deadlines.
- [ ] Tests cover the meaningful behavior, not just line coverage.
- [ ] Evidence artifacts are present and consistent with the change.
- [ ] The change leaves the codebase cleaner than before.

### 4.5 Failure Handling

When Layer 3 fails:

1. **Reviewer identifies defect**: Return to implementation, fix, and re-run
   Layers 1 and 2 before re-submitting for Layer 3.
2. **Reviewer identifies missing test**: Add test, re-run Layer 1.
3. **Reviewer identifies missing evidence**: Generate evidence, re-run Layer 2.
4. **Reviewer identifies scope creep**: Split the change into focused units.

Layer 3 failure returns the change to Layer 1 for a complete re-verification
cycle.

---

## 5. Verification Completeness Theorem

### 5.1 Formal Definition

A change C is considered **fully verified** if and only if:

```
V(C) = L1(C) AND L2(C) AND L3(C)
```

Where:
- L1(C) = all automated checks pass for change C
- L2(C) = all required evidence artifacts exist and are valid for change C
- L3(C) = review confirms intent, criteria, and architecture alignment for C

### 5.2 Independence Property

Each layer must be independently evaluable. Specifically:

- L1 does not depend on L2 or L3 having been executed.
- L2 does not depend on L3 having been executed.
- L3 may reference L1 and L2 outputs as inputs to the review.

### 5.3 Non-Substitutability

No layer substitutes for another:

- Passing all tests (L1) does not excuse missing evidence (L2).
- Having screenshots (L2) does not excuse failing tests (L1).
- Positive review (L3) does not excuse missing artifacts (L2) or failing
  tests (L1).

### 5.4 Monotonic Progress

Verification progress is monotonic: once a layer passes, it remains passed
unless the underlying change is modified. If the change is modified, all
three layers must be re-evaluated.

---

## 6. Reduced Verification Protocols

### 6.1 GEAR: EXPLORE

Under GEAR: EXPLORE, verification is reduced to:

- **Layer 1**: Code must run without errors. Formal test suite execution is
  optional. Type checking is recommended but not required.
- **Layer 2**: Evidence artifacts are optional. If the exploration produces
  observable output (logs, screenshots), capturing them is recommended.
- **Layer 3**: Self-review by the implementing agent is sufficient. Formal
  code review is not required.

Rationale: Exploration is throwaway work. Full verification overhead would
eliminate the speed advantage of exploration.

Constraint: If exploration code is promoted to GEAR: BUILD, full Triple
Verification must be applied retroactively.

### 6.2 GEAR: HOTFIX

Under GEAR: HOTFIX, verification is reduced to:

- **Layer 1**: Smoke tests proving the fix resolves the reported failure.
  Full test suite recommended but not blocking.
- **Layer 2**: Evidence of the fix working (logs, screenshots, or exit codes).
  Full artifact collection deferred to post-incident.
- **Layer 3**: Review is deferred to the mandatory post-incident review
  (within 24-48 hours per Constitution.md Section 15).

Constraint: All deferred verification must be completed during post-incident
review. Deferred items must be tracked in `Memory/RegressionHistory.md`.

### 6.3 Trivial Changes

A change qualifies as trivial if ALL of the following hold:

- Affects only comments, documentation, or whitespace.
- Touches no executable code.
- Changes no configuration that affects runtime behavior.
- Modifies no test files.

Trivial changes require:
- **Layer 1**: Linting only (no test execution required).
- **Layer 2**: Diff artifact only.
- **Layer 3**: Self-review sufficient.

---

## 7. CI Integration

### 7.1 Pipeline Structure

```yaml
# Conceptual CI pipeline structure
stages:
  - name: layer-1-automated
    jobs:
      - run-tests
      - type-check
      - lint
      - security-scan
      - coverage-check
    gate: all-pass

  - name: layer-2-evidence
    jobs:
      - collect-test-reports
      - generate-screenshots
      - run-benchmarks
      - validate-artifacts
    gate: all-required-present
    depends_on: layer-1-automated

  - name: layer-3-review
    jobs:
      - automated-review-checks
      - require-human-approval
    gate: approval-received
    depends_on: layer-2-evidence
```

### 7.2 Gate Enforcement

Each CI stage acts as a gate. Failure at any stage blocks progression
to subsequent stages. The pipeline does not allow cherry-picking layers.

### 7.3 Artifact Upload

All evidence artifacts generated during CI must be uploaded as pipeline
artifacts with retention per Evidence.md Section 7.

### 7.4 Status Reporting

Each layer reports its status independently:

- Layer 1: `verification/layer-1: pass | fail`
- Layer 2: `verification/layer-2: pass | fail`
- Layer 3: `verification/layer-3: pass | fail | pending-review`

All three must show `pass` before a change is merge-eligible.

---

## 8. Cross-References

- **Evidence taxonomy and storage**: `Verification/Evidence.md`
- **UI-specific automation**: `Verification/UIAutomation.md`
- **Zero-copy-paste retrieval**: `Verification/ZeroCopyPaste.md`
- **Lifecycle verification phase**: `Lifecycle/Verification.md`
- **Testing patterns**: `Patterns/Testing.md`
- **Engineering Score (verification dimension)**: `Score.md`
- **Constitution (evidence rule)**: `Constitution.md` Section 9
- **Execution Gears**: `Constitution.md` Section 4

---

## 9. Governance

Triple Verification is a mandatory protocol under Constitution.md.

Bypassing any layer without documented justification is a governance violation
that must be logged in `Solutions/Regressions.md`.

The only permitted reductions are those defined in Section 6 (Reduced
Verification), and only when the declared Execution Gear qualifies.

---

**Triple Verification is binding and enforced.**
