import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const root = process.cwd();
const metaSchemaPath = path.join(root, 'schemas/0000-platform/meta/reasoning-rule.schema.json');
const publicSchemaPath = path.join(root, 'public/schemas/reasoning-rule.schema.json');

const metaSchema = JSON.parse(fs.readFileSync(metaSchemaPath, 'utf8'));
const publicSchema = JSON.parse(fs.readFileSync(publicSchemaPath, 'utf8'));

function baseRule() {
  return {
    id: 'reasoning_rule_goal_blocked_by_risk',
    uuid: '2f97a307-86dc-4f31-98f8-3268cfd2fd8c',
    rule: 'goal_blocked_by_risk',
    version: '1.0.0',
    name: 'Goal Blocked By Risk',
    description: 'Infer goal risk when a blocking relation exists.',
    ruleType: 'causal',
    outputType: 'relationship',
    riskLevel: 'medium',
    owner: 'ontology-team',
    maintainer: 'reasoning-engine',
    createdDate: '2026-06-09T22:00:00Z',
    updatedDate: '2026-06-09T22:00:00Z',
    conditions: [
      {
        source: 'Risk',
        predicate: 'blocks',
        target: 'Goal'
      }
    ],
    inferences: [
      {
        source: 'Goal',
        predicate: 'at-risk',
        target: 'Risk',
        strength: 0.8,
        confidence: 0.9,
        necessity: 'should'
      }
    ],
    confidence: 0.9,
    calculationMethod: {
      strength: 'multiply',
      confidence: 'min'
    },
    explanationTemplate:
      '{source} is inferred to affect {target} because {source} {predicate1} {middle} and {middle} {predicate2} {target}.',
    validationStatus: 'approved',
    testCaseReference: 'schemas/0000-platform/meta/tests/rules/goal_blocked_by_risk.json',
    maxDepth: 2,
    priority: 70,
    active: true,
    provenancePolicy: {
      evidenceRequired: true,
      minEvidenceCount: 1,
      allowedSources: ['user', 'institution', 'system']
    },
    metadata: {
      notes: 'Test fixture'
    }
  };
}

function validator(schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv.compile(schema);
}

test('meta and public reasoning-rule schemas are synchronized', () => {
  assert.deepEqual(metaSchema, publicSchema);
});

test('valid reasoning rule passes schema validation', () => {
  const validate = validator(metaSchema);
  const payload = baseRule();
  assert.equal(validate(payload), true, JSON.stringify(validate.errors, null, 2));
});

test('deprecated rule requires deprecationReason', () => {
  const validate = validator(metaSchema);
  const payload = baseRule();
  payload.validationStatus = 'deprecated';
  assert.equal(validate(payload), false);

  const errors = validate.errors || [];
  const requiredErrors = errors.filter((e) => e.keyword === 'required');
  assert.ok(requiredErrors.length > 0, 'Expected required error for deprecationReason');
});

test('deprecated rule with deprecationReason passes', () => {
  const validate = validator(metaSchema);
  const payload = baseRule();
  payload.validationStatus = 'deprecated';
  payload.deprecationReason = 'Superseded by risk_cascade_v2';
  assert.equal(validate(payload), true, JSON.stringify(validate.errors, null, 2));
});

test('rule requires either testCases or testCaseReference', () => {
  const validate = validator(metaSchema);
  const payload = baseRule();
  delete payload.testCaseReference;

  assert.equal(validate(payload), false);

  const errors = validate.errors || [];
  const anyOfError = errors.find((e) => e.keyword === 'anyOf');
  assert.ok(anyOfError, 'Expected anyOf validation error');
});
