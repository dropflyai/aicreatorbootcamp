# Customer Communication

## What This Enables

A systematic approach to communicating product changes to customers — from feature launches and updates to breaking changes and migrations. Product communication is not marketing; it is the practice of keeping customers informed, reducing surprise and frustration, and building trust through transparency. Poor communication transforms positive product changes into negative customer experiences. Excellent communication transforms even difficult changes (deprecations, pricing changes, migrations) into demonstrations of customer respect.

---

## The Core Insight

Customers do not resent change — they resent surprise. Every unannounced product change is a small breach of trust. Every well-communicated change, even a difficult one, reinforces trust. The goal of product communication is to ensure that customers always feel informed, respected, and supported — regardless of whether the news is positive (new feature) or negative (deprecation, price increase, breaking change).

---

## Communication Types

### The Communication Matrix

| Type | Purpose | Audience | Urgency | Channel |
|------|---------|----------|---------|---------|
| **Changelog** | Document all product changes | All users | Low | In-app feed, web page |
| **Feature announcement** | Highlight significant new capabilities | Target users | Medium | Email, in-app, blog |
| **Release notes** | Technical details of each release | Power users, developers | Medium | Documentation site |
| **In-app announcement** | Draw attention to relevant changes | Active users | Medium-High | Modal, banner, tooltip |
| **Migration notice** | Alert users to required actions | Affected users | High | Email, in-app, support |
| **Incident communication** | Inform about outages or issues | All users | Critical | Status page, email, in-app |
| **Deprecation notice** | Announce feature removal | Affected users | High | Email, in-app, documentation |
| **Pricing change** | Communicate price changes | All customers | High | Email, account page |

---

## Changelog

### Purpose

The changelog is the living record of all product changes — a searchable, chronological history that customers can reference at any time. It builds trust through transparency and reduces support burden by answering "what changed?"

### Changelog Structure

```
CHANGELOG ENTRY FORMAT

[Date] — [Category]

## [Feature/Change Title]
[1-2 sentence description of what changed and why it matters to the user]

[Screenshot or GIF if helpful]

**What's new:**
- [Specific capability 1]
- [Specific capability 2]

**How to use it:**
[1-2 sentences on how to access/use the new feature]

**Learn more:**
[Link to documentation or help article]

---

Categories:
🚀 New Feature
✨ Improvement
🔧 Bug Fix
⚠️ Breaking Change
🗑️ Deprecation
🔒 Security Update
```

### Changelog Best Practices

| Practice | Rationale |
|----------|-----------|
| Update with every release | Customers should see consistent, recent entries |
| Write for customers, not engineers | "Faster dashboard loading" not "Optimized SQL queries" |
| Include visual evidence | Screenshots and GIFs show the change better than text |
| Categorize entries | Customers can scan for what matters to them |
| Make it accessible | In-app link, web page, RSS feed |
| Include "how to use it" | Do not just announce; enable |
| Date every entry | Customers need to know when changes happened |

---

## Release Notes

### Purpose

Release notes provide technical detail about each release for power users, developers, and administrators who need to understand the full scope of changes — including API changes, breaking changes, and configuration requirements.

### Release Notes Structure

```
RELEASE NOTES v3.14.0 — [Date]

## Highlights
[1-2 paragraph summary of the most significant changes]

## New Features
### [Feature Name]
[Description, use case, how to enable/use]
- API: [new endpoints or parameters]
- Configuration: [any setup required]
- Limitations: [known limitations in this release]

## Improvements
- [Improvement 1]: [brief description]
- [Improvement 2]: [brief description]

## Bug Fixes
- Fixed: [issue description] ([ticket reference])
- Fixed: [issue description] ([ticket reference])

## Breaking Changes
⚠️ [Change description]
- What changed: [specific technical detail]
- Why: [reason for the change]
- Migration: [steps to adapt]
- Deadline: [when the old behavior will be removed]

## Deprecations
🗑️ [Feature/API being deprecated]
- Deprecated: [what specifically]
- Replacement: [new approach]
- End of life: [date]
- Migration guide: [link]

## API Changes
### New Endpoints
- `POST /api/v2/reports` — Create a new report
- `GET /api/v2/reports/{id}/status` — Check report generation status

### Modified Endpoints
- `GET /api/v2/users` — Added `role` filter parameter

### Deprecated Endpoints
- `GET /api/v1/reports` — Use v2 endpoint instead. Removal: [date]

## Security
- [Security fix description] (CVE-XXXX-XXXX if applicable)

## Known Issues
- [Issue description] — Workaround: [workaround]
- [Issue description] — Fix expected in [version]

## Upgrade Instructions
[Specific steps for self-hosted or API customers to upgrade]
```

---

## In-App Announcements

### Types of In-App Communication

| Type | Intrusiveness | Use For | Duration |
|------|-------------|---------|----------|
| **Modal** | High | Tier 1 launches, critical notices, breaking changes | One-time, dismissible |
| **Banner** | Medium | Feature announcements, deprecation warnings | Time-limited (1-2 weeks) |
| **Tooltip / Coachmark** | Low | New feature discovery, contextual guidance | Until dismissed or feature used |
| **Badge / Dot** | Minimal | New content available, notification count | Until seen |
| **Slideout / Panel** | Medium | Changelog feed, what's new digest | On-demand |
| **Empty state** | Contextual | Feature education for first-time users | Until feature is used |

### In-App Announcement Best Practices

| Practice | Rationale |
|----------|-----------|
| One announcement at a time | Multiple simultaneous announcements overwhelm and annoy |
| Respect dismissal | Once dismissed, do not show again (persist state) |
| Target relevantly | Only show to users who would benefit from the feature |
| Time appropriately | Show during natural transition points, not mid-workflow |
| Include clear CTA | "Try it now" not just "Got it" — help users take action |
| Measure engagement | Track: impression, dismiss, CTA click, feature adoption |
| A/B test copy | Different messaging resonates with different segments |

### Announcement Fatigue Prevention

```
ANNOUNCEMENT RULES

1. Maximum 1 announcement per session
2. Maximum 3 announcements per week per user
3. Never interrupt an active workflow (wait for natural pause)
4. Never show announcements to users in their first 7 days (let them onboard)
5. Priority system: critical > important > informational
6. Frequency cap per announcement type:
   - Modal: Maximum 1 per user per feature
   - Banner: Maximum 7 days display
   - Tooltip: Dismiss = permanent dismiss
```

---

## Migration Communication

### Migration Communication Framework

When a change requires customer action (API migration, feature migration, pricing change):

```
MIGRATION COMMUNICATION TIMELINE

T-90 days (or more): ADVANCE NOTICE
  Channel: Email + in-app banner
  Message: "We are making changes to [X]. Here is what is changing and why."
  Action: None yet — awareness only
  Tone: Informational, respectful

T-60 days: DETAILED NOTICE
  Channel: Email + in-app announcement + documentation
  Message: "Here is exactly what you need to do, with step-by-step instructions."
  Action: Begin migration
  Tone: Helpful, supportive, specific

T-30 days: REMINDER
  Channel: Email + in-app banner (more prominent)
  Message: "30 days remaining. [X]% of your peers have already migrated."
  Action: Migrate now
  Tone: Encouraging, creating urgency without panic

T-14 days: URGENT REMINDER
  Channel: Email + in-app modal + account admin email
  Message: "14 days until [old feature] is disabled. Here is how to migrate."
  Action: Migrate now — offer help
  Tone: Urgent but supportive

T-7 days: FINAL NOTICE
  Channel: Email + in-app modal + phone call for enterprise
  Message: "This is your final reminder. Need help? Contact us."
  Action: Last chance
  Tone: Clear, direct, offering support

T-0: CHANGE EFFECTIVE
  Channel: In-app message on old feature
  Message: "[Feature] has been updated. Here is your new experience."
  Action: Redirect to new feature/migration tool
  Tone: Positive, forward-looking

T+7 days: FOLLOW-UP
  Channel: Email
  Message: "How is your experience with [new feature]? Need help?"
  Action: Feedback request, support offer
  Tone: Caring, customer-success oriented
```

### Migration Communication Templates

**Advance notice email:**

```
Subject: Upcoming changes to [Feature Name] — what you need to know

Hi [Name],

We are making changes to [Feature Name] to [benefit: improve performance,
enhance security, simplify the experience].

WHAT IS CHANGING:
[Clear, specific description of the change]

WHEN:
[Date] — you have [N] days to prepare

WHAT YOU NEED TO DO:
[Specific steps — or "nothing yet, we will send detailed instructions soon"]

WHY:
[Honest, customer-centric explanation of why this change is happening]

NEED HELP?
[Support link, FAQ link, office hours schedule]

We are committed to making this transition as smooth as possible.

— The [Product] Team
```

### Communication for Difficult Changes

| Difficult Change | Communication Principle | Example |
|-----------------|----------------------|---------|
| Feature removal | Acknowledge the loss; explain the why; provide alternative | "We know some of you relied on X. Here is why we are making this change and what you can use instead." |
| Price increase | Lead with added value; give advance notice; grandfather or phase in | "We have added 15 new features this year. To continue investing, we are adjusting pricing on [date]." |
| Breaking API change | Provide migration guide; long notice period; versioning | "API v1 will be sunset on [date]. V2 migration guide is available now." |
| Data loss/incident | Radical transparency; timeline; remediation | "At [time], an issue caused [impact]. Here is what happened, what we did, and how we are preventing recurrence." |

---

## Communication Quality Standards

### Writing Principles

| Principle | Description | Example |
|-----------|-------------|---------|
| **Clarity** | No jargon; no ambiguity; simple language | "You can now export reports as PDF" not "We shipped PDF render pipeline" |
| **Brevity** | Say what matters; cut the rest | Lead with the action or benefit in the first sentence |
| **Honesty** | Never hide bad news; never overstate good news | "This feature is in beta and may have rough edges" |
| **Empathy** | Acknowledge the customer's perspective | "We know this requires effort on your part — here is how we are making it easier" |
| **Actionability** | Every communication has a clear next step | "Try it now" or "No action needed" — never leave the customer wondering |

### Review Checklist

Before publishing any customer communication:

```
COMMUNICATION REVIEW CHECKLIST

[ ] Is the subject/headline clear and specific?
[ ] Does the first sentence state what changed and why it matters?
[ ] Is technical jargon eliminated or explained?
[ ] Is the required action (if any) crystal clear?
[ ] Are dates, deadlines, and timelines specific?
[ ] Is there a link to more information (docs, FAQ)?
[ ] Is there a support contact for questions?
[ ] Has this been reviewed by CS/Support for accuracy?
[ ] Is the tone appropriate (not too casual, not too corporate)?
[ ] For negative changes: is the "why" honest and respectful?
[ ] For targeting: are we reaching the right audience (not over-communicating)?
```

---

## Measuring Communication Effectiveness

### Communication Metrics

| Metric | What It Measures | Target |
|--------|-----------------|--------|
| Email open rate | Did customers read it? | > 30% for product updates |
| Email click-through rate | Did customers act on it? | > 10% for feature announcements |
| In-app dismissal rate | Was the announcement annoying? | < 80% instant dismissal |
| In-app CTA click rate | Did the announcement drive adoption? | > 15% |
| Migration completion rate | Did customers complete required action? | > 90% by deadline |
| Support ticket volume | Did communication reduce confusion? | Decrease vs no communication |
| Feature adoption rate | Did communication drive awareness and adoption? | Compare announced vs unannounced features |

---

## Failure Modes

| Failure Mode | Symptom | Root Cause | Remedy |
|-------------|---------|------------|--------|
| Over-communication | Customers tune out; unsubscribe from emails | Every small change gets a major announcement | Use tier system; only announce what matters |
| Under-communication | Customers surprised by changes; trust erodes | No communication process | Minimum: changelog for every release |
| Corporate-speak | Communication is vague, jargon-filled, impersonal | Marketing template applied to product comms | Write like a helpful colleague, not a press release |
| Surprise breaking change | Customers discover breaking changes in production | Insufficient notice period | Minimum 90 days notice for breaking changes |
| Communication without support | Customer informed but not supported | No migration tools or support resources | Always pair communication with actionable support |

---

## The Operator's Framework

When communicating product changes:

1. **Maintain the changelog** — every release, every change, consistently and accessibly
2. **Tier your announcements** — match communication intensity to change significance
3. **Lead with the customer benefit** — not "we built X" but "you can now do Y"
4. **Communicate difficult changes honestly** — acknowledge impact, explain reasoning, provide support
5. **Respect attention** — one announcement at a time, frequency caps, relevant targeting
6. **Follow migration timelines** — 90+ days for breaking changes, with escalating urgency
7. **Measure effectiveness** — track open rates, CTR, adoption, and support ticket impact

---

## Summary

Customer communication is the practice of keeping users informed, respected, and supported through product changes. The communication matrix maps change types to appropriate channels and urgency levels. Changelogs provide a transparent, chronological record of all changes. Release notes offer technical detail for power users and developers. In-app announcements drive awareness and adoption but must be managed carefully to prevent fatigue. Migration communication requires a structured timeline — from advance notice (90 days) through final warning to post-migration follow-up. Writing principles (clarity, brevity, honesty, empathy, actionability) ensure that every communication builds trust rather than eroding it. The fundamental principle: customers do not resent change; they resent surprise. Every well-communicated change, even a difficult one, is an opportunity to demonstrate that you respect your customers' time, workflows, and trust.
