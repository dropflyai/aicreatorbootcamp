# Endpoint Security — EDR, Hardening, and SOC Operations

## Overview

Endpoints are the primary attack surface in modern organizations. Every laptop, server, mobile device, and IoT device is a potential entry point for adversaries. The Verizon DBIR consistently shows that endpoints are involved in over 70% of breaches — whether through phishing leading to malware execution, exploitation of unpatched vulnerabilities, or credential theft from compromised devices. This module codifies endpoint security from EDR through hardening, patch management, vulnerability scanning, and the SOC operations that tie it all together.

The fundamental truth: you cannot secure what you cannot see, and you cannot respond to what you cannot detect. Endpoint visibility is the foundation of security operations.

---

## Endpoint Detection and Response (EDR)

### EDR Architecture

EDR systems provide continuous monitoring and response capabilities on endpoints:

```
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Endpoint   │────→│   EDR Platform   │────→│   SOC Analyst   │
│    Agent     │     │   (Cloud/On-Prem) │     │   Dashboard     │
│              │←────│                    │←────│                 │
│  - Telemetry │     │  - Detection      │     │  - Investigation│
│  - Response  │     │  - Correlation    │     │  - Response     │
│  - Isolation │     │  - Threat Intel   │     │  - Hunting      │
└──────────────┘     └──────────────────┘     └─────────────────┘
```

### EDR Capabilities Matrix

| Capability | Description | Value |
|-----------|-------------|-------|
| Process telemetry | All process creation, command lines, parent-child relationships | Detect malicious execution chains |
| File monitoring | File creation, modification, deletion, hash computation | Detect malware, ransomware |
| Network telemetry | Connection attempts, DNS queries, data transfer volumes | Detect C2, exfiltration |
| Registry monitoring | Registry key changes, persistence mechanisms | Detect persistence techniques |
| Memory analysis | In-memory code injection, reflective DLL loading | Detect fileless malware |
| Behavioral detection | ML-based anomaly detection on sequences of actions | Detect novel attacks |
| Automated response | Isolate endpoint, kill process, quarantine file | Contain threats in seconds |
| Threat hunting | Historical telemetry search across all endpoints | Proactive threat discovery |

### EDR Platform Evaluation

| Platform | Strengths | Considerations |
|----------|-----------|----------------|
| CrowdStrike Falcon | Cloud-native, strong threat intel, low agent footprint | Premium pricing, cloud-dependent |
| Microsoft Defender for Endpoint | Deep Windows integration, included in M365 E5 | Strongest on Windows, growing Linux/Mac |
| SentinelOne | Strong autonomous response, Storyline visualization | Agent resource consumption |
| Carbon Black (VMware) | Behavioral analysis, application control | Complex deployment at scale |
| Elastic Security | Open source core, flexible detection rules, SIEM integration | Requires more operational expertise |

### EDR Anti-Evasion Considerations

Sophisticated adversaries specifically target EDR:
- Kernel-level tampering to disable EDR agents
- Direct system calls to bypass user-mode hooks
- Timestomping to evade timeline analysis
- Living-off-the-land binaries (LOLBins) to avoid suspicious process alerts
- DLL search order hijacking against EDR components

Countermeasures: Kernel-level protection (ELAM — Early Launch Anti-Malware), tamper protection, behavioral detection that is harder to evade than signature-based detection, and defense in depth (EDR is one layer, not the only layer).

---

## Mobile Device Management (MDM)

### MDM Security Controls

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Device enrollment | Ensure only managed devices access corporate resources | Certificate-based enrollment, DEP/ZTE |
| Configuration profiles | Enforce security settings consistently | Passcode policy, encryption, restrictions |
| App management | Control which apps can access corporate data | App catalog, MAM policies, containerization |
| Conditional access | Grant access only when device meets compliance | OS version, encryption, jailbreak detection |
| Remote wipe | Protect data on lost/stolen devices | Selective wipe (corporate data only) or full wipe |
| Network configuration | Secure connectivity | Per-app VPN, Wi-Fi certificate distribution |

### BYOD Security Architecture

Bring Your Own Device requires balancing security with user privacy:

**Containerization approach:** Corporate data lives in a managed container (workspace) on the personal device. The container has its own encryption, app policies, and remote wipe capability. Personal data remains untouched and unmonitored.

**MAM-only approach:** Manage applications without managing the device. App-level policies (copy/paste restrictions, save-to restrictions, encryption) protect corporate data without full device enrollment.

**Zero Trust approach:** Do not trust the device at all. All access through ZTNA proxy. Device posture checked per-session. No corporate data cached on device. Strongest security, but requires always-on connectivity.

### MDM Platforms

- Microsoft Intune (M365 integration, conditional access)
- Jamf (Apple ecosystem specialist)
- VMware Workspace ONE (cross-platform, advanced BYOD)
- Kandji (Apple-focused, zero-touch deployment)

---

## Patch Management

### Patch Management Lifecycle

```
Vulnerability    →  Assessment  →  Testing  →  Deployment  →  Verification
Disclosed/Found     Risk rating    Lab/staging   Prod rollout   Confirm fix
                    CVSS + EPSS    Compatibility  Phased rollout  Scan again
                    Asset context  Rollback plan  Monitor issues  Close ticket
```

### Patch SLAs by Severity

| CVSS Score | Severity | Patch SLA | Notes |
|-----------|----------|-----------|-------|
| 9.0-10.0 | Critical | 24 hours | Emergency change, out-of-band patching |
| 7.0-8.9 | High | 7 days | Expedited change process |
| 4.0-6.9 | Medium | 30 days | Standard change window |
| 0.1-3.9 | Low | 90 days | Next scheduled maintenance |

**SLA modifiers:**
- Actively exploited in the wild: Reduce SLA by 50% (Critical = 12 hours)
- Internet-facing system: Reduce SLA by 50%
- Compensating controls in place: May extend SLA with documented risk acceptance
- System cannot be patched (legacy/EOL): Document risk acceptance, implement compensating controls, plan decommission

### Patch Management Tools

| Tool | Type | Coverage |
|------|------|----------|
| WSUS/SCCM/Intune | Microsoft native | Windows endpoints and servers |
| Jamf | Apple native | macOS, iOS |
| Ansible/Chef/Puppet | Configuration management | Cross-platform, infrastructure |
| AWS Systems Manager | Cloud native | EC2 instances, on-prem managed |
| Automox | Cloud-native | Cross-platform, policy-driven |

### Patch Management Challenges

- Legacy systems without vendor support (compensating controls required)
- Systems requiring reboot in 24/7 environments (rolling updates, blue-green)
- Third-party software not covered by OS patching (application inventory critical)
- Patch-induced regressions (testing environment must mirror production)
- Shadow IT devices not in inventory (network scanning discovers unknowns)

---

## Vulnerability Scanning

### Scanning Types

**Authenticated scanning:** Agent or credential-based scanning that examines installed software, configuration, and missing patches from inside the system. More accurate, fewer false negatives.

**Unauthenticated scanning:** Network-based scanning from outside the system. Identifies what an attacker would see. May miss internal vulnerabilities but tests external exposure.

**Agent-based scanning:** Lightweight agent on each endpoint performs continuous assessment. No network scanning infrastructure required. Works for remote/roaming devices.

### Vulnerability Scanner Platforms

| Scanner | Type | Strengths |
|---------|------|-----------|
| Nessus / Tenable.io | Commercial | Comprehensive checks, compliance auditing |
| Qualys VMDR | Commercial | Cloud-native, integrated patch management |
| Rapid7 InsightVM | Commercial | Risk-based prioritization, remediation analytics |
| OpenVAS / Greenbone | Open Source | Free, community vulnerability feeds |
| Trivy | Open Source | Container/IaC scanning, CI/CD integration |

### Scanning Frequency

| Asset Type | Frequency | Rationale |
|-----------|-----------|-----------|
| Internet-facing | Continuous/daily | Highest exposure, fastest required response |
| Internal servers | Weekly | Critical infrastructure, production workloads |
| Endpoints | Weekly (agent) | User devices, diverse software |
| Cloud infrastructure | Continuous (CSPM) | Configuration changes constantly |
| Container images | Every build (CI/CD) | Shift-left, prevent deployment of vulnerable images |

---

## CIS Hardening Benchmarks

### CIS Benchmark Application

Center for Internet Security (CIS) Benchmarks provide prescriptive configuration guidance for operating systems, cloud platforms, applications, and network devices. Compliance with CIS Benchmarks is a baseline security requirement.

**Key CIS Controls (Implementation Groups):**

**IG1 (Essential — All Organizations):**
1. Inventory of enterprise assets
2. Inventory of software assets
3. Data protection (classification and encryption)
4. Secure configuration of enterprise assets
5. Account management (least privilege)
6. Access control management

**IG2 (Standard — Organizations with IT Security Staff):**
7. Continuous vulnerability management
8. Audit log management
9. Email and web browser protections
10. Malware defenses
11. Data recovery (backups)
12. Network infrastructure management
13. Network monitoring and defense

**IG3 (Advanced — Organizations with Security Experts):**
14. Security awareness and skills training
15. Service provider management
16. Application software security
17. Incident response management
18. Penetration testing

### Hardening Automation

- Use CIS-hardened AMIs/images as base for cloud instances
- Automate hardening via configuration management (Ansible CIS roles, Chef CIS cookbooks)
- Validate hardening compliance via vulnerability scanning (CIS benchmark audit scans)
- Drift detection: continuously monitor for configuration changes that deviate from hardened baseline
- Infrastructure as Code: encode hardening requirements in Terraform/CloudFormation templates

---

## SIEM and SOC Operations

### SIEM Architecture

Security Information and Event Management (SIEM) aggregates, correlates, and analyzes security events from across the organization:

```
Data Sources → Collection → Normalization → Correlation → Detection → Alert → Response
  - EDR           Agents       Common schema    Rules         SIEM       SOC      IR
  - Firewall      Syslog       Field mapping    ML models     Dashboard  Analyst  Playbook
  - CloudTrail    API          Enrichment       Threat intel  Ticket     Triage   Contain
  - IAM logs      Beats/Fluentd Timestamping    Baselines     Escalation Investigate Remediate
```

### SIEM Platforms

| Platform | Type | Strengths |
|----------|------|-----------|
| Splunk | Commercial | Mature, powerful SPL query language, extensive ecosystem |
| Microsoft Sentinel | Cloud SIEM | Azure integration, KQL, cost-effective for M365 shops |
| Elastic SIEM | Open core | Flexible, ELK stack integration, detection-as-code |
| Google Chronicle | Cloud SIEM | Massive data retention, YARA-L rules |
| Sumo Logic | Cloud SIEM | Cloud-native, log analytics |

### SOC Tier Structure

| Tier | Role | Responsibilities |
|------|------|-----------------|
| Tier 1 | Alert Triage | Initial alert review, false positive filtering, basic investigation |
| Tier 2 | Incident Analysis | Deep investigation, threat hunting, advanced forensics |
| Tier 3 | Threat Hunting | Proactive hunting, detection engineering, threat intelligence |
| SOC Manager | Operations | Team management, metrics, process improvement, executive reporting |

### SOC Metrics

| Metric | Target | Purpose |
|--------|--------|---------|
| Mean Time to Detect (MTTD) | <1 hour | How quickly threats are identified |
| Mean Time to Respond (MTTR) | <4 hours | How quickly threats are contained |
| Alert volume | Decreasing trend | Indicates improving tuning and automation |
| False positive rate | <30% | Analyst fatigue correlates with missed detections |
| Coverage (ATT&CK) | >60% techniques | Detection capability breadth |
| Dwell time | <24 hours | Time between compromise and detection |

---

## Cross-References

- `04_infrastructure/network_security.md` — Network-level security controls
- `04_infrastructure/cloud_security.md` — Cloud endpoint security
- `06_operations/security_monitoring.md` — Detection engineering and SIEM rules
- `06_operations/incident_response.md` — Responding to endpoint compromises
- `06_operations/vulnerability_management.md` — Vulnerability lifecycle management
