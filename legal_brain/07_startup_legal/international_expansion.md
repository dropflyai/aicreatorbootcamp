# International Expansion -- Legal Framework for Global Operations

> Module: `07_startup_legal/international_expansion.md`
> Brain: Legal Brain
> Authority: Domain-specific (startup legal)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. International Hiring: EOR vs. Entity

### 1.1 Employer of Record (EOR)

An EOR is a third-party organization that legally employs workers on behalf of the client company in a foreign jurisdiction. The EOR handles all employment law compliance, payroll, tax withholding, and benefits.

**How It Works:**
```
Client Company (US) → EOR Contract → EOR (Local Entity in Target Country)
                                              ↓
                                    Employment Contract → Worker
```

**When to Use EOR:**
- Hiring 1-10 employees in a country
- Testing a market before committing to local entity formation
- Need to hire quickly (EOR can onboard in days; entity formation takes weeks to months)
- Temporary or project-based international engagement
- Countries where entity formation is complex or expensive

**EOR Providers:**
| Provider | Countries | Pricing Model | Notes |
|----------|----------|---------------|-------|
| Deel | 150+ | Per-employee/month ($599+) | Strong platform; contractor + EOR |
| Remote | 60+ | Per-employee/month ($599+) | Own entities (no third-party EOR) |
| Oyster | 180+ | Per-employee/month ($599+) | Good UX; total cost calculator |
| Papaya Global | 160+ | Per-employee/month ($650+) | Enterprise-focused; payroll platform |
| Velocity Global | 185+ | Per-employee/month (custom) | Broad coverage; compliance focus |

**EOR Limitations:**
- Higher per-employee cost than employing directly
- Less control over employment relationship
- IP assignment may require additional documentation (EOR is the legal employer, not you)
- Potential co-employment risk in some jurisdictions
- Cannot use EOR indefinitely in some countries (permanent establishment risk)

### 1.2 Local Entity Formation

**When to Form a Local Entity:**
- Hiring 10+ employees in a country
- Permanent presence needed for customers, partnerships, or regulatory reasons
- IP holding or tax structuring requires a local entity
- EOR costs exceed entity operating costs
- Country requires a local entity for certain activities (government contracts, local licensing)

**Entity Formation by Market:**

| Market | Entity Type | Formation Time | Key Considerations |
|--------|-----------|---------------|-------------------|
| UK | Private Limited Company (Ltd) | 1-2 weeks | Straightforward; Companies House registration |
| Germany | GmbH | 4-8 weeks | Minimum capital EUR 25,000; notarization required |
| France | SAS or SARL | 4-6 weeks | SAS more flexible; social charges high (~45% of salary) |
| Ireland | Private Limited Company | 2-4 weeks | Low corporate tax (12.5%); EU gateway |
| Singapore | Private Limited | 1-2 weeks | Business-friendly; low tax; IP hub for APAC |
| India | Private Limited Company | 4-8 weeks | Complex compliance; mandatory audits; FDI restrictions |
| Japan | KK (Kabushiki Kaisha) or GK | 4-8 weeks | KK for prestige; GK simpler and cheaper |
| Australia | Pty Ltd | 1-2 weeks | Straightforward; similar to UK |
| Canada | Corporation (federal or provincial) | 1-2 weeks | Similar legal system to US; provinces vary |
| Brazil | Limitada (Ltda) or S.A. | 4-12 weeks | Complex tax system; bureaucratic registration |

### 1.3 Hybrid Approach

Most companies use a hybrid:
1. Start with EOR for first hires in a new country
2. Convert to local entity when headcount or business needs justify it
3. Maintain EOR for countries with 1-3 employees

---

## 2. Employment Law by Jurisdiction

### 2.1 Key Differences from US Employment Law

**Employment law outside the US is generally MORE protective of employees:**

| Area | United States | Most Other Countries |
|------|--------------|---------------------|
| At-will employment | Yes (except Montana) | No -- cause required for termination |
| Notice period | None required (at-will) | 1-12 months depending on jurisdiction and tenure |
| Severance on termination | Not required (unless agreed) | Mandatory in many countries |
| Paid vacation | Not required by federal law | 20-30 days mandatory in EU |
| Paid parental leave | Not required by federal law (FMLA is unpaid) | 14-52+ weeks in most developed countries |
| Collective bargaining | Declining; not required | Works councils, mandatory bargaining in EU |
| Non-compete enforcement | Varies by state | Generally limited or prohibited in EU |
| Working hours | FLSA (overtime >40 hrs) | EU Working Time Directive: max 48 hrs/week |
| Termination process | Minimal (at-will) | Formal process: written reasons, hearing, appeal |

### 2.2 Termination Requirements by Market

| Market | Notice Period | Severance | Process |
|--------|-------------|-----------|---------|
| UK | 1 week per year of service (up to 12 weeks) | Statutory: 1 week pay per year (after 2 years); often more by contract | Consultation; written reasons; appeal |
| Germany | 4 weeks to 7 months (based on tenure) | No statutory severance, but practically always negotiated (~0.5 months per year of service) | Works council consultation; social selection criteria for redundancy |
| France | 1-2 months | Statutory: ~1/4 month per year of service | Formal interview process; mandatory procedures; labor court risk |
| Netherlands | 1-4 months | Transition payment: ~1/3 month per year of service | UWV or court approval required for termination |
| India | 1-3 months | 15 days per year of service (after 5 years) | Depends on applicable labor law (central vs. state) |
| Japan | 30 days | Commonly 1-3 months; not statutory but practically required | Extremely difficult to terminate; "mutual separation" is standard |
| Brazil | 30 days + 3 days per year of service | 40% of FGTS balance + notice period pay | Complex; multiple components |
| Canada | 1 week to 8 weeks (statutory); common law reasonable notice can be much longer | Varies by province; common law may require more | Provincial employment standards + common law |
| Australia | 1-5 weeks (based on tenure) | Redundancy pay: 4-16 weeks (based on tenure) | Unfair dismissal protection after minimum employment period |
| Singapore | 1 day to 4 weeks (based on tenure, unless contract specifies more) | No statutory severance for employees with <2 years | Written termination with notice |

---

## 3. Transfer Pricing

### 3.1 What Is Transfer Pricing?

Transfer pricing refers to the prices charged in transactions between related entities (parent and subsidiary, or entities under common control). Tax authorities require these prices to be at "arm's length" -- the same price that would be charged between unrelated parties.

**Why It Matters:**
- Tax authorities scrutinize intercompany transactions to ensure profits are not artificially shifted to low-tax jurisdictions
- Penalties for non-compliance are severe (20-40% of underpayment in the US; similar in other jurisdictions)
- Documentation requirements are extensive and must be contemporaneous

### 3.2 Common Intercompany Transactions

| Transaction | Description | Transfer Pricing Method |
|------------|-------------|----------------------|
| IP License | Parent licenses IP to subsidiary | Comparable Uncontrolled Price (CUP) or Cost Plus |
| Management Services | Parent provides management services to subsidiary | Cost Plus or Transactional Net Margin Method (TNMM) |
| Intercompany Loan | Parent loans money to subsidiary | CUP (comparable interest rates) |
| Cost Sharing | Entities share R&D costs and IP | Cost Sharing Arrangement per IRC Section 482 regulations |
| Goods Sales | Parent sells goods to distribution subsidiary | Resale Price Method or Comparable Profits Method |

### 3.3 OECD Transfer Pricing Guidelines

The OECD Transfer Pricing Guidelines (2022) are the international standard referenced by most countries:
- Arm's length principle (Article 9 of OECD Model Tax Convention)
- Five transfer pricing methods: CUP, Resale Price, Cost Plus, TNMM, Profit Split
- Documentation requirements: Master File (group-level) + Local File (entity-level) + Country-by-Country Report (CbCR) for groups with >EUR 750M revenue
- Benchmarking studies using comparable company data

---

## 4. Permanent Establishment Risk

### 4.1 What Is Permanent Establishment?

A permanent establishment (PE) is a fixed place of business through which a foreign enterprise carries on its business. Having a PE in a country triggers corporate tax obligations in that country.

**Common PE Triggers:**
| Trigger | Risk Level | Example |
|---------|-----------|---------|
| Office or workspace | High | Renting office space for employees in another country |
| Dependent agent | High | Employee who habitually concludes contracts on behalf of the company |
| Fixed place of business | High | Warehouse, manufacturing facility |
| Remote employees | Medium | Employee working from home in another country |
| Extended projects | Medium | Construction or service project exceeding 6-12 months |
| Server/data center | Low-Medium | Physical server in a data center (but cloud hosting generally no PE) |
| Frequent business travel | Low | Employees regularly visiting a country for sales or meetings |

### 4.2 PE Risk Mitigation

- Use EOR (legal employer is the EOR entity, reducing PE risk for the client company)
- Ensure remote employees do not have authority to conclude contracts
- Limit the scope of activities performed in the foreign jurisdiction
- Monitor duration of projects and employee presence in foreign jurisdictions
- Obtain local tax counsel opinion on PE risk before establishing presence
- Structure intercompany agreements to reflect actual activities (commissionaire, limited risk distributor)

---

## 5. International IP Protection

### 5.1 Patent Filing Strategy

**Patent Cooperation Treaty (PCT):**
- File single international application designating 150+ countries
- 30-month window from priority date to enter national phase (file in individual countries)
- Allows deferring country-specific costs while preserving rights globally
- Cost: $3,000-5,000 for PCT application; $10,000-30,000+ per country in national phase

**Priority Strategy:**
1. File provisional patent in US (establish priority date)
2. Within 12 months: File PCT application (preserves global options)
3. Within 30 months of priority: Enter national phase in target countries
4. Target countries: US, EU (European Patent Office -- single application, designate member states), China, Japan, South Korea, India, UK (post-Brexit, separate from EPO)

### 5.2 Trademark Filing Strategy

**Madrid Protocol:**
- File single international application based on home registration/application
- Designate target countries (120+ members)
- Each designated country examines independently
- Cost-effective for multi-country filing ($600-1,500 per country)
- Risk: If home registration fails within 5 years, international registration may be affected

**Direct Filing:**
- File directly in each country's trademark office
- More expensive but independent of home registration
- Necessary for non-Madrid Protocol countries
- May be advisable for strategically critical markets

### 5.3 Copyright Protection

- Berne Convention: Automatic copyright protection in 180+ countries (no registration required)
- However, registration in the US is required for statutory damages and attorney's fees
- In some countries, registration strengthens enforcement ability
- Consider registering in key markets where enforcement may be needed

---

## 6. International Contracts

### 6.1 Key Considerations

- **Choice of law:** Which country's law governs? Consider: familiarity, favorability, enforceability
- **Dispute resolution:** International arbitration preferred (New York Convention enables enforcement in 170+ countries); specify institution (ICC, LCIA, SIAC), seat, language
- **CISG:** Exclude explicitly if you do not want the UN Convention on Contracts for the International Sale of Goods to apply
- **Currency:** Specify currency and exchange rate mechanism
- **Language:** Specify governing language; if bilingual, which version controls
- **Local law requirements:** Some countries require contracts in the local language (Brazil, China), notarization, or government registration

### 6.2 Enforceability Considerations

- Foreign judgments: No universal enforcement treaty; enforceability varies by country
- Arbitral awards: Enforceable in 170+ countries via New York Convention
- Local counsel: Always engage local counsel in the counterparty's jurisdiction for material contracts
- Sovereign immunity: Government counterparties may have immunity from suit; include express waiver if possible

---

## 7. Data Localization

Refer to `04_privacy/international_privacy.md` for comprehensive treatment of:
- Cross-border data transfer mechanisms
- Data localization requirements by country
- GDPR international transfer compliance
- China PIPL data localization
- Architecture solutions for data residency

---

*Reference: OECD Transfer Pricing Guidelines (2022); OECD Model Tax Convention; PCT (Patent Cooperation Treaty); Madrid Protocol; Berne Convention; New York Convention on Arbitral Awards (1958); Baker McKenzie Global Employment Law Guide; DLA Piper International Employment Law Guide.*
