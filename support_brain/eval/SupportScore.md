# Support Score -- Quality Enforcement (Authoritative)

This document defines how support quality is evaluated.
Every support operation must be scored before it is considered healthy.

If quality is not measurable, it is not enforced.
If support is not rigorous, customers suffer and churn follows.

---

## SCORING RULES (MANDATORY)

Each support operation must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate intervention required:
- **Resolution Quality**
- **Proactive Support**
- **VoC Impact**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 under any circumstance
- Operational Efficiency is NOT a hard fail -- evaluated holistically

### Holistic Note
Operational Efficiency is evaluated holistically. Cost reductions that degrade quality are failures, not efficiencies. Efficiency gains must preserve or improve customer experience.

---

## 1. RESPONSE SPEED

**Question:**
Does the team meet SLA targets for first response time, and is resolution time trending in the right direction?

### What to Evaluate
- First response time (FRT) vs SLA target
- Median resolution time trend (last 30/60/90 days)
- Time-to-resolution distribution (are outliers managed?)
- SLA breach rate and pattern analysis
- Response time by channel (email, chat, phone)
- After-hours and weekend response coverage
- Queue management effectiveness

### Scoring Guide
- **5** -- FRT consistently under SLA by 20%+; resolution time trending down; zero SLA breaches in 30 days; all channels meet targets; after-hours coverage excellent; queue never exceeds 2x normal
- **4** -- FRT meets SLA; resolution time stable or improving; SLA breach rate <2%; most channels meet targets; after-hours adequate; queue managed well
- **3** -- FRT occasionally misses SLA; resolution time flat; SLA breach rate 2-5%; one channel underperforming; after-hours gaps; queue occasionally backs up
- **2** -- FRT regularly misses SLA; resolution time increasing; SLA breach rate 5-10%; multiple channels miss; after-hours poor; queue frequently backed up
- **1** -- FRT is double SLA or worse; resolution time unmanaged; breach rate >10%; no channel meets target; no after-hours; queue is a disaster

### SLA Benchmarks by Channel

| Channel | Target FRT | Target Resolution | Premium FRT |
|---------|-----------|-------------------|-------------|
| Email | < 4 hours | < 24 hours | < 1 hour |
| Chat | < 2 minutes | < 15 minutes | < 30 seconds |
| Phone | < 60 seconds | First call | < 30 seconds |
| Social | < 1 hour | < 4 hours | < 15 minutes |
| In-app | < 30 minutes | < 8 hours | < 5 minutes |

### Common Failures
- SLA measured on first response only (ignoring total resolution)
- Sending auto-reply to "meet" FRT without actual help
- Not segmenting speed by priority level
- Ignoring after-hours coverage gaps
- No monitoring of resolution time distribution (averages hide outliers)

### Remediation
Score <4 --> Analyze bottlenecks. Staff to demand. Implement routing. Set up SLA monitoring alerts. Address channel-specific gaps.

---

## 2. RESOLUTION QUALITY

**Question:**
Is the team resolving issues correctly the first time, maintaining high satisfaction, and reducing escalations?

### What to Evaluate
- First Contact Resolution (FCR) rate
- Customer Satisfaction (CSAT) score
- Escalation rate and trend
- Reopen rate (tickets reopened within 7 days)
- Quality assurance (QA) scores from ticket reviews
- Resolution completeness (was the full issue addressed, not just the surface symptom?)
- Customer effort score (how hard did the customer have to work?)

### Scoring Guide
- **5** -- FCR >85%; CSAT >95%; escalation rate <5% and declining; reopen rate <3%; QA scores averaging >90%; full-issue resolution standard; CES consistently low
- **4** -- FCR >80%; CSAT >90%; escalation rate <8%; reopen rate <5%; QA scores >85%; mostly complete resolution; CES acceptable
- **3** -- FCR 70-80%; CSAT 80-90%; escalation rate 8-12%; reopen rate 5-8%; QA scores 75-85%; some partial resolutions; CES mixed
- **2** -- FCR <70%; CSAT 70-80%; escalation rate >12%; reopen rate >8%; QA scores <75%; frequent partial resolutions; high customer effort
- **1** -- FCR <60%; CSAT <70%; escalation rate >20%; reopen rate >10%; no QA process; customers regularly unresolved; extreme customer effort

### FCR Measurement Rules
- FCR is measured from the customer's perspective (not the agent's)
- A ticket resolved on first contact but reopened within 7 days = NOT FCR
- Transfers to another agent within the same session = still counts as FCR
- Escalation to a specialist = NOT FCR

### Quality Assurance Framework

| QA Category | Weight | What to Evaluate |
|-------------|--------|------------------|
| Accuracy | 30% | Was the information correct? |
| Completeness | 25% | Was the full issue addressed? |
| Tone and empathy | 20% | Was the customer treated well? |
| Process adherence | 15% | Were internal processes followed? |
| Documentation | 10% | Was the ticket properly documented? |

### Common Failures
- Closing tickets prematurely to improve metrics
- Not verifying resolution with the customer
- Treating symptoms instead of root causes
- No QA process for ticket quality
- Escalation used as avoidance instead of necessity

### Remediation
Score <3 --> IMMEDIATE INTERVENTION. Review escalation reasons. Implement QA program. Retrain on root cause analysis. Audit closed tickets for premature closure.

---

## 3. KNOWLEDGE EFFECTIVENESS

**Question:**
Is the knowledge base deflecting tickets, and are articles actually helping users solve problems?

### What to Evaluate
- KB deflection rate (% of users who view KB and do not submit a ticket)
- Article helpfulness scores (thumbs up/down, ratings)
- Search success rate (users who search and find what they need)
- KB coverage (are top ticket topics covered?)
- Article freshness (% of articles updated in last 90 days)
- Content gap analysis (tickets about topics with no KB article)
- Self-service completion rate (users who complete tasks via KB)

### Scoring Guide
- **5** -- Deflection rate >40%; helpfulness >85%; search success >80%; top 20 topics fully covered with updated articles; content gaps systematically identified and filled; self-service completion >60%
- **4** -- Deflection rate 30-40%; helpfulness 75-85%; search success 70-80%; top 15 topics covered; content gaps reviewed monthly; self-service completion 45-60%
- **3** -- Deflection rate 20-30%; helpfulness 60-75%; search success 50-70%; top 10 topics covered; content gaps reviewed quarterly; self-service completion 30-45%
- **2** -- Deflection rate 10-20%; helpfulness <60%; search success <50%; major topics missing; content gaps not tracked; self-service completion <30%
- **1** -- Deflection rate <10%; KB unhelpful; search broken; major gaps; no freshness tracking; self-service nearly impossible

### KB Quality Standards

| Standard | Requirement |
|----------|-------------|
| Accuracy | Verified against current product state |
| Clarity | 8th grade reading level or below |
| Completeness | All steps included, no assumed knowledge |
| Findability | Titled with user language, not internal jargon |
| Freshness | Updated within 90 days of related product change |
| Visual aids | Screenshots or GIFs for complex procedures |
| Related content | Links to related articles |

### Content Gap Identification Process
1. Export top 50 ticket topics monthly
2. Map each topic to existing KB articles
3. Identify topics with no coverage or outdated coverage
4. Prioritize by ticket volume
5. Create or update articles
6. Measure deflection impact

### Common Failures
- KB exists but is not surfaced to users at point of need
- Articles written in engineer-speak, not user-speak
- No freshness management (articles from 2 years ago still live)
- Search returns irrelevant results
- No measurement of whether articles actually help

### Remediation
Score <4 --> Audit top 20 ticket topics against KB. Fix search relevance. Update stale articles. Implement helpfulness tracking. Create content for gaps.

---

## 4. AGENT PERFORMANCE

**Question:**
Are agents consistent in quality, appropriate in handle time, and minimizing customer effort?

### What to Evaluate
- Individual QA score consistency (standard deviation across agents)
- Handle time appropriateness (not too fast, not too slow)
- Customer effort score by agent
- Agent utilization rate
- Training completion and certification
- Specialization effectiveness (are specialists better on their topics?)
- Agent satisfaction and retention

### Scoring Guide
- **5** -- QA standard deviation <5 points; handle time appropriate for complexity; CES consistently low; utilization 70-80%; all agents certified; specialists outperform on their domains; agent satisfaction >80%; retention >90%
- **4** -- QA standard deviation <8 points; handle time mostly appropriate; CES acceptable; utilization 65-80%; most agents certified; specialists effective; satisfaction >70%; retention >85%
- **3** -- QA standard deviation <12 points; handle time inconsistent; CES mixed; utilization unbalanced; certification gaps; specialist advantage unclear; satisfaction 60-70%; retention 75-85%
- **2** -- QA standard deviation >12 points; handle time problematic; CES high; utilization poorly managed; minimal training; no specialization; satisfaction <60%; retention <75%
- **1** -- No QA consistency; handle time unmanaged; extreme customer effort; no utilization tracking; no training; no specialization; high burnout; high turnover

### Handle Time Philosophy
Handle time should be appropriate, not minimal.
- Too fast = rushing, incomplete resolution, customer frustration
- Too slow = inefficiency, customer impatience, queue backup
- Right = thorough resolution at the pace the issue requires

| Ticket Complexity | Acceptable Handle Time |
|-------------------|----------------------|
| Simple (password reset, FAQ) | 2-5 minutes |
| Medium (configuration, troubleshooting) | 10-20 minutes |
| Complex (multi-system, investigation) | 30-60 minutes |
| Critical (outage, data loss) | As long as needed |

### Agent Development Framework

| Level | Capabilities | Autonomy |
|-------|-------------|----------|
| L1 - New | Handles simple tickets, follows scripts | Low (QA on 100% of tickets) |
| L2 - Proficient | Handles medium complexity, personalizes responses | Medium (QA on 30% of tickets) |
| L3 - Expert | Handles complex issues, mentors L1/L2 | High (QA on 10% of tickets) |
| L4 - Lead | Handles escalations, improves processes, trains team | Full (QA on 5% of tickets, peer review) |

### Common Failures
- Optimizing for speed over quality
- No differentiation between simple and complex tickets in metrics
- Agent burnout from unrealistic targets
- No development path for agents
- Treating all agents identically regardless of skill

### Remediation
Score <4 --> Implement tiered QA. Adjust handle time expectations by complexity. Create development paths. Survey agent satisfaction. Balance workload distribution.

---

## 5. PROACTIVE SUPPORT

**Question:**
Is the team preventing issues before they become tickets, communicating known issues, and maintaining accurate status information?

### What to Evaluate
- Issues prevented through proactive outreach
- Known issue communication speed and quality
- Status page accuracy and update frequency
- Proactive monitoring (detecting issues before users report them)
- Release readiness (support prepared before launches)
- Proactive account health checks (for high-value customers)
- Bug report quality and product team follow-through

### Scoring Guide
- **5** -- Systematic issue prevention program; known issues communicated within 15 minutes; status page always accurate; monitoring catches 80%+ issues before users; support always ready for releases; proactive health checks for top accounts; bug reports consistently actioned by product
- **4** -- Regular issue prevention; known issues communicated within 1 hour; status page mostly accurate; monitoring catches most issues; support usually prepared for releases; some proactive outreach; bug reports mostly actioned
- **3** -- Occasional prevention efforts; known issues communicated within 4 hours; status page sometimes delayed; monitoring catches some issues; support sometimes caught off-guard by releases; limited proactive outreach; bug reports sometimes ignored
- **2** -- Reactive only; known issues communicated late; status page unreliable; monitoring gaps; support regularly surprised by releases; no proactive outreach; bug reports rarely actioned
- **1** -- No proactive capability; users always discover issues first; no status page or always wrong; no monitoring; support never prepared; completely reactive; no product feedback loop

### Proactive Support Maturity Model

| Level | Characteristics |
|-------|----------------|
| Reactive | Wait for tickets, then respond |
| Responsive | Fast reaction, good resolution, but still reactive |
| Proactive | Monitor for issues, communicate before users ask |
| Predictive | Use data to predict and prevent issues |
| Preventive | Work with product to eliminate root causes |

### Known Issue Communication Template
```
Subject: [Status] [Brief Description]
Impact: [Who is affected and how]
Workaround: [If available]
ETA: [Expected resolution time]
Updates: [Frequency of updates]
Last Updated: [Timestamp]
```

### Common Failures
- Status page updated after customers already complained
- No release readiness process (support learns about launches from customers)
- Bug reports submitted but never tracked for product response
- Monitoring only covers infrastructure, not application-level issues
- Proactive communication only for major outages, not smaller issues

### Remediation
Score <3 --> IMMEDIATE ACTION. Implement status page protocol. Create release readiness checklist. Set up application monitoring. Establish bug report tracking with product team.

---

## 6. AI EFFECTIVENESS

**Question:**
Is the AI/bot resolving issues effectively, handing off well to humans, and maintaining satisfaction?

### What to Evaluate
- Bot resolution rate (issues fully resolved without human)
- Handoff quality (context preserved, customer not repeating)
- CSAT for bot-handled tickets vs human-handled
- Bot containment rate (stays on topic, does not hallucinate)
- Fallback rate (how often bot cannot help at all)
- Time-to-resolution for bot-resolved tickets
- Customer preference (do users choose bot or request human?)

### Scoring Guide
- **5** -- Bot resolution >40%; handoff quality rated >90% by agents; bot CSAT within 5 points of human CSAT; containment >95%; fallback <10%; bot resolution time <2 minutes; users voluntarily choosing bot for simple issues
- **4** -- Bot resolution 25-40%; handoff quality >80%; bot CSAT within 10 points of human; containment >90%; fallback <15%; resolution time <5 minutes; user acceptance growing
- **3** -- Bot resolution 15-25%; handoff quality 60-80%; bot CSAT notably lower than human; containment 80-90%; fallback 15-25%; resolution time variable; user acceptance mixed
- **2** -- Bot resolution <15%; handoff quality poor (users repeat themselves); bot CSAT significantly lower; containment <80%; fallback >25%; resolution time long; users avoid bot
- **1** -- Bot resolution negligible; handoff is broken; bot CSAT terrible; bot goes off-topic; fallback >40%; bot makes things worse; users actively hate bot

### Bot Quality Standards

| Standard | Requirement |
|----------|-------------|
| Accuracy | Information provided must be correct 99%+ of the time |
| Honesty | Bot must acknowledge when it cannot help |
| Context | Bot must pass full context to human on handoff |
| Speed | Bot must be faster than human for simple issues |
| Tone | Bot must match brand voice and be empathetic |
| Escalation | Bot must offer human handoff proactively, not only when asked |
| Learning | Bot performance must improve over time with feedback |

### Handoff Requirements
When bot hands off to a human agent:
1. Full conversation history passed to agent
2. Bot's understanding of the issue summarized
3. Customer does not need to repeat any information
4. Agent can see what solutions the bot already attempted
5. Handoff is seamless (no "please hold while I transfer you")

### Common Failures
- Bot deployed without measuring its actual resolution rate
- No comparison of bot CSAT vs human CSAT
- Handoff loses context (customer starts over)
- Bot trained on outdated knowledge base
- No fallback escalation path
- Bot confidence threshold too low (attempts issues it cannot solve)

### Remediation
Score <4 --> Audit bot resolution accuracy. Fix handoff context passing. Update bot training data. Set proper confidence thresholds. Implement bot-to-human CSAT comparison.

---

## 7. OPERATIONAL EFFICIENCY

**Question:**
Is cost per ticket trending down while quality is maintained or improving, and is automation rate increasing?

### What to Evaluate
- Cost per ticket trend (last 3-6 months)
- Automation rate (% of tickets touched by automation)
- Agent productivity (tickets per agent per day, adjusted for complexity)
- Channel shift (are users moving to lower-cost channels?)
- Backlog health (is backlog growing, stable, or shrinking?)
- Workforce planning accuracy (staffing matches demand)
- Tool utilization (are support tools fully leveraged?)

### Scoring Guide
- **5** -- Cost per ticket declining quarter-over-quarter while quality improves; automation >50%; productivity optimized per complexity tier; channel shift to self-service accelerating; backlog consistently < 1 day; staffing matches demand within 10%; all tools fully utilized
- **4** -- Cost per ticket stable or slightly declining; automation 30-50%; productivity appropriate; positive channel shift; backlog < 2 days; staffing mostly matched; most tools utilized
- **3** -- Cost per ticket flat; automation 15-30%; productivity inconsistent; channel mix unchanged; backlog 2-5 days; some staffing mismatches; tools underutilized
- **2** -- Cost per ticket increasing; automation <15%; productivity declining; no channel shift; backlog growing; regular staffing mismatches; tools barely used
- **1** -- Cost per ticket unmanaged; minimal automation; productivity unmeasured; all traffic on high-cost channels; backlog out of control; chronic understaffing; tools unused

### Efficiency vs Quality Balance

| Metric | Efficiency Target | Quality Gate |
|--------|-------------------|-------------|
| Cost per ticket | Decreasing | CSAT must remain >= 90% |
| Handle time | Appropriate | QA scores must remain >= 85% |
| Automation rate | Increasing | Bot CSAT within 10 points of human |
| Headcount | Optimized | Agent burnout score < 3/10 |
| Channel shift | Toward self-service | Self-service completion rate >= 40% |

**Rule:** Any efficiency improvement that degrades quality is not an improvement. It is a cost transfer from the company to the customer.

### Common Failures
- Cutting headcount without improving tools or automation
- Measuring cost per ticket without quality adjustment
- Automation that frustrates customers (false efficiency)
- No workforce planning (always reactive hiring)
- Tools purchased but not configured or adopted

### Remediation
Score <4 --> Audit automation opportunities. Implement workforce planning. Measure quality-adjusted cost. Train team on tools. Build channel shift strategy.

---

## 8. VoC IMPACT

**Question:**
Is customer feedback being systematically captured, reaching product teams, driving changes, and resulting in measurable improvement?

### What to Evaluate
- Product feedback loop (support insights reach product team)
- Top issues declining over time (are root causes being fixed?)
- Feature requests tracked and communicated
- Bug report --> fix cycle time
- Customer voice in product planning (support has a seat at the table)
- Feedback taxonomy and categorization quality
- Closed-loop communication (customers told when their feedback led to changes)

### Scoring Guide
- **5** -- Systematic VoC program; product team receives weekly insights; top 5 issues show quarter-over-quarter decline; feature requests influence roadmap; bug fix cycle <2 weeks for critical; support participates in product planning; rigorous taxonomy; closed-loop communication standard
- **4** -- Regular VoC sharing; product team engaged; top issues declining; feature requests tracked; bug fixes reasonable; support occasionally consulted; good taxonomy; some closed-loop
- **3** -- Occasional VoC sharing; product team sometimes responsive; top issues persistent; feature requests logged but not tracked; bug fixes slow; support not part of planning; basic taxonomy; no closed-loop
- **2** -- Minimal VoC sharing; product team rarely responsive; top issues growing; feature requests lost; bugs languish; support excluded; poor taxonomy; no feedback to customers
- **1** -- No VoC program; support and product are silos; issues never fixed; no feature request tracking; no bug prioritization; support invisible to product; no categorization

### VoC Feedback Loop

```
Customer reports issue
      |
      v
Support categorizes and resolves
      |
      v
Feedback aggregated and themed
      |
      v
Product team receives weekly report
      |
      v
Product prioritizes and fixes root cause
      |
      v
Support confirms fix and updates KB
      |
      v
Customer notified of improvement (closed loop)
```

### VoC Metrics

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Top issue recurrence | Are root causes being fixed? | Top 5 issues decline quarter-over-quarter |
| Feedback-to-roadmap rate | Does feedback influence product? | >= 20% of roadmap items traced to VoC |
| Bug fix cycle time | How fast are reported bugs fixed? | Critical <1 week, High <2 weeks, Medium <4 weeks |
| Closed-loop rate | Are customers told when feedback is acted on? | >= 50% of feature-request submitters notified |
| Product engagement | Does product team engage with support insights? | Weekly review meeting attended |

### Common Failures
- Support collects feedback but no one reads it
- No categorization taxonomy (feedback is noise, not signal)
- Product team does not acknowledge support insights
- Top issues persist for quarters with no fix
- Customers never learn that their feedback mattered
- Bug reports from support deprioritized vs internal reports

### Remediation
Score <3 --> CRITICAL. Establish weekly VoC report to product. Implement feedback taxonomy. Track top issues over time. Create closed-loop process. Get support representation in product planning.

---

## FINAL SUPPORT SCORE DECISION

**Hard Fail Dimensions (Resolution Quality, Proactive Support, VoC Impact):**
- Score <3 --> **IMMEDIATE INTERVENTION REQUIRED**

**All Dimensions:**
- Average score >= 4.0 --> **SUPPORT OPERATION IS HEALTHY**
- Average score < 4.0 --> **IMPROVEMENT PLAN REQUIRED**

**Operational Efficiency:**
- NOT a hard fail
- Evaluated holistically (efficiency at the expense of quality is a failure)
- Score <3 triggers review, not automatic intervention

Scores must be stated explicitly before final output.

### Score Card Template

```markdown
## Support Score: [Team/Operation Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Response Speed | /5 | |
| Resolution Quality | /5 | |
| Knowledge Effectiveness | /5 | |
| Agent Performance | /5 | |
| Proactive Support | /5 | |
| AI Effectiveness | /5 | |
| Operational Efficiency | /5 | |
| VoC Impact | /5 | |

**Average Score:** X.X / 5.0
**Hard Fail Check:** [ ] All hard-fail dimensions >= 3
**Verdict:** HEALTHY / IMPROVEMENT PLAN REQUIRED
**Top Priority:** [single most impactful improvement]
**Issues:** [if any]
**Strengths:** [highlight what works]
**Required Actions:** [specific next steps]
```

---

## SCORING CALIBRATION GUIDE

### What a "5" Operation Looks Like
- Customers get fast, correct, empathetic resolutions
- Self-service handles 40%+ of issues
- Bot and human work together seamlessly
- Issues are prevented, not just resolved
- Customer feedback drives product improvements
- Agents are skilled, supported, and retained
- Costs trend down while quality trends up

### What a "3" Operation Looks Like
- Customers eventually get help, but it takes effort
- Knowledge base exists but is underutilized
- Bot has limited effectiveness
- Support is reactive, not proactive
- Customer feedback is collected but not acted upon
- Agents are adequate but inconsistent
- Costs are flat with no clear improvement strategy

### What a "1" Operation Looks Like
- Customers struggle to get any help
- No self-service capability
- Bot makes things worse
- Every issue is a surprise
- Customer feedback goes nowhere
- Agent turnover is high
- Costs are rising while satisfaction drops

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Improve until standards are met.
Support that does not meet the bar is not "good enough" -- it is failing the customer.

---

## END OF SUPPORT SCORE
