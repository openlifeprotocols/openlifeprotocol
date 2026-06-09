---
title: Core Object Model
---

The fundamental objects in OLP. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## Overview

The Core Object Model defines the fundamental objects and their properties:

1. **Actor** - Who participates
2. **Event** - What triggered the process
3. **Case** - What process is running
4. **Workflow** - How to handle it
5. **Task** - Atomic unit of work
6. **Document** - Evidence required
7. **Communication** - Notification
8. **Decision** - Human or AI decision
9. **Evidence** - What supports decisions
10. **Outcome** - Process result

---

## Object Relationships

```
Actor (who)
  ↓
Event (what happened)
  ↓
Case (process instance)
  ├── uses Workflow (process definition)
  ├── has Tasks (atomic work)
  ├── requires Documents (evidence)
  ├── makes Decisions (what to do)
  ├── sends Communications (notify people)
  ├── tracks Evidence (support decisions)
  ├── handles Assets (what's owned)
  └── records Payments (money movement)
    ↓
Outcome (process result)
```

---

## JSON Schema

{% callout title="TODO" %}
- [ ] Create JSON Schema for each object type
- [ ] Define validation rules
- [ ] Define required vs optional fields
- [ ] Define field constraints
- [ ] Create examples for each schema
- [ ] Define relationship cardinality
{% /callout %}

---

## TODO - Phase 2

- [ ] Complete Core Object Model specification
- [ ] Create JSON Schemas for all objects
- [ ] Define object lifecycle
- [ ] Define object versioning
- [ ] Define object querying
- [ ] Add comprehensive examples
