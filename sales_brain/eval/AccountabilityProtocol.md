# Sales Accountability Protocol -- Enforcement and Governance

This document defines how sales performance is tracked, reviewed, and enforced.
Accountability is not punitive. It is systemic.
Without accountability, pipeline is fiction, forecasts are guesses, and losses repeat.

---

## CORE PRINCIPLE

Every sales activity produces data. Data produces insight. Insight produces improvement.
If an activity is not measured, it is not managed. If it is not managed, it degrades.

---

## 1. WIN/LOSS REVIEWS (MANDATORY)

### Trigger Criteria

| Event | Review Required | Deadline |
|-------|----------------|----------|
| Closed Won >$25K | Win review | Within 5 business days of close |
| Closed Lost >$25K | Loss post-mortem | Within 5 business days of loss |
| Closed Lost >$100K | Executive loss review | Within 3 business days of loss |
| Closed Won (strategic account) | Strategic win review | Within 5 business days of close |
| Deal lost to specific competitor 3+ times in quarter | Competitive deep-dive | End of quarter |

### Win Review Format

**Attendees:** Closing rep, manager, SE (if involved), CS lead receiving the account

**Agenda (30 minutes):**
1. Deal summary: size, cycle length, key stakeholders (5 min)
2. What went right: specific actions that won the deal (10 min)
3. Replicable patterns: what can be applied to other deals (10 min)
4. Handoff quality check: is CS fully briefed? (5 min)

**Required Documentation:**
- Winning factors (ranked by importance)
- Customer quotes about why they chose us
- Competitive positioning that worked
- Patterns to add to playbook

### Loss Post-Mortem Format

**Attendees:** Losing rep, manager, SE (if involved), sales ops

**Agenda (45 minutes):**
1. Deal timeline: when and where did it go wrong? (10 min)
2. Qualification analysis: was this deal ever real? (10 min)
3. Competitive analysis: what did the winner do better? (10 min)
4. Process failures: what steps were skipped or done poorly? (10 min)
5. Action items: specific changes for future deals (5 min)

**Required Documentation:**
- Root cause of loss (single primary reason)
- Contributing factors (secondary reasons)
- Process gaps identified
- Specific action items with owners and deadlines
- Customer exit interview notes (if obtained)

### Customer Exit Interview Protocol

For all losses >$25K, attempt a customer exit interview within 10 business days:
- Request 15-20 minutes of the prospect's time
- Frame as learning, not a save attempt: "We respect your decision. We just want to learn."
- Use a standard question set:
  1. What was the primary factor in your decision?
  2. Where did we fall short compared to the chosen vendor?
  3. Was there a moment where you shifted away from us?
  4. What could we have done differently?
  5. Would you consider us for future needs?
- Document responses verbatim. Share with team anonymized.

### Non-Compliance Consequences

- Win/loss reviews not completed within deadline: flagged in weekly pipeline meeting
- Three missed reviews in a quarter: formal coaching conversation
- Repeated non-compliance: included in performance review

---

## 2. FORECAST ACCURACY TRACKING (QUARTERLY)

### Measurement Framework

| Metric | Calculation | Target | Red Flag |
|--------|------------|--------|----------|
| Commit Accuracy | Actual closed / Commit forecast | >= 90% | < 80% |
| Best Case Accuracy | Actual closed / Best case forecast | >= 70% | < 60% |
| Close Date Accuracy | Deals closed within 2 weeks of forecast date / Total deals | >= 75% | < 60% |
| Stage Accuracy | Deals that progressed as staged / Total deals | >= 80% | < 65% |
| Coverage Ratio | Pipeline / Quota at quarter start | >= 3.0x | < 2.5x |

### Tracking Cadence

| Review | Frequency | Participants | Focus |
|--------|-----------|-------------|-------|
| Forecast call | Weekly | Rep + Manager | Deal-by-deal commit validation |
| Pipeline review | Weekly | Manager + Team | Stage accuracy, hygiene, next steps |
| Forecast submission | Monthly (Week 3) | Rep | Updated commit, best case, upside |
| Accuracy review | Quarterly | Manager + Sales Ops | Variance analysis, trend identification |
| Executive forecast | Monthly | VP Sales + Managers | Roll-up accuracy, capacity planning |

### Individual Forecast Scorecard

Each rep receives a quarterly forecast accuracy scorecard:

```
## Forecast Accuracy: [Rep Name] -- Q[X] [Year]

| Month | Commit Forecast | Actual Closed | Variance | Rating |
|-------|----------------|---------------|----------|--------|
| M1 | $[X] | $[Y] | [Z]% | [A/B/C/D] |
| M2 | $[X] | $[Y] | [Z]% | [A/B/C/D] |
| M3 | $[X] | $[Y] | [Z]% | [A/B/C/D] |

**Quarterly Variance:** [X]%
**Rating:** A (<5%), B (5-10%), C (10-20%), D (>20%)

**Deals that slipped from commit:**
1. [Deal Name] -- reason: [reason]
2. [Deal Name] -- reason: [reason]

**Action plan for improvement:** [if rating C or D]
```

### Accuracy Improvement Protocol

- Rating A (2 consecutive quarters): Eligible for forecast autonomy (reduced oversight)
- Rating B: Standard forecast cadence maintained
- Rating C: Additional weekly forecast call with manager required
- Rating D: Daily deal check-ins for the following quarter. Forecast methodology retraining required.

---

## 3. DEAL POST-MORTEMS FOR LOSSES >$25K

### Post-Mortem Depth Levels

| Deal Size | Depth | Duration | Participants |
|-----------|-------|----------|-------------|
| $25K-$50K | Standard | 30 min | Rep + Manager |
| $50K-$100K | Enhanced | 45 min | Rep + Manager + SE |
| $100K-$250K | Executive | 60 min | Rep + Manager + SE + VP |
| >$250K | Strategic | 90 min | Full leadership + Product |

### Standard Post-Mortem Template

```
## Deal Post-Mortem: [Deal Name]

**Date of Loss:** [Date]
**Deal Value:** $[Amount]
**Sales Cycle Length:** [X] days
**Stage at Loss:** [Stage]
**Competitor Won:** [Name] or "No decision"

### 1. Deal Summary
- What was the opportunity?
- Who were the key stakeholders?
- What was the compelling event?

### 2. Timeline Analysis
- Key milestones and dates
- Where did the deal stall or shift?
- Was the timeline realistic?

### 3. Root Cause Analysis
Primary reason for loss: [Single root cause]
Contributing factors:
- [Factor 1]
- [Factor 2]
- [Factor 3]

### 4. MEDDPICC Gap Analysis
| Element | Status | Gap Identified |
|---------|--------|---------------|
| Metrics | Complete/Incomplete | [Gap] |
| Economic Buyer | Accessed/Not Accessed | [Gap] |
| Decision Criteria | Known/Unknown | [Gap] |
| Decision Process | Mapped/Not Mapped | [Gap] |
| Paper Process | Known/Unknown | [Gap] |
| Identify Pain | Quantified/Not Quantified | [Gap] |
| Champion | Confirmed/Weak/None | [Gap] |
| Competition | Mapped/Not Mapped | [Gap] |

### 5. What We Would Do Differently
1. [Specific action, not vague]
2. [Specific action, not vague]
3. [Specific action, not vague]

### 6. Patterns to Watch
- Does this loss share characteristics with other recent losses?
- Is there a systemic issue (product, process, positioning)?

### 7. Action Items
| Action | Owner | Deadline |
|--------|-------|----------|
| [Action] | [Name] | [Date] |
```

### Post-Mortem Insights Aggregation

Sales Ops aggregates post-mortem data quarterly to identify trends:
- Top 3 reasons for loss (by frequency)
- Top 3 reasons for loss (by revenue impact)
- Competitor-specific loss patterns
- Stage where most deals are lost
- MEDDPICC elements most commonly incomplete at time of loss
- Recommended systemic changes based on patterns

---

## 4. PIPELINE HYGIENE AUDITS (WEEKLY)

### Audit Scope

Every open deal in pipeline is evaluated weekly against these criteria:

| Criterion | Standard | Violation |
|-----------|----------|-----------|
| **Next step defined** | Specific action, named person, date | "Following up" or blank |
| **Stage accuracy** | Entry criteria met for current stage | Deal placed by hope, not evidence |
| **Close date realism** | Date supported by mutual action plan | Date is "end of quarter" with no plan |
| **Activity recency** | Customer interaction within 14 days | No activity for 14+ days |
| **Contact freshness** | Champion engaged within 7 days | Champion dark for 7+ days |
| **Amount accuracy** | Reflects current scope discussion | Number from initial estimate, never updated |
| **Competitor status** | Known competitors documented | "Unknown" for deal in Stage 3+ |

### Weekly Audit Process

**Monday: Rep self-audit (15 minutes)**
- Review every open deal against the criteria above
- Update CRM with current information
- Flag any deals that need manager discussion

**Tuesday: Manager audit (30 minutes per rep)**
- Review each rep's pipeline in 1:1
- Challenge stage placement: "What evidence supports Stage [X]?"
- Challenge close dates: "What must happen between now and [date]?"
- Challenge amounts: "Has the scope changed since we first estimated?"
- Identify at-risk deals and co-create action plans

**Wednesday: Sales Ops audit**
- Run automated pipeline hygiene report
- Flag violations:
  - Deals with no next step
  - Deals in same stage for >2x average duration
  - Deals with close date in the past
  - Deals with no activity for 14+ days
- Distribute violation report to managers

### Hygiene Scoring

Each rep's pipeline receives a weekly hygiene score:

| Score | Criteria | Action |
|-------|----------|--------|
| A (90-100%) | All deals compliant | None required |
| B (75-89%) | Minor gaps, quickly fixable | Fix within 24 hours |
| C (60-74%) | Multiple gaps, some concerning | Manager coaching conversation |
| D (<60%) | Systemic pipeline quality issue | Pipeline freeze until cleaned |

### Pipeline Freeze Protocol

When a rep's pipeline hygiene drops to D:
1. All deal advancement frozen until pipeline is cleaned
2. Manager and rep conduct deal-by-deal review (2-4 hours)
3. Deals that do not meet stage criteria are downgraded
4. Stale deals are moved to nurture or closed-lost
5. All remaining deals must have complete MEDDPICC and next steps
6. Pipeline unfreezes when score reaches B or above

---

## 5. QUARTERLY BUSINESS REVIEW (QBR)

### QBR Structure

Each rep conducts a formal QBR with their manager and VP:

**Duration:** 60-90 minutes
**Frequency:** Quarterly (within 2 weeks of quarter end)

**Agenda:**
1. Results review (15 min): quota attainment, key wins, key losses
2. Forecast accuracy review (10 min): scorecard review, trend analysis
3. Pipeline analysis (15 min): coverage, quality, stage distribution
4. Win/loss themes (10 min): patterns from post-mortems
5. Skill assessment (10 min): SalesScore dimensions reviewed
6. Territory/account plan (15 min): strategic plans for next quarter
7. Development plan (10 min): skills to build, training needed

### QBR Scorecard

```
## QBR: [Rep Name] -- Q[X] [Year]

| Category | Metric | Target | Actual | Rating |
|----------|--------|--------|--------|--------|
| Quota Attainment | % of quota | 100% | [X]% | |
| Forecast Accuracy | Commit variance | <10% | [X]% | |
| Pipeline Coverage | Coverage ratio | 3.0x | [X]x | |
| Pipeline Hygiene | Average weekly score | A | [X] | |
| Win Rate | Deals won / Deals closed | [X]% | [X]% | |
| Average Deal Size | ASP | $[X] | $[X] | |
| Sales Cycle | Average days | [X] | [X] | |
| Post-Mortem Compliance | Reviews completed | 100% | [X]% | |

**Overall Rating:** [Exceeds / Meets / Below / Critical]
**Key Strengths:** [Top 2-3]
**Key Development Areas:** [Top 2-3]
**Action Plan:** [Specific actions for next quarter]
```

---

## 6. ESCALATION FRAMEWORK

### When to Escalate

| Situation | Escalation Level | Timeline |
|-----------|-----------------|----------|
| Deal at risk (identified in scoring) | Manager | Same day |
| Competitive threat requiring executive engagement | VP Sales | Within 24 hours |
| Customer escalation / complaint during deal | Manager + CS lead | Same day |
| Pricing exception needed >20% | VP Sales | Before presenting to customer |
| Strategic account risk (>$200K) | CRO | Within 24 hours |
| Process violation identified | Manager | Same day |
| Repeated forecast misses (3+ months) | VP Sales | End of quarter |

### Escalation Documentation

Every escalation must include:
1. What is happening (facts, not interpretation)
2. What has been tried so far
3. What specifically is needed from the escalation target
4. Recommended course of action
5. Timeline / urgency

### Escalation Response SLA

| Level | Response Time | Resolution Target |
|-------|-------------- |-------------------|
| Manager | Same business day | 48 hours |
| VP Sales | Within 24 hours | 1 week |
| CRO | Within 24 hours | Case-dependent |

---

## 7. PERFORMANCE IMPROVEMENT PROTOCOL

### Triggers for Performance Improvement Plan (PIP)

A PIP is initiated when:
- Quota attainment below 70% for 2 consecutive quarters
- Forecast accuracy rated D for 2 consecutive quarters
- Pipeline hygiene consistently at D level
- SalesScore average below 3.0 for 2 consecutive quarterly reviews
- Repeated non-compliance with accountability protocols

### PIP Structure

**Duration:** 60-90 days
**Check-ins:** Weekly with manager, bi-weekly with VP

**PIP Components:**
1. Specific performance gaps identified with data
2. Measurable improvement targets (not vague)
3. Resources and support provided (training, coaching, ride-alongs)
4. Weekly milestones to track progress
5. Clear success criteria for completing the PIP
6. Clear consequences if PIP targets are not met

### PIP is NOT Punitive

A PIP is a structured support system. The goal is improvement, not termination.
Managers are accountable for providing the resources and coaching committed in the PIP.
If a rep improves but then regresses, the system failed, not just the rep.

---

## 8. DATA INTEGRITY AND REPORTING

### CRM Data Requirements

Every deal must have the following fields accurate and current:

| Field | Update Frequency | Validated By |
|-------|-----------------|-------------|
| Deal stage | At every stage change | Manager (weekly review) |
| Close date | Weekly or at any change | Manager (weekly review) |
| Deal amount | At any scope change | Manager (proposal review) |
| Next step | After every interaction | Rep (same day) |
| MEDDPICC fields | At every stage change | Manager (stage review) |
| Competitor | When identified | Rep (discovery) |
| Loss reason | At close-lost | Manager (post-mortem) |
| Win reason | At close-won | Manager (win review) |

### Reporting Cadence

| Report | Frequency | Audience | Owner |
|--------|-----------|----------|-------|
| Pipeline snapshot | Daily (automated) | Managers | Sales Ops |
| Forecast roll-up | Weekly | VP Sales + Managers | Sales Ops |
| Activity metrics | Weekly | Managers | Sales Ops |
| Win/loss summary | Monthly | Leadership | Sales Ops |
| Forecast accuracy | Quarterly | Leadership + Board | Sales Ops |
| Pipeline trends | Quarterly | Leadership | Sales Ops |
| Competitive intelligence | Quarterly | All Sales | Sales Ops + PMM |

---

## 9. CONTINUOUS IMPROVEMENT LOOP

### Monthly Retrospective

Sales team conducts a monthly retrospective (30 minutes):
- What worked this month? (Celebrate wins with specifics)
- What did not work? (Identify patterns, not blame)
- What will we try next month? (One or two specific experiments)

### Quarterly Playbook Update

Based on accumulated win/loss data and post-mortems:
- Update competitive battle cards
- Revise objection handling scripts
- Adjust qualification criteria if market has shifted
- Add new benchmark scenarios from real deal situations
- Update scoring criteria if thresholds are too lenient or strict

### Annual Accountability Review

Once per year, the entire accountability framework is reviewed:
- Are the right things being measured?
- Are the thresholds appropriate?
- Is the cadence sustainable?
- What should be added, removed, or changed?

---

## ENFORCEMENT RULE

Accountability is a system, not a conversation.
Systems run whether you feel like it or not.
Every protocol in this document is mandatory.
Non-compliance is tracked and addressed.
The goal is not perfection. The goal is systematic improvement.

---

## END OF ACCOUNTABILITY PROTOCOL
