---
title: Documents
---

What evidence do we need? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is a Document?

A Document is evidence required by a process:
- **Certificates** - Birth certificate, death certificate
- **Contracts** - Wills, agreements
- **Forms** - Government forms, applications
- **Letters** - Notifications, confirmations
- **Statements** - Financial or medical statements
- **Proofs** - ID, proof of address

---

## Document Registry

The OLP Document Registry lists standardized documents:

```yaml
document:
  id: death_certificate
  issued_by:
    - registrar
  accepted_by:
    - bank
    - insurance
    - government
  jurisdictions:
    - UK_ENGLAND
    - UK_SCOTLAND
    - UK_WALES
```

---

## Document Properties

- `id` - Document type identifier
- `name` - Display name
- `type` - Certificate, contract, form, etc.
- `issued_by` - Who issues it
- `accepted_by` - Who accepts it
- `jurisdiction` - Where it's valid
- `required_for` - Which workflows need it
- `expiry_days` - How long before it expires

---

## TODO

- [ ] Define document schema in JSON Schema
- [ ] Build document registry
- [ ] Define document verification
- [ ] Define document versioning
- [ ] Add document upload/retrieval APIs
- [ ] Define document retention policies
- [ ] Add examples of standardized documents
