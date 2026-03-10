# Finance Review Checklist -- Mandatory Pre-Release Verification

Every financial deliverable must pass this checklist before release.
Every month-end close must pass this checklist before books are finalized.
No exceptions. No shortcuts. Numbers that are not verified are not trustworthy.

---

## HOW TO USE THIS CHECKLIST

1. Complete the relevant section based on deliverable type
2. Mark each item as PASS, FAIL, or N/A
3. Any FAIL in a critical item = deliverable cannot be released
4. Reviewer must sign and date each section
5. Completed checklists are retained as part of the audit trail

---

## SECTION 1: FINANCIAL MODEL CHECKLIST

Complete before any model is shared, presented, or used for decisions.

### Architecture Review

- [ ] **Assumptions tab exists**: All inputs are in a dedicated assumptions section, not scattered through formulas
- [ ] **No hardcoded values in formulas**: Every number in a formula traces to an input cell or source
- [ ] **Color coding followed**: Blue = input, Black = formula, Green = link, Red = override
- [ ] **No circular references**: Tested by enabling iterative calculation check
- [ ] **Error traps in place**: #REF, #DIV/0, #N/A handled or flagged, not ignored
- [ ] **Named ranges used**: Key ranges use meaningful names, not cell references
- [ ] **Table of contents present**: For models with 5+ tabs, navigation is clear
- [ ] **Version number and date in filename**: Model is version-controlled

### Assumptions Validation

- [ ] **Every assumption has a source**: No "management estimate" without supporting data
- [ ] **Confidence levels assigned**: High / Medium / Low for each major assumption
- [ ] **Assumptions validated with business owners**: Revenue assumptions confirmed by Sales, headcount by HR, etc.
- [ ] **Sensitivity ranges defined**: For each key assumption, +/- range is documented
- [ ] **Assumptions register is current**: Last validated date is within 30 days

### Output Validation

- [ ] **Balance sheet balances**: Assets = Liabilities + Equity in every period
- [ ] **Cash flow reconciles**: Ending cash matches balance sheet cash in every period
- [ ] **Revenue ties to driver model**: Revenue output matches build-up from unit economics or pipeline
- [ ] **Headcount ties to expense**: Salary expense matches headcount plan x compensation data
- [ ] **Growth rates are realistic**: YoY growth compared to market data and historical trends
- [ ] **Terminal value is reasonable**: Terminal value is <75% of total enterprise value (or explained if higher)
- [ ] **Negative values make sense**: Check that costs are negative and revenues are positive (or vice versa per convention)

### Stress Testing

- [ ] **Base case defined**: Most likely scenario with clear narrative
- [ ] **Upside case modeled**: What happens if things go better than expected
- [ ] **Downside case modeled**: What happens if key assumptions are wrong
- [ ] **Break-even identified**: At what point do the economics fail
- [ ] **Key variable sensitivities**: Top 5 variables tested for impact on bottom line

### Critical Items (Must Pass)

- [ ] Balance sheet balances in every period
- [ ] Every assumption has a documented source
- [ ] At least 3 scenarios modeled (base, up, down)
- [ ] No circular references

---

## SECTION 2: MONTH-END CLOSE CHECKLIST

Complete before finalizing books for any period.

### Pre-Close Activities

- [ ] **Cutoff applied**: All transactions through period end are recorded; next period transactions excluded
- [ ] **Accruals posted**: All known expenses incurred but not yet billed are accrued
- [ ] **Prepaid expenses amortized**: Monthly portions of prepaid items recognized
- [ ] **Deferred revenue adjusted**: Revenue recognized only for obligations fulfilled in the period
- [ ] **Depreciation/amortization recorded**: Fixed assets and intangibles depreciated per schedule
- [ ] **Intercompany transactions reconciled**: All intercompany balances net to zero

### Revenue Verification

- [ ] **Revenue recognized per ASC 606**: 5-step model applied for each revenue stream
- [ ] **Contract review completed**: New contracts reviewed for performance obligations
- [ ] **Deferred revenue schedule updated**: Beginning balance + billings - recognized = ending balance ties
- [ ] **Revenue reconciled to billing system**: GL revenue matches invoicing system within tolerance
- [ ] **Variable consideration estimated**: Refunds, credits, and discounts estimated and recorded

### Expense Verification

- [ ] **All invoices received and recorded**: AP team confirmed no significant unrecorded invoices
- [ ] **Expense classification reviewed**: Expenses in correct GL accounts (COGS, S&M, R&D, G&A)
- [ ] **Payroll reconciled**: Payroll provider report matches GL within $100
- [ ] **Commissions calculated and accrued**: Sales commissions calculated per plan and accrued
- [ ] **Stock-based compensation recorded**: SBC expense calculated and recorded per ASC 718
- [ ] **Credit card charges reconciled**: All corporate card charges coded and recorded

### Balance Sheet Verification

- [ ] **Cash reconciled to bank statements**: Bank reconciliation completed with zero unexplained variance
- [ ] **AR aging reviewed**: Aging report reviewed, allowance for doubtful accounts adjusted
- [ ] **AP aging reviewed**: Aging report reviewed, no disputed or aged items unresolved
- [ ] **Fixed asset register updated**: Additions, disposals, and depreciation current
- [ ] **Debt balances confirmed**: Loan balances match lender statements
- [ ] **Equity roll-forward complete**: Beginning equity + net income +/- adjustments = ending equity

### Close Quality Gates

- [ ] **Variance analysis complete**: Actual vs. budget for all major P&L line items
- [ ] **Variances >10% explained**: Written explanation for each significant variance
- [ ] **Flux analysis documented**: Significant changes from prior period explained
- [ ] **Close calendar met**: All close tasks completed by deadline
- [ ] **Review meeting held**: Controller and CFO reviewed financials before finalization

### Critical Items (Must Pass)

- [ ] Bank reconciliation completed with zero unexplained variance
- [ ] Revenue recognized per ASC 606
- [ ] Balance sheet balances
- [ ] All variances >10% explained in writing

---

## SECTION 3: BOARD DECK / INVESTOR MATERIALS CHECKLIST

Complete before any financial presentation to board or investors.

### Content Completeness

- [ ] **Executive summary present**: 1-page snapshot with key metrics and narrative
- [ ] **KPI dashboard current**: Revenue, ARR, cash, burn, runway, NRR, CAC, LTV displayed
- [ ] **P&L included**: Actual vs. budget vs. prior year with variance analysis
- [ ] **Cash position detailed**: Current cash, runway calculation, 13-week outlook
- [ ] **Forecast updated**: Full-year forecast with changes from prior forecast highlighted
- [ ] **Risks and opportunities listed**: Top 3 of each with quantified impact
- [ ] **Asks specified**: What the finance team or company needs from the board

### Accuracy Verification

- [ ] **All numbers tie to source**: Every number in the deck traces to the financial model or GL
- [ ] **Period references correct**: No stale data from prior period mixed in
- [ ] **Calculations verified**: Percentages, growth rates, ratios all recalculated independently
- [ ] **Chart data matches tables**: Visuals accurately represent the underlying data
- [ ] **Comparison periods correct**: YoY, QoQ comparisons use the right periods

### Communication Quality

- [ ] **Chart titles state conclusions**: Not "Revenue" but "Revenue grew 22% QoQ driven by enterprise"
- [ ] **Jargon defined**: First use of EBITDA, ARR, NRR, CAC, LTV includes definition
- [ ] **"So what" on every page**: Each page has a clear takeaway, not just data
- [ ] **Narrative is forward-looking**: Not just what happened but what it means for the future
- [ ] **Bad news delivered with action plan**: Every negative metric includes what is being done
- [ ] **Maximum 3 takeaways per page**: Information density managed

### Sensitivity and Scenario Inclusion

- [ ] **Forecast includes scenarios**: Base, upside, and downside presented
- [ ] **Key risks quantified**: Dollar impact of top risks stated
- [ ] **Assumptions called out**: Major assumptions behind the forecast are visible
- [ ] **Probability assessments included**: Likelihood of achieving plan stated

### Critical Items (Must Pass)

- [ ] All numbers verified against source data
- [ ] Executive summary accurately reflects detailed data
- [ ] No stale data from prior periods
- [ ] Risks are quantified with action plans

---

## SECTION 4: VALUATION CHECKLIST

Complete before any valuation is used for fundraising, M&A, 409A, or board reporting.

### Methodology

- [ ] **Minimum 3 methods used**: DCF, comparable companies, and at least one other
- [ ] **Methods are independent**: Each method uses its own inputs, not derived from another
- [ ] **Triangulation documented**: Results compared across methods with convergence analysis
- [ ] **Divergence explained**: If methods differ by >30%, structural reason documented
- [ ] **Weighting justified**: Weight given to each method is explained (not arbitrary)

### DCF Specific

- [ ] **Projection period appropriate**: 5-10 years with explicit annual assumptions
- [ ] **Terminal value calculated two ways**: Perpetuity growth method and exit multiple method
- [ ] **Terminal value reasonableness**: <75% of total value or explanation provided
- [ ] **WACC documented**: Beta, risk-free rate, equity risk premium, cost of debt all sourced
- [ ] **Sensitivity table included**: WACC vs. terminal growth rate matrix
- [ ] **Free cash flow build-up clear**: EBITDA to FCF bridge documented

### Comparable Analysis Specific

- [ ] **Minimum 5 comparables**: Each comparable meets 4 of 6 selection criteria
- [ ] **Selection criteria documented**: Why each comparable was chosen (and why others excluded)
- [ ] **Multiple metrics used**: Revenue multiple, EBITDA multiple, growth-adjusted metrics
- [ ] **Outliers identified and addressed**: Extreme values noted and impact assessed
- [ ] **Multiples sourced and dated**: Market data is current (within 30 days)

### Transaction Analysis Specific

- [ ] **Transactions are relevant**: Same industry, similar size, recent (within 3 years)
- [ ] **Control premium considered**: If using acquisition multiples for minority valuation, adjust
- [ ] **Market conditions noted**: Were transactions done in a different market environment?
- [ ] **Minimum 3 transactions**: Enough data points for meaningful analysis

### Critical Items (Must Pass)

- [ ] Minimum 3 independent valuation methods used
- [ ] Triangulation analysis documented
- [ ] All inputs sourced and current
- [ ] Sensitivity analysis included for DCF

---

## SECTION 5: FORECAST / BUDGET CHECKLIST

Complete before any forecast is submitted or budget is finalized.

### Revenue Forecast

- [ ] **Bottom-up and top-down reconciled**: Revenue built from unit economics AND validated against market
- [ ] **Pipeline-based for near term**: Next 2 quarters use actual pipeline data
- [ ] **Cohort analysis applied**: Retention and expansion rates based on cohort behavior
- [ ] **Seasonality factored**: Historical seasonal patterns reflected in monthly/quarterly splits
- [ ] **New product revenue separated**: Existing vs. new product revenue clearly distinguished
- [ ] **ASP trends reflected**: Average selling price trends incorporated

### Expense Forecast

- [ ] **Headcount plan drives payroll**: Every salary line ties to a named position or planned hire
- [ ] **Hiring timeline realistic**: Ramp time and start dates reflect recruiting reality
- [ ] **Variable costs tied to revenue**: COGS and commissions scale with revenue model
- [ ] **Fixed costs validated**: Rent, insurance, subscriptions verified against contracts
- [ ] **One-time costs identified**: Non-recurring items flagged and excluded from run-rate
- [ ] **Contingency included**: 5-10% contingency buffer for unplanned expenses

### Cash Forecast

- [ ] **AR collection assumptions**: Based on historical DSO, not payment terms
- [ ] **AP payment assumptions**: Based on actual payment behavior, not terms
- [ ] **Capital expenditure planned**: Hardware, software, office buildout budgeted
- [ ] **Debt service included**: Loan payments, interest, line of credit activity
- [ ] **Tax payments estimated**: Quarterly estimated tax payments included
- [ ] **Working capital changes**: Changes in AR, AP, inventory factored into cash flow

### Validation

- [ ] **Compared to prior year actuals**: Growth rates and changes from prior year are explainable
- [ ] **Compared to industry benchmarks**: Key ratios compared to peer data
- [ ] **Reviewed by department heads**: Each department head has signed off on their section
- [ ] **Stress tested**: Downside scenario shows survivability
- [ ] **Board-approved (for budgets)**: Final budget has board approval

### Critical Items (Must Pass)

- [ ] Revenue forecast has both bottom-up and top-down validation
- [ ] Every headcount line ties to a position
- [ ] Cash forecast shows 12+ month runway (or action plan if less)
- [ ] Department heads have reviewed their sections

---

## SECTION 6: TAX AND COMPLIANCE CHECKLIST

Complete before any tax filing or compliance submission.

### Tax Preparation

- [ ] **All income sources identified**: Every revenue stream classified for tax purposes
- [ ] **Deductions documented**: Every deduction supported by documentation
- [ ] **Depreciation schedules current**: Tax depreciation matches IRS schedules (may differ from book)
- [ ] **R&D tax credit evaluated**: Qualifying activities and expenses identified
- [ ] **State nexus analysis current**: Presence in each state evaluated for filing requirements
- [ ] **Transfer pricing documented**: For multi-entity, intercompany pricing has documentation

### Filing Requirements

- [ ] **All filing deadlines tracked**: Federal, state, local deadlines calendared
- [ ] **Extensions filed if needed**: Extension filed before deadline with estimated payment
- [ ] **Estimated payments current**: Quarterly estimated payments calculated and paid
- [ ] **Sales tax obligations met**: Sales tax collected, reported, and remitted in all required jurisdictions
- [ ] **1099 / W-2 filings prepared**: All information returns ready by deadline

### Compliance Monitoring

- [ ] **SOX compliance** (if applicable): All material controls documented and tested
- [ ] **Revenue recognition compliance**: ASC 606 applied consistently
- [ ] **Lease accounting compliance**: ASC 842 applied for all leases
- [ ] **Equity compensation compliance**: ASC 718 applied, 409A valuations current
- [ ] **Data privacy compliance**: Financial data handling meets GDPR/CCPA requirements

### Critical Items (Must Pass)

- [ ] All filing deadlines met or extensions filed
- [ ] R&D credit documentation is complete (if claiming)
- [ ] 409A valuation is current (within 12 months or after material event)

---

## SECTION 7: AUDIT READINESS CHECKLIST

Complete semi-annually to ensure readiness for external audit.

### Documentation

- [ ] **Chart of accounts documented**: Current COA with descriptions for each account
- [ ] **Accounting policies documented**: Revenue recognition, capitalization, depreciation, etc.
- [ ] **Close procedures documented**: Step-by-step close process with timeline
- [ ] **Control documentation current**: All internal controls described and tested
- [ ] **Significant estimates documented**: Methodology for bad debt, useful life, contingencies

### Supporting Schedules

- [ ] **Revenue schedule**: Monthly revenue by stream with supporting detail
- [ ] **Deferred revenue schedule**: Roll-forward with beginning, additions, recognized, ending
- [ ] **Fixed asset schedule**: Complete with additions, disposals, depreciation, net book value
- [ ] **Debt schedule**: All borrowings with terms, balances, interest, maturities
- [ ] **Equity schedule**: All issuances, options, warrants with complete detail
- [ ] **Lease schedule**: All leases classified and measured per ASC 842

### Access and Availability

- [ ] **Audit team access planned**: System access, workspace, and key contacts arranged
- [ ] **PBC (Prepared by Client) list reviewed**: All items on auditor PBC list assigned and tracked
- [ ] **Prior year audit findings addressed**: All prior year management letter points resolved
- [ ] **Key personnel available**: Finance team calendar cleared for audit period

### Critical Items (Must Pass)

- [ ] Accounting policies are documented and current
- [ ] All supporting schedules are complete and tie to GL
- [ ] Prior year audit findings have been addressed

---

## CHECKLIST ENFORCEMENT

- This checklist is mandatory for all financial deliverables
- "We ran out of time" is not an acceptable reason for skipping items
- Critical items must ALL pass before release
- Completed checklists are retained for 7 years as part of audit trail
- Checklist compliance is reviewed during quarterly quality assessment

---

## END OF REVIEW CHECKLIST
