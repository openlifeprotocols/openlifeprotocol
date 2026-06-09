---
title: Outcomes
---

What's the result? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is an Outcome?

An Outcome marks the completion of a case and its achieved result:

```
Case: death_case_12345
  ↓
(All steps completed)
  ↓
Outcome: death_case_completed (estate administered)
```

---

## Outcome Types

- **death_case_completed** - Death case finished, estate administered
- **move_completed** - Relocation finished, address updated everywhere
- **employee_hired** - Hiring complete, employee onboarded
- **company_incorporated** - Business formation complete, registered
- **claim_approved** - Claim processed, approved for payment
- **enrollment_confirmed** - Health enrollment complete, coverage active

---

## Outcome Properties

- `id` - Outcome identifier
- `case_id` - Which case this outcome is from
- `type` - Type of outcome
- `status` - success, partial, failed
- `result_data` - Details about the result
- `notifications_sent` - Who was notified
- `timestamp` - When outcome achieved
- `evidence` - Supporting evidence

---

## Outcome Example

```yaml
outcome:
  id: outcome_12345
  case_id: death_case_12345
  type: death_case_completed
  status: success
  result_data:
    estate_administered: true
    beneficiaries_notified: 5
    assets_distributed: true
    total_value: 100000
  timestamp: 2026-07-15T14:22:00Z
```

---

## TODO

- [ ] Define outcome schema in JSON Schema
- [ ] Define outcome types taxonomy
- [ ] Define outcome metrics and tracking
- [ ] Define outcome notification logic
- [ ] Add outcome examples
