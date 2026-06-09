# External Schema Consumption Examples

This directory shows how Open Life Protocol schemas can be consumed by external systems.

## Included examples

1. neo4j-ingest.cypher
   - Ingest entities and relationships into a graph database.
2. postgres-ddl.sql
   - Relational projection of entities/relationships/rules.
3. graphql-schema.graphql
   - Query surface for entity and inference consumers.
4. eventbridge-rule-output.json
   - Event payload for downstream alerting/automation pipelines.

## Typical integration patterns

1. Graph-first analytics
   - Store entities + predicates in Neo4j for path traversal.
2. Operational reporting
   - Materialize projections in SQL for BI/reporting.
3. API federation
   - Expose selected schema concepts through GraphQL.
4. Event-driven workflows
   - Emit inferred outcomes as events to workflow systems.

## Notes

These examples are intentionally minimal and should be adapted for production:

1. Add authN/authZ.
2. Add provenance and retention controls.
3. Add contract tests for schema compatibility.
