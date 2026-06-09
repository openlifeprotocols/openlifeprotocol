# Meta Layer README

This folder contains governance assets for the ontology, including the reasoning layer.

## Reasoning Rules

Reasoning rules are defined by:

- Schema: reasoning-rule.schema.json
- Rule catalog format: inference-rules.json
- Rule type governance: inference-rule-types.schema.json

Use reasoning-rule.schema.json when creating or validating individual rule records.

### Why this exists

The rules layer is the bridge between:

1. Relationships (explicit graph edges)
2. Relationship semantics (strength, confidence, necessity)
3. Inferences (new edges, alerts, scores, recommendations)

A rule record standardizes authoring, testing, explainability, and governance metadata.

## Required fields in a reasoning rule

- id
- uuid
- rule
- version
- name
- outputType
- riskLevel
- owner
- createdDate
- updatedDate
- ruleType
- conditions
- inferences
- confidence
- calculationMethod
- explanationTemplate
- validationStatus
- maxDepth
- provenancePolicy
- priority
- active

At least one of the following is also required:

- testCases
- testCaseReference

Conditional requirement:

- deprecationReason is required when validationStatus is deprecated.

## Enumerations

### ruleType

- transitive
- inverse
- aggregation
- causal
- temporal
- negation
- probabilistic

### outputType

- relationship
- alert
- score
- recommendation

### riskLevel

- low
- medium
- high
- critical

### validationStatus

- draft
- tested
- approved
- deprecated

## Minimal approved rule example

```json
{
  "id": "reasoning_rule_goal_blocked_by_risk",
  "uuid": "2f97a307-86dc-4f31-98f8-3268cfd2fd8c",
  "rule": "goal_blocked_by_risk",
  "version": "1.0.0",
  "name": "Goal Blocked By Risk",
  "description": "Infer risk exposure when a blocking relation is present.",
  "ruleType": "causal",
  "outputType": "relationship",
  "riskLevel": "medium",
  "owner": "ontology-team",
  "maintainer": "reasoning-engine",
  "createdDate": "2026-06-09T22:00:00Z",
  "updatedDate": "2026-06-09T22:00:00Z",
  "conditions": [
    {
      "source": "Risk",
      "predicate": "blocks",
      "target": "Goal"
    }
  ],
  "inferences": [
    {
      "source": "Goal",
      "predicate": "at-risk",
      "target": "Risk",
      "strength": 0.8,
      "confidence": 0.9,
      "necessity": "should"
    }
  ],
  "confidence": 0.9,
  "calculationMethod": {
    "strength": "multiply",
    "confidence": "min"
  },
  "explanationTemplate": "{source} is inferred to affect {target} because {source} {predicate1} {middle} and {middle} {predicate2} {target}.",
  "validationStatus": "approved",
  "testCaseReference": "schemas/0000-platform/meta/tests/reasoning-rules/goal_blocked_by_risk.json",
  "maxDepth": 2,
  "priority": 70,
  "active": true,
  "provenancePolicy": {
    "evidenceRequired": true,
    "minEvidenceCount": 1,
    "allowedSources": [
      "user",
      "institution",
      "system"
    ]
  },
  "metadata": {
    "notes": "Phase 4 baseline rule"
  }
}
```

## Authoring checklist

1. Set outputType and riskLevel deliberately before writing conditions.
2. Keep maxDepth conservative to prevent runaway chains.
3. Add explanationTemplate before approving the rule.
4. Attach testCases or a testCaseReference before moving to tested.
5. If deprecating, include deprecationReason.
6. Update updatedDate whenever rule logic or metadata changes.

## Validation

From the project root:

```bash
npm run registry:validate
```

If you add new schema files in this folder, regenerate the registry:

```bash
npm run registry:generate
npm run registry:validate
```
