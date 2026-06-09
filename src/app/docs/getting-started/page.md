---
title: Getting Started
---

Deploy your first OLP workflow in 15 minutes. {% .lead %}

---

## Installation

### Prerequisites
- Node.js 18+ (or Python 3.8+ for the Python SDK)
- npm or yarn

### Install the CLI

```bash
npm install -g @openlife/cli
```

Verify the installation:
```bash
olp --version
```

---

## Create Your First Project

```bash
olp init my-project
cd my-project
```

This creates the following structure:
```
my-project/
├── workflows/
│   └── README.md
├── rules/
│   └── README.md
├── schemas/
│   └── README.md
├── olp.config.yaml
└── README.md
```

---

## Create Your First Workflow

Let's create a simple death workflow:

```bash
olp workflow create death-uk
```

This generates a workflow file at `workflows/death-uk.yaml`:

```yaml
id: death.uk.v1
type: workflow
title: "UK Death Case Workflow"

event:
  type: death
  jurisdiction: UK

steps:
  - id: register_death
    title: "Register Death with Government"
    task_type: notification
    recipients:
      - institutional_id: "uk.gov.register-office"
    required_documents:
      - death_certificate
    
  - id: notify_beneficiaries
    title: "Notify Beneficiaries"
    depends_on:
      - register_death
    task_type: communication
    
  - id: probate_assessment
    title: "Assess Probate Requirements"
    depends_on:
      - register_death
    rules:
      - id: probate_required
        if:
          estate_value > 5000
        then:
          require:
            - probate_assessment

outcome: death_case_completed
```

---

## Validate Your Workflow

```bash
olp validate workflows/death-uk.yaml
```

Output:
```
✓ Workflow is valid
✓ All event types are recognized
✓ All steps have valid configurations
✓ All dependencies are satisfied
```

{% callout title="TODO" %}
- [ ] Complete validation output examples
- [ ] Add error handling examples
{% /callout %}

---

## Test Your Workflow

```bash
olp test workflows/death-uk.yaml \
  --event '{"type":"death", "actor_id":"person_123", "jurisdiction":"UK"}'
```

Output:
```
Testing: death.uk.v1
  Event: death
  Actor: person_123
  
  ✓ Step 1: register_death
  ✓ Step 2: notify_beneficiaries
  ✓ Step 3: probate_assessment
    - Applied rule: probate_required
    - Probate assessment required
    
✓ All steps passed
✓ Outcome: death_case_completed
```

{% callout title="TODO" %}
- [ ] Add more test scenarios
- [ ] Show how to test rules
- [ ] Show how to test parallel workflows
{% /callout %}

---

## Deploy to Registry

When you're ready to share your workflow:

```bash
olp publish workflows/death-uk.yaml
```

This uploads your workflow to the OLP Registry. It's now available for:
- Other developers to discover
- Institutions to implement
- Systems to execute

```
Published workflow: death.uk.v1
Registry URL: https://registry.openlifeprotocol.org/workflows/death.uk.v1
Visibility: public
Version: 1.0.0
```

---

## Using the SDK

### TypeScript

```typescript
import { LifeOS } from '@openlife/core';

const lifeOS = new LifeOS({
  apiKey: process.env.OLP_API_KEY,
});

// Create an actor (person)
const person = await lifeOS.actors.create({
  type: 'person',
  name: 'John Doe',
  email: 'john@example.com',
});

// Emit an event
const deathEvent = await lifeOS.events.create({
  type: 'death',
  actor_id: person.id,
  jurisdiction: 'UK',
  timestamp: new Date(),
});

// Workflow triggers automatically
// Track the case
const deathCase = await lifeOS.cases.get(deathEvent.case_id);

console.log(deathCase.status); // 'in_progress'
console.log(deathCase.steps);  // All workflow steps
```

{% callout title="TODO" %}
- [ ] Add Python SDK example
- [ ] Add Go SDK example
- [ ] Add error handling examples
{% /callout %}

---

## What's Next?

- **[Core Concepts](/docs/core-concepts-overview)** - Understand Actors, Events, Cases, and more
- **[Specification](/docs/specification-overview)** - Deep dive into the spec
- **[Guides](/docs/guides-overview)** - Learn workflow design patterns
- **[Contributing](/docs/contributing)** - Join the community

{% callout type="warning" title="This is Phase 1-2 content" %}
The Phase 3-4 features (full SDK docs, dynamic registries, conformance testing) are coming soon.
{% /callout %}
