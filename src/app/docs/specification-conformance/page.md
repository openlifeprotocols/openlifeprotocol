---
title: Conformance Levels
---

OLP conformance certification. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## What is Conformance?

Conformance levels ensure systems implement OLP correctly and consistently.

---

## Conformance Levels

| Level | Includes | Certification | Use Case |
|-------|----------|---------------|----------|
| **OLP Core** | Object model, events | Basic | Learning, exploration |
| **OLP Workflow** | + Workflow DSL, execution | Standard | Production workflows |
| **OLP Graph** | + Knowledge graph queries | Extended | Complex integrations |
| **OLP Communication** | + Notification channels | Extended | Multi-channel workflows |
| **OLP Registry** | + Workflow registry integration | Extended | Ecosystem participation |
| **OLP Full** | All components | Full | Complete implementation |

---

## OLP Core

**Minimum requirements:**
- Object model implemented
- All objects can be created/read
- Events emitted for all operations
- Basic validation

**Test requirements:**
- Can create actors, events, cases
- Can query objects
- Events are properly emitted

---

## OLP Workflow

**Extends Core with:**
- Workflow DSL support
- Workflow execution
- Task management
- Decision recording

**Test requirements:**
- Can create and execute workflows
- Tasks execute in correct order
- Rules are applied correctly
- Outcomes recorded

---

## OLP Graph

**Extends Workflow with:**
- Knowledge graph queries
- Complex relationship traversal
- Pattern matching
- Graph analytics

**Test requirements:**
- Graph queries return correct results
- Relationships properly stored
- Query performance acceptable

---

## OLP Communication

**Extends Graph with:**
- Multiple communication channels
- Message tracking
- Delivery confirmations
- Template support

**Test requirements:**
- Communications sent via all channels
- Messages properly tracked
- Delivery confirmed

---

## OLP Registry

**Extends Communication with:**
- Registry publishing
- Workflow discovery
- Institution registration
- Version management

**Test requirements:**
- Can publish to registry
- Can discover workflows
- Registry queries work

---

## OLP Full

All components implemented and certified.

---

## Certification Process

1. **Register** - Register for certification
2. **Implement** - Implement OLP to desired level
3. **Self-Assess** - Run self-assessment tests
4. **Submit** - Submit for verification
5. **Audit** - Independent audit performed
6. **Approved** - Certification granted
7. **Maintain** - Ongoing compliance monitoring

---

## Conformance Testing

```bash
# Run conformance tests
olp conformance test --level workflow

# Results
✓ OLP Core tests: 15/15 passed
✓ OLP Workflow tests: 12/15 passed
✗ OLP Workflow: FAILED (requires 15/15)
```

---

## TODO - Phase 2

- [ ] Create conformance test suite
- [ ] Create certification application form
- [ ] Set up audit process
- [ ] Create certification dashboard
- [ ] Define recertification process
- [ ] Create test data sets
