# Support Metrics — Efficiency, Quality, Financial, and Benchmarks

## Overview

Support metrics form the measurement backbone that enables data-driven decision making
across every support function. Without rigorous metrics, support leaders operate on
intuition, unable to identify problems, justify investments, or demonstrate value.
This module defines the complete support metrics taxonomy organized across three
tiers: efficiency metrics (operational performance), quality metrics (customer and
agent experience), and financial metrics (cost and ROI). Each metric includes its
definition, calculation formula, industry benchmarks, and guidance on when each
metric matters most.

---

## 1. Efficiency Metrics

### First Response Time (FRT)

**Definition:** The elapsed time between ticket creation and the first human response
from a support agent.

```
FRT = Timestamp(First Agent Response) - Timestamp(Ticket Created)

Typically measured:
  - During business hours only (SLA clock pauses outside hours)
  - Excluding auto-responses (bot acknowledgments, auto-replies)
  - Median preferred over mean (resistant to outliers)
```

**Benchmarks by Channel:**

| Channel | Best-in-Class | Good | Average | Poor |
|---------|--------------|------|---------|------|
| Email | <1 hour | 1-4 hours | 4-12 hours | >12 hours |
| Live Chat | <30 seconds | 30-60 seconds | 1-5 minutes | >5 minutes |
| Phone | <20 seconds | 20-60 seconds | 1-3 minutes | >3 minutes |
| Social Media | <30 minutes | 30-60 minutes | 1-4 hours | >4 hours |
| Messaging | <1 hour | 1-4 hours | 4-8 hours | >8 hours |

**Why it matters:** FRT is the strongest single predictor of CSAT across all channels.
Zendesk benchmark data (2024) shows a correlation coefficient of r = 0.72 between FRT
and CSAT. Customers interpret fast first response as evidence that their issue is being
taken seriously, even before resolution occurs.

**Caution:** Optimizing FRT in isolation can lead to low-quality first responses ("Thank
you for reaching out, we'll look into this"). FRT must be measured alongside first
contact resolution (FCR) to prevent gaming.

---

### Average Resolution Time (ART)

**Definition:** The average elapsed time from ticket creation to resolution.

```
ART = Mean(Timestamp(Resolved) - Timestamp(Created))
      across all resolved tickets in the period

Variants:
  - Median Resolution Time (preferred; resistant to outliers)
  - Resolution Time by Priority (P1, P2, P3, P4 separately)
  - Resolution Time by Category (identify complex issue types)
```

**Benchmarks:**

| Priority | Target | Acceptable | Critical |
|----------|--------|-----------|----------|
| P1 | <4 hours | 4-8 hours | >8 hours |
| P2 | <8 hours | 8-24 hours | >24 hours |
| P3 | <24 hours | 24-72 hours | >72 hours |
| P4 | <72 hours | 72 hours-5 days | >5 days |

---

### Handle Time

**Definition:** The time an agent actively spends working on a ticket, excluding time
waiting on the customer or on hold for internal dependencies.

```
Average Handle Time (AHT) = (Talk/Write Time + Research Time + Wrap-Up Time) / Contacts

For phone: AHT = Talk Time + Hold Time + After-Call Work
For email: AHT = Read Time + Research Time + Write Time
For chat:  AHT = Session Duration / Concurrent Sessions + Wrap-Up
```

**Benchmarks:**

| Channel | Best-in-Class | Average | Concerning |
|---------|--------------|---------|-----------|
| Phone | <5 minutes | 5-10 minutes | >12 minutes |
| Email | <8 minutes | 8-15 minutes | >20 minutes |
| Chat | <6 minutes | 6-12 minutes | >15 minutes |

**Caution:** AHT is dangerous as a primary metric. Optimizing for shorter handle times
pushes agents to rush, reducing resolution quality and increasing reopen rates. Use AHT
for capacity planning and staffing, not as a performance target for individual agents.

---

### First Contact Resolution (FCR)

**Definition:** The percentage of tickets resolved during the first interaction without
requiring follow-up, escalation, or customer re-contact.

```
FCR = Tickets resolved on first contact / Total tickets resolved

Measurement approaches:
  1. Agent-reported: Agent marks "resolved on first contact" (subjective)
  2. System-inferred: No customer reply after initial response within 72 hours
  3. Customer-reported: Post-resolution survey asks "Was your issue resolved
     in a single interaction?"
```

**Benchmarks:**

| Industry | Best-in-Class | Good | Average | Poor |
|----------|--------------|------|---------|------|
| SaaS B2B | >85% | 75-85% | 65-75% | <65% |
| E-commerce | >90% | 80-90% | 70-80% | <70% |
| Financial | >80% | 70-80% | 60-70% | <60% |
| Telecom | >75% | 65-75% | 55-65% | <55% |

**Why it matters:** FCR is the metric most strongly correlated with customer loyalty.
Dixon et al. (CEB research) found that each additional contact required to resolve an
issue increases disloyalty by 15%. FCR directly measures the "effortless experience."

---

### Ticket Volume and Backlog

```
KEY VOLUME METRICS:

  Created Tickets:     New tickets opened in the period
  Resolved Tickets:    Tickets closed/resolved in the period
  Net Change:          Created - Resolved (positive = growing backlog)
  Open Backlog:        Total unresolved tickets at period end
  Aged Backlog:        Open tickets older than [N] days

HEALTH INDICATORS:

  Resolved >= Created:          Healthy (backlog stable or shrinking)
  Created > Resolved (<10%):    Warning (slight backlog growth)
  Created > Resolved (>10%):    Critical (significant backlog growth)
  Aged Backlog > 10% of total:  Warning (tickets getting stuck)
```

---

## 2. Quality Metrics

### Customer Satisfaction Score (CSAT)

**Definition:** Percentage of customers who rate their support experience as
"Satisfied" or "Very Satisfied" on a post-interaction survey.

```
CSAT = (Satisfied + Very Satisfied responses) / Total responses * 100

Scale Options:
  - 5-point Likert (1-5): Top 2 box (4+5) = Satisfied
  - 3-point (Negative / Neutral / Positive): Positive = Satisfied
  - Binary (thumbs up / down): Up = Satisfied
  - 10-point: 8-10 = Satisfied
```

**Benchmarks:**

| Industry | Best-in-Class | Good | Average | Poor |
|----------|--------------|------|---------|------|
| SaaS B2B | >92% | 85-92% | 78-85% | <78% |
| E-commerce | >90% | 83-90% | 75-83% | <75% |
| Financial | >88% | 80-88% | 72-80% | <72% |
| Overall | >90% | 83-90% | 75-83% | <75% |

**Response rate considerations:**
- Typical survey response rate: 10-25%
- Response rates below 10% create selection bias (only very happy or very
  unhappy customers respond)
- Target: 15-25% response rate for reliable data

---

### Customer Effort Score (CES)

**Definition:** Measures how much effort the customer had to expend to resolve their
issue. Based on Dixon et al. (CEB, 2013) research demonstrating effort as the primary
driver of disloyalty.

```
Survey question: "[Company] made it easy to handle my issue."
Scale: 1 (Strongly Disagree) to 7 (Strongly Agree)

CES = Mean score across all responses

Interpretation:
  6.0+:    Excellent (low effort)
  5.0-5.9: Good
  4.0-4.9: Average
  3.0-3.9: Poor (high effort)
  <3.0:    Critical (very high effort)
```

**Why CES > CSAT for loyalty prediction:**
- CSAT measures a feeling (satisfaction); CES measures an experience (effort)
- Customers can be "satisfied" with a resolution but frustrated by the effort
- CES better predicts future behavior (repurchase, churn, word-of-mouth)
- 96% of high-effort customers become disloyal vs. 9% of low-effort customers

---

### QA Score

**Definition:** The average quality score from internal ticket reviews, measured
against the QA rubric defined in `03_operations/quality_assurance.md`.

```
QA Score = Weighted average of rubric dimension scores (scale 1-5)

Dimensions (typical):
  Accuracy:        30% weight
  Communication:   25% weight
  Process:         20% weight
  Customer Effort: 15% weight
  Resolution:      10% weight
```

**Targets:**

| Level | QA Score | Action |
|-------|---------|--------|
| Exceptional | >4.5 | Recognize; use as training examples |
| Meets Standard | 3.5-4.5 | Standard coaching |
| Needs Improvement | 2.5-3.5 | Intensive coaching |
| Unacceptable | <2.5 | Performance improvement plan |

---

### Escalation Rate

**Definition:** Percentage of tickets that require escalation from L1 to L2 or higher.

```
Escalation Rate = Escalated tickets / Total tickets * 100

Benchmarks:
  L1 to L2: 15-25% (healthy)
  L2 to L3: 5-10%
  L3 to L4: 2-5%

  Overall escalation: 20-30%

  >30% overall: L1 may be under-trained or product too complex for L1
  <15% overall: L1 may be over-handling issues beyond their skill
```

---

## 3. Financial Metrics

### Cost Per Ticket

**Definition:** Fully loaded cost to resolve a single support ticket.

```
Cost Per Ticket = Total Support Costs / Total Tickets Resolved

Total Support Costs include:
  - Agent salaries and benefits
  - Management salaries
  - Technology (helpdesk, phone, tools)
  - Overhead (facilities, HR allocation)
  - Training and QA
  - BPO fees (if applicable)
```

**Benchmarks:**

| Channel | Low Cost | Average | High Cost |
|---------|---------|---------|-----------|
| Self-service | $0.10-0.50 | -- | -- |
| Chat/Bot | $1-4 | $4-8 | $8-12 |
| Email | $3-6 | $6-10 | $10-15 |
| Phone | $6-10 | $10-15 | $15-25 |
| Video | $10-15 | $15-20 | $20-30 |

### Deflection Rate

**Definition:** Percentage of potential support tickets that are resolved through
self-service instead.

```
Deflection Rate = Self-service resolutions / (Self-service resolutions + Tickets)

Measurement:
  - KB view → no ticket within 24 hours (behavioral inference)
  - "Was this helpful?" Yes + no subsequent ticket (survey-based)
  - Contact rate reduction after KB launch (before/after comparison)

Benchmarks:
  Best-in-class: 50-70%
  Good:          35-50%
  Average:       20-35%
  Poor:          <20%
```

### Support ROI

```
SUPPORT ROI FRAMEWORK:

  REVENUE IMPACT:
    Retained Revenue = Churned customers saved by support * Average ARR
    Expansion Revenue = Upsells/cross-sells influenced by support interactions
    Referral Revenue = Referrals driven by positive support experiences (NPS)

  COST AVOIDANCE:
    Self-Service Savings = Deflected tickets * Cost per ticket
    AI Savings = Bot-contained tickets * (Human cost - Bot cost)
    Proactive Savings = Prevented tickets * Cost per ticket

  TOTAL SUPPORT VALUE:
    = Retained Revenue + Expansion Revenue + Referral Revenue
      + Self-Service Savings + AI Savings + Proactive Savings
      - Total Support Operating Cost

  SUPPORT ROI:
    = (Total Support Value - Total Support Cost) / Total Support Cost * 100
```

---

## 4. Industry Benchmarks Summary

### SaaS B2B Benchmarks (TSIA, 2024)

| Metric | Bottom Quartile | Median | Top Quartile |
|--------|----------------|--------|-------------|
| FRT (email) | >12 hours | 4-8 hours | <2 hours |
| ART (all) | >72 hours | 24-48 hours | <12 hours |
| FCR | <65% | 72% | >82% |
| CSAT | <78% | 84% | >90% |
| CES | >3.5 | 2.8 | <2.2 |
| Tickets/Agent/Month | >700 | 450-550 | <400 |
| Cost per Ticket | >$20 | $12-15 | <$8 |
| Deflection Rate | <20% | 30-35% | >45% |
| Agent Turnover | >40% | 25-30% | <15% |

### Metric Correlations

```
STRONG CORRELATIONS (r > 0.60):
  FRT ↔ CSAT:     r = 0.72 (faster first response = higher satisfaction)
  FCR ↔ CES:      r = 0.68 (first contact resolution = lower effort)
  QA Score ↔ CSAT: r = 0.61 (internal quality = external satisfaction)
  Agent Tenure ↔ FCR: r = 0.55 (experienced agents resolve more at first contact)

MODERATE CORRELATIONS (r = 0.40-0.60):
  AHT ↔ CSAT:     r = 0.42 (faster handling helps, but not strongly)
  Deflection ↔ CES: r = 0.48 (more self-service = lower effort)

WEAK/NO CORRELATION:
  AHT ↔ FCR:      r = 0.15 (faster does not mean better)
  Volume ↔ CSAT:   r = 0.08 (high volume alone does not degrade quality)
```

---

## 5. Metric Anti-Patterns

### Metrics That Cause Harm When Used as Targets

| Metric | Harm When Targeted | Use Instead |
|--------|-------------------|-------------|
| **AHT (as agent KPI)** | Agents rush; quality drops; reopens increase | Use for capacity planning only |
| **Tickets closed (as agent KPI)** | Cherry-picking easy tickets; premature closing | Measure FCR and quality instead |
| **CSAT alone** | Gaming through tone without resolving issues | Pair with CES and FCR |
| **Volume reduction (as goal)** | Hiding channels; making support hard to find | Measure contact rate (tickets/user) |

### Goodhart's Law in Support

"When a measure becomes a target, it ceases to be a good measure." (Charles Goodhart)

Every metric, when used as a performance target, creates incentives to game it. The
antidote is to use balanced scorecards that pair competing metrics:

```
BALANCED METRIC PAIRS:

  Speed + Quality:     FRT paired with QA Score
  Efficiency + CX:     AHT paired with CSAT
  Resolution + Effort: FCR paired with CES
  Cost + Experience:   Cost/ticket paired with CSAT
  Volume + Outcomes:   Tickets closed paired with Reopen Rate
```

---

## 6. Metric Implementation

### Data Sources

| Metric | Primary Source | Secondary Source |
|--------|---------------|-----------------|
| FRT, ART, AHT | Helpdesk system (Zendesk, Intercom) | Custom analytics |
| CSAT, CES | Survey tool (built-in or Delighted, Nicereply) | Helpdesk integration |
| FCR | Helpdesk (system-inferred) + survey (customer-reported) | Manual audit |
| QA Score | QA tool (MaestroQA, Klaus) or spreadsheet | Helpdesk tagging |
| Cost/Ticket | Finance (payroll, vendor, tools) + helpdesk (volume) | Calculated |
| Deflection | Analytics (KB views) + helpdesk (ticket volume) | A/B testing |
| Volume | Helpdesk system | API export |

### Reporting Cadence

| Report | Audience | Cadence | Key Metrics |
|--------|---------|---------|-------------|
| Real-time dashboard | Agents, team leads | Live | Queue depth, wait time, SLA status |
| Daily digest | Team leads | Daily | Volume, FRT, backlog, SLA breaches |
| Weekly report | Managers | Weekly | All efficiency + quality metrics |
| Monthly report | Directors, VP | Monthly | Full balanced scorecard + trends |
| Quarterly review | Executive team | Quarterly | Strategic metrics, ROI, benchmarks |

---

## References

1. TSIA (2024). "Support Services Benchmark Report."
2. Zendesk (2024). "Zendesk Benchmark: Customer Service Data."
3. Dixon, M. et al. (2013). "The Effortless Experience."
4. HDI (2023). "Technical Support Practices and Salary Report."
5. Goodhart, C. (1975). "Problems of Monetary Management."
6. MetricNet (2024). "Help Desk Benchmarking Report."

---

**This document is authoritative for support metrics within the Support Brain.**
