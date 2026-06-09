---
title: Workflow Design Patterns
---

Proven patterns for designing OLP workflows. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete guide coming in Phase 2.
{% /callout %}

---

## Pattern Index

### Basic Patterns
1. **Sequential Tasks** - Steps that must happen in order
2. **Parallel Tasks** - Independent steps happening simultaneously
3. **Conditional Tasks** - Tasks that may or may not run
4. **Human Approval** - Steps requiring human decision
5. **External Integration** - Calling external systems

### Advanced Patterns
6. **Error Handling** - Graceful degradation and recovery
7. **Retry Logic** - Automatic retries with backoff
8. **Notification Chain** - Multiple notification steps
9. **Multi-Actor Workflow** - Multiple parties involved
10. **Async Integration** - Waiting for external completion

---

## Pattern 1: Sequential Tasks

**When to use:**
- Steps must happen in order
- Later steps depend on earlier outputs
- Natural sequential process

**Example:**
```yaml
steps:
  - id: step1_input
  - id: step2_validate
    depends_on: step1_input
  - id: step3_process
    depends_on: step2_validate
  - id: step4_output
    depends_on: step3_process
```

---

## Pattern 2: Parallel Tasks

**When to use:**
- Tasks are independent
- Speed is important
- No cross-dependencies

**Example:**
```yaml
steps:
  - id: notify_institution_a
  - id: notify_institution_b
  - id: notify_institution_c
  # All run simultaneously
```

---

## Pattern 3: Conditional Tasks

**When to use:**
- Some paths are optional
- Want to optimize execution
- Not all cases need all steps

**Example:**
```yaml
steps:
  - id: assess_value
  
  - id: high_value_review
    rules:
      - if: value > 100000
        then: execute
```

---

## Pattern 4: Human Approval

**When to use:**
- Human judgment required
- Compliance requires approval
- Need to track decisions

**Example:**
```yaml
steps:
  - id: manager_review
    task_type: approval
    actors:
      - role: manager
    sla_hours: 48
```

---

## Pattern 5: External Integration

**When to use:**
- Calling external APIs
- Verifying information
- Third-party services

**Example:**
```yaml
steps:
  - id: verify_identity
    task_type: external_service
    service: identity_verification_api
    retries: 3
    timeout_seconds: 30
```

---

## TODO - Phase 2

- [ ] Document all patterns with complete examples
- [ ] Add best practices for each pattern
- [ ] Add anti-patterns (what NOT to do)
- [ ] Create pattern decision tree
- [ ] Add pattern performance characteristics
- [ ] Create pattern test examples
