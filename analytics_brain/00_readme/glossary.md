# Analytics Brain — Glossary

---

## Purpose

This glossary establishes precise definitions for terms used throughout the Analytics Brain. Ambiguous terminology is the root cause of most analytics dysfunction — when "active user" means different things to different teams, every metric built on that concept is unreliable. This glossary is the single source of truth for analytical vocabulary.

---

## Metric Terminology

### North Star Metric (NSM)
The single metric that best captures the core value an organization delivers to its customers. Coined by Sean Ellis and formalized by Amplitude. The NSM must be measurable, reflect customer value creation (not just revenue extraction), and serve as a leading indicator of sustainable business growth. Example: Airbnb's "Nights Booked" captures host-guest value exchange better than revenue alone.

### Leading Indicator
A metric that changes before the outcome it predicts. Leading indicators are actionable because they provide early signal — intervening on a leading indicator can influence the lagging outcome. Example: "Trial-to-paid conversion rate this week" is a leading indicator of "monthly revenue next month."

### Lagging Indicator
A metric that confirms a trend after it has occurred. Lagging indicators are useful for validation but poor for intervention — by the time they move, the opportunity to act has passed. Revenue, churn rate, and NPS are typically lagging indicators.

### Proxy Metric
A measurable quantity used as a stand-in for a concept that is difficult or expensive to measure directly. The validity of a proxy depends on the stability of its correlation with the true quantity of interest. Proxy metrics must be regularly calibrated. Example: "Time spent on page" as a proxy for "content quality" — valid only if bounce rate and completion data support the correlation.

### Vanity Metric
A metric that looks impressive but does not inform decisions or indicate business health. Vanity metrics are characterized by: they only go up, they lack context (no rate, ratio, or comparison), and no one changes behavior based on their movement. Classic examples: total registered users, total page views, total downloads. The antidote is to replace them with actionable metrics — rates, ratios, cohorted values.

### Counter-Metric
A metric monitored alongside a primary metric to detect unintended consequences of optimizing the primary. Also called a "guardrail metric." Example: If the primary metric is "customer acquisition cost," the counter-metric might be "Day-30 retention rate" to ensure cheap acquisition is not attracting low-quality users.

### Goodhart's Law
"When a measure becomes a target, it ceases to be a good measure" (Charles Goodhart, 1975; popularized by Marilyn Strathern). Once people optimize for a specific metric, they will find ways to game it, making the metric unreliable as a measurement of the underlying concept. Counter-metrics and metric rotation are the primary defenses.

### Input Metric
A metric that measures an activity or effort that is expected to drive an output metric. Input metrics are directly controllable by the team. Example: "Number of outbound sales calls" is an input metric; "Pipeline generated" is the output metric.

### Output Metric
A metric that measures a result or outcome. Output metrics are typically not directly controllable — they are influenced by input metrics and external factors. Example: "Revenue" is an output metric driven by input metrics like "deals closed" and "average contract value."

---

## Analysis Terminology

### Cohort
A group of users or entities that share a common characteristic, typically defined by the time they first performed an action. The most common cohort definition is "signup week" or "signup month." Cohort analysis compares the behavior of these groups over time to separate true trends from composition effects.

### Retention Cohort
A cohort analysis that measures what percentage of users from each cohort return to perform a target action in subsequent time periods. The canonical format is a triangular matrix where rows are cohorts, columns are time periods since cohort entry, and cells contain retention rates.

### Survival Analysis
A statistical method borrowed from biostatistics (Kaplan & Meier, 1958) that models the time until an event occurs (typically churn). Produces survival curves showing the probability of "surviving" (remaining active) past each time point. Handles censored data — users who have not yet churned but whose eventual behavior is unknown.

### RFM Segmentation
A customer segmentation framework based on three dimensions: Recency (how recently a customer transacted), Frequency (how often they transact), and Monetary value (how much they spend). Originally from direct marketing (Bult & Wansbeek, 1995). Each dimension is typically scored 1-5, creating a three-digit segment code (e.g., 555 = best customers).

### Attribution
The process of assigning credit for a conversion or outcome to the marketing touchpoints that influenced it. Attribution models range from simple (last-touch, first-touch) to sophisticated (data-driven, algorithmic). All attribution models are wrong; some are useful.

### Incrementality
The causal effect of a marketing intervention, measured as the difference in outcomes between a treatment group (exposed to the intervention) and a control group (not exposed). Incrementality answers "what would have happened without this intervention?" rather than "who touched this intervention before converting?"

### Multi-Touch Attribution (MTA)
An attribution methodology that distributes conversion credit across multiple touchpoints in a customer journey. Models include linear (equal credit), time-decay (more credit to recent touches), position-based (40/20/40 to first, middle, last), and data-driven (algorithmic credit distribution). MTA is fundamentally limited by its inability to establish causation from observational journey data.

### Media Mix Modeling (MMM)
A statistical approach (typically regression-based) that estimates the contribution of each marketing channel to business outcomes using aggregate time-series data. Unlike MTA, MMM does not require user-level tracking and naturally accounts for offline channels, seasonality, and macro factors. Trade-offs: works at aggregate level only, requires long time series, and assumes stable relationships.

### Lift Test
An experiment designed to measure the incremental impact of a marketing intervention. A random subset of the target audience is held out from the intervention (control group), and the difference in conversion rates between treatment and control measures lift. Ghost ads and intent-to-treat designs are common variants.

---

## Visualization Terminology

### Data-Ink Ratio
Defined by Edward Tufte (1983) as the proportion of a graphic's ink devoted to the non-redundant display of data-information. Calculated as: (data-ink) / (total ink used in the graphic). The principle: maximize the data-ink ratio within reason. Remove every element that does not directly represent data.

### Chartjunk
Tufte's term for visual elements in charts that do not convey data: decorative fills, 3D effects, moiré patterns, heavy gridlines, redundant labels, clip art. Chartjunk reduces the data-ink ratio and distracts from the information the visualization should communicate.

### Small Multiples
A series of similar charts using the same scale and axes, each showing a different subset of the data (by category, time period, or segment). Tufte's principle: "At the heart of quantitative reasoning is a single question: Compared to what?" Small multiples answer this question by enabling direct visual comparison across conditions.

### Pre-Attentive Attributes
Visual properties processed by the human visual system in under 250 milliseconds, before conscious attention engages (Healey et al., 1996). Include: color hue, color intensity, size, orientation, shape, spatial position, motion. Effective visualizations leverage pre-attentive attributes to make key data points "pop" without requiring the viewer to search.

### Sparkline
A small, intense, word-sized graphic invented by Tufte (2006) for embedding in text, tables, or dashboards. Sparklines show temporal trends without axes or labels — context is provided by surrounding text. They maximize data density (the amount of information per unit of display area).

### Visual Encoding
The mapping of data dimensions to visual properties. The accuracy hierarchy (Cleveland & McGill, 1984) ranks visual encodings by how accurately humans decode them: position (most accurate) > length > angle > area > color saturation > color hue (least accurate for quantitative data). Chart type selection should follow this hierarchy.

### Sequential Palette
A color palette that maps ordered data (low to high) using a single hue gradient varying in lightness. Appropriate for: continuous numerical data, rates, percentages. Example: light blue to dark blue for "low to high."

### Diverging Palette
A color palette with two hues diverging from a neutral midpoint. Appropriate for: data with a meaningful center point (zero, average, target). Example: red-white-blue where white represents the midpoint.

### Categorical Palette
A color palette with distinct, maximally distinguishable hues for unordered categories. Appropriate for: nominal data (product lines, regions, user types). Should be limited to 6-8 categories; beyond that, use labels or small multiples instead of color.

---

## Analytics Engineering Terminology

### Dimensional Model
A data modeling approach designed for analytical query performance and business understandability (Kimball, 1996). Organizes data into fact tables (measures/events) and dimension tables (descriptive attributes). Star schemas and snowflake schemas are the canonical forms.

### Fact Table
A table in a dimensional model that stores quantitative measurements of business processes. Each row represents an event or transaction. Contains foreign keys to dimension tables and numeric measures. Examples: orders, page views, transactions.

### Dimension Table
A table in a dimensional model that stores descriptive attributes used to filter, group, and label facts. Contains a primary key and descriptive columns. Examples: users, products, dates, geographic regions.

### Metrics Layer (Semantic Layer)
A centralized definition layer that sits between raw data and BI tools, providing consistent metric calculations regardless of which tool or query accesses the data. Implementations include dbt metrics, Looker's LookML, Transform (now dbt), and Cube.js. The metrics layer solves the "same metric, different number" problem.

### dbt (data build tool)
An open-source analytics engineering tool that enables data transformation using SQL SELECT statements. dbt manages the T in ELT — it does not extract or load data. Core concepts: models (SQL SELECT statements), tests (data quality assertions), documentation (schema descriptions), and sources (declarations of raw data).

### Staging Model (dbt)
The first transformation layer in a dbt project. Staging models provide a clean, consistently named, typed representation of each source table. One staging model per source table. Naming convention: `stg_{source}__{entity}`.

### Mart Model (dbt)
The final transformation layer in a dbt project, optimized for consumption by BI tools and analysts. Mart models are typically wide, denormalized tables that answer specific business questions. Naming convention: `fct_{entity}` for fact tables, `dim_{entity}` for dimensions.

### Data Contract
A formal agreement between a data producer (application team, vendor) and data consumer (analytics team) that specifies the schema, semantics, quality guarantees, and SLAs for a data interface. Data contracts prevent breaking changes from propagating silently through the analytics pipeline.

### Event Taxonomy
A structured naming convention and governance system for tracking events in product analytics. Defines: event names (typically object-action format: `page_viewed`, `button_clicked`), required properties, optional properties, and property value enums. A well-designed taxonomy is the foundation of trustworthy product analytics.

---

## Statistical Terminology

### Statistical Significance
The probability that an observed result occurred by chance under the null hypothesis. Conventionally measured by p-value, with p < 0.05 as the typical threshold. Statistical significance does not imply practical significance — a statistically significant result can be too small to matter.

### Practical Significance
Whether an observed effect is large enough to be meaningful for business decisions, regardless of statistical significance. Determined by minimum detectable effect (MDE) and business context, not by p-values alone. A 0.1% conversion rate improvement may be statistically significant with a large sample but practically irrelevant.

### Confidence Interval
A range of values that, across repeated experiments, would contain the true parameter value a specified proportion of the time (typically 95%). Confidence intervals communicate uncertainty more completely than point estimates alone. Report them always.

### Power (Statistical)
The probability that a test correctly rejects the null hypothesis when the alternative is true (1 - beta). Standard target: 80%. Determined by sample size, effect size, and significance level. Power analysis before running experiments prevents wasted time on underpowered tests.

### Bayesian Inference
A statistical framework that updates prior beliefs with observed data to produce posterior probabilities. In A/B testing, Bayesian methods answer "what is the probability that B is better than A?" rather than "can we reject the null hypothesis?" Bayesian approaches handle early peeking and continuous monitoring more naturally than frequentist methods.

### Simpson's Paradox
A phenomenon where a trend that appears in several groups reverses when the groups are combined. Caused by a lurking variable (confound) that changes the composition of groups. Example: Treatment A has a higher success rate in both mild and severe cases, but Treatment B has a higher overall success rate because it treats more mild cases. The Analytics Brain must always check for Simpson's Paradox when aggregating across segments.

### Selection Bias
Systematic error introduced when the sample analyzed is not representative of the population of interest. In analytics, selection bias commonly arises from: survivorship bias (analyzing only users who remained), self-selection (users who opted into a feature differ from those who did not), and availability bias (analyzing data that is easy to access rather than data that is relevant).

---

## Dashboard Terminology

### Information Hierarchy
The arrangement of content on a dashboard according to its importance and the user's scanning pattern. Primary metrics receive the most prominent position and visual weight. Supporting details are progressively disclosed through drill-down and secondary views. Follows the "inverted pyramid" principle from journalism.

### KPI Tile
A prominent, single-number display that shows a key performance indicator along with comparison context (period-over-period change, target, trend). The most common dashboard element. Effective KPI tiles include: the current value, the comparison value, the direction and magnitude of change, and a visual indicator (color, arrow).

### Drill-Down
An interactive capability that allows users to navigate from summary-level data to progressively more detailed views. Drill-down respects the information hierarchy — users start with the answer and explore the "why" on demand, rather than being overwhelmed with detail upfront.

### Refresh Cadence
The frequency at which a dashboard's underlying data is updated. Must be aligned with the decision cadence of the dashboard's audience. Executive dashboards: daily or weekly. Operational dashboards: hourly or real-time. Marketing campaign dashboards: daily. Mismatched refresh cadence creates either stale data anxiety or unnecessary infrastructure cost.

---

**Terminology is the contract between the Analytics Brain and its consumers. Precise definitions prevent ambiguity. Ambiguity prevents trust.**
