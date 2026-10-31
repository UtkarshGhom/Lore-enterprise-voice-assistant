"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Edit3,
  Clock,
  Sparkles,
  Volume2,
  Play,
  Share2,
  Calendar,
  Tag,
  AlertTriangle,
  FileText,
  ShieldCheck,
  Check,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface KnowledgeDetailViewProps {
  record: KnowledgeRecord;
  onBack: () => void;
  onApproveRecord: (id: string) => void;
}

export default function KnowledgeDetailView({
  record,
  onBack,
  onApproveRecord,
}: KnowledgeDetailViewProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "transcript" | "keypoints" | "related" | "activity"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(record.title);
  const [editedSummary, setEditedSummary] = useState(record.summary);
  const [isApproved, setIsApproved] = useState(record.status === "verified");

  const handleApprove = () => {
    setIsApproved(true);
    onApproveRecord(record.id);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Top Navigation & Status Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-[#547361] hover:text-[#18261E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Status Badge */}
          {isApproved ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EAF7EF] text-[#1E7445] border border-[#C6EAD3]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified & Grounded
            </span>
          ) : (
            <button
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#224332] hover:bg-[#1B3629] text-white shadow-sm transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              Approve & Index to Memory
            </button>
          )}

          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D5E1D8] hover:bg-[#F2F6F3] rounded-xl text-xs font-semibold text-[#294935] transition-colors shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Done Editing" : "Edit"}</span>
          </button>
        </div>
      </div>

      {/* Main Title Banner matching Screen 5 */}
      <div className="bg-white rounded-3xl border border-[#DCE6DF] p-8 shadow-card space-y-6">
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="font-serif text-3xl font-bold text-[#18261E] w-full border-b border-[#224332] pb-1 focus:outline-none"
            />
          ) : (
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#18261E]">
              {editedTitle}
            </h1>
          )}

          {isEditing ? (
            <textarea
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              rows={2}
              className="text-sm text-[#577263] mt-2 w-full p-2 border border-[#D5E1D8] rounded-xl focus:outline-none focus:border-[#224332]"
            />
          ) : (
            <p className="text-sm text-[#577263] mt-2 leading-relaxed">
              {editedSummary}
            </p>
          )}
        </div>

        {/* Tab Navigation matching Image 1 Screen 5 */}
        <div className="flex items-center gap-2 border-b border-[#EEF3EF] pb-1">
          {[
            { id: "overview", label: "Overview" },
            { id: "transcript", label: "Transcript" },
            { id: "keypoints", label: "Key Points" },
            { id: "related", label: "Related" },
            { id: "activity", label: "Activity" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold transition-all relative ${
                activeTab === tab.id
                  ? "text-[#1E3E2B]"
                  : "text-[#6E8879] hover:text-[#224332]"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#224332] rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Metadata grid bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] text-xs">
          <div>
            <span className="text-[10px] font-semibold text-[#7E9689] uppercase tracking-wider block">
              Contributor
            </span>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={record.contributor.avatar}
                alt={record.contributor.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span className="font-semibold text-[#18261E]">
                {record.contributor.name}
              </span>
            </div>
            <span className="text-[10px] text-[#789183]">
              {record.contributor.role}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-[#7E9689] uppercase tracking-wider block">
              Linked Change / PR
            </span>
            <span className="font-semibold text-[#18261E] mt-1 block font-mono text-xs">
              {record.linkedPR || "PR #208 (Merged)"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-[#7E9689] uppercase tracking-wider block">
              Applicable System
            </span>
            <span className="font-semibold text-[#18261E] mt-1 block truncate">
              {record.systemOrProject || "Core Platform"}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-[#7E9689] uppercase tracking-wider block">
              Status
            </span>
            <span
              className={`font-semibold mt-1 inline-block ${
                isApproved ? "text-[#1E7445]" : "text-[#C2410C]"
              }`}
            >
              {isApproved ? "✓ Verified & Active" : "⏳ Pending Review"}
            </span>
          </div>
        </div>

        {/* Alternatives Considered (Differentiator from v2.0 Strategy) */}
        {record.alternativesConsidered && record.alternativesConsidered.length > 0 && (
          <div className="p-6 rounded-2xl bg-[#FAFBF9] border border-[#DEECE2] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#2E5840]" />
              <h3 className="font-semibold text-xs text-[#203427] uppercase tracking-wider">
                Alternatives Considered & Evaluated
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {record.alternativesConsidered.map((alt, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white border border-[#E2EBE5] text-xs text-[#284032] flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#366B50] mt-1.5 shrink-0" />
                  <span>{alt}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio / Video Interview preview card matching Screen 5 */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D5E1D8] group">
          <img
            src={record.thumbnail}
            alt="Interview Session"
            className="w-full h-48 sm:h-64 object-cover brightness-75 group-hover:scale-102 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-6">
            <div className="flex justify-end">
              <span className="bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-lg font-mono">
                {record.audioDuration || "04:32"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-full bg-[#224332] text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
                <div className="text-white">
                  <h4 className="text-sm font-semibold">
                    Listen to Expert Voice Capture
                  </h4>
                  <p className="text-xs text-white/80">
                    With adaptive interviewer follow-ups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Insights (AI Generated) bullet points matching Screen 5 */}
        <div className="p-6 rounded-2xl bg-[#F6FAF7] border border-[#D7E6DC] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2E5840]" />
            <h3 className="font-semibold text-xs text-[#203427] uppercase tracking-wider">
              Key Insights (AI Generated & Human Verified)
            </h3>
          </div>
          <ul className="space-y-2.5">
            {(record.keyInsights || [
              "Previous single-point calibration caused drift under high temperature (>35°C).",
              "New multi-point calibration improves accuracy by ~32% in outdoor field trials.",
              "Temperature compensation is critical for outdoor deployments to prevent yaw drift.",
              "Field teams must use the provided calibration tool and follow the 5-step checklist.",
            ]).map((insight, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-xs text-[#2E4638] leading-relaxed"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#366B50] mt-1.5 shrink-0" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Decision & Rationale section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E2EAE3] space-y-2">
            <h4 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider">
              Context & Problem
            </h4>
            <p className="text-xs text-[#526D5D] leading-relaxed">
              {record.context ||
                "Sensors in outdoor installations reported unexpected orientation deviations due to ambient heating."}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E2EAE3] space-y-2">
            <h4 className="font-semibold text-xs text-[#18261E] uppercase tracking-wider">
              Decision & Procedure
            </h4>
            <p className="text-xs text-[#526D5D] leading-relaxed">
              {record.decisionOrProcedure ||
                "Transitioned to quadratic polynomial calibration curves across 5 thermal setpoints."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
