"use client";

import React, { useState } from "react";
import {
  GitCommit,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  Filter,
} from "lucide-react";
import { initialKnowledgeRecords, KnowledgeRecord } from "@/lib/data";

interface DecisionTimelineViewProps {
  onSelectRecord: (record: KnowledgeRecord) => void;
}

export default function DecisionTimelineView({ onSelectRecord }: DecisionTimelineViewProps) {
  const [selectedSystem, setSelectedSystem] = useState("all");

  const timelineItems = [
    {
      id: "dec-1",
      date: "Oct 18, 2026",
      system: "Industrial Robotics Field Units (Gen-4)",
      pr: "PR #208: Add BNO085 Polynomial Temperature Compensation",
      decision: "5-point polynomial compensation curve replaces single-point calibration",
      author: "Rohit Sharma",
      status: "verified",
      freshness: "Active & Verified",
      freshnessColor: "text-[#1E7445] bg-[#E8F6ED] border-[#C5E9D3]",
      recordId: "rec-1",
      alternatives: "Rejected Peltier cooler due to 12W power penalty and $140 BOM increase.",
      supersedes: "Supersedes 2024 single-point calibration SOP.",
    },
    {
      id: "dec-2",
      date: "Oct 15, 2026",
      system: "Core Billing & Stripe Gateway",
      pr: "PR #142: Enforce Deterministic UUIDv5 Idempotency Headers",
      decision: "Deterministic UUIDv5 with 24-hr sliding window across all payment retries",
      author: "Ananya Kulkarni",
      status: "verified",
      freshness: "Active & Verified",
      freshnessColor: "text-[#1E7445] bg-[#E8F6ED] border-[#C5E9D3]",
      recordId: "rec-2",
      alternatives: "Rejected DB row locking due to connection exhaustion during flash sales.",
      supersedes: "Supersedes naive client retry logic.",
    },
    {
      id: "dec-3",
      date: "Oct 12, 2026",
      system: "Kubernetes ArgoCD Infrastructure",
      pr: "PR #389: PreStop Hook 30s & Readiness Probe Tuning",
      decision: "30s container preStop grace period before traffic swap during canary releases",
      author: "Karan Mehta",
      status: "review_due",
      freshness: "Review Due in 14 Days",
      freshnessColor: "text-[#C2410C] bg-[#FFF7ED] border-[#FED7AA]",
      recordId: "rec-3",
      alternatives: "Rejected DNS traffic shifting due to client DNS caching TTL delays.",
      supersedes: "Supersedes default k8s 25% maxUnavailable rollout.",
    },
    {
      id: "dec-4",
      date: "Oct 10, 2026",
      system: "Arm Actuator Joint 2 & 3",
      pr: "PR #112: Integrated GaN Power Stage Migration",
      decision: "Upgraded discrete MOSFETs to integrated gallium nitride drivers",
      author: "Priya Desai",
      status: "verified",
      freshness: "Active & Verified",
      freshnessColor: "text-[#1E7445] bg-[#E8F6ED] border-[#C5E9D3]",
      recordId: "rec-4",
      alternatives: "Rejected larger cooling fans due to hospital acoustic noise violations.",
      supersedes: "Supersedes legacy Silicon MOSFET driver PCB rev 2.1.",
    },
    {
      id: "dec-5",
      date: "Oct 08, 2026",
      system: "Field Support Toolkit",
      pr: "PR #094: Diagnostic Acoustic Lubrication Flowchart",
      decision: "On-site acoustic frequency check to differentiate bearing wear from dry grease",
      author: "Aayush Patil",
      status: "draft",
      freshness: "Under Initial Review",
      freshnessColor: "text-[#475569] bg-[#F1F5F9] border-[#E2E8F0]",
      recordId: "rec-5",
      alternatives: "Rejected default factory gearbox RMA ($4,200 savings per false RMA).",
      supersedes: "New protocol.",
    },
  ];

  const filtered = timelineItems.filter(
    (item) => selectedSystem === "all" || item.system.toLowerCase().includes(selectedSystem.toLowerCase())
  );

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            DECISION INTELLIGENCE & FRESHNESS
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Architectural Decision History
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Understand how engineering choices evolved over time, which PRs introduced them, and which decisions are superseded.
          </p>
        </div>

        {/* System Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#5A7968]" />
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="bg-white border border-[#D5E1D8] text-xs font-semibold text-[#18261E] px-3 py-1.5 rounded-xl focus:outline-none"
          >
            <option value="all">All Systems & Services</option>
            <option value="Billing">Billing & Stripe</option>
            <option value="Robotics">Robotics & Field Units</option>
            <option value="Kubernetes">Kubernetes & DevOps</option>
            <option value="Actuator">Motor Actuators</option>
          </select>
        </div>
      </div>

      {/* Conflict & Freshness Alert Banner */}
      <div className="p-4 rounded-2xl bg-[#F6FAF7] border border-[#CFE0D3] flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-[#2E7D52] shrink-0 mt-0.5" />
        <div className="text-xs text-[#3E5C4A] leading-relaxed">
          <strong>Decision Freshness Guarantee:</strong> Lore monitors merged pull requests against verified decisions. When a new PR touches the same subsystem, Lore prompts the author to confirm if the prior decision remains valid or is superseded.
        </div>
      </div>

      {/* Relational Timeline Stream */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#DCE6DF] space-y-8 my-4">
        {filtered.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline bullet icon */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#224332] flex items-center justify-center shadow-xs">
              <GitCommit className="w-3.5 h-3.5 text-[#224332]" />
            </div>

            {/* Decision Card */}
            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card hover:shadow-elevated hover:border-[#BED6C6] transition-all space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#1E3E2B] bg-[#EBF2EC] px-2.5 py-0.5 rounded-md">
                    {item.pr.split(":")[0]}
                  </span>
                  <span className="text-xs font-semibold text-[#6E8879]">
                    {item.system}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${item.freshnessColor}`}>
                    {item.freshness}
                  </span>
                  <span className="text-xs text-[#8BA193]">{item.date}</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-lg font-bold text-[#18261E]">
                  {item.decision}
                </h3>
                <p className="text-xs text-[#52705E] mt-1 font-mono text-[11px]">
                  {item.pr}
                </p>
              </div>

              {/* Rationale & Alternatives */}
              <div className="p-3.5 rounded-2xl bg-[#FAFBF9] border border-[#DEE7E0] text-xs space-y-1.5">
                <div className="text-[#324B3C]">
                  <strong>Evaluated Alternatives:</strong> {item.alternatives}
                </div>
                <div className="text-[11px] text-[#698474]">
                  <strong>Lifecycle:</strong> {item.supersedes}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-[#6F8879]">
                  Authored & Verified by <strong>{item.author}</strong>
                </span>

                <button
                  onClick={() => {
                    const match = initialKnowledgeRecords.find((r) => r.id === item.recordId);
                    if (match) onSelectRecord(match);
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#224332] hover:underline"
                >
                  <span>Inspect Decision Record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
