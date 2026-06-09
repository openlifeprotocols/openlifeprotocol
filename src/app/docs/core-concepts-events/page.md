---
title: Events
---

What triggered the process? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is an Event?

An Event represents something that happened:
- A person was **born**
- A person **died**
- A person started **employment**
- A business was **formed**
- A person **moved**
- A person **got married**

Events trigger Cases and Workflows.

---

## Standard Events

### Life Events
- `birth` - Birth of a person
- `death` - Death of a person
- `marriage` - Marriage of two people
- `divorce` - Divorce/dissolution of partnership
- `move` - Change of address

### Employment Events
- `employment` - Start of employment
- `promotion` - Job promotion
- `termination` - End of employment
- `redundancy` - Layoff/redundancy
- `retirement` - Retirement from work

### Business Events
- `business_formation` - Business created
- `business_closure` - Business closed
- `hiring` - Employee hired
- `onboarding` - Employee onboarded
- `fundraising` - Capital raised

### Healthcare Events
- `health_enrollment` - Enrolled in health plan
- `provider_change` - Changed healthcare provider
- `hospitalization` - Hospital admission
- `treatment` - Medical treatment

---

## Event Structure

```yaml
event:
  id: event_12345
  type: death
  actor_id: person_123
  timestamp: 2026-06-09T10:30:00Z
  jurisdiction: UK
  data:
    location: hospital
    cause: natural
  metadata:
    source: government_registration
```

---

## Event Schema

{% schema filename="event.schema.json" title="Event Schema" %}

---

## Event Properties

- `id` - Unique event identifier
- `type` - Event type (death, birth, etc.)
- `actor_id` - Who the event happened to
- `timestamp` - When it happened
- `jurisdiction` - Geographic context
- `data` - Event-specific data
- `metadata` - Additional context

---

## TODO

- [ ] Define complete event taxonomy
- [ ] Define event schema in JSON Schema
- [ ] Define event validation rules
- [ ] Define immutability guarantees
- [ ] Define event streaming specification
- [ ] Add event examples for each type
- [ ] Define custom event support
