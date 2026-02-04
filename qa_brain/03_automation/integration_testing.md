# Integration Testing — Verifying Component Interactions

## Overview

Integration testing validates the interactions between two or more components — services, databases, message queues, external APIs, and file systems. Where unit tests verify that individual units behave correctly in isolation, integration tests verify that those units collaborate correctly when connected. The integration boundary is where most production defects hide: serialization mismatches, network timeout handling, database constraint violations, race conditions, and protocol incompatibilities. A system composed of perfectly unit-tested components can still fail catastrophically at the seams.

Integration testing occupies the middle tier of the test pyramid. Tests are slower than unit tests (seconds to minutes rather than milliseconds) because they involve real or near-real infrastructure. They are faster and more reliable than end-to-end tests because they scope the interaction to specific component pairs rather than the entire system.

---

## Integration Testing Categories

### Component Integration Tests

Test the interaction between your application code and a real dependency:

```
┌──────────────┐       ┌──────────────┐
│  Application │ ────→ │   Database   │
│    Code      │       │  (Real/Test) │
└──────────────┘       └──────────────┘
```

Examples:
- Application code writing to and reading from PostgreSQL
- Service publishing and consuming messages from RabbitMQ
- Application interacting with Redis cache
- File processing code reading from S3

### Service Integration Tests

Test the interaction between two services:

```
┌──────────────┐  HTTP  ┌──────────────┐
│  Service A   │ ────→  │  Service B   │
│  (Real)      │        │  (Real/Mock) │
└──────────────┘        └──────────────┘
```

Examples:
- Order service calling inventory service via REST
- Payment service receiving webhooks from Stripe
- Authentication service validating tokens with identity provider

### Contract Tests

Verify that a provider's API conforms to the consumer's expectations:

```
┌──────────────┐               ┌──────────────┐
│   Consumer   │ ── Contract → │   Provider   │
│  (Generates  │               │  (Verifies   │
│   contract)  │               │   contract)  │
└──────────────┘               └──────────────┘
```

---

## Database Integration Testing

### Testcontainers Approach

Testcontainers provides real database instances via Docker, eliminating the gap between test and production environments:

```typescript
// order-repository.integration.test.ts
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { OrderRepository } from './order-repository';
import { Pool } from 'pg';
import { migrate } from './migrations';

describe('OrderRepository (Integration)', () => {
  let container: StartedPostgreSqlContainer;
  let pool: Pool;
  let repository: OrderRepository;

  beforeAll(async () => {
    // Start a real PostgreSQL container
    container = await new PostgreSqlContainer('postgres:15')
      .withDatabase('test_db')
      .start();

    pool = new Pool({
      host: container.getHost(),
      port: container.getPort(),
      database: container.getDatabase(),
      user: container.getUsername(),
      password: container.getPassword(),
    });

    // Run migrations against the test database
    await migrate(pool);

    repository = new OrderRepository(pool);
  }, 60_000); // Container startup timeout

  afterAll(async () => {
    await pool.end();
    await container.stop();
  });

  beforeEach(async () => {
    // Clean slate for each test
    await pool.query('DELETE FROM order_items');
    await pool.query('DELETE FROM orders');
  });

  it('should persist an order and retrieve it by ID', async () => {
    const order = {
      userId: 'user-1',
      items: [
        { sku: 'WIDGET-01', quantity: 2, price: 9.99 },
        { sku: 'GADGET-02', quantity: 1, price: 24.99 },
      ],
    };

    const savedOrder = await repository.create(order);
    const retrieved = await repository.findById(savedOrder.id);

    expect(retrieved).not.toBeNull();
    expect(retrieved!.userId).toBe('user-1');
    expect(retrieved!.items).toHaveLength(2);
    expect(retrieved!.total).toBeCloseTo(44.97, 2);
  });

  it('should enforce unique constraint on order reference', async () => {
    await repository.create({ userId: 'user-1', reference: 'REF-001', items: [] });

    await expect(
      repository.create({ userId: 'user-2', reference: 'REF-001', items: [] })
    ).rejects.toThrow(/unique constraint/i);
  });

  it('should handle concurrent updates with optimistic locking', async () => {
    const order = await repository.create({ userId: 'user-1', items: [] });

    // Simulate two concurrent reads
    const version1 = await repository.findById(order.id);
    const version2 = await repository.findById(order.id);

    // First update succeeds
    await repository.updateStatus(order.id, 'shipped', version1!.version);

    // Second update fails — stale version
    await expect(
      repository.updateStatus(order.id, 'cancelled', version2!.version)
    ).rejects.toThrow(/optimistic lock/i);
  });
});
```

### Python with pytest and Testcontainers

```python
# test_user_repository.py
import pytest
from testcontainers.postgres import PostgresContainer
import sqlalchemy
from user_repository import UserRepository
from models import Base

@pytest.fixture(scope="module")
def postgres():
    with PostgresContainer("postgres:15") as pg:
        engine = sqlalchemy.create_engine(pg.get_connection_url())
        Base.metadata.create_all(engine)
        yield engine

@pytest.fixture
def repository(postgres):
    session = sqlalchemy.orm.Session(postgres)
    repo = UserRepository(session)
    yield repo
    session.rollback()
    session.close()

class TestUserRepository:
    def test_create_and_find_user(self, repository):
        user = repository.create(email="test@example.com", name="Test User")
        found = repository.find_by_email("test@example.com")
        assert found is not None
        assert found.name == "Test User"
        assert found.id == user.id

    def test_find_nonexistent_user_returns_none(self, repository):
        found = repository.find_by_email("nonexistent@example.com")
        assert found is None
```

---

## API Integration Testing

### HTTP Client Testing

```typescript
// payment-client.integration.test.ts
import nock from 'nock';
import { PaymentClient } from './payment-client';

describe('PaymentClient (Integration)', () => {
  const baseUrl = 'https://api.payment-provider.com';
  let client: PaymentClient;

  beforeEach(() => {
    client = new PaymentClient({ baseUrl, apiKey: 'test-key' });
    nock.cleanAll();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create a charge and return transaction ID', async () => {
    nock(baseUrl)
      .post('/v1/charges', {
        amount: 1999,
        currency: 'usd',
        source: 'tok_visa',
      })
      .reply(200, {
        id: 'ch_123456',
        status: 'succeeded',
        amount: 1999,
      });

    const result = await client.createCharge({
      amount: 1999,
      currency: 'usd',
      source: 'tok_visa',
    });

    expect(result.id).toBe('ch_123456');
    expect(result.status).toBe('succeeded');
  });

  it('should retry on 503 and succeed on second attempt', async () => {
    nock(baseUrl)
      .post('/v1/charges')
      .reply(503, { error: 'Service unavailable' });

    nock(baseUrl)
      .post('/v1/charges')
      .reply(200, { id: 'ch_789', status: 'succeeded', amount: 1999 });

    const result = await client.createCharge({
      amount: 1999,
      currency: 'usd',
      source: 'tok_visa',
    });

    expect(result.id).toBe('ch_789');
  });

  it('should throw after exhausting retries', async () => {
    nock(baseUrl)
      .post('/v1/charges')
      .times(3)
      .reply(503, { error: 'Service unavailable' });

    await expect(
      client.createCharge({ amount: 1999, currency: 'usd', source: 'tok_visa' })
    ).rejects.toThrow(/service unavailable/i);
  });

  it('should handle timeout gracefully', async () => {
    nock(baseUrl)
      .post('/v1/charges')
      .delayConnection(10_000)
      .reply(200, {});

    await expect(
      client.createCharge({ amount: 1999, currency: 'usd', source: 'tok_visa' })
    ).rejects.toThrow(/timeout/i);
  });
});
```

---

## Contract Testing with Pact

### Consumer-Side Contract

```typescript
// order-service.consumer.pact.test.ts
import { PactV3, MatchersV3 } from '@pact-foundation/pact';

const { like, eachLike, string, integer } = MatchersV3;

const provider = new PactV3({
  consumer: 'OrderService',
  provider: 'InventoryService',
  dir: './pacts',
});

describe('OrderService → InventoryService Contract', () => {
  it('should return stock availability for a SKU', async () => {
    await provider
      .given('SKU WIDGET-01 exists with 50 units in stock')
      .uponReceiving('a request for stock availability')
      .withRequest({
        method: 'GET',
        path: '/api/v1/inventory/WIDGET-01',
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: {
          sku: string('WIDGET-01'),
          available: integer(50),
          reserved: integer(5),
          warehouse: string('US-EAST-1'),
        },
      })
      .executeTest(async (mockServer) => {
        const client = new InventoryClient({ baseUrl: mockServer.url });
        const result = await client.checkAvailability('WIDGET-01');

        expect(result.sku).toBe('WIDGET-01');
        expect(result.available).toBeGreaterThan(0);
      });
  });
});
```

### Provider-Side Verification

```typescript
// inventory-service.provider.pact.test.ts
import { Verifier } from '@pact-foundation/pact';

describe('InventoryService Provider Verification', () => {
  it('should honor the contract with OrderService', async () => {
    await new Verifier({
      providerBaseUrl: 'http://localhost:3001',
      pactUrls: ['./pacts/OrderService-InventoryService.json'],
      stateHandlers: {
        'SKU WIDGET-01 exists with 50 units in stock': async () => {
          // Seed the database with test data
          await seedInventory({ sku: 'WIDGET-01', available: 50, reserved: 5 });
        },
      },
    }).verifyProvider();
  });
});
```

### Contract Testing Benefits

| Benefit | Description |
|---------|------------|
| Decoupled testing | Consumer and provider tested independently |
| Fast feedback | No need to deploy both services together |
| Schema evolution safety | Breaking changes caught before deployment |
| Documentation | Pact files serve as living API documentation |
| CI/CD integration | Pact Broker manages contracts across pipelines |

---

## Message Queue Integration Testing

```typescript
// order-event-publisher.integration.test.ts
import { GenericContainer } from 'testcontainers';
import { Connection, Channel, connect } from 'amqplib';

describe('OrderEventPublisher (Integration with RabbitMQ)', () => {
  let container;
  let connection: Connection;
  let channel: Channel;

  beforeAll(async () => {
    container = await new GenericContainer('rabbitmq:3-management')
      .withExposedPorts(5672)
      .start();

    connection = await connect({
      hostname: container.getHost(),
      port: container.getMappedPort(5672),
    });
    channel = await connection.createChannel();
    await channel.assertExchange('orders', 'topic', { durable: true });
  }, 60_000);

  afterAll(async () => {
    await channel.close();
    await connection.close();
    await container.stop();
  });

  it('should publish order.created event with correct routing key', async () => {
    const queue = await channel.assertQueue('', { exclusive: true });
    await channel.bindQueue(queue.queue, 'orders', 'order.created');

    const publisher = new OrderEventPublisher(channel);
    await publisher.publishOrderCreated({
      orderId: 'order-123',
      userId: 'user-456',
      total: 49.99,
    });

    const message = await new Promise((resolve) => {
      channel.consume(queue.queue, (msg) => {
        if (msg) resolve(JSON.parse(msg.content.toString()));
      });
    });

    expect(message).toMatchObject({
      orderId: 'order-123',
      userId: 'user-456',
      total: 49.99,
      eventType: 'order.created',
    });
  });
});
```

---

## Integration Test Design Principles

### Isolation Strategies

| Strategy | Description | Trade-off |
|----------|------------|-----------|
| Testcontainers | Real infrastructure via Docker | Slower startup, high fidelity |
| In-memory alternatives | SQLite, fake S3 (MinIO) | Fast, lower fidelity |
| Shared test database | Single database for all tests | Fast, requires cleanup discipline |
| Transaction rollback | Wrap each test in a rolled-back transaction | Fast, some features untestable (DDL) |
| Schema-per-test | Each test gets its own schema | Isolated, expensive at scale |

### Data Management

```typescript
// test-data-builder.ts — Builder pattern for test data
class OrderBuilder {
  private order: Partial<Order> = {
    userId: 'default-user',
    status: 'pending',
    items: [],
  };

  withUser(userId: string): this {
    this.order.userId = userId;
    return this;
  }

  withItem(sku: string, quantity: number, price: number): this {
    this.order.items!.push({ sku, quantity, price });
    return this;
  }

  withStatus(status: OrderStatus): this {
    this.order.status = status;
    return this;
  }

  async buildAndPersist(repo: OrderRepository): Promise<Order> {
    return repo.create(this.order as CreateOrderInput);
  }
}

// Usage in tests
const order = await new OrderBuilder()
  .withUser('user-1')
  .withItem('WIDGET-01', 2, 9.99)
  .withStatus('confirmed')
  .buildAndPersist(repository);
```

---

## Common Integration Testing Mistakes

| Mistake | Impact | Correction |
|---------|--------|-----------|
| Testing too many layers at once | Slow, hard to diagnose failures | Test one integration boundary per test |
| Not cleaning up test data | Non-deterministic test order dependencies | Clean before each test, use transactions |
| Hardcoded ports | Port conflicts in CI | Use dynamic ports (Testcontainers handles this) |
| Missing timeout configuration | Tests hang indefinitely | Set explicit timeouts on all async operations |
| Testing third-party API behavior | Brittle, depends on external availability | Mock external APIs, test your client logic |
| No network failure testing | Misses timeout, retry, circuit breaker paths | Test error scenarios: timeout, 5xx, connection refused |

---

## Integration Test Performance

| Technique | Impact | Implementation |
|-----------|--------|---------------|
| Container reuse | 50-80% faster | Reuse containers across test files |
| Parallel test execution | 2-4x faster | Isolate by schema or database |
| Selective test execution | 5-10x faster | Only run tests for changed components |
| Warm containers in CI | 30-60s saved | Pre-pull Docker images in CI |
| Database template cloning | 10x faster than migration | Create template DB, clone per test suite |

---

## Cross-References

- `03_automation/unit_testing.md` — Unit test foundations
- `03_automation/e2e_testing.md` — Full system testing
- `05_specialized/api_testing.md` — API testing strategies
- `06_ci_cd/quality_gates.md` — Integration test gates in CI
- `06_ci_cd/test_environments.md` — Environment management for integration tests

