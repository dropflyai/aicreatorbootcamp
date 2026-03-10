# Crisis Management -- Detection, Response, and Recovery

## Overview

A crisis is any event that threatens the viability, reputation, or
fundamental operations of the organization and requires immediate,
coordinated response beyond normal operating procedures. Crises are
inevitable; how the CEO responds determines whether the organization
emerges stronger or weaker.

This module codifies the detection systems, severity assessment frameworks,
response protocols, communication templates, and post-mortem processes that
the CEO Brain employs when normal operating conditions break down.

---

## Crisis Detection

### Early Warning Systems

Most crises do not arrive without warning. They are preceded by weak
signals that go unnoticed or are dismissed:

```
CRISIS SIGNAL HIERARCHY
+--------------------------------------------------+
| LEVEL 1: WEAK SIGNALS (months before crisis)     |
|   - Unusual patterns in metrics                  |
|   - Customer complaints about new issues         |
|   - Employee rumors and departures               |
|   - Competitor behavior changes                  |
|   - Regulatory attention                         |
+--------------------------------------------------+
| LEVEL 2: STRONG SIGNALS (weeks before crisis)    |
|   - Metrics trending clearly negative            |
|   - Key customers threatening to leave           |
|   - Multiple employees raising the same concern  |
|   - Press inquiries about the issue              |
|   - Board member concern                         |
+--------------------------------------------------+
| LEVEL 3: CRISIS ONSET (hours to days)            |
|   - Metric threshold breach                      |
|   - Customer or employee public complaint        |
|   - Regulatory action                            |
|   - Security incident detected                   |
|   - Major system outage                          |
+--------------------------------------------------+
```

### Detection Protocols

For each crisis type, the CEO Brain maintains detection thresholds:

```
METRIC-BASED DETECTION
+------------------------------+------------------+
| Metric                       | Crisis Threshold |
+------------------------------+------------------+
| Monthly churn rate          | >2x normal       |
| Cash runway                 | <6 months        |
| System uptime               | <99.5%           |
| Customer NPS                | Drop >20 points  |
| Employee NPS                | Drop >15 points  |
| Revenue growth              | Negative 2+ months|
| Security incidents          | Any P0/P1        |
| Key employee departures     | >2 in 30 days    |
| Press/social media sentiment| Sudden negative   |
+------------------------------+------------------+
```

---

## Crisis Assessment: Severity Classification

### The Severity Matrix

```
           LOW URGENCY          HIGH URGENCY
         (days to respond)    (hours to respond)
HIGH    +-------------------+-------------------+
IMPACT  | SEVERITY 2        | SEVERITY 1        |
        | "Serious"         | "Critical"        |
        |                   |                   |
        | Structured        | Immediate         |
        | response within   | response: CEO     |
        | 48 hours          | takes command      |
        +-------------------+-------------------+
LOW     | SEVERITY 4        | SEVERITY 3        |
IMPACT  | "Monitor"         | "Respond"         |
        |                   |                   |
        | Delegate to       | Quick response,   |
        | specialist brain  | CEO informed      |
        +-------------------+-------------------+
```

### Severity 1: Critical

Definition: Existential threat requiring immediate CEO command.

Triggers:
- Data breach with customer data exposure
- Complete system outage (revenue-generating)
- Regulatory enforcement action
- Founder/CEO removal or incapacitation
- Cash will run out in <30 days
- Mass employee resignation (key team)
- Major customer contract termination (>20% revenue)

CEO response: Drop everything. Activate incident commander protocol.
All brains on standby. Communication to all stakeholders within hours.

### Severity 2: Serious

Definition: Significant threat requiring structured response within 48 hours.

Triggers:
- Security vulnerability discovered (not yet exploited)
- Key executive departure
- Major competitor launch directly targeting us
- Negative press coverage gaining traction
- Significant customer escalation
- Legal threat (lawsuit, cease and desist)

CEO response: Assess within 4 hours. Form response team. Structured
plan within 48 hours. Communication to affected stakeholders.

### Severity 3: Respond

Definition: Issue requiring quick response but not CEO direct involvement.

Triggers:
- Service degradation (not full outage)
- Customer complaint going viral on social media
- Employee misconduct allegation
- Vendor service disruption
- Minor regulatory inquiry

CEO response: Informed immediately. Delegates to appropriate brain.
Reviews response plan. Approves communication.

### Severity 4: Monitor

Definition: Concerning signal that requires monitoring but not immediate action.

Triggers:
- Metrics trending negative but not at threshold
- Competitor activity that may or may not be a threat
- Industry regulatory discussion
- Single key employee expressing dissatisfaction

CEO response: Add to watch list. Review weekly. Define escalation
trigger.

---

## Response Protocol: The Incident Commander Model

### Why Incident Commander

The Incident Commander (IC) model, adapted from emergency services and
site reliability engineering, provides clear authority and structure during
crisis:

```
INCIDENT COMMANDER (CEO or designated leader)
      |
      +-- COMMUNICATIONS LEAD
      |     (manages all stakeholder communication)
      |
      +-- TECHNICAL LEAD
      |     (manages the technical response)
      |
      +-- OPERATIONS LEAD
      |     (manages logistics and resources)
      |
      +-- SUBJECT MATTER EXPERTS
            (pulled in as needed)
```

### The Incident Commander's Responsibilities

1. **Assume command** -- Make it clear who is in charge
2. **Assess the situation** -- What happened? What is the impact? What is
   ongoing?
3. **Set priorities** -- In this order: safety, stabilization, investigation,
   resolution, communication
4. **Assign roles** -- Communications, technical, operations
5. **Establish communication cadence** -- How often, to whom, through what
   channel
6. **Make decisions** -- The IC decides; debate is welcome but brief
7. **Document** -- Everything is logged for post-mortem

### Crisis Response Timeline

```
HOUR 0: DETECTION
- Crisis detected or reported
- Initial assessment: what do we know?
- Severity classification

HOUR 0-1: ACTIVATION
- Incident commander designated (CEO for Severity 1)
- Core team assembled
- Communication channels established (war room)
- Initial stakeholder notification ("we are aware and responding")

HOUR 1-4: STABILIZATION
- Contain the damage (stop the bleeding)
- Protect customers and data
- Preserve evidence (for investigation)
- Begin root cause investigation
- Second stakeholder update

HOUR 4-24: RESOLUTION
- Implement fix or mitigation
- Verify fix effectiveness
- Monitor for recurrence
- Detailed stakeholder communication
- Begin post-mortem documentation

DAY 1-7: RECOVERY
- Full root cause analysis
- Permanent fix implementation
- Customer remediation (if applicable)
- Internal debrief and learning
- Process improvements identified

DAY 7-30: POST-MORTEM
- Formal post-mortem document
- Systemic improvements implemented
- Communication to all stakeholders on what we learned
- Updated crisis playbook
```

---

## Communication During Crisis

### The Communication Hierarchy

```
AUDIENCE          TIMING           CHANNEL         TONE
-----------       --------         -------         ----
Affected          Immediate        Direct          Empathetic,
customers         (within hours)   (email/phone)   factual

All customers     Within 24h       Blog/email      Transparent,
                                                   reassuring

Employees         Within hours     All-hands/Slack  Honest,
                                                   actionable

Board             Within hours     Call/email       Complete,
                  (Severity 1)                      actionable

Press/Public      When ready       Press release/   Measured,
                  (not reactive)   blog post        factual

Investors         Within 24h       Direct call      Honest,
                                                   forward-looking

Regulators        As required      Formal           Compliant,
                  by regulation    channels         documented
```

### Crisis Communication Principles

1. **Speed over perfection** -- An imperfect early communication beats a
   perfect late one
2. **Honesty over spin** -- Admit what you know and do not know
3. **Empathy over defensiveness** -- Lead with impact on people, not excuses
4. **Forward-looking** -- What are you doing about it?
5. **Consistent** -- All channels say the same thing
6. **Updated** -- Communicate regularly even if there is no new information

### The Crisis Communication Template

```
CRISIS COMMUNICATION (External)
+--------------------------------------------------+
| SUBJECT: [Clear, factual subject line]           |
|                                                  |
| PARAGRAPH 1: WHAT HAPPENED                       |
| "On [date] at [time], we [discovered/experienced]|
| [factual description of the event]."             |
|                                                  |
| PARAGRAPH 2: IMPACT                              |
| "This affected [who/what]. Specifically,         |
| [describe the impact honestly]."                 |
|                                                  |
| PARAGRAPH 3: WHAT WE ARE DOING                   |
| "We immediately [actions taken]. We are          |
| currently [ongoing actions]. We expect           |
| [timeline for resolution]."                      |
|                                                  |
| PARAGRAPH 4: WHAT YOU CAN DO                     |
| "If you are affected, [specific actions          |
| customers should take]."                         |
|                                                  |
| PARAGRAPH 5: COMMITMENT                          |
| "We take this seriously. We will [specific       |
| commitment to prevent recurrence]. We will       |
| provide an update by [date]."                    |
|                                                  |
| SIGN-OFF: [CEO name and title]                   |
+--------------------------------------------------+
```

---

## Crisis Types and Brain Routing

| Crisis Type | Primary Brain | Supporting Brains |
|------------|--------------|-------------------|
| Data breach / Security | Security Brain | Engineering, Legal, Support |
| System outage | Engineering Brain | Cloud, QA, Support |
| Financial crisis | Finance Brain | MBA, Legal, CEO |
| PR / Reputation | Marketing Brain | Content, Social Media, Legal |
| Product failure | Product Brain | Engineering, QA, Support |
| People crisis (harassment, misconduct) | HR Brain | Legal, CEO |
| Legal action | Legal Brain | Finance, CEO |
| Market crisis (competitor, disruption) | MBA Brain | Research, Product, CEO |
| Customer exodus | Customer Success Brain | Product, Support, Analytics |
| Regulatory action | Legal Brain | Finance, Operations |

---

## Post-Mortem Protocol

### The Blameless Post-Mortem

```
POST-MORTEM DOCUMENT
+--------------------------------------------------+
| TITLE: [Crisis name]                             |
| DATE: [When it happened]                         |
| SEVERITY: [1-4]                                  |
| DURATION: [Start to resolution]                  |
| INCIDENT COMMANDER: [Name]                       |
|                                                  |
| SUMMARY:                                         |
| [2-3 sentence description]                       |
|                                                  |
| TIMELINE:                                        |
| [Minute-by-minute or hour-by-hour log]          |
|                                                  |
| ROOT CAUSE:                                      |
| [Technical root cause]                           |
| [Process root cause -- what allowed this?]       |
| [Systemic root cause -- why was the process      |
|  insufficient?]                                  |
|                                                  |
| IMPACT:                                          |
| - Customers affected: [number]                   |
| - Revenue impact: [$amount]                      |
| - Data impact: [what was exposed/lost]          |
| - Reputation impact: [assessment]                |
|                                                  |
| WHAT WENT WELL:                                  |
| 1. [Specific thing]                             |
| 2. [Specific thing]                             |
|                                                  |
| WHAT WENT POORLY:                                |
| 1. [Specific thing]                             |
| 2. [Specific thing]                             |
|                                                  |
| ACTION ITEMS:                                    |
| 1. [Action] -- Owner: [Name] -- Due: [Date]    |
| 2. [Action] -- Owner: [Name] -- Due: [Date]    |
| 3. [Action] -- Owner: [Name] -- Due: [Date]    |
|                                                  |
| LESSONS LEARNED:                                 |
| 1. [Lesson for Memory/]                         |
| 2. [Lesson for Memory/]                         |
+--------------------------------------------------+
```

### Post-Mortem Rules

1. **Blameless** -- Focus on systems, not individuals. "The system allowed
   this to happen" not "Person X caused this."
2. **Honest** -- Do not minimize the impact or the failure
3. **Actionable** -- Every finding produces an action item with an owner
4. **Tracked** -- Action items are reviewed until complete
5. **Shared** -- Post-mortem is shared with the entire organization
6. **Timely** -- Conducted within 1 week of resolution

---

## Crisis Preparedness

### The Pre-Crisis Checklist

```
BEFORE ANY CRISIS HAPPENS:
- [ ] Communication templates are drafted for top 5 crisis types
- [ ] Incident commander protocol is documented and practiced
- [ ] Escalation paths are defined (who to call, when)
- [ ] Legal counsel is on retainer and reachable 24/7
- [ ] PR/communications support is identified
- [ ] Customer communication channels are tested
- [ ] Internal communication channels are established
- [ ] Backup plans exist for key single points of failure
- [ ] Insurance coverage reviewed (D&O, cyber, general)
- [ ] Crisis simulation conducted annually
```

### Tabletop Exercises

Quarterly, the CEO Brain should run a tabletop crisis exercise:
1. Scenario is presented (realistic, not catastrophic)
2. Team walks through response protocol
3. Identify gaps in preparedness
4. Update playbooks and contacts

---

**Crisis management is not about preventing crises -- it is about building
the muscle to respond effectively when they inevitably occur. The CEO Brain
maintains crisis readiness, commands the response for Severity 1 events,
and ensures every crisis produces learning that makes the organization
more resilient.**
