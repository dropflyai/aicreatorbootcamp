# World Building

## Designing Game Worlds: Structure, Generation, and Navigation

World design encompasses the macro-level architecture of game spaces --- how individual levels connect into a coherent, navigable, and compelling whole. From open worlds to procedural generation, world design determines how players experience the totality of a game's space.

---

## 1. World Design Architectures

### Open World

A single continuous space that players can traverse freely in any direction.

**Characteristics:**
- Non-linear progression; players choose where to go
- Emergent gameplay from systemic interactions
- Content density is a critical design challenge
- Fast travel mitigates traversal fatigue
- Requires robust navigation/wayfinding systems

**Design Challenges:**
- **Content density vs world size**: Too sparse feels empty; too dense feels cluttered
- **Difficulty scaling**: How does difficulty work when players can go anywhere?
- **Narrative pacing**: Non-linear exploration conflicts with linear story arcs
- **Technical**: Streaming, LOD (Level of Detail), draw distance optimization

**Exemplars**: Breath of the Wild (emergent, physics-driven), Red Dead Redemption 2 (authored, narrative), Elden Ring (exploration-reward loop)

### Linear

A single path from start to finish with minimal branching.

**Characteristics:**
- Tight authorial control over pacing and narrative
- Every player has the same experience
- Content investment is efficient (no "missed" content)
- Risk of feeling restrictive or on-rails

**Exemplars**: Uncharted series, Call of Duty campaigns, Inside

### Hub-and-Spoke

A central hub area with branching paths leading to distinct levels/zones.

```
        Zone A
         │
Zone D ──HUB── Zone B
         │
        Zone C
```

**Characteristics:**
- Hub provides orientation and social/rest space
- Zones offer themed content variety
- Player returns to hub between excursions
- Gradually unlocking new spokes creates progression

**Exemplars**: Destiny 2 (Tower hub), Monster Hunter (village hub), Mario 64 (Peach's Castle)

### Metroidvania

An interconnected world where progression requires abilities gained in other areas.

```
    ┌────────────────────────────────┐
    │    Area A ──── Area B          │
    │       │           │            │
    │    Area C ──── Area D          │
    │       │           │            │
    │    Area E ──── Area F          │
    │    (locked until ability from D)│
    └────────────────────────────────┘
```

**Characteristics:**
- Exploration is gated by abilities, not arbitrary locks
- Backtracking with new abilities reveals previously inaccessible areas
- Dense, interconnected map with many shortcuts
- Strong sense of mastery as the world "opens up"

**Exemplars**: Hollow Knight, Metroid Dread, Ori and the Blind Forest

### Roguelike / Procedural

Levels generated algorithmically, typically with permadeath and run-based structure.

**Characteristics:**
- Every run is different (high replayability)
- Challenge comes from adaptation, not memorization
- Meta-progression provides long-term goals across runs
- Content generation is computationally efficient

**Exemplars**: Hades, Dead Cells, Spelunky 2, Balatro

---

## 2. Biome Design

### The Purpose of Biomes

Biomes are thematically distinct regions within a game world that provide:
- **Visual variety**: Different color palettes, lighting, and aesthetics
- **Mechanical variety**: Different enemies, hazards, and challenges
- **Narrative variety**: Different cultures, stories, and lore
- **Pacing variety**: Different tones and emotional registers

### Biome Design Framework

| Element | Design Consideration |
|---------|---------------------|
| Visual identity | Unique color palette, vegetation, architecture, sky |
| Audio identity | Unique ambient sound, music theme, creature sounds |
| Mechanical identity | Unique hazards, terrain types, movement options |
| Narrative identity | Unique lore, NPCs, quests, cultural flavor |
| Difficulty identity | Relative challenge level, enemy types |
| Resource identity | Unique materials, items, or rewards |

### Biome Transition Design

How biomes connect affects world believability:

**Hard transitions**: Abrupt boundary (loading screen, portal). Simple but immersion-breaking.
**Gradient transitions**: Gradual blending (forest slowly becomes swamp). Immersive but technically complex.
**Natural boundaries**: Geographic features as borders (rivers, mountains, walls). Logical and navigable.
**Elevation transitions**: Height changes marking biome shifts (lowlands to highlands). Natural and visually dramatic.

### Common Biome Archetypes

| Biome | Visual Character | Typical Hazards | Mood |
|-------|-----------------|-----------------|------|
| Forest/Grassland | Green, pastoral, bright | Wildlife, bandits | Calm, tutorial-level |
| Desert | Yellow/orange, vast, harsh | Heat, sandstorms, dehydration | Isolation, endurance |
| Tundra/Ice | White/blue, cold, sparse | Cold, ice physics, blizzards | Desolation, beauty |
| Volcanic/Lava | Red/orange, dramatic, dangerous | Fire, collapsing terrain | Danger, end-game |
| Underwater | Blue/teal, floating, alien | Drowning, currents, pressure | Mystery, vulnerability |
| Urban/City | Gray, dense, vertical | Vehicles, crime, crowds | Social, complex |
| Ruins/Ancient | Stone, overgrown, mysterious | Traps, guardians, puzzles | Discovery, reverence |
| Swamp/Bog | Green/brown, murky, oppressive | Poison, slow movement, fog | Unease, decay |

---

## 3. Environmental Variety

### The Variety Imperative

Player fatigue correlates directly with environmental repetition. World design must provide sufficient variety across multiple dimensions:

**Visual variety**: Change scenery regularly (every 30-60 minutes of gameplay)
**Mechanical variety**: Introduce new interactions per zone
**Narrative variety**: Different stories and characters per region
**Tonal variety**: Alternate between serious, whimsical, tense, peaceful

### Variety Through Verticality

Three-dimensional worlds that emphasize vertical space feel larger and more varied:
- Underground caves beneath surface areas
- Elevated structures above ground level
- Underwater sections below sea level
- Climbable terrain revealing new perspectives
- Flying/gliding segments

### Interior vs Exterior Balance

Alternating between interior spaces (dungeons, buildings, caves) and exterior spaces (fields, mountains, coastlines) creates natural rhythm:
- Interiors: Confined, controlled encounters, puzzle-focused
- Exteriors: Open, exploration-focused, emergent encounters
- Transitions: Doorways, cave entrances, and portals as pacing beats

---

## 4. Scale and Proportion

### The Scale Spectrum

| Scale | World Size | Content Density | Example |
|-------|-----------|----------------|---------|
| Intimate | Small rooms | Very high (every object matters) | Portal |
| Personal | Building/compound | High (detailed interiors) | Resident Evil |
| District | Neighborhood/town | Medium-high | Yakuza's Kamurocho |
| Regional | Country/continent | Medium | Skyrim |
| Continental | Massive landmass | Low-medium | Red Dead Redemption 2 |
| Planetary | Entire planets | Low (procedural fill) | No Man's Sky |

### The Density-Size Trade-off

```
Content Density
     ^
     |  Portal ●
     |          ●  Yakuza
     |             ● Skyrim
     |                   ● RDR2
     |                         ● No Man's Sky
     +──────────────────────────────> World Size
```

**Design principle**: Content density matters more than world size. A small, dense world is more engaging than a large, empty one. Breath of the Wild succeeds because every hilltop, ruin, and grove contains something worth discovering.

### Proportion and Player Scale

The relationship between player character size and environment scale communicates:
- **Human scale**: Relatable, realistic (most games)
- **Oversized environments**: Grandeur, intimidation, wonder (cathedrals, boss arenas)
- **Undersized environments**: Claustrophobia, oppression (corridors, tunnels)
- **Shifting scale**: Dramatic effect (entering a massive space after long corridors)

---

## 5. Navigation and Wayfinding

### Wayfinding Systems Hierarchy

From most immersive to most explicit:

1. **Environmental cues**: Landmarks, lighting, paths, architecture (most immersive)
2. **Diegetic signs**: In-world signs, posters, maps (immersive)
3. **Audio cues**: Directional sound, music changes (semi-immersive)
4. **Compass/minimap**: HUD-based directional aid (semi-explicit)
5. **Objective markers**: Floating icons pointing to goals (explicit)
6. **GPS trail**: Painted path to destination (most explicit)

### The Wayfinding Design Spectrum

```
Immersive ◄──────────────────────────────► Accessible

Breath of the Wild ── Elden Ring ── Skyrim ── Assassin's Creed ── Ubisoft towers
(stamp-based map)     (no markers)  (compass)  (quest markers)     (reveal all)
```

### Player-Directed Navigation

Modern best practice: Give players navigation tools they can choose to use:
- Optional quest markers (toggleable)
- Player-placed map stamps (Breath of the Wild)
- Environmental clues as primary wayfinding
- NPC hints and directions (verbal wayfinding)
- Photography/pin system for points of interest

---

## 6. Fast Travel Systems

### The Fast Travel Dilemma

Fast travel solves traversal fatigue but can undermine exploration and world immersion.

### Fast Travel Architectures

| System | Mechanism | Example |
|--------|-----------|---------|
| Unlocked waypoints | Discover then teleport between | Skyrim, Breath of the Wild |
| Network nodes | Fixed stations in a network | Dark Souls bonfires, Metro systems |
| Consumable items | Use item to teleport (limited use) | Elden Ring's teleportation items |
| Vehicles | Faster traversal, not instant | Red Dead Redemption 2 horses |
| Map teleportation | Click map location to teleport | Many open-world RPGs |
| None | No fast travel; world designed for traversal | Early Souls games, Shadow of the Colossus |

### Fast Travel Design Principles

1. **Earn before use**: Require discovery of locations before fast travel is available
2. **Cost of convenience**: Some cost (money, time, resources) prevents trivializing distance
3. **Traversal rewards**: Make traveling the world enjoyable through encounters, scenery, and secrets
4. **Strategic placement**: Fast travel nodes at meaningful locations (towns, dungeons, crossroads)
5. **One-way vs bidirectional**: One-way travel (teleport TO but must walk FROM) preserves exploration

---

## 7. Procedural Generation

### Wave Function Collapse (WFC)

WFC generates environments by propagating constraints from a set of tileable modules:

**Process:**
1. Define modules (tiles) with connection rules (what can be adjacent to what)
2. Start with all positions in superposition (all modules possible)
3. Collapse the lowest-entropy position (fewest possibilities)
4. Propagate constraints to neighbors
5. Repeat until all positions are collapsed

**Strengths**: Produces coherent, locally consistent environments
**Weaknesses**: Can fail to find valid solutions; requires careful module design
**Applications**: Townscaper, Bad North, Caves of Qud

### L-Systems

Lindenmayer systems generate fractal-like structures through recursive string rewriting:

```
Axiom: F
Rule: F -> F[+F]F[-F]F

Generation 0: F          (single line)
Generation 1: F[+F]F[-F]F (branching structure)
Generation 2: (complex tree-like structure)
```

**Applications**: Trees, plants, cave systems, river networks, coral, lightning

### Perlin Noise and Terrain Generation

Ken Perlin's noise function generates smooth, natural-looking randomness:

**Applications:**
- **Heightmaps**: Terrain elevation (mountains, valleys, plains)
- **Biome distribution**: Temperature and moisture maps determine biome placement
- **Cave generation**: 3D noise carved into cave systems
- **Cloud and water simulation**: Animated noise for atmospheric effects

**Multi-octave noise**: Layer multiple noise frequencies for natural complexity:
```
Final = 1.0 * noise(x) + 0.5 * noise(2x) + 0.25 * noise(4x) + 0.125 * noise(8x)
```

### Procedural Generation Design Principles

1. **Authored seeds, procedural fill**: Use procedural generation to fill between hand-designed landmarks
2. **Constraint-based**: Define rules that prevent unplayable or ugly results
3. **Post-generation curation**: Filter or modify generated content for quality
4. **Seed-based reproducibility**: Same seed produces same world (for sharing, debugging)
5. **Hybrid approach**: Procedural layouts with hand-crafted room templates (Dead Cells, Spelunky)

---

## 8. World Building for Narrative

### Lore Integration in World Design

The world's physical design should communicate its history:
- Ancient ruins indicate previous civilizations
- Architectural styles evolve across time periods
- Environmental damage tells stories of conflict
- Cultural artifacts embedded in environments
- Graffiti, signage, and decay as storytelling

### Living Worlds

Dynamic world states that respond to time and player action:
- **Day/night cycle**: Different content, NPCs, and hazards by time
- **Weather systems**: Affect gameplay, visibility, and mood
- **Seasonal changes**: Long-term environmental transformation
- **Player impact**: World changes based on player decisions
- **NPC schedules**: Characters with daily routines (Stardew Valley, Majora's Mask)

---

## 9. Technical Considerations

### Streaming and Level of Detail

Large worlds require technical strategies:
- **World streaming**: Load/unload chunks as player moves through the world
- **LOD (Level of Detail)**: Reduce geometric complexity with distance
- **Occlusion culling**: Don't render what the player can't see
- **Instancing**: Reuse geometry efficiently (trees, rocks, buildings)
- **Impostor rendering**: Replace distant 3D objects with 2D billboards

### World Segmentation

How worlds are divided for development and performance:
- **Chunk-based**: Regular grid divisions (Minecraft)
- **Zone-based**: Irregular areas with loading boundaries (classic MMOs)
- **Seamless streaming**: Continuous loading with no boundaries (modern open worlds)
- **Instance-based**: Separate server instances for dungeons/events (Destiny 2)

---

## 10. Summary

World design is the macro-level expression of game design philosophy. The choice between linear and open, between handcrafted and procedural, between dense and vast, defines the fundamental character of a game. The best worlds feel like places worth inhabiting --- spaces that reward curiosity, respect the player's time, and tell stories through every vista, ruin, and hidden corner.

---

*Game Design Brain | Module 03 | Level Design*
*DropFly OS --- PhD-Level Game Design Knowledge System*
