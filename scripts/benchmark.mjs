#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { performance } from 'node:perf_hooks';

const checks = [
  {
    name: 'Registry Validation',
    command: ['node', 'schemas/0000-platform/meta/validate-schema-registry.mjs'],
    maxMs: Number(process.env.BENCH_REGISTRY_VALIDATE_MAX_MS || 15000)
  },
  {
    name: 'Semantic Coverage Audit',
    command: ['node', 'schemas/0000-platform/meta/semantic-coverage-audit.mjs'],
    maxMs: Number(process.env.BENCH_SEMANTIC_AUDIT_MAX_MS || 20000)
  },
  {
    name: 'Transitive Inference Engine',
    command: ['node', 'schemas/0000-platform/meta/transitive-inference-engine.mjs'],
    maxMs: Number(process.env.BENCH_INFERENCE_MAX_MS || 30000)
  },
  {
    name: 'Consequence Chain Detector',
    command: ['node', 'schemas/0000-platform/meta/chain-detector.mjs'],
    maxMs: Number(process.env.BENCH_CHAIN_MAX_MS || 30000)
  }
];

let failed = false;

console.log('Benchmark / Performance Validation');
console.log('===================================\n');

for (const check of checks) {
  const start = performance.now();
  const result = spawnSync(check.command[0], check.command.slice(1), {
    stdio: 'pipe',
    encoding: 'utf8'
  });
  const duration = Math.round(performance.now() - start);

  const status = result.status === 0 && duration <= check.maxMs ? 'PASS' : 'FAIL';
  if (status === 'FAIL') failed = true;

  console.log(`${status} ${check.name}`);
  console.log(`  Duration: ${duration}ms (threshold ${check.maxMs}ms)`);

  if (result.status !== 0) {
    console.log(`  Exit code: ${result.status}`);
    if (result.stderr) {
      console.log('  stderr:');
      console.log(result.stderr.trim());
    }
  }

  if (duration > check.maxMs) {
    console.log('  Reason: exceeded threshold');
  }

  console.log('');
}

if (failed) {
  console.error('Performance validation failed.');
  process.exit(1);
}

console.log('All benchmark checks passed.');
