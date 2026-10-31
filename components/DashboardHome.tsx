"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Mic,
  MessageSquare,
  BookOpen,
  Lightbulb,
  ArrowRight,
  Sparkles,
  RefreshCw,
  MoreVertical,
  CheckCircle2,
  Clock,
  Users,
  ChevronDown,
  Volume2,
} from "lucide-react";
import {
  KnowledgeRecord,
  expertContributors,
  recentConversations,
  categoryBreakdown,
} from "@/lib/data";
import { NavView } from "./Sidebar";

interface DashboardHomeProps {
  records: KnowledgeRecord[];
  userName?: string;
  onNavigate: (view: NavView) => void;
  onSelectRecord: (record: KnowledgeRecord) => void;
  onAskQuery: (query: string) => void;
  onStartVoiceCapture: () => void;
}

export default function DashboardHome({
  records,
  userName = "Utkarsh",
  onNavigate,
  onSelectRecord,
  onAskQuery,
  onStartVoiceCapture,
}: DashboardHomeProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  const samplePrompts = [
    "Explain our deployment process",
    "Why did we choose this architecture?",
    "Why did we choose Postgres for billing?",
    "What is the rollback procedure if canary fails?",
    "Why do we use idempotency keys in billing?",
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onAskQuery(searchQuery);
  };

  const cyclePrompts = () => {
    setPromptIndex((prev) => (prev + 1) % samplePrompts.length);
  };

  // Metrics
  const totalRecords = records.length + 19; // 24 total in mock
  const verifiedCount = records.filter((r) => r.status === "verified").length + 14; // 18
  const pendingCount = records.filter((r) => r.status === "review_due" || r.status === "draft").length + 1; // 3
  const expertCount = expertContributors.length; // 6

  return (
    <div className="p-6 sm:p-8 space-y-6 max-w-[1440px] mx-auto">
      {/* 1. Hero Panoramic Banner - Tightened proportions (Section 2 Item 12 Polish) */}
      <section className="relative rounded-3xl overflow-hidden border border-[#DCE5DE] shadow-card bg-gradient-to-r from-[#EAF2ED] via-[#F3F7F4] to-[#E5EFE8]">
        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2F5D44_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8 max-w-3xl">
          <span className="text-xs font-semibold text-[#52725E] tracking-wide flex items-center gap-1.5 mb-1.5">
            Good morning, {userName} <span className="animate-pulse">👋</span>
          </span>

          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#162B20] leading-[1.18]">
            What would you like to understand today?
          </h1>

          <p className="text-xs sm:text-sm text-[#577061] mt-1.5 font-normal">
            Ask Lore anything about your team, projects, systems or past decisions.
          </p>

          {/* Interactive Floating Pill Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="mt-5 bg-white rounded-2xl border border-[#D1DDD3] p-1.5 sm:p-2 flex items-center gap-2 shadow-elevated transition-all focus-within:border-[#224332] focus-within:ring-2 focus-within:ring-[#224332]/10"
          >
            {/* Ask Lore Dropdown pill */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#F2F6F3] rounded-xl text-xs font-semibold text-[#244633] cursor-pointer select-none hover:bg-[#E8F0EA] transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-[#33684B]" />
              <span>Ask Lore</span>
              <ChevronDown className="w-3 h-3 text-[#5A7966]" />
            </div>

            {/* Input field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ask why something works the way it does..."
              className="flex-1 bg-transparent px-2 py-1 text-xs sm:text-sm text-[#18261E] placeholder-[#809989] focus:outline-none"
            />

            {/* Mic Button: "Tap to speak" */}
            <button
              type="button"
              onClick={onStartVoiceCapture}
              className="flex items-center gap-2 bg-[#224332] hover:bg-[#1B3629] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-transform active:scale-95"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Tap to speak</span>
            </button>
          </form>

          {/* Quick Prompts - Software Engineering Focused (Section 2 Item 11 Polish) */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            {[
              "Explain our deployment process",
              "Why did we choose this architecture?",
              "Why did we choose Postgres for billing?",
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onAskQuery(prompt)}
                className="flex items-center gap-1.5 text-xs bg-white/80 hover:bg-white text-[#2B4E3A] px-3 py-1.5 rounded-xl border border-[#D4E0D7] transition-all hover:border-[#B7CBBF] shadow-2xs group"
              >
                <Sparkles className="w-3 h-3 text-[#3A7052] group-hover:scale-110 transition-transform" />
                <span>{prompt}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={cyclePrompts}
              title="More sample questions"
              className="p-1.5 rounded-xl bg-white/70 hover:bg-white border border-[#D4E0D7] text-[#4F6C5B] transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Actions Row (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Action 1: Capture Knowledge */}
        <div
          onClick={onStartVoiceCapture}
          className="bg-white p-5 rounded-2xl border border-[#E3E9E4] hover:border-[#C4D6C8] hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Mic className="w-5 h-5 text-[#2E5B42]" />
            </div>
            <h3 className="font-semibold text-sm text-[#18261E] group-hover:text-[#224332] transition-colors">
              Capture Knowledge
            </h3>
            <p className="text-xs text-[#6B8073] mt-1 leading-relaxed">
              Start a voice interview with an expert
            </p>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="w-7 h-7 rounded-full bg-[#F4F8F5] group-hover:bg-[#224332] group-hover:text-white text-[#526B5C] flex items-center justify-center transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Action 2: Ask Lore */}
        <div
          onClick={() => onNavigate("ask")}
          className="bg-white p-5 rounded-2xl border border-[#E3E9E4] hover:border-[#C4D6C8] hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 text-[#2E5B42]" />
            </div>
            <h3 className="font-semibold text-sm text-[#18261E] group-hover:text-[#224332] transition-colors">
              Ask Lore
            </h3>
            <p className="text-xs text-[#6B8073] mt-1 leading-relaxed">
              Get answers from your organization&apos;s knowledge
            </p>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="w-7 h-7 rounded-full bg-[#F4F8F5] group-hover:bg-[#224332] group-hover:text-white text-[#526B5C] flex items-center justify-center transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Action 3: Browse Library */}
        <div
          onClick={() => onNavigate("library")}
          className="bg-white p-5 rounded-2xl border border-[#E3E9E4] hover:border-[#C4D6C8] hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-[#2E5B42]" />
            </div>
            <h3 className="font-semibold text-sm text-[#18261E] group-hover:text-[#224332] transition-colors">
              Browse Library
            </h3>
            <p className="text-xs text-[#6B8073] mt-1 leading-relaxed">
              Explore all knowledge by topic or project
            </p>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="w-7 h-7 rounded-full bg-[#F4F8F5] group-hover:bg-[#224332] group-hover:text-white text-[#526B5C] flex items-center justify-center transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* Action 4: Find Knowledge Gaps */}
        <div
          onClick={() => onNavigate("gaps")}
          className="bg-white p-5 rounded-2xl border border-[#E3E9E4] hover:border-[#C4D6C8] hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF8EB] text-[#B45309] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Lightbulb className="w-5 h-5 text-[#D97706]" />
            </div>
            <h3 className="font-semibold text-sm text-[#18261E] group-hover:text-[#B45309] transition-colors">
              Find Knowledge Gaps
            </h3>
            <p className="text-xs text-[#6B8073] mt-1 leading-relaxed">
              See what&apos;s missing and needs capture
            </p>
          </div>
          <div className="mt-4 flex items-center justify-end">
            <div className="w-7 h-7 rounded-full bg-[#F4F8F5] group-hover:bg-[#B45309] group-hover:text-white text-[#526B5C] flex items-center justify-center transition-all">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Split View: Recent Knowledge (Left) vs Stats & Pulse (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Knowledge List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#E3E8E3] p-6 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base text-[#18261E]">
              Recent Knowledge
            </h2>
            <button
              onClick={() => onNavigate("library")}
              className="text-xs font-semibold text-[#29543C] hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Records Table / List */}
          <div className="divide-y divide-[#EDF2EE]">
            {records.map((record) => (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-[#F9FAF8] px-3 -mx-3 rounded-2xl transition-colors cursor-pointer group"
              >
                {/* Left info with thumbnail */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#EAEFEA] shrink-0 border border-[#DCE5DE]">
                    <img
                      src={record.thumbnail}
                      alt={record.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-[#18261E] group-hover:text-[#224332] truncate transition-colors">
                      {record.title}
                    </h4>
                    <p className="text-xs text-[#6B8073] truncate max-w-md mt-0.5">
                      {record.summary}
                    </p>
                  </div>
                </div>

                {/* Contributor & Date */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <img
                      src={record.contributor.avatar}
                      alt={record.contributor.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#DFE7E1]"
                    />
                    <div className="text-left">
                      <div className="text-xs font-medium text-[#203126] leading-tight">
                        {record.contributor.name}
                      </div>
                      <div className="text-[10px] text-[#718779] leading-tight">
                        {record.contributor.role}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#7A9082] ml-2">
                    {record.date}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 shrink-0">
                  {record.status === "verified" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EBF7F0] text-[#1E6B42] border border-[#C8EAD6]">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  {record.status === "review_due" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                      <Clock className="w-3 h-3" />
                      Review due
                    </span>
                  )}
                  {record.status === "draft" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                      Draft
                    </span>
                  )}

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="p-1 rounded-lg hover:bg-[#EAEFEA] text-[#869B8E] transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Stats, Recent Conversations & Category Progress */}
        <div className="lg:col-span-4 space-y-6">
          {/* 2x2 Metric Cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {/* Metric 1: Knowledge records */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E9E3] shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-2">
                <BookOpen className="w-4 h-4 text-[#2E5840]" />
              </div>
              <div className="text-2xl font-serif font-bold text-[#18261E]">
                {totalRecords}
              </div>
              <div className="text-xs text-[#6B8073] mt-0.5 font-medium">
                Knowledge records
              </div>
              <div className="text-[10px] text-[#2E7D52] font-semibold mt-1">
                ↑ 12% this month
              </div>
            </div>

            {/* Metric 2: Expert contributors */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E9E3] shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-2">
                <Users className="w-4 h-4 text-[#2E5840]" />
              </div>
              <div className="text-2xl font-serif font-bold text-[#18261E]">
                {expertCount}
              </div>
              <div className="text-xs text-[#6B8073] mt-0.5 font-medium">
                Expert contributors
              </div>
            </div>

            {/* Metric 3: Verified records */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E9E3] shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#E8F6ED] text-[#1D7747] flex items-center justify-center mb-2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-2xl font-serif font-bold text-[#18261E]">
                {verifiedCount}
              </div>
              <div className="text-xs text-[#6B8073] mt-0.5 font-medium">
                Verified records
              </div>
            </div>

            {/* Metric 4: Pending reviews */}
            <div className="bg-white p-4 rounded-2xl border border-[#E2E9E3] shadow-2xs">
              <div className="w-7 h-7 rounded-lg bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-2xl font-serif font-bold text-[#18261E]">
                {pendingCount}
              </div>
              <div className="text-xs text-[#6B8073] mt-0.5 font-medium">
                Pending reviews
              </div>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="bg-white p-5 rounded-3xl border border-[#E2E9E3] shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider">
                Recent Conversations
              </h3>
              <button
                onClick={() => onNavigate("ask")}
                className="text-[11px] font-semibold text-[#29543C] hover:underline"
              >
                View all →
              </button>
            </div>
            <div className="space-y-3">
              {recentConversations.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onAskQuery(item.query)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F4F7F4] cursor-pointer transition-colors group"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#6D8576] mt-0.5 shrink-0 group-hover:text-[#224332]" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#203126] group-hover:text-[#224332] truncate">
                      {item.query}
                    </p>
                    <span className="text-[10px] text-[#869E8F]">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge by Category Progress Bars */}
          <div className="bg-white p-5 rounded-3xl border border-[#E2E9E3] shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider">
                Knowledge by Category
              </h3>
              <button
                onClick={() => onNavigate("library")}
                className="text-[11px] font-semibold text-[#29543C] hover:underline"
              >
                View all →
              </button>
            </div>
            <div className="space-y-3">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-[#203126]">
                      {cat.name}
                    </span>
                    <span className="text-[#6D8576] font-semibold">
                      {cat.count}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#EDF3EF] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#366B50] rounded-full transition-all duration-500"
                      style={{ width: `${cat.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
