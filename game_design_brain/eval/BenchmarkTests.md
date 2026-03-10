# Game Design Brain -- Benchmark Tests

This document contains benchmark scenarios used to evaluate the Game Design Brain's
competence across core game design disciplines. Each scenario tests specific skills
and has defined evaluation criteria.

The brain must demonstrate domain expertise, structured thinking, and actionable
design recommendations to pass each benchmark.

---

## HOW TO USE BENCHMARK TESTS

1. Present the scenario to the Game Design Brain exactly as written
2. Evaluate the response against the listed criteria
3. Score each criterion as MET or NOT MET
4. A benchmark passes only if ALL criteria are MET
5. Document the response quality and any gaps
6. The brain must pass at least 80% of benchmarks to be considered production-ready

---

## BENCHMARK 1: Core Loop Design (Mobile Puzzle)

**Scenario:**
"Design the core loop for a mobile puzzle game targeting casual players aged 25-45.
The game should have 2-3 minute sessions. Show your MDA (Mechanics, Dynamics, Aesthetics)
analysis for the loop."

### Evaluation Criteria

- [ ] Core verb is clearly defined and appropriate for casual mobile
- [ ] Session length fits within 2-3 minute constraint
- [ ] MDA analysis is complete: Mechanics listed, Dynamics predicted, Aesthetics defined
- [ ] Feedback loops are explicitly designed (action -> feedback -> reward -> next action)
- [ ] Variable reward structure is included
- [ ] Skill ceiling exists even for a casual game
- [ ] Comparison to at least 2 existing successful games in the genre
- [ ] Monetization hooks are considered but not at the expense of core fun

---

## BENCHMARK 2: Economy Rebalancing (Inflation Crisis)

**Scenario:**
"A mid-core mobile strategy game has been live for 6 months. Late-game players have
accumulated 10x the currency they need for any purchase. New content is instantly bought
and trivialized. Early-game economy still feels balanced. Rebalance the economy without
angering existing players who earned their currency fairly."

### Evaluation Criteria

- [ ] Correctly diagnoses the problem as a source/sink imbalance in late game
- [ ] Proposes new sinks rather than removing earned currency (respects player investment)
- [ ] Introduces at least 3 specific sink mechanisms appropriate to strategy genre
- [ ] Considers player psychology and fairness perception
- [ ] Does NOT propose retroactive currency removal or devaluation
- [ ] Addresses communication strategy for the change
- [ ] Includes a timeline/rollout plan (not all changes at once)
- [ ] Models expected impact on economy metrics
- [ ] Considers both whale and free-to-play player impact

---

## BENCHMARK 3: Retention Cliff Diagnosis (D1-D7 Drop)

**Scenario:**
"Our mobile RPG has D1 retention of 50% (above genre benchmark) but D7 retention
drops to 5% (far below the 25% benchmark). Players love the first session but
almost none come back after day 2. Diagnose the day 2-7 experience and propose fixes."

### Evaluation Criteria

- [ ] Identifies the D2-D7 window as the critical investigation period
- [ ] Proposes at least 5 specific diagnostic steps (data analysis, user interviews, funnel review)
- [ ] Lists at least 5 plausible root causes for the cliff
- [ ] Distinguishes between content problems, progression problems, and engagement problems
- [ ] Proposes specific fixes for at least 3 root causes
- [ ] Includes quick wins (implementable in <1 week) and strategic fixes (1-4 weeks)
- [ ] References genre-appropriate retention benchmarks
- [ ] Considers whether the high D1 might be misleading (tutorial effect)
- [ ] Proposes measurement plan to track improvement

---

## BENCHMARK 4: Onboarding Redesign (FTUE Failure)

**Scenario:**
"A complex 4X strategy game has a 20% FTUE completion rate. Players drop off during
the city-building tutorial. The tutorial takes 25 minutes and covers all major systems.
The development team insists all systems must be taught. Redesign the onboarding."

### Evaluation Criteria

- [ ] Challenges the assumption that all systems must be taught upfront
- [ ] Proposes progressive disclosure schedule spreading learning across multiple sessions
- [ ] Reduces initial FTUE to under 10 minutes
- [ ] Teaches through gameplay, not text instructions
- [ ] Identifies which systems are essential for first session vs later sessions
- [ ] Includes a "learn by doing" approach with guided first actions
- [ ] Proposes contextual help system for post-FTUE learning
- [ ] Sets measurable FTUE completion targets (e.g., >60%)
- [ ] Addresses the complexity without dumbing down the game

---

## BENCHMARK 5: Monetization Ethics Review

**Scenario:**
"A free-to-play mobile game for ages 13+ includes the following monetization:
1) Loot boxes with cosmetics and power items, odds undisclosed
2) Energy system that refills every 4 hours or via premium currency
3) Battle pass with 100 tiers requiring 3 hours daily to complete free track
4) 'Limited time' offers that appear every 48 hours with identical items
5) Premium currency sold in bundles where the smallest is $0.99 and the best value is $99.99.
Review this monetization for ethical issues and propose fixes."

### Evaluation Criteria

- [ ] Identifies loot box odds disclosure as a legal and ethical requirement
- [ ] Flags power items in loot boxes as pay-to-win
- [ ] Identifies 3hr/day battle pass requirement as exploitative for the age group
- [ ] Calls out recurring "limited time" offers as a dark pattern
- [ ] Identifies the $99.99 bundle as potential whale exploitation without spending limits
- [ ] Proposes specific fixes for each issue, not just identification
- [ ] References relevant regulations (COPPA considerations for 13+ audience)
- [ ] Maintains revenue viability while improving ethics
- [ ] Suggests whale protection mechanisms (spending caps, cooling-off prompts)

---

## BENCHMARK 6: Difficulty Curve Design

**Scenario:**
"Design the difficulty curve for a 100-level mobile puzzle game. Players should feel
challenged but not frustrated. The game should naturally guide players toward optional
hints (free, limited) and hint packs (paid). Include specific level design rules for
levels 1-10, 11-30, 31-60, 61-90, and 91-100."

### Evaluation Criteria

- [ ] Defines clear win rate targets for each level bracket
- [ ] Level 1-10 rules prioritize teaching and building confidence (>90% win rate)
- [ ] Difficulty increases gradually, not linearly
- [ ] "Breather" levels are included after difficulty spikes
- [ ] Hint integration feels natural, not forced
- [ ] Paid hint conversion is designed ethically (not artificial frustration)
- [ ] Level pacing accounts for session breaks (mobile context)
- [ ] Boss/milestone levels are designed as memorable challenges
- [ ] The curve accounts for skill variance in the player base
- [ ] Specific fail rate targets given per bracket

---

## BENCHMARK 7: Social Systems Design (Guild System)

**Scenario:**
"Design a guild system for a midcore mobile RPG. The guild should drive retention
without creating toxicity. Include guild progression, activities, rewards, and
governance. Address the problem of dead guilds and inactive leaders."

### Evaluation Criteria

- [ ] Guild progression system with meaningful milestones
- [ ] At least 3 guild-specific activities that require cooperation
- [ ] Reward structure that benefits active members without punishing solo players
- [ ] Governance model with role hierarchy and power transfer
- [ ] Dead guild and inactive leader solutions (auto-transfer, merge suggestions)
- [ ] Toxicity mitigation (chat moderation, kick/ban tools, reporting)
- [ ] Guild size recommendations with justification
- [ ] Matchmaking considerations for guild vs guild activities
- [ ] Onboarding path for new guild members
- [ ] Addresses the "obligation trap" where guild duties feel like a job

---

## BENCHMARK 8: Live Events Framework

**Scenario:**
"Design a live events framework for a casual match-3 game. The game needs weekly
events that feel fresh but are buildable from reusable components. The events team
has 2 designers and 1 artist. Design the framework, not individual events."

### Evaluation Criteria

- [ ] Defines reusable event templates/archetypes (3+ types minimum)
- [ ] Each archetype modifies gameplay in a meaningfully different way
- [ ] Framework is production-feasible with the stated team size
- [ ] Content calendar structure for weekly events
- [ ] Seasonal theming approach (holidays, seasons)
- [ ] Reward structure that drives engagement without inflating the economy
- [ ] Event difficulty tuning guidelines
- [ ] Measurement framework (which events succeed and why)
- [ ] Player communication plan (how events are announced and promoted)
- [ ] Framework allows for special "tentpole" events without extra staffing

---

## BENCHMARK 9: Multiplayer Balance (Asymmetric Characters)

**Scenario:**
"A competitive 1v1 mobile game has 12 characters. Three characters have 65%+ win
rates and two have below 35%. The community is angry. Player count is dropping.
You cannot remove characters. Propose a balance patch methodology and communication plan."

### Evaluation Criteria

- [ ] Proposes data-driven balance methodology (win rate, pick rate, ban rate analysis)
- [ ] Distinguishes between balance at different skill levels (novice vs expert)
- [ ] Uses small iterative adjustments rather than dramatic nerfs
- [ ] Buff weak characters rather than only nerfing strong ones
- [ ] Communication plan acknowledges the problem and shares the methodology
- [ ] Includes a balance patch cadence going forward
- [ ] Considers the impact on players who "main" the strong characters
- [ ] Proposes a public test environment or feedback loop
- [ ] Includes metrics for measuring balance improvement post-patch
- [ ] Addresses the immediate player exodus with a goodwill gesture

---

## BENCHMARK 10: Narrative Integration (Story + Gameplay)

**Scenario:**
"A mobile story-driven game has a problem: 60% of players skip all cutscenes and
dialogue. The story is critical to understanding gameplay objectives. Players
frequently complain they 'don't know what to do.' Fix the narrative delivery
without removing the story content that invested players enjoy."

### Evaluation Criteria

- [ ] Proposes environmental storytelling that communicates through gameplay
- [ ] Separates essential information from optional narrative depth
- [ ] Creates a two-track system: quick players get objectives, story players get depth
- [ ] Reduces cutscene length and frequency
- [ ] Makes skippable content truly skippable (no hidden objective information)
- [ ] Uses UI and visual cues to communicate objectives independent of story
- [ ] Proposes a recap system for players who skip content
- [ ] Tests solution with both story-engaged and story-skipping players
- [ ] Does not punish players for skipping narrative content

---

## BENCHMARK 11: Platform Adaptation (Mobile to PC)

**Scenario:**
"A successful mobile match-3 game is being ported to PC (Steam). The mobile version
has 2-minute sessions, touch controls, energy system, and portrait orientation.
Adapt the design for PC players who expect longer sessions, mouse/keyboard input,
no energy systems, and landscape orientation. Do not just upscale the mobile version."

### Evaluation Criteria

- [ ] Redesigns session structure for longer PC sessions (10-30 minutes)
- [ ] Adapts controls for mouse/keyboard with hotkeys
- [ ] Proposes alternative to energy system (PC players expect unlimited play)
- [ ] Landscape layout redesign, not just a stretched portrait
- [ ] Addresses PC monetization expectations (different from mobile norms)
- [ ] Adds PC-specific features (windowed mode, resolution options, save system)
- [ ] Considers Steam community expectations (achievements, workshop, trading cards)
- [ ] Proposes content additions that justify a PC purchase
- [ ] Addresses the "mobile port" stigma on Steam
- [ ] Cross-progression with mobile version considered

---

## BENCHMARK 12: Gacha System Ethics

**Scenario:**
"The team wants to add a gacha/character collection system to our RPG. Design a gacha
system that is monetizable but ethical. Include pity systems, duplicate protection,
and whale safeguards. The game is rated E10+ (Everyone 10 and up)."

### Evaluation Criteria

- [ ] Pity system with guaranteed drop at a specific pull count
- [ ] Duplicate protection or meaningful duplicate conversion
- [ ] Published drop rates for all rarity tiers
- [ ] Spending cap recommendations for an E10+ audience
- [ ] All gacha characters obtainable through gameplay (slower)
- [ ] No power-gating behind gacha (cosmetic or convenience, not power)
- [ ] Parental controls and spending limits for minors
- [ ] Communication transparency about the system
- [ ] Comparison to industry standards with ethical improvements
- [ ] Revenue projection showing the system is viable with ethical constraints

---

## BENCHMARK 13: Idle/Offline Progression

**Scenario:**
"Design an idle/offline progression system for a mobile city builder. Players should
feel rewarded when they return but not feel punished for being away too long. The
system should encourage 3-4 check-ins per day at 5-10 minutes each."

### Evaluation Criteria

- [ ] Offline progression that accumulates resources at a meaningful rate
- [ ] Diminishing returns after a threshold to encourage return visits
- [ ] "Welcome back" moment that feels rewarding, not overwhelming
- [ ] Meaningful choices upon return (not just "collect all")
- [ ] Notification strategy that drives 3-4 daily sessions without being annoying
- [ ] Offline time cap to prevent massive resource dumps after long absences
- [ ] Interaction between offline and online play is clear
- [ ] System does not create anxiety about "missing" optimal collection times
- [ ] Premium acceleration option that is convenient, not mandatory

---

## BENCHMARK 14: Anti-Cheat Design

**Scenario:**
"Our competitive mobile game has a cheating problem. Players are using modified APKs
for unlimited currency and speed hacks. The leaderboard is compromised. The team
has limited server-side infrastructure. Design an anti-cheat strategy appropriate
for a small studio."

### Evaluation Criteria

- [ ] Prioritizes server-side validation for critical game state
- [ ] Identifies which systems must be server-authoritative vs client-trusted
- [ ] Proposes statistical anomaly detection for suspicious play patterns
- [ ] Includes reporting system for player-driven detection
- [ ] Defines penalty tiers (warning, temp ban, permanent ban)
- [ ] Communication strategy that deters cheating without revealing detection methods
- [ ] Leaderboard remediation plan (removing cheated scores)
- [ ] Cost-appropriate solutions for a small studio
- [ ] Addresses root cause (why players cheat) not just symptoms
- [ ] Separates competitive integrity from casual play enforcement

---

## BENCHMARK 15: Accessibility Retrofit

**Scenario:**
"A launched game has received criticism for poor accessibility. Reviews mention:
no colorblind mode, tiny text, no subtitles, no control remapping, and difficulty
that cannot be adjusted. Budget allows for a single accessibility update. Prioritize
and design the update."

### Evaluation Criteria

- [ ] Prioritization framework based on player impact and implementation cost
- [ ] Top 3 priorities clearly justified with reasoning
- [ ] Colorblind mode design with specific palette modifications
- [ ] Text scaling system with minimum and maximum sizes
- [ ] Subtitle implementation with speaker identification
- [ ] Control remapping architecture
- [ ] Difficulty modifier system (not just "easy/medium/hard")
- [ ] Implementation is phased if budget constrains doing everything at once
- [ ] Testing plan with accessibility-focused playtesters
- [ ] Communication plan that shows genuine commitment, not performative compliance

---

## BENCHMARK 16: Tutorial-Free Onboarding

**Scenario:**
"Design the first 5 minutes of a platformer game that teaches wall-jumping, double-jumping,
and dash mechanics WITHOUT any text instructions, button prompts, or tutorial pop-ups.
The player should learn purely through level design and environmental cues."

### Evaluation Criteria

- [ ] Level design naturally guides the player to discover each mechanic
- [ ] Mechanics are introduced one at a time in a safe environment
- [ ] Failure is low-cost and educational (short respawn, visible cause of death)
- [ ] Environmental cues (visual affordances) communicate interactable surfaces
- [ ] Difficulty ramps within the tutorial space before the "real" game begins
- [ ] Players who already know the mechanics can move through quickly
- [ ] Each mechanic has a "moment of mastery" before the next is introduced
- [ ] The teaching sequence builds on itself (wall jump + double jump = new reach)
- [ ] No invisible walls or artificial barriers -- teaching through design

---

## BENCHMARK 17: Season Pass Design

**Scenario:**
"Design a 90-day season pass for a live-service shooter game. Include free and premium
tracks, daily and weekly challenges, a prestige system, and a catch-up mechanic for
players who start mid-season. The pass should be completable by playing 45 minutes
per day."

### Evaluation Criteria

- [ ] Free track provides meaningful rewards that drive engagement
- [ ] Premium track provides clear additional value worth the price
- [ ] Challenge design encourages varied gameplay, not grinding
- [ ] 45 min/day is achievable without FOMO-inducing pressure
- [ ] Catch-up mechanic allows late starters to complete the pass
- [ ] Prestige tiers extend engagement for hardcore players
- [ ] XP curve is front-loaded to hook players early
- [ ] Rewards are visually previewable to drive anticipation
- [ ] No "dead zones" in the pass where multiple tiers feel unrewarding
- [ ] End-of-season runway allows buffer for completionists

---

## SCORING SUMMARY

```markdown
## Benchmark Results: Game Design Brain

**Date:** [Date]
**Evaluator:** [Name]

| # | Benchmark | Result | Notes |
|---|-----------|--------|-------|
| 1 | Core Loop Design | PASS/FAIL | |
| 2 | Economy Rebalancing | PASS/FAIL | |
| 3 | Retention Cliff | PASS/FAIL | |
| 4 | Onboarding Redesign | PASS/FAIL | |
| 5 | Monetization Ethics | PASS/FAIL | |
| 6 | Difficulty Curve | PASS/FAIL | |
| 7 | Social Systems | PASS/FAIL | |
| 8 | Live Events | PASS/FAIL | |
| 9 | Multiplayer Balance | PASS/FAIL | |
| 10 | Narrative Integration | PASS/FAIL | |
| 11 | Platform Adaptation | PASS/FAIL | |
| 12 | Gacha Ethics | PASS/FAIL | |
| 13 | Idle Progression | PASS/FAIL | |
| 14 | Anti-Cheat Design | PASS/FAIL | |
| 15 | Accessibility Retrofit | PASS/FAIL | |
| 16 | Tutorial-Free Onboarding | PASS/FAIL | |
| 17 | Season Pass Design | PASS/FAIL | |

**Passed:** X/17
**Pass Rate:** X%
**Production Ready (>=80%):** YES/NO
```

---

## ENFORCEMENT RULE

Benchmark tests are the objective measure of brain competence.
A brain that cannot pass these scenarios cannot be trusted with real game design.
Run benchmarks after every major brain update.
Do not lower standards. Improve the brain.

---

## END OF BENCHMARK TESTS
