# ProductScore.md -- 8-Dimension Scoring Rubric for Product Brain

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Product Brain / CEO Brain
> Purpose: Every output produced by the Product Brain is scored across eight
> dimensions. A score of 3 ("Meets Standard") is the minimum for shipping.
> Any dimension scoring 1 triggers an automatic block. Two or more dimensions
> at 1 triggers escalation to the CEO Brain.

---

## How to Use This Rubric

1. After the Product Brain produces ANY artifact (PRD, roadmap, prioritization
   decision, experiment design, stakeholder memo), score it against all eight
   dimensions.
2. Record each dimension score (1, 3, or 5) in the Accountability Protocol
   audit log.
3. If any dimension scores 1, the artifact MUST NOT ship. Rework is required.
4. If any dimension scores 5, document what made it exceptional for future
   reference in the Experience Log.
5. Composite score = sum of all eight dimensions. Maximum = 40. Minimum to
   ship = 24 (average of 3 per dimension, no dimension below 3).

---

## Dimension 1: Customer Insight Depth

**What it measures:** Whether the product decision is grounded in real customer
evidence rather than assumptions, proxies, or internal opinion.

### Score 1 -- Failing (Automatic Block)
- Decision references zero direct customer quotes or behavioral data.
- Customer segments are described in demographic terms only (e.g., "millennials")
  with no behavioral or needs-based segmentation.
- "Customers want X" is stated without any methodology for how this was determined.
- Relies entirely on competitor feature parity as evidence of customer need.
- No distinction between stated preferences and revealed preferences.
- Jobs-to-be-done are absent or described at surface level ("they want it to be easy").

### Score 3 -- Meets Standard
- At least 5 distinct customer interviews or usability sessions referenced with
  direct quotes or behavioral observations.
- Customer segments defined by behavior, needs, or jobs-to-be-done, not just
  demographics.
- Clear distinction between "must have" and "nice to have" based on frequency
  and intensity of pain.
- Evidence triangulated from at least 2 sources (interviews + analytics, surveys +
  support tickets, etc.).
- Acknowledgment of what is NOT known about the customer with a plan to learn.
- Willingness-to-pay or switching cost data referenced where pricing is involved.

### Score 5 -- Exceptional
- Customer insight derived from longitudinal observation (not just point-in-time).
- Latent needs identified that customers themselves could not articulate.
- Behavioral cohort analysis showing different segments have different jobs.
- Quantified impact of the pain point (hours lost, dollars wasted, error rate).
- Counter-evidence actively sought ("who would NOT want this and why?").
- Customer evidence refreshed within the last 30 days for time-sensitive decisions.
- Includes competitive switching interviews (why they left, why they stayed).

### Automatic Failure Conditions
- [ ] Zero customer interviews cited for a net-new feature decision.
- [ ] "We know our customers" used as justification without evidence.
- [ ] Feature request from a single large customer treated as universal need.
- [ ] No customer segment definition in a PRD.

### Self-Audit Questions
- Can I name 3 specific customers who have this problem?
- If I showed this PRD to a customer, would they recognize their own pain?
- What is the strongest argument AGAINST this being a real customer need?
- Am I confusing a vocal minority with a representative sample?

---

## Dimension 2: Strategic Alignment

**What it measures:** Whether the product decision connects clearly to the
company's North Star metric, strategic pillars, and long-term vision.

### Score 1 -- Failing (Automatic Block)
- No reference to North Star metric or company strategy.
- Feature is justified purely by competitive pressure ("they have it so we need it").
- Cannot articulate how this moves any company-level OKR.
- Contradicts a stated strategic bet without acknowledging the trade-off.
- "Strategy" section of PRD is copy-pasted boilerplate.

### Score 3 -- Meets Standard
- Explicit connection drawn to North Star metric with expected magnitude of impact.
- Trade-offs against other strategic priorities acknowledged.
- Explains what the company is choosing NOT to do by pursuing this.
- Time horizon of strategic impact stated (this quarter, this year, multi-year).
- Aligns with at least one stated company strategic pillar.

### Score 5 -- Exceptional
- Quantified model of how this feature impacts North Star metric (with assumptions).
- Second-order strategic effects mapped (e.g., "this enables future X").
- Platform / moat / compounding effects identified.
- Anti-strategy articulated ("if a competitor copies this, here is why it still wins").
- Portfolio-level view: how this decision fits alongside other bets being placed.
- Strategy stress-tested against 2-3 plausible market scenarios.

### Automatic Failure Conditions
- [ ] Cannot state the North Star metric when asked.
- [ ] Feature directly undermines a stated strategic priority.
- [ ] "Strategy" is really just a list of features.
- [ ] No connection to any OKR at any level.

### Self-Audit Questions
- If the CEO asked "why are we doing this?", can I answer in one sentence?
- What strategic option does this decision close? Is that acceptable?
- Does this make us more differentiated or more commoditized?
- In 2 years, will this decision still look strategic or will it look reactive?

---

## Dimension 3: Metric Rigor

**What it measures:** Whether success is defined in measurable, unambiguous terms
with baselines, targets, and leading/lagging indicator separation.

### Score 1 -- Failing (Automatic Block)
- No success metrics defined.
- Metrics are vague ("improve engagement", "increase satisfaction").
- No baseline measurement for any metric.
- Vanity metrics used as primary success indicators (pageviews, downloads).
- No time-bound target.
- Leading and lagging indicators conflated or not distinguished.

### Score 3 -- Meets Standard
- 1-2 primary metrics with current baseline, target, and timeline.
- At least 1 leading indicator identified that will move before the lagging metric.
- Counter-metrics defined (what must NOT degrade for this to count as success).
- Measurement methodology described (where the data comes from, how calculated).
- Statistical significance requirements stated for experiment-based launches.
- Guardrail metrics established.

### Score 5 -- Exceptional
- Full metric tree: North Star -> product metric -> feature metric -> input metrics.
- Sensitivity analysis: "If assumption X is wrong, metric moves this much."
- Metric decomposition into components (e.g., conversion = traffic * CTR * completion).
- Historical trend data showing why the target is ambitious but achievable.
- Pre-mortem: "If the metric does not move, here are the 3 most likely reasons."
- Leading indicator validated (historically correlated with lagging metric).
- Data pipeline verified to actually produce the needed metric before launch.

### Automatic Failure Conditions
- [ ] Feature launches with no defined success metric.
- [ ] Metric cannot actually be measured with current instrumentation.
- [ ] Target is set without knowing the baseline.
- [ ] No counter-metric (could "succeed" while damaging overall health).

### Self-Audit Questions
- If this metric goes up, am I SURE it means customers are better off?
- Can I get this data within 1 week of launch? 1 day?
- What would cause this metric to move up for the wrong reasons?
- Have I confused correlation with causation in my metric model?

---

## Dimension 4: Prioritization Quality

**What it measures:** Whether the product decision reflects disciplined
prioritization against alternatives, not just enthusiasm for an idea.

### Score 1 -- Failing (Automatic Block)
- No alternatives considered ("this is obviously the right thing to build").
- RICE/ICE/weighted scoring used but weights are arbitrary or not justified.
- HiPPO-driven decision with no evidence framework.
- Opportunity cost not mentioned.
- Urgency confused with importance.
- Entire roadmap is "P0" with no real prioritization.

### Score 3 -- Meets Standard
- At least 3 alternatives evaluated (including "do nothing").
- Prioritization framework applied consistently with justified weights.
- Opportunity cost explicitly stated ("by doing X, we are delaying Y by Z weeks").
- Reversibility of decision factored in (one-way door vs two-way door).
- Sequencing rationale provided (why now, not later).
- Resource constraints acknowledged and factored in.

### Score 5 -- Exceptional
- Expected value calculation with probability-weighted outcomes.
- Real options thinking: which decisions preserve future flexibility?
- Dependencies mapped and critical path identified.
- Sensitivity analysis: "If effort estimate is 2x, does priority change?"
- Stakeholder alignment documented (who disagrees and why).
- Time-cost of delay quantified.
- Portfolio balance assessed (mix of bets, maintenance, debt, innovation).

### Automatic Failure Conditions
- [ ] Single alternative considered.
- [ ] "We promised the customer" used as sole prioritization rationale.
- [ ] No sequencing rationale.
- [ ] Sunk cost used as reason to continue ("we already started").

### Self-Audit Questions
- What am I saying NO to by saying yes to this?
- If I had to cut half the scope, which half survives? Why?
- Am I prioritizing this because it is impactful or because it is easy?
- Would I still prioritize this if we had 2x the engineering capacity?

---

## Dimension 5: Specification Completeness

**What it measures:** Whether the product specification covers all states,
edge cases, and handoff requirements needed for engineering to build without
ambiguity.

### Score 1 -- Failing (Automatic Block)
- Happy path only described.
- No error states, empty states, or loading states defined.
- Technical constraints not acknowledged.
- No acceptance criteria.
- Specification is a feature description, not a buildable spec.
- No wireframes, mockups, or user flow diagrams for UI features.
- Data model implications not considered.

### Score 3 -- Meets Standard
- All user-facing states defined: happy path, error, empty, loading, partial.
- Acceptance criteria written in testable format (Given/When/Then or equivalent).
- Edge cases enumerated (first use, power user, concurrent access, offline).
- API contracts or data requirements specified.
- Performance requirements stated (latency, throughput).
- Accessibility requirements included.
- Mobile / responsive behavior defined if applicable.
- Migration path defined for existing users.

### Score 5 -- Exceptional
- State machine diagram for complex flows.
- Abuse cases and security considerations documented.
- Internationalization requirements specified.
- Analytics events defined with payload structure.
- Feature flag strategy defined (gradual rollout plan).
- Rollback plan documented.
- Cross-feature interaction effects mapped.
- Technical design reviewed with engineering before spec finalized.
- Content strings finalized (not "TBD" placeholders).

### Automatic Failure Conditions
- [ ] No error state handling defined.
- [ ] "Engineering will figure out the details" appears in spec.
- [ ] No acceptance criteria.
- [ ] Spec contradicts existing system constraints without migration plan.

### Self-Audit Questions
- Could a new engineer build this without asking me a single question?
- What happens when the user does something unexpected?
- Have I specified what NOT to build as clearly as what to build?
- Is every piece of copy final, or are there "TBD" placeholders?

---

## Dimension 6: Stakeholder Communication

**What it measures:** Whether the Product Brain communicates decisions,
rationale, and trade-offs transparently to all affected stakeholders.

### Score 1 -- Failing (Automatic Block)
- Decision made without informing affected stakeholders.
- Rationale not documented anywhere.
- Trade-offs hidden or minimized.
- Different messages given to different stakeholders about the same decision.
- No changelog or decision log maintained.
- Stakeholders learn about changes from the product itself, not communication.

### Score 3 -- Meets Standard
- All affected stakeholders identified and informed before execution begins.
- Decision rationale documented with evidence and trade-offs.
- Clear timeline communicated with milestones.
- Single source of truth for the decision (linked, not duplicated).
- Feedback mechanism provided (how to raise concerns).
- Status updates at regular cadence.

### Score 5 -- Exceptional
- Stakeholder-specific communication tailored to their concerns and context.
- Pre-alignment conversations before formal announcements.
- DACI (Driver, Approver, Contributor, Informed) matrix defined.
- Objections documented and addressed explicitly.
- Communication includes what was REJECTED and why.
- Retrospective communication after launch (what we learned).
- Async-first documentation that does not require meetings to understand.

### Automatic Failure Conditions
- [ ] Engineering starts work before stakeholders are aligned.
- [ ] Customer-facing change shipped without customer success team awareness.
- [ ] Decision rationale lost (not documented anywhere).
- [ ] Stakeholder says "I was not consulted" on a decision affecting their area.

### Self-Audit Questions
- Who will be surprised by this decision? Have I talked to them?
- If someone reads only the decision doc, do they understand the "why"?
- Am I communicating to inform or to get rubber-stamp approval?
- Is there anyone who should have veto power that I have not consulted?

---

## Dimension 7: Experimentation Design

**What it measures:** Whether the Product Brain designs rigorous experiments
to validate assumptions before committing resources.

### Score 1 -- Failing (Automatic Block)
- No hypothesis stated.
- "Launch and see" treated as experimentation.
- Sample size not calculated.
- Multiple variables changed simultaneously without factorial design.
- Success criteria defined after seeing results (HARKing).
- No control group or baseline comparison.

### Score 3 -- Meets Standard
- Clear hypothesis in format: "If [change], then [metric] will [direction] by [amount]."
- Sample size calculated with desired power (typically 80%) and significance level.
- Single variable isolated or interaction effects acknowledged.
- Run time determined before launch, not adjusted based on peeking.
- Success criteria and decision rules pre-registered.
- Novelty effects and seasonality accounted for.

### Score 5 -- Exceptional
- Multiple hypotheses ranked by impact and testability.
- Minimum Detectable Effect justified by business impact threshold.
- Sequential testing or Bayesian approach used where appropriate.
- Segment-level analysis planned (not just aggregate).
- Experiment registry maintained with all past experiments.
- Null results documented and shared as learning.
- External validity considered (will results hold at scale?).
- Network effects and interference between variants addressed.

### Automatic Failure Conditions
- [ ] Experiment stopped early because "the results look good."
- [ ] No pre-registered hypothesis.
- [ ] Sample size is "whatever we get in a week."
- [ ] Winner declared on a metric that was not in the original hypothesis.

### Self-Audit Questions
- If this experiment shows a null result, will we actually act on it?
- Is the Minimum Detectable Effect small enough to catch meaningful changes?
- Am I testing what I SHOULD test or what is EASY to test?
- Have I accounted for the cost of being wrong in both directions?

---

## Dimension 8: Technical Product Sense

**What it measures:** Whether the Product Brain demonstrates sufficient
understanding of technical constraints, system architecture, and engineering
trade-offs to make informed product decisions.

### Score 1 -- Failing (Automatic Block)
- Feature specified is technically infeasible and Product Brain did not consult eng.
- Performance implications ignored for a latency-sensitive feature.
- Data model changes required but not identified.
- "Just add a button" mentality for features requiring significant backend work.
- No understanding of current system architecture.
- Technical debt implications not considered.

### Score 3 -- Meets Standard
- Technical feasibility validated with engineering before specification finalized.
- System architecture understood at a level sufficient to estimate scope.
- Data model implications identified.
- Performance, scalability, and reliability requirements specified.
- Technical debt trade-offs acknowledged (if taking shortcut, explain why).
- Build vs. buy analysis performed where relevant.
- Integration points with other systems identified.

### Score 5 -- Exceptional
- Product Brain can sketch the technical approach (not just the requirement).
- Non-functional requirements quantified (p99 latency, uptime SLA, data freshness).
- Architecture decision records (ADRs) referenced for major technical decisions.
- Technical risk register maintained for the product area.
- Cost implications of architectural choices understood (infra cost, maintenance).
- Engineering Brain consulted proactively, not reactively.
- Technical roadmap integrated with product roadmap.

### Automatic Failure Conditions
- [ ] Feature breaks existing API contract without migration plan.
- [ ] "Engineering said it is hard so we will do it anyway" without escalation.
- [ ] No technical review before commitment to stakeholders.
- [ ] Performance regression caused by feature that could have been predicted.

### Self-Audit Questions
- Can I explain the technical approach to a non-technical stakeholder?
- What is the biggest technical risk in this feature and how do we mitigate it?
- Am I asking engineering to build the right thing or just the thing I want?
- If this feature 10x-ed in usage overnight, would the architecture hold?

---

## Composite Scoring Table

| Composite Score | Rating | Action |
|-----------------|--------|--------|
| 36-40 | World-Class | Document as exemplar. Share in Experience Log. |
| 30-35 | Strong | Ship with confidence. Minor improvements optional. |
| 24-29 | Meets Standard | Ship. Address dimensions below 3 in next iteration. |
| 16-23 | Below Standard | Do NOT ship. Rework required on lowest dimensions. |
| 8-15 | Critical Failure | Full rework. Escalate to CEO Brain. Post-mortem required. |

---

## Escalation Triggers

The following conditions trigger automatic escalation beyond the Product Brain:

1. **Any single dimension scores 1 twice consecutively** -> Escalate to CEO Brain
   for coaching and process review.
2. **Composite score below 16** -> Full stop. CEO Brain convenes review with
   Engineering and Design Brains.
3. **Stakeholder Communication scores 1** -> Immediate remediation required.
   All affected stakeholders contacted within 24 hours.
4. **Customer Insight Depth scores 1 on 3+ consecutive artifacts** -> Product
   Brain must complete customer immersion sprint before producing new artifacts.
5. **Metric Rigor scores 1 and feature has already launched** -> Emergency
   instrumentation sprint. Data Brain consulted immediately.
6. **Experimentation Design scores 1 and resources already committed** ->
   Pause execution. Re-scope to include proper experimentation.

---

## Annual Calibration

Every quarter, the Product Brain must:

1. Review all artifacts scored in the previous quarter.
2. Identify the dimension with the lowest average score.
3. Create a targeted improvement plan for that dimension.
4. Recalibrate scoring criteria if the market or company context has changed.
5. Archive scoring data for longitudinal trend analysis.

---

## Appendix: Score Distribution Targets

For a high-performing Product Brain, the target distribution is:
- Score 5: 20-30% of dimensions across all artifacts
- Score 3: 60-70% of dimensions across all artifacts
- Score 1: < 5% of dimensions across all artifacts (and never on the same
  dimension repeatedly)

If Score 1 frequency exceeds 10%, the Product Brain requires recalibration.

---

*This rubric is a living document. Update it when new failure modes are
discovered or when industry best practices evolve.*
