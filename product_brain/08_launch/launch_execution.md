# Launch Execution

## What This Enables

A technical and operational playbook for executing product launches with precision — controlling risk through feature flags, gradual rollouts, and clear rollback criteria while ensuring quality through systematic post-launch monitoring. Launch execution bridges the gap between "the feature is code-complete" and "the feature is delivering value to all customers." Poor launch execution turns good features into incidents. Excellent launch execution turns good features into reliable, measurable improvements.

---

## The Core Insight

Shipping code is not the same as launching a product. A launch is a controlled, monitored, reversible process that progressively exposes a feature to larger audiences while continuously verifying that it performs as expected. The engineering practices of continuous delivery (feature flags, canary deployments, observability) are product management tools, not just engineering tools. A PM who understands these mechanisms can make better decisions about launch timing, risk tolerance, and rollback criteria.

---

## Feature Flags

### Definition

Feature flags (feature toggles) are conditional statements in code that enable or disable functionality without deploying new code. They are the foundational mechanism for controlled launches.

### Feature Flag Types

| Type | Purpose | Lifecycle | Example |
|------|---------|-----------|---------|
| **Release flag** | Control feature rollout | Temporary — remove after full rollout | New onboarding wizard |
| **Experiment flag** | A/B test variants | Temporary — remove after experiment concludes | Pricing page layout test |
| **Ops flag** | Enable/disable for operational reasons | Semi-permanent | Kill switch for expensive API calls |
| **Permission flag** | Control access by user/account attributes | Permanent | Enterprise-only features |

### Feature Flag Lifecycle

```
1. CREATE
   - Name the flag (descriptive, with ticket reference)
   - Define targeting rules (who sees it)
   - Set default state (off for new features)
   - Document the flag purpose and expected duration

2. CONFIGURE
   - Set targeting: percentage, user segments, accounts, regions
   - Define the control and treatment experience
   - Verify targeting rules in staging

3. ROLLOUT
   - Enable for internal team first
   - Expand to beta users
   - Gradual percentage rollout (1% -> 5% -> 25% -> 50% -> 100%)
   - Monitor at each stage

4. EVALUATE
   - Analyze metrics (adoption, performance, errors)
   - Decide: ship (100%), iterate, or rollback

5. CLEAN UP
   - Remove flag from code after full rollout or rollback
   - Remove flag configuration from the flag service
   - Document the outcome in the experiment/launch log
```

### Feature Flag Best Practices

| Practice | Rationale |
|----------|-----------|
| Flag naming convention: `[team]-[feature]-[date]` | Findability and accountability |
| Maximum flag lifetime: 90 days for release flags | Prevent flag debt (accumulation of stale flags) |
| Flag audit: monthly review of active flags | Identify and clean up stale flags |
| Default off: new feature flags start disabled | Prevents accidental exposure |
| Kill switch capability: every flag can be disabled instantly | Emergency response capability |
| Server-side evaluation for critical features | Prevents client-side manipulation |
| Flag dependency tracking: document flag interactions | Prevents conflicting flags |

### Feature Flag Debt

Feature flag debt accumulates when flags are not cleaned up after use:

```
Flag debt indicators:
- Active flags > 50: Warning (complexity becoming difficult to manage)
- Active flags > 100: Critical (interaction effects unpredictable)
- Flags older than 90 days: Each one is a debt item
- Flags with unknown owners: Orphaned, cannot be safely removed

Prevention:
- Every flag has an owner and an expiration date
- Monthly flag audit: review, clean up, or extend with justification
- Track flag count as a health metric
```

---

## Rollout Strategies

### Canary Deployment

Deploy the new version to a small percentage of users first, monitor for issues, then expand.

```
CANARY ROLLOUT TIMELINE

Hour 0:  Deploy to 1% of users (canary group)
         Monitor: error rates, latency, core metrics

Hour 2:  If healthy -> expand to 5%
         Continue monitoring

Hour 6:  If healthy -> expand to 25%
         Continue monitoring

Hour 24: If healthy -> expand to 50%
         Continue monitoring

Hour 48: If healthy -> expand to 100%
         Full rollout complete

AT ANY POINT: If metrics degrade -> ROLLBACK
```

### Ring Deployment

Expand rollout through concentric rings of users, from least to most critical:

```
Ring 0: Internal team (employees)
    -> Ring 1: Beta users (opted-in, high tolerance)
        -> Ring 2: Low-risk segment (new users, non-paying)
            -> Ring 3: General availability (all users)
                -> Ring 4: Enterprise accounts (highest risk, most protected)
```

### Percentage Rollout

Gradually increase the percentage of users who see the new feature:

| Percentage | Duration | Monitoring Focus |
|-----------|----------|-----------------|
| 1% | 2-4 hours | Error rates, crashes, severe bugs |
| 5% | 4-8 hours | Performance metrics, core workflow completion |
| 25% | 24 hours | Adoption metrics, user feedback, support tickets |
| 50% | 48 hours | Business metrics, revenue impact, A/B comparison |
| 100% | Full rollout | Full metric suite, post-launch review scheduled |

### Choosing a Rollout Strategy

| Situation | Recommended Strategy | Rationale |
|-----------|---------------------|-----------|
| High-risk change (core workflow, payments) | Ring deployment with extended bake time | Protect high-value users |
| Moderate-risk feature (new capability) | Canary with percentage ramp | Balance speed and safety |
| Low-risk improvement (UI polish) | Fast percentage rollout (1% -> 100% in 24h) | Low risk warrants fast rollout |
| Major platform change | Ring deployment over 2-4 weeks | Allow time for feedback and iteration |
| Experiment | 50/50 split from day one | Need equal groups for statistical validity |

---

## Rollback Criteria

### Pre-Defined Rollback Triggers

Before any launch, define the specific conditions that will trigger an automatic rollback:

```
ROLLBACK CRITERIA (define before launch)

AUTOMATIC ROLLBACK (no human decision needed):
- Error rate exceeds 2x baseline for > 5 minutes
- P95 latency exceeds 3x baseline for > 10 minutes
- Core workflow completion rate drops > 10% vs baseline
- Any P0 bug reported (data loss, security, payment failure)

MANUAL ROLLBACK (PM + Engineering Lead decide):
- Adoption rate < 50% of projection after 48 hours (investigate first)
- Support ticket volume > 3x baseline for feature area
- Negative customer feedback pattern emerging
- Business metric (revenue, conversion) degrades > 5%

ROLLBACK PROCESS:
1. Disable the feature flag (immediate — < 1 minute)
2. Verify feature is disabled for all users
3. Monitor metrics for recovery
4. Notify stakeholders (PM, Engineering Lead, CS)
5. Post-incident review (within 24 hours)
6. Fix issues before next rollout attempt
```

### Rollback vs Rollforward Decision

| Decision | When to Apply | Criteria |
|----------|-------------|----------|
| **Rollback** | Issue is severe and the fix is not immediately clear | Error rate high, customer-facing impact, data integrity risk |
| **Hotfix + continue** | Issue is understood and the fix is quick (< 1 hour) | Minor bug, no data impact, fix is low-risk |
| **Rollforward** | Issue requires a new feature to address | The flag-off state is also problematic; new code resolves both |

---

## Post-Launch Monitoring

### The Monitoring Dashboard

Every launch should have a dedicated monitoring dashboard with these metrics:

```
LAUNCH MONITORING DASHBOARD

Section 1: Technical Health
├── Error rate (compared to baseline)
├── P50/P95/P99 latency
├── API success rate
├── Infrastructure metrics (CPU, memory, queue depth)
└── Feature flag evaluation count (confirms feature is active)

Section 2: Product Health
├── Core workflow completion rate
├── Feature adoption (% of eligible users who tried it)
├── Feature retention (return rate)
├── Session metrics (duration, pages per session)
└── User-reported issues (feedback widget, support tickets)

Section 3: Business Health
├── Conversion rate (if applicable)
├── Revenue metrics (if applicable)
├── Churn indicators
└── NPS/CSAT (if collecting)
```

### Monitoring Cadence

| Time Post-Launch | Monitoring Frequency | Focus |
|-----------------|---------------------|-------|
| 0-2 hours | Every 15 minutes | Technical health (errors, latency) |
| 2-24 hours | Every hour | Technical + product health |
| 1-7 days | Daily | Product + business health |
| 1-4 weeks | Weekly | Business health + adoption trends |
| 1-3 months | Monthly | Long-term retention and business impact |

---

## Post-Launch Review

### The Post-Launch Review Meeting

```
Timing: 2-4 weeks after full rollout
Participants: PM, Engineering Lead, Design Lead, Data Analyst
Duration: 60 minutes

Agenda:
1. Launch Summary (5 min)
   - What we launched, for whom, timeline

2. Technical Performance (10 min)
   - Incidents during rollout
   - Performance impact
   - Technical learnings

3. Adoption Metrics (15 min)
   - Adoption rate vs target
   - Activation rate vs target
   - Retention (early signal)
   - Segment-level analysis

4. Customer Feedback (10 min)
   - Qualitative feedback themes
   - Support ticket analysis
   - Feature requests and complaints

5. Business Impact (10 min)
   - Revenue impact (if measurable)
   - Impact on North Star Metric
   - Guardrail metric performance

6. Learnings and Actions (10 min)
   - What went well?
   - What should we improve for next launch?
   - What are the next product iterations based on learnings?
   - Update the launch playbook
```

### Post-Launch Review Template

```
LAUNCH: [Feature Name]
DATE: [Launch date]
TIER: [1/2/3/4]
OWNER: [PM name]

RESULTS:
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Adoption (30-day) | 20% | [actual] | [pass/miss] |
| Activation | 50% | [actual] | [pass/miss] |
| Retention (30-day) | 40% | [actual] | [pass/miss] |
| Revenue impact | [target] | [actual] | [pass/miss] |
| Support impact | < 10% increase | [actual] | [pass/miss] |

QUALITATIVE FINDINGS:
- [Key customer feedback themes]
- [Unexpected use cases]
- [Top complaints]

TECHNICAL FINDINGS:
- [Incidents count and severity]
- [Performance impact]
- [Technical debt incurred]

DECISION:
[ ] Full ship — feature performing well
[ ] Iterate — specific improvements needed: [list]
[ ] Partial rollback — disable for [segment] due to [reason]
[ ] Full rollback — feature not delivering value; reason: [detail]

NEXT STEPS:
1. [Action item] — Owner: [name] — Due: [date]
2. [Action item] — Owner: [name] — Due: [date]

LEARNINGS FOR FUTURE LAUNCHES:
- [Learning 1]
- [Learning 2]
```

---

## Launch Day Run-of-Show

### Tier 1 Launch Day Playbook

```
PRE-LAUNCH (morning)
06:00 - Engineering: Final deployment verification in production
07:00 - Engineering: Feature flag enabled for 1% (canary)
07:30 - Engineering: Canary health check (errors, latency)
08:00 - Engineering: Expand to 10%
08:30 - PM + Engineering: Monitoring check

LAUNCH (mid-morning)
09:00 - Engineering: Expand to 50%
09:15 - Marketing: Blog post published
09:30 - Marketing: Email campaign sent
09:45 - Marketing: Social media posts go live
10:00 - PM: Internal Slack announcement
10:00 - Sales: Outreach to key accounts
10:30 - PM + Engineering: Full monitoring review

EXPANSION (afternoon)
12:00 - Engineering: Expand to 100% (if metrics healthy)
14:00 - PM: Review initial adoption metrics
15:00 - CS: Monitor customer feedback channels
16:00 - Support: Review support ticket queue
17:00 - PM: End-of-day status update to stakeholders

POST-LAUNCH (following days)
Day 2: Daily monitoring review
Day 3: First customer feedback synthesis
Day 7: One-week check-in (adoption, issues, feedback)
Day 14-28: Post-launch review meeting
```

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Big-bang launch | Everything deployed at once; incident affects all users | No gradual rollout; no feature flags | Always use feature flags with percentage rollout |
| No rollback plan | Incident occurs and team scrambles to figure out how to revert | Rollback not planned or tested | Define and test rollback before every launch |
| Monitoring gap | Problems discovered by customers, not by the team | No launch monitoring dashboard | Build dashboard before launch; define alert thresholds |
| Flag debt | Hundreds of stale flags making the codebase unpredictable | No flag cleanup process | Monthly flag audit; 90-day maximum lifetime |
| Launch without review | Feature ships, nobody evaluates success or failure | No post-launch review cadence | Mandatory review 2-4 weeks after every Tier 1-2 launch |

---

## The Operator's Framework

When executing a launch:

1. **Set up feature flags** — every new feature behind a flag with targeting and kill switch
2. **Define rollback criteria** — automatic and manual triggers, written before launch
3. **Plan the rollout** — canary or ring deployment with specific percentages and bake times
4. **Build the monitoring dashboard** — technical, product, and business health metrics
5. **Execute the run-of-show** — coordinated, time-sequenced plan for launch day
6. **Monitor post-launch** — decreasing frequency from hourly to daily to weekly
7. **Conduct the post-launch review** — metrics vs targets, learnings, next iterations

---

## Summary

Launch execution is the controlled, monitored, reversible process of exposing a feature to progressively larger audiences. Feature flags are the foundational mechanism, enabling targeting, percentage rollouts, and instant rollback. Canary and ring deployment strategies control risk by starting with low-risk users and expanding only when metrics confirm health. Rollback criteria must be defined before launch — both automatic triggers (error rate, latency) and manual triggers (adoption, feedback). Post-launch monitoring spans technical health (errors, latency), product health (adoption, retention), and business health (revenue, conversion). The post-launch review closes the loop by comparing results to targets, synthesizing learnings, and planning iterations. The discipline of launch execution transforms shipping code from a hope-for-the-best event into a controlled, measurable, and reversible process.
