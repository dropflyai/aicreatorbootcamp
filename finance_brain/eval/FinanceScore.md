# Finance Score -- Quality Enforcement (Authoritative)

This document defines how financial analysis quality is evaluated.
Every model, every forecast, every board deck must be scored before presentation.

If financial quality is not measurable, it is not enforced.
If it is not enforced, the numbers lie.

---

## SCORING RULES (MANDATORY)

Each financial deliverable must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = deliverable cannot be presented or used:
- **Accuracy**
- **GAAP Compliance**
- **Controls**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No single dimension < 2
- All failure conditions checked and cleared

### Weighted Scoring

Some dimensions carry more weight in final scoring:
- Accuracy: 1.5x weight
- GAAP Compliance: 1.5x weight
- Controls: 1.5x weight
- All others: 1.0x weight

Weighted average must be >= 4.0 to pass.

---

## 1. ACCURACY

**Question:**
Has every number been triple-checked, cross-validated, and sensitivity tested?

### Triple-Check Protocol

Every financial deliverable must pass three independent checks:

| Check | Method | Who |
|-------|--------|-----|
| **Self-check** | Creator reviews all formulas, traces precedents, validates outputs | Analyst |
| **Peer-check** | Second person reviews independently, tests edge cases | Peer analyst |
| **Logic-check** | Sanity test against benchmarks, prior periods, and industry data | Manager or controller |

### Cross-Validation Requirements

- Every key output must be validated against at least one independent source
- Revenue projections cross-checked against pipeline data, market size, and historical growth
- Expense projections cross-checked against vendor contracts, headcount plan, and historical trends
- Cash flow cross-checked against bank statements and AR/AP aging reports
- Balance sheet must balance (assets = liabilities + equity). Always. No exceptions.

### Sensitivity Testing Requirements

Every model with projections must include:
- **Base case**: Most likely scenario with documented assumptions
- **Upside case**: Optimistic scenario (define what must go right)
- **Downside case**: Pessimistic scenario (define what could go wrong)
- **Break-even analysis**: At what point do the economics stop working?
- **Key variable sensitivity**: For each critical assumption, show impact of +/- 20% change

### Scoring Guide

- **5** -- Triple-checked with zero errors found. Cross-validated against 2+ independent sources. Full sensitivity analysis with clear narrative for each scenario. Results are defensible under scrutiny.
- **4** -- Triple-checked with minor formatting corrections only. Cross-validated against 1 source. Sensitivity analysis complete for base/up/down cases. Minor gaps in variable-level sensitivity.
- **3** -- Double-checked. One cross-validation performed. Base and one alternative case modeled. Some assumptions untested.
- **2** -- Single check performed. No cross-validation. Limited or no sensitivity analysis. Errors possible.
- **1** -- Unchecked output. No validation. Numbers may contain material errors.

Score <3 = deliverable MUST NOT be presented or used for decisions.

---

## 2. MODEL INTEGRITY

**Question:**
Does the model have a complete assumptions register with documented sources for every input?

### Assumptions Register Requirements

Every financial model must contain an assumptions register (dedicated tab or section) with:

| Field | Requirement | Example |
|-------|------------|---------|
| **Assumption ID** | Unique identifier | A-001 |
| **Assumption** | Clear statement | "Revenue grows 30% YoY in Year 2" |
| **Source** | Where this number comes from | "Q3 pipeline data + historical conversion" |
| **Confidence Level** | High / Medium / Low | Medium |
| **Last Validated** | Date of last validation | 2025-01-15 |
| **Owner** | Who is responsible for this assumption | VP Sales (revenue), VP Eng (headcount) |
| **Sensitivity** | Impact if assumption is wrong by 20% | "EBITDA changes by $[X]" |

### Model Architecture Standards

- **No hardcoded numbers in formulas.** Every input must trace to the assumptions register or a source data tab.
- **No circular references.** Period.
- **Color coding enforced:**
  - Blue font: Inputs / assumptions (user-changeable)
  - Black font: Formulas / calculations (do not edit)
  - Green font: Links to other tabs or external sources
  - Red font: Overrides or manual adjustments (must be documented)
- **Every tab has a purpose.** No orphan tabs. Table of contents required for models with 5+ tabs.
- **Version control.** Model filename includes version number and date. Change log maintained.

### Formula Audit Requirements

- All formulas must use named ranges or structured references (not cell addresses like "B7")
- SUMIF, VLOOKUP, INDEX-MATCH functions must reference clearly labeled ranges
- No hidden rows or columns that contain active calculations
- Error checks built in: #REF, #DIV/0, #N/A traps documented and handled

### Scoring Guide

- **5** -- Complete assumptions register with sources, confidence levels, and sensitivity for every input. No hardcoded values. Color coding followed. Version controlled. Zero architectural issues.
- **4** -- Assumptions register complete for major inputs. Minor inputs may lack source documentation. Model architecture is clean with minor deviations from standards.
- **3** -- Assumptions register exists but incomplete. Some hardcoded values without documentation. Architecture is understandable but not to standard.
- **2** -- Partial assumptions register. Multiple hardcoded values. Model is functional but fragile.
- **1** -- No assumptions register. Black box model. Cannot determine where numbers come from.

Score <3 = model CANNOT be presented to board or investors.

---

## 3. GAAP COMPLIANCE

**Question:**
Does the financial reporting follow GAAP standards for revenue recognition, accrual timing, and expense classification?

### Revenue Recognition (ASC 606)

Every revenue recognition decision must follow the 5-step model:

| Step | Requirement | Documentation |
|------|------------|---------------|
| 1. Identify the contract | Written agreement with commercial substance | Contract reference |
| 2. Identify performance obligations | Distinct goods/services listed | Obligation inventory |
| 3. Determine transaction price | Total consideration including variable elements | Price allocation memo |
| 4. Allocate transaction price | Standalone selling price for each obligation | Allocation methodology |
| 5. Recognize revenue | When (or as) obligation is satisfied | Recognition schedule |

### Common SaaS Revenue Recognition Issues

| Scenario | Correct Treatment | Common Error |
|----------|------------------|-------------|
| Annual subscription paid upfront | Recognize monthly (1/12 per month) | Recognizing full amount at payment |
| Implementation services + subscription | Separate obligations; recognize implementation over delivery period | Bundling with subscription |
| Usage-based pricing | Recognize as usage occurs | Estimating and recognizing in advance |
| Multi-year deal with discount | Allocate discount across all years using SSP | Front-loading revenue |
| Free trial converting to paid | Revenue begins at conversion, not trial start | Recognizing during trial |
| Refund rights | Estimate refunds and reduce revenue | Ignoring refund obligations |

### Accrual Timing Requirements

- Expenses recognized when incurred, not when paid
- Revenue recognized when earned, not when received
- Prepaid expenses amortized over benefit period
- Accrued liabilities recorded when obligation is certain and amount estimable
- Month-end cutoff procedures documented and followed

### Expense Classification Standards

| Category | What Belongs | What Does Not Belong |
|----------|-------------|---------------------|
| COGS | Hosting, support staff, implementation | Sales salaries, marketing spend |
| Sales & Marketing | Sales comp, advertising, events | Product development costs |
| R&D | Engineering salaries, tools, contractors | Customer support costs |
| G&A | Finance, legal, office, insurance | Revenue-generating activities |

### Scoring Guide

- **5** -- Full ASC 606 compliance with documentation for every revenue stream. Accruals properly timed and documented. Expense classification follows standards. Audit-ready.
- **4** -- Revenue recognition correct for major streams. Minor documentation gaps. Accruals substantially correct. Classification appropriate with minor misallocations.
- **3** -- Revenue recognition mostly correct but one or two streams have questionable treatment. Some accruals delayed or misestimated. Classification has noticeable errors.
- **2** -- Revenue recognition has material issues. Accrual timing inconsistent. Expense classification unreliable. Requires significant remediation.
- **1** -- Revenue recognition is incorrect or undocumented. Cash basis mixed with accrual. Classification is unreliable. Audit would find material misstatement.

Score <3 = financial statements CANNOT be issued or relied upon.

---

## 4. VALUATION RIGOR

**Question:**
Has the valuation been performed using 3 or more methods, triangulated, and stress-tested?

### Required Valuation Methods (Minimum 3)

| Method | When to Use | Key Inputs |
|--------|------------|------------|
| **DCF (Discounted Cash Flow)** | Always -- foundational method | Free cash flow projections, WACC, terminal value |
| **Comparable Company Analysis** | When public peers exist | Revenue multiples, EBITDA multiples from peers |
| **Comparable Transaction Analysis** | When M&A comps exist | Recent acquisition multiples in sector |
| **Precedent Transaction** | For M&A or fundraising | Prior transactions in the space |
| **Revenue Multiple (ARR)** | For SaaS companies | ARR x market multiple range |
| **LTV/CAC Multiple** | For subscription businesses | Unit economics extrapolation |

### Triangulation Requirements

- Minimum 3 methods used independently
- Results plotted on a range (low / mid / high per method)
- Final valuation range must explain why methods converge or diverge
- If methods diverge by >30%, explain the structural reason
- Weight each method based on reliability of inputs (not desired outcome)

### Comparable Company Selection Criteria

For comps to be valid, companies must match on at least 4 of 6:
1. Industry / sector
2. Business model (SaaS, marketplace, services, etc.)
3. Revenue scale (within 0.5x to 3x)
4. Growth rate (within 50% relative)
5. Geographic market
6. Margin profile

### DCF Specific Requirements

- Projection period: 5-10 years with explicit assumptions per year
- Terminal value: calculated via both perpetuity growth and exit multiple methods
- Terminal value should not exceed 75% of total enterprise value (if it does, flag and explain)
- WACC calculation documented with beta source, risk-free rate, equity risk premium
- Sensitivity table: WACC vs. terminal growth rate matrix

### Scoring Guide

- **5** -- Three or more methods executed independently. Triangulation documented with convergence analysis. Comparable company selection criteria met. DCF has full sensitivity. Valuation range is defensible and clearly communicated.
- **4** -- Three methods used. Triangulation done with minor gaps. Comparable selection mostly appropriate. DCF sensitivity present but limited.
- **3** -- Two methods used. Limited triangulation. Some comparable companies are poor fits. DCF exists but assumptions weakly supported.
- **2** -- Single method used. No triangulation. Comparable selection questionable. Valuation is a single number, not a range.
- **1** -- Back-of-napkin valuation. No methodology. Number pulled from desired outcome.

Score <3 = valuation CANNOT be presented to investors or board. Not credible.

---

## 5. CAPITAL EFFICIENCY

**Question:**
Is there a 13-week cash flow forecast maintained, and are capital allocation decisions optimized?

### 13-Week Cash Flow Requirements

| Component | Frequency | Detail Level |
|-----------|-----------|-------------|
| **Cash receipts** | Weekly | By customer segment, payment type |
| **Cash disbursements** | Weekly | By category (payroll, vendors, taxes, debt) |
| **Net cash flow** | Weekly | Receipts minus disbursements |
| **Ending cash balance** | Weekly | Running balance with minimum threshold marked |
| **Variance to forecast** | Weekly | Actual vs. projected with explanations |

### Cash Management Rules

| Metric | Healthy | Watch | Critical |
|--------|---------|-------|----------|
| Cash runway | >12 months | 6-12 months | <6 months |
| AR collection (DSO) | <45 days | 45-60 days | >60 days |
| AP management (DPO) | 30-45 days | <30 or >60 days | Vendors complaining |
| Burn rate trend | Decreasing or stable | Slightly increasing | Accelerating |
| Revenue/cash coverage | Revenue > burn | Revenue 0.7-1.0x burn | Revenue < 0.7x burn |

### Capital Allocation Framework

Every significant spend (>$10K or recurring >$5K/month) must be evaluated:
1. What is the expected return? (Revenue, efficiency, risk reduction)
2. What is the payback period?
3. What is the opportunity cost? (What else could this money fund?)
4. Is this reversible? (Can we cancel/reduce if it does not work?)
5. Does this extend or shorten runway?

### Scoring Guide

- **5** -- 13-week cash flow maintained weekly with <5% variance. All capital allocation decisions documented with ROI analysis. Runway >12 months. DSO and DPO optimized. Burn rate trending favorably.
- **4** -- 13-week cash flow maintained with <10% variance. Most capital decisions documented. Runway >9 months. DSO/DPO within acceptable range.
- **3** -- Cash flow tracked monthly (not weekly). Some capital decisions lack analysis. Runway 6-9 months. DSO/DPO need improvement.
- **2** -- Cash flow tracked quarterly or sporadically. Capital allocation ad hoc. Runway under 6 months with no action plan.
- **1** -- No cash flow forecast. Spending not tracked systematically. Runway unknown.

Score <3 = cash position is at risk. Immediate action required.

---

## 6. RISK ASSESSMENT

**Question:**
Have financial risks been identified, quantified, and stress-tested using rigorous methodologies?

### Risk Identification Framework

| Risk Category | Examples | Assessment Method |
|--------------|---------|-------------------|
| **Revenue risk** | Customer concentration, churn, pricing pressure | Revenue sensitivity, cohort analysis |
| **Market risk** | Interest rates, FX, commodity prices | VaR, scenario analysis |
| **Operational risk** | Key person dependency, vendor concentration | Impact probability matrix |
| **Credit risk** | Customer default, AR aging | AR aging analysis, credit scoring |
| **Liquidity risk** | Cash shortfall, credit facility availability | 13-week cash flow, covenant compliance |
| **Regulatory risk** | Tax law changes, compliance failures | Regulatory monitoring, reserve analysis |

### Monte Carlo Simulation Requirements

For any projection used in fundraising, board presentations, or strategic decisions:
- Minimum 1,000 iterations (10,000 preferred)
- Key variables parameterized with probability distributions (not point estimates)
- Output must include: mean, median, 10th percentile, 90th percentile, standard deviation
- Probability of achieving plan must be stated (e.g., "65% probability of hitting revenue target")
- Identify which variables contribute most to outcome variance (tornado analysis)

### Stress Testing Scenarios

Every financial plan must be tested against:

| Scenario | Parameters | Purpose |
|----------|-----------|---------|
| **Mild recession** | Revenue -15%, churn +25%, hiring freeze | Survivability test |
| **Major customer loss** | Lose top 3 customers simultaneously | Concentration risk test |
| **Extended fundraising** | No new capital for 18 months | Runway test |
| **Rapid growth** | Revenue 2x plan, hiring 1.5x plan | Scaling risk test |
| **Regulatory shock** | Major compliance cost increase | Adaptability test |

### Scoring Guide

- **5** -- Complete risk register with quantified impact and probability. Monte Carlo simulation performed with documented methodology. All 5 stress scenarios tested. Mitigation plans documented for top risks. Risk reporting integrated into monthly financial review.
- **4** -- Risk register with most risks quantified. Scenario analysis (not full Monte Carlo) performed. 3-4 stress scenarios tested. Mitigation plans for critical risks.
- **3** -- Risk register exists but not all risks quantified. Limited scenario analysis. 1-2 stress scenarios tested. Some mitigation plans.
- **2** -- Risks acknowledged but not systematically assessed. No simulation or scenario analysis. No stress testing.
- **1** -- No risk assessment performed. Financial plan assumes everything goes right.

Score <3 = financial plan CANNOT be relied upon for strategic decisions.

---

## 7. COMMUNICATION

**Question:**
Is the financial information board-ready and accessible to non-finance stakeholders?

### Board Deck Standards

| Section | Required Content | Quality Bar |
|---------|-----------------|-------------|
| **Executive summary** | 1-page financial health snapshot | CFO must be able to present in 2 minutes |
| **Key metrics dashboard** | Revenue, cash, burn, runway, ARR, NRR | Trend lines, not just current numbers |
| **P&L summary** | Actual vs. budget vs. prior year | Variance explanations for items >10% off budget |
| **Cash position** | Current cash, runway, 13-week outlook | Visual cash bridge chart |
| **Forecast update** | Updated full-year forecast with changes noted | Changes from prior forecast highlighted |
| **Risks and opportunities** | Top 3 risks, top 3 opportunities | Quantified impact for each |
| **Asks** | What the finance team needs from the board | Specific, actionable requests |

### Non-Finance Accessibility Rules

- Every chart must have a title that states the conclusion, not just the topic
  - BAD: "Monthly Revenue"
  - GOOD: "Revenue grew 22% QoQ, driven by enterprise segment"
- Every table must have a "so what" annotation
- Jargon must be defined on first use (EBITDA, ARR, NRR, CAC, LTV)
- Footnotes for methodology, not in the main narrative
- Maximum 3 key takeaways per page
- Use visual hierarchy: most important information largest and first

### Narrative Requirements

- Lead with the conclusion, not the methodology
- State what changed from last period and why
- For every "bad" number, include what is being done about it
- For every "good" number, include what is driving it and whether it is sustainable
- Avoid "we think" or "we believe" -- use "data shows" or "based on [X], we project"

### Scoring Guide

- **5** -- Board deck meets all standards. Non-finance executives understand the material without additional explanation. Every chart tells a story. Narrative is clear, data-driven, and forward-looking.
- **4** -- Board deck substantially meets standards. Minor accessibility gaps. Most charts are clear. Narrative is good with minor areas needing clarification.
- **3** -- Board deck exists but is dense or jargon-heavy. Some charts lack context. Narrative assumes financial literacy. Board has questions that should have been anticipated.
- **2** -- Financial information is raw data, not a narrative. Non-finance stakeholders are confused. Charts are unclear. No executive summary.
- **1** -- No board-ready materials. Finance information shared via spreadsheet dump. No narrative or context.

Score <3 = materials must be revised before presentation.

---

## 8. CONTROLS

**Question:**
Are segregation of duties, reconciliation processes, and audit trails properly maintained?

### Segregation of Duties (SOD) Requirements

| Process | Must Be Separated | Violation |
|---------|-------------------|-----------|
| **Invoicing vs. cash collection** | Different people create invoices and process payments | Same person does both |
| **Payroll processing vs. approval** | Different people process payroll and approve it | Same person does both |
| **Expense approval vs. payment** | Different people approve expenses and execute payments | Same person does both |
| **Journal entries vs. approval** | Different people prepare and post journal entries | Same person does both |
| **Bank reconciliation vs. transactions** | Person reconciling did not create the transactions | Same person does both |
| **Vendor setup vs. payment** | Different people add vendors and process payments | Same person does both |

### Reconciliation Requirements

| Reconciliation | Frequency | Tolerance | Deadline |
|---------------|-----------|-----------|----------|
| Bank reconciliation | Monthly | $0 variance | 5 business days after month-end |
| AR reconciliation | Monthly | <$100 variance | 7 business days after month-end |
| AP reconciliation | Monthly | <$100 variance | 7 business days after month-end |
| Intercompany reconciliation | Monthly | $0 variance | 10 business days after month-end |
| Revenue reconciliation | Monthly | <$500 variance | 10 business days after month-end |
| Fixed asset reconciliation | Quarterly | $0 variance | 15 business days after quarter-end |
| Deferred revenue reconciliation | Monthly | <$500 variance | 10 business days after month-end |

### Audit Trail Requirements

- Every transaction must be traceable to a source document
- Every journal entry must have a description, preparer, approver, and date
- System access logs maintained for financial systems
- Changes to master data (vendor, customer, chart of accounts) must be logged
- Month-end close checklist completed and signed off each period
- Retention policy: 7 years minimum for all financial records

### Internal Control Testing

| Control | Test Method | Frequency |
|---------|------------|-----------|
| SOD compliance | Access review | Quarterly |
| Bank reconciliation | Sample test | Monthly |
| Revenue recognition | Walkthrough | Quarterly |
| Expense approval | Sample test | Monthly |
| Payroll accuracy | Recalculation test | Quarterly |
| Journal entry review | Sample test | Monthly |
| System access | User access review | Semi-annually |

### Scoring Guide

- **5** -- Full SOD implemented and tested. All reconciliations completed on time with zero tolerance met. Complete audit trail for all transactions. Internal control testing on schedule. Audit-ready at all times.
- **4** -- SOD in place with minor exceptions documented. Reconciliations completed on time with minor variances under tolerance. Audit trail substantially complete. Testing mostly on schedule.
- **3** -- SOD has gaps that are identified but not yet remediated. Some reconciliations delayed. Audit trail has gaps. Testing behind schedule.
- **2** -- SOD has material gaps. Reconciliations inconsistent. Audit trail incomplete. Limited internal control testing.
- **1** -- No SOD. Reconciliations not performed regularly. No audit trail. No internal control testing.

Score <3 = financial controls are insufficient. Remediation plan required immediately.

---

## FAILURE CONDITIONS (AUTOMATIC TRIGGERS)

These conditions trigger immediate action regardless of overall score:

### Critical Failures (Deliverable Stop)

| Condition | Trigger | Required Action |
|-----------|---------|----------------|
| Cash runway <6 months without action plan | CRITICAL | Board notification within 48 hours. Scenario planning initiated. Cost reduction options prepared. |
| Model without sensitivity analysis | Board block | Cannot present to board or investors. Sensitivity analysis must be added. |
| Valuation without comparable validation | Credibility failure | Cannot use for fundraising. Must add comparables or justify methodology. |
| Revenue recognition error >$100K | Material misstatement | Restatement analysis required. External auditor notification if applicable. |
| Reconciliation >30 days overdue | Control failure | Reconciliation must be completed before any financial reporting. |
| SOD violation in payment processing | Fraud risk | Process must be corrected immediately. Transactions during violation period audited. |
| Forecast variance >25% without explanation | Trust failure | Root cause analysis required. Forecasting methodology review initiated. |
| Missing audit trail for transactions >$50K | Compliance risk | Transactions must be documented retroactively. Process gap addressed. |

### Warning Conditions (Monitoring Required)

| Condition | Trigger | Required Action |
|-----------|---------|----------------|
| Cash runway 6-9 months | Watch | Monthly board updates on cash position |
| Forecast variance 15-25% | Accuracy concern | Assumption review in next forecast cycle |
| Reconciliation variance exceeds tolerance | Process gap | Root cause analysis and remediation |
| AR aging >60 days for top 10 customers | Collection risk | Active collection plan initiated |
| Burn rate increasing QoQ | Efficiency concern | Expense review and budget reforecast |

---

## FINAL FINANCE SCORE DECISION

**Hard Fail Dimensions (Accuracy, GAAP Compliance, Controls):**
- Score <3 = DELIVERABLE CANNOT BE USED

**All Dimensions:**
- Weighted average >= 4.0 = DELIVERABLE APPROVED
- Weighted average 3.0-3.9 = REVISION REQUIRED
- Weighted average < 3.0 = DELIVERABLE REJECTED -- REDO

**Failure Conditions:**
- Any critical failure = DELIVERABLE STOPPED regardless of score
- Two or more warning conditions = CONTROLLER REVIEW

Scores must be stated explicitly before deliverable is released.

### Score Card Template

```markdown
## Finance Score: [Deliverable Name]

**Type:** [Model / Forecast / Board Deck / Valuation / Analysis]
**Prepared By:** [Name]
**Reviewed By:** [Name]
**Date:** [Date]
**Version:** [X.X]

| Dimension | Score | Weight | Weighted | Notes |
|-----------|-------|--------|----------|-------|
| Accuracy | /5 | 1.5x | /7.5 | |
| Model Integrity | /5 | 1.0x | /5.0 | |
| GAAP Compliance | /5 | 1.5x | /7.5 | |
| Valuation Rigor | /5 | 1.0x | /5.0 | |
| Capital Efficiency | /5 | 1.0x | /5.0 | |
| Risk Assessment | /5 | 1.0x | /5.0 | |
| Communication | /5 | 1.0x | /5.0 | |
| Controls | /5 | 1.5x | /7.5 | |

**Weighted Average:** [X.X] / 5.0
**Failure Conditions:** [CLEAR / TRIGGERED -- list any]
**Verdict:** APPROVED / REVISION REQUIRED / REJECTED
**Required Actions:** [if any]
```

---

## SCORING CADENCE

| Deliverable | Frequency | Scored By |
|-------------|-----------|-----------|
| Monthly financial close | Monthly | Controller + CFO |
| Board deck | Quarterly | CFO + CEO |
| Financial model updates | At each revision | Analyst + Controller |
| Valuation work | At each engagement | CFO + External advisor |
| Forecast submissions | Monthly | FP&A lead + CFO |
| Audit readiness | Semi-annually | Controller + External auditor |

---

## ENFORCEMENT RULE

Financial quality is enforced, not assumed.
Numbers without methodology are opinions.
Models without assumptions are fiction.
Reports without controls are unreliable.

Do not justify low scores. Fix the gaps.
Revise until standards are met.
If it cannot be audited, it cannot be trusted.

---

## END OF FINANCE SCORE
