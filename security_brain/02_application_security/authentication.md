# Authentication — Identity Verification Systems

## Overview

Authentication is the process of verifying a claimed identity. It answers the question: "Are you who you say you are?" This module covers modern authentication protocols (OAuth 2.0, OIDC, SAML), token security (JWT), multi-factor authentication, session management, and passwordless authentication. Content draws from NIST SP 800-63 (Digital Identity Guidelines), OAuth 2.0 Security Best Current Practice (RFC 9700), Stanford CS155 (Boneh) web authentication lectures, and empirical breach data demonstrating that authentication failures are the #1 initial access vector (Verizon DBIR).

Authentication is the front door. If the front door fails, every other security control is irrelevant.

---

## Authentication Factor Types

### NIST SP 800-63B — Authenticator Assurance Levels (AAL)

| Level | Requirements | Use Case |
|-------|-------------|----------|
| AAL1 | Single factor (password OR biometric OR token) | Low-sensitivity applications |
| AAL2 | Two different factors (password + TOTP, password + push) | Standard business applications, PII access |
| AAL3 | Two factors including hardware-based (FIDO2 key) | Financial systems, healthcare, admin access |

**Security Brain mandate:** AAL2 minimum for all applications handling user data. AAL3 for administrative access and systems processing financial or health data.

### Factor Categories

| Factor | Type | Examples | Strength |
|--------|------|----------|----------|
| Knowledge | Something you know | Password, PIN, security question | Weakest (phishable, guessable, reusable) |
| Possession | Something you have | Hardware key, phone, smart card | Strong (requires physical access) |
| Inherence | Something you are | Fingerprint, face, iris, voice | Strong (biometric, but not revocable) |

**Security Brain rules:**
- Security questions are NOT a valid authentication factor (answers are publicly discoverable)
- SMS OTP is deprecated as an authentication factor (SIM swapping, SS7 attacks — NIST SP 800-63B)
- Email magic links count as possession factor (possession of email account)

---

## OAuth 2.0

**Standard:** RFC 6749, updated by OAuth 2.0 Security Best Current Practice.

**Purpose:** Authorization delegation — allowing a third-party application to access resources on behalf of a user WITHOUT sharing credentials. OAuth 2.0 is NOT an authentication protocol (that is OIDC).

### Grant Types

| Grant Type | Use Case | Security Brain Verdict |
|------------|----------|----------------------|
| Authorization Code + PKCE | Web apps, mobile apps, SPAs | **REQUIRED** — use for all interactive flows |
| Client Credentials | Machine-to-machine (no user) | Appropriate for service accounts |
| Device Code | Input-constrained devices (TV, CLI) | Appropriate for the specific use case |
| Implicit | *Deprecated* | **FORBIDDEN** — tokens in URL fragment, no PKCE |
| Resource Owner Password | *Deprecated* | **FORBIDDEN** — client handles user credentials |

### Authorization Code Flow with PKCE (Mandatory)

```
1. Client generates code_verifier (random 43-128 character string)
2. Client computes code_challenge = SHA256(code_verifier) [base64url-encoded]

3. Client → Authorization Server (browser redirect):
   GET /authorize?
     response_type=code&
     client_id=CLIENT_ID&
     redirect_uri=https://app.example.com/callback&
     scope=openid profile email&
     state=RANDOM_STATE&                    ← CSRF protection
     code_challenge=CHALLENGE&              ← PKCE
     code_challenge_method=S256

4. User authenticates with Authorization Server
5. Authorization Server → Client (browser redirect):
   GET /callback?code=AUTH_CODE&state=RANDOM_STATE

6. Client validates state parameter matches what was sent
7. Client → Authorization Server (back-channel, server-to-server):
   POST /token
     grant_type=authorization_code&
     code=AUTH_CODE&
     redirect_uri=https://app.example.com/callback&
     client_id=CLIENT_ID&
     code_verifier=ORIGINAL_VERIFIER       ← PKCE proof

8. Authorization Server verifies SHA256(code_verifier) == code_challenge
9. Authorization Server → Client:
   { "access_token": "...", "id_token": "...", "refresh_token": "..." }
```

**Why PKCE is mandatory:** Without PKCE, an attacker who intercepts the authorization code (via malicious browser extension, open redirect, or referrer leakage) can exchange it for tokens. PKCE binds the token exchange to the original client that initiated the flow.

### OAuth 2.0 Security Requirements

```
MANDATORY:
- PKCE on ALL authorization code flows (public AND confidential clients)
- State parameter for CSRF protection (random, bound to user session)
- Exact redirect URI matching (no wildcards, no partial matches)
- TLS for all OAuth endpoints (authorization, token, resource)
- Short-lived access tokens (5-15 minutes)
- Refresh token rotation (new refresh token issued on each use)
- Sender-constrained tokens (DPoP) when possible

FORBIDDEN:
- Implicit grant (tokens in URL, no PKCE, no refresh tokens)
- Resource Owner Password Credentials grant (client handles passwords)
- Redirect URI with localhost in production
- Wildcard redirect URI patterns
- Long-lived access tokens (>1 hour)
- Refresh tokens without rotation
```

---

## OpenID Connect (OIDC)

**Standard:** OpenID Connect Core 1.0, built on OAuth 2.0.

**Purpose:** Authentication layer on top of OAuth 2.0. Adds the ID Token (JWT containing identity claims) that OAuth 2.0 does not provide.

### ID Token Validation (MANDATORY — every step)

```
1. Verify signature using the Authorization Server's public key (JWKS endpoint)
2. Verify iss (issuer) matches expected Authorization Server
3. Verify aud (audience) contains your client_id
4. Verify exp (expiration) is in the future
5. Verify iat (issued at) is within acceptable clock skew
6. Verify nonce matches the nonce sent in the authorization request
7. If using at_hash or c_hash claims, validate them

NEVER skip ANY of these steps. Each prevents a specific attack:
  - Missing signature verification → Token forgery
  - Missing issuer check → Token from malicious server accepted
  - Missing audience check → Token intended for different client accepted
  - Missing expiration check → Expired/revoked tokens accepted
  - Missing nonce check → Replay attacks
```

### OIDC Provider Selection

| Provider | Notes |
|----------|-------|
| Auth0 | Comprehensive, good developer experience, Okta-owned |
| Supabase Auth | Integrated with Supabase, supports social login, magic link, SAML |
| Clerk | Developer-focused, pre-built UI components |
| AWS Cognito | AWS-native, cost-effective at scale, complex configuration |
| Okta | Enterprise-grade, extensive federation capabilities |
| Keycloak | Open-source, self-hosted, full-featured |

**Security Brain mandate:** Use a managed OIDC provider. Do NOT build custom authentication unless you have a dedicated security team to maintain it.

---

## JWT (JSON Web Token) Security

**Standard:** RFC 7519 (JWT), RFC 7515 (JWS), RFC 7516 (JWE).

### JWT Security Checklist

```
SIGNING ALGORITHM:
  ✓ Use RS256 (RSA-PKCS1-SHA256) or ES256 (ECDSA-P256-SHA256) for distributed systems
  ✓ Use HS256 (HMAC-SHA256) ONLY when single service signs AND verifies
  ✗ NEVER use "none" algorithm (CVE-2015-9235 — signature bypass)
  ✗ NEVER allow the JWT to specify the algorithm (algorithm confusion attack)
  ✗ NEVER use the same key for HS256 and RS256 verification

CLAIMS VALIDATION:
  ✓ Always validate: exp, iat, iss, aud, sub
  ✓ Set short expiration (5-15 minutes for access tokens)
  ✓ Include jti (JWT ID) for revocation checking when needed
  ✗ NEVER store sensitive data in JWT payload (it is base64-encoded, NOT encrypted)
  ✗ NEVER use JWT payload for authorization decisions without server-side verification

TOKEN STORAGE (browser):
  ✓ HttpOnly, Secure, SameSite=Strict cookies (for session tokens)
  ✓ In-memory only for access tokens (lost on page refresh, by design)
  ✗ NEVER store tokens in localStorage (accessible to XSS)
  ✗ NEVER store tokens in sessionStorage (accessible to XSS)
  ✗ NEVER store tokens in URL parameters (referrer leakage, logging)

REVOCATION:
  - JWTs are stateless — they cannot be revoked without server-side state
  - Options: short expiration + refresh token rotation, token blacklist, token versioning
  - For immediate revocation needs, use opaque tokens (not JWT)
```

### JWT Algorithm Confusion Attack (Critical)

```
Attack scenario:
1. Server uses RS256 (asymmetric): signs with private key, verifies with public key
2. Attacker obtains the public key (it is public)
3. Attacker creates forged JWT, sets alg: "HS256"
4. Attacker signs the JWT using the public key as the HMAC secret
5. Vulnerable server sees alg: "HS256", uses the configured key to verify
6. If the server uses the same key config for both RS256 and HS256,
   it verifies the HMAC with the public key — which matches
7. Forged token is accepted

Defense:
- Configure the verification algorithm on the SERVER, not from the JWT
- Use separate key configurations for different algorithms
- Reject tokens with unexpected algorithm headers
```

---

## Multi-Factor Authentication (MFA)

### MFA Methods Ranked by Security

| Method | Security | Phishing Resistant | User Experience | Security Brain Verdict |
|--------|----------|-------------------|-----------------|----------------------|
| FIDO2/WebAuthn (hardware key) | Highest | Yes (origin-bound) | Moderate | **Preferred** for admin/sensitive |
| FIDO2/WebAuthn (platform, biometric) | High | Yes (origin-bound) | Best | **Preferred** for general use |
| TOTP (authenticator app) | Good | No (phishable) | Good | **Acceptable** |
| Push notification | Good | Partially (MFA fatigue) | Good | Acceptable with number matching |
| SMS OTP | Low | No (SIM swap, SS7) | Good | **Deprecated** — avoid |
| Email OTP | Low | No (email compromise) | Good | Acceptable for low-risk only |

### FIDO2/WebAuthn Implementation

```
Registration (one-time):
1. Server generates challenge (random bytes)
2. Browser calls navigator.credentials.create() with challenge
3. Authenticator creates key pair, returns:
   - Public key (stored server-side, associated with user)
   - Credential ID (stored server-side)
   - Attestation (optional, proves authenticator type)
4. Server stores public key and credential ID

Authentication:
1. Server generates challenge (random bytes)
2. Browser calls navigator.credentials.get() with challenge + allowed credential IDs
3. Authenticator signs challenge with private key (user verification: biometric/PIN)
4. Server verifies signature with stored public key

Why phishing-resistant:
- Browser binds the credential to the origin (rpId = "example.com")
- Credential created for example.com CANNOT be used on evil-example.com
- No shared secret that can be phished (public-key cryptography)
- Authenticator performs origin verification automatically
```

---

## Session Management

### Secure Session Configuration

```
Set-Cookie: session_id=<random-256-bit-value>;
  HttpOnly;       ← Prevents JavaScript access (XSS cannot steal session)
  Secure;         ← Only transmitted over HTTPS
  SameSite=Lax;   ← CSRF protection (Strict for sensitive apps)
  Path=/;         ← Cookie scope
  Max-Age=3600;   ← 1 hour expiration (adjust per risk)
  Domain=example.com;

Session ID requirements:
  - Minimum 128 bits of entropy (256 bits recommended)
  - Generated by cryptographically secure random generator
  - Regenerated after authentication (prevents session fixation)
  - Invalidated server-side on logout (not just cookie deletion)
  - Absolute timeout: 8-24 hours (must re-authenticate)
  - Idle timeout: 15-60 minutes (inactivity logout)
```

### Session Attacks and Defenses

| Attack | Description | Defense |
|--------|-------------|---------|
| Session Fixation | Attacker sets victim's session ID before login | Regenerate session ID after login |
| Session Hijacking | Attacker steals active session token | HttpOnly + Secure cookies, TLS |
| Session Replay | Attacker reuses a captured session token | Short expiration, IP/UA binding |
| CSRF | Attacker forges requests using victim's session | SameSite cookies, CSRF tokens |
| MFA Fatigue | Attacker triggers repeated MFA prompts | Number matching, rate limiting |

---

## Passwordless Authentication

### Approaches

| Approach | Mechanism | Security | UX |
|----------|-----------|----------|-----|
| WebAuthn/Passkeys | Public-key cryptography, biometric | Highest (phishing-proof) | Excellent |
| Magic Links | Email with one-time login link | Moderate (email security) | Good |
| Email OTP | One-time code sent to email | Moderate (email security) | Good |

### Passkey Implementation (Recommended Path)

```
Passkeys = FIDO2/WebAuthn credentials synced across devices via platform (iCloud Keychain,
Google Password Manager). Combines the security of public-key cryptography with the
convenience of cross-device availability.

Benefits:
- Phishing-resistant (origin-bound)
- No shared secret (nothing to breach from server)
- Cross-device (synced via platform)
- Biometric verification (user-friendly)
- Eliminates password reuse, credential stuffing, brute force

Implementation:
- Use SimpleWebAuthn (JS) or py_webauthn (Python) libraries
- Support both platform authenticators (built-in biometric) and roaming (hardware keys)
- Provide recovery mechanism (backup codes, multiple authenticators)
```

---

## Password Policy (When Passwords Are Used)

### NIST SP 800-63B Compliant Policy

```
REQUIRED:
- Minimum 8 characters (12+ recommended, 64+ maximum)
- Check against breached password database (HaveIBeenPwned API, k-anonymity model)
- Check against common passwords list (NIST: at least 10,000 common passwords)
- No composition rules (uppercase/lowercase/special requirements DECREASE security
  by reducing password space while increasing user frustration — NIST finding)
- No periodic forced rotation (increases weak password selection — NIST finding)
- Allow paste into password fields (supports password managers)
- Show password strength meter (real-time feedback)

STORAGE:
- Argon2id with parameters from cryptography.md
- Unique salt per password (16 bytes minimum)
- NEVER store plaintext, reversibly encrypted, or unsalted hashes

RATE LIMITING:
- 5 failed attempts: CAPTCHA or increasing delay
- 10 failed attempts: temporary lockout (15-30 minutes)
- Account lockout must NOT enable DoS against other users
  (lock the IP/device, not the account, for high-attempt counts)
```

---

## Authentication Decision Tree

```
What type of application?

├── User-facing web application
│   ├── Use OIDC (OpenID Connect) via managed provider
│   ├── Authorization Code flow with PKCE (mandatory)
│   ├── Session cookies (HttpOnly, Secure, SameSite)
│   ├── MFA: WebAuthn/Passkeys preferred, TOTP acceptable
│   └── Consider passwordless (magic link + WebAuthn)

├── Mobile application
│   ├── Use OIDC via managed provider
│   ├── Authorization Code flow with PKCE (mandatory)
│   ├── Token storage: OS secure storage (Keychain/Keystore)
│   ├── Biometric authentication for app unlock
│   └── Certificate pinning for API communication

├── API (machine-to-machine)
│   ├── OAuth 2.0 Client Credentials grant
│   ├── mTLS for service identity
│   ├── Short-lived tokens (5-15 minutes)
│   └── API key as fallback (hashed storage, rotation policy)

├── Internal tools / admin
│   ├── SSO via OIDC/SAML
│   ├── MFA required (AAL3: hardware key)
│   ├── Session timeout: 15 minutes idle, 8 hours absolute
│   └── Step-up authentication for destructive actions

└── Third-party integration
    ├── OAuth 2.0 for user authorization
    ├── Webhook signatures for callbacks (HMAC-SHA256)
    └── API keys with scoped permissions
```

---

**Authentication is the most attacked surface of any application. Use managed providers, enforce MFA, prefer passwordless, and validate every token on every request. Custom authentication is a liability unless you have dedicated security engineering resources to maintain it.**
