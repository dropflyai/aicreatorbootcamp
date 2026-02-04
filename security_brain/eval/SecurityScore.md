# Security Score — Quality Enforcement (Authoritative)

This document defines how security work is evaluated.
Every security assessment, architecture, policy, and incident response must be scored
before it is considered complete.

If security is not measurable, it is not enforced. Unenforceable security is theater.

---

## SCORING RULES (MANDATORY)

Each security artifact must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Threat Model Completeness**
- **Vulnerability Severity Management**
- **Access Control Rigor**
- **Incident Response Readiness**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- Zero critical vulnerabilities unpatched >72 hours
- No feature deploys without threat model
- No authentication bypasses in production

### Rejection Triggers (Automatic Fail)

- Critical vulnerability unpatched >72 hours = **ESCALATION**, mandatory incident process
- No threat model for a new feature = **CANNOT DEPLOY**, gate enforced in CI/CD
- Authentication bypass discovered = **INCIDENT**, immediate rollback mandatory
- PII exposure = **REGULATORY NOTIFICATION REQUIRED**, legal must be engaged
- Secrets committed to version control = **IMMEDIATE ROTATION**, all exposed credentials
- Production database accessible without authentication = **CRITICAL INCIDENT**
- Encryption disabled or downgraded for convenience = **REJECTED**
- Third-party dependency with known critical CVE = **BLOCKED** until patched or mitigated
- Compliance audit finding unaddressed >30 days = **ESCALATION**
- Security training incomplete for engineer with production access = **ACCESS SUSPENDED**

---

## 1. THREAT MODEL COMPLETENESS

**Question:**
Is the threat model comprehensive, current, and covering the full attack surface using a systematic methodology?

### What a Complete Threat Model Contains

1. System decomposition (components, data flows, trust boundaries)
2. Threat identification using STRIDE or equivalent methodology
3. Attack surface enumeration (all entry points, APIs, interfaces)
4. Risk rating for each identified threat (likelihood x impact)
5. Mitigations for each threat (implemented or planned)
6. Residual risk acceptance with justification and approver

### Scoring Guide

- **5** — STRIDE analysis complete for all components, attack surface fully mapped, threat model updated within last 90 days, covers all trust boundaries, data flows traced end-to-end, mitigations documented and verified, residual risks formally accepted, threat model reviewed by second security engineer
- **4** — STRIDE analysis for major components, attack surface mostly mapped, updated within 6 months, most mitigations documented
- **3** — Partial threat model exists, covers primary attack surface but misses secondary vectors, mitigations incomplete
- **2** — Informal threat model (brainstorming notes, no methodology), significant gaps in coverage
- **1** — No threat model exists, or threat model is so outdated it is misleading

### STRIDE Coverage Matrix

Every component must be analyzed for:

| Threat Category | Description | Example | Mitigation Category |
|----------------|-------------|---------|-------------------|
| **S**poofing | Impersonating a user or system | Stolen credentials, session hijacking | Authentication |
| **T**ampering | Modifying data or code | SQL injection, man-in-the-middle | Integrity controls |
| **R**epudiation | Denying an action occurred | Unsigned transactions, no audit logs | Logging, digital signatures |
| **I**nformation Disclosure | Exposing data to unauthorized parties | Data leaks, verbose errors, PII in logs | Encryption, access control |
| **D**enial of Service | Making service unavailable | DDoS, resource exhaustion, infinite loops | Rate limiting, redundancy |
| **E**levation of Privilege | Gaining unauthorized access | IDOR, privilege escalation, RBAC bypass | Authorization, least privilege |

### Attack Surface Inventory Requirements

| Surface | Examples | Must Document |
|---------|----------|--------------|
| External APIs | REST, GraphQL, gRPC endpoints | Auth method, input validation, rate limiting |
| Web application | Pages, forms, file uploads | XSS prevention, CSRF tokens, CSP headers |
| Authentication | Login, SSO, API keys, OAuth flows | Brute force protection, MFA, session management |
| Data storage | Databases, file storage, caches | Encryption at rest, access controls, backup |
| Third-party integrations | Webhooks, OAuth providers, SDKs | Trust boundaries, data shared, update cadence |
| Infrastructure | Cloud services, containers, networks | Network segmentation, IAM policies, logging |
| CI/CD pipeline | Build systems, deploy pipelines | Secret management, artifact integrity, access |
| Client-side | Mobile apps, browser extensions, SPAs | Data caching, certificate pinning, obfuscation |

Score <3 = threat model is incomplete. Features cannot deploy without STRIDE analysis.

---

## 2. VULNERABILITY SEVERITY MANAGEMENT

**Question:**
Are vulnerabilities identified, scored accurately with context, and remediated within SLA?

### Scoring Guide

- **5** — CVSS scoring with environmental context applied, vulnerabilities triaged within 24 hours, critical patched within 72 hours, high within 2 weeks, medium within 30 days, vulnerability backlog trending down, SAST/DAST running in CI/CD, dependency scanning automated, zero critical open >72 hours
- **4** — CVSS scoring applied, critical patched within 1 week, high within 30 days, scanning in CI/CD, small backlog of medium/low
- **3** — Vulnerabilities tracked but SLAs frequently missed, scanning exists but not in CI/CD, some critical vulnerabilities open >1 week
- **2** — Ad-hoc vulnerability management, no consistent SLAs, scanning sporadic
- **1** — No vulnerability scanning, no tracking, no SLAs, vulnerabilities discovered by external parties

### Vulnerability SLA Matrix

| Severity | CVSS Range | Remediation SLA | Escalation If Missed |
|----------|-----------|-----------------|---------------------|
| Critical | 9.0-10.0 | 72 hours | VP Engineering + CISO |
| High | 7.0-8.9 | 14 days | Engineering Manager + Security Lead |
| Medium | 4.0-6.9 | 30 days | Engineering Manager |
| Low | 0.1-3.9 | 90 days | Tracked in backlog |
| Informational | 0.0 | Best effort | No escalation |

### Context-Aware Prioritization

CVSS base scores must be adjusted for environmental context:

| Factor | Adjusts Score | Example |
|--------|-------------|---------|
| Exploitability | Up | Exploit is publicly available, easy to execute |
| Internet-facing | Up | Vulnerability is on an external API, not internal-only |
| Data sensitivity | Up | Component handles PII, PHI, or financial data |
| Compensating controls | Down | WAF blocks the attack vector, even if code is vulnerable |
| Low exposure | Down | Component is internal-only with limited access |
| Active exploitation | Up (Critical) | Vulnerability is being actively exploited in the wild |

### Scanning Requirements

| Scan Type | Tool Category | Frequency | Integration |
|-----------|-------------|-----------|-------------|
| SAST (Static Analysis) | Semgrep, SonarQube, CodeQL | Every PR | CI/CD gate |
| DAST (Dynamic Analysis) | ZAP, Burp Suite, Nuclei | Weekly | Scheduled scan |
| SCA (Dependency Scanning) | Snyk, Dependabot, Trivy | Every build | CI/CD gate |
| Container Scanning | Trivy, Grype, Snyk Container | Every build | CI/CD gate |
| Infrastructure Scanning | Prowler, ScoutSuite, Checkov | Daily | Automated report |
| Secret Detection | GitLeaks, TruffleHog | Every commit | Pre-commit hook + CI |
| Penetration Testing | Manual + automated | Quarterly minimum | Report + remediation |

Score <3 = vulnerability management is broken. Known vulnerabilities are untracked or unpatched.

---

## 3. COMPLIANCE POSTURE

**Question:**
What is the gap count against applicable compliance frameworks, and is the gap trending toward zero?

### Scoring Guide

- **5** — SOC 2 Type II certified and current, GDPR fully compliant with DPA process, zero critical gaps, gap count trending down, evidence collection automated, audit-ready at any time, compliance monitoring continuous
- **4** — SOC 2 Type II in process or achieved, GDPR mostly compliant, <5 medium gaps, evidence collection mostly automated
- **3** — SOC 2 Type I achieved, GDPR partially compliant, 5-15 gaps of varying severity, some manual evidence collection
- **2** — Compliance program initiated but significant gaps remain, >15 gaps, mostly manual processes
- **1** — No compliance program, no framework adopted, no evidence collection, regulatory risk is high

### Compliance Framework Coverage

| Framework | Applicable When | Key Requirements |
|-----------|----------------|-----------------|
| SOC 2 Type II | SaaS handling customer data | Trust Service Criteria (Security, Availability, Confidentiality, Processing Integrity, Privacy) |
| GDPR | EU customer data | Lawful basis, data minimization, right to erasure, DPA, breach notification |
| HIPAA | Health data (PHI) | Administrative, physical, technical safeguards, BAA, breach notification |
| PCI DSS | Payment card data | Network security, access control, encryption, monitoring, testing |
| ISO 27001 | Enterprise customers require | ISMS, risk assessment, control objectives, continuous improvement |
| CCPA/CPRA | California consumer data | Consumer rights, data inventory, privacy notices, opt-out |

### Compliance Gap Tracking

| Gap Severity | Definition | Remediation SLA |
|-------------|-----------|-----------------|
| Critical | Could result in regulatory action or data breach | 30 days |
| High | Significant control weakness, audit finding likely | 60 days |
| Medium | Minor control gap, low risk of regulatory impact | 90 days |
| Low | Enhancement opportunity, not a compliance failure | 180 days |

### Evidence Collection Requirements

For each control:
- [ ] Control description documented
- [ ] Control owner assigned
- [ ] Evidence of control operation collected (automated preferred)
- [ ] Evidence reviewed and validated
- [ ] Gaps between control design and operation identified
- [ ] Remediation plan for gaps documented

Score <3 = compliance is a liability. Regulatory risk is present and unmanaged.

---

## 4. INCIDENT RESPONSE READINESS

**Question:**
Can the team detect, respond to, and recover from a security incident within target timeframes?

### Scoring Guide

- **5** — MTTD (Mean Time to Detect) <1 hour for critical, MTTR (Mean Time to Respond) <4 hours, incident playbooks tested via tabletop exercises quarterly, on-call rotation established, communication templates ready, forensic toolkit prepared, lessons-learned process after every incident, incident metrics tracked and improving
- **4** — MTTD <4 hours, MTTR <12 hours, playbooks exist for major incident types, tested semi-annually
- **3** — MTTD <24 hours, MTTR <48 hours, some playbooks exist but not regularly tested
- **2** — Detection depends on external notification, response is ad-hoc, no playbooks
- **1** — No incident response plan, no detection capability, no defined process

### Incident Severity Classification

| Severity | Definition | Examples | Response Time |
|----------|-----------|---------|---------------|
| SEV-1 (Critical) | Active data breach, production down, widespread customer impact | Data exfiltration, ransomware, auth bypass in production | Immediate, all-hands |
| SEV-2 (High) | Significant security event, limited customer impact | Compromised credentials, suspicious lateral movement, targeted attack | Within 1 hour |
| SEV-3 (Medium) | Security event with contained impact | Phishing attempt succeeded, malware on endpoint, policy violation | Within 4 hours |
| SEV-4 (Low) | Potential security event, no confirmed impact | Suspicious login activity, vulnerability scan detected, failed auth spike | Within 24 hours |

### Incident Response Playbook Requirements

Each playbook must contain:

```
## Playbook: [Incident Type]

### Detection
- Alerts that trigger this playbook
- Manual indicators to look for
- False positive criteria

### Triage (First 30 Minutes)
- Severity classification
- Initial containment actions
- Who to notify

### Containment (30 Minutes - 4 Hours)
- Isolation steps
- Evidence preservation
- Impact assessment

### Eradication (4 Hours - 48 Hours)
- Root cause identification
- Threat removal
- Verification of removal

### Recovery (1-7 Days)
- System restoration
- Monitoring for recurrence
- Customer notification (if applicable)

### Post-Incident (1-2 Weeks)
- Lessons learned document
- Process improvements
- Metric updates (MTTD, MTTR)
```

### Required Playbooks

| Playbook | Covers |
|----------|--------|
| Data breach | PII/PHI exposure, database compromise, data exfiltration |
| Ransomware | Encryption attack, extortion, system lockout |
| Account compromise | Credential theft, session hijacking, privilege escalation |
| DDoS | Volumetric, application-layer, DNS attacks |
| Insider threat | Malicious employee, accidental data exposure |
| Supply chain | Compromised dependency, vendor breach, CI/CD compromise |
| Phishing | Targeted phishing, credential harvesting, BEC |
| Stolen device | Laptop/phone theft with access to systems |

### Tabletop Exercise Requirements

- Frequency: Quarterly minimum
- Participants: Engineering, Security, Leadership, Legal, Communications
- Scenarios: Rotate through each playbook type
- Deliverable: After-action report with improvement items
- Tracking: All improvement items tracked to completion

Score <3 = incident response is unprepared. A real incident will cause chaos.

---

## 5. SECURE CODE QUALITY

**Question:**
Is the codebase free from OWASP Top 10 vulnerabilities with SAST/DAST validation?

### Scoring Guide

- **5** — Zero OWASP Top 10 findings in SAST/DAST, security code review for all PRs touching auth/authz/data, secure coding guidelines documented and enforced, security champions in each engineering team, SAST/DAST gates in CI/CD that block merges, annual penetration test clean
- **4** — <5 medium OWASP findings, SAST in CI/CD, security review for sensitive PRs, pen test findings remediated
- **3** — Some OWASP findings present but no criticals, SAST exists but not gating, pen test conducted but findings partially open
- **2** — Multiple OWASP findings including high severity, no SAST/DAST in CI/CD, pen test overdue
- **1** — OWASP Top 10 vulnerabilities present in production, no scanning, no security review process

### OWASP Top 10 Coverage (2021)

| # | Category | Detection Method | Prevention |
|---|----------|-----------------|------------|
| A01 | Broken Access Control | DAST, code review, pen test | RBAC, ABAC, deny-by-default, IDOR testing |
| A02 | Cryptographic Failures | SAST, config review | TLS 1.2+, AES-256, proper key management |
| A03 | Injection | SAST, DAST, pen test | Parameterized queries, input validation, ORM |
| A04 | Insecure Design | Threat modeling, design review | Secure design patterns, abuse case modeling |
| A05 | Security Misconfiguration | Infrastructure scanning, DAST | Hardened defaults, automated config validation |
| A06 | Vulnerable Components | SCA, dependency scanning | Automated dependency updates, SCA in CI/CD |
| A07 | Auth Failures | DAST, code review, pen test | MFA, credential stuffing protection, session mgmt |
| A08 | Software/Data Integrity | SAST, supply chain review | Signed artifacts, SRI, integrity verification |
| A09 | Logging Failures | Code review, log audit | Comprehensive logging, tamper-proof log storage |
| A10 | SSRF | DAST, code review | Input validation, network segmentation, allow-lists |

### Secure Coding Standards (Required)

| Practice | Requirement | Enforcement |
|----------|-------------|-------------|
| Input validation | All user input validated on server-side | SAST rule |
| Output encoding | All output encoded for context (HTML, JS, URL, SQL) | SAST rule |
| Authentication | Industry-standard library used, no custom auth | Code review |
| Session management | Secure session config, timeout, rotation | Config review |
| Error handling | No sensitive data in error messages | SAST rule + DAST |
| Logging | Security events logged, no PII in logs | Code review |
| Cryptography | No custom crypto, approved algorithms only | SAST rule |
| File handling | File type validation, size limits, secure storage | Code review |
| API security | Rate limiting, auth on all endpoints, input validation | DAST |
| Dependency management | No known critical CVEs, auto-update enabled | SCA |

Score <3 = code has known security vulnerabilities. Deployment should be gated.

---

## 6. ACCESS CONTROL RIGOR

**Question:**
Is least privilege enforced, verified, and audited across all systems?

### Scoring Guide

- **5** — Least privilege verified across all systems, IAM audit clean (no stale accounts, no over-provisioned roles), JIT (just-in-time) access for sensitive systems, access reviews quarterly, privileged access managed via PAM, service accounts inventoried and rotated, zero standing admin access to production
- **4** — Least privilege mostly enforced, IAM audit has <5 findings, access reviews semi-annual, PAM in place for most privileged access
- **3** — RBAC defined but not fully enforced, some over-provisioned accounts, access reviews annual, some standing admin access
- **2** — Basic access control but significant gaps, many over-provisioned accounts, no regular access reviews
- **1** — No access control strategy, shared accounts, no reviews, everyone is admin

### Access Control Requirements

| Principle | Implementation | Verification |
|-----------|---------------|-------------|
| Least privilege | Users have minimum access needed for their role | Quarterly access review |
| Separation of duties | No single person can complete a critical action alone | Process review |
| Need-to-know | Data access limited to those who need it | Data access audit |
| Just-in-time | Elevated access granted temporarily, not standing | PAM tool audit |
| MFA everywhere | MFA required for all systems, no exceptions | Authentication audit |
| Service account control | Inventoried, rotated, limited scope | Service account audit |
| Offboarding | Access revoked within 24 hours of departure | HR integration check |

### IAM Audit Checklist

- [ ] No shared accounts (every access is attributable to an individual)
- [ ] No standing admin access to production (JIT only)
- [ ] All service accounts inventoried with owners
- [ ] Service account credentials rotated per schedule
- [ ] MFA enabled for all human accounts (no exceptions)
- [ ] Offboarded employees have zero active access (verify within 24 hours)
- [ ] Role definitions documented and current
- [ ] Over-provisioned accounts identified and remediated
- [ ] External contractor access time-limited and reviewed
- [ ] API keys rotated per schedule and scoped minimally

### Privileged Access Management

| Access Type | Control | Audit Frequency |
|-------------|---------|----------------|
| Production database | JIT via PAM, time-limited, logged | Every access logged, weekly review |
| Production servers | JIT via PAM, time-limited, logged | Every access logged, weekly review |
| Cloud console admin | MFA + JIT, break-glass procedure | Monthly audit |
| CI/CD admin | Limited to security + senior eng, MFA | Quarterly audit |
| Source code (sensitive repos) | Team-based access, PR reviews required | Quarterly audit |
| Customer data access | Justified, logged, time-limited | Every access logged, monthly review |

Score <3 = access control is insufficient. Over-privileged access exists and is unaudited.

---

## 7. ENCRYPTION STANDARDS

**Question:**
Is data encrypted at rest, in transit, and (where applicable) in use, with proper key management?

### Scoring Guide

- **5** — Encryption at rest for all data stores (AES-256), encryption in transit (TLS 1.2+ everywhere, TLS 1.3 preferred), key management via HSM or KMS, key rotation automated per schedule, certificate management automated, no plaintext secrets anywhere, encryption in use for sensitive computations where applicable
- **4** — Encryption at rest and in transit for all systems, KMS for key management, key rotation defined, certificates managed
- **3** — Encryption at rest and in transit for most systems, some gaps (internal services, dev environments), key rotation partially implemented
- **2** — Encryption in transit exists but inconsistent, encryption at rest for some databases only, manual key management
- **1** — Encryption gaps in production, plaintext data in transit or at rest, no key management

### Encryption Requirements Matrix

| Data State | Standard | Minimum | Implementation |
|-----------|----------|---------|----------------|
| At rest (database) | AES-256 | AES-128 | Database-level or application-level encryption |
| At rest (file storage) | AES-256 | AES-128 | Server-side encryption enabled on storage |
| At rest (backups) | AES-256 | AES-128 | Encrypted backups, key stored separately |
| In transit (external) | TLS 1.3 | TLS 1.2 | No TLS <1.2, strong cipher suites only |
| In transit (internal) | TLS 1.2+ | mTLS preferred | Service-to-service encryption |
| In transit (API) | TLS 1.3 | TLS 1.2 | HSTS enabled, certificate pinning on mobile |
| Keys | KMS/HSM managed | KMS minimum | No keys in code, env vars, or config files |

### Key Management Requirements

| Requirement | Standard | Verification |
|-------------|----------|-------------|
| Key storage | Cloud KMS or HSM (never in code or config) | Repository scan + infra audit |
| Key rotation | Automated per schedule (90 days for data keys, annually for master keys) | KMS audit log |
| Key access | Least privilege, logged, auditable | Access review |
| Key backup | Encrypted backup in separate location | DR test |
| Key revocation | Process defined and tested | Tabletop exercise |
| Certificate management | Automated renewal (cert-manager, ACM) | Expiry monitoring |
| Secret management | Vault, AWS Secrets Manager, or equivalent | No secrets in code (GitLeaks) |

### Encryption Anti-Patterns (Must Not Exist)

| Anti-Pattern | Risk | Detection |
|-------------|------|-----------|
| Plaintext database columns with PII | Data breach exposure | Schema audit + SAST |
| HTTP endpoints (no TLS) | Data interception | Network scan + DAST |
| Self-signed certificates in production | MITM vulnerability | Certificate audit |
| Hardcoded encryption keys | Key compromise | SAST + secret scanning |
| Disabled certificate verification | MITM vulnerability | Code review + SAST |
| Weak cipher suites (RC4, DES, 3DES) | Cryptographic attack | TLS configuration scan |
| Keys in environment variables without rotation | Key compromise over time | Infrastructure audit |

Score <3 = encryption has gaps. Data is exposed to interception or unauthorized access.

---

## 8. SECURITY CULTURE

**Question:**
Is security awareness embedded in the organization through training, testing, and behavioral measurement?

### Scoring Guide

- **5** — Security training completed by 100% of employees within 30 days of hire and annually, phishing simulation pass rate >90%, security champions in every engineering team, security is part of engineering promotion criteria, bug bounty program active, security incident reporting is blame-free and encouraged, security metrics on engineering dashboards
- **4** — Training completion >90%, phishing pass rate >80%, security champions in most teams, bug bounty or responsible disclosure
- **3** — Training completion >75%, phishing pass rate >70%, some security awareness but not embedded in engineering culture
- **2** — Training exists but completion is low (<60%), no phishing simulations, security seen as a blocker not enabler
- **1** — No security training, no phishing testing, security is someone else's problem, shadow IT is common

### Security Training Requirements

| Audience | Training | Frequency | Verification |
|----------|----------|-----------|-------------|
| All employees | Security awareness (phishing, social engineering, data handling) | Annual + at hire | Quiz pass rate >80% |
| Engineers | Secure coding (OWASP, language-specific) | Annual + at hire | Hands-on assessment |
| Engineers (sensitive code) | Advanced security (auth, crypto, threat modeling) | Annual | Peer review certification |
| Managers | Security risk management, incident escalation | Annual | Scenario completion |
| Executives | Security governance, regulatory requirements | Annual | Briefing attendance |
| New hires | Security onboarding (policies, tools, reporting) | Within 30 days of hire | Checklist completion |

### Phishing Simulation Program

| Metric | Target | Action If Missed |
|--------|--------|-----------------|
| Click rate (overall) | <10% | Additional training for clickers |
| Click rate (targeted) | <5% | 1:1 coaching for repeated clickers |
| Report rate | >50% | Reward reporting behavior |
| Simulation frequency | Monthly | Vary difficulty and type |
| Follow-up training | Within 48 hours of failed sim | Automated enrollment |

### Security Champion Program

Requirements:
- At least one security champion per engineering team
- Champions receive advanced security training quarterly
- Champions conduct peer code reviews for security-sensitive changes
- Champions are the first point of contact for security questions
- Champions attend monthly security sync
- Champion role is recognized in performance reviews

Score <3 = security culture is weak. Humans are the largest attack surface and are untrained.

---

## SCORING SUMMARY TEMPLATE

```
## Security Score Report — [System/Application/Organization]
## Date: [YYYY-MM-DD]
## Evaluator: [Name]

| # | Dimension | Score (1-5) | Notes |
|---|-----------|-------------|-------|
| 1 | Threat Model Completeness | _ | |
| 2 | Vulnerability Severity Management | _ | |
| 3 | Compliance Posture | _ | |
| 4 | Incident Response Readiness | _ | |
| 5 | Secure Code Quality | _ | |
| 6 | Access Control Rigor | _ | |
| 7 | Encryption Standards | _ | |
| 8 | Security Culture | _ | |

**Average Score:** _
**Hard Fail Triggered:** Yes/No
**Rejection Triggers Hit:** [List any]

### Verdict
- [ ] PASS — Average >= 4.0, no hard fails
- [ ] CONDITIONAL PASS — Average >= 3.5, action items required with deadlines
- [ ] FAIL — Average < 3.5 or hard fail triggered

### Critical Findings
1. [Finding with severity and remediation deadline]
2. [Finding with severity and remediation deadline]

### Next Review Date: [YYYY-MM-DD]
```

---

## ESCALATION PROTOCOL

| Condition | Action |
|-----------|--------|
| Any dimension scores 1 | Immediate review with CISO or security lead |
| Average score <3.0 | Security posture review with executive team |
| Critical vulnerability open >72 hours | Escalation to VP Engineering + CISO |
| Compliance gap rated critical >30 days | Escalation to Legal + CISO |
| Incident response drill fails | Re-drill within 30 days, mandatory |
| Authentication bypass in production | Immediate rollback, SEV-1 incident |
| PII exposure confirmed | Legal notification, regulatory assessment |
| Phishing simulation fail rate >30% | Mandatory re-training within 2 weeks |

---

## QUARTERLY CALIBRATION

Every quarter, the Security Score system itself must be calibrated:

1. Review all security incidents from the quarter
2. Did the scoring system predict areas of weakness?
3. Update threat model based on new threat intelligence
4. Adjust vulnerability SLAs based on team capacity and risk
5. Review compliance gaps and update remediation timelines
6. Update training materials based on real incidents and industry trends
7. Test incident response playbooks via tabletop exercise

---

**This scoring system is authoritative. No system deploys without passing.**
**Security without measurement is security theater. Measured security saves the business.**
