#!/usr/bin/env node

/**
 * ENRICH RELATIONSHIP SEMANTICS (Phase 3.5)
 *
 * Adds strength, confidence, and necessity to all relationships
 * in schema-curation.json using predicate defaults.
 *
 * Semantic quality = Inference quality
 */

import fs from 'fs';

const curationPath = './schemas/0000-platform/meta/schema-curation.json';
const defaultsPath = './schemas/0000-platform/meta/predicate-defaults.json';

const curation = JSON.parse(fs.readFileSync(curationPath, 'utf8'));
const defaults = JSON.parse(fs.readFileSync(defaultsPath, 'utf8'));

let enrichedCount = 0;
let totalRelationships = 0;

// Enrich all relationships
for (const schema of curation.curations || []) {
  if (!schema.relationships || !Array.isArray(schema.relationships)) continue;

  for (const rel of schema.relationships) {
    totalRelationships++;

    // Skip if already has semantic fields
    if (rel.strength !== undefined && rel.confidence !== undefined && rel.necessity !== undefined) {
      continue;
    }

    // Look up predicate defaults
    const predicateDefaults = defaults.predicateDefaults[rel.type];

    if (predicateDefaults) {
      rel.strength = rel.strength ?? predicateDefaults.strength;
      rel.confidence = rel.confidence ?? predicateDefaults.confidence;
      rel.necessity = rel.necessity ?? predicateDefaults.necessity;
      enrichedCount++;
    } else {
      // Fallback for unknown predicates
      rel.strength = rel.strength ?? 0.7;
      rel.confidence = rel.confidence ?? 0.75;
      rel.necessity = rel.necessity ?? 'should';
      console.warn(`⚠️  Unknown predicate: ${rel.type} in ${schema.schema} -> using defaults`);
    }
  }
}

// Write enriched curation
fs.writeFileSync(curationPath, JSON.stringify(curation, null, 2) + '\n');

console.log('📊 RELATIONSHIP SEMANTICS ENRICHMENT');
console.log('─────────────────────────────────────');
console.log(`✅ Enriched: ${enrichedCount}/${totalRelationships} relationships`);
console.log(`📁 Output: ${curationPath}`);
console.log(`\n✓ All relationships now have:`);
console.log(`  • strength (0.1-1.0) - importance for entity definition`);
console.log(`  • confidence (0.1-1.0) - certainty of relationship type`);
console.log(`  • necessity (must|should|may) - requirement level`);
