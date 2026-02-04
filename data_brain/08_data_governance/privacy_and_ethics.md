# Privacy and Ethics — Regulation, Anonymization, Fairness, and Bias

## Overview

Data privacy and algorithmic ethics are both legal obligations and moral imperatives.
This module covers the major privacy regulations (GDPR, CCPA/CPRA), technical
anonymization methods (k-anonymity, l-diversity, differential privacy), PII detection
pipelines, fairness definitions and their inherent trade-offs, bias detection and
mitigation strategies, and the governance structures required to operationalize
ethical AI. Building trustworthy data systems requires understanding that fairness
cannot be reduced to a single metric.

References: EU GDPR (Regulation 2016/679), California CCPA/CPRA, Dwork et al.
(Differential Privacy), Sweeney (k-Anonymity), Barocas, Hardt & Narayanan (Fairness
and Machine Learning), Mehrabi et al. (A Survey on Bias and Fairness in ML),
NIST AI Risk Management Framework.

---

## Privacy Regulations

### GDPR (General Data Protection Regulation)

Applies to: any organization processing personal data of EU/EEA residents.

**Key Principles (Article 5)**

| Principle | Requirement |
|-----------|------------|
| Lawfulness, fairness, transparency | Legal basis for processing; clear communication |
| Purpose limitation | Collected for specified, explicit purposes only |
| Data minimization | Adequate, relevant, limited to what is necessary |
| Accuracy | Reasonable steps to keep data accurate and current |
| Storage limitation | Retained only as long as necessary |
| Integrity and confidentiality | Protected against unauthorized processing/loss |
| Accountability | Controller must demonstrate compliance |

**Legal Bases for Processing (Article 6)**
1. Consent (freely given, specific, informed, unambiguous)
2. Contract performance
3. Legal obligation
4. Vital interests
5. Public interest
6. Legitimate interests (requires balancing test)

**Data Subject Rights**
- Right of access (Art. 15)
- Right to rectification (Art. 16)
- Right to erasure / right to be forgotten (Art. 17)
- Right to restriction of processing (Art. 18)
- Right to data portability (Art. 20)
- Right to object (Art. 21)
- Right not to be subject to automated decision-making (Art. 22)

**Breach Notification**: 72 hours to supervisory authority (Art. 33).
**Fines**: up to 4% of annual global turnover or EUR 20 million.

### CCPA/CPRA (California)

Applies to: businesses meeting revenue/data thresholds processing CA residents' data.

| Right | Description |
|-------|------------|
| Right to know | What personal info is collected and how it is used |
| Right to delete | Request deletion of personal information |
| Right to opt-out | Opt out of sale/sharing of personal information |
| Right to non-discrimination | Cannot penalize for exercising rights |
| Right to correct | Correct inaccurate personal information (CPRA) |
| Right to limit | Limit use of sensitive personal information (CPRA) |

### Key Differences

| Aspect | GDPR | CCPA/CPRA |
|--------|------|-----------|
| Scope | EU/EEA residents | CA residents (with thresholds) |
| Legal basis | Required (6 bases) | Not required (opt-out model) |
| Consent | Opt-in | Opt-out |
| Right to delete | Yes (with exceptions) | Yes (with exceptions) |
| Automated decisions | Right to human review | Limited provisions |
| Children | < 16 requires parental consent | < 16 opt-in for sale |
| Fines | Up to 4% global turnover | $2,500 per violation, $7,500 intentional |

---

## Anonymization Techniques

### PII Classification

| Category | Examples | Risk Level |
|----------|---------|-----------|
| Direct identifiers | Name, SSN, email, phone | Critical |
| Quasi-identifiers | ZIP code, age, gender, job title | High |
| Sensitive attributes | Health status, salary, political view | High |
| Non-identifying | Aggregate counts, product categories | Low |

### k-Anonymity (Sweeney, 2002)

A dataset satisfies k-anonymity if every combination of quasi-identifiers
appears at least k times.

```
Original:
  Name    | ZIP   | Age | Condition
  Alice   | 02139 | 28  | Flu
  Bob     | 02139 | 29  | Diabetes
  Carol   | 02138 | 35  | Flu

k=2 Anonymized (generalize quasi-identifiers):
  Name    | ZIP   | Age   | Condition
  *       | 0213* | 25-30 | Flu
  *       | 0213* | 25-30 | Diabetes
  *       | 0213* | 35-40 | Flu   <-- fails k=2 (only 1 row)
```

Techniques: generalization (ZIP -> first 3 digits), suppression (remove records).

Limitation: homogeneity attack. If all k records share the same sensitive
attribute, the attacker learns the value.

### l-Diversity

Extends k-anonymity: each equivalence class must have at least l
"well-represented" values of the sensitive attribute.

### t-Closeness

The distribution of a sensitive attribute in any equivalence class must be
within distance t of the attribute's distribution in the overall dataset.
Uses Earth Mover's Distance (EMD) as the distance metric.

### Differential Privacy (Dwork, 2006)

A mechanism M satisfies epsilon-differential privacy if for all datasets D1, D2
differing in one record, and for all outputs S:

```
P(M(D1) in S) <= exp(epsilon) * P(M(D2) in S)

epsilon: privacy budget (smaller = more private)
  epsilon = 0: perfect privacy (no information leakage)
  epsilon = 1: strong privacy
  epsilon = 10: weak privacy
```

### Laplace Mechanism

Add noise from Laplace distribution to query results:

```
M(D) = f(D) + Lap(sensitivity / epsilon)

sensitivity = max_{D1,D2} |f(D1) - f(D2)| for neighboring datasets
  Count query: sensitivity = 1
  Sum query: sensitivity = max(|value|)
```

### Gaussian Mechanism (Approximate DP)

For (epsilon, delta)-differential privacy:

```
M(D) = f(D) + N(0, sigma^2)
sigma >= sensitivity * sqrt(2 * ln(1.25/delta)) / epsilon
```

### Composition Theorem

Multiple DP queries compose:

```
Basic: k queries of epsilon-DP -> k*epsilon total privacy loss
Advanced: k queries -> O(sqrt(k) * epsilon) (sublinear!)
Renyi DP: tighter composition via Renyi divergence
```

### Practical DP Systems

| System | Organization | Application |
|--------|-------------|------------|
| RAPPOR | Google | Chrome usage statistics |
| Apple DP | Apple | Emoji, QuickType, Safari |
| LinkedIn DP | LinkedIn | Analytics on member data |
| US Census | Census Bureau | 2020 Census (TopDown Algorithm) |
| OpenDP | Harvard | Research toolkit |

---

## PII Detection

### Automated PII Detection Pipeline

```
Text Input
    │
    ├── Rule-based detection
    │     ├── Regex: SSN, credit card, phone, email
    │     ├── Pattern: dates, addresses, IP addresses
    │     └── Dictionary: known names, locations
    │
    ├── ML-based detection
    │     ├── NER model fine-tuned for PII entities
    │     ├── Classification: PII vs non-PII columns
    │     └── Contextual: "my SSN is" + 9 digits
    │
    └── Output: PII inventory with location and type
```

### Common PII Patterns

```python
PII_PATTERNS = {
    "ssn": r"\b\d{3}[-]?\d{2}[-]?\d{4}\b",
    "credit_card": r"\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b",
    "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b",
    "phone_us": r"\b(\+1[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}\b",
    "ip_address": r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b",
}
```

### PII Handling Actions

| Action | Description | Use Case |
|--------|-----------|----------|
| Masking | Replace with asterisks | Display to unauthorized users |
| Tokenization | Replace with reversible token | Payment processing |
| Pseudonymization | Replace with consistent pseudonym | Analytics |
| Encryption | Encrypt at rest and in transit | Storage |
| Deletion | Permanently remove | Right to be forgotten |
| Aggregation | Replace individual values with aggregates | Reporting |

---

## Fairness in Machine Learning

### Fairness Definitions

The fundamental challenge: multiple fairness definitions are mathematically
incompatible (Chouldechova, Kleinberg impossibility theorem).

**Demographic Parity (Statistical Parity)**
```
P(Y_hat = 1 | A = 0) = P(Y_hat = 1 | A = 1)

Equal positive prediction rate across groups.
Does not require Y_hat to be accurate.
```

**Equalized Odds**
```
P(Y_hat = 1 | Y = 1, A = 0) = P(Y_hat = 1 | Y = 1, A = 1)  (equal TPR)
P(Y_hat = 1 | Y = 0, A = 0) = P(Y_hat = 1 | Y = 0, A = 1)  (equal FPR)

Equal error rates across groups.
```

**Predictive Parity**
```
P(Y = 1 | Y_hat = 1, A = 0) = P(Y = 1 | Y_hat = 1, A = 1)

Equal precision across groups.
```

**Individual Fairness**
```
Similar individuals should receive similar predictions.
d(f(x), f(x')) <= L * d(x, x')

Requires a meaningful distance metric on individuals.
```

### Impossibility Theorem

Unless the base rate P(Y=1) is equal across groups OR the classifier is perfect,
you cannot simultaneously satisfy:
1. Calibration (predictive parity)
2. Balance for the positive class (equal TPR)
3. Balance for the negative class (equal FPR)

This means fairness requires explicit value judgments about which definition matters most.

---

## Bias Detection and Mitigation

### Sources of Bias

| Stage | Bias Type | Example |
|-------|----------|---------|
| Data collection | Selection bias | Survey under-represents certain demographics |
| Data labeling | Annotation bias | Annotator demographics influence labels |
| Feature engineering | Proxy bias | ZIP code correlates with race |
| Model training | Algorithmic bias | Model optimizes majority group performance |
| Evaluation | Evaluation bias | Test set not representative |
| Deployment | Feedback loop | Model decisions influence future training data |

### Bias Metrics

```python
from fairlearn.metrics import MetricFrame, selection_rate, false_positive_rate

metric_frame = MetricFrame(
    metrics={
        "selection_rate": selection_rate,
        "false_positive_rate": false_positive_rate,
        "accuracy": accuracy_score,
    },
    y_true=y_test,
    y_pred=y_pred,
    sensitive_features=sensitive_features,
)

# Disparity ratio (min group / max group, closer to 1 = more fair)
disparity = metric_frame.ratio()
```

### Mitigation Strategies

**Pre-Processing** (modify training data)
- Resampling: balance representation across groups
- Reweighting: assign higher weights to underrepresented groups
- Feature transformation: remove proxy variables

**In-Processing** (modify training algorithm)
- Adversarial debiasing: adversary tries to predict protected attribute
- Constrained optimization: add fairness constraints to loss function
- Exponentiated gradient: Lagrangian approach to fairness constraints

**Post-Processing** (modify predictions)
- Threshold adjustment: different decision thresholds per group
- Calibration: ensure calibrated probabilities across groups
- Reject option: abstain on uncertain predictions near boundary

---

## Ethics Framework

### Ethical AI Principles

1. **Beneficence**: AI should benefit people and society
2. **Non-maleficence**: AI should not cause harm
3. **Autonomy**: respect human agency and decision-making
4. **Justice**: fair distribution of benefits and burdens
5. **Transparency**: explainable and auditable systems
6. **Accountability**: clear responsibility for AI decisions

### AI Impact Assessment

```
Assessment dimensions:
  1. Who is affected by this model's decisions?
  2. What happens when the model is wrong? (cost of errors)
  3. Are there protected groups that could be disparately impacted?
  4. Is there a feedback loop that could amplify bias?
  5. Can affected individuals contest or appeal decisions?
  6. Is there human oversight for high-stakes decisions?
  7. What is the plan for monitoring and remediation?
```

---

## Production Checklist

- [ ] Privacy regulation compliance mapped (GDPR/CCPA articles)
- [ ] PII detected and classified across all data assets
- [ ] Anonymization strategy implemented for analytical datasets
- [ ] Differential privacy applied where required
- [ ] Fairness metrics computed for all ML models with protected attributes
- [ ] Bias mitigation strategy selected and implemented
- [ ] AI impact assessment completed for high-stakes models
- [ ] Data subject rights workflow operational (access, delete, correct)
- [ ] Privacy-by-design principles embedded in data architecture
- [ ] Annual privacy and ethics review scheduled
