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

## 2026-06-09 - Create Public Presence account and remove identity leakage

- Date: 2026-06-09
- Decision: Move social media and reputation records out of person into `9500-public-presence`.
- Status: accepted
- Context: Social media and public visibility data were mixed into person/identity.
- Rationale: Public presence is not core identity; it is an external-facing layer spanning digital and creator contexts.
- Trade-offs: One-time folder migration and update to mental model.
- Consequence: Public profile, social media, speaking, and media mentions now roll up in one coherent account.
- Follow-up: Keep 1000-person focused on intrinsic identity, values, and personal attributes.

## 2026-06-09 - Canonicalize document schema in platform

- Date: 2026-06-09
- Decision: Keep canonical `document` under `0000-platform/core` and move document-support schemas to `0000-platform/documents`.
- Status: accepted
- Context: Duplicate document schema existed under administration documents.
- Rationale: Document is a platform primitive used by all accounts.
- Trade-offs: Some account-local assumptions must now be represented through references/classification instead of duplicate schema copies.
- Consequence: One canonical document concept, with support schemas centralized in platform documents.
- Follow-up: Ensure domain records reference document IDs rather than redefining document models.

## 2026-06-09 - Canonicalize project schema in platform

- Date: 2026-06-09
- Decision: Keep canonical `project` under `0000-platform/core` and remove duplicate account-specific project schemas.
- Status: accepted
- Context: Project existed in planning and enterprise operations with overlapping intent.
- Rationale: Project is a cross-channel concept and should be classified by channel/role rather than duplicated by account.
- Trade-offs: Business-specific project metadata now needs extension/reference patterns.
- Consequence: Reduced schema drift and consistent project semantics across personal, business, and creator contexts.
- Follow-up: Define extension conventions for specialized project metadata when needed.

## 2026-06-09 - Canonicalize idea schema in opportunities

- Date: 2026-06-09
- Decision: Keep canonical `idea` in opportunities and remove creator-local duplicate `idea` schema.
- Status: accepted
- Context: Ideas appeared in multiple accounts with overlapping semantics.
- Rationale: Ideas are pre-commitment opportunities, regardless of later domain (content, startup, investment, life).
- Trade-offs: Creator-specific fields may need to be optional extensions.
- Consequence: Single entry point for idea capture and conversion.
- Follow-up: Use channel/role + metadata for creator-specific idea workflows.

## 2026-06-09 - Introduce universal channel schema

- Date: 2026-06-09
- Decision: Add universal `channel.schema.json` in platform core.
- Status: accepted
- Context: Channel was a design principle but not yet formalized as a shared schema.
- Rationale: A canonical channel model reduces duplication and enforces consistent classification across accounts.
- Trade-offs: Requires governance of enum values and role vocabulary over time.
- Consequence: Records can now be consistently tagged with channel and optional role.
- Follow-up: Evaluate whether account-facing schemas should adopt a shared classification block pattern.

## 2026-06-09 - Canonicalize relationship entity

- Date: 2026-06-09
- Decision: Keep canonical `relationship` in `2000-relationships/relationships` and remove duplicate person-level relationship entity schemas.
- Status: accepted
- Context: Relationship entities existed in both person and relationships accounts with overlapping semantics.
- Rationale: Relationship is a cross-domain entity and should have one canonical definition.
- Trade-offs: Person-level nuance must be represented as linked reflection/annotation records rather than duplicate entities.
- Consequence: Reduced ontology ambiguity and cleaner relationship querying.
- Follow-up: Use linked reflection schemas for subjective/experiential relationship context.

## 2026-06-09 - Canonicalize goal entity

- Date: 2026-06-09
- Decision: Keep canonical `goal` in `0000-platform/core` and remove duplicate planning/person base goal schemas.
- Status: accepted
- Context: Generic goals were defined in multiple accounts with inconsistent fields.
- Rationale: Goal is cross-domain and should be queried/reportable through one base ontology shape.
- Trade-offs: Domain-specific goals become wrappers/extensions linked to canonical goal IDs.
- Consequence: Better interoperability and roll-up reporting across learning, wealth, parenting, impact, and career goals.
- Follow-up: Encourage goal wrappers to reference `goal_id` instead of redefining core goal fields.

## 2026-06-09 - Clarify opportunity vs lead/prospect semantics

- Date: 2026-06-09
- Decision: Keep `opportunity` generic; keep `lead` and `prospect` business-specific in enterprise/customer flows.
- Status: accepted
- Context: Similar terms existed across opportunities and enterprise pipelines.
- Rationale: Distinct semantics reduce confusion in reporting and lifecycle automation.
- Trade-offs: Generic opportunity use cases cannot rely on prospect terminology.
- Consequence: Cleaner ontology boundaries between personal opportunity management and business sales/customer pipelines.
- Follow-up: Maintain term glossary for opportunity pipeline vocabulary.

## 2026-06-09 - Rename Travel account to Mobility

- Date: 2026-06-09
- Decision: Rename `8000-travel` to `8000-mobility` and treat travel as a subdomain.
- Status: accepted
- Context: Travel-only naming underrepresented commuting, transport, visas, and movement contexts.
- Rationale: Mobility better captures all movement-related life records.
- Trade-offs: One-time path migration.
- Consequence: Broader, future-proof account for movement-related schemas.
- Follow-up: Gradually populate transport/commuting/visa subdomains where needed.

## 2026-06-09 - Expand Career account structure

- Date: 2026-06-09
- Decision: Add 5200 Career Development, 5300 Job Search, 5400 Consulting, and 5500 Professional Network subaccounts under 5000 Career & Profession.
- Status: accepted
- Context: Career account was underdeveloped relative to wealth and enterprise.
- Rationale: Career requires dedicated structures for progression, market navigation, consulting mode, and network capital.
- Trade-offs: Increased schema surface area and governance requirements.
- Consequence: Career architecture now supports employee, freelancer, and portfolio-professional patterns.
- Follow-up: Keep these schemas linked to canonical goal/relationship/opportunity entities.

## 2026-06-09 - Add explicit network layer under Relationships

- Date: 2026-06-09
- Decision: Add `2400-networks` under relationships with network graph primitives.
- Status: accepted
- Context: Network data was previously scattered across opportunities, career, enterprise, and community records.
- Rationale: Networks are first-class graph structures distinct from individual relationships.
- Trade-offs: Potential overlap with opportunities introductions unless semantics are explicit.
- Consequence: Dedicated place for network, connection, influence, introduction, and referral records.
- Follow-up: Keep network introduction semantics distinct from opportunity pipeline introduction semantics.

## 2026-06-09 - Strengthen ontology governance principles

- Date: 2026-06-09
- Decision: Formalize primitive promotion, source-of-truth, lifecycle, sensitivity, and deletion-test rules in schema design governance.
- Status: accepted
- Context: Architecture reached high coverage; remaining risk shifted from missing domains to ontology drift and governance inconsistency.
- Rationale: Strong governance keeps a mature ontology coherent as contributors and use-cases grow.
- Trade-offs: Slightly slower schema authoring due to stronger design checks.
- Consequence: New schemas must pass explicit checks before introduction.
- Follow-up: Include governance checks in schema review process.

## 2026-06-09 - Primitive promotion rule adopted

- Date: 2026-06-09
- Decision: If a concept appears across 3+ accounts, evaluate promotion to platform core canonical primitive.
- Status: accepted
- Context: Cross-account duplicates historically emerged when concepts were first introduced as account-local entities.
- Rationale: Centralized primitives reduce duplication and improve interoperability.
- Trade-offs: Requires extension/wrapper patterns for local context.
- Consequence: Better queryability and less ontology fragmentation.
- Follow-up: Periodically audit cross-account entities for promotion candidates.

## 2026-06-09 - Source-of-truth and confidence rule adopted

- Date: 2026-06-09
- Decision: Every schema design should define source-of-truth expectations and confidence posture.
- Status: accepted
- Context: Multi-source records can conflict (for example, imported vs user-entered vs institution-provided data).
- Rationale: Explicit source/confidence principles are necessary for trustworthy reasoning and reconciliation.
- Trade-offs: Added design and review overhead.
- Consequence: Better conflict resolution and provenance-aware decision support.
- Follow-up: Define reusable source/confidence patterns in platform-level guidance.

## 2026-06-09 - Sensitivity and retention governance adopted

- Date: 2026-06-09
- Decision: Every schema should define expected sensitivity, sharing posture, and retention expectations.
- Status: accepted
- Context: Personal operating systems include highly sensitive data where governance must be first-class.
- Rationale: Privacy and retention need ontology-level treatment, not implementation-only handling.
- Trade-offs: Requires policy mapping and review discipline.
- Consequence: More secure and policy-ready schema design.
- Follow-up: Establish sensitivity class taxonomy and default retention categories.

## 2026-06-09 - Elevate schema registry to ontology source-of-truth index

- Date: 2026-06-09
- Decision: Expand `schema-registry.json` to full corpus coverage with canonical lineage metadata (`canonical`, `extends`, `tags`).
- Status: accepted
- Context: Folder structure alone is insufficient for robust AI/search/graph reasoning.
- Rationale: Registry-level semantics make ontology relationships explicit and machine-operable.
- Trade-offs: Requires generation and validation discipline.
- Consequence: Ontology interpretation now depends on registry metadata, not only folder paths.
- Follow-up: Curate canonicalReferences and extends mappings over time for higher semantic precision.

## 2026-06-09 - Enforce registry coverage and field integrity

- Date: 2026-06-09
- Decision: Add generator and validator tooling; require every schema file to exist in registry with required fields.
- Status: accepted
- Context: Registry drift risk grows as schema count scales.
- Rationale: Validation prevents orphan schemas and metadata degradation.
- Trade-offs: Adds one more maintenance step in schema workflows.
- Consequence: CI/local checks can reject incomplete ontology registrations.
- Follow-up: Wire `registry:validate` into CI pipeline.

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

## 2026-06-09 - Eliminate duplicate concept names via explicit wrapper naming

- Date: 2026-06-09
- Decision: Keep one canonical schema name per concept and rename context wrappers to explicit variants (for example, `sales-contract`, `operational-workflow`, `invoice-finance-view`).
- Status: accepted
- Context: Duplicate names across accounts caused ontology ambiguity even when semantics were wrapper-style extensions.
- Rationale: Explicit wrapper names preserve local context without fragmenting canonical concept identity.
- Trade-offs: Slightly longer schema names and one-time rename churn.
- Consequence: Canonical concepts now have clearer ownership; wrappers are discoverable as extensions instead of competing definitions.
- Follow-up: During schema review, reject new account-local duplicates when wrapper naming can express intent.

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
