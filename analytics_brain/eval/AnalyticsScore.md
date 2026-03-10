# Analytics Score -- Quality Enforcement (Authoritative)

This document defines how analytics quality is evaluated.
Every metric, dashboard, and analysis must be scored before it is considered trustworthy.

If quality is not measurable, it is not enforced.
If two dashboards show different numbers, neither is trusted.

---

## SCORING RULES (MANDATORY)

Each analytics deliverable must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate remediation required:
- **Metric Design Quality**
- **Statistical Validity**
- **Reproducibility**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 (floor threshold)
- All failure conditions checked and cleared

### Trust Gates

| Gate | Requirement |
|------|-------------|
| Internal Draft | Average >= 3.0, definitions documented |
| Team Review | Average >= 3.5, no hard fail < 3, queries reproducible |
| Stakeholder Facing | Average >= 4.0, no hard fail < 4, single source of truth verified |
| Board/Investor Facing | Average >= 4.5, independent validation, uncertainty quantified |

---

## 1. METRIC DESIGN QUALITY

**Question:**
Are metrics actionable, well-defined, and resistant to Goodhart's Law?

### What to Evaluate

- Metric has a written definition (what counts, what does not, edge cases)
- Metric is actionable (a team can change their behavior based on it)
- Metric is not a vanity metric (not just "big number = good")
- Goodhart's Law considered (how could optimizing this metric go wrong)
- Leading vs lagging classification documented
- Metric owner identified (who is accountable for this number)
- Metric has a target or acceptable range
- Counter-metrics identified (what to watch so the metric is not gamed)
- Historical baseline established
- Metric sensitivity tested (how much does it move with real changes)

### Scoring Guide

- **5** -- Written definition, actionable, Goodhart-resistant, counter-metrics defined, owner identified, target set, baseline established, sensitivity understood
- **4** -- Written definition, actionable, Goodhart considered, owner identified, target set
- **3** -- Definition exists but incomplete, metric somewhat actionable, no counter-metrics
- **2** -- Informal definition, metric exists but unclear how to act on it
- **1** -- No definition, vanity metric, no owner, no target

### Failure Conditions

- Metric without definition document = NOT TRUSTWORTHY -- Score capped at 2
- No metric owner = Score capped at 3
- Vanity metric presented as KPI = Score capped at 2
- No Goodhart's Law analysis = Score capped at 3
- No counter-metric identified = Score capped at 3
- Metric sensitivity unknown = Score capped at 3

Score <4 --> Write metric definition document with owner, target, and counter-metrics.

---

## 2. DASHBOARD USABILITY

**Question:**
Can the intended audience find their answers quickly and confidently?

### What to Evaluate

- Information hierarchy clear (most important metrics most prominent)
- Drill-down capability available (summary to detail navigation)
- Load time acceptable (under 3 seconds for initial render)
- Filters and segments intuitive
- Date range selection clear and defaulted appropriately
- Comparison context provided (vs previous period, vs target, vs benchmark)
- Legend and labels self-explanatory
- Color used for meaning (not decoration)
- Mobile-friendly (if applicable)
- Self-serve adoption (users can answer questions without asking an analyst)

### Scoring Guide

- **5** -- Clear hierarchy, drill-down, <3s load, intuitive filters, comparisons present, self-explanatory, high self-serve adoption (>80% of questions answered without analyst)
- **4** -- Clear hierarchy, drill-down, <5s load, good filters, comparisons present, most users self-serve
- **3** -- Usable but cluttered, limited drill-down, 5-10s load, basic filters
- **2** -- Confusing layout, no drill-down, slow load, unclear filters
- **1** -- Unusable, information overload, very slow, users avoid using it

### Failure Conditions

- Dashboard >10s load = NOT USABLE -- Score capped at 2
- No hierarchy (all metrics equally prominent) = Score capped at 3
- No comparison context (numbers without reference point) = Score capped at 3
- No drill-down from summary to detail = Score capped at 3
- Filters confusing or broken = Score capped at 3
- Self-serve adoption <30% = Score capped at 3

Score <4 --> Redesign hierarchy, optimize load time, add drill-down.

---

## 3. STATISTICAL VALIDITY

**Question:**
Are conclusions supported by proper statistical analysis with stated caveats?

### What to Evaluate

- Significance testing applied where appropriate (not just "number went up")
- Confidence intervals shown (not just point estimates)
- Sample size adequate for conclusions drawn
- Selection bias identified and addressed
- Survivorship bias considered
- Simpson's paradox checked in segmented data
- Seasonality accounted for in time series
- Caveats and limitations stated explicitly
- Correlation vs causation clearly distinguished
- Data quality issues disclosed (missing data, outliers, known gaps)

### Scoring Guide

- **5** -- Significance tested, confidence intervals shown, biases addressed, caveats stated, data quality disclosed, appropriate methods used throughout
- **4** -- Significance tested for key findings, confidence intervals for important metrics, major biases addressed, caveats stated
- **3** -- Some statistical rigor, significance mentioned but not always tested, some caveats
- **2** -- Conclusions drawn from raw numbers, no significance testing, no caveats
- **1** -- Cherry-picked data, misleading statistics, no rigor

### Failure Conditions

- Conclusions without significance testing where appropriate = Score capped at 3
- No confidence intervals on key metrics = Score capped at 3
- Selection bias not addressed = Score capped at 3
- Correlation presented as causation = Score capped at 2
- Known data quality issues not disclosed = Score capped at 2
- Cherry-picked time ranges to support a narrative = Score capped at 1

Score <4 --> Add significance tests, confidence intervals, and caveats.

---

## 4. INSIGHT ACTIONABILITY

**Question:**
Does the analysis produce specific, actionable recommendations with owners and timelines?

### What to Evaluate

- Insights are specific (not "we should improve retention")
- Recommendations have a clear owner (who should act)
- Recommendations have a timeline (by when)
- Expected impact quantified (if we do X, we expect Y improvement)
- Prioritization clear (what to do first, what can wait)
- Follow-up measurement plan (how to verify the action worked)
- Counter-arguments acknowledged (why this might not work)
- Resource requirements estimated (what it costs to act)
- Alternative actions presented (at least 2 options where appropriate)
- "So what?" test passed (every finding connects to a decision)

### Scoring Guide

- **5** -- Specific recommendations, owner assigned, timeline set, impact quantified, prioritized, follow-up plan, alternatives presented, resources estimated
- **4** -- Specific recommendations, owner identified, timeline suggested, impact estimated, prioritized
- **3** -- Some recommendations, but vague or without owners, limited prioritization
- **2** -- Observations without recommendations, "interesting findings" without action
- **1** -- Data dump with no interpretation, no recommendations

### Failure Conditions

- Insight without recommended action = INCOMPLETE -- Score capped at 2
- Recommendation without owner = Score capped at 3
- Recommendation without timeline = Score capped at 3
- Impact not estimated = Score capped at 3
- No follow-up measurement plan = Score capped at 3
- "So what?" test failed (finding does not connect to a decision) = Score capped at 2

Score <4 --> Add specific recommendations with owners, timelines, and expected impact.

---

## 5. DATA STORYTELLING

**Question:**
Is the analysis communicated as a compelling narrative appropriate for the audience?

### What to Evaluate

- Narrative arc present (situation, complication, resolution)
- Executive summary leads with the key finding (not methodology)
- Uncertainty communicated honestly (not hidden or over-emphasized)
- Visualizations support the narrative (not just "here are charts")
- Audience-appropriate language (no jargon for executives, technical depth for analysts)
- Annotations on charts explain key events and anomalies
- Comparison context makes numbers meaningful
- Call to action clear at the end
- Length appropriate for the audience (executive: 1-2 pages; analyst: detailed appendix)
- Methodology available but not blocking the story

### Scoring Guide

- **5** -- Clear narrative arc, executive summary, uncertainty communicated, annotated charts, audience-appropriate, call to action, methodology in appendix
- **4** -- Good narrative, executive summary, key findings prominent, appropriate visualizations, call to action
- **3** -- Findings presented logically but no clear narrative, some visualizations, basic summary
- **2** -- Data presented without narrative, charts without context, no executive summary
- **1** -- Data dump, no narrative, confusing visualizations, inappropriate for audience

### Failure Conditions

- No executive summary = Score capped at 3
- Uncertainty hidden or misrepresented = Score capped at 2
- Jargon-heavy for executive audience = Score capped at 3
- No annotations on key chart events = Score capped at 3
- No call to action = Score capped at 3
- Methodology blocking the narrative (leads with "how" not "what") = Score capped at 3

Score <4 --> Restructure with narrative arc, executive summary, and audience-appropriate language.

---

## 6. TIMELINESS

**Question:**
Is data fresh enough for the decisions being made, with real-time where needed?

### What to Evaluate

- Data freshness SLA defined (how stale is acceptable)
- Current data freshness within SLA
- Real-time data available where decisions require it
- Data pipeline monitoring (ETL/ELT delays detected)
- Stale data visibly labeled (users know when data is old)
- Historical data backfill capability
- Pipeline recovery time after failure
- Data arrival time predictable and consistent
- Late-arriving data handling (does it retroactively correct reports)
- Timezone handling correct across all data sources

### Scoring Guide

- **5** -- SLA defined, data within SLA, real-time where needed, pipeline monitored, stale data labeled, backfill automated, late-arriving data handled, timezone correct
- **4** -- SLA defined, data mostly within SLA, monitoring present, stale data labeled, timezone handled
- **3** -- SLA loosely defined, data sometimes stale, basic monitoring, some timezone issues
- **2** -- No SLA, data frequently stale, no monitoring, users unaware of staleness
- **1** -- Data freshness unknown, no monitoring, decisions made on stale data without awareness

### Failure Conditions

- No data freshness SLA = Score capped at 3
- Data consistently stale beyond SLA = Score capped at 2
- Stale data not labeled = Score capped at 2 (users cannot trust what they see)
- No pipeline monitoring = Score capped at 3
- Timezone errors in data = Score capped at 2

Score <4 --> Define freshness SLA, implement monitoring, label stale data.

---

## 7. SELF-SERVE ADOPTION

**Question:**
Can stakeholders answer their own questions without requesting analyst time?

### What to Evaluate

- Self-serve tools available (dashboards, query builders, exploration tools)
- Training materials for self-serve tools
- Data dictionary accessible and up-to-date
- Common questions pre-answered in dashboards
- Question escalation path clear (when to self-serve vs ask an analyst)
- User satisfaction with self-serve tools measured
- Percentage of questions answered without analyst involvement
- Self-serve data quality same as analyst-produced data
- User permissions appropriate (access to needed data, not more)
- Feedback loop from users to analytics team (what is missing)

### Scoring Guide

- **5** -- Self-serve tools available, training complete, data dictionary current, >80% questions self-served, user satisfaction >4.0/5.0, feedback loop active
- **4** -- Self-serve tools available, some training, data dictionary exists, >60% questions self-served, user satisfaction >3.5/5.0
- **3** -- Basic dashboards available, limited self-serve, 30-60% questions self-served
- **2** -- Dashboards exist but users still need analyst for most questions, <30% self-serve
- **1** -- No self-serve capability, every question requires analyst time

### Failure Conditions

- No self-serve tools = Score capped at 2
- Data dictionary absent or stale = Score capped at 3
- Self-serve data inconsistent with analyst data = Score capped at 2
- User satisfaction <3.0/5.0 = Score capped at 3
- No training materials = Score capped at 3

Score <4 --> Build self-serve dashboards, data dictionary, and training.

---

## 8. REPRODUCIBILITY

**Question:**
Can any analyst reproduce the same numbers from the same inputs?

### What to Evaluate

- Queries versioned in source control (not ad-hoc SQL in someone's notebook)
- Metric definitions documented (single source of truth, not tribal knowledge)
- Data sources documented (where does each number come from)
- Transformation logic documented (how raw data becomes metrics)
- Environment documented (which database, which schema, which date range)
- Results reproducible by another analyst following documentation
- No manual data manipulation (Excel steps, copy-paste, manual adjustments)
- Automated pipeline preferred over manual queries
- Audit trail for any manual overrides
- Version history for metric definition changes

### Scoring Guide

- **5** -- All queries versioned, definitions documented (single source of truth), transformations automated, any analyst can reproduce, no manual steps, audit trail present
- **4** -- Queries versioned, definitions documented, mostly automated, reproducible with minor guidance
- **3** -- Some queries versioned, definitions partially documented, some manual steps
- **2** -- Ad-hoc queries, informal definitions, significant manual steps, hard to reproduce
- **1** -- Tribal knowledge only, no documentation, results vary by analyst

### Failure Conditions

- Conflicting numbers between reports = CREDIBILITY CRISIS -- Score capped at 1
- Metric definitions not documented = Score capped at 2
- Queries not version controlled = Score capped at 3
- Manual data manipulation without audit trail = Score capped at 2
- Results not reproducible by another analyst = Score capped at 2
- Multiple sources of truth for same metric = Score capped at 1

Score <4 --> Version queries, document definitions, eliminate manual steps.

---

## FINAL ANALYTICS SCORE DECISION

**Hard Fail Dimensions (Metric Design Quality, Statistical Validity, Reproducibility):**
- Score <3 --> IMMEDIATE REMEDIATION REQUIRED
- Conflicting numbers between reports --> ALL REPORTS SUSPECT UNTIL RECONCILED

**All Dimensions:**
- Average score >= 4.0 --> ANALYTICS DELIVERABLE IS TRUSTWORTHY
- Average score 3.5-3.9 --> INTERNAL USE ONLY, remediation plan required
- Average score < 3.5 --> NOT TRUSTWORTHY, do not share with stakeholders

**Credibility:**
- Any credibility failure condition triggered --> FULL RECONCILIATION REQUIRED

Scores must be stated explicitly before sharing any analytics deliverable.

### Score Card Template

```markdown
## Analytics Score: [Dashboard/Report/Analysis Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Metric Design Quality | /5 | |
| Dashboard Usability | /5 | |
| Statistical Validity | /5 | |
| Insight Actionability | /5 | |
| Data Storytelling | /5 | |
| Timeliness | /5 | |
| Self-Serve Adoption | /5 | |
| Reproducibility | /5 | |

**Average:** /5
**Hard Fail Check:** PASS / FAIL
**Credibility Check:** PASS / FAIL
**Verdict:** TRUSTWORTHY / INTERNAL ONLY / NOT TRUSTWORTHY / RECONCILIATION REQUIRED
**Blocking Issues:** [if any]
**Remediation Plan:** [if needed, with owner and deadline]
```

---

## SEVERITY CLASSIFICATION

### Critical (Cannot Share With Stakeholders)

- Two reports show different numbers for the same metric
- Metric definition not documented
- Conclusions drawn without statistical validity
- Manual data manipulation without audit trail
- Data staleness not labeled, decisions made on stale data
- Correlation presented as causation in executive presentation

### High (Must Fix Before Next Report)

- No confidence intervals on key metrics
- Dashboard load time >10 seconds
- No drill-down capability on summary metrics
- Insight without recommended action
- No metric owner identified
- Vanity metric presented as KPI

### Medium (Tracked, Fix Within Sprint)

- Self-serve adoption below 50%
- Data dictionary partially stale
- Some queries not version controlled
- No annotations on chart anomalies
- Goodhart's Law analysis not completed
- No counter-metrics defined

### Low (Improvement Backlog)

- Executive summary could be more concise
- Training materials need updating
- Historical baseline not established for new metrics
- Timezone handling inconsistent but low impact
- Feedback loop from users informal

---

## CONTINUOUS MONITORING REQUIREMENTS

After deployment, the following must be monitored continuously:

| Metric | Alert Threshold | Check Frequency |
|--------|----------------|-----------------|
| Dashboard load time | >5s | Every page load |
| Data freshness | >SLA | Continuous |
| Pipeline failures | Any failure | Real-time |
| Self-serve adoption rate | <40% | Monthly |
| User satisfaction | <3.5/5.0 | Quarterly |
| Metric definition changes | Any change | Per change |
| Cross-report consistency | Any discrepancy | Daily |
| Query performance | >30s execution | Per execution |

---

## THE SINGLE SOURCE OF TRUTH RULE

For every metric that appears in more than one place:

1. One and only one definition document exists
2. One and only one query produces the canonical number
3. All other dashboards/reports reference the canonical source
4. Any discrepancy is treated as a SEV-1 credibility incident
5. The canonical source owner is responsible for accuracy

Violating single source of truth is the fastest way to destroy
analytics credibility. Two different numbers = zero trust.

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Do not share analytics that are not trustworthy.
Remediate until standards are met.

A number without a definition is not a metric.
A metric without an owner is not managed.
A dashboard nobody trusts is not useful.

---

## END OF ANALYTICS SCORE
