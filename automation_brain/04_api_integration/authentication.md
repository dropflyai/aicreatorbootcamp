# Authentication for Automation: OAuth2, API Keys, JWT, and Token Management

## Overview

Authentication is the foundation of secure API integration. Automation systems must authenticate with dozens of external services, each using different authentication methods. Poor authentication management leads to security vulnerabilities, service interruptions from expired tokens, and operational overhead from manual credential rotation. This module covers the major authentication protocols, implementation patterns for each, token lifecycle management, and security best practices for credential storage in automation contexts.

---

## 1. Authentication Methods Overview

### 1.1 Method Comparison

| Method | Security | Complexity | Best For |
|--------|----------|-----------|----------|
| API Key | Low-Medium | Very Low | Internal APIs, low-risk integrations |
| Basic Auth | Low | Very Low | Legacy systems, internal services |
| Bearer Token | Medium | Low | Simple token-based auth |
| OAuth2 (Auth Code) | High | High | User-authorized third-party access |
| OAuth2 (Client Creds) | High | Medium | Server-to-server integration |
| JWT | High | Medium | Stateless authentication |
| HMAC Signature | High | Medium | Webhook verification |
| mTLS | Very High | Very High | High-security service-to-service |

### 1.2 Selecting Authentication Method

```
Decision Tree:
  Is this server-to-server (no user involvement)?
    |
    +--> Yes: Does the service support OAuth2 Client Credentials?
    |         +--> Yes: Use OAuth2 Client Credentials
    |         +--> No: Use API Key (with rotation plan)
    |
    +--> No (user authorization needed):
          Does the service support OAuth2?
            +--> Yes: Use OAuth2 Authorization Code
            +--> No: Use whatever the service provides (API key per user, Basic Auth)
```

---

## 2. OAuth2 Flows in Detail

### 2.1 Authorization Code Flow (with PKCE)

The standard flow for automation platforms that need to access services on behalf of users:

**Step 1 -- Authorization Request**:
```
GET https://service.com/oauth/authorize?
  response_type=code&
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://your-automation.com/oauth/callback&
  scope=read write&
  state=random_csrf_token&
  code_challenge=SHA256_HASH&
  code_challenge_method=S256
```

**Step 2 -- User Grants Permission**: The user sees the consent screen and approves access. The service redirects to your callback URL with an authorization code.

**Step 3 -- Token Exchange**:
```
POST https://service.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&
code=AUTH_CODE&
redirect_uri=https://your-automation.com/oauth/callback&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET&
code_verifier=ORIGINAL_VERIFIER
```

**Step 4 -- Response**:
```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "dGhp...",
  "scope": "read write"
}
```

### 2.2 Client Credentials Flow

For server-to-server authentication where no user is involved:

```
POST https://service.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET&
scope=api.read api.write
```

**Response**: Returns an access token (no refresh token, since client credentials can always re-authenticate).

### 2.3 Token Refresh Flow

When the access token expires, use the refresh token to obtain a new one:

```
POST https://service.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token&
refresh_token=dGhp...&
client_id=YOUR_CLIENT_ID&
client_secret=YOUR_CLIENT_SECRET
```

**Important**: Some services issue a new refresh token with each refresh (refresh token rotation). Always store and use the latest refresh token. Using an old refresh token after rotation may invalidate all tokens.

---

## 3. API Key Authentication

### 3.1 API Key Patterns

**Header-Based**: `Authorization: Bearer sk-abc123...` or `X-API-Key: abc123...`

**Query Parameter**: `?api_key=abc123...` -- Less secure (keys appear in logs and browser history). Avoid when possible.

**Request Body**: Include the key in the POST body. Uncommon but used by some APIs.

### 3.2 API Key Security

**Generation**: API keys should be cryptographically random, at least 32 characters, and prefixed for identification (e.g., `sk_live_` for live keys, `sk_test_` for test keys).

**Scoping**: When possible, create API keys with minimum necessary permissions:
- Read-only keys for data retrieval workflows
- Write keys for data modification workflows
- Admin keys only for management operations

**Rotation**: API keys should be rotated regularly:
1. Generate a new API key
2. Update the automation to use the new key
3. Verify the automation works with the new key
4. Revoke the old key
5. Recommended rotation interval: 90 days

### 3.3 API Key Risks

| Risk | Mitigation |
|------|-----------|
| Key leaked in code repository | Use environment variables, never hardcode |
| Key leaked in logs | Redact API keys in all logging |
| Key compromised | Implement immediate revocation and rotation |
| Key over-privileged | Create minimum-privilege keys per use case |
| Key shared across teams | Create per-team or per-workflow keys |

---

## 4. JWT (JSON Web Tokens)

### 4.1 JWT Structure

JWTs consist of three base64-encoded parts: header, payload, signature.

```
eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJhdXRvbWF0aW9uIiwiZXhwIjoxNzEwNTAwMDAwfQ.signature
```

**Header**: Algorithm and token type
**Payload**: Claims (issuer, expiration, subject, custom claims)
**Signature**: Cryptographic signature verifying the token has not been tampered with

### 4.2 JWT for Service Accounts

Some APIs (e.g., Google Cloud, GitHub Apps) use JWT-based authentication:

1. Create a service account with a private key
2. Construct a JWT with claims specifying the service account and requested scope
3. Sign the JWT with the service account's private key
4. Exchange the signed JWT for an access token

```python
import jwt
import time

payload = {
    "iss": "service-account@project.iam.gserviceaccount.com",
    "scope": "https://www.googleapis.com/auth/calendar",
    "aud": "https://oauth2.googleapis.com/token",
    "iat": int(time.time()),
    "exp": int(time.time()) + 3600
}

signed_jwt = jwt.encode(payload, private_key, algorithm="RS256")
```

### 4.3 JWT Validation in Webhooks

When your automation receives JWTs (e.g., from webhook callbacks):
1. Verify the signature using the issuer's public key
2. Check `exp` (expiration) claim -- reject expired tokens
3. Check `iss` (issuer) claim -- verify the token comes from the expected issuer
4. Check `aud` (audience) claim -- verify the token is intended for your service
5. Check `nbf` (not before) claim if present

---

## 5. Token Lifecycle Management

### 5.1 Token Storage

**Encryption at Rest**: All tokens must be encrypted in storage. Use AES-256 encryption with a key management system.

**Separation of Concerns**: Store tokens in a dedicated credential store, separate from workflow definitions and execution logs.

**Access Control**: Restrict token access to the specific workflows and services that need them.

### 5.2 Token Refresh Architecture

```
┌──────────────────────────────────────────────┐
│            TOKEN MANAGER                      │
│                                              │
│  ┌──────────────┐  ┌───────────────────┐     │
│  │ Token Store   │  │ Refresh Scheduler │     │
│  │ (encrypted)   │  │ (proactive)       │     │
│  └──────┬───────┘  └────────┬──────────┘     │
│         │                    │                │
│         v                    v                │
│  ┌──────────────┐  ┌───────────────────┐     │
│  │ Get Token    │  │ Refresh Token     │     │
│  │ (check exp)  │  │ (before expiry)   │     │
│  └──────────────┘  └───────────────────┘     │
└──────────────────────────────────────────────┘
         |
         v
    [Workflow uses current valid token]
```

### 5.3 Proactive vs. Reactive Refresh

**Proactive (Recommended)**: Refresh tokens before they expire. Set a refresh threshold at 80% of the token's TTL. For a 1-hour token, refresh at 48 minutes.

**Reactive**: Wait for a 401 response, then refresh. Adds latency to the failed request and requires retry logic.

### 5.4 Token Refresh Failure Handling

When token refresh fails:
1. Retry the refresh 3 times with exponential backoff
2. If all retries fail, check if the refresh token itself has expired
3. If the refresh token is expired, the user must re-authorize (for Auth Code flow)
4. Alert the automation team
5. Pause affected workflows until credentials are restored

---

## 6. Service Accounts

### 6.1 When to Use Service Accounts

Service accounts represent the automation system itself, not a specific user:
- Background processing that does not require user context
- System-to-system integration
- Administrative operations
- Scheduled workflows that run without user interaction

### 6.2 Service Account Best Practices

- Create a dedicated service account for each automation workflow or workflow group
- Never share service accounts across unrelated workflows
- Apply the principle of least privilege (minimum permissions needed)
- Audit service account usage regularly
- Set up alerts for unusual service account activity
- Document which workflows use which service accounts

### 6.3 Service Account Key Rotation

For services that use key-based service accounts (e.g., GCP):
1. Generate a new key for the service account
2. Update the automation credential store with the new key
3. Verify the automation works with the new key
4. Delete the old key from the service
5. Automate this process on a 90-day cycle

---

## 7. Credential Governance

### 7.1 Credential Inventory

Maintain a central inventory of all automation credentials:

| Credential | Type | Service | Used By | Last Rotated | Next Rotation |
|-----------|------|---------|---------|-------------|---------------|
|           |      |         |         |             |               |

### 7.2 Access Reviews

Quarterly review of credential access:
- Which workflows use which credentials?
- Are any credentials unused? (Revoke them)
- Do any credentials have excessive permissions? (Reduce scope)
- Has any credential been compromised? (Rotate immediately)

### 7.3 Incident Response

When a credential is compromised:
1. **Immediately** revoke the compromised credential
2. Generate a new credential with the same permissions
3. Update all affected automation workflows
4. Audit logs for unauthorized access during the compromise window
5. Investigate how the credential was compromised
6. Implement controls to prevent recurrence

---

## 8. Key References

- OAuth 2.0 RFC 6749 -- Authorization Framework
- OAuth 2.0 RFC 7636 -- PKCE Extension
- JWT RFC 7519 -- JSON Web Token
- OWASP API Security Top 10 -- API authentication best practices

---

*This module covers authentication for automation. See `api_design.md` for API fundamentals and `api_orchestration.md` for call orchestration patterns.*
