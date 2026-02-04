# Compliance Program -- Design, Implementation, and Evaluation

> Module: `06_compliance/compliance_program.md`
> Brain: Legal Brain
> Authority: Domain-specific (compliance)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. Compliance Program Architecture

### 1.1 DOJ Evaluation Criteria

The US Department of Justice evaluates corporate compliance programs using three fundamental questions (DOJ Criminal Division, "Evaluation of Corporate Compliance Programs," updated 2023):

1. **Is the compliance program well designed?** (risk assessment, policies, training, reporting)
2. **Is the program being applied earnestly and in good faith?** (commitment by senior management, autonomy of compliance function, resources)
3. **Does the compliance program work in practice?** (continuous improvement, investigation, remediation)

A company that can demonstrate an effective compliance program receives significant credit in DOJ enforcement decisions, potentially avoiding prosecution entirely.

### 1.2 Seven Elements of an Effective Compliance Program

Based on the Federal Sentencing Guidelines (USSG Section 8B2.1) and DOJ guidance:

| Element | Description | Implementation |
|---------|-------------|---------------|
| 1. Standards and Procedures | Written policies and procedures addressing compliance risks | Code of conduct, specific compliance policies per risk area |
| 2. Governance and Oversight | Board and senior management oversight of compliance | Compliance committee, board reporting, compliance officer |
| 3. Education and Training | Regular training for all employees and relevant third parties | Annual compliance training, role-specific training, new hire training |
| 4. Reporting Mechanisms | Confidential channels for reporting concerns | Hotline, email, web portal; anonymous reporting option |
| 5. Monitoring and Auditing | Ongoing monitoring of compliance program effectiveness | Internal audits, data analytics, compliance testing |
| 6. Enforcement and Discipline | Consistent enforcement of policies, including for senior management | Disciplinary guidelines, track record of enforcement |
| 7. Response and Remediation | Prompt investigation of reports and remediation of issues | Investigation protocol, root cause analysis, corrective action |

### 1.3 Risk Assessment

**The Foundation of Every Compliance Program:**

The compliance program must be risk-based. A one-size-fits-all program is neither effective nor defensible. The risk assessment determines which risks are most significant and how resources should be allocated.

**Risk Assessment Process:**
1. **Identify risks:** Industry risks, geographic risks, operational risks, regulatory risks, third-party risks
2. **Assess likelihood and impact:** Probability of occurrence x severity of consequences
3. **Evaluate existing controls:** What mitigations are already in place?
4. **Determine residual risk:** Risk remaining after existing controls
5. **Prioritize:** Focus resources on highest residual risks
6. **Document:** Create a risk register with risk owners and mitigation plans
7. **Update:** Reassess annually or when significant changes occur

**Risk Categories for Technology Companies:**
| Risk Area | Key Risks | Priority Level |
|-----------|----------|---------------|
| Data Privacy | Unauthorized access, data breach, non-compliant processing, cross-border transfers | High |
| Anti-Corruption | FCPA violations (international sales), gifts and entertainment, third-party payments | Medium-High (if international) |
| Securities | Insider trading, Reg FD violations, inaccurate disclosures | Medium-High (post-funding) |
| Employment | Discrimination, wage/hour, misclassification, harassment | High |
| Antitrust | Price-fixing, market allocation, competitor information sharing | Medium |
| Export Controls | Sanctioned persons/entities, controlled technology exports | Medium (technology-dependent) |
| Financial | Fraud, embezzlement, inaccurate financial reporting | Medium |
| Advertising | False/misleading advertising, FTC endorsement guidelines, testimonials | Medium |
| Accessibility | ADA/WCAG website and application accessibility | Medium |
| AI/ML Ethics | Bias, discrimination, transparency, explainability | Emerging (high for AI companies) |

---

## 2. Policies and Procedures

### 2.1 Core Policy Framework

**Required Policies (All Companies):**
| Policy | Content | Review Frequency |
|--------|---------|-----------------|
| Code of Conduct | Company values, ethical standards, compliance commitment, reporting mechanisms | Annual |
| Anti-Harassment/Discrimination | Prohibited conduct, reporting, investigation, consequences | Annual |
| Information Security | Data handling, access controls, incident response, acceptable use | Annual |
| Privacy Policy (External) | Data collection, use, sharing, rights | Quarterly review |
| Data Handling Policy (Internal) | Classification, handling, retention, destruction | Annual |
| Acceptable Use Policy | Technology, internet, email, social media use | Annual |
| Conflicts of Interest | Disclosure requirements, approval process | Annual |
| Whistleblower/Reporting | How to report concerns, non-retaliation, investigation process | Annual |

**Additional Policies (By Risk Profile):**
| Policy | When Required | Content |
|--------|-------------|---------|
| Anti-Corruption / FCPA | International operations or sales | Gifts, entertainment, third-party due diligence, government interactions |
| Insider Trading | Post-funding | Trading windows, blackout periods, pre-clearance, 10b5-1 plans |
| Export Control | Technology that could be controlled | Classification, screening, licensing, deemed exports |
| Sanctions/OFAC | International transactions | SDN screening, country-based restrictions, compliance procedures |
| Vendor Management | Significant vendor relationships | Due diligence, contractual requirements, ongoing monitoring |
| Records Retention | All companies | Retention schedules by record type, legal hold process |

### 2.2 Policy Drafting Standards

- Use clear, accessible language (not legalese)
- Include practical examples and scenarios
- Specify who the policy applies to (employees, contractors, board members, agents)
- Define key terms
- Assign ownership (who is responsible for the policy)
- Include effective date and version number
- Specify consequences of non-compliance
- Include contact information for questions
- Obtain acknowledgment from all covered persons

---

## 3. Training Program

### 3.1 Training Matrix

| Audience | Topics | Frequency | Format |
|----------|--------|-----------|--------|
| All employees | Code of conduct, anti-harassment, information security, privacy basics, reporting | Annual + at hire | Online module (30-60 min) |
| Managers | All above + employment law, accommodation, leave management, investigation basics | Annual + at promotion | Online + live session |
| Sales team | Anti-corruption, competitive intelligence, advertising law, contract basics | Annual | Online + live |
| Engineering team | Open source compliance, data handling, security coding, privacy engineering | Annual | Online + live |
| Finance team | Financial controls, fraud prevention, insider trading | Annual | Online + live |
| Executives | Fiduciary duties, insider trading, disclosure obligations, compliance leadership | Annual | Live session |
| Board members | Fiduciary duties, oversight responsibilities, D&O exposure | Annual | Board session |
| Third parties (agents, resellers, distributors) | Anti-corruption, export controls, brand usage | Annual or at onboarding | Online module |

### 3.2 Training Effectiveness Measurement

- Completion tracking (100% completion required; escalate non-compliance)
- Knowledge assessments (quiz at end of training; minimum passing score)
- Behavioral metrics (correlation between training and reported incidents)
- Training satisfaction surveys
- Investigation findings (are issues occurring in areas covered by training?)
- Refresher triggers (regulatory changes, enforcement actions, internal incidents)

---

## 4. Reporting Mechanisms and Whistleblower Protection

### 4.1 Reporting Channels

**Multi-Channel Approach:**
- **Hotline:** Phone (24/7, multilingual for international companies)
- **Web portal:** Online reporting form (anonymous option)
- **Email:** Dedicated compliance email address
- **In-person:** Direct to compliance officer, manager, HR, legal
- **App:** Mobile reporting (modern platforms like NAVEX Global, EthicsPoint)

**Anonymous Reporting:**
- Must be available (required by SOX for public companies; best practice for all)
- Cannot require identification as a condition of filing a report
- Investigate anonymous reports with the same rigor as identified reports
- Communicate availability of anonymous reporting prominently and regularly

### 4.2 Whistleblower Protection

**Federal Protections:**
| Statute | Scope | Protections |
|---------|-------|------------|
| SOX Section 806 | Public company employees reporting securities fraud | Anti-retaliation; reinstatement, back pay, compensatory damages |
| Dodd-Frank Section 922 | Persons reporting securities violations to SEC | Anti-retaliation; 10-30% of SEC sanctions exceeding $1M |
| DTSA (18 USC 1833(b)) | Persons disclosing trade secrets for reporting suspected violations | Immunity from criminal and civil liability |
| FCA (31 USC 3730) | Persons reporting fraud against the government | Qui tam (whistleblower share of recovery); anti-retaliation |

**Best Practices:**
- Explicit non-retaliation policy (prominently communicated)
- Investigation of all retaliation allegations
- Discipline for retaliators (regardless of seniority)
- Track and monitor treatment of reporters for adverse actions
- Regular communication that reporting is encouraged and protected

---

## 5. Industry-Specific Compliance

### 5.1 Fintech Compliance

| Regulation | Applicability | Key Requirements |
|-----------|-------------|-----------------|
| Money Transmission | Companies facilitating money transfers | State-by-state licensing (or federal charter); bonding; annual audits |
| BSA/AML | Financial institutions and money services businesses | KYC (Know Your Customer), SAR filing, CTR filing, AML program |
| EFTA/Reg E | Electronic fund transfers | Error resolution, disclosure, unauthorized transfer limits |
| TILA/Reg Z | Credit products | APR disclosure, right of rescission, ability-to-repay |
| ECOA/Reg B | Credit decisions | Fair lending; cannot discriminate on protected characteristics |
| CFPB oversight | Consumer financial products | Examination, enforcement, rulemaking authority |

### 5.2 Healthtech Compliance

| Regulation | Applicability | Key Requirements |
|-----------|-------------|-----------------|
| HIPAA | Covered entities and business associates | Privacy Rule, Security Rule, Breach Notification Rule |
| HITECH | Extension of HIPAA | Breach notification, increased penalties, business associate liability |
| FDA (SaMD) | Software as a Medical Device | Pre-market approval or clearance (depending on risk class) |
| 21 CFR Part 11 | Electronic records and signatures in FDA-regulated industries | Validation, audit trails, electronic signatures |
| Stark Law | Physician self-referral | Prohibits referrals where financial relationship exists |
| Anti-Kickback | Healthcare payments | Prohibits payments to induce referrals |

### 5.3 Edtech Compliance

| Regulation | Applicability | Key Requirements |
|-----------|-------------|-----------------|
| FERPA | Educational agencies and institutions receiving federal funds | Student record privacy; parent/student consent for disclosure |
| COPPA | Services directed to children under 13 | Parental consent for data collection |
| State Student Privacy | Operators of educational technology | Varies; many states restrict sale of student data, require security |
| CIPA | Schools receiving E-rate funding | Internet safety policy; content filtering |
| ADA/Section 504 | Educational institutions | Accessibility requirements for digital content |

---

## 6. Monitoring and Continuous Improvement

### 6.1 Compliance Monitoring Program

**Ongoing Monitoring Activities:**
- Policy compliance audits (sample-based review of adherence to policies)
- Transaction monitoring (automated screening for sanctions, AML, suspicious activity)
- Access log reviews (who accessed what sensitive data and when)
- Third-party due diligence refresh (periodic re-screening of vendors and partners)
- Regulatory change monitoring (track new laws, regulations, and enforcement actions)
- Incident tracking and trend analysis (are incident types increasing or decreasing?)

### 6.2 Compliance Metrics Dashboard

| Metric | Target | Red Flag |
|--------|--------|----------|
| Training completion rate | 100% within deadline | <95% |
| Time to investigate reports | <30 days average | >60 days |
| Hotline utilization rate | 1-2% of employees per year | <0.5% (suggests underreporting) |
| Policy acknowledgment rate | 100% | <98% |
| Vendor due diligence completion | 100% of high-risk vendors | Gaps in coverage |
| Audit finding closure rate | 100% within deadline | Open findings >90 days |
| Regulatory exam findings | Decreasing year over year | Increasing or repeat findings |
| Retaliation complaints | 0 | Any substantiated complaint |

### 6.3 Compliance Program Maturity Model

| Level | Description | Characteristics |
|-------|-------------|----------------|
| 1 -- Ad Hoc | No formal program | Reactive; policies exist in name only |
| 2 -- Developing | Basic elements in place | Written policies; initial training; basic reporting channel |
| 3 -- Defined | Comprehensive program | Risk-based; systematic monitoring; board reporting; metrics |
| 4 -- Managed | Data-driven optimization | Analytics; benchmarking; continuous improvement; integrated with business |
| 5 -- Optimizing | Industry-leading | Predictive analytics; culture of compliance; minimal incidents; recognized by regulators |

**Startup Target:** Level 2-3 by Series B; Level 3-4 by Series C/pre-IPO.

---

*Reference: DOJ Criminal Division, Evaluation of Corporate Compliance Programs (2023 update); USSG Section 8B2.1; SOX Sections 302, 404, 806; Dodd-Frank Section 922; COSO Internal Control Framework; NIST Cybersecurity Framework; OCC/FinCEN BSA/AML Examination Manual.*
