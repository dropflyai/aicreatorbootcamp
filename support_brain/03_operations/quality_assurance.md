# Quality Assurance — Ticket Review, Rubric Design, Calibration, and Coaching

## Overview

Quality assurance (QA) in customer support ensures that every customer interaction meets
defined standards for accuracy, completeness, communication, and process adherence. A
well-designed QA program transforms support from a reactive cost center into a
consistent, measurable, and continuously improving customer experience engine. This
module covers sampling methodology, rubric design, calibration processes, scoring
frameworks, survey integration (CSAT/CES), and the coaching loop that connects QA
findings to agent development.

---

## 1. QA Program Design

### Program Objectives

A support QA program serves five purposes:

1. **Quality assurance** — Verify that customer interactions meet defined standards
2. **Agent development** — Identify individual strengths and development areas
3. **Process improvement** — Surface systemic issues in workflows, tools, or training
4. **Customer experience protection** — Catch and correct poor experiences before
   they compound
5. **Calibration** — Ensure consistent standards across reviewers, teams, and sites

### Program Components

```
QA PROGRAM ARCHITECTURE:

  ┌──────────────────┐
  │  QUALITY RUBRIC  │ <-- Defines what "good" looks like
  └────────┬─────────┘
           │
  ┌────────▼─────────┐
  │  SAMPLING PLAN   │ <-- How many tickets to review, which ones
  └────────┬─────────┘
           │
  ┌────────▼─────────┐
  │  REVIEW PROCESS  │ <-- Who reviews, how reviews are conducted
  └────────┬─────────┘
           │
  ┌────────▼─────────┐
  │  CALIBRATION     │ <-- Ensure reviewer consistency
  └────────┬─────────┘
           │
  ┌────────▼─────────┐
  │  SCORING & DATA  │ <-- Score tracking, trends, analysis
  └────────┬─────────┘
           │
  ┌────────▼─────────┐
  │  COACHING LOOP   │ <-- Feedback to agents, development plans
  └────────┬─────────┘
           │
  ┌────────▼─────────┐
  │  PROGRAM REVIEW  │ <-- Monthly/quarterly program effectiveness
  └──────────────────┘
```

---

## 2. Sampling Methodology

### Sample Size Determination

The number of tickets reviewed per agent per month depends on team size, QA resources,
and statistical requirements.

| Team Size | Minimum Reviews/Agent/Month | Recommended | Notes |
|-----------|---------------------------|-------------|-------|
| 1-10 agents | 5 | 8-10 | Small team; high-touch coaching |
| 11-25 agents | 4 | 6-8 | Balanced approach |
| 26-50 agents | 3 | 5-6 | Scale with dedicated QA staff |
| 50+ agents | 2 | 4-5 | Supplemented by automated QA |

### Statistical Confidence

For team-level insights (not individual coaching), sample sizes must achieve
statistical significance:

```
For 95% confidence, +/- 5% margin of error:
  Population 100 tickets/month  → Sample 80
  Population 500 tickets/month  → Sample 217
  Population 1000 tickets/month → Sample 278
  Population 5000 tickets/month → Sample 357

Practical approach: Review 3-5% of total tickets for team-level data,
plus 4-10 per agent for individual coaching.
```

### Sampling Strategies

| Strategy | Description | Pros | Cons |
|----------|------------|------|------|
| **Random** | Randomly select tickets | Unbiased, representative | May miss edge cases |
| **Stratified** | Random within categories (channel, priority, category) | Representative across dimensions | More complex to execute |
| **Targeted** | Focus on specific criteria (low CSAT, long handle time, escalated) | Catches problems efficiently | Biased toward negative |
| **Customer-triggered** | Review tickets where customer gave low CSAT | Direct correlation to experience | Only catches surveyed interactions |
| **New agent** | Review all tickets from agents in first 30 days | Accelerates onboarding quality | Labor-intensive |

### Recommended Blend

```
SAMPLING ALLOCATION:
  40% Random          -- Unbiased baseline
  20% Low-CSAT        -- Experience-triggered
  20% Escalated       -- Complexity-triggered
  10% New agents      -- Development-triggered
  10% High-risk       -- VIP customers, P1 tickets
```

---

## 3. QA Rubric Design

### Rubric Architecture

A support QA rubric evaluates interactions across multiple dimensions, each with
defined criteria and scoring levels.

### Recommended Rubric Dimensions

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| **Accuracy** | 30% | Was the solution technically correct and complete? |
| **Communication** | 25% | Was the response clear, professional, and empathetic? |
| **Process** | 20% | Were procedures followed (categorization, routing, internal notes)? |
| **Customer Effort** | 15% | Did the agent minimize effort for the customer? |
| **Resolution** | 10% | Was the issue fully resolved or properly escalated? |

### Scoring Scale

| Score | Label | Definition |
|-------|-------|-----------|
| **5** | Exceptional | Exceeds expectations; could be used as training example |
| **4** | Meets Expectations | Solid performance; no notable issues |
| **3** | Needs Improvement | Minor gaps; acceptable but could be better |
| **2** | Below Expectations | Significant gaps; requires coaching |
| **1** | Unacceptable | Critical errors; immediate intervention required |

### Detailed Rubric: Accuracy Dimension (30%)

```
SCORE 5 - EXCEPTIONAL:
  - Solution is technically correct and verified
  - All aspects of the issue are addressed
  - Proactively addresses related potential issues
  - Provides context/explanation beyond minimum
  - References authoritative documentation

SCORE 4 - MEETS EXPECTATIONS:
  - Solution is technically correct
  - Primary issue fully addressed
  - No factual errors or misleading information

SCORE 3 - NEEDS IMPROVEMENT:
  - Solution is mostly correct but missing nuance
  - Minor inaccuracy that does not prevent resolution
  - Key detail omitted (e.g., missing prerequisite step)

SCORE 2 - BELOW EXPECTATIONS:
  - Solution partially incorrect
  - Customer would need to contact again
  - Important information missing or wrong

SCORE 1 - UNACCEPTABLE:
  - Solution is incorrect
  - Could cause data loss, security issue, or worsened problem
  - Completely missed the customer's actual question
```

### Detailed Rubric: Communication Dimension (25%)

```
SCORE 5 - EXCEPTIONAL:
  - Warm, personalized greeting and closing
  - Acknowledges customer's frustration/situation genuinely
  - Explains the "why" not just the "what"
  - Adapts tone to customer's communication style
  - Grammar, spelling, and formatting are flawless
  - Brand voice is consistent

SCORE 4 - MEETS EXPECTATIONS:
  - Professional and friendly tone
  - Acknowledges the issue
  - Clear explanation with appropriate detail
  - Minor grammar/formatting issues (1-2)

SCORE 3 - NEEDS IMPROVEMENT:
  - Tone is flat or overly formal
  - Minimal acknowledgment of customer's experience
  - Instructions are unclear in places
  - Several grammar/formatting issues

SCORE 2 - BELOW EXPECTATIONS:
  - Tone is cold, dismissive, or robotic
  - No acknowledgment of customer's frustration
  - Confusing or jargon-heavy language
  - Significant grammar/formatting issues

SCORE 1 - UNACCEPTABLE:
  - Rude, condescending, or argumentative
  - Blames the customer
  - Incomprehensible communication
  - Violates brand voice guidelines
```

### Auto-Fail Criteria

Certain violations result in automatic failure regardless of other scores:

```
AUTO-FAIL CONDITIONS:
  - Sharing another customer's data (privacy violation)
  - Providing dangerous or harmful advice
  - Making unauthorized promises (refunds, credits, features)
  - Discriminatory or harassing language
  - Sharing internal-only information with customer
  - Ignoring a security or safety concern
  - Violating regulatory compliance requirements
```

---

## 4. Calibration Process

### Why Calibrate

Calibration ensures that all reviewers (QA specialists, team leads, managers) apply
the rubric consistently. Without calibration, a "4" from one reviewer might be a "3"
from another, destroying the reliability of the data.

### Calibration Cadence

| Frequency | Type | Participants |
|-----------|------|-------------|
| **Weekly** | Quick calibration | QA team reviews 2-3 tickets together |
| **Monthly** | Full calibration | QA team + team leads + management review 5-10 tickets |
| **Quarterly** | Cross-site calibration | All QA personnel across sites/BPOs |
| **On-demand** | New reviewer onboarding | New QA reviewer shadows experienced reviewer for 2 weeks |

### Calibration Protocol

```
STEP 1: SELECT TICKETS
  Choose 3-5 tickets spanning quality spectrum (good, average, poor)
  Include different issue types and channels

STEP 2: INDEPENDENT SCORING
  Each reviewer scores all tickets independently using the rubric
  No discussion until all have completed scoring

STEP 3: REVEAL AND COMPARE
  Display all scores side by side
  Identify tickets with >1 point variance between reviewers

STEP 4: DISCUSS VARIANCES
  Each reviewer explains their rationale for divergent scores
  Group discusses until consensus or clarification is reached

STEP 5: UPDATE RUBRIC
  If variance was caused by ambiguous rubric language, clarify
  Document edge cases and how they should be scored
  Update rubric documentation with examples

STEP 6: MEASURE INTER-RATER RELIABILITY
  Calculate Cohen's Kappa or Krippendorff's Alpha
  Target: Kappa > 0.70 (substantial agreement)
  If <0.70, increase calibration frequency
```

### Inter-Rater Reliability

```
Cohen's Kappa Interpretation:
  < 0.20:  Poor agreement (rubric or training failure)
  0.21-0.40: Fair agreement (significant calibration needed)
  0.41-0.60: Moderate agreement (calibration improvements needed)
  0.61-0.80: Substantial agreement (acceptable; continue calibrating)
  0.81-1.00: Near-perfect agreement (excellent; maintain cadence)
```

---

## 5. CSAT and CES Survey Integration

### Survey Design

| Survey | Question | Scale | When to Send |
|--------|---------|-------|-------------|
| **CSAT** | "How satisfied were you with your support experience?" | 1-5 stars or 1-10 | After ticket resolved |
| **CES** | "[Company] made it easy to handle my issue" | 1-7 agree/disagree | After ticket resolved |
| **NPS** | "How likely are you to recommend [Company]?" | 0-10 | Quarterly (not per ticket) |

### Survey Best Practices

1. **Send within 24 hours of resolution** — Memory fades quickly
2. **Keep it short** — 1-2 questions max for transactional surveys
3. **Allow comments** — Open-text field captures actionable detail
4. **Avoid survey fatigue** — Do not survey same customer more than once per 30 days
5. **Sample, do not census** — Survey 30-50% of closed tickets, not 100%
6. **Follow up on low scores** — Agent or team lead contacts customer within 24 hours

### Correlating QA Scores with CSAT

```
QA-CSAT CORRELATION ANALYSIS:

Expected: QA scores predict CSAT scores (r > 0.50)

If QA and CSAT are correlated:
  → QA rubric is measuring what customers care about
  → Continue using rubric as-is

If QA and CSAT are NOT correlated:
  → QA rubric measures internal process, not customer experience
  → Revise rubric to weight customer-facing dimensions higher
  → Investigate what drives CSAT that QA is not capturing
```

---

## 6. Scoring Framework and Reporting

### Individual Agent Scoring

```
MONTHLY AGENT QA REPORT:

Agent: [Name]
Period: [Month]
Tickets Reviewed: [N]

Overall QA Score: [weighted average across all dimensions]

Dimension Scores:
  Accuracy:        [avg] / 5.0  (weight: 30%)
  Communication:   [avg] / 5.0  (weight: 25%)
  Process:         [avg] / 5.0  (weight: 20%)
  Customer Effort: [avg] / 5.0  (weight: 15%)
  Resolution:      [avg] / 5.0  (weight: 10%)

Trend: [3-month trend arrow]
Auto-Fails: [count]

Top Strength: [dimension with highest score]
Development Area: [dimension with lowest score]

Coaching Notes: [specific observations and recommendations]
```

### Team-Level Reporting

| Metric | Current | Previous | Trend | Target |
|--------|---------|----------|-------|--------|
| Average QA Score | -- | -- | -- | >4.0 |
| CSAT | -- | -- | -- | >88% |
| CES | -- | -- | -- | <2.5 |
| Auto-Fail Rate | -- | -- | -- | <2% |
| QA-CSAT Correlation | -- | -- | -- | >0.50 |

---

## 7. Coaching Loop

### Coaching Framework

QA without coaching is auditing, not quality assurance. The coaching loop converts
QA findings into agent improvement.

```
COACHING CYCLE:

  QA Review
    │
    ├─ Score 4-5 → Positive reinforcement (share as example)
    │
    ├─ Score 3   → Targeted coaching (specific improvement area)
    │
    ├─ Score 1-2 → Intensive coaching (performance plan if recurring)
    │
    └─ Auto-fail → Immediate intervention + review with manager
```

### Coaching Session Structure (30 minutes, bi-weekly)

```
MINUTE 0-5:    CHECK-IN
  How are you doing? Any challenges or wins this week?

MINUTE 5-15:   QA REVIEW
  Share 2-3 reviewed tickets (mix of strong and development)
  Walk through specific examples
  Ask agent to self-assess before sharing your evaluation

MINUTE 15-25:  DEVELOPMENT FOCUS
  Identify one specific skill to improve
  Provide concrete examples and resources
  Role-play or walk through an improved response together
  Set measurable goal for next session

MINUTE 25-30:  ACTION ITEMS
  Summarize key takeaways
  Confirm development focus and goal
  Schedule next session
```

### Performance Tiers

| Tier | QA Score | Action | Cadence |
|------|---------|--------|---------|
| **Star** | >4.5 | Recognition, mentoring opportunities, career growth | Monthly check-in |
| **Solid** | 3.5-4.5 | Standard coaching, targeted development | Bi-weekly coaching |
| **Developing** | 2.5-3.5 | Intensive coaching, additional training | Weekly coaching |
| **At Risk** | <2.5 | Performance improvement plan (PIP) | Daily check-ins |

---

## 8. Automated QA and AI-Assisted Review

### AI QA Capabilities

| Capability | Maturity | Impact |
|-----------|---------|--------|
| **Sentiment analysis** | Mature | Flag negative sentiment in customer or agent messages |
| **Grammar/spelling check** | Mature | Automated writing quality assessment |
| **Rubric scoring** | Emerging | LLM-based evaluation against rubric criteria |
| **Topic classification** | Mature | Verify categorization accuracy |
| **Compliance check** | Medium | Flag potential policy violations or PII exposure |
| **Response completeness** | Emerging | Check if all customer questions were addressed |

### Hybrid QA Model

```
AUTOMATED LAYER (100% coverage):
  - Sentiment analysis on all tickets
  - Grammar/spelling scoring
  - SLA compliance verification
  - Auto-flag: potential auto-fail conditions

HUMAN LAYER (sample):
  - Full rubric review on sampled tickets
  - Review of auto-flagged tickets
  - Calibration with automated scores
  - Coaching conversations based on all data
```

---

## References

1. COPC Inc. (2023). "Customer Experience Standard."
2. ICMI (2022). "Quality Monitoring Best Practices."
3. HDI (2023). "Technical Support Practices Report."
4. Cohen, J. (1960). "A Coefficient of Agreement for Nominal Scales." Educational
   and Psychological Measurement.
5. Dixon, M. et al. (2013). "The Effortless Experience."
6. Parasuraman, A. et al. (1988). "SERVQUAL."

---

**This document is authoritative for quality assurance within the Support Brain.**
