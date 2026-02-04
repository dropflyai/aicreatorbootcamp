# Open Source — Strategy, Governance, and Maintainer Practices

## What This Enables

Open source is the most powerful trust-building mechanism in developer relations.
When a company open-sources its tools, SDKs, or core infrastructure, it makes an
irrevocable commitment to transparency that no marketing campaign can replicate.
Linux, Kubernetes, React, and TensorFlow dominate their categories not because
of superior marketing but because open source created ecosystems of contribution,
trust, and shared ownership. This module codifies open source strategy, licensing
decisions, contribution frameworks, maintainer practices, and governance models
that transform an open source project from a code dump into a thriving ecosystem.

---

## The Core Insight

Open source is not "publishing code on GitHub." Open source is a social contract
between maintainers and contributors. The code is the artifact; the contract is
the product. When companies open-source a project without investing in the
social contract — contribution guidelines, responsive maintainers, clear
governance, welcoming culture — they create abandonment-ware that damages
their reputation. The decision to open-source is a commitment to maintain a
bilateral relationship with every developer who depends on that code.

---

## Open Source Strategy

### When to Open Source

**Open source when:**
- The project benefits from community contributions (more use cases than your
  team can anticipate)
- Transparency is a competitive advantage (security tools, infrastructure)
- You want the project to become an industry standard
- Adoption velocity matters more than proprietary control
- The project is not a core revenue differentiator

**Do not open source when:**
- The project contains proprietary algorithms that constitute a competitive moat
- You cannot commit engineering resources to maintain it (minimum 0.5 FTE)
- The project requires access to internal systems that cannot be replicated
- You plan to relicense or change terms later (trust destruction)

### The Open Core Model

The dominant commercial open source model separates an open core from proprietary
extensions:

```
Open Core (Apache 2.0 / MIT)           Proprietary Extensions (Paid)
--- Core runtime                        --- Enterprise SSO/SAML
--- Standard APIs                       --- Advanced analytics
--- CLI tools                           --- Multi-tenancy
--- Basic documentation                 --- SLA and support
--- Community plugins                   --- Managed cloud service
```

**Boundary rule:** The open core must be genuinely useful on its own. If the open
source version is crippled to force upgrades, developers will recognize the
bait-and-switch and distrust the project. Redis, Elasticsearch, and MongoDB all
faced community backlash when they changed licensing.

### Strategic Models

**Developer Tool Strategy (Stripe CLI, Vercel CLI):** Open source developer-facing
tools to maximize adoption and contribution. Tools are the funnel; the platform
is the revenue engine.

**SDK Strategy (AWS SDK, Google Cloud Client Libraries):** Open source all SDKs
to enable community auditing, contribution, and trust. Closed-source SDKs are
a DevRel anti-pattern.

**Infrastructure Strategy (Kubernetes, Terraform):** Open source the infrastructure
layer to create an ecosystem. Revenue comes from managed services or enterprise
support.

**Framework Strategy (React, Angular, Next.js):** Open source the framework to
create platform adoption. Revenue comes from the platform the framework deploys to.

---

## Licensing

### License Selection Framework

| License | Permissions | Restrictions | Use When |
|---------|------------|-------------|----------|
| MIT | Use, modify, distribute, sublicense | Must include copyright notice | Maximum adoption, minimum friction |
| Apache 2.0 | Same as MIT + patent grant | Must include copyright + NOTICE file | Need patent protection, enterprise adoption |
| BSD 2-Clause | Use, modify, distribute | Must include copyright notice | Academic or research-origin projects |
| MPL 2.0 | File-level copyleft | Modified files must remain open | Want contributions back without full copyleft |
| LGPL 3.0 | Library copyleft | Linking allowed, modifications must be open | Libraries that should remain open |
| GPL 3.0 | Strong copyleft | All derivative works must be GPL | Want all derivatives to remain open |
| AGPL 3.0 | Network copyleft | SaaS use triggers copyleft | Prevent cloud providers from free-riding |
| BSL 1.1 | Source-available, time-delayed open | Commercial use restricted until change date | Protect against cloud provider competition |

### Recommended Default: Apache 2.0

Apache 2.0 is the optimal license for developer tools, SDKs, and platform projects:
- Grants an explicit patent license (MIT does not)
- Approved by OSI, Apache Foundation, and CNCF
- Compatible with most other open source licenses
- Enterprises consume it without legal review friction
- NOTICE file requirement ensures attribution

### License Compatibility

Permissive licenses can be combined into copyleft projects, but copyleft licenses
cannot be combined into permissive projects. License selection is a one-way door
for projects that accept external contributions.

---

## Contribution Guidelines

### The CONTRIBUTING.md Standard

**Required Sections:**
1. **Code of Conduct** — Link to Contributor Covenant or equivalent
2. **Getting Started** — Development environment setup (reproducible in < 30 min)
3. **Issue Taxonomy** — bug, feature, enhancement, documentation, good-first-issue
4. **Pull Request Process** — Branch naming, commit format, review requirements, CI
5. **Code Standards** — Style guides, linting rules, testing requirements
6. **Communication Channels** — Where to ask questions, discuss proposals
7. **Release Process** — Versioning scheme, changelog management

### The "Good First Issue" Pipeline

Maintain 10-20 open good-first-issues at all times:
- Self-contained (does not require understanding the entire codebase)
- Well-specified (expected behavior is clear)
- Low risk (cannot break production if implemented incorrectly)
- Mentored (a maintainer is assigned to guide the contributor)
- Respond to contributor questions within 24 hours
- Review good-first-issue PRs within 48 hours

### CLA vs DCO

| Mechanism | Friction | Legal Protection | Recommendation |
|-----------|----------|-----------------|----------------|
| CLA (Contributor License Agreement) | High (legal doc, employer approval) | Strong | Only when required by legal or acquisition strategy |
| DCO (Developer Certificate of Origin) | Low (sign-off in commit message) | Moderate | Default for community projects |

CLAs reduce contribution rates by 20-40% due to friction. Use DCO unless legally
compelled otherwise.

---

## Maintainer Practices

### Avoiding Maintainer Burnout

Maintainer burnout is the leading cause of open source project death. The pattern:
project gains popularity, volume outpaces capacity, maintainers feel obligated but
overwhelmed, quality drops, maintainers stop responding.

**Mitigation Strategies:**
- **Set boundaries:** Define office hours for community interaction
- **Distribute authority:** Graduate consistent contributors to maintainer status
- **Automate ruthlessly:** Bots for stale issues, CI enforcement, release automation
- **Triage mercilessly:** Not every feature request deserves implementation
- **Rotate responsibilities:** On-call maintainer rotation

### Release Management (SemVer)

All open source projects must follow Semantic Versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes (requires migration guide)
- MINOR: New features, backward-compatible
- PATCH: Bug fixes, backward-compatible

**Changelog Requirements:** Group changes by Added, Changed, Deprecated, Removed,
Fixed, Security. Credit contributors by GitHub username. Link to relevant PRs.

---

## Foundation Governance Models

### CNCF (Cloud Native Computing Foundation)

Project tiers (Sandbox, Incubating, Graduated) with increasing governance at each
tier. Graduation requires: 3+ production adopters, healthy contributor base,
completed security audit, documented governance. Examples: Kubernetes, Prometheus,
Envoy.

### Apache Software Foundation

Meritocratic governance with formal voting. "Community over code" philosophy. All
projects must be community-driven, not corporate-controlled. Earned authority through
contribution. Examples: Kafka, Spark, Airflow.

### Linux Foundation

Umbrella organization with project-specific governance. More permissive of corporate
involvement than Apache. Examples: Linux kernel, Node.js, GraphQL.

---

## Failure Modes

1. **The Code Dump** — Company publishes internal code on GitHub with no documentation,
   no contribution guidelines, and no maintainer commitment. The repository accumulates
   issues with no response. This is not open source; it is abandonware with a license.

2. **The Relicense Rug-Pull** — Company changes license from permissive to restrictive
   after building a community. Contributors feel betrayed. Forks emerge (Valkey,
   OpenSearch, OpenTofu). Trust is permanently destroyed.

3. **The Corporate Capture** — Project is nominally community-governed but all
   maintainers work for one company. The company controls the roadmap and rejects
   community PRs that do not align with business goals.

4. **The CLA Wall** — Contribution requires a complex legal agreement that individual
   developers and small companies cannot navigate. Contribution rate drops to near
   zero from non-employees.

5. **The Unmaintained Dependency** — Project is widely adopted but maintainers have
   moved on. Security vulnerabilities go unpatched. The Log4Shell vulnerability in
   Log4j exemplified this failure mode at catastrophic scale.

6. **The Vanity Project** — Company open-sources for PR with no intention of accepting
   contributions. Issues are ignored, PRs rejected. The project is a portfolio piece
   rather than a community asset.

---

## The Operator's Framework

When designing or evaluating an open source strategy:

1. **Determine the strategic intent** — adoption, standardization, trust-building,
   or ecosystem creation
2. **Select the license** with full understanding of contribution, commercial, and
   compatibility implications
3. **Staff the project** with at least 0.5 FTE of dedicated maintainer time
4. **Write the social contract** (CONTRIBUTING.md, CODE_OF_CONDUCT.md, GOVERNANCE.md)
   before publishing the first release
5. **Instrument the funnel** — stars, forks, clones, issues, PRs, contributors,
   contributor retention
6. **Plan for governance evolution** — projects that outgrow one company should be
   donated to a foundation
7. **Never relicense** without community consent

---

## Summary

Open source strategy is a long-term commitment to a bilateral social contract
with the developer community. The code is the artifact; the governance,
contribution experience, and maintainer responsiveness are the product. License
selection is a one-way door that determines contribution dynamics, commercial
viability, and ecosystem compatibility for the life of the project. Successful
open source programs invest in maintainer health, contributor onboarding, and
governance transparency as rigorously as they invest in code quality. The metric
that matters is not GitHub stars but contributor retention: how many developers
contribute a second time.

---

**This module governs all open source decisions in the DevRel Brain.**
**Open source health is measured against the contribution and governance standards defined here.**
