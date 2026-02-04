# Social Media Brain -- SocialScore Evaluation Framework

Version: 1.0
Last Updated: 2026-02-03
Owner: Social Media Brain
Status: ACTIVE

---

## Purpose

This scoring framework provides rigorous, quantitative evaluation of all social
media operations managed by the Social Media Brain. Every dimension is measured
against industry benchmarks, platform-specific standards, and historical
performance baselines. Scores are not vanity metrics. They are operational
health indicators that drive tactical and strategic decisions.

No score exists in isolation. Cross-dimensional analysis is mandatory. A high
engagement rate with declining audience quality is a failure state, not a win.

---

## Scoring Scale

| Score | Label | Interpretation |
|-------|-------|----------------|
| 9.0 - 10.0 | Elite | Top 1% of comparable accounts. Defensible advantage. |
| 7.5 - 8.9 | Strong | Consistently above platform benchmarks. Compounding growth. |
| 6.0 - 7.4 | Competent | Meeting benchmarks. No significant weakness. Room to optimize. |
| 4.0 - 5.9 | Below Standard | Underperforming on key metrics. Requires intervention plan. |
| 2.0 - 3.9 | Critical | Systemic failures. Strategy overhaul required within 14 days. |
| 0.0 - 1.9 | Non-Functional | No measurable social presence or catastrophic decline. |

---

## DIMENSION 1: Engagement Rate

Weight: 15%

### What We Measure

Engagement rate is the percentage of reached audience that interacts with
content through likes, comments, shares, saves, clicks, or other platform-
specific actions. We measure TRUE engagement rate (engagements / reach), not
the vanity version (engagements / followers).

### Platform Benchmarks (Baseline Expectations)

| Platform | Poor | Average | Good | Excellent | Elite |
|----------|------|---------|------|-----------|-------|
| Instagram (Feed) | <1.0% | 1.0-2.5% | 2.5-4.0% | 4.0-6.0% | >6.0% |
| Instagram (Reels) | <2.0% | 2.0-4.0% | 4.0-7.0% | 7.0-12.0% | >12.0% |
| TikTok | <3.0% | 3.0-6.0% | 6.0-10.0% | 10.0-18.0% | >18.0% |
| LinkedIn | <1.5% | 1.5-3.0% | 3.0-5.0% | 5.0-8.0% | >8.0% |
| X/Twitter | <0.5% | 0.5-1.5% | 1.5-3.0% | 3.0-5.0% | >5.0% |
| Facebook | <0.5% | 0.5-1.5% | 1.5-3.0% | 3.0-5.0% | >5.0% |
| YouTube (Community) | <1.0% | 1.0-2.5% | 2.5-4.0% | 4.0-7.0% | >7.0% |

### Trend Direction Analysis

Raw engagement rate is insufficient. We require 90-day trend analysis:

- **Accelerating**: Rate increasing >0.5% per month. Score bonus +0.5.
- **Stable**: Rate within +/- 0.2% per month. No modifier.
- **Decelerating**: Rate declining >0.3% per month. Score penalty -1.0.
- **Collapsing**: Rate declining >1.0% per month. Score penalty -2.0. Trigger immediate audit.

### Engagement Quality Breakdown

Not all engagements are equal. Weight by value:

| Action | Weight | Rationale |
|--------|--------|-----------|
| Save/Bookmark | 5x | Highest intent signal. Content deemed reference-worthy. |
| Share/Repost | 4x | User stakes reputation on content quality. |
| Comment (substantive) | 3x | Active cognitive engagement. Community building. |
| Comment (emoji-only) | 1x | Low effort. Minimal signal. |
| Like/Heart | 1x | Baseline acknowledgment. Low friction, low signal. |
| Click-through | 4x | Direct behavioral intent. Measurable downstream value. |
| Video view (>50%) | 2x | Sustained attention. Content holding audience. |

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Above platform "Excellent" benchmark. Accelerating trend. High-quality engagement mix (>30% saves+shares). |
| 7-8 | Above platform "Good" benchmark. Stable or accelerating. Balanced engagement mix. |
| 5-6 | At platform "Average" benchmark. Stable trend. Engagement skews toward likes. |
| 3-4 | Below platform average. Decelerating trend. Engagement dominated by low-value actions. |
| 1-2 | Significantly below average. Collapsing trend. Possible bot engagement detected. |

### Red Flags (Automatic Score Cap at 4.0)

- Engagement rate spikes >300% without identifiable cause (bot activity suspected)
- Comment-to-like ratio below 0.5% (ghost followers or purchased audience)
- Engagement rate diverges significantly between platforms without strategic explanation

---

## DIMENSION 2: Audience Growth

Weight: 15%

### What We Measure

Net new followers/subscribers across all managed platforms, with emphasis on
ORGANIC growth rate, follower quality, and bot/fake account ratio.

### Growth Rate Benchmarks

| Growth Category | Monthly Rate | Assessment |
|-----------------|-------------|------------|
| Hypergrowth | >15% | Viral moment or paid amplification. Verify quality. |
| Strong | 5-15% | Healthy organic growth with occasional amplification. |
| Steady | 2-5% | Sustainable. Compounding over 12 months = significant. |
| Stagnant | 0-2% | Content or distribution problem. Investigate. |
| Declining | Negative | Retention crisis. Immediate intervention. |

### Follower Quality Assessment

Growth without quality is liability. Evaluate:

- **Profile completeness**: >80% of new followers have profile photos and bios.
- **Activity level**: >60% of new followers have posted within last 30 days.
- **Relevance**: >70% of new followers match target persona demographics.
- **Bot ratio**: <5% of audience flagged as bot/fake accounts.
- **Geographic alignment**: >60% from target markets.

### Bot Detection Protocol

Run quarterly bot audits using:
1. Follower-to-following ratio analysis (accounts following >5000 with <100 followers)
2. Engagement pattern analysis (identical engagement timestamps across accounts)
3. Profile age vs activity analysis (new accounts with zero content)
4. Third-party audit tools (cross-reference minimum 2 tools)

Bot ratio thresholds:
- <3%: Clean. Score unaffected.
- 3-8%: Monitor. Score penalty -0.5.
- 8-15%: Cleanup required. Score penalty -1.5.
- >15%: Audience integrity compromised. Score capped at 3.0.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Strong or hypergrowth rate. Bot ratio <3%. >75% quality followers. Organic-dominant. |
| 7-8 | Steady-to-strong growth. Bot ratio <5%. >65% quality followers. |
| 5-6 | Steady growth. Bot ratio <8%. >55% quality followers. Some paid dependency. |
| 3-4 | Stagnant growth. Bot ratio 8-15%. Quality below 50%. Heavy paid dependency. |
| 1-2 | Declining. Bot ratio >15%. Audience integrity failed. |

---

## DIMENSION 3: Content Performance

Weight: 15%

### What We Measure

Content effectiveness measured by REACH, SAVES, and SHARES. Likes are tracked
but de-prioritized as a performance indicator. The question is not "did people
acknowledge this?" but "did people find this valuable enough to save or share?"

### Performance Tiers by Content Type

| Content Type | Metric | Below Avg | Average | Above Avg | Outstanding |
|-------------|--------|-----------|---------|-----------|-------------|
| Carousel | Save Rate | <2% | 2-5% | 5-8% | >8% |
| Reels/Short Video | Share Rate | <1% | 1-3% | 3-6% | >6% |
| Static Image | Reach/Follower | <15% | 15-30% | 30-50% | >50% |
| Stories | Completion Rate | <40% | 40-60% | 60-80% | >80% |
| Long-form Text | Read Time | <30s | 30-60s | 60-120s | >120s |
| Threads/Carousel Text | Click-through | <1% | 1-3% | 3-5% | >5% |

### Content Pillar Performance Tracking

Every piece of content maps to a content pillar. Track per-pillar performance:

- Education: Does it teach? Measured by saves and completion rate.
- Entertainment: Does it hook? Measured by shares and view duration.
- Inspiration: Does it motivate? Measured by comments and DM responses.
- Promotion: Does it convert? Measured by click-throughs and conversions.

Mandate: No single pillar exceeds 40% of content calendar. Promotional content
capped at 20%. Violation = automatic -1.0 score penalty.

### Content Velocity vs Quality

Track the ratio of content produced to content that exceeds platform average:

- Hit rate >60%: Content engine is calibrated. Maintain cadence.
- Hit rate 40-60%: Acceptable. Analyze misses for pattern.
- Hit rate 20-40%: Quality problem. Reduce volume, increase research.
- Hit rate <20%: Stop publishing. Conduct full content audit.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | >60% hit rate. Save+share rates in "Outstanding" tier. All pillars performing. |
| 7-8 | >50% hit rate. Most metrics in "Above Average." Balanced pillar mix. |
| 5-6 | 40-50% hit rate. Metrics at "Average." Some pillar imbalance. |
| 3-4 | 20-40% hit rate. Below average on key metrics. Promotional content overweight. |
| 1-2 | <20% hit rate. Content consistently underperforms. No clear strategy. |

---

## DIMENSION 4: Community Sentiment

Weight: 10%

### What We Measure

The emotional tone and intent behind audience interactions. Quantitative
engagement without sentiment context is blind. A post with 500 comments can be
a triumph or a disaster depending on what those comments say.

### Sentiment Classification

| Category | Definition | Example |
|----------|-----------|---------|
| Positive Advocacy | Unsolicited praise, recommendation, defense of brand | "Best product I've ever used, everyone should try this" |
| Positive Neutral | Supportive engagement without strong advocacy | "Love this!" or relevant emoji reactions |
| Neutral | Informational or question-based interactions | "What time does this launch?" |
| Negative Constructive | Criticism with specific, actionable feedback | "The app crashes when I try to export. Please fix." |
| Negative Hostile | Aggressive, personal, or inflammatory language | Insults, trolling, threat language |

### Measurement Protocol

1. Sample minimum 200 comments per platform per month (or 100% if volume is lower)
2. Classify each using the 5-category system above
3. Calculate sentiment score: (Positive Advocacy x 2 + Positive Neutral x 1 + Neutral x 0 + Negative Constructive x -0.5 + Negative Hostile x -2) / total interactions
4. Track DM volume and DM sentiment separately (DMs are higher-intent signals)
5. Monitor brand mention sentiment across platform (not just owned channels)

### Sentiment Benchmarks

| Score Range | Health Level | Action |
|-------------|-------------|--------|
| >1.2 | Excellent | Community is an asset. Amplify advocacy. |
| 0.8 - 1.2 | Healthy | Positive-skewing. Maintain course. |
| 0.4 - 0.8 | Neutral | Neither asset nor liability. Increase engagement tactics. |
| 0.0 - 0.4 | Concerning | Negative signals increasing. Investigate root causes. |
| <0.0 | Crisis | Net negative sentiment. Activate crisis protocol. |

### Brand Mention Tracking

- Track volume of unprompted brand mentions weekly
- Classify mention sentiment using same 5-category system
- Compare mention volume to competitors (share of voice)
- Alert threshold: >20% increase in negative mentions within 48 hours

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Sentiment score >1.2. Brand mentions growing. Advocacy ratio >25%. Zero unresolved negative threads. |
| 7-8 | Sentiment score 0.8-1.2. Positive trend. Advocacy ratio >15%. Negative threads resolved <4hrs. |
| 5-6 | Sentiment score 0.4-0.8. Stable. Advocacy ratio >8%. Response time <12hrs. |
| 3-4 | Sentiment score 0.0-0.4. Declining. Negative comments >30%. Slow response. |
| 1-2 | Sentiment score <0.0. Net negative. Unresolved complaints. Brand reputation at risk. |

---

## DIMENSION 5: Platform Optimization

Weight: 10%

### What We Measure

How effectively content is optimized for each platform's algorithm, format
preferences, and distribution mechanics. Generic cross-posting is a failure
mode. Each platform rewards specific behaviors and punishes others.

### Algorithm Alignment Checklist

**Instagram**
- [ ] Reels prioritized (algorithm weight: high)
- [ ] Carousel posts used for save optimization
- [ ] Stories posted 3-7x per day for visibility
- [ ] Hashtag strategy: 5-15 relevant, rotated weekly
- [ ] No external links in captions (algorithm penalty)
- [ ] Engagement within first 30 minutes of posting

**TikTok**
- [ ] Native creation tools used (algorithm preference)
- [ ] Trending sounds integrated within 48 hours of trend emergence
- [ ] Video length optimized per content type (7-15s for viral, 60-180s for education)
- [ ] No watermarks from other platforms (suppression trigger)
- [ ] Comment engagement within first hour
- [ ] Duet/Stitch strategy active

**LinkedIn**
- [ ] Text posts with line breaks for readability
- [ ] No external links in post body (move to comments)
- [ ] Dwell time optimized (long-form content)
- [ ] Document posts (PDFs) used for save-driving content
- [ ] Employee advocacy program active
- [ ] Engagement pods avoided (algorithm detection risk)

**X/Twitter**
- [ ] Thread strategy for long-form content
- [ ] Media attached (algorithm boost)
- [ ] Reply engagement active
- [ ] Spaces participation for reach expansion
- [ ] Community Notes awareness (fact-check vulnerability)

### Posting Cadence Optimization

| Platform | Minimum | Optimal | Diminishing Returns |
|----------|---------|---------|-------------------|
| Instagram | 3/week | 5-7/week + daily stories | >2 feed posts/day |
| TikTok | 3/week | 1-3/day | >5/day quality drops |
| LinkedIn | 2/week | 4-5/week | >2/day feels spammy |
| X/Twitter | 5/week | 2-5/day | >15/day without engagement |
| YouTube | 1/week | 2-3/week | Quality-dependent |

### Format Usage Score

Track percentage of content using platform-preferred formats:
- >80% platform-optimized: Score bonus +0.5
- 50-80%: No modifier
- <50%: Score penalty -1.0 (cross-posting without adaptation)

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | All algorithm alignment items checked. Optimal cadence. >80% format optimization. Early trend adoption. |
| 7-8 | >80% alignment items. Near-optimal cadence. >70% format optimization. |
| 5-6 | >60% alignment items. Minimum cadence met. >50% format optimization. |
| 3-4 | <60% alignment. Inconsistent cadence. Cross-posting without adaptation. |
| 1-2 | No platform optimization. Same content everywhere. Algorithm-hostile posting patterns. |

---

## DIMENSION 6: Paid Social ROI

Weight: 15%

### What We Measure

Return on ad spend (ROAS), cost per acquisition (CPA), creative refresh
effectiveness, and the relationship between paid and organic performance.

### ROAS Benchmarks by Objective

| Campaign Objective | Poor | Acceptable | Good | Excellent |
|-------------------|------|------------|------|-----------|
| Awareness (CPM) | >$15 | $8-15 | $4-8 | <$4 |
| Traffic (CPC) | >$3.00 | $1.50-3.00 | $0.50-1.50 | <$0.50 |
| Leads (CPL) | >$50 | $20-50 | $8-20 | <$8 |
| Sales (CPA) | >$100 | $40-100 | $15-40 | <$15 |
| ROAS (Revenue) | <1.5x | 1.5-3x | 3-6x | >6x |

Note: Benchmarks are industry-median. Adjust per vertical. SaaS CPL of $30 may
be excellent; e-commerce CPL of $30 is poor.

### Creative Refresh Protocol

- Track frequency (times same user sees same ad)
- Refresh trigger: Frequency >3.0 OR CTR decline >20% from peak
- Minimum 3 creative variants per campaign at launch
- A/B testing mandatory: never run single creative
- Creative fatigue timeline: typically 7-14 days for social

### Paid-Organic Synergy

Measure how paid amplification affects organic metrics:
- Does boosting a post increase organic reach of subsequent posts?
- Are paid audiences converting to organic followers?
- What is the organic amplification multiplier? (organic reach gained per $1 spent)

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | ROAS >6x. CPA below "Good" benchmark. Creative refresh <frequency 3.0. Paid-organic synergy measurable. |
| 7-8 | ROAS 3-6x. CPA in "Good" range. Regular creative refresh. A/B testing active. |
| 5-6 | ROAS 1.5-3x. CPA in "Acceptable" range. Some creative fatigue. Sporadic testing. |
| 3-4 | ROAS <1.5x. CPA in "Poor" range. Stale creatives. No testing protocol. |
| 1-2 | ROAS <1.0x (losing money). No creative strategy. No measurement framework. |

---

## DIMENSION 7: Influencer ROI

Weight: 10%

### What We Measure

The measurable business impact of influencer partnerships, including engagement
lift, attribution accuracy, and brand safety compliance.

### Engagement Lift Measurement

Compare brand content performance during influencer campaign vs baseline:
- **Engagement lift**: (campaign engagement rate - baseline) / baseline x 100
- **Reach lift**: incremental unique users reached via influencer
- **Follower lift**: net new followers during campaign window
- **Search lift**: branded search volume change during campaign

### Attribution Framework

| Attribution Method | Reliability | Use When |
|-------------------|------------|----------|
| Unique promo codes | High | Direct-response campaigns |
| UTM parameters | High | Traffic and conversion campaigns |
| Branded hashtag tracking | Medium | Awareness campaigns |
| Lift studies (control vs exposed) | High | Large-scale campaigns (>$10K) |
| Self-reported ("How did you hear?") | Low | Supplement only, never primary |

Mandate: Every influencer campaign must have at least TWO attribution methods active.

### Brand Safety Checklist

- [ ] Influencer content history reviewed (last 12 months minimum)
- [ ] Controversial topics/affiliations assessed
- [ ] Audience authenticity verified (bot check on influencer's followers)
- [ ] FTC/disclosure compliance confirmed
- [ ] Contract includes brand safety clauses and termination triggers
- [ ] Content approval workflow established before go-live
- [ ] Crisis plan exists for influencer misconduct

### Influencer Tier ROI Expectations

| Tier | Followers | Expected CPE | Expected Engagement Rate |
|------|-----------|-------------|------------------------|
| Nano | 1K-10K | $0.10-0.50 | 5-10% |
| Micro | 10K-100K | $0.50-2.00 | 3-7% |
| Mid | 100K-500K | $2.00-8.00 | 2-5% |
| Macro | 500K-1M | $5.00-15.00 | 1.5-3% |
| Mega | >1M | $10.00-30.00 | 1-2% |

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Measurable engagement lift >50%. Dual attribution active. CPE below tier benchmark. Zero brand safety incidents. |
| 7-8 | Engagement lift 25-50%. Attribution tracked. CPE at or below benchmark. Brand safety protocols followed. |
| 5-6 | Engagement lift 10-25%. Single attribution method. CPE at benchmark. Minor brand safety gaps. |
| 3-4 | Engagement lift <10%. Attribution unclear. CPE above benchmark. Incomplete brand safety review. |
| 1-2 | No measurable lift. No attribution. Overspending. Brand safety incident occurred. |

---

## DIMENSION 8: Crisis Readiness

Weight: 10%

### What We Measure

The speed, quality, and preparedness of crisis response on social channels.
Social media crises move in minutes, not days. A brand that cannot respond
within 1 hour is a brand that has already lost control of the narrative.

### Response Time Requirements

| Severity | Max Response Time | Escalation |
|----------|------------------|------------|
| Tier 1 - Viral negative mention | 30 minutes | Immediate leadership notification |
| Tier 2 - Negative press coverage | 1 hour | PR + Legal + Social aligned |
| Tier 3 - Product issue complaints | 2 hours | Support + Product + Social aligned |
| Tier 4 - Competitor attack | 4 hours | Strategy assessment before response |
| Tier 5 - Minor negative feedback | 12 hours | Standard community management |

### Crisis Preparedness Audit

Conduct quarterly:
- [ ] Crisis playbook exists and is updated within last 90 days
- [ ] Escalation contact list current (verified phone numbers)
- [ ] Pre-approved holding statements drafted for top 5 scenarios
- [ ] Social monitoring tools configured for crisis keywords
- [ ] Team has conducted tabletop exercise within last 6 months
- [ ] After-action review process documented
- [ ] Legal review turnaround time confirmed (<30 minutes for Tier 1)
- [ ] Platform-specific response templates ready (different tone per platform)

### Crisis Simulation Score

Run bi-annual crisis simulations. Grade on:
1. Detection time: How quickly was the crisis identified?
2. Escalation accuracy: Was the right team notified?
3. Response quality: Was the message appropriate in tone and content?
4. Coordination: Did all channels align on messaging?
5. Resolution: Was the issue resolved or contained?

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | All preparedness items checked. Simulation score >90%. Response times consistently met. Zero unmanaged crises. |
| 7-8 | >80% preparedness items. Simulation score >75%. Response times mostly met. Crises managed without brand damage. |
| 5-6 | >60% preparedness items. Simulation conducted but gaps found. Some delayed responses. |
| 3-4 | <60% preparedness. No simulation in 12 months. Multiple delayed responses. |
| 1-2 | No crisis plan. No monitoring. Crises discovered via customers, not proactive detection. |

---

## Composite Score Calculation

```
SOCIAL_SCORE = (
    Engagement_Rate    * 0.15 +
    Audience_Growth    * 0.15 +
    Content_Performance * 0.15 +
    Community_Sentiment * 0.10 +
    Platform_Optimization * 0.10 +
    Paid_Social_ROI    * 0.15 +
    Influencer_ROI     * 0.10 +
    Crisis_Readiness   * 0.10
)
```

### Score Interpretation

| Composite | Assessment | Action |
|-----------|-----------|--------|
| 8.5+ | Elite social operation | Document and replicate across brands |
| 7.0-8.4 | High-performing | Optimize weakest dimension |
| 5.5-6.9 | Competent | Strategic improvements needed in 2-3 dimensions |
| 4.0-5.4 | Underperforming | Comprehensive strategy overhaul within 30 days |
| <4.0 | Failing | Consider external audit or team restructuring |

---

## Reporting Cadence

| Report | Frequency | Audience | Detail Level |
|--------|-----------|----------|-------------|
| Daily Dashboard | Daily | Social team | Metric snapshots, anomaly alerts |
| Weekly Scorecard | Weekly | Marketing leadership | Dimension scores, trend arrows, top/bottom content |
| Monthly Deep Dive | Monthly | Executive team | Full composite score, competitive analysis, recommendations |
| Quarterly Review | Quarterly | C-suite | Strategic assessment, budget justification, roadmap |

---

## Failure Modes and Automatic Overrides

These conditions override the composite score regardless of other performance:

| Condition | Override |
|-----------|---------|
| Brand safety incident (unresolved) | Cap at 3.0 |
| Bot ratio >15% on any platform | Cap at 3.0 |
| No crisis plan exists | Cap at 4.0 |
| Same content posted identically on 3+ platforms | Penalty -2.0 |
| No A/B testing in paid campaigns for 30+ days | Paid ROI capped at 4.0 |
| Engagement rate declining 3 consecutive months | Trigger mandatory audit |
| Zero influencer attribution tracking | Influencer ROI scored 0.0 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial framework. 8 dimensions established. |
