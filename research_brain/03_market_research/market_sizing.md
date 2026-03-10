# Market Sizing

Rigorous frameworks for estimating Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market through multiple methodological approaches.

---

## 1. TAM/SAM/SOM Framework

### 1.1 Definitions

**Total Addressable Market (TAM):** The total revenue opportunity available if a product achieved 100% market share with zero competition. TAM represents the theoretical upper bound. It answers: "How big is the universe of demand for this type of solution?"

**Serviceable Available Market (SAM):** The portion of TAM that your product or service can realistically serve given your business model, geographic focus, distribution channels, and product capabilities. SAM answers: "Of the total market, which portion can we actually reach and serve?"

**Serviceable Obtainable Market (SOM):** The realistic portion of SAM you can capture in the near term (typically 3-5 years) given your current resources, competitive position, and go-to-market capabilities. SOM answers: "How much market share can we realistically win?"

### 1.2 The Funnel Relationship

```
┌─────────────────────────────────────────────┐
│                   TAM                        │  $50B - All project management software
│  ┌─────────────────────────────────────┐    │
│  │              SAM                     │    │  $12B - Cloud-based PM for SMBs
│  │  ┌─────────────────────────────┐    │    │
│  │  │           SOM               │    │    │  $600M - North America, <500 employees
│  │  └─────────────────────────────┘    │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### 1.3 Common Mistakes

- **Confusing TAM with SAM:** Presenting the broadest possible market as if it were addressable. No startup serves 100% of TAM.
- **Cherry-picking the largest number:** Using TAM when SOM is what investors and strategists actually need.
- **Ignoring non-consumption:** Many potential customers use no solution at all. They are part of TAM but harder to convert than competitive switches.
- **Static analysis:** Markets evolve. TAM/SAM/SOM should be estimated across multiple time horizons with growth assumptions explicit.

---

## 2. Top-Down Market Sizing

### 2.1 Methodology

Start with a known aggregate figure (industry report, government data, analyst estimate) and narrow down through successive filters to reach your addressable segment.

**Process:**
1. Obtain total market size from credible source (Gartner, IDC, Statista, government census).
2. Apply geographic filter (e.g., North America only: 35% of global market).
3. Apply segment filter (e.g., SMB only: 40% of North America market).
4. Apply product/model filter (e.g., cloud-only: 60% of SMB segment).
5. Apply willingness-to-pay filter (e.g., target price point accessible to 70%).
6. Result is SAM. Apply market share assumption (5-15% for SOM).

### 2.2 Example

Total global CRM market: $80B (Gartner 2024).
North America: $80B x 0.40 = $32B.
SMB segment (<500 employees): $32B x 0.30 = $9.6B.
Cloud-native solutions: $9.6B x 0.70 = $6.7B.
SAM = $6.7B.
Realistic market share in 5 years (aggressive startup): 2-5%.
SOM = $6.7B x 0.03 = $201M.

### 2.3 Strengths and Weaknesses

**Strengths:** Fast, leverages existing research, credible data sources, easy to communicate.
**Weaknesses:** Depends heavily on quality of source data. Filters involve assumptions that compound error. Does not capture bottom-up demand signals. Can be wildly optimistic or pessimistic depending on filter choices.

---

## 3. Bottom-Up Market Sizing

### 3.1 Methodology

Build the market estimate from unit economics and customer counts rather than aggregate industry data.

**Process:**
1. Identify the target customer profile (ICP).
2. Count the number of potential customers matching the ICP (using databases, census data, industry associations).
3. Estimate average annual revenue per customer (from pricing model, competitive benchmarks, or willingness-to-pay research).
4. Multiply: Market Size = Number of Potential Customers x Average Revenue Per Customer.
5. Apply adoption rate assumption for SOM.

### 3.2 Example

Target: US restaurants with 10-100 employees.
Number of qualifying restaurants: 350,000 (Census Bureau, BLS data).
Average annual contract value: $3,600/year ($300/month).
TAM = 350,000 x $3,600 = $1.26B.
Realistic adoption in 5 years: 5%.
SOM = $1.26B x 0.05 = $63M.

### 3.3 Strengths and Weaknesses

**Strengths:** Grounded in unit economics, directly tied to business model, easier to validate with early traction data, more credible to sophisticated investors.
**Weaknesses:** Requires accurate customer counts and pricing assumptions. May undercount addressable customers. Does not capture market dynamics or expansion revenue.

---

## 4. Value-Theory Market Sizing

### 4.1 Methodology

Estimate market size based on the total value of the problem being solved rather than current spending on solutions.

**Process:**
1. Identify the core problem or inefficiency your product addresses.
2. Quantify the economic impact of the problem per customer (time wasted, revenue lost, cost incurred).
3. Estimate the number of entities experiencing the problem.
4. Calculate total problem value: Problem Value Per Entity x Number of Entities.
5. Apply value capture rate (typically 10-30% of value created can be captured as revenue).

### 4.2 Example

Problem: Manual invoice processing for mid-market companies.
Average cost of manual processing: $15 per invoice.
Average mid-market company processes: 10,000 invoices/year.
Problem cost per company: $150,000/year.
Number of US mid-market companies: 200,000.
Total problem value: $150,000 x 200,000 = $30B.
Value capture at 15%: $30B x 0.15 = $4.5B (SAM).

### 4.3 When to Use

Value-theory sizing is most appropriate for:
- New categories where no existing market data exists.
- Disruptive solutions that redefine how value is delivered.
- Products that replace manual processes or eliminate inefficiencies.
- Markets where current spending dramatically understates the opportunity.

---

## 5. Market Segmentation for Sizing

### 5.1 Segmentation Variables

**Firmographic (B2B):** Company size (employees, revenue), industry (NAICS/SIC codes), geography, ownership type (public, private, government), growth stage.

**Demographic (B2C):** Age, income, education, occupation, household size, urban/suburban/rural.

**Behavioral:** Usage frequency, purchase patterns, brand loyalty, price sensitivity, technology adoption stage (Rogers curve: innovators, early adopters, early majority, late majority, laggards).

**Psychographic:** Values, attitudes, lifestyle, interests. Harder to quantify but often more predictive of adoption than demographics.

**Needs-based:** Segments defined by the Job to be Done. Most strategically useful but requires primary research to identify.

### 5.2 Segmentation for TAM Refinement

Each segmentation layer narrows TAM toward SAM. The key discipline is making segmentation criteria explicit and evidence-based rather than aspirational.

**Bad segmentation:** "Our TAM is all businesses." (No filter applied.)
**Better segmentation:** "Our SAM is US-based B2B SaaS companies with 50-500 employees that currently use a competitor CRM." (Geographic + industry + size + behavioral filters.)

---

## 6. Growth Rate Estimation

### 6.1 Sources for Growth Estimates

- **Historical data:** Past growth rates of the same market. Available from industry reports.
- **Adjacent markets:** Growth rates of related or analogous markets at a similar lifecycle stage.
- **Technology adoption curves:** S-curve modeling based on Rogers diffusion theory.
- **Expert forecasts:** Analyst projections from Gartner, Forrester, IDC, CB Insights.
- **Leading indicators:** VC funding in the space, job postings, patent filings, Google Trends, startup activity.

### 6.2 Compound Annual Growth Rate (CAGR)

CAGR = (End Value / Start Value)^(1/n) - 1

Where n = number of years. CAGR smooths volatility and provides a consistent annual growth metric. Present market sizing with explicit CAGR assumptions and time horizons.

### 6.3 S-Curve Modeling

Markets follow an S-curve: slow initial adoption, rapid growth inflection, gradual saturation. Identifying where a market sits on the S-curve determines the appropriate growth assumption.

**Pre-inflection (0-15% adoption):** High uncertainty, potentially explosive growth.
**Growth phase (15-50%):** Fastest absolute growth, most competition.
**Maturation (50-85%):** Growth slowing, consolidation.
**Saturation (85%+):** Replacement demand only, flat to declining growth.

---

## 7. Market Attractiveness Scoring

### 7.1 Multi-Factor Assessment

| Factor | Weight | Score (1-5) | Weighted Score |
|--------|--------|-------------|----------------|
| Market size (SAM) | 20% | | |
| Growth rate (CAGR) | 15% | | |
| Competitive intensity | 15% | | |
| Barrier to entry | 10% | | |
| Customer willingness to pay | 15% | | |
| Regulatory environment | 10% | | |
| Strategic fit | 15% | | |
| **Total** | **100%** | | **/5.00** |

**Scoring guide:** 1 = Very unattractive, 2 = Unattractive, 3 = Neutral, 4 = Attractive, 5 = Very attractive.

### 7.2 Market Timing Assessment

Even attractive markets can be wrong-timed. Assess market readiness across these dimensions:

**Enabling technology:** Is the required technology mature enough? (Cloud, AI, mobile, etc.)
**Regulatory environment:** Are regulations enabling or blocking the solution?
**Customer readiness:** Are customers aware of the problem? Have they tried alternatives?
**Infrastructure:** Does necessary infrastructure exist? (Payment rails, API ecosystems, data availability.)
**Cultural acceptance:** Are social norms aligned with the solution? (Remote work, digital health, etc.)

---

## 8. Data Sources for Market Sizing

### 8.1 Government and Public Data

- **US Census Bureau:** Business patterns, economic census, population data.
- **Bureau of Labor Statistics (BLS):** Employment, wages, industry data.
- **SEC EDGAR:** Public company filings (10-K, 10-Q) with revenue, segment, and market data.
- **International:** Eurostat, World Bank, OECD, UN data.

### 8.2 Industry Reports

- **Gartner:** Technology markets, Magic Quadrants, Hype Cycles.
- **Forrester:** Technology and business strategy, Wave reports.
- **IDC:** IT spending, market share, forecasts.
- **Statista:** Cross-industry statistics, market forecasts.
- **CB Insights:** Startup funding, market maps, emerging technology.
- **IBISWorld:** Industry reports by NAICS code.
- **PitchBook / Crunchbase:** Funding data, company profiles, market maps.

### 8.3 Expert Interviews

When published data is insufficient, expert interviews fill gaps. Target: industry analysts, former executives in the space, investors specializing in the sector, trade association leaders. Structure interviews around specific unknowns rather than general impressions.

---

## 9. Presenting Market Sizing

### 9.1 Credibility Principles

1. **Show your math.** Every number must be traceable to a source or assumption.
2. **Triangulate.** Use both top-down and bottom-up. If they diverge wildly, investigate.
3. **State assumptions explicitly.** "Assuming 15% annual growth" is credible. Unstated growth is suspicious.
4. **Present ranges, not points.** "$800M-$1.2B" is more honest than "$1B."
5. **Use SOM for planning, TAM for vision.** Match the metric to the audience and purpose.

### 9.2 Market Sizing One-Pager Format

```
MARKET SIZING: [Product/Market Name]

TAM: $X.XB    (methodology, key source)
SAM: $X.XB    (filters applied, assumptions)
SOM: $XXM     (time horizon, market share assumption)
CAGR: XX%     (source, time period)

Top-Down Estimate: $X.XB SAM
Bottom-Up Estimate: $X.XB SAM
Triangulated Estimate: $X.XB SAM (±XX%)

Key Assumptions:
1. [Assumption + source]
2. [Assumption + source]
3. [Assumption + source]

Risks to Estimate:
- [What could make the market smaller]
- [What could make the market larger]
```

---

## 10. Market Sizing Quality Checklist

- [ ] TAM, SAM, and SOM are clearly distinguished
- [ ] At least two sizing methodologies are used (top-down + bottom-up)
- [ ] All data sources are cited with publication dates
- [ ] Growth rate assumptions are explicit with time horizons
- [ ] Segmentation criteria are evidence-based
- [ ] Results are presented as ranges with confidence levels
- [ ] Key assumptions are documented and testable
- [ ] Market attractiveness is assessed beyond size alone
- [ ] Timing assessment is included
- [ ] Presentation follows triangulation and credibility principles

---

**This document governs market sizing methodology and standards across all research brain operations.**
