# HR Analytics -- People Analytics and Workforce Intelligence

## Purpose

This module establishes the analytical foundations for data-driven HR decision-making. People analytics transforms HR from an intuition-driven function to an evidence-driven discipline. The HR Brain uses analytics not merely for reporting (descriptive), but for diagnosis (why things happen), prediction (what will happen), and prescription (what to do about it).

---

## 1. People Analytics Maturity Model

### 1.1 The Four Levels

Organizations progress through analytics maturity stages. Most remain at Level 1 or 2. The HR Brain targets Level 3-4 operation:

```
Level 4: PRESCRIPTIVE
│   "What should we do?"
│   Optimization, scenario modeling, causal inference
│
Level 3: PREDICTIVE
│   "What will happen?"
│   Attrition prediction, performance forecasting, demand modeling
│
Level 2: DIAGNOSTIC
│   "Why did it happen?"
│   Root cause analysis, driver analysis, segmentation
│
Level 1: DESCRIPTIVE
│   "What happened?"
│   Headcount reports, turnover rates, time-to-fill dashboards
│
Level 0: REACTIVE
    "We don't know what happened."
    No systematic data collection or reporting
```

### 1.2 Required Capabilities at Each Level

| Level | Data Requirements | Technical Skills | Organizational Prerequisites |
|-------|------------------|-----------------|----------------------------|
| Descriptive | Clean HRIS data, basic metrics definitions | SQL, Excel, dashboard tools | Data governance, single source of truth |
| Diagnostic | Linked datasets (performance + engagement + demographics) | Statistical analysis, segmentation | Cross-functional data access, analytics team |
| Predictive | Historical data (2-3 years minimum), feature engineering | Machine learning, regression, survival analysis | Executive sponsorship, model validation processes |
| Prescriptive | Causal models, intervention data, A/B test infrastructure | Causal inference, optimization, experimental design | Experimentation culture, ethical review board |

---

## 2. Core People Metrics

### 2.1 Workforce Composition Metrics

| Metric | Formula | Benchmark | Frequency |
|--------|---------|-----------|-----------|
| Headcount | Total active employees | Context-dependent | Monthly |
| FTE count | Sum of (hours worked / standard hours) | Context-dependent | Monthly |
| Contractor ratio | Contractors / (FTEs + Contractors) | Industry-dependent (tech: 15-25%) | Quarterly |
| Span of control | Direct reports per manager | 5-8 for knowledge work; 15-25 for operational | Quarterly |
| Management ratio | Managers / Total employees | 8-12% | Quarterly |
| Diversity representation | % by demographic group per level | Market availability; aspirational targets | Quarterly |

### 2.2 Talent Acquisition Metrics

| Metric | Formula | Benchmark | Significance |
|--------|---------|-----------|-------------|
| Time to fill | Days from requisition approval to offer acceptance | 30-45 days (tech), 20-30 days (other) | Hiring velocity |
| Time to productivity | Days from start date to full productivity (defined by role) | 60-120 days | Onboarding effectiveness |
| Quality of hire | Composite: performance rating + hiring manager satisfaction + retention at 12 months | Top 2 quartiles | Selection effectiveness |
| Source effectiveness | Quality of hire by source channel | Varies by channel | Recruiting investment allocation |
| Offer acceptance rate | Offers accepted / Offers extended | 85-95% | Competitiveness of offer |
| Cost per hire | Total recruiting costs / Number of hires | $4,700 avg (SHRM); $15-30K for tech | Recruiting efficiency |
| Applicant-to-hire ratio | Applications received / Hires made | 20:1 to 250:1 depending on role/market | Funnel efficiency |
| Diversity of pipeline | % underrepresented groups at each stage | Compare to market availability | Inclusive hiring effectiveness |

### 2.3 Retention and Turnover Metrics

| Metric | Formula | Benchmark | Alert Threshold |
|--------|---------|-----------|----------------|
| Overall turnover rate | (Separations in period / Avg headcount) x 100 | 10-15% annually (knowledge work) | >20% |
| Voluntary turnover | Voluntary separations / Avg headcount | 8-12% annually | >15% |
| Regrettable turnover | High-performer voluntary departures / Total voluntary | Track trend | >30% of voluntary |
| First-year turnover | Employees leaving within 12 months / New hires | <15% | >25% |
| Retention rate by cohort | (Cohort size at end - New hires) / Cohort size at start | >85% at 12 months | <75% |
| Flight risk score | Predicted probability of departure within N months | Model-dependent | Top decile |
| Turnover cost | (Separation + Vacancy + Replacement + Training) per departure | 50-200% of annual salary | Quantify for executive reporting |

### 2.4 Engagement Metrics

| Metric | Instrument | Measurement Frequency | Key Validity |
|--------|-----------|----------------------|-------------|
| Engagement index | Gallup Q12 or custom validated survey | Annual + quarterly pulse | Gallup: r = .42 with productivity |
| Employee Net Promoter Score (eNPS) | "How likely to recommend as employer?" (0-10) | Quarterly | Directional; limited diagnostic value alone |
| Manager effectiveness | Upward feedback (3-5 item scale) | Semi-annual | Strongest predictor of team engagement |
| Psychological safety | Edmondson 7-item scale | Annual | Predictor of learning behavior and innovation |
| Intent to stay | "I plan to be here 12 months from now" (5-point) | Quarterly | Leading indicator of turnover |

---

## 3. Workforce Planning Analytics

### 3.1 Demand Forecasting

Workforce demand forecasting models project future headcount requirements based on business drivers:

**Ratio-based forecasting:**
```
Future headcount = Projected business volume x Historical staffing ratio

Example:
- Current: 500 customers per CSR
- Projected customers next year: 10,000
- Required CSRs: 10,000 / 500 = 20
- Current CSRs: 15
- Net hiring need: 5
```

**Regression-based forecasting:**
```
Headcount = B0 + B1(Revenue) + B2(Product lines) + B3(Geography count) + e

Fit model on historical data (minimum 8 quarters recommended)
Use projected business variables to forecast headcount
Calculate confidence intervals for planning scenarios
```

**Scenario planning:**
- Base case: Expected business trajectory
- Bull case: Aggressive growth scenario (+20-30% above base)
- Bear case: Contraction scenario (-15-25% below base)
- Black swan: Severe disruption scenario

### 3.2 Supply Forecasting

Internal labor supply modeling uses Markov chain analysis:

```
┌──────────┐    Promotion    ┌──────────┐    Promotion    ┌──────────┐
│  Junior   │ ──────────────→│   Mid    │ ──────────────→│  Senior  │
│  (n=100)  │   P(promo)=.15│  (n=80)  │   P(promo)=.10│  (n=40)  │
└──────────┘                 └──────────┘                 └──────────┘
     │                            │                            │
     │ P(exit)=.20                │ P(exit)=.12               │ P(exit)=.08
     ↓                            ↓                            ↓
   EXIT                         EXIT                         EXIT

Transition matrix T:
              Junior    Mid    Senior    Exit
Junior    [   0.65    0.15    0.00     0.20  ]
Mid       [   0.00    0.78    0.10     0.12  ]
Senior    [   0.00    0.00    0.92     0.08  ]

Future state = Current state x T^n (for n periods)
```

### 3.3 Gap Analysis

```
Workforce gap = Demand forecast - Supply forecast

If gap > 0: Build (train), Buy (hire), Borrow (contractors), Bind (retain)
If gap < 0: Restructure, reskill, redeploy, reduce (RIF as last resort)
```

---

## 4. Predictive Attrition Modeling

### 4.1 Model Design

Predictive attrition models estimate the probability that an individual employee will voluntarily leave within a defined time horizon (typically 6-12 months).

**Common features (predictors):**

| Feature Category | Specific Features | Expected Direction |
|-----------------|-------------------|-------------------|
| Compensation | Compa-ratio, time since last raise, equity vesting cliff | Low compa-ratio → higher risk |
| Tenure | Months in role, months in company, months since promotion | Curvilinear (U-shaped for company tenure) |
| Performance | Recent review rating, rating trajectory, goal attainment | Mixed (both high and low performers leave) |
| Manager | Manager tenure, manager engagement, manager span | Poor manager → higher risk |
| Engagement | Last survey score, score change, participation rate | Declining scores → higher risk |
| Work patterns | PTO usage changes, overtime patterns, meeting load | Sudden changes signal disengagement |
| External | Unemployment rate, industry hiring volume, competitor postings | Hot labor market → higher risk |
| Demographics | Commute distance, department, level | Location matters; level effects vary |

### 4.2 Model Selection

| Model | Pros | Cons | When to Use |
|-------|------|------|------------|
| Logistic regression | Interpretable, coefficients as odds ratios, well-understood | Assumes linear log-odds, limited interactions | Small datasets, regulatory environments requiring explainability |
| Random forest | Handles non-linearity, feature importance, robust | Less interpretable, risk of overfitting | Medium datasets, when prediction accuracy is priority |
| Survival analysis (Cox PH) | Models time-to-event, handles censoring, hazard ratios | Proportional hazards assumption | When timing of departure matters, not just if |
| Gradient boosting (XGBoost) | Highest accuracy, handles missing data, feature interactions | Black box, requires careful tuning | Large datasets, when accuracy justifies complexity |

### 4.3 Model Validation

- **Train/test split**: 70/30 or 80/20, stratified by outcome
- **Cross-validation**: 5-fold or 10-fold for hyperparameter tuning
- **Metrics**: AUC-ROC (target >0.75), precision-recall (especially with class imbalance), calibration plots
- **Temporal validation**: Train on historical data, test on future data (out-of-time validation)
- **Fairness audit**: Check for disparate impact across protected groups (four-fifths rule applied to risk scores)

### 4.4 Ethical Guardrails

Predictive attrition models create significant ethical risk if misused:

- **NEVER** use protected characteristics (race, gender, age, disability) as features
- **NEVER** use model predictions to justify adverse employment actions
- **NEVER** share individual risk scores with managers without proper training and context
- **ALWAYS** audit models for disparate impact across demographic groups
- **ALWAYS** validate that model features are not proxies for protected characteristics
- **ALWAYS** combine model output with human judgment and direct employee conversation
- **ALWAYS** use predictions for retention investment (positive intervention), not surveillance

---

## 5. A/B Testing in HR

### 5.1 When to Experiment

A/B testing (randomized controlled experiments) provides the strongest evidence for causal claims. Apply when:

- Introducing new programs (onboarding redesign, training methods, feedback tools)
- Testing communication strategies (offer letter framing, benefits enrollment messaging)
- Evaluating policy changes (remote work policies, meeting-free days, PTO structures)
- Comparing vendor solutions (ATS platforms, learning management systems)

### 5.2 Experimental Design

**Minimum requirements:**
1. **Clear hypothesis**: "Changing X will improve Y by Z amount"
2. **Random assignment**: Participants randomly assigned to treatment or control
3. **Adequate sample size**: Power analysis to ensure sufficient statistical power (target 80%)
4. **Appropriate duration**: Long enough to capture the effect (avoid novelty effects)
5. **Single variable**: Isolate the treatment effect (change one thing at a time)
6. **Pre-registration**: Document hypothesis, design, and analysis plan before running

**Sample size calculation:**
```
n = (Z_alpha/2 + Z_beta)^2 x (2 x sigma^2) / delta^2

Where:
- Z_alpha/2 = 1.96 (for 95% confidence)
- Z_beta = 0.84 (for 80% power)
- sigma = standard deviation of outcome
- delta = minimum detectable effect size

Example: Detecting 5-point engagement score change (sigma=15):
n = (1.96 + 0.84)^2 x (2 x 225) / 25
n = 7.84 x 450 / 25
n = 141 per group (282 total)
```

### 5.3 Common HR Experiments

| Experiment | Treatment | Control | Primary Outcome | Expected Duration |
|-----------|-----------|---------|-----------------|------------------|
| Onboarding redesign | New program | Existing program | Time to productivity, first-year retention | 6-12 months |
| Structured interview | Structured format | Current format | Quality of hire at 12 months | 12-18 months |
| Manager coaching | Monthly coaching sessions | No coaching | Team engagement, turnover | 6 months |
| Benefits communication | Personalized total comp statement | Standard benefits summary | Benefits utilization, perceived compensation fairness | 3 months |
| Flexible work | Hybrid schedule | In-office full-time | Productivity, engagement, retention | 6 months |

### 5.4 Analysis and Interpretation

- **Intent-to-treat analysis**: Analyze based on assignment, not compliance (prevents selection bias)
- **Effect size**: Report Cohen's d or percentage change, not just p-values
- **Confidence intervals**: Always report 95% CI for effect estimates
- **Heterogeneous treatment effects**: Check if effect varies by subgroup (role, level, tenure)
- **Multiple comparisons correction**: If testing multiple outcomes, apply Bonferroni or Benjamini-Hochberg correction

---

## 6. Analytics Infrastructure

### 6.1 Data Architecture

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    HRIS      │  │     ATS     │  │   Survey    │  │ Performance │
│ (Workday,    │  │ (Greenhouse,│  │ (Qualtrics, │  │ (Lattice,   │
│  BambooHR)   │  │  Lever)     │  │  Culture    │  │  15Five)    │
│              │  │             │  │  Amp)       │  │             │
└──────┬───────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
       │                 │                │                │
       └─────────┬───────┴────────┬───────┴────────────────┘
                 │                │
        ┌────────▼────────┐      │
        │   People Data    │◄─────┘
        │   Warehouse      │
        │  (Snowflake,     │
        │   BigQuery)      │
        └────────┬─────────┘
                 │
        ┌────────▼─────────┐
        │   Analytics       │
        │   Layer           │
        │  (Python/R,       │
        │   Tableau,        │
        │   Looker)         │
        └────────┬──────────┘
                 │
        ┌────────▼──────────┐
        │  Decision Support  │
        │  (Dashboards,      │
        │   Models, Reports) │
        └────────────────────┘
```

### 6.2 Data Governance for People Data

People data carries the highest sensitivity classification. Governance requirements:

- **Access control**: Role-based access; individual-level data restricted to HR and authorized managers
- **Anonymization**: All research and reporting uses de-identified data (minimum k=5 anonymity threshold for group reporting)
- **Consent**: Employees informed about data collection and use through privacy notice
- **Retention**: People data retained per legal requirements and organizational policy; purged when no longer needed
- **Audit trail**: All access to individual-level people data is logged
- **Cross-border**: GDPR, CCPA, and other privacy regulations apply to people data

---

## 7. Reporting and Communication

### 7.1 Executive Dashboard Design

Effective people analytics dashboards follow the principle of progressive disclosure:

**Layer 1 -- Executive summary (5 metrics):**
- Headcount and trajectory
- Regrettable turnover rate (trailing 12 months)
- Engagement index (most recent survey)
- Diversity representation at leadership level
- Open requisitions aging >45 days

**Layer 2 -- Diagnostic drill-down:**
- Turnover by department, level, tenure, demographic group
- Engagement drivers analysis (top 5 positive, top 5 negative)
- Recruiting funnel conversion rates
- Compensation competitiveness by function

**Layer 3 -- Detailed analysis:**
- Individual-level data (restricted access)
- Statistical models and methodology
- Cohort analysis and trend decomposition

### 7.2 Communicating Analytics Results

**To executives**: Lead with business impact, not methodology. "Our attrition model identifies 47 employees at high flight risk, representing $8.2M in replacement costs and 14 months of accumulated institutional knowledge."

**To HR business partners**: Provide actionable insights. "Engineering managers with span >10 have 2.3x the team turnover. Recommend splitting teams that exceed this threshold."

**To line managers**: Translate to team-level actions. "Three team members show declining engagement indicators. Recommend scheduling 1:1 career conversations within the next two weeks."

---

## 8. Statistical Literacy Requirements

### 8.1 Minimum Competencies for HR Analytics Consumers

All HR professionals who consume analytics outputs must understand:

- Correlation does not imply causation
- Statistical significance vs. practical significance
- Sample size requirements and confidence intervals
- Selection bias, survivorship bias, and Simpson's paradox
- The difference between averages and distributions (report distributions, not just means)

### 8.2 Common Statistical Errors in HR

| Error | Example | Correction |
|-------|---------|-----------|
| Survivorship bias | "Our engagement is high" (because disengaged employees already left) | Track engagement trajectories of leavers vs. stayers |
| Simpson's paradox | Overall gender pay gap disappears when controlling for role/level | Always report both unadjusted and adjusted metrics |
| Base rate neglect | "50% of our bad hires came from Source X" (but 80% of all hires come from Source X) | Report rates, not raw counts |
| Regression to the mean | "Training improved low performers" (they would have improved anyway) | Use control groups or pre/post with appropriate controls |
| Confirmation bias | Selectively reporting metrics that support a preferred narrative | Pre-register analyses; report all planned metrics |

---

## References

- Angrist, J. D., & Pischke, J. S. (2009). *Mostly Harmless Econometrics*. Princeton University Press.
- Davenport, T. H., Harris, J., & Shapiro, J. (2010). Competing on talent analytics. *Harvard Business Review*, 88(10), 52-58.
- Fitz-enz, J. (2010). *The New HR Analytics*. AMACOM.
- Harter, J. K., Schmidt, F. L., & Hayes, T. L. (2002). Business-unit-level relationship between employee satisfaction, employee engagement, and business outcomes. *Journal of Applied Psychology*, 87(2), 268-279.
- Levenson, A. (2018). Using workforce analytics to improve strategy execution. *Human Resource Management*, 57(3), 685-700.
- Marler, J. H., & Boudreau, J. W. (2017). An evidence-based review of HR analytics. *International Journal of Human Resource Management*, 28(1), 3-26.
- Schmidt, F. L., & Hunter, J. E. (1998). The validity and utility of selection methods in personnel psychology. *Psychological Bulletin*, 124(2), 262-274.

---

**This module governs all analytical work. Rigor is non-negotiable. When data is insufficient, say so.**
