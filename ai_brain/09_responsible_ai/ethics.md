# AI Ethics: Fairness, Bias, Transparency, and Impact Assessment

## Overview

AI ethics is the systematic practice of identifying, measuring, and mitigating the ways AI systems can cause harm to individuals and communities. Unlike AI safety (which focuses on preventing direct harms from model outputs), AI ethics addresses the structural and systemic impacts of AI deployment: who benefits, who is harmed, whose perspectives are represented, and how power dynamics shift when decisions are automated. This module covers fairness metrics, bias detection and mitigation, transparency mechanisms, explainability approaches, and impact assessment frameworks.

---

## 1. Fairness in AI Systems

### 1.1 Defining Fairness

Fairness in AI is not a single concept but a family of related but sometimes incompatible definitions. The choice of fairness definition is an ethical decision that should involve stakeholders, not just engineers.

**Demographic Parity (Statistical Parity)**: The model's positive prediction rate is equal across demographic groups. Example: A hiring model recommends candidates at the same rate across genders.

**Equalized Odds**: The model's true positive rate and false positive rate are equal across demographic groups. Example: A medical diagnosis model has the same sensitivity and specificity for all racial groups.

**Predictive Parity**: The model's precision is equal across groups. Among those the model labels positive, the same fraction are truly positive across groups.

**Individual Fairness**: Similar individuals receive similar predictions. Requires defining a similarity metric over individuals.

**Counterfactual Fairness**: Changing a protected attribute (race, gender) while keeping everything else equal would not change the prediction.

### 1.2 Impossibility Theorem

Chouldechova (2017) and Kleinberg et al. (2016) proved that when base rates differ between groups (which they often do in real-world data), it is mathematically impossible to simultaneously satisfy demographic parity, equalized odds, and predictive parity. This means fairness involves explicit tradeoff decisions, not purely technical solutions.

### 1.3 Fairness Metrics Implementation

| Metric | Formula | When to Prioritize |
|--------|---------|-------------------|
| Demographic Parity | P(Y=1\|G=a) = P(Y=1\|G=b) | When equal representation matters most |
| Equal Opportunity | P(Y=1\|Y*=1,G=a) = P(Y=1\|Y*=1,G=b) | When false negatives are costly |
| Predictive Equality | P(Y=1\|Y*=0,G=a) = P(Y=1\|Y*=0,G=b) | When false positives are costly |
| Calibration | P(Y*=1\|Y=s,G=a) = P(Y*=1\|Y=s,G=b) for all s | When confidence scores drive decisions |

---

## 2. Bias Detection

### 2.1 Sources of Bias in AI Systems

**Training Data Bias**: The data reflects historical patterns of discrimination. A model trained on historical hiring data will learn existing biases against underrepresented groups.

**Representation Bias**: Some groups are underrepresented in training data, leading to worse performance for those groups. Medical AI trained mostly on data from one demographic performs worse on others.

**Measurement Bias**: The features used as inputs or the labels used for training are measured differently across groups. Credit scores may reflect systemic economic disparities rather than individual creditworthiness.

**Aggregation Bias**: A single model is applied to groups with different underlying distributions. A clinical model trained on aggregate data may not account for how symptoms manifest differently across populations.

**Evaluation Bias**: The evaluation dataset or metrics do not capture performance differences across groups. A model may appear accurate overall while performing poorly on minority groups.

### 2.2 Bias Auditing Process

**Step 1 -- Define Protected Attributes**: Identify demographic dimensions relevant to the application (race, gender, age, disability, socioeconomic status, geography).

**Step 2 -- Stratified Evaluation**: Evaluate model performance separately for each protected group. Compare metrics across groups.

**Step 3 -- Intersectional Analysis**: Evaluate at the intersection of multiple attributes (e.g., Black women, elderly immigrants). Bias may be invisible at the single-attribute level but significant at intersections.

**Step 4 -- Disparity Quantification**: Measure the magnitude of performance differences using disparity ratios:
```
Disparity Ratio = metric(disadvantaged group) / metric(advantaged group)
```
A ratio below 0.8 (the "four-fifths rule" from employment law) is a common threshold for actionable disparity.

**Step 5 -- Root Cause Analysis**: For each significant disparity, trace back to the source:
- Is the disparity in the data (representation, labeling)?
- Is the disparity in the model (feature sensitivity, decision boundary)?
- Is the disparity in the deployment context (different usage patterns)?

### 2.3 Bias Detection for LLMs

LLMs require specialized bias testing approaches:

**Stereotype Testing**: Present the model with prompts that could trigger stereotypical associations and evaluate whether outputs reflect stereotypes.

**Name Substitution Testing**: Replace names associated with different demographics in otherwise identical prompts. Compare outputs for systematic differences.

**Sentiment Analysis Testing**: Generate descriptions of people from different groups and analyze sentiment. Significant sentiment differences indicate bias.

**Recommendation Bias**: Test whether the model provides different quality advice, opportunities, or resources to different demographic groups.

---

## 3. Bias Mitigation

### 3.1 Pre-Processing Mitigation

Modify the training data to reduce bias before training:
- **Resampling**: Oversample underrepresented groups or undersample overrepresented groups
- **Reweighting**: Assign higher weights to examples from underrepresented groups
- **Data Augmentation**: Generate additional examples for underrepresented groups
- **Label Correction**: Identify and correct labels that reflect historical bias

### 3.2 In-Processing Mitigation

Modify the training process to incorporate fairness constraints:
- **Adversarial Debiasing**: Train an adversary to predict the protected attribute from model representations. Penalize the main model when the adversary succeeds.
- **Fairness Constraints**: Add fairness metrics as regularization terms to the loss function.
- **Fair Representation Learning**: Learn representations that are informative for the task but uninformative about protected attributes.

### 3.3 Post-Processing Mitigation

Adjust model outputs to achieve fairness criteria:
- **Threshold Adjustment**: Use different decision thresholds for different groups to equalize a fairness metric.
- **Output Calibration**: Adjust confidence scores to be equally calibrated across groups.
- **Reject Option**: Abstain from decisions in regions where bias is highest, routing to human review.

### 3.4 Prompt-Based Mitigation for LLMs

For deployed LLMs where retraining is not possible:
- Include explicit fairness instructions in system prompts
- Provide diverse examples in few-shot prompts
- Instruct the model to consider multiple perspectives
- Implement output screening for biased content

---

## 4. Transparency

### 4.1 Transparency Levels

**Model Transparency**: Document what the model is, how it was trained, and what its capabilities and limitations are (model cards).

**Decision Transparency**: For each decision, explain what inputs influenced it and how.

**Data Transparency**: Document what data was used for training, including its sources, collection methods, and known limitations.

**Process Transparency**: Document the development process, including design decisions, evaluation results, and stakeholder consultations.

### 4.2 Transparency Mechanisms

**Model Cards**: Standardized documentation of model characteristics, intended use, performance, and limitations. (See Templates/model_card_template.md)

**Datasheets for Datasets**: Standardized documentation of dataset characteristics, collection methods, and recommended uses.

**Decision Logs**: Automated logging of model decisions with associated inputs, confidence scores, and feature attributions for audit purposes.

---

## 5. Explainability

### 5.1 Explainability Approaches

**Feature Attribution**: Which input features most influenced the output? Methods: SHAP, LIME, attention visualization.

**Counterfactual Explanations**: "The prediction would change if feature X were changed to Y." Intuitive for end users.

**Example-Based Explanations**: "This case is similar to these historical cases that had outcome Y." Leverages human pattern recognition.

**Natural Language Explanations**: The model generates a human-readable explanation of its reasoning. Most accessible but requires verification that explanations are faithful to actual reasoning.

### 5.2 Explanation Quality Criteria

| Criterion | Description |
|-----------|-------------|
| Faithfulness | The explanation accurately reflects the model's actual reasoning |
| Completeness | The explanation covers all significant factors |
| Comprehensibility | The target audience can understand the explanation |
| Actionability | The explanation enables the user to take appropriate action |
| Stability | Similar inputs produce similar explanations |

---

## 6. AI Impact Assessment

### 6.1 Framework

Before deploying an AI system, conduct a structured impact assessment:

**Stakeholder Identification**: Who is affected by this system? Include direct users, subjects of decisions, downstream consumers, and communities.

**Benefit Analysis**: What are the intended benefits and for whom? Are benefits distributed equitably?

**Harm Analysis**: What harms could this system cause? Consider:
- Individual harms (incorrect decisions, privacy violations)
- Group harms (discriminatory outcomes, exclusion)
- Societal harms (job displacement, power concentration, surveillance)
- Environmental harms (compute energy consumption)

**Risk Assessment**: For each potential harm, assess:
- Likelihood (how probable is the harm)
- Severity (how serious is the harm if it occurs)
- Reversibility (can the harm be undone)
- Scale (how many people are affected)

**Mitigation Planning**: For each significant risk:
- Technical mitigations (bias correction, safety filters)
- Process mitigations (human oversight, appeals processes)
- Policy mitigations (usage restrictions, monitoring requirements)

### 6.2 Ongoing Monitoring

Impact assessment is not a one-time activity. Implement continuous monitoring:
- Track fairness metrics over time for drift
- Monitor user complaints and appeals for patterns
- Conduct periodic re-assessments as the system evolves
- Engage affected communities for feedback

---

## 7. Ethical Decision-Making Framework

### 7.1 When Ethical Dilemmas Arise

When facing an ethical dilemma in AI development:

1. **Identify Stakeholders**: Who is affected and how?
2. **Articulate Values**: What values are in tension?
3. **Consider Alternatives**: What options exist and their tradeoffs?
4. **Apply Principles**: Use established ethical frameworks (beneficence, non-maleficence, autonomy, justice)
5. **Seek Diverse Input**: Consult stakeholders, ethicists, and affected communities
6. **Document Decision**: Record the decision, reasoning, and dissenting views
7. **Monitor Outcomes**: Track the real-world impact of the decision

---

## 8. Key References

- Chouldechova (2017) -- "Fair Prediction with Disparate Impact"
- Kleinberg et al. (2016) -- "Inherent Trade-Offs in the Fair Determination of Risk Scores"
- Mitchell et al. (2019) -- "Model Cards for Model Reporting"
- Gebru et al. (2021) -- "Datasheets for Datasets"
- Selbst et al. (2019) -- "Fairness and Abstraction in Sociotechnical Systems"

---

*This module covers AI ethics. See `governance.md` for organizational AI governance frameworks and policy compliance.*
