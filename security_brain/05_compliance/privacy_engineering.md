# Privacy Engineering — GDPR, DPIA, Consent Management, and Privacy by Design

## Overview

Privacy engineering is the discipline of building systems that protect personal data by design and by default, not as an afterthought. The regulatory landscape — led by GDPR but followed by CCPA/CPRA, LGPD, PIPL, and dozens of national laws — has made privacy a first-class engineering requirement. This module codifies the technical implementation of privacy requirements, from GDPR's specific technical obligations through Data Protection Impact Assessments, consent management architectures, Ann Cavoukian's Privacy by Design principles, data classification frameworks, and encryption strategies.

Privacy is not a feature toggle. It is an architectural property. Systems that handle personal data without privacy engineering are non-compliant by construction, regardless of what their privacy policy claims.

---

## GDPR Technical Requirements

### Lawful Bases for Processing (Article 6)

Every processing activity must have a valid legal basis. The choice of legal basis determines technical obligations:

| Legal Basis | Technical Implication |
|------------|----------------------|
| Consent (Art. 6(1)(a)) | Must record, store, and verify consent; must support withdrawal; cannot be precondition for service |
| Contract (Art. 6(1)(b)) | Processing limited to what is necessary for contract performance; scope must be documented |
| Legal Obligation (Art. 6(1)(c)) | Processing limited to specific legal requirement; retention tied to legal mandate |
| Vital Interests (Art. 6(1)(d)) | Emergency use only; narrow scope |
| Public Interest (Art. 6(1)(e)) | Government/public authority processing |
| Legitimate Interest (Art. 6(1)(f)) | Requires balancing test (LIA); data subject can object; most flexible but most challenged |

### Data Subject Rights — Technical Implementation

| Right | Article | Technical Requirement |
|-------|---------|----------------------|
| Right of Access | Art. 15 | Export all personal data in machine-readable format within 30 days |
| Right to Rectification | Art. 16 | Update personal data across all systems including backups and derived data |
| Right to Erasure | Art. 17 | Delete personal data from all systems, backups, logs, analytics, third-party transfers |
| Right to Restriction | Art. 18 | Flag data as restricted; prevent further processing while maintaining storage |
| Right to Portability | Art. 20 | Export in structured, commonly used, machine-readable format (JSON, CSV) |
| Right to Object | Art. 21 | Stop specific processing activities (profiling, direct marketing) immediately |
| Automated Decision-Making | Art. 22 | Provide human review mechanism for decisions with legal or significant effects |

### Technical Architecture for Rights Fulfillment

```
Data Subject Request → Verification → Data Discovery → Execution → Confirmation
                       Identity check   Find all PII      Delete/Export  Notify subject
                       Prevent fraud    All systems        Log action     Within 30 days
                                        All processors     Verify complete
                                        All backups
```

**Critical challenges:**
- **Data discovery:** Personal data exists across databases, logs, analytics, backups, caches, third-party systems. A comprehensive data inventory is prerequisite.
- **Backup erasure:** Cannot selectively delete from backup tapes. Solutions: encrypt with per-user keys (delete key = crypto-erase), or exclude from backups and handle retention separately.
- **Derived data:** Aggregated analytics, ML model training data, search indices — all may contain personal data requiring erasure.
- **Third-party propagation:** Must notify all processors and recipients of erasure requests (Art. 19).

---

## Data Protection Impact Assessment (DPIA)

### When a DPIA is Required (Article 35)

A DPIA is mandatory when processing is "likely to result in a high risk to the rights and freedoms of natural persons." Specifically:

- Systematic and extensive profiling with significant effects
- Large-scale processing of special category data (health, biometric, genetic, racial, political, religious)
- Systematic monitoring of publicly accessible areas
- New technologies with unknown privacy implications
- Automated decision-making with legal or significant effects
- Large-scale processing of children's data
- Data matching or combining datasets from different sources
- Processing that prevents data subjects from exercising rights

### DPIA Process (Article 35(7))

**Step 1: Description of Processing**
- Nature, scope, context, and purposes of processing
- Data categories and volumes
- Recipients and transfers
- Retention periods
- Technology used

**Step 2: Necessity and Proportionality Assessment**
- Is the processing necessary for the stated purpose?
- Could the purpose be achieved with less data or less intrusive processing?
- Is the legal basis appropriate and documented?
- How are data subject rights facilitated?

**Step 3: Risk Assessment**
For each identified risk, evaluate:
- Likelihood (remote, possible, likely, almost certain)
- Severity (negligible, limited, significant, maximum)
- Nature of impact (physical, material, moral harm to data subjects)

Risk matrix output determines whether processing can proceed:

| | Negligible | Limited | Significant | Maximum |
|---|---|---|---|---|
| Almost Certain | Acceptable | Consultation | Consultation | Unacceptable |
| Likely | Acceptable | Acceptable | Consultation | Consultation |
| Possible | Acceptable | Acceptable | Acceptable | Consultation |
| Remote | Acceptable | Acceptable | Acceptable | Acceptable |

"Consultation" = must consult supervisory authority (DPA) before processing.
"Unacceptable" = processing cannot proceed without fundamental redesign.

**Step 4: Measures to Address Risks**
- Technical measures: encryption, pseudonymization, access controls, data minimization
- Organizational measures: policies, training, DPO oversight, audit
- Residual risk assessment after measures applied

**Step 5: Documentation and Review**
- Record the DPIA and make available to supervisory authority on request
- Review whenever processing changes or new risks emerge
- DPO must be consulted during DPIA (Art. 35(2))

---

## Consent Management

### Technical Requirements for Valid Consent

GDPR consent (Art. 7) must be:
- **Freely given:** Cannot be a precondition for service (no "consent or leave" dark patterns)
- **Specific:** Separate consent for each distinct processing purpose
- **Informed:** Clear description of what data, for what purpose, by whom
- **Unambiguous:** Affirmative action (opt-in, not pre-ticked checkboxes)
- **Withdrawable:** As easy to withdraw as to give

### Consent Management Architecture

```
┌─────────────────────────────────────────────────────┐
│                 Consent Management Platform           │
│                                                       │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │ Consent   │  │  Consent     │  │   Consent      │ │
│  │ Collection│→ │  Storage     │→ │   Enforcement  │ │
│  │ UI/API    │  │  (Audit Log) │  │   (Gateway)    │ │
│  └──────────┘  └──────────────┘  └────────────────┘ │
│       ↑              ↑                    ↓          │
│  ┌──────────┐  ┌──────────────┐  ┌────────────────┐ │
│  │ Preference│  │  Consent     │  │   Downstream   │ │
│  │ Center    │  │  Receipt     │  │   Systems      │ │
│  │ (User)    │  │  (Proof)     │  │   (Processors) │ │
│  └──────────┘  └──────────────┘  └────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Consent Storage Schema:**
```
consent_record:
  id: UUID
  data_subject_id: hashed_identifier
  purpose: string (specific processing purpose)
  legal_basis: "consent"
  granted: boolean
  granted_at: ISO8601 timestamp
  withdrawn_at: ISO8601 timestamp | null
  consent_version: string (policy version consented to)
  collection_method: "web_form" | "api" | "verbal"
  evidence: {ip_address, user_agent, form_snapshot}
  expiry: ISO8601 timestamp | null
```

**Consent enforcement:** Every data processing operation must check consent status before execution. This is implemented as middleware/gateway that queries the consent store and blocks processing if consent is not active for the specific purpose.

### Consent Management Platforms

- OneTrust (market leader, comprehensive privacy management)
- Cookiebot (focus on cookie consent, strong EU compliance)
- TrustArc (enterprise privacy management)
- Osano (developer-friendly, fast implementation)
- Custom implementation (for organizations with unique requirements — ensure legal review)

---

## Privacy by Design — Cavoukian's Seven Foundational Principles

### The Seven Principles

Ann Cavoukian's Privacy by Design framework (2009, adopted into GDPR Art. 25) establishes seven foundational principles:

**1. Proactive not Reactive; Preventative not Remedial**
Anticipate and prevent privacy-invasive events before they happen. Do not wait for breaches to act. Build privacy risk assessment into the design phase.

**2. Privacy as the Default Setting**
No action required from the individual to protect their privacy. Personal data is automatically protected in any system. Default settings are the most privacy-protective.

**3. Privacy Embedded into Design**
Privacy is integral to the system architecture, not bolted on as an add-on. It is a core functionality requirement, not an optional feature.

**4. Full Functionality — Positive-Sum, not Zero-Sum**
Privacy and functionality are not tradeoffs. Seek solutions that deliver both full privacy and full functionality. Reject false dichotomies (security vs. privacy, usability vs. privacy).

**5. End-to-End Security — Full Lifecycle Protection**
Personal data is protected throughout its entire lifecycle: collection, use, storage, transfer, and destruction. Cradle-to-grave data security.

**6. Visibility and Transparency — Keep it Open**
All stakeholders can verify that processing operates according to stated promises. Accountability and auditability are built in. No hidden processing.

**7. Respect for User Privacy — Keep it User-Centric**
Architects and operators must keep the interests of the individual uppermost. Provide strong defaults, appropriate notice, user-friendly options, and mechanisms for consent and control.

### Technical Implementation of Privacy by Design

| Principle | Technical Implementation |
|-----------|------------------------|
| Data Minimization | Collect only what is necessary; review and prune data fields |
| Purpose Limitation | Enforce processing boundaries in code; separate data by purpose |
| Storage Limitation | Automated data retention policies; TTL on records; scheduled purges |
| Pseudonymization | Replace identifiers with tokens; store mapping separately with access controls |
| Anonymization | k-anonymity, l-diversity, t-closeness, differential privacy for analytics |
| Encryption | AES-256-GCM at rest, TLS 1.3 in transit, field-level encryption for sensitive fields |
| Access Control | RBAC/ABAC with data-sensitivity-aware policies; audit all access to personal data |

---

## Data Classification Framework

### Classification Levels

| Level | Description | Examples | Controls Required |
|-------|-------------|---------|-------------------|
| Public | No harm if disclosed | Marketing materials, public APIs | Basic integrity |
| Internal | Minor harm if disclosed | Internal wiki, process docs | Authentication required |
| Confidential | Significant harm if disclosed | Customer lists, financial data, PII | Encryption, access logging, need-to-know |
| Restricted | Severe harm if disclosed | Payment data, health records, credentials | Field-level encryption, MFA, DLP, audit trail |

### Classification Implementation

- **Automated classification:** Use DLP tools to scan data stores and classify based on content patterns (SSN, credit card, health terms)
- **Metadata tagging:** Tag data assets with classification level in data catalogs
- **Policy enforcement:** Access control policies reference classification level
- **Handling procedures:** Each classification level has defined handling rules for storage, transmission, sharing, retention, and disposal

---

## Encryption Strategy for Privacy

### Encryption Architecture

| Data State | Encryption Method | Key Management |
|-----------|-------------------|----------------|
| At rest (database) | AES-256-GCM, TDE, or field-level encryption | KMS with key rotation |
| At rest (files/objects) | AES-256-GCM, server-side encryption | KMS or customer-managed keys |
| In transit | TLS 1.3, mTLS for service-to-service | Certificate management (ACM, Let's Encrypt) |
| In use | Confidential computing, homomorphic encryption (emerging) | TEE-managed keys |
| Backups | Same as at rest; per-user keys enable crypto-erasure | Separate backup key hierarchy |

### Crypto-Erasure for Right to Erasure

Instead of physically deleting data from all storage (including backups), encrypt personal data with a per-user key. When the user requests erasure, destroy the key. The data becomes cryptographically inaccessible without physical deletion, satisfying GDPR Art. 17 while maintaining backup integrity.

---

## Cross-References

- `05_compliance/compliance_frameworks.md` — Framework-specific privacy requirements
- `05_compliance/supply_chain_security.md` — Third-party data processing agreements
- `01_foundations/cryptography.md` — Encryption algorithms and key management
- `02_application_security/authorization.md` — Access control for personal data
- `03_threat_modeling/threat_modeling_methods.md` — LINDDUN privacy threat modeling
