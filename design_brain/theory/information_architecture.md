# Information Architecture Theory

> **Classification:** PhD-level theoretical reference
> **Prerequisites:** cognitive_science.md (schema theory, working memory)
> **Related Modules:** interaction_design_theory.md, usability_engineering.md, design_research_methods.md

---

## 1. Information Foraging Theory (Pirolli & Card, 1999)

### 1.1 Theoretical Foundation

Information Foraging Theory (IFT) applies optimal foraging theory from evolutionary biology to human information-seeking behavior. Just as animals optimize food-seeking strategies, humans optimize their strategies for finding information.

**Core Principle:** Users maximize the rate of valuable information gained per unit of effort (time, cognitive cost) expended. Users will follow a path as long as the expected information gain per unit cost exceeds the opportunity cost of switching to an alternative path.

### 1.2 The Patch Model

Information sources are modeled as "patches" (web pages, sections, documents). Users move between patches, spending time within each to extract information.

**Within-Patch Behavior:** Information gained follows a diminishing returns curve (negatively accelerated gain function). Initially, information is extracted rapidly, but the rate decreases as the patch is depleted.

**Between-Patch Decision:** The user leaves a patch when the instantaneous rate of gain within the current patch drops below the average rate of gain achievable by moving to a new patch (the Marginal Value Theorem, Charnov, 1976).

```
Information
Gained
    │           ╱───────────────  (diminishing returns)
    │         ╱
    │       ╱
    │     ╱
    │   ╱
    │ ╱
    │╱
    └──────────────────────────
         Time in Patch
```

**Design Application:**
- Pages should front-load valuable information (high initial gain rate)
- Content that becomes repetitive or low-value should be deferred (progressive disclosure, pagination)
- Navigation paths between patches should be low-cost (fast load times, clear wayfinding)

### 1.3 Information Scent

**Definition:** The perceived likelihood that a path (link, button, menu item) will lead to desired information. Scent is assessed from the proximal cues available at the choice point (link text, surrounding context, thumbnails, descriptions).

**Computational Model:** In SNIF-ACT (Scent-based Navigation and Information Foraging in the ACT-R architecture; Pirolli & Fu, 2003), scent is computed as the semantic similarity between the user's information need (goal) and the cues associated with each link, using spreading activation in a word co-occurrence network.

**High Scent:** Link text closely matches the user's mental representation of their goal. Users click with confidence and low cost.

**Low Scent:** No available link matches the goal representation. Users slow down, explore tentatively, or abandon the site entirely.

**Zero Scent:** Total loss of direction. The user either uses search, backtracks, or leaves.

### 1.4 Scent Design Principles

- **Use trigger words** that match the vocabulary users think in (not internal jargon). Card sorting and search log analysis reveal the user's vocabulary.
- **Provide scent at every node.** No page should leave the user without a clear next step. Dead-ends (pages with no outgoing navigational scent) cause abandonment.
- **Redundant scent:** Multiple paths to the same information increase the probability that at least one path carries sufficient scent for any given user's mental model.
- **Progressive disclosure preserves scent** by revealing content incrementally, maintaining a high gain rate. Overwhelming the user with all content at once flattens the gain curve.

---

## 2. Berry-Picking Model (Bates, 1989)

### 2.1 The Model

Marcia Bates proposed that real-world information seeking is rarely a single-query, single-result process (as the classic IR model assumes). Instead, it is an evolving, iterative process:

1. The user begins with an initial query or browsing strategy
2. Each piece of information encountered modifies the user's understanding of what they need
3. The query evolves as the search progresses
4. Information is gathered incrementally ("berry by berry") from multiple sources
5. The final "answer" is assembled from many fragments

### 2.2 Contrast with Classic IR Model

| Classic IR Model | Berry-Picking Model |
|---|---|
| Single query, single result set | Evolving queries across sessions |
| Static information need | Need changes as information is gathered |
| One source, one retrieval episode | Multiple sources, multiple episodes |
| Batch retrieval | Incremental gathering |

### 2.3 Search Strategies (Bates, 1989)

| Strategy | Description |
|---|---|
| **Footnote chasing** | Following references from a known document |
| **Citation searching** | Finding documents that cite a known source |
| **Journal run** | Browsing through a specific source sequentially |
| **Area scanning** | Browsing a subject-organized space |
| **Subject searching** | Using subject headings or categories |
| **Author searching** | Finding more work by a known author |

### 2.4 Design Application

- **Support query evolution.** Search interfaces should suggest related terms, show facets, and make it easy to refine. Autocomplete and "did you mean" features support evolving queries.
- **Maintain search context.** Breadcrumbs, search history, recently viewed items, and persistent filter states help users track their berry-picking progress.
- **Support non-linear navigation.** Users do not follow a single linear path. Back buttons, tabbed browsing, bookmarking, and comparison views support the multi-source, multi-path nature of real search.
- **Fragment assembly support.** Copy-to-clipboard, save/bookmark, comparison tools, and side-by-side views support the assembly of information from multiple sources.

---

## 3. Faceted Classification (Ranganathan, 1933)

### 3.1 Theory

S. R. Ranganathan developed the Colon Classification, the first fully faceted classification scheme. Unlike hierarchical (enumerative) classification (e.g., Dewey Decimal, which predefines all classes), faceted classification allows items to be described by multiple independent dimensions (facets), and users can combine facets freely.

### 3.2 Facet Analysis

**Ranganathan's Five Fundamental Categories (PMEST):**
- **Personality** -- the primary subject or entity type
- **Matter** -- the material, property, or constituent
- **Energy** -- the process, activity, or operation
- **Space** -- the geographical location
- **Time** -- the temporal period

### 3.3 Faceted Navigation in Digital Design

**Principle:** Each facet represents an independent dimension of classification. Users combine facets to narrow results. The system shows only valid combinations (eliminating empty result sets).

**Key Properties:**
- **Orthogonality:** Facets should be independent dimensions. Correlated facets create redundancy and confusion.
- **Mutual Exclusivity within Facets:** Values within a single facet should be non-overlapping (unless multi-select is supported).
- **Collectively Exhaustive:** Facet values should cover the full range of the dimension.
- **User Vocabulary:** Facet names and values should use the vocabulary users expect, not internal classification terminology.

**Design Application:**
- E-commerce filtering (Size, Color, Price, Brand) is faceted classification
- API documentation browsers (Language, Version, Category)
- Content management systems (Type, Status, Author, Date)
- Search result refinement (any filtering sidebar)

### 3.4 Post-Coordinate vs. Pre-Coordinate

**Pre-Coordinate Classification:** Categories are predefined combinations (e.g., "Red Large Shirts" is a single category). Rigid, does not scale.

**Post-Coordinate Classification:** Users combine facets at query time. Flexible, scalable, supports the berry-picking search model. This is what faceted navigation implements.

---

## 4. Ontology Design for Information Architecture

### 4.1 What is an Ontology in IA?

An ontology is a formal specification of a shared conceptualization (Gruber, 1993). In IA, it defines the concepts (entities), their properties (attributes), and relationships within a domain.

### 4.2 Core Components

| Component | Definition | Example |
|---|---|---|
| **Concepts (Classes)** | Categories of entities | Product, User, Order |
| **Instances** | Specific entities within a class | "MacBook Pro 16-inch" |
| **Properties (Attributes)** | Characteristics of entities | Price, Color, Weight |
| **Relations** | Connections between entities | "belongs-to", "part-of", "created-by" |
| **Axioms** | Formal constraints | "Every Order must have at least one Product" |

### 4.3 Ontological Relationships for Navigation

| Relationship | Description | Navigation Pattern |
|---|---|---|
| **Is-a (Taxonomy)** | Hierarchical classification | Breadcrumb navigation, tree navigation |
| **Part-of (Meronymy)** | Compositional hierarchy | Nested navigation, expand/collapse |
| **Has-a (Possession)** | Attribute association | Detail panels, property sheets |
| **Related-to** | Lateral association | "See also", "Related items" |
| **Sequence** | Temporal or procedural order | Wizards, step indicators, timelines |

### 4.4 Design Application

- The site navigation structure should reflect the domain ontology as understood by users (not as modeled by engineers or the database schema)
- Card sorting reveals the user's implicit ontology
- Discrepancies between the system ontology and the user ontology cause findability failures

---

## 5. Card Sorting Theory and Statistical Analysis

### 5.1 Open vs. Closed Card Sorting

**Open Sort:** Participants group items and name the groups themselves. Reveals the user's mental model of the domain. Used in early IA development.

**Closed Sort:** Participants sort items into pre-defined categories. Tests whether a proposed IA structure matches user expectations. Used for validation.

**Hybrid Sort:** Categories are pre-defined but participants can create new ones. Balances exploration and validation.

### 5.2 Statistical Analysis Methods

#### Similarity Matrix

For each pair of items, compute the proportion of participants who placed them in the same group. This produces a square symmetric matrix where cell (i,j) represents the co-classification frequency of items i and j.

```
         Item A   Item B   Item C   Item D
Item A    1.00     0.85     0.20     0.15
Item B    0.85     1.00     0.25     0.10
Item C    0.20     0.25     1.00     0.90
Item D    0.15     0.10     0.90     1.00
```

Items with high co-classification (e.g., A-B at 0.85, C-D at 0.90) should be grouped together in the IA.

#### Hierarchical Cluster Analysis (Dendrograms)

Agglomerative clustering applied to the similarity matrix reveals the hierarchical grouping structure:

1. Start with each item as its own cluster
2. Merge the two most similar clusters
3. Repeat until a single cluster remains
4. The dendrogram visualizes the merge hierarchy and the similarity level at each merge

**Interpreting the Dendrogram:**
- Items that merge at high similarity (short branches) form natural groups
- Large gaps in the merge sequence indicate natural category boundaries
- The "cut" level determines the number and composition of groups

**Linkage Methods:**
| Method | Behavior | Best For |
|---|---|---|
| **Single linkage** | Chaining (minimum distance) | Detecting elongated clusters |
| **Complete linkage** | Compact clusters (maximum distance) | Tight, well-separated groups |
| **Average linkage (UPGMA)** | Balanced (mean distance) | General purpose |
| **Ward's method** | Minimizes within-cluster variance | Equal-sized, compact clusters |

#### Multidimensional Scaling (MDS)

MDS converts the similarity matrix into a 2D or 3D spatial representation where distance between items corresponds to dissimilarity. Items that were frequently co-classified appear close together.

**Application:** Provides a visual "map" of the information space as perceived by users. Reveals clusters, outliers, and boundary items that don't fit cleanly into any group.

### 5.3 Sample Size

- **Open card sort:** 15-20 participants for stable categories (Tullis & Wood, 2004)
- **Closed card sort:** 30+ participants for statistical confidence
- **Remote/online sorts** can achieve larger samples at lower cost but lose the think-aloud qualitative data

---

## 6. Rosenfeld & Morville's Information Architecture Principles

### 6.1 The IA Components (Polar Bear Book, 1998; 4th ed. 2015)

Rosenfeld, Morville, and Arango define four major systems of IA:

**Organization Systems:** How information is structured and categorized.
- **Exact schemes:** Alphabetical, chronological, geographical (objective, unambiguous)
- **Ambiguous schemes:** Topical, task-oriented, audience-specific, metaphor-driven (require user research to validate)
- **Organizational structures:** Hierarchy (top-down taxonomy), heterarchy (cross-linked, no single root), database (structured metadata), hypertext (associative linking)

**Labeling Systems:** How information is represented. Labels are the "face" of the IA.
- **Textual labels:** Navigation labels, index terms, headings
- **Iconic labels:** Icons representing categories or actions
- **Consistency requirements:** Granularity (level of specificity), comprehensiveness (completeness), tone, audience alignment

**Navigation Systems:** How users move through information.
- **Embedded navigation:** Global (persistent across all pages), local (within a section), contextual (inline links)
- **Supplemental navigation:** Sitemaps, indexes, guides, wizards, breadcrumbs
- **Advanced:** Faceted navigation, adaptive navigation, personalized navigation

**Search Systems:** How users request and receive information.
- **Search interface:** Query input, autocomplete, filters
- **Search engine:** Indexing, ranking, relevance algorithms
- **Search results:** Presentation, metadata, sorting, faceting

### 6.2 The IA Ecology Model

Information architecture exists at the intersection of three domains:

```
         ┌──────────┐
         │  Users   │
         │(needs,   │
         │ tasks,   │
         │ mental   │
         │ models)  │
         └────┬─────┘
              │
    ┌─────────┼─────────┐
    │         │         │
    ▼         ▼         ▼
┌────────┐ USEFUL  ┌────────┐
│Context │◄──────►│Content │
│(biz    │        │(docs,  │
│ goals, │        │ data,  │
│ culture│        │ media, │
│ tech)  │        │ volume)│
└────────┘        └────────┘
```

Effective IA requires research into all three domains and an architecture that balances their constraints.

---

## 7. Findability

### 7.1 Definition (Morville, 2005)

**Findability** is the quality of being locatable and navigable. It operates at two levels:
1. **Object-level findability:** Can a specific item within a system be found?
2. **System-level findability:** Is the system itself discoverable?

### 7.2 Wayfinding Theory (Arthur & Passini, 1992)

Borrowed from environmental design, wayfinding describes how people orient themselves and navigate through spaces. Applied to digital IA:

**Wayfinding Components:**
1. **Orientation:** Where am I? (Answered by: breadcrumbs, page titles, active navigation indicators, URL structure)
2. **Route Decision:** Where can I go from here? (Answered by: navigation menus, related links, CTAs)
3. **Route Monitoring:** Am I on the right path? (Answered by: progress indicators, contextual cues, back-scent)
4. **Destination Recognition:** Have I arrived? (Answered by: page content matching expectation, confirmation messages)

### 7.3 Measuring Findability

**Tree Testing (Reverse Card Sorting):**
Participants are given a task (e.g., "Find where to change your password") and navigate through a text-only tree structure (no page content, no visual design). Measures whether the IA structure itself supports findability, isolated from design quality.

**Metrics:**
- **Success Rate:** % of participants who found the correct location
- **Directness:** % who found it without backtracking
- **Time to Find:** Average time to reach the correct location
- **First Click Accuracy:** % who clicked the correct category first (strong predictor of success; Krug, 2006)

---

## 8. Labeling Theory

### 8.1 The Labeling Problem

Labels are the single most impactful element of findability. A perfectly structured IA is useless if the labels do not match the vocabulary users think in.

### 8.2 Label Sources

| Source | Method | Strength |
|---|---|---|
| **User vocabulary** | Card sorting, interviews, search logs | Highest scent |
| **Controlled vocabulary** | Thesauri, taxonomies | Consistency |
| **SEO keywords** | Keyword research, analytics | Discoverability |
| **Domain terminology** | Subject matter experts | Precision |
| **Competitor analysis** | Competitive IA review | Convention matching |

### 8.3 Common Labeling Failures

| Failure | Example | Problem |
|---|---|---|
| **Internal jargon** | "Provision your workspace" | Users do not know internal terms |
| **Ambiguous labels** | "Resources" (could mean anything) | Low information scent |
| **Inconsistent granularity** | "Blog", "Content Marketing Strategy" | Mixed levels of abstraction |
| **Overlapping labels** | "Help" and "Support" as separate categories | Users cannot predict which to choose |
| **Creative/clever labels** | "The Lab" instead of "Experiments" | Cleverness reduces scent |
| **Missing verbs for tasks** | "Account" instead of "Manage Account" | Task-oriented users need action words |

### 8.4 Label Testing

- **Highlight testing:** Show users a list of labels and a task. Ask which label they would click. Low cost, quick to run, reveals which labels carry the most scent.
- **Cloze testing:** Remove labels and ask users to fill in what they expect. Reveals the user's natural vocabulary.
- **A/B testing label variations:** Measure click-through rates on navigation labels. Directly measures scent in production.

---

## 9. Polyhierarchy and Cross-Linking

### 9.1 The Problem with Pure Hierarchies

Strict hierarchies (each item has exactly one parent) force the architect to make classification choices that may not match all users' mental models. An item that logically belongs in multiple categories becomes unfindable for users who look in the "wrong" category.

### 9.2 Solutions

**Polyhierarchy:** Items can belong to multiple categories. Implemented via tagging, cross-listing, or symbolic links. Increases findability but adds maintenance complexity and can confuse users about "where" something lives.

**Cross-Links:** "See also" or "Related" links between categories provide lateral navigation without duplicating items.

**Search as Equalizer:** When the IA is insufficient, search provides a parallel path that bypasses classification entirely. Strong search with good metadata reduces the cost of IA imperfections.

---

## 10. IA Validation and Iteration

### 10.1 Validation Methods

| Method | Measures | When to Use |
|---|---|---|
| **Open card sort** | User mental models | Before creating IA |
| **Closed card sort** | Fit of proposed IA to user models | After initial IA design |
| **Tree test** | Findability in structure alone | After IA structure is defined |
| **First-click test** | Navigation accuracy | After prototype navigation exists |
| **Search log analysis** | What users actually look for | After launch (ongoing) |
| **Analytics (path analysis)** | How users actually navigate | After launch (ongoing) |

### 10.2 IA Iteration Triggers

- Tree test success rate < 70% for critical tasks
- High search volume for content that should be browsable
- High bounce rates on category/hub pages
- Frequent "wrong first click" in first-click testing
- Support tickets about finding features or content
- User interviews revealing mental model mismatches

---

## References

- Bates, M. J. (1989). The design of browsing and berrypicking techniques for the online search interface. Online Review, 13(5), 407-424.
- Morville, P. (2005). Ambient Findability. O'Reilly Media.
- Pirolli, P., & Card, S. K. (1999). Information foraging. Psychological Review, 106(4), 643-675.
- Ranganathan, S. R. (1933). Colon Classification. Madras Library Association.
- Rosenfeld, L., Morville, P., & Arango, J. (2015). Information Architecture: For the Web and Beyond (4th ed.). O'Reilly Media.
- Tullis, T., & Wood, L. (2004). How many users are enough for a card-sorting study? UPA 2004 Proceedings.
