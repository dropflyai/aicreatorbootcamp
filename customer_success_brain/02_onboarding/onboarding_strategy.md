# Onboarding Strategy

## The Strategic Importance of Onboarding

Onboarding is the highest-leverage activity in the entire customer lifecycle.
TSIA research (2023) demonstrates that the quality of onboarding explains
60-70% of the variance in first-year renewal rates. Lincoln Murphy states it
directly: "The seeds of churn are planted early." Every day of delay in
time-to-first-value increases churn probability by a measurable margin.

---

## Time-to-First-Value (TTFV)

### Defining First Value

Time-to-first-value is the elapsed time from contract signing (or go-live) to
the moment the customer achieves their first meaningful value milestone. This
is NOT:
- The moment they log in for the first time
- The moment the product is technically configured
- The moment training is completed

First value occurs when the customer has an **"aha moment"** — a concrete,
measurable outcome that validates their purchase decision.

### TTFV by Product Category

| Product Category | Target TTFV | Maximum TTFV |
|-----------------|-------------|-------------|
| Self-serve SaaS (SMB) | < 24 hours | 3 days |
| Standard SaaS (Mid-Market) | < 14 days | 30 days |
| Complex Platform (Enterprise) | < 30 days | 60 days |
| Enterprise Suite (Multi-module) | < 45 days | 90 days |

### TTFV Optimization Framework

```
TTFV = Time to Technical Readiness
     + Time to User Activation
     + Time to First Outcome

To reduce TTFV:
├── Reduce Technical Readiness Time
│   ├── Pre-configured environments (reduce setup from days to hours)
│   ├── Automated data migration tools
│   ├── Pre-built integrations with common platforms
│   └── Sandbox environments for testing before go-live
│
├── Reduce User Activation Time
│   ├── In-app guided walkthroughs (Pendo, WalkMe, Appcues)
│   ├── Role-based onboarding paths
│   ├── Quick-start templates and presets
│   └── Contextual help at point of need
│
└── Reduce Time to First Outcome
    ├── "Quick win" playbooks for each use case
    ├── Pre-built reports and dashboards
    ├── Default workflows matching common patterns
    └── CSM-guided first-outcome achievement
```

---

## Onboarding Models

### Model 1: High-Touch Onboarding (Enterprise)

**When**: ACV > $100K, complex implementation, multiple stakeholders
**Resources**: Dedicated CSM, Implementation Manager, Solutions Architect
**Duration**: 30-90 days
**CSM Ratio**: 1 CSM managing 3-5 concurrent onboardings

```
HIGH-TOUCH ONBOARDING PHASES
════════════════════════════

Phase 1: Discovery & Planning (Days 1-7)
├── Kickoff call (60-90 min)
│   ├── Re-confirm success criteria from sales handoff
│   ├── Identify all stakeholder roles and access needs
│   ├── Establish communication cadence and channels
│   └── Set milestone dates and dependencies
├── Technical discovery session (60 min)
│   ├── Current tech stack inventory
│   ├── Integration requirements and API access
│   ├── Data migration scope and format assessment
│   └── Security and compliance requirements
└── Success plan creation
    ├── Documented desired outcomes with KPIs
    ├── Milestone timeline with owners
    └── Risk factors and mitigation plans

Phase 2: Technical Implementation (Days 7-30)
├── Environment provisioning and configuration
├── SSO/SAML integration
├── Data migration (pilot → validation → full)
├── API integration development and testing
├── Custom workflow configuration
└── Security review and compliance validation

Phase 3: User Enablement (Days 21-45)
├── Admin training (technical administrators)
├── Power user training (primary daily users)
├── End user training (broad rollout)
├── Custom documentation for customer's use case
└── Internal champion enablement (train-the-trainer)

Phase 4: Go-Live & Stabilization (Days 30-60)
├── Soft launch (pilot group)
├── Issue triage and resolution
├── Full launch (all users)
├── 30-day post-launch check-in
└── TTFV milestone confirmation
```

### Model 2: Mid-Touch Onboarding (Mid-Market)

**When**: ACV $25K-$100K, moderate complexity
**Resources**: CSM (shared), technical support access
**Duration**: 14-30 days
**CSM Ratio**: 1 CSM managing 8-15 concurrent onboardings

```
MID-TOUCH ONBOARDING
├── Kickoff call (45 min) — success criteria, timeline
├── Technical setup (self-service with CSM guidance)
├── Group training webinar (scheduled cohorts)
├── Automated milestone tracking with CSM review
├── 14-day and 30-day check-in calls
└── TTFV confirmation via automated + CSM validation
```

### Model 3: Tech-Touch Onboarding (SMB / Self-Serve)

**When**: ACV < $25K, standardized product, low complexity
**Resources**: Automated sequences, on-demand support
**Duration**: 1-14 days
**CSM Ratio**: No dedicated CSM; digital CS program

```
TECH-TOUCH ONBOARDING
├── Automated welcome email sequence (Day 0, 1, 3, 7, 14)
├── In-app guided setup wizard
├── Pre-recorded video tutorials
├── Automated milestone detection and celebration emails
├── Triggered intervention if milestones not met
│   ├── Day 3: No login → nudge email
│   ├── Day 7: No setup complete → offer 1:1 help
│   ├── Day 14: No first value → CSM outreach
│   └── Day 21: Still inactive → at-risk flag
└── Self-service knowledge base and community forum
```

---

## Kickoff Design

### The Kickoff Meeting Framework

The kickoff meeting sets the tone for the entire relationship. It must
accomplish five objectives:

1. **Re-confirm expectations**: Validate that success criteria from the sales
   process are accurate and complete
2. **Establish mutual accountability**: Both sides have responsibilities
3. **Set the timeline**: Clear milestones with dates and owners
4. **Build the relationship**: The CSM becomes the customer's trusted advisor
5. **Create momentum**: The customer should leave the kickoff excited and
   confident

### Kickoff Agenda Template

```
CUSTOMER KICKOFF AGENDA (60-90 minutes)
────────────────────────────────────────

1. Introductions & Roles (10 min)
   - CS team introductions with direct contact info
   - Customer team introductions and roles
   - Communication preferences and cadence agreement

2. Success Criteria Review (20 min)
   - "What does success look like for you in 90 days?"
   - Review and refine success criteria from sales handoff
   - Identify measurable KPIs for each criterion
   - Document baseline metrics (current state)

3. Onboarding Plan Walkthrough (15 min)
   - Present phased onboarding timeline
   - Identify dependencies and potential blockers
   - Assign action items with owners and deadlines
   - Set milestone check-in dates

4. Technical Overview (15 min)
   - Quick platform tour (NOT full training)
   - Integration discussion and requirements
   - Data migration plan (if applicable)
   - Access provisioning plan

5. Q&A and Next Steps (10 min)
   - Open questions from customer
   - Confirm next meeting date and agenda
   - Action items recap (sent via email within 2 hours)
   - Emergency escalation process
```

### Kickoff Anti-Patterns

| Anti-Pattern | Problem | Solution |
|-------------|---------|----------|
| Feature demo disguised as kickoff | Customer needs strategy, not a sales pitch | Focus on THEIR outcomes, not YOUR features |
| No success criteria documented | Onboarding has no target | Require success criteria before scheduling kickoff |
| Single-threaded kickoff | Only one contact from customer | Require 2+ stakeholders at kickoff |
| No timeline committed | Onboarding drifts indefinitely | Establish hard milestone dates with owners |
| CSM unprepared on account context | Customer feels they are starting over | CSM must review full handoff packet pre-kickoff |

---

## Onboarding Metrics

### Primary Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| TTFV | Days from contract to first value | < segment threshold |
| Onboarding Completion Rate | % of customers completing all milestones | > 85% |
| Onboarding Duration | Days from kickoff to onboarding close | < segment threshold |
| Onboarding NPS | Satisfaction with onboarding experience | > 60 |
| Early Churn Rate | % churning within first 90 days | < 3% |

### Leading Indicators During Onboarding

```
GREEN SIGNALS:
✓ Customer completes action items on time
✓ Multiple stakeholders engaged
✓ Usage begins within 48 hours of go-live
✓ Customer asks questions about advanced features
✓ Customer introduces additional team members

RED SIGNALS:
✗ Customer delays or misses kickoff
✗ Single point of contact only
✗ No login within 7 days of provisioning
✗ Action items consistently overdue
✗ Customer stops responding to outreach
✗ "We're too busy right now" pattern
```

---

## Onboarding Escalation Protocol

### Escalation Triggers

| Trigger | Severity | Action |
|---------|----------|--------|
| No kickoff within 10 business days | Medium | CSM manager engages customer |
| TTFV not achieved at 2x target | High | Implementation review + exec sponsor |
| Customer stops responding (7+ days) | High | Multi-channel outreach + AE re-engagement |
| Technical blocker unresolved 5+ days | High | Engineering escalation + daily standups |
| Customer expresses onboarding frustration | Critical | CSM manager joins next call + remediation plan |

### Post-Escalation Recovery

If onboarding goes off track:

1. Acknowledge the problem directly with the customer
2. Conduct a root cause analysis (internal)
3. Present a revised plan with compressed timeline
4. Add executive sponsor check-in
5. Increase touchpoint frequency until back on track
6. Document lessons learned in Memory for future onboardings

---

## References

1. Murphy, L. (2018). "Time-to-First-Value: The Most Important SaaS Metric
   You're Not Tracking." Sixteen Ventures.
2. TSIA. (2023). *Onboarding Best Practices for Technology Companies*.
3. Gainsight. (2024). *Onboarding Playbook Design*. Gainsight Academy.
4. Nanus, A. (2022). "The First 90 Days of Customer Success." SaaStr.
5. ChurnZero. (2023). *Customer Onboarding Benchmark Report*.

---

**The first 30 days determine the next 3 years. Onboarding is not a phase —
it is the foundation of the entire customer relationship.**
