---
title: Actors
---

Who participates in life and business processes? {% .lead %}

{% callout title="Status: Outline (Phase 1)" %}
This page is in outline form. Full content coming in Phase 2.
{% /callout %}

---

## What is an Actor?

An Actor is any entity that participates in a process:
- **Person** - An individual
- **Organization** - Company, bank, government agency
- **AI Agent** - Automated system or bot
- **Team** - Group of people
- **Family** - Related persons
- **Professional** - Individual with credentials

---

## Actor Properties

- `id` - Unique identifier
- `type` - person, organization, ai_agent, team, etc.
- `name` - Display name
- `email` - Contact email
- `phone` - Contact phone
- `jurisdiction` - Geographic context
- `verified` - Identity verified status
- `metadata` - Custom fields

---

## Actor Examples

### Person
```yaml
actor:
  id: person_123
  type: person
  name: John Doe
  email: john@example.com
  phone: +44-123-456-7890
  jurisdiction: UK
```

### Organization
```yaml
actor:
  id: bank_example_uk
  type: organization
  name: Example Bank
  email: support@examplebank.com
  jurisdiction: UK
```

### AI Agent
```yaml
actor:
  id: probate_calculator_v1
  type: ai_agent
  name: Probate Assessment Engine
  model: llm-3.5-turbo
```

---

## Actor Relationships

- **Actor → Event** - Actor involved in event
- **Actor → Case** - Actor participates in case
- **Actor → Task** - Actor performs task
- **Actor → Decision** - Actor makes decision
- **Actor → Communication** - Actor sends/receives communication

---

## TODO

- [ ] Define Actor schema in JSON Schema
- [ ] Define Actor lifecycle (creation, verification, archival)
- [ ] Define actor verification process
- [ ] Define privacy/GDPR considerations
- [ ] Add more examples
- [ ] Define role-based access control
- [ ] Document actor search and filtering
