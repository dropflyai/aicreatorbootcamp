# Interview Design -- Evidence-Based Selection Systems

## Purpose

This module defines the framework for designing valid, reliable, and legally defensible interview processes. The interview is the most influential -- and most abused -- selection tool. Schmidt and Hunter's (1998) meta-analysis established that structured interviews (r = .51) are more than twice as valid as unstructured interviews (r = .20) for predicting job performance. Every interview process designed under the HR Brain must be structured, standardized, and bias-mitigated.

---

## 1. Structured Interviewing -- Validity Research

### 1.1 Why Structure Matters

Unstructured interviews suffer from well-documented biases that degrade predictive validity:

| Bias | Description | Impact |
|------|-------------|--------|
| **Primacy effect** | Disproportionate weight to first impression | Decision made within first 4 minutes (Ambady & Rosenthal, 1993) |
| **Similarity bias** | Preference for candidates similar to interviewer | Homogeneous hiring, culture replication |
| **Halo effect** | One positive attribute colors entire evaluation | Inflated ratings across all dimensions |
| **Confirmation bias** | Seeking information that confirms initial impression | Ignoring disconfirming evidence |
| **Anchoring** | Over-reliance on resume or prior interview feedback | Contaminated independent evaluation |
| **Contrast effect** | Evaluating relative to previous candidate rather than absolute criteria | Inconsistent standards |
| **Attribution error** | Attributing behavior to disposition rather than situation | Misjudging competence based on circumstances |

### 1.2 Components of a Structured Interview

Research (Campion, Palmer, & Campion, 1997) identifies the critical components:

**Content structure (what is asked):**
1. Questions derived from job analysis
2. Same questions asked of all candidates
3. Questions anchored to required competencies
4. Limited prompting and follow-up (to maintain standardization)
5. No access to candidate information irrelevant to the job (e.g., personal details, prior salary)

**Evaluation structure (how responses are scored):**
1. Anchored rating scales for each question (behavioral examples at each level)
2. Detailed scoring rubrics provided before the interview
3. Notes taken during the interview
4. Ratings assigned immediately after the interview
5. Multiple interviewers rate independently before discussing
6. Composite score calculated from all interviewers
7. Formal decision process based on aggregate scores

### 1.3 Incremental Validity

Structured interviews add predictive power beyond other selection tools:

| Combination | Combined Validity (r) |
|------------|---------------------|
| GMA + Structured interview | .63 |
| GMA + Unstructured interview | .55 |
| Work sample + Structured interview | .60 |
| Structured interview alone | .51 |
| GMA test alone | .51 |
| Unstructured interview alone | .20 |

Source: Schmidt & Hunter (1998); Huffcutt & Arthur (1994)

---

## 2. Behavioral Interviewing -- STAR Method

### 2.1 Theoretical Foundation

Behavioral interviewing is grounded in the principle that past behavior is the best predictor of future behavior in similar situations (Janz, 1982). Rather than asking hypothetical questions ("What would you do if..."), behavioral questions require candidates to describe specific past experiences.

### 2.2 STAR Framework

| Component | Definition | Interviewer Probe |
|-----------|-----------|------------------|
| **Situation** | The context and background | "Tell me about a specific time when..." |
| **Task** | The candidate's specific responsibility | "What was your role? What were you responsible for?" |
| **Action** | What the candidate specifically did | "What specifically did you do? Walk me through your process." |
| **Result** | The outcome, impact, and learning | "What was the outcome? What did you learn?" |

### 2.3 Behavioral Question Design

**Step 1: Identify critical competencies from job analysis**

Each role should have 4-6 core competencies assessed through interviews. Example for a senior software engineering role:

| Competency | Definition | Weight |
|------------|-----------|--------|
| Technical problem-solving | Ability to diagnose and solve complex technical problems | 25% |
| System design | Ability to design scalable, maintainable systems | 25% |
| Collaboration | Ability to work effectively across teams and functions | 20% |
| Communication | Ability to explain complex concepts clearly | 15% |
| Leadership | Ability to mentor, guide technical decisions, influence without authority | 15% |

**Step 2: Write behavioral questions for each competency**

Each competency requires 2-3 questions (primary + follow-ups):

```
Competency: Technical problem-solving

Primary question:
"Tell me about a time you encountered a production issue that was difficult
to diagnose. Walk me through your debugging process from detection to resolution."

Follow-up probes:
- "What tools or techniques did you use to isolate the issue?"
- "How did you prioritize this against other work?"
- "What did you put in place to prevent recurrence?"
- "What would you do differently if you encountered this again?"
```

**Step 3: Develop anchored rating scales**

```
TECHNICAL PROBLEM-SOLVING — Rating Scale

5 (Exceptional):
- Describes systematic debugging methodology
- Identified root cause, not just symptoms
- Implemented monitoring/alerting to prevent recurrence
- Quantified impact and communicated to stakeholders
- Demonstrated learning and process improvement

4 (Strong):
- Used structured approach to diagnose
- Identified root cause with reasonable efficiency
- Implemented fix with appropriate testing
- Communicated status to relevant parties

3 (Adequate):
- Eventually resolved the issue
- Used some structured approach
- May have initially pursued wrong hypothesis
- Limited post-incident improvement

2 (Below expectations):
- Struggled to systematically approach the problem
- Required significant help from others
- Did not demonstrate structured debugging
- Limited learning from the experience

1 (Unacceptable):
- Could not describe a relevant situation
- Demonstrated no systematic approach
- Relied entirely on others for resolution
- No evidence of technical debugging ability
```

### 2.4 Common Behavioral Question Errors

| Error | Example | Correction |
|-------|---------|-----------|
| Leading questions | "You're a team player, right?" | "Tell me about a time you disagreed with a teammate" |
| Hypothetical questions | "What would you do if..." | "Tell me about a time when..." |
| Double-barreled questions | "Tell me about leadership AND conflict" | Ask one competency at a time |
| Too broad | "Tell me about yourself" | "Tell me about a specific project where..." |
| Accepting generalities | Accepting "I usually..." | Probe: "Give me a specific example" |

---

## 3. Competency-Based Assessment

### 3.1 Competency Model Design

A competency model defines the knowledge, skills, abilities, and other characteristics (KSAOs) required for success in a role. The HR Brain requires competency models for all roles before designing interviews.

**Competency model development process:**

1. **Job analysis**: Observe incumbents, interview high performers and managers, review job documentation
2. **Critical incident technique**: Collect specific examples of effective and ineffective behavior
3. **Competency definition**: Define each competency with behavioral indicators at multiple proficiency levels
4. **Validation**: Confirm competencies predict performance through SME review and, where possible, criterion validation
5. **Documentation**: Maintain competency models in job architecture system

### 3.2 Competency Assessment Matrix

For each hiring process, create a matrix mapping competencies to assessment methods:

| Competency | Resume Screen | Phone Screen | Technical Assessment | Behavioral Interview | Reference Check |
|------------|:---:|:---:|:---:|:---:|:---:|
| Technical skills | X | X | X | | |
| Problem-solving | | | X | X | |
| Communication | | X | | X | X |
| Collaboration | | | | X | X |
| Leadership | X | | | X | X |
| Domain knowledge | X | X | X | | |

**Rule**: Each critical competency must be assessed by at least two independent methods (multi-trait, multi-method principle).

### 3.3 Proficiency Levels

| Level | Label | Description | Typical Role |
|-------|-------|-------------|-------------|
| 1 | Foundational | Understands basic concepts; requires guidance | Entry-level, intern |
| 2 | Developing | Applies knowledge with some independence; handles routine situations | Junior, early-career |
| 3 | Proficient | Works independently; handles complex situations; advises others | Mid-level, senior |
| 4 | Advanced | Expert in domain; shapes strategy; mentors others; handles ambiguity | Staff, principal, director |
| 5 | Master | Recognized authority; creates frameworks; influences industry | Distinguished, VP, fellow |

---

## 4. Interview Scorecards

### 4.1 Scorecard Design Principles

Scorecards are the mechanism through which structured interviews produce reliable data. Every interview must use a scorecard submitted within 24 hours of the interview.

**Required scorecard elements:**

1. **Competency ratings**: Each competency rated on the anchored scale (1-5)
2. **Evidence notes**: Specific examples the candidate provided (not impressions)
3. **Red flags**: Factual concerns that may disqualify (not subjective feelings)
4. **Overall recommendation**: Strong yes / Yes / Lean yes / Lean no / No / Strong no
5. **Confidence level**: How confident the interviewer is in their assessment

### 4.2 Rating Distribution Guidance

Interviewers tend toward rating inflation (central tendency bias). Calibration guidance:

```
5 (Exceptional):  Top 5% of all candidates you have interviewed for similar roles
4 (Strong):       Top 25% — clearly above the bar, no reservations
3 (Adequate):     Meets the bar — capable but not differentiated
2 (Below):        Below the bar — significant gaps identified
1 (Unacceptable): No evidence of required competency
```

### 4.3 Independent Assessment Protocol

To maintain data independence and prevent groupthink:

1. Interviewers submit scorecards BEFORE viewing others' feedback
2. ATS should enforce this sequencing (Greenhouse, Lever, and Ashby support this)
3. No "hallway conversations" about candidates before scorecard submission
4. Debrief meeting occurs only after all scorecards are submitted
5. Debrief facilitator (recruiter) presents aggregate scores, then opens discussion

---

## 5. Bias Mitigation in Interviews

### 5.1 Systemic Bias Mitigation

| Intervention | Mechanism | Evidence |
|-------------|-----------|----------|
| Structured questions | Eliminates differential information gathering | Campion et al. (1997): r = .51 vs. .20 |
| Anchored rating scales | Reduces subjective interpretation variance | Maurer (2002): significant reliability improvement |
| Diverse interview panels | Reduces single-perspective bias | Multiple perspectives reduce individual bias impact |
| Blind resume review | Removes demographic cues | Bertrand & Mullainathan (2004): 50% callback gap for identical resumes with different names |
| Interviewer training | Addresses cognitive biases directly | Latham & Sue-Chan (1999): trained interviewers show higher validity |
| Standardized debrief | Prevents dominant voice from anchoring group | Group discussion quality improves with structure |
| Work sample tests | Directly measures job-relevant skill | Schmidt & Hunter (1998): r = .54, less susceptible to bias |

### 5.2 Interviewer Training Requirements

All interviewers must complete training covering:

1. Legal framework: What questions are prohibited and why
2. Cognitive biases: Recognition and mitigation of the seven major biases
3. STAR method: How to probe for specific behavioral evidence
4. Scoring rubrics: How to apply anchored rating scales consistently
5. Note-taking: What to document and what not to document
6. Feedback submission: Timeline requirements and independence protocol

**Refresher training**: Annual, with calibration exercises using standardized candidate recordings.

### 5.3 Prohibited Interview Questions

Questions that directly or indirectly inquire about protected characteristics are prohibited:

| Category | Prohibited | Permissible Alternative |
|----------|-----------|------------------------|
| Age | "When did you graduate?" | "Do you have X years of relevant experience?" |
| Family status | "Do you have children?" | "Are you available for the travel this role requires?" |
| Religion | "What church do you attend?" | "Can you work the required schedule?" |
| National origin | "Where are you from originally?" | "Are you authorized to work in the US?" |
| Disability | "Do you have any medical conditions?" | "Can you perform these essential functions with or without accommodation?" |
| Salary history | "What did you make at your last job?" | "What are your compensation expectations?" (in jurisdictions with salary history bans) |
| Pregnancy | "Are you planning to have children?" | Never permissible; not job-relevant |
| Arrest record | "Have you ever been arrested?" | "Have you been convicted of a felony?" (where legally permitted, after conditional offer) |

---

## 6. Interview Process Design

### 6.1 Standard Interview Process Template

```
Stage 1: Application Review (Recruiter)
  - Resume screen against must-have criteria
  - Disposition non-qualified candidates
  - Target: 48 hours from application

Stage 2: Phone Screen (Recruiter, 30 min)
  - Role interest and fit
  - Compensation alignment
  - Logistics (start date, location, authorization)
  - 3-4 screening questions (targeted)

Stage 3: Hiring Manager Screen (45 min)
  - Role deep-dive
  - 2-3 competency questions
  - Candidate questions

Stage 4: Skills Assessment (role-dependent)
  - Technical roles: Take-home or live coding (max 2-3 hours candidate time)
  - Non-technical roles: Case study, writing sample, or portfolio review
  - Standardized rubric for evaluation

Stage 5: On-site / Virtual Panel (3-4 hours total)
  - 3-4 interviewers, each assigned 1-2 competencies
  - No competency goes unassessed
  - Includes cross-functional interviewer
  - Includes "bar raiser" or culture interviewer

Stage 6: Debrief (60 min, within 48 hours)
  - All scorecards submitted before meeting
  - Recruiter facilitates structured discussion
  - Hiring decision documented with rationale

Stage 7: Reference Check (2-3 references)
  - Structured reference questions aligned to competencies
  - Verify specific claims from interviews
  - Document findings
```

### 6.2 Process Timing Targets

| Stage | Calendar Days | Owner |
|-------|:---:|-------|
| Application to screen | 5 | Recruiter |
| Screen to hiring manager | 3 | Recruiter |
| Hiring manager to assessment | 5 | Recruiter + Hiring manager |
| Assessment to on-site | 5 | Recruiting coordinator |
| On-site to debrief | 2 | Recruiter |
| Debrief to offer | 3 | Recruiter + Hiring manager + Comp |
| **Total: Application to offer** | **23 days** | |

Target: 80% of processes complete within this timeline. Deviations require recruiter escalation.

---

## 7. Interview Calibration

### 7.1 Purpose

Calibration ensures interviewers apply consistent standards across candidates, roles, and time. Without calibration, individual interviewer bias creates noise that degrades hiring quality.

### 7.2 Calibration Methods

**Video calibration exercises** (quarterly):
- All interviewers watch the same recorded interview response
- Each independently scores using the rubric
- Discuss variance, align on interpretation of anchors
- Target: inter-rater reliability (ICC) > .70

**Scorecard audits** (monthly):
- Analytics team reviews score distributions by interviewer
- Flag interviewers with extreme leniency or severity bias
- Flag interviewers who always rate 3 (central tendency)
- Feedback to interviewers on their patterns relative to peers

**Outcome tracking** (quarterly):
- Correlate individual interviewer scores with hire outcomes (12-month performance)
- Identify interviewers whose assessments best predict performance
- Weight high-validity interviewers more heavily in borderline decisions
- Remove consistently low-validity interviewers from panels

---

## References

- Bertrand, M., & Mullainathan, S. (2004). Are Emily and Greg more employable than Lakisha and Jamal? *American Economic Review*, 94(4), 991-1013.
- Campion, M. A., Palmer, D. K., & Campion, J. E. (1997). A review of structure in the selection interview. *Personnel Psychology*, 50(3), 655-702.
- Huffcutt, A. I., & Arthur, W. (1994). Hunter and Hunter (1984) revisited: Interview validity for entry-level jobs. *Journal of Applied Psychology*, 79(2), 184-190.
- Janz, T. (1982). Initial comparisons of patterned behavior description interviews versus unstructured interviews. *Journal of Applied Psychology*, 67(5), 577-580.
- Latham, G. P., & Sue-Chan, C. (1999). A meta-analysis of the situational interview. *Journal of Occupational and Organizational Psychology*, 72(3), 349-364.
- Schmidt, F. L., & Hunter, J. E. (1998). The validity and utility of selection methods. *Psychological Bulletin*, 124(2), 262-274.

---

**This module governs all interview design. Structure is mandatory. Unstructured interviews are prohibited.**
