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
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface SourceItem {
  id: string;
  title: string;
  author: string;
  date: string;
  duration: string;
  type: string;
  status: string;
  excerpt: string;
}

interface Message {
  id: string;
  sender: "user" | "lore";
  text: string;
  timestamp: string;
  sources?: SourceItem[];
  suggestedFollowUps?: string[];
  evidenceStatus?: "grounded" | "insufficient_evidence" | "conflicting";
}

interface AskLoreViewProps {
  initialQuery?: string;
  records: KnowledgeRecord[];
  onOpenRecord: (record: KnowledgeRecord) => void;
}

export default function AskLoreView({
  initialQuery = "",
  records,
  onOpenRecord,
}: AskLoreViewProps) {
  const [input, setInput] = useState(initialQuery);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedSourceDrawer, setSelectedSourceDrawer] = useState<SourceItem | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "user",
      text: initialQuery || "Why did we change the sensor calibration procedure?",
      timestamp: "10:42 AM",
    },
    {
      id: "m-2",
      sender: "lore",
      text: "The sensor calibration procedure was changed because the previous method resulted in drift under high temperature conditions, especially in outdoor deployments. The earlier single-point calibration did not account for thermal variation, which led to inconsistent readings.\n\nThe new procedure uses a multi-point calibration with temperature compensation, which significantly improves accuracy and reduces drift.",
      timestamp: "10:42 AM",
      evidenceStatus: "grounded",
      sources: [
        {
          id: "rec-1",
          title: "Sensor Calibration Procedure",
          author: "Hardware Team",
          date: "Oct 12, 2026",
          duration: "04:32",
          type: "Interview",
          status: "Verified",
          excerpt: "Field sensors showed consistent drift exceeding +/- 4% when operating in outdoor environments with ambient temps > 35°C. Single-point zeroing failed to account for thermal expansion and ADC voltage reference drift.",
        },
        {
          id: "rec-2",
          title: "Field Deployment Insights",
          author: "Rohit Sharma",
          date: "Sep 28, 2026",
          duration: "02:15",
          type: "Interview",
          status: "Verified",
          excerpt: "Temperature compensation is critical for outdoor deployments. The new multi-point calibration improves accuracy by ~32% in outdoor field trials.",
        },
      ],
      suggestedFollowUps: [
        "Summarize key steps",
        "What were the alternatives?",
        "Show related discussions",
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

    // Simulate intelligent grounded response
    setTimeout(() => {
      let loreMsg: Message;
      const lower = q.toLowerCase();

      if (lower.includes("password") || lower.includes("secret") || lower.includes("credential")) {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: "I do not have access to passwords, API credentials, or root keys. Lore is strictly configured with zero-knowledge governance to protect organizational security.\n\nTo request credentials, please consult your 1Password vault administrator or follow the official Vault Access SOP.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "insufficient_evidence",
          suggestedFollowUps: [
            "View Vault Access Policy",
            "Who is the security officer on call?",
          ],
        };
      } else if (lower.includes("billing") || lower.includes("idempotency") || lower.includes("retry")) {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: "We moved to deterministic idempotency keys in the billing service because network timeouts between client checkouts and Stripe were causing duplicate payment charges.\n\nWithout a persistent idempotency header, any user-initiated retry was processed as a second transaction. The new implementation enforces a deterministic UUIDv5 based on `user_id`, `order_id`, and `attempt_window`.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "grounded",
          sources: [
            {
              id: "rec-2",
              title: "Billing Architecture Decision",
              author: "Ananya Kulkarni",
              date: "Oct 15, 2026",
              duration: "05:12",
              type: "Interview",
              status: "Verified",
              excerpt: "Duplicate payments dropped to zero following deployment of deterministic keys. Idempotency keys must be persisted before outbound network calls, not after.",
            },
          ],
          suggestedFollowUps: [
            "How does exponential backoff work?",
            "What happens if the client re-generates the key?",
          ],
        };
      } else if (lower.includes("rollback") || lower.includes("deployment")) {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: "The emergency rollback procedure mandates running `argo app rollback billing-service` directly rather than manually editing kubernetes deployment yamls.\n\nDuring canary rollouts, automated rollback triggers if the error budget consumption exceeds 0.5% in 3 minutes.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "grounded",
          sources: [
            {
              id: "rec-3",
              title: "Production Deployment Guide",
              author: "Karan Mehta",
              date: "Oct 12, 2026",
              duration: "06:45",
              type: "Interview",
              status: "Review due",
              excerpt: "Always inspect ArgoCD sync status and check Datadog APM 5xx error rate for 5 minutes during canary 10% rollout.",
            },
          ],
          suggestedFollowUps: [
            "What is the preStop hook configuration?",
            "Who is alerted on canary failure?",
          ],
        };
      } else {
        loreMsg = {
          id: `l-${Date.now()}`,
          sender: "lore",
          text: `Based on verified organizational memory, here is what is captured regarding: "${q}".\n\nThe documented guidelines emphasize standard operating safety and adherence to field-verified protocols. If you need deeper specifics, you can schedule an interview session with the relevant system expert.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          evidenceStatus: "grounded",
          sources: [
            {
              id: "rec-1",
              title: "Sensor Calibration Procedure",
              author: "Hardware Team",
              date: "Oct 12, 2026",
              duration: "04:32",
              type: "Interview",
              status: "Verified",
              excerpt: "Field sensors showed consistent drift exceeding +/- 4% when operating in outdoor environments with ambient temps > 35°C.",
            },
          ],
          suggestedFollowUps: [
            "Schedule capture session with expert",
            "Flag as knowledge gap",
          ],
        };
      }

      setMessages((prev) => [...prev, loreMsg]);
    }, 600);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Left Chat Area */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto p-6 sm:p-8 bg-[#F7F9F6]">
        {/* Messages Stream */}
        <div className="space-y-6 max-w-3xl mx-auto w-full pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-3">
              {/* User Message */}
              {msg.sender === "user" ? (
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-[#EBF2EC] text-[#162D1F] px-4 py-3 rounded-2xl rounded-tr-xs max-w-lg text-sm font-medium border border-[#D5E4D8] shadow-2xs">
                    {msg.text}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#224332] text-white flex items-center justify-center font-serif text-xs font-semibold shrink-0">
                    U
                  </div>
                </div>
              ) : (
                /* Lore Response */
                <div className="flex items-start gap-3.5">
                  {/* Lore Emblem */}
                  <div className="w-8 h-8 rounded-xl bg-[#E6EFE8] text-[#1F3E2B] flex items-center justify-center shrink-0 border border-[#D1DDD3]">
                    <Sparkles className="w-4 h-4 text-[#2E5B42]" />
                  </div>

                  <div className="flex-1 space-y-4">
                    {/* Header with Lore name */}
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#1B3629]">Lore</span>
                      <span className="text-[11px] text-[#82998B]">{msg.timestamp}</span>
                      {msg.evidenceStatus === "grounded" && (
                        <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-full font-semibold border border-[#C5E9D3] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Grounded in verified memory
                        </span>
                      )}
                      {msg.evidenceStatus === "insufficient_evidence" && (
                        <span className="text-[10px] bg-[#FEF2F2] text-[#B91C1C] px-2 py-0.5 rounded-full font-semibold border border-[#FECACA] flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> Guardrail Triggered
                        </span>
                      )}
                    </div>

                    {/* Answer text */}
                    <div className="text-sm text-[#1E2E24] leading-relaxed whitespace-pre-line bg-white p-5 rounded-2xl border border-[#E2E9E3] shadow-card">
                      {msg.text}

                      {/* Sources Cards Carousel if available */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-[#EEF3EF]">
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-xs font-semibold text-[#5A7364] uppercase tracking-wider">
                              Sources
                            </span>
                            <span className="text-xs text-[#315E44] font-medium cursor-pointer hover:underline">
                              {msg.sources.length} sources →
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.sources.map((src) => (
                              <div
                                key={src.id}
                                onClick={() => setSelectedSourceDrawer(src)}
                                className="p-3 rounded-xl bg-[#F8FAF8] border border-[#DEE7E0] hover:border-[#BFCFBF] hover:bg-white transition-all cursor-pointer group"
                              >
                                <h5 className="font-semibold text-xs text-[#18261E] group-hover:text-[#224332] truncate">
                                  {src.title}
                                </h5>
                                <p className="text-[11px] text-[#697F72] mt-0.5">
                                  {src.author} · {src.date}
                                </p>

                                <div className="mt-2.5 flex items-center gap-2">
                                  <span className="text-[10px] bg-white px-2 py-0.5 rounded-md font-mono text-[#4F6A5B] border border-[#D5E1D8] flex items-center gap-1">
                                    <Volume2 className="w-3 h-3 text-[#2E5840]" />
                                    {src.duration} {src.type}
                                  </span>
                                  <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-md font-semibold border border-[#C5E9D3]">
                                    ✓ {src.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action buttons matching Image 1 */}
                      {msg.suggestedFollowUps && (
                        <div className="mt-4 pt-3 flex flex-wrap gap-2">
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
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Input Area */}
        <div className="max-w-3xl mx-auto w-full pt-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="bg-white rounded-2xl border border-[#D3DDD5] p-2 flex items-center gap-2 shadow-card focus-within:border-[#224332] focus-within:ring-2 focus-within:ring-[#224332]/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a follow-up question..."
              className="flex-1 bg-transparent px-3 py-1.5 text-sm text-[#18261E] placeholder-[#7F9789] focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setIsSpeaking(!isSpeaking)}
              className={`p-2 rounded-xl transition-colors ${
                isSpeaking
                  ? "bg-[#DC2626] text-white animate-pulse"
                  : "hover:bg-[#F2F6F3] text-[#556F60]"
              }`}
              title="Voice Input"
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
          <div className="text-center mt-2">
            <span className="text-[11px] text-[#7E9688]">
              Lore retrieves only verified organizational memory. Citations link to original transcripts.
            </span>
          </div>
        </div>
      </div>

      {/* Right Sidebar: Related Topics & Suggested Questions (Image 1 Screen 2) */}
      <aside className="w-80 border-l border-[#E5ECE6] bg-[#FAFBF9] p-6 hidden lg:block overflow-y-auto space-y-6">
        {/* Related Topics */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAE3] shadow-2xs">
          <h4 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider mb-3">
            Related Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              "Sensor Drift",
              "Temperature Compensation",
              "Field Deployment",
              "Calibration Tools",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => handleSend(`Tell me more about ${topic}`)}
                className="text-xs bg-[#F2F6F3] hover:bg-[#E5EEE8] text-[#284E37] px-3 py-1.5 rounded-xl border border-[#D5E1D7] transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2EAE3] shadow-2xs">
          <h4 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider mb-3">
            Suggested Questions
          </h4>
          <div className="space-y-2.5">
            {[
              "How do we perform the new calibration?",
              "What are the common mistakes?",
              "How often should we recalibrate?",
              "Which sensors are affected?",
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

        {/* Zero-Hallucination Trust Guarantee */}
        <div className="p-4 rounded-2xl bg-[#EAF2ED] border border-[#CFE0D3] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1F3E2B]">
            <CheckCircle2 className="w-4 h-4 text-[#2E7D52]" />
            Traceable Provenance
          </div>
          <p className="text-[11px] text-[#4E6B59] leading-relaxed">
            Every statement has a verifiable audio citation. Uncaptured questions are admitted as unknowns rather than fabricated.
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
              <h3 className="font-serif text-xl font-bold text-[#18261E]">
                {selectedSourceDrawer.title}
              </h3>
              <p className="text-xs text-[#6B8073] mt-1">
                Contributed by {selectedSourceDrawer.author} · {selectedSourceDrawer.date}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F4F7F4] border border-[#DEE7E0] space-y-2">
              <span className="text-[10px] font-semibold text-[#406550] uppercase tracking-wider flex items-center gap-1">
                <Volume2 className="w-3 h-3" /> Audio Transcript Excerpt
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
                  <span>Interview Recording ({selectedSourceDrawer.duration})</span>
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
