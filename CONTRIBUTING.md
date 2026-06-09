# Contributing to Open Life Protocol

Thanks for contributing.

This repository combines ontology design, schema governance, reasoning rules, and a docs application. Changes should preserve data-model integrity and reasoning safety.

## Development setup

1. Install dependencies:

```bash
npm install
```

2. Run docs app:

```bash
npm run dev
```

3. Run validation + tests before opening a PR:

```bash
npm run lint
npm run registry:validate
npm run schemas:audit
npm run schemas:semantic
npm test
npm run benchmark
```

## Contribution workflow

1. Create a focused branch.
2. Keep changes scoped to one concern when possible.
3. Add/update tests for behavior or contract changes.
4. Update docs when schema contracts, commands, or workflows change.
5. Open a PR using a clear title and summary.

## Schema contribution rules

Read first:

1. schemas/SCHEMA_CREATION_MINDSET.md
2. schemas/SCHEMA_DECISION_LOG.md
3. schemas/0000-platform/meta/README.md

When modifying schemas:

1. Prefer reuse of canonical concepts over duplication.
2. Use governed predicates.
3. Document lifecycle, sensitivity, and retention implications.
4. For reasoning rules, provide explainability and test evidence.

## Pull request expectations

PRs should include:

1. Problem statement and scope.
2. Summary of changed files.
3. Validation output (or CI link).
4. Migration/backward compatibility notes if contracts changed.

## Commit message guidance

Use concise, intent-first messages. Examples:

1. feat(schema): add reasoning-rule governance fields
2. fix(reasoning): require deprecationReason for deprecated rules
3. docs: add external schema consumption examples
4. ci: add benchmark and schema validation workflow

## Reporting issues

Use issue templates:

1. Bug report
2. Feature request
3. Schema proposal

These templates help maintain governance quality and review speed.
