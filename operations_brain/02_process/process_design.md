# Process Design -- Mapping, Modeling, and Owning Processes

## Overview

Process design is the foundational discipline of operations management:
the systematic creation and documentation of the workflows that transform
inputs into outputs. A well-designed process is visible, measurable,
repeatable, and improvable. A poorly designed process is invisible,
unmeasured, inconsistent, and calcified.

This module covers the five core process design methodologies: Value
Stream Mapping, SIPOC, Swimlane Diagrams, BPMN, and RACI -- plus the
Lean framework for identifying and eliminating waste.

---

## Value Stream Mapping (VSM)

### Origin and Purpose

Value Stream Mapping originated in the Toyota Production System (Rother
& Shook, *Learning to See*, 1999). It is the single most powerful tool
for understanding and improving a process because it shows both the flow
of materials/information AND the flow of time.

### How to Create a Value Stream Map

```
CURRENT STATE VALUE STREAM MAP

Customer                                              Customer
Demand -----> [Process 1] --> [Process 2] --> [Process 3] -----> Delivery
              |          |    |          |    |          |
              CT: 5min   |    CT: 30min  |    CT: 10min  |
              WT: 2days  |    WT: 1day   |    WT: 3days  |
              %C&A: 80%  |    %C&A: 95%  |    %C&A: 90%  |
              Batch: 50  |    Batch: 50  |    Batch: 50  |

Timeline:
|--2 days--|5min|--1 day--|30min|--3 days--|10min|
   Wait     Work   Wait    Work    Wait     Work

Total Lead Time: 6 days, 45 minutes
Value-Added Time: 45 minutes
Value-Added Ratio: 45 min / 8,640 min = 0.5%
```

Key metrics in VSM:
- **Cycle Time (CT):** Time to complete one unit of work
- **Wait Time (WT):** Time spent waiting between process steps
- **Percent Complete and Accurate (%C&A):** Percentage of output that is
  right the first time
- **Batch Size:** Number of items processed before moving to next step
- **Value-Added Ratio:** Value-added time / Total lead time

### The 99.5% Insight

In most organizations, less than 5% of total lead time is spent on
value-adding work. The other 95%+ is waiting, rework, transportation,
and overhead. This is the single most important insight in operations:
the biggest opportunity for improvement is eliminating wait time and
non-value-added work, not speeding up the value-added work.

### Future State Map

After analyzing the current state, design the future state:
1. Reduce wait times (the biggest leverage)
2. Reduce batch sizes (smaller batches = less waiting)
3. Improve %C&A (right first time = less rework)
4. Eliminate non-value-added steps
5. Automate where possible

---

## SIPOC Diagram

### What It Is

SIPOC (Suppliers, Inputs, Process, Outputs, Customers) is a high-level
process overview tool. Use it BEFORE detailed process mapping to establish
the boundaries and context of a process.

```
SIPOC DIAGRAM
+----------+---------+----------+---------+----------+
| SUPPLIERS| INPUTS  | PROCESS  | OUTPUTS | CUSTOMERS|
+----------+---------+----------+---------+----------+
| Who      | What    | High-    | What    | Who      |
| provides | goes    | level    | comes   | receives |
| the      | into    | steps    | out of  | the      |
| inputs?  | the     | (5-7    | the     | outputs? |
|          | process?| steps)   | process?|          |
+----------+---------+----------+---------+----------+
```

### Example: Customer Onboarding Process

```
+------------+-----------+----------------+-----------+------------+
| SUPPLIERS  | INPUTS    | PROCESS        | OUTPUTS   | CUSTOMERS  |
+------------+-----------+----------------+-----------+------------+
| Sales team | Signed    | 1. Welcome     | Active    | New        |
| CRM system |   contract|    email       |   account | customer   |
| Engineering| Customer  | 2. Account     | Configured| CS team    |
|   team     |   info    |    setup       |   product | Support    |
| CS team    | Product   | 3. Data        | Imported  |   team     |
| Customer   |   config  |    migration   |   data    | Product    |
|            |   needs   | 4. Training    | Trained   |   team     |
|            | Historical| 5. Health      |   user    |            |
|            |   data    |    check       | Health    |            |
|            |           | 6. Handoff     |   report  |            |
|            |           |    to CS       |           |            |
+------------+-----------+----------------+-----------+------------+
```

### When to Use SIPOC

- At the START of any process improvement initiative
- When stakeholders disagree on process boundaries
- When handing off a process to a new owner
- When onboarding someone to understand a process
- As the first step before Value Stream Mapping

---

## Swimlane Diagrams

### What They Are

Swimlane diagrams (also called cross-functional flowcharts) show process
steps organized by the role or function responsible. They make handoffs
visible -- and handoffs are where most process failures occur.

```
SWIMLANE DIAGRAM: Order Fulfillment

CUSTOMER    | [Place order] -----> [Receive confirmation]
            |       |                       ^
            |       v                       |
SALES       | [Verify order] --> [Send confirmation]
            |       |
            |       v
WAREHOUSE   | [Pick items] --> [Pack items] --> [Ship items]
            |                                       |
            |                                       v
SHIPPING    |                               [Deliver to customer]
            |                                       |
            |                                       v
CUSTOMER    |                               [Receive delivery]
```

### Design Principles for Swimlanes

1. **One lane per role** -- not per person (roles are stable, people change)
2. **Handoffs are explicit** -- every arrow crossing a lane boundary is a
   handoff and a potential failure point
3. **Decision points** -- diamond shapes for decisions; each branch is labeled
4. **Parallel paths** -- show concurrent activities side by side
5. **Start and end** -- clearly mark where the process starts and ends

### Analyzing Swimlanes for Improvement

Look for:
- **Excessive lane-crossing:** Many handoffs = many failure points
- **Ping-pong patterns:** Work bouncing between the same two lanes
- **Bottleneck lanes:** One lane with many more steps than others
- **Empty lanes:** Roles that do little but are involved (remove them)
- **Decision loops:** Repeated decisions suggesting unclear criteria

---

## BPMN (Business Process Model and Notation)

### What It Is

BPMN is the ISO standard (ISO 19510) for process modeling. It provides
a richer notation than simple flowcharts, enabling precise documentation
of complex processes.

### Core BPMN Elements

```
EVENTS:
  (O)    Start event -- process begins here
  (X)    End event -- process ends here
  (T)    Timer event -- triggered by time
  (M)    Message event -- triggered by message

ACTIVITIES:
  [    ] Task -- a single unit of work
  [+   ] Sub-process -- contains child tasks
  [L   ] Loop task -- repeats until condition met

GATEWAYS:
  <X>    Exclusive gateway (XOR) -- exactly one path
  <+>    Parallel gateway (AND) -- all paths simultaneously
  <O>    Inclusive gateway (OR) -- one or more paths

FLOWS:
  -----> Sequence flow -- normal process flow
  - - -> Message flow -- communication between participants
  ....-> Association -- connects data/annotations to elements
```

### When to Use BPMN

- Complex processes with many decision points
- Processes that will be automated (BPMN maps directly to workflow engines)
- Regulatory compliance documentation (auditable notation)
- Integration between multiple systems
- When simple flowcharts are insufficient

---

## Process Ownership: RACI Matrix

### What RACI Means

| Letter | Role | Definition | Rule |
|--------|------|-----------|------|
| R | Responsible | Does the work | At least one R per task |
| A | Accountable | Owns the outcome, makes final decisions | Exactly ONE A per task |
| C | Consulted | Provides input before the decision | As few as possible |
| I | Informed | Notified after the decision | As many as needed |

### RACI Matrix Template

```
RACI MATRIX: [Process Name]
+------------------+------+------+------+------+------+
| Task             | Role | Role | Role | Role | Role |
|                  |  1   |  2   |  3   |  4   |  5   |
+------------------+------+------+------+------+------+
| Task 1           |  A   |  R   |  C   |  I   |      |
| Task 2           |  I   |  A   |  R   |      |  C   |
| Task 3           |  C   |  I   |  A   |  R   |      |
| Task 4           |  A   |      |  C   |  R   |  I   |
+------------------+------+------+------+------+------+
```

### RACI Rules

1. **Every task must have exactly one A** -- if two people are accountable,
   no one is accountable
2. **Every task must have at least one R** -- someone must do the work
3. **A can also be R** -- the accountable person can do the work
4. **Minimize C** -- too many consultations slow the process
5. **I is cheap** -- inform liberally, it costs almost nothing

### RACI Failure Modes

| Failure | Symptom | Fix |
|---------|---------|-----|
| No A | No one owns the outcome | Assign exactly one A |
| Multiple A | Confusion about who decides | One A; others become C or I |
| Too many C | Decisions are slow | Reduce to essential consultations |
| No R | Work does not get done | Assign at least one R |
| A without authority | Accountable person cannot actually decide | Give A the authority or change A |

---

## Lean Waste Identification: TIMWOODS

### The Eight Wastes

Taiichi Ohno (Toyota) identified seven wastes; the eighth (Skills) was
added later. The acronym TIMWOODS helps remember them:

```
T - TRANSPORTATION
    Moving materials, information, or work between locations
    without adding value.
    Examples: Passing work between departments, moving files
    between systems, shipping between warehouses.
    Fix: Co-locate, digitize, eliminate handoffs.

I - INVENTORY
    Any work in progress (WIP) or finished goods sitting idle.
    In knowledge work: open tickets, pending approvals, unprocessed
    requests, feature branches not merged.
    Fix: Reduce batch sizes, pull systems, WIP limits.

M - MOTION
    Unnecessary movement of people.
    Examples: Walking between offices, switching between tools,
    searching for information.
    Fix: Organize workspaces, consolidate tools, improve search.

W - WAITING
    Time spent waiting for the next step, approval, information,
    or resource.
    Examples: Waiting for approval, waiting for a build, waiting
    for a meeting.
    Fix: Async approvals, faster builds, reduce dependencies.

O - OVERPRODUCTION
    Producing more than the customer needs, sooner than needed.
    Examples: Building features no one uses, writing reports no one
    reads, pre-producing inventory.
    Fix: Pull systems, demand-driven production, feature flags.

O - OVERPROCESSING
    Doing more work than the customer requires.
    Examples: Excessive testing on low-risk features, gold-plating
    designs, over-documenting simple processes.
    Fix: Define "good enough," match effort to risk.

D - DEFECTS
    Any output that does not meet requirements and must be reworked
    or scrapped.
    Examples: Bugs, errors, rework, returns, corrections.
    Fix: Prevention over detection, root cause analysis, poka-yoke.

S - SKILLS (Underutilized)
    Not using people's full capabilities.
    Examples: Senior engineers doing junior work, not soliciting
    ideas from front-line workers, siloing expertise.
    Fix: Delegation, cross-training, idea programs, empowerment.
```

### Waste Walk (Gemba Walk for Waste)

A systematic approach to identifying waste:

```
WASTE WALK PROTOCOL
1. Select a process to examine
2. Walk through the process step by step
3. At each step, ask:
   - Is this step adding value for the customer?
   - If not, which of the 8 wastes is this?
   - How much time/cost does this waste?
   - Can it be eliminated, reduced, or automated?
4. Document all waste found
5. Prioritize by impact and ease of elimination
6. Create improvement plan
```

---

## Process Design Methodology

### Step-by-Step Process Design

```
1. SCOPE (SIPOC)
   Define boundaries, suppliers, customers, inputs, outputs

2. MAP CURRENT STATE (VSM or Swimlane)
   Document the process as it actually works (not as designed)

3. MEASURE
   Cycle time, wait time, defect rate, %C&A per step

4. IDENTIFY WASTE (TIMWOODS)
   Walk the process, identify all 8 waste types

5. DESIGN FUTURE STATE
   Eliminate waste, reduce handoffs, improve flow

6. ASSIGN OWNERSHIP (RACI)
   Every step has a clear R and A

7. DOCUMENT
   Create the official process documentation

8. IMPLEMENT
   Roll out the new process with training

9. MEASURE AGAIN
   Compare future state metrics to current state

10. ITERATE
    Continuous improvement (PDCA cycle)
```

---

## Process Documentation Standard

Every process in the organization should be documented with:

```
PROCESS DOCUMENTATION TEMPLATE
+--------------------------------------------------+
| PROCESS NAME: [Name]                             |
| OWNER (A): [Role]                                |
| VERSION: [X.X]                                   |
| LAST UPDATED: [Date]                             |
|                                                  |
| PURPOSE: [Why this process exists]               |
| TRIGGER: [What starts this process]              |
| INPUT: [What goes in]                            |
| OUTPUT: [What comes out]                         |
|                                                  |
| STEPS:                                           |
| 1. [Step] -- R: [Role] -- Time: [X min/hours]  |
| 2. [Step] -- R: [Role] -- Time: [X min/hours]  |
| 3. [Step] -- R: [Role] -- Time: [X min/hours]  |
|                                                  |
| DECISION POINTS:                                 |
| At step [X]: If [condition], go to step [Y]     |
|              If [condition], go to step [Z]     |
|                                                  |
| METRICS:                                         |
| - Cycle time target: [X]                        |
| - Quality target: [X]% defect-free              |
| - Volume: [X] per [period]                      |
|                                                  |
| EXCEPTIONS:                                      |
| [How to handle edge cases]                       |
|                                                  |
| RELATED PROCESSES:                               |
| - [Upstream process]                             |
| - [Downstream process]                           |
+--------------------------------------------------+
```

---

**Process design is the foundation of operational excellence. Every
process must be visible, measured, owned, and continuously improved.
The Operations Brain uses these five methodologies -- VSM, SIPOC,
Swimlane, BPMN, and RACI -- to design processes that are efficient,
reliable, and scalable.**
