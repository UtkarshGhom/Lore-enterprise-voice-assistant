"use client";

import React from "react";
import { Search, Bell, Sparkles, Building2, CheckCircle2, ChevronDown } from "lucide-react";
import { UserSession } from "./AuthModal";

interface HeaderProps {
  currentUser: UserSession | null;
  onSearchClick?: () => void;
  onOpenPilotKit?: () => void;
  onUserMenuClick?: () => void;
}

export default function Header({
  currentUser,
  onSearchClick,
  onOpenPilotKit,
  onUserMenuClick,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-[#E7ECE7] bg-[#F7F9F6]/85 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Clean Enterprise Workspace Context (Section 2 Item 7 Polish) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#DCE4DD] shadow-2xs">
          <div className="w-5 h-5 rounded-md bg-[#E8F0EA] flex items-center justify-center text-[#1E3E2B]">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold text-[#18261E]">
            Northstar Systems
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          <span className="text-[10px] font-mono text-[#5A7968] bg-[#EEF4EF] px-1.5 py-0.5 rounded">
            main
          </span>
        </div>

        {/* Design Partner Pilot Kit trigger */}
        {onOpenPilotKit && (
          <button
            onClick={onOpenPilotKit}
            className="hidden lg:flex items-center gap-1.5 text-xs text-[#1E5C38] bg-[#EAF5EE] hover:bg-[#DCEEE2] px-3 py-1.5 rounded-xl font-semibold border border-[#C6E6D1] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D52]" />
            <span>Pilot Kit (Phase 0/3)</span>
          </button>
        )}
      </div>

      {/* Right controls matching Polish Guide */}
      <div className="flex items-center gap-3">
        {/* Single Global Search Bar (Section 2 Item 9 Polish) */}
        <div
          onClick={onSearchClick}
          className="flex items-center gap-2.5 bg-white border border-[#E3E8E3] hover:border-[#CCD8CE] transition-all px-3 py-1.5 rounded-xl w-60 sm:w-72 cursor-pointer shadow-2xs"
        >
          <Search className="w-4 h-4 text-[#7C9083]" />
          <span className="text-xs text-[#809487] flex-1">Search knowledge, people, PRs...</span>
          <kbd className="text-[10px] bg-[#EEF3EF] text-[#4A6253] px-1.5 py-0.5 rounded border border-[#DFE8E1] font-mono">
            ⌘ K
          </kbd>
        </div>

        {/* Notification Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-white border border-[#E3E8E3] hover:border-[#CCD8CE] flex items-center justify-center text-[#4A6253] transition-colors shadow-2xs">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D97706] ring-2 ring-white" />
        </button>

        {/* User Mini Avatar / Menu */}
        {currentUser && (
          <div
            onClick={onUserMenuClick}
            className="flex items-center gap-2 pl-1 cursor-pointer group select-none"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-8 h-8 rounded-full object-cover border border-[#D5E1D8] group-hover:ring-2 group-hover:ring-[#224332]/20 transition-all"
            />
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-[#18261E] leading-tight">
                {currentUser.name}
              </div>
              <div className="text-[10px] text-[#698474] leading-tight">
                {currentUser.role}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
