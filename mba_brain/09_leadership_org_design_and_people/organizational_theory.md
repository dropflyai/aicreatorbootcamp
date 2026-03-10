# Organizational Theory — Formal Foundations

## What This Enables

**Decisions it helps make:**
- How to design organizational structures
- How to think about centralization vs. decentralization
- How to apply theory to real org design problems

---

## 1. Bounded Rationality and Organizations

*Citation: March, J. G., & Simon, H. A. (1958). Organizations. Wiley.*

### 1.1 Simon's Bounded Rationality

*Citation: Simon, H. A. (1947). Administrative Behavior. Macmillan.*

Decision-makers are "intendedly rational, but only limitedly so":
- Limited information processing capacity
- Incomplete information about alternatives
- Unable to predict all consequences
- Limited time for decision-making

**Implication for organizations:** Organizations exist partly to cope with bounded rationality. They decompose complex problems into manageable sub-problems, assign them to specialized units, and coordinate through structure and communication.

### 1.2 Satisficing

Because of bounded rationality, decision-makers do not optimize — they **satisfice**: search for alternatives until finding one that meets a minimum acceptable threshold, then choose it.

Organizations embed satisficing in routines, budgets, standard operating procedures, and rules of thumb.

---

## 2. Transaction Cost Theory of Organization

*Citation: Williamson, O. E. (1975). Markets and Hierarchies. Free Press.*

Organizations are governance structures chosen to minimize transaction costs (see theory/organizational_economics.md for formal treatment).

**Implications for org design:**
- Activities with high asset specificity should be organized internally (hierarchy)
- Activities with low asset specificity can be outsourced (market)
- Intermediate cases may use hybrid forms (contracts, alliances, JVs)

---

## 3. Mintzberg's Organizational Configurations

*Citation: Mintzberg, H. (1979). The Structuring of Organizations. Prentice Hall.*

### 3.1 Five Parts of the Organization

```
                Strategic Apex
                (Top management)
                      |
               Middle Line
              (Middle managers)
             /       |       \
Support     Techno-    Operating Core
Staff       structure  (Workers doing the
            (Analysts   primary work)
            standardizing)
```

### 3.2 Five Configurations

| Configuration | Key Part | Coordination | Example |
|--------------|----------|-------------|---------|
| Simple Structure | Strategic apex | Direct supervision | Startup, small firm |
| Machine Bureaucracy | Technostructure | Standardization of work | Manufacturing, airlines |
| Professional Bureaucracy | Operating core | Standardization of skills | Hospital, university |
| Divisionalized Form | Middle line | Standardization of outputs | Conglomerate, multi-BU |
| Adhocracy | Support staff | Mutual adjustment | Consulting, R&D lab |

### 3.3 Application to Tech Companies

| Company Stage | Configuration | Logic |
|--------------|--------------|-------|
| Early startup (2-10 people) | Simple Structure | Founder directs everything |
| Growth (10-50) | Adhocracy | Cross-functional teams, mutual adjustment |
| Scaling (50-200) | Moving toward Professional Bureaucracy | Specialists coordinate through expertise |
| Large (200+) | Divisionalized + Adhocracy mix | Product divisions with autonomous teams |

---

## 4. Galbraith's Star Model

*Citation: Galbraith, J. R. (2002). Designing Organizations. Jossey-Bass.*

### 4.1 Five Design Policies

Organizational effectiveness depends on alignment across five dimensions:

```
           Strategy
              |
    People ---+--- Structure
              |
   Rewards ---+--- Processes
```

1. **Strategy:** Determines the direction and criteria for design choices
2. **Structure:** Power distribution, departmentalization, span of control
3. **Processes:** Information and decision flows (vertical and lateral)
4. **Rewards:** Metrics, incentives, and compensation systems
5. **People:** HR policies, skills, mindsets, competencies

**Key insight:** All five must be aligned. Changing structure without changing rewards or processes creates dysfunction.

---

## 5. Matrix vs. Functional vs. Divisional

### 5.1 Organizational Structure Types

**Functional:**

```
CEO
├── Engineering
├── Marketing
├── Sales
├── Finance
└── Operations
```

Pros: Deep specialization, career paths, efficiency within functions.
Cons: Silos, slow cross-functional coordination, diffuse accountability for products.

**Divisional (Product/Business Unit):**

```
CEO
├── Product A (engineering, marketing, sales)
├── Product B (engineering, marketing, sales)
└── Product C (engineering, marketing, sales)
```

Pros: Clear P&L accountability, fast decision-making, product focus.
Cons: Duplication of functions, inconsistent practices, weaker specialists.

**Matrix:**

```
CEO
├── VP Engineering ────── Product A team ────── Product B team
├── VP Marketing  ────── Product A team ────── Product B team
└── VP Sales      ────── Product A team ────── Product B team
```

Pros: Both functional depth and product coordination.
Cons: Dual reporting creates confusion, slower decisions, political conflict.

### 5.2 Choosing a Structure

| Factor | Favors Functional | Favors Divisional |
|--------|------------------|-------------------|
| Product diversity | Low (one product) | High (multiple products) |
| Market diversity | Low (one market) | High (multiple markets) |
| Need for specialization | High | Moderate |
| Need for speed | Lower | Higher |
| Coordination needs | Within functions | Across functions |
| Accountability | Functional excellence | Product/market results |

---

## 6. Span of Control

### 6.1 Theory

**Span of control:** The number of direct reports a manager has.

**Narrow span (3-5):** More layers, more overhead, tighter control. Appropriate for complex, novel work requiring close coordination.

**Wide span (8-15+):** Fewer layers, less overhead, more autonomy. Appropriate for routine, standardized work or experienced teams.

### 6.2 Factors Determining Optimal Span

| Factor | Narrow Span | Wide Span |
|--------|------------|-----------|
| Work complexity | High, non-routine | Low, routine |
| Subordinate skill | Low, inexperienced | High, experienced |
| Geographic dispersion | Spread out | Co-located |
| Interdependence | High between reports | Low between reports |
| Manager's non-supervisory work | Significant | Minimal |

### 6.3 Impact on Organization Height

```
For 1000 employees:
Span of 5:  5 layers (CEO -> VP -> Dir -> Mgr -> Lead -> IC)
Span of 10: 3 layers (CEO -> Dir -> Lead -> IC)
Span of 15: 3 layers (CEO -> Mgr -> IC)
```

Flatter organizations (wider span) are faster, cheaper, and more empowering but require higher-quality managers and more capable individual contributors.

---

## 7. Modern Organizational Models

### 7.1 Spotify Model (Squads, Tribes, Chapters, Guilds)

A matrix-like structure designed for autonomy:
- **Squads:** Cross-functional teams (the basic unit, like a mini-startup)
- **Tribes:** Collections of related squads (up to ~150 people, Dunbar's number)
- **Chapters:** Groups of same-discipline people across squads (e.g., all backend engineers)
- **Guilds:** Communities of interest across the organization

### 7.2 Amazon's Two-Pizza Teams

Small, autonomous teams (6-10 people, can be fed with two pizzas) with end-to-end ownership of a service or product area. Each team operates like a small company with its own metrics and backlog.

---

## Key Citations

- Galbraith, J. R. (2002). *Designing Organizations*. Jossey-Bass.
- March, J. G., & Simon, H. A. (1958). *Organizations*. Wiley.
- Mintzberg, H. (1979). *The Structuring of Organizations*. Prentice Hall.
- Simon, H. A. (1947). *Administrative Behavior*. Macmillan.
- Williamson, O. E. (1975). *Markets and Hierarchies*. Free Press.
