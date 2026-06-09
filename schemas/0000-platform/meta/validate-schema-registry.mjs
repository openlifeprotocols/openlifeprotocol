import fs from 'node:fs';
import { execSync } from 'node:child_process';

const registryPath = 'schemas/0000-platform/meta/schema-registry.json';
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

const requiredEntryFields = ['schema', 'account', 'parent', 'path', 'canonical'];
const schemaFiles = execSync("find schemas -name '*.schema.json' | sort", { encoding: 'utf8' })
  .trim()
  .split('\n')
  .filter(Boolean);

const errors = [];

if (!Array.isArray(registry.entries)) {
  errors.push('Registry entries is not an array');
}

const entries = Array.isArray(registry.entries) ? registry.entries : [];
const seenPaths = new Set();
const entryPaths = new Set();

for (const [index, entry] of entries.entries()) {
  for (const field of requiredEntryFields) {
    if (!(field in entry)) {
      errors.push(`Entry ${index} missing required field: ${field}`);
    }
  }

  if (typeof entry.path !== 'string') {
    errors.push(`Entry ${index} has invalid path type`);
    continue;
  }

  if (seenPaths.has(entry.path)) {
    errors.push(`Duplicate registry path entry: ${entry.path}`);
  }
  seenPaths.add(entry.path);
  entryPaths.add(entry.path);

  if (!fs.existsSync(entry.path)) {
    errors.push(`Registry path does not exist: ${entry.path}`);
  }

  const accountFromPath = (entry.path.replace(/^schemas\//, '').split('/')[0].match(/^(\d{4,5})-/) || [])[1] || '0000';
  if (entry.account !== accountFromPath) {
    errors.push(`Account mismatch for ${entry.path}: entry=${entry.account} path=${accountFromPath}`);
  }

  if (!Array.isArray(entry.canonicalReferences)) {
    errors.push(`canonicalReferences must be array: ${entry.path}`);
  }

  if (entry.extends !== null && typeof entry.extends !== 'string') {
    errors.push(`extends must be string or null: ${entry.path}`);
  }

  if (typeof entry.canonical !== 'boolean') {
    errors.push(`canonical must be boolean: ${entry.path}`);
  }
}

for (const path of schemaFiles) {
  if (!entryPaths.has(path)) {
    errors.push(`Schema file missing in registry: ${path}`);
  }
}

if (entries.length !== schemaFiles.length) {
  errors.push(`Entry count mismatch: registry=${entries.length} files=${schemaFiles.length}`);
}

if (errors.length > 0) {
  console.error('Schema registry validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Schema registry valid: ${entries.length} entries, ${schemaFiles.length} schema files.`);
