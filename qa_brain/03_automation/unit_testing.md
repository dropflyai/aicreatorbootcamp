# Unit Testing — Foundations, Frameworks, and Mastery

## Overview

Unit testing is the practice of verifying the smallest testable units of software — individual functions, methods, or classes — in isolation from their dependencies. A well-designed unit test suite serves as a living specification of intended behavior, a regression safety net, and a design feedback mechanism. When unit tests are difficult to write, the production code is almost always poorly designed: high coupling, hidden dependencies, side effects, or violation of the Single Responsibility Principle. Unit testing is not merely a quality activity — it is a design discipline.

The economics of unit testing are well-established. Defects caught at the unit level cost 5-10x less to fix than defects caught in integration testing, and 50-100x less than defects found in production. A mature unit test suite executes in seconds, provides immediate feedback during development, and makes refactoring safe.

---

## Test-Driven Development (TDD)

### The TDD Cycle

```
    ┌─────────────┐
    │   RED       │ ← Write a failing test
    │  (Failing)  │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │   GREEN     │ ← Write minimal code to pass
    │  (Passing)  │
    └──────┬──────┘
           │
    ┌──────▼──────┐
    │  REFACTOR   │ ← Improve design, tests still pass
    │  (Clean)    │
    └──────┬──────┘
           │
           └──────→ Back to RED
```

### TDD Rules (Kent Beck)

1. **Do not write production code until you have a failing test** — the test defines the requirement
2. **Write only enough test to demonstrate failure** — one assertion per cycle
3. **Write only enough production code to pass the test** — resist the urge to build ahead
4. **Refactor only when all tests pass** — refactoring changes structure, not behavior

### TDD Benefits Beyond Quality

| Benefit | Mechanism |
|---------|-----------|
| Design feedback | Difficult tests reveal coupling and complexity |
| Living documentation | Tests describe what the code does, not how |
| Confidence in refactoring | Change structure without changing behavior |
| Incremental progress | Small steps reduce cognitive load |
| Reduced debugging time | Failures are isolated to the last change |

### When TDD Is Most Valuable

- Business logic with complex rules
- Data transformation pipelines
- State machines and workflow engines
- Algorithm implementation
- API contract definitions

### When TDD Is Less Effective

- Highly exploratory or prototyping work (write tests after stabilization)
- UI layout and styling (visual testing is more appropriate)
- Thin wrappers around external APIs (integration tests are better)

---

## Behavior-Driven Development (BDD)

### BDD Structure

BDD extends TDD by expressing tests in domain language using the Given-When-Then format:

```gherkin
Feature: Shopping Cart
  Scenario: Adding an item to an empty cart
    Given the cart is empty
    When the customer adds a "Widget" priced at $9.99
    Then the cart should contain 1 item
    And the cart total should be $9.99

  Scenario: Applying a percentage discount
    Given the cart contains items totaling $100.00
    When a 10% discount code "SAVE10" is applied
    Then the cart total should be $90.00
    And the discount should be displayed as "-$10.00"
```

### BDD Tools by Language

| Language | BDD Framework | Syntax |
|----------|--------------|--------|
| JavaScript | Jest + custom | describe/it with domain naming |
| JavaScript | Cucumber.js | Gherkin feature files |
| Python | pytest-bdd | Gherkin feature files |
| Python | behave | Gherkin with step definitions |
| Java | Cucumber-JVM | Gherkin feature files |
| Ruby | RSpec | describe/context/it |

---

## Framework Deep Dives

### Jest (JavaScript/TypeScript)

```typescript
// user-service.test.ts
import { UserService } from './user-service';
import { UserRepository } from './user-repository';
import { EmailService } from './email-service';

// Mock dependencies
jest.mock('./user-repository');
jest.mock('./email-service');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepo: jest.Mocked<UserRepository>;
  let mockEmailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    // Fresh mocks for each test — no shared state
    mockUserRepo = new UserRepository() as jest.Mocked<UserRepository>;
    mockEmailService = new EmailService() as jest.Mocked<EmailService>;
    userService = new UserService(mockUserRepo, mockEmailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('should create a user and send a welcome email', async () => {
      // Arrange
      const userData = { email: 'test@example.com', name: 'Test User' };
      const savedUser = { id: '123', ...userData, createdAt: new Date() };
      mockUserRepo.save.mockResolvedValue(savedUser);
      mockEmailService.sendWelcome.mockResolvedValue(undefined);

      // Act
      const result = await userService.createUser(userData);

      // Assert
      expect(result).toEqual(savedUser);
      expect(mockUserRepo.save).toHaveBeenCalledWith(userData);
      expect(mockEmailService.sendWelcome).toHaveBeenCalledWith(savedUser.email);
    });

    it('should throw if email is already registered', async () => {
      // Arrange
      const userData = { email: 'existing@example.com', name: 'Duplicate' };
      mockUserRepo.findByEmail.mockResolvedValue({ id: '456', ...userData });

      // Act & Assert
      await expect(userService.createUser(userData))
        .rejects
        .toThrow('Email already registered');
      expect(mockUserRepo.save).not.toHaveBeenCalled();
      expect(mockEmailService.sendWelcome).not.toHaveBeenCalled();
    });
  });
});
```

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/',
    '/dist/',
    '.d.ts$',
  ],
  setupFilesAfterSetup: ['<rootDir>/src/test-setup.ts'],
  maxWorkers: '50%',
};
```

### pytest (Python)

```python
# test_order_service.py
import pytest
from unittest.mock import AsyncMock, MagicMock, patch
from decimal import Decimal
from order_service import OrderService, InsufficientStockError

@pytest.fixture
def mock_inventory():
    inventory = AsyncMock()
    inventory.check_availability.return_value = True
    inventory.reserve.return_value = "reservation-123"
    return inventory

@pytest.fixture
def mock_payment():
    payment = AsyncMock()
    payment.charge.return_value = {"transaction_id": "txn-456", "status": "success"}
    return payment

@pytest.fixture
def order_service(mock_inventory, mock_payment):
    return OrderService(inventory=mock_inventory, payment=mock_payment)

class TestOrderService:
    @pytest.mark.asyncio
    async def test_place_order_success(self, order_service, mock_inventory, mock_payment):
        """Placing an order should reserve inventory and charge payment."""
        order = await order_service.place_order(
            user_id="user-1",
            items=[{"sku": "WIDGET-01", "quantity": 2, "price": Decimal("9.99")}]
        )

        assert order.status == "confirmed"
        assert order.total == Decimal("19.98")
        mock_inventory.reserve.assert_called_once()
        mock_payment.charge.assert_called_once_with(
            user_id="user-1",
            amount=Decimal("19.98"),
        )

    @pytest.mark.asyncio
    async def test_place_order_insufficient_stock(self, order_service, mock_inventory):
        """Order should fail if inventory is not available."""
        mock_inventory.check_availability.return_value = False

        with pytest.raises(InsufficientStockError):
            await order_service.place_order(
                user_id="user-1",
                items=[{"sku": "WIDGET-01", "quantity": 100, "price": Decimal("9.99")}]
            )

    @pytest.mark.parametrize("discount,expected_total", [
        (Decimal("0"), Decimal("19.98")),
        (Decimal("0.10"), Decimal("17.982")),
        (Decimal("0.50"), Decimal("9.99")),
        (Decimal("1.00"), Decimal("0")),
    ])
    @pytest.mark.asyncio
    async def test_discount_calculation(self, order_service, discount, expected_total):
        """Discounts should reduce total by the correct percentage."""
        order = await order_service.place_order(
            user_id="user-1",
            items=[{"sku": "WIDGET-01", "quantity": 2, "price": Decimal("9.99")}],
            discount=discount,
        )
        assert order.total == expected_total
```

---

## The AAA Pattern (Arrange-Act-Assert)

Every unit test should follow the AAA structure:

```
Arrange  → Set up preconditions, create objects, configure mocks
Act      → Execute the method or function under test (single action)
Assert   → Verify the result or side effects (focused assertions)
```

### AAA Anti-Patterns

| Anti-Pattern | Problem | Correct Approach |
|-------------|---------|-----------------|
| Multiple Act steps | Testing multiple behaviors in one test | One Act per test |
| Assert in Arrange | Asserting setup correctness | Trust the setup or test it separately |
| No Assert | Test passes without verifying anything | Every test must assert something |
| Excessive assertions | Testing implementation details | Assert behavior, not internals |
| Shared state between tests | Test order dependencies | Fresh setup in beforeEach/fixture |

---

## Mocking, Stubbing, and Faking

### Terminology

| Concept | Definition | Use Case |
|---------|-----------|----------|
| Mock | Object that records interactions (calls, arguments) and can verify them | Verify a function was called with correct arguments |
| Stub | Object that returns predetermined values | Provide canned responses for dependencies |
| Fake | Lightweight implementation of a dependency | In-memory database, fake HTTP server |
| Spy | Wraps a real object, records interactions but delegates to real implementation | Verify calls while using real behavior |

### Mocking Best Practices

```typescript
// GOOD: Mock at the boundary (repository, external API)
const mockRepository = {
  findById: jest.fn().mockResolvedValue({ id: '1', name: 'Widget' }),
  save: jest.fn().mockResolvedValue(undefined),
};

// BAD: Mocking internal implementation details
const mockPrivateMethod = jest.spyOn(service, '_calculateDiscount');
// This couples tests to implementation — refactoring will break tests

// GOOD: Use dependency injection for testability
class OrderService {
  constructor(
    private readonly repo: OrderRepository,
    private readonly payment: PaymentGateway,
  ) {}
}

// BAD: Hard-coded dependencies
class OrderService {
  private repo = new OrderRepository(); // Cannot mock in tests
}
```

### When NOT to Mock

- Pure functions with no dependencies — test directly
- Value objects and data structures — test directly
- Simple utility functions — test directly
- When the real dependency is fast and deterministic — use the real thing

---

## Test Organization

### File Structure

```
src/
├── services/
│   ├── user-service.ts
│   ├── user-service.test.ts        ← Co-located test
│   ├── order-service.ts
│   └── order-service.test.ts
├── utils/
│   ├── validators.ts
│   └── validators.test.ts
└── __tests__/
    └── integration/                 ← Separate integration tests
        └── user-flow.test.ts
```

### Test Naming Conventions

```typescript
// Pattern: should [expected behavior] when [condition]
describe('DiscountCalculator', () => {
  it('should apply 10% discount when cart exceeds $100', () => {});
  it('should not apply discount when cart is under $100', () => {});
  it('should stack discounts when multiple codes are valid', () => {});
  it('should reject expired discount codes', () => {});
  it('should throw when discount percentage exceeds 100%', () => {});
});
```

---

## Coverage Analysis

### Coverage Types

| Type | What It Measures | Usefulness |
|------|-----------------|-----------|
| Line coverage | Lines executed | Basic — can miss branch logic |
| Branch coverage | Decision paths taken | Better — catches untested conditions |
| Function coverage | Functions called | Basic — does not measure depth |
| Statement coverage | Statements executed | Similar to line coverage |
| Condition coverage | Boolean sub-expressions | Advanced — catches complex conditionals |
| MC/DC coverage | Modified condition/decision | Aviation/safety-critical standard |

### Coverage Targets

| Context | Line Coverage | Branch Coverage | Rationale |
|---------|-------------|----------------|-----------|
| Critical business logic | >95% | >90% | Revenue and compliance risk |
| Application services | >85% | >80% | Core functionality |
| Utility code | >90% | >85% | Widely reused, high leverage |
| Generated code | Exclude | Exclude | Test the generator, not output |
| UI components | >70% | >60% | Visual testing supplements |

### Coverage Anti-Patterns

| Anti-Pattern | Why It Is Harmful |
|-------------|------------------|
| 100% coverage mandate | Encourages trivial tests, discourages refactoring |
| Coverage without assertions | Tests execute code but verify nothing |
| Testing getters/setters | No business value, inflates metrics |
| Ignoring branch coverage | 100% line coverage with 50% branch coverage misses conditions |

---

## Test Quality Metrics

| Metric | What It Indicates | Target |
|--------|------------------|--------|
| Test execution time | Suite speed affects developer workflow | <30 seconds for unit suite |
| Mutation score | Percentage of code mutations caught by tests | >80% |
| Flaky test rate | Tests that pass/fail non-deterministically | <1% |
| Test-to-code ratio | Lines of test code per line of production code | 1:1 to 3:1 |
| Defect detection rate | Percentage of defects caught before production | >90% |

---

## Common Mistakes

| Mistake | Impact | Correction |
|---------|--------|-----------|
| Testing implementation, not behavior | Tests break on refactoring | Assert outputs and side effects only |
| Shared mutable state between tests | Non-deterministic failures | Fresh setup per test |
| Overly specific assertions | Brittle tests | Assert what matters, ignore incidentals |
| Not testing edge cases | Production failures on unexpected input | Null, empty, boundary, overflow |
| Slow unit tests | Developers skip running them | Mock I/O, keep tests pure |
| Testing framework code | No value — test your code, not the library | Focus on your business logic |

---

## Cross-References

- `03_automation/integration_testing.md` — Testing component interactions
- `03_automation/e2e_testing.md` — Full system testing
- `06_ci_cd/quality_gates.md` — Coverage gates in CI/CD
- `07_management/test_metrics.md` — Measuring test effectiveness
- `08_advanced/property_based_testing.md` — Generative testing techniques

