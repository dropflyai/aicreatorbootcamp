# Privacy Law -- GDPR, CCPA/CPRA, and Global Privacy Frameworks

> Module: `04_privacy/privacy_law.md`
> Brain: Legal Brain
> Authority: Domain-specific (privacy and data protection)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. GDPR Deep Dive

The General Data Protection Regulation (EU) 2016/679 is the most comprehensive and influential privacy law globally. It applies to any organization processing personal data of individuals in the EU/EEA, regardless of where the organization is established.

### 1.1 Scope and Applicability

**Material Scope (Article 2):**
- Applies to processing of personal data wholly or partly by automated means
- Applies to non-automated processing of personal data forming part of a filing system
- Excludes: purely personal/household activities, law enforcement (separate directive), national security

**Territorial Scope (Article 3):**
1. Organizations established in the EU (regardless of where processing occurs)
2. Organizations NOT in the EU but offering goods/services to EU individuals (targeting criterion)
3. Organizations NOT in the EU but monitoring behavior of EU individuals (tracking, profiling)

**Key Definitions:**
- **Personal Data (Article 4(1)):** Any information relating to an identified or identifiable natural person (name, email, IP address, cookie IDs, device IDs, location data, genetic data, biometric data)
- **Processing (Article 4(2)):** Any operation on personal data (collection, recording, storage, alteration, retrieval, consultation, use, disclosure, erasure)
- **Controller (Article 4(7)):** Determines the purposes and means of processing
- **Processor (Article 4(8)):** Processes data on behalf of the controller

### 1.2 Lawful Bases for Processing (Article 6)

Every processing activity must have a lawful basis. You must identify and document the basis BEFORE processing begins.

| Lawful Basis | When to Use | Key Requirements |
|-------------|-------------|-----------------|
| **Consent (6(1)(a))** | Marketing emails, cookies, non-essential tracking | Freely given, specific, informed, unambiguous; affirmative action; easy withdrawal |
| **Contract (6(1)(b))** | Processing necessary to perform a contract with the data subject | Must be genuinely necessary, not merely useful |
| **Legal Obligation (6(1)(c))** | Tax records, anti-money laundering, employment law | Must identify the specific legal obligation |
| **Vital Interests (6(1)(d))** | Emergency medical situations | Rarely applicable in tech/business context |
| **Public Interest (6(1)(e))** | Government functions, public health | Rarely applicable for private companies |
| **Legitimate Interests (6(1)(f))** | Fraud prevention, network security, direct marketing to existing customers, analytics | Requires balancing test (LIA); not available for public authorities |

**Legitimate Interest Assessment (LIA) Framework:**
1. **Purpose test:** Is there a legitimate interest? (business need, security, fraud prevention)
2. **Necessity test:** Is the processing necessary to achieve that interest? (no less intrusive alternative)
3. **Balancing test:** Do the data subject's rights and freedoms override the legitimate interest?
4. **Document the assessment** (GDPR requires accountability)

### 1.3 Data Subject Rights (Articles 15-22)

| Right | Description | Response Deadline | Exceptions |
|-------|-------------|------------------|------------|
| Access (Art. 15) | Obtain copy of personal data being processed | 1 month | Manifestly unfounded/excessive requests |
| Rectification (Art. 16) | Correct inaccurate personal data | 1 month | None significant |
| Erasure (Art. 17) | "Right to be forgotten" -- delete personal data | 1 month | Legal obligation, public interest, legal claims |
| Restriction (Art. 18) | Limit processing while disputes are resolved | 1 month | Can still store data; just cannot process |
| Portability (Art. 20) | Receive data in machine-readable format | 1 month | Only for consent/contract-based processing |
| Object (Art. 21) | Object to processing based on legitimate interests | Without undue delay | Must demonstrate compelling legitimate grounds |
| Automated decisions (Art. 22) | Not be subject to solely automated decisions with legal/significant effects | No specific deadline | Consent, contract necessity, or legal authorization |

### 1.4 Data Protection Officer (DPO) Requirement

**DPO mandatory when (Article 37):**
- Public authority or body (except courts)
- Core activities involve regular and systematic monitoring of data subjects on a large scale
- Core activities involve large-scale processing of special category data or criminal conviction data

**DPO Characteristics:**
- Must be independent (cannot be instructed regarding exercise of tasks)
- Must have expert knowledge of data protection law
- Can be internal employee or external service provider
- Must be given adequate resources
- Reports to highest management level
- No conflict of interest (cannot determine purposes/means of processing)

### 1.5 Cross-Border Data Transfers (Chapter V)

**Adequacy Decisions (Article 45):**
Countries deemed to provide adequate protection: Andorra, Argentina, Canada (PIPEDA), Faroe Islands, Guernsey, Israel, Isle of Man, Japan, Jersey, New Zealand, Republic of Korea, Switzerland, UK, Uruguay, and the US (limited to Data Privacy Framework participants).

**Standard Contractual Clauses (SCCs) (Article 46(2)(c)):**
- EU Commission-approved contract terms for data transfers
- New SCCs (June 2021) are modular: Controller-to-Controller, Controller-to-Processor, Processor-to-Processor, Processor-to-Controller
- Must be supplemented with Transfer Impact Assessment (TIA)
- Cannot be modified (can add supplementary clauses that do not contradict SCCs)

**Transfer Impact Assessments (TIAs):**
Post-*Schrems II* requirement. Must assess:
1. Laws of the recipient country regarding government access to data
2. Whether the transfer mechanism provides essentially equivalent protection
3. Whether supplementary measures are needed (encryption, pseudonymization, contractual commitments)
4. Document the assessment and keep it up to date

### 1.6 Data Breach Notification (Articles 33-34)

**To Supervisory Authority (Article 33):**
- Notify within **72 hours** of becoming aware of a breach
- Unless the breach is unlikely to result in a risk to rights and freedoms
- If notification is delayed beyond 72 hours, must provide reasons for delay
- Content: Nature of breach, categories and approximate number of data subjects, DPO contact, likely consequences, measures taken

**To Data Subjects (Article 34):**
- Required when breach is likely to result in **high risk** to rights and freedoms
- Without undue delay (no specific time limit)
- In clear and plain language
- Can be exempted if: data was encrypted, measures eliminate risk, disproportionate effort (public communication instead)

---

## 2. CCPA/CPRA (California)

### 2.1 Applicability

The California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), applies to for-profit businesses that:
1. Have annual gross revenue exceeding $25 million; OR
2. Buy, sell, or share personal information of 100,000+ consumers, households, or devices; OR
3. Derive 50% or more of annual revenue from selling or sharing consumers' personal information

### 2.2 Consumer Rights

| Right | Description | Key Differences from GDPR |
|-------|-------------|--------------------------|
| Right to Know | Categories and specific pieces of PI collected | Similar to GDPR access right |
| Right to Delete | Request deletion of PI | Similar to GDPR erasure |
| Right to Opt-Out of Sale/Sharing | Opt out of sale or sharing of PI for cross-context behavioral advertising | No GDPR equivalent (GDPR uses consent) |
| Right to Correct | Correct inaccurate PI | Added by CPRA; similar to GDPR rectification |
| Right to Limit Use of Sensitive PI | Limit use of sensitive PI to what is necessary | CPRA addition; partially analogous to GDPR special categories |
| Right to Non-Discrimination | Cannot discriminate against consumers exercising rights | GDPR has similar principle (Art. 77) |

### 2.3 Service Provider vs. Contractor

**Service Provider:**
- Processes PI on behalf of the business pursuant to a written contract
- Contract must prohibit: selling/sharing PI, retaining/using PI for any purpose other than performing services, combining with PI from other sources (with exceptions)
- Business can disclose PI to service provider without it being a "sale"

**Contractor:**
- Receives PI from a business pursuant to a written contract
- Similar contractual restrictions as service providers
- Must allow business to audit compliance with the contract
- Added by CPRA; essentially a stricter service provider relationship

### 2.4 Opt-Out Requirements

**"Do Not Sell or Share My Personal Information" Link:**
- Must be displayed on the business's website homepage
- Must be a clear, conspicuous link
- Must enable consumers to opt out of sale AND sharing
- "Sharing" = providing PI to third parties for cross-context behavioral advertising (CPRA addition)
- Must honor Global Privacy Control (GPC) signals (CPRA regulation)

### 2.5 Enforcement

- **California Privacy Protection Agency (CPPA):** Primary enforcement body (created by CPRA)
- **California Attorney General:** Retains enforcement authority
- **Private Right of Action:** Limited to data breaches involving unauthorized access due to failure to implement reasonable security (Section 1798.150)
- **Penalties:** Up to $2,500 per violation (unintentional); $7,500 per intentional violation; $7,500 per violation involving minor's data

---

## 3. US State Privacy Law Landscape

### 3.1 Comprehensive State Privacy Laws

As of 2025, the following states have enacted comprehensive privacy laws:

| State | Law | Effective Date | Key Differences |
|-------|-----|---------------|-----------------|
| California | CCPA/CPRA | Jan 2023 (CPRA amendments) | Most comprehensive; private right of action for breaches |
| Virginia | VCDPA | Jan 2023 | No private right of action; no revenue threshold |
| Colorado | CPA | Jul 2023 | Universal opt-out mechanism; covers nonprofits |
| Connecticut | CTDPA | Jul 2023 | Recognizes GPC signals; loyalty program protections |
| Utah | UCPA | Dec 2023 | Most business-friendly; highest thresholds |
| Texas | TDPSA | Jul 2024 | No revenue threshold; applies to ALL businesses |
| Oregon | OCPA | Jul 2024 | Covers nonprofits; one of the broadest |
| Montana | MCDPA | Oct 2024 | Lowest population threshold (50K residents) |
| Iowa | ICDPA | Jan 2025 | No opt-in for targeted ads; no data protection assessments |
| Delaware | DPDPA | Jan 2025 | Broad definition of "consumer"; low thresholds |
| Tennessee | TIPA | Jul 2025 | Affirmative defense for privacy programs aligned with NIST |
| Indiana, Florida, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, Nebraska, Rhode Island | Various | 2025-2026 | Various thresholds and requirements |

### 3.2 Compliance Strategy for Multi-State

**Highest Common Denominator Approach:**
- Implement CCPA/CPRA-level protections nationwide (most stringent)
- Maintain state-specific notices where required
- Implement universal opt-out mechanisms (GPC compliance covers multiple states)
- Conduct data protection assessments for high-risk processing (required by several states)
- Monitor new state laws (average 5-10 new state privacy laws per year)

---

## 4. Children's Privacy (COPPA)

### 4.1 COPPA Requirements

The Children's Online Privacy Protection Act applies to:
- Websites/apps directed to children under 13; OR
- Websites/apps with actual knowledge of collecting PI from children under 13

**Key Requirements:**
- Verifiable parental consent before collecting PI from children
- Clear privacy policy describing data practices for children
- Parents can review, delete, and refuse further collection
- Cannot condition participation on unnecessary data collection
- Reasonable security for children's data
- Data retention limited to what is reasonably necessary

### 4.2 COPPA Enforcement and Penalties

- Enforced by FTC (significant enforcement activity)
- Civil penalties up to $50,120 per violation (as adjusted for inflation)
- Major enforcement actions: Epic Games ($275M, 2022), Google/YouTube ($170M, 2019), Musical.ly/TikTok ($5.7M, 2019)

### 4.3 Age Verification and Age-Appropriate Design

- FTC COPPA Rule update (effective 2025): Stricter requirements for connected devices, ed-tech
- California Age-Appropriate Design Code (AB 2273): Requires DPIA for products likely accessed by children; default high privacy settings
- UK Age Appropriate Design Code (Children's Code): 15 standards for services likely accessed by children

---

## 5. Privacy Compliance Implementation

### 5.1 Compliance Checklist

- [ ] Data mapping completed (what data, where stored, why collected, who accesses, retention period)
- [ ] Lawful basis identified for each processing activity (GDPR) / purpose disclosed (CCPA)
- [ ] Privacy policy published and current (reviewed quarterly)
- [ ] Cookie consent mechanism implemented (for EU users)
- [ ] Opt-out mechanism implemented (for CCPA "Do Not Sell/Share")
- [ ] Data subject/consumer rights request process established
- [ ] Data Processing Agreements in place with all processors/service providers
- [ ] Cross-border transfer mechanisms documented (SCCs, DPF)
- [ ] Data breach notification process documented and tested
- [ ] DPO appointed (if required under GDPR)
- [ ] Data Protection Impact Assessments conducted for high-risk processing
- [ ] Employee training on privacy obligations completed (annual)
- [ ] Record of Processing Activities (ROPA) maintained (GDPR Article 30)

---

*Reference: GDPR (Regulation (EU) 2016/679); CCPA (Cal. Civ. Code Section 1798.100 et seq.); CPRA (Prop. 24, 2020); COPPA (15 USC Section 6501 et seq.); Schrems II (Case C-311/18); IAPP Global Privacy Law Tracker; Schwartz & Solove, Information Privacy Law (7th ed.).*
