# Threat Landscape — Adversary Intelligence and TTP Analysis

## Overview

Understanding the threat landscape is not optional — it is the prerequisite for all defensive strategy. A threat model without threat intelligence is speculative fiction. This module codifies the frameworks, taxonomies, and operational practices for understanding who attacks systems, how they attack, and what indicators reveal their presence.

The transition from perimeter-based defense to threat-informed defense (NIST SP 800-160 Vol. 2) requires continuous consumption and operationalization of threat intelligence. Defenders must think like attackers — not as an aspiration, but as an engineering discipline.

---

## MITRE ATT&CK Framework

### Architecture

MITRE ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) is the most comprehensive, empirically-grounded taxonomy of adversary behavior. It is organized hierarchically:

**Tactics** (the "why") — 14 tactical objectives representing stages of an attack:
1. Reconnaissance — Gathering target information
2. Resource Development — Establishing infrastructure, acquiring tools
3. Initial Access — Gaining a foothold in the target environment
4. Execution — Running adversary-controlled code
5. Persistence — Maintaining access across restarts
6. Privilege Escalation — Gaining higher-level permissions
7. Defense Evasion — Avoiding detection
8. Credential Access — Stealing credentials
9. Discovery — Understanding the target environment
10. Lateral Movement — Moving through the environment
11. Collection — Gathering data of interest
12. Command and Control — Communicating with compromised systems
13. Exfiltration — Stealing data out of the environment
14. Impact — Disruption, destruction, or manipulation

**Techniques** (the "how") — Specific methods for achieving each tactic (e.g., T1566: Phishing under Initial Access).

**Sub-techniques** — Granular variations (e.g., T1566.001: Spearphishing Attachment, T1566.002: Spearphishing Link).

**Procedures** — Real-world implementations by specific threat groups (e.g., APT29 uses T1566.001 with weaponized Office documents).

### Operational Use of ATT&CK

**Detection mapping:** For each technique, ATT&CK provides:
- Data sources required for detection (process creation logs, network traffic, file monitoring)
- Detection logic examples
- Known detection gaps

**Gap analysis:** Map your current detection capabilities against ATT&CK techniques. Identify which techniques you can detect, which you cannot, and prioritize coverage by threat actor relevance.

**Purple teaming:** Use ATT&CK techniques as the exercise framework. Red team executes specific techniques; blue team validates detection and response.

```
ATT&CK Gap Assessment Matrix:
Technique         | Detection | Prevention | Response | Priority
T1566 Phishing    | High      | Medium     | High     | Critical
T1059 Command     | Medium    | Low        | Medium   | High
T1078 Valid Accts  | Low       | Medium     | Low      | Critical
T1486 Data Encrypt | Medium    | Low        | Medium   | High
T1021 Remote Svc  | Low       | Medium     | Low      | High
```

---

## Cyber Kill Chain — Lockheed Martin's Sequential Model

### Kill Chain Phases

The Cyber Kill Chain (Hutchins, Cloppert, Amin, 2011) models intrusions as a sequential chain where disrupting any phase breaks the attack:

1. **Reconnaissance:** Harvesting email addresses, conference attendees, social media, technical footprint (Shodan, DNS records, certificate transparency logs).

2. **Weaponization:** Coupling a remote access trojan (RAT) with an exploit into a deliverable payload. Includes creating weaponized documents, malicious URLs, or supply chain implants.

3. **Delivery:** Transmitting the weaponized payload to the target. Primary vectors: email attachments (61% per Verizon DBIR), compromised websites (watering hole), USB drives, supply chain.

4. **Exploitation:** Triggering the exploit code to gain initial execution. Exploits target: browser vulnerabilities, document parsers (PDF, Office), OS vulnerabilities, application vulnerabilities.

5. **Installation:** Establishing persistence. Techniques: registry modifications, scheduled tasks, DLL hijacking, WMI subscriptions, rootkits, bootkit installation.

6. **Command and Control (C2):** Establishing a communication channel. Protocols: HTTPS (blends with legitimate traffic), DNS tunneling, social media dead drops, domain fronting, encrypted channels.

7. **Actions on Objectives:** Achieving the adversary's goal — data exfiltration, data destruction, ransomware deployment, espionage, sabotage.

### Kill Chain Defense Mapping

For each phase, defensive controls should provide detection, denial, disruption, degradation, deception, or containment:

| Phase | Detection | Prevention |
|-------|-----------|------------|
| Recon | Monitor for scanning (IDS), web analytics | Minimize digital footprint, remove unnecessary DNS |
| Weaponization | Threat intel on toolkits | (Limited — occurs on attacker infrastructure) |
| Delivery | Email gateway, web proxy, endpoint AV | Block malicious attachments, URL filtering |
| Exploitation | Endpoint detection, exploit guard | Patching, application whitelisting, DEP/ASLR |
| Installation | File integrity monitoring, EDR | Application whitelisting, least privilege |
| C2 | Network monitoring, DNS analytics, proxy logs | Egress filtering, DNS sinkholing, network segmentation |
| Actions | DLP, UEBA, database activity monitoring | Encryption, access controls, data segmentation |

---

## Threat Actor Classification

### Taxonomy by Capability and Motivation

**Nation-State (APT):**
- Motivation: Espionage, sabotage, strategic advantage
- Capability: Custom zero-days, supply chain attacks, advanced persistent operations
- Resources: Unlimited budget, dedicated teams, legal cover
- Examples: APT29 (Russia/SVR), APT41 (China/MSS), Lazarus Group (North Korea)
- Dwell time: Months to years
- Defense implication: Assume breach, focus on detection and containment, not just prevention

**Organized Crime (eCrime):**
- Motivation: Financial gain — ransomware, BEC, carding, extortion
- Capability: Commodity tools augmented with purchased exploits, RaaS (Ransomware-as-a-Service)
- Resources: Significant (ransomware revenues in billions annually)
- Examples: FIN7, Conti/Royal, LockBit, ALPHV/BlackCat
- Dwell time: Days to weeks (fast monetization)
- Defense implication: Robust backup/recovery, email security, EDR, network segmentation

**Hacktivist:**
- Motivation: Political or social ideology, public embarrassment
- Capability: DDoS, website defacement, data leaks, doxing
- Resources: Volunteer-driven, variable skill
- Examples: Anonymous, various nationalist groups
- Defense implication: DDoS protection, public-facing application security

**Insider Threat:**
- Motivation: Disgruntlement, financial incentive, espionage recruitment, accidental
- Capability: Legitimate access, knowledge of internal systems and controls
- Resources: Existing credentials and authorization
- Defense implication: UEBA, DLP, access reviews, separation of duties, least privilege

---

## Indicator of Compromise (IOC) Management

### IOC Taxonomy

| Type | Description | Example | Volatility |
|------|-------------|---------|------------|
| File hash | MD5/SHA-256 of malicious file | `d41d8cd98f...` | Low (easily changed) |
| IP address | Attacker infrastructure | `198.51.100.23` | Medium |
| Domain | C2 or phishing domain | `evil-login.com` | Medium |
| URL | Specific malicious URL | `https://evil.com/payload` | High |
| Email address | Phishing sender | `ceo@ev1l-corp.com` | High |
| Registry key | Persistence mechanism | `HKLM\...\Run\malware` | Medium |
| Mutex | Malware identifier | `Global\MalwareMutex123` | Low |
| YARA rule | Pattern-based detection | Binary/string patterns | Low (structural) |
| Behavioral | TTP-based detection | Process injection + C2 beacon | Very low (hard to change) |

### Pyramid of Pain (David Bianco)

The Pyramid of Pain ranks indicator types by how much pain changing them causes the adversary:

```
            /\
           /  \  TTPs (Tactics, Techniques, Procedures)
          /    \   — Most painful to change
         /------\
        / Tools  \
       /----------\
      / Network /  \
     / Host     \   \  Artifacts
    /  Artifacts \   \
   /--------------\   \
  / Domain Names   \   \
 /------------------\   \
/ IP Addresses       \   \
/----------------------\   \
/ Hash Values (trivial) \   \
```

**Operational implication:** Invest in behavioral detection (TTP-level) rather than IOC-matching (hash-level). An adversary can change a file hash in seconds but changing their entire methodology takes months and significant investment.

---

## TTP Analysis — Beyond Indicators

### Behavioral Detection Engineering

TTP-based detection focuses on adversary behavior patterns rather than specific artifacts:

**Example — Credential Dumping Detection:**
Instead of alerting on a specific tool hash (trivially changed), detect the behavior:
- Process accessing LSASS memory (MITRE T1003.001)
- Unusual use of Windows API calls: MiniDumpWriteDump, OpenProcess with PROCESS_VM_READ
- Process creating memory dump files in unusual locations
- Unauthorized access to SAM/SYSTEM registry hives

**Example — Lateral Movement Detection:**
- Authentication from unusual source IPs within the network
- Service creation on remote hosts (T1569.002)
- WMI remote process creation (T1047)
- PsExec-like named pipe creation patterns
- Pass-the-hash: NTLM authentication without corresponding interactive logon

### Threat Intelligence Lifecycle

1. **Direction:** Define intelligence requirements based on organizational risk profile
2. **Collection:** Gather data from open-source (OSINT), commercial feeds, ISACs, government advisories, internal telemetry
3. **Processing:** Normalize IOCs to STIX format, enrich with context (geo, ASN, historical activity)
4. **Analysis:** Correlate raw intelligence into actionable assessments — who is targeting us, with what capabilities, through which vectors
5. **Dissemination:** Distribute to SOC (tactical IOCs), security engineering (detection rules), leadership (strategic assessments)
6. **Feedback:** Measure intelligence effectiveness — did it prevent or detect attacks? Refine collection priorities

### Threat Intelligence Platforms

- **MISP** (Malware Information Sharing Platform) — Open-source, community-driven IOC sharing
- **OpenCTI** — Open-source cyber threat intelligence platform with STIX2 native support
- **ThreatConnect** — Commercial platform with automation and orchestration
- **Recorded Future** — Commercial intelligence with machine learning enrichment
- **VirusTotal** — File/URL/domain reputation and analysis

---

## Emerging Threat Vectors

### AI-Augmented Attacks

- LLM-generated phishing at scale with personalization
- Deepfake audio/video for social engineering and BEC
- AI-assisted vulnerability discovery and exploit generation
- Automated reconnaissance and attack surface mapping
- Polymorphic malware using generative models

### Supply Chain

- Dependency confusion attacks (npm, PyPI namespace squatting)
- CI/CD pipeline compromise (codecov, SolarWinds)
- Open-source maintainer account takeover
- Malicious code injection into popular libraries
- Build system compromise (reproducible builds as mitigation)

### Cloud-Native

- Serverless function abuse and cryptomining
- Container escape vulnerabilities
- Misconfigured IAM policies (overprivileged service accounts)
- Cross-tenant vulnerabilities in multi-tenant architectures
- API-first attack surfaces (broken authentication, BOLA)

---

## Cross-References

- `01_foundations/threat_landscape.md` — Foundational threat actor overview
- `03_threat_modeling/threat_modeling_methods.md` — Applying threat intelligence to threat models
- `03_threat_modeling/risk_assessment.md` — Scoring identified threats
- `06_operations/security_monitoring.md` — Detection engineering for identified TTPs
- `06_operations/incident_response.md` — Responding to materialized threats
