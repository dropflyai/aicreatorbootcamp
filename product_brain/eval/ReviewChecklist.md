# ReviewChecklist.md -- Pre-Flight Gates for Product Brain

> Version: 1.0
> Last Updated: 2026-02-03
> Owner: Product Brain / CEO Brain
> Purpose: No product artifact ships until EVERY applicable gate passes.
> A single gate failure blocks the artifact. No exceptions, no overrides
> without CEO Brain escalation.

---

## How to Use This Checklist

1. Identify the artifact type (PRD, Roadmap Decision, Experiment Design,
   Launch Plan, Sunset Decision, Pricing Change).
2. Check which gates apply (see Applicability Matrix at the end).
3. Every checkbox in every applicable gate must be checked.
4. If a checkbox cannot be checked, document WHY and get explicit sign-off
   from the CEO Brain to proceed without it.
5. Completed checklists are stored in the Accountability Protocol audit trail.

---

## GATE 1: Customer Evidence Gate

**Purpose:** No product decision should be made without direct evidence of
customer need. Internal opinion is not evidence. Competitor features are not
evidence. A single customer request is not evidence.

### Minimum Requirements (ALL must pass)

- [ ] At least 5 distinct customer interviews or observation sessions conducted
      within the last 90 days that are relevant to this decision.
- [ ] Interview subjects represent at least 2 distinct customer segments.
- [ ] At least 3 direct customer quotes included in the artifact that support
      the identified problem.
- [ ] Quantitative data (analytics, survey, support tickets) corroborates the
      qualitative findings.
- [ ] Problem validated, not just solution validated ("Do you have this problem?"
      before "Would you use this solution?").
- [ ] Disconfirming evidence actively sought and documented ("Who does NOT have
      this problem?").
- [ ] Customer willingness-to-pay or switching behavior data available for
      monetization-related decisions.
- [ ] Research methodology documented (how participants were recruited, what
      questions were asked, potential biases).

### Red Flags (any one blocks the gate)

- [ ] CONFIRM: No interview subjects are internal employees acting as customer
      proxies.
- [ ] CONFIRM: No leading questions used in interviews (e.g., "Would you love
      it if we added X?").
- [ ] CONFIRM: Feature request from a single enterprise customer has not been
      generalized to the entire roadmap without validation.
- [ ] CONFIRM: "Customers are asking for this" is backed by actual data, not
      anecdotal recall.

### Evidence Quality Checks

- [ ] Sample is not exclusively power users or early adopters (survivorship bias).
- [ ] Sample includes churned or at-risk customers where relevant.
- [ ] Time decay considered (evidence from 12+ months ago flagged for refresh).
- [ ] Cultural and geographic diversity in sample if product serves global market.

---

## GATE 2: Strategic Alignment Gate

**Purpose:** Every product decision must connect to the company's North Star
metric and at least one strategic pillar. If it does not, it is a distraction
regardless of how good the idea is.

### Minimum Requirements (ALL must pass)

- [ ] North Star metric explicitly stated in the artifact.
- [ ] Quantified (or bounded) expected impact on North Star metric.
- [ ] Connection to at least one company strategic pillar documented.
- [ ] Trade-off against other strategic priorities acknowledged.
- [ ] "What we are choosing NOT to do" section included.
- [ ] Time horizon of impact stated (this quarter, this half, this year, multi-year).
- [ ] Decision is consistent with stated company positioning / ICP.

### Strategic Coherence Checks

- [ ] This decision does not contradict any active strategic commitment.
- [ ] If this contradicts a previous decision, the change in strategy is
      explicitly documented with rationale.
- [ ] Resource allocation implications mapped (engineering weeks, design weeks,
      data science involvement, marketing support).
- [ ] Second-order effects considered ("If this succeeds, what does it enable
      or close off?").
- [ ] Competitive response anticipated ("If competitors copy this, do we still win?").

### Anti-Patterns (any one blocks the gate)

- [ ] CONFIRM: This is not a "pet project" without strategic justification.
- [ ] CONFIRM: "Strategy" section is not boilerplate copied from a template.
- [ ] CONFIRM: Feature is not being built solely because a competitor has it.
- [ ] CONFIRM: Feature is not being built solely because it was promised to an
      investor in a pitch deck.

---

## GATE 3: Specification Completeness Gate

**Purpose:** Engineering should never have to guess. Every user-facing state,
edge case, and acceptance criterion must be defined before work begins. Ambiguity
in specs causes rework, which is the most expensive form of waste.

### User State Coverage (ALL must be defined)

- [ ] Happy path fully specified with step-by-step user flow.
- [ ] Error states defined for every interaction point (validation errors,
      server errors, timeout, permission denied).
- [ ] Empty states defined (first-time user, no data, no results).
- [ ] Loading states defined (skeleton screens, spinners, progressive loading).
- [ ] Partial states defined (incomplete data, degraded service, offline mode).
- [ ] Edge cases enumerated:
  - [ ] First-time use
  - [ ] Power user / high-volume use
  - [ ] Concurrent access / race conditions
  - [ ] Boundary values (0, 1, max, overflow)
  - [ ] Browser / device / OS variations (if applicable)
  - [ ] Internationalization (text expansion, RTL, date/number formats)

### Acceptance Criteria

- [ ] Every user story has testable acceptance criteria.
- [ ] Format is unambiguous (Given/When/Then or equivalent structured format).
- [ ] Negative test cases included ("Given X, the system should NOT do Y").
- [ ] Performance criteria included where relevant (response time, throughput).
- [ ] Accessibility criteria included (WCAG level specified).

### Technical Specification

- [ ] Data model changes identified and reviewed with engineering.
- [ ] API contracts defined (endpoints, payloads, error codes) or confirmed
      as not needed.
- [ ] Third-party dependencies identified with fallback behavior defined.
- [ ] Feature flag strategy defined (who gets it, rollout percentage, kill switch).
- [ ] Analytics events specified with event names, properties, and triggers.
- [ ] Migration plan for existing users defined (if behavior changes).
- [ ] Rollback plan documented (how to undo if something goes wrong).

### Design Specification

- [ ] Wireframes or mockups provided for all states (not just happy path).
- [ ] Interactive prototype available for complex flows.
- [ ] Design system components identified (existing vs. new).
- [ ] Responsive behavior specified (breakpoints, layout changes).
- [ ] Motion / animation specified where relevant.
- [ ] Content strings finalized (no "lorem ipsum" or "TBD" in shipped specs).
- [ ] Design reviewed by Design Brain and signed off.

### Anti-Patterns (any one blocks the gate)

- [ ] CONFIRM: No "TBD" or "to be determined" appears in the specification.
- [ ] CONFIRM: No "engineering will figure out the details" delegation.
- [ ] CONFIRM: Spec has been reviewed by at least one engineer who will
      implement it.
- [ ] CONFIRM: Spec does not assume capabilities that do not exist in current
      system without flagging them as new requirements.

---

## GATE 4: Prioritization Rigor Gate

**Purpose:** Every feature that enters the roadmap must have been evaluated
against alternatives. "We should build this" is not a prioritization decision.
"We should build this INSTEAD of these other things" is.

### Minimum Requirements (ALL must pass)

- [ ] At least 3 alternatives evaluated (including "do nothing").
- [ ] Prioritization framework applied (RICE, ICE, weighted scoring, or
      expected value) with documented weights and rationale.
- [ ] Opportunity cost quantified ("By building X, we delay Y by Z weeks").
- [ ] Reversibility assessed (one-way door vs. two-way door decision).
- [ ] Sequencing rationale provided (why now, why not next quarter).
- [ ] Resource requirements estimated and confirmed as available.
- [ ] Dependencies identified and owners confirmed.

### Decision Quality Checks

- [ ] Framework weights are not gerrymandered to produce a predetermined outcome.
- [ ] Confidence levels stated for estimates (high / medium / low with basis).
- [ ] Sunk cost is not being used as a reason to continue.
- [ ] Recency bias checked (is this being prioritized because it was raised
      recently, or because it is truly important?).
- [ ] Authority bias checked (is this being prioritized because a senior
      person requested it?).

### Portfolio Balance Check

- [ ] Roadmap is not 100% new features (maintenance, tech debt, and reliability
      work included).
- [ ] Mix of high-risk/high-reward and low-risk/incremental bets present.
- [ ] No single initiative consumes more than 40% of available resources
      without explicit strategic justification.
- [ ] Quick wins included alongside long-term bets to maintain team momentum.

---

## GATE 5: Launch Readiness Gate

**Purpose:** A feature is not "done" when code is merged. It is done when
customers can successfully use it and the team can support it.

### Technical Readiness

- [ ] Feature flags configured and tested.
- [ ] Monitoring and alerting set up for key metrics and error rates.
- [ ] Logging sufficient to debug issues without requiring code changes.
- [ ] Load testing completed if feature is expected to handle significant traffic.
- [ ] Rollback procedure tested (not just documented).
- [ ] Security review completed for features handling PII, payments, or auth.

### Operational Readiness

- [ ] Support team briefed and documentation updated.
- [ ] Known limitations documented and communicated.
- [ ] Escalation path defined for launch-day issues.
- [ ] On-call rotation aware of the launch.
- [ ] Runbook created for common failure scenarios.

### Measurement Readiness

- [ ] All success metrics instrumented and verified in staging.
- [ ] Dashboard or report created for monitoring launch metrics.
- [ ] Baseline metrics captured before launch.
- [ ] Statistical significance calculator configured (if A/B testing).
- [ ] Post-launch review scheduled (30-day, 60-day, 90-day).

### Communication Readiness

- [ ] Release notes prepared.
- [ ] Customer-facing documentation updated.
- [ ] Marketing team informed (if applicable).
- [ ] Sales team informed (if applicable).
- [ ] Changelog updated.
- [ ] Internal announcement prepared.

### Rollout Plan

- [ ] Gradual rollout plan defined (internal -> beta -> % rollout -> GA).
- [ ] Rollout criteria for each stage defined (what must be true to proceed).
- [ ] Rollback criteria defined (what conditions trigger a rollback).
- [ ] Rollout owner identified.
- [ ] Communication plan for each rollout stage.

---

## GATE 6: Sunset / Deprecation Gate

**Purpose:** Removing a feature requires as much rigor as adding one. Users
depend on what exists.

### Impact Assessment

- [ ] Usage data analyzed (daily/weekly/monthly active users of the feature).
- [ ] Revenue impact assessed (is any revenue tied to this feature?).
- [ ] Customer segments affected identified.
- [ ] Contractual obligations checked (is this feature in any SLA or contract?).
- [ ] Integration dependencies mapped (do partners or third parties depend on this?).

### Migration Plan

- [ ] Alternative solution identified for affected users.
- [ ] Migration path documented and tested.
- [ ] Migration tooling built if needed (data export, configuration transfer).
- [ ] Timeline communicated with sufficient notice (minimum 90 days for breaking changes).
- [ ] Support resources allocated for migration assistance.

### Communication Plan

- [ ] In-app notification planned.
- [ ] Email communication to affected users drafted.
- [ ] Documentation updated to reflect deprecation.
- [ ] Support team trained on migration path.
- [ ] FAQ prepared for common objections.

---

## Applicability Matrix

| Gate | PRD | Roadmap Decision | Experiment Design | Launch Plan | Sunset | Pricing Change |
|------|-----|-------------------|-------------------|-------------|--------|----------------|
| Customer Evidence | Required | Required | Required | N/A | Required | Required |
| Strategic Alignment | Required | Required | Recommended | N/A | Required | Required |
| Specification | Required | N/A | Recommended | N/A | N/A | N/A |
| Prioritization | Required | Required | Recommended | N/A | Required | Required |
| Launch Readiness | N/A | N/A | N/A | Required | N/A | Required |
| Sunset / Deprecation | N/A | N/A | N/A | N/A | Required | N/A |

"Required" = All checkboxes must pass.
"Recommended" = Should be completed; exceptions documented.
"N/A" = Gate does not apply to this artifact type.

---

## Override Protocol

If a gate cannot be passed and the Product Brain believes the artifact should
still ship:

1. Document which specific checkboxes cannot be passed and why.
2. Document the risk of shipping without passing the gate.
3. Document the proposed mitigation for the identified risk.
4. Escalate to CEO Brain with the above documentation.
5. CEO Brain may grant a time-limited waiver (must specify when the gate
   will be retroactively passed).
6. Waiver is logged in the Accountability Protocol with expiration date.
7. If the waiver expires without the gate being passed, automatic escalation.

---

*No gate is optional. No checkbox is decorative. If it is on this list, it
matters. If it does not matter, remove it from the list.*
