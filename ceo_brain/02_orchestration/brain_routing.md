# Brain Routing -- Master Routing Table and Decision Tree

## Overview

Brain routing is the CEO Brain's primary operational function: given any
incoming request, determine which specialist brain(s) should handle it,
in what order, with what handoffs. This module contains the complete catalog
of all 37 brains, the decision tree for routing, and worked examples of
multi-brain routing for complex scenarios.

---

## Master Routing Table

### Tier 1: Complete Brains (Fully Operational)

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| Engineering | `/prototype_x1000/engineering_brain/` | Code architecture, implementation, databases, CI/CD, testing, DevOps, infra | Any code written/deployed, tech feasibility, automation, performance | Working code, deployed systems, pipelines, tech docs | Design (specs), Product (requirements) |
| Design | `/prototype_x1000/design_brain/` | UI/UX, visual identity, branding, components, design systems, user research, accessibility | UI/UX design, visual identity, design systems, user flows, accessibility | Design tokens, component specs, screen specs, handoffs | Product (requirements), Engineering (feasibility) |
| MBA | `/prototype_x1000/mba_brain/` | Business strategy, competitive analysis, financials, operations, leadership, marketing, growth, product management | Strategy, competitive analysis, financial modeling, business cases, growth | Strategic plans, business models, financial analyses, frameworks | Finance (deep modeling), Marketing (execution) |
| Options Trading | `/prototype_x1000/options_trading_brain/` | Trading algorithms, market analysis, options pricing, risk management, quantitative strategies | Trading algo design, market analysis, options pricing, risk models | Trading algorithms, market analysis, risk models, backtests | Data (pipelines), Engineering (implementation) |

### Tier 2: Business and Strategy

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| CEO | `/prototype_x1000/ceo_brain/` | Orchestration, strategic decisions, multi-brain coordination, conflict resolution | Multi-brain projects, strategic decisions, crisis, resource allocation | Delegation plans, decision records, coordination plans | All brains (orchestrates all) |
| Finance | `/prototype_x1000/finance_brain/` | Accounting, budgeting, financial modeling, fundraising, tax, compliance, cap tables | Deep financial modeling, fundraising, accounting, tax, compliance | Financial models, budgets, projections, cap tables, tax plans | MBA (strategy), Legal (compliance) |
| Operations | `/prototype_x1000/operations_brain/` | Process optimization, supply chain, quality management, lean, project management | Process design, supply chain, scaling ops, quality systems, vendor mgmt | Process maps, SOPs, project plans, vendor scorecards | Engineering (automation), Finance (budgets) |
| Legal | `/prototype_x1000/legal_brain/` | Contracts, compliance, IP, regulatory, corporate governance, employment law | Legal review, contracts, IP, compliance, corporate structure | Contracts, compliance checklists, IP filings, governance docs | Finance (tax), HR (employment) |

### Tier 3: Product and Design

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| Product | `/prototype_x1000/product_brain/` | Product strategy, roadmapping, prioritization, PRDs, feature scoping, PM | Product decisions, roadmaps, feature prioritization, PRDs, PMF | PRDs, roadmaps, feature specs, user stories, prioritization | Design (UX), Engineering (feasibility), MBA (strategy) |
| Game Design | `/prototype_x1000/game_design_brain/` | Game mechanics, level design, player psychology, engagement loops, gamification | Game products, gamification, engagement mechanics, player loops | Game design docs, mechanic specs, balance sheets, loop diagrams | Design (visual), Engineering (implementation) |
| Content | `/prototype_x1000/content_brain/` | Copywriting, content strategy, SEO, storytelling, editorial calendar | Content creation, SEO strategy, editorial, brand voice, copy | Blog posts, copy, SEO plans, editorial calendars, style guides | Marketing (strategy), Branding (voice), Design (visual) |
| Localization | `/prototype_x1000/localization_brain/` | i18n, l10n, regional adaptation, translation, cultural nuance | International expansion, translation, regional product adaptation | Localization plans, translation specs, cultural guides, i18n configs | Engineering (i18n infra), Content (source content) |

### Tier 4: Growth and Revenue

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| Marketing | `/prototype_x1000/marketing_brain/` | Growth, acquisition, retention, brand positioning, campaigns, channels | Marketing strategy, campaigns, brand positioning, acquisition | Marketing plans, campaign specs, channel strategies, brand guides | Content (creation), Design (assets), Analytics (measurement) |
| Sales | `/prototype_x1000/sales_brain/` | Sales process, objection handling, closing, pipeline, enterprise sales | Sales strategy, process design, objection handling, enterprise | Sales playbooks, scripts, pipeline models, comp plans | Marketing (leads), Product (demos), Finance (pricing) |
| Growth | `/prototype_x1000/growth_brain/` | Growth hacking, viral loops, referrals, PLG, experimentation | Growth experiments, viral mechanics, referral programs, PLG | Experiment designs, viral loop specs, referral programs, PLG plans | Engineering (implementation), Analytics (measurement) |
| Partnership | `/prototype_x1000/partnership_brain/` | Business development, alliances, integrations, channel partnerships | Partnership strategy, BD, integration planning, channel development | Partnership proposals, integration specs, channel plans | Legal (contracts), Product (integration), Sales (channel) |
| Customer Success | `/prototype_x1000/customer_success_brain/` | Onboarding, retention, support, churn prevention, NPS, health scores | Retention strategy, onboarding, churn analysis, support systems | Onboarding flows, health score models, playbooks, NPS programs | Product (features), Support (tickets), Analytics (data) |

### Tier 5: Technical

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| Data | `/prototype_x1000/data_brain/` | Analytics, ML/AI, data pipelines, warehousing, experimentation | Data infrastructure, ML models, analytics pipelines, A/B testing | Data models, pipelines, ML models, experiment frameworks | Engineering (infra), Cloud (hosting), AI (models) |
| Security | `/prototype_x1000/security_brain/` | Cybersecurity, compliance, risk management, pen testing, incident response | Security review, compliance, threat modeling, incident response | Threat models, security audits, compliance reports, IR plans | Engineering (implementation), Cloud (infra), Legal (compliance) |
| Cloud | `/prototype_x1000/cloud_brain/` | AWS, GCP, Azure, serverless, infrastructure, cost optimization | Cloud architecture, scaling, cost optimization, multi-cloud | Architecture diagrams, IaC configs, cost analyses, scaling plans | Engineering (code), Security (compliance), Finance (budgets) |
| Mobile | `/prototype_x1000/mobile_brain/` | iOS, Android, React Native, mobile UX, app store optimization | Mobile app development, platform decisions, mobile UX, ASO | Mobile architecture, platform specs, ASO plans, app configs | Design (mobile UX), Engineering (backend), QA (testing) |
| QA | `/prototype_x1000/qa_brain/` | Testing strategies, automation, quality gates, regression, performance | Test strategy, automation setup, quality gates, bug triage | Test plans, automation suites, quality reports, bug analyses | Engineering (code), Product (requirements), Security (pen test) |
| AI | `/prototype_x1000/ai_brain/` | LLMs, ML models, AI strategy, prompting, fine-tuning, AI products | AI feature design, model selection, prompt engineering, AI strategy | AI product specs, model evaluations, prompt libraries, AI roadmaps | Data (pipelines), Engineering (implementation), Cloud (compute) |
| Automation | `/prototype_x1000/automation_brain/` | Workflow automation, n8n, Zapier, integrations, process automation | Workflow automation, tool integrations, process automation | Automation flows, integration specs, process automation plans | Engineering (custom code), Operations (processes), Cloud (hosting) |
| Analytics | `/prototype_x1000/analytics_brain/` | Metrics, dashboards, reporting, insights, data visualization | Dashboard design, metric definition, reporting, visualization | Dashboards, metric definitions, reports, insight analyses | Data (pipelines), Design (visualization), Product (KPIs) |
| DevRel | `/prototype_x1000/devrel_brain/` | Developer relations, documentation, community, developer experience | Dev community, API docs, developer experience, hackathons | API docs, dev guides, community plans, DX audits | Engineering (APIs), Content (writing), Community (engagement) |

### Tier 6: Marketing Channels

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| Branding | `/prototype_x1000/branding_brain/` | Brand identity, visual systems, brand voice, guidelines | Brand creation, visual identity, voice definition, rebrand | Brand guidelines, visual systems, voice docs, brand assets | Design (visual), Content (voice), Marketing (positioning) |
| Email | `/prototype_x1000/email_brain/` | Email marketing, drip campaigns, deliverability, design | Email campaigns, drip sequences, deliverability, transactional | Email templates, drip sequences, deliverability audits | Content (copy), Design (templates), Analytics (metrics) |
| Social Media | `/prototype_x1000/social_media_brain/` | Social platforms, content calendar, engagement, community mgmt | Social strategy, content calendar, engagement, platform content | Social plans, content calendars, engagement playbooks | Content (creation), Branding (voice), Analytics (metrics) |
| Video | `/prototype_x1000/video_brain/` | Video content, production, distribution, YouTube, short-form | Video strategy, production, distribution, video marketing | Video scripts, production plans, distribution strategies | Content (scripts), Branding (visual), Marketing (distribution) |
| Community | `/prototype_x1000/community_brain/` | Community building, moderation, engagement, events, forums | Community strategy, moderation, engagement, events | Community plans, moderation guides, engagement programs | Content (creation), Social Media (platforms), DevRel (dev community) |

### Tier 7: Business Operations

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| Support | `/prototype_x1000/support_brain/` | Customer support, ticketing, knowledge base, SLA management | Support systems, knowledge base, ticketing, SLA | KB articles, ticket workflows, SLA definitions, support playbooks | Product (features), Engineering (tools), CS (strategy) |
| Investor | `/prototype_x1000/investor_brain/` | Fundraising, investor relations, pitch decks, term sheets, cap tables | Fundraising, pitch decks, investor comms, term negotiation | Pitch decks, investor updates, term sheet analyses, cap tables | Finance (modeling), Legal (terms), MBA (strategy) |
| Pricing | `/prototype_x1000/pricing_brain/` | Pricing strategy, packaging, monetization, value metrics | Pricing decisions, packaging, monetization, price testing | Pricing models, packaging specs, monetization plans | Finance (unit economics), Product (value), Analytics (data) |
| Innovation | `/prototype_x1000/innovation_brain/` | R&D, new ventures, experimentation, emerging technology | New venture exploration, R&D, emerging tech, innovation | Innovation briefs, R&D plans, tech evaluations, venture specs | Research (trends), Engineering (prototyping), MBA (viability) |

### Tier 8: People

| Brain | Path | Specialty | When to Call | Key Outputs | Dependencies |
|-------|------|-----------|-------------|-------------|-------------|
| HR | `/prototype_x1000/hr_brain/` | Hiring, culture, team building, performance management, compensation | Hiring strategy, culture, performance systems, compensation | Job descriptions, interview guides, comp frameworks, perf systems | Legal (employment), Finance (budget), Operations (process) |
| Research | `/prototype_x1000/research_brain/` | Market research, competitor analysis, trends, user research | Market research, competitor deep-dives, trend analysis | Research reports, competitor analyses, trend briefs | Analytics (data), Product (direction), MBA (strategy) |

---

## Decision Tree for Routing

```
INCOMING REQUEST
      |
      v
Is it about CODE or TECHNICAL IMPLEMENTATION?
  YES --> Engineering Brain
  NO  --> continue
      |
      v
Is it about UI/UX, VISUAL DESIGN, or USER RESEARCH?
  YES --> Design Brain
  NO  --> continue
      |
      v
Is it about BUSINESS STRATEGY, COMPETITIVE ANALYSIS, or BUSINESS MODEL?
  YES --> MBA Brain
  NO  --> continue
      |
      v
Is it about FINANCIAL MODELING, ACCOUNTING, or FUNDRAISING?
  YES --> Finance Brain (deep) or MBA Brain (strategic)
  NO  --> continue
      |
      v
Is it about PROCESS, SUPPLY CHAIN, or OPERATIONAL SCALING?
  YES --> Operations Brain
  NO  --> continue
      |
      v
Is it about PRODUCT DECISIONS, ROADMAPS, or PRDs?
  YES --> Product Brain
  NO  --> continue
      |
      v
Is it about MARKETING, GROWTH, or ACQUISITION?
  YES --> Marketing Brain (strategy) or Growth Brain (experiments)
  NO  --> continue
      |
      v
Is it about PEOPLE, HIRING, or CULTURE?
  YES --> HR Brain
  NO  --> continue
      |
      v
Is it about LEGAL, CONTRACTS, or COMPLIANCE?
  YES --> Legal Brain
  NO  --> continue
      |
      v
Does it span MULTIPLE DOMAINS?
  YES --> CEO Brain orchestrates multi-brain coordination
  NO  --> Review the full routing table above
```

---

## Example Routing: Complex Scenarios

### Scenario 1: "Build a SaaS Product"

```
Goal: Build a SaaS product for small business invoicing

CEO Brain Decomposition:
1. Product Brain --> Define requirements, PRD, user stories
2. Research Brain --> Market research, competitor analysis
3. MBA Brain --> Business model, unit economics, go-to-market
4. Design Brain --> User research, UI/UX, design system
5. Engineering Brain --> Architecture, implementation, deployment
6. Pricing Brain --> Pricing model, packaging
7. QA Brain --> Test strategy, quality gates
8. Marketing Brain --> Launch plan, acquisition channels
9. Content Brain --> Website copy, documentation
10. Analytics Brain --> Metrics, dashboards

Critical Path: Product --> Design --> Engineering --> QA --> Launch
Parallel Work: MBA + Research + Pricing (during Design/Engineering)
```

### Scenario 2: "Launch New Market"

```
Goal: Expand into the European market

CEO Brain Decomposition:
1. Research Brain --> European market analysis, regulations
2. Legal Brain --> GDPR compliance, local regulations, entity setup
3. Localization Brain --> Translation, cultural adaptation
4. Marketing Brain --> European go-to-market strategy
5. Operations Brain --> European operations setup
6. Finance Brain --> European entity financials, tax
7. Partnership Brain --> Local partnerships, distribution
8. HR Brain --> European hiring, employment law

Critical Path: Legal + Research --> Localization --> Marketing --> Launch
```

### Scenario 3: "Fix Churn"

```
Goal: Reduce customer churn from 8% to 3% monthly

CEO Brain Decomposition:
1. Analytics Brain --> Churn analysis, cohort data, patterns
2. Customer Success Brain --> Exit interviews, health scores
3. Product Brain --> Feature gap analysis, retention features
4. Support Brain --> Support quality audit, ticket analysis
5. Design Brain --> UX audit of churn-prone flows
6. Engineering Brain --> Implement retention features
7. Pricing Brain --> Pricing as churn factor analysis

Critical Path: Analytics --> CS + Product --> Design --> Engineering
```

### Scenario 4: "Raise Funding"

```
Goal: Raise Series A funding ($5-10M)

CEO Brain Decomposition:
1. Investor Brain --> Fundraising strategy, investor targeting
2. Finance Brain --> Financial model, projections, cap table
3. MBA Brain --> Market sizing, competitive positioning
4. Legal Brain --> Term sheet preparation, entity cleanup
5. Design Brain --> Pitch deck design
6. Content Brain --> Narrative, storytelling
7. Analytics Brain --> Metrics dashboard for investors

Critical Path: Finance + MBA --> Investor + Content + Design --> Outreach
```

---

## Routing Conflict Resolution

When multiple brains could handle a request:

1. **Primary domain wins** -- Route to the brain whose core specialty matches
2. **Complexity determines** -- Simple requests go to one brain; complex
   requests get multi-brain coordination
3. **Stakes determine involvement** -- Higher stakes justify more brains
4. **CEO Brain arbitrates** -- When routing is ambiguous, the CEO Brain
   makes the call and documents rationale

---

**The routing table is the CEO Brain's most critical operational tool. Every
request flows through this decision system before any work begins.**
