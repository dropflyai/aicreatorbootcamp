# Data Visualization — Principles, Grammar, and Storytelling

## Overview

Data visualization is the translation of quantitative information into visual form
to reveal patterns, communicate findings, and drive decisions. Effective visualization
requires understanding perceptual psychology, the grammar of graphics, chart selection
heuristics, dashboard design principles, and the narrative structure that transforms
charts into stories. A chart that is beautiful but misleading is worse than no chart.

References: Tufte (The Visual Display of Quantitative Information, 2nd ed.),
Wilkinson (The Grammar of Graphics), Nussbaumer Knaflic (Storytelling with Data),
Cleveland & McGill (Graphical Perception), Few (Information Dashboard Design),
Munzner (Visualization Analysis & Design).

---

## Perceptual Foundations

### Cleveland & McGill's Accuracy Ranking

Humans decode visual encodings with varying accuracy (most to least accurate):

```
1. Position on a common scale     (scatter, bar chart)
2. Position on non-aligned scales (small multiples)
3. Length                          (bar chart)
4. Direction / Angle              (slope chart)
5. Area                           (bubble chart)
6. Volume                         (3D bar -- avoid)
7. Curvature                      (rare)
8. Shading / Color saturation     (heatmap)
```

Implication: prefer encodings higher in this hierarchy.
Position on a common scale (bar charts, dot plots) is almost always superior
to area (pie charts) or color saturation (heatmaps) for quantitative comparison.

### Pre-Attentive Attributes

Visual properties processed in < 250ms without focused attention:

| Attribute | Use For |
|-----------|---------|
| Color hue | Categorical distinction (max 7-8 categories) |
| Color intensity | Sequential/continuous values |
| Position | Quantitative comparison |
| Size | Magnitude (use area, not radius) |
| Orientation | Categorical/directional |
| Shape | Categorical (max 5-6 shapes) |
| Motion | Drawing attention (use sparingly) |

### Gestalt Principles

- **Proximity**: objects close together are perceived as grouped
- **Similarity**: objects with shared visual properties are grouped
- **Enclosure**: objects within a boundary are grouped
- **Connection**: objects linked by a line are related
- **Continuity**: the eye follows smooth paths

Use these to create visual hierarchy without explicit labels.

---

## Tufte's Principles

### Data-Ink Ratio

```
Data-Ink Ratio = Ink used to display data / Total ink used

Maximize data-ink ratio: remove all non-data ink that is not essential.
```

### Chartjunk to Eliminate

- Grid lines (reduce to light gray or remove)
- Unnecessary borders and boxes
- Decorative elements (3D effects, gradients, clip art)
- Redundant labels (axis label + title saying the same thing)
- Unnecessary legend (label lines directly instead)
- Moiré patterns and heavy shading

### Lie Factor

```
Lie Factor = (Size of effect shown in graphic) / (Size of effect in data)

Lie Factor should equal 1.0.
Lie Factor > 1.05 or < 0.95 is distortion.
```

Common distortions:
- Truncated y-axis exaggerates differences
- Area encoding with radius instead of area (circles look 4x too big)
- Dual y-axes with different scales create false correlations

### Small Multiples

"At the heart of quantitative reasoning is a single question: Compared to what?"
-- Edward Tufte

Small multiples = same chart repeated for each category, on shared axes.
- Enables comparison across categories
- Eliminates overlapping lines on a single chart
- Better than animation (all data visible simultaneously)

### Sparklines

Word-sized graphics embedded in text or tables:

```
Revenue (Q1-Q4): [/\/\] $1.2M -> $1.8M (+50%)
Churn:           [\/\_] 5.2% -> 3.1%  (-40%)
```

Dense, contextual, and uncluttered.

---

## Chart Selection Framework

### By Data Relationship

| Relationship | Chart Type | When to Use |
|-------------|-----------|-------------|
| Comparison | Bar chart (vertical) | Comparing categories |
| Comparison | Bar chart (horizontal) | Long category labels |
| Trend | Line chart | Time series, continuous |
| Trend | Area chart | Stacked composition over time |
| Distribution | Histogram | Single variable distribution |
| Distribution | Box plot / Violin | Compare distributions across groups |
| Distribution | Density plot | Smooth distribution estimate |
| Composition | Stacked bar (100%) | Part-to-whole across categories |
| Composition | Treemap | Hierarchical part-to-whole |
| Relationship | Scatter plot | Two continuous variables |
| Relationship | Heatmap | Matrix of values (correlation) |
| Geospatial | Choropleth | Values by geographic region |
| Flow | Sankey diagram | Flow between stages |
| Network | Node-link diagram | Relationships between entities |

### Charts to Avoid

| Chart | Problem | Better Alternative |
|-------|---------|-------------------|
| Pie chart | Area perception is poor | Horizontal bar chart |
| 3D bar chart | Perspective distortion | 2D bar chart |
| Dual y-axis | Implies false correlation | Two separate charts |
| Stacked area | Hard to read middle layers | Small multiples of lines |
| Radar chart | Arbitrary axis ordering | Grouped bar chart |
| Word cloud | No quantitative precision | Ranked bar chart |
| Donut chart | Same issues as pie chart | Bar chart |

### Decision Tree

```
What is your message?
├── Comparison across categories?
│   ├── Few categories (< 7): Vertical bar chart
│   └── Many categories (7+): Horizontal bar chart
├── Change over time?
│   ├── Single series: Line chart
│   ├── Multiple series (< 5): Multi-line chart
│   └── Multiple series (5+): Small multiples
├── Part of a whole?
│   ├── Single time point: Stacked bar or treemap
│   └── Over time: Stacked area or 100% stacked bar
├── Distribution?
│   ├── Single group: Histogram or density
│   └── Compare groups: Box plot, violin, or ridgeline
├── Correlation?
│   └── Scatter plot (add color/size for 3rd/4th variable)
└── Geographic?
    └── Choropleth or symbol map
```

---

## Color Theory for Data

### Sequential Palettes

For continuous numeric data (low to high):
- Single hue: light to dark (e.g., light blue to dark blue)
- Multi-hue: perceptually uniform (e.g., viridis, magma)
- Avoid rainbow: not perceptually uniform, misleading

### Diverging Palettes

For data with a meaningful center point:
- Two hues diverging from a neutral center (e.g., blue-white-red)
- Use when zero, average, or target is meaningful

### Categorical Palettes

For discrete, unordered categories:
- Maximum 7-8 distinct colors
- Colorblind-safe palettes: use ColorBrewer, Tableau 10
- Avoid green + red together (8% of men are red-green colorblind)

### Accessibility

- Test with colorblind simulators (Coblis, Viz Palette)
- Use shape and pattern in addition to color
- Ensure sufficient contrast ratio (WCAG 2.1: 4.5:1 for text)
- Provide alt text for embedded charts
- Use direct labels instead of legends when possible

---

## Dashboard Design

### Dashboard Types

| Type | Purpose | Refresh | Audience |
|------|---------|---------|----------|
| Operational | Monitor real-time status | Seconds-minutes | Ops team |
| Analytical | Explore trends and patterns | Hourly-daily | Analysts |
| Strategic | Track KPIs against goals | Weekly-monthly | Executives |

### Layout Principles

1. **Inverted pyramid**: most important metric at top-left
2. **Z-pattern**: readers scan left-to-right, top-to-bottom
3. **Progressive disclosure**: summary > detail > raw data
4. **5-second test**: primary message understood in 5 seconds

### Information Hierarchy

```
Level 1: KPI cards (big number + trend arrow + sparkline)
Level 2: Summary charts (2-3 charts that explain the KPIs)
Level 3: Detail tables (filterable, sortable, exportable)
Level 4: Drill-through (link to detailed analysis)
```

### Common Dashboard Mistakes

- Too many charts (aim for 5-7 max per view)
- No clear hierarchy (everything at the same visual weight)
- Missing context (no targets, benchmarks, or comparisons)
- Overuse of color (neon, gradients, unnecessary highlighting)
- No actionability (shows what happened, not what to do)
- Stale data without freshness indicator

---

## Storytelling with Data (Nussbaumer Knaflic)

### Six Lessons

1. **Understand the context**: Who is the audience? What do they need to do?
2. **Choose an appropriate display**: Match chart type to message
3. **Eliminate clutter**: Remove everything that does not support the message
4. **Focus attention**: Use color, size, and position to guide the eye
5. **Think like a designer**: Alignment, white space, consistency
6. **Tell a story**: Setup (context), conflict (problem), resolution (recommendation)

### Narrative Arc for Data Presentations

```
1. SETUP (Context)
   "Our customer acquisition cost has been rising for 3 quarters."
   [Line chart showing CAC trend]

2. CONFLICT (Insight)
   "Paid channels are 3x more expensive than organic, and paid share
    is growing from 40% to 65% of new customers."
   [Stacked bar chart: organic vs paid acquisition]

3. RESOLUTION (Recommendation)
   "If we invest $200K in SEO content, we project organic share
    returning to 55%, reducing blended CAC by 25%."
   [Scenario comparison: current vs proposed]
```

### Annotation Best Practices

- Label the most important data points directly on the chart
- Add context annotations ("launched feature X here")
- Use callout boxes for key insights
- Bold the single most important number
- State the "so what" in the chart title (not just "Revenue by Quarter")

### Title as Headline

```
Bad:   "Monthly Active Users"
Good:  "Monthly Active Users grew 23% after onboarding redesign"
Best:  "Onboarding redesign drove 23% MAU growth -- recommend scaling to mobile"
```

---

## Tools Landscape

| Tool | Type | Best For |
|------|------|----------|
| Looker / LookML | BI + semantic layer | Governed self-serve analytics |
| Tableau | BI | Visual exploration, publishing |
| Power BI | BI | Microsoft ecosystem integration |
| Metabase | BI (open source) | Quick setup, SQL-first |
| Apache Superset | BI (open source) | Python ecosystem |
| Sigma Computing | BI (spreadsheet-like) | Business users, collaboration |
| Observable | Notebooks | Custom, code-driven viz |
| D3.js | Library | Custom interactive web viz |
| Plotly / Dash | Library + framework | Python-first dashboards |
| Matplotlib / Seaborn | Library | Publication-quality static |
| ggplot2 | Library (R) | Grammar of graphics, research |

---

## Visualization Review Checklist

- [ ] Chart type matches the data relationship and message
- [ ] Title states the insight, not just the metric name
- [ ] Axes labeled with units, starting at zero for bar charts
- [ ] Color used purposefully (not decoratively)
- [ ] Colorblind accessible (tested with simulator)
- [ ] Data-ink ratio maximized (no chartjunk)
- [ ] Lie factor = 1.0 (no distortion)
- [ ] Context provided (benchmarks, targets, time comparisons)
- [ ] Legend eliminated where possible (direct labels preferred)
- [ ] Annotations highlight key insights
- [ ] Source and freshness timestamp included
- [ ] Responsive to screen size if web-based
