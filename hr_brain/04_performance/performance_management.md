# Performance Management -- Review Systems, Goals, and Calibration

## Purpose

This module defines the framework for managing employee performance. Performance management is the most consequential and most frequently misexecuted HR process. Research from CEB/Gartner indicates that 95% of managers are dissatisfied with their organization's performance management system, and 59% of employees find reviews neither accurate nor motivating. The HR Brain mandates evidence-based performance management that drives development, ensures fairness through calibration, and provides defensible documentation.

---

## 1. Performance Review Systems

### 1.1 Evolution of Performance Management

| Era | Model | Characteristics | Limitations |
|-----|-------|----------------|-------------|
| Traditional (pre-2000) | Annual appraisal | Once-a-year rating; manager-driven; backward-looking | Recency bias; low accuracy; demotivating |
| Forced ranking (2000s) | Stack ranking (GE, Microsoft) | Relative ranking; forced distribution; up-or-out | Destroys collaboration; political gaming; legal risk |
| Continuous feedback (2010s+) | Real-time feedback | Ongoing check-ins; lightweight reviews; forward-looking | May lack structure; documentation gaps if not formalized |
| Performance enablement (current) | Integrated system | Goals + continuous feedback + calibration + development | Requires manager capability; technology-dependent |

### 1.2 Review Cycle Design

**Recommended cycle (performance enablement model):**

```
ANNUAL CYCLE

Q1 (January-March):
  - Goal setting for the year (aligned to team/company OKRs)
  - Development plan creation (IDP)
  - Manager-employee alignment on expectations

Q2 (April-June):
  - Mid-point check-in (lightweight; 30-minute conversation)
  - Goal progress review and adjustment
  - Feedback exchange (bidirectional)

Q3 (July-September):
  - Mid-year review (more substantial; documented)
  - Goal recalibration if needed
  - Development plan progress check

Q4 (October-December):
  - Year-end self-assessment
  - Manager assessment
  - Calibration sessions
  - Year-end review conversation
  - Rating finalized

ONGOING:
  - Weekly or biweekly 1:1 meetings (manager-employee)
  - Real-time feedback (peer and manager)
  - Continuous goal tracking
```

### 1.3 Rating Scales

**Recommended five-point scale:**

| Rating | Label | Distribution Target | Description |
|:---:|-------|:---:|-------------|
| 5 | Exceptional | ~5% | Consistently exceeds all expectations; extraordinary impact; role model |
| 4 | Exceeds expectations | ~20% | Frequently exceeds expectations; strong impact; high-quality work |
| 3 | Meets expectations | ~50% | Reliably meets expectations; solid contributor; consistent performer |
| 2 | Needs improvement | ~20% | Sometimes falls short; specific development areas identified; improvement plan |
| 1 | Unsatisfactory | ~5% | Consistently fails to meet expectations; PIP or separation warranted |

**Important**: Distribution targets are guidelines for calibration, NOT forced distributions. If a team genuinely has no low performers, do not artificially assign low ratings. The purpose is to counter rating inflation, not to punish.

### 1.4 What to Evaluate

| Dimension | Weight | Definition | Measurement |
|-----------|:---:|------------|-------------|
| **Results/Impact** | 50% | Achievement of goals and objectives; measurable output | OKR/goal attainment; quantitative metrics |
| **Competencies/How** | 30% | Demonstration of role-level competencies; how results are achieved | Behavioral evidence against competency rubric |
| **Growth/Development** | 20% | Learning, skill development, stretch assignments | IDP progress; new capabilities demonstrated |

**Anti-pattern**: Evaluating only on results creates incentive to achieve goals through toxic behavior. Evaluating only on behaviors ignores outcomes. Both dimensions are required.

---

## 2. Continuous Feedback

### 2.1 Research Foundation

Feedback frequency is a key driver of performance improvement. Amabile and Kramer (2011, "The Progress Principle") found that the single most important motivating event in day-to-day work life is making progress on meaningful work, and feedback enables progress awareness.

Kluger and DeNisi's (1996) meta-analysis of feedback interventions found that feedback improves performance in only about 60% of cases. The other 40% actually decreased performance. The difference depends on:

- **Effective feedback**: Task-focused, specific, actionable, forward-looking
- **Ineffective feedback**: Person-focused, vague, judgmental, backward-looking

### 2.2 Real-Time Feedback Framework

```
SITUATION: Describe the specific situation or context
BEHAVIOR:  Describe the specific observable behavior
IMPACT:    Describe the impact of that behavior on outcomes or others
REQUEST:   (If constructive) Describe the specific change requested

Example (reinforcing):
"In today's sprint planning (S), you proactively identified the dependency
between the auth and payments work (B), which allowed us to sequence the
sprint correctly and avoid a blocked sprint (I). Keep flagging cross-team
dependencies early — it saves the team significant rework."

Example (constructive):
"During the client presentation yesterday (S), you shared the revised
timeline without confirming with the engineering lead first (B), which
created a commitment we may not be able to meet (I). In the future,
please validate technical timelines with the tech lead before
communicating to clients (R)."
```

### 2.3 Manager 1:1 Framework

Weekly or biweekly 1:1 meetings are the primary vehicle for ongoing performance management. Structure:

```
1:1 MEETING TEMPLATE (30 minutes)

Employee-driven (first 15 minutes):
  - What's going well? (Wins, progress, positive developments)
  - What's blocking you? (Obstacles, resource needs, concerns)
  - What do you need from me? (Support, decisions, air cover)

Manager-driven (next 10 minutes):
  - Feedback on recent work (specific, timely)
  - Alignment on priorities for coming week
  - Coaching on development areas

Career/Development (last 5 minutes, rotating):
  - IDP progress
  - Career aspirations check-in
  - Stretch opportunity identification

DOCUMENTATION:
  - Shared running document (Google Doc, Notion, 15Five)
  - Employee owns the document; manager contributes
  - Action items tracked and followed up
```

---

## 3. Goal-Setting Frameworks

### 3.1 OKRs (Objectives and Key Results)

Originally developed at Intel (Andy Grove) and popularized at Google (John Doerr, "Measure What Matters").

**Structure:**
```
Objective: What we want to achieve (qualitative, inspirational, ambitious)
  Key Result 1: How we measure progress (quantitative, measurable, time-bound)
  Key Result 2: Another measurable indicator
  Key Result 3: Another measurable indicator (typically 2-5 KRs per Objective)

Example:
Objective: Build a world-class customer onboarding experience
  KR1: Reduce time to value from 14 days to 5 days
  KR2: Increase onboarding NPS from 32 to 55
  KR3: Achieve 90% feature adoption within 30 days of account creation
```

**OKR principles:**
- Set quarterly (aligned to annual objectives)
- Ambitious: Achieving 70% of stretch OKRs indicates appropriate difficulty
- Transparent: Visible to entire organization (alignment and accountability)
- Decoupled from compensation: OKR attainment should inform but not directly determine bonus (prevents sandbagging)
- Bottom-up alignment: ~60% of OKRs should originate from teams/individuals, aligned to company objectives

### 3.2 SMART Goals

For roles where OKRs are less appropriate (operational, support, administrative):

| Component | Definition | Example |
|-----------|-----------|---------|
| **Specific** | Clear, unambiguous statement of what will be accomplished | "Reduce accounts receivable aging over 60 days" |
| **Measurable** | Quantifiable metric for success | "From 15% to under 5% of total receivables" |
| **Achievable** | Realistic given resources and constraints | Validated with finance team and historical data |
| **Relevant** | Connected to team and organizational goals | Directly impacts company cash flow position |
| **Time-bound** | Clear deadline | "By end of Q3" |

### 3.3 Goal-Setting Theory (Locke & Latham, 2002)

Research principles that govern all goal-setting:

1. **Specific, difficult goals lead to higher performance** than vague "do your best" goals (d = 0.82)
2. **Goal commitment** moderates the goal-performance relationship (goals only work if the person commits)
3. **Feedback** is essential for goals to improve performance (without feedback, goals are less effective)
4. **Task complexity** moderates the effect (for complex tasks, learning goals outperform performance goals)
5. **Self-efficacy** mediates goal effects (people who believe they can achieve the goal perform better)

---

## 4. Calibration

### 4.1 Purpose

Calibration is the process by which managers compare and discuss their performance ratings to ensure consistency and fairness across the organization. Without calibration, rating variance is primarily a function of manager leniency/severity, not employee performance.

### 4.2 Calibration Session Design

**Participants:**
- All managers at a given level within a function/department
- HRBP as facilitator and process owner
- Department head as final arbiter

**Process:**
```
PRE-CALIBRATION:
1. Managers submit provisional ratings for all direct reports
2. HRBP prepares distribution analysis (ratings by manager, by demographic group)
3. HRBP flags statistical outliers (managers significantly above/below average)

CALIBRATION SESSION (2-3 hours per department):
1. Review rating distribution for the group as a whole
2. Discuss employees at the extremes first (5s and 1s — every exceptional
   or unsatisfactory rating must be justified with specific evidence)
3. Discuss "borderline" cases (where manager is uncertain or rating changed)
4. Cross-manager comparison: Are similarly-performing employees rated consistently?
5. Bias audit: Are there patterns by gender, race, age, or other demographic?
6. Finalize ratings by consensus

POST-CALIBRATION:
1. HRBP documents final ratings and key discussion points
2. Managers notified of any rating changes
3. Manager-employee review conversations scheduled
4. Compensation team receives finalized ratings for merit/bonus processing
```

### 4.3 Calibration Anti-Patterns

| Anti-Pattern | Risk | Mitigation |
|-------------|------|-----------|
| Calibration becomes horse-trading | Managers "trade" ratings to get their favorites rated higher | Evidence-based discussion; facilitator enforces behavioral examples |
| Loudest voice wins | Dominant manager influences ratings of other teams | Structured round-robin; each manager presents own team |
| Recency bias in discussion | Discussion focuses on last month, not full year | Require evidence from full review period; reference quarterly check-ins |
| Demographics not examined | Systematic bias goes undetected | HRBP runs demographic analysis pre-session; presents patterns |
| Ratings adjusted without communication | Manager blindsided by calibration changes | Manager-employee conversation always discusses the calibrated rating |

---

## 5. Performance Improvement Plans (PIPs)

### 5.1 When to Use a PIP

A PIP is appropriate when:
- An employee has been given clear feedback about performance deficiencies
- Informal coaching has not produced sufficient improvement
- The performance issues are specific, documented, and within the employee's control
- The organization genuinely wants the employee to succeed (a PIP should not be a termination formality)

### 5.2 PIP Structure

```
PERFORMANCE IMPROVEMENT PLAN

Employee: [Name]                    Manager: [Name]
Date initiated: [Date]             Review period: 30/60/90 days
HRBP: [Name]                       Department: [Department]

SECTION 1: PERFORMANCE DEFICIENCIES
Specific, documented performance gaps with examples:
- [Gap 1]: [Specific examples with dates]
- [Gap 2]: [Specific examples with dates]
- [Gap 3]: [Specific examples with dates]

SECTION 2: EXPECTED PERFORMANCE STANDARDS
Clear, measurable expectations the employee must meet:
- [Standard 1]: [Measurable criteria]
- [Standard 2]: [Measurable criteria]
- [Standard 3]: [Measurable criteria]

SECTION 3: SUPPORT PROVIDED
Resources the organization will provide:
- Weekly 1:1 with manager (specific feedback and coaching)
- Training or skill development (if applicable)
- Mentoring or pairing with senior colleague
- Adjusted workload or priorities (if applicable)

SECTION 4: TIMELINE AND MILESTONES
- Week 2: First progress check [specific expectations]
- Week 4: Mid-point review [specific expectations]
- Week 6-8: Final review [specific expectations]
- End of PIP: Pass/fail determination

SECTION 5: CONSEQUENCES
"Failure to meet the standards outlined in this plan within the
specified timeframe may result in additional disciplinary action,
up to and including termination of employment."

Signatures:
Employee: _________________ Date: _______
Manager: _________________ Date: _______
HRBP: _________________ Date: _______
```

### 5.3 PIP Best Practices

- **Document everything**: Every meeting, every piece of feedback, every milestone check
- **Be specific and measurable**: Vague PIPs are not legally defensible and not helpful to the employee
- **Provide genuine support**: If the goal is improvement, invest in coaching and resources
- **Check your motives**: If you have already decided to terminate, do not use a PIP as a paper trail (this is bad faith and legally risky)
- **DEIB review**: Before initiating a PIP, HRBP must verify that similarly-situated employees have been treated consistently (preventing selective enforcement)
- **Duration**: Typically 30-90 days (30 for operational roles; 60-90 for complex roles)
- **Legal review**: HRBP should review the PIP with employment counsel if the employee is in a protected class or has recently engaged in protected activity

### 5.4 PIP Outcomes

| Outcome | Action | Documentation |
|---------|--------|---------------|
| Successful improvement | Return to regular performance management; positive recognition | PIP completion memo; continued monitoring for 6 months |
| Partial improvement | Extend PIP with modified goals (one extension maximum) | Updated PIP with revised timeline |
| Insufficient improvement | Proceed with termination per progressive discipline policy | Final PIP review documentation; termination decision memo |
| Employee resignation | Accept resignation; process offboarding | Resignation documentation; PIP file retained |

---

## 6. Performance Data and Analytics

### 6.1 Rating Distribution Analysis

Monitor rating distributions across the organization for patterns:

```
RATING DISTRIBUTION REPORT

Overall:   5: 6%  |  4: 22%  |  3: 48%  |  2: 19%  |  1: 5%

By department:
  Engineering:  5: 8%  |  4: 25%  |  3: 45%  |  2: 18%  |  1: 4%
  Sales:        5: 12% |  4: 28%  |  3: 35%  |  2: 20%  |  1: 5%  ← Investigate high 5 rate
  Marketing:    5: 3%  |  4: 15%  |  3: 55%  |  2: 22%  |  1: 5%  ← Investigate low top ratings

By manager:
  Manager A:    Average: 4.2  (n=8)  ← Potential leniency bias
  Manager B:    Average: 2.8  (n=6)  ← Potential severity bias
  Manager C:    Average: 3.4  (n=10) ← Appropriate distribution

By demographic group (for equity):
  Gender, race/ethnicity, age cohort — check for systematic rating gaps
  If gap > 0.3 points on 5-point scale, investigate for bias
```

### 6.2 Performance-Attrition Correlation

Track the relationship between performance ratings and voluntary turnover:

| Rating | Voluntary Turnover Rate | Alert |
|:---:|:---:|---|
| 5 | >10% | Critical: losing top talent; investigate retention |
| 4 | >12% | Concerning: high performers leaving; comp review |
| 3 | 8-12% | Normal range for steady performers |
| 2 | >15% | May indicate PIP-adjacent employees self-selecting out |
| 1 | >25% | Expected: lowest performers leave or are managed out |

---

## References

- Aguinis, H. (2019). *Performance Management* (4th ed.). Chicago Business Press.
- Amabile, T. M., & Kramer, S. J. (2011). *The Progress Principle*. Harvard Business Review Press.
- Doerr, J. (2018). *Measure What Matters*. Portfolio/Penguin.
- Kluger, A. N., & DeNisi, A. (1996). The effects of feedback interventions on performance. *Psychological Bulletin*, 119(2), 254-284.
- Locke, E. A., & Latham, G. P. (2002). Building a practically useful theory of goal setting and task motivation. *American Psychologist*, 57(9), 705-717.
- Murphy, K. R. (2020). Performance evaluation will not die, but it should. *Human Resource Management Journal*, 30(1), 13-31.
- Pulakos, E. D. (2009). *Performance Management: A New Approach for Driving Business Results*. Wiley-Blackwell.

---

**This module governs all performance management. Fair, documented, and development-oriented.**
