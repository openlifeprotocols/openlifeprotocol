---
title: Workflow DSL
---

Human-readable workflow definition language. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## Workflow DSL

OLP Workflow DSL is a YAML-based, human-readable language for defining workflows:

```yaml
id: death.uk.england.v1
type: workflow
title: "UK Death Workflow (England)"
description: "Manages the process of death in England"

event:
  type: death
  jurisdiction: uk_england

steps:
  - id: register_death
    title: "Register Death with Government"
    task_type: notification
    recipients:
      - institutional_id: "uk.gov.register-office"
    required_documents:
      - death_certificate
    
  - id: notify_beneficiaries
    title: "Notify Beneficiaries"
    depends_on:
      - register_death
    task_type: communication
    
  - id: assess_probate
    title: "Assess Probate Requirements"
    depends_on:
      - register_death
    rules:
      - id: probate_required
        if:
          estate_value: ">5000"
        then:
          require:
            - probate_assessment

outcome: death_case_completed
```

---

## DSL Components

### Workflow
- `id` - Unique identifier
- `type` - "workflow"
- `title` - Human-readable title
- `description` - What it does
- `event` - What event triggers it
- `steps` - Process steps
- `outcome` - Final result

### Steps
- `id` - Step identifier
- `title` - Step description
- `task_type` - Type of task
- `depends_on` - Dependencies
- `required_documents` - Documents needed
- `rules` - Conditional logic
- `recipients` - Who's involved

### Rules
- `id` - Rule identifier
- `if` - Condition
- `then` - Action to take

---

## TODO - Phase 2

- [ ] Complete DSL syntax specification
- [ ] Define all task types
- [ ] Define all operators for conditions
- [ ] Define syntax validation
- [ ] Add comprehensive examples
- [ ] Define extension points
