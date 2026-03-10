# Technical SEO — Crawlability, Core Web Vitals, Schema, Site Architecture, JavaScript SEO

## Overview

Technical SEO is the infrastructure layer of search visibility. Without a
technically sound foundation, even exceptional content will fail to rank.
This module covers the five pillars of technical SEO: crawlability and
indexation, Core Web Vitals performance, structured data markup, site
architecture, and JavaScript rendering. These disciplines sit at the
intersection of engineering and content strategy, requiring collaboration
across both domains.

---

## Pillar 1: Crawlability and Indexation

### How Search Engines Discover Content

Googlebot and other crawlers discover content through three primary
mechanisms:

**Link-Based Discovery**
Crawlers follow hyperlinks from known pages to discover new URLs. The
internal linking structure of a site is the single most important factor
in ensuring complete crawl coverage. Pages with zero internal links
pointing to them (orphan pages) will rarely, if ever, be crawled.

**Sitemap-Based Discovery**
XML sitemaps provide a direct signal to search engines about which URLs
exist and their relative priority. Sitemaps should include:
- Only indexable, canonical URLs (200 status, no noindex)
- Accurate `<lastmod>` dates reflecting actual content changes
- Priority values reflecting genuine editorial hierarchy
- Segmented files for large sites (news, video, image sitemaps)

**API-Based Submission**
Google's Indexing API and IndexNow protocol allow real-time URL submission.
The Indexing API is officially supported for JobPosting and
BroadcastEvent schema types, though empirical evidence suggests broader
effectiveness. IndexNow, supported by Bing and Yandex, provides instant
notification of content changes.

### Crawl Budget Management

Crawl budget—the number of pages Googlebot will crawl in a given
timeframe—is a binding constraint for sites exceeding 10,000 pages.

**Crawl Rate Limit**
The maximum crawl speed Googlebot will use without degrading server
performance. Managed through:
- Server response times under 200ms (measured at the server, not CDN)
- HTTP/2 support for multiplexed connections
- Clean robots.txt without overly broad Disallow directives
- Avoiding soft errors (200 status with error page content)

**Crawl Demand**
Google's assessment of how valuable crawling a URL will be, based on:
- Popularity (external link signals, traffic, brand queries)
- Staleness (how long since last crawl vs. expected update frequency)
- URL type (product pages vs. faceted navigation duplicates)

**Crawl Budget Optimization Tactics**
- Canonicalize duplicate content (parameter variations, sort orders)
- Return proper 404/410 for deleted content instead of soft errors
- Block low-value pages via robots.txt (internal search, session URLs)
- Implement pagination with rel="next"/"prev" or load-more patterns
- Monitor crawl stats in Google Search Console for anomalies

### Robots.txt Directives

```
User-agent: *
Disallow: /search/
Disallow: /internal/
Disallow: /api/
Allow: /api/public/

Sitemap: https://example.com/sitemap-index.xml
```

Critical rules:
- Robots.txt blocks crawling, not indexing (URLs can still appear in
  SERPs if linked externally)
- Use `noindex` meta tags or X-Robots-Tag headers to prevent indexing
- Never block CSS or JavaScript files needed for rendering
- Test directives in Google Search Console's robots.txt tester

### Canonical Tags and Duplicate Content

The `rel="canonical"` tag is the primary signal for specifying the
preferred version of duplicate or near-duplicate content.

**Canonical Implementation Rules**
- Self-referencing canonicals on every page (defensive best practice)
- Cross-domain canonicals when syndicating content
- Canonical must return 200 status (not redirect, not 404)
- Canonical page must have substantially similar content
- Only one canonical per page (multiple signals conflict)
- Canonical is a hint, not a directive—Google may override

---

## Pillar 2: Core Web Vitals

### The Three Metrics

Google's Core Web Vitals (CWV) are quantitative measures of real-user
experience that function as ranking signals.

**Largest Contentful Paint (LCP)**
Measures loading performance—how long until the largest visible content
element renders.
- Good: <= 2.5 seconds
- Needs Improvement: 2.5–4.0 seconds
- Poor: > 4.0 seconds

Optimization strategies:
- Preload the LCP resource (hero image, above-fold text block)
- Use responsive images with srcset and sizes attributes
- Implement CDN with edge caching for static assets
- Eliminate render-blocking CSS and JavaScript
- Server-side render above-the-fold content

**Interaction to Next Paint (INP)**
Replaced First Input Delay (FID) in March 2024. Measures responsiveness
across the entire page lifecycle, not just the first interaction.
- Good: <= 200 milliseconds
- Needs Improvement: 200–500 milliseconds
- Poor: > 500 milliseconds

Optimization strategies:
- Break long JavaScript tasks into smaller chunks (yield to main thread)
- Use `requestIdleCallback` for non-critical work
- Debounce input handlers (search, filtering)
- Minimize DOM size (target under 1,500 nodes)
- Avoid layout thrashing (batch DOM reads/writes)

**Cumulative Layout Shift (CLS)**
Measures visual stability—unexpected layout shifts during page load.
- Good: <= 0.1
- Needs Improvement: 0.1–0.25
- Poor: > 0.25

Optimization strategies:
- Set explicit width and height on images and iframes
- Reserve space for dynamically injected content (ads, embeds)
- Use `font-display: optional` or preload web fonts
- Avoid inserting content above existing content after load
- Use CSS `contain` property for isolated layout contexts

### Field Data vs. Lab Data

CWV ranking signals use field data (real user metrics from Chrome User
Experience Report), not lab data (Lighthouse, PageSpeed Insights
simulations). Prioritize CrUX data over synthetic benchmarks.

---

## Pillar 3: Structured Data and Schema Markup

### Schema.org Vocabulary

Schema.org provides a shared vocabulary for structured data that search
engines use to generate rich results (featured snippets, knowledge
panels, carousels, FAQs).

**Implementation Formats**
- JSON-LD (recommended by Google): Embedded in `<script>` tags, decoupled
  from HTML structure, easiest to maintain
- Microdata: Inline HTML attributes, tightly coupled to markup
- RDFa: XML-based, used primarily in academic and government contexts

**High-Impact Schema Types for Content**

| Schema Type | Rich Result | Content Application |
|-------------|-------------|---------------------|
| Article | Article carousel, breadcrumbs | Blog posts, news |
| FAQPage | Expandable FAQ in SERPs | FAQ sections |
| HowTo | Step-by-step display | Tutorials, guides |
| BreadcrumbList | Breadcrumb trail in SERPs | Navigation hierarchy |
| Organization | Knowledge panel | About pages |
| Product | Product card with pricing | Product reviews |
| VideoObject | Video carousel | Video content |
| SpeakableSpecification | Voice search eligibility | Key content sections |

### Validation and Testing

- Google Rich Results Test for SERP preview
- Schema Markup Validator (schema.org) for syntax correctness
- Google Search Console Enhancement reports for production monitoring
- Structured Data Linter for comprehensive error detection

---

## Pillar 4: Site Architecture

### Information Architecture for SEO

Site architecture determines how link equity flows through a site, how
crawlers discover content, and how users navigate. The ideal architecture
is shallow (3 clicks from homepage to any page), logical (category
hierarchy mirrors user mental models), and well-linked (every important
page has multiple internal links).

**Hub-and-Spoke Model**
- Hub pages (pillar content) target broad, high-volume keywords
- Spoke pages (cluster content) target specific long-tail queries
- Internal links flow from spokes to hub and between related spokes
- Breadcrumbs reinforce hierarchical relationships

**URL Structure Best Practices**
- Descriptive, keyword-inclusive paths: `/blog/seo/technical-seo-guide`
- Consistent hierarchy: `/{category}/{subcategory}/{page-slug}`
- Lowercase, hyphen-separated (never underscores or camelCase)
- Avoid query parameters for content pages
- Keep URLs under 115 characters for full SERP display

### Internal Linking Strategy

Internal links distribute PageRank, establish topical relevance, and
guide crawlers. An intentional internal linking strategy is the highest-
leverage technical SEO activity.

**Contextual Links**
In-content links from relevant paragraphs carry more weight than
navigational links. Use descriptive anchor text that matches the target
page's keyword intent. Avoid generic anchors ("click here," "read more").

**Programmatic Links**
Related posts, "you might also like," breadcrumbs, and category pages
create automated internal link structures. Ensure these components render
in HTML, not solely via JavaScript.

---

## Pillar 5: JavaScript SEO

### The Rendering Challenge

JavaScript-rendered content introduces a critical delay in indexing.
Google's rendering pipeline operates in two phases:

1. **Crawl phase**: Googlebot fetches HTML, discovers links, processes
   meta tags. Content not in initial HTML is invisible at this stage.
2. **Render phase**: Google's Web Rendering Service (WRS) executes
   JavaScript. This phase can be delayed hours to weeks depending on
   crawl budget and render queue depth.

### Rendering Strategies

**Server-Side Rendering (SSR)**
Content is rendered on the server and delivered as complete HTML. Optimal
for SEO—all content is visible at crawl time. Frameworks: Next.js,
Nuxt.js, Remix.

**Static Site Generation (SSG)**
Pages are pre-rendered at build time. Maximum performance and
crawlability. Ideal for content that changes infrequently. Frameworks:
Next.js (static export), Astro, Hugo, Eleventy.

**Dynamic Rendering**
Serves pre-rendered HTML to crawlers and client-rendered content to
users. Google considers this acceptable but not recommended long-term.
Tools: Rendertron, Puppeteer, Prerender.io.

**Client-Side Rendering (CSR)**
All content rendered in the browser via JavaScript. Highest risk for SEO.
Acceptable only for authenticated/personalized content that does not need
indexing. Avoid for any content targeting organic search.

### JavaScript SEO Audit Checklist

- Compare `view-source:` HTML with rendered DOM (Chrome DevTools)
- Test with Google's URL Inspection tool (live test)
- Verify internal links are `<a href="">` elements, not click handlers
- Confirm meta tags (title, description, canonical) render server-side
- Check that lazy-loaded images use `loading="lazy"` with proper `src`
- Validate that JavaScript errors do not prevent content rendering
- Ensure robots meta tags are in initial HTML, not injected by JS
- Monitor Coverage report in Search Console for "Discovered - currently
  not indexed" (common symptom of render-dependent content)

---

## Integration with Content Strategy

Technical SEO is not a standalone discipline—it is the delivery mechanism
for content strategy. The Content Brain must collaborate with the
Engineering Brain to ensure:
- Content management systems generate clean, crawlable HTML
- Publishing workflows include schema markup and canonical tags
- Content migration plans account for redirect mapping
- Performance budgets protect Core Web Vitals scores
- New content features (interactive tools, embeds) are render-tested

---

## Key References

- Google Search Central documentation (developers.google.com)
- Screaming Frog SEO Spider user guide
- web.dev Core Web Vitals documentation
- Schema.org full type hierarchy
- Martin Splitt (Google) JavaScript SEO presentations
- Aleyda Solis, *International SEO* (O'Reilly)
- Google Search Quality Evaluator Guidelines (E-E-A-T framework)

---

## Summary

Technical SEO ensures that content is discoverable, renderable, and
performant. Without proper crawlability controls, content remains
invisible to search engines. Without Core Web Vitals optimization,
content suffers ranking penalties from poor user experience. Without
structured data, content forfeits rich result opportunities. Without
sound architecture, link equity dissipates across low-value pages.
Without JavaScript SEO awareness, modern web applications risk complete
indexation failure. Master these five pillars, and the content you create
will reach the audience it deserves.
