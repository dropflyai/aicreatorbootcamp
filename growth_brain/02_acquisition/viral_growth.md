# Viral Growth -- Engineering Exponential Spread

## The Mathematics of Virality

### Viral Coefficient (K-Factor)

The viral coefficient measures how many new users each existing user generates:

```
K = i x c

Where:
  i = average number of invitations sent per user
  c = conversion rate of each invitation (invitation → new user)
```

Interpretation:
- K > 1: Each user brings more than one new user (exponential growth)
- K = 1: Each user brings exactly one (linear, self-sustaining)
- K < 1: Virality supplements but does not drive growth
- K = 0: No viral component

True K > 1 is exceptionally rare and usually temporary. Facebook at its peak
had K slightly above 1 in certain cohorts. Most "viral" products have K
between 0.2 and 0.8.

### Viral Cycle Time

The time elapsed between a user joining and their invitees joining:

```
Total Users(t) = Users(0) x K^(t/ct)

Where:
  ct = viral cycle time (in same units as t)
```

The critical insight (Andrew Chen): reducing cycle time has more impact than
increasing K-factor.

Example with 1,000 initial users, K = 0.6:
```
Cycle time = 48 hours, after 30 days:
  Users = 1000 x (1 + 0.6 + 0.36 + 0.216 + ...) ≈ 2,500
  (15 cycles in 30 days)

Cycle time = 24 hours, after 30 days:
  Users = 1000 x (1 + 0.6 + 0.36 + 0.216 + ...) ≈ 2,500
  But with 30 cycles, the sum converges faster and reaches higher
  intermediate states. At 30 cycles: ≈ 2,500 (same asymptote but
  faster approach)

Cycle time = 2 hours, after 30 days:
  360 cycles → approaches asymptote of 1/(1-K) = 2,500 almost immediately
```

For K < 1, the asymptotic total is:
```
Total = Initial Users / (1 - K)
```

For K >= 1, growth is theoretically unbounded (in practice, limited by
addressable market and saturation).

### The Viral Growth Equation

Combining K-factor and cycle time with organic and paid growth:

```
New Users(t) = Organic(t) + Paid(t) + Viral(t)

Where:
  Viral(t) = Active Users(t-ct) x Invite Rate x Invitations x Accept Rate

  Simplified: Viral(t) = Active Users(t-ct) x K
```

Even with K < 1, virality acts as a multiplier on other channels:
```
Effective New Users = (Organic + Paid) / (1 - K)

With K = 0.5: Each paid/organic user produces 2x total users
With K = 0.7: Each paid/organic user produces 3.3x total users
With K = 0.9: Each paid/organic user produces 10x total users
```

This is why even sub-viral K-factors are enormously valuable.

---

## Types of Virality

### 1. Inherent Virality (Product-Driven)

The product requires or strongly benefits from multiple users. Virality is
baked into the core use case.

Examples:
- **Slack**: Messaging requires a team; every new workspace invites a team
- **Figma**: Collaboration requires sharing; every file shared is an invitation
- **Zoom**: Video calls require participants; every meeting link is distribution
- **Venmo**: Payments require a counterparty; every transaction is exposure

Characteristics:
- Highest K-factors (0.5-1.0+)
- Shortest cycle times (minutes to hours)
- Cannot be "added" to a product; must be core to the value proposition
- Strongest form of virality

### 2. Word-of-Mouth Virality (Value-Driven)

Users recommend the product because it delivers exceptional value. No
engineered mechanism; the product earns recommendations through quality.

Examples:
- **Notion**: Users evangelize because they find it transformative
- **Tesla**: Owners become advocates because the experience is remarkable
- **Superhuman**: Exclusivity and quality drive organic advocacy

Characteristics:
- Lower K-factors (0.1-0.5)
- Longer cycle times (days to weeks)
- Requires genuinely exceptional product experience
- Authentic and sustainable but slow

### 3. Engineered Virality (Mechanism-Driven)

The product includes deliberately designed features that encourage sharing
and invitations, beyond what the core use case requires.

Examples:
- **Dropbox**: "Get 500MB free for each friend you invite"
- **Robinhood**: "Get a free stock when you refer a friend"
- **Morning Brew**: Referral tiers with escalating rewards

Characteristics:
- Moderate K-factors (0.2-0.6)
- Controllable cycle times (depends on trigger design)
- Can be added to existing products
- Requires continuous optimization and incentive management

### 4. Exposure Virality (Visibility-Driven)

Using the product inherently exposes non-users to it through visible branding,
public output, or social proof.

Examples:
- **Hotmail**: "Get your free email at Hotmail" signature
- **Calendly**: Every scheduling link shows Calendly branding
- **Typeform**: Survey respondents see Typeform branding
- **Loom**: Video viewers see Loom branding and CTA

Characteristics:
- Low K-factors per impression (0.01-0.1) but massive impression volume
- Very short cycle times (seconds)
- Requires public-facing product output
- "Powered by" model scales with usage

---

## Designing Viral Loops

### The Viral Loop Canvas

For each potential viral mechanism, map:

```
┌──────────────────────────────────────────────────────────┐
│                    VIRAL LOOP CANVAS                      │
├──────────────┬──────────────┬──────────────┬─────────────┤
│   TRIGGER    │   ACTION     │  CHANNEL     │  CONVERSION │
├──────────────┼──────────────┼──────────────┼─────────────┤
│ What prompts │ What the     │ How the      │ What makes  │
│ the user to  │ user does to │ invitation   │ the invitee │
│ share/invite │ share/invite │ reaches the  │ convert     │
│              │              │ invitee      │             │
├──────────────┼──────────────┼──────────────┼─────────────┤
│ Frequency:   │ Friction:    │ Reach:       │ Rate:       │
│ How often    │ How many     │ How many     │ What % of   │
│ does trigger │ steps to     │ people see   │ invitees    │
│ occur?       │ complete?    │ the invite?  │ convert?    │
└──────────────┴──────────────┴──────────────┴─────────────┘
```

### Optimizing Each Component

**Trigger optimization** (increase frequency):
- Identify natural sharing moments in the user journey
- Create triggers at moments of delight (celebration screens)
- Use progress milestones ("You've saved 10 hours! Share with a friend")
- Time triggers to match user energy and engagement peaks

**Action optimization** (reduce friction):
- Pre-populate invitation messages
- Offer one-click sharing options
- Integrate with contacts and social graphs
- Make the sharing action feel natural, not transactional

**Channel optimization** (increase reach):
- Email: Highest conversion but lowest virality speed
- SMS: High open rate, fast cycle time, feels personal
- Social media: Broadest reach but lowest conversion per impression
- In-product: Best for collaboration features (Figma, Slack)
- Embed/link: Good for public-facing outputs (Calendly, Loom)

**Conversion optimization** (increase accept rate):
- Show social proof ("5 of your friends use this")
- Personalize the landing experience to the invitee
- Reduce friction (no credit card, quick signup)
- Make the invitee's benefit clear (not the inviter's benefit)

---

## Viral Loop Patterns

### Pattern 1: The Collaboration Loop

```
User A needs to collaborate → Invites User B → User B joins to collaborate →
User B needs to collaborate with others → Invites User C → ...

K-factor drivers:
  - Team size (more collaborators = more invitations)
  - Collaboration frequency (more interactions = more triggers)
  - Interoperability (works across teams = wider spread)

Examples: Slack, Figma, Notion, Google Docs
```

### Pattern 2: The Content Loop

```
User creates content → Content is shared/published → Non-user discovers content →
Non-user signs up to create own content → Creates and shares → ...

K-factor drivers:
  - Content quality and shareability
  - Platform attribution (viewers know what tool was used)
  - Creation-to-publish friction (lower = faster cycle)

Examples: Canva, TikTok, Substack, GitHub
```

### Pattern 3: The Incentive Loop

```
User gets referral prompt → Shares referral link → Invitee clicks link →
Invitee signs up (both get reward) → Invitee gets referral prompt → ...

K-factor drivers:
  - Incentive attractiveness
  - Referral program visibility
  - Ease of sharing
  - Reward fulfillment speed

Examples: Dropbox, Uber, Robinhood, Morning Brew
```

### Pattern 4: The Transaction Loop

```
User needs to transact → Sends payment/request to non-user → Non-user must
sign up to complete transaction → Non-user becomes user → Sends own
transactions → ...

K-factor drivers:
  - Transaction frequency
  - Counter-party diversity (more unique recipients = wider spread)
  - Transaction urgency (higher = faster cycle time)

Examples: Venmo, PayPal, Wise, Splitwise
```

---

## Measuring and Optimizing Viral Growth

### Viral Funnel Metrics

```
Step 1: Eligible Users               (all active users)
Step 2: Users Who See Sharing Prompt  (exposure rate)
Step 3: Users Who Initiate Share      (share rate)
Step 4: Invitations Sent              (invitations per sharer)
Step 5: Invitations Viewed            (delivery rate)
Step 6: Invitations Clicked           (click-through rate)
Step 7: Invitees Who Sign Up          (signup conversion)
Step 8: Invitees Who Activate         (activation rate)

K = Step 8 / Step 1
```

Track each step to identify the biggest drop-off. Optimize the step with
the largest absolute drop (not percentage) first.

### Viral Accounting

Monthly viral accounting:
```
Total New Users = Organic + Paid + Viral
Viral Users = Total New Users x K / (1 + K)
Organic-Equivalent Users = Organic + Viral (users acquired at zero marginal cost)
Viral Amplification Ratio = Total New Users / (Organic + Paid)
```

### A/B Testing Viral Features

Special considerations for testing viral mechanics:
1. **Network contamination**: Control users may be exposed to treatment through
   invitations from treatment users. Use cluster randomization (randomize by
   social cluster, not individual).
2. **Delayed effects**: Viral cycles take time. Measure over multiple cycle times.
3. **Novelty effects**: New sharing features get initial excitement that fades.
   Measure over 4+ weeks.

---

## Common Viral Anti-Patterns

### 1. Spam Virality
Bombarding user contacts without genuine value. Destroys trust and triggers
platform penalties. The Viddy/SocialCam cautionary tale: rapid viral growth
followed by mass churn when users felt manipulated.

### 2. Dark Pattern Virality
Tricking users into sharing (confusing UI, pre-checked invite boxes).
Short-term gains, long-term brand damage and regulatory risk.

### 3. Incentive-Only Virality
When the only reason users share is the incentive, not the product value.
Produces low-quality users who churn after claiming the reward.

### 4. Forced Virality
Requiring invitations to access features. Creates resentment and attracts
users who do not want to be there.

### The Ethical Test
Before launching any viral mechanic, ask:
1. Does the invitee genuinely benefit from the invitation?
2. Would the inviter share this even without the incentive?
3. Is the sharing mechanism transparent (no hidden posting)?
4. Can users easily opt out of notifications?

If any answer is "no," redesign the mechanic.
