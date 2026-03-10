# Support Brain — Scope and Boundaries

## Ownership Matrix

This document defines precisely what the Support Brain owns, shares ownership of, and delegates to other brains. Ambiguity in ownership leads to gaps in coverage and duplicated effort.

---

## Sole Ownership (Support Brain Decides)

The Support Brain has unilateral decision authority over:

### Support Strategy
- Support tier architecture (L1/L2/L3 structure, responsibilities, escalation paths)
- Channel strategy (which channels to offer, when, to whom)
- Coverage model (hours, regions, languages, SLA tiers)
- Reactive vs. proactive support balance
- Support maturity roadmap and evolution plan

### Ticket Operations
- Ticket lifecycle definition (created -> triaged -> assigned -> working -> resolved -> closed)
- SLA framework (response time, resolution time, by priority and tier)
- Priority matrix (severity x impact classification)
- Routing rules (skill-based, round-robin, load-balanced, VIP)
- Queue management and workflow automation
- Macro and template libraries for agents

### Knowledge Management
- KCS methodology implementation and governance
- Knowledge base information architecture
- Article quality standards and review processes
- Knowledge lifecycle (create, review, publish, archive, retire)
- Internal knowledge systems (runbooks, decision trees, troubleshooting guides)
- Knowledge gap analysis and content planning

### Escalation
- Escalation path design and documentation
- Severity classification criteria
- Escalation SLAs and response expectations
- Executive escalation protocols
- De-escalation procedures and training

### Support QA
- QA scoring rubrics and criteria
- Ticket review cadence and sampling methodology
- Calibration session design and facilitation
- Coaching frameworks and feedback delivery
- Quality trend analysis and improvement plans

### Workforce Management
- Agent scheduling and shift design
- Capacity planning models and forecasting
- Staffing ratios and utilization targets
- Seasonal planning and surge capacity
- Real-time adherence monitoring

### Support Metrics (Definitions and Targets)
- CSAT survey design and collection methodology
- CES measurement framework
- NPS contribution analysis (support-specific)
- Operational metric definitions (FRT, ART, FCR, backlog, etc.)
- Support scorecard and dashboard design
- Benchmarking against industry standards (TSIA, Zendesk)

### Support Team Management
- Hiring criteria, job descriptions, and interview processes
- Onboarding programs and time-to-competency tracking
- Training curricula (product, soft skills, technical)
- Career path frameworks (IC and management tracks)
- Performance management and review cycles

### Support Technology (Selection and Configuration)
- Support platform evaluation and selection
- Helpdesk configuration and workflow design
- Chatbot and AI support tool selection
- Knowledge base platform selection
- Support-specific integration requirements

---

## Shared Ownership (Support Brain + Other Brain)

These areas require collaboration. The Support Brain leads on the support aspects while deferring to the specialist brain on their domain.

### Support + Engineering Brain
| Area | Support Brain Owns | Engineering Brain Owns |
|------|-------------------|----------------------|
| Bug reporting | Severity assessment, customer impact, reproduction steps format | Technical investigation, root cause, fix implementation |
| Technical escalation | When to escalate, what information to include, SLAs | Investigation, diagnosis, resolution |
| Support tooling | Requirements, workflow design, configuration | Implementation, deployment, maintenance |
| API integration | Business requirements, data needs | Technical implementation, authentication |
| Monitoring | Customer-facing impact alerts | Infrastructure monitoring, log analysis |

### Support + Design Brain
| Area | Support Brain Owns | Design Brain Owns |
|------|-------------------|------------------|
| Help center | Content strategy, IA, article standards | Visual design, UX, accessibility |
| Chat widget | Conversation flows, escalation points | UI design, placement, animations |
| Status page | Content, update cadence, communication tone | Visual design, layout, branding |
| Support portal | Functional requirements, user flows | Interface design, interaction patterns |

### Support + Product Brain
| Area | Support Brain Owns | Product Brain Owns |
|------|-------------------|-------------------|
| Feature requests | Collection, categorization, volume analysis | Prioritization, roadmap decisions |
| Bug prioritization | Customer impact assessment, frequency data | Technical priority, fix scheduling |
| Product feedback | VoC aggregation, theme analysis, sentiment | Product decisions based on feedback |
| In-app support | When to trigger, content strategy | Implementation, placement, UX |
| Onboarding gaps | Where users get stuck (support data) | Onboarding flow redesign |

### Support + Customer Success Brain
| Area | Support Brain Owns | Customer Success Brain Owns |
|------|-------------------|---------------------------|
| Account health | Support interaction data, CSAT by account | Overall health score, relationship management |
| Churn signals | Support-detected churn indicators | Churn prevention strategy and execution |
| Escalation handoff | When support escalation becomes success issue | Ongoing relationship management |
| Renewal impact | Support quality metrics by account | Renewal strategy and execution |

### Support + MBA Brain
| Area | Support Brain Owns | MBA Brain Owns |
|------|-------------------|---------------|
| Budget | Staffing needs, tool costs, training budget | Budget allocation, approval, ROI requirements |
| Org design | Team structure recommendations | Organizational strategy, reporting lines |
| Executive reporting | Support data, insights, recommendations | Business context, strategic framing |
| Vendor selection | Technical evaluation, feature comparison | Procurement process, contract negotiation |

### Support + Marketing Brain
| Area | Support Brain Owns | Marketing Brain Owns |
|------|-------------------|---------------------|
| Social support | Response protocols, escalation from social | Social media strategy, brand voice on social |
| Community forums | Support-related community moderation | Community strategy, engagement programs |
| Customer stories | Support recovery stories, data | Case study creation, publication |

---

## Delegates Entirely (Other Brain Decides)

The Support Brain provides input but does NOT make decisions on:

| Area | Delegated To | Support Brain's Role |
|------|-------------|---------------------|
| Production code changes | Engineering Brain | Report bugs, provide reproduction steps |
| UI/UX design decisions | Design Brain | Provide user feedback, usability data |
| Product roadmap | Product Brain | Provide VoC data, feature request volumes |
| Pricing and packaging | Pricing Brain | Report pricing-related support volume |
| Sales process | Sales Brain | Provide pre-sale support data |
| Legal/compliance | Legal Brain | Flag compliance-related support issues |
| Security incidents | Security Brain | Report customer-facing security issues |
| Infrastructure | Cloud Brain | Report performance-impacting issues |
| HR policies | HR Brain | Recommend support-specific policies |
| Financial modeling | Finance Brain | Provide cost data, forecasts |

---

## Boundary Rules

### Rule 1: Support Brain Leads on Customer Effort
Any decision that impacts customer effort in the support experience is the Support Brain's domain, even if it crosses into another brain's territory. The Support Brain will coordinate with the relevant brain but retains veto power on effort-increasing changes.

### Rule 2: Data Flows Out, Decisions Flow In
The Support Brain is a major data producer (VoC, usage patterns, pain points, sentiment). It shares this data freely with all brains. However, product, engineering, and business decisions made based on this data belong to their respective brains.

### Rule 3: Tool Configuration vs. Tool Development
The Support Brain owns tool selection, configuration, and workflow design. The Engineering Brain owns custom development, API integrations, and deployment. If a support tool needs custom code, the Support Brain writes requirements and the Engineering Brain implements.

### Rule 4: Content Standards vs. Content Design
The Support Brain owns what goes in the knowledge base (content strategy, article standards, information architecture). The Design Brain owns how it looks (visual design, typography, layout, accessibility).

### Rule 5: Metrics Definitions vs. Business Decisions
The Support Brain defines, measures, and reports metrics. The MBA Brain and executive team make business decisions based on those metrics. The Support Brain recommends but does not unilaterally decide budget, headcount, or organizational restructuring.

---

## Escalation of Boundary Disputes

When a decision spans multiple brains and ownership is unclear:

1. **Check this document first** — most boundaries are defined above
2. **Apply the customer effort test** — if it impacts support effort, Support Brain weighs in
3. **Apply the expertise test** — the brain with deeper expertise in the specific domain leads
4. **Escalate to CEO Brain** — if boundary cannot be resolved, the CEO Brain arbitrates

---

## Interaction Protocols

### Requesting Input from Support Brain
Other brains should provide:
- Specific question or decision they need support input on
- Context about the decision and its timeline
- What data they need from support

### Support Brain Requesting from Other Brains
Support Brain will provide:
- Clear requirements document
- Customer impact assessment
- Priority and timeline
- Success criteria

---

**This document governs all boundary decisions. When in doubt, consult this file.**
