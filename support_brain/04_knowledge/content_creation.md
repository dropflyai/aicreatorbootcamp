# Content Creation — Writing Support Articles, Style Guide, and Readability

## Overview

Support content creation is a specialized discipline that sits at the intersection of
technical writing, user experience, and pedagogy. Well-crafted support articles reduce
customer effort, deflect tickets, and build customer confidence. Poorly written articles
increase frustration, generate tickets, and erode trust. This module covers the
principles and practices for creating clear, accessible, and effective support content
including readability standards (Flesch-Kincaid), step-by-step formatting, screenshot
guidelines, troubleshooting guide construction, decision tree design, and the support
content style guide.

---

## 1. Principles of Support Writing

### The Core Mandate

Support content exists to help a customer accomplish a task or solve a problem with
the minimum possible cognitive effort. Every word, image, and structural element
must serve this purpose.

### Writing Principles

1. **Clarity over cleverness** — Use simple, direct language. Never sacrifice
   comprehension for style. "Click Save" is better than "Commit your changes to
   persistent storage."

2. **Action-oriented** — Tell the customer what to do, not what the system does.
   "Click Export" (action) rather than "The Export button initiates a download"
   (description).

3. **Progressive disclosure** — Lead with the simplest path. Add complexity only
   for users who need it. Use expandable sections, callout boxes, or links to
   advanced topics.

4. **Scannable** — Most readers scan, not read. Use headers, numbered steps,
   bullet points, bold key terms, and visual hierarchy to support scanning.

5. **Complete but concise** — Include everything needed; exclude everything not
   needed. Every sentence must earn its place.

6. **Empathetic** — Acknowledge that the reader may be frustrated. Never blame the
   user. Frame instructions positively.

7. **Testable** — Every procedural article must be testable. Walk through the steps
   yourself before publishing. If you cannot reproduce the result, the article fails.

---

## 2. Readability Standards

### Flesch-Kincaid Readability

The Flesch-Kincaid Grade Level formula estimates the US school grade level required
to understand text:

```
FK Grade Level = 0.39 * (total words / total sentences)
               + 11.8 * (total syllables / total words)
               - 15.59
```

### Target Readability

| Content Type | FK Grade Target | Flesch Reading Ease |
|-------------|----------------|---------------------|
| Customer-facing KB | Grade 6-8 (< 60 FK) | 60-70 (standard) |
| Troubleshooting guides | Grade 6-8 | 60-70 |
| API documentation | Grade 8-10 | 50-60 (fairly difficult) |
| Internal runbooks | Grade 8-10 | 50-60 |
| Executive communications | Grade 6-8 | 60-70 |

### Flesch Reading Ease Scale

```
90-100: Very Easy      (5th grade)     -- Use for critical safety content
80-89:  Easy           (6th grade)     -- Good for consumer products
70-79:  Fairly Easy    (7th grade)     -- Good for general support
60-69:  Standard       (8th-9th grade) -- Target for most support content
50-59:  Fairly Hard    (10th-12th)     -- Acceptable for technical docs
30-49:  Difficult      (college)       -- Too complex for support
0-29:   Very Difficult (professional)  -- Never appropriate for support
```

### Techniques for Improving Readability

| Technique | Example Before | Example After |
|-----------|---------------|--------------|
| Shorter sentences | "In order to ensure that your account is properly configured, you will need to navigate to the settings page where you can find the option to enable two-factor authentication." | "Go to Settings. Turn on two-factor authentication." |
| Simpler words | "Utilize" | "Use" |
| Active voice | "The file was uploaded by the system" | "The system uploaded the file" |
| Remove filler | "It is important to note that..." | (delete entirely, state the point directly) |
| One idea per sentence | "Click Save, which will update your profile and send a confirmation email to your address." | "Click Save. This updates your profile and sends a confirmation email." |
| Replace jargon | "Instantiate a new API client" | "Create a new API connection" |

---

## 3. Article Types and Structures

### How-To Articles

The most common support article type. Teaches the customer to complete a specific task.

```
STRUCTURE:

# How to [Verb] [Object]

## Overview
[1-2 sentences: What you will accomplish]

## Before You Start
- [Prerequisite 1]
- [Prerequisite 2]

## Steps

1. Go to **[Location]**.
   ![Screenshot: Location highlighted](image_url)

2. Click **[Button/Link]**.
   > **Tip:** [Helpful context if needed]

3. Enter **[Information]** in the [Field Name] field.

4. Click **Save**.

## What Happens Next
[Expected result after completing the steps]

## Common Issues
- **[Problem]:** [Quick fix]
- **[Problem]:** [Quick fix]

## Related
- [Link to related article]
```

### Troubleshooting Guides

Structured to diagnose and resolve problems. Follow the Symptom-Cause-Solution pattern.

```
STRUCTURE:

# Troubleshooting: [Symptom Description]

## Symptoms
[What the customer experiences — exact error messages, behaviors]

## Causes
This issue can occur when:
- [Cause 1]
- [Cause 2]
- [Cause 3]

## Solutions

### Solution 1: [Most Common Fix]
[Steps to resolve]

### Solution 2: [Next Most Common Fix]
[Steps to resolve]

### Solution 3: [Less Common Fix]
[Steps to resolve]

## If the Problem Persists
[Escalation path — contact support with specific information]
  Please include:
  - [Info to gather 1]
  - [Info to gather 2]
```

### Conceptual / Explainer Articles

Explain a concept, feature, or system without step-by-step instructions.

```
STRUCTURE:

# Understanding [Concept]

## What is [Concept]?
[Plain-language definition in 2-3 sentences]

## How It Works
[Explanation with diagrams if helpful]

## Key Terms
| Term | Definition |
|------|-----------|
| [Term 1] | [Definition] |
| [Term 2] | [Definition] |

## Examples
[Real-world examples or use cases]

## Common Questions
**Q: [Question]**
A: [Answer]

## Learn More
- [Link: How to set up [Concept]]
- [Link: Best practices for [Concept]]
```

### Reference Articles

Provide specifications, limits, or configuration options.

```
STRUCTURE:

# [Feature] Reference

## Overview
[What this reference covers]

## [Category 1]

| Parameter | Value | Notes |
|-----------|-------|-------|
| [Param]   | [Val] | [Note]|

## [Category 2]
[Similar table or list format]

## Notes
- [Important caveat or exception]

## Related
- [Link to how-to for this feature]
```

---

## 4. Screenshot and Visual Guidelines

### When to Use Screenshots

| Situation | Screenshot? | Reason |
|-----------|------------|--------|
| UI navigation (click X, then Y) | Yes | Reduces ambiguity |
| Form fields | Yes | Shows exact location and labels |
| Expected result/output | Yes | Confirms success |
| Text-only action (type a command) | No | Text instruction is clearer |
| Conceptual explanation | Diagram preferred | Screenshots are too literal |
| Frequently changing UI | Consider omitting | Maintenance cost is high |

### Screenshot Best Practices

1. **Highlight the relevant area** — Use red rectangles or arrows to draw attention
   to the specific element being discussed
2. **Crop tightly** — Show only the relevant portion of the screen. Full-screen
   screenshots are overwhelming and hard to parse.
3. **Use consistent annotation style** — Same color, weight, and arrow style across
   all articles
4. **Add alt text** — Every image must have descriptive alt text for accessibility
5. **Number annotations** — If multiple elements are referenced, number them to
   match step numbers
6. **Avoid personal data** — Use test accounts; never show real customer data
7. **Standard dimensions** — Maintain consistent image width (e.g., 800px max)
   for visual consistency
8. **File format** — PNG for UI screenshots (crisp text), JPEG for photographs

### Diagram Guidelines

Use diagrams for:
- Process flows (how data moves through a system)
- Architecture explanations (how components relate)
- Decision trees (if X, then Y)
- Comparison charts

Tools: Mermaid (for inline diagrams), Figma, Lucidchart, or simple ASCII art for
text-based documentation.

---

## 5. Decision Trees for Support Content

### When to Use Decision Trees

Decision trees are ideal when:
- The resolution depends on multiple variables
- There are more than 3 possible causes for a symptom
- The customer needs to self-diagnose before applying a fix
- The same symptom has different solutions based on context

### Decision Tree Design Principles

1. **Start with the most common path** — Ask the question that splits the most
   volume first
2. **Maximum 5 levels deep** — Beyond 5 decisions, the customer should contact
   support instead
3. **Binary or ternary choices** — Each node should have 2-3 options max
4. **Every path ends** — Every branch must terminate in a resolution or escalation
5. **Include "None of these"** — At every level, offer an escape to human support

### Decision Tree Format (Text-Based)

```
Q: Can you access the login page?
├── YES → Q: What error message do you see?
│         ├── "Invalid password" → [Reset password instructions]
│         ├── "Account locked" → [Unlock account instructions]
│         ├── "SSO error" → [SSO troubleshooting guide]
│         └── Other / No error → [Contact support]
├── NO →  Q: What do you see instead?
│         ├── Blank page → [Clear cache instructions]
│         ├── Error page → [Check status page, then contact support]
│         └── Redirect loop → [Disable browser extensions, try incognito]
└── NOT SURE → [Describe what you see and contact support]
```

---

## 6. Support Content Style Guide

### Voice and Tone

| Attribute | Do | Do Not |
|-----------|------|--------|
| **Friendly** | "Great question! Here is how to..." | "Per our documentation..." |
| **Direct** | "Click Settings." | "You may want to navigate to the settings area." |
| **Confident** | "This resolves the issue." | "This should hopefully fix things." |
| **Empathetic** | "We understand this is frustrating." | "This is a known limitation." |
| **Inclusive** | "Go to your dashboard." | "Any user can access the dashboard." |

### Grammar and Mechanics

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Use second person | "You can export data..." | "Users can export data..." |
| Use active voice | "Click the Save button." | "The Save button should be clicked." |
| Use present tense | "This creates a new project." | "This will create a new project." |
| Sentence case for headers | "How to reset your password" | "How to Reset Your Password" |
| Oxford comma | "email, chat, and phone" | "email, chat and phone" |
| No exclamation marks (in KB) | "Your account is ready." | "Your account is ready!" |
| Bold for UI elements | Click **Save**. | Click Save. or Click "Save". |
| Code font for code | Enter `api_key` in the field. | Enter api_key in the field. |

### Terminology Consistency

Maintain a terminology glossary. Use the same term every time; never alternate
between synonyms for the same concept.

```
TERMINOLOGY STANDARDS:

  Approved Term     | Do Not Use
  ─────────────────────────────────
  Click             | Press, hit, tap (unless mobile)
  Select            | Choose, pick
  Enter             | Type, input
  Go to             | Navigate to, proceed to
  Save              | Submit (unless a form submission)
  Delete            | Remove, destroy, kill
  Sign in           | Log in, login
  Sign out          | Log out, logout
  Dashboard         | Home page, main screen (unless different)
  Settings          | Preferences, options (unless product uses different term)
```

### Callout Box Standards

```
> **Note:** For neutral, supplementary information.

> **Tip:** For helpful but optional advice.

> **Warning:** For actions that could cause data loss or unintended consequences.

> **Important:** For critical information that must not be missed.
```

---

## 7. Content Review Process

### Review Checklist

Before publishing any support article, verify:

```
CONTENT REVIEW CHECKLIST:

  □ Title is action-oriented and specific
  □ Overview clearly states what the article covers
  □ Prerequisites listed (if applicable)
  □ Steps are numbered and specific
  □ Each step starts with an action verb
  □ Screenshots are current and annotated
  □ Alt text on all images
  □ Expected result is described
  □ Troubleshooting section included (for how-to articles)
  □ Related articles linked
  □ Metadata complete (category, tags, product version)
  □ Flesch-Kincaid grade level < 8
  □ No jargon without definition
  □ No internal-only information
  □ No customer PII in screenshots
  □ Tested: Steps produce the described result
  □ Spell-check and grammar review complete
  □ Style guide compliance verified
```

### Peer Review Process

```
AUTHOR writes article and self-reviews against checklist
  │
  ▼
PEER REVIEWER (another agent) reviews for:
  - Accuracy (can they follow the steps successfully?)
  - Clarity (would a new customer understand?)
  - Completeness (are all edge cases addressed?)
  │
  ▼
KB MANAGER/PUBLISHER reviews for:
  - Style guide compliance
  - IA placement (correct category/section)
  - SEO (title, metadata, searchability)
  - Cross-linking
  │
  ▼
PUBLISH
```

---

## 8. Measuring Content Effectiveness

### Per-Article Metrics

| Metric | What It Tells You | Target |
|--------|------------------|--------|
| **Views** | Demand for this topic | Trend analysis |
| **Helpfulness rate** | "Was this helpful?" positive % | >70% |
| **Bounce rate** | % who leave after viewing (no further action) | <50% (for troubleshooting) |
| **Contact rate after view** | % who create a ticket after viewing this article | <20% |
| **Time on page** | Reading engagement | 1-3 min (how-to), 3-5 min (conceptual) |
| **Search click-through** | % of search results that lead to this article | >30% |

### Content Improvement Loop

```
MONTHLY CONTENT REVIEW:

1. IDENTIFY underperformers:
   - Helpfulness < 50%
   - Contact rate after view > 30%
   - High views + low helpfulness (high-impact fix)

2. DIAGNOSE the problem:
   - Read customer feedback comments
   - Review ticket data for the topic
   - Test the article steps yourself

3. FIX the article:
   - Rewrite unclear sections
   - Add missing steps or troubleshooting
   - Update screenshots
   - Simplify language

4. MEASURE improvement:
   - Track helpfulness change post-update
   - Track contact rate change
   - Compare before/after metrics
```

### Aggregate Content Metrics

| Metric | Definition | Target |
|--------|-----------|--------|
| **KB deflection rate** | Self-service resolutions / total potential tickets | >40% |
| **KB coverage** | % of ticket categories with corresponding KB article | >80% |
| **Average helpfulness** | Mean helpfulness rating across all articles | >70% |
| **Freshness** | % of articles updated within 90 days | >70% |
| **Search success rate** | % of searches leading to article click | >70% |

---

## References

1. Strunk, W., & White, E. B. (2000). "The Elements of Style."
2. Krug, S. (2014). "Don't Make Me Think, Revisited." New Riders.
3. Redish, J. (2012). "Letting Go of the Words." Morgan Kaufmann.
4. Nielsen Norman Group (2022). "Writing for the Web."
5. Consortium for Service Innovation (2020). "KCS v6 Practices Guide."
6. Flesch, R. (1948). "A New Readability Yardstick." Journal of Applied Psychology.
7. Google Developer Documentation Style Guide (2024).

---

**This document is authoritative for content creation within the Support Brain.**
