# Editorial Calendar — Planning, Cadence, Workflows, Approval Processes

## Overview

An editorial calendar is the operational backbone of content strategy. It
transforms strategic intent into scheduled execution. Without it, content
strategy remains an abstract document. With it, strategy becomes a
production system with clear owners, deadlines, and accountability.

Source: Pulizzi, J. (2014). *Epic Content Marketing*.

---

## Editorial Calendar Architecture

### Three Layers of Planning

**Layer 1: Strategic Calendar (Quarterly)**
- Content pillars and themes for the quarter
- Major campaigns and product launches
- Seasonal and industry events
- Quarterly OKRs and content KPIs
- Resource allocation and budget

**Layer 2: Tactical Calendar (Monthly)**
- Specific content pieces planned for each week
- Assigned owners and reviewers
- Draft, review, and publish deadlines
- Channel distribution plan
- Dependencies (design, engineering, stakeholder input)

**Layer 3: Execution Calendar (Weekly)**
- Daily production status
- In-progress content pieces and their current stage
- Blockers and escalations
- Social media and email scheduling
- Real-time adjustments and swaps

### Calendar Cadence by Team Size

| Team Size | Planning Cadence | Recommended Output |
|-----------|-----------------|-------------------|
| Solo creator | Monthly planning, weekly execution | 2-4 pieces/week |
| 2-3 person team | Monthly planning, bi-weekly sprints | 4-8 pieces/week |
| 4-8 person team | Quarterly strategy, monthly planning | 8-15 pieces/week |
| 8+ person team | Quarterly strategy, bi-weekly sprints | 15+ pieces/week |

Output includes all content types: blog posts, social, email, docs, etc.

---

## Content Planning Framework

### Theme-Based Planning

Organize content around monthly or quarterly themes that align with
content pillars:

```
Q1: "Foundation Building"
  Month 1: Getting Started (pillar: product education)
  Month 2: Best Practices (pillar: thought leadership)
  Month 3: Scaling Up (pillar: growth strategies)

Q2: "Growth Season"
  Month 4: Case Studies (pillar: social proof)
  Month 5: Advanced Techniques (pillar: product education)
  Month 6: Mid-Year Review (pillar: thought leadership)
```

**Benefits of theme-based planning:**
- Creates narrative coherence across content pieces
- Enables content series and multi-part sequences
- Simplifies ideation (theme constrains the infinite option space)
- Allows batched research and expert interviews

### The Content Mix Model

Balance content across dimensions:

**By pillar** — No single pillar should exceed 40% of total output.
Ensure coverage across all defined pillars.

**By funnel stage** — Typical healthy distribution:
- Awareness: 40%
- Consideration: 30%
- Decision: 15%
- Retention: 10%
- Advocacy: 5%

**By format** — Diversify to reach different audience segments:
- Written (blog, docs, email): 50%
- Visual (social, infographics): 25%
- Video/audio: 15%
- Interactive (tools, calculators): 10%

**By effort level:**
- Quick turns (1-3 hours): 60% of pieces
- Standard pieces (4-8 hours): 30% of pieces
- Tentpole content (20+ hours): 10% of pieces

---

## Content Workflow Design

### The Standard Content Workflow

```
IDEATION ──> BRIEF ──> DRAFT ──> REVIEW ──> REVISION ──> APPROVAL ──> PUBLISH ──> PROMOTE ──> MEASURE
   |           |          |         |           |            |           |            |           |
   1 day      1 day     3-5 days  2 days     1-2 days    1 day      Scheduled    1 week     Ongoing
```

### Stage Definitions

**1. Ideation (Day 0)**
- Content idea proposed with rationale
- Mapped to pillar, persona, funnel stage
- Keyword research completed
- Competitive check performed
- Decision: proceed to brief or reject

**2. Brief Creation (Day 1)**
- Content brief completed using `Templates/content_brief.md`
- Target keyword, search intent, and outline defined
- Voice and tone direction specified
- Reference content and sources gathered
- Assigned to writer with deadline

**3. Draft (Days 2-6)**
- Writer produces first draft against the brief
- Self-review against `eval/ReviewChecklist.md`
- Draft submitted for peer review
- All factual claims sourced

**4. Review (Days 7-8)**
- Peer or editor reviews against brief and quality standards
- Feedback provided as specific, actionable comments
- Structural and strategic feedback first, line edits second
- Review completed within 48 hours (SLA)

**5. Revision (Days 9-10)**
- Writer addresses all review feedback
- Unresolved disagreements escalated to content lead
- Revised draft resubmitted

**6. Approval (Day 11)**
- Final review by content lead or designated approver
- SEO checklist verified
- Brand voice verified
- Legal review if applicable (claims, testimonials, regulations)
- Approved or returned with specific required changes

**7. Publish (Scheduled)**
- Content enters CMS and is staged for publication
- Meta data verified (title tag, meta description, OG tags)
- Internal links added
- Images and alt text confirmed
- Published at scheduled date/time

**8. Promote (Week 1-2 post-publish)**
- Social media distribution across channels
- Email newsletter inclusion
- Internal distribution (Slack, team update)
- Outreach for backlinks (if applicable)
- Paid promotion (if budgeted)

**9. Measure (Ongoing)**
- Week 1: Initial traffic and engagement check
- Month 1: Ranking position and organic trend
- Month 3: Conversion attribution and content scoring
- Month 6+: Decay monitoring and refresh trigger

### Workflow SLAs

| Stage | Maximum Duration | Escalation Trigger |
|-------|-----------------|-------------------|
| Brief creation | 1 business day | Not started after 24h |
| First draft | 5 business days (standard) | No draft after 5 days |
| Review | 2 business days | No review after 48h |
| Revision | 2 business days | Not addressed after 48h |
| Approval | 1 business day | Blocking publication date |
| Publish | On scheduled date | Missed publication date |

### Workflow Status Labels

| Status | Definition |
|--------|-----------|
| Backlog | Approved idea, not yet briefed |
| Briefed | Brief complete, assigned to writer |
| In Progress | Writer actively drafting |
| In Review | Draft submitted, awaiting feedback |
| Revisions | Feedback received, writer revising |
| Approved | Final approval granted |
| Scheduled | In CMS, queued for publication |
| Published | Live on intended channel |
| Promoted | Distribution in progress |
| Measuring | Published, tracking performance |

---

## Approval Processes

### Approval Tiers

Not all content requires the same level of review:

**Tier 1: Self-Approve (Content Creator)**
- Social media posts (within approved guidelines)
- Internal updates and team communications
- Content refreshes (minor updates to existing content)
- Email newsletter curation

**Tier 2: Peer Review + Content Lead Approval**
- Blog posts and articles
- Email campaign copy
- Documentation updates
- Standard landing page copy

**Tier 3: Content Lead + Stakeholder Approval**
- Pillar pages and tentpole content
- Customer case studies (requires customer approval)
- Pricing and product pages
- Gated content (ebooks, white papers)

**Tier 4: Content Lead + Legal + Executive Approval**
- Press releases and public statements
- Content containing regulatory claims
- Testimonials with specific outcome claims
- Content involving partnerships or integrations

### Approval Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Everyone approves everything | Bottleneck, slow publishing | Tiered approval by content type |
| No approval process | Quality control gaps, brand risk | Define minimum review standards |
| Approval by committee | Consensus kills distinctive voice | Single accountable approver per tier |
| Approval without criteria | Subjective, inconsistent feedback | Use ContentScore.md as objective standard |
| Approval delays | Missed deadlines, demoralized writers | SLAs with escalation triggers |
| Approver rewrites | Destroys writer ownership and voice | Feedback, not rewrites |

---

## Calendar Management Best Practices

### 1. Build in Buffer

Never schedule at 100% capacity. Reserve 20% of calendar slots for:
- Reactive content (industry news, trending topics)
- Content that takes longer than expected
- Unplanned stakeholder requests
- Content refreshes and optimization

### 2. Batch Similar Work

Writers produce better work when they batch similar tasks:
- Research days: gather sources and data
- Writing days: draft without interruption
- Editing days: review and revise
- Admin days: briefs, planning, coordination

### 3. Maintain a Content Backlog

Keep a prioritized backlog of approved content ideas:
- Minimum 30 days of ideas ahead of schedule
- Ideas scored by strategic alignment and effort
- Backlog reviewed and reprioritized monthly
- Prevents "what should we write about?" paralysis

### 4. Schedule Content Reviews

Build recurring review events into the calendar:
- Weekly: Production standup (15 min) — status of in-progress content
- Monthly: Performance review — what published, what performed, what learned
- Quarterly: Strategy review — pillar health, persona coverage, competitive shifts
- Annually: Full content audit — comprehensive inventory and assessment

### 5. Document Holiday and Event Content

Plan ahead for predictable content opportunities:
- Industry conferences and events
- Product launch cycles
- Seasonal trends in your industry
- Company milestones and anniversaries
- Regulatory or compliance deadlines

---

## Editorial Calendar Template Structure

```
| Week | Content Piece | Type | Pillar | Persona | Stage | Owner | Reviewer | Deadline | Status |
|------|--------------|------|--------|---------|-------|-------|----------|----------|--------|
| W1   | [Title]      | Blog | P1     | Persona A | TOFU | Writer | Editor | Jan 7 | Briefed |
| W1   | [Title]      | Email| P2     | Persona B | MOFU | Writer | Lead   | Jan 8 | Draft  |
| W2   | [Title]      | Video| P1     | Persona A | TOFU | Writer | Lead   | Jan 14| Backlog|
```

See `Templates/content_calendar_template.md` for the full template.

---

## Handling Calendar Disruptions

### When Plans Change

Content calendars must be flexible. Disruptions are normal:

1. **Breaking news in your industry** — Swap a planned piece for timely
   reactive content. Use your 20% buffer.
2. **Stakeholder urgent request** — Evaluate against strategy. If aligned,
   schedule. If not, push back with data.
3. **Writer unavailable** — Reassign from backlog or reschedule.
4. **Content underperforming** — Analyze quickly, apply learnings to
   upcoming content, schedule a refresh.
5. **Product launch moved** — Adjust supporting content timeline.

### The "Kill List" Decision

Sometimes content must be killed mid-production:
- Topic became irrelevant due to market change
- Research revealed the angle is wrong
- Competitive content published first with superior execution
- Resources needed for higher-priority content

Killing content is a strategic decision, not a failure. Sunk cost fallacy
produces mediocre content. Better to kill and redirect effort.

---

**A calendar without content strategy is just a schedule.
A content strategy without a calendar is just a wish.**
