# Compliance Frameworks — SOC 2, ISO 27001, NIST CSF, PCI DSS, HIPAA, FedRAMP

## Overview

Compliance is not security, and security is not compliance — but they are deeply interrelated. Compliance frameworks codify minimum security expectations for specific contexts: handling payment card data (PCI DSS), protecting health information (HIPAA), demonstrating trust to enterprise customers (SOC 2), or selling to government (FedRAMP). This module provides deep technical understanding of each major framework, their control requirements, audit processes, and practical implementation strategies.

The fundamental principle: compliance should be a byproduct of good security practices, not a parallel workstream. Organizations that build security-first and map to compliance frameworks outperform those that build compliance-first and bolt on security.

---

## SOC 2 Type II — Trust Services Criteria

### Framework Architecture

SOC 2 (Service Organization Control 2) is an audit framework developed by the AICPA based on the Trust Services Criteria (TSC). It evaluates controls relevant to:

| Criterion | Description | Required? |
|----------|-------------|-----------|
| Security (CC) | Protection against unauthorized access | Always required |
| Availability (A) | System uptime and accessibility | Optional |
| Processing Integrity (PI) | Accurate, timely, authorized processing | Optional |
| Confidentiality (C) | Protection of confidential information | Optional |
| Privacy (P) | Personal information handling | Optional |

### Type I vs Type II

- **Type I:** Evaluates control design at a point in time. "Are the controls well-designed?"
- **Type II:** Evaluates control operating effectiveness over a period (minimum 6 months, typically 12 months). "Are the controls working consistently?"

Type II is the market standard. Enterprise customers will not accept Type I for ongoing trust assurance.

### Key Control Categories (Common Criteria)

**CC1 — Control Environment:**
- Management commitment to integrity and ethical values
- Board oversight of security program
- Organizational structure and authority
- HR policies (background checks, training, termination procedures)

**CC2 — Communication and Information:**
- Internal communication of security policies
- External communication of commitments (privacy policy, terms of service)
- Whistleblower and reporting mechanisms

**CC3 — Risk Assessment:**
- Risk identification and analysis process
- Fraud risk assessment
- Change management impact analysis

**CC5 — Control Activities:**
- Logical access controls (authentication, authorization)
- Physical access controls (data centers, offices)
- Change management (code review, approval, testing)
- Configuration management (baseline configuration, drift detection)

**CC6 — Logical and Physical Access Controls:**
- User provisioning and deprovisioning
- Multi-factor authentication
- Encryption of data at rest and in transit
- Endpoint protection
- Network security controls

**CC7 — System Operations:**
- Vulnerability management and patching
- Security monitoring and incident detection
- Incident response procedures
- Business continuity and disaster recovery

**CC8 — Change Management:**
- Change request and approval process
- Testing before production deployment
- Emergency change procedures
- Rollback capabilities

### SOC 2 Audit Process

1. **Readiness Assessment** (2-4 months) — Gap analysis, control design, evidence collection setup
2. **Observation Period** (6-12 months) — Controls operating, evidence accumulating
3. **Audit Execution** (4-8 weeks) — Auditor testing controls, sampling evidence
4. **Report Issuance** — Auditor opinion, control descriptions, test results

### GRC Platforms for SOC 2

| Platform | Strengths |
|----------|-----------|
| Vanta | Automated evidence collection, continuous monitoring, fast setup |
| Drata | Strong integrations, real-time compliance dashboard |
| Secureframe | Developer-friendly, policy generation, personnel management |
| Laika | Customizable, multi-framework support |
| AuditBoard | Enterprise-grade, multiple compliance frameworks |

---

## ISO 27001 — Information Security Management System

### Framework Structure

ISO 27001 is an international standard (ISO/IEC 27001:2022) for establishing, implementing, maintaining, and continually improving an Information Security Management System (ISMS).

**Clauses 4-10 (Management System Requirements):**
- Clause 4: Context of the organization
- Clause 5: Leadership commitment and policy
- Clause 6: Risk assessment and treatment planning
- Clause 7: Support (resources, competence, awareness, communication, documentation)
- Clause 8: Operational planning and control
- Clause 9: Performance evaluation (monitoring, internal audit, management review)
- Clause 10: Improvement (nonconformity, corrective action, continual improvement)

**Annex A Controls (93 controls in 4 themes — 2022 version):**
- Organizational controls (37): Policies, roles, threat intelligence, asset management
- People controls (8): Screening, awareness, disciplinary, termination
- Physical controls (14): Perimeters, entry, equipment, media
- Technological controls (34): Endpoints, access, cryptography, logging, development

### Certification Process

1. **Gap Analysis** — Compare current state against ISO 27001 requirements
2. **ISMS Implementation** — Policies, procedures, risk assessment, control implementation
3. **Internal Audit** — Verify conformity before external audit
4. **Stage 1 Audit** — Documentation review by certification body
5. **Stage 2 Audit** — On-site audit verifying implementation and effectiveness
6. **Certification** — 3-year certificate with annual surveillance audits
7. **Re-certification** — Full audit every 3 years

---

## NIST Cybersecurity Framework (CSF)

### CSF Functions

The NIST CSF (version 2.0) organizes cybersecurity activities into six functions:

| Function | Purpose | Key Categories |
|----------|---------|---------------|
| Govern (GV) | Establish and monitor cybersecurity strategy | Context, strategy, supply chain, roles |
| Identify (ID) | Understand risk to systems, assets, data | Asset management, risk assessment, improvement |
| Protect (PR) | Implement safeguards | Identity management, awareness, data security, platform security |
| Detect (DE) | Identify cybersecurity events | Continuous monitoring, adverse event analysis |
| Respond (RS) | Take action on detected events | Incident management, analysis, mitigation, reporting |
| Recover (RC) | Restore capabilities after incident | Recovery planning, execution, communication |

### Implementation Tiers

| Tier | Description | Characteristics |
|------|-------------|-----------------|
| Tier 1 — Partial | Ad hoc, reactive | No formal risk management, limited awareness |
| Tier 2 — Risk Informed | Some risk awareness | Risk management approved but not org-wide |
| Tier 3 — Repeatable | Formal, organization-wide | Policies established, regular updates, external participation |
| Tier 4 — Adaptive | Agile, risk-informed | Continuous improvement, lessons learned integrated, predictive |

### NIST CSF Implementation

NIST CSF is voluntary (except for federal contractors) but widely adopted as a risk management framework. Its strength is flexibility — organizations create a Target Profile (desired state) and compare against their Current Profile (actual state) to identify gaps and prioritize improvements.

---

## PCI DSS — Payment Card Industry Data Security Standard

### PCI DSS v4.0 Requirements (12 Requirements, 6 Goals)

| Goal | Requirements |
|------|-------------|
| Build and Maintain Secure Network | 1. Install and maintain network security controls 2. Apply secure configurations |
| Protect Account Data | 3. Protect stored account data 4. Protect with strong cryptography during transmission |
| Maintain Vulnerability Management | 5. Protect from malicious software 6. Develop and maintain secure systems |
| Implement Strong Access Control | 7. Restrict access by business need 8. Identify users and authenticate 9. Restrict physical access |
| Monitor and Test Networks | 10. Log and monitor all access 11. Test security regularly |
| Maintain Security Policy | 12. Support information security with policies and programs |

### PCI DSS Scope Reduction

The most effective PCI DSS strategy is scope reduction — minimize the systems that handle cardholder data:
- **Tokenization:** Replace card numbers with tokens; token systems are in scope, consuming applications are not
- **P2PE (Point-to-Point Encryption):** Encrypt at the terminal; encrypted data transit systems may be out of scope
- **Third-party processors:** Use Stripe, Braintree, or Adyen to handle payment processing; your application never sees card data
- **Network segmentation:** Isolate the cardholder data environment (CDE) from the rest of the network

### Self-Assessment vs QSA Audit

- **SAQ (Self-Assessment Questionnaire):** For merchants processing fewer transactions. Multiple SAQ types based on how card data is handled.
- **ROC (Report on Compliance):** For large merchants and service providers. Requires Qualified Security Assessor (QSA) audit.

---

## HIPAA — Health Insurance Portability and Accountability Act

### HIPAA Rules

| Rule | Scope | Key Requirements |
|------|-------|-----------------|
| Privacy Rule | Who can access PHI | Minimum necessary standard, patient rights, use/disclosure limits |
| Security Rule | Technical safeguards for ePHI | Administrative, physical, and technical safeguards |
| Breach Notification Rule | Incident response | 60-day notification to HHS, affected individuals, and media (>500) |

### HIPAA Security Rule Safeguards

**Administrative Safeguards:**
- Security management process (risk analysis, risk management)
- Workforce security (authorization, clearance, termination procedures)
- Security awareness and training
- Contingency plan (data backup, disaster recovery, emergency operations)

**Physical Safeguards:**
- Facility access controls
- Workstation use and security
- Device and media controls (disposal, reuse)

**Technical Safeguards:**
- Access control (unique user ID, emergency access, auto-logoff, encryption)
- Audit controls (hardware, software, procedural mechanisms for logging)
- Integrity controls (mechanism to authenticate ePHI, protect from alteration)
- Transmission security (encryption for ePHI in transit)

### Business Associate Agreements (BAAs)

Any entity that creates, receives, maintains, or transmits PHI on behalf of a covered entity must sign a BAA. Cloud providers (AWS, GCP, Azure) offer BAAs — but the BAA only covers services explicitly listed. Using a non-BAA-covered service for PHI is a HIPAA violation.

---

## FedRAMP — Federal Risk and Authorization Management Program

### Authorization Levels

| Level | Impact | Examples |
|-------|--------|---------|
| FedRAMP Low | Low impact data | Public websites, open data |
| FedRAMP Moderate | Moderate impact (most common) | Email, collaboration, business applications |
| FedRAMP High | High impact | Law enforcement, healthcare, financial |

### FedRAMP Authorization Process

1. **Preparation** — Engage 3PAO (Third Party Assessment Organization), implement NIST 800-53 controls
2. **Assessment** — 3PAO tests controls, produces Security Assessment Report (SAR)
3. **Authorization** — Agency ATO (Authority to Operate) or JAB P-ATO (Provisional)
4. **Continuous Monitoring** — Monthly vulnerability scans, annual assessment, incident reporting

FedRAMP Moderate requires approximately 325 NIST 800-53 controls. FedRAMP High requires approximately 421 controls. The authorization process typically takes 12-18 months and costs $1-3M for initial authorization.

---

## Cross-References

- `05_compliance/privacy_engineering.md` — GDPR and privacy technical requirements
- `05_compliance/supply_chain_security.md` — Third-party risk management
- `06_operations/incident_response.md` — Compliance notification requirements during incidents
- `03_threat_modeling/risk_assessment.md` — Risk assessment methodologies
- `Templates/vendor_assessment_template.md` — Third-party compliance assessment
