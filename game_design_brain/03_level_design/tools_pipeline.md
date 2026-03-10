# Tools and Pipeline

## Level Design Production: Editors, Workflows, and Optimization

The level design pipeline encompasses the tools, methodologies, and workflows that transform design concepts into shippable game environments. Efficient production pipelines are as important to level design quality as creative vision.

---

## 1. Level Editor Design

### Editor Categories

**Proprietary Editors**: Custom-built for a specific game or engine.
- Forge (Halo), Creation Kit (Bethesda), Hammer (Valve/Source), Mario Maker
- Optimized for specific game mechanics and art pipelines
- High learning curve; deep feature set
- Community modding tools often derived from internal editors

**Engine-Integrated Editors**: Built into the game engine.
- Unreal Engine's Level Editor
- Unity's Scene Editor
- Godot's Scene System
- Tight integration with engine features (rendering, physics, AI)

**External Tools**: Third-party tools used alongside the engine.
- World Machine, Gaea (terrain generation)
- Houdini (procedural generation)
- SpeedTree (vegetation)
- Substance Designer (materials)
- Tiled (2D tile-based level editor)

### Editor Design Principles for Internal Tools

When building custom level editors:

1. **Real-time preview**: WYSIWYG editing --- what you place is what the player sees
2. **Rapid iteration**: Changes should be testable in seconds, not minutes
3. **Undo/redo**: Unlimited undo stack with clear state management
4. **Snapping and alignment**: Grid snap, surface snap, rotation snap for precise placement
5. **Multi-user support**: Multiple designers working on the same level simultaneously
6. **Version control integration**: Lockable files, merge-friendly formats, diff-able
7. **Prefab/template system**: Reusable assemblies of objects for consistent design
8. **Script integration**: Logic and events attached to objects within the editor
9. **Performance metrics**: Real-time frame budget display while editing
10. **Documentation**: Tooltips, tutorials, and examples embedded in the editor

### User-Generated Content (UGC) Editor Design

Editors designed for players require additional considerations:
- Simplified interface (no exposed technical complexity)
- Template-based creation (start from examples, not blank canvas)
- Safety constraints (no obscene content, no game-breaking creations)
- Sharing and discovery (upload, rate, download community creations)
- Gradual complexity disclosure (beginner mode -> advanced mode)

---

## 2. Modular Environment Kits

### Modular Design Philosophy

Modular environment kits are sets of interlocking 3D assets designed to be combined in countless configurations, much like LEGO bricks.

**Advantages:**
- Consistent visual quality across all levels
- Rapid level construction
- Memory-efficient (instanced geometry)
- Easy to update (change one module, update everywhere)
- Enables non-artists to build levels from pre-approved parts

### Module Categories

| Category | Examples | Usage |
|----------|---------|-------|
| Structural | Walls, floors, ceilings, pillars | Define space boundaries |
| Transition | Doorways, arches, stairs, ramps | Connect spaces |
| Decorative | Trim, molding, signage, debris | Add visual interest |
| Functional | Cover objects, platforms, interactables | Gameplay elements |
| Lighting | Windows, light fixtures, emissive panels | Natural and artificial light sources |
| Props | Furniture, vehicles, machinery | Environmental storytelling |
| Nature | Trees, rocks, grass, water | Outdoor environments |

### Modular Grid Standards

All modules must align to a consistent grid:

**Typical Grid Specifications:**
- Base unit: 1 meter (or engine equivalent)
- Wall height: 3m, 4m, or 6m (standardized per project)
- Wall length: 2m, 4m, 8m segments
- Floor tiles: 2m x 2m or 4m x 4m
- Doorway width: 1.2m (single), 2.4m (double)
- Stair rise/run: 0.2m rise per 0.3m run (comfortable ratio)

**Pivot point convention**: All modules pivot at bottom-left-front corner for consistent snapping.

### Module Connection Types

**Edge-matching**: Modules designed with matching edge profiles that align seamlessly.
**Socket system**: Predefined connection points with typed sockets (wall-to-wall, wall-to-floor).
**Overlap blending**: Modules slightly overlap with matching geometry at borders.
**Trim/border system**: Separate trim pieces cover seams between modules.

---

## 3. Blockout / Greybox Methodology

### What is Blockout?

Blockout (also called greybox or whitebox) is the practice of building level geometry using simple placeholder shapes to test gameplay before investing in art.

### Blockout Workflow

```
Design Intent → Paper Layout → 3D Blockout → Playtest → Iterate → Art Pass
     (1 day)      (0.5 days)    (2-3 days)    (1 day)   (repeat)  (weeks)
```

### Blockout Best Practices

**Use consistent metrics:**
- Player height reference model (mannequin) always present
- Standard jump distances marked in the blockout
- Movement speed calibration (how far in how many seconds)
- Cover height relative to player (crouch height, standing height)

**Use color coding:**
- Gray: Static geometry (walls, floors)
- Blue: Interactive objects (doors, switches, elevators)
- Red: Hazards and kill volumes
- Green: Safe zones and checkpoints
- Yellow: Objective locations
- Orange: Enemy spawn points

**Annotate the blockout:**
- Text labels on key locations
- Flow arrows showing intended player path
- Sight line indicators
- Camera angle markers for scripted sequences

### When to Stop Blockout and Start Art

Transition from blockout to art pass when:
1. Core gameplay flows without friction
2. Pacing feels correct in playtest
3. Critical path is validated
4. Difficulty is approximately correct
5. Performance budget is within range
6. Stakeholder sign-off is achieved

**Warning**: Premature art investment is the most common level design production mistake. Beautiful levels that play poorly require expensive rework.

---

## 4. Playtesting for Level Design

### Playtest Types

**Internal playtests**: Team members test levels in progress.
- Frequent (daily or weekly during development)
- Experienced players (may not catch new player issues)
- Quick iteration cycle

**External playtests**: Target audience members test levels.
- Less frequent (monthly or at milestones)
- Fresh eyes (catch assumptions designers are blind to)
- More representative of actual player experience

**Automated playtests**: AI agents or bots traverse levels.
- Continuous (run nightly or on each build)
- Test reachability, pathfinding, performance
- Cannot evaluate subjective experience

### Playtest Data Collection

| Data Type | Collection Method | Insight |
|-----------|------------------|---------|
| Movement heatmap | Player position logging | Where do players go/not go? |
| Death heatmap | Death event logging | Where do players die most? |
| Gaze tracking | Eye tracking hardware | What do players look at? |
| Completion time | Timer per section | Is pacing correct? |
| Navigation path | Path recording | Do players follow intended route? |
| Verbal feedback | Think-aloud protocol | What confuses/delights players? |
| Emotional response | Post-play survey, facial tracking | How does the level feel? |

### Common Playtest Findings and Solutions

| Finding | Likely Cause | Design Solution |
|---------|-------------|-----------------|
| Players get lost | Poor wayfinding | Add landmarks, lighting, sight lines |
| Players skip content | Content not visible or not incentivized | Improve visibility, add rewards |
| Players die repeatedly at one spot | Difficulty spike | Adjust enemy placement, add cover |
| Players rush through | Insufficient incentive to explore | Add secrets, environmental storytelling |
| Players backtrack excessively | Unclear progression | Add one-way shortcuts, clearer gates |
| Session length exceeds target | Level too long | Cut sections, add save points |

---

## 5. Iteration Workflow

### The Iteration Cycle

```
Build → Test → Analyze → Adjust → Build → Test → ...
```

### Iteration Speed Matters

The quality of a level correlates with the number of iteration cycles completed, not the time spent on any single iteration. Design processes that enable rapid iteration produce better results.

**Factors affecting iteration speed:**
- Build/compile time (seconds vs minutes vs hours)
- Play-from-here functionality (start playtest at any point)
- Hot reloading (change values without restarting)
- Rapid prototyping tools (scripting vs compiled code)
- Version control workflow (branch, commit, merge speed)

### Kill Your Darlings

Level designers must be willing to cut content that doesn't serve the experience:
- Sections that test well but disrupt pacing
- Beautiful spaces with no gameplay purpose
- Clever puzzles that players find frustrating
- Features that work in isolation but not in context

### Documentation During Iteration

Maintain a level design log:
- Changes made per iteration
- Playtest results per iteration
- Rationale for design decisions
- Known issues and planned fixes
- Performance metrics per iteration

---

## 6. Lighting as Design Tool

### Lighting Functions in Level Design

Lighting serves multiple design purposes simultaneously:

**Functional lighting**: Enables visibility and navigation.
- Path lighting guides player movement
- Spotlight draws attention to interactables
- Ambient light establishes baseline visibility

**Atmospheric lighting**: Creates mood and emotional tone.
- Warm light (sunset, firelight) evokes safety, nostalgia
- Cool light (moonlight, fluorescent) evokes unease, sterility
- Dramatic contrast (chiaroscuro) evokes mystery, danger

**Narrative lighting**: Tells stories through illumination.
- A single lit window in an otherwise dark building
- Emergency lighting in a facility (something went wrong)
- Candlelight in a shrine (someone was here recently)

**Gameplay lighting**: Communicates game state and mechanics.
- Red light for danger zones
- Green light for safe/interactive areas
- Flickering light for instability/horror
- Dynamic light for moving objectives

### Lighting Pipeline

```
Blockout Phase: Basic directional/ambient light for visibility
├── Test: Can players see and navigate?
├── Adjust: Ensure all critical paths are visible

First Light Pass: Establish mood and wayfinding
├── Key lights on important locations
├── Fill lights for ambient visibility
├── Accent lights for points of interest

Art Integration: Lights match material and environment
├── Emissive materials on light sources
├── Shadow quality and direction
├── Reflection and bounce lighting

Polish Pass: Final quality and performance
├── Baked vs dynamic light optimization
├── Light probe placement
├── Volumetric effects (fog, god rays)
├── Performance profiling per section
```

---

## 7. Optimization for Level Design

### Performance Budget Awareness

Level designers must work within performance constraints:

| Budget Category | Typical Budget | Impact |
|----------------|---------------|--------|
| Triangle count | 1-5M visible | GPU rendering time |
| Draw calls | 1000-3000 | CPU overhead |
| Texture memory | 1-4 GB | VRAM usage |
| Light sources | 8-32 dynamic | GPU lighting cost |
| Physics bodies | 100-500 active | CPU physics cost |
| AI agents | 10-50 active | CPU AI cost |

### Optimization Techniques for Level Design

**Occlusion culling**: Design levels with natural occluders (walls, terrain) that prevent rendering of hidden areas.

**LOD planning**: Design distant landmarks with LOD in mind (silhouette reads at all distances).

**Instance-friendly design**: Use modular kits that enable GPU instancing (same mesh rendered many times efficiently).

**Streaming boundaries**: Design natural loading boundaries (corridors, elevators, doors) where data can stream.

**View distance design**: Place high-detail content near the player path; reduce detail for distant areas.

### Performance Profiling During Level Design

Level designers should profile regularly:
- Frame time per area (identify hot spots)
- Memory usage per area (prevent out-of-memory)
- Load time per area transition
- AI pathfinding cost per area complexity
- Physics simulation cost per interactive object density

---

## 8. Collaboration and Handoff

### Cross-Discipline Communication

Level design sits at the intersection of multiple disciplines:

| Discipline | Level Design Interface |
|-----------|----------------------|
| Art | Visual target, asset requests, environment art review |
| Narrative | Story beats, dialogue placement, environmental storytelling |
| Audio | Sound design placement, music triggers, ambiance zones |
| Engineering | Scripting, AI behavior, technical constraints |
| QA | Bug reports, playtest coordination, completion testing |
| Production | Schedule, scope, milestone deliverables |

### Level Design Documentation

**Level Design Document (LDD)**: A comprehensive document for each level containing:
- Objective and narrative context
- Layout diagram with callouts
- Encounter design (enemy types, counts, triggers)
- Pacing graph (tension/release over time)
- Asset requirements (art, audio, script)
- Performance targets and constraints
- Playtest plan and success criteria

---

## 9. Summary

The level design pipeline is a discipline of rapid, informed iteration. Tools and workflows exist to reduce the cost of experimentation --- from blockout's cheap geometry to automated playtesting's data-driven insights. The most productive level design teams invest heavily in their pipeline, knowing that better tools produce better levels.

---

*Game Design Brain | Module 03 | Level Design*
*DropFly OS --- PhD-Level Game Design Knowledge System*
