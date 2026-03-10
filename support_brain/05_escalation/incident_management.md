# Incident Management — Customer Communication, Status Pages, and Recovery

## Overview

Incident management in customer support governs how the support organization communicates
with customers during service disruptions, manages mass communication, classifies
incidents by severity, executes customer recovery and credit programs, and conducts
post-incident analysis. This module is distinct from engineering incident response
(which focuses on technical resolution); it focuses exclusively on the customer-facing
dimension of incidents: communication, expectation management, trust preservation,
and relationship recovery.

---

## 1. Incident Classification

### Severity Framework

| Severity | Name | Definition | Customer Impact | Communication Required |
|----------|------|-----------|-----------------|----------------------|
| **SEV-1** | Critical | Complete service outage or data loss/breach | All or most customers affected | Immediate mass communication |
| **SEV-2** | Major | Major feature unavailable or severely degraded | Large subset of customers affected | Mass communication within 30 min |
| **SEV-3** | Minor | Minor feature unavailable or degraded performance | Subset of customers affected | Status page update |
| **SEV-4** | Low | Cosmetic issue or minimal impact | Few customers affected | No mass communication needed |

### Classification Decision Tree

```
Is the service completely unavailable?
├── YES → SEV-1 (Critical)
└── NO → Is a major feature broken?
         ├── YES → Is there a workaround?
         │         ├── NO → SEV-2 (Major)
         │         └── YES → SEV-3 (Minor)
         └── NO → Is there data loss or security exposure?
                   ├── YES → SEV-1 (Critical, regardless of scope)
                   └── NO → Is performance degraded?
                             ├── YES → SEV-3 (Minor)
                             └── NO → SEV-4 (Low)
```

### Customer Impact Assessment

Beyond technical severity, assess customer impact:

```
CUSTOMER IMPACT FACTORS:

  Scope:
    - All customers       → Highest impact
    - All customers on a plan → High impact
    - Geographic subset   → Medium impact
    - Single customer     → Low impact (but high for that customer)

  Revenue Impact:
    - Customers cannot generate revenue → Highest impact
    - Customers cannot access data → High impact
    - Workflow degraded but functional → Medium impact
    - Cosmetic/convenience issue → Low impact

  Duration:
    - >4 hours    → Impact compounds exponentially
    - 1-4 hours   → Significant impact
    - <1 hour     → Manageable impact
    - <15 minutes → Minimal impact

  Time of Day:
    - Business hours (customer's timezone) → Higher impact
    - Off-hours   → Lower immediate impact but trust impact if prolonged
```

---

## 2. Incident Communication Strategy

### Communication Philosophy

During incidents, customer trust is at maximum risk. Every communication must:

1. **Be honest** — Never downplay, deny, or spin. Customers detect dishonesty.
2. **Be timely** — Silence during an incident is worse than bad news. Communicate
   even when there is no update ("We're still investigating").
3. **Be specific** — "Some users may experience issues" is useless. State what is
   broken, who is affected, and what you are doing about it.
4. **Be empathetic** — Acknowledge the impact on the customer's business and workflow.
5. **Be actionable** — If there is a workaround, provide it. If customers should take
   action, tell them exactly what.

### Communication Cadence

| Phase | Timing | Communication |
|-------|--------|---------------|
| **Detection** | T+0 | Internal alert; incident team assembled |
| **Acknowledgment** | T+15 min (SEV-1), T+30 min (SEV-2) | Status page update; mass notification |
| **Updates** | Every 30 min (SEV-1), every 60 min (SEV-2) | Status page update; proactive messaging |
| **Resolution** | When service restored | Status page update; email to affected customers |
| **Post-Mortem** | T+24-72 hours | Detailed follow-up to affected customers |
| **Prevention** | T+1-2 weeks | Communication about what changed to prevent recurrence |

---

## 3. Status Page Management

### Status Page Architecture

```
STATUS PAGE COMPONENTS:

  ┌──────────────────────────────────────────────┐
  │                 STATUS PAGE                    │
  ├──────────────────────────────────────────────┤
  │                                                │
  │  OVERALL STATUS:  [Operational / Degraded /    │
  │                    Partial Outage / Outage]     │
  │                                                │
  │  COMPONENTS:                                   │
  │    Web Application     [●] Operational          │
  │    API                 [●] Operational          │
  │    Mobile App          [◑] Degraded             │
  │    Integrations        [●] Operational          │
  │    Email Delivery      [○] Outage               │
  │    Payments            [●] Operational          │
  │                                                │
  │  ACTIVE INCIDENTS:                             │
  │    [Date] Email delivery delay                  │
  │      └── Latest update: "We've identified..."   │
  │                                                │
  │  RECENT INCIDENTS:                             │
  │    [Date] API latency (resolved)                │
  │    [Date] Scheduled maintenance                 │
  │                                                │
  │  SCHEDULED MAINTENANCE:                        │
  │    [Date] Database migration (2am-4am UTC)      │
  │                                                │
  └──────────────────────────────────────────────┘
```

### Component Status Definitions

| Status | Visual | Definition |
|--------|--------|-----------|
| **Operational** | Green circle | All systems functioning normally |
| **Degraded Performance** | Yellow/half circle | Working but slower or intermittently failing |
| **Partial Outage** | Orange circle | Some users or features affected |
| **Major Outage** | Red circle | Service is unavailable for most or all users |
| **Under Maintenance** | Blue/wrench | Planned maintenance in progress |

### Status Page Platforms

```
Dedicated Status Page Tools:
  - Statuspage (Atlassian)    -- Industry standard; integrates with monitoring
  - Instatus                  -- Modern alternative; good price-performance
  - Sorry (sorryapp.com)      -- Simple, lightweight
  - Cachet                    -- Open source

Monitoring + Status Page:
  - BetterUptime              -- Monitoring + status page combined
  - UptimeRobot              -- Free tier; basic status page
  - Datadog                  -- Enterprise monitoring with status page

Key features to evaluate:
  □ Component-level status
  □ Incident timeline with updates
  □ Subscriber notifications (email, SMS, webhook)
  □ Scheduled maintenance calendar
  □ API for automated status updates
  □ Custom domain support
  □ Uptime metrics and historical data
```

### Subscriber Management

```
STATUS PAGE SUBSCRIBERS:

  Who should be subscribed:
    - All active customers (opt-out, not opt-in)
    - Internal teams (support, engineering, leadership)
    - Key stakeholders and partners

  Notification channels:
    - Email (primary; all subscribers)
    - SMS (opt-in for SEV-1 only)
    - Webhook (for integration with customer monitoring)
    - RSS feed (for automated consumption)
    - In-app banner (real-time for active users)

  Notification preferences:
    - All incidents
    - SEV-1 and SEV-2 only
    - Specific components only
    - Scheduled maintenance only
```

---

## 4. Mass Communication Templates

### Initial Incident Acknowledgment

```
TEMPLATE: INCIDENT ACKNOWLEDGMENT

Subject: [Service Name] — [Brief Issue Description]

We are aware of an issue affecting [specific functionality] for
[affected users/regions].

What is happening:
[Specific description of the problem]

Who is affected:
[Description of affected users, plans, regions]

What we are doing:
Our team is actively investigating and working to resolve this as
quickly as possible. We will provide updates every [30/60] minutes.

Workaround (if available):
[Steps the customer can take to work around the issue]

We apologize for the inconvenience and will keep you updated.

— [Company] Support Team
```

### Progress Update

```
TEMPLATE: INCIDENT UPDATE

Subject: [Update #N] [Service Name] — [Brief Issue Description]

Update as of [time, timezone]:

Current status: [Investigating / Identified / Monitoring / Resolved]

What we know:
[New information about the cause or scope]

What we are doing:
[Specific actions being taken]

Expected timeline:
[Estimated time to resolution, or "We do not yet have an estimated
resolution time and will update you in [30/60] minutes."]

Workaround (if new):
[Any new workaround information]

— [Company] Support Team
```

### Resolution Notification

```
TEMPLATE: INCIDENT RESOLVED

Subject: [Resolved] [Service Name] — [Brief Issue Description]

The issue affecting [specific functionality] has been resolved as of
[time, timezone].

What happened:
[Clear, non-technical explanation of what went wrong]

Duration:
[Start time] to [end time] ([total duration])

Who was affected:
[Specific description of affected users]

What we did:
[High-level description of the fix]

What we are doing to prevent this:
[Specific preventive measures being implemented]

If you continue to experience issues, please [contact support / clear
cache / take specific action].

We apologize for the disruption and appreciate your patience.

— [Company] Support Team
```

### Post-Incident Follow-Up (Customer-Facing Post-Mortem)

```
TEMPLATE: POST-INCIDENT REPORT

Subject: Post-Incident Report: [Brief Issue Description] on [Date]

Dear [Customer/Team],

On [date], [service] experienced [duration]-long [outage/degradation]
that affected [scope]. We take the reliability of our service
seriously, and we want to share what happened, why, and what we are
doing to prevent it.

## Timeline
- [Time]: [Event]
- [Time]: [Event]
- [Time]: Issue detected
- [Time]: Investigation began
- [Time]: Root cause identified
- [Time]: Fix implemented
- [Time]: Service restored
- [Time]: All systems confirmed operational

## Root Cause
[Non-technical but honest explanation of what caused the incident]

## Impact
- [N] customers affected
- [Feature/service] unavailable for [duration]
- [Data impact, if any]

## Resolution
[What was done to resolve the incident]

## Prevention
We are implementing the following changes to prevent recurrence:
1. [Preventive measure 1] — Expected completion: [date]
2. [Preventive measure 2] — Expected completion: [date]
3. [Preventive measure 3] — Expected completion: [date]

## Customer Impact and Credits
[If applicable: description of credits, extensions, or compensation]

We are committed to earning your trust every day. If you have
questions about this incident, please reply to this email or contact
our support team.

— [Name], [Title]
```

---

## 5. Incident Support Operations

### Support Team During Incidents

During an active incident, the support team operates in a special mode:

```
INCIDENT SUPPORT PROTOCOL:

  ROLE: INCIDENT COMMANDER (Support)
    - Single point of contact between support and engineering incident team
    - Monitors engineering incident channel for updates
    - Crafts customer-facing communications
    - Coordinates support team response

  ROLE: FRONTLINE AGENTS
    - Use pre-approved canned responses for incoming incident-related tickets
    - Do NOT troubleshoot known incident issues individually
    - Tag all incident-related tickets with incident ID
    - Escalate non-incident tickets normally (do not neglect other customers)

  ROLE: TRIAGE AGENT
    - Monitor incoming ticket volume for incident-related vs. unrelated
    - Report volume trends to incident commander
    - Identify new symptoms that may indicate expanded scope
```

### Canned Responses for Active Incidents

```
INITIAL RESPONSE (while incident is active):

Thank you for reaching out. We are currently aware of an issue
affecting [feature/service] and our engineering team is actively
working to resolve it.

You can follow real-time updates on our status page: [URL]

[If workaround available:] In the meantime, you can [workaround].

We apologize for the inconvenience and will notify you when the
issue is resolved.

---

FOLLOW-UP (if customer asks for more detail):

I understand your concern. Here is the latest update as of [time]:

[Paste latest status page update]

Our team is [specific action]. We expect [timeline or "we will
provide another update within [timeframe]"].

Your ticket is linked to this incident and will be updated
automatically when resolved.
```

---

## 6. Customer Recovery and Credits

### Recovery Framework

After an incident, customer recovery aims to restore trust and prevent churn.

### Credit Policy Matrix

| Severity | Duration | Credit / Compensation |
|----------|----------|----------------------|
| SEV-1 | <1 hour | Apology; no credit unless SLA breach |
| SEV-1 | 1-4 hours | Pro-rated credit for affected period |
| SEV-1 | 4-24 hours | Full day credit + personal outreach |
| SEV-1 | >24 hours | Week credit + executive outreach + recovery plan |
| SEV-2 | <4 hours | Apology; credit on request |
| SEV-2 | 4-24 hours | Pro-rated credit |
| SEV-2 | >24 hours | Full day credit + personal outreach |
| SEV-3 | Any | Apology; credit only for SLA breach |

### Credit Calculation

```
PRO-RATED CREDIT:

  Monthly credit = (Monthly subscription / 30 days / 24 hours)
                   * Incident duration (hours)
                   * Impact multiplier

  Impact Multiplier:
    Complete outage (SEV-1):  2.0x
    Major degradation (SEV-2): 1.5x
    Minor degradation (SEV-3): 1.0x

  Example:
    $300/month subscription
    4-hour SEV-1 outage
    Credit = ($300 / 30 / 24) * 4 * 2.0 = $3.33/hr * 4 * 2 = $3.33

    Note: Many companies set a minimum credit amount (e.g., $25) to
    avoid insulting customers with trivially small amounts.
```

### Proactive Recovery Actions

| Action | When | Impact |
|--------|------|--------|
| **Personal email from support lead** | SEV-1/2, >1 hour | Shows human accountability |
| **Phone call to top accounts** | SEV-1, any duration | Personal touch prevents churn |
| **Automatic credit applied** | SLA breach | Reduces customer effort to get credit |
| **Extended trial/feature access** | Repeated incidents | Demonstrates commitment |
| **Executive outreach** | Enterprise accounts, repeated incidents | Shows organizational commitment |
| **Post-incident check-in** | 2 weeks after SEV-1/2 | Ensures lasting trust recovery |

---

## 7. Post-Incident Analysis (Support Perspective)

### Support-Specific Post-Mortem Questions

```
SUPPORT POST-INCIDENT REVIEW:

  DETECTION:
    1. How was the incident first detected? (Monitoring, customer report, internal?)
    2. If customer-reported: How long before first customer ticket?
    3. Could we have detected this sooner?

  COMMUNICATION:
    4. How quickly was the status page updated after detection?
    5. Were all communication SLAs met (acknowledgment, updates, resolution)?
    6. Was the communication clear, accurate, and empathetic?
    7. Were customers informed of workarounds promptly?

  OPERATIONS:
    8. How many tickets were generated by the incident?
    9. What was the impact on non-incident ticket response times?
    10. Were canned responses deployed quickly and accurately?
    11. Were agents adequately briefed on the incident?

  RECOVERY:
    12. Were credits applied appropriately and promptly?
    13. Were high-value customers contacted personally?
    14. What was the CSAT for incident-related tickets?

  PREVENTION:
    15. What KB articles need to be created or updated?
    16. What canned responses need to be updated?
    17. Are there process improvements for the next incident?
    18. Do monitoring or alerting systems need changes?
```

---

## 8. Incident Preparedness

### Incident Readiness Checklist

```
PREPAREDNESS AUDIT (quarterly):

  COMMUNICATION:
    □ Status page operational and tested
    □ Subscriber list current (new customers auto-added)
    □ Communication templates reviewed and updated
    □ Incident commander rotation schedule current

  OPERATIONS:
    □ Canned responses for active incidents up to date
    □ Incident tagging taxonomy configured in helpdesk
    □ Escalation paths to engineering tested
    □ On-call schedule for support incident commander current

  TEAM:
    □ All agents trained on incident protocol
    □ Incident drill conducted in past 90 days
    □ New agents onboarded on incident procedures
    □ Post-incident review process documented

  TOOLS:
    □ Monitoring dashboards accessible to support team
    □ Status page automation tested (auto-update from monitoring)
    □ Mass notification system tested
    □ Internal communication channel (Slack/Teams) for incidents active
```

### Incident Drill Protocol

Conduct a simulated incident quarterly:

```
INCIDENT DRILL:

  Scenario: [Simulated SEV-2 outage of specific feature]

  Test:
    1. Detection: How quickly does support notice?
    2. Triage: Is the correct incident protocol activated?
    3. Communication: Are templates deployed correctly?
    4. Coordination: Does support-engineering handoff work?
    5. Resolution: Are customers notified of resolution?
    6. Recovery: Is post-incident process initiated?

  Debrief:
    - What worked well?
    - What was slow or confused?
    - What needs updating?
    - Action items assigned with deadlines
```

---

## References

1. ITIL v4 (2019). "Incident Management Practice Guide."
2. PagerDuty (2024). "Incident Response Operations Guide."
3. Atlassian (2024). "Incident Management Handbook."
4. Google SRE (2016). "Site Reliability Engineering." O'Reilly.
5. Statuspage.io (2023). "Incident Communication Best Practices."
6. TSIA (2024). "Customer Communication During Incidents."

---

**This document is authoritative for incident management within the Support Brain.**
