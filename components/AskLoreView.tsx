"use client";

import React, { useState, useEffect, useRef } from "react";
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
  VolumeX,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Info,
  HelpCircle,
  FileText,
  GitCommit,
  User,
  AlertTriangle,
  Square,
  Play,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";
import {
  queryCuratedKnowledge,
  GroundedSourceItem,
  GroundedAnswerResult,
} from "@/lib/voiceKnowledgeEngine";

interface Message {
  id: string;
  sender: "user" | "lore";
  text: string;
  spokenSummary?: string;
  timestamp: string;
  sources?: GroundedSourceItem[];
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
  autoStartVoice?: boolean;
  records: KnowledgeRecord[];
  onOpenRecord: (record: KnowledgeRecord) => void;
  onStartCapture?: () => void;
}

/**
 * Parses inline formatting: **bold**, `code`, and [1] citation tags
 */
function parseInlineMarkdown(text: string, onCitationClick?: (index: number) => void): React.ReactNode[] {
  // Matches: **bold text**, `code block`, or [1] citation tags
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[\d+\])/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, i) => {
    if (!part) return null;

    // Bold text: **content**
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldContent = part.slice(2, -2).replace(/""/g, '"');
      return (
        <strong key={i} className="font-semibold text-[#14261B]">
          {boldContent}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      const codeContent = part.slice(1, -1);
      return (
        <code
          key={i}
          className="text-xs font-mono bg-[#EBF2ED] text-[#1E3B29] px-1.5 py-0.5 rounded border border-[#D5E2D8]"
        >
          {codeContent}
        </code>
      );
    }

    // Citation badge: [1]
    const citationMatch = part.match(/^\[(\d+)\]$/);
    if (citationMatch) {
      const citationNum = parseInt(citationMatch[1], 10);
      return (
        <button
          key={i}
          type="button"
          onClick={() => onCitationClick && onCitationClick(citationNum)}
          className="inline-flex items-center justify-center font-mono font-bold text-[10px] bg-[#E8F0EA] hover:bg-[#D4E8DA] text-[#224332] px-1.5 py-0.5 rounded mx-1 border border-[#BED3C3] shadow-2xs transition-colors align-baseline"
          title={`Inspect Citation [${citationNum}]`}
        >
          {citationNum}
        </button>
      );
    }

    // Regular clean text
    const cleanText = part.replace(/""/g, '"');
    return <React.Fragment key={i}>{cleanText}</React.Fragment>;
  });
}

/**
 * Renders paragraphs, bullet lists, and bold headings cleanly without raw asterisks or quote artifacts
 */
function renderFormattedContent(text: string, onCitationClick?: (index: number) => void) {
  // Clean double quotes and literal HTML entities
  const sanitized = text
    .replace(/""/g, '"')
    .replace(/\\"/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"');

  const paragraphs = sanitized.split(/\n\n+/);

  return (
    <div className="space-y-3.5">
      {paragraphs.map((p, pIdx) => {
        const trimmed = p.trim();
        if (!trimmed) return null;

        const lines = trimmed.split(/\n/);
        const isBulletList =
          lines.length > 0 &&
          lines.every((line) => line.trim().startsWith("•") || line.trim().startsWith("-"));

        if (isBulletList) {
          return (
            <ul key={pIdx} className="space-y-1.5 pl-1 my-2">
              {lines.map((line, lIdx) => {
                const bulletText = line.replace(/^[•\-]\s*/, "");
                return (
                  <li key={lIdx} className="flex items-start gap-2 text-sm text-[#243A2C]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B47] shrink-0 mt-2" />
                    <span>{parseInlineMarkdown(bulletText, onCitationClick)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p
            key={pIdx}
            className="text-[15px] sm:text-base text-[#1E2E24] leading-relaxed max-w-[70ch]"
          >
            {parseInlineMarkdown(trimmed, onCitationClick)}
          </p>
        );
      })}
    </div>
  );
}

export default function AskLoreView({
  initialQuery = "",
  autoStartVoice = false,
  records,
  onOpenRecord,
  onStartCapture,
}: AskLoreViewProps) {
  const [input, setInput] = useState(initialQuery);
  const [selectedSourceDrawer, setSelectedSourceDrawer] = useState<GroundedSourceItem | null>(null);

  // Live Microphone & Speech-to-Text State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  // Live Voice Response / Text-to-Speech State
  const [activeSpeakingId, setActiveSpeakingId] = useState<string | null>(null);
  const [autoSpeakEnabled, setAutoSpeakEnabled] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m-1",
      sender: "user",
      text: "Why did we choose deterministic idempotency keys for billing retries?",
      timestamp: "10:42 AM",
    },
    {
      id: "m-2",
      sender: "lore",
      text: "**Enforce a deterministic UUIDv5 idempotency key based on user_id, order_id, and attempt_window.** [1]\n\n**Context & Rationale:** Stripe and payment gateways natively deduplicate transactions matching identical idempotency headers within a 24-hour window. Client retries without stable keys caused 47 duplicate transactions during outages. [1]\n\n**Alternatives Evaluated:**\n• Random client-generated UUIDv4 (Rejected: client generates new key on re-render)\n• Database row locks during checkout (Rejected: caused connection exhaustion during peak traffic)\n• Deterministic UUIDv5 with 24-hr sliding window (Selected: safe, scalable, zero double-charges)\n\n**Caveats & Operational Risks:** Re-generating keys on client retries completely defeats the protection.\n\n**Invalidation Trigger:** Switching away from Stripe idempotency protocol or multi-region synchronous billing.",
      spokenSummary: "According to Ananya Kulkarni, we enforce deterministic UUIDv5 idempotency keys based on user id and order id. Stripe deduplicates transactions matching identical headers within 24 hours.",
      timestamp: "10:42 AM",
      evidenceStatus: "grounded",
      applicability: {
        system: "Core Billing & Stripe Gateway",
        environment: "production",
        freshness: "Verified Oct 15, 2026 · PR #142",
      },
      sources: [
        {
          id: "rec-2",
          citationIndex: 1,
          title: "PR #142 (Merged): Billing Idempotency Keys Architecture",
          author: "Ananya Kulkarni (Backend Engineer)",
          date: "Oct 15, 2026",
          duration: "05:12",
          type: "PR Debrief / Decision Record",
          status: "verified",
          system: "Core Billing & Stripe Gateway",
          excerpt: "Without a stable key, a retry could be processed as a second payment. We had an incident where 47 users were charged twice during a cloud flare outage...",
        },
      ],
      suggestedFollowUps: [
        "What happens if Redis TTL expires during an in-flight retry?",
        "Show alternatives considered for Billing Idempotency",
        "Who can approve changes to Core Billing?",
      ],
    },
  ]);

  // Clickable Prompt Chips for Quick Demo
  const demoPromptChips = [
    { label: "💳 Billing Idempotency", query: "Why do we use idempotency keys in billing?" },
    { label: "🤖 Sensor Calibration Drift", query: "Why polynomial temperature calibration for sensors?" },
    { label: "🚀 Canary Rollback", query: "How does zero-downtime canary rollback work?" },
    { label: "⚡ GaN Motor Controllers", query: "Why did we switch to GaN motor controllers?" },
    { label: "🔧 Field Gearbox Grind", query: "What causes field gearbox motor grind?" },
  ];

  // Initialize Speech Recognition & auto-listen if requested
  useEffect(() => {
    if (autoStartVoice) {
      startListening();
    }
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [autoStartVoice]);

  // Start Browser Microphone Recognition
  const startListening = () => {
    setSpeechError(null);
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError("Voice input requires a browser with Web Speech API (Chrome, Edge, Brave, or Safari).");
      return;
    }

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setActiveSpeakingId(null);
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let finalTrans = "";
        let interimTrans = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTrans += event.results[i][0].transcript;
          } else {
            interimTrans += event.results[i][0].transcript;
          }
        }

        const currentText = (finalTrans || interimTrans).replace(/^["'“”\s]+|["'“”\s]+$/g, "");
        if (currentText) {
          setInput(currentText);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setSpeechError("Microphone permission was denied. Please allow mic access in your browser settings.");
        } else if (event.error !== "no-speech") {
          setSpeechError(`Voice error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      setSpeechError(`Microphone error: ${err.message}`);
      setIsListening(false);
    }
  };

  // Stop Listening and Optionally Submit Query
  const stopListening = (autoSubmit: boolean = true) => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    if (autoSubmit && input.trim()) {
      handleSend(input);
    }
  };

  // Text to Speech: Speak Answer Aloud
  const speakMessage = (messageId: string, textToSpeak?: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    if (activeSpeakingId === messageId) {
      window.speechSynthesis.cancel();
      setActiveSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();

    const cleanText = (textToSpeak || "No speech summary available.")
      .replace(/\*\*/g, "")
      .replace(/\[\d+\]/g, "")
      .replace(/[`"“”]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Google") ||
          v.name.includes("Natural") ||
          v.name.includes("Samantha") ||
          v.name.includes("Zira") ||
          v.name.includes("Daniel"))
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setActiveSpeakingId(messageId);
    utterance.onend = () => setActiveSpeakingId(null);
    utterance.onerror = () => setActiveSpeakingId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Query Execution using Curated Voice Knowledge Engine
  const handleSend = (textToSend?: string) => {
    const raw = (textToSend || input).trim();
    const q = raw.replace(/^["'“”\s]+|["'“”\s]+$/g, "").replace(/""/g, '"');
    if (!q) return;

    if (isListening) {
      stopListening(false);
    }

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const result: GroundedAnswerResult = queryCuratedKnowledge(q);

      const loreMsgId = `l-${Date.now()}`;
      const loreMsg: Message = {
        id: loreMsgId,
        sender: "lore",
        text: result.text,
        spokenSummary: result.spokenSummary,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        evidenceStatus: result.evidenceStatus,
        applicability: result.applicability,
        sources: result.sources,
        suggestedFollowUps: result.suggestedFollowUps,
        closestMatches: result.closestMatches,
      };

      setMessages((prev) => [...prev, loreMsg]);

      if (autoSpeakEnabled && result.spokenSummary) {
        speakMessage(loreMsgId, result.spokenSummary);
      }
    }, 450);
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
                /* Lore Response Card */
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E6EFE8] text-[#1F3E2B] flex items-center justify-center shrink-0 border border-[#D1DDD3]">
                    <Sparkles className="w-4 h-4 text-[#2E5B42]" />
                  </div>

                  <div className="flex-1 space-y-3 min-w-0">
                    {/* Header info & Speech Action */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-xs text-[#1B3629]">Lore Voice Mentor</span>
                        <span className="text-[11px] text-[#82998B]">{msg.timestamp}</span>

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

                      {/* Text-to-Speech Playback Button */}
                      <button
                        onClick={() => speakMessage(msg.id, msg.spokenSummary || msg.text)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all shadow-2xs ${
                          activeSpeakingId === msg.id
                            ? "bg-[#224332] text-white animate-pulse"
                            : "bg-white hover:bg-[#EEF4F0] text-[#294B37] border border-[#D5E1D8]"
                        }`}
                        title={activeSpeakingId === msg.id ? "Stop voice playback" : "Read answer aloud"}
                      >
                        {activeSpeakingId === msg.id ? (
                          <>
                            <Square className="w-3 h-3 fill-current" />
                            <span>Stop Speaking</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#2E5B42]" />
                            <span>Listen Aloud</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Active Waveform Banner */}
                    {activeSpeakingId === msg.id && (
                      <div className="p-2.5 rounded-xl bg-[#E8F3EB] border border-[#C9DFD0] text-xs text-[#224332] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex gap-0.5 items-center">
                            <span className="w-1 h-3 bg-[#224332] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1 h-4 bg-[#224332] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1 h-2 bg-[#224332] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            <span className="w-1 h-4 bg-[#224332] rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
                          </span>
                          <span className="font-semibold">Speaking voice response aloud...</span>
                        </div>
                        <button
                          onClick={() => speakMessage(msg.id)}
                          className="text-[11px] underline font-semibold text-[#1B3629]"
                        >
                          Mute
                        </button>
                      </div>
                    )}

                    {/* Answer Card Body */}
                    {msg.evidenceStatus === "no_evidence" ? (
                      /* Honest Abstention State */
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
                                <button
                                  onClick={() => handleSend(m.title)}
                                  className="text-[10px] text-[#244833] font-semibold bg-white border border-[#D2E0D6] px-2 py-0.5 rounded-md hover:bg-[#EEF4EF]"
                                >
                                  Ask this →
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <button
                            onClick={onStartCapture}
                            className="px-4 py-2 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                          >
                            <Mic className="w-3.5 h-3.5" />
                            <span>Start 3-Minute Voice Debrief</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Grounded Answer Card with Clean Formatted Content */
                      <div className="bg-white rounded-2xl border border-[#E2E9E3] p-6 shadow-card space-y-4">
                        <div className="leading-relaxed max-w-[70ch]">
                          {renderFormattedContent(msg.text, (citationNum) => {
                            const matchedSrc = msg.sources?.find(
                              (s) => s.citationIndex === citationNum
                            );
                            if (matchedSrc) setSelectedSourceDrawer(matchedSrc);
                          })}
                        </div>

                        {/* Applicability Line */}
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

                        {/* Cited Evidence Cards */}
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="pt-3 border-t border-[#F0F4F1] space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-[#557160] uppercase tracking-wider">
                                Cited Evidence ({msg.sources.length})
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
                                    "{src.excerpt.replace(/^["'“”\s]+|["'“”\s]+$/g, "")}"
                                  </p>

                                  <div className="mt-2.5 flex items-center justify-between text-[10px] text-[#5A7767]">
                                    <span className="flex items-center gap-1 font-mono">
                                      <GitCommit className="w-3 h-3 text-[#2E5840]" />
                                      {src.system}
                                    </span>
                                    <span className="text-[#204430] font-semibold group-hover:underline">
                                      View record →
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

        {/* Bottom Input Area with Microphone and Prompt Chips */}
        <div className="max-w-3xl mx-auto w-full pt-2 space-y-3">
          {/* Active Microphone Status Banner */}
          {isListening && (
            <div className="p-3 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#B91C1C] flex items-center justify-between shadow-sm animate-pulse">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#EF4444] animate-ping" />
                <div>
                  <span className="font-semibold block text-[#991B1B]">
                    Listening to your microphone...
                  </span>
                  <span className="text-[11px] text-[#B91C1C]">
                    Speak your question aloud (e.g. "Why do we use idempotency keys in billing?")
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => stopListening(true)}
                  className="px-3 py-1.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-xl text-xs font-semibold shadow-2xs"
                >
                  Done / Search
                </button>
                <button
                  type="button"
                  onClick={() => stopListening(false)}
                  className="px-2 py-1.5 text-xs text-[#991B1B] hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Microphone Error Message */}
          {speechError && (
            <div className="p-2.5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-xs text-[#92400E] flex items-center justify-between">
              <span>{speechError}</span>
              <button
                onClick={() => setSpeechError(null)}
                className="text-[11px] underline font-semibold text-[#78350F]"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Input Form with Voice Mic Button */}
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
              placeholder={isListening ? "Listening... (speech appearing here)" : "Ask or speak why something works the way it does..."}
              className="flex-1 bg-transparent px-3 py-1.5 text-sm text-[#18261E] placeholder-[#7F9789] focus:outline-none"
            />

            {/* Microphone Toggle Button */}
            <button
              type="button"
              onClick={() => (isListening ? stopListening(true) : startListening())}
              className={`p-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
                isListening
                  ? "bg-[#DC2626] text-white shadow-md animate-pulse"
                  : "bg-[#EAF3EC] hover:bg-[#D9EAE0] text-[#1B3E2A] border border-[#C5DCD0]"
              }`}
              title={isListening ? "Stop listening and submit" : "Click to speak your question"}
            >
              <Mic className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">
                {isListening ? "Listening..." : "Speak"}
              </span>
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#224332] hover:bg-[#1B3629] disabled:opacity-50 text-white p-2.5 rounded-xl transition-transform active:scale-95"
              title="Submit question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Suggested Clickable Prompt Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-[#536E5E] shrink-0 mr-1">
              Try asking:
            </span>
            {demoPromptChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(chip.query)}
                className="text-xs bg-white hover:bg-[#EEF4F0] text-[#244833] px-3 py-1.5 rounded-xl border border-[#D5E1D8] transition-all hover:border-[#224332] shadow-2xs font-medium flex items-center gap-1.5"
              >
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Subtext and Voice Playback Auto-Toggle */}
          <div className="flex flex-wrap items-center justify-between text-[11px] text-[#7E9688] pt-1">
            <div className="flex items-center gap-2">
              <span>Lore cites verified PR debriefs and architectural records.</span>
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer text-[#486654] font-medium">
              <input
                type="checkbox"
                checked={autoSpeakEnabled}
                onChange={(e) => setAutoSpeakEnabled(e.target.checked)}
                className="rounded border-[#C5DCD0] text-[#224332] focus:ring-[#224332]"
              />
              <span>Auto-speak voice response aloud</span>
            </label>
          </div>
        </div>
      </div>

      {/* Right Drawer: Selected Source Details */}
      {selectedSourceDrawer && (
        <div className="w-96 border-l border-[#DDE5DF] bg-white p-6 overflow-y-auto space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-[#EEF3EF]">
            <span className="text-xs font-bold text-[#224332] uppercase tracking-wider font-mono">
              Citation [{selectedSourceDrawer.citationIndex}]
            </span>
            <button
              onClick={() => setSelectedSourceDrawer(null)}
              className="text-xs text-[#71897C] hover:text-[#18261E] font-semibold"
            >
              Close
            </button>
          </div>

          <div>
            <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-full font-semibold border border-[#C5E9D3]">
              ✓ {selectedSourceDrawer.status}
            </span>
            <h4 className="font-serif text-base font-bold text-[#18261E] mt-2">
              {selectedSourceDrawer.title}
            </h4>
            <p className="text-xs text-[#6A8274] mt-0.5">
              Verified by {selectedSourceDrawer.author} on {selectedSourceDrawer.date}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-1.5">
            <span className="text-[10px] font-semibold text-[#526F5E] uppercase tracking-wider block">
              System Context
            </span>
            <p className="text-xs font-mono text-[#18261E]">
              {selectedSourceDrawer.system}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-semibold text-[#526F5E] uppercase tracking-wider block">
              Audio / Debrief Excerpt
            </span>
            <p className="text-xs text-[#2A4434] leading-relaxed italic bg-[#F2F7F4] p-3 rounded-xl border border-[#DCE8E0]">
              "{selectedSourceDrawer.excerpt.replace(/^["'“”\s]+|["'“”\s]+$/g, "")}"
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                const found = records.find((r) => r.id === selectedSourceDrawer.id);
                if (found) {
                  onOpenRecord(found);
                }
              }}
              className="w-full py-2.5 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all text-center block"
            >
              Inspect Complete Record →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
