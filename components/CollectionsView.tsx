"use client";

import React from "react";
import { FolderGit2, BookOpen, Users, CheckCircle2, Clock, ArrowRight } from "lucide-react";

interface CollectionsViewProps {
  onSelectCollection: (colTitle: string) => void;
}

export default function CollectionsView({ onSelectCollection }: CollectionsViewProps) {
  const collections = [
    {
      id: "col-1",
      title: "Engineering Handbook",
      description: "Core architectural guidelines, development workflows, and standard operating procedures.",
      recordCount: 42,
      contributorsCount: 8,
      status: "verified",
      topics: ["Hardware Architecture", "Development Workflows", "Deployment & Security", "Troubleshooting"],
    },
    {
      id: "col-2",
      title: "Project Apollo",
      description: "Dedicated intelligence repository for next-generation industrial robotics platform.",
      recordCount: 18,
      contributorsCount: 5,
      status: "review_due",
      topics: ["Architecture Decisions", "CAN Bus Protocol", "Thermal Dissipation", "Field Trials"],
    },
    {
      id: "col-3",
      title: "Field Operations & Maintenance",
      description: "Practical guides and failure diagnosis procedures for on-site field engineers.",
      recordCount: 15,
      contributorsCount: 4,
      status: "verified",
      topics: ["Harmonic Reducers", "Sensor Drift", "Emergency Lockout", "Lubrication Schedules"],
    },
    {
      id: "col-4",
      title: "Incident Post-Mortems",
      description: "Root-cause analyses and preventative actions captured from production outages.",
      recordCount: 9,
      contributorsCount: 6,
      status: "verified",
      topics: ["Billing Timeouts", "DNS Failover", "Kubernetes Evictions", "Database Deadlocks"],
    },
  ];

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      <div>
        <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
          CURATED WORKSPACES
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#18261E]">
          Knowledge Collections
        </h1>
        <p className="text-xs text-[#6B8073] mt-0.5">
          Curated knowledge spaces for specific teams, projects, and mission-critical workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((col) => (
          <div
            key={col.id}
            onClick={() => onSelectCollection(col.title)}
            className="bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card hover:shadow-elevated hover:border-[#BED6C6] transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <FolderGit2 className="w-4 h-4 text-[#2B563E]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#18261E] group-hover:text-[#224332] transition-colors">
                    {col.title}
                  </h3>
                </div>

                {col.status === "verified" ? (
                  <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2.5 py-0.5 rounded-full font-semibold border border-[#C5E9D3] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="text-[10px] bg-[#FFF7ED] text-[#C2410C] px-2.5 py-0.5 rounded-full font-semibold border border-[#FED7AA] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Review due
                  </span>
                )}
              </div>

              <p className="text-xs text-[#637F70] leading-relaxed mb-4">
                {col.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {col.topics.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] bg-[#F1F6F2] text-[#335C43] px-2 py-0.5 rounded-md border border-[#D6E4DB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#EDF3EE] flex items-center justify-between text-xs text-[#718B7D]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {col.recordCount} records
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> {col.contributorsCount} contributors
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#2E5840] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
