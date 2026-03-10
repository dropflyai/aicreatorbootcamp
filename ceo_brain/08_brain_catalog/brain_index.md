# Brain Index -- Complete Catalog of All 37 Brains

## Overview

This is the master catalog of all 37 specialist brains in the DropFly OS
brain system. The CEO Brain consults this index for every routing decision.
Each brain entry includes its name, path, specialty, when to call it, key
outputs, which brains it calls, and which brains call it.

---

## Category 1: Business Strategy (6 Brains)

### CEO Brain
- **Path:** `/prototype_x1000/ceo_brain/`
- **Specialty:**
  - Multi-brain task decomposition and delegation
  - Strategic decision-making and prioritization
  - Cross-functional coordination across all brains
  - Conflict resolution between brains
  - Company-level strategic planning and execution
- **When to Call:** Multi-brain projects, strategic decisions, crisis management, resource allocation, conflict resolution
- **Key Outputs:** Delegation plans, decision records, coordination plans, strategic plans, OKRs
- **Calls These Brains:** All 36 other brains (orchestrates all)
- **Called By:** User (top of hierarchy)

### MBA Brain
- **Path:** `/prototype_x1000/mba_brain/`
- **Specialty:**
  - Business strategy and competitive analysis
  - Financial literacy and unit economics
  - Operations and organizational design
  - Marketing and growth strategy
  - Entrepreneurship and venture building
  - Technology strategy and digital transformation
- **When to Call:** Business strategy formulation, competitive analysis, financial modeling, business case development, growth strategy
- **Key Outputs:** Strategic plans, business models, financial analyses, competitive analyses, growth frameworks
- **Calls These Brains:** Finance, Operations, Marketing, Product
- **Called By:** CEO, Engineering, Design, Product

### Finance Brain
- **Path:** `/prototype_x1000/finance_brain/`
- **Specialty:**
  - Accounting and financial reporting
  - Budgeting and financial modeling
  - Fundraising and investor materials
  - Tax planning and compliance
  - Cap table management and equity
- **When to Call:** Deep financial modeling, fundraising execution, accounting specifics, tax compliance, cap table management
- **Key Outputs:** Financial models, budgets, projections, cap tables, tax plans, investor materials
- **Calls These Brains:** Legal, Operations, MBA
- **Called By:** CEO, MBA, Investor, Pricing

### Operations Brain
- **Path:** `/prototype_x1000/operations_brain/`
- **Specialty:**
  - Process design and optimization
  - Supply chain management and logistics
  - Quality management (Lean, Six Sigma)
  - Project management (Waterfall, Agile, Hybrid)
  - Vendor management and procurement
  - Operational scaling and efficiency
- **When to Call:** Process design, supply chain decisions, operational scaling, quality systems, vendor management, project methodology
- **Key Outputs:** Process maps, SOPs, project plans, vendor scorecards, quality reports, scaling playbooks
- **Calls These Brains:** Engineering, Finance, HR
- **Called By:** CEO, MBA, Engineering

### Legal Brain
- **Path:** `/prototype_x1000/legal_brain/`
- **Specialty:**
  - Contract drafting and review
  - Regulatory compliance (GDPR, SOC 2, HIPAA)
  - Intellectual property protection
  - Corporate governance and structure
  - Employment law and HR compliance
- **When to Call:** Legal review, contract needs, IP questions, regulatory compliance, corporate structure, employment issues
- **Key Outputs:** Contracts, compliance checklists, IP filings, governance docs, legal opinions
- **Calls These Brains:** Finance, HR
- **Called By:** CEO, MBA, HR, Investor, Partnership

### Innovation Brain
- **Path:** `/prototype_x1000/innovation_brain/`
- **Specialty:**
  - R&D strategy and management
  - New venture exploration
  - Emerging technology evaluation
  - Innovation programs and hackathons
  - Experimentation frameworks
- **When to Call:** New venture exploration, R&D strategy, emerging tech evaluation, innovation programs
- **Key Outputs:** Innovation briefs, R&D plans, tech evaluations, venture specs, experiment designs
- **Calls These Brains:** Research, Engineering, MBA, Product
- **Called By:** CEO, MBA, Product

---

## Category 2: Product and Design (4 Brains)

### Product Brain
- **Path:** `/prototype_x1000/product_brain/`
- **Specialty:**
  - Product strategy and vision
  - Roadmapping and prioritization
  - PRDs and feature specifications
  - User story writing and acceptance criteria
  - Product-market fit analysis
- **When to Call:** Product decisions, roadmap planning, feature prioritization, PRD creation, PMF analysis
- **Key Outputs:** PRDs, roadmaps, feature specs, user stories, prioritization frameworks
- **Calls These Brains:** Design, Engineering, Analytics, Research
- **Called By:** CEO, MBA, Design, Engineering, Marketing

### Design Brain
- **Path:** `/prototype_x1000/design_brain/`
- **Specialty:**
  - UI/UX design and interaction design
  - Visual identity and branding
  - Design system creation and management
  - User research and persona development
  - Information architecture and user flows
  - Accessibility compliance (WCAG)
- **When to Call:** UI/UX design, visual identity, design systems, user research, accessibility, user flows
- **Key Outputs:** Design tokens, component specs, screen specs, design handoffs, user research reports
- **Calls These Brains:** Engineering, Product, Branding
- **Called By:** CEO, Product, Engineering, Marketing, Mobile

### Engineering Brain
- **Path:** `/prototype_x1000/engineering_brain/`
- **Specialty:**
  - Code architecture and implementation
  - Database design and migrations
  - CI/CD pipeline and DevOps
  - Testing and quality assurance
  - Performance optimization
  - Security best practices
  - Automation and tooling
- **When to Call:** Any code writing/review, system architecture, database design, automation, deployment, technical feasibility
- **Key Outputs:** Working code, deployed systems, automated pipelines, technical documentation
- **Calls These Brains:** Design, Cloud, Security, QA, Data
- **Called By:** CEO, Product, Design, Mobile, AI, Automation

### QA Brain
- **Path:** `/prototype_x1000/qa_brain/`
- **Specialty:**
  - Test strategy and planning
  - Test automation frameworks
  - Quality gate design and enforcement
  - Regression and performance testing
  - Bug triage and prioritization
- **When to Call:** Test strategy needed, automation setup, quality gate design, bug triage, performance testing
- **Key Outputs:** Test plans, automation suites, quality reports, bug analyses, performance benchmarks
- **Calls These Brains:** Engineering, Product, Security
- **Called By:** CEO, Engineering, Product, Mobile

---

## Category 3: Growth and Revenue (5 Brains)

### Marketing Brain
- **Path:** `/prototype_x1000/marketing_brain/`
- **Specialty:**
  - Growth and acquisition strategy
  - Campaign design and execution
  - Brand positioning and messaging
  - Channel strategy (paid, organic, partnerships)
  - Marketing analytics and attribution
- **When to Call:** Marketing strategy, campaign design, brand positioning, acquisition channels, marketing analytics
- **Key Outputs:** Marketing plans, campaign specs, channel strategies, brand guidelines, attribution reports
- **Calls These Brains:** Content, Design, Analytics, Branding, Social Media
- **Called By:** CEO, MBA, Product, Sales, Growth

### Sales Brain
- **Path:** `/prototype_x1000/sales_brain/`
- **Specialty:**
  - Sales process design and optimization
  - Objection handling frameworks
  - Enterprise sales methodology
  - Pipeline management and forecasting
  - Compensation and incentive design
- **When to Call:** Sales strategy, process design, objection handling, enterprise sales, pipeline forecasting
- **Key Outputs:** Sales playbooks, scripts, pipeline models, comp plans, battle cards
- **Calls These Brains:** Marketing, Product, Finance, Legal
- **Called By:** CEO, MBA, Marketing, Partnership

### Growth Brain
- **Path:** `/prototype_x1000/growth_brain/`
- **Specialty:**
  - Growth hacking and experimentation
  - Viral loop design and optimization
  - Referral program design
  - Product-led growth (PLG) strategy
  - Growth modeling and forecasting
- **When to Call:** Growth experiments, viral mechanics, referral programs, PLG strategy, growth modeling
- **Key Outputs:** Experiment designs, viral loop specs, referral programs, PLG plans, growth models
- **Calls These Brains:** Engineering, Analytics, Marketing, Product
- **Called By:** CEO, Marketing, Product

### Pricing Brain
- **Path:** `/prototype_x1000/pricing_brain/`
- **Specialty:**
  - Pricing strategy and value metrics
  - Packaging and tier design
  - Monetization model selection
  - Price testing and optimization
  - Competitive pricing analysis
- **When to Call:** Pricing decisions, packaging design, monetization strategy, price testing
- **Key Outputs:** Pricing models, packaging specs, monetization plans, competitive pricing analyses
- **Calls These Brains:** Finance, Product, Analytics, Research
- **Called By:** CEO, MBA, Product, Sales

### Customer Success Brain
- **Path:** `/prototype_x1000/customer_success_brain/`
- **Specialty:**
  - Customer onboarding design
  - Retention strategy and churn prevention
  - Customer health scoring
  - NPS and satisfaction programs
  - Expansion revenue strategies
- **When to Call:** Retention strategy, onboarding design, churn analysis, health scoring, expansion
- **Key Outputs:** Onboarding flows, health score models, retention playbooks, NPS programs
- **Calls These Brains:** Product, Support, Analytics, Engineering
- **Called By:** CEO, Product, Sales, Support

---

## Category 4: Technical (8 Brains)

### AI Brain
- **Path:** `/prototype_x1000/ai_brain/`
- **Specialty:** LLMs, ML models, AI strategy, prompting, fine-tuning, AI product design
- **When to Call:** AI feature design, model selection, prompt engineering, AI strategy
- **Key Outputs:** AI product specs, model evaluations, prompt libraries, AI roadmaps
- **Calls:** Data, Engineering, Cloud | **Called By:** CEO, Product, Engineering

### Data Brain
- **Path:** `/prototype_x1000/data_brain/`
- **Specialty:** Analytics, ML/AI pipelines, data warehousing, experimentation, data modeling
- **When to Call:** Data infrastructure, ML models, analytics pipelines, A/B testing
- **Key Outputs:** Data models, pipelines, ML models, experiment frameworks
- **Calls:** Engineering, Cloud, AI | **Called By:** CEO, Analytics, AI, Product

### Security Brain
- **Path:** `/prototype_x1000/security_brain/`
- **Specialty:** Cybersecurity, compliance, risk management, pen testing, incident response
- **When to Call:** Security review, compliance, threat modeling, incident response
- **Key Outputs:** Threat models, security audits, compliance reports, IR plans
- **Calls:** Engineering, Cloud, Legal | **Called By:** CEO, Engineering, Cloud, Legal

### Cloud Brain
- **Path:** `/prototype_x1000/cloud_brain/`
- **Specialty:** AWS, GCP, Azure, serverless, infrastructure, cost optimization
- **When to Call:** Cloud architecture, scaling, cost optimization, multi-cloud
- **Key Outputs:** Architecture diagrams, IaC configs, cost analyses, scaling plans
- **Calls:** Engineering, Security, Finance | **Called By:** CEO, Engineering, Data

### Mobile Brain
- **Path:** `/prototype_x1000/mobile_brain/`
- **Specialty:** iOS, Android, React Native, mobile UX, app store optimization
- **When to Call:** Mobile app development, platform decisions, mobile UX, ASO
- **Key Outputs:** Mobile architecture, platform specs, ASO plans, app configs
- **Calls:** Design, Engineering, QA | **Called By:** CEO, Product, Design

### Automation Brain
- **Path:** `/prototype_x1000/automation_brain/`
- **Specialty:** Workflow automation, n8n, Zapier, integrations, process automation
- **When to Call:** Workflow automation, tool integrations, process automation
- **Key Outputs:** Automation flows, integration specs, process automation plans
- **Calls:** Engineering, Operations, Cloud | **Called By:** CEO, Operations, Engineering

### Analytics Brain
- **Path:** `/prototype_x1000/analytics_brain/`
- **Specialty:** Metrics, dashboards, reporting, insights, data visualization
- **When to Call:** Dashboard design, metric definition, reporting, visualization
- **Key Outputs:** Dashboards, metric definitions, reports, insight analyses
- **Calls:** Data, Design, Product | **Called By:** CEO, Product, Marketing, Growth

### DevRel Brain
- **Path:** `/prototype_x1000/devrel_brain/`
- **Specialty:** Developer relations, documentation, community, developer experience
- **When to Call:** Dev community, API docs, developer experience, hackathons
- **Key Outputs:** API docs, dev guides, community plans, DX audits
- **Calls:** Engineering, Content, Community | **Called By:** CEO, Product, Engineering

### Debugger Brain
- **Path:** `/prototype_x1000/debugger_brain/`
- **Specialty:**
  - Bug analysis and root cause identification
  - Error pattern recognition
  - Systematic debugging protocols
  - Fix verification and regression prevention
  - **MANDATORY** logging of all bugs to memory
  - Consultation on similar past bugs
- **When to Call:** Any bug or error, unexpected behavior, test failures, debugging assistance
- **Key Outputs:** Bug reports, root cause analyses, fix verification, pattern documentation
- **Calls These Brains:** Engineering, QA, Design (for UX bugs)
- **Called By:** CEO, Engineering, QA, all brains when debugging needed
- **SPECIAL RULE:** Every bug fixed through this brain MUST be logged to memory

---

## Category 5: Marketing Channels (5 Brains)

### Content Brain
- **Path:** `/prototype_x1000/content_brain/`
- **Specialty:** Copywriting, content strategy, SEO, storytelling, editorial
- **When to Call:** Content creation, SEO strategy, editorial, brand voice, copy
- **Calls:** Marketing, Branding, Design | **Called By:** CEO, Marketing, DevRel

### Branding Brain
- **Path:** `/prototype_x1000/branding_brain/`
- **Specialty:** Brand identity, visual systems, brand voice, guidelines
- **When to Call:** Brand creation, visual identity, voice definition, rebrand
- **Calls:** Design, Content, Marketing | **Called By:** CEO, Marketing, Design

### Email Brain
- **Path:** `/prototype_x1000/email_brain/`
- **Specialty:** Email marketing, drip campaigns, deliverability, design
- **When to Call:** Email campaigns, drip sequences, deliverability, transactional
- **Calls:** Content, Design, Analytics | **Called By:** CEO, Marketing, CS

### Social Media Brain
- **Path:** `/prototype_x1000/social_media_brain/`
- **Specialty:** Social platforms, content calendar, engagement, community management
- **When to Call:** Social strategy, content calendar, engagement, platform content
- **Calls:** Content, Branding, Analytics | **Called By:** CEO, Marketing, Community

### Video Brain
- **Path:** `/prototype_x1000/video_brain/`
- **Specialty:** Video content, production, distribution, YouTube, short-form
- **When to Call:** Video strategy, production, distribution, video marketing
- **Calls:** Content, Branding, Marketing | **Called By:** CEO, Marketing, DevRel

---

## Category 6: People (2 Brains)

### HR Brain
- **Path:** `/prototype_x1000/hr_brain/`
- **Specialty:** Hiring, culture, team building, performance management, compensation
- **When to Call:** Hiring strategy, culture, performance systems, compensation
- **Calls:** Legal, Finance, Operations | **Called By:** CEO, Operations, Legal

### Research Brain
- **Path:** `/prototype_x1000/research_brain/`
- **Specialty:** Market research, competitor analysis, trends, user research
- **When to Call:** Market research, competitor deep-dives, trend analysis
- **Calls:** Analytics, Product, MBA | **Called By:** CEO, Product, MBA, Marketing

---

## Category 7: Domain Specialist (5 Brains)

### Game Design Brain
- **Path:** `/prototype_x1000/game_design_brain/`
- **Specialty:** Game mechanics, level design, player psychology, gamification
- **When to Call:** Game products, gamification, engagement mechanics
- **Calls:** Design, Engineering | **Called By:** CEO, Product

### Localization Brain
- **Path:** `/prototype_x1000/localization_brain/`
- **Specialty:** i18n, l10n, regional adaptation, translation, cultural nuance
- **When to Call:** International expansion, translation, regional adaptation
- **Calls:** Engineering, Content | **Called By:** CEO, Product, Marketing

### Partnership Brain
- **Path:** `/prototype_x1000/partnership_brain/`
- **Specialty:** Business development, alliances, integrations, channels
- **When to Call:** Partnership strategy, BD, integration planning, channels
- **Calls:** Legal, Product, Sales | **Called By:** CEO, MBA, Sales

### Investor Brain
- **Path:** `/prototype_x1000/investor_brain/`
- **Specialty:** Fundraising, investor relations, pitch decks, term sheets
- **When to Call:** Fundraising, pitch decks, investor comms, terms
- **Calls:** Finance, Legal, MBA | **Called By:** CEO, Finance

### Options Trading Brain
- **Path:** `/prototype_x1000/options_trading_brain/`
- **Specialty:** Trading algorithms, market analysis, options pricing, risk management
- **When to Call:** Trading algo design, market analysis, options pricing
- **Calls:** Data, Engineering | **Called By:** CEO

---

## Category 8: Business Operations (3 Brains)

### Support Brain
- **Path:** `/prototype_x1000/support_brain/`
- **Specialty:** Customer support, ticketing, knowledge base, SLA management
- **When to Call:** Support systems, knowledge base, ticketing, SLA
- **Calls:** Product, Engineering, CS | **Called By:** CEO, CS, Operations

### Community Brain
- **Path:** `/prototype_x1000/community_brain/`
- **Specialty:** Community building, moderation, engagement, events, forums
- **When to Call:** Community strategy, moderation, engagement, events
- **Calls:** Content, Social Media, DevRel | **Called By:** CEO, Marketing

---

## Decision Tree Flowchart for Brain Routing

```
START: What type of work is needed?
  |
  +--[Code/Technical]--> Engineering Brain
  |
  +--[UI/UX/Visual]--> Design Brain
  |
  +--[Business Strategy]--> MBA Brain
  |
  +--[Financial]--> Finance Brain (deep) / MBA Brain (strategic)
  |
  +--[Process/Ops]--> Operations Brain
  |
  +--[Product/Roadmap]--> Product Brain
  |
  +--[Marketing]--> Marketing Brain
  |
  +--[Sales]--> Sales Brain
  |
  +--[Legal/Compliance]--> Legal Brain
  |
  +--[Hiring/People]--> HR Brain
  |
  +--[Security]--> Security Brain
  |
  +--[Data/ML]--> Data Brain or AI Brain
  |
  +--[Mobile App]--> Mobile Brain
  |
  +--[Content/Copy]--> Content Brain
  |
  +--[Fundraising]--> Investor Brain
  |
  +--[Multiple Domains]--> CEO Brain orchestrates
  |
  +--[Not Sure]--> CEO Brain classifies and routes
```

---

**This catalog is the CEO Brain's most critical reference. Every routing
decision starts here. Updated as brains are built and capabilities evolve.**
