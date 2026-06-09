#!/usr/bin/env node

/**
 * PHASE 4.1 — RULE ENGINE
 *
 * Applies inference rules to derive implicit relationships from explicit ones.
 *
 * Transforms:
 *   163 base relationships → 400-500 inferred relationships
 *
 * Enables multi-hop reasoning:
 *   Project fulfills Goal ∧ Goal advances Objective ⇒ Project contributes-to Objective
 */

import fs from 'fs';

const registryPath = './schemas/0000-platform/meta/schema-registry.json';
const rulesPath = './schemas/0000-platform/meta/inference-rules.json';
const defaultsPath = './schemas/0000-platform/meta/predicate-defaults.json';
const outputPath = './schemas/0000-platform/meta/inferred-relationships.json';

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));
const defaults = JSON.parse(fs.readFileSync(defaultsPath, 'utf8'));

class RuleEngine {
  constructor(registry, rules, defaults) {
    this.registry = registry;
    this.rules = rules;
    this.defaults = defaults;
    this.inferences = [];
    this.applicableRules = [];
    this.stats = {
      totalRules: rules.rules.length,
      appliedRules: 0,
      inferredRelationships: 0,
      byType: {},
      byCategory: {}
    };
  }

  /**
   * Build index of all relationships for fast lookup
   */
  indexRelationships() {
    this.relationshipIndex = new Map();

    for (const entry of this.registry.entries) {
      if (!entry.relationships || entry.relationships.length === 0) continue;

      for (const rel of entry.relationships) {
        const key = `${entry.schema}:${rel.type}:${rel.target}`;
        if (!this.relationshipIndex.has(key)) {
          this.relationshipIndex.set(key, []);
        }
        this.relationshipIndex.get(key).push({
          source: entry.schema,
          ...rel
        });
      }
    }
  }

  /**
   * Find matches for a single relationship in a rule pattern
   */
  findMatches(sourceSchema, pattern) {
    const key = `${sourceSchema}:${pattern.relation}:${pattern.target}`;
    return this.relationshipIndex.get(key) || [];
  }

  /**
   * Evaluate a formula like "multiply(0.85, 0.8)"
   */
  evaluateFormula(formula, values) {
    if (typeof formula === 'number') return formula;

    const match = formula.match(/^(\w+)\((.+)\)$/);
    if (!match) return 0.5;

    const [, func, args] = match;
    const params = args.split(',').map(arg => {
      arg = arg.trim();
      return values[arg] || parseFloat(arg) || 0.5;
    });

    switch (func) {
      case 'multiply':
        return params.reduce((a, b) => a * b, 1);
      case 'min':
        return Math.min(...params);
      case 'max':
        return Math.max(...params);
      case 'decay':
        return params[0] * Math.pow(params[1] || 0.9, params[2] || 1);
      case 'divide':
        return params[0] / params[1];
      default:
        return 0.5;
    }
  }

  /**
   * Check if rule constraints are satisfied
   */
  checkConstraints(rule, relationships) {
    const constraints = rule.constraints || {};

    if (constraints.minConfidence) {
      for (const rel of relationships) {
        if ((rel.confidence || 0.8) < constraints.minConfidence) {
          return false;
        }
      }
    }

    if (constraints.minStrength) {
      for (const rel of relationships) {
        if ((rel.strength || 0.7) < constraints.minStrength) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Apply a single transitive rule
   * Example: A --fulfills--> B, B --advances--> C => A --contributes-to--> C
   */
  applyTransitiveRule(rule) {
    const pattern = rule.pattern;
    if (pattern.length !== 2) return;

    const step1 = pattern[0];
    const step2 = pattern[1];

    for (const entry of this.registry.entries) {
      if (!entry.relationships) continue;

      // Match first step pattern
      for (const rel1 of entry.relationships) {
        // Check if this relationship matches the first pattern
        const step1Match =
          (step1.relation === '*' || rel1.type === step1.relation) &&
          (step1.target === '*' || rel1.target === step1.target);

        if (!step1Match) continue;

        // rel1 matches first step: entry --rel1--> rel1.target
        // Now find matching second step
        const targetEntry = this.registry.entries.find(e => e.schema === rel1.target);
        if (!targetEntry || !targetEntry.relationships) continue;

        for (const rel2 of targetEntry.relationships) {
          // Check if this relationship matches the second pattern
          const step2Match =
            (step2.relation === '*' || rel2.type === step2.relation) &&
            (step2.target === '*' || rel2.target === step2.target);

          if (!step2Match) continue;

          // Found matching chain: entry --rel1--> rel1.target --rel2--> rel2.target
          if (!this.checkConstraints(rule, [rel1, rel2])) continue;

          // Skip if source and target are the same (avoid reflexive)
          if (entry.schema === rel2.target) continue;

          // Create inferred relationship with dynamic strength/confidence calculation
          let strength, confidence;

          if (typeof rule.inference.strength === 'number') {
            strength = rule.inference.strength;
          } else if (typeof rule.inference.strength === 'string') {
            strength = this.evaluateFormula(rule.inference.strength, {
              '0.85': rel1.strength || 0.85,
              '0.8': rel2.strength || 0.8,
              s1: rel1.strength || 0.85,
              s2: rel2.strength || 0.8
            });
          } else {
            strength = 0.7;
          }

          if (typeof rule.inference.confidence === 'number') {
            confidence = rule.inference.confidence;
          } else if (typeof rule.inference.confidence === 'string') {
            confidence = this.evaluateFormula(rule.inference.confidence, {
              '0.8': rel1.confidence || 0.8,
              '0.75': rel2.confidence || 0.75,
              c1: rel1.confidence || 0.8,
              c2: rel2.confidence || 0.75
            });
          } else {
            confidence = 0.7;
          }

          const inferred = {
            source: entry.schema,
            target: rel2.target,
            type: rule.inference.relation,
            cardinality: 'many',
            required: false,
            strength: Math.max(0.1, Math.min(1.0, strength)),
            confidence: Math.max(0.1, Math.min(1.0, confidence)),
            necessity: rule.inference.necessity,
            ruleId: rule.id,
            derivedFrom: [
              { source: entry.schema, relation: rel1.type, target: rel1.target },
              { source: rel1.target, relation: rel2.type, target: rel2.target }
            ]
          };

          this.inferences.push(inferred);
        }
      }
    }
  }

  /**
   * Apply a single inverse rule
   * Example: A --owns--> B => B --owned-by--> A
   */
  applyInverseRule(rule) {
    const pattern = rule.pattern[0];

    for (const entry of this.registry.entries) {
      if (!entry.relationships) continue;

      for (const rel of entry.relationships) {
        if (rel.type !== pattern.relation) continue;

        const inferred = {
          source: rel.target,
          target: entry.schema,
          type: rule.inference.relation,
          cardinality: 'many',
          required: false,
          strength: rule.inference.strength,
          confidence: rule.inference.confidence,
          necessity: rule.inference.necessity,
          ruleId: rule.id,
          derivedFrom: {
            source: entry.schema,
            relation: rel.type,
            target: rel.target
          }
        };

        this.inferences.push(inferred);
      }
    }
  }

  /**
   * Apply rules to entire registry
   */
  applyRules() {
    console.log('🔄 PHASE 4.1 RULE ENGINE');
    console.log('═════════════════════════════════════════════════════════\n');

    this.indexRelationships();

    // Sort rules by priority (highest first)
    const sortedRules = [...this.rules.rules].sort((a, b) => (b.priority || 50) - (a.priority || 50));

    for (const rule of sortedRules) {
      const beforeCount = this.inferences.length;

      switch (rule.type) {
        case 'inverse':
          this.applyInverseRule(rule);
          break;
        case 'transitive':
          this.applyTransitiveRule(rule);
          break;
        case 'causal':
        case 'temporal':
        case 'aggregation':
          this.applyTransitiveRule(rule);
          break;
      }

      const afterCount = this.inferences.length;
      const newInferences = afterCount - beforeCount;

      if (newInferences > 0) {
        this.stats.appliedRules++;
        this.stats.byType[rule.type] = (this.stats.byType[rule.type] || 0) + newInferences;
        this.stats.byCategory[rule.category] = (this.stats.byCategory[rule.category] || 0) + newInferences;

        console.log(`✓ ${rule.name.padEnd(40)} ${newInferences.toString().padStart(4)} inferences`);
      }
    }

    this.stats.inferredRelationships = this.inferences.length;
  }

  /**
   * Save inferred relationships to file
   */
  saveInferences() {
    const output = {
      version: '1.0.0',
      description: 'Inferred relationships derived by Phase 4.1 rule engine',
      generatedAt: new Date().toISOString(),
      baseRelationships: this.registry.entries.reduce((sum, e) => sum + (e.relationships?.length || 0), 0),
      inferredRelationships: this.inferences.length,
      rules: {
        total: this.stats.totalRules,
        applied: this.stats.appliedRules
      },
      byType: this.stats.byType,
      byCategory: this.stats.byCategory,
      inferences: this.inferences
    };

    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
  }

  /**
   * Print summary statistics
   */
  printSummary() {
    console.log('\n📊 INFERENCE SUMMARY');
    console.log('═════════════════════════════════════════════════════════\n');
    console.log(`Base relationships:   163`);
    console.log(`Inferred relationships: ${this.stats.inferredRelationships}\n`);
    console.log(`Total relationships: ${163 + this.stats.inferredRelationships}`);
    console.log(`Inference ratio: ${(this.stats.inferredRelationships / 163).toFixed(1)}x\n`);

    console.log('📈 BY TYPE');
    console.log('─────────────────────────────────────────────────────────');
    for (const [type, count] of Object.entries(this.stats.byType)) {
      const pct = ((count / this.stats.inferredRelationships) * 100).toFixed(1);
      console.log(`  ${type.padEnd(15)} ${count.toString().padStart(3)} (${pct}%)`);
    }

    console.log('\n📂 BY CATEGORY');
    console.log('─────────────────────────────────────────────────────────');
    for (const [category, count] of Object.entries(this.stats.byCategory).sort((a, b) => b[1] - a[1])) {
      const pct = ((count / this.stats.inferredRelationships) * 100).toFixed(1);
      console.log(`  ${category.padEnd(15)} ${count.toString().padStart(3)} (${pct}%)`);
    }

    console.log(`\n✅ Inferred relationships saved to: ${outputPath}\n`);
  }
}

// Run engine
const engine = new RuleEngine(registry, rules, defaults);
engine.applyRules();
engine.saveInferences();
engine.printSummary();
