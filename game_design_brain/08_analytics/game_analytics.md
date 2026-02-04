# Game Analytics

## What This Enables

Game analytics transforms player behavior data into actionable design intelligence that drives retention, engagement, and monetization decisions. When game analytics is practiced at the highest level, player analytics provides a granular understanding of how every player segment interacts with every system in the game, behavioral telemetry captures the complete player journey from first session through long-term mastery, funnel analysis identifies exactly where and why players abandon critical progression paths, session metrics reveal the natural rhythms of play that inform content cadence and energy system design, retention curves distinguish between healthy natural attrition and design-driven churn, and DAU/MAU ratios measure the stickiness that determines long-term commercial viability.

---

## The Core Insight

The foundational insight of game analytics, articulated by Anders Drachen, Magy Seif El-Nasr, and Alessandro Canossa in *Game Analytics* (2013) and operationalized by every major game studio from Supercell to Riot Games, is that **the designer's intent and the player's experience are always divergent, and the magnitude of that divergence is invisible without measurement**. Designers build systems with expected behaviors; players interact with those systems in unexpected, emergent, and often completely unanticipated ways. Analytics closes the gap between designer intent and player reality.

The secondary insight is economic: in free-to-play games, the difference between a D7 retention rate of 20% and 25% translates to approximately 50-100% more lifetime revenue per acquired user. In a market where user acquisition costs $2-5 per install, small retention improvements generate outsized revenue returns.

---

## Player Analytics

### The Player Data Model

Every analytics system is built on a data model that captures:

**Identity Layer:**
- Player ID (persistent across sessions)
- Device profile (platform, OS, device model, screen size)
- Acquisition source (organic, paid, campaign, referral)
- Geographic location (country, region, timezone)
- Cohort assignment (install date, A/B test groups)

**Behavioral Layer:**
- Session data (start/end timestamps, duration, scene/level progression)
- Input events (taps, clicks, gestures, controller inputs)
- Economy transactions (currency earned, spent, source, sink)
- Progression events (level complete, quest complete, achievement unlocked)
- Social events (friend added, guild joined, message sent, gift exchanged)

**Outcome Layer:**
- Monetization events (IAP purchase, ad view, subscription)
- Retention status (D1, D7, D30 retention)
- Churn event (last session before extended absence)
- LTV (lifetime revenue at current date)

### Key Player Metrics

| Metric | Calculation | Good (Mobile F2P) | Interpretation |
|--------|------------|-------------------|---------------|
| DAU | Unique players with >= 1 session per day | Context-dependent | Daily engagement |
| MAU | Unique players with >= 1 session per month | Context-dependent | Monthly reach |
| DAU/MAU | DAU / MAU | > 20% | Stickiness (how often monthly users play daily) |
| ARPDAU | Revenue / DAU | $0.05-0.15 (casual), $0.15-0.50 (mid-core) | Monetization efficiency |
| ARPPU | Revenue / Paying users | $5-30 | Revenue per paying user |
| Conversion Rate | Paying users / Total users | 2-5% (casual), 5-15% (mid-core) | Monetization breadth |
| Session Count/Day | Avg sessions per DAU per day | 2-4 | Return frequency |
| Session Length | Avg minutes per session | 5-15 (casual), 15-40 (mid-core) | Engagement depth |
| D1 Retention | Players returning day after install / Installs | > 40% | First impression quality |
| D7 Retention | Players returning 7 days after install / Installs | > 15% | Core loop quality |
| D30 Retention | Players returning 30 days after install / Installs | > 5% | Long-term engagement |

---

## Behavioral Telemetry

### Event Taxonomy

A well-designed event taxonomy captures behavior at multiple granularity levels:

```
Level 1: Lifecycle Events (universal)
├── app_open, app_close, app_background, app_foreground
├── session_start, session_end
├── tutorial_start, tutorial_step, tutorial_complete, tutorial_skip
├── first_purchase, subscription_start, subscription_cancel
└── account_create, account_delete

Level 2: Progression Events (game-specific)
├── level_start, level_complete, level_fail
├── quest_accept, quest_complete, quest_abandon
├── zone_enter, zone_exit
├── boss_encounter, boss_defeat, boss_fail
└── milestone_reach (with milestone_name, milestone_value)

Level 3: Economy Events (universal for F2P)
├── currency_earn (source, amount, currency_type, balance_after)
├── currency_spend (sink, amount, currency_type, balance_after)
├── item_acquire (source, item_id, item_type, method)
├── item_consume (item_id, item_type, context)
├── iap_initiate, iap_complete, iap_fail (product_id, price, currency)
└── ad_requested, ad_shown, ad_clicked, ad_completed (ad_type, placement)

Level 4: Social Events (multiplayer/social)
├── friend_request, friend_accept, friend_remove
├── guild_join, guild_leave, guild_contribute
├── pvp_match_start, pvp_match_end (result, opponent_info)
├── chat_message (channel_type)
└── gift_send, gift_receive
```

### Telemetry Design Principles

1. **Event naming convention**: Use snake_case, verb_noun format (e.g., `level_complete`, `item_purchase`)
2. **Required properties**: Every event includes player_id, session_id, timestamp, platform, app_version
3. **Context enrichment**: Include contextual properties (what level, what currency balance, what item)
4. **Avoid PII**: Never log personally identifiable information in events
5. **Version events**: Include schema version so analytics pipelines can handle event evolution
6. **Sample wisely**: For high-frequency events (frame data, input events), sample rather than log everything

---

## Funnel Analysis

### The Universal Game Funnel

Every game has a meta-funnel from install to long-term engagement:

```
Install:           100%
├── Open app:       85-95%     (5-15% never open)
├── Complete FTUE:  60-80%     (tutorial drop-off)
├── Complete session 1: 50-70% (first session engagement)
├── Return D1:      35-45%     (next-day retention)
├── Return D7:      15-25%     (weekly retention)
├── Return D30:     5-12%      (monthly retention)
├── First purchase:  2-5%      (monetization conversion)
└── D90+ active:     2-8%      (long-term player)
```

### Funnel Analysis Methodology

**Step 1: Define the funnel stages** for the specific journey you are analyzing (onboarding, purchase, guild joining, etc.)

**Step 2: Measure conversion at each step**
For each pair of consecutive stages, calculate:
- Conversion rate = Users reaching stage N+1 / Users reaching stage N
- Drop-off rate = 1 - Conversion rate
- Median time between stages

**Step 3: Identify the largest drop-off**
The stage with the largest percentage drop-off is the highest-leverage optimization target.

**Step 4: Segment the drop-off**
Break down the drop-off by player segment (device, acquisition source, cohort, geography) to identify if the problem is universal or segment-specific.

**Step 5: Hypothesize and test**
Formulate a hypothesis for why players drop off at this stage, design an intervention, and A/B test it.

### Common Funnel Problem Patterns

| Pattern | Diagnosis | Intervention |
|---------|-----------|-------------|
| Massive tutorial drop-off (>50%) | Tutorial is too long, too complex, or not teaching through play | Shorten, use contextual learning, allow skipping |
| D1 drop-off > 60% | First session does not deliver a compelling experience | Frontload the fun, improve first session pacing |
| Purchase funnel abandonment at price screen | Price/value mismatch, friction in purchase flow | Test pricing, simplify IAP flow, offer starter pack |
| Social feature adoption < 10% | Social features are not integrated into core loop | Make social features provide gameplay benefit |

---

## Session Metrics

### Session Architecture

Understanding session patterns informs design decisions about energy systems, daily rewards, content pacing, and notification strategy.

| Metric | Calculation | Design Implication |
|--------|------------|-------------------|
| Sessions per day | Total sessions / DAU | Informs daily quest count and energy refill rate |
| Session length | Median time between session_start and session_end | Informs content chunk size and save points |
| Inter-session interval | Median time between consecutive sessions | Informs notification timing and energy regeneration |
| Session depth | Content consumed per session (levels, matches, etc.) | Informs daily content budget |
| First vs. returning session length | Compare first session to nth session length | Reveals if engagement deepens or plateaus |

### The Ideal Session Curve

For a healthy casual/mid-core game, the ideal session pattern follows a "quick sessions, multiple returns" model:

```
Session 1 (morning):  5-10 minutes  →  complete dailies, use energy
   ↓ 4-6 hours
Session 2 (lunch):    3-5 minutes   →  collect rewards, quick match
   ↓ 4-6 hours
Session 3 (evening):  10-20 minutes →  main play session, social, shop
   ↓ 8-10 hours (overnight)
Session 1 (next day): cycle repeats
```

---

## Retention Curves

### Reading Retention Curves

The retention curve is the most important chart in game analytics. It plots the percentage of players from a cohort who are still active at each time interval after install.

**Healthy retention curve shape:**
```
100% │*
     │ \
     │  \
     │   \
     │    \____________________________________  (flattens = loyal base)
     │
   0 │________________________________________
     D1   D3   D7   D14   D30   D60   D90
```

**Key curve features:**
- **Cliff (D0-D1)**: The sharpest drop, driven by FTUE quality. Target: retain > 40%
- **Slope (D1-D7)**: Core loop quality. Healthy slope flattens by D7
- **Plateau (D7-D30)**: Where the curve flattens indicates the "loyal base" forming
- **Long tail (D30+)**: Should be nearly flat. If still declining, metagame is insufficient

### Retention Benchmarks by Genre

| Genre | D1 | D7 | D30 | D90 |
|-------|----|----|-----|-----|
| Casual Puzzle | 40-50% | 15-20% | 6-10% | 3-5% |
| Mid-Core RPG | 35-45% | 12-18% | 5-8% | 2-4% |
| Strategy | 30-40% | 10-15% | 4-7% | 2-4% |
| Battle Royale | 25-35% | 8-12% | 3-5% | 1-3% |
| Social Casino | 35-45% | 15-22% | 8-12% | 5-8% |
| Hyper-Casual | 30-40% | 5-10% | 1-3% | <1% |

### Retention Improvement Levers

| Retention Window | Primary Lever | Secondary Lever |
|-----------------|---------------|-----------------|
| D0-D1 | FTUE quality, first session design | Performance, load times |
| D1-D3 | Core loop satisfaction | Daily reward/bonus system |
| D3-D7 | Secondary loops, social features | Push notification strategy |
| D7-D14 | Metagame depth, progression | Guilds/clans, events |
| D14-D30 | Live ops events, content freshness | PvP, competitive features |
| D30+ | Endgame content, social investment | Seasonal content, competitive ladders |

---

## DAU/MAU Analysis

### Stickiness Ratio

DAU/MAU ratio measures how often monthly active users engage on a daily basis. A DAU/MAU of 20% means the average monthly player plays approximately 6 days per month.

```
DAU/MAU = DAU / MAU

Approximate days played per month = DAU/MAU x 30
```

| DAU/MAU | Days/Month | Category |
|---------|------------|----------|
| > 50% | 15+ | Highly sticky (daily habit game) |
| 30-50% | 9-15 | Sticky (strong engagement loop) |
| 20-30% | 6-9 | Moderate (typical for most games) |
| 10-20% | 3-6 | Light (casual engagement) |
| < 10% | < 3 | Weak (retention problem) |

### DAU Composition Analysis

Understanding what drives DAU requires decomposing it:

```
DAU = New Users + Returning Users + Resurrected Users

Where:
  New Users: First session today
  Returning Users: Active yesterday (or recently) and today
  Resurrected Users: Inactive for 7+ days but returned today
```

A healthy DAU has a growing proportion of returning users and a shrinking dependence on new user acquisition.

---

## Failure Modes

1. **Metric Overload**: Tracking 500 events and 200 metrics with no clear prioritization, making it impossible to identify what matters
2. **Vanity Metrics**: Reporting total downloads or total registered users rather than active, engaged users
3. **Average Blindness**: Reporting average session length of 12 minutes when the median is 4 minutes and a few extreme sessions skew the mean
4. **Cohort Neglect**: Reporting aggregate retention without cohort breakdown, masking improvements or degradation
5. **Causation Confusion**: Observing that players who join guilds retain better and concluding that guilds cause retention (correlation is not causation -- dedicated players both join guilds AND retain)
6. **Analytics Without Action**: Building dashboards that nobody uses to make design decisions

---

## The Operator's Framework

When evaluating game analytics maturity, assess:

1. **Event coverage**: Are all lifecycle, progression, economy, and social events instrumented?
2. **Data freshness**: How quickly are events available for analysis? (Target: < 1 hour for operational, < 24 hours for strategic)
3. **Funnel visibility**: Can you trace the complete player journey from install through every major milestone?
4. **Retention granularity**: Are retention curves available by cohort, acquisition source, platform, and geography?
5. **Session understanding**: Do you know the natural session cadence and use it to inform design (energy, rewards, content pacing)?
6. **Metric-to-action**: Can you name a specific design change made in the last 30 days based on analytics data?
7. **A/B test infrastructure**: Can you run concurrent experiments and measure their impact on retention and monetization?

---

## Summary

Game analytics is the empirical foundation of data-informed game design. Player analytics captures behavior across identity, behavioral, and outcome layers. Behavioral telemetry provides the raw event stream from which all metrics are derived, requiring careful taxonomy design and implementation discipline. Funnel analysis identifies where players abandon critical journeys, providing the highest-leverage optimization targets. Session metrics reveal the natural rhythms of play that inform energy systems, content pacing, and notification strategy. Retention curves are the single most important chart in game analytics, distinguishing between healthy natural attrition and design-driven player loss. DAU/MAU ratios measure the stickiness that determines long-term commercial viability. The measure of analytics maturity is not the volume of data collected but the velocity at which data produces design improvements that measurably improve player experience.
