# Legal Benchmark Tests — Scenario-Based Evaluation (Authoritative)

> **DISCLAIMER:** This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

This document contains benchmark scenarios for evaluating Legal Brain output quality.
Each scenario must be evaluated against the LegalScore.md dimensions.

These are not hypotheticals. These are realistic, high-stakes legal situations.
The brain must produce actionable, expert-level analysis for each scenario.

---

## HOW TO USE BENCHMARK TESTS

1. Present each scenario to the Legal Brain
2. Evaluate the response against the scoring criteria provided
3. Score from 1-5 using the rubric for each scenario
4. A passing grade requires an average >= 4.0 across all scenarios
5. Any scenario scored < 3 requires the brain to be retrained on that domain
6. Every response must include the disclaimer

### Scoring Rubric (Applied to Each Scenario)
- **5** — Expert-level analysis. Comprehensive issue spotting, nuanced risk
        assessment, actionable recommendations, relevant precedent cited.
        Could be presented to a general counsel at a growth-stage company.
- **4** — Strong analysis. Covers key issues with minor gaps. Actionable.
- **3** — Adequate analysis. Covers basics but misses nuance or jurisdiction-specific issues.
- **2** — Weak analysis. Generic advice that lacks specificity.
- **1** — Poor analysis. Incorrect, superficial, or would create liability.

---

## SCENARIO 1: SaaS Agreement Risk Review

**Context:**
A startup is about to sign a SaaS agreement as the vendor. The customer is
a Fortune 500 company with aggressive legal counsel. The agreement was drafted
by the customer and heavily favors them.

Key terms:
- Unlimited liability for vendor
- Customer owns all customizations and configurations
- 99.99% uptime SLA with uncapped credits
- Vendor must maintain SOC 2 Type II, ISO 27001, and HIPAA compliance
- Governing law: customer's state (Delaware)
- 60-day termination for convenience by customer, 12-month lock-in for vendor
- Most favored customer pricing clause
- Unlimited audit rights with 24-hour notice

**Task:**
Review this SaaS agreement and identify the 5 highest-risk clauses for the
vendor. Propose specific redline language for each.

**Evaluation Criteria:**
- Are the 5 highest-risk clauses correctly identified?
- Does the analysis explain WHY each clause is high-risk (not just that it exists)?
- Are proposed redlines specific, balanced, and commercially reasonable?
- Does the response consider the power dynamic (startup vs. Fortune 500)?
- Are there negotiation strategy suggestions (what to prioritize, what to concede)?

---

## SCENARIO 2: GDPR Data Deletion Request

**Context:**
A customer in Germany (EU) has submitted a data deletion request via email.
They want all their personal data deleted. The company processes their data
for the following purposes:
- Account management (contract necessity)
- Marketing emails (consent)
- Analytics (legitimate interest)
- Fraud prevention (legal obligation under PSD2)
- Backup systems (legitimate interest)

The data also exists with 3 sub-processors: Stripe (payment), SendGrid (email),
and Snowflake (analytics).

**Task:**
Walk through GDPR Article 17 compliance for this request, including:
1. Which data must be deleted, which can be retained, and the legal basis for each
2. Sub-processor notification requirements and process
3. Timeline and response requirements
4. Technical considerations for deletion across systems
5. Documentation requirements for the response

**Evaluation Criteria:**
- Is each processing purpose correctly analyzed against Article 17 exceptions?
- Are the sub-processor obligations correctly identified (Article 17(2))?
- Is the 30-day response timeline noted with extension possibilities?
- Are technical realities (backups, logs) addressed practically?
- Is the response format GDPR-compliant?

---

## SCENARIO 3: Trademark Infringement Assessment

**Context:**
A competitor launched a product with a name confusingly similar to your
registered trademark. Specifics:
- Your mark: "DataFlow" registered in US (Class 9, 42) since 2020
- Competitor's mark: "DataFlowr" used in commerce since 6 months ago
- Same industry: data pipeline software
- Competitor is a well-funded startup with VC backing
- Your mark has developed secondary meaning in the developer community
- Competitor's product is also SaaS-based, sold to similar customers

**Task:**
Assess the strength of a trademark infringement claim and recommend
enforcement options. Deliver:
1. Likelihood of confusion analysis (using relevant multi-factor test)
2. Strength of your mark assessment
3. Enforcement options with pros/cons of each
4. Timeline and cost estimates for each option
5. Strategic considerations (relationship, PR, competitive dynamics)

**Evaluation Criteria:**
- Is the likelihood of confusion analysis structured around the appropriate
  circuit's multi-factor test (Polaroid, Sleekcraft, etc.)?
- Is the mark strength assessment thorough (inherent + acquired distinctiveness)?
- Are enforcement options realistic (C&D, TTAB, federal court)?
- Are strategic considerations business-aware?
- Is the analysis jurisdiction-appropriate?

---

## SCENARIO 4: Employee Misclassification Risk

**Context:**
A tech company has 20 "independent contractors" who have worked exclusively
for the company for 18+ months. They:
- Work 40+ hours per week
- Use company-provided equipment
- Follow company processes and attend standups
- Are paid monthly on invoices
- Have signed contractor agreements with IP assignment
- Are not on payroll and receive no benefits
- Some are in California, some in New York, some in Texas

**Task:**
Assess the misclassification risk and recommend remediation. Deliver:
1. Analysis under IRS 20-factor test
2. State-specific analysis for CA (ABC test), NY, and TX
3. Exposure assessment (back taxes, penalties, benefits liability)
4. Remediation options with timeline
5. Communication strategy for affected workers

**Evaluation Criteria:**
- Is the IRS 20-factor analysis applied correctly?
- Is California's ABC test (AB5) properly applied (all three prongs)?
- Is the exposure assessment realistic and quantified?
- Are remediation options practical and prioritized?
- Does the communication strategy balance legal risk with worker relationships?

---

## SCENARIO 5: Open Source License Compliance

**Context:**
During a pre-acquisition due diligence, it is discovered that the company's
commercial product includes:
- 3 GPL v3 libraries linked dynamically
- 1 AGPL v3 library used as a network service dependency
- 12 MIT/BSD libraries (properly attributed)
- 2 libraries with no identifiable license
- Company's own proprietary code is distributed as compiled binaries

The acquirer is concerned about copyleft contamination.

**Task:**
Analyze the open source compliance posture. Deliver:
1. Risk assessment for each license type in the context of the product architecture
2. GPL v3 analysis: does dynamic linking trigger copyleft?
3. AGPL v3 analysis: does network service use trigger copyleft?
4. Unlicensed library risk assessment
5. Remediation plan with priority order
6. Process recommendations to prevent future issues

**Evaluation Criteria:**
- Is the GPL v3 linking analysis nuanced (dynamic vs. static, separate works)?
- Is the AGPL network interaction clause correctly analyzed?
- Are the unlicensed library risks properly flagged?
- Is the remediation plan actionable and prioritized by risk?
- Does the process recommendation include tooling suggestions?

---

## SCENARIO 6: Series A Term Sheet Review

**Context:**
A startup has received a Series A term sheet from a top-tier VC. Key terms:
- $10M investment at $40M pre-money valuation
- 1x non-participating liquidation preference
- Full ratchet anti-dilution protection
- 2 board seats for investors (out of 5 total)
- Protective provisions requiring investor approval for: debt, M&A, new equity,
  budget changes > 10%, executive hiring/firing
- Pay-to-play provision
- 24-month vesting cliff for founders (on already-vested shares)
- Right of first refusal and co-sale on founder shares
- Drag-along rights at 60% threshold
- No-shop clause: 45 days

**Task:**
Review the term sheet from the founders' perspective. Deliver:
1. Identification of the 5 most concerning terms for founders
2. Market comparison (are terms standard, aggressive, or favorable?)
3. Specific counter-proposals for each concerning term
4. Negotiation priority order
5. "Walk away" threshold analysis

**Evaluation Criteria:**
- Are the most impactful terms for founders correctly identified?
- Is the market comparison accurate for Series A norms?
- Are counter-proposals specific and commercially reasonable?
- Is the negotiation strategy realistic for the power dynamic?
- Is the "walk away" analysis objective and well-reasoned?

---

## SCENARIO 7: International Data Transfer Assessment

**Context:**
A US-based SaaS company processes personal data of EU residents. The data
flows through the following infrastructure:
- Application servers: AWS us-east-1
- Database: AWS eu-west-1 (Ireland)
- Analytics: Google BigQuery (US)
- Email service: SendGrid (US)
- Support tools: Zendesk (US)
- CDN: Cloudflare (global edge nodes)

Post-Schrems II, the company needs to ensure lawful data transfers.

**Task:**
Assess the data transfer compliance posture. Deliver:
1. Transfer impact assessment for each data flow
2. Appropriate transfer mechanism for each flow (SCCs, adequacy, BCRs, derogations)
3. Supplementary measures required
4. Technical measures to implement
5. Documentation requirements

**Evaluation Criteria:**
- Is each data flow correctly identified and assessed?
- Are the correct transfer mechanisms selected post-Schrems II?
- Are supplementary measures specific and implementable?
- Are technical measures realistic (encryption, pseudonymization)?
- Does the documentation approach satisfy EDPB guidance?

---

## SCENARIO 8: Competitor Non-Compete Dispute

**Context:**
A senior engineer was hired from a competitor. The engineer signed a 1-year
non-compete with the competitor that covers "software development for competing
products in the United States." The engineer will work in the company's core
product team. The competitor has sent a cease-and-desist letter threatening
injunctive relief and damages.

The company is headquartered in California. The engineer previously worked in
Massachusetts. The non-compete specifies Massachusetts law governs.

**Task:**
Analyze the legal exposure and recommend a response. Deliver:
1. Enforceability analysis under Massachusetts law
2. California public policy argument
3. Choice of law analysis
4. Response strategy for the C&D
5. Risk mitigation measures for the engineer's work assignment
6. Litigation exposure assessment

**Evaluation Criteria:**
- Is the enforceability analysis correct under current Massachusetts law?
- Is the California Business and Professions Code Section 16600 argument well-stated?
- Is the choice of law analysis thorough (which state's law applies)?
- Is the C&D response strategy measured and appropriate?
- Are risk mitigation measures practical and documented?

---

## SCENARIO 9: Product Liability for AI Output

**Context:**
A company offers an AI-powered medical triage tool that suggests urgency
levels for patient symptoms. A patient used the tool, was told their symptoms
were "low urgency," and delayed seeking care. The patient suffered a serious
adverse outcome. The patient's attorney has sent a demand letter claiming the
tool provided negligent medical advice.

The tool's terms of service include a disclaimer that it "does not provide
medical advice." The company is not a licensed medical provider.

**Task:**
Analyze the liability exposure. Deliver:
1. Product liability analysis (strict liability, negligence, failure to warn)
2. Section 230 applicability (does it apply to AI-generated content?)
3. FDA regulatory exposure (is this a medical device?)
4. Effectiveness of the disclaimer/TOS
5. Insurance coverage analysis
6. Recommended response and long-term risk mitigation

**Evaluation Criteria:**
- Is the product liability framework correctly applied?
- Is the Section 230 analysis current with evolving AI case law?
- Is the FDA/SaMD analysis accurate?
- Is the disclaimer effectiveness assessment honest (not just "it says not medical advice")?
- Are recommendations both legally sound and practically implementable?

---

## SCENARIO 10: Privacy Class Action Risk Assessment

**Context:**
A company's analytics SDK was found to be collecting device fingerprints and
location data without proper consent disclosure. The SDK is embedded in 500+
apps with millions of users. A plaintiff's firm has filed a class action in
California alleging violations of CCPA, California Invasion of Privacy Act
(CIPA), and federal Wiretap Act.

**Task:**
Assess the litigation risk and recommend a response strategy. Deliver:
1. Claim-by-claim analysis (CCPA, CIPA, Wiretap Act)
2. Class certification risk assessment
3. Damages exposure estimation
4. Settlement vs. litigation analysis
5. Immediate remediation steps
6. Long-term compliance program design

**Evaluation Criteria:**
- Is each claim analyzed with correct elements and defenses?
- Is the class certification analysis thorough (numerosity, commonality, typicality)?
- Is the damages estimation realistic and defensible?
- Is the settlement analysis strategic?
- Are remediation steps immediate and comprehensive?

---

## SCENARIO 11: Terms of Service Drafting for Platform

**Context:**
A two-sided marketplace platform connecting freelancers with clients needs
terms of service. Key considerations:
- Platform takes 15% commission
- Users upload portfolio work (IP implications)
- Payments processed through Stripe Connect
- Platform operates in US, UK, and EU
- User-generated content (reviews, messages)
- Dispute resolution between freelancers and clients
- Platform is not an employer of freelancers

**Task:**
Design the terms of service structure and draft key provisions. Deliver:
1. TOS structure and table of contents
2. Key provisions with specific language for: IP, liability, arbitration, termination
3. Jurisdiction-specific requirements (US, UK, EU)
4. Enforceability analysis for key provisions
5. Consumer protection compliance requirements

**Evaluation Criteria:**
- Does the structure cover all necessary topics?
- Are key provisions legally sound and commercially reasonable?
- Are jurisdiction-specific requirements correctly identified?
- Is the arbitration clause enforceable (considering consumer protection)?
- Is the independent contractor classification properly handled?

---

## SCENARIO 12: CFIUS Filing Assessment

**Context:**
A US-based AI company with government contracts (non-classified) is being
acquired by a company headquartered in Singapore. The acquiring company has
no Chinese government ties but has offices in China. The target company
processes sensitive personal data of US citizens and develops dual-use AI
technology.

**Task:**
Assess whether a CFIUS filing is required and recommend a strategy. Deliver:
1. Mandatory vs. voluntary filing analysis
2. Risk factors that CFIUS would likely focus on
3. Mitigation measures that could be proposed
4. Timeline and process expectations
5. Deal structure modifications to reduce CFIUS risk

**Evaluation Criteria:**
- Is the mandatory filing analysis correct (TID US business, covered transaction)?
- Are the risk factors accurately identified (government contracts, sensitive data, AI)?
- Are mitigation measures realistic and precedented?
- Is the timeline estimate accurate?
- Are deal structure suggestions legally sound?

---

## SCENARIO 13: Employment Termination Legal Review

**Context:**
A company needs to terminate an employee for performance issues. The employee:
- Is a member of a protected class (age 55, female)
- Has been with the company 8 years
- Received a "meets expectations" rating 6 months ago
- Has had verbal discussions about performance but limited written documentation
- Recently filed an internal complaint about gender pay disparity
- Is in a state with strong whistleblower protections (New York)
- Has an employment agreement with a 6-month severance clause

**Task:**
Assess the legal risk and recommend a defensible termination process. Deliver:
1. Protected class and retaliation risk analysis
2. Documentation gap assessment and remediation plan
3. Recommended timeline for a legally defensible termination
4. Severance negotiation strategy
5. Litigation exposure assessment

**Evaluation Criteria:**
- Is the proximity to the internal complaint properly flagged as retaliation risk?
- Is the documentation gap correctly identified as the primary vulnerability?
- Is the recommended timeline realistic (not rushing, but not indefinite)?
- Does the severance strategy include a release and consideration analysis?
- Is the litigation exposure quantified?

---

## SCENARIO 14: SOC 2 and Security Compliance for SaaS

**Context:**
A B2B SaaS company is being asked by enterprise customers to provide SOC 2
Type II certification. The company currently has:
- AWS infrastructure with basic security controls
- No formal security policies
- No incident response plan
- Engineers with production access
- No access logging
- Basic encryption in transit but not at rest
- No vendor security assessments

**Task:**
Create a SOC 2 readiness assessment and compliance roadmap. Deliver:
1. Gap analysis against Trust Services Criteria
2. Prioritized remediation plan
3. Timeline to audit readiness
4. Cost estimate for compliance
5. Ongoing maintenance requirements

**Evaluation Criteria:**
- Is the gap analysis structured against the 5 Trust Services Criteria?
- Is the remediation plan prioritized by audit impact?
- Is the timeline realistic (typically 6-12 months)?
- Is the cost estimate defensible?
- Does ongoing maintenance address continuous monitoring?

---

## SCENARIO 15: Multi-Jurisdictional Cookie Consent

**Context:**
A global e-commerce company operates websites in the US, EU, UK, Brazil, and
Japan. The website uses:
- Essential cookies (session management)
- Analytics cookies (Google Analytics)
- Marketing cookies (Meta Pixel, Google Ads)
- Functional cookies (preferences, language)

Current implementation: a single banner that says "By using this site you
accept our cookies."

**Task:**
Design a compliant cookie consent strategy for all jurisdictions. Deliver:
1. Jurisdiction-specific requirements mapped
2. Cookie classification by purpose and jurisdiction
3. Consent mechanism design specification
4. Technical implementation requirements
5. Ongoing compliance monitoring plan

**Evaluation Criteria:**
- Are jurisdiction-specific rules correctly identified (ePrivacy, LGPD, APPI)?
- Is the distinction between opt-in (EU) and opt-out (US) correctly handled?
- Is the consent mechanism technically implementable?
- Does the design balance compliance with user experience?
- Is the monitoring plan sustainable?

---

## SCENARIO 16: Whistleblower Report Response

**Context:**
An employee has submitted an anonymous report through the company's ethics
hotline alleging that the VP of Sales is inflating revenue numbers by recording
future quarter deals in the current quarter. The company is pre-IPO and
currently in a funding round.

**Task:**
Design the investigation response. Deliver:
1. Immediate preservation obligations
2. Investigation plan (scope, team, timeline)
3. Confidentiality and anti-retaliation measures
4. Board notification requirements
5. Regulatory reporting obligations
6. Investor disclosure considerations

**Evaluation Criteria:**
- Are document preservation obligations immediately addressed?
- Is the investigation team independent (no conflicts)?
- Are anti-retaliation protections robust and documented?
- Are board notification requirements correctly identified?
- Is the investor disclosure analysis accurate (material misrepresentation risk)?

---

## AGGREGATE SCORING

### Score Card Template

```markdown
## Legal Benchmark Results: [Date]

> DISCLAIMER: This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

| # | Scenario | Score | Notes |
|---|----------|-------|-------|
| 1 | SaaS Agreement Risk Review | /5 | |
| 2 | GDPR Data Deletion Request | /5 | |
| 3 | Trademark Infringement Assessment | /5 | |
| 4 | Employee Misclassification Risk | /5 | |
| 5 | Open Source License Compliance | /5 | |
| 6 | Series A Term Sheet Review | /5 | |
| 7 | International Data Transfer | /5 | |
| 8 | Non-Compete Dispute | /5 | |
| 9 | AI Product Liability | /5 | |
| 10 | Privacy Class Action Risk | /5 | |
| 11 | Platform TOS Drafting | /5 | |
| 12 | CFIUS Filing Assessment | /5 | |
| 13 | Employment Termination Review | /5 | |
| 14 | SOC 2 Compliance Roadmap | /5 | |
| 15 | Cookie Consent Strategy | /5 | |
| 16 | Whistleblower Investigation | /5 | |

**Average Score:** [calculated]
**Passing Threshold:** >= 4.0
**Verdict:** PASS / RETRAIN REQUIRED
**Weakest Areas:** [list]
**Strongest Areas:** [list]
**Disclaimer Present in All Responses:** YES / NO
```

---

## ENFORCEMENT RULE

Benchmark tests are not optional.
The brain must demonstrate competence across all legal domains.
Scores below 3 on any scenario indicate a fundamental gap.

Every response must include the disclaimer.

> **DISCLAIMER:** This brain provides educational guidance. It is not a substitute
> for licensed legal counsel.

---

## END OF BENCHMARK TESTS
