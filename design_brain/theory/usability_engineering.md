# Usability Engineering

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** cognitive_science.md, hci_foundations.md
> **Related Modules:** design_research_methods.md, accessibility_science.md

---

## 1. Discount Usability Engineering (Nielsen, 1989, 1993)

### 1.1 Philosophy

Jakob Nielsen argued that usability engineering does not require expensive, elaborate methods to be effective. A "discount" approach using cheap, fast techniques applied early and iteratively produces better results than a single expensive study applied late.

**Core Methods:**
1. **Scenarios** (use cases describing typical tasks)
2. **Simplified thinking aloud** (users verbalize thoughts during tasks)
3. **Heuristic evaluation** (experts inspect against principles)

### 1.2 The "5 Users" Finding

Nielsen & Landauer (1993) demonstrated that the proportion of usability problems found by n evaluators follows:

```
Problems Found(n) = N * (1 - (1 - L)^n)
```

Where:
- **N** = total number of usability problems
- **L** = proportion found by a single evaluator (typically ~31%)
- **n** = number of evaluators/users

With L = 0.31:
- 1 user finds ~31% of problems
- 3 users find ~65%
- 5 users find ~85%
- 10 users find ~95%

**Implication:** Five users per study, conducted iteratively across multiple rounds, is more cost-effective than one large study with many users. The first few participants reveal the most severe problems; additional participants produce diminishing returns.

**Caveat:** The 5-user recommendation assumes a relatively homogeneous user population. If the product has distinct user segments with different tasks and expertise levels, 5 users per segment are needed.

---

## 2. Heuristic Evaluation

### 2.1 Nielsen's 10 Usability Heuristics (1994)

| # | Heuristic | Description |
|---|---|---|
| 1 | **Visibility of system status** | Keep users informed through appropriate feedback within reasonable time |
| 2 | **Match between system and real world** | Use language, concepts, and conventions familiar to the user |
| 3 | **User control and freedom** | Provide undo, redo, and clear exits from unwanted states |
| 4 | **Consistency and standards** | Follow platform conventions; same words/actions mean the same thing |
| 5 | **Error prevention** | Eliminate error-prone conditions or check for them before commitment |
| 6 | **Recognition rather than recall** | Make objects, actions, and options visible; minimize memory load |
| 7 | **Flexibility and efficiency of use** | Provide accelerators for experts that do not burden novices |
| 8 | **Aesthetic and minimalist design** | Dialogues should not contain irrelevant or rarely needed information |
| 9 | **Help users recognize, diagnose, and recover from errors** | Error messages in plain language, indicate problem, suggest solution |
| 10 | **Help and documentation** | Provide help that is easy to search, focused on the task, and concise |

### 2.2 Formal Method

**Process:**
1. Each evaluator independently inspects the interface against the heuristics
2. Each evaluator produces a list of violations with:
   - Location in the interface
   - Which heuristic(s) are violated
   - Severity rating
   - Description of the problem
   - Recommended fix (optional)
3. After independent evaluation, evaluators consolidate findings
4. The combined list is deduplicated and severity-rated

**Optimal Number of Evaluators:** 3-5 experts. Fewer misses too many problems (evaluator effect). More has diminishing returns.

### 2.3 Severity Ratings (Nielsen, 1995)

| Rating | Label | Description | Action |
|---|---|---|---|
| 0 | Not a problem | Disagree it is a usability problem | No action |
| 1 | Cosmetic | Need not be fixed unless extra time | Lowest priority |
| 2 | Minor | Fixing should be given low priority | Fix if time allows |
| 3 | Major | Important to fix, high priority | Must fix before release |
| 4 | Catastrophe | Imperative to fix before release | Blocks release |

### 2.4 The Evaluator Effect (Hertzum & Jacobsen, 2001)

**Problem:** Different evaluators identify substantially different sets of usability problems from the same interface. Hertzum & Jacobsen found that any single evaluator detects only ~20-51% of problems, and the overlap between evaluators is low.

**Implications:**
- No single evaluator's assessment is complete
- Multiple evaluators are essential for coverage
- Heuristic evaluation is best used for identifying major, obvious problems -- not as a comprehensive evaluation method
- Combining heuristic evaluation with user testing compensates for the evaluator effect

---

## 3. Cognitive Walkthrough (Lewis & Wharton, 1997; Wharton et al., 1994)

### 3.1 Theory

The cognitive walkthrough is an inspection method specifically designed to evaluate learnability -- how easily a new user can accomplish tasks through exploration (without instruction).

It is based on the CE+ model (Polson & Lewis, 1990), a cognitive model of exploratory learning that predicts whether users will:
1. Choose the correct action at each step
2. Recognize that the correct action is available
3. Connect the action to the goal

### 3.2 Method

**Inputs Required:**
1. Detailed description of the interface (prototype or specification)
2. Task scenarios with defined user goals
3. The correct action sequence for each task
4. User profile (knowledge, experience, domain familiarity)

**At Each Step, Evaluators Ask:**

| Question | Evaluating |
|---|---|
| **Q1:** Will the user try to achieve the right effect? | Goal formation |
| **Q2:** Will the user notice the correct action is available? | Action visibility |
| **Q3:** Will the user associate the correct action with the desired effect? | Label/affordance mapping |
| **Q4:** If the correct action is performed, will the user see progress toward the goal? | Feedback adequacy |

A "no" answer to any question at any step constitutes a usability problem.

### 3.3 Strengths and Limitations

**Strengths:**
- Focuses specifically on learnability (first-time use)
- Can be done early (on wireframes, prototypes, or specifications)
- Provides specific, actionable findings tied to individual interaction steps
- Grounded in cognitive theory (not just expert opinion)

**Limitations:**
- Evaluates only one task path at a time (time-consuming for complex interfaces)
- Only evaluates learnability (not efficiency, satisfaction, or expert performance)
- Requires correct action sequences to be defined in advance
- Does not capture emotional response or subjective satisfaction

---

## 4. RITE Method (Rapid Iterative Testing and Evaluation)

### 4.1 Method (Medlock et al., 2002)

RITE is a usability testing method that emphasizes rapid iteration over comprehensive evaluation:

**Process:**
1. Test with 1-3 participants
2. Identify problems
3. Fix problems immediately (same day or next day)
4. Test the fixed design with the next 1-3 participants
5. Repeat until the design stabilizes

### 4.2 Decision Framework

After each participant, categorize each problem:

| Category | Action | Criteria |
|---|---|---|
| **Fix immediately** | Change before next participant | Clear problem, clear fix, low implementation cost |
| **Fix after round** | Change after current round completes | Problem clear, fix uncertain, need more data |
| **Defer** | Track but do not fix yet | Unclear if it is a real problem, or fix is expensive |
| **Not a problem** | Discard | Evaluator/participant anomaly |

### 4.3 When to Use RITE

- **Early development** when the design is still fluid and rapid change is possible
- **Agile sprints** where testing and iteration must fit within sprint cadence
- **When time and budget are limited** and a single comprehensive study is not feasible
- **When the design space is uncertain** and rapid exploration is more valuable than rigorous measurement

---

## 5. System Usability Scale (SUS) (Brooke, 1996)

### 5.1 The Instrument

SUS is a 10-item Likert-scale questionnaire yielding a single composite score from 0 to 100. It is the most widely used standardized usability questionnaire.

**Items (alternating positive/negative):**
1. I think that I would like to use this system frequently
2. I found the system unnecessarily complex
3. I thought the system was easy to use
4. I think that I would need the support of a technical person to be able to use this system
5. I found the various functions in this system were well integrated
6. I thought there was too much inconsistency in this system
7. I would imagine that most people would learn to use this system very quickly
8. I found the system very cumbersome to use
9. I felt very confident using the system
10. I needed to learn a lot of things before I could get going with this system

### 5.2 Scoring

1. For odd-numbered items (positive): score = response - 1
2. For even-numbered items (negative): score = 5 - response
3. Sum all adjusted scores
4. Multiply by 2.5 to get a score out of 100

### 5.3 Psychometric Properties

**Reliability:** Cronbach's alpha typically > 0.90 (excellent internal consistency; Bangor et al., 2008).

**Factor Structure:** Despite being designed as unidimensional, factor analysis reveals two sub-factors:
- **Usability** (items 1, 2, 3, 5, 6, 7, 8, 9): Traditional usability
- **Learnability** (items 4, 10): Learning difficulty

(Lewis & Sauro, 2009)

**Normative Data (Bangor et al., 2008; Sauro, 2011):**

| SUS Score | Percentile | Grade | Adjective |
|---|---|---|---|
| 84.1+ | 96th | A+ | Best Imaginable |
| 80.8 | 90th | A | Excellent |
| 71.4 | 65th | C | Good |
| 68.0 | 50th | C- | OK |
| 51.7 | 15th | F | Poor |
| < 25 | < 1st | F | Worst Imaginable |

**Mean SUS score across 500+ studies: 68.0** (Sauro, 2011). This serves as the industry benchmark.

### 5.4 Minimum Sample Size

SUS is reliable with as few as 8-12 participants for comparing two designs. For absolute score interpretation (grade assignment), 12-14 participants provide stable estimates (Tullis & Stetson, 2004).

---

## 6. User Experience Questionnaire (UEQ) (Laugwitz et al., 2008)

### 6.1 Instrument

The UEQ is a 26-item semantic differential questionnaire measuring six dimensions of UX:

| Scale | Items | Example Pair | Dimension Type |
|---|---|---|---|
| **Attractiveness** | 6 | unpleasant/pleasant | Overall impression |
| **Perspicuity** | 4 | not understandable/understandable | Pragmatic |
| **Efficiency** | 4 | slow/fast | Pragmatic |
| **Dependability** | 4 | unpredictable/predictable | Pragmatic |
| **Stimulation** | 4 | boring/exciting | Hedonic |
| **Novelty** | 4 | conventional/inventive | Hedonic |

### 6.2 Scoring and Benchmarks

Items are rated on a 7-point scale (-3 to +3). Scale scores are the mean of their items.

**Benchmark Categories (from 20,000+ dataset):**
- **Excellent:** Top 10% of results
- **Good:** Top 25%, above 75th percentile
- **Above Average:** Above 50th percentile
- **Below Average:** Below 50th percentile
- **Bad:** Bottom 25%

### 6.3 Pragmatic vs. Hedonic Quality

The UEQ's structure reflects Hassenzahl's model (see emotional_design.md):
- **Pragmatic quality** (Perspicuity + Efficiency + Dependability): Task-oriented, instrumental, "is it usable?"
- **Hedonic quality** (Stimulation + Novelty): Experience-oriented, non-instrumental, "is it enjoyable?"

---

## 7. NASA-TLX (Task Load Index) (Hart & Staveland, 1988)

### 7.1 Purpose

NASA-TLX is a multidimensional workload assessment tool originally developed for aviation but widely used in HCI to measure subjective cognitive load during interaction.

### 7.2 Dimensions

| Dimension | Description | Scale |
|---|---|---|
| **Mental Demand** | How much mental and perceptual activity was required? | Low -- High |
| **Physical Demand** | How much physical activity was required? | Low -- High |
| **Temporal Demand** | How much time pressure did you feel? | Low -- High |
| **Performance** | How successful were you in accomplishing what you were asked to do? | Perfect -- Failure |
| **Effort** | How hard did you have to work (mentally and physically)? | Low -- High |
| **Frustration** | How insecure, discouraged, irritated, stressed, and annoyed were you? | Low -- High |

### 7.3 Scoring Methods

**Raw TLX:** Simple unweighted average of the six dimensions. Faster to administer, and Hart (2006) showed it produces results comparable to weighted TLX in most cases.

**Weighted TLX (Original):** A pairwise comparison procedure determines the relative importance of each dimension for the specific task. Each dimension is weighted by its relative importance before averaging. Adds approximately 5 minutes of administration time.

### 7.4 Design Application

NASA-TLX is particularly useful for:
- Comparing cognitive load between alternative interface designs
- Identifying which dimensions of workload are most affected by design changes
- Establishing that a new design reduces mental demand (not just changes task completion time)
- Evaluating complex, multi-step workflows where task time alone is insufficient

---

## 8. ISO 9241 Usability Framework

### 8.1 ISO 9241-11:2018 Definition of Usability

**Usability:** The extent to which a system, product, or service can be used by specified users to achieve specified goals with effectiveness, efficiency, and satisfaction in a specified context of use.

**Components:**

| Component | Definition | Typical Metrics |
|---|---|---|
| **Effectiveness** | Accuracy and completeness with which users achieve goals | Task success rate, error rate, completeness |
| **Efficiency** | Resources expended in relation to accuracy and completeness | Time on task, clicks/steps, learning time |
| **Satisfaction** | Extent to which user needs are satisfied | SUS, UEQ, NPS, post-task ratings |

### 8.2 Context of Use

Usability is not an intrinsic property of the system -- it is a property of the system-in-context. Context of use includes:
- **Users:** Knowledge, skills, experience, education, training, physical attributes, capabilities
- **Goals:** Primary goals, secondary goals, goal hierarchy
- **Tasks:** Task structure, task frequency, task duration, task criticality
- **Resources:** Hardware, software, materials, physical environment, social environment

### 8.3 ISO 9241-210:2019 Human-Centred Design

Defines the iterative HCD process:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  1. Understand and specify the context of use           │
│      │                                                  │
│      ▼                                                  │
│  2. Specify the user requirements                       │
│      │                                                  │
│      ▼                                                  │
│  3. Produce design solutions                            │
│      │                                                  │
│      ▼                                                  │
│  4. Evaluate designs against requirements    ──────┐    │
│                                                    │    │
│      (iterate until requirements met) ◄────────────┘    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 8.4 Related Standards

| Standard | Focus |
|---|---|
| **ISO 9241-110** | Interaction principles (dialogue principles) |
| **ISO 9241-112** | Principles for the presentation of information |
| **ISO 9241-125** | Guidance on visual presentation of information |
| **ISO 9241-171** | Guidance on software accessibility |
| **ISO 25010** | Systems and software quality model (SQuaRE) |

---

## 9. UMUX-LITE (Lewis et al., 2013)

### 9.1 Instrument

UMUX-LITE is an ultra-short (2-item) usability metric:

1. "[System name]'s capabilities meet my requirements." (7-point Likert)
2. "[System name] is easy to use." (7-point Likert)

### 9.2 Scoring

Score = ((Mean of two items - 1) / 6) * 100

This produces a score on a 0-100 scale comparable to SUS.

### 9.3 Psychometric Properties

- Concurrent validity with SUS: r = 0.82 (Lewis et al., 2013)
- Acceptable reliability despite only 2 items (leveraging the high reliability of the underlying constructs)
- Useful when survey length is severely constrained (e.g., in-product feedback, post-task surveys)

### 9.4 When to Use

- Continuous in-product measurement (low respondent burden)
- Post-task quick assessment
- Benchmarking over time when full SUS is impractical
- NOT as a replacement for SUS in formal studies where statistical power matters

---

## 10. Comparative Framework: Selecting a Method

### 10.1 Method Selection Matrix

| Method | Type | Evaluators | Finds | Best For |
|---|---|---|---|---|
| **Heuristic Evaluation** | Inspection | 3-5 experts | Heuristic violations | Quick expert review, early development |
| **Cognitive Walkthrough** | Inspection | 1-3 experts | Learnability problems | New user first-run evaluation |
| **Usability Testing** | Empirical | 5+ users | Actual user behavior | Validating designs with real users |
| **RITE** | Empirical + Iterative | 1-3 per round | Critical problems | Rapid design iteration |
| **SUS** | Questionnaire | 8-12+ users | Overall usability perception | Benchmarking, comparison |
| **UEQ** | Questionnaire | 20+ users | Six UX dimensions | Detailed UX profiling |
| **NASA-TLX** | Questionnaire | 5+ users | Workload dimensions | Complex task evaluation |
| **UMUX-LITE** | Questionnaire | Ongoing users | Quick usability signal | Continuous measurement |

### 10.2 Combining Methods

No single method is comprehensive. Best practice combines:
1. **Inspection methods** (heuristic evaluation, cognitive walkthrough) early in design
2. **Empirical testing** (usability testing, RITE) with prototypes
3. **Questionnaires** (SUS, UEQ) for standardized measurement
4. **Analytics** (task success, time on task, error rate) in production

---

## References

- Bangor, A., Kortum, P. T., & Miller, J. T. (2008). An empirical evaluation of the System Usability Scale. International Journal of Human-Computer Interaction, 24(6), 574-594.
- Brooke, J. (1996). SUS: A quick and dirty usability scale. In P. W. Jordan et al. (Eds.), Usability Evaluation in Industry. Taylor & Francis.
- Hart, S. G., & Staveland, L. E. (1988). Development of NASA-TLX. In P. A. Hancock & N. Meshkati (Eds.), Human Mental Workload. North-Holland.
- Hertzum, M., & Jacobsen, N. E. (2001). The evaluator effect: A chilling fact about usability evaluation methods. International Journal of Human-Computer Studies, 55(4), 421-443.
- Lewis, J. R., & Sauro, J. (2009). The factor structure of the System Usability Scale. In M. Kurosu (Ed.), Human Centered Design. Springer.
- Lewis, J. R., Utesch, B. S., & Maher, D. E. (2013). UMUX-LITE. International Journal of Human-Computer Interaction, 29(10), 551-560.
- Nielsen, J. (1993). Usability Engineering. Academic Press.
- Nielsen, J. (1994). Heuristic evaluation. In J. Nielsen & R. L. Mack (Eds.), Usability Inspection Methods. John Wiley.
- Wharton, C., Rieman, J., Lewis, C., & Polson, P. (1994). The cognitive walkthrough method: A practitioner's guide. In J. Nielsen & R. L. Mack (Eds.), Usability Inspection Methods. John Wiley.
