# Idea Evaluation -- Screening, Scoring, and Selection

## Overview

Generating ideas is only half the innovation challenge. The harder half is evaluating
which ideas to invest in and which to kill. Poor evaluation leads to two catastrophic
errors: killing good ideas too early (Type I error) or investing in bad ideas too long
(Type II error). This module establishes rigorous, bias-aware frameworks for idea
screening, scoring, and portfolio selection.

The goal is not to find the "best" idea -- it is to make smart bets under uncertainty,
kill losers fast, and double down on winners early.

---

## Feasibility-Desirability-Viability (IDEO / d.school)

### The Three Lenses of Innovation

```
                    DESIRABILITY
                    (Do people want it?)
                         /\
                        /  \
                       /    \
                      /  ****\
                     / **    **\
                    /**  SWEET  **\
                   / ** SPOT   ** \
                  /   **      **   \
                 /     **    **     \
                /       ******       \
               /________________________\
    FEASIBILITY                      VIABILITY
    (Can we build it?)               (Can we sustain it?)
```

### Evaluation Criteria

| Lens | Key Questions | Evidence Sources |
|------|--------------|-----------------|
| Desirability | Does it solve a real problem? Is there demand? Will people pay? | User research, surveys, landing page tests, pre-orders |
| Feasibility | Can we build it with available technology? Do we have the skills? | Technical spike, proof of concept, expert assessment |
| Viability | Does the business model work? Unit economics? Scalability? | Financial modeling, market sizing, competitive analysis |

### Scoring Matrix

```
Score each lens 1-5:

Desirability: [1 = no evidence of demand] to [5 = strong validated demand]
Feasibility:  [1 = technology doesn't exist] to [5 = we've built similar before]
Viability:    [1 = no business model] to [5 = proven unit economics]

Minimum threshold: 3 on each lens (no dimension below 3)
Sweet spot: 4+ on all three lenses

Total score = Desirability x Feasibility x Viability
Maximum: 125. Minimum threshold: 27. Target: 64+.
```

### Why Multiplicative (Not Additive)

Additive scoring (D + F + V) allows a score of 5+1+5 = 11, which looks good but
hides the fact that feasibility is near zero. Multiplicative scoring (D x F x V)
gives 5x1x5 = 25, which correctly reflects that a near-zero on any dimension kills
the idea. Innovation requires adequacy across all three dimensions.

---

## Real-Win-Worth (R-W-W) Framework (Day, 2007)

### The Three Questions

Developed by George Day at Wharton, R-W-W provides a rigorous screening framework
used by companies like 3M:

```
IS IT REAL?
  |
  +--> Is the market real?
  |     - Is there a genuine unmet need?
  |     - Can the customer buy? (budget, authority)
  |     - Is the market large enough?
  |     - Will the customer buy? (willing, not just able)
  |
  +--> Is the product real?
        - Is there a clear product concept?
        - Can it be made with available technology?
        - Will the final product satisfy the market?

CAN WE WIN?
  |
  +--> Can the product be competitive?
  |     - Does it have a compelling advantage?
  |     - Can the advantage be sustained?
  |     - How will competitors respond?
  |
  +--> Can our company be competitive?
        - Do we have the right capabilities?
        - Do we have the right management and resources?
        - Can we understand and respond to the market?

IS IT WORTH IT?
  |
  +--> Will the product be profitable?
  |     - Expected vs. required return on investment?
  |     - Are the risks acceptable?
  |
  +--> Does it make strategic sense?
        - Does it align with our strategy?
        - Will management support it?
        - Does it fit our risk tolerance?
```

### R-W-W Traffic Light Scoring

| Rating | Meaning | Action |
|--------|---------|--------|
| Green on all | Real, winnable, worth it | Invest / proceed to next stage |
| Yellow on any | Uncertainty exists | Design experiments to resolve yellow |
| Red on any | Fundamental problem | Kill or redesign from scratch |
| Red + Green mix | Contradictory signals | Investigate -- likely a flawed assumption |

---

## Assumption Mapping

### Identifying Critical Assumptions

Every idea rests on assumptions. The most dangerous are the ones nobody questions:

```
                         HIGH IMPORTANCE
                         (Idea fails if wrong)
                              |
                    +---------+---------+
                    |  CRITICAL         |  IMPORTANT
                    |  ASSUMPTIONS      |  ASSUMPTIONS
                    |                   |
                    |  Test these       |  Test these
                    |  FIRST            |  SECOND
                    |                   |
          LOW ------+---------+---------+------ HIGH
          EVIDENCE  |  WATCH LIST       |  KNOWN FACTS  EVIDENCE
                    |                   |
                    |  Monitor but      |  Don't need
                    |  don't test yet   |  to test
                    |                   |
                    +---------+---------+
                              |
                         LOW IMPORTANCE
                         (Idea works either way)
```

### Assumption Identification Process

```
Step 1: List all assumptions behind the idea
  - Market assumptions ("Customers want X")
  - Technical assumptions ("We can build Y")
  - Business model assumptions ("They'll pay Z")
  - Operational assumptions ("We can scale to N")
  - Competitive assumptions ("No one else is doing this")

Step 2: Rate each assumption
  - Importance: How critical is this to the idea's success? (1-5)
  - Evidence: How much evidence supports this? (1-5)

Step 3: Plot on the assumption map

Step 4: Design experiments for critical assumptions
  (High importance + Low evidence = Riskiest assumption)
```

---

## Riskiest Assumption Identification

### The Riskiest Assumption Test (RAT)

The fastest path to validating or killing an idea is testing the riskiest assumption
first:

```
For each critical assumption:
  |
  v
What is the cheapest, fastest experiment to test this?
  |
  v
What evidence would PROVE this assumption wrong?
  |
  v
What evidence would give us confidence to proceed?
  |
  v
Run the experiment.
  |
  v
Did the assumption hold?
  |
  +--> YES --> Test the next riskiest assumption
  +--> NO --> Can the idea be pivoted?
               |
               +--> YES --> Pivot and re-evaluate assumptions
               +--> NO --> KILL the idea
```

### Common Riskiest Assumptions by Innovation Type

| Innovation Type | Common Riskiest Assumption |
|----------------|--------------------------|
| New product | "Customers actually have this problem" |
| New market | "This market segment exists and is reachable" |
| Business model | "Customers will pay X for this" |
| Platform | "We can attract the first side of the marketplace" |
| Deep tech | "The technology can work at production scale" |
| Process innovation | "The organization will adopt this new process" |

---

## Idea Scoring Matrices

### Weighted Scoring Model

```
| Criterion          | Weight | Idea A | Idea B | Idea C |
|                    |        | Score  | Score  | Score  |
|--------------------|--------|--------|--------|--------|
| Market size        | 0.20   | 4 (0.80)| 3 (0.60)| 5 (1.00)|
| Customer pain      | 0.25   | 5 (1.25)| 4 (1.00)| 3 (0.75)|
| Technical feasibility| 0.15 | 3 (0.45)| 5 (0.75)| 4 (0.60)|
| Competitive advantage| 0.20 | 4 (0.80)| 2 (0.40)| 3 (0.60)|
| Strategic fit      | 0.10   | 5 (0.50)| 4 (0.40)| 4 (0.40)|
| Time to market     | 0.10   | 3 (0.30)| 5 (0.50)| 2 (0.20)|
|                    |        |        |        |        |
| WEIGHTED TOTAL     | 1.00   | 4.10   | 3.65   | 3.55   |
```

### Impact-Effort Matrix

```
              HIGH IMPACT
                  |
    +-------------+-------------+
    |  BIG BETS   | QUICK WINS  |
    |             |             |
    |  High       | High        |
    |  impact,    | impact,     |
    |  high       | low         |
    |  effort     | effort      |
    |             |             |
HIGH+-----------+-+-----------+LOW
EFFORT|           |             |EFFORT
    |  MONEY     | FILL-INS    |
    |  PITS      |             |
    |             |             |
    |  Low        | Low         |
    |  impact,    | impact,     |
    |  high       | low         |
    |  effort     | effort      |
    |             |             |
    +-------------+-------------+
                  |
              LOW IMPACT

Priority: Quick Wins > Big Bets > Fill-ins > Money Pits
```

---

## Stage-Gate Process (Cooper)

### Cooper's Stage-Gate System

Robert Cooper's Stage-Gate process is the most widely used innovation
management system in the world:

```
IDEA --> [Gate 1] --> SCOPE --> [Gate 2] --> BUILD CASE --> [Gate 3] -->
DEVELOP --> [Gate 4] --> TEST --> [Gate 5] --> LAUNCH
```

### Gate Criteria by Stage

| Gate | Key Question | Evidence Required |
|------|-------------|-------------------|
| Gate 1: Idea Screen | Is this worth investigating? | Problem statement, initial market evidence |
| Gate 2: Second Screen | Is there a viable concept? | Preliminary market assessment, technical feasibility |
| Gate 3: Go to Development | Is the business case solid? | Detailed business case, development plan, financial projections |
| Gate 4: Go to Testing | Is the product ready for market testing? | Working product, test plan, marketing plan |
| Gate 5: Go to Launch | Should we launch? | Test market results, launch plan, production readiness |

### Kill Criteria at Each Gate

| Signal | Action |
|--------|--------|
| No customer evidence of the problem | Kill at Gate 1 |
| Technical feasibility cannot be demonstrated | Kill at Gate 2 |
| Unit economics do not work | Kill at Gate 3 |
| Market test results below threshold | Kill at Gate 4 |
| Production/operations cannot scale | Kill at Gate 5 |

---

## Idea Portfolio Visualization

### The Innovation Portfolio Map

```
                    HIGH
                    Strategic
                    Importance
                        |
          +-------------+-------------+
          | STRATEGIC    | STARS       |
          | OPTIONS      |             |
          |              |             |
          | High         | High        |
          | strategic    | strategic   |
          | importance,  | importance, |
          | uncertain    | strong      |
          | feasibility  | feasibility |
          +------+-------+------+------+
                 |               |
          +------+-------+------+------+
          | EXPLORE      | EXPLOIT     |
          |              |             |
          | Low          | Low         |
          | strategic    | strategic   |
          | importance,  | importance, |
          | uncertain    | strong      |
          | feasibility  | feasibility |
          +-------------+-------------+
                        |
                    LOW
                    Strategic         LOW -------- HIGH
                    Importance        Feasibility
```

---

## Cognitive Biases in Idea Evaluation

### Biases That Distort Evaluation

| Bias | Effect on Evaluation | Countermeasure |
|------|---------------------|---------------|
| Confirmation bias | Favor ideas that confirm existing beliefs | Assign devil's advocate; pre-mortem |
| Sunk cost fallacy | Continue investing in failing ideas | Independent review; kill criteria upfront |
| Anchoring | First idea heard gets disproportionate weight | Anonymous submission; randomize presentation order |
| Groupthink | Converge on consensus prematurely | Independent scoring before discussion |
| IKEA effect | Overvalue ideas you helped create | Blind evaluation; external reviewers |
| Status quo bias | Prefer familiar, safe ideas | Explicitly require at least one radical option |
| Availability bias | Favor ideas based on recent/vivid examples | Systematic scoring criteria; data over anecdotes |

---

## Key Takeaways

1. **Multiply, don't add**: Feasibility x Desirability x Viability. Zero on any kills the idea.
2. **Test the riskiest assumption first**: Fastest path to kill or validate.
3. **Stage gates accelerate, not slow down**: They prevent wasted investment.
4. **Bias awareness is essential**: Use structured methods to counteract cognitive distortions.
5. **Kill criteria must be defined upfront**: Before emotional attachment forms.
6. **Portfolio thinking beats project thinking**: Evaluate ideas relative to each other.

---

**References:**
- Day, G.S. (2007). Is it real? Can we win? Is it worth doing? *Harvard Business Review*.
- Cooper, R.G. (2017). *Winning at New Products*. Basic Books.
- Kahneman, D. (2011). *Thinking, Fast and Slow*. Farrar, Straus and Giroux.
- Brown, T. (2009). *Change by Design*. HarperBusiness.
- McGrath, R.G. (2010). Business models: A discovery driven approach. *Long Range Planning*.
- Thomke, S. (2020). *Experimentation Works*. Harvard Business Review Press.
