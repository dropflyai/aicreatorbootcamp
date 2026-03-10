# Accountability Protocol -- Business Decision Governance

Framework for tracking, reviewing, and learning from business decisions. Ensures that strategic recommendations are not just made but are tracked to outcomes, reviewed honestly, and used to improve future decision-making.

---

## Core Principle

> Every strategic decision must be documented before execution, reviewed during execution, and assessed after execution. Decisions without accountability are guesses.

---

## 1. Decision Log Protocol

Every significant business decision MUST be logged before execution begins.

### Decision Log Entry Format

```
## Decision: [DECISION-YYYY-NNN] [Title]

**Date:** YYYY-MM-DD
**Decision Maker:** [Name/Role]
**Category:** Strategy | Finance | Operations | Marketing | Product | People | Legal
**Reversibility:** One-Way Door | Two-Way Door
**Confidence Level:** Low (30-50%) | Medium (50-70%) | High (70-90%) | Very High (90%+)

### Context
[What situation prompted this decision? What problem are we solving?]

### Options Considered
1. [Option A] -- [One-line summary]
2. [Option B] -- [One-line summary]
3. [Option C] -- [One-line summary]

### Decision
[What was decided and why]

### Key Assumptions
1. [Assumption 1] -- Falsifiable by [how to test]
2. [Assumption 2] -- Falsifiable by [how to test]
3. [Assumption 3] -- Falsifiable by [how to test]

### Expected Outcomes
| Metric | Current | Target | Timeline |
|--------|---------|--------|----------|
| [Metric 1] | [Current value] | [Target value] | [By when] |
| [Metric 2] | [Current value] | [Target value] | [By when] |

### Kill Criteria
Under these conditions, we reverse or abandon this decision:
1. [Condition 1]
2. [Condition 2]
3. [Condition 3]

### Tradeoffs Accepted
1. [What we are giving up]
2. [What becomes harder]
3. [What risk we are taking on]

### Review Schedule
- [ ] 30-day check-in: YYYY-MM-DD
- [ ] 90-day review: YYYY-MM-DD
- [ ] 6-month assessment: YYYY-MM-DD
```

### What Qualifies as a "Significant Decision"

Log decisions that meet ANY of these criteria:
- Involves spending more than $10K
- Affects more than 3 team members
- Is irreversible or costly to reverse (one-way door)
- Changes strategic direction or positioning
- Commits the company to a partner, vendor, or platform
- Affects customer-facing product or pricing
- Has legal or regulatory implications

---

## 2. Review Cadence

### Weekly: Decision Pulse Check (15 minutes)

| Question | Action |
|----------|--------|
| Any new decisions to log? | Add to Decision Log |
| Any kill criteria triggered this week? | Escalate immediately |
| Any assumptions invalidated? | Flag for 30-day review |
| Any decisions stuck in analysis paralysis? | Set decision deadline |

### Monthly: 30-Day Decision Review (30 minutes per decision)

For each decision logged 30 days ago:

| Check | Question | Status |
|-------|----------|--------|
| Execution | Has execution begun? If not, why? | On Track / Delayed / Blocked |
| Assumptions | Are key assumptions still valid? | Valid / Uncertain / Invalidated |
| Early Signals | What early data do we have? | Positive / Neutral / Negative |
| Kill Criteria | Have any kill criteria been triggered? | No / Approaching / Triggered |
| Course Correction | Do we need to adjust approach? | No / Minor / Major |

**Output:** Brief written update appended to Decision Log entry.

### Quarterly: 90-Day Decision Retrospective (60 minutes)

Deeper review of all decisions from the previous quarter:

#### Part 1: Decision Inventory
| Decision | Date | Category | Status | On Track? |
|----------|------|----------|--------|-----------|
| [Title] | [Date] | [Cat] | Active / Completed / Reversed / Abandoned | Yes / No |

#### Part 2: Decision Quality Assessment
For each completed or in-progress decision:

| Dimension | Score (1-5) | Notes |
|-----------|-------------|-------|
| Information quality at time of decision | __ | Did we have enough data? |
| Option generation | __ | Did we consider enough alternatives? |
| Reasoning quality | __ | Was the logic sound? |
| Speed appropriateness | __ | Too fast? Too slow? |
| Execution quality | __ | Did we execute as planned? |
| Outcome quality | __ | Did we get the result we expected? |

**Note:** Outcome quality is separate from decision quality. A good decision can have a bad outcome (bad luck). A bad decision can have a good outcome (good luck). Evaluate both independently.

#### Part 3: Pattern Recognition
- What types of decisions are we making well?
- What types of decisions are we making poorly?
- Are there systematic biases in our decision-making?
- What would we do differently with the information available at decision time?

### Semi-Annual: 6-Month Decision Audit (Half day)

Comprehensive review of all decisions from the past 6 months:

1. **Decision Outcome Classification:**
   | Category | Count | Percentage |
   |----------|-------|-----------|
   | Decisions that achieved target outcomes | __ | __%  |
   | Decisions that partially achieved outcomes | __ | __% |
   | Decisions that failed to achieve outcomes | __ | __% |
   | Decisions that were reversed or abandoned | __ | __% |

2. **Calibration Check:**
   How well did our confidence levels match reality?
   | Stated Confidence | Actual Success Rate | Calibrated? |
   |-------------------|---------------------|-------------|
   | Very High (90%+) | __% | Over / Under / Calibrated |
   | High (70-90%) | __% | Over / Under / Calibrated |
   | Medium (50-70%) | __% | Over / Under / Calibrated |
   | Low (30-50%) | __% | Over / Under / Calibrated |

3. **Decision Speed Analysis:**
   | Decision Type | Average Time to Decision | Optimal? | Action |
   |---------------|-------------------------|----------|--------|
   | One-way doors | [X days] | [Yes/No] | [Speed up / Slow down / Maintain] |
   | Two-way doors | [X days] | [Yes/No] | [Speed up / Slow down / Maintain] |

---

## 3. Kill Criteria Protocol

Kill criteria are pre-committed conditions under which a decision is reversed. They prevent sunk cost fallacy and status quo bias.

### Setting Kill Criteria

Every significant decision MUST have at least 2 kill criteria defined BEFORE execution begins.

**Good Kill Criteria:**
- Specific: "Revenue from this product line falls below $50K/month for 3 consecutive months"
- Measurable: uses quantifiable metrics, not subjective judgment
- Time-bound: includes a deadline for evaluation
- Pre-committed: agreed upon before execution begins (not moved after the fact)

**Bad Kill Criteria:**
- Vague: "If it doesn't work out"
- Unmeasurable: "If the team doesn't feel good about it"
- No deadline: "If revenue is low" (when? how low?)

### Kill Criteria Enforcement

| Trigger Level | Action Required |
|---------------|----------------|
| Yellow: approaching kill threshold | Flag in weekly pulse check. Prepare contingency plan. |
| Orange: kill criteria met for < full duration | Escalate to decision maker. Begin contingency preparation. Determine if threshold should be updated (only with new information, not sunk cost). |
| Red: kill criteria fully met | Execute pre-committed response. Reverse, pivot, or abandon. Document outcome in Decision Log. |

### Common Kill Criteria Templates

**For new product/feature:**
- Customer usage falls below [X] weekly active users after [Y] months
- CAC exceeds [X] for [Y] consecutive months
- Revenue from product is less than [$X] after [Y] months

**For hiring/team decisions:**
- Employee NPS falls below [X] for [Y] consecutive quarters
- Team velocity drops below [X%] of baseline after [Y] sprints
- Attrition exceeds [X%] annualized for [Y] consecutive months

**For partnership/vendor decisions:**
- SLA violations exceed [X] per month for [Y] consecutive months
- Integration delivers less than [X%] of projected value after [Y] months
- Partner revenue share exceeds [X%] of gross margin

**For strategic initiatives:**
- Market share does not increase by [X%] within [Y] months
- Key assumption [X] is invalidated
- Competitive response makes our position untenable (defined by [specific metric])

---

## 4. Post-Mortem Protocol

Every reversed, abandoned, or failed decision gets a post-mortem.

### Post-Mortem Structure

```
## Post-Mortem: [DECISION-YYYY-NNN] [Title]

**Date of Decision:** YYYY-MM-DD
**Date of Post-Mortem:** YYYY-MM-DD
**Outcome:** Reversed | Abandoned | Failed | Partial Success

### What happened?
[Factual timeline from decision to outcome]

### What did we expect vs. what occurred?
| Metric | Expected | Actual | Delta |
|--------|----------|--------|-------|
| [Metric] | [Expected] | [Actual] | [Difference] |

### Root Cause Analysis
1. Was the decision wrong given information at the time? [Yes/No/Partly]
2. Was execution the problem? [Yes/No/Partly]
3. Did external factors change? [Yes/No -- what changed?]
4. Were key assumptions wrong? [Yes/No -- which ones?]

### Lessons Learned
1. [Lesson 1 -- what we will do differently]
2. [Lesson 2 -- what we will do differently]
3. [Lesson 3 -- what we will do differently]

### Process Improvements
- Should this type of decision require more analysis? [Yes/No]
- Should kill criteria have been tighter? [Yes/No]
- Should review cadence have been faster? [Yes/No]
- Should different people have been involved in the decision? [Yes/No]
```

### Post-Mortem Culture

- **Blameless:** Focus on process and systems, not individuals.
- **Honest:** Document what actually happened, not the sanitized version.
- **Forward-looking:** Every lesson must produce an actionable change.
- **Shared:** Post-mortems are shared broadly to prevent others from repeating mistakes.

---

## 5. Decision Quality Metrics

Track these metrics over time to improve decision-making quality.

### Leading Indicators (Process Quality)
| Metric | Target | Current |
|--------|--------|---------|
| % of significant decisions logged | 100% | __% |
| % of decisions with kill criteria defined | 100% | __% |
| % of 30-day reviews completed on time | > 90% | __% |
| Average time from identification to decision (two-way doors) | < 1 week | __ days |
| Average time from identification to decision (one-way doors) | 1-4 weeks | __ days |

### Lagging Indicators (Outcome Quality)
| Metric | Target | Current |
|--------|--------|---------|
| Decision success rate (achieved target outcomes) | > 60% | __% |
| Confidence calibration accuracy | Within 10% | __% |
| Average time to kill (decision to reversal when kill criteria met) | < 2 weeks | __ days |
| Post-mortem completion rate | 100% | __% |

---

## 6. Integration with MBA Brain

- All decision logs are stored in `Memory/DecisionLog.md`.
- Post-mortems are stored in `Memory/Failures.md`.
- Lessons that apply 3+ times are promoted to `Memory/FrameworkApplications.md`.
- Review cadence is enforced through the MBA Brain's Quality Enforcement protocol.
- MBAScore.md Dimension 8 (Execution) directly measures accountability protocol compliance.

---

## Quick Reference: Decision Checklist

Before making a significant decision:
- [ ] Problem clearly defined
- [ ] At least 3 options considered
- [ ] Decision logged with assumptions and kill criteria
- [ ] Tradeoffs made explicit
- [ ] Review dates scheduled
- [ ] Stakeholders informed

After making a significant decision:
- [ ] Execution plan with owners and milestones
- [ ] Monitoring set up for key metrics
- [ ] 30-day review calendar reminder set
- [ ] Kill criteria monitoring in place
