# Ticket Management — Lifecycle, Categorization, Routing, and SLA

## Overview

Ticket management is the operational backbone of customer support. Every customer
interaction — regardless of channel — becomes a ticket that must be created,
categorized, routed, worked, resolved, and closed in a systematic and measurable
way. This module defines the complete ticket lifecycle, categorization taxonomy,
routing algorithms, SLA management, and backlog governance that ensure consistent,
efficient, and customer-centric support operations.

---

## 1. Ticket Lifecycle

### Stage Model

```
CREATE → CATEGORIZE → PRIORITIZE → ROUTE → ASSIGN → WORK → RESOLVE → CLOSE
  │          │            │           │        │        │        │         │
  │          │            │           │        │        │        │         └─ Archive + CSAT
  │          │            │           │        │        │        └─ Confirm with customer
  │          │            │           │        │        └─ Investigate + solve
  │          │            │           │        └─ Agent accepts ownership
  │          │            │           └─ Route to correct queue/agent
  │          │            └─ Assess urgency + impact
  │          └─ Classify issue type + product area
  └─ Ticket enters system (any channel)
```

### Stage Definitions

| Stage | Owner | Actions | Exit Criteria |
|-------|-------|---------|---------------|
| **Create** | Customer / System | Ticket generated from email, chat, phone, form, API | Ticket ID assigned, timestamp recorded |
| **Categorize** | Auto / L1 Agent | Issue type, product area, tags applied | Category + subcategory assigned |
| **Prioritize** | Auto / L1 Agent | Severity + impact assessed, priority set | Priority level (P1-P4) assigned |
| **Route** | System | Sent to correct queue based on rules | Arrives in target queue |
| **Assign** | System / Team Lead | Individual agent takes ownership | Agent name on ticket |
| **Work** | Agent | Investigation, troubleshooting, customer communication | Solution identified |
| **Resolve** | Agent | Solution delivered, customer confirms | Customer acknowledges resolution |
| **Close** | System / Agent | Ticket closed, CSAT survey sent, knowledge captured | Status = Closed, survey triggered |

### Ticket Statuses

```
NEW         -- Ticket created, not yet triaged
OPEN        -- Triaged, assigned, agent working
PENDING     -- Waiting on customer response
ON-HOLD     -- Waiting on internal dependency (engineering, vendor)
ESCALATED   -- Moved to higher tier
SOLVED      -- Agent believes issue resolved, awaiting customer confirmation
CLOSED      -- Customer confirmed or auto-close after timeout
REOPENED    -- Customer responded after solved/closed
MERGED      -- Duplicate merged into parent ticket
```

### Auto-Close Policy

Tickets in "Solved" status auto-close after a configurable period (typically 48-72
hours) if the customer does not respond. Tickets in "Pending" (waiting on customer)
should follow a cadence:

```
Day 0:  Initial response to customer
Day 3:  First follow-up: "Just checking in — did this resolve your issue?"
Day 7:  Second follow-up: "I'll close this ticket in 48 hours if I don't hear back."
Day 9:  Auto-close with message: "This ticket has been closed. Reply to reopen."
```

---

## 2. Categorization Taxonomy

### Two-Level Taxonomy

A well-designed taxonomy has two levels: Category (broad) and Subcategory (specific).
Three levels introduces excessive cognitive load during triage without proportionate
analytical benefit.

### Example Taxonomy (SaaS Product)

```
ACCOUNT & ACCESS
  ├── Login issues
  ├── Password reset
  ├── Account lockout
  ├── SSO / SAML configuration
  ├── Two-factor authentication
  ├── Account deletion / data export
  └── Permissions / role management

BILLING & PAYMENTS
  ├── Invoice questions
  ├── Payment failure
  ├── Plan change / upgrade / downgrade
  ├── Refund request
  ├── Tax / compliance
  └── Pricing questions

PRODUCT — [Feature Area 1]
  ├── How-to / usage question
  ├── Unexpected behavior (possible bug)
  ├── Performance issue
  ├── Error message
  └── Feature request

PRODUCT — [Feature Area 2]
  ├── (same subcategories)
  └── ...

INTEGRATIONS
  ├── [Integration A] setup / configuration
  ├── [Integration B] data sync issue
  ├── API questions
  ├── Webhook issues
  └── Third-party compatibility

GENERAL
  ├── Feedback / suggestion
  ├── Compliment
  ├── Complaint
  ├── Sales inquiry (route to sales)
  └── Other (review weekly for new categories)
```

### Taxonomy Governance

1. **Review quarterly** — Analyze "Other" category volume. If any "Other" exceeds 5%
   of total, create a new category.
2. **Merge low-volume categories** — Categories with < 2% of volume should be merged
   into parent or sibling categories.
3. **Align with product structure** — When the product adds major features, add
   corresponding taxonomy categories.
4. **Train agents monthly** — Review categorization accuracy; address systematic
   miscategorization.

### Auto-Categorization

Modern helpdesks support auto-categorization using:

| Method | Accuracy | Setup Effort | Best For |
|--------|----------|-------------|----------|
| **Keyword rules** | 60-70% | Low | High-volume, predictable categories |
| **ML classification** | 75-85% | Medium | Medium-complexity taxonomies |
| **LLM classification** | 85-95% | Medium | Complex, nuanced categorization |
| **Form-based** | 95%+ | Low | When customers can self-categorize accurately |

---

## 3. Priority and Severity Framework

### Priority Matrix

Priority is determined by the intersection of urgency and impact:

```
                        IMPACT
                  Low         High
            ┌──────────┬──────────┐
  URGENCY   │   P4     │   P2     │
  Low       │ Low      │ High     │
            ├──────────┼──────────┤
  URGENCY   │   P3     │   P1     │
  High      │ Medium   │ Critical │
            └──────────┴──────────┘
```

### Priority Definitions

| Priority | Name | Definition | SLA Target | Examples |
|----------|------|-----------|------------|---------|
| **P1** | Critical | Service down, data loss, security breach. Affects all/many users. No workaround. | FRT: 15 min, Resolution: 4 hours | System outage, data corruption, security incident |
| **P2** | High | Major feature broken. Significant impact on workflow. Limited workaround. | FRT: 1 hour, Resolution: 8 hours | Key feature broken, integration down, significant performance degradation |
| **P3** | Medium | Feature partially broken. Workaround available. Moderate impact. | FRT: 4 hours, Resolution: 24 hours | Minor bug, configuration question, non-critical feature issue |
| **P4** | Low | Cosmetic issue, feature request, how-to question. Minimal impact. | FRT: 8 hours, Resolution: 48 hours | UI glitch, documentation question, enhancement request |

### Severity vs. Priority

**Severity** is the technical impact of the issue (objective, set by support/engineering).
**Priority** is the business importance of resolving it (subjective, influenced by
customer tier, contract terms, and business context).

A P4-severity bug (cosmetic) may become P2-priority if it affects a $1M ARR customer
during a critical demo.

---

## 4. Routing Architecture

### Routing Methods

| Method | Description | Best For |
|--------|------------|----------|
| **Round-Robin** | Distribute tickets evenly to all available agents | Generalist teams, simple products |
| **Skills-Based** | Route to agent with relevant expertise | Complex products, specialized teams |
| **Load-Balanced** | Route to agent with lowest current workload | High-volume environments |
| **Priority-Based** | Highest priority tickets served first | SLA-driven organizations |
| **Affinity-Based** | Route to agent who previously helped this customer | Relationship-focused support |
| **Segment-Based** | Route based on customer tier/plan | Tiered support models |
| **AI-Powered** | ML model predicts best agent for the issue | Mature, data-rich organizations |

### Routing Rule Hierarchy

```
STEP 1: Channel Rules
  Phone → Phone-qualified agents only
  Chat → Chat-qualified agents only
  Email → All agents eligible

STEP 2: Segment Rules
  Enterprise customer → Enterprise queue
  VIP flag → Priority queue
  Free plan → Standard queue (after self-service attempt)

STEP 3: Skill Rules
  Billing issue → Billing team
  API/Integration → Technical team
  Account access → General team
  Bug report → Technical team

STEP 4: Assignment Rules (within queue)
  Primary: Skills-based (match expertise score)
  Secondary: Load-balanced (lowest open ticket count)
  Tertiary: Round-robin (if all else equal)
  Override: Affinity (if customer has existing relationship)
```

### Queue Management

Each queue has defined parameters:

```
QUEUE CONFIGURATION:
  Name:           [e.g., "Enterprise - Technical"]
  SLA Profile:    [e.g., "Enterprise SLA"]
  Agents:         [list of qualified agents]
  Max Capacity:   [max open tickets per agent]
  Overflow Rule:  [what happens when queue is full]
  Business Hours: [when queue is staffed]
  After-Hours:    [auto-response + next-business-day routing]
```

---

## 5. SLA Management

### SLA Components

| Component | Definition | Measurement |
|-----------|-----------|-------------|
| **First Response Time (FRT)** | Time from ticket creation to first human reply | Clock starts at creation; stops at first agent response |
| **Next Response Time (NRT)** | Time between customer reply and next agent reply | Clock starts at customer reply; stops at agent response |
| **Resolution Time** | Time from creation to resolution | Clock starts at creation; stops at status = Solved |
| **Business Hours** | Whether SLA clock runs 24/7 or business hours only | Define per SLA profile |
| **Pause Conditions** | When does the SLA clock stop? | Typically: "Pending" (waiting on customer), holidays |

### SLA Profiles

```
ENTERPRISE SLA:
  FRT: 1 hour (business hours) / 4 hours (after hours)
  NRT: 4 hours
  Resolution: 8 hours (P1), 24 hours (P2), 48 hours (P3), 5 days (P4)
  Clock: 24/5 (24 hours, 5 business days)
  Pause: Pending customer, observed holidays

PROFESSIONAL SLA:
  FRT: 4 hours (business hours)
  NRT: 8 hours
  Resolution: 24 hours (P1), 48 hours (P2), 5 days (P3), 10 days (P4)
  Clock: Business hours only (9am-6pm local)
  Pause: Pending customer, weekends, holidays

STANDARD SLA:
  FRT: 8 hours (business hours)
  NRT: 24 hours
  Resolution: 48 hours (P1), 5 days (P2), 10 days (P3), 15 days (P4)
  Clock: Business hours only
  Pause: Pending customer, weekends, holidays
```

### SLA Breach Management

```
SLA WARNING (75% of time elapsed):
  → Highlight ticket in queue
  → Notify assigned agent
  → Notify team lead if agent offline

SLA BREACH (100% of time elapsed):
  → Escalate to team lead
  → Flag in dashboard
  → Log breach for reporting

SLA CRITICAL BREACH (150% of time elapsed):
  → Escalate to support manager
  → Auto-prioritize above non-breached tickets
  → Customer receives proactive update

SLA EXECUTIVE BREACH (200%+ of time elapsed):
  → Escalate to VP Support
  → Personal outreach to customer
  → Root cause analysis required
```

---

## 6. Backlog Management

### Backlog Health Metrics

| Metric | Healthy | Warning | Critical |
|--------|---------|---------|----------|
| Total open tickets | Stable or declining | Growing 5-10% week/week | Growing 10%+ week/week |
| Tickets > SLA | <5% of open | 5-15% | >15% |
| Tickets > 7 days old | <10% of open | 10-25% | >25% |
| Tickets with no response | <3% of open | 3-8% | >8% |
| Pending > 7 days | <5% of pending | 5-15% | >15% |

### Backlog Reduction Strategies

1. **Triage blitz** — Dedicate 2 hours to triaging all unassigned tickets
2. **Backlog sprint** — Assign senior agents to work only old tickets for a day
3. **Merge audit** — Identify and merge duplicate tickets
4. **Bulk close** — Close tickets pending customer response > 14 days
5. **Root cause fix** — Identify the top issue driving volume and fix upstream
6. **Temporary staffing** — BPO or temp agents for volume spikes

### Weekly Backlog Review

Every Monday, the support team lead reviews:

```
1. Total open tickets (trend)
2. New tickets last week vs. resolved last week (inflow vs. outflow)
3. Tickets breaching SLA (list + action plan)
4. Oldest open tickets (investigate why still open)
5. Tickets on hold for engineering (follow up on blockers)
6. Categorization breakdown (identify volume spikes by category)
```

---

## 7. Ticket Quality Standards

### What Makes a Good Ticket (Agent Side)

Every agent response must include:

1. **Acknowledgment** — Validate the customer's experience
2. **Diagnosis** — Clear explanation of the issue or what was investigated
3. **Solution or Next Step** — Actionable instruction or timeline for follow-up
4. **Categorization** — Correct category, subcategory, tags
5. **Internal Notes** — Troubleshooting steps taken, context for future reference
6. **Follow-Up Plan** — If not resolved, clear next action and timeline

### Ticket Hygiene Rules

| Rule | Description | Enforcement |
|------|------------|-------------|
| **Single owner** | Every ticket has exactly one assigned agent | System-enforced |
| **No orphans** | No ticket sits unassigned > 30 minutes during business hours | Automated alert |
| **No ping-pong** | Ticket reassigned max 2 times before manager review | System flag at 3rd reassign |
| **Categorize on first touch** | Agent must categorize during first response | Required field before reply |
| **Internal notes on escalation** | Every escalation includes summary + steps taken | QA enforcement |
| **Close with resolution** | Resolved tickets must have resolution summary | Required field before close |

---

## 8. Ticket Analytics

### Key Ticket Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| **Ticket Volume** | Total tickets created per period | Trend analysis |
| **Tickets per Agent** | Volume / headcount | 400-600/month (SaaS) |
| **First Contact Resolution** | Resolved on first response / total resolved | 70-85% |
| **Reopen Rate** | Reopened tickets / total closed | <8% |
| **Reassignment Rate** | Tickets reassigned / total tickets | <15% |
| **Merge Rate** | Merged tickets / total created | <5% (higher = unclear channels) |
| **Self-Solve Rate** | Created then closed by customer / total | Track (not inherently good/bad) |

### Ticket Trend Analysis

Monitor these trends weekly/monthly:

1. **Volume by category** — Identifies product issues driving support load
2. **Volume by day/hour** — Informs staffing and scheduling
3. **Volume by customer segment** — Identifies segments needing attention
4. **Resolution time by category** — Identifies complex issue types
5. **Reopen rate by agent** — Identifies training needs
6. **Escalation rate by category** — Identifies knowledge gaps

---

## References

1. ITIL v4 (2019). "Service Management: Incident Management Practice."
2. TSIA (2024). "Support Services Benchmark."
3. Zendesk (2024). "Zendesk Benchmark: Customer Service Metrics."
4. HDI (2023). "Technical Support Practices and Salary Report."
5. Dixon, M. et al. (2013). "The Effortless Experience."

---

**This document is authoritative for ticket management within the Support Brain.**
