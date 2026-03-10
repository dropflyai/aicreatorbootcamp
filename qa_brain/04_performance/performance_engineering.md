# Performance Engineering — Web Vitals, Optimization, Caching, and CDN Testing

## What This Enables

**Decisions it helps make:**
- Which Core Web Vital to prioritize when multiple metrics are failing simultaneously
- Whether to invest in frontend optimization (bundle splitting, image compression) or backend optimization (query tuning, caching) for maximum user-perceived improvement
- When a caching strategy introduces stale data risk that outweighs the latency benefit
- Which CDN configuration delivers optimal performance for a given geographic user distribution

**Mistakes it prevents:**
- Optimizing Largest Contentful Paint when Cumulative Layout Shift is the actual conversion killer
- Adding a caching layer without invalidation strategy, leading to users seeing stale data for hours
- Over-indexing a database table, improving read performance but degrading write throughput by 10x
- Deploying a CDN without testing cache-hit ratios, paying for infrastructure that serves cache misses

**Outputs it enables:**
- Core Web Vitals dashboards with real user monitoring (RUM) baselines and synthetic monitoring alerts
- Database query optimization reports with before/after execution plans and index recommendations
- Cache architecture documents specifying TTL, invalidation triggers, and consistency guarantees
- Mobile performance budgets calibrated to real device capabilities and network conditions

---

## The Core Insight

Performance engineering is the discipline of making systems fast *where it matters to users*. The critical distinction from performance testing is that performance engineering is proactive and architectural -- it designs for speed rather than measuring speed after the fact. Google's Core Web Vitals framework operationalizes this distinction by measuring what users actually experience: how quickly content appears (LCP), how quickly the page responds to input (INP), and how visually stable the page is during load (CLS). These three metrics capture the majority of user-perceived performance, and they are now ranking signals in Google Search.

The deeper insight is that performance engineering operates at every layer of the stack simultaneously -- frontend rendering pipeline, network transfer, backend computation, database query execution, and caching architecture. Optimizing one layer while ignoring others produces diminishing returns because the bottleneck simply shifts. The engineer who understands all layers and can identify which layer currently constrains user-perceived performance is the one who delivers the highest-impact optimizations.

---

## Core Web Vitals

### Largest Contentful Paint (LCP)

LCP measures the render time of the largest visible content element (image, video poster, text block) in the viewport. It is the primary indicator of perceived load speed.

**Targets:**
| Rating | LCP Time |
|--------|----------|
| Good | <= 2.5 seconds |
| Needs Improvement | 2.5 - 4.0 seconds |
| Poor | > 4.0 seconds |

**LCP Optimization Levers:**

1. **Server response time (TTFB)**: The page cannot render until the HTML document arrives. Optimize server processing time, use CDN for geographic proximity, implement edge-side rendering (ESR) for personalized content.

2. **Resource discovery**: The browser cannot load the LCP image until it discovers the URL. Use `<link rel="preload">` for hero images. Avoid CSS background-image for LCP elements (not discoverable by preload scanner). Inline critical CSS.

3. **Resource load time**: Compress images (WebP/AVIF), implement responsive images (`srcset`), lazy-load below-fold images but *never* lazy-load the LCP image.

4. **Render blocking**: Eliminate render-blocking JavaScript and CSS. Defer non-critical scripts. Inline critical-path CSS. Use `font-display: swap` for web fonts.

```
LCP Waterfall Decomposition:
|-- TTFB (server) --|-- Resource Load --|-- Render --|
|     200ms         |      800ms        |   100ms    |  = 1.1s LCP (Good)
|     800ms         |     1500ms        |   300ms    |  = 2.6s LCP (Needs work)
```

### Interaction to Next Paint (INP)

INP replaced First Input Delay (FID) in March 2024. It measures the latency of *all* user interactions throughout the page lifecycle, not just the first one. The reported value is the worst interaction (at the 98th percentile for pages with many interactions).

**Targets:**
| Rating | INP Time |
|--------|----------|
| Good | <= 200 milliseconds |
| Needs Improvement | 200 - 500 milliseconds |
| Poor | > 500 milliseconds |

**INP Optimization Levers:**

1. **Reduce main thread blocking**: Long tasks (>50ms) on the main thread prevent the browser from processing input. Break long tasks using `requestIdleCallback`, `setTimeout(fn, 0)`, or the `scheduler.yield()` API.

2. **Minimize input delay**: The time between user input and event handler execution. Caused by long tasks already running when the user interacts. Reduce JavaScript execution during likely interaction windows.

3. **Optimize event handlers**: The event handler itself should complete quickly. Defer expensive computation. Use `requestAnimationFrame` for visual updates. Avoid synchronous layout reads (`offsetHeight`, `getBoundingClientRect`) inside event handlers (forced reflow).

4. **Reduce presentation delay**: The time between event handler completion and the next paint. Minimize DOM mutations. Use CSS containment (`contain: layout`) to limit the reflow scope.

### Cumulative Layout Shift (CLS)

CLS measures visual stability -- how much visible content shifts unexpectedly during the page lifecycle. Layout shifts caused by user interaction (clicking a button that reveals content) are excluded.

**Targets:**
| Rating | CLS Score |
|--------|-----------|
| Good | <= 0.1 |
| Needs Improvement | 0.1 - 0.25 |
| Poor | > 0.25 |

**CLS Prevention Strategies:**

1. **Explicit dimensions on media**: Always set `width` and `height` attributes on `<img>` and `<video>` elements. Use CSS `aspect-ratio` for responsive containers.

2. **Reserve space for dynamic content**: Ads, embeds, and lazy-loaded content must have pre-allocated space (skeleton screens, min-height containers).

3. **Avoid injecting content above existing content**: Banners, cookie notices, and notification bars should push content down from the top or overlay without shifting.

4. **Web font loading**: Use `font-display: optional` or `font-display: swap` with size-adjusted fallback fonts to prevent font-swap layout shifts.

---

## Mobile Performance

### The Mobile Performance Gap

Mobile devices have fundamentally different performance characteristics than desktop:

| Factor | Desktop | Mobile (Mid-range) | Implication |
|--------|---------|-------------------|-------------|
| CPU | 8+ cores, 3+ GHz | 4-8 cores, 1.8-2.2 GHz | JavaScript execution 3-5x slower |
| RAM | 16-32 GB | 3-6 GB | Aggressive tab killing, limited caching |
| Network | 100+ Mbps wired | 5-25 Mbps 4G, variable | Resource loading dominated by network |
| Thermal throttling | Rare | Common under sustained load | Performance degrades during extended sessions |
| GPU | Dedicated, powerful | Integrated, limited | Complex CSS animations cause jank |

**Mobile-specific testing protocol:**
1. Test on real mid-range devices (not flagships) -- Samsung Galaxy A-series, Pixel A-series
2. Simulate 4G network conditions (1.6 Mbps down, 750 Kbps up, 150ms RTT)
3. Test with CPU throttling (4x slowdown in DevTools)
4. Test thermal throttling by running tests after 5 minutes of sustained interaction
5. Test with low-memory conditions (simulate with DevTools memory pressure)

---

## Database Query Optimization

### The Query Optimization Workflow

```
1. Identify slow queries
   └── APM tools, slow query logs (>100ms threshold)
        └── pg_stat_statements (PostgreSQL)
        └── Performance Schema (MySQL)

2. Analyze execution plans
   └── EXPLAIN ANALYZE (PostgreSQL)
   └── EXPLAIN FORMAT=JSON (MySQL)
        └── Look for: Sequential scans on large tables
        └── Look for: Nested loop joins on unindexed columns
        └── Look for: Sort operations on non-indexed columns
        └── Look for: Hash joins consuming excessive memory

3. Apply optimizations (in priority order)
   └── Add missing indexes (highest ROI)
   └── Rewrite queries (eliminate N+1, use JOINs)
   └── Add covering indexes (index includes all selected columns)
   └── Denormalize for read-heavy workloads
   └── Implement materialized views for complex aggregations
   └── Partition large tables (time-based, hash-based)

4. Validate improvements
   └── Re-run EXPLAIN ANALYZE
   └── Measure under concurrent load (not just single-query)
   └── Verify write performance not degraded by new indexes
```

**The N+1 Query Problem:**
```
BAD: 1 query for 100 orders + 100 queries for order items = 101 queries
     SELECT * FROM orders LIMIT 100;
     -- For each order:
     SELECT * FROM order_items WHERE order_id = ?;

GOOD: 2 queries total
     SELECT * FROM orders LIMIT 100;
     SELECT * FROM order_items WHERE order_id IN (1,2,3,...,100);

BEST: 1 query with JOIN
     SELECT o.*, oi.* FROM orders o
     JOIN order_items oi ON oi.order_id = o.id
     LIMIT 100;
```

---

## Caching Strategies

### Cache Hierarchy

```
User Request
    │
    ▼
┌─────────────────┐
│ Browser Cache    │  Fastest, per-user, limited by device storage
│ (HTTP headers)   │  Cache-Control, ETag, Last-Modified
└────────┬────────┘
         │ Cache miss
         ▼
┌─────────────────┐
│ CDN Edge Cache   │  Geographic proximity, shared across users
│ (CloudFront,     │  TTL-based, cache keys, vary headers
│  Cloudflare)     │
└────────┬────────┘
         │ Cache miss
         ▼
┌─────────────────┐
│ Application Cache│  In-memory (Redis, Memcached)
│ (Redis/Memcached)│  TTL + event-driven invalidation
└────────┬────────┘
         │ Cache miss
         ▼
┌─────────────────┐
│ Database Query   │  Query result cache, materialized views
│ Cache            │  Invalidated on write
└────────┬────────┘
         │ Cache miss
         ▼
┌─────────────────┐
│ Database         │  Source of truth
│ (PostgreSQL,     │
│  MySQL)          │
└─────────────────┘
```

### Cache Invalidation Patterns

| Pattern | Mechanism | Consistency | Complexity |
|---------|-----------|-------------|------------|
| TTL-based | Cache expires after fixed duration | Eventually consistent | Low |
| Write-through | Write updates cache synchronously | Strongly consistent | Medium |
| Write-behind | Write queues cache update asynchronously | Eventually consistent | High |
| Event-driven | Publish invalidation events on data change | Near-real-time | Medium |
| Cache-aside | Application checks cache, loads from DB on miss | Eventually consistent | Low |

**Testing cache effectiveness:**
- Measure cache hit ratio (target: >90% for static, >70% for dynamic)
- Verify TTL appropriateness (stale data duration vs. origin load reduction)
- Test cache thundering herd (many concurrent misses for same key after expiry)
- Validate invalidation correctness (update data, verify cache reflects change within SLA)
- Load test with cold cache to understand worst-case performance

---

## CDN Testing

### CDN Performance Validation

1. **Geographic latency testing**: Measure TTFB from multiple global locations (use synthetic monitoring from 20+ locations)
2. **Cache hit ratio**: Monitor X-Cache headers; target >95% for static assets, >80% for cacheable API responses
3. **Origin shield effectiveness**: Verify that CDN edge misses hit a shield/mid-tier cache before reaching origin
4. **Purge latency**: Measure time from cache invalidation request to global purge completion
5. **Compression**: Verify Brotli/gzip compression is applied for text-based assets
6. **HTTP/2 and HTTP/3**: Validate multiplexing, server push, and 0-RTT connection resumption

---

## Failure Modes

1. **Optimizing metrics nobody measures in production**: Perfecting Lighthouse scores in synthetic tests while ignoring RUM data showing real users on slow networks experience 8-second LCP. Synthetic testing calibrates; RUM validates.

2. **Cache without invalidation strategy**: Adding Redis caching for "speed" without defining when cached data becomes stale. Users see outdated prices, inventory, or content. Every cache entry needs a defined staleness tolerance and invalidation trigger.

3. **Over-indexing databases**: Adding indexes for every slow query without considering write amplification. Each index is updated on every INSERT/UPDATE/DELETE. A table with 15 indexes can have write throughput 10x slower than one with 3 targeted indexes.

4. **Ignoring mobile thermal throttling**: Testing mobile performance in a fresh browser session. After 3-5 minutes of sustained JavaScript execution, mobile CPUs throttle by 30-50%, making real-world performance significantly worse than lab tests.

5. **CDN caching personalized content**: Serving user-specific responses (account pages, cart contents, recommendations) from CDN cache without proper Vary headers or cache keys. One user sees another user's data -- a privacy and correctness disaster.

6. **Premature optimization without profiling**: Rewriting code for "performance" based on intuition rather than profiling data. The actual bottleneck is rarely where developers expect it. Profile first, optimize second.

---

## The Operator's Framework

**Step 1: Measure Baseline with Real User Data**
- Deploy RUM (Real User Monitoring) to capture Core Web Vitals from actual users
- Segment by device type, network speed, and geography
- Identify the worst-performing segments (mobile + slow network + distant geography)

**Step 2: Identify the Dominant Bottleneck**
- Use waterfall analysis (WebPageTest, Chrome DevTools) to decompose page load
- Determine whether the constraint is server (TTFB), network (resource loading), or client (rendering/JavaScript)
- For backend: use APM to identify slow endpoints, slow queries, missing caches

**Step 3: Apply Targeted Optimizations**
- Fix the largest bottleneck first (Amdahl's Law: optimizing a non-bottleneck yields negligible improvement)
- Implement the optimization and measure the delta
- Repeat: the next bottleneck is now dominant

**Step 4: Establish Performance Budgets**
- Set quantified targets for LCP, INP, CLS, TTFB, bundle size, image weight
- Encode budgets as CI/CD quality gates (Lighthouse CI, bundlesize, performance budget plugins)
- Alert on regression (notify when any metric degrades by >10% from baseline)

**Step 5: Continuous Monitoring**
- RUM for real user experience tracking
- Synthetic monitoring for consistent benchmarking across releases
- APM for backend performance trending
- Weekly performance review comparing RUM p75 trends

---

## Summary

**Key Principles:**

1. Core Web Vitals (LCP, INP, CLS) are the authoritative measures of user-perceived performance -- optimize what users experience, not what servers report.
2. Mobile performance on mid-range devices over 4G networks is the true performance baseline, not desktop on gigabit fiber -- design for the constrained case.
3. Every caching layer requires a defined invalidation strategy with explicit staleness tolerance -- cache without invalidation is a data consistency time bomb.
4. Database query optimization follows the 80/20 rule: the top 10 slowest queries typically account for 80% of database load -- profile before optimizing.
5. Performance engineering is iterative bottleneck elimination: fix the dominant constraint, measure, then address the next constraint that emerges.

---

## Cross-References

- `04_performance/performance_testing.md` -- Load testing tools and capacity planning
- `04_performance/scalability_testing.md` -- Scaling validation and distributed performance
- `05_specialized/mobile_testing.md` -- Mobile-specific testing strategies
- `06_ci_cd/monitoring_observability.md` -- Production monitoring and alerting
- `06_ci_cd/ci_cd_testing.md` -- CI/CD pipeline quality gates
