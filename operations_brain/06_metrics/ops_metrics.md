# Operational Metrics -- Measuring What Matters

## Overview

Operational metrics are the quantitative measures that indicate the health,
efficiency, quality, and delivery performance of operational processes.
Without metrics, operations is guesswork. With metrics, operations is
science.

Deming: "In God we trust. All others must bring data."

This module defines the operational metrics framework organized by
category (efficiency, quality, delivery, financial), the balanced
scorecard approach, and the principles for selecting and using metrics
effectively.

---

## Efficiency Metrics

### Core Efficiency Measures

```
CYCLE TIME
Definition: Time to complete one unit of work from start to finish
Formula: End time - Start time (for one unit)
Target: Decreasing over time
Use: Identify slow processes, measure improvement

THROUGHPUT
Definition: Number of units completed per time period
Formula: Units completed / Time period
Target: Increasing (at constant or improving quality)
Use: Capacity planning, workload management

UTILIZATION
Definition: Proportion of available capacity actually used
Formula: Actual output / Maximum possible output
Target: 70-85% for people, 85-95% for systems
Warning: 100% utilization = no slack for improvement or surge
Use: Capacity planning, resource allocation

LEAD TIME
Definition: Total elapsed time from request to delivery
Formula: Delivery time - Request time
Target: Decreasing
Use: Customer experience, process improvement
Note: Lead time = Processing time + Wait time

FLOW EFFICIENCY
Definition: Proportion of lead time spent on value-added work
Formula: Processing time / Lead time
Target: >25% (world-class: >40%)
Use: Identifies how much time is wasted on waiting
Reality: Most organizations are 5-15%

WORK IN PROGRESS (WIP)
Definition: Number of items currently being processed
Formula: Count of open items in the system
Target: Within defined WIP limits
Use: Flow management, bottleneck detection
Little's Law: Lead Time = WIP / Throughput

TAKT TIME
Definition: Available production time / Customer demand rate
Example: 480 min/day / 48 units/day = 10 min per unit
Use: Sets the pace of production to match demand
If cycle time > takt time: Bottleneck exists
```

---

## Quality Metrics

### Core Quality Measures

```
DEFECTS PER MILLION OPPORTUNITIES (DPMO)
Definition: Number of defects per million opportunities for a defect
Formula: (Defects / (Units x Opportunities per unit)) x 1,000,000
Target: Depends on sigma level
  3 sigma: 66,800 DPMO
  4 sigma: 6,210 DPMO
  5 sigma: 230 DPMO
  6 sigma: 3.4 DPMO
Use: Six Sigma process capability

SIGMA LEVEL
Definition: Number of standard deviations between the process mean
           and the nearest specification limit
Conversion: See DPMO-to-sigma table above
Use: Universal quality language across processes

FIRST-PASS YIELD (FPY)
Definition: Percentage of units that pass through a process step
           correctly the first time (no rework)
Formula: (Units passing first time / Total units entering) x 100%
Target: >95% per step, >90% end-to-end
Use: Rework and waste identification

ROLLED THROUGHPUT YIELD (RTY)
Definition: Probability of a unit passing through ALL process steps
           without any rework
Formula: FPY_step1 x FPY_step2 x FPY_step3 x ...
Example: 95% x 98% x 92% = 85.6% RTY
Use: End-to-end quality assessment
Warning: Even high individual step yields compound to low RTY

COST OF POOR QUALITY (COPQ)
Definition: Total cost attributable to defects
Components:
  Internal failure: Rework, scrap, retesting
  External failure: Returns, warranty, complaints, lost customers
  Appraisal: Inspection, testing, auditing
  Prevention: Training, process design, quality planning
Target: <5% of revenue (many companies: 15-25%)
Use: Business case for quality improvement

CUSTOMER SATISFACTION (CSAT)
Definition: Survey-based measure of customer satisfaction
Scale: 1-5 or 1-10 (typically % rating 4-5 or 9-10)
Target: >80% satisfaction (top 2 box)
Use: Voice of the customer, quality proxy

NET PROMOTER SCORE (NPS)
Definition: % Promoters (9-10) minus % Detractors (0-6)
Range: -100 to +100
Target: >30 (good), >50 (excellent), >70 (world-class)
Use: Customer loyalty, word-of-mouth indicator
```

---

## Delivery Metrics

### Core Delivery Measures

```
ON-TIME DELIVERY (OTD)
Definition: Percentage of deliveries made by the promised date
Formula: (On-time deliveries / Total deliveries) x 100%
Target: >95%
Use: Customer reliability, planning effectiveness

LEAD TIME VARIABILITY
Definition: Standard deviation of lead time
Formula: StdDev of all lead time observations
Target: Decreasing (consistency matters as much as speed)
Use: Predictability, SLA confidence

ORDER ACCURACY
Definition: Percentage of orders delivered correctly
Formula: (Correct orders / Total orders) x 100%
Target: >99%
Use: Customer experience, process quality

DELIVERY RELIABILITY INDEX
Definition: Combined measure of OTD and order accuracy
Formula: OTD% x Accuracy%
Example: 96% x 99% = 95.04%
Target: >95%
Use: Holistic delivery performance

SLA COMPLIANCE
Definition: Percentage of service level agreements met
Formula: (SLAs met / Total SLAs) x 100%
Target: >99% for critical SLAs
Use: Contractual compliance, customer trust
```

---

## Financial Metrics for Operations

```
COST PER UNIT
Definition: Total operational cost / Units produced or processed
Target: Decreasing over time
Use: Efficiency tracking, pricing decisions

COST PER TRANSACTION
Definition: Total cost of completing one transaction
Components: Labor + Technology + Overhead + Error correction
Target: Decreasing
Use: Process efficiency, automation ROI

REVENUE PER EMPLOYEE
Definition: Total revenue / Number of employees
Target: Increasing
Benchmarks: $150K-$400K for SaaS (varies by stage)
Use: Organizational efficiency

OPERATING MARGIN
Definition: (Revenue - Operating expenses) / Revenue
Target: Improving over time
Use: Business health, operational efficiency contribution

COST OF GOODS SOLD (COGS) RATIO
Definition: COGS / Revenue
Target: Decreasing (improving gross margin)
For SaaS: Includes hosting, support, implementation costs
Use: Unit economics, pricing
```

---

## Balanced Scorecard (Kaplan & Norton)

### The Four Perspectives

The balanced scorecard prevents overemphasis on any single metric category:

```
BALANCED SCORECARD
+--------------------------------------------------+
| FINANCIAL PERSPECTIVE                            |
| "How do we look to shareholders?"               |
| - Revenue growth                                 |
| - Operating margin                               |
| - Cost reduction                                 |
| - ROI on operational investments                 |
+--------------------------------------------------+
| CUSTOMER PERSPECTIVE                             |
| "How do customers see us?"                       |
| - On-time delivery                               |
| - Quality (NPS, CSAT, defect rate)              |
| - Lead time                                      |
| - Price competitiveness                          |
+--------------------------------------------------+
| INTERNAL PROCESS PERSPECTIVE                     |
| "What must we excel at?"                         |
| - Cycle time                                     |
| - First-pass yield                               |
| - Throughput                                     |
| - Automation rate                                |
+--------------------------------------------------+
| LEARNING AND GROWTH PERSPECTIVE                  |
| "Can we continue to improve?"                    |
| - Employee training hours                        |
| - Process improvement rate                       |
| - Knowledge management effectiveness            |
| - Technology adoption                            |
+--------------------------------------------------+
```

### Building an Operational Balanced Scorecard

```
OPERATIONS BALANCED SCORECARD TEMPLATE
+----------------+-----------------+----------+--------+
| Perspective    | Metric          | Target   | Actual |
+----------------+-----------------+----------+--------+
| Financial      | Cost per unit   | $[X]     | $[X]   |
|                | Operating margin| [X]%     | [X]%   |
+----------------+-----------------+----------+--------+
| Customer       | On-time delivery| >95%     | [X]%   |
|                | NPS             | >50      | [X]    |
|                | Lead time       | <[X] days| [X] d  |
+----------------+-----------------+----------+--------+
| Process        | Cycle time      | <[X] min | [X] m  |
|                | First-pass yield| >95%     | [X]%   |
|                | Throughput      | [X]/day  | [X]    |
+----------------+-----------------+----------+--------+
| Learning       | Improvements/Q  | [X]      | [X]    |
|                | Training hours  | [X]/yr   | [X]    |
|                | Automation rate | [X]%     | [X]%   |
+----------------+-----------------+----------+--------+
```

---

## Metric Design Principles

### The SMART Criteria for Metrics

```
S - SPECIFIC: Clearly defined, no ambiguity
M - MEASURABLE: Can be quantified objectively
A - ACTIONABLE: Team can influence the metric
R - RELEVANT: Connected to business outcomes
T - TIMELY: Available when needed for decisions
```

### Metric Anti-Patterns

| Anti-Pattern | Description | Fix |
|-------------|------------|-----|
| Vanity metrics | Looks good but does not drive decisions | Focus on actionable metrics |
| Too many metrics | Dashboard overwhelm, no focus | 5-7 key metrics per level |
| Lagging only | Only measuring outcomes, not drivers | Balance leading and lagging |
| Gaming | People optimize the metric at expense of outcome | Pair metrics, audit regularly |
| No baseline | Target without knowing current state | Measure baseline first |
| No target | Measuring without a goal | Every metric has a target |
| No action | Tracking metrics but not acting on them | Every metric review produces actions |

### Leading vs. Lagging Indicators

```
LEADING INDICATORS (predictive):
- Pipeline velocity --> Predicts future revenue
- Sprint velocity --> Predicts delivery date
- Employee engagement --> Predicts retention
- Code quality metrics --> Predicts defect rate

LAGGING INDICATORS (outcome):
- Revenue
- Customer churn
- Defect rate
- Employee turnover

RULE: Track both. Lead with leading indicators (proactive).
      Confirm with lagging indicators (verification).
```

---

## Operational Dashboard Design

```
EXECUTIVE OPS DASHBOARD (5-second scan):
+--------------------------------------------------+
| THROUGHPUT: [X] units/day  [trend arrow]         |
| QUALITY: [X]% first-pass   [trend arrow]        |
| DELIVERY: [X]% on-time     [trend arrow]        |
| COST: $[X] per unit        [trend arrow]        |
| HEALTH: [GREEN/YELLOW/RED]                       |
+--------------------------------------------------+

COLOR CODING:
GREEN: Within 10% of target
YELLOW: 10-25% below target
RED: >25% below target or trending wrong for 3+ periods

EVERY RED METRIC:
- Has a named owner
- Has a root cause hypothesis
- Has an action plan with deadline
```

---

**Operational metrics transform operations from art to science. The
Operations Brain measures efficiency, quality, delivery, and financial
performance using the balanced scorecard approach, always pairing
leading indicators with lagging outcomes, and ensuring every metric
drives action.**
