# KPI Design — Objectives, Scorecards, and Target Setting

---

## Overview

Key Performance Indicators (KPIs) are the operational translation of strategy into measurement. While the North Star Metric captures the organization's singular value proposition, KPIs distribute accountability across teams, functions, and time horizons. This module covers three complementary KPI frameworks — OKRs, the Balanced Scorecard, and KPI hierarchies — along with the science and art of target setting.

KPI design is where strategy meets execution. A well-designed KPI system makes strategic priorities legible to every team member. A poorly designed one creates perverse incentives, wastes attention, and divorces daily work from strategic intent.

---

## OKRs (Objectives and Key Results)

### Origin and Theory

Developed by Andy Grove at Intel (1970s), popularized by John Doerr at Google (1999), and now the dominant goal-setting framework in technology companies. The core insight: separate the qualitative ambition (Objective) from the quantitative evidence of achievement (Key Results).

### Structure

```
OBJECTIVE: [Qualitative, inspirational, time-bound statement]
  KR1: [Quantitative metric] from [baseline] to [target]
  KR2: [Quantitative metric] from [baseline] to [target]
  KR3: [Quantitative metric] from [baseline] to [target]
```

**Objective rules:**
- Qualitative and inspirational — states what the team wants to achieve
- Directional and time-bound — typically quarterly
- Ambitious but achievable — Google's standard: 70% achievement = success
- No more than 3-5 Objectives per team per quarter

**Key Result rules:**
- Quantitative — must be measurable with no ambiguity
- Outcome-focused — measures results, not activities ("Increase retention to 45%" not "Launch 3 retention features")
- 2-5 Key Results per Objective
- Each KR has a baseline (starting value), target (ending value), and data source
- Progress is measurable at any point during the quarter

### OKR Anti-Patterns

**Anti-Pattern 1: Task Lists Disguised as OKRs**
```
BAD:  KR: "Launch redesigned onboarding flow"
GOOD: KR: "Increase onboarding completion rate from 34% to 55%"
```
The first is a task (output). The second is an outcome that the task might produce. OKRs measure outcomes.

**Anti-Pattern 2: Sandbagging**
Teams set easily achievable targets to guarantee 100% completion. This defeats the purpose — OKRs should be aspirational. Google's scoring system (0.0-1.0, with 0.7 being "green") explicitly accounts for ambitious target-setting.

**Anti-Pattern 3: OKR Proliferation**
20 Objectives with 60 Key Results across the company. No one remembers them, no one reviews them, and they become a quarterly bureaucratic exercise rather than an alignment tool. Limit to 3-5 Objectives per team.

**Anti-Pattern 4: Coupling OKRs to Compensation**
When OKR achievement directly determines bonuses, teams sandbag targets and avoid ambitious bets. OKRs should inform performance conversations but not mechanistically determine pay.

**Anti-Pattern 5: Measuring KR Progress as Binary**
A KR is not pass/fail. "Increase retention from 30% to 40%" scored at 35% is 50% achievement — meaningful progress worth acknowledging and learning from.

### OKR Scoring

```
Score 0.0 - 0.3: No meaningful progress
Score 0.4 - 0.6: Significant progress but missed the target
Score 0.7 - 1.0: Substantial achievement (0.7 = healthy for stretch goals)
Score 1.0:        Full achievement (may indicate sandbagged target)
```

**Healthy distribution across a portfolio of KRs:** Average score of 0.6-0.7 indicates appropriately ambitious targets.

---

## Balanced Scorecard

### Origin and Theory

Developed by Robert Kaplan and David Norton (1992, Harvard Business Review), the Balanced Scorecard addresses a fundamental limitation of financial-only metrics: they are lagging indicators of past performance, not leading indicators of future value creation.

The Balanced Scorecard adds three non-financial perspectives to create a comprehensive measurement system:

### Four Perspectives

```
┌─────────────────────────────────────────────────┐
│                   FINANCIAL                      │
│  "How do we look to shareholders?"               │
│  Revenue Growth, Profitability, Cash Flow, ROI   │
└──────────────────────┬──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│                      │                           │
│   CUSTOMER           │          INTERNAL         │
│   "How do customers  │          PROCESS          │
│    see us?"          │   "What must we excel at?"│
│   NPS, CSAT, NRR,   │   Cycle Time, Quality,    │
│   Retention, Share   │   Efficiency, Innovation  │
│                      │                           │
└──────────┬───────────┼───────────┬──────────────┘
           │           │           │
           └───────────┼───────────┘
                       │
┌──────────────────────┴──────────────────────────┐
│              LEARNING & GROWTH                   │
│  "Can we continue to improve and create value?"  │
│  Employee Satisfaction, Skill Development,        │
│  Technology Capability, Innovation Pipeline       │
└─────────────────────────────────────────────────┘
```

### Strategy Maps

Kaplan and Norton extended the Balanced Scorecard with Strategy Maps — visual representations of cause-and-effect relationships between objectives across the four perspectives.

```
Financial:      Increase Revenue ←──────────────── Improve Margins
                       ↑                                  ↑
Customer:       Increase Retention ←──── Improve Satisfaction
                       ↑                          ↑
Process:        Reduce Time-to-Value ←── Improve Onboarding
                       ↑                          ↑
Learning:       Train Support Team ←──── Invest in Analytics
```

The strategy map makes the strategic hypothesis explicit: "If we invest in analytics capabilities (Learning), we will improve our onboarding process (Process), which will improve customer satisfaction (Customer), which will increase retention and revenue (Financial)."

### Balanced Scorecard for Technology Companies

| Perspective | Traditional Metrics | Technology Company Adaptation |
|------------|-------------------|------------------------------|
| Financial | Revenue, Margin, ROI | MRR, ARR, LTV:CAC, Burn Rate, Rule of 40 |
| Customer | Satisfaction, Loyalty, Share | NPS, NRR, DAU/MAU, Time-to-Value |
| Process | Cycle Time, Quality, Cost | Deploy Frequency, MTTR, Incident Rate, Sprint Velocity |
| Learning | Training Hours, Patents | Eng Satisfaction, Tech Debt Ratio, Experimentation Velocity |

---

## KPI Hierarchies

### The Cascade Model

KPIs cascade from company-level through business unit, team, and individual levels. Each level translates the parent's KPIs into more granular, more actionable metrics.

```
Company Level:    ARR, NRR, NPS, Rule of 40
                     │
Business Unit:    Revenue by Segment, CAC by Channel, Retention by Cohort
                     │
Team Level:       Activation Rate (Growth), Feature Adoption (Product),
                  Response Time (Support), Deploy Frequency (Engineering)
                     │
Individual:       Tasks Completed, Code Review Turnaround, Tickets Resolved
```

### Cascade Design Principles

**1. Vertical Alignment**
Every team KPI must demonstrably connect to a company KPI. If a team cannot explain how their metric impacts the business, the metric is suspect.

**2. Horizontal Coordination**
Teams with shared dependencies must have compatible KPIs. If Marketing is measured on lead volume and Sales is measured on lead quality, the misalignment will produce conflict.

**3. Level-Appropriate Granularity**
Board-level KPIs: 5-7 metrics, quarterly cadence, strategic scope.
Team-level KPIs: 3-5 metrics, weekly cadence, operational scope.
Individual metrics: 1-3 metrics, daily/sprint cadence, task scope.

**4. Ratio of Leading to Lagging**
- Company level: 30% leading, 70% lagging (accountability-focused)
- Team level: 60% leading, 40% lagging (action-focused)
- Individual level: 80% leading, 20% lagging (effort-focused)

---

## Target Setting

### The Science of Good Targets

Target setting is neither arbitrary nor purely aspirational. Effective targets are grounded in data and calibrated to organizational context.

### Target-Setting Methods

**1. Historical Baseline + Growth Rate**
```
Target = Current_Value * (1 + Expected_Growth_Rate)
```
Use when: historical data is available and the growth trajectory is established.
Limitation: anchors to past performance, which may not reflect future potential.

**2. Benchmarking**
```
Target = Industry_Benchmark_Percentile(P50, P75, or P90)
```
Use when: reliable industry benchmarks are available.
Sources: ProfitWell (SaaS metrics), First Round Capital (startup benchmarks), Amplitude (product benchmarks), SaaS Capital, OpenView Partners.
Limitation: benchmarks are often self-reported, survivorship-biased, and segment-dependent.

**3. Bottom-Up Modeling**
```
Target = Sum(Team_Contributions) based on planned initiatives
```
Use when: specific initiatives are planned with estimated impact.
Limitation: initiative-level impact estimates are notoriously uncertain. Apply haircut factors (typically 50-70% of estimated impact materializes).

**4. Top-Down Constraint**
```
Target = Value required by business plan or investor commitment
```
Use when: the target is non-negotiable (e.g., revenue target for the funding round).
Limitation: may produce impossible targets if disconnected from operational reality.

**5. Statistical Forecasting**
```
Target = Forecast(Model, confidence_level) + Stretch_Factor
```
Use when: sufficient historical data exists for time-series forecasting.
Method: Generate a forecast with confidence interval. Set the target above the expected value but within the upper confidence bound.

### Target Calibration Rules

**Rule 1: Base Rate Awareness**
Before setting a target, know the base rate. "Improve conversion from 2% to 4%" is a 100% improvement — wildly ambitious. "Improve conversion from 2% to 2.5%" is a 25% improvement — aggressive but plausible.

**Rule 2: The 70% Achievement Threshold**
Targets should be set so that achieving 70% represents solid performance. This creates aspiration without demoralization. If teams consistently hit 100%, targets are too easy. If they consistently hit 30%, targets are demoralizing.

**Rule 3: Absolute and Relative Targets**
Set both. "Increase retention to 45%" (absolute) AND "Improve retention by 5pp from current baseline" (relative). The absolute target anchors to a standard. The relative target controls for starting position.

**Rule 4: Time-Phased Milestones**
For quarterly targets, set monthly checkpoints:
```
Q1 Target: Increase WAU from 100K to 130K
  Month 1 checkpoint: 108K (front-loaded if initiatives launch early)
  Month 2 checkpoint: 118K
  Month 3 checkpoint: 130K
```
Monthly checkpoints enable early detection of off-track performance.

**Rule 5: Target Ranges, Not Points**
Communicate targets as ranges when possible:
```
Threshold:  Minimum acceptable (e.g., 120K WAU)
Target:     Expected achievement (e.g., 130K WAU)
Stretch:    Aspirational (e.g., 145K WAU)
```
This prevents binary pass/fail thinking and acknowledges inherent uncertainty.

---

## KPI Review Cadence

### The Review Rhythm

| Cadence | Audience | Focus | Format |
|---------|----------|-------|--------|
| Daily | Team leads | Operational anomalies | Automated alert + standup mention |
| Weekly | Team | Input metric progress, blockers | 15-min metric review in team sync |
| Bi-weekly | Cross-functional | Shared metrics, coordination | 30-min metric alignment sync |
| Monthly | Leadership | KPI progress, initiative impact | 45-min structured review |
| Quarterly | Executive / Board | Strategic KPIs, OKR scoring | 60-min deep dive with narrative |

### The KPI Review Template

Every structured KPI review should follow this format:

```
1. SCOREBOARD (2 min)
   - Current value of each KPI
   - Trend direction and magnitude
   - Status: On-track / At-risk / Off-track

2. DIAGNOSIS (5 min)
   - For any metric that is at-risk or off-track:
     - What changed?
     - Why did it change? (root cause, not symptom)
     - Is this a data issue or a real performance issue?

3. ACTIONS (5 min)
   - What is being done to address off-track metrics?
   - What experiments are running to improve metrics?
   - What resources or decisions are needed?

4. FORECAST (3 min)
   - Given current trajectory, where will each KPI land at quarter-end?
   - What would need to change to hit target?
```

---

## Common KPI Design Mistakes

### Mistake 1: Measuring Activity, Not Outcomes
**Wrong:** "Number of marketing campaigns launched"
**Right:** "Pipeline generated from marketing campaigns"
Activity metrics measure effort. Outcome metrics measure impact. Reward impact.

### Mistake 2: Too Many KPIs
**Wrong:** 25 KPIs on the executive dashboard
**Right:** 5-7 KPIs with drill-down capability
Attention is finite. The more metrics you track, the less attention each receives. Curate ruthlessly.

### Mistake 3: No Baseline Before Setting Targets
**Wrong:** "Target: 50% activation rate" (without knowing current rate)
**Right:** "Current: 32%. Target: 42%. Based on benchmark P75 and planned initiatives."
Targets without baselines are wishes, not plans.

### Mistake 4: Ignoring Counter-Metrics
**Wrong:** "We crushed our lead generation target!"
**Right:** "We hit 120% of lead target, but lead-to-opportunity conversion dropped 15%, suggesting quality decline."
Every success metric needs a quality check.

### Mistake 5: Annual Targets Without Quarterly Milestones
**Wrong:** "2024 target: $10M ARR"
**Right:** "Q1: $7.5M. Q2: $8.2M. Q3: $9.0M. Q4: $10M. With monthly checkpoints."
Annual targets without milestones become December surprises.

---

**KPIs are not a reporting exercise. They are the translation of strategy into daily behavior. When KPIs are well-designed, every team member can answer: "What metric am I responsible for, what is my target, and what am I doing this week to move it?"**
