"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, Check, Edit3, ArrowRight, Sparkles } from "lucide-react";
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
  const pendingRecords = records.filter(
    (r) => r.status === "review_due" || r.status === "draft"
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
          Verification Governance
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#18261E]">
          Review Queue ({pendingRecords.length})
        </h1>
        <p className="text-xs text-[#6B8073] mt-0.5">
          Lore preserves accuracy through human sign-off before knowledge is indexed to Ask Lore mentor answers.
        </p>
      </div>

      <div className="space-y-4">
        {pendingRecords.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#DCE5DF] text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-[#2E7D52] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-[#18261E]">
              All Captured Knowledge is Approved
            </h3>
            <p className="text-xs text-[#6B8073]">
              No outstanding drafts are waiting for expert verification.
            </p>
          </div>
        ) : (
          pendingRecords.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-[#FFF7ED] text-[#C2410C] px-2 py-0.5 rounded-md font-semibold border border-[#FED7AA]">
                    {item.status === "review_due" ? "Review Due" : "Raw Draft"}
                  </span>
                  <span className="text-xs text-[#71897C]">{item.category}</span>
                </div>

                <h3
                  onClick={() => onOpenRecord(item)}
                  className="font-serif text-xl font-semibold text-[#18261E] hover:text-[#224332] cursor-pointer transition-colors"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-[#5C7768] line-clamp-2">
                  {item.summary}
                </p>

                <div className="flex items-center gap-2 text-xs text-[#71897C] pt-1">
                  <span>Contributed by <strong>{item.contributor.name}</strong></span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => onOpenRecord(item)}
                  className="px-3.5 py-2 rounded-xl border border-[#D1DDD4] bg-[#F8FAF8] hover:bg-[#EEF4EF] text-xs font-semibold text-[#294B37] transition-colors"
                >
                  Inspect Diff
                </button>

                <button
                  onClick={() => onApprove(item.id)}
                  className="px-4 py-2 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Verify & Approve</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
