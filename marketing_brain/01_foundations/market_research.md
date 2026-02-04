# Market Research -- Methods, Frameworks, and Market Sizing

## Purpose

This module codifies the discipline of market research -- the systematic
gathering, recording, and analysis of data about customers, competitors, and
markets. No marketing strategy should proceed without adequate research.
Research reduces risk; assumptions amplify it.

---

## Research Hierarchy

All marketing research fits into a hierarchy of evidence:

```
Strongest Evidence
  |
  1. Behavioral data (what people actually DO)
  2. Experimental data (A/B tests, RCTs)
  3. Quantitative surveys (large sample, structured)
  4. Qualitative research (interviews, focus groups)
  5. Secondary research (industry reports, desk research)
  6. Expert opinion (internal stakeholders, advisors)
  7. Assumptions and hypotheses (weakest)
  |
Weakest Evidence
```

**Rule:** Never make a strategic decision at a lower evidence level when a higher
level is available and feasible.

---

## Primary vs. Secondary Research

### Primary Research
Data collected directly for the current research objective.

**Advantages:**
- Tailored to your specific questions
- Current and proprietary
- Can explore nuances competitors miss

**Disadvantages:**
- Time-consuming and expensive
- Requires research design expertise
- Small samples may not generalize

### Secondary Research
Data previously collected for other purposes.

**Advantages:**
- Fast and inexpensive
- Large datasets available
- Good for initial landscape understanding

**Disadvantages:**
- May not address your specific question
- Can be outdated
- Quality varies significantly

**Sources of Secondary Research:**
- Industry reports: Gartner, Forrester, McKinsey, CB Insights, Statista
- Government data: Census Bureau, BLS, SEC filings
- Academic databases: Google Scholar, SSRN, JSTOR
- Competitive intelligence: Crunchbase, SimilarWeb, BuiltWith, SEMrush
- Customer review platforms: G2, Capterra, TrustRadius
- Social listening: Reddit, Twitter/X, Hacker News, industry forums

---

## Qualitative Research Methods

### In-Depth Interviews (IDIs)

**When to use:** Exploring motivations, pain points, decision processes.
Understanding "why" behind behavior.

**Sample size:** 8-15 interviews typically reach thematic saturation (Guest,
Bunce & Johnson, 2006). Continue until no new themes emerge.

**Interview Structure:**
1. Opening (5 min): Rapport, context setting
2. Current state (10 min): Current behavior and solutions
3. Pain points (10 min): Frustrations, unmet needs
4. Ideal state (10 min): What would "great" look like?
5. Evaluation (10 min): Reactions to concepts or solutions
6. Closing (5 min): Anything else, referrals

**JTBD Interview Protocol (Moesta & Christensen):**
- Timeline: Walk backward from the purchase/switch decision
- Push: What was going wrong with the old solution?
- Pull: What was attractive about the new solution?
- Anxiety: What concerns almost prevented the switch?
- Habit: What kept them with the old solution?

**Analysis:**
- Thematic coding: Identify recurring themes across interviews
- Affinity mapping: Group related insights
- Pattern recognition: Look for convergence across respondents
- Negative case analysis: What doesn't fit the pattern?

### Focus Groups

**When to use:** Exploring group dynamics, testing messaging, concept testing.
Warning: Group dynamics can suppress individual opinions (conformity bias).

**Structure:**
- 6-8 participants per group
- 60-90 minutes
- Skilled moderator required
- 3-4 groups for pattern identification

**Best Practices:**
- Mix stimulus types: concepts, mockups, messaging
- Use projective techniques for deeper insights
- Record and transcribe for analysis
- Do not treat as quantitative data

### Ethnographic / Observational Research

**When to use:** Understanding real-world behavior that people cannot articulate.
People often do not do what they say they do.

**Methods:**
- Contextual inquiry: Observe users in their natural environment
- Diary studies: Participants log behavior over time
- Session recordings: Screen recordings of product usage
- Mystery shopping: Evaluate the customer experience firsthand

---

## Quantitative Research Methods

### Surveys

**When to use:** Measuring attitudes, preferences, and behaviors at scale.
Testing hypotheses generated from qualitative research.

**Survey Design Principles:**
1. Start with the decision the survey must inform
2. Work backward to the questions needed
3. Keep surveys under 5 minutes (10 max for incentivized)
4. Use validated scales where possible (Likert, semantic differential)
5. Avoid leading, double-barreled, and loaded questions
6. Pilot test with 10-20 respondents before launch

**Question Type Selection:**

| Objective | Question Type | Example |
|-----------|--------------|---------|
| Measure awareness | Unaided recall | "Name brands in [category]" |
| Test recognition | Aided recall | "Which of these brands do you know?" |
| Gauge preference | Ranking/rating | "Rate your satisfaction 1-10" |
| Understand behavior | Behavioral frequency | "How often do you [action]?" |
| Measure intent | Purchase intent | "How likely are you to buy?" |
| Segment respondents | Demographics/firmographics | "Company size?" |

**Sample Size Calculator (Simplified):**
For 95% confidence, +/- 5% margin of error:
- Population 1,000: Sample 278
- Population 10,000: Sample 370
- Population 100,000: Sample 383
- Population 1,000,000+: Sample 384

### Conjoint Analysis

**When to use:** Understanding how customers value different attributes and
trade-offs. Critical for pricing and feature prioritization.

**Method:** Present respondents with product configurations varying across
attributes. Statistical analysis reveals the relative importance of each
attribute and the utility of each level.

**Output:** Part-worth utilities for each attribute level, enabling:
- Feature prioritization
- Price sensitivity measurement
- Market share simulation
- Optimal product configuration

### A/B Testing

**When to use:** Measuring the causal impact of a specific change.
The gold standard for tactical marketing optimization.

**Requirements:**
- Sufficient sample size (use a statistical power calculator)
- Random assignment to treatment/control
- Single variable changed (or multivariate with sufficient traffic)
- Minimum detectable effect defined upfront
- Statistical significance threshold (typically p < 0.05)

**Common A/B Tests in Marketing:**
- Landing page headlines and CTAs
- Email subject lines and send times
- Ad creative and copy variations
- Pricing page layouts
- Onboarding flows

**Pitfalls:**
- Stopping tests too early (peeking problem)
- Testing too many variables without sufficient traffic
- Ignoring segment-level effects
- Not accounting for novelty effects
- Declaring "no difference" without sufficient power

---

## Market Sizing: TAM, SAM, SOM

### Definitions

**TAM (Total Addressable Market)**
The total market demand for a product or service globally if 100% market share
were achieved. The theoretical maximum.

**SAM (Serviceable Addressable Market)**
The portion of TAM that your business model can serve. Constrained by geography,
segment focus, distribution, and product capabilities.

**SOM (Serviceable Obtainable Market)**
The portion of SAM you can realistically capture in the near term (1-3 years).
Constrained by competition, brand awareness, sales capacity, and go-to-market.

### Top-Down Approach

Start with total market size and narrow:
```
TAM: $50B global project management software market (Gartner)
  |
  |--> SAM: $8B for SMB segment in North America
        |
        |--> SOM: $200M (2.5% market share, realistic for Series B)
```

**Strengths:** Uses validated industry data. Quick.
**Weaknesses:** Can be wildly inaccurate. "We only need 1%" fallacy.

### Bottom-Up Approach

Start with unit economics and build up:
```
Target customers in segment: 150,000 companies
  x Penetration rate (realistic): 3% = 4,500 customers
  x Average contract value: $24,000/year
  = SOM: $108M
```

**Strengths:** Grounded in realistic assumptions. More credible.
**Weaknesses:** Requires good unit economics data. Can underestimate.

### Value Theory Approach

Estimate based on the value delivered:
```
Customer pain point cost: $500,000/year in lost productivity
  x Willingness to pay (10-20% of value): $50,000-$100,000
  x Number of companies with this pain: 50,000
  = TAM: $2.5B - $5B
```

**Best Practice:** Use all three approaches and triangulate. If they diverge
significantly, investigate the assumptions.

---

## Competitive Analysis Framework

### Competitive Intelligence Gathering

**Public Sources:**
- Website analysis (positioning, pricing, features, messaging)
- Job postings (reveals strategic priorities and capabilities)
- SEC filings, press releases, funding announcements
- G2/Capterra reviews (reveals strengths and weaknesses)
- Social media and content (messaging and positioning signals)
- Patent filings (reveals technical direction)

**Analyst Sources:**
- Gartner Magic Quadrant positioning
- Forrester Wave evaluations
- IDC MarketScape assessments

### Competitive Positioning Map

Plot competitors on two axes that matter most to your target segment:

```
                    High [Dimension A]
                         |
         Competitor A    |    YOUR BRAND
              x          |        x
                         |
  Low [Dim B] ----------+----------- High [Dim B]
                         |
         Competitor C    |    Competitor B
              x          |        x
                         |
                    Low [Dimension A]
```

**Dimension Selection:**
Choose dimensions that (a) matter to buyers and (b) differentiate competitors.
Common dimensions: price, ease-of-use, feature depth, speed, support quality,
specialization vs. breadth.

### Win/Loss Analysis

Interview recent buyers and lost deals:
- Why did you choose us / the competitor?
- What was the deciding factor?
- What almost changed your mind?
- How did you evaluate alternatives?
- What could we have done differently?

**Sample:** 10-15 wins and 10-15 losses per quarter for pattern identification.

---

## Customer Segmentation Research

### Segmentation Study Design

1. **Hypothesis generation:** Qualitative interviews (8-12) to identify potential
   segmentation variables
2. **Survey design:** Quantitative survey capturing demographics, psychographics,
   behaviors, needs, and attitudes
3. **Cluster analysis:** Statistical clustering (k-means, latent class) to
   identify natural segments
4. **Segment profiling:** Describe each segment with actionable detail
5. **Validation:** Confirm segments predict behavior (purchase, engagement)

### Segment Viability Criteria (Kotler)

| Criterion | Question | Threshold |
|-----------|----------|-----------|
| Measurable | Can we quantify size and spending? | Yes/No |
| Accessible | Can we reach them through channels? | Yes/No |
| Substantial | Large enough for profitable focus? | Revenue > [threshold] |
| Differentiable | Do they respond differently? | Statistically significant |
| Actionable | Can we design programs for them? | Feasible within resources |

---

## Research Planning Decision Tree

```
START: What do we need to learn?
  |
  +-- How big is the market? --> Market Sizing (TAM/SAM/SOM)
  |
  +-- Who are our customers? --> Segmentation Study
  |
  +-- Why do they buy/not buy? --> JTBD Interviews + Win/Loss
  |
  +-- What do they want? --> Conjoint Analysis + Surveys
  |
  +-- What works better? --> A/B Testing
  |
  +-- Who are competitors? --> Competitive Analysis
  |
  +-- What are they doing/saying? --> Social Listening + Ethnography
```

---

## Research Ethics and Quality

### Principles
1. Informed consent: Participants know how data will be used
2. Anonymity/confidentiality: Protect participant identity
3. No deception: Do not mislead participants about research purpose
4. Right to withdraw: Participants can exit at any time
5. Data security: Protect collected data per GDPR/CCPA

### Quality Checks
- Reliability: Would repeated measurement yield the same result?
- Validity: Are we measuring what we think we are measuring?
- Generalizability: Does the sample represent the population?
- Objectivity: Are researcher biases controlled?

---

## Research Report Structure

Every research deliverable must include:

1. **Executive Summary:** Key findings and implications (1 page)
2. **Methodology:** How data was collected and analyzed
3. **Findings:** Data and analysis, organized by research question
4. **Implications:** What this means for marketing strategy
5. **Recommendations:** Specific actions based on findings
6. **Appendix:** Raw data, survey instruments, interview guides

---

## Key References

| Work | Author | Year | Contribution |
|------|--------|------|-------------|
| Marketing Research | Malhotra | 2019 | Comprehensive methods textbook |
| The Mom Test | Fitzpatrick | 2013 | Customer interview methodology |
| Competing Against Luck | Christensen | 2016 | JTBD research methods |
| Lean Analytics | Croll & Yoskovitz | 2013 | Startup research and metrics |
| Thinking, Fast and Slow | Kahneman | 2011 | Research bias awareness |
| Sprint | Knapp | 2016 | Rapid prototype testing |

---

**Research is investment. Assumption is gambling. Always choose research.**
