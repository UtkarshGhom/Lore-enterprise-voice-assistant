import { initialKnowledgeRecords, KnowledgeRecord } from "@/lib/data";

export interface GroundedSourceItem {
  id: string;
  citationIndex: number;
  title: string;
  author: string;
  date: string;
  duration?: string;
  type: string;
  status: "verified" | "review_due" | "draft";
  system: string;
  excerpt: string;
}

export interface GroundedAnswerResult {
  text: string;
  spokenSummary: string;
  evidenceStatus: "grounded" | "no_evidence" | "guardrail";
  matchedRecord?: KnowledgeRecord;
  sources?: GroundedSourceItem[];
  applicability?: {
    system: string;
    environment: string;
    freshness: string;
  };
  suggestedFollowUps: string[];
  closestMatches?: {
    title: string;
    sme: string;
    system: string;
  }[];
}

/**
 * Curated Voice Knowledge Engine
 * Matches voice/text engineering questions against the verified decision records in Lore.
 * Formats grounded answers with citations, rejected alternatives, failure modes, and TTS-friendly speech summary.
 */
export function queryCuratedKnowledge(rawQuery: string): GroundedAnswerResult {
  // Sanitize user input: remove accidental quotes, double quotes, or excessive whitespace
  const sanitizedQuery = (rawQuery || "")
    .replace(/^["'“”\s]+|["'“”\s]+$/g, "")
    .replace(/""/g, '"')
    .trim();
  const query = sanitizedQuery.toLowerCase();

  // 1. Zero-Knowledge Enterprise Security Guardrail
  if (
    query.includes("password") ||
    query.includes("secret") ||
    query.includes("credential") ||
    query.includes("private key") ||
    query.includes("vault token")
  ) {
    return {
      text: "I do not have access to passwords, API secrets, or private credentials. Lore operates with zero-knowledge enterprise boundaries to prevent secret leakage.\n\nTo request access, please follow the Vault Access SOP or consult your security team.",
      spokenSummary: "I do not have access to passwords or private credentials. Lore operates with zero-knowledge enterprise boundaries.",
      evidenceStatus: "guardrail",
      suggestedFollowUps: [
        "View Vault Access Policy",
        "Who is the on-call security officer?",
      ],
    };
  }

  // 2. Score query against each verified knowledge record
  const scoredRecords = initialKnowledgeRecords.map((record) => {
    let score = 0;
    const queryTokens = query.split(/\s+/).filter((t) => t.length > 2);

    const recordSearchCorpus = [
      record.title,
      record.summary,
      record.systemOrProject || "",
      record.context || "",
      record.decisionOrProcedure || "",
      record.rationale || "",
      ...(record.alternativesConsidered || []),
      ...(record.exceptions || []),
      ...(record.risks || []),
      ...(record.keyInsights || []),
      ...(record.invalidationTriggers || []),
    ]
      .join(" ")
      .toLowerCase();

    // High-signal architectural keywords
    if (record.id === "rec-2") {
      // Billing / Idempotency
      if (query.includes("billing") || query.includes("payment") || query.includes("stripe")) score += 6;
      if (query.includes("idempotenc") || query.includes("uuid") || query.includes("retry") || query.includes("duplicate")) score += 7;
    } else if (record.id === "rec-1") {
      // Sensor Calibration / Thermal Drift
      if (query.includes("sensor") || query.includes("drift") || query.includes("calibrat")) score += 6;
      if (query.includes("temperature") || query.includes("thermal") || query.includes("polynomial") || query.includes("peltier") || query.includes("bno085")) score += 7;
    } else if (record.id === "rec-3") {
      // Deployment / Canary / Rollback
      if (query.includes("deploy") || query.includes("production") || query.includes("rollout") || query.includes("release")) score += 6;
      if (query.includes("canary") || query.includes("rollback") || query.includes("argo") || query.includes("prestop") || query.includes("sigterm") || query.includes("downtime")) score += 7;
    } else if (record.id === "rec-4") {
      // GaN Motor Controllers
      if (query.includes("motor") || query.includes("controller") || query.includes("robot") || query.includes("arm")) score += 6;
      if (query.includes("gan") || query.includes("mosfet") || query.includes("heatsink") || query.includes("hospital") || query.includes("thermal") || query.includes("switching")) score += 7;
    } else if (record.id === "rec-5") {
      // Hardware Diagnostics / Gearbox Lubrication
      if (query.includes("diagnostic") || query.includes("troubleshoot") || query.includes("field") || query.includes("technician")) score += 6;
      if (query.includes("gearbox") || query.includes("grind") || query.includes("grease") || query.includes("lubricat") || query.includes("harmonic") || query.includes("acoustic")) score += 7;
    }

    // Token overlap
    for (const token of queryTokens) {
      if (recordSearchCorpus.includes(token)) {
        score += 2;
      }
    }

    return { record, score };
  });

  // Sort by highest score
  scoredRecords.sort((a, b) => b.score - a.score);
  const bestMatch = scoredRecords[0];

  // 3. Honest Abstention if no confident match
  if (!bestMatch || bestMatch.score < 4) {
    return {
      text: "I could not find approved evidence in our verified engineering decisions for this question.\n\nLore only answers from verified PR debriefs and architect-signed decision records rather than guessing or hallucinating.",
      spokenSummary: "I could not find approved evidence in our verified engineering records for this question. Here are the closest topics in our engineering library.",
      evidenceStatus: "no_evidence",
      closestMatches: [
        {
          title: "Billing Idempotency Keys Architecture",
          sme: "Ananya Kulkarni (Backend Lead)",
          system: "Core Billing & Stripe Gateway",
        },
        {
          title: "Sensor Calibration Procedure & Drift Mitigation",
          sme: "Rohit Sharma (Hardware Lead)",
          system: "Industrial Robotics Field Units (Gen-4)",
        },
        {
          title: "Production Deployment Zero-Downtime Guide",
          sme: "Karan Mehta (DevOps Engineer)",
          system: "Kubernetes ArgoCD Infrastructure",
        },
      ],
      suggestedFollowUps: [
        "Why do we use idempotency keys in billing?",
        "Why polynomial temperature calibration for sensors?",
        "How does zero-downtime canary rollback work?",
      ],
    };
  }

  // 4. Grounded Response Synthesis from the matched record
  const rec = bestMatch.record;
  const cleanExcerpt = (rec.transcriptExcerpt || rec.summary || "").replace(/^["'“”\s]+|["'“”\s]+$/g, "");

  const sources: GroundedSourceItem[] = [
    {
      id: rec.id,
      citationIndex: 1,
      title: `${rec.linkedPR || "Decision Record"}: ${rec.title}`,
      author: `${rec.contributor.name} (${rec.contributor.role})`,
      date: rec.date,
      duration: rec.audioDuration,
      type: "PR Debrief / Decision Record",
      status: rec.status,
      system: rec.systemOrProject || "Core Engineering",
      excerpt: cleanExcerpt,
    },
  ];

  // Clean strings of unescaped quotes or stray symbols
  const decisionClean = (rec.decisionOrProcedure || "").replace(/""/g, '"').trim();
  const rationaleClean = (rec.rationale || "").replace(/""/g, '"').trim();

  // Build structured conversational text with citations
  let answerText = `**${decisionClean}** [1]\n\n`;
  answerText += `**Context & Rationale:** ${rationaleClean} [1]\n\n`;

  if (rec.alternativesConsidered && rec.alternativesConsidered.length > 0) {
    answerText += `**Alternatives Evaluated:**\n`;
    rec.alternativesConsidered.forEach((alt) => {
      const cleanAlt = alt.replace(/""/g, '"').trim();
      answerText += `• ${cleanAlt}\n`;
    });
    answerText += `\n`;
  }

  if (rec.risks && rec.risks.length > 0) {
    const cleanRisks = rec.risks.map((r) => r.replace(/""/g, '"').trim()).join(" ");
    answerText += `**Caveats & Operational Risks:** ${cleanRisks}\n\n`;
  }

  if (rec.invalidationTriggers && rec.invalidationTriggers.length > 0) {
    const cleanTriggers = rec.invalidationTriggers.map((t) => t.replace(/""/g, '"').trim()).join(" ");
    answerText += `**Invalidation Trigger:** ${cleanTriggers}`;
  }

  // Build clean spoken summary for Text-to-Speech (free of asterisks, brackets, or code backticks)
  const spokenSummary = `According to ${rec.contributor.name}, ${decisionClean}. Rationale: ${rationaleClean}`
    .replace(/\*\*/g, "")
    .replace(/\[\d+\]/g, "")
    .replace(/[`"“”]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const suggestedFollowUps = [
    `Show alternatives considered for ${rec.title}`,
    `Who can approve changes to ${rec.systemOrProject || "this service"}?`,
    `What are the failure modes if this logic is modified?`,
  ];

  return {
    text: answerText,
    spokenSummary,
    evidenceStatus: "grounded",
    matchedRecord: rec,
    sources,
    applicability: {
      system: rec.systemOrProject || "Core Engineering",
      environment: "production",
      freshness: `Verified on ${rec.date} · ${rec.linkedPR || "ADR"}`,
    },
    suggestedFollowUps,
  };
}
