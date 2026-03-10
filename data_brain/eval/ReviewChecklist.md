# ReviewChecklist.md -- Pre-Flight Gates for Data Brain

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Data Brain / CEO Brain
> Purpose: No data artifact ships until EVERY applicable gate passes.
> A single gate failure blocks the artifact. Statistical shortcuts are
> never acceptable. Bad data leads to bad decisions.

---

## How to Use This Checklist

1. Identify the artifact type (Statistical Analysis, ML Model Deployment,
   Data Pipeline, Experiment Analysis, Dashboard/Report, Causal Inference).
2. Check which gates apply (see Applicability Matrix at the end).
3. Every checkbox in every applicable gate must be checked.
4. If a checkbox cannot be checked, document WHY and escalate to CEO Brain.
5. Completed checklists stored in the Accountability Protocol audit trail.

---

## GATE 1: Statistical Validity Gate

**Purpose:** Every statistical claim must be methodologically sound.
No analysis ships with invalid statistical methods, regardless of
how compelling the narrative is.

### Pre-Analysis Requirements (MUST complete BEFORE looking at results)

- [ ] Analysis plan pre-registered (hypothesis, method, success criteria
      defined before data is examined).
- [ ] Primary hypothesis stated in falsifiable form.
- [ ] Statistical test selected with justification for why this test
      (not just "it's what we always use").
- [ ] Significance level (alpha) set and justified (default 0.05, but
      lower for high-stakes or multiple comparisons).
- [ ] Power analysis completed:
  - [ ] Minimum detectable effect size defined and justified by business relevance.
  - [ ] Required sample size calculated.
  - [ ] Actual sample size meets or exceeds required sample size.
- [ ] Multiple comparison correction method selected if testing >1 hypothesis.

### Assumption Verification (MUST pass BEFORE interpreting results)

- [ ] Normality assumption checked (if required by the test):
  - [ ] QQ-plot examined.
  - [ ] Shapiro-Wilk or equivalent formal test.
  - [ ] If violated: non-parametric alternative used or sample size large
        enough for CLT.
- [ ] Independence assumption checked:
  - [ ] No clustering/nesting that violates independence.
  - [ ] If violated: mixed effects model or cluster-robust standard errors.
- [ ] Homoscedasticity checked (for regression/ANOVA):
  - [ ] Residual plots examined.
  - [ ] Breusch-Pagan or equivalent test.
  - [ ] If violated: heteroscedasticity-robust standard errors (HC3 or better).
- [ ] Stationarity checked (for time series):
  - [ ] ADF test or equivalent.
  - [ ] If non-stationary: differencing, cointegration, or appropriate model.

### Results Reporting Requirements

- [ ] Exact p-values reported (not "p < 0.05").
- [ ] Effect sizes reported with interpretation.
- [ ] Confidence intervals provided for all estimates.
- [ ] Practical significance assessed (is the effect large enough to matter?).
- [ ] Sensitivity analysis: how do results change under different assumptions?
- [ ] Negative results reported honestly (not buried or re-framed).
- [ ] All analyses run are reported (not just the significant ones).

### Red Flags (any one blocks the gate)

- [ ] CONFIRM: Analysis plan was not changed after seeing preliminary results.
- [ ] CONFIRM: No "garden of forking paths" -- all analytical choices were
      pre-specified or justified independently of results.
- [ ] CONFIRM: Sample was not filtered to achieve significance.
- [ ] CONFIRM: Outliers were not removed without pre-specified criteria.
- [ ] CONFIRM: Subgroup analyses were pre-planned, not post-hoc fishing.

---

## GATE 2: Data Pipeline Quality Gate

**Purpose:** Data pipelines must produce correct, complete, and timely data.
A pipeline that produces wrong numbers on time is worse than one that fails
loudly.

### Schema Validation

- [ ] Input schema defined and enforced (column names, types, constraints).
- [ ] Output schema defined and enforced.
- [ ] Schema evolution strategy documented (how to handle schema changes).
- [ ] Null handling rules defined for every column.
- [ ] Enum/categorical values validated against allowed values.

### Data Completeness

- [ ] Row count validation: expected vs. actual (within tolerance).
- [ ] Column completeness: % non-null for each column within expectations.
- [ ] Temporal completeness: no gaps in time series data.
- [ ] Cross-source reconciliation: totals match across source systems.
- [ ] Late-arriving data handling documented.

### Data Accuracy

- [ ] Spot checks against source of truth (manual verification of sample).
- [ ] Aggregate validation: totals, averages, distributions within expected ranges.
- [ ] Known-answer tests: pipeline produces correct output for known inputs.
- [ ] Referential integrity: foreign keys resolve correctly.
- [ ] Business rule validation: impossible values detected and rejected
      (negative ages, future dates for past events, etc.).

### Pipeline Reliability

- [ ] Idempotency: re-running the pipeline produces the same output.
- [ ] Error handling: pipeline fails loudly on data quality issues (not silently).
- [ ] Alerting configured for pipeline failures.
- [ ] Alerting configured for data quality degradation.
- [ ] Retry logic with backoff for transient failures.
- [ ] Dead letter queue or equivalent for unprocessable records.
- [ ] Pipeline execution time monitored and alerting on anomalies.

### Documentation

- [ ] Data dictionary: every column/field documented with business definition.
- [ ] Lineage: source -> transformation -> output documented.
- [ ] SLA defined: freshness, completeness, accuracy targets.
- [ ] On-call runbook for common failure modes.
- [ ] Dependencies documented (upstream and downstream).

### Anti-Patterns (any one blocks the gate)

- [ ] CONFIRM: No hardcoded credentials in pipeline code.
- [ ] CONFIRM: No SELECT * queries without explicit column selection.
- [ ] CONFIRM: No unbounded queries (missing WHERE clause on large tables).
- [ ] CONFIRM: Pipeline does not modify source data.
- [ ] CONFIRM: Pipeline handles timezone conversions explicitly (no implicit).

---

## GATE 3: ML Model Deployment Gate

**Purpose:** No ML model enters production without rigorous evaluation,
fairness assessment, monitoring setup, and rollback capability.

### Model Evaluation Requirements

- [ ] Evaluation metrics aligned with business objective (not just accuracy).
- [ ] Metrics computed on a proper holdout set:
  - [ ] Temporal split for time-dependent data.
  - [ ] Stratified split for classification.
  - [ ] Group-based split where needed (no data leakage across groups).
- [ ] Comparison to baseline models:
  - [ ] Random / majority class baseline.
  - [ ] Current production model (if replacing).
  - [ ] Simple heuristic or business rule baseline.
- [ ] Multiple metrics reported:
  - [ ] For classification: precision, recall, F1, AUC-ROC, AUC-PR,
        calibration curve.
  - [ ] For regression: MAE, RMSE, MAPE, R-squared, residual plots.
  - [ ] For ranking: NDCG, MRR, MAP.
- [ ] Calibration assessed (predicted probabilities match observed frequencies).
- [ ] Error analysis completed:
  - [ ] Most common error types identified.
  - [ ] Error distribution across segments examined.
  - [ ] Failure mode documentation.

### Fairness Audit

- [ ] Protected classes identified for the use case.
- [ ] Model performance disaggregated by protected class.
- [ ] Fairness metrics computed:
  - [ ] Demographic parity (or justified alternative).
  - [ ] Equalized odds (or justified alternative).
  - [ ] Calibration across groups.
- [ ] Disparate impact ratio calculated.
- [ ] If fairness violations found: mitigation applied and documented.
- [ ] Proxy variable analysis: no features serving as proxies for
      protected classes without justification.

### Production Readiness

- [ ] Model serialized and versioned.
- [ ] Input validation: model gracefully handles missing features,
      out-of-range values, new categorical levels.
- [ ] Latency tested under expected load.
- [ ] Memory/CPU/GPU requirements documented and provisioned.
- [ ] Feature computation pipeline verified to match training pipeline
      (training-serving skew check).
- [ ] Monitoring configured:
  - [ ] Prediction distribution monitoring.
  - [ ] Input feature distribution monitoring.
  - [ ] Latency monitoring.
  - [ ] Error rate monitoring.
- [ ] Alerting configured for distribution shift.
- [ ] Fallback model or rule-based system defined for model failures.
- [ ] Rollback procedure documented and tested.
- [ ] A/B test or shadow mode planned for initial deployment.

### Model Documentation

- [ ] Model card completed (following Mitchell et al. format or equivalent):
  - [ ] Intended use and out-of-scope uses.
  - [ ] Training data description.
  - [ ] Evaluation results.
  - [ ] Ethical considerations.
  - [ ] Limitations.
- [ ] Feature importance / SHAP values documented.
- [ ] Retraining schedule defined.
- [ ] Retraining triggers defined (performance degradation thresholds).

### Anti-Patterns (any one blocks the gate)

- [ ] CONFIRM: No data leakage between training and evaluation sets.
- [ ] CONFIRM: Features available at prediction time match training features
      (no features that would not be available in real-time).
- [ ] CONFIRM: Model is not being deployed to a population significantly
      different from training population without acknowledgment.
- [ ] CONFIRM: Model outputs are not used directly for high-stakes decisions
      without human review.
- [ ] CONFIRM: Retraining pipeline exists (model will not go stale).

---

## GATE 4: Experiment Analysis Gate

**Purpose:** Experiment results must be analyzed correctly. Premature
conclusions from experiments are worse than having no experiment at all.

### Pre-Analysis Checks

- [ ] Randomization verified: treatment and control groups balanced on
      key covariates.
- [ ] No instrumentation errors: events logging correctly in both variants.
- [ ] Sample Ratio Mismatch (SRM) check: actual split matches intended split
      (chi-squared test, p < 0.001 threshold for SRM detection).
- [ ] No contamination between treatment and control (user-level assignment
      consistent throughout experiment).
- [ ] Novelty effects assessed (early behavior may not represent steady state).
- [ ] Experiment ran for the pre-determined duration (not stopped early based
      on peeking).

### Statistical Analysis

- [ ] Primary metric analysis:
  - [ ] Point estimate with confidence interval.
  - [ ] Statistical significance assessed.
  - [ ] Practical significance assessed.
- [ ] Counter-metric analysis (guardrail metrics):
  - [ ] No statistically significant degradation on guardrail metrics.
  - [ ] If degradation detected: documented and weighed against primary gain.
- [ ] Segment analysis (if pre-planned):
  - [ ] Heterogeneous treatment effects across key segments.
  - [ ] Multiple comparison correction applied for segment analyses.
- [ ] Revenue impact estimated (not just statistical metric impact).
- [ ] Long-term impact modeled (is the short-term effect sustainable?).

### Decision Framework

- [ ] Pre-registered decision rules applied:
  - [ ] If primary metric significant and positive AND guardrails hold: Ship.
  - [ ] If primary metric significant and positive BUT guardrail degraded:
        Investigate and weigh trade-offs.
  - [ ] If primary metric not significant: Document null result. Do NOT ship
        based on "directional" results.
  - [ ] If primary metric significant and negative: Kill the variant.
- [ ] Decision documented with rationale.
- [ ] Dissenting opinions recorded.

### Reporting Requirements

- [ ] Full analysis report with methodology.
- [ ] Executive summary with clear recommendation.
- [ ] All metrics reported (not just the favorable ones).
- [ ] Limitations acknowledged (external validity, seasonal effects, etc.).
- [ ] Learning documented for future experiment design.

### Anti-Patterns (any one blocks the gate)

- [ ] CONFIRM: Experiment was not stopped early based on peeking at results.
- [ ] CONFIRM: Primary metric was not changed after seeing results.
- [ ] CONFIRM: "Directional" results are not being used as justification
      to ship a non-significant result.
- [ ] CONFIRM: Novelty/primacy effects are not inflating the treatment effect.
- [ ] CONFIRM: SRM check passed (no systematic bias in assignment).

---

## GATE 5: Dashboard / Report Quality Gate

**Purpose:** Dashboards and reports are decision tools. If they mislead,
they cause wrong decisions at scale.

### Data Accuracy

- [ ] Every number on the dashboard can be traced to a verified data source.
- [ ] Totals are reconciled against source systems.
- [ ] Filters and segmentation produce correct subsets (spot-checked).
- [ ] Time zone handling is explicit and correct.
- [ ] Refresh frequency documented and displayed on dashboard.
- [ ] "As of" timestamp visible on every dashboard.

### Visualization Integrity

- [ ] Y-axis starts at zero for bar charts (or deviation is justified).
- [ ] No dual Y-axes without clear labeling and justification.
- [ ] Time ranges are consistent across related charts.
- [ ] Color schemes are colorblind-friendly.
- [ ] Chart types appropriate for the data type:
  - [ ] Line charts for time series.
  - [ ] Bar charts for comparisons.
  - [ ] Scatter plots for correlations.
  - [ ] No pie charts for more than 5 categories.
  - [ ] No 3D charts (distort proportions).
- [ ] Labels, titles, and legends present and clear.
- [ ] Units specified (%, absolute, per-unit).

### Metric Definitions

- [ ] Every metric has a documented definition accessible from the dashboard.
- [ ] Definitions include: calculation formula, data source, any filters,
      known caveats.
- [ ] Metric definitions match across dashboards (no metric named the same
      thing but calculated differently in two places).
- [ ] Deprecated metrics clearly marked or removed.

### Performance

- [ ] Dashboard loads in < 10 seconds under normal conditions.
- [ ] Queries are optimized (no full table scans on large tables).
- [ ] Caching strategy appropriate (real-time where needed, cached otherwise).
- [ ] Dashboard does not degrade production database performance.

### Anti-Patterns (any one blocks the gate)

- [ ] CONFIRM: No vanity metrics without context (raw numbers without
      rates, trends, or benchmarks).
- [ ] CONFIRM: No "up and to the right" charts that hide seasonal patterns
      or change in trajectory.
- [ ] CONFIRM: No metrics that cannot be acted upon (if it moves, what
      should someone do?).
- [ ] CONFIRM: Dashboard has been reviewed by its intended audience
      (not just the builder).

---

## GATE 6: Causal Inference Gate

**Purpose:** Causal claims require extra scrutiny. This gate applies whenever
the analysis makes or implies a causal statement.

### Identification Strategy

- [ ] Causal question clearly stated ("Does X cause Y?").
- [ ] Identification strategy explicitly named (RCT, DiD, IV, RDD, matching,
      synthetic control, interrupted time series).
- [ ] DAG (directed acyclic graph) drawn with all known variables.
- [ ] Confounders identified from DAG and controlled for.
- [ ] Colliders identified and NOT conditioned on.
- [ ] Mediators identified and handling strategy documented (total effect
      vs. direct effect).

### Assumption Validation

- [ ] Parallel trends (for DiD): pre-treatment trends visually and
      statistically assessed.
- [ ] Exclusion restriction (for IV): instrument affects outcome ONLY
      through treatment.
- [ ] Continuity (for RDD): no manipulation of running variable at cutoff.
- [ ] Positivity (for matching): all covariate combinations have both
      treated and control units.
- [ ] Ignorability/Unconfoundedness (for matching): justified by domain
      knowledge, not just assumed.

### Robustness Checks

- [ ] Placebo test: run the same analysis where no effect is expected.
- [ ] Sensitivity analysis for unmeasured confounding.
- [ ] Alternative specifications (different controls, functional forms).
- [ ] Subsample analysis: does the effect hold in subsamples?
- [ ] Falsification tests: check outcomes that should NOT be affected.

### Communication

- [ ] Causal claims clearly distinguished from associations.
- [ ] Strength of causal evidence rated (strong/moderate/weak) with
      justification.
- [ ] Alternative causal explanations enumerated and addressed.
- [ ] Policy/product implications stated with appropriate confidence.

---

## Applicability Matrix

| Gate | Analysis | ML Deploy | Pipeline | Experiment | Dashboard | Causal |
|------|----------|-----------|----------|------------|-----------|--------|
| Statistical Validity | Required | Recommended | N/A | Required | N/A | Required |
| Pipeline Quality | Recommended | Required | Required | N/A | Required | N/A |
| ML Model Deployment | N/A | Required | N/A | N/A | N/A | N/A |
| Experiment Analysis | N/A | N/A | N/A | Required | N/A | N/A |
| Dashboard Quality | N/A | N/A | N/A | N/A | Required | N/A |
| Causal Inference | N/A | N/A | N/A | Recommended | N/A | Required |

---

## Override Protocol

If a gate cannot be passed and the Data Brain believes the artifact should
still ship:

1. Document which specific checkboxes cannot be passed and why.
2. Quantify the risk of shipping without passing the gate.
3. Identify what decisions could be made incorrectly if the gate is skipped.
4. Escalate to CEO Brain with documentation.
5. CEO Brain may grant a time-limited waiver with conditions.
6. Waiver logged in Accountability Protocol with expiration.
7. If waiver expires without remediation, automatic escalation.

**Critical rule:** The Statistical Validity Gate CANNOT be waived for any
analysis that will be used for a product decision, pricing decision, or
investor communication. There is no acceptable shortcut for statistical rigor.

---

*The cost of a wrong conclusion is always higher than the cost of doing
the analysis correctly. Take the time. Check the assumptions. Report honestly.*
