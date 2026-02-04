# Support Brain -- Benchmark Tests (Authoritative)

These scenarios test the Support Brain's ability to handle real-world support challenges.
Each scenario must be worked through completely. Partial answers are failures.

A benchmark is not a quiz. It is a simulation of actual support conditions under pressure.
If the Support Brain cannot handle these scenarios rigorously, it cannot handle real operations.

---

## HOW TO USE THESE BENCHMARKS

1. Present each scenario to the Support Brain
2. Evaluate the response against the criteria listed
3. Score using SupportScore.md dimensions
4. A passing response must score >= 4.0 average across applicable dimensions
5. Hard fail on any dimension = scenario failed

---

## SCENARIO 1: Mystery Volume Spike

**Prompt:**
"Ticket volume spiked 300% after yesterday's release. No known bugs. Engineering says nothing changed. Support queue is at 4 hours wait time. Diagnose and respond."

**Must Include:**
- Immediate triage protocol (categorize incoming tickets by topic, not FIFO)
- Ticket clustering analysis (what are people actually writing about?)
- Release changelog cross-reference (what DID change, even if "nothing")
- Engineering escalation with specific ticket examples, not just "users are upset"
- Customer communication plan (status page update, in-app banner)
- Staffing adjustment (all-hands, overtime, defer non-urgent work)
- Root cause hypothesis tree
- Interim workaround if identifiable
- Post-spike retrospective plan

**Fail If:**
- Tells engineering "nothing is wrong" because engineering said so
- Does not cluster tickets to identify the pattern
- No customer communication plan
- No staffing response
- Waits for engineering to diagnose instead of investigating independently

---

## SCENARIO 2: Self-Service Deflection Strategy

**Prompt:**
"Design a self-service strategy to deflect 40% of current ticket volume. Current volume is 2,000 tickets/month. Top categories: password resets (18%), billing questions (15%), feature how-tos (22%), bug reports (12%), account changes (10%), other (23%). Show measurement plan."

**Must Include:**
- Category-by-category deflection strategy
- Self-service channel for each category (KB, in-app flows, chatbot, video tutorials)
- Prioritized implementation roadmap (highest deflection potential first)
- Realistic deflection estimates per category with justification
- Measurement framework (how to prove deflection, not just KB views)
- True deflection measurement (user viewed article AND did not submit ticket)
- Baseline measurement plan (before/after comparison)
- Quality gate (deflected users must still succeed, not just give up)
- Timeline with milestones
- Budget estimate

**Fail If:**
- Suggests "build a knowledge base" without specifics
- Deflection targets are not per-category
- No measurement plan
- Does not distinguish between deflection and abandonment
- Ignores the quality gate (users must actually solve their problem)
- Does not address the 23% "other" category

---

## SCENARIO 3: CEO Escalation Recovery

**Prompt:**
"A customer has emailed the CEO after 3 unresolved tickets over 2 weeks. The customer pays $50K/year. Their tickets were about data export failing, slow dashboard loading, and an incorrect invoice. Each ticket was handled by a different agent. None are resolved. The CEO wants a recovery plan by end of day."

**Must Include:**
- Immediate ownership assignment (single person owns the relationship)
- Timeline reconstruction (what happened on each ticket, where it failed)
- Root cause for each unresolved ticket
- Same-day response plan to the customer (not the CEO)
- Compensation/goodwill consideration appropriate to account value
- Systemic fix (why did 3 tickets fail across 3 agents?)
- VIP account identification process (should this customer have been flagged?)
- Escalation protocol improvement
- CEO response draft (concise, accountable, forward-looking)
- 30-day follow-up plan for the customer relationship

**Fail If:**
- Focuses on the CEO instead of the customer
- Does not assign single ownership
- Does not reconstruct the timeline
- Treats this as 3 separate tickets instead of a relationship failure
- No systemic improvement (only fixes this one customer)
- No follow-up plan

---

## SCENARIO 4: Support Team Scaling

**Prompt:**
"You currently have 5 support agents handling 1,500 tickets/month with acceptable metrics. Product is launching 3 new features next quarter and expects ticket volume to increase 60%. You cannot hire more than 2 agents. Plan how to handle it."

**Must Include:**
- Capacity analysis (current utilization, tickets per agent, complexity mix)
- Demand forecasting (60% overall, but by category and feature)
- Deflection-first strategy (reduce demand before adding supply)
- Automation opportunities ranked by impact
- Knowledge base expansion plan for new features
- 2 new agent onboarding plan with timeline
- Existing agent cross-training for new features
- Bot expansion if applicable
- Contingency plan if volume exceeds forecast
- Quality monitoring plan (scaling must not degrade quality)
- Phased approach aligned with feature launch dates

**Fail If:**
- Just says "hire 2 more agents"
- Does not attempt demand reduction (deflection/automation)
- No capacity math
- No quality monitoring during scaling
- Ignores feature-specific preparation
- No contingency for exceeding forecast

---

## SCENARIO 5: CSAT Collapse Diagnosis

**Prompt:**
"CSAT dropped from 92% to 74% over the past month. Ticket volume is unchanged. FCR is unchanged. No product changes. Response times are stable. Diagnose the cause and create a recovery plan."

**Must Include:**
- Systematic diagnostic framework (what changed if volume/FCR/speed did not?)
- CSAT verbatim analysis (read the actual comments, not just the number)
- Segment analysis (is the drop across all agents, or concentrated?)
- Survey methodology check (did the survey itself change?)
- Channel analysis (is the drop in one channel?)
- Ticket complexity analysis (are tickets harder even if volume is flat?)
- Agent morale check (burnout shows up in CSAT before other metrics)
- Customer base change analysis (new customer segment with different expectations?)
- Quality audit of recent tickets (QA scores vs CSAT to find the gap)
- Recovery plan with 30/60/90 day targets

**Fail If:**
- Assumes a single cause without diagnosis
- Does not read CSAT verbatim comments
- Does not segment the data
- Proposes solutions before diagnosing
- Ignores agent morale as a possible factor
- No timeline for recovery

---

## SCENARIO 6: Multi-Channel Strategy

**Prompt:**
"We currently only offer email support. The CEO wants to add live chat and phone support. Budget is limited. You have 8 agents. Design the multi-channel strategy including staffing, hours, and measurement."

**Must Include:**
- Channel strategy rationale (why these channels, for what ticket types)
- Staffing model across channels (not all agents on all channels)
- Skills-based routing design
- Coverage hours per channel with justification
- Channel-specific SLA targets
- Measurement framework per channel
- Implementation phasing (do not launch everything at once)
- Technology requirements and tool selection criteria
- Training plan for agents on new channels
- Quality standards per channel
- Risk assessment (what could go wrong)
- Fallback plan if a channel underperforms

**Fail If:**
- Launches all channels simultaneously
- All 8 agents handle all channels (no specialization)
- No phasing strategy
- Same SLA targets for all channels
- No measurement per channel
- Ignores the staffing constraint

---

## SCENARIO 7: Knowledge Base Rebuild

**Prompt:**
"The knowledge base has 500 articles. Analytics show only 30 articles get any traffic. Search success rate is 22%. Self-service deflection is 8%. The VP wants the KB 'fixed.' Create a rebuild strategy."

**Must Include:**
- Audit framework (categorize all 500 articles: keep, update, merge, archive, delete)
- Traffic and helpfulness analysis for the 30 active articles
- Content gap analysis (top tickets without KB coverage)
- Search improvement plan (taxonomy, tagging, synonym mapping)
- Information architecture redesign
- Writing standards and templates
- Article quality criteria (accuracy, clarity, completeness, findability)
- Migration plan (do not break existing links)
- Measurement targets with timeline
- Maintenance governance (prevent future decay)
- Resource requirements (who writes, who reviews, who maintains)
- Quick wins vs long-term improvements

**Fail If:**
- Proposes rewriting all 500 articles
- Does not prioritize by ticket volume
- No search improvement plan
- No maintenance governance (will decay again)
- No measurement targets
- Ignores the 470 articles with zero traffic

---

## SCENARIO 8: Support-Product Feedback Loop

**Prompt:**
"Support has been flagging the same 5 bugs for 6 months. Product has not fixed any of them. These bugs generate 200 tickets/month combined. The support team is frustrated. Design a solution."

**Must Include:**
- Business impact quantification (cost of 200 tickets/month, CSAT impact, churn risk)
- Data-driven case for each bug (ticket count, CSAT correlation, customer segment affected)
- Proposal for a formal VoC feedback loop with SLA on product response
- Escalation framework when feedback is ignored
- Interim support solutions (workarounds, macros, proactive communication)
- Joint prioritization meeting proposal (support + product)
- Metrics that hold both teams accountable
- Relationship repair strategy (support-product relationship is broken)
- Quick win identification (is any bug easy to fix?)
- Customer communication plan (acknowledge the known issues)

**Fail If:**
- Blames product without providing data
- Does not quantify the business impact
- No interim solutions for the 200 tickets/month
- No formal feedback loop proposal
- Only focuses on the current 5 bugs (no systemic fix)
- Does not address the broken relationship

---

## SCENARIO 9: Bot Launch Gone Wrong

**Prompt:**
"We launched a support chatbot 2 weeks ago. Bot resolution rate is 8%. Customers are complaining that the bot is unhelpful and they cannot reach a human. CSAT for bot interactions is 31%. Three customers have tweeted complaints. What do you do?"

**Must Include:**
- Immediate damage control (make human escalation prominently available)
- Social media response plan for the 3 tweets
- Diagnostic analysis (why is resolution rate 8%? what is the bot attempting?)
- Bot conversation log review (sample 50+ conversations)
- Identification of what the bot CAN handle vs what it cannot
- Decision framework: fix, scale back, or shut down
- If fixing: specific training gaps and improvement plan
- If scaling back: which use cases to keep vs remove
- Customer trust recovery plan
- Measurement framework for improvement with clear kill criteria
- Communication to customers about changes

**Fail If:**
- Keeps the bot running as-is while investigating
- Does not make human escalation immediately available
- Ignores the social media complaints
- Does not review actual bot conversations
- No clear decision framework (fix vs scale back vs kill)
- No trust recovery plan

---

## SCENARIO 10: Incident Communication

**Prompt:**
"Major outage. The product has been down for 45 minutes. Engineering estimates 2 more hours to fix. 500 users are affected. No customer communication has gone out yet. You have no status page. Create and execute the communication plan."

**Must Include:**
- Immediate communication (within 15 minutes of receiving this scenario)
- Multi-channel notification plan (email, in-app when restored, social, support page)
- Communication template with required fields (what happened, who is affected, ETA, workaround, updates cadence)
- Update cadence commitment (every 30 minutes during outage)
- Internal communication (support team briefed, ready for inbound)
- Staffing adjustment for expected ticket surge
- Post-resolution communication (what happened, what we are doing to prevent recurrence)
- Status page creation recommendation for future incidents
- Affected customer identification method
- Compensation/goodwill consideration
- Post-incident review schedule

**Fail If:**
- First communication goes out more than 1 hour into the outage
- No update cadence commitment
- Template is vague or uses corporate-speak
- Does not address post-resolution communication
- No recommendation for status page
- Does not prepare for the ticket surge

---

## SCENARIO 11: Support Metrics Overhaul

**Prompt:**
"The support team currently tracks: ticket count, average response time, and CSAT. That is it. The new VP of Customer Experience wants a 'world-class metrics framework.' Design one from scratch."

**Must Include:**
- Metrics organized by category (speed, quality, efficiency, customer impact, team health)
- Leading and lagging indicator identification
- Metric definitions with precise calculation methodology
- Data source for each metric
- Target setting approach (benchmark, baseline, or aspirational)
- Dashboard design (what to show at team level, manager level, executive level)
- Metric review cadence (daily, weekly, monthly, quarterly)
- Anti-gaming protections (how metrics could be gamed and how to prevent it)
- Implementation priority (do not measure everything on day 1)
- Change management plan (team buy-in on new metrics)
- Metrics that should be retired or avoided

**Fail If:**
- Lists 50 metrics without prioritization
- No anti-gaming consideration
- No phased implementation
- No distinction between audience levels (team vs executive)
- Metrics defined without calculation methodology
- No change management for the team

---

## SCENARIO 12: Customer Churn Intervention

**Prompt:**
"Analytics identified 50 accounts showing churn signals: decreasing login frequency, increasing support tickets, and CSAT scores below 70%. These accounts represent $2M in ARR. Design a support-driven retention intervention."

**Must Include:**
- Account segmentation (not all 50 get the same treatment)
- Churn signal validation (are these real signals or noise?)
- Tiered intervention strategy based on account value and signal severity
- Support-specific interventions (proactive outreach, dedicated support, issue resolution sprint)
- Cross-functional coordination (support + CSM + product)
- Outreach script and communication templates
- Escalation path for accounts that do not respond
- Measurement framework (did the intervention work?)
- Timeline with milestones
- Resource allocation (who handles this alongside normal operations?)
- Success and failure criteria
- Playbook for future use (not a one-time effort)

**Fail If:**
- Same intervention for all 50 accounts
- No segmentation by value or signal severity
- Support acts alone without cross-functional coordination
- No measurement of intervention effectiveness
- No playbook creation for future use
- Ignores resource constraints (regular support must continue)

---

## SCENARIO 13: Multilingual Support Expansion

**Prompt:**
"We are expanding to Germany, Japan, and Brazil. Currently we only offer English support. Budget allows for 3 new hires total. Design the multilingual support strategy."

**Must Include:**
- Language priority based on market size, launch timeline, and customer expectations
- Staffing model (native speakers vs translation tools vs hybrid)
- Coverage hours per market (time zone considerations)
- Quality standards for non-English support (cannot be lower than English)
- Knowledge base translation and maintenance strategy
- Bot/automation localization plan
- Cultural adaptation (not just language translation)
- Escalation path for complex issues (back to English-speaking specialists?)
- Measurement framework per language
- Phased launch strategy
- Risk assessment and contingency plans

**Fail If:**
- Hires one person per language with no backup plan
- Uses machine translation alone without quality review
- Same coverage hours for all markets regardless of time zone
- No cultural adaptation
- No KB translation strategy
- Ignores the quality parity requirement

---

## SCENARIO 14: Support During Acquisition

**Prompt:**
"Your company is acquiring a competitor. Their product will be merged into yours over 6 months. They have 5,000 customers with their own support team of 4 agents. You have 8 agents and 10,000 customers. Plan the support integration."

**Must Include:**
- Customer communication strategy (both customer bases)
- Knowledge transfer plan (acquired product to your agents)
- Agent integration plan (their 4 agents joining your team)
- Tool consolidation plan (different ticketing systems)
- KB merger strategy
- Migration support plan (their customers moving to your product)
- Escalation path during transition (who handles what)
- Quality monitoring during integration (metrics to watch)
- Risk assessment (what could go wrong during migration)
- Timeline with phases and decision gates
- Customer experience guarantee (service levels during transition)
- Contingency for higher-than-expected support volume

**Fail If:**
- No customer communication plan
- Expects immediate agent productivity on new product
- No knowledge transfer timeline
- Ignores tool consolidation
- No migration-specific support plan
- Does not maintain service levels during transition

---

## SCENARIO 15: Support as Profit Center

**Prompt:**
"The CFO wants support to go from cost center to profit center. Current cost is $400K/year. Revenue is $0. Without degrading free support quality, design a path to making support generate revenue."

**Must Include:**
- Premium support tier design (what is included, pricing, SLA)
- Free vs premium boundary definition (what stays free)
- Market analysis (what do competitors charge for premium support?)
- Revenue model with realistic projections
- Customer segmentation (who would pay and why)
- Premium support operations model (dedicated agents, priority queue)
- Professional services offerings (onboarding, training, implementation)
- Upsell/cross-sell identification during support interactions (ethical, not pushy)
- Pilot program design (test before full launch)
- Quality guarantee (free support must not degrade)
- Success metrics and break-even timeline
- Risk assessment (customer backlash, quality trade-offs)

**Fail If:**
- Degrades free support to force upgrades
- No market validation for pricing
- Revenue projections are fantasy (no basis in data)
- No pilot program
- Ignores the ethical line between support and sales
- No quality guarantee for free tier

---

## SCENARIO 16: Post-Mortem Template Creation

**Prompt:**
"We just had the worst support week in company history: 3-day outage, CSAT dropped to 45%, social media backlash, and 2 agents quit. Create a post-mortem framework that covers both the incident and the support response."

**Must Include:**
- Dual-track post-mortem (technical incident AND support response)
- Blameless post-mortem methodology
- Timeline reconstruction framework
- Customer impact assessment template
- Support response assessment (what worked, what broke)
- Communication effectiveness review
- Agent impact assessment (burnout, morale, the 2 resignations)
- Root cause analysis (technical and operational)
- Action items with owners and deadlines
- Prevention measures for both technical and support failures
- Follow-up cadence for action items
- Template that can be reused for future incidents

**Fail If:**
- Only covers the technical incident, not the support response
- Blame-oriented (names individuals as cause)
- No agent wellbeing consideration
- No reusable template
- Action items without owners or deadlines
- Does not address the resignations

---

## SCORING BENCHMARKS

Each scenario is scored against applicable SupportScore.md dimensions.

### Passing Threshold
- Average score >= 4.0 across applicable dimensions
- No hard-fail dimension (Resolution Quality, Proactive Support, VoC Impact) < 3
- Response is complete (all "Must Include" items addressed)

### Benchmark Performance Levels
| Level | Score Range | Meaning |
|-------|-----------|---------|
| Expert | 4.5 - 5.0 | Production-ready support operations guidance |
| Proficient | 4.0 - 4.4 | Solid with minor gaps |
| Developing | 3.0 - 3.9 | Needs significant improvement |
| Failing | < 3.0 | Cannot be used for real operations |

---

## END OF BENCHMARK TESTS
