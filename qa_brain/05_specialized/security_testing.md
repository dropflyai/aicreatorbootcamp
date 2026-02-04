# Security Testing — OWASP Methodology, Penetration Testing, and Vulnerability Analysis

## What This Enables

**Decisions it helps make:**
- Which security vulnerabilities require immediate remediation versus acceptance with compensating controls
- Whether an application is safe to deploy to production from a security posture standpoint
- Where to invest in automated security scanning versus manual penetration testing for maximum coverage
- Which OWASP Top 10 categories represent the highest risk for a given application architecture

**Mistakes it prevents:**
- Deploying applications with SQL injection, XSS, or authentication bypass vulnerabilities that are detectable through automated scanning
- Treating security testing as a one-time pre-launch activity rather than continuous validation integrated into CI/CD
- Relying exclusively on DAST (Dynamic Application Security Testing) and missing vulnerabilities that only SAST (Static Application Security Testing) can detect, or vice versa
- Failing to test authorization boundaries (horizontal and vertical privilege escalation) which automated scanners consistently miss

**Outputs it enables:**
- Vulnerability assessment reports ranked by CVSS severity with remediation guidance
- Security test automation suites integrated into CI/CD pipelines
- Penetration testing reports with proof-of-concept exploits and business impact analysis
- Compliance evidence for SOC 2, PCI-DSS, HIPAA, and GDPR security requirements

---

## The Core Insight

Security testing is fundamentally adversarial -- it requires thinking like an attacker rather than a builder. While functional testing asks "does the feature work as intended?", security testing asks "can the feature be made to work in unintended ways that compromise confidentiality, integrity, or availability?" This adversarial mindset shift is why organizations staffed entirely with developers who "also do security" consistently miss vulnerabilities that dedicated security testers find. The skill sets overlap but are not identical.

The second critical insight is that security testing must operate at multiple layers simultaneously. SAST catches insecure code patterns before deployment. DAST finds runtime vulnerabilities in the deployed application. SCA (Software Composition Analysis) identifies known vulnerabilities in third-party dependencies. Penetration testing discovers business logic flaws that automated tools cannot detect. No single approach provides adequate coverage -- security testing requires a defense-in-depth strategy mirroring the defense-in-depth security architecture it validates.

---

## OWASP Testing Methodology

### OWASP Top 10 (2021) Testing Guide

| # | Category | Testing Approach | Automation Feasibility |
|---|----------|-----------------|----------------------|
| A01 | Broken Access Control | Manual + automated auth testing | Medium (automated for patterns, manual for logic) |
| A02 | Cryptographic Failures | SAST + configuration scanning | High |
| A03 | Injection (SQL, NoSQL, OS, LDAP) | DAST + SAST + manual fuzzing | High |
| A04 | Insecure Design | Threat modeling + manual review | Low (requires human analysis) |
| A05 | Security Misconfiguration | Configuration scanning + DAST | High |
| A06 | Vulnerable Components | SCA (Dependabot, Snyk, npm audit) | High |
| A07 | Authentication Failures | Automated + manual testing | Medium |
| A08 | Software and Data Integrity | Supply chain verification, SRI | Medium |
| A09 | Security Logging Failures | Log review + negative testing | Medium |
| A10 | Server-Side Request Forgery (SSRF) | DAST + manual testing | Medium |

### OWASP Testing Framework

```
Phase 1: Information Gathering
├── Technology fingerprinting (server, framework, language)
├── Application mapping (sitemap, API endpoints, entry points)
├── Authentication mechanism identification
└── Trust boundary identification

Phase 2: Configuration and Deployment Testing
├── SSL/TLS configuration (cipher suites, protocol versions)
├── HTTP security headers (CSP, HSTS, X-Frame-Options)
├── Error handling (verbose errors leaking information)
├── Default credentials and unnecessary features
└── File extension handling and upload restrictions

Phase 3: Identity Management Testing
├── User registration process (enumeration prevention)
├── Account provisioning and deprovisioning
├── Role definitions and permission mapping
└── Account lockout and rate limiting

Phase 4: Authentication Testing
├── Credential transport (HTTPS enforcement)
├── Password policy enforcement
├── Session management (token generation, expiration, invalidation)
├── Multi-factor authentication bypass attempts
└── Password reset flow security

Phase 5: Authorization Testing
├── Vertical privilege escalation (user → admin)
├── Horizontal privilege escalation (user A → user B data)
├── IDOR (Insecure Direct Object References)
├── Function-level access control
└── File and resource access control

Phase 6: Input Validation Testing
├── SQL injection (error-based, blind, time-based)
├── Cross-Site Scripting (reflected, stored, DOM-based)
├── Command injection (OS command, LDAP, XML)
├── Path traversal and local file inclusion
├── Server-Side Request Forgery (SSRF)
└── HTTP parameter pollution

Phase 7: Business Logic Testing
├── Workflow bypass (skipping steps in multi-step processes)
├── Race conditions (TOCTOU, double-spend)
├── Price manipulation and quantity tampering
├── Feature abuse (using features in unintended ways)
└── Rate limit bypass
```

---

## SAST (Static Application Security Testing)

### How SAST Works

SAST analyzes source code, bytecode, or binary without executing the application. It identifies insecure patterns, dangerous function calls, and data flow paths from user input to sensitive operations.

**Key SAST tools:**
| Tool | Languages | Integration | Strength |
|------|-----------|-------------|----------|
| Semgrep | 30+ languages | CLI, CI/CD, IDE | Custom rule authoring, low false positives |
| SonarQube | 25+ languages | CI/CD, IDE | Broad language support, quality + security |
| CodeQL | 10+ languages | GitHub Actions native | Deep data flow analysis, open-source queries |
| Checkmarx | 25+ languages | Enterprise CI/CD | Enterprise compliance, low false positive tuning |
| Bandit | Python only | CLI, CI/CD | Python-specific, fast, lightweight |

**SAST in CI/CD pipeline:**
```yaml
# GitHub Actions SAST example
security-scan:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Run Semgrep
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/owasp-top-ten
          p/security-audit
          p/secrets
    - name: Run CodeQL
      uses: github/codeql-action/analyze@v3
      with:
        languages: javascript, python
```

### SAST Limitations

- **False positives**: SAST overreports because it cannot determine runtime context. A SQL concatenation that only uses sanitized input triggers the same alert as one using raw user input.
- **Cannot detect runtime issues**: SAST cannot find misconfigured servers, insecure deployment settings, or runtime-only vulnerabilities.
- **Business logic blind**: SAST detects patterns, not business logic violations. It cannot tell you that users can change prices by modifying a form field.

---

## DAST (Dynamic Application Security Testing)

### How DAST Works

DAST tests the running application from the outside, sending malicious inputs and analyzing responses. It requires no access to source code.

**Key DAST tools:**
| Tool | Type | Strength |
|------|------|----------|
| OWASP ZAP | Open source | Full-featured, active/passive scanning, scriptable |
| Burp Suite | Commercial | Gold standard for manual + automated testing |
| Nuclei | Open source | Template-based scanning, community templates |
| OWASP ZAP (API scan) | Open source | OpenAPI/Swagger-based API security scanning |

**DAST in CI/CD pipeline:**
```yaml
# OWASP ZAP in CI/CD
security-dast:
  runs-on: ubuntu-latest
  services:
    app:
      image: myapp:${{ github.sha }}
      ports:
        - 8080:8080
  steps:
    - name: ZAP API Scan
      uses: zaproxy/action-api-scan@v0.7.0
      with:
        target: http://app:8080/api/openapi.json
        fail_action: true
        rules_file_name: .zap/rules.tsv
```

---

## Software Composition Analysis (SCA)

SCA identifies known vulnerabilities in third-party dependencies. Given that modern applications are 70-90% third-party code, SCA is not optional.

**SCA tools and integration:**
| Tool | Ecosystem | CI/CD Integration |
|------|-----------|-------------------|
| Dependabot | GitHub native | Automatic PRs for vulnerable dependencies |
| Snyk | Multi-ecosystem | CLI, CI/CD, IDE, container scanning |
| npm audit | Node.js | Built into npm, CI/CD via `npm audit --audit-level=high` |
| OWASP Dependency-Check | Java, .NET | Maven/Gradle plugins, CLI |
| Trivy | Containers, IaC | CLI, CI/CD, comprehensive scanning |

**SCA policy example:**
```
BLOCK deployment if:
  - Any dependency has CVSS >= 9.0 (Critical)
  - Any dependency has CVSS >= 7.0 (High) older than 30 days without remediation plan

WARN on:
  - Dependencies with CVSS >= 4.0 (Medium)
  - Dependencies with no active maintenance (>12 months since last release)

ALLOW:
  - Vulnerabilities with documented compensating controls
  - Vulnerabilities in non-reachable code paths (verified by analysis)
```

---

## Penetration Testing

### Penetration Testing Methodology

Penetration testing is manual, adversarial security testing performed by skilled testers who simulate real-world attack scenarios. It discovers vulnerabilities that automated tools cannot find, particularly business logic flaws and complex attack chains.

**When penetration testing is required:**
- Before first production launch
- After significant architectural changes
- Annually for compliance (PCI-DSS, SOC 2)
- After a security incident (validate remediation)

**Penetration testing scope definition:**

| Element | Must Define |
|---------|-------------|
| Targets | Which systems, APIs, networks are in scope |
| Exclusions | Which systems must not be tested (production databases, third-party services) |
| Testing window | Dates and times testing may occur |
| Notification | Who to contact if critical vulnerability is found |
| Rules of engagement | Social engineering allowed? Physical access testing? DDoS? |
| Deliverables | Report format, severity classification, remediation timeline |

### Common Penetration Testing Findings

| Finding Category | Frequency | Typical Severity |
|-----------------|-----------|-----------------|
| IDOR (accessing other users' data) | Very common | High-Critical |
| Missing rate limiting | Very common | Medium |
| Verbose error messages | Common | Low-Medium |
| JWT implementation flaws | Common | High |
| Broken function-level authorization | Common | High-Critical |
| Race conditions in financial operations | Uncommon but severe | Critical |
| SSRF via user-controlled URLs | Increasingly common | High |

---

## Security Test Automation Strategy

### The Security Testing Pyramid

```
         /  Pentest  \          Annual, manual, expensive
        / Manual DAST \         Per-release, semi-automated
       /  Automated   \         Per-commit/PR, fully automated
      /  DAST + SCA    \
     / SAST + Secrets  \        Every commit, fast feedback
    /   Scanning        \
   /____________________\
```

**Layer 1 (Every commit):** SAST scanning, secret detection, dependency vulnerability scanning
**Layer 2 (Every PR):** Automated DAST against review environments, SCA policy enforcement
**Layer 3 (Per release):** Manual DAST with authenticated scanning, security-focused exploratory testing
**Layer 4 (Quarterly/Annual):** Full penetration testing by external specialists

---

## Failure Modes

1. **Security scanning without triage process**: Running SAST/DAST scans that produce hundreds of findings but no one reviews, prioritizes, or remediates them. Security scanning without a triage workflow is compliance theater.

2. **Testing only unauthenticated attack surface**: Running DAST scans without authentication. The majority of application functionality requires login -- unauthenticated scanning covers less than 20% of the attack surface.

3. **Ignoring authorization testing**: Automated tools excel at injection and XSS detection but consistently miss authorization flaws. IDOR, privilege escalation, and function-level access control require manual or purpose-built testing.

4. **Treating CVE scores as absolute risk**: A CVSS 9.8 vulnerability in a library function that is never called in your application has zero actual risk. Contextual risk assessment (reachability analysis) must supplement CVE scoring.

5. **No security regression testing**: Fixing a vulnerability without adding a test that prevents its reintroduction. Security fixes must include regression tests in the automated suite.

6. **Excluding development/staging environments**: Testing only production while development environments have debug endpoints, default credentials, and verbose logging exposed. Attackers target the weakest environment that has access to production data or infrastructure.

---

## The Operator's Framework

**Step 1: Threat Model the Application**
- Identify assets (user data, financial data, authentication tokens)
- Identify threat actors (external attackers, malicious insiders, compromised dependencies)
- Map trust boundaries (frontend/backend, service-to-service, database access)
- Prioritize testing effort by risk (high-value assets with highest exposure first)

**Step 2: Establish Automated Security Baseline**
- Integrate SAST into CI/CD (run on every commit, block on critical findings)
- Integrate SCA into CI/CD (block on high/critical CVEs, alert on medium)
- Integrate secret scanning (block commits containing API keys, passwords, certificates)
- Configure DAST for automated scanning of staging environment on each deployment

**Step 3: Plan Manual Security Testing**
- Schedule penetration testing cadence (annually minimum, quarterly for high-risk applications)
- Define scope, rules of engagement, and reporting requirements
- Ensure testing covers authenticated flows and business logic
- Include authorization boundary testing (IDOR, privilege escalation)

**Step 4: Establish Vulnerability Management**
- Define severity SLAs (Critical: 24 hours, High: 7 days, Medium: 30 days, Low: 90 days)
- Implement triage process for automated scan findings
- Track remediation to completion
- Add regression tests for every fixed vulnerability

**Step 5: Continuous Improvement**
- Review penetration testing findings for patterns (systemic issues)
- Update SAST rules to catch previously missed vulnerability classes
- Train development teams on secure coding practices for recurring findings
- Maintain a security testing playbook specific to the application's technology stack

---

## Summary

**Key Principles:**

1. Security testing requires an adversarial mindset fundamentally different from functional testing -- the question is not "does it work?" but "can it be made to work in unintended ways?"
2. No single security testing approach provides adequate coverage -- SAST, DAST, SCA, and penetration testing each discover vulnerability classes the others miss.
3. Automated security scanning without a triage and remediation process is compliance theater that produces reports but not security.
4. Authorization testing (IDOR, privilege escalation, function-level access control) is the most commonly missed category because automated tools cannot effectively test business logic boundaries.
5. Every security vulnerability fix must include a regression test -- without it, the same vulnerability will be reintroduced within months.

---

## Cross-References

- `05_specialized/accessibility_testing.md` -- WCAG compliance testing (often co-required for compliance)
- `06_ci_cd/ci_cd_testing.md` -- Security gates in CI/CD pipelines
- `06_ci_cd/test_infrastructure.md` -- Secure test environments
- `07_management/test_strategy.md` -- Risk-based testing prioritization
- `08_advanced/contract_testing.md` -- API schema validation and security contracts
