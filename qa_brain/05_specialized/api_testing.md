# API Testing — REST, GraphQL, and gRPC Verification

## Overview

API testing validates the programmatic interfaces that connect systems, services, and clients. APIs are the primary integration surface in modern architectures — every microservice, mobile app, third-party integration, and frontend application communicates through APIs. API defects propagate across the entire system: a malformed response from one service becomes invalid input to every consuming service. API testing must verify functional correctness (does the endpoint return the right data?), contract compliance (does the response match the documented schema?), error handling (does the API degrade gracefully?), security (is authentication and authorization enforced?), and performance (does the API respond within SLA?).

The API layer is uniquely testable because it has a well-defined interface (HTTP methods, paths, headers, status codes, request/response bodies) that can be exercised without a user interface. This makes API tests faster, more reliable, and more precise than UI-level tests while covering more integration surface than unit tests.

---

## REST API Testing

### HTTP Method Semantics

| Method | Semantics | Idempotent | Safe | Typical Tests |
|--------|-----------|-----------|------|--------------|
| GET | Retrieve resource | Yes | Yes | Status 200, correct body, pagination, filtering |
| POST | Create resource | No | No | Status 201, Location header, duplicate handling |
| PUT | Replace resource entirely | Yes | No | Status 200, all fields updated, missing fields |
| PATCH | Partial update | No* | No | Status 200, only specified fields changed |
| DELETE | Remove resource | Yes | No | Status 204, subsequent GET returns 404 |
| HEAD | Headers only (like GET) | Yes | Yes | Same headers as GET, no body |
| OPTIONS | Available methods | Yes | Yes | CORS headers, allowed methods |

*PATCH can be made idempotent depending on implementation.

### Comprehensive REST Test Coverage

```typescript
// order-api.test.ts
import request from 'supertest';
import { app } from '../app';
import { seedDatabase, cleanDatabase, createAuthToken } from './helpers';

describe('POST /api/v1/orders', () => {
  let authToken: string;

  beforeAll(async () => {
    await seedDatabase();
    authToken = await createAuthToken({ role: 'customer', userId: 'user-1' });
  });

  afterAll(async () => {
    await cleanDatabase();
  });

  // Happy path
  it('should create an order and return 201 with order details', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        items: [{ sku: 'WIDGET-01', quantity: 2 }],
        shippingAddress: {
          street: '123 Test St',
          city: 'Testville',
          state: 'CA',
          zip: '90210',
        },
      })
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      status: 'pending',
      items: expect.arrayContaining([
        expect.objectContaining({ sku: 'WIDGET-01', quantity: 2 }),
      ]),
      total: expect.any(Number),
      createdAt: expect.any(String),
    });
    expect(response.headers.location).toMatch(/\/api\/v1\/orders\/.+/);
  });

  // Validation errors
  it('should return 400 when items array is empty', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ items: [], shippingAddress: {} })
      .expect(400);

    expect(response.body.errors).toContainEqual(
      expect.objectContaining({
        field: 'items',
        message: expect.stringContaining('at least one item'),
      })
    );
  });

  // Authentication
  it('should return 401 when no auth token is provided', async () => {
    await request(app)
      .post('/api/v1/orders')
      .send({ items: [{ sku: 'WIDGET-01', quantity: 1 }] })
      .expect(401);
  });

  // Authorization
  it('should return 403 when user lacks order creation permission', async () => {
    const readOnlyToken = await createAuthToken({ role: 'viewer', userId: 'user-2' });
    await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${readOnlyToken}`)
      .send({ items: [{ sku: 'WIDGET-01', quantity: 1 }] })
      .expect(403);
  });

  // Business rule violation
  it('should return 409 when item is out of stock', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        items: [{ sku: 'OUT-OF-STOCK-01', quantity: 1 }],
        shippingAddress: { street: '123 Test St', city: 'X', state: 'CA', zip: '90210' },
      })
      .expect(409);

    expect(response.body.error).toContain('insufficient stock');
  });

  // Idempotency
  it('should return same order when idempotency key is reused', async () => {
    const idempotencyKey = 'idem-key-12345';
    const payload = {
      items: [{ sku: 'WIDGET-01', quantity: 1 }],
      shippingAddress: { street: '123 Test St', city: 'X', state: 'CA', zip: '90210' },
    };

    const first = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Idempotency-Key', idempotencyKey)
      .send(payload)
      .expect(201);

    const second = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Idempotency-Key', idempotencyKey)
      .send(payload)
      .expect(200); // 200, not 201 — already created

    expect(first.body.id).toBe(second.body.id);
  });
});
```

### Response Schema Validation

```typescript
// Using Zod for runtime schema validation in tests
import { z } from 'zod';

const OrderResponseSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled']),
  items: z.array(z.object({
    sku: z.string(),
    name: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
    subtotal: z.number().positive(),
  })).min(1),
  total: z.number().nonnegative(),
  shippingAddress: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string().length(2),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

it('should return a valid order schema', async () => {
  const response = await request(app)
    .get('/api/v1/orders/order-123')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);

  const result = OrderResponseSchema.safeParse(response.body);
  expect(result.success).toBe(true);
  if (!result.success) {
    console.error('Schema validation errors:', result.error.issues);
  }
});
```

---

## GraphQL API Testing

### GraphQL Test Categories

| Category | What to Test | Example |
|----------|-------------|---------|
| Query correctness | Returns correct data for valid queries | Fetch user by ID |
| Mutation behavior | Creates/updates/deletes correctly | Create order mutation |
| Authorization | Field-level access control | Admin-only fields |
| Input validation | Rejects invalid input variables | Negative quantity |
| Error handling | Returns proper GraphQL errors | Nonexistent resource |
| N+1 prevention | DataLoader batching works | Query with nested relations |
| Depth/complexity limits | Rejects abusive queries | Deeply nested query |
| Pagination | Cursor-based pagination works | First/after arguments |

### GraphQL Test Examples

```typescript
// graphql-orders.test.ts
import request from 'supertest';
import { app } from '../app';

describe('GraphQL Order Queries', () => {
  it('should fetch an order with items and customer', async () => {
    const query = `
      query GetOrder($id: ID!) {
        order(id: $id) {
          id
          status
          total
          items {
            sku
            name
            quantity
            price
          }
          customer {
            id
            name
            email
          }
          createdAt
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query, variables: { id: 'order-123' } })
      .expect(200);

    expect(response.body.errors).toBeUndefined();
    expect(response.body.data.order).toMatchObject({
      id: 'order-123',
      status: 'CONFIRMED',
      items: expect.arrayContaining([
        expect.objectContaining({ sku: 'WIDGET-01' }),
      ]),
      customer: expect.objectContaining({ id: 'user-1' }),
    });
  });

  it('should enforce query depth limit', async () => {
    const deepQuery = `
      query {
        order(id: "order-123") {
          customer {
            orders {
              customer {
                orders {
                  customer {
                    orders {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ query: deepQuery })
      .expect(200);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].message).toContain('depth');
  });

  it('should hide email field from non-admin users', async () => {
    const query = `
      query { order(id: "order-123") { customer { email } } }
    `;

    const customerToken = await createAuthToken({ role: 'customer' });
    const response = await request(app)
      .post('/graphql')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({ query })
      .expect(200);

    expect(response.body.data.order.customer.email).toBeNull();
  });
});
```

---

## gRPC API Testing

### gRPC Test Setup

```typescript
// grpc-order-service.test.ts
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.join(__dirname, '../protos/order_service.proto');

describe('OrderService gRPC', () => {
  let client: any;

  beforeAll(async () => {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
    });
    const proto = grpc.loadPackageDefinition(packageDefinition) as any;
    client = new proto.order.OrderService(
      'localhost:50051',
      grpc.credentials.createInsecure()
    );
  });

  it('should create an order via gRPC', (done) => {
    client.CreateOrder(
      {
        user_id: 'user-1',
        items: [{ sku: 'WIDGET-01', quantity: 2 }],
      },
      (err: any, response: any) => {
        expect(err).toBeNull();
        expect(response.order_id).toBeDefined();
        expect(response.status).toBe('PENDING');
        done();
      }
    );
  });

  it('should return NOT_FOUND for nonexistent order', (done) => {
    client.GetOrder(
      { order_id: 'nonexistent-id' },
      (err: any, response: any) => {
        expect(err).toBeDefined();
        expect(err.code).toBe(grpc.status.NOT_FOUND);
        done();
      }
    );
  });
});
```

---

## API Security Testing

### Security Test Checklist

| Category | Test | Expected Result |
|----------|------|----------------|
| Authentication | Missing token | 401 Unauthorized |
| Authentication | Expired token | 401 Unauthorized |
| Authentication | Malformed token | 401 Unauthorized |
| Authorization | Access other user's resource | 403 Forbidden |
| Authorization | Escalate own permissions | 403 Forbidden |
| Input injection | SQL injection in query params | 400 Bad Request (not 500) |
| Input injection | XSS in text fields | Sanitized output |
| Input injection | Path traversal in file params | 400 Bad Request |
| Rate limiting | Exceed rate limit | 429 Too Many Requests |
| Data exposure | Verbose error messages | Generic error, no stack trace |
| Data exposure | Sensitive fields in response | Excluded or masked |
| CORS | Cross-origin request from unknown domain | No CORS headers |
| HTTP headers | Security headers present | X-Content-Type-Options, etc. |

### OWASP API Security Top 10

| # | Vulnerability | Test Approach |
|---|--------------|---------------|
| API1 | Broken Object Level Authorization | Access resources by ID belonging to other users |
| API2 | Broken Authentication | Token manipulation, credential stuffing |
| API3 | Broken Object Property Level Authorization | Modify read-only fields via API |
| API4 | Unrestricted Resource Consumption | Large payloads, excessive pagination |
| API5 | Broken Function Level Authorization | Call admin endpoints as regular user |
| API6 | Unrestricted Access to Sensitive Business Flows | Automated abuse of business features |
| API7 | Server-Side Request Forgery | Internal URL in request parameters |
| API8 | Security Misconfiguration | Default credentials, verbose errors |
| API9 | Improper Inventory Management | Access undocumented/deprecated endpoints |
| API10 | Unsafe Consumption of APIs | Manipulate third-party API responses |

---

## API Test Organization

### Test Structure

```
tests/
├── api/
│   ├── auth/
│   │   ├── login.test.ts
│   │   ├── registration.test.ts
│   │   └── token-refresh.test.ts
│   ├── orders/
│   │   ├── create-order.test.ts
│   │   ├── get-order.test.ts
│   │   ├── list-orders.test.ts
│   │   ├── update-order.test.ts
│   │   └── cancel-order.test.ts
│   ├── products/
│   │   ├── search-products.test.ts
│   │   └── get-product.test.ts
│   └── helpers/
│       ├── auth.ts           # Token generation helpers
│       ├── seed.ts           # Database seeding
│       └── schemas.ts        # Response schema definitions
```

### API Test Naming Convention

```typescript
describe('POST /api/v1/orders', () => {
  describe('when authenticated as customer', () => {
    it('should create order with valid items → 201', () => {});
    it('should reject empty items array → 400', () => {});
    it('should reject negative quantity → 400', () => {});
    it('should handle out-of-stock gracefully → 409', () => {});
  });

  describe('when authenticated as admin', () => {
    it('should create order on behalf of any user → 201', () => {});
  });

  describe('when not authenticated', () => {
    it('should reject with 401', () => {});
  });
});
```

---

## API Test Automation in CI

| Gate | Trigger | Threshold |
|------|---------|-----------|
| Schema validation | Every PR | 100% endpoints validated |
| Functional tests | Every PR | 100% pass |
| Security tests | Every PR | No critical/high findings |
| Contract tests | Every PR | All consumer contracts verified |
| Performance baseline | Nightly | No regression >10% from baseline |

---

## Cross-References

- `03_automation/integration_testing.md` — Component integration with APIs
- `05_specialized/mobile_testing.md` — Mobile API testing considerations
- `06_ci_cd/quality_gates.md` — API test gates in CI/CD
- `07_management/test_metrics.md` — API test coverage metrics
- `Patterns/test_automation_pattern.md` — Automation patterns for API tests

