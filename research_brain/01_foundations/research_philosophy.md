# Research Philosophy

Epistemological foundations, bias taxonomy, evidence evaluation, and critical reasoning for rigorous research practice.

---

## 1. Epistemology of Market Research

### 1.1 What Constitutes Knowledge in Research

Market research operates at the intersection of social science and business decision-making. Unlike pure science seeking universal truth, market research seeks actionable knowledge sufficient to reduce decision uncertainty below an acceptable threshold. This pragmatic epistemology acknowledges that perfect knowledge is unattainable and unnecessary; decision-useful knowledge is the goal.

Three epistemological positions shape how we generate and evaluate research knowledge:

**Foundationalism:** Knowledge rests on certain, indubitable foundations. In research terms, this manifests as belief in "objective data" that speaks for itself. While useful for disciplining inquiry, pure foundationalism is naive in social research where all data is theory-laden.

**Coherentism:** Knowledge claims are justified by their coherence with other accepted beliefs. In research, findings gain credibility when they align with established theory, prior research, and multiple data sources. This supports triangulation but risks groupthink.

**Fallibilism:** All knowledge claims are provisional and subject to revision. This is the most appropriate stance for applied research. Every finding is a best current estimate, not eternal truth. Research conclusions carry expiration dates.

### 1.2 The Knowledge Hierarchy for Decisions

```
                    ┌────────────┐
                    │  WISDOM    │  When NOT to act on data
                    ├────────────┤
                    │ KNOWLEDGE  │  Validated, contextualized findings
                    ├────────────┤
                    │INFORMATION │  Organized, analyzed data
                    ├────────────┤
                    │   DATA     │  Raw observations and measurements
                    └────────────┘
```

Most research stops at information. True value comes from synthesizing information into knowledge (what the data means for our specific context) and wisdom (recognizing when the data should not drive the decision).

---

## 2. Evidence Hierarchy

Not all evidence is created equal. The evidence hierarchy ranks sources by their resistance to systematic error.

### 2.1 The Research Evidence Pyramid

**Level 1 (Strongest): Systematic reviews and meta-analyses**
Synthesize all available evidence on a question. Reduce bias through comprehensive search, quality assessment, and statistical combination. In business: systematic review of all win/loss analyses, meta-analysis of multiple A/B tests.

**Level 2: Randomized controlled experiments**
Random assignment eliminates selection bias. Establishes causation. In business: properly designed A/B tests, randomized pricing experiments, controlled feature rollouts.

**Level 3: Quasi-experimental designs**
Comparison groups without randomization. Difference-in-differences, regression discontinuity, propensity score matching. In business: comparing cohorts before/after a change, geographic experiments.

**Level 4: Observational studies (cohort, case-control)**
Observe naturally occurring variation without intervention. Risk of confounding. In business: analyzing user behavior data, retention cohort analysis, NPS tracking.

**Level 5: Cross-sectional surveys**
Single point-in-time measurement. Cannot establish temporal sequence or causation. In business: market surveys, satisfaction surveys, brand tracking.

**Level 6: Case studies and qualitative research**
Deep investigation of specific instances. Rich but not generalizable. In business: customer interviews, ethnographic studies, competitive deep-dives.

**Level 7 (Weakest): Expert opinion and anecdote**
Informed judgment without systematic evidence. In business: founder intuition, sales anecdotes, advisory board input.

### 2.2 Practical Application

The hierarchy does not mean lower levels are useless. Often, higher-level evidence is unavailable, impractical, or unnecessary. The hierarchy guides which evidence to weight most heavily when multiple sources conflict.

**Decision rule:** Use the highest level of evidence that is feasible and proportionate to the decision stakes. A $10M market entry warrants Level 1-3. A blog post topic can rely on Level 6-7.

---

## 3. Systematic Bias Taxonomy

Biases are systematic deviations from accurate judgment. Understanding biases is prerequisite to controlling them.

### 3.1 Selection Bias

Occurs when the sample is systematically different from the population of interest.

**Survivorship bias:** Studying only successes (existing customers, live products) and missing failures. The startup graveyard is invisible, making success rates appear higher than reality.

**Self-selection bias:** Participants who volunteer differ from those who do not. Survey respondents are systematically more engaged, more opinionated, or more extreme than non-respondents.

**Healthy user bias:** Users who adopt a feature may be inherently more engaged, making the feature appear more effective than it is.

**Mitigation:** Random sampling, propensity score matching, intent-to-treat analysis, studying churned users alongside active ones.

### 3.2 Confirmation Bias

The tendency to seek, interpret, and remember information that confirms pre-existing beliefs. The most pervasive and dangerous bias in research.

**Manifestations:** Designing research to prove a hypothesis rather than test it. Selectively reporting supportive findings. Interpreting ambiguous data in the desired direction. Remembering confirming evidence more readily.

**Mitigation:** Pre-registration of hypotheses and analysis plans. Devil's advocate analysis. Blinded analysis (analysts do not know the hypothesis). Actively seeking disconfirming evidence. Red team reviews.

### 3.3 Survivorship Bias

Focusing on entities that passed a selection process and overlooking those that did not. When analyzing successful companies for patterns, we miss the failed companies that exhibited the same patterns. Success signals extracted from survivors are often noise.

**Mitigation:** Include failures in the analysis. When studying successful products, also study failed products with similar characteristics. Abraham Wald's WWII bomber analysis is the canonical illustration.

### 3.4 Anchoring Bias

Over-relying on the first piece of information encountered when making estimates. If initial market size estimates are inflated, all subsequent analysis will orbit that anchor even after correction.

**Mitigation:** Generate estimates independently before reviewing external data. Use multiple anchors. Consider the opposite. Formal de-anchoring exercises.

### 3.5 Social Desirability Bias

Respondents answer in ways they believe are socially acceptable rather than truthfully. Particularly problematic in interview and survey research on sensitive topics (willingness to pay, ethical behavior, product criticism).

**Mitigation:** Indirect questioning, projective techniques, behavioral observation instead of self-report, anonymous response collection, bogus pipeline technique, list experiments.

### 3.6 Additional Critical Biases

**Availability heuristic:** Overweighting vivid or recent examples. A single dramatic customer story outweighs statistical evidence in decision-making.

**Bandwagon effect:** Adopting beliefs because others hold them. "Everyone says AI is the future" becomes uncritical consensus.

**Dunning-Kruger effect:** Overestimating competence in domains where one has limited expertise. Executives confident in their "gut feel" for markets they do not deeply understand.

**Recency bias:** Overweighting recent data and underweighting historical patterns. Last quarter's metrics dominate strategic thinking.

**Sunk cost fallacy:** Continuing investment because of past investment rather than future value. "We already spent $2M on this research direction" prevents pivoting.

---

## 4. Triangulation

Triangulation uses multiple methods, data sources, or perspectives to converge on a finding, increasing credibility.

### 4.1 Types of Triangulation

**Data triangulation:** Same question, different data sources (interview data + survey data + analytics data).

**Method triangulation:** Same question, different methods (qualitative interviews + quantitative survey + behavioral observation).

**Investigator triangulation:** Multiple researchers analyze the same data independently, then compare interpretations.

**Theory triangulation:** Same data interpreted through multiple theoretical lenses to reveal different dimensions.

### 4.2 Convergence and Divergence

When triangulated findings converge, confidence increases. When they diverge, the divergence is itself informative -- it reveals complexity, context-dependence, or measurement problems that demand further investigation. Divergence is not failure; it is discovery.

### 4.3 Practical Triangulation Protocol

1. Identify the core question.
2. Select at least two independent methods or data sources.
3. Analyze each independently before comparing.
4. Document convergence (mutual confirmation) and divergence (contradictions).
5. Investigate divergence to understand its source.
6. Synthesize a conclusion that accounts for all evidence.

---

## 5. Replication

### 5.1 Why Replication Matters

A single study is an observation, not a conclusion. The replication crisis in psychology and other social sciences demonstrates that many published findings do not hold when repeated. Business research faces the same risk but rarely tests it.

### 5.2 Types of Replication

**Direct replication:** Repeat the exact study. Same methodology, same population, different sample. Tests reliability.

**Conceptual replication:** Test the same hypothesis using different methods or populations. Tests generalizability.

**Systematic replication:** Vary conditions deliberately to map boundary conditions of a finding.

### 5.3 When to Replicate

- Before making high-stakes decisions based on a single study.
- When findings are surprising or counterintuitive.
- When initial sample was small or non-representative.
- When significant time has passed since the original research.

---

## 6. Critical Thinking for Researchers

### 6.1 The CRAAP Test for Sources

- **Currency:** When was the information published? Is it still relevant?
- **Relevance:** Does it address the research question? Who is the intended audience?
- **Authority:** Who created it? What are their credentials and affiliations?
- **Accuracy:** Is it supported by evidence? Has it been peer-reviewed?
- **Purpose:** Why does the source exist? Is there bias or conflict of interest?

### 6.2 Logical Fallacies in Research Reasoning

**Post hoc ergo propter hoc:** "We launched the feature, then growth increased, therefore the feature caused growth." Temporal sequence does not equal causation.

**Ecological fallacy:** Inferring individual behavior from group-level data. "Countries with higher GDP have higher satisfaction" does not mean rich individuals are more satisfied.

**Base rate neglect:** Ignoring the underlying frequency of an event. "95% of users who churned visited the pricing page" is meaningless without knowing what percentage of all users visit the pricing page.

**Texas sharpshooter:** Finding patterns in random data by drawing the target after seeing where the bullets landed. Running dozens of segment analyses until one shows a significant difference.

### 6.3 Argument Mapping

Structure research arguments explicitly:

```
CLAIM: [What we believe]
  EVIDENCE FOR: [Supporting data, ordered by strength]
  EVIDENCE AGAINST: [Contradicting data, ordered by strength]
  ASSUMPTIONS: [What must be true for the claim to hold]
  LIMITATIONS: [What could invalidate the claim]
  CONFIDENCE: [High / Medium / Low, with justification]
```

---

## 7. When Research Is Unnecessary

Not every decision requires research. Knowing when to skip research is itself a form of research wisdom.

### 7.1 Skip Research When

- **The cost of being wrong is low and reversible.** Ship the feature, measure, iterate.
- **The evidence is already overwhelming.** Do not research well-established facts.
- **The decision is already made and cannot change.** Research that cannot influence decisions wastes resources.
- **Speed is the primary constraint.** In fast-moving competitive situations, directionally-correct action beats perfectly-informed paralysis.
- **The question is philosophical, not empirical.** "Should we pursue this mission?" is a values question, not a research question.

### 7.2 Use Research When

- **The cost of being wrong is high and irreversible.** Market entry, pricing architecture, major pivots.
- **Internal opinions are divided.** Research resolves disagreements with evidence rather than authority.
- **The target user is unfamiliar.** When building for a segment you do not belong to.
- **Patterns have changed.** When historical data may not predict future behavior.
- **Regulatory or ethical stakes exist.** When the consequences of error extend beyond business metrics.

### 7.3 The Research Decision Matrix

| Decision Impact | Reversibility | Research Need |
|----------------|---------------|---------------|
| High | Low (irreversible) | Mandatory research |
| High | High (reversible) | Targeted research |
| Low | Low (irreversible) | Light research |
| Low | High (reversible) | Skip research, measure outcomes |

---

## 8. Building a Research-Informed Mindset

### 8.1 Epistemic Humility

Accept that your current understanding is incomplete and potentially wrong. Research is not about proving you are right; it is about becoming less wrong over time. The most dangerous researcher is one who is certain.

### 8.2 Bayesian Thinking

Update beliefs incrementally as new evidence arrives. Every study shifts the probability distribution, but rarely proves or disproves with certainty. Prior beliefs (base rates) matter. Extraordinary claims require extraordinary evidence.

### 8.3 Steel-Manning

Before dismissing opposing viewpoints, construct the strongest possible version of the argument. This practice improves research quality by ensuring alternative explanations receive fair evaluation.

---

## 9. Philosophical Foundations Checklist

- [ ] Epistemological stance is explicit (what counts as knowledge for this study)
- [ ] Evidence hierarchy is applied (strongest feasible evidence for the decision)
- [ ] Relevant biases are identified and mitigated
- [ ] Triangulation plan is in place (multiple methods or sources)
- [ ] Replication needs are assessed
- [ ] Critical thinking tools are applied to sources and reasoning
- [ ] Research necessity is evaluated (is this research warranted?)
- [ ] Findings are presented with appropriate uncertainty

---

**This document establishes the philosophical and epistemological foundation for all research brain operations.**
