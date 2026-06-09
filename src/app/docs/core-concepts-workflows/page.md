---
title: Workflows
---

How do we handle the process? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is a Workflow?

A Workflow is a **reusable executable process** that defines:
- Sequential steps (tasks)
- Dependencies between steps
- Rules and conditional logic
- Required documents
- Communications
- Outcomes

---

## Workflow Example

```yaml
id: death.uk.england.v1
type: workflow
title: UK Death Workflow (England)
description: Manages all aspects of death in England

event:
  type: death
  jurisdiction: uk_england

steps:
  - id: register_death
    title: Register Death
    depends_on: []
    
  - id: notify_beneficiaries
    title: Notify Beneficiaries
    depends_on: [register_death]
    
  - id: assess_probate
    title: Assess Probate
    depends_on: [register_death]
    rules:
      - if: estate_value > 5000
        then: require_probate

outcome: death_case_completed
```

---

## Workflow Properties

- `id` - Unique workflow identifier
- `type` - workflow
- `title` - Human-readable title
- `description` - What the workflow does
- `event` - What event triggers it
- `steps` - List of workflow steps
- `rules` - Conditional logic
- `outcome` - Final result
- `version` - Semantic version
- `author` - Who created it
- `jurisdiction` - Geographic scope

---

## Workflow Reusability

Same workflow can be used by multiple institutions and cases:

```
Workflow: death.uk.england.v1
  ↓
Institution 1: Bank (integrates it)
Institution 2: Insurance (integrates it)
Institution 3: Government (uses it)
```

---

## TODO

- [ ] Define workflow schema in JSON Schema
- [ ] Complete Workflow DSL specification
- [ ] Define step types and properties
- [ ] Define dependency resolution
- [ ] Define error handling in workflows
- [ ] Define workflow versioning
- [ ] Add workflow examples for each case type
- [ ] Define workflow testing framework
