# Product Strategy — Formal Frameworks

## What This Enables

**Decisions it helps make:**
- How to structure product organizations and decision-making
- How to discover opportunities systematically
- How to measure and achieve product-market fit
- How to categorize and prioritize features

---

## 1. The Cagan Product Model

*Citation: Cagan, M. (2018). Inspired: How to Create Tech Products Customers Love (2nd ed.). Wiley.*

### 1.1 Empowered Product Teams

| Dimension | Feature Teams (Anti-pattern) | Empowered Product Teams |
|-----------|---------------------------|----------------------|
| Input | Roadmap of features | Problems to solve |
| Authority | Build what's specified | Discover and deliver solutions |
| Accountability | Output (shipped features) | Outcome (business results) |
| Composition | Developers | PM + Designer + Engineers |
| Discovery | Minimal | Continuous |

### 1.2 Product Discovery

Dual-track development: Discovery (find what to build) runs in parallel with Delivery (build it).

**Discovery questions:**
1. **Valuable:** Will customers buy/use this?
2. **Usable:** Can customers figure out how to use it?
3. **Feasible:** Can we build it with available technology and resources?
4. **Viable:** Does it work for the business (legal, financial, operational)?

### 1.3 Four Big Risks

Every product idea carries four risks that must be addressed before committing to build:

1. **Value risk:** Do customers want this? (Test with prototypes, interviews)
2. **Usability risk:** Can they figure it out? (Test with usability studies)
3. **Feasibility risk:** Can we build it? (Test with technical spikes)
4. **Business viability risk:** Does it work for us? (Test with stakeholder alignment)

---

## 2. Opportunity Solution Trees

*Citation: Torres, T. (2021). Continuous Discovery Habits. Product Talk LLC.*

### 2.1 The Framework

```
Desired Outcome (business metric)
├── Opportunity 1 (customer need/pain)
│   ├── Solution A
│   │   ├── Experiment 1
│   │   └── Experiment 2
│   └── Solution B
│       └── Experiment 3
├── Opportunity 2
│   ├── Solution C
│   └── Solution D
└── Opportunity 3
    └── Solution E
```

### 2.2 Principles

1. **Start with outcomes, not outputs:** Define the business metric to move
2. **Map the opportunity space:** Discover customer needs through interviews and data
3. **Consider multiple solutions:** Avoid falling in love with the first idea
4. **Test assumptions, not ideas:** Identify the riskiest assumptions and test them first
5. **Iterate weekly:** Continuous discovery, not quarterly planning

### 2.3 Prioritizing Opportunities

| Criterion | Question |
|-----------|----------|
| Market size | How many customers face this problem? |
| Frequency | How often do they face it? |
| Intensity | How painful is it? |
| Willingness to pay | Would they pay to solve it? |
| Strategic fit | Does it align with our vision and capabilities? |

---

## 3. Jobs to Be Done (JTBD) — Detailed Framework

### 3.1 Christensen's JTBD Theory

*Citation: Christensen, C. M., Hall, T., Dillon, K., & Duncan, D. S. (2016). Competing Against Luck. Harper Business.*

Customers don't buy products — they "hire" them to do a job. Understanding the job unlocks innovation.

**Job statement format:**
```
[Verb] + [object of the verb] + [contextual clarifier]
```

**Example:** "Minimize the time it takes to file expense reports while traveling."

### 3.2 Ulwick's Outcome-Driven Innovation (ODI)

*Citation: Ulwick, A. W. (2016). Jobs to Be Done: Theory to Practice. IDEA BITE Press.*

**Method:**
1. Define the core functional job
2. Map the job steps (job map)
3. Identify desired outcomes for each step (50-150 outcomes per job)
4. Quantify importance and satisfaction
5. Calculate opportunity score

**Opportunity Algorithm:**

```
Opportunity = Importance + max(Importance - Satisfaction, 0)
```

Scale: 1-10 for both importance and satisfaction.

| Score Range | Interpretation |
|-------------|---------------|
| > 15 | Extremely underserved (major opportunity) |
| 12-15 | Underserved (good opportunity) |
| 10-12 | Appropriately served |
| < 10 | Overserved (potential for disruption from below) |

### 3.3 Job Map

The universal job map covers eight stages:

```
1. Define     -> What job needs to be done?
2. Locate     -> Find inputs and information needed
3. Prepare    -> Set up to do the job
4. Confirm    -> Verify readiness
5. Execute    -> Do the core job
6. Monitor    -> Track progress during execution
7. Modify     -> Make adjustments as needed
8. Conclude   -> Finish and assess outcomes
```

Each stage has multiple desired outcomes that can be measured and prioritized.

---

## 4. Kano Model — Formal Categorization

*Citation: Kano, N., Seraku, N., Takahashi, F., & Tsuji, S. (1984). Attractive quality and must-be quality. Journal of the Japanese Society for Quality Control, 14(2), 39-48.*

### 4.1 Three Categories

**Must-Have (Basic):** Features whose absence causes extreme dissatisfaction, but whose presence doesn't increase satisfaction. Expected baseline.

**Performance (Linear):** Features where satisfaction is proportional to the level of fulfillment. More = better, linearly.

**Delight (Excitement):** Features whose absence doesn't cause dissatisfaction, but whose presence creates disproportionate satisfaction. Unexpected value.

### 4.2 Kano Questionnaire Method

For each feature, ask two questions:
1. **Functional:** "How would you feel if this feature were present?"
2. **Dysfunctional:** "How would you feel if this feature were absent?"

Response options: Like it, Expect it, Neutral, Live with it, Dislike it

### 4.3 Classification Matrix

| | Like (Functional) | Expect | Neutral | Live with | Dislike |
|-|-------------------|--------|---------|-----------|---------|
| **Like (Dysfunctional)** | Questionable | Attractive | Attractive | Attractive | One-dimensional |
| **Expect** | Reverse | Indifferent | Indifferent | Indifferent | Must-be |
| **Neutral** | Reverse | Indifferent | Indifferent | Indifferent | Must-be |
| **Live with** | Reverse | Indifferent | Indifferent | Indifferent | Must-be |
| **Dislike** | Reverse | Reverse | Reverse | Reverse | Questionable |

### 4.4 Strategic Implications

1. **Invest in must-haves first** — Without these, nothing else matters
2. **Compete on performance features** — These differentiate in head-to-head comparisons
3. **Delight features create love** — They generate word-of-mouth and emotional attachment
4. **Categories shift over time** — Yesterday's delight is today's performance is tomorrow's must-have (feature expectation inflation)

---

## 5. Product-Market Fit Frameworks

### 5.1 Sean Ellis Survey Method

*Citation: Ellis, S. (2010). "Using Survey.io to Measure Product/Market Fit."*

Ask users: "How would you feel if you could no longer use [product]?"

**Benchmark:** >40% "Very disappointed" = PMF achieved.

### 5.2 Superhuman PMF Engine

*Source: Vohra, R. (2019). "How Superhuman Built an Engine to Find Product-Market Fit."*

1. Segment users by their PMF score response
2. Focus on "Very disappointed" users — understand why they love the product
3. Understand what holds back "Somewhat disappointed" users
4. Build features that move "Somewhat" to "Very" without alienating existing lovers
5. Track PMF score over time — aim for continuous improvement

### 5.3 Quantitative PMF Indicators

| Metric | Pre-PMF | Post-PMF |
|--------|---------|----------|
| Retention curve | Declining to zero | Flattening at meaningful level |
| NPS | < 20 | > 40 |
| Organic acquisition | < 20% of new users | > 30% of new users |
| Sean Ellis score | < 40% | > 40% |
| Engagement | Declining | Stable or increasing |
| Sales cycle | Long, educational | Shorter, pull-based |

---

## Key Citations

- Cagan, M. (2018). *Inspired* (2nd ed.). Wiley.
- Christensen, C. M. et al. (2016). *Competing Against Luck*. Harper Business.
- Kano, N. et al. (1984). Attractive quality and must-be quality. *Journal of the Japanese Society for Quality Control*, 14(2), 39-48.
- Torres, T. (2021). *Continuous Discovery Habits*. Product Talk LLC.
- Ulwick, A. W. (2016). *Jobs to Be Done: Theory to Practice*. IDEA BITE Press.
