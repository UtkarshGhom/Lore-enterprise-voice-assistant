"use client";

import React from "react";
import {
  Home,
  MessageSquare,
  Mic,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Users,
  Settings,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export type NavView =
  | "home"
  | "ask"
  | "capture"
  | "library"
  | "review"
  | "gaps"
  | "team"
  | "settings"
  | "detail";

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  reviewCount?: number;
}

export default function Sidebar({
  currentView,
  onNavigate,
  reviewCount = 3,
}: SidebarProps) {
  const navItems = [
    { id: "home" as NavView, label: "Home", icon: Home },
    { id: "ask" as NavView, label: "Ask Lore", icon: MessageSquare },
    { id: "capture" as NavView, label: "Capture", icon: Mic },
    { id: "library" as NavView, label: "Knowledge Library", icon: BookOpen },
    {
      id: "review" as NavView,
      label: "Review Queue",
      icon: CheckCircle2,
      badge: reviewCount,
    },
    { id: "gaps" as NavView, label: "Knowledge Gaps", icon: Lightbulb },
    { id: "team" as NavView, label: "Team", icon: Users },
    { id: "settings" as NavView, label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#F8FAF7] border-r border-[#E5EBE5] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Top brand */}
      <div className="p-5 pb-2">
        <div
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Elegant Botanical Leaf Logo */}
          <div className="w-8 h-8 rounded-lg bg-[#EBF2EC] flex items-center justify-center text-[#224332] group-hover:scale-105 transition-transform">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" opacity="0.1"/>
              <path d="M12 3c-4.97 0-9 4.03-9 9 0 3.12 1.6 5.86 4.02 7.45.1-.38.16-.78.16-1.19 0-2.8-2.2-5-5-5-.06 0-.12.01-.18.01C2.08 12.87 2 12.44 2 12c0-5.52 4.48-10 10-10 3.73 0 7 2.05 8.7 5.1-.42-.06-.85-.1-1.3-.1-3.87 0-7 3.13-7 7 0 1.25.33 2.42.91 3.44C12.88 27.8 12 28 12 28s-5-6-5-12c0-3.31 2.69-6 6-6s6 2.69 6 6c0 1.66-.67 3.16-1.76 4.24L12 22" fill="none"/>
              <path d="M17 3c-3.87 0-7 3.13-7 7 0 1.63.56 3.13 1.5 4.33C9.64 15.65 8 18.63 8 22h2c0-4.42 3.58-8 8-8 1.63 0 3.13.56 4.33 1.5.86-1.42 1.37-3.08 1.37-4.85 0-4.22-3.48-7.65-6.7-7.65zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#1B3629]">
            Lore
          </span>
        </div>

        {/* Navigation list */}
        <nav className="mt-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === "library" && currentView === "detail");

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#E6EFE8] text-[#1E3E2B] font-semibold shadow-xs"
                    : "text-[#55695C] hover:bg-[#EEF4EF] hover:text-[#224332]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#224332]" : "text-[#708477]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
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
        </nav>
      </div>

      {/* Bottom section */}
      <div className="p-4 space-y-3">
        {/* Soft card with botanical quote */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EAF1EB] to-[#E1EDE4] p-3.5 border border-[#D8E6DB]">
          <div className="flex items-start justify-between">
            <span className="text-xs font-semibold text-[#2D5540] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#366B50]" /> Lore Memory
            </span>
            <span className="text-[10px] bg-[#D4E4D7] text-[#224332] px-1.5 py-0.5 rounded-md font-medium">
              v1.0 Live
            </span>
          </div>
          <p className="text-xs text-[#3A5343] mt-2 font-serif italic leading-relaxed">
            “Your organization’s memory, always within reach.”
          </p>
        </div>

        {/* User profile capsule */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#E3EAE4] hover:border-[#D1DFD3] transition-colors cursor-pointer group shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#224332] text-white flex items-center justify-center font-medium text-xs shadow-inner">
              UG
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-[#1B3629] leading-tight">
                Utkarsh Ghom
              </div>
              <div className="text-[11px] text-[#718579] leading-tight">
                CSE-AI · VIT
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8BA093] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </aside>
  );
}
