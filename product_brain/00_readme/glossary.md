# Product Brain Glossary

## What This Enables

A shared vocabulary for all product management work. Ambiguous terminology is one of the most common causes of misalignment in product organizations. When "MVP" means "minimum viable product" to the PM but "minimum viable prototype" to the CEO, teams build the wrong thing. This glossary establishes canonical definitions used throughout the Product Brain.

---

## The Core Insight

Language shapes thinking. When a product team uses "feature" and "outcome" interchangeably, they optimize for the wrong thing. When "validated" means "we talked to two people" instead of "statistically significant result," confidence is misplaced. Precise vocabulary is not pedantry — it is a prerequisite for precise thinking.

---

## Core Product Management Terms

### A

**A/B Test (Split Test):** A controlled experiment comparing two variants (A and B) against a defined metric. Requires: random assignment, sufficient sample size, pre-defined success criteria, and statistical significance threshold (typically p < 0.05 or 95% confidence). Not to be confused with multivariate testing (multiple variables changed simultaneously).

**Activation:** The moment a new user first experiences the product's core value. Measured as the percentage of new signups who complete a predefined "activation event" within a time window. Example: Slack's activation metric was "a team sending 2,000 messages" — after which 93% of teams retained.

**AARRR (Pirate Metrics):** Framework by Dave McClure (2007) defining five stages of the customer lifecycle: Acquisition, Activation, Retention, Revenue, Referral. Used to identify the weakest stage in the funnel and focus optimization efforts.

**Aggregation Theory:** Ben Thompson's framework explaining how the internet enables platforms to aggregate demand (users) at zero marginal cost, gaining leverage over supply (content, products, services). Relevant to platform strategy decisions.

### B

**Backlog:** An ordered list of product work. Distinguished from a "wish list" by having explicit prioritization criteria. A healthy backlog is continuously groomed, with the top items being well-specified and lower items being progressively less defined.

**Bayesian A/B Testing:** An alternative to frequentist hypothesis testing that uses prior probability distributions and updates them with observed data. Advantages: can stop tests early, provides probability of being best (not just significance), handles multiple variants naturally. Trade-off: requires choosing priors.

**Build-Measure-Learn:** Eric Ries's core loop from The Lean Startup (2011). Build the minimum experiment to test a hypothesis, measure the result, learn from it, and iterate. The key insight is to minimize total time through the loop, not to minimize the build phase.

### C

**Cohort Analysis:** Analyzing user behavior grouped by their start date (or another shared characteristic). Essential for retention analysis because aggregate metrics mask trends. A product can show growing DAU while retention is declining — cohort analysis reveals the truth.

**Continuous Discovery:** Teresa Torres's framework (2021) for making product decisions through ongoing customer interaction. Core practice: at minimum one customer interview per week, conducted by the product trio (PM, designer, engineer). Outputs feed opportunity solution trees.

**Crossing the Chasm:** Geoffrey Moore's model (1991) describing the gap between early adopters and the early majority in technology adoption. Products that succeed with innovators and early adopters often fail to cross to mainstream adoption because the early majority requires different value propositions (pragmatism, reliability, social proof).

**Customer Advisory Board (CAB):** A structured group of customers who provide regular feedback and strategic input. Typically 8-15 members, meeting quarterly. Used heavily in B2B/enterprise product management.

### D

**DAU/MAU Ratio:** Daily Active Users divided by Monthly Active Users. Measures engagement frequency. Benchmarks: social apps aim for >50%, SaaS tools 20-40%, commerce apps 10-20%. A DAU/MAU of 50% means the average user visits 15 days per month.

**Demand-Side Forces (JTBD):** In Jobs to Be Done theory, the four forces that drive a customer to switch to a new solution: (1) Push of current situation, (2) Pull of new solution, (3) Anxiety of new solution, (4) Habit of current situation. A switch happens when push + pull > anxiety + habit.

**Discovery (Product Discovery):** The process of deciding what to build. Distinct from delivery (actually building it). Discovery answers: Should we build this? Will customers want it? Can users figure out how to use it? Can engineering build it? (Cagan's four product risks: value, usability, feasibility, viability.)

### E

**Experiment Brief:** A document defining an experiment's hypothesis, methodology, sample size, duration, success criteria, and guardrail metrics before the experiment begins. Prevents post-hoc rationalization.

**Engagement Loop:** A self-reinforcing cycle that drives repeated usage. Nir Eyal's Hook Model: Trigger -> Action -> Variable Reward -> Investment. Each cycle strengthens the hook.

### F

**Feature Flag (Feature Toggle):** A mechanism to enable or disable functionality without deploying new code. Enables: progressive rollouts, A/B testing, kill switches, beta programs. Essential infrastructure for modern product management.

**Freemium:** A pricing model where the core product is free, with premium features available for payment. Distinct from free trial (time-limited access to full product). The conversion rate from free to paid is typically 2-5% for B2C, 5-15% for B2B SaaS.

### G

**Guardrail Metric:** A metric that must not degrade during an experiment or initiative. Example: while optimizing for activation rate, page load time is a guardrail — if the experiment improves activation but degrades performance beyond the threshold, it fails.

**Go-to-Market (GTM):** The strategy for bringing a product to market. Encompasses: target customer definition, pricing, distribution channels, sales model, messaging, and launch sequencing. Not a launch event — a strategic plan.

### H

**Hooked Model:** Nir Eyal's framework (2014) for building habit-forming products. Four phases: Trigger (external then internal), Action (simplest behavior in anticipation of reward), Variable Reward (tribe, hunt, or self), Investment (user puts something in that improves the next cycle).

### I

**ICE Score:** Prioritization framework: Impact (1-10) x Confidence (1-10) x Ease (1-10). Simpler than RICE but less precise. Useful for quick prioritization in growth experiments.

**INVEST Criteria:** User story quality criteria by Bill Wake: Independent, Negotiable, Valuable, Estimable, Small, Testable. A user story that fails any of these criteria needs refinement.

### J

**Jobs to Be Done (JTBD):** Clayton Christensen's framework (2003, refined 2016 in "Competing Against Luck"). Customers do not buy products — they hire them to make progress in specific circumstances. The "job" is the progress the customer seeks. Understanding the job, not the customer demographics, is the key to innovation.

### K

**Kano Model:** Professor Noriaki Kano's framework (1984) classifying features into: Must-Be (expected, dissatisfaction if missing), Performance (more is better, linear satisfaction), Attractive (delighters, unexpected). Over time, attractive features become performance features, and performance features become must-be features.

**Kill Criteria:** Pre-defined conditions under which an initiative will be stopped. Essential for intellectual honesty. Example: "If activation rate does not improve by >5% within 4 weeks after launch, we will revert and redirect resources."

### L

**Leading Indicator:** A metric that predicts future outcomes. Example: weekly active usage predicts monthly retention. Contrasted with lagging indicators (revenue, churn) which reflect past outcomes. Product teams should optimize leading indicators.

**Lean Startup:** Eric Ries's methodology (2011) emphasizing validated learning through Build-Measure-Learn loops, minimum viable products, and pivot-or-persevere decisions. Core insight: the biggest risk is not building it wrong, but building the wrong thing.

### M

**MoSCoW:** Prioritization method: Must have, Should have, Could have, Won't have (this time). Useful for scope negotiation. The key discipline is that "Won't have" items are explicitly documented, not silently dropped.

**MVP (Minimum Viable Product):** The smallest product increment that enables validated learning about customers. NOT a half-built product. NOT version 1.0 with fewer features. An MVP tests a specific hypothesis with the minimum investment required. Frank Robinson (2001) coined the term; Eric Ries (2011) popularized it.

**Metric Tree:** A hierarchical decomposition of a high-level metric into its component parts. Example: Revenue = Users x Conversion Rate x ARPU. Each level reveals different levers for improvement and different teams responsible.

### N

**North Star Metric (NSM):** The single metric that best captures the core value the product delivers to customers. Criteria: it reflects customer value, it leads to revenue, and it is measurable. Examples: Airbnb (Nights Booked), Spotify (Time Spent Listening), Slack (Messages Sent).

**Net Promoter Score (NPS):** A survey-based metric: "How likely are you to recommend this product?" on a 0-10 scale. Promoters (9-10) minus Detractors (0-6) = NPS. Range: -100 to +100. Useful as a directional signal but insufficient as a sole product metric.

### O

**OKR (Objectives and Key Results):** Goal-setting framework by Andy Grove (Intel), popularized by John Doerr at Google. Objective: qualitative, inspiring, time-bound. Key Results: quantitative, measurable, specific. Good OKRs are ambitious (70% achievement = success), not sandbagged.

**Opportunity Solution Tree (OST):** Teresa Torres's framework connecting a desired outcome to opportunities (customer pain points/needs) to solutions to experiments. Ensures every solution is traceable to a customer opportunity, and every opportunity is traceable to a business outcome.

**Opportunity Scoring:** Prioritization method from the Outcome-Driven Innovation (ODI) framework by Anthony Ulwick. Score = Importance + max(Importance - Satisfaction, 0). Identifies overserved, underserved, and appropriately served needs.

### P

**PMF (Product-Market Fit):** The degree to which a product satisfies strong market demand. Sean Ellis's test (2010): survey users "How would you feel if you could no longer use this product?" If >40% say "Very disappointed," you have PMF. Rahul Vohra (Superhuman) refined this into a systematic engine for improving PMF score.

**PLG (Product-Led Growth):** A go-to-market strategy where the product itself is the primary driver of acquisition, activation, and retention. Characteristics: self-serve signup, freemium or free trial, viral or network effects, in-product upsell. Examples: Slack, Dropbox, Figma, Notion.

**PRD (Product Requirements Document):** A document specifying what a product or feature should do and why. Modern PRDs focus on: problem statement, customer evidence, success metrics, scope boundaries, and constraints — NOT on pixel-perfect design or implementation details.

### R

**RICE Score:** Prioritization framework by Intercom: Reach (how many customers affected per quarter) x Impact (1-3 scale) x Confidence (percentage) / Effort (person-months). Produces a comparable score across different initiatives.

**Retention:** The percentage of users who return to the product over time. Measured in cohorts. Types: Day 1/7/30 retention (consumer), monthly/annual retention (SaaS), dollar retention (B2B). The single most important metric for long-term product success.

### S

**Sean Ellis Test:** "How would you feel if you could no longer use [product]?" Response options: Very disappointed, Somewhat disappointed, Not disappointed, N/A. If >40% say "Very disappointed," the product has product-market fit. Sample: survey users who have experienced the core value at least twice in the last two weeks.

**Story Mapping:** Jeff Patton's technique (2014) for organizing user stories along two dimensions: horizontal (user journey steps) and vertical (priority within each step). The top row forms the "walking skeleton" — the minimum path through the product.

### T

**Time to Value (TTV):** The elapsed time between a user signing up and first experiencing the product's core value. Shorter TTV correlates with higher activation and retention. Reducing TTV is almost always the highest-leverage product improvement for new products.

**Two-Way Door / One-Way Door:** Jeff Bezos's decision framework. Two-way door decisions are reversible — make them quickly. One-way door decisions are irreversible (or very costly to reverse) — invest in analysis. Most product decisions are two-way doors that organizations treat as one-way doors, creating unnecessary slowness.

### V

**Value Proposition:** The promise of value to be delivered. Defined by: target customer, problem solved, differentiated solution, and evidence of superiority. A/B tested through messaging experiments and validated through retention metrics.

**Viability Risk:** One of Cagan's four product risks. The risk that the product works for users but not for the business (unsustainable economics, regulatory issues, ethical concerns). Addressed through business model validation and unit economics analysis.

### W

**Willingness to Pay (WTP):** The maximum price a customer will pay for a product. Measured through: Van Westendorp Price Sensitivity Meter, Gabor-Granger method, conjoint analysis, or direct conversation (carefully structured to avoid bias). Essential input to pricing strategy.

---

## Acronym Reference

| Acronym | Full Term |
|---------|-----------|
| AARRR | Acquisition, Activation, Retention, Revenue, Referral |
| API | Application Programming Interface |
| ARPU | Average Revenue Per User |
| B2B | Business-to-Business |
| B2C | Business-to-Consumer |
| CAB | Customer Advisory Board |
| CAC | Customer Acquisition Cost |
| CSAT | Customer Satisfaction Score |
| DAU | Daily Active Users |
| GTM | Go-to-Market |
| ICE | Impact, Confidence, Ease |
| JTBD | Jobs to Be Done |
| KPI | Key Performance Indicator |
| LTV | Lifetime Value |
| MAU | Monthly Active Users |
| MoSCoW | Must, Should, Could, Won't |
| MVP | Minimum Viable Product |
| NPS | Net Promoter Score |
| NSM | North Star Metric |
| ODI | Outcome-Driven Innovation |
| OKR | Objectives and Key Results |
| OST | Opportunity Solution Tree |
| PLG | Product-Led Growth |
| PMF | Product-Market Fit |
| PRD | Product Requirements Document |
| RICE | Reach, Impact, Confidence, Effort |
| SaaS | Software as a Service |
| TTV | Time to Value |
| WAU | Weekly Active Users |
| WTP | Willingness to Pay |

---

## Summary

This glossary defines the canonical vocabulary for all Product Brain operations. Every term has a precise definition grounded in its original source. When in doubt about terminology, this glossary is authoritative. Using shared, precise language prevents the costly misalignments that plague product organizations — where "MVP" means six different things to six different stakeholders, and "validated" ranges from "I think so" to "p < 0.01."
