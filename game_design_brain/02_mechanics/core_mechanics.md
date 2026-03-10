# Core Mechanics

## Fundamental Systems of Interactive Game Design

Core mechanics are the foundational rule systems that define what players can do, how the game world responds, and what constitutes progress. Mastery of core mechanic design separates competent game designers from exceptional ones.

---

## 1. The Core Loop

### Definition and Structure

The core loop is the fundamental cycle of player action that drives engagement. Every successful game has a core loop that can be expressed as a simple cycle:

```
    ┌──────────────┐
    │   ACTION     │ (Player does something)
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   FEEDBACK   │ (Game responds)
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │   REWARD     │ (Player receives value)
    └──────┬───────┘
           │
           ▼
    ┌──────────────┐
    │  PROGRESSION │ (Player advances)
    └──────┬───────┘
           │
           └──────────► (Return to ACTION)
```

### Core Loop Examples by Genre

| Genre | Action | Feedback | Reward | Progression |
|-------|--------|----------|--------|-------------|
| FPS | Shoot enemies | Hit markers, death animations | XP, loot, killstreak | Unlock weapons, rank up |
| Builder | Place blocks/buildings | World changes visually | Functional structures | Expanded capabilities |
| RPG | Complete quests | Narrative, combat results | XP, items, gold | Level up, unlock skills |
| Puzzle | Solve puzzles | Visual/audio feedback | Score, stars | New levels, difficulty |
| Idle | Automate production | Numbers go up | Currency accumulation | Unlock new producers |
| Battle Royale | Loot, fight, survive | Kill feed, zone shrink | Victory, cosmetics | Seasonal rank progress |

### Nested Loops

Successful games layer multiple loops at different time scales:

**Micro loop** (seconds): Single action cycle (shoot enemy, match 3 gems)
**Session loop** (minutes): Complete a match, level, or quest
**Progression loop** (hours): Level up, unlock new content
**Meta loop** (days/weeks): Seasonal progression, long-term goals
**Social loop** (ongoing): Guild advancement, competitive rankings

---

## 2. Input Mechanics

### The Vocabulary of Player Action

Input mechanics define the "verbs" available to the player. The richness of a game's verb set determines its expressive range.

**Primary Verbs** (core actions performed constantly):
- Move, Jump, Shoot, Swing, Place, Select, Match, Drag

**Secondary Verbs** (situational actions):
- Dodge, Block, Interact, Use Item, Switch Weapon, Crouch

**System Verbs** (meta-actions):
- Pause, Save, Inventory, Map, Settings, Chat

### Input Mapping Principles

1. **Frequency-to-accessibility mapping**: Most-used actions on most accessible inputs
2. **Semantic grouping**: Related actions on adjacent inputs (movement on left stick, camera on right)
3. **Muscle memory respect**: Follow platform conventions (A/X for confirm, B/Circle for cancel)
4. **Minimal simultaneous inputs**: Avoid requiring more than 2-3 concurrent inputs
5. **Input buffering**: Accept inputs slightly before they're valid (fighting games, platformers)

### Game Feel (Juice)

Steve Swink's "Game Feel" describes the tactile sensation of interacting with a game system. Key components:

- **Input responsiveness**: Latency between input and visual response (ideally <50ms)
- **Animation curves**: Easing functions that give weight to actions (ease-in for acceleration, ease-out for deceleration)
- **Screen shake**: Camera perturbation for impact feedback
- **Particle effects**: Visual debris, sparks, explosions
- **Audio feedback**: Sound effects synchronized to actions (crunch, thwack, whoosh)
- **Haptic feedback**: Controller vibration patterns
- **Time manipulation**: Hit-stop (brief freeze on impact), slow-motion for emphasis

---

## 3. Feedback Systems

### The Feedback Taxonomy

**Positive feedback loops** (amplifying): Success breeds more success. The winning player gets stronger advantages.
- Rich-get-richer dynamics (Monopoly's property accumulation)
- Kill streaks granting powerful abilities (Call of Duty)
- Snowball mechanics in strategy games

**Negative feedback loops** (stabilizing): The system self-corrects toward balance.
- Rubber banding in racing games
- Blue shell in Mario Kart (targets leader)
- Catchup mechanics in sports games
- Dynamic difficulty adjustment

### Feedback Design Guidelines

| Feedback Element | Design Principle |
|-----------------|-----------------|
| Visual | Immediate, proportional to action significance |
| Audio | Synchronized to action frame, spatially positioned |
| Haptic | Reserved for significant events, varying intensity |
| UI | Non-intrusive, contextual, scalable |
| Narrative | Responsive to player choices, acknowledges actions |

### Information Architecture in Feedback

Games must communicate state through layered feedback:
1. **Immediate state**: Health, ammo, position (always visible)
2. **Recent events**: Damage numbers, kill feed, notifications (temporary)
3. **Session state**: Score, objectives, map (on demand)
4. **Meta state**: Level, rank, progression (between sessions)

---

## 4. Resource Systems

### Resource Design Fundamentals

Resources are the currencies of game systems. They create scarcity, force trade-off decisions, and drive player motivation.

**Resource Types:**
- **Renewable**: Regenerates over time (health, mana, energy)
- **Non-renewable**: Finite supply (unique items, one-time pickups)
- **Depletable**: Consumed on use (ammo, potions, crafting materials)
- **Persistent**: Permanently accumulated (XP, collection items)

### The Sinks and Faucets Model

Game economies use sinks (resource destruction) and faucets (resource creation) to manage supply:

```
FAUCETS (Sources)              SINKS (Drains)
─────────────────              ──────────────
Quest rewards                  Item purchases
Enemy drops                    Crafting costs
Daily bonuses                  Repair/maintenance
Currency exchange              Transaction taxes
Achievement rewards            Consumable items
Trading                        Gambling/gacha
```

**Balance imperative**: Faucets must not exceed sinks over time, or inflation destroys the economy.

### Resource Interdependency

Complex games create resource webs where resources are interconvertible:

```
Time → Grinding → Gold → Items → Power
                    ↓
         Premium Currency → Skip Time Gate
```

This interdependency creates meaningful choices: spend time or money? Invest in offense or defense? Specialize or diversify?

---

## 5. Progression Systems

### Progression Architecture Types

**Linear Progression**: Fixed sequence of content (Super Mario Bros levels 1-1 through 8-4).
- Pros: Tight pacing control, curated experience
- Cons: No replay value, single path

**Branching Progression**: Player chooses between paths (skill trees, story branches).
- Pros: Player agency, replay value, customization
- Cons: Content investment per branch, balance complexity

**Open Progression**: Player chooses what to engage with (open world, sandbox).
- Pros: Maximum freedom, emergent gameplay
- Cons: Pacing loss, content discovery challenges, balance difficulty

**Gated Progression**: Content locked behind requirements (metroidvania abilities, level requirements).
- Pros: Natural difficulty curve, exploration incentive
- Cons: Backtracking frustration, gate clarity challenges

### Experience Point (XP) Systems

XP systems convert player activity into measurable progress. Design considerations:

**XP Curves**: The relationship between level and XP required.
- Linear: Each level requires the same XP (rare, feels increasingly easy)
- Exponential: Each level requires more XP (common, maintains challenge)
- Logarithmic: Early levels fast, later levels plateau (used for soft caps)

**XP Sources**: What earns XP and how much?
- Combat XP: Rewards engagement with core combat loop
- Quest XP: Rewards content completion
- Discovery XP: Rewards exploration
- Social XP: Rewards cooperative play
- Milestone XP: Large one-time awards for achievements

### Unlock Systems

Unlocks provide tangible progression milestones:

| Unlock Type | Motivation Driver | Risk |
|-------------|------------------|------|
| Gameplay (new abilities, weapons) | Competence | Power creep |
| Cosmetic (skins, emotes) | Expression | Perceived value |
| Content (new levels, modes) | Discovery | Content exhaustion |
| Social (titles, badges, frames) | Status | Inflation of status symbols |

---

## 6. Crafting Systems

### Design Principles

Crafting systems transform resources into useful items, creating engagement through:
- **Discovery**: Finding new recipes
- **Collection**: Gathering ingredients
- **Optimization**: Maximizing output efficiency
- **Customization**: Building personalized loadouts

### Crafting System Architectures

**Recipe-based**: Fixed input -> fixed output (Minecraft crafting table)
**Combinatorial**: Any input combination yields results (Breath of the Wild cooking)
**Upgrade-based**: Existing items + resources = improved items (Monster Hunter)
**Procedural**: Random modifiers on crafted items (Diablo, Path of Exile)

### Crafting Economy Integration

Crafting systems must integrate with the broader economy:
- Material rarity determines item value
- Crafting as resource sink (anti-inflationary)
- Time investment as gatekeeping mechanism
- Trade-off between crafting and purchasing

---

## 7. Combat Systems

### Action Combat

Real-time, skill-based combat emphasizing reflexes and spatial awareness.

**Core Components:**
- Attack chains (light/heavy, combos)
- Dodge/parry/block (defensive options)
- Stamina/resource management
- Enemy telegraphing (attack wind-ups)
- Invincibility frames (i-frames)
- Hit boxes and hurt boxes

**Examples**: Dark Souls, Devil May Cry, God of War (2018)

### Turn-Based Combat

Sequential decision-making emphasizing strategy and resource management.

**Core Components:**
- Action economy (how many actions per turn)
- Initiative/speed (turn order determination)
- Resource management (MP, ability cooldowns)
- Positional tactics (grid or formation based)
- Party composition (role synergies)

**Examples**: Final Fantasy (classic), XCOM, Persona 5

### Real-Time Strategy Combat

Macro-level command of units and resources.

**Core Components:**
- Unit production and composition
- Resource gathering and management
- Map control and vision
- Tech trees (upgrade paths)
- Micro (individual unit control) vs Macro (army management)

**Examples**: StarCraft, Age of Empires, Total War

---

## 8. Emergence vs. Scripted Gameplay

### Emergent Design

Emergent gameplay arises from systemic interactions not explicitly scripted by designers.

**Characteristics:**
- Simple rules produce complex behaviors
- Player-generated stories and strategies
- High replay value
- Unpredictable outcomes
- Difficult to balance

**Example**: Breath of the Wild's chemistry system (fire + wood = campfire; fire + grass = wildfire; updraft from fire + paraglider = flight). No scripted sequence, but systems interact to create emergent solutions.

### Scripted Design

Content explicitly authored by designers with predetermined outcomes.

**Characteristics:**
- Precise emotional pacing
- Reliable quality and polish
- Finite content (eventually exhausted)
- Predictable player experience
- Easier to test and balance

### Systemic Design as Synthesis

Modern game design increasingly favors systemic design: layered systems that produce emergent behavior within authored constraints. This is the intersection of "sandbox" freedom and "theme park" curation.

**Design principle**: Build systems, not scripts. Author the rules, not the outcomes.

---

## 9. Physics-Based Mechanics

### Physics as Game Mechanic

Physics simulation creates intuitive, emergent gameplay:

- **Ragdoll physics**: Realistic body dynamics (comedy, feedback)
- **Destruction physics**: Breakable environments (strategic options)
- **Fluid dynamics**: Water, fire, gas simulation (environmental puzzles)
- **Soft body physics**: Deformable objects (tactile feedback)
- **Projectile physics**: Ballistics, trajectory prediction

### Design Considerations for Physics Systems

1. **Consistency over realism**: Players need predictable behavior, not accurate simulation
2. **Readability**: Physics outcomes must be visually clear
3. **Determinism**: Multiplayer requires deterministic physics (or reconciliation)
4. **Performance**: Physics simulation is computationally expensive; budget carefully
5. **Fun factor**: Tweak parameters for fun, not accuracy (jump height, gravity, friction)

---

## 10. Summary: Core Mechanics Design Checklist

- [ ] Core loop identified and validated through prototyping
- [ ] Input mechanics feel responsive and satisfying (game feel)
- [ ] Feedback systems communicate state clearly and satisfyingly
- [ ] Resource systems create meaningful trade-off decisions
- [ ] Progression systems provide short, medium, and long-term goals
- [ ] Combat/interaction systems offer depth with accessible entry
- [ ] Emergent possibilities exist within systemic boundaries
- [ ] All mechanics serve the target aesthetic experience (MDA alignment)

---

*Game Design Brain | Module 02 | Mechanics*
*DropFly OS --- PhD-Level Game Design Knowledge System*
