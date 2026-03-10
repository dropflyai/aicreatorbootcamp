# Research Brain -- Benchmark Tests (Authoritative)

These scenarios test the Research Brain's ability to handle real-world research challenges.
Each scenario must be worked through completely. Partial answers are failures.

A benchmark is not a quiz. It is a simulation of actual research conditions.
If the Research Brain cannot handle these scenarios rigorously, it cannot handle real work.

---

## HOW TO USE THESE BENCHMARKS

1. Present each scenario to the Research Brain
2. Evaluate the response against the criteria listed
3. Score using ResearchScore.md dimensions
4. A passing response must score >= 4.0 average across applicable dimensions
5. Hard fail on any dimension = scenario failed

---

## SCENARIO 1: Feature Willingness-to-Pay

**Prompt:**
"Product team wants to know if users would pay for a new feature -- an AI-powered report generator. The feature would cost $15/month as an add-on. We have 2 weeks and access to 2,000 active users. Design a complete research plan with timeline."

**Must Include:**
- Mixed-method approach (not survey-only)
- Van Westendorp or Gabor-Granger pricing methodology
- Segmentation by user type (power vs casual)
- Willingness-to-pay vs stated preference distinction
- Behavioral data analysis (current report usage)
- Timeline with milestones
- Sample size justification
- Risk of hypothetical bias acknowledged

**Fail If:**
- Only suggests a survey asking "would you pay $15?"
- Ignores behavioral data
- No pricing methodology
- No segmentation plan
- Timeline is vague

---

## SCENARIO 2: Contradictory Interview Signals

**Prompt:**
"You conducted 8 interviews about a proposed collaboration feature. 4 users love it and would use it daily. 4 users hate it and say it would make them leave the product. The PM wants a clear recommendation. What do you do?"

**Must Include:**
- Refusal to oversimplify into a single recommendation
- Segmentation analysis (what differentiates the two groups?)
- Contextual factors exploration (role, team size, workflow, use case)
- Hypothesis generation for the divergence
- Recommendation for follow-up research with specific method
- Risk assessment for both build and no-build decisions
- Quantitative validation plan to establish segment sizes
- Framework for presenting contradictory findings to stakeholders

**Fail If:**
- Gives a simple yes/no recommendation
- Ignores the 4 negative users
- Does not attempt to explain the divergence
- Recommends building based on majority (4 vs 4 is not a majority)
- Does not propose follow-up research

---

## SCENARIO 3: Competitive White Space Analysis

**Prompt:**
"Competitive analysis shows 3 competitors with nearly identical positioning: all target SMBs, all emphasize 'simplicity,' all price at $29-39/month. Marketing says we need to differentiate. Find the white space."

**Must Include:**
- Multi-method competitive analysis framework
- Analysis beyond marketing messaging (actual product capabilities, user reviews, support quality)
- User research component (what do users actually want that no one provides?)
- Market segmentation (are there underserved segments within SMB?)
- Positioning framework (jobs-to-be-done, value proposition canvas, or similar)
- Identification of at least 3 potential white space opportunities
- Validation plan for each opportunity
- Risk assessment for each positioning option

**Fail If:**
- Only analyzes competitor websites
- Suggests differentiating on "better UX" without evidence
- No user research component
- Identifies white space without validation plan
- Analysis is surface-level (features comparison only)

---

## SCENARIO 4: Rapid Research Under Pressure

**Prompt:**
"The CEO committed to a partnership launch in 10 days. The partner requires us to redesign our onboarding flow. We have zero user research on onboarding. You have 3 days to deliver actionable findings. Go."

**Must Include:**
- Rapid research plan (3-day timeline with hourly breakdown)
- Analytics-first approach (existing data before new collection)
- Guerrilla testing methodology (5-7 quick sessions)
- Heuristic evaluation of current onboarding
- Competitor onboarding teardown (3-5 competitors)
- Preliminary findings shared at 48 hours
- Explicit tradeoffs (what rigor is sacrificed and why)
- Confidence level stated for each finding

**Fail If:**
- Says "3 days is not enough" without providing a plan
- Proposes a 2-week study
- Does not leverage existing analytics
- No preliminary findings checkpoint
- Does not state confidence levels
- Ignores the business constraint

---

## SCENARIO 5: Survey Design Critique

**Prompt:**
"The marketing team designed a customer satisfaction survey. It has 45 questions, uses a mix of 5-point and 7-point Likert scales, starts with demographic questions, includes 3 open-ended questions at the end, and will be sent to all 50,000 users via email. Review and provide feedback."

**Must Include:**
- Identification of all survey design problems (length, scale inconsistency, question order, send strategy)
- Recommended maximum question count with justification
- Proper question ordering (engagement first, demographics last)
- Consistent scale recommendation
- Sampling strategy (not blasting all 50K)
- Response rate estimation and mitigation plan
- Survey fatigue risk assessment
- Revised survey outline

**Fail If:**
- Approves the survey with minor tweaks
- Does not address the 45-question length
- Does not fix the scale inconsistency
- Does not challenge the blast-to-all approach
- No discussion of response rate

---

## SCENARIO 6: Persona Validation

**Prompt:**
"The team has been using 4 personas created 18 months ago by a former researcher. No one knows how they were created. Product decisions reference these personas daily. The head of product asks: 'Are these still valid?' Evaluate and recommend."

**Must Include:**
- Persona audit framework (creation methodology, data sources, update frequency)
- Specific questions to assess validity (market changes, product changes, user base changes)
- Quantitative validation approach (do current users match persona distributions?)
- Qualitative check (5-8 interviews mapped against personas)
- Recommendation framework (validate, update, or rebuild)
- Interim guidance while validation is in progress
- Risk assessment of continuing to use unvalidated personas
- Timeline for validation study

**Fail If:**
- Says "they are probably fine"
- Recommends rebuilding without evaluation first
- No quantitative validation component
- Does not assess creation methodology
- No interim guidance for the team

---

## SCENARIO 7: Ethnographic Study Scoping

**Prompt:**
"We are building a field service management tool. Our users are HVAC technicians who work in customers' homes. We need to understand their workflow. The PM wants you to 'do some research.' Scope the study."

**Must Include:**
- Ethnographic/contextual inquiry methodology
- Field observation plan (ride-alongs, in-situ observation)
- Diary study component for longitudinal data
- Safety and logistics planning for field research
- Participant recruitment strategy for blue-collar workers
- Compensation structure appropriate for lost work time
- Research questions prioritized by business impact
- Deliverable specification (journey maps, workflow models, pain point hierarchy)
- Ethical considerations (privacy in customer homes, employer relationship)

**Fail If:**
- Proposes remote interviews only
- Does not include field observation
- Ignores logistics and safety
- Standard tech-worker recruitment strategy applied to technicians
- No consideration of work-time compensation

---

## SCENARIO 8: A/B Test Design Flaw Detection

**Prompt:**
"Engineering ran an A/B test on the checkout flow. Group A (old flow) had 1,200 users. Group B (new flow) had 300 users. Test ran for 4 days, Monday through Thursday. Group B showed 12% higher conversion. Engineering says 'ship it.' Evaluate."

**Must Include:**
- Identification of all statistical flaws (unequal groups, short duration, no weekend data, likely underpowered)
- Power analysis recommendation
- Duration recommendation (minimum 2 full business cycles)
- Equal group sizing requirement
- Novelty effect warning
- Day-of-week bias explanation
- Recommendation to extend test with specific parameters
- Explanation accessible to non-statisticians

**Fail If:**
- Agrees to ship based on the results
- Only identifies one flaw
- Does not explain why the flaws matter
- No specific recommendation for proper test design
- Uses statistical jargon without explanation

---

## SCENARIO 9: Stakeholder Alignment Conflict

**Prompt:**
"You are planning a usability study for a new dashboard feature. The PM wants to test navigation efficiency. The designer wants to test visual hierarchy. The VP of Product wants to test whether users understand the business metrics. You have budget for 8 sessions. How do you handle this?"

**Must Include:**
- Stakeholder alignment workshop recommendation
- Research question prioritization framework
- Combined protocol that addresses overlapping concerns
- Clear scope boundaries (what will and will not be tested)
- Task design that serves multiple objectives where possible
- Expectation setting on what 8 sessions can and cannot answer
- Post-study debrief plan for all stakeholders
- Follow-up research recommendations for unanswered questions

**Fail If:**
- Tries to test everything in 8 sessions without scoping
- Picks one stakeholder's priority without facilitation
- Does not address the constraint (8 sessions)
- No prioritization framework
- Does not manage expectations

---

## SCENARIO 10: International Research Adaptation

**Prompt:**
"We are expanding to Japan and Brazil. The US research shows strong product-market fit for our project management tool among remote teams. Leadership assumes the same positioning will work internationally. Design research to validate or challenge this assumption."

**Must Include:**
- Cultural research framework (not just translating US methods)
- Local researcher or cultural consultant recommendation
- Method adaptation for each market (interview norms, response bias patterns)
- Hypothesis about cultural differences that could affect fit
- Work culture analysis component (remote work norms in Japan vs Brazil vs US)
- Competitor landscape in each market
- Localization vs adaptation distinction
- Timeline and phasing (sequential or parallel markets)
- Language and translation considerations

**Fail If:**
- Translates the US study and sends it out
- Assumes universal applicability of US findings
- Does not mention cultural adaptation of methods
- No local expertise recommended
- Treats Japan and Brazil as identical "international" markets

---

## SCENARIO 11: Research Repository Strategy

**Prompt:**
"The research team has conducted 200+ studies over 3 years. Insights are scattered across Google Docs, Notion pages, Slack threads, and individual researchers' notes. The new VP of Research asks you to design a research repository strategy. Include taxonomy, tools, and adoption plan."

**Must Include:**
- Repository requirements analysis
- Taxonomy design (by product area, method, audience, date, confidence level)
- Tool evaluation criteria and recommendation
- Migration plan for existing research
- Quality standards for what enters the repository
- Search and discovery design (how people find relevant past research)
- Governance model (who maintains, who adds, quality gates)
- Adoption strategy (training, incentives, integration into workflow)
- Success metrics for the repository

**Fail If:**
- Recommends a tool without requirements analysis
- No taxonomy design
- No migration plan for existing research
- No adoption strategy
- Ignores governance and maintenance

---

## SCENARIO 12: Churn Research Deep Dive

**Prompt:**
"Monthly churn increased from 4% to 7% over the past quarter. No product changes were made. Support tickets are flat. The CEO wants to know why. Design research to diagnose the cause."

**Must Include:**
- Multi-source investigation plan (not just interviewing churned users)
- Quantitative analysis first (cohort analysis, feature usage patterns, timing analysis)
- Churned user interviews with careful recruitment (recent churners, segmented)
- Competitive intelligence (did a competitor launch something?)
- Market analysis (industry changes, economic factors)
- Customer health score review (were there warning signals?)
- Hypothesis tree (systematic elimination of causes)
- Interim recommendations while research is in progress
- Leading indicator identification for future churn prediction

**Fail If:**
- Only proposes interviewing churned users
- Does not analyze quantitative data first
- Ignores external factors (competition, market)
- No hypothesis tree or systematic approach
- No interim recommendations

---

## SCENARIO 13: Research Ethics Dilemma

**Prompt:**
"Your company's main competitor just laid off their entire research team. A recruiter offers to connect you with 3 former competitor researchers who have extensive user research data, competitive insights, and strategic plans. Your CEO is very interested. What do you do?"

**Must Include:**
- Clear ethical framework for the situation
- Distinction between hiring researchers vs acquiring their proprietary data
- Legal considerations (NDAs, trade secrets, non-competes)
- What is acceptable (hiring for their skills, general industry knowledge)
- What is not acceptable (soliciting proprietary research, strategic plans)
- Recommendation for how to proceed ethically
- Clean room methodology if any hiring occurs
- Documentation requirements

**Fail If:**
- Recommends acquiring the competitor data
- Does not raise ethical concerns
- Ignores legal considerations
- Does not distinguish between acceptable and unacceptable information
- No clean room recommendation

---

## SCENARIO 14: Mixed-Method Integration

**Prompt:**
"You have completed: (1) a survey of 500 users about feature satisfaction, (2) 12 in-depth interviews about workflow challenges, and (3) analytics showing feature adoption rates. The survey says 78% are satisfied. The interviews reveal significant workarounds. Analytics show 40% of users never use the core feature. Integrate these findings."

**Must Include:**
- Framework for integrating contradictory mixed-method findings
- Explanation of why satisfaction surveys can mislead (satisfied with workaround, not with product)
- Reconciliation of the 78% satisfaction with 40% non-adoption
- Segment-level analysis (who is satisfied AND adopting vs satisfied but NOT adopting)
- Weighting of evidence types (behavioral data vs stated preference)
- Unified narrative that accounts for all three data sources
- Recommendations that address the real problem (not the survey result)
- Visual framework for presenting the integrated findings

**Fail If:**
- Privileges survey data because N is larger
- Ignores the contradiction
- Does not explain why satisfaction and non-adoption coexist
- Treats each data source independently
- No integrated narrative

---

## SCENARIO 15: Research Democratization

**Prompt:**
"The VP of Product wants to 'democratize research' so every PM can run their own studies. Currently, 2 researchers serve 8 product teams. Design a program that scales research without destroying quality."

**Must Include:**
- Tiered research model (self-serve, assisted, full-service)
- Clear boundaries for each tier (what PMs can do alone vs with support)
- Training curriculum for PM researchers
- Quality gates and review process
- Templates and tools for self-serve research
- Escalation criteria (when to involve a researcher)
- Risk assessment (quality risks, ethical risks, bias risks)
- Measurement plan (how to track quality of democratized research)
- Researcher role evolution (from doer to coach/reviewer)
- Anti-patterns to avoid (research theater, confirmation bias studies)

**Fail If:**
- Lets PMs do whatever they want
- Does not address quality risks
- No training or templates
- No escalation criteria
- Researchers become bottleneck gatekeepers instead of enablers

---

## SCENARIO 16: Longitudinal Study Design

**Prompt:**
"We are launching a major product redesign. Leadership wants to understand the long-term impact on user behavior, not just initial reactions. Design a longitudinal study to track the impact over 6 months."

**Must Include:**
- Longitudinal study design with measurement points
- Baseline measurement plan (before redesign)
- Novelty effect mitigation strategy
- Cohort design (new users vs migrated users)
- Attrition management plan (keeping participants over 6 months)
- Mixed-method approach (quant metrics + qual check-ins)
- Key metrics definition with expected trajectories
- Comparison framework (before/after, cohort vs cohort)
- Interim analysis points with decision criteria
- Resource and budget estimate

**Fail If:**
- Only measures at launch and 6 months (no interim points)
- Does not account for novelty effect
- No baseline measurement
- No attrition management
- Single-method approach

---

## SCORING BENCHMARKS

Each scenario is scored against applicable ResearchScore.md dimensions.

### Passing Threshold
- Average score >= 4.0 across applicable dimensions
- No hard-fail dimension (Methodology, Validity, Ethics) < 3
- Response is complete (all "Must Include" items addressed)

### Benchmark Performance Levels
| Level | Score Range | Meaning |
|-------|-----------|---------|
| Expert | 4.5 - 5.0 | Production-ready research guidance |
| Proficient | 4.0 - 4.4 | Solid with minor gaps |
| Developing | 3.0 - 3.9 | Needs significant improvement |
| Failing | < 3.0 | Cannot be used for real work |

---

## END OF BENCHMARK TESTS
