---
title: Event Specification
---

Standard events and event schema. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## Standard Events

Every OLP system emits these standard events:

### Core Events
- `olp.actor.created` - New actor created
- `olp.event.created` - New event emitted
- `olp.case.created` - New case started
- `olp.case.updated` - Case updated
- `olp.case.completed` - Case finished

### Workflow Events
- `olp.workflow.started` - Workflow execution started
- `olp.workflow.completed` - Workflow finished

### Task Events
- `olp.task.created` - New task created
- `olp.task.completed` - Task finished

### Document Events
- `olp.document.created` - Document uploaded
- `olp.document.verified` - Document verified

### Communication Events
- `olp.communication.sent` - Message sent
- `olp.communication.received` - Message received

### Decision Events
- `olp.decision.created` - Decision recorded

### Financial Events
- `olp.payment.completed` - Payment processed

### Outcome Events
- `olp.outcome.completed` - Outcome achieved

---

## Event Schema

```json
{
  "id": "event_12345",
  "type": "olp.death.created",
  "actor_id": "person_123",
  "timestamp": "2026-06-09T10:30:00Z",
  "jurisdiction": "UK_ENGLAND",
  "data": {},
  "metadata": {}
}
```

---

## Event Properties

- `id` - Unique event identifier
- `type` - Event type
- `actor_id` - Actor involved
- `timestamp` - When it happened
- `jurisdiction` - Geographic context
- `data` - Event-specific data
- `metadata` - Additional context

---

## TODO - Phase 2

- [ ] Define complete event taxonomy
- [ ] Create JSON Schema for event
- [ ] Define event validation
- [ ] Define event streaming
- [ ] Define event retention
- [ ] Add event examples
