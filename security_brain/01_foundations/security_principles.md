# Security Principles — Foundational Axioms

## Overview

Security principles are the axioms from which all security decisions derive. They are not guidelines to be weighed against convenience — they are constraints that shape system design. This module codifies the principles that every Security Brain decision must satisfy, grounded in Saltzer and Schroeder's seminal 1975 paper "The Protection of Information in Computer Systems," extended by modern frameworks (NIST SP 800-53, OWASP ASVS) and empirical breach data (Verizon DBIR).

A system that violates these principles is insecure by definition, regardless of what testing reveals.

---

## The CIA Triad

The three fundamental security objectives, formalized in the 1977 NIST definition and universally adopted:

### Confidentiality

**Definition:** Information is accessible only to authorized entities.

**Threat model:** Unauthorized disclosure — an adversary reads data they should not access.

**Controls by layer:**
- **Network:** TLS 1.3 for data in transit, VPN for remote access, network segmentation
- **Application:** Authentication, authorization, output encoding (prevent information leakage in error messages)
- **Data:** Encryption at rest (AES-256-GCM), field-level encryption for sensitive columns, tokenization
- **Operational:** Data classification, access reviews, DLP (Data Loss Prevention)

**Common failures:**
- Verbose error messages exposing stack traces, database schemas, or internal paths
- Overly permissive IAM roles (violates least privilege)
- Unencrypted backups stored in accessible locations
- IDOR vulnerabilities allowing horizontal privilege escalation
- S3 buckets with public read access (a leading cause of data breaches per the Verizon DBIR)

**Measurement:** Data exposure incidents per quarter, percentage of data stores encrypted, access review completion rate.

### Integrity

**Definition:** Information is accurate, complete, and unmodified by unauthorized entities.

**Threat model:** Unauthorized modification — an adversary alters data, code, or configuration.

**Controls by layer:**
- **Network:** TLS (includes MAC for integrity), IPsec
- **Application:** Input validation, parameterized queries, CSRF protection, digital signatures
- **Data:** Checksums, hash verification (SHA-256), database constraints, immutable audit logs
- **Operational:** Change management, code review, signed commits, supply chain verification

**Common failures:**
- SQL injection allowing data modification
- Missing CSRF tokens on state-changing operations
- Unsigned software updates (supply chain attack vector)
- Mutable audit logs (an attacker who gains access can cover their tracks)
- Missing integrity checks on file uploads

**Measurement:** Unauthorized data modification incidents, code signing coverage, supply chain verification percentage.

### Availability

**Definition:** Information and systems are accessible to authorized users when needed.

**Threat model:** Denial of service — an adversary disrupts access to systems or data.

**Controls by layer:**
- **Network:** DDoS mitigation (CDN, traffic scrubbing), redundant network paths, rate limiting
- **Application:** Circuit breakers, graceful degradation, queue-based processing, auto-scaling
- **Data:** Database replication, backup and recovery, multi-region deployment
- **Operational:** Capacity planning, disaster recovery, business continuity planning

**Common failures:**
- No rate limiting on authentication endpoints (brute force + availability impact)
- Single points of failure in critical paths
- No disaster recovery testing (backups exist but restoration is never verified)
- Resource exhaustion from uncontrolled recursive processing or regex (ReDoS)

**Measurement:** Uptime percentage, RTO (Recovery Time Objective) compliance, DDoS mitigation effectiveness.

---

## Defense in Depth

**Origin:** Military doctrine adapted to information security by Saltzer and Schroeder (1975). Formalized in NIST SP 800-53 as the foundational architectural principle.

**Principle:** No single security control is sufficient. Design layered, independent defenses so that the failure of any single layer does not result in compromise.

### The Seven Layers

```
Layer 7: Policies and Procedures
  - Security policies, acceptable use, training
  - Governance, risk management, compliance

Layer 6: Physical Security
  - Data center access controls, device security
  - Environmental controls, surveillance

Layer 5: Network Security
  - Firewalls, IDS/IPS, network segmentation
  - DDoS mitigation, DNS security, VPN

Layer 4: Host Security
  - OS hardening, endpoint protection
  - Patch management, configuration management

Layer 3: Application Security
  - Secure coding, input validation, authentication
  - Authorization, session management, API security

Layer 2: Data Security
  - Encryption at rest/transit, tokenization
  - Data classification, DLP, masking

Layer 1: Identity and Access
  - IAM, MFA, least privilege, access reviews
  - Federation, SSO, privileged access management
```

### Implementation Decision Tree

```
For each asset/threat combination:
  1. What PREVENTS this threat? (Layer 3-5 controls)
  2. If prevention fails, what DETECTS exploitation? (Layer 5 IDS, Layer 3 logging)
  3. If detection fails, what LIMITS the blast radius? (Layer 1-2 least privilege, segmentation)
  4. If containment fails, what enables RECOVERY? (Layer 6-7 backups, IR procedures)

If any layer has zero controls: UNACCEPTABLE RISK — add controls before proceeding.
```

### Real-World Example: Defending Against SQL Injection

- **Layer 5 (Network):** WAF rules blocking common SQL injection patterns
- **Layer 3 (Application):** Parameterized queries (primary control — eliminates the vulnerability class)
- **Layer 3 (Application):** Input validation (defense in depth — rejects unexpected characters)
- **Layer 2 (Data):** Database user with least privilege (limits what injection can access)
- **Layer 2 (Data):** Encryption of sensitive columns (even if data is exfiltrated, it is ciphertext)
- **Layer 1 (Identity):** Database audit logging (detects anomalous queries)

If the WAF is bypassed (it will be — WAFs are bypass-prone), parameterized queries still prevent injection. If a developer accidentally uses string concatenation, the WAF and input validation provide backup. No single layer is relied upon.

---

## Zero Trust Architecture

**Origin:** Coined by Forrester Research (2010), formalized by NIST SP 800-207 (2020). Replaces the perimeter-based "castle and moat" model that assumes internal networks are trusted.

**Core tenets:**
1. **Verify explicitly** — Authenticate and authorize every request based on all available data points (identity, device health, location, data classification, anomalies)
2. **Use least privilege access** — Limit access to just-in-time and just-enough-access (JIT/JEA)
3. **Assume breach** — Minimize blast radius, segment access, verify end-to-end encryption, use analytics for threat detection

### Zero Trust Decision Flow

```
Every access request must answer:
  1. WHO is requesting? (Identity verification — strong authentication, MFA)
  2. WHAT device? (Device health — patched, managed, compliant?)
  3. WHERE from? (Location context — expected geography, network?)
  4. WHAT resource? (Data classification — does access level match?)
  5. WHY now? (Behavioral analysis — is this consistent with normal patterns?)

If ANY answer is unsatisfactory: DENY and log.
If ALL answers are satisfactory: GRANT with minimum necessary privilege.
```

### Implementation Components

| Component | Purpose | Example |
|-----------|---------|---------|
| Identity Provider | Centralized authentication | Okta, Auth0, Azure AD |
| Device Trust | Verify device health | MDM, endpoint detection |
| Micro-segmentation | Limit lateral movement | Service mesh, network policies |
| Policy Engine | Dynamic access decisions | OPA, Cedar, Zanzibar |
| Continuous Monitoring | Detect anomalies | SIEM, UEBA, NDR |
| Encryption Everywhere | Protect data in transit | mTLS, TLS 1.3 |

### Why Zero Trust Matters (Empirical Evidence)

Per the Verizon DBIR 2023: 74% of breaches involve the human element (social engineering, credential theft). Perimeter defenses do not prevent an attacker who has valid credentials. Zero trust ensures that even valid credentials provide only the minimum access needed, with continuous verification.

---

## Principle of Least Privilege

**Origin:** Saltzer and Schroeder, "The Protection of Information in Computer Systems" (1975).

**Definition:** Every subject (user, process, service) should operate with the minimum set of privileges necessary to complete its task, and those privileges should be granted for the minimum duration necessary.

### Application Across Domains

**IAM Roles:**
```
BAD:  AdministratorAccess on all AWS services
GOOD: Specific permissions for specific resources

# Example: Lambda function that reads from S3 and writes to DynamoDB
{
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::my-bucket/input/*"
},
{
  "Effect": "Allow",
  "Action": ["dynamodb:PutItem"],
  "Resource": "arn:aws:dynamodb:us-east-1:123456:table/my-table"
}
```

**Database Users:**
```
BAD:  Application connects as database superuser
GOOD: Application connects with SELECT/INSERT on specific tables only

GRANT SELECT, INSERT ON app_schema.users TO app_service;
GRANT SELECT ON app_schema.products TO app_service;
-- No DELETE, no DROP, no access to other schemas
```

**API Keys:**
```
BAD:  Single API key with full access to all endpoints
GOOD: Scoped tokens with specific permissions and expiration

{
  "scope": "read:products write:orders",
  "exp": 1700000000,
  "sub": "service-checkout"
}
```

**Network Access:**
```
BAD:  All services can communicate with all other services
GOOD: Network policies restrict communication to declared dependencies

# Kubernetes NetworkPolicy: checkout can only talk to payment and inventory
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
spec:
  podSelector:
    matchLabels: { app: checkout }
  egress:
    - to:
      - podSelector: { matchLabels: { app: payment } }
      - podSelector: { matchLabels: { app: inventory } }
```

---

## Fail Secure (Fail Closed)

**Principle:** When a system fails, it should fail into a secure state, not an insecure one.

**Examples:**
- If the authorization service is unreachable: **DENY access** (do not default to allow)
- If TLS handshake fails: **DROP the connection** (do not fall back to plaintext)
- If input validation encounters unexpected data: **REJECT the input** (do not process it anyway)
- If a WAF rule cannot be evaluated: **BLOCK the request** (do not bypass)

**Anti-patterns (NEVER do these):**
- Catching authorization exceptions and returning default "allowed" status
- Disabling certificate validation in production because it "causes errors"
- Setting `verify_ssl=False` to "fix" connection issues
- Adding `|| true` to security check commands in CI/CD

---

## Economy of Mechanism

**Origin:** Saltzer and Schroeder (1975).

**Principle:** Security mechanisms should be as simple and small as possible. Complex mechanisms are difficult to analyze, test, and verify. Every line of code is a potential vulnerability; minimize the security-critical code surface.

**Application:**
- Prefer well-tested libraries over custom cryptographic implementations
- Use framework-provided security features over custom middleware
- Centralize authentication and authorization in a single module, not scattered checks
- Prefer declarative security policies over imperative code

```
BAD:  Custom JWT validation with manual signature verification
GOOD: Well-maintained library (jose, jsonwebtoken) with standard configuration

BAD:  Custom encryption using raw AES primitives
GOOD: AWS KMS / GCP Cloud KMS with envelope encryption
```

---

## Complete Mediation

**Origin:** Saltzer and Schroeder (1975).

**Principle:** Every access to every object must be checked for authority. Caching authorization decisions is dangerous because permissions may have changed since the cache was populated.

**Application:**
- Validate authorization on every request, not just the first
- Do not rely on client-side authorization checks (they can be bypassed)
- Invalidate sessions immediately upon permission changes or password reset
- Re-authenticate for sensitive operations (step-up authentication)

---

## Separation of Duties

**Principle:** No single individual or system component should have sufficient privilege to misuse the system alone. Critical operations require the cooperation of multiple parties.

**Application:**
- Infrastructure changes require code review AND approval
- Production database access requires justification AND time-limited access AND audit logging
- Cryptographic key ceremonies require multiple key custodians (M-of-N)
- Deployment pipelines separate build, test, and deploy responsibilities

---

## Open Design

**Origin:** Saltzer and Schroeder (1975). Aligned with Kerckhoffs's principle (1883).

**Principle:** The security of a system should not depend on the secrecy of its design. Only cryptographic keys should be secret. Algorithms, protocols, and architectures should withstand scrutiny.

**Application:**
- Never rely on security through obscurity as a primary control
- Use published, peer-reviewed cryptographic algorithms (AES, ChaCha20, SHA-256)
- Open-source security tools are preferable because they receive broader scrutiny
- Security designs should be documented and reviewed, not hidden

---

## Summary Decision Matrix

| When deciding... | Apply this principle |
|-----------------|---------------------|
| How many layers of defense? | Defense in Depth — always multiple |
| Who gets access? | Least Privilege — minimum necessary |
| What to protect? | CIA Triad — classify and protect accordingly |
| Network trust model? | Zero Trust — verify explicitly, always |
| What happens on failure? | Fail Secure — deny by default |
| How complex should security be? | Economy of Mechanism — as simple as possible |
| Where to check authorization? | Complete Mediation — every access, every time |
| Who can perform critical actions? | Separation of Duties — require multiple parties |
| Is design secrecy enough? | Open Design — never rely on obscurity |

---

**These principles are non-negotiable. Every security decision in the Security Brain must trace back to one or more of these foundational axioms.**
