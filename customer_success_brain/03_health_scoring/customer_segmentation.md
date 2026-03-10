# Customer Segmentation

## Why Segmentation Matters

Not every customer can or should receive the same level of engagement.
Segmentation is the strategic practice of grouping customers by shared
characteristics and designing differentiated engagement models for each
segment. Without segmentation, CS teams either over-invest in low-value
accounts (destroying unit economics) or under-invest in high-value accounts
(destroying retention). TSIA research (2023) shows that companies with
mature segmentation models achieve 15-20% higher NRR than those without.

---

## Segmentation Frameworks

### Framework 1: ARR-Based Tiering (Most Common)

The simplest and most common segmentation approach — group customers by
annual contract value.

```
ARR-BASED SEGMENTATION
═══════════════════════

Tier          | ARR Range       | Engagement Model  | CSM Ratio
──────────────|────────────────|──────────────────|────────────
Enterprise    | > $250K        | High-Touch        | 1:5-10
Strategic     | $100K - $250K  | High-Touch        | 1:10-20
Mid-Market    | $25K - $100K   | Mid-Touch         | 1:25-50
Growth        | $10K - $25K    | Low-Touch + Digital| 1:50-100
SMB           | < $10K         | Tech-Touch/Digital | 1:200+ or pooled
```

**Limitation**: ARR alone ignores growth potential, strategic value, and
customer health. A $15K customer growing 200% YoY may deserve more attention
than a flat $80K customer.

### Framework 2: Multi-Factor Segmentation (Recommended)

Combine multiple factors for more nuanced segmentation:

```
MULTI-FACTOR SEGMENTATION MODEL
════════════════════════════════

Factor                  | Weight | Scoring
────────────────────────|────────|─────────────────────────
Current ARR             | 30%    | Percentile rank in portfolio
Growth Potential        | 25%    | Expansion headroom x growth signals
Strategic Value         | 20%    | Brand value, industry influence, reference potential
Health Score            | 15%    | Current composite health
Product Fit             | 10%    | Feature utilization vs. available features

Segment Score = Σ (Factor Score x Weight)

Segment Assignment:
  Score 80-100: Enterprise / Strategic → High-Touch
  Score 60-79:  Growth / Mid-Market → Mid-Touch
  Score 40-59:  Standard → Low-Touch with digital augmentation
  Score 0-39:   Volume / SMB → Digital CS (Tech-Touch)
```

### Framework 3: Lifecycle-Based Segmentation

Overlay lifecycle stage on top of value-based tiering:

```
LIFECYCLE-SEGMENT MATRIX
════════════════════════

                    │ Enterprise  │ Mid-Market  │ SMB
────────────────────│─────────────│─────────────│────────────
Onboarding          │ White-Glove │ Guided      │ Self-Serve
                    │ Impl Mgr   │ CSM-led     │ Automated
────────────────────│─────────────│─────────────│────────────
Adoption            │ 1:1 CSM    │ Cohort      │ Digital
                    │ Weekly      │ Bi-weekly   │ Triggered
────────────────────│─────────────│─────────────│────────────
Steady State        │ Dedicated  │ Named CSM   │ Pooled/Digital
                    │ Monthly QBR│ Quarterly   │ Annual email
────────────────────│─────────────│─────────────│────────────
Renewal             │ 120-day    │ 90-day      │ 60-day
                    │ Exec-to-Exec│ CSM-led    │ Auto-renew
────────────────────│─────────────│─────────────│────────────
At-Risk             │ War Room   │ Rescue Play │ Auto-nurture
                    │ Exec + CSM │ CSM + Mgr   │ Triggered
```

---

## Engagement Models

### High-Touch Engagement

**Target**: Enterprise and Strategic accounts (top 10-20% by value)
**Cost**: $15,000-$40,000 per account annually (fully loaded CSM time)

```
HIGH-TOUCH ENGAGEMENT MODEL
════════════════════════════

Dedicated CSM:
├── Named CSM assigned to 5-15 accounts
├── Deep knowledge of customer's business, industry, stakeholders
├── Proactive outreach minimum bi-weekly
└── Available for ad-hoc requests within business hours

Cadence:
├── Weekly check-in (15-30 min) or bi-weekly (30-60 min)
├── Monthly operational review (internal)
├── Quarterly Business Review (customer-facing, 60-90 min)
├── Annual Strategic Planning Session (half-day)
└── Ad-hoc escalation calls as needed

Deliverables:
├── Custom success plan with quarterly updates
├── Executive sponsor alignment (exec-to-exec)
├── Monthly health report shared with customer
├── Quarterly value realization report
├── Annual business impact summary
└── Custom training and enablement

CSM Activities Per Account (Monthly):
├── Proactive outreach: 4-8 touchpoints
├── Internal research and preparation: 4-6 hours
├── Customer meetings: 4-8 hours
├── Internal advocacy (product, support, engineering): 2-4 hours
└── Administrative (CRM, notes, health updates): 2-3 hours

Total: 12-21 hours/month per Enterprise account
```

### Mid-Touch Engagement

**Target**: Mid-Market accounts (next 20-30% by value)
**Cost**: $3,000-$10,000 per account annually

```
MID-TOUCH ENGAGEMENT MODEL
═══════════════════════════

Named CSM:
├── CSM assigned to 25-50 accounts
├── Moderate knowledge of each customer's business
├── Proactive outreach monthly or bi-monthly
└── Responsive to inbound requests within 24 hours

Cadence:
├── Monthly check-in email or call (30 min)
├── Quarterly Business Review (30-60 min)
├── Bi-annual strategic alignment
└── Triggered outreach on health score changes

Deliverables:
├── Standard success plan template
├── Quarterly adoption report
├── Semi-annual value summary
└── Access to group training and webinars

CSM Activities Per Account (Monthly):
├── Proactive outreach: 2-3 touchpoints
├── Customer meetings: 1-2 hours
├── Internal advocacy: 30-60 minutes
└── Administrative: 30-60 minutes

Total: 4-6 hours/month per Mid-Market account
```

### Low-Touch / Digital CS

**Target**: SMB and Growth accounts (bottom 50-70% by value)
**Cost**: $500-$2,000 per account annually

```
DIGITAL CS (TECH-TOUCH) ENGAGEMENT MODEL
═════════════════════════════════════════

Pooled CSM or No Dedicated CSM:
├── CS team manages segment as a portfolio
├── Engagement is primarily automated
├── Human intervention only on triggers or escalation
└── Self-service resources as primary support

Automated Cadence:
├── Welcome sequence (Days 0, 1, 3, 7, 14, 30)
├── Monthly product tips email
├── Quarterly adoption summary (automated)
├── Usage milestone celebrations (automated)
├── Risk intervention triggers (CSM-assisted)
└── Renewal sequence (T-60, T-30, T-14, T-7)

Digital Touchpoints:
├── In-app messaging (Pendo, Intercom, Appcues)
├── Email campaigns (lifecycle-triggered)
├── Webinars (scheduled and on-demand)
├── Community forum participation
├── Self-service knowledge base
├── Chatbot for common questions
└── One-to-many office hours

Human Intervention Triggers:
├── Health score drops to Yellow or below
├── NPS Detractor response
├── Critical support ticket
├── Renewal within 60 days with low health
├── Customer requests human contact
└── High expansion signal detected
```

---

## Pooled CS Model

Pooled CS is an emerging model that sits between named CSM and pure digital:

```
POOLED CS MODEL
═══════════════

Structure:
├── Pool of 3-5 CSMs managing a shared segment (200-500 accounts)
├── No individual account ownership
├── CSMs respond to triggers and signals
├── Workload distributed by availability and skill

How It Works:
├── CS platform generates CTAs based on signals
├── CTAs are assigned to available CSMs from the pool
├── CSM handles the interaction, documents it, closes CTA
├── Next interaction may be a different CSM from the pool
└── Customer sees "Customer Success Team" not an individual name

Advantages:
├── More resilient (no single-point-of-failure if CSM leaves)
├── Better coverage (no gap when CSM is on PTO)
├── More scalable (add CSMs to pool as segment grows)
└── Specialization possible (some CSMs handle onboarding, others renewal)

Challenges:
├── Less relationship depth (customer sees different CSMs)
├── Requires excellent documentation (next CSM needs context)
├── CRM and notes must be meticulous
└── Some customers prefer a "their person" — manage expectations
```

---

## Segmentation Governance

### Annual Segmentation Review

Segmentation is not set-and-forget. Review annually:

```
ANNUAL SEGMENTATION REVIEW
═══════════════════════════

Step 1: Validate Segment Boundaries
  ├── Have ARR thresholds shifted due to pricing changes?
  ├── Has the customer distribution changed?
  └── Are engagement models still economically viable?

Step 2: Analyze Segment Performance
  ├── NRR by segment (are some segments underperforming?)
  ├── Churn rate by segment
  ├── CSM satisfaction and capacity by segment
  └── Cost-to-serve vs. revenue by segment

Step 3: Evaluate Segment Mobility
  ├── Customers who grew into a higher segment
  ├── Customers who contracted into a lower segment
  └── Customers whose engagement model doesn't match their segment

Step 4: Adjust
  ├── Update thresholds and weights
  ├── Reassign accounts to appropriate segments
  ├── Adjust CSM ratios based on performance data
  └── Update engagement model playbooks
```

### Account Reassignment Rules

```
SEGMENT TRANSITION RULES
═════════════════════════

Upgrade (Lower → Higher Tier):
  Trigger: Customer's segment score increases above threshold for 2 consecutive quarters
  Process: Assign named CSM, schedule intro meeting, create success plan
  Timeline: Effective within 30 days of qualification

Downgrade (Higher → Lower Tier):
  Trigger: Customer's ARR drops below threshold after contraction or downgrade
  Process: CSM communicates transition, shifts to lower-touch model
  Timeline: Effective at next renewal (not mid-contract)
  Sensitivity: Handle with care — do not abruptly withdraw attention

Override: Any account can be manually assigned to a higher tier with VP CS approval
  Use cases: Marquee brand, strategic partnership, high expansion potential
```

---

## Segmentation Economics

### Cost-to-Serve by Segment

```
UNIT ECONOMICS BY SEGMENT
══════════════════════════

Segment      | Avg ARR  | CS Cost/Acct | CS Cost % | Target NRR
─────────────|──────────|─────────────|──────────|───────────
Enterprise   | $300K    | $25,000     | 8.3%     | 120%+
Mid-Market   | $60K     | $5,000      | 8.3%     | 110%+
Growth       | $15K     | $1,500      | 10.0%    | 105%+
SMB          | $5K      | $300        | 6.0%     | 100%+

CS Investment Rule of Thumb:
  CS cost should be 5-15% of managed ARR
  If CS cost > 15% of ARR: Over-invested (reduce touch or increase automation)
  If CS cost < 5% of ARR: Under-invested (risk of higher churn)
```

---

## References

1. TSIA. (2023). *Customer Segmentation in Technology Services*.
2. Gainsight. (2024). *Segmented Engagement Models*. Gainsight Academy.
3. Murphy, L. (2021). "One Size Fits None: Segmented CS." Sixteen Ventures.
4. Blaisdell, M. (2023). "CS Organizational Design." Customer Success
   Association.
5. Lemkin, J. (2023). "How Many Customers Per CSM?" SaaStr.

---

**Segmentation is the operating system of CS. It determines who gets what
attention, at what cost, for what return.**
