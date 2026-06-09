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

Let's create a simple hiring workflow:

```bash
olp workflow create employee-onboarding
```

This generates a workflow file at `workflows/employee-onboarding.yaml`:

```yaml
id: employee.onboarding.v1
type: workflow
title: "Employee Onboarding Workflow"

event:
  type: hiring

steps:
  - id: send_offer
    title: "Send Job Offer"
    task_type: communication
    recipients:
      - role: candidate
    
  - id: collect_paperwork
    title: "Collect Required Paperwork"
    depends_on:
      - send_offer
    task_type: document
    required_documents:
      - tax_form_w4
      - i9_verification
      - nda
    
  - id: provision_access
    title: "Provision System Access"
    depends_on:
      - collect_paperwork
    task_type: external_service
    recipients:
      - institutional_id: "it.department"

  - id: schedule_training
    title: "Schedule Training"
    depends_on:
      - provision_access
    task_type: communication

outcome: onboarding_completed
```

---

## Validate Your Workflow

```bash
olp validate workflows/employee-onboarding.yaml
```

Output:
```
✓ Workflow is valid
✓ All event types are recognized
✓ All steps have valid configurations
✓ All dependencies are satisfied
✓ All actors are defined
```

{% callout title="TODO" %}
- [ ] Complete validation output examples
- [ ] Add error handling examples
{% /callout %}

---

## Test Your Workflow

```bash
olp test workflows/employee-onboarding.yaml \
  --event '{"type":"hiring", "candidate_id":"person_123", "role":"Engineer"}'
```

Output:
```
Testing: employee.onboarding.v1
  Event: hiring
  Candidate: person_123
  
  ✓ Step 1: send_offer
  ✓ Step 2: collect_paperwork
  ✓ Step 3: provision_access
  ✓ Step 4: schedule_training
    
✓ All steps passed
✓ Outcome: onboarding_completed
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
olp publish workflows/employee-onboarding.yaml
```

This uploads your workflow to the OLP Registry. It's now available for:
- Other organizations to discover and adapt
- HR systems to implement
- Talent acquisition tools to use

```
Published workflow: employee.onboarding.v1
Registry URL: https://registry.openlifeprotocol.org/workflows/employee.onboarding.v1
Visibility: public
Version: 1.0.0
```

---

## Using the SDK

### TypeScript

```typescript
import { OLP } from '@openlife/core';

const olp = new OLP({
  apiKey: process.env.OLP_API_KEY,
});

// Create an actor (candidate)
const candidate = await olp.actors.create({
  type: 'person',
  name: 'Jane Smith',
  email: 'jane@example.com',
});

// Emit an event
const hiringEvent = await olp.events.create({
  type: 'hiring',
  actor_id: candidate.id,
  role: 'Software Engineer',
  timestamp: new Date(),
});

// Workflow triggers automatically
// Track the case
const onboardingCase = await olp.cases.get(hiringEvent.case_id);

console.log(onboardingCase.status); // 'in_progress'
console.log(onboardingCase.steps);  // All workflow steps
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
