---
title: Rules Engine
---

Conditional logic in workflows. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## What is the Rules Engine?

The Rules Engine allows workflows to make decisions based on conditions:

```yaml
rules:
  - id: probate_required
    if:
      estate_value: ">5000"
    then:
      require:
        - probate_assessment
```

---

## Rule Structure

- `id` - Rule identifier
- `if` - Condition (what must be true)
- `then` - Action (what happens if true)

---

## Operators

Supported operators in `if` conditions:

- `>` - Greater than
- `<` - Less than
- `>=` - Greater than or equal
- `<=` - Less than or equal
- `==` - Equals
- `!=` - Not equals
- `AND` - Logical AND
- `OR` - Logical OR
- `IN` - Value in list
- `NOT_IN` - Value not in list
- `MATCHES` - Regex match

---

## Rule Examples

```yaml
# Simple comparison
- id: probate_required
  if:
    estate_value: ">5000"
  then:
    require: probate_assessment

# Complex condition
- id: expedited_processing
  if:
    actor_age: ">=65"
    AND
    estate_value: ">100000"
  then:
    priority: high
    sla_days: 10

# List membership
- id: high_value_case
  if:
    estate_value: ">500000"
  then:
    notify_roles:
      - senior_manager
      - compliance_officer
```

---

## TODO - Phase 2

- [ ] Complete rules syntax specification
- [ ] Define operator precedence
- [ ] Define rule chaining
- [ ] Define rule conflict resolution
- [ ] Add comprehensive examples
- [ ] Define rule testing
