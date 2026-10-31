# Lore: Validation Review and Updated Plan (v2.0)

*Review of "Lore Complete Product & Technical Project Description, Validation Draft v1.0" (31 October 2026). Competitive notes come from a quick web scan on the same date; much of that material is vendor-authored, so treat it as directional and verify with your own customer calls.*

## 1. Verdict in one page

**The problem is real and the engineering discipline in the draft is unusually strong. The weakest part is the market thesis, not the architecture.**

| Question | Verdict |
| --- | --- |
| Is the problem real? | **Yes.** Lost rationale, specialist dependency and slow onboarding are well-known engineering pains. |
| Is engineering the right first wedge? | **Yes**, and narrowing to *software* engineering is correct. |
| Is the product differentiated as written? | **Not yet.** The category is crowded and the draft contains no competitor analysis. |
| Is the MVP narrow enough? | **Almost.** The MVP list is good, but the 6-month roadmap re-expands into graph, people, onboarding and gap scoring before any customer proof. |
| Is the architecture sound? | **Yes.** Modular monolith, relational-first, provenance, pre-retrieval authorization and evals are all the right calls. |
| Is the plan ready to build? | **Not until** a sharper positioning, a permission model for the pilot and 3–5 design partners exist. |

**Recommended change in one sentence:** reposition Lore from "organizational memory platform" to **"the verified *why* behind your code changes, for engineers and their coding agents"**, validate it with a concierge test before building voice and graph features, and keep the broader memory vision as the long-term direction.

## 2. Competitive reality check (the biggest gap in the draft)

The draft says Lore is not "another generic chatbot over documents" but never names who it competes with. In October 2026 the closest alternatives are:

| Competitor | What it does | Overlap with Lore |
| --- | --- | --- |
| **Unblocked** | Context engine over code, PRs, Slack, Jira, Confluence and Notion; serves IDEs, coding agents, CLI and API; markets per-source permissions, SSO/SCIM and SOC 2 Type II | Very high: same buyer, same "why behind the code" pitch, already agent-facing |
| **Dosu** | Captures knowledge from PRs, issues and conversations, lets agents read and write back under review, maintains repo docs (AGENTS.md, architecture docs) | High: capture from engineering work plus human review |
| **Glean** | Permission-aware enterprise search across 100+ apps | Medium: finds documents; does not capture missing rationale |
| **Guru** | "Verified" knowledge cards with expert verification | Medium: the verification model resembles Lore's lifecycle |
| **Atlassian Rovo / Confluence** | Search and AI inside the Atlassian graph | Medium: strong where teams live in Jira/Confluence |
| **Sensay, Tacit (getAbstract), KNOA** | AI voice or structured interviews for offboarding and expert knowledge transfer | Medium: validates voice interviews, but they target HR offboarding rather than engineering changes |
| **Sentra, Tana** | Capture from chats and meetings into queryable knowledge | Lower: horizontal, not engineering-specific |

**What this means**

1. The "capture, connect, ask" model is **not novel on its own**. Differentiation must come from something narrower and defensible.
2. **Coding agents are now a primary consumer of context.** Competitors expose knowledge through MCP, CLI and IDE integrations. The draft defers the IDE extension and says nothing about agent access, which risks building a human-chat product in an agent-first market.
3. **Unblocked and Dosu already have connectors, permission models and compliance work** that Lore would need months to match. Competing head-on on breadth is a losing strategy for a small team.
4. **Voice interviews exist** (offboarding vendors), so voice alone is not a moat. Voice *triggered at the moment of an engineering change and tied to the PR* is a more specific idea.

### Where Lore can still differentiate (hypotheses to test)

- **Human-verified decision records, not inferred context.** Competitors largely infer rationale from artifacts. Lore asks the person who made the change, at the moment of change, and stores the answer as a reviewed, versioned record. This is the "trust layer" agents can rely on.
- **Capture of rationale that exists nowhere.** Search tools cannot index a decision that was never written down. A gap-triggered, opt-in debrief addresses exactly that.
- **Lifecycle and freshness.** Verification, review dates, supersession and conflict handling are first-class, which most retrieval tools treat only as a ranking signal.
- **Low-friction capture.** If a 3-minute debrief really produces an approved record, that is a workflow advantage competitors lack.

If customer calls show teams do not care about any of these, the thesis fails early and cheaply. That is the point of Phase 0 below.

## 3. Strengths to keep

- **Evidence before confidence**: provenance preserved from extraction through citation; correct abstention is an explicit requirement.
- **Permissions before model context**, with the rule against leaking titles or snippets of inaccessible records.
- **Transcript, model summary and verified knowledge kept as separate records**; "verified" defined as process-reviewed, not universally true.
- **Relational-first storage, modular monolith, no Kafka/Temporal/graph DB at the start.**
- **Idempotent webhook handling with durable job records, replayable failures.**
- **Evaluation plan** (citation correctness, faithfulness, permission leakage, refusal behavior) and the line that a polished demo is not reliability evidence.
- **Honest claims policy**: no fabricated logos, no certification or zero-retention claims without evidence.
- **Consent and opt-in framing** for capture, which directly addresses the surveillance risk.
- **Definition of done** that includes states, audit, tests and accessibility.

## 4. Critical issues and recommended fixes

### Critical (resolve before building)

**C1. No competitor analysis or stated moat.** Fix: adopt the narrowed positioning above; write a one-page competitive brief; interview 15–20 engineering leaders and ask directly what they use today and why it fails.

**C2. No validated customer demand.** The draft lists assumptions but no design partners, no discovery interviews and no willingness-to-pay evidence. Fix: Phase 0 (section 6) makes this the first deliverable.

**C3. Source-permission fidelity is undefined.** The draft requires that "unauthorized content never enters model context" and mapping of source ACLs, but marks fidelity as an open question. Per-user ACL mapping across tools is one of the hardest enterprise problems. Fix: choose an MVP model explicitly (section 7.3), and do not sell more than you implement.

**C4. Agent consumption is missing.** Fix: add a read-only MCP server and API over *approved* knowledge in the MVP. It is cheap, it matches how teams work in 2026, and it differentiates a verified layer from raw retrieval.

### High

**H1. Voice is the riskiest and most expensive bet, and it is treated as core.** Real-time full-duplex voice (transport, VAD, latency, interruption handling, provider costs) can consume a month on its own. Fix: ship **text and asynchronous voice-note debriefs first** (record, transcribe, ask 2–3 targeted follow-ups, produce a draft). Add real-time voice only if pilot data shows engineers prefer it.

**H2. Gap detection ("rationale not captured") is under-specified.** The whole demo hinges on it, and a noisy trigger will annoy users within days. Fix: start with a transparent rule set (e.g., PR above a size threshold, touches a designated critical service, description under a minimum length, no linked issue, no design doc), measure precision from contributor feedback, and rate-limit prompts per person per week.

**H3. GitHub alone under-represents where rationale lives.** Rationale often sits in Slack threads, Jira tickets and review comments. Fix: include PR *review comments and linked issues* in the first connector; plan **Slack as a capture surface** (DM debrief invitation, slash command) before Slack as an ingestion source, which avoids the hardest permission problem.

**H4. Reviewer burden.** If every record needs a reviewer, the queue becomes the bottleneck and "Needs review" becomes a graveyard. Fix: default to *contributor self-approval plus an optional second reviewer for designated critical systems* (CODEOWNERS can seed reviewers); track review latency as a core metric.

**H5. Roadmap sequencing places proof too late.** A customer-facing demo against a real repository happens at the end of month 3 and a pilot at month 6. Fix: demo a thin end-to-end loop by week 4, run design-partner usage from month 3.

### Medium

- **M1. Success metrics lack a north star.** Choose one: *share of qualifying merged PRs that end up with an approved decision record that is later reused in an answer*. Capture rate alone rewards volume, reuse proves value.
- **M2. Tenant isolation: "consider" Row-Level Security should become a decision.** Retrofitting RLS is painful; adopt it from the first migration and include workers and vector queries in isolation tests.
- **M3. Stack friction.** Next.js plus FastAPI plus Celery plus Redis plus LiveKit plus WorkOS is a lot of surface for a small team. Keep Postgres and pgvector; decide in an ADR whether a Postgres-backed queue replaces Redis/Celery initially; generate the TypeScript client from the OpenAPI spec; defer WorkOS until a pilot requires SSO.
- **M4. Cost model is missing.** Estimate per-seat cost for transcription, extraction, embeddings and answers before setting prices; set per-tenant usage caps in the MVP.
- **M5. Legal and privacy for voice.** Recording-consent and data-protection rules vary by jurisdiction (for example GDPR and India's DPDP Act). Get counsel's input on consent text and retention defaults before pilot; do not rely on engineering assumptions.
- **M6. Name and brand.** "Lore" is a common word; run a trademark and domain check early.
- **M7. Scope drift in the workspace.** Home dashboard, command palette, Knowledge Graph UI, expertise profiles, onboarding journeys and gap scoring are all in the target IA. Keep them in the vision, but ship a shell with only the screens the MVP loop needs.
- **M8. Evaluation needs numeric gates.** The draft lists metrics but no thresholds. Proposed starting gates are in section 7.5; calibrate with real data.

## 5. Checklist verdict (Accept / Revise / Defer)

| Area | Item | Verdict |
| --- | --- | --- |
| Product | Problem is specific and compelling | **Accept** |
| Product | Engineering continuity as wedge | **Accept**, narrow to software engineering |
| Product | Buyer and users clear | **Revise**: name one buyer and one daily user for the pilot |
| Product | Voice justifies its complexity | **Revise**: async voice and text first; real-time voice deferred |
| Product | Differentiated beyond generic RAG | **Revise**: needs competitor brief and sharper claim |
| Product | MVP narrow enough | **Revise**: keep MVP list, trim roadmap |
| UX | Website separate from workspace | **Accept** |
| UX | Navigation reflects jobs | **Revise**: ship 5 screens first (Home, Ask, Capture, Knowledge Hub, Review queue) |
| UX | Ask, Capture, Hub coherent | **Accept** |
| UX | Inspect and correct generated knowledge | **Accept** (critical) |
| UX | Sources, statuses, permissions visible | **Accept** |
| UX | Accessible and responsive | **Accept** |
| Architecture | Canonical model | **Accept**, finalize as ADR-002 |
| Architecture | Tenant and permission boundaries | **Revise**: choose MVP permission model |
| Architecture | Connector contract | **Accept**, add `revoke` and `delete_data` methods |
| Architecture | Relational-first storage | **Accept** |
| Architecture | Background processing and idempotency | **Accept** |
| Architecture | Provider abstraction | **Accept**, thin interfaces only (STT, LLM, embeddings) |
| Architecture | API contracts | **Accept** |
| AI and data | Provenance preserved | **Accept** |
| AI and data | Authorization before context | **Accept** (release gate) |
| AI and data | Abstains when evidence is thin | **Accept** (release gate) |
| AI and data | Citation correctness evaluated | **Accept** (release gate) |
| AI and data | Status and freshness affect retrieval | **Accept** |
| AI and data | Voice retention and consent explicit | **Revise**: add legal review |
| Enterprise | Source permissions and revocation | **Revise**: scope to repo-level for MVP |
| Enterprise | Tenant isolation tested | **Accept** |
| Enterprise | Audit and deletion | **Accept** |
| Enterprise | Claims substantiated | **Accept** |
| Enterprise | Backup, recovery, incident response | **Defer** to month 5–6 |
| Business | Pilot profile defined | **Revise**: see section 6 |
| Business | Measurable buyer reason | **Revise**: see north-star metric |
| Business | Pricing tested | **Defer** until Phase 0 and cost model |
| Business | Team can support integrations | **Revise**: depends on actual team size; plan assumes 3–5 engineers |

## 6. Updated plan: phases and gates

**Planning assumption:** a team of 3–5 people (2–3 full-stack/backend engineers, 1 AI/retrieval engineer, 1 product/design). If the team is smaller, stretch each phase by about 50% rather than adding scope.

### Phase 0: Validate before you build (weeks 0–4, runs in parallel with Phase 1 foundation)

1. **Discovery:** 15–20 interviews with engineering managers, staff engineers and platform leads at 30–300 engineer companies. Ask what they use today (Unblocked, Dosu, Glean, Confluence, Slack), what happened the last time rationale was lost, and who owns the budget.
2. **Design partners:** secure 3–5 teams willing to connect a non-sensitive repository and give weekly feedback.
3. **Concierge test:** take 10 recently merged PRs from a partner repo. Manually run a 10-minute debrief with each author (call or async voice note), write the decision records by hand using the Lore schema, then ask other engineers 15 real questions and compare answers with and without the records.
4. **Kill/continue gate (end of week 4):** continue only if (a) at least 60% of invited authors agree to a debrief, (b) at least 3 partners say they would pay or commit to a pilot, and (c) reviewers rate the records as materially more useful than PR descriptions alone. Thresholds are starting proposals; adjust, but write them down *before* the test.

### Phase 1: Thin vertical slice (weeks 1–8)

Goal: the demo scenario from the draft, end to end, in text first.

- Workspace, users, roles, **RLS-based tenant isolation**
- Canonical knowledge model with evidence and provenance
- Knowledge Hub list and detail pages with status, sources, version history
- Typed capture and **async voice-note capture** with transcription and structured extraction
- Contributor review and approval; optional second reviewer for critical systems
- Hybrid search and Ask Lore with citations and abstention
- Audit events for core actions
- First evaluation set (see 7.5)

**Exit:** a contributor explains a design choice, approves a draft record, and a second user gets a correctly cited answer. Unauthorized content is never returned.

### Phase 2: Connect to real change (weeks 8–16)

- GitHub App: installation, scopes, repository discovery, merged-PR and review-comment ingestion, signature validation, idempotent processing, replay
- Entity mapping: repository, service (from CODEOWNERS or config), contributor
- Rule-based **debrief trigger** with rate limits, snooze and decline; invitation by email and Slack DM
- Link approved records to PRs; show them on the PR as a comment or check linking back to the record
- **Read-only MCP server and API** over approved knowledge, with the same permission checks as the UI
- Start design-partner usage in a real repository

**Exit:** a real merged PR leads to an approved record that an engineer or a coding agent retrieves with correct citations.

### Phase 3: Pilot and learn (weeks 16–24)

- Run pilots with 2–3 design partners; instrument the north-star metric and baselines
- Add **one** additional source chosen from pilot demand (Slack channel capture surface, or Jira/Confluence ingestion)
- Review scheduling, freshness indicators and conflict flags on top of approved records
- Governance: retention settings, deletion workflows, audit export, SSO if a partner requires it
- Lightweight relationship view (system → decisions → PRs) built from relational tables, not a graph database
- Security review, tenant-isolation and permission-leak test suite, backup and restore exercise
- Cost model validated on real usage; first pricing experiment

**Exit:** measurable pilot outcomes and a go/no-go decision on a paid release.

### Deferred until pilot evidence supports them

Real-time full-duplex voice; Knowledge Graph explorer UI; People & Expertise profiles; predictive gap or risk scoring; full onboarding journeys (after approved records exist, a simple curated "start here" collection per service is enough); Backstage sync; OpenTelemetry/OpenLineage ingestion; BYOC or self-hosting; native IDE extension (the MCP server covers most of the need); Kafka/Temporal; graph database.

## 7. Updated product and technical decisions

### 7.1 Positioning and customer

- **Tagline (testable):** *The verified "why" behind your code, for engineers and their coding agents.*
- **Long-term vision (unchanged):** organizational memory and continuity.
- **Initial customer:** software companies with 30–300 engineers, GitHub-based, using Slack and Jira/Confluence, with recent turnover, rapid hiring or legacy services.
- **Buyer:** VP Engineering / Head of Engineering or platform lead. **Daily users:** staff and senior engineers (contributors), new hires (askers), coding agents (consumers).

### 7.2 Core product loop

```
Merged PR → gap check → optional debrief (text / voice note)
  → structured draft decision → contributor review → approved record
  → linked to PR + service → retrieved by engineers and agents with citations
```

Every feature in the MVP must serve a step of this loop.

### 7.3 Permission model for the MVP (decision required)

| Option | Description | Recommendation |
| --- | --- | --- |
| A. Workspace-wide corpus | All members see all approved records; sources are repositories the admin explicitly connects | **Pilot default**: simple, honest, testable |
| B. Repository-scoped visibility | Records inherit access from the connected repository; checked via the user's GitHub identity | **Second step** once a partner needs it |
| C. Full per-source ACL mapping | Every source's ACL mirrored per user | **Defer**; large and ongoing cost |

Rule that holds in every option: private drafts and raw transcripts are visible only to their author and designated reviewers until approved; retrieval filters by permission *before* building model context; citations never reveal inaccessible titles or snippets.

### 7.4 Architecture adjustments

- Keep the modular monolith with background workers; keep Next.js, FastAPI, PostgreSQL and pgvector.
- Enable **Row-Level Security from the first migration**; tenant ID on every table, object path and vector row.
- **Job processing:** start with a durable Postgres job table (outbox pattern as drafted). Choose Celery/Redis versus a Postgres-backed queue in an ADR; do not run both.
- **Voice:** thin `SpeechToText` and `LLM` interfaces; managed transcription for async notes. Revisit a real-time transport (such as LiveKit) in Phase 3 only if data supports it.
- **Connector contract:** keep the drafted methods and add `revoke_access()` and `delete_source_data()`; document rate-limit and retry behavior per connector.
- **Agent interface:** MCP server and REST API expose only *approved* records plus clearly labeled evidence, and return abstention when evidence is weak.
- **Extraction:** store source spans or timestamps for each generated field so reviewers can verify the draft against the transcript and the PR.
- **Knowledge status in retrieval:** verified records outrank unreviewed drafts; drafts are never served to others; superseded records are excluded or clearly marked.
- **Auth:** start with email/OAuth login; add WorkOS (or equivalent) when the first pilot requires SSO.

### 7.5 Evaluation gates (proposed starting targets; calibrate on real data)

| Metric | Release gate for design-partner use |
| --- | --- |
| Permission leakage across tenants and roles | **Zero** in the automated suite |
| Citation correctness (cited source supports the claim) | ≥ 90% on the curated set |
| Correct abstention on out-of-evidence questions | ≥ 90% |
| Answer faithfulness (no unsupported statements) | ≥ 90% by human spot-check |
| Extraction accuracy of decision, alternatives, rationale | Reviewers accept or lightly edit ≥ 70% of drafts |
| Debrief trigger precision (contributor rates prompt "relevant") | ≥ 60%, with prompt volume capped |
| Median time to approve a draft | Tracked; target set after Phase 1 |
| Latency and cost per answer and per debrief | Tracked; budgets set after Phase 1 |

Build the evaluation set from the concierge test: 40–60 questions, including ones that should be refused and ones that test stale or superseded records.

### 7.6 Product metrics

- **North star:** qualifying merged PRs that produce an approved record *later cited in an answer* (reuse rate).
- **Supporting:** debrief acceptance and completion rate, draft-to-approval time, answer helpfulness rating, unanswered-question rate, repeated-question reduction on selected onboarding topics, review completion.
- **Baselines first:** before pilot, measure how long it takes engineers to answer 10 known "why" questions today.

## 8. Answers to the draft's product-owner questions (recommended)

1. **Segment:** software engineering only. Revisit hardware/industrial after a paid release.
2. **Voice:** one of several modes. Text and async voice notes first; real-time voice later.
3. **First integration:** manual capture and Ask Lore work standalone from week 1, GitHub arrives in Phase 2. Both must work independently.
4. **Permission fidelity for pilot:** option A, with option B available on request (see 7.3).
5. **Approver:** the contributor by default; a designated second reviewer for critical systems; configurable per workspace.
6. **Tenancy:** shared multi-tenant with RLS. Offer isolated deployment only if a paying customer requires it.
7. **Retention defaults:** keep extracted records, transcripts and evidence references; delete raw audio after transcript confirmation (configurable, for example 30 days); store source *references and minimal excerpts*, not full source snapshots. Confirm with counsel.
8. **Hosting and residency:** one cloud region initially; document provider data-handling terms and choose region per first customers.
9. **Smallest pilot profile and success outcome:** 1 team of 8–15 engineers, 1 repository cluster, 8 weeks, target: a meaningful share of qualifying PRs with approved records, positive answer-helpfulness ratings, and a stated intent to continue.
10. **First paid release essentials:** GitHub, debriefs, Ask Lore with citations, review lifecycle, MCP/API access, audit, retention controls, SSO. Everything else is later.

## 9. Updated risk register

| Risk | Why it matters | Mitigation |
| --- | --- | --- |
| Crowded market (Unblocked, Dosu, Glean, Guru) | Buyers may see Lore as redundant | Narrow positioning; test the verified-decision thesis in Phase 0; pursue agent-readable verified layer |
| Debrief fatigue or low opt-in | Capture is the core value | Transparent triggers, rate limits, snooze, text alternative, show contributors the downstream reuse |
| Noisy gap detection | Erodes trust fast | Rule-based start, precision tracking, feedback buttons |
| Reviewer bottleneck | Records stuck in draft | Self-approval default, second review only for critical systems, review-latency metric |
| Permission leakage | Existential for enterprise trust | Scoped MVP model, pre-retrieval filtering, automated leak tests as release gate |
| Wrong or stale answers | Reputational harm | Verified-only serving to others, review dates, supersession, abstention |
| Surveillance perception | Blocks adoption | Opt-in, visible controls, no individual productivity scoring, clear policy |
| Voice and model cost | Margin pressure | Async voice first, usage caps, cost tracked per tenant |
| Over-building | Delays proof | Phase gates; deferred list is enforced |
| Compliance expectations | Enterprise buyers ask early | Do not claim what is not evidenced; plan SOC 2-style controls from the start, certify later |
| Platform dependence on one provider | Vendor lock-in | Thin provider interfaces and a regression evaluation set before switching models |
| Name or IP conflict | Rebrand cost | Early trademark and domain check |

## 10. First 30 days (revised)

**Week 1: Decide and recruit**

- Adopt the narrowed positioning; write the 1-page competitive brief.
- Draft the interview script and discovery target list; book the first 8 interviews.
- Decide the MVP permission model (7.3) and record ADR-001 to ADR-003 (monolith, canonical schema, tenant isolation with RLS).
- Repository, CI, environments, auth skeleton.

**Week 2: Prove the concept manually, build the core**

- Run the first concierge debriefs on partner or sample PRs.
- Implement tenant model, roles, knowledge records, evidence references.
- Knowledge Hub list and detail; basic keyword search.

**Week 3: Close the loop in text**

- Typed capture and structured extraction with source spans.
- Review and approval states; audit events.
- Hybrid retrieval, Ask Lore with citations and abstention.
- Start the evaluation set from concierge questions.

**Week 4: Decide**

- Add async voice-note capture (record, transcribe, follow-up questions, draft).
- Demo the loop against a sample repository using a manually imported PR.
- Review Phase 0 results against the written gate and decide: continue, adjust or stop.
- Plan the GitHub App work only if the gate passes.

The draft's original week 4 (full GitHub App with webhooks) moves to Phase 2. Doing it before the demand gate risks spending a month on integration for a thesis that is still unproven.

## 11. Revised acceptance criteria for the MVP

1. A workspace can be created and members invited; roles restrict actions.
2. A contributor can submit knowledge by text or voice note and receive a structured draft with source spans.
3. The contributor can edit, approve or discard; only approved records are visible to others.
4. Search and Ask Lore return correct, clickable citations on the curated question set (gate in 7.5).
5. Ask Lore abstains on out-of-evidence questions.
6. A merged GitHub PR is ingested idempotently, linked to a repository and service, and a debrief invitation is offered by rule and can be declined or snoozed.
7. An approved record appears linked from the PR and is retrievable by a second user and via MCP/API.
8. Cross-tenant and unauthorized access tests pass with zero leaks.
9. Core actions, failures and retries are in the audit trail and are observable; failed jobs can be replayed.
10. Retention and deletion controls work for audio, transcripts and records.

## 12. Decisions needed from you

- **Team size and runway:** this determines whether the timeline holds or stretches by half.
- **Design-partner access:** do you already have 3–5 candidate teams?
- **Permission model:** confirm option A for the pilot.
- **Async voice first:** confirm deferring real-time voice.
- **Who owns legal review** for consent and retention text before any recording happens.

Once these are settled, the next artifacts to produce are the one-page competitive brief, the interview script, ADR-001 to ADR-003, and the canonical decision-record schema.
