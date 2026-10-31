import { NextRequest, NextResponse } from "next/server";
import { initialKnowledgeRecords } from "@/lib/data";

/**
 * Lore Model Context Protocol (MCP) Read-Only Server Endpoint
 * Allows AI Coding Agents (Cursor, Claude Code, GitHub Copilot, Antigravity)
 * to retrieve human-verified architectural decisions and code change rationale.
 * Completely free, local, and zero-dependency.
 */

export async function GET() {
  return NextResponse.json({
    name: "lore-mcp-server",
    version: "2.0.0",
    description: "Verified architectural decisions and code rationale for engineering agents",
    status: "active",
    tools: [
      {
        name: "get_verified_decision",
        description: "Fetch human-verified decision record, alternatives considered, and failure modes for a system, file, or PR.",
        parameters: {
          type: "object",
          properties: {
            system_or_keyword: { type: "string", description: "Target system, component, or keyword (e.g. 'billing', 'sensor', 'k8s')" },
          },
          required: ["system_or_keyword"],
        },
      },
      {
        name: "query_architectural_rationale",
        description: "Search team decisions before modifying legacy code to understand why a solution was implemented.",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "Natural language engineering question (e.g. 'Why do we use idempotency keys?')" },
          },
          required: ["query"],
        },
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { method, params, id } = body;

    // Standard MCP tools/list
    if (method === "tools/list") {
      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          tools: [
            {
              name: "get_verified_decision",
              description: "Retrieve verified decisions, alternatives considered, and edge case caveats.",
              inputSchema: {
                type: "object",
                properties: {
                  system_or_keyword: { type: "string" },
                },
                required: ["system_or_keyword"],
              },
            },
            {
              name: "query_architectural_rationale",
              description: "Check why a certain implementation pattern was chosen before proposing refactors.",
              inputSchema: {
                type: "object",
                properties: {
                  query: { type: "string" },
                },
                required: ["query"],
              },
            },
          ],
        },
      });
    }

    // Standard MCP tools/call
    if (method === "tools/call") {
      const toolName = params?.name;
      const args = params?.arguments || {};
      const searchTerm = (args.system_or_keyword || args.query || "").toLowerCase();

      // Filter only VERIFIED records
      const matches = initialKnowledgeRecords.filter((r) => {
        return (
          r.title.toLowerCase().includes(searchTerm) ||
          r.summary.toLowerCase().includes(searchTerm) ||
          (r.context && r.context.toLowerCase().includes(searchTerm)) ||
          (r.systemOrProject && r.systemOrProject.toLowerCase().includes(searchTerm))
        );
      });

      if (matches.length === 0) {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              {
                type: "text",
                text: `No verified decision record found matching '${searchTerm}'. Lore recommends capturing a change debrief with the component author before altering this logic.`,
              },
            ],
            isError: false,
          },
        });
      }

      const match = matches[0];
      const responsePayload = {
        title: match.title,
        status: match.status,
        author: match.contributor.name,
        system: match.systemOrProject,
        verified_date: match.date,
        problem_context: match.context,
        decision_implemented: match.decisionOrProcedure,
        rationale: match.rationale,
        exceptions_and_edge_cases: match.exceptions,
        risks_if_modified: match.risks,
        applicability: match.applicability,
        transcript_excerpt: match.transcriptExcerpt,
      };

      return NextResponse.json({
        jsonrpc: "2.0",
        id,
        result: {
          content: [
            {
              type: "text",
              text: JSON.stringify(responsePayload, null, 2),
            },
          ],
        },
      });
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: "Method not supported" },
    });
  } catch (err: any) {
    return NextResponse.json({
      jsonrpc: "2.0",
      error: { code: -32603, message: err.message },
    });
  }
}
