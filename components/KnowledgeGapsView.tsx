"use client";

import React, { useState } from "react";
import { Lightbulb, Mic, CheckCircle, ArrowRight, UserCheck } from "lucide-react";
import { knowledgeGapsData, KnowledgeGap } from "@/lib/data";

interface KnowledgeGapsViewProps {
  onStartCaptureWithTopic: (topic: string, expertName: string) => void;
}

export default function KnowledgeGapsView({
  onStartCaptureWithTopic,
}: KnowledgeGapsViewProps) {
  const [gaps, setGaps] = useState<KnowledgeGap[]>(knowledgeGapsData);

  const handleSchedule = (gap: KnowledgeGap) => {
    setGaps((prev) =>
      prev.map((g) =>
        g.id === gap.id ? { ...g, status: "interview_scheduled" } : g
      )
    );
    onStartCaptureWithTopic(gap.question, gap.suggestedExpert);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-semibold text-[#B45309] uppercase tracking-wider">
          Missing Institutional Context
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#18261E]">
          Knowledge Gaps ({gaps.length})
        </h1>
        <p className="text-xs text-[#6B8073] mt-0.5">
          These questions were asked by team members but lacked verified answers in Lore. Schedule capture sessions to eliminate single points of failure.
        </p>
      </div>

      <div className="space-y-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-5"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#FEF3C7] text-[#B45309] font-semibold px-2 py-0.5 rounded-md border border-[#FDE68A]">
                  Asked {gap.frequency} times
                </span>
                <span className="text-xs text-[#7B9486]">{gap.category}</span>
                <span className="text-xs text-[#8BA193]">· Last asked {gap.lastAsked}</span>
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#18261E]">
                &ldquo;{gap.question}&rdquo;
              </h3>

              <div className="flex items-center gap-2 text-xs text-[#526C5D]">
                <UserCheck className="w-3.5 h-3.5 text-[#2E7D52]" />
                <span>Suggested SME: <strong>{gap.suggestedExpert}</strong></span>
              </div>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => handleSchedule(gap)}
                className="px-4 py-2.5 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Schedule Capture Session</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
