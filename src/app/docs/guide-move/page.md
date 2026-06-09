---
title: "Case Study: Relocation / Move"
---

Coordinating a move to a new address. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete case study coming in Phase 2.
{% /callout %}

---

## The Problem

Moving to a new address requires updating:
- Address change notifications to dozens of services
- Utility transfers (electricity, gas, water)
- Mail forwarding
- Government notifications (tax authority, voting)
- Driver license/ID update
- Vehicle registration
- Insurance policies
- Bank/financial accounts
- Employer records
- Healthcare providers
- Subscription services

Each requires different forms and different vendors.

---

## The OLP Solution

One event triggers coordinated workflow:

```yaml
id: move.relocation.v1
type: workflow
event: move

steps:
  - id: notify_government
  - id: notify_financial_institutions
    parallel_to: notify_government
  - id: transfer_utilities
    parallel_to: notify_government
  - id: setup_mail_forwarding
    parallel_to: transfer_utilities
  - id: update_driver_license
    depends_on: notify_government
  - id: confirm_all_updates
    depends_on:
      - notify_financial_institutions
      - transfer_utilities
      - setup_mail_forwarding
```

---

## Workflow Steps

### Step 1: Notify Government
- Tax authority address change
- Voting registration update
- Passport/ID update
- Parallel: Notify other government agencies

### Step 2: Notify Financial Institutions
- Banks
- Insurance companies
- Investment accounts
- Parallel execution

### Step 3: Transfer Utilities
- Electricity provider
- Gas provider
- Water utility
- Internet/telecom
- Parallel execution

### Step 4: Setup Mail Forwarding
- USPS mail forwarding
- Package forwarding services
- Notification to regular contacts

### Step 5: Update Driver License
- New state/jurisdiction
- Requires government notification first
- May require vehicle re-registration

### Step 6: Confirm Updates
- Verify all notifications sent
- Verify all transfers scheduled
- Send summary to user

---

## Key Parallelism

Many tasks can happen simultaneously:
- Government notifications
- Financial institution updates
- Utility transfers
- Mail forwarding setup

---

## Conditional Logic

```yaml
rules:
  - id: driver_license_required
    if:
      moving_between_jurisdictions: true
    then:
      require: driver_license_update
      
  - id: vehicle_reregistration
    if:
      owns_vehicle: true
    then:
      require: vehicle_registration_update
```

---

## TODO - Phase 2

- [ ] Complete workflow YAML
- [ ] Add jurisdiction-specific rules
- [ ] Define parallel task execution
- [ ] Add utility provider integrations
- [ ] Define timeline/SLA
- [ ] Add error recovery
