# Support Brain — Glossary

## Purpose

This glossary defines the canonical meaning of every term used within the Support Brain. When a term appears in any module, pattern, template, or evaluation document, its meaning is as defined here. Ambiguity in terminology leads to misaligned operations.

---

## Customer Experience Metrics

### CSAT (Customer Satisfaction Score)
A post-interaction survey metric measuring satisfaction with a specific support interaction. Typically measured on a 1-5 or 1-7 Likert scale, reported as the percentage of respondents rating 4+ (on a 5-point scale) or 6+ (on a 7-point scale). CSAT measures transaction-level satisfaction, not overall relationship health.

**Formula:** `CSAT = (Satisfied Responses / Total Responses) x 100`

**Industry Benchmark (TSIA):** 85-92% for B2B SaaS support.

### CES (Customer Effort Score)
A post-interaction metric measuring the effort a customer had to expend to get their issue resolved. Based on Dixon et al.'s research in "The Effortless Experience." Measured on a 1-7 scale ("strongly disagree" to "strongly agree" with the statement "The company made it easy for me to handle my issue"). CES is the single strongest predictor of future customer loyalty.

**Formula:** `CES = Average score on 1-7 scale` (higher = less effort = better)

**Target:** 5.5+ on a 7-point scale.

### NPS (Net Promoter Score)
A relationship-level metric measuring the likelihood of recommending the company. Respondents rate 0-10: Promoters (9-10), Passives (7-8), Detractors (0-6). While NPS is not a support-specific metric, support interactions significantly influence it. Support-specific NPS (tNPS) measures NPS after a support interaction.

**Formula:** `NPS = %Promoters - %Detractors` (range: -100 to +100)

**Industry Benchmark:** +30 to +50 for B2B SaaS.

### eNPS (Employee Net Promoter Score)
The NPS methodology applied to employees. Measures agent satisfaction and engagement. Per the Service Profit Chain, eNPS is a leading indicator of customer satisfaction.

**Formula:** Same as NPS but applied to employee survey data.

**Target:** +30 or higher for support teams.

---

## Operational Metrics

### FRT (First Response Time)
The elapsed time between ticket creation and the first substantive human response. Automated acknowledgments do not count. FRT is the single most impactful operational metric — customers perceive long FRT as the company not caring.

**Measurement:** Median, not average (averages are skewed by outliers).

### ART (Average Resolution Time)
The total elapsed time from ticket creation to confirmed resolution. Clock pauses when the ticket is in "waiting on customer" status. Also called TTR (Time to Resolution).

**Measurement:** Median by priority level.

### FCR (First Contact Resolution)
The percentage of tickets resolved in a single interaction without follow-up, transfer, or escalation. FCR is the operational metric most correlated with CSAT. Dixon et al. found that each subsequent contact on the same issue reduces satisfaction by 15%.

**Formula:** `FCR = (Tickets Resolved on First Contact / Total Tickets) x 100`

**Target:** 70-80% for L1, lower for technical/complex issues.

### Handle Time (AHT — Average Handle Time)
The average time an agent spends actively working on a ticket, including research, writing, and internal communication. Does not include wait time. Optimizing for AHT alone is dangerous — it incentivizes rushing and degrades quality. Always pair AHT with quality score.

### Backlog
The total number of open, unresolved tickets at a point in time. A healthy support operation has a backlog that trends flat or downward over weeks. Growing backlog indicates staffing shortage, training gaps, or upstream product issues.

### Deflection Rate
The percentage of potential support contacts prevented by self-service (knowledge base, chatbot, community forum). Also called "ticket deflection" or "self-service rate."

**Formula:** `Deflection = (Self-Service Sessions that Did Not Create Ticket / Total Self-Service Sessions) x 100`

### Cost Per Ticket (CPT)
The fully-loaded cost of resolving a single support ticket. Includes agent salary, benefits, tools, overhead, and management. Used for ROI calculations and efficiency benchmarking.

**Formula:** `CPT = Total Support Costs / Total Tickets Resolved`

**Industry Benchmark (TSIA):** $15-25 for L1, $40-80 for L2, $100+ for L3.

### Ticket Volume
The total number of tickets created in a time period. Broken down by channel, product area, issue type, customer segment, and priority. Volume trends inform staffing, product health, and content gaps.

### Reopens / Reopen Rate
The percentage of tickets that are resolved and subsequently reopened by the customer within a defined window (typically 7 days). High reopen rates indicate premature closures or incomplete resolutions. Reopens are the inverse of FCR.

---

## Support Tiers

### L1 (Tier 1 / Level 1)
First-line support handling the majority of incoming volume. Responsible for triage, known-issue resolution, password resets, how-to questions, and standard troubleshooting using knowledge base articles and macros. Expected to resolve 60-80% of total volume.

### L2 (Tier 2 / Level 2)
Second-line support for issues requiring deeper product knowledge, advanced troubleshooting, configuration assistance, or specialized domain expertise. Handles issues escalated from L1 that exceed standard procedures.

### L3 (Tier 3 / Level 3)
Engineering-level support for defects, complex technical issues, and infrastructure problems. Typically staffed by support engineers, DevOps, or product engineers on support rotation. Handles issues requiring code changes, database queries, or deep system investigation.

### L4 (Tier 4 / Level 4)
Vendor or external-party support. Issues escalated to third-party software vendors, cloud providers, or integration partners. Support Brain tracks SLAs and manages the customer communication while the external party investigates.

---

## Knowledge Management

### KCS (Knowledge-Centered Service)
A methodology developed by the Consortium for Service Innovation that integrates knowledge creation and maintenance into the support workflow. Rather than creating knowledge after the fact, KCS embeds knowledge capture into every support interaction. The four practices: Create, Reuse, Improve, and Assess.

### KCS Article
A structured knowledge artifact containing a title (stated as the customer would ask), environment/context, issue description, resolution, and cause. Follows a specific lifecycle: Work-in-Progress (WIP) -> Draft -> Validated -> Published -> Archived.

### Knowledge Base (KB)
An organized collection of articles, guides, and resources designed for self-service consumption by customers (external KB) or agents (internal KB). Distinguished from documentation by its focus on solving specific problems rather than comprehensive coverage.

### Information Architecture (IA)
The structural design of knowledge content — how articles are categorized, tagged, and organized to enable findability. Includes taxonomy (hierarchical categories), folksonomy (user-generated tags), and search optimization.

### Content Gap
A topic or issue that generates support tickets but has no corresponding knowledge base article. Content gap analysis identifies the highest-ROI articles to create based on ticket volume, search queries with no results, and agent feedback.

### Runbook
An internal operational document providing step-by-step instructions for a specific technical procedure. Distinguished from KB articles by audience (agents/engineers, not customers) and detail level (highly technical, includes system access).

### Decision Tree
A branching diagnostic flowchart that guides agents through troubleshooting by asking sequential yes/no or multiple-choice questions. Ensures consistent diagnosis regardless of agent experience level.

---

## SLA and Priority

### SLA (Service Level Agreement)
A formal commitment to response and resolution time targets based on ticket priority and customer tier. SLAs define the contractual obligations of the support organization.

### OLA (Operational Level Agreement)
An internal agreement between support tiers or between support and other departments (e.g., engineering). Defines internal handoff timelines that support the customer-facing SLA.

### Priority Matrix
A two-dimensional classification system combining Impact (how many customers affected, business impact) and Urgency (how time-sensitive the issue is) to determine ticket priority. Standard levels: Critical (P1), High (P2), Medium (P3), Low (P4).

### Severity
The technical seriousness of an issue, distinct from priority. A data loss bug is high severity regardless of how many customers are affected. Severity influences engineering escalation; priority influences queue position.

---

## Support Channels

### Omnichannel
A unified support approach where customers can contact support through any channel (email, chat, phone, social, in-app) and receive consistent, context-aware service. Distinguished from multichannel (multiple channels that operate independently) by the shared context and seamless channel-switching.

### Synchronous Channels
Channels requiring real-time interaction: live chat, phone, video. Higher agent cost per interaction but faster resolution and higher CSAT for complex or emotional issues.

### Asynchronous Channels
Channels not requiring real-time presence: email, ticketing portals, social media, community forums. Lower cost per interaction, allows agents to handle multiple conversations, but longer resolution times.

### Channel Deflection
Intentionally guiding customers from high-cost channels (phone) to lower-cost channels (self-service, chat) without degrading experience. Distinct from obstruction — deflection offers a better path, not a barrier.

---

## AI and Automation

### Agent Assist
AI that supports human agents during interactions by suggesting relevant knowledge articles, generating response drafts, providing customer context, or detecting sentiment. The agent retains decision authority.

### Auto-Resolution
Complete ticket resolution by AI without human involvement. Appropriate for high-volume, low-complexity, well-defined issues (password resets, status checks, standard how-to questions).

### Classification
Automated categorization of incoming tickets by topic, product area, sentiment, and intent using NLP/ML models. Enables intelligent routing and prioritization.

### Routing
The automated assignment of tickets to the appropriate agent, team, or tier based on classification, agent skills, availability, workload, and customer attributes.

### Conversational AI
AI systems (chatbots) that interact with customers in natural language to gather information, answer questions, and resolve issues before human escalation. Distinguished from rule-based chatbots by the use of NLP/ML for intent recognition.

---

## Quality Assurance

### QA Score
A numerical rating (typically 0-100) assigned to a support interaction based on a rubric evaluating accuracy, tone, effort, process adherence, and resolution quality. Used for coaching, not punishment.

### Calibration
A process where QA reviewers and team leads score the same ticket independently, then compare and discuss scores to ensure consistent application of the rubric across the team.

### Coaching
One-on-one feedback sessions between a team lead and an agent based on QA reviews. Focused on specific, actionable improvement areas. Effective coaching is the highest-ROI activity in support management.

### IQS (Internal Quality Score)
An aggregate quality metric for the support team, calculated as the average QA score across all reviewed tickets in a period. Used to track team-level quality trends.

---

## Organizational

### VoC (Voice of Customer)
The systematic collection, analysis, and distribution of customer feedback from support interactions. Includes qualitative themes (what customers complain about, request, praise) and quantitative signals (volume by topic, sentiment trends). VoC is support's most valuable output to the broader organization.

### Support Operations (Support Ops)
The function responsible for support infrastructure: tooling, workflow design, reporting, WFM, and process improvement. Distinguished from frontline support by its focus on systems rather than customer interactions.

### QBR (Quarterly Business Review)
A structured executive presentation reviewing support performance, trends, challenges, and strategic initiatives for the quarter. Includes metrics, VoC insights, and forward-looking plans.

### Tiered Support Model
The organizational structure dividing support into specialization levels (L1/L2/L3). Contrasted with "swarming" or "intelligent swarming" where issues go directly to the right expert without tier escalation.

### Intelligent Swarming
An alternative to tiered support where tickets are routed directly to the best-matched agent based on skills, rather than escalated through tiers. Reduces resolution time and customer effort for complex issues at the cost of higher agent skill requirements.

---

**All terms in this glossary are canonical. Use them precisely as defined.**
