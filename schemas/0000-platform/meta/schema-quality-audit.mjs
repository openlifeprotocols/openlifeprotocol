import fs from 'node:fs';

const registryPath = 'schemas/0000-platform/meta/schema-registry.json';
const curationPath = 'schemas/0000-platform/meta/schema-curation.json';
const relationshipTypePath = 'schemas/0000-platform/meta/relationship-type.schema.json';

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const curation = JSON.parse(fs.readFileSync(curationPath, 'utf8'));
const relationshipTypeSchema = JSON.parse(fs.readFileSync(relationshipTypePath, 'utf8'));

// Extract governed relationship types dynamically from schema enum
const governedPredicates = new Set(
  relationshipTypeSchema.properties?.relationship_name?.enum || []
);

const curatedSchemas = new Set(curation.curations?.map(c => c.schema) || []);
const entries = registry.entries || [];

// Audit categories
const issues = {
  uncuratedCritical: [],      // High-importance schemas with no curation
  invalidPredicates: [],      // Relationships using ungoverned predicates
  missingLifecycle: [],       // Canonical schemas with null lifecycle
  nullSemantics: [],          // Core/critical schemas with null semanticDescription
  invalidChannels: [],        // Invalid channel values
  invalidRoles: [],           // Invalid role values
  invalidSensitivity: [],     // Invalid sensitivity levels
  invalidGraphImportance: [], // Invalid graph importance
  canonicalVsExtension: [],   // Consistency issues between canonical flag and ontologyType
  orphanedSchemas: [],        // Schemas that extends non-existent parent
  duplicateNames: [],         // Schemas with same name at different paths
  namingViolations: [],       // Schemas violating wrapper naming convention
  emptyLifeDomains: []        // Core schemas with empty lifeDomains
};

// Valid values
const validChannels = new Set(['personal', 'business', 'employment', 'public', 'internal']);
const validRoles = new Set([
  'founder', 'employee', 'mentor', 'customer', 'advisor', 'contractor', 'shareholder',
  'operator', 'parent', 'partner', 'investor', 'volunteer', 'member', 'contributor'
]);
const validSensitivity = new Set(['low', 'medium', 'high', 'public']);
const validGraphImportance = new Set(['core', 'supporting', 'utility']);
const validLifeDomains = new Set([
  'person', 'relationships', 'health', 'learning', 'career', 'wealth', 'property',
  'mobility', 'digital-life', 'culture', 'creativity', 'community', 'life-story',
  'planning', 'administration', 'time', 'opportunities', 'risks', 'public-presence',
  'enterprise'
]);

// Collect schema names by schema name (for duplicate detection)
const schemasByName = new Map();
for (const entry of entries) {
  if (!schemasByName.has(entry.schema)) {
    schemasByName.set(entry.schema, []);
  }
  schemasByName.get(entry.schema).push(entry);
}

// Critical schemas that should be curated
const criticalSchemas = new Set([
  'document', 'project', 'goal', 'risk', 'opportunity', 'decision', 'relationship',
  'actor', 'payment', 'organisation', 'contract', 'invoice', 'workflow', 'milestone',
  'resource-allocation', 'deliverable', 'certification', 'customer', 'employee',
  'mentor', 'contractor', 'startup', 'event', 'timeline', 'note', 'asset'
]);

// Audit each entry
for (const entry of entries) {
  const isCurated = curatedSchemas.has(entry.schema);
  const isCritical = criticalSchemas.has(entry.schema);
  const isCanonical = entry.canonical === true;

  // Rule 1: Critical schemas should be curated
  if (isCritical && !isCurated && isCanonical) {
    issues.uncuratedCritical.push({
      schema: entry.schema,
      path: entry.path,
      ontologyType: entry.ontologyType,
      reason: 'Critical canonical schema is not curated'
    });
  }

  // Rule 2: Relationships must use governed predicates
  if (Array.isArray(entry.relationships) && entry.relationships.length > 0) {
    for (const rel of entry.relationships) {
      if (!governedPredicates.has(rel.type)) {
        issues.invalidPredicates.push({
          schema: entry.schema,
          path: entry.path,
          relationship: rel,
          reason: `Ungoverned predicate: ${rel.type}`
        });
      }
    }
  }

  // Rule 3: Canonical core schemas should have lifecycle
  if (isCanonical && entry.ontologyType === 'canonical' && criticalSchemas.has(entry.schema)) {
    if (entry.lifecycle === null || entry.lifecycle === undefined) {
      issues.missingLifecycle.push({
        schema: entry.schema,
        path: entry.path,
        reason: 'Canonical core schema missing lifecycle definition'
      });
    }
  }

  // Rule 4: Core/critical schemas should have semanticDescription
  if (entry.graphImportance === 'core' && (entry.semanticDescription === null || entry.semanticDescription === undefined)) {
    issues.nullSemantics.push({
      schema: entry.schema,
      path: entry.path,
      ontologyType: entry.ontologyType,
      reason: 'Core schema missing semantic description'
    });
  }

  // Rule 5: Validate channel values
  if (Array.isArray(entry.channels)) {
    for (const channel of entry.channels) {
      if (!validChannels.has(channel)) {
        issues.invalidChannels.push({
          schema: entry.schema,
          path: entry.path,
          value: channel,
          reason: `Invalid channel value: ${channel}`
        });
      }
    }
  }

  // Rule 6: Validate role values
  if (Array.isArray(entry.roles)) {
    for (const role of entry.roles) {
      if (!validRoles.has(role)) {
        issues.invalidRoles.push({
          schema: entry.schema,
          path: entry.path,
          value: role,
          reason: `Invalid role value: ${role}`
        });
      }
    }
  }

  // Rule 7: Validate sensitivity enum
  if (entry.sensitivity && !validSensitivity.has(entry.sensitivity)) {
    issues.invalidSensitivity.push({
      schema: entry.schema,
      path: entry.path,
      value: entry.sensitivity,
      reason: `Invalid sensitivity value: ${entry.sensitivity}`
    });
  }

  // Rule 8: Validate graphImportance enum
  if (entry.graphImportance && !validGraphImportance.has(entry.graphImportance)) {
    issues.invalidGraphImportance.push({
      schema: entry.schema,
      path: entry.path,
      value: entry.graphImportance,
      reason: `Invalid graphImportance value: ${entry.graphImportance}`
    });
  }

  // Rule 9: Canonical flag should match ontologyType
  if (entry.canonical && entry.ontologyType !== 'canonical') {
    issues.canonicalVsExtension.push({
      schema: entry.schema,
      path: entry.path,
      canonical: entry.canonical,
      ontologyType: entry.ontologyType,
      reason: 'canonical=true but ontologyType is not "canonical"'
    });
  }

  // Rule 10: If extends is set, parent should exist
  if (entry.extends) {
    const parentExists = entries.some(e => e.schema === entry.extends && e.canonical);
    if (!parentExists) {
      issues.orphanedSchemas.push({
        schema: entry.schema,
        path: entry.path,
        extends: entry.extends,
        reason: `Parent schema "${entry.extends}" not found as canonical`
      });
    }
  }

  // Rule 11: Core/critical schemas should have lifeDomains
  if (entry.graphImportance === 'core' && (!Array.isArray(entry.lifeDomains) || entry.lifeDomains.length === 0)) {
    issues.emptyLifeDomains.push({
      schema: entry.schema,
      path: entry.path,
      reason: 'Core schema has empty lifeDomains'
    });
  }

  // Rule 12: Validate lifeDomains values
  if (Array.isArray(entry.lifeDomains)) {
    for (const domain of entry.lifeDomains) {
      if (!validLifeDomains.has(domain)) {
        issues.emptyLifeDomains.push({
          schema: entry.schema,
          path: entry.path,
          value: domain,
          reason: `Invalid lifeDomain value: ${domain}`
        });
      }
    }
  }
}

// Rule 13: Check for duplicate schema names at different paths (content duplicates, not variants)
for (const [schemaName, entriesWithName] of schemasByName.entries()) {
  if (entriesWithName.length > 1) {
    const canonicalCount = entriesWithName.filter(e => e.canonical).length;
    if (canonicalCount > 1) {
      issues.duplicateNames.push({
        schema: schemaName,
        count: entriesWithName.length,
        paths: entriesWithName.map(e => ({ path: e.path, canonical: e.canonical })),
        reason: 'Multiple canonical definitions of same schema'
      });
    }
  }
}

// Rule 14: Wrapper naming convention (explicit context prefixes for extensions)
const wrapperPatterns = [
  { pattern: /^(creative|consulting|engagement|career|learning|impact|parenting|sustainability|financial)-/, category: 'extension' },
  { pattern: /^(sales|legal|operational|invoice-finance)-/, category: 'extension' },
  { pattern: /-view$/, category: 'view' },
  { pattern: /^wealth-/, category: 'dashboard' }
];

for (const entry of entries) {
  if (entry.ontologyType === 'extension' || entry.ontologyType === 'view') {
    const hasExplicitPrefix = wrapperPatterns.some(w => w.pattern.test(entry.schema));
    if (!hasExplicitPrefix && entry.extends) {
      issues.namingViolations.push({
        schema: entry.schema,
        path: entry.path,
        ontologyType: entry.ontologyType,
        extends: entry.extends,
        reason: 'Extension/view missing explicit context prefix (e.g., sales-, operational-, -view)'
      });
    }
  }
}

// Summary statistics
const summary = {
  totalSchemas: entries.length,
  curatedSchemas: curatedSchemas.size,
  curationCoverage: ((curatedSchemas.size / entries.length) * 100).toFixed(1) + '%',

  relationshipsPopulated: entries.filter(e => Array.isArray(e.relationships) && e.relationships.length > 0).length,
  lifecycleLinked: entries.filter(e => e.lifecycle !== null && e.lifecycle !== undefined).length,
  semanticsDocumented: entries.filter(e => e.semanticDescription !== null && e.semanticDescription !== undefined).length,
  lifeDomainsMapped: entries.filter(e => Array.isArray(e.lifeDomains) && e.lifeDomains.length > 0).length,

  coreSchemas: entries.filter(e => e.graphImportance === 'core').length,
  supportingSchemas: entries.filter(e => e.graphImportance === 'supporting').length,
  utilitySchemas: entries.filter(e => e.graphImportance === 'utility').length,

  canonicalSchemas: entries.filter(e => e.canonical).length,
  extensionSchemas: entries.filter(e => e.ontologyType === 'extension').length,
  viewSchemas: entries.filter(e => e.ontologyType === 'view').length,
  specialisationSchemas: entries.filter(e => e.ontologyType === 'specialisation').length
};

// Issues summary
const issuesSummary = {
  uncuratedCritical: issues.uncuratedCritical.length,
  invalidPredicates: issues.invalidPredicates.length,
  missingLifecycle: issues.missingLifecycle.length,
  nullSemantics: issues.nullSemantics.length,
  invalidChannels: issues.invalidChannels.length,
  invalidRoles: issues.invalidRoles.length,
  invalidSensitivity: issues.invalidSensitivity.length,
  invalidGraphImportance: issues.invalidGraphImportance.length,
  canonicalVsExtension: issues.canonicalVsExtension.length,
  orphanedSchemas: issues.orphanedSchemas.length,
  duplicateNames: issues.duplicateNames.length,
  namingViolations: issues.namingViolations.length,
  emptyLifeDomains: issues.emptyLifeDomains.length
};

const totalIssues = Object.values(issuesSummary).reduce((a, b) => a + b, 0);

// Generate report
console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║          SCHEMA ONTOLOGY QUALITY AUDIT REPORT                ║');
console.log('║                                                              ║');
console.log('║ Testing 812 schemas against governance standards             ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

console.log('📊 CURATION COVERAGE');
console.log('────────────────────────────────────────────────────────────────');
console.log(`  Total Schemas:           ${summary.totalSchemas}`);
console.log(`  Curated Schemas:         ${summary.curatedSchemas} (${summary.curationCoverage})`);
console.log(`  Critical Uncurated:      ${issuesSummary.uncuratedCritical}`);
console.log();

console.log('📈 METADATA POPULATION');
console.log('────────────────────────────────────────────────────────────────');
console.log(`  Relationships Defined:   ${summary.relationshipsPopulated} (${((summary.relationshipsPopulated / entries.length) * 100).toFixed(1)}%)`);
console.log(`  Lifecycle Linked:        ${summary.lifecycleLinked} (${((summary.lifecycleLinked / entries.length) * 100).toFixed(1)}%)`);
console.log(`  Semantic Descriptions:   ${summary.semanticsDocumented} (${((summary.semanticsDocumented / entries.length) * 100).toFixed(1)}%)`);
console.log(`  Life Domains Mapped:     ${summary.lifeDomainsMapped} (${((summary.lifeDomainsMapped / entries.length) * 100).toFixed(1)}%)`);
console.log();

console.log('🏛️  ONTOLOGY STRUCTURE');
console.log('────────────────────────────────────────────────────────────────');
console.log(`  Canonical Schemas:       ${summary.canonicalSchemas}`);
console.log(`  Extension Schemas:       ${summary.extensionSchemas}`);
console.log(`  View Schemas:            ${summary.viewSchemas}`);
console.log(`  Specialisation Schemas:  ${summary.specialisationSchemas}`);
console.log();

console.log('⚖️  GRAPH IMPORTANCE DISTRIBUTION');
console.log('────────────────────────────────────────────────────────────────');
console.log(`  Core Schemas:            ${summary.coreSchemas} (${((summary.coreSchemas / entries.length) * 100).toFixed(1)}%)`);
console.log(`  Supporting Schemas:      ${summary.supportingSchemas} (${((summary.supportingSchemas / entries.length) * 100).toFixed(1)}%)`);
console.log(`  Utility Schemas:         ${summary.utilitySchemas} (${((summary.utilitySchemas / entries.length) * 100).toFixed(1)}%)`);
console.log();

console.log('⚠️  GOVERNANCE ISSUES');
console.log('────────────────────────────────────────────────────────────────');
console.log(`  Total Issues Found:      ${totalIssues}`);
console.log();

if (totalIssues === 0) {
  console.log('  ✅ ALL SCHEMAS PASS GOVERNANCE STANDARDS\n');
} else {
  if (issuesSummary.uncuratedCritical > 0) {
    console.log(`  🔴 CRITICAL: ${issuesSummary.uncuratedCritical} critical schemas uncurated`);
  }
  if (issuesSummary.invalidPredicates > 0) {
    console.log(`  🔴 ERROR: ${issuesSummary.invalidPredicates} relationships use ungoverned predicates`);
  }
  if (issuesSummary.missingLifecycle > 0) {
    console.log(`  🟠 WARNING: ${issuesSummary.missingLifecycle} canonical schemas missing lifecycle`);
  }
  if (issuesSummary.nullSemantics > 0) {
    console.log(`  🟡 NOTE: ${issuesSummary.nullSemantics} core schemas lack semantic descriptions`);
  }
  if (issuesSummary.emptyLifeDomains > 0) {
    console.log(`  🟡 NOTE: ${issuesSummary.emptyLifeDomains} core schemas have empty lifeDomains`);
  }
  if (issuesSummary.namingViolations > 0) {
    console.log(`  🟡 NOTE: ${issuesSummary.namingViolations} extensions/views lack explicit naming`);
  }
  if (issuesSummary.canonicalVsExtension > 0) {
    console.log(`  🟠 WARNING: ${issuesSummary.canonicalVsExtension} canonical flag mismatches`);
  }
  if (issuesSummary.orphanedSchemas > 0) {
    console.log(`  🔴 ERROR: ${issuesSummary.orphanedSchemas} schemas extend non-existent parents`);
  }
  if (issuesSummary.duplicateNames > 0) {
    console.log(`  🔴 ERROR: ${issuesSummary.duplicateNames} schemas have duplicate canonical names`);
  }
  console.log();
}

// Detailed issue reporting (only if issues exist)
if (totalIssues > 0) {
  if (issues.missingLifecycle.length > 0) {
    console.log('\n🟠 MISSING LIFECYCLE DEFINITIONS (CANONICAL CORE SCHEMAS)');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.missingLifecycle) {
      console.log(`  ${issue.schema}`);
      console.log(`    → ${issue.path}`);
    }
  }

  if (issues.canonicalVsExtension.length > 0) {
    console.log('\n🟠 CANONICAL FLAG MISMATCHES');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.canonicalVsExtension.slice(0, 10)) {
      console.log(`  ${issue.schema}: canonical=${issue.canonical} but ontologyType="${issue.ontologyType}"`);
    }
    if (issues.canonicalVsExtension.length > 10) {
      console.log(`  ... and ${issues.canonicalVsExtension.length - 10} more`);
    }
  }

  if (issues.orphanedSchemas.length > 0) {
    console.log('\n🔴 ORPHANED SCHEMAS (EXTEND NON-EXISTENT PARENTS)');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.orphanedSchemas) {
      console.log(`  ${issue.schema} extends "${issue.extends}"`);
      console.log(`    → ${issue.path}`);
    }
  }

  if (issues.uncuratedCritical.length > 0) {
    console.log('\n🔴 UNCURATED CRITICAL SCHEMAS');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.uncuratedCritical.slice(0, 5)) {
      console.log(`  ${issue.schema} (${issue.ontologyType})`);
      console.log(`    → ${issue.path}`);
    }
    if (issues.uncuratedCritical.length > 5) {
      console.log(`  ... and ${issues.uncuratedCritical.length - 5} more`);
    }
  }

  if (issues.invalidPredicates.length > 0) {
    console.log('\n🔴 INVALID RELATIONSHIP PREDICATES');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.invalidPredicates.slice(0, 5)) {
      console.log(`  ${issue.schema}: "${issue.relationship.type}"`);
    }
    if (issues.invalidPredicates.length > 5) {
      console.log(`  ... and ${issues.invalidPredicates.length - 5} more`);
    }
  }

  if (issues.namingViolations.length > 0) {
    console.log('\n🟡 NAMING CONVENTION VIOLATIONS');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.namingViolations.slice(0, 5)) {
      console.log(`  ${issue.schema} (extends: ${issue.extends})`);
      console.log(`    → Missing context prefix (e.g., sales-, operational-, -view)`);
    }
    if (issues.namingViolations.length > 5) {
      console.log(`  ... and ${issues.namingViolations.length - 5} more`);
    }
  }

  if (issues.emptyLifeDomains.length > 0) {
    console.log('\n🟡 UNMAPPED LIFE DOMAINS (CORE SCHEMAS)');
    console.log('────────────────────────────────────────────────────────────────');
    for (const issue of issues.emptyLifeDomains.filter(i => i.reason?.includes('empty')).slice(0, 5)) {
      console.log(`  ${issue.schema}`);
    }
    const unmappedCount = issues.emptyLifeDomains.filter(i => i.reason?.includes('empty')).length;
    if (unmappedCount > 5) {
      console.log(`  ... and ${unmappedCount - 5} more`);
    }
  }
}

console.log('\n═══════════════════════════════════════════════════════════════\n');

// Exit with appropriate code
if (issues.uncuratedCritical.length > 0 ||
    issues.invalidPredicates.length > 0 ||
    issues.orphanedSchemas.length > 0 ||
    issues.duplicateNames.length > 0) {
  console.log('❌ GOVERNANCE CHECK FAILED');
  process.exit(1);
} else if (totalIssues > 0) {
  console.log('⚠️  GOVERNANCE CHECK PASSED WITH WARNINGS');
  process.exit(0);
} else {
  console.log('✅ GOVERNANCE CHECK PASSED');
  process.exit(0);
}
