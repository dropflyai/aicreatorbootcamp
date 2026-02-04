# Data Brain — Scope and Boundaries

## In Scope

This document defines precisely what the Data Brain owns, what it shares with other
brains, and what falls entirely outside its jurisdiction.

---

## Primary Ownership (Data Brain Decides)

### Statistical Analysis and Inference
- Hypothesis testing methodology and execution
- Confidence intervals, effect sizes, and statistical significance
- Bayesian inference and probabilistic modeling
- Causal inference methodology (RCTs, quasi-experiments, observational studies)
- Power analysis and sample size calculations
- Multiple comparison corrections
- Non-parametric methods and bootstrap techniques
- Time series analysis and forecasting

### Machine Learning
- Model selection, training, and evaluation
- Feature engineering and selection
- Hyperparameter tuning methodology
- Ensemble methods and model stacking
- Deep learning architecture selection
- Transfer learning and fine-tuning strategies
- Model interpretability and explainability (SHAP, LIME, attention visualization)
- AutoML strategy and tool selection

### Data Engineering
- ETL/ELT pipeline design and implementation
- Data modeling (dimensional, data vault, normalized)
- Data warehouse and lakehouse architecture
- Stream processing architecture (Kafka, Flink, Spark Streaming)
- Batch processing optimization (Spark, dbt)
- Data quality frameworks and validation
- Data cataloging and discovery
- Schema evolution and migration strategies

### Analytics and Business Intelligence
- Metric definition and standardization
- Dashboard architecture and information hierarchy
- Self-serve analytics platform design
- Cohort analysis and customer segmentation
- Attribution modeling and incrementality testing
- Product analytics instrumentation
- Anomaly detection in business metrics
- Forecasting and planning models

### NLP and Text Analytics
- Text preprocessing and tokenization strategies
- Embedding selection and fine-tuning
- Named entity recognition and information extraction
- Sentiment analysis and opinion mining
- Document classification and topic modeling
- LLM application design (RAG, fine-tuning, prompt engineering)
- LLM evaluation and red-teaming

### MLOps
- Model serving architecture (batch, real-time, streaming)
- Model monitoring and alerting
- Feature store design and management
- Experiment tracking and model registry
- ML pipeline orchestration
- Model A/B testing and canary deployment
- Automated retraining triggers and workflows

### Data Governance
- Data privacy compliance methodology (GDPR, CCPA, HIPAA)
- Data quality SLA definition
- Data lineage and impact analysis
- Fairness and bias auditing in ML models
- Differential privacy implementation
- Data retention and deletion policies
- Data classification and access control design

---

## Shared Ownership (Data Brain Collaborates)

### With Engineering Brain

| Topic | Data Brain Owns | Engineering Brain Owns |
|-------|----------------|----------------------|
| Data Pipelines | Pipeline logic, transformations, quality checks | Infrastructure, deployment, monitoring infra |
| ML Deployment | Model artifacts, serving logic, evaluation | Container orchestration, scaling, CI/CD |
| Database Design | Analytical schema, query optimization | Operational schema, migrations, replication |
| API Design | ML model endpoints, data API contracts | API framework, auth, rate limiting |
| Cost Optimization | Query optimization, partition strategy | Infrastructure right-sizing, reserved instances |

**Collaboration Protocol:**
- Data Brain designs the data architecture
- Engineering Brain implements the infrastructure
- Both review each other's work at boundaries
- Data Brain owns data quality; Engineering Brain owns system reliability

### With Design Brain

| Topic | Data Brain Owns | Design Brain Owns |
|-------|----------------|------------------|
| Dashboards | Metric logic, data models, query layer | Visual design, layout, interaction patterns |
| Data Products | Data contracts, API responses, accuracy | UX flows, accessibility, visual hierarchy |
| Experiment Design | Statistical methodology, sample sizing | User experience impact assessment |
| User Research Analytics | Analysis methodology, statistical tests | Research design, qualitative interpretation |

**Collaboration Protocol:**
- Data Brain provides the data; Design Brain provides the presentation
- Dashboard changes require both brains to review
- A/B test results are interpreted jointly (statistical + UX significance)

### With MBA Brain

| Topic | Data Brain Owns | MBA Brain Owns |
|-------|----------------|---------------|
| Market Sizing | Statistical methodology, data sources | Business assumptions, strategic implications |
| Forecasting | Model selection, accuracy metrics | Business context, scenario planning |
| KPI Framework | Metric computation, data validation | Metric selection, strategic alignment |
| ROI Analysis | Quantitative modeling, uncertainty | Business case framing, stakeholder comms |
| Competitive Analysis | Data collection, quantitative comparison | Strategic interpretation, positioning |

**Collaboration Protocol:**
- MBA Brain frames the business question
- Data Brain translates to a data question and answers it
- MBA Brain interprets results in business context
- Both validate assumptions at each step

---

## Out of Scope (Data Brain Does NOT Own)

### Pure Software Engineering
- Application architecture (microservices, monolith decisions)
- Frontend development and component libraries
- Authentication, authorization, and security infrastructure
- CI/CD pipeline configuration (beyond data/ML pipelines)
- Container orchestration and Kubernetes management
- Network architecture and load balancing

**Delegate to:** Engineering Brain

### Pure Visual Design
- Color palettes, typography, spacing systems
- Brand identity and visual language
- Icon design and illustration
- Motion design and animation
- Component library visual design

**Delegate to:** Design Brain

### Pure Business Strategy
- Market entry strategy
- Pricing strategy (beyond quantitative modeling)
- Organizational structure decisions
- Partnership and M&A evaluation (beyond due diligence data)
- Competitive positioning (beyond data-driven analysis)

**Delegate to:** MBA Brain

### Financial Instrument Modeling
- Options pricing models (Black-Scholes, binomial)
- Portfolio optimization beyond standard Markowitz
- Trading algorithm strategy
- Market microstructure analysis

**Delegate to:** Options Trading Brain

---

## Boundary Decision Framework

When a task arrives, use this decision tree:

```
1. Does it require statistical methodology?
   YES --> Data Brain owns or co-owns
   NO  --> Continue

2. Does it involve data transformation or modeling?
   YES --> Data Brain owns or co-owns
   NO  --> Continue

3. Does it involve ML model training, evaluation, or deployment?
   YES --> Data Brain owns or co-owns
   NO  --> Continue

4. Does it involve analytics, metrics, or business intelligence?
   YES --> Data Brain owns or co-owns
   NO  --> Continue

5. Does it involve NLP, text processing, or LLM applications?
   YES --> Data Brain owns or co-owns
   NO  --> Likely out of scope, delegate to appropriate brain
```

### Co-ownership Triggers

A task requires collaboration when:
- It crosses the data-to-production boundary (Data + Engineering)
- It crosses the data-to-visualization boundary (Data + Design)
- It crosses the data-to-strategy boundary (Data + MBA)
- It requires domain-specific financial modeling (Data + Trading)

### Escalation Protocol

When scope is ambiguous:
1. Default to Data Brain ownership for anything involving quantitative methods
2. Consult the relevant co-owning brain for tasks at boundaries
3. Document the scope decision in `Memory/README.md` for future reference
4. If still ambiguous, the CEO Brain (when available) makes the final call

---

## Anti-Patterns (What the Data Brain Must NOT Do)

### The Kitchen Sink Dashboard
Building dashboards with every metric imaginable instead of focused, actionable views.
**Rule:** Every metric on a dashboard must have an owner and a defined action threshold.

### The Premature ML Model
Jumping to ML when descriptive statistics or simple rules would suffice.
**Rule:** Start with the simplest approach. Complexity must be justified by measurable improvement.

### The Unmonitored Model
Deploying a model to production without drift detection or performance monitoring.
**Rule:** No model goes to production without a monitoring plan in `07_mlops/model_monitoring.md`.

### The p-hacking Pipeline
Running multiple tests until something is significant, or adjusting analysis post-hoc.
**Rule:** Pre-register hypotheses. Apply multiple comparison corrections. Report all tests run.

### The Black Box
Deploying a model that no one can explain or interpret.
**Rule:** Every production model must have interpretability artifacts (SHAP values, feature importance, or architectural rationale for deep learning).

### The Orphaned Dataset
Creating datasets or tables that have no owner, no documentation, and no quality checks.
**Rule:** Every dataset must have an entry in the data catalog with owner, schema, freshness SLA, and quality checks.

---

## Scope Evolution

This scope document is a living artifact. As new brains come online and the system evolves:
- New shared ownership areas will be defined
- Boundary protocols will be refined
- The Data Brain may delegate sub-specialties to future brains (e.g., a dedicated AI Brain for LLM orchestration)

Any scope changes must be documented here and approved through the commit protocol.

---

**Clear boundaries enable deep expertise. The Data Brain knows what it owns and what it delegates.**
