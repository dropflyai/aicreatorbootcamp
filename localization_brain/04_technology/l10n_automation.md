# Localization Automation — Authoritative Module

Localization automation transforms manual, error-prone processes into
reliable pipelines that scale with product development velocity. Continuous
localization, CI/CD integration, TMS automation, and OTA updates enable
agile localization that keeps pace with rapid release cycles. This document
codifies automation patterns, architectures, and implementation guidance.

---

## 1. CONTINUOUS LOCALIZATION

### Definition

Continuous localization (CL) is the practice of integrating localization
into the continuous delivery pipeline so that translations are triggered
automatically when source content changes and delivered back to the product
without manual intervention.

### Continuous Localization Pipeline

```
Developer commits code with new/changed strings
    │
    ▼ (Automated: Git hook or CI trigger)
Source strings extracted and pushed to TMS
    │
    ▼ (Automated: TMS notification)
Translators notified of new work
    │
    ▼ (Human: translation + review)
Translations completed in TMS
    │
    ▼ (Automated: TMS webhook or scheduled pull)
Translated strings pulled back to repository
    │
    ▼ (Automated: PR created or direct commit)
Translations merged and deployed
    │
    ▼ (Automated: CI/CD pipeline)
Localized product live
```

### CL vs. Traditional Localization

| Dimension | Traditional | Continuous |
|-----------|------------|-----------|
| Trigger | Manual request | Automated on code change |
| Batch size | Large (release-based) | Small (per commit/feature) |
| Turnaround | Days to weeks | Hours to days |
| Handoff | File exchange (email, FTP) | API/Git integration |
| Quality gate | Pre-release review | Automated QA + sampling |
| Deployment | Release-coupled | Independent or OTA |

---

## 2. CI/CD INTEGRATION

### Git-Based Workflows

**Pattern 1: TMS-Managed PR**
```
main branch → TMS monitors → New strings detected →
TMS translates → TMS creates PR → CI validates → Auto-merge
```

**Pattern 2: CI Push/Pull**
```yaml
# Push source strings (on main branch change)
on:
  push:
    branches: [main]
    paths: ['src/locales/en/**']
jobs:
  push-strings:
    steps:
      - run: crowdin push --source

# Pull translations (scheduled or webhook)
on:
  schedule:
    - cron: '0 8 * * *'  # Daily at 8 AM
jobs:
  pull-translations:
    steps:
      - run: crowdin pull --all
      - run: npm run validate-translations
      - run: git add src/locales/
      - run: |
          git diff --cached --quiet || \
          git commit -m "chore: update translations" && \
          gh pr create --title "Update translations" --body "Automated translation update"
```

**Pattern 3: Monorepo with Multiple Products**
```yaml
on:
  push:
    paths:
      - 'packages/app-a/locales/en/**'
      - 'packages/app-b/locales/en/**'
jobs:
  sync-translations:
    strategy:
      matrix:
        package: [app-a, app-b]
    steps:
      - run: crowdin push --source --branch ${{ matrix.package }}
```

### CI Quality Gates

| Gate | Check | Action on Failure |
|------|-------|------------------|
| Missing translations | Source keys without target translations | Block deploy or warn |
| Placeholder mismatch | {variables} differ between source and target | Block deploy |
| ICU syntax errors | Malformed plural/select messages | Block deploy |
| Length violations | Translations exceed character limits | Warn |
| Encoding errors | Non-UTF-8 content | Block deploy |
| Untranslated strings | Percentage threshold not met | Block deploy for tier 1 locales |

---

## 3. TMS INTEGRATION PATTERNS

### API Integration

| TMS | API Type | Key Capabilities |
|-----|----------|-----------------|
| Crowdin | REST + CLI | Push/pull, project management, OTA |
| Lokalise | REST + CLI | Push/pull, screenshots, OTA |
| Phrase | REST + CLI | Push/pull, workflow management |
| Smartling | REST | Push/pull, GDN (proxy) |

### Webhook-Based Automation

```
TMS Event (translation complete)
    │
    ▼ (Webhook to automation platform)
n8n / Zapier / Custom endpoint
    │
    ▼
Actions:
├── Pull translations to repository
├── Create PR for review
├── Notify team on Slack
├── Update progress dashboard
└── Trigger deployment (if auto-deploy)
```

### TMS Automation Rules

| Trigger | Automated Action |
|---------|-----------------|
| New source string added | Pre-translate with TM + MT |
| Translation completed | Run automated QA checks |
| All languages complete | Create PR or trigger deploy |
| QA check fails | Route back to translator |
| Deadline approaching | Send reminder notification |
| New translator assigned | Send onboarding materials |

---

## 4. OVER-THE-AIR (OTA) UPDATES

### What Is OTA for Translations?

OTA allows updating translations in a live application without a full
app release. New or corrected translations are fetched from a CDN and
applied at runtime.

### OTA Architecture

```
TMS (source of truth)
    │
    ▼ (Publish event)
CDN / Edge Cache
    │
    ▼ (HTTP request at app startup or periodic)
Client App
├── Fetches latest translations
├── Caches locally
├── Falls back to bundled translations if offline
└── Applies new translations
```

### OTA Providers

| Provider | Platform | Features |
|----------|---------|---------|
| Crowdin OTA | Web, Mobile | CDN delivery, versioning |
| Lokalise OTA | Web, Mobile, IoT | CDN, A/B testing translations |
| Phrase OTA | Mobile (iOS, Android) | SDK, caching, fallback |
| Custom | Any | Full control, DIY |

### OTA Best Practices

1. **Bundle baseline translations** — App works offline with bundled strings
2. **Cache aggressively** — Do not fetch on every screen render
3. **Version translations** — Prevent mismatch between app version and strings
4. **Fallback chain** — OTA → local cache → bundled → source language
5. **Monitor delivery** — Track CDN latency and cache hit rates
6. **Gradual rollout** — Test OTA updates before global deployment

---

## 5. AGILE LOCALIZATION

### Sprint-Integrated Localization

```
Sprint Planning:
├── Identify localizable content in sprint
├── Estimate localization effort
├── Include l10n in sprint timeline
└── Assign l10n tasks

During Sprint:
├── Developers externalize strings as they code
├── Strings pushed to TMS daily (or on merge)
├── Translators work in parallel
└── QA includes l10n checks

Sprint Review:
├── Localized screens reviewed
├── Quality assessed
└── Issues logged for next sprint

Definition of Done includes:
├── All strings externalized
├── Pseudo-localization passes
├── Tier 1 locales translated
└── L10n QA passes
```

### String Freeze vs. Continuous

| Approach | Description | Pros | Cons |
|----------|-------------|------|------|
| String freeze | No string changes X days before release | Clean handoff, complete translations | Slows development, artificial deadline |
| Continuous | Strings translated as they change | Fast, agile-compatible | May ship with partial translations |
| Hybrid | Continuous for Tier 2–3, freeze for Tier 1 | Balanced | More complex process |

---

## 6. AUTOMATION TOOLING

### Automation Platform Options

| Platform | Best For | Cost |
|----------|---------|------|
| GitHub Actions | CI/CD integration | Free for OSS, included in GitHub |
| n8n | Custom workflow automation | Free (self-host) or paid |
| Zapier | No-code automation | $20+/month |
| Make (Integromat) | Complex multi-step workflows | $9+/month |
| Custom scripts | Full control | Development time |

### Key Automations to Build

| Priority | Automation | Implementation |
|----------|-----------|---------------|
| Critical | Source string push to TMS | CI trigger on locale file change |
| Critical | Translation pull to repo | Scheduled or webhook-triggered |
| High | QA validation on pull | CI step in translation PR |
| High | Missing translation check | Pre-deploy CI gate |
| Medium | Progress notifications | TMS webhook → Slack |
| Medium | Cost reporting | TMS API → dashboard |
| Low | Screenshot capture for context | Playwright + TMS API |
| Low | Translation review assignment | TMS automation rules |

---

## 7. FILE FORMAT AUTOMATION

### String Extraction

| Framework | Extraction Method |
|-----------|------------------|
| React (i18next) | Resource files are source of truth |
| React (FormatJS) | `formatjs extract` CLI command |
| Android | `strings.xml` is source of truth |
| iOS | `genstrings` utility or `Localizable.strings` |
| Flutter | `.arb` files with `intl_utils` |
| Django | `makemessages` management command |
| Rails | `i18n-tasks` gem |

### Format Conversion

When TMS and codebase use different formats:
```
Codebase (JSON) ←→ TMS (XLIFF) ←→ Translator (CAT/XLIFF)

Conversion handled by:
├── TMS built-in format support
├── Okapi Framework (open-source)
├── Custom conversion scripts
└── CLI tools (i18next-conv, etc.)
```

---

## 8. MONITORING AND OBSERVABILITY

### What to Monitor

| Metric | Source | Alert Threshold |
|--------|--------|----------------|
| Translation coverage | TMS API | <95% for Tier 1 locales |
| Pipeline latency | CI/CD logs | >24 hours from commit to translated |
| QA failure rate | CI/CD logs | >5% of translations fail QA |
| OTA delivery time | CDN metrics | >5 seconds |
| OTA cache hit rate | CDN metrics | <90% |
| Missing translations in production | Runtime monitoring | Any critical string |

### Alerting

```
Translation coverage drops below 95%
    → Slack alert to l10n team
    → Auto-assign pending translations to priority queue

Pipeline stuck for >24 hours
    → Slack alert to l10n engineer
    → Check TMS API health
    → Check CI pipeline status

QA failures spike
    → Slack alert with failure details
    → Block merge until resolved
```

---

## 9. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Manual file handoff | Email files to translators | TMS + Git integration |
| No automation | Every step requires human intervention | Build CI/CD pipeline |
| Over-automation | Translations auto-merged without QA | Always include QA gate |
| Ignore pipeline failures | Failures silently ignored | Alerting + blocking |
| Monolithic translation batches | One huge batch per release | Continuous small batches |
| No monitoring | Pipeline runs but nobody watches | Dashboards + alerts |

---

**Localization automation is the multiplier that makes global products
possible at startup velocity. Without it, localization is a bottleneck
that slows every release. With it, localization becomes invisible
infrastructure — always running, always current, always delivering.
The goal is zero manual steps between a developer writing a string and
a user seeing it in their language.**
