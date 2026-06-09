# Schema Decision Log

This log captures why schema decisions were made.

It is intentionally short, plain-language, and non-technical.

## Entry Template

- Date:
- Decision:
- Status: proposed | accepted | superseded
- Context:
- Rationale:
- Trade-offs:
- Consequence:
- Follow-up:

---

## 2026-06-09 - Adopt numbered life accounts as primary structure

- Date: 2026-06-09
- Decision: Organize schemas under numbered top-level accounts (0000-19000) instead of unnumbered domain buckets.
- Status: accepted
- Context: Flat and mixed domain naming became harder to navigate at scale.
- Rationale: Numbered accounts create stable hierarchy, clear rollups, and long-term expansion room.
- Trade-offs: Initial migration effort and temporary path churn.
- Consequence: Improved discoverability, consistent growth model, better reporting by life domain.
- Follow-up: Keep new domains aligned to account logic, not convenience.

## 2026-06-09 - Split Work into Career and Enterprise

- Date: 2026-06-09
- Decision: Replace `5000-work` with `5000-career-profession` and introduce `19000-enterprise-ventures`.
- Status: accepted
- Context: Work mixed person-as-labour and person-as-owner/operator concepts in one account.
- Rationale: Career and enterprise are different modes of participation and should be modeled separately.
- Trade-offs: One-time migration complexity and path churn.
- Consequence: Cleaner reasoning for employee, freelancer, founder, creator, investor, and volunteer combinations.
- Follow-up: Keep person-facing career records in 5000 and organization/venture operations in 19000.

## 2026-06-09 - Career account scope clarified

- Date: 2026-06-09
- Decision: Define 5000 as Career & Profession (labour and professional identity), including employment and professional mentorship.
- Status: accepted
- Context: Mentorship could sit under relationships or career depending on purpose.
- Rationale: Professional mentorship is primarily career-development in this model.
- Trade-offs: Personal/life mentorship use cases may need explicit channel tagging.
- Consequence: Career account now reflects worker-centric journey and progression.
- Follow-up: Distinguish professional vs personal mentorship through channel and role.

## 2026-06-09 - Enterprise account scope clarified

- Date: 2026-06-09
- Decision: Define 19000 as Enterprise & Ventures and map business operations into numbered enterprise subaccounts.
- Status: accepted
- Context: Business and startup structures were previously nested under work.
- Rationale: Ventures are organizational systems and should be modeled independently from labour/career.
- Trade-offs: Requires clear links between person records and enterprise records.
- Consequence: Business, startups, customers, sales, marketing, operations, finance, HR, and strategy now roll up under enterprise.
- Follow-up: Add linking conventions between 5000 career entities and 19000 enterprise entities.

## 2026-06-09 - Rename Self to Person

- Date: 2026-06-09
- Decision: Rename `1000-self` to `1000-person`.
- Status: accepted
- Context: "Self" felt subjective and ambiguous as a chart root.
- Rationale: "Person" is clearer as the canonical subject for cross-domain relationships.
- Trade-offs: Minor rename overhead.
- Consequence: Better conceptual alignment across identity, relationships, health, work, wealth.
- Follow-up: Use `person_id` as the preferred anchor where appropriate.

## 2026-06-09 - Create Time as first-class account

- Date: 2026-06-09
- Decision: Add `16000-time` with dedicated schemas.
- Status: accepted
- Context: Time influences all domains but was previously implicit.
- Rationale: Explicit time modeling enables planning quality, allocation analysis, and life-balance insight.
- Trade-offs: Potential overlap with event-style schemas if boundaries are not maintained.
- Consequence: Clear home for calendar, commitments, recurring schedules, and time allocation.
- Follow-up: Keep time schemas focused on temporal structure, not domain-specific content.

## 2026-06-09 - Create Opportunities as first-class account

- Date: 2026-06-09
- Decision: Add `17000-opportunities` for future potential entities.
- Status: accepted
- Context: Existing opportunities existed in business scope but not personal life scope.
- Rationale: Opportunities, ideas, and prospects are pre-commitment assets and deserve explicit modeling.
- Trade-offs: Must avoid duplicate meaning with work/business opportunity schemas.
- Consequence: Personal opportunity pipeline can be modeled independently from business sales pipeline.
- Follow-up: Clarify boundary rules between personal and business opportunity concepts.

## 2026-06-09 - Create Risks as first-class account

- Date: 2026-06-09
- Decision: Add `18000-risks` with personal risk and mitigation planning schemas.
- Status: accepted
- Context: Risk existed in business context but not as a life-wide domain.
- Rationale: Personal systems need explicit downside modeling, not only goals and growth.
- Trade-offs: Requires disciplined upkeep to stay useful.
- Consequence: Structured treatment of health, financial, legal, cyber, dependency risks, plus contingency plans.
- Follow-up: Add periodic risk review cadence and links to mitigation actions.

## Style Decisions (Working Rules)

- Date: 2026-06-09
- Decision: Use concept-first schema creation with mindset checks.
- Status: accepted
- Context: High schema count increases drift risk.
- Rationale: Shared rules reduce duplicate concepts and inconsistent modeling.
- Trade-offs: Slightly slower initial schema creation.
- Consequence: Better long-term maintainability and ontology clarity.
- Follow-up: Enforce checklist from `SCHEMA_CREATION_MINDSET.md` for all new schemas.

## 2026-06-09 - Adopt Account + Channel + Role classification

- Date: 2026-06-09
- Decision: Classify records with account (life area), channel (capacity), and role (active posture).
- Status: accepted
- Context: Personal and business contexts were starting to create pressure for duplicate schemas.
- Rationale: Shared schemas plus channel/role classification preserve conceptual integrity and reduce duplication.
- Trade-offs: Requires disciplined tagging and governance to avoid inconsistent channel usage.
- Consequence: One ontology can support employed, founder, creator, investor, family, and community contexts without parallel schema trees.
- Follow-up: Standardize default channel values and role vocabulary; review new schema proposals for channel-first modeling.

## 2026-06-09 - Keep business operations distinct from person-facing records

- Date: 2026-06-09
- Decision: Use enterprise-focused accounts for business entities/operations, but keep person-facing records in life accounts with business/founder channels.
- Status: accepted
- Context: Business data spans both operating entities and personal life impact.
- Rationale: Separates organizational operations from personal digital twin records while preserving linkage.
- Trade-offs: Some records need explicit linking across accounts.
- Consequence: Cleaner boundaries without losing cross-domain analysis.
- Follow-up: Define cross-account relationship conventions for person-to-enterprise links.

## Open Decisions

- Decide whether cross-cutting lenses (Time, Opportunity, Risk) should eventually have shared relationship conventions.
- Decide whether we need a single "meta classification" field pattern for all schemas.
- Decide review cadence for pruning or merging near-duplicate schemas.
- Define canonical channel enum and role vocabulary at ontology level.
