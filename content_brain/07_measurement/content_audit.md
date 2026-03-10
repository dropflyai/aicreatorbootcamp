# Content Audit — Content Inventory, Scoring, Gap Analysis, Prune/Update/Consolidate, Lifecycle

## Overview

A content audit is a systematic evaluation of all content assets in a
digital ecosystem. It answers three fundamental questions: What content
do we have? How well is it performing? What should we do about it? The
content audit is the diagnostic examination that precedes any content
strategy—without it, content decisions are based on assumptions rather
than evidence. This module covers the complete audit methodology: content
inventory creation, multi-dimensional scoring, gap analysis, triage
actions (prune, update, consolidate), and lifecycle management.

---

## Section 1: Content Inventory

### What Is a Content Inventory?

A content inventory is a comprehensive catalog of every content asset
in your ecosystem. It is the "census" of your content—an exhaustive
list with metadata that enables analysis.

**Inventory Scope**
Determine what to include:
- Website pages (marketing site, blog, documentation, landing pages)
- Gated assets (ebooks, white papers, templates, tools)
- Email content (templates, sequences, newsletters)
- Social media content (if archiving is desired)
- Video and audio content (YouTube, podcasts)
- Support content (knowledge base, help articles, FAQs)

**Inventory Fields**

| Field | Description | Source |
|-------|-------------|--------|
| URL | Page address | Crawl tool |
| Title | Page title tag | Crawl tool |
| Meta description | Page description | Crawl tool |
| Word count | Content length | Crawl tool |
| Content type | Blog, landing page, docs, etc. | Manual classification |
| Topic/category | Primary subject matter | Manual classification |
| Target keyword | Primary keyword target | Keyword-URL map |
| Author | Content creator | CMS |
| Publish date | Original publication date | CMS |
| Last updated | Most recent edit date | CMS |
| Status | Published, draft, archived | CMS |
| Organic traffic (monthly) | Sessions from organic search | GA4 |
| Backlinks | Referring domains | Ahrefs/SEMrush |
| Conversions | Goal completions from page | GA4 |
| Content score | Composite quality + performance | Content scoring model |

### Building the Inventory

**Step 1: Crawl the Site**
Use Screaming Frog, Sitebulb, or Ahrefs Site Audit to crawl all URLs.
Export the full URL list with technical metadata (status codes, word
count, title, meta description, canonical tags).

**Step 2: Enrich with Analytics Data**
Pull organic traffic, engagement metrics, and conversion data from GA4
for the trailing 12 months. Match by URL to the crawl export.

**Step 3: Enrich with SEO Data**
Pull backlink counts and keyword ranking data from Ahrefs or SEMrush.
Match by URL.

**Step 4: Enrich with CMS Data**
Pull author, publish date, last updated date, and content type from
the CMS. Match by URL.

**Step 5: Manual Classification**
For fields that cannot be automated (topic category, target keyword,
funnel stage), assign values manually. For sites with 1,000+ pages,
use sampling (audit 100% of high-traffic pages, 50% of medium, 20%
of low).

### Inventory Automation

For large content libraries (5,000+ URLs), automate the inventory
process:
- Scheduled crawls (weekly via Screaming Frog Cloud or Sitebulb)
- GA4 API integration for traffic data
- Ahrefs/SEMrush API integration for SEO data
- CMS API for editorial metadata
- Custom dashboard combining all data sources (Looker, Tableau, or
  Google Sheets with API connectors)

---

## Section 2: Content Scoring

### Multi-Dimensional Scoring Model

The content scoring model evaluates every page across multiple
dimensions to produce a composite score that enables ranking and
prioritization.

**Dimension 1: Traffic Performance (25%)**
| Score | Criteria |
|-------|----------|
| 5 | Top 10% of pages by organic traffic |
| 4 | Top 25% |
| 3 | Top 50% |
| 2 | Top 75% |
| 1 | Bottom 25% |
| 0 | Zero organic traffic |

**Dimension 2: Engagement Quality (20%)**
| Score | Criteria |
|-------|----------|
| 5 | Scroll depth >75%, engagement time >4 min |
| 4 | Scroll depth >60%, engagement time >3 min |
| 3 | Scroll depth >50%, engagement time >2 min |
| 2 | Scroll depth >30%, engagement time >1 min |
| 1 | Scroll depth <30%, engagement time <1 min |
| 0 | No measurable engagement |

**Dimension 3: Conversion Impact (25%)**
| Score | Criteria |
|-------|----------|
| 5 | Directly attributed to pipeline/revenue |
| 4 | Generates qualified leads (MQLs) |
| 3 | Generates email subscribers or registrations |
| 2 | Has CTA but low conversion |
| 1 | No CTA, no conversion path |
| 0 | Actively hurts conversion (confusing, off-brand) |

**Dimension 4: SEO Authority (15%)**
| Score | Criteria |
|-------|----------|
| 5 | 50+ referring domains, position 1-3 for target keyword |
| 4 | 20-49 referring domains, position 4-10 |
| 3 | 10-19 referring domains, position 11-20 |
| 2 | 5-9 referring domains, position 21-50 |
| 1 | 1-4 referring domains, position 50+ |
| 0 | No referring domains, not ranking |

**Dimension 5: Content Quality (15%)**
| Score | Criteria |
|-------|----------|
| 5 | Comprehensive, unique, accurate, well-formatted, on-brand |
| 4 | Strong content with minor improvement opportunities |
| 3 | Adequate content, meets minimum standards |
| 2 | Thin, outdated, or partially inaccurate |
| 1 | Poor quality, significantly outdated |
| 0 | Brand-damaging, factually wrong, or plagiarized |

**Composite Score Calculation**
```
Score = (Traffic x 0.25) + (Engagement x 0.20) + (Conversion x 0.25)
        + (SEO x 0.15) + (Quality x 0.15)

Maximum: 5.0
```

---

## Section 3: Gap Analysis

### Identifying Content Gaps

Content gaps are opportunities where audience demand exists but your
content does not adequately meet it.

**Keyword Gap Analysis**
Compare your keyword rankings against competitors:
1. Export your ranked keywords from Ahrefs/SEMrush
2. Export top 3 competitors' ranked keywords
3. Identify keywords where competitors rank and you do not
4. Filter for keywords with business relevance and reasonable difficulty
5. Prioritize by search volume, keyword difficulty, and business value

**Topic Cluster Gap Analysis**
For each topic cluster:
- List all subtopics that should be covered
- Map existing content to each subtopic
- Identify subtopics with no content (complete gaps)
- Identify subtopics with thin or outdated content (quality gaps)
- Identify subtopics covered by competitors but not by you

**Funnel Stage Gap Analysis**
Map content by funnel stage and identify imbalances:

| Stage | Content Needed | Audit Finding |
|-------|---------------|---------------|
| Awareness | Educational blog posts, guides | Often oversupplied |
| Consideration | Comparisons, case studies, webinars | Often undersupplied |
| Decision | Pricing, demo, ROI calculator, testimonials | Often undersupplied |
| Retention | Onboarding, best practices, advanced guides | Often neglected |
| Advocacy | Community, UGC prompts, referral content | Rarely exists |

**Format Gap Analysis**
Compare content formats against audience preferences:
- Do you have video content for topics where video dominates SERPs?
- Do you have interactive tools for topics where calculators rank?
- Do you have visual content for topics where infographics earn links?
- Do you have long-form guides for topics where comprehensive coverage
  is expected?

### Gap Prioritization Matrix

Score each gap on two axes:
- **Business Value**: Revenue potential, strategic alignment, urgency
- **Feasibility**: Production effort, expertise availability, competitive
  difficulty

```
             High Feasibility    Low Feasibility
High Value   DO FIRST            PLAN CAREFULLY
Low Value    QUICK WINS          DEPRIORITIZE
```

---

## Section 4: Triage Actions — Prune, Update, Consolidate

### The Triage Decision Framework

Every content asset must be classified into one of five actions:

**1. Keep (Score 4.0–5.0)**
Content is performing well and meeting quality standards.
- Action: Monitor for decay, refresh annually
- Resource: Minimal (1 hour per page per year)

**2. Update (Score 2.5–3.9)**
Content has a sound foundation but needs improvement.
- Actions: Refresh statistics, update examples, improve formatting,
  add missing sections, optimize for current SERP intent
- Resource: 2–8 hours per page
- Priority: Start with highest-traffic pages in this range

**3. Consolidate (Score 1.5–2.4 with multiple thin pages)**
Multiple pages target the same or overlapping keywords, diluting
authority and creating cannibalization.
- Action: Merge the best elements of all related pages into one
  comprehensive page. 301 redirect all merged URLs to the surviving page.
- Resource: 4–12 hours per consolidation group
- Warning: Consolidation is irreversible. Validate that the surviving
  page captures the combined ranking potential.

**4. Prune (Score 0–1.4)**
Content is low-performing, outdated, off-brand, or irrelevant.
- Action: Remove the page. If it has any backlinks, 301 redirect to
  the most relevant surviving page. If it has no value, use 410 (Gone).
- Resource: 30 minutes per page
- Benefit: Removes crawl budget waste, improves site quality signals

**5. Create (Gap identified)**
No content exists for a high-priority topic, keyword, or funnel stage.
- Action: Brief, prioritize, produce, and publish new content
- Resource: Varies by format (4–40 hours per piece)
- Priority: Based on gap analysis prioritization matrix

### Triage Execution Plan

**Phase 1: Quick Wins (Weeks 1–4)**
- Prune all score 0–0.5 content (immediate quality improvement)
- Update top 10 highest-traffic pages in the 2.5–3.9 range
- Consolidate any groups with obvious cannibalization

**Phase 2: Systematic Improvement (Months 2–3)**
- Complete all remaining updates for score 2.5–3.9 pages
- Execute all consolidation plans
- Begin new content creation for highest-priority gaps

**Phase 3: Ongoing Maintenance (Month 4+)**
- Quarterly re-scoring of all content
- Monthly decay monitoring with automated alerts
- Continuous gap analysis as market and competitors evolve

---

## Section 5: Content Lifecycle Management

### The Content Lifecycle Model

Content is not a one-time deliverable—it is an asset with a lifecycle
that requires active management.

```
PLAN → CREATE → PUBLISH → PROMOTE → MEASURE → OPTIMIZE → ARCHIVE
  ↑                                                          │
  └──────────────────── REPLACE ─────────────────────────────┘
```

**Plan Phase**
- Define target audience, intent, and keyword
- Check for existing content that could be updated instead
- Create content brief with quality criteria

**Create Phase**
- Draft, review, edit (minimum two editorial passes)
- Design and format (visual assets, schema markup)
- Quality score assessment against eval criteria

**Publish Phase**
- CMS entry with all metadata fields completed
- Technical validation (canonical, schema, mobile rendering)
- Add to content inventory and keyword-URL map

**Promote Phase**
- Social distribution across relevant platforms
- Email notification to relevant subscriber segments
- Internal linking from related existing content
- Outreach for link building (if high-authority target)

**Measure Phase**
- 30-day performance check: Is traffic ramping as expected?
- 90-day assessment: Is the content ranking for target keywords?
- Annual review: Full content score reassessment

**Optimize Phase**
- Update based on performance data and user feedback
- A/B test headlines, CTAs, and content structure
- Refresh statistics, examples, and screenshots

**Archive Phase**
- Content no longer serves audience or business needs
- 301 redirect to replacement content or 410 removal
- Remove from internal navigation and sitemaps
- Document in content audit log for institutional memory

### Content Freshness Calendar

Schedule proactive content reviews to prevent decay:

| Content Type | Review Frequency | Review Scope |
|-------------|-----------------|--------------|
| Data-driven content | Every 6 months | Statistics, sources, findings |
| How-to guides | Every 12 months | Steps, tools, screenshots |
| Product content | Every release cycle | Features, pricing, capabilities |
| Evergreen concepts | Every 18 months | Accuracy, relevance, formatting |
| News/trend content | Do not refresh | Archive when no longer timely |

---

## Key References

- Kristina Halvorson, *Content Strategy for the Web* (New Riders)
- Content Audit Toolkit (ContentWRX)
- Animalz: Content decay and content scoring research
- Robert Rose, *Killing Marketing* (McGraw-Hill)
- Screaming Frog: Site audit documentation
- Google Analytics 4: Exploration reports documentation

---

## Summary

A content audit is the foundation of data-driven content strategy.
The content inventory provides the census of all assets. Multi-
dimensional scoring objectively evaluates every page across traffic,
engagement, conversion, authority, and quality dimensions. Gap analysis
identifies opportunities where demand exceeds supply. Triage actions—
keep, update, consolidate, prune, create—provide clear operational
directives for every asset. Lifecycle management ensures that content
is treated as a living asset requiring ongoing investment, not a
one-time deliverable that decays in silence. Organizations that
conduct regular content audits outperform those that do not, because
they make decisions from evidence rather than intuition.
