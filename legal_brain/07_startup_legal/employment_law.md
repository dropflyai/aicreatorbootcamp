# Employment Law -- Hiring, Classification, Compliance, and Termination

> Module: `07_startup_legal/employment_law.md`
> Brain: Legal Brain
> Authority: Domain-specific (startup legal)
> Disclaimer: Educational/informational only. Not legal advice.

---

## 1. At-Will Employment

### 1.1 The At-Will Doctrine

In the United States, employment is presumed to be "at-will," meaning either the employer or the employee can terminate the employment relationship at any time, for any reason (or no reason), without prior notice. Montana is the only state that is not at-will (requires good cause for termination after a probationary period).

### 1.2 Exceptions to At-Will Employment

| Exception | Description | Example |
|-----------|------------|---------|
| Statutory Exception | Federal and state laws prohibit termination for certain reasons | Termination for filing a workers' comp claim; for taking FMLA leave; for being a whistleblower |
| Discrimination Exception | Cannot terminate based on protected characteristics | Race, color, religion, sex, national origin, age (40+), disability, genetic information, pregnancy |
| Public Policy Exception | Cannot terminate for reasons that violate public policy | Firing employee for refusing to commit illegal act; for jury service; for voting |
| Implied Contract Exception | Employer's own statements/policies may create an implied contract | Employee handbook promises "progressive discipline"; offer letter states "permanent employment" |
| Implied Covenant of Good Faith | Some states imply a covenant of good faith in employment relationships | Terminating employee right before bonus vests (to avoid paying bonus) |

### 1.3 Practical Implications for Startups

- **Offer letters, not employment agreements** (for most employees): Offer letters confirm at-will status; employment agreements may inadvertently create contractual obligations
- **Handbook disclaimers:** Every employee handbook must include a prominent at-will disclaimer
- **Avoid promises:** Do not promise "permanent" employment, "guaranteed" terms, or that employees will only be terminated "for cause"
- **Exception: Key executives** may have employment agreements with for-cause termination requirements, severance provisions, and change-of-control protections

---

## 2. Offer Letters vs. Employment Agreements

### 2.1 Offer Letter (Standard for Most Employees)

**What to Include:**
| Element | Details |
|---------|--------|
| Position and title | Role description; reporting structure |
| Start date | Expected first day |
| Compensation | Base salary (annualized); pay frequency |
| Equity | Option grant (number of shares, vesting schedule, subject to board approval and plan terms) |
| Benefits | Overview of benefits eligibility |
| At-will statement | Clear statement that employment is at-will and can be terminated at any time |
| Contingencies | Background check, reference check, proof of work authorization |
| Confidentiality | Reference to CIIA/NDA to be signed on first day |
| Governing law | State law governing the agreement |

**What NOT to Include:**
- Guaranteed employment duration
- "Permanent" or "guaranteed" language
- Specific termination procedures that could be construed as contractual
- Detailed benefits descriptions (reference benefit plan documents instead)
- Promises about future compensation increases

### 2.2 Employment Agreement (For Key Executives)

When to use: CEO, CFO, CTO, VP-level and above; any hire where special terms are negotiated.

**Additional Provisions:**
- Defined term (or at-will with specified notice period)
- Termination provisions: For Cause (defined), Without Cause, Good Reason (constructive termination)
- Severance: Specified severance upon termination without cause or for good reason (typically 3-12 months of base salary + COBRA continuation + equity acceleration)
- Change of Control: Single-trigger or double-trigger equity acceleration; severance enhancement
- Non-compete (where enforceable) and non-solicitation
- Section 280G: Golden parachute provisions (reduce payments to avoid excise tax or gross-up)
- Clawback: Company can recover compensation in specified circumstances
- Dispute resolution: Arbitration clause (common for executive agreements)

---

## 3. Independent Contractor vs. Employee

### 3.1 Why Classification Matters

Misclassifying employees as independent contractors exposes the company to:
- Back taxes (employer's share of FICA) + penalties + interest
- Overtime liability (FLSA)
- Benefits liability (health insurance, 401(k), workers' comp)
- Employment discrimination liability
- State unemployment insurance liability
- Penalties under state laws (California: $5,000-25,000 per violation under AB5)
- DOL enforcement actions
- IRS Section 530 scrutiny

### 3.2 IRS 20-Factor Test

The IRS historically used 20 factors (Revenue Ruling 87-41) grouped into three categories:

**Behavioral Control:**
| Factor | Employee | Contractor |
|--------|----------|-----------|
| Instructions on when/where/how to work | Company provides detailed instructions | Worker determines methods |
| Training | Company provides training | Worker has own expertise |
| Integration | Worker's services integrated into business | Worker provides independent service |
| Personal service | Must be performed by specific individual | Can delegate or subcontract |
| Work sequence | Company determines order of work | Worker determines sequence |

**Financial Control:**
| Factor | Employee | Contractor |
|--------|----------|-----------|
| Payment method | Regular salary/wage | Per project or milestone |
| Business expenses | Company reimburses expenses | Worker bears own expenses |
| Investment in tools | Company provides tools/equipment | Worker invests in own tools |
| Profit/loss opportunity | No opportunity | Can profit or lose money |
| Multiple clients | Works exclusively for one company | Serves multiple clients |

**Relationship Type:**
| Factor | Employee | Contractor |
|--------|----------|-----------|
| Written agreement | Employment offer letter | Independent contractor agreement |
| Benefits | Eligible for company benefits | No company benefits |
| Permanence | Ongoing, indefinite relationship | Project-based, defined scope |
| Key activity | Performs core business activities | Performs peripheral or specialized services |

### 3.3 ABC Test (California AB5 and Other States)

California, Massachusetts, New Jersey, and other states use the stricter ABC test. A worker is an employee UNLESS the hiring entity proves ALL THREE:

**A -- Autonomy:** The worker is free from the control and direction of the hiring entity in connection with the performance of the work, both under the contract and in fact.

**B -- Business:** The worker performs work that is outside the usual course of the hiring entity's business.

**C -- Customarily:** The worker is customarily engaged in an independently established trade, occupation, or business of the same nature as that involved in the work performed.

**Prong B Is the Killer:** A software company hiring a software developer as a contractor likely fails Prong B (the developer performs work within the company's usual business). This effectively means software engineers, designers, and product managers at tech companies must be W-2 employees in ABC-test states.

---

## 4. Wage and Hour Compliance (FLSA)

### 4.1 Exempt vs. Non-Exempt Classification

The Fair Labor Standards Act (FLSA) requires overtime pay for "non-exempt" employees. To be "exempt," an employee must meet BOTH a salary test AND a duties test.

**Salary Test (2024):**
- Minimum salary: $684/week ($35,568/year) -- DOL proposed increase to $1,128/week ($58,656/year) in 2024 rule; litigation may affect final amount
- Must be paid on a salary basis (not hourly)
- California threshold is higher (~$66,560/year in 2024, tied to minimum wage)

**Duties Tests (White-Collar Exemptions):**

| Exemption | Primary Duty | Requirements |
|-----------|-------------|-------------|
| Executive | Managing the enterprise or department | Directs 2+ employees; has hiring/firing authority or recommendation |
| Administrative | Office/non-manual work related to management or business operations | Exercises discretion and independent judgment on significant matters |
| Professional (Learned) | Work requiring advanced knowledge in a field of science or learning | Requires prolonged, specialized intellectual instruction |
| Professional (Creative) | Invention, imagination, originality, or talent | Artistic or creative fields |
| Computer Employee | Computer systems analyst, programmer, software engineer | Salary of $684/week OR hourly rate of $27.63; specific computer duties |
| Outside Sales | Making sales away from employer's place of business | Customarily and regularly engaged away from the office |
| Highly Compensated | Total annual compensation of $107,432+ | Customarily and regularly performs at least one exempt duty |

### 4.2 Overtime Requirements

- Non-exempt employees: Overtime pay at 1.5x regular rate for hours over 40 in a workweek
- California: Also requires daily overtime (>8 hours/day at 1.5x; >12 hours/day at 2x)
- Cannot waive overtime rights (even with employee agreement)
- Comp time in lieu of overtime: Not allowed for private employers (allowed for public employers)

---

## 5. Anti-Discrimination Law

### 5.1 Federal Anti-Discrimination Statutes

| Statute | Protected Characteristic | Applies To |
|---------|------------------------|-----------|
| Title VII (Civil Rights Act) | Race, color, religion, sex (including sexual orientation and gender identity per *Bostock* (2020)), national origin | Employers with 15+ employees |
| ADA (Americans with Disabilities Act) | Disability (physical or mental) | Employers with 15+ employees |
| ADEA (Age Discrimination in Employment Act) | Age (40 and older) | Employers with 20+ employees |
| EPA (Equal Pay Act) | Sex (pay equity) | All employers |
| GINA (Genetic Information Nondiscrimination Act) | Genetic information | Employers with 15+ employees |
| PDA (Pregnancy Discrimination Act) | Pregnancy, childbirth, related conditions | Employers with 15+ employees |
| PWFA (Pregnant Workers Fairness Act, 2023) | Reasonable accommodation for pregnancy-related conditions | Employers with 15+ employees |

### 5.2 Reasonable Accommodation (ADA)

**Interactive Process:**
1. Employee requests accommodation (formal or informal request)
2. Employer engages in interactive process (dialogue to identify effective accommodation)
3. Employer provides reasonable accommodation unless it poses an "undue hardship"
4. Document every step of the interactive process

**Common Accommodations in Tech:**
- Modified work schedule (flexible hours, compressed workweek)
- Remote work arrangement
- Ergonomic equipment (standing desk, specialized keyboard, screen reader)
- Modified job duties (reassign marginal functions)
- Leave of absence (beyond FMLA)
- Quiet workspace or noise-canceling headphones

---

## 6. Harassment Prevention

### 6.1 Legal Framework

**Title VII:** Prohibits harassment based on any protected characteristic when it creates a hostile work environment or results in a tangible employment action (quid pro quo).

**Hostile Work Environment Elements:**
1. Unwelcome conduct
2. Based on a protected characteristic
3. Severe or pervasive enough to create a hostile or abusive work environment
4. Employer knew or should have known and failed to take prompt corrective action

### 6.2 Employer Obligations

- Written anti-harassment policy (clearly defines prohibited conduct, reporting channels, investigation process, non-retaliation)
- Regular training (mandatory in CA, CT, DE, IL, ME, NY, and others)
- Prompt investigation of all complaints (take seriously regardless of formality)
- Corrective action proportional to the severity (verbal warning to termination)
- Non-retaliation protection for complainants and witnesses
- Document everything

---

## 7. Termination Best Practices

### 7.1 Pre-Termination Checklist

- [ ] Confirm the reason for termination is legitimate and documented
- [ ] Review the employee's protected characteristics (any discrimination risk?)
- [ ] Review the employee's recent activity (any protected activity: complaints, FMLA leave, whistleblowing?)
- [ ] Ensure consistency (have similarly situated employees been treated the same way?)
- [ ] Review any employment agreement or promise made at hiring
- [ ] Review restrictive covenants (non-compete, non-solicit, confidentiality)
- [ ] Determine if WARN Act notification is required (plant closing or mass layoff: 60 days notice for 100+ employees)
- [ ] Calculate final pay requirements (state-specific: CA requires immediate final pay upon involuntary termination)
- [ ] Prepare separation agreement and general release (if offering severance)
- [ ] Plan access revocation (IT, badges, systems)

### 7.2 Separation Agreements

**Key Provisions:**
- General release of all claims (Age Discrimination: 21-day consideration period; 7-day revocation period per OWBPA)
- Severance payment (amount and schedule)
- COBRA continuation information
- Equity treatment (vested options exercise period; unvested forfeiture or acceleration)
- Confidentiality of the agreement terms
- Non-disparagement (mutual)
- Return of company property
- Cooperation clause (assistance with transition, litigation)
- Reaffirmation of existing restrictive covenants

### 7.3 WARN Act

**Federal WARN Act:**
- 60 days advance written notice required for plant closings (50+ employees) or mass layoffs (500+ employees, or 50-499 if 33% of workforce)
- Applies to employers with 100+ employees
- Exceptions: Faltering company, unforeseeable business circumstances, natural disaster

**State WARN Acts (More Protective):**
- California WARN: 60 days notice; applies at 75+ employees; lower thresholds (50+ in 30-day period)
- New York WARN: 90 days notice; applies at 50+ employees
- New Jersey WARN: 90 days notice; requires severance of one week per year of service
- Illinois WARN: 60 days notice; additional requirements

---

*Reference: FLSA (29 USC Section 201 et seq.); Title VII (42 USC Section 2000e); ADA (42 USC Section 12101); ADEA (29 USC Section 621); Bostock v. Clayton County, 590 U.S. 644 (2020); IRS Revenue Ruling 87-41; California AB5 (Labor Code Section 2775); WARN Act (29 USC Section 2101); EEOC Compliance Manual; DOL Wage and Hour Division guidance.*
