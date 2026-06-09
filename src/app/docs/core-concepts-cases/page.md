---
title: Cases
---

What process is running? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is a Case?

A Case is a process instance triggered by an Event.

```
Event: Death occurred
  ↓
Case: death_case_12345 (manages the process)
  ↓
Workflow: death.uk.england.v1 (defines steps)
```

---

## Case Types

- **Death Case** - Managing a death and its consequences
- **Move Case** - Managing relocation
- **Employment Case** - Managing hiring/employment
- **Business Case** - Managing business formation/operations
- **Healthcare Case** - Managing healthcare enrollment/treatment

---

## Case Lifecycle

1. **Created** - Triggered by event
2. **In Progress** - Executing workflow steps
3. **Blocked** - Waiting for information or decision
4. **Completed** - All steps finished, outcome achieved
5. **Cancelled** - Process terminated
6. **Archived** - Completed and stored

---

## Case Properties

- `id` - Unique case identifier
- `event_id` - The triggering event
- `workflow_id` - The workflow being executed
- `actor_id` - Primary actor (e.g., the deceased in death case)
- `status` - Current status
- `tasks` - List of tasks in progress
- `decisions` - Decisions made
- `outcome_id` - Final outcome (if complete)
- `created_at` - When case was created
- `completed_at` - When case completed

---

## TODO

- [ ] Define case schema in JSON Schema
- [ ] Define case lifecycle state machine
- [ ] Define case querying and filtering
- [ ] Define case archival policies
- [ ] Define case metadata structure
- [ ] Add case examples
- [ ] Define case versioning
