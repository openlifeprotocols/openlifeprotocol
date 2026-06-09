#!/usr/bin/env node

/**
 * SEMANTIC COVERAGE AUDIT
 * 
 * Tracks knowledge density across the ontology:
 * - Semantic descriptions (AI understanding)
 * - Lifecycle links (temporal reasoning)
 * - Relationship definitions (graph connectivity)
 * - Life domain mappings (cross-domain inference)
 * 
 * Governance metrics were Phase 2.
 * Semantic metrics are Phase 3.
 * 
 * These answers: "Can AI reason over this ontology?"
 */

import fs from 'fs';
import path from 'path';

const registryPath = './schemas/0000-platform/meta/schema-registry.json';

function loadRegistry() {
  const content = fs.readFileSync(registryPath, 'utf-8');
  return JSON.parse(content);
}

function analyzeSemanticCoverage(registry) {
  // Registry is { version, description, generatedAt, entryCount, fields, entries }
  const entries = registry.entries || registry;
  const total = entries.length;
  
  const stats = {
    total: total,
    semanticDescriptions: {
      count: 0,
      schemas: [],
      missingSchemas: []
    },
    lifecycleLinks: {
      count: 0,
      schemas: [],
      missingSchemas: []
    },
    relationshipsDefined: {
      count: 0,
      schemas: [],
      missingSchemas: []
    },
    lifeDomainsMapped: {
      count: 0,
      schemas: [],
      missingSchemas: []
    },
    fullyEnriched: {
      count: 0,
      schemas: []
    },
    coreSchemas: {
      count: 0,
      schemas: []
    }
  };

  entries.forEach(entry => {
    // Semantic descriptions
    if (entry.semanticDescription && entry.semanticDescription.trim()) {
      stats.semanticDescriptions.count++;
      stats.semanticDescriptions.schemas.push(entry.schema);
    } else {
      stats.semanticDescriptions.missingSchemas.push(entry.schema);
    }

    // Lifecycle links
    if (entry.lifecycle) {
      stats.lifecycleLinks.count++;
      stats.lifecycleLinks.schemas.push(entry.schema);
    } else {
      stats.lifecycleLinks.missingSchemas.push(entry.schema);
    }

    // Relationships defined
    if (entry.relationships && entry.relationships.length > 0) {
      stats.relationshipsDefined.count++;
      stats.relationshipsDefined.schemas.push(entry.schema);
    } else {
      stats.relationshipsDefined.missingSchemas.push(entry.schema);
    }

    // Life domains mapped
    if (entry.lifeDomains && entry.lifeDomains.length > 0) {
      stats.lifeDomainsMapped.count++;
      stats.lifeDomainsMapped.schemas.push(entry.schema);
    } else {
      stats.lifeDomainsMapped.missingSchemas.push(entry.schema);
    }

    // Fully enriched (all 4 dimensions)
    const isFullyEnriched =
      (entry.semanticDescription && entry.semanticDescription.trim()) &&
      entry.lifecycle &&
      (entry.relationships && entry.relationships.length > 0) &&
      (entry.lifeDomains && entry.lifeDomains.length > 0);
    
    if (isFullyEnriched) {
      stats.fullyEnriched.count++;
      stats.fullyEnriched.schemas.push(entry.schema);
    }

    // Core schemas
    if (entry.graphImportance === 'core') {
      stats.coreSchemas.count++;
      stats.coreSchemas.schemas.push(entry.schema);
    }
  });

  return stats;
}

function calculatePercentage(count, total) {
  return ((count / total) * 100).toFixed(1);
}

function enrichmentPriority(registry) {
  // Registry is { version, description, generatedAt, entryCount, fields, entries }
  const entries = registry.entries || registry;
  
  // Priority tiers for semantic enrichment
  const criticalSchemas = [
    'document', 'project', 'goal', 'risk', 'opportunity', 'decision',
    'relationship', 'actor', 'payment', 'organisation', 'asset', 'event',
    'workflow', 'deliverable', 'resource-allocation', 'milestone',
    'certification', 'contract', 'invoice', 'customer', 'employee',
    'mentor', 'contractor', 'startup', 'note'
  ];

  const infrastructureSchemas = [
    'tag', 'classification', 'status', 'reference', 'identifier',
    'evidence', 'provenance', 'timeline', 'location'
  ];

  const tier1 = entries.filter(r => criticalSchemas.includes(r.schema));
  const tier2 = entries.filter(r => infrastructureSchemas.includes(r.schema));
  const tier3 = entries.filter(r => r.graphImportance === 'core').slice(0, 20);

  return { tier1, tier2, tier3 };
}

function printReport(stats, registry) {
  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║         SEMANTIC COVERAGE AUDIT - PHASE 3 READINESS            ║');
  console.log('║                                                               ║');
  console.log('║  Measures: Can AI understand and reason over this ontology?   ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');

  // Overall scores
  console.log('🧠 SEMANTIC RICHNESS SCORE');
  console.log('────────────────────────────────────────────────────────────────');
  
  const semanticScore = (
    (stats.semanticDescriptions.count / stats.total) * 0.25 +
    (stats.lifecycleLinks.count / stats.total) * 0.25 +
    (stats.relationshipsDefined.count / stats.total) * 0.25 +
    (stats.lifeDomainsMapped.count / stats.total) * 0.25
  ) * 10;

  console.log(`  Overall Semantic Score: ${semanticScore.toFixed(1)}/10\n`);

  // Individual metrics
  console.log('📖 SEMANTIC DESCRIPTIONS');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`  Defined: ${stats.semanticDescriptions.count}/${stats.total} (${calculatePercentage(stats.semanticDescriptions.count, stats.total)}%)`);
  console.log(`  Gap: ${stats.semanticDescriptions.missingSchemas.length} schemas need descriptions\n`);

  console.log('⏱️  LIFECYCLE LINKS');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`  Linked: ${stats.lifecycleLinks.count}/${stats.total} (${calculatePercentage(stats.lifecycleLinks.count, stats.total)}%)`);
  console.log(`  Gap: ${stats.lifecycleLinks.missingSchemas.length} schemas need lifecycle definitions\n`);

  console.log('🔗 RELATIONSHIP DEFINITIONS');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`  Defined: ${stats.relationshipsDefined.count}/${stats.total} (${calculatePercentage(stats.relationshipsDefined.count, stats.total)}%)`);
  console.log(`  Gap: ${stats.relationshipsDefined.missingSchemas.length} schemas need relationship mappings\n`);

  console.log('🌍 LIFE DOMAIN MAPPINGS');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`  Mapped: ${stats.lifeDomainsMapped.count}/${stats.total} (${calculatePercentage(stats.lifeDomainsMapped.count, stats.total)}%)`);
  console.log(`  Gap: ${stats.lifeDomainsMapped.missingSchemas.length} schemas need domain mapping\n`);

  console.log('✨ FULLY ENRICHED SCHEMAS');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`  All 4 dimensions: ${stats.fullyEnriched.count} schemas`);
  console.log(`  Coverage: ${calculatePercentage(stats.fullyEnriched.count, stats.total)}%\n`);

  // Priority for enrichment
  const priority = enrichmentPriority(registry);
  console.log('🎯 ENRICHMENT PRIORITY (Tier 1: Critical Concepts)');
  console.log('────────────────────────────────────────────────────────────────');
  
  const tier1Enrichment = priority.tier1.map(s => {
    const dims = [
      !!s.semanticDescription ? '📖' : '✗',
      s.lifecycle ? '⏱️' : '✗',
      (s.relationships && s.relationships.length > 0) ? '🔗' : '✗',
      (s.lifeDomains && s.lifeDomains.length > 0) ? '🌍' : '✗'
    ].join('');
    return `  ${s.schema.padEnd(25)} [${dims}]`;
  });

  console.log(tier1Enrichment.join('\n'));
  console.log(`\n  Key: 📖=Semantic 🔗=Relationships ⏱️=Lifecycle 🌍=LifeDomains ✗=Missing\n`);

  // Phase 3 milestones
  console.log('🎬 PHASE 3 MILESTONES');
  console.log('────────────────────────────────────────────────────────────────');
  console.log(`  Milestone A: 100 semantic descriptions (12% coverage)`);
  console.log(`    Progress: ${stats.semanticDescriptions.count}/100 (${calculatePercentage(stats.semanticDescriptions.count, 100)}%)\n`);
  
  console.log(`  Milestone B: 100 lifecycle links (12% coverage)`);
  console.log(`    Progress: ${stats.lifecycleLinks.count}/100 (${calculatePercentage(stats.lifecycleLinks.count, 100)}%)\n`);
  
  console.log(`  Milestone C: 100 relationship definitions (12% coverage)`);
  console.log(`    Progress: ${stats.relationshipsDefined.count}/100 (${calculatePercentage(stats.relationshipsDefined.count, 100)}%)\n`);
  
  console.log(`  Milestone D: 100 life domain mappings (12% coverage)`);
  console.log(`    Progress: ${stats.lifeDomainsMapped.count}/100 (${calculatePercentage(stats.lifeDomainsMapped.count, 100)}%)\n`);

  // Gap analysis
  console.log('⚠️  SEMANTIC GAPS (High Priority)');
  console.log('────────────────────────────────────────────────────────────────');
  
  const allGaps = new Set([
    ...priority.tier1.filter(s => !s.semanticDescription).map(s => s.schema),
    ...priority.tier2.filter(s => !s.semanticDescription).map(s => s.schema),
    ...priority.tier3.filter(s => !s.semanticDescription).map(s => s.schema)
  ]);

  console.log(`  Tier 1-3 schemas missing semantics: ${allGaps.size}`);
  Array.from(allGaps).slice(0, 20).forEach(s => console.log(`    - ${s}`));
  if (allGaps.size > 20) console.log(`    ... and ${allGaps.size - 20} more`);

  console.log('\n╔═══════════════════════════════════════════════════════════════╗');
  console.log('║                  PHASE 3 INSIGHT                              ║');
  console.log('╠═══════════════════════════════════════════════════════════════╣');
  console.log('║                                                               ║');
  console.log('║  Governance Phase: COMPLETE ✅ (0 violations)                 ║');
  console.log('║  Semantic Phase: IN PROGRESS 🔄                              ║');
  console.log('║                                                               ║');
  console.log('║  The structure is governed.                                   ║');
  console.log('║  The meaning is still sparse.                                 ║');
  console.log('║                                                               ║');
  console.log('║  Next: Semantic enrichment of 100+ schemas                    ║');
  console.log('║        to enable AI reasoning capabilities                    ║');
  console.log('║                                                               ║');
  console.log('╚═══════════════════════════════════════════════════════════════╝\n');
}

// Main execution
const registry = loadRegistry();
const stats = analyzeSemanticCoverage(registry);
printReport(stats, registry);

// Exit code 0 because semantic gaps are not failures, just opportunities
process.exit(0);
