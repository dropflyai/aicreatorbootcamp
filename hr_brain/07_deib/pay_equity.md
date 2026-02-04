# Pay Equity Analysis -- Methodology, Reporting, and Remediation

## Purpose

This module defines the framework for conducting rigorous pay equity analysis. Pay equity is both a legal requirement and an ethical imperative. Unequal pay for equal work based on gender, race, or other protected characteristics violates federal and state law and erodes organizational trust. The HR Brain mandates annual pay equity analysis using statistically rigorous methods, with transparent reporting and prompt remediation of identified disparities.

---

## 1. Legal Framework

### 1.1 Federal Law

| Statute | Year | Key Provision |
|---------|:---:|--------------|
| **Equal Pay Act (EPA)** | 1963 | Prohibits sex-based pay discrimination for substantially equal work in same establishment. Defenses: seniority, merit, quantity/quality of production, factor other than sex. |
| **Title VII** | 1964 | Prohibits pay discrimination based on race, color, religion, sex, national origin. Broader than EPA (not limited to "substantially equal" work). |
| **Lilly Ledbetter Fair Pay Act** | 2009 | Each discriminatory paycheck resets the 180/300-day filing deadline. |
| **Executive Order 11246** | 1965 | Federal contractors must maintain affirmative action and non-discrimination in compensation. |

### 1.2 State and Local Laws

State pay equity laws increasingly exceed federal protections:

| Provision | States with Laws | Key Requirements |
|-----------|-----------------|-----------------|
| Equal pay for comparable work | CA, MA, OR, WA, IL, NY | Broader than EPA "substantially equal" standard |
| Salary history ban | 20+ states/cities | Cannot ask about or rely on prior salary in setting pay |
| Pay transparency | CO, CA, WA, NY, CT, RI, and expanding | Must disclose salary range in postings and/or upon request |
| Pay data reporting | CA, IL | Annual pay data filing with state agency by demographic group |
| Private right of action | Most states | Employees can sue directly for pay discrimination |

### 1.3 OFCCP Requirements (Federal Contractors)

Federal contractors with 50+ employees and $50,000+ in contracts must:
- Conduct annual compensation analysis
- Maintain affirmative action plans
- Submit EEO-1 Component 1 data (demographics by job category)
- Respond to OFCCP compliance evaluations (desk audits, on-site reviews)

---

## 2. Pay Equity Analysis Methodology

### 2.1 Types of Pay Gap Analysis

| Analysis Type | Method | What It Shows | Limitations |
|--------------|--------|--------------|-------------|
| **Unadjusted (raw) gap** | Compare mean/median pay by group without controls | Total earnings difference; includes occupational segregation effects | Does not control for legitimate pay factors |
| **Adjusted (controlled) gap** | Regression controlling for legitimate factors | Unexplained pay difference after accounting for job, level, location, experience | Depends on model specification; may over-control |
| **Cohort analysis** | Compare pay for specific groups (same job, same level, same tenure) | Most granular view of like-for-like equity | Small sample sizes limit statistical power |

### 2.2 The Regression Approach

Multiple regression is the standard methodology for adjusted pay equity analysis:

```
ln(Compensation) = B0 + B1(Job Family) + B2(Job Level) + B3(Location)
                 + B4(Tenure) + B5(Performance) + B6(Education)
                 + B7(Gender) + B8(Race/Ethnicity) + e

Where:
- Dependent variable: Log of total compensation (log transformation normalizes skewed pay distributions)
- Legitimate factors (B1-B6): Control variables representing non-discriminatory pay determinants
- Protected characteristics (B7-B8): Coefficients reveal unexplained pay gaps
- e: Error term (unexplained variation)

INTERPRETATION:
- If B7 (Gender) is statistically significant and negative for women:
  There is an unexplained gender pay gap after controlling for legitimate factors
- Coefficient magnitude: A coefficient of -0.03 means women earn approximately 3% less
  than men with the same job, level, location, tenure, performance, and education
- Statistical significance: p < 0.05 is the standard threshold
```

### 2.3 Legitimate Pay Factors (Controls)

The following factors are generally considered legitimate determinants of pay differences:

| Factor | Justification | Data Source | Potential Risk |
|--------|-------------|-------------|---------------|
| Job family and function | Different market rates for different functions | HRIS job codes | Occupational segregation may itself be discriminatory |
| Job level/grade | Higher levels command higher pay | HRIS level field | If promotion process is biased, level is a "tainted" variable |
| Geographic location | Cost-of-labor differentials | Work location | If location assignment is biased |
| Tenure in role | Experience and institutional knowledge | HRIS hire/promotion dates | If women or POC are promoted more slowly |
| Performance rating | Pay for performance | Performance system | If rating process has demographic bias |
| Education | Specialized knowledge | HRIS or survey | If degree requirements screen out diverse candidates unnecessarily |
| Prior experience | Market-relevant experience | HRIS or survey | If prior experience is a proxy for prior pay (salary history) |

### 2.4 The "Tainted Variable" Problem

Some legitimate pay factors may themselves be influenced by discrimination:

```
Example: Controlling for job level

Suppose women are systematically under-promoted (promotion bias).
Women cluster at lower levels, earning less because of level.
If we control for level, the adjusted gap appears small.
But the root cause (promotion bias) is hidden inside the control variable.

Solution:
1. Run the regression WITH level as a control (shows within-level equity)
2. Run the regression WITHOUT level (shows total compensation equity)
3. Separately analyze promotion rates by demographic group
4. Report BOTH adjusted and unadjusted gaps
```

### 2.5 Statistical Methodology Details

**Sample requirements:**
- Minimum 30 observations per group for reliable regression
- When sample sizes are small, use cohort analysis or exact matching instead
- For intersectional analysis, sample sizes may require combining years of data

**Model diagnostics:**
- R-squared: How much variation in pay is explained by the model (target: 0.80+)
- Residual analysis: Check for heteroscedasticity, normality, and outliers
- Multicollinearity: Check VIF (variance inflation factor) for each variable (VIF > 5 is concerning)
- Influential observations: Identify and investigate outliers that disproportionately affect results

**Significance testing:**
- Use p < 0.05 as the threshold for statistical significance
- Report confidence intervals for gap estimates
- For practical significance, flag any gap > 2% even if not statistically significant (may reflect real inequity in smaller samples)

---

## 3. Conducting a Pay Equity Audit

### 3.1 Annual Audit Process

```
STEP 1: DATA PREPARATION (Weeks 1-2)
  - Extract pay data from HRIS (base salary, total cash, total compensation)
  - Extract employee demographics (gender, race/ethnicity -- from EEO self-ID)
  - Extract legitimate pay factors (job, level, location, tenure, performance)
  - Clean data: resolve missing values, validate job coding, confirm demographic data
  - Define analysis groups (sufficient sample sizes per group)

STEP 2: DESCRIPTIVE ANALYSIS (Week 3)
  - Calculate unadjusted pay gaps by gender and race/ethnicity
  - Calculate median and mean pay by group and job level
  - Visualize pay distributions (box plots by group within job level)
  - Identify areas of concern (large gaps, small sample sizes)

STEP 3: REGRESSION ANALYSIS (Weeks 3-4)
  - Run full regression model with all legitimate controls
  - Run model without level/grade to assess structural equity
  - Run intersectional models (gender x race interaction terms)
  - Assess model fit and diagnostics
  - Calculate adjusted pay gaps with confidence intervals

STEP 4: COHORT ANALYSIS (Week 4)
  - For each job level x location combination with sufficient sample:
    - Compare pay by gender and race within the cohort
    - Identify individual employees who are statistical outliers (>2 standard deviations below predicted pay)
    - Flag potential remediation candidates

STEP 5: ROOT CAUSE ANALYSIS (Week 5)
  - For any significant gaps identified:
    - Is the gap driven by starting salary differences?
    - Is the gap driven by differential merit increases?
    - Is the gap driven by promotion velocity differences?
    - Is the gap driven by negotiation differences?
    - What systemic factors may be contributing?

STEP 6: REMEDIATION PLANNING (Weeks 5-6)
  - Identify employees requiring pay adjustments
  - Calculate remediation cost
  - Develop implementation timeline
  - Prepare communication plan

STEP 7: REPORTING AND ACTION (Weeks 6-8)
  - Report to CHRO and executive team
  - Implement pay adjustments
  - Document analysis and decisions (attorney-client privilege consideration)
  - Plan systemic changes to prevent future gaps
```

### 3.2 Attorney-Client Privilege Considerations

Many organizations conduct pay equity analysis under attorney-client privilege to protect the analysis from discovery in litigation:

- **Best practice**: Retain outside counsel to direct the analysis
- The analysis is conducted "at the direction of counsel for the purpose of providing legal advice"
- All documents marked "PRIVILEGED AND CONFIDENTIAL -- ATTORNEY-CLIENT COMMUNICATION"
- Results shared with counsel first; counsel provides advice to the organization
- **Limitation**: Privilege does not protect underlying pay data (only the analysis and conclusions)
- **Tension**: Transparency about pay equity requires sharing results, which may waive privilege

---

## 4. Pay Gap Reporting

### 4.1 Internal Reporting

**Executive report (annual):**
```
PAY EQUITY ANALYSIS SUMMARY

Analysis date: [Date]
Population: [N employees]
Analysis method: Multiple regression with [controls listed]

UNADJUSTED GAPS:
  Gender: Women earn [X]% of men's median pay
  Race:   [Group] earns [X]% of [reference group] median pay

ADJUSTED GAPS (controlling for job, level, location, tenure, performance):
  Gender: [X]% gap (95% CI: [lower] to [upper]) — [significant/not significant]
  Race:   [X]% gap (95% CI: [lower] to [upper]) — [significant/not significant]

INTERSECTIONAL ANALYSIS:
  Women of color: [X]% adjusted gap
  [Other intersectional groups as sample size permits]

INDIVIDUAL OUTLIERS:
  [N] employees identified as >2 SD below predicted pay
  Estimated remediation cost: $[amount]

ROOT CAUSE FINDINGS:
  [Key findings on starting salary, merit, promotion drivers]

RECOMMENDED ACTIONS:
  1. [Action item with timeline and cost]
  2. [Action item with timeline and cost]
  3. [Action item with timeline and cost]
```

### 4.2 External Reporting

Organizations increasingly publish pay equity data publicly:

| Reporting Level | What to Share | Example |
|----------------|--------------|---------|
| **Basic** | Commitment to pay equity; statement that analysis is conducted annually | "We conduct annual pay equity analysis and are committed to equal pay for equal work." |
| **Moderate** | Aggregate gap figures; actions taken | "Our adjusted gender pay gap is 1.2%. We have remediated $150,000 in pay adjustments this year." |
| **Advanced** | Detailed data by group; methodology description; historical trend | Full pay equity report with methodology, results, intersectional data, and action plan |

---

## 5. Intersectional Analysis

### 5.1 Why Intersectionality Matters

Kimberle Crenshaw's (1989) concept of intersectionality recognizes that individuals hold multiple identities simultaneously, and these intersections create unique experiences that are not captured by analyzing each dimension independently.

**Example**: The gender pay gap for white women may be 5%, and the racial pay gap for Black men may be 7%, but the gap for Black women may be 15% -- not simply additive, but compounding.

### 5.2 Intersectional Analysis Methods

**Interaction terms in regression:**
```
ln(Compensation) = ... + B7(Female) + B8(Black) + B9(Female x Black) + ...

B7 captures the gender effect for non-Black employees
B8 captures the race effect for non-female employees
B9 captures the ADDITIONAL effect of being both female and Black
```

**Separate regressions by group:**
- Run the model separately for each intersectional group
- Compare predicted vs. actual pay for each group
- Requires sufficient sample sizes (minimum 30 per group)

**Cohort comparisons:**
- Within narrowly defined job-level-location cohorts, compare pay across all intersectional groups
- Most intuitive; easiest to communicate; limited by small sample sizes

### 5.3 Reporting Intersectional Results

Report intersectional gaps when sample sizes permit:

```
ADJUSTED PAY GAPS BY INTERSECTIONAL GROUP (relative to White Men)

                  White    Black    Hispanic   Asian
Men               ref      -3.2%    -2.1%     +0.5%
Women            -2.5%     -6.8%    -4.3%     -1.8%
Non-binary       -1.2%     N/A*     N/A*      N/A*

* Sample size insufficient for reliable estimate (<30 observations)

PRIORITY FOR REMEDIATION:
1. Black women (-6.8% adjusted gap)
2. Hispanic women (-4.3% adjusted gap)
3. Black men (-3.2% adjusted gap)
```

---

## 6. Remediation

### 6.1 Individual Remediation

For employees identified as significantly underpaid relative to predicted pay:

```
REMEDIATION DECISION FRAMEWORK:

Employee pay < predicted pay by >5% AND statistical outlier (>2 SD)?
├── Yes → Immediate remediation (adjust to predicted pay within 30 days)
├── 3-5% below predicted → Prioritize in next compensation cycle
├── 1-3% below predicted → Monitor; address in annual cycle
└── Within 1% of predicted → No action needed

Remediation should:
- Be communicated to the employee as a market/equity adjustment
- Not require the employee to have complained or threatened action
- Be documented in the compensation file
- Be retroactive where legally advisable (consult counsel)
```

### 6.2 Systemic Remediation

Individual pay fixes treat symptoms. Systemic changes prevent recurrence:

| Root Cause | Systemic Fix |
|-----------|-------------|
| Starting salary differences | Implement salary bands; ban salary history; standard offer positioning |
| Negotiation penalty | Proactive offer calibration; do not penalize for not negotiating |
| Differential merit increases | Calibrate merit increases for equity; audit merit distribution by group |
| Promotion velocity gaps | Analyze promotion rates by group; address career sponsorship gaps |
| Manager discretion without guardrails | Require compensation decisions within band; manager training on equity |
| Market data reflecting historical bias | Supplement market data with internal equity analysis |

### 6.3 Remediation Budget

```
ANNUAL PAY EQUITY REMEDIATION BUDGET

Analysis year: [Year]
Employees analyzed: [N]
Employees flagged for remediation: [N]
Average adjustment per employee: $[amount]
Total remediation cost: $[amount]
Remediation as % of total payroll: [X]%

Budget approved: $[amount]
Timeline for implementation: [X weeks/months]

Note: Remediation budget is separate from annual merit increase budget.
Pay equity adjustments should not come from an employee's merit increase.
```

---

## 7. Prevention Framework

### 7.1 Proactive Pay Equity Practices

| Practice | When | How |
|----------|------|-----|
| Salary band enforcement | Every offer and adjustment | Require all compensation to fall within approved bands |
| Offer calibration | Every new hire offer | Compare offer to existing employee pay within same cohort |
| Promotion equity check | Every promotion cycle | Analyze promotion increase by demographic group |
| Merit equity check | Every annual cycle | Analyze merit increase by demographic group |
| Salary history ban | Every hiring process | Do not ask about or consider prior salary |
| Pay transparency | Always | Publish salary bands; provide total comp statements |
| Manager training | Annual | Equitable compensation decision-making |
| Annual audit | Annual | Full statistical pay equity analysis |

### 7.2 Pay Equity Monitoring Dashboard

| Metric | Frequency | Alert |
|--------|-----------|-------|
| Unadjusted gender pay gap | Quarterly | >5% |
| Adjusted gender pay gap | Annually (quarterly if prior issues) | >2% |
| Unadjusted racial pay gap | Quarterly | >5% |
| Adjusted racial pay gap | Annually | >2% |
| Starting salary by group (same role/level) | Every hire | >3% difference |
| Merit increase by group (same rating) | Every cycle | >0.5% difference |
| Promotion rate by group | Every cycle | Four-fifths rule violation |
| Compa-ratio distribution by group | Quarterly | >5% difference in median compa-ratio |

---

## References

- Blau, F. D., & Kahn, L. M. (2017). The gender wage gap: Extent, trends, and explanations. *Journal of Economic Literature*, 55(3), 789-865.
- Crenshaw, K. (1989). Demarginalizing the intersection of race and sex. *University of Chicago Legal Forum*, 1989(1), 139-167.
- National Committee on Pay Equity. (2023). *Pay Equity Information*.
- OFCCP. (2023). *Directive 2018-05: Analysis of Contractor Compensation Practices*.
- Payscale. (2023). *State of the Gender Pay Gap Report*.
- SHRM. (2023). *Pay Equity Audit Guide*.
- Schieder, J., & Gould, E. (2016). "Women's work" and the gender pay gap. Economic Policy Institute.

---

**This module governs pay equity analysis. Equal pay for equal work is non-negotiable. Measure, remediate, prevent.**
