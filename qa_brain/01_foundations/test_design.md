# Test Design Techniques

Systematic methods for deriving test cases that maximize defect detection with minimum test count. These techniques transform the infinite input space into a finite, effective test suite.

---

## The Test Design Problem

Given a function `calculateDiscount(price, customerType, couponCode)`:
- `price`: any positive number (infinite values)
- `customerType`: "regular", "premium", "VIP" (3 values)
- `couponCode`: any string or null (infinite values)

Exhaustive testing is impossible. Test design techniques provide **systematic selection** of test cases that are most likely to reveal defects.

---

## Black-Box Techniques

### 1. Equivalence Partitioning (EP)

**Principle:** Divide the input domain into partitions (equivalence classes) where all values in a partition are expected to be treated identically by the software. Test one representative value from each partition.

**Rationale:** If the code handles the value 5 correctly and 5 belongs to the partition [1-100], it is likely to handle 37 correctly too. If it fails for 5, it likely fails for 37 as well.

**Method:**
1. Identify input parameters and their valid/invalid ranges
2. Partition each parameter into equivalence classes
3. Select one representative value from each class
4. Create test cases covering valid and invalid partitions

**Example: Age Validation (18-65 for insurance)**

| Partition | Range | Type | Representative | Expected |
|-----------|-------|------|----------------|----------|
| EP1 | age < 0 | Invalid | -1 | Error: invalid age |
| EP2 | 0 <= age < 18 | Invalid | 10 | Error: too young |
| EP3 | 18 <= age <= 65 | Valid | 35 | Accepted |
| EP4 | age > 65 | Invalid | 80 | Error: too old |
| EP5 | non-numeric | Invalid | "abc" | Error: invalid input |
| EP6 | null/undefined | Invalid | null | Error: required field |

**Minimum test cases:** 6 (one per partition)

```python
# Test implementation
import pytest

@pytest.mark.parametrize("age,expected_error", [
    (-1, "invalid age"),          # EP1: negative
    (10, "too young"),            # EP2: below minimum
    (35, None),                   # EP3: valid range
    (80, "too old"),              # EP4: above maximum
    ("abc", "invalid input"),     # EP5: non-numeric
    (None, "required field"),     # EP6: null
])
def test_age_validation(age, expected_error):
    result = validate_age(age)
    if expected_error:
        assert result.error == expected_error
    else:
        assert result.is_valid
```

---

### 2. Boundary Value Analysis (BVA)

**Principle:** Defects tend to cluster at the boundaries of equivalence partitions. Test values at, just below, and just above each boundary.

**Rationale (empirical):** Off-by-one errors are among the most common defects. `if (age >= 18)` vs `if (age > 18)` — the boundary at 18 is where the distinction matters.

**Two-Value BVA (ISTQB Foundation):**
Test the boundary value and the value on the other side of the boundary.

**Three-Value BVA (ISTQB Advanced):**
Test the boundary value, one below, and one above.

**Example: Age Validation (18-65)**

| Boundary | Values to Test (3-value) | Purpose |
|----------|--------------------------|---------|
| Lower boundary: 18 | 17, 18, 19 | Off-by-one at lower bound |
| Upper boundary: 65 | 64, 65, 66 | Off-by-one at upper bound |
| Zero boundary | -1, 0, 1 | Sign/zero edge case |

```python
@pytest.mark.parametrize("age,should_be_valid", [
    (17, False),   # just below lower boundary
    (18, True),    # lower boundary (inclusive)
    (19, True),    # just above lower boundary
    (64, True),    # just below upper boundary
    (65, True),    # upper boundary (inclusive)
    (66, False),   # just above upper boundary
    (-1, False),   # negative boundary
    (0, False),    # zero boundary
    (1, False),    # just above zero
])
def test_age_boundaries(age, should_be_valid):
    result = validate_age(age)
    assert result.is_valid == should_be_valid
```

---

### 3. Decision Table Testing

**Principle:** When business logic depends on combinations of conditions, a decision table systematically enumerates all possible condition combinations and their expected actions.

**When to use:** Complex business rules with multiple interacting conditions (discount calculations, access control, workflow routing).

**Method:**
1. List all conditions (boolean or reducible to boolean)
2. List all possible actions
3. Create columns for each combination of condition values
4. Mark which actions apply to each combination
5. Collapse rules with identical actions (don't-care conditions)

**Example: Shipping Discount Rules**

| | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 |
|---|---|---|---|---|---|---|---|---|
| **Conditions** | | | | | | | | |
| Order > $100 | T | T | T | T | F | F | F | F |
| Premium member | T | T | F | F | T | T | F | F |
| First order | T | F | T | F | T | F | T | F |
| **Actions** | | | | | | | | |
| Free shipping | X | X | X | X | X | | | |
| 10% discount | X | X | | | | | | |
| Welcome gift | X | | X | | X | | X | |
| Standard rate | | | | | | X | X | X |

```javascript
// Decision table as test cases
describe('Shipping discount rules', () => {
  test.each([
    // [orderTotal, isPremium, isFirst, freeShip, discount, gift]
    [150, true,  true,  true,  true,  true ],  // R1
    [150, true,  false, true,  true,  false],  // R2
    [150, false, true,  true,  false, true ],  // R3
    [150, false, false, true,  false, false],  // R4
    [50,  true,  true,  true,  false, true ],  // R5
    [50,  true,  false, false, false, false],  // R6
    [50,  false, true,  false, false, true ],  // R7
    [50,  false, false, false, false, false],  // R8
  ])('order=$%i premium=%s first=%s',
    (total, premium, first, expectFreeShip, expectDiscount, expectGift) => {
      const result = calculateShipping({ total, premium, firstOrder: first });
      expect(result.freeShipping).toBe(expectFreeShip);
      expect(result.hasDiscount).toBe(expectDiscount);
      expect(result.includesGift).toBe(expectGift);
    }
  );
});
```

---

### 4. State Transition Testing

**Principle:** When a system has defined states and transitions between states triggered by events, test each valid transition and attempt invalid transitions.

**When to use:** Order workflows, user account states, subscription management, connection protocols, authentication flows.

**Components:**
- **States:** The possible conditions of the system
- **Transitions:** The changes from one state to another
- **Events:** The triggers that cause transitions
- **Guards:** Conditions that must be true for a transition
- **Actions:** Side effects that occur during transitions

**Example: Order State Machine**

```
                    ┌─────────┐
        create      │         │    cancel
    ───────────────→│ PENDING ├──────────────→ CANCELLED
                    │         │
                    └────┬────┘
                         │ pay
                         ▼
                    ┌─────────┐
                    │  PAID   │    refund
                    │         ├──────────────→ REFUNDED
                    └────┬────┘
                         │ ship
                         ▼
                    ┌─────────┐
                    │ SHIPPED │
                    │         │
                    └────┬────┘
                         │ deliver
                         ▼
                    ┌──────────┐
                    │DELIVERED │
                    └──────────┘
```

**State Transition Table:**

| Current State | Event | Guard | Next State | Action |
|---------------|-------|-------|------------|--------|
| PENDING | pay | payment valid | PAID | Charge card |
| PENDING | cancel | — | CANCELLED | Release inventory |
| PAID | ship | inventory available | SHIPPED | Create tracking |
| PAID | refund | within policy | REFUNDED | Credit card |
| SHIPPED | deliver | — | DELIVERED | Send notification |
| DELIVERED | refund | within 30 days | REFUNDED | Credit card |

**Invalid Transition Tests (Negative Testing):**

| Current State | Event | Expected Result |
|---------------|-------|-----------------|
| PENDING | ship | Error: cannot ship unpaid order |
| CANCELLED | pay | Error: cannot pay cancelled order |
| SHIPPED | cancel | Error: cannot cancel shipped order |
| DELIVERED | ship | Error: already delivered |

```python
class TestOrderStateMachine:
    """State transition testing for order workflow."""

    # Valid transitions
    def test_pending_to_paid(self):
        order = Order.create(items=[item1])
        assert order.state == "PENDING"
        order.pay(payment_method=valid_card)
        assert order.state == "PAID"

    def test_paid_to_shipped(self):
        order = create_paid_order()
        order.ship(tracking="TRK123")
        assert order.state == "SHIPPED"
        assert order.tracking_number == "TRK123"

    # Invalid transitions
    def test_cannot_ship_pending_order(self):
        order = Order.create(items=[item1])
        with pytest.raises(InvalidTransitionError):
            order.ship(tracking="TRK123")

    def test_cannot_cancel_shipped_order(self):
        order = create_shipped_order()
        with pytest.raises(InvalidTransitionError):
            order.cancel()

    # Guard conditions
    def test_refund_rejected_after_30_days(self):
        order = create_delivered_order(delivered_at=days_ago(31))
        with pytest.raises(RefundPolicyError):
            order.refund()
```

---

### 5. Pairwise Testing (Combinatorial)

**Principle:** Most defects are triggered by the interaction of at most two parameters. Testing all possible pairs of parameter values (rather than all combinations) dramatically reduces test count while maintaining high fault detection.

**Mathematics:** For *n* parameters with *v* values each:
- All combinations: v^n tests
- All pairs: approximately v^2 * log(n) tests

**Example:** Testing a web form with:
- Browser: Chrome, Firefox, Safari (3)
- OS: Windows, macOS, Linux (3)
- Language: English, Spanish, French (3)

All combinations: 3^3 = 27 tests
All pairs: ~9 tests (covering every pair of values)

**Pairwise Test Set (generated with PICT or AllPairs):**

| Test | Browser | OS | Language |
|------|---------|-----|----------|
| 1 | Chrome | Windows | English |
| 2 | Chrome | macOS | Spanish |
| 3 | Chrome | Linux | French |
| 4 | Firefox | Windows | French |
| 5 | Firefox | macOS | English |
| 6 | Firefox | Linux | Spanish |
| 7 | Safari | Windows | Spanish |
| 8 | Safari | macOS | French |
| 9 | Safari | Linux | English |

Every pair (e.g., Chrome+Windows, Firefox+French, macOS+Spanish) appears at least once.

---

## White-Box Techniques

### Statement Coverage

**Goal:** Every executable statement is executed at least once.

```python
def calculate_fee(amount, is_member):    # Line 1
    fee = amount * 0.05                  # Line 2 - always executed
    if is_member:                        # Line 3 - always executed
        fee = fee * 0.5                  # Line 4 - only if is_member
    if amount > 1000:                    # Line 5 - always executed
        fee = fee + 10                   # Line 6 - only if amount > 1000
    return fee                           # Line 7 - always executed

# 100% statement coverage requires 1 test:
# calculate_fee(1500, True) → executes lines 1-7
# But this MISSES the case where is_member=False AND amount<=1000
```

**Limitation:** 100% statement coverage does not guarantee all branches are tested.

### Branch Coverage (Decision Coverage)

**Goal:** Every branch (True and False outcome of every decision) is executed at least once.

```python
# For the same function, branch coverage requires:
# Test 1: calculate_fee(1500, True)   → is_member=T, amount>1000=T
# Test 2: calculate_fee(500, False)   → is_member=F, amount>1000=F
# This covers all 4 branch outcomes (2 decisions x 2 outcomes)
```

**Branch coverage subsumes statement coverage** — 100% branch coverage guarantees 100% statement coverage, but not vice versa.

### MC/DC (Modified Condition/Decision Coverage)

**Goal:** Every condition within a decision independently affects the decision's outcome. Required by DO-178C for Level A (flight-critical) software.

```python
# Decision: if (A and B) or C
# MC/DC requires showing each condition independently flips the outcome:
# Test 1: A=T, B=T, C=F → True  (baseline for A and B)
# Test 2: A=F, B=T, C=F → False (toggling A flips outcome)
# Test 3: A=T, B=F, C=F → False (toggling B flips outcome)
# Test 4: A=F, B=F, C=T → True  (toggling C flips outcome)
```

---

## Experience-Based Techniques

### Error Guessing

**Principle:** Use experience and intuition to guess the most likely errors. Based on the tester's knowledge of:
- Common programming mistakes (off-by-one, null pointer, race conditions)
- Previous defects in similar features
- Known problematic areas

**Common Error Guesses:**
```
Numeric inputs:    0, -1, MAX_INT, MIN_INT, NaN, Infinity, 0.1+0.2
Strings:           "", null, "  " (whitespace), very long strings,
                   Unicode (emoji, RTL), SQL injection, XSS payloads
Dates:             Leap year (Feb 29), epoch (Jan 1 1970), Y2K38,
                   timezone boundaries, DST transitions
Collections:       Empty, single element, duplicate elements, max size
Concurrency:       Simultaneous updates, race conditions, deadlocks
```

### Exploratory Testing (James Bach)

**Definition:** "Simultaneously designing and executing tests, using feedback from the last test to guide the next."

**Session-Based Test Management (SBTM):**
- **Charter:** What to explore, what to look for
- **Time-box:** 60-120 minute focused sessions
- **Notes:** Record observations, questions, and defects in real-time
- **Debrief:** Discuss findings, adjust future charters

**Example Charter:**
```
CHARTER: Explore the checkout flow with expired credit cards
AREAS: Payment form, error handling, retry logic
TIME: 90 minutes
LOOK FOR: Error messages, state corruption, security issues
```

---

## Technique Selection Decision Tree

```
What are you testing?
│
├── Business rules with multiple conditions?
│   └── Decision Table Testing
│
├── A workflow with defined states?
│   └── State Transition Testing
│
├── Input validation?
│   ├── Equivalence Partitioning (identify classes)
│   └── Boundary Value Analysis (test edges)
│
├── Multiple configuration parameters?
│   └── Pairwise Testing
│
├── Code coverage requirements?
│   ├── Statement Coverage (minimum)
│   ├── Branch Coverage (standard)
│   └── MC/DC (safety-critical)
│
└── Unknown territory / new feature?
    └── Exploratory Testing + Error Guessing
```

---

## References

- ISTQB Foundation Level Syllabus v4.0 — Chapter 4: Test Analysis and Design
- ISTQB Advanced Level Test Analyst Syllabus — Test Design Techniques
- Bach, J. "Exploratory Testing Explained" (satisfice.com)
- Copeland, L. *A Practitioner's Guide to Software Test Design* (2004)
- Myers, G. *The Art of Software Testing* (3rd ed., 2011)
- Kuhn, D.R. et al. "Combinatorial Testing" (NIST SP 800-142)

---

**Good test design is the difference between testing everything poorly and testing the right things well.**
