# Lore --- Complete Product & Technical Project Description

## Validation Draft \| Version 1.0 \| 31 October 2026

> This document consolidates Lore's product idea, proposed UI, backend
> architecture, workflows, integrations, security model and delivery
> plan. It is a proposal for validation---not a claim that every
> capability is already implemented or market-proven.

# 1. Executive summary

**Lore is an organizational memory and engineering continuity
platform.** It captures expertise that is otherwise trapped in
employees' experience, connects that expertise to the systems and work
it relates to, and makes it accessible through a permission-aware AI
mentor.

Organizations already use repositories, chat, tickets, documents,
project tools and observability platforms. These tools preserve
artifacts and activity, but they do not consistently preserve the
reasoning behind decisions: why a design was chosen, which alternatives
were rejected, what exceptions matter, what failed previously, or who
can explain a complex system.

Lore combines four capabilities:

1.  **Capture:** collect knowledge through guided voice conversations,
    typed submissions, documents and authorized source integrations.
2.  **Connect:** associate knowledge with people, teams, systems,
    projects, decisions, incidents, code changes and evidence.
3.  **Understand:** extract structured context, identify potential gaps
    and manage knowledge freshness.
4.  **Retrieve and assist:** answer questions using authorized,
    traceable evidence and help employees discover relevant expertise.

Lore is not intended to be another generic chatbot over uploaded
documents. Its intended distinction is the continuous relationship
between human expertise, organizational artifacts and the changing
systems those artifacts describe.

**Product promise:** Capture once. Connect the context. Make
organizational knowledge usable.

**Initial market focus:** engineering organizations with multiple
software services or repositories, growing teams, recurring onboarding
needs, legacy systems and dependence on specialist knowledge.

# 2. Vision, mission and positioning

## Vision

Organizations should be able to preserve and use their collective
experience even as people, projects, systems and priorities change.

## Mission

Make organizational knowledge easier to capture, verify, connect,
discover and apply in everyday work.

## Positioning

**Lore --- The Organizational Memory and Engineering Continuity
Platform.**

Lore captures the reasoning behind engineering decisions, connects it to
the systems and changes it affects, and makes that knowledge accessible
through a source-grounded AI mentor.

## Product principles

-   Evidence before confidence: answers should be grounded in
    identifiable sources.
-   People remain in control: contributors can review, correct, approve
    or decline capture requests.
-   Permissions travel with knowledge: source access rules must be
    respected during ingestion and retrieval.
-   Context matters: knowledge is connected to the relevant system,
    project, version, event and time period.
-   Knowledge has a lifecycle: records can be proposed, reviewed,
    verified, superseded, archived or deleted.
-   Interoperability over lock-in: external tools provide evidence and
    context; Lore maintains its own canonical knowledge model.
-   Useful before autonomous: prioritize trustworthy assistance over
    unreviewed conclusions.
-   Progressive complexity: deliver a coherent core before introducing
    distributed infrastructure.

# 3. Problem definition

## 3.1 The knowledge-continuity problem

Important organizational knowledge is distributed across: - Employees'
tacit experience and memory. - Pull requests, commits, code comments and
repository documentation. - Chat conversations and meeting
discussions. - Tickets, incident reports and project records. -
Architecture documents, design reviews and runbooks. - Operational
traces, logs, metrics and data lineage. - Informal explanations shared
during onboarding and troubleshooting.

These sources are fragmented and preserve only part of the story. A pull
request may show *what* changed but not the full reasoning. A runbook
may explain the current procedure but not the conditions under which it
is unsafe. A chat thread may contain the answer but be difficult to
rediscover. An experienced engineer may know the exception but have no
time to document it.

## 3.2 Consequences

-   New employees repeatedly ask the same questions.
-   Engineers search across disconnected tools.
-   Decisions are revisited because rationale is unavailable.
-   Teams depend on a small number of specialists.
-   Knowledge becomes stale as systems evolve.
-   Critical context is lost during role changes or departures.
-   AI assistants may produce plausible but unsupported answers.

## 3.3 What Lore must not assume

Lore must not assume every customer has Backstage, that every decision
is documented in GitHub, or that reasoning can be inferred from code. It
must distinguish observed evidence from human-confirmed reasoning and
support organizations with different levels of technical maturity.

# 4. Target users and initial customer profile

## 4.1 Initial ideal customer profile

An initial hypothesis to validate: - B2B software or technology
organizations. - Approximately 30--300 engineers as a starting segment,
not a product limit. - Multiple repositories, services or technical
teams. - Distributed or growing teams. - Frequent onboarding or system
ownership changes. - Existing tools such as GitHub/GitLab, Slack/Teams
and Jira/Confluence. - Engineering leaders who recognize the cost of
undocumented decisions and specialist dependency.

## 4.2 Personas

**Engineering manager / Head of Engineering:** needs visibility into
system knowledge, ownership, onboarding friction and unresolved gaps.

**Senior engineer / subject-matter expert:** has valuable context but
limited time; needs low-friction capture and control over what is
shared.

**New engineer / team member:** needs reliable answers about systems,
architecture, procedures, decisions and people who can help.

**Platform / developer-experience engineer:** needs integrations without
duplicating the existing developer platform.

**Workspace administrator / security owner:** needs control over users,
roles, integrations, retention, source permissions and audit records.

## 4.3 Jobs to be done

-   Explain why a system or design works the way it does.
-   Find the person and evidence behind a technical decision.
-   Capture the reasoning behind a recent change.
-   Onboard an employee into a system or project.
-   Find the approved procedure for an uncommon situation.
-   Identify missing or outdated context.
-   Preserve expertise before a handover or departure.

# 5. Product capability model

All capabilities operate on the same Lore Knowledge Core. They are not
independent products or separate sources of truth.

## 5.1 Capture Studio

**Purpose:** turn expert experience and approved source material into
structured, reviewable knowledge.

Capture methods: - Guided real-time voice interview. - Typed knowledge
submission. - Document upload. - Structured decision or procedure
form. - Authorized meeting transcript import, where consent and policy
permit. - Event-triggered optional debrief after a pull request,
incident or project milestone.

Voice interviewer flow: 1. Explain why the conversation is suggested. 2.
Ask permission before recording or processing. 3. Establish the system,
project, event or problem. 4. Ask open-ended questions. 5. Follow up on
alternatives, constraints, trade-offs, exceptions and failure modes. 6.
Summarize what it understood. 7. Let the contributor correct or remove
information. 8. Produce a structured draft with provenance. 9. Submit
for review or approval according to workspace policy.

Output types: - Technical decision. - Procedure / runbook. - System
explanation. - Troubleshooting guide. - Incident lesson. - Project
handover. - Architecture rationale. - FAQ / onboarding explanation.

Controls: event-triggered debriefs are opt-in and configurable; prompts
are rate-limited; contributors can pause, stop, correct or delete; a
transcript or model summary is not automatically verified knowledge.

## 5.2 Ask Lore --- AI Mentor

**Purpose:** answer organizational questions using authorized evidence.

Expected behavior: - Accept natural-language questions and follow-ups. -
Identify relevant systems, projects and entities. - Use hybrid
retrieval: keyword, metadata and vector search. - Optionally expand
context through entity relationships. - Apply tenant and source
permissions before model context is constructed. - Present citations to
source records and relevant excerpts. - State when evidence is
incomplete, conflicting or stale. - Offer an expert or source escalation
path. - Distinguish verified knowledge from unreviewed suggestions.

Typical answer structure: - Direct answer. - Explanation and caveats. -
Source references. - Applicability (system, version, environment or
date). - Evidence status. - Suggested next step or relevant expert.

Lore must not invent sources, contributors, approval status or decision
rationale.

## 5.3 Knowledge Hub

**Purpose:** browsable, searchable home for organizational knowledge.

Views: - All knowledge. - By type: decisions, procedures, incidents,
system explanations and FAQs. - By team, project or system. - Recently
added or updated. - Needs review. - Saved knowledge. - Curated
collections.

Knowledge detail page: - Title and summary. - Type and lifecycle
status. - Context, reasoning and applicability. - Contributors and
owners. - Source evidence and links. - Related systems, projects, events
and decisions. - Review and version history. - Created, updated and
review-due timestamps. - Access classification and permissions.

## 5.4 Knowledge Graph / Explorer

**Purpose:** make relationships between knowledge and organizational
entities discoverable.

Entities include Organization, User, Team, System/Service, Repository,
API, Project, Environment, Document, Conversation, Decision, Procedure,
Incident, Change Event, Dataset/Pipeline, Knowledge Item and Evidence
Source.

Relationships include: - Person contributed to decision. - Decision
affects system. - Pull request changes component. - Procedure applies to
environment. - Incident revealed limitation. - Project depends on
service. - Knowledge item supersedes another item.

Start with relational tables and explicit relationship records in
PostgreSQL. A dedicated graph database is a later option only if query
patterns justify it.

## 5.5 People & Expertise

**Purpose:** help employees discover relevant contributors.

Features: - Opt-in expertise profiles. - Skills and systems a person has
contributed to. - Relevant projects, decisions and knowledge records. -
Preferred contact or collaboration method. - Team and role information
from authorized directories.

Do not create opaque employee rankings or treat contribution volume as
proof of expertise.

## 5.6 Decision Intelligence

A decision record contains: - Decision statement. - Problem and
context. - Chosen option. - Alternatives considered. - Rationale and
constraints. - Risks and trade-offs. - Decision owner and
contributors. - Date and applicability. - Related systems, projects, PRs
and incidents. - Status: proposed, approved, superseded or archived. -
Review and change history.

## 5.7 Knowledge Gap Intelligence

Potential signals: - A recent change has little explanatory context. - A
critical procedure has not been reviewed. - Multiple records contradict
each other. - Employees repeatedly ask a question with no reliable
answer. - A system has few linked explanations or ownership records. - A
handover is approaching and relevant knowledge has not been reviewed.

Possible actions: - Suggest a voluntary expert debrief. - Create a
review task. - Ask an owner to confirm applicability. - Link conflicting
records for human resolution. - Recommend an onboarding collection.

Gap detection should be explainable. Do not present unvalidated risk
scores as objective facts.

## 5.8 Onboarding Journeys

Assemble role-, team-, project- or system-specific learning paths
containing architecture overviews, important decisions, setup
procedures, common incidents, relevant experts and recommended knowledge
records. Track completion and optional feedback.

## 5.9 Reviews and Governance

Lifecycle: 1. Captured. 2. Processing. 3. Draft. 4. Under review. 5.
Verified / approved. 6. Review due. 7. Superseded. 8. Archived or
deleted.

"Verified" means reviewed according to the configured process, not
universally or permanently correct.

Governance includes reviewer assignment, approval/rejection, correction
requests, version history, review schedules, retention/deletion, access
control and audit trail.

## 5.10 Integrations

Initial priority: 1. GitHub. 2. Backstage (optional software catalog
integration). 3. Slack or Microsoft Teams. 4. Jira and Confluence. 5.
OpenTelemetry. 6. OpenLineage where relevant.

Each connector should support authentication, permission validation,
source discovery, initial and incremental sync, cursor management,
normalization, permission mapping, health status, disconnect and
deletion behavior.

# 6. User experience and information architecture

The public marketing website and authenticated product are separate
experiences.

## 6.1 Public website

Navigation: - Product. - Solutions. - Integrations. - Resources. -
Pricing. - About. - Sign in. - Get started.

Suggested page structure: 1. Hero: "Your organization's memory, always
within reach." 2. Problem: knowledge is scattered and context
disappears. 3. Product model: Capture → Connect → Ask. 4. Product
preview. 5. Use cases for experts, new hires and engineering leaders. 6.
Integrations. 7. Security and governance. 8. Pricing or request-a-demo
path. 9. FAQs. 10. Final CTA.

Do not use fabricated customer logos, testimonials, usage numbers or
performance claims. Demo data must be clearly identified as
illustrative.

## 6.2 Authenticated workspace

**Workspace:** Home, Ask Lore, Capture, Knowledge Hub, Knowledge Graph,
People & Expertise.

**Intelligence:** Knowledge Gaps, Decision Intelligence, Onboarding
Journeys, Activity & Reviews.

**Administration:** Integrations, Security & Governance, Workspace
Settings.

Navigation should be role-aware. Employees should not see administrative
functions they cannot use.

## 6.3 Home dashboard

Personalized and action-oriented modules: - Ask Lore prompt. - Recent
conversations. - Recently updated knowledge. - Recommended knowledge for
the user's team or project. - Pending reviews assigned to the user. -
Recent activity from connected sources. - Saved knowledge. - Onboarding
progress, where relevant.

## 6.4 Global command palette

Ctrl/Cmd+K should search and navigate across knowledge, people, systems,
projects, decisions, sources and actions such as starting a capture or
opening an integration.

## 6.5 Visual design system

Intended direction: calm, premium, professional and readable.

Suggested palette: - Warm ivory `#F7F7F2`. - Forest charcoal
`#202923`. - Muted sage `#78947E`. - Soft grey `#E7E9E1`. - Warm sand
`#D9B98C`. - Muted coral `#B96D61`.

Typography: an elegant serif for selected display headings; Inter or
Manrope for interface text.

Guidance: - Generous whitespace on the marketing site. - More
information-dense workspace layouts. - Consistent status, source and
permission indicators. - Clear empty, loading, error and
permission-denied states. - Responsive design and keyboard
accessibility. - Purposeful motion; respect reduced-motion
preferences. - Botanical imagery may support public branding, while core
workspace screens remain restrained.

# 7. End-to-end workflows

## 7.1 Manual knowledge capture

1.  Employee opens Capture Studio.
2.  Selects a knowledge type or starts a guided conversation.
3.  Lore establishes context and asks questions.
4.  Audio is transcribed and structured.
5.  Lore creates a draft knowledge item.
6.  Contributor reviews the summary and source transcript.
7.  Contributor corrects, approves or submits for review.
8.  Reviewer verifies the item if required.
9.  Lore links it to relevant systems, projects and people.
10. Authorized employees retrieve it through Knowledge Hub or Ask Lore.

## 7.2 GitHub change to knowledge

1.  Organization installs and authorizes the Lore GitHub App.
2.  Lore discovers permitted repositories and records granted scopes.
3.  A pull request is merged.
4.  GitHub sends a webhook.
5.  Lore validates the signature and records the event idempotently.
6.  Connector fetches permitted PR and commit metadata.
7.  Normalization maps the event to a change record and evidence.
8.  Lore links repository, service, project and contributor entities.
9.  Lore assesses whether explanatory context appears sufficient.
10. If a useful gap is detected, Lore may offer an optional debrief.
11. If accepted, the contributor completes a voice or typed debrief.
12. Lore generates a draft decision or explanation.
13. Contributor/reviewer approves it.
14. The approved record is linked to the PR and related entities.

A merged PR is not proof that the rationale has been captured.

## 7.3 Ask Lore

1.  User submits a question.
2.  Lore identifies intent and relevant entities.
3.  Lore determines identity, tenant and permissions.
4.  Retrieval searches only accessible sources.
5.  Hybrid retrieval gathers relevant evidence.
6.  Optional relationship expansion finds connected records.
7.  Model produces an answer constrained by the evidence.
8.  UI displays citations and applicability.
9.  If evidence is insufficient, Lore says so and may suggest a relevant
    person or capture workflow.

## 7.4 Knowledge review

1.  A record reaches its review date or a source change suggests it may
    be stale.
2.  Lore creates a review task.
3.  Owner/reviewer checks it against current evidence.
4.  They confirm, edit, supersede or archive it.
5.  System records who changed it and why.
6.  Retrieval reflects the new status and version.

## 7.5 Onboarding

1.  Manager or team owner selects a role, team or system.
2.  Lore assembles a journey from approved knowledge.
3.  New employee follows the sequence.
4.  They ask follow-up questions in Ask Lore.
5.  Lore records completion and optional feedback.
6.  Repeated unanswered questions can become candidate knowledge gaps.

# 8. Canonical knowledge model and data architecture

## 8.1 Architectural rule

External systems are sources of evidence and operational context. Lore
owns a canonical internal representation so multiple sources can be
connected without making one vendor's schema foundational.

## 8.2 Core entity families

-   **Identity and tenancy:** Organization/Tenant, User, Team, Role,
    Membership, Group.
-   **Technical context:** System/Service, Repository, API, Project,
    Environment, Dataset/Pipeline.
-   **Knowledge:** Knowledge Item, Decision, Procedure, Incident,
    Conversation, Document, Onboarding Journey, Collection.
-   **Evidence and provenance:** Source, Source Reference, Evidence,
    Contributor, Review, Version, Audit Event.
-   **Relationships:** contributed to, affects, depends on, derived
    from, applies to, supersedes, related to, owned by.

## 8.3 Illustrative knowledge record

``` json
{
  "id": "knowledge_001",
  "tenant_id": "org_001",
  "type": "technical_decision",
  "title": "Payment Retry Strategy",
  "summary": "Why exponential backoff was introduced",
  "context": "Payment service reliability",
  "reasoning": "Reduce repeated request pressure during instability",
  "applicability": {
    "system": "payment-service",
    "environment": ["production"],
    "version": "current"
  },
  "status": "verified",
  "contributors": ["user_001"],
  "source_refs": [
    "github:pull_request:248",
    "lore:conversation:conv_001"
  ],
  "related_entities": [
    "system:payment-service",
    "project:payments"
  ],
  "created_at": "2026-10-14T10:00:00Z",
  "review_due_at": "2027-04-14T00:00:00Z"
}
```

This is illustrative, not a finalized production schema. Implementation
must also model access policies, review events, version history, source
identity, deletion state and provenance.

## 8.4 External entity mapping

  External object           Lore mapping
  ------------------------- -----------------------------------------------
  Backstage Component       System / software service
  Backstage API             API entity
  Backstage Resource        Infrastructure resource
  Backstage User / Group    User / Team
  GitHub Pull Request       Change event + evidence
  GitHub Commit             Change event + evidence
  Slack thread              Conversation + evidence
  Voice interview           Conversation + evidence + knowledge candidate
  OpenTelemetry trace       Operational evidence
  OpenLineage job/dataset   Pipeline / dataset / relationship

Backstage is an optional software catalog integration, not a universal
knowledge schema. OpenTelemetry and OpenLineage have different purposes:
OpenTelemetry covers traces, metrics and logs; OpenLineage describes
data-job and dataset lineage.

## 8.5 Initial storage

-   PostgreSQL: tenants, users, knowledge records, entities,
    relationships, permissions, reviews and audit metadata.
-   pgvector: embeddings and semantic retrieval.
-   Object storage: audio, documents and larger artifacts.
-   Redis: short-lived caching and background job coordination.

Start with PostgreSQL relationships. Introduce Neo4j or another graph
database only if required query patterns justify it.

# 9. Technical architecture

## 9.1 Architecture style

Start with a **modular monolith plus background workers**. This keeps
deployment manageable while preserving clear boundaries. Split services
only when scaling, reliability, team ownership or deployment needs
justify it.

## 9.2 Logical layers

**A. Experience layer** - Public marketing site. - Authenticated web
workspace. - Ask Lore interface. - Capture Studio. - Admin console. -
Future IDE extension.

**B. API and application layer** - Authentication and tenant
resolution. - Workspace and membership management. - Knowledge CRUD and
lifecycle. - Search and conversations. - Capture sessions. - Connector
management. - Reviews and governance. - Usage and billing.

**C. Ingestion and normalization** - Webhook receivers. - Connector
polling and synchronization. - Document parsing. - Transcript
processing. - Deduplication and idempotency. - Entity resolution. -
Source permission mapping.

**D. Intelligence layer** - Speech-to-text and text-to-speech
adapters. - Interview orchestration. - Knowledge extraction. - Embedding
generation. - Hybrid retrieval. - Reranking. - Answer generation. - Gap
detection. - Relationship inference with review controls.

**E. Data layer** - PostgreSQL and pgvector. - Object storage. -
Redis. - Migrations and backups.

**F. Governance and operations** - Authorization. - Tenant isolation. -
Audit logging. - Retention and deletion. - Observability. - Rate limits
and usage controls.

## 9.3 Suggested repository structure

``` text
lore/
├── apps/
│   ├── web/                    # Next.js public site and workspace
│   └── api/                    # FastAPI application
├── backend/
│   ├── auth/
│   ├── tenants/
│   ├── users/
│   ├── knowledge/
│   ├── evidence/
│   ├── conversations/
│   ├── capture/
│   ├── extraction/
│   ├── retrieval/
│   ├── voice/
│   ├── connectors/
│   ├── reviews/
│   ├── governance/
│   ├── analytics/
│   └── audit/
├── workers/
│   ├── ingestion/
│   ├── embeddings/
│   ├── extraction/
│   └── scheduled_reviews/
├── integrations/
│   ├── github/
│   ├── backstage/
│   ├── slack/
│   ├── jira/
│   ├── opentelemetry/
│   └── openlineage/
├── packages/
│   ├── ui/
│   ├── schemas/
│   └── api-client/
├── database/
│   ├── migrations/
│   └── seeds/
├── infra/
│   ├── docker/
│   ├── deployment/
│   └── monitoring/
└── docs/
    ├── product/
    ├── architecture/
    ├── api/
    ├── security/
    └── decisions/
```

This is a suggested boundary map, not a requirement to create every
folder immediately.

## 9.4 Recommended technology mapping

  Component         Initial choice                            Purpose
  ----------------- ----------------------------------------- -----------------------------
  Frontend          Next.js, TypeScript                       Website and workspace
  UI                Tailwind, shadcn/ui                       Design system
  Backend           Python, FastAPI                           APIs and business logic
  Main database     PostgreSQL                                Canonical records
  Vector search     pgvector                                  Semantic retrieval
  Relationships     PostgreSQL initially                      Connected entities
  Voice             LiveKit Agents or evaluated alternative   Real-time voice
  AI                Provider abstraction                      LLM, embeddings, extraction
  Background jobs   Redis + Celery                            Ingestion and processing
  File storage      S3-compatible storage                     Audio and documents
  Authentication    WorkOS or equivalent, when needed         Enterprise SSO
  Observability     OpenTelemetry                             Monitor Lore itself

## 9.5 Connector contract

``` python
class KnowledgeConnector:
    def authenticate(self):
        ...

    def validate_permissions(self):
        ...

    def discover_sources(self):
        ...

    def fetch_changes(self, cursor=None):
        ...

    def normalize(self, raw_event):
        ...

    def sync_permissions(self):
        ...

    def health_check(self):
        ...

    def disconnect(self):
        ...
```

Connector implementations must handle retries, rate limits, webhook
validation, pagination, cursor persistence, duplicate events, revoked
access and deletion requests.

## 9.6 Event processing

For the first version: - Receive webhooks. - Validate and persist the
event. - Use an outbox or durable job record to schedule processing. -
Process asynchronously. - Make handlers idempotent. - Store connector
cursors and processing status. - Retry transient failures with bounded
backoff. - Expose failed jobs for inspection and replay.

Kafka/Redpanda and Temporal are later options, not initial dependencies.

# 10. AI, retrieval and voice architecture

## 10.1 Knowledge ingestion pipeline

``` text
Source / User Input
        |
        v
Authentication + Permission Check
        |
        v
Parse / Transcribe / Normalize
        |
        v
Extract Entities and Candidate Knowledge
        |
        v
Resolve Relationships + Attach Provenance
        |
        v
Human Review (where required)
        |
        v
Persist + Embed + Index
        |
        v
Available to Authorized Retrieval
```

Extraction should preserve source spans or timestamps so users can
inspect the evidence behind generated fields.

## 10.2 Retrieval pipeline

``` text
Question
  |
  v
Identity + Tenant + Authorization
  |
  v
Intent and Entity Resolution
  |
  v
Hybrid Search (keyword + vector + metadata)
  |
  v
Permission Filtering / Revalidation
  |
  v
Optional Relationship Expansion
  |
  v
Reranking and Evidence Selection
  |
  v
Grounded Answer Generation
  |
  v
Citations + Applicability + Limitations
```

Graph-assisted retrieval should be measured against a simpler hybrid
baseline. Add it where relationships improve answer quality, not merely
because a graph is visually attractive.

## 10.3 Voice pipeline

-   Client captures audio with explicit user action.
-   LiveKit or another selected real-time transport handles the session.
-   Speech-to-text and language-model providers are abstracted behind
    interfaces.
-   Interviewer uses a structured conversation plan and follow-up logic.
-   Transcript and generated knowledge remain separate records.
-   Contributor reviews extracted output.
-   Audio retention and deletion follow workspace policy.

Provider abstraction should account for capability differences, latency,
cost, data residency and retention behavior.

## 10.4 Evaluation

Build a test set from realistic organizational questions and approved
source material.

Measure: - Retrieval recall and relevance. - Citation correctness. -
Answer faithfulness. - Correct refusal / insufficient-evidence
behavior. - Permission leakage. - Freshness and version applicability. -
Extraction accuracy for decisions and procedures. - Voice transcription
quality. - End-to-end latency and cost.

A polished demo is not sufficient evidence of production reliability.

# 11. Security, privacy and enterprise readiness

Security is a foundational requirement, not a final-month feature.

## Tenant isolation

-   Every tenant-owned record carries a tenant identifier.
-   Enforce tenant boundaries in application logic and database access.
-   Consider PostgreSQL Row-Level Security as an additional safeguard.
-   Test cross-tenant access across APIs, workers, object storage and
    vector retrieval.

## Source permissions

-   Record identity and permissions granted to each connector.
-   Map source ACLs into Lore's authorization model.
-   Filter inaccessible content before it reaches the model.
-   Revalidate permissions when access changes or is revoked.
-   Avoid exposing titles, snippets or citations for inaccessible
    records.

## User controls

-   Clear recording consent.
-   Pause and stop controls.
-   Correction and deletion workflows.
-   Configurable audio and transcript retention.
-   Transparent capture prompts and notification settings.
-   Separation between private drafts and approved shared knowledge.

## Auditability

Record important actions such as sign-in and role changes, connector
installation and permission changes, knowledge
creation/approval/edit/deletion, sensitive retrieval where policy
requires it, administrative changes, and export/deletion operations.

## Enterprise readiness checklist

-   SSO and directory synchronization when required.
-   RBAC and source-level authorization.
-   Encryption in transit and at rest.
-   Secret management.
-   Backup and restore testing.
-   Retention and deletion policies.
-   Incident response process.
-   Vulnerability and dependency management.
-   Rate limits and abuse protection.
-   Data residency and provider contract review.
-   Accessibility and secure session management.

Do not advertise zero-data-retention, no-training use, certifications or
regulatory compliance until provider agreements, configuration and
independent evidence support those claims.

# 12. Non-functional requirements

These are proposed requirements to validate and convert into measurable
service objectives.

  -----------------------------------------------------------------------
  Area                                Requirement
  ----------------------------------- -----------------------------------
  Reliability                         Failed ingestion jobs are visible
                                      and safely retryable

  Traceability                        Generated answers identify
                                      supporting sources

  Authorization                       Unauthorized content never enters
                                      model context

  Freshness                           Source updates and permission
                                      revocations propagate within a
                                      defined target

  Performance                         Search and answer latency measured
                                      under realistic workloads

  Scalability                         Multiple tenants and asynchronous
                                      ingestion supported

  Accessibility                       Keyboard navigation, readable
                                      contrast and reduced motion

  Maintainability                     Modular boundaries, typed contracts
                                      and automated tests

  Portability                         Provider adapters for models,
                                      speech and storage

  Recoverability                      Documented backup, restore and
                                      disaster-recovery procedures
  -----------------------------------------------------------------------

Do not commit to numeric SLAs until workload, hosting model and pilot
requirements are known.

# 13. MVP definition and release boundaries

## 13.1 MVP objective

Demonstrate that Lore can capture meaningful engineering knowledge,
connect it to a real engineering artifact, and retrieve it accurately
for another authorized employee.

## 13.2 MVP includes

-   Organization and user accounts.
-   Basic roles and tenant isolation.
-   Knowledge Hub.
-   Structured knowledge records.
-   Manual voice and typed capture.
-   Transcription and extraction.
-   Contributor review and approval.
-   Ask Lore with hybrid retrieval and citations.
-   GitHub repository and pull-request ingestion.
-   Linking knowledge to PRs, systems and contributors.
-   Basic review lifecycle.
-   Audit trail for core actions.
-   Public website and authenticated workspace shell.

## 13.3 MVP excludes unless a pilot requires them

-   Full Slack and Teams ingestion.
-   Jira and Confluence synchronization.
-   OpenTelemetry and OpenLineage ingestion.
-   Full Backstage synchronization.
-   Dedicated graph database.
-   Kafka/Redpanda.
-   Temporal.
-   Advanced predictive risk scoring.
-   Autonomous employee monitoring.
-   Full BYOC / self-hosted deployment.
-   Broad enterprise analytics.
-   Native IDE extension.

## 13.4 MVP acceptance criteria

1.  An organization can create a workspace and invite users.
2.  Users can submit knowledge by voice or text.
3.  A contributor can inspect and approve the extracted record.
4.  Approved knowledge can be found through search.
5.  Ask Lore answers a curated set of questions with correct citations.
6.  Ask Lore acknowledges insufficient evidence.
7.  A GitHub PR can be ingested and linked to relevant knowledge.
8.  An optional debrief can be offered for a real change.
9.  A user cannot retrieve content outside their permissions.
10. Core actions and errors are auditable and observable.

# 14. Six-month delivery roadmap

## Month 1 --- Foundation

-   Finalize product scope and canonical schema.
-   Set up repository, environments and CI.
-   Build authentication, tenant model and roles.
-   Implement Knowledge CRUD and source provenance.
-   Build workspace shell and Knowledge Hub.
-   Implement basic search.

**Exit milestone:** a user can create, organize and retrieve structured
knowledge.

## Month 2 --- Voice and AI mentor

-   Integrate voice transport and speech providers.
-   Implement interviewer orchestration.
-   Implement transcript and structured extraction.
-   Add contributor review and approval.
-   Implement embeddings and hybrid retrieval.
-   Build Ask Lore with citations and insufficient-evidence behavior.

**Exit milestone:** a contributor can explain a technical topic and
another authorized user can retrieve the reviewed result.

## Month 3 --- GitHub integration

-   Build GitHub App and installation flow.
-   Ingest repository, PR and commit metadata.
-   Implement webhook validation, retries and idempotency.
-   Map repositories and contributors to Lore entities.
-   Link evidence to knowledge records.
-   Prototype optional change-triggered debriefs.

**Exit milestone:** a real code change can be connected to human
explanation.

## Month 4 --- Organizational intelligence

-   Implement relationship explorer.
-   Add People & Expertise.
-   Add Decision Intelligence.
-   Add review schedules and freshness indicators.
-   Add knowledge gap candidates.
-   Prototype onboarding journeys.

**Exit milestone:** users can navigate connected context and act on
identified gaps.

## Month 5 --- Integrations and governance

-   Add one collaboration connector based on pilot demand.
-   Add Jira/Confluence if justified.
-   Improve permission synchronization.
-   Add SSO where required.
-   Expand audit, retention and deletion controls.
-   Add OpenTelemetry to Lore's own services.

**Exit milestone:** Lore works within a realistic customer toolchain
with enforceable access boundaries.

## Month 6 --- Pilot readiness

-   Security review and tenant-isolation testing.
-   Backup and restore exercise.
-   Performance and cost evaluation.
-   Billing / usage instrumentation.
-   Admin and customer onboarding.
-   Documentation and support process.
-   Run a limited pilot and prioritize based on evidence.

**Exit milestone:** a reliable, measurable pilot deployment---not an
assumption of full enterprise readiness.

# 15. Team structure and ownership

A six-workstream structure can be used if the team is large enough.
Smaller teams should combine adjacent responsibilities.

  -----------------------------------------------------------------------
  Workstream              Ownership               Deliverables
  ----------------------- ----------------------- -----------------------
  Product & Frontend      Product flows, design   User experience
                          system, public site,    
                          workspace               

  Backend & Data          API, schema, tenant     Knowledge Core
                          model, persistence      

  AI & Retrieval          Extraction, RAG,        Intelligence
                          evaluation, gap         
                          detection               

  Voice & Capture         Voice sessions,         Capture Studio
                          transcription,          
                          interviewer             

  Integrations            GitHub and subsequent   Source connectivity
                          connectors              

  Security, QA & DevOps   Auth testing, CI/CD,    Reliability
                          observability,          
                          deployment              
  -----------------------------------------------------------------------

Working agreements: - Backend/Data owns the canonical schema and
publishes versioned contracts. - Frontend uses shared or generated typed
API contracts. - AI does not invent its own persistent data model. -
Integrations normalize source data before it enters the Knowledge
Core. - Security reviews happen during feature development. - Every
feature has an owner, acceptance criteria, tests and a demo. - Shared
interfaces and integration tests are mandatory between workstreams.

# 16. Business model and go-to-market hypothesis

## Initial wedge

Start with engineering knowledge continuity rather than serving every
department immediately: - Connect an engineering repository. - Discover
technical changes and existing context. - Capture missing rationale
through voluntary expert debriefs. - Make approved explanations
searchable through Ask Lore.

## Buyer and users

Buyer hypothesis: CTO, VP Engineering, Head of Engineering, engineering
operations or platform leader.

Daily users: engineers, technical leads, new hires and subject-matter
experts.

Influencers: developer experience, security and IT administrators.

## Packaging hypothesis

-   **Developer / evaluation:** limited repository discovery and sample
    knowledge.
-   **Team:** Knowledge Hub, voice capture, Ask Lore and limited
    integrations.
-   **Business:** advanced governance, integrations, usage controls and
    team intelligence.
-   **Enterprise:** SSO, directory sync, advanced controls, custom
    retention and deployment options.

Pricing must be validated through customer discovery and cost modeling.
Avoid choosing per-seat prices before measuring voice, storage, model
and integration costs and testing willingness to pay.

## Pilot success measures

-   Time required to find an answer to a known engineering question.
-   Percentage of answers with correct supporting sources.
-   Number of useful knowledge records approved.
-   Contributor completion and opt-in rates for debriefs.
-   Repeated-question reduction for selected onboarding topics.
-   Search success and unanswered-question rate.
-   Knowledge freshness and review completion.
-   User trust and perceived usefulness.

Set baselines before claiming improvement. Number of transcripts alone
is not proof of value.

# 17. Risks, assumptions and open questions

  -----------------------------------------------------------------------
  Risk                    Why it matters          Mitigation
  ----------------------- ----------------------- -----------------------
  Generic AI assistant    Crowded category and    Focus on engineering
  positioning             weak differentiation    continuity and linked
                                                  reasoning

  Poor source quality     Retrieval can reproduce Provenance, review,
                          incomplete material     freshness and conflict
                                                  handling

  Employee surveillance   Proactive capture can   Explicit consent,
  concerns                feel intrusive          opt-in prompts and
                                                  controls

  Permission leakage      Serious enterprise      Source ACL mapping,
                          trust failure           pre-retrieval
                                                  authorization and tests

  Excessive scope         Slow delivery and       MVP boundaries and
                          disconnected modules    vertical slices

  Graph complexity        Cost without user value Start relational;
                                                  validate graph queries

  Voice friction          Users may not want to   Offer text and document
                          speak at work           alternatives

  Stale knowledge         Old guidance can        Applicability, review
                          mislead users           dates and supersession

  AI operating cost       Voice and retrieval can Usage metering, model
                          become expensive        routing and evaluation

  Integration maintenance APIs and permissions    Versioned connectors,
                          change                  health checks and
                                                  adapter boundaries
  -----------------------------------------------------------------------

## Assumptions to validate

-   Engineering teams experience a sufficiently painful
    knowledge-continuity problem.
-   They will authorize repository and collaboration-tool integrations.
-   Experts will voluntarily participate in short debriefs if value and
    controls are clear.
-   Source-grounded answers are more valuable than another general
    chatbot.
-   Engineering leaders will pay for measurable onboarding or continuity
    benefits.
-   A repository-first approach is a strong adoption wedge.

## Product-owner decisions

1.  Is the first customer segment software engineering only, or should
    hardware/industrial engineering be supported from the beginning?
2.  Is voice the primary capture mode or one of several equally
    important modes?
3.  Should GitHub be the first integration, or should manual capture and
    Ask Lore be usable before integration?
4.  What source-permission fidelity is mandatory for the first pilot?
5.  Who can approve knowledge: contributor, designated owner, manager or
    configurable reviewer?
6.  Should the first release support shared multi-tenancy or one
    organization per deployment?
7.  Which data is retained: raw audio, transcript, extracted knowledge,
    source snapshots or references only?
8.  What are the initial hosting and data-residency requirements?
9.  What is the smallest pilot customer profile and what outcome
    justifies continuing?
10. Which capabilities are essential for the first paid release versus
    later enterprise roadmap?

# 18. First 30-day execution plan

## Week 1 --- Define the foundation

-   Confirm first persona and pilot use case.
-   Freeze MVP boundaries.
-   Approve canonical entities and relationships.
-   Define tenant, role and permission model.
-   Create initial architecture decision records.
-   Define API contracts and shared types.

## Week 2 --- Build the knowledge loop

-   Implement knowledge records and evidence references.
-   Build Knowledge Hub.
-   Implement basic search.
-   Create extraction for typed submissions.
-   Add review and approval states.

## Week 3 --- Add voice and retrieval

-   Implement one voice capture path.
-   Store transcript and audio according to retention policy.
-   Extract a structured knowledge draft.
-   Implement retrieval and source citations.
-   Create a small evaluation set.

## Week 4 --- Connect a real engineering source

-   Implement GitHub App installation.
-   Ingest one repository and selected PR events.
-   Link PR evidence to a knowledge item.
-   Offer an optional debrief for a suitable change.
-   Demonstrate the full workflow.

## Demo scenario

1.  An engineering team connects a test GitHub repository.
2.  A pull request is merged.
3.  Lore ingests the event and associates it with a service.
4.  Lore identifies that the rationale is not clearly captured in
    available evidence.
5.  A contributor receives an optional debrief invitation.
6.  The contributor explains the design choice.
7.  Lore generates a draft decision record.
8.  The contributor reviews and approves it.
9.  A second employee asks why the design was chosen.
10. Lore answers with the approved decision and links to the PR and
    supporting evidence.
11. A question outside the evidence receives an honest
    insufficient-context response.

This demonstration validates the relationship between capture,
integration, knowledge and retrieval.

# 19. Product success definition

Lore is successful when it helps an organization reliably answer: - What
do we know? - Where did this knowledge come from? - Who contributed or
reviewed it? - Which system, project or situation does it apply to? - Is
it current? - Who is allowed to access it? - What important context is
missing? - What should we capture or review next?

The long-term opportunity is a **Knowledge Continuity Engine** that
understands organizational change, recognizes missing context and helps
the right people preserve it---without taking control away from those
people.

# 20. Validation checklist

Mark each item **Accept**, **Revise** or **Defer** during review.

## Product

-   [ ] The organizational memory problem is specific and compelling.
-   [ ] Engineering continuity is the correct initial market wedge.
-   [ ] Target buyer and primary users are clear.
-   [ ] Voice capture is valuable enough to justify its complexity.
-   [ ] Product is differentiated beyond document search and generic
    RAG.
-   [ ] MVP is narrow enough to deliver and test.

## User experience

-   [ ] Public website and authenticated workspace are separate.
-   [ ] Navigation reflects real user jobs.
-   [ ] Ask Lore, Capture and Knowledge Hub form a coherent experience.
-   [ ] Contributors can inspect and correct generated knowledge.
-   [ ] Sources, statuses and permissions are visible.
-   [ ] Design is accessible and usable on smaller screens.

## Architecture

-   [ ] Canonical knowledge model is approved.
-   [ ] Tenant and permission boundaries are defined.
-   [ ] Connector contract is approved.
-   [ ] Relational-first storage is sufficient for the first release.
-   [ ] Background processing and idempotency are designed.
-   [ ] Provider abstraction is appropriate without premature
    complexity.
-   [ ] API contracts and repository boundaries are agreed.

## AI and data

-   [ ] Provenance is preserved through extraction and retrieval.
-   [ ] Retrieval applies authorization before model context
    construction.
-   [ ] System can abstain when evidence is insufficient.
-   [ ] Citation correctness will be evaluated.
-   [ ] Knowledge status and freshness affect retrieval.
-   [ ] Voice data retention and consent are explicit.

## Enterprise readiness

-   [ ] Source permissions and revocation are handled.
-   [ ] Tenant isolation is tested.
-   [ ] Audit and deletion workflows are defined.
-   [ ] Security and data-processing claims can be substantiated.
-   [ ] Backups, recovery and incident response are planned.

## Business

-   [ ] Pilot customer profile is defined.
-   [ ] Buyer has a measurable reason to purchase.
-   [ ] Pricing assumptions will be tested.
-   [ ] Pilot success measures have baselines.
-   [ ] Team can support the proposed integrations and deployment model.

# Appendix A --- Suggested initial API surface

Illustrative REST endpoints; exact naming and request/response schemas
should be finalized during API design.

  ----------------------------------------------------------------------------
  Area                                Example endpoints
  ----------------------------------- ----------------------------------------
  Authentication / workspace          `GET /me`, `GET /workspaces`,
                                      `POST /workspaces`

  Knowledge                           `POST /knowledge`, `GET /knowledge`,
                                      `GET /knowledge/{id}`,
                                      `PATCH /knowledge/{id}`

  Evidence                            `POST /knowledge/{id}/evidence`,
                                      `GET /knowledge/{id}/sources`

  Reviews                             `POST /knowledge/{id}/submit-review`,
                                      `POST /reviews/{id}/approve`

  Search                              `POST /search`

  Ask Lore                            `POST /conversations`,
                                      `POST /conversations/{id}/messages`

  Capture                             `POST /capture/sessions`,
                                      `POST /capture/sessions/{id}/complete`

  Integrations                        `POST /integrations/github/install`,
                                      `GET /integrations`,
                                      `DELETE /integrations/{id}`

  Webhooks                            `POST /webhooks/github`

  People / systems                    `GET /people`, `GET /systems`,
                                      `GET /entities/{id}/relationships`

  Governance                          `GET /audit-events`,
                                      `GET /retention-policy`
  ----------------------------------------------------------------------------

# Appendix B --- Architecture decisions to record

Create short Architecture Decision Records (ADRs) for: 1. Modular
monolith versus microservices. 2. Canonical knowledge schema and entity
identity. 3. Tenant isolation strategy. 4. Source permission and ACL
mapping. 5. PostgreSQL / pgvector retrieval design. 6. Voice transport
and provider abstraction. 7. Event ingestion, retries and idempotency.
8. Knowledge lifecycle and approval policy. 9. Audio, transcript and
source retention. 10. Hosting, data residency and deployment model.

# Appendix C --- Definition of done for a feature

A feature is not complete merely because its screen works. Each feature
should include: - Product requirement and user story. - Permission and
tenant behavior. - API and schema contract. - Loading, empty, error and
success states. - Audit and observability requirements. - Unit and
integration tests. - Accessibility review. - Documentation. -
Demonstrable end-to-end behavior. - Known limitations and follow-up
work.

------------------------------------------------------------------------

**End of validation draft.**

The central decision to validate is whether Lore should first win as an
engineering knowledge-continuity product---connecting GitHub changes,
voluntary expert explanations and source-grounded answers---before
expanding into a broader organizational memory platform.
