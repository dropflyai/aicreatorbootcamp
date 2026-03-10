# Customer Lifecycle Management

## The Complete Customer Lifecycle

The customer lifecycle in a recurring revenue business is not a linear funnel
but a continuous loop. Each phase feeds the next, and the quality of execution
in early phases determines outcomes in later phases. The Customer Success
Brain manages every phase from sales handoff through advocacy and back to
expansion.

---

## Lifecycle Phases

### Phase 0: Pre-Sale Alignment (Sales Handoff)

**Owner**: Shared — Sales (primary), CS (advisory)
**Duration**: Final 2-4 weeks of sales cycle
**Critical Milestone**: Signed contract with documented success criteria

The lifecycle begins before the contract is signed. CS must be involved in
late-stage sales to ensure:

1. **Success criteria are documented**: What does the customer expect to achieve?
   Without documented success criteria, onboarding lacks direction and renewal
   conversations lack benchmarks.

2. **Technical feasibility is validated**: Can the product actually deliver what
   was sold? Technical pre-sales validation prevents implementation failures.

3. **Stakeholder map is initiated**: Who are the decision-makers, champions,
   end users, and potential detractors?

4. **Handoff packet is complete**: The sales-to-CS handoff must include:

```
HANDOFF PACKET CONTENTS:
├── Customer profile (industry, size, tech stack)
├── Decision drivers (why they bought)
├── Success criteria (what they expect to achieve)
├── Contract details (term, value, renewal date, SLA)
├── Stakeholder map (champion, economic buyer, users)
├── Competitive context (who else they evaluated)
├── Technical requirements (integrations, migrations)
├── Red flags or concerns raised during sales
└── Timeline expectations for go-live
```

**Anti-Pattern**: "Throw it over the wall" handoff where CS receives only a
contract and a name. This is the #1 predictor of failed onboarding.

---

### Phase 1: Onboarding

**Owner**: CS (primary), Engineering (supporting)
**Duration**: 14-90 days depending on complexity
**Critical Milestone**: Time-to-First-Value (TTFV) achieved

Onboarding is the highest-leverage phase of the entire lifecycle. TSIA research
shows that onboarding quality predicts 60-70% of renewal outcome variance.
Detailed onboarding methodology is in Module 02.

Key lifecycle transitions during onboarding:

```
Kickoff Call → Technical Setup → Data Migration → User Training → Go-Live → First Value
     │              │                 │               │            │           │
   Day 1         Day 3-7          Day 7-14        Day 14-21    Day 21-30   Day 30-45
```

**Lifecycle Gate**: A customer cannot exit the Onboarding phase until TTFV is
documented. If TTFV is not achieved within the target window, an escalation
playbook triggers automatically.

---

### Phase 2: Adoption

**Owner**: CS (primary)
**Duration**: Days 30-120 (ongoing monitoring continues)
**Critical Milestone**: Target adoption metrics achieved

Adoption measures how deeply and broadly the customer uses the product.
Three adoption dimensions must be tracked:

#### Feature Breadth
What percentage of relevant features is the customer using?

```
Feature Breadth Score = Features Used / Features Relevant to Customer's Use Case x 100
```

Not all features are relevant to every customer. Breadth scoring must be
contextualized to the customer's success plan.

#### Feature Depth
How intensively are they using each feature?

```
Feature Depth Score = Actual Usage Frequency / Expected Usage Frequency x 100
```

Example: If the expected usage of the reporting module is 5 reports/week and
the customer generates 2 reports/week, depth score = 40%.

#### User Penetration
What percentage of licensed users are actively using the product?

```
User Penetration = Monthly Active Users / Licensed Users x 100
```

Benchmarks vary by product type:
- Collaboration tools: >70% penetration expected
- Analytics platforms: >40% penetration expected
- Admin/IT tools: >20% penetration expected (fewer users, deeper usage)

**Lifecycle Gate**: Adoption health must reach "green" threshold before the
customer transitions to the steady-state engagement model.

---

### Phase 3: Value Realization

**Owner**: CS (primary)
**Duration**: Days 90-180 (ongoing)
**Critical Milestone**: Customer confirms measurable business outcome

Value realization closes the loop on the success criteria defined in Phase 0.
The CSM must document that the customer has achieved (or is on track to
achieve) the outcomes they purchased the product for.

#### Value Realization Process

1. **Baseline Measurement**: Capture the customer's pre-product metrics
   (e.g., "Support tickets took 4 hours to resolve on average")
2. **Progress Tracking**: Monitor intermediate metrics during adoption
   (e.g., "Resolution time is now 2 hours after 60 days")
3. **Outcome Documentation**: Formally document achieved results
   (e.g., "Resolution time reduced to 45 minutes — 81% improvement")
4. **ROI Calculation**: Translate outcomes to financial impact
   (e.g., "At 500 tickets/month, this saves $150K annually in labor")

#### The Value Realization Document

A formal artifact presented during QBRs:

```
VALUE REALIZATION REPORT
├── Original success criteria (from success plan)
├── Baseline metrics (pre-product state)
├── Current metrics (post-adoption state)
├── Improvement delta (quantified)
├── Financial impact (monetized where possible)
├── Additional value discovered (outcomes beyond plan)
└── Next-phase value targets (expanding the success plan)
```

---

### Phase 4: Renewal

**Owner**: CS (primary), Sales (commercial support)
**Duration**: 90-120 days before contract end
**Critical Milestone**: Signed renewal contract

Renewal is both a process and an event. The process begins 90-120 days before
contract expiration; the event is the signature. Detailed renewal management
is in Module 04.

#### Renewal Timeline

```
T-120 days: Renewal risk assessment (health score review)
T-90 days:  Renewal kickoff (internal alignment, pricing review)
T-60 days:  Customer renewal conversation (value review, terms discussion)
T-45 days:  Proposal delivery (renewal terms, pricing, expansion options)
T-30 days:  Negotiation window (if needed)
T-14 days:  Escalation if not signed (executive engagement)
T-0:        Renewal deadline (signed or churned)
```

#### Renewal Outcome Categories

| Outcome | Definition | Impact |
|---------|-----------|--------|
| Flat Renewal | Same terms, same price | GRR maintained |
| Expansion Renewal | Higher value (upsell, seats) | NRR > 100% |
| Contraction Renewal | Lower value (downgrade, seats) | GRR hit |
| Multi-Year Renewal | Extended term (2-3 years) | Reduced churn risk, cash flow |
| Churn | Customer does not renew | GRR and NRR hit |

---

### Phase 5: Expansion

**Owner**: CS (identification), Sales (execution)
**Duration**: Ongoing throughout lifecycle
**Critical Milestone**: Expansion revenue closed

Expansion should not wait for renewal. The best expansion conversations happen
when value realization is fresh — typically in the 6-12 month window after
go-live. Detailed expansion strategy is in Module 05.

#### Expansion Signal Detection

CS should continuously monitor for expansion signals:

- Usage approaching or exceeding license limits
- New departments or teams requesting access
- Customer asking about features in higher tiers
- Positive NPS/CSAT scores combined with high adoption
- Champion promoted to broader role
- Company experiencing growth (hiring, funding, new markets)

---

### Phase 6: Advocacy

**Owner**: CS (primary), Marketing (content production)
**Duration**: Ongoing for successful customers
**Critical Milestone**: Customer produces advocacy asset

Advocacy is the highest expression of customer success — the customer is so
successful that they actively promote your product. Advocacy compounds
growth through:

1. **References**: Prospective customers speaking with successful existing ones
2. **Case Studies**: Documented success stories for marketing use
3. **Speaking Engagements**: Customer presenting at events or webinars
4. **Online Reviews**: G2, TrustRadius, Gartner Peer Insights
5. **Referrals**: Direct introduction to potential customers
6. **Advisory Board**: Participation in customer advisory board
7. **Beta Programs**: Early access and feedback on new features
8. **Community Leadership**: Moderating or contributing to user community

#### Advocacy Readiness Assessment

Not every customer is ready for advocacy. Assess:

```
Advocacy Readiness Score:
├── Health Score > 80                    [Required]
├── NPS = Promoter (9-10)               [Required]
├── Value Realization documented         [Required]
├── Relationship depth (multi-threaded)  [Preferred]
├── Contract term remaining > 6 months   [Preferred]
├── No open critical support issues      [Required]
└── Champion willing to participate      [Required]
```

---

## Lifecycle Orchestration

### Cross-Phase Dependencies

Each phase creates inputs for subsequent phases:

```
Pre-Sale   --> Onboarding:  Success criteria, stakeholder map
Onboarding --> Adoption:    Technical foundation, trained users
Adoption   --> Value:       Usage data, feature engagement
Value      --> Renewal:     ROI documentation, business case
Renewal    --> Expansion:   Confirmed commitment, trust
Expansion  --> Advocacy:    Deepened investment, stronger outcomes
Advocacy   --> New Sale:    References, case studies, referrals
```

### Lifecycle Stage Assignment

Every customer account must have a current lifecycle stage assigned in the
CS platform. Stage transitions should be automated where possible:

```python
# Lifecycle Stage Assignment Logic (Pseudocode)
def assign_lifecycle_stage(customer):
    if customer.contract_signed and not customer.kickoff_completed:
        return "ONBOARDING"
    elif customer.kickoff_completed and not customer.ttfv_achieved:
        return "ONBOARDING"
    elif customer.ttfv_achieved and not customer.adoption_green:
        return "ADOPTION"
    elif customer.adoption_green and not customer.value_documented:
        return "VALUE_REALIZATION"
    elif customer.days_to_renewal <= 120:
        return "RENEWAL"
    elif customer.expansion_opportunity_open:
        return "EXPANSION"
    elif customer.health_score >= 80 and customer.nps >= 9:
        return "ADVOCACY_ELIGIBLE"
    else:
        return "STEADY_STATE"
```

### Lifecycle Velocity Metrics

Track how fast customers move through the lifecycle:

| Transition | Target Duration | Red Flag |
|-----------|----------------|----------|
| Handoff to Kickoff | < 5 business days | > 10 days |
| Kickoff to Go-Live | < 30 days | > 60 days |
| Go-Live to TTFV | < 14 days | > 30 days |
| TTFV to Adoption Green | < 60 days | > 90 days |
| Adoption to Value Documented | < 90 days | > 120 days |

---

## References

1. Mehta, N., Steinman, D., Murphy, L. (2016). *Customer Success*. Wiley.
2. Murphy, L. (2019). "The Customer Lifecycle Map." Sixteen Ventures.
3. TSIA. (2023). *Onboarding Impact on Renewal Rates*. TSIA Research.
4. Gainsight. (2024). *Lifecycle Orchestration Best Practices*. Gainsight
   Academy.
5. Nanus, A. (2022). "Customer Lifecycle Metrics That Matter." SaaStr Annual.

---

**The customer lifecycle is a continuous loop, not a linear funnel. Every phase
creates the foundation for the next.**
