#!/usr/bin/env node

/**
 * PHASE 4.3 — CONSEQUENCE CHAIN DETECTOR
 *
 * Detects multi-hop causal sequences and impact propagation.
 *
 * Examples:
 *   Payment fails → Subscription inactive → Project halted → Goal delayed
 *   Decision made → Project started → Milestone achieved → Outcome observed
 *   Risk identified → Threatens project → Impacts goal → Delays objective
 */

import fs from 'fs';

const registryPath = './schemas/0000-platform/meta/schema-registry.json';
const inferredPath = './schemas/0000-platform/meta/inferred-relationships.json';

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const inferredFile = fs.existsSync(inferredPath) ? JSON.parse(fs.readFileSync(inferredPath, 'utf8')) : null;

class ChainDetector {
  constructor(registry, inferred) {
    this.registry = registry;
    this.inferred = inferred?.inferences || [];
    this.chains = [];
    this.relationshipMap = new Map();
    this.stats = {
      totalChains: 0,
      byDepth: {},
      byStartRelation: {},
      totalReachability: 0
    };
  }

  /**
   * Build map of outgoing relationships for fast traversal
   */
  buildRelationshipMap() {
    // Index base relationships
    for (const entry of this.registry.entries) {
      if (!entry.relationships) continue;

      for (const rel of entry.relationships) {
        const key = entry.schema;
        if (!this.relationshipMap.has(key)) {
          this.relationshipMap.set(key, []);
        }
        this.relationshipMap.get(key).push({
          target: rel.target,
          type: rel.type,
          strength: rel.strength,
          confidence: rel.confidence,
          necessity: rel.necessity,
          source: 'base'
        });
      }
    }

    // Index inferred relationships
    for (const inf of this.inferred) {
      const key = inf.source;
      if (!this.relationshipMap.has(key)) {
        this.relationshipMap.set(key, []);
      }
      this.relationshipMap.get(key).push({
        target: inf.target,
        type: inf.type,
        strength: inf.strength,
        confidence: inf.confidence,
        necessity: inf.necessity,
        source: 'inferred',
        ruleId: inf.ruleId
      });
    }
  }

  /**
   * Depth-first search for consequence chains
   */
  findChains(startEntity, maxDepth = 5, minConfidence = 0.3) {
    const chains = [];

    const dfs = (current, path, depth) => {
      if (depth > maxDepth) return;
      if (path.length > 1) {
        chains.push([...path]);
      }

      const outgoing = this.relationshipMap.get(current) || [];
      for (const rel of outgoing) {
        // Skip if confidence too low
        if (rel.confidence < minConfidence) continue;

        // Skip circular paths
        if (path.some(p => p.entity === rel.target)) continue;

        const newPath = [
          ...path,
          {
            entity: rel.target,
            relation: rel.type,
            strength: rel.strength,
            confidence: rel.confidence,
            necessity: rel.necessity,
            source: rel.source
          }
        ];

        dfs(rel.target, newPath, depth + 1);
      }
    };

    dfs(startEntity, [{ entity: startEntity, relation: 'START', strength: 1.0, confidence: 1.0 }], 0);
    return chains;
  }

  /**
   * Calculate cascading impact through chain
   */
  calculateImpact(chain) {
    let strength = 1.0;
    let confidence = 1.0;

    for (let i = 1; i < chain.length; i++) {
      const link = chain[i];
      strength *= link.strength;
      confidence *= Math.min(confidence, link.confidence);
    }

    return {
      totalStrength: Math.max(0.1, strength),
      totalConfidence: Math.max(0.1, confidence),
      hops: chain.length - 1,
      impactMagnitude: strength * confidence
    };
  }

  /**
   * Detect important consequence chains (>2 hops, high confidence)
   */
  detectSignificantChains() {
    console.log('🔗 PHASE 4.3 CONSEQUENCE CHAIN DETECTOR');
    console.log('═════════════════════════════════════════════════════════\n');

    for (const entry of this.registry.entries) {
      const chains = this.findChains(entry.schema, 4, 0.5);

      for (const chain of chains) {
        if (chain.length < 2) continue;

        const impact = this.calculateImpact(chain);

        // Only keep significant chains
        if (impact.impactMagnitude < 0.2) continue;

        const chainRecord = {
          startEntity: entry.schema,
          chain: chain.map((c, i) => ({
            step: i,
            entity: c.entity,
            relation: c.relation,
            strength: c.strength,
            confidence: c.confidence
          })),
          impact: impact
        };

        this.chains.push(chainRecord);

        const depth = chain.length - 1;
        this.stats.byDepth[depth] = (this.stats.byDepth[depth] || 0) + 1;
        this.stats.byStartRelation[chain[1]?.relation] = (this.stats.byStartRelation[chain[1]?.relation] || 0) + 1;
      }
    }

    this.stats.totalChains = this.chains.length;
  }

  /**
   * Find consequence chains matching a predicate
   */
  findChainsWithPredicate(predicate) {
    return this.chains.filter(chain => chain.chain.some(link => link.relation === predicate));
  }

  /**
   * Get top chains by impact magnitude
   */
  getTopChains(count = 10) {
    return [...this.chains].sort((a, b) => b.impact.impactMagnitude - a.impact.impactMagnitude).slice(0, count);
  }

  /**
   * Save chains to file
   */
  saveChains() {
    const output = {
      version: '1.0.0',
      description: 'Consequence chains detected by Phase 4.3 chain detector',
      generatedAt: new Date().toISOString(),
      totalChains: this.chains.length,
      statistics: this.stats,
      topChainsByImpact: this.getTopChains(20),
      allChains: this.chains
    };

    fs.writeFileSync('./schemas/0000-platform/meta/consequence-chains.json', JSON.stringify(output, null, 2) + '\n');
  }

  /**
   * Print examples
   */
  printExamples() {
    console.log('📋 TOP CONSEQUENCE CHAINS (by impact magnitude)');
    console.log('═════════════════════════════════════════════════════════\n');

    const top = this.getTopChains(5);
    for (let i = 0; i < top.length; i++) {
      const chain = top[i];
      const path = [chain.startEntity, ...chain.chain.map(c => c.entity)].join(' → ');

      console.log(`${i + 1}. ${path}`);
      console.log(`   Hops: ${chain.impact.hops}`);
      console.log(`   Strength: ${(chain.impact.totalStrength * 100).toFixed(1)}%`);
      console.log(`   Confidence: ${(chain.impact.totalConfidence * 100).toFixed(1)}%`);
      console.log(`   Impact: ${(chain.impact.impactMagnitude * 100).toFixed(1)}%\n`);
    }

    console.log('📊 DISTRIBUTION');
    console.log('─────────────────────────────────────────────────────────');
    console.log(`Total chains: ${this.stats.totalChains}`);
    console.log(`Unique starting relations:\n`);
    for (const [rel, count] of Object.entries(this.stats.byStartRelation).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${rel.padEnd(20)} ${count}`);
    }
  }
}

// Run detector
const detector = new ChainDetector(registry, inferredFile);
detector.buildRelationshipMap();
detector.detectSignificantChains();
detector.saveChains();
detector.printExamples();
