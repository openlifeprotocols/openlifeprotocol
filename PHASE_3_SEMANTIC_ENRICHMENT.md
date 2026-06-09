# Phase 3: Semantic Enrichment

## Strategic Transition

**We just achieved Phase 2 completion:**
- ✅ 0 governance violations
- ✅ 811 schemas properly classified
- ✅ 51 governed relationship predicates
- ✅ Automated audit system

**Now entering Phase 3:**
- From: *"Does the structure follow the rules?"*
- To: *"Can the system understand and reason over this knowledge?"*

## The Core Insight

### What the Metrics Reveal

```
Governance Score:        10/10 ✅ (Perfect)
Semantic Richness Score: 0.3/10 ⚠️ (Nearly empty)
```

**These are orthogonal problems.**

- **Governance** = Rules enforcement (SOLVED ✅)
- **Semantics** = Knowledge density (STARTING NOW 🚀)

### The Gap

```
722 canonical schemas
vs.
32 semantic descriptions

The structure is governed.
The meaning is still sparse.
```

## Current State (Phase 3 Baseline)

### Semantic Coverage Metrics

| Dimension | Count | Target | Gap |
|-----------|-------|--------|-----|
| Semantic Descriptions | 32/811 | 100 | 68 remaining |
| Lifecycle Links | 27/811 | 100 | 73 remaining |
| Relationship Definitions | 15/811 | 100 | 85 remaining |
| Life Domain Mappings | 15/811 | 100 | 85 remaining |
| **Fully Enriched** | **15/811** | **100** | **85 remaining** |

### Tier 1 Critical Concepts Status

**Fully Enriched (10/25):**
- ✅ actor, decision, document, goal, opportunity, organisation, payment, project, relationship, risk

**Partially Enriched (7/25):**
- 📖 + ⏱️ only: asset, certification, contract, event, invoice, milestone, workflow
- Missing: relationships + life domains

**Missing Enrichment (8/25):**
- 📖 only: customer, employee, mentor, contractor, deliverable, note, resource-allocation, startup
- Missing: lifecycle + relationships + life domains

## Phase 3 Strategy

### Four Parallel Enrichment Tracks

#### Track A: Semantic Descriptions (32 → 100)

**What:** AI-readable intent statements for each schema

**Pattern:**
```
"{Entity} is a {type} that {purpose} and {measurable_outcome}."
```

**Examples:**
- Document: "A recorded artifact containing information, evidence, or communication"
- Goal: "A desired future outcome pursued by an actor and measured through progress"
- Project: "Organized effort with defined scope, timeline, and deliverables"
- Decision: "A choice point with alternatives evaluated and selected"

**Why:** Without this, AI sees only property names, not understanding.

**Target Timeline:** Week 1-2 of Phase 3

---

#### Track B: Lifecycle Links (27 → 100)

**What:** Connecting schemas to their state machines

**Pattern:**
```
schema-name → {schema_name}-lifecycle.schema.json
```

**Required for High-Confidence Relationships:**
- payment-lifecycle (financial integrity)
- milestone-lifecycle (project tracking)
- goal-lifecycle (outcome measurement)
- decision-lifecycle (reasoning audit)

**Why:** Enables temporal reasoning and consequence tracking.

**Target Timeline:** Week 2-3 of Phase 3

---

#### Track C: Relationship Definitions (15 → 100)

**What:** Mapping which schemas connect to which

**Pattern:**
```json
{
  "target": "project",
  "type": "fulfills",
  "cardinality": "many",
  "required": true,
  "reasoning": "Goals are achieved through projects"
}
```

**High-Value Relationships:**
- goal → project (fulfills)
- project → milestone (contains)
- milestone → deliverable (produces)
- actor → organisation (works-for/employs)
- decision → outcome (produces)

**Why:** Builds the reasoning graph. Enables inference chains.

**Target Timeline:** Week 3-4 of Phase 3

---

#### Track D: Life Domain Mappings (15 → 100)

**What:** Cross-domain connection points for holistic reasoning

**Strategy:**
- Each schema maps to 1-3 life domains max (specialization)
- Avoid "everything everywhere" (kills reasoning precision)
- Select 1 canonical schema per domain as "hub"

**Domain Hubs (20 schemas):**
- person (person)
- relationship (relationships)
- health-record (health)
- learning-record (learning)
- job (career)
- asset (wealth)
- property (property)
- vehicle (mobility)
- digital-account (digital-life)
- media (culture)
- project/creative-project (creativity)
- community-group (community)
- event/milestone (life-story)
- goal (planning)
- document (administration)
- calendar-event (time)
- opportunity (opportunities)
- risk (risks)
- public-profile (public-presence)
- organisation/startup (enterprise)

**Why:** Enables holistic Life Graph reasoning instead of siloed domains.

**Target Timeline:** Week 4-5 of Phase 3

---

### Enrichment Priority Tiers

#### Tier 1: Critical Concepts (25 schemas)

**Tier 1A (Ready for Enrichment)** - Already have semantic descriptions:
- document, project, goal, risk, opportunity, decision, relationship, actor, payment, organisation, asset

**Tier 1B (Need Completion)** - Partial enrichment:
- customer, employee, mentor, contractor (need: lifecycle, relationships, domains)
- certification, contract, invoice, note (need: relationships, domains)
- event, workflow, deliverable, milestone (need: relationships, domains)
- resource-allocation, startup (need: lifecycle, relationships, domains)

**Enrichment Sequence:**
1. Tier 1A: Add relationships + domains (weeks 1-2)
2. Tier 1B: Complete all 4 dimensions (weeks 2-4)
3. Tier 1 = 100% enriched (baseline for Phase 4)

#### Tier 2: Infrastructure Concepts (9 schemas)

**Schemas:**
- tag, classification, status, reference, identifier, evidence, provenance, timeline, location

**Special Status:**
- Currently classified as "supporting" (graphImportance)
- Should be reclassified as "utility" (infrastructure)
- Require minimal semantic enrichment
- Focus on relationships to schemas that use them

**Example (tag):**
```json
{
  "schema": "tag",
  "semanticDescription": "A label or keyword used to categorize and retrieve entities",
  "lifeDomains": [],
  "graphImportance": "utility",
  "relationships": [
    {
      "target": "*",
      "type": "classifies",
      "cardinality": "many"
    }
  ]
}
```

#### Tier 3: Domain Hubs & Coverage (100+ schemas)

**Strategy:**
1. Enrich 1 schema per life domain (20 hubs)
2. For each hub, enrich all related schemas in that domain
3. Creates semantic "islands" that connect via domains

**Example Domain (Career):**
- Hub: job
- Connected: project (in career), goal (career goals), organisation (employer), resource-allocation, milestone
- Enriched sequence: job → domain hub + relationships → project → goal → milestone

---

## Semantic Enrichment Template

### Minimal Enrichment (Semantic + Domain)

```json
{
  "schema": "goal",
  "semanticDescription": "A desired future outcome pursued by an actor and measured through progress over time",
  "lifeDomains": ["life-story", "planning"],
  "graphImportance": "supporting"
}
```

### Complete Enrichment (All 4 Dimensions)

```json
{
  "schema": "goal",
  
  "semanticDescription": "A desired future outcome pursued by an actor and measured through progress over time. Goals provide direction for activities and enable outcome-based reasoning.",
  
  "lifecycle": "goal-lifecycle",
  
  "relationships": [
    {
      "target": "actor",
      "type": "pursues",
      "cardinality": "many",
      "required": true,
      "reasoning": "Goals are pursued by one or more agents (individuals or teams)"
    },
    {
      "target": "project",
      "type": "fulfilled-by",
      "cardinality": "many",
      "reasoning": "Goals are achieved through coordinated projects"
    },
    {
      "target": "milestone",
      "type": "advances",
      "cardinality": "many",
      "reasoning": "Milestones represent measurable progress toward goal achievement"
    },
    {
      "target": "decision",
      "type": "enables",
      "cardinality": "many",
      "reasoning": "Decisions shape which goals are pursued and how they're achieved"
    }
  ],
  
  "lifeDomains": ["life-story", "planning"],
  
  "graphImportance": "core",
  
  "semanticNotes": "Enable inference chains: actor pursuing goal → project fulfills goal → milestones advance goal → decisions enable achievement. Temporal reasoning: goals have start/end dates, can track progress percentage."
}
```

---

## Reasoning Capabilities Unlocked

### Without Semantic Enrichment

```
Q: What is a goal?
A: Schema found. Properties: name, description, status.

Q: How do goals relate to my career?
A: No connections defined.

Q: Can you find goals that are blocked by risks?
A: Cannot execute. No relationship definitions.
```

### With Full Semantic Enrichment

```
Q: What is a goal?
A: A desired outcome pursued by an actor and measured through progress. 
   Part of: life-story, planning domains.
   Connected to: projects (fulfills), milestones (advances), decisions (enable)

Q: How do goals relate to my career?
A: Career goals (domain: career) are pursued through career projects and 
   measured via professional milestones.

Q: Can you find goals blocked by risks?
A: Yes. Scanning goals → detecting risk dependencies → showing blockers
   [List of 3 career goals at risk from external factors]
```

---

## Phase 3 → Phase 4 Bridge

### What Phase 3 Delivers

1. **Semantic Vocabulary** - 100+ concepts with clear meaning
2. **Reasoning Foundations** - Relationships defining how things connect
3. **Lifecycle Models** - Temporal understanding of state changes
4. **Cross-Domain Links** - Life domains enabling holistic reasoning

### What Phase 4 Needs

1. **Inference Rules** - "If A → B and B → C, then can infer A → C"
2. **Query Patterns** - "Find goals blocked by risks"
3. **Temporal Reasoning** - "What changes when milestone is delayed?"
4. **Consequence Models** - "Payment blocked → project at risk → goal delayed"

---

## Success Metrics

### Phase 3 Exit Criteria

- [ ] 100 schemas have semantic descriptions
- [ ] 100 schemas have lifecycle links
- [ ] 100 schemas have relationship definitions (to other schemas)
- [ ] 100 schemas have life domain mappings
- [ ] Tier 1 (25 critical) = 100% enriched
- [ ] Semantic Richness Score ≥ 3.5/10

### Phase 4 Entry Criteria

- [ ] All Phase 3 metrics met
- [ ] Relationship-type definitions validated for inference
- [ ] Graph traversal patterns documented
- [ ] Ready for reasoning engine implementation

---

## Implementation Roadmap

### Week 1: Tier 1A Completion
- Add relationships to: document, project, goal, risk, opportunity, decision, relationship, actor, payment, organisation, asset
- Add life domains to same 11 schemas
- Run audit: expect 32 → 43 semantic descriptions, 15 → 43+ relationships

### Week 2: Tier 1B Part 1
- Complete customer, employee, mentor, contractor (add lifecycle, relationships, domains)
- Complete certificate, contract, invoice, note
- Run audit: expect 43 → 60+ across all metrics

### Week 3: Tier 1B Part 2
- Complete event, workflow, deliverable, milestone
- Complete resource-allocation, startup
- Run audit: expect 60 → 80+ semantic coverage

### Week 4: Domain Hub Selection
- Select 20 domain hubs (1 per life domain)
- Begin Tier 3 enrichment on these hubs
- Run audit: expect progress toward 100 across all metrics

### Week 5: Tier 3 Expansion
- Enrich related schemas in each domain
- Reach 100 semantic descriptions milestone
- Reach 100+ schemas across other 3 dimensions
- Run audit: expect Semantic Richness Score ≥ 3.5/10

---

## Tools & Commands

### Run Semantic Audit

```bash
npm run schemas:semantic
```

Shows:
- Semantic Richness Score (0.3/10 → goal: 10/10)
- Progress on 4 Phase 3 milestones
- Which Tier 1 concepts need what
- Gaps in each enrichment dimension

### Regenerate Registry

```bash
npm run registry:generate
```

Updates registry with enrichments from `schema-curation.json`

### Validate Governance

```bash
npm run schemas:audit
```

Ensures enrichments maintain governance standards

---

## The Bigger Picture

### Ontology Maturity Curve

```
Phase 1: Folder Structure
  ├─ Result: 811 schemas organized
  └─ Value: Repository of definitions

Phase 2: Governance ✅ COMPLETE
  ├─ Result: 0 violations, enforced rules
  └─ Value: Reliable, consistent structure

Phase 3: Semantic Enrichment 🔄 IN PROGRESS
  ├─ Result: AI-understandable meanings
  └─ Value: Intelligence-ready foundation

Phase 4: Reasoning Graph
  ├─ Result: Inference engines, query patterns
  └─ Value: Autonomous reasoning capability

Phase 5: Life Intelligence System
  ├─ Result: Personal insights, predictions, recommendations
  └─ Value: Actionable intelligence for life decisions
```

### The Knowledge Density Problem

Most ontologies stop at Phase 2 (governance compliance). That's why they're not intelligent.

**The difference between:**

```
A database with rules
vs.
A knowledge system that understands meaning
```

Phase 3 is where that transformation happens.

---

## Next: Semantic Enrichment Begins

This document is the north star for Phase 3 work. Each enrichment decision should trace back to one of the four tracks, one of the enrichment tiers, or the reasoning capabilities being unlocked.

**Ready to build semantic richness.** 🧠✨
