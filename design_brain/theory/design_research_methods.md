# Design Research Methods

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** usability_engineering.md, cognitive_science.md
> **Related Modules:** information_architecture.md, accessibility_science.md

---

## 1. Quantitative UX Research

### 1.1 Statistical Significance Testing

**Null Hypothesis Significance Testing (NHST):**
The dominant framework in quantitative UX research. The process:
1. State the null hypothesis H0 (e.g., "there is no difference between designs A and B")
2. State the alternative hypothesis H1 (e.g., "design A is faster than design B")
3. Collect data and compute a test statistic
4. Calculate the p-value: the probability of observing data at least as extreme as the observed data, assuming H0 is true
5. If p < alpha (typically 0.05), reject H0

**Common Statistical Tests in UX:**

| Test | When to Use | Data Type |
|---|---|---|
| **Independent t-test** | Compare means between two independent groups | Continuous, normally distributed |
| **Paired t-test** | Compare means within subjects (before/after, A vs B) | Continuous, normally distributed |
| **Mann-Whitney U** | Compare two independent groups | Ordinal or non-normal continuous |
| **Wilcoxon Signed-Rank** | Compare paired observations | Ordinal or non-normal continuous |
| **Chi-Square** | Compare proportions/frequencies | Categorical |
| **Fisher's Exact Test** | Compare proportions with small samples | Categorical, small n |
| **ANOVA** | Compare means across 3+ groups | Continuous, normally distributed |
| **Kruskal-Wallis** | Compare 3+ independent groups | Ordinal or non-normal |

### 1.2 Confidence Intervals

**Definition:** A range of values that, with a specified level of confidence (typically 95%), contains the true population parameter.

**Interpretation:** If the study were repeated many times, 95% of the computed 95% confidence intervals would contain the true parameter value. A single CI either contains the true value or it does not -- the 95% refers to the long-run coverage probability of the method.

**For UX Metrics:**
- Task success rate: Wilson score interval (better than Wald interval for proportions, especially near 0 or 1)
- Task time: Log-transform before computing CI (task times are typically positively skewed), or use bootstrap CI
- Likert-scale data: Bootstrap CI or adjusted Wald interval

**Design Application:** Report CIs alongside point estimates. "Task completion improved from 72% [95% CI: 63-80%] to 89% [95% CI: 82-94%]" is more informative than "Task completion improved (p = 0.02)."

### 1.3 Effect Sizes

**Why Effect Sizes Matter:** Statistical significance tells you whether an effect exists; effect size tells you how large it is. With large samples, trivially small differences become statistically significant. With small samples, large and practically important differences may not reach significance.

**Common Effect Size Measures:**

| Measure | Formula | Small | Medium | Large |
|---|---|---|---|---|
| **Cohen's d** | (M1 - M2) / SD_pooled | 0.2 | 0.5 | 0.8 |
| **Pearson's r** | Correlation coefficient | 0.1 | 0.3 | 0.5 |
| **Odds Ratio** | (a*d) / (b*c) | 1.5 | 2.5 | 4.3 |
| **Eta-squared** | SS_effect / SS_total | 0.01 | 0.06 | 0.14 |

**Design Application:** When comparing designs, report effect sizes. "Design B reduced task time by 0.8 SD (Cohen's d = 0.8, a large effect)" gives stakeholders actionable information about the magnitude of improvement.

### 1.4 Bayesian vs. Frequentist Approaches

**Frequentist Approach:**
- P-values and confidence intervals
- Cannot directly state the probability that a hypothesis is true
- Requires predetermined sample sizes and stopping rules
- Conclusion: "The data are unlikely under H0" (indirect)

**Bayesian Approach:**
- Prior beliefs + data = posterior beliefs
- Directly states the probability that a hypothesis is true (given the data and prior)
- Allows sequential analysis (monitoring results as data accumulate without inflating error rates)
- Requires specification of prior distributions (which can be controversial)

**Bayesian Metrics for UX:**
- **Bayes Factor (BF):** Ratio of evidence for H1 vs H0. BF > 3 is "moderate evidence," BF > 10 is "strong evidence"
- **Posterior probability:** P(H1 | data) -- the probability the design is truly better given the observed data
- **Credible interval:** Bayesian analog of CI. "There is a 95% probability the true effect is in this range" (which is what people incorrectly think CIs mean)

**Design Application:** Bayesian methods are particularly useful in UX because:
- They support continuous monitoring of A/B tests without peeking penalties
- They provide intuitive probability statements ("there is an 87% probability Design B is better")
- Prior information from previous studies can be formally incorporated

---

## 2. Qualitative UX Research Methods

### 2.1 Grounded Theory (Glaser & Strauss, 1967; Strauss & Corbin, 1990)

**Purpose:** Generate theory from data, rather than testing pre-existing theories. Appropriate when studying phenomena where no adequate theory exists.

**Process:**
1. **Data collection** (interviews, observations, artifacts)
2. **Open coding:** Label concepts in the data. Break data into discrete incidents, events, and ideas. Name each with a code.
3. **Axial coding:** Relate categories to subcategories. Identify relationships between codes (causal conditions, context, intervening conditions, consequences).
4. **Selective coding:** Identify the core category that integrates all other categories into a coherent theory.
5. **Theoretical saturation:** Continue sampling until new data no longer produces new codes or categories.

**Theoretical Sampling:** Unlike statistical sampling, participants are selected based on their relevance to the emerging theory. Early participants are chosen broadly; later participants are chosen to fill gaps and test emerging categories.

**Constant Comparison:** Continuously compare new data with existing codes and categories. This iterative comparison refines categories and their properties.

**Design Application:**
- Understanding user mental models for novel product categories
- Discovering user needs that surveys and existing frameworks miss
- Building theory about user behavior patterns in new domains
- Developing design principles grounded in empirical user data

### 2.2 Thematic Analysis (Braun & Clarke, 2006)

**Definition:** A method for identifying, analyzing, and reporting patterns (themes) within qualitative data. Unlike grounded theory, thematic analysis is not tied to a specific theoretical framework.

**Six-Phase Process:**

| Phase | Description | Activities |
|---|---|---|
| 1. **Familiarization** | Immerse in the data | Read transcripts repeatedly, note initial ideas |
| 2. **Initial Coding** | Generate initial codes | Systematically code interesting features across entire dataset |
| 3. **Searching for Themes** | Collate codes into potential themes | Group related codes, create initial thematic map |
| 4. **Reviewing Themes** | Refine themes | Check themes against coded extracts and full dataset |
| 5. **Defining & Naming** | Define each theme precisely | Write detailed analysis of each theme, create clear names |
| 6. **Producing the Report** | Final analysis and write-up | Select vivid extract examples, relate to research question |

**Semantic vs. Latent Themes:**
- **Semantic themes:** Identified at the explicit, surface meaning level of the data
- **Latent themes:** Identified at the underlying conceptual or ideological level (require interpretive work)

**Design Application:** Thematic analysis is the workhorse of qualitative UX research. Applied to:
- User interview analysis
- Open-ended survey response analysis
- Usability test observation analysis
- App review and feedback analysis
- Contextual inquiry field notes

### 2.3 Interpretive Phenomenological Analysis (IPA)

**Purpose:** Understand how participants make sense of their lived experiences. Double hermeneutic: the researcher interprets the participant's interpretation of their experience.

**When to Use in UX:**
- Understanding deeply personal experiences with technology (health apps, accessibility tools, crisis services)
- Small samples (3-6 participants) studied in depth
- When the goal is understanding meaning, not measuring behavior

**Process:**
1. Semi-structured interviews focused on experience
2. Case-by-case analysis (understand each participant fully before cross-case analysis)
3. Identify experiential themes for each case
4. Look for convergence and divergence across cases

---

## 3. Mixed Methods Design

### 3.1 Why Mixed Methods?

Neither quantitative nor qualitative methods alone provide a complete picture of user experience. Mixed methods combine both to leverage their complementary strengths.

**Quantitative strengths:** Generalizability, precision, measurement, comparison
**Qualitative strengths:** Depth, context, meaning, discovery

### 3.2 Core Mixed Methods Designs

| Design | Structure | Purpose | Example in UX |
|---|---|---|---|
| **Convergent** | QUAN + QUAL simultaneously | Compare/validate findings from both | Survey + interviews on same topic |
| **Explanatory Sequential** | QUAN then QUAL | Qualitative explains quantitative results | A/B test results explained by follow-up interviews |
| **Exploratory Sequential** | QUAL then QUAN | Quantitative validates qualitative discoveries | Interview themes validated by survey |
| **Embedded** | QUAN(qual) or QUAL(quan) | One method nested within the other | Think-aloud test (QUAL) with SUS scores (quan) |

### 3.3 Design Application

**Standard UX Study Pattern:**
1. **Exploratory interviews** (QUAL) to discover issues and form hypotheses
2. **Usability test** (MIXED: behavioral QUAN + think-aloud QUAL)
3. **Survey** (QUAN: SUS, NPS, custom scales) to measure at scale
4. **Follow-up interviews** (QUAL) to understand survey outliers

---

## 4. A/B Testing Statistics

### 4.1 Sample Size Calculation

**For comparing proportions (e.g., conversion rates):**

```
n = (Z_alpha/2 + Z_beta)^2 * (p1(1-p1) + p2(1-p2)) / (p1 - p2)^2
```

Where:
- **n** = required sample size per group
- **Z_alpha/2** = Z-score for significance level (1.96 for alpha = 0.05, two-tailed)
- **Z_beta** = Z-score for power (0.84 for 80% power, 1.28 for 90%)
- **p1, p2** = expected proportions for control and treatment

**Practical Example:**
- Baseline conversion: 5% (p1 = 0.05)
- Minimum detectable effect: 1 percentage point (p2 = 0.06, a 20% relative increase)
- Alpha = 0.05, Power = 80%
- Required n per group: approximately 4,800

**Key Insight:** Detecting small absolute differences in proportions requires very large samples. A 1 percentage point increase on a 5% baseline requires ~4,800 per group. A 5 percentage point increase on a 5% baseline requires ~200 per group.

### 4.2 Multiple Comparisons Problem

**Problem:** When running multiple statistical tests simultaneously (e.g., testing 5 metrics, or 3 design variants), the probability of at least one false positive increases:
- 1 test at alpha = 0.05: 5% false positive risk
- 5 independent tests: 1 - (0.95)^5 = 22.6% risk
- 20 independent tests: 1 - (0.95)^20 = 64.2% risk

**Corrections:**

| Method | Approach | When to Use |
|---|---|---|
| **Bonferroni** | Divide alpha by number of tests | Conservative; few, pre-planned comparisons |
| **Holm-Bonferroni** | Sequential rejection procedure | Moderate; less conservative than Bonferroni |
| **Benjamini-Hochberg (FDR)** | Controls false discovery rate, not family-wise error rate | Many tests, exploratory analysis |
| **No correction** | Accept higher false positive risk | Pre-specified primary metric (one test); all others exploratory |

**Design Application:** Pre-specify a single primary metric for each A/B test. Analyze secondary metrics as exploratory (requiring replication). Do not declare victory based on whichever metric happens to be significant.

### 4.3 Simpson's Paradox

**Phenomenon:** A trend that appears in aggregated data reverses when the data is disaggregated by a confounding variable.

**Classic UX Example:**
- Overall: Design B has higher conversion than Design A
- Desktop users: Design A has higher conversion
- Mobile users: Design A has higher conversion
- Explanation: Design B happened to get a higher proportion of mobile traffic, which has higher baseline conversion regardless of design

**Implication:** Always segment A/B test results by major confounding variables (device type, user segment, traffic source, time of day, new vs returning users). Report segmented results alongside aggregate results.

### 4.4 Peeking Problem

**Problem:** Checking A/B test results repeatedly and stopping when significance is reached inflates the false positive rate. If you check daily and stop when p < 0.05, the actual false positive rate can exceed 25%.

**Solutions:**
- **Fixed-horizon testing:** Pre-determine sample size, run to completion, then analyze. No peeking.
- **Sequential testing:** Use group sequential methods (O'Brien-Fleming, Pocock boundaries) that formally control error rates with planned interim analyses.
- **Bayesian approach:** Monitor the posterior probability continuously. Bayesian methods do not suffer from the peeking problem because they do not rely on sampling distributions under H0.
- **Always-valid p-values (anytime-valid inference):** Recent statistical methods provide p-values that maintain their guarantees under continuous monitoring.

---

## 5. Eye Tracking Analysis

### 5.1 Core Metrics

**Fixation Metrics:**
| Metric | Definition | Interpretation |
|---|---|---|
| **Fixation duration** | Time spent in a single fixation (typically 100-600ms) | Longer = deeper processing or difficulty |
| **Fixation count** | Number of fixations on an area | More = more attention or more difficulty |
| **Total dwell time** | Sum of all fixation durations on an area | Overall attention to an area |
| **Time to first fixation** | Time from stimulus onset to first fixation on target | Discoverability, visual salience |
| **First fixation duration** | Duration of the first fixation on the target | Initial processing effort |

### 5.2 Scanpath Analysis

**Scanpath:** The sequence of fixations and saccades across a stimulus. Represents the spatio-temporal pattern of visual attention.

**Scanpath Comparison Methods:**
- **String editing (Levenshtein distance):** Encode fixated areas as letters; compare scanpath strings across participants using edit distance. Lower distance = more similar viewing patterns.
- **ScanMatch (Cristino et al., 2010):** Uses Needleman-Wunsch sequence alignment (from bioinformatics) to compare scanpaths, accounting for spatial proximity of fixated regions.
- **Transition matrices:** Count the frequency of transitions between areas. Higher frequency transitions indicate strong visual flow paths.
- **Markov chain analysis:** Model scanpath as a stochastic process with transition probabilities between AOIs.

### 5.3 Areas of Interest (AOI)

**Definition:** Predefined regions of the stimulus that correspond to meaningful elements (navigation, headline, CTA, image, body text). All AOI-based metrics depend on AOI definition.

**AOI Definition Guidelines:**
- AOIs should be semantically meaningful (correspond to interface elements, not arbitrary regions)
- Include padding/margin around elements to account for measurement imprecision (~0.5-1 degree)
- AOIs should not overlap (or overlap should be explicitly handled)
- Document AOI boundaries for reproducibility

### 5.4 Common Findings in UX Eye Tracking

**F-Pattern (Nielsen, 2006):** Users scan web pages in an F-shaped pattern: horizontal scan of the top content, shorter horizontal scan lower on the page, vertical scan of the left side. This applies primarily to text-heavy pages without strong visual hierarchy.

**Banner Blindness (Benway & Lane, 1998):** Users systematically avoid looking at areas that resemble advertisements, even if they contain relevant information. Anything that looks like a banner ad (rectangular, positioned at top or sides, visually distinct from content) is filtered.

**Design Application:**
- Place critical information in the areas of highest fixation density (top-left for LTR languages, first screenful)
- Do not place important content in positions associated with advertisements
- Use strong visual hierarchy to break the default F-pattern and direct attention to priority content
- Validate visual hierarchy with eye tracking: does the user look where you intended?

---

## 6. Triangulation Methods

### 6.1 Types of Triangulation (Denzin, 1978)

| Type | Description | UX Example |
|---|---|---|
| **Data triangulation** | Multiple data sources | Interview data + analytics + support tickets |
| **Investigator triangulation** | Multiple researchers | Two researchers independently code interviews |
| **Theory triangulation** | Multiple theoretical frameworks | Analyze findings through cognitive load theory AND activity theory |
| **Methodological triangulation** | Multiple methods | Usability test + survey + eye tracking |

### 6.2 Purpose

Triangulation does not prove findings are correct. It increases confidence by showing that findings converge across independent sources. If interviews, analytics, and usability tests all point to the same problem, the finding is more robust than if only one method identified it.

### 6.3 Handling Divergence

When methods produce conflicting results:
1. Check for methodological artifacts (did the lab setting change behavior? did the survey wording bias responses?)
2. Examine whether different methods accessed different aspects of the phenomenon
3. Explore whether the contradiction reveals a genuine complexity that a single method would miss
4. Report the divergence transparently -- do not suppress conflicting findings

---

## 7. Practical Study Planning

### 7.1 Research Question to Method Mapping

| Research Question Type | Best Method(s) |
|---|---|
| "How many users can complete the task?" | Quantitative usability test (task success rate) |
| "Why do users struggle with X?" | Think-aloud usability test, contextual inquiry |
| "Which design is better?" | A/B test (in production), preference test (pre-launch) |
| "What do users need?" | Interviews, contextual inquiry, diary studies |
| "How do users feel about the experience?" | UEQ, AttrakDiff, interviews |
| "Is the IA working?" | Tree test, first-click test, card sort |
| "Where do users look?" | Eye tracking |
| "What mental model do users have?" | Card sorting, think-aloud, drawing/mapping tasks |

### 7.2 Rigor Checklist

| Criterion | Quantitative | Qualitative |
|---|---|---|
| **Validity** | Internal validity, construct validity | Credibility (prolonged engagement, member checking) |
| **Reliability** | Test-retest, inter-rater | Dependability (audit trail, consistent procedures) |
| **Generalizability** | External validity, representative sampling | Transferability (thick description, purposive sampling) |
| **Objectivity** | Statistical controls, blinding | Confirmability (reflexivity, triangulation) |

---

## References

- Braun, V., & Clarke, V. (2006). Using thematic analysis in psychology. Qualitative Research in Psychology, 3(2), 77-101.
- Denzin, N. K. (1978). The Research Act: A Theoretical Introduction to Sociological Methods. McGraw-Hill.
- Glaser, B. G., & Strauss, A. L. (1967). The Discovery of Grounded Theory. Aldine.
- Nielsen, J. (2006). F-Shaped Pattern for Reading Web Content. Nielsen Norman Group.
- Sauro, J. (2011). A Practical Guide to the System Usability Scale. Measuring Usability LLC.
- Strauss, A., & Corbin, J. (1990). Basics of Qualitative Research. Sage.
