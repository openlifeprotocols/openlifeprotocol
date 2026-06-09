---
title: Core Concepts
---

Understand the fundamental building blocks of OLP. {% .lead %}

OLP defines nine core concepts that form the foundation of all life and business process automation.

---

## The Core Model

```
Event (trigger)
  ↓
Case (process instance)
  ↓
Workflow (process definition)
  ├── Step 1 (task)
  ├── Step 2 (task)
  └── Step N (task)
      ├── Requires Document
      ├── Creates Communication
      ├── Records Decision
      ├── Needs Evidence
      └── Generates Outcome
```

---

## The Nine Core Concepts

### 1. **Actors**

Who participates in a process?

- **Person** - An individual
- **Organization** - A company or institution
- **AI Agent** - An automated system
- **Team** - A group working together
- **Family** - Related persons
- **Government** - Government institution
- **Professional** - Individual with credentials

[Learn more about Actors →](/docs/core-concepts-actors)

### 2. **Events**

What triggered the process?

Examples:
- `birth` - A person was born
- `death` - A person died
- `employment` - Started a job
- `business_formation` - Created a company
- `healthcare_enrollment` - Registered for care

[Learn more about Events →](/docs/core-concepts-events)

### 3. **Cases**

What process is happening?

A case is a **managed process instance** triggered by one or more events.

Example flow:
- Death Event → Death Case → Manages the entire death workflow

[Learn more about Cases →](/docs/core-concepts-cases)

### 4. **Workflows**

How do we handle the process?

Workflows are **reusable executable processes** that define steps, dependencies, rules, and outcomes.

```yaml
id: death.uk.england.v1
type: workflow
event: death
steps:
  - register_death
  - notify_government
  - identify_assets
  - assess_probate
```

[Learn more about Workflows →](/docs/core-concepts-workflows)

### 5. **Tasks**

What's the atomic unit of work?

A task is a single, atomic action:
- Notify an institution
- Collect a document
- Make a decision
- Execute a calculation

[Learn more about Tasks →](/docs/core-concepts-tasks)

### 6. **Documents**

What evidence do we need?

Types of documents:
- **Certificates** - Death certificate, birth certificate
- **Contracts** - Wills, agreements
- **Forms** - Government forms, applications
- **Letters** - Notifications, confirmations
- **Statements** - Bank statements, medical records

[Learn more about Documents →](/docs/core-concepts-documents)

### 7. **Communications**

How do we notify people?

Channels:
- Email
- SMS
- Phone
- Letter
- Portal message
- Meeting
- Video call

[Learn more about Communications →](/docs/core-concepts-communications)

### 8. **Decisions**

Who decided what?

A decision records:
- **What** was decided
- **Who** made the decision (human or AI)
- **When** it was made
- **Why** it was made (evidence)
- **Supporting evidence** - Rules, calculations, human judgment

[Learn more about Decisions →](/docs/core-concepts-decisions)

### 9. **Outcomes**

What's the result?

Outcomes mark completion:
- `death_case_completed`
- `move_completed`
- `employee_hired`
- `company_incorporated`
- `claim_approved`

[Learn more about Outcomes →](/docs/core-concepts-outcomes)

---

## How They Work Together

### Death Case Example

```
Actor: John Doe (Person)
Event: Death occurred in England
  ↓
Case: death_case_12345
  ↓
Workflow: death.uk.england.v1
  ↓
Task 1: Register death
  → Document: death_certificate
  → Communication: notify_government
  → Decision: death_registered = true
  ↓
Task 2: Notify beneficiaries
  → Communication: email to beneficiaries
  → Document: will (required)
  ↓
Task 3: Assess probate
  → Decision: probate_required (if estate > £5000)
  → Evidence: asset_valuation
  ↓
Outcome: death_case_completed
```

---

## Additional Concepts

### Assets & Liabilities

Financial primitives for workflows involving money:
- **Assets** - What's owned (property, accounts, possessions)
- **Liabilities** - What's owed (debts, mortgages, loans)
- **Payments** - Movement of funds

Used in death (estate distribution), business (capitalization), retirement (benefit calculation).

### Evidence

Supports every decision:
- Documentation
- Calculations
- Rules applied
- AI model outputs
- Human reasoning

Every decision is traceable back to its evidence.

---

## Design Principles

OLP follows these principles:

1. **Contract-first** - Spec defined before implementation
2. **Language-agnostic** - Works across all programming languages
3. **Extensible** - Add custom fields while staying compatible
4. **Auditable** - Complete history of every decision
5. **Interoperable** - Works across different institutions
6. **AI-native** - Designed for AI agents to participate
7. **Event-driven** - Everything starts with an event
8. **Task-oriented** - Workflows broken into atomic units

---

## Learning Path

1. **[Why OLP Matters](/docs/why-olp)** - Understand the problem
2. **[Getting Started](/docs/getting-started)** - Build your first workflow
3. **Individual Concepts** - Deep dive into each concept (see links above)
4. **[Specification](/docs/specification-overview)** - Formal spec
5. **[Guides](/docs/guides-overview)** - Real-world patterns

{% callout title="TODO" %}
- [ ] Add relationships diagram (Mermaid)
- [ ] Add cardinality rules (1:1, 1:N, M:N relationships)
- [ ] Add lifecycle diagrams for each concept
- [ ] Add example workflows for each concept type
{% /callout %}
