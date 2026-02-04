# Video Brain -- VideoScore Evaluation Framework

Version: 1.0
Last Updated: 2026-02-03
Owner: Video Brain
Status: ACTIVE

---

## Purpose

This scoring framework provides rigorous, quantitative evaluation of all video
content operations managed by the Video Brain. Video is the highest-investment
content format and demands the highest accountability. A video that nobody
watches to completion is not "brand awareness" -- it is wasted budget.

Every dimension is measured against platform benchmarks, historical baselines,
and production investment. The framework explicitly penalizes vanity metrics
(view counts without retention) and rewards metrics that correlate with
business outcomes (conversions, qualified attention, brand recall).

---

## Scoring Scale

| Score | Label | Interpretation |
|-------|-------|----------------|
| 9.0 - 10.0 | Elite | Top 1% content performance. Benchmark-setting quality. |
| 7.5 - 8.9 | Strong | Consistently above platform benchmarks. ROI-positive. |
| 6.0 - 7.4 | Competent | Meeting benchmarks. Acceptable production quality. |
| 4.0 - 5.9 | Below Standard | Underperforming on key metrics. Investment not justified. |
| 2.0 - 3.9 | Critical | Consistent underperformance. Production review required. |
| 0.0 - 1.9 | Non-Functional | No measurable video output or complete quality failure. |

---

## DIMENSION 1: Retention

Weight: 20%

### What We Measure

Average view duration (AVD) as a percentage of total video length, compared
against platform benchmarks by video length category. Retention is the single
most important metric because it determines algorithmic distribution on every
major platform. A video that is not watched is a video that is not distributed.

### Platform Retention Benchmarks

**YouTube**

| Video Length | Poor | Average | Good | Excellent | Elite |
|-------------|------|---------|------|-----------|-------|
| <2 min | <30% | 30-45% | 45-60% | 60-75% | >75% |
| 2-5 min | <25% | 25-40% | 40-55% | 55-70% | >70% |
| 5-10 min | <20% | 20-35% | 35-50% | 50-65% | >65% |
| 10-20 min | <15% | 15-30% | 30-45% | 45-60% | >60% |
| >20 min | <12% | 12-25% | 25-40% | 40-55% | >55% |

**Short-Form (TikTok, Reels, Shorts)**

| Video Length | Poor | Average | Good | Excellent | Elite |
|-------------|------|---------|------|-----------|-------|
| <15 sec | <40% | 40-55% | 55-70% | 70-85% | >85% |
| 15-30 sec | <35% | 35-50% | 50-65% | 65-80% | >80% |
| 30-60 sec | <25% | 25-40% | 40-55% | 55-70% | >70% |
| 60-180 sec | <20% | 20-35% | 35-50% | 50-65% | >65% |

### Retention Curve Analysis

Raw AVD is insufficient. Analyze the retention curve shape:

- **Flat/Gradual decline:** Ideal. Content holding attention throughout. Score bonus +0.5.
- **Front-loaded drop:** Hook is weak or content does not deliver on promise. Score penalty -0.5.
- **Mid-video cliff:** Pacing problem. Specific segment losing audience. Identify and fix.
- **End-loaded drop:** Content is too long. Trim to natural endpoint.
- **Spike pattern:** External referral to specific timestamp. Not organic retention.

### Repeat View Rate

Track percentage of viewers who watch the same video multiple times:
- >8% repeat view rate: Content is reference-worthy. Score bonus +0.5.
- 3-8%: Healthy. Content has replay value.
- <3%: Normal for most content. No modifier.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | AVD in "Excellent" or "Elite" tier. Flat retention curve. Repeat view rate >8%. |
| 7-8 | AVD in "Good" tier. Gradual decline curve. Consistent across video library. |
| 5-6 | AVD at "Average." Some front-loaded drops. Inconsistent across videos. |
| 3-4 | AVD below average. Significant mid-video cliffs. Declining trend. |
| 1-2 | AVD in "Poor" tier. Majority of viewers leave within first 25%. No improvement trend. |

---

## DIMENSION 2: Production Quality

Weight: 15%

### What We Measure

Technical and creative execution quality across audio, video, lighting, and
editing. Production quality is the foundation. Bad audio kills a video faster
than bad visuals. Inconsistent lighting signals amateur production. Pacing
that does not match content type loses attention.

### Audio Quality Assessment

| Element | Poor | Acceptable | Professional | Studio |
|---------|------|------------|-------------|--------|
| Background noise | Audible, distracting | Noticeable but not distracting | Minimal, controlled | Inaudible |
| Voice clarity | Muffled, inconsistent volume | Clear but some variation | Consistent, EQ'd | Broadcast quality |
| Music/SFX | Mismatched, overpowering | Present, occasionally loud | Balanced, purposeful | Emotionally integrated |
| Levels | Clipping or too quiet | Minor peaks | Normalized, -14 LUFS target | Mastered |

Audio quality threshold: Below "Acceptable" on any element = automatic score cap at 5.0.
Rationale: 73% of viewers abandon video due to poor audio quality (Wistia data).

### Visual Quality Assessment

| Element | Poor | Acceptable | Professional | Premium |
|---------|------|------------|-------------|---------|
| Resolution | <720p or upscaled | 720p | 1080p | 4K native |
| Lighting | Harsh shadows, dark faces | Adequate, some shadows | Even, three-point setup | Cinematic, intentional |
| Color grading | Raw/ungraded | Basic correction | Consistent grade, brand-aligned | Filmic, mood-setting |
| Framing | Poor composition, headroom | Adequate framing | Rule of thirds, purposeful | Dynamic, storytelling |
| Stability | Shaky, no stabilization | Minor shake | Stabilized or tripod | Gimbal or dolly-smooth |

### Editing Quality Assessment

| Element | Poor | Acceptable | Professional | Elite |
|---------|------|------------|-------------|-------|
| Pacing | Static or erratic | Functional but monotonous | Varied, content-appropriate | Rhythmic, audience-matched |
| Cut timing | Awkward pauses, jarring cuts | Functional | Clean, motivated cuts | Invisible editing |
| Graphics/Lower thirds | Missing or inconsistent | Present, basic | Branded, clean | Animated, integrated |
| Transitions | Cheesy or random | Consistent but basic | Purposeful, platform-native | Seamless |
| B-roll | Missing | Generic stock | Relevant, custom | Storytelling-enhancing |

### Production Value Relative to Budget

Score production quality relative to investment:

| Budget Tier | Expected Quality Level |
|------------|----------------------|
| $0-500 | Acceptable on all elements. Phone production acceptable if well-lit and steady. |
| $500-2K | Professional on audio and framing. Acceptable on everything else. |
| $2K-10K | Professional on all elements. |
| $10K+ | Premium on audio and visual. Professional minimum on everything. |

Exceeding quality expectations for budget tier: Score bonus +1.0.
Failing to meet quality expectations for budget tier: Score penalty -1.5.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | Premium audio and visual. Professional editing. Exceeds budget tier expectations. Brand-consistent across all videos. |
| 7-8 | Professional on all elements. Meets budget tier expectations. Minor inconsistencies. |
| 5-6 | Acceptable on all elements. Some production gaps but not viewer-deterring. |
| 3-4 | Below acceptable on 1-2 elements. Audio or visual issues impacting retention. |
| 1-2 | Poor on multiple elements. Production quality driving viewer abandonment. |

---

## DIMENSION 3: Hook Effectiveness

Weight: 15%

### What We Measure

The percentage of viewers retained at the 3-second mark (for short-form) or
30-second mark (for long-form). The hook determines whether the rest of the
video exists for the viewer. A great video with a bad hook is an unwatched
great video.

### 3-Second Retention Benchmarks (Short-Form)

| Performance | 3-Second Retention |
|------------|-------------------|
| Elite | >85% |
| Excellent | 75-85% |
| Good | 65-75% |
| Average | 50-65% |
| Poor | <50% |

### 30-Second Retention Benchmarks (Long-Form YouTube)

| Performance | 30-Second Retention |
|------------|-------------------|
| Elite | >80% |
| Excellent | 70-80% |
| Good | 55-70% |
| Average | 40-55% |
| Poor | <40% |

### Hook Framework Analysis

Rate each hook against these proven structures:

| Hook Type | Description | Best For |
|-----------|------------|----------|
| Curiosity Gap | Open a question the viewer needs answered | Educational, storytelling |
| Pattern Interrupt | Unexpected visual or audio that breaks scroll | Short-form, entertainment |
| Outcome Preview | Show the end result immediately | Tutorial, transformation |
| Controversy/Contrarian | Challenge a common belief | Thought leadership |
| Empathy/Pain Point | Name a problem the viewer is experiencing | Product, solution content |
| Social Proof | "10 million people use this" or similar | Authority, credibility |
| Urgency | Time-sensitive framing | Promotional, event-related |

Every video must use an identifiable hook structure. "No deliberate hook" = score capped at 4.0.

### Hook-to-Content Alignment

A hook that attracts viewers but does not match content creates a trust deficit:
- **Aligned:** Hook promise fulfilled in first 25% of video. Score unaffected.
- **Delayed:** Hook promise fulfilled after 50% of video. Score penalty -0.5.
- **Misleading:** Hook promise not fulfilled. Clickbait. Score capped at 3.0.

### Hook A/B Testing Protocol

- Every long-form video should test 2 hook variants where platform supports it
- Short-form: Publish hook variants as separate posts, measure 3-second retention
- Document hook performance by type to build institutional knowledge
- Minimum sample: 1000 impressions before declaring winner

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | 3-sec retention in "Elite" tier. Deliberate hook structure. Hook-content aligned. Active A/B testing. |
| 7-8 | 3-sec retention in "Good" to "Excellent." Consistent hook strategy. Aligned content. |
| 5-6 | 3-sec retention at "Average." Hook structure present but inconsistent. |
| 3-4 | 3-sec retention below average. Weak or absent hooks. Some clickbait tendency. |
| 1-2 | 3-sec retention in "Poor." No hook strategy. Content starts without a reason to stay. |

---

## DIMENSION 4: Thumbnail and Title Performance

Weight: 10%

### What We Measure

Click-through rate (CTR) from impressions to views. This is the gatekeeping
metric. Algorithm distribution means nothing if the thumbnail and title do not
compel a click. CTR is measured relative to channel/account average, not
absolute, because CTR norms vary dramatically by niche.

### CTR Benchmarks (YouTube)

| Performance | CTR |
|------------|-----|
| Elite | >10% |
| Excellent | 7-10% |
| Good | 4-7% |
| Average | 2-4% |
| Poor | <2% |

### CTR Benchmarks (Short-Form -- Where Applicable)

Short-form platforms are primarily feed-based, so CTR applies mainly to:
- YouTube Shorts (from shelf/search)
- TikTok search results
- Video thumbnails in profile grids

| Performance | CTR vs Account Average |
|------------|----------------------|
| Elite | >2x account average |
| Excellent | 1.5-2x account average |
| Good | 1.0-1.5x account average |
| Average | 0.75-1.0x account average |
| Poor | <0.75x account average |

### Thumbnail Quality Checklist

- [ ] Readable at mobile size (50x28px thumbnail preview)
- [ ] Maximum 3 words of text overlay
- [ ] High contrast between subject and background
- [ ] Face visible with clear emotion (where applicable)
- [ ] Colors not matching YouTube/platform UI (avoid red/white/black borders)
- [ ] Custom designed (not auto-generated frame grab)
- [ ] Consistent with channel brand while standing out in feed
- [ ] Does not duplicate video title text
- [ ] A/B tested (where platform supports)

### Title Optimization Checklist

- [ ] Front-loaded with searchable keyword or compelling hook
- [ ] Under 60 characters (no truncation on mobile)
- [ ] Includes curiosity element or specific value promise
- [ ] Does not use ALL CAPS for more than 2 words
- [ ] Avoids clickbait that content cannot deliver
- [ ] Tested against 2-3 alternatives before publishing

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | CTR in "Excellent" or "Elite." Custom thumbnails for every video. Active A/B testing. Title optimization systematic. |
| 7-8 | CTR in "Good" range. Custom thumbnails >90% of videos. Title strategy documented. |
| 5-6 | CTR at "Average." Custom thumbnails inconsistent. Some title optimization. |
| 3-4 | CTR below average. Auto-generated thumbnails common. Titles not optimized. |
| 1-2 | CTR in "Poor." No thumbnail strategy. Titles are afterthoughts. |

---

## DIMENSION 5: SEO Performance

Weight: 10%

### What We Measure

Video search visibility, including search impressions, ranking positions for
target keywords, and the percentage of views coming from search vs browse
vs external. SEO is the compounding asset. A video that ranks in search
generates views for years. A video without SEO dies after the first 48 hours.

### YouTube Search Performance

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Search impression share (for target keyword) | <5% | 5-15% | 15-30% | >30% |
| Search-driven views (% of total) | <10% | 10-25% | 25-40% | >40% |
| Average position for target keyword | >20 | 10-20 | 4-10 | Top 3 |
| Suggested video placement rate | <5% | 5-15% | 15-30% | >30% |

### SEO Optimization Checklist

- [ ] Primary keyword in title (first 5 words)
- [ ] Primary keyword in description (first 2 sentences)
- [ ] Description minimum 200 words with natural keyword usage
- [ ] Tags include primary keyword, secondary keywords, and topic variations
- [ ] Chapters/timestamps included (minimum 3 for videos >5 min)
- [ ] Closed captions uploaded (not auto-generated only)
- [ ] End screen and cards linked to related content
- [ ] Playlist placement for topic clustering
- [ ] Community post linking to video within 24 hours
- [ ] Pinned comment with value-add content and keywords

### Keyword Research Protocol

Before every long-form video:
1. Identify primary keyword using search volume data
2. Validate keyword competition (can we rank within 90 days?)
3. Identify 3-5 secondary/related keywords
4. Analyze top 5 ranking videos (length, structure, thumbnail, hook)
5. Define differentiation angle (what will our video offer that others do not?)
6. Document target keyword and ranking goal

### Evergreen vs Trending Content SEO

| Content Type | SEO Priority | Expected Search Lifespan |
|-------------|-------------|------------------------|
| Evergreen tutorial | Maximum | 12-36 months |
| Product review | High | 6-12 months |
| Industry commentary | Medium | 3-6 months |
| Trend/reaction | Low | 1-4 weeks |
| Promotional | Minimal | Campaign duration |

Content mix should be >40% evergreen for sustainable search traffic growth.

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | >25% of views from search. Target keywords ranking top 3. Keyword research on every video. >40% evergreen content. |
| 7-8 | >15% of views from search. Target keywords ranking top 10. Keyword research on most videos. |
| 5-6 | 10-15% from search. Some keyword targeting. SEO checklist partially followed. |
| 3-4 | <10% from search. No systematic keyword research. SEO elements missing. |
| 1-2 | Negligible search traffic. No SEO strategy. Descriptions empty or minimal. |

---

## DIMENSION 6: Conversion Impact

Weight: 15%

### What We Measure

The direct and assisted business impact of video content, measured through
video-attributed conversions, CTA click-through rate, and downstream revenue
or pipeline influence. Views without conversions are entertainment, not
business content.

### CTA Performance Benchmarks

| CTA Type | Poor | Average | Good | Excellent |
|----------|------|---------|------|-----------|
| Subscribe/Follow CTA | <0.5% | 0.5-1.5% | 1.5-3% | >3% |
| Link in description click | <1% | 1-3% | 3-6% | >6% |
| Product page visit | <0.5% | 0.5-2% | 2-5% | >5% |
| Lead form completion | <0.2% | 0.2-1% | 1-3% | >3% |
| Purchase (from video) | <0.1% | 0.1-0.5% | 0.5-2% | >2% |

### Attribution Framework

| Attribution Method | Reliability | Implementation Complexity |
|-------------------|------------|--------------------------|
| UTM-tagged links in description | High | Low |
| Dedicated landing pages per video | High | Medium |
| Promo codes unique to video | High | Low |
| Post-view conversion window (24-48hr) | Medium | Medium |
| Self-reported attribution surveys | Low | Low |
| Multi-touch attribution modeling | High | High |

Mandate: Every video with a conversion objective must have at least ONE
high-reliability attribution method active.

### Conversion Funnel by Video Type

| Video Type | Primary Conversion Goal | Secondary Goal |
|-----------|----------------------|----------------|
| Product demo | Trial signup or purchase | Subscribe |
| Tutorial/How-to | Subscribe + email capture | Product awareness |
| Testimonial/Case study | Sales inquiry or demo request | Trust building |
| Brand story | Subscribe + share | Brand affinity |
| Thought leadership | Email subscribe + share | Authority positioning |
| Product launch | Purchase or pre-order | Waitlist signup |

### Revenue Attribution Model

For videos with direct revenue goals:
- Track revenue generated within 7-day window post-view
- Calculate revenue per 1000 views (RPM equivalent)
- Compare production cost to attributed revenue (video-level ROI)
- Flag any video where production cost > 3x attributed revenue within 90 days

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | CTA performance in "Excellent." Attribution active on all conversion videos. Video-level ROI >3x. |
| 7-8 | CTA performance in "Good." Attribution on >80% of videos. Positive ROI trend. |
| 5-6 | CTA performance at "Average." Attribution on >50%. ROI unclear but positive signals. |
| 3-4 | CTA performance below average. Attribution inconsistent. ROI not tracked. |
| 1-2 | No CTA strategy. No attribution. Video is cost center with no measurable return. |

---

## DIMENSION 7: Brand Consistency

Weight: 5%

### What We Measure

Adherence to brand visual identity, tone of voice, and style guidelines across
all video content. Inconsistency erodes brand recognition and trust. Every
video is a brand touchpoint. Every touchpoint must reinforce the brand, not
confuse it.

### Visual Identity Compliance

| Element | Requirement |
|---------|------------|
| Color palette | Brand primary and secondary colors used in graphics, lower thirds, end screens |
| Typography | Brand fonts used in all text overlays |
| Logo placement | Consistent position, size, and timing of logo appearance |
| Intro/Outro | Standard brand intro (if applicable) and end screen template |
| Thumbnail style | Consistent design language (recognizable as brand at a glance) |
| Set/Background | Branded or consistent environment across episodes/series |

### Tone and Voice Compliance

| Element | Requirement |
|---------|------------|
| Speaking style | Matches brand voice guide (professional, casual, authoritative, etc.) |
| Vocabulary | Industry-appropriate, audience-appropriate, brand-aligned |
| Humor | Within brand guidelines (if applicable) |
| Inclusivity | Language and imagery representative and non-exclusionary |
| Sensitivity | Controversial topics handled per brand guidelines |

### Consistency Audit Protocol

Monthly: Review 5 random videos against brand checklist.
Quarterly: Full library audit for brand drift.
Per-series: Style guide created and maintained for recurring formats.

Compliance rate thresholds:
- >95%: Score bonus +0.5
- 80-95%: No modifier
- 60-80%: Score penalty -0.5
- <60%: Score penalty -1.5 and brand audit triggered

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | >95% compliance. Brand immediately recognizable. Style guide current and followed. |
| 7-8 | 80-95% compliance. Minor inconsistencies. Style guide exists. |
| 5-6 | 60-80% compliance. Noticeable inconsistencies. Style guide outdated or incomplete. |
| 3-4 | <60% compliance. Videos do not read as same brand. No active style guide. |
| 1-2 | No brand consistency. Each video feels like a different creator. |

---

## DIMENSION 8: Repurposing Efficiency

Weight: 10%

### What We Measure

The number and quality of derivative content pieces ("content atoms") created
from each long-form video. A single video shoot should yield a minimum of
5-10 pieces of platform-optimized content. Filming once and publishing once
is a content operations failure.

### Content Atom Targets per Long-Form Video

| Atom Type | Minimum Expected | Quality Standard |
|-----------|-----------------|-----------------|
| Short-form clips (Reels/Shorts/TikTok) | 3-5 | Each clip has its own hook and standalone value |
| Audiogram/Podcast clip | 1-2 | Clean audio, branded visual template |
| Quote graphics | 2-3 | Key insights in branded visual format |
| Blog post/Article | 1 | Transcript-based, SEO-optimized, not just transcript dump |
| Social media posts | 3-5 | Platform-optimized text posts with video insights |
| Email content | 1 | Key takeaway with video link |
| Thumbnail variations | 2-3 | A/B test-ready alternatives |
| Behind-the-scenes | 1 | Humanizing content from production process |

### Repurposing Quality Standards

Each derivative piece must:
- Stand alone without context from original video
- Be optimized for its target platform (not just cropped/trimmed)
- Have its own hook appropriate to the platform
- Include relevant CTA for the platform
- Maintain brand consistency

A derivative piece that is just a lazy crop of the original with no
platform optimization does not count toward the atom target.

### Efficiency Metrics

| Metric | Poor | Average | Good | Excellent |
|--------|------|---------|------|-----------|
| Atoms per long-form video | <3 | 3-6 | 7-12 | >12 |
| Atom quality pass rate | <50% | 50-70% | 70-90% | >90% |
| Time to repurpose (from publish) | >7 days | 3-7 days | 1-3 days | Same day |
| Repurposed content performance vs original | <25% | 25-50% | 50-100% | >100% |

### Scoring Rubric

| Score | Criteria |
|-------|----------|
| 9-10 | >12 atoms per video. >90% quality pass. Same-day repurposing. Derivatives outperform original on some platforms. |
| 7-8 | 7-12 atoms. >70% quality pass. Within 3 days. Consistent cross-platform presence. |
| 5-6 | 3-6 atoms. 50-70% quality. Within 7 days. Some platforms receiving repurposed content. |
| 3-4 | <3 atoms. Low quality derivatives. Slow turnaround. Most content stays on original platform only. |
| 1-2 | No repurposing. Each video exists only in its original format and platform. |

---

## Composite Score Calculation

```
VIDEO_SCORE = (
    Retention              * 0.20 +
    Production_Quality     * 0.15 +
    Hook_Effectiveness     * 0.15 +
    Thumbnail_Title        * 0.10 +
    SEO_Performance        * 0.10 +
    Conversion_Impact      * 0.15 +
    Brand_Consistency      * 0.05 +
    Repurposing_Efficiency * 0.10
)
```

### Score Interpretation

| Composite | Assessment | Action |
|-----------|-----------|--------|
| 8.5+ | Elite video operation | Scale production. Increase investment. |
| 7.0-8.4 | High-performing | Optimize weakest dimensions. Maintain quality. |
| 5.5-6.9 | Competent | Targeted improvements in 2-3 dimensions needed. |
| 4.0-5.4 | Underperforming | Production process review within 30 days. |
| <4.0 | Failing | Pause new production. Audit entire pipeline. |

---

## Reporting Cadence

| Report | Frequency | Audience | Focus |
|--------|-----------|----------|-------|
| Video Dashboard | Real-time | Production team | Per-video metrics, trending data |
| Weekly Performance | Weekly | Content leadership | Top/bottom performers, retention trends |
| Monthly Scorecard | Monthly | Marketing leadership | Full composite, production ROI, strategy alignment |
| Quarterly Review | Quarterly | Executive team | Portfolio performance, budget justification, roadmap |

---

## Failure Modes and Automatic Overrides

| Condition | Override |
|-----------|---------|
| Audio quality below "Acceptable" | Production Quality capped at 5.0 |
| Average retention below 20% for 5+ consecutive videos | Trigger mandatory production audit |
| No A/B testing on thumbnails for 30+ days | Thumbnail score capped at 5.0 |
| Zero attribution tracking on conversion videos | Conversion Impact scored 0.0 |
| No repurposing from last 5 long-form videos | Repurposing scored 0.0 |
| Brand compliance below 60% | Brand Consistency capped at 3.0 |
| Production cost >5x attributed revenue (for conversion content) | Conversion Impact capped at 3.0 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-03 | Initial framework. 8 dimensions established. |
