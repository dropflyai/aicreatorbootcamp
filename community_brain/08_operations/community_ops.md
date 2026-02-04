# Community Operations — Authoritative Module

Operations is the infrastructure that enables community strategy to execute
reliably at scale. Strategy without operations is aspiration. Operations
without strategy is busywork. This document codifies the team structure,
tooling stack, workflow automation, budget management, and vendor
relationships that sustain community programs.

---

## 1. TEAM STRUCTURE

### Community Team Roles

| Role | Responsibility | When to Hire | Comp Range |
|------|---------------|-------------|-----------|
| Community Manager | Day-to-day community engagement, content, moderation | First hire (0–500 members) | $60K–$100K |
| Community Lead/Director | Strategy, programs, metrics, team management | 500–2,000 members or 2+ staff | $90K–$140K |
| Community Program Manager | Specific programs (events, ambassadors) | When programs formalize | $70K–$110K |
| Community Operations | Tooling, automation, data, reporting | When tooling complexity warrants | $65K–$100K |
| Developer Advocate | Technical content, developer engagement | Developer communities | $100K–$160K |
| Content Manager | Community content strategy and production | When content scales | $60K–$90K |
| Trust & Safety | Moderation, safety, policy enforcement | 10,000+ members or high-risk | $70K–$110K |
| Community VP/Head | Executive ownership, budget, company strategy | When community is a business function | $140K–$200K+ |

### Team Scaling Model

| Community Size | Team Size | Roles |
|---------------|-----------|-------|
| 0–500 | 0.5–1 FTE | Part-time or full-time CM |
| 500–2,000 | 1–2 FTE | CM + part-time programs |
| 2,000–5,000 | 2–3 FTE | Lead + CM + ops or programs |
| 5,000–20,000 | 3–5 FTE | Lead + 2 CMs + programs + ops |
| 20,000–50,000 | 5–10 FTE | Director + specialized team |
| 50,000+ | 10+ FTE | Full team with specializations |

### Organizational Placement

| Placement | Pros | Cons |
|-----------|------|------|
| Marketing | Budget access, content alignment | Treated as marketing channel |
| Product | Feedback loop, product alignment | Under-resourced vs. product |
| Customer Success | Support alignment, retention focus | Narrow scope |
| Engineering (DevRel) | Technical credibility | Disconnected from business |
| Standalone | Full independence, cross-functional | Must justify existence |
| CEO/Founder office | Strategic alignment, executive support | Dependent on champion |

**Recommended:** Community reports to the function it most directly supports.
Developer community → Engineering/DevRel. Customer community → Customer
Success. Thought leadership → Marketing.

---

## 2. TOOLING STACK

### Core Tooling Categories

| Category | Purpose | Examples | Priority |
|----------|---------|---------|---------|
| Community Platform | Member interaction | Discord, Slack, Discourse, Circle | Critical |
| Analytics | Measurement and insight | Common Room, Orbit, platform built-in | High |
| Content | Content creation and management | Notion, Google Docs, WordPress | High |
| Events | Event management | Luma, Eventbrite, StreamYard | High |
| Communication | Member communication | Email (Mailchimp), push notifications | High |
| Moderation | Content and behavior moderation | AutoMod, MEE6, platform tools | High |
| Project Management | Team workflow | Asana, Linear, Notion | Medium |
| CRM Integration | Business attribution | Salesforce, HubSpot integration | Medium |
| Design | Visual content | Figma, Canva | Medium |
| Automation | Workflow automation | Zapier, n8n, Make | Medium |

### Recommended Stacks by Budget

**Bootstrap ($0–$500/month):**
| Need | Tool | Cost |
|------|------|------|
| Platform | Discord or GitHub Discussions | Free |
| Analytics | Platform built-in + Google Sheets | Free |
| Events | Google Meet + Luma | Free |
| Communication | Community platform + free email | Free |
| Moderation | Platform built-in | Free |
| Project management | Notion or Trello | Free |

**Growth ($500–$2,000/month):**
| Need | Tool | Cost |
|------|------|------|
| Platform | Discourse or Circle | $100–$500 |
| Analytics | Orbit starter or Common Room free | $0–$300 |
| Events | StreamYard + Luma | $50–$100 |
| Communication | Mailchimp or ConvertKit | $50–$200 |
| Moderation | MEE6 Pro or platform tools | $20–$50 |
| Automation | Zapier or Make | $50–$200 |

**Scale ($2,000–$10,000/month):**
| Need | Tool | Cost |
|------|------|------|
| Platform | Discourse Enterprise or Circle Pro | $500–$2,000 |
| Analytics | Common Room or Orbit Pro | $500–$2,000 |
| Events | Hopin or platform + StreamYard Pro | $200–$1,000 |
| Communication | Customer.io or Intercom | $200–$500 |
| CRM Integration | Salesforce/HubSpot connector | $200–$500 |
| Automation | n8n self-hosted or Zapier Team | $100–$300 |

---

## 3. WORKFLOW AUTOMATION

### Automatable Community Workflows

| Workflow | Trigger | Actions | Tool |
|----------|---------|---------|------|
| New member welcome | Member joins | Send DM, assign role, log to CRM | Bot + Zapier |
| Event promotion | Event created | Post to community, send email, share social | Zapier/Make |
| Content curation | New post with high engagement | Share in digest, add to best-of | Custom bot |
| Moderation alert | Flagged content | Notify moderator channel, log incident | Platform + bot |
| Milestone celebration | Member hits threshold | Auto-congratulate, award badge | Bot |
| Churn risk alert | Member inactive 14+ days | Notify community manager | Analytics + Zapier |
| Report generation | Weekly schedule | Pull metrics, format report, share | Custom script |
| Event follow-up | Event ends | Send thank-you, recording, survey | Zapier/Make |

### Automation Design Principles

1. **Automate the repetitive, not the personal.** Welcome messages can be
   automated; personal outreach should not be.
2. **Always include an escape hatch.** Every automated message should have
   opt-out or human escalation.
3. **Monitor automation.** Broken automations create worse experiences than
   no automation at all.
4. **Test before scaling.** Run automation on a small group before community-wide.
5. **Document everything.** Every automation should have documentation on
   trigger, action, failure mode, and owner.

### Automation Architecture

```
Event Sources                    Automation Layer               Action Targets
┌──────────┐                    ┌──────────────┐              ┌──────────────┐
│ Discord  │──┐                 │              │              │ Discord DMs  │
│ Discourse│──┤                 │   Zapier /   │──────────────│ Email        │
│ Events   │──┼────────────────▶│   n8n /      │──────────────│ Slack        │
│ CRM      │──┤                 │   Custom     │──────────────│ Spreadsheet  │
│ Forms    │──┘                 │              │              │ CRM          │
└──────────┘                    └──────────────┘              └──────────────┘
```

---

## 4. BUDGET MANAGEMENT

### Community Budget Framework

| Category | % of Total | Description |
|----------|-----------|-------------|
| People | 50–70% | Team compensation and benefits |
| Platform/Tooling | 10–20% | Software, integrations, infrastructure |
| Events | 10–20% | Virtual and in-person event costs |
| Programs | 5–10% | Ambassador rewards, swag, recognition |
| Content | 5–10% | Design, production, distribution |
| Contingency | 5–10% | Unexpected needs, opportunities |

### Budget Justification

Community budget requests must include:
1. **Current performance** — What the community has delivered
2. **Growth projections** — Expected growth with and without investment
3. **ROI calculation** — Conservative value estimate vs. cost
4. **Competitive context** — What competitors invest in community
5. **Risk of under-investment** — What happens without budget

### Budget Tracking

| Item | Budgeted | Actual | Variance | Notes |
|------|----------|--------|----------|-------|
| Team compensation | $X | $X | $0 | On track |
| Platform costs | $X | $X | +$Y | Usage growth |
| Events Q1–Q4 | $X | $X | -$Y | Under budget |
| Programs | $X | $X | $0 | On track |
| Total | $X | $X | $Z | Commentary |

---

## 5. VENDOR MANAGEMENT

### Common Community Vendors

| Category | Examples | Typical Contract |
|----------|---------|-----------------|
| Community platform | Discord, Discourse, Circle, Mighty Networks | Monthly/annual SaaS |
| Analytics | Common Room, Orbit | Annual SaaS |
| Events | Hopin, Luma, StreamYard | Monthly/annual SaaS |
| Communication | Mailchimp, Customer.io | Monthly SaaS |
| Moderation | Perspective API, custom | Usage-based or free |
| Design | Canva, Figma | Monthly SaaS |
| Freelancers | Community moderators, content creators | Hourly/project |
| Agencies | Community strategy, event production | Retainer/project |

### Vendor Evaluation Criteria

| Criterion | Weight | Questions |
|-----------|--------|-----------|
| Functionality | 25% | Does it do what we need? |
| Integration | 20% | Does it connect with our existing tools? |
| Scalability | 15% | Will it grow with us? |
| Cost | 15% | Is it affordable at current and future scale? |
| Support | 10% | How responsive is their support team? |
| Data portability | 10% | Can we export our data if we leave? |
| Community | 5% | Do they have a user community and active development? |

### Vendor Review Cadence

- **Monthly:** Usage and cost review
- **Quarterly:** Feature utilization assessment
- **Annually:** Full vendor evaluation against alternatives
- **On contract renewal:** Negotiate terms, evaluate switching

---

## 6. OPERATIONAL CADENCE

### Daily Operations

| Time | Activity | Owner | Duration |
|------|----------|-------|----------|
| Morning | Check community activity overnight | CM | 30 min |
| Morning | Review moderation queue | Moderator | 15 min |
| Midday | Engage in active discussions | CM | 60 min |
| Afternoon | Content posting and curation | CM | 30 min |
| Evening | Review end-of-day activity | CM | 15 min |

### Weekly Operations

| Day | Activity | Owner | Duration |
|-----|----------|-------|----------|
| Monday | Weekly planning and priorities | Team | 30 min |
| Tuesday | Content calendar execution | Content | Ongoing |
| Wednesday | Event execution (if applicable) | Programs | Variable |
| Thursday | Analytics review and reporting | Ops | 60 min |
| Friday | Weekly retrospective and highlights | Team | 30 min |

### Monthly Operations

| Week | Activity | Owner |
|------|----------|-------|
| Week 1 | Monthly metrics review | Lead |
| Week 2 | Program health assessments | Programs |
| Week 3 | Budget review and planning | Lead |
| Week 4 | Strategy review and next month planning | Team |

### Quarterly Operations

| Activity | Owner | Output |
|----------|-------|--------|
| Strategy review | Lead | Strategy update document |
| ROI report | Ops | Executive ROI report |
| Program evaluation | Programs | Program health reports |
| Vendor review | Ops | Vendor assessment |
| Team retrospective | Team | Improvement plan |
| Budget planning | Lead | Next quarter budget |

---

## 7. KNOWLEDGE MANAGEMENT

### Internal Documentation

Maintain documentation for:
- **Playbooks:** Step-by-step procedures for common tasks
- **Runbooks:** Emergency procedures and incident response
- **Decision log:** Record of key decisions and rationale
- **Metrics glossary:** Definition of every metric tracked
- **Vendor documentation:** Contracts, contacts, SLAs
- **Onboarding guide:** New team member orientation

### Institutional Memory

| System | Purpose | Owner |
|--------|---------|-------|
| Decision log | Why decisions were made | Lead |
| Incident log | What went wrong and lessons learned | Operations |
| Program archives | Past program designs and results | Programs |
| Member insights | Qualitative insights from conversations | CM |
| Competitor tracking | Competitive community landscape | Lead |

---

## 8. RISK MANAGEMENT AND CONTINUITY

### Operational Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Platform outage | Medium | High | Multi-platform presence, communication plan |
| Key person departure | Medium | High | Cross-training, documentation |
| Budget cut | Medium | High | Strong ROI case, essential vs. nice-to-have plan |
| Security breach | Low | Critical | Security protocols, incident response plan |
| Vendor shutdown | Low | High | Data export, migration plan |
| Moderation crisis | Medium | High | Crisis response plan, trained team |

### Business Continuity

If the community team is suddenly reduced:
1. **Critical functions** (moderation, safety) must continue
2. **Essential programs** (weekly events, content) can be reduced
3. **Growth activities** can be paused
4. **Analytics and reporting** can be simplified
5. **Ambassador/volunteer programs** can absorb some workload

---

## 9. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Tool sprawl | Too many tools, none well-used | Consolidate, evaluate annually |
| Manual everything | No automation, CM does everything by hand | Identify top 5 automatable tasks |
| Undocumented ops | "Only Sarah knows how to do that" | Document every process |
| Budget opacity | No clear budget tracking or justification | Monthly tracking, quarterly review |
| Reactive-only | Only responding to issues, never proactive | Operational cadence with proactive time |
| Lone wolf | One person does everything with no backup | Cross-training, documentation |

---

**Operations is the foundation that makes community management sustainable.
Without operational rigor, community teams burn out, programs fail silently,
and the community slowly degrades. With strong operations, the community
team can focus on what matters most: the people.**
