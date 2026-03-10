# Workforce Management — Forecasting, Scheduling, and Staffing Models

## Overview

Workforce management (WFM) is the discipline of ensuring that the right number of
agents with the right skills are available at the right times to meet customer demand
while maintaining service levels and controlling costs. This module covers demand
forecasting (including Erlang C), scheduling, occupancy and utilization, shrinkage,
staffing models (full-time, part-time, BPO), and seasonal planning.

---

## 1. Demand Forecasting

### Forecasting Hierarchy

```
ANNUAL FORECAST (12-month view)
  Purpose: Budget planning, headcount planning, capacity investment
  Method: Historical trend + growth rate + product launch calendar
  Accuracy target: +/- 15%

MONTHLY FORECAST (rolling 3-month view)
  Purpose: Staffing adjustments, schedule creation, BPO capacity
  Method: Historical pattern + recent trend + known events
  Accuracy target: +/- 10%

WEEKLY FORECAST (rolling 4-week view)
  Purpose: Schedule optimization, overtime/undertime planning
  Method: Day-of-week patterns + monthly forecast + event calendar
  Accuracy target: +/- 7%

INTRADAY FORECAST (15-minute intervals)
  Purpose: Real-time staffing adjustments, break scheduling
  Method: Historical intraday patterns + real-time arrival data
  Accuracy target: +/- 5%
```

### Forecasting Methods

| Method | Description | Data Required | Best For |
|--------|------------|---------------|----------|
| **Simple Moving Average** | Average of last N periods | 6-12 months history | Stable volume, no growth |
| **Weighted Moving Average** | Recent periods weighted higher | 6-12 months history | Gradual trend changes |
| **Exponential Smoothing** | Geometric weighting of all past data | 12+ months history | Trending volume |
| **Holt-Winters** | Triple exponential smoothing with trend + seasonality | 24+ months history | Seasonal patterns |
| **Regression** | Volume as function of predictor variables | 12+ months + external data | Volume driven by external factors (users, deployments) |
| **ARIMA** | Auto-regressive integrated moving average | 24+ months history | Complex patterns, high accuracy needed |

### Volume Drivers

Understanding what drives ticket volume enables better forecasting:

```
INTERNAL DRIVERS (predictable):
  - Active user count (strongest predictor)
  - New user onboarding volume
  - Product releases and updates
  - Feature deprecations or migrations
  - Known bugs and incidents
  - Marketing campaigns (new customer influx)
  - Pricing changes

EXTERNAL DRIVERS (less predictable):
  - Day of week (Mon-Wed typically highest)
  - Time of day (peaks at 10-11am and 2-3pm customer local time)
  - Seasonality (varies by industry)
  - Holidays (lower volume but also lower staffing)
  - Competitor outages (potential customer influx)
  - Industry events and conferences
```

### Contact Rate Forecasting

```
Contact Rate = Tickets / Active Users

Monthly Ticket Forecast = Projected Active Users * Historical Contact Rate

Adjustments:
  + Product launch premium (typically +15-30% for 2-4 weeks post-launch)
  + Known issue premium (estimate based on affected user population)
  - Self-service improvement discount (measure deflection rate change)
  - AI chatbot discount (measure containment rate * applicable volume)
```

---

## 2. Erlang C Forecasting

### The Erlang C Model

Erlang C is the standard queuing theory formula used to calculate the number of agents
needed to achieve a target service level. Developed by A.K. Erlang for telephone
networks, it models a multi-server queue where customers wait if all agents are busy.

### Inputs

| Parameter | Symbol | Definition | How to Determine |
|-----------|--------|-----------|------------------|
| Call/contact volume | N | Number of contacts in the period | Forecasting (above) |
| Average Handle Time | AHT | Average time to handle one contact (talk + wrap) | Historical data |
| Service Level Target | SL | % of contacts answered within target time | Business decision (e.g., 80/20) |
| Target Answer Time | ASA | Maximum acceptable wait time | Business decision (e.g., 20 seconds) |
| Period | T | Time interval being modeled | Typically 30-minute intervals |

### The Formula

```
Traffic Intensity (Erlangs):
  A = (N * AHT) / T

  Where:
    N   = contacts in the interval
    AHT = average handle time (in same unit as T)
    T   = interval duration

Erlang C Probability (probability of waiting):
  P(wait) = (A^c / c!) * (c / (c - A))
            ─────────────────────────────────
            Σ(k=0 to c-1) [A^k / k!] + (A^c / c!) * (c / (c - A))

  Where c = number of agents

Service Level:
  SL = 1 - P(wait) * e^(-(c-A) * (ASA/AHT))

Solve for c (number of agents) that achieves the target SL.
```

### Practical Example

```
Given:
  Volume: 120 contacts per hour
  AHT: 5 minutes (300 seconds)
  Service Level Target: 80% answered within 20 seconds
  Period: 1 hour (3600 seconds)

Traffic Intensity:
  A = (120 * 300) / 3600 = 10 Erlangs

Using Erlang C calculator (iterative solve):
  13 agents → SL = 72% (insufficient)
  14 agents → SL = 83% (meets target)
  15 agents → SL = 90% (buffer)

  Required: 14 agents (minimum), 15 agents (recommended with buffer)
```

### Erlang C Limitations

1. **Assumes no abandonment** — In reality, customers hang up or leave chat. This
   makes Erlang C slightly conservative (overstaffs).
2. **Assumes uniform arrival** — Contact arrival is actually Poisson-distributed.
   Erlang C handles this mathematically but assumes constant rate within intervals.
3. **Single queue assumption** — Does not natively model skills-based routing with
   multiple queues. Use separate calculations per queue.
4. **Does not model concurrency** — Chat agents handle 2-5 simultaneous conversations.
   Divide AHT by concurrency factor for chat Erlang C calculations.

### Erlang C for Chat

```
Chat Adjustment:
  Effective AHT (chat) = Actual AHT / Concurrency Factor

  Example:
    Chat AHT: 12 minutes
    Concurrency: 3 simultaneous chats
    Effective AHT: 12 / 3 = 4 minutes

  Use effective AHT in Erlang C calculation.
```

---

## 3. Scheduling

### Schedule Design Principles

1. **Align with demand curve** — More agents during peak hours, fewer during troughs
2. **Respect labor laws** — Minimum breaks, maximum consecutive hours, overtime rules
3. **Balance fairness** — Rotate undesirable shifts (evenings, weekends) equitably
4. **Build in flexibility** — Split shifts, part-time, and on-call for demand variability
5. **Allow agent input** — Shift preference bidding improves satisfaction and retention

### Schedule Types

| Type | Description | Best For |
|------|------------|----------|
| **Fixed** | Same hours every week | Small teams, predictable volume |
| **Rotating** | Shifts rotate on a cycle (e.g., 4-week rotation) | 24/7 operations, fairness |
| **Flexible** | Core hours + flexible start/end | Knowledge workers, async channels |
| **Split** | Two shorter shifts in one day (e.g., 7-11am + 3-7pm) | Double-peak demand curves |
| **On-Call** | Not scheduled but available for escalation | After-hours, weekends, P1 incidents |
| **Bid-Based** | Agents bid for preferred shifts by seniority | Large teams, agent satisfaction |

### Intraday Schedule

```
SAMPLE INTRADAY DEMAND CURVE (Eastern Time):

Volume  │       ████████
(%)     │     ████████████
   20%  │   ██████████████████
        │ ████████████████████████
   10%  │ ████████████████████████████
        │ ██████████████████████████████████
    0%  └──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬──┬
          6  7  8  9 10 11 12  1  2  3  4  5  6
                        Hour (ET)

STAFFING OVERLAY:
  6-8am:   50% of peak staff (early shift start)
  8-10am:  75% of peak staff (ramp-up)
  10am-12: 100% of peak staff (peak)
  12-1pm:  85% (lunch rotation reduces capacity)
  1-3pm:   95% (second peak)
  3-5pm:   75% (wind-down)
  5-6pm:   50% (late shift coverage)
  6pm-6am: On-call + AI only (or BPO for 24/7)
```

---

## 4. Occupancy and Utilization

### Definitions

| Metric | Formula | Target Range |
|--------|---------|-------------|
| **Occupancy** | (Handle Time + Wrap Time) / (Handle Time + Wrap Time + Available Idle Time) | 75-85% |
| **Utilization** | Productive Time / Total Paid Time | 80-90% |
| **Shrinkage** | Non-productive Time / Total Paid Time | 25-35% |
| **Adherence** | Time in Scheduled Activity / Total Scheduled Time | >90% |

### Occupancy Management

```
OCCUPANCY ZONES:

  >90% DANGER:
    - Agent burnout accelerates
    - Service level degrades (no buffer for spikes)
    - Quality drops (agents rush to stay above water)
    - Action: Hire immediately or reduce volume (self-service, AI)

  80-90% OPTIMAL:
    - Agents are productively busy with recovery time
    - Service levels maintained
    - Quality sustainable

  70-80% ACCEPTABLE:
    - Agents have idle time for training, KB contribution, side projects
    - Cost slightly elevated but sustainability is high
    - Good for complex products requiring research time

  <70% OVERSTAFFED:
    - Agents are frequently idle
    - Cost per ticket is excessive
    - Action: Reduce headcount, expand scope, or invest in proactive work
```

### Productive vs. Non-Productive Time

```
PRODUCTIVE TIME (counted in utilization):
  - Handling tickets (talk time + research + write time)
  - After-contact work (wrap-up, notes, categorization)
  - Available/waiting for next ticket
  - Customer follow-up

NON-PRODUCTIVE TIME (shrinkage):
  - Breaks (15-30 min/day)
  - Lunch (30-60 min/day)
  - Team meetings (30-60 min/week)
  - Training (1-4 hours/week)
  - One-on-ones (30 min/week)
  - System downtime
  - Personal time / bathroom
  - Coaching sessions
  - QA calibration
  - KB content creation
```

---

## 5. Shrinkage Factor

### Shrinkage Components

| Component | Typical % of Paid Time | Notes |
|-----------|----------------------|-------|
| Breaks | 5-7% | Legally mandated in many jurisdictions |
| Lunch | 5-8% | Paid vs. unpaid varies by policy |
| Meetings | 3-5% | Team meetings, all-hands, standups |
| Training | 3-8% | Higher for new agents; ongoing for all |
| Coaching | 2-3% | 1:1 with team lead |
| PTO / Sick | 8-12% | Vacation, sick days, personal days |
| Other | 2-5% | System issues, admin tasks, bathroom |
| **Total Shrinkage** | **28-48%** | **Typical: 30-35%** |

### Applying Shrinkage to Staffing

```
Required Agents (on phones) = Erlang C result = 14

Required Agents (scheduled) = Agents on phones / (1 - Shrinkage)
                             = 14 / (1 - 0.30)
                             = 14 / 0.70
                             = 20 agents scheduled

Required Agents (headcount) = Scheduled / Coverage Factor
  For single shift:  = 20 / 1.0 = 20 FTE
  For 16/5 coverage: = 20 / 1.6 = ~32 FTE (rounded)
  For 24/7 coverage: = 20 / 4.2 = ~84 FTE (accounting for weekends)
```

---

## 6. Staffing Models

### Full-Time In-House

| Attribute | Detail |
|-----------|--------|
| Cost | Highest per-agent (salary + benefits + overhead) |
| Quality | Highest (deep product knowledge, cultural alignment) |
| Ramp Time | 4-8 weeks to full productivity |
| Flexibility | Lowest (fixed cost, hard to scale quickly) |
| Best For | Core team, complex products, enterprise support |

### Part-Time / Contract

| Attribute | Detail |
|-----------|--------|
| Cost | Medium (hourly, fewer benefits) |
| Quality | Medium (less deep knowledge) |
| Ramp Time | 2-4 weeks |
| Flexibility | High (scale up/down with demand) |
| Best For | Peak coverage, seasonal, weekend/evening shifts |

### BPO (Business Process Outsourcing)

| Attribute | Detail |
|-----------|--------|
| Cost | Lowest per-agent ($8-25/hour fully loaded, varies by geography) |
| Quality | Variable (depends on vendor, training, QA) |
| Ramp Time | 2-6 weeks (vendor provides training infrastructure) |
| Flexibility | Highest (add/remove agents in 1-2 weeks) |
| Best For | Tier 1 volume, after-hours, language coverage, seasonal peaks |

### BPO Geography Benchmarks

```
NEARSHORE (Latin America, Eastern Europe):
  Cost: $12-20/hour
  Language: Strong English + Spanish/Portuguese
  Time zone: Overlaps with US business hours
  Quality: Medium-High

OFFSHORE (Philippines, India):
  Cost: $8-15/hour
  Language: Good English (Philippines stronger for voice)
  Time zone: Enables 24/7 coverage from US perspective
  Quality: Medium (requires strong QA program)

ONSHORE (US, UK, Australia):
  Cost: $20-35/hour
  Language: Native
  Time zone: Direct overlap
  Quality: High
  Note: Rarely cost-effective for BPO; consider for regulated industries
```

### Hybrid Model Design

```
IN-HOUSE CORE (60% of volume):
  - All P1/P2 tickets
  - Enterprise customers
  - Technical/complex issues
  - Escalations
  - QA, training, KB management

BPO FLEX (40% of volume):
  - P3/P4 tickets
  - Standard/free tier customers
  - After-hours coverage
  - Seasonal overflow
  - First-touch triage and categorization
```

---

## 7. Seasonal Planning

### Identifying Seasonal Patterns

| Industry | Peak Season | Volume Increase |
|----------|------------|-----------------|
| E-commerce | Nov-Dec (holidays) | +100-300% |
| Tax/Finance | Jan-Apr (tax season) | +50-150% |
| Education | Aug-Sep (back to school) | +50-100% |
| SaaS B2B | Q4 (budget/renewal season) | +20-40% |
| Travel | Jun-Aug (summer), Dec | +50-100% |

### Seasonal Staffing Strategies

1. **BPO surge capacity** — Pre-arrange with BPO for additional agents during peak
2. **Cross-training** — Train non-support staff (success, sales ops) to handle L1
3. **Seasonal hires** — Temporary agents with shortened training program
4. **Self-service blitz** — Pre-peak investment in KB and chatbot for known seasonal issues
5. **Proactive communication** — Pre-empt common seasonal questions with email/in-app
6. **SLA adjustment** — Transparently adjust SLAs during peak (if necessary)

---

## 8. WFM Technology

### WFM Software Features

| Feature | Description | Business Value |
|---------|------------|----------------|
| **Forecasting engine** | Automated demand prediction | Reduce over/understaffing |
| **Scheduling** | Automated schedule generation | Reduce manual planning effort |
| **Real-time adherence** | Monitor agent schedule compliance | Identify adherence issues |
| **Intraday management** | Adjust schedules in real-time | Respond to demand changes |
| **What-if scenarios** | Model staffing changes | Evaluate hiring decisions |
| **Agent portal** | Self-service shift swap, PTO, preferences | Improve agent satisfaction |
| **Reporting** | Historical analysis of all WFM metrics | Continuous improvement |

### WFM Platforms

```
Enterprise:     NICE, Verint, Genesys, Calabrio
Mid-Market:     Assembled, Playvox, Tymeshift (Zendesk)
Lightweight:    Google Sheets + Erlang calculator (early stage)
```

---

## References

1. Erlang, A. K. (1917). "Solution of Some Problems in the Theory of Probabilities
   of Significance in Automatic Telephone Exchanges." Elektroteknikeren.
2. ICMI (International Customer Management Institute). "Contact Center Management
   Handbook."
3. Cleveland, B., & Harne, D. (2015). "Call Center Management on Fast Forward."
4. TSIA (2024). "Support Services Benchmark."
5. COPC Inc. (2023). "Customer Experience Standard."

---

**This document is authoritative for workforce management within the Support Brain.**
