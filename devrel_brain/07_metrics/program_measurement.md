# Program Measurement — Community Health, Content Performance, and Event ROI

## What This Enables

DevRel operates across multiple program types — community, content, events,
documentation, education — each with distinct inputs, outputs, and impact models.
Aggregate metrics (total developer count, total page views) obscure which programs
are working and which are consuming resources without impact. Program-level
measurement isolates the performance of each DevRel investment, enabling resource
reallocation from low-performing programs to high-performing ones. Google's DevRel
team measures each program independently with quarterly OKRs. Twilio measures the
ROI of every conference sponsorship against a cost-per-activation benchmark. This
module codifies the measurement frameworks for each major DevRel program type.

---

## The Core Insight

Every DevRel program has a theory of change: a causal hypothesis about how inputs
(time, money, effort) translate into outputs (content, events, community interactions)
which produce outcomes (activation, retention, revenue). Measurement without a
theory of change produces meaningless dashboards. Measurement with a theory of
change produces actionable intelligence. The discipline is not in collecting data —
it is in defining the causal model before collecting anything, and then being honest
when the data contradicts the hypothesis.

---

## Community Health Measurement

### Orbit Model Metrics

The Orbit Model (Josh Dzielak, Orbit) measures community members by engagement
depth rather than activity frequency:

**Orbit Level 1 (Observe):** Read content, lurk in channels, never interact.
**Orbit Level 2 (Participate):** React to posts, ask questions, attend events.
**Orbit Level 3 (Contribute):** Answer questions, create content, submit PRs.
**Orbit Level 4 (Lead):** Organize events, mentor others, champion the platform.

### Community Health Scorecard

| Dimension | Metric | Healthy | Warning | Critical |
|-----------|--------|---------|---------|----------|
| Growth | New members per month | Growing | Flat | Declining |
| Activation | % of new members who post within 7 days | > 20% | 10-20% | < 10% |
| Engagement | Daily active members / total members | > 5% | 2-5% | < 2% |
| Support | % of questions answered within 24 hours | > 80% | 60-80% | < 60% |
| Self-Service | Community answers / total answers | > 50% | 30-50% | < 30% |
| Retention | 90-day member retention | > 40% | 20-40% | < 20% |
| Sentiment | Positive sentiment ratio | > 70% | 50-70% | < 50% |
| Toxicity | Code of conduct incidents per month | < 3 | 3-10 | > 10 |

### Community Value Quantification

To justify community investment to executives, quantify the value of community
interactions:

**Support deflection value:** Each community-answered question represents a support
ticket avoided. At $25-50 per support ticket, calculate: (community answers per
month) x (ticket cost) = monthly support deflection value.

**Content generation value:** Each community-generated tutorial, blog post, or
video has a creation cost equivalent. At $500-2,000 per piece of content,
calculate: (community content pieces per month) x (equivalent creation cost) =
monthly content value.

**Acquisition value:** Developers who join through community referral have a $0
acquisition cost. Calculate: (community-referred signups per month) x (average
paid acquisition cost) = monthly acquisition value saved.

---

## Content Performance Measurement

### Content Scorecard

| Metric | Tutorials | Blog Posts | Documentation | Videos |
|--------|-----------|-----------|---------------|--------|
| Page views | Monthly trend | Monthly trend | Monthly trend | View count |
| Time on page | 5-15 min | 3-8 min | < 2 min (found answer) | Watch time |
| Completion rate | > 60% | N/A | N/A | > 40% |
| Bounce rate | < 40% | < 50% | < 60% | N/A |
| Code sample copies | Per tutorial | Per post | Per page | N/A |
| Satisfaction | > 80% positive | > 75% positive | > 80% positive | Like ratio > 90% |
| Signups attributed | Direct tracking | Attribution model | Attribution model | UTM tracking |

### Content Decay Tracking

Technical content decays as underlying technology changes. Track content freshness:

| Age | Status | Action Required |
|-----|--------|----------------|
| 0-90 days | Fresh | None |
| 90-180 days | Review | Quick accuracy check |
| 180-365 days | Aging | Full review and update |
| > 365 days | Stale | Major rewrite or retire |

**Automated staleness alerts:** Flag content that has not been reviewed within its
freshness window. Track the percentage of content library that is "fresh" vs.
"stale" as a program health metric.

### Content ROI Calculation

```
Content Investment = Author time (hours x hourly rate) + Review time + Design + Promotion
Content Return = Attributed signups x (Customer LTV x Conversion rate)
Content ROI = (Content Return - Content Investment) / Content Investment
```

**Benchmark:** Well-performing developer content achieves 5-20x ROI over 12 months,
driven by the compounding nature of search-indexed content.

---

## Event ROI Measurement

### Event Types and Metrics

**Conference Talks:**

| Metric | Source | Target |
|--------|--------|--------|
| Attendance | Room count / streaming views | 50+ live, 500+ recorded |
| Talk rating | Post-talk survey | > 4.0 / 5.0 |
| Social engagement | Post-talk mentions, shares | 10+ organic mentions |
| Follow-up actions | QR code scans, doc visits | > 5% of audience |
| Cost per attendee | (Travel + time + conference fee) / audience | < $50 |

**Hackathons:**

| Metric | Source | Target |
|--------|--------|--------|
| Registrations | Event platform | Target depends on format |
| Participation rate | Active teams / registrations | > 50% |
| Project submissions | Submission platform | > 30% of teams |
| Post-hackathon activation | Product analytics | > 20% of participants |
| Cost per activated developer | Total cost / activated devs | < $200 |

**Workshops:**

| Metric | Source | Target |
|--------|--------|--------|
| Attendance | Registration vs. actual | > 70% show rate |
| Completion rate | In-workshop tracking | > 80% |
| Post-workshop activation | Product analytics | > 40% |
| NPS | Post-workshop survey | > 60 |
| Cost per completed participant | Total cost / completions | < $100 |

**Meetups:**

| Metric | Source | Target |
|--------|--------|--------|
| RSVP to attendance ratio | Event platform | > 60% |
| Return attendance rate | Event platform | > 30% attend 2+ meetups |
| Community engagement post-meetup | Community analytics | Measurable bump in activity |
| Cost per attendee | Total cost / attendees | < $30 |

### Event Portfolio Optimization

Track the cost-per-activated-developer across all event types and reallocate
budget toward the highest-performing formats:

```
Event Type       | Cost/Activated Dev | Volume | Investment Recommendation
Hackathons       | $150              | Medium  | Increase (high engagement)
Workshops        | $80               | Low     | Maintain (high conversion)
Conference Talks | $120              | High    | Maintain (awareness + activation)
Meetups          | $40               | Low     | Increase (low cost, high retention)
Webinars         | $20               | High    | Increase (scalable, low cost)
```

---

## Documentation Effectiveness

### Documentation Health Metrics

| Metric | Source | Target |
|--------|--------|--------|
| Page satisfaction (thumbs up/down) | In-page widget | > 80% positive |
| Search success rate | Search analytics | > 70% find relevant result |
| Support ticket volume (doc-covered topics) | Support analytics | Declining MoM |
| Code sample accuracy | CI test results | 100% pass rate |
| Documentation coverage | API spec vs. doc pages | 100% of endpoints documented |
| Freshness | Last-updated dates | No page > 90 days without review |
| Time on page (reference) | Analytics | < 2 min (found the answer quickly) |
| Time on page (tutorials) | Analytics | 5-15 min (engaged learning) |

### Documentation Impact Quantification

**Support deflection ratio:** (Documentation page views for topic X) / (Support
tickets for topic X). A healthy ratio is > 100:1 (100 doc views per support ticket).
Topics with ratios below 50:1 indicate documentation that is not answering the
developer's question.

---

## Developer Satisfaction

### Survey Design

**Frequency:** Quarterly (maximum). Over-surveying causes survey fatigue and
declining response rates.

**Core Questions (always include):**
1. Overall satisfaction (1-5 scale)
2. Net Promoter Score ("How likely to recommend? 0-10")
3. Biggest friction point (open text)
4. Most valuable resource (open text)
5. What should we improve? (open text)

**Behavioral Proxies (between surveys):**
- Retention rate (satisfied developers stay)
- Usage frequency (satisfied developers use more)
- Community engagement (satisfied developers contribute)
- Referral rate (satisfied developers recommend)

---

## Failure Modes

1. **The Dashboard Graveyard** — Building elaborate dashboards that no one reviews.
   Measurement is only valuable if it drives decisions. Every metric must have an
   owner and a decision it informs.

2. **The Precision Illusion** — Reporting metrics to false precision (e.g., "content
   ROI is 847.3%"). DevRel measurement is inherently approximate. Report ranges
   and trends, not precise figures.

3. **The Isolated Metric** — Measuring one program in isolation from the journey.
   A blog post's value is not just its page views — it is the activation it drives
   downstream. Measurement must connect programs to journey progression.

4. **The Measurement Tax** — Spending so much time measuring and reporting that
   there is no time left for the actual DevRel work. Automate data collection;
   limit reporting to monthly cadence with quarterly deep-dives.

5. **The Goodhart's Law Trap** — When a metric becomes a target, it ceases to be
   a good metric. If advocates are measured on blog post count, they will publish
   shallow content. Measure outcomes (activations), not outputs (posts).

---

## The Operator's Framework

When designing or evaluating DevRel program measurement:

1. **Define the theory of change** for each program before collecting data
2. **Measure at the program level** — aggregate metrics obscure performance
3. **Connect programs to the journey** — every program must show how it advances
   developers through the AAARRRP funnel
4. **Quantify value in dollars** — support deflection, content equivalence,
   acquisition cost savings
5. **Automate collection** — manual data collection does not scale
6. **Report monthly, deep-dive quarterly** — enough cadence to act, not so much
   that measurement displaces work
7. **Kill underperforming programs** — measurement is only valuable if it drives
   resource reallocation

---

## Summary

Program measurement transforms DevRel from a faith-based investment into a
data-driven discipline. Each program type — community, content, events,
documentation, education — has distinct metrics, benchmarks, and ROI models.
The discipline is not in collecting data but in defining causal models before
collection and being honest when data contradicts hypotheses. The goal is not
a perfect dashboard but a clear answer to: "Which programs are advancing
developers through the journey, and which should be reallocated?"

---

**This module governs all program measurement decisions in the DevRel Brain.**
**Program performance is measured against the benchmarks defined here.**
