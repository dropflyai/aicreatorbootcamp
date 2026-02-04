# API Design for Automation: REST, GraphQL, Webhooks, and Authentication

## Overview

APIs are the connective tissue of automation systems. Every workflow that spans multiple services depends on API communication. This module covers API design principles specifically for automation contexts: building APIs that are easy to integrate, consuming third-party APIs reliably, designing webhook architectures for real-time event processing, and implementing OAuth flows for secure service-to-service authentication.

---

## 1. REST API Design for Automation

### 1.1 Automation-Friendly Design Principles

APIs consumed by automation workflows have different requirements than APIs consumed by human-operated UIs:

**Predictable Response Shapes**: Every response for a given endpoint should have the same structure. Automation workflows parse responses programmatically -- missing fields or changed structures cause workflow failures. Use consistent null handling (return the field with null value, do not omit it).

**Meaningful Status Codes**: Return appropriate HTTP status codes that automation can branch on:

| Code | Meaning | Automation Response |
|------|---------|-------------------|
| 200 | Success | Continue workflow |
| 201 | Created | Continue, use returned ID |
| 204 | Deleted/Updated (no body) | Continue |
| 400 | Bad request (client error) | Log error, do not retry |
| 401 | Unauthorized | Refresh token, retry |
| 403 | Forbidden | Alert, do not retry |
| 404 | Not found | Handle gracefully (skip or create) |
| 409 | Conflict (duplicate) | Handle as idempotent success |
| 429 | Rate limited | Wait for Retry-After header, retry |
| 500 | Server error | Retry with backoff |
| 503 | Service unavailable | Retry with longer backoff |

**Idempotent Operations**: POST endpoints should support idempotency keys. When an automation retries a failed request, the API should recognize the duplicate and return the original result rather than creating a second record.

**Pagination**: For list endpoints, use cursor-based pagination (not offset-based). Cursor pagination is stable when records are added or deleted during iteration, which is common in automation contexts.

### 1.2 Batch Endpoints

Automation workflows often need to process many items. Batch endpoints reduce the number of API calls:

```
POST /api/v1/contacts/batch
Content-Type: application/json

{
  "operations": [
    {"method": "create", "data": {"name": "Alice", "email": "alice@example.com"}},
    {"method": "create", "data": {"name": "Bob", "email": "bob@example.com"}},
    {"method": "update", "id": "123", "data": {"name": "Charlie Updated"}}
  ]
}
```

**Response**: Return individual results for each operation, including errors for failed operations:

```json
{
  "results": [
    {"status": "success", "id": "456", "index": 0},
    {"status": "success", "id": "457", "index": 1},
    {"status": "error", "error": "Not found", "index": 2}
  ],
  "summary": {"total": 3, "succeeded": 2, "failed": 1}
}
```

### 1.3 Filtering and Field Selection

Allow automation workflows to request only the data they need:

**Field Selection**: `GET /api/v1/contacts?fields=id,name,email` -- reduces payload size and processing time.

**Filtering**: `GET /api/v1/contacts?created_after=2024-01-01&status=active` -- allows automation to retrieve only relevant records.

**Sorting**: `GET /api/v1/contacts?sort=created_at:desc` -- enables efficient incremental sync.

---

## 2. GraphQL for Automation

### 2.1 When GraphQL Excels

GraphQL is advantageous for automation when:
- The workflow needs data from multiple related entities in a single call
- Different workflows need different subsets of the same entity's fields
- The data model is deeply nested (orders -> line items -> products -> categories)
- API rate limits are tight and reducing call count is critical

### 2.2 Automation-Specific GraphQL Patterns

**Query Batching**: Combine multiple queries into a single request:

```graphql
query AutomationBatch {
  newOrders: orders(filter: {status: "new"}, first: 50) {
    id
    total
    customer { name email }
    items { productId quantity }
  }
  pendingRefunds: refunds(filter: {status: "pending"}, first: 20) {
    id
    orderId
    amount
    reason
  }
}
```

**Subscriptions**: GraphQL subscriptions provide real-time event streaming, eliminating the need for polling:

```graphql
subscription OrderUpdates {
  orderStatusChanged {
    orderId
    newStatus
    timestamp
  }
}
```

### 2.3 GraphQL Limitations for Automation

- More complex to implement in automation platforms (most provide REST-native support)
- Query complexity can lead to performance issues without proper depth/complexity limits
- Error handling is less standardized than REST
- Caching is more complex (no URL-based caching)

---

## 3. Webhooks

### 3.1 Webhook Architecture

Webhooks invert the communication direction: instead of the automation polling for changes, the source system pushes events to the automation endpoint when changes occur.

```
Source System                    Automation Platform
     |                                |
     |--- Event Occurs (new order) -->|
     |                                |--- Process Event
     |                                |--- Execute Workflow
     |                                |--- Return 200 OK --|
     |<-- Receive Acknowledgment -----|                    |
```

### 3.2 Webhook Design Principles

**Event Types**: Define specific event types. `order.created`, `order.updated`, `order.cancelled` is better than a generic `order.changed` because it allows automation to subscribe only to relevant events.

**Payload Design**: Include enough information in the webhook payload to process the event without making additional API calls:

```json
{
  "event": "order.created",
  "timestamp": "2024-03-15T10:30:00Z",
  "data": {
    "order_id": "ORD-12345",
    "customer_id": "CUST-789",
    "total": 150.00,
    "items": [
      {"product_id": "PROD-001", "quantity": 2, "price": 75.00}
    ]
  },
  "metadata": {
    "webhook_id": "WH-001",
    "delivery_attempt": 1
  }
}
```

**Delivery Guarantees**: Implement at-least-once delivery with idempotency:
- Assign a unique event ID to each webhook delivery
- Retry on non-2xx responses (3 retries with exponential backoff)
- Include delivery attempt number in metadata
- Receivers use event ID for deduplication

### 3.3 Webhook Security

**HMAC Signature Verification**: Sign webhook payloads with a shared secret:
1. Sender computes HMAC-SHA256 of the payload using the shared secret
2. Include the signature in the `X-Webhook-Signature` header
3. Receiver computes the same HMAC and compares
4. Reject requests with invalid signatures

**IP Whitelisting**: Restrict webhook endpoints to accept requests only from known source IPs.

**Timestamp Validation**: Include a timestamp in the webhook. Reject webhooks older than 5 minutes to prevent replay attacks.

---

## 4. OAuth for Integrations

### 4.1 OAuth2 Authorization Code Flow

The standard flow for user-authorized integrations:

```
1. Automation redirects user to service authorization URL
2. User grants permission on the service's consent screen
3. Service redirects back to automation with authorization code
4. Automation exchanges code for access token + refresh token
5. Automation uses access token for API calls
6. When access token expires, use refresh token to get new access token
```

### 4.2 OAuth2 Client Credentials Flow

For server-to-server integration (no user interaction):

```
1. Automation sends client_id + client_secret to token endpoint
2. Service returns access token
3. Automation uses access token for API calls
4. Repeat when token expires
```

### 4.3 Token Management in Automation

**Storage**: Store tokens encrypted at rest. Never store tokens in workflow definitions or logs.

**Refresh Logic**: Implement proactive token refresh (refresh before expiry, not after failure):
- Track token expiry time
- Refresh when 80% of TTL has elapsed
- If refresh fails, retry 3 times before alerting

**Token Rotation**: Some services issue a new refresh token with each access token refresh. Always store and use the latest refresh token.

### 4.4 Rate Limiting

Most APIs enforce rate limits per token or per application:

**Detection**: Monitor for 429 status codes and `Retry-After` headers.

**Prevention**: Implement client-side rate limiting:
- Track requests per time window
- Queue requests when approaching limits
- Spread requests evenly across time windows (avoid bursts)

**Recovery**: When rate limited:
1. Parse `Retry-After` header (seconds or timestamp)
2. Wait the specified duration
3. Resume with reduced request rate
4. Gradually increase rate back to normal

---

## 5. API Versioning for Automation

### 5.1 Why Versioning Matters

Automation workflows are brittle to API changes. A field rename or removal can break workflows silently (producing incorrect data) or loudly (causing errors). API versioning provides stability guarantees.

### 5.2 Versioning Strategies

**URL Path Versioning**: `/api/v1/contacts`, `/api/v2/contacts`. Clear, explicit, easy for automation to target.

**Header Versioning**: `Accept: application/vnd.api+json; version=2`. Cleaner URLs but harder to manage in some automation platforms.

**Date-Based Versioning**: `Stripe-Version: 2024-03-15`. Pin automation to a specific API version dated when the integration was built.

### 5.3 Best Practice for Consumers

- Always pin a specific API version in automation workflows
- Subscribe to API changelog notifications
- Test workflows against new API versions in staging before upgrading
- Maintain a registry of which API version each workflow uses
- Budget time for API version upgrades as part of regular maintenance

---

## 6. Error Response Design

### 6.1 Structured Error Responses

Design error responses that automation can parse and act on:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The email field is invalid",
    "details": [
      {"field": "email", "issue": "format", "message": "Must be a valid email address"}
    ],
    "request_id": "req_abc123",
    "documentation_url": "https://api.example.com/docs/errors/VALIDATION_ERROR"
  }
}
```

### 6.2 Retryable vs. Non-Retryable Errors

Clearly indicate whether an error is retryable:

| Error Code | Retryable | Automation Action |
|-----------|-----------|------------------|
| `VALIDATION_ERROR` | No | Fix input data |
| `RATE_LIMITED` | Yes | Wait and retry |
| `SERVER_ERROR` | Yes | Retry with backoff |
| `NOT_FOUND` | No | Skip or create |
| `DUPLICATE` | No | Treat as success |
| `UNAUTHORIZED` | Maybe | Refresh token, retry once |

---

## 7. API Testing for Automation

### 7.1 Contract Testing

Verify that the API continues to meet the contract your automation depends on:
- All expected fields are present in responses
- Field types have not changed
- Status codes match documented behavior
- Error response format is consistent

### 7.2 Integration Testing

Test the complete automation flow:
1. Trigger the workflow with representative data
2. Verify each API call succeeds
3. Verify data transformation between API calls
4. Verify the final output matches expectations
5. Test error paths (what happens when an API returns 500?)

---

## 8. Key References

- Fielding (2000) -- "Architectural Styles and REST"
- OAuth 2.0 RFC 6749 -- Authorization Framework
- GraphQL Specification -- https://spec.graphql.org
- Stripe API Design -- Industry-leading API design reference

---

*This module covers API design for automation. See `api_orchestration.md` for chaining APIs and `authentication.md` for detailed auth patterns.*
