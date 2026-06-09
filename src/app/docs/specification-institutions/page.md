---
title: Institution Registry & Capabilities
---

What each institution supports. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## What is an Institution?

An institution is any organization that participates in OLP workflows:
- **Banks** - Financial services
- **Insurance Companies** - Insurance products
- **Governments** - Government agencies
- **Healthcare Providers** - Healthcare organizations
- **Employers** - Businesses
- **Any Organization** - That implements OLP

---

## Institution Registry Entry

Each institution declares what they support:

```yaml
institution:
  id: bank_example_uk
  name: Example Bank
  type: bank
  country: UK
  jurisdiction: UK_ENGLAND
  
  supports_events:
    - death
    - employment
    - move
    
  supports_workflows:
    - death.uk.england.v1
    - move.uk.v1
    - employment.uk.v1
    
  requires_documents:
    - death_certificate
    - will
    - probate_order
    
  accepts_channels:
    - api
    - email
    - portal
    
  contact:
    email: integration@examplebank.com
    website: https://api.examplebank.com/olp
```

---

## Capability Matrix

Institutions declare capabilities:

| Capability | Meaning |
|-----------|---------|
| `supports_events` | What events they handle |
| `supports_workflows` | What workflows they implement |
| `requires_documents` | What documents they need |
| `accepts_channels` | How to communicate (API, email, portal) |
| `sla_hours` | Response time guarantee |
| `uptime_sla` | Availability guarantee (99.9%, etc.) |
| `data_retention` | How long they keep data |
| `encryption` | Encryption method (TLS 1.2+) |
| `conformance_level` | OLP conformance level |

---

## Institution Types

- **Bank** - Handles financial accounts
- **Insurance** - Handles insurance policies
- **Government** - Government services
- **Healthcare** - Healthcare services
- **Employer** - Employment services
- **Utility** - Utility services
- **Telecom** - Telecommunications
- **Other** - Other services

---

## Discovering Institutions

Query the registry to find institutions:

```bash
# Find all banks in England
olp registry search \
  --type bank \
  --jurisdiction UK_ENGLAND

# Find institutions that handle death events
olp registry search \
  --supports_event death \
  --accepts_channel api
```

---

## Registering Your Institution

```bash
olp registry register-institution
# ... answer questions ...
olp registry publish institution.yaml
```

---

## TODO - Phase 2

- [ ] Create institution registry database
- [ ] Build institution search/discovery
- [ ] Create institution onboarding flow
- [ ] Define capability verification
- [ ] Create institution dashboard
- [ ] Add institution examples
