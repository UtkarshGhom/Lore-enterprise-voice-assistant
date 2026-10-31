"use client";

import React from "react";
import {
  Home,
  LayoutDashboard,
  MessageSquare,
  Mic,
  BookOpen,
  FolderGit2,
  Share2,
  CheckCircle2,
  Lightbulb,
  Users,
  Layers,
  Settings,
  ChevronRight,
  Sparkles,
  Command,
  Globe,
} from "lucide-react";

export type NavView =
  | "home"
  | "dashboard"
  | "ask"
  | "capture"
  | "library"
  | "collections"
  | "graph"
  | "review"
  | "gaps"
  | "team"
  | "integrations"
  | "settings"
  | "detail";

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  reviewCount?: number;
  onOpenCommandPalette?: () => void;
  onViewWebsite?: () => void;
}

export default function Sidebar({
  currentView,
  onNavigate,
  reviewCount = 3,
  onOpenCommandPalette,
  onViewWebsite,
}: SidebarProps) {
  const sections = [
    {
      group: "Overview",
      items: [
        { id: "home" as NavView, label: "My Workspace", icon: Home },
        { id: "dashboard" as NavView, label: "Executive Pulse", icon: LayoutDashboard },
      ],
    },
    {
      group: "Intelligence",
      items: [
        { id: "ask" as NavView, label: "Ask Lore (Mentor)", icon: MessageSquare },
        { id: "library" as NavView, label: "Knowledge Hub", icon: BookOpen },
        { id: "collections" as NavView, label: "Collections", icon: FolderGit2 },
        { id: "graph" as NavView, label: "Knowledge Graph", icon: Share2 },
      ],
    },
    {
      group: "Creation",
      items: [
        { id: "capture" as NavView, label: "Capture Studio", icon: Mic },
      ],
    },
    {
      group: "People & Governance",
      items: [
        { id: "team" as NavView, label: "People & Expertise", icon: Users },
        {
          id: "review" as NavView,
          label: "Review Queue",
          icon: CheckCircle2,
          badge: reviewCount,
        },
        { id: "gaps" as NavView, label: "Knowledge Gaps", icon: Lightbulb },
      ],
    },
    {
      group: "Enterprise",
      items: [
        { id: "integrations" as NavView, label: "Integrations", icon: Layers },
        { id: "settings" as NavView, label: "Settings", icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#F8FAF7] border-r border-[#E5EBE5] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none overflow-y-auto">
      {/* Top brand */}
      <div className="p-5 pb-2">
        <div
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] flex items-center justify-center text-[#224332] group-hover:scale-105 transition-transform shrink-0">
            <svg
              className="w-5 h-5 fill-current"
              style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px" }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" opacity="0.1"/>
              <path d="M17 3c-3.87 0-7 3.13-7 7 0 1.63.56 3.13 1.5 4.33C9.64 15.65 8 18.63 8 22h2c0-4.42 3.58-8 8-8 1.63 0 3.13.56 4.33 1.5.86-1.42 1.37-3.08 1.37-4.85 0-4.22-3.48-7.65-6.7-7.65zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#1B3629]">
            Lore
          </span>
          <span className="text-[10px] font-mono bg-[#E0ECE3] text-[#244533] px-1.5 py-0.5 rounded font-semibold ml-auto">
            SaaS B2B
          </span>
        </div>

        {/* Global Quick Action buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-[#EEF4EF] text-[#335641] text-xs font-medium rounded-xl border border-[#DCE4DD] transition-colors shadow-2xs"
          >
            <Command className="w-3.5 h-3.5" />
            <span>Search ⌘K</span>
          </button>

          {onViewWebsite && (
            <button
              onClick={onViewWebsite}
              className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-[#EEF4EF] text-[#335641] text-xs font-medium rounded-xl border border-[#DCE4DD] transition-colors shadow-2xs"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Marketing</span>
            </button>
          )}
        </div>

        {/* Navigation grouped sections */}
        <div className="mt-5 space-y-4">
          {sections.map((sec) => (
            <div key={sec.group}>
              <span className="text-[10px] font-bold text-[#7E9689] uppercase tracking-wider px-3 block mb-1">
                {sec.group}
              </span>
              <div className="space-y-0.5">
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    currentView === item.id ||
                    (item.id === "library" && currentView === "detail");

                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#E6EFE8] text-[#1E3E2B] font-semibold shadow-2xs"
                          : "text-[#55695C] hover:bg-[#EEF4EF] hover:text-[#224332]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            isActive ? "text-[#224332]" : "text-[#708477]"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            isActive
                              ? "bg-[#224332] text-white"
                              : "bg-[#E5ECE6] text-[#2D533D]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Pill */}
      <div className="p-4 pt-2">
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E3EAE4] hover:border-[#D1DFD3] transition-colors cursor-pointer group shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#224332] text-white flex items-center justify-center font-medium text-xs font-serif shadow-inner">
              UG
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-[#1B3629] leading-tight">
                Utkarsh Ghom
              </div>
              <div className="text-[10px] text-[#718579] leading-tight">
                Robotics Team · VIT
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8BA093] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </aside>
  );
}
