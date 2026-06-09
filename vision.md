If you're serious about this, then Open Life Protocol (OLP) should be designed like OpenAPI, OAuth, FHIR, and Kubernetes APIs.

The mistake would be creating "some YAML schemas."

The goal is:

OLP becomes the contract-first standard for life, business, workflow, and AI-native service execution.

OpenAPI succeeded because it became a language-agnostic contract that can generate documentation, SDKs, clients, servers, validation, and tooling from a single specification.

Open Life Protocol v1
Foundation
Name:
Open Life Protocol

Short Name:
OLP

Current Version:
1.0.0

License:
Apache 2.0

Governance:
Open Life Foundation

Reference Implementation:
LifeOS
OLP Architecture
OLP Core
├── Identity
├── Actors
├── Events
├── Cases
├── Workflows
├── Tasks
├── Documents
├── Communications
├── Decisions
├── Evidence
├── Assets
├── Payments
├── Outcomes
│
├── Graph Layer
├── Event Layer
├── API Layer
├── Registry Layer
├── SDK Layer
└── Conformance Layer
OLP Core Object Model
Actor
Person
Family
Organisation
Institution
Government
Professional
AI Agent
Team
Workspace
Event
Birth
Death
Marriage
Divorce
Move
Employment
Redundancy
Retirement
Care
Education

BusinessFormation
Fundraising
Hiring
Onboarding
Compliance
Offboarding
Closure
Case
A managed process triggered by one or more events.

Example:

Death Event
↓
Death Case

Move Event
↓
Move Case
Workflow
Reusable executable process.
Task
Atomic unit of work.
Document
Certificate
Contract
Form
Letter
Statement
Policy
Invoice
Evidence
Communication
Email
SMS
Letter
Phone
Portal
Meeting
Video
WhatsApp
Decision
A conclusion reached by:
- Human
- AI
- Rule Engine
Evidence
Supports a decision.
Outcome
Estate Administered
Move Completed
Employee Hired
Company Incorporated
Claim Approved
OLP Graph Specification

The graph model is mandatory.

Inspired by knowledge graph approaches where APIs and data models can be generated from ontology-driven graph structures.

Node Types
Actor
Case
Workflow
Task
Document
Communication
Institution
Decision
Evidence
Asset
Liability
Outcome
Relationships
RELATED_TO
PARTICIPATES_IN
OWNS
OWES
TRIGGERED
USES
HAS_TASK
REQUIRES
CREATED
REQUESTED
EVIDENCES
SUPPORTS
RESULTED_IN
OLP Event Specification

Everything emits events.

Required Events
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
OLP Workflow DSL

Human-readable.

id: death.uk.england.v1

type: workflow

event:
  type: death

steps:
  - id: register_death

  - id: notify_government
    depends_on:
      - register_death

  - id: identify_assets

  - id: assess_probate
OLP Rules Engine

Every workflow pack can include:

rules:

Example:

id: probate_required

if:
  estate_value > 5000

then:
  require:
    - probate_assessment
OLP API Specification

Must be OpenAPI-first.

OpenAPI provides a language-agnostic API contract and supports code generation, SDK generation, testing, and documentation tooling.

Required Endpoints
POST /actors

POST /events

POST /cases
GET  /cases/{id}

POST /workflows
POST /workflow-runs

POST /tasks

POST /documents

POST /communications

POST /decisions

POST /payments

POST /outcomes
OLP Registry Specification

GitHub for life workflows.

Registry Objects:

Workflow
Institution
Document
Rule
Template
Schema
OLP Institution Registry

Each institution receives:

institution:
  id:
  name:
  type:
  jurisdiction:

Capabilities:

supports_events:
supports_workflows:
requires_documents:
accepts_channels:
OLP Document Registry

Example:

document:
  id: death_certificate

issued_by:
  - registrar

accepted_by:
  - bank
  - insurer
  - government
OLP SDK Specification

Official packages:

@openlife/core
@openlife/workflows

openlife-python

openlife-php

openlife-go

openlife-java

openlife-dotnet

openlife-rust

Generated from a contract-first OpenAPI specification and schemas, similar to how OpenAPI tooling can generate clients and servers across many languages.

OLP CLI
olp init

olp validate workflow.yaml

olp test workflow.yaml

olp publish workflow-pack

olp generate sdk

olp registry publish
OLP Conformance

Certification levels:

OLP Core

OLP Workflow

OLP Graph

OLP Communication

OLP Registry

OLP Full
OLP Repositories
openlifeprotocol/
│
├── specification
│
├── schemas
│
├── graph
│
├── workflows
│
├── registry
│
├── sdk-typescript
│
├── sdk-python
│
├── sdk-php
│
├── sdk-go
│
├── sdk-java
│
├── sdk-dotnet
│
├── cli
│
├── conformance
│
└── reference-server
The actual long-term vision
Open Life Protocol
        ↓

LifeOS
        ↓

DeathOS
MoveOS
CareOS
RetirementOS
BusinessOS

        ↓

Other vendors
Governments
Banks
AI agents
Consultancies
CRMs
Case management systems

The protocol's job is not to define how a death workflow works in England.

The protocol's job is to standardize:

Actors
Events
Cases
Workflows
Documents
Communications
Decisions
Evidence
Outcomes

so every system can exchange, execute, audit, and automate life and business processes using the same language. That's the scale where OLP starts looking less like a file format and more like a genuine infrastructure standard.