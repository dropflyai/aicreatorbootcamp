# Threat Modeling Methods — Systematic Adversarial Analysis

## Overview

Threat modeling is the disciplined practice of identifying, cataloging, and prioritizing potential threats to a system before they manifest as vulnerabilities. Unlike reactive security (patching after exploitation), threat modeling is proactive — it shapes architecture at design time. This module codifies the major threat modeling methodologies, their applicability, and their integration into the software development lifecycle.

Adam Shostack's "Threat Modeling: Designing for Security" (2014) establishes the canonical framework: (1) What are we building? (2) What can go wrong? (3) What are we going to do about it? (4) Did we do a good enough job? Every method below operationalizes these four questions differently.

---

## STRIDE — Microsoft's Categorical Decomposition

### Origin and Theory

Developed by Loren Kohnfelder and Praerit Garg at Microsoft (1999), STRIDE decomposes threats into six categories mapped to security properties. Each category represents a violation of a specific security property:

| Category | Violated Property | Description |
|----------|-------------------|-------------|
| **S**poofing | Authentication | Pretending to be something or someone else |
| **T**ampering | Integrity | Modifying data or code without authorization |
| **R**epudiation | Non-repudiation | Denying having performed an action |
| **I**nformation Disclosure | Confidentiality | Exposing information to unauthorized entities |
| **D**enial of Service | Availability | Denying or degrading service to legitimate users |
| **E**levation of Privilege | Authorization | Gaining capabilities beyond what is authorized |

### Application Process

1. **Decompose the system** into a Data Flow Diagram (DFD) with processes, data stores, data flows, and trust boundaries.
2. **Enumerate each element** and apply all six STRIDE categories.
3. **For each applicable threat**, determine likelihood and impact.
4. **Document mitigations** — each threat must have a corresponding control.
5. **Validate** that mitigations actually address the threat (not security theater).

### STRIDE-per-Element Optimization

Not every STRIDE category applies to every DFD element:

| Element | S | T | R | I | D | E |
|---------|---|---|---|---|---|---|
| External Entity | X | | X | | | |
| Process | X | X | X | X | X | X |
| Data Store | | X | | X | X | |
| Data Flow | | X | | X | X | |

This reduces analysis from 6N to approximately 3.5N threats, focusing effort where threats are architecturally plausible.

### STRIDE Limitations

- Categorical completeness does not guarantee enumeration completeness — STRIDE tells you *what kinds* of threats exist, not *which specific threats* apply.
- Lacks quantitative risk scoring (must pair with DREAD or CVSS).
- Can produce overwhelming numbers of threats for large systems without STRIDE-per-Element filtering.
- Does not model attacker motivation or capability.

---

## PASTA — Process for Attack Simulation and Threat Analysis

### Framework Architecture

PASTA (developed by Tony UcedaVelez and Marco Morana) is a seven-stage, risk-centric threat modeling methodology that integrates business context, technical analysis, and attack simulation:

**Stage 1: Define Objectives** — Establish business context, regulatory requirements, and risk appetite. What does the organization care about losing?

**Stage 2: Define Technical Scope** — Enumerate infrastructure, applications, protocols, network topology, and third-party dependencies. Create a comprehensive asset inventory.

**Stage 3: Application Decomposition** — Create Data Flow Diagrams (DFDs), identify trust boundaries, enumerate entry points, and map data assets by classification level.

**Stage 4: Threat Analysis** — Leverage threat intelligence (MITRE ATT&CK, industry reports, vendor advisories) to identify relevant threats. Map threats to the specific application context.

**Stage 5: Vulnerability Analysis** — Correlate known vulnerabilities (CVE databases, SAST/DAST findings, penetration test results) with identified threats. Determine which vulnerabilities enable which threats.

**Stage 6: Attack Modeling** — Build attack trees and simulate attack scenarios. Model the full kill chain from initial access through impact. Determine attack probability using historical data.

**Stage 7: Risk and Impact Analysis** — Quantify residual risk using business impact assessment. Prioritize mitigations by risk reduction per dollar invested. Produce actionable remediation roadmap.

### PASTA Advantages Over STRIDE

- Business-context-aware: PASTA begins with business objectives, not technical decomposition.
- Integrates threat intelligence: PASTA consumes real-world threat data rather than relying solely on categorical analysis.
- Produces quantifiable risk metrics aligned with business language.
- Attack simulation (Stage 6) validates that theoretical threats are practically exploitable.

---

## LINDDUN — Privacy Threat Modeling

### Framework Structure

LINDDUN (developed at KU Leuven) extends threat modeling to privacy, addressing threats that STRIDE ignores:

| Category | Description |
|----------|-------------|
| **L**inkability | Ability to link two or more items of interest (actions, identities, data) |
| **I**dentifiability | Ability to identify a subject from a set of subjects |
| **N**on-repudiation | Inability to deny an action (privacy-negative when users cannot deny actions) |
| **D**etectability | Ability to detect whether an item of interest exists |
| **D**isclosure of information | Exposure of personal data to unauthorized parties |
| **U**nawareness | User is not aware of data collection, processing, or sharing |
| **N**on-compliance | Failure to comply with privacy regulations, policies, or best practices |

### Application to GDPR Systems

LINDDUN is essential for any system processing EU personal data. Each LINDDUN category maps to GDPR requirements:
- Linkability violations indicate insufficient pseudonymization (Art. 25)
- Identifiability violations indicate insufficient anonymization
- Unawareness violations indicate insufficient transparency (Art. 13/14)
- Non-compliance violations indicate direct regulatory failure

### Integration with STRIDE

Use STRIDE for security threats and LINDDUN for privacy threats. The combination provides comprehensive coverage. Where they overlap (Information Disclosure / Disclosure of Information), merge the analysis to avoid duplication.

---

## Attack Trees — Structured Threat Decomposition

### Formal Definition

Attack trees (Bruce Schneier, 1999) are directed acyclic graphs where:
- The root node is the attacker's goal (e.g., "Exfiltrate customer PII")
- Child nodes are sub-goals or prerequisite conditions
- Leaf nodes are atomic attack actions
- Edges can be AND (all children required) or OR (any child sufficient)

### Construction Methodology

```
Goal: Access Production Database
├── [OR] Exploit Application Vulnerability
│   ├── [AND] SQL Injection
│   │   ├── Find injectable parameter
│   │   └── Bypass WAF rules
│   ├── [OR] IDOR to admin endpoint
│   └── [OR] Deserialization RCE
├── [OR] Compromise Credentials
│   ├── [AND] Phishing Campaign
│   │   ├── Craft convincing pretext
│   │   ├── Deliver payload
│   │   └── Harvest credentials
│   ├── [OR] Credential stuffing (reused passwords)
│   └── [OR] Brute force weak passwords
├── [OR] Insider Threat
│   ├── Malicious employee with access
│   └── Social engineering of privileged user
└── [OR] Supply Chain Compromise
    ├── Compromised dependency
    └── Compromised CI/CD pipeline
```

### Quantitative Annotation

Each leaf node can be annotated with:
- **Cost** to the attacker (dollars, effort)
- **Probability** of success (0.0-1.0)
- **Detectability** likelihood (low/medium/high)
- **Technical skill** required (novice/intermediate/expert)

Propagation rules: OR nodes take the minimum cost / maximum probability; AND nodes sum costs / multiply probabilities. This enables quantitative comparison of attack paths.

### Attack Tree Tools

- **OWASP Threat Dragon** — Open-source, web-based tool for creating DFDs and attack trees. Integrates with STRIDE.
- **Microsoft Threat Modeling Tool** — Windows-based, generates threats automatically from DFD templates.
- **IriusRisk** — Commercial platform with automated threat modeling, compliance mapping, and CI/CD integration.
- **Threagile** — Open-source, code-based threat modeling using YAML definitions.

---

## Data Flow Diagrams (DFDs) — System Decomposition

### DFD Elements

| Symbol | Element | Description |
|--------|---------|-------------|
| Circle | Process | Transforms data (application code, microservice, function) |
| Rectangle | External Entity | Outside the system boundary (user, third-party API, partner) |
| Parallel Lines | Data Store | Persists data (database, file system, cache, queue) |
| Arrow | Data Flow | Movement of data between elements (HTTP, gRPC, message) |
| Dashed Line | Trust Boundary | Security perimeter (network zone, process isolation, org boundary) |

### DFD Levels

- **Level 0 (Context Diagram):** Single process representing the entire system, showing all external entities and top-level data flows. Used for executive communication.
- **Level 1:** Decomposes the Level 0 process into major subsystems. Typically 5-10 processes. Shows trust boundaries between subsystems.
- **Level 2:** Decomposes each Level 1 process into individual components. Shows internal data stores and inter-component flows.

### Trust Boundary Identification

Trust boundaries are the most critical DFD element for threat modeling. Every data flow crossing a trust boundary is a potential attack surface. Common trust boundaries:
- Internet to DMZ
- DMZ to internal network
- Application to database
- User space to kernel space
- Between microservices with different privilege levels
- Between your code and third-party libraries
- Between environments (dev/staging/prod)

---

## OWASP Threat Dragon — Practical Tooling

### Workflow Integration

1. Create a DFD in Threat Dragon representing the system under analysis
2. Apply STRIDE-per-Element to each DFD component
3. Threat Dragon auto-generates threat suggestions based on element types
4. Analyst reviews, accepts, or dismisses each suggested threat
5. For accepted threats, document mitigations and verification method
6. Export the threat model as a living document linked to the codebase
7. Update the threat model during every architecture review or major feature addition

### Integration with CI/CD

Store threat model files (JSON) in the repository alongside code. Create pipeline checks that:
- Verify threat model exists for each service
- Alert when architecture changes but threat model has not been updated
- Track mitigation status (open/mitigated/accepted risk)
- Generate threat model diff reports during pull request reviews

---

## Threat Modeling Process — Practical Implementation

### When to Threat Model

- **Mandatory:** New system or service design, major architecture changes, new external integrations, post-breach analysis
- **Recommended:** New feature with authentication/authorization changes, new data flow across trust boundaries, regulatory scope changes
- **Optional but valuable:** Regular cadence reviews (quarterly), technology stack upgrades, team topology changes

### Workshop Format

**Participants:** Engineering lead, security engineer, product owner, infrastructure/DevOps representative.

**Duration:** 60-90 minutes per service or major component.

**Process:**
1. (10 min) Context setting — business purpose, data classification, compliance requirements
2. (20 min) DFD construction — whiteboard or digital tool, identify trust boundaries
3. (30 min) Threat enumeration — STRIDE-per-Element or PASTA stages 4-6
4. (20 min) Prioritization — risk scoring, severity assignment
5. (10 min) Action items — assign mitigations, set deadlines, schedule follow-up

### Threat Model Maintenance

A threat model is a living document. It must be updated when:
- Architecture changes (new services, removed components, changed data flows)
- New threat intelligence reveals previously unconsidered attack vectors
- Vulnerability discoveries invalidate assumptions about control effectiveness
- Compliance requirements change (new regulation, scope expansion)
- Post-incident analysis reveals gaps in the existing threat model

Store threat models version-controlled alongside the code they describe. Link threat model elements to specific architectural decisions and security controls.

---

## Cross-References

- `01_foundations/threat_landscape.md` — Threat actor profiles and attack vectors
- `03_threat_modeling/risk_assessment.md` — Quantitative and qualitative risk scoring
- `03_threat_modeling/threat_landscape.md` — MITRE ATT&CK and kill chain mapping
- `07_secure_sdlc/secure_development.md` — Implementing threat model mitigations in code
- `Templates/threat_model_template.md` — Structured template for threat model output
