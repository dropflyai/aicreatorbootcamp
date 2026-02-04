# Growth Brain — Accountability Protocol (Authoritative)

This document defines how the Growth Brain is held accountable for its work.
Accountability is not optional. Every growth decision, experiment, and strategy
must be traceable, reviewable, and consequential.

If accountability is not enforced, growth becomes a black box of spending and hoping.

---

## PRINCIPLES OF GROWTH ACCOUNTABILITY

1. **Every experiment has an owner.** No orphan experiments.
2. **Every decision has a rationale.** No gut-feel shipping.
3. **Every outcome is documented.** No silent failures.
4. **Every learning is shared.** No hoarding insights.
5. **Every metric is auditable.** No black-box dashboards.
6. **Negative results are as valuable as positive results.** No hiding failures.
7. **Accountability is forward-looking.** The goal is improvement, not blame.

---

## ACCOUNTABILITY STRUCTURE

### Level 1: Individual Experiment Accountability

Every experiment must have:

| Element | Requirement | When |
|---------|-------------|------|
| Owner | Named individual responsible | Before launch |
| Hypothesis | Pre-registered, falsifiable | Before launch |
| Success criteria | Quantified and agreed upon | Before launch |
| Guardrail metrics | Defined and monitored | Before launch |
| Launch date | Documented | At launch |
| Interim check | Midpoint review if >2 weeks | During experiment |
| End date | Based on power analysis | Pre-defined |
| Results document | Complete analysis | Within 48 hours of completion |
| Decision | Ship, iterate, or kill | Within 72 hours of completion |
| Learning summary | What we learned, regardless of outcome | Within 1 week of completion |

### Level 2: Weekly Growth Accountability

Every week, the Growth Brain must produce:

| Deliverable | Contents | Audience |
|-------------|----------|----------|
| Experiment status report | All active experiments, status, interim results | Growth team |
| Metric dashboard update | Core growth metrics vs targets | Growth team + leadership |
| Learning log entry | Key learnings from completed experiments | All teams |
| Backlog prioritization | Updated experiment backlog with rankings | Growth team |
| Velocity check | Experiments launched, completed, in-queue | Growth lead |

### Level 3: Monthly Growth Accountability

Every month:

| Deliverable | Contents | Audience |
|-------------|----------|----------|
| Growth scorecard | All 8 GrowthScore dimensions scored | Leadership |
| Experiment portfolio review | Win rate, learning rate, velocity | Growth team |
| Channel mix report | Organic vs paid, trends, sustainability | Leadership + Finance |
| Growth model update | Actuals vs model, variance analysis | Leadership |
| Cohort analysis | Retention curves by cohort, trends | Product + Growth |
| Investment recommendation | Where to increase or decrease spend | Leadership + Finance |

### Level 4: Quarterly Growth Accountability

Every quarter:

| Deliverable | Contents | Audience |
|-------------|----------|----------|
| Growth strategy review | Strategy performance, pivots needed | Executive team |
| OKR retrospective | Objectives hit or missed, with analysis | Executive team |
| Growth team performance | Velocity, win rate, impact on business metrics | Growth lead |
| Competitive landscape | How competitors are growing, our relative position | Executive + Product |
| Next quarter plan | Priorities, experiments, resource needs | Executive team |

---

## EXPERIMENT DOCUMENTATION STANDARD

Every completed experiment must have a permanent record containing:

### Required Fields

```
## Experiment Record

### Metadata
- Experiment ID: [Unique ID]
- Experiment Name: [Descriptive name]
- Owner: [Name]
- Launch Date: [YYYY-MM-DD]
- End Date: [YYYY-MM-DD]
- Duration: [X days]
- Status: [Shipped / Reverted / Inconclusive / Killed]

### Hypothesis
[Full hypothesis in standard format]

### Design
- Type: [A/B / Multivariate / Holdback / Rollout]
- Variants: [Description of each variant]
- Audience: [Who was included/excluded]
- Sample Size: [Planned vs actual]
- Randomization: [Method]

### Metrics
- Primary: [Metric name, baseline, target]
- Secondary: [List]
- Guardrails: [List with thresholds]

### Results
- Primary metric: [Result with confidence interval and p-value]
- Secondary metrics: [Results]
- Guardrail metrics: [Results — any violations?]
- Segment analysis: [Key findings by segment]

### Decision
- Outcome: [Ship / Revert / Iterate]
- Rationale: [Why this decision]
- Decision-maker: [Name]
- Decision date: [YYYY-MM-DD]

### Learnings
- What we learned: [Key insights]
- What surprised us: [Unexpected findings]
- What we would do differently: [Process improvements]
- Follow-up experiments: [What this learning suggests next]

### Impact
- Estimated annual impact: [$X or X% improvement]
- Confidence in impact estimate: [High / Medium / Low]
- Long-term tracking: [D30/D60/D90 follow-up planned? Y/N]
```

### Documentation Enforcement

- Experiments without documentation within 1 week of completion = flagged
- Three undocumented experiments = experiment launch privileges suspended
- Documentation quality is reviewed monthly
- Best experiment write-ups are shared team-wide as examples

---

## METRIC ACCOUNTABILITY

### Primary Growth Metrics (Must Be Tracked)

| Metric | Frequency | Owner | Review Forum |
|--------|-----------|-------|-------------|
| New user signups (by channel) | Daily | Growth lead | Weekly review |
| Activation rate | Daily | Growth lead | Weekly review |
| D1/D7/D30 retention (by cohort) | Weekly | Growth lead | Weekly review |
| MRR and MRR growth | Weekly | Growth lead + Finance | Monthly review |
| CAC by channel | Monthly | Growth lead + Finance | Monthly review |
| LTV by segment | Monthly | Growth lead + Finance | Monthly review |
| LTV:CAC ratio | Monthly | Growth lead + Finance | Monthly review |
| Organic % of acquisition | Weekly | Growth lead | Weekly review |
| Experiment velocity | Weekly | Growth lead | Weekly review |
| Net revenue retention | Monthly | Growth lead + CS | Monthly review |

### Metric Integrity Rules

1. **No metric without a definition.** Every metric must have a written definition including exactly how it is calculated, what is included, and what is excluded.
2. **No metric without a baseline.** Before setting targets, establish the current baseline from at least 3 months of data.
3. **No metric without an owner.** Someone is responsible for the accuracy and reporting of each metric.
4. **No retroactive metric changes.** Once an experiment starts, the primary metric does not change.
5. **No vanity metrics as primary.** Pageviews, impressions, and "engagement" without definition are not primary metrics.
6. **No metric hiding.** All metrics are visible to the team, including unfavorable ones.

### Metric Audit Protocol

Monthly, verify:
- [ ] Metric definitions are current and accurate
- [ ] Data pipeline is producing correct numbers (spot-check against raw data)
- [ ] Dashboard matches source-of-truth database
- [ ] No metrics have been silently removed or redefined
- [ ] Targets are still appropriate given business context

---

## FAILURE ACCOUNTABILITY

### Types of Growth Failures

| Type | Description | Response |
|------|-------------|----------|
| Experiment failure | Experiment did not achieve hypothesis | Document learning, move on |
| Process failure | Experiment was poorly designed or executed | Post-mortem, process improvement |
| Strategic failure | Wrong bet on channel, segment, or approach | Strategy review, pivot plan |
| Execution failure | Good strategy, poor execution | Identify blockers, resource/skill gaps |
| Ethical failure | Growth tactic harmed users or brand | Immediate stop, review, remediation |

### Failure Response Protocol

**Experiment Failure (Expected and Healthy)**
1. Document the result and learning
2. Share the learning with the team
3. Update priors and growth model
4. Move to next experiment
5. No blame. Experiment failures are data.

**Process Failure (Must Be Fixed)**
1. Identify what went wrong in the process
2. Determine root cause (skill gap, tool gap, process gap)
3. Implement fix (training, tooling, checklist update)
4. Verify fix prevents recurrence
5. Owner accountability: the process owner must fix it

**Strategic Failure (Requires Leadership Review)**
1. Document what was bet on and why
2. Analyze signals that were missed or ignored
3. Determine if the strategy was wrong or if execution was the issue
4. Present findings to leadership with recommendations
5. Adjust strategy and communicate the pivot

**Ethical Failure (Zero Tolerance)**
1. Immediately stop the tactic
2. Assess user impact
3. Remediate any user harm
4. Review how this passed the review process
5. Update review checklist to prevent recurrence
6. Leadership briefing required

### Failure Documentation Requirements

Every significant failure must be documented:

```
## Growth Failure Record

### What Happened
[Factual description of the failure]

### Impact
[Quantified impact: users affected, revenue impact, time wasted]

### Root Cause
[Why did this happen? Use 5-Whys if needed]

### What We Learned
[Key insights from the failure]

### What We Changed
[Specific process, tool, or strategy changes made]

### Verification
[How we verified the fix works]

### Owner
[Who is responsible for the fix]
```

---

## ACCOUNTABILITY CADENCES

### Daily (Async)
- Active experiment monitoring (automated alerts for guardrail violations)
- Key metric check (automated dashboard, exception-based review)

### Weekly (30-Minute Sync)
- Experiment status review (active, completed, launched)
- Metric review (vs targets, trends)
- Blocker identification and resolution
- Backlog grooming

### Monthly (60-Minute Sync)
- Growth scorecard review (all 8 dimensions)
- Experiment portfolio analysis (velocity, win rate, learning rate)
- Channel performance and mix review
- Growth model update and variance analysis
- Strategy alignment check

### Quarterly (Half-Day Session)
- Strategy retrospective and forward planning
- OKR review and setting
- Team performance and development
- Competitive landscape review
- Budget and resource planning

---

## ESCALATION PROTOCOL

### When to Escalate

| Trigger | Escalation Level | Timeline |
|---------|-----------------|----------|
| Guardrail metric violated | Growth lead | Immediate (within 1 hour) |
| Primary metric declining for 2+ weeks | Growth lead + Product | Within 24 hours |
| Retention declining for 3+ cohorts | VP/Director level | Within 48 hours |
| Unsustainable growth flag (>80% paid) | VP/Director level | Within 1 week |
| Churn spike (>50% above baseline) | Executive level | Within 24 hours |
| Ethical concern with growth tactic | Executive level | Immediate |
| Growth target missed by >30% | VP/Director level | At monthly review |
| Experiment velocity <1/week for 3+ weeks | Growth lead | Within 1 week |

### Escalation Format

```
## Growth Escalation

### Trigger: [What triggered the escalation]
### Severity: [Critical / High / Medium]
### Date: [YYYY-MM-DD]
### Owner: [Who is escalating]

### Situation
[What is happening, with data]

### Impact
[Quantified impact if not addressed]

### Root Cause (if known)
[Why this is happening]

### Recommended Action
[What we propose to do]

### Decision Needed
[What decision is needed from the escalation recipient]

### Timeline
[How quickly action is needed]
```

---

## ACCOUNTABILITY ANTI-PATTERNS

These behaviors undermine growth accountability and must be called out:

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Vanity reporting | Reporting metrics that look good but do not matter | Replace with business-outcome metrics |
| Cherry-picking | Reporting only positive results | Require full experiment portfolio reporting |
| Moving goalposts | Changing success criteria after seeing results | Pre-register success criteria |
| Attribution gaming | Claiming credit for organic growth | Use incrementality testing |
| Perpetual pilot | Never shipping or killing experiments | Enforce decision timelines |
| Data avoidance | Not measuring because "we know it works" | No unmeasured changes |
| Blame deflection | "Engineering was slow" without owning the plan | Own the outcome, not just the idea |
| Metric inflation | Counting the same user multiple ways | Strict metric definitions |

---

## ACCOUNTABILITY REWARDS

Accountability is not just about catching failures. Recognize excellence:

| Achievement | Recognition |
|-------------|------------|
| Highest-impact experiment of the quarter | Spotlight in all-hands |
| Best experiment write-up (even if negative result) | Shared as team example |
| Fastest learning cycle | Process improvement recognition |
| Most experiments shipped in a month | Velocity award |
| Identified and fixed a process failure | Improvement recognition |
| Honest escalation that prevented harm | Trust-building recognition |

---

**Accountability is the foundation of a learning organization.**
**Without it, growth is theater. With it, growth compounds.**
