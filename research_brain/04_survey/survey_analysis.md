# Survey Analysis

Statistical methods, analytical frameworks, and reporting standards for extracting rigorous insights from survey data.

---

## 1. Descriptive Statistics

### 1.1 Measures of Central Tendency

**Mean:** Arithmetic average. Appropriate for interval and ratio data. Sensitive to outliers. For Likert scales, the mean is the most common summary statistic despite ongoing debate about whether ordinal data warrants mean calculation. Practically, means on 5+ point scales behave sufficiently like interval data for applied research.

**Median:** Middle value when data is ordered. Robust to outliers. Preferred for skewed distributions and truly ordinal data. Report median for income, company size, and other right-skewed variables.

**Mode:** Most frequent value. Useful for categorical data and identifying the most common response. Multi-modal distributions suggest distinct subgroups.

### 1.2 Measures of Dispersion

**Standard deviation:** Average distance from the mean. Report alongside every mean. A mean of 4.2 with SD=0.5 is a fundamentally different finding than 4.2 with SD=1.8.

**Interquartile range (IQR):** Range between 25th and 75th percentiles. Robust to outliers. Report alongside median.

**Range:** Minimum to maximum. Quick context but misleading with outliers.

### 1.3 Frequency Distributions

For categorical and ordinal data, report absolute frequencies and percentages. Visualize with bar charts (categorical) or histograms (continuous). Always show the actual distribution, not just summary statistics. A bimodal distribution of satisfaction scores (many 1s and many 5s) has a mean of 3.0, which completely misrepresents the data.

### 1.4 Visualization Standards

- Bar charts for categorical comparisons.
- Stacked bars for Likert scale distributions (showing full response distribution).
- Box plots for comparing distributions across groups.
- Histograms for continuous variable distributions.
- Avoid pie charts (humans poorly perceive area differences; use bar charts instead).
- Always include sample sizes (n) on every chart.

---

## 2. Cross-Tabulation

### 2.1 Fundamentals

Cross-tabulation (contingency tables) examines the relationship between two categorical variables by displaying the joint frequency distribution.

**Example:**
| | Satisfied | Neutral | Dissatisfied | Total |
|---|----------|---------|-------------|-------|
| Enterprise | 120 (60%) | 50 (25%) | 30 (15%) | 200 |
| SMB | 80 (40%) | 60 (30%) | 60 (30%) | 200 |
| Total | 200 | 110 | 90 | 400 |

**Interpretation:** Enterprise customers show higher satisfaction (60%) than SMB customers (40%). But is this difference statistically significant or due to sampling variation?

### 2.2 Row vs Column Percentages

The direction of percentages depends on the research question:
- **Row percentages** (shown above): How does satisfaction distribute within each segment? Use when the independent variable is in rows.
- **Column percentages:** Within each satisfaction level, what proportion comes from each segment? Use for profiling subgroups.
- **Total percentages:** Each cell as a proportion of the grand total. Rarely useful.

**Rule:** Percentage in the direction of the independent variable. If you are asking "Does segment affect satisfaction?" segment is independent; satisfaction is dependent. Percentage across the dependent variable (across columns).

---

## 3. Chi-Square Testing

### 3.1 Chi-Square Test of Independence

Tests whether two categorical variables are statistically independent. The null hypothesis is that there is no association between the variables.

**Formula:** Chi-square = Sum of [(Observed - Expected)^2 / Expected] across all cells.

**Expected frequency:** (Row total x Column total) / Grand total.

**Assumptions:**
- Expected frequency in each cell >= 5 (use Fisher's exact test if violated).
- Observations are independent (no repeated measures).
- Mutually exclusive categories.

**Interpretation:** If p < 0.05, reject the null hypothesis and conclude that the variables are associated. But chi-square only tells you that an association exists, not its strength or direction. For effect size, use Cramer's V (ranges 0-1; 0.1 small, 0.3 medium, 0.5 large).

### 3.2 Post-Hoc Analysis

When chi-square is significant for a table larger than 2x2, identify which cells drive the significance using standardized residuals. A standardized residual > |2| indicates that cell contributes meaningfully to the significant result. Alternatively, conduct pairwise comparisons with Bonferroni correction.

---

## 4. Factor Analysis

### 4.1 Exploratory Factor Analysis (EFA)

Used to discover the underlying structure in a set of survey items. When you have 20 satisfaction questions, factor analysis reveals whether they cluster into 3-5 underlying dimensions (e.g., ease of use, reliability, support quality).

**Process:**
1. **Suitability assessment:** Kaiser-Meyer-Olkin (KMO) measure > 0.6 (preferably > 0.8). Bartlett's test of sphericity significant.
2. **Factor extraction:** Principal axis factoring or maximum likelihood.
3. **Number of factors:** Eigenvalue > 1 rule (Kaiser criterion), scree plot (elbow method), parallel analysis (most rigorous).
4. **Rotation:** Varimax (orthogonal, uncorrelated factors) or Promax (oblique, correlated factors). Use oblique unless you have theoretical reason to assume independence.
5. **Interpretation:** Examine factor loadings (> 0.4 is meaningful). Name factors based on the items that load on them.
6. **Reliability:** Compute Cronbach's alpha for each factor. Alpha > 0.7 is acceptable.

### 4.2 Confirmatory Factor Analysis (CFA)

Tests whether a hypothesized factor structure fits the data. Used when you have a theoretical model to validate. Requires structural equation modeling (SEM) software. Fit indices: CFI > 0.95, RMSEA < 0.06, SRMR < 0.08.

---

## 5. Cluster Analysis

### 5.1 Purpose in Survey Research

Cluster analysis groups respondents into segments based on their response patterns. Unlike factor analysis (which groups variables), cluster analysis groups cases (respondents). Used for customer segmentation, persona development, and needs-based market definition.

### 5.2 Methods

**K-means clustering:** Partitions data into K clusters by minimizing within-cluster variance. Fast, scalable, but requires pre-specifying K and assumes spherical clusters. Use elbow method or silhouette analysis to determine optimal K.

**Hierarchical clustering:** Builds a dendrogram (tree) of clusters through successive merging (agglomerative) or splitting (divisive). Does not require pre-specifying K. Better for small samples but computationally expensive for large datasets.

**Latent class analysis (LCA):** Model-based clustering that assigns probabilistic membership. More rigorous than K-means for categorical and mixed data. Uses BIC/AIC for model selection.

### 5.3 Cluster Validation

- **Internal validation:** Silhouette scores, within-cluster sum of squares.
- **Stability validation:** Bootstrap resampling to check cluster consistency.
- **External validation:** Cross-reference clusters with external variables (e.g., do clusters differ in retention rates, purchase behavior?).
- **Interpretability:** Clusters must be nameable and actionable. A statistically optimal solution that produces uninterpretable segments is useless.

---

## 6. Regression on Survey Data

### 6.1 Identifying Drivers

Regression analysis identifies which survey items are the strongest predictors of an outcome (e.g., overall satisfaction, NPS, purchase intent). This reveals the key drivers of customer sentiment.

### 6.2 Ordinary Least Squares (OLS) Regression

For continuous dependent variables (satisfaction on a 7-point scale treated as interval).

**Model:** Overall_Satisfaction = b0 + b1(Ease_of_Use) + b2(Reliability) + b3(Support_Quality) + e

**Interpretation:** Standardized coefficients (beta weights) indicate relative importance. Higher absolute beta = stronger driver. R-squared indicates total variance explained.

**Assumptions:** Linearity, independence, homoscedasticity, normality of residuals, no multicollinearity (check VIF < 5).

### 6.3 Logistic Regression

For binary dependent variables (promoter vs detractor, purchased vs did not purchase).

**Output:** Odds ratios. OR > 1 means the predictor increases the odds of the outcome. OR < 1 means it decreases the odds. Confidence intervals that do not include 1.0 are statistically significant.

### 6.4 Key Driver Analysis (Derived Importance)

Compare stated importance (what respondents say matters) with derived importance (what statistically predicts outcomes). The gap between stated and derived importance reveals hidden drivers that respondents undervalue and hygiene factors that respondents overstate.

**Importance-performance matrix:**
```
                    HIGH IMPORTANCE
                         │
    CONCENTRATE HERE ────┤──── KEEP UP THE GOOD WORK
    (high importance,    │    (high importance,
     low performance)    │     high performance)
                         │
   ─────────────────────┼──────────────────────
                         │
    LOW PRIORITY ────────┤──── POSSIBLE OVERKILL
    (low importance,     │    (low importance,
     low performance)    │     high performance)
                         │
                    LOW IMPORTANCE
```

---

## 7. MaxDiff Analysis

### 7.1 Data Structure

MaxDiff data consists of best/worst choices across sets. Each respondent's data is a series of choice sets with best and worst selections.

### 7.2 Analysis Methods

**Count analysis (simple):** For each item, calculate: Best count - Worst count. Rescale to 0-100. Quick and intuitive but ignores the choice set structure.

**Hierarchical Bayesian (HB) estimation:** The gold standard. Estimates individual-level utility scores using Bayesian methods. Produces interval-scale data that enables segmentation, simulation, and statistical testing. Requires specialized software (Sawtooth, Lighthouse Studio).

### 7.3 Interpretation

Utility scores are relative, not absolute. An item with score 10 is twice as preferred as an item with score 5, but neither score has meaning in isolation. Report as probability of being chosen as best, rescaled utility scores, or preference shares.

---

## 8. Conjoint Analysis

### 8.1 Analysis Methodology

**Part-worth utilities:** For each attribute level, estimate its contribution to overall preference. Positive utilities increase preference; negative utilities decrease it. The range of utilities within an attribute indicates that attribute's importance.

**Attribute importance:** Calculated as the range of part-worths within each attribute divided by the sum of ranges across all attributes. Expressed as a percentage.

### 8.2 Market Simulation

Use conjoint results to simulate market share for hypothetical products. Define product profiles (combinations of attribute levels), and the model predicts preference share. Sensitivity analysis reveals how market share changes as attributes are varied.

### 8.3 Reporting Conjoint Results

1. Attribute importance ranking (which features matter most).
2. Level preferences within each attribute (which options are preferred).
3. Willingness to pay (derived from price attribute utilities).
4. Optimal product configuration (the combination maximizing preference).
5. Market simulation results for strategic scenarios.

---

## 9. Text Analysis for Open-Ended Responses

### 9.1 Manual Coding

Develop a codebook of themes. Code each response to one or more themes. Calculate intercoder reliability (Cohen's kappa > 0.7). Report theme frequencies and representative quotes.

### 9.2 Automated Text Analysis

**Sentiment analysis:** Classify responses as positive, neutral, or negative. Use pre-trained models (VADER, TextBlob) or LLM-based classification.

**Topic modeling:** LDA (Latent Dirichlet Allocation) or BERTopic to discover themes automatically. Requires sufficient volume (100+ responses for stable topics).

**Word frequency and co-occurrence:** Word clouds (limited value), n-gram analysis, keyword in context (KWIC). Useful for initial exploration but not a substitute for thematic coding.

---

## 10. Weighting

### 10.1 When to Weight

Weight survey data when the sample does not match the population on known characteristics. Common weighting variables: company size, industry, geography, tenure, spending level.

### 10.2 Weighting Methods

**Post-stratification:** Adjust weights so that sample proportions match known population proportions on key variables.

**Raking (iterative proportional fitting):** Simultaneously adjust weights to match marginal distributions on multiple variables.

**Design effect:** Weighting increases variance, reducing effective sample size. Report design effect (DEFF) and effective n alongside weighted results.

---

## 11. Margin of Error Calculation

For proportion estimates: MOE = Z * sqrt(p * (1-p) / n)
Where Z = 1.96 for 95% confidence, p = proportion estimate, n = sample size.

For 50% proportion (maximum uncertainty): MOE = 1.96 * sqrt(0.25 / n)
- n = 100: MOE = +/- 9.8%
- n = 400: MOE = +/- 4.9%
- n = 1000: MOE = +/- 3.1%

Always report margin of error for survey findings. It communicates the precision of the estimate and prevents over-interpreting small differences.

---

## 12. Survey Analysis Quality Checklist

- [ ] Descriptive statistics reported with appropriate measures of dispersion
- [ ] Response distributions visualized (not just means)
- [ ] Cross-tabulations include significance tests and effect sizes
- [ ] Factor analysis (if used) reports KMO, extraction method, rotation, and loadings
- [ ] Cluster analysis (if used) reports validation metrics and interpretable profiles
- [ ] Regression assumptions are checked and reported
- [ ] Key driver analysis compares stated and derived importance
- [ ] Open-ended responses are coded with documented intercoder reliability
- [ ] Weighting is applied when sample does not match population
- [ ] Margin of error is reported for all proportion estimates
- [ ] Sample size (n) is reported for every statistic

---

**This document governs survey analysis methodology and reporting standards across all research brain operations.**
