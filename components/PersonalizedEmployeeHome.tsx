"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Clock,
  Users,
  Bookmark,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  BookmarkCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface PersonalizedEmployeeHomeProps {
  records: KnowledgeRecord[];
  onSelectRecord: (record: KnowledgeRecord) => void;
  onNavigate: (view: string) => void;
  onAskQuery: (query: string) => void;
}

export default function PersonalizedEmployeeHome({
  records,
  onSelectRecord,
  onNavigate,
  onAskQuery,
}: PersonalizedEmployeeHomeProps) {
  const [savedItems, setSavedItems] = useState<string[]>([
    "rec-1",
    "rec-4",
  ]);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const recommendedItems = [
    {
      id: "rec-ros2",
      title: "ROS2 Architecture Overview",
      reason: "Based on your current robotics assignment",
      category: "Robotics",
      contributor: "Priya Desai",
      date: "Updated Oct 22, 2026",
    },
    {
      id: "rec-hw-fail",
      title: "Common Hardware Failures",
      reason: "Frequently viewed by robotics field engineers",
      category: "Operations",
      contributor: "Aayush Patil",
      date: "Updated Oct 08, 2026",
    },
    {
      id: "rec-field-check",
      title: "Field Deployment Checklist",
      reason: "Newly updated SOP for outdoor trials",
      category: "Hardware",
      contributor: "Rohit Sharma",
      date: "Updated 3 days ago",
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-8">
      {/* 1. Personalized Header matching Screen 4 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-[#305C42] flex items-center gap-1.5">
            Good morning, Utkarsh <span className="animate-pulse">👋</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18261E]">
            Pick up where you left off
          </h1>
          <p className="text-xs sm:text-sm text-[#668273]">
            Here are personalized intelligence recommendations for your current sprint.
          </p>
        </div>

        {/* Team pill badge */}
        <div className="p-4 rounded-2xl bg-[#EAF2ED] border border-[#CFE0D4] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white text-[#224332] flex items-center justify-center font-serif text-sm font-bold shadow-2xs">
            RT
          </div>
          <div>
            <span className="text-[10px] font-semibold text-[#5A7967] uppercase tracking-wider block">
              Active Assignment
            </span>
            <span className="text-sm font-semibold text-[#18261E]">
              Robotics Team
            </span>
          </div>
        </div>
      </div>

      {/* 2. Personalized Metrics Bar (4 Cards) matching Screen 4 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E3] shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-3">
            <BookOpen className="w-4 h-4 text-[#2E5840]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#18261E]">24</div>
          <div className="text-xs text-[#6B8073] mt-0.5">Knowledge records</div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E3] shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center mb-3">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#18261E]">3</div>
          <div className="text-xs text-[#6B8073] mt-0.5">Pending reviews</div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E3] shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-3">
            <Users className="w-4 h-4 text-[#2E5840]" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#18261E]">6</div>
          <div className="text-xs text-[#6B8073] mt-0.5">Experts in your team</div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E2E9E3] shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center mb-3">
            <Bookmark className="w-4 h-4" />
          </div>
          <div className="text-2xl font-serif font-bold text-[#18261E]">12</div>
          <div className="text-xs text-[#6B8073] mt-0.5">Saved items</div>
        </div>
      </div>

      {/* 3. Split Columns: Recently Accessed vs Recommended for You matching Screen 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recently Accessed (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E2E9E3] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EEF3EF]">
            <h3 className="font-semibold text-sm text-[#18261E]">
              Recently accessed
            </h3>
            <button
              onClick={() => onNavigate("library")}
              className="text-xs font-semibold text-[#29543C] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[#F2F6F3]">
            {records.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectRecord(item)}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-[#F9FAF8] px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#EAF2ED] shrink-0 border border-[#DEECE2]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-[#18261E] group-hover:text-[#224332] truncate">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#789383] block mt-0.5">
                      Viewed recently · {item.contributor.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-full font-semibold border border-[#C5E9D3]">
                    ✓ {item.status === "verified" ? "Verified" : "Draft"}
                  </span>
                  <button
                    onClick={(e) => toggleSave(item.id, e)}
                    className="p-1 rounded-lg text-[#859E90] hover:text-[#224332]"
                  >
                    {savedItems.includes(item.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#2E7D52] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recommended for You (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E2E9E3] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EEF3EF]">
            <h3 className="font-semibold text-sm text-[#18261E]">
              Recommended for you
            </h3>
            <button
              onClick={() => onNavigate("library")}
              className="text-xs font-semibold text-[#29543C] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-[#F2F6F3]">
            {recommendedItems.map((rec) => (
              <div
                key={rec.id}
                onClick={() => onAskQuery(`Explain ${rec.title}`)}
                className="py-3.5 flex items-center justify-between gap-3 hover:bg-[#F9FAF8] px-2 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-[#18261E] group-hover:text-[#224332] truncate">
                    {rec.title}
                  </h4>
                  <p className="text-[11px] text-[#698474] mt-0.5 truncate">
                    {rec.reason}
                  </p>
                  <span className="text-[10px] text-[#86A090] mt-0.5 block">
                    {rec.contributor} · {rec.date}
                  </span>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className="text-[10px] font-mono bg-[#EEF4EF] text-[#3A5C48] px-2 py-0.5 rounded-md">
                    {rec.category}
                  </span>
                  <button
                    onClick={(e) => toggleSave(rec.id, e)}
                    className="p-1 rounded-lg text-[#859E90] hover:text-[#224332]"
                  >
                    {savedItems.includes(rec.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-[#2E7D52] fill-current" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
