# Growth Frameworks -- Systematic Approaches to Scaling

## Purpose

Growth marketing is the application of scientific method to customer acquisition,
activation, and retention. Unlike traditional marketing, growth marketing treats
the entire funnel as its domain and uses rapid experimentation to find scalable,
repeatable growth mechanisms. This module codifies the canonical growth frameworks.

---

## AARRR: Pirate Metrics (Dave McClure, 500 Startups)

The foundational growth framework. Defines five stages of the customer lifecycle:

### The Five Stages

```
A - Acquisition:  How do users find you?
A - Activation:   Do they have a great first experience?
R - Retention:    Do they come back?
R - Revenue:      Do they pay you?
R - Referral:     Do they tell others?
```

### Stage Definitions and Key Metrics

**Acquisition**
- Definition: User reaches your product from any channel
- Metrics: Visitors, signups, cost per acquisition (CPA) by channel
- Benchmark question: Which channels drive the most qualified users?
- Common failure: Optimizing for volume over quality

**Activation**
- Definition: User experiences the core value (the "aha moment")
- Metrics: Activation rate, time-to-value, setup completion rate
- Benchmark question: What percentage of signups reach the aha moment?
- Common failure: Assuming signup = activation

**Retention**
- Definition: User returns and engages repeatedly
- Metrics: DAU/MAU ratio, retention curves (D1, D7, D30), cohort retention
- Benchmark question: Does the retention curve flatten (good) or approach zero?
- Common failure: Focusing on acquisition when retention is the real problem

**Revenue**
- Definition: User converts to paying customer
- Metrics: Conversion rate (free to paid), ARPU, LTV, expansion revenue
- Benchmark question: Are unit economics healthy (LTV:CAC > 3:1)?
- Common failure: Premature monetization before activation/retention

**Referral**
- Definition: User brings new users through word-of-mouth or viral mechanisms
- Metrics: Viral coefficient (K-factor), NPS, referral rate
- Benchmark question: What percentage of new users come from existing users?
- Common failure: Asking for referrals before delivering value

### AARRR Priority Decision Tree

```
START: Where is the biggest leak in the funnel?
  |
  +-- Retention is poor (< 20% D30 for SaaS)
  |     --> FIX RETENTION FIRST. Acquiring users into a leaky bucket wastes money.
  |
  +-- Retention is acceptable but activation is low (< 40%)
  |     --> Fix activation. Users are signing up but not reaching value.
  |
  +-- Activation is good but acquisition is expensive (CAC > LTV/3)
  |     --> Optimize acquisition channels. Test new channels. Improve targeting.
  |
  +-- Acquisition and retention are solid but revenue is low
  |     --> Optimize monetization. Test pricing, packaging, upsell.
  |
  +-- Everything works but growth is linear
        --> Build referral loops. Engineer virality.
```

**Critical Rule:** Fix retention before scaling acquisition. Sean Ellis: "If you
have a retention problem, you have a product problem, not a marketing problem."

---

## Growth Loops (Reforge)

### Why Loops Replace Funnels

Funnels are linear: acquire -> activate -> retain. This model misses the
compounding effects of growth. Growth loops are circular systems where the
output of one cycle becomes the input of the next.

### Anatomy of a Growth Loop

```
┌─────────────────────────────────────────┐
│                                         │
│   Input ──> Action ──> Output ──> Input │
│     ^                              |    │
│     └──────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

### Common Growth Loop Types

**1. Viral / User-Generated Content Loop**
```
New user signs up
  --> Creates content (post, project, review)
  --> Content is indexed/shared
  --> New users discover content via search/social
  --> New users sign up
```
Examples: Pinterest, Yelp, Stack Overflow, GitHub

**2. Paid Acquisition Loop**
```
Spend on ads
  --> Acquire customers
  --> Customers generate revenue
  --> Reinvest revenue in ads
  --> Acquire more customers
```
Critical constraint: Unit economics must be positive (LTV > CAC with margin
for reinvestment). Payback period determines reinvestment speed.

**3. Viral Invitation Loop**
```
User signs up
  --> Product prompts sharing/inviting
  --> Contacts receive invitation
  --> Contacts sign up
  --> Repeat
```
Examples: Dropbox (referral), Slack (team invites), Zoom (meeting links)

**4. Company/Sales Loop (B2B)**
```
Marketing generates leads
  --> Sales closes deals
  --> Customer success retains and expands
  --> Case studies and referrals generated
  --> Feeds marketing pipeline
```

**5. Supply-Side Loop (Marketplaces)**
```
New sellers join
  --> More inventory/selection
  --> Better buyer experience
  --> More buyers
  --> More demand attracts more sellers
```

### Loop Evaluation Criteria

| Criterion | Question | Weight |
|-----------|----------|--------|
| Cycle time | How long does one loop iteration take? | High (faster = better) |
| CAC of output | How much does each acquired user from this loop cost? | High |
| Compounding | Does output grow faster than input over time? | Critical |
| Defensibility | Can competitors replicate this loop? | Medium |
| Saturation risk | Will this loop exhaust its addressable audience? | Medium |

---

## The North Star Metric Framework

### Concept
A single metric that captures the core value your product delivers to customers.
All growth efforts should ultimately improve this metric.

### North Star Metric Criteria
1. Reflects customer value delivered (not vanity)
2. Leads to revenue (not a coincidence metric)
3. Measurable and actionable
4. Understood by all teams

### Examples by Business Type

| Business Type | North Star Metric | Why |
|---------------|-------------------|-----|
| Marketplace | Transactions completed | Core value exchange |
| SaaS (productivity) | Weekly active users | Ongoing value delivery |
| SaaS (platform) | Items created/stored | Platform value accumulation |
| Media | Time spent reading | Content value consumption |
| E-commerce | Purchases per month | Revenue proxy + engagement |
| Social | Daily active users | Network value indicator |

### North Star Decomposition (Input Tree)

Break the North Star into controllable inputs:

```
North Star: Weekly Active Users
  |
  +-- New users activated this week
  |     +-- Signups * Activation rate
  |           +-- Channel A signups * Channel A activation rate
  |           +-- Channel B signups * Channel B activation rate
  |
  +-- Existing users retained this week
  |     +-- Last week active * Retention rate
  |           +-- Power users * Power user retention
  |           +-- Casual users * Casual user retention
  |
  +-- Reactivated users this week
        +-- Dormant users * Reactivation rate
              +-- Win-back email recipients * Win-back conversion
```

---

## The ICE Framework (Sean Ellis)

Prioritize growth experiments using three criteria:

### Scoring (1-10 for each)

**Impact:** How much will this move the target metric if it works?
**Confidence:** How confident are we that this will work?
**Ease:** How easy is this to implement and measure?

**ICE Score = Impact * Confidence * Ease**

### Application

| Experiment | Impact | Confidence | Ease | ICE Score |
|-----------|--------|-----------|------|-----------|
| Redesign onboarding | 9 | 7 | 4 | 252 |
| Add social proof to pricing | 6 | 8 | 9 | 432 |
| New referral program | 8 | 5 | 3 | 120 |
| Retargeting ads | 5 | 7 | 8 | 280 |

**Run highest ICE score first.** Review scores weekly as confidence updates.

---

## Growth Experimentation Process

### The Growth Sprint (Weekly)

**Monday: Analyze**
- Review previous week's experiment results
- Update growth model with new data
- Identify biggest levers and bottlenecks

**Tuesday: Ideate**
- Generate experiment ideas (team brainstorm)
- Score using ICE framework
- Select top 2-3 experiments for the week

**Wednesday-Thursday: Build & Launch**
- Design experiments
- Implement changes
- Launch tests

**Friday: Review & Learn**
- Check early signals
- Document learnings
- Feed insights into next week's ideation

### Experiment Documentation Template

```
EXPERIMENT: [Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hypothesis: If we [change], then [metric] will [improve/decrease] by [amount]
            because [reasoning].
Metric:     [Primary metric to measure]
Target:     [Minimum detectable effect]
Duration:   [Minimum run time for statistical significance]
Segment:    [Who is included/excluded]
ICE Score:  I: [x] C: [x] E: [x] = [total]

RESULTS:
Status:     [Win / Loss / Inconclusive]
Lift:       [+/- x%]
Significance: [p-value]
Learning:   [What did we learn regardless of win/loss?]
Next step:  [Scale / iterate / kill]
```

---

## The Racecar Growth Framework (Reforge)

Four components that determine growth velocity:

### 1. The Engine (Growth Loops)
The self-reinforcing loops that drive compounding growth.
Without a working engine, nothing else matters.

### 2. Turbo Boosts (One-Time Accelerators)
Tactics that provide a temporary spike but do not compound:
- PR/press coverage, product launches, viral campaigns, partnerships
- Useful for jumpstarting growth but not sustainable alone

### 3. Lubricants (Optimizations)
Improvements that make the engine more efficient:
- CRO, onboarding optimization, pricing optimization
- Incremental but compounding improvements

### 4. Fuel (Capital and Resources)
The resources that power the engine:
- Budget for paid acquisition, team size, content investment
- More fuel only helps if the engine works

### Application Sequence

```
1. First: Build a working engine (growth loop that works)
2. Then: Add lubricants (optimize conversion at each step)
3. Then: Add fuel (scale spend and resources)
4. Occasionally: Use turbo boosts (launches, PR) to accelerate
```

---

## Growth Maturity Model

### Stage 1: Finding Product-Market Fit
- Focus: Retention and activation metrics
- Team: Founder + 1-2 generalists
- Experiments: 2-3 per week, qualitative heavy
- Success: Retention curve flattens; users return without prompting

### Stage 2: Finding Growth-Channel Fit
- Focus: One channel that works reliably
- Team: 2-4 growth specialists
- Experiments: 5-10 per week, quantitative heavy
- Success: CAC < LTV/3; channel scales predictably

### Stage 3: Scaling Growth
- Focus: Multiple channels, growth loops
- Team: 5-15+ across growth, product, engineering
- Experiments: 15-30+ per week
- Success: Compounding growth loops active; diversified channels

### Stage 4: Optimizing Growth
- Focus: Efficiency, margin, defensibility
- Team: Full growth org with specialized functions
- Experiments: 50+ per week across multiple teams
- Success: Sustainable competitive advantage through growth systems

---

## Key References

| Work | Author | Year | Contribution |
|------|--------|------|-------------|
| Hacking Growth | Sean Ellis | 2017 | Growth experimentation methodology |
| Lean Analytics | Croll & Yoskovitz | 2013 | Metric-driven growth |
| Traction | Weinberg & Mares | 2015 | 19 channels framework |
| Blitzscaling | Hoffman & Yeh | 2018 | Scaling growth at speed |
| Reforge Growth Series | Reforge | 2018+ | Growth loops, models |
| Product-Led Growth | Wes Bush | 2019 | PLG growth framework |

---

**Growth is a system, not a tactic. Build the engine before pressing the gas.**
