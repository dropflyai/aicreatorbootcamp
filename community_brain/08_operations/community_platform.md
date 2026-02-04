# Community Platform — Authoritative Module

The platform is the physical space of digital community. Like choosing a
building for a school or office, platform choice shapes every interaction,
limits certain activities, and enables others. This document codifies
platform evaluation, migration, multi-platform management, and technical
integration for community operations.

---

## 1. PLATFORM EVALUATION FRAMEWORK

### Evaluation Criteria (Weighted)

| Criterion | Weight | Description | Scoring (1–5) |
|-----------|--------|-------------|--------------|
| Community fit | 20% | How well does it match community type and purpose? | |
| User experience | 15% | Ease of use for members (onboarding, navigation) | |
| Moderation tools | 15% | Content moderation, user management, reporting | |
| Scalability | 10% | Performance and feature adequacy at target scale | |
| Integrations | 10% | API quality, third-party integrations | |
| Analytics | 10% | Built-in analytics quality and depth | |
| Customization | 5% | Branding, layout, feature customization | |
| Cost | 5% | Pricing at current and projected scale | |
| Data portability | 5% | Export capability, API access to own data | |
| Support/reliability | 5% | Vendor responsiveness, uptime track record | |

### Platform Comparison Matrix

| Feature | Discord | Slack | Discourse | Circle | GitHub Discussions |
|---------|---------|-------|-----------|--------|-------------------|
| **Real-time chat** | 5 | 5 | 1 | 3 | 1 |
| **Async discussion** | 2 | 2 | 5 | 4 | 5 |
| **Searchability** | 2 | 2 | 5 | 3 | 5 |
| **SEO value** | 1 | 1 | 5 | 3 | 4 |
| **Free tier** | 5 | 2 | 4 (self-host) | 1 | 5 |
| **Moderation** | 4 | 2 | 5 | 3 | 2 |
| **API/bots** | 5 | 5 | 4 | 3 | 4 |
| **Mobile app** | 4 | 4 | 3 | 3 | 2 |
| **Video/voice** | 5 | 4 | 1 | 3 | 1 |
| **Branding** | 2 | 2 | 5 | 4 | 1 |
| **Events** | 4 | 3 | 2 | 4 | 1 |
| **Member directory** | 3 | 3 | 3 | 5 | 2 |
| **Payments/gating** | 1 | 1 | 1 | 5 | 1 |
| **Trust levels** | 3 (roles) | 2 | 5 | 3 | 2 |

### Platform-Community Fit Guide

| Community Type | Best Platform | Second Choice | Avoid |
|---------------|--------------|---------------|-------|
| Developer/OSS | GitHub Discussions + Discord | Discourse | Circle |
| B2B SaaS | Discourse or Circle | Slack | Discord |
| Creator/educator | Circle or Mighty Networks | Discord | GitHub |
| Enterprise | Slack or custom | Discourse | Discord |
| Gaming | Discord | Custom forum | Slack |
| Professional network | Circle or Mighty Networks | Slack | Discord |
| Technical learning | Discourse | Discord | Slack |
| Local/meetup | Discord or Slack | WhatsApp | Discourse |

---

## 2. PLATFORM MIGRATION

### When to Migrate

Migration is high-risk, high-cost. Only migrate when:
- Current platform fundamentally cannot serve community needs
- Cost has become prohibitive with no alternative
- Platform is shutting down or degrading
- Community has outgrown platform capabilities
- Member experience is significantly impacted

**Do NOT migrate for:**
- "Shiny new platform" syndrome
- Minor feature gaps (use integrations instead)
- Staff preference (member experience matters more)
- Cost savings alone (migration cost is high)

### Migration Framework

**Phase 1: Assessment (4–6 weeks)**
```
├── Document current platform usage patterns
├── Survey members on satisfaction and needs
├── Evaluate target platforms (formal evaluation)
├── Estimate migration scope and effort
├── Calculate total migration cost (time, risk, tooling)
└── Decision: Migrate or stay?
```

**Phase 2: Planning (4–6 weeks)**
```
├── Select target platform
├── Design new community architecture (channels, roles)
├── Create data migration plan (what moves, what does not)
├── Build communication plan for members
├── Set timeline with rollback milestones
└── Assign migration team roles
```

**Phase 3: Preparation (2–4 weeks)**
```
├── Configure target platform
├── Migrate historical data (if possible and valuable)
├── Set up integrations and automations
├── Create onboarding materials for new platform
├── Test with small group of trusted members
└── Gather feedback and iterate
```

**Phase 4: Execution (2–4 weeks)**
```
├── Announce migration to full community (2 weeks notice)
├── Run parallel operation (old + new) for 1–2 weeks
├── Encourage early adopters to move first
├── Provide migration support (guides, office hours)
├── Set old platform to read-only
└── Archive old platform after 30 days
```

**Phase 5: Stabilization (4–8 weeks)**
```
├── Monitor engagement on new platform daily
├── Address member issues immediately
├── Compare metrics to pre-migration baseline
├── Iterate on platform configuration based on usage
├── Collect feedback and adjust
└── Declare migration complete when metrics stabilize
```

### Migration Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Member loss | High (10–30% expected) | High | Excellent communication, easy transition |
| Engagement drop | High (temporary) | Medium | Extra content and events during transition |
| Data loss | Medium | High | Complete data export before migration |
| Platform issues | Medium | Medium | Thorough testing, rollback plan |
| Cultural disruption | Medium | High | Preserve cultural elements in new platform |
| Moderator confusion | Medium | Medium | Training before migration |

---

## 3. MULTI-PLATFORM MANAGEMENT

### When Multi-Platform Is Necessary

| Reason | Example |
|--------|---------|
| Different interaction modes | Forum (async) + chat (sync) |
| Different audiences | Internal (Slack) + public (Discourse) |
| Platform limitations | Discord for voice + Discourse for SEO |
| Ecosystem integration | GitHub for code + Discord for discussion |

### Hub-and-Spoke Architecture

```
                      ┌───────────────┐
                      │   Primary     │
                      │   Platform    │
                      │  (Hub)        │
                      └──────┬────────┘
                             │
            ┌────────────────┼────────────────┐
            │                │                │
       ┌────▼────┐     ┌────▼────┐     ┌────▼────┐
       │  Spoke  │     │  Spoke  │     │  Spoke  │
       │(Discord)│     │(GitHub) │     │(Twitter)│
       └─────────┘     └─────────┘     └─────────┘
```

**Hub:** Where the community identity lives. Source of truth for
announcements, governance, and long-form content.

**Spokes:** Specialized platforms for specific use cases. Link back
to hub for context and continuity.

### Cross-Platform Management Rules

1. **One source of truth** for announcements, policies, and governance
2. **No duplicate content** — share links, not copies
3. **Consistent identity** — same branding, same tone, same rules
4. **Unified moderation** — same policies enforced on all platforms
5. **Cross-linking** — every platform references the others
6. **Unified analytics** — aggregate metrics across all platforms
7. **Single onboarding** — one entry point that directs to relevant platforms

---

## 4. SINGLE SIGN-ON (SSO)

### Why SSO Matters

SSO reduces friction for members who engage across multiple community
touchpoints (forum, events, learning, main product).

### SSO Architecture

```
                   ┌──────────────────┐
                   │  Identity        │
                   │  Provider        │
                   │  (Auth0, Okta,   │
                   │   Firebase Auth) │
                   └────────┬─────────┘
                            │
         ┌──────────────────┼──────────────────┐
         │                  │                  │
    ┌────▼────┐       ┌────▼────┐       ┌────▼────┐
    │Community│       │  Main   │       │  Event  │
    │ Forum   │       │ Product │       │Platform │
    └─────────┘       └─────────┘       └─────────┘
```

### SSO Implementation Options

| Platform | SSO Support | Method |
|----------|------------|--------|
| Discourse | Full | OAuth2, SAML, OIDC |
| Circle | Full | OAuth2, SAML |
| Discord | Partial | OAuth2 (via bot) |
| Slack | Full (Enterprise) | SAML |
| GitHub | Full | OAuth2 |

---

## 5. ANALYTICS SETUP

### Platform-Specific Analytics Configuration

**Discord Analytics Setup:**
```
1. Enable Community features (if server qualifies)
2. Server Insights dashboard (built-in)
3. Bot-based analytics (Statbot, MEE6 Analytics)
4. External integration (Common Room, Orbit)
```

**Discourse Analytics Setup:**
```
1. Admin → Reports (built-in comprehensive analytics)
2. Data Explorer plugin (custom SQL queries)
3. Google Analytics integration
4. API for external tool integration
```

**Circle Analytics Setup:**
```
1. Built-in analytics dashboard
2. Google Analytics integration
3. CSV export for external analysis
4. API for custom integration
```

### Custom Analytics Pipeline

For advanced communities requiring custom analytics:

```
Data Sources → ETL Pipeline → Data Warehouse → Visualization

Discord API  ──┐
Discourse API──┤     ┌─────────┐     ┌───────────┐     ┌──────────┐
GitHub API   ──┼────▶│ ETL     │────▶│ Warehouse │────▶│ Dashboard│
Events API   ──┤     │(Airbyte)│     │(Supabase) │     │(Metabase)│
CRM API      ──┘     └─────────┘     └───────────┘     └──────────┘
```

---

## 6. BOTS AND AUTOMATION

### Essential Community Bots

| Bot Function | Discord | Slack | Discourse |
|-------------|---------|-------|-----------|
| Welcome | MEE6, Carl-bot, custom | Workflow Builder, Greetbot | Built-in welcome |
| Moderation | AutoMod, Dyno, MEE6 | Moderator apps | Built-in + Akismet |
| Roles | Reaction roles, Arcane | Workflow Builder | Trust levels (auto) |
| Reminders | Reminder Bot | Remind, Workflow Builder | Scheduled posts |
| Analytics | Statbot | Built-in | Built-in |
| Integration | Webhooks, custom | Webhooks, custom | Plugins, webhooks |
| Fun/engagement | Disboard, Tatsu | Donut, Icebreaker | Custom plugins |

### Custom Bot Development

When off-the-shelf bots are insufficient:

**Common Custom Bot Functions:**
- Member journey tracking (cross-platform)
- Automated content curation and recommendation
- Custom gamification/points system
- Cross-platform notification relay
- Automated report generation
- Smart routing of questions to experts

### Bot Design Principles

1. **Helpful, not noisy.** Bots should reduce noise, not create it.
2. **Transparent.** Members should know when they are interacting with a bot.
3. **Graceful failure.** Bots that break should fail silently, not spam.
4. **Opt-out.** Members can mute or ignore bot messages.
5. **Rate limited.** Bots should never flood channels.
6. **Maintained.** Unmaintained bots become liabilities.

---

## 7. PLATFORM SECURITY

### Security Requirements

| Requirement | Implementation |
|------------|---------------|
| Access control | Role-based permissions, least privilege |
| Data encryption | Platform-level TLS, encrypted storage |
| Backup | Regular data export and backup |
| Audit trail | Log moderator actions, configuration changes |
| Incident response | Documented plan for security incidents |
| Third-party review | Evaluate security of bots and integrations |
| Member data protection | GDPR compliance, data minimization |

### Common Security Threats

| Threat | Description | Mitigation |
|--------|-------------|------------|
| Account takeover | Member accounts compromised | 2FA encouragement, suspicious activity alerts |
| Spam bots | Automated spam accounts join | Verification, anti-bot measures |
| Phishing | Links to malicious sites shared | Link scanning, education |
| Data scraping | Member data collected without consent | Rate limiting, privacy settings |
| Social engineering | Manipulation to gain access/info | Awareness training, verification procedures |

---

## 8. PLATFORM CUSTOMIZATION

### Branding Customization

| Element | Customizable On | Priority |
|---------|----------------|---------|
| Logo | All platforms | Critical |
| Colors | Discourse, Circle, custom | High |
| Custom domain | Discourse, Circle | High |
| Email templates | Discourse, Circle, email tools | Medium |
| Landing page | Discourse, Circle, custom | Medium |
| Custom fields | Most platforms | Low |
| Custom CSS | Discourse | Low |

### Information Architecture Customization

- Channel/space organization (all platforms)
- Category structure (Discourse, Circle)
- Navigation menus (Discourse, Circle)
- Role and permission structure (all platforms)
- Onboarding flow customization (Circle, custom)

---

## 9. PLATFORM MONITORING

### Uptime and Performance

| Metric | Target | Monitoring Method |
|--------|--------|------------------|
| Platform availability | 99.9% | Status page, UptimeRobot |
| Page load time | <3 seconds | Synthetic monitoring |
| API response time | <500ms | API monitoring |
| Bot responsiveness | <2 seconds | Custom monitoring |
| Search performance | <1 second results | Manual testing |

### Performance Alerting

Set up alerts for:
- Platform downtime (immediate)
- Degraded performance (>5 seconds load time)
- Bot failures (automated checks)
- Integration failures (webhook delivery failures)
- Unusual traffic patterns (potential attack)

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Platform hopping | Switching platforms every year | Commit and optimize |
| Over-customization | So customized it cannot be maintained | Standard config + minimal custom |
| Unmonitored bots | Bots running with no oversight | Regular bot health checks |
| No data export | Cannot leave platform if needed | Regular data exports |
| Security neglect | No 2FA, no audit trail, no backup | Security baseline implementation |
| Feature creep | Adding every integration and bot available | Minimum viable tooling |

---

**The platform is the container, not the community. A great community can
outgrow a bad platform; a great platform cannot save a bad community. Choose
a platform that serves your community's needs, configure it for your specific
context, and then focus your energy on what happens inside it — the people,
conversations, and relationships that make the community worth visiting.**
