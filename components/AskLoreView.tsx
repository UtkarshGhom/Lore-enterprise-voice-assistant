"use client";

import React, { useState } from "react";
import {
  Mic,
  Send,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Volume2,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Info,
  HelpCircle,
  FileText,
  GitCommit,
  User,
  AlertTriangle,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface SourceItem {
  id: string;
  citationIndex: number;
  title: string;
  author: string;
  date: string;
  duration?: string;
  type: string;
  status: "verified" | "review_due" | "stale" | "conflicting";
  system: string;
  excerpt: string;
}

interface Message {
  id: string;
  sender: "user" | "lore";
  text: string;
  timestamp: string;
  sources?: SourceItem[];
  applicability?: {
    system: string;
    environment: string;
    freshness: string;
  };
  suggestedFollowUps?: string[];
  evidenceStatus?: "grounded" | "no_evidence" | "guardrail";
  closestMatches?: {
    title: string;
    sme: string;
    system: string;
  }[];
}

interface AskLoreViewProps {
  initialQuery?: string;
  records: KnowledgeRecord[];
  onOpenRecord: (record: KnowledgeRecord) => void;
  onStartCapture?: () => void;
}

export default function AskLoreView({
  initialQuery = "",
  records,
  onOpenRecord,
  onStartCapture,
}: AskLoreViewProps) {
  const [input, setInput] = useState(initialQuery);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedSourceDrawer, setSelectedSourceDrawer] = useState<SourceItem | null>(null);
  const [hoveredCitation, setHoveredCitation] = useState<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "user",
      text: initialQuery || "Why did we choose deterministic idempotency keys for billing retries?",
      timestamp: "10:42 AM",
    },
    {
      id: "m-2",
      sender: "lore",
      text: "We implemented deterministic UUIDv5 idempotency keys in the checkout and subscription services [1] because transient network timeouts between client checkouts and Stripe were triggering duplicate payment authorizations.\n\nWithout a persisted idempotency header prior to outbound socket transmission, any automatic client retry was evaluated as an independent transaction [2]. The architecture now enforces idempotency keys generated from `user_id + order_id + attempt_window` with a 24-hour Redis TTL cache.",
      timestamp: "10:42 AM",
      evidenceStatus: "grounded",
      applicability: {
        system: "billing-service (v2.4)",
        environment: "production",
        freshness: "Verified 16 days ago · ADR 019",
      },
      sources: [
        {
          id: "rec-2",
          citationIndex: 1,
          title: "PR #142: Billing Architecture & Idempotency Key Migration",
          author: "Ananya Kulkarni (Backend Lead)",
          date: "Oct 15, 2026",
          duration: "05:12",
          type: "PR Debrief",
          status: "verified",
          system: "billing-service",
          excerpt: "Duplicate payments dropped to zero following deployment of deterministic UUIDv5 keys. The key must be written to Redis before outbound network transmission, not after response arrival.",
        },
        {
          id: "rec-1",
          citationIndex: 2,
          title: "Stripe Timeout Postmortem & Failure Modes",
          author: "Core Platform Team",
          date: "Sep 28, 2026",
          duration: "03:40",
          type: "Incident Debrief",
          status: "verified",
          system: "payment-gateway",
          excerpt: "Client-generated random UUIDs caused re-submitted checkout forms to generate new idempotency tokens, completely defeating Stripe server-side deduplication.",
        },
      ],
      suggestedFollowUps: [
        "What happens if Redis TTL expires during an in-flight retry?",
        "Show related ADR 019 diff",
        "Who can approve changes to billing idempotency rules?",
      ],
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Realistic grounded intelligence engine with Honest No-Answer State
    setTimeout(() => {
      let loreMsg: Message;
      const lower = q.toLowerCase();

      if (lower.includes("password") || lower.includes("secret") || lower.includes("credential") || lower.includes("key")) {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: "I do not have access to passwords, API secrets, or private keys. Lore operates with zero-knowledge enterprise boundaries to prevent credential leakage.\n\nTo request access, please follow the Vault Access SOP or consult your security team.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "guardrail",
          suggestedFollowUps: [
            "View Vault Access Policy",
            "Who is the on-call security officer?",
          ],
        };
      } else if (
        lower.includes("unknown") ||
        lower.includes("blockchain") ||
        lower.includes("quantum") ||
        lower.includes("unverified") ||
        lower.includes("rumor")
      ) {
        // Signature Honest No-Answer State (Polish Guide Section 5.3 & 9)
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: "I could not find approved evidence for this. Here is what is closest in our verified engineering history:",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "no_evidence",
          closestMatches: [
            {
              title: "Distributed Consensus & Raft Failover in Sensor Mesh",
              sme: "Priya Desai (Robotics Systems)",
              system: "robotics-telemetry",
            },
            {
              title: "Postgres Read Replica Synchronization Delay",
              sme: "Ananya Kulkarni (Backend Lead)",
              system: "core-database",
            },
          ],
          suggestedFollowUps: [
            "Ask Priya Desai (Topic SME)",
            "Start a 3-minute capture to record this",
            "Flag as high-priority knowledge gap",
          ],
        };
      } else if (lower.includes("rollback") || lower.includes("deployment") || lower.includes("canary")) {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: "Our emergency rollback policy dictates triggering `argo app rollback billing-service` directly instead of manually editing deployment YAMLs [1].\n\nDuring canary rollouts, automated rollback triggers automatically if error budget burn rate exceeds 0.5% over any 3-minute rolling window [2].",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "grounded",
          applicability: {
            system: "argo-cd-canary-pipeline",
            environment: "production-us-east-1",
            freshness: "Verified Oct 12, 2026 · Runbook v3.1",
          },
          sources: [
            {
              id: "rec-3",
              citationIndex: 1,
              title: "Production Deployment & Rollback Runbook",
              author: "Karan Mehta (DevOps Engineer)",
              date: "Oct 12, 2026",
              duration: "06:45",
              type: "Runbook Debrief",
              status: "review_due",
              system: "infrastructure/cd",
              excerpt: "Always inspect Datadog APM 5xx error rate for 5 continuous minutes at 10% canary weight before promoting traffic to 100%.",
            },
            {
              id: "rec-4",
              citationIndex: 2,
              title: "Service Level Objectives & Error Budget Automation",
              author: "Elena Rostova (VP Eng)",
              date: "Sep 14, 2026",
              type: "Architecture Standard",
              status: "verified",
              system: "monitoring",
              excerpt: "Canary rollback must be autonomous and un-gated by human Slack approval when error thresholds trip.",
            },
          ],
          suggestedFollowUps: [
            "What is the preStop hook timeout for in-flight requests?",
            "Who receives automated PagerDuty canary alerts?",
          ],
        };
      } else {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: `Based on verified organizational memory, here is the rationale regarding "${q}" [1]:\n\nOur platform guidelines require explicit verification before deployment to protect zero-downtime availability. Decisions are documented with alternatives considered and conditions that invalidate the choice.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "grounded",
          applicability: {
            system: "northstar-core-architecture",
            environment: "all-environments",
            freshness: "Active & Verified",
          },
          sources: [
            {
              id: "rec-1",
              citationIndex: 1,
              title: "Core Architectural Tenets & Invalidation Rules",
              author: "Alex Chen (Lead Architect)",
              date: "Oct 18, 2026",
              duration: "04:32",
              type: "Architecture Debrief",
              status: "verified",
              system: "core-platform",
              excerpt: "Every architectural choice must list at least 2 rejected alternatives and a clear invalidation trigger.",
            },
          ],
          suggestedFollowUps: [
            "What alternatives were rejected?",
            "Show decision invalidation conditions",
            "Ask Alex Chen for clarification",
          ],
        };
      }

      setMessages((prev) => [...prev, loreMsg]);
    }, 550);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Chat & Answer Stream Area */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6 sm:p-8 bg-[#F7F9F6]">
        {/* Messages Stream */}
        <div className="space-y-6 max-w-3xl mx-auto w-full pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {/* User Query Message */}
              {msg.sender === "user" ? (
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-[#EBF2EC] text-[#162D1F] px-4 py-3 rounded-2xl rounded-tr-xs max-w-lg text-sm font-medium border border-[#D5E4D8] shadow-2xs">
                    {msg.text}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#224332] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0 shadow-inner">
                    U
                  </div>
                </div>
              ) : (
                /* Lore Response Card - Signature Polish Guide Section 5.3 */
                <div className="flex items-start gap-3.5">
                  {/* Lore Botanical Emblem */}
                  <div className="w-8 h-8 rounded-xl bg-[#E6EFE8] text-[#1F3E2B] flex items-center justify-center shrink-0 border border-[#D1DDD3]">
                    <Sparkles className="w-4 h-4 text-[#2E5B42]" />
                  </div>

                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Header info */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-xs text-[#1B3629]">Lore Mentor</span>
                      <span className="text-[11px] text-[#82998B]">{msg.timestamp}</span>

                      {/* Status Badges */}
                      {msg.evidenceStatus === "grounded" && (
                        <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-full font-semibold border border-[#C5E9D3] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#1E7445]" />
                          <span>Verified Evidence</span>
                        </span>
                      )}

                      {msg.evidenceStatus === "no_evidence" && (
                        <span className="text-[10px] bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 rounded-full font-semibold border border-[#FDE68A] flex items-center gap-1">
                          <HelpCircle className="w-3 h-3 text-[#B45309]" />
                          <span>Honest Abstention</span>
                        </span>
                      )}

                      {msg.evidenceStatus === "guardrail" && (
                        <span className="text-[10px] bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-full font-semibold border border-[#FECACA] flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-[#DC2626]" />
                          <span>Security Guardrail</span>
                        </span>
                      )}
                    </div>

                    {/* Answer Card Body */}
                    {msg.evidenceStatus === "no_evidence" ? (
                      /* Signature Honest No-Answer State (Polish Guide Section 5.3 & 9) */
                      <div className="bg-white rounded-2xl border border-[#E4ECE5] p-6 shadow-card space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[#F0F5F1] text-[#244533] flex items-center justify-center shrink-0 border border-[#DCE6DE]">
                            <HelpCircle className="w-5 h-5 text-[#326447]" />
                          </div>
                          <div>
                            <h4 className="font-serif text-base font-semibold text-[#18261E]">
                              I could not find approved evidence for this.
                            </h4>
                            <p className="text-xs text-[#627D6E] mt-0.5">
                              Here is what is closest in verified team records:
                            </p>
                          </div>
                        </div>

                        {/* Closest Matches */}
                        {msg.closestMatches && (
                          <div className="space-y-2 pt-1">
                            {msg.closestMatches.map((m, idx) => (
                              <div
                                key={idx}
                                className="p-3 rounded-xl bg-[#F9FAF9] border border-[#E2EBE4] flex items-center justify-between"
                              >
                                <div>
                                  <div className="text-xs font-semibold text-[#18261E]">
                                    {m.title}
                                  </div>
                                  <div className="text-[10px] text-[#6E8879]">
                                    Owner: {m.sme} · System: {m.system}
                                  </div>
                                </div>
                                <span className="text-[10px] text-[#244833] font-semibold bg-white border border-[#D2E0D6] px-2 py-0.5 rounded-md">
                                  Related
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Direct Human Escalation Action */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <button
                            onClick={onStartCapture}
                            className="px-4 py-2 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>Capture this knowledge with SME</span>
                          </button>

                          <button
                            onClick={() => handleSend("Flag as knowledge gap for engineering leadership")}
                            className="px-3.5 py-2 rounded-xl bg-[#F2F6F3] hover:bg-[#E6EFE8] text-xs font-semibold text-[#294B37] border border-[#D5E1D8] transition-colors"
                          >
                            Add to Knowledge Gaps Queue
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Grounded Answer Card with Citations, Applicability & Source Rail */
                      <div className="bg-white rounded-2xl border border-[#E2E9E3] p-6 shadow-card space-y-4">
                        {/* 1. Body text: 16px, max 70ch line width for readability (Polish Guide 5.3) */}
                        <div className="text-[15px] sm:text-base text-[#1E2E24] leading-relaxed max-w-[70ch] whitespace-pre-line font-normal">
                          {msg.text}
                        </div>

                        {/* 2. Applicability line: system, environment, freshness */}
                        {msg.applicability && (
                          <div className="flex items-center gap-2 text-[11px] text-[#698474] pt-2 border-t border-[#F0F4F1] flex-wrap font-mono">
                            <span className="font-semibold text-[#224332]">
                              Applicability:
                            </span>
                            <span>{msg.applicability.system}</span>
                            <span>•</span>
                            <span>{msg.applicability.environment}</span>
                            <span>•</span>
                            <span className="text-[#2C6E48] font-sans font-medium">
                              {msg.applicability.freshness}
                            </span>
                          </div>
                        )}

                        {/* 3. Source rail: verified citation cards */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="pt-3 border-t border-[#F0F4F1] space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#557160] uppercase tracking-wider">
                                Cited Evidence ({msg.sources.length})
                              </span>
                              <span className="text-xs text-[#244833] font-semibold cursor-pointer hover:underline">
                                Inspect full transcripts →
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {msg.sources.map((src) => (
                                <div
                                  key={src.id}
                                  onClick={() => setSelectedSourceDrawer(src)}
                                  className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#DEE7E0] hover:border-[#BED3C3] hover:bg-white transition-all cursor-pointer group shadow-2xs"
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <span className="text-[10px] font-mono font-bold bg-[#E8F0EA] text-[#224332] px-1.5 py-0.5 rounded">
                                      [{src.citationIndex}]
                                    </span>
                                    <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-full font-semibold border border-[#C5E9D3]">
                                      ✓ {src.status}
                                    </span>
                                  </div>

                                  <h5 className="font-semibold text-xs text-[#18261E] group-hover:text-[#224332] line-clamp-1">
                                    {src.title}
                                  </h5>
                                  <p className="text-[11px] text-[#697F72] mt-0.5">
                                    {src.author} · {src.date}
                                  </p>

                                  <p className="text-[11px] text-[#3A5344] mt-2 italic line-clamp-2 bg-white/70 p-2 rounded-lg border border-[#E3ECE5]">
                                    &ldquo;{src.excerpt}&rdquo;
                                  </p>

                                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-[#5A7767]">
                                    <span className="flex items-center gap-1 font-mono">
                                      <GitCommit className="w-3 h-3 text-[#2E5840]" />
                                      {src.system}
                                    </span>
                                    <span className="text-[#204430] font-semibold group-hover:underline">
                                      View transcript →
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggested Follow-Ups */}
                        {msg.suggestedFollowUps && (
                          <div className="pt-2 flex flex-wrap gap-2">
                            {msg.suggestedFollowUps.map((action, i) => (
                              <button
                                key={i}
                                onClick={() => handleSend(action)}
                                className="text-xs font-medium bg-[#F0F5F1] hover:bg-[#E3EDE5] text-[#244833] px-3 py-1.5 rounded-xl border border-[#D3E0D6] transition-colors"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Input Area */}
        <div className="max-w-3xl mx-auto w-full pt-2">
          {isSpeaking && (
            <div className="mb-2 p-2.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#B91C1C] flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                <span>Microphone active — Listening to engineering question...</span>
              </span>
              <button
                onClick={() => setIsSpeaking(false)}
                className="text-[11px] font-semibold underline text-[#991B1B]"
              >
                Stop
              </button>
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="bg-white rounded-2xl border border-[#D3DDD5] p-2 flex items-center gap-2 shadow-card focus-within:border-[#224332] focus-within:ring-2 focus-within:ring-[#224332]/10 transition-all"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask why something works the way it does..."
              className="flex-1 bg-transparent px-3 py-1.5 text-sm text-[#18261E] placeholder-[#7F9789] focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-2 rounded-xl transition-all ${
                isSpeaking
                  ? "bg-[#DC2626] text-white animate-pulse"
                  : "hover:bg-[#F2F6F3] text-[#556F60]"
              }`}
              title="Voice Input (Tap to speak)"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#224332] hover:bg-[#1B3629] disabled:opacity-50 text-white p-2 rounded-xl transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-2 flex items-center justify-center gap-4 text-[11px] text-[#7E9688]">
            <span>Lore cites approved PR debriefs and verified ADR records.</span>
            <span>•</span>
            <span className="hover:text-[#224332] cursor-pointer">Adheres to zero-knowledge governance</span>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Related Topics & Suggested Questions */}
      <aside className="w-80 border-l border-[#E5ECE6] bg-[#FAFBF9] p-6 hidden lg:block overflow-y-auto space-y-6">
        {/* Software Engineering Questions (Polish Fix 11) */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAE3] shadow-2xs">
          <h4 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider mb-3">
            Suggested Rationale Questions
          </h4>
          <div className="space-y-2">
            {[
              "Why did we choose Postgres for billing?",
              "Explain our deployment and canary process",
              "Why do we use idempotency keys in billing?",
              "What is our rollback procedure if canary fails?",
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="w-full text-left text-xs font-medium text-[#294233] hover:text-[#224332] hover:bg-[#F2F6F3] p-2 rounded-xl transition-all flex items-center justify-between group"
              >
                <span>{q}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#738C7D] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Related Systems */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAE3] shadow-2xs">
          <h4 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider mb-3">
            Active Core Systems
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "billing-service",
              "payment-gateway",
              "argo-cd-pipeline",
              "redis-idempotency",
              "postgres-read-replicas",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => handleSend(`Show architectural decisions for ${topic}`)}
                className="text-xs bg-[#F2F6F3] hover:bg-[#E5EEE8] text-[#284E37] px-3 py-1.5 rounded-xl border border-[#D5E1D7] transition-colors font-mono"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Traceable Provenance Card */}
        <div className="p-4 rounded-2xl bg-[#EAF2ED] border border-[#CFE0D3] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F3E2B]">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D52]" />
            Traceable Provenance
          </div>
          <p className="text-[11px] text-[#4E6B59] leading-relaxed">
            Every statement has a verifiable transcript citation. Uncaptured questions are admitted as unknowns rather than fabricated.
          </p>
        </div>
      </aside>

      {/* Slide-out Source Detail Drawer */}
      {selectedSourceDrawer && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-xs z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl overflow-y-auto space-y-5 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2E5840]">
                Original Source Excerpt
              </span>
              <button
                onClick={() => setSelectedSourceDrawer(null)}
                className="text-xs bg-[#EAF1EB] text-[#224332] px-2.5 py-1 rounded-lg font-medium"
              >
                Close ✕
              </button>
            </div>

            <div>
              <div className="text-[10px] font-mono text-[#5A7968] bg-[#EEF4EF] px-2 py-0.5 rounded-md inline-block mb-1.5">
                {selectedSourceDrawer.system}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#18261E]">
                {selectedSourceDrawer.title}
              </h3>
              <p className="text-xs text-[#6B8073] mt-1">
                Contributed by {selectedSourceDrawer.author} · {selectedSourceDrawer.date}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DEE7E0] space-y-2">
              <span className="text-[10px] font-semibold text-[#406550] uppercase tracking-wider flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Audio / PR Debrief Excerpt
              </span>
              <p className="text-xs text-[#203227] italic leading-relaxed">
                &ldquo;{selectedSourceDrawer.excerpt}&rdquo;
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-semibold text-[#18261E]">Audio Evidence</h5>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#D5E1D8]">
                <div className="flex items-center gap-2 text-xs text-[#244532]">
                  <Volume2 className="w-4 h-4 text-[#2E5B42]" />
                  <span>Interview Recording ({selectedSourceDrawer.duration || "04:15"})</span>
                </div>
                <button className="text-xs font-semibold text-[#1E6B42] bg-[#E8F6ED] px-2.5 py-1 rounded-lg">
                  Play Clip
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                const found = records.find((r) => r.id === selectedSourceDrawer.id);
                if (found) onOpenRecord(found);
                setSelectedSourceDrawer(null);
              }}
              className="w-full py-2.5 bg-[#224332] hover:bg-[#1B3629] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors"
            >
              View Full Knowledge Record →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
