# Decision Making -- Executive-Level Decision Frameworks

## Overview

Decision-making is the CEO's primary output. Every other CEO function -- strategy,
coordination, resource allocation, people management -- is ultimately expressed
through decisions. The quality of decisions determines the trajectory of the
organization.

This module codifies the decision frameworks that separate excellent executive
judgment from average managerial reasoning. It draws on Bezos, Boyd, Klein,
Kahneman, and decades of decision science research.

---

## One-Way Doors vs. Two-Way Doors (Bezos Framework)

### The Core Distinction

Jeff Bezos, in his 1997 and 2015 shareholder letters, introduced the most
practically useful decision taxonomy in modern business:

```
TYPE 1 DECISIONS (One-Way Doors)
+-----------------------------------------------+
| - Irreversible or nearly irreversible          |
| - Consequences are severe and long-lasting     |
| - Require deep analysis, multiple perspectives |
| - Should be made slowly and carefully          |
| - CEO/executive involvement required           |
| - Document extensively                         |
+-----------------------------------------------+
Examples:
  - Selling the company
  - Major acquisitions
  - Platform/technology migration
  - Entering a new market with heavy investment
  - Firing a co-founder
  - Changing pricing model fundamentally

TYPE 2 DECISIONS (Two-Way Doors)
+-----------------------------------------------+
| - Reversible with acceptable cost              |
| - Consequences are contained and recoverable   |
| - Should be made quickly by individuals/teams  |
| - Do NOT require executive involvement         |
| - Bias toward action and speed                 |
| - Document lightly                             |
+-----------------------------------------------+
Examples:
  - Feature prioritization within a sprint
  - Vendor selection for non-critical tools
  - Content calendar decisions
  - UI layout experiments
  - Hiring a contractor for a project
```

### The Organizational Failure Mode

Bezos's deeper insight: as organizations grow, they treat Type 2 decisions
like Type 1 decisions. This creates bureaucracy, slowness, and
risk-aversion. The remedy:

1. **Default to Type 2** -- Most decisions are reversible. Assume reversibility
   unless proven otherwise.
2. **Push Type 2 down** -- The person closest to the information makes the call.
3. **Reserve CEO attention for Type 1** -- The CEO's scarce bandwidth is
   allocated only to irreversible, high-consequence decisions.
4. **Speed as a value** -- For Type 2 decisions, the cost of delay almost always
   exceeds the cost of a wrong decision.

### Decision Speed Calibration

```
                    Type 1                        Type 2
Analysis depth:     Deep (weeks-months)           Light (hours-days)
Information:        ~80% of ideal info            ~60% of ideal info
Participants:       Executive team + board        Individual or small team
Documentation:      Full decision doc             Brief note or no doc
Reversal cost:      High (millions/$, years)      Low (days, modest cost)
CEO involvement:    Required                      Not required
Approval:           Explicit sign-off             Autonomous
```

---

## OODA Loop (Boyd)

### Origin and Theory

Colonel John Boyd (USAF) developed the OODA loop to explain why certain
fighter pilots consistently won engagements. The framework transcends military
application and describes the fundamental cycle of competitive decision-making:

```
      OBSERVE          ORIENT           DECIDE          ACT
    +---------+     +-----------+     +--------+     +------+
    | Gather  | --> | Interpret | --> | Choose | --> | Do   |
    | data    |     | context   |     | course |     | it   |
    +---------+     +-----------+     +--------+     +------+
         ^                                               |
         |                                               |
         +----------- FEEDBACK LOOP --------------------+
```

### The Four Phases

#### Observe
Gather information from all available sources:
- Market signals (customer behavior, competitor moves, industry shifts)
- Internal signals (metrics, team feedback, operational data)
- Environmental signals (regulatory, economic, technological)

CEO application: The CEO must have the most comprehensive information picture
in the organization. This requires multiple information channels:
- Direct reports (filtered, potentially biased)
- Skip-levels (unfiltered, politically costly)
- Customer conversations (ground truth)
- External advisors (pattern recognition)
- Data dashboards (quantitative foundation)

#### Orient
Interpret observations through mental models, experience, and cultural
traditions. This is the most important and most neglected phase.

Boyd's insight: Orientation is the schwerpunkt (focal point) of the OODA
loop. It shapes what you observe, how you decide, and how you act. Your
mental models determine your effectiveness.

CEO application: The CEO's orientation includes:
- Industry mental models (platform dynamics, network effects, etc.)
- Business stage awareness (startup vs. scale-up vs. mature)
- Historical pattern recognition (what has worked before)
- **Destruktion**: deliberately breaking your own mental models to see
  new possibilities

#### Decide
Select a course of action. This is NOT the same as analysis -- it is
commitment. Decide means allocating resources and accepting consequences.

CEO application: The decision is the easy part. The hard part is committing
organizational resources and accepting that you might be wrong.

#### Act
Execute the decision with speed and commitment. Half-hearted execution of a
good decision produces worse results than full-hearted execution of a
mediocre decision.

### Tempo and Competitive Advantage

Boyd's deeper insight: the competitive advantage goes to whoever cycles
through the OODA loop faster. Speed of decision-making, not quality of
individual decisions, determines competitive outcomes.

```
Company A:  O → O → D → A → O → O → D → A → O → O → D → A
Company B:  O → O → D → A ----→ O → O → D → A ----→ O → O
            ^faster tempo^       ^slower tempo^
```

When you operate inside the competitor's OODA loop, they are always reacting
to your last move while you have already moved on. This is the strategic
basis for speed as a competitive advantage.

---

## Pre-Mortem Analysis (Klein, 1998)

### The Method

Gary Klein, a cognitive psychologist specializing in naturalistic
decision-making, developed the pre-mortem as an antidote to groupthink and
overconfidence.

The protocol:
1. The team has tentatively decided on a course of action
2. **The facilitator says:** "Imagine we are one year in the future. We
   implemented this plan. It was a disaster. It failed completely. Take two
   minutes to independently write down all the reasons it failed."
3. Each person shares their failure reasons
4. The team assesses: which failure modes are likely enough to warrant
   mitigation?

### Why It Works

Standard risk assessment asks "What could go wrong?" -- which triggers
confirmation bias (people defend the plan they have already committed to).

The pre-mortem asks "What DID go wrong?" -- using prospective hindsight.
Research (Mitchell, Russo & Pennington, 1989) shows that prospective hindsight
increases the ability to identify reasons for an outcome by 30%.

### CEO Application

Before any Type 1 decision:

```
Pre-Mortem Template:
+-----------------------------------------------+
| DECISION: [What we are deciding]              |
| DATE: [When]                                  |
| PARTICIPANTS: [Who was in the room]           |
|                                               |
| SCENARIO: It is 12 months from now. This      |
| decision was a catastrophic failure.          |
|                                               |
| FAILURE REASONS IDENTIFIED:                   |
| 1. [Reason] -- Likelihood: H/M/L             |
| 2. [Reason] -- Likelihood: H/M/L             |
| 3. [Reason] -- Likelihood: H/M/L             |
|                                               |
| MITIGATIONS:                                  |
| 1. [For each H/M failure reason]             |
|                                               |
| KILL CRITERIA:                                |
| If [condition], we reverse this decision.     |
+-----------------------------------------------+
```

---

## Cognitive Biases at the Executive Level

### The Bias Landscape

Daniel Kahneman (Nobel Prize, 2002) established that human decision-making
is systematically biased. CEOs are not immune -- in fact, the high-stakes,
time-pressured, information-overloaded CEO environment amplifies many biases.

### The Ten Most Dangerous CEO Biases

| Bias | Description | CEO Manifestation | Countermeasure |
|------|------------|-------------------|----------------|
| Confirmation bias | Seeking info that confirms existing beliefs | Ignoring data that contradicts strategy | Assign devil's advocate; pre-mortem |
| Sunk cost fallacy | Continuing because of past investment | "We've invested too much to stop" | Kill criteria defined in advance |
| Overconfidence | Overestimating accuracy of predictions | Aggressive forecasts, thin margins | Base rates; reference class forecasting |
| Anchoring | Over-weighting first piece of information | Anchoring to initial valuation/plan | Multiple independent estimates |
| Survivorship bias | Learning only from successes | "Company X did it this way" | Study failures equally |
| Status quo bias | Preferring current state | Resistance to necessary pivots | Regularly question: "If we were starting fresh, would we do this?" |
| Availability heuristic | Over-weighting recent/vivid events | Overreacting to last crisis | Base rate analysis |
| Dunning-Kruger | Incompetence unaware of itself | CEO opining in domains they lack expertise | Delegate to specialist brains |
| Groupthink | Conformity pressure suppresses dissent | Executive team agrees too easily | Structured dissent; independent written input before discussion |
| Planning fallacy | Underestimating time/cost | Every project is late and over budget | Reference class forecasting; add 50% buffer |

### Debiasing Protocol for Major Decisions

1. **Independent input first** -- Before group discussion, each participant
   writes their view independently
2. **Devil's advocate** -- Assign someone to argue against the prevailing view
3. **Pre-mortem** -- Imagine failure and identify causes
4. **Reference class** -- Find 10+ similar decisions and their outcomes
5. **Outside view** -- Ask someone with no stake to review the logic
6. **Time delay** -- Sleep on Type 1 decisions; revisit with fresh eyes
7. **Inversion** -- Instead of "How do we succeed?" ask "How would we
   guarantee failure?" Then avoid those things

---

## The Delegation Framework

### When to Delegate vs. Decide Personally

```
                         HIGH
                          |
    CEO decides with      |     CEO decides
    input from team       |     personally
                          |
  Decision Impact         |
                          |
    Delegate with         |     Delegate to
    defined parameters    |     specialist brain
                          |
                         LOW
             LOW -------- Reversibility -------- HIGH
```

### The Delegation Spectrum

Not all delegation is equal. There are levels:

| Level | What the CEO Says | When to Use |
|-------|------------------|-------------|
| 1. Tell | "Here is what I decided. Execute." | Crisis, wartime, urgent |
| 2. Sell | "Here is what I decided and why." | Important with alignment needed |
| 3. Consult | "I want your input before I decide." | Complex, multi-stakeholder |
| 4. Agree | "Let us decide together." | Shared ownership needed |
| 5. Advise | "Here is my input; you decide." | Specialist domain, Type 2 |
| 6. Inquire | "You decide; tell me what you chose." | Routine, trusted delegate |
| 7. Delegate | "You decide; I trust you." | Full autonomy, low stakes |

### CEO Brain Delegation Rules

For the brain system:
- **Level 1-2**: CEO Brain retains control (crisis mode, Type 1 decisions)
- **Level 3-4**: CEO Brain coordinates with multiple brains
- **Level 5-6**: CEO Brain routes to a specialist and reviews output
- **Level 7**: CEO Brain routes and does not review (routine tasks)

---

## Decision Documentation

### Why Document Decisions

Good decision documentation creates:
1. **Accountability** -- decisions have owners and rationale
2. **Learning** -- you can review past decisions and their outcomes
3. **Alignment** -- everyone understands why, not just what
4. **Reversibility** -- you can trace back to the decision point

### Decision Record Format

```
DECISION RECORD
+--------------------------------------------------+
| Title: [Brief description]                        |
| Date: [When decided]                              |
| Type: [Type 1 / Type 2]                          |
| Decider: [Who made the call]                     |
| Consulted: [Who provided input]                  |
| Informed: [Who needs to know]                    |
|                                                  |
| CONTEXT: [Why this decision is needed now]       |
|                                                  |
| OPTIONS CONSIDERED:                              |
| A. [Option] -- Pros / Cons                       |
| B. [Option] -- Pros / Cons                       |
| C. [Option] -- Pros / Cons                       |
|                                                  |
| DECISION: [What we chose and why]                |
|                                                  |
| TRADEOFFS: [What we are giving up]               |
|                                                  |
| KILL CRITERIA: [When we reverse this]            |
|                                                  |
| REVIEW DATE: [When we reassess]                  |
+--------------------------------------------------+
```

---

## Second-Order Thinking

### The Concept

First-order thinking asks: "What happens if we do X?"
Second-order thinking asks: "And then what happens after that?"

Howard Marks (Oaktree Capital) argues that first-order thinking produces
average results because everyone does it. Second-order thinking produces
superior results because few people do it consistently.

### CEO Application

Every major decision requires at least three orders of effect analysis:

```
Decision: Lower prices by 20%
  First order:  More customers (good)
  Second order: Competitors match price (bad)
  Third order:  Industry margin compression, weaker players exit (?)
  Fourth order: Consolidation creates fewer, stronger competitors (bad?)
```

```
Decision: Hire aggressively for growth
  First order:  More capacity, faster execution (good)
  Second order: Diluted culture, communication overhead (bad)
  Third order:  Coordination costs exceed productivity gains (bad)
  Fourth order: Forced layoffs damage employer brand (very bad)
```

### The Second-Order Thinking Protocol

For every Type 1 decision, trace at least three levels of consequence:

1. **What is the immediate effect?** (obvious to everyone)
2. **What behavior does this incentivize?** (visible to thoughtful people)
3. **What systemic dynamics does this create?** (visible to systems thinkers)
4. **What is the equilibrium state?** (where does this end up?)

---

## Speed vs. Quality: The Meta-Decision

### When to Decide Fast

- Reversible decisions (Type 2)
- Competitive races (first-mover advantage)
- When information quality will not improve with time
- When the cost of delay exceeds the cost of a wrong decision
- When team morale depends on forward motion

### When to Decide Slow

- Irreversible decisions (Type 1)
- When critical information is imminent
- When stakeholder alignment is necessary for execution
- When the decision sets a precedent
- When emotions are running high (avoid reactive decisions)

### The Bezos "Disagree and Commit" Protocol

When the team cannot reach consensus:
1. The CEO states: "I disagree with this direction, but I commit to it fully."
2. OR: "I know you disagree, but I am asking you to commit to this direction."
3. The key: once the decision is made, EVERYONE executes with full commitment.
4. No passive resistance. No "I told you so" if it fails.

This prevents two failure modes:
- **Analysis paralysis** (waiting for consensus that will never come)
- **Half-hearted execution** (grudging compliance that ensures failure)

---

## Integration: The CEO Decision Operating System

```
Incoming Decision
      |
      v
Classify: Type 1 or Type 2?
      |
  TYPE 2 --> Delegate (Level 5-7) --> Monitor outcome
  TYPE 1 --> Continue below
      |
      v
Gather information (OODA: Observe)
      |
      v
Interpret through mental models (OODA: Orient)
      |
      v
Check biases (Debiasing Protocol)
      |
      v
Run pre-mortem (Klein)
      |
      v
Analyze second-order effects (Marks)
      |
      v
Decide and document (Decision Record)
      |
      v
Execute with full commitment (Bezos)
      |
      v
Review at scheduled date (Feedback loop)
```

---

**Every decision the CEO Brain makes follows this system. Speed for reversible
choices. Rigor for irreversible ones. Always documented. Always with kill
criteria. Always with second-order analysis.**
