---
title: Specification Overview
---

The formal contract for the Open Life Protocol. {% .lead %}

---

## Specification Metadata

- **Name**: Open Life Protocol
- **Short Name**: OLP
- **Version**: 1.0.0
- **Status**: [Proposed / Draft] (Phase 1-2)
- **License**: Apache 2.0
- **Governance**: Open Life Foundation
- **Reference Implementation**: LifeOS

---

## Why a Formal Specification?

Like OpenAPI, OLP succeeds because it's a **formal, executable specification**:

✅ Enables code generation (SDKs, validators, tooling)
✅ Ensures interoperability (all systems speak the same language)
✅ Supports automation (workflows auto-execute based on the spec)
✅ Enables conformance (systems can be certified)
✅ Prevents fragmentation (no proprietary variants)

---

## Specification Components

### 1. **Core Object Model**

The fundamental objects in OLP:

- **Actor** - Who participates (person, org, AI, team, etc.)
- **Event** - What triggered the process (birth, death, employment, etc.)
- **Case** - What process is running (death case, move case, etc.)
- **Workflow** - How to handle it (process definition)
- **Task** - Atomic unit of work
- **Document** - Evidence required
- **Communication** - Notification channels
- **Decision** - Human or AI decision + evidence
- **Outcome** - Process completion result

[Learn more about Core Object Model →](/docs/specification-core-object-model)

### 2. **Graph Specification**

OLP uses a **knowledge graph model** for representing relationships:

**Node Types:**
- Actor
- Case
- Workflow
- Task
- Document
- Communication
- Institution
- Decision
- Evidence
- Asset / Liability
- Outcome

**Relationship Types:**
- `RELATED_TO` - Generic relationship
- `PARTICIPATES_IN` - Actor participates in case/workflow
- `OWNS` - Owns asset/liability
- `OWES` - Has liability
- `TRIGGERED` - Event triggered case
- `USES` - Workflow uses template
- `HAS_TASK` - Case has task
- `REQUIRES` - Task requires document
- `CREATED` - Actor created entity
- `REQUESTED` - Requesting something
- `EVIDENCES` - Evidence supports decision
- `SUPPORTS` - Supports decision
- `RESULTED_IN` - Case resulted in outcome

This graph model is **mandatory** for OLP conformance.

[Learn more about Graph Specification →](/docs/specification-graph)

### 3. **Event Specification**

Every entity emits events. Standard events include:

```
olp.actor.created
olp.event.created
olp.case.created
olp.case.updated
olp.case.completed
olp.workflow.started
olp.workflow.completed
olp.task.created
olp.task.completed
olp.document.created
olp.document.verified
olp.communication.sent
olp.communication.received
olp.decision.created
olp.payment.completed
olp.outcome.completed
```

[Learn more about Event Specification →](/docs/specification-events)

### 4. **Workflow DSL**

Human-readable language for defining workflows:

```yaml
id: death.uk.england.v1
type: workflow
event: death
steps:
  - id: register_death
    task_type: notification
    recipients:
      - uk.gov.register-office
  
  - id: notify_beneficiaries
    depends_on: register_death
    task_type: communication
    
  - id: assess_probate
    depends_on: register_death
    rule: probate_required
```

[Learn more about Workflow DSL →](/docs/specification-workflow-dsl)

### 5. **Rules Engine**

Conditional logic within workflows:

```yaml
rules:
  - id: probate_required
    if:
      estate_value > 5000
    then:
      require:
        - probate_assessment
      
  - id: expedited_process
    if:
      actor_age > 65 AND estate_value > 100000
    then:
      priority: high
      sla_days: 10
```

[Learn more about Rules Engine →](/docs/specification-rules-engine)

### 6. **API Specification**

OpenAPI-compliant API for OLP systems:

**Core Endpoints:**
- `POST /actors` - Create actor
- `POST /events` - Emit event
- `POST /cases` - Create case
- `GET /cases/{id}` - Get case
- `POST /workflows` - Define workflow
- `POST /workflow-runs` - Start workflow execution
- `POST /tasks` - Create task
- `POST /documents` - Upload document
- `POST /communications` - Send communication
- `POST /decisions` - Record decision
- `POST /payments` - Record payment
- `POST /outcomes` - Record outcome

[Learn more about API Specification →](/docs/specification-api)

### 7. **Registry Specification**

The OLP Registry is "GitHub for life workflows":

**Registry Objects:**
- **Workflows** - Reusable process definitions
- **Institutions** - Registered institutions and capabilities
- **Documents** - Standardized document formats
- **Rules** - Reusable rule templates
- **Templates** - Workflow templates
- **Schemas** - Data schemas

[Learn more about Registry Specification →](/docs/specification-registry)

### 8. **Institution Registry**

Each institution declares:

```yaml
institution:
  id: bank_example_uk
  name: Example Bank
  type: bank
  jurisdiction: UK
  
  supports_events:
    - death
    - employment
    - move
    
  supports_workflows:
    - death.uk.england.v1
    - move.uk.v1
    
  requires_documents:
    - death_certificate
    - will
    
  accepts_channels:
    - api
    - email
    - portal
```

[Learn more about Institution Registry →](/docs/specification-institutions)

### 9. **Conformance Levels**

OLP defines certification levels:

| Level | Includes | Certification |
|-------|----------|---------------|
| **OLP Core** | Object model, event model | Basic |
| **OLP Workflow** | + Workflow DSL, execution | Standard |
| **OLP Graph** | + Knowledge graph queries | Extended |
| **OLP Communication** | + Notification channels | Extended |
| **OLP Registry** | + Workflow registry integration | Extended |
| **OLP Full** | All components | Full certification |

[Learn more about Conformance →](/docs/specification-conformance)

---

## Specification Structure

```
specification/
├── 1-core-object-model.md
├── 2-graph-specification.md
├── 3-event-specification.md
├── 4-workflow-dsl.md
├── 5-rules-engine.md
├── 6-api-specification.md
├── 7-registry-specification.md
├── 8-institution-registry.md
├── 9-conformance.md
├── schemas/
│   ├── actor.schema.json
│   ├── event.schema.json
│   ├── case.schema.json
│   ├── workflow.schema.json
│   ├── ...
└── openapi/
    └── openapi.yaml
```

---

## Formal vs Practical

This specification aims for both:

**Formal**
- JSON Schema definitions for all objects
- OpenAPI for all APIs
- Conformance test suites
- Reference implementation

**Practical**
- Human-readable Workflow DSL
- Clear examples
- Best practice guides
- Real-world case studies

---

## Design Principles

1. **Contract-First** - Specification defines everything
2. **Minimal But Complete** - Only include what's necessary, but be comprehensive
3. **Extensible** - Allow custom fields and extensions
4. **Language-Agnostic** - No language-specific assumptions
5. **Auditable** - Every decision must be traceable
6. **AI-Native** - Designed for AI participation
7. **Backwards Compatible** - Versioning strategy ensures compatibility

---

## Next Steps

1. **Read the full specification:**
   - [Core Object Model](/docs/specification-core-object-model)
   - [Graph Specification](/docs/specification-graph)
   - [Event Specification](/docs/specification-events)
   - [Workflow DSL](/docs/specification-workflow-dsl)
   - [Rules Engine](/docs/specification-rules-engine)
   - [API Specification](/docs/specification-api)
   - [Registry Specification](/docs/specification-registry)
   - [Institution Registry](/docs/specification-institutions)
   - [Conformance](/docs/specification-conformance)

2. **Explore examples:**
   - [Case Studies & Guides](/docs/guides-overview)

3. **Implement:**
   - [Getting Started](/docs/getting-started)

{% callout title="TODO - Phase 2 Tasks" %}
- [ ] Complete Core Object Model spec
- [ ] Complete Graph Specification
- [ ] Complete Event Specification
- [ ] Complete Workflow DSL spec with full examples
- [ ] Complete Rules Engine spec
- [ ] Complete API Specification (OpenAPI)
- [ ] Complete Registry Specification
- [ ] Complete Institution Registry spec
- [ ] Complete Conformance spec
- [ ] Create all JSON Schema files
- [ ] Create OpenAPI specification file
- [ ] Create validation test suite
- [ ] Create reference implementation
{% /callout %}
