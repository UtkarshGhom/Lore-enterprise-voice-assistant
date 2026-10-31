"use client";

import React from "react";
import { Search, Bell, Sparkles, RefreshCw } from "lucide-react";

interface HeaderProps {
  onSearchClick?: () => void;
  onQuickSeed?: () => void;
  onOpenPilotKit?: () => void;
  activePersona: "expert" | "learner" | "manager";
  onPersonaChange: (p: "expert" | "learner" | "manager") => void;
}

export default function Header({
  onSearchClick,
  onQuickSeed,
  onOpenPilotKit,
  activePersona,
  onPersonaChange,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-[#E7ECE7] bg-[#F7F9F6]/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left Persona Switcher for Hackathon Demo convenience */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-[#576B5E] uppercase tracking-wider hidden md:inline">
          Demo Persona:
        </span>
        <div className="flex items-center bg-[#EAEFEA] p-0.5 rounded-xl border border-[#DCE4DD]">
          <button
            onClick={() => onPersonaChange("learner")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activePersona === "learner"
                ? "bg-white text-[#1B3629] shadow-2xs font-semibold"
                : "text-[#627769] hover:text-[#224332]"
            }`}
          >
            Learner (New Hire)
          </button>
          <button
            onClick={() => onPersonaChange("expert")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activePersona === "expert"
                ? "bg-white text-[#1B3629] shadow-2xs font-semibold"
                : "text-[#627769] hover:text-[#224332]"
            }`}
          >
            Senior Expert
          </button>
          <button
            onClick={() => onPersonaChange("manager")}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              activePersona === "manager"
                ? "bg-white text-[#1B3629] shadow-2xs font-semibold"
                : "text-[#627769] hover:text-[#224332]"
            }`}
          >
            Team Lead
          </button>
        </div>

        {/* Pilot Kit trigger */}
        {onOpenPilotKit && (
          <button
            onClick={onOpenPilotKit}
            className="hidden lg:flex items-center gap-1.5 text-xs text-[#1E5C38] bg-[#EAF5EE] hover:bg-[#DCEEE2] px-3 py-1.5 rounded-xl font-semibold border border-[#C6E6D1] transition-all ml-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D52]" />
            <span>Pilot Kit (Phase 0/3)</span>
          </button>
        )}
      </div>

      {/* Right controls matching Image 2 */}
      <div className="flex items-center gap-3">
        {/* Global Search Bar */}
        <div
          onClick={onSearchClick}
          className="flex items-center gap-2.5 bg-white border border-[#E3E8E3] hover:border-[#CCD8CE] transition-all px-3 py-1.5 rounded-xl w-64 cursor-pointer shadow-2xs"
        >
          <Search className="w-4 h-4 text-[#7C9083]" />
          <span className="text-xs text-[#809487] flex-1">Search knowledge...</span>
          <kbd className="text-[10px] bg-[#EEF3EF] text-[#4A6253] px-1.5 py-0.5 rounded border border-[#DFE8E1] font-mono">
            ⌘ K
          </kbd>
        </div>

        {/* Quick Reset / Seed button */}
        {onQuickSeed && (
          <button
            onClick={onQuickSeed}
            title="Reset to fresh demo seed"
            className="flex items-center gap-1.5 text-xs text-[#40624E] bg-[#E8F0EA] hover:bg-[#DCE8DF] px-2.5 py-1.5 rounded-xl font-medium border border-[#D1E0D4] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#305940]" />
            <span className="hidden sm:inline">Reset Seed</span>
          </button>
        )}

        {/* Notification Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-white border border-[#E3E8E3] hover:border-[#CCD8CE] flex items-center justify-center text-[#4A6253] transition-colors shadow-2xs">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E05252] ring-2 ring-white"></span>
        </button>

        {/* User Avatar Initial */}
        <div className="w-9 h-9 rounded-xl bg-[#224332] text-white flex items-center justify-center font-medium text-xs font-serif shadow-sm">
          U
        </div>
      </div>
    </header>
  );
}
