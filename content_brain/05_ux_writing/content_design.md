# Content Design — Content-First Design, Structured Content, Content Modeling, Accessibility, Flesch-Kincaid

## Overview

Content design is the discipline of using content as a design material,
shaping information to meet user needs in context. Originated by Sarah
Winters at the UK Government Digital Service (GDS), content design
rejects the notion that content is merely "words that fill wireframes."
Instead, content is a structural element that determines the form,
sequence, and experience of digital products. This module covers
content-first design methodology, structured content modeling, content
accessibility standards, and readability measurement—the foundations
upon which all interface content decisions rest.

---

## Section 1: Content-First Design

### The Content-First Principle

Content-first design inverts the traditional web design process. Instead
of designing layouts and then filling them with content, content
requirements drive the design.

**Traditional Process (Content-Last)**
1. Stakeholders define features
2. Designers create wireframes with placeholder text
3. Writers fill in the wireframes with real content
4. Content does not fit, compromises ensue

**Content-First Process**
1. Research identifies user needs and questions
2. Content strategists define the content required to meet those needs
3. Designers create layouts that serve the content
4. Content and design co-evolve through iteration

### Why Content-First Matters

**Prevents Lorem Ipsum Syndrome**
When designers use placeholder text, they optimize for visual
aesthetics rather than information architecture. Real content has
variable lengths, different reading patterns, and specific hierarchy
requirements that placeholder text cannot simulate.

**Reduces Rework**
GDS found that content-first design reduced revision cycles by 40%
compared to content-last approaches. When content drives layout, the
design accommodates real requirements from the start.

**Improves User Outcomes**
Content-first design forces teams to answer "what does the user need to
know?" before "what does the page look like?"—aligning the design
process with user-centered outcomes.

### Content-First in Practice

**Step 1: Content Priority Guide**
Before any visual design, create a content priority guide for each page
type. This document lists every content element in priority order:

```
Page Type: Product Landing Page
1. Value proposition headline (5-10 words)
2. Benefit-oriented subheading (15-25 words)
3. Primary CTA (2-4 words)
4. Three benefit blocks (heading + 25-word description each)
5. Social proof (customer logos or testimonial)
6. Feature comparison table (3-5 features)
7. Secondary CTA with risk reversal (CTA + 8-12 word reassurance)
8. FAQ section (5-8 questions)
```

**Step 2: Content Prototype**
Create a text-only version of the page that contains all real content
in priority order. This "content prototype" can be tested with users
before any visual design begins.

**Step 3: Design Collaboration**
Designers receive the content prototype and priority guide as their
brief. They design to accommodate the content, not the reverse. Content
and design teams iterate together, adjusting both elements.

---

## Section 2: Structured Content

### What Is Structured Content?

Structured content separates content from presentation. Instead of
storing content as formatted pages (WYSIWYG blobs), structured content
stores content as discrete, typed fields that can be assembled into
different presentations for different channels.

**Unstructured Content**
```html
<div class="recipe">
  <h1>Chocolate Cake</h1>
  <p>Prep time: 20 min. Cook time: 35 min.</p>
  <p>Ingredients: flour, sugar, cocoa...</p>
</div>
```

**Structured Content**
```json
{
  "type": "recipe",
  "title": "Chocolate Cake",
  "prep_time_minutes": 20,
  "cook_time_minutes": 35,
  "ingredients": [
    {"name": "flour", "amount": "2 cups"},
    {"name": "sugar", "amount": "1.5 cups"},
    {"name": "cocoa", "amount": "0.75 cups"}
  ]
}
```

### Benefits of Structured Content

**Omnichannel Delivery**
The same structured content can render as a web page, mobile app screen,
voice assistant response, API response, or email. Content is created
once and delivered everywhere.

**Personalization**
Structured fields enable rule-based content assembly: show different
benefit blocks to different audience segments, surface relevant
testimonials by industry, or adjust reading level by user preference.

**Search and Discoverability**
Structured content maps directly to schema.org markup, improving SEO
rich results. When content is structured, generating JSON-LD for search
engines becomes automated rather than manual.

**Governance and Consistency**
Content types with defined fields enforce consistency. Every product page
has the same fields, every blog post follows the same structure, and
content audits can be automated.

### Content Types and Fields

A content type defines the structure of a category of content. Each
content type has required and optional fields with specified data types.

**Blog Post Content Type**
| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| title | short_text | yes | 50-70 characters |
| slug | url_slug | yes | auto-generated from title |
| author | reference | yes | links to Author type |
| publish_date | datetime | yes | cannot be future |
| category | taxonomy | yes | from defined list |
| excerpt | short_text | yes | 150-160 characters |
| body | rich_text | yes | supports headings, lists, images |
| featured_image | media | yes | min 1200x630px |
| meta_description | short_text | yes | 150-160 characters |
| tags | taxonomy | no | max 5 from defined list |

---

## Section 3: Content Modeling

### The Content Modeling Process

Content modeling is the practice of defining the structure, relationships,
and rules that govern all content in a system. It is the content
equivalent of database schema design.

**Step 1: Content Inventory**
Audit all existing content to identify:
- Content types (how many distinct structures exist?)
- Content relationships (what references what?)
- Content attributes (what metadata is attached?)
- Content volumes (how many items of each type?)

**Step 2: Domain Modeling**
Map the real-world domain into content types:
- Identify entities (people, products, events, locations)
- Define relationships (author writes articles, products belong to
  categories, events occur at locations)
- Determine cardinality (one author to many articles, many-to-many
  for tags)

**Step 3: Field Definition**
For each content type, define:
- Field name (clear, consistent naming convention)
- Field type (text, rich text, number, date, boolean, reference, media)
- Validation rules (required, character limits, format patterns)
- Default values (when applicable)
- Help text (for content editors: "Enter the main keyword for this page")

**Step 4: Governance Rules**
Define workflow and quality rules:
- Who can create, edit, publish, and archive each content type?
- What review steps are required before publication?
- What happens when referenced content is deleted?
- How are translations handled for each field?

### Content Modeling Patterns

**Modular Content Pattern**
Instead of monolithic page types, define small, reusable content blocks
that can be assembled into pages:
- Hero Block (heading, subheading, CTA, background image)
- Feature Block (icon, heading, description)
- Testimonial Block (quote, attribution, company, photo)
- CTA Block (heading, description, button label, button URL)

Pages become ordered lists of blocks, enabling non-technical editors to
assemble pages without developer involvement.

**Variant Pattern**
When content needs to adapt to context (audience, channel, experiment),
model variants as explicit fields:
- headline_default, headline_variant_a, headline_variant_b
- Or use a separate "variant" content type linked to the parent

**Reference Pattern**
Content that appears in multiple contexts should be stored once and
referenced everywhere:
- Author profiles referenced by blog posts and podcasts
- Product data referenced by landing pages and comparison pages
- Testimonials referenced by homepage, product pages, and case studies

---

## Section 4: Content Accessibility

### Web Content Accessibility Guidelines (WCAG) for Content

WCAG 2.2 Level AA is the baseline standard for accessible content. The
Content Brain must ensure all content meets these requirements.

**Perceivable**
- All images have descriptive alt text (not "image.jpg" or "photo")
- Videos have captions and transcripts
- Color is not the only means of conveying information
- Text has sufficient contrast (4.5:1 for normal text, 3:1 for large)

**Operable**
- All interactive elements are keyboard-accessible
- Link text describes the destination (not "click here")
- Content does not require time-limited interaction
- Headings and labels describe topic or purpose

**Understandable**
- Language is identified in HTML (lang attribute)
- Abbreviations are defined on first use
- Reading level is appropriate for the audience
- Forms provide clear labels and error identification

**Robust**
- Content uses semantic HTML (headings, lists, tables with headers)
- Custom components have appropriate ARIA labels
- Content renders correctly in assistive technologies

### Plain Language Principles

Plain language is not "dumbed down" language—it is clear, direct
communication that respects the reader's time.

**Plain Language Rules**
- Use common words ("use" not "utilize," "help" not "facilitate")
- Use short sentences (average 15–20 words per sentence)
- Use active voice ("We will review your application" not "Your
  application will be reviewed")
- Address the reader directly ("you" not "the user")
- Define technical terms on first use
- Use lists for three or more items
- Front-load important information (inverted pyramid)

**Inclusive Language**
- Use gender-neutral language (they/them, "team" not "guys")
- Avoid ableist metaphors ("blind spot," "falling on deaf ears")
- Use people-first language when referring to disabilities
- Respect cultural differences in examples and references
- Test content with diverse user groups

---

## Section 5: Readability Measurement

### Flesch-Kincaid Readability

The Flesch-Kincaid Grade Level formula estimates the US school grade
level required to understand a text:

```
Grade Level = 0.39(total words/total sentences) +
              11.8(total syllables/total words) - 15.59
```

**Interpretation**
| Grade Level | Audience | Example |
|-------------|----------|---------|
| 5–6 | General public, widest reach | USA Today |
| 7–8 | General web content, most B2C | Time Magazine |
| 9–10 | Educated general audience, B2B | The Economist |
| 11–12 | Specialist audience | Academic journals |
| 13+ | Expert audience only | Legal contracts |

**Content Brain Standard**
- General audience content: Grade 8 or lower
- B2B professional content: Grade 10 or lower
- Technical documentation: Grade 12 or lower
- Interface microcopy: Grade 6 or lower

### Flesch Reading Ease Score

A companion metric scored 0–100 (higher = easier to read):

```
Score = 206.835 - 1.015(total words/total sentences) -
        84.6(total syllables/total words)
```

| Score | Difficulty | Audience |
|-------|-----------|----------|
| 90–100 | Very Easy | 5th grade |
| 80–89 | Easy | 6th grade |
| 70–79 | Fairly Easy | 7th grade |
| 60–69 | Standard | 8th-9th grade |
| 50–59 | Fairly Difficult | 10th-12th grade |
| 30–49 | Difficult | College level |
| 0–29 | Very Difficult | Graduate level |

### Beyond Flesch-Kincaid

Readability is more than syllable counts. Supplement Flesch-Kincaid with:

**Gunning Fog Index**
Measures the proportion of complex words (3+ syllables). Useful for
identifying unnecessarily complex vocabulary.

**SMOG Index**
Estimates years of education needed to understand a text. More reliable
than Flesch-Kincaid for health and government content.

**Coleman-Liau Index**
Uses character count instead of syllable count. More suitable for
automated scoring of large text volumes.

**Cognitive Load Assessment**
No formula captures cognitive load from:
- Unfamiliar concepts (even simple words can be confusing in context)
- Dense information (too many facts per paragraph)
- Ambiguous pronouns (what does "it" refer to?)
- Assumed knowledge (jargon, acronyms, cultural references)

Manual review by the Content Brain supplements formula-based scoring.

### Readability Testing Tools

- Hemingway Editor: Real-time grade level with highlighted problem areas
- Readable.com: Multiple readability scores with benchmarking
- Grammarly: Readability score with writing suggestions
- Microsoft Word: Built-in Flesch-Kincaid scoring
- Yoast SEO: Readability analysis for WordPress content
- Custom scripts: Python textstat library for programmatic scoring

---

## Section 6: Content Design Operations

### Design System Integration

Content design must be integrated into the product design system:
- Content patterns documented alongside UI components
- Voice and tone guidelines linked to component usage
- Character limits defined per component field
- Example content provided for every component state
- Content tokens (like "Save" vs "Submit") standardized globally

### Content Design Review Process

Every interface change that modifies user-facing text requires content
design review:
1. Content designer reviews mockup/prototype for text accuracy
2. Microcopy is tested against voice and tone guidelines
3. Readability score is calculated for new content blocks
4. Accessibility review confirms WCAG compliance
5. Localization review confirms translatability

---

## Key References

- Sarah Winters, *Content Design* (Content Design London)
- Rachel McConnell, *Leading Content Design* (Content Design London)
- Carrie Hane and Mike Atherton, *Designing Connected Content* (New Riders)
- W3C Web Content Accessibility Guidelines 2.2
- Federal Plain Language Guidelines (plainlanguage.gov)
- Rudolf Flesch, *How to Write Plain English*
- Nielsen Norman Group: Content design research articles

---

## Summary

Content design treats words as design material with the same rigor
applied to visual elements. Content-first design ensures that
information architecture drives layout, not the reverse. Structured
content separates substance from presentation, enabling omnichannel
delivery and automated governance. Content modeling defines the schema
that makes content manageable at scale. Accessibility standards ensure
content reaches every user regardless of ability. Readability metrics
provide objective measures of comprehension difficulty. Together, these
disciplines transform content from an afterthought into the structural
foundation of digital product design.
