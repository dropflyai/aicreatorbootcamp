# Test Coverage

Coverage measurement and analysis — code coverage, requirements coverage, risk coverage, and mutation testing. Understanding what "enough testing" means and how to measure it rigorously.

---

## The Coverage Problem

"We have 90% code coverage" means very little without context. Coverage is a **necessary but insufficient** measure of test quality. High coverage does not guarantee good tests. Low coverage guarantees inadequate tests.

```
Coverage Paradox:
├── Low coverage → definitely under-tested
├── High coverage → possibly well-tested, possibly not
└── 100% coverage → still may miss critical defects
```

**Why?** Coverage measures which code was **executed**, not whether it was **correctly verified**. A test that executes a function but makes no assertions provides coverage with zero verification.

---

## Code Coverage Types

### Statement Coverage (Line Coverage)

**Definition:** Percentage of executable statements exercised by the test suite.

```
Statement Coverage = (Executed Statements / Total Statements) × 100
```

**Example:**
```python
def calculate_tax(income, filing_status):    # Line 1
    if income <= 0:                          # Line 2
        return 0                             # Line 3
    if filing_status == "single":            # Line 4
        if income < 40000:                   # Line 5
            return income * 0.12             # Line 6
        else:                                # Line 7
            return income * 0.22             # Line 8
    elif filing_status == "married":         # Line 9
        if income < 80000:                   # Line 10
            return income * 0.12             # Line 11
        else:                                # Line 12
            return income * 0.22             # Line 13
    else:                                    # Line 14
        raise ValueError("Invalid status")  # Line 15

# Test: calculate_tax(50000, "single") → executes lines 1,2,4,5,8
# Statement coverage: 5/15 = 33%
# Missing: lines 3, 6, 9-15
```

**Minimum threshold recommendation:** 80% (industry standard), but meaningless without branch coverage.

---

### Branch Coverage (Decision Coverage)

**Definition:** Percentage of branches (True/False outcomes of decisions) exercised by the test suite.

```
Branch Coverage = (Executed Branches / Total Branches) × 100
```

**Example (same function):**
```python
# Decision points and their branches:
# D1: income <= 0          → True (line 3), False (line 4)
# D2: filing_status == "single" → True (line 5), False (line 9)
# D3: income < 40000       → True (line 6), False (line 8)
# D4: filing_status == "married" → True (line 10), False (line 14)
# D5: income < 80000       → True (line 11), False (line 13)
# Total branches: 10

# Tests for 100% branch coverage:
# Test 1: calculate_tax(-100, "single")   → D1=T
# Test 2: calculate_tax(30000, "single")  → D1=F, D2=T, D3=T
# Test 3: calculate_tax(50000, "single")  → D1=F, D2=T, D3=F
# Test 4: calculate_tax(60000, "married") → D1=F, D2=F, D4=T, D5=T
# Test 5: calculate_tax(90000, "married") → D1=F, D2=F, D4=T, D5=F
# Test 6: calculate_tax(50000, "other")   → D1=F, D2=F, D4=F
```

**Branch coverage subsumes statement coverage.** 100% branch coverage guarantees 100% statement coverage.

**Minimum threshold recommendation:** 80% branch coverage for non-critical code, 90%+ for critical paths.

---

### Condition Coverage

**Definition:** Percentage of individual boolean conditions within decisions that have been evaluated to both True and False.

```python
# Decision: if (A and B) or C
# Conditions: A, B, C (3 conditions, each needs True and False)
# Condition coverage requires 6 evaluations (3 conditions × 2 values)

# Test 1: A=T, B=T, C=F → A evaluated to T, B to T, C to F
# Test 2: A=F, B=F, C=T → A evaluated to F, B to F, C to T
# Condition coverage: 6/6 = 100%
# BUT: the overall decision was True in both cases (T,T,F)→True and (F,F,T)→True
# We never tested the case where the decision is False!
```

**Limitation:** 100% condition coverage does not guarantee 100% decision coverage.

---

### MC/DC (Modified Condition/Decision Coverage)

**Definition:** Every condition within a decision has been shown to independently affect the decision outcome. Required by DO-178C for aviation Level A software.

```python
# Decision: if (A and B) or C
# MC/DC requires showing each condition independently flips the decision:

# A independence:
#   A=T, B=T, C=F → True   vs   A=F, B=T, C=F → False (toggling A flips result)

# B independence:
#   A=T, B=T, C=F → True   vs   A=T, B=F, C=F → False (toggling B flips result)

# C independence:
#   A=F, B=F, C=T → True   vs   A=F, B=F, C=F → False (toggling C flips result)

# Minimum MC/DC tests: 4 (for 3 conditions: n+1 tests)
# T1: A=T, B=T, C=F → True
# T2: A=F, B=T, C=F → False (shows A independence with T1)
# T3: A=T, B=F, C=F → False (shows B independence with T1)
# T4: A=F, B=F, C=T → True  (shows C independence with next)
# T5: A=F, B=F, C=F → False (shows C independence with T4)
```

---

### Path Coverage

**Definition:** Every possible execution path through the code is tested. Typically impractical for non-trivial code.

```python
# For a function with n sequential if-else blocks:
# Paths = 2^n
# 10 if-else blocks = 1,024 paths
# 20 if-else blocks = 1,048,576 paths
# With loops: potentially infinite paths
```

**In practice:** Use MC/DC or branch coverage instead. Path coverage is theoretical, not practical.

---

## Requirements Coverage

### Requirements Traceability Matrix (RTM)

Map every requirement to its test cases and vice versa:

```
Requirement ID │ Requirement Description │ Test Cases │ Status │ Coverage
───────────────┼─────────────────────────┼────────────┼────────┼──────────
REQ-001        │ User can register       │ TC-001,    │ Passed │ 100%
               │ with email              │ TC-002,    │        │
               │                         │ TC-003     │        │
REQ-002        │ Password must be 8+     │ TC-004,    │ Passed │ 100%
               │ chars with special char │ TC-005     │        │
REQ-003        │ User can reset password │ TC-006     │ Failed │ 50%
               │ via email link          │ TC-007     │ Blocked│
REQ-004        │ Session expires after   │ (none)     │ —      │ 0%
               │ 30 min inactivity       │            │        │
```

**Coverage Gaps Identified:**
- REQ-003: TC-007 is blocked (environment issue) — 50% coverage
- REQ-004: No test cases exist — 0% coverage (critical gap)

### Requirements Coverage Formula

```
Requirements Coverage = (Requirements with ≥1 passing test / Total Requirements) × 100
```

**Target:** 100% of critical requirements have at least one passing test. 95%+ of all requirements.

---

## Risk Coverage

### Risk-Based Coverage Model

Map risk items to their testing coverage:

```
Risk ID │ Risk Description         │ Risk Level │ Test Coverage │ Residual Risk
────────┼──────────────────────────┼────────────┼───────────────┼──────────────
RISK-01 │ Payment processing       │ Critical   │ 95%           │ Low
        │ failure                  │            │ (unit+integ+  │
        │                          │            │  e2e+perf)    │
RISK-02 │ Data loss during         │ High       │ 80%           │ Medium
        │ migration                │            │ (unit+integ)  │
RISK-03 │ Search returns wrong     │ Medium     │ 60%           │ Medium
        │ results                  │            │ (unit only)   │
RISK-04 │ Admin page slow load     │ Low        │ 20%           │ Low
        │                          │            │ (smoke only)  │
```

**Risk Coverage Formula:**
```
Weighted Risk Coverage = Σ(risk_weight × coverage_percentage) / Σ(risk_weight)

Where risk_weight: Critical=4, High=3, Medium=2, Low=1

Example: (4×0.95 + 3×0.80 + 2×0.60 + 1×0.20) / (4+3+2+1) = 7.40/10 = 74%
```

---

## Mutation Testing

### Concept

Mutation testing evaluates the quality of your test suite by introducing small changes (mutations) to the source code and checking whether the tests detect them.

```
Process:
1. Original code passes all tests ✓
2. Mutant code (small change introduced) → run tests
   ├── Tests fail → Mutant "killed" ✓ (tests detected the change)
   └── Tests pass → Mutant "survived" ✗ (tests missed the change)
3. Mutation Score = Killed Mutants / Total Mutants × 100
```

### Common Mutation Operators

| Operator | Original | Mutant | What It Tests |
|----------|----------|--------|---------------|
| Arithmetic | `a + b` | `a - b` | Correct operator |
| Relational | `a >= b` | `a > b` | Boundary conditions |
| Logical | `a && b` | `a \|\| b` | Logical operators |
| Negation | `if (x)` | `if (!x)` | Condition correctness |
| Constant | `return 0` | `return 1` | Return value verification |
| Remove call | `validate(x)` | `// removed` | Call is actually needed |
| Null return | `return obj` | `return null` | Null handling |

### Mutation Testing Example

```python
# Source code
def is_adult(age):
    return age >= 18

# Test suite
def test_is_adult():
    assert is_adult(20) == True
    assert is_adult(10) == False

# Mutation 1: age >= 18 → age > 18
# is_adult(18) would return False instead of True
# But our tests don't test age=18, so this mutant SURVIVES
# → Our test suite has a gap at the boundary!

# Mutation 2: age >= 18 → age >= 19
# is_adult(18) would return False instead of True
# Same gap — mutant survives

# Fix: Add boundary test
def test_is_adult_boundary():
    assert is_adult(18) == True   # Now kills mutations 1 and 2
    assert is_adult(17) == False  # Extra safety
```

### Mutation Testing Tools

| Language | Tool | Notes |
|----------|------|-------|
| JavaScript/TypeScript | Stryker | Most popular JS mutation framework |
| Python | mutmut | Pure Python, easy setup |
| Java | PIT (pitest) | Industry standard for Java |
| C# | Stryker.NET | .NET port of Stryker |
| Go | go-mutesting | Go mutation testing |

### Mutation Testing Configuration (Stryker)

```javascript
// stryker.conf.mjs
export default {
  mutate: ['src/**/*.ts', '!src/**/*.test.ts', '!src/**/*.spec.ts'],
  testRunner: 'jest',
  reporters: ['html', 'clear-text', 'progress'],
  thresholds: {
    high: 80,    // Green: 80%+ mutation score
    low: 60,     // Red: below 60%
    break: 50,   // Fail build below 50%
  },
  timeoutMS: 10000,
  concurrency: 4,
};
```

### Interpreting Mutation Scores

| Score | Interpretation | Action |
|-------|---------------|--------|
| 90%+ | Excellent test suite | Maintain |
| 70-89% | Good, with some gaps | Address surviving mutants in critical code |
| 50-69% | Significant gaps | Prioritize improving tests for high-risk areas |
| Below 50% | Test suite provides false confidence | Major test improvement initiative needed |

---

## Coverage Strategy Decision Tree

```
What level of coverage assurance is needed?
│
├── Safety-critical (medical, aviation, automotive)?
│   ├── MC/DC coverage (DO-178C)
│   ├── Requirements traceability matrix (100%)
│   ├── Mutation testing (90%+ score)
│   └── Formal verification where feasible
│
├── High-risk business application (finance, health data)?
│   ├── Branch coverage 90%+
│   ├── Requirements coverage 100%
│   ├── Risk coverage 85%+
│   └── Mutation testing on critical modules (80%+)
│
├── Standard business application?
│   ├── Branch coverage 80%+
│   ├── Requirements coverage 95%+
│   ├── Risk coverage 75%+
│   └── Mutation testing optional
│
├── Internal tool / low-risk application?
│   ├── Statement coverage 70%+
│   ├── Critical path coverage 100%
│   └── Risk-based regression only
│
└── Prototype / proof of concept?
    ├── No formal coverage targets
    ├── Manual testing sufficient
    └── Focus on learning, not verification
```

---

## Coverage Anti-Patterns

### 1. Coverage as a Goal Instead of a Signal
```
BAD:  "Write tests until we hit 90% coverage"
GOOD: "Identify risks, write tests for risks, measure coverage as a signal"
```

### 2. Assertion-Free Tests
```javascript
// BAD: 100% coverage, 0% verification
test('process order', () => {
  processOrder({ id: 1, amount: 100 }); // No assertions!
});

// GOOD: Coverage WITH verification
test('process order calculates correct total', () => {
  const result = processOrder({ id: 1, amount: 100, tax: 0.08 });
  expect(result.total).toBe(108);
  expect(result.status).toBe('processed');
});
```

### 3. Ignoring Uncoverable Code
```python
# Some code is deliberately uncoverable (defensive programming)
def connect_to_db():
    try:
        return database.connect()
    except ConnectionError:
        # This branch may be hard to trigger in unit tests
        # Solution: Integration test with actual connection failure
        logger.error("Database connection failed")
        raise
```

### 4. Coverage Ratchet Without Review
Setting up a coverage ratchet (never allow coverage to decrease) without reviewing what is actually being tested leads to low-quality tests written solely to increase numbers.

---

## Coverage Tooling

| Language | Tool | Type | CI Integration |
|----------|------|------|----------------|
| JavaScript | Istanbul/nyc | Statement, branch, function | Jest --coverage, Vitest |
| TypeScript | c8 | V8 native coverage | Vitest, Node.js |
| Python | coverage.py | Statement, branch | pytest-cov |
| Go | go test -cover | Statement, branch | Built-in |
| Java | JaCoCo | Statement, branch, MC/DC | Maven/Gradle plugin |
| C# | Coverlet | Statement, branch | dotnet test |
| Rust | cargo-tarpaulin | Statement, branch | cargo tarpaulin |

---

## References

- ISTQB Advanced Level Technical Test Analyst — Chapter on White-Box Techniques
- ISTQB Foundation Level Syllabus v4.0 — Chapter 4.3: White-Box Test Techniques
- Fowler, M. "TestCoverage" (martinfowler.com, 2012)
- Marick, B. "How to Misuse Code Coverage" (testing.com)
- Hamill, P. *Unit Test Frameworks* (2004)
- Jia, Y. & Harman, M. "An Analysis and Survey of the Development of Mutation Testing" (IEEE TSE, 2011)
- DO-178C — Software Considerations in Airborne Systems and Equipment Certification

---

**Coverage tells you where you have NOT tested. It cannot tell you that you have tested well.**
