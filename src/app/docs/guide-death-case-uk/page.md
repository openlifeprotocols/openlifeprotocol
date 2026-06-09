---
title: "Case Study: Death Case (England)"
---

Managing death in England. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete case study coming in Phase 2.
{% /callout %}

---

## The Problem

When someone dies in England, 500+ manual touchpoints must occur:
- Register death with government
- Notify financial institutions
- Update government records
- Identify and value assets
- Determine probate requirements
- Distribute estate
- Notify beneficiaries

---

## The OLP Solution

One event triggers one workflow that coordinates across all institutions:

```yaml
id: death.uk.england.v1
type: workflow
event: death

steps:
  - id: register_death
  - id: notify_institutions
    depends_on: register_death
  - id: identify_assets
  - id: assess_probate
    rules:
      - if: estate_value > 5000
        then: require_probate
  - id: distribute_estate
```

---

## Workflow Steps

### Step 1: Register Death
- Notify government registrar
- Obtain death certificate
- Required documents: Medical certif documentation from doctor/hospital

### Step 2: Notify Institutions
- Banks
- Insurance companies
- Pension providers
- Tax authorities
- Employers

### Step 3: Identify Assets
- Locate bank accounts
- Identify property
- Find investments
- Discover debts

### Step 4: Assess Probate
- If estate > £5,000: probate required
- If estate < £5,000: simplified process

### Step 5: Distribute Estate
- Pay debts
- Pay taxes
- Distribute to beneficiaries

---

## Key Decisions

1. **Probate Decision**: Based on estate value and jurisdiction rules
2. **Distribution Decision**: How to split estate among beneficiaries
3. **Timeline**: Probate takes 3-12 months typically

---

## Outcomes

- Death case completed
- Estate administered
- All beneficiaries notified
- All records updated

---

## TODO - Phase 2

- [ ] Complete workflow YAML definition
- [ ] Add all documents required
- [ ] Define jurisdiction variations (Scotland, Wales, NI)
- [ ] Add timeline/SLA information
- [ ] Create test scenarios
- [ ] Add error handling examples
