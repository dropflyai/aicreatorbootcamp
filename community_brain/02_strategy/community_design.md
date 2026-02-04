# Community Design — Authoritative Module

Community design is information architecture for social systems. It determines
how members navigate, interact, and form habits within the community. Poor
community design creates confusion, noise, and abandonment. Intentional design
creates flow, belonging, and self-sustaining engagement.

---

## 1. COMMUNITY ARCHITECTURE

### Channel/Space Design Principles

Every channel or space must have:
1. **Clear purpose** — A one-sentence description of what belongs here
2. **Defined audience** — Who should participate
3. **Expected cadence** — How often activity occurs
4. **Moderation level** — How actively it is managed

### Architecture Patterns

**Pattern 1: Topic-Based (Most Common)**
```
├── #general                — Community-wide discussion
├── #introductions          — New member welcomes
├── #announcements          — Official updates (read-heavy)
├── 📚 Learning
│   ├── #beginners          — Entry-level questions
│   ├── #advanced           — Deep technical discussion
│   └── #resources          — Shared articles, tools, links
├── 🛠 Building
│   ├── #show-and-tell      — Share what you built
│   ├── #help               — Request help with projects
│   └── #code-review        — Peer review requests
├── 💬 Social
│   ├── #off-topic          — Non-community-topic chat
│   ├── #jobs               — Job postings and seeking
│   └── #events             — Event announcements
└── 🔒 Internal
    ├── #moderators         — Mod-only discussion
    └── #feedback           — Community feedback/suggestions
```

**Pattern 2: Stage-Based (for Product Communities)**
```
├── Getting Started
│   ├── #onboarding         — Setup help
│   ├── #first-wins         — Early achievements
│   └── #faq                — Common questions
├── Using the Product
│   ├── #tips-and-tricks    — Power user advice
│   ├── #integrations       — Third-party connections
│   └── #troubleshooting    — Bug reports, issues
├── Advanced
│   ├── #api-development    — API and extensions
│   ├── #best-practices     — Workflow optimization
│   └── #feature-requests   — Product feedback
└── Community
    ├── #showcase           — Member projects
    ├── #events             — Meetups, webinars
    └── #careers            — Job opportunities
```

**Pattern 3: Persona-Based (for Diverse Audiences)**
```
├── For Developers
│   ├── #dev-general
│   ├── #dev-help
│   └── #dev-showcase
├── For Designers
│   ├── #design-general
│   ├── #design-feedback
│   └── #design-resources
├── For Business Users
│   ├── #biz-general
│   ├── #biz-use-cases
│   └── #biz-roi
└── Cross-Functional
    ├── #announcements
    ├── #events
    └── #general
```

### Channel Proliferation Rules

- **Start with fewer channels than you think you need.** Empty channels
  signal a dead community. It is better to split a busy channel than to
  launch empty ones.
- **The 10-message rule:** A channel should receive at least 10 messages
  per week. Below that threshold, merge or archive.
- **Maximum channels:** No more than 15–20 visible channels for most
  communities. Use categories and roles to manage visibility.
- **Archive, do not delete:** Channels that become inactive should be
  archived, not deleted, to preserve institutional memory.

---

## 2. ONBOARDING FLOW

### The First 5 Minutes (Critical Window)

A new member's first 5 minutes determine whether they return. Design
every second intentionally.

**Step 1: Welcome (0–30 seconds)**
- Automated welcome message with member's name
- Brief community purpose statement
- Single clear next action

**Step 2: Identity (30 seconds–2 minutes)**
- Self-introduction prompt (structured template)
- Role/interest selection (for personalization)
- Automatic role assignment based on selections

**Step 3: Orientation (2–4 minutes)**
- Brief tour of key spaces (3–5 max)
- Highlight the single most valuable resource
- Show one active discussion they can join

**Step 4: First Action (4–5 minutes)**
- Prompt first contribution (introduction post)
- Direct to a relevant ongoing discussion
- Introduce to a specific person (buddy system)

### Onboarding Automation

```
Trigger: New member joins
├── Send welcome DM (personalized)
├── Post introduction prompt in #introductions
├── Assign default role
├── Wait 24 hours
│   └── If no activity: Send follow-up DM with specific discussion link
├── Wait 72 hours
│   └── If no activity: Send value-highlight email
├── Wait 7 days
│   └── If active: Send "getting more involved" guide
│   └── If inactive: Send "we miss you" with specific content
└── Wait 30 days
    └── If active: Invite to program or event
    └── If inactive: Final outreach, then quiet
```

### Onboarding Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| Activation rate | % who take first action within 7 days | >50% |
| Introduction rate | % who post introduction | >30% |
| 7-day return rate | % who return within 7 days | >40% |
| 30-day retention | % active at day 30 | >25% |
| Time to first value | Median time to first valuable interaction | <24 hours |

---

## 3. MEMBER JOURNEY

### Journey Stages

```
Stranger → Visitor → New Member → Active Member → Contributor → Leader → Alumni

   │          │          │             │              │            │         │
   │          │          │             │              │            │         │
Unaware   Browsing   Onboarding   Participating   Creating    Governing  Departed
```

### Stage Definitions and Design

| Stage | Behavior | Community's Job | Metrics |
|-------|----------|----------------|---------|
| Stranger | Unaware of community | Attract through content, SEO, referral | Reach, impressions |
| Visitor | Browsing without joining | Demonstrate value, reduce friction | Conversion rate |
| New Member | Joined, exploring | Onboard, orient, activate | Activation rate |
| Active Member | Regular participation | Deepen engagement, provide value | DAU, session time |
| Contributor | Creates content, helps others | Recognize, elevate, empower | Contribution rate |
| Leader | Moderates, organizes, mentors | Support, authorize, celebrate | Leader retention |
| Alumni | Departed but positive | Maintain relationship, invite return | Win-back rate |

### Journey Mapping Exercise

For each stage transition, define:
1. **Trigger:** What causes a member to advance?
2. **Barrier:** What prevents advancement?
3. **Enabler:** What facilitates advancement?
4. **Signal:** How do you detect the transition?

---

## 4. RITUALS AND RECURRING EVENTS

### Why Rituals Matter

Rituals create temporal structure, shared memory, and habitual engagement.
Communities without rituals lack rhythm and predictability.

### Ritual Design Framework

| Frequency | Ritual Type | Example | Purpose |
|-----------|------------|---------|---------|
| Daily | Prompt | Daily standup, question of the day | Habit formation |
| Weekly | Gathering | Office hours, show-and-tell | Regular engagement |
| Bi-weekly | Learning | Workshop, AMA, book club | Skill development |
| Monthly | Celebration | Member spotlight, monthly recap | Recognition |
| Quarterly | Review | State of the community, roadmap | Transparency |
| Annual | Summit | Conference, unconference, hackathon | Deep connection |

### Ritual Design Rules

1. **Consistency over perfection.** A mediocre weekly event held reliably
   is more valuable than an excellent event held sporadically.
2. **Start small.** One weekly ritual is enough at launch.
3. **Member-led rituals are more sustainable.** Design rituals that can be
   run by members, not just staff.
4. **Every ritual needs an owner.** Unowned rituals die.
5. **Retire rituals that stop serving their purpose.** Do not maintain
   rituals out of inertia.

---

## 5. CONTENT STRATEGY

### Content Types for Community

| Type | Description | Creator | Frequency |
|------|-------------|---------|-----------|
| Seed content | Staff-created to spark discussion | Team | Daily (early), weekly (mature) |
| Discussion prompts | Questions designed to generate replies | Team + members | 3–5x/week |
| Resource sharing | Articles, tools, links | Members | Organic |
| Original content | Tutorials, guides, case studies | Members | Weekly goal |
| Announcements | Official updates, news | Team | As needed |
| Celebration | Member spotlights, wins, milestones | Team | Weekly |
| User-generated | Show-and-tell, project shares | Members | Organic |

### Content Calendar

Maintain a 4-week rolling content calendar:
- Monday: Discussion prompt (thought-provoking question)
- Tuesday: Resource share (curated article or tool)
- Wednesday: Community event day (workshop, AMA)
- Thursday: Member spotlight or case study
- Friday: Casual/social content, weekly recap

### Content Quality Standards

- Every post should invite response (questions, opinions, shares)
- Avoid broadcast-only content (announcements need discussion hooks)
- Curate ruthlessly — fewer high-quality posts beat many low-quality
- Amplify member content over staff content whenever possible

---

## 6. NOTIFICATION STRATEGY

### The Notification Paradox

Too few notifications: members forget the community exists.
Too many notifications: members mute everything and disengage.

### Notification Design Matrix

| Notification Type | Channel | Frequency Cap | Opt-In Default |
|-------------------|---------|---------------|----------------|
| Welcome sequence | DM/email | 3 over 7 days | Auto |
| Direct mentions | Push/DM | Unlimited | On |
| Thread replies | Push | Unlimited | On |
| Weekly digest | Email | 1x/week | On |
| Event reminders | Push/email | 2 per event | On |
| Announcements | Push | 1–2x/week max | On |
| General activity | None by default | N/A | Off |
| New content | Digest only | 1x/week | Off |

### Notification Rules

1. **Never send more than 3 push notifications per day** (across all types)
2. **Always provide granular opt-out** (per channel, per type)
3. **Digest > individual** for non-urgent content
4. **Time-zone aware** delivery (never send at 3 AM)
5. **Personalized** content in digests (based on interests/activity)
6. **Re-engagement sequence** for dormant members (max 3, then stop)

---

## 7. GAMIFICATION AND RECOGNITION

### Gamification Principles

Gamification in community is not about points and badges — it is about
making contribution visible, valued, and rewarding.

### Recognition Levels

| Level | Mechanism | Example |
|-------|-----------|---------|
| Micro | Automated acknowledgment | Reaction, auto-thank for first post |
| Social | Peer-to-peer recognition | Shoutouts, thanks, nominations |
| Formal | Staff/program recognition | Member spotlight, awards |
| Material | Tangible rewards | Swag, credits, access |
| Status | Elevated role/authority | Moderator, expert badge, title |

### Trust/Level Systems

Progressive trust systems (Discourse model):

| Level | Name | Earned By | Capabilities |
|-------|------|-----------|-------------|
| 0 | New | Joining | Read, limited posting |
| 1 | Basic | Reading 30 min, viewing topics | Full posting, reactions |
| 2 | Member | 15+ days active, 100+ posts read | Edit wiki, invite |
| 3 | Regular | 50% of days over 100 days | Recategorize, rename, close |
| 4 | Leader | Manually granted | Moderate, edit others' posts |

### Anti-Patterns in Gamification

- **Points without purpose:** Points that do not unlock value are meaningless
- **Competition over collaboration:** Leaderboards that discourage helping
- **Badge inflation:** Too many badges devalues all of them
- **Pay-to-win:** Allowing purchase of status undermines merit

---

## 8. ACCESSIBILITY AND INCLUSION IN DESIGN

### Inclusive Design Requirements

- **Language:** Plain language, avoid jargon in onboarding
- **Timezone equity:** Rotate event times, provide async alternatives
- **Platform accessibility:** Ensure screen reader compatibility
- **Cultural sensitivity:** Diverse imagery, inclusive examples
- **Economic access:** Free tier must provide core community value
- **Moderation:** Active prevention of harassment, discrimination

### Neurodiversity Considerations

- Provide text-based alternatives to video/voice
- Allow anonymous or pseudonymous participation
- Structure discussions clearly (prompts, categories)
- Avoid requiring real-time participation for core value

---

## 9. DESIGN REVIEW CHECKLIST

Before launching or redesigning a community, verify:

- [ ] Every channel/space has a clear purpose statement
- [ ] Onboarding flow covers first 5 minutes
- [ ] Member journey has defined transitions and signals
- [ ] At least one weekly ritual is scheduled
- [ ] Content calendar covers first 4 weeks
- [ ] Notification strategy is documented and bounded
- [ ] Recognition system has at least 3 levels
- [ ] Accessibility requirements are met
- [ ] Channel count is ≤20
- [ ] Empty-state content exists in every channel
- [ ] Moderation roles are assigned and trained
- [ ] Analytics tracking is configured

---

**Community design is the invisible architecture that shapes every member
interaction. Like good information architecture, it is noticed only when
it fails. Design with intention, test with members, and iterate relentlessly.
The best community design feels effortless from the inside and is deeply
intentional from the outside.**
