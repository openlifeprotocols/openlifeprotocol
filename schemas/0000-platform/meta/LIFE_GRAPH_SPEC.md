# Life Graph Specification

## Purpose

Life Graph is the top-level ontology model for FewzenAI.

It connects life domains through shared primitives so AI can reason across goals, projects, risks, opportunities, decisions, and outcomes.

## Core Life Areas

- Person
- Time
- Relationships
- Health
- Learning
- Career
- Wealth
- Property
- Mobility
- Digital Life
- Culture
- Creativity
- Community
- Life Story
- Planning
- Opportunities
- Risks
- Enterprise

## Core Graph Primitives

- actor
- event
- relationship
- goal
- project
- decision
- opportunity
- risk

## Required Ontology Governance

- Canonical Entity Registry: one authoritative definition per concept.
- Relationship Ontology: governed relationship predicates.
- Lifecycle Registry: explicit state machines per major entity.
- Identity and Role Model: actor as root with contextual role assignments.
- Source-of-Truth Hierarchy: authoritative, verified, claimed, derived, generated.
- Temporal Context: valid/effective/observed/recorded time dimensions.

## AI Reasoning Intent

The graph should support causal, operational, and strategic reasoning such as:

- which goals are currently blocked by active risks
- which decisions led to positive outcomes in similar contexts
- which opportunities are high potential but time-constrained
- where commitments conflict with available time blocks

## Product Layer Bridge

User-facing Life Areas are mapped to account codes via:

- schemas/0000-platform/meta/life-area-map.json

This bridge keeps ontology precision while enabling simple user experiences.
