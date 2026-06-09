---
title: Guides & Case Studies
---

Learn how to design and implement OLP workflows through real-world examples. {% .lead %}

---

## Learning by Example

The best way to learn OLP is through real-world case studies. Each guide shows:
- The problem being solved
- How OLP models it
- The complete workflow definition
- Implementation patterns
- Lessons learned

---

## Case Studies

### 1. Death Case: England, UK

The most complex case. Managing death in England involves:
- Registering death with government
- Notifying financial institutions
- Identifying and valuing assets
- Determining probate requirements
- Managing estate distribution
- Notifying beneficiaries

**What you'll learn:**
- How to model complex, multi-step workflows
- How to handle conditional logic (probate assessment)
- How to integrate with external institutions
- How to track evidence and decisions

[Read the Death Case Study →](/docs/guide-death-case-uk)

### 2. Business Formation: USA

Creating a business in the USA requires:
- Selecting business structure (LLC, C-Corp, S-Corp)
- Filing with state/federal agencies
- Getting an EIN from IRS
- Opening business bank account
- Filing tax forms
- Obtaining business licenses

**What you'll learn:**
- How to model workflows with multiple parallel paths
- How to handle jurisdiction-specific rules
- How to integrate with government agencies
- How to automate form submission

[Read the Business Formation Case Study →](/docs/guide-business-formation-us)

### 3. Employee Onboarding

Hiring and onboarding a new employee:
- Job offer and acceptance
- Paperwork (tax, benefits, NDA)
- Background check
- System access provisioning
- Training and orientation
- Probation period

**What you'll learn:**
- How to model workflows with human approval steps
- How to handle multiple actors (HR, manager, employee)
- How to integrate with external systems (HR systems, IT)
- How to track compliance

[Read the Employee Onboarding Case Study →](/docs/guide-employee-onboarding)

### 4. Healthcare Enrollment

Registering for healthcare:
- Eligibility verification
- Coverage comparison
- Plan selection
- Open enrollment submission
- Payment setup
- Coverage confirmation

**What you'll learn:**
- How to model workflows with decision trees
- How to handle calculations (eligibility, cost)
- How to integrate with multiple payers
- How to track coverage periods

[Read the Healthcare Enrollment Case Study →](/docs/guide-healthcare-enrollment)

### 5. Relocation / Move

Moving to a new address:
- Address change notification
- Utility transfers
- Mail forwarding
- Government notifications
- Driver license update
- Voter registration

**What you'll learn:**
- How to model workflows with many parallel tasks
- How to handle geographic variation (state/country rules)
- How to integrate with utilities and services
- How to notify multiple institutions

[Read the Move Case Study →](/docs/guide-move)

---

## Workflow Design Patterns

### Pattern 1: Sequential Tasks

Some tasks must happen in order:

```yaml
steps:
  - id: step1
  - id: step2
    depends_on: step1
  - id: step3
    depends_on: step2
```

**Use when:**
- Step 2 needs output from Step 1
- There's a natural ordering to follow
- You need to validate before proceeding

**Examples:**
- Death: Register first, then assess probate
- Business: File incorporation first, then get EIN

### Pattern 2: Parallel Tasks

Tasks that can happen simultaneously:

```yaml
steps:
  - id: notify_bank
  - id: notify_insurance
  - id: notify_employer
  # All happen at once
```

**Use when:**
- Tasks are independent
- They don't need each other's output
- Speed is important

**Examples:**
- Death: Notify all institutions simultaneously
- Move: Update address at multiple places at once

### Pattern 3: Conditional Tasks

Tasks that may or may not run:

```yaml
steps:
  - id: assess_probate
    rules:
      - if: estate_value > 5000
        then: require_probate_assessment
```

**Use when:**
- Some paths are conditional
- You want to optimize workflow execution
- Not all cases need all steps

**Examples:**
- Death: Only probate if estate > threshold
- Business: Additional steps for LLCs vs C-Corps
- Employee: Background check only for certain roles

### Pattern 4: Human Approval

Steps requiring human decision:

```yaml
steps:
  - id: manager_approval
    task_type: approval
    actors:
      - role: manager
    sla_hours: 48
```

**Use when:**
- Human judgment is required
- Compliance requires approval
- You need to track who decided what

**Examples:**
- Business: Legal review of incorporation
- Employee: Manager approval of hire
- Death: Beneficiary approval of estate distribution

### Pattern 5: External Integration

Calling external systems/APIs:

```yaml
steps:
  - id: verify_ssn
    task_type: external_service
    service: irs_verification
    retries: 3
```

**Use when:**
- You need to verify information externally
- You're calling government systems
- You're integrating with third-party services

**Examples:**
- Business: IRS EIN lookup
- Death: Government death record verification
- Employee: Background check API call

---

## Workflow Design Best Practices

### 1. Keep Tasks Atomic

Each task should be a single, well-defined unit of work:

❌ Bad:
```yaml
- id: handle_death_complete
  # Tries to do everything
```

✅ Good:
```yaml
- id: register_death
- id: notify_beneficiaries
- id: identify_assets
```

### 2. Use Meaningful Names

Task IDs should describe what happens:

❌ Bad:
```yaml
- id: step_1
- id: step_2
```

✅ Good:
```yaml
- id: register_death_with_government
- id: notify_beneficiaries
```

### 3. Document Everything

Include descriptions, examples, and notes:

```yaml
- id: assess_probate
  title: "Assess Probate Requirements"
  description: "Determine if probate is required based on estate value and jurisdiction"
  note: "Probate is required if estate value exceeds threshold for jurisdiction"
```

### 4. Make Rules Explicit

Rules should be clear and auditable:

```yaml
rules:
  - id: probate_required
    description: "English law: probate needed if estate > £5,000"
    if:
      jurisdiction: "UK_ENGLAND"
      estate_value: ">5000"
    then:
      require: probate_assessment
```

### 5. Plan for Errors

Every task can fail. Plan error handling:

```yaml
- id: verify_ssn
  retries: 3
  on_failure:
    action: manual_review
    notify:
      - role: compliance_officer
```

### 6. Test Edge Cases

Create test scenarios for:
- Minimum estate (probate not needed)
- Maximum estate (complex probate)
- Missing documents
- Invalid data
- Timeouts

---

## Real-World Lessons Learned

### Lesson 1: Jurisdictions Matter

What's required in England differs from Scotland, which differs from Wales. Always build jurisdiction-aware workflows.

### Lesson 2: Timelines Vary

How long probate takes varies by estate complexity. Set realistic SLAs and allow extensions.

### Lesson 3: People Are Actors Too

Don't forget that humans (beneficiaries, executors, etc.) are actors in the workflow. Plan for their participation.

### Lesson 4: Documents Are Proof

Every decision needs supporting documents. Plan what documents you'll need upfront.

### Lesson 5: Communication is Critical

Notifying the right people at the right time is key to workflow success.

---

## Next Steps

1. **Pick a case study** that interests you
2. **Study the workflow definition** (Workflow DSL)
3. **Understand the patterns** used
4. **Build your own** workflow using similar patterns
5. **Contribute** your workflow to the registry

---

## More Resources

- [Core Concepts](/docs/core-concepts-overview) - Understand Actors, Events, Cases
- [Workflow DSL](/docs/specification-workflow-dsl) - Formal syntax reference
- [Rules Engine](/docs/specification-rules-engine) - How rules work
- [Getting Started](/docs/getting-started) - Build your first workflow

{% callout title="TODO - Phase 2 Case Studies" %}
- [ ] Death Case Study (England)
- [ ] Business Formation Case Study (USA)
- [ ] Employee Onboarding Case Study
- [ ] Healthcare Enrollment Case Study
- [ ] Move / Relocation Case Study
- [ ] Workflow design pattern guide
- [ ] Error handling patterns
- [ ] Testing guide
- [ ] Performance optimization guide
{% /callout %}
