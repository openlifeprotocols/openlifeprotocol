---
title: "Case Study: Healthcare Enrollment"
---

Registering for health coverage. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete case study coming in Phase 2.
{% /callout %}

---

## The Problem

Health enrollment involves:
- Eligibility verification
- Plan comparison
- Plan selection
- Enrollment submission
- Payment setup
- Coverage confirmation
- Family member coordination

Different insurers have different requirements and timelines.

---

## The OLP Solution

One event triggers coordinated workflow:

```yaml
id: healthcare.enrollment.v1
type: workflow
event: health_enrollment

steps:
  - id: verify_eligibility
  - id: compare_plans
  - id: select_plan
  - id: submit_enrollment
  - id: setup_payment
  - id: confirm_coverage
```

---

## Workflow Steps

### Step 1: Verify Eligibility
- Check income
- Check citizenship/residency
- Check employment status
- Determine subsidies

### Step 2: Compare Plans
- Display available plans
- Show costs
- Show coverage details
- Compare benefits

### Step 3: Select Plan
- User chooses plan
- Selects coverage type (individual, family, etc.)

### Step 4: Submit Enrollment
- Send to insurer
- Validate completeness
- Handle errors

### Step 5: Setup Payment
- Payment method selection
- Premium calculation
- Payment scheduling

### Step 6: Confirm Coverage
- Confirmation sent to enrollee
- Coverage effective date
- Member ID issued

---

## Conditional Logic

```yaml
rules:
  - id: subsidies_available
    if:
      income: "<400% of FPL"
    then:
      calculate_subsidies: true
      
  - id: family_coverage
    if:
      dependents_count: ">0"
    then:
      require:
        - dependent_verification
```

---

## TODO - Phase 2

- [ ] Complete workflow YAML
- [ ] Add plan comparison logic
- [ ] Add subsidy calculation
- [ ] Add family member handling
- [ ] Define timeline (Open Enrollment, Special Enrollment, etc.)
- [ ] Add error recovery
