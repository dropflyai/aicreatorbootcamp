# Research Score -- Quality Enforcement (Authoritative)

This document defines how research quality is evaluated.
Every research deliverable must be scored before it is considered complete.

If quality is not measurable, it is not enforced.
If research is not rigorous, decisions built on it will fail.

---

## SCORING RULES (MANDATORY)

Each research deliverable must be scored across the following dimensions.
Score each category from **1 (poor)** to **5 (excellent)**.

### Hard Fail Dimensions
These dimensions are critical. Score <3 = immediate rework required:
- **Methodology Rigor**
- **Validity**
- **Ethical Standards**

### Passing Criteria
- Average score across all dimensions >= 4.0
- No hard-fail dimension < 3
- No dimension < 2 under any circumstance
- Synthesis Depth is NOT a hard fail -- evaluated holistically

### Holistic Note
Synthesis Depth is evaluated holistically. Novel frameworks, unexpected connections, and generative insights qualify as depth even when data volume is limited.

---

## 1. METHODOLOGY RIGOR

**Question:**
Is the research method appropriate for the question being asked, with valid sampling and bias mitigation?

### What to Evaluate
- Method matches research question (qualitative vs quantitative vs mixed)
- Sampling strategy is explicit and defensible
- Known biases are identified and mitigated
- Data collection instruments are validated or pilot-tested
- Research plan was documented before execution (not retrofitted)
- Timeline is proportionate to question complexity

### Scoring Guide
- **5** -- Method perfectly matched to question; sampling is representative and justified; all major biases identified with specific mitigation strategies; instruments validated through pilot
- **4** -- Method appropriate; sampling mostly representative with minor gaps acknowledged; primary biases identified and mitigated; instruments reviewed but not formally piloted
- **3** -- Method adequate but not optimal; sampling has gaps that weaken conclusions; some biases acknowledged but mitigation is vague; instruments untested
- **2** -- Method mismatched to question; sampling is convenience-based without acknowledgment; biases not considered; instruments improvised
- **1** -- No discernible methodology; data collected haphazardly; conclusions drawn from anecdote

### Common Failures
- Using surveys when interviews are needed (or vice versa)
- Convenience sampling presented as representative
- Confirmation bias in question design (leading questions)
- No screening criteria for participants
- Retrofitting methodology after data collection

### Remediation
Score <4 --> Rewrite research plan. Justify method selection. Document sampling frame. Add bias mitigation checklist.

---

## 2. INSIGHT QUALITY

**Question:**
Are the insights actionable, non-obvious, evidence-based, and triangulated across sources?

### What to Evaluate
- Insights go beyond surface-level observations
- Each insight is tied to specific evidence (quotes, data points, patterns)
- Insights are actionable (team can act on them immediately)
- Triangulation: insights confirmed across multiple data sources or methods
- Insights distinguish between what users say vs what they do
- Prioritization framework applied to insights (impact vs effort)

### Scoring Guide
- **5** -- Every insight is non-obvious, directly actionable, supported by triangulated evidence from 3+ sources; clear prioritization; say-do gap explicitly analyzed
- **4** -- Most insights are actionable and evidence-based; triangulated across 2+ sources; prioritization present; some say-do analysis
- **3** -- Insights are descriptive rather than generative; evidence present but thin; limited triangulation; no prioritization
- **2** -- Insights are obvious or generic; weak evidence; single-source; no prioritization
- **1** -- No real insights; report is a data dump or collection of opinions

### Common Failures
- Reporting what users said without interpreting what it means
- Insights that could apply to any product ("users want it to be easy")
- No evidence trail from data to insight
- Treating a single user quote as a validated insight
- Missing the say-do gap (users say they want X but their behavior shows Y)

### Remediation
Score <4 --> Revisit raw data. Extract non-obvious patterns. Add evidence citations. Triangulate across sources. Apply prioritization matrix.

---

## 3. VALIDITY

**Question:**
Does the research have adequate internal and external validity, reliability, and appropriate generalizability caveats?

### What to Evaluate
- **Internal validity**: Do conclusions follow logically from the data?
- **External validity**: Can findings generalize to the target population?
- **Reliability**: Would another researcher reach similar conclusions?
- **Generalizability caveats**: Limitations are stated explicitly
- Confounding variables are identified
- Alternative explanations are considered and addressed

### Scoring Guide
- **5** -- Strong internal and external validity; conclusions logically airtight; reliability demonstrated through inter-rater agreement or method transparency; limitations and caveats clearly stated with impact assessment
- **4** -- Good validity on both dimensions; minor logical gaps acknowledged; reliability supported by documented process; limitations stated
- **3** -- Adequate internal validity but external validity questionable; some logical leaps; process documented but reliability untested; limitations mentioned briefly
- **2** -- Weak internal validity (conclusions do not follow from data); external validity not considered; process opaque; no limitations stated
- **1** -- Conclusions contradict data; no consideration of validity; findings presented as universal truth

### Common Failures
- Generalizing from 5 interviews to "all users"
- Ignoring confounding variables (e.g., time of day, incentive effects)
- No inter-rater reliability check on qualitative coding
- Presenting correlations as causation
- Omitting limitations section entirely
- Survivorship bias (only talking to current users, not churned ones)

### Remediation
Score <4 --> Add limitations section. Check logical chain from data to conclusions. Document coding process. Address confounds. State generalizability boundaries explicitly.

---

## 4. PARTICIPANT QUALITY

**Question:**
Is the sample representative, adequate in size, and free from recruitment bias?

### What to Evaluate
- Sample represents the target user population
- Sample size is adequate for the method (qualitative: 8-12 for saturation; quantitative: statistically powered)
- Recruitment method does not introduce systematic bias
- Screening criteria are documented and applied consistently
- Participant demographics are recorded and reported
- Incentive structure does not skew responses
- Non-response bias is considered

### Scoring Guide
- **5** -- Sample is fully representative of target population; N is adequate with saturation demonstrated (qual) or power analysis conducted (quant); recruitment method minimizes bias; screening documented; demographics reported; incentives appropriate
- **4** -- Sample is mostly representative with minor gaps; N is adequate; recruitment has minor bias acknowledged; screening documented; demographics reported
- **3** -- Sample has notable gaps in representation; N is borderline; recruitment bias present but acknowledged; screening criteria vague; demographics partially reported
- **2** -- Sample is unrepresentative; N is insufficient; recruitment heavily biased (e.g., only power users); no screening criteria; demographics not reported
- **1** -- No consideration of sample quality; participants are whoever was available; N is critically low

### Sample Size Guidelines

| Method | Minimum N | Ideal N | Saturation Signal |
|--------|-----------|---------|-------------------|
| Discovery interviews | 5 | 8-12 | No new themes after 3 consecutive |
| Usability testing | 5 | 8-10 | 85% of issues found |
| Concept testing | 8 | 12-15 | Consistent patterns emerge |
| Survey (directional) | 50 | 100+ | Margin of error acceptable |
| Survey (statistical) | 384+ | 1000+ | Power analysis confirms |
| Card sorting | 15 | 30+ | Agreement stabilizes |
| Diary studies | 10 | 15-20 | Behavioral patterns repeat |

### Common Failures
- Recruiting from internal team or friends
- Only recruiting power users (missing newcomers and churned)
- Sample too homogeneous (all same age, role, or context)
- No screening criteria leading to irrelevant participants
- Incentive too high (attracts professional survey takers)
- Not reporting who was excluded and why

### Remediation
Score <4 --> Expand recruitment channels. Add screening criteria. Document demographics. Adjust N if below minimum. Consider non-response bias.

---

## 5. SYNTHESIS DEPTH

**Question:**
Are themes grounded in data, contradictions explored, and generative frameworks produced?

### What to Evaluate
- Themes emerge from data (bottom-up), not imposed from assumptions (top-down)
- Contradictions in data are surfaced and analyzed (not hidden)
- Frameworks or models are generated to organize findings
- Cross-cutting patterns are identified across segments
- Negative cases (exceptions to patterns) are explored
- Synthesis goes beyond categorization to interpretation

### Scoring Guide
- **5** -- Themes clearly grounded in data with audit trail; all contradictions explored with proposed explanations; original framework generated; cross-segment patterns mapped; negative cases analyzed; synthesis is generative (produces new understanding)
- **4** -- Themes grounded in data; most contradictions noted; framework or model present; some cross-segment analysis; negative cases acknowledged
- **3** -- Themes present but loosely connected to data; contradictions mentioned but not explored; no framework generated; limited cross-segment analysis
- **2** -- Themes imposed rather than emergent; contradictions ignored; no framework; analysis stays within silos
- **1** -- No synthesis; raw data presented without interpretation; themes are categories not insights

### Contradiction Handling Protocol
When contradictory data appears:
1. Document the contradiction explicitly
2. Segment the data (who said what and in what context)
3. Identify variables that explain the divergence
4. Propose testable hypotheses for the contradiction
5. Recommend follow-up research if needed

### Common Failures
- Cherry-picking data that supports a hypothesis
- Hiding contradictory findings
- Stopping at categories ("3 users mentioned X") without interpreting significance
- No conceptual framework to organize findings
- Treating all segments as monolithic

### Remediation
Score <4 --> Return to raw data. Build themes bottom-up. Surface and explore contradictions. Create organizing framework. Analyze negative cases.

---

## 6. COMMUNICATION

**Question:**
Is the research communicated in a way that is audience-appropriate, with uncertainty quantified and recommendations prioritized?

### What to Evaluate
- Report is tailored to the audience (executive summary vs detailed appendix)
- Uncertainty is quantified (confidence levels, margin of error, caveats)
- Recommendations are specific, actionable, and prioritized
- Visualizations aid comprehension (not decorate)
- Key findings are scannable (not buried in prose)
- Methodology section is accessible to non-researchers
- Raw data is available in appendix for verification

### Scoring Guide
- **5** -- Report is perfectly audience-tailored with executive summary and detail layers; uncertainty quantified precisely; recommendations prioritized by impact with effort estimates; visualizations clarify; scannable format; methodology accessible; appendix complete
- **4** -- Report is mostly audience-appropriate; uncertainty acknowledged; recommendations prioritized; good visualizations; mostly scannable; methodology clear
- **3** -- Report is generic (not tailored to audience); uncertainty mentioned vaguely; recommendations present but not prioritized; visualizations adequate; dense prose
- **2** -- Report is inaccessible to target audience; uncertainty ignored; recommendations vague; no visualizations; difficult to parse
- **1** -- Report is a data dump; no structure; no recommendations; no consideration of audience

### Audience-Specific Requirements

| Audience | Must Include | Format Priority |
|----------|-------------|-----------------|
| Executive / PM | Top 3 findings, business impact, clear recommendations | 1-page summary + appendix |
| Design team | User needs, pain points, opportunity areas, personas | Visual-heavy, journey maps |
| Engineering | Technical constraints, data requirements, edge cases | Structured, specific, testable |
| Full team | Shared understanding, alignment on priorities | Workshop format, discussion guide |

### Common Failures
- 40-page report when a 2-page summary was needed
- No executive summary
- Uncertainty not communicated (findings presented as certainties)
- Recommendations buried on page 35
- Academic tone when business audience expected
- No prioritization of recommendations

### Remediation
Score <4 --> Add executive summary. Quantify uncertainty. Prioritize recommendations. Add visualizations. Restructure for scannability.

---

## 7. TIMELINESS

**Question:**
Was the research delivered within the decision window, using rapid methods when appropriate?

### What to Evaluate
- Research was delivered before the decision deadline
- Method was proportionate to timeline (rapid methods used when time-constrained)
- Scope was right-sized (not over-researched for the question)
- Preliminary findings shared early when full analysis takes time
- Research did not block product decisions unnecessarily
- Speed vs rigor tradeoff was explicit and agreed upon

### Scoring Guide
- **5** -- Research delivered well within decision window; rapid methods used appropriately; scope perfectly right-sized; preliminary findings shared proactively; zero decision blocking; speed-rigor tradeoff explicitly documented
- **4** -- Research delivered on time; methods mostly proportionate; scope appropriate; some early sharing; minimal decision blocking
- **3** -- Research delivered at deadline; methods slightly over-scoped; some scope creep; limited early sharing; some decision blocking
- **2** -- Research delivered late; methods disproportionate to timeline; significant scope creep; no early sharing; decisions blocked
- **1** -- Research delivered after decision was already made; completely over-scoped; team moved on without findings

### Rapid Research Methods

| Timeline | Recommended Methods |
|----------|-------------------|
| 1-2 days | Desk research, analytics review, 3-5 guerrilla interviews |
| 3-5 days | 5-8 interviews, lightweight survey, competitor audit |
| 1-2 weeks | Full interview study (8-12), card sorting, usability testing |
| 2-4 weeks | Mixed-method study, diary study, comprehensive survey |
| 4+ weeks | Longitudinal study, ethnography, large-scale quant |

### Common Failures
- Spending 3 weeks on research for a decision needed in 3 days
- Not communicating preliminary findings
- Scope creep (adding questions mid-study)
- Perfectionism that delays delivery
- No alignment on timeline with stakeholders upfront

### Remediation
Score <4 --> Reassess method for timeline fit. Share preliminary findings immediately. Right-size scope. Set explicit deadline with stakeholders.

---

## 8. ETHICAL STANDARDS

**Question:**
Were informed consent, privacy, and vulnerable population considerations upheld?

### What to Evaluate
- Informed consent obtained from all participants
- Participants understand how their data will be used
- Privacy is protected (anonymization, secure storage)
- Vulnerable populations receive extra protection
- Participants can withdraw at any time without penalty
- Incentives are fair (not coercive)
- Research does not cause harm (emotional, financial, reputational)
- Data retention policy is documented

### Scoring Guide
- **5** -- Full informed consent with clear data use explanation; complete anonymization; secure data storage with retention policy; vulnerable population protocols in place; withdrawal process clear; incentives fair and non-coercive; harm assessment documented
- **4** -- Informed consent obtained; anonymization present; secure storage; vulnerable populations considered; withdrawal possible; incentives reasonable
- **3** -- Consent obtained but boilerplate (not study-specific); anonymization incomplete; storage adequate; vulnerable populations not specifically addressed; withdrawal mentioned
- **2** -- Consent vague or verbal-only; limited anonymization; storage insecure; no vulnerable population consideration; no withdrawal process
- **1** -- No consent process; identifiable data exposed; no privacy consideration; potential for harm not assessed

### Vulnerable Population Checklist
Extra protocols required when researching:
- [ ] Minors (under 18) -- parental consent required
- [ ] People in crisis or distress -- emotional safety plan required
- [ ] People with disabilities -- accessible consent and methods required
- [ ] Low-income or economically vulnerable -- fair incentives, no coercion
- [ ] Employees (power dynamics) -- anonymous, no manager involvement
- [ ] Health-related topics -- sensitivity protocols, referral resources
- [ ] Financial hardship -- do not cause additional stress

### Data Handling Requirements
- PII must be separated from research data
- Recordings must be stored securely with access controls
- Data must be deleted after retention period
- Participants must be informed of retention period
- Third-party tools must be vetted for privacy compliance

### Common Failures
- Copy-paste consent form not tailored to study
- Recording without explicit permission
- Storing PII in shared documents
- No consideration of emotional impact on participants
- Incentives that are coercive for vulnerable populations
- Not offering withdrawal option

### Remediation
Score <3 --> STOP. Do not proceed. Fix ethical issues before continuing research. This is a hard fail.

---

## FINAL RESEARCH SCORE DECISION

**Hard Fail Dimensions (Methodology Rigor, Validity, Ethical Standards):**
- Score <3 --> **IMMEDIATE REWORK REQUIRED**

**All Dimensions:**
- Average score >= 4.0 --> **RESEARCH MAY SHIP**
- Average score < 4.0 --> **REWORK REQUIRED**

**Synthesis Depth:**
- NOT a hard fail
- Evaluated holistically (novel frameworks, unexpected connections qualify)
- Score <3 triggers review, not automatic failure

Scores must be stated explicitly before final output.

### Score Card Template

```markdown
## Research Score: [Study/Project Name]

| Dimension | Score | Notes |
|-----------|-------|-------|
| Methodology Rigor | /5 | |
| Insight Quality | /5 | |
| Validity | /5 | |
| Participant Quality | /5 | |
| Synthesis Depth | /5 | |
| Communication | /5 | |
| Timeliness | /5 | |
| Ethical Standards | /5 | |

**Average Score:** X.X / 5.0
**Hard Fail Check:** [ ] All hard-fail dimensions >= 3
**Verdict:** PASS / REWORK REQUIRED
**Issues:** [if any]
**Strengths:** [highlight what worked]
**Required Actions:** [specific next steps if rework needed]
```

---

## SCORING CALIBRATION GUIDE

### What a "5" Study Looks Like
- Clear research question mapped to appropriate method
- Sample is representative with saturation demonstrated
- Every insight has an evidence trail
- Contradictions are explored, not hidden
- Framework generated that the team adopts
- Delivered ahead of decision deadline
- Full consent and privacy compliance
- Executive summary that drives immediate action

### What a "3" Study Looks Like
- Method is adequate but not optimal
- Sample has gaps
- Insights are descriptive, not generative
- Contradictions mentioned but not explored
- No framework
- Delivered on deadline
- Basic consent
- Report is a document, not a decision tool

### What a "1" Study Looks Like
- No methodology
- Whoever was available was interviewed
- Data dump with no analysis
- Contradictions ignored
- No synthesis
- Delivered after the decision was made
- No consent process
- Report is unreadable

---

## ENFORCEMENT RULE

Quality is enforced, not assumed.
Do not justify low scores.
Rework until standards are met.
Research that does not meet the bar is not shipped -- it is reworked or scrapped.

---

## END OF RESEARCH SCORE
