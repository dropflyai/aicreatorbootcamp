# DevRel Metrics — AAARRRP Framework, Developer Journey, and Attribution

## What This Enables

DevRel metrics solve the most persistent problem in developer relations: proving
that the work matters. Without rigorous measurement, DevRel teams are evaluated on
activity (talks given, posts published, events attended) rather than impact (developers
activated, developers retained, revenue influenced). Activity metrics are vanity
metrics — they measure effort, not outcome. Impact metrics are the language that
executives, board members, and CFOs understand. This module codifies the measurement
frameworks, attribution models, and reporting practices that transform DevRel from
a cost center into a measurable growth engine.

---

## The Core Insight

DevRel creates value through a causal chain with multiple steps and significant time
lag: content is published, a developer discovers it, reads documentation, tries the
quickstart, activates, builds in production, expands usage, and eventually generates
revenue. Traditional marketing attribution (last-click, first-click) undervalues
DevRel because the attribution window is too narrow and the touchpoints are too
numerous. The solution is not a better attribution model — it is a developer journey
framework that measures progress through a defined funnel, regardless of which
specific touchpoint caused the progression. The AAARRRP framework provides this
structure.

---

## The AAARRRP Framework

AAARRRP (Awareness, Acquisition, Activation, Retention, Revenue, Referral, Product)
is the standard DevRel metrics framework, adapted from Dave McClure's Pirate Metrics
(AARRR) with additions specific to developer relations.

### Awareness

**Definition:** Developers know your platform exists and understand what problem
it solves.

| Metric | Source | Target |
|--------|--------|--------|
| Documentation unique visitors (monthly) | Analytics | Growing MoM |
| Blog unique visitors (monthly) | Analytics | Growing MoM |
| Social media followers (developer accounts) | Platform analytics | Growing trend |
| Conference talk attendance | Event data | 50+ per talk |
| Brand awareness (unaided recall) | Developer survey | > 10% in target segment |
| Share of voice (SOV) | Social listening | Growing vs. competitors |

### Acquisition

**Definition:** Developers take a deliberate step toward your platform: sign up,
install the SDK, or clone a repository.

| Metric | Source | Target |
|--------|--------|--------|
| New developer signups (monthly) | Product analytics | Growing MoM |
| SDK installs (monthly, by language) | Package registry (npm, PyPI) | Growing MoM |
| GitHub repository clones | GitHub Insights | Growing trend |
| Documentation-attributed signups | Attribution model | > 30% of total |
| Cost per acquired developer | Budget / new devs | < $50 |

### Activation

**Definition:** Developers achieve their first successful outcome on the platform.
This is the time-to-hello-world (TTHW) moment.

| Metric | Source | Target |
|--------|--------|--------|
| Time to first API call (TTHW) | Product analytics | < 5 minutes |
| Quickstart completion rate | Documentation analytics | > 60% |
| First API call success rate | API logs | > 90% |
| Day-1 return rate | Product analytics | > 50% |
| Activation rate (signup to first API call) | Product analytics | > 40% |

### Retention

**Definition:** Developers continue using the platform over time, indicating they
have integrated it into their workflow or product.

| Metric | Source | Target |
|--------|--------|--------|
| Monthly active developers (MAD) | Product analytics | Growing MoM |
| Day-7 retention | Product analytics | > 30% |
| Day-30 retention | Product analytics | > 20% |
| Day-90 retention | Product analytics | > 15% |
| Churn rate (monthly) | Product analytics | < 5% |
| API call frequency (median) | API logs | Stable or growing |

### Revenue

**Definition:** Developers (or their organizations) generate revenue for the
platform through paid usage, subscriptions, or contracts.

| Metric | Source | Target |
|--------|--------|--------|
| Developer-attributed revenue | Revenue analytics | Growing MoM |
| Average revenue per developer (ARPD) | Revenue / active devs | Growing or stable |
| Free-to-paid conversion rate | Product analytics | > 5% |
| Expansion revenue (usage growth) | Revenue analytics | > 120% net dollar retention |
| DevRel-influenced pipeline | CRM attribution | Growing quarterly |

### Referral

**Definition:** Developers actively recommend the platform to other developers,
creating organic growth.

| Metric | Source | Target |
|--------|--------|--------|
| Net Promoter Score (NPS) | Developer survey | > 50 |
| Referral signups | Product analytics | > 10% of total signups |
| Community-generated content (monthly) | Content tracking | Growing MoM |
| Stack Overflow answer activity | SO monitoring | Growing community answers |
| Social mentions (organic, non-staff) | Social listening | Growing trend |

### Product

**Definition:** Developer feedback improves the product, creating a virtuous cycle
between DevRel and Product.

| Metric | Source | Target |
|--------|--------|--------|
| Feature requests from community (monthly) | Issue tracking | Tracked and triaged |
| Bug reports from community (monthly) | Issue tracking | Tracked and resolved |
| Community feedback in roadmap | Product tracking | > 20% of roadmap items |
| Developer satisfaction score (CSAT) | Developer survey | > 4.0 / 5.0 |
| DX-related support ticket reduction | Support analytics | Declining MoM |

---

## Developer Journey Metrics

### Journey Mapping

```
Discover -> Evaluate -> Activate -> Integrate -> Scale -> Advocate
   |           |           |           |          |          |
   v           v           v           v          v          v
 Reads      Reads      Makes       Deploys    Increases  Recommends
 blog      docs       first       to          usage      to peers
 post      & API      API call    production  & scales
```

### Journey Drop-Off Analysis

| Transition | Healthy Rate | Warning | Investigation Triggers |
|-----------|-------------|---------|----------------------|
| Discover -> Evaluate | 10-20% | < 5% | Content quality, SEO effectiveness |
| Evaluate -> Activate | 30-50% | < 20% | Documentation quality, TTHW |
| Activate -> Integrate | 20-40% | < 15% | SDK quality, error messages, support |
| Integrate -> Scale | 50-70% | < 40% | Reliability, performance, pricing |
| Scale -> Advocate | 10-20% | < 5% | Community programs, developer satisfaction |

---

## Attribution Models

### The Attribution Challenge

Developer adoption is a multi-touch, multi-week process. A developer might read a
blog post (Week 1), attend a conference talk (Week 3), browse documentation (Week 4),
ask a Discord question (Week 5), and sign up (Week 5). No single-touch model
captures this accurately.

### Recommended: Multi-Touch Time-Decay

- Attribution window: 90 days
- Decay half-life: 14 days (recent touchpoints weighted 2x per half-life)
- Minimum credit: 5% per touchpoint (early discovery content receives credit)

### DevRel Qualified Leads (DQLs)

Mary Thengvall's DQL framework: a developer who has been identified by DevRel as
having genuine, expressed interest validated through direct interaction.

**DQL Criteria:** Has a specific use case, has decision-making authority or influence,
has expressed intent to evaluate, has been personally engaged by a team member.

---

## Failure Modes

1. **The Vanity Dashboard** — Reporting GitHub stars, Twitter followers, and event
   attendance as primary metrics. These measure awareness at best and mean nothing
   about activation, retention, or revenue.

2. **The Attribution Grab** — Claiming credit for every developer who ever saw
   DevRel content. Overattribution erodes credibility with executives.

3. **The Metric Disconnect** — DevRel reports metrics that do not connect to
   business outcomes. "We published 12 blog posts" is activity. "Blog posts drove
   340 activations and 28 paid conversions" is impact.

4. **The Lagging Indicator Trap** — Measuring only revenue and churn (lagging).
   By the time revenue declines, the root cause happened 6-12 months ago. Lead
   with leading indicators: TTHW, activation rate, community health.

5. **The Survey Fatigue** — Over-surveying developers. One survey per quarter
   maximum. Use behavioral data as proxies between surveys.

---

## The Operator's Framework

When designing or evaluating DevRel metrics:

1. **Adopt the AAARRRP framework** as the organizing structure
2. **Lead with activation metrics** — TTHW and activation rate are the most
   actionable and strongest leading indicators
3. **Use multi-touch attribution** with 90-day windows and time-decay
4. **Report in business terms** — Connect every metric to a business outcome
5. **Separate leading from lagging** — Report both, act on leading indicators
6. **Track the full journey** — Drop-off analysis reveals highest-impact investments

---

## Summary

DevRel metrics exist to answer one question: is this program making developers
more successful, and is that success translating into business outcomes? The
AAARRRP framework provides the structure. Activation metrics (TTHW, quickstart
completion, first API call success rate) are the most actionable because they sit
at the intersection of DevRel effort and business impact. Attribution must be
multi-touch with realistic time windows. The teams that earn executive trust are
the ones that report impact metrics connected to revenue, not activity metrics
connected to effort.

---

**This module governs all DevRel metrics decisions in the DevRel Brain.**
**Program effectiveness is measured against the AAARRRP framework defined here.**
