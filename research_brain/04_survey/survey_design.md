# Survey Design

Comprehensive guide to designing rigorous, unbiased, and effective survey instruments for market research, user research, and customer feedback.

---

## 1. Question Types

### 1.1 Likert Scales

The most widely used scale in social science and market research. Respondents indicate agreement with a statement on a symmetric agree-disagree scale.

**Standard 5-point Likert:** Strongly Disagree, Disagree, Neither Agree nor Disagree, Agree, Strongly Agree.

**7-point Likert:** Adds granularity (adds "Somewhat Disagree" and "Somewhat Agree"). Research shows 7-point scales produce slightly higher reliability and better discrimination without increasing cognitive burden (Finstad, 2010).

**Design decisions:**
- **Number of points:** 5-point for simplicity, 7-point for research rigor. Avoid 4-point (forced choice removes valid neutral responses) unless measuring satisfaction where neutrality is unacceptable.
- **Labeling:** Label all points (fully anchored) rather than just endpoints. Fully anchored scales produce more reliable data (Krosnick & Presser, 2010).
- **Bipolar vs unipolar:** Bipolar (dissatisfied to satisfied) is standard. Unipolar (not at all satisfied to extremely satisfied) is clearer for intensity measures.

### 1.2 Semantic Differential

Respondents rate a concept on a scale between two bipolar adjectives. Developed by Osgood (1957) to measure connotative meaning. Useful for brand perception and product positioning.

**Example:**
```
Modern  [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  Traditional
Simple  [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  Complex
Premium [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  Budget
```

**Analysis:** Creates perceptual maps by plotting mean scores across dimensions. Compare your brand vs competitors across the same dimensions.

### 1.3 Net Promoter Score (NPS)

"How likely are you to recommend [product/company] to a friend or colleague?" 0-10 scale.

**Scoring:** Promoters (9-10), Passives (7-8), Detractors (0-6). NPS = %Promoters - %Detractors. Range: -100 to +100.

**Strengths:** Simple, benchmarkable, widely understood, predictive of growth (Reichheld, 2003).
**Criticisms:** Single item is low reliability. 11-point scale is arbitrary. Cultural variation in response styles. Recommendation intent does not equal recommendation behavior. Over-used as the sole metric.

**Best practice:** Use NPS as one metric among many. Always pair with open-ended follow-up ("What is the primary reason for your score?") to understand the driver.

### 1.4 Ranking Questions

Respondents rank items from most to least preferred, important, or likely.

**Best for:** Forcing prioritization when all items might otherwise be rated equally.
**Limit:** Maximum 5-7 items. Beyond that, ranking becomes cognitively exhausting and unreliable.
**Analysis:** Mean rank per item, Kendall's W for inter-respondent agreement.

### 1.5 MaxDiff (Best-Worst Scaling)

Respondents see sets of items (typically 4-5 at a time) and select the "most important" and "least important" from each set. Repeated across many sets, this produces a robust preference ranking using logit modeling.

**Advantages over ranking:** Less cognitive burden (evaluate 4-5 items at a time, not all at once), interval-scale data (not just ordinal), forces trade-offs, resistant to response style bias.

**Design:** Each item should appear an equal number of times across sets. Typical: 12-20 items, 8-15 choice sets per respondent. Use Balanced Incomplete Block Design (BIBD) or computer-generated optimal designs.

### 1.6 Conjoint Analysis Questions

Respondents evaluate product profiles defined by multiple attributes and levels. Reveals the relative importance of each attribute and the part-worth utility of each level.

**Types:**
- **Choice-Based Conjoint (CBC):** Respondents choose among 3-5 profiles per task. Most common and closest to real decision-making.
- **Adaptive Conjoint (ACA):** Personalizes tasks based on earlier responses. Good for many attributes.
- **Menu-Based Conjoint:** Respondents build their own product from a menu. Good for bundling research.

**Design requirements:** 4-8 attributes, 2-5 levels per attribute, 10-20 choice tasks per respondent. Requires specialized software (Sawtooth, Conjointly, XLSTAT).

---

## 2. Question Wording

### 2.1 Avoiding Leading Questions

A leading question suggests the desired answer through wording, framing, or context.

**Leading:** "How much do you love our new feature?"
**Neutral:** "How would you rate the new feature?"

**Leading:** "Don't you agree that faster load times are important?"
**Neutral:** "How important are load times to you?"

### 2.2 Avoiding Double-Barreled Questions

A double-barreled question asks about two things simultaneously, making it impossible to interpret the answer.

**Double-barreled:** "How satisfied are you with the speed and reliability of the product?"
**Split:** Q1: "How satisfied are you with the speed of the product?" Q2: "How satisfied are you with the reliability of the product?"

### 2.3 Avoiding Loaded Questions

A loaded question contains emotionally charged language or embedded assumptions.

**Loaded:** "How do you feel about the excessive cost of premium plans?"
**Neutral:** "How do you feel about the pricing of premium plans?"

### 2.4 Avoiding Ambiguous Terms

Define terms that respondents may interpret differently. "Frequently," "recently," "significant," and "satisfaction" mean different things to different people.

**Ambiguous:** "Do you frequently use the reporting feature?"
**Specific:** "In the past 7 days, how many times have you used the reporting feature?" [0, 1-2, 3-5, 6-10, 11+]

### 2.5 Wording Best Practices

- Use simple, concrete language. Write at 6th-8th grade reading level.
- Keep questions under 20 words when possible.
- Ask about one concept per question.
- Use the respondent's language, not internal jargon.
- Specify time frames ("In the past 30 days" not "recently").
- Use consistent terminology throughout the survey.
- Avoid negatives and especially double negatives.
- Pilot test every question with 5-10 respondents from the target audience.

---

## 3. Response Scales

### 3.1 Scale Design Principles

**Mutual exclusivity:** Categories must not overlap. "1-5, 5-10" is wrong; "1-5, 6-10" is correct.
**Exhaustiveness:** Categories must cover all possible responses. Always include "Other" for categorical questions and "N/A" or "Don't know" when applicable.
**Symmetry:** Equal number of positive and negative options. "Very bad, Bad, Neutral, Good, Very good" is symmetric.
**Granularity:** Match scale granularity to the construct being measured. Satisfaction warrants 5-7 points; binary attitudes need yes/no.

### 3.2 Midpoint Debate

Including a midpoint (neutral option) allows genuine ambivalence. Removing it forces a direction. Research generally supports including midpoints as removing them does not improve data quality and may frustrate genuinely neutral respondents. Exception: when neutrality is not a valid response (e.g., "Did you complete the task? Yes/No").

### 3.3 Common Scale Formats

| Construct | Recommended Scale | Points |
|-----------|------------------|--------|
| Agreement | Strongly Disagree to Strongly Agree | 5 or 7 |
| Satisfaction | Very Dissatisfied to Very Satisfied | 5 or 7 |
| Importance | Not at All Important to Extremely Important | 5 |
| Frequency | Never to Always (or specific counts) | 5 |
| Likelihood | Extremely Unlikely to Extremely Likely | 5 or 7 |
| Effort | Very Easy to Very Difficult | 5 or 7 |

---

## 4. Survey Flow and Logic

### 4.1 Survey Structure

**Introduction:** Purpose, estimated time, confidentiality statement, incentive mention (if applicable).
**Screening questions:** Determine eligibility. Terminate ineligible respondents with a thank-you message.
**Warm-up questions:** Easy, non-threatening questions to build engagement.
**Core questions:** The substantive research questions. Group by topic with clear section headers.
**Sensitive questions:** Place later in the survey after rapport is established.
**Demographics:** Collect at the end (unless needed for screening). Demographics at the start can prime identity and affect subsequent responses.
**Closing:** Thank you, expected use of data, contact for questions.

### 4.2 Skip Logic and Branching

Skip logic routes respondents to different questions based on their answers. This keeps surveys relevant and short.

**Best practices:**
- Test all logic paths thoroughly before launch.
- Ensure every path has a valid completion.
- Do not create paths that skip essential questions.
- Document the logic visually with a flowchart.
- Avoid more than 3 levels of branching (complexity breeds bugs).

### 4.3 Randomization

**Question randomization:** Randomize the order of questions within a section to control for primacy and recency effects.
**Response option randomization:** Randomize the order of response options for multiple-choice questions (except scales, which must maintain order).
**Version randomization:** For experiments (e.g., testing different question wordings), randomly assign respondents to versions.

### 4.4 Piping

Insert prior answers into subsequent questions for personalization.

**Example:** Q1: "Which product do you use most? [A, B, C]" Q2: "How satisfied are you with [piped: Q1 answer]?"

---

## 5. Pilot Testing

### 5.1 Why Pilot Test

Every survey must be pilot tested before full launch. Pilot testing reveals ambiguous questions, broken logic, confusing response options, excessive length, and technical issues. No amount of expert review replaces testing with actual respondents.

### 5.2 Pilot Testing Protocol

**Phase 1 - Cognitive interviews (n=5-8):** Walk through the survey with participants one-on-one. Ask them to think aloud as they complete each question. Probe: "What does this question mean to you?" "How did you arrive at your answer?"

**Phase 2 - Soft launch (n=20-50):** Deploy the survey to a small sample. Analyze completion rates, drop-off points, time per page, response distributions (ceiling/floor effects), and open-ended response quality.

**Phase 3 - Revise and launch:** Fix issues identified in phases 1-2. If changes are substantial, conduct another soft launch.

---

## 6. Survey Platforms

### 6.1 Platform Comparison

| Platform | Best For | Strengths | Limitations |
|----------|----------|-----------|-------------|
| Qualtrics | Complex research | Advanced logic, conjoint, panels | Expensive, steep learning curve |
| Typeform | User experience | Beautiful UI, high completion rates | Limited analysis, expensive |
| SurveyMonkey | Quick surveys | Easy, affordable, templates | Basic analysis, limited logic |
| Google Forms | Internal/free | Free, easy, integrated | Minimal features, no logic |
| Alchemer | Mid-range research | Good logic, reasonable price | Less polished UI |

### 6.2 Platform Selection Criteria

- Question type support (MaxDiff, conjoint, matrix questions).
- Logic and branching capabilities.
- Randomization features.
- Integration with analysis tools.
- Panel/distribution features.
- Data export formats.
- Accessibility and mobile responsiveness.
- Price and team/license model.

---

## 7. Response Rate Optimization

### 7.1 Factors Affecting Response Rate

| Factor | Impact | Recommendation |
|--------|--------|---------------|
| Survey length | Strong negative | Target 5-10 minutes; max 15 minutes |
| Incentive | Strong positive | Offer appropriate incentive |
| Sender recognition | Moderate positive | Send from known person/brand |
| Subject line | Moderate positive | Clear purpose, personalized |
| Mobile optimization | Strong positive | Ensure mobile-responsive design |
| Topic relevance | Strong positive | Target the right audience |
| Follow-up reminders | Moderate positive | 1-2 reminders, spaced 3-7 days |
| Pre-notification | Moderate positive | Alert respondents before survey |

### 7.2 Benchmarks by Channel

| Channel | Typical Response Rate | Notes |
|---------|---------------------|-------|
| In-app survey | 10-30% | Highly targeted, immediate |
| Email to customers | 10-25% | Depends on relationship quality |
| Email to prospects | 2-10% | Lower engagement |
| Post-transaction | 20-40% | High relevance, recency |
| Panel (paid) | 40-70% | Pre-committed respondents |

---

## 8. Survey Length Optimization

### 8.1 The Length-Quality Trade-off

Survey length directly affects completion rate, data quality, and respondent satisfaction. Longer surveys produce more data but with diminishing quality as respondent fatigue increases.

**Evidence-based guidelines:**
- Under 5 minutes: Minimal fatigue, highest completion rates.
- 5-10 minutes: Acceptable for engaged populations.
- 10-15 minutes: Requires incentive, expect 20-40% drop-off increase.
- 15-20 minutes: Significant fatigue effects; straightlining and satisficing increase.
- Over 20 minutes: Avoid. Data quality degrades substantially.

### 8.2 Strategies to Reduce Length

- Eliminate "nice to know" questions. Keep only "need to know."
- Use matrix questions judiciously (respondents process them faster but may satisfice).
- Use skip logic to remove irrelevant questions.
- Split long surveys into multiple shorter surveys administered to different subsamples.
- Use progressive profiling: collect different data points across multiple touchpoints.

---

## 9. Survey Design Quality Checklist

- [ ] Research question clearly defined before survey construction
- [ ] Each question maps to a specific research objective
- [ ] Question wording is neutral, clear, and single-barreled
- [ ] Response scales are symmetric, exhaustive, and mutually exclusive
- [ ] Survey flow is logical with appropriate sections and transitions
- [ ] Skip logic is tested across all paths
- [ ] Randomization is applied where appropriate
- [ ] Survey length is under 15 minutes (ideally under 10)
- [ ] Mobile responsiveness is verified
- [ ] Pilot testing completed (cognitive interviews and soft launch)
- [ ] Incentive and distribution plan are defined
- [ ] Privacy statement and consent are included

---

**This document governs survey design standards and practices across all research brain operations.**
