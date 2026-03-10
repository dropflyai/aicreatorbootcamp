# Content Score -- Quality Enforcement (Authoritative)

This document defines how content quality is evaluated.
Every blog post, every landing page, every email, every piece of content must be scored before publication.

If content quality is not measurable, it is not enforced.
If it is not enforced, content is noise, not signal.

---

## SCORING RULES (MANDATORY)

Each piece of content must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = content cannot be published:
- **Strategic Alignment**
- **Craft Quality**
- **Brand Voice Consistency**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No single dimension < 2
- All failure conditions checked and cleared

### Weighted Scoring

Some dimensions carry more weight in final scoring:
- Strategic Alignment: 1.5x weight
- Conversion Impact: 1.5x weight
- All others: 1.0x weight

Weighted average must be >= 4.0 to pass.

---

## 1. STRATEGIC ALIGNMENT

**Question:**
Does this content serve a clear business objective with measurable content-to-revenue attribution?

### Content-Revenue Attribution Framework

Every piece of content must map to one of these business objectives:

| Objective | Metric | Example Content |
|-----------|--------|----------------|
| **Awareness** | Organic traffic, social impressions | Thought leadership, industry reports |
| **Consideration** | Time on page, content downloads, email signups | Comparison guides, case studies, webinars |
| **Decision** | Demo requests, trial starts, SQLs | Product pages, ROI calculators, bottom-of-funnel guides |
| **Retention** | Feature adoption, NPS, support tickets | Product tutorials, best practice guides, release notes |
| **Expansion** | Upsell pipeline, feature discovery | Advanced guides, use case content, community spotlights |

### Attribution Requirements

- Every content piece must have a declared business objective before creation begins
- Content brief must include the target conversion action
- UTM parameters or tracking must be in place before publication
- Monthly attribution report: which content pieces generated pipeline?
- Quarterly content ROI: cost of production vs. attributed revenue

### Content-Funnel Mapping

```
Top of Funnel (TOFU):      Awareness content          -> Metric: Traffic, Impressions
Middle of Funnel (MOFU):   Consideration content       -> Metric: Leads, Downloads
Bottom of Funnel (BOFU):   Decision content            -> Metric: SQLs, Demos, Trials
Post-Funnel:               Retention/Expansion content  -> Metric: Adoption, NRR
```

Content portfolio should maintain balance:
- TOFU: 40% of content volume
- MOFU: 30% of content volume
- BOFU: 20% of content volume
- Post-Funnel: 10% of content volume

### Scoring Guide

- **5** -- Content has a clear business objective. Target conversion action defined. Tracking in place. Content directly attributable to pipeline or revenue. Portfolio balance maintained across funnel stages.
- **4** -- Business objective clear. Tracking in place. Attribution pathway defined but not yet proven. Portfolio mostly balanced.
- **3** -- Business objective stated but vague ("build awareness"). No specific conversion action. Tracking partially in place. Portfolio imbalanced.
- **2** -- Content created without a clear business objective. No attribution plan. Published because "we need to post something."
- **1** -- Content has no strategic purpose. Cannot explain why it exists or what it is supposed to achieve.

Score <3 = content MUST NOT be published without a clear business objective.

---

## 2. AUDIENCE RESONANCE

**Question:**
Does the content use the actual language, concerns, and mental models of the target audience?

### Voice of Customer (VoC) Integration Requirements

Every content piece must demonstrate VoC integration:

| Source | How to Use | Quality Bar |
|--------|-----------|-------------|
| **Customer interviews** | Direct quotes, exact phrasing of problems | Verbatim quotes used in copy |
| **Support tickets** | Common questions, frustrations, language | FAQ and objection content |
| **Sales call recordings** | Objections, language patterns, priorities | Rebuttal content, case studies |
| **Community forums** | How customers describe problems to each other | Natural language in headlines and body |
| **Review sites (G2, Capterra)** | What customers praise and criticize | Testimonial content, competitive content |
| **Social listening** | Industry conversations, trending concerns | Timely thought leadership |

### Audience-First Content Rules

- Headlines must use words the audience uses, not internal jargon
- Problem descriptions must match how the audience experiences the problem (not how you define it)
- Value propositions must address what the audience cares about (outcomes, not features)
- Examples must be from the audience's world (their industry, their tools, their workflow)
- Reading level must match the audience (C-suite: concise and strategic; practitioners: detailed and tactical)

### Persona Alignment

Every content piece must declare its target persona:
- **Who** is this for? (Title, role, seniority)
- **What** do they care about? (Goals, KPIs, pressures)
- **Where** are they in the journey? (Awareness, consideration, decision)
- **Why** will they read this? (What problem does this content solve for them?)

### Scoring Guide

- **5** -- Content uses exact VoC language. Target persona explicitly declared and matched. Examples are from the audience's world. Reading level appropriate. Direct customer quotes or data points included. Audience would say "this was written for me."
- **4** -- VoC language used for key concepts. Persona declared. Most examples are relevant. Minor language choices feel internal rather than customer-facing.
- **3** -- Some audience awareness but content is written from the company's perspective, not the reader's. Generic examples. Persona not explicitly declared.
- **2** -- Content speaks at the audience, not to them. Internal jargon present. Examples are irrelevant. Could be about any product for any audience.
- **1** -- Content ignores the audience entirely. Written for internal stakeholders or the company blog calendar, not for readers.

Score <3 = content must be rewritten with audience research.

---

## 3. SEO AUTHORITY

**Question:**
Is the content optimized for search with topic cluster strategy and E-E-A-T signals?

### Topic Cluster Requirements

Content should be organized into topic clusters:

```
Pillar Page (broad topic, high authority)
  |
  |-- Cluster Content 1 (specific subtopic)
  |-- Cluster Content 2 (specific subtopic)
  |-- Cluster Content 3 (specific subtopic)
  |-- Cluster Content 4 (specific subtopic)
```

- Every content piece must belong to an identified topic cluster
- Pillar pages must link to all cluster content and vice versa
- Internal linking structure must reinforce topic authority
- New content should fill gaps in existing clusters before creating new clusters

### E-E-A-T Compliance (Experience, Expertise, Authoritativeness, Trustworthiness)

| Signal | Requirement | How to Demonstrate |
|--------|------------|-------------------|
| **Experience** | First-hand experience with the topic | Include real examples, screenshots, case studies from actual use |
| **Expertise** | Subject matter depth | Author credentials visible, content goes beyond surface level |
| **Authoritativeness** | Recognized source in the space | Earn backlinks, citations, industry mentions |
| **Trustworthiness** | Accurate, transparent, honest | Sources cited, limitations acknowledged, no misleading claims |

### On-Page SEO Requirements

- [ ] Primary keyword in title (H1) and URL
- [ ] Primary keyword in first 100 words
- [ ] Related keywords (LSI) used naturally throughout
- [ ] H2/H3 structure uses keyword variations
- [ ] Meta title (50-60 characters) with primary keyword
- [ ] Meta description (150-160 characters) with compelling CTA
- [ ] Internal links to 3+ related pages
- [ ] External links to 2+ authoritative sources
- [ ] Images with descriptive alt text including keywords
- [ ] Schema markup appropriate for content type (FAQ, HowTo, Article)
- [ ] Page speed optimized (Core Web Vitals passing)

### Scoring Guide

- **5** -- Content is part of a defined topic cluster. All E-E-A-T signals present. On-page SEO fully optimized. Content is the best resource on the internet for this topic. Ranking potential assessed and validated with keyword research.
- **4** -- Topic cluster assignment clear. Most E-E-A-T signals present. On-page SEO complete with minor gaps. Content is competitive for target keyword.
- **3** -- Topic cluster not defined but content fits somewhere. E-E-A-T partially demonstrated. On-page SEO has noticeable gaps. Content is competent but not exceptional.
- **2** -- No topic cluster strategy. E-E-A-T absent. Minimal SEO optimization. Content is unlikely to rank.
- **1** -- No SEO consideration. Content published without keyword research, structure, or optimization.

Score <3 = SEO strategy must be applied before publication.

---

## 4. CRAFT QUALITY

**Question:**
Is the writing clear, engaging, and at the appropriate reading level with strong hooks?

### Readability Standards

| Audience | Flesch-Kincaid Target | Sentence Length | Paragraph Length |
|----------|----------------------|----------------|-----------------|
| General (TOFU) | Grade 7-9 | 15-20 words average | 3-4 sentences max |
| Professional (MOFU) | Grade 9-11 | 18-22 words average | 4-5 sentences max |
| Executive (BOFU) | Grade 10-12 | 20-25 words average | 3-4 sentences max |
| Technical | Grade 12-14 | Variable | Variable with code blocks |

### Hook Requirements

Every piece of content must have:
- **Title hook**: Specific, benefit-driven, curiosity-creating (not clickbait)
- **Opening hook**: First 2 sentences must establish relevance and create reason to continue
- **Section hooks**: Each major section opens with a transition that maintains momentum
- **Closing hook**: Ends with a clear next action, not a vague summary

### Hook Quality Tests

- **The "so what?" test**: If a reader asks "so what?" after the title, the hook fails
- **The scan test**: A reader scanning only headers and bold text should understand the main argument
- **The 5-second test**: The opening must communicate value within 5 seconds of reading
- **The forward motion test**: Every paragraph must make the reader want to read the next one

### Writing Quality Checklist

- [ ] No passive voice (unless intentional for emphasis)
- [ ] No filler words (very, really, basically, actually, just)
- [ ] No weasel words (some, many, often, generally)
- [ ] No sentences longer than 35 words
- [ ] No paragraphs longer than 5 sentences
- [ ] Transitions between sections are smooth
- [ ] Technical terms defined on first use
- [ ] Consistent tense throughout
- [ ] No typos, grammar errors, or broken links

### Scoring Guide

- **5** -- Writing is clear, concise, and compelling. Flesch-Kincaid appropriate for audience. All hooks are strong. Passes the scan test. Zero craft issues. A reader would share this with a colleague.
- **4** -- Writing is good with minor craft issues. Most hooks work. Readability is appropriate. 1-2 sentences could be tightened. Would not embarrass the brand.
- **3** -- Writing is competent but uninspired. Some hooks are weak. Readability slightly off for audience. Several craft issues present. Content is forgettable.
- **2** -- Writing is rough. Hooks are missing or generic. Readability is wrong for audience. Multiple craft issues. Content would not be read to completion.
- **1** -- Writing is poor. No hooks. Wrong reading level. Numerous errors. Content damages brand credibility.

Score <3 = content MUST be rewritten by a stronger writer or editor.

---

## 5. PERSUASION EFFECTIVENESS

**Question:**
Does the content apply proven persuasion principles to move the reader toward the desired action?

### Cialdini's Principles Applied to Content

| Principle | How to Apply | Example |
|-----------|-------------|---------|
| **Reciprocity** | Give value before asking for anything | Free tool, valuable data, actionable advice |
| **Commitment/Consistency** | Get small yeses before asking for the big one | Micro-commitments: download, subscribe, then demo |
| **Social Proof** | Show others like them succeeding | Customer logos, testimonials, case studies, numbers |
| **Authority** | Demonstrate expertise and credibility | Expert quotes, data citations, author credentials |
| **Liking** | Be relatable, empathetic, human | Conversational tone, shared experiences, vulnerability |
| **Scarcity** | Create urgency when genuine | Limited access, time-bound offers, exclusive data |
| **Unity** | Create shared identity | "We" language, community belonging, industry solidarity |

### Persuasion Quality Requirements

- Every content piece should employ at least 3 of the 7 principles
- Principles must be applied authentically (not manipulatively)
- Social proof must be specific and verifiable (not "thousands of customers")
- Authority claims must be backed by evidence
- Scarcity must be genuine (false urgency destroys trust)

### Objection Anticipation

Content should anticipate and address common reader objections:
- "This will not work for my situation" -- address with specific use cases
- "This is too expensive/complex" -- address with ROI data or simplicity proof
- "I have heard this before" -- address with original data or fresh perspective
- "Why should I trust you?" -- address with social proof and transparency

### Scoring Guide

- **5** -- Three or more persuasion principles applied authentically. Reader objections anticipated and addressed. Content moves the reader emotionally and logically toward the desired action. Persuasion is invisible -- the reader feels informed, not sold.
- **4** -- Two or more principles applied. Some objection handling. Content is persuasive but could be stronger in spots. Reader generally moves toward desired action.
- **3** -- One principle applied (usually social proof). Limited objection handling. Content informs but does not persuade. Reader may or may not take action.
- **2** -- No intentional persuasion. Content presents information without motivating action. Reader learns something but has no reason to act.
- **1** -- Content actively undermines persuasion through poor tone, unsubstantiated claims, or manipulation that erodes trust.

Score <3 = content must be revised with intentional persuasion strategy.

---

## 6. ORIGINALITY

**Question:**
Does the content include original research, data, perspectives, or frameworks that cannot be found elsewhere?

### Originality Hierarchy (Highest to Lowest Value)

| Level | Type | Example | Value |
|-------|------|---------|-------|
| **1** | Original research | Surveys, experiments, data analysis you conducted | Highest |
| **2** | Original data | Internal data shared publicly, benchmarks | Very high |
| **3** | Original framework | New model, methodology, or way of thinking | High |
| **4** | Original synthesis | Connecting disparate ideas in a new way | Medium-high |
| **5** | Original perspective | Expert opinion with unique angle | Medium |
| **6** | Curated compilation | Best-of collection with editorial commentary | Low-medium |
| **7** | Rewrite/rehash | Same information repackaged | Low |

### Originality Requirements by Content Type

| Content Type | Minimum Originality Level | Rationale |
|-------------|--------------------------|-----------|
| Thought leadership | Level 1-3 | Must advance the conversation |
| Case studies | Level 2 (original data) | Must contain real customer data |
| Blog posts | Level 4-5 | Must have a unique angle |
| Product content | Level 3-4 | Must frame product uniquely |
| Social content | Level 5-6 | Must have a distinct voice |

### Originality Tests

- **The Google Test**: Search the headline. If the first page of results says the same thing, the content is not original.
- **The "Have I heard this before?" test**: If the main argument feels familiar, the content lacks originality.
- **The citation test**: Can other people cite this content as a source? If not, it adds nothing to the conversation.
- **The data test**: Does this content contain numbers, findings, or insights that only you could produce?

### Scoring Guide

- **5** -- Content includes original research, proprietary data, or a novel framework. Other publications would cite this as a source. Content advances the industry conversation. Cannot be found elsewhere.
- **4** -- Content offers an original perspective or synthesis. Some unique data or examples. Content is distinct from competitors' content on the same topic.
- **3** -- Content has a somewhat unique angle but the core information is available elsewhere. Differentiation is in execution and quality, not in substance.
- **2** -- Content is a competent summary of existing knowledge. No original contribution. Interchangeable with competitor content.
- **1** -- Content is a rehash of obvious information. Adds nothing to the conversation. Could have been generated by anyone with a search engine.

Score <3 = content must be enhanced with original elements before publication.

---

## 7. CONVERSION IMPACT

**Question:**
Does the content effectively drive readers toward a measurable conversion action?

### Conversion Architecture Requirements

Every content piece must have a conversion strategy:

| Component | Requirement | Quality Bar |
|-----------|------------|-------------|
| **Primary CTA** | One clear action per page | Visible without scrolling OR at natural decision point |
| **Secondary CTA** | Alternative for readers not ready for primary | Lower commitment (subscribe vs. demo) |
| **CTA copy** | Action-oriented, benefit-driven | Not "Submit" or "Click Here" -- specific value |
| **CTA placement** | At the natural decision point in the reader's journey | After value delivery, not before |
| **Content-to-CTA bridge** | Logical transition from content to action | Reader understands why the CTA is the natural next step |

### CTA Quality Standards

Effective CTAs must:
- Use first-person language ("Start my free trial" > "Start your free trial")
- State the specific benefit ("See how much you will save" > "Learn more")
- Reduce perceived risk (free, no credit card, 5 minutes, etc.)
- Create urgency only when genuine
- Be visually distinct from surrounding content

### Content-Attributed Pipeline Measurement

Track these metrics for every content piece:
- **Page views**: How many people saw the content
- **Engagement rate**: Scroll depth, time on page
- **CTA click-through rate**: % who clicked
- **Conversion rate**: % who completed the action
- **Pipeline attribution**: $ in pipeline influenced by this content
- **Revenue attribution**: $ in closed-won influenced by this content

### Scoring Guide

- **5** -- Primary and secondary CTAs are compelling and well-placed. Content-to-CTA bridge is seamless. Conversion tracking is in place. Content has demonstrated pipeline attribution. CTA copy is specific and benefit-driven.
- **4** -- CTAs present and appropriate. Bridge is logical. Tracking is in place. Conversion rates are above average. Minor CTA copy improvements possible.
- **3** -- CTAs exist but are generic or poorly placed. Bridge is abrupt. Tracking partially in place. Conversion rates are average or unknown.
- **2** -- CTA is an afterthought. No bridge from content to action. No tracking. Content generates traffic but no pipeline.
- **1** -- No CTA. No conversion strategy. Content is a dead end. Reader has no clear next step.

Score <3 = conversion strategy must be added before publication.

---

## 8. BRAND VOICE CONSISTENCY

**Question:**
Does the content adhere to the established brand voice guidelines?

### Brand Voice Framework

Every company must define (and the Content Brain must enforce) these voice attributes:

| Attribute | Definition | Example Range |
|-----------|-----------|---------------|
| **Tone** | The emotional quality of the writing | Professional but approachable / Casual and witty / Authoritative and direct |
| **Formality** | How formal or informal | First-person plural / Third-person formal / Second-person conversational |
| **Vocabulary** | Word choice patterns | Technical / Plain language / Industry-specific |
| **Cadence** | Sentence rhythm | Short and punchy / Long and flowing / Mixed |
| **Personality** | The "character" behind the words | Mentor / Peer / Expert / Friend |

### Voice Consistency Checklist

- [ ] Tone matches brand guidelines across the entire piece
- [ ] Formality level is consistent (no jarring shifts)
- [ ] Vocabulary aligns with brand word list (preferred/avoided terms)
- [ ] Company/product always referred to in the correct way
- [ ] Personality is consistent with other published content
- [ ] Humor (if used) matches brand guidelines
- [ ] No language that contradicts brand values
- [ ] Consistent use of "we," "you," or company name per guidelines

### Voice Deviation Protocol

Voice deviations are acceptable only when:
- The content is targeting a different audience than usual (documented in brief)
- The format requires a different voice (technical documentation vs. marketing blog)
- A deliberate voice experiment is being tested (A/B test with documented hypothesis)

All deviations must be approved before publication.

### Scoring Guide

- **5** -- Voice is perfectly consistent with brand guidelines. Tone, formality, vocabulary, and personality are indistinguishable from the best examples of brand content. Reads as part of a unified body of work.
- **4** -- Voice is consistent with minor deviations. One or two word choices or tone shifts that could be tightened. Overall, clearly on-brand.
- **3** -- Voice is mostly on-brand but has noticeable inconsistencies. Some sections feel different from others. A new reader might notice the unevenness.
- **2** -- Voice is inconsistent. Multiple sections feel off-brand. Vocabulary, tone, or formality clashes with guidelines. Content feels like it was written by a different company.
- **1** -- Voice is completely off-brand. Content contradicts voice guidelines. Could be published by any company. No brand personality present.

Score <3 = content MUST be rewritten to match brand voice guidelines.

---

## FAILURE CONDITIONS (AUTOMATIC TRIGGERS)

These conditions trigger immediate action regardless of overall score:

### Critical Failures (Publication Stop)

| Condition | Trigger | Required Action |
|-----------|---------|----------------|
| Factual error in published content | Credibility failure | Immediate correction or takedown. Editor review within 4 hours. |
| Brand voice violation in customer-facing content | Brand integrity | Content pulled. Voice review before republication. |
| No CTA on MOFU or BOFU content | Conversion failure | CTA added before publication or content reclassified. |
| Content contradicts another published piece | Consistency failure | Both pieces reviewed. One must be updated or removed. |
| Plagiarized or unattributed content | Legal and ethical failure | Immediate takedown. Attribution added or content rewritten. |
| Content published without tracking | Measurement failure | Tracking added within 24 hours. |
| SEO content published without keyword research | Strategy failure | Content audited and optimized within 1 week. |

### Warning Conditions (Monitoring Required)

| Condition | Trigger | Required Action |
|-----------|---------|----------------|
| Content generates 0 conversions after 30 days | Underperformance | CTA and content audit required |
| Bounce rate >80% on content pages | Engagement failure | Hook and relevance review |
| Content not updated in >12 months | Staleness risk | Content audit and refresh assessment |
| Topic cluster has <3 pieces | Authority gap | Content calendar prioritization |
| No original data in content portfolio for >90 days | Originality drought | Original research initiative required |

---

## FINAL CONTENT SCORE DECISION

**Hard Fail Dimensions (Strategic Alignment, Craft Quality, Brand Voice):**
- Score <3 = CONTENT CANNOT BE PUBLISHED

**All Dimensions:**
- Weighted average >= 4.0 = CONTENT APPROVED FOR PUBLICATION
- Weighted average 3.0-3.9 = REVISION REQUIRED
- Weighted average < 3.0 = CONTENT REJECTED -- REWRITE

**Failure Conditions:**
- Any critical failure = CONTENT STOPPED regardless of score
- Two or more warning conditions = EDITORIAL REVIEW

Scores must be stated explicitly before content is published.

### Score Card Template

```markdown
## Content Score: [Content Title]

**Type:** [Blog / Landing Page / Case Study / Email / Social / Guide]
**Funnel Stage:** [TOFU / MOFU / BOFU / Post-Funnel]
**Target Persona:** [Role, Seniority]
**Business Objective:** [Awareness / Consideration / Decision / Retention]
**Author:** [Name]
**Editor:** [Name]
**Date:** [Date]

| Dimension | Score | Weight | Weighted | Notes |
|-----------|-------|--------|----------|-------|
| Strategic Alignment | /5 | 1.5x | /7.5 | |
| Audience Resonance | /5 | 1.0x | /5.0 | |
| SEO Authority | /5 | 1.0x | /5.0 | |
| Craft Quality | /5 | 1.0x | /5.0 | |
| Persuasion Effectiveness | /5 | 1.0x | /5.0 | |
| Originality | /5 | 1.0x | /5.0 | |
| Conversion Impact | /5 | 1.5x | /7.5 | |
| Brand Voice Consistency | /5 | 1.0x | /5.0 | |

**Weighted Average:** [X.X] / 5.0
**Failure Conditions:** [CLEAR / TRIGGERED -- list any]
**Verdict:** APPROVED / REVISION REQUIRED / REJECTED
**Required Actions:** [if any]
```

---

## SCORING CADENCE

| Activity | Frequency | Scored By |
|----------|-----------|-----------|
| Individual content piece | Before publication | Author + Editor |
| Content portfolio audit | Quarterly | Content Lead |
| Brand voice audit | Quarterly | Editor + Brand Manager |
| SEO performance review | Monthly | Content Lead + SEO Specialist |
| Conversion performance review | Monthly | Content Lead + Growth Team |
| Full scorecard | Quarterly | Content Lead + CMO |

---

## ENFORCEMENT RULE

Content quality is enforced, not hoped for.
Publishing frequency does not override publishing quality.
One excellent piece outperforms ten mediocre pieces.
Do not justify low scores. Rewrite until standards are met.

Content that does not meet scoring thresholds does not publish.
Content that publishes and underperforms is audited and improved.
The goal is not content volume. The goal is content that drives business outcomes.

---

## END OF CONTENT SCORE
