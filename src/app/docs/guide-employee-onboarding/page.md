---
title: "Case Study: Employee Onboarding"
---

Hiring and onboarding a new employee. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete case study coming in Phase 2.
{% /callout %}

---

## The Problem

Hiring and onboarding requires:
- Job offer and acceptance
- Background check
- Paperwork (tax forms, NDA, benefits)
- System access provisioning
- Equipment setup
- Training and orientation
- Probation period tracking

Each step involves different departments (HR, IT, Finance, etc.).

---

## The OLP Solution

One event triggers coordinated workflow:

```yaml
id: employee.onboarding.v1
type: workflow
event: hiring

steps:
  - id: job_offer
  - id: background_check
  - id: paperwork_collection
  - id: system_provisioning
  - id: training
  - id: probation_tracking
```

---

## Workflow Steps

### Step 1: Job Offer
- Offer letter created
- Candidate acceptance

### Step 2: Background Check
- Third-party verification
- May block progression if failed

### Step 3: Paperwork Collection
- Tax forms (W-4, I-9)
- Confidentiality agreement
- Benefits enrollment
- Direct deposit setup

### Step 4: System Provisioning
- Create email
- Set up access control
- Add to security groups
- Provision phone/laptop

### Step 5: Training
- Orientation
- Role-specific training
- Safety training
- Compliance training

### Step 6: Probation Tracking
- Regular check-ins
- 30/60/90 day reviews
- Completion determination

---

## Key Participants

- **HR**: Offer, paperwork, benefits
- **Manager**: Approval, feedback
- **IT**: System provisioning
- **Finance**: Payroll setup
- **Security**: Background check, access

---

## TODO - Phase 2

- [ ] Complete workflow YAML
- [ ] Define multi-actor coordination
- [ ] Add conditional paths
- [ ] Add probation tracking
- [ ] Create timeline/SLA
- [ ] Add error recovery
