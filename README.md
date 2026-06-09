# Open Life Protocol

Open Life Protocol is a schema-first personal knowledge graph and digital twin protocol.

It provides a governed ontology for representing life data across identity, relationships, health, learning, career, wealth, planning, risk, legacy, and public impact, with semantic enrichment and reasoning support.

## What problem this solves

Personal data is usually fragmented across apps, hard to reason about, and difficult to make trustworthy for AI.

Open Life Protocol addresses this by providing:

1. A canonical schema layer for life entities and records.
2. Governance constraints for consistency and interoperability.
3. Semantic metadata for confidence-aware graph reasoning.
4. Rule-based inference for multi-hop impact and consequence analysis.

## Current status

Project maturity is documented in [ARCHITECTURE_COMPLETE.md](ARCHITECTURE_COMPLETE.md) and phase reports.

High-level status:

1. Phases 1-4 completed (foundation, governance, semantic enrichment, reasoning).
2. Reasoning layer includes governed inference rules, transitive inference, and consequence chain detection.
3. Registry and audit tooling are in place for schema quality and coverage checks.

## Repository structure

Top-level layout:

1. [schemas](schemas): authoritative ontology source, organized by numbered life accounts and platform domains.
2. [public/schemas](public/schemas): distributable schema artifacts for APIs, clients, and tooling.
3. [src](src): Next.js documentation and interface layer for browsing and exploring the protocol.
4. [ARCHITECTURE_COMPLETE.md](ARCHITECTURE_COMPLETE.md): architecture overview and phase completion details.
5. [PHASE_3_SEMANTIC_ENRICHMENT.md](PHASE_3_SEMANTIC_ENRICHMENT.md), [PHASE_3_5_COMPLETE.md](PHASE_3_5_COMPLETE.md), [PHASE_4_REASONING_LAYER.md](PHASE_4_REASONING_LAYER.md), [PHASE_4_REASONING_COMPLETE.md](PHASE_4_REASONING_COMPLETE.md): implementation history and reasoning design.

## How schemas work

Core authoring principles are defined in:

1. [schemas/SCHEMA_CREATION_MINDSET.md](schemas/SCHEMA_CREATION_MINDSET.md)
2. [schemas/SCHEMA_DECISION_LOG.md](schemas/SCHEMA_DECISION_LOG.md)

Schema workflow:

1. Choose the correct account/domain first.
2. Reuse canonical concepts where possible.
3. Define relationships with governed predicates.
4. Add semantic metadata and lifecycle context.
5. Validate registry integrity and quality audits.

Reasoning rules are defined by [schemas/0000-platform/meta/reasoning-rule.schema.json](schemas/0000-platform/meta/reasoning-rule.schema.json), with additional guidance in [schemas/0000-platform/meta/README.md](schemas/0000-platform/meta/README.md).

## Development and validation

Install dependencies:

```bash
npm install
```

Run the site locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

Schema registry and audits:

```bash
npm run registry:generate
npm run registry:validate
npm run schemas:audit
npm run schemas:semantic
npm test
npm run benchmark
```

## Engineering operations

1. Contributing guide: [CONTRIBUTING.md](CONTRIBUTING.md)
2. Release/versioning discipline: [RELEASING.md](RELEASING.md)
3. CI workflow: [.github/workflows/ci.yml](.github/workflows/ci.yml)
4. Issue templates: [.github/ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE)
5. External schema consumption examples: [examples/external-consumption](examples/external-consumption)

## What the app/site does

The application in [src](src) is the documentation and exploration interface for Open Life Protocol.

It is used to:

1. Browse protocol documentation and architecture.
2. Navigate schema concepts and ontology organization.
3. Support search-driven discovery of protocol entities and docs.

## Roadmap

Near-term focus:

1. Phase 5 temporal reasoning extensions.
2. API-oriented query surfaces for graph traversal and inference explanations.
3. Visualization and impact analysis workflows.
4. Expanded test harnesses for rule quality and inference safety.

## Project identity

Open Life Protocol is not a UI template project.

This repository is the protocol and reference implementation workspace for a governed, semantically rich, reasoning-capable life graph.

## License

See [LICENSE.md](LICENSE.md).
