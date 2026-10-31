"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Clock,
  Trash2,
  Download,
  Key,
  Users,
  CheckCircle2,
  AlertCircle,
  FileText,
  Search,
  Filter,
} from "lucide-react";

export default function AuditGovernanceView() {
  const [filterAction, setFilterAction] = useState("ALL");
  const [permissionModel, setPermissionModel] = useState<"A" | "B">("A");
  const [audioPurgeDays, setAudioPurgeDays] = useState(30);
  const [isExporting, setIsExporting] = useState(false);

  const auditEvents = [
    {
      id: "evt-109",
      timestamp: "Today, 10:45 AM",
      actor: "Cursor / Claude Agent",
      role: "AI Coding Agent",
      action: "MCP_QUERY",
      badgeColor: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
      target: "get_verified_decision (Billing Service)",
      details: "Agent queried deterministic UUIDv5 idempotency decision before proposing payment retry refactor.",
      hash: "sha256-e3b0c442...991b7852",
    },
    {
      id: "evt-108",
      timestamp: "Today, 10:32 AM",
      actor: "Governance Daemon",
      role: "System Bot",
      action: "RETENTION_PURGE",
      badgeColor: "bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]",
      target: "Policy: Audio Purge After Sign-Off",
      details: "Raw audio buffer purged in compliance with DPDP & GDPR; verified transcript and citations preserved.",
      hash: "sha256-4b227777...cacdabf8",
    },
    {
      id: "evt-107",
      timestamp: "Today, 10:12 AM",
      actor: "Rohit Sharma",
      role: "Hardware Lead",
      action: "PR_DEBRIEF",
      badgeColor: "bg-[#EAF7EF] text-[#1E7445] border-[#C6EAD3]",
      target: "PR #208: Add BNO085 Temperature Compensation",
      details: "Contributor completed 3-question change debrief and published verified decision record rec-1.",
      hash: "sha256-ef2d127d...64afe39d",
    },
    {
      id: "evt-106",
      timestamp: "Yesterday, 3:50 PM",
      actor: "Karan Mehta",
      role: "DevOps Engineer",
      action: "SECOND_REVIEW_SIGNOFF",
      badgeColor: "bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]",
      target: "rec-3: Production Deployment Guide",
      details: "Second reviewer sign-off completed for designated mission-critical Kubernetes deployment SOP.",
      hash: "sha256-8c6976e5...448a918e",
    },
    {
      id: "evt-105",
      timestamp: "Yesterday, 1:15 PM",
      actor: "Utkarsh Ghom",
      role: "Learner (New Hire)",
      action: "PERMISSION_CHECK",
      badgeColor: "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]",
      target: "rec-2: Billing Idempotency Keys Architecture",
      details: "Pre-retrieval authorization verified: private drafts excluded, only approved content served.",
      hash: "sha256-a591a6d4...9ad9f146",
    },
  ];

  const filteredEvents = auditEvents.filter(
    (e) => filterAction === "ALL" || e.action.includes(filterAction)
  );

  const handleExportJSON = () => {
    setIsExporting(true);
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditEvents, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `lore-audit-log-${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setTimeout(() => setIsExporting(false), 800);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            ENTERPRISE GOVERNANCE & AUDITABILITY
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Governance & Audit Trail
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Immutable security log, automated data retention policies, and role permission enforcement.
          </p>
        </div>

        <button
          onClick={handleExportJSON}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-[#F2F6F3] border border-[#D5E1D8] text-xs font-semibold text-[#294B37] shadow-2xs transition-all"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isExporting ? "Exporting..." : "Export Audit Log (JSON)"}</span>
        </button>
      </div>

      {/* 1. Retention & Privacy Policy Controls (Strategy Section 8.7) */}
      <div className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EEF3EF]">
          <Trash2 className="w-4 h-4 text-[#2E5840]" />
          <h3 className="font-semibold text-sm text-[#18261E]">
            Data Retention & Privacy Enforcement (GDPR & DPDP Compliant)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-2">
            <span className="text-[10px] font-semibold text-[#2E5840] uppercase tracking-wider block">
              Audio Storage Window
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={audioPurgeDays}
                onChange={(e) => setAudioPurgeDays(Number(e.target.value))}
                className="w-16 bg-white border border-[#D5E1D8] text-xs font-semibold p-1.5 rounded-lg text-center focus:outline-none"
              />
              <span className="text-xs text-[#4E6657]">days after approval</span>
            </div>
            <p className="text-[11px] text-[#718D7E]">
              Raw audio bytes are automatically purged after transcript confirmation.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-2">
            <span className="text-[10px] font-semibold text-[#2E5840] uppercase tracking-wider block">
              Review Cycle Revalidation
            </span>
            <div className="text-sm font-semibold text-[#18261E]">
              Every 90 Days
            </div>
            <p className="text-[11px] text-[#718D7E]">
              Flags critical decisions as &ldquo;Review Due&rdquo; if not validated within 90 days.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-2">
            <span className="text-[10px] font-semibold text-[#2E5840] uppercase tracking-wider block">
              Source Evidence Storage
            </span>
            <div className="text-sm font-semibold text-[#18261E]">
              Excerpts & References Only
            </div>
            <p className="text-[11px] text-[#718D7E]">
              Lore never stores full repository copies; only cited diffs and spans.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Permission Model Selector (Strategy Section 7.3) */}
      <div className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#EEF3EF]">
          <Key className="w-4 h-4 text-[#2E5840]" />
          <h3 className="font-semibold text-sm text-[#18261E]">
            Authorization Model (Strategy Decision 7.3)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setPermissionModel("A")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              permissionModel === "A"
                ? "bg-[#F3F8F5] border-[#224332] shadow-2xs"
                : "bg-white border-[#E2EBE4] hover:bg-[#FAFBF9]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-[#18261E]">
                Option A: Workspace-Wide Corpus (Pilot Default)
              </h4>
              <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded font-semibold">
                Recommended
              </span>
            </div>
            <p className="text-[11px] text-[#637E6F] mt-1.5 leading-relaxed">
              All team members see verified records from connected repositories. Private drafts remain strictly restricted to authors.
            </p>
          </div>

          <div
            onClick={() => setPermissionModel("B")}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              permissionModel === "B"
                ? "bg-[#F3F8F5] border-[#224332] shadow-2xs"
                : "bg-white border-[#E2EBE4] hover:bg-[#FAFBF9]"
            }`}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-[#18261E]">
                Option B: Repository-Scoped Visibility
              </h4>
              <span className="text-[10px] bg-[#EEF4EF] text-[#4E6657] px-2 py-0.5 rounded font-semibold">
                Enterprise
              </span>
            </div>
            <p className="text-[11px] text-[#637E6F] mt-1.5 leading-relaxed">
              Records inherit granular access rules from the connected GitHub repo; verified against the user&apos;s GitHub OAuth identity.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Real-Time Immutable Audit Log Stream */}
      <div className="bg-white rounded-3xl border border-[#DCE5DF] shadow-card overflow-hidden">
        <div className="p-5 border-b border-[#EEF3EF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-sm text-[#18261E]">
              Immutable Audit Events
            </h3>
            <p className="text-xs text-[#6B8073]">
              Every creation, approval, MCP agent query, and purge is cryptographically hashed.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-[#F2F6F3] p-1 rounded-xl text-xs font-medium">
            {["ALL", "MCP", "PR_DEBRIEF", "RETENTION", "PERMISSION"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterAction(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors ${
                  filterAction === cat
                    ? "bg-white text-[#18261E] font-semibold shadow-2xs"
                    : "text-[#5A7968] hover:text-[#18261E]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#EEF3EF]">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="p-4 sm:p-5 hover:bg-[#FAFBF9] transition-colors space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold border ${evt.badgeColor}`}>
                    {evt.action}
                  </span>
                  <span className="text-xs font-semibold text-[#18261E]">
                    {evt.target}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#789384]">
                  <span>{evt.actor} ({evt.role})</span>
                  <span>•</span>
                  <span>{evt.timestamp}</span>
                </div>
              </div>

              <p className="text-xs text-[#526F5E] leading-relaxed">
                {evt.details}
              </p>

              <div className="flex items-center gap-2 text-[10px] font-mono text-[#8BA294] pt-1">
                <span>Proof:</span>
                <span className="bg-[#F8FAF8] px-2 py-0.5 rounded border border-[#E2EBE5] select-all">
                  {evt.hash}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
