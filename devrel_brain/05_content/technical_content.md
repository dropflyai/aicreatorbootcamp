# Technical Content — Writing, Code Samples, and Architecture Deep-Dives

## What This Enables

Technical content is the primary mechanism through which developer relations scales
beyond one-to-one interactions. A well-crafted tutorial serves 100,000 developers
at zero marginal cost. A blog post that solves a specific integration challenge
becomes a permanent, search-indexed asset that compounds in value over time. Stripe's
technical blog generates more developer signups than any paid acquisition channel.
Twilio's code samples are the most-copied artifacts in their entire documentation.
This module codifies the standards for technical writing, code sample creation,
tutorial design, case study development, and architecture deep-dives that meet the
quality bar required for developer trust.

---

## The Core Insight

Developers do not read — they scan. The average time-on-page for technical content
is 2-4 minutes, regardless of article length. Developers scan for code blocks first,
headings second, and prose third. This means every technical article must lead with
code, structure content for scanning, and ensure that a developer who reads only the
code blocks and headings can still derive value. The second insight is that technical
content has a half-life: content that references specific library versions, API
endpoints, or configuration parameters decays as the underlying technology changes.
Content maintenance is not optional — it is the cost of keeping a technical content
library from becoming a trust liability.

---

## Technical Writing Standards

### The Inverted Pyramid for Developers

Traditional journalism uses the inverted pyramid: most important information first.
Technical writing for developers follows a modified version:

```
1. What you will build / learn (1 sentence)
2. Working code example (first 300 words)
3. Prerequisites and setup
4. Step-by-step implementation
5. Complete working code (full file)
6. Edge cases, errors, troubleshooting
7. Next steps and related resources
```

The critical rule: the first code block must appear within the first 300 words.
Developers who do not see code within the first screen scroll will leave.

### Voice and Tone

**Use:** Second person ("you"), active voice, present tense.
**Avoid:** First person plural ("we"), passive voice, hedging language.

| Instead of | Write |
|-----------|-------|
| "The configuration file should be modified" | "Modify the configuration file" |
| "We recommend using environment variables" | "Use environment variables" |
| "It might be necessary to restart" | "Restart the server" |
| "The API will return a response" | "The API returns a response" |

**Technical precision rules:**
- Never say "simple" or "easy" — what is simple to the author may not be to the reader
- Never say "just" before an instruction — it trivializes the step
- Always specify versions: "Node.js 18+" not "a recent version of Node"
- Always specify the operating system when commands differ across platforms

### Code Sample Standards

**Rule 1: Every code sample must be complete and runnable.**
A developer must be able to copy the code, paste it into a file, and execute it
without modification. Partial snippets that require the reader to infer imports,
configuration, or context are documentation failures.

**Rule 2: Use realistic data.**
Never use `foo`, `bar`, `acme`, or `test`. Use domain-appropriate data:
- For a payments API: realistic currency amounts, customer names, product descriptions
- For a messaging API: realistic phone numbers (use test ranges), message bodies
- For a data API: realistic but fictional data that mirrors production scenarios

**Rule 3: Handle errors.**
Every code sample must include error handling. Developers will copy code into
production. If the sample ignores errors, the production code will ignore errors.

**Rule 4: Test in CI.**
Extract every code sample from documentation and execute it as part of the CI
pipeline. If a code sample breaks, the documentation build fails. This is
non-negotiable.

**Rule 5: Show the complete file.**
When a tutorial adds code incrementally, show the complete file state after each
step. Developers who join at step 5 must be able to see the full file at step 5.

---

## Content Types

### Tutorials (1,500-3,000 words)

Step-by-step guides to building something specific. The outcome must be visible
and verifiable: a working application, a deployed service, a functioning integration.

**Structure:**
- What you will build (screenshot or demo)
- Prerequisites (specific versions, accounts needed)
- Steps 1-N (each step: explanation, code, verification)
- Complete source code (GitHub link)
- Next steps

**Quality bar:** A developer unfamiliar with the platform can complete the tutorial
in the stated time (always include an estimated duration).

### Blog Posts / Deep Dives (2,000-4,000 words)

Technical explorations of architecture, performance, decisions, or concepts. Must
include original insight — not a restatement of documentation.

**Structure:**
- The problem or question being explored
- Context and constraints
- Technical deep-dive with diagrams, benchmarks, or analysis
- Trade-offs and alternatives considered
- Conclusion and recommendations

**Quality bar:** An experienced engineer learns something they did not already know.

### Case Studies (1,200-2,000 words)

Real-world implementation stories from developers or companies using the platform.
The developer's voice must be preserved — not ghostwritten into corporate messaging.

**Structure:**
- The challenge (in the developer's words)
- Why they chose this platform (specific technical reasons)
- How they implemented the solution (architecture, code, timeline)
- Results (quantitative: performance, cost, time savings)
- Lessons learned

### Architecture Deep-Dives (2,500-5,000 words)

Detailed examinations of system design decisions. These are the highest-value
content pieces because they address Bloom's Taxonomy levels 4-6 (Analyze,
Evaluate, Create) that most documentation ignores.

**Structure:**
- System requirements and constraints
- Architecture overview (diagram required)
- Component-by-component deep-dive
- Scaling considerations
- Failure modes and mitigation
- Evolution over time (how the architecture changed)

---

## Code Sample Repository Management

### Repository Structure

```
/examples
  /quickstart
    /python
    /node
    /go
    /java
  /tutorials
    /build-a-dashboard
    /webhook-handler
    /batch-processing
  /integrations
    /aws-lambda
    /vercel
    /docker
  /patterns
    /error-handling
    /pagination
    /authentication
```

### Version Management

- Pin all dependency versions in examples (never use `latest` or `^`)
- Test examples against every supported SDK version in CI
- Tag example repositories with the corresponding SDK version
- Maintain a compatibility matrix linking examples to SDK versions

### Language Coverage Priority

Prioritize code samples in this order (based on typical API platform demographics):
1. Python (largest developer audience for APIs)
2. JavaScript/TypeScript (web and serverless)
3. Go (infrastructure and cloud-native)
4. Java (enterprise)
5. Ruby, PHP, C# (as community contributions or demand warrants)

---

## Failure Modes

1. **The Stale Tutorial** — Tutorial references deprecated APIs, outdated library
   versions, or removed features. Developers follow the steps, hit errors, and
   conclude the platform is unreliable. Stale content is worse than missing content
   because it wastes developer time and erodes trust.

2. **The Snippet Trap** — Code samples show only the "interesting" part without
   imports, configuration, or error handling. Developers cannot run the code.
   Every unanswered "what are the imports?" question is a content failure.

3. **The Marketing Disguise** — Content is positioned as technical education but
   is actually a product pitch. Developers detect this within 30 seconds and leave.
   Technical content must teach something real regardless of product adoption.

4. **The Expert's Curse** — Content assumes knowledge the target audience does not
   have. The author skips "obvious" steps that are only obvious to someone who
   already knows the answer. Every tutorial must be tested by someone unfamiliar
   with the platform.

5. **The Version Orphan** — Content is published without version pinning. Within
   6 months, dependency updates break the code. Without CI testing, the break goes
   undetected until a developer reports it.

6. **The One-Language Silo** — All examples are in one language, alienating
   developers who work in other languages. At minimum, quickstart examples must
   cover the top 3 languages.

---

## The Operator's Framework

When creating or auditing technical content:

1. **Lead with code** — First code block within 300 words, always
2. **Test everything** — Every code sample extracted and executed in CI
3. **Pin versions** — Explicit dependency versions, tested compatibility matrix
4. **Write for scanners** — Clear headings, short paragraphs, code blocks as anchors
5. **Include complete files** — No partial snippets without full-file context
6. **Maintain relentlessly** — Quarterly content audit, CI-enforced freshness
7. **Measure impact** — Track time-on-page, tutorial completion, code sample adoption

---

## Summary

Technical content is the compound interest of developer relations. Each article,
tutorial, and code sample accrues value over time as it is discovered, shared, and
built upon by developers. The quality bar is uncompromising: every code sample must
run, every tutorial must be completable by the target audience, and every blog post
must teach something a developer did not already know. The maintenance cost is real
and ongoing — stale content is a trust liability, not a neutral asset. The teams
that win at technical content are the ones that treat it as a product with its own
CI pipeline, version management, and quality gates.

---

**This module governs all technical content decisions in the DevRel Brain.**
**Content quality is measured against the standards defined here.**
