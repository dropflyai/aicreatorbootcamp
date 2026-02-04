# Virality and Referrals -- Engineering Word of Mouth

## Purpose

Virality is the most powerful and least expensive growth mechanism. When a product
spreads through its own usage, acquisition cost approaches zero and growth becomes
exponential. This module codifies the science of viral growth, referral program
design, and word-of-mouth engineering.

---

## Viral Growth Fundamentals

### The Viral Coefficient (K-Factor)

**K = i * c**
Where:
- i = number of invitations/exposures per user
- c = conversion rate of each invitation/exposure

**Interpretation:**
- K < 1: Growth decelerates (each user brings less than one new user)
- K = 1: Linear growth (each user brings exactly one new user)
- K > 1: Exponential growth (each user brings more than one new user)

**Reality check:** Sustained K > 1 is extremely rare. Most successful viral
products achieve K = 0.3-0.7, supplemented by other acquisition channels.
Even K = 0.5 means every 2 users acquired bring 1 free user (33% reduction
in effective CAC).

### Viral Cycle Time

K-factor alone is insufficient. Speed matters. The viral cycle time is how
long it takes for one cycle to complete:

```
Effective growth = K^(t/cycle_time)

Where t = total time period

Example:
K = 0.8, cycle_time = 2 days, t = 30 days: 0.8^15 = 0.035 (slow decay)
K = 0.8, cycle_time = 1 hour, t = 30 days: 0.8^720 = ~0 (but many cycles!)
```

**The key insight:** A product with K = 0.6 and 1-day cycle time can
outperform a product with K = 0.9 and 30-day cycle time.

### Strategies to Improve K-Factor

**Increase invitations (i):**
- Make sharing a natural part of the product experience
- Add sharing prompts at moments of delight (peak-end rule)
- Provide multiple sharing channels (email, social, direct link)
- Make the shared artifact valuable to the recipient
- Pre-populate sharing messages (but allow customization)

**Increase conversion rate (c):**
- Make the landing experience compelling for invited users
- Personalize the invitation ("Sarah invited you to...")
- Reduce friction in the signup process for referred users
- Provide immediate value upon arrival
- Social proof on the invitation landing page

---

## Types of Virality

### 1. Inherent Virality (Product-Driven)

The product REQUIRES other people to function or be valuable.

**Examples:**
- Zoom: You send a meeting link, the recipient must use Zoom
- Slack: You invite team members, they must join Slack
- Venmo: You send money, the recipient must use Venmo
- Figma: You share a design file, collaborators must use Figma

**Characteristics:**
- Strongest form of virality
- K-factor built into core product usage
- Cannot be easily replicated by competitors
- The viral mechanism IS the product experience

**Design Principle:** If possible, architect your product so that using it
inherently exposes non-users to it. Every user interaction should involve
at least one non-user touchpoint.

### 2. Collaboration Virality

The product becomes MORE valuable with more users.

**Examples:**
- Google Docs: Real-time collaboration requires sharing
- Notion: Team workspaces grow as team joins
- Miro: Collaborative whiteboarding

**Design Principle:** Identify the collaborative use case and make inviting
others the path of least resistance.

### 3. Communication Virality

The product generates artifacts that are shared externally.

**Examples:**
- Canva: Designs are shared on social media with Canva branding
- Loom: Video recordings shared via unique Loom links
- Calendly: Scheduling links expose recipients to the product
- DocuSign: Recipients see the product through signed documents

**Design Principle:** Every output of the product should subtly brand and
link back to the product. The artifact itself is the marketing.

### 4. Incentivized Virality (Referral Programs)

Users are rewarded for inviting others.

**Examples:**
- Dropbox: Extra storage for referrals (famous case study)
- PayPal: Cash bonuses for referrals (early growth)
- Uber: Ride credits for referrals

**Design Principle:** The incentive should align with the product's value.
Dropbox giving storage (the product) was more aligned than giving cash.

### 5. Social Virality

Using the product creates social signals that attract others.

**Examples:**
- Strava: Activity feeds that friends see
- Duolingo: Streaks and leaderboards shared socially
- Spotify Wrapped: Annual listening summary shared widely

**Design Principle:** Create moments of pride, achievement, or identity that
users want to share. The share must feel authentic, not promotional.

### 6. Content Virality

User-generated content indexes in search or spreads on social.

**Examples:**
- Pinterest: Pins indexed by Google, discovered via search
- Medium: Articles indexed and shared
- Stack Overflow: Answers to questions rank in Google

**Design Principle:** Make user-generated content publicly accessible and
SEO-optimized. Each piece of content becomes an acquisition channel.

---

## Referral Program Design

### The Dropbox Referral Framework

Dropbox's referral program (designed by Sean Ellis and team) is the canonical
case study. 60% of signups came through the referral program at peak.

**What made it work:**
1. Two-sided reward (referrer AND referred both get extra storage)
2. Reward was the product itself (storage), not cash
3. Integrated into the product experience (not an afterthought)
4. Simple, clear mechanics (invite a friend, both get 500MB)
5. Progress visible (referral dashboard showing earned storage)
6. Multiple sharing channels (email, social, direct link)

### Referral Program Architecture

```
┌──────────────────────────────────────────────────┐
│                REFERRAL ENGINE                     │
│                                                    │
│  ┌─────────┐    ┌──────────┐    ┌──────────────┐ │
│  │ Trigger  │───>│ Mechanism│───>│ Reward        │ │
│  │ (when?)  │    │ (how?)   │    │ (what?)       │ │
│  └─────────┘    └──────────┘    └──────────────┘ │
│       │              │                │           │
│  After value    Unique link/     Two-sided        │
│  delivery       code/invite      or one-sided     │
│  (aha moment)   button           incentive        │
│                                                    │
│  ┌─────────┐    ┌──────────┐    ┌──────────────┐ │
│  │ Landing  │───>│ Onboard  │───>│ Measurement  │ │
│  │ (first   │    │ (fast    │    │ (track full  │ │
│  │ impression│    │ TTV)     │    │ loop)        │ │
│  └─────────┘    └──────────┘    └──────────────┘ │
└──────────────────────────────────────────────────┘
```

### Reward Structure Options

**One-Sided (Referrer Only):**
- Cash, credits, discounts, premium features
- Simpler to implement
- Lower conversion rate for referred user
- Risk: feels transactional, can attract gaming

**Two-Sided (Both Get Rewarded):**
- Both referrer and referred receive value
- Higher conversion rate (referred user has immediate incentive)
- Feels more generous and reciprocal
- Preferred approach for most products

**Tiered Rewards:**
- Increasing rewards for more referrals
- Creates gamification and status (VIP referrer tiers)
- Risk: top referrers may be gaming the system

### Reward Selection Framework

| Product Type | Best Reward | Why |
|-------------|-------------|-----|
| Subscription SaaS | Free month / credit | Aligns with product value |
| Freemium | Premium features / storage | Product-native, low COGS |
| E-commerce | Discount / store credit | Drives repeat purchase |
| Marketplace | Account credit | Applicable to both sides |
| High ACV B2B | Cash / gift card | Dollar value matches effort |

### When to Ask for Referrals

**The "Aha Moment" Rule:** Only ask for referrals AFTER the user has
experienced the core value of the product. Asking too early feels
presumptuous and reduces both referral rate and brand trust.

**Peak Moments for Referral Prompts:**
1. Immediately after a success milestone (first project completed)
2. After a positive customer support interaction
3. When the user reaches a usage threshold
4. After a feature upgrade or expansion
5. At NPS survey time (Promoters only, score 9-10)

---

## Measuring Viral Growth

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| K-factor | Invitations per user * Conversion rate | > 0.5 |
| Viral cycle time | Average time from signup to referral conversion | Minimize |
| Referral rate | Users who refer / Total users | > 10% |
| Referral conversion rate | Signups from referrals / Total invitations | > 15% |
| Referred user LTV | LTV of referred users vs. non-referred | Should be higher |
| Referral CAC | Program cost / Referred customers acquired | Should be lowest CAC |

### Cohort Analysis for Virality

Track referral behavior by cohort:
```
Cohort: Users who signed up in January
  - % who shared within 7 days: 12%
  - Average invitations sent: 3.4
  - Invitation conversion rate: 22%
  - K-factor for cohort: 3.4 * 0.22 = 0.75
  - Cycle time: Average 4.2 days
```

Compare across cohorts to identify trends and the impact of program changes.

---

## Word-of-Mouth (WOM) Strategy

### Beyond Programmatic Referrals

Not all word-of-mouth comes from formal referral programs. Organic WOM is
driven by remarkable products and experiences.

### The STEPPS Framework (Jonah Berger, Contagious, 2013)

Six drivers of word-of-mouth sharing:

**S - Social Currency:** Does sharing this make the person look good?
People share things that make them seem knowledgeable, connected, or cool.
Application: Exclusive access, insider knowledge, achievement badges.

**T - Triggers:** Is there something in the environment that reminds them?
Frequent triggers = frequent sharing. KitKat + coffee breaks (Rebecca Mark).
Application: Associate your product with common daily triggers.

**E - Emotion:** Does this evoke a strong emotional response?
High-arousal emotions (awe, excitement, anger, anxiety) drive sharing more
than low-arousal (sadness, contentment).
Application: Create marketing that evokes high-arousal positive emotions.

**P - Public:** Is usage visible to others?
Visible products get more WOM. Apple's white headphones, Lululemon logo.
Application: Make product usage publicly visible. Digital: badges, status.

**S - Practical Value:** Is this useful information to share?
People share things that help others. "Did you know..." content.
Application: Create genuinely useful tools, guides, calculators.

**S - Stories:** Is there a narrative that carries the brand message?
Stories are the Trojan horse for brand messages.
Application: Build narratives around customers, not features.

---

## Viral Loop Optimization Checklist

- [ ] Is the referral ask at the right moment (post aha-moment)?
- [ ] Is the sharing mechanism frictionless (one-click)?
- [ ] Is the invitation personalized (not generic spam)?
- [ ] Does the referred user have a compelling landing experience?
- [ ] Is the reward valuable and product-aligned?
- [ ] Is the reward two-sided?
- [ ] Is the referral dashboard visible and motivating?
- [ ] Are we tracking the full loop (invite to conversion to LTV)?
- [ ] Is the viral cycle time being actively minimized?
- [ ] Are we A/B testing referral program elements?
- [ ] Do referred users retain better than non-referred?
- [ ] Is fraud/gaming being monitored and prevented?

---

## Key References

| Work | Author | Year | Contribution |
|------|--------|------|-------------|
| Contagious | Jonah Berger | 2013 | STEPPS framework |
| Viral Loop | Penenberg | 2009 | History of viral products |
| Hooked | Nir Eyal | 2014 | Habit-forming product design |
| Hacking Growth | Sean Ellis | 2017 | Referral program design |
| The Tipping Point | Malcolm Gladwell | 2000 | Social epidemics |
| Product-Led Growth | Wes Bush | 2019 | Product viral loops |

---

**The best marketing doesn't feel like marketing. It feels like one friend
telling another about something remarkable.**
