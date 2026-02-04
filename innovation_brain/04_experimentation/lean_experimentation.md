# Lean Experimentation -- Build-Measure-Learn

## Overview

The Lean Startup methodology, articulated by Eric Ries (2011) and built on the
foundations of Steve Blank's Customer Development and Toyota's Lean Manufacturing,
provides a scientific approach to innovation under conditions of extreme uncertainty.
The core insight is that startups (and innovation projects within established companies)
are not smaller versions of large companies -- they are temporary organizations searching
for a repeatable, scalable business model. The correct unit of progress is not lines of
code or features shipped -- it is validated learning.

---

## The Build-Measure-Learn Loop

### The Core Cycle

```
                    IDEAS
                   /      \
                  /        \
                 /          \
            BUILD            LEARN
           /                      \
          /                        \
         /                          \
     PRODUCT                    DATA
         \                          /
          \                        /
           \                      /
            MEASURE ------------>
```

### The Counterintuitive Direction

While the loop runs BUILD --> MEASURE --> LEARN, you should PLAN in reverse:

```
Planning direction (reverse):
  LEARN: What do we need to learn?
    |
    v
  MEASURE: What data would prove or disprove our hypothesis?
    |
    v
  BUILD: What is the minimum we need to build to get that data?
```

This prevents the most common mistake: building more than necessary to learn
what you need to learn.

### Cycle Time is Everything

```
Company A: 6-month BML cycles        Company B: 2-week BML cycles
  - 2 cycles per year                  - 26 cycles per year
  - 2 learning events                  - 26 learning events
  - Slow adaptation                    - Rapid adaptation
  - High cost per learning             - Low cost per learning
  - Competing on vision/luck           - Competing on learning velocity
```

The company that learns fastest wins. Every day spent building without
learning is wasted.

---

## Minimum Viable Product (MVP) Types

### The MVP Spectrum

```
LOW FIDELITY                                              HIGH FIDELITY
LOW EFFORT                                                HIGH EFFORT
LOW COST                                                  HIGH COST

Landing   Explainer  Wizard of  Concierge  Single    Piecemeal   Functional
Page      Video      Oz MVP     MVP        Feature   MVP         MVP
  |          |          |          |          |          |          |
  v          v          v          v          v          v          v
Test       Test       Test       Test       Test       Test       Test
demand     value      solution   solution   core       full       full
signal     proposition manually   manually   feature    experience product
                      (fake      (real       (one       (assembled (custom
                       backend)   service)    thing)     from tools) built)
```

### MVP Types in Detail

#### Landing Page MVP
- **What**: Marketing page describing the product with a call-to-action (sign-up, pre-order)
- **Tests**: Is there demand for this concept? Will people sign up?
- **Cost**: $100-500, 1-3 days
- **Signal**: Conversion rate, sign-up volume, traffic sources
- **Example**: Buffer tested pricing page before building any software

#### Explainer Video MVP
- **What**: Short video demonstrating the concept
- **Tests**: Does the value proposition resonate? Do people share it?
- **Cost**: $0-2,000, 1-5 days
- **Signal**: Views, shares, sign-ups, comments
- **Example**: Dropbox's explainer video drove 70K sign-ups overnight

#### Wizard of Oz MVP
- **What**: Appears automated to user but is manually operated behind the scenes
- **Tests**: Will users engage with the full experience?
- **Cost**: Low-medium, manual labor intensive
- **Signal**: User engagement, retention, willingness to pay
- **Example**: Zappos tested shoe e-commerce by buying shoes from stores and shipping manually

#### Concierge MVP
- **What**: Deliver the service manually to a small number of customers
- **Tests**: Does the solution actually solve the problem? What do customers value most?
- **Cost**: Medium (your time), low (technology)
- **Signal**: Customer satisfaction, repeat usage, willingness to pay, detailed feedback
- **Example**: Food on the Table started by personally shopping for one customer

#### Single-Feature MVP
- **What**: Build one core feature and nothing else
- **Tests**: Is the core value proposition strong enough to drive adoption?
- **Cost**: Medium-high
- **Signal**: Usage, retention, word-of-mouth
- **Example**: Twitter launched with just "post 140 characters"

#### Piecemeal MVP
- **What**: Assemble the product from existing tools and services (no custom code)
- **Tests**: Does the full experience work end-to-end?
- **Cost**: Low-medium (subscription costs for tools)
- **Signal**: End-to-end user experience, conversion, retention
- **Example**: Groupon started as a WordPress blog with manually emailed PDFs

#### Functional MVP
- **What**: A working product with minimal features
- **Tests**: Will users adopt, retain, and pay?
- **Cost**: High
- **Signal**: Full product metrics (activation, retention, revenue)
- **Example**: Instagram launched with just photo filters and sharing

---

## Hypothesis Formulation

### The Hypothesis Structure

Every experiment must start with a falsifiable, measurable hypothesis:

```
We believe that [specific action or offering]
for [specific customer segment]
will result in [specific measurable outcome].

We will know this is true when we see [specific metric]
reach [specific threshold]
within [specific time period].
```

### Hypothesis Types

| Type | Tests | Example |
|------|-------|---------|
| Problem hypothesis | Does this problem exist and matter? | "Freelancers spend > 5 hrs/week on invoicing" |
| Solution hypothesis | Does this solution solve the problem? | "Automated invoicing reduces time to < 30 min/week" |
| Value hypothesis | Will customers use/pay for this? | "Freelancers will pay $20/month for automated invoicing" |
| Growth hypothesis | How will this spread? | "Freelancers will refer 2+ peers within 3 months" |

### Bad vs. Good Hypotheses

| Bad Hypothesis | Problem | Good Hypothesis |
|---------------|---------|-----------------|
| "Users will like this" | Not measurable | "40% of users who try the feature will use it weekly" |
| "This will go viral" | No specific mechanism | "Users who invite 3+ friends will have 2x retention" |
| "People need this" | Not falsifiable | "50% of interviewed users describe this as a top-3 pain" |
| "We'll make money" | Too vague | "CAC < $50 with LTV > $200 within 6 months" |

---

## Experiment Design

### The Riskiest Assumption Test (RAT)

```
Step 1: List all assumptions behind your idea
Step 2: Rank by (importance to success) x (uncertainty)
Step 3: Identify the SINGLE riskiest assumption
Step 4: Design the cheapest, fastest experiment to test it
Step 5: Define success/failure criteria BEFORE running
Step 6: Run the experiment
Step 7: Evaluate results against pre-defined criteria
Step 8: PIVOT or PERSEVERE based on evidence
```

### Experiment Design Canvas

```
+------------------------------------------------------------------+
| EXPERIMENT DESIGN                                                 |
|                                                                  |
| Hypothesis: ____________________________________________         |
|                                                                  |
| Riskiest assumption: ______________________________________     |
|                                                                  |
| Experiment type: [ ] Landing page  [ ] Interview  [ ] Prototype |
|                  [ ] Wizard of Oz  [ ] Concierge  [ ] A/B test  |
|                  [ ] Smoke test    [ ] Other: ___                |
|                                                                  |
| Target audience: ______________________________________________  |
| Sample size: _____   Duration: _____                             |
|                                                                  |
| Success metric: __________________  Threshold: ______            |
| Failure metric: __________________  Threshold: ______            |
|                                                                  |
| Cost: $______   Time: ______ days                                |
|                                                                  |
| If hypothesis confirmed: _______________________________________ |
| If hypothesis rejected: ________________________________________ |
+------------------------------------------------------------------+
```

---

## Pivot vs. Persevere

### The Pivot Decision

A pivot is a structured course correction designed to test a new fundamental
hypothesis about the product, strategy, and engine of growth.

### Types of Pivots

| Pivot Type | What Changes | Example |
|-----------|-------------|---------|
| Zoom-in | Single feature becomes the product | Flickr (from game to photo sharing) |
| Zoom-out | Product becomes a feature of larger product | Yelp (from email recommendations to review platform) |
| Customer segment | Same product, different customer | PayPal (from PalmPilot to eBay sellers) |
| Customer need | Same customer, different problem | Potbelly Sandwiches (from antique store to sandwich shop) |
| Platform | Application becomes platform (or vice versa) | Shopify (from online store to e-commerce platform) |
| Business architecture | High margin/low volume to low margin/high volume | Amazon (from bookstore to everything store) |
| Value capture | Change monetization model | Instagram (from check-ins with photos to photo sharing) |
| Engine of growth | Viral to sticky to paid (or combinations) | Dropbox (from paid acquisition to referral program) |
| Channel | Different distribution path | Dell (from retail to direct sales) |
| Technology | New technology, same solution | Netflix (from DVD to streaming) |

### Pivot Decision Framework

```
Should we pivot?
  |
  +--> Are core metrics improving with each BML cycle?
  |     |
  |     +--> YES --> PERSEVERE (continue iterating)
  |     +--> NO --> Have we exhausted reasonable iterations?
  |                  |
  |                  +--> NO --> Continue iterating (not enough data)
  |                  +--> YES --> PIVOT (change fundamental hypothesis)
  |
  +--> Have we validated the value hypothesis?
  |     |
  |     +--> NO --> Pivot on value proposition
  |     +--> YES --> Have we validated the growth hypothesis?
  |                  |
  |                  +--> NO --> Pivot on growth engine
  |                  +--> YES --> SCALE (you have product-market fit)
```

---

## Innovation Accounting

### Why Traditional Metrics Fail for Innovation

Traditional financial metrics (revenue, profit, ROI) fail for early-stage
innovation because:
1. Revenue is zero or near-zero in early stages
2. ROI is negative and expected to be
3. Growth projections are speculative
4. Comparison to established businesses is meaningless

### The Three Learning Milestones

| Milestone | Question | Evidence |
|-----------|----------|---------|
| Problem-Solution Fit | Do we understand a real problem? | Customer interviews, observation, job-to-be-done mapping |
| Product-Market Fit | Does our solution create sufficient value? | Retention, engagement, willingness to pay |
| Scale Readiness | Can we grow efficiently? | Unit economics, channel scalability, operational readiness |

### Innovation Accounting Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Learning velocity | Assumptions tested per week | 1-3 per sprint |
| Experiment cost | Average cost per experiment | Decreasing over time |
| Assumption resolution | % of critical assumptions resolved | 100% before scaling |
| Pivot frequency | Pivots per quarter | 0-2 (too many = no conviction) |
| Customer development | Interviews per week | 5-10 in early stages |
| Activation rate | % of sign-ups who experience core value | > 40% |
| Retention (cohort) | % returning after 1/7/30 days | Improving cohort-over-cohort |

---

## Key Takeaways

1. **Learn, don't build**: The goal is validated learning, not shipped features.
2. **MVP is the minimum to learn**: Not the minimum product to launch.
3. **Hypotheses must be falsifiable**: If you cannot be wrong, you cannot learn.
4. **Test the riskiest assumption first**: Front-load the biggest unknowns.
5. **Pivot on evidence, not emotion**: Define success criteria before experiments.
6. **Innovation accounting replaces financial accounting**: Early-stage metrics are about learning.

---

**References:**
- Ries, E. (2011). *The Lean Startup*. Crown Business.
- Blank, S. (2013). *The Startup Owner's Manual*. K&S Ranch.
- Maurya, A. (2012). *Running Lean*. O'Reilly Media.
- Alvarez, C. (2014). *Lean Customer Development*. O'Reilly Media.
- Thomke, S. (2020). *Experimentation Works*. Harvard Business Review Press.
- Eisenmann, T., Ries, E., & Dillard, S. (2012). Hypothesis-driven entrepreneurship.
  *Harvard Business School Background Note* 812-095.
