# Scaling Operations -- Processes That Break at 10x

## Overview

Every operational process that works at one scale breaks at the next order
of magnitude. The customer onboarding process that works for 10 customers
per month breaks at 100. The deployment process that works for weekly
releases breaks at daily. The hiring process that works for 5 hires per
quarter breaks at 50.

Scaling operations is the discipline of identifying which processes will
break at the next growth stage, redesigning them proactively, and
building the systems (standardization, playbooks, knowledge management,
automation) that enable the organization to grow without proportional
increases in headcount or cost.

---

## What Breaks at 10x

### The 10x Rule

When any dimension of the business grows by 10x, the processes supporting
it must be fundamentally redesigned, not incrementally improved. A process
designed for 10 cannot handle 100 with "minor tweaks."

```
SCALE TRANSITION MAP:
+------------------+------------------+------------------+
| 1-10 Scale       | 10-100 Scale     | 100-1000 Scale  |
| (Heroic)         | (Systematic)     | (Automated)     |
+------------------+------------------+------------------+
| Manual processes  | Documented SOPs  | Automated workflows|
| Founder does it  | Specialists do it| Systems do it    |
| Exceptions are   | Exceptions are   | Exceptions are   |
| the norm         | managed          | auto-routed      |
| Tribal knowledge | Written playbooks| Knowledge systems|
| Ad hoc tools     | Purpose-built    | Integrated       |
|                  | tools            | platforms         |
| Communication:   | Communication:   | Communication:   |
| yell across room | Slack channels   | Async + automated|
+------------------+------------------+------------------+
```

### Processes That Commonly Break

| Process | Breaks at | Root Cause | Fix |
|---------|----------|-----------|-----|
| Customer onboarding | 50+ customers/month | Manual steps, custom work per customer | Self-service, templates, automation |
| Hiring | 10+ hires/quarter | No process, founder interviews all | Structured process, delegated interviews |
| Deployment | Daily releases | Manual deployment, no CI/CD | Automated CI/CD pipeline |
| Customer support | 100+ tickets/week | No KB, no triage, all handled ad hoc | Knowledge base, triage system, SLAs |
| Financial reporting | $1M+ revenue | Spreadsheets, manual reconciliation | Accounting system, automated reporting |
| Decision-making | 50+ employees | All decisions go through founder | Delegation framework, decision rights |
| Communication | 15+ people | Information shared verbally | Written communication, documentation |
| Quality assurance | 10+ engineers | No test automation, manual testing | Automated test suite, CI integration |

### How to Identify What Will Break Next

```
SCALING AUDIT CHECKLIST:
For each critical process, ask:

1. If volume/load increased 10x tomorrow, would this process work?
   [ ] Yes --> Low priority (for now)
   [ ] No  --> HIGH PRIORITY: redesign before growth demands it

2. How many people does this process require?
   [ ] Scales linearly with volume --> UNSUSTAINABLE
   [ ] Scales sublinearly (automation helps) --> SUSTAINABLE
   [ ] Fixed regardless of volume --> IDEAL

3. Is this process documented?
   [ ] Yes, up to date --> Ready to delegate/automate
   [ ] Yes, outdated --> Update before scaling
   [ ] No --> DOCUMENT FIRST, then scale

4. What is the single point of failure?
   [ ] One person who knows how it works
   [ ] One tool that everything depends on
   [ ] One manual step that bottlenecks everything
```

---

## Standardization

### Why Standardize

Standardization is not bureaucracy -- it is the foundation for scale.
You cannot improve what is not standard. You cannot automate what is not
standardized. You cannot delegate what is not documented.

```
STANDARDIZATION HIERARCHY:
1. DEFINE: What is the current best practice?
2. DOCUMENT: Write it down (SOP)
3. TRAIN: Ensure everyone knows the standard
4. MEASURE: Track compliance and outcomes
5. IMPROVE: Update the standard based on data
6. AUTOMATE: Encode the standard in systems
```

### Standard Operating Procedures (SOPs)

```
SOP TEMPLATE:
+--------------------------------------------------+
| TITLE: [Process Name]                            |
| VERSION: [X.X]                                   |
| OWNER: [Role]                                    |
| LAST UPDATED: [Date]                             |
| REVIEW FREQUENCY: [Quarterly / Semi-annually]    |
|                                                  |
| PURPOSE:                                         |
| [Why this process exists, 1-2 sentences]        |
|                                                  |
| SCOPE:                                           |
| [When to use this SOP, when NOT to use it]      |
|                                                  |
| PREREQUISITES:                                   |
| [What must be true before starting]             |
|                                                  |
| STEPS:                                           |
| 1. [Step] -- Tool: [X] -- Time: [X min]        |
| 2. [Step] -- Tool: [X] -- Time: [X min]        |
| 3. [Step] -- Tool: [X] -- Time: [X min]        |
|                                                  |
| DECISION POINTS:                                 |
| At step [X]: If [A], do [B]. If [C], do [D].   |
|                                                  |
| EXCEPTIONS:                                      |
| [How to handle unusual cases]                   |
|                                                  |
| QUALITY CHECK:                                   |
| [How to verify the output is correct]           |
|                                                  |
| METRICS:                                         |
| - Target cycle time: [X]                        |
| - Target quality: [X%] error-free               |
+--------------------------------------------------+
```

---

## Playbooks

### What a Playbook Is

A playbook is a comprehensive guide for handling a category of work.
While an SOP covers a single process, a playbook covers a domain:
the strategy, the processes, the tools, the metrics, and the decision
frameworks.

```
PLAYBOOK STRUCTURE:
+--------------------------------------------------+
| 1. OVERVIEW                                      |
|    Why this playbook exists                      |
|    What it covers and does not cover             |
|                                                  |
| 2. STRATEGY                                      |
|    Goals, principles, and approach               |
|                                                  |
| 3. PROCESSES                                     |
|    Step-by-step procedures for common scenarios  |
|    Decision trees for routing                    |
|                                                  |
| 4. TOOLS                                         |
|    What tools are used and how                   |
|    Access instructions                           |
|                                                  |
| 5. METRICS                                       |
|    What we measure and why                       |
|    Dashboards and reporting                      |
|                                                  |
| 6. TROUBLESHOOTING                               |
|    Common problems and solutions                 |
|    Escalation paths                              |
|                                                  |
| 7. FAQ                                           |
|    Frequently asked questions                    |
|                                                  |
| 8. CHANGELOG                                     |
|    Version history of this playbook              |
+--------------------------------------------------+
```

### Playbook Examples

- Customer Onboarding Playbook
- Incident Response Playbook
- Hiring Playbook
- New Market Entry Playbook
- Vendor Onboarding Playbook
- Product Launch Playbook

---

## Knowledge Management

### The Knowledge Problem at Scale

```
AT 10 PEOPLE: Knowledge is in people's heads
AT 50 PEOPLE: Knowledge is scattered across Slack, emails, docs
AT 150 PEOPLE: Knowledge is siloed by team
AT 500 PEOPLE: Knowledge is duplicated, contradictory, and unfindable
```

### Knowledge Management System

```
KNOWLEDGE HIERARCHY:
1. INDIVIDUAL KNOWLEDGE
   Skills, experience, relationships
   Risk: Leaves when the person leaves
   Mitigation: Documentation, cross-training, pair work

2. TEAM KNOWLEDGE
   Shared practices, team norms, tribal knowledge
   Risk: Lost when team reorganizes
   Mitigation: Playbooks, wikis, retrospective logs

3. ORGANIZATIONAL KNOWLEDGE
   SOPs, policies, strategies, architectural decisions
   Risk: Becomes outdated
   Mitigation: Review cadence, ownership assignment

4. EMBEDDED KNOWLEDGE
   Automated processes, code, templates, systems
   Risk: Black box (nobody knows why it works)
   Mitigation: Documentation, code comments, decision records
```

### Knowledge Management Practices

1. **Write things down** -- If it is not written, it does not exist at scale
2. **Single source of truth** -- One place for each type of knowledge
3. **Assign owners** -- Every document has an owner responsible for accuracy
4. **Review cadence** -- Every document is reviewed quarterly or semi-annually
5. **Make it findable** -- Good organization, search, and cross-linking
6. **Make it useful** -- Written for the reader, not the author

---

## Automation Prioritization

### The Automation Decision Framework

```
SHOULD WE AUTOMATE THIS?

Is the process standardized and documented?
  NO  --> Standardize first, then consider automation
  YES --> Continue

Is the process repeated frequently?
  RARELY (monthly) --> Low priority for automation
  REGULARLY (weekly) --> Medium priority
  FREQUENTLY (daily+) --> HIGH PRIORITY

Is the process error-prone when done manually?
  NO  --> Lower priority
  YES --> HIGHER PRIORITY (automation reduces errors)

What is the ROI?
  Hours saved per year = Frequency x Time per occurrence
  Automation cost = Development time x Hourly rate
  ROI = (Hours saved x Hourly rate) / Automation cost

  ROI > 3x within 12 months --> AUTOMATE
  ROI 1-3x within 12 months --> EVALUATE
  ROI < 1x within 12 months --> DO NOT AUTOMATE YET
```

### Automation Maturity Levels

```
LEVEL 0: FULLY MANUAL
  Human does everything.

LEVEL 1: CHECKLIST-ASSISTED
  Human follows a checklist. Reduces errors.

LEVEL 2: TOOL-ASSISTED
  Human uses tools (scripts, templates). Faster.

LEVEL 3: SEMI-AUTOMATED
  Human triggers; system executes. Scalable.

LEVEL 4: FULLY AUTOMATED
  System runs autonomously. Human monitors.

LEVEL 5: SELF-OPTIMIZING
  System runs, monitors, and improves itself.
```

### Automation Prioritization Matrix

```
              HIGH FREQUENCY
                    |
    AUTOMATE        |       AUTOMATE
    IMMEDIATELY     |       NEXT
    (high freq,     |       (high freq,
     high ROI)      |        lower ROI)
                    |
LOW ROI --------+------------ HIGH ROI
                    |
    MANUAL IS OK    |       AUTOMATE
    (low freq,      |       WHEN CONVENIENT
     low ROI)       |       (low freq,
                    |        high ROI)
                    |
              LOW FREQUENCY
```

---

## Scaling Operations Checklist

Before the next 10x growth:

```
- [ ] All critical processes documented (SOPs)
- [ ] Playbooks exist for key operational domains
- [ ] Knowledge management system in place
- [ ] Automation roadmap prioritized
- [ ] Single points of failure identified and mitigated
- [ ] Metrics and dashboards operational
- [ ] Team cross-trained on critical processes
- [ ] Capacity plan for next 12 months
- [ ] Vendor scalability confirmed
- [ ] Communication systems scale-tested
```

---

**Scaling operations is proactive, not reactive. The Operations Brain
identifies what will break at the next growth stage and redesigns it
before it breaks. Standardize, document, automate, measure -- in that
order, always.**
