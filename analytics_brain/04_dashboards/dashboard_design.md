# Dashboard Design — Information Architecture for Decision-Making

---

## Overview

A dashboard is not a collection of charts. It is an information product designed to answer specific questions for a specific audience at a specific cadence. Effective dashboards compress complex data into actionable intelligence; ineffective dashboards create visual noise that erodes trust and wastes attention.

This module codifies the principles of dashboard design, drawing from information architecture, Tufte's visualization science, user interface design, and the operational reality of how organizations actually use dashboards. The standard: every dashboard must pass the five-second test — a viewer should grasp the primary message within five seconds of opening it.

---

## Dashboard Taxonomy

### By Audience and Purpose

**Strategic Dashboards**
- **Audience:** Executives, board members, investors
- **Purpose:** Monitor high-level business health and strategic progress
- **Cadence:** Weekly or monthly review
- **Characteristics:** Few metrics (5-8), high-level aggregation, heavy context (targets, benchmarks, trends), minimal interactivity
- **Design principle:** Answer "Are we on track?" in 5 seconds

**Tactical Dashboards**
- **Audience:** Department heads, team leads
- **Purpose:** Monitor team-level KPIs and identify areas requiring attention
- **Cadence:** Daily or weekly review
- **Characteristics:** Moderate metrics (8-15), segment-level breakdowns, drill-down capability, alert indicators
- **Design principle:** Answer "Where should I focus?" in 10 seconds

**Operational Dashboards**
- **Audience:** Individual contributors, operators, on-call engineers
- **Purpose:** Monitor real-time system health and trigger immediate action
- **Cadence:** Continuous or hourly
- **Characteristics:** Real-time or near-real-time data, threshold-based alerts, high granularity, auto-refresh
- **Design principle:** Answer "Is something broken right now?" immediately

**Analytical Dashboards**
- **Audience:** Analysts, data scientists, product managers
- **Purpose:** Enable exploration and hypothesis testing
- **Cadence:** Ad-hoc
- **Characteristics:** High interactivity (filters, parameters, date ranges), multiple visualization types, raw data access, export capability
- **Design principle:** Support "Let me investigate..." workflows

---

## Information Hierarchy

### The Inverted Pyramid

Borrowed from journalism, the inverted pyramid structures information from most important to least important:

```
┌─────────────────────────────────────────────────────┐
│                   HEADLINE                           │ ← Primary KPIs
│              (Most important info)                   │    (the answer)
├─────────────────────────────────────────────────────┤
│              SUPPORTING CONTEXT                      │ ← Trends, comparisons
│         (Why does the headline matter?)              │    (the context)
├─────────────────────────────────────────────────────┤
│                DETAIL                                │ ← Segment breakdowns
│        (Evidence and decomposition)                  │    (the evidence)
├─────────────────────────────────────────────────────┤
│           EXPLORATION                                │ ← Interactive filters
│     (Self-serve investigation)                       │    (the deep dive)
└─────────────────────────────────────────────────────┘
```

### Visual Weight and Position

The human eye is drawn to elements with the most visual weight. Use this to establish hierarchy:

**High visual weight (use for primary metrics):**
- Large font size
- Bold or heavy font weight
- High-contrast color
- Top-left position (F-pattern scanning)
- Isolated in white space

**Low visual weight (use for supporting context):**
- Smaller font size
- Regular font weight
- Muted color
- Lower or right position
- Grouped with other elements

### The Dashboard Layout Grid

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│   KPI Tile   │   KPI Tile   │   KPI Tile   │   KPI Tile   │  Row 1: Headline
│   Revenue    │   Users      │   Retention  │   NPS        │  (Primary KPIs)
├──────────────┴──────────────┼──────────────┴──────────────┤
│                             │                             │  Row 2: Context
│   Revenue Trend (Line)      │   User Growth (Line)        │  (Trend charts)
│                             │                             │
├──────────────┬──────────────┼──────────────┬──────────────┤
│  Revenue by  │  Revenue by  │  Users by    │  Retention   │  Row 3: Detail
│  Segment     │  Channel     │  Platform    │  by Cohort   │  (Breakdowns)
├──────────────┴──────────────┴──────────────┴──────────────┤
│                                                           │  Row 4: Exploration
│   Filters: Date Range | Segment | Platform | Geography    │  (Interactive)
└───────────────────────────────────────────────────────────┘
```

---

## KPI Tile Design

### Anatomy of an Effective KPI Tile

A KPI tile is the most common dashboard element. It must communicate the current state of a metric in minimal space.

```
┌─────────────────────────────────────┐
│  Monthly Active Users               │ ← Metric name (clear, unambiguous)
│                                     │
│  127,342                            │ ← Current value (large, prominent)
│  ▲ 12.3% vs last month             │ ← Comparison (direction + magnitude)
│  Target: 130,000                    │ ← Context (benchmark or target)
│  ───────── trend sparkline ──────── │ ← Visual trend (6-12 periods)
└─────────────────────────────────────┘
```

**Required elements:**
1. **Metric name** — Unambiguous, matching the metric specification
2. **Current value** — The number, formatted appropriately (abbreviations for large numbers: 127K, $1.2M)
3. **Comparison** — Period-over-period change with direction indicator (arrow, color)
4. **Context** — Target, benchmark, or forecast for reference
5. **Trend** — A sparkline showing recent history (Tufte's high-density micro-visualization)

**Status encoding:**
- Green: On-track (within acceptable range of target)
- Yellow: At-risk (trending toward miss or within warning threshold)
- Red: Off-track (below threshold or target missed)
- Gray: No data or target not set

### KPI Tile Anti-Patterns

**Giant numbers with no context:** "1,247,893" means nothing without comparison, trend, and target.

**Too many tiles:** More than 6-8 KPI tiles on a single view creates cognitive overload. Prioritize ruthlessly.

**Inconsistent comparison periods:** One tile shows WoW, another shows MoM, another shows YoY. Use a consistent comparison period across the top-level view.

---

## Chart Design for Dashboards

### Chart-Dashboard Integration Rules

**Rule 1: One chart, one question**
Each chart should answer a single analytical question. "Revenue over time by segment by channel by geography" is four questions — use four charts or progressive drill-down.

**Rule 2: Consistent time axes**
All time-series charts on the same dashboard should share the same time range and granularity. Inconsistent time axes make visual comparison across charts impossible.

**Rule 3: Consistent color encoding**
If "Enterprise" is blue in Chart 1, it must be blue in every chart on the dashboard. Color semantics must be global, not chart-local.

**Rule 4: Direct labeling over legends**
Label data directly on the chart (end-of-line labels for time series, bar labels for bar charts) rather than using a separate legend. Legends force the eye to shuttle between the chart and the key, increasing cognitive load.

**Rule 5: De-emphasize non-data elements**
Grid lines should be light gray, axes should be thin, borders should be minimal. The data marks should be the most visually prominent elements.

### Recommended Dashboard Chart Types

| Purpose | Chart Type | Why |
|---------|-----------|-----|
| KPI with trend | Sparkline in KPI tile | Maximum density, minimal space |
| Trend over time | Line chart | Optimal for continuous temporal data |
| Category comparison | Horizontal bar (sorted) | Position encoding, easy to scan |
| Part-to-whole | Stacked bar or waffle | Avoids pie chart angle-decoding problems |
| Distribution | Histogram or box plot | Shows shape, not just summary |
| Correlation | Scatter plot | Position × position = highest accuracy encoding |
| Geographic | Choropleth or symbol map | Spatial patterns immediately visible |
| Retention | Heatmap matrix | Color-coded cohort table |
| Funnel | Horizontal funnel bars | Volume and drop-off visible simultaneously |

---

## Interactivity Design

### The Progressive Disclosure Principle

Dashboards should provide the answer first and the investigation tools second. Interactivity supports exploration, not comprehension.

**Tier 1: Visible by default**
Primary KPIs, trend charts, top-level breakdowns. No interaction required.

**Tier 2: One click away**
Segment filters, date range selectors, drill-down into chart details.

**Tier 3: Two clicks away**
Cross-tab analysis, cohort breakdowns, raw data tables, export to CSV.

### Filter Design

**Global filters** apply to the entire dashboard:
- Date range (with presets: Last 7 days, Last 30 days, This quarter, Custom)
- Primary segment dimension (Geography, Platform, Plan)

**Local filters** apply to individual charts:
- Metric selector (within a multi-metric chart)
- Dimension selector (change the grouping variable)

**Filter state management:**
- Filters should be persistent within a session (do not reset on refresh)
- Default filter state should show the most commonly needed view
- Current filter state should be visible at all times (no hidden filters)

### Drill-Down Architecture

```
Level 0: Company-wide KPIs          → "Revenue is $1.2M this month"
  │
  └─ Click on Revenue KPI
     │
Level 1: Revenue by segment         → "Enterprise is 60%, SMB is 40%"
  │
  └─ Click on Enterprise segment
     │
Level 2: Enterprise revenue detail  → "Top 10 accounts, new vs. expansion"
  │
  └─ Click on specific account
     │
Level 3: Account detail             → "Contract value, usage, health score"
```

---

## Refresh Cadence

### Matching Data Freshness to Decision Speed

| Dashboard Type | Decision Cadence | Data Freshness | Refresh Frequency |
|---------------|-----------------|----------------|-------------------|
| Board/Investor | Quarterly | End-of-period | Monthly batch |
| Executive | Weekly | Previous day | Daily at 6am |
| Team/Tactical | Daily | Previous day | Daily at 6am |
| Campaign | Daily | Previous day or real-time | Daily or streaming |
| Operational | Minutes | Real-time | Streaming or 1-5 min |
| Incident | Seconds | Real-time | Streaming |

### Freshness Indicators

Every dashboard should display:
- **Last updated:** Timestamp of most recent data
- **Data coverage:** "Showing data through [date]"
- **Freshness alert:** Warning if data is older than expected

---

## Dashboard Development Process

### Phase 1: Requirements (Week 1)
1. **Identify the audience:** Who will use this dashboard? What decisions do they make?
2. **Define the questions:** What specific questions should this dashboard answer?
3. **Catalog the metrics:** What metrics are needed? Do they exist? Are they well-defined?
4. **Determine cadence:** How often will this be reviewed? What freshness is needed?
5. **Map data sources:** Where does the data come from? Is it reliable?

### Phase 2: Wireframe (Week 2)
1. **Sketch the layout:** Use the inverted pyramid. Place primary KPIs top-left.
2. **Select chart types:** Match each question to the optimal chart type (Cleveland-McGill).
3. **Design interactions:** What filters, drill-downs, and navigation are needed?
4. **Review with stakeholders:** Present the wireframe, validate priorities.

### Phase 3: Build (Weeks 3-4)
1. **Verify data quality:** Spot-check all metrics against known values.
2. **Build in the BI tool:** Implement the wireframed design.
3. **Add context:** Targets, benchmarks, annotations, definitions.
4. **Implement interactivity:** Filters, drill-downs, conditional formatting.

### Phase 4: Validate (Week 5)
1. **Five-second test:** Can the audience identify the primary message in 5 seconds?
2. **Accuracy audit:** Cross-check dashboard numbers against source data.
3. **Usability test:** Watch 2-3 target users interact with the dashboard. Note confusion points.
4. **Edge case testing:** What happens with zero data? With extreme outliers? With missing segments?

### Phase 5: Launch and Iterate (Week 6+)
1. **Document:** Write a dashboard user guide: what each metric means, how to interpret it, known limitations.
2. **Train:** Walk the audience through the dashboard in a live session.
3. **Monitor usage:** Track dashboard views, filter usage, and drill-down patterns.
4. **Iterate:** Based on usage patterns and feedback, refine layout and content quarterly.

---

## Dashboard Anti-Patterns

### The Frankenstein Dashboard
Charts from different analyses stitched together without a coherent narrative. Each chart answers a different question at a different granularity on a different time range. The viewer cannot build a mental model.

### The Wallpaper Dashboard
Beautiful but unused. Created once for a specific presentation, bookmarked by many, opened by none. If a dashboard is not driving regular decisions, it should be deprecated.

### The Everything Dashboard
Attempts to answer every possible question on a single screen. 30+ charts, multiple scroll pages, conflicting filters. The result: no question is answered well.

### The Stale Dashboard
Data is days or weeks old, but the interface looks current. Stale data presented as fresh is worse than no data at all — it creates false confidence.

### The Unvalidated Dashboard
Numbers have never been verified against source data. Quietly wrong for months until someone notices an impossible value. Every dashboard metric must be validated before launch and audited quarterly.

---

**A dashboard is a decision-making tool. If it does not change decisions, it does not deserve screen real estate. Design for action, not admiration.**
