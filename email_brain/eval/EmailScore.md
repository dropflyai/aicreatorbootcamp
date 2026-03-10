# Email Score — Quality Enforcement (Authoritative)

This document defines how email marketing quality is evaluated.
Every email campaign, automation, or strategy must be scored before it is considered complete.

If email quality is not measurable, it is not enforced.

---

## SCORING RULES (MANDATORY)

Each email deliverable must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate remediation required:
- **Deliverability**
- **Compliance**
- **List Health**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- Revenue Attribution is NOT a hard fail — evaluated as a maturity trajectory

### Maturity Trajectory Note
Revenue Attribution is evaluated as a maturity trajectory. Early-stage email programs may not have sophisticated attribution. What matters is that attribution methodology is improving and that email's business impact is increasingly quantifiable over time.

---

## 1. DELIVERABILITY

**Question:**
Are emails reaching the inbox, not the spam folder or void?

### What to Measure
- **Inbox Placement Rate:** Percentage of sent emails that land in the primary inbox (target: >95%)
- **Sender Reputation:** IP and domain reputation scores across major ESPs
- **Authentication:** SPF, DKIM, and DMARC properly configured and passing
- **Bounce Rate:** Hard bounces <0.5%, soft bounces <2%
- **Blacklist Status:** IP and domain not listed on any major blacklist
- **Complaint Rate:** Spam complaints <0.1% (Google threshold: 0.3%)
- **Throttling:** No evidence of ESP throttling or rate limiting

### Scoring Guide
- **5** — Inbox placement >98%. Sender reputation excellent across all major ESPs. SPF, DKIM, DMARC all passing with strict policies. Bounce rate <0.3%. No blacklist appearances. Complaint rate <0.05%. No throttling.
- **4** — Inbox placement 95-98%. Sender reputation good. Authentication complete and passing. Bounce rate 0.3-0.5%. Clean blacklist record. Complaint rate <0.1%. Minimal throttling.
- **3** — Inbox placement 90-95%. Sender reputation adequate. Authentication mostly configured. Bounce rate 0.5-1%. Occasional blacklist issues resolved quickly. Complaint rate 0.1-0.2%. Some throttling observed.
- **2** — Inbox placement 80-90%. Sender reputation declining. Authentication gaps. Bounce rate 1-3%. Active blacklist listings. Complaint rate 0.2-0.3%. Frequent throttling.
- **1** — Inbox placement <80%. Sender reputation poor. Authentication missing or failing. Bounce rate >3%. Multiple blacklist listings. Complaint rate >0.3%. Persistent throttling or blocking.

### Evidence Required
- Inbox placement test results (Litmus, GlockApps, or equivalent)
- Sender reputation reports from Google Postmaster Tools and Microsoft SNDS
- Authentication check results (SPF, DKIM, DMARC)
- Bounce rate trending data (minimum 90 days)
- Blacklist monitoring report
- Complaint rate trending data
- ESP delivery reports with throttling indicators

### Diagnostic Checklist (if score <4)
- [ ] Run inbox placement test across Gmail, Outlook, Yahoo, Apple Mail
- [ ] Check Google Postmaster Tools for domain reputation
- [ ] Verify SPF record includes all sending sources
- [ ] Verify DKIM signing is active for all sending domains
- [ ] Verify DMARC policy is set and receiving reports
- [ ] Review bounce processing (are hard bounces suppressed immediately?)
- [ ] Check all IPs and domains against major blacklists
- [ ] Review sending patterns for spikes that trigger throttling

Score <3 → Stop all non-critical sends. Diagnose and fix deliverability issues before resuming volume.

---

## 2. ENGAGEMENT

**Question:**
Are recipients opening, reading, and acting on the emails?

### What to Measure
- **Open Rate:** Percentage of delivered emails opened (benchmark varies by industry; track relative to your own baseline and trend)
- **Click-Through Rate (CTR):** Percentage of delivered emails with at least one click
- **Click-to-Open Rate (CTOR):** Clicks / opens — measures content effectiveness
- **Read Rate:** Percentage who read for >8 seconds vs. skim vs. glance (if available from ESP)
- **Unsubscribe Rate:** Per-email unsubscribe rate (target: <0.5%)
- **Reply Rate:** For emails designed to generate replies (sales, relationship)
- **Engagement Over Time:** Trend of engagement metrics (improving, stable, declining)

### Important Note on Open Rates
Post-iOS 15 (Mail Privacy Protection), open rates are inflated and unreliable as an absolute metric. Use open rates only for:
- Relative comparison (A vs. B, this month vs. last month)
- Send-time optimization signals
- Subject line testing (relative performance, not absolute)

Do NOT use open rates as a primary success metric. Weight CTR and CTOR higher.

### Scoring Guide
- **5** — CTR >5%. CTOR >15%. Engagement trending up. Unsubscribe rate <0.1%. Strong reply rates on relationship emails. Consistent quarter-over-quarter improvement.
- **4** — CTR 3-5%. CTOR 10-15%. Engagement stable or improving. Unsubscribe rate <0.3%. Good reply rates. Steady performance.
- **3** — CTR 1-3%. CTOR 5-10%. Engagement flat. Unsubscribe rate 0.3-0.5%. Reply rates below target. No clear trend.
- **2** — CTR 0.5-1%. CTOR 2-5%. Engagement declining. Unsubscribe rate 0.5-1%. Low reply rates. Negative trend.
- **1** — CTR <0.5%. CTOR <2%. Engagement in freefall. Unsubscribe rate >1%. No replies. Steep decline.

### Evidence Required
- Engagement metrics dashboard with 90-day trend data
- CTR and CTOR by email type (promotional, transactional, lifecycle, nurture)
- Engagement segmentation (highly engaged, engaged, at risk, disengaged)
- A/B test results showing engagement optimization efforts
- Unsubscribe analysis (which emails cause the most unsubscribes?)

Score <4 → Audit email content, frequency, and segmentation. Implement A/B testing program. Review send-time optimization.

---

## 3. REVENUE ATTRIBUTION

**Question:**
Can we quantify the business value that email generates?

### What to Measure
- **Email-Attributed Revenue:** Revenue directly attributed to email clicks (last-click and multi-touch)
- **Revenue Per Email (RPE):** Total email revenue / total emails sent
- **Revenue Per Subscriber:** Total email revenue / active subscriber count
- **Conversion Rate:** Percentage of email clicks that result in desired action (purchase, signup, upgrade)
- **Email Channel Contribution:** Email revenue as percentage of total revenue
- **Customer Lifetime Value Impact:** Do email-engaged customers have higher LTV?

### Attribution Model Considerations
- Last-click attribution undervalues email (email often assists but is not the last click)
- Multi-touch attribution gives a more accurate picture but is harder to implement
- View-through attribution is unreliable post-iOS 15
- Document which model is used and be consistent

### Scoring Guide
- **5** — Multi-touch attribution model in place. Email revenue clearly quantified. RPE trending up. Email contributes >20% of total revenue. Email-engaged customers have measurably higher LTV. Revenue attribution reviewed monthly.
- **4** — Attribution model exists (even if last-click). Email revenue is tracked. RPE is stable or improving. Email contributes 10-20% of total revenue. LTV impact is estimated. Revenue reviewed quarterly.
- **3** — Basic attribution exists. Email revenue is estimated but not precise. RPE is known but not optimized. Email contributes 5-10% of total revenue. LTV impact not measured.
- **2** — Minimal attribution. Email revenue is guessed. RPE not tracked. Email contribution unknown. No LTV analysis.
- **1** — No attribution. No revenue tracking for email. Email impact on business is unknown.

### Evidence Required
- Attribution model documentation
- Email revenue reports with attribution methodology noted
- RPE trending data (minimum 6 months)
- Conversion rate by email type and segment
- Email channel contribution to total revenue
- LTV comparison: email-engaged vs. non-email-engaged customers

Score <4 → Implement basic attribution tracking. Start with last-click, plan for multi-touch. Calculate RPE baseline.

---

## 4. LIST HEALTH

**Question:**
Is the email list a growing, engaged, high-quality asset?

### What to Measure
- **Growth Rate:** Net list growth (new subscribers - unsubscribes - bounces) per month
- **Churn Rate:** Percentage of list lost per month (unsubscribes + bounces + complaints)
- **Engagement Segments:** Percentage of list in each engagement tier (active, at-risk, dormant, dead)
- **Hygiene Cadence:** Regular list cleaning frequency and methodology
- **Data Quality:** Percentage of records with complete, accurate data
- **Acquisition Quality:** Engagement rates of recently acquired subscribers vs. list average
- **Suppression Management:** Proper handling of unsubscribes, bounces, complaints, and role addresses

### Scoring Guide
- **5** — Net growth rate >5%/month. Churn <1%/month. >70% of list actively engaged. Hygiene runs monthly. Data quality >95%. New subscribers outperform list average on engagement. Suppression lists are comprehensive and current.
- **4** — Net growth rate 2-5%/month. Churn 1-2%/month. 50-70% actively engaged. Hygiene runs quarterly. Data quality >85%. New subscriber quality is adequate. Suppression management is solid.
- **3** — Net growth rate 0-2%/month. Churn 2-3%/month. 30-50% actively engaged. Hygiene runs semi-annually. Data quality 70-85%. New subscriber quality is mixed. Suppression has some gaps.
- **2** — List is shrinking. Churn >3%/month. <30% actively engaged. Hygiene runs annually or less. Data quality <70%. New subscribers disengage quickly. Suppression management is incomplete.
- **1** — List is rapidly shrinking. Massive churn. <10% engaged. No hygiene process. Data quality poor. Acquiring low-quality subscribers. Suppression lists not maintained.

### Evidence Required
- List growth and churn trending data (minimum 6 months)
- Engagement segmentation report with definitions
- Hygiene schedule and execution log
- Data quality audit results
- Acquisition source quality comparison
- Suppression list management documentation

### List Health Warning Signs
- Engagement rate declining while list size grows = acquiring low-quality subscribers
- High growth rate + high churn rate = leaky bucket (fixing acquisition will not help)
- Large dormant segment growing = content relevance problem
- Spike in complaints = consent or frequency problem

Score <3 → Implement immediate list hygiene. Segment and suppress dormant subscribers. Audit all acquisition sources for quality.

---

## 5. PERSONALIZATION DEPTH

**Question:**
Are emails personalized beyond "Hi {first_name}"?

### What to Measure
- **Segmentation Sophistication:** Number and quality of segments (demographic, behavioral, lifecycle, predictive)
- **Dynamic Content:** Percentage of emails using dynamic content blocks
- **Behavioral Triggers:** Number of behavioral triggers active (browse abandonment, purchase, milestone, inactivity, etc.)
- **Predictive Personalization:** Use of predicted preferences, send-time, content recommendations
- **1:1 Personalization:** Individual-level content customization based on behavior and preferences
- **Personalization Impact:** Lift in engagement/revenue from personalized vs. generic emails

### Scoring Guide
- **5** — Sophisticated multi-dimensional segmentation. Dynamic content in >80% of emails. 10+ behavioral triggers active. Predictive models for content and timing. 1:1 personalization for key lifecycle stages. Personalization lift is measured and significant (>30%).
- **4** — Good segmentation with behavioral dimensions. Dynamic content in 50-80% of emails. 5-10 behavioral triggers. Send-time optimization active. Personalization lift is measured (>15%).
- **3** — Basic segmentation (demographic + engagement level). Dynamic content in 25-50% of emails. 3-5 behavioral triggers. Some optimization. Personalization lift not measured.
- **2** — Minimal segmentation (one or two dimensions). Dynamic content is rare. 1-2 behavioral triggers. No optimization. Personalization is superficial ({first_name} only).
- **1** — No segmentation. No dynamic content. No behavioral triggers. Every subscriber gets the same email.

### Evidence Required
- Segmentation map with criteria and population sizes
- Dynamic content usage report
- Behavioral trigger inventory with performance data
- Personalization technology capabilities documentation
- A/B test results: personalized vs. generic performance
- Personalization roadmap

Score <4 → Audit current segmentation. Implement at least 3 behavioral triggers. Add dynamic content to top-performing emails.

---

## 6. COMPLIANCE

**Question:**
Does every email comply with applicable regulations and respect subscriber consent?

### What to Measure
- **CAN-SPAM Compliance:** Physical address, unsubscribe mechanism, honest subject lines, proper identification
- **GDPR Compliance:** Consent records, right to erasure, data processing documentation, privacy notice
- **CASL Compliance:** Express consent obtained, consent records maintained, business relationship tracking
- **Consent Records:** Documented proof of consent for every subscriber
- **Unsubscribe Functionality:** Works within 10 business days (CAN-SPAM) or immediately (best practice)
- **Preference Center:** Subscribers can manage frequency and content preferences
- **Data Handling:** Subscriber data is stored securely and processed per privacy policy

### Scoring Guide
- **5** — Full compliance with CAN-SPAM, GDPR, CASL, and all applicable regulations. Consent records complete for 100% of subscribers. Unsubscribe processes immediately. Preference center is robust. Regular compliance audits. Data handling exceeds minimum requirements. Double opt-in implemented.
- **4** — Compliant with all applicable regulations. Consent records exist for >95% of subscribers. Unsubscribe processes within 24 hours. Preference center exists. Compliance reviewed quarterly. Data handling meets requirements.
- **3** — Mostly compliant. Minor gaps in consent documentation. Unsubscribe processes within CAN-SPAM timeline. Basic preference center. Compliance reviewed annually. Data handling adequate.
- **2** — Compliance gaps exist. Consent records incomplete. Unsubscribe process unreliable. No preference center. Compliance not regularly reviewed. Data handling concerns.
- **1** — Non-compliant. No consent records. Unsubscribe broken or absent. No preference center. No compliance review. Data handling violations.

### Evidence Required
- Compliance audit report for all applicable regulations
- Consent record system documentation with sample records
- Unsubscribe process testing results (time to suppression)
- Preference center screenshots and functionality documentation
- Data handling and security documentation
- Compliance training records for email team

### Compliance Non-Negotiables (These are NEVER acceptable)
- Sending to purchased lists
- Hiding the unsubscribe link
- Pre-checked consent boxes (GDPR violation)
- Sending after unsubscribe request
- Misleading subject lines
- Missing physical address (CAN-SPAM requirement)
- Collecting data without privacy notice

Score <3 → STOP ALL SENDS. Fix compliance issues immediately. This is a legal and reputational risk, not just a quality issue.

---

## 7. TESTING RIGOR

**Question:**
Is every email optimized through systematic testing, not gut feeling?

### What to Measure
- **A/B Test Frequency:** Percentage of campaigns with A/B tests running
- **Statistical Significance:** Are test results reaching significance before declaring winners?
- **Test Variables:** Range of elements tested (subject line, content, CTA, timing, sender name, design, personalization)
- **Learning Velocity:** How quickly are test learnings applied to future campaigns?
- **Test Documentation:** Are test hypotheses, results, and learnings documented?
- **Multivariate Testing:** Testing multiple variables simultaneously (advanced)

### Scoring Guide
- **5** — >80% of campaigns have A/B tests. Statistical significance is required before declaring winners. All major elements are regularly tested. Learnings are applied within 1 send cycle. Test log is comprehensive. Multivariate tests are run for critical campaigns.
- **4** — 50-80% of campaigns have A/B tests. Statistical significance is checked. Major elements are tested regularly. Learnings applied within 2-3 send cycles. Test log exists and is maintained.
- **3** — 25-50% of campaigns have A/B tests. Statistical significance is sometimes checked. Testing focused on subject lines only. Learnings applied sporadically. Test log is incomplete.
- **2** — <25% of campaigns have A/B tests. Statistical significance not considered. Testing is rare and unsystematic. Learnings not documented. No test log.
- **1** — No A/B testing. All decisions based on gut feeling. No testing infrastructure or culture.

### Evidence Required
- A/B test log with hypotheses, results, and significance levels
- Test coverage report (percentage of campaigns tested)
- Variable coverage analysis (which elements have been tested)
- Learning application tracking (how learnings flow into future campaigns)
- Statistical methodology documentation

### Testing Anti-Patterns
- Declaring winners before reaching significance (impatient testing)
- Only testing subject lines (limited scope)
- Testing without hypotheses (random testing)
- Not documenting results (learning waste)
- Testing too many things at once without multivariate methodology (confounded results)

Score <4 → Implement A/B testing for all major campaigns. Document hypotheses and results. Require statistical significance.

---

## 8. AUTOMATION COVERAGE

**Question:**
Are the right emails sent to the right people at the right time without manual intervention?

### What to Measure
- **Lifecycle Stage Coverage:** Percentage of customer lifecycle stages with automated email sequences
- **Trigger Coverage:** Percentage of key behavioral triggers with automated responses
- **Welcome Series:** Exists and is optimized (not a single welcome email)
- **Re-engagement:** Automated win-back for disengaged subscribers
- **Transactional Enhancement:** Transactional emails (receipts, confirmations) are optimized for engagement
- **Automation Performance:** Automated emails outperform manual campaigns on engagement and revenue
- **Maintenance:** Automations are reviewed and updated regularly (not set-and-forget)

### Lifecycle Stages to Cover
1. **Pre-purchase:** Welcome, nurture, education
2. **Purchase/Conversion:** Confirmation, onboarding, activation
3. **Engagement:** Product tips, feature announcements, milestones
4. **Retention:** Usage nudges, renewal reminders, loyalty rewards
5. **Win-back:** Inactivity triggers, re-engagement, sunset
6. **Advocacy:** Referral prompts, review requests, community invitations

### Scoring Guide
- **5** — All 6 lifecycle stages have automated sequences. 10+ behavioral triggers active. Welcome series is multi-email and optimized. Re-engagement automation active with sunset flow. Transactional emails are engagement-optimized. Automated emails outperform manual by >20%. All automations reviewed quarterly.
- **4** — 4-5 lifecycle stages covered. 5-10 behavioral triggers. Welcome series exists with 3+ emails. Re-engagement automation active. Transactional emails are branded. Automated emails outperform manual. Automations reviewed semi-annually.
- **3** — 3 lifecycle stages covered. 3-5 behavioral triggers. Welcome series is 1-2 emails. Re-engagement is manual. Transactional emails are basic. Automation performance not compared to manual. Automations rarely reviewed.
- **2** — 1-2 lifecycle stages covered. 1-2 behavioral triggers. Single welcome email. No re-engagement automation. Transactional emails are default templates. No performance comparison. Automations set and forgotten.
- **1** — No automation. Everything is manual. No triggers. No welcome series. No re-engagement. Default transactional templates. Nothing automated.

### Evidence Required
- Lifecycle automation map showing all active sequences
- Behavioral trigger inventory with performance data
- Welcome series documentation with performance metrics
- Re-engagement and sunset flow documentation
- Automation performance vs. manual campaign comparison
- Automation review schedule and update log

Score <4 → Map all lifecycle stages. Implement welcome series (minimum 5 emails). Add behavioral triggers for top 3 events.

---

## FINAL EMAIL SCORE DECISION

**Hard Fail Dimensions (Deliverability, Compliance, List Health):**
- Score <3 → **IMMEDIATE REMEDIATION REQUIRED**

**All Dimensions:**
- Average score >= 4.0 → **EMAIL PROGRAM MAY PROCEED**
- Average score < 4.0 → **IMPROVEMENT PLAN REQUIRED**

**Revenue Attribution:**
- NOT a hard fail
- Evaluated as maturity trajectory (improving attribution methodology matters more than current precision)
- Score <3 triggers strategic review, not automatic stop

Scores must be stated explicitly before any email deliverable is approved.

### Score Card Template

```markdown
## Email Score: [Campaign/Program Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Deliverability | /5 | |
| Engagement | /5 | |
| Revenue Attribution | /5 | |
| List Health | /5 | |
| Personalization Depth | /5 | |
| Compliance | /5 | |
| Testing Rigor | /5 | |
| Automation Coverage | /5 | |

**Average:** /5
**Verdict:** PASS / IMPROVEMENT PLAN REQUIRED
**Hard Fail Flags:** [if any]
**Top Priority Actions:** [if any]
```

---

## SCORING FREQUENCY

| Trigger | Requirement |
|---------|-------------|
| New email program launch | Full Email Score before first send |
| Monthly email review | Full Email Score for the program |
| Campaign post-mortem | Score Engagement + Revenue Attribution |
| Deliverability issue | Score Deliverability + List Health |
| New automation launch | Score Automation Coverage + Personalization |
| Compliance audit | Score Compliance + List Health |
| Quarterly strategic review | Full Email Score with trend analysis |

---

## ESCALATION PROTOCOL

| Condition | Action |
|-----------|--------|
| Deliverability <3 | Stop non-critical sends. Diagnose within 48 hours. |
| Compliance <3 | Stop ALL sends. Fix immediately. Legal/reputational risk. |
| List Health <3 | Implement emergency hygiene. Audit all acquisition sources. |
| Average score <3.0 | Emergency email program review |
| Average score declining 2 consecutive months | Root cause analysis required |
| Engagement declining 3 consecutive months | Content and segmentation audit |
| Three dimensions declining simultaneously | Full email strategy overhaul |

---

## ENFORCEMENT RULE

Email quality is enforced, not assumed.
Do not justify low scores.
Remediate until standards are met.
Every email sent is a brand touchpoint and a reputation signal.

---

## END OF EMAIL SCORE
