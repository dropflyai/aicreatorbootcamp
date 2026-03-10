# SEO Strategy — Technical, On-Page, Off-Page, and SEO for AI

## SEO as a Demand Generation Channel

Search engine optimization is the practice of increasing the quality and quantity
of organic traffic by improving visibility in search engine results pages (SERPs).
For B2B SaaS companies, SEO is uniquely powerful because it captures demand at the
moment of highest intent — when a buyer is actively searching for a solution to
their problem.

Unlike paid media (which stops generating traffic when you stop paying), SEO
compounds over time. A well-optimized page published today can generate traffic
for years. This compounding characteristic makes SEO one of the highest-ROI
marketing channels, but it requires patience: meaningful results typically take
6-12 months, and sustainable competitive advantage takes 18-36 months.

---

## Technical SEO

### Site Architecture

Technical SEO ensures search engines can efficiently crawl, index, and understand
your website. Without technical foundations, even the best content will not rank.

**Core Technical Requirements:**

| Element | Standard | Diagnostic Tool |
|---------|---------|----------------|
| Site Speed | LCP <2.5s, FID <100ms, CLS <0.1 | Google PageSpeed Insights, Core Web Vitals |
| Mobile Responsiveness | Fully responsive, mobile-first design | Google Mobile-Friendly Test |
| SSL Certificate | HTTPS on all pages | Browser check, SSL Labs |
| XML Sitemap | Auto-generated, submitted to Google/Bing | Screaming Frog, Google Search Console |
| Robots.txt | Properly configured (no unintentional blocks) | Google Search Console |
| Canonical Tags | Prevent duplicate content issues | Screaming Frog audit |
| Structured Data | Schema markup for key page types | Google Rich Results Test |
| Crawl Budget | Efficient use of Googlebot's crawl allocation | Google Search Console, log file analysis |
| Internal Linking | Logical site hierarchy, contextual links | Screaming Frog, Ahrefs |
| 404 Management | Redirects for broken pages, custom 404 page | Google Search Console |

### Site Architecture for B2B SaaS

```
Homepage
├── Product Pages (1 per product/feature category)
│   ├── Feature Page 1
│   ├── Feature Page 2
│   └── Feature Page 3
├── Solutions Pages (1 per use case or industry vertical)
│   ├── [Industry A] Solution
│   ├── [Industry B] Solution
│   └── [Use Case C] Solution
├── Resources (Blog, Guides, Reports)
│   ├── Blog (topic clusters)
│   ├── Guides (long-form, gated or ungated)
│   └── Reports (data-driven, annual)
├── Customers (Case Studies, Testimonials)
├── Pricing
├── Company (About, Careers, Contact)
└── Docs/API (if applicable)
```

### Core Web Vitals Optimization

| Metric | Threshold | Optimization Tactics |
|--------|----------|---------------------|
| LCP (Largest Contentful Paint) | <2.5 seconds | Optimize images (WebP), lazy loading, CDN, preload critical assets |
| FID (First Input Delay) / INP | <100ms / <200ms | Minimize JavaScript, defer non-critical scripts, code splitting |
| CLS (Cumulative Layout Shift) | <0.1 | Set image dimensions, avoid injected content, font-display swap |

---

## On-Page SEO

### Keyword Strategy

**Keyword Research Process:**
1. Seed keywords from product, features, and use cases
2. Expand with competitor analysis (what do they rank for?)
3. Validate with search volume, difficulty, and intent data
4. Map keywords to content types and funnel stages
5. Prioritize by: volume x intent x ranking feasibility

**Keyword Intent Classification:**

| Intent | Signal Words | Content Type | Funnel Stage |
|--------|-------------|-------------|-------------|
| Informational | "what is", "how to", "guide", "examples" | Blog post, guide | Awareness |
| Navigational | Brand names, product names | Homepage, product page | Consideration |
| Commercial | "best", "top", "vs", "review", "comparison" | Comparison page, review content | Consideration |
| Transactional | "pricing", "demo", "free trial", "buy" | Pricing, demo, trial page | Decision |

### Topic Clusters (Pillar-Cluster Model)

Topic clusters organize content around a pillar page (broad topic) supported by
cluster pages (specific subtopics) connected through internal linking:

```
                    ┌──────────────┐
                    │  PILLAR PAGE │
                    │  (Broad Topic)│
                    └──────┬───────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────┴──────┐ ┌──────┴──────┐ ┌──────┴──────┐
   │ Cluster 1   │ │ Cluster 2   │ │ Cluster 3   │
   │ (Subtopic)  │ │ (Subtopic)  │ │ (Subtopic)  │
   └─────────────┘ └─────────────┘ └─────────────┘
```

**Example for "Sales Pipeline Management":**
- Pillar: Complete Guide to Sales Pipeline Management
- Cluster 1: Pipeline Stages and Exit Criteria
- Cluster 2: Pipeline Velocity Formula
- Cluster 3: Pipeline Coverage Ratios
- Cluster 4: Sales Forecasting Methods
- Cluster 5: Pipeline Hygiene Best Practices

### On-Page Optimization Checklist

| Element | Best Practice |
|---------|-------------|
| Title Tag | Primary keyword + benefit, 50-60 characters |
| Meta Description | Compelling summary + CTA, 150-160 characters |
| H1 | One per page, includes primary keyword |
| H2/H3 | Hierarchical, include secondary keywords naturally |
| URL | Short, descriptive, includes keyword, no dates |
| First 100 Words | Include primary keyword naturally |
| Image Alt Text | Descriptive, keyword-relevant where natural |
| Internal Links | 3-5 contextual links to related content |
| External Links | 1-3 links to authoritative sources |
| Content Length | Match or exceed top-ranking competitor length |
| Schema Markup | Article, FAQ, HowTo, or Product schema as appropriate |
| CTA | Clear conversion opportunity relevant to the content |

---

## Off-Page SEO

### Link Building Strategy

Backlinks from authoritative domains remain the strongest ranking signal. Quality
vastly outweighs quantity — one link from a DA 70+ domain is worth more than 100
links from DA 20 domains.

**Link Acquisition Tactics by Effectiveness:**

| Tactic | Effort | Quality | Scalability |
|--------|--------|---------|-------------|
| Original Research/Data | High | Very High | Medium |
| Guest Posting (authoritative sites) | Medium | High | Medium |
| Digital PR (newsworthy content) | High | Very High | Low |
| Broken Link Building | Medium | Medium | Medium |
| Resource Page Outreach | Low | Medium | High |
| HARO/Expert Quotes | Low | Medium-High | Medium |
| Partnership/Co-Marketing Links | Medium | High | Low |
| Tool/Calculator Creation | High | Very High | Medium |

### Digital PR for SEO

Create content designed to earn press coverage and links:

**Newsworthy Content Types:**
- Original research with surprising findings
- Industry benchmark reports with new data
- Trend analysis with data visualization
- Expert predictions and contrarian takes
- Tools and calculators that media references

---

## E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)

Google's quality rater guidelines emphasize E-E-A-T as a signal for content quality:

**Experience:** Does the content reflect first-hand experience?
- Include real examples, case studies, and practitioner perspective
- Author bios should demonstrate relevant experience

**Expertise:** Is the content created by a knowledgeable source?
- Byline articles from subject matter experts
- Cite peer-reviewed sources and industry data

**Authoritativeness:** Is the source recognized as an authority?
- Build author profiles with cross-platform presence
- Earn mentions and links from authoritative industry sources

**Trustworthiness:** Can the content and source be trusted?
- Cite sources for all data claims
- Update content regularly (freshness)
- Transparent about methodology and limitations
- Security (HTTPS), privacy, and editorial standards

---

## SEO for AI (GEO — Generative Engine Optimization)

### The AI Search Revolution

With ChatGPT, Perplexity, Google AI Overviews, and Microsoft Copilot increasingly
serving as search interfaces, SEO must evolve to optimize for AI-generated answers.
This emerging discipline is called GEO (Generative Engine Optimization) or AEO
(Answer Engine Optimization).

### How AI Search Differs from Traditional Search

| Dimension | Traditional Search | AI Search |
|-----------|-------------------|-----------|
| Results Format | 10 blue links | Synthesized answer with citations |
| Traffic Model | Click to website | Answer delivered in-chat (zero-click) |
| Ranking Factors | Backlinks, keywords, technical SEO | Source authority, answer quality, citation likelihood |
| Content Format | Web pages | Structured, quotable content blocks |
| User Behavior | Scan titles, click, evaluate | Ask question, receive answer, possibly click citation |

### GEO Optimization Tactics

**1. Structure Content for Extraction**
AI models prefer content that is structured, quotable, and definitional:
- Use clear headings that match common questions
- Provide concise definitions and explanations (1-2 sentences)
- Use tables, lists, and structured data
- Include specific numbers and data points (AI loves citing specific metrics)

**2. Build Source Authority**
AI models weight sources based on authority signals:
- Domain authority (high DA = more likely to be cited)
- Topical authority (consistent coverage of a topic)
- Freshness (recently updated content)
- Citation by other authoritative sources

**3. Optimize for Questions**
AI search is query-driven. Optimize for the specific questions buyers ask:
- FAQ sections with clear, direct answers
- "What is [term]?" definitions at the top of relevant pages
- "How to [task]" step-by-step guides
- Comparison content ("X vs. Y")

**4. Create Citable Content**
Content that gets cited by AI models shares characteristics:
- Original data and research (unique, not available elsewhere)
- Expert commentary with named attribution
- Specific, authoritative definitions
- Practical frameworks with clear terminology

**5. Monitor AI Visibility**
Track whether your brand and content appear in AI-generated answers:
- Search your brand and key terms in ChatGPT, Perplexity, and Google AI Overviews
- Note which sources are cited for your target topics
- Identify content gaps where competitors are cited but you are not
- Track share of AI-generated citations over time

---

## SEO Measurement

### Key SEO Metrics

| Metric | Source | Frequency | Target |
|--------|--------|-----------|--------|
| Organic Traffic | Google Analytics / GA4 | Weekly | Growing month-over-month |
| Keyword Rankings | Ahrefs, SEMrush, GSC | Weekly | Top 10 for target keywords |
| Domain Authority | Ahrefs, Moz | Monthly | Increasing trend |
| Referring Domains | Ahrefs | Monthly | Increasing trend |
| Organic CTR | Google Search Console | Monthly | >3% average |
| Pages Indexed | Google Search Console | Monthly | Matching sitemap |
| Core Web Vitals | Google Search Console | Monthly | All "Good" |
| Organic Conversions | GA4 + CRM | Monthly | Pipeline attribution |
| AI Citation Share | Manual audit | Monthly | Increasing presence |

### SEO Reporting Dashboard

| Section | Metrics | Visualization |
|---------|---------|---------------|
| Traffic Overview | Sessions, users, new users | Line chart (MoM, YoY) |
| Keyword Performance | Rankings by target keyword | Table with trend arrows |
| Content Performance | Top pages by traffic, conversions | Ranked table |
| Technical Health | Core Web Vitals, crawl errors | Status indicators |
| Backlink Profile | New referring domains, DA distribution | Bar chart |
| Competitive Position | Share of voice vs. competitors | Competitive chart |
| Revenue Attribution | Organic-sourced pipeline and revenue | Waterfall chart |

---

**SEO is the foundation of sustainable organic growth. It requires patience,
technical precision, and relentless content quality — but the compounding returns
make it the highest-ROI marketing channel for organizations with the discipline
to invest long-term.**
