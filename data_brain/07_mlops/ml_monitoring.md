# ML Monitoring — Drift Detection, Degradation, and Feedback Loops

## Overview

ML models degrade silently. Unlike traditional software that fails with errors,
ML systems can produce increasingly wrong predictions without any runtime exceptions.
This module covers the monitoring infrastructure required to detect data drift,
concept drift, and performance degradation before they impact business outcomes.
It includes statistical tests for drift detection (PSI, KS test, Jensen-Shannon
divergence), monitoring dashboard design, retraining trigger strategies, and
feedback loop architectures.

References: Sculley et al. (Hidden Technical Debt in ML Systems), Google Monitoring
ML Models in Production, NannyML documentation, Evidently AI documentation,
Rabanser et al. (Failing Loudly: An Empirical Study of Methods for Detecting
Dataset Shift).

---

## Types of ML Degradation

### Data Drift (Covariate Shift)

The distribution of input features changes: P(X) shifts while P(Y|X) remains
the same.

```
Training data: age distribution centered at 35
Production data: age distribution shifts to center at 45

The model's predictions may be unreliable for the new age range because
it was trained on a different distribution.
```

Causes:
- Seasonality (holiday traffic patterns)
- Market changes (new customer segments)
- Upstream data pipeline changes (new data source, schema change)
- Population shift (product expanding to new geography)

### Concept Drift

The relationship between features and target changes: P(Y|X) shifts.

```
Training: high engagement -> low churn
Production: high engagement -> high churn (competitor launched)

The learned mapping is now wrong even if features look the same.
```

Types of concept drift:
- **Sudden**: abrupt change (regulation change, competitor action)
- **Gradual**: slow transition between concepts
- **Incremental**: steady trend over time
- **Recurring**: periodic pattern (seasonal behavior)

### Prediction Drift

The distribution of model outputs shifts: P(Y_hat) changes.

This is often the earliest detectable signal because it does not require
ground truth labels. If the model suddenly predicts "high risk" for 40% of
users instead of the historical 10%, something has changed.

### Label Drift (Target Drift)

The distribution of the target variable changes: P(Y) shifts.

```
Training: 5% churn rate
Production: 15% churn rate (macro-economic downturn)

Even if P(Y|X) is stable, the prior shift affects calibration.
```

---

## Drift Detection Methods

### Population Stability Index (PSI)

Measures the shift between two distributions (reference vs current).

```
PSI = SUM_i (P_i - Q_i) * ln(P_i / Q_i)

where:
  P_i = proportion in bin i for reference distribution
  Q_i = proportion in bin i for current distribution

Binning: 10-20 equal-width or quantile-based bins

Interpretation:
  PSI < 0.1:  No significant shift
  0.1 <= PSI < 0.25: Moderate shift (investigate)
  PSI >= 0.25: Significant shift (action required)
```

### Implementation

```python
import numpy as np

def compute_psi(reference, current, bins=10):
    """Compute Population Stability Index."""
    # Create bins from reference distribution
    breakpoints = np.quantile(reference, np.linspace(0, 1, bins + 1))
    breakpoints[0] = -np.inf
    breakpoints[-1] = np.inf

    # Compute proportions
    ref_counts = np.histogram(reference, bins=breakpoints)[0]
    cur_counts = np.histogram(current, bins=breakpoints)[0]

    ref_pct = ref_counts / len(reference) + 1e-6  # avoid division by zero
    cur_pct = cur_counts / len(current) + 1e-6

    psi = np.sum((cur_pct - ref_pct) * np.log(cur_pct / ref_pct))
    return psi
```

### Kolmogorov-Smirnov Test (KS Test)

Non-parametric test comparing two distributions.

```
D = max_x |F_ref(x) - F_cur(x)|

where F_ref, F_cur are empirical CDFs of reference and current distributions.

H_0: both samples come from the same distribution
Reject if D > D_alpha (critical value depends on sample sizes)

p-value < 0.05: statistically significant drift
```

Advantages:
- Distribution-free (no assumptions about shape)
- Sensitive to differences in location, scale, and shape
- Well-understood statistical properties

Disadvantages:
- Univariate only (must apply per-feature)
- Sensitive to sample size (large samples detect trivial differences)
- Does not indicate the direction or nature of the shift

### Jensen-Shannon Divergence (JSD)

Symmetric version of KL divergence.

```
JSD(P || Q) = 0.5 * KL(P || M) + 0.5 * KL(Q || M)
where M = 0.5 * (P + Q)

Range: [0, 1] when using log base 2
  0 = identical distributions
  1 = completely different distributions
```

### Chi-Square Test (Categorical Features)

```
chi^2 = SUM_i (O_i - E_i)^2 / E_i

where:
  O_i = observed frequency in category i (current)
  E_i = expected frequency based on reference proportions

df = number of categories - 1
```

### Multivariate Drift Detection

| Method | Approach | Advantage |
|--------|---------|-----------|
| MMD (Maximum Mean Discrepancy) | Kernel-based distance between distributions | Captures complex multivariate shifts |
| Domain classifier | Train a model to distinguish reference from current | Powerful, interpretable feature importance |
| PCA + univariate | Project to principal components, test each | Reduces dimensionality |
| Multivariate KS | Apply KS to each feature, Bonferroni correction | Simple, conservative |

### Domain Classifier Approach

```python
# Create binary classification: 0 = reference, 1 = current
X_combined = np.vstack([X_reference, X_current])
y_combined = np.array([0] * len(X_reference) + [1] * len(X_current))

# Train lightweight classifier
clf = LogisticRegression()
clf.fit(X_combined, y_combined)

# If AUC > 0.6, the classifier can distinguish the distributions = drift
auc = roc_auc_score(y_combined, clf.predict_proba(X_combined)[:, 1])

# Feature importance reveals which features drifted most
feature_importance = np.abs(clf.coef_[0])
```

---

## Performance Degradation Detection

### When Ground Truth Is Available

Track model metrics over time with statistical process control:

```
Metric window: compute AUC/precision/recall on rolling 7-day window
Control limits:
  UCL = mean + 3 * std (upper control limit)
  LCL = mean - 3 * std (lower control limit)

Alert if:
  - Metric falls below LCL
  - 7 consecutive points below the mean (trend)
  - 2 of 3 consecutive points beyond 2-sigma
```

### When Ground Truth Is Delayed

Many ML applications have delayed labels:
- Churn: know in 30-90 days if customer churned
- Fraud: investigation takes weeks
- Ad conversion: attribution window of 7-28 days

Proxy monitoring strategies:
- Monitor prediction distribution (prediction drift)
- Monitor feature drift as early warning
- Use partial labels (early returns) as a leading indicator
- Use model confidence as a signal (dropping confidence = potential degradation)

### Monitoring Metrics Table

| Category | Metric | Alert Threshold |
|----------|--------|----------------|
| Data quality | Null rate per feature | > 2x historical |
| Data quality | Feature cardinality | Changed by > 20% |
| Data quality | Schema violations | Any violation |
| Data drift | PSI per feature | > 0.25 |
| Data drift | KS test p-value | < 0.01 |
| Prediction drift | Output distribution mean | > 2 sigma shift |
| Prediction drift | Prediction volume | > 3x or < 0.3x |
| Model performance | AUC-ROC (rolling) | Dropped > 0.02 |
| Model performance | Calibration error | > 0.05 |
| Infrastructure | Latency P95 | > 200ms |
| Infrastructure | Error rate | > 0.1% |

---

## Monitoring Dashboard Design

### Dashboard Layout

```
┌────────────────────────────────────────────────────────────┐
│  MODEL MONITORING: churn_predictor_v3.2                    │
│  Status: HEALTHY | Last updated: 5 min ago                 │
├────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │ AUC: 0.87    │ │ PSI: 0.08    │ │ P95 Latency: 45ms│   │
│  │ (target >0.85)│ │ (target <0.25)│ │ (target <200ms) │   │
│  └──────────────┘ └──────────────┘ └──────────────────┘   │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Model Performance Over Time (AUC, 30-day rolling)│     │
│  │  [line chart with control limits]                  │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Feature Drift Heatmap (PSI per feature per week) │     │
│  │  [heatmap: green < 0.1, yellow < 0.25, red >= 0.25]│    │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Prediction Distribution (reference vs current)    │     │
│  │  [overlaid histograms]                             │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  ┌───────────────────────────────────────────────────┐     │
│  │  Data Quality (null rates, volume, schema)         │     │
│  │  [sparklines with alert indicators]                │     │
│  └───────────────────────────────────────────────────┘     │
└────────────────────────────────────────────────────────────┘
```

### Tools

| Tool | Type | Key Feature |
|------|------|-------------|
| Evidently AI | Open source | Drift reports, dashboards |
| NannyML | Open source | Performance estimation without labels |
| Arize AI | Commercial | Real-time monitoring, embeddings |
| WhyLabs | Commercial | Data profiling, drift detection |
| Fiddler AI | Commercial | Explainability + monitoring |
| Custom | Prometheus + Grafana | Full control, existing infra |

---

## Retraining Triggers

### Trigger Strategies

| Strategy | Trigger | Trade-off |
|----------|---------|-----------|
| Scheduled | Every N days/weeks | Simple, predictable, may retrain unnecessarily |
| Drift-based | PSI > threshold for key features | Responsive, but threshold tuning required |
| Performance-based | AUC drops below threshold | Direct, but requires ground truth labels |
| Volume-based | N new labeled examples accumulated | Ensures sufficient new data |
| Hybrid | Schedule OR drift OR performance | Most robust, most complex |

### Retraining Pipeline

```
Trigger Detected
    │
    ├── 1. Snapshot training data (including new data)
    ├── 2. Retrain model with same hyperparameters
    ├── 3. Evaluate on validation set
    │      ├── Passes quality gate -> proceed
    │      └── Fails quality gate -> alert, do not deploy
    ├── 4. Register new model version
    ├── 5. Deploy to shadow mode
    ├── 6. Monitor shadow predictions for 24-48 hours
    ├── 7. Promote to production (champion/challenger)
    └── 8. Archive old model version
```

### Quality Gates for Automated Retraining

```yaml
quality_gates:
  metrics:
    auc_roc: ">= 0.85"
    precision_at_10pct: ">= 0.40"
    calibration_error: "<= 0.05"
  data:
    training_rows: ">= 100000"
    feature_completeness: ">= 0.99"
    label_distribution: "within 2x of historical"
  fairness:
    demographic_parity_gap: "<= 0.05"
    equalized_odds_gap: "<= 0.05"
  stability:
    prediction_distribution_psi: "<= 0.15 vs previous model"
```

---

## Feedback Loops

### Positive Feedback Loops (Dangerous)

```
Model predicts "high risk" for user -> User sees fewer features ->
User engagement drops -> Model predicts higher risk -> ...

The model's predictions influence the data it trains on, creating
a self-fulfilling prophecy that amplifies initial biases.
```

### Mitigation Strategies

1. **Exploration**: randomly serve some users the opposite prediction (costly)
2. **Logging policy**: record the model's prediction alongside the action taken
3. **Counterfactual evaluation**: estimate what would have happened under
   a different policy using importance sampling
4. **Delayed labels**: collect ground truth independently of model predictions
5. **Diversity injection**: add randomness to break feedback determinism

### Direct vs Indirect Feedback

| Type | Latency | Example |
|------|---------|---------|
| Direct | Immediate | User clicks on recommendation |
| Indirect | Hours-days | User purchases after browsing |
| Delayed | Weeks-months | Customer churns 60 days later |
| Proxy | Immediate | Time on page as proxy for satisfaction |

---

## Alerting Strategy

### Severity Levels

| Level | Criteria | Response Time | Notification |
|-------|---------|---------------|-------------|
| P0 Critical | Model serving errors > 1% | 15 minutes | PagerDuty |
| P1 High | Performance dropped > 5% | 4 hours | Slack + email |
| P2 Medium | Significant drift detected | 24 hours | Slack |
| P3 Low | Minor drift, within tolerance | Next sprint | Dashboard |

### Alert Fatigue Prevention

- Set thresholds based on business impact, not statistical significance
- Use anomaly detection on metrics instead of fixed thresholds
- Group related alerts (drift in 5 features = 1 alert, not 5)
- Require runbook link in every alert
- Review and tune alert thresholds quarterly

---

## Production Checklist

- [ ] Drift detection configured for all key features (PSI or KS test)
- [ ] Prediction distribution monitored against reference baseline
- [ ] Performance metrics tracked with control limits
- [ ] Data quality checks automated (nulls, volume, schema)
- [ ] Monitoring dashboard built and accessible to team
- [ ] Alerting configured with severity levels and runbooks
- [ ] Retraining trigger strategy defined and automated
- [ ] Quality gates enforced before any model promotion
- [ ] Feedback loop risks identified and mitigated
- [ ] Monthly review of monitoring effectiveness scheduled
