---
title: "Case Study: Business Formation (USA)"
---

Creating a business in the USA. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete case study coming in Phase 2.
{% /callout %}

---

## The Problem

Starting a business in the USA requires:
- Choosing business structure (LLC, C-Corp, S-Corp, etc.)
- Filing with state business agency
- Getting federal EIN from IRS
- Filing with tax authority
- Obtaining business licenses
- Opening business bank account
- Registering for state/local taxes

Each step uses different forms and different requirements.

---

## The OLP Solution

One event triggers one workflow:

```yaml
id: business.formation.usa.v1
type: workflow
event: business_formation

steps:
  - id: choose_structure
  - id: file_with_state
    depends_on: choose_structure
  - id: get_ein
    depends_on: file_with_state
  - id: obtain_licenses
    parallel_to: get_ein
  - id: open_bank_account
    depends_on: get_ein
```

---

## Workflow Steps

### Step 1: Choose Structure
- Options: LLC, C-Corp, S-Corp, Partnership, Sole Prop
- Decision triggers different subsequent steps

### Step 2: File with State
- File Articles of Incorporation/Organization
- Jurisdiction: State where business is located

### Step 3: Get Federal EIN
- Request from IRS
- API: IRS EIN lookup

### Step 4: Obtain Business Licenses
- Parallel to EIN
- Varies by business type and location

### Step 5: Open Bank Account
- Requires: EIN, Articles of Incorporation, ID

---

## Key Conditional Logic

```yaml
rules:
  - id: s_corp_election
    if:
      structure: S_CORP
    then:
      require:
        - form_2553_filing
        
  - id: multi_state_licenses
    if:
      operates_in_multiple_states: true
    then:
      require:
        - foreign_qualification_filing
```

---

## Outcomes

- Business formation complete
- Business registered with state
- EIN issued
- Bank account opened
- Ready to operate

---

## TODO - Phase 2

- [ ] Complete workflow YAML
- [ ] Add state-specific variations
- [ ] Add tax filing integration
- [ ] Add business license requirements by type
- [ ] Create timeline/SLA
- [ ] Add error handling
