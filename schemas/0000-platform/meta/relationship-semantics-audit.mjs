#!/usr/bin/env node

/**
 * RELATIONSHIP SEMANTICS COVERAGE AUDIT
 *
 * Tracks Phase 3.5 enrichment quality:
 * - Strength coverage (0.1-1.0 values assigned)
 * - Confidence coverage (0.1-1.0 values assigned)
 * - Necessity coverage (must|should|may assigned)
 * - Relationship cardinality validation
 *
 * Quality indicators for Phase 4 reasoning
 */

import fs from 'fs';

const curationPath = './schemas/0000-platform/meta/schema-curation.json';
const defaultsPath = './schemas/0000-platform/meta/predicate-defaults.json';

const curation = JSON.parse(fs.readFileSync(curationPath, 'utf8'));
const defaults = JSON.parse(fs.readFileSync(defaultsPath, 'utf8'));

const stats = {
  totalSchemas: 0,
  schemasWithRelationships: 0,
  totalRelationships: 0,
  strength: { complete: 0, incomplete: 0, schemas: [] },
  confidence: { complete: 0, incomplete: 0, schemas: [] },
  necessity: { complete: 0, incomplete: 0, schemas: [] },
  allThreeFields: { complete: 0, incomplete: 0, schemas: [] },
  strengthValues: {},
  confidenceValues: {},
  necessityValues: { must: 0, should: 0, may: 0 },
  cardinalityByNecessity: {}
};

for (const schema of curation.curations || []) {
  stats.totalSchemas++;

  if (!schema.relationships || schema.relationships.length === 0) continue;

  stats.schemasWithRelationships++;

  for (const rel of schema.relationships) {
    stats.totalRelationships++;

    // Track strength
    if (rel.strength !== undefined && rel.strength >= 0.1 && rel.strength <= 1.0) {
      stats.strength.complete++;
      stats.strengthValues[rel.strength] = (stats.strengthValues[rel.strength] || 0) + 1;
    } else {
      stats.strength.incomplete++;
      stats.strength.schemas.push(`${schema.schema}.${rel.type}->${rel.target}`);
    }

    // Track confidence
    if (rel.confidence !== undefined && rel.confidence >= 0.1 && rel.confidence <= 1.0) {
      stats.confidence.complete++;
      stats.confidenceValues[rel.confidence] = (stats.confidenceValues[rel.confidence] || 0) + 1;
    } else {
      stats.confidence.incomplete++;
      stats.confidence.schemas.push(`${schema.schema}.${rel.type}->${rel.target}`);
    }

    // Track necessity
    if (['must', 'should', 'may'].includes(rel.necessity)) {
      stats.necessity.complete++;
      stats.necessityValues[rel.necessity]++;

      // Track cardinality patterns by necessity
      const key = `${rel.cardinality}_${rel.necessity}`;
      stats.cardinalityByNecessity[key] = (stats.cardinalityByNecessity[key] || 0) + 1;
    } else {
      stats.necessity.incomplete++;
      stats.necessity.schemas.push(`${schema.schema}.${rel.type}->${rel.target}`);
    }

    // Track all three fields
    if (rel.strength !== undefined && rel.confidence !== undefined && ['must', 'should', 'may'].includes(rel.necessity)) {
      stats.allThreeFields.complete++;
    } else {
      stats.allThreeFields.incomplete++;
      stats.allThreeFields.schemas.push(`${schema.schema}.${rel.type}->${rel.target}`);
    }
  }
}

function calculatePercentage(count, total) {
  return ((count / total) * 100).toFixed(1);
}

console.log('🎬 PHASE 3.5 — RELATIONSHIP SEMANTICS AUDIT');
console.log('═════════════════════════════════════════════════════════════════\n');

console.log('📊 COVERAGE SUMMARY');
console.log('─────────────────────────────────────────────────────────────────');
console.log(`  Total Schemas: ${stats.totalSchemas}`);
console.log(`  Schemas with Relationships: ${stats.schemasWithRelationships}`);
console.log(`  Total Relationships: ${stats.totalRelationships}\n`);

console.log('✅ SEMANTIC FIELD COVERAGE');
console.log('─────────────────────────────────────────────────────────────────');
console.log(`  Strength:     ${stats.strength.complete}/${stats.totalRelationships} (${calculatePercentage(stats.strength.complete, stats.totalRelationships)}%)`);
console.log(`  Confidence:   ${stats.confidence.complete}/${stats.totalRelationships} (${calculatePercentage(stats.confidence.complete, stats.totalRelationships)}%)`);
console.log(`  Necessity:    ${stats.necessity.complete}/${stats.totalRelationships} (${calculatePercentage(stats.necessity.complete, stats.totalRelationships)}%)`);
console.log(`  ALL THREE:    ${stats.allThreeFields.complete}/${stats.totalRelationships} (${calculatePercentage(stats.allThreeFields.complete, stats.totalRelationships)}%)\n`);

console.log('📈 NECESSITY DISTRIBUTION');
console.log('─────────────────────────────────────────────────────────────────');
console.log(`  must   (required):   ${stats.necessityValues.must} (${calculatePercentage(stats.necessityValues.must, stats.totalRelationships)}%)`);
console.log(`  should (recommended): ${stats.necessityValues.should} (${calculatePercentage(stats.necessityValues.should, stats.totalRelationships)}%)`);
console.log(`  may    (optional):    ${stats.necessityValues.may} (${calculatePercentage(stats.necessityValues.may, stats.totalRelationships)}%)\n`);

console.log('💪 STRENGTH DISTRIBUTION');
console.log('─────────────────────────────────────────────────────────────────');
const sortedStrengths = Object.entries(stats.strengthValues)
  .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
  .slice(0, 10);
for (const [strength, count] of sortedStrengths) {
  const bar = '█'.repeat(Math.round(count / 2));
  console.log(`  ${strength}: ${count.toString().padStart(3)} ${bar}`);
}
console.log();

console.log('🔄 CARDINALITY × NECESSITY PATTERNS');
console.log('─────────────────────────────────────────────────────────────────');
const cardinalityPatterns = Object.entries(stats.cardinalityByNecessity)
  .sort((a, b) => b[1] - a[1]);
for (const [pattern, count] of cardinalityPatterns) {
  console.log(`  ${pattern}: ${count}`);
}
console.log();

if (stats.allThreeFields.incomplete === 0) {
  console.log('✅ PHASE 3.5 COMPLETE');
  console.log('═════════════════════════════════════════════════════════════════');
  console.log(`\n✓ All ${stats.totalRelationships} relationships have:
  • strength (0.1-1.0) - relationship importance
  • confidence (0.1-1.0) - relationship certainty
  • necessity (must|should|may) - requirement level

🎯 READY FOR PHASE 4 REASONING

Phase 4 can now:
  - Weight relationships by strength for inference importance
  - Filter by confidence for reliability thresholds
  - Enforce must-relationships, suggest should, explore may
  - Balance inference with semantic quality
\n`);
} else {
  console.log('⚠️  INCOMPLETE FIELDS');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log(`  ${stats.allThreeFields.incomplete} relationships need semantic enrichment`);
  if (stats.allThreeFields.incomplete <= 10) {
    console.log(`\n  Incomplete relationships:`);
    stats.allThreeFields.schemas.slice(0, 10).forEach(s => console.log(`    • ${s}`));
  }
}
