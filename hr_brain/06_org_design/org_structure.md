# Organizational Structure -- Design, Topology, and Conway's Law

## Purpose

This module defines the framework for organizational structure design. Structure is the skeleton upon which strategy, culture, and performance are built. As Peter Drucker observed, "Structure follows strategy." The right structure enables strategy execution; the wrong structure guarantees failure regardless of talent quality. The HR Brain approaches organizational design as a strategic lever, not an administrative exercise.

---

## 1. Foundational Structural Models

### 1.1 Mintzberg's Structural Configurations (1979)

Henry Mintzberg identified five fundamental organizational configurations based on the dominant coordination mechanism:

| Configuration | Coordination Mechanism | Key Part | Best For | Weakness |
|--------------|----------------------|----------|----------|----------|
| **Simple structure** | Direct supervision | Strategic apex (CEO) | Startups, small firms | Dependent on one person; limited scalability |
| **Machine bureaucracy** | Standardization of work processes | Technostructure (analysts/planners) | Mass production, government | Rigid; slow to adapt; dehumanizing |
| **Professional bureaucracy** | Standardization of skills | Operating core (professionals) | Hospitals, universities, law firms | Coordination problems; resistance to management |
| **Divisionalized form** | Standardization of outputs | Middle line (division managers) | Large diversified corporations | Duplication; inter-division conflict |
| **Adhocracy** | Mutual adjustment | Support staff (project teams) | Innovation-driven companies | Ambiguity; political conflict; inefficiency |

### 1.2 Galbraith's Star Model (1977, updated 2014)

Jay Galbraith's Star Model identifies five design policies that must be aligned for an organization to be effective:

```
              STRATEGY
            (Direction)
                │
                ▼
     ┌──────────────────────┐
     │                      │
 STRUCTURE ◄──────────► PROCESSES
(Authority,              (Information &
 reporting)               decision flow)
     │                      │
     └────────┬─────────────┘
              │
     ┌────────┴─────────┐
     │                   │
  REWARDS            PEOPLE
(Alignment &        (Competencies,
 motivation)         mindset)
```

**Key principle**: All five elements must be internally consistent. If strategy requires innovation but rewards penalize failure, the organization will not innovate regardless of structure or people.

---

## 2. Common Organizational Structures

### 2.1 Functional Structure

```
                    CEO
                     │
    ┌────────┬───────┴───────┬────────┐
    │        │               │        │
Engineering  Product     Marketing  Finance
```

| Attribute | Assessment |
|-----------|-----------|
| **Best for** | Single-product companies; early stage; functional depth matters most |
| **Advantage** | Deep functional expertise; economies of scale; clear career paths within function |
| **Disadvantage** | Silos; slow cross-functional coordination; bottleneck at CEO for cross-functional decisions |
| **Failure mode** | Customer or product issues fall between functional boundaries |

### 2.2 Divisional Structure (Product/Geography/Customer)

```
                    CEO
                     │
    ┌────────┬───────┴───────┬────────┐
    │        │               │        │
Product A  Product B    Product C   Shared
Division   Division     Division    Services
(Eng,Prod, (Eng,Prod,  (Eng,Prod,  (Legal,HR,
 Mktg,Ops)  Mktg,Ops)   Mktg,Ops)  Finance)
```

| Attribute | Assessment |
|-----------|-----------|
| **Best for** | Multi-product companies; geographically dispersed; diverse customer segments |
| **Advantage** | Business-unit autonomy; accountability; responsiveness to specific market |
| **Disadvantage** | Functional duplication; inconsistent standards; resource competition between divisions |
| **Failure mode** | Divisions optimize locally at expense of enterprise-wide coordination |

### 2.3 Matrix Structure

```
                        FUNCTIONAL HEADS
                    Eng    Product   Marketing
                     │       │         │
PROJECT/      ───────┼───────┼─────────┼──────
PRODUCT       Proj A │  ●    │    ●    │   ●
HEADS         ───────┼───────┼─────────┼──────
              Proj B │  ●    │    ●    │   ●
              ───────┼───────┼─────────┼──────
              Proj C │  ●    │    ●    │   ●
              ───────┼───────┼─────────┼──────

              ● = Individual contributor reports to both
                  functional head AND project/product head
```

| Attribute | Assessment |
|-----------|-----------|
| **Best for** | Complex environments requiring both functional depth and project coordination |
| **Advantage** | Flexible resource allocation; dual expertise; balanced trade-offs |
| **Disadvantage** | Dual reporting creates confusion; power struggles; slow decision-making |
| **Failure mode** | Employees caught between conflicting priorities from two bosses |

### 2.4 Network/Platform Structure

```
              ┌──────────────┐
              │   PLATFORM   │
              │  (Shared      │
              │   services,   │
              │   standards,  │
              │   infra)      │
              └──────┬───────┘
                     │
    ┌────────┬───────┴───────┬────────┐
    │        │               │        │
  Squad A  Squad B       Squad C   Squad D
  (Full-   (Full-        (Full-   (Full-
   stack)   stack)        stack)    stack)
```

| Attribute | Assessment |
|-----------|-----------|
| **Best for** | Technology companies; fast-moving environments; innovation-focused |
| **Advantage** | Speed; autonomy; end-to-end ownership; reduces coordination cost |
| **Disadvantage** | Duplication risk; platform underinvestment; alignment challenges |
| **Failure mode** | Squads diverge too far; technical fragmentation; platform becomes bottleneck |

---

## 3. Span of Control

### 3.1 Definition and Research

Span of control is the number of direct reports per manager. It is one of the most fundamental organizational design parameters, affecting communication speed, decision quality, and management effectiveness.

### 3.2 Span of Control Guidelines

| Context | Recommended Span | Rationale |
|---------|:---:|-----------|
| Knowledge work (engineering, product, design) | 5-8 | Complex work requires coaching and 1:1 time |
| Experienced teams (senior ICs) | 7-10 | Less hands-on management needed |
| Operational/transactional work | 12-20 | Standardized work requires less individual management |
| New/junior teams | 4-6 | Higher support and development needs |
| Executives (VP+) | 5-8 | Strategic decision-making and coordination |
| Maximum recommended | 12-15 | Beyond this, 1:1 quality suffers materially |

### 3.3 Span and Organizational Layers

Span of control directly determines organizational depth (number of layers):

```
100 employees, span of 5:   CEO → 5 VPs → 25 Managers → 100 ICs (4 layers)
100 employees, span of 10:  CEO → 10 Managers → 100 ICs (3 layers)
100 employees, span of 25:  CEO → 4 Leads → 100 ICs (3 layers, lean)

Fewer layers = faster communication, but wider span = less coaching
```

**HR Brain guidance**: Optimize for the flattest structure that allows managers to effectively coach and develop their teams. For knowledge work, prioritize 1:1 quality over organizational flatness.

---

## 4. Conway's Law

### 4.1 The Law

Melvin Conway (1967): "Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."

**Translation**: The software (or product) your organization builds will mirror the communication patterns within your organization. If you have three teams, you will build a three-part system.

### 4.2 Implications for Organizational Design

Conway's Law is not merely an observation -- it is a design tool. If you want a specific system architecture, you must design your organization to match:

| Desired Architecture | Required Org Structure |
|---------------------|----------------------|
| Monolithic application | Single team or tightly coupled teams |
| Microservices | Autonomous teams with clear service boundaries |
| Platform + products | Platform team + product teams |
| Integrated customer experience | Cross-functional teams organized around customer journeys |

### 4.3 The Inverse Conway Maneuver

Thoughtworks popularized the "Inverse Conway Maneuver": deliberately designing your organization to produce the architecture you want:

```
TRADITIONAL: Org structure → constrains → System architecture
INVERSE:     Desired architecture → informs → Org structure design
```

**Example**: If you want a microservices architecture with independent deployability, organize teams around services (not functions). Each team owns a service end-to-end, including development, testing, deployment, and operations.

---

## 5. Team Topologies (Skelton & Pais, 2019)

### 5.1 Four Fundamental Team Types

Matthew Skelton and Manuel Pais identified four fundamental team types that reduce cognitive load and enable fast flow:

| Team Type | Purpose | Characteristics | Example |
|-----------|---------|----------------|---------|
| **Stream-aligned** | Delivers value directly to customer or business | Full-stack, cross-functional; owns a complete value stream | Product team, feature team, customer journey team |
| **Platform** | Provides internal services to reduce cognitive load for stream-aligned teams | Operates like an internal product; has its own roadmap; treats stream-aligned as customers | Infrastructure team, developer platform, data platform |
| **Enabling** | Helps stream-aligned teams overcome capability gaps | Temporary engagement; coaches and upskills; does NOT do the work for the team | Architecture guild, SRE consultants, agile coaching |
| **Complicated subsystem** | Handles deep specialist knowledge | Reduces cognitive load by owning complex components | ML/AI team, payment processing, real-time video |

### 5.2 Team Interaction Modes

| Mode | Description | When to Use |
|------|-----------|------------|
| **Collaboration** | Two teams work closely together on a shared goal | Discovery phase; building new capability; high ambiguity |
| **X-as-a-Service** | One team consumes another's service via well-defined API | Mature capability; clear interface; scale |
| **Facilitating** | One team coaches another to build capability | Skill gap; technology adoption; temporary engagement |

### 5.3 Cognitive Load and Team Size

**Brook's Law**: Adding people to a late project makes it later. Communication overhead grows at O(n^2):

```
Team of 5:  10 communication channels  (n(n-1)/2)
Team of 8:  28 communication channels
Team of 12: 66 communication channels
Team of 15: 105 communication channels
```

**Amazon's "two-pizza rule"**: Teams should be small enough to be fed by two pizzas (5-9 people). This aligns with research on optimal team size for knowledge work.

**Dunbar's number** and team scaling:

| Size | Name | Characteristics |
|:---:|------|----------------|
| 5-8 | Team | Tight coordination; mutual awareness; daily interaction |
| 15-25 | Squad/pod | Shared mission; regular coordination; some specialization |
| 50-75 | Tribe/division | Shared strategic direction; coordination through process |
| 150 | Dunbar group | Maximum for personal relationships; beyond this, formal structure required |

---

## 6. Organizational Design Process

### 6.1 When to Redesign

Organizational redesign is warranted when:
- Strategy has changed (new markets, products, or business model)
- Growth has outpaced the current structure (what worked at 50 does not work at 200)
- Performance is declining due to coordination failures
- Key decisions are consistently delayed or poorly made
- Span of control has become unmanageable
- M&A integration requires structural consolidation

### 6.2 Redesign Process

```
PHASE 1: STRATEGIC ASSESSMENT (2-4 weeks)
  - Clarify strategic priorities for the next 2-3 years
  - Identify structural barriers to strategy execution
  - Assess current state (spans, layers, decision-making, coordination)
  - Benchmark against comparable organizations

PHASE 2: DESIGN OPTIONS (2-4 weeks)
  - Develop 2-3 structural options aligned to strategy
  - Evaluate each option against design criteria:
    - Strategic alignment
    - Customer orientation
    - Decision speed
    - Talent development
    - Scalability
    - Coordination cost
  - Select preferred design with leadership team

PHASE 3: DETAILED DESIGN (4-8 weeks)
  - Define reporting relationships
  - Assign people to roles (talent mapping)
  - Design decision rights (RACI/RAPID)
  - Define cross-functional processes and governance
  - Plan for impacted employees (redeployment, severance if needed)
  - Legal review for RIF compliance (if applicable)

PHASE 4: IMPLEMENTATION (4-12 weeks)
  - Communication plan (all-hands, team meetings, 1:1s)
  - Day-1 readiness checklist (systems, access, reporting)
  - Transition support (coaching for new roles, clear escalation paths)
  - 30/60/90 day check-ins with affected teams

PHASE 5: STABILIZATION (3-6 months)
  - Monitor performance metrics post-change
  - Pulse surveys at 30 and 90 days
  - Address emerging issues rapidly
  - Adjust design based on data
```

### 6.3 Decision Rights Frameworks

**RAPID (Bain & Company):**

| Role | Definition | Example |
|------|-----------|---------|
| **R**ecommend | Proposes the decision; does the analysis | Product manager recommends feature priority |
| **A**gree | Must agree for the decision to proceed (veto power) | Legal must agree to any contract terms |
| **P**erform | Executes the decision once made | Engineering implements the feature |
| **I**nput | Provides information and perspective (no veto) | Customer success provides usage data |
| **D**ecide | Makes the final call; single person | VP of Product decides feature priority |

---

## 7. Common Design Pitfalls

| Pitfall | Symptom | Solution |
|---------|---------|---------|
| Restructuring without strategy change | New org chart, same problems | Start with strategy; structure follows |
| Too many layers | Slow decisions; information distortion | Flatten; increase spans where appropriate |
| Unclear decision rights | Decisions stall or get made twice | Implement RAPID/RACI for top 20 decisions |
| Over-rotation on structure | Constant reorganizations disrupt productivity | Design for 2-3 year horizon; avoid annual reorgs |
| Ignoring informal networks | Formal structure breaks informal communication | Map informal networks; preserve critical connections |
| Optimizing for one dimension | Silo optimization at expense of system | Balance functional depth with cross-functional flow |
| Not managing transitions | People lost during restructuring | Invest in change management per Kotter/ADKAR frameworks |

---

## References

- Conway, M. E. (1968). How do committees invent? *Datamation*, 14(4), 28-31.
- Galbraith, J. R. (2014). *Designing Organizations* (3rd ed.). Jossey-Bass.
- Mintzberg, H. (1979). *The Structuring of Organizations*. Prentice Hall.
- Skelton, M., & Pais, M. (2019). *Team Topologies*. IT Revolution Press.
- Worley, C. G., & Lawler, E. E. (2010). Agility and organization design: A diagnostic framework. *Organizational Dynamics*, 39(2), 194-204.

---

**This module governs organizational structure. Structure follows strategy. Design deliberately.**
