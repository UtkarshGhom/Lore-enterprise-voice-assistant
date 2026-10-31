"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Clock,
  Check,
  Edit3,
  ArrowRight,
  Sparkles,
  GitPullRequest,
  Volume2,
  FileText,
  AlertCircle,
  Command,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface ReviewQueueViewProps {
  records: KnowledgeRecord[];
  onApprove: (id: string) => void;
  onOpenRecord: (record: KnowledgeRecord) => void;
}

export default function ReviewQueueView({
  records,
  onApprove,
  onOpenRecord,
}: ReviewQueueViewProps) {
  const [selectedQueueIndex, setSelectedQueueIndex] = useState(0);
  const [justApprovedId, setJustApprovedId] = useState<string | null>(null);

  const pendingRecords = records.filter(
    (r) => r.status === "review_due" || r.status === "draft"
  );

  const activeItem = pendingRecords[selectedQueueIndex] || pendingRecords[0];

  // Keyboard shortcut listener (Section 5.5 Polish: J/K to move, A to approve, E to inspect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === "j" || e.key === "ArrowDown") {
        setSelectedQueueIndex((prev) => Math.min(prev + 1, pendingRecords.length - 1));
      } else if (e.key === "k" || e.key === "ArrowUp") {
        setSelectedQueueIndex((prev) => Math.max(prev - 1, 0));
      } else if ((e.key === "a" || e.key === "A") && activeItem) {
        handleApproveClick(activeItem.id);
      } else if ((e.key === "e" || e.key === "E") && activeItem) {
        onOpenRecord(activeItem);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pendingRecords, activeItem]);

  const handleApproveClick = (id: string) => {
    setJustApprovedId(id);
    setTimeout(() => {
      onApprove(id);
      setJustApprovedId(null);
    }, 450);
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            Verification & Human Governance
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Review Queue ({pendingRecords.length})
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Lore requires explicit human sign-off on change rationale before decisions are indexed into the AI mentor.
          </p>
        </div>

        {/* Status count */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
            {pendingRecords.length} items awaiting sign-off
          </span>
        </div>
      </div>

      {pendingRecords.length === 0 ? (
        /* Empty State (Polish Guide Section 9) */
        <div className="bg-white p-14 rounded-3xl border border-[#DCE5DF] text-center space-y-3 shadow-card">
          <div className="w-12 h-12 rounded-2xl bg-[#E8F6ED] text-[#1E7445] flex items-center justify-center mx-auto border border-[#C5E9D3]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#18261E]">
            You are all caught up
          </h3>
          <p className="text-xs text-[#6B8073] max-w-md mx-auto">
            New drafts captured via voice debriefs or PR merges will appear here for expert verification.
          </p>
        </div>
      ) : (
        /* Two-Pane Review Experience (Section 5.5 Polish) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left List of Pending Drafts */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-bold text-[#627D6E] uppercase tracking-wider block px-1">
              Pending Drafts
            </span>
            {pendingRecords.map((item, idx) => {
              const isSelected = activeItem?.id === item.id;
              const isApproving = justApprovedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedQueueIndex(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                    isApproving
                      ? "scale-95 opacity-50 bg-[#E8F6ED] border-[#86EFAC]"
                      : isSelected
                      ? "bg-white border-[#224332] shadow-elevated ring-1 ring-[#224332]/20"
                      : "bg-[#F9FAF9] hover:bg-white border-[#DCE5DF]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono bg-[#FFF7ED] text-[#C2410C] px-2 py-0.5 rounded font-semibold border border-[#FED7AA]">
                      {item.status === "review_due" ? "Review Due" : "Raw Draft"}
                    </span>
                    <span className="text-[11px] text-[#71897C]">{item.category}</span>
                  </div>

                  <h4 className="font-serif text-sm font-semibold text-[#18261E] line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#5C7768] line-clamp-2 mt-1">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#71897C] pt-3 mt-2 border-t border-[#EDF3EE]">
                    <span>{item.contributor.name}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Pane: Split-View Diff & Source Verification */}
          {activeItem && (
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE5DF] shadow-card p-6 sm:p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#EEF3EF]">
                  <div>
                    <span className="text-[10px] font-mono text-[#2E5840] bg-[#E8F0EA] px-2 py-0.5 rounded font-semibold uppercase">
                      {activeItem.systemOrProject || "Core Platform"}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#18261E] mt-1.5">
                      {activeItem.title}
                    </h3>
                    <p className="text-xs text-[#6B8073] mt-0.5">
                      Captured from {activeItem.contributor.name} ({activeItem.contributor.role}) · {activeItem.date}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenRecord(activeItem)}
                    className="text-xs font-semibold text-[#224332] hover:text-[#18261E] bg-[#EEF4EF] hover:bg-[#E2EDE5] px-3 py-1.5 rounded-xl border border-[#D2DFD5] transition-colors shrink-0"
                  >
                    Full View
                  </button>
                </div>

                {/* Section 1: Extracted Rationale */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-[#4B6856] uppercase tracking-wider">
                    Extracted Architectural Rationale:
                  </span>
                  <div className="p-4 rounded-2xl bg-[#FAFBF9] border border-[#DEE7E0] text-xs text-[#1E2E24] leading-relaxed">
                    {activeItem.rationale || activeItem.summary}
                  </div>
                </div>

                {/* Section 2: Linked PR & Source Audio Evidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-[#F4F7F4] border border-[#DDE6DF] space-y-1">
                    <span className="text-[10px] font-semibold text-[#2D5840] uppercase flex items-center gap-1">
                      <GitPullRequest className="w-3.5 h-3.5" /> Linked Git Changeset
                    </span>
                    <div className="text-xs font-mono font-semibold text-[#18261E]">
                      PR #208 (Merged by Alex Chen)
                    </div>
                    <p className="text-[10px] text-[#637E6F]">
                      Touches: `/src/billing/idempotency.ts` (+42, -12)
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F4F7F4] border border-[#DDE6DF] space-y-1">
                    <span className="text-[10px] font-semibold text-[#2D5840] uppercase flex items-center gap-1">
                      <Volume2 className="w-3.5 h-3.5" /> Audio Transcript Passage
                    </span>
                    <div className="text-xs font-semibold text-[#18261E]">
                      Interview Duration: 04:32
                    </div>
                    <p className="text-[10px] text-[#637E6F] italic line-clamp-1">
                      &ldquo;{activeItem.transcriptExcerpt || "Field tests verified 100% deduplication under high load."}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Section 3: Invalidation Conditions */}
                {activeItem.exceptions && activeItem.exceptions.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1">
                    <span className="text-[10px] font-semibold text-[#B45309] uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> Invalidation Rules
                    </span>
                    <p className="text-xs text-[#92400E]">
                      {activeItem.exceptions[0]}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Approval Bar */}
              <div className="pt-4 border-t border-[#EEF3EF] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-[#789384]">
                  Signed approval binds cryptographic SHA-256 hash to audit log.
                </span>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onOpenRecord(activeItem)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#D5E1D8] bg-[#FAFBF9] hover:bg-[#EEF4EF] text-xs font-semibold text-[#2B4E38] transition-colors"
                  >
                    Edit Draft
                  </button>

                  <button
                    onClick={() => handleApproveClick(activeItem.id)}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Check className="w-4 h-4" />
                    <span>Verify & Approve Record</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quiet Keyboard Shortcuts Footer (Section 5.5 Polish) */}
      <div className="pt-4 border-t border-[#E8EEE8] flex items-center justify-center gap-6 text-[11px] text-[#6B8576]">
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-[#D5E1D8] rounded font-mono text-[10px] shadow-2xs">
            J
          </kbd>
          <kbd className="px-1.5 py-0.5 bg-white border border-[#D5E1D8] rounded font-mono text-[10px] shadow-2xs">
            K
          </kbd>
          <span>Navigate</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-[#D5E1D8] rounded font-mono text-[10px] shadow-2xs">
            A
          </kbd>
          <span>Approve & Index</span>
        </div>
        <span>•</span>
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-white border border-[#D5E1D8] rounded font-mono text-[10px] shadow-2xs">
            E
          </kbd>
          <span>Edit & Diff</span>
        </div>
      </div>
    </div>
  );
}
