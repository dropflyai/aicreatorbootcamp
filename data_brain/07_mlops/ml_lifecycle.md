# ML Lifecycle — From Experimentation to Production

## Overview

The machine learning lifecycle encompasses the end-to-end process of developing,
deploying, and maintaining ML systems. Unlike traditional software, ML systems have
additional complexity axes: data dependencies, model versioning, experiment tracking,
and continuous retraining. This module covers the CRISP-DM methodology, experiment
tracking with MLflow and Weights & Biases, model registries, reproducibility
practices, feature stores, A/B testing for ML, and champion/challenger deployment
patterns.

References: Sculley et al. (Hidden Technical Debt in ML Systems), Amershi et al.
(Software Engineering for ML), Google ML Best Practices, MLflow/W&B documentation,
Huyen (Designing Machine Learning Systems).

---

## CRISP-DM (Cross-Industry Standard Process for Data Mining)

### Phases

```
┌─────────────────────────────────────────┐
│           1. Business Understanding     │
│   Define objectives, success criteria   │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           2. Data Understanding          │
│   Explore, profile, assess quality       │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           3. Data Preparation            │
│   Clean, transform, feature engineer     │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           4. Modeling                     │
│   Train, tune, validate                  │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           5. Evaluation                  │
│   Assess against business criteria       │
└─────────────┬───────────────────────────┘
              │
┌─────────────▼───────────────────────────┐
│           6. Deployment                  │
│   Serve, monitor, maintain               │
└─────────────────────────────────────────┘
         (iterate back to any phase)
```

### ML-Specific Extensions

CRISP-DM was designed pre-deep-learning. Modern additions:

| Phase | Modern Extension |
|-------|-----------------|
| Business Understanding | ML feasibility assessment, ROI estimation |
| Data Understanding | Data lineage, bias audit, privacy assessment |
| Data Preparation | Feature store integration, data versioning |
| Modeling | Experiment tracking, hyperparameter optimization |
| Evaluation | Fairness metrics, calibration, A/B testing plan |
| Deployment | CI/CD for ML, monitoring, retraining triggers |

---

## Experiment Tracking

### Why Track Experiments

Without tracking, ML development becomes unreproducible:
- Which hyperparameters produced the best model?
- Which dataset version was used?
- Which code commit corresponds to which results?
- How do metrics compare across 50+ experiments?

### MLflow

```python
import mlflow

mlflow.set_experiment("churn_prediction_v2")

with mlflow.start_run(run_name="xgboost_baseline"):
    # Log parameters
    mlflow.log_param("n_estimators", 500)
    mlflow.log_param("max_depth", 6)
    mlflow.log_param("learning_rate", 0.1)
    mlflow.log_param("dataset_version", "v2.3")

    # Train model
    model = XGBClassifier(n_estimators=500, max_depth=6, learning_rate=0.1)
    model.fit(X_train, y_train)

    # Log metrics
    y_pred = model.predict_proba(X_test)[:, 1]
    mlflow.log_metric("auc_roc", roc_auc_score(y_test, y_pred))
    mlflow.log_metric("precision_at_10pct", precision_at_k(y_test, y_pred, 0.10))
    mlflow.log_metric("log_loss", log_loss(y_test, y_pred))

    # Log model artifact
    mlflow.xgboost.log_model(model, "model")

    # Log feature importance plot
    fig = plot_feature_importance(model)
    mlflow.log_figure(fig, "feature_importance.png")

    # Log dataset info
    mlflow.log_artifact("data/feature_schema.yaml")
```

### MLflow Components

| Component | Purpose |
|-----------|---------|
| Tracking | Log parameters, metrics, artifacts |
| Projects | Package code for reproducibility (conda/docker) |
| Models | Standard model packaging format |
| Registry | Stage models (Staging/Production/Archived) |

### Weights & Biases (W&B)

```python
import wandb

wandb.init(project="churn_prediction", config={
    "n_estimators": 500,
    "max_depth": 6,
    "learning_rate": 0.1,
})

# Automatic logging with framework integrations
model.fit(X_train, y_train, callbacks=[wandb.xgboost.WandbCallback()])

# Log custom metrics
wandb.log({"auc_roc": 0.87, "precision_at_10pct": 0.42})

# Log tables for interactive exploration
wandb.log({"predictions": wandb.Table(dataframe=predictions_df)})

# Log sweeps for hyperparameter optimization
sweep_config = {
    "method": "bayes",
    "metric": {"name": "auc_roc", "goal": "maximize"},
    "parameters": {
        "n_estimators": {"values": [100, 300, 500, 1000]},
        "max_depth": {"distribution": "int_uniform", "min": 3, "max": 10},
        "learning_rate": {"distribution": "log_uniform_values", "min": 0.001, "max": 0.3},
    },
}
```

### MLflow vs W&B Comparison

| Feature | MLflow | W&B |
|---------|--------|-----|
| Deployment | Self-hosted or Databricks | Cloud SaaS |
| Cost | Free (open source) | Free tier + paid |
| UI | Functional | Rich, interactive |
| Collaboration | Basic | Team workspaces, reports |
| Integrations | Broad (sklearn, TF, PyTorch) | Broad + sweeps, artifacts |
| Model registry | Built-in | Integrated |
| Hyperparameter tuning | Requires external | Built-in (sweeps) |

---

## Model Registry

### Purpose

A model registry manages the lifecycle of trained models from development
through staging to production.

### Registry Workflow

```
Experiment Run
    │
    ├── Register Model (version 1)
    │       │
    │       ├── Stage: "None" (development)
    │       │
    │       ├── Promote to "Staging"
    │       │     └── Automated validation tests
    │       │
    │       ├── Promote to "Production"
    │       │     └── Serving infrastructure picks up
    │       │
    │       └── Archive (when superseded)
    │
    └── Register Model (version 2)
            └── (same lifecycle)
```

### Model Metadata

```yaml
model:
  name: churn_predictor
  version: 3
  stage: Production
  registered_at: 2024-06-15T10:30:00Z
  registered_by: ml-team
  run_id: abc123
  metrics:
    auc_roc: 0.872
    precision_at_10pct: 0.45
    log_loss: 0.312
  dataset:
    name: customer_features_v2.3
    rows: 1,234,567
    features: 48
  training:
    framework: xgboost
    duration_minutes: 12
    compute: ml.g4dn.xlarge
  approval:
    reviewer: lead-data-scientist
    approved_at: 2024-06-16T14:00:00Z
    notes: "Performance meets threshold. Approved for production."
```

---

## Reproducibility

### Reproducibility Checklist

| Layer | Requirement | Tool |
|-------|------------|------|
| Code | Version control all code | Git |
| Data | Version and snapshot datasets | DVC, Delta Lake, lakeFS |
| Environment | Pin all dependencies | conda, pip freeze, Docker |
| Config | Track all hyperparameters | MLflow, W&B, Hydra |
| Random | Set and record random seeds | Manual (numpy, torch, python) |
| Hardware | Document GPU type and count | Experiment metadata |
| Pipeline | Orchestrate end-to-end | Airflow, Kubeflow, Metaflow |

### Data Versioning with DVC

```bash
# Track a large dataset file
dvc add data/training_features.parquet

# Push to remote storage
dvc push

# Tag the dataset version
git tag -a "dataset-v2.3" -m "Added new behavioral features"

# Reproduce a specific experiment
git checkout experiment-v1.2
dvc pull
python train.py
```

### Seed Management

```python
import random
import numpy as np
import torch

def set_seed(seed: int = 42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)
    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False
    os.environ["PYTHONHASHSEED"] = str(seed)
```

---

## Feature Stores

### Architecture

```
┌────────────────────────────────────────────────┐
│              Feature Store                      │
│                                                 │
│  ┌──────────────┐     ┌──────────────────────┐ │
│  │ Offline Store │     │    Online Store       │ │
│  │ (warehouse)   │     │ (Redis/DynamoDB)      │ │
│  │ Historical    │     │ Low-latency (<10ms)   │ │
│  │ features for  │     │ features for serving  │ │
│  │ training      │     │                       │ │
│  └──────────────┘     └──────────────────────┘ │
│         │                        │               │
│  ┌──────┴────────────────────────┴──────────┐   │
│  │          Feature Registry                 │   │
│  │  Metadata, lineage, documentation         │   │
│  └───────────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
```

### Feature Definition (Feast Example)

```python
from feast import Entity, Feature, FeatureView, FileSource, ValueType
from datetime import timedelta

customer = Entity(name="customer_id", value_type=ValueType.INT64)

customer_features = FeatureView(
    name="customer_features",
    entities=["customer_id"],
    ttl=timedelta(days=1),
    features=[
        Feature(name="total_purchases_30d", dtype=ValueType.INT64),
        Feature(name="avg_order_value_30d", dtype=ValueType.DOUBLE),
        Feature(name="days_since_last_purchase", dtype=ValueType.INT64),
        Feature(name="support_tickets_30d", dtype=ValueType.INT64),
    ],
    online=True,
    source=BigQuerySource(
        table_ref="analytics.customer_features",
        event_timestamp_column="feature_timestamp",
    ),
)
```

### Training-Serving Skew

The most dangerous ML production bug: features computed differently at
training time vs serving time.

| Cause | Mitigation |
|-------|-----------|
| Different code paths | Use feature store for both training and serving |
| Time leakage | Point-in-time joins (as-of joins) |
| Different libraries | Standardize feature computation |
| Stale features | Monitor feature freshness |

---

## A/B Testing for ML Models

### Design

```
Traffic Split:
  Control (Champion): 50% traffic -> current production model
  Treatment (Challenger): 50% traffic -> new candidate model

Duration: 2-4 weeks minimum for business metric observation
Sample size: power analysis based on expected effect size
```

### Metrics Hierarchy

| Level | Metric | Example |
|-------|--------|---------|
| Model | AUC, precision, recall | AUC improved 0.87 -> 0.91 |
| Product | CTR, conversion, engagement | CTR +3.2% |
| Business | Revenue, LTV, churn | Revenue per user +$0.50 |
| Guardrail | Latency, error rate, fairness | P95 latency < 200ms |

### Statistical Analysis

```
Test: two-proportion z-test or t-test on per-user metrics
Correction: Bonferroni if multiple metrics
Duration: until minimum sample size reached (no peeking)
Sequential testing: use GSTE or mSPRT for early stopping

Delta method for ratio metrics:
  Var(Y/X) ≈ (1/mu_X^2) * [Var(Y) - 2*(mu_Y/mu_X)*Cov(X,Y) + (mu_Y/mu_X)^2*Var(X)]
```

---

## Champion/Challenger Deployment

### Pattern

```
Request
  │
  ├── Router (traffic splitting)
  │     ├── 90% -> Champion Model (v3, production-proven)
  │     ├── 5%  -> Challenger A (v4, new features)
  │     └── 5%  -> Challenger B (v4, new architecture)
  │
  ├── Response served to user
  │
  └── Metrics logged for comparison
       └── After sufficient data: promote best challenger to champion
```

### Shadow Mode (Pre-Launch)

Run the challenger in parallel without serving its predictions:

```
Request -> Champion Model -> Response (served)
       └-> Challenger Model -> Predictions (logged, not served)

Compare predictions offline to validate before live traffic split.
```

### Promotion Criteria

```yaml
promotion_criteria:
  minimum_observation_period: 14 days
  minimum_sample_size: 10000 predictions
  model_metrics:
    auc_roc: "> champion by 0.01"
    precision_at_10pct: ">= champion"
  product_metrics:
    conversion_rate: "p-value < 0.05, positive direction"
  guardrails:
    p95_latency_ms: "< 200"
    error_rate: "< 0.1%"
    fairness_gap: "< 0.05 across protected groups"
  approval: "manual sign-off by ML lead"
```

---

## ML Project Governance

### Stage Gates

| Gate | Criteria | Approver |
|------|---------|----------|
| Problem framing | Business case, success metrics defined | Product + ML lead |
| Data readiness | Data quality sufficient, privacy cleared | Data engineering |
| Model baseline | Baseline model meets minimum bar | ML lead |
| Production readiness | Monitoring, rollback, documentation | ML + Platform |
| Launch | A/B test results positive | Product + ML lead |

### Documentation Requirements

- Model card (see Templates/)
- Data sheet for the training dataset
- Experiment report with methodology and results
- Monitoring and alerting plan
- Runbook for common failure modes

---

## Production Checklist

- [ ] Experiment tracking configured (MLflow or W&B)
- [ ] All experiments logged with parameters, metrics, and artifacts
- [ ] Model registered in registry with stage management
- [ ] Reproducibility verified (code + data + environment + seeds)
- [ ] Feature store operational with online and offline consistency
- [ ] A/B testing framework ready with proper statistical design
- [ ] Champion/challenger pipeline configured
- [ ] Stage gates defined and enforced
- [ ] Model card and documentation complete
- [ ] Rollback procedure tested
