"use client";

import React, { useState } from "react";
import { UserPlus, Mic, MessageSquare, Award, CheckCircle } from "lucide-react";
import { expertContributors, Contributor } from "@/lib/data";

interface TeamViewProps {
  onScheduleInterview: (expert: Contributor) => void;
}

export default function TeamView({ onScheduleInterview }: TeamViewProps) {
  const [scheduledId, setScheduledId] = useState<string | null>(null);

  const handleSchedule = (expert: Contributor) => {
    setScheduledId(expert.id);
    setTimeout(() => {
      setScheduledId(null);
      onScheduleInterview(expert);
    }, 800);
  };

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Header matching Image 1 Screen 7 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            Directory
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Expert Contributors
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Showcase team expertise and convert tacit knowledge into organizational memory.
          </p>
        </div>

        <button className="flex items-center gap-1.5 bg-[#224332] hover:bg-[#1B3629] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all">
          <UserPlus className="w-3.5 h-3.5" />
          <span>+ Invite Expert</span>
        </button>
      </div>

      {/* Grid of Contributors matching Screen 7 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {expertContributors.map((expert) => (
          <div
            key={expert.id}
            className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card hover:shadow-elevated hover:border-[#BFD3C3] transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start gap-4">
                <img
                  src={expert.avatar}
                  alt={expert.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#DFECE2] group-hover:scale-105 transition-transform"
                />
                <div>
                  <h3 className="font-semibold text-base text-[#18261E] group-hover:text-[#224332] transition-colors">
                    {expert.name}
                  </h3>
                  <p className="text-xs text-[#688273] font-medium">
                    {expert.role}
                  </p>
                  <span className="inline-block text-[11px] text-[#2F6144] font-semibold mt-1">
                    {expert.contributionsCount} knowledge contributions
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {expert.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] bg-[#F1F6F2] text-[#335B42] px-2.5 py-1 rounded-lg border border-[#D8E6DB]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-[#EDF3EE] flex items-center justify-between">
              <span className="text-[11px] text-[#7E9689] flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#2E7D52]" /> Verified Contributor
              </span>

              <button
                onClick={() => handleSchedule(expert)}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#EBF2ED] hover:bg-[#224332] hover:text-white text-[#214330] px-3 py-1.5 rounded-xl transition-all"
              >
                {scheduledId === expert.id ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5" />
                    <span>Start Capture</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
