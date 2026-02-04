# API Documentation — Reference Standards and Methodology

## Overview

API documentation is the contract between a platform and its developers. Every
endpoint, parameter, response field, and error code must be documented with the
same rigor as the code itself. This module defines the standards for API
documentation, drawing from the OpenAPI Specification, Stripe's documentation
practices, and Tom Johnson's API documentation methodology.

---

## The OpenAPI Specification (OAS) as Foundation

### Why OpenAPI

The OpenAPI Specification (formerly Swagger) is the industry standard for describing
RESTful APIs. Using OAS as the source of truth for API documentation provides:

1. **Single source of truth** — The spec file is the canonical description
2. **Automated generation** — Reference docs generated from spec, not written manually
3. **Validation** — API behavior can be tested against the spec
4. **SDK generation** — Client libraries generated from the same spec
5. **Consistency** — Every endpoint follows the same documentation structure

### OAS Document Structure

```yaml
openapi: 3.1.0
info:
  title: Example API
  version: 2.0.0
  description: |
    The Example API allows you to manage widgets programmatically.

    ## Authentication
    All API requests require an API key passed in the Authorization header.

    ## Base URL
    https://api.example.com/v2

servers:
  - url: https://api.example.com/v2
    description: Production
  - url: https://sandbox.api.example.com/v2
    description: Sandbox (test mode)

security:
  - ApiKeyAuth: []

paths:
  /widgets:
    get:
      summary: List all widgets
      description: |
        Returns a paginated list of widgets. Results are ordered by
        creation date, newest first.
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            minimum: 1
            maximum: 100
            default: 20
          description: Maximum number of widgets to return
        - name: starting_after
          in: query
          schema:
            type: string
          description: |
            Cursor for pagination. Pass the `id` of the last widget
            in the previous page to fetch the next page.
      responses:
        '200':
          description: A paginated list of widgets
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WidgetList'
              example:
                data:
                  - id: "wgt_1234"
                    name: "My Widget"
                    status: "active"
                    created_at: "2025-01-15T10:30:00Z"
                has_more: true
        '401':
          $ref: '#/components/responses/Unauthorized'
        '429':
          $ref: '#/components/responses/RateLimited'
```

### OAS Quality Requirements

| Requirement | Standard |
|-------------|---------|
| Every endpoint documented | 100% coverage |
| Every parameter has description | No undocumented parameters |
| Every response field has description | No undocumented fields |
| Every error code documented | With cause and resolution |
| Examples for every endpoint | Realistic, not placeholder data |
| Schema validation | OAS spec validates against actual API |

---

## Endpoint Documentation Standard

Every API endpoint must include the following sections, in this order:

### 1. Method and URL

```
POST /v2/widgets
```

Clear, unambiguous. Method in uppercase. Full path including version prefix.

### 2. Description

One to three sentences explaining what the endpoint does and when to use it.
Do not explain how — that belongs in how-to guides. Do not explain why — that
belongs in conceptual documentation.

### 3. Authentication

State the authentication requirement explicitly:
- "Requires API key authentication"
- "Requires OAuth 2.0 bearer token with `widgets:write` scope"
- "No authentication required" (for public endpoints)

### 4. Request Parameters

**Path Parameters:**
```
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| widget_id | string | Yes | The unique identifier of the widget (e.g., "wgt_1234") |
```

**Query Parameters:**
```
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| limit | integer | No | 20 | Max results to return (1-100) |
| status | string | No | all | Filter by status: "active", "archived", "all" |
```

**Request Body:**
```
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | string | Yes | Widget name (1-255 characters) |
| config | object | No | Widget configuration. See Config Object below. |
```

### 5. Request Example

```bash
curl https://api.example.com/v2/widgets \
  -H "Authorization: Bearer sk_test_..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Widget",
    "config": {
      "color": "blue",
      "size": "large"
    }
  }'
```

**Rules for request examples:**
- Use curl as the universal example (every developer has curl)
- Include authentication header
- Include Content-Type header
- Use realistic data (not "foo", "bar", "test")
- Show the complete request, not fragments

### 6. Response Schema

Document every field in the response:

```
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier (e.g., "wgt_1234") |
| name | string | Widget name |
| status | string | Current status: "active", "archived" |
| config | object | Widget configuration |
| config.color | string | Widget color |
| config.size | string | Widget size: "small", "medium", "large" |
| created_at | string | ISO 8601 datetime of creation |
| updated_at | string | ISO 8601 datetime of last update |
```

### 7. Response Example

```json
{
  "id": "wgt_1234",
  "name": "My Widget",
  "status": "active",
  "config": {
    "color": "blue",
    "size": "large"
  },
  "created_at": "2025-01-15T10:30:00Z",
  "updated_at": "2025-01-15T10:30:00Z"
}
```

### 8. Error Responses

Document every error this endpoint can return:

```
| Status | Code | Description | Resolution |
|--------|------|-------------|-----------|
| 400 | invalid_name | Name exceeds 255 characters | Shorten the name |
| 400 | missing_name | Name field is required | Include "name" in request body |
| 401 | unauthorized | Invalid or missing API key | Check your API key |
| 404 | not_found | Widget does not exist | Verify the widget_id |
| 409 | duplicate_name | A widget with this name exists | Use a unique name |
| 429 | rate_limited | Too many requests | Retry after Retry-After seconds |
```

---

## Authentication Documentation

Authentication is the highest-friction part of any API. It is also where developers
are most likely to make security mistakes. Authentication documentation must be:

### Structure

1. **Overview** — Which authentication methods are supported and when to use each
2. **Quick Setup** — How to obtain credentials (API key, OAuth tokens)
3. **Implementation** — How to include credentials in requests
4. **Security Best Practices** — How to store and rotate credentials
5. **Troubleshooting** — Common authentication errors and fixes

### Authentication Method Comparison

```
| Method | Use Case | Complexity | Security |
|--------|----------|-----------|----------|
| API Key | Server-to-server | Low | Medium |
| OAuth 2.0 | User-delegated access | High | High |
| JWT | Stateless authentication | Medium | High |
| Webhook signatures | Verifying webhook origin | Low | High |
```

### API Key Documentation Template

```markdown
## API Key Authentication

### Obtaining API Keys

1. Log in to the [Dashboard](https://dashboard.example.com)
2. Navigate to Settings > API Keys
3. Click "Create API Key"
4. Copy the key immediately (it will not be shown again)

### Types of API Keys

| Key Prefix | Environment | Usage |
|-----------|------------|-------|
| sk_test_  | Sandbox | Development and testing |
| sk_live_  | Production | Live transactions |

### Using API Keys

Include the API key in the Authorization header:

```bash
curl https://api.example.com/v2/widgets \
  -H "Authorization: Bearer sk_test_..."
```

### Security Best Practices

- Never commit API keys to version control
- Store keys in environment variables or a secrets manager
- Use test keys in development, live keys only in production
- Rotate keys immediately if compromised
- Use the principle of least privilege (restrict key scopes)
```

---

## Error Documentation

### Error Response Format Standard

Every API error must follow a consistent format:

```json
{
  "error": {
    "type": "invalid_request_error",
    "code": "parameter_invalid",
    "param": "amount",
    "message": "Amount must be a positive integer representing cents. You sent '10.50'. For $10.50, send 1050.",
    "doc_url": "https://docs.example.com/errors/parameter_invalid",
    "request_id": "req_abc123"
  }
}
```

### Error Type Taxonomy

| Type | HTTP Status | Meaning |
|------|------------|---------|
| invalid_request_error | 400 | The request was malformed or missing required fields |
| authentication_error | 401 | Invalid, expired, or missing credentials |
| permission_error | 403 | Valid credentials but insufficient permissions |
| not_found_error | 404 | The requested resource does not exist |
| conflict_error | 409 | The request conflicts with current state |
| rate_limit_error | 429 | Too many requests; retry after Retry-After |
| api_error | 500 | Something went wrong on our end |

### Error Code Catalog

Every unique error code must have a dedicated documentation page:

```markdown
## parameter_invalid

**Type:** invalid_request_error
**HTTP Status:** 400

### What Happened
A request parameter was provided in an invalid format.

### Common Causes
1. String provided where integer expected
2. Value outside allowed range
3. Invalid enum value

### How to Fix
Check the `param` field in the error response to identify which
parameter is invalid, then check the API reference for the correct
format.

### Example
Request:
  POST /v2/charges { "amount": "10.50" }

Error Response:
  { "error": { "code": "parameter_invalid", "param": "amount",
    "message": "Amount must be an integer in cents. Sent '10.50'. For $10.50, send 1050." }}

Fix:
  POST /v2/charges { "amount": 1050 }
```

---

## Versioning and Changelog Documentation

### Versioning Strategy Documentation

Document the versioning approach clearly:

```markdown
## API Versioning

We use URL-based versioning: `/v1/`, `/v2/`, etc.

### Version Lifecycle

| Phase | Duration | Meaning |
|-------|----------|---------|
| Current | Indefinite | Actively maintained, new features added |
| Maintained | 12 months min | Bug fixes and security patches only |
| Deprecated | 6 months | No changes, deprecation warnings in responses |
| Sunset | N/A | Endpoint returns 410 Gone |

### Breaking Change Policy

We consider these changes breaking:
- Removing an endpoint
- Removing a response field
- Changing the type of a response field
- Changing the meaning of an error code
- Requiring a previously optional parameter

We do NOT consider these changes breaking:
- Adding a new endpoint
- Adding a new optional parameter
- Adding a new response field
- Adding a new error code
```

### Changelog Format

```markdown
## 2025-01-15

### Added
- `POST /v2/widgets/{id}/duplicate` — Duplicate an existing widget
- `config.theme` field on Widget object

### Changed
- `GET /v2/widgets` now supports `sort` parameter (default unchanged)

### Deprecated
- `GET /v1/widgets` — Use `/v2/widgets` instead. Sunset: 2025-07-15.
  See [migration guide](/guides/v1-to-v2-migration).

### Fixed
- `PATCH /v2/widgets/{id}` now correctly returns 404 for deleted widgets
  (previously returned 500)
```

---

## Interactive Documentation

### Requirements for Interactive Docs

1. **Authenticated by default** — Developer's API key pre-filled if logged in
2. **Editable parameters** — Developer can modify request parameters
3. **Real API calls** — Not simulated; actual sandbox API calls
4. **Response display** — Formatted JSON with syntax highlighting
5. **Copy-paste** — One-click copy for curl commands and code snippets
6. **Language selection** — Code examples in top 5 languages

### Tools and Platforms

| Tool | Type | Strengths |
|------|------|----------|
| Stoplight | Full platform | OAS-first, interactive, hosted |
| Redoc | Generator | Beautiful, OAS-based, customizable |
| Swagger UI | Generator | Standard, widely understood |
| ReadMe | Full platform | Interactive, analytics, community |
| Mintlify | Full platform | Modern, fast, developer-focused |

---

**This module defines the standards for all API documentation produced by the DevRel Brain.**
**Every API endpoint must meet these standards before documentation is considered complete.**
