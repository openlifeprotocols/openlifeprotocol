import { execSync } from 'node:child_process';
import fs from 'node:fs';

const registryPath = 'schemas/0000-platform/meta/schema-registry.json';
const accountsPath = 'schemas/0000-platform/meta/accounts.json';

const existing = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const accounts = JSON.parse(fs.readFileSync(accountsPath, 'utf8'));
const curation = JSON.parse(fs.readFileSync('schemas/0000-platform/meta/schema-curation.json', 'utf8'));

const curatedBySchema = new Map();
for (const c of (curation.curations || [])) {
  curatedBySchema.set(c.schema, c);
}

const byPath = new Map();
for (const entry of existing.entries || []) {
  if (entry.path) byPath.set(entry.path, entry);
}

const accountNameByCode = new Map(Object.entries(accounts).map(([code, v]) => [code, v.name]));

const schemaFiles = execSync("find schemas -name '*.schema.json' | sort", { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

const canonicalPathOverrides = new Map([
  ['relationship', 'schemas/2000-relationships/relationships/relationship.schema.json'],
  ['opportunity', 'schemas/17000-opportunities/opportunities/opportunity.schema.json']
]);

const explicitExtends = new Map([
  ['creative-project', 'project'],
  ['consulting-engagement', 'project'],
  ['engagement', 'project'],
  ['career-goal', 'goal'],
  ['learning-goal', 'goal'],
  ['impact-goal', 'goal'],
  ['parenting-goal', 'goal'],
  ['sustainability-goal', 'goal'],
  ['financial-goals', 'goal'],
  ['startup', 'organisation'],
  ['lead', 'opportunity'],
  ['prospect', 'opportunity'],
  ['legal-contract', 'contract'],
  ['sales-contract', 'contract'],
  ['sales-invoice', 'invoice'],
  ['invoice-finance-view', 'invoice'],
  ['operational-workflow', 'workflow'],
  ['operational-deliverable', 'deliverable'],
  ['operational-resource-allocation', 'resource-allocation'],
  ['operational-milestone', 'milestone']
]);

const ontologyTypeOverrides = new Map([
  ['creative-project', 'extension'],
  ['consulting-engagement', 'extension'],
  ['engagement', 'extension'],
  ['sales-contract', 'extension'],
  ['sales-invoice', 'extension'],
  ['invoice-finance-view', 'view'],
  ['operational-workflow', 'extension'],
  ['operational-deliverable', 'extension'],
  ['operational-resource-allocation', 'extension'],
  ['operational-milestone', 'extension'],
  ['startup', 'specialisation'],
  ['lead', 'specialisation'],
  ['prospect', 'specialisation'],
  ['customer', 'specialisation'],
  ['employee', 'specialisation'],
  ['mentor', 'specialisation'],
  ['contractor', 'specialisation'],
  ['wealth-dashboard', 'view'],
  ['timeline-view', 'view']
]);

const rows = schemaFiles.map((path) => {
  const rel = path.replace(/^schemas\//, '');
  const parts = rel.split('/');
  const accountPart = parts[0] || '0000-platform';
  const account = (accountPart.match(/^(\d{4,5})-/) || [])[1] || '0000';
  const schema = parts.at(-1).replace(/\.schema\.json$/, '');
  const parent = parts.length >= 3 ? parts.at(-2) : (parts[1] || 'core');

  return { schema, account, parent, path };
});

const groups = new Map();
for (const row of rows) {
  if (!groups.has(row.schema)) groups.set(row.schema, []);
  groups.get(row.schema).push(row);
}

const canonicalPathBySchema = new Map();
for (const [schema, entries] of groups.entries()) {
  const override = canonicalPathOverrides.get(schema);
  if (override && entries.some((e) => e.path === override)) {
    canonicalPathBySchema.set(schema, override);
    continue;
  }

  const coreCandidate = entries.find((e) => e.path.startsWith('schemas/0000-platform/core/'));
  if (coreCandidate) {
    canonicalPathBySchema.set(schema, coreCandidate.path);
    continue;
  }

  const sorted = [...entries].sort((a, b) => {
    if (a.path.length !== b.path.length) return a.path.length - b.path.length;
    return a.path.localeCompare(b.path);
  });
  canonicalPathBySchema.set(schema, sorted[0].path);
}

const entries = rows.map((row) => {
  const previous = byPath.get(row.path) || {};
  const canonicalPath = canonicalPathBySchema.get(row.schema);
  const canonical = row.path === canonicalPath;
  const authoritativePath = canonicalPath || row.path;

  let extendsSchema = null;
  if (explicitExtends.has(row.schema)) {
    extendsSchema = explicitExtends.get(row.schema);
  } else if (!canonical && groups.get(row.schema)?.length > 1) {
    extendsSchema = row.schema;
  }

  let ontologyType = 'canonical';
  if (ontologyTypeOverrides.has(row.schema)) {
    ontologyType = ontologyTypeOverrides.get(row.schema);
  } else if (/(-view$|dashboard$)/.test(row.schema)) {
    ontologyType = 'view';
  } else if (!canonical && extendsSchema) {
    ontologyType = 'specialisation';
  }

  const accountName = accountNameByCode.get(row.account) || 'Unknown';
  const tags = Array.from(new Set([
    row.account,
    accountName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    row.parent
  ])).filter(Boolean);

  const curated = curatedBySchema.get(row.schema) || {};

  // Enforce: canonical should match ontologyType
  // Only truly canonical schemas have canonical=true
  const shouldBeCanonical = ontologyType === 'canonical' && canonical;

  // Enforce: canonical schemas should never extend themselves or anything else
  let finalExtends = previous.extends ?? extendsSchema;
  if (shouldBeCanonical) {
    finalExtends = null;
  } else if (finalExtends === row.schema) {
    // Prevent self-referential extends
    finalExtends = null;
  }

  return {
    schema: row.schema,
    account: row.account,
    parent: row.parent,
    path: row.path,
    authoritativePath,
    canonical: shouldBeCanonical,
    extends: finalExtends,
    ontologyType: previous.ontologyType ?? ontologyType,
    canonicalReferences: Array.isArray(previous.canonicalReferences) ? previous.canonicalReferences : [],
    tags: Array.isArray(previous.tags) ? previous.tags : tags,
    relationships: (curated.relationships?.length > 0) ? curated.relationships : (Array.isArray(previous.relationships) ? previous.relationships : []),
    lifecycle: previous.lifecycle ?? (curated.lifecycle ?? null),
    expectedAuthority: previous.expectedAuthority ?? (curated.expectedAuthority ?? null),
    sensitivity: previous.sensitivity ?? (curated.sensitivity ?? "low"),
    retention: previous.retention ?? (curated.retention ?? null),
    channels: Array.isArray(previous.channels) ? previous.channels : (curated.channels ?? []),
    roles: Array.isArray(previous.roles) ? previous.roles : (curated.roles ?? []),
    semanticDescription: previous.semanticDescription ?? (curated.semanticDescription ?? null),
    graphImportance: curated.graphImportance ?? previous.graphImportance ?? "supporting",
    lifeDomains: (curated.lifeDomains?.length > 0) ? curated.lifeDomains : (Array.isArray(previous.lifeDomains) ? previous.lifeDomains : [])
  };
});

const out = {
  version: 3,
  description: 'Ontology registry for schema-to-account mapping, canonical lineage, and graph references (generated index).',
  generatedAt: new Date().toISOString(),
  entryCount: entries.length,
  fields: {
    required: ['schema', 'account', 'parent', 'path', 'canonical'],
    optional: ['extends', 'authoritativePath', 'ontologyType', 'canonicalReferences', 'tags', 'relationships', 'lifecycle', 'expectedAuthority', 'sensitivity', 'retention', 'channels', 'roles', 'semanticDescription', 'graphImportance', 'lifeDomains']
  },
  entries
};

fs.writeFileSync(registryPath, JSON.stringify(out, null, 2) + '\n');
console.log(`Generated ${entries.length} registry entries -> ${registryPath}`);
