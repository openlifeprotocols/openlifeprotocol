---
title: Graph Specification
---

Knowledge graph model for OLP. {% .lead %}

{% callout title="Status: Outline (Phase 2)" %}
This page is in outline form. Complete specification coming in Phase 2.
{% /callout %}

---

## Why a Graph?

A knowledge graph allows:
- Complex relationship querying
- Pattern matching across data
- Semantic understanding
- AI reasoning over workflows
- Cross-institutional integration

---

## Node Types

- **Actor** - People, orgs, AI agents
- **Event** - What happened
- **Case** - Process instance
- **Workflow** - Process definition
- **Task** - Atomic work
- **Document** - Evidence
- **Communication** - Messages
- **Decision** - Decisions made
- **Evidence** - Supporting evidence
- **Asset** - What's owned
- **Liability** - What's owed
- **Outcome** - Result

---

## Relationship Types

| Relationship | Meaning |
|--------------|---------|
| `RELATED_TO` | Generic relationship |
| `PARTICIPATES_IN` | Actor participates in case/workflow |
| `OWNS` | Owns asset or has liability |
| `OWES` | Has liability to |
| `TRIGGERED` | Event triggered case |
| `USES` | Uses workflow or template |
| `HAS_TASK` | Case has task |
| `REQUIRES` | Task requires document |
| `CREATED` | Actor created entity |
| `REQUESTED` | Requesting something |
| `EVIDENCES` | Evidence supports decision |
| `SUPPORTS` | Supports decision |
| `RESULTED_IN` | Case resulted in outcome |

---

## Graph Query Examples

{% callout title="TODO" %}
- [ ] Define graph query language
- [ ] Add query examples
- [ ] Define traversal patterns
- [ ] Define aggregations over graph
{% /callout %}

---

## TODO - Phase 2

- [ ] Complete graph specification
- [ ] Define graph serialization format
- [ ] Define graph validation
- [ ] Define graph query language
- [ ] Create query examples
- [ ] Define graph database requirements
