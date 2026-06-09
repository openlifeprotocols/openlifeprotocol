---
title: Decisions & Evidence
---

Who decided what? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is a Decision?

A Decision records:
- **What** was decided
- **Who** made the decision (human or AI)
- **When** it was made
- **Why** it was made (supporting evidence)

---

## Decision Types

- **Human Decision** - Made by a person
- **AI Decision** - Made by an AI system
- **Rule-Based Decision** - Automatic rule application
- **Calculated Decision** - Result of calculation

---

## Decision Example

```yaml
decision:
  id: probate_required_12345
  type: rule_based
  decision_maker: probate_assessment_engine
  decision: probate_required
  reasoning: "Estate value £100,000 exceeds threshold of £5,000"
  evidence:
    - asset_valuation: £100,000
    - rule: probate_required_if_estate > 5000
    - jurisdiction: UK_ENGLAND
  timestamp: 2026-06-09T10:30:00Z
```

---

## What is Evidence?

Evidence supports a decision:
- **Documents** - Birth certificate, will, etc.
- **Calculations** - Estate value, probate fees
- **Rules Applied** - Which rule triggered
- **AI Reasoning** - Model confidence, reasoning
- **Human Judgment** - Approver's notes

---

## Decision Properties

- `id` - Decision identifier
- `type` - Human, AI, rule-based, calculated
- `decision` - What was decided
- `decision_maker` - Who/what made it
- `reasoning` - Why this decision
- `evidence` - Supporting evidence
- `timestamp` - When decided
- `reviewable` - Can it be reviewed/appealed

---

## TODO

- [ ] Define decision schema in JSON Schema
- [ ] Define evidence types
- [ ] Define decision audit trail
- [ ] Define decision review process
- [ ] Define explainability requirements for AI
- [ ] Add decision examples
