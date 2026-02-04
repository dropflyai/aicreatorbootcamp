# Threat Landscape — Adversaries, Vectors, and Frameworks

## Overview

Understanding the threat landscape is a prerequisite for effective security. You cannot defend against threats you have not modeled. This module catalogs the adversary ecosystem, attack vectors, kill chain models, and the MITRE ATT&CK framework that structures modern threat intelligence. All content is grounded in empirical data (Verizon DBIR, Mandiant M-Trends, CrowdStrike Global Threat Report) and academic research (MIT 6.858, Stanford CS155).

Security without threat modeling is security theater — controls applied without understanding what they protect against.

---

## Threat Actor Taxonomy

### Tier 1: Nation-State Actors (APT)

**Capabilities:** Unlimited budget, zero-day exploits, custom malware, long-term persistence, supply chain compromise, human intelligence operations.

**Motivation:** Espionage (intellectual property, state secrets), sabotage (critical infrastructure), influence operations (elections, public opinion).

**Dwell time:** 6-18 months median before detection (Mandiant M-Trends).

**Notable groups:**
- APT28 (Fancy Bear / Russia) — Political espionage, spear-phishing, credential harvesting
- APT41 (Winnti / China) — Dual espionage and financial, supply chain attacks
- Lazarus Group (North Korea) — Financial theft, cryptocurrency exchanges, SWIFT network attacks
- Equation Group (attributed NSA) — Firmware-level implants, air-gapped network compromise

**Defense posture:** Unless you are a government, defense contractor, or critical infrastructure operator, nation-state defense is not your primary focus. However, nation-state tools eventually proliferate to criminal groups (EternalBlue from NSA to WannaCry).

### Tier 2: Organized Cybercrime

**Capabilities:** Commercial exploit kits, ransomware-as-a-service (RaaS), bulletproof hosting, money laundering networks, initial access brokers.

**Motivation:** Financial gain. Period. These are businesses optimizing for ROI.

**Dwell time:** Days to weeks (ransomware deploys quickly for maximum leverage).

**Operational model:**
```
Initial Access Broker → Sells access to target network ($500-$10,000)
  → Ransomware Affiliate → Deploys ransomware, exfiltrates data
    → Ransomware Operator → Provides malware, manages payments
      → Money Launderer → Converts cryptocurrency to fiat
```

**Notable operations:**
- LockBit — Most prolific ransomware operation (2022-2024), affiliate model
- Cl0p — Known for exploiting zero-days in file transfer appliances (MOVEit, GoAnywhere)
- FIN7 — Sophisticated financial crime group targeting retail and hospitality
- Scattered Spider — Social engineering specialists, help desk fraud, SIM swapping

**Defense posture:** This is the primary threat for most organizations. Defend against initial access vectors (phishing, credential stuffing, exposed services) and assume compromise will occur.

### Tier 3: Hacktivists

**Capabilities:** DDoS tooling, website defacement, data leaks, low-sophistication exploits of known vulnerabilities.

**Motivation:** Ideological, political, social causes. Seeking publicity and disruption.

**Impact:** Primarily availability (DDoS) and reputational (defacement, data leaks).

### Tier 4: Insider Threats

**Capabilities:** Legitimate access to systems, knowledge of internal processes, ability to bypass network-level controls.

**Motivation:** Financial gain, disgruntlement, coercion, negligence (unintentional insider threat).

**Statistics:** Per the Verizon DBIR, insider threats account for approximately 20% of breaches. The Ponemon Institute reports the average cost of an insider threat incident at $15.4 million (2023).

**Defense posture:** Least privilege, separation of duties, behavioral analytics (UEBA), access logging, and offboarding procedures.

### Tier 5: Script Kiddies and Opportunistic Attackers

**Capabilities:** Publicly available exploit tools, automated scanners, default credential lists.

**Motivation:** Curiosity, bragging rights, petty vandalism.

**Defense posture:** Basic hygiene eliminates this threat class: patch known vulnerabilities, change default credentials, implement rate limiting, use WAF.

---

## Attack Vector Classification

### Network-Based Vectors

| Vector | Description | Primary Defense |
|--------|-------------|-----------------|
| Phishing | Deceptive emails with malicious links/attachments | Email security, user training, MFA |
| Credential Stuffing | Automated login attempts using breached credentials | MFA, rate limiting, credential screening |
| Exposed Services | Publicly accessible admin panels, databases, APIs | Network segmentation, firewall rules, VPN |
| Man-in-the-Middle | Intercepting communications between parties | TLS 1.3, certificate pinning, HSTS |
| DNS Attacks | DNS hijacking, cache poisoning, typosquatting | DNSSEC, DNS monitoring, certificate transparency |
| DDoS | Overwhelming resources with traffic volume | CDN, rate limiting, traffic scrubbing, auto-scaling |

### Application-Based Vectors

| Vector | Description | Primary Defense |
|--------|-------------|-----------------|
| Injection (SQL, NoSQL, LDAP, OS) | Inserting malicious code into queries/commands | Parameterized queries, input validation, least privilege |
| XSS (Reflected, Stored, DOM) | Injecting scripts into web pages viewed by other users | Output encoding, CSP, input validation |
| CSRF | Forcing authenticated users to perform unintended actions | Anti-CSRF tokens, SameSite cookies, origin checks |
| SSRF | Inducing server to make requests to internal resources | URL validation, allowlists, network segmentation |
| Deserialization | Exploiting unsafe deserialization of untrusted data | Avoid native deserialization, use safe formats (JSON) |
| File Upload | Uploading malicious files (web shells, malware) | File type validation, content scanning, isolated storage |
| Authentication Bypass | Circumventing authentication mechanisms | Framework auth, session management, MFA |
| Broken Access Control | Accessing resources beyond authorized scope | Server-side authorization checks on every request |

### Supply Chain Vectors

| Vector | Description | Primary Defense |
|--------|-------------|-----------------|
| Dependency Confusion | Malicious packages with names matching internal packages | Scoped registries, namespace reservation |
| Typosquatting | Packages with names similar to popular packages | Lockfiles, SCA scanning, manual review |
| Compromised Maintainer | Legitimate package updated with malicious code | Lockfile pinning, SCA alerts, code review |
| Build Pipeline Compromise | Injecting malicious code during CI/CD | Signed commits, verified builds, SLSA framework |
| Compromised Update Server | Distributing malware through software updates | Code signing, update verification, certificate pinning |

### Social Engineering Vectors

| Vector | Description | Primary Defense |
|--------|-------------|-----------------|
| Spear Phishing | Targeted emails crafted for specific individuals | Security awareness training, email filtering, MFA |
| Pretexting | Creating false scenarios to extract information | Verification procedures, need-to-know policies |
| Vishing | Voice phishing via phone calls | Call-back verification, out-of-band confirmation |
| SIM Swapping | Convincing carriers to transfer phone numbers | Non-SMS MFA, carrier PIN, hardware tokens |
| Help Desk Fraud | Social engineering IT support for access | Identity verification procedures, MFA for resets |

---

## Cyber Kill Chain (Lockheed Martin, 2011)

The Kill Chain model maps the stages of an intrusion. Defenders can break the chain at any stage to prevent the attack from reaching its objective.

### The Seven Phases

```
Phase 1: RECONNAISSANCE
  ├─ Passive: OSINT, social media, DNS records, certificate transparency logs
  ├─ Active: Port scanning, service enumeration, vulnerability scanning
  └─ Defenses: Minimize public exposure, monitor for reconnaissance (honeypots)

Phase 2: WEAPONIZATION
  ├─ Creating exploit payload (e.g., malicious PDF, Office macro, web exploit)
  ├─ Pairing exploit with backdoor (RAT, web shell, implant)
  └─ Defenses: Not directly defensible (attacker's environment), but understanding
     likely weapons informs detection (file analysis, sandbox detonation)

Phase 3: DELIVERY
  ├─ Email attachment or link (most common — >90% per DBIR)
  ├─ Watering hole (compromising websites the target visits)
  ├─ USB drop / physical access
  └─ Defenses: Email security gateway, URL filtering, browser isolation, USB policies

Phase 4: EXPLOITATION
  ├─ Exploiting vulnerability to execute code (browser, OS, application)
  ├─ User interaction (clicking link, enabling macros, entering credentials)
  └─ Defenses: Patching, application whitelisting, sandbox, exploit mitigation
     (ASLR, DEP, CFI), user training

Phase 5: INSTALLATION
  ├─ Installing persistent access (backdoor, web shell, scheduled task)
  ├─ Privilege escalation (kernel exploit, credential theft, misconfig)
  └─ Defenses: Endpoint detection (EDR), application whitelisting, integrity
     monitoring, behavioral analysis

Phase 6: COMMAND AND CONTROL (C2)
  ├─ Establishing communication channel to attacker infrastructure
  ├─ Techniques: DNS tunneling, HTTPS beaconing, domain fronting, cloud C2
  └─ Defenses: DNS monitoring, network traffic analysis, proxy inspection,
     egress filtering, threat intelligence feeds

Phase 7: ACTIONS ON OBJECTIVES
  ├─ Data exfiltration (the actual theft)
  ├─ Ransomware deployment (encryption + extortion)
  ├─ Lateral movement (expanding access to other systems)
  ├─ Sabotage (destroying or modifying data/systems)
  └─ Defenses: DLP, network segmentation, access controls, monitoring,
     backup and recovery
```

### Kill Chain Analysis Decision Framework

```
For each phase, ask:
  1. Can we PREVENT this phase from succeeding? (Block)
  2. Can we DETECT this phase occurring? (Alert)
  3. Can we DISRUPT this phase if detected? (Respond)
  4. What is our BLIND SPOT at this phase? (Gap)

Document coverage using a heat map:
  ┌─────────────┬──────────┬──────────┬──────────┐
  │ Phase       │ Prevent  │ Detect   │ Respond  │
  ├─────────────┼──────────┼──────────┼──────────┤
  │ Recon       │ PARTIAL  │ LOW      │ N/A      │
  │ Delivery    │ HIGH     │ HIGH     │ MEDIUM   │
  │ Exploit     │ MEDIUM   │ MEDIUM   │ LOW      │
  │ Install     │ MEDIUM   │ HIGH     │ MEDIUM   │
  │ C2          │ LOW      │ MEDIUM   │ HIGH     │
  │ Actions     │ HIGH     │ MEDIUM   │ HIGH     │
  └─────────────┴──────────┴──────────┴──────────┘
```

---

## MITRE ATT&CK Framework

The ATT&CK (Adversarial Tactics, Techniques, and Common Knowledge) framework is the industry-standard knowledge base of adversary behavior. It organizes observed attacker techniques into a matrix of tactics (the "why") and techniques (the "how").

### Tactics (Enterprise Matrix)

| ID | Tactic | Description |
|----|--------|-------------|
| TA0001 | Initial Access | Techniques to gain entry (phishing, exploit public-facing application, valid accounts) |
| TA0002 | Execution | Techniques to run malicious code (command-line, scripting, scheduled tasks) |
| TA0003 | Persistence | Techniques to maintain access (registry keys, scheduled tasks, implants) |
| TA0004 | Privilege Escalation | Techniques to gain higher-level permissions (exploit, token manipulation) |
| TA0005 | Defense Evasion | Techniques to avoid detection (obfuscation, disabling security tools, timestomping) |
| TA0006 | Credential Access | Techniques to steal credentials (credential dumping, brute force, keylogging) |
| TA0007 | Discovery | Techniques to learn about the environment (network scanning, account discovery) |
| TA0008 | Lateral Movement | Techniques to move through the network (RDP, SMB, pass-the-hash) |
| TA0009 | Collection | Techniques to gather target data (screen capture, email collection, clipboard data) |
| TA0010 | Exfiltration | Techniques to steal data (exfiltration over C2, cloud storage, alternative protocols) |
| TA0011 | Command and Control | Techniques for communication (encrypted channels, domain fronting, DNS tunneling) |
| TA0040 | Impact | Techniques to disrupt availability (data encryption, wiper, defacement) |

### Using ATT&CK for Defense

**Gap Analysis:**
1. Map your existing detection capabilities to ATT&CK techniques
2. Identify techniques with no detection coverage (blind spots)
3. Prioritize detection engineering based on threat intelligence (which techniques are used by threat actors relevant to your industry)

**Detection Engineering:**
```
For each ATT&CK technique:
  1. What data sources are needed? (process creation, network flows, file events)
  2. What does normal behavior look like? (baseline)
  3. What does malicious use of this technique look like? (detection logic)
  4. What is the false positive rate? (tuning)
  5. What is the response action? (playbook)
```

**Threat Intelligence Integration:**
- Map threat actor TTPs to ATT&CK: "APT28 uses T1566.001 (Spear-Phishing Attachment) for initial access"
- Prioritize defenses against techniques used by relevant threat actors
- Track threat actor evolution: new techniques adopted, old techniques abandoned

---

## The Threat Landscape in 2024-2025 (Empirical Data)

### Top Attack Vectors (Verizon DBIR 2024)

1. **Credentials** — Stolen or compromised credentials remain the #1 initial access vector (>40% of breaches). Defense: MFA everywhere, credential screening, passwordless authentication.

2. **Phishing** — Social engineering via email (16% of breaches). Increasingly sophisticated with AI-generated content. Defense: Email security, user training, phishing-resistant MFA (FIDO2).

3. **Exploitation of Vulnerabilities** — Exploiting known CVEs in public-facing applications (15% of breaches). MOVEit, Citrix, Fortinet VPN. Defense: Patch management, WAF, network segmentation.

4. **Ransomware** — Present in 25% of all breaches. Median ransom demand increasing. Double extortion (encrypt + exfiltrate) is standard. Defense: Backup/recovery, segmentation, EDR.

### Emerging Threats

**AI-Powered Attacks:**
- AI-generated phishing content that bypasses traditional NLP-based detection
- Deepfake voice/video for social engineering (CEO fraud)
- Automated vulnerability discovery and exploit generation
- LLM prompt injection against AI-integrated applications

**Supply Chain:**
- Increasing attacks on CI/CD pipelines and build systems
- Open-source dependency compromise at scale
- SLSA framework adoption as countermeasure

**Cloud-Native Threats:**
- Cloud misconfiguration remains a leading breach cause
- Container escape and Kubernetes privilege escalation
- Serverless function injection
- Cloud credential theft via SSRF to metadata endpoints (169.254.169.254)

**Identity-Based Attacks:**
- Session token theft (adversary-in-the-middle phishing proxies like Evilginx)
- OAuth consent phishing
- MFA fatigue attacks (push notification bombing)
- SIM swapping and telephony-based attacks

---

## Threat Modeling Integration

The threat landscape directly feeds threat modeling:

```
1. IDENTIFY assets worth protecting
   → What data, systems, and capabilities does the adversary want?

2. IDENTIFY relevant threat actors
   → Based on industry, geography, data sensitivity, public profile

3. MAP threat actor capabilities to assets
   → Can this threat actor reach this asset? What techniques would they use?

4. ASSESS current defenses against mapped techniques
   → Do we have controls for each relevant ATT&CK technique?

5. PRIORITIZE gaps based on risk
   → Likelihood (threat actor capability + opportunity) x Impact (asset value)

6. IMPLEMENT controls to close priority gaps
   → Prevention, detection, or response controls

7. ITERATE continuously
   → Threat landscape changes; reassess quarterly minimum
```

---

## Threat Intelligence Sources

| Source | Type | Value |
|--------|------|-------|
| Verizon DBIR | Annual report | Empirical breach statistics, trend analysis |
| Mandiant M-Trends | Annual report | Advanced threat actor behavior, dwell time data |
| CrowdStrike GTR | Annual report | Threat actor naming, eCrime ecosystem analysis |
| MITRE ATT&CK | Knowledge base | Technique catalog, procedure examples, mitigations |
| CISA KEV | Vulnerability catalog | Known Exploited Vulnerabilities — patch these first |
| NVD/CVE | Vulnerability database | Comprehensive vulnerability details and CVSS scores |
| Threat feeds | Real-time | IOCs (indicators of compromise), IP/domain reputation |

---

**The threat landscape is not static. This module must be updated as new threat data is published and new attack techniques are observed. Quarterly review minimum.**
