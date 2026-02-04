# Community Strategy — Authoritative Module

Strategy is the bridge between community theory and community execution.
A community without strategy is a gathering without purpose. This document
codifies the strategic framework governing all community planning.

---

## 1. THE 5P FRAMEWORK: PURPOSE, PEOPLE, PLACE, PARTICIPATION, POLICY

Every community strategy must address five dimensions. Omitting any
dimension produces a structurally unsound community.

### 1.1 Purpose

Why does this community exist? Purpose must satisfy three criteria:

- **Specific:** Not "connect people" but "help frontend developers master
  accessibility implementation"
- **Valuable:** Members must gain something they cannot get elsewhere
- **Sustainable:** Purpose must remain relevant for 3+ years

**Purpose Statement Template:**
```
This community exists to help [specific audience]
achieve [specific outcome] through [specific mechanism].
```

**Purpose Archetypes:**
| Archetype | Description | Example |
|-----------|-------------|---------|
| Learning | Skill development and knowledge sharing | freeCodeCamp |
| Support | Mutual help with shared challenges | Patient communities |
| Practice | Shared craft refinement | Designer communities |
| Product | Maximize value from a shared product | Figma Community |
| Movement | Advance a shared cause | Climate action groups |
| Network | Professional connection and opportunity | YC alumni |

### 1.2 People

Who is this community for? Define with precision:

**Primary Audience:**
- Demographics (role, experience level, industry)
- Psychographics (motivations, values, pain points)
- Current behavior (where they gather now, what they read)

**Exclusion Criteria (equally important):**
- Who is explicitly NOT the target
- What behavior is incompatible with community purpose
- What experience level is out of scope

**Founding Members (First 50):**
- Hand-selected, personally invited
- Represent the ideal community culture
- Willing to invest disproportionate effort early
- Diverse enough to prevent monoculture

### 1.3 Place

Where does the community live? Platform selection is a strategic decision
with long-term consequences.

**Platform Decision Matrix:**

| Factor | Discord | Slack | Discourse | Circle | GitHub Discussions |
|--------|---------|-------|-----------|--------|-------------------|
| Real-time chat | Excellent | Excellent | Poor | Good | Poor |
| Async discussion | Poor | Poor | Excellent | Good | Good |
| Searchability | Poor | Poor | Excellent | Good | Excellent |
| Free tier | Generous | Limited | Self-host | None | Free (OSS) |
| Developer affinity | High | Medium | Medium | Low | Very High |
| Moderation tools | Good | Basic | Excellent | Good | Basic |
| Custom branding | Limited | Limited | Full | Full | None |
| API/integrations | Excellent | Excellent | Good | Good | Excellent |
| Content longevity | Low | Very Low | High | Medium | High |
| Mobile experience | Good | Good | Fair | Good | Fair |

**Platform Selection Rules:**
1. Match communication style to community purpose
2. Go where your audience already is (reduce friction)
3. Prefer platforms you can control and export data from
4. Never use more platforms than you can actively moderate
5. Start with one platform; add only when proven necessary

### 1.4 Participation

How do members participate? Design the participation architecture:

**Participation Modes:**
- **Consume:** Read, watch, learn (lowest barrier)
- **React:** Like, upvote, emoji (minimal effort)
- **Comment:** Reply, discuss, question (moderate effort)
- **Create:** Post, write, share original content (high effort)
- **Lead:** Moderate, organize, mentor (highest effort)

**First Actions (Critical):**
- What does a member do in their first 5 minutes?
- What does a member do in their first week?
- What prompts their first contribution?
- What triggers their second visit?

### 1.5 Policy

What are the rules? Policy creates safety, predictability, and fairness.

**Required Policies:**
- Code of conduct (behavioral expectations)
- Content guidelines (what is on-topic, what is not)
- Moderation policy (how rules are enforced)
- Privacy policy (what data is collected, how it is used)
- Intellectual property (who owns community content)

---

## 2. COMMUNITY TYPE SELECTION

### Decision Framework

| If Your Goal Is... | Choose This Type | Primary Value |
|---------------------|-----------------|---------------|
| Product adoption | Product community | Education, support |
| Developer ecosystem | Developer community | Documentation, integration |
| Customer retention | Customer community | Peer support, belonging |
| Thought leadership | Practice community | Knowledge sharing |
| Market creation | Movement community | Advocacy, awareness |
| Talent access | Professional community | Networking, recruitment |

### Hybrid Communities

Most successful communities are hybrids. A product community that also
serves as a practice community creates stronger retention than either alone.

**Recommended Hybrid Combinations:**
- Product + Practice (Figma: tool users + design practitioners)
- Product + Support (Salesforce: tool users + peer support)
- Practice + Movement (freeCodeCamp: learning + access to tech)

---

## 3. PLATFORM SELECTION DEEP DIVE

### Discord Strategy

Best for: Developer communities, gaming communities, real-time collaboration.

**Architecture:**
- Category-based channel organization
- Role-based access control
- Bot ecosystem for automation
- Voice channels for live events
- Thread support for focused discussions

**Risks:** Content impermanence, discoverability challenges, noise management.

### Slack Strategy

Best for: Professional communities, enterprise-adjacent, B2B.

**Architecture:**
- Channel-per-topic organization
- Slack Connect for cross-org collaboration
- Workflow builder for automation
- Limited free tier (90-day message history)

**Risks:** Cost at scale, message history limits, corporate feel.

### Discourse Strategy

Best for: Knowledge-building communities, long-form discussion, SEO value.

**Architecture:**
- Category and tag-based organization
- Trust levels (automatic progression)
- Built-in gamification
- Full-text search with SEO indexing
- Plugin ecosystem

**Risks:** Higher barrier to post, slower engagement cadence.

### Circle Strategy

Best for: Creator communities, course communities, membership businesses.

**Architecture:**
- Space-based organization
- Event integration
- Course/content delivery
- Member directory
- Paywall capability

**Risks:** Platform dependency, limited API, cost.

### Multi-Platform Strategy

When a single platform cannot serve all needs, use a hub-and-spoke model:

```
                    ┌──────────────┐
                    │   Primary    │
                    │  Platform    │
                    │  (Discourse) │
                    └──────┬───────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │ Discord │      │ GitHub  │      │ Twitter │
    │  (chat) │      │ (code)  │      │(outreach)│
    └─────────┘      └─────────┘      └─────────┘
```

Rules for multi-platform:
- One platform is primary (source of truth)
- Secondary platforms serve specific purposes
- Cross-reference and link between platforms
- Never duplicate governance across platforms

---

## 4. LAUNCH STRATEGY

### Pre-Launch (8–12 weeks before)

| Week | Activity | Output |
|------|----------|--------|
| 1–2 | Define 5P framework | Strategy document |
| 3–4 | Select and configure platform | Platform ready |
| 5–6 | Create foundational content | 20+ seed posts/discussions |
| 7–8 | Recruit founding members (20–50) | Invite list |
| 9–10 | Soft launch with founders | Culture established |
| 11–12 | Iterate based on founder feedback | Refined experience |

### Launch (Week 1–4)

| Week | Activity | Target |
|------|----------|--------|
| 1 | Open to broader audience | +50–100 members |
| 2 | First community event (AMA, workshop) | Engagement spike |
| 3 | Highlight early contributions | Social proof |
| 4 | First feedback collection | Iterate |

### Post-Launch (Month 2–6)

| Month | Focus | Success Metric |
|-------|-------|---------------|
| 2 | Engagement habits | DAU/MAU > 20% |
| 3 | Content flywheel | Member-created > staff-created |
| 4 | Leadership emergence | 5+ volunteer contributors |
| 5 | Program launch | First formal program |
| 6 | Health assessment | Community health score > 60 |

---

## 5. STRATEGIC PLANNING CADENCE

### Quarterly Review

Every quarter, assess:
1. Are we fulfilling our stated purpose?
2. Are the right people joining and staying?
3. Is the platform serving our needs?
4. Are participation rates healthy?
5. Are policies working as intended?

### Annual Strategy

Every year, conduct a full strategy review:
1. Revisit the 5P framework for alignment
2. Analyze community economics (ROI calculation)
3. Set growth and health targets for next year
4. Plan programs and events calendar
5. Evaluate platform and tooling
6. Set budget and resource plan

### Strategy Documentation

Maintain a living strategy document with:
- Current state assessment
- 12-month vision
- Quarterly OKRs
- Program roadmap
- Resource plan
- Risk register

---

## 6. COMPETITIVE COMMUNITY ANALYSIS

### Analysis Framework

For each competing or adjacent community, evaluate:

| Dimension | Questions |
|-----------|-----------|
| Purpose | What need does it serve? Where are gaps? |
| Scale | How large? How active? Growing or declining? |
| Platform | Where does it live? What are platform limitations? |
| Culture | What is the tone? Welcoming or exclusive? |
| Content | What content is produced? Quality level? |
| Leadership | Who leads? Professional or volunteer? |
| Weakness | Where do members express frustration? |

### Differentiation Strategy

Your community must offer something competitors do not. Differentiation
options:
- **Depth:** Go deeper on a narrower topic
- **Access:** Provide access to people or information unavailable elsewhere
- **Culture:** Create a distinctly different social environment
- **Quality:** Maintain higher signal-to-noise ratio
- **Format:** Offer a different interaction model (async vs. sync, etc.)

---

## 7. RISK MANAGEMENT

### Strategic Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Platform dependency | Medium | High | Data export, multi-platform |
| Key person dependency | High | High | Distribute leadership |
| Culture degradation at scale | High | Critical | Early policy, active moderation |
| Community fatigue | Medium | Medium | Content variety, breaks |
| Competitor community launch | Low | Medium | Differentiation, loyalty |
| Toxic member escalation | Medium | High | Clear policy, swift enforcement |
| Budget reduction | Medium | High | Demonstrate ROI, reduce cost |

### Crisis Preparedness

Prepare response plans for:
- Platform outage or shutdown
- Community PR crisis (member behavior in public)
- Mass exodus of key members
- Legal or compliance issue
- Safety threat to members

---

## 8. STRATEGY ANTI-PATTERNS

| Anti-Pattern | Description | Correction |
|-------------|-------------|------------|
| Build it and they will come | Launching without audience strategy | Pre-launch recruitment |
| Copy the leader | Replicating another community's strategy | Differentiation analysis |
| Platform first | Choosing platform before defining purpose | 5P framework in order |
| Everything community | Trying to serve every need | Focused purpose |
| Metrics without meaning | Tracking vanity metrics | Value-aligned measurement |
| Growth at all costs | Prioritizing growth over health | Health-first targets |

---

**Strategy is not a document — it is a living framework that evolves with the
community. Review quarterly, revise annually, and always prioritize health
over growth. A healthy community of 500 outperforms a hollow community of
50,000.**
