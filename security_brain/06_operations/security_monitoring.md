# Security Monitoring — Detection Engineering, SIEM Rules, and Purple Teaming

## Overview

Security monitoring transforms raw telemetry into actionable intelligence about adversary activity. Without monitoring, security controls are unverified assumptions — you believe you are secure but have no evidence. This module codifies detection engineering as a discipline, SIEM rule writing methodology, alert tuning to combat analyst fatigue, User and Entity Behavior Analytics (UEBA), deception technology (honeypots), and purple teaming for detection validation.

The core principle: detection is an engineering discipline, not an operational afterthought. Detection rules are code. They must be version-controlled, tested, peer-reviewed, and maintained with the same rigor as production software.

---

## Detection Engineering

### Detection-as-Code

Detection rules are software artifacts and must follow software engineering practices:

**Version Control:** All detection rules stored in Git. Changes require pull requests with peer review.

**Testing:** Each rule has associated test cases — both true positive (should fire) and false positive (should not fire) scenarios. Automated testing via detection rule testing frameworks (e.g., Sigma + pySigma test suite).

**CI/CD:** Detection rule changes deployed through a pipeline that validates syntax, runs test cases, and deploys to SIEM staging before production.

**Documentation:** Each rule includes: purpose, MITRE ATT&CK mapping, data source requirements, expected false positive rate, recommended response actions, author, and review date.

### Detection Rule Lifecycle

```
Threat Intel → Detection Hypothesis → Rule Development → Testing → Deployment → Tuning → Retirement
   ATT&CK        "If adversary does    Sigma/KQL/SPL     Lab      SIEM prod    FP rate    Obsolete
   Incident        X, we should see      query logic     testing   alert        tuning     or replaced
   Research        Y in our logs"                        Validation monitoring   threshold
```

### Detection Coverage Model

Map detection rules to MITRE ATT&CK to identify coverage gaps:

| Coverage Level | Definition | Implication |
|---------------|------------|-------------|
| None | No detection rule exists for this technique | Blind spot — adversary can use this technique undetected |
| Basic | Single detection rule, limited data sources | May detect unsophisticated attempts; evasion possible |
| Moderate | Multiple detection rules, multiple data sources | Reasonable detection probability; some evasion paths |
| Advanced | Behavioral detection, ML-augmented, multi-source correlation | High detection probability; evasion requires significant effort |

Target: At minimum, basic coverage for all ATT&CK techniques relevant to your threat profile. Advanced coverage for techniques used by threat actors that target your industry.

---

## SIEM Rule Writing

### Sigma — Vendor-Agnostic Detection Format

Sigma is the de facto standard for vendor-agnostic detection rule specification. Sigma rules are written in YAML and can be converted to any SIEM query language:

```yaml
title: Suspicious PowerShell Download Cradle
id: 6e897633-1195-4488-b150-2671c9e6dcab
status: production
description: Detects PowerShell commands commonly used to download and execute remote code
references:
    - https://attack.mitre.org/techniques/T1059/001/
author: Security Brain
date: 2024/01/15
modified: 2024/06/01
tags:
    - attack.execution
    - attack.t1059.001
    - attack.t1105
logsource:
    category: process_creation
    product: windows
detection:
    selection_process:
        Image|endswith: '\powershell.exe'
    selection_commands:
        CommandLine|contains:
            - 'IEX'
            - 'Invoke-Expression'
            - 'DownloadString'
            - 'DownloadFile'
            - 'Net.WebClient'
            - 'Start-BitsTransfer'
    condition: selection_process and selection_commands
falsepositives:
    - Legitimate admin scripts using PowerShell web requests
    - Software installation scripts
level: high
```

### Sigma to SIEM Conversion

| Target SIEM | Conversion Tool |
|------------|----------------|
| Splunk SPL | `sigma-cli convert -t splunk` |
| Microsoft Sentinel KQL | `sigma-cli convert -t microsoft365defender` |
| Elastic EQL/KQL | `sigma-cli convert -t elasticsearch` |
| Google Chronicle YARA-L | `sigma-cli convert -t chronicle` |
| QRadar AQL | `sigma-cli convert -t qradar` |

### Rule Writing Best Practices

**Specificity vs Sensitivity:**
- High sensitivity (broad rules) catches more threats but generates more false positives
- High specificity (narrow rules) generates fewer alerts but may miss variations
- Start specific, broaden only after confirmed gaps
- Never deploy a rule that fires more than 10 times per day without tuning — it will be ignored

**Data Source Requirements:**
Before writing a rule, verify the required data source is collected and normalized:
- Process creation logs (Sysmon Event ID 1, or EDR telemetry)
- Network connection logs (firewall, proxy, DNS, VPC flow logs)
- Authentication logs (Active Directory, IdP, cloud provider)
- File system events (Sysmon Event ID 11, EDR file telemetry)
- Registry modifications (Sysmon Event ID 13, Windows event logs)

**Common Detection Patterns:**

| Pattern | Description | Example |
|---------|-------------|---------|
| Known-bad indicator | Match against IOC list | Alert on connection to known C2 domain |
| Suspicious behavior | Activity that is unusual for the context | PowerShell downloading from internet |
| Threshold | Activity exceeding normal volume | >50 failed login attempts in 5 minutes |
| Sequence | Ordered series of events | Account creation followed by privilege escalation |
| Absence | Expected event that did not occur | No heartbeat from EDR agent for 24 hours |
| Baseline deviation | Activity different from historical norm | User accessing system never accessed before |

---

## Alert Tuning

### The Alert Fatigue Problem

Alert fatigue is the number one operational challenge in security monitoring. When analysts receive thousands of alerts daily, they begin ignoring them — including the real threats buried in the noise. Studies show that SOC teams investigate only 56% of alerts they receive (Ponemon).

### Tuning Methodology

**Step 1: Measure baseline alert volume and false positive rate**
- Track total alerts per day/week
- Classify each alert: True Positive (TP), False Positive (FP), Benign True Positive (BTP)
- Calculate FP rate per rule: FP / (TP + FP + BTP)

**Step 2: Prioritize tuning by impact**
- Rules with highest total alert volume first
- Rules with highest FP rate second
- Rules that analysts consistently close as false positive

**Step 3: Tuning actions**
| Action | When to Use |
|--------|------------|
| Add exclusion | Known benign activity consistently triggering rule |
| Narrow scope | Rule is too broad — add conditions to increase specificity |
| Adjust threshold | Volume-based rule threshold is too low |
| Add context enrichment | Rule fires correctly but needs context to reduce investigation time |
| Split rule | Single rule covers multiple scenarios — split for better targeting |
| Retire rule | Rule generates noise with no actionable findings — replace with better detection |

**Step 4: Track tuning effectiveness**
- Alert volume should decrease over time while detection effectiveness increases
- FP rate target: <30% across all rules, <10% for critical rules
- Mean Time to Investigate should decrease as alert quality improves

### Automation and SOAR

Security Orchestration, Automation, and Response (SOAR) platforms automate repetitive investigation and response tasks:

| Automation | Trigger | Actions |
|-----------|---------|---------|
| IOC enrichment | Any alert | Query VirusTotal, Shodan, WHOIS, threat intel |
| User context | Identity alert | Retrieve user profile, recent activity, manager, department |
| Phishing triage | Email alert | Detonate attachment in sandbox, check URLs, query reputation |
| Endpoint isolation | High-severity EDR alert | Auto-isolate endpoint, notify analyst |
| Account lockout | Brute force detection | Disable account, notify user, create ticket |

SOAR Platforms: Palo Alto XSOAR, Splunk SOAR, IBM Resilient, Tines, Shuffle (open source).

---

## User and Entity Behavior Analytics (UEBA)

### UEBA Principles

UEBA establishes behavioral baselines for users and entities (devices, applications, services) and detects deviations that may indicate compromise, insider threat, or policy violation.

**Baseline dimensions:**
- Login times and locations (normal working hours, known locations)
- Systems and applications accessed (role-based normal access patterns)
- Data volume transferred (normal vs. anomalous)
- Network connections (normal destinations vs. unusual)
- Privilege usage (normal admin actions vs. anomalous)
- Peer group comparison (user behavior vs. peers in same role)

**UEBA Detection Examples:**
| Anomaly | Possible Threat | Response |
|---------|----------------|----------|
| Login from new country | Credential compromise | Verify with user, force MFA |
| Access to unfamiliar systems | Lateral movement | Investigate access justification |
| Large data download | Data exfiltration | Block transfer, investigate |
| Off-hours privileged access | Insider threat or compromise | Verify authorization |
| Service account interactive login | Credential theft | Immediate investigation |

### UEBA Platforms

- Microsoft Sentinel (built-in UEBA with Azure AD signals)
- Splunk UBA (behavioral analytics add-on)
- Exabeam (dedicated UEBA platform)
- Securonix (cloud-native UEBA)
- Elastic ML (anomaly detection jobs on security data)

---

## Deception Technology — Honeypots and Honeytokens

### Honeypot Types

| Type | Purpose | Examples |
|------|---------|---------|
| High-interaction | Full system emulation, capture complete attack | Full OS honeypot, real services |
| Low-interaction | Emulate specific services, detect scanning | Cowrie (SSH), Dionaea (SMB) |
| Honeytoken | Fake credential or data that triggers alert when used | AWS access key, database credential, document |
| Honeynet | Network of honeypots simulating a real environment | Full subnet with multiple services |

### Honeytoken Deployment Strategy

Deploy honeytokens at key points to detect specific attack phases:
- **Fake AWS credentials** in code repositories — detect credential scanning
- **Canary documents** in file shares — detect data access/exfiltration
- **Fake admin accounts** in Active Directory — detect privilege enumeration
- **DNS canary tokens** embedded in documents — detect document access outside the network
- **Fake database records** — detect unauthorized database queries

### Advantages of Deception

- Zero false positives — any interaction with a honeypot is unauthorized by definition
- Detects attacks that evade signature-based and behavioral detection
- Provides early warning of lateral movement and credential compromise
- Wastes adversary time and resources (increases attacker cost)
- Provides high-fidelity intelligence about adversary TTPs

---

## Purple Teaming

### Purple Team Methodology

Purple teaming is the collaborative exercise between red team (offense) and blue team (defense) to validate and improve detection capabilities:

**Process:**
1. **Select ATT&CK techniques** to test (based on threat profile and detection gaps)
2. **Red team executes** the technique in a controlled environment
3. **Blue team monitors** for detection in real-time
4. **Joint analysis** — Did the detection fire? If not, why? What data is missing?
5. **Detection improvement** — Write or tune rules to detect the technique
6. **Re-test** — Red team executes again to validate the new detection
7. **Document** — Record the technique, detection rule, data requirements, and coverage level

### Purple Team Frameworks

- **Atomic Red Team** (Red Canary) — Library of small, focused tests mapped to ATT&CK techniques
- **MITRE Caldera** — Automated adversary emulation platform
- **Infection Monkey** — Open source breach and attack simulation
- **AttackIQ** — Commercial breach and attack simulation

---

## Cross-References

- `06_operations/incident_response.md` — Responding to detected incidents
- `06_operations/vulnerability_management.md` — Vulnerability-based detection
- `04_infrastructure/endpoint_security.md` — EDR and SIEM integration
- `03_threat_modeling/threat_landscape.md` — Threat intelligence for detection
- `Patterns/incident_response_pattern.md` — Detection-to-response workflow
