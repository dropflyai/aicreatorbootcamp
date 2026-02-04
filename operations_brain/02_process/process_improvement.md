# Process Improvement -- Systematic Methods for Continuous Improvement

## Overview

Process improvement is the systematic discipline of making existing
processes faster, cheaper, higher quality, and more reliable. It is not
ad hoc tinkering -- it is the application of proven scientific methods
to operational problems. The Operations Brain uses multiple improvement
frameworks, selecting the right tool for the right problem.

This module covers PDCA (Deming), DMAIC (Six Sigma), Kaizen, root cause
analysis (5 Whys, Ishikawa), Pareto analysis, the Capability Maturity
Model, Statistical Process Control, and the Theory of Constraints.

---

## PDCA Cycle (Deming)

### The Foundation of All Improvement

W. Edwards Deming's Plan-Do-Check-Act cycle is the foundational framework
for all process improvement. Every improvement method is ultimately a
variation of PDCA.

```
        PLAN
       /    \
      /      \
    ACT ---- DO
      \      /
       \    /
       CHECK
```

### Phase 1: Plan

- **Identify the problem:** What process is underperforming? How do you know?
- **Analyze the current state:** Baseline metrics, root cause analysis
- **Develop a hypothesis:** What change will improve the process?
- **Design the test:** How will you measure the improvement?

### Phase 2: Do

- **Implement the change:** On a small scale first (pilot)
- **Collect data:** Measure the same metrics as baseline
- **Document observations:** What happened? Unexpected effects?

### Phase 3: Check

- **Compare results to plan:** Did the change produce the expected improvement?
- **Analyze deviations:** Why did results differ from expectations?
- **Assess side effects:** Did the change create new problems?

### Phase 4: Act

- **If improvement confirmed:** Standardize the change. Roll out broadly.
- **If improvement not confirmed:** Analyze why. Adjust the hypothesis.
  Return to Plan.
- **In either case:** Start the next PDCA cycle. Improvement never stops.

### PDCA Rules

1. **Never skip Plan** -- jumping to Do without analysis creates random changes
2. **Never skip Check** -- implementing without measuring is flying blind
3. **Small cycles first** -- pilot before broad rollout
4. **Document everything** -- each cycle generates organizational learning
5. **The cycle never ends** -- after Act, return to Plan

---

## DMAIC (Six Sigma)

### The Five Phases

DMAIC is Six Sigma's structured improvement methodology. It is more
rigorous than PDCA and is used for complex, data-intensive improvements.

#### Define

Establish the project scope, goals, and business case.

```
PROJECT CHARTER (DMAIC Define Phase)
+--------------------------------------------------+
| PROJECT NAME: [Name]                             |
| PROBLEM STATEMENT:                               |
| [What is wrong, when it started, how bad it is,  |
|  what the impact is -- in measurable terms]      |
|                                                  |
| GOAL STATEMENT:                                  |
| [Reduce/Increase [metric] from [current] to     |
|  [target] by [date]]                            |
|                                                  |
| SCOPE:                                           |
| In scope: [What is included]                    |
| Out of scope: [What is excluded]                |
|                                                  |
| BUSINESS CASE:                                   |
| [Financial impact of the problem]               |
| [Expected savings from improvement]              |
|                                                  |
| TEAM: [Members and roles]                        |
| TIMELINE: [Milestones and dates]                 |
+--------------------------------------------------+
```

#### Measure

Collect baseline data on current process performance.

Key activities:
1. Define the metrics (CTQ -- Critical to Quality characteristics)
2. Validate the measurement system (can you trust the data?)
3. Collect baseline data (minimum 30 data points)
4. Calculate process capability (Cp, Cpk, sigma level)

```
PROCESS CAPABILITY:
- Cp: Can the process meet spec? (potential)
- Cpk: Is the process meeting spec? (actual, accounts for centering)

Sigma Level   Defects per Million   Yield
1 sigma       690,000               30.85%
2 sigma       308,000               69.15%
3 sigma        66,800               93.32%
4 sigma         6,210               99.38%
5 sigma           230               99.977%
6 sigma           3.4               99.99966%
```

#### Analyze

Identify root causes of the problem using data.

Tools:
1. **5 Whys** (see below)
2. **Ishikawa Diagram** (see below)
3. **Pareto Analysis** (see below)
4. **Regression analysis** -- correlation between variables
5. **Hypothesis testing** -- statistical significance of differences
6. **Process mapping** -- identify waste and bottlenecks

#### Improve

Design and implement solutions that address root causes.

Key activities:
1. Generate solution ideas (brainstorming, benchmarking)
2. Evaluate solutions (impact vs. effort matrix)
3. Pilot the best solution (small-scale test)
4. Measure results against baseline
5. Optimize the solution based on pilot learning

#### Control

Sustain the improvement and prevent regression.

Key activities:
1. Standardize the improved process (SOPs)
2. Implement control charts (SPC -- see below)
3. Create response plans for out-of-control conditions
4. Train all operators on the new process
5. Hand off to process owner for ongoing monitoring

---

## Kaizen: Continuous Incremental Improvement

### The Philosophy

Kaizen (Japanese: "change for better") is both a philosophy and a method.
As a philosophy: every person, every day, should improve something. As a
method: structured improvement events focused on specific processes.

### Kaizen Event (Blitz)

```
KAIZEN EVENT FORMAT
Duration: 3-5 days
Team: 5-8 people (cross-functional, includes operators)
Focus: One specific process or area

Day 1: UNDERSTAND
- Walk the process (Gemba)
- Map current state
- Collect baseline metrics
- Identify waste (TIMWOODS)

Day 2: ANALYZE
- Root cause analysis
- Prioritize opportunities
- Generate improvement ideas
- Select improvements to implement

Day 3-4: IMPLEMENT
- Implement changes (immediately, not after the event)
- Test new process
- Measure results
- Adjust as needed

Day 5: STANDARDIZE
- Document new process
- Train operators
- Create control plan
- Present results to leadership
- Celebrate
```

### Daily Kaizen

Beyond events, Kaizen is a daily practice:
1. **Suggestion system** -- anyone can suggest improvements
2. **Standard work** -- documented current best practice (basis for improvement)
3. **Visual management** -- problems are visible, not hidden
4. **Gemba walks** -- leaders go to where work happens, observe, ask questions

---

## Root Cause Analysis

### 5 Whys (Taiichi Ohno / Toyota)

The simplest and most powerful root cause technique: ask "why?" five times.

```
PROBLEM: Customer onboarding takes 3 weeks instead of 3 days.

Why 1: Why does onboarding take 3 weeks?
  Because data migration takes 2.5 weeks.

Why 2: Why does data migration take 2.5 weeks?
  Because each migration requires custom scripting.

Why 3: Why does each migration require custom scripting?
  Because every customer has a different data format.

Why 4: Why does every customer have a different data format?
  Because we have no standard import template.

Why 5: Why do we have no standard import template?
  Because we never prioritized building one.

ROOT CAUSE: No standard import template.
SOLUTION: Build a standard import template with format validation.
EXPECTED IMPACT: Reduce onboarding from 3 weeks to 3 days.
```

### Ishikawa Diagram (Fishbone / Cause-and-Effect)

Kaoru Ishikawa developed this structured brainstorming tool for
identifying all possible causes of a problem, organized by category.

```
                          PROBLEM
                         /  |  \
                        /   |   \
          PEOPLE ------/    |    \------ PROCESS
          |           /     |     \           |
          |-- Skill  /      |      \  Process |
          |-- Train /       |       \ steps   |
          |        /        |        \        |
          |       /         |         \       |
          |      /          |          \      |
    TECHNOLOGY              |           MEASUREMENT
    |                       |                |
    |-- Tools          MATERIALS        |-- Metrics
    |-- Systems        |                |-- Data quality
    |-- Automation     |-- Quality      |-- Reporting
                       |-- Availability
                       |-- Standards

Categories (6 M's for manufacturing, adapted for services):
1. Man (People) -- skills, training, staffing
2. Machine (Technology) -- tools, systems, infrastructure
3. Method (Process) -- procedures, standards, workflows
4. Material (Inputs) -- data quality, dependencies
5. Measurement -- metrics, monitoring, feedback
6. Mother Nature (Environment) -- external factors
```

### Pareto Analysis (80/20 Rule)

Vilfredo Pareto observed that 80% of effects come from 20% of causes.
Applied to process improvement: focus on the vital few causes, not the
trivial many.

```
PARETO CHART
Cause          Count    Cumulative %
Data errors      45        45%
Missing info     25        70%
System timeout   12        82%      <-- 80% line
Wrong format      8        90%
Other             10       100%
Total           100

FOCUS: Address data errors and missing info first.
       They account for 70% of all defects.
```

---

## Statistical Process Control (SPC)

### Control Charts

Control charts (Walter Shewhart, 1924) distinguish between normal
variation (common cause) and abnormal variation (special cause).

```
CONTROL CHART
              UCL (Upper Control Limit)
---X------X-------X------------------------
              Mean
     X     X     X     X     X     X
---X---X------X---X---X---X---X---X---------
              LCL (Lower Control Limit)

Points within control limits: Common cause variation (normal)
Points outside control limits: Special cause variation (investigate!)
```

### Rules for Detecting Special Causes (Western Electric Rules)

1. One point beyond 3 sigma (outside control limits)
2. Nine consecutive points on one side of the center line
3. Six consecutive points steadily increasing or decreasing
4. Two out of three consecutive points beyond 2 sigma (same side)

When special causes are detected: INVESTIGATE immediately. Something
has changed in the process.

---

## Theory of Constraints (Goldratt)

### The Five Focusing Steps

Eliyahu Goldratt (*The Goal*, 1984) demonstrated that every system has
a constraint (bottleneck) that limits throughput. Improving anything
other than the constraint is waste.

```
STEP 1: IDENTIFY the constraint
  What is the bottleneck? Where does work pile up?

STEP 2: EXPLOIT the constraint
  Get maximum output from the constraint without adding resources.
  Eliminate waste AT the constraint. Keep it running 100%.

STEP 3: SUBORDINATE everything else to the constraint
  All other processes should operate at the constraint's pace.
  No point producing faster upstream if the bottleneck cannot handle it.

STEP 4: ELEVATE the constraint
  Add capacity at the constraint (more resources, automation, etc.)

STEP 5: If the constraint has moved, GO BACK TO STEP 1
  Improving one bottleneck creates a new one elsewhere.
  This is an infinite loop of improvement.
```

### Drum-Buffer-Rope (DBR)

Goldratt's scheduling methodology based on TOC:

```
DRUM: The constraint sets the pace for the entire system
      (the "heartbeat" of production)

BUFFER: A time buffer protects the constraint from starvation
        (work arrives at the constraint just before it is needed)

ROPE: A signal from the constraint controls the release of new work
      into the system (prevents overproduction upstream)
```

Application: In software development, if QA is the constraint:
- **Drum:** QA capacity determines how many features can be tested per sprint
- **Buffer:** Features are ready for QA 1 day before testing begins
- **Rope:** Engineering does not start new features if QA queue is full

---

## CMM/CMMI (Capability Maturity Model Integration)

### The Five Maturity Levels

```
LEVEL 5: OPTIMIZING
  Continuous improvement, innovation, cause analysis
  Focus: Preventing defects, optimizing processes

LEVEL 4: QUANTITATIVELY MANAGED
  Processes measured and controlled statistically
  Focus: Predictable performance, SPC

LEVEL 3: DEFINED
  Processes documented and standardized across org
  Focus: Consistency, organizational standards

LEVEL 2: MANAGED
  Processes planned, performed, and controlled per project
  Focus: Project-level discipline

LEVEL 1: INITIAL
  Processes unpredictable, reactive, ad hoc
  Focus: Heroic efforts, fire-fighting
```

### Maturity Assessment

For each process, assess the current level and target the next level:

```
MATURITY ASSESSMENT
+---------------------------+-------+--------+
| Process                   | Current| Target |
+---------------------------+-------+--------+
| Deployment                | L2    | L3     |
| Customer onboarding       | L1    | L2     |
| Incident response         | L3    | L4     |
| Code review               | L3    | L3     |
| Vendor management         | L1    | L2     |
+---------------------------+-------+--------+
```

Improvement rule: advance one level at a time. Jumping from L1 to L4
creates unsustainable change.

---

## Selecting the Right Improvement Method

| Situation | Method | Why |
|-----------|--------|-----|
| Quick, small improvement | PDCA | Simple, fast, iterative |
| Complex, data-intensive problem | DMAIC | Statistical rigor, structured |
| Broad culture of improvement | Kaizen | Engages everyone, daily practice |
| Need to find root cause | 5 Whys + Ishikawa | Systematic cause identification |
| Identifying the vital few causes | Pareto | Focus on highest-impact causes |
| Monitoring ongoing stability | SPC (Control charts) | Detects deviations early |
| System-level bottleneck | Theory of Constraints | Focuses on the constraint |
| Organizational maturity | CMMI | Structured capability building |

---

## Process Improvement Anti-Patterns

| Anti-Pattern | Description | Fix |
|-------------|------------|-----|
| Improving non-constraints | Speeding up steps that are not bottlenecks | TOC: identify and improve the constraint |
| No baseline | Improving without measuring first | Measure before you optimize |
| Big bang | Attempting massive change all at once | PDCA: small cycles, pilot first |
| No control plan | Improvement fades back to old ways | SPC: monitor, control, sustain |
| Tool worship | Applying Six Sigma to everything | Match method to problem complexity |
| Improvement fatigue | Too many initiatives simultaneously | Focus on 2-3 improvements at a time |

---

**Process improvement is a scientific discipline, not wishful thinking.
The Operations Brain applies the right method to the right problem,
always measures before and after, and never stops improving. Continuous
improvement is not a project -- it is a way of operating.**
