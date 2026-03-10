# Packaging Design — Good-Better-Best, Feature Allocation, and Upgrade Paths

## Overview

Pricing packaging is the art and science of structuring what customers buy. While
pricing strategy determines how much to charge, packaging determines what the customer
receives at each price point. Good packaging enables second-degree price discrimination
(customers self-select into the tier that matches their willingness to pay), maximizes
revenue capture across segments, creates natural upgrade paths, and reduces decision
friction. This module covers the Good-Better-Best framework, feature allocation
methodology, usage-based components, per-seat vs. per-account models, upgrade path
design, free tier strategy, and plan comparison page design.

---

## 1. Good-Better-Best Framework

### Why Three Tiers?

```
PSYCHOLOGY OF THREE:

  One option:   No comparison; customer asks "Is this worth it?"
  Two options:  Binary choice; often defaults to cheaper (loss aversion)
  Three options: Anchor effect; middle option becomes "natural" choice
  Four+ options: Decision paralysis; conversion drops

  RESEARCH:
    Simonson & Tversky (1992) demonstrated "extremeness aversion":
    When three options are presented, the middle option is chosen
    disproportionately because it avoids the "risk" of choosing
    the cheapest (too little) or most expensive (too much).

  The middle tier is typically the target tier — the one you want
  most customers to choose.
```

### The Three Tiers

```
GOOD (Starter / Basic / Free):
  Purpose: Remove barriers to entry; acquire customers
  Target: Price-sensitive buyers, small teams, evaluators
  Features: Core functionality; enough to solve the primary problem
  Pricing: Lowest price (or free)
  Margin: Lowest (may be negative for free tier)

BETTER (Pro / Professional / Growth):
  Purpose: Capture majority of revenue; the "sweet spot"
  Target: Growth-stage companies, serious users, core ICP
  Features: All Good features + power features + team features
  Pricing: 2-3x the Good tier price
  Margin: Highest (most customers, best margin per customer)

BEST (Enterprise / Business / Scale):
  Purpose: Capture maximum value from largest customers
  Target: Large organizations, high-usage, compliance requirements
  Features: All Better features + enterprise features + customization
  Pricing: 3-5x the Better tier price (or custom pricing)
  Margin: High per-account (lower margin % but higher absolute margin)
```

### Tier Naming Conventions

| Pattern | Good | Better | Best | Best For |
|---------|------|--------|------|----------|
| **Stage** | Starter | Growth | Scale | SaaS, aligned with customer maturity |
| **Size** | Solo | Team | Enterprise | Team-centric products |
| **Capability** | Basic | Pro | Enterprise | Feature-centric products |
| **Persona** | Individual | Business | Enterprise | Segment-centric |
| **Descriptive** | Free | Plus | Premium | Consumer/prosumer |

---

## 2. Feature Allocation Methodology

### The Feature Allocation Problem

The most critical packaging decision is which features go in which tier. Feature
allocation directly determines conversion rates, upgrade triggers, and revenue.

### Feature Allocation Framework

```
STEP 1: LIST ALL FEATURES
  Create a comprehensive list of every product feature

STEP 2: CATEGORIZE EACH FEATURE

  CATEGORY A: TABLE STAKES (must be in all tiers, including free)
    Features every user needs to get basic value
    Without these, the product is not usable
    Example: User login, basic dashboard, data entry, export

  CATEGORY B: GROWTH DRIVERS (include in Better tier)
    Features that power users and teams need
    These create the upgrade trigger from Good to Better
    Example: Advanced reporting, team collaboration, integrations

  CATEGORY C: ENTERPRISE REQUIREMENTS (include in Best tier)
    Features large organizations require
    These create the upgrade trigger from Better to Best
    Example: SSO/SAML, audit logs, custom roles, SLA, dedicated support

  CATEGORY D: ADD-ONS (available for separate purchase)
    Features with high value for specific segments
    Not appropriate for tier inclusion (too niche or too expensive)
    Example: Premium support, professional services, custom integrations

STEP 3: VALIDATE WITH DATA
  - Survey customers: "Which features would you pay more for?"
  - Analyze usage: "Which features are used by highest-value customers?"
  - Competitive analysis: "Which features do competitors gate?"
  - Conjoint analysis: "What is the WTP for each feature?"

STEP 4: TEST AND ITERATE
  - Monitor conversion rates by tier
  - Monitor upgrade triggers (what causes upgrades?)
  - Adjust allocation quarterly based on data
```

### Feature Allocation Matrix

```
Feature             | Good | Better | Best | Add-On | Allocation Rationale
────────────────────┼──────┼────────┼──────┼────────┼─────────────────────
Core workflow       |  ✓   |   ✓    |  ✓   |        | Table stakes
Basic reporting     |  ✓   |   ✓    |  ✓   |        | Table stakes
Advanced analytics  |      |   ✓    |  ✓   |        | Growth driver
Team collaboration  |      |   ✓    |  ✓   |        | Growth driver (seat expansion)
API access          |      |   ✓    |  ✓   |        | Growth driver (technical users)
Custom branding     |      |   ✓    |  ✓   |        | Growth driver
SSO / SAML          |      |        |  ✓   |        | Enterprise requirement
Audit logs          |      |        |  ✓   |        | Enterprise requirement
Custom roles        |      |        |  ✓   |        | Enterprise requirement
Dedicated support   |      |        |  ✓   |        | Enterprise requirement
SLA guarantee       |      |        |  ✓   |        | Enterprise requirement
Priority support    |      |        |      |   ✓    | High-value niche
Professional svc    |      |        |      |   ✓    | High-value niche
Custom integration  |      |        |      |   ✓    | High-value niche
```

---

## 3. Usage-Based Components

### Value Metrics

A value metric is the unit of consumption that pricing is based on. The ideal value
metric scales with the value the customer receives.

```
COMMON VALUE METRICS:

  Per-Seat:           Users, members, agents
  Per-Usage:          API calls, messages, events, transactions
  Per-Storage:        GB, TB of data stored
  Per-Record:         Contacts, customers, leads
  Per-Feature:        Modules, add-ons activated
  Per-Outcome:        Successful outcomes, conversions, revenue influenced
  Flat Rate:          Single price regardless of usage

VALUE METRIC SELECTION CRITERIA:
  1. ALIGNED WITH VALUE: Does more of this metric = more value for customer?
     API calls: Yes (more calls = more integration value)
     Users: Partially (not all users derive equal value)
     Flat rate: No alignment (same price regardless of value)

  2. PREDICTABLE: Can the customer predict their cost?
     Per-seat: Highly predictable (they know team size)
     Per-API-call: Less predictable (usage varies)

  3. SCALABLE: Does revenue grow as customer grows?
     Per-seat: Yes (more employees = more seats)
     Flat rate: No (same price regardless of growth)

  4. TRACKABLE: Can you measure it reliably?
     Storage: Easy (GB is objective)
     "Value delivered": Hard (subjective, hard to measure)
```

### Hybrid Pricing Model

```
HYBRID: BASE + USAGE

  Base: Fixed per-month platform fee (covers infrastructure, support)
  Usage: Variable based on consumption (scales with value)

  EXAMPLE:
    Base: $49/month (includes 5 users, 10K API calls, 10GB)
    Additional users: $10/user/month
    Additional API calls: $0.001/call beyond 10K
    Additional storage: $2/GB beyond 10GB

  WHY HYBRID WORKS:
    - Base provides predictable revenue (business stability)
    - Usage captures expansion revenue (growth alignment)
    - Customer pays more as they get more value (fairness)
    - Reduces "shelfware" (customer uses what they pay for)
```

---

## 4. Per-Seat vs. Per-Account Pricing

### Per-Seat (Per-User) Pricing

```
MECHANICS:
  Price = Base plan price + (Per-seat rate * Number of users)

ADVANTAGES:
  + Natural expansion revenue (company hires → more seats)
  + Easy for customers to understand
  + Linear relationship between team size and cost
  + Predictable revenue growth

DISADVANTAGES:
  - Creates "seat hoarding" (sharing logins to avoid cost)
  - Penalizes collaboration (adding users costs more)
  - May not correlate with value (not all users equal)
  - Enterprise negotiations focus on volume discounts

WHEN TO USE:
  - Product value increases with number of users
  - Collaboration is a core product feature
  - Users have distinct accounts and data
  - Market convention is per-seat (CRM, project management)
```

### Per-Account (Flat Rate) Pricing

```
MECHANICS:
  Price = Fixed monthly fee regardless of user count

ADVANTAGES:
  + Encourages adoption (no cost to add users)
  + Simple to understand and budget
  + No login sharing incentive
  + Maximizes product stickiness (more users = higher switching cost)

DISADVANTAGES:
  - Revenue does not scale with customer growth
  - Large customers subsidized by small customers
  - May attract disproportionately large users on small plans
  - Harder to justify enterprise pricing

WHEN TO USE:
  - Value does not scale linearly with users
  - Maximizing adoption is more important than per-seat revenue
  - Product is account-level (one team, shared workspace)
  - You have other expansion levers (usage, features)
```

---

## 5. Upgrade Path Design

### Designing Natural Upgrade Triggers

```
UPGRADE FROM GOOD TO BETTER:

  TRIGGER 1: Team growth
    "You've reached the 5-user limit on your Starter plan.
     Upgrade to Pro for unlimited users."

  TRIGGER 2: Feature limitation
    "Advanced reporting is available on the Pro plan.
     Upgrade to unlock custom dashboards and exports."

  TRIGGER 3: Usage limit
    "You've used 80% of your storage allocation this month.
     Upgrade for 10x more storage."

  TRIGGER 4: Value demonstration
    "You've saved 40 hours this month with Starter.
     Pro customers save an average of 120 hours/month."

UPGRADE FROM BETTER TO BEST:

  TRIGGER 1: Compliance requirement
    "Your IT team requires SSO? Enterprise includes SAML SSO."

  TRIGGER 2: Scale limitation
    "For teams over 100 users, Enterprise provides dedicated
     infrastructure and priority support."

  TRIGGER 3: Security requirement
    "Enterprise includes audit logs, role-based access control,
     and data residency options."
```

### Upgrade Friction Reduction

| Friction Point | Reduction Strategy |
|---------------|-------------------|
| Data migration | None needed; same account, more features |
| Billing change | Prorated; no double-billing |
| Learning curve | Features simply appear; no retraining |
| Contract lock-in | Upgrade anytime; no penalty |
| Decision complexity | Clear feature comparison; one-click upgrade |

---

## 6. Free Tier Design

### Free Tier Strategies

| Strategy | Description | Example |
|----------|------------|---------|
| **Freemium** | Permanently free with limited features | Slack Free, Zoom Basic |
| **Free trial** | Full features, limited time (14-30 days) | Most B2B SaaS |
| **Reverse trial** | Full features → auto-downgrade to free | Airtable, Loom |
| **Usage-limited** | Free up to N units; pay above | Mailchimp (500 contacts free) |
| **Open source** | Core is free; premium features paid | GitLab CE vs EE |

### Free Tier Design Principles

```
PRINCIPLE 1: ENOUGH TO SOLVE THE INITIAL PROBLEM
  The free tier must deliver real value. If it doesn't,
  users won't experience the product and won't upgrade.

PRINCIPLE 2: NOT ENOUGH TO SOLVE THE GROWING PROBLEM
  As the customer's needs grow, they should naturally hit
  limitations that drive upgrade. Limits should feel like
  growth constraints, not arbitrary restrictions.

PRINCIPLE 3: LOW MARGINAL COST
  Free users must be cheap to serve. No phone support,
  no dedicated infrastructure, no human touch.

PRINCIPLE 4: VIRAL POTENTIAL
  Free users should introduce the product to others.
  "Powered by [Product]" branding, sharing features,
  collaboration invites.

FREE TIER METRICS:
  - Free-to-paid conversion rate: Target 2-5% for consumer, 5-15% for B2B
  - Time to convert: Average days from signup to paid (target: <30 days)
  - Viral coefficient: New free signups per existing free user
  - Cost per free user: Total free user cost / free user count
```

---

## 7. Plan Comparison Page Design

### Comparison Page Best Practices

```
LAYOUT:
  Three columns (one per tier), with the recommended tier highlighted
  Annual pricing shown by default (with toggle to monthly)
  Feature comparison table below tier summaries

INFORMATION HIERARCHY:
  1. Tier names and prices (largest, most prominent)
  2. Key differentiating features (3-5 bullets per tier)
  3. CTA button ("Start free trial" / "Get started" / "Contact sales")
  4. Full feature comparison table (expandable or below fold)
  5. FAQ section (addresses common pricing questions)

PRICING DISPLAY:
  Show: "$49/mo" (monthly equivalent of annual price)
  Annotation: "billed annually" or "billed at $588/year"
  Toggle: Annual / Monthly (annual preselected, showing savings)
  Savings: "Save 20% with annual billing" (on annual toggle)

RECOMMENDED TIER:
  Highlight the target tier (usually middle) with:
  - "Most Popular" or "Recommended" badge
  - Slightly larger or colored column
  - Different CTA color (more prominent)

ENTERPRISE TIER:
  Show limited feature list (highlights only)
  CTA: "Contact Sales" (not self-serve)
  Include: "Custom pricing" instead of specific price
```

### Feature Comparison Table Design

```
GOOD PRACTICE:
  ✓ Group features by category (not alphabetical)
  ✓ Use checkmarks and clear labels
  ✓ Highlight differences (not similarities)
  ✓ Limit to 15-25 features (not exhaustive list)
  ✓ Use tooltips for feature descriptions
  ✓ Make upgrade CTAs available at multiple scroll points

BAD PRACTICE:
  ✗ 50+ line feature comparison (overwhelming)
  ✗ Technical jargon without explanation
  ✗ Features that exist in all tiers (wastes space)
  ✗ No visual hierarchy (everything looks the same)
  ✗ Hidden limitations in fine print
```

---

## 8. Packaging Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| **Too many tiers** (5+) | Decision paralysis; confused customers | Consolidate to 3 + enterprise |
| **Tiers too similar** | No clear reason to upgrade | Increase differentiation between tiers |
| **Feature gating that frustrates** | "Why can't I export my own data?" | Gate premium features, never basic functionality |
| **Hidden limitations** | Customer discovers limits after purchase | Be transparent about all limits on pricing page |
| **Price anchoring backward** | Cheapest plan shown first | Show most expensive first (anchoring) or highlight middle |
| **No free trial or free tier** | High friction to start | Offer trial or limited free tier |
| **Punishing growth** | Per-seat model discourages adding users | Volume discounts or per-account tiers for large teams |

---

## References

1. Ramanujam, M., & Tacke, G. (2016). "Monetizing Innovation." Wiley.
2. Nagle, T., & Muller, G. (2017). "The Strategy and Tactics of Pricing."
3. Simonson, I., & Tversky, A. (1992). "Choice in Context." JMR.
4. ProfitWell (2023). "The Anatomy of SaaS Pricing Pages."
5. OpenView Partners (2024). "SaaS Pricing Benchmarks."
6. Price Intelligently (2023). "The SaaS Pricing Strategy Guide."

---

**This document is authoritative for packaging design within the Pricing Brain.**
