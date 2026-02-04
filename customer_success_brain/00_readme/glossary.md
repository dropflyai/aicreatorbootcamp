# Customer Success Brain — Glossary

## Purpose

This glossary defines all terms used across the Customer Success Brain.
Precise terminology prevents ambiguity in health scoring, retention analysis,
and cross-functional communication. All definitions align with industry
standards from TSIA, Gainsight Academy, Customer Success Association, and
established SaaS metrics literature (Skok, Lemkin, Tunguz).

---

## Core CS Metrics

### ARR (Annual Recurring Revenue)
The annualized value of all active recurring subscription contracts at a point
in time. Excludes one-time fees, professional services, and usage overages
unless contractually committed. ARR is the denominator for most retention
calculations.

```
ARR = Sum of (Monthly Recurring Revenue per Account x 12)
```

### MRR (Monthly Recurring Revenue)
The monthly normalized value of all recurring subscription contracts. MRR is
the granular building block; ARR is the annualized view.

### GRR (Gross Revenue Retention)
The percentage of recurring revenue retained from an existing customer cohort,
excluding any expansion revenue. GRR measures pure retention — it can never
exceed 100%. Also called Gross Dollar Retention (GDR).

```
GRR = (Starting ARR - Churned ARR - Contraction ARR) / Starting ARR x 100
```

**Benchmarks (KeyBanc 2023):**
- Median SaaS: 90%
- Top Quartile: 95%+
- Enterprise SaaS: 93-97%

### NRR (Net Revenue Retention)
The percentage of recurring revenue retained from an existing customer cohort,
including expansion revenue. NRR can exceed 100% when expansion outpaces churn
and contraction. Also called Net Dollar Retention (NDR).

```
NRR = (Starting ARR - Churned ARR - Contraction ARR + Expansion ARR) / Starting ARR x 100
```

**Benchmarks (OpenView 2023):**
- Median SaaS: 104%
- Top Quartile: 115%+
- Best-in-Class: 130%+

### Logo Retention Rate
The percentage of customer accounts (logos) retained over a period, regardless
of revenue change. A company can have high logo retention but low revenue
retention if large accounts churn disproportionately.

```
Logo Retention = (Starting Logos - Churned Logos) / Starting Logos x 100
```

### Churn Rate
The inverse of retention, measured as the percentage of revenue or logos lost
over a period. ALWAYS specify: logo churn vs. revenue churn, gross vs. net,
monthly vs. annual.

```
Monthly Revenue Churn = Churned MRR / Starting MRR x 100
Annual Revenue Churn ≈ 1 - (1 - Monthly Churn Rate)^12  [compounding formula]
```

**Critical distinction**: 2% monthly churn compounds to ~22% annual churn, not
24%. Always use the compounding formula for annualization.

### Contraction
Revenue decrease from an existing customer who remains active. Includes
downgrades, seat reductions, module removals, and negotiated price decreases.
Contraction is distinct from churn — the customer stays but pays less.

### Expansion Revenue
Revenue increase from an existing customer. Includes upsells (higher tier),
cross-sells (additional products), seat additions, and usage-based overages.

```
Expansion Rate = Expansion ARR / Starting ARR x 100
```

### CAC (Customer Acquisition Cost)
The fully loaded cost to acquire one new customer, including sales, marketing,
and related overhead. CS Brain uses CAC to justify retention investments —
retaining a customer is almost always cheaper than replacing one.

### LTV (Lifetime Value)
The total revenue a customer generates over their entire relationship, net of
costs to serve. The LTV:CAC ratio is a fundamental SaaS health metric.

```
LTV = ARPA x Gross Margin % x (1 / Churn Rate)
LTV:CAC > 3:1 is healthy (Skok benchmark)
```

### ARPA (Average Revenue Per Account)
Total ARR divided by total number of active accounts. Used in LTV calculations
and segmentation design.

---

## Health Scoring Terms

### Health Score
A composite metric (typically 0-100) that predicts the likelihood of a customer
renewing, expanding, or churning. Composed of weighted inputs across product
usage, engagement, support, and business outcome dimensions.

### Leading Indicator
A metric that predicts future behavior. Product usage decline is a leading
indicator of churn — it occurs before the customer expresses dissatisfaction.
CS Brain prioritizes leading over lagging indicators.

### Lagging Indicator
A metric that confirms past behavior. A cancellation request is a lagging
indicator — by the time it arrives, the damage is done. NPS is partially
lagging — it reflects accumulated experience.

### Composite Score
A health score composed of multiple weighted dimensions. The Gainsight model
typically uses:
- Product Usage (30-40% weight)
- Engagement (20-30% weight)
- Support Sentiment (15-20% weight)
- Business Outcomes (15-20% weight)

### Risk Score
The inverse of health — a high risk score indicates high probability of churn
or contraction. Some platforms express health as risk probability directly.

### Predictive Churn Model
A statistical or ML model that estimates churn probability based on behavioral
signals. Must be validated against actual churn outcomes with precision/recall
metrics.

---

## Lifecycle Terms

### Time-to-First-Value (TTFV)
The elapsed time from contract signing (or go-live) to the moment the customer
achieves their first meaningful value milestone. This is the single most
important onboarding metric. Lincoln Murphy defines this as the point where
the customer has their "aha moment."

### Time-to-Full-Value (TTFV-Full)
The elapsed time to achieving the complete desired outcome specified in the
success plan. Distinct from first-value, which is a subset.

### Onboarding
The structured process of transitioning a new customer from signed contract
to active, productive usage. Encompasses technical implementation, data
migration, user training, and initial value realization.

### Adoption
The degree to which a customer utilizes the product's capabilities relative
to their potential. Measured by feature breadth (how many features used),
feature depth (how intensively used), and user penetration (% of licensed
users who are active).

### Stickiness
The degree to which a product becomes embedded in the customer's workflows
and processes. High stickiness increases switching costs and reduces churn
risk. Measured by integrations active, workflows dependent on product, and
data volume stored.

### Renewal
The contractual event where a customer extends their subscription for an
additional term. Renewal is both a process (managed over 90-120 days) and
an event (the signature date).

### Expansion
Any incremental revenue from an existing customer, including upsells,
cross-sells, seat additions, and usage increases.

### Advocacy
The phase where successful customers become active promoters — providing
references, case studies, speaking engagements, and peer referrals.

---

## Engagement Terms

### QBR (Quarterly Business Review)
A structured meeting between CS and customer stakeholders to review progress
toward desired outcomes, discuss health metrics, and align on next-quarter
priorities. Cadence varies by segment — strategic accounts may be quarterly;
mid-market may be semi-annual.

### EBR (Executive Business Review)
A QBR elevated to the executive level, typically involving VP+ stakeholders
on both sides. Focuses on strategic alignment, multi-year planning, and
executive relationship depth.

### Success Plan
A documented agreement between CS and the customer specifying desired outcomes,
success milestones, accountable parties, and timeline. The success plan is the
contract between CS and the customer for value delivery.

### Multi-Threading
The practice of building relationships with multiple stakeholders within a
customer account to reduce single-point-of-failure risk. If the champion
leaves, multi-threaded accounts survive; single-threaded accounts are at
high churn risk.

### Stakeholder Map
A documented visualization of all relevant contacts within a customer account,
their roles, influence, sentiment, and engagement history.

### Digital CS / Tech-Touch
Automated, one-to-many engagement delivered through email sequences, in-app
messaging, webinars, and self-service resources. Designed for high-volume,
lower-ACV segments where 1:1 CSM engagement is not economically viable.

### High-Touch
Dedicated 1:1 CSM engagement with regular meetings, proactive outreach, and
personalized success planning. Reserved for strategic, high-ACV accounts.

### Pooled CS
A model where a pool of CSMs collectively manages a segment of accounts,
responding to triggers and signals rather than owning individual accounts.
Falls between tech-touch and dedicated CSM models.

---

## Operational Terms

### CSM (Customer Success Manager)
The primary customer-facing role responsible for managing the post-sale
relationship, driving adoption, managing renewal, and identifying expansion.

### CSM Ratio
The number of accounts or ARR per CSM. Varies dramatically by segment:
- Enterprise: 5-15 accounts per CSM
- Mid-Market: 25-50 accounts per CSM
- SMB: 50-200 accounts per CSM (with tech-touch augmentation)

### Book of Business (BoB)
The set of customer accounts assigned to an individual CSM, typically measured
in number of accounts and total ARR managed.

### Playbook
A codified, repeatable set of actions triggered by a specific customer signal
or lifecycle event. Examples: onboarding playbook, at-risk playbook, expansion
playbook, champion change playbook.

### CTA (Call to Action)
In CS platforms (Gainsight, etc.), a CTA is a task or action item generated
by a playbook trigger or manual creation. CTAs drive CSM workflow.

### NPS (Net Promoter Score)
A customer loyalty metric based on the question "How likely are you to
recommend us?" scored 0-10. Respondents are classified as Promoters (9-10),
Passives (7-8), or Detractors (0-6).

```
NPS = % Promoters - % Detractors (range: -100 to +100)
```

### CSAT (Customer Satisfaction Score)
A point-in-time satisfaction measure, typically on a 1-5 scale, collected
after specific interactions (support ticket, onboarding, training).

### CES (Customer Effort Score)
A measure of how much effort the customer had to expend to accomplish a task.
Lower effort correlates with higher retention (Gartner research).

---

## Financial Terms

### CAC Payback Period
The number of months required for a customer's gross margin contribution to
repay the cost of acquiring them. Median SaaS: 15-18 months.

### Rule of 40
A SaaS health heuristic: Revenue Growth Rate + Profit Margin should exceed 40%.
CS Brain influences this through NRR (growth) and efficient retention (margin).

### Quick Ratio (SaaS)
Measures the efficiency of revenue growth:

```
Quick Ratio = (New MRR + Expansion MRR) / (Churned MRR + Contraction MRR)
```

A Quick Ratio > 4 indicates healthy, efficient growth.

---

**Use these definitions consistently across all Customer Success Brain modules.**
