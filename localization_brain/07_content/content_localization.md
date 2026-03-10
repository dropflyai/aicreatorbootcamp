# Content Localization — Authoritative Module

Content localization is the process of adapting specific content types —
websites, applications, marketing materials, documentation, and user
interfaces — for target locales. Each content type requires different
localization approaches, quality levels, and workflows. This document
codifies content-type-specific localization methodologies.

---

## 1. WEBSITE LOCALIZATION

### Website Localization Scope

| Element | Localization Required | Notes |
|---------|----------------------|-------|
| Navigation | Full translation | Must match information architecture |
| Page content | Full translation + adaptation | Marketing pages may need transcreation |
| Forms | Full translation | Field labels, validation messages, placeholders |
| CTAs | Transcreation | "Get Started" may not translate directly |
| Footer | Full translation | Legal links, contact info per market |
| Images | Cultural review + adaptation | Replace culturally inappropriate imagery |
| Videos | Subtitle or dub | Based on video importance |
| SEO metadata | Localized keyword research | Not direct translation |
| URLs/slugs | Transliterate or translate | Consistent pattern per locale |
| Structured data | Localize per schema | JSON-LD, Open Graph per locale |

### URL Strategy

| Strategy | Example | Pros | Cons |
|----------|---------|------|------|
| Subdirectory | `example.com/de/` | Single domain authority, easy setup | Requires server config |
| Subdomain | `de.example.com` | Separate hosting possible | Dilutes domain authority |
| ccTLD | `example.de` | Strong local signal | Expensive, complex management |
| Parameter | `example.com?lang=de` | Simplest implementation | Poor SEO, not recommended |

**Recommended:** Subdirectory (`/de/`, `/fr/`, `/ja/`) for most SaaS products.

### Locale Detection and Routing

```
User visits example.com
    │
    ▼
Check: Has user previously set locale preference (cookie)?
├── Yes → Redirect to preferred locale
└── No → Check Accept-Language header
    │
    ▼
Match Accept-Language to supported locales
├── Match found → Suggest locale (banner, not redirect)
└── No match → Serve default locale (en)
    │
    ▼
User can always manually switch locale
├── Persist choice in cookie/localStorage
└── Update URL to reflect locale
```

---

## 2. APPLICATION LOCALIZATION

### UI String Localization

| Category | Example | Localization Consideration |
|----------|---------|---------------------------|
| Labels | "Email Address" | Direct translation, respect character limits |
| Buttons | "Save Changes" | Short, actionable, fits button width |
| Placeholder text | "Enter your email..." | Localized, appropriate length |
| Tooltips | "Click to expand section" | Full translation with context |
| Error messages | "Password must be 8+ characters" | Cultural tone, clear instruction |
| Success messages | "Changes saved!" | Tone-appropriate confirmation |
| Empty states | "No results found" | Helpful, culturally appropriate |
| Loading states | "Loading..." | Localized |
| Confirmation dialogs | "Are you sure you want to delete?" | Clear, unambiguous in all languages |

### In-App Content Localization

| Content | Approach | Priority |
|---------|----------|----------|
| Onboarding flows | Full localization + cultural adaptation | Critical |
| Feature tours | Full localization | High |
| In-app messaging | Full localization | High |
| Push notifications | Full localization, cultural timing | High |
| Email from app | Full localization | High |
| Settings/preferences | Full localization | Medium |
| Admin/backend | Selective | Low |

### Dynamic Content Challenges

| Challenge | Example | Solution |
|-----------|---------|----------|
| User-generated names | "{name} liked your post" | Ensure layout handles long names |
| Dynamic numbers | "3 new notifications" | Proper plural handling per locale |
| Concatenated strings | "You have " + n + " items" | Use ICU MessageFormat instead |
| Date references | "Submitted 2 days ago" | Relative time formatting per locale |
| Currency display | "$12.99" | Locale-aware currency formatting |
| Measurement units | "5 miles away" | Metric/imperial per locale |

---

## 3. MARKETING CONTENT LOCALIZATION

### Marketing Localization Spectrum

```
Translation ──────────────────────────────────── Transcreation
(literal)                                        (creative adaptation)

Product docs     UI strings     Blog posts     Marketing copy     Slogans
    ◄────────────────────────────────────────────────────────►
  Low adaptation                                    High adaptation
  Low cost                                          High cost
  Fast turnaround                                   Slow turnaround
```

### Transcreation Process

| Step | Action | Who |
|------|--------|-----|
| 1. Brief | Provide creative brief with intent, audience, tone | Marketing + L10n |
| 2. Research | Analyze target market cultural context | In-market expert |
| 3. Create | Write new copy that achieves same goal | Native copywriter |
| 4. Review | Verify alignment with brand and intent | Marketing + L10n |
| 5. Iterate | Refine based on feedback | Copywriter |
| 6. Approve | Final sign-off | Marketing stakeholder |

### Marketing Content by Type

| Type | Approach | Quality Level |
|------|----------|---------------|
| Taglines/slogans | Transcreation (never translate literally) | Highest |
| Ad copy (PPC) | Transcreation with keyword optimization | Highest |
| Landing pages | Translation + cultural adaptation | High |
| Case studies | Translation + local relevance check | High |
| Blog posts | Translation or MTPE | Medium |
| Social media | In-market creation preferred | High |
| Press releases | Translation + local media adaptation | High |
| Whitepapers | Translation | Medium |

---

## 4. DOCUMENTATION LOCALIZATION

### Documentation Prioritization

| Doc Type | Priority | Approach |
|----------|----------|----------|
| Getting started guides | Critical | Human translation |
| API reference | Medium | MTPE or English-only |
| Troubleshooting | High | Human translation (top 20 articles) |
| Release notes | Low-Medium | MT + light PE |
| Developer guides | Medium | MTPE |
| Video tutorials | High | Subtitling |
| FAQ | High | Human translation |
| Changelog | Low | English-only or MT |

### Documentation L10n Workflow

```
Source Documentation Updated (EN)
    │
    ▼
Content diff detected (new/changed pages)
    │
    ▼
Priority assessment:
├── Critical (getting started, billing) → Immediate translation
├── High (troubleshooting, FAQ) → Next batch
├── Medium (guides, reference) → Weekly batch
└── Low (changelog, internal) → Skip or MT-only
    │
    ▼
Translation via TMS
    │
    ▼
QA validation
    │
    ▼
Publish localized documentation
```

### Documentation CMS Considerations

| Feature | Requirement |
|---------|-------------|
| Versioning per locale | Translations linked to source version |
| Stale translation marking | Flag when source updated but translation not |
| Partial translation | Show English fallback for untranslated sections |
| Search per locale | Search indexes locale-specific content |
| URL structure | `/docs/en/`, `/docs/de/`, etc. |
| Code samples | Code stays in English; comments may be translated |

---

## 5. UI/UX LOCALIZATION

### Text Expansion Planning

| Language | Typical Expansion vs. English |
|----------|-------------------------------|
| German | +30% |
| French | +20% |
| Spanish | +25% |
| Italian | +15% |
| Portuguese | +30% |
| Russian | +20% |
| Finnish | +30-40% |
| Japanese | -10 to -30% (but wider characters) |
| Chinese | -30 to -50% (but wider characters) |
| Arabic | +25% |
| Korean | -10% (but wider characters) |

### UI Element Considerations

| Element | Consideration | Solution |
|---------|---------------|----------|
| Buttons | Text expansion breaks layout | Min/max width, flexible sizing |
| Navigation tabs | Long labels overflow | Abbreviated labels or horizontal scroll |
| Table headers | Column too narrow | Responsive column widths |
| Form labels | Misalignment with fields | Floating labels or top-aligned |
| Dropdown menus | Long options truncated | Wider dropdowns per locale |
| Breadcrumbs | Path too long | Ellipsis with tooltip |
| Badges/tags | Text overflow | Truncation with tooltip |

### RTL UI Adaptation

| Element | LTR | RTL |
|---------|-----|-----|
| Text alignment | Left | Right |
| Layout flow | Left to right | Right to left |
| Navigation | Left sidebar | Right sidebar |
| Icons (directional) | → | ← |
| Progress bars | Left to right fill | Right to left fill |
| Checkboxes | Left of label | Right of label |
| Close button | Top-right | Top-left |
| Back button | Points left | Points right |

---

## 6. EMAIL LOCALIZATION

### Email Localization Checklist

```
For each localized email:
├── [ ] Subject line translated (keep under 50 chars)
├── [ ] Preheader text translated
├── [ ] Body content translated
├── [ ] CTAs translated (button text)
├── [ ] Footer translated (legal, unsubscribe)
├── [ ] Sender name localized (if applicable)
├── [ ] Date/time in recipient's locale format
├── [ ] Currency in recipient's local currency
├── [ ] Images culturally appropriate
├── [ ] Links point to localized landing pages
├── [ ] Reply-to address handles target language
└── [ ] Send time optimized for recipient timezone
```

### Email-Specific Challenges

| Challenge | Solution |
|-----------|----------|
| Subject line character limits | Shorter translations or abbreviation |
| Dynamic content (names, dates) | ICU formatting, locale-aware |
| Unsubscribe requirements | Country-specific legal requirements |
| HTML rendering across clients | Test per locale in Litmus/Email on Acid |
| Font support | Use web-safe fonts that support target scripts |

---

## 7. SOCIAL MEDIA LOCALIZATION

### Social Media Strategy per Market

| Approach | Description | Best For |
|----------|-------------|----------|
| Translate | Translate EN content to target language | Low-effort markets |
| Adapt | Modify content for cultural relevance | Growing markets |
| Create locally | Original content by in-market team | Priority markets |
| Hybrid | Mix of translated + original content | Most markets |

### Platform Considerations by Market

| Market | Primary Platforms | Notes |
|--------|-----------------|-------|
| US/UK | Twitter/X, LinkedIn, Instagram | English-dominant |
| Germany | LinkedIn, XING, Instagram | XING for B2B |
| Japan | LINE, Twitter/X, Instagram | LINE is dominant messaging |
| China | WeChat, Weibo, Xiaohongshu | Western platforms blocked |
| South Korea | KakaoTalk, Naver, Instagram | Local platforms preferred |
| Russia | VK, Telegram, OK | VK dominant social |
| Brazil | WhatsApp, Instagram, Twitter/X | WhatsApp for business |
| Middle East | WhatsApp, Instagram, Snapchat | Arabic + English mix |

---

## 8. LEGAL CONTENT LOCALIZATION

### Legal Content Requirements

| Content Type | Requirement | Notes |
|-------------|-------------|-------|
| Privacy Policy | Mandatory per market | GDPR, CCPA, LGPD, PIPL requirements |
| Terms of Service | Mandatory | Jurisdiction-specific terms |
| Cookie Consent | Mandatory (EU, others) | Granular consent in EU |
| Data Processing Agreement | B2B requirement | Country-specific |
| Refund/Cancellation Policy | Consumer protection | Varies by country |
| Accessibility Statement | Required in some markets | WCAG compliance |

### Legal Translation Quality Requirements

| Requirement | Standard |
|------------|----------|
| Translator qualification | Legal translation certification |
| Review | In-country legal review |
| Accuracy | 100% meaning preservation |
| Terminology | Legal terms per jurisdiction |
| Updates | Sync with source within 30 days |
| Version control | Dated versions, changelog |

---

## 9. LOCALIZATION BY VERTICAL

### SaaS Product Localization Priorities

| Priority | Content | Rationale |
|----------|---------|-----------|
| 1 | Core app UI | User-facing, daily interaction |
| 2 | Onboarding | First impression, conversion driver |
| 3 | Billing/payment | Revenue-critical, legal requirement |
| 4 | Help documentation | Support cost reduction |
| 5 | Marketing website | Acquisition funnel |
| 6 | Email communications | Engagement and retention |
| 7 | Blog/content | SEO and thought leadership |
| 8 | Developer docs | Developer experience |

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| One-size-fits-all | Same l10n approach for all content | Content-type-specific strategy |
| Literal marketing translation | "Think Different" translated word-for-word | Transcreation for marketing |
| Ignoring SEO | No localized keyword research | Per-market SEO strategy |
| English-only docs | Documentation never translated | Prioritized documentation l10n |
| Static screenshots | EN screenshots in localized docs | Automated screenshot pipeline |
| Concatenated strings | Building sentences from fragments | Use proper i18n formatting |
| Ignoring social platforms | Using only EN-centric platforms | In-market platform strategy |

---

**Content localization is not a monolithic process — each content type
demands its own approach, quality level, and workflow. The teams that
excel treat localization as a spectrum, applying the right level of
investment to each content type based on its impact on user experience,
business outcomes, and legal requirements. Over-localizing low-impact
content wastes resources; under-localizing high-impact content costs
users and revenue.**
