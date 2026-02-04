# Financial Model Template

## Purpose

A structured template for building SaaS/subscription financial models. Adapt for marketplace, e-commerce, or other business models as needed.

---

## 1. Model Structure

### Tab Organization

```
Tab 1: Assumptions (all inputs in one place)
Tab 2: Revenue Model
Tab 3: Cost Model (COGS + OpEx)
Tab 4: Income Statement
Tab 5: Balance Sheet
Tab 6: Cash Flow Statement
Tab 7: Unit Economics
Tab 8: Valuation
Tab 9: Sensitivity Analysis
Tab 10: Dashboard (charts and KPIs)
```

---

## 2. Assumptions Tab

### Revenue Assumptions

```
CUSTOMER ACQUISITION
───────────────────────────────────────────
New Customers/Month (Year 1):       [Input]
Customer Growth Rate (MoM):         [Input]
Organic % of New Customers:         [Input]%
Paid % of New Customers:            [Input]%

PRICING
───────────────────────────────────────────
Starter Plan Price (Monthly):       $[Input]
Pro Plan Price (Monthly):           $[Input]
Enterprise Plan Price (Monthly):    $[Input]
Mix: Starter / Pro / Enterprise:    [__]% / [__]% / [__]%

RETENTION AND EXPANSION
───────────────────────────────────────────
Monthly Logo Churn Rate:            [Input]%
Monthly Revenue Churn Rate:         [Input]%
Monthly Expansion Rate:             [Input]%
Net Revenue Retention (Monthly):    [Calculated]%
Net Revenue Retention (Annual):     [Calculated]%
```

### Cost Assumptions

```
COST OF GOODS SOLD
───────────────────────────────────────────
Hosting/Infrastructure (% of Rev):  [Input]%
Customer Support (% of Rev):        [Input]%
Payment Processing (%):             [Input]%
Other COGS (% of Rev):              [Input]%
Target Gross Margin:                [Calculated]%

OPERATING EXPENSES
───────────────────────────────────────────
Average Salary (Engineering):       $[Input]
Average Salary (Sales):             $[Input]
Average Salary (Marketing):         $[Input]
Average Salary (G&A):               $[Input]
Fully-Loaded Cost Multiplier:       [Input]x (typically 1.2-1.4x)

HIRING PLAN
───────────────────────────────────────────
           Q1    Q2    Q3    Q4
Eng        [__]  [__]  [__]  [__]
Sales      [__]  [__]  [__]  [__]
Marketing  [__]  [__]  [__]  [__]
G&A        [__]  [__]  [__]  [__]
Total HC   [__]  [__]  [__]  [__]
```

---

## 3. Revenue Model

### Monthly Revenue Build

```
Month:                           M1      M2      M3    ...   M12
──────────────────────────────────────────────────────────────────
CUSTOMERS
Beginning Customers              [__]    [__]    [__]        [__]
+ New Customers                  [__]    [__]    [__]        [__]
- Churned Customers              [__]    [__]    [__]        [__]
= Ending Customers               [__]    [__]    [__]        [__]

MRR
Beginning MRR                    $[__]   $[__]   $[__]       $[__]
+ New MRR                        $[__]   $[__]   $[__]       $[__]
+ Expansion MRR                  $[__]   $[__]   $[__]       $[__]
- Churned MRR                    $[__]   $[__]   $[__]       $[__]
- Contraction MRR                $[__]   $[__]   $[__]       $[__]
= Ending MRR                     $[__]   $[__]   $[__]       $[__]

ARR (MRR x 12)                  $[__]   $[__]   $[__]       $[__]
Net New ARR                      $[__]   $[__]   $[__]       $[__]
```

### Annual Revenue Summary

```
                Year 1    Year 2    Year 3    Year 4    Year 5
──────────────────────────────────────────────────────────────
Ending Customers [__]      [__]      [__]      [__]      [__]
Ending ARR       $[__]    $[__]    $[__]    $[__]    $[__]
Total Revenue    $[__]    $[__]    $[__]    $[__]    $[__]
YoY Growth       N/A      [__%]    [__%]    [__%]    [__%]
```

---

## 4. Income Statement

```
                        Year 1    Year 2    Year 3    Year 4    Year 5
──────────────────────────────────────────────────────────────────────
Revenue                  $[__]    $[__]    $[__]    $[__]    $[__]

COGS
  Hosting/Infra          ($__)    ($__)    ($__)    ($__)    ($__)
  Support                ($__)    ($__)    ($__)    ($__)    ($__)
  Payment Processing     ($__)    ($__)    ($__)    ($__)    ($__)
Total COGS               ($__)    ($__)    ($__)    ($__)    ($__)

GROSS PROFIT             $[__]    $[__]    $[__]    $[__]    $[__]
Gross Margin             [__%]    [__%]    [__%]    [__%]    [__%]

OPERATING EXPENSES
  Engineering            ($__)    ($__)    ($__)    ($__)    ($__)
  Sales                  ($__)    ($__)    ($__)    ($__)    ($__)
  Marketing              ($__)    ($__)    ($__)    ($__)    ($__)
  G&A                    ($__)    ($__)    ($__)    ($__)    ($__)
Total OpEx               ($__)    ($__)    ($__)    ($__)    ($__)

EBITDA                   ($__)    $[__]    $[__]    $[__]    $[__]
EBITDA Margin            [__%]    [__%]    [__%]    [__%]    [__%]

D&A                      ($__)    ($__)    ($__)    ($__)    ($__)
Interest                 ($__)    ($__)    ($__)    ($__)    ($__)
Taxes                    ($__)    ($__)    ($__)    ($__)    ($__)

NET INCOME               ($__)    $[__]    $[__]    $[__]    $[__]
Net Margin               [__%]    [__%]    [__%]    [__%]    [__%]
```

---

## 5. Unit Economics Tab

```
UNIT ECONOMICS DASHBOARD
──────────────────────────────────────────
CAC (Blended)           $[__]
CAC (Paid)              $[__]
CAC (Organic)           $[__]

LTV                     $[__]
LTV:CAC Ratio           [__]:1

CAC Payback (months)    [__]

ARPU (Monthly)          $[__]
ARPU (Annual)           $[__]

Gross Margin            [__%]

Contribution Margin     [__%]

Magic Number            [__]
  = Net New ARR / Prior Quarter S&M Spend

SaaS Quick Ratio        [__]
  = (New + Expansion MRR) / (Churned + Contraction MRR)

Rule of 40              [__]
  = Revenue Growth % + EBITDA Margin %

Burn Multiple           [__]
  = Net Burn / Net New ARR
```

---

## 6. Valuation Tab

```
DCF VALUATION
──────────────────────────────────────────
WACC:                    [__%]
Terminal Growth Rate:    [__%]
Terminal Multiple:       [__]x EBITDA

Explicit Period FCF:     $[__]
Terminal Value:          $[__]
Enterprise Value:        $[__]

Less: Net Debt           ($__)
Equity Value:            $[__]

COMPARABLE VALUATION
──────────────────────────────────────────
EV/ARR Multiple:         [__]x
Implied Valuation:       $[__]

EV/Revenue Multiple:     [__]x
Implied Valuation:       $[__]
```

---

## 7. Sensitivity Analysis Tab

### Revenue Sensitivity

```
                Monthly Churn Rate
               0.5%    1.0%    1.5%    2.0%    2.5%
New Custs/Mo
50              $[__]   $[__]   $[__]   $[__]   $[__]
100             $[__]   $[__]   $[__]   $[__]   $[__]
150             $[__]   $[__]   $[__]   $[__]   $[__]
200             $[__]   $[__]   $[__]   $[__]   $[__]
```

### Valuation Sensitivity

```
                    WACC
               8%      10%     12%     14%
g = 2%        $[__]   $[__]   $[__]   $[__]
g = 3%        $[__]   $[__]   $[__]   $[__]
g = 4%        $[__]   $[__]   $[__]   $[__]
```

---

## 8. Best Practices

### Model Hygiene
1. All inputs in one tab (Assumptions), color-coded (blue font = input)
2. No hardcoded numbers in formula cells
3. Formulas reference assumptions tab
4. Clear labeling of all rows and columns
5. Consistent time periods (monthly Year 1, quarterly Years 2-3, annual Years 4-5)
6. Version control (save dated versions)

### Presentation
1. Always present ranges, not point estimates
2. Include base, upside, and downside cases
3. Highlight key assumptions that drive >80% of variance
4. Stress-test: what if growth is 50% of plan? What if churn doubles?
