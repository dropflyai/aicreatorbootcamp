# Reading and Cognition — F-Pattern, Cognitive Load, Readability, Plain Language

## Overview

Understanding how humans read digital content is fundamental to writing
effective content. This module covers the cognitive science of reading
behavior, scanning patterns, cognitive load theory, readability science,
and plain language principles. Content that ignores how people actually
read is content that fails.

---

## How People Read Online

### The Brutal Truth: They Don't

Jakob Nielsen's landmark eye-tracking research at Nielsen Norman Group
established that users read only 20-28% of words on a typical web page.
The average page visit lasts 10-20 seconds. Users scan, they do not read.
Source: Nielsen, J. (2008). "How Little Do Users Read?" NN/g.

**Implications for content:**
- Front-load critical information (inverted pyramid)
- Use scannable structure (headers, bullets, bold keywords)
- Earn deep reading through compelling hooks
- Assume every sentence might be the last one read

### The F-Pattern

Eye-tracking studies reveal a consistent "F" shape in reading behavior:

```
████████████████████████████  <- First horizontal sweep (headline area)
████████████████████████████
█████████████████             <- Second horizontal sweep (shorter)
█████████████████
████                          <- Vertical scan down left side
████
████
████
████
```

**First sweep:** Users read the full first line or headline.
**Second sweep:** Users read a shorter portion of the next content block.
**Vertical scan:** Users scan down the left margin, reading first words
of paragraphs and bullet points.

Source: Nielsen, J. (2006). "F-Shaped Pattern for Reading Web Content." NN/g.

**Content implications:**
1. Put the most important words at the beginning of headlines
2. Start paragraphs and bullet points with information-carrying words
3. Use the first two paragraphs to deliver maximum value
4. Left-align content (do not center body text)

### The Layer Cake Pattern

Discovered in NN/g's 2020 research update: users scan headings and
subheadings as horizontal "layers" in the content, creating a pattern
resembling a layer cake when viewed in eye-tracking heat maps.

**Content implications:**
- Headings must be descriptive, not clever (users scan them for meaning)
- Every H2/H3 should communicate the section's key point
- "What You Need to Know" is worse than "SEO Increases Traffic 3x"
- Headings are the article's scannable table of contents

### The Spotted Pattern

Users fixate on specific elements that stand out from surrounding text:
- Bold text
- Links (especially blue underlined text)
- Numbers and statistics
- Bulleted lists
- Images with captions
- Pull quotes

**Content implications:**
- Bold the key phrase in each paragraph
- Use numbers: "3 ways" beats "several ways"
- Bullet lists break up wall-of-text density
- Captions are among the most-read elements on any page

---

## Cognitive Load Theory

### Definition

Cognitive load theory, developed by John Sweller (1988), describes the
mental effort required to process information. Working memory can hold
approximately 4 chunks of information simultaneously (Cowan, 2001).
Content that exceeds cognitive capacity is abandoned.

### Three Types of Cognitive Load

**Intrinsic Load**
The inherent complexity of the information itself. Complex topics have
high intrinsic load. Content cannot eliminate intrinsic load but can
manage it through scaffolding and sequencing.
- Technique: Break complex topics into progressive levels
- Technique: Define terms before using them
- Technique: Use analogies to connect new concepts to known ones

**Extraneous Load**
The unnecessary cognitive effort created by poor presentation. This is
what content design eliminates.
- Long paragraphs without visual breaks = high extraneous load
- Inconsistent formatting = high extraneous load
- Jargon without explanation = high extraneous load
- Confusing navigation = high extraneous load

**Germane Load**
The productive mental effort that builds understanding. Good content
maximizes germane load by helping readers construct mental models.
- Examples that illustrate concepts = germane load
- Analogies that connect new to known = germane load
- Practice exercises and self-checks = germane load

### Cognitive Load Reduction Techniques

| Technique | How It Works | Example |
|-----------|-------------|---------|
| Chunking | Group related info into digestible units | 3-4 sentence paragraphs max |
| Signposting | Tell readers what's coming and where they are | "Next, we'll cover three types of..." |
| Progressive disclosure | Reveal complexity gradually | Expandable sections, "learn more" links |
| Dual coding | Combine text with visuals | Diagrams alongside explanations |
| Worked examples | Show the process, not just the result | Step-by-step walkthroughs |
| Redundancy elimination | Remove duplicate information | One explanation, not three paraphrased |
| Familiar structures | Use known patterns | Numbered lists, FAQ format, comparison tables |

---

## Readability Science

### Measuring Readability

**Flesch-Kincaid Grade Level**
The most widely used readability metric. Calculates the US school grade
level needed to understand the text. Based on sentence length and
syllable count per word.

Target scores by content type:
| Content Type | Target Grade Level |
|-------------|-------------------|
| Marketing copy | Grade 6-8 |
| Blog posts | Grade 7-9 |
| Technical docs | Grade 8-10 |
| Legal/regulatory | Grade 10-12 (unavoidable) |
| UX microcopy | Grade 4-6 |

**Flesch Reading Ease**
Scale from 0 (extremely difficult) to 100 (extremely easy).
- 90-100: Grade 5 (very easy)
- 80-89: Grade 6 (easy)
- 70-79: Grade 7 (fairly easy)
- 60-69: Grade 8-9 (standard)
- 50-59: Grade 10-12 (fairly difficult)
- 30-49: College level
- 0-29: Graduate level

Target: 60-70 for most content. Ogilvy insisted on a Flesch score above
80 for advertising copy. Source: *Ogilvy on Advertising*.

**Gunning Fog Index**
Estimates years of formal education needed. Based on sentence length and
percentage of complex words (3+ syllables). Target: 8-10 for most content.

### What Makes Text Readable

**Short sentences**: Average 15-20 words per sentence. Mix short (5-8)
with medium (15-20). Occasional long sentences (25+) are fine if preceded
and followed by short ones.

**Short paragraphs**: 2-4 sentences per paragraph for digital content.
Single-sentence paragraphs are powerful for emphasis. NN/g research shows
users skip paragraphs longer than 5 lines on screen.

**Common words**: Use the shortest, most common word that conveys the
meaning. "Use" not "utilize." "Help" not "facilitate." "Buy" not
"procure." "Start" not "commence."

**Active voice**: "The team shipped the feature" (active) vs. "The feature
was shipped by the team" (passive). Active voice is shorter, clearer,
and more engaging. Target: 80%+ active voice.

**Concrete nouns**: "Dog" not "animal." "Email" not "communication."
"Revenue" not "financial performance." Specificity aids comprehension.

**Familiar sentence structures**: Subject-verb-object. Avoid nested
clauses, double negatives, and inverted structures.

---

## Plain Language Principles

### Definition

Plain language is communication that the intended audience can understand
the first time they read it. Not dumbed-down language — appropriately
complex language for the audience.
Source: plainlanguage.gov, Federal Plain Language Guidelines.

### The Seven Principles

**1. Write for your audience**
Know who reads this, what they know, and what they need. A developer
audience allows technical terms. A consumer audience does not.

**2. Organize for the reader's needs**
Put the most important information first. Use the reader's questions
as your outline structure. Answer "what do I do?" before "why."

**3. Use "you" and active voice**
Address the reader directly. "You can export your data" not "Data
export functionality is available to users."

**4. Use short sentences and paragraphs**
One idea per sentence. One topic per paragraph. Break long sentences
at natural pause points.

**5. Use common, everyday words**
Avoid jargon unless the audience expects it. Define technical terms
on first use. Never use a long word when a short one works.

**6. Use lists and tables**
When presenting 3+ parallel items, use a list. When comparing attributes,
use a table. Lists reduce cognitive load by 50% compared to inline text.
Source: Redish, J. *Letting Go of the Words* (2012).

**7. Use meaningful headings**
Headings are not decoration — they are navigation. Every heading should
communicate the section's main point. Question headings ("How do I export
data?") are highly effective for help content.

### Plain Language Transformation Examples

**Before (bureaucratic):**
"It is incumbent upon the user to ensure that all requisite fields within
the registration form have been populated with valid data prior to the
submission of said form for processing."

**After (plain language):**
"Fill in all required fields before you submit the form."

**Before (marketing jargon):**
"Our best-in-class, enterprise-grade solution leverages cutting-edge
AI-driven insights to deliver transformative outcomes."

**After (plain language):**
"Our software uses AI to find patterns in your data that help you make
better decisions."

**Before (tech jargon for non-tech audience):**
"The API rate limits are enforced at the account level with a sliding
window algorithm using a token bucket implementation."

**After (plain language):**
"You can make up to 100 requests per minute. If you hit the limit, wait
60 seconds and try again."

---

## The Inverted Pyramid

Journalism's most fundamental content structure, developed for newspaper
readers who might stop reading at any point:

```
    ████████████████████████████████
    ██  MOST IMPORTANT (who, what)  ██
    ████████████████████████████████
       ██████████████████████████
       ██  IMPORTANT DETAILS    ██
       ██████████████████████████
          ████████████████████
          ██  BACKGROUND      ██
          ████████████████████
             ██████████████
             ██  EXTRAS   ██
             ██████████████
```

Source: Columbia Journalism School methodology.

Application beyond journalism:
- Email opens: Put the action item in the first sentence
- Landing pages: Value proposition above the fold
- Help docs: Answer the question first, explain why second
- Slack messages: TL;DR first, details below

---

## Content Formatting for Scanning

### The Scanning Toolkit

| Element | When to Use | Impact |
|---------|------------|--------|
| H2 headings | Every new major section | Scannable outline |
| H3 headings | Sub-topics within sections | Granular navigation |
| Bold text | Key terms, critical info | Spotted pattern fixation |
| Bullet lists | 3+ parallel items | 50% faster comprehension |
| Numbered lists | Sequential steps or rankings | Clear ordering |
| Tables | Comparisons, specifications | Dense info made scannable |
| Pull quotes | Key insights, statistics | Visual anchors |
| Short paragraphs | Always (2-4 sentences) | Reduce abandonment |
| White space | Between all sections | Reduce cognitive load |

### Formatting Anti-Patterns

| Anti-Pattern | Problem | Fix |
|-------------|---------|-----|
| Wall of text | Zero scannability, immediate bounce | Add headers, break paragraphs |
| Bold everything | Nothing stands out when everything does | Bold only key phrases |
| Header-less sections | No entry points for scanners | H2 every 200-300 words |
| Center-aligned body | Breaks F-pattern, harder to read | Left-align all body text |
| All caps | Slower reading, perceived as shouting | Use title case or sentence case |
| Tiny font | Increases strain, reduces engagement | Minimum 16px body text |
| Low contrast | Accessibility failure, readability loss | WCAG AA 4.5:1 contrast ratio |

---

## Cognitive Biases in Content Consumption

| Bias | Definition | Content Implication |
|------|-----------|-------------------|
| Anchoring | First piece of info disproportionately influences | Lead with your strongest point |
| Serial position | First and last items remembered best | Put key info at start and end |
| Confirmation | Seek info that confirms existing beliefs | Acknowledge existing views first |
| Bandwagon | Follow what others are doing | Social proof early in content |
| Framing | Presentation shapes interpretation | "95% uptime" vs "5% downtime" |
| Availability | Recent/vivid examples seem more common | Use specific, memorable examples |

---

**Write for how people actually read. Not how you wish they would.**
