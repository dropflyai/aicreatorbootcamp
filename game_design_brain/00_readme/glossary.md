# Game Design Brain -- Glossary

## Purpose

This glossary defines the precise terminology used across all Game Design Brain modules. Consistent vocabulary prevents miscommunication between design, engineering, and business stakeholders. Terms are organized by domain and cross-referenced where they span multiple disciplines.

---

## Core Game Design Terms

### Fundamental Concepts

| Term | Definition | Source/Context |
|------|-----------|----------------|
| **Mechanic** | A rule or system that defines how the game responds to player input. The atomic unit of game design. | MDA Framework (Hunicke et al., 2004) |
| **Dynamic** | Emergent behavior that arises from the interaction of mechanics and player choices. Dynamics are not directly designed -- they emerge. | MDA Framework |
| **Aesthetic** | The emotional response evoked in the player. The desired player experience. Examples: sensation, fantasy, narrative, challenge, fellowship, discovery, expression, submission. | MDA Framework, 8 Aesthetics |
| **Core Loop** | The fundamental cycle of actions the player repeats most frequently. Typically: action -> reward -> progression -> action. | Industry standard |
| **Meta Loop** | The higher-order progression system that sits above the core loop. Session-to-session or week-to-week engagement. | Industry standard |
| **Game Feel** | The tactile, kinesthetic, and emotional quality of moment-to-moment interaction. Encompasses responsiveness, weight, juice, and feedback. | Steve Swink, *Game Feel* (2008) |
| **Juice** | Excessive positive feedback to player actions -- screen shake, particles, sound effects, animation flourishes -- that makes interactions feel impactful. | Martin Jonasson & Petri Purho, "Juice It or Lose It" (GDC) |
| **Flow State** | The psychological state of complete absorption in an activity. Characterized by loss of self-consciousness, distorted sense of time, and intrinsic satisfaction. | Csikszentmihalyi, *Flow* (1990) |
| **Magic Circle** | The conceptual boundary that separates the rules and reality of the game world from everyday life. Within the magic circle, game rules supersede real-world rules. | Huizinga, *Homo Ludens* (1938) |
| **Meaningful Choice** | A decision point where the player has sufficient information, multiple viable options, and the outcome matters. Trivial choices or choices without consequence are not meaningful. | Sid Meier, attributed |
| **Emergence** | Complex behaviors arising from simple rules. Emergent games derive richness from mechanics interactions rather than authored content. | Holland, *Emergence* (1998) |
| **Progression** | Game structures where content is authored and sequenced. Players move through designer-created experiences in a controlled order. | Jesper Juul, *Half-Real* (2005) |

### Player-Facing Terms

| Term | Definition |
|------|-----------|
| **Player Agency** | The degree to which the player feels their actions are meaningful and consequential. Agency requires both freedom of action and visible impact. |
| **Player Expression** | The ability for players to create unique identities, strategies, or content within the game's systems. Customization, build variety, and creative tools enable expression. |
| **Skill Ceiling** | The maximum level of mastery a game supports. High skill ceilings mean the gap between a novice and expert is large. |
| **Skill Floor** | The minimum skill required to participate meaningfully. Low skill floors mean the game is accessible to beginners. |
| **Skill Gap** | The difference between skill floor and skill ceiling. A large skill gap enables both accessibility and depth. |
| **Power Fantasy** | The emotional experience of feeling powerful, competent, or extraordinary within the game world. |
| **Friction** | Any obstacle between the player's intent and their desired action. Friction can be positive (challenge) or negative (poor UX). |

---

## Player Psychology Terms

| Term | Definition | Source |
|------|-----------|--------|
| **Bartle Player Types** | Taxonomy of player motivations: Achievers (points), Explorers (discovery), Socializers (relationships), Killers (domination). Later expanded to 8 types with implicit/explicit axis. | Richard Bartle (1996) |
| **Self-Determination Theory (SDT)** | Motivation framework identifying three innate psychological needs: Autonomy, Competence, and Relatedness. Satisfying these needs produces intrinsic motivation. | Deci & Ryan (1985) |
| **Intrinsic Motivation** | Motivation arising from the activity itself -- curiosity, mastery, enjoyment. Sustainable and self-reinforcing. | SDT |
| **Extrinsic Motivation** | Motivation from external rewards -- points, unlocks, social status. Can undermine intrinsic motivation (overjustification effect). | SDT |
| **Overjustification Effect** | When extrinsic rewards reduce intrinsic motivation for a previously enjoyable activity. Adding rewards to fun activities can make them feel like work. | Lepper, Greene & Nisbett (1973) |
| **Variable-Ratio Reinforcement** | Reward schedule where reinforcement occurs after an unpredictable number of responses. Produces high, steady response rates. Basis of slot machine mechanics. | B.F. Skinner (1957) |
| **Loss Aversion** | The tendency for losses to feel approximately twice as painful as equivalent gains feel pleasurable. Informs FOMO mechanics and sunk cost exploitation. | Kahneman & Tversky (1979) |
| **Endowed Progress Effect** | People are more motivated to complete a goal when given artificial advancement toward it (e.g., a loyalty card with 2 of 10 stamps already filled). | Nunes & Dreze (2006) |
| **Zeigarnik Effect** | Incomplete tasks are remembered better than completed ones. Drives "one more turn" compulsion and progress bar motivation. | Bluma Zeigarnik (1927) |
| **Hedonic Adaptation** | The tendency for emotional response to diminish with repeated exposure. Rewards must escalate or vary to maintain impact. | Brickman & Campbell (1971) |
| **Competence** | The need to feel effective in one's interactions with the environment. Games satisfy competence through challenge-skill balance and clear feedback. | SDT |
| **Autonomy** | The need to feel volitional and self-directed. Games satisfy autonomy through meaningful choices and player agency. | SDT |
| **Relatedness** | The need to feel connected to others. Games satisfy relatedness through multiplayer, guilds, shared experiences. | SDT |

---

## Economy and Monetization Terms

| Term | Definition |
|------|-----------|
| **Source** | Any mechanism that introduces currency or resources into the game economy. Examples: quest rewards, daily login bonuses, enemy drops. |
| **Sink** | Any mechanism that removes currency or resources from the game economy. Examples: item purchases, repair costs, upgrade fees. |
| **Faucet-Drain Model** | Economy framework where sources (faucets) inject value and sinks (drains) remove it. Balance between the two prevents inflation. |
| **Inflation** | When the rate of currency introduction exceeds the rate of removal, causing prices to rise and currency to lose value. |
| **Soft Currency** | In-game currency earned through gameplay. Abundant but with limited purchasing power. Example: gold, coins. |
| **Hard Currency** | In-game currency typically purchased with real money or earned in limited quantities. Gatekeeper for premium content. Example: gems, crystals. |
| **Conversion Rate** | The ratio at which hard currency can be acquired from real money. Also: the percentage of players who make any purchase. |
| **ARPU** | Average Revenue Per User. Total revenue divided by total active users. |
| **ARPPU** | Average Revenue Per Paying User. Total revenue divided by paying users only. |
| **Whale** | High-spending player who contributes disproportionate revenue. Typically 1-2% of players generating 50%+ of revenue. Term carries ethical implications. |
| **Battle Pass** | Seasonal progression system with free and premium tiers. Players purchase access to premium rewards and earn them through play. |
| **Gacha** | Randomized reward mechanic where players spend currency for a chance at desired items. Common in mobile games. Subject to increasing regulation. |
| **Pity System** | Guaranteed reward after N unsuccessful attempts in a gacha/loot system. Mitigates worst-case bad luck. |
| **LTV (Lifetime Value)** | Predicted total revenue a player will generate over their entire time playing. Key metric for user acquisition ROI. |
| **CPI (Cost Per Install)** | The cost to acquire one new player through paid marketing. Must be less than LTV for sustainable growth. |

---

## Level Design Terms

| Term | Definition |
|------|-----------|
| **Pacing** | The rhythm of intensity in a game experience. Alternation between high-intensity (combat, puzzles) and low-intensity (exploration, narrative) moments. |
| **Gating** | Blocking player progress until a condition is met. Skill gates require demonstration of ability. Resource gates require accumulation. Narrative gates require story progress. |
| **Critical Path** | The shortest route through a level or game that achieves the primary objective. All other content is optional. |
| **Golden Path** | The designer-intended route through a level that provides the optimal experience. May differ from the critical path. |
| **Breadcrumbing** | Using visual cues, rewards, or narrative hooks to guide the player along a desired path without explicit markers. |
| **Environmental Storytelling** | Conveying narrative through the arrangement of objects, architecture, and details in the game world rather than through text or dialogue. |
| **Negative Space** | Areas of low density or activity that provide contrast to high-density areas. Rest points that make action areas feel more impactful. |
| **Sight Lines** | Visual corridors that draw the player's eye toward points of interest, objectives, or hazards. |
| **Weenies** | Large, visible landmarks that orient the player and draw them toward destinations. Term from Walt Disney Imagineering. |
| **Kiss-and-Ride** | Level design pattern where the player briefly enters a space, completes an objective, and returns to the main path. Minimizes backtracking. |
| **Lock-and-Key** | Design pattern where progress requires finding a specific item or ability to pass a barrier. Creates exploration motivation. |

---

## Narrative Design Terms

| Term | Definition |
|------|-----------|
| **Branching Narrative** | Story structure where player choices create divergent paths, each with different content and outcomes. |
| **Bark** | Short, contextual voice lines triggered by game events. Not part of formal dialogue -- ambient character reactions. Example: combat callouts, environmental comments. |
| **Dialogue Tree** | Branching conversation structure where the player selects from response options, each leading to different NPC responses and outcomes. |
| **Ludonarrative Dissonance** | Conflict between the story the game tells and the story the gameplay creates. Example: a narrative about pacifism in a game where the player kills hundreds. |
| **Ludonarrative Harmony** | When gameplay mechanics reinforce narrative themes and vice versa. The gold standard of narrative design. |
| **Diegetic** | Existing within the game world. A diegetic health bar is a visible element the character can "see" (e.g., a watch, a device). |
| **Non-Diegetic** | Existing outside the game world. Traditional HUD elements that only the player sees. |
| **Procedural Rhetoric** | Using game mechanics to make an argument or convey a message. The rules themselves express meaning. | Ian Bogost (2007) |
| **Environmental Narrative** | Story conveyed through the environment -- architecture, decay, personal items, spatial arrangements tell stories without words. |

---

## Balance and Analytics Terms

| Term | Definition |
|------|-----------|
| **Win Rate** | Percentage of games or encounters won. A 50% win rate in PvP suggests perfect balance. |
| **Pick Rate** | How often a character, item, or strategy is selected relative to alternatives. |
| **Ban Rate** | How often a character or item is banned in competitive play. High ban rate suggests perceived imbalance. |
| **TTK (Time To Kill)** | The time required to eliminate an opponent. Core balance lever in shooters and combat games. |
| **DPS (Damage Per Second)** | Standardized damage output metric. Used to compare weapon and character effectiveness. |
| **EHP (Effective Hit Points)** | Hit points adjusted for damage mitigation (armor, resistance). Allows comparison of survivability. |
| **Power Curve** | The rate at which player power increases over time. Steeper curves feel rewarding but compress content. |
| **D1/D7/D30 Retention** | Percentage of players who return 1, 7, or 30 days after first play. Industry benchmarks vary by genre. |
| **Session Length** | Duration of a single play session. Influenced by game design, platform, and content density. |
| **Churn** | The rate at which players stop playing. Churn analysis identifies where and why players leave. |
| **Cohort Analysis** | Analyzing player behavior by grouping players who started at the same time. Reveals how changes affect new vs. existing players. |
| **Funnel Analysis** | Tracking player progression through sequential steps (install -> tutorial -> first purchase). Drop-off at each step identifies friction. |
| **FTUE (First-Time User Experience)** | The experience a player has during their very first session. The single most important retention lever. |
| **DAU/MAU** | Daily Active Users / Monthly Active Users. The ratio (DAU/MAU) indicates engagement intensity. A ratio of 0.2+ is healthy for most games. |

---

## Technical Game Design Terms

| Term | Definition |
|------|-----------|
| **Frame Data** | Precise timing information for game actions measured in frames. Critical for fighting games and action games. |
| **Tick Rate** | The frequency at which the game server updates the game state. Higher tick rates mean more responsive multiplayer. |
| **Netcode** | The networking code that handles multiplayer synchronization. Rollback netcode and server-authoritative models are current best practices. |
| **Proc Gen (Procedural Generation)** | Algorithmic content creation. Levels, items, or worlds generated by code rather than hand-crafted. |
| **RNG (Random Number Generation)** | Randomness in game systems. Pseudo-random distribution (PRD) prevents extreme streaks. |
| **Hitbox** | Invisible collision shape used to detect hits. Misalignment between visual model and hitbox creates frustration. |
| **I-Frames (Invincibility Frames)** | Brief periods of invulnerability during specific animations (dodge rolls, knockback). Key balance tool for action games. |

---

## Gamification Terms

| Term | Definition |
|------|-----------|
| **Pointsification** | Pejorative term for shallow gamification that adds points and badges without meaningful game design. Ineffective and often counterproductive. |
| **Engagement Loop** | Cycle of motivation -> action -> feedback -> reward that sustains participation. Must serve genuine user value. |
| **Progress Bar** | Visual representation of advancement toward a goal. Leverages Zeigarnik effect and endowed progress effect. |
| **Streak** | Consecutive days or sessions of activity. Powerful retention tool but ethically fraught if breaking a streak causes disproportionate loss. |

---

## Abbreviations

| Abbreviation | Full Term |
|-------------|-----------|
| MDA | Mechanics-Dynamics-Aesthetics |
| SDT | Self-Determination Theory |
| F2P | Free-to-Play |
| FTUE | First-Time User Experience |
| HUD | Heads-Up Display |
| NPC | Non-Player Character |
| PvP | Player versus Player |
| PvE | Player versus Environment |
| GDD | Game Design Document |
| QA | Quality Assurance |
| UAT | User Acceptance Testing |
| UGC | User-Generated Content |
| KPI | Key Performance Indicator |
| ARPPU | Average Revenue Per Paying User |
| LTV | Lifetime Value |
| CPI | Cost Per Install |
| DAU | Daily Active Users |
| MAU | Monthly Active Users |

---

**All modules in this brain use these definitions. If a term is used differently in a specific context, the module must note the deviation explicitly.**
