# Machine Translation Technology — Authoritative Module

Machine translation has evolved from rule-based curiosity to production-grade
technology that handles significant localization volume. Understanding MT
architecture, capabilities, limitations, economics, and integration is
essential for modern localization strategy. This document codifies the
technical foundations, deployment patterns, and decision frameworks for MT.

---

## 1. MT ARCHITECTURE EVOLUTION

### Generations of Machine Translation

| Generation | Era | Architecture | Quality | Status |
|-----------|-----|-------------|---------|--------|
| Rule-Based (RBMT) | 1950s–2000s | Hand-crafted linguistic rules | Low | Legacy |
| Statistical (SMT) | 1990s–2016 | Phrase-based statistical models | Medium | Obsolete |
| Neural (NMT) | 2016–present | Encoder-decoder neural networks | High | Dominant |
| Transformer NMT | 2017–present | Self-attention architecture | Very High | State of art |
| LLM-based | 2022–present | Large language models (GPT, Claude) | High–Very High | Emerging |

### Neural Machine Translation (NMT)

NMT uses deep learning to translate entire sentences as a unit rather
than phrase-by-phrase. The dominant architecture is the Transformer
(Vaswani et al., 2017).

**Transformer Architecture:**
```
Source Sentence → Encoder → Contextual Representation → Decoder → Target Sentence

Encoder:
├── Token embedding + positional encoding
├── Multi-head self-attention (context from all source words)
├── Feed-forward layers
└── N stacked layers (typically 6–12)

Decoder:
├── Target token embedding + positional encoding
├── Masked self-attention (only see previous target words)
├── Cross-attention (attend to encoder output)
├── Feed-forward layers
└── N stacked layers (typically 6–12)
```

### Leading NMT Systems

| System | Provider | Strengths | API Pricing (approx) |
|--------|----------|-----------|---------------------|
| Google Cloud Translation | Google | Broad language coverage (130+) | $20/M chars |
| DeepL | DeepL | European language quality | $25/M chars |
| Amazon Translate | AWS | AWS integration, custom models | $15/M chars |
| Azure Translator | Microsoft | Enterprise integration | $10/M chars |
| Meta NLLB | Meta (open-source) | 200+ languages, free | Free (self-host) |
| ModernMT | Translated | Adaptive, TM-aware | Variable |

---

## 2. LLMs FOR TRANSLATION

### LLMs vs. Dedicated NMT

| Dimension | Dedicated NMT | LLM (GPT-4, Claude) |
|-----------|-------------|---------------------|
| Architecture | Translation-specific Transformer | General-purpose Transformer |
| Training data | Parallel corpora (source-target pairs) | Massive multilingual text |
| Speed | Fast (optimized for translation) | Slower (general inference) |
| Cost | Low per character | Higher per character |
| Quality (high-resource) | Very high | Comparable to very high |
| Quality (low-resource) | Variable | Often better (cross-lingual transfer) |
| Context awareness | Sentence-level (some paragraph) | Document-level |
| Style control | Limited | Excellent (via prompting) |
| Domain adaptation | Requires fine-tuning | Via prompting or few-shot |
| Terminology control | Glossary injection (limited) | Instruction following |

### When to Use LLMs for Translation

| Use Case | LLM Advantage |
|----------|--------------|
| Creative/marketing content | Style and tone control via prompts |
| Context-heavy content | Document-level understanding |
| Terminology-strict content | Glossary adherence via instructions |
| Low-resource languages | Cross-lingual transfer |
| Multi-format content | Handle mixed content naturally |
| Quality review | Explain errors, suggest fixes |

### LLM Translation Prompting

**Basic translation prompt:**
```
Translate the following from English to German.
Maintain the same tone and formality level.
This is UI text for a SaaS application.

Source: "Your changes have been saved successfully."
```

**Advanced translation prompt with glossary:**
```
Translate the following from English to Japanese.
This is a SaaS product UI string.

Glossary (use these exact translations):
- Dashboard = ダッシュボード
- Settings = 設定
- Workspace = ワークスペース

Context: This text appears as a confirmation toast notification
after the user saves their profile settings.

Source: "Your workspace settings have been updated."
```

---

## 3. MT POST-EDITING (MTPE)

### MTPE Workflow

```
Source Text
    │
    ▼
MT Engine Translation
    │
    ▼
Quality Estimation (automated score)
    │
    ▼
Routing Decision:
├── Score > 0.90: Light PE (minor fixes)
├── Score 0.70–0.90: Full PE (thorough editing)
└── Score < 0.70: Human translation (discard MT)
    │
    ▼
Post-Editor Work
    │
    ▼
Quality Check
    │
    ▼
Delivery
```

### MTPE Economics

| Approach | Cost per Word | Speed (words/hour) | Quality |
|----------|-------------|-------------------|---------|
| Human translation | $0.10–$0.25 | 300–500 | Highest |
| Full MTPE | $0.04–$0.10 | 1,000–3,000 | High |
| Light MTPE | $0.02–$0.06 | 3,000–5,000 | Good |
| MT only | $0.001–$0.01 | Unlimited | Variable |

### Cost Savings Calculation

```
Scenario: 1 million words/year, EN→DE

Human only: 1M x $0.15 = $150,000
Full MTPE:  1M x $0.07 = $70,000  (53% savings)
Light MTPE: 1M x $0.04 = $40,000  (73% savings)

Annual savings with MTPE: $80,000–$110,000
```

---

## 4. ADAPTIVE MT

### What Is Adaptive MT?

Adaptive MT learns from post-editor corrections in real-time, improving
subsequent translations. It creates a feedback loop between human editors
and the MT engine.

**Adaptive MT Cycle:**
```
MT produces translation
    → Post-editor corrects
        → Corrections fed back to MT model
            → MT improves for similar content
                → Less post-editing needed
                    → Lower cost, faster turnaround
```

### Adaptive MT Providers

| Provider | Approach | Integration |
|----------|---------|-------------|
| ModernMT | Real-time TM adaptation | TMS integration |
| SYSTRAN | Domain adaptation | API |
| Language Weaver (RWS) | Enterprise adaptive | Enterprise TMS |
| Custom fine-tuning | Train on your data | Self-hosted |

---

## 5. CUSTOM MT ENGINES

### When to Build Custom

| Signal | Recommendation |
|--------|---------------|
| General-purpose MT quality is sufficient | Do NOT build custom |
| >500K words/year in specialized domain | Consider custom |
| Existing parallel corpora available | Good candidate |
| Domain-specific terminology critical | Consider custom |
| Quality requirements exceed general MT | Consider custom |

### Custom MT Approaches

| Approach | Data Required | Effort | Quality Improvement |
|----------|-------------|--------|-------------------|
| Domain fine-tuning | 50K–500K parallel sentences | Medium | Significant |
| Terminology injection | Glossary | Low | Moderate |
| TM-augmented MT | Translation Memory | Low | Moderate |
| From-scratch training | Millions of parallel sentences | Very High | Variable |

---

## 6. MT QUALITY EVALUATION

### Evaluation Methods

| Method | Type | When to Use |
|--------|------|------------|
| BLEU | Automated, reference-based | Engine comparison, regression testing |
| COMET | Automated, neural | Production quality monitoring |
| Human evaluation (MQM) | Manual, gold standard | Periodic quality audits |
| A/B testing | User-facing | Measure user impact |
| Post-editing effort | Productivity-based | Economic evaluation |

### MT Engine Comparison Protocol

```
1. Select representative test set (500+ segments)
2. Translate with all candidate engines
3. Score with automated metrics (COMET, BLEU)
4. Human evaluate top 2–3 engines
5. Calculate post-editing productivity per engine
6. Factor in cost and integration effort
7. Select engine based on weighted criteria
```

---

## 7. MT INTEGRATION PATTERNS

### Pattern 1: Pre-Translation in TMS

```
New strings detected → TMS applies TM → TMS applies MT to remaining →
Translator sees pre-populated translations → Post-edits → Delivers
```

### Pattern 2: Real-Time API Integration

```
User generates content → API call to MT → Translated content displayed →
Optional human review pipeline
```

### Pattern 3: Hybrid Pipeline

```
Content classified by type
├── Marketing → Human translation (no MT)
├── UI strings → MT + Full PE
├── Help articles → MT + Light PE
├── User comments → MT only
└── Legal → Human translation + review
```

---

## 8. MT ECONOMICS

### Total Cost of MT Ownership

| Cost Component | One-Time | Recurring |
|---------------|----------|-----------|
| Engine selection and evaluation | $5K–$20K | Annual re-evaluation |
| Integration engineering | $10K–$50K | Maintenance |
| Custom training (if applicable) | $20K–$100K | Quarterly retraining |
| API costs | — | Per-character usage |
| Post-editing labor | — | Per-word ongoing |
| Quality monitoring | — | Ongoing staff time |

### Break-Even Analysis

```
MT Investment = Integration + Training + Ongoing API Cost
Translation Savings = (Human Cost - MTPE Cost) x Volume

Break-even when: Cumulative Savings > Cumulative Investment
Typical break-even: 6–18 months for >500K words/year
```

---

## 9. FUTURE OF MT

### Emerging Trends

| Trend | Timeline | Impact |
|-------|----------|--------|
| LLM-native translation | 2024–2026 | Paradigm shift in quality control |
| Real-time speech translation | 2025–2028 | Voice/video localization |
| Multi-modal MT | 2025–2027 | Image + text translation |
| Personalized MT | 2025–2027 | User-specific translation style |
| Zero-shot low-resource | 2024–2026 | Expand language coverage dramatically |

---

## 10. ANTI-PATTERNS

| Anti-Pattern | Description | Fix |
|-------------|-------------|-----|
| Raw MT in production | Deploying unreviewed MT for customer content | Always post-edit customer-facing |
| One engine for all | Same MT for all content types | Content-type routing |
| No quality monitoring | Deploy MT and never check quality | Regular COMET scoring |
| Over-customizing | Building custom engines when general suffices | Start with general, customize only if needed |
| Ignoring MT advances | Using 5-year-old MT engine | Annual engine re-evaluation |
| MT replacing all human | Eliminating human oversight entirely | Humans for quality, MT for productivity |

---

**Machine translation is a tool, not a replacement for human judgment.
The most effective MT strategies combine the speed and scale of automation
with the quality and nuance of human expertise. The art is in knowing
which content needs which level of human involvement — and building the
systems that route accordingly.**
