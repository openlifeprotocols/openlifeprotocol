# Releasing and Versioning Discipline

This project follows semantic versioning principles for both application/runtime changes and ontology contract changes.

## Versioning model

### App/runtime version (package.json)

- MAJOR: Breaking runtime behavior or API compatibility.
- MINOR: Backward-compatible features.
- PATCH: Backward-compatible fixes.

### Schema/ontology contracts

Each governed schema and rule can also carry its own version field.

Use the same interpretation:

- MAJOR: Breaking field rename/removal, stricter required constraints, incompatible enum removals.
- MINOR: Backward-compatible additions (new optional fields/enums).
- PATCH: Clarifications, metadata improvements, non-breaking corrections.

## Release checklist

1. Ensure changelog is updated.
2. Run validation and tests:

```bash
npm run lint
npm run registry:validate
npm run schemas:audit
npm run schemas:semantic
npm test
npm run benchmark
npm run build
```

3. Confirm CI is green.
4. Bump version in package.json.
5. Commit and tag release.

## Changelog discipline

Use Keep a Changelog format in CHANGELOG.md with these sections:

- Added
- Changed
- Deprecated
- Removed
- Fixed
- Security

Always maintain an Unreleased section at the top.

## Breaking change policy

For breaking schema changes:

1. Document migration path.
2. Note affected external consumers.
3. Provide deprecation window when feasible.
4. Update examples and reasoning rule fixtures.
