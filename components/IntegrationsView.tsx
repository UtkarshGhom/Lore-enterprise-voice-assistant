"use client";

import React, { useState } from "react";
import { CheckCircle2, RefreshCw, ExternalLink, ArrowRight, Shield } from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  category: string;
  status: "connected" | "not_connected";
  lastSync: string;
  iconBg: string;
}

export default function IntegrationsView() {
  const [integrations, setIntegrations] = useState<IntegrationItem[]>([
    {
      id: "slack",
      name: "Slack",
      category: "Messaging & Real-time Discussions",
      status: "connected",
      lastSync: "2 hours ago",
      iconBg: "#4A154B",
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      category: "Calls & Meeting Transcripts",
      status: "connected",
      lastSync: "4 hours ago",
      iconBg: "#5059C9",
    },
    {
      id: "github",
      name: "GitHub",
      category: "Pull Requests, Code & Commits",
      status: "connected",
      lastSync: "1 day ago",
      iconBg: "#24292E",
    },
    {
      id: "jira",
      name: "Jira Software",
      category: "Sprint Issues & Incident Post-mortems",
      status: "not_connected",
      lastSync: "Never",
      iconBg: "#0052CC",
    },
    {
      id: "confluence",
      name: "Confluence",
      category: "Legacy Documentation & Specs",
      status: "not_connected",
      lastSync: "Never",
      iconBg: "#172B4D",
    },
    {
      id: "gdrive",
      name: "Google Drive",
      category: "Specs, Slide Decks & Spreadsheets",
      status: "not_connected",
      lastSync: "Never",
      iconBg: "#0F9D58",
    },
  ]);

  const toggleConnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "connected" ? "not_connected" : "connected",
              lastSync: item.status === "connected" ? "Disconnected" : "Just now",
            }
          : item
      )
    );
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
          CONNECTED WORKSPACE
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#18261E]">
          Integrations Marketplace
        </h1>
        <p className="text-xs text-[#6B8073] mt-0.5">
          Connect your organization&apos;s existing software suite to keep Lore synchronized without manual data entry.
        </p>
      </div>

      {/* Security Banner */}
      <div className="p-4 rounded-2xl bg-[#EAF2ED] border border-[#CFE0D4] flex items-start gap-3">
        <Shield className="w-5 h-5 text-[#2E7D52] shrink-0 mt-0.5" />
        <div className="text-xs text-[#3C5846] leading-relaxed">
          <strong>Access-Aware Permission Inheritance:</strong> Lore honors existing permission boundaries from source repositories and messaging channels. Employees will never retrieve knowledge they aren&apos;t authorized to see.
        </div>
      </div>

      {/* Integrations List matching Screen 11 */}
      <div className="bg-white rounded-3xl border border-[#DCE5DF] divide-y divide-[#EDF3EF] shadow-card overflow-hidden">
        {integrations.map((app) => (
          <div
            key={app.id}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAFBF9] transition-colors"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0"
                style={{ backgroundColor: app.iconBg }}
              >
                {app.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-[#18261E]">
                  {app.name}
                </h3>
                <p className="text-xs text-[#688273]">
                  {app.category}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${
                      app.status === "connected"
                        ? "bg-[#E8F6ED] text-[#1E7445] border-[#C5E9D3]"
                        : "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]"
                    }`}
                  >
                    {app.status === "connected" ? "● Connected" : "○ Not connected"}
                  </span>
                  <span className="text-[10px] text-[#869E8F]">
                    Last sync: {app.lastSync}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {app.status === "connected" && (
                <button
                  onClick={() => toggleConnect(app.id)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-[#D5E1D8] hover:bg-[#F2F6F3] text-xs font-semibold text-[#294B37] transition-colors"
                >
                  Manage
                </button>
              )}

              <button
                onClick={() => toggleConnect(app.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                  app.status === "connected"
                    ? "bg-[#FEE2E2] hover:bg-[#FCA5A5] text-[#991B1B]"
                    : "bg-[#224332] hover:bg-[#1B3629] text-white"
                }`}
              >
                {app.status === "connected" ? "Disconnect" : "Connect"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
