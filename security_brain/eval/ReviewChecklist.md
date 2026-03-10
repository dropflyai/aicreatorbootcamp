# Security Review Checklist — Pre-Ship Verification (Authoritative)

Every system, feature, infrastructure change, and security policy must pass this
checklist before it deploys to production.

No exceptions. No "we will fix it later." Incomplete checklist = cannot deploy.

---

## HOW TO USE THIS CHECKLIST

1. Complete every section relevant to the artifact type
2. Mark each item: PASS, FAIL, or N/A (with justification for N/A)
3. All FAIL items must be resolved before shipping
4. Critical/High FAIL items block deployment
5. Medium FAIL items require a remediation plan with deadline
6. Reviewer must sign off at the bottom

### Artifact Types

| Type | Required Sections |
|------|------------------|
| New feature/service | 1, 2, 3, 4, 5, 6, 7, 8, 10 |
| API endpoint | 1, 2, 3, 4, 5, 8, 10 |
| Infrastructure change | 1, 6, 7, 8, 9, 10 |
| Third-party integration | 1, 3, 5, 7, 8, 9, 10 |
| Security policy | 1, 9, 10 |
| Incident response update | 1, 9, 10 |
| Compliance program | 1, 8, 9, 10 |

---

## SECTION 1: THREAT MODEL REVIEW

### 1.1 Threat Model Existence
- [ ] Threat model exists for this feature/system
- [ ] Threat model is current (updated within last 90 days or updated for this change)
- [ ] Threat model covers all new components and data flows
- [ ] STRIDE analysis completed for each component
- [ ] Attack surface documented (all entry points, APIs, interfaces)

### 1.2 Threat Coverage
- [ ] Spoofing threats identified and mitigated
- [ ] Tampering threats identified and mitigated
- [ ] Repudiation threats identified and mitigated (audit logging)
- [ ] Information disclosure threats identified and mitigated
- [ ] Denial of service threats identified and mitigated
- [ ] Elevation of privilege threats identified and mitigated

### 1.3 Data Flow Analysis
- [ ] All data flows documented (input, processing, storage, output)
- [ ] Trust boundaries identified (where does trust change?)
- [ ] Sensitive data identified and classified (PII, PHI, financial, credentials)
- [ ] Data at rest encryption verified for sensitive data
- [ ] Data in transit encryption verified for all flows

### 1.4 Risk Acceptance
- [ ] All identified risks have mitigations or accepted residual risk
- [ ] Residual risk acceptance is documented with business justification
- [ ] Risk acceptance is approved by appropriate authority (security lead for medium, CISO for high)
- [ ] No critical risks accepted without executive approval

---

## SECTION 2: AUTHENTICATION AND AUTHORIZATION

### 2.1 Authentication
- [ ] Authentication required for all non-public endpoints
- [ ] Authentication mechanism uses industry-standard library (not custom)
- [ ] Password requirements meet standards (minimum 12 characters, complexity, breach list check)
- [ ] MFA available and enforced for sensitive operations
- [ ] Brute force protection in place (rate limiting, account lockout, CAPTCHA)
- [ ] Session management is secure (HTTP-only cookies, secure flag, SameSite, timeout, rotation)
- [ ] Password reset flow is secure (no user enumeration, token expiry, rate limited)
- [ ] OAuth/OIDC implementation follows security best practices (if applicable)
- [ ] API key management is secure (scoped, rotatable, not exposed in URLs)
- [ ] JWT implementation is secure (proper algorithm, expiry, signature verification)

### 2.2 Authorization
- [ ] Authorization checked on every request (not just UI hiding)
- [ ] RBAC or ABAC model defined and implemented
- [ ] Default deny: access denied unless explicitly granted
- [ ] IDOR prevention: object-level authorization checks in place
- [ ] Multi-tenancy isolation verified (tenant A cannot access tenant B data)
- [ ] Admin functions protected with additional authorization
- [ ] Privilege escalation paths reviewed and hardened
- [ ] API endpoints enforce same authorization as UI
- [ ] Authorization bypass testing performed (automated + manual)
- [ ] Horizontal privilege testing (user A accessing user B resources)

### 2.3 Session Security
- [ ] Session tokens are cryptographically random (minimum 128 bits entropy)
- [ ] Sessions expire after inactivity timeout (30 min for sensitive apps)
- [ ] Sessions invalidated on logout (server-side, not just client)
- [ ] Session fixation prevention in place
- [ ] Concurrent session policy defined (allow/deny/notify)
- [ ] Session tokens not exposed in URLs or logs

---

## SECTION 3: INPUT VALIDATION AND OUTPUT ENCODING

### 3.1 Input Validation
- [ ] All user input validated on server-side (never trust client-side only)
- [ ] Input validation uses allow-lists where possible (not deny-lists)
- [ ] SQL injection prevention: parameterized queries or ORM used everywhere
- [ ] NoSQL injection prevention: input sanitized for NoSQL operations
- [ ] Command injection prevention: no user input in system commands (or fully escaped)
- [ ] LDAP injection prevention (if applicable)
- [ ] XML/XXE prevention: external entity processing disabled
- [ ] File upload validation: type, size, content verification, not just extension
- [ ] Path traversal prevention: no user input in file paths (or fully sanitized)
- [ ] Regular expression DoS (ReDoS) prevention: no catastrophic backtracking

### 3.2 Output Encoding
- [ ] XSS prevention: all output encoded for context (HTML, JavaScript, CSS, URL)
- [ ] Content Security Policy (CSP) headers configured and enforced
- [ ] X-Content-Type-Options: nosniff header set
- [ ] X-Frame-Options or frame-ancestors CSP directive set
- [ ] Referrer-Policy header configured (strict-origin-when-cross-origin minimum)
- [ ] JSON responses use proper Content-Type (application/json, not text/html)
- [ ] Error messages do not expose sensitive information (stack traces, SQL, internal paths)

### 3.3 CSRF Protection
- [ ] CSRF tokens implemented for all state-changing operations
- [ ] CSRF tokens are per-session and validated server-side
- [ ] SameSite cookie attribute set (Lax minimum, Strict preferred)
- [ ] Custom headers required for API requests (as additional CSRF mitigation)

---

## SECTION 4: API SECURITY

### 4.1 API Design
- [ ] API authentication required for all non-public endpoints
- [ ] Rate limiting implemented per endpoint and per user/IP
- [ ] Request size limits enforced (prevent resource exhaustion)
- [ ] Response pagination enforced (prevent data dump)
- [ ] API versioning in place (breaking changes managed)
- [ ] GraphQL: query depth limiting and complexity analysis (if applicable)
- [ ] GraphQL: introspection disabled in production (if applicable)
- [ ] No sensitive data in URL parameters (use request body or headers)

### 4.2 API Data Protection
- [ ] Response filtering: only return data the requestor is authorized to see
- [ ] No internal IDs exposed unless necessary (use UUIDs over sequential IDs)
- [ ] Sensitive fields masked in responses where appropriate
- [ ] Bulk data endpoints require elevated permissions
- [ ] API does not expose more data than the UI shows (over-fetching)

### 4.3 API Monitoring
- [ ] API access logged (who, what, when, from where)
- [ ] Anomalous API usage detected and alerted
- [ ] Rate limit violations logged and monitored
- [ ] API error rates monitored (spike may indicate attack)
- [ ] Deprecated endpoints tracked for removal

---

## SECTION 5: DATA PROTECTION

### 5.1 Data Classification
- [ ] Data classification scheme applied to all data handled
- [ ] PII identified and inventoried
- [ ] PHI identified and inventoried (if applicable)
- [ ] Financial data identified and inventoried (if applicable)
- [ ] Credentials and secrets identified and inventoried
- [ ] Data retention policy defined and enforced

### 5.2 Data Storage Security
- [ ] Encryption at rest enabled for all data stores
- [ ] Encryption keys managed via KMS/HSM (not in code)
- [ ] Database access requires authentication (no anonymous access)
- [ ] Database access uses least privilege roles
- [ ] Backups encrypted and access-controlled
- [ ] Data masking in non-production environments (no real PII in staging/dev)
- [ ] Logs do not contain PII or credentials

### 5.3 Data Transmission Security
- [ ] TLS 1.2+ for all external communications
- [ ] TLS for internal service-to-service communication
- [ ] Certificate management automated (no expired certs)
- [ ] HSTS enabled with appropriate max-age
- [ ] No sensitive data transmitted over non-encrypted channels

### 5.4 Data Deletion and Retention
- [ ] Data retention policy enforced (automated deletion where possible)
- [ ] Right to erasure (GDPR) process implemented and tested
- [ ] Backup retention aligned with data retention policy
- [ ] Deleted data is actually deleted (not soft-deleted forever)
- [ ] Data deletion is verified (audit trail of deletion)

---

## SECTION 6: INFRASTRUCTURE SECURITY

### 6.1 Network Security
- [ ] Network segmentation in place (public, private, data tiers)
- [ ] Firewall rules follow least privilege (deny all, allow specific)
- [ ] No unnecessary ports open to the internet
- [ ] VPN or bastion required for internal access
- [ ] DNS security (DNSSEC where applicable)
- [ ] DDoS protection in place (CDN, WAF, cloud provider)

### 6.2 Container and Orchestration Security
- [ ] Base images from trusted sources, regularly updated
- [ ] Container images scanned for vulnerabilities before deployment
- [ ] Containers run as non-root user
- [ ] Read-only filesystem where possible
- [ ] Resource limits set (CPU, memory) to prevent resource exhaustion
- [ ] No secrets in container images or environment variables (use secrets manager)
- [ ] Kubernetes: RBAC configured, pod security policies enforced

### 6.3 Cloud Security
- [ ] Cloud IAM follows least privilege
- [ ] Cloud resources tagged and inventoried
- [ ] Cloud security monitoring enabled (CloudTrail, Config, GuardDuty or equivalents)
- [ ] S3 buckets (or equivalent) not publicly accessible unless intentional
- [ ] Cloud networking uses private subnets for data and application tiers
- [ ] Infrastructure as Code (IaC) scanned for misconfigurations

### 6.4 Logging and Monitoring
- [ ] Security events logged to centralized logging system
- [ ] Log integrity protected (tamper-proof or append-only)
- [ ] Log retention meets compliance requirements (minimum 1 year)
- [ ] Alerting configured for security-relevant events
- [ ] SIEM or equivalent for log analysis and correlation
- [ ] Anomaly detection for unusual access patterns

---

## SECTION 7: SECRETS AND KEY MANAGEMENT

### 7.1 Secret Storage
- [ ] No secrets in source code (verified by pre-commit hook and CI scan)
- [ ] No secrets in environment variables without a secrets manager
- [ ] Secrets stored in approved vault (HashiCorp Vault, AWS Secrets Manager, etc.)
- [ ] Secret access logged and auditable
- [ ] Secrets scoped to minimum necessary (not one key for everything)

### 7.2 Key Rotation
- [ ] API keys rotated per schedule (90 days maximum)
- [ ] Database credentials rotated per schedule
- [ ] Encryption keys rotated per schedule
- [ ] Service account credentials rotated per schedule
- [ ] Key rotation does not cause downtime (graceful rotation)

### 7.3 Certificate Management
- [ ] TLS certificates from trusted CA (not self-signed in production)
- [ ] Certificate renewal automated (cert-manager, ACM, etc.)
- [ ] Certificate expiry monitored with alerts at 30, 14, 7 days
- [ ] Certificate pinning implemented for mobile apps (if applicable)
- [ ] Old certificates revoked after rotation

---

## SECTION 8: COMPLIANCE VERIFICATION

### 8.1 Regulatory Compliance
- [ ] GDPR requirements met (if applicable): consent, DPA, data minimization, erasure
- [ ] HIPAA requirements met (if applicable): BAA, PHI encryption, access controls, audit
- [ ] PCI DSS requirements met (if applicable): cardholder data environment isolated
- [ ] SOC 2 controls operating effectively (if applicable)
- [ ] CCPA/CPRA requirements met (if applicable)

### 8.2 Privacy
- [ ] Privacy policy current and accurate
- [ ] Cookie consent implemented correctly
- [ ] Data processing agreements in place with all sub-processors
- [ ] Data subject rights processes implemented and tested (access, erasure, portability)
- [ ] Privacy impact assessment completed for new data processing

### 8.3 Audit Readiness
- [ ] Control evidence being collected (automated where possible)
- [ ] Audit trail exists for all sensitive operations
- [ ] Access reviews completed per schedule
- [ ] Policy documents current and approved
- [ ] Previous audit findings remediated

---

## SECTION 9: POLICY AND PROCESS

### 9.1 Security Policies
- [ ] Information security policy exists and is current
- [ ] Acceptable use policy exists and is acknowledged by all employees
- [ ] Incident response plan exists and is tested
- [ ] Business continuity / disaster recovery plan exists and is tested
- [ ] Vendor security assessment process exists and is followed

### 9.2 Change Management
- [ ] All production changes go through change management process
- [ ] Security review required for changes to auth, data handling, infrastructure
- [ ] Rollback plan exists for every production change
- [ ] Emergency change process defined and documented
- [ ] Change audit trail maintained

### 9.3 Vendor Security
- [ ] Third-party vendors assessed for security posture before engagement
- [ ] Vendor security questionnaire completed for data-handling vendors
- [ ] BAA/DPA signed with vendors processing sensitive data
- [ ] Vendor access is scoped, time-limited, and audited
- [ ] Vendor incident notification requirements documented in contract

---

## SECTION 10: REVIEW AND SIGN-OFF

### 10.1 Pre-Review
- [ ] All applicable sections completed
- [ ] FAIL items documented with remediation plans
- [ ] Compensating controls documented for any accepted risks
- [ ] No critical or high FAIL items unresolved

### 10.2 Review Findings Summary
- [ ] Total PASS items documented
- [ ] Total FAIL items documented with severity
- [ ] Total N/A items documented with justification
- [ ] Remediation timeline for FAIL items agreed

---

## SIGN-OFF

```
Artifact: [Name]
Type: [Feature / API / Infrastructure / Integration / Policy]
Reviewer: [Name]
Date: [YYYY-MM-DD]

Sections Reviewed: [List numbers]
Items Passed: [Count]
Items Failed: [Count] (Critical: _, High: _, Medium: _, Low: _)
Items N/A: [Count]

All Critical/High FAIL items resolved: [ ] Yes [ ] No
Remediation plan for Medium/Low FAIL items: [ ] Yes [ ] No

VERDICT:
[ ] APPROVED — Deploy to production
[ ] CONDITIONAL — Deploy with documented exceptions and remediation timeline
[ ] REJECTED — Cannot deploy, must fix critical/high issues

Security Reviewer Signature: _______________
Engineering Lead Approval: _______________
Security Lead Approval (if critical system): _______________
```

---

## COMMON REJECTION REASONS

| Reason | Frequency | Severity | Fix |
|--------|-----------|----------|-----|
| No threat model | Very Common | Blocking | Complete STRIDE analysis before review |
| SQL injection vulnerability | Common | Critical | Use parameterized queries exclusively |
| Missing authorization check | Common | Critical | Add server-side authz check on every endpoint |
| Secrets in code | Common | Critical | Move to secrets manager, rotate compromised secrets |
| Missing rate limiting | Common | High | Add per-endpoint and per-user rate limits |
| No input validation | Occasional | High | Add server-side validation with allow-lists |
| Missing encryption at rest | Occasional | High | Enable database-level or application-level encryption |
| Over-provisioned IAM | Periodic | High | Scope down to least privilege |
| Missing security logging | Periodic | Medium | Add structured security event logging |

---

**No system deploys to production without a completed security review.**
**Security review is not bureaucracy. It is the last line of defense before the attacker.**
