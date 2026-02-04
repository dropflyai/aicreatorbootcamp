# DataScore.md -- 8-Dimension Scoring Rubric for Data Brain

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Data Brain / CEO Brain
> Purpose: Every output produced by the Data Brain is scored across eight
> dimensions. A score of 3 ("Meets Standard") is the minimum for shipping.
> Any dimension scoring 1 triggers an automatic block. Two or more dimensions
> at 1 triggers escalation to the CEO Brain.

---

## How to Use This Rubric

1. After the Data Brain produces ANY artifact (analysis, model, pipeline,
   experiment analysis, dashboard, recommendation), score it across all
   eight dimensions.
2. Record each dimension score (1, 3, or 5) in the Accountability Protocol.
3. If any dimension scores 1, the artifact MUST NOT ship. Rework is required.
4. If any dimension scores 5, document what made it exceptional.
5. Composite score = sum of all eight. Maximum = 40. Minimum to ship = 24.

---

## Dimension 1: Statistical Rigor

**What it measures:** Whether statistical methods are correctly applied,
assumptions are validated, and conclusions are warranted by the evidence.

### Score 1 -- Failing (Automatic Block)
- p-values reported without checking assumptions of the test used.
- Correlation presented as causation without qualification.
- Multiple comparisons made without correction (Bonferroni, FDR, etc.).
- Confidence intervals absent from any estimate.
- Sample size not reported or justified.
- Statistical significance conflated with practical significance.
- One-tailed test used without pre-registered justification.
- p-hacking: multiple analyses run, only significant results reported.
- Base rate fallacy: conditional probabilities reversed without Bayes' theorem.
- Simpson's Paradox not checked when aggregating across subgroups.

### Score 3 -- Meets Standard
- Appropriate statistical test selected with assumptions explicitly checked.
- Effect sizes reported alongside p-values.
- Confidence intervals provided for all estimates.
- Multiple comparison correction applied when testing >1 hypothesis.
- Sample size justified (power analysis for experiments, bootstrap for
  observational studies).
- Practical significance threshold defined before analysis.
- Distribution of data examined and reported (not just summary statistics).
- Missing data handling documented and justified.
- Sensitivity analysis performed for key assumptions.

### Score 5 -- Exceptional
- Bayesian analysis provided alongside frequentist where appropriate.
- Robustness checks using alternative specifications/methods.
- Pre-registration of analysis plan (for experiments).
- Simulation-based power analysis for non-standard designs.
- Heterogeneous treatment effects explored (not just average effects).
- External validity assessment (will these findings generalize?).
- All code for statistical analysis version-controlled and reproducible.
- Assumptions tested with diagnostic plots, not just tests.
- Bootstrap confidence intervals used when parametric assumptions are questionable.

### Automatic Failure Conditions
- [ ] p-value reported as "p < 0.05" without exact value.
- [ ] No confidence intervals anywhere in the analysis.
- [ ] Causal language used for observational data without qualification.
- [ ] Simpson's Paradox not checked on aggregate analysis.
- [ ] Multiple hypotheses tested without correction.

### Self-Audit Questions
- If I ran this analysis 100 times on different samples, how often would
  I get the same conclusion?
- Am I reporting the analysis I planned, or the one that gave the best result?
- Would a statistician reviewing this find any methodological errors?
- Have I confused statistical significance with business significance?

---

## Dimension 2: Data Quality

**What it measures:** Whether the data used is accurate, complete, timely,
and appropriate for the analysis being performed.

### Score 1 -- Failing (Automatic Block)
- No data quality checks performed.
- Data sources not documented.
- Known data quality issues not disclosed.
- Null/missing values ignored without justification.
- Data types incorrect (e.g., string dates not parsed, categorical treated
  as continuous).
- Survivorship bias present: analysis only includes entities that survived
  to the observation period.
- Look-ahead bias in time series: future information used to predict past.
- Label leakage: target variable information leaking into features.
- Data freshness not verified (using stale data for real-time decisions).
- Join quality not validated (many-to-many producing duplicates).

### Score 3 -- Meets Standard
- Data lineage documented (source -> transformation -> output).
- Schema validation applied (types, ranges, constraints).
- Missing data quantified and handling strategy justified (imputation method,
  listwise deletion, or indicator variables).
- Outlier detection performed and handling documented.
- Temporal consistency checked (no data from the future in training data).
- Deduplication verified.
- Data freshness confirmed as appropriate for the decision timeline.
- Key distributions plotted and inspected for anomalies.
- Cross-validation between data sources where possible.

### Score 5 -- Exceptional
- Automated data quality monitoring in production (schema drift, distribution
  drift, volume anomalies).
- Great Expectations or equivalent framework for data validation.
- Data quality SLAs defined and monitored.
- Provenance tracking for every data transformation.
- Synthetic data quality benchmarks for testing pipelines.
- Historical data quality issues cataloged and accounted for in analysis.
- Data quality metrics included in dashboards alongside business metrics.
- Referential integrity validated across joined datasets.

### Automatic Failure Conditions
- [ ] No documentation of data sources.
- [ ] Survivorship bias present and unacknowledged.
- [ ] Look-ahead bias in time series analysis.
- [ ] Label leakage in ML model features.
- [ ] Join fanout producing duplicate records used in aggregation.
- [ ] Analysis performed on data known to be incomplete without disclosure.

### Self-Audit Questions
- If I traced every number in this analysis back to its source, would I
  find any broken links?
- What data quality issue, if present, would invalidate my conclusions?
- Am I using the right data for this question, or the available data?
- When was this data last validated against reality?

---

## Dimension 3: Reproducibility

**What it measures:** Whether another data scientist could reproduce the
exact same results given the same inputs, and whether the methodology is
documented well enough to be replicated.

### Score 1 -- Failing (Automatic Block)
- No code provided for the analysis.
- Analysis performed in a local notebook with hardcoded paths.
- Random seeds not set for stochastic processes.
- Package/library versions not recorded.
- Manual data transformations not documented.
- Results depend on analyst-specific environment configuration.
- SQL queries not saved or version-controlled.
- "I ran it and got these numbers" with no way to verify.

### Score 3 -- Meets Standard
- All code version-controlled (Git).
- README or documentation explaining how to reproduce.
- Random seeds set and documented.
- Requirements file (requirements.txt, environment.yml) included.
- Data access instructions documented (even if data itself cannot be shared).
- Pipeline can be re-run end-to-end without manual intervention.
- Intermediate outputs cached and checksummed.
- SQL queries parameterized and version-controlled.

### Score 5 -- Exceptional
- Containerized environment (Docker) for perfect reproducibility.
- CI/CD pipeline that re-runs analysis on schedule or trigger.
- Data versioning (DVC, Delta Lake, or equivalent).
- Automated regression tests for data pipelines.
- Literate programming (notebooks with narrative + code + output).
- Reproducibility verified by a second analyst before shipping.
- Infrastructure-as-code for any cloud resources used.
- Results include a "reproducibility certificate" with exact commit hash,
  data snapshot, and environment specification.

### Automatic Failure Conditions
- [ ] No version control for analysis code.
- [ ] Results cannot be reproduced by another analyst.
- [ ] Manual steps required that are not documented.
- [ ] Non-deterministic results without acknowledgment.

### Self-Audit Questions
- If I were hit by a bus, could my colleague reproduce this analysis tomorrow?
- If I re-run this analysis in 6 months, will I get the same results?
- Have I documented not just WHAT I did but WHY I made each methodological choice?
- Are there any "tribal knowledge" dependencies in this pipeline?

---

## Dimension 4: Causal Reasoning

**What it measures:** Whether the Data Brain correctly distinguishes
correlation from causation and uses appropriate methods for causal inference.

### Score 1 -- Failing (Automatic Block)
- Causal claims made from observational data without any causal inference
  methodology.
- Confounders acknowledged but not controlled for.
- "X predicts Y" conflated with "X causes Y."
- Reverse causality not considered.
- Selection bias in the sample not addressed.
- Regression coefficients interpreted as causal effects without justification.
- A/B test results reported without checking for selection bias,
  instrumentation effects, or network effects.
- Mediation analysis performed without sequential ignorability discussion.

### Score 3 -- Meets Standard
- Clear distinction between predictive and causal analysis in all communication.
- For causal claims: appropriate methodology used (RCT, DiD, IV, RDD, matching,
  synthetic control).
- Confounders identified using domain knowledge and DAG (directed acyclic graph).
- Sensitivity analysis for unmeasured confounding (e.g., Rosenbaum bounds,
  E-value).
- Assumptions of the causal method explicitly stated and defended.
- Alternative explanations enumerated and addressed.
- For A/B tests: SUTVA (Stable Unit Treatment Value Assumption) checked.

### Score 5 -- Exceptional
- Full causal DAG drawn and justified with domain expertise.
- Multiple causal inference methods applied as robustness check (if results
  agree across methods, confidence increases).
- Natural experiments identified and exploited where RCTs are not possible.
- Instrumental variable validity defended with theoretical and statistical
  arguments.
- Heterogeneous treatment effects explored with causal forests or similar.
- Mediation analysis with proper identification strategy.
- Interference effects modeled (when SUTVA is violated).
- External validity of causal estimates assessed for policy/product decisions.

### Automatic Failure Conditions
- [ ] Causal claim from observational correlation with no methodology.
- [ ] Confounders identified but not controlled for.
- [ ] A/B test analyzed without randomization check.
- [ ] Regression presented as causal without causal identification strategy.

### Self-Audit Questions
- If I told a skeptic this was causal, what would they attack first?
- What unmeasured confounder would make this association disappear?
- Is this a case where the treatment could be caused BY the outcome?
- If I intervened based on this finding, am I confident the outcome would
  change? What is my evidence?

---

## Dimension 5: Communication

**What it measures:** Whether data insights are communicated clearly,
accurately, and in a way that drives correct decisions by non-technical
stakeholders.

### Score 1 -- Failing (Automatic Block)
- Technical jargon used without explanation to non-technical audience.
- Visualizations misleading (truncated axes, cherry-picked time ranges,
  dual axes with different scales, 3D charts distorting proportions).
- Key limitations buried or omitted.
- Headline conclusion not supported by the analysis.
- Recommendations absent (data presented without "so what").
- Uncertainty not communicated (point estimates without ranges).
- Audience left to interpret complex results on their own.

### Score 3 -- Meets Standard
- Executive summary leads with the insight, not the methodology.
- Visualizations follow best practices (labeled axes, appropriate chart type,
  honest scales, colorblind-friendly).
- Uncertainty communicated visually (confidence bands, ranges) not just
  numerically.
- Limitations section present and prominent.
- Recommendations tied directly to findings.
- Technical appendix available for those who want methodology details.
- Key number precision appropriate (not 12 decimal places for a percentage).
- Narrative structure: context -> finding -> implication -> recommendation.

### Score 5 -- Exceptional
- Multiple communication artifacts for different audiences (exec summary,
  detailed report, technical appendix).
- Interactive visualizations where appropriate.
- Scenario modeling presented: "If assumption A is right, then X. If B, then Y."
- Pre-mortem framing: "Here is what could make this conclusion wrong."
- Communication reviewed by a non-technical stakeholder before shipping.
- Data storytelling: the insight is memorable, not just accurate.
- Counter-arguments presented and addressed proactively.
- Follow-up questions anticipated and answered in appendix.

### Automatic Failure Conditions
- [ ] Misleading visualization (truncated axis, cherry-picked range).
- [ ] Conclusion not supported by the data presented.
- [ ] Uncertainty not communicated in any form.
- [ ] Recommendations absent from a decision-support analysis.

### Self-Audit Questions
- If a non-technical person reads only the executive summary, will they
  make the right decision?
- Is any visualization I created potentially misleading?
- Am I communicating uncertainty or false precision?
- Have I separated "what the data says" from "what I think" clearly?

---

## Dimension 6: Ethical Rigor

**What it measures:** Whether the Data Brain considers fairness, privacy,
consent, and potential harm in all data work.

### Score 1 -- Failing (Automatic Block)
- PII used without necessity or access controls.
- Analysis performed on data collected without proper consent.
- Model has disparate impact across protected classes and this is not
  examined or disclosed.
- Re-identification risk not assessed for "anonymized" data.
- Analysis could enable surveillance, discrimination, or manipulation
  without disclosure.
- Proxy discrimination not checked (using zip code as proxy for race, etc.).
- Data retention policies violated.

### Score 3 -- Meets Standard
- Data minimization applied (only data necessary for the analysis is accessed).
- PII handling follows company policy and applicable regulations.
- Fairness audit performed for ML models across relevant protected classes.
- Disparate impact analysis included in model evaluation.
- Privacy impact assessment completed for new data collection.
- Consent and data provenance verified.
- Bias in training data acknowledged and mitigated where possible.
- Data retention and deletion policies followed.

### Score 5 -- Exceptional
- Formal fairness constraints applied in model training (demographic parity,
  equalized odds, or calibration across groups).
- Differential privacy applied where appropriate.
- Model cards or datasheets published for all production models.
- Regular bias audits scheduled (not just at launch).
- Counterfactual fairness analysis performed.
- Stakeholder engagement: affected communities consulted on data use.
- Ethical review board or equivalent consulted for high-stakes decisions.
- Transparency: users can understand why a model made a specific decision.

### Automatic Failure Conditions
- [ ] PII exposed without access controls.
- [ ] No fairness analysis for a model that affects people.
- [ ] Data used in violation of collection consent.
- [ ] Proxy discrimination present and unexamined.

### Self-Audit Questions
- If this analysis were published on the front page, would I be proud of it?
- Who could be harmed by the conclusions or the model's predictions?
- Am I using data that people would not expect to be used this way?
- Does my model perform equally well for all relevant subgroups?

---

## Dimension 7: Production Readiness

**What it measures:** Whether data artifacts (models, pipelines, dashboards)
are ready for production use -- reliable, monitored, and maintainable.

### Score 1 -- Failing (Automatic Block)
- Model deployed with no monitoring.
- Pipeline has no error handling.
- No alerting for data quality failures.
- Hardcoded credentials in code.
- No documentation for on-call troubleshooting.
- Model has no fallback behavior for missing inputs.
- Dashboard queries are not optimized (timeout risk on production database).
- No SLA defined for pipeline freshness or model latency.
- Single point of failure with no redundancy.

### Score 3 -- Meets Standard
- Monitoring for model performance metrics (accuracy, latency, throughput).
- Alerting for data pipeline failures (missing data, schema changes, delays).
- Error handling with graceful degradation.
- Credentials managed through secrets manager.
- Runbook for common failure scenarios.
- SLA defined and monitored (freshness, latency, availability).
- Logging sufficient for debugging without code changes.
- Rollback procedure documented and tested.
- Feature store or equivalent for model input consistency.

### Score 5 -- Exceptional
- Automated retraining pipeline with validation gates.
- Shadow mode deployment before production traffic.
- A/B testing infrastructure for model versions.
- Distribution shift detection in production (KL divergence, PSI, etc.).
- Circuit breakers: model automatically falls back to simpler model or
  rule-based system when confidence is low.
- Capacity planning based on historical growth patterns.
- Infrastructure as code (Terraform, Pulumi, etc.).
- Chaos engineering: fault injection testing for data pipelines.
- SLO-based alerting (not just threshold-based).

### Automatic Failure Conditions
- [ ] Model in production with no monitoring.
- [ ] Pipeline with no error handling or alerting.
- [ ] Hardcoded credentials.
- [ ] No fallback behavior for model failures.
- [ ] No runbook for on-call engineers.

### Self-Audit Questions
- If this pipeline fails at 3am, can the on-call engineer fix it without
  calling me?
- What is the blast radius if this model starts producing wrong predictions?
- How will I know if the model's performance degrades gradually over time?
- Is there a human in the loop for high-stakes predictions?

---

## Dimension 8: Model Evaluation

**What it measures:** Whether ML models are evaluated rigorously, with
appropriate metrics, proper validation methodology, and honest assessment
of limitations.

### Score 1 -- Failing (Automatic Block)
- Only accuracy reported for an imbalanced classification problem.
- No validation methodology (no train/test split, no cross-validation).
- Evaluation metric does not align with business objective.
- Overfitting not checked (training performance only).
- No comparison to a baseline (random, majority class, simple heuristic).
- Feature importance not examined.
- Calibration not assessed for probability-outputting models.
- Model evaluated on data from the same distribution as training without
  temporal or domain holdout.

### Score 3 -- Meets Standard
- Evaluation metrics aligned with business objective (not just technical metrics).
- Proper validation: temporal split for time series, stratified k-fold for
  cross-sectional, group-based split where appropriate.
- Multiple metrics reported (precision, recall, F1, AUC, calibration).
- Baseline comparison included (simple model, business rules, random).
- Overfitting assessment: training vs. validation performance gap.
- Feature importance analysis with interpretation.
- Calibration curve for probability outputs.
- Error analysis: where does the model fail and why?
- Business impact simulation: what does metric improvement mean in dollars?

### Score 5 -- Exceptional
- Ablation study: contribution of each feature set / model component.
- Learning curves: does more data improve performance?
- Fairness metrics computed across protected classes.
- Adversarial robustness tested.
- Confidence calibration with reliability diagrams.
- Slice-based evaluation: performance on meaningful subgroups.
- Comparison to multiple baselines and alternative model architectures.
- Expected calibration error (ECE) reported.
- SHAP values or equivalent for model interpretability.
- Production performance tracked and compared to offline evaluation.
- Evaluation framework is reusable for future model iterations.

### Automatic Failure Conditions
- [ ] Only accuracy reported for imbalanced classification.
- [ ] No train/test split or cross-validation.
- [ ] No baseline comparison.
- [ ] Evaluation metric misaligned with business objective.
- [ ] Temporal leakage in validation (future data in training set).

### Self-Audit Questions
- If I deployed this model and it had the validation-set performance in
  production, would the business benefit?
- What is the cost of a false positive vs. false negative for this use case?
- Am I evaluating on data that is truly representative of production traffic?
- Would a simpler model with fewer features achieve 90% of the performance?

---

## Composite Scoring Table

| Composite Score | Rating | Action |
|-----------------|--------|--------|
| 36-40 | World-Class | Document as exemplar. Share methodology. |
| 30-35 | Strong | Ship with confidence. Minor improvements optional. |
| 24-29 | Meets Standard | Ship. Address weak dimensions next iteration. |
| 16-23 | Below Standard | Do NOT ship. Rework weakest dimensions. |
| 8-15 | Critical Failure | Full rework. Escalate to CEO Brain. |

---

## Escalation Triggers

1. **Statistical Rigor scores 1** -> All conclusions from the analysis are
   suspect. Do not use for any decision until remediated. Consult external
   statistician if needed.
2. **Data Quality scores 1** -> Upstream data issue. Escalate to Engineering
   Brain for pipeline remediation. Analysis paused.
3. **Ethical Rigor scores 1** -> Immediate stop. CEO Brain + Legal Brain
   consulted. Potential regulatory implications.
4. **Production Readiness scores 1 for a deployed model** -> Incident
   response. Evaluate whether model should be taken offline.
5. **Model Evaluation scores 1 for a model already in production** ->
   Emergency re-evaluation. Shadow mode until evaluation passes.
6. **Reproducibility scores 1 twice consecutively** -> Mandatory process
   improvement sprint before next analysis ships.
7. **Any two dimensions score 1 simultaneously** -> Escalate to CEO Brain.
   Data Brain capacity or competence review.

---

## Domain-Specific Failure Mode Checklist

Before scoring, check for these common data science failure modes:

### Statistical Failures
- [ ] Simpson's Paradox: Does the aggregate trend reverse within subgroups?
- [ ] Survivorship Bias: Am I only analyzing entities that "survived"?
- [ ] Berkson's Paradox: Am I conditioning on a collider?
- [ ] Ecological Fallacy: Am I inferring individual behavior from group data?
- [ ] Regression to the Mean: Am I attributing natural variation to an intervention?

### ML Failures
- [ ] Look-ahead Bias: Does the model use future information at prediction time?
- [ ] Label Leakage: Do features contain information from the target variable?
- [ ] Distribution Shift: Is the production distribution different from training?
- [ ] Class Imbalance: Is the rare class adequately handled?
- [ ] Feature Drift: Are feature distributions changing over time in production?
- [ ] Concept Drift: Has the relationship between features and target changed?

### Pipeline Failures
- [ ] Backfill Bias: Was historical data reprocessed differently than real-time?
- [ ] Timezone Handling: Are all timestamps in the same timezone?
- [ ] Deduplication: Are records counted multiple times?
- [ ] Join Integrity: Do joins produce the expected cardinality?
- [ ] Null Propagation: Do null values cascade through calculations?

---

## Annual Calibration

Every quarter, the Data Brain must:

1. Review all artifacts scored in the previous quarter.
2. Identify the dimension with the lowest average score.
3. Study recent literature on that topic for methodology updates.
4. Recalibrate failure mode checklist based on new incidents.
5. Archive scoring data for longitudinal analysis.
6. Update the failure mode checklist as new failure modes are discovered.

---

*Statistical rigor is not optional. "Close enough" is not a standard.
If the data does not support the conclusion, the conclusion does not ship.*
