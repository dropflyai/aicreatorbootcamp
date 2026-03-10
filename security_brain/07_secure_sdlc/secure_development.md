# Secure Development — OWASP Top 10 Deep Dive with Code Examples

## Overview

Secure development is the practice of writing code that is resilient to attack by design, not by coincidence. The OWASP Top 10 represents the most critical web application security risks, empirically derived from real-world vulnerability data across thousands of organizations. This module provides a deep technical treatment of each risk category with concrete code examples, covering input validation, parameterized queries, CSRF protection, session management, password hashing, and access control models.

The fundamental principle: security vulnerabilities are bugs. They have root causes, they are preventable, and they should be treated with the same engineering rigor as any other defect class. Code that is not secure is not correct.

---

## A01:2021 — Broken Access Control

### The Problem

Broken access control occurs when users can act outside their intended permissions. It is the #1 vulnerability category in the OWASP Top 10 (2021), found in 94% of applications tested.

### Common Vulnerability Patterns

**Insecure Direct Object Reference (IDOR):**
```javascript
// VULNERABLE — user-controlled ID without authorization check
app.get('/api/invoices/:id', async (req, res) => {
  const invoice = await db.invoices.findById(req.params.id);
  return res.json(invoice); // Any authenticated user can access any invoice
});

// SECURE — authorization check ensures user owns the resource
app.get('/api/invoices/:id', async (req, res) => {
  const invoice = await db.invoices.findOne({
    id: req.params.id,
    userId: req.user.id  // Scoped to authenticated user
  });
  if (!invoice) return res.status(404).json({ error: 'Not found' });
  return res.json(invoice);
});
```

**Privilege Escalation:**
```javascript
// VULNERABLE — role set by client request
app.post('/api/users', async (req, res) => {
  const user = await db.users.create({
    email: req.body.email,
    role: req.body.role  // Attacker sends role: "admin"
  });
});

// SECURE — role determined server-side
app.post('/api/users', async (req, res) => {
  const user = await db.users.create({
    email: req.body.email,
    role: 'user'  // Default role, only admin API can modify
  });
});
```

### RBAC vs ABAC

**Role-Based Access Control (RBAC):**
Permissions assigned to roles; users assigned to roles. Simple, well-understood, sufficient for most applications.

```
Roles: admin, editor, viewer
Permissions: create, read, update, delete
Mapping: admin → [create, read, update, delete]
         editor → [create, read, update]
         viewer → [read]
```

**Attribute-Based Access Control (ABAC):**
Access decisions based on attributes of the subject, resource, action, and environment. More flexible, required for complex authorization.

```
Policy: Allow if (
  subject.department == resource.department AND
  subject.clearanceLevel >= resource.classificationLevel AND
  environment.time IN businessHours AND
  action IN ['read', 'update']
)
```

ABAC implementation: Open Policy Agent (OPA) with Rego policies, AWS IAM with conditions, Casbin.

---

## A02:2021 — Cryptographic Failures

### Password Hashing

**Never store passwords in plaintext or with reversible encryption.**

```javascript
// VULNERABLE — MD5 (fast, rainbow table vulnerable)
const hash = crypto.createHash('md5').update(password).digest('hex');

// VULNERABLE — SHA-256 without salt (rainbow table vulnerable)
const hash = crypto.createHash('sha256').update(password).digest('hex');

// SECURE — bcrypt (adaptive cost factor, built-in salt)
const bcrypt = require('bcrypt');
const saltRounds = 12; // Cost factor — increase as hardware improves
const hash = await bcrypt.hash(password, saltRounds);
const isValid = await bcrypt.compare(inputPassword, storedHash);

// SECURE — Argon2id (memory-hard, recommended by OWASP)
const argon2 = require('argon2');
const hash = await argon2.hash(password, {
  type: argon2.argon2id,
  memoryCost: 65536,  // 64 MB
  timeCost: 3,
  parallelism: 4
});
const isValid = await argon2.verify(storedHash, inputPassword);
```

**Recommended algorithms (in order of preference):**
1. Argon2id — Memory-hard, resists GPU attacks, OWASP first choice
2. bcrypt — Widely supported, well-understood, proven
3. scrypt — Memory-hard alternative to bcrypt
4. PBKDF2 — Acceptable with >600,000 iterations (OWASP 2023 guidance)

---

## A03:2021 — Injection

### SQL Injection

```javascript
// VULNERABLE — string concatenation
const query = `SELECT * FROM users WHERE email = '${req.body.email}'`;
// Attacker input: ' OR '1'='1' --

// SECURE — parameterized query (prepared statement)
const result = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [req.body.email]
);

// SECURE — ORM with parameterized methods
const user = await User.findOne({ where: { email: req.body.email } });
```

### Command Injection

```javascript
// VULNERABLE — user input in shell command
const { exec } = require('child_process');
exec(`ping -c 4 ${req.body.hostname}`); // Attacker: "; rm -rf /"

// SECURE — use execFile with argument array (no shell interpretation)
const { execFile } = require('child_process');
execFile('ping', ['-c', '4', req.body.hostname]);

// SECURE — validate input against allowlist
const validHostname = /^[a-zA-Z0-9.-]+$/.test(req.body.hostname);
if (!validHostname) return res.status(400).json({ error: 'Invalid hostname' });
```

### NoSQL Injection

```javascript
// VULNERABLE — MongoDB query injection
const user = await db.users.findOne({
  username: req.body.username,
  password: req.body.password  // Attacker: {"$gt": ""}
});

// SECURE — type validation before query
if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
  return res.status(400).json({ error: 'Invalid input type' });
}
const user = await db.users.findOne({
  username: req.body.username,
  password: req.body.password
});
```

---

## A04:2021 — Insecure Design

Insecure design is a category recognizing that vulnerabilities can exist at the architecture level, not just the implementation level. No amount of secure coding fixes a fundamentally insecure design.

**Design principles:**
- Threat modeling during design phase (not after implementation)
- Secure by default — opt-in to reduced security, not opt-out
- Principle of least privilege at every layer
- Defense in depth — no single control is the sole line of defense
- Fail securely — errors should default to deny, not allow

---

## A05:2021 — Security Misconfiguration

```javascript
// VULNERABLE — verbose error messages in production
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message,
    stack: err.stack,  // Exposes internal paths and code structure
    query: err.sql     // Exposes database schema
  });
});

// SECURE — generic error in production, detailed in development
app.use((err, req, res, next) => {
  console.error(err); // Log full error server-side
  res.status(500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});
```

**Security headers (mandatory):**
```javascript
const helmet = require('helmet');
app.use(helmet({
  contentSecurityPolicy: { directives: { defaultSrc: ["'self'"] } },
  strictTransportSecurity: { maxAge: 31536000, includeSubDomains: true, preload: true },
  xContentTypeOptions: true,  // nosniff
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  frameguard: { action: 'deny' }  // X-Frame-Options
}));
```

---

## A06:2021 — Vulnerable and Outdated Components

See `05_compliance/supply_chain_security.md` for comprehensive coverage. Key implementation:
- SBOM generation in CI/CD
- SCA scanning on every build
- Automated dependency update PRs (Dependabot, Renovate)
- Block deployment of images with critical vulnerabilities

---

## A07:2021 — Identification and Authentication Failures

### Session Management

```javascript
// SECURE session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Long, random, from environment
  name: '__Host-session',             // Cookie prefix prevents cross-site abuse
  cookie: {
    httpOnly: true,      // Prevent JavaScript access (XSS mitigation)
    secure: true,        // HTTPS only
    sameSite: 'strict',  // CSRF mitigation
    maxAge: 3600000,     // 1 hour session timeout
    domain: undefined,   // No domain = origin only
    path: '/'
  },
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }) // Server-side session storage
}));
```

---

## A08:2021 — Software and Data Integrity Failures

### CSRF Protection

```javascript
// SECURE — CSRF token generation and validation
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: { httpOnly: true, sameSite: 'strict' } });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/transfer', csrfProtection, (req, res) => {
  // csrf middleware validates token automatically
  processTransfer(req.body);
});
```

---

## A09:2021 — Security Logging and Monitoring Failures

```javascript
// SECURE — structured security logging
const securityLog = (event) => {
  logger.info({
    type: 'security_event',
    event: event.type,
    userId: event.userId,
    ip: event.ip,
    userAgent: event.userAgent,
    resource: event.resource,
    action: event.action,
    result: event.result,  // 'success' | 'failure' | 'denied'
    timestamp: new Date().toISOString(),
    correlationId: event.correlationId
  });
};

// Log authentication events
securityLog({
  type: 'authentication',
  userId: user.id,
  ip: req.ip,
  action: 'login',
  result: loginSuccess ? 'success' : 'failure'
});
```

---

## A10:2021 — Server-Side Request Forgery (SSRF)

```javascript
// VULNERABLE — user-controlled URL without validation
app.get('/proxy', async (req, res) => {
  const response = await fetch(req.query.url);
  return res.json(await response.json());
  // Attacker: ?url=http://169.254.169.254/latest/meta-data/ (AWS metadata)
});

// SECURE — URL allowlisting
const ALLOWED_HOSTS = new Set(['api.example.com', 'cdn.example.com']);
app.get('/proxy', async (req, res) => {
  const url = new URL(req.query.url);
  if (!ALLOWED_HOSTS.has(url.hostname)) {
    return res.status(403).json({ error: 'Host not allowed' });
  }
  if (url.protocol !== 'https:') {
    return res.status(403).json({ error: 'HTTPS required' });
  }
  const response = await fetch(url.toString());
  return res.json(await response.json());
});
```

---

## Input Validation Framework

### Validation Strategy

| Layer | Purpose | Implementation |
|-------|---------|---------------|
| Client-side | UX feedback (not security) | HTML5 validation, JavaScript |
| API gateway | Schema validation, rate limiting | JSON Schema, OpenAPI validation |
| Application | Business rule validation, authorization | Zod, Joi, class-validator |
| Database | Constraint enforcement, type safety | Column types, CHECK constraints, foreign keys |

```javascript
// Comprehensive input validation with Zod
const { z } = require('zod');

const CreateUserSchema = z.object({
  email: z.string().email().max(255),
  name: z.string().min(1).max(100).regex(/^[a-zA-Z\s'-]+$/),
  age: z.number().int().min(13).max(150),
  role: z.enum(['user', 'editor']),  // Allowlist, never blocklist
});

app.post('/api/users', (req, res) => {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten() });
  }
  // result.data is validated and typed
  createUser(result.data);
});
```

---

## Cross-References

- `02_application_security/secure_coding.md` — Extended secure coding practices
- `02_application_security/authentication.md` — Authentication deep dive
- `02_application_security/authorization.md` — Authorization patterns
- `07_secure_sdlc/security_testing.md` — Testing for OWASP Top 10
- `07_secure_sdlc/devsecops.md` — Automated security in CI/CD
