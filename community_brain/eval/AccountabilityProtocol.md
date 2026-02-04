# Community Accountability Protocol — Eval Module

This protocol establishes the accountability framework for all community
operations within this brain. It defines how community health is tracked,
how engagement is verified, how member satisfaction is measured, how program
ROI is reported, and how escalation proceeds when standards are not met.

---

## 1. COMMUNITY HEALTH ACCOUNTABILITY

### Health Score Framework

Every community managed under this brain must maintain a composite health
score calculated monthly.

**Health Score Components:**

| Component | Weight | Metric | Target | Source |
|-----------|--------|--------|--------|--------|
| Engagement Rate | 20% | DAU/MAU | >15% | Platform analytics |
| Activation Rate | 15% | New members activated in 30 days | >30% | Cohort tracking |
| Retention (30-day) | 20% | Members retained at Day 30 | >25% | Cohort tracking |
| Response Rate | 15% | Questions answered within 24h | >80% | Platform analytics |
| Contribution Rate | 10% | Members who created content / MAM | >10% | Platform analytics |
| Member Satisfaction | 10% | NPS score | >50 | Quarterly survey |
| Moderation Health | 10% | Incidents resolved within SLA | >90% | Moderation log |

**Composite Score Calculation:**
```
Health Score = Sum of (Component Score x Weight)
Each component scored 0–100 based on % of target achieved (capped at 100)

Scale:
  90–100: Exceptional — Maintain and document best practices
  70–89:  Healthy — Continue current approach, optimize
  50–69:  Adequate — Identify improvement areas, create action plan
  30–49:  Concerning — Escalate to leadership, immediate intervention
  0–29:   Critical — Emergency review, potential strategy overhaul
```

### Health Score Tracking Cadence

| Cadence | Action | Responsible | Output |
|---------|--------|------------|--------|
| Weekly | Quick health check (3 key metrics) | Community Manager | Slack update |
| Monthly | Full health score calculation | Community Operations | Health dashboard |
| Quarterly | Health trend analysis and action plan | Community Lead | Strategy document |
| Annually | Comprehensive health review | Full team + stakeholders | Annual report |

### Health Score Accountability

| Score Range | Required Actions |
|------------|-----------------|
| 70+ | Monthly monitoring, quarterly review |
| 50–69 | Bi-weekly monitoring, monthly action plan |
| 30–49 | Weekly monitoring, immediate intervention plan, escalation to leadership |
| <30 | Daily monitoring, emergency strategy review, executive involvement |

---

## 2. ENGAGEMENT TRACKING ACCOUNTABILITY

### Engagement Tracking Requirements

Every community must maintain the following engagement tracking:

**Daily Tracking (Automated):**
- Active members count
- New posts and replies
- New member joins
- Moderation actions taken
- Unresolved questions count

**Weekly Tracking (Semi-Automated):**
- WAU and trend
- Top contributors and their activity
- Content production (member vs. staff)
- Event attendance
- Engagement rate trend

**Monthly Tracking (Manual + Automated):**
- Full health score calculation
- Cohort retention analysis
- Channel/space activity distribution
- Program participation rates
- Growth funnel conversion rates

### Engagement Tracking Verification

| Verification | Method | Frequency |
|-------------|--------|-----------|
| Data accuracy | Cross-reference platform analytics with tracking | Monthly |
| Tracking completeness | Verify all required metrics captured | Monthly |
| Trend validation | Compare automated trends with qualitative observation | Quarterly |
| Benchmark comparison | Compare metrics against industry benchmarks | Quarterly |

---

## 3. MEMBER SATISFACTION ACCOUNTABILITY

### Satisfaction Measurement Requirements

**NPS Survey (Quarterly):**
- Single question: "How likely are you to recommend this community?"
- Open-ended follow-up: "What is the primary reason for your score?"
- Distributed to all active members (past 30 days)
- Minimum response rate: 15% of active members
- Results shared with community (transparency)

**Pulse Survey (Monthly):**
- 3–5 questions on current satisfaction
- Topics rotate: content quality, event quality, moderation, value
- 2-minute completion time maximum
- Results inform monthly action plan

**Exit Survey (On Departure):**
- Triggered when member becomes inactive for 60+ days
- 5–10 questions on reason for departure
- Results inform retention strategy
- Response target: 20%+ of departing members

### Satisfaction Score Accountability

| Score | Action Required |
|-------|----------------|
| NPS > 60 | Celebrate, document what works, maintain |
| NPS 40–60 | Identify improvement areas, create quarterly plan |
| NPS 20–40 | Immediate investigation, member interviews, action plan |
| NPS < 20 | Emergency review, potential structural changes |

### Feedback Loop Closure

Every satisfaction survey must result in:
1. **Analysis** — What does the data say? (within 1 week)
2. **Sharing** — Share results with community (within 2 weeks)
3. **Action** — Create action plan for top issues (within 2 weeks)
4. **Communication** — Tell members what you are changing (within 3 weeks)
5. **Verification** — Check if changes improved satisfaction (next survey)

---

## 4. PROGRAM ROI TRACKING

### ROI Tracking Requirements

Every community program must track its ROI independently.

**Required Program ROI Components:**

| Component | Calculation | Tracking Method |
|-----------|-----------|----------------|
| Support Deflection | Questions answered x deflection rate x ticket cost | Platform analytics |
| Retention Impact | (Community retention - baseline) x members x LTV | Cohort comparison |
| Referral Value | Referred customers x conversion x revenue | Attribution tracking |
| Content Value | UGC pieces x equivalent production cost | Content tracking |
| Brand Value | Reach x engagement x estimated CPM | Social analytics |

**Program-Specific ROI:**

| Program | Value Tracked | Cost Tracked |
|---------|--------------|-------------|
| Ambassador | Content, events, referrals, support | Staff time, rewards, events |
| Mentorship | Retention, satisfaction, skill development | Staff time, tooling |
| Events | Attendance, activation, content produced | Platform, production, staff |
| Education | Completion, retention, skill assessment | Content production, facilitation |

### ROI Reporting Cadence

| Report | Frequency | Audience | Format |
|--------|-----------|----------|--------|
| Program ROI summary | Quarterly | Community team | Dashboard |
| Community total ROI | Quarterly | Executive team | Executive summary |
| Annual ROI deep dive | Annually | All stakeholders | Comprehensive report |

### ROI Accountability

| ROI Result | Action Required |
|-----------|----------------|
| ROI > 5x | Document as success, propose scaling |
| ROI 2–5x | Healthy, optimize for improvement |
| ROI 1–2x | Marginal, identify bottlenecks |
| ROI < 1x | Restructure or sunset program |
| Unable to measure | Fix measurement first, then evaluate |

---

## 5. ESCALATION PROTOCOLS

### Escalation Triggers

| Trigger | Severity | Escalation Path |
|---------|----------|----------------|
| Health score drops below 50 | High | Community Lead → Executive Sponsor |
| NPS drops below 30 | High | Community Lead → Executive Sponsor |
| Major moderation incident | Critical | Community Manager → Lead → Legal (if needed) |
| Safety threat to members | Critical | Immediate → Community Lead → Legal → Law Enforcement |
| Platform outage >4 hours | High | Community Ops → Vendor → Backup plan activation |
| Key contributor departure (3+) | Medium | Community Manager → Lead, investigation |
| Budget overrun >20% | Medium | Community Lead → Finance |
| Program failure to launch | Medium | Program Manager → Community Lead |
| Negative press/viral moment | Critical | Community Lead → Comms/PR → Executive |

### Escalation Process

```
Level 1: Community Manager
├── Handles day-to-day issues independently
├── Escalates to Level 2 if unable to resolve in 24 hours
└── Documents all actions taken

Level 2: Community Lead/Director
├── Reviews escalated issues
├── Makes decisions on policy exceptions
├── Escalates to Level 3 if business impact is significant
└── Communicates decisions to affected parties

Level 3: Executive Sponsor
├── Reviews issues with business-wide impact
├── Authorizes exceptional actions (budget, policy changes)
├── Escalates to Level 4 if legal or safety is involved
└── Communicates to leadership team as needed

Level 4: Legal/External
├── Legal review for compliance, liability
├── Law enforcement for safety threats
├── PR/Communications for public incidents
└── External experts for specialized situations
```

### Escalation Documentation

Every escalation must be documented:
```
Escalation Record:
├── Date and time
├── Trigger event (what happened)
├── Severity level
├── Actions taken at each level
├── Resolution
├── Root cause analysis
├── Prevention measures
└── Follow-up required
```

---

## 6. ACCOUNTABILITY REVIEW CADENCE

### Monthly Accountability Review

| Item | Reviewed By | Output |
|------|-----------|--------|
| Health score trend | Community Lead | Action items |
| Engagement tracking completeness | Community Ops | Data quality report |
| Outstanding escalations | Community Lead | Status update |
| Program metric tracking | Program Managers | Program health update |
| Budget tracking | Community Lead | Variance report |

### Quarterly Accountability Review

| Item | Reviewed By | Output |
|------|-----------|--------|
| Full health score analysis | Team + stakeholders | Quarterly report |
| NPS results and actions | Community Lead | Satisfaction report |
| Program ROI | Program Managers | ROI dashboard |
| Escalation review | Community Lead | Escalation retrospective |
| Strategy alignment | Team + stakeholders | Strategy update |

### Annual Accountability Review

| Item | Reviewed By | Output |
|------|-----------|--------|
| Community state of the union | Full team + executives | Annual report |
| Annual ROI comprehensive | Community Lead + Finance | ROI presentation |
| Strategy review and next year plan | Team + stakeholders | Strategy document |
| Team performance | Community Lead | Performance reviews |
| Benchmark comparison | Community Lead | Industry comparison |

---

## 7. COMPLIANCE REQUIREMENTS

### Data and Privacy

- [ ] GDPR compliance verified (if serving EU members)
- [ ] Privacy policy current and accessible
- [ ] Data processing documentation maintained
- [ ] Member data deletion requests processed within SLA
- [ ] Third-party data sharing documented

### Community Safety

- [ ] Code of conduct current and visible
- [ ] Moderation team trained and active
- [ ] Crisis response plan documented and tested
- [ ] Member reporting mechanism functional
- [ ] Appeals process documented and accessible

### Financial

- [ ] Budget tracked monthly
- [ ] Vendor contracts current
- [ ] Expense approvals documented
- [ ] ROI reporting on schedule

---

## 8. ANTI-PATTERNS IN ACCOUNTABILITY

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Metrics without action | Tracking numbers but never acting on them | Action plan for every below-target metric |
| Selective reporting | Only sharing positive results | Full transparency in all reports |
| Accountability theater | Going through motions without real review | Genuine discussion, real consequences |
| No escalation | Issues fester because no one escalates | Clear triggers, empowered team |
| Annual-only review | Only checking in once a year | Monthly minimum cadence |
| Individual blame | Blaming people instead of fixing systems | Systemic analysis, blameless reviews |

---

**Accountability is the mechanism that ensures community work produces
results. Without accountability, even the best strategies and most passionate
teams will drift from their goals. This protocol ensures that community health
is monitored, satisfaction is measured, programs deliver ROI, and problems are
escalated before they become crises. Accountability is not punishment — it is
the discipline of continuous improvement.**
