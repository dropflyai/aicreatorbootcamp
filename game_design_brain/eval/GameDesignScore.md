# Game Design Score -- Quality Enforcement (Authoritative)

This document defines how game design quality is evaluated.
Every game design deliverable must be scored before it is considered complete.

If quality is not measurable, it is not enforced.
If fun is not validated, the game does not ship.

---

## SCORING RULES (MANDATORY)

Each game design deliverable must be scored across the following 8 dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions

These dimensions are critical. Score <3 = immediate redesign required:
- **Core Loop Quality**
- **Onboarding**
- **Monetization Ethics**

### Passing Criteria

- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- Fun Factor is NOT a hard fail but score <3 triggers mandatory playtest review
- All dimensions must be explicitly scored -- no skipping

### Genre Context Rule

Scores must be evaluated relative to genre benchmarks. A match-3 puzzle game and an open-world RPG have different expectations for economy complexity, session length, and retention curves. The evaluator MUST state the genre and platform context before scoring.

---

## 1. CORE LOOP QUALITY

**Question:**
Is the fundamental gameplay loop compelling enough to sustain repeated engagement?

### What to Evaluate

- **Compelling Verb:** The core action (tap, swipe, build, fight, solve) is inherently satisfying
- **Clear Feedback:** Every player action produces immediate, readable feedback
- **Variable Rewards:** Outcomes have enough variance to maintain curiosity
- **Session Appropriateness:** Loop length matches the platform (mobile: 2-5 min, PC: 15-60 min)
- **Skill Expression:** Players can improve at the core mechanic over time
- **Flow State Potential:** Difficulty curve allows players to enter flow

### Scoring Guide

- **5** -- Loop is immediately compelling, feedback is crisp, variable rewards create "one more round" pull, session length is perfectly calibrated
- **4** -- Loop is solid with minor feedback gaps; rewards could use more variance; sessions occasionally run too long or short
- **3** -- Loop functions but feels routine; feedback is delayed or unclear; rewards are predictable; sessions feel arbitrary
- **2** -- Loop is tedious or confusing; feedback is missing for key actions; rewards feel meaningless; session length is wrong for platform
- **1** -- No discernible loop; actions feel disconnected from outcomes; no reward structure; session structure absent

### Red Flags

- Core verb is passive (watching, waiting) without deliberate intent
- Feedback delay >300ms on core actions
- Reward variance is zero (same outcome every time)
- Mobile sessions require >10 min with no save points
- No skill ceiling -- mastery is impossible or irrelevant

Score <3 --> redesign the core loop before proceeding with any other systems.

---

## 2. PLAYER MOTIVATION

**Question:**
Does the design support both intrinsic and extrinsic motivation in a sustainable way?

### What to Evaluate

- **Intrinsic Motivation:** Curiosity, mastery, autonomy, relatedness are supported
- **Flow State Achievable:** Challenge-skill balance is tuned for the target audience
- **Progression Satisfying:** Players feel meaningful advancement over time
- **Goal Clarity:** Players always know what to do next and why it matters
- **Autonomy Preserved:** Players make meaningful choices, not just follow instructions
- **Social Motivation:** Multiplayer or community features enhance motivation (if applicable)

### Scoring Guide

- **5** -- Multiple intrinsic motivators active; flow state is easily achieved; progression feels earned and meaningful; goals are always clear; player agency is central
- **4** -- Intrinsic motivation present but could be stronger; flow is achievable with minor friction; progression has occasional flat spots; goals mostly clear
- **3** -- Relies heavily on extrinsic rewards (currency, unlocks); flow is inconsistent; progression feels like a treadmill; goals sometimes unclear
- **2** -- Motivation depends entirely on extrinsic rewards; flow is rare; progression is arbitrary; players frequently ask "what now?"
- **1** -- No motivation structure; players have no reason to continue; no progression; no goals

### Red Flags

- Progression gated entirely behind time or money
- No mastery curve -- player skill is irrelevant to outcomes
- "Checklist gameplay" with no emergent possibilities
- Rewards undermine intrinsic motivation (overjustification effect)
- No midgame goals -- only early and endgame content

Score <3 --> redesign motivation systems and progression arc.

---

## 3. ECONOMY BALANCE

**Question:**
Is the game economy balanced to sustain long-term engagement without inflation or frustration?

### What to Evaluate

- **Sources and Sinks Balanced:** Currency generation matches intended spending rates
- **Inflation Controlled:** Late-game players do not accumulate useless currency
- **Player Agency Preserved:** Economy choices feel meaningful, not forced
- **Dual Currency Health:** Free and premium currencies serve distinct purposes without overlap exploitation
- **Pricing Feels Fair:** Items and upgrades are priced to feel like good value
- **Economy Supports Retention:** Earning rates create anticipation, not frustration

### Scoring Guide

- **5** -- Sources and sinks perfectly balanced at all progression stages; no inflation; every purchase feels like a meaningful choice; economy enhances gameplay; pricing is intuitive
- **4** -- Minor imbalances at specific progression stages; slight inflation in late game; most purchases feel fair; economy mostly serves gameplay
- **3** -- Noticeable imbalances; inflation visible in mid-to-late game; some purchases feel mandatory; economy occasionally conflicts with fun
- **2** -- Significant imbalances; runaway inflation or artificial scarcity; pay-or-wait walls; economy is a frustration source
- **1** -- Economy is broken; currency is meaningless or unobtainable; pricing is predatory; economy actively harms gameplay

### Red Flags

- Players accumulate 10x or more currency than they can spend
- New currency types introduced to solve design problems instead of fixing systems
- "Soft paywall" at predictable progression points
- Premium currency required for core gameplay, not just cosmetics
- No economy simulation or spreadsheet modeling before implementation

### Required Artifacts

- Economy spreadsheet with source/sink projections at D1, D7, D30, D90
- Simulation of 1000+ player economy trajectories
- Inflation rate calculations per progression tier

Score <3 --> halt feature development; fix economy before adding content.

---

## 4. ONBOARDING

**Question:**
Can a new player learn the game through play without external help or tutorial walls?

### What to Evaluate

- **FTUE Completion Rate:** Target >70% first-time user experience completion
- **Teach Through Play:** Mechanics introduced through guided gameplay, not text walls
- **No Tutorial Walls:** Player never feels trapped in a mandatory tutorial
- **Progressive Disclosure:** Complexity revealed gradually as mastery increases
- **Recovery from Failure:** New players who fail can recover without restarting
- **Time to Fun:** Player reaches the core loop within first 60 seconds (mobile) or 5 minutes (PC/console)

### Scoring Guide

- **5** -- FTUE completion >85%; mechanics taught entirely through play; complexity introduced perfectly; time to fun is under target; players never feel lectured
- **4** -- FTUE completion 70-85%; mostly taught through play with minor text prompts; complexity pacing has small gaps; time to fun meets target
- **3** -- FTUE completion 50-70%; relies on text-based tutorials; some mechanics require external learning; time to fun slightly exceeds target
- **2** -- FTUE completion 30-50%; tutorial walls present; significant mechanics are unexplained; time to fun is far too long
- **1** -- FTUE completion <30%; no onboarding or completely broken onboarding; players quit before understanding the game

### Red Flags

- Unskippable tutorials longer than 3 minutes
- Text-heavy instructions before any gameplay
- Mechanics introduced all at once rather than progressively
- No contextual help after the tutorial ends
- Tutorial disconnected from actual gameplay (separate "tutorial level")

### Required Artifacts

- FTUE flow diagram with drop-off measurement points
- Heatmap plan for first-session attention tracking
- Progressive disclosure schedule (what unlocks when)

Score <3 --> redesign onboarding before any external playtesting.

---

## 5. RETENTION DESIGN

**Question:**
Is the game designed to sustain engagement across days, weeks, and months?

### What to Evaluate

- **D1 Retention:** >40% for casual mobile, >50% for midcore, >60% for hardcore (genre-adjusted)
- **D7 Retention:** >20% for casual mobile, >25% for midcore, >30% for hardcore
- **D30 Retention:** >10% for casual mobile, >12% for midcore, >15% for hardcore
- **Session Frequency:** Appropriate daily session count for genre
- **Return Triggers:** Clear reasons to come back (daily rewards, events, social, narrative)
- **Content Depth:** Enough content to sustain engagement through D30+

### Scoring Guide

- **5** -- Retention exceeds genre benchmarks at all intervals; return triggers are varied and compelling; content pipeline sustains long-term engagement; players form habits
- **4** -- Retention meets genre benchmarks; return triggers work but could be more varied; content is adequate for D30; engagement patterns are healthy
- **3** -- Retention slightly below benchmarks; return triggers rely too heavily on daily rewards; content gap between D7 and D30; some engagement patterns are forced
- **2** -- Retention significantly below benchmarks; return triggers are weak or absent; major content gaps; players leave and do not return
- **1** -- No retention design; players have no reason to return after first session; no daily/weekly/monthly cadence; no content roadmap

### Red Flags

- D1 retention high but D7 drops by >70% (day 2-7 experience broken)
- Retention depends entirely on FOMO mechanics
- No live operations or events plan
- Social features missing in a social-dependent genre
- Content treadmill with no meaningful progression

### Genre Benchmark Table

| Genre | D1 Target | D7 Target | D30 Target |
|-------|-----------|-----------|------------|
| Casual Puzzle | 40% | 18% | 8% |
| Midcore Strategy | 45% | 22% | 12% |
| RPG | 50% | 25% | 14% |
| Hyper-Casual | 35% | 10% | 3% |
| Hardcore PvP | 55% | 30% | 18% |

Score <3 --> diagnose the retention curve and redesign the day 1-7 experience.

---

## 6. MONETIZATION ETHICS

**Question:**
Is the monetization model ethical, sustainable, and respectful of player trust?

### What to Evaluate

- **No Pay-to-Win:** Paying players gain convenience or cosmetics, never competitive advantage in skill-based contexts
- **Fair Value:** Purchases feel worth the price; no buyer's remorse
- **Whale Protection:** Spending caps or friction points prevent exploitative spending patterns
- **Informed Consent:** Players always know what they are buying before purchase
- **No Dark Patterns:** No hidden costs, deceptive UI, artificial urgency on non-limited items, or manipulative FOMO
- **Children Protection:** Age-gated spending, no loot boxes marketed to children, parental controls

### Scoring Guide

- **5** -- Monetization is transparent, fair, and enhances the experience; whale protection in place; no dark patterns; players feel good about spending; children protected
- **4** -- Monetization is mostly fair with minor concerns; whale protection exists but could be stronger; rare edge cases of unclear value; compliant with regulations
- **3** -- Monetization has noticeable pressure points; some purchases feel overpriced; whale protection is minimal; occasional dark patterns; regulatory compliance is borderline
- **2** -- Monetization is aggressive; pay-to-win elements present; no whale protection; dark patterns used deliberately; regulatory risk
- **1** -- Predatory monetization; pay-to-win is core design; exploitation of vulnerable players; dark patterns throughout; likely regulatory violation

### Red Flags

- Loot boxes with undisclosed odds
- "Limited time" offers that recur identically
- Spending required to progress past a specific point
- No spending cap or velocity limit
- Targeting high-spend players with personalized pricing
- Ads that disguise themselves as gameplay elements

### Required Artifacts

- Monetization ethics review document
- Spending cap justification
- Loot box odds disclosure (if applicable)
- Age verification and parental control plan

Score <3 --> HARD FAIL. Redesign monetization before ANY external release.

---

## 7. ACCESSIBILITY

**Question:**
Can the game be enjoyed by the widest possible audience regardless of ability?

### What to Evaluate

- **Difficulty Options:** Multiple difficulty settings or adaptive difficulty available
- **Control Remapping:** Players can remap controls to their needs
- **Visual Alternatives:** Colorblind modes, high contrast, adjustable text size
- **Audio Alternatives:** Subtitles, visual cues for audio-dependent mechanics, volume controls per channel
- **Motor Accessibility:** One-handed play options, adjustable input timing, auto-aim options
- **Cognitive Accessibility:** Clear objectives, adjustable game speed, difficulty reduction options

### Scoring Guide

- **5** -- Comprehensive accessibility suite; difficulty options are well-designed; full control remapping; colorblind and high-contrast modes; subtitles with speaker identification; motor accessibility options; follows platform accessibility guidelines
- **4** -- Good accessibility coverage with minor gaps; most common needs addressed; colorblind mode present; subtitles available; some control remapping
- **3** -- Basic accessibility; limited difficulty options; no control remapping; colorblind mode missing; subtitles present but minimal; motor accessibility not addressed
- **2** -- Minimal accessibility; single difficulty; no remapping; no colorblind support; no subtitles; significant barriers for many players
- **1** -- No accessibility consideration; game excludes large player segments by default

### Red Flags

- Color used as the ONLY differentiator for gameplay elements
- Time-pressure mechanics with no way to adjust timing
- Small touch targets on mobile (<44x44 points)
- Audio-only cues for critical gameplay information
- No pause functionality
- Rapid flashing or strobing effects without warning

### Accessibility Standards Reference

- Xbox Accessibility Guidelines (XAG)
- Game Accessibility Guidelines (gameaccessibilityguidelines.com)
- WCAG 2.1 (adapted for games)
- Platform-specific guidelines (Apple, Google, Nintendo, Sony)

Score <3 --> add minimum accessibility features before public release.

---

## 8. FUN FACTOR

**Question:**
Do players experience genuine enjoyment, engagement, and the desire to keep playing?

### What to Evaluate

- **Playtest Feedback:** Qualitative feedback from target audience playtests
- **Engagement Metrics:** Session length, session frequency, voluntary play beyond required
- **"One More Turn" Moments:** Players naturally extend sessions beyond intended stopping points
- **Emotional Range:** Game evokes intended emotions (excitement, curiosity, satisfaction, tension)
- **Memorable Moments:** Players recall and share specific experiences
- **Replayability:** Players want to play again after completing content

### Scoring Guide

- **5** -- Playtesters consistently exceed intended session length; unsolicited positive feedback; "one more turn" effect is strong; players share experiences voluntarily; high replayability
- **4** -- Playtesters enjoy the experience with minor engagement dips; positive feedback with actionable suggestions; "one more turn" effect present but inconsistent; good replayability
- **3** -- Playtesters are engaged but not enthusiastic; feedback is mixed; sessions end at natural stopping points without pull to continue; moderate replayability
- **2** -- Playtesters complete sessions but show signs of boredom; feedback is lukewarm; no "one more turn" effect; low replayability
- **1** -- Playtesters disengage early; feedback is negative; no desire to continue; no replayability

### Red Flags

- Playtesters check their phones during sessions
- Average session length is significantly below design target
- Players describe the experience as "fine" or "okay" (damning with faint praise)
- No spontaneous laughter, exclamation, or visible emotion during play
- Players have no desire to discuss the game after playing

### Playtest Requirements

Fun Factor MUST be validated through actual playtesting:
- Minimum 5 playtest sessions with target audience before any score above 3
- Minimum 15 playtest sessions before scoring a 5
- Playtest observations must be documented with timestamps
- Self-play by the design team does not count toward validation

Score <3 --> the game is not fun enough to ship. Identify and fix engagement gaps.

---

## FINAL GAME DESIGN SCORE DECISION

### Hard Fail Dimensions (Core Loop, Onboarding, Monetization Ethics)

- Score <3 --> **IMMEDIATE REDESIGN REQUIRED**
- These represent fundamental design failures that cannot be patched post-launch

### All Dimensions

- Average score >= 4.0 --> **DESIGN MAY PROCEED TO PRODUCTION**
- Average score 3.5-3.9 --> **CONDITIONAL APPROVAL** -- proceed with documented improvement plan
- Average score < 3.5 --> **REDESIGN REQUIRED** -- do not proceed to production

### Fun Factor Exception

- Fun Factor is NOT a hard fail
- Score <3 triggers mandatory additional playtesting (minimum 10 sessions)
- Score <2 triggers mandatory redesign of core experience

### Genre Context

- All scores MUST be evaluated against genre-appropriate benchmarks
- Evaluator MUST state the genre and platform before scoring
- A casual puzzle game and a hardcore RPG have different standards

---

## SCORE CARD TEMPLATE

```markdown
## Game Design Score: [Game/Feature Name]

**Genre:** [Genre]
**Platform:** [Platform]
**Target Audience:** [Audience]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Core Loop Quality | /5 | |
| Player Motivation | /5 | |
| Economy Balance | /5 | |
| Onboarding | /5 | |
| Retention Design | /5 | |
| Monetization Ethics | /5 | |
| Accessibility | /5 | |
| Fun Factor | /5 | |

**Average Score:** X.X/5
**Hard Fail Check:** PASS / FAIL
**Verdict:** APPROVED / CONDITIONAL / REDESIGN REQUIRED
**Required Actions:** [if any]
**Playtest Sessions Completed:** [number]
```

---

## SCORING PROCESS

1. State genre, platform, and target audience
2. Review all design documentation and playtest data
3. Score each dimension independently with written justification
4. Check hard fail dimensions first -- if any fail, stop and redesign
5. Calculate average score
6. Document required actions for any dimension scoring below 4
7. Record the score card in project documentation

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Do not ship games that fail hard dimensions.
Fun is mandatory, not optional.
Redesign until standards are met.
Playtest until fun is validated.

---

## END OF GAME DESIGN SCORE
