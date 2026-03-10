# Trade Secrets -- Protection, Enforcement, and Employee Mobility

> Module: `03_intellectual_property/trade_secrets.md`
> Brain: Legal Brain
> Authority: Domain-specific (intellectual property)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Trade Secret Fundamentals

### 1.1 Definition

A trade secret is information that derives economic value from not being generally known or readily ascertainable, and is subject to reasonable measures to maintain its secrecy.

**Uniform Trade Secrets Act (UTSA) -- adopted by 48 states + DC:**
Trade secret means information, including a formula, pattern, compilation, program, device, method, technique, or process, that:
1. Derives independent economic value, actual or potential, from not being generally known to, and not being readily ascertainable by proper means by, other persons who can obtain economic value from its disclosure or use; AND
2. Is the subject of efforts that are reasonable under the circumstances to maintain its secrecy.

**Defend Trade Secrets Act (DTSA) -- federal (18 USC Section 1836):**
Similar definition but provides a federal cause of action (since 2016), including:
- Civil seizure of property in extraordinary circumstances
- Federal court jurisdiction (no diversity requirement)
- Whistleblower immunity provision (must be included in employee agreements)

### 1.2 What Qualifies as a Trade Secret

**Common Trade Secrets in Technology Companies:**
| Category | Examples |
|----------|---------|
| Technical | Algorithms, source code, architecture designs, data models, system configurations |
| Business | Customer lists, pricing strategies, financial projections, strategic plans |
| Data | Proprietary datasets, training data for ML models, analytics insights |
| Process | Manufacturing processes, development methodologies, quality control procedures |
| Negative Know-How | Knowledge of what does NOT work (failed experiments, rejected approaches) |

**What Does NOT Qualify:**
- Publicly available information (published patents, open source code, public filings)
- General skills and knowledge an employee develops over their career
- Information the company failed to protect with reasonable measures
- Information independently developed by another party
- Information obtained through reverse engineering (unless contractually prohibited)

### 1.3 Trade Secret vs. Patent -- Decision Framework

| Factor | Favor Trade Secret | Favor Patent |
|--------|-------------------|-------------|
| Independent discovery | Unlikely (hidden process) | Likely (product feature visible to users) |
| Reverse engineering | Difficult or impossible | Easy or inevitable |
| Duration of value | Indefinite | <20 years sufficient |
| Employee mobility | Low turnover; strong protections | High turnover; information will walk out the door |
| Cost tolerance | Low (operational costs only) | Can afford $15K-50K+ per patent |
| Enforcement | Can monitor and detect misappropriation | Need to detect infringement in market |
| Competitive advantage | Secrecy IS the advantage | Need exclusionary right to prevent copying |

---

## 2. Reasonable Measures to Maintain Secrecy

The "reasonable measures" requirement is the most commonly litigated element of trade secret claims. A company that fails to implement adequate protections will lose trade secret status regardless of the value of the information.

### 2.1 Physical and Technical Measures

| Measure | Implementation | Evidence |
|---------|---------------|---------|
| Access controls | Role-based access (RBAC); need-to-know basis | Access logs, permission matrices |
| Encryption | Data at rest and in transit; key management | Encryption policies, audit logs |
| Network security | Firewalls, VPN, segmentation of sensitive systems | Security architecture documentation |
| Clean desk policy | Sensitive documents secured when not in use | Policy acknowledgment records |
| Visitor controls | Escorts, NDAs for visitors, restricted areas | Visitor logs, NDA files |
| Device management | MDM, remote wipe capability, USB restrictions | MDM enrollment records |
| DLP tools | Data Loss Prevention monitoring of file transfers, emails | DLP logs, alert records |
| Code repositories | Private repositories, branch protections, access reviews | Repository access logs |
| Secure disposal | Shredding, secure deletion, hardware destruction | Destruction certificates |

### 2.2 Legal and Contractual Measures

**Non-Disclosure Agreements (NDAs):**
- Employee NDAs (in CIIA or standalone)
- Contractor/consultant NDAs
- Vendor/partner NDAs
- Investor NDAs (note: many VCs refuse to sign NDAs for pitches)
- Customer NDAs (for beta programs, technical integrations)

**Employment Agreements:**
- Confidentiality obligations (survive termination; typically 2-5 years or indefinite for trade secrets)
- Return of materials obligation upon termination
- Non-solicitation of employees and customers
- Non-compete (where enforceable -- see Section 3 below)
- Invention assignment (for IP created during employment)

**Marking and Classification:**
- Mark documents: "CONFIDENTIAL -- TRADE SECRET" or equivalent
- Classification system: Public / Internal / Confidential / Restricted
- Train employees on classification and handling requirements
- Consistently enforce classification (inconsistent enforcement undermines trade secret claims)

### 2.3 Organizational Measures

- **Onboarding:** Trade secret awareness training; acknowledgment of confidentiality obligations
- **Ongoing:** Annual compliance training; periodic access reviews; security awareness
- **Offboarding:** Exit interview covering confidentiality obligations; return of all materials and devices; reminder of post-employment obligations; access revocation (immediate, day of departure)
- **Compartmentalization:** Limit access to need-to-know; no single person should know entire trade secret if avoidable

### 2.4 Documentation of Reasonable Measures

**Why Documentation Matters:**
In litigation, you must prove you took reasonable measures. Courts look for:
- Written policies (information security policy, acceptable use policy, confidentiality policy)
- Training records (who was trained, when, on what)
- Access logs (who had access to the trade secret)
- NDA/CIIA execution records (who signed, when)
- Incident response records (how prior breaches/near-misses were handled)

**Trade Secret Register:**
Maintain a register of trade secrets identifying:
- Description of the trade secret
- Business value assessment
- Protection measures in place
- Access list (individuals and roles with access)
- Date identified as trade secret
- Review date (annual review of status and protections)

---

## 3. Non-Compete and Non-Solicitation Agreements

### 3.1 Non-Compete Enforceability by State

**The landscape changed dramatically in 2024-2025:**

**States Banning or Severely Restricting Non-Competes:**
| State | Status | Key Rules |
|-------|--------|----------|
| California | Banned (Bus. & Prof. Code Section 16600) | Void and unenforceable as a matter of public policy; narrow exception for sale of business |
| Colorado | Banned for most workers (eff. 2022) | Exception for highly compensated employees ($123K+ in 2024) + executives; limited to 12 months |
| Minnesota | Banned (eff. 2023) | Prospective ban; existing agreements may still be enforceable |
| Oklahoma | Banned (Title 15 Section 219A) | Exception for sale of business |
| North Dakota | Banned (Section 9-08-06) | Exception for sale of business |
| Washington | Restricted (RCW 49.62) | Only for employees earning >$120K+ (indexed); 18-month max |
| Oregon | Restricted | $113K+ salary threshold; 12-month max; garden leave required |
| Illinois | Restricted | $75K salary threshold (employees); $45K (non-solicits) |
| Massachusetts | Restricted | 12-month max; garden leave or mutual consideration required |

**FTC Non-Compete Ban:**
- FTC issued final rule banning most non-competes (April 2024)
- Rule was vacated nationwide by federal court (*Ryan LLC v. FTC*, N.D. Texas, August 2024)
- The ban is NOT in effect as of this writing, but the legal landscape continues to evolve
- Monitor: Further litigation, potential new rulemaking, or Congressional action

### 3.2 Non-Solicitation Agreements

Non-solicitation agreements restrict former employees from soliciting:
- **Customers:** Cannot solicit or service customers of former employer (for defined period)
- **Employees:** Cannot recruit or hire employees of former employer (for defined period)

**Enforceability:** Generally more enforceable than non-competes because they are narrower. However:
- California: Employee non-solicitation agreements are likely unenforceable (*AMN Healthcare v. Aya Healthcare* (2018))
- Other states: Typically enforceable if reasonable in scope, duration (usually 12-24 months), and geographic reach
- Must be supported by consideration (continued employment may suffice in some states; separate consideration required in others)

### 3.3 Non-Compete Drafting Best Practices (Where Enforceable)

**Factors Courts Consider for Reasonableness:**
1. **Duration:** 6-12 months (most enforceable); 12-24 months (may be enforceable for senior roles); >24 months (rarely enforceable)
2. **Geographic scope:** Narrowly tailored to actual competitive territory; nationwide/worldwide must be justified
3. **Activity scope:** Limited to specific competitive activities, not all employment; tied to role performed
4. **Consideration:** New employment, promotion, significant bonus, access to trade secrets
5. **Hardship on employee:** Cannot prevent employee from earning a livelihood
6. **Protectable interest:** Must protect a legitimate business interest (trade secrets, customer relationships, specialized training)

**Blue pencil doctrine:** Some states allow courts to narrow overbroad restrictions; others void the entire agreement. Draft conservatively; do not rely on judicial revision.

---

## 4. Departing Employee Protocols

### 4.1 Pre-Departure Checklist

When an employee announces departure (especially to a competitor):

**Immediate Actions:**
- [ ] Review employee's CIIA, NDA, non-compete, and non-solicitation agreements
- [ ] Determine where employee is going (competitor? customer? unrelated?)
- [ ] Assess employee's access to trade secrets and sensitive information
- [ ] Preserve employee's electronic files and communications (litigation hold if appropriate)
- [ ] Review recent file access, downloads, email forwards, cloud storage uploads

**Exit Interview:**
- [ ] Remind employee of ongoing confidentiality obligations (provide written copy)
- [ ] Confirm return of all company property (laptop, phone, documents, badges, keys)
- [ ] Remind of non-compete/non-solicitation obligations (if applicable)
- [ ] Provide copy of DTSA whistleblower immunity notice (required by federal law)
- [ ] Document the exit interview

**Access Revocation:**
- [ ] Disable all system accounts (same day as last day of employment)
- [ ] Revoke VPN, cloud service, and third-party application access
- [ ] Remove from group memberships, Slack channels, shared drives
- [ ] Forward email to designated replacement (do not delete)
- [ ] Remote wipe personal devices if BYOD with MDM

### 4.2 Monitoring After Departure

**Legitimate monitoring (without crossing legal lines):**
- Review public job posting or LinkedIn announcement for role description
- Monitor for customer migration (unusual churn patterns)
- Monitor for employee departures following the individual
- Google Alerts for departing employee + competitor news
- Review competitor product for suspiciously similar features or rapid development

**What NOT to do:**
- Do not access departing employee's personal accounts or devices
- Do not contact the new employer with threats (without legal counsel guidance)
- Do not disparage the departing employee
- Do not surveil the employee's personal activities
- Do not misrepresent facts to the new employer

---

## 5. Trade Secret Litigation

### 5.1 Elements of a Trade Secret Misappropriation Claim

**Under UTSA/DTSA, plaintiff must prove:**
1. A trade secret exists (information + economic value + reasonable measures)
2. Misappropriation occurred:
   - Acquisition by improper means (theft, bribery, breach of duty, espionage), OR
   - Disclosure or use without consent by person who acquired it by improper means, OR
   - Disclosure or use by person who knew or should have known it was acquired improperly

### 5.2 Remedies

**Injunctive Relief:**
- Preliminary and permanent injunction prohibiting use/disclosure
- "Head start" injunction: Prevents competitor from using trade secret to accelerate development (even if they could eventually develop it independently)
- Courts can order return or destruction of materials containing trade secrets

**Monetary Damages:**
- Actual damages (plaintiff's lost profits attributable to misappropriation)
- Unjust enrichment (defendant's profits attributable to misappropriation)
- Reasonable royalty (hypothetical license fee -- used when actual damages and unjust enrichment are difficult to prove)
- Exemplary damages: Up to 2x actual damages for willful and malicious misappropriation
- Attorney's fees: Available for willful misappropriation or bad faith claims

### 5.3 Practical Litigation Considerations

- **Speed matters:** Seek TRO/preliminary injunction immediately (trade secret value diminishes with each day of unauthorized use)
- **Preservation:** Ensure forensic preservation of evidence before filing (avoid spoliation claims)
- **Inevitable disclosure doctrine:** Some states (IL, PA) allow injunction where employee will inevitably use trade secrets at new employer -- but controversial and rejected by many courts (including CA)
- **Federal vs. state:** DTSA provides federal forum; may be preferable for multi-state cases or where federal procedural advantages exist
- **Cost:** Trade secret litigation is expensive ($2M-10M+ through trial); consider whether the trade secret value justifies the cost

---

## 6. DTSA Whistleblower Immunity Notice

**Required by 18 USC Section 1833(b):**

All agreements with employees, contractors, and consultants governing trade secrets or confidential information MUST include the following notice (or a cross-reference to a separate policy containing it):

> An individual shall not be held criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade secret that (A) is made (i) in confidence to a federal, state, or local government official, either directly or indirectly, or to an attorney; and (ii) solely for the purpose of reporting or investigating a suspected violation of law; or (B) is made in a complaint or other document filed in a lawsuit or other proceeding, if such filing is made under seal.

**Consequence of Failure to Include:**
If the notice is not provided, the employer cannot recover exemplary damages or attorney's fees against the employee in a DTSA action. This is a significant enforcement limitation.

---

*Reference: Milgrim on Trade Secrets; Restatement (Third) of Unfair Competition; Defend Trade Secrets Act, 18 USC Section 1836; Uniform Trade Secrets Act; Pooley, Trade Secrets; Ryan LLC v. FTC, No. 3:24-cv-986 (N.D. Tex. 2024).*
