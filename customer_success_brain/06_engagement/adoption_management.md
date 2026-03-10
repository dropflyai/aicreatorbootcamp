# Adoption Management

## What This Enables

**Decisions it helps make:**
- Which features to prioritize for adoption campaigns based on correlation with retention
- When a customer is "adopted" versus merely "onboarded" (the critical distinction)
- How to sequence feature introduction to maximize time-to-value without overwhelming users
- Where to invest in enablement content versus in-app guidance versus human training

**Mistakes it prevents:**
- Confusing product activation (first login, initial setup) with genuine adoption (habitual value realization)
- Pushing feature adoption breadth when the customer has not achieved depth in core workflows
- Measuring adoption by login frequency rather than by outcome achievement
- Building adoption playbooks that ignore the customer's actual use case and desired outcome
- Treating adoption as a one-time onboarding milestone rather than a continuous lifecycle process

**Outputs it enables:**
- Feature adoption scorecards tied to retention and expansion outcomes
- Time-to-value optimization roadmaps with clear milestone definitions
- Adoption playbooks segmented by customer persona, use case, and engagement tier
- Product stickiness analysis that identifies the features creating switching costs

---

## The Core Insight

Adoption is not a metric -- it is a **state of habitual value realization** where the customer has embedded your product into their workflows so deeply that removing it would create operational pain. The journey from "purchased" to "adopted" follows a predictable arc: Activation > First Value > Habit Formation > Embedded Workflow > Organizational Standard. Each stage has different drivers, different blockers, and different interventions. The CSM's job is to **accelerate this arc** while the customer's organization naturally resists change. Lincoln Murphy defines the appropriate framing: adoption succeeds when customers achieve their **desired outcome** through the product, not when they use features you think are important.

---

## The Adoption Maturity Model

### Five Stages of Adoption

**Stage 1: Activation**
- **Definition:** Account provisioned, initial users logged in, basic configuration complete
- **Signal:** First login by champion + 2 additional users within 7 days of provisioning
- **Blocker:** Technical setup complexity, SSO/integration issues, unclear getting-started path
- **Intervention:** Technical onboarding support, implementation playbook, white-glove setup for high-touch
- **Danger:** Many organizations declare "onboarding complete" at this stage -- but zero value has been delivered

**Stage 2: First Value (the "Aha Moment")**
- **Definition:** Customer completes the core workflow that delivers the primary value proposition
- **Signal:** First successful completion of the job-to-be-done (e.g., first report generated, first automation run, first campaign sent)
- **Blocker:** Complexity of core workflow, data import requirements, lack of training
- **Intervention:** Guided walkthrough, sample data/templates, hands-on training session
- **Critical Metric:** Time-to-First-Value (TTFV) -- the elapsed time from account creation to first value signal
- **Benchmark:** Best-in-class SaaS products achieve TTFV < 24 hours for self-serve, < 14 days for enterprise

**Stage 3: Habit Formation**
- **Definition:** Users return to the product on a regular cadence aligned with the use case frequency
- **Signal:** DAU/WAU ratio > 0.3 for daily-use products; WAU/MAU ratio > 0.4 for weekly-use products
- **Blocker:** Product not integrated into existing workflows, alternative tools still in use, insufficient user training
- **Intervention:** Workflow integration guides, deprecation of legacy tools, ongoing training calendar
- **Key Framework:** BJ Fogg's Behavior Model -- Behavior = Motivation x Ability x Trigger. If adoption stalls, diagnose which of the three is deficient.

**Stage 4: Embedded Workflow**
- **Definition:** Product is integrated with other tools in the customer's stack and is the system of record for its domain
- **Signal:** Active integrations with 2+ other tools, data flows in/out of product, processes documented referencing the product
- **Blocker:** Integration limitations, API gaps, data portability concerns
- **Intervention:** Integration consulting, custom workflow design, solution architecture review

**Stage 5: Organizational Standard**
- **Definition:** Product is mandated or strongly recommended across the organization, with multiple departments using it
- **Signal:** User count growing organically beyond initial buyer's team, executive sponsorship at VP+ level, included in company's technology standards document
- **Blocker:** Organizational politics, competing tools, lack of executive sponsorship
- **Intervention:** Executive business review, organizational change management support, multi-department rollout plan

---

## Feature Adoption Frameworks

### The Breadth vs. Depth Matrix

| | Low Depth | High Depth |
|---|---|---|
| **Low Breadth** | At Risk -- using few features superficially | Power User -- deep in one area but not expanding |
| **High Breadth** | Tourist -- exploring but not committing | Adopted -- deep usage across multiple features |

**Strategic Implications:**
- **At Risk:** Urgent intervention -- has the customer found any value at all?
- **Power User:** Expansion opportunity -- show adjacent features that complement their deep usage
- **Tourist:** Depth intervention -- help them commit to one core workflow before expanding
- **Adopted:** Maintain and grow -- this is the ideal state; focus on expansion and advocacy

### Feature Adoption Correlation Analysis

Not all features are equal. Identify which features correlate with retention:

1. **Pull usage data** for all customers over 12+ months
2. **Tag each customer** as retained or churned
3. **Run correlation analysis** between feature usage and retention
4. **Identify "sticky features"** -- features where adoption correlates with >80% retention
5. **Build adoption campaigns** that drive customers toward sticky features first

**Example Finding:** "Customers who set up 3+ automated workflows within 60 days have a 94% retention rate vs. 61% for those who do not."

This finding becomes the foundation for your adoption playbook: get every customer to 3 automated workflows within 60 days.

### The Adoption Waterfall

Track feature adoption as a funnel:

```
Aware (saw feature in UI or marketing)     100%
  |
Tried (clicked on feature at least once)    60%
  |
Activated (completed first use successfully) 35%
  |
Adopted (used feature 3+ times in 30 days)  18%
  |
Habitual (uses feature weekly/as intended)   12%
```

Each drop-off point requires a different intervention:
- Aware > Tried: Improve discoverability (in-app tooltips, feature announcements)
- Tried > Activated: Reduce friction (simplify first-run experience, templates)
- Activated > Adopted: Build habit (reminders, showing value of repeated use)
- Adopted > Habitual: Integrate into workflow (automations, integrations, team features)

---

## Usage Analytics for Adoption

### Key Metrics

| Metric | Definition | Target | Why It Matters |
|--------|-----------|--------|----------------|
| Time-to-First-Value (TTFV) | Days from provisioning to first value signal | <14 days (enterprise) | Strongest predictor of long-term adoption |
| DAU/MAU Ratio | Daily active users / Monthly active users | >0.3 (daily products) | Measures habit strength |
| Feature Breadth Score | % of available features used by account | >40% of relevant features | Indicates depth of product embedding |
| Adoption Depth Index | Weighted score of feature usage frequency | Varies by product | Measures quality of adoption |
| User Activation Rate | % of licensed users who reach first value | >80% within 30 days | Identifies shelfware risk |
| Expansion Readiness | Score combining usage ceiling hits + growth signals | Tier-specific threshold | Predicts upsell timing |

### Cohort Analysis for Adoption

Track adoption metrics by cohort (signup month) to identify:
- **Improving or declining onboarding effectiveness** over time
- **Seasonal patterns** in adoption (e.g., Q4 implementations stall during holidays)
- **Impact of product changes** on adoption trajectories
- **Segment differences** (enterprise vs. mid-market vs. SMB adoption curves)

---

## Adoption Playbooks

### Playbook Structure

Every adoption playbook should contain:

1. **Trigger:** What event initiates this playbook? (e.g., customer reaches Stage 2 but stalls)
2. **Objective:** What adoption state should the customer reach?
3. **Timeline:** Expected duration from trigger to objective
4. **Actions:** Specific steps, ordered by engagement tier
5. **Content:** Email templates, training materials, in-app messages
6. **Escalation:** What happens if the playbook does not achieve the objective?
7. **Success Criteria:** How do you know the playbook worked?

### Example: "Core Workflow Adoption" Playbook

**Trigger:** Customer activated (Stage 1) but has not achieved first value (Stage 2) within 14 days
**Objective:** Customer completes core workflow and reaches Stage 2
**Timeline:** 14 days from trigger

| Day | Tech-Touch | Low-Touch | Mid-Touch | High-Touch |
|-----|-----------|-----------|-----------|------------|
| 1 | In-app tooltip highlighting core workflow | Email: "Get started with [core feature]" | CSM email + link to training video | CSM call: "Let's walk through your first [workflow]" |
| 3 | Email with video tutorial | In-app checklist emphasis | CSM follows up if no progress | CSM + SE joint session if technical blocker |
| 7 | Email: "Teams like yours typically start with..." | CSM call if no progress | CSM call: diagnose blockers | Daily Slack check-in |
| 14 | Escalation: flag for human review | Escalation: CSM manager review | Escalation: executive outreach | Escalation: VP CS + account executive involved |

---

## Time-to-Value Optimization

### The TTV Decomposition Framework

Break time-to-value into its component stages and optimize each:

```
Total TTV = Contract-to-Kickoff + Kickoff-to-Setup + Setup-to-Data + Data-to-First-Use + First-Use-to-Value
```

| Stage | Typical Duration | Optimization Lever |
|-------|-----------------|-------------------|
| Contract-to-Kickoff | 5-15 days | Automate scheduling, pre-kickoff questionnaire |
| Kickoff-to-Setup | 7-30 days | Pre-built templates, SSO auto-config, sandbox environments |
| Setup-to-Data | 3-14 days | Data import wizards, API connectors, sample data |
| Data-to-First-Use | 1-7 days | Guided walkthroughs, starter templates, quick-win workflows |
| First-Use-to-Value | 1-14 days | Value realization dashboard, outcome tracking, benchmarks |

**The 80/20 Rule of TTV:** Usually 80% of TTV is consumed by non-value-adding activities (waiting for IT approvals, data migration delays, stakeholder scheduling). Optimize the waiting, not just the doing.

---

## Product Stickiness Analysis

### What Creates Switching Costs

Products become sticky through five mechanisms:

1. **Data Gravity:** The more data stored in your product, the harder it is to leave (CRMs, analytics platforms)
2. **Workflow Integration:** Deep integration with adjacent tools creates a web of dependencies
3. **Organizational Knowledge:** Team expertise, custom configurations, internal documentation
4. **Network Effects:** Value increases as more people in the organization (or ecosystem) use the product
5. **Process Dependency:** Business processes redesigned around your product's capabilities

### Measuring Stickiness

**Stickiness Score = f(Data Volume, Integration Count, User Count, Process Dependency, Customization Depth)**

Track stickiness over time. Increasing stickiness correlates with:
- Higher renewal rates (typically >95% when stickiness score is in top quartile)
- Higher expansion revenue (sticky customers expand 2-3x more)
- Lower price sensitivity at renewal
- Higher advocacy (sticky customers become references)

---

## Failure Modes

1. **Vanity Adoption Metrics:** Tracking logins and page views instead of meaningful workflow completions. A customer who logs in daily but never completes their core job-to-be-done is not adopted.

2. **Feature Dumping:** Pushing customers to adopt every feature simultaneously instead of sequencing adoption around their specific use case and desired outcome.

3. **Ignoring User Segmentation:** Treating the admin, the power user, and the occasional viewer as the same persona with the same adoption needs.

4. **One-and-Done Training:** Providing initial training during onboarding and never following up. Adoption requires ongoing reinforcement as users encounter new scenarios and as the product evolves.

5. **Adoption Without Outcomes:** Driving feature usage without connecting it to business outcomes the customer cares about. The customer's executive does not care that their team used 14 features; they care that cycle time decreased by 30%.

6. **Ignoring the Non-User:** Licensed users who never log in represent both wasted spend (which the customer will notice at renewal) and missed adoption opportunity. Active user rate must be tracked.

---

## The Operator's Framework

1. **Define "adopted" for your product:** What specific behaviors indicate that a customer has embedded your product into their workflows? Be precise -- "uses the product regularly" is not a definition.
2. **Map the adoption journey:** Identify the five stages (Activation through Organizational Standard) and define the signals for each.
3. **Run feature-retention correlation analysis:** Identify which features are "sticky" and correlate with retention.
4. **Build the adoption waterfall:** Track Aware > Tried > Activated > Adopted > Habitual for each key feature.
5. **Measure Time-to-First-Value:** Decompose TTV into stages and identify the biggest bottleneck.
6. **Create segment-specific playbooks:** Different personas, use cases, and engagement tiers need different adoption paths.
7. **Instrument adoption tracking:** Ensure your product analytics and CS platform capture the signals defined above.
8. **Review and iterate monthly:** Which cohorts are adopting faster? Which playbooks are working? Where are customers stalling?
9. **Connect adoption to business outcomes:** Always frame adoption progress in terms of the customer's desired outcome, not your feature checklist.

---

## Summary

**Key Principles:**
- Adoption is a **state of habitual value realization**, not a one-time onboarding milestone
- **Time-to-First-Value is the single most important adoption metric** -- it predicts long-term retention more reliably than any other signal
- **Not all features are equal** -- identify sticky features through correlation analysis and drive adoption of those first
- The **Breadth vs. Depth matrix** reveals whether customers are truly adopted or merely exploring
- **Product stickiness** is the ultimate adoption outcome -- when switching costs are high, retention becomes near-automatic
- Adoption playbooks must be **segmented by persona, use case, and engagement tier** -- one playbook does not fit all
- The **adoption waterfall** (Aware > Tried > Activated > Adopted > Habitual) provides a diagnostic framework for identifying where customers stall and what intervention is needed
