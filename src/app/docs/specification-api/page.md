---
title: API Specification
---

OpenAPI-compliant REST API for OLP. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## Core Endpoints

### Actors
- `POST /actors` - Create actor
- `GET /actors/{id}` - Get actor
- `PUT /actors/{id}` - Update actor
- `GET /actors` - List actors

### Events
- `POST /events` - Create event
- `GET /events/{id}` - Get event
- `GET /events` - List events
- `GET /events/stream` - Stream events

### Cases
- `POST /cases` - Create case
- `GET /cases/{id}` - Get case
- `PUT /cases/{id}` - Update case
- `GET /cases` - List cases

### Workflows
- `POST /workflows` - Create workflow
- `GET /workflows/{id}` - Get workflow
- `GET /workflows` - List workflows

### Workflow Runs
- `POST /workflow-runs` - Start workflow
- `GET /workflow-runs/{id}` - Get run status
- `PUT /workflow-runs/{id}` - Update run

### Tasks
- `POST /tasks` - Create task
- `GET /tasks/{id}` - Get task
- `PUT /tasks/{id}` - Update task
- `GET /tasks` - List tasks

### Documents
- `POST /documents` - Upload document
- `GET /documents/{id}` - Get document
- `DELETE /documents/{id}` - Delete document
- `GET /documents` - List documents

### Communications
- `POST /communications` - Send communication
- `GET /communications/{id}` - Get communication
- `GET /communications` - List communications

### Decisions
- `POST /decisions` - Record decision
- `GET /decisions/{id}` - Get decision
- `GET /decisions` - List decisions

### Payments
- `POST /payments` - Record payment
- `GET /payments/{id}` - Get payment
- `GET /payments` - List payments

### Outcomes
- `POST /outcomes` - Record outcome
- `GET /outcomes/{id}` - Get outcome
- `GET /outcomes` - List outcomes

---

## Authentication

- API Key authentication
- OAuth 2.0 support
- JWT tokens

---

## Error Handling

Standard HTTP status codes:
- 200 OK
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 500 Server Error

---

## TODO - Phase 2

- [ ] Create complete OpenAPI specification file
- [ ] Define request/response schemas
- [ ] Define error responses
- [ ] Define pagination
- [ ] Define filtering
- [ ] Define sorting
- [ ] Add API examples
