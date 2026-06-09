// Example: ingest Open Life Protocol entities and relationships into Neo4j

MERGE (risk:Entity {id: 'risk_001', schema: 'risk'})
SET risk.name = 'Cashflow shortfall'

MERGE (goal:Entity {id: 'goal_001', schema: 'goal'})
SET goal.name = 'Maintain 12-month runway'

MERGE (risk)-[:BLOCKS {confidence: 0.8, strength: 0.85, necessity: 'should'}]->(goal)

// Inferred relationship projection example
MERGE (inference:Inference {
  id: 'inf_001',
  rule: 'goal_blocked_by_risk',
  confidence: 0.9
})
MERGE (goal)-[:AT_RISK {source: 'inference', inferenceId: 'inf_001'}]->(risk)
MERGE (inference)-[:DERIVED_FROM]->(risk)
MERGE (inference)-[:DERIVED_FROM]->(goal)
