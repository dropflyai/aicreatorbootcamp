# Security Testing — SAST, DAST, SCA, Pentesting, and API Security

## Overview

Security testing validates that the security controls designed and implemented actually work. It is the empirical verification that transforms security assumptions into security evidence. This module codifies the major security testing methodologies — Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), Software Composition Analysis (SCA), Interactive Application Security Testing (IAST), penetration testing, API security testing, and security code review — with their strengths, limitations, and integration into the development lifecycle.

The fundamental principle: untested security is assumed security, and assumed security is no security. Every security claim must have corresponding test evidence.

---

## Static Application Security Testing (SAST)

### How SAST Works

SAST analyzes source code, bytecode, or binary code without executing the application. It builds an abstract syntax tree (AST) and data flow graph, then traces tainted data (user input) from sources (entry points) to sinks (dangerous functions) looking for vulnerable patterns.

### SAST Strengths and Limitations

| Strengths | Limitations |
|-----------|------------|
| Finds vulnerabilities early (shift-left) | High false positive rate (15-40%) |
| Full code coverage (analyzes all paths) | Cannot detect runtime/configuration issues |
| Language-specific, deep analysis | Slow on large codebases |
| Integrates into IDE and CI/CD | Cannot detect authentication/authorization logic flaws |
| Provides exact code location for fix | Limited understanding of business logic |

### SAST Tools

| Tool | Languages | Type | Strengths |
|------|-----------|------|-----------|
| Semgrep | 30+ languages | Open Source | Fast, customizable rules, low FP rate |
| SonarQube | 30+ languages | Open Core | Code quality + security, broad language support |
| CodeQL (GitHub) | Major languages | Free for OSS | Semantic analysis, query-based, deep analysis |
| Checkmarx | 25+ languages | Commercial | Enterprise-grade, compliance mapping |
| Snyk Code | Major languages | Commercial | Developer-friendly, AI-assisted, IDE integration |
| Bandit | Python | Open Source | Python-specific, fast, well-maintained |
| Brakeman | Ruby on Rails | Open Source | Rails-specific, high accuracy |

### SAST Integration Pattern

```
Developer writes code → IDE plugin flags issues in real-time →
Pre-commit hook runs focused SAST scan →
Pull request triggers full SAST scan → Results posted as PR comments →
Build pipeline includes SAST as quality gate → Block merge on critical/high findings →
Security team reviews new findings weekly
```

### SAST Rule Configuration

**Critical rules (block merge):**
- SQL injection (any tainted data reaching SQL query)
- Command injection (user input in system calls)
- Hardcoded secrets (API keys, passwords, tokens in source code)
- Path traversal (user input in file system operations)
- Deserialization of untrusted data

**High rules (require review):**
- XSS (tainted data in HTML output without encoding)
- SSRF (user-controlled URLs in server-side requests)
- Weak cryptography (MD5, SHA1 for security purposes, ECB mode)
- Insecure random number generation (Math.random() for security tokens)

---

## Dynamic Application Security Testing (DAST)

### How DAST Works

DAST tests the running application from the outside, like an attacker would. It sends crafted HTTP requests to the application and analyzes responses for vulnerability indicators (error messages, timing differences, reflected input, unexpected status codes).

### DAST Tools

| Tool | Type | Strengths |
|------|------|-----------|
| OWASP ZAP | Open Source | Free, extensive, automation-friendly, active community |
| Burp Suite Pro | Commercial | Industry standard for manual testing, extensive extensions |
| Nuclei | Open Source | Template-based scanning, fast, community templates |
| Invicti (Netsparker) | Commercial | Proof-based scanning (reduces false positives) |
| Acunetix | Commercial | Web and API scanning, AcuSensor for accuracy |
| StackHawk | Commercial | Developer-friendly DAST, CI/CD native, API-first |

### DAST Integration

```yaml
# CI/CD DAST scan example (GitHub Actions with OWASP ZAP)
security-dast:
  runs-on: ubuntu-latest
  steps:
    - name: Deploy to staging
      run: deploy-to-staging.sh
    - name: OWASP ZAP Baseline Scan
      uses: zaproxy/action-baseline@v0.9.0
      with:
        target: 'https://staging.example.com'
        rules_file_name: 'zap-rules.tsv'
        fail_action: 'warn'  # 'fail' for strict enforcement
    - name: OWASP ZAP Full Scan
      uses: zaproxy/action-full-scan@v0.9.0
      with:
        target: 'https://staging.example.com'
        rules_file_name: 'zap-rules.tsv'
```

### DAST Strengths and Limitations

| Strengths | Limitations |
|-----------|------------|
| Tests real running application | Slower than SAST (requires deployed app) |
| Finds runtime/config issues | Cannot identify exact code location |
| Technology-agnostic (tests any web app) | Coverage limited to reachable endpoints |
| Low false positive rate | Requires authentication configuration for full coverage |
| Tests real integrations | Cannot test code paths not triggered by tests |

---

## Software Composition Analysis (SCA)

### SCA Integration

SCA is covered comprehensively in `05_compliance/supply_chain_security.md`. Key testing integration points:

**Pre-commit:** `npm audit`, `pip audit`, `cargo audit` — fast check for known vulnerabilities in dependencies

**Pull request:** Full SCA scan (Snyk, Dependabot) — block merge if new critical/high vulnerability introduced

**Build pipeline:** SBOM generation + vulnerability scan — fail build on policy violations

**Container registry:** Image scanning (Trivy, Snyk Container) — prevent deployment of vulnerable images

**Production monitoring:** Continuous CVE monitoring against deployed SBOM — alert on newly disclosed vulnerabilities

---

## Interactive Application Security Testing (IAST)

### How IAST Works

IAST instruments the application runtime (via agent) and observes actual data flow during execution. When existing functional tests exercise the application, IAST detects vulnerabilities by monitoring tainted data from source to sink in real-time.

### IAST Advantages

- Combines SAST accuracy (code-level) with DAST realism (runtime)
- Very low false positive rate (observes actual execution)
- Provides exact code location and data flow path
- Works during functional testing (no additional test effort)
- Detects vulnerabilities that require runtime context (configuration, environment)

### IAST Limitations

- Requires agent deployment (may affect performance)
- Coverage limited to code exercised by functional tests
- Language-specific agents (not all languages supported equally)
- May require application restart for agent deployment

### IAST Tools

- Contrast Security (leader in IAST, broadest language support)
- Checkmarx IAST (integrated with Checkmarx SAST)
- Synopsys Seeker (deep analysis, compliance mapping)

---

## Penetration Testing

### Penetration Testing Methodology

**Phase 1: Planning and Scoping**
- Define scope: Which systems, networks, applications are in scope?
- Define rules of engagement: Testing window, prohibited actions, emergency contacts
- Determine test type: Black box (no info), grey box (partial info), white box (full access)
- Legal authorization: Written authorization from system owner (mandatory)

**Phase 2: Reconnaissance**
- Passive: DNS enumeration, OSINT, certificate transparency, subdomain discovery
- Active: Port scanning (Nmap), service fingerprinting, web crawling, API enumeration
- Output: Attack surface map with all discovered endpoints, services, and technologies

**Phase 3: Vulnerability Analysis**
- Automated scanning (Nessus, Burp Suite, Nuclei)
- Manual analysis of application logic, authentication, authorization
- Technology-specific checks (WordPress, custom frameworks, APIs)
- Configuration review (security headers, TLS, CORS, cookies)

**Phase 4: Exploitation**
- Attempt to exploit identified vulnerabilities
- Demonstrate impact (data access, privilege escalation, lateral movement)
- Chain vulnerabilities for maximum impact demonstration
- Document each exploitation step with evidence (screenshots, request/response)

**Phase 5: Post-Exploitation**
- If initial exploitation succeeds, assess further impact:
  - Can we access other systems (lateral movement)?
  - Can we escalate privileges?
  - Can we access sensitive data?
  - Can we establish persistence?
- Map the full blast radius of the initial vulnerability

**Phase 6: Reporting**
- Executive summary (business impact, risk level, key findings)
- Technical findings (vulnerability details, evidence, reproduction steps)
- Remediation recommendations (specific, actionable, prioritized)
- Retest plan (schedule validation of remediation)

### Penetration Testing Types and Frequency

| Type | Scope | Frequency |
|------|-------|-----------|
| Web application pentest | Single application deep dive | Annually + major releases |
| Network pentest | Internal/external network | Annually |
| API pentest | API endpoints and logic | Annually + major API changes |
| Mobile application pentest | iOS/Android apps | Annually + major releases |
| Cloud configuration review | AWS/GCP/Azure configuration | Annually |
| Red team exercise | Full-scope adversary simulation | Semi-annually for mature orgs |
| Social engineering | Phishing, vishing, physical | Annually |

---

## API Security — OWASP API Top 10

### API1:2023 — Broken Object Level Authorization (BOLA)

Most common API vulnerability. APIs expose object IDs in endpoints; authorization is not checked at the object level.

**Test methodology:**
1. Authenticate as User A
2. Request User A's resource: `GET /api/users/123/orders` (success)
3. Request User B's resource: `GET /api/users/456/orders` (should fail, often succeeds)
4. Fuzz object IDs: sequential, predictable patterns, UUID enumeration

### API2:2023 — Broken Authentication

Test for: Missing authentication on endpoints, weak token generation, token leakage in URLs/logs, missing token expiration, insecure password reset flows.

### API3:2023 — Broken Object Property Level Authorization

APIs return excessive data in responses or accept writable fields that should be read-only.

**Test:** Compare API response with what the user should be authorized to see. Check if read-only fields can be modified via PUT/PATCH.

### API4:2023 — Unrestricted Resource Consumption

APIs without rate limiting allow: brute force attacks, resource exhaustion, denial of service, excessive data retrieval.

**Test:** Send rapid requests, oversized payloads, deeply nested JSON, extremely large query parameters.

### API5:2023 — Broken Function Level Authorization

Administrative functions accessible to regular users. Test by calling admin endpoints with non-admin tokens.

### API Security Testing Tools

| Tool | Purpose |
|------|---------|
| Postman | Manual API testing, collection-based test suites |
| Burp Suite + API testing extensions | Comprehensive API security testing |
| OWASP ZAP | Automated API scanning with OpenAPI import |
| Dredd | API contract testing against OpenAPI specification |
| Schemathesis | Property-based API testing from OpenAPI specs |
| 42Crunch | API security audit, conformance scanning |

---

## Security Code Review

### Code Review Checklist

| Category | Review Items |
|----------|-------------|
| Authentication | Password hashing algorithm, session management, MFA implementation |
| Authorization | Access control checks on every endpoint, IDOR prevention |
| Input validation | All user input validated, type checking, allowlisting |
| Output encoding | Context-appropriate encoding (HTML, URL, JavaScript, SQL) |
| Cryptography | Algorithm selection, key management, random number generation |
| Error handling | No sensitive data in errors, fail-secure behavior |
| Logging | Security events logged, no sensitive data in logs |
| Dependencies | Known vulnerabilities, minimal dependency footprint |
| Configuration | No hardcoded secrets, secure defaults, environment separation |

---

## Cross-References

- `07_secure_sdlc/secure_development.md` — OWASP Top 10 with code examples
- `07_secure_sdlc/devsecops.md` — Testing integration in CI/CD
- `05_compliance/supply_chain_security.md` — SCA deep dive
- `06_operations/vulnerability_management.md` — Vulnerability lifecycle from testing
- `03_threat_modeling/threat_modeling_methods.md` — Testing informed by threat models
