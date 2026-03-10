# Customer Engagement Models

## What This Enables

**Decisions it helps make:**
- Which engagement model (high-touch, low-touch, tech-touch) to deploy for each customer segment
- When to escalate from automated to human-led engagement
- How to design proactive outreach triggers that prevent churn before signals appear
- Where to invest CSM time for maximum revenue impact per hour spent

**Mistakes it prevents:**
- Over-investing high-touch resources on low-ACV accounts that cannot justify the cost
- Under-investing in strategic accounts where a single CSM call could save $500K in ARR
- Designing engagement cadences based on internal preferences rather than customer outcomes
- Treating all customers identically regardless of lifecycle stage, health, or strategic value
- Confusing activity (number of touchpoints) with engagement (depth of value exchange)

**Outputs it enables:**
- Segment-specific engagement playbooks with clear escalation paths
- Proactive outreach trigger configurations for CS platforms (Gainsight, ChurnZero)
- Executive Business Review (EBR) and QBR design frameworks
- Engagement scoring models that predict renewal and expansion likelihood

---

## The Core Insight

Engagement is not about frequency of contact -- it is about **the density of value exchanged per interaction**. A single 30-minute call that realigns a customer's strategic objectives with your product roadmap delivers more engagement than 12 monthly check-in emails. The goal of an engagement model is to deliver the **right value, to the right person, at the right time, through the right channel** -- and to do so at a cost the business can sustain. Lincoln Murphy's principle applies: the customer's **desired outcome** through an **appropriate experience** is the only valid north star for engagement design.

---

## Engagement Model Taxonomy

### The Four-Tier Framework

**Tier 1: Tech-Touch (Automated / Digital CS)**
- **ACV Range:** $0 - $5K (varies by company economics)
- **Ratio:** 1 CSM : 1,000-5,000+ accounts (or fully automated)
- **Channels:** In-app messages, email sequences, community, webinars, knowledge base
- **Human Intervention:** Exception-based only (escalation triggers)
- **Key Metrics:** Product adoption rate, support ticket volume, NPS response rate
- **Design Principle:** Build systems that deliver value without human labor. Every manual process is a scaling bottleneck.

**Tier 2: Low-Touch (Pooled / One-to-Many)**
- **ACV Range:** $5K - $25K
- **Ratio:** 1 CSM : 200-500 accounts
- **Channels:** Email, webinars, office hours, targeted in-app, occasional 1:1 calls
- **Human Intervention:** Milestone-triggered and health-score-triggered
- **Key Metrics:** Time-to-value, feature adoption breadth, renewal rate
- **Design Principle:** Use data to identify the moments where human intervention has asymmetric impact.

**Tier 3: Mid-Touch (Named CSM)**
- **ACV Range:** $25K - $100K
- **Ratio:** 1 CSM : 30-75 accounts
- **Channels:** Monthly calls, QBRs, email, in-app, light strategic planning
- **Human Intervention:** Scheduled cadence plus reactive/proactive triggers
- **Key Metrics:** NRR, expansion pipeline, executive sponsor engagement
- **Design Principle:** Build relationships deep enough that the customer shares strategic context you cannot observe in product data.

**Tier 4: High-Touch (Strategic / Enterprise)**
- **ACV Range:** $100K+
- **Ratio:** 1 CSM : 5-15 accounts
- **Channels:** Weekly/biweekly calls, QBRs, EBRs, on-site visits, Slack/Teams channels
- **Human Intervention:** Continuous, deeply embedded in customer's operations
- **Key Metrics:** Multi-year NRR, executive relationship depth, product co-development, logo retention
- **Design Principle:** Become an indispensable strategic partner whose departure would create organizational disruption for the customer.

### Hybrid Engagement: The Blended Model

Most mature CS organizations run **hybrid models** where digital engagement serves as the foundation for all tiers, with human engagement layered on top based on segment. The digital layer should handle:
- Onboarding guidance and checklists
- Feature announcement and education
- Usage-based nudges and recommendations
- Health alerts and self-service recovery paths
- Community access and peer learning

Even high-touch accounts benefit from digital engagement that fills gaps between human touchpoints.

---

## Engagement Scoring

### Building a Composite Engagement Score

An engagement score measures the **depth and quality of the customer's interaction** with your product, your team, and your ecosystem. It is distinct from a health score (which predicts retention) though the two are correlated.

**Input Categories:**

| Category | Weight | Signals |
|----------|--------|---------|
| Product Usage | 30-40% | DAU/WAU/MAU, feature breadth, depth of use, session duration |
| Relationship Depth | 20-30% | Meeting attendance, executive sponsor access, multi-threading |
| Communication | 15-20% | Email open/click rates, response times, inbound outreach |
| Community/Education | 10-15% | Webinar attendance, community posts, certification completions |
| Advocacy | 5-10% | Referrals, case studies, G2/Capterra reviews, conference speaking |

**Scoring Methodology:**
1. Normalize each signal to a 0-100 scale within its category
2. Apply category weights to produce a composite score
3. Calibrate against historical outcomes (did score predict renewal/churn?)
4. Adjust weights quarterly based on predictive accuracy
5. Segment scores into bands: Highly Engaged (80+), Engaged (60-79), Neutral (40-59), Disengaged (20-39), Dark (<20)

### The "Going Dark" Problem

The most dangerous engagement signal is **absence of signal**. A customer who stops logging in, stops responding to emails, and stops attending meetings is exhibiting the strongest churn predictor. Build explicit "going dark" triggers:
- No product login in 14 days (for daily-use products)
- No email response in 30 days across 2+ attempts
- Executive sponsor becomes unreachable for 45+ days
- Meeting cancellations exceed 2 consecutive scheduled touchpoints

---

## Proactive Outreach Triggers

### The Trigger Framework

Proactive outreach should be **event-driven, not calendar-driven**. The most effective CS organizations define triggers that initiate specific plays.

**Positive Triggers (Expansion Opportunities):**
| Trigger | Signal | Play |
|---------|--------|------|
| Usage Surge | >30% increase in usage over 2 weeks | "Growth Conversation" -- explore what is driving growth, introduce higher-tier features |
| New Use Case | User accessing previously unused module | "Adoption Deepening" -- offer training, share best practices |
| Champion Promotion | Contact promoted to VP+ | "Executive Alignment" -- congratulate, reframe value at strategic level |
| Renewal Approaching (Healthy) | 90 days before renewal, health score >80 | "Expansion Proposal" -- present multi-year deal with upsell |

**Negative Triggers (Risk Mitigation):**
| Trigger | Signal | Play |
|---------|--------|------|
| Usage Decline | >20% decrease over 3 weeks | "Re-engagement" -- diagnose cause, offer enablement |
| Champion Departure | Primary contact leaves company | "Relationship Rebuild" -- identify new champion, re-establish value narrative |
| Support Spike | >3 tickets in 7 days or any P1 | "Rapid Response" -- CSM joins support resolution, post-mortem meeting |
| Competitor Activity | Login from competitor IP, RFP mention | "Competitive Defense" -- executive outreach, value reinforcement, commercial flexibility |
| Payment Failure | Invoice unpaid >30 days | "Financial Risk" -- CSM + finance joint outreach |

---

## Executive Business Review (EBR) Design

### EBR vs. QBR

| Dimension | QBR | EBR |
|-----------|-----|-----|
| Audience | Day-to-day stakeholders + manager | VP/C-level + champion |
| Frequency | Quarterly | Semi-annually or annually |
| Focus | Operational metrics, adoption, support | Strategic alignment, ROI, roadmap |
| Duration | 45-60 minutes | 60-90 minutes |
| Preparation | 2-4 hours | 8-16 hours |
| Deliverable | Slide deck + action items | Strategic summary + mutual plan |

### EBR Structure (90-Minute Framework)

1. **Opening (5 min):** Thank the executive for time, confirm objectives
2. **Business Context (15 min):** What has changed in their business since last EBR? (Let THEM talk)
3. **Value Delivered (20 min):** ROI metrics, outcomes achieved, benchmarks vs. peers
4. **Adoption & Usage (10 min):** High-level usage trends, not granular feature stats
5. **Strategic Roadmap Alignment (20 min):** Where your product roadmap intersects their strategic priorities
6. **Mutual Success Plan (15 min):** Agree on 3-5 joint objectives for next period
7. **Close (5 min):** Summarize commitments, next steps, express partnership commitment

### EBR Anti-Patterns
- Presenting a product demo instead of business outcomes
- Talking more than 40% of the meeting
- Showing metrics the executive does not care about
- Failing to prepare industry-specific benchmarks
- Not having a clear ask (expansion, case study, referral, executive sponsor renewal)

---

## Engagement Cadence Design

### The Cadence Matrix

Design cadences by combining **lifecycle stage** and **engagement tier**:

| Stage | Tech-Touch | Low-Touch | Mid-Touch | High-Touch |
|-------|-----------|-----------|-----------|------------|
| Onboarding (0-90d) | Daily in-app + weekly email | Weekly email + 2 calls | Weekly call + in-app | 2x/week call + daily Slack |
| Adoption (90-180d) | Weekly email + in-app | Biweekly email + monthly call | Biweekly call + QBR | Weekly call + QBR |
| Maturity (180d-renewal) | Monthly email + in-app | Monthly email + quarterly call | Monthly call + QBR | Biweekly call + QBR + EBR |
| Renewal (60d before) | Email sequence + in-app | 2 calls + email | Weekly calls + exec outreach | Daily engagement + executive negotiation |

### Cadence Calibration Rules
- **Never increase cadence without new value to deliver.** More touchpoints without new insight is harassment.
- **Match cadence to customer's communication preferences.** Some executives prefer monthly email summaries; others prefer weekly Slack updates.
- **Reduce cadence for healthy, mature accounts** to avoid "check-in fatigue" -- but never go fully dark.
- **Increase cadence immediately when health score drops below threshold** -- do not wait for the next scheduled touchpoint.

---

## Failure Modes

1. **The Activity Trap:** Measuring engagement by number of touchpoints rather than quality of value exchanged. A CSM who completes 50 check-in calls per week but changes no outcomes is wasting the company's most expensive resource.

2. **The One-Size-Fits-All Model:** Applying the same engagement cadence to a $2K SMB account and a $200K enterprise account. The economics are fundamentally different and the model must reflect that.

3. **Reactive-Only Engagement:** Only reaching out when the customer has a problem or when renewal is approaching. By the time a customer calls with a complaint, the damage to the relationship is already done.

4. **Champion Dependency:** Building the entire relationship on a single contact. When that person leaves (average tenure is 18-24 months), the account becomes an orphan with no institutional relationship.

5. **Engagement Theater:** Conducting QBRs and EBRs as performative rituals with slide decks that nobody reads, rather than as genuine strategic conversations that shape both parties' actions.

6. **Digital Spam:** Sending so many automated emails, in-app messages, and notifications that customers tune out all communication, including critical alerts.

---

## The Operator's Framework

**Step-by-step decision process for designing an engagement model:**

1. **Segment your book of business** by ACV, strategic value, complexity, and growth potential
2. **Assign each segment to an engagement tier** (tech-touch through high-touch), validating that the unit economics work (CSM cost < expected retention/expansion value)
3. **Define the engagement cadence** for each tier at each lifecycle stage using the cadence matrix
4. **Design proactive outreach triggers** for both positive (expansion) and negative (risk) signals
5. **Build engagement scoring** to measure the depth and quality of customer interaction
6. **Configure "going dark" alerts** with escalation paths that move from automated to human outreach
7. **Design QBR and EBR frameworks** appropriate to each tier, with clear preparation checklists
8. **Calibrate quarterly:** Review engagement scores against actual outcomes (renewal, expansion, churn) and adjust weights, triggers, and cadences based on evidence
9. **Instrument everything:** Ensure every touchpoint is logged in the CS platform so the engagement score reflects reality
10. **Audit for value density:** Regularly review a sample of touchpoints to ensure they deliver genuine value, not just activity

---

## Summary

**Key Principles:**
- Engagement models must be **economically sustainable** -- the cost of engagement must be justified by the retention and expansion revenue it protects
- **Value density per interaction** matters more than interaction frequency
- **Proactive, event-driven outreach** outperforms calendar-driven check-ins by detecting risk and opportunity earlier
- **Multi-threading relationships** across multiple contacts and levels of seniority is the strongest insurance against champion departure
- **Digital engagement is the foundation** for all tiers; human engagement is the differentiated layer added on top
- **Engagement scoring must be calibrated against outcomes** -- an engagement score that does not predict renewal is a vanity metric
- The ultimate test of engagement quality: would the customer **notice and complain** if you stopped all engagement tomorrow?
