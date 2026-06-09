---
title: Tasks
---

What's the atomic unit of work? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is a Task?

A Task is a single, atomic unit of work within a workflow.

---

## Task Types

- **notification** - Notify an institution
- **approval** - Get human approval
- **document** - Collect/upload document
- **verification** - Verify information
- **communication** - Send message
- **calculation** - Calculate something
- **external_service** - Call external API
- **payment** - Process payment
- **decision** - Record decision

---

## Task Properties

- `id` - Task identifier
- `type` - Task type
- `title` - Human-readable title
- `status` - Current status
- `assigned_to` - Who's assigned
- `due_date` - Deadline
- `sla_hours` - Service level agreement
- `required_documents` - What docs needed
- `result` - Task result/output

---

## Task Statuses

- `pending` - Waiting to start
- `in_progress` - Currently executing
- `blocked` - Waiting for something
- `completed` - Successfully finished
- `failed` - Failed to complete
- `cancelled` - Task cancelled

---

## TODO

- [ ] Define task schema in JSON Schema
- [ ] Define task assignment logic
- [ ] Define task status transitions
- [ ] Define task result structure
- [ ] Define task error handling
- [ ] Add task examples
