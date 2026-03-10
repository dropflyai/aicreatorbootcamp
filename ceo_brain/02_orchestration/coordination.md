# Coordination -- Inter-Brain Handoffs, Conflict Resolution, and Quality Gates

## Overview

Coordination is the operational discipline of ensuring that multiple
specialist brains produce integrated, coherent output rather than a
collection of disconnected domain artifacts. It is the CEO Brain's most
important runtime function -- decomposition plans the work; coordination
executes the plan.

This module codifies the protocols for inter-brain handoffs, conflict
resolution when brains disagree, priority arbitration when resources are
scarce, quality gates that prevent defective work from propagating, and
feedback loops that enable continuous improvement of the coordination
system itself.

---

## Inter-Brain Handoff Protocol

### The Handoff Lifecycle

Every handoff between brains follows a six-stage lifecycle:

```
1. SPECIFICATION     2. PRODUCTION      3. DELIVERY
+-------------+     +-------------+     +-------------+
| Define what |---->| Producer    |---->| Hand off    |
| is needed   |     | creates it  |     | deliverable |
+-------------+     +-------------+     +-------------+
                                              |
6. CLOSE             5. REVISION         4. REVIEW
+-------------+     +-------------+     +-------------+
| Accept and  |<----| Fix issues  |<----| Consumer    |
| integrate   |     | if any      |     | reviews     |
+-------------+     +-------------+     +-------------+
```

### Stage 1: Specification

The CEO Brain (or delegated lead brain) specifies what the consumer brain
needs from the producer brain:

```
Handoff Specification:
- Deliverable name: [e.g., "UI component specifications"]
- Producer: [Design Brain]
- Consumer: [Engineering Brain]
- Format: [Markdown with design tokens, measurements in px/rem]
- Required sections:
  - Component hierarchy
  - State specifications (default, hover, active, disabled, error)
  - Responsive breakpoints
  - Accessibility requirements (WCAG 2.1 AA)
  - Design tokens referenced
- Due date: [YYYY-MM-DD]
- Acceptance criteria:
  - All states specified
  - All breakpoints defined
  - All tokens from design system
  - Passes accessibility audit
```

### Stage 2: Production

The producer brain creates the deliverable according to specification.
During production:
- Producer may request clarification from consumer
- Producer may flag scope concerns or impossible requirements
- Producer should signal early if the deadline is at risk
- Producer must not deviate from specification without approval

### Stage 3: Delivery

The producer brain delivers the artifact with:
- A summary of what was delivered
- Any deviations from specification (with rationale)
- Known limitations or caveats
- Recommended next actions for the consumer

### Stage 4: Review

The consumer brain reviews the deliverable against acceptance criteria:

```
Review Checklist:
- [ ] All required sections present
- [ ] Format matches specification
- [ ] Quality meets acceptance criteria
- [ ] No ambiguities that would block consumer's work
- [ ] Consistent with other handoffs in the project
```

Review outcomes:
- **Accept**: Deliverable meets all criteria. Proceed to integration.
- **Accept with notes**: Minor issues that do not block. Flag for future fix.
- **Reject with feedback**: Does not meet criteria. Specific feedback for revision.

### Stage 5: Revision (if needed)

If rejected:
- Producer receives specific feedback
- Producer revises ONLY the flagged issues
- Revised deliverable goes through Stage 4 again
- Maximum two revision cycles; escalate to CEO Brain if unresolved

### Stage 6: Close

Accepted deliverable is:
- Logged in the project coordination record
- Made available to all downstream consumers
- Integrated into the broader project deliverable

---

## Conflict Resolution Protocol

### Types of Brain Conflicts

| Conflict Type | Example | Resolution Approach |
|--------------|---------|-------------------|
| Priority conflict | Design wants accessibility; Engineering wants speed | Stakeholder value analysis |
| Feasibility conflict | Product wants a feature; Engineering says impossible | Constraint negotiation |
| Quality conflict | QA wants more testing; Product wants faster shipping | Risk-based arbitration |
| Resource conflict | Two brains need Engineering at the same time | Critical path priority |
| Scope conflict | Marketing promises features Product has not approved | Authority hierarchy |
| Standard conflict | Design uses 8px grid; Engineering uses 10px grid | Establish authoritative standard |

### The Five-Step Conflict Resolution Process

#### Step 1: Identify the Conflict Precisely

State the conflict in terms of:
- What Brain A wants and why
- What Brain B wants and why
- Where they are incompatible
- What is the consequence of choosing A over B, and vice versa

```
Conflict Statement:
"Design Brain recommends a custom animation system for microinteractions
(estimated +3 weeks engineering time, +15% code complexity) because it
significantly improves perceived performance and user delight.

Engineering Brain recommends using the platform's default animation APIs
(no additional time, standard complexity) because the custom system adds
maintenance burden and regression risk.

They are incompatible because custom animations require non-standard
implementation that cannot use default APIs."
```

#### Step 2: Classify the Stakes

| Dimension | Impact of Option A | Impact of Option B |
|-----------|-------------------|-------------------|
| Revenue | Moderate (better UX may increase conversion) | Low (default animations are acceptable) |
| Timeline | High (-3 weeks) | None |
| Technical debt | High (custom system to maintain) | None |
| User experience | High (meaningfully better) | Moderate (acceptable) |
| Competitive | Moderate (differentiator) | Low (table stakes) |

#### Step 3: Apply CEO Brain Ruling Criteria

The CEO Brain applies these principles in order:

1. **User value wins over engineering convenience** -- but only if the
   user value is measurable and significant
2. **Revenue impact wins over aesthetic preference** -- direct revenue
   impact trumps "nice to have"
3. **Long-term health wins over short-term speed** -- technical debt
   compounds; so does UX debt
4. **Reversible choices get less deliberation** -- if we can change later,
   decide quickly
5. **Data wins over opinion** -- if we can test it, test it

#### Step 4: Make the Ruling

The CEO Brain documents the ruling:

```
RULING:
Implement default animations for v1 launch (Engineering Brain position).
Add custom animation system to v2 backlog (Design Brain position deferred).

RATIONALE:
- 3-week delay impacts critical path (high-stakes Type 2 decision)
- Custom animations are reversible (can add later)
- User testing of default animations shows "acceptable" rating (4.1/5)
- Custom animations would improve to "excellent" (estimated 4.7/5)
- The 0.6-point improvement does not justify 3-week delay for v1
- This is a Type 2 (two-way door) decision

KILL CRITERIA:
- If user testing shows default animations score below 3.5/5, escalate
- If churn analysis reveals UX polish as a top-3 churn factor, escalate

REVIEW DATE: 30 days post-launch
```

#### Step 5: Ensure Commitment

Both brains must commit to the ruling:
- No passive resistance
- No "I told you so" if the decision proves wrong
- Active support for the chosen direction
- If new information emerges, either brain can request re-evaluation

---

## Priority Arbitration

### When Resources Are Scarce

The most common coordination challenge: multiple brains need the same
resource (usually Engineering) simultaneously. Priority arbitration
determines the order.

### Priority Framework: ICE Scoring

For each competing task:

```
Impact (1-10):    How much does this move the primary business metric?
Confidence (1-10): How sure are we about the impact estimate?
Ease (1-10):      How quickly/cheaply can we execute?

ICE Score = Impact x Confidence x Ease

Highest ICE score gets priority.
```

### Priority Framework: WSJF (Weighted Shortest Job First)

From SAFe, more rigorous than ICE:

```
WSJF = Cost of Delay / Job Duration

Cost of Delay = User/Business Value + Time Criticality + Risk Reduction

Higher WSJF = Higher priority
```

### Priority Override Rules

Certain situations override ICE/WSJF scoring:

1. **Security vulnerabilities** -- always top priority
2. **Legal/compliance deadlines** -- immovable external constraints
3. **Revenue-critical bugs** -- customers cannot pay or use the product
4. **Existential threats** -- competitive, regulatory, or market

### Resource Contention Resolution

```
Brain A needs Engineering for Task X (ICE: 350)
Brain B needs Engineering for Task Y (ICE: 280)
Brain C needs Engineering for Task Z (ICE: 420)

Resolution:
1. Task Z goes first (highest ICE)
2. Task X goes second
3. Task Y goes third
4. Check if any tasks can be partially parallelized
5. Check if any tasks can be done by a different brain
```

---

## Quality Gates

### Gate Types

| Gate | When | What It Checks | Who Owns |
|------|------|----------------|----------|
| Specification gate | Before production starts | Is the spec complete and unambiguous? | CEO Brain |
| Handoff gate | At each brain-to-brain transition | Does the deliverable meet acceptance criteria? | Consumer brain |
| Integration gate | When deliverables from multiple brains merge | Do the pieces fit together coherently? | CEO Brain |
| Launch gate | Before shipping to users | Is the integrated output ready? | CEO Brain + all brains |
| Retrospective gate | After completion | What worked, what did not, what to improve? | CEO Brain |

### Gate Protocol

```
QUALITY GATE REVIEW
+--------------------------------------------------+
| Gate: [Name]                                     |
| Date: [When]                                     |
| Reviewer: [Brain(s)]                             |
|                                                  |
| CRITERIA:                                        |
| [x] Criterion 1 -- PASS                         |
| [x] Criterion 2 -- PASS                         |
| [ ] Criterion 3 -- FAIL (reason: ...)           |
| [x] Criterion 4 -- PASS                         |
|                                                  |
| RESULT: PASS / PASS WITH CONDITIONS / FAIL       |
|                                                  |
| CONDITIONS (if conditional pass):                |
| - Fix [issue] by [date]                          |
| - Monitor [metric] for [period]                  |
|                                                  |
| NEXT ACTIONS:                                    |
| - [Action 1] -- Owner: [Brain]                  |
| - [Action 2] -- Owner: [Brain]                  |
+--------------------------------------------------+
```

### The Integration Quality Problem

The hardest quality challenge in multi-brain coordination: each brain's
output may individually pass quality gates, but the integrated whole may
fail. This happens when:

1. **Assumptions diverge** -- Brain A assumes one thing; Brain B assumes another
2. **Standards conflict** -- Different naming conventions, data formats, etc.
3. **Scope gaps** -- The space between two brains' responsibilities is uncovered
4. **Timing misalignment** -- Brain A's output reflects an earlier version of
   Brain B's output

Prevention:
- Shared glossary of terms (maintained by CEO Brain)
- Explicit interface contracts between brains
- Regular integration reviews (not just at handoff)
- A single source of truth for shared assumptions

---

## Feedback Loops

### Types of Coordination Feedback

| Loop | Frequency | Purpose | Participants |
|------|-----------|---------|-------------|
| Task status | Daily | Are we on track? Blockers? | All active brains |
| Handoff review | At each transition | Did the handoff work? | Producer + consumer |
| Sprint review | Weekly/biweekly | Integrated progress check | All brains + CEO |
| Retrospective | At project completion | What to improve? | All brains |
| Process audit | Quarterly | Is the coordination system working? | CEO Brain |

### The Retrospective Protocol

After every multi-brain coordination:

```
COORDINATION RETROSPECTIVE
+--------------------------------------------------+
| Project: [Name]                                  |
| Duration: [Start -- End]                         |
| Brains involved: [List]                          |
|                                                  |
| WHAT WORKED:                                     |
| 1. [Specific thing that went well]              |
| 2. [Specific thing that went well]              |
|                                                  |
| WHAT DID NOT WORK:                               |
| 1. [Specific thing that went poorly]            |
| 2. [Specific thing that went poorly]            |
|                                                  |
| ROOT CAUSES:                                     |
| 1. [Why it went poorly -- 5 Whys if needed]     |
|                                                  |
| IMPROVEMENTS FOR NEXT TIME:                      |
| 1. [Specific, actionable improvement]           |
| 2. [Specific, actionable improvement]           |
|                                                  |
| ROUTING INSIGHTS:                                |
| - Brain X was underutilized; involve earlier     |
| - Brain Y and Z handoff needs better format      |
| - New pattern: [describe and add to Patterns/]   |
+--------------------------------------------------+
```

### Continuous Improvement of Coordination

The coordination system itself must improve over time:

1. **Track coordination failures** -- late handoffs, rejected deliverables,
   conflicts, integration issues
2. **Identify patterns** -- which brain pairs have the most handoff issues?
   Which gate fails most often?
3. **Update protocols** -- modify handoff specifications, add quality criteria,
   adjust review processes
4. **Update routing** -- if a brain consistently produces better results for
   a certain task type, update the routing table
5. **Log to Memory** -- all coordination learnings go to Memory/ for future
   reference

---

## Coordination Anti-Patterns

### Anti-Pattern 1: The CEO Bottleneck

```
BAD: Every decision routes through CEO Brain
     Brain A --> CEO Brain --> Brain B --> CEO Brain --> Brain C
     (Serial, slow, CEO Brain overloaded)

GOOD: CEO Brain sets parameters, brains coordinate directly
      CEO Brain sets spec and gates
      Brain A --> Brain B --> Brain C
      CEO Brain reviews at integration gate only
```

### Anti-Pattern 2: Handoff by Hope

```
BAD: Brain A "finishes" and assumes Brain B will figure it out
     No specification, no acceptance criteria, no review

GOOD: Explicit handoff contract with acceptance criteria
      Brain A delivers per spec, Brain B reviews against criteria
```

### Anti-Pattern 3: Conflict Avoidance

```
BAD: Brains disagree but no one escalates
     Both proceed with incompatible assumptions
     Integration fails at the end

GOOD: Conflict surfaced immediately
      CEO Brain arbitrates with documented ruling
      Both brains commit to the ruling
```

### Anti-Pattern 4: Over-Coordination

```
BAD: Daily status meetings for all 37 brains
     Every decision requires full committee review
     Coordination overhead exceeds production

GOOD: Lightweight coordination for simple tasks
      Structured coordination only for multi-brain projects
      CEO Brain involvement scales with complexity
```

---

## Coordination Modes by Project Complexity

| Complexity | # Brains | Coordination Mode | CEO Involvement |
|-----------|---------|-------------------|-----------------|
| Simple | 1 | None (direct delegation) | Route and review |
| Moderate | 2-3 | Handoff contracts | Define gates, review output |
| Complex | 4-7 | Full coordination protocol | Active orchestration |
| Massive | 8+ | Program management | Dedicated coordination |

### Simple (1 brain)
```
User request --> CEO routes --> Brain executes --> CEO reviews --> Done
```

### Moderate (2-3 brains)
```
CEO decomposes --> Define handoffs --> Brains execute sequentially
--> CEO reviews integrated output --> Done
```

### Complex (4-7 brains)
```
CEO decomposes --> Dependency graph --> Handoff contracts
--> Parallel/sequential execution --> Integration gates
--> CEO reviews --> Retrospective --> Done
```

### Massive (8+ brains)
```
CEO decomposes into workstreams --> Lead brain per workstream
--> Workstreams execute with internal coordination
--> Cross-workstream integration gates
--> CEO reviews at milestones --> Final integration --> Done
```

---

**Coordination is the difference between a collection of specialist outputs
and an integrated organizational result. The CEO Brain's coordination
protocols ensure that the whole is greater than the sum of the parts.**
