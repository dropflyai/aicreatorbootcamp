# Experimentation Operations — Velocity, Backlog, Documentation, Feature Flagging, Review Process

## Overview

Experimentation operations is the organizational infrastructure that
enables a growth team to run experiments at high velocity with
consistent quality. The difference between growth teams that run 2
experiments per month and those that run 20 is not talent or budget—it
is operational excellence. This module covers experiment velocity
optimization, backlog management, documentation standards, feature
flagging infrastructure, review processes, and the organizational
learning systems that compound experiment insights over time.

---

## Section 1: Experiment Velocity

### Why Velocity Matters

Experiment velocity—the number of experiments shipped per unit time—is
the single strongest predictor of growth team performance. At Microsoft,
Booking.com, and Netflix, the correlation between experiment velocity
and business outcomes is well-documented.

**The Velocity Equation:**
```
Growth Impact = Experiment Velocity x Win Rate x Average Effect Size
```

Since win rate (typically 10–30%) and average effect size are relatively
fixed, the primary lever is velocity. A team that runs 100 experiments
per quarter at a 15% win rate and 5% average uplift will dramatically
outperform a team running 10 experiments at the same rates.

### Measuring Velocity

| Metric | Definition | Target |
|--------|-----------|--------|
| Experiments launched/month | New experiments started | 8–15 for established teams |
| Experiments concluded/month | Experiments with valid results | 6–12 |
| Time from idea to launch | Days from hypothesis to live experiment | < 10 business days |
| Time from launch to decision | Days from live to shipped or killed | < 21 days |
| Total cycle time | Idea to conclusion | < 30 days |

### Velocity Bottleneck Analysis

Common bottlenecks and their solutions:

**Bottleneck: Design**
Experiments wait in a design queue because designers are shared.
Solution: Create a component library of pre-approved experiment
elements. Train growth engineers to implement simple design changes.

**Bottleneck: Engineering**
Development takes longer than expected for each experiment.
Solution: Build a reusable experiment framework (templates, components,
standard tracking). Invest in feature flagging infrastructure.

**Bottleneck: QA**
Testing delays every experiment launch.
Solution: Automated testing for experiment variants. Staged rollouts
(launch to 5% first, expand if no issues detected).

**Bottleneck: Analysis**
Results sit unanalyzed because the analyst is overloaded.
Solution: Build automated reporting dashboards. Pre-define analysis
scripts for standard experiment types. Self-serve analysis tools.

**Bottleneck: Decision-Making**
Experiments linger because no one makes the ship/kill decision.
Solution: Scheduled weekly experiment review meeting with decision
authority. Pre-defined success criteria that enable automated decisions.

---

## Section 2: Experiment Backlog Management

### The Experiment Backlog

The experiment backlog is the prioritized list of all experiment ideas,
from rough concepts to fully specified experiments ready for
implementation.

### Backlog Pipeline Stages

```
IDEA → HYPOTHESIS → SPECIFIED → PRIORITIZED → QUEUED → LIVE → ANALYSIS → DECISION
```

**Idea Pool**
Raw experiment ideas from any source. No quality filter—capture
everything. Sources: data analysis, user research, team brainstorms,
competitor analysis, customer feedback, industry trends.

**Hypothesis Stage**
Ideas refined into structured hypotheses with the IF/FOR/THEN/BECAUSE
format. Includes estimated impact, confidence, and ease scores.

**Specified Stage**
Full experiment specification document completed: hypothesis, metrics,
sample size, duration, implementation details, success criteria.

**Prioritized Stage**
Scored using ICE or PIE framework. Stack-ranked against other ready
experiments. Reviewed by growth lead for strategic alignment.

**Queued Stage**
Approved for the next sprint. Implementation work assigned to specific
engineers and designers.

**Live Stage**
Experiment is running and collecting data. Monitored for guardrail
violations and technical issues.

**Analysis Stage**
Experiment has reached its predetermined sample size or duration.
Results are being calculated and interpreted.

**Decision Stage**
Results are reviewed, a decision is made (ship, iterate, or kill),
and learnings are documented.

### Backlog Health Metrics

| Metric | Target | Why |
|--------|--------|-----|
| Ideas in pipeline | 50+ | Ensures velocity is not limited by idea flow |
| Specified experiments ready | 10+ | Prevents engineering idle time |
| Average age of idea | < 90 days | Prevents stale ideas from blocking fresh ones |
| Backlog review frequency | Weekly | Keeps priorities current |

### Backlog Grooming

Weekly 30-minute session to:
- Add new ideas from the past week
- Promote ideas to hypothesis stage (or kill them)
- Re-score priorities based on new data
- Identify blocked experiments and resolve blockers
- Retire experiments that are no longer relevant

---

## Section 3: Experiment Documentation

### The Experiment Repository

Every experiment must be documented in a central, searchable repository.
This repository is the growth team's institutional memory—without it,
the team re-runs failed experiments and forgets winning strategies.

### Pre-Experiment Documentation

```
EXPERIMENT ID: [E-YYYY-MM-NNN]
EXPERIMENT NAME: [Descriptive name]
DATE CREATED: [Date]
OWNER: [Name]
STATUS: [Idea/Hypothesis/Specified/Live/Concluded]

HYPOTHESIS:
IF [specific change]
FOR [audience]
THEN [metric] will [direction] by [amount]
BECAUSE [mechanism]

METRICS:
Primary: [Metric name, current baseline, MDE]
Secondary: [Metric 1, Metric 2]
Guardrails: [Metric 1, threshold]

DESIGN:
Variants: [Description of each variant]
Traffic split: [% allocation]
Target segment: [User segment]
Estimated sample size: [Per variant]
Estimated duration: [Days]

IMPLEMENTATION:
Engineering effort: [Hours/days]
Design effort: [Hours/days]
Dependencies: [Other teams, features, data]
Feature flag: [Flag name]
Tracking events: [Event names and properties]
```

### Post-Experiment Documentation

```
RESULTS:
Start date: [Date]
End date: [Date]
Sample size achieved: [Per variant]

PRIMARY METRIC:
Control: [Value] ± [CI]
Treatment: [Value] ± [CI]
Relative lift: [%]
Statistical significance: [p-value or posterior probability]
Practical significance: [Business impact assessment]

SECONDARY METRICS:
[Metric 1]: Control [X] vs Treatment [Y], [significance]
[Metric 2]: Control [X] vs Treatment [Y], [significance]

GUARDRAIL METRICS:
[Metric 1]: [Status: within threshold / breached]

DECISION: [Ship / Iterate / Kill]
REASONING: [Why this decision was made]

LEARNINGS:
1. [What did we learn about user behavior?]
2. [What does this suggest for future experiments?]
3. [How does this update our understanding of [area]?]

FOLLOW-UP:
- [Next experiment inspired by these results]
- [Product changes triggered by findings]
- [Hypotheses to update based on learnings]
```

---

## Section 4: Feature Flagging Infrastructure

### Why Feature Flags Are Essential

Feature flags (also called feature toggles) allow experiments to be
deployed, activated, deactivated, and targeted without code deploys.
They are the operational backbone of high-velocity experimentation.

### Feature Flag Types

**Release Flags**
Control whether a feature is visible to users. Used for gradual
rollouts and kill switches.
- Duration: Temporary (remove after full rollout)
- Management: Engineering team

**Experiment Flags**
Control which variant of an experiment a user sees. Integrated with
the experimentation platform for traffic splitting and measurement.
- Duration: Temporary (remove after experiment concludes)
- Management: Growth team

**Permission Flags**
Control feature access by user segment, plan, or account.
- Duration: Permanent (part of product packaging)
- Management: Product team

**Operational Flags**
Control system behavior (circuit breakers, feature degradation).
- Duration: Permanent
- Management: Engineering/SRE team

### Feature Flag Best Practices

**Naming Convention**
Use a consistent naming scheme:
```
[type]_[area]_[description]_[date]
exp_pricing_annual_default_2025_01
rel_dashboard_new_charts_2025_02
```

**Flag Lifecycle Management**
Temporary flags (release and experiment) must have:
- Owner: Person responsible for cleanup
- Expiry date: When the flag should be removed
- Cleanup task: Tracked in the engineering backlog

**Stale flag debt** accumulates rapidly. A flag that remains in code
for 6+ months after its purpose is served creates technical debt,
testing complexity, and code comprehension overhead. Clean up flags
within 2 weeks of experiment conclusion.

### Feature Flagging Tools

| Tool | Strengths | Best For |
|------|-----------|---------|
| LaunchDarkly | Most mature, enterprise-grade | Large teams, complex targeting |
| Statsig | Integrated experimentation + flags | Growth teams wanting all-in-one |
| Optimizely Feature Experimentation | Combined feature flags + A/B testing | Teams using Optimizely |
| Split.io | Developer-focused, fast SDK | Engineering-led teams |
| Flagsmith | Open source, self-hosted option | Privacy-conscious or budget teams |
| Unleash | Open source, simple | Small teams, early stage |
| Custom (in-house) | Full control, no vendor cost | Teams with specific requirements |

---

## Section 5: Experiment Review Process

### Weekly Experiment Review

**Duration:** 45–60 minutes
**Attendees:** Growth PM, growth engineers, data analyst, design
**Frequency:** Weekly (non-negotiable)

**Agenda:**
1. **Active experiments status** (10 min)
   - Any technical issues or guardrail violations?
   - Are experiments on track for target sample size?

2. **Experiments ready for decision** (20 min)
   - Present results for concluded experiments
   - Discuss statistical and practical significance
   - Make ship/iterate/kill decisions
   - Document learnings

3. **Experiment backlog review** (15 min)
   - Score new experiment ideas
   - Prioritize next sprint's experiments
   - Assign owners and estimate timelines

4. **Velocity check** (5 min)
   - How many experiments launched this week?
   - How many concluded?
   - Are we on track for monthly velocity target?

### Decision Framework

**Ship** when:
- Primary metric improved with statistical significance
- Effect size is practically meaningful (not just statistically
  significant)
- No guardrail metrics were breached
- The change does not create technical debt

**Iterate** when:
- Directional improvement but not statistically significant
- Guardrail metric breach that could be fixed with modification
- Unexpected secondary effects worth investigating

**Kill** when:
- No improvement or negative primary metric result
- Guardrail metric breach that cannot be mitigated
- Implementation complexity exceeds the potential benefit
- The learning is clear even without a positive result

---

## Section 6: Organizational Learning

### The Learning Loop

```
EXPERIMENT → RESULT → LEARNING → UPDATED MODEL → BETTER HYPOTHESIS → EXPERIMENT
```

### Building a Learning Culture

**Celebrate Learnings, Not Just Wins**
If only winning experiments are celebrated, the team will avoid
ambitious hypotheses and favor safe, small-impact experiments.
Celebrate the quality of the hypothesis and the clarity of the
learning, regardless of whether the result was positive.

**Monthly Learning Review**
Beyond weekly operational reviews, hold a monthly 60-minute session:
- What are the top 3 learnings from this month's experiments?
- How do these learnings update our mental model of user behavior?
- What new hypotheses do these learnings generate?
- Are there themes across experiments that suggest a bigger opportunity?

**Knowledge Base**
Maintain a searchable experiment archive that enables:
- "Have we tested this before?" searches (prevents re-running)
- Pattern recognition across experiments (meta-learning)
- Onboarding new team members with experiment history
- Cross-functional sharing (product, marketing, sales)

---

## Key References

- Ron Kohavi, *Trustworthy Online Controlled Experiments* (Cambridge)
- Stefan Thomke, *Experimentation Works* (Harvard Business Review)
- Booking.com engineering blog: Experimentation at scale
- Netflix technology blog: A/B testing methodology
- LaunchDarkly: Feature management documentation
- Reforge: Growth experimentation curriculum

---

## Summary

Experimentation operations transforms ad-hoc testing into a systematic
growth engine. Velocity—the number of well-designed experiments shipped
per month—is the primary lever for growth team performance. Backlog
management ensures a steady pipeline of prioritized, specified
experiments. Documentation preserves institutional knowledge and
prevents redundant work. Feature flagging infrastructure enables rapid
deployment and clean experiment management. Weekly review processes
enforce disciplined decision-making. Organizational learning systems
compound insights across experiments, making each subsequent hypothesis
sharper and each experiment more impactful than the last.
