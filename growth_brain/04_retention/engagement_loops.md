# Engagement Loops — Core Loops, Hooks, Notification Strategy, Re-Engagement, Win-Back, Dormant Resurrection

## Overview

Engagement loops are the self-reinforcing cycles that drive repeated
product usage. Unlike linear funnels (which end at conversion),
engagement loops are circular—each cycle of use creates the conditions
for the next cycle. Products with strong engagement loops grow
organically because engaged users create value that attracts and retains
more users. This module covers the design and optimization of core
engagement loops, notification strategy, and the specific tactics for
re-engaging users at different stages of dormancy.

---

## Section 1: Core Engagement Loops

### Anatomy of an Engagement Loop

Every engagement loop has four components:

```
TRIGGER → ACTION → VALUE DELIVERY → RE-ENGAGEMENT TRIGGER
   ↑                                         │
   └─────────────────────────────────────────┘
```

**Trigger:** What causes the user to open the product
**Action:** What the user does inside the product
**Value Delivery:** The reward or outcome the user receives
**Re-Engagement Trigger:** What the product generates that brings the
user back for the next cycle

### Core Loop Types

**Content Consumption Loop**
Trigger: Notification of new content (email, push, social)
Action: User reads/watches/listens to content
Value: Knowledge, entertainment, or social connection
Re-engagement: Content recommendation engine surfaces more content;
user bookmarks, saves, or shares, creating future triggers

Example: Netflix → Notification of new show → Watch → Enjoy →
Algorithm learns preference → Better recommendation → Watch more

**Creation Loop**
Trigger: Internal motivation (expression) or external (request)
Action: User creates content (post, document, design, code)
Value: Expression, productivity, social validation
Re-engagement: Feedback (likes, comments, edits) triggers return

Example: Instagram → Idea for post → Create and publish → Likes
and comments arrive → Check notifications → See others' posts →
Inspiration for next post

**Social Loop**
Trigger: Social notification (message, mention, connection request)
Action: User responds, interacts, or reciprocates
Value: Social connection, belonging, status
Re-engagement: Social interactions generate notifications for others,
who then trigger the original user's next cycle

Example: Slack → Message notification → Read and reply → Colleague
responds → New notification → Continue conversation

**Transaction Loop**
Trigger: Need (replenishment, new requirement, recommendation)
Action: User browses, compares, purchases
Value: Product/service received, problem solved
Re-engagement: Usage of purchased item creates data for
recommendations; loyalty points accumulate toward rewards

Example: Amazon → Need product → Search and purchase → Receive →
Personalized recommendations based on purchase → New need → Purchase

**Progress Loop**
Trigger: Goal reminder, streak notification, milestone proximity
Action: User takes next step toward goal
Value: Progress, mastery, achievement
Re-engagement: Progress visualization creates motivation for next
session; streak mechanics create urgency

Example: Duolingo → Streak reminder → Complete lesson → XP earned,
streak continued → Notification tomorrow → Complete next lesson

### Designing Core Loops

**Step 1: Identify the Core Value Exchange**
What is the one thing users come to your product to do? This is the
action at the center of your core loop. Every feature should either
be the core loop or support the core loop.

**Step 2: Minimize Time to Value**
The faster a user completes one full loop cycle, the faster habit
formation begins. Measure time-to-first-value-delivery and optimize
relentlessly. For reference:
- Twitter: First value (reading a tweet) in seconds
- Slack: First value (receiving a message) in minutes
- Salesforce: First value (closing a deal) in weeks

**Step 3: Build in Variable Rewards**
Static rewards habituate. Variable rewards sustain engagement.
Introduce variability in:
- Content: Different content each session (algorithmic feeds)
- Social: Unpredictable responses from other users
- Achievement: Randomized rewards, surprise milestones

**Step 4: Create Natural Re-Engagement Triggers**
The best re-engagement triggers are created by the user's own actions
or by other users in the ecosystem:
- Content published → Generates comments → Notifications to creator
- Task created → Approaches deadline → Reminder to user
- Connection made → Other person posts → Content in feed

---

## Section 2: Notification Strategy

### Notification Channel Hierarchy

Each notification channel has different reach, urgency, and tolerance:

| Channel | Reach | Urgency | User Tolerance | Best For |
|---------|-------|---------|---------------|----------|
| Push notification | High (opt-in) | High | Low (3-5 bad sends = disable) | Time-sensitive, personal |
| Email | High (opt-in) | Medium | Medium (unsubscribe threshold) | Content, digests, re-engage |
| In-app notification | Low (must be active) | Medium | High (expected) | Feature, social, system |
| SMS | Very high | Very high | Very low (2-3 bad sends) | Critical transactional only |
| Badge/counter | Medium | Low | High | Accumulating social/content |

### Notification Design Principles

**1. Earn the Interruption**
Every notification must pass the "worth the interruption" test. If the
notification does not deliver genuine value to the recipient at that
moment, it should not be sent. Notification abuse is the fastest way
to lose push permission or email subscribers.

**2. Personalization Over Broadcast**
Personalized notifications (based on user behavior, preferences, and
context) outperform broadcast notifications by 4–10x in open rates
and engagement.

Personalization levels:
- Level 0: Same message to all users (broadcast)
- Level 1: Segment-based (user type, geography, plan)
- Level 2: Behavior-based (triggered by actions or inactions)
- Level 3: ML-personalized (send time, channel, content all optimized)

**3. Frequency Optimization**
- Too few: Users forget about the product, retention suffers
- Too many: Users disable notifications, unsubscribe, or churn
- Optimal: The minimum frequency that maintains engagement without
  triggering fatigue

**Frequency Capping Rules:**
- Push: Maximum 1 per day (unless transactional/social)
- Email: Maximum 3 per week (unless opted into daily digest)
- SMS: Maximum 2 per month (transactional only)
- In-app: No hard cap (contextual, shown when relevant)

**4. Timing Optimization**
Send notifications when the user is most likely to engage:
- Use historical engagement data to determine optimal send times per user
- Respect timezone (never send at 3 AM local time)
- Leverage contextual timing (Monday morning for work tools, evening
  for entertainment)
- Machine learning send-time optimization can improve engagement 15–30%

### Notification Types and Templates

**Social Notifications (Highest Engagement)**
- "[Name] commented on your post"
- "[Name] sent you a message"
- "[Name] mentioned you in [context]"
- "3 people liked your [content]"

**Value Notifications (Medium Engagement)**
- "Your weekly report is ready"
- "New [content type] based on your interests"
- "You've reached [milestone]!"
- "[Action] completed successfully"

**Reminder Notifications (Context-Dependent)**
- "Your trial ends in 3 days"
- "You have 2 unfinished tasks"
- "Your streak is about to break!"
- "[Event] starts in 1 hour"

**Promotional Notifications (Use Sparingly)**
- "New feature: [feature name] is here"
- "Limited time: [offer details]"
- Only send to engaged users, never to dormant

---

## Section 3: Re-Engagement Strategy

### User State Classification

Users exist on a spectrum from highly engaged to permanently churned.
Each state requires a different approach:

```
ACTIVE → AT-RISK → DORMANT → LAPSED → CHURNED
```

**Active:** Used the product within the expected frequency (daily product:
last 3 days; weekly: last 10 days; monthly: last 35 days)

**At-Risk:** Usage has declined significantly from their historical
pattern (50%+ drop in core action frequency over 14 days)

**Dormant:** No product usage for 1–3x the expected usage interval
(daily product: 7–21 days of inactivity; weekly: 3–9 weeks)

**Lapsed:** No usage for 3x+ the expected interval (daily product:
21+ days; weekly: 9+ weeks)

**Churned:** Account cancelled, deleted, or no activity for 6+ months

### Re-Engagement for At-Risk Users

**Goal:** Prevent transition to dormant state
**Timing:** Within 48 hours of risk signal detection
**Approach:** Gentle, value-focused, not desperate

**Tactics:**
- Feature highlight emails (show value they are not capturing)
- Personalized in-app messages (address specific usage patterns)
- Product update announcements (new features relevant to their use case)
- Social proof (show what similar users are achieving)

### Re-Engagement for Dormant Users

**Goal:** Reactivate before the user forgets the product entirely
**Timing:** Escalating sequence over 2–6 weeks
**Approach:** Value reminder with easy re-entry path

**Dormant Re-Engagement Sequence:**
```
Week 1: "Here's what you've been missing"
  - Content: Product updates, new features since last login
  - CTA: One-click return to their dashboard

Week 2: "Your [data/content] is waiting"
  - Content: Remind of stored value (data, content, connections)
  - CTA: Access their specific assets

Week 3: "Users like you are achieving [outcome]"
  - Content: Social proof, case studies, benchmarks
  - CTA: See how they compare

Week 4: "We'd love your feedback"
  - Content: Survey asking why they stopped using the product
  - CTA: 2-minute feedback form (data for product improvement)

Week 6: Final email — "Is this goodbye?"
  - Content: Honest, no-pressure farewell with easy return path
  - CTA: "Come back anytime" + unsubscribe from re-engagement
```

### Win-Back for Lapsed Users

**Goal:** Resurrect users who have not engaged for extended periods
**Timing:** Single campaign, not ongoing drip
**Approach:** Offer-driven or transformation-driven

**Win-Back Campaign Types:**

**The "New Product" Win-Back**
If the product has changed significantly since the user left, position
re-engagement as trying a new product. "We've rebuilt [feature]. Come
see what's changed."

**The Incentive Win-Back**
Offer a financial incentive to return: free month, extended trial of
premium features, or discounted annual plan. Track whether incentive
users retain at acceptable rates.

**The Data Leverage Win-Back**
If the user has stored data or content, remind them of its value:
"Your [X] reports are still here. Your team's [Y] data from [date]
is waiting."

**The Social Win-Back**
If other users in the lapsed user's network are active, leverage
social connections: "[Colleague name] just shared [content]. See
what your team has been working on."

### Dormant Resurrection

**The Resurrection Metric**
Track the percentage of dormant users reactivated per month:
```
Resurrection Rate = Users Reactivated in Period
                    / Total Dormant Users at Start of Period
```

Benchmark: 2–5% monthly resurrection rate is good for most products.

**Resurrection Triggers**
- Product-Market Fit improvements (major feature that addresses
  original churn reason)
- Platform changes (new integrations, mobile app launch)
- Pricing changes (free tier introduction, price reduction)
- Life changes (new job, new project, seasonal need)

**Resurrection Optimization**
- Segment dormant users by original churn reason (if known)
- Test different re-engagement messages by segment
- Track resurrection-to-retention rate (do resurrected users stay?)
- If resurrected users churn again at high rates, the product issue
  is unsolved—focus on product improvement, not re-engagement

---

## Section 4: Engagement Loop Measurement

### Core Loop Metrics

| Metric | Definition | What It Reveals |
|--------|-----------|----------------|
| Loop completion rate | % of users who complete a full cycle | Loop health |
| Loop frequency | Average cycles per user per week | Engagement depth |
| Time per cycle | Average time for one full loop | Efficiency |
| Drop-off points | Where in the loop users exit | Friction points |
| Loop entry rate | % of users who start a new cycle after completing one | Stickiness |

### Notification Effectiveness Metrics

| Metric | Target | Meaning |
|--------|--------|---------|
| Opt-in rate (push) | > 50% | Value proposition is clear |
| Open rate (email) | > 25% | Subject lines and relevance are strong |
| Click-through rate | > 5% | Content and CTA are compelling |
| Disable rate (push) | < 3% per month | Frequency and relevance are appropriate |
| Unsubscribe rate (email) | < 0.5% per send | Content matches expectations |

---

## Key References

- Nir Eyal, *Hooked* (Portfolio/Penguin)
- Andrew Chen: Engagement loops and notification strategy
- Brian Balfour: Growth loops framework (Reforge)
- Chamath Palihapitiya: Facebook growth team engagement methodology
- Lenny Rachitsky: Engagement and retention frameworks
- OneSignal/Braze: Push notification benchmarks

---

## Summary

Engagement loops are the self-perpetuating cycles that drive habitual
product usage. Core loops—content consumption, creation, social,
transaction, and progress—must be designed with clear triggers,
minimal-friction actions, variable rewards, and natural re-engagement
mechanisms. Notification strategy must earn each interruption through
personalization, timing optimization, and strict frequency discipline.
Re-engagement tactics must be calibrated to the user's state: gentle
nudges for at-risk users, value reminders for dormant users, offer-
driven campaigns for lapsed users, and product-improvement-triggered
resurrection for the fully churned. The Growth Brain measures
engagement loop completion rates and notification effectiveness as
the leading indicators of retention health.
