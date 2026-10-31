import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub Pull Request Webhook Handler (Free & Local)
 * Listens for merged PRs, checks for architectural rationale gaps,
 * and triggers an opt-in debrief invitation for the author.
 */

export interface GitHubWebhookPayload {
  action: "closed" | "opened" | "synchronize";
  pull_request?: {
    number: number;
    title: string;
    body: string;
    merged: boolean;
    user: {
      login: string;
      avatar_url: string;
    };
    head: {
      ref: string;
    };
    base: {
      ref: string;
    };
    changed_files: number;
    additions: number;
    deletions: number;
  };
  repository?: {
    full_name: string;
    html_url: string;
  };
}

export async function POST(req: NextRequest) {
  try {
    const payload: GitHubWebhookPayload = await req.json();

    // Check if the PR was actually merged
    if (payload.action === "closed" && payload.pull_request?.merged) {
      const pr = payload.pull_request;
      const repo = payload.repository?.full_name || "unknown/repo";

      // Gap Check Rule Set (from Strategy v2.0 Section 4-H2):
      // A PR requires an architectural debrief if:
      // 1. Changes exceed 100 lines (or touches critical services)
      // 2. PR description is brief or lacks rationale sections
      const hasDetailedDoc = pr.body && pr.body.toLowerCase().includes("rationale") && pr.body.toLowerCase().includes("alternatives");
      const isHighImpact = pr.changed_files > 3 || (pr.additions + pr.deletions) > 80;

      const needsDebrief = isHighImpact && !hasDetailedDoc;

      return NextResponse.json({
        status: "processed",
        pr_number: pr.number,
        title: pr.title,
        author: pr.user.login,
        gap_detected: needsDebrief,
        debrief_recommendation: needsDebrief ? {
          priority: "high",
          reason: "High-impact changes merged without documented alternatives or invalidation criteria.",
          suggested_prompts: [
            "Why was this approach chosen over standard framework defaults?",
            "What alternatives were evaluated and rejected?",
            "What are the failure modes or conditions where this advice breaks?"
          ]
        } : {
          priority: "low",
          reason: "Sufficient rationale detected in PR description or low-impact change."
        }
      });
    }

    return NextResponse.json({
      status: "ignored",
      reason: "Webhook was not a merged PR event."
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: "/api/github/webhook",
    status: "active",
    supported_events: ["pull_request.closed"],
    description: "Lore automated PR change debrief trigger engine"
  });
}
