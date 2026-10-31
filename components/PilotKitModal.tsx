"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  Sparkles,
  Users,
  FileCheck,
} from "lucide-react";

interface PilotKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PilotKitModal({ isOpen, onClose }: PilotKitModalProps) {
  const [activeTab, setActiveTab] = useState<"comparator" | "metrics">("comparator");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl border border-[#D5E1D8] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-[#EDF3EE] flex items-center justify-between bg-[#F8FAF8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E6EFE8] text-[#1E3E2B] flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5 text-[#2E5840]" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-[#18261E]">
                Design Partner Concierge Pilot Kit (Strategy Phase 0 & 3)
              </h2>
              <p className="text-xs text-[#637E6F]">
                Instrument and prove value across 10 sample PRs before enterprise-wide deployment.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-xs bg-[#EAF1EB] text-[#224332] px-3 py-1.5 rounded-xl font-semibold hover:bg-[#DEECE2]"
          >
            Close ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-[#EEF3EF] bg-white">
          <button
            onClick={() => setActiveTab("comparator")}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "comparator"
                ? "border-[#224332] text-[#1E3E2B]"
                : "border-transparent text-[#708A7C] hover:text-[#18261E]"
            }`}
          >
            10-PR Baseline Comparator
          </button>
          <button
            onClick={() => setActiveTab("metrics")}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "metrics"
                ? "border-[#224332] text-[#1E3E2B]"
                : "border-transparent text-[#708A7C] hover:text-[#18261E]"
            }`}
          >
            North Star Reuse Metric Tracker
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === "comparator" && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-[#F6FAF7] border border-[#D3E3D7] text-xs text-[#3E5C4A] leading-relaxed">
                <strong>Phase 0 Concierge Protocol:</strong> Compare how fast engineers answer architectural questions with raw Git commits alone vs. with Lore’s human-verified decision records.
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Without Lore */}
                <div className="p-5 rounded-2xl bg-[#FFFBFB] border border-[#FCDADA] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#B91C1C] uppercase tracking-wider">
                      WITHOUT LORE (TRADITIONAL)
                    </span>
                    <span className="text-xs font-mono font-bold text-[#991B1B]">
                      ~45 minutes
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#18261E]">
                    &ldquo;Why did we switch to UUIDv5 idempotency keys?&rdquo;
                  </h4>
                  <ul className="text-xs text-[#7F1D1D] space-y-2">
                    <li>• Searches 4 Slack channels for keywords &ldquo;idempotency&rdquo;</li>
                    <li>• Reads 3 PR commits; only commit messages like &ldquo;fix retry bug&rdquo; exist</li>
                    <li>• Interrupts lead architect Ananya Kulkarni for 15-minute explanation</li>
                    <li>• Context remains tacit and is lost again when author leaves</li>
                  </ul>
                </div>

                {/* With Lore */}
                <div className="p-5 rounded-2xl bg-[#F4F9F5] border border-[#C5E9D3] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#1E7445] uppercase tracking-wider">
                      WITH LORE VERIFIED RECORD
                    </span>
                    <span className="text-xs font-mono font-bold text-[#1E7445]">
                      ~2 seconds
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#18261E]">
                    &ldquo;Why did we switch to UUIDv5 idempotency keys?&rdquo;
                  </h4>
                  <ul className="text-xs text-[#166534] space-y-2">
                    <li>• Asks Lore via UI or Coding Agent queries <code>/api/mcp</code></li>
                    <li>• Instant verified decision cited: Stripe deduplication window</li>
                    <li>• Evaluated alternatives revealed: DB locks rejected for scale</li>
                    <li>• Zero interruptions; zero duplicate payment incidents</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-6">
              {/* North Star Cards (Strategy Section 7.6) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#DCE5DF] shadow-2xs">
                  <span className="text-[10px] font-semibold text-[#668273] uppercase tracking-wider block">
                    North Star Reuse Rate
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#1E7445] mt-1">
                    78%
                  </div>
                  <p className="text-[10px] text-[#2E7D52] font-semibold mt-1">
                    Target: &ge; 60% of merged PR decisions later cited
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#DCE5DF] shadow-2xs">
                  <span className="text-[10px] font-semibold text-[#668273] uppercase tracking-wider block">
                    Debrief Completion Rate
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#18261E] mt-1">
                    84%
                  </div>
                  <p className="text-[10px] text-[#637E6F] mt-1">
                    Authors completed 3-min PR change debrief
                  </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#DCE5DF] shadow-2xs">
                  <span className="text-[10px] font-semibold text-[#668273] uppercase tracking-wider block">
                    Repeated Questions Reduced
                  </span>
                  <div className="text-3xl font-serif font-bold text-[#18261E] mt-1">
                    -62%
                  </div>
                  <p className="text-[10px] text-[#637E6F] mt-1">
                    Senior engineer interruptions dropped by 62%
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#DEE7E0] space-y-2">
                <span className="text-[10px] font-semibold text-[#2D563E] uppercase tracking-wider block">
                  Pilot Design Partner Agreement Checklist
                </span>
                <div className="space-y-1.5 text-xs text-[#3E5C4A]">
                  <div>✓ 1 team of 8–15 software engineers connected to 1 repository cluster</div>
                  <div>✓ Non-spammy debrief prompts rate-limited to max 2 invitations per author / week</div>
                  <div>✓ Read-only MCP agent access enabled for Cursor & Claude Code users</div>
                  <div>✓ 8-week pilot review to evaluate reuse rate and engineer satisfaction</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F8FAF8] border-t border-[#EDF3EE] flex items-center justify-between">
          <span className="text-xs text-[#718B7D]">
            Design Partner Profile: 1 repository cluster, 8 weeks, 8–15 developers.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all"
          >
            Apply to Pilot Workspace
          </button>
        </div>
      </div>
    </div>
  );
}
