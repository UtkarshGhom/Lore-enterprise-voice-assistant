# LORE

## Product Vision, Detailed Project Description & MVP Development Plan

**Working tagline:** Capture once. Understand forever.\
**Product category:** Voice-first organizational knowledge and
institutional memory platform\
**Document version:** 1.0\
**Prepared:** 31 October 2026\
**Status:** Buildathon MVP specification

------------------------------------------------------------------------

# 1. Executive Summary

Lore is a voice-first organizational memory platform that captures the
practical knowledge employees accumulate while doing their jobs and
makes that knowledge accessible to the rest of the organization through
a conversational AI mentor.

Organizations rely on knowledge that is rarely written down: why a
system was designed a certain way, which deployment step is easy to
miss, how a machine behaves when a sensor drifts, which workaround is
safe, who understands a legacy component, and what previous teams
learned from incidents. This knowledge often lives in conversations,
personal notes, chat threads and the memories of experienced employees.
When those employees change roles or leave, the context can disappear.

Traditional documentation and enterprise search are useful, but they
depend on people writing and maintaining documents and on users knowing
what to search for. Lore aims to close the gap between *knowing
something* and *making that knowledge usable by someone else*.

Lore has two central interactions:

1.  **Capture:** An experienced employee speaks naturally with Lore. An
    adaptive interviewer asks follow-up questions to uncover context,
    reasoning, steps, exceptions and lessons learned. Lore converts the
    conversation into structured knowledge for review.
2.  **Ask:** A new employee asks Lore a question in natural language or
    by voice. Lore retrieves relevant approved knowledge, explains the
    answer conversationally, and shows where the answer came from. If
    the knowledge is missing or uncertain, Lore says so rather than
    inventing an answer.

A manager can see which knowledge areas have been captured, which items
need review, and where important questions remain unanswered.

**Core promise:** Lore turns the experience behind people's work into
accessible, traceable organizational memory---not just another place to
store documents.

------------------------------------------------------------------------

# 2. The Problem

## 2.1 The knowledge-loss problem

Important operational and technical knowledge is frequently:

-   **Tacit:** It is learned through experience and is difficult to
    express in a formal document.
-   **Fragmented:** It is spread across employees, chat, tickets,
    repositories, meeting recordings and personal notes.
-   **Context-dependent:** A procedure may work only for a particular
    system version, customer, machine configuration or operating
    condition.
-   **Hard to discover:** A new employee may not know the right
    terminology, system name or person to ask.
-   **Expensive to transfer:** Senior employees are repeatedly
    interrupted to explain the same concepts.
-   **Difficult to maintain:** Documentation can become stale as
    systems, processes and people change.

## 2.2 Who experiences the problem?

  -----------------------------------------------------------------------
  Persona                 Current frustration     Desired outcome
  ----------------------- ----------------------- -----------------------
  Experienced employee /  Documentation feels     Share knowledge by
  subject-matter expert   like extra work;        speaking naturally and
                          explanations are        review what Lore
                          repeated                captures

  New employee            Does not know where     Get a clear answer,
                          information lives or    context and trustworthy
                          whom to ask             source quickly

  Team lead / manager     Cannot easily see what  Identify knowledge
                          knowledge is at risk or gaps, critical
                          missing                 dependencies and review
                                                  needs

  Organization /          Knowledge is scattered  Preserve useful context
  operations team         across tools and people and make it reusable
                                                  with appropriate access
                                                  controls
  -----------------------------------------------------------------------

## 2.3 Example situations

-   A senior engineer explains why a legacy service uses a non-standard
    retry mechanism.
-   An operator describes the symptoms that usually appear before a
    machine fault.
-   A DevOps engineer explains the safe rollback procedure for a
    particular release.
-   A hardware engineer explains how sensor calibration changes with
    temperature.
-   A departing employee records the recurring exceptions that are not
    in the official SOP.

These are examples for the product demonstration, not claims that Lore
already integrates with every system or industry.

------------------------------------------------------------------------

# 3. Product Vision and Positioning

## 3.1 Vision

Make the knowledge people gain through experience available to the
people who need it, at the moment they need it.

## 3.2 Mission

Capture practical expertise through low-friction conversations, organize
it with context and provenance, and deliver it through a trustworthy
conversational mentor.

## 3.3 Positioning statement

**Lore is a voice-first organizational memory platform that captures the
reasoning and practical experience behind work, then makes it accessible
through a traceable AI mentor.**

## 3.4 Product principles

1.  **Voice should reduce effort, not add novelty.** Voice is used where
    speaking is easier than writing or searching.
2.  **Ground every important answer.** Answers should be linked to
    approved knowledge and source material.
3.  **Preserve context, not just summaries.** Capture why a decision was
    made, when it applies and what exceptions exist.
4.  **Admit uncertainty.** If Lore cannot find reliable evidence, it
    should say what is missing.
5.  **Keep humans in control.** Contributors can review, correct,
    approve or withdraw captured knowledge.
6.  **Respect permissions.** Users should only retrieve information they
    are authorized to see.
7.  **Fit into existing work.** The MVP should prove the workflow before
    building a large integration ecosystem.

## 3.5 What Lore is not

-   Not a generic chatbot that answers from public model knowledge.
-   Not simply a document editor or wiki.
-   Not a replacement for official policies, safety procedures or
    qualified human judgment.
-   Not an employee surveillance or performance-scoring system.
-   Not an automatic source of truth: captured knowledge must have
    provenance and an appropriate review state.

------------------------------------------------------------------------

# 4. Users and Jobs to Be Done

## Persona A --- The Expert

**Job to be done:** "When I have useful experience that others keep
asking me about, help me explain it once in a natural conversation and
make sure the result is accurate."

Needs: - A short, guided interview. - Relevant follow-up questions. -
Ability to skip, pause and resume. - A readable summary of what was
captured. - Easy correction and approval. - Clear control over
attribution and visibility.

## Persona B --- The New Hire

**Job to be done:** "When I am blocked or unfamiliar with a system, help
me ask a question in ordinary language and understand the answer without
searching multiple tools or interrupting a colleague."

Needs: - Text and voice question input. - A direct answer before
excessive detail. - Sources, contributor and date. - Follow-up questions
that retain context. - Clear warning when the answer is incomplete,
unverified or outdated. - A way to flag an answer as incorrect or
unresolved.

## Persona C --- The Team Lead

**Job to be done:** "Help me understand whether important team knowledge
is being captured, reviewed and kept usable."

Needs: - Overview of knowledge items and their status. - Review queue. -
Areas with unanswered questions. - Items that depend on one expert. -
Simple ways to request a knowledge-capture session.

------------------------------------------------------------------------

# 5. Core Product Experience

Lore is organized around three primary areas:

1.  **Capture** --- record expert knowledge through a guided voice or
    text conversation.
2.  **Knowledge Library** --- inspect, search, review and maintain
    structured knowledge.
3.  **Ask Lore** --- ask questions and receive grounded answers through
    text or voice.

A lightweight **Team Overview** supports managers and reviewers.

## 5.1 End-to-end workflow

``` text
Expert starts a capture session
          |
          v
Lore asks adaptive questions
          |
          v
Audio / text transcript is created
          |
          v
Knowledge extraction
(facts, decisions, steps, risks, exceptions)
          |
          v
Expert reviews and corrects the draft
          |
          v
Approved knowledge is indexed
          |
          v
New hire asks a question
          |
          v
Retrieve relevant approved knowledge
          |
          v
Generate a grounded answer with sources
          |
          v
User asks follow-up or flags a gap
```

## 5.2 Capture experience

The expert chooses a topic or accepts a suggested prompt. Lore conducts
an interview designed to extract useful context.

Example opening: \> "Tell me about a part of the system that new team
members often misunderstand."

Possible follow-ups: - "What problem led to this design?" - "Why was
this approach chosen instead of the standard one?" - "Can you walk me
through the steps?" - "What usually goes wrong?" - "Are there exceptions
where this advice does not apply?" - "How can someone verify that the
process worked?" - "When was this last true?"

The interviewer should not ask every question mechanically. It should
select follow-ups based on what has already been said and what is still
unclear.

## 5.3 Knowledge review experience

After the interview, Lore creates a draft with structured sections:

-   Topic and short summary
-   System, project or process
-   Problem / context
-   Decision and rationale
-   Procedure or recommended action
-   Exceptions and known failure modes
-   Risks and warnings
-   Relevant people or teams
-   Applicable version, date or environment
-   Open questions
-   Original transcript references

The expert can edit the draft, mark fields as unknown, remove sensitive
details and approve it.

## 5.4 Ask Lore experience

A user can type or speak a question.

Example: \> "Why does the billing service use an idempotency key?"

Lore should: 1. Identify the intent and important entities. 2. Retrieve
relevant approved knowledge. 3. Answer using the retrieved material. 4.
Attach source references to claims. 5. Offer a useful follow-up. 6.
Admit when the evidence is insufficient.

Example answer: \> "The team introduced idempotency keys because payment
requests can be retried after timeouts. Without a stable key, a retry
could be processed as a second payment. The capture note from the
billing team explains the original failure scenario and the expected
retry behavior."

The actual demo answer must be grounded in the knowledge captured for
the demo. The example above is illustrative.

## 5.5 Team overview

The MVP overview can show: - Total knowledge items. - Drafts awaiting
approval. - Approved items. - Items flagged as potentially outdated. -
Questions with no adequate answer. - Topics with only one known
contributor.

Do not present these indicators as an objective measure of employee
performance.

------------------------------------------------------------------------

# 6. Functional Requirements

Priority definitions:

-   **P0 --- Must have:** Required for the core demo and MVP.
-   **P1 --- Should have:** Valuable if time permits after the core
    workflow works.
-   **P2 --- Later:** Deliberately excluded from the first build.

## 6.1 Capture and interviewing

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  CAP-01           Start a capture                     P0 Expert can enter
                   session                                a topic and
                                                          begin a session

  CAP-02           Voice                               P0 User can speak
                   conversation                           and receive
                                                          spoken
                                                          interviewer
                                                          responses

  CAP-03           Text fallback                       P0 User can
                                                          complete the
                                                          same flow
                                                          without
                                                          microphone
                                                          access

  CAP-04           Adaptive                            P0 Interviewer asks
                   follow-up                              relevant
                   questions                              follow-ups based
                                                          on missing
                                                          context

  CAP-05           Session                             P0 Conversation is
                   transcript                             stored and
                                                          associated with
                                                          the session

  CAP-06           Pause / end                         P0 User can end the
                   session                                interview and
                                                          proceed to
                                                          review

  CAP-07           Topic prompts                       P1 User can choose
                                                          prompts such as
                                                          incident,
                                                          decision,
                                                          procedure or
                                                          onboarding

  CAP-08           Resume                              P2 User can resume
                   incomplete                             a saved draft
                   session                                
  ------------------------------------------------------------------------

## 6.2 Knowledge extraction and review

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  KNO-01           Structured                          P0 Transcript
                   extraction                             becomes a
                                                          structured draft

  KNO-02           Source linkage                      P0 Each draft links
                                                          to the source
                                                          session and
                                                          transcript

  KNO-03           Edit extracted                      P0 Expert can
                   content                                correct text
                                                          before approval

  KNO-04           Approve / reject                    P0 Only approved
                                                          knowledge is
                                                          used for
                                                          standard Ask
                                                          Lore answers

  KNO-05           Status tracking                     P0 Draft, approved
                                                          and archived
                                                          states are
                                                          visible

  KNO-06           Mark unknowns                       P1 Expert can
                                                          explicitly mark
                                                          information as
                                                          unknown

  KNO-07           Version history                     P2 Changes can be
                                                          inspected over
                                                          time
  ------------------------------------------------------------------------

## 6.3 Ask Lore and retrieval

  --------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ------------------
  ASK-01           Ask in natural                      P0 User can submit a
                   language                               text question

  ASK-02           Voice question                      P0 User can ask by
                                                          voice

  ASK-03           Retrieve                            P0 Relevant approved
                   approved                               content is
                   knowledge                              retrieved

  ASK-04           Grounded                            P0 Answer is
                   response                               generated from
                                                          retrieved evidence

  ASK-05           Source                              P0 Answer displays
                   references                             source title and
                                                          contributor/date
                                                          where available

  ASK-06           Unknown response                    P0 System admits
                                                          insufficient
                                                          evidence instead
                                                          of fabricating

  ASK-07           Conversational                      P1 Follow-up
                   follow-up                              questions preserve
                                                          conversation
                                                          context

  ASK-08           Feedback /                          P1 User can flag
                   report issue                           incorrect,
                                                          incomplete or
                                                          stale answers
  --------------------------------------------------------------------------

## 6.4 Library and management

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  LIB-01           List knowledge                      P0 User can view
                   items                                  items and their
                                                          status

  LIB-02           Search knowledge                    P0 User can search
                                                          by keyword

  LIB-03           Filter by topic                     P1 User can filter
                   / status                               the list

  MGR-01           Basic overview                      P1 Manager sees
                   metrics                                counts and
                                                          pending reviews

  MGR-02           Knowledge gap                       P2 Unanswered
                   list                                   questions are
                                                          grouped into
                                                          candidate gaps
  ------------------------------------------------------------------------

------------------------------------------------------------------------

# 7. Trust, Safety, and Data Governance

Trust is a core product requirement, not a decorative feature.

## 7.1 Provenance

Every approved knowledge item should retain: - Contributor or approved
attribution label. - Capture session ID. - Capture date. - Approval date
and approver. - Source transcript or excerpt. - Knowledge status. -
Optional system / project / version context.

## 7.2 Answer grounding

For the MVP: - Retrieve only approved knowledge by default. - Provide
source references for substantive answers. - Do not allow the language
model to fill evidence gaps with confident guesses. - If no relevant
source is found, respond that Lore does not have enough captured
knowledge. - If two sources conflict, surface the conflict rather than
silently choosing one.

## 7.3 Privacy and access

For a buildathon prototype: - Use synthetic or explicitly consented
demonstration data. - Make it clear when audio is being recorded. - Ask
for consent before capture. - Do not ingest confidential company data
without authorization. - Keep API keys on the server. - Do not expose
one user's private capture drafts to other users. - Add basic role
checks for expert, learner and admin/reviewer. - Define a deletion path
for sessions and knowledge items.

A production deployment would need a formal security review, retention
policy, encryption, audit logging, access-control model, vendor review
and applicable legal/privacy assessment. A prototype must not claim
enterprise compliance certifications unless independently achieved.

## 7.4 Human review

-   Extracted knowledge is a draft until approved.
-   The contributor can correct or reject it.
-   A manager/reviewer may be required for sensitive or high-impact
    content.
-   Safety-critical, legal, medical, financial or regulatory
    instructions must not be treated as authoritative solely because
    Lore retrieved them.

------------------------------------------------------------------------

# 8. MVP Scope

## 8.1 MVP objective

Prove one complete, understandable loop:

**An expert explains a real or simulated work lesson by voice → Lore
turns it into structured knowledge → the expert approves it → a new hire
asks a question → Lore answers using that knowledge and shows the
source.**

If this loop works reliably, the product concept is demonstrated.

## 8.2 P0 features to build

1.  A simple landing / workspace screen.
2.  Capture session with voice and text fallback.
3.  Interviewer that asks a small number of adaptive follow-up
    questions.
4.  Transcript storage.
5.  Structured knowledge extraction.
6.  Review and approval screen.
7.  Knowledge storage and vector retrieval.
8.  Ask Lore text interface.
9.  Grounded answers with source references.
10. Unknown / insufficient-evidence response.
11. Basic demo roles or a simple seeded workspace.

## 8.3 Explicitly out of scope for the first MVP

-   Full enterprise SSO and complex organization provisioning.
-   Dozens of integrations (GitHub, Jira, Slack, Confluence, etc.).
-   Automatic access to company repositories.
-   Real-time screen sharing and video analysis.
-   Full knowledge graph visualization.
-   Multi-agent debate or autonomous validation.
-   Automated employee performance analytics.
-   Complex workflow automation.
-   Guaranteed multilingual support unless tested end-to-end.
-   Production-grade compliance claims.

## 8.4 Demo success criteria

The MVP is successful when: - An expert can complete a short capture
session. - A transcript is saved. - Lore produces a useful structured
draft. - The expert can edit and approve it. - An Ask Lore query
retrieves the approved item. - The answer includes a source reference. -
A question outside the captured knowledge produces an honest unknown
response. - The end-to-end flow can be repeated during a live
demonstration without manual database intervention.

------------------------------------------------------------------------

# 9. Suggested Technical Architecture

The architecture below is a pragmatic buildathon option, not a mandatory
stack. Choose tools the team can implement and debug quickly.

## 9.1 Recommended stack

  -----------------------------------------------------------------------
  Layer                   Suggested technology    Purpose
  ----------------------- ----------------------- -----------------------
  Frontend                Next.js + TypeScript    Web application and
                                                  user interface

  UI styling              Tailwind CSS            Fast, consistent
                                                  interface development

  Voice agent             Bolna Symphony          Voice conversation and
                                                  agent orchestration

  Backend API             Python FastAPI or       Session, knowledge and
                          Next.js server routes   query orchestration

  Relational database     Supabase PostgreSQL     Users, sessions,
                                                  knowledge records and
                                                  status

  Vector search           pgvector in Supabase    Semantic retrieval over
                                                  approved knowledge

  LLM                     A model available       Extraction, question
                          through the team's      answering and follow-up
                          provider                generation

  Embeddings              Embedding model         Convert knowledge
                          supported by the chosen chunks and questions to
                          provider                vectors

  Hosting                 Vercel for frontend; a  Deployment
                          suitable backend host   

  Source control          GitHub                  Collaboration and
                                                  version control
  -----------------------------------------------------------------------

**Important:** Confirm the exact Bolna Symphony APIs, supported events,
authentication method, webhook behavior and current SDK before
implementation. Do not assume a particular endpoint or payload shape
without checking the current documentation.

## 9.2 High-level architecture

``` text
                 EXPERT
                   |
             Voice / Text UI
                   |
             Bolna Voice Agent
                   |
          Session / Transcript API
                   |
           Transcript + Metadata
                   |
           Knowledge Extraction
                   |
            Expert Review UI
                   |
              Approval API
                   |
       PostgreSQL + Knowledge Chunks
                   |
             Embedding Index
                   |
                   v
NEW HIRE ---> Ask Lore API ---> Semantic Retrieval
                   |                   |
                   |              Approved Sources
                   |                   |
                   +------ LLM <------+
                             |
                    Grounded Answer
                             |
                   Answer + Citations
                             |
                     Text / Voice UI
```

## 9.3 Suggested backend modules

-   `auth`: authentication and role checks.
-   `sessions`: create, update and end capture sessions.
-   `voice`: Bolna integration, webhook handling and transcript events.
-   `extraction`: convert transcripts into structured knowledge.
-   `knowledge`: CRUD, review and approval.
-   `embeddings`: chunking, embedding and vector index updates.
-   `retrieval`: similarity search and source selection.
-   `mentor`: grounded answer generation and uncertainty behavior.
-   `feedback`: answer feedback and unresolved questions.

Keep the voice-provider integration behind a small adapter/service so
that the application logic is not tightly coupled to one vendor's event
format.

------------------------------------------------------------------------

# 10. Data Model

A minimal relational design is sufficient for the MVP.

## 10.1 Tables

### `users`

-   `id`
-   `name`
-   `email`
-   `role` --- expert, learner, reviewer, admin
-   `created_at`

### `capture_sessions`

-   `id`
-   `created_by`
-   `topic`
-   `session_type` --- decision, incident, procedure, system overview,
    general
-   `status` --- active, completed, processed, cancelled
-   `transcript`
-   `audio_reference` --- optional; avoid storing audio if it is not
    required
-   `created_at`
-   `completed_at`

### `knowledge_items`

-   `id`
-   `title`
-   `summary`
-   `topic`
-   `system_or_project`
-   `context`
-   `decision_or_procedure`
-   `rationale`
-   `exceptions`
-   `risks`
-   `applicability`
-   `source_session_id`
-   `contributor_id`
-   `status` --- draft, approved, archived
-   `approved_by`
-   `approved_at`
-   `updated_at`

### `knowledge_chunks`

-   `id`
-   `knowledge_item_id`
-   `chunk_text`
-   `embedding`
-   `chunk_index`
-   `source_excerpt`
-   `created_at`

### `questions` (optional P1)

-   `id`
-   `asked_by`
-   `question_text`
-   `answer_status` --- answered, insufficient_evidence, conflict
-   `created_at`

### `feedback` (optional P1)

-   `id`
-   `question_id`
-   `user_id`
-   `feedback_type`
-   `comment`
-   `created_at`

## 10.2 Data relationships

-   One user can create many capture sessions.
-   One capture session can produce one or more knowledge items.
-   One knowledge item can be split into many searchable chunks.
-   Each chunk belongs to one knowledge item.
-   Each knowledge item retains a link to its source session.
-   An answer can reference one or more knowledge items/chunks.

Use database constraints and server-side authorization. Do not rely on
hiding UI elements as the only access-control mechanism.

------------------------------------------------------------------------

# 11. AI Design

## 11.1 Agent A --- Lore Capture Interviewer

**Goal:** Elicit useful, specific and reusable expertise.

Responsibilities: - Introduce the session and obtain consent. -
Understand the topic. - Ask follow-ups for missing context. - Seek
concrete examples. - Distinguish facts, opinions, assumptions and
uncertain recollections. - Ask about exceptions, risks and
applicability. - End with a short verbal recap and invite correction.

### Interviewer system prompt (starting point)

``` text
You are Lore, a respectful organizational knowledge interviewer.

Your goal is to capture practical knowledge that another employee can use.
Conduct a natural, concise conversation. Ask one question at a time.

Explore:
- What system, project or process is being discussed?
- What problem or situation occurred?
- What action or decision was taken?
- Why was that approach chosen?
- What alternatives were considered, if known?
- What steps should another employee follow?
- What can go wrong?
- What exceptions or conditions change the advice?
- When and where does this knowledge apply?

Do not invent missing details. If the speaker is unsure, preserve that uncertainty.
Ask follow-up questions only when they add useful context.
Do not request passwords, secrets, personal data or unrelated confidential information.
Before ending, summarize the key points and ask the speaker to correct anything inaccurate.
```

## 11.2 Agent B --- Lore Knowledge Mentor

**Goal:** Answer employee questions using approved organizational
knowledge.

Responsibilities: - Understand the question. - Retrieve relevant
approved knowledge. - Answer clearly and concisely. - Explain reasoning
when the source supports it. - Cite the source item and relevant
excerpt. - Distinguish direct evidence from inference. - Admit when the
knowledge base is insufficient. - Surface conflicts between sources.

### Mentor system prompt (starting point)

``` text
You are Lore, an organizational knowledge mentor.

Answer using only the supplied retrieved knowledge and source excerpts.
Do not use general model knowledge to invent organization-specific facts.

Rules:
1. If the retrieved evidence supports an answer, explain it clearly.
2. Attach source references to the claims they support.
3. If evidence is incomplete, state what is known and what is missing.
4. If no reliable evidence is available, say you do not know based on the
   knowledge currently captured in Lore.
5. If sources conflict, explain the conflict and identify the sources.
6. Do not turn assumptions into facts.
7. Do not present unapproved drafts as approved organizational guidance.
8. For safety-critical or regulated decisions, direct the user to the
   relevant official procedure or responsible human authority.
```

## 11.3 Knowledge extraction schema

Use structured JSON output validated by the backend. Example schema:

``` json
{
  "title": "Handling duplicate payment retries",
  "summary": "Why idempotency keys are used in the billing service.",
  "topic": "Backend / Billing",
  "system_or_project": "Billing service",
  "context": "Payment requests may be retried after a timeout.",
  "problem": "A retry could be processed as a second payment.",
  "decision_or_procedure": "Use a stable idempotency key for the logical payment request.",
  "rationale": "The key lets the service recognize a retry of the same operation.",
  "exceptions": [],
  "risks": ["A new key for every retry may defeat deduplication."],
  "applicability": "Confirm the behavior against the current service version.",
  "open_questions": [],
  "source_session_id": "session_id",
  "confidence_notes": "Extracted from the speaker's explanation; requires expert review."
}
```

This is illustrative demo content. Do not present it as a real
organization's engineering policy.

## 11.4 Retrieval-augmented generation (RAG)

Recommended MVP flow:

1.  Normalize the user's question.
2.  Generate an embedding for the question.
3.  Search approved knowledge chunks using vector similarity.
4.  Optionally apply keyword search for exact system names and
    identifiers.
5.  Select a small number of relevant chunks.
6.  Pass those chunks and metadata to the mentor model.
7.  Generate an answer with source IDs.
8.  Validate that cited source IDs were actually retrieved.
9.  Return answer, sources and an evidence status.

### Important retrieval rules

-   Filter by user permissions before returning chunks.
-   Filter to approved content for normal queries.
-   Avoid sending the entire knowledge base to the LLM.
-   Preserve source metadata through chunking.
-   Tune chunk size and retrieval count with real test questions.
-   Use a minimum relevance threshold, but calibrate it empirically.
-   Do not equate vector similarity with factual correctness.

### Suggested initial chunking

Start with chunks of roughly 300--600 tokens with modest overlap, then
evaluate. Keep related context together where possible. The best chunk
size depends on the content and embedding model.

------------------------------------------------------------------------

# 12. User Interface and Screen Specification

## Screen 1 --- Workspace / Home

Purpose: make the three actions immediately obvious.

Elements: - Lore logo and workspace name. - Primary actions: "Capture
knowledge" and "Ask Lore". - Recent knowledge items. - Pending review
count. - Recent unanswered questions. - Simple navigation: Home,
Capture, Library, Ask Lore.

## Screen 2 --- Start Capture

Elements: - Topic input. - Optional category selector. - Short
explanation of recording and consent. - Start voice session button. -
Text-only alternative.

## Screen 3 --- Live Interview

Elements: - Clear recording / listening state. - Conversation
transcript. - Current question. - Mute / end controls. - Connection
status. - Option to switch to text if voice fails.

Do not make decorative waveform animation more important than reliable
conversation controls.

## Screen 4 --- Review Knowledge

Elements: - Generated title and summary. - Editable structured
sections. - Source transcript panel or excerpts. - Status label:
Draft. - Buttons: Save draft, Approve, Discard. - Warning when fields
are uncertain or open questions remain.

## Screen 5 --- Knowledge Library

Elements: - Search bar. - List of knowledge items. - Status and topic
filters. - Title, summary, contributor and last-updated date. - Detail
view with source and approval information.

## Screen 6 --- Ask Lore

Elements: - Chat interface. - Text input and microphone button. - Answer
with inline source references. - Source cards showing title, contributor
and date. - Feedback action. - Clear "not enough captured knowledge"
state.

## Screen 7 --- Team Overview (P1)

Elements: - Total approved knowledge items. - Drafts awaiting review. -
Items flagged for review. - Unanswered questions. - Topics with limited
coverage.

------------------------------------------------------------------------

# 13. MVP Development Plan

The schedule below is a practical sequence for a small buildathon team.
Compress or parallelize based on team size and the actual time
remaining. Do not sacrifice the end-to-end working loop to build
secondary features.

## Phase 0 --- Product lock and setup

**Deliverables** - Confirm the exact MVP flow. - Confirm Bolna
account/API access and current integration documentation. - Create
GitHub repository. - Create frontend and backend skeletons. - Create
Supabase project and schema. - Configure environment variables. - Agree
on demo scenario and sample knowledge.

**Exit criteria** - All team members can run the project locally. - One
test user can access the workspace. - Database connection works. -
Secrets are not committed to Git.

## Phase 1 --- Application shell and data layer

**Build** - Home screen and navigation. - Basic user/role model. -
Capture session creation. - Database tables and server-side access
checks. - Knowledge Library list with seeded sample data.

**Exit criteria** - User can create a session and see it in the
application. - Knowledge records can be created and retrieved.

## Phase 2 --- Voice capture

**Build** - Connect Bolna voice agent. - Implement session start/end. -
Handle transcript or conversation events using the documented
integration. - Persist transcript and session metadata. - Add text
fallback.

**Exit criteria** - A user can complete a short interview. - Transcript
is stored against the correct session. - Failure or disconnect states
are visible and recoverable.

## Phase 3 --- Knowledge extraction and approval

**Build** - Send transcript to extraction model. - Validate structured
output. - Save draft knowledge. - Build editable review screen. -
Implement approve / reject. - Index only approved knowledge.

**Exit criteria** - A transcript becomes a structured draft. - Expert
can correct it. - Approval changes its status and makes it searchable.

## Phase 4 --- Ask Lore and grounded answers

**Build** - Question input. - Query embedding. - Vector retrieval over
approved chunks. - Mentor answer generation. - Source references. -
Unknown / low-evidence response. - Basic chat history for the current
session.

**Exit criteria** - Questions about captured content return grounded
answers. - Sources shown in the UI match retrieved records. - Questions
outside the knowledge base do not receive invented answers.

## Phase 5 --- Reliability, polish and demo

**Build** - Loading, empty, error and permission states. - Voice
fallback behavior. - Seeded demo workspace. - Test questions and
expected sources. - Responsive layout. - Demo script and backup
recording/screenshots.

**Exit criteria** - The full flow can be demonstrated repeatedly. - No
manual database edits are needed during the demo. - API keys and private
credentials are not visible in the client. - Team can explain
limitations honestly.

------------------------------------------------------------------------

# 14. Suggested Team Structure

For a team of four:

  -----------------------------------------------------------------------
  Role                    Ownership               Key deliverables
  ----------------------- ----------------------- -----------------------
  Product + frontend      User journeys, UI, UX   Home, capture, review,
                          and demo flow           library and Ask screens

  Voice + agent           Bolna setup,            Working voice capture
  integration             interviewer and voice   and transcript
                          events                  

  Backend + database      APIs, schema, auth,     Session and knowledge
                          storage and status      APIs
                          transitions             

  AI / RAG                Extraction, embeddings, Structured extraction
                          retrieval, grounded     and cited mentor
                          answers                 responses
  -----------------------------------------------------------------------

For a smaller team, combine product/frontend with backend, or voice
integration with AI. Define API contracts early to avoid integration
conflicts.

## Collaboration rules

-   Keep one owner per module.
-   Agree on request/response schemas before parallel coding.
-   Use feature branches and small pull requests.
-   Maintain a shared `.env.example` without real secrets.
-   Have one person responsible for integration and release stability.
-   Integrate continuously; do not wait until the final hours.

------------------------------------------------------------------------

# 15. API Contract Sketch

These are proposed application routes, not Bolna provider endpoints.

  Method   Route                           Purpose
  -------- ------------------------------- ---------------------------------------
  POST     `/api/sessions`                 Create capture session
  GET      `/api/sessions/{id}`            Get session
  POST     `/api/sessions/{id}/complete`   Complete session
  POST     `/api/sessions/{id}/extract`    Generate knowledge draft
  GET      `/api/knowledge`                List/search knowledge
  GET      `/api/knowledge/{id}`           Get knowledge item
  PATCH    `/api/knowledge/{id}`           Edit draft
  POST     `/api/knowledge/{id}/approve`   Approve knowledge
  POST     `/api/knowledge/{id}/archive`   Archive knowledge
  POST     `/api/ask`                      Ask Lore and retrieve grounded answer
  POST     `/api/feedback`                 Submit answer feedback

### Example Ask request

``` json
{
  "question": "Why does the billing service use idempotency keys?",
  "conversation_id": "optional-conversation-id"
}
```

### Example Ask response

``` json
{
  "answer": "The captured explanation says the key is used to recognize retries of the same logical payment request.",
  "evidence_status": "grounded",
  "sources": [
    {
      "knowledge_id": "knowledge-item-id",
      "title": "Handling duplicate payment retries",
      "contributor": "Backend team",
      "excerpt": "A retry after a timeout must not create a second payment."
    }
  ],
  "follow_up_suggestions": [
    "What happens when a retry uses a different key?"
  ]
}
```

### Evidence statuses

-   `grounded` --- retrieved approved evidence supports the response.
-   `partial` --- some evidence exists, but the answer is incomplete.
-   `insufficient_evidence` --- no reliable answer can be produced.
-   `conflicting_sources` --- relevant sources disagree.

------------------------------------------------------------------------

# 16. Testing and Quality Assurance

## 16.1 Capture tests

-   Speaker explains a clear procedure.
-   Speaker gives a vague answer; interviewer asks a useful follow-up.
-   Speaker says they do not know; system preserves uncertainty.
-   User ends session early.
-   Voice connection fails; user can switch to text.
-   Transcript is associated with the correct session.

## 16.2 Extraction tests

-   Correctly separates context, decision, rationale and exception.
-   Does not invent steps absent from transcript.
-   Preserves dates, versions and named systems.
-   Marks unclear statements as uncertain.
-   Retains source linkage.
-   Produces valid structured output or a recoverable validation error.

## 16.3 Ask Lore tests

Create a small fixed test set:

  -----------------------------------------------------------------------
  Test type               Example                 Expected behavior
  ----------------------- ----------------------- -----------------------
  Direct answer           "Why was this retry     Answer with the
                          approach introduced?"   relevant approved
                                                  source

  Procedure               "What steps should I    Return only steps
                          follow?"                supported by the source

  Exception               "Does this apply to     Explain applicability
                          every service?"         limits

  Unknown                 "What is the password?" Refuse to invent or
                                                  disclose secrets

  Out of scope            Ask about an uncaptured Say there is
                          project                 insufficient captured
                                                  knowledge

  Conflict                Two approved notes      Surface the
                          disagree                disagreement

  Permission              Ask for restricted      Do not expose
                          knowledge               restricted content
  -----------------------------------------------------------------------

## 16.4 Suggested quality metrics

Measure these during internal testing; do not claim them as achieved
until measured.

-   **Capture completion rate:** completed capture sessions / started
    sessions.
-   **Extraction edit rate:** proportion of extracted fields materially
    changed by the expert.
-   **Approval rate:** drafts approved / drafts submitted for review.
-   **Retrieval relevance:** proportion of test questions where a
    relevant source appears in top results.
-   **Grounded answer rate:** answer claims supported by displayed
    sources / total answer claims reviewed.
-   **Unknown handling accuracy:** proportion of unanswerable test
    questions correctly handled as insufficient evidence.
-   **End-to-end success rate:** complete capture-to-answer flows
    completed without manual intervention.

For a short demo, prioritize grounded answer rate and unknown handling
over vanity metrics such as number of generated knowledge items.

------------------------------------------------------------------------

# 17. Demo Dataset and Demonstration Story

Use a fictional organization such as **Northstar Systems**. Make it
clear that the data is synthetic.

## Demo experts

1.  **Backend engineer:** billing retries and idempotency.
2.  **DevOps engineer:** deployment rollback and common release
    failures.
3.  **Hardware engineer:** sensor calibration and environmental drift.

For the shortest demonstration, use one expert and one knowledge topic.
Add other topics only after the core flow is stable.

## Suggested live demo

### Part 1 --- The knowledge capture

The expert tells Lore: - What happened. - Why the issue mattered. - What
the team changed. - Why the solution was selected. - What a new employee
should avoid.

Lore asks one or two follow-up questions.

### Part 2 --- The knowledge review

Show the transcript and structured draft. Correct one field and approve
it.

### Part 3 --- The new hire question

Ask: \> "Why do we use an idempotency key, and what should I be careful
about when retrying a payment?"

Lore responds using the approved capture and displays the source.

### Part 4 --- The trust test

Ask something that was never captured: \> "What is the production
database password?"

Lore should not invent an answer and should not reveal secrets. For the
demo, it should say the requested information is not available and
direct the user to the approved secure process.

### Part 5 --- The value

Explain that the expert's experience has been captured once, reviewed,
and made accessible to the next person without requiring them to know
the exact document or person to search for.

------------------------------------------------------------------------

# 18. Product Differentiation and Competitive Context

The market already contains enterprise search, knowledge management, AI
interview and workflow assistant products. Lore should not claim that
voice knowledge capture, citations, knowledge verification or enterprise
search are individually unprecedented.

Potential product opportunity:

-   Connect expert-to-new-hire knowledge transfer in one coherent
    workflow.
-   Capture the *reasoning behind decisions*, not only final procedures.
-   Make the result usable through a conversational mentor.
-   Keep a visible path from answer to contributor, capture and source
    excerpt.
-   Turn unanswered questions into candidate knowledge gaps.
-   Keep human review central to the trust model.

These are product hypotheses to validate through user interviews and
hands-on competitor testing, not proven market gaps.

## Competitor learning checklist

  -----------------------------------------------------------------------
  Product / category      What to study           Lore design question
  ----------------------- ----------------------- -----------------------
  Enterprise search tools Search, permissions,    How can Lore make
                          citations, people       answers understandable
                          discovery               and traceable?

  Knowledge platforms     Review states,          How should Lore prevent
                          freshness, ownership    stale knowledge from
                          and verification        appearing
                                                  authoritative?

  AI interview products   Interview flow,         How can capture feel
                          adaptive questions,     useful rather than like
                          structured outputs      a survey?

  Frontline assistants    Messaging, voice notes, How can knowledge
                          field workflows         capture fit into work
                                                  with minimal friction?

  Wikis / documentation   Editing, navigation,    What information is
                          organization and        difficult to capture in
                          ownership               conventional documents?
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 19. Risks and Mitigations

  -----------------------------------------------------------------------
  Risk                    Why it matters          Mitigation
  ----------------------- ----------------------- -----------------------
  Hallucinated answers    Can cause users to      Retrieval-grounded
                          trust incorrect         generation, citations,
                          organizational guidance unknown state and tests

  Poor extraction         Incorrect summaries can Review before approval
                          distort expert          and preserve transcript
                          knowledge               

  Voice latency or        Breaks the main         Text fallback, concise
  failures                experience              turns and robust error
                                                  states

  Noisy / ambiguous       Can corrupt important   Show transcript for
  speech                  technical terms         correction; allow
                                                  spelling and text edits

  Stale knowledge         Old guidance may be     Capture date,
                          applied to new systems  applicability and
                                                  review status

  Conflicting knowledge   Teams may have          Surface conflict and
                          different practices     request human
                                                  resolution

  Sensitive data capture  Could expose secrets or Consent, warnings,
                          private information     redaction and access
                                                  controls

  Scope creep             Too many integrations   Protect the P0 workflow
                          can prevent a working   
                          MVP                     

  Weak demo data          Product value may be    Use a coherent
                          hard to understand      synthetic scenario and
                                                  test questions
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 20. Roadmap After MVP

## P1 --- Make the core product more useful

-   Follow-up conversations with session context.
-   Knowledge categories and filters.
-   Answer feedback and unresolved-question queue.
-   Review reminders and basic freshness flags.
-   Better hybrid keyword + semantic retrieval.
-   Basic team overview.

## P2 --- Connect Lore to the organization's workflow

-   GitHub / Jira / Slack / Confluence connectors where authorized.
-   Link knowledge to pull requests, tickets, incidents and projects.
-   Knowledge relationship graph.
-   Expert directory and topic ownership.
-   Scheduled capture sessions and offboarding workflows.
-   More languages and domain-specific terminology support.

## P3 --- Enterprise readiness

-   SSO and organization provisioning.
-   Fine-grained role and document permissions.
-   Audit logs and retention controls.
-   Enterprise deployment options.
-   Security and privacy assessments.
-   Advanced knowledge lifecycle and governance.
-   Analytics for knowledge coverage and dependency risk.

------------------------------------------------------------------------

# 21. Launch Checklist

## Product

-   [ ] Core user journeys are implemented.
-   [ ] Capture, approval and Ask Lore work end to end.
-   [ ] Text fallback exists.
-   [ ] Unknown response is tested.
-   [ ] Sources open the correct knowledge item.

## AI

-   [ ] Interviewer asks relevant follow-ups.
-   [ ] Extraction output is schema-validated.
-   [ ] Drafts are not searchable as approved knowledge.
-   [ ] Retrieval filters to authorized approved content.
-   [ ] Answer citations map to retrieved sources.
-   [ ] Conflicts and insufficient evidence are handled.

## Engineering

-   [ ] Environment variables are configured.
-   [ ] No secrets are committed.
-   [ ] Error and loading states are implemented.
-   [ ] Database access policies are tested.
-   [ ] Deployment has been tested from a clean session.
-   [ ] Backup demo path is ready.

## Demo

-   [ ] Synthetic data is loaded.
-   [ ] Expert capture scenario is rehearsed.
-   [ ] New-hire questions are prepared.
-   [ ] Unknown question is prepared.
-   [ ] Live voice connection is tested.
-   [ ] A short screen recording is available as backup.
-   [ ] Team can explain what is implemented versus planned.

------------------------------------------------------------------------

# 22. Final Product Summary

**Lore preserves the experience behind work.** An expert shares what
they know through a natural conversation. Lore turns that conversation
into structured, reviewable knowledge. A new employee can then ask
questions conversationally and receive answers grounded in the team's
captured experience, with a clear path back to the source.

The first MVP should not attempt to become a complete enterprise
knowledge platform. It should do one thing convincingly:

> **Capture one expert's knowledge, make it trustworthy, and help
> another person use it.**

That complete loop is the product's strongest demonstration of value.

------------------------------------------------------------------------

# Appendix A --- Suggested Repository Structure

``` text
lore/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── page.tsx
│       │   ├── capture/
│       │   ├── library/
│       │   └── ask/
│       ├── components/
│       ├── lib/
│       └── styles/
├── services/
│   └── api/
│       ├── app/
│       │   ├── main.py
│       │   ├── routes/
│       │   ├── services/
│       │   ├── models/
│       │   └── schemas/
│       └── requirements.txt
├── database/
│   ├── migrations/
│   └── seed.sql
├── docs/
│   ├── architecture.md
│   └── demo-script.md
├── .env.example
├── .gitignore
└── README.md
```

This is a suggested monorepo layout. A simpler single-app structure is
acceptable if it helps the team ship faster.

# Appendix B --- Environment Variables

Example names only; obtain actual values from the relevant providers.

``` bash
# Frontend / server
NEXT_PUBLIC_APP_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI provider
LLM_API_KEY=
EMBEDDING_API_KEY=

# Bolna — use the exact credentials and configuration
# required by the current Bolna documentation.
BOLNA_API_KEY=
BOLNA_AGENT_ID=
BOLNA_WEBHOOK_SECRET=
```

Never expose service-role keys, provider secrets or webhook secrets in
browser code. Keep `.env` files out of version control.

# Appendix C --- Questions to Resolve Before Coding

1.  Which exact Bolna Symphony integration path will be used for the
    voice interviewer?
2.  Does the chosen voice flow expose transcript events directly, or is
    a webhook / post-call retrieval required?
3.  Which model provider will handle extraction, embeddings and grounded
    answers?
4.  Will the demo use a single shared workspace or separate demo
    accounts?
5.  Will audio be retained, or will Lore store only transcripts and
    source metadata?
6.  Which knowledge fields are essential for the chosen demo domain?
7.  What is the minimum retrieval relevance threshold established by
    testing?
8.  Who can approve knowledge in the demo?
9.  What data is synthetic, and what consent wording will be shown?
10. What is the fallback if the live voice provider is unavailable
    during the presentation?

Resolve these questions early. In particular, validate the
voice-provider integration before investing heavily in the surrounding
UI.
