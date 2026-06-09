# OLP Ingestion Platform — Product Proposal

**Project:** Open Life Protocol — Personal Data Ingestion Engine
**Status:** Proposal
**Date:** 9 June 2026
**Audience:** Engineering, Product

---

## Problem

OpenAI and other AI services accumulate thousands of conversations over time. Each conversation is a rich, unstructured record of what a person was thinking, deciding, researching, and building at a point in time. Currently this data sits in a flat JSON export with no semantic structure, no deduplication, no classification, and no connection to the rest of a person's life graph.

Open Life Protocol already defines 813 schemas across 37 life domains. The gap is an ingestion engine that reads raw exports and turns them into valid, queryable, reasoned-over OLP instances.

---

## Proposal

Build a pipeline — `scripts/ingest-openai.mjs` — that takes an OpenAI `conversations.json` export, enriches each conversation using OpenAI structured outputs, maps the results to OLP schemas, validates against the governed ontology, and writes to an instance store with full provenance tracking.

This is not a wrapper. The LLM is used only for extraction — it operates against a closed vocabulary derived directly from the OLP registry. It cannot invent schemas, tags, or domain labels. All outputs are validated by `ajv` before being written.

---

## How It Knows What To Tag

The enrichment call sends the conversation transcript to the model with a strict `response_format` JSON schema. That schema references your closed-vocabulary lists, derived at runtime from:

- `lifeDomains` — extracted from `schema-registry.json` at ingestion time (currently 37 values: `career`, `finance`, `health`, `planning`, `relationships`, etc.)
- `tone` — from the `conversation` schema enum: `["friendly","professional","contentious","collaborative","instructional","brainstorming"]`
- `insight_type` — from the `document-insight` schema enum: `["action_required","risk_identified","opportunity","anomaly","recommendation","pattern","correlation"]`
- `sentiment` — from the `document-summary` schema enum: `["positive","neutral","negative","mixed"]`

The model does not invent labels. It selects from these lists only. Any response that does not conform to the `response_format` schema is rejected and retried once before going to an error queue.

Because the vocabulary is loaded from the registry at runtime, it stays current as new domains and schemas are added — no hardcoding.

---

## How It Avoids Creating Duplicates

Three deduplication layers operate before any instance is written:

**Layer 1 — Stable deterministic ID**

Each OpenAI conversation has a stable `id` field. The pipeline derives a deterministic OLP ID from it:

```
conversation_<sha256(openai_id).slice(0, 16)>
```

Before enrichment, the sync manifest is checked. If the ID is already present and `update_time` has not changed, the conversation is skipped entirely. If `update_time` is newer, a delta enrichment runs and appends a `modification` entry to the existing provenance record.

**Layer 2 — Entity deduplication via `entity-alias`**

When the model extracts named entities (people, organisations, places), each is checked against an in-memory index of existing `actor` instances using normalised name matching. Matches above a configurable confidence threshold (default `0.85`) result in a `linked_entity_id` reference rather than a new record. Unresolved entities go into a `pending_review` queue in the sync manifest for manual resolution. The `entity-alias` schema is used to record alternate names for confirmed matches.

**Layer 3 — Content hash on enrichment outputs**

Every `document-summary` and `document-insight` record stores a `content_hash` (SHA-256 of the source message thread text). On re-import, if the hash matches the stored record, the enrichment LLM call is skipped. This keeps API costs bounded on incremental runs.

---

## Schema Output Map

For each OpenAI conversation the pipeline emits these OLP instances:

| OLP Schema | Source | Key Fields Set |
|---|---|---|
| `conversation` | raw conversation object | `date`, `format: "chat"`, `topics_discussed`, `decisions_made`, `action_items`, `tone` |
| `document-summary` | LLM abstractive pass | `summary_text`, `key_topics`, `sentiment`, `summary_type: "bullet_points"` |
| `document-insight` (0..n) | LLM insight detection | `insight_type`, `insight_title`, `confidence_score`, `suggested_actions` |
| `entity-extraction` | LLM NER pass | `extracted_entities[].entity_text`, `entity_type`, `confidence_score`, `linked_entity_id` |
| `classification` | LLM classification pass | `classifications[].category` from `lifeDomains`, `confidence_score`, `rank` |
| `tag` (0..n) | classification output | `tag_name`, `tag_type: "inferred"`, `usage_count` incremented |
| `provenance` | system-generated | `sources[].source_type: "openai-export"`, `truth_tier: "generated"`, `overall_confidence` |
| `action-item` (0..n) | if action items detected | linked to `conversation.id` |
| `decision-journal` (0..n) | if decisions detected | `decision_description`, `date`, linked to `conversation.id` |

All instances are validated by `ajv` against the schemas in `public/schemas/` before being written. Invalid instances go to an error queue, not the store.

---

## Single LLM Call Per Conversation

Rather than multiple calls (one for summary, one for entities, one for classification), the enrichment step issues a single structured outputs call per conversation. The `response_format` schema covers all output types at once:

```json
{
  "type": "object",
  "properties": {
    "summary_text":      { "type": "string" },
    "key_topics":        { "type": "array", "items": { "type": "string" } },
    "sentiment":         { "enum": ["positive", "neutral", "negative", "mixed"] },
    "life_domains":      { "type": "array", "items": { "enum": ["career", "finance", "health", "..."] }, "maxItems": 5 },
    "tone":              { "enum": ["friendly", "professional", "contentious", "collaborative", "instructional", "brainstorming"] },
    "insights":          { "type": "array", "items": { "$ref": "#/$defs/insight" } },
    "entities":          { "type": "array", "items": { "$ref": "#/$defs/entity" } },
    "action_items":      { "type": "array", "items": { "type": "string" } },
    "decisions":         { "type": "array", "items": { "type": "string" } }
  }
}
```

This minimises token cost and latency. A single call is approximately 1,500–4,000 tokens per conversation depending on transcript length. With GPT-4o, a full ChatGPT export history of ~500 conversations costs approximately $2–6 USD to enrich end-to-end.

---

## Instance Store Options

| Option | Best For | Notes |
|---|---|---|
| **NDJSON on disk** | Personal / prototype | Zero infra. Gittable. One file per schema type. |
| **SQLite** | Solo / desktop app | Zero-server, fast local queries, easy backup. |
| **Postgres (JSONB)** | Production / multi-user | Matches `examples/external-consumption/postgres-ddl.sql` already in this repo. Full SQL query support. |
| **Neo4j** | Graph reasoning | Native traversal of OLP relationship graph. Higher ops overhead. |

For a first implementation, SQLite is recommended — zero-dependency, works offline, trivially portable, and can be migrated to Postgres later with no schema changes.

---

## Incremental Sync

OpenAI exports are cumulative snapshots, not event streams. The pipeline maintains a sync manifest at `data/sync-manifest.json`:

```json
{
  "last_run_at": "2026-06-09T00:00:00Z",
  "conversations_seen": 412,
  "ingested_ids": ["conv_abc...", "conv_def..."],
  "delta_ids": [],
  "pending_review": ["conv_xyz..."],
  "errors": []
}
```

On each run:

1. Parse all conversation IDs from `conversations.json`
2. Diff against `ingested_ids` in the manifest
3. Process only new or changed conversations (those with a newer `update_time`)
4. Update the manifest atomically on completion

Subsequent runs on unchanged exports complete in milliseconds with zero API calls.

---

## Pipeline Script Layout

```
scripts/
  ingest-openai.mjs          ← CLI entry point
                               Usage: node scripts/ingest-openai.mjs --input conversations.json --person-id person_abc123

  enrichment/
    extract.mjs              ← single OpenAI structured outputs call per conversation
    map-to-olp.mjs           ← transforms LLM response JSON → OLP schema instances
    dedup.mjs                ← ID + content-hash deduplication
    entity-resolver.mjs      ← links extracted entities to existing actor instances

  validate.mjs               ← ajv validation against public/schemas/*.schema.json
  store.mjs                  ← writes to instance store (NDJSON / SQLite / Postgres)
  sync-manifest.mjs          ← reads and updates sync state
```

Dependencies required beyond what is already in `package.json`:

| Package | Purpose | Already present? |
|---|---|---|
| `ajv` | Schema validation | ✅ devDependencies |
| `ajv-formats` | Date/UUID format validation | ✅ devDependencies |
| `openai` | OpenAI API client | ❌ add to dependencies |
| `better-sqlite3` | SQLite instance store | ❌ optional, add if SQLite chosen |

No framework required. Plain Node.js ESM scripts throughout.

---

## Provenance and Trust Tier

Every instance written by the pipeline carries a `provenance` record with:

```json
{
  "sources": [{
    "source_type": "openai-export",
    "source_id": "<original openai conversation id>",
    "truth_tier": "generated",
    "confidence": 0.85,
    "observed_at": "<ingestion timestamp>"
  }],
  "primary_truth_tier": "generated",
  "overall_confidence": 0.85
}
```

This correctly signals to the OLP reasoning layer that these instances are AI-derived and should be treated as `generated` tier — not `authoritative`. A user who manually reviews and confirms an instance can promote it to `claimed` or `verified` via a review UI.

---

## Security Considerations

- The OpenAI API key is read from an environment variable (`OPENAI_API_KEY`), never from a config file committed to the repo
- `conversations.json` is never committed — it stays in `data/` which is added to `.gitignore`
- The instance store (`data/instances/`) is similarly gitignored
- No conversation content is logged to stdout unless `--verbose` is explicitly passed
- All file reads use `fs.readFileSync` with explicit path validation to prevent path traversal

---

## Success Criteria

| Metric | Target |
|---|---|
| Ingestion accuracy | ≥90% of conversations produce a valid `conversation` instance on first pass |
| Validation pass rate | ≥95% of LLM-produced instances pass `ajv` validation without manual correction |
| Dedup effectiveness | Zero duplicate `conversation` instances across multiple import runs of the same export |
| Incremental cost | Subsequent runs on unchanged exports: 0 API calls, <1s runtime |
| Provenance coverage | 100% of ingested instances have a linked `provenance` record |

---

## Phased Delivery

**Phase 1 — Core Pipeline (MVP)**
`ingest-openai.mjs`, `extract.mjs`, `map-to-olp.mjs`, `validate.mjs`, NDJSON store, sync manifest. Produces `conversation`, `document-summary`, `classification`, `tag`, `provenance` instances.

**Phase 2 — Entity Resolution**
`entity-resolver.mjs`, `entity-alias` linking, `entity-extraction` instances, `pending_review` queue.

**Phase 3 — Decision and Action Intelligence**
`decision-journal` and `action-item` instance extraction. Confidence scoring. User review UI for promoted truth tier.

**Phase 4 — Multi-Source Ingestion**
Extend the same pipeline to additional export formats: Google Takeout, iCloud, LinkedIn, Notion. Each source gets a `map-to-olp.mjs` adapter. The enrichment, validation, store and provenance layers are shared.

---

## Next Step

Implement Phase 1: `scripts/ingest-openai.mjs` and `scripts/enrichment/extract.mjs`.
