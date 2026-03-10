# Regulatory Landscape -- FTC, Advertising Law, Accessibility, and Export Controls

> Module: `06_compliance/regulatory_landscape.md`
> Brain: Legal Brain
> Authority: Domain-specific (compliance)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. FTC Enforcement and Section 5

### 1.1 FTC Authority

The Federal Trade Commission Act Section 5 prohibits "unfair or deceptive acts or practices in or affecting commerce." This is the broadest consumer protection authority in the US.

**Deceptive Act or Practice:**
A representation, omission, or practice that is likely to mislead consumers acting reasonably under the circumstances, and the representation, omission, or practice is material (likely to affect consumer decisions).

**Three-Part Deception Test:**
1. Is there a representation, omission, or practice likely to mislead?
2. Is the representation or practice examined from the perspective of a reasonable consumer?
3. Is the representation or practice material?

**Unfair Act or Practice:**
An act or practice that: (1) causes or is likely to cause substantial injury to consumers, (2) is not reasonably avoidable by consumers, and (3) is not outweighed by countervailing benefits to consumers or competition.

### 1.2 FTC Enforcement in Technology

**Key FTC Enforcement Areas for Tech Companies:**
| Area | Recent Enforcement Trends | Risk Level |
|------|--------------------------|-----------|
| Privacy/Data Security | Enforcement against companies that fail to implement reasonable security or violate their own privacy policies | Very High |
| Dark Patterns | Deceptive UI designs that trick consumers into unintended actions (auto-enrollment, difficult cancellation) | High |
| Children's Privacy (COPPA) | Enforcement against platforms collecting children's data without parental consent | High |
| AI/Algorithms | Discriminatory algorithms, deceptive AI claims, use of AI to deceive | Emerging/High |
| Subscription Practices | Negative option marketing, difficult cancellation processes (FTC "Click-to-Cancel" rule) | High |
| Health Claims | Unsubstantiated health claims in apps and digital health products | High |
| Made in USA | False "Made in USA" claims for tech products | Medium |
| Endorsements | Failure to disclose material connections with endorsers/influencers | High |

### 1.3 FTC Enforcement Process

1. **Investigation:** CID (Civil Investigative Demand) or subpoena for documents and testimony
2. **Complaint:** FTC files administrative complaint or federal court action
3. **Resolution:** Consent order (settlement without admission) or litigated order
4. **Ongoing Obligations:** 20-year consent orders with monitoring, reporting, and compliance requirements
5. **Penalties for Violation of Order:** Up to $50,120 per violation (2024 amount)

### 1.4 FTC Health Breach Notification Rule

Separate from HIPAA, the FTC's Health Breach Notification Rule requires:
- Vendors of personal health records (PHR) and related entities
- NOT covered by HIPAA (health apps, fitness trackers, direct-to-consumer health services)
- Must notify affected individuals, FTC, and (for >500 persons) media within 60 days of discovering a breach
- First enforcement: GoodRx ($1.5M penalty, 2023); BetterHelp ($7.8M, 2023)

---

## 2. Advertising Law

### 2.1 Truthful Advertising Standard

**FTC Act Section 5 requires:**
- Advertising must be truthful and not misleading
- Advertisers must have evidence to back up their claims (substantiation doctrine)
- Advertising must be fair (not cause substantial unavoidable injury)

**Claim Types:**
| Type | Description | Substantiation Required |
|------|-------------|----------------------|
| Express Claims | Explicit statements ("Our software reduces costs by 50%") | Competent and reliable evidence supporting the specific claim |
| Implied Claims | Reasonable inferences from advertising | Same level as if the claim were express |
| Performance Claims | Claims about product performance | Tests, studies, or other competent evidence |
| Comparative Claims | Claims comparing to competitors | Head-to-head comparisons with identified methodology |
| Testimonials/Endorsements | Customer stories, influencer content | Must reflect honest opinions; typical results or clear disclosure |
| Puffery | Subjective, vague claims ("Best software ever") | None (but the line between puffery and claims is often thin) |

### 2.2 FTC Endorsement Guides (Updated 2023)

**Key Requirements:**
- Material connections between endorser and advertiser must be disclosed (payment, free products, employment, family relationship)
- Disclosure must be clear, conspicuous, and in close proximity to the endorsement
- Social media: Hashtag #ad or #sponsored in the content itself (not buried in hashtags)
- Influencers AND advertisers are liable for non-disclosure
- Fake reviews are prohibited (purchasing fake positive reviews or suppressing negative reviews)
- Employee endorsements must disclose employment relationship
- Testimonials must reflect typical consumer experience, or clearly disclose atypical results

**Penalties (2023 Guides Update):**
- FTC can now seek civil penalties for violations of the Endorsement Guides (up to $50,120 per violation)
- Previously limited to cease-and-desist; the penalty authority significantly increases enforcement risk

### 2.3 Digital Advertising Specific Rules

**Native Advertising:**
- Must be clearly distinguishable from editorial content
- Labels: "Sponsored," "Paid Advertisement," "Promoted" (must be prominent)
- FTC Enforcement Policy Statement on Native Advertising (2015)

**Advertising to Children:**
- CARU (Children's Advertising Review Unit) self-regulatory guidelines
- Cannot exploit children's credulity or inexperience
- COPPA applies to data collection in connection with advertising

**Testimonials with AI:**
- FTC has warned against AI-generated fake testimonials and reviews
- Using AI to generate fake reviews violates Section 5
- Proposed FTC rule (2023) would establish penalties for fake reviews

---

## 3. CAN-SPAM Act

### 3.1 Requirements

The CAN-SPAM Act (15 USC Section 7701 et seq.) governs commercial email messages.

**Definition:** A "commercial electronic mail message" is email whose primary purpose is advertising or promoting a commercial product or service.

**Requirements for All Commercial Email:**
| Requirement | Details |
|------------|---------|
| No deceptive headers | "From," "To," and routing information must be accurate |
| No deceptive subject lines | Subject must accurately reflect message content |
| Identification as ad | Message must clearly identify itself as an advertisement |
| Physical address | Must include valid physical postal address of sender |
| Opt-out mechanism | Must provide clear, conspicuous mechanism to opt out |
| Honor opt-outs | Must process opt-out requests within 10 business days |
| No requirement for prior consent | CAN-SPAM is opt-out, not opt-in (unlike GDPR) |
| Monitor third parties | Responsible for compliance even when using third-party email senders |

**Penalties:** Up to $50,120 per email violation

**Transactional Email Exception:**
Transactional or relationship emails (order confirmations, account alerts, security notifications) are exempt from most CAN-SPAM requirements but must still have accurate headers and cannot be deceptive.

---

## 4. TCPA (Telephone Consumer Protection Act)

### 4.1 Overview

The TCPA (47 USC Section 227) restricts telemarketing calls, text messages, and use of automatic telephone dialing systems (ATDS) and prerecorded/artificial voice messages.

**Key Requirements:**
| Communication Type | Consent Required | Exceptions |
|-------------------|-----------------|-----------|
| Telemarketing calls to cell phones using ATDS | Prior express written consent | Emergency calls |
| Prerecorded telemarketing to cell phones | Prior express written consent | Emergency calls |
| Telemarketing calls to cell phones (manual dialing) | Prior express consent (oral OK) | Existing business relationship |
| Text messages using ATDS | Prior express written consent | Emergency messages |
| Calls to numbers on DNC list | Prior express written consent | Existing business relationship (18 months) |
| Fax advertising | Prior express invitation or permission | Established business relationship |

### 4.2 TCPA Litigation Risk

**Private Right of Action:**
- $500 per violation (per call/text)
- $1,500 per willful violation (treble damages)
- Class actions are extremely common (TCPA is the #2 source of class action filings in the US)
- No injury required (statutory damages per violation)

**Risk Mitigation:**
- Obtain and document prior express written consent (clear disclosure, separate consent, written agreement)
- Maintain internal DNC list; scrub against national DNC registry
- Implement ATDS identification and consent verification systems
- Train customer-facing teams on TCPA requirements
- Audit text message and calling campaigns regularly

---

## 5. ADA Website Accessibility

### 5.1 Legal Framework

**Title III of the ADA** prohibits discrimination by places of public accommodation. Courts have increasingly held that websites and mobile apps are places of public accommodation (or necessary for access to them).

**No Definitive Federal Standard:**
- DOJ has not issued specific regulations for website accessibility
- DOJ has stated that ADA applies to websites of public accommodations
- Courts generally reference WCAG (Web Content Accessibility Guidelines) 2.1 Level AA as the applicable standard

### 5.2 WCAG 2.1 Level AA Standards

**Four Principles (POUR):**
1. **Perceivable:** Information must be presentable to users in ways they can perceive (alt text, captions, adaptable layout)
2. **Operable:** Interface must be operable (keyboard navigation, sufficient time, no seizure-causing content)
3. **Understandable:** Information must be understandable (readable, predictable, input assistance)
4. **Robust:** Content must be robust enough to be interpreted by assistive technologies

**Key WCAG Requirements:**
| Area | Requirement | Implementation |
|------|------------|---------------|
| Images | Alt text for all non-decorative images | `alt` attributes on `<img>` tags |
| Video | Captions and audio descriptions | Closed captions; transcript |
| Color | Sufficient contrast ratio (4.5:1 for text) | Color contrast testing tools |
| Keyboard | All functionality accessible via keyboard | Tab navigation, focus indicators |
| Forms | Labels associated with form controls | `<label>` elements, ARIA attributes |
| Navigation | Consistent, predictable navigation | Skip links, heading hierarchy |
| Error handling | Clear error identification and suggestions | Inline validation messages |
| Responsive | Content reflows at 320px width | Responsive design testing |

### 5.3 ADA Litigation Trends

- ADA website accessibility lawsuits exceed 4,000+ per year (growing trend)
- Most common plaintiffs: Serial litigants and advocacy organizations
- Industries most targeted: E-commerce, hospitality, financial services, education
- Settlement costs: $5,000-25,000 for small businesses; $50,000-250,000+ for larger companies
- Injunctive relief: Court orders to remediate website accessibility (6-24 month timeline)

**Proactive Mitigation:**
- WCAG 2.1 AA audit (automated + manual testing with assistive technology users)
- Accessibility statement on website
- Feedback mechanism for users with disabilities
- Regular accessibility testing integrated into development process (CI/CD)
- Third-party accessibility monitoring (accessiBe, AudioEye, Deque, Level Access)

---

## 6. Export Controls and Sanctions

### 6.1 Export Administration Regulations (EAR)

**Administered by:** Bureau of Industry and Security (BIS), Department of Commerce

**Scope:**
- Controls export, re-export, and transfer of "dual-use" items (commercial items with potential military/intelligence applications)
- Software and technology (including encryption) are controlled items
- "Deemed export" rule: Disclosing controlled technology to a foreign national in the US = export to that person's home country

**Classification:**
- Items are classified by ECCN (Export Control Classification Number) on the Commerce Control List (CCL)
- EAR99: Items not on CCL; can be exported without license to most destinations (but not to sanctioned countries or persons)
- License requirements depend on: ECCN, destination country, end user, end use

### 6.2 OFAC Sanctions

**Administered by:** Office of Foreign Assets Control, Department of the Treasury

**Key Programs:**
- **SDN List:** Specially Designated Nationals and Blocked Persons List -- cannot transact with any listed person or entity
- **Country-Based Programs:** Comprehensive sanctions (Cuba, Iran, North Korea, Syria, Crimea/Donetsk/Luhansk) and targeted sanctions (Russia, Venezuela, Myanmar, others)
- **Sectoral Sanctions:** Target specific sectors of a country's economy (e.g., Russian financial, energy, defense sectors)

**Screening Obligations:**
- Screen all customers, vendors, partners, and transactions against SDN List
- Screen against other OFAC lists (Entity List, Denied Persons List, Unverified List)
- Automated screening tools (Dow Jones, LexisNexis, Refinitiv, compliance.ai)
- Screen at onboarding and periodically thereafter
- Document all screening activities and results

**Penalties:**
- Civil penalties: Up to ~$356,000 per violation or twice the transaction value (whichever is greater)
- Criminal penalties: Up to $1M per violation and 20 years imprisonment
- Strict liability (no knowledge or intent required for civil penalties)

---

*Reference: FTC Act Section 5 (15 USC Section 45); FTC Endorsement Guides (16 CFR Part 255, updated 2023); CAN-SPAM (15 USC Section 7701); TCPA (47 USC Section 227); ADA Title III (42 USC Section 12181); WCAG 2.1; EAR (15 CFR Parts 730-774); OFAC Regulations (31 CFR Chapter V).*
