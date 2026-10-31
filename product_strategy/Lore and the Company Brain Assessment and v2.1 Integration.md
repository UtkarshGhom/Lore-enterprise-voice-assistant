# Lore and the Company Brain: Assessment and v2.1 Integration

*Assessment of the pasted "Company Brain" framing and how it strengthens the Lore v2.0 plan. Prepared 31 October 2026.*

**Bottom line:** the Company Brain idea is real and useful as a long-term vision. Adopt it as the direction, not as Lore's product identity.

## 1. Checking the source

YC's own Requests for Startups page lists "Company Brain" under Tom Blomfield. He describes it as a new foundational building block that would sit between a company's raw data and trustworthy AI automation.

The official entry I found is only a few sentences long. The specifics in the pasted text (Slack, email and CRM ingestion, a queryable knowledge graph) come from the third-party YCInsight write-up, which says it is independent of Y Combinator. Treat those details as one reading of the thesis, not as YC's own words, and do not rely on its market statistics without verification.

## 2. What the framing gets right

- **Capture, Connect, Activate** is a clean statement of the original ambition.
- **Maintaining understanding, not just retrieving information** is the strongest idea. It fits Lore's verification and lifecycle principles.
- **Broad vision with a narrow entry point** follows the same logic as v2.0.
- **Agents as consumers** reinforces the MCP and API addition already in v2.0.

## 3. Where to push back

1. **A category label is not differentiation.** The biggest problem found in the v2.0 review was a crowded market (Unblocked, Dosu, Glean, Guru). "Company Brain" is a broader and more crowded category. It works for investors, but a customer's first question will still be why Lore rather than an existing tool.
2. **Several of its "changes" are already in v2.0.** The source-agnostic canonical model, async voice first, relational-first storage, and a graph as a data model rather than a graph database were all in the plan. The real changes are the identity and the expansion path.
3. **"Capture everything, ship every interface" (answers D and D) would undo scope discipline.** Email, CRM and HR data each multiply the permission, consent and compliance burden.
4. **The autonomous company brain (option C) is the riskiest ambition.** A wrong answer is forgivable; a wrong action is not. Progress from read, to recommend, to act-with-approval, and only after trust metrics hold.
5. **The thesis line is a slogan until it is measurable.** "Understands what the organization knows, why, who can validate it and whether it still applies" needs tests behind it (see section 4).

## 4. How it strengthens v2.0

| Idea from the Company Brain framing | How to integrate it |
| --- | --- |
| Understanding, not retrieval | Add a **synthesis** category to the evaluation set. Use multi-source "why" questions, such as why a payment integration was discontinued, and score whether the answer assembles the requirement, decision, alternatives, incident, validators and current status. This also justifies adding a second connector (Slack or Jira) by Phase 3. |
| Context layer for agents | Upgrade the MCP server to a **Context API** with a defined contract. Each response carries status, applicability, sources and freshness, and it can abstain. This makes the "trust layer for agents" differentiation concrete. |
| Layered architecture | Describe Lore as Sources, then Lore Core (canonical model, provenance, permissions, lifecycle), then Access (Ask, API/MCP, in-tool surfaces), then People and agents. It maps onto the existing modular monolith, so nothing needs rebuilding. |
| Conflict and freshness | Raise conflict detection between sources in priority for Phase 3. It separates maintaining understanding from search. |
| Expansion path | Write down a **second-domain test**: which adjacent area (for example incident postmortems or product decisions) reuses the same entities and permission model, and what pilot evidence unlocks it. |
| Investor narrative | Use Company Brain as the vision slide; keep website and sales messaging on the engineering product. |

**Unchanged from v2.0:** PostgreSQL with pgvector, Row-Level Security and record-level authorization, provenance and source references, human verification and approval, hybrid retrieval with citation evaluation, a modular monolith, async voice before real-time voice, and no dedicated graph database until query patterns justify one.

## 5. Recommended positioning stack (v2.1)

| Layer | Statement |
| --- | --- |
| Vision | Lore: a verified, permission-aware company brain for people and agents |
| Product now | Lore for Engineering: the verified "why" behind code changes |
| Platform underneath | Lore Core plus a Context API |
| Expansion | A second department only after the gate criteria are met |

## 6. Recommended answers to the four product-identity questions

1. **Direction:** B. An engineering company brain that expands later.
2. **Capture:** D, but sequenced. GitHub plus typed and async voice capture first, one more tool next, documents later.
3. **Product experience:** a central interface plus the Context API and MCP in the MVP; embedded in-tool surfaces (PR comments, Slack) after the pilot.
4. **Ultimate ambition:** A as the long-term goal, with the best organizational knowledge platform (option B) as the 24-month milestone. Defer the autonomous option (C).

## 7. Suggested next steps

- Confirm the four answers above.
- Update the v2.0 plan into a v2.1 document: positioning stack, Context API contract, synthesis evaluation category, second-connector timing, and the second-domain test.
- Draft the Context API response schema (status, applicability, sources, freshness, abstention) as an ADR.
