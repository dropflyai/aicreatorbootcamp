# Privacy Engineering -- Privacy by Design Implementation

> Module: `04_privacy/privacy_engineering.md`
> Brain: Legal Brain
> Authority: Domain-specific (privacy and data protection)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Privacy by Design

### 1.1 Cavoukian's Seven Foundational Principles

Privacy by Design (PbD), developed by Dr. Ann Cavoukian and now enshrined in GDPR Article 25, requires that privacy protections be embedded into the design and architecture of IT systems and business practices from the outset.

| Principle | Meaning | Implementation |
|-----------|---------|---------------|
| 1. Proactive not Reactive | Anticipate privacy risks before they materialize | Privacy threat modeling in design phase; DPIAs |
| 2. Privacy as Default | Maximum privacy without user action | Opt-in for data collection; minimal defaults; no pre-checked boxes |
| 3. Privacy Embedded in Design | Privacy is integral to system architecture | Architecture-level controls (encryption, access control, data isolation) |
| 4. Full Functionality | Positive-sum, not zero-sum (privacy AND functionality) | Creative engineering solutions; no false dichotomies |
| 5. End-to-End Security | Lifecycle protection from collection to deletion | Encryption at rest and in transit; secure deletion; retention automation |
| 6. Visibility and Transparency | Operations verifiable; users informed | Audit logs; public privacy documentation; clear notices |
| 7. Respect for User Privacy | User-centric design; keep individuals in control | Consent management; preference centers; easy data export/deletion |

### 1.2 GDPR Data Protection by Design and Default (Article 25)

**Article 25(1) -- By Design:**
The controller shall implement appropriate technical and organizational measures designed to implement data-protection principles (such as data minimization) in an effective manner and to integrate the necessary safeguards into the processing.

**Article 25(2) -- By Default:**
The controller shall implement appropriate technical and organizational measures for ensuring that, by default, only personal data which are necessary for each specific purpose of the processing are processed.

**Factors to Consider:**
- State of the art (current technology capabilities)
- Cost of implementation
- Nature, scope, context, and purposes of processing
- Risks of varying likelihood and severity for rights and freedoms

---

## 2. Data Mapping and Inventory

### 2.1 What Is Data Mapping?

Data mapping (also called data inventory or Record of Processing Activities (ROPA) under GDPR Article 30) is the systematic identification and documentation of all personal data processing activities.

### 2.2 Data Mapping Template

For each processing activity, document:

| Field | Description | Example |
|-------|-------------|---------|
| Processing Activity | Name/description of the activity | User account registration |
| Data Categories | Types of personal data processed | Name, email, password hash, IP address |
| Data Subject Categories | Whose data is processed | Customers, prospects, employees |
| Purpose | Why the data is processed | Account creation and authentication |
| Lawful Basis (GDPR) | Legal ground for processing | Contract performance (Art. 6(1)(b)) |
| Source | Where data comes from | Directly from data subject via web form |
| Recipients | Who receives the data | Auth0 (identity provider), Segment (analytics) |
| Cross-Border Transfers | Is data transferred outside EU/EEA? | Yes -- US (DPF + SCCs) |
| Retention Period | How long data is kept | Duration of account + 30 days post-deletion |
| Security Measures | Technical/organizational measures | Encryption at rest (AES-256), access control (RBAC) |
| Data Processor(s) | Third parties processing data on your behalf | Auth0, AWS, Segment |
| DPA in Place? | Data Processing Agreement executed? | Yes (Auth0 DPA, AWS DPA, Segment DPA) |

### 2.3 Data Mapping Process

**Phase 1: Discovery (2-4 weeks)**
1. Interview stakeholders across all departments (engineering, product, marketing, sales, HR, finance)
2. Inventory all systems that process personal data (SaaS tools, databases, file storage, email)
3. Review existing documentation (privacy policy, contracts, architecture diagrams)
4. Automated discovery: Use data mapping tools to scan systems (OneTrust, BigID, Securiti)

**Phase 2: Documentation (2-4 weeks)**
1. Create processing activity records using the template above
2. Map data flows between systems (visual data flow diagrams)
3. Identify cross-border transfers and transfer mechanisms
4. Identify gaps in DPAs, consent, or lawful basis

**Phase 3: Validation and Remediation (2-4 weeks)**
1. Validate data map with system owners
2. Remediate gaps (execute DPAs, update consent mechanisms, implement transfer safeguards)
3. Establish ongoing maintenance process (update data map quarterly or when new processing activities begin)

**Phase 4: Ongoing Maintenance**
1. Integrate data mapping into change management (new system? new feature? update the map)
2. Annual full review and validation
3. Trigger-based updates: new vendor, new product feature, new market entry, data breach, regulatory change

---

## 3. Data Protection Impact Assessment (DPIA)

### 3.1 When a DPIA Is Required

GDPR Article 35 requires a DPIA before processing that is "likely to result in a high risk to the rights and freedoms of natural persons."

**Mandatory DPIA Triggers:**
1. Systematic and extensive evaluation of personal aspects based on automated processing, including profiling, producing legal effects or similarly significant effects
2. Processing on a large scale of special categories of data (health, biometric, genetic, racial/ethnic origin, political opinions, religious beliefs, sexual orientation) or criminal conviction data
3. Systematic monitoring of a publicly accessible area on a large scale

**Additional High-Risk Indicators (WP29 Guidelines):**
- Evaluation or scoring (credit scoring, behavioral profiling)
- Automated decision-making with legal or similar significant effects
- Systematic monitoring (employee monitoring, location tracking)
- Sensitive data or data of a highly personal nature
- Data processed on a large scale
- Matching or combining datasets
- Data concerning vulnerable subjects (children, employees, patients)
- Innovative use or applying new technological or organizational solutions
- Cross-border transfer outside EU/EEA
- Processing that prevents data subjects from exercising a right or using a service

**Rule of Thumb:** If two or more indicators are present, a DPIA is likely required.

### 3.2 DPIA Process

**Step 1: Description of Processing**
- Nature: What data, how collected, how processed, how stored, how shared
- Scope: Scale (number of data subjects, volume of data, geographic reach)
- Context: Relationship with data subjects, expectations, vulnerabilities
- Purpose: What you aim to achieve, and the benefit to the controller and data subjects

**Step 2: Necessity and Proportionality Assessment**
- Is the processing necessary to achieve the purpose? (No less intrusive alternative?)
- Is the data minimized? (Only collecting what is needed?)
- What is the lawful basis? Is it appropriate?
- What are the retention periods? Are they justified?
- How are data subject rights facilitated?
- What are the safeguards for cross-border transfers?

**Step 3: Risk Assessment**
For each identified risk:
- Source of risk (internal actor, external attacker, system failure)
- Nature of impact (discrimination, financial loss, reputational harm, identity theft, physical harm)
- Likelihood (remote, possible, likely)
- Severity (minimal, significant, severe)
- Risk level = Likelihood x Severity

**Step 4: Mitigation Measures**
For each high or medium risk, identify measures to reduce the risk:
- Technical measures (encryption, pseudonymization, access control, anonymization)
- Organizational measures (training, policies, audits, DPO oversight)
- Contractual measures (DPAs, security requirements, liability allocation)
- Process measures (consent mechanisms, data subject rights procedures, incident response)

**Step 5: Documentation and Sign-off**
- Document the entire DPIA
- DPO review and advice (mandatory if DPO is appointed)
- Sign-off by data controller
- If residual risk remains high after mitigation: Prior consultation with supervisory authority required (Article 36)

---

## 4. Consent Management

### 4.1 GDPR Consent Requirements

**Valid Consent Must Be (Article 7, Recitals 32, 42, 43):**
- **Freely given:** No imbalance of power; no bundling consent with service access (unless processing is truly necessary); no detriment for refusing
- **Specific:** Separate consent for separate purposes; no blanket consent
- **Informed:** Clear identity of controller; specific purposes; what data; right to withdraw; any cross-border transfers; automated decision-making
- **Unambiguous:** Clear affirmative action (tick box, written statement); pre-ticked boxes do not count; silence/inaction does not count
- **Demonstrable:** Controller must be able to prove consent was given (records)
- **Withdrawable:** Must be as easy to withdraw as to give; must be informed of right to withdraw before giving consent

### 4.2 Cookie Compliance

**ePrivacy Directive (2002/58/EC) + GDPR:**
- Consent required for non-essential cookies BEFORE cookies are set
- Essential cookies (strictly necessary for service functioning) exempt
- Categories: Strictly necessary, Functional, Analytics, Marketing/Advertising

**Cookie Banner Requirements:**
- Clearly identify cookie categories and purposes
- Provide granular consent (per category, not just "accept all")
- "Reject all" must be as easy as "Accept all" (French CNIL, recent enforcement)
- No cookie walls (cannot deny access to service for refusing cookies -- debated, but EDPB guidance leans against)
- Store consent records (who consented, when, to what)
- Refresh consent periodically (typically every 12 months)

### 4.3 Consent Management Platforms (CMPs)

| Platform | Features | IAB TCF | Pricing |
|----------|---------|---------|---------|
| OneTrust | Full privacy management suite | Yes | Enterprise pricing |
| Cookiebot (Usercentrics) | Cookie scanning, consent management | Yes | Free tier + paid |
| TrustArc | Compliance platform, cookie consent | Yes | Enterprise pricing |
| Osano | Simple consent management | Yes | Transparent pricing |
| Termly | Cookie consent + policy generation | Yes | Free tier + paid |

---

## 5. Privacy-Preserving Techniques

### 5.1 Anonymization vs. Pseudonymization

**Anonymization:**
- Irreversibly de-identifies data so that individuals cannot be re-identified by ANY means
- Anonymized data is NOT personal data and falls outside GDPR scope entirely
- Extremely difficult to achieve in practice (re-identification attacks, linkage attacks)
- Must consider: all reasonably likely means of re-identification, technological advances, cost of re-identification
- Techniques: k-anonymity, l-diversity, t-closeness, data aggregation with sufficient group sizes

**Pseudonymization (GDPR Article 4(5)):**
- Replaces direct identifiers with pseudonyms (tokens, hashes)
- Data CAN be re-identified using additional information (the key)
- Pseudonymized data IS still personal data under GDPR
- But: recognized as a security measure and may reduce risk (considered in DPIAs)
- Techniques: Tokenization, hashing with salt, encryption with separated keys

### 5.2 Differential Privacy

- Mathematical framework providing formal privacy guarantees
- Adds calibrated statistical noise to query results or datasets
- Prevents inference about any individual from the output
- Epsilon (privacy loss budget): Lower epsilon = more privacy, less utility
- Used by: Apple (iOS usage data), Google (Chrome usage data), US Census Bureau (2020 Census)
- Implementation: OpenDP library, Google's differential privacy libraries, Apple's implementation

### 5.3 Other Privacy-Enhancing Technologies (PETs)

| Technology | Description | Use Case |
|-----------|-------------|----------|
| Homomorphic Encryption | Compute on encrypted data without decryption | Cloud computation on sensitive data |
| Secure Multi-Party Computation | Multiple parties compute jointly without revealing individual inputs | Collaborative analytics without data sharing |
| Federated Learning | Train ML models across distributed datasets without centralizing data | Mobile keyboard prediction, health research |
| Synthetic Data Generation | Create artificial data with same statistical properties as real data | Testing, development, analytics |
| Data Clean Rooms | Controlled environments for multi-party data analysis | Advertising measurement, research collaboration |
| Zero-Knowledge Proofs | Prove a statement is true without revealing the underlying information | Age verification, credential verification |

---

## 6. Data Retention Policies

### 6.1 Retention Principles

- **Minimization:** Do not retain data longer than necessary for the purpose
- **Legal requirements:** Some data must be retained for specific periods (tax: 7 years, employment: varies by state, SEC: varies by record type)
- **Litigation hold:** Preserve data when litigation is reasonably anticipated (supersedes retention schedule)
- **Defensible deletion:** Routine, documented deletion process that follows the retention schedule

### 6.2 Retention Schedule Design

| Data Category | Retention Period | Legal Basis | Automated Deletion? |
|--------------|-----------------|-------------|-------------------|
| Active user account data | Duration of account + 30 days | Contract performance | Yes, upon account deletion |
| Inactive user accounts | 24 months of inactivity, then delete | Legitimate interest | Yes, automated |
| Transaction records | 7 years from transaction date | Tax law (IRC Section 6501) | Yes, batch job |
| Employee records | Duration of employment + 7 years | Employment law + tax | Semi-automated |
| Applicant records | 2 years from application date | EEOC guidance | Yes, automated |
| Server logs | 90 days | Legitimate interest (security) | Yes, log rotation |
| Marketing consent records | Duration of consent + 3 years | GDPR accountability | No, manual review |
| Contract records | Duration of contract + 6 years | Statute of limitations | Semi-automated |
| Customer support tickets | 3 years from resolution | Legitimate interest | Yes, automated |

### 6.3 Automated Retention Implementation

- Tag data with retention category and expiration date at point of collection
- Build automated jobs to identify and delete expired data
- Maintain deletion logs (what was deleted, when, by which policy)
- Exception handling: litigation holds, regulatory investigations override retention schedule
- Regular audits to verify retention automation is functioning correctly

---

*Reference: GDPR (Regulation (EU) 2016/679); Article 29 Working Party Guidelines on DPIAs (WP248); Cavoukian, Privacy by Design: The 7 Foundational Principles; EDPB Guidelines on Consent (05/2020); Dwork & Roth, The Algorithmic Foundations of Differential Privacy; NIST Privacy Framework.*
