# SaaS Contracts -- Software-as-a-Service Agreement Architecture

> Module: `02_contracts/saas_contracts.md`
> Brain: Legal Brain
> Authority: Domain-specific (contracts)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. SaaS Agreement Architecture

### 1.1 Two-Tier Structure: MSA + Order Form

The industry standard for enterprise SaaS is a two-tier structure separating commercial terms from legal terms.

**Master Service Agreement (MSA):**
- Contains all legal terms and conditions
- Governs the overall relationship
- Signed once; applies to all Order Forms
- Includes: definitions, license grant, restrictions, confidentiality, warranties, indemnification, limitation of liability, termination, general provisions

**Order Form (OF):**
- Contains commercial terms for a specific purchase
- References and incorporates the MSA
- Includes: products/services subscribed, subscription term, pricing, payment terms, user count/tier, any special terms
- Multiple Order Forms can exist under one MSA

**Hierarchy of Documents (Typical):**
1. Order Form (most specific) -- controls in case of conflict
2. Data Processing Agreement (DPA) -- for privacy-specific terms
3. Master Service Agreement (MSA) -- general terms
4. Acceptable Use Policy (AUP) -- use restrictions
5. Service Level Agreement (SLA) -- performance commitments
6. Documentation -- product specifications

**Why This Structure Works:**
- Sales team can execute Order Forms without legal review for standard deals
- Legal terms are negotiated once and applied consistently
- Changes to commercial terms do not require re-negotiating legal terms
- Scales efficiently: one MSA, many Order Forms over time

### 1.2 Self-Serve vs. Enterprise Agreements

| Dimension | Self-Serve (Click-Through) | Enterprise (Negotiated) |
|-----------|---------------------------|------------------------|
| Structure | ToS + Privacy Policy | MSA + OF + DPA + SLA |
| Negotiation | Take-it-or-leave-it | Negotiated (redlines/markups) |
| Pricing | Published; per-seat or usage | Custom; volume discounts |
| Legal review | Customer's counsel rarely reviews | Customer's counsel reviews and marks up |
| SLA | Standard (if any) | Negotiated uptime, credits, remedies |
| Data terms | Standard privacy policy | Custom DPA with specific commitments |
| Typical ACV | <$25K | >$25K (often >$100K) |
| Enforceability risk | Higher (adhesion contract arguments) | Lower (both parties negotiated) |

### 1.3 License Grant

**SaaS License Grant Elements:**
- **Scope:** Non-exclusive, non-transferable, non-sublicensable right to access and use the service
- **Territory:** Worldwide (or limited to specific countries if required)
- **Duration:** During the subscription term specified in the Order Form
- **Users:** Named users, concurrent users, or site license (as specified)
- **Purpose:** Internal business operations (not resale, unless reseller agreement)
- **Restrictions:** No reverse engineering, no copying, no derivative works, no competitive use

**Critical Distinctions:**
- SaaS is typically a service, not a license (no transfer of software copies)
- This matters for: revenue recognition (ASC 606), tax treatment, bankruptcy (Section 365 of Bankruptcy Code), and IP ownership
- Characterize as "subscription to access" rather than "license to use" where possible

---

## 2. Service Level Agreements (SLAs)

### 2.1 Uptime Commitments

**Standard Tiers:**
| Tier | Uptime % | Downtime/Year | Downtime/Month | Typical For |
|------|----------|---------------|----------------|-------------|
| Standard | 99.5% | 43.8 hours | 3.65 hours | SMB SaaS |
| Enhanced | 99.9% | 8.77 hours | 43.8 minutes | Enterprise SaaS |
| Premium | 99.95% | 4.38 hours | 21.9 minutes | Mission-critical |
| Ultra | 99.99% | 52.6 minutes | 4.38 minutes | Infrastructure/platform |

**Measurement:**
- Uptime = (Total minutes in period - Downtime minutes) / Total minutes in period x 100
- Measured monthly (calendar month) unless otherwise specified
- Monitoring methodology should be specified (vendor monitoring, third-party monitoring, customer reporting)

### 2.2 SLA Exclusions

**Standard exclusions from downtime calculation:**
- Scheduled maintenance (with advance notice, typically 48-72 hours; during maintenance windows)
- Force majeure events
- Customer-caused outages (misconfiguration, exceeding usage limits)
- Third-party service failures (internet connectivity, customer's infrastructure)
- Alpha/beta features
- Free tier or trial accounts
- Features or services not covered by the specific SLA

### 2.3 Service Level Credits

**Credit Structure:**
| Monthly Uptime | Service Credit (% of Monthly Fees) |
|---------------|-------------------------------------|
| 99.0% - 99.9% | 10% |
| 95.0% - 99.0% | 25% |
| Below 95.0% | 50% (or termination right) |

**Credit Mechanics:**
- Credits are applied to future invoices (not refunded as cash unless contract terminates)
- Customer must request credits within specified timeframe (typically 30 days)
- Maximum credit per month typically capped (e.g., 50% of monthly fees)
- Credits are the "sole and exclusive remedy" for SLA failures (important vendor protection)

### 2.4 SLA for Non-Uptime Metrics

Beyond uptime, enterprise customers increasingly demand SLAs for:
- **Response Time:** API latency (e.g., 95th percentile < 200ms)
- **Support Response Time:** Time to first response by severity level
- **Data Recovery:** RPO (Recovery Point Objective) and RTO (Recovery Time Objective)
- **Security Incident Response:** Time to notify customer of security incident
- **Data Deletion:** Time to delete customer data after termination

---

## 3. Data Processing Agreements (DPAs)

### 3.1 When a DPA Is Required

A DPA is required whenever the vendor processes personal data on behalf of the customer:
- GDPR Article 28: Controller must have a contract with processor
- CCPA/CPRA: Requires service provider agreement for businesses sharing consumer data
- HIPAA: Business Associate Agreement (BAA) required for PHI
- Many enterprise customers require DPAs regardless of legal obligation

### 3.2 DPA Structure and Key Terms

**Mandatory GDPR DPA Provisions (Article 28(3)):**
1. Subject matter and duration of processing
2. Nature and purpose of processing
3. Type of personal data and categories of data subjects
4. Controller's obligations and rights
5. Processor's obligations:
   - Process only on documented instructions
   - Ensure personnel are bound by confidentiality
   - Implement appropriate technical and organizational measures (Article 32)
   - Assist controller with data subject rights requests
   - Assist with DPIA and prior consultation
   - Delete or return data at end of service
   - Make available information to demonstrate compliance; allow audits
   - Notify controller of sub-processor changes

### 3.3 Sub-Processor Management

**Customer concerns:** Who else touches my data?
**Vendor approach:**
- Maintain a list of sub-processors (published on website or provided on request)
- Notification mechanism for sub-processor changes (email, RSS, website update)
- Objection right for customer (typically 30 days to object; if objection not resolved, termination right)
- Flow-down obligations: Sub-processor contracts must contain equivalent data protection terms
- Vendor remains liable for sub-processor acts and omissions

### 3.4 Cross-Border Data Transfers

**Post-Schrems II Mechanisms:**
- Standard Contractual Clauses (SCCs) -- EU Commission approved (June 2021 version)
- Transfer Impact Assessments (TIAs) required alongside SCCs
- EU-US Data Privacy Framework (DPF) -- adequacy decision July 2023 (but legal challenges pending)
- Supplementary measures if government access risk is high
- Data localization: Some customers require data to remain in specific regions (EU, specific country)

---

## 4. Acceptable Use Policies (AUPs)

### 4.1 Purpose and Structure

The AUP defines prohibited uses of the service. It protects the vendor from liability arising from customer misuse.

**Standard AUP Prohibitions:**
- Illegal activity or content
- Intellectual property infringement
- Malware, spam, phishing
- Unauthorized access or security testing (without prior written consent)
- Actions that degrade service for other customers
- Resale of the service without authorization
- Use in violation of export controls or sanctions
- Processing data in violation of privacy laws
- Content restrictions (hate speech, harassment, CSAM, violence)

### 4.2 Enforcement

**Enforcement Escalation:**
1. Notice of violation with cure period
2. Suspension of service (immediate for severe violations; after cure period for others)
3. Termination for repeated or uncured violations

**Due Process Concerns:**
- Enterprise customers will negotiate: no suspension without notice (except for immediate security threats)
- Right to cure before termination
- Right to retrieve data before account deletion
- Appeal process for AUP enforcement decisions

---

## 5. Auto-Renewal and Termination

### 5.1 Subscription Terms

**Auto-Renewal (Evergreen) Clauses:**
- Contract automatically renews for successive periods unless notice of non-renewal is given
- Notice period: Typically 30-90 days before end of current term
- Renewal term: Same as initial term, or month-to-month, or 1-year (negotiate)
- Price increase on renewal: Cap at a percentage (3-7% or CPI) or require notice of price change

**Auto-Renewal Laws:**
- Several states regulate automatic renewals for consumers (California SB-313, New York GBL 527-a)
- B2B auto-renewal: Less regulated but increasingly scrutinized
- Best practice: Clear disclosure of auto-renewal terms, easy cancellation process

### 5.2 Termination Provisions

**Termination for Convenience:**
- Customer may want right to terminate at any time (vendor typically resists for annual contracts)
- Compromise: Termination for convenience with early termination fee (remaining contract value, or 50% of remaining)
- Vendor termination for convenience: Rare in enterprise; must include adequate wind-down period

**Termination for Cause:**
- Material breach not cured within 30 days of written notice
- Insolvency, bankruptcy filing, assignment for benefit of creditors
- Change of control (may trigger termination right)
- Repeated breaches (even if individually cured)
- Violation of law that affects the service or the other party

### 5.3 Post-Termination Data Rights

**Customer Data Return/Deletion:**
- Transition period: 30-90 days post-termination for customer to export data
- Format: Machine-readable, commonly used format (CSV, JSON, or standard export format)
- Deletion: Vendor must delete all customer data after transition period (with certification)
- Exceptions: Legal hold requirements, aggregate/anonymized data, backup retention (with defined deletion schedule)

---

## 6. Professional Services SOWs

### 6.1 Statement of Work Structure

When SaaS includes implementation, customization, or consulting services:

**SOW Elements:**
- Description of services (detailed scope)
- Deliverables (with acceptance criteria)
- Timeline and milestones
- Resources (named individuals or role descriptions)
- Customer responsibilities and dependencies
- Fees and payment schedule (fixed fee, T&M, or milestone-based)
- Change order process
- Acceptance testing procedure
- IP ownership of deliverables

### 6.2 IP Ownership in SOWs

**Three models:**
1. **Vendor owns all:** Vendor owns all deliverables; customer gets license. Vendor preferred.
2. **Customer owns custom work:** Customer owns customizations/configurations; vendor retains pre-existing IP and platform. Balanced.
3. **Customer owns all:** Customer owns all deliverables. Rare; expensive; limits vendor's ability to improve product.

**Best practice for SaaS:** Vendor retains all IP in the platform and pre-existing materials. Customer owns its data and any customer-specific content. Work product created under SOW: vendor retains pre-existing IP with license to customer; customer-specific configurations and custom code may be assigned to customer or licensed to customer.

### 6.3 Acceptance Testing

**Process:**
1. Vendor delivers the deliverable
2. Customer has defined review period (typically 10-15 business days)
3. Customer accepts, rejects with specific deficiency list, or deemed accepted if no response
4. Vendor cures deficiencies and resubmits
5. Repeat until accepted or contract provides termination right after defined number of rejection cycles
6. Payment milestone triggered upon acceptance

---

## 7. Negotiation Prioritization

### 7.1 Terms Worth Fighting For (As Vendor)

1. Limitation of liability (cap at 12 months fees; exclude consequential damages)
2. IP ownership (vendor retains all platform IP)
3. Indemnification scope (mutual; capped; defined process)
4. Auto-renewal with adequate notice period
5. Governing law and venue (home jurisdiction)
6. Warranty disclaimers (AS-IS except for limited warranties)

### 7.2 Terms Worth Fighting For (As Customer)

1. Data ownership and portability (customer owns all customer data)
2. SLA with meaningful credits and termination rights
3. Data security commitments (specific controls, audit rights, breach notification)
4. Termination rights (for cause with reasonable cure; for convenience with pro-rata refund)
5. Indemnification for IP infringement and data breach
6. Carve-outs from limitation of liability for data breach and IP infringement

---

*Reference: SaaStr SaaS Agreement Best Practices; ACC Model SaaS Agreement; Gartner IT Contract Negotiation Guides; GDPR Article 28; CCPA/CPRA service provider requirements.*
