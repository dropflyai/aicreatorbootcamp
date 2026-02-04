# Incident Response — NIST IR Lifecycle, Runbooks, and Forensic Preservation

## Overview

Incident response is the operational test of every security investment. When prevention fails — and it will — the speed, coordination, and effectiveness of your response determines whether an incident becomes a contained event or an existential crisis. This module codifies the NIST Computer Security Incident Handling Guide (SP 800-61 Rev. 2) lifecycle, practical IR plan construction, operational runbooks, digital forensic preservation, and regulatory notification requirements.

The axiom of incident response: you do not rise to the occasion; you fall to the level of your preparation. Organizations without rehearsed IR plans experience 2.5x longer breach containment times (Ponemon Institute).

---

## NIST Incident Response Lifecycle

### Phase 1: Preparation

Preparation is the most important phase. It determines the ceiling of your response capability.

**IR Team Structure:**

| Role | Responsibility |
|------|---------------|
| IR Manager / Commander | Overall incident coordination, escalation decisions, executive communication |
| Lead Investigator | Technical investigation, evidence analysis, root cause determination |
| Forensic Analyst | Evidence preservation, disk/memory/network forensics, chain of custody |
| Communications Lead | Internal/external communications, regulatory notifications, media |
| Legal Counsel | Regulatory obligations, evidence preservation orders, liability |
| Engineering Lead | System access, log retrieval, containment actions, recovery |
| Executive Sponsor | Resource authorization, business decisions, risk acceptance |

**Preparation Checklist:**
- Documented IR plan reviewed and approved quarterly
- IR team members identified with 24/7 contact information
- Communication channels established (out-of-band — do not use potentially compromised systems)
- Forensic toolkit maintained and tested (write blockers, imaging tools, evidence bags)
- Relationships established with external resources (forensic firms, legal counsel, law enforcement, cyber insurance carrier)
- Tabletop exercises conducted quarterly; full simulation annually
- Log retention configured (minimum 90 days hot, 1 year cold for security logs)
- Evidence storage secured (encrypted, access-controlled, chain-of-custody forms ready)
- Playbooks written for top 10 incident scenarios (see Runbooks section below)

### Phase 2: Detection and Analysis

**Detection Sources:**

| Source | Detection Capability | Response Time |
|--------|---------------------|---------------|
| SIEM alerts | Correlated events across multiple sources | Minutes |
| EDR alerts | Endpoint-level malicious behavior | Seconds to minutes |
| IDS/IPS | Network-level attack signatures and anomalies | Seconds |
| User reports | Phishing, suspicious behavior, account compromise | Hours |
| Threat intelligence | Indicators matching known campaigns | Hours to days |
| Vulnerability scans | Exploitable vulnerabilities discovered | Hours |
| External notification | Customer, researcher, law enforcement, media | Days to weeks |

**Incident Classification:**

| Severity | Definition | Response Time | Escalation |
|----------|-----------|---------------|------------|
| Critical (SEV-1) | Active breach, data exfiltration, ransomware, production down | Immediate (15 min) | Executive, legal, board |
| High (SEV-2) | Confirmed compromise, no data loss yet, contained | 1 hour | CISO, engineering lead |
| Medium (SEV-3) | Suspicious activity, potential compromise, investigation needed | 4 hours | IR team lead |
| Low (SEV-4) | Policy violation, minor security event, informational | 24 hours | IR analyst |

**Analysis Methodology:**

1. **Confirm the incident** — Distinguish true positive from false positive. Verify with multiple data sources.
2. **Scope the incident** — Determine affected systems, data, users, and timeframe.
3. **Identify the attack vector** — How did the adversary gain access? What vulnerability or weakness was exploited?
4. **Assess the impact** — What data was accessed, modified, or exfiltrated? What systems are compromised?
5. **Attribute (if possible)** — Identify threat actor based on TTPs, infrastructure, and threat intelligence.
6. **Document everything** — Timestamped incident log from the first detection signal.

### Phase 3: Containment

**Short-term containment (immediate — stop the bleeding):**
- Network isolation of compromised systems (EDR isolation, VLAN change, security group modification)
- Disable compromised accounts (reset credentials, revoke sessions, revoke tokens)
- Block known malicious IPs/domains at firewall/WAF/DNS
- Preserve system state before changes (forensic image first, then contain)

**Long-term containment (stabilize while preparing eradication):**
- Build clean systems to replace compromised ones (do not patch compromised systems — replace them)
- Implement additional monitoring on potentially affected systems
- Restrict access to sensitive systems to essential personnel only
- Engage additional forensic resources if scope exceeds team capacity

**Critical rule: PRESERVE BEFORE CONTAIN.** Do not reboot, reinstall, or wipe a compromised system before forensic imaging. Evidence destruction is irreversible.

### Phase 4: Eradication

- Remove malware, backdoors, persistence mechanisms from all affected systems
- Patch the vulnerability that enabled initial access
- Reset all potentially compromised credentials (not just confirmed — all possible)
- Verify eradication with fresh scans (do not trust the compromised system to report its own status)
- Review for additional backdoors — sophisticated adversaries plant multiple persistence mechanisms
- Update detection rules based on discovered TTPs (prevent re-entry via same path)

### Phase 5: Recovery

- Restore systems from known-good backups or rebuild from infrastructure as code
- Monitor restored systems intensively for signs of re-compromise (adversary may have additional access)
- Gradually restore services with enhanced monitoring
- Validate data integrity (compare against known-good state)
- Confirm business operations are functioning normally
- Maintain elevated monitoring for 30-90 days post-recovery

### Phase 6: Lessons Learned

**Post-incident review (mandatory within 5 business days):**
- What happened? (Complete timeline from initial access through recovery)
- How was it detected? (And why was it not detected sooner?)
- What worked well in the response?
- What did not work or could be improved?
- What specific actions will prevent recurrence?
- What detection improvements will catch similar attacks faster?

**Actionable outputs:**
- Updated IR playbooks based on lessons learned
- New or modified detection rules
- Architecture changes to prevent recurrence
- Training updates based on identified gaps
- Updated risk assessment reflecting actual incident data

---

## Incident Response Runbooks

### Runbook: Ransomware

1. **Detect:** EDR alert on file encryption behavior, user report of locked files, ransom note discovered
2. **Isolate immediately:** Network-isolate affected systems. Do not shut down (memory evidence is lost)
3. **Assess scope:** Identify all encrypted systems, determine ransomware variant, check for data exfiltration
4. **Forensic preservation:** Image affected systems before any remediation
5. **Determine recoverability:** Are backups intact and unencrypted? When was last known-good backup?
6. **Do not pay ransom** unless authorized by executive leadership and legal counsel with documented justification
7. **Eradicate:** Identify initial access vector, remove all persistence, patch vulnerability
8. **Recover:** Restore from backups, rebuild systems, validate data integrity
9. **Notify:** Regulatory notifications per data type and jurisdiction (see notification requirements)
10. **Report:** Law enforcement notification (FBI IC3 in US), cyber insurance notification

### Runbook: Phishing / Business Email Compromise

1. **Detect:** User report, email gateway alert, impossible travel on account
2. **Disable account:** Immediately disable compromised account, revoke all sessions and tokens
3. **Assess impact:** Review sent emails, file access, email rules created (forwarding rules are common persistence)
4. **Credential reset:** Reset password, invalidate all sessions, re-enroll MFA
5. **Search for lateral movement:** Check if compromised account was used to access other systems
6. **Remove malicious email rules:** Check for auto-forwarding, auto-delete, inbox rules hiding attacker activity
7. **Notify affected parties:** If BEC resulted in fraudulent communication to customers/partners, notify immediately
8. **Block indicators:** Block sender address, domain, IP in email gateway
9. **Awareness communication:** Inform organization of the phishing campaign (without shaming the victim)

### Runbook: Data Breach / Exfiltration

1. **Detect:** DLP alert, unusual data transfer volume, threat intelligence, external notification
2. **Contain:** Block exfiltration channel, isolate source system, preserve network captures
3. **Assess data scope:** What data types were affected? How many records? Which data subjects?
4. **Classify data:** PII, PHI, PCI, confidential business data — classification determines notification obligations
5. **Forensic analysis:** Determine access method, full timeline, all accessed data (not just exfiltrated)
6. **Legal notification:** Engage legal counsel for regulatory notification obligations
7. **Regulatory notification:** GDPR (72 hours to DPA), HIPAA (60 days to HHS), state laws (variable)
8. **Individual notification:** Notify affected data subjects per applicable law
9. **Remediation:** Close access vector, implement additional controls, monitor for data misuse

---

## Forensic Preservation

### Order of Volatility

Collect evidence in order of most volatile to least volatile:
1. **CPU registers and cache** — Lost immediately upon any system change
2. **Memory (RAM)** — Lost on reboot. Capture with: `volatility`, `winpmem`, `LiME`
3. **Network state** — Active connections, routing tables. Capture with: `netstat`, network taps
4. **Running processes** — Process list, command lines, open files. Capture with: `ps`, process dumps
5. **Disk** — Files, logs, artifacts. Capture with: `dd`, `FTK Imager`, `AXIOM`
6. **Backup media** — Archive tapes, cloud snapshots. Already preserved but verify integrity
7. **Network logs** — SIEM, firewall logs, proxy logs. Already centralized if logging is configured properly

### Chain of Custody

Every piece of evidence must have documented chain of custody:
- Who collected it (name, role, contact)
- When it was collected (timestamp, timezone)
- How it was collected (tool, method, parameters)
- Where it is stored (physical location, access controls)
- Who has accessed it (log of all access)
- Integrity verification (hash at collection, hash at each access)

**Evidence integrity:** Compute SHA-256 hash of forensic images immediately upon acquisition. Verify hash before any analysis. Store hash separately from evidence. Any hash mismatch invalidates the evidence.

---

## Notification Requirements

### Regulatory Notification Timelines

| Regulation | Notification To | Timeline | Threshold |
|-----------|----------------|----------|-----------|
| GDPR | Supervisory Authority | 72 hours | Personal data breach unless unlikely risk |
| GDPR | Data Subjects | "Without undue delay" | High risk to rights and freedoms |
| HIPAA | HHS | 60 days | Breach of unsecured PHI |
| HIPAA | Individuals | 60 days | Breach of unsecured PHI |
| HIPAA | Media | 60 days | Breach affecting >500 individuals |
| PCI DSS | Card brands / acquirer | Immediately | Compromise of cardholder data |
| US State Laws | Varies by state | 30-60 days (varies) | PII of state residents |
| SEC | SEC filing (8-K) | 4 business days | Material cybersecurity incident |

### Notification Best Practices

- Engage legal counsel before any external notification
- Do not over-promise (avoid "your data is safe" when investigation is ongoing)
- Provide actionable guidance to affected individuals (credit monitoring, password resets)
- Coordinate timing across regulators, individuals, and media
- Document all notification activities for compliance evidence
- Preserve notification templates in advance (do not draft under pressure)

---

## IR Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Mean Time to Detect (MTTD) | Time from compromise to detection | <24 hours |
| Mean Time to Respond (MTTR) | Time from detection to containment | <4 hours |
| Mean Time to Recover (MTTRec) | Time from containment to full recovery | <72 hours |
| Incidents per quarter | Volume trend | Decreasing or stable |
| Tabletop exercises per year | Practice frequency | Minimum 4 |
| Post-incident reviews completed | Lessons learned discipline | 100% |

---

## Cross-References

- `06_operations/security_monitoring.md` — Detection engineering feeding IR
- `06_operations/vulnerability_management.md` — Vulnerability exploitation triggering IR
- `05_compliance/compliance_frameworks.md` — Notification requirements by framework
- `04_infrastructure/endpoint_security.md` — EDR capabilities for IR
- `Templates/incident_postmortem_template.md` — Post-incident review template
