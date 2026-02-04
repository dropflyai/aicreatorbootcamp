# Contract Testing

## What This Enables

Contract testing provides a mechanism for verifying that services in a distributed system can communicate correctly without requiring all services to be deployed simultaneously. When contract testing is implemented at the highest level, consumer-driven contracts (Pact) ensure that API providers do not break their consumers, API schema validation catches structural incompatibilities before runtime, microservice testing achieves high integration confidence with fast, isolated tests, and backwards compatibility is enforced systematically across every API version change.

---

## The Core Insight

The fundamental problem of microservice testing is combinatorial: if you have N services, testing all pairwise interactions requires O(N^2) integration tests, each requiring both services to be deployed. As N grows, this approach becomes untenable. Contract testing, formalized by Ian Robinson and Martin Fowler and implemented in the Pact framework by Ron Holshausen and Beth Skurrie, provides an O(N) alternative: **each service is tested independently against a contract, and the contract is the single source of truth for the interaction agreement between consumer and provider**.

The insight is that integration failures fall into two categories: (1) the provider does not return what the consumer expects (structural/semantic mismatch), and (2) the consumer does not handle what the provider returns (missing error handling, unexpected fields). Contract testing catches both categories without requiring an integrated environment. This decoupling enables each service to be tested, deployed, and released independently -- the foundational property of a true microservice architecture.

---

## Consumer-Driven Contracts (CDC)

### The CDC Philosophy

In consumer-driven contract testing, the consumer defines what it needs from the provider, and the provider validates that it meets those needs. This inverts the traditional approach where the provider defines an API and consumers must adapt.

**Why consumer-driven?** Because the consumer knows what it actually uses. A provider API might have 50 endpoints, but a specific consumer only uses 3. The contract captures only the 3 interactions that matter to that consumer, making the contract minimal, focused, and maintainable.

### The Pact Workflow

Pact is the most widely adopted consumer-driven contract testing framework, available for Java, JavaScript, Python, Go, Ruby, .NET, and Rust.

**Step 1: Consumer writes a contract (Pact file)**
```typescript
// Consumer side: OrderService consumes PaymentService
const provider = new PactV4({
  consumer: "OrderService",
  provider: "PaymentService",
});

describe("PaymentService contract", () => {
  it("processes a payment", async () => {
    await provider
      .addInteraction()
      .given("a valid payment method exists")
      .uponReceiving("a payment request")
      .withRequest({
        method: "POST",
        path: "/api/v1/payments",
        headers: { "Content-Type": "application/json" },
        body: {
          amount: 4999,
          currency: "USD",
          paymentMethodId: "pm_123",
        },
      })
      .willRespondWith({
        status: 200,
        headers: { "Content-Type": "application/json" },
        body: {
          id: like("pay_abc123"),
          status: "succeeded",
          amount: 4999,
        },
      })
      .executeTest(async (mockServer) => {
        const client = new PaymentClient(mockServer.url);
        const result = await client.processPayment({
          amount: 4999,
          currency: "USD",
          paymentMethodId: "pm_123",
        });
        expect(result.status).toBe("succeeded");
      });
  });
});
```

**Step 2: Pact file is published to Pact Broker**
The consumer test generates a JSON Pact file describing the expected interactions. This file is published to a Pact Broker (a shared contract repository).

**Step 3: Provider verifies against the contract**
```typescript
// Provider side: PaymentService verifies it meets OrderService's contract
const opts = {
  provider: "PaymentService",
  providerBaseUrl: "http://localhost:3000",
  pactBrokerUrl: "https://pact-broker.company.dev",
  publishVerificationResult: true,
  providerVersion: process.env.GIT_COMMIT,
  stateHandlers: {
    "a valid payment method exists": async () => {
      await seedPaymentMethod("pm_123");
    },
  },
};

new Verifier(opts).verifyProvider();
```

**Step 4: Deployment decision**
The Pact Broker tracks which consumer and provider versions are compatible. Before deploying, query: "Can I deploy PaymentService v2.3.1 to production given the consumers currently in production?"

### Pact Broker and the "Can I Deploy?" Check

```bash
# Before deploying PaymentService v2.3.1
pact-broker can-i-deploy \
  --pacticipant PaymentService \
  --version 2.3.1 \
  --to-environment production

# Output:
# COMPUTER SAYS YES
# All consumers in production have verified contracts with PaymentService v2.3.1
```

This check is the deployment gate. If any consumer's contract is not satisfied by the new provider version, deployment is blocked.

### Provider States

Provider states set up preconditions for contract verification. Without them, the provider cannot guarantee the correct response because the response depends on data state.

```
Provider state: "a user with ID 42 exists"
  → Provider sets up: INSERT INTO users (id, name) VALUES (42, 'Test User')
  → Now the GET /users/42 endpoint will return the expected response

Provider state: "no users exist"
  → Provider sets up: DELETE FROM users
  → Now the GET /users/42 endpoint will return 404
```

---

## API Schema Validation

### Schema-First Design and Testing

When APIs are designed schema-first (OpenAPI, GraphQL SDL, Protocol Buffers), the schema serves as a machine-readable contract that can be validated at multiple levels:

**Compile-time validation:**
- Generated client libraries enforce type safety
- Schema breaking change detection (see below)

**Test-time validation:**
- Request validation: Does the client send valid requests per the schema?
- Response validation: Does the server return valid responses per the schema?
- Example validation: Do the schema examples actually match the schema?

**Runtime validation:**
- Middleware validates every request/response against the schema
- Invalid requests return 400 with schema violation details
- Invalid responses are logged as server errors

### OpenAPI Schema Testing with Prism

Prism (from Stoplight) is an HTTP mock server and validator that uses OpenAPI specifications:

```bash
# Start a mock server from an OpenAPI spec
prism mock openapi.yaml

# Start a validation proxy in front of your real server
prism proxy openapi.yaml http://localhost:3000
# Prism validates every request/response against the spec
# Invalid interactions are flagged with detailed violation messages
```

### Schema Breaking Change Detection

API schemas evolve. Not all changes are safe. A breaking change detection tool analyzes the diff between two schema versions:

**Safe changes (non-breaking):**
- Adding a new optional field to a response
- Adding a new endpoint
- Adding a new optional query parameter
- Widening an enum (adding values)

**Unsafe changes (breaking):**
- Removing a field from a response
- Changing a field's type
- Making an optional field required
- Narrowing an enum (removing values)
- Changing a URL path
- Removing an endpoint

Tools: `oasdiff` (OpenAPI diff), `graphql-inspector` (GraphQL schema diff), `buf breaking` (Protocol Buffers)

---

## Microservice Testing Strategy

### The Microservice Testing Diamond

For microservice architectures, the traditional testing pyramid is modified:

```
                  ┌──────────┐
                  │   E2E    │  Very few (critical journeys only)
                  ├──────────┤
                 / Contract   \  Many (every consumer-provider pair)
                / Integration  \  Moderate (each service's internal integration)
               ├────────────────┤
              /                  \
             /    Unit Tests      \  Many (service-internal logic)
            └──────────────────────┘
```

Contract tests replace the need for many integration tests between services. Instead of deploying Service A and Service B together and testing their interaction, each service is tested independently against contracts.

### Testing Each Service in Isolation

Each microservice should be testable in complete isolation:

1. **Unit tests**: Test business logic without any I/O
2. **Integration tests**: Test with real database (Testcontainers), real message broker, real cache
3. **Contract tests (consumer side)**: Verify the service correctly calls its dependencies
4. **Contract tests (provider side)**: Verify the service correctly serves its consumers
5. **Component tests**: Test the entire service through its HTTP API with dependencies stubbed

### Cross-Service Testing

Some interactions cannot be verified by contracts alone:

- **Saga testing**: Multi-step workflows that span services (order -> payment -> fulfillment)
- **Event ordering**: Events must be processed in the correct order across services
- **Distributed transactions**: Consistency guarantees across service boundaries
- **End-to-end latency**: Aggregate latency across the call chain

These require targeted E2E tests or production monitoring, not contract tests.

---

## Backwards Compatibility

### The Compatibility Promise

When multiple consumers depend on a provider API, the provider must maintain backwards compatibility unless a coordinated migration is planned. Backwards compatibility means: **any client written against the current API will continue to function correctly against the new API**.

### Semantic Versioning for APIs

| Version Component | When to Increment | Compatibility Impact |
|-------------------|-------------------|---------------------|
| Major (v1 -> v2) | Breaking changes | Consumers must update |
| Minor (v1.1 -> v1.2) | New features, non-breaking | Consumers are unaffected |
| Patch (v1.1.1 -> v1.1.2) | Bug fixes, non-breaking | Consumers are unaffected |

### Compatibility Testing Strategies

**Multi-version testing:**
Run the provider's test suite with both old and new API versions active simultaneously. Both must pass.

**Consumer matrix testing:**
Test the new provider version against the last 3 major versions of each consumer. This ensures backwards compatibility across the consumer upgrade window.

**Robustness principle (Postel's Law):**
"Be conservative in what you send, be liberal in what you accept."
- Provider: Accept unknown fields in requests (ignore them), return consistent response structure
- Consumer: Ignore unknown fields in responses, do not depend on field ordering

### Deprecation Protocol

When a breaking change is unavoidable:

1. **Announce deprecation**: Document the deprecation in the API changelog with a sunset date
2. **Add deprecation headers**: `Deprecation: true`, `Sunset: Sat, 01 Mar 2025 00:00:00 GMT`
3. **Maintain old version**: Run both old and new versions simultaneously during migration period
4. **Track consumer migration**: Monitor which consumers are still using the deprecated version
5. **Enforce sunset**: After the sunset date, return 410 Gone for deprecated endpoints
6. **Remove old version**: Only after all consumers have migrated

---

## Failure Modes

1. **Contract Overspecification**: Contracts that specify exact field values instead of structural matchers, breaking on any provider data change
2. **Provider State Neglect**: Provider verification fails because provider states are not maintained, making contract tests unreliable
3. **Pact Broker Neglect**: The Pact Broker is not integrated into the deployment pipeline, so "can I deploy?" checks are never run
4. **Schema Drift**: The OpenAPI schema is not generated from code (or vice versa), so the schema and implementation diverge silently
5. **Consumer Orphans**: Consumers are decommissioned but their contracts remain in the Pact Broker, blocking provider changes unnecessarily
6. **False Compatibility Confidence**: Passing contract tests do not guarantee semantic compatibility -- the provider might return structurally correct but logically wrong data

---

## The Operator's Framework

When evaluating contract testing maturity, assess:

1. **Contract coverage**: What percentage of service-to-service interactions are covered by contracts?
2. **Pact Broker integration**: Is "can I deploy?" integrated into the deployment pipeline as a blocking gate?
3. **Schema validation**: Are request/response payloads validated against the API schema at test time and runtime?
4. **Breaking change detection**: Is there automated detection of schema breaking changes in CI?
5. **Consumer tracking**: Do you know which consumers use which provider endpoints, and at which versions?
6. **Provider state maintenance**: Are provider states kept up to date as the provider evolves?
7. **Deprecation compliance**: Is there a documented, enforced deprecation protocol with sunset dates?

---

## Summary

Contract testing solves the O(N^2) integration testing problem in microservice architectures by reducing it to O(N) independent contract verifications. Consumer-driven contracts (Pact) ensure that providers meet their consumers' actual needs, with the Pact Broker providing a centralized registry and deployment gate. API schema validation using OpenAPI, GraphQL, or Protocol Buffers provides compile-time and test-time structural verification. Breaking change detection tools automate the identification of backwards-incompatible changes. The microservice testing diamond places contract tests as the primary integration confidence layer, reducing the need for expensive cross-service E2E tests. Backwards compatibility is maintained through semantic versioning, multi-version testing, and a disciplined deprecation protocol. Contract testing is not a replacement for integration testing -- it is a complement that provides fast, isolated integration confidence while reserving expensive E2E tests for the scenarios that contracts cannot cover.
