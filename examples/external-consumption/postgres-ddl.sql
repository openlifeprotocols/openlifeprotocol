-- Example relational projection for Open Life Protocol consumption

CREATE TABLE IF NOT EXISTS entities (
    id TEXT PRIMARY KEY,
    schema_name TEXT NOT NULL,
    display_name TEXT,
    payload JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW ()
);

CREATE TABLE IF NOT EXISTS relationships (
    id BIGSERIAL PRIMARY KEY,
    source_entity_id TEXT NOT NULL,
    target_entity_id TEXT NOT NULL,
    predicate TEXT NOT NULL,
    strength NUMERIC(3, 2),
    confidence NUMERIC(3, 2),
    necessity TEXT,
    is_inferred BOOLEAN DEFAULT FALSE,
    rule_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW ()
);

CREATE INDEX IF NOT EXISTS idx_relationships_predicate ON relationships (predicate);

CREATE INDEX IF NOT EXISTS idx_relationships_source ON relationships (source_entity_id);

CREATE INDEX IF NOT EXISTS idx_relationships_target ON relationships (target_entity_id);