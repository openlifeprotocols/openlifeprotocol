---
title: Registry Specification
---

The OLP Registry: GitHub for life workflows. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## What is the Registry?

The Registry is a centralized repository for OLP artifacts:
- **Workflows** - Reusable process definitions
- **Institutions** - Institutions and their capabilities
- **Documents** - Standardized document formats
- **Rules** - Reusable rule templates
- **Templates** - Workflow templates
- **Schemas** - Data schemas

---

## Registry Objects

### Workflow Registry

```yaml
workflow:
  id: death.uk.england.v1
  title: "UK Death Workflow (England)"
  description: "Manages death in England"
  author: openlifeprotocol
  version: 1.0.0
  status: stable
  jurisdictions:
    - UK_ENGLAND
  tags:
    - death
    - estate
    - legal
```

### Institution Registry

```yaml
institution:
  id: bank_example_uk
  name: "Example Bank"
  type: bank
  jurisdictions:
    - UK_ENGLAND
  supports_events:
    - death
    - employment
  supports_workflows:
    - death.uk.england.v1
  accepts_channels:
    - api
    - email
```

### Document Registry

```yaml
document:
  id: death_certificate
  name: "Death Certificate"
  type: certificate
  issued_by:
    - registrar
  accepted_by:
    - bank
    - insurance
  jurisdictions:
    - UK_ENGLAND
```

---

## Registry Features

- **Versioning** - Semantic versioning (1.0.0, 1.1.0, 2.0.0)
- **Maturity** - Draft, stable, deprecated
- **Searching** - Find workflows, institutions, documents
- **Filtering** - Filter by jurisdiction, type, status
- **Ratings** - Community ratings and reviews
- **Statistics** - Downloads, forks, contributors

---

## Publishing to Registry

```bash
olp registry publish workflows/death-uk.yaml
```

---

## TODO - Phase 2

- [ ] Build registry web UI
- [ ] Define registry API
- [ ] Define submission workflow
- [ ] Define approval process
- [ ] Define versioning strategy
- [ ] Create registry database schema
