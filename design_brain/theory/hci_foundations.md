# HCI Foundations

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** cognitive_science.md
> **Related Modules:** interaction_design_theory.md, usability_engineering.md

---

## 1. Fitts' Law (1954)

### 1.1 Original Formulation

Paul Fitts established that the time to acquire a target is a function of the distance to the target and the size of the target.

**Shannon Formulation (MacKenzie, 1992):**

```
MT = a + b * log2(D/W + 1)
```

Where:
- **MT** = Movement Time (ms)
- **a** = Intercept (device-dependent start/stop time, typically 50-200ms)
- **b** = Slope (1/throughput, typically 100-200 ms/bit)
- **D** = Distance from starting position to center of target
- **W** = Width of the target along the axis of movement
- **log2(D/W + 1)** = Index of Difficulty (ID), measured in bits

### 1.2 Index of Difficulty (ID)

```
ID = log2(D/W + 1)    [bits]
```

The ID quantifies the precision demand of the pointing task. Higher ID means harder targets. Typical ID values for interface targets range from 1 to 7 bits.

### 1.3 Throughput (TP)

```
TP = ID_e / MT    [bits/second]
```

Where ID_e is the effective index of difficulty computed from observed endpoint distributions. Throughput is the primary performance metric in ISO 9241-411 for comparing input devices. Typical mouse throughput: 3.7-4.9 bits/s. Typical touchscreen throughput: 5.0-7.0 bits/s.

### 1.4 Design Implications

- **Larger targets are faster to acquire.** Minimum touch target: 44x44pt (Apple), 48x48dp (Material Design). These are empirically derived, not arbitrary.
- **Closer targets are faster to acquire.** Place frequently used controls near the current cursor/finger position. Contextual menus, inline actions, and proximity-based toolbars exploit this.
- **Edge and corner targets have effectively infinite width** along the edge axis (the screen boundary "catches" the cursor). This is why OS menus are placed at screen edges.
- **The Fitts' Law tradeoff:** Making targets larger reduces ID but consumes screen real estate. Optimal design balances target size against information density.

### 1.5 Extensions

- **Two-dimensional Fitts' Law:** For 2D targets, W is typically the smaller dimension (width constraining approach axis). Accot & Zhai (2003) provided a bivariate formulation.
- **Finger-based interaction:** Fitts' Law holds for touchscreens but with different a and b coefficients and a "fat finger" problem where the finger occludes the target.

---

## 2. Hick's Law (Hick, 1952; Hyman, 1953)

### 2.1 Information-Theoretic Basis

Hick's Law is grounded in Shannon's information theory. Choice reaction time (CRT) increases logarithmically with the number of equally probable alternatives.

**Formulation:**

```
RT = a + b * log2(n + 1)
```

Where:
- **RT** = Reaction (choice) time
- **a** = Simple reaction time (non-choice baseline, ~200ms)
- **b** = Slope (~150ms/bit, but varies with stimulus-response compatibility)
- **n** = Number of equally probable alternatives
- **log2(n + 1)** = Information transmitted (bits); the +1 accounts for the uncertainty about whether any stimulus will occur

### 2.2 Conditions and Limitations

Hick's Law applies specifically when:
- Alternatives are **equally probable** (unequal probability changes the equation to entropy-based: H = -Sum(p_i * log2(p_i)))
- Stimulus-response mapping is **well-learned** (novel mappings have different slopes)
- The task is a **choice reaction** (not simple reaction or complex problem-solving)

Hick's Law does **not** apply to:
- Scanning a menu for a known target (that is a visual search task governed by set-size effects and target salience, not Hick's Law)
- Deeply hierarchical menus where items are categorized (Landauer & Nachbar, 1985 showed log depth menus are faster)

### 2.3 Design Implications

- **Reduce alternatives per decision point.** Break complex choices into sequential binary or small-set decisions (wizards, progressive disclosure).
- **Use categorization.** Hierarchical menus (where users know the category) can be faster than flat menus (Kiger, 1984).
- **Highlight probable choices.** Making likely options more salient effectively reduces the decision set. Smart defaults exploit this.
- **Avoid applying Hick's Law to visual search.** Adding more items to a well-organized menu does not necessarily slow selection if the user can visually locate the target efficiently.

---

## 3. Steering Law (Accot & Zhai, 1997, 2003)

### 3.1 Formulation

The Steering Law governs the time to navigate through a constrained path (tunnel), such as a cascading menu, a scrollbar track, or a slider.

**For a straight tunnel:**

```
T = a + b * (A / W)
```

Where:
- **T** = Movement time
- **A** = Amplitude (path length)
- **W** = Width of the tunnel (perpendicular to movement direction)
- **a, b** = Empirical constants

**For a curved tunnel:**

```
T = a + b * integral(ds / W(s))
```

Where the integral is taken along the path and W(s) is the local tunnel width at position s.

### 3.2 Key Distinction from Fitts' Law

Fitts' Law governs discrete pointing (acquiring a target). The Steering Law governs continuous constrained movement (staying within a path). The Steering Law has a **linear** relationship with A/W, whereas Fitts' Law has a **logarithmic** relationship with D/W. This means path-constrained movement is disproportionately harder than point-and-click.

### 3.3 Design Implications

- **Cascading menus are slow** because they require steering through a narrow tunnel. Mega-menus (expanding in place) eliminate the steering constraint.
- **Wider tunnels are faster.** Slider tracks, scrollbar gutters, and nested menu paths should be as wide as practical.
- **Minimize path length.** Shorter steering paths reduce movement time linearly.
- **Avoid long, narrow interaction corridors.** Ribbon interfaces, narrow sidebars with interactive elements, and thin scrollbar handles all impose steering costs.

---

## 4. Norman's Seven Stages of Action (1988, 2013)

### 4.1 The Model

Don Norman proposed that human action follows a cyclic process with seven stages divided across two "gulfs":

```
         ┌──────────────────────────────────────┐
         │              GOAL                     │
         └───────┬──────────────────────┬────────┘
                 │                      │
    Gulf of Execution               Gulf of Evaluation
                 │                      │
         ┌───────▼──────┐       ┌───────▼──────┐
         │  1. Goal      │       │ 7. Goal met? │
         │  2. Plan      │       │ 6. Interpret │
         │  3. Specify   │       │ 5. Perceive  │
         │  4. Execute   │       │    outcome   │
         └───────┬──────┘       └───────▲──────┘
                 │                      │
                 └──────► WORLD ────────┘
```

**Execution Side (Gulf of Execution):**
1. **Goal** -- Form the intention
2. **Plan** -- Determine the action sequence
3. **Specify** -- Translate plan into specific actions on available controls
4. **Execute** -- Physically perform the actions

**Evaluation Side (Gulf of Evaluation):**
5. **Perceive** -- Observe the state of the world/system
6. **Interpret** -- Make sense of the observed state
7. **Evaluate** -- Compare interpreted state with the goal

### 4.2 Gulf of Execution

**Definition:** The gap between the user's intention and the available actions in the system. A wide gulf means the user cannot figure out how to make the system do what they want.

**Bridged by:** Affordances, signifiers, clear labeling, visible controls, mapping between controls and effects, constraints that prevent invalid actions.

### 4.3 Gulf of Evaluation

**Definition:** The gap between the system's actual state and the user's perception/understanding of that state. A wide gulf means the user cannot tell what happened or what state the system is in.

**Bridged by:** Feedback, status indicators, state visibility, meaningful error messages, progress indicators, undo capability.

### 4.4 Design Application

Every interaction should be analyzed through both gulfs:
- Can the user figure out what to do? (Execution)
- Can the user tell what happened? (Evaluation)
- If either gulf is wide, the design has a usability problem.

---

## 5. GOMS Model (Card, Moran, & Newell, 1983)

### 5.1 Components

**Goals:** What the user wants to accomplish. Goals decompose hierarchically into subgoals.

**Operators:** Elementary perceptual, motor, or cognitive acts.
- Perceptual: Perceive a visual stimulus (~100ms)
- Cognitive: Make a decision, recall from memory (~70ms for simple)
- Motor: Keystroke, mouse click, pointing movement (governed by Fitts' Law)

**Methods:** Learned sequences of operators that accomplish a goal. Multiple methods may exist for the same goal.

**Selection Rules:** Rules that determine which method to use when alternatives exist. Typically based on context, user expertise, and efficiency.

### 5.2 Variants

| Variant | Focus | Use Case |
|---|---|---|
| **CMN-GOMS** | Hierarchical goal decomposition | Conceptual task analysis |
| **KLM-GOMS** | Execution time prediction | Comparing interface designs |
| **NGOMSL** | Procedural description, learning time | Training time estimation |
| **CPM-GOMS** | Parallel processing, critical path | Expert performance modeling |

### 5.3 Limitations

- Models expert, error-free behavior (no novice errors, exploration, or recovery)
- Assumes deterministic task completion (no variability in user approach)
- Does not model satisfaction, frustration, or emotional state
- Best suited for routine, procedural tasks (not creative or exploratory tasks)

---

## 6. Keystroke-Level Model (KLM) (Card, Moran, & Newell, 1980)

### 6.1 Operators and Standard Times

| Operator | Description | Standard Time |
|---|---|---|
| **K** | Keystroke (press and release a key) | 0.20s (average typist) |
| **P** | Point (move cursor to target) | 1.10s (Fitts' Law derived) |
| **B** | Button press (click mouse button) | 0.10s |
| **H** | Home (move hand between keyboard and mouse) | 0.40s |
| **M** | Mental preparation (decision, memory retrieval) | 1.35s |
| **R** | System response (waiting for system) | Variable |
| **D(nD, lD)** | Draw nD line segments of length lD | Variable |

### 6.2 Mental Operator (M) Placement Rules

Heuristic rules for placing M operators (Card et al., 1980):
1. Insert M before all K and P operators that initiate a cognitive unit
2. Delete M if the preceding operator is fully anticipated
3. Delete M if the operator is part of a well-practiced string (e.g., typing a known word)

### 6.3 Prediction Accuracy

KLM predicts expert task completion times with approximately 20% accuracy, which is sufficient for comparing competing designs. The primary value is relative comparison, not absolute prediction.

### 6.4 Design Application

```
Example: "Save file using File > Save"

H[mouse]     0.40s    Move hand to mouse
P[File]      1.10s    Point to File menu
B[click]     0.10s    Click to open
P[Save]      1.10s    Point to Save option
B[click]     0.10s    Click Save
Total:       2.80s

Example: "Save file using Ctrl+S"

M            1.35s    Mentally prepare
K[Ctrl]      0.20s    Press Ctrl
K[S]         0.20s    Press S
Total:       1.75s

Keyboard shortcut is 1.05s faster (37% improvement).
```

---

## 7. ACT-R Architecture (Anderson, 1993, 2007)

### 7.1 Overview

Adaptive Control of Thought-Rational (ACT-R) is a cognitive architecture -- a unified computational theory of human cognition. It models cognition as the interaction of modular processing systems.

### 7.2 Module Structure

```
┌─────────────────────────────────────────────┐
│              Central Production System        │
│         (condition-action rules, ~50ms/cycle) │
└──┬──────┬──────┬──────┬──────┬──────┬───────┘
   │      │      │      │      │      │
   ▼      ▼      ▼      ▼      ▼      ▼
Visual  Aural  Motor  Declar  Goal   Imaginal
Module  Module Module ative   Module  Module
                      Memory
```

**Key Modules:**
- **Declarative Memory:** Stores factual knowledge as chunks with activation levels. Retrieval probability and speed depend on activation, which follows a power-law decay function.
- **Procedural Memory:** Stores production rules (if-then conditions). Only one production can fire per ~50ms cycle.
- **Visual Module:** Processes visual input with attention shift (~85ms) and encoding (~185ms) stages.
- **Motor Module:** Generates keypresses (~250ms) and mouse movements (Fitts' Law timing).

### 7.3 Relevance to HCI

ACT-R has been used to build computational models of interface use that predict:
- Task completion time (accounting for both motor and cognitive processing)
- Error rates (production rule conflicts, activation-based retrieval failures)
- Learning curves (production compilation, activation strengthening)
- Menu search strategies (visual search + memory-based selection)

---

## 8. Distributed Cognition (Hutchins, 1995)

### 8.1 Core Theory

Edwin Hutchins argued that cognition is not confined to individual minds but distributed across:
- **People** (social distribution -- team coordination, shared understanding)
- **Artifacts** (material distribution -- tools, interfaces, documents)
- **Time** (temporal distribution -- prior experience, cultural practices, institutional memory)

### 8.2 The Cognitive System Unit of Analysis

In distributed cognition, the unit of analysis is not the individual but the entire cognitive system (person + tools + environment + other people). The cockpit of an airplane, not the pilot alone, "remembers" its speed via instruments, checklists, and crew coordination.

### 8.3 Implications for Interface Design

**Representational Formats:** The way information is represented in an interface determines the cognitive work required. A bar chart and a data table contain the same information but distribute computation differently -- the chart pre-computes visual comparisons.

**Coordination Mechanisms:** Interfaces serve as coordination artifacts in collaborative work. Shared dashboards, real-time collaboration features, and status indicators support distributed cognition across teams.

**Cognitive Offloading:** Interfaces should accept cognitive work that humans find difficult (remembering state, tracking progress, computing aggregations) and represent it externally. Breadcrumbs offload navigation memory. Progress bars offload task-state tracking.

### 8.4 Representational Analysis

Hutchins introduced the concept of "representational state transformations" -- the movement of information through different representational media as a task is accomplished. Analyzing these transformations reveals where cognitive work is happening and where interface design can reduce unnecessary transformations.

---

## 9. Power Law of Practice (Newell & Rosenbloom, 1981)

### 9.1 Formulation

```
T_n = T_1 * n^(-alpha)
```

Where:
- **T_n** = Time to perform the task on the nth trial
- **T_1** = Time on the first trial
- **n** = Trial number (practice amount)
- **alpha** = Learning rate parameter (typically 0.2-0.6)

Performance improves as a power function of practice. The rate of improvement slows as expertise increases -- the largest gains are early.

### 9.2 Design Implications

- **Novice performance is dramatically slower than expert performance.** The first use may take 5-10x longer than the 100th use.
- **Design for both ends of the learning curve.** Progressive disclosure, training wheels, and shortcuts for experts.
- **Allow acceleration.** Keyboard shortcuts, command palettes, and batch operations let experienced users bypass novice-friendly but slow interaction paths.
- **Expertise does not plateau suddenly** -- it continues to improve gradually. Interfaces should not impose performance ceilings that prevent expert optimization.

---

## 10. Information Processing Model (Card, Moran, & Newell, 1983)

### 10.1 Model Human Processor (MHP)

The MHP models human cognition as three interacting subsystems, each with storage (memory) and processing capabilities:

| Subsystem | Cycle Time | Memory Capacity | Memory Decay |
|---|---|---|---|
| Perceptual | ~100ms | 17 items (visual) | ~200ms |
| Cognitive | ~70ms | 7 chunks (WM) | ~7s (without rehearsal) |
| Motor | ~70ms | -- | -- |

### 10.2 Design Application

The MHP provides a framework for calculating minimum interaction times:
- Minimum perception time for a visual stimulus: ~100ms
- Minimum cognitive processing per decision: ~70ms
- Minimum motor execution per action: ~70ms
- Total minimum for a perceive-decide-act cycle: ~240ms

Interfaces that require faster responses than these minimums will produce errors. Animation durations, timeout periods, and interaction timing should respect these physiological constraints.

---

## 11. Synthesis: Selecting the Right Model

| Question | Appropriate Model |
|---|---|
| How long will this task take? | KLM, GOMS |
| Is this target big enough? | Fitts' Law |
| Are there too many options? | Hick's Law |
| Is this navigation path usable? | Steering Law |
| Can the user figure this out? | Norman's 7 stages |
| How does expertise develop? | Power Law of Practice, ACT-R |
| Where is cognition happening? | Distributed Cognition |
| Is the team coordinated? | Distributed Cognition |

---

## References

- Accot, J., & Zhai, S. (1997). Beyond Fitts' law: Models for trajectory-based HCI tasks. CHI '97 Proceedings, 295-302.
- Anderson, J. R. (2007). How Can the Human Mind Occur in the Physical Universe? Oxford University Press.
- Card, S. K., Moran, T. P., & Newell, A. (1983). The Psychology of Human-Computer Interaction. Erlbaum.
- Fitts, P. M. (1954). The information capacity of the human motor system. Journal of Experimental Psychology, 47(6), 381-391.
- Hick, W. E. (1952). On the rate of gain of information. Quarterly Journal of Experimental Psychology, 4(1), 11-26.
- Hutchins, E. (1995). Cognition in the Wild. MIT Press.
- MacKenzie, I. S. (1992). Fitts' law as a research and design tool in human-computer interaction. Human-Computer Interaction, 7(1), 91-139.
- Norman, D. A. (2013). The Design of Everyday Things: Revised and Expanded Edition. Basic Books.
