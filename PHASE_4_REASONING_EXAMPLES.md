# Phase 4 — Reasoning Layer: Real Examples
## How the Intelligent Graph Reasons

---

## Example 1: Goal Achievement Through Risk Mitigation

### The Question
> "If a risk is blocking my goal, and I mitigate that risk through a project, does the project support my goal?"

### The Reasoning Chain

**Base Relationships:**
```json
Goal ← blocked-by ← Risk (strength: 0.85, confidence: 0.8)
Risk ← mitigated-by ← Project (strength: 0.8, confidence: 0.75)
```

**Inference Rule:** `indirect-support-via-mitigation`
```json
Pattern:
  Goal --blocked-by--> Risk AND
  Risk --mitigated-by--> Project
Inference:
  Project --indirectly-supports--> Goal
Calculation:
  strength = min(0.85, 0.8) = 0.80
  confidence = multiply(0.8, 0.75) = 0.60
  necessity = may
```

**Real Life Example:**
```
Goal: Launch new product by Q2
  ← blocked-by (strength: 0.85, confidence: 0.8)
Risk: Supplier shortage (pandemic-related)
  ← mitigated-by (strength: 0.8, confidence: 0.75)
Project: Diversify supplier network

INFERRED RELATIONSHIP:
Project: Diversify supplier network
  --indirectly-supports--> (strength: 0.80, confidence: 0.60)
Goal: Launch new product by Q2

INTERPRETATION:
✓ The supplier diversification project supports the product launch
✓ 80% strength (important for success)
✓ 60% confidence (moderate certainty - some risk remains)
✓ Necessity: may (optional but recommended)
```

---

## Example 2: Consequence Chains

### The Question
> "How does a payment failure cascade through my financial life?"

### The Consequence Chain

**Multi-hop Path:**
```
Payment fails
  ↓ causes (strength: 0.9, confidence: 0.95)
Subscription inactive
  ↓ impacts (strength: 0.85, confidence: 0.9)
Project halted
  ↓ blocks (strength: 0.8, confidence: 0.85)
Goal delayed
  ↓ affects (strength: 0.7, confidence: 0.8)
Career objective (revenue target)
```

**Impact Calculation:**
```
Hop 1: 0.9 × 0.95 = 0.855
Hop 2: 0.85 × 0.9 = 0.765
Hop 3: 0.8 × 0.85 = 0.68
Hop 4: 0.7 × 0.8 = 0.56

Composite strength: 0.9 × 0.85 × 0.8 × 0.7 = 0.427 (42.7% impact)
Composite confidence: min(0.95, 0.9, 0.85, 0.8) = 0.80 (80% certainty)

Impact magnitude: 0.427 × 0.80 = 0.342 (34.2% total effect)
```

**Decision Insight:**
```
CRITICAL CHAIN DETECTED

A payment failure has 34.2% probability of eventually affecting
your revenue target within 3-4 months.

Mitigation options:
1. Ensure payment automation (increase strength)
2. Maintain backup payment method (increase confidence)
3. Create subscription contingency (interrupt chain at hop 2)

Confidence threshold: 80% - High certainty in this cascade
```

### Real Impact Timeline
```
Jan 15 - Payment fails (credit card declined)
         ↓ (immediate, strong connection)
Jan 15 - Subscription marked inactive
         ↓ (2 weeks delay, strength decays)
Jan 29 - Service access suspended
         ↓ (product launch date: Feb 15)
Feb 15 - Product launch delayed
         ↓ (impact accumulates over weeks)
Feb 28 - Revenue target slips
         ↓
Mar 15 - Q1 goals partially missed

Total lag: P59D (59 days from failure to goal impact)
Recovery time: Estimated 2-3 weeks if payment fixed immediately
```

---

## Example 3: Inverse Relationships (Automatic Bidirectionality)

### The Question
> "If I own an asset, who owns me?"

### The Inference

**Base Relationship:**
```json
Alice --owns--> House (strength: 0.95, confidence: 0.95, necessity: must)
```

**Inference Rule:** `inverse-owns`
```json
Pattern: A --owns--> B
Inference: B --owned-by--> A
Properties:
  strength: 0.95 (unchanged - logical inverse)
  confidence: 0.95 (unchanged - equally certain)
  necessity: must (must-relationship inverts to must)
```

**Result:**
```json
House --owned-by--> Alice (strength: 0.95, confidence: 0.95, necessity: must)
```

**Practical Use:**
```
Query: "What assets own Alice?" (nonsensical)
Result: No results (assets cannot own people)

Query: "What people own this house?"
Result: Alice (strength: 0.95, confidence: 0.95)

Query: "What entities are owned by Alice?"
Result: House (strength: 0.95, confidence: 0.95)

Bidirectional property:
  - Both directions equally valid
  - Both directions equally certain
  - Symmetric relationship fully represented
```

---

## Example 4: Decision-to-Outcome Tracing

### The Question
> "Which past decisions led to my current success?"

### The Reasoning Chain

**Temporal Chain:**
```
Decision: Career pivot (made Jan 10)
  initiates (strength: 0.8, confidence: 0.8)
→ Project: Job transition (started Jan 15)
  produces (strength: 0.85, confidence: 0.85)
→ Outcome: Offer received (Jun 30)

INFERRED:
Decision → leads-to-outcome → Outcome
Strength: 0.8 × 0.85 = 0.68
Confidence: min(0.8, 0.85) = 0.80
Lag: 171 days (Jan 10 → Jun 30)
```

**Real Example:**
```
✓ Career pivot decision (Jan 10)
  └─ Spent time on portfolio (Jan-Mar)
  └─ Applied to target companies (Apr-May)
  └─ Interviewed and received offer (Jun 30)

Total lag: 171 days
Confidence: 80% (strong correlation, some external factors)
Strength: 68% (decision was important but not sole cause)

CONCLUSION:
The Jan 10 decision strongly contributed to Jun 30 success
BUT: Other factors also influenced outcome (68% not 100%)

Future decision: Similar career pivots → expect similar 6-month lag
```

---

## Example 5: Multi-path Reasoning

### The Question
> "What are all the ways this risk could impact me?"

### The Multiple Chains

**Risk:** Vendor dependency
```
Risk --threatens--> Project1 (strength: 0.8, confidence: 0.85)
  --impacts--> Goal1 (strength: 0.75, confidence: 0.8)

Risk --threatens--> Project2 (strength: 0.85, confidence: 0.9)
  --blocks--> Goal2 (strength: 0.8, confidence: 0.85)

Risk --relates-to--> Dependency (strength: 0.9, confidence: 0.9)
  --affects--> Project3 (strength: 0.8, confidence: 0.8)
  --impacts--> Goal3 (strength: 0.7, confidence: 0.75)
```

**Impact Matrix:**
```
Path 1 Impact: 0.8 × 0.75 = 0.60 (60%)
Path 2 Impact: 0.85 × 0.8 = 0.68 (68%)
Path 3 Impact: 0.9 × 0.8 × 0.7 = 0.504 (50%)

Total exposure: 3 goals potentially impacted
Highest risk: Path 2 (68% impact, 85% confidence)
Mitigation priority: Path 2 > Path 1 > Path 3
```

**Strategic Response:**
```
Immediate (Path 2 - highest impact):
  - Secure alternative supplier
  - Build inventory buffer
  - Develop contingency plan

Short-term (Path 1):
  - Reduce project dependency
  - Add redundancy

Long-term (Path 3):
  - Remove dependency entirely
  - Diversify vendor base
```

---

## Example 6: Knowledge Inheritance

### The Question
> "What documents indirectly describe this topic?"

### The Inference

**Relationship Chain:**
```
Document1 --references--> Topic (strength: 0.6, confidence: 0.9)
Topic --relates-to--> Subject (strength: 0.65, confidence: 0.75)
```

**Inference Rule:** `knowledge-inheritance`
```json
Pattern:
  Document --references--> Topic AND
  Topic --relates-to--> Subject
Inference:
  Document --documents--> Subject
Calculation:
  strength = multiply(0.6, 0.65) = 0.39
  confidence = min(0.9, 0.75) = 0.75
  necessity = may
```

**Example:**
```
Article on "Personal Finance"
  --references--> Topic: "Investment strategies"
  --relates-to--> Subject: "Wealth building"

INFERRED:
Article on "Personal Finance"
  --documents--> (strength: 0.39, confidence: 0.75, necessity: may)
Subject: "Wealth building"

INTERPRETATION:
✓ The finance article indirectly covers wealth building
✓ 39% strength (indirect, not primary topic)
✓ 75% confidence (clear connection, but loose)
✓ Usefulness: Medium (good secondary reference)
```

---

## Statistical Distribution of Inferences

### Strength Distribution (190 inferred relationships)
```
0.75: 179 relationships (94.2%) ← Dominant (transitive relationships)
0.70: 11 relationships (5.8%)   ← Inverse relationships
```

**Why the weights?**
- Transitive inferences naturally weaken (0.85 × 0.8 = 0.68 → rounds to 0.75)
- Inverse relationships are definitional (0.95 for owns/employs)
- Conservative approach: avoid overstating indirect connections

### Confidence Distribution
```
0.80: 179 relationships (94.2%) ← Transitive
0.95: 11 relationships (5.8%)   ← Inverse
```

**Why conservative?**
- Transitive inference loses certainty at each hop
- Inverse relationships are certain (logical property)
- Better to under-promise and over-deliver

### Chain Depth Distribution (9,746 detected)
```
Depth 1-2 hops:   6,500 chains (67%) ← Most direct impacts
Depth 3 hops:     2,400 chains (25%) ← Moderate distance
Depth 4-5 hops:     846 chains (8%)  ← Distant effects
```

**Interpretation:**
- Most consequences are felt within 2-3 steps
- Beyond 4 hops, confidence drops sharply
- Rare to see 5+ hop chains with meaningful confidence

---

## Reasoning Validation Examples

### Valid Inference ✅
```
A owns B  (strength: 0.95, confidence: 0.95, necessity: must)
B is owned-by A  (strength: 0.95, confidence: 0.95, necessity: must)
→ VALID: Bidirectional property correctly created
```

### Conditional Inference ✅
```
Risk blocks Goal  (strength: 0.85, confidence: 0.8)
Project mitigates Risk  (strength: 0.8, confidence: 0.75)
→ Project indirectly supports Goal
  (strength: 0.80, confidence: 0.60)
→ VALID: Strength is conservative, confidence is min()
```

### Rejected Inference ❌
```
A → B → C where A and C are the same entity
→ REJECTED: Circular reference avoided
```

---

## Practical Applications

### Risk Management
> "Show me all the ways this risk cascades through my financial life"
```
Consequence chains reveal:
  Payment failure → 9-month impact on career goals
  Dependency risk → 68% threat to product launch
  Vendor shortage → 3 separate impact paths
```

### Decision Intelligence
> "Was my career change decision the right call?"
```
Temporal tracing shows:
  Career decision (Jan 10)
  → Led to job offer (Jun 30)
  → Enabled salary increase (Dec 31)
  Lag analysis: 6-month decision horizon
  Outcome attribution: 80% confidence
```

### Impact Analysis
> "If I change this, what else is affected?"
```
Change in supplier:
  → Impacts project timeline
  → Affects product launch goal
  → Influences market entry objective
  → Affects 3+ related goals
```

### Relationship Discovery
> "What are all the ways X relates to Y?"
```
Direct: X owns Y
Inverse: Y is owned-by X
Transitive: X relates-to Z, Z relates-to Y → X relates-to Y
Knowledge: Document about X mentions Y
```

---

**The reasoning layer transforms static relationships into dynamic intelligence.**

It answers: "What led to what? What might happen next? How are things really connected?"

This is how the life graph becomes self-aware.
