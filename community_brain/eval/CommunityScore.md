# Community Brain -- CommunityScore Evaluation Framework

Version: 1.0
Last Updated: 2026-02-03
Owner: Community Brain
Status: ACTIVE

---

## Purpose

This scoring framework provides rigorous, quantitative evaluation of all
community operations managed by the Community Brain. Community is a long-term
compounding asset -- not a marketing channel. The metrics in this framework
measure community HEALTH, not just community SIZE. A community of 50,000
members where 50 participate is not a community. It is a mailing list with
extra steps.

Every dimension is measured against industry benchmarks, community type
baselines, and internal historical trends. Vanity metrics (total member count
without context) are explicitly deprioritized. Engagement depth, retention,
and value generation are what matter.

---

## Scoring Scale

| Score | Label | Interpretation |
|-------|-------|----------------|
| 9.0 - 10.0 | Elite | Top 1% of comparable communities. Self-sustaining ecosystem. |
| 7.5 - 8.9 | Strong | Thriving community with compounding engagement. Clear business value. |
| 6.0 - 7.4 | Competent | Active community meeting health benchmarks. Growth trajectory. |
| 4.0 - 5.9 | Below Standard | Low engagement or declining health. Intervention required. |
| 2.0 - 3.9 | Critical | Ghost town or toxic environment. Structural overhaul needed. |
| 0.0 - 1.9 | Non-Functional | No meaningful community activity or community does not exist. |

---

## DIMENSION 1: Active Membership

Weight: 15%

### What We Measure

The ratio of active members to total members, measured through DAU/MAU
(Daily Active Users / Monthly Active Users) ratio, active membership trends,
and the quality of "active" behavior (not just logging in but actually
participating).

### Activity Level Definitions

| Level | Definition | Example Behaviors |
|-------|-----------|------------------|
| Power User | Visits daily, creates content, helps others | Posts, answers questions, mentors |
| Regular | Visits 3+ times per week, engages with content | Comments, reacts, shares |
| Casual | Visits 1-3 times per month, consumes content | Reads, browses, occasionally reacts |
| Lurker | Visits <1 time per month, minimal engagement | Views but does not interact |
| Dormant | No visit in 60+ days | Registered but absent |
| Churned | No visit in 180+ days | Effectively gone |

### Activity Benchmarks

| Metric | Poor | Average | Good | Excellent | Elite |
|--------|------|---------|------|-----------|-------|
| DAU/MAU ratio | <5% | 5-10% | 10-20% | 20-35% | >35% |
| Power Users (% of total) | <1% | 1-3% | 3-5% | 5-10% | >10% |
| Regulars (% of total) | <5% | 5-10% | 10-20% | 20-30% | >30% |
| Dormant (% of total) | >60% | 40-60% | 25-40% | 15-25% | <15% |
| Churned (% of total) | >40% | 25-40% | 15-25% | 8-15% | <8% |

### Trend Direction

Track the 90-day trend for each activity level:
- **Growing**: Active membership increasing >5% per month. Score bonus +0.5.
- **Stable**: Active membership within +/- 2%. No modifier.
- **Declining**: Active membership decreasing >3%. Score penalty -1.0.
- **Collapsing**: Active membership decreasing >8%. Score penalty -2.0. Emergency intervention.

### The 1% Problem Detection

If total membership is growing but active membership is flat or declining,
the community has a conversion problem. New members are not activating.

Detection formula: (Member growth rate) - (Active member growth rate) > 5%
for 3 consecutive months = 1% Problem Alert.

Response: Activation audit within 14 days. Review onboarding flow, first-day
experience, and value-to-participation gap.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | DAU/MAU >20%. Power users >5%. Dormant <15%. Growing trend. No 1% problem. |
| 7-8 | DAU/MAU 10-20%. Power users 3-5%. Dormant <25%. Stable or growing. |
| 5-6 | DAU/MAU 5-10%. Power users 1-3%. Dormant 25-40%. Stable. |
| 3-4 | DAU/MAU <5%. Power users <1%. Dormant >40%. Declining. |
| 1-2 | DAU/MAU <2%. Virtually no power users. Dormant >60%. Ghost town. |

---

## DIMENSION 2: Engagement Depth

Weight: 15%

### What We Measure

The quality and depth of member interactions, not just volume. A community
where 100 people post "nice!" is less healthy than one where 20 people have
substantive conversations. We measure posts per active member, response rates,
conversation thread depth, and the ratio of creators to consumers.

### Engagement Quality Tiers

| Tier | Behavior | Value |
|------|---------|-------|
| Create | Starts new threads, writes original content, shares expertise | 5x |
| Respond | Writes substantive replies, answers questions, provides feedback | 4x |
| Discuss | Participates in multi-turn conversation threads | 3x |
| React | Likes, upvotes, emoji reactions | 1x |
| Consume | Reads but does not interact | 0.5x |

### Engagement Benchmarks

| Metric | Poor | Average | Good | Excellent | Elite |
|--------|------|---------|------|-----------|-------|
| Posts per active member per month | <0.5 | 0.5-2 | 2-5 | 5-10 | >10 |
| Response rate (% of posts with replies) | <20% | 20-40% | 40-60% | 60-80% | >80% |
| Avg conversation depth (replies per thread) | <2 | 2-4 | 4-8 | 8-15 | >15 |
| Creator:Consumer ratio | <1:50 | 1:30-50 | 1:15-30 | 1:8-15 | <1:8 |
| UGC as % of total content | <10% | 10-25% | 25-45% | 45-65% | >65% |
| Questions answered within 4 hours | <25% | 25-50% | 50-75% | 75-90% | >90% |

### Engagement Health Indicators

Positive signals:
- Increasing thread depth over time (conversations are getting richer)
- Members referencing other members' previous posts (institutional memory)
- Members creating content without prompting (intrinsic motivation)
- Sub-communities forming organically around topics

Negative signals:
- Engagement only on staff-posted content (no organic activity)
- Declining thread depth (conversations getting shallower)
- Same 5-10 people responsible for >80% of content (concentration risk)
- Question posts with zero replies (community not helping each other)

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Response rate >60%. Creator ratio <1:15. UGC >45%. Deep threads. Organic sub-communities. |
| 7-8 | Response rate 40-60%. Creator ratio 1:15-30. UGC 25-45%. Healthy thread depth. |
| 5-6 | Response rate 20-40%. Creator ratio 1:30-50. UGC 10-25%. Moderate threads. |
| 3-4 | Response rate <20%. Creator ratio >1:50. UGC <10%. Shallow engagement. |
| 1-2 | Minimal responses. Almost no creators. Staff-dependent content. Dead threads. |

---

## DIMENSION 3: Member Satisfaction

Weight: 10%

### What We Measure

Quantitative and qualitative satisfaction of community members, measured
through NPS (Net Promoter Score), CSAT (Customer Satisfaction), and
qualitative feedback themes.

### Satisfaction Measurement Protocol

**NPS Survey (Quarterly)**
- Question: "How likely are you to recommend this community to a colleague?"
- Sample: Random selection of active members (minimum 100 or 10% of actives)
- Segmented by: membership tenure, activity level, member type

**CSAT Survey (Monthly)**
- Question: "How satisfied are you with your community experience this month?"
- Scale: 1-5
- Follow-up: Open text for feedback

**Qualitative Feedback Collection**
- Monitor community meta-discussions (posts about the community itself)
- Track DM/support feedback themes
- Conduct quarterly focus groups (5-8 members per group, 2 groups minimum)
- Exit surveys for churned members

### Satisfaction Benchmarks

| Metric | Poor | Average | Good | Excellent | Elite |
|--------|------|---------|------|-----------|-------|
| NPS | <0 | 0-25 | 25-50 | 50-70 | >70 |
| CSAT (1-5 scale) | <3.0 | 3.0-3.5 | 3.5-4.0 | 4.0-4.5 | >4.5 |
| Survey response rate | <5% | 5-15% | 15-25% | 25-40% | >40% |
| Negative feedback themes | Recurring, unaddressed | Recurring, partially addressed | Identified and being addressed | Rare, quickly resolved | Proactive prevention |

### Satisfaction-Engagement Correlation

Track the relationship between satisfaction scores and engagement behavior:
- Members with NPS 9-10 should show higher engagement than NPS 0-6
- If high-NPS members are not engaging more, satisfaction is not translating to behavior
- If engagement is high but NPS is low, members are "addicted but unhappy" (toxic dynamic)

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | NPS >50. CSAT >4.0. Feedback acted upon. Satisfaction-engagement correlation positive. |
| 7-8 | NPS 25-50. CSAT 3.5-4.0. Feedback collected and mostly addressed. |
| 5-6 | NPS 0-25. CSAT 3.0-3.5. Feedback collected but slow to address. |
| 3-4 | NPS <0. CSAT <3.0. Recurring complaints. Low survey response (apathy). |
| 1-2 | No satisfaction measurement. Visible discontent. Members publicly complaining. |

---

## DIMENSION 4: Growth Health

Weight: 15%

### What We Measure

The rate and quality of new member acquisition, with emphasis on organic
growth, referral rates, and invite conversion. Healthy growth is organic,
steady, and produces members who activate. Unhealthy growth is purchased,
spikey, and produces lurkers.

### Growth Rate Benchmarks

| Growth Category | Monthly Rate | Assessment |
|-----------------|-------------|------------|
| Hypergrowth | >20% | Viral moment. Verify quality and activation. |
| Strong | 8-20% | Healthy with strong value proposition. |
| Steady | 3-8% | Sustainable. Compounding over 12 months. |
| Stagnant | 0-3% | Discovery or value proposition problem. |
| Declining | Negative | Churn exceeding joins. Retention crisis. |

### Growth Quality Metrics

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Organic join rate (% of joins from organic sources) | <30% | 30-50% | 50-70% | >70% |
| Referral rate (% of joins from member referrals) | <5% | 5-15% | 15-25% | >25% |
| Invite conversion (invitees who actually join) | <10% | 10-25% | 25-40% | >40% |
| Day-1 activation (new members who engage on join day) | <20% | 20-40% | 40-60% | >60% |
| 7-day activation (new members active within first week) | <30% | 30-50% | 50-70% | >70% |

### Growth Source Tracking

Track where new members come from and their quality by source:

| Source | Typical Quality | Track |
|--------|---------------|-------|
| Organic search | High | Volume, activation rate |
| Member referral | Highest | Volume, referral per member, referred member activation |
| Social media | Medium | Volume by platform, activation rate |
| Content marketing | High | Volume by content piece, activation rate |
| Paid acquisition | Low-Medium | CPA, activation rate, LTV |
| Event/Webinar | High | Volume, activation rate |
| Partnership | Variable | Volume, activation rate, quality match |

Growth that comes from paid acquisition with low activation is growth theater.
Flag if paid acquisition exceeds 30% of joins with <30% activation rate.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Strong growth. >70% organic. Referral rate >15%. Day-1 activation >40%. 7-day activation >50%. |
| 7-8 | Steady-to-strong growth. >50% organic. Referral rate >10%. Good activation rates. |
| 5-6 | Steady growth. 30-50% organic. Some referrals. Activation rates average. |
| 3-4 | Stagnant growth. Heavy paid dependency. Low activation. Referrals rare. |
| 1-2 | Declining. Growth entirely paid or event-driven. Minimal activation. No referrals. |

---

## DIMENSION 5: Retention

Weight: 15%

### What We Measure

Member retention at 30, 60, and 90-day marks, cohort analysis, and churn
patterns. Retention is the most important long-term health metric. A community
that retains members compounds. A community that churns members is on a
treadmill -- running fast but going nowhere.

### Retention Benchmarks

| Metric | Poor | Average | Good | Excellent | Elite |
|--------|------|---------|------|-----------|-------|
| 30-day retention | <30% | 30-45% | 45-60% | 60-75% | >75% |
| 60-day retention | <20% | 20-35% | 35-50% | 50-65% | >65% |
| 90-day retention | <15% | 15-30% | 30-45% | 45-60% | >60% |
| 12-month retention | <10% | 10-20% | 20-35% | 35-50% | >50% |

### Cohort Analysis Protocol

Track retention by monthly cohort:
1. Define "retained" = at least 1 meaningful action in the period (not just login)
2. Plot retention curves for each monthly cohort
3. Compare cohort curves: are newer cohorts retaining better or worse?
4. Identify the "activation cliff" -- the day range where most churn happens
5. Focus retention efforts on the cliff period

### Churn Analysis

For churned members, analyze:
- Tenure at churn: when do most members leave?
- Last activity before churn: what were they doing right before disengaging?
- Churn predictors: what behaviors predict churn 30 days before it happens?
- Recoverable vs permanent churn: can they be reactivated?
- Exit survey data: why do they say they left?

### Retention Drivers (Track Correlation)

| Driver | Hypothesis | Measure |
|--------|-----------|---------|
| Onboarding completion | Members who complete onboarding retain at higher rates | Onboarding completion rate vs retention |
| First connection | Members who connect with another member in first 7 days retain better | Connection rate vs retention |
| First contribution | Members who post or reply in first 14 days retain better | Contribution rate vs retention |
| Event attendance | Members who attend an event retain better | Event attendance vs retention |
| Mentorship | Members in mentorship pairs retain better | Mentorship participation vs retention |

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | 30-day >60%. 90-day >45%. Cohort curves improving. Churn predictors identified and addressed. |
| 7-8 | 30-day 45-60%. 90-day 30-45%. Cohort analysis active. Retention efforts showing results. |
| 5-6 | 30-day 30-45%. 90-day 15-30%. Basic retention tracking. Some intervention in place. |
| 3-4 | 30-day <30%. 90-day <15%. No cohort analysis. High churn with no mitigation. |
| 1-2 | Retention not tracked. Membership is revolving door. No understanding of why members leave. |

---

## DIMENSION 6: Value Generation

Weight: 15%

### What We Measure

The tangible business value the community generates, measured through support
deflection, pipeline influence, content creation, product feedback, and
customer retention impact. A community that does not generate measurable value
is a cost center, not an asset.

### Value Categories and Metrics

**Support Deflection**

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Peer-to-peer answers (% of questions resolved by members) | <10% | 10-25% | 25-50% | >50% |
| Support ticket reduction (attributed to community) | <5% | 5-15% | 15-30% | >30% |
| Self-service rate (members finding answers in community archives) | <20% | 20-40% | 40-60% | >60% |
| Cost per resolution (community vs support team) | Same or higher | 10-30% lower | 30-60% lower | >60% lower |

**Pipeline Influence**

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Community members who become customers | <2% | 2-5% | 5-15% | >15% |
| Deals influenced by community activity | <5% | 5-15% | 15-30% | >30% |
| Community-sourced referrals per quarter | <5 | 5-15 | 15-30 | >30 |
| Referred deal close rate vs average | Below average | At average | 10-25% above | >25% above |

**Content Generation**

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Member-created posts per month | <10 | 10-50 | 50-200 | >200 |
| Content quality (usable for marketing/docs) | <5% | 5-15% | 15-30% | >30% |
| Product feedback items per month | <5 | 5-20 | 20-50 | >50 |
| Product feedback implemented per quarter | <1 | 1-3 | 3-8 | >8 |

**Customer Retention Impact**

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Community member churn vs non-member churn | Same or higher | 5-15% lower | 15-30% lower | >30% lower |
| NPS of community members vs non-members | Same | 5-10 points higher | 10-20 points higher | >20 points higher |
| Expansion revenue from community members vs others | Same | 10-20% higher | 20-40% higher | >40% higher |

### Value Calculation Model

Quarterly, calculate total community value:
```
Community_Value = (
    (Support tickets deflected * avg ticket cost) +
    (Pipeline influenced * deal value * close rate attribution %) +
    (Content pieces created * equivalent creation cost) +
    (Retention improvement * revenue retained attribution %) +
    (Referrals * referred customer LTV * attribution %)
)
```

Compare Community_Value to Community_Cost (staff, tools, events) for ROI.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Community ROI >5x cost. Support deflection >25%. Pipeline influence >15%. Customer retention measurably higher. |
| 7-8 | Community ROI 3-5x. Multiple value streams active. Attribution tracked. |
| 5-6 | Community ROI 1-3x. Some value streams active. Attribution partially tracked. |
| 3-4 | Community ROI <1x. Value streams underperforming. No attribution system. |
| 1-2 | No measurable value. Community is pure cost center. |

---

## DIMENSION 7: Moderation Quality

Weight: 5%

### What We Measure

The effectiveness of community moderation in maintaining a safe, constructive
environment while avoiding over-moderation that stifles authentic discussion.

### Moderation Metrics

| Metric | Poor | Average | Good | Excellent | Elite |
|--------|------|---------|------|-----------|-------|
| Toxicity incident rate (per 1000 active members/month) | >20 | 10-20 | 5-10 | 2-5 | <2 |
| Response time to reported content | >24hr | 12-24hr | 4-12hr | 1-4hr | <1hr |
| False positive rate (content removed incorrectly) | >15% | 8-15% | 3-8% | 1-3% | <1% |
| Appeal resolution time | >72hr | 48-72hr | 24-48hr | 12-24hr | <12hr |
| Member perception of safety (survey) | <50% feel safe | 50-65% | 65-80% | 80-90% | >90% |

### Moderation Policy Requirements

- [ ] Community guidelines published and accessible to all members
- [ ] Guidelines written in clear, specific language (not vague platitudes)
- [ ] Enforcement is consistent (same behavior = same consequence regardless of member status)
- [ ] Escalation path clear: warning, temporary mute, temporary ban, permanent ban
- [ ] Appeal process exists and is accessible
- [ ] Moderation actions are logged with timestamps and rationale
- [ ] Moderator training completed annually
- [ ] Moderator burnout monitored (rotating shifts, workload caps)

### The "Valuable but Toxic" Member Protocol

When a technically valuable member (top contributor, expert) exhibits toxic behavior:
1. Document specific incidents (not general impressions)
2. Private conversation first (assume good intent, set expectations)
3. Clear warning with specific behavior change required
4. Monitoring period (30 days)
5. If behavior continues: escalation regardless of contribution level
6. No member is above community standards. Allowing toxicity from top contributors poisons the entire community.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | <5 incidents per 1K members. <1hr response. <3% false positive. >80% feel safe. Guidelines enforced consistently. |
| 7-8 | 5-10 incidents. <4hr response. <8% false positive. 65-80% feel safe. |
| 5-6 | 10-20 incidents. <12hr response. <15% false positive. 50-65% feel safe. |
| 3-4 | >20 incidents. >12hr response. Inconsistent enforcement. Members expressing safety concerns. |
| 1-2 | Unmoderated or heavily toxic. No guidelines. Members leaving due to environment. |

---

## DIMENSION 8: Program Effectiveness

Weight: 10%

### What We Measure

The performance of structured community programs including ambassador/champion
programs, events, mentorship, and other organized initiatives.

### Ambassador/Champion Program

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Ambassador activity rate (active/total ambassadors) | <40% | 40-60% | 60-80% | >80% |
| Content created by ambassadors per month | <2 per ambassador | 2-4 | 4-8 | >8 |
| Ambassador-driven member activations | <1 per ambassador/month | 1-3 | 3-5 | >5 |
| Ambassador retention (12-month) | <50% | 50-70% | 70-85% | >85% |
| Ambassador NPS | <30 | 30-50 | 50-70 | >70 |

### Events Program

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Event attendance rate (registered vs attended) | <30% | 30-50% | 50-70% | >70% |
| Event NPS | <20 | 20-40 | 40-60 | >60 |
| Post-event engagement lift (7-day engagement vs baseline) | <5% | 5-15% | 15-30% | >30% |
| Events per month | <1 | 1-2 | 2-4 | >4 |
| Member-initiated events | 0 | 1-2/quarter | 1-2/month | >2/month |

### Mentorship Program

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Mentor:mentee match rate | <50% | 50-70% | 70-85% | >85% |
| Program completion rate | <30% | 30-50% | 50-70% | >70% |
| Mentee satisfaction | <3.0 | 3.0-3.5 | 3.5-4.0 | >4.0 |
| Mentee retention lift vs non-participants | <10% | 10-20% | 20-35% | >35% |
| Mentees who become mentors | <5% | 5-15% | 15-25% | >25% |

### Program ROI

Each program must have a documented ROI calculation reviewed quarterly:
- Program cost (staff time, tools, incentives, swag)
- Program value (engagement lift, retention impact, content created, support deflected)
- ROI = value / cost

Programs with ROI <1x for two consecutive quarters must be restructured or sunset.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | All programs above "Good" benchmarks. Ambassador activity >60%. Event attendance >50%. Mentorship completion >50%. Programs ROI >3x. |
| 7-8 | Most programs at "Good." Consistent execution. Positive member feedback. |
| 5-6 | Programs at "Average." Some execution gaps. Programs running but underperforming potential. |
| 3-4 | Programs below average. Low participation. Inconsistent execution. ROI unclear. |
| 1-2 | No structured programs. Or programs exist but are effectively abandoned. |

---

## Composite Score Calculation

```
COMMUNITY_SCORE = (
    Active_Membership      * 0.15 +
    Engagement_Depth       * 0.15 +
    Member_Satisfaction    * 0.10 +
    Growth_Health          * 0.15 +
    Retention              * 0.15 +
    Value_Generation       * 0.15 +
    Moderation_Quality     * 0.05 +
    Program_Effectiveness  * 0.10
)
```

### Score Interpretation

| Composite | Assessment | Action |
|-----------|-----------|--------|
| 8.5+ | Elite community operation | Scale. Replicate model for new communities. |
| 7.0-8.4 | Thriving community | Optimize weakest dimension. Invest in growth. |
| 5.5-6.9 | Competent community | Targeted improvements in 2-3 dimensions. |
| 4.0-5.4 | Underperforming | Comprehensive community health audit within 30 days. |
| <4.0 | Failing | Consider community reboot. External audit recommended. |

---

## Reporting Cadence

| Report | Frequency | Audience | Focus |
|--------|-----------|----------|-------|
| Community Pulse | Weekly | Community team | Activity trends, sentiment, incident log |
| Monthly Scorecard | Monthly | Marketing/Product leadership | Full composite, value metrics, growth |
| Quarterly Review | Quarterly | Executive team | ROI analysis, strategic assessment, budget |
| Annual State of Community | Annually | C-suite + board | Year-over-year, benchmarking, roadmap |

---

## Failure Modes and Automatic Overrides

| Condition | Override |
|-----------|---------|
| Toxicity incident rate >20 per 1K members | Moderation Quality capped at 2.0 |
| No satisfaction measurement in last 6 months | Member Satisfaction scored 0.0 |
| Retention not tracked by cohort | Retention capped at 4.0 |
| No value attribution system | Value Generation capped at 4.0 |
| Ambassador program <40% active | Program Effectiveness capped at 4.0 |
| DAU/MAU <2% for 3 consecutive months | Trigger community reboot evaluation |
| 30-day retention <20% for 3 consecutive cohorts | Trigger onboarding overhaul |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial framework. 8 dimensions established. |
