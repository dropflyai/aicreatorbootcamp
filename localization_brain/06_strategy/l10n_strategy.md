# Localization Strategy — Authoritative Module

Localization strategy determines which markets to enter, in what order,
with what depth of localization, and at what investment level. It balances
market opportunity against localization cost, aligning language support
with business objectives. This document codifies strategic frameworks
for market prioritization, locale tiering, minimum viable localization,
ROI measurement, and build-vs-buy decisions.

---

## 1. MARKET PRIORITIZATION FRAMEWORK

### Revenue-Opportunity Matrix

| Factor | Weight | Data Source |
|--------|--------|-------------|
| Market size (TAM) | 25% | Industry reports, government data |
| Existing user base | 20% | Product analytics, sign-ups by locale |
| Revenue per user (ARPU) | 15% | Payment data by country |
| Competitive landscape | 15% | Competitor locale coverage |
| Localization complexity | 10% | Script, legal, cultural distance |
| Strategic importance | 10% | Board/investor priority markets |
| Payment infrastructure | 5% | Local payment method availability |

### Market Scoring Model

```python
def score_market(market, weights):
    """Score a potential market for localization priority."""
    score = 0
    score += market['tam_score'] * weights['tam']
    score += market['existing_users_score'] * weights['users']
    score += market['arpu_score'] * weights['arpu']
    score += market['competition_score'] * weights['competition']
    score += (10 - market['complexity_score']) * weights['complexity']
    score += market['strategic_score'] * weights['strategic']
    score += market['payment_score'] * weights['payment']
    return {
        'market': market['name'],
        'locale': market['locale'],
        'score': round(score, 2),
        'tier': assign_tier(score)
    }

def assign_tier(score):
    if score >= 8.0: return 'Tier 1'
    if score >= 6.0: return 'Tier 2'
    if score >= 4.0: return 'Tier 3'
    return 'Tier 4'
```

### Common Market Groupings

| Tier | Markets | Characteristics |
|------|---------|----------------|
| Tier 1 | US, UK, DE, FR, JP | High revenue, established user base |
| Tier 2 | ES, IT, PT-BR, KR, NL | Growing revenue, moderate complexity |
| Tier 3 | AR, TH, VN, PL, TR | Emerging, high growth potential |
| Tier 4 | Long-tail markets | Opportunistic, community-driven |

---

## 2. LOCALE TIERING

### Tiering Dimensions

| Dimension | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|-----------|--------|--------|--------|--------|
| Translation coverage | 100% | 95%+ | 80%+ | 50%+ |
| Translation quality | Human + review | Human (MTPE) | MTPE | MT only |
| UI/UX adaptation | Full cultural | Functional | Basic | Minimal |
| Content localization | Full | Priority content | Core only | Auto-translated |
| Customer support | Native language | Business hours | Email only | English fallback |
| Legal compliance | Full | Full | Required only | Minimal |
| Marketing | Localized campaigns | Translated content | Basic presence | None |
| Update cadence | Same-day as source | Within 48 hours | Within 1 week | Best effort |

### Tier Migration Criteria

```
Tier 4 → Tier 3: Revenue exceeds $50K/year from market
Tier 3 → Tier 2: Revenue exceeds $250K/year, >5% growth
Tier 2 → Tier 1: Revenue exceeds $1M/year, strategic market
Tier 1 → Tier 2: Revenue declines below $500K, deprioritized
```

---

## 3. MINIMUM VIABLE LOCALIZATION (MVL)

### MVL Definition

Minimum Viable Localization is the smallest localization investment
that allows meaningful market validation. It answers: "Is there demand
in this market?" before committing to full localization.

### MVL Components

| Component | MVL Level | Full Localization |
|-----------|-----------|-------------------|
| UI strings | Core flows only (20-30%) | 100% |
| Onboarding | Fully translated | Fully translated + adapted |
| Error messages | Critical errors only | All errors |
| Help/docs | FAQ only | Full documentation |
| Marketing | Landing page only | Full website + campaigns |
| Legal | Privacy policy + ToS | Full legal suite |
| Support | English with MT assist | Native language support |
| Payment | Local currency display | Local payment methods |

### MVL Launch Checklist

```
Pre-Launch:
├── [ ] Core UI strings translated (sign-up, login, main workflow)
├── [ ] Onboarding flow localized
├── [ ] Critical error messages translated
├── [ ] Privacy policy and ToS available in language
├── [ ] Currency display localized
├── [ ] Landing page in target language
├── [ ] Basic SEO (title, meta, H1) in target language
└── [ ] Locale detection/switching functional

Validation Metrics (30-60 days):
├── [ ] Sign-up conversion rate vs. English baseline
├── [ ] Activation rate in target locale
├── [ ] Organic search impressions in target language
├── [ ] Support ticket volume and language
└── [ ] Revenue per user in market
```

---

## 4. LOCALIZATION ROI FRAMEWORK

### ROI Calculation

```
Localization ROI = (Incremental Revenue - Localization Cost) / Localization Cost

Components:
├── Incremental Revenue
│   ├── New user revenue from localized markets
│   ├── Increased conversion from existing market users
│   ├── Reduced churn (users who stay due to native language)
│   └── Higher ARPU (willingness to pay in native language)
│
├── Localization Cost
│   ├── Translation (per-word or per-project)
│   ├── Engineering (i18n infrastructure)
│   ├── QA and testing
│   ├── Tooling (TMS, automation)
│   ├── Ongoing maintenance
│   └── Program management
│
└── Indirect Value (harder to quantify)
    ├── Brand perception in market
    ├── Competitive positioning
    ├── SEO benefit
    └── User satisfaction (NPS improvement)
```

### ROI Benchmarks

| Investment Type | Typical ROI | Payback Period |
|----------------|------------|----------------|
| Tier 1 market (full) | 300-500% | 6-12 months |
| Tier 2 market (MTPE) | 200-400% | 9-18 months |
| Tier 3 market (MVL) | 100-200% | 12-24 months |
| i18n infrastructure | 500%+ | 3-6 months (amortized) |

### Attribution Model

| Model | Method | Accuracy |
|-------|--------|----------|
| Before/after | Revenue change post-launch | Medium |
| Cohort comparison | Localized vs. non-localized users | High |
| Geo-specific | Revenue by country/locale | Medium-High |
| A/B test | Localized vs. English in same market | Highest |

---

## 5. VENDOR vs. INTERNAL DECISION

### Build vs. Buy Matrix

| Factor | Internal Team | LSP/Vendor | Hybrid |
|--------|-------------|-----------|--------|
| Volume <100K words/year | Expensive | Cost-effective | Overkill |
| Volume 100K-1M words/year | Consider | Default choice | Optimal |
| Volume >1M words/year | For core content | For volume content | Standard |
| Domain expertise critical | Best option | Risky without training | Split by content type |
| Speed priority | Slower ramp-up | Immediate capacity | Balanced |
| Quality control | Direct oversight | SLA-based | Mixed oversight |

### Internal Team Structure

| Role | When to Hire | Typical Title |
|------|-------------|---------------|
| First hire | >$100K l10n spend | Localization Manager |
| Second hire | >5 locales active | Localization Engineer |
| Third hire | >10 locales or complex | Linguist / Reviewer |
| Scale hire | >$500K l10n spend | L10n Program Manager |

### Vendor Selection Criteria

| Criterion | Weight | Evaluation Method |
|-----------|--------|-------------------|
| Language coverage | 20% | Does vendor cover all target locales? |
| Domain expertise | 20% | Has vendor localized similar products? |
| Technology integration | 15% | TMS compatibility, API support |
| Quality track record | 15% | References, sample translations |
| Pricing | 15% | Per-word rate, minimum charges |
| Scalability | 10% | Capacity to handle volume spikes |
| Communication | 5% | Responsiveness, PM quality |

---

## 6. LOCALIZATION ROADMAP TEMPLATE

### Quarterly Planning

```
Q1: Foundation
├── i18n infrastructure build
├── TMS selection and integration
├── Glossary and style guide creation
├── Tier 1 locale #1 full localization
└── MVL for Tier 2 locales #1-3

Q2: Expansion
├── Tier 1 locale #2 full localization
├── Tier 2 locales #1-3 promotion based on MVL data
├── OTA translation delivery implementation
├── Automated QA pipeline
└── MVL for Tier 3 locales #1-5

Q3: Optimization
├── MT engine evaluation and integration
├── Continuous localization pipeline
├── Quality improvement based on user feedback
├── Tier 2 locales #4-6 MVL
└── Regional content adaptation for Tier 1

Q4: Scale
├── Full localization for high-performing Tier 2 markets
├── Community translation program for Tier 4
├── Localization analytics dashboard
├── Annual vendor review
└── Next-year roadmap planning
```

---

## 7. STRATEGIC FRAMEWORKS

### Globalization Readiness Assessment

| Dimension | Score 1-5 | Assessment Question |
|-----------|-----------|---------------------|
| Product readiness | _ | Is codebase i18n-ready? |
| Content readiness | _ | Is content designed for translation? |
| Process readiness | _ | Are l10n workflows defined? |
| Team readiness | _ | Do we have l10n expertise? |
| Technology readiness | _ | Are tools in place (TMS, CI/CD)? |
| Market readiness | _ | Do we understand target markets? |
| Budget readiness | _ | Is l10n budget allocated? |
| Legal readiness | _ | Do we understand regulatory requirements? |

### Competitive L10n Analysis

| Competitor | Locales Supported | Depth | Quality Assessment |
|------------|------------------|-------|--------------------|
| [Comp A] | [list] | Full / Partial | High / Medium / Low |
| [Comp B] | [list] | Full / Partial | High / Medium / Low |
| [Our product] | [list] | Full / Partial | High / Medium / Low |
| Gap analysis | [missing locales] | [depth gap] | [quality gap] |

---

## 8. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Translate everything | Localizing all content for all markets | Tier-based prioritization |
| No market validation | Full localization without testing demand | MVL first |
| Engineering afterthought | i18n bolted on after launch | i18n from day one |
| Single vendor lock-in | One vendor for all languages | Multi-vendor strategy |
| No ROI tracking | Spending without measuring return | Attribution model |
| Locale FOMO | Adding locales based on competitor, not data | Data-driven prioritization |
| Perfectionism | Delaying launch until 100% translated | Ship at 80%, iterate |

---

**Localization strategy is a capital allocation problem. Every dollar
spent on localization is a dollar not spent elsewhere. The strategic
question is not "should we localize?" but "which markets, in what
order, at what depth, will yield the highest return on our localization
investment?" Data-driven tiering, MVL validation, and continuous ROI
measurement transform localization from a cost center into a
growth engine.**
