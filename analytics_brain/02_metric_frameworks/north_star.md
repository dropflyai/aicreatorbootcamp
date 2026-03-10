# North Star Metric Framework

---

## Overview

The North Star Metric (NSM) is the single metric that best captures the core value a product delivers to its customers. Formalized by Sean Ellis and adopted broadly through Amplitude's North Star Framework, the NSM serves as an organizational alignment tool — a shared quantitative definition of success that connects every team's work to customer value creation.

The NSM is not a revenue metric. It is a value metric. Revenue is the consequence of delivering value; the NSM measures the value delivery itself. When the NSM grows, revenue should follow. When revenue grows without NSM growth, the business is extracting value without creating it — a pattern that is unsustainable.

---

## The North Star Framework (Amplitude)

### Three Components

```
                    ┌─────────────────────┐
                    │   NORTH STAR METRIC  │
                    │  (Value Exchange)    │
                    └──────────┬──────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
   ┌──────┴──────┐     ┌──────┴──────┐     ┌──────┴──────┐
   │  INPUT       │     │  INPUT       │     │  INPUT       │
   │  METRIC 1    │     │  METRIC 2    │     │  METRIC 3    │
   │ (Breadth)    │     │ (Depth)      │     │ (Frequency)  │
   └─────────────┘     └─────────────┘     └─────────────┘
          │                    │                    │
    Team A owns          Team B owns          Team C owns
```

**1. The North Star Metric** — The single metric representing value exchange between the product and its users.

**2. Input Metrics** — The 3-5 actionable, team-ownable metrics that drive the North Star. These decompose the NSM into components that specific teams can influence.

**3. The Connection** — A clear, ideally mathematical, relationship between input metrics and the North Star.

### Choosing the North Star Metric

The NSM must satisfy five criteria:

**1. Expresses Value**
The metric must measure value received by the customer, not value extracted by the business. Revenue measures extraction. "Nights Booked" (Airbnb) measures the value exchange between hosts and guests.

**2. Represents Vision**
The metric must reflect where the product is going, not just where it is. If the product vision is "become the world's workspace," the NSM should measure workspace activity, not just signups.

**3. Is a Leading Indicator of Revenue**
While the NSM is not revenue itself, it must predict revenue. If the NSM grows and revenue does not follow within a reasonable time horizon, either the NSM is wrong or the monetization model is broken.

**4. Is Measurable**
The metric must be quantifiable with available data infrastructure. An aspirational metric that cannot be instrumented is useless.

**5. Is Understandable**
Every employee should be able to explain the NSM and how their work connects to it. If the metric requires a statistics degree to interpret, it cannot serve as an alignment tool.

### NSM Examples by Business Model

| Business Type | North Star Metric | Why It Works |
|--------------|-------------------|-------------|
| **Marketplace** (Airbnb) | Nights Booked | Captures bilateral value — host earns, guest stays |
| **SaaS** (Slack) | Daily Active Teams | Measures collaborative value, not just individual logins |
| **Media** (Spotify) | Time Spent Listening | Measures entertainment value delivered |
| **E-commerce** (Amazon) | Purchase Frequency | Measures habitual value extraction |
| **Fintech** (Robinhood) | Funded Accounts | Measures commitment to financial participation |
| **Social** (Facebook) | Daily Active Users | Measures social connection value (though increasingly debated) |
| **Developer Tools** (GitHub) | Active Repositories with Commits | Measures productive developer value |
| **EdTech** (Duolingo) | Daily Active Learners | Measures learning engagement value |
| **Productivity** (Notion) | Weekly Active Editors | Measures knowledge creation value |

### The NSM Anti-Patterns

**Anti-Pattern 1: Choosing Revenue as the NSM**
Revenue is a lagging indicator of value. It incentivizes extraction over creation. When revenue is the NSM, teams optimize for short-term monetization at the expense of long-term value creation.

**Anti-Pattern 2: Choosing a Vanity Metric**
"Total registered users" only goes up. It cannot signal decline, cannot drive action, and rewards acquisition over activation. The NSM must be sensitive to both improvement and deterioration.

**Anti-Pattern 3: Choosing a Metric No Team Can Influence**
If the NSM is too high-level for any team to directly impact, it fails as an alignment tool. The NSM must decompose into input metrics that individual teams own.

**Anti-Pattern 4: Changing the NSM Frequently**
The NSM should be stable for 1-2 years minimum. Frequent changes signal strategic confusion and prevent teams from building the muscle memory needed to optimize effectively.

**Anti-Pattern 5: Choosing Multiple North Stars**
By definition, there can be only one North Star. Having three "North Star Metrics" is having zero — the concept's power lies in forcing prioritization.

---

## Metric Trees

### Purpose

A metric tree decomposes the North Star into progressively more granular, more actionable components. It serves three functions:

1. **Diagnosis:** When the NSM changes, the tree identifies which component is responsible
2. **Alignment:** Each branch of the tree maps to a team's area of responsibility
3. **Prioritization:** The tree reveals which inputs have the highest leverage on the NSM

### Building a Metric Tree

**Step 1: Express the NSM mathematically**

```
NSM = f(Input_1, Input_2, ..., Input_n)
```

The relationship can be multiplicative (most common), additive, or a combination.

**Multiplicative example (SaaS):**
```
Weekly Active Teams = Total Teams * Activation Rate * Weekly Return Rate
```

**Additive example (Revenue):**
```
MRR = New MRR + Expansion MRR + Reactivation MRR - Contraction MRR - Churn MRR
```

**Step 2: Decompose each input further**

```
Weekly Active Teams
├── Total Teams
│   ├── New Team Signups
│   │   ├── Website Visitors * Signup Conversion Rate
│   │   └── [by channel: organic, paid, referral, partner]
│   └── Cumulative Retained Teams
│       └── Prior Teams * (1 - Churn Rate)
├── Activation Rate
│   ├── Onboarding Completion Rate
│   ├── First Core Action Rate
│   └── Team Invite Rate
└── Weekly Return Rate
    ├── Feature Engagement Depth
    ├── Notification Effectiveness
    └── Habit Formation Rate
```

**Step 3: Assign ownership**

Each leaf node or branch gets exactly one team owner. The tree becomes the organizational chart for metric accountability.

**Step 4: Identify leverage points**

Using sensitivity analysis or historical data, estimate the elasticity of the NSM to each input:
- If Activation Rate increases by 10%, how much does the NSM increase?
- If Weekly Return Rate increases by 10%, how much does the NSM increase?

The input with the highest elasticity is the highest-leverage investment.

### Metric Tree Design Rules

1. **Mathematical integrity** — The tree must be arithmetically valid. Parent = f(children).
2. **MECE decomposition** — Mutually exclusive, collectively exhaustive. No gaps, no overlaps.
3. **Depth limit of 4-5 levels** — Beyond that, the tree becomes impractical to navigate.
4. **Leaf metrics must be actionable** — If a team cannot directly influence a leaf metric, decompose it further until they can.
5. **Each metric appears exactly once** — Avoid duplication across branches.
6. **Counter-metrics at key nodes** — Every metric being optimized needs a guardrail.

---

## Input Metrics

### The Three Dimensions of Input Metrics

Amplitude's framework categorizes input metrics along three dimensions:

**Breadth** — How many users are engaging?
- New user acquisition
- Activation rate
- Reactivation rate

**Depth** — How deeply are they engaging?
- Feature adoption
- Core actions per session
- Engagement intensity score

**Frequency** — How often are they engaging?
- Return rate (D1, D7, D30)
- Session frequency
- Interval between sessions

A healthy NSM requires growth across all three dimensions. Growth in breadth without depth indicates acquisition of low-value users. Growth in depth without frequency indicates sporadic power users. Growth in frequency without breadth indicates a plateau.

### Input Metric Selection Criteria

For each candidate input metric, evaluate:

| Criterion | Question | Requirement |
|-----------|----------|-------------|
| Causality | Does moving this input actually move the NSM? | Must have evidence (experimental or strong observational) |
| Controllability | Can a team directly influence this metric? | Must map to specific team actions |
| Responsiveness | Does this metric respond quickly to changes? | Should move within 1-2 sprint cycles of intervention |
| Measurability | Can this metric be accurately tracked? | Must be instrumentable with current infrastructure |
| Independence | Is this metric independent of other input metrics? | Minimize multicollinearity between inputs |

### Input Metric Validation

Before committing to an input metric, validate the causal chain:

**Observational validation:** Analyze historical data. When this input metric improved, did the NSM subsequently improve? Control for confounders.

**Experimental validation:** Run an experiment that targets the input metric. If improving the input also improves the NSM, the causal chain is confirmed.

**Counter-factual validation:** When this input metric declined, did the NSM subsequently decline? Negative correlation is as important as positive.

---

## Counter-Metrics

### The Guardrail Imperative

Every input metric being actively optimized must have at least one counter-metric that detects unintended negative consequences.

**Counter-metric framework:**

| Input Metric | Potential Gaming | Counter-Metric |
|-------------|-----------------|----------------|
| New User Signups | Acquire low-quality users via aggressive ads | Day-7 Activation Rate |
| Feature Adoption | Force users through features they don't need | User Satisfaction (CSAT/NPS) |
| Session Frequency | Send excessive notifications | Unsubscribe Rate, Notification Disable Rate |
| Core Actions per Session | Inflate action count with micro-interactions | Time to Value, Task Completion Rate |
| Conversion Rate | Restrict funnel entry to high-intent users | Total Conversions (absolute count) |

### Counter-Metric Monitoring Protocol

1. **Set baselines** before launching any optimization initiative
2. **Monitor counter-metrics weekly** during optimization sprints
3. **Define red lines** — threshold values below which the optimization must be paused
4. **Report input and counter-metrics together** — never in isolation

---

## NSM Implementation Playbook

### Phase 1: Selection (Weeks 1-2)

1. List candidate NSMs based on the five criteria above
2. For each candidate, draft a metric tree to test decomposability
3. Validate leading-indicator relationship with revenue using historical data
4. Present 2-3 finalists to leadership with pros/cons analysis
5. Select one NSM with explicit rationale documented

### Phase 2: Decomposition (Weeks 3-4)

1. Build the full metric tree (3-4 levels deep)
2. Assign team ownership to each branch
3. Identify the 3-5 primary input metrics
4. Define counter-metrics for each input metric
5. Write metric specifications for NSM and all input metrics

### Phase 3: Instrumentation (Weeks 5-8)

1. Audit current tracking against required events/properties
2. Implement missing event tracking
3. Build NSM and input metric calculations in the metrics layer
4. Create the NSM dashboard with input metric decomposition
5. Validate all numbers against known benchmarks or manual calculations

### Phase 4: Operationalization (Weeks 9-12)

1. Launch NSM at all-hands with clear explanation and context
2. Incorporate NSM review into weekly leadership meetings
3. Incorporate input metric review into team sprint retrospectives
4. Establish quarterly NSM deep-dive cadence
5. Set 12-month NSM target with quarterly milestones

### Phase 5: Iteration (Ongoing)

1. Monthly sensitivity analysis: are input metric elasticities stable?
2. Quarterly metric tree review: are decompositions still valid?
3. Semi-annual NSM validity check: does the NSM still reflect the product vision?
4. Annual strategic review: should the NSM evolve based on company stage?

---

## NSM by Company Stage

The appropriate NSM shifts as a company matures:

| Stage | Focus | Typical NSM Pattern |
|-------|-------|-------------------|
| Pre-PMF | Retention | "Do users come back?" — D7/D30 retention of activated users |
| Post-PMF, Pre-Scale | Activation | "Do users find value?" — Activation rate, time-to-value |
| Growth | Engagement Volume | "How much value is being created?" — Core actions, active entities |
| Scale | Efficiency | "How sustainably are we growing?" — Per-unit economics, NRR |
| Maturity | Expansion | "Are we growing the pie?" — New use cases, new segments, platform activity |

**The NSM does not change quarterly.** But it may evolve every 12-24 months as the company transitions between stages.

---

**The North Star Metric is not a dashboard decoration. It is the organization's quantitative definition of purpose — the answer to "what does success mean, measured?" If the NSM is wrong, the entire measurement system is misaligned. Get this right first.**
