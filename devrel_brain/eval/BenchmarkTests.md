# DevRel Benchmark Tests — Scenario-Based Evaluation (Authoritative)

This document contains benchmark scenarios for evaluating DevRel Brain output quality.
Each scenario must be evaluated against the DevRelScore.md dimensions.

These are not hypotheticals. These are realistic, high-stakes situations.
The brain must produce actionable, expert-level responses to each scenario.

---

## HOW TO USE BENCHMARK TESTS

1. Present each scenario to the DevRel Brain
2. Evaluate the response against the scoring criteria provided
3. Score from 1-5 using the rubric for each scenario
4. A passing grade requires an average >= 4.0 across all scenarios
5. Any scenario scored < 3 requires the brain to be retrained on that domain

### Scoring Rubric (Applied to Each Scenario)
- **5** — Expert-level response. Actionable, comprehensive, considers trade-offs.
        Could be presented to a VP of DevRel at a Series C+ company.
- **4** — Strong response. Mostly complete with minor gaps. Actionable.
- **3** — Adequate response. Covers basics but misses nuance or trade-offs.
- **2** — Weak response. Generic advice that could apply to anything.
- **1** — Poor response. Incorrect, superficial, or not actionable.

---

## SCENARIO 1: SDK Error Handling Redesign

**Context:**
Developer community is complaining that the SDK throws unhelpful errors. The
most common complaints:
- "Error: Request failed" with no context
- Stack traces that reference internal SDK code, not user code
- No error codes for programmatic handling
- Network errors are indistinguishable from validation errors

**Task:**
Review the error handling strategy and redesign it. Deliver:
1. An error taxonomy for the SDK
2. Error message format specification
3. Migration plan from current errors to new system
4. Example of 5 common errors before and after

**Evaluation Criteria:**
- Does the taxonomy cover all error categories (auth, validation, network, rate limit, server)?
- Are error messages actionable (what, why, how to fix)?
- Does the migration plan avoid breaking existing error handling?
- Are the before/after examples realistic and clearly improved?

---

## SCENARIO 2: Complex API Documentation Architecture

**Context:**
A platform has a complex API with 50+ endpoints across 8 resource types. Current
documentation is a single long page that nobody can navigate. Developers are
filing support tickets for things that are documented because they cannot find them.

**Task:**
Design the information architecture for the new documentation. Deliver:
1. Sitemap with all pages and hierarchy
2. Prioritization of which pages to build first
3. Navigation design rationale
4. Search strategy and implementation recommendations
5. Divio framework mapping (which content goes where)

**Evaluation Criteria:**
- Is the sitemap logically organized by developer task, not internal structure?
- Does prioritization focus on highest-traffic use cases?
- Does the navigation support both browsing and searching?
- Is the Divio mapping clear and actionable?

---

## SCENARIO 3: Community Recovery After Platform Migration

**Context:**
The developer community was migrated from Slack to Discord 3 months ago.
Activity has dropped 40%. Key contributors stopped participating. New member
onboarding is broken. The community manager is demoralized.

**Task:**
Create a 90-day community recovery plan. Deliver:
1. Root cause analysis of the activity drop
2. Week-by-week recovery plan with specific actions
3. Contributor re-engagement strategy
4. Metrics to track recovery
5. Decision framework for whether to stay on Discord or reconsider

**Evaluation Criteria:**
- Does the root cause analysis consider multiple factors (not just "people don't like Discord")?
- Is the week-by-week plan specific and time-bound?
- Does the contributor strategy include personal outreach?
- Are metrics realistic and measurable?
- Is the stay/go framework objective?

---

## SCENARIO 4: Developer Onboarding Funnel Optimization

**Context:**
Analytics show: 10,000 developers visit the docs per month. 2,000 start the
quickstart. 400 complete it. 100 make a second API call. 20 become weekly active.

**Task:**
Diagnose the funnel and propose fixes. Deliver:
1. Analysis of each drop-off point with likely causes
2. Specific fixes for each stage of the funnel
3. A/B testing plan for the top 3 fixes
4. Target funnel metrics after optimization
5. Timeline for implementation

**Evaluation Criteria:**
- Does the analysis identify specific friction points, not just "improve the docs"?
- Are fixes concrete and implementable?
- Is the A/B testing plan statistically sound?
- Are target metrics ambitious but realistic?

---

## SCENARIO 5: SDK Versioning Crisis

**Context:**
The SDK team shipped a minor version (2.3.0) that accidentally introduced a
breaking change in the authentication flow. 30% of users are affected. The team
has already published 2.3.0 to npm. Developers are posting angry messages in
the community.

**Task:**
Manage the crisis. Deliver:
1. Immediate communication plan (first 2 hours)
2. Technical remediation options (patch, revert, or new minor)
3. Community management talking points
4. Post-mortem process to prevent recurrence
5. Trust rebuilding strategy for affected developers

**Evaluation Criteria:**
- Is the communication plan fast, transparent, and empathetic?
- Are technical options evaluated with trade-offs?
- Do talking points acknowledge the mistake without deflecting?
- Does the post-mortem address process gaps, not just the symptom?
- Does the trust-rebuilding strategy go beyond an apology blog post?

---

## SCENARIO 6: Technical Content Strategy for New Product

**Context:**
A new API product is launching in 6 weeks. There is no existing content. The
product is a real-time data streaming API that competes with established players.
The developer audience is experienced (senior engineers building data pipelines).

**Task:**
Create the content strategy for launch. Deliver:
1. Content calendar for weeks -6 to +4 (pre and post launch)
2. Content types and topics prioritized by impact
3. Distribution strategy across channels
4. Developer persona for content targeting
5. Competitive differentiation in content (what to say that competitors don't)

**Evaluation Criteria:**
- Does the calendar balance pre-launch buzz with post-launch substance?
- Are content types appropriate for senior engineers (not beginner tutorials)?
- Does distribution match where senior data engineers actually consume content?
- Is the persona specific and research-based?
- Does competitive differentiation highlight genuine advantages?

---

## SCENARIO 7: Developer Event Program Design

**Context:**
Budget: $200,000/year. Goal: Establish presence in the developer community for
a B2B API product. No existing event program. Team: 1 DevRel lead + 1 content
person. Target audience: Backend engineers at mid-market companies.

**Task:**
Design the event program for the first year. Deliver:
1. Event mix (own events vs. sponsorships vs. speaking)
2. Budget allocation across event types
3. Event calendar with specific events and rationale
4. Success metrics per event type
5. Scaling plan for year 2

**Evaluation Criteria:**
- Is the event mix realistic for the team size and budget?
- Does budget allocation maximize developer touchpoints?
- Are specific events relevant to the target audience?
- Are success metrics measurable and tied to business outcomes?
- Does the scaling plan account for lessons learned?

---

## SCENARIO 8: API Deprecation Communication

**Context:**
API v1 must be deprecated. It has 5,000 active users. v2 has been available for
12 months. Only 40% of users have migrated. The deadline is 6 months away.
Some v1 users are enterprise customers with annual contracts.

**Task:**
Design the deprecation communication and migration support plan. Deliver:
1. Communication timeline with specific touchpoints
2. Migration guide structure and content plan
3. Support escalation plan for enterprise customers
4. Incentive structure for early migration
5. Hard deadline enforcement strategy

**Evaluation Criteria:**
- Does the communication timeline start early enough with increasing urgency?
- Is the migration guide structured for different migration complexity levels?
- Does the enterprise plan include dedicated support resources?
- Are incentives meaningful without being desperate?
- Is the hard deadline enforceable and clearly communicated?

---

## SCENARIO 9: Developer Advocacy Program Launch

**Context:**
No existing developer advocacy program. Strong community of 500+ active
developers who use the product regularly. Some are already creating content
independently. Budget: $50,000/year for the program.

**Task:**
Design the developer advocacy program. Deliver:
1. Program tiers with clear benefits and expectations
2. Application and selection process
3. Onboarding experience for new advocates
4. Content and activity expectations per tier
5. Recognition, rewards, and career value proposition
6. Program metrics and health indicators

**Evaluation Criteria:**
- Are tiers progressive and attainable?
- Is the selection process fair and transparent?
- Does onboarding set advocates up for success?
- Are expectations realistic and clearly defined?
- Do rewards provide genuine value (not just swag)?
- Are metrics tied to both community health and business outcomes?

---

## SCENARIO 10: Documentation Localization Strategy

**Context:**
The product is expanding internationally. Top 5 markets by developer count:
US (40%), India (20%), Brazil (10%), Germany (8%), Japan (7%). Documentation is
English-only. Community requests for localization are increasing.

**Task:**
Design the localization strategy. Deliver:
1. Prioritization framework for which languages first
2. Translation approach (human, machine, community, hybrid)
3. Quality assurance process for translated content
4. Content freshness strategy (keeping translations in sync)
5. Community translation contribution model
6. Budget estimate and timeline

**Evaluation Criteria:**
- Does prioritization consider both market size and developer preference?
- Is the translation approach realistic for the budget?
- Does QA prevent embarrassing mistranslations of technical content?
- Is the freshness strategy sustainable, not just aspirational?
- Does the community model protect quality while leveraging contributors?

---

## SCENARIO 11: Developer Survey Design

**Context:**
Annual developer survey to understand satisfaction, needs, and priorities.
Last year's survey had 15% response rate and produced no actionable insights.
Questions were too broad and responses were not segmented.

**Task:**
Redesign the developer survey. Deliver:
1. Survey objectives and what decisions it should inform
2. Question design (max 25 questions) with rationale for each
3. Segmentation strategy (by persona, usage level, tenure)
4. Response rate improvement plan
5. Analysis and reporting framework
6. Action commitment (how results will drive changes)

**Evaluation Criteria:**
- Are objectives specific enough to produce actionable data?
- Are questions clear, unbiased, and answerable?
- Does segmentation enable meaningful comparison?
- Is the response rate plan specific (not just "send reminders")?
- Does the reporting framework connect data to decisions?

---

## SCENARIO 12: Open Source Community Governance

**Context:**
An internal project is being open-sourced. It has 10 internal contributors.
The company wants community contributions but needs to maintain quality and
direction. No existing open source governance.

**Task:**
Design the open source governance model. Deliver:
1. Governance structure (BDFL, steering committee, foundation, etc.)
2. Contribution guidelines and process
3. Maintainer responsibilities and burnout prevention
4. Decision-making process for feature requests and breaking changes
5. License selection rationale
6. Community expectations and code of conduct

**Evaluation Criteria:**
- Is the governance model appropriate for the project size and stage?
- Are contribution guidelines specific enough to prevent confusion?
- Does the maintainer model prevent burnout realistically?
- Is the decision-making process transparent and documented?
- Is the license choice appropriate and well-reasoned?

---

## SCENARIO 13: Developer Experience Competitive Analysis

**Context:**
Three competitors offer similar APIs. Developers are choosing competitors
citing "better DX." Leadership wants a concrete analysis and improvement plan.

**Task:**
Conduct a DX competitive analysis. Deliver:
1. DX audit framework (what dimensions to compare)
2. Audit results for your product and 3 competitors
3. Gap analysis identifying specific weaknesses
4. Prioritized improvement roadmap
5. Quick wins (improvements achievable in < 2 weeks)
6. "DX differentiator" strategy (where to be best-in-class)

**Evaluation Criteria:**
- Is the audit framework comprehensive and fair?
- Are audit results evidence-based, not opinion-based?
- Does the gap analysis identify root causes, not just symptoms?
- Is the roadmap prioritized by developer impact?
- Are quick wins genuinely quick and impactful?

---

## SCENARIO 14: Hackathon Program Design

**Context:**
Goal: Drive product adoption and surface innovative use cases. Budget: $30,000
per hackathon, 4 per year. Mix of virtual and in-person. Target: mid-level to
senior developers. Product is a ML inference API.

**Task:**
Design the hackathon program. Deliver:
1. Hackathon format and structure
2. Challenge design that showcases product strengths
3. Judging criteria and process
4. Prize structure that drives continued engagement
5. Post-hackathon follow-up plan
6. Success metrics beyond participation numbers

**Evaluation Criteria:**
- Does the format respect participants' time and energy?
- Do challenges highlight real product capabilities?
- Are judging criteria transparent and fair?
- Do prizes encourage ongoing product usage (not just cash)?
- Does post-hackathon follow-up convert participants to active users?

---

## SCENARIO 15: Internal Developer Enablement

**Context:**
DevRel team is asked to improve internal developer productivity. 200 engineers
use internal tools and APIs. Common complaints: poor internal documentation,
inconsistent tooling, slow onboarding for new hires (3+ weeks to first commit).

**Task:**
Design the internal developer enablement program. Deliver:
1. Internal DX audit plan
2. Onboarding optimization (target: first commit in 3 days)
3. Internal documentation strategy
4. Developer tooling recommendations
5. Feedback loop for continuous improvement
6. Success metrics and reporting

**Evaluation Criteria:**
- Does the audit cover the full internal developer experience?
- Is the onboarding target achievable with specific steps?
- Does the documentation strategy account for maintenance burden?
- Are tooling recommendations evidence-based?
- Is the feedback loop lightweight enough to be sustainable?

---

## SCENARIO 16: Developer Changelog and Release Communication

**Context:**
Product ships updates weekly. Current changelog is an auto-generated list of
commit messages. Developers complain they don't know what changed, what's
breaking, or why they should update.

**Task:**
Redesign the release communication strategy. Deliver:
1. Changelog format specification with examples
2. Release communication workflow (who writes what, when)
3. Breaking change communication protocol
4. Release segmentation (who needs to know about what)
5. Feedback mechanism for release quality

**Evaluation Criteria:**
- Is the changelog format developer-friendly (not commit-message-friendly)?
- Is the workflow sustainable for a weekly release cadence?
- Does the breaking change protocol give developers enough notice?
- Does segmentation reduce noise for developers?

---

## AGGREGATE SCORING

### Score Card Template

```markdown
## DevRel Benchmark Results: [Date]

| # | Scenario | Score | Notes |
|---|----------|-------|-------|
| 1 | SDK Error Handling Redesign | /5 | |
| 2 | Complex API Doc Architecture | /5 | |
| 3 | Community Recovery | /5 | |
| 4 | Onboarding Funnel Optimization | /5 | |
| 5 | SDK Versioning Crisis | /5 | |
| 6 | Content Strategy for New Product | /5 | |
| 7 | Event Program Design | /5 | |
| 8 | API Deprecation Communication | /5 | |
| 9 | Advocacy Program Launch | /5 | |
| 10 | Documentation Localization | /5 | |
| 11 | Developer Survey Design | /5 | |
| 12 | Open Source Governance | /5 | |
| 13 | DX Competitive Analysis | /5 | |
| 14 | Hackathon Program Design | /5 | |
| 15 | Internal Developer Enablement | /5 | |
| 16 | Release Communication Redesign | /5 | |

**Average Score:** [calculated]
**Passing Threshold:** >= 4.0
**Verdict:** PASS / RETRAIN REQUIRED
**Weakest Areas:** [list]
**Strongest Areas:** [list]
```

---

## ENFORCEMENT RULE

Benchmark tests are not optional.
The brain must demonstrate competence across all DevRel domains.
Scores below 3 on any scenario indicate a fundamental gap.

---

## END OF BENCHMARK TESTS
