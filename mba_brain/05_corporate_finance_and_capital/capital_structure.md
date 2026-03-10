# Capital Structure Theory — From Modigliani-Miller to Practice

## What This Enables

**Decisions it helps make:**
- How much debt should the company take on?
- What is the optimal mix of debt and equity?
- When should we raise debt vs. equity?
- How does capital structure affect valuation?

---

## 1. Modigliani-Miller Theorem I — Capital Structure Irrelevance

### 1.1 Assumptions

*Citation: Modigliani, F., & Miller, M. H. (1958). The cost of capital, corporation finance and the theory of investment. American Economic Review, 48(3), 261-297.*

In a perfect capital market (no taxes, no bankruptcy costs, no agency costs, no information asymmetry):

**Proposition I:** The market value of a firm is independent of its capital structure.

```
V_L = V_U
```

### 1.2 Proof by Arbitrage

Consider two firms with identical operating cash flows X:
- Firm U: all-equity financed, value V_U
- Firm L: partially debt-financed (debt D, equity E_L), value V_L = D + E_L

**Case 1: Suppose V_L > V_U**

An investor holding fraction alpha of Firm L's equity receives alpha(X - rD).

Alternative: Borrow alpha*D personally, buy alpha of Firm U's equity.
- Pays: alpha*V_U - alpha*D (net investment)
- Receives: alpha*X - alpha*rD (same cash flow)
- Arbitrage if alpha*V_U - alpha*D < alpha*E_L, i.e., V_U < V_L

Investors sell Firm L equity, buy Firm U equity with homemade leverage, driving V_L down and V_U up until V_L = V_U.

**Case 2: Suppose V_U > V_L** — Symmetric argument.

### 1.3 Implication

Capital structure is irrelevant because investors can replicate any leverage ratio on their own ("homemade leverage"). The firm's choice of debt vs. equity does not create value.

---

## 2. MM Proposition II — Cost of Equity and Leverage

### 2.1 Statement

```
r_E = r_A + (D/E)(r_A - r_D)
```

where:
- r_E = cost of equity
- r_A = unlevered cost of capital (cost of assets)
- r_D = cost of debt
- D/E = debt-to-equity ratio

### 2.2 Derivation

Since V_L = V_U, the weighted average cost of capital equals the unlevered cost:

```
WACC = (E/V)r_E + (D/V)r_D = r_A
```

Solving for r_E:

```
r_E = r_A + (D/E)(r_A - r_D)
```

### 2.3 Interpretation

As leverage (D/E) increases:
- Cost of equity r_E increases linearly
- WACC remains constant at r_A
- The "cheaper" debt is exactly offset by more expensive equity
- There is no free lunch from leverage (in perfect markets)

---

## 3. MM with Corporate Taxes

### 3.1 Tax Shield

*Citation: Modigliani, F., & Miller, M. H. (1963). Corporate income taxes and the cost of capital: A correction. American Economic Review, 53(3), 433-443.*

Interest payments are tax-deductible. The tax shield from debt creates value.

**Modified Proposition I:**

```
V_L = V_U + tau_C * D
```

For perpetual debt: PV(tax shield) = tau_C * D

### 3.2 Modified WACC

```
WACC = (E/V)r_E + (D/V)r_D(1 - tau_C)
```

WACC now decreases as leverage increases (due to the tax benefit of debt). This implies 100% debt is optimal — which is clearly unrealistic.

### 3.3 Missing Ingredient: Costs of Financial Distress

The 100% debt result fails because it ignores:
1. Direct bankruptcy costs (legal fees, administrative costs: 3-5% of firm value)
2. Indirect bankruptcy costs (lost customers, suppliers, employees: 10-25% of firm value)
3. Agency costs of debt (risk-shifting, underinvestment)
4. Loss of financial flexibility

---

## 4. Trade-Off Theory

### 4.1 Static Trade-Off

*Citation: Kraus, A., & Litzenberger, R. H. (1973). A state-preference model of optimal financial leverage. Journal of Finance, 28(4), 911-922.*

Optimal capital structure balances the marginal benefit of debt (tax shield) against the marginal cost (financial distress):

```
V_L = V_U + PV(Tax Shield) - PV(Financial Distress Costs)
```

**Optimal D* maximizes V_L:** The point where the marginal tax benefit equals the marginal increase in expected distress costs.

### 4.2 Factors Affecting Optimal Leverage

| Factor | Effect on Optimal Debt | Reasoning |
|--------|----------------------|-----------|
| Higher tax rate | More debt | Greater tax shield value |
| More tangible assets | More debt | Higher liquidation value, lower distress costs |
| More stable cash flows | More debt | Lower probability of distress |
| Higher growth opportunities | Less debt | Growth options destroyed by distress |
| Higher profitability | Less debt (often) | Less need for external financing |
| More unique products | Less debt | Customers bear greater risk in distress |

### 4.3 Empirical Support

Trade-off theory explains:
- Cross-industry variation in leverage (airlines vs. software)
- Positive leverage and tangibility relationship
- Target leverage behavior (firms revert toward targets)

Trade-off theory fails to explain:
- Most profitable firms often have least debt (pecking order prediction)
- Firms do not respond to tax changes as quickly as predicted
- Many firms maintain leverage well below apparent optimum

---

## 5. Pecking Order Theory

### 5.1 Theory

*Citation: Myers, S. C., & Majluf, N. S. (1984). Corporate financing and investment decisions when firms have information that investors do not have. Journal of Financial Economics, 13(2), 187-221.*

Under asymmetric information, managers know more about firm value than outside investors. This creates adverse selection in financing:

**Equity issuance signals overvaluation:** If managers issue equity, rational investors infer the stock may be overpriced, causing a price decline.

### 5.2 The Pecking Order

Firms prefer financing sources that minimize information asymmetry costs:

```
1. Internal funds (retained earnings) — No asymmetric information
2. Debt — Low information sensitivity (fixed claims)
3. Hybrid (convertible debt) — Moderate sensitivity
4. Equity — Highest information sensitivity
```

### 5.3 Formal Logic

**Myers-Majluf underinvestment problem:**

A firm with assets-in-place worth A and an investment opportunity with NPV > 0. If the firm must issue equity to finance the investment:

- If A_true > A_market (undervalued), managers prefer not to issue (dilutes existing shareholders)
- If A_true < A_market (overvalued), managers prefer to issue (existing shareholders benefit)

Rational investors anticipate this and discount new equity issues. This creates an "adverse selection discount" that can make positive-NPV projects unattractive, leading to underinvestment.

**Solution:** Use internal funds or low-information-sensitivity securities (debt) to avoid the adverse selection problem.

### 5.4 Empirical Evidence

Pecking order explains:
- Profitable firms have less debt (they use internal funds)
- Firms time equity issuance to periods of high stock prices
- Stock price decline on equity issuance announcement (average: -2 to -3%)

---

## 6. WACC Optimization in Practice

### 6.1 Steps to Determine Optimal Capital Structure

1. **Start with industry benchmarks** — Most firms in an industry face similar optimal leverage
2. **Assess cash flow stability** — Higher stability supports more debt
3. **Evaluate asset tangibility** — More tangible assets = higher debt capacity
4. **Consider growth plans** — High growth = lower optimal leverage
5. **Test coverage ratios** — Ensure interest coverage > 3x under stress scenarios
6. **Model rating agency thresholds** — Understand how leverage affects credit ratings
7. **Factor in financial flexibility** — Reserve capacity for future needs

### 6.2 Debt Capacity Analysis

```
Maximum Debt = EBITDA x Maximum Leverage Multiple (industry-dependent)

Typical ranges:
- Investment grade: 2-3x EBITDA
- High yield: 4-5x EBITDA
- Leveraged buyout: 5-7x EBITDA
```

**Stress test:** Model debt service under downside scenarios (revenue decline 20-30%, margin compression). Can the company still service debt?

---

## 7. Capital Structure for Startups

### 7.1 Why Startups Use Equity

Startups violate most conditions that favor debt:
- Unstable/negative cash flows (can't service fixed payments)
- Intangible assets (low liquidation value)
- High growth options (destroyed by distress)
- High uncertainty (probability of distress is high)

### 7.2 When Startups Should Consider Debt

- **Venture debt:** After equity round, to extend runway 6-12 months without dilution
- **Revenue-based financing:** For companies with predictable recurring revenue
- **Asset-backed lending:** For companies with receivables or inventory
- **Growth capital debt:** For unit-economics-positive businesses scaling proven models

### 7.3 Conversion Between Debt and Equity

**Convertible notes and SAFEs** are hybrid instruments:
- Behave like debt initially (creditor claim)
- Convert to equity at a later financing event
- Bridge the gap when equity valuation is uncertain

---

## Key Citations

- Harris, M., & Raviv, A. (1991). The theory of capital structure. *Journal of Finance*, 46(1), 297-355.
- Kraus, A., & Litzenberger, R. H. (1973). A state-preference model of optimal financial leverage. *Journal of Finance*, 28(4), 911-922.
- Modigliani, F., & Miller, M. H. (1958). The cost of capital, corporation finance and the theory of investment. *American Economic Review*, 48(3), 261-297.
- Modigliani, F., & Miller, M. H. (1963). Corporate income taxes and the cost of capital. *American Economic Review*, 53(3), 433-443.
- Myers, S. C. (1984). The capital structure puzzle. *Journal of Finance*, 39(3), 575-592.
- Myers, S. C., & Majluf, N. S. (1984). Corporate financing and investment decisions when firms have information that investors do not have. *Journal of Financial Economics*, 13(2), 187-221.
