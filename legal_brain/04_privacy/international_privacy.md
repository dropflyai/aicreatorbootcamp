# International Privacy -- Cross-Border Data Transfers and Global Frameworks

> Module: `04_privacy/international_privacy.md`
> Brain: Legal Brain
> Authority: Domain-specific (privacy and data protection)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Cross-Border Data Transfer Mechanisms

### 1.1 The Fundamental Challenge

Personal data flows across borders constantly in modern business: cloud hosting, SaaS tools, remote teams, customer support across time zones. Many privacy laws restrict or condition these transfers to ensure data protection continues to apply regardless of where data is physically located.

**Key Framework (GDPR Chapter V):**
Transfers of personal data to countries outside the EU/EEA are prohibited unless one of the following mechanisms is in place:
1. Adequacy decision (Article 45)
2. Appropriate safeguards (Article 46): SCCs, BCRs, approved codes of conduct, approved certification mechanisms
3. Derogations for specific situations (Article 49): Explicit consent, contract necessity, legal claims, vital interests, public interest

### 1.2 Standard Contractual Clauses (SCCs)

**Current SCCs (Commission Implementing Decision 2021/914):**

The 2021 SCCs replaced the previous 2001/2004/2010 SCCs and are modular:

| Module | Scenario | Use Case |
|--------|----------|----------|
| Module 1 | Controller to Controller (C2C) | Sharing data with a partner/joint controller outside EEA |
| Module 2 | Controller to Processor (C2P) | Using a cloud provider/SaaS vendor outside EEA |
| Module 3 | Processor to Processor (P2P) | Your processor uses a sub-processor outside EEA |
| Module 4 | Processor to Controller (P2C) | Returning data to a controller outside EEA |

**Implementation Requirements:**
- SCCs must be executed without modification to the core clauses
- Supplementary clauses can be added (Annex provisions) but cannot contradict the SCCs
- Must be supplemented by a Transfer Impact Assessment (TIA)
- Must implement supplementary measures if TIA identifies risks
- Must keep SCCs up to date (review when circumstances change)

**Common Implementation Mistakes:**
- Failing to complete the annexes (data description, technical measures, sub-processor list)
- Using outdated SCC versions (pre-2021)
- Not conducting a TIA alongside the SCCs
- Treating SCCs as a "set and forget" document (they require ongoing compliance)

### 1.3 Transfer Impact Assessments (TIAs)

**Required by *Schrems II* and EDPB Recommendations 01/2020:**

**Step 1: Know Your Transfer**
- What data is being transferred?
- To which country?
- Which transfer mechanism is being used?
- What is the purpose of the transfer?

**Step 2: Assess the Laws of the Recipient Country**
- Does the recipient country have laws allowing government access to the data?
- Do these laws go beyond what is necessary and proportionate in a democratic society?
- Are there effective legal remedies for data subjects?
- Key concern: US FISA Section 702 and Executive Order 12333 (though mitigated by EO 14086 and the EU-US DPF)

**Step 3: Identify Supplementary Measures**
If the laws of the recipient country create a risk:

| Measure Type | Examples |
|-------------|---------|
| Technical | Encryption with EU-held keys; pseudonymization; split processing |
| Contractual | Transparency commitments; notification of government access requests; legal challenge commitments |
| Organizational | Access restrictions; security certifications; regular audits |

**Step 4: Assess Effectiveness**
- Will the supplementary measures effectively prevent government access to personal data in clear text?
- If not, the transfer cannot take place on the basis of SCCs alone

**Step 5: Document and Re-Evaluate**
- Document the entire assessment
- Re-evaluate periodically and when circumstances change
- Monitor legal developments in the recipient country

### 1.4 EU-US Data Privacy Framework (DPF)

**Background:**
- Safe Harbor invalidated by *Schrems I* (2015)
- Privacy Shield invalidated by *Schrems II* (2020)
- EU-US Data Privacy Framework adopted via adequacy decision (July 2023)

**How DPF Works:**
1. US organizations self-certify with the Department of Commerce
2. Must commit to DPF Principles (notice, choice, accountability, security, data integrity, recourse, enforcement)
3. Must subject themselves to enforcement by FTC or DOT
4. Annual recertification required

**US Safeguards Supporting the DPF:**
- Executive Order 14086 (October 2022): Limits US signals intelligence activities; requires necessity and proportionality
- Data Protection Review Court (DPRC): Independent redress mechanism for EU individuals
- Enhanced oversight of intelligence activities

**Risk Factors:**
- Legal challenges pending (NOYB/Max Schrems has announced challenge)
- DPF adequacy decision could be invalidated (like its predecessors)
- Businesses should maintain SCCs as a backup mechanism even when relying on DPF
- UK Extension to DPF: Separate UK adequacy decision for the UK Extension (adopted October 2023)

### 1.5 Binding Corporate Rules (BCRs)

BCRs are internal rules adopted by a multinational group to allow intra-group transfers of personal data outside the EEA.

**Characteristics:**
- Approved by lead supervisory authority (with cooperation procedure among EU DPAs)
- Bind all entities within the corporate group
- Enforceable by data subjects as third-party beneficiaries
- Cover: data protection principles, data subject rights, cooperation with DPAs, training, audit
- Approval process: 12-24 months (lengthy and expensive)
- Primarily used by large multinationals (>500 entities)

---

## 2. Data Localization Requirements

### 2.1 Countries with Data Localization Laws

| Country | Requirement | Scope | Enforcement |
|---------|------------|-------|------------|
| **Russia** | Personal data of Russian citizens must be stored in Russia (Federal Law 242-FZ) | All personal data | Blocking of websites; fines |
| **China** | Critical information infrastructure operators must store personal data in China (PIPL Article 40, CSL Article 37) | Personal data and important data | CAC review; fines up to 5% of annual revenue |
| **India** | DPDPA 2023: Government can designate countries where transfers are restricted | Potentially broad | Penalties up to INR 250 crore (~$30M) |
| **Vietnam** | Decree 13/2023: Government access data must be stored in Vietnam | Government-related data | Administrative penalties |
| **Indonesia** | GR 71/2019: Strategic electronic systems must have local data center | Strategic systems (government, defense) | License revocation |
| **Turkey** | KVKK: Transfer requires adequate protection or explicit consent or Board approval | All personal data | Fines up to TRY 10M+ |
| **Saudi Arabia** | PDPL: Certain transfers require SDAIA approval | Sensitive data and government data | Fines and criminal penalties |
| **UAE** | DIFC/ADGM have GDPR-like frameworks; federal law developing | Varies by free zone vs. onshore | Free zone regulators; federal TBD |
| **Brazil** | LGPD: No strict localization but transfer conditions apply | Personal data transfers | ANPD enforcement |

### 2.2 Compliance Strategies

**Architecture-Level Solutions:**
- **Regional data centers:** Deploy in regions where data must remain (AWS regions, Azure regions, GCP regions)
- **Data residency controls:** Configure cloud services for data residency (many cloud providers offer this)
- **Data sovereignty offerings:** Use sovereign cloud solutions for highly restricted markets
- **Edge computing:** Process data locally where latency and localization both matter

**Contractual Solutions:**
- Data Processing Agreements specifying data location
- Audit rights to verify data location
- Incident notification for unauthorized cross-border transfers
- Termination rights for data localization breach

---

## 3. APAC Privacy Laws

### 3.1 China -- Personal Information Protection Law (PIPL)

**Effective:** November 1, 2021

**Scope:**
- Applies to processing of personal information of natural persons within China
- Extraterritorial: Applies to processing outside China if purpose is providing products/services to persons in China, or analyzing/assessing behavior of persons in China

**Key Requirements:**
| Requirement | Details |
|-------------|---------|
| Lawful basis | Consent (primary), contract, legal obligation, public health emergency, public interest, legitimate interest (narrow) |
| Consent for sensitive data | Separate, written consent required (sensitive: biometric, health, financial, location, minors' data) |
| Cross-border transfers | Security assessment by CAC (for critical infrastructure operators or large-scale data); OR Standard contract with recipient (filed with provincial CAC); OR Certification by accredited body |
| Data localization | Critical information infrastructure operators and processors of large volumes (>1M individuals) must store data in China; security assessment required for transfers |
| Individual rights | Access, copy, correction, deletion, portability, withdrawal of consent, explanation of automated decisions |
| DPO equivalent | "Person responsible for personal information protection" required for processors above certain thresholds |
| Breach notification | To relevant authority and affected individuals; no specific timeline stated (but "immediately" implied) |
| Penalties | Up to RMB 50M (~$7M) or 5% of prior year's annual revenue; personal liability for responsible persons |

### 3.2 Singapore -- Personal Data Protection Act (PDPA)

**Key Requirements:**
- Consent-based framework (with exceptions for legitimate interests, business improvement, research)
- Data Protection Officer required for all organizations
- Data breach notification to PDPC within 3 business days if significant harm
- Transfer restrictions: Recipient must provide comparable protection
- Do Not Call Registry for marketing
- Penalties: Up to SGD 1M or 10% of annual turnover (for organizations with turnover >SGD 10M)

### 3.3 Japan -- Act on Protection of Personal Information (APPI)

**Key Features:**
- EU adequacy decision in place (mutual recognition)
- Consent-based framework with "opt-out" mechanism for certain disclosures
- Cross-border transfers: Consent or equivalent protection in recipient country
- Personal Information Protection Commission (PPC) as supervisory authority
- 2022 amendments: Strengthened individual rights, breach notification, penalties

### 3.4 South Korea -- Personal Information Protection Act (PIPA)

**Key Features:**
- EU adequacy decision obtained (December 2022)
- One of the strictest Asian privacy laws
- Consent requirements (separate consent for sensitive data, marketing, cross-border transfers)
- Personal Information Protection Commission (PIPC) as supervisory authority
- Criminal penalties for certain violations (up to 5 years imprisonment)
- 2023 amendments: Introduced pseudonymized data framework for research/statistics

---

## 4. Brazil -- Lei Geral de Protecao de Dados (LGPD)

### 4.1 Overview

**Effective:** September 2020; enforcement from August 2021

**Scope:** Processing of personal data of individuals located in Brazil, or data collected in Brazil, or goods/services offered to individuals in Brazil.

**Key Provisions:**
| Area | LGPD Requirement | GDPR Comparison |
|------|-----------------|-----------------|
| Lawful bases | 10 bases (consent, contract, legal obligation, legitimate interest, + credit protection, health protection, research, legal proceedings, vital interests, public administration) | Similar but LGPD adds credit protection and health-specific bases |
| Consent | Must be free, informed, unambiguous; written consent must be in separate clause | Very similar to GDPR |
| DPO equivalent | "Encarregado" (Data Protection Officer) -- required for all controllers | GDPR has threshold-based DPO requirement |
| Breach notification | To ANPD (National Data Protection Authority) within "reasonable time" | GDPR: 72 hours (more specific) |
| Cross-border transfers | Adequacy, SCCs, BCRs, specific consent, cooperation agreements | Similar mechanisms; ANPD developing specific rules |
| Penalties | Up to 2% of revenue in Brazil (capped at BRL 50M per violation) | GDPR: Up to 4% of global revenue |
| Individual rights | Access, correction, anonymization, portability, deletion, information about sharing, consent withdrawal, information about non-consent consequences | Substantially similar to GDPR |

### 4.2 ANPD Enforcement Posture

- ANPD is still building enforcement capacity
- First administrative sanctions issued in 2023
- Expected to increase enforcement significantly through 2025-2026
- International cooperation agreements with EU DPAs
- Regulation of international transfers still developing (ANPD published draft SCCs in 2024)

---

## 5. Global Privacy Compliance Strategy

### 5.1 Unified Compliance Framework

**Approach: Build to the highest common denominator, then add jurisdiction-specific layers.**

**Base Layer (Global Standard -- aligned with GDPR):**
- Data minimization as default
- Purpose limitation documented for all processing
- Consent obtained where required (with granularity)
- Data subject rights mechanism (handles GDPR, CCPA, PIPL, LGPD requests)
- DPA/processor agreements with all vendors
- Security measures (encryption, access control, monitoring)
- Breach notification process (adaptable to each jurisdiction's timeline)
- Data retention and deletion automation
- Regular DPIAs for high-risk processing

**Jurisdiction-Specific Layers:**
| Jurisdiction | Additional Requirements |
|-------------|----------------------|
| EU/EEA | SCCs/DPF for transfers; DPO; ROPA; cookie consent |
| California | "Do Not Sell/Share" opt-out; GPC support; service provider agreements |
| China | Local storage (if applicable); CAC security assessment for transfers; separate consent for sensitive data |
| Brazil | Encarregado appointment; ANPD registration; LGPD-specific consent language |
| UK | UK GDPR + ICO guidance; UK-specific SCCs (IDTA); UK Extension to DPF |

### 5.2 Privacy Governance Structure

```
Chief Privacy Officer (CPO) / DPO
├── Privacy Legal (regulatory monitoring, policy, contracts)
├── Privacy Engineering (PbD, DPIAs, technical controls)
├── Privacy Operations (DSR handling, vendor management, training)
└── Regional Privacy Leads (jurisdiction-specific compliance)
    ├── EU/UK Privacy Lead
    ├── US Privacy Lead (multi-state)
    ├── APAC Privacy Lead
    └── LATAM Privacy Lead
```

### 5.3 Monitoring Regulatory Developments

**Continuous Monitoring Requirements:**
- New privacy laws enacted (5-15 new comprehensive laws per year globally)
- Amendments to existing laws (GDPR, CCPA, PIPL all actively evolving)
- Regulatory guidance and enforcement actions (signals enforcement priorities)
- Court decisions affecting data protection (e.g., Schrems line of cases)
- International negotiations (new adequacy decisions, transfer frameworks)

**Resources:**
- IAPP (International Association of Privacy Professionals): Global Privacy Law Tracker
- OneTrust DataGuidance: Multi-jurisdictional privacy law database
- DLA Piper Data Protection Laws of the World
- National supervisory authority websites (EDPB, CNIL, ICO, BfDI, ANPD, CAC, PIPC)

---

*Reference: Schrems II (Case C-311/18, CJEU 2020); EDPB Recommendations 01/2020 on Supplementary Measures; EU Commission Implementing Decision 2021/914 (SCCs); EU-US DPF Adequacy Decision (July 2023); EO 14086; PIPL (PRC); LGPD (Brazil); Greenleaf, Asian Data Privacy Laws (2nd ed.); UNCTAD Data Protection Legislation Worldwide.*
