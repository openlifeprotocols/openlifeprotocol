# Schema Creation Mindset

This is not a technical spec. It is a way of thinking.

Use this when creating any new schema so the model stays coherent over years, not just releases.

## Purpose

A schema in this system should answer one question clearly:
- What real thing in a human life does this represent?

If the answer is vague, stop and redefine it before writing fields.

## Core Mindset

1. Model reality, not apps
- We model enduring life entities and events, not UI screens or features.
- Good: `commitment`, `opportunity`, `health-risk`.
- Avoid: `dashboard-widget`, `form-step`, `quick-note-modal`.

2. Prefer stable nouns over temporary workflows
- A schema should survive product changes.
- Workflows can change every quarter. Entities should not.

3. Domain first, then attributes
- Place the schema in the right life account first.
- Only then define fields.
- Wrong folder = future confusion, even if fields are good.

4. Keep first version minimal but meaningful
- Start with essential identity + meaning + lifecycle.
- Add depth only when there is a repeated real use case.

5. Make decisions legible to future maintainers
- Every non-obvious choice gets a short decision log entry.
- If we cannot explain a choice in plain language, it is likely not ready.

6. Design for relationships across domains
- Most value comes from cross-domain links (time + work + health + wealth).
- A schema should be useful alone and in relationship to others.

7. Avoid duplicate concepts with different names
- Before adding a schema, check if a near-equivalent already exists.
- Extend or scope existing schemas before creating parallel duplicates.

8. Separate account from channel from role
- Account answers: what area of life this belongs to.
- Channel answers: in what capacity this record exists.
- Role answers: who the person is acting as in that context.
- Keep one shared schema where possible, then classify with channel and role.

## Classification Model: Account + Channel + Role

Use this mental model for every record:
- Account = life area.
- Channel = capacity (personal, employment, founder, business, creator, investor, family, community).
- Role = active posture in that context (for example: employee, founder, operator, parent, partner, mentor, investor, volunteer).

Example mindset:
- Invoice can exist in wealth account with channel business and role founder.
- Utility bill can use the same billing/payment concept with channel personal.
- Opportunity can exist once as a concept, then vary by channel and role.

Design rule:
- Do not fork schemas into personal vs business unless the concept itself is different.
- Prefer shared schema plus explicit channel and role classification.

## Creation Flow (Non-Technical)

1. Name the concept in plain language
- "What is this in a person's life?"

2. Identify the home account
- Which top-level account does it naturally roll up into?
- If split across many accounts, it may be a cross-cutting lens.

3. Write a one-line meaning test
- "This schema exists to capture..."
- If this line sounds like software behavior, rewrite.

4. Define boundaries
- What this schema includes.
- What it explicitly does not include.

5. Check overlap
- Search nearby schemas for duplicates or near-duplicates.

6. Decide relationship intent
- Which schemas should this connect to most often?

7. Define lifecycle mindset
- What does "active", "complete", "archived" mean here in real life?

8. Log the decision
- Record why this schema exists and why it lives where it lives.

9. Classify with channel and role
- Ask: does this concept already exist and only differ by capacity?
- If yes, reuse schema and classify by channel and role.
- If no, only then create a distinct schema.

## Quality Bar (Before Adding Any Schema)

A new schema is ready only if all are true:
- It represents a real-life entity/event, not a UI artifact.
- Its placement in the chart of accounts is obvious and defensible.
- It is distinct from existing schemas.
- Its role in cross-domain analysis is clear.
- A future teammate can understand the "why" in 60 seconds.
- It is clear whether variation should be modeled via channel/role rather than a new schema.

## Naming and Scope Heuristics

- Use specific names for specific concepts: `time-block` not `time-item`.
- Use broad names only for truly broad concepts: `opportunity` is broad by design.
- Use qualifiers when needed to avoid collisions: `financial-risk` vs `risk`.
- Prefer singular schema names representing a type of thing.

## Anti-Patterns to Avoid

- Adding schemas "just in case" with no current or near-term meaning.
- Creating sibling schemas that differ only by context and not by concept.
- Encoding policy decisions into the schema name.
- Overfitting to one application workflow.
- Treating folders as cosmetic instead of semantic.

## Mindset Used For Recent Additions

This is the mindset used to create `16000-time`, `17000-opportunities`, and `18000-risks`:
- Time is a first-class life resource, not a feature.
- Opportunities represent future potential and must exist before commitment.
- Risks represent downside exposure and require explicit mitigation intent.
- Person is the root subject (`1000-person`) for coherent cross-domain linkage.

Channel and role mindset applied:
- Shared concepts are preferred across personal and business contexts.
- Capacity differences are captured by channel and role, not duplicate schema trees.
- Enterprise records can live in enterprise-focused accounts, while person-facing records stay in life accounts and carry business/founder channels when relevant.

Career vs enterprise clarification:
- Career & Profession (5000) models the person as a worker/professional.
- Enterprise & Ventures (19000) models organizations, ventures, and operations the person owns, runs, advises, or participates in.
- Use channel and role to connect person records to enterprise records without collapsing both concepts into one account.

## Maintenance Rhythm

- When adding a schema: update decision log immediately.
- When changing schema intent: add a new decision entry; do not rewrite history.
- Every quarter: review duplicates, stale schemas, and unclear boundaries.
