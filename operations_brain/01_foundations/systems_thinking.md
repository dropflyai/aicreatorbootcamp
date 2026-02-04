# Systems Thinking -- Feedback Loops, Bottlenecks, and Theory of Constraints

## Overview

Systems thinking is the discipline of seeing the whole rather than the parts,
understanding interrelationships rather than linear cause-and-effect chains, and
recognizing patterns of change rather than static snapshots. In operations, systems
thinking prevents the cardinal sin of local optimization at the expense of global
performance.

This module covers three foundational frameworks: general systems thinking (Senge,
Forrester), Theory of Constraints (Goldratt), and complexity theory as applied to
operations management.

---

## Foundations of Systems Thinking

### The System as Unit of Analysis

A system is a set of interrelated elements that work together to achieve a purpose.
Properties of systems that matter for operations:

1. **Emergence**: System-level properties that do not exist in individual components.
   A factory's throughput is emergent -- no single machine "has" throughput.

2. **Interdependence**: Changing one element affects others, often in non-obvious ways.
   Speeding up one process step may create a new bottleneck downstream.

3. **Feedback**: Outputs of the system influence future inputs. Feedback can be
   reinforcing (amplifying) or balancing (stabilizing).

4. **Delay**: Effects of actions are not instantaneous. Delays in feedback loops
   cause oscillation, overreaction, and instability.

5. **Non-linearity**: Small changes can have large effects (leverage points), and
   large changes can have small effects (diminishing returns).

### Causal Loop Diagrams

Causal loop diagrams map the feedback structure of a system:

```
Reinforcing Loop (R) -- Amplifies change (vicious or virtuous cycle)

    Sales Revenue (+)
         |
         v
    Marketing Budget (+)
         |
         v
    Marketing Effectiveness (+)
         |
         v
    Customer Acquisition (+) -----> Sales Revenue (back to top)

    All (+) links = Reinforcing loop
    More revenue -> more marketing -> more customers -> more revenue
```

```
Balancing Loop (B) -- Seeks equilibrium

    Workload (+)
         |
         v
    Hiring (+)
         |
         v
    Workforce Size (+)
         |
         v
    Capacity (+)
         |
         v
    Workload per Person (-) -----> adjusts toward target

    Odd number of (-) links = Balancing loop
    High workload -> hire more -> more capacity -> lower per-person workload
```

### System Archetypes in Operations

Peter Senge identified common system patterns (archetypes) that recur across
organizations:

#### Fixes That Fail
A quick fix alleviates symptoms but creates side effects that worsen the problem.

```
Problem ---> Quick Fix ---> Symptom Relief (temporary)
   ^              |
   |              v
   +---- Unintended Consequence (delayed) ----+
```

**Operational example**: Adding overtime to meet deadlines reduces short-term backlog
but increases errors (fatigue), which creates rework, which increases the backlog.

**Countermeasure**: Address root causes. Use 5 Whys before implementing fixes.

#### Shifting the Burden
A symptomatic solution undermines the fundamental solution by reducing pressure
to implement it.

```
Symptom ---> Symptomatic Solution ---> Relief
   |                                      |
   |              (meanwhile)             |
   v                                      v
Fundamental Solution                  Reduced urgency to
(never implemented)                   implement fundamental fix
```

**Operational example**: Expediting orders to compensate for poor scheduling. The
expediting "works" so scheduling is never fixed. Expediting becomes permanent.

**Countermeasure**: Commit to the fundamental solution. Accept short-term pain.

#### Limits to Growth
A reinforcing process drives growth until it hits a constraint, then growth slows
or reverses.

```
Growth Actions ---> Results (growing)
                       |
                       v
                    Constraint activates
                       |
                       v
                    Results plateau or decline
```

**Operational example**: Hiring aggressively to grow. New hires reduce average
skill level, increasing defects and reducing effective throughput. Growth stalls.

**Countermeasure**: Identify the constraining factor BEFORE growth hits the limit.
Invest in removing the constraint proactively.

#### Tragedy of the Commons
Individuals using a shared resource in their own interest eventually deplete it.

**Operational example**: Multiple teams sharing a deployment pipeline. Each team
deploys frequently, saturating the pipeline. Lead times increase for everyone.

**Countermeasure**: Govern shared resources explicitly. Implement scheduling,
quotas, or dedicated capacity.

---

## Theory of Constraints (Goldratt)

### The Core Insight

Every system has at least one constraint -- a factor that limits its ability to
achieve more of its goal. The system's output is determined entirely by its constraint.
Improving anything other than the constraint is an illusion of progress.

Goldratt (1984): "An hour lost at a bottleneck is an hour lost for the entire system.
An hour saved at a non-bottleneck is a mirage."

### The Five Focusing Steps

The TOC improvement process:

```
+----> 1. IDENTIFY the constraint
|      What is limiting system throughput?
|      (The resource with the longest queue, highest utilization,
|       or most frequent cause of delays)
|
|      2. EXPLOIT the constraint
|      Get maximum output from the constraint AS-IS.
|      No new investment. No reorganization.
|      (Eliminate idle time at constraint, ensure it always has work,
|       remove non-constraint work from it, ensure quality before it)
|
|      3. SUBORDINATE everything else to the constraint
|      All other resources serve the constraint's needs.
|      Non-constraints should NOT operate at full speed if that
|      creates WIP piles before the constraint.
|      (This is the hardest step -- it requires accepting idle
|       time at non-constraints)
|
|      4. ELEVATE the constraint
|      Invest to increase the constraint's capacity.
|      (Buy more capacity, hire more people, redesign the process,
|       split the workload)
|
+----  5. REPEAT -- Do NOT let inertia become the constraint
       If the constraint has moved, go back to Step 1.
       Warning: policies and procedures built for the old constraint
       often persist and become the NEW constraint.
```

### Drum-Buffer-Rope (DBR)

Goldratt's scheduling methodology based on TOC:

```
Raw Material ---> Process A ---> Process B ---> CONSTRAINT ---> Process D ---> Output
                                                (Drum)
     ^                              ^
     |                              |
     +---- Rope (pull signal) ------+
                                    |
                                Buffer
                              (time buffer
                               before constraint)
```

- **Drum**: The constraint sets the pace (heartbeat) of the entire system.
- **Buffer**: A time buffer (not inventory buffer) before the constraint protects
  it from starvation due to upstream variability.
- **Rope**: A pull signal from the constraint to the system entry point, releasing
  work at the pace the constraint can process it.

**Key insight**: The rope prevents overproduction. Work enters the system only as
fast as the constraint can process it. WIP is controlled systemically.

### Throughput Accounting

Goldratt rejected traditional cost accounting for operational decisions:

| Concept | Traditional Cost Accounting | Throughput Accounting |
|---------|---------------------------|---------------------|
| Primary metric | Cost per unit | Throughput (Revenue - TVC) |
| Improvement focus | Reduce cost everywhere | Increase throughput at constraint |
| Idle resources | Bad (waste of capacity) | Normal (subordination) |
| Batch sizes | Larger = lower unit cost | Smaller = better flow |
| Local efficiency | Maximize everywhere | Maximize at constraint only |
| Investment decision | ROI based on cost savings | ROI based on throughput increase |

**Three operational measures:**
1. **Throughput (T)** = Revenue - Truly Variable Costs
2. **Inventory/Investment (I)** = Money tied up in the system
3. **Operating Expense (OE)** = Money spent to turn I into T

**Goal**: Increase T, decrease I and OE, in that priority order.

### The Thinking Processes

Goldratt developed logical tools for systemic problem-solving:

#### Current Reality Tree (CRT)
Maps cause-and-effect from root causes to undesirable effects (UDEs).
Used to find the core conflict underlying multiple symptoms.

```
UDE: Late deliveries
  ^
  |  (caused by)
UDE: Long lead times
  ^
  |  (caused by)
Large batch sizes + High WIP
  ^
  |  (caused by)
Push scheduling to maximize local efficiency
  ^
  |  (caused by)
Policy: Measure departmental utilization   <-- ROOT CAUSE (policy constraint)
```

#### Evaporating Cloud (Conflict Resolution Diagram)
Surfaces the hidden assumptions behind conflicting requirements:

```
         Objective
        /         \
  Requirement A   Requirement B
       |               |
  Prerequisite A  Prerequisite B
       |               |
       +--- CONFLICT --+

  Resolve by challenging the assumptions
  that make the prerequisites seem to conflict.
```

**Example:**
- Objective: Maximize profitability
- Requirement A: Reduce costs -> Prerequisite: Minimize inventory
- Requirement B: Satisfy customers -> Prerequisite: Maintain high availability
- Conflict: Low inventory vs. high availability
- Assumption challenge: "Low inventory means stockouts"
  (False if lead times are short enough. Solve the lead time problem.)

#### Future Reality Tree (FRT)
Tests proposed solutions: "If we implement X, will it lead to the desired outcome
without creating new problems?"

---

## Bottleneck Analysis -- Practical Application

### Identifying Bottlenecks

**Quantitative indicators:**
| Indicator | Signal |
|-----------|--------|
| Utilization >85% | Approaching bottleneck territory |
| Growing queue/backlog | Work accumulates before this resource |
| Longest cycle time | Slowest step in the chain |
| Highest variability | Most unpredictable step |
| Most frequent cause of delays | Downstream processes waiting on this |

**Visual indicators:**
- Piles of WIP before a work center
- People or machines idle after a work center
- Expediting always involves the same resource
- This resource is always "busy" or "at capacity"

### Bottleneck Types

1. **Physical bottleneck**: A machine, person, or resource that cannot keep up.
   Solution: Add capacity, improve efficiency, reduce demand on it.

2. **Policy bottleneck**: A rule, procedure, or approval that slows flow.
   Solution: Challenge the policy. Often the most impactful to resolve.
   Example: "All changes require VP approval" when VP is unavailable.

3. **Market bottleneck**: Insufficient demand to utilize capacity.
   Solution: Sales/marketing problem, not operations problem.

4. **Paradigm bottleneck**: Mental models that prevent seeing alternatives.
   Solution: Challenge assumptions using Evaporating Cloud.

### Bottleneck Management Protocol

```
Step 1: MEASURE
  - Map the process end to end
  - Measure cycle time, queue time, utilization at each step
  - Identify the step with highest utilization or longest queue

Step 2: VALIDATE
  - Confirm with Gemba observation (go see)
  - Talk to the people working at the bottleneck
  - Rule out measurement error or temporary spikes

Step 3: EXPLOIT
  Before adding capacity, maximize existing capacity:
  - Reduce unplanned downtime (preventive maintenance)
  - Eliminate non-constraint work from the bottleneck
  - Ensure the bottleneck never starves (always has input ready)
  - Ensure quality BEFORE the bottleneck (don't waste constraint capacity on defects)
  - Stagger breaks so bottleneck never stops

Step 4: SUBORDINATE
  - Pace upstream work to the bottleneck's rate
  - Accept idle time at non-bottleneck resources
  - DO NOT build WIP piles before the bottleneck

Step 5: ELEVATE (if exploitation is insufficient)
  - Invest in additional capacity at the bottleneck
  - Cross-train workers to support the bottleneck
  - Automate bottleneck tasks
  - Redesign the process to bypass the bottleneck
  - Outsource bottleneck work

Step 6: REPEAT
  - After elevation, the bottleneck may move
  - Return to Step 1 and identify the new constraint
```

---

## Feedback Loops in Operations

### Key Operational Feedback Loops

**Reinforcing loop -- Quality improves everything:**
```
Higher Quality -> Fewer Defects -> Less Rework -> More Capacity ->
Higher Throughput -> More Revenue -> More Investment in Quality -> Higher Quality
```

**Balancing loop -- WIP control:**
```
High WIP -> Long Lead Times -> Customer Dissatisfaction ->
Reduced Orders -> Lower WIP -> Shorter Lead Times ->
Customer Satisfaction -> More Orders -> (cycle stabilizes)
```

**Reinforcing loop (vicious) -- Technical debt:**
```
Time Pressure -> Shortcuts -> Technical Debt -> More Bugs ->
More Firefighting -> Less Time for Improvement -> More Time Pressure
```

### Managing Feedback Delays

Delays between cause and effect are the primary source of oscillation and
overreaction in operations:

| Situation | Delay | Risk | Countermeasure |
|-----------|-------|------|---------------|
| Hiring | 2-6 months to productivity | Overhire/underhire | Forecast further ahead |
| Quality investment | Months to see defect reduction | Abandon prematurely | Set leading indicators |
| Process change | Weeks for team adaptation | Revert too soon | Use PDCA with planned check dates |
| Supplier change | Months to qualify new supplier | Disruption | Dual-source during transition |

---

## Complexity and Operations

### The Cynefin Framework (Snowden)

Operational problems fall into different domains requiring different approaches:

```
+---------------------------+---------------------------+
|       COMPLEX             |       COMPLICATED         |
|                           |                           |
|  Probe -> Sense -> Respond|  Sense -> Analyze ->      |
|                           |  Respond                  |
|  Emergent practice        |  Good practice            |
|  Enable, experiment       |  Expert analysis          |
|  Safe-to-fail probes      |  Right answers exist      |
|                           |                           |
|  Ex: New market entry,    |  Ex: Supply chain         |
|  organizational change    |  optimization, scheduling |
+---------------------------+---------------------------+
|       CHAOTIC             |       CLEAR (Simple)      |
|                           |                           |
|  Act -> Sense -> Respond  |  Sense -> Categorize ->   |
|                           |  Respond                  |
|  Novel practice           |  Best practice            |
|  Stabilize first          |  Standard procedures      |
|  Crisis management        |  Follow the SOP           |
|                           |                           |
|  Ex: System outage,       |  Ex: Order processing,    |
|  crisis response          |  routine maintenance      |
+---------------------------+---------------------------+
```

**Operational implication**: Do not apply complicated-domain tools (Six Sigma,
optimization) to complex-domain problems (culture change, innovation). Use
probes and experiments instead.

---

## Integration with Other Modules

| Module | Systems Thinking Application |
|--------|----------------------------|
| Process Design | VSM as a systems-level view of process flow |
| Process Optimization | TOC Five Focusing Steps for bottleneck improvement |
| Quality Management | SPC as a feedback control mechanism |
| Supply Chain | Bullwhip effect as a feedback delay problem |
| Scaling | Limits to Growth archetype for scaling decisions |
| Metrics | Leading vs. lagging indicators as feedback signals |
| Crisis Management | Chaotic domain response in Cynefin |

---

## Key Takeaways

1. **The system IS the unit of analysis.** Never optimize a part without understanding
   the whole.
2. **Feedback loops drive behavior.** Map them before intervening.
3. **Delays cause oscillation.** Account for them in every decision.
4. **The constraint determines throughput.** Everything else is noise.
5. **Policy constraints** are the most common and most impactful.
6. **Subordination** (accepting idle non-constraints) is the hardest principle to follow.
7. **Match the approach to the domain.** Cynefin prevents applying the wrong tools.

---

**References:**
- Goldratt, E.M. (1984). *The Goal*. North River Press.
- Goldratt, E.M. (1994). *It's Not Luck*. North River Press.
- Senge, P.M. (1990). *The Fifth Discipline*. Doubleday.
- Forrester, J.W. (1961). *Industrial Dynamics*. MIT Press.
- Snowden, D.J. & Boone, M.E. (2007). A Leader's Framework for Decision Making.
  *Harvard Business Review*, November.
- Meadows, D.H. (2008). *Thinking in Systems*. Chelsea Green.
