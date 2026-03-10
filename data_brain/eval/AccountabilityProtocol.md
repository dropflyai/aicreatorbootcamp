# AccountabilityProtocol.md -- Data Brain Audit & Accountability System

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Data Brain / CEO Brain
> Purpose: Every data analysis, model deployment, and pipeline is tracked
> with full reproducibility requirements, bias audits, and prediction
> accuracy monitoring. The Data Brain is held to the standard of a
> peer-reviewed scientific process.

---

## 1. Analysis Audit Trail

Every analysis that informs a business decision must be logged.

### Analysis Record Template

```
ANALYSIS ID: DATA-[YYYY]-[NNN]
DATE: [YYYY-MM-DD]
ANALYST: [Data Brain / with whom]
TYPE: [Statistical Analysis | ML Model | Pipeline | Experiment | Dashboard | Causal]
REQUESTOR: [Which brain or stakeholder requested this]

QUESTION:
[The business question this analysis answers, in plain language]

METHODOLOGY:
[Statistical method, model type, data sources, time periods]

KEY ASSUMPTIONS:
1. [Assumption 1]: [Justification]
2. [Assumption 2]: [Justification]
3. [Assumption 3]: [Justification]

DATA SOURCES:
- Source 1: [Name, freshness, known quality issues]
- Source 2: [Name, freshness, known quality issues]

RESULTS:
[Summary of findings with effect sizes and confidence intervals]

LIMITATIONS:
[What this analysis cannot tell us. What could make these results wrong.]

RECOMMENDATIONS:
[What action should be taken based on these results]

CONFIDENCE LEVEL: [High / Medium / Low]
[Justification for confidence level]

REPRODUCIBILITY:
- Code: [Git repo + commit hash]
- Data: [Data snapshot or query + timestamp]
- Environment: [Python version, key package versions]
- Runtime: [How long to reproduce from scratch]

DataScore APPLIED:
- Statistical Rigor: [1/3/5]
- Data Quality: [1/3/5]
- Reproducibility: [1/3/5]
- Causal Reasoning: [1/3/5]
- Communication: [1/3/5]
- Ethical Rigor: [1/3/5]
- Production Readiness: [1/3/5]
- Model Evaluation: [1/3/5]
- COMPOSITE: [X/40]
```

### Audit Trail Rules

1. Every analysis record created BEFORE results are shared with stakeholders.
2. Records are IMMUTABLE. Corrections are appended as amendments, never
   replacing original conclusions.
3. All analysis code must be version-controlled at the time of record creation.
4. If an analysis is later found to be incorrect, the original record remains
   with an amendment documenting the correction and root cause.
5. Records older than 3 years are archived but never deleted.

---

## 2. Reproducibility Requirements

The Data Brain operates under the principle that no analysis is trusted
unless it can be independently reproduced.

### Tier 1: Full Reproducibility (Required for all production analyses)

```
REPRODUCIBILITY CERTIFICATION
ANALYSIS ID: DATA-[YYYY]-[NNN]

CODE ARTIFACT:
- Repository: [URL]
- Branch: [Name]
- Commit: [Full SHA hash]
- Entry point: [Script or notebook to run]

DATA ARTIFACT:
- Dataset location: [Path or query]
- Dataset version: [Snapshot date or version hash]
- Row count: [Expected]
- Schema version: [Version identifier]

ENVIRONMENT:
- OS: [Name + version]
- Language: [Python/R version]
- Key packages: [Name + version for all analytical packages]
- Requirements file: [Path]
- Container image: [Docker image tag, if applicable]

RANDOM SEEDS:
- Global seed: [Value]
- Per-component seeds: [If applicable]

VERIFICATION:
- [ ] Reproduced by a second analyst on [date]
- [ ] Results match within acceptable tolerance: [tolerance]
- [ ] Any discrepancies documented: [details]
```

### Tier 2: Partial Reproducibility (Acceptable for exploratory analysis)

```
- Code version-controlled: [Yes/No]
- Data query saved: [Yes/No]
- Key parameters documented: [Yes/No]
- Results can be approximately reproduced: [Yes/No]
- Caveats: [Why full reproducibility is not achieved]
```

### Tier 3: Not Reproducible (Must be flagged)

If an analysis is not reproducible, it must be explicitly flagged:

```
WARNING: This analysis is NOT fully reproducible because [reason].
The following conclusions should be treated as preliminary and must be
verified before any irreversible decision is made based on them.
```

### Reproducibility Failure Escalation

| Condition | Action |
|-----------|--------|
| Production model not reproducible | STOP deployment. Fix before proceeding. |
| Board-facing metric not reproducible | Escalate to CEO Brain. Verify manually. |
| Analysis informing pricing/strategy not reproducible | Flag as preliminary. Schedule verification. |
| Exploratory analysis not reproducible | Acceptable if flagged. Must be reproducible before operationalizing. |

---

## 3. Model Monitoring and Drift Detection

Every model in production has mandatory monitoring.

### Model Health Dashboard Template

```
MODEL ID: MODEL-[YYYY]-[NNN]
MODEL NAME: [Descriptive name]
DEPLOYMENT DATE: [YYYY-MM-DD]
LAST RETRAINED: [YYYY-MM-DD]
OWNER: [Data Brain team member]

PERFORMANCE METRICS (Updated Daily):
- Primary metric (offline): [Value at deployment]
- Primary metric (online, trailing 7 days): [Current value]
- Trend: [Stable / Degrading / Improving]

DISTRIBUTION MONITORING:
- Input feature PSI (trailing 7 days vs. training):
  - Feature 1: [PSI value] [OK / WARNING / ALERT]
  - Feature 2: [PSI value] [OK / WARNING / ALERT]
  - ...
- Prediction distribution KL divergence: [Value] [OK / WARNING / ALERT]

OPERATIONAL METRICS:
- p50 latency: [ms]
- p99 latency: [ms]
- Error rate: [%]
- Throughput: [requests/sec]

ALERTS:
- PSI > 0.1 for any feature: WARNING (investigate within 48 hours)
- PSI > 0.25 for any feature: ALERT (retrain evaluation within 24 hours)
- Online metric degrades > 10% from baseline: ALERT (immediate investigation)
- Error rate > 1%: ALERT (immediate investigation)
- Latency p99 > SLA: WARNING
```

### Retraining Triggers

| Trigger | Action | SLA |
|---------|--------|-----|
| Scheduled (monthly/quarterly) | Retrain on fresh data, validate, deploy | Per schedule |
| Performance degradation > 10% | Investigate, retrain if distribution shift confirmed | 48 hours |
| Distribution shift detected (PSI > 0.25) | Evaluate retrain need, retrain if warranted | 48 hours |
| New feature available | Evaluate feature, A/B test inclusion | Next sprint |
| Concept drift detected | Full investigation, potential architecture change | 1 week |
| Critical bug discovered | Hotfix or rollback | 4 hours |

### Model Retirement Criteria

A model should be retired when:
- Performance has degraded below the baseline heuristic and retraining does not help.
- The business use case has changed and the model is no longer relevant.
- A fundamentally better approach is available.
- The model creates unacceptable ethical or legal risk.

Retirement process:
1. Document the rationale.
2. Ensure fallback is in place.
3. Communicate to all consumers.
4. Archive model artifacts (do not delete).
5. Post-mortem: what did we learn from this model's lifecycle?

---

## 4. Experiment Pre-Registration System

All experiments must be pre-registered before data collection or analysis begins.
This prevents p-hacking, HARKing, and post-hoc rationalization.

### Pre-Registration Template

```
EXPERIMENT ID: EXP-[YYYY]-[NNN]
DATE REGISTERED: [YYYY-MM-DD]
REGISTRANT: [Data Brain member]

HYPOTHESIS:
If [intervention], then [metric] will [direction] by [magnitude]
within [timeframe], because [mechanism].

NULL HYPOTHESIS:
[Intervention] has no effect on [metric].

DESIGN:
- Type: [A/B, A/B/C, multivariate, cluster-randomized, etc.]
- Randomization unit: [User, session, team, etc.]
- Sample size: [Calculated via power analysis]
- Duration: [Planned run time]
- Allocation: [50/50, 80/20, etc. with justification]

PRIMARY METRIC:
- Name: [Exact definition]
- Baseline: [Current value]
- Minimum Detectable Effect: [Value]
- Direction: [One-tailed or two-tailed, with justification]

SECONDARY METRICS:
- [Metric 1]: [Definition and expected direction]
- [Metric 2]: [Definition and expected direction]

GUARDRAIL METRICS:
- [Metric 1]: Must not degrade by more than [threshold]
- [Metric 2]: Must not degrade by more than [threshold]

ANALYSIS PLAN:
- Statistical test: [Name and justification]
- Significance level: [Alpha]
- Multiple comparison correction: [Method, if applicable]
- Segment analysis: [Pre-planned segments, if any]
- Sequential analysis: [If using, specify spending function]

DECISION RULES:
- Ship if: [Specific conditions]
- Iterate if: [Specific conditions]
- Kill if: [Specific conditions]
- Inconclusive if: [Specific conditions]

RISKS:
- SUTVA violations: [Assessment]
- Novelty effects: [Mitigation plan]
- Instrumentation risks: [Verification plan]

APPROVAL:
- [ ] Pre-registration reviewed by second data scientist
- [ ] Stakeholders aligned on decision rules
- [ ] Instrumentation verified in staging
```

### Pre-Registration Rules

1. Pre-registration must be completed BEFORE the experiment launches.
2. Pre-registrations are IMMUTABLE once the experiment launches.
3. Deviations from the pre-registered plan must be documented and justified.
4. Post-hoc analyses are allowed but must be clearly labeled as exploratory.
5. Pre-registration status is tracked:
   - REGISTERED: Experiment planned, not yet launched.
   - ACTIVE: Experiment running.
   - COMPLETED: Data collected, analysis pending.
   - ANALYZED: Analysis complete, decision pending.
   - DECIDED: Decision made and documented.
   - ARCHIVED: Experiment concluded, results documented.

### Pre-Registration Compliance Tracking

```
QUARTER: [Q1/Q2/Q3/Q4 YYYY]

EXPERIMENTS RUN: [N]
PRE-REGISTERED: [N] ([%])
DEVIATED FROM PRE-REGISTRATION: [N] ([%])
NOT PRE-REGISTERED (VIOLATION): [N] ([%])

COMPLIANCE RATE TARGET: 100%
ACTUAL COMPLIANCE RATE: [%]

NON-COMPLIANT EXPERIMENTS:
- EXP-[ID]: [Reason for non-compliance]
- EXP-[ID]: [Reason for non-compliance]

CORRECTIVE ACTIONS:
[What will be done to improve compliance]
```

---

## 5. Bias Audit System

The Data Brain conducts regular bias audits on all production models and
high-impact analyses.

### Bias Audit Schedule

| Artifact Type | Audit Frequency | Scope |
|---------------|-----------------|-------|
| Production ML model | Every retrain + quarterly | Full audit |
| Customer-facing algorithm | Monthly | Disparate impact check |
| Pricing/credit model | Quarterly | Full regulatory audit |
| Hiring/HR model | Every use | Full audit + legal review |
| Internal analytics | Semi-annually | Methodology audit |

### Bias Audit Template

```
BIAS AUDIT ID: AUDIT-[YYYY]-[NNN]
DATE: [YYYY-MM-DD]
ARTIFACT: [Model/Analysis ID]
AUDITOR: [Must be different from the builder]

PROTECTED CLASSES EXAMINED:
- [Class 1]: [Definition, how identified in data]
- [Class 2]: [Definition, how identified in data]

FAIRNESS METRICS:
| Metric | Group A | Group B | Ratio | Threshold | Status |
|--------|---------|---------|-------|-----------|--------|
| Positive rate | [%] | [%] | [ratio] | > 0.8 | [PASS/FAIL] |
| FPR | [%] | [%] | [ratio] | < 1.25 | [PASS/FAIL] |
| FNR | [%] | [%] | [ratio] | < 1.25 | [PASS/FAIL] |
| Calibration | [value] | [value] | [ratio] | > 0.8 | [PASS/FAIL] |

PROXY VARIABLE ANALYSIS:
- Features correlated with protected class (r > 0.3):
  - [Feature]: correlation = [value]
  - [Feature]: correlation = [value]
- Proxy mitigation: [Removed / Regularized / Justified retention]

DISPARATE IMPACT ANALYSIS:
- Four-fifths rule applied: [PASS / FAIL]
- If FAIL: mitigation implemented: [Description]

DATA REPRESENTATIVENESS:
- Training data demographics vs. population demographics: [Comparison]
- Underrepresented groups identified: [List]
- Mitigation: [Oversampling / Reweighting / Additional data collection]

AUDIT OUTCOME:
- [ ] PASS: No bias concerns identified.
- [ ] PASS WITH CONDITIONS: Minor issues identified, mitigations in place.
- [ ] FAIL: Significant bias detected. Remediation required before deployment.
- [ ] REMEDIATION PLAN: [Description with timeline]

NEXT AUDIT DATE: [YYYY-MM-DD]
```

### Bias Audit Escalation

| Finding | Action | SLA |
|---------|--------|-----|
| Minor disparity (ratio 0.8-0.9) | Document, monitor, mitigate in next retrain | Next retrain cycle |
| Significant disparity (ratio < 0.8) | Escalate to CEO Brain. Remediate before next use | 2 weeks |
| Potential regulatory violation | STOP. Legal Brain + CEO Brain immediately | 24 hours |
| Proxy discrimination detected | Remove or justify. Document decision | 1 week |

---

## 6. Failure Documentation Protocol

### Data-Specific Failure Categories

| Category | Examples | Severity |
|----------|----------|----------|
| Statistical Error | Wrong test, violated assumptions, multiple comparison failure | S1 if decision was made, S2 otherwise |
| Data Quality Failure | Pipeline produced wrong numbers, join error, dedup failure | S1 if dashboard affected, S2 otherwise |
| Model Failure | Production model degraded, wrong predictions, bias discovered | S1 if customer-facing, S2 otherwise |
| Reproducibility Failure | Cannot reproduce results, code lost, data unavailable | S2 |
| Communication Failure | Misleading visualization, ambiguous conclusion, omitted caveat | S2 if decision was made, S3 otherwise |
| Ethical Failure | Privacy violation, bias in production model, consent issue | S1 always |

### Post-Mortem Template

```
POST-MORTEM: DATA-[YYYY]-[NNN]
SEVERITY: [S1/S2/S3]
CATEGORY: [From table above]
DATE: [YYYY-MM-DD]
FACILITATOR: [Who led]

WHAT HAPPENED:
[Factual description]

IMPACT:
- Decisions affected: [List any decisions made based on wrong analysis]
- Decisions reversed: [List any decisions that need to be reversed]
- Customer impact: [If any]
- Financial impact: [If any]

ROOT CAUSE (5 Whys):
1. [Surface cause]
2. [Deeper]
3. [Deeper still]
4. [Systemic cause]
5. [Root cause]

WHICH REVIEW CHECKLIST GATE WOULD HAVE CAUGHT THIS:
[Gate name and specific checkbox]

CORRECTIVE ACTIONS:
| Action | Owner | Deadline | Verification Method |
|--------|-------|----------|-------------------|
| [Action 1] | [Owner] | [Date] | [How to verify] |
| [Action 2] | [Owner] | [Date] | [How to verify] |

PROCESS IMPROVEMENTS:
[Changes to DataScore, ReviewChecklist, or pipeline monitoring]
```

---

## 7. Escalation Matrix

| Level | Condition | Escalate To | Response Time |
|-------|-----------|------------|---------------|
| L1 | Routine analysis question | Engineering or Product Brain | 48 hours |
| L2 | Statistical methodology disagreement | External statistician review | 1 week |
| L3 | Model performance degradation | Engineering Brain (infra) + CEO Brain | 24 hours |
| L4 | Data quality incident affecting decisions | All consuming brains + CEO Brain | 12 hours |
| L5 | Ethical violation or regulatory concern | CEO Brain + Legal Brain | Immediately |

### Mandatory Escalation Triggers

1. **Any analysis used for investor communication** -> Must be Tier 1
   reproducible and reviewed by a second analyst.
2. **Any model affecting pricing or credit** -> Full bias audit before
   deployment. Legal Brain consulted.
3. **Any experiment with null result that stakeholders want to ignore** ->
   Escalate to CEO Brain. Null results are results.
4. **Any data quality issue that affected a shipped decision** -> S1
   post-mortem. Affected stakeholders informed within 12 hours.
5. **Statistical Rigor scores 1 on any production analysis** -> Analysis
   retracted. Corrected version required before any decision.
6. **Reproducibility failure on an analysis that informed a major decision** ->
   Decision review triggered. All conclusions treated as unverified.

---

## 8. Quarterly Self-Assessment

```
QUARTERLY SELF-ASSESSMENT: [Quarter YYYY]
DATE: [YYYY-MM-DD]

ANALYSES COMPLETED: [Count]
ANALYSES WITH FULL REPRODUCIBILITY: [Count] ([%])

DataScore AVERAGES:
- Statistical Rigor: [Avg]
- Data Quality: [Avg]
- Reproducibility: [Avg]
- Causal Reasoning: [Avg]
- Communication: [Avg]
- Ethical Rigor: [Avg]
- Production Readiness: [Avg]
- Model Evaluation: [Avg]

WEAKEST DIMENSION: [Which one]
IMPROVEMENT PLAN: [Specific actions]

EXPERIMENTS:
- Total run: [Count]
- Pre-registered: [Count] ([%])
- Positive results: [Count]
- Null results: [Count]
- Null results shared with stakeholders: [Count]

MODELS IN PRODUCTION:
- Total: [Count]
- With active monitoring: [Count]
- Retrained on schedule: [Count]
- Bias-audited on schedule: [Count]

FAILURES:
- S1: [Count]
- S2: [Count]
- Recurring root causes: [List]

BENCHMARK TEST RESULTS:
- Tests passed: [X/16]
- Tests failed: [Which ones]
- Retest plan: [When]

TOP 3 IMPROVEMENTS THIS QUARTER:
1. [Specific with evidence]
2. [Specific with evidence]
3. [Specific with evidence]

TOP 3 AREAS FOR NEXT QUARTER:
1. [Specific with plan]
2. [Specific with plan]
3. [Specific with plan]
```

---

## 9. Continuous Improvement Loop

Annually, the accountability system itself is audited:

1. Review all quarterly assessments.
2. Which accountability mechanisms caught real problems?
3. Which mechanisms are overhead without value? Simplify or remove.
4. What new failure modes were discovered this year? Add mechanisms.
5. Are reproducibility standards being met? If not, invest in tooling.
6. Are bias audits finding issues? If never, either the models are excellent
   or the audits are too lenient -- investigate which.
7. Cross-pollinate learnings with Engineering Brain and Product Brain.
8. Update BenchmarkTests with scenarios from actual failures.

---

*In data science, being approximately right is valuable. Being precisely
wrong is dangerous. This protocol ensures we know the difference.*
