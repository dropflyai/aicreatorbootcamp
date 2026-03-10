# DevRel Brain — Glossary

## Purpose

This glossary defines the canonical terminology used throughout the DevRel Brain.
All modules, patterns, templates, and evaluations reference these definitions.
When a term is used in any DevRel Brain document, its meaning is exactly as
defined here — no more, no less.

---

## Core DevRel Concepts

### Developer Relations (DevRel)
The organizational function responsible for building and maintaining relationships
between a company and external developers who use its products, APIs, or platforms.
DevRel encompasses developer advocacy, developer experience, technical content,
community management, and developer marketing. It is distinct from traditional
marketing in that its primary currency is technical trust, not brand awareness.

### Developer Experience (DX)
The totality of a developer's interactions with a product, from first discovery
through long-term integration maintenance. DX encompasses documentation quality,
API ergonomics, SDK design, error message clarity, onboarding friction, and tooling
quality. DX is the developer-facing analog of User Experience (UX). Coined in
parallel with UX research but formalized in the API economy era (circa 2012-2015).

### Developer Advocacy
The practice of representing developer interests within an organization while
simultaneously representing the organization's products to developers. Developer
advocates operate at the boundary between engineering and community, translating
developer pain into product improvements and product capabilities into developer
education. Distinct from evangelism in that advocacy is bidirectional.

### Developer Evangelism
The practice of promoting a technology platform to developers through technical
content, talks, and demonstrations. Evangelism is outbound — it flows from the
company to developers. The term has fallen out of favor in some organizations due
to its unidirectional connotation; "advocacy" is now preferred.

### Developer Marketing
Marketing specifically targeting developers as the audience. Developer marketing
differs from traditional marketing in several critical ways: developers are
hostile to hype, respond to working code over promises, trust peer recommendations
over vendor claims, and evaluate products through hands-on trial rather than sales
decks. Effective developer marketing is indistinguishable from education.

---

## Documentation Framework (Divio)

### Divio Documentation Framework
A taxonomy for technical documentation created by Divio, organizing all documentation
into four distinct types based on two axes: practical vs. theoretical and
learning vs. working. The four types are tutorials, how-to guides, reference, and
explanation. Each type has distinct goals, structures, and quality criteria. Mixing
types within a single document is considered an anti-pattern.

### Tutorial
A learning-oriented document that takes the reader through a series of steps to
complete a project. Tutorials teach by doing. They are lessons, not references.
A tutorial's job is to give the learner confidence, not to be comprehensive. The
reader should end with a working result and the understanding of how to achieve it.
Stripe's quickstart guides are canonical examples.

### How-To Guide
A task-oriented document that shows how to solve a specific problem. How-to guides
assume the reader already has basic knowledge and needs to accomplish a specific
goal. "How to paginate results," "How to implement webhooks," "How to retry failed
requests." How-to guides are recipes — they assume you can already cook.

### Reference Documentation
An information-oriented document that describes the machinery — API endpoints,
parameters, return types, error codes. Reference documentation is austere and
comprehensive. It describes; it does not explain or teach. OpenAPI-generated
documentation is the canonical form. Stripe's API reference is the gold standard.

### Explanation (Conceptual Documentation)
An understanding-oriented document that explains why things work the way they do.
Explanations discuss design decisions, architecture choices, trade-offs, and mental
models. They answer "why" questions: Why is this API eventually consistent? Why does
authentication use OAuth 2.0 instead of API keys? Explanations are the rarest and
most valuable documentation type.

---

## DX Metrics

### Time-to-Hello-World (TTHW)
The elapsed time from a developer's first interaction with documentation to their
first successful API call. TTHW is the single most important DX metric. Industry
benchmarks: excellent < 5 minutes, acceptable < 15 minutes, poor > 30 minutes.
Stripe's TTHW is approximately 3 minutes. Measured by timing a developer with no
prior exposure following the quickstart documentation.

### Time-to-First-Value (TTFV)
The elapsed time from a developer's first interaction to achieving a meaningful
outcome beyond "hello world." TTFV differs from TTHW in that it measures when
the developer accomplishes something useful in their specific context — not just
a test call, but an integration that provides actual value.

### Developer Net Promoter Score (dNPS)
NPS specifically targeting developers about their experience with the platform.
Measured via surveys asking "How likely are you to recommend [platform] to a
fellow developer?" Scale: -100 to +100. World-class: > 50. Good: 30-50.
Needs improvement: < 30.

### Cognitive Load
The total amount of mental effort required to use a system. In DX, cognitive load
encompasses understanding API concepts, remembering parameter names, navigating
documentation, debugging errors, and managing authentication. Reducing cognitive
load is the primary objective of DX design. Derived from John Sweller's cognitive
load theory (1988).

### API Ergonomics
The study of how well an API fits the developer's mental model, workflow, and
expectations. Ergonomic APIs have consistent naming conventions, sensible defaults,
predictable behavior, and clear error messages. Poor ergonomics manifest as
frequently-asked questions, common mistakes in Stack Overflow answers, and high
support ticket volume for specific endpoints.

---

## Community Concepts

### Community Lifecycle
The stages through which a developer community evolves: inception, establishment,
maturity, and either renewal or decline. Each stage has distinct characteristics,
challenges, and management strategies. Healthy communities cycle through maturity
and renewal; unhealthy communities stagnate or decline.

### Dunbar's Number
The theoretical cognitive limit to the number of stable social relationships a
person can maintain, proposed by anthropologist Robin Dunbar (1992). Approximately
150 for casual relationships, 50 for closer relationships, 15 for close
confidants, 5 for intimate connections. In community management, Dunbar's number
explains why communities need structure (moderators, sub-groups) once they exceed
roughly 150 active members.

### Community Health Metrics
Quantitative and qualitative measures of a community's vitality. Quantitative:
active members, response time, resolution rate, message volume, retention rate.
Qualitative: sentiment analysis, member satisfaction, sense of belonging, perceived
value. Healthy communities show positive trends in both dimensions.

### Orbit Model
A community engagement framework that categorizes members by their "gravitational
pull" toward the community center. Four orbit levels: Orbit 1 (innermost, most
engaged — maintainers, ambassadors), Orbit 2 (regular contributors), Orbit 3
(occasional participants), Orbit 4 (outermost — lurkers, observers). The goal is
to help members move to inner orbits over time.

### DevRel Qualified Lead (DQL)
A framework created by Mary Thengvall for measuring DevRel's contribution to
business outcomes. A DQL is a developer who, through interaction with DevRel
activities (content, community, events), has demonstrated interest and engagement
that makes them likely to adopt, purchase, or advocate for the product. DQLs are
DevRel's equivalent of Marketing Qualified Leads (MQLs).

### Belonging Theory (Community)
The psychological theory that humans have a fundamental need to belong to groups.
In developer communities, belonging manifests as feeling welcomed, valued, and
recognized. Belonging predicts retention: developers who feel they belong to a
community are 3-5x more likely to remain active participants. Derived from
Baumeister and Leary's "Need to Belong" theory (1995).

---

## Open Source Concepts

### Open Source Governance
The rules, processes, and cultural norms that determine how an open source project
makes decisions, accepts contributions, and resolves conflicts. Governance models
range from benevolent dictator for life (BDFL, e.g., Linus Torvalds for Linux)
to consensus-based (e.g., Apache Software Foundation) to corporate-sponsored
(e.g., React by Meta).

### Contributor Experience (ContribEx)
The developer experience specifically for open source contributors. ContribEx
encompasses: finding good first issues, understanding the contribution workflow,
setting up the development environment, getting code reviewed, and having
contributions merged. Poor ContribEx is the primary reason new contributors
do not return.

### CONTRIBUTING.md
The standard file in open source repositories that explains how to contribute.
A well-written CONTRIBUTING.md reduces maintainer burden by setting expectations
and providing step-by-step instructions. It typically covers: development setup,
coding standards, pull request process, code review expectations, and
communication channels.

### Bus Factor
The minimum number of team members who would need to be lost ("hit by a bus")
before a project stalls. A bus factor of 1 means the project depends entirely on
a single person. Open source governance aims to increase the bus factor through
documentation, knowledge sharing, and distributed maintainership.

---

## Content and Marketing Concepts

### Product-Led Growth (PLG)
A business strategy where the product itself drives acquisition, conversion, and
expansion. In developer contexts, PLG means developers discover the product through
documentation, try it through a free tier or sandbox, and expand usage based on
value delivered. DevRel is the primary enabler of PLG for developer products.

### Bottom-Up Adoption
The adoption pattern where individual developers adopt a tool, prove its value,
and then drive organizational purchasing decisions. Contrasts with top-down
enterprise sales. DevRel specifically optimizes for bottom-up adoption by making
individual developer success as frictionless as possible.

### Call for Proposals (CFP)
The process by which conferences solicit talk submissions. CFPs have specific
formats, evaluation criteria, and deadlines. DevRel teams systematically submit
to CFPs as a key awareness-building channel. Success rate varies: 10-20% for
top-tier conferences, 30-50% for regional events.

### Developer Persona
A semi-fictional representation of a target developer audience, based on research
data. Developer personas include: programming languages, frameworks, experience
level, job role, goals, pain points, information sources, and technology
decision-making authority. Unlike marketing personas, developer personas
emphasize technical context over demographic data.

---

## Technical Standards

### OpenAPI Specification (OAS)
Formerly known as Swagger, the OpenAPI Specification is a standard for describing
RESTful APIs. OAS files (YAML or JSON) define endpoints, parameters, request/
response schemas, authentication methods, and error codes. OAS is the foundation
of automated API documentation generation. Current version: 3.1.

### SDK (Software Development Kit)
A collection of software tools, libraries, documentation, and code samples that
enables developers to build applications for a specific platform. Well-designed
SDKs abstract away HTTP details, handle authentication, manage retries, and
provide idiomatic interfaces for each programming language.

### Sandbox Environment
An isolated environment where developers can test API calls without affecting
production data or incurring charges. Sandboxes are critical for reducing
time-to-hello-world because they eliminate the friction of credential management,
billing setup, and data safety concerns during exploration.

### Interactive Documentation
Documentation that allows developers to make real API calls directly from the
documentation page. Pioneered by Swagger UI and refined by Stripe. Interactive
docs reduce TTHW by eliminating the need to set up a development environment
before making the first API call.

---

## Abbreviations

| Abbreviation | Full Term |
|-------------|-----------|
| API | Application Programming Interface |
| CFP | Call for Proposals |
| CLI | Command-Line Interface |
| CNCF | Cloud Native Computing Foundation |
| ContribEx | Contributor Experience |
| DevRel | Developer Relations |
| dNPS | Developer Net Promoter Score |
| DQL | DevRel Qualified Lead |
| DX | Developer Experience |
| IDE | Integrated Development Environment |
| MQL | Marketing Qualified Lead |
| OAS | OpenAPI Specification |
| OSS | Open Source Software |
| PLG | Product-Led Growth |
| SDK | Software Development Kit |
| TTHW | Time-to-Hello-World |
| TTFV | Time-to-First-Value |
| UX | User Experience |

---

**This glossary is the canonical source of terminology for the DevRel Brain.**
**All modules must use these definitions consistently.**
