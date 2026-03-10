# Segmentation — Dividing Users Into Actionable Groups

---

## Overview

Segmentation is the practice of dividing a population into distinct groups that share common characteristics, enabling differentiated analysis and differentiated action. The core premise: averages are misleading. A business with "average" retention of 40% may actually have two populations — one at 70% and one at 10% — requiring completely different strategies.

This module covers the major segmentation frameworks (RFM, behavioral, demographic, psychographic), algorithmic clustering methods, and the operational requirements for making segments actionable. The theoretical foundations draw from marketing science (Wedel & Kamakura, 2000), machine learning (unsupervised learning literature), and product analytics practice.

---

## The Segmentation Imperative

### Why Segment?

**1. Personalization** — Different users need different experiences, messages, and offers.

**2. Resource allocation** — Finite resources should be concentrated on the highest-value or highest-potential segments.

**3. Diagnostic power** — Aggregate metrics conceal variation. Segmented analysis reveals which groups are thriving and which are struggling.

**4. Strategy formulation** — Different segments may represent different strategic opportunities: expansion, retention, win-back, or deliberate deprioritization.

### The Good Segment Test

A useful segment must satisfy four criteria:

**Identifiable:** You can determine which segment a user belongs to using available data.

**Substantial:** The segment is large enough to warrant differentiated treatment. A segment of 12 users is not actionable.

**Differentiable:** The segment behaves differently from other segments on metrics that matter. If two segments have identical retention, conversion, and LTV, they are not meaningfully different.

**Actionable:** You can do something different for this segment. If the segment is identifiable but you have no mechanism to treat it differently (different messaging, different product experience, different pricing), the segmentation is academic.

---

## RFM Segmentation

### Framework

RFM (Recency, Frequency, Monetary) is a segmentation methodology from direct marketing (Bult & Wansbeek, 1995) that classifies customers based on three behavioral dimensions:

**Recency (R):** How recently did the customer make a purchase or engage?
- More recent = more likely to respond to outreach
- Recency is the strongest single predictor of future engagement

**Frequency (F):** How often does the customer purchase or engage?
- Higher frequency = stronger habit formation and brand loyalty
- Frequency correlates with lifetime value and retention

**Monetary (M):** How much does the customer spend?
- Higher monetary value = greater economic importance
- Can be total lifetime spend or average transaction value

### RFM Scoring

**Step 1: Rank each dimension**
For each dimension, rank all customers and divide into quintiles (1-5):
```
R Score 5: Most recent (top 20%)    → Last purchase < 7 days ago
R Score 1: Least recent (bottom 20%) → Last purchase > 90 days ago

F Score 5: Most frequent (top 20%)   → 10+ purchases
F Score 1: Least frequent (bottom 20%) → 1 purchase

M Score 5: Highest spend (top 20%)   → $500+ total spend
M Score 1: Lowest spend (bottom 20%) → <$25 total spend
```

**Step 2: Create composite segments**
Each customer receives a three-digit RFM score (e.g., 555, 111, 531).

**Step 3: Map scores to strategic segments**

| Segment Name | RFM Pattern | Description | Strategy |
|-------------|-------------|-------------|----------|
| Champions | 555, 554, 545 | Best customers — recent, frequent, high-value | Reward and retain, ask for referrals |
| Loyal Customers | 435, 534, 543 | Regular customers, consistent engagement | Upsell, cross-sell, loyalty programs |
| Potential Loyalists | 453, 443, 353 | Recent, moderate frequency — could become loyal | Nurture with onboarding, feature education |
| New Customers | 511, 512, 521 | Just arrived, low frequency, unknown value | Activate, reduce time-to-value |
| At Risk | 155, 254, 245 | Were good customers, but engagement declining | Win-back campaigns, personal outreach |
| Hibernating | 111, 112, 121 | Low on all dimensions — likely churned or dormant | Evaluate cost of re-engagement vs. write-off |
| Can't Lose Them | 155, 145, 245 | Were high-value, now disengaging | Urgent intervention, executive outreach |

### RFM Limitations

- **Static snapshot:** RFM captures current state, not trajectory. A user trending upward on frequency looks the same as one trending downward if they are at the same level today.
- **Arbitrary boundaries:** Quintile thresholds are arbitrary. A user at the 79th percentile of recency scores differently than one at the 81st percentile, despite negligible behavioral difference.
- **Missing dimensions:** RFM ignores product usage patterns, sentiment, demographics, and other factors that influence behavior.
- **Best for transactional models:** RFM was designed for direct marketing. For subscription or usage-based models, engagement-based segmentation may be more informative.

---

## Behavioral Segmentation

### Principle

Behavioral segmentation groups users by what they do in the product, not who they are. The hypothesis: behavior is the most predictive segmentation dimension because it directly reflects the value users are extracting from the product.

### Behavioral Dimensions

**Usage intensity:**
- Power users (daily, deep engagement)
- Regular users (weekly, moderate engagement)
- Casual users (monthly, shallow engagement)
- Dormant users (no recent engagement)

**Feature adoption:**
- Broad adopters (use many features)
- Deep specialists (use few features intensively)
- Surface skimmers (try many features shallowly)
- Single-feature users (one feature only)

**Workflow patterns:**
- Creators (produce content, data, artifacts)
- Consumers (view, read, use what others create)
- Collaborators (share, comment, co-create)
- Administrators (configure, manage, organize)

**Lifecycle stage:**
- Evaluating (in trial or free tier, exploring)
- Onboarding (committed but still learning)
- Productive (regular, value-extracting usage)
- Expanding (increasing usage, adding users)
- Declining (decreasing engagement)
- Churned (no activity in defined window)

### Constructing Behavioral Segments

**Method 1: Rule-Based Segmentation**
Define explicit thresholds based on domain knowledge:
```
Power User:   >20 sessions/month AND >5 features used AND >60 min/week
Regular User: 5-20 sessions/month AND 2-5 features used AND 15-60 min/week
Casual User:  1-4 sessions/month AND 1-2 features used AND <15 min/week
Dormant:      0 sessions in last 30 days
```

**Advantages:** Transparent, explainable, stable.
**Disadvantages:** Thresholds are arbitrary, dimensions may not be exhaustive.

**Method 2: Data-Driven Segmentation (Clustering)**
Use unsupervised learning algorithms to discover natural groupings in behavioral data. See the Clustering section below.

---

## Demographic Segmentation

### Dimensions

Demographic segmentation groups users by who they are rather than what they do:

- **Geography:** Country, region, city, timezone
- **Company attributes (B2B):** Industry, company size, revenue, tech stack
- **Role (B2B):** Job title, department, seniority level
- **Plan tier:** Free, basic, professional, enterprise
- **Acquisition source:** Organic, paid, referral, partner

### When to Use Demographic Segmentation

Demographic segmentation is most valuable when:
1. Different demographics have genuinely different needs (a 10-person startup uses the product differently than a 10,000-person enterprise)
2. Pricing, messaging, or product experience can be differentiated by demographic
3. You need to understand market composition and penetration by segment

### Demographic Segmentation Limitations

- **Correlation, not causation:** Being in the "enterprise" segment does not cause higher retention — it correlates with features, needs, and behaviors that drive retention.
- **Heterogeneity within segments:** "Enterprise" customers include a vast range of behaviors. Demographic segments often have high internal variance.
- **Data quality:** Demographic data is often incomplete, self-reported, and stale.

---

## Psychographic Segmentation

### Dimensions

Psychographic segmentation groups users by motivations, attitudes, and goals:

- **Jobs to be done (JTBD):** What outcome is the user trying to achieve?
- **Motivations:** Efficiency, creativity, collaboration, compliance, learning
- **Adoption mindset:** Innovator, early adopter, early majority, late majority, laggard
- **Price sensitivity:** Value-focused vs. premium-willing
- **Decision style:** Data-driven vs. intuition-driven, individual vs. committee

### Collecting Psychographic Data

Psychographic data is harder to collect than behavioral or demographic data:

- **Surveys:** Direct questioning about motivations and attitudes
- **Onboarding questions:** "What brings you here today?" with predefined options
- **Behavioral inference:** Usage patterns that imply psychographic traits (e.g., users who immediately explore settings may be "configurators" motivated by control)
- **Support interaction analysis:** NLP on support tickets and feedback to infer satisfaction and motivation

---

## Algorithmic Clustering

### When Rules Are Not Enough

When the segmentation dimensions are too numerous or the natural groupings are not obvious, algorithmic clustering discovers structure in the data.

### K-Means Clustering

**Algorithm:** Partition n observations into k clusters by minimizing within-cluster variance.

**Procedure:**
1. Choose k (number of clusters)
2. Initialize k centroids randomly
3. Assign each point to the nearest centroid
4. Recompute centroids as the mean of assigned points
5. Repeat steps 3-4 until convergence

**Choosing k:** Use the elbow method (plot within-cluster sum of squares vs. k, choose the "elbow" point) or silhouette analysis (measure how similar points are to their own cluster vs. neighboring clusters).

**Strengths:** Simple, scalable, interpretable.
**Weaknesses:** Assumes spherical clusters, sensitive to initialization and outliers, requires specifying k in advance.

### DBSCAN (Density-Based Spatial Clustering)

**Algorithm:** Groups points that are closely packed together, marking points in low-density regions as outliers.

**Strengths:** Discovers clusters of arbitrary shape, does not require specifying k, naturally identifies outliers.
**Weaknesses:** Struggles with varying density clusters, sensitive to epsilon parameter.

### Hierarchical Clustering

**Algorithm:** Builds a tree (dendrogram) of nested clusters by iteratively merging (agglomerative) or splitting (divisive) clusters.

**Strengths:** Does not require specifying k in advance, produces a full hierarchy of granularities, dendrograms provide intuitive visualization.
**Weaknesses:** Computationally expensive for large datasets, sensitive to linkage method choice.

### Feature Engineering for Clustering

The input features determine the quality of clusters. For user segmentation:

```
Feature engineering pipeline:
1. Usage metrics: sessions/month, actions/session, features used, time spent
2. Temporal patterns: usage days of week, time of day, regularity (coefficient of variation)
3. Progression metrics: onboarding completion, feature adoption sequence
4. Social metrics: team size, collaboration rate, sharing frequency
5. Value metrics: plan tier, expansion likelihood signals

Preprocessing:
- Normalize all features (StandardScaler or RobustScaler for outlier resistance)
- Log-transform heavily skewed features (session counts, revenue)
- Handle missing values (impute with median for numeric, mode for categorical)
- Reduce dimensionality if needed (PCA, UMAP for visualization)
```

### Cluster Validation

**Internal validation (no ground truth):**
- Silhouette score: how similar is each point to its own cluster vs. nearest neighbor cluster (range: -1 to 1, higher is better)
- Davies-Bouldin index: ratio of within-cluster scatter to between-cluster distance (lower is better)
- Calinski-Harabasz index: ratio of between-cluster dispersion to within-cluster dispersion (higher is better)

**External validation (with business context):**
- Do clusters differ meaningfully on key business metrics (retention, LTV, conversion)?
- Can stakeholders name and describe each cluster based on its profile?
- Are clusters stable over time (monthly re-clustering produces similar groups)?
- Are clusters actionable (can we do something different for each cluster)?

---

## Making Segments Actionable

### The Segment Activation Framework

Discovering segments is 20% of the work. Activating them — translating segment membership into differentiated experience — is the other 80%.

| Activation Layer | Mechanism | Example |
|-----------------|-----------|---------|
| **Messaging** | Different copy, tone, emphasis | Power users see advanced tips; new users see basics |
| **Onboarding** | Segment-specific onboarding flows | Enterprise users get white-glove; self-serve users get automated |
| **Features** | Feature gating, progressive disclosure | Advanced features revealed as engagement deepens |
| **Pricing** | Segment-specific offers or packaging | Startups get discount; enterprises get premium support |
| **Support** | Tiered support levels | High-LTV customers get priority response |
| **Retention** | Segment-specific re-engagement | At-risk segments get proactive outreach |

### Segment Monitoring

Once segments are defined, monitor:
1. **Segment size over time:** Is the high-value segment growing or shrinking?
2. **Segment migration:** How many users move between segments each period?
3. **Segment-level KPIs:** Retention, conversion, LTV, satisfaction by segment
4. **Segment stability:** Are the clusters consistent month-over-month?

### The Segment Review Cadence

- **Weekly:** Monitor segment sizes and migration rates
- **Monthly:** Review segment-level KPIs and compare to targets
- **Quarterly:** Re-evaluate segment definitions — are they still meaningful and actionable?
- **Annually:** Consider re-clustering from scratch as the user base and product evolve

---

## Segmentation Anti-Patterns

### Anti-Pattern 1: Over-Segmentation
Creating 50 segments that no one can remember or operationally act on. Most organizations can effectively differentiate treatment for 3-6 segments, not 50.

### Anti-Pattern 2: Demographic-Only Segmentation
Segmenting only by company size or industry without incorporating behavioral data. Demographics are proxies for behavior — measure the behavior directly when possible.

### Anti-Pattern 3: Static Segments
Defining segments once and never updating. User behavior evolves, the product changes, and the market shifts. Segments require regular validation.

### Anti-Pattern 4: Segments Without Actions
Beautifully defined segments with no operational consequence. If Marketing, Product, and Sales cannot articulate what they do differently for each segment, the segmentation is academic.

### Anti-Pattern 5: Ignoring Segment Overlap
Some frameworks force mutual exclusivity. But a user can be both a "power user" (behavioral) and an "enterprise user" (demographic). Use layered segmentation rather than forcing single-dimension assignment.

---

**Segmentation is the art of finding actionable structure in human diversity. The goal is not perfect taxonomy — it is useful simplification that enables differentiated, more effective action.**
