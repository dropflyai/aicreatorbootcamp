# Contract Negotiation -- Strategy, Playbooks, and Process at Scale

> Module: `02_contracts/contract_negotiation.md`
> Brain: Legal Brain
> Authority: Domain-specific (contracts)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Negotiation Strategy for Startups

### 1.1 Fundamental Principles

**Leverage Assessment:**
Before negotiating, honestly assess your leverage position:

| Factor | More Leverage | Less Leverage |
|--------|--------------|---------------|
| Market position | Only viable solution | Commodity product, many alternatives |
| Deal size relative to counterparty | Large customer for them | Small customer for them |
| Switching costs | High (deep integration) | Low (easy to replace) |
| Time pressure | They have deadline | You have deadline |
| Alternatives | Multiple options | No alternatives |
| Relationship | Established, trusted | New, unproven |
| Regulatory | Their compliance depends on you | Your compliance depends on them |

**Strategic Principles:**
1. **Know your BATNA** (Best Alternative to a Negotiated Agreement) -- Fisher & Ury, *Getting to Yes*
2. **Negotiate interests, not positions** -- understand *why* the other side wants a specific term
3. **Trade, don't concede** -- every concession should be matched by a gain elsewhere
4. **Create value before claiming value** -- expand the pie before dividing it
5. **Separate the people from the problem** -- maintain relationship while advocating for terms
6. **Use objective criteria** -- market standards, benchmarks, legal precedent
7. **Never negotiate against yourself** -- make your proposal and wait for their response

### 1.2 What to Fight For

**Non-Negotiable (Red Lines):**
These terms are fundamental to your business viability. Walk away if you cannot achieve acceptable positions.

As Vendor:
- IP ownership of your platform and technology
- Reasonable limitation of liability (cannot accept unlimited liability)
- Right to use aggregated/anonymized data for product improvement
- Ability to modify the service (with reasonable notice for material changes)
- Right to suspend service for non-payment or security threats

As Customer:
- Ownership of your data (input, output, derived data)
- Right to export/retrieve data upon termination
- Adequate data security commitments
- Breach notification within a defined timeframe
- Right to terminate for material uncured breach

**Important but Negotiable (Fight Hard):**
- Liability cap amount (12 months vs. 24 months of fees)
- Indemnification scope and carve-outs
- SLA credits and termination thresholds
- Auto-renewal notice period and renewal pricing
- Audit rights and frequency
- Governing law and dispute resolution

**Nice-to-Have (Concede if Needed):**
- Favorable payment terms (net-30 vs. net-60)
- Specific performance metrics beyond standard SLA
- Most-favored-customer pricing clauses
- Unlimited user provisions
- Extended warranty periods
- Broader use rights

### 1.3 Common Concession Trades

| You Give | You Get |
|----------|---------|
| Higher liability cap | Longer contract term |
| Broader indemnification | Higher contract value |
| Custom SLA | Premium pricing |
| Audit rights | Advance notice requirement + cost sharing for audits |
| Favorable payment terms | Early payment discount or prepayment |
| Change of control termination right | Termination fee |
| Custom data handling | DPA that covers their compliance needs without excessive obligations |

---

## 2. Enterprise Customer Contract Negotiation

### 2.1 Understanding Enterprise Procurement

**Enterprise Legal Teams Will Focus On:**
1. **Data security and privacy** -- Their #1 concern (data breach liability, regulatory compliance)
2. **Limitation of liability** -- They want higher caps or uncapped for certain breaches
3. **Indemnification** -- They want broad vendor indemnification for IP, data breach, negligence
4. **Business continuity** -- Escrow, transition assistance, data portability
5. **Audit rights** -- Right to audit vendor's security, compliance, and financials
6. **Insurance** -- Minimum insurance requirements (cyber, E&O, general liability)
7. **Compliance** -- SOC 2, ISO 27001, GDPR, HIPAA, specific industry requirements

**Enterprise Negotiation Timeline:**
| Phase | Duration | Activities |
|-------|----------|-----------|
| Initial review | 1-2 weeks | Customer legal reviews vendor paper |
| First markup | 1-2 weeks | Customer returns redlined agreement |
| Vendor response | 1 week | Vendor legal reviews and responds to markup |
| Negotiation | 2-4 weeks | 2-4 rounds of markup exchange |
| Escalation | 1-2 weeks | Business/legal escalation on remaining issues |
| Execution | 1 week | Signature, countersignature |
| **Total** | **6-12 weeks** | **Plan accordingly in sales cycle** |

### 2.2 Responding to Enterprise Markups

**Triage Protocol:**
1. **Accept immediately:** Changes that are reasonable and align with market standards
2. **Accept with modification:** Changes that reflect a legitimate concern but are overbroad in their proposed language
3. **Reject with alternative:** Changes that are unacceptable but where you can offer an alternative that addresses the underlying concern
4. **Reject outright:** Changes that fundamentally conflict with your business model, risk tolerance, or legal position

**Response Format:**
- Use Track Changes in Word (industry standard for legal markup)
- Include comments explaining rejections and alternatives
- Group changes by theme (liability, data, IP, commercial) for organized discussion
- Prepare a summary of key open issues for a negotiation call

### 2.3 Large Enterprise-Specific Provisions

**Provisions that large enterprises commonly require:**
- **Most Favored Customer (MFC):** Assurance that pricing is no less favorable than similarly situated customers. Resist or narrow: "no less favorable than customers purchasing the same products at the same volume with the same terms."
- **Benchmarking Rights:** Right to benchmark pricing against market. Counter: Limit frequency (once per year), require use of specified benchmarking firm, cost sharing.
- **Step-In Rights:** Right for customer to assume control of services upon vendor's failure. Typical in outsourcing; unusual in SaaS.
- **Source Code Escrow:** Access to source code upon vendor insolvency or material service failure. Consider: cost of escrow agent, conditions for release, practical utility of source code without vendor expertise.
- **Business Continuity Planning:** Vendor must maintain BCP/DR plans, share summaries, demonstrate testing.

---

## 3. Vendor Contract Negotiation

### 3.1 Negotiating as a Customer with Your Vendors

**Priority Terms When Buying:**
1. **Data ownership and portability** -- You must own your data and be able to export it
2. **Security commitments** -- SOC 2, encryption, access controls, breach notification
3. **Service levels** -- Uptime, support response times, with meaningful remedies
4. **Termination flexibility** -- Ability to exit with reasonable notice and data retrieval
5. **Price protection** -- Caps on renewal increases, volume discount commitments
6. **Integration/API access** -- Ensure you can build on top of the vendor's platform

**Vendor Risk Assessment:**
| Risk Factor | Assessment |
|-------------|-----------|
| Vendor financial stability | Check funding, revenue, customer count, profitability signals |
| Market position | Is the vendor a leader or at risk of being acquired/shutting down? |
| Data sensitivity | What data are you entrusting to this vendor? |
| Switching cost | How difficult would it be to migrate to an alternative? |
| Dependency | Is this vendor critical to your operations? |
| Compliance impact | Does the vendor's compliance posture affect yours? |

### 3.2 Key Terms by Contract Type

**SaaS Subscription:**
- Subscription term, auto-renewal, pricing
- License scope, user restrictions
- SLA, credits, termination thresholds
- Data processing, security, breach notification
- Integration/API rights

**Professional Services:**
- Scope definition and change order process
- Deliverable acceptance criteria
- IP ownership of work product
- Key personnel and replacement rights
- Milestone-based payment tied to acceptance

**Reseller/Partner Agreement:**
- Territory, exclusivity, minimum commitments
- Pricing (wholesale discount, end-customer pricing restrictions)
- Lead registration and protection
- Marketing commitments and brand usage
- Reporting and audit rights

**Data License Agreement:**
- Scope of permitted use (internal analytics, model training, redistribution)
- Data quality warranties
- Update/refresh frequency and obligations
- Exclusivity and competitive use restrictions
- Compliance with privacy laws for personal data

**API/Integration Agreement:**
- API access terms, rate limits, SLA
- Data handling for data flowing through the API
- Backward compatibility commitments
- Change notification requirements
- Attribution and co-branding requirements

---

## 4. Playbook Approach to Negotiation at Scale

### 4.1 What Is a Contract Playbook?

A contract playbook is a documented guide that empowers non-legal team members (sales, procurement, customer success) to handle routine negotiations without legal involvement, while ensuring consistency and compliance.

**Playbook Components:**
1. **Approved template** -- The starting-point agreement
2. **Term-by-term guidance** -- For each negotiable term:
   - **Standard position:** The default in the template
   - **Acceptable alternatives:** Pre-approved fallback positions
   - **Escalation triggers:** When to involve legal
   - **Rationale:** Why this term matters (for negotiation conversations)
3. **Authority matrix** -- Who can approve which deviations
4. **Escalation process** -- How and when to escalate to legal

### 4.2 Playbook Example: Limitation of Liability

```
TERM: Limitation of Liability

STANDARD POSITION:
- General cap: 12 months of fees paid in the preceding 12-month period
- Consequential damages: Mutually excluded
- Carve-outs: None (all liabilities subject to cap)

ACCEPTABLE ALTERNATIVES (no legal approval needed):
- General cap: Up to 24 months of fees (for ACV > $100K)
- Carve-out for vendor IP indemnification: Up to 2x general cap
- Carve-out for vendor data breach: Up to 2x general cap

ESCALATION REQUIRED:
- Customer requests uncapped liability for any category
- Customer requests cap > 24 months of fees
- Customer requests carve-out for gross negligence or willful misconduct
- Customer requests carve-out for breach of confidentiality without monetary cap

RATIONALE FOR NEGOTIATION:
"Our standard cap of 12 months of fees is consistent with industry
practice for SaaS agreements. We're willing to discuss a higher cap
or carve-outs for specific categories in the context of the overall
deal value and risk profile."
```

### 4.3 Authority Matrix

| Decision | Sales Rep | Sales Manager | VP Sales | Legal |
|----------|-----------|--------------|----------|-------|
| Standard terms | Approve | Approve | Approve | Approve |
| Liability cap up to 24 months | Approve | Approve | Approve | Approve |
| Liability cap > 24 months | Escalate | Escalate | Approve | Approve |
| Custom indemnification | Escalate | Escalate | Escalate | Approve |
| Unlimited liability (any category) | Escalate | Escalate | Escalate | VP Legal |
| Non-standard governing law | Escalate | Escalate | Escalate | Approve |
| Custom data handling terms | Escalate | Escalate | Escalate | Approve |
| Amendment to template structure | Escalate | Escalate | Escalate | VP Legal |

### 4.4 Measuring Negotiation Effectiveness

**Key Metrics:**
- **Cycle time:** Days from first draft to execution (target: <30 days for standard; <60 days for enterprise)
- **Legal escalation rate:** % of deals requiring legal involvement (target: <30% for standard deals)
- **Deviation rate by term:** Which terms are most frequently negotiated? (informs playbook updates)
- **Win rate on key terms:** How often do you maintain your preferred position?
- **Customer satisfaction:** Post-negotiation feedback on process (speed, fairness, professionalism)
- **Contract value per hour of legal time:** Efficiency of legal involvement in deals

---

## 5. Markup and Redline Process

### 5.1 Best Practices for Sending and Receiving Redlines

**Sending Your Template:**
- Send in Word format with Track Changes capability (not PDF)
- Include a cover email summarizing key commercial terms
- Set expectations: "We welcome your review and are happy to discuss any terms"
- Provide a timeline: "We would appreciate your comments within [X] business days"

**Receiving Markups:**
- Review in the order of: (1) new provisions added, (2) deletions, (3) modifications
- Flag any provisions that change the fundamental deal economics or risk allocation
- Look for "hidden" changes in defined terms (redefining "Confidential Information," "Customer Data," "Losses")
- Check for inconsistencies between marked-up provisions

**Redline Etiquette:**
- Respond to all comments (even if just "Accepted" or "Rejected -- see alternative")
- Do not delete the other party's comments; add your responses alongside
- Use a clean comparison document for final review before execution
- Number rounds (V1, V2, V3) to avoid version confusion

### 5.2 Final Execution Checklist

Before executing any contract:
- [ ] All blanks filled in (dates, names, addresses, amounts)
- [ ] All exhibits and schedules attached and cross-referenced correctly
- [ ] All defined terms used consistently throughout
- [ ] Signatory has authority to bind the entity (check bylaws, board resolutions, delegation of authority)
- [ ] Correct legal entity name used (not DBA or trade name)
- [ ] Governing law and dispute resolution provisions are acceptable
- [ ] All referenced external documents (policies, SLAs) are current and accessible
- [ ] Counterparty's insurance certificates received (if required)
- [ ] Internal approvals obtained per authority matrix
- [ ] Fully executed copy saved in contract management system

---

## 6. Cross-Brain Integration

**Legal Brain coordinates with:**
- **Sales Brain:** Playbook design, deal support, pricing negotiations
- **Finance Brain:** Payment terms, revenue recognition implications, financial covenants
- **Engineering Brain:** SLA feasibility, API terms, technical specifications
- **Security Brain:** Data security terms, audit right responses, compliance certifications
- **Product Brain:** Feature-specific terms, roadmap commitments (avoid), beta program terms
- **MBA Brain:** Strategic deal evaluation, partnership terms, M&A contract structure

---

*Reference: Fisher & Ury, Getting to Yes (3rd ed.); Mnookin et al., Beyond Winning; World Commerce & Contracting (formerly IACCM) benchmarking data; ACC Chief Legal Officers Survey; SaaStr Enterprise SaaS Contract Benchmarks.*
