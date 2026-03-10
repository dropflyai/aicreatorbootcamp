# Email Benchmark Tests — Competency Verification (Authoritative)

This document contains scenario-based tests to verify email marketing competency.
Every scenario must be answered with tactical precision, not generic best practices.

If the response does not include specific subject lines, timing logic, segmentation criteria,
and expected metrics, it has not passed the benchmark.

---

## HOW TO USE THESE BENCHMARKS

1. Present the scenario exactly as written
2. Evaluate the response against the scoring criteria provided
3. Score each response from 1 (inadequate) to 5 (exceptional)
4. Minimum passing score: 4 on every scenario
5. Score <4 on any scenario = competency gap requiring remediation
6. Document the score with specific evidence from the response

---

## SCENARIO 1: DELIVERABILITY CRISIS

**Situation:**
Deliverability has plummeted over the past 2 weeks. Inbox placement has dropped from 96% to 72%. Gmail is particularly bad (most emails going to Promotions or Spam). Spam complaints have risen from 0.05% to 0.28%. The email team made no intentional changes. The list has 150,000 subscribers. Sending frequency: 3 emails per week.

**Task:**
Walk through the complete diagnostic process. Identify likely causes. Propose a recovery plan.

**Evaluation Criteria:**
- [ ] Starts with diagnosis, not solutions (does not jump to "clean your list")
- [ ] Checks authentication first (SPF, DKIM, DMARC — did something break?)
- [ ] Checks Google Postmaster Tools for domain reputation change
- [ ] Checks IP reputation across major blacklist databases
- [ ] Investigates recent sending pattern changes (volume spikes, new segments, imported lists)
- [ ] Checks for compromised sending infrastructure (unauthorized sends)
- [ ] Investigates content changes (new templates, increased image ratio, spam trigger words)
- [ ] Proposes tiered recovery plan: immediate (reduce volume, suppress disengaged), short-term (clean list, re-authenticate), long-term (rebuild reputation)
- [ ] Addresses the 0.28% complaint rate specifically (dangerously close to Google's 0.3% threshold)
- [ ] Includes timeline for recovery (deliverability recovery takes weeks, not days)
- [ ] Defines monitoring metrics during recovery

**Score:** /5

---

## SCENARIO 2: WELCOME SERIES DESIGN

**Situation:**
A B2B SaaS product (project management tool, $49/month) needs a welcome series for new trial signups. Trial duration: 14 days. Current welcome email: a single "Thanks for signing up!" email with no strategic content. Trial-to-paid conversion rate: 8%. Industry average: 15%. 500 new trial signups per week.

**Task:**
Design a 7-email welcome series. Include subject lines, timing, content strategy, and segmentation logic.

**Evaluation Criteria:**
- [ ] Maps the 14-day trial journey with key activation milestones
- [ ] Designs 7 emails with specific timing (not evenly spaced — front-loaded for activation)
- [ ] Provides actual subject lines for each email (not placeholders)
- [ ] Each email has a single clear objective (not trying to do everything)
- [ ] Includes behavioral branching (different path for activated vs. non-activated users)
- [ ] Email 1 focuses on immediate value/first action (not feature dump)
- [ ] Includes social proof email (case studies, testimonials)
- [ ] Includes conversion-focused email near trial end (urgency, offer)
- [ ] Addresses the "what happens after trial expires" scenario
- [ ] Defines success metrics for the series (activation rate, trial-to-paid conversion, engagement by email)
- [ ] Includes segmentation logic (different messaging for different user types if identifiable at signup)
- [ ] Specifies what triggers entry, exit, and suppression from the series

**Score:** /5

---

## SCENARIO 3: IOS PRIVACY ADAPTATION

**Situation:**
Open rates dropped 30% overnight when Apple's Mail Privacy Protection (MPP) launched. The marketing team has been using open rates as their primary email success metric. Reports to the CMO are now unreliable. The team uses open-rate-based send-time optimization and engagement scoring. About 45% of the list uses Apple Mail.

**Task:**
Diagnose the impact and adapt the measurement strategy.

**Evaluation Criteria:**
- [ ] Explains why open rates are inflated (MPP pre-fetches all images, registering false opens)
- [ ] Quantifies the impact: 45% of list on Apple Mail means ~45% of opens are unreliable
- [ ] Does NOT recommend ignoring open rates entirely (still useful for relative comparison within non-Apple segments)
- [ ] Proposes replacement primary metrics (CTR, CTOR, conversion rate, revenue per email)
- [ ] Addresses send-time optimization: proposes click-based optimization or hybrid approach
- [ ] Addresses engagement scoring: proposes click-based and conversion-based scoring
- [ ] Redesigns the CMO dashboard with reliable metrics
- [ ] Addresses re-engagement identification (cannot rely on "not opened" to identify inactive)
- [ ] Proposes segment-level analysis (Apple vs. non-Apple for calibration)
- [ ] Includes a transition plan (how to shift the team's mental model from opens to clicks)
- [ ] Addresses subject line testing (how to test subject lines without reliable open data)

**Score:** /5

---

## SCENARIO 4: LIST HYGIENE EMERGENCY

**Situation:**
A company acquired another company and merged the email lists without proper hygiene. Combined list: 500,000 subscribers. The acquired list (200,000 subscribers) had not been mailed in 8 months. First send to the combined list resulted in: 12% bounce rate, 0.4% complaint rate, and the sending IP was listed on two major blacklists. Gmail delivery dropped to 40%.

**Task:**
Design the emergency recovery plan and long-term hygiene strategy.

**Evaluation Criteria:**
- [ ] Immediately stops all sends to the acquired list segment
- [ ] Addresses the blacklist listings as priority (submits removal requests, identifies root cause)
- [ ] Proposes IP warm-up schedule to rebuild reputation
- [ ] Designs a re-permission campaign for the acquired list (not just bulk sending again)
- [ ] Implements email verification service for the acquired list before any future sends
- [ ] Segments the acquired list by recency of engagement before the 8-month gap
- [ ] Creates a phased reintroduction plan (most recently engaged first, gradually expanding)
- [ ] Addresses the 12% bounce rate (must get below 2% before resuming normal sends)
- [ ] Addresses the 0.4% complaint rate (above Google's threshold — immediate action needed)
- [ ] Designs ongoing hygiene process to prevent recurrence (verification at import, engagement-based suppression, regular cleaning cadence)
- [ ] Includes timeline with milestones and go/no-go gates at each phase
- [ ] Estimates the cost of this mistake (lost revenue during pause, reputation damage, subscriber loss)

**Score:** /5

---

## SCENARIO 5: AUTOMATION ARCHITECTURE

**Situation:**
An e-commerce company ($5M annual revenue, 80,000 email subscribers) has zero email automations. Everything is manual batch-and-blast. The email team of 2 people sends 3 campaigns per week. They want to implement automation but are overwhelmed by the options.

**Task:**
Design the automation architecture. Prioritize what to build first, second, third. Provide expected revenue impact.

**Evaluation Criteria:**
- [ ] Prioritizes automations by revenue impact and implementation effort
- [ ] Recommends the first 3 automations to build (likely: welcome, abandoned cart, post-purchase)
- [ ] Provides the complete flow for each recommended automation (triggers, delays, branching, exit criteria)
- [ ] Includes expected revenue estimates based on industry benchmarks for e-commerce
- [ ] Designs the full automation roadmap (phases over 6-12 months)
- [ ] Addresses how automation will free the team from manual work (quantify time savings)
- [ ] Includes technology requirements (what the ESP must support)
- [ ] Addresses data requirements (what customer data is needed for each automation)
- [ ] Plans for testing and optimization of each automation post-launch
- [ ] Includes a measurement framework for automation performance
- [ ] Addresses the transition: how to shift from batch-and-blast culture to automation-first culture

**Score:** /5

---

## SCENARIO 6: RE-ENGAGEMENT CAMPAIGN

**Situation:**
40% of a 200,000-subscriber list is "disengaged" — they have not clicked any email in 90 days and have not opened any email in 60 days (accounting for MPP inflation). Sending to disengaged subscribers is hurting deliverability. The marketing team is reluctant to remove these subscribers because "they might come back."

**Task:**
Design a re-engagement strategy with sunset policy.

**Evaluation Criteria:**
- [ ] Addresses the deliverability impact of mailing disengaged subscribers (quantify the damage)
- [ ] Does NOT recommend simply deleting 40% of the list (phased approach)
- [ ] Designs a multi-step re-engagement sequence (3-5 emails with escalating urgency)
- [ ] Provides specific subject lines designed to re-engage (not generic "We miss you!")
- [ ] Includes re-engagement offers or incentives where appropriate
- [ ] Defines a clear sunset policy (after X emails with no engagement, move to sunset)
- [ ] Designs the sunset email (last chance, clear consequences)
- [ ] Specifies what happens to sunset subscribers (suppressed, not deleted — available for other channels)
- [ ] Addresses the "but they might come back" objection with data (quantify the likelihood and value)
- [ ] Includes measurement criteria (what counts as "re-engaged")
- [ ] Models the expected list size reduction and deliverability improvement
- [ ] Plans for preventing future disengagement (engagement scoring, frequency optimization)

**Score:** /5

---

## SCENARIO 7: SEGMENTATION STRATEGY

**Situation:**
A B2C subscription box company ($29/month) has 50,000 subscribers. Current segmentation: none. Every subscriber gets every email. Unsubscribe rate is 1.2% per send (3x industry average). Customer feedback: "You send too many irrelevant emails." The company has data on: purchase history, browsing behavior, subscription plan type, location, and engagement history.

**Task:**
Design a segmentation strategy using available data.

**Evaluation Criteria:**
- [ ] Identifies the root cause: no segmentation = irrelevant content = high unsubscribe rate
- [ ] Designs segmentation framework using available data dimensions
- [ ] Creates engagement-based segments (highly engaged, engaged, at risk, disengaged)
- [ ] Creates behavioral segments (browsing interests, purchase patterns)
- [ ] Creates lifecycle segments (new subscriber, active customer, at-risk, churned)
- [ ] Maps segment-specific content strategies (what each segment receives)
- [ ] Designs frequency rules per segment (engaged get more, disengaged get less)
- [ ] Includes preference center design (let subscribers self-segment)
- [ ] Estimates the impact on unsubscribe rate (target: reduce from 1.2% to <0.3%)
- [ ] Provides implementation sequence (cannot do everything at once)
- [ ] Addresses the content creation impact (more segments = more content variants)
- [ ] Includes measurement plan (unsubscribe rate by segment, engagement by segment, revenue by segment)

**Score:** /5

---

## SCENARIO 8: TRANSACTIONAL EMAIL OPTIMIZATION

**Situation:**
An e-commerce company sends 5 types of transactional emails: order confirmation, shipping notification, delivery confirmation, return confirmation, and password reset. These emails have 85% open rates and 45% click rates but are plain text with no branding and no marketing content. They represent 200,000 emails per month.

**Task:**
Design a transactional email optimization strategy that adds value without compromising deliverability.

**Evaluation Criteria:**
- [ ] Recognizes the opportunity: highest-engagement emails are currently unoptimized
- [ ] Maintains transactional email deliverability (these must stay in the inbox)
- [ ] Does NOT overload transactional emails with marketing (keeps primary purpose clear)
- [ ] Adds brand elements (logo, colors, typography) while maintaining fast load time
- [ ] Proposes specific enhancements for each email type (product recommendations in order confirmation, tracking in shipping, review request in delivery, etc.)
- [ ] Addresses the regulatory boundary (transactional emails have different rules than marketing)
- [ ] Includes cross-sell/upsell opportunities that are contextually relevant
- [ ] Designs a measurement plan (incremental revenue from transactional email optimization)
- [ ] Proposes A/B testing strategy for transactional enhancements
- [ ] Addresses the technical implementation (transactional emails often come from different systems)
- [ ] Maintains mobile optimization for all enhancements

**Score:** /5

---

## SCENARIO 9: EMAIL FREQUENCY OPTIMIZATION

**Situation:**
A media company sends a daily newsletter (Monday-Friday) plus 2-3 promotional emails per week. Total: 7-8 emails per week. Open rates: 12%. CTR: 0.8%. Unsubscribe rate: 0.4% per send. List size: 300,000. The editorial team insists daily sending is essential. The marketing team wants to increase promotional sends. Both teams are underperforming benchmarks.

**Task:**
Optimize the email frequency without internal warfare.

**Evaluation Criteria:**
- [ ] Analyzes engagement data by email type (newsletter vs. promotional performance)
- [ ] Identifies frequency fatigue signals (declining open rates, increasing unsubscribes)
- [ ] Does NOT recommend simply sending fewer emails (more nuanced)
- [ ] Proposes frequency segmentation (engaged subscribers get more, others get less)
- [ ] Designs a frequency testing plan (test 3/week vs. 5/week vs. 7/week on different segments)
- [ ] Addresses the internal conflict diplomatically (both teams have valid concerns)
- [ ] Proposes a preference center that lets subscribers choose frequency
- [ ] Includes a "digest" option (consolidate daily into weekly for low-engagement subscribers)
- [ ] Calculates the tradeoff: fewer sends x higher engagement vs. more sends x lower engagement
- [ ] Models the revenue impact of each frequency option
- [ ] Plans for monitoring during the frequency experiment
- [ ] Defines the decision criteria for the final frequency strategy

**Score:** /5

---

## SCENARIO 10: CROSS-CHANNEL EMAIL INTEGRATION

**Situation:**
A D2C brand uses email, SMS, push notifications, and social retargeting. Currently, all channels operate independently. Customers frequently complain about receiving the same promotion on email, SMS, and push within the same hour. No cross-channel coordination exists. Each channel team has its own calendar and goals.

**Task:**
Design the cross-channel coordination strategy with email as the backbone.

**Evaluation Criteria:**
- [ ] Maps the current cross-channel experience from the customer's perspective
- [ ] Identifies the coordination failures (same message, same time, all channels)
- [ ] Proposes a unified communication calendar across channels
- [ ] Designs channel selection logic (which channel for which message type)
- [ ] Implements frequency caps across all channels (total touchpoints per day/week)
- [ ] Proposes cascade logic (try email first, if no engagement, try SMS, etc.)
- [ ] Addresses channel preference data collection
- [ ] Designs suppression rules (if customer converts via email, suppress the SMS and push)
- [ ] Addresses the organizational challenge (separate teams with separate goals)
- [ ] Proposes a shared attribution model that does not incentivize channel cannibalization
- [ ] Includes measurement: total customer experience quality, not just per-channel metrics

**Score:** /5

---

## SCENARIO 11: B2B LEAD NURTURE SEQUENCE

**Situation:**
A B2B SaaS company (enterprise security product, $50K annual contract) generates 500 leads per month from content downloads. Current follow-up: immediate sales call, then nothing if they do not respond. Sales closes 2% of leads. Average sales cycle: 6 months. No email nurture exists.

**Task:**
Design a lead nurture email program that warms leads for sales.

**Evaluation Criteria:**
- [ ] Maps the 6-month sales cycle with lead stages (awareness, consideration, decision)
- [ ] Designs content strategy for each stage (educational, comparative, proof)
- [ ] Creates a specific email sequence with timing, subject lines, and content outlines
- [ ] Includes lead scoring integration (what behaviors trigger sales handoff)
- [ ] Addresses the content download context (what did they download? segment by topic)
- [ ] Designs branch logic based on engagement (engaged leads get different path than passive leads)
- [ ] Includes sales enablement (notifies sales of high-engagement moments)
- [ ] Addresses the long sales cycle (nurture must be valuable for 6 months without being repetitive)
- [ ] Includes re-engagement for leads that go cold mid-sequence
- [ ] Defines the handoff criteria from marketing to sales (specific lead score threshold and behaviors)
- [ ] Estimates conversion rate improvement (from 2% to target)
- [ ] Plans for feedback loop between sales and marketing (which nurtured leads close better?)

**Score:** /5

---

## SCENARIO 12: EMAIL PROGRAM AUDIT

**Situation:**
You are hired to audit a company's email program. They have 250,000 subscribers, send 10-12 emails per month, have a mix of campaigns and automations, and feel like "email is underperforming but we do not know why." The CMO wants a clear diagnosis and action plan within 2 weeks.

**Task:**
Design the email program audit methodology.

**Evaluation Criteria:**
- [ ] Defines audit scope: strategy, list health, deliverability, content, automation, metrics, compliance
- [ ] Provides a structured audit framework with specific data requests
- [ ] Includes quantitative analysis (benchmark comparison for all key metrics)
- [ ] Includes qualitative analysis (content review, competitive email analysis)
- [ ] Designs subscriber journey audit (sign up as a new subscriber and document the experience)
- [ ] Requests access to ESP dashboards for direct data analysis
- [ ] Plans deliverability audit (authentication, reputation, inbox placement testing)
- [ ] Plans list health analysis (growth, churn, engagement distribution, hygiene)
- [ ] Plans automation review (what exists, performance, gaps)
- [ ] Plans compliance review (consent, unsubscribe, privacy)
- [ ] Designs the deliverable structure (executive summary, detailed findings, prioritized recommendations)
- [ ] Prioritizes findings by revenue impact (what to fix first for maximum business improvement)

**Score:** /5

---

## SCENARIO 13: PERSONALIZATION AT SCALE

**Situation:**
An online retailer (100,000 email subscribers, 10,000 SKUs across 50 product categories) wants to move from generic promotional emails to personalized product recommendations. They have purchase history (average 3 purchases per customer), browse history (tracked on site), and basic demographic data. Current CTR on promotional emails: 1.5%.

**Task:**
Design the personalization strategy from current state to sophisticated product recommendations.

**Evaluation Criteria:**
- [ ] Assesses available data quality and completeness before designing
- [ ] Designs a phased approach (basic segmentation first, ML recommendations later)
- [ ] Phase 1: Category-based personalization using purchase history
- [ ] Phase 2: Behavioral personalization using browse history
- [ ] Phase 3: Predictive recommendations using collaborative filtering or similar
- [ ] Proposes dynamic content blocks for each personalization level
- [ ] Addresses the cold-start problem (new subscribers with no purchase/browse data)
- [ ] Includes A/B testing: personalized vs. generic at each phase
- [ ] Estimates CTR improvement at each phase (from 1.5% baseline)
- [ ] Addresses technology requirements (recommendation engine, ESP capabilities, data integration)
- [ ] Plans for fallback content (what shows if personalization engine fails)
- [ ] Includes privacy considerations (transparent about data use)

**Score:** /5

---

## SCENARIO 14: EMAIL MIGRATION

**Situation:**
A company is migrating from Mailchimp (current ESP) to a new ESP. They have 200,000 subscribers, 15 active automations, 50 email templates, 3 years of engagement history, 12 custom segments, and send ~500,000 emails per month. Migration must happen within 60 days. The company cannot afford significant deliverability disruption.

**Task:**
Design the ESP migration plan.

**Evaluation Criteria:**
- [ ] Creates a comprehensive migration inventory (lists, segments, templates, automations, integrations, data)
- [ ] Addresses IP warming strategy for the new ESP (cannot send full volume on day 1)
- [ ] Designs a phased migration plan (not big-bang cutover)
- [ ] Plans for parallel running during transition (both ESPs active)
- [ ] Addresses deliverability protection during migration
- [ ] Plans data migration with validation (subscriber data, engagement history, consent records)
- [ ] Addresses template recreation and testing in the new ESP
- [ ] Plans automation rebuilding with testing before activation
- [ ] Designs integration migration (CRM, e-commerce, analytics connections)
- [ ] Includes rollback plan if migration causes deliverability issues
- [ ] Defines success criteria for each migration phase
- [ ] Plans for team training on the new ESP

**Score:** /5

---

## SCENARIO 15: SEASONAL CAMPAIGN STRATEGY

**Situation:**
An e-commerce company (apparel, $10M revenue) generates 35% of annual revenue in Q4 (Black Friday through Christmas). Last year's Q4 email strategy: increase frequency from 3/week to daily starting November 1, blanket the entire list with every promotion. Results: 15% unsubscribe spike, deliverability dropped to 85% by December, and post-holiday engagement took 3 months to recover.

**Task:**
Design a Q4 email strategy that maximizes revenue without destroying list health.

**Evaluation Criteria:**
- [ ] Diagnoses last year's failure: frequency overload + no segmentation + full-list blasts
- [ ] Designs a pre-season warm-up strategy (September-October engagement building)
- [ ] Creates a segmentation plan for Q4 (different cadence for different engagement levels)
- [ ] Proposes a frequency strategy that increases gradually (not sudden jump to daily)
- [ ] Designs a content calendar with varied content (not promotion-only)
- [ ] Includes early access and VIP strategies for top segments
- [ ] Plans for Black Friday/Cyber Monday specifically (pre-tease, live, extension)
- [ ] Addresses deliverability protection during high-volume period
- [ ] Plans for post-holiday re-engagement and list recovery
- [ ] Includes gift-giver vs. self-buyer segmentation strategy
- [ ] Estimates revenue impact vs. last year
- [ ] Defines the "stop" criteria (when to reduce volume if metrics deteriorate)

**Score:** /5

---

## SCENARIO 16: COMPLIANCE OVERHAUL

**Situation:**
A company expanding into the EU discovers its email program is not GDPR compliant. They have 50,000 EU subscribers. Consent records do not exist — subscribers were added from various sources over 5 years (website forms, event signups, partner referrals, purchased lists). Some forms had pre-checked consent boxes. The company wants to "fix this" without losing all their EU subscribers.

**Task:**
Design the GDPR compliance remediation plan.

**Evaluation Criteria:**
- [ ] Accurately assesses the legal risk (pre-checked boxes = invalid consent under GDPR, purchased lists = no consent)
- [ ] Does NOT recommend continuing to email without consent (legal and reputational risk)
- [ ] Designs a re-consent campaign for subscribers without valid consent
- [ ] Distinguishes between subscribers who may have valid consent (certain form types) and those who definitely do not (purchased lists)
- [ ] Addresses the purchased list contacts directly (must be removed or re-consented)
- [ ] Designs a compelling re-consent email (not just "click here to stay subscribed")
- [ ] Includes multiple re-consent attempts with escalating messaging
- [ ] Defines the sunset date (after which non-consenting subscribers are suppressed)
- [ ] Addresses consent record keeping going forward (what to record, how to store)
- [ ] Updates all signup forms to be GDPR compliant (no pre-checked boxes, clear consent language)
- [ ] Plans for legitimate interest assessment as an alternative basis for some contacts
- [ ] Includes privacy notice update and cookie consent considerations
- [ ] Estimates the subscriber loss and plans for list rebuilding

**Score:** /5

---

## FINAL BENCHMARK VERDICT

```markdown
## Benchmark Results: [Name/Date]

| Scenario | Score | Key Gaps |
|----------|-------|----------|
| 1. Deliverability Crisis | /5 | |
| 2. Welcome Series Design | /5 | |
| 3. iOS Privacy Adaptation | /5 | |
| 4. List Hygiene Emergency | /5 | |
| 5. Automation Architecture | /5 | |
| 6. Re-Engagement Campaign | /5 | |
| 7. Segmentation Strategy | /5 | |
| 8. Transactional Email Optimization | /5 | |
| 9. Email Frequency Optimization | /5 | |
| 10. Cross-Channel Integration | /5 | |
| 11. B2B Lead Nurture Sequence | /5 | |
| 12. Email Program Audit | /5 | |
| 13. Personalization at Scale | /5 | |
| 14. Email Migration | /5 | |
| 15. Seasonal Campaign Strategy | /5 | |
| 16. Compliance Overhaul | /5 | |

**Average Score:** /5
**Passing Threshold:** 4.0
**Verdict:** PASS / REMEDIATION REQUIRED
**Top Competency Gaps:** [List]
**Remediation Plan:** [If applicable]
```

---

## BENCHMARK ADMINISTRATION RULES

- Scenarios must be presented without leading hints
- Responses must be evaluated against ALL criteria, not just a subset
- Partial credit is reflected in the 1-5 score (not pass/fail per criterion)
- Evaluator must document specific evidence for score justification
- Re-testing after remediation uses different scenarios of equivalent difficulty
- Benchmark results are recorded in the email competency log

---

## ENFORCEMENT RULE

These benchmarks test real email marketing competency, not theoretical knowledge.
Vague answers score 1. Tactical but incomplete answers score 2-3.
Only comprehensive, actionable, measurable responses score 4-5.
If it would not improve email performance in practice, it does not pass the benchmark.

---

## END OF BENCHMARK TESTS
