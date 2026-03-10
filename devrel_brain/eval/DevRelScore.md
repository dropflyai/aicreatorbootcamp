# DevRel Score — Quality Enforcement (Authoritative)

This document defines how Developer Relations quality is evaluated.
Every DevRel initiative must be scored before it is considered complete.

If quality is not measurable, it is not enforced.

---

## SCORING RULES (MANDATORY)

Each initiative must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate remediation required:
- **Developer Experience**
- **Documentation Quality**
- **SDK Quality**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2
- Attribution is evaluated holistically, not as a hard fail

### Weighting
Developer Experience and Documentation Quality carry 1.5x weight in the
final average. These are the foundation everything else depends on.

---

## 1. DEVELOPER EXPERIENCE (DX)

**Question:**
Can a new developer go from zero to "Hello World" in under 5 minutes?

### What to Evaluate
- Time-to-hello-world (TTFHW): measured from landing page to working code
- Onboarding friction points: number of steps, decisions, and blockers
- Error message quality: are errors actionable, specific, and copy-pasteable?
- Setup complexity: dependencies, configuration, environment requirements
- First-run experience: does the developer feel momentum or frustration?
- Quickstart accuracy: do quickstart guides actually work on a clean machine?
- Progressive complexity: does the learning curve feel intentional?

### Scoring Guide
- **5** — TTFHW < 2 minutes. Zero-config setup. Errors guide the fix.
        Quickstart works perfectly on first try. Developer feels delight.
- **4** — TTFHW < 5 minutes. Minor config required. Errors are clear.
        Quickstart works with one minor adjustment. Developer feels confident.
- **3** — TTFHW < 15 minutes. Some googling required. Errors are generic.
        Quickstart has gaps. Developer feels uncertain but not blocked.
- **2** — TTFHW < 30 minutes. Significant configuration. Errors are cryptic.
        Quickstart is outdated. Developer feels frustrated.
- **1** — TTFHW > 30 minutes or impossible without human help. Setup is painful.
        Errors are stack traces with no context. Developer gives up.

### Hard Fail Criteria
- Score < 3 = **IMMEDIATE REMEDIATION REQUIRED**
- TTFHW > 15 minutes on any supported platform = automatic score cap at 2
- Any quickstart that does not work on a clean machine = automatic score cap at 2
- Error messages that expose internal implementation details = deduct 1 point

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Time-to-hello-world | < 5 min | Timed user testing |
| Quickstart success rate | > 95% | Clean machine testing monthly |
| Setup support tickets | < 5% of new users | Support ticket analysis |
| Error message helpfulness | > 4.0/5.0 | Developer survey |
| Onboarding completion rate | > 80% | Funnel analytics |
| First API call within 1 hour | > 90% | API analytics |

---

## 2. DOCUMENTATION QUALITY

**Question:**
Can a developer find the answer to their question in under 2 minutes?

### What to Evaluate
- **Divio Framework Coverage:**
  - Tutorials (learning-oriented): complete, tested, progressive
  - How-to Guides (problem-oriented): task-focused, scannable, working code
  - Explanation (understanding-oriented): concepts, architecture, trade-offs
  - Reference (information-oriented): complete, accurate, auto-generated where possible
- Search findability: can developers find content via search in < 30 seconds?
- Freshness: are docs updated within 48 hours of API changes?
- Code sample accuracy: do all code samples compile and run?
- Cross-referencing: do docs link to related content appropriately?
- Version coverage: are docs available for all supported versions?

### Scoring Guide
- **5** — All 4 Divio categories complete. Search returns relevant results instantly.
        Docs updated same-day as API changes. All code samples tested in CI.
        Developers rarely need to ask questions that docs should answer.
- **4** — 3 of 4 Divio categories strong. Search works well. Docs updated within
        48 hours. Most code samples work. Occasional doc gaps.
- **3** — 2 of 4 Divio categories strong. Search exists but misses content.
        Docs lag API changes by a week. Some broken code samples.
- **2** — 1 of 4 Divio categories adequate. Search is poor. Docs are stale.
        Multiple broken code samples. Developers rely on support instead.
- **1** — No structured documentation approach. No search. Docs are months stale.
        Code samples do not work. Developers cannot self-serve.

### Hard Fail Criteria
- Score < 3 = **IMMEDIATE REMEDIATION REQUIRED**
- Any published code sample that does not compile = deduct 1 point
- No search functionality = automatic score cap at 2
- Docs more than 1 version behind = automatic score cap at 3
- No tutorials for core use cases = automatic score cap at 2

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Divio coverage | 4/4 categories | Quarterly audit |
| Search success rate | > 85% | Search analytics (query-to-click) |
| Doc freshness | < 48hr lag | CI/CD doc pipeline monitoring |
| Code sample pass rate | 100% | Automated testing in CI |
| Doc NPS | > 40 | Quarterly developer survey |
| Support deflection rate | > 70% | Docs-vs-ticket analysis |

---

## 3. COMMUNITY HEALTH

**Question:**
Is the developer community growing, active, and positive?

### What to Evaluate
- Active member growth: month-over-month active participants
- Response time: median time to first meaningful response
- Sentiment analysis: ratio of positive/neutral/negative interactions
- Knowledge sharing: are community members helping each other?
- Contributor pipeline: are community members becoming contributors?
- Toxicity management: are code of conduct violations handled swiftly?
- Platform health: is the community on the right platforms for the audience?

### Scoring Guide
- **5** — Active members growing > 15% MoM. Response time < 2 hours.
        Sentiment > 80% positive. Community members answer > 50% of questions.
        Active contributor pipeline. Zero unresolved CoC violations.
- **4** — Active members growing > 10% MoM. Response time < 4 hours.
        Sentiment > 70% positive. Community self-help emerging.
        Some contributors. CoC violations handled within 24 hours.
- **3** — Active members stable or growing < 5% MoM. Response time < 8 hours.
        Sentiment mixed. Community mostly relies on team for answers.
        Few contributors. CoC enforcement inconsistent.
- **2** — Active members declining. Response time > 24 hours.
        Sentiment trending negative. No community self-help.
        No contributor pipeline. CoC issues unresolved.
- **1** — Community is dead or toxic. No responses. Negative sentiment dominates.
        No engagement. CoC violations ignored.

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly active members | +10% MoM | Platform analytics |
| First response time | < 4 hours | Community platform metrics |
| Community sentiment | > 70% positive | Sentiment analysis tool |
| Self-help ratio | > 40% | Questions answered by community |
| Contributor pipeline | 5+ new/quarter | Contribution tracking |
| CoC resolution time | < 24 hours | Incident log |

---

## 4. CONTENT IMPACT

**Question:**
Does technical content drive meaningful developer engagement and learning?

### What to Evaluate
- Technical blog engagement: read time, completion rate, shares
- Tutorial completion rate: percentage of developers who finish tutorials
- Video content: watch time, completion rate, engagement metrics
- Conference talk impact: attendance, ratings, follow-up actions
- Content-to-signup funnel: how much content drives product adoption
- Content freshness: is the content calendar maintained and current?
- Developer amplification: are developers sharing and citing content?

### Scoring Guide
- **5** — Blog posts average > 5 min read time with > 60% completion.
        Tutorial completion > 70%. Content drives > 20% of signups.
        Developers actively share and reference content. Regular cadence.
- **4** — Blog posts average > 3 min read time with > 40% completion.
        Tutorial completion > 50%. Content drives > 10% of signups.
        Some organic sharing. Consistent cadence maintained.
- **3** — Blog posts get views but low engagement. Tutorial completion ~30%.
        Content contributes < 5% of signups. Sporadic sharing. Irregular cadence.
- **2** — Low readership. Tutorials incomplete or abandoned. No measurable impact
        on signups. No organic sharing. Infrequent publication.
- **1** — No technical content program. No tutorials. No measurable impact.
        Content is marketing fluff, not technical substance.

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Blog completion rate | > 50% | Content analytics |
| Tutorial completion rate | > 60% | Step-by-step tracking |
| Content-to-signup rate | > 10% | Attribution analytics |
| Social shares per post | > 50 | Social monitoring |
| Content cadence | 2+/week | Editorial calendar |
| Developer citations | Growing MoM | Backlink and mention tracking |

---

## 5. SDK QUALITY

**Question:**
Is the SDK a joy to use, type-safe, well-documented, and forgiving?

### What to Evaluate
- API ergonomics: do method names make sense? Is the API surface intuitive?
- Type safety: are types comprehensive, accurate, and helpful for IDE support?
- Error handling: are errors typed, actionable, and recoverable?
- Versioning discipline: SemVer compliance, migration guides, deprecation policy
- Testing: is the SDK well-tested with integration and unit tests?
- Language idiomacy: does the SDK feel native to each supported language?
- Bundle size and performance: is the SDK lightweight and fast?

### Scoring Guide
- **5** — API is intuitive without docs. Full type coverage. Typed errors with
        recovery suggestions. Strict SemVer. > 95% test coverage. Idiomatic in
        all supported languages. Minimal bundle size.
- **4** — API is clear with minimal doc reference. Good type coverage. Errors are
        typed and actionable. SemVer followed. > 80% test coverage. Mostly
        idiomatic. Reasonable bundle size.
- **3** — API requires regular doc reference. Partial type coverage. Errors are
        string-based but descriptive. SemVer mostly followed. > 60% test coverage.
        Some non-idiomatic patterns.
- **2** — API is confusing. Minimal types. Errors are generic. Breaking changes
        without major version bumps. Low test coverage. Feels like a port.
- **1** — API is unusable without extensive study. No types. Errors crash without
        context. No versioning discipline. No tests.

### Hard Fail Criteria
- Score < 3 = **IMMEDIATE REMEDIATION REQUIRED**
- Breaking change in a minor version = automatic deduct 2 points
- No type definitions for TypeScript SDK = automatic score cap at 2
- Untyped errors that expose stack traces = deduct 1 point

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| API ergonomics score | > 4.0/5.0 | Developer survey |
| Type coverage | > 95% | Static analysis |
| Error recoverability | > 90% typed | Error audit |
| SemVer compliance | 100% | Release audit |
| Test coverage | > 90% | CI reporting |
| Bundle size trend | Stable or decreasing | Build monitoring |

---

## 6. EVENT EFFECTIVENESS

**Question:**
Do events convert attendees into engaged developers and advocates?

### What to Evaluate
- Attendance vs. registration: show-up rate
- Event NPS: net promoter score from attendees
- Content quality: were talks/workshops technically valuable?
- Follow-up conversion: did attendees take action after the event?
- Speaker pipeline: are community members speaking at events?
- Cost efficiency: cost per engaged developer acquired
- Diversity: is event attendance representative?

### Scoring Guide
- **5** — Show-up rate > 80%. Event NPS > 60. > 40% of attendees take follow-up
        action (signup, PR, forum post). Community speakers at every event.
        Cost per engaged developer < $50. Diverse attendance.
- **4** — Show-up rate > 70%. Event NPS > 40. > 25% follow-up conversion.
        Some community speakers. Reasonable cost. Improving diversity.
- **3** — Show-up rate > 60%. Event NPS > 20. > 10% follow-up conversion.
        All internal speakers. Moderate cost. Diversity not tracked.
- **2** — Show-up rate > 40%. Event NPS neutral. < 5% follow-up conversion.
        Low engagement during events. High cost. No diversity focus.
- **1** — Low attendance. Negative NPS. No follow-up actions. Events feel like
        sales pitches. Extremely high cost. No diversity consideration.

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Show-up rate | > 70% | Registration vs. attendance |
| Event NPS | > 40 | Post-event survey |
| Follow-up conversion | > 25% | Action tracking (7-day window) |
| Community speakers | > 30% of lineup | Speaker tracking |
| Cost per developer | < $75 | Budget / engaged attendees |
| Diversity representation | Reflects community | Demographic tracking |

---

## 7. ECOSYSTEM GROWTH

**Question:**
Is the developer ecosystem expanding with integrations, apps, and marketplace activity?

### What to Evaluate
- Third-party integrations: number and quality of integrations built
- Apps and projects: are developers building real things on the platform?
- Marketplace listings: are developers publishing to marketplace?
- API consumption growth: is API usage growing across diverse use cases?
- Plugin/extension ecosystem: are developers extending the platform?
- Open source contributions: are developers contributing upstream?
- Ecosystem diversity: is growth concentrated or distributed?

### Scoring Guide
- **5** — 50+ quality integrations. Marketplace active with new listings weekly.
        API consumption growing > 20% MoM across diverse use cases. Healthy
        plugin ecosystem. Regular open source contributions. Well-distributed.
- **4** — 25+ integrations. Marketplace has steady new listings. API consumption
        growing > 10% MoM. Some plugins. Occasional contributions. Mostly
        distributed.
- **3** — 10+ integrations. Marketplace exists but slow growth. API consumption
        growing < 5% MoM. Few plugins. Rare contributions. Concentrated
        in a few use cases.
- **2** — < 10 integrations. Marketplace mostly empty. API consumption flat.
        No plugin ecosystem. No contributions. Very concentrated.
- **1** — No third-party integrations. No marketplace. API consumption declining.
        No ecosystem. Platform is an island.

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Third-party integrations | 25+ active | Integration registry |
| Marketplace listings | +5/month | Marketplace analytics |
| API consumption growth | > 10% MoM | API analytics |
| Active apps on platform | Growing MoM | Platform analytics |
| Open source PRs | 10+/month | GitHub analytics |
| Ecosystem concentration | Herfindahl < 0.15 | Use case analysis |

---

## 8. ATTRIBUTION

**Question:**
Can DevRel impact be traced to business outcomes?

### What to Evaluate
- Developer-sourced pipeline: revenue pipeline originating from DevRel activities
- Community-influenced deals: deals where community touchpoints were involved
- Content attribution: signups and activations traceable to specific content
- Event attribution: pipeline generated from events
- Advocacy attribution: impact of developer advocates on growth
- Multi-touch modeling: ability to capture DevRel influence across the journey
- Reporting cadence: are attribution reports generated and reviewed regularly?

### Scoring Guide
- **5** — Clear attribution model capturing multi-touch DevRel influence.
        Developer-sourced pipeline > 20% of total. Community-influenced deals
        tracked. Content and event attribution automated. Monthly reporting
        to leadership with clear ROI narrative.
- **4** — Attribution model exists with some multi-touch capability.
        Developer-sourced pipeline > 10% of total. Some community deal tracking.
        Content attribution partially automated. Quarterly reporting.
- **3** — Basic first-touch attribution only. Developer-sourced pipeline measured
        but < 5%. Limited deal tracking. Manual content attribution.
        Occasional reporting.
- **2** — No formal attribution model. Anecdotal evidence of impact.
        No pipeline tracking. No deal influence tracking.
        Reporting is ad hoc.
- **1** — No attribution. No measurement of DevRel impact on business.
        DevRel is treated as a cost center with no ROI narrative.
        No reporting.

### Metrics to Track
| Metric | Target | Measurement |
|--------|--------|-------------|
| Developer-sourced pipeline | > 15% of total | CRM attribution |
| Community-influenced deals | Tracked | CRM tagging |
| Content-to-activation rate | > 5% | Attribution analytics |
| Event pipeline generated | Tracked per event | Post-event CRM analysis |
| Attribution model maturity | Multi-touch | Quarterly model audit |
| Reporting cadence | Monthly | Report log |

---

## FINAL DEVREL SCORE DECISION

**Hard Fail Dimensions (DX, Documentation Quality, SDK Quality):**
- Score < 3 = **IMMEDIATE REMEDIATION REQUIRED**

**All Dimensions:**
- Weighted average score >= 4.0 = **INITIATIVE MAY SHIP**
- Weighted average score < 4.0 = **REMEDIATION REQUIRED**

**Attribution:**
- NOT a hard fail
- Evaluated holistically (attribution maturity takes time)
- Score < 3 triggers review, not automatic failure

Scores must be stated explicitly before final output.

### Score Card Template

```markdown
## DevRel Score: [Initiative/Program Name]

| Dimension | Weight | Score | Weighted | Notes |
|-----------|--------|-------|----------|-------|
| Developer Experience | 1.5x | /5 | | |
| Documentation Quality | 1.5x | /5 | | |
| Community Health | 1.0x | /5 | | |
| Content Impact | 1.0x | /5 | | |
| SDK Quality | 1.0x | /5 | | |
| Event Effectiveness | 1.0x | /5 | | |
| Ecosystem Growth | 1.0x | /5 | | |
| Attribution | 1.0x | /5 | | |

**Weighted Average:** [calculated]
**Verdict:** PASS / REMEDIATION REQUIRED
**Hard Fails:** [if any]
**Priority Fixes:** [top 3 actions]
```

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Remediate until standards are met.

The developer experience is the product. Treat it accordingly.

---

## END OF DEVREL SCORE
