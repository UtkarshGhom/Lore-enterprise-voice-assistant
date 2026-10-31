"use client";

import React, { useState } from "react";
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
  ChevronDown,
  ChevronLeft,
  Sparkles,
  Globe,
  ShieldCheck,
  GitCommit,
  LogOut,
  UserCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { UserSession } from "./AuthModal";

export type NavView =
  | "home"
  | "dashboard"
  | "ask"
  | "capture"
  | "library"
  | "timeline"
  | "collections"
  | "graph"
  | "review"
  | "gaps"
  | "evals"
  | "team"
  | "integrations"
  | "governance"
  | "settings"
  | "detail";

interface SidebarProps {
  currentView: NavView;
  onNavigate: (view: NavView) => void;
  reviewCount?: number;
  currentUser: UserSession | null;
  onSignOut: () => void;
  onViewWebsite?: () => void;
  onSwitchPersona?: () => void;
}

export default function Sidebar({
  currentView,
  onNavigate,
  reviewCount = 3,
  currentUser,
  onSignOut,
  onViewWebsite,
  onSwitchPersona,
}: SidebarProps) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Core navigation items (Polish Guide Section 5.1: 5-6 core items default visible)
  const coreItems = [
    { id: "home" as NavView, label: "My Workspace", icon: Home },
    { id: "dashboard" as NavView, label: "Executive Pulse", icon: LayoutDashboard },
    { id: "ask" as NavView, label: "Ask Lore (Mentor)", icon: MessageSquare },
    { id: "capture" as NavView, label: "Capture Studio", icon: Mic },
    { id: "library" as NavView, label: "Knowledge Hub", icon: BookOpen },
    {
      id: "review" as NavView,
      label: "Review Queue",
      icon: CheckCircle2,
      badge: reviewCount,
    },
  ];

  // Secondary items in collapsible "More..." group
  const moreItems = [
    { id: "timeline" as NavView, label: "Decision History", icon: GitCommit },
    { id: "collections" as NavView, label: "Collections", icon: FolderGit2 },
    { id: "graph" as NavView, label: "Knowledge Graph", icon: Share2 },
    { id: "team" as NavView, label: "People & Expertise", icon: Users },
    { id: "gaps" as NavView, label: "Knowledge Gaps", icon: Lightbulb },
    { id: "evals" as NavView, label: "Evals & MCP Studio", icon: ShieldCheck },
    { id: "integrations" as NavView, label: "Integrations", icon: Layers },
    { id: "governance" as NavView, label: "Audit & Retention", icon: ShieldCheck },
    { id: "settings" as NavView, label: "Settings", icon: Settings },
  ];

  const isMoreActive = moreItems.some((item) => currentView === item.id);

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-[#F8FAF7] border-r border-[#E5EBE5] flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none transition-all duration-200 z-30`}
    >
      {/* Top brand & navigation list */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col">
        {/* Brand header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8EEE8]">
          <div
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EBF2EC] flex items-center justify-center text-[#224332] group-hover:scale-105 transition-transform shrink-0 border border-[#D7E4DA]">
              <svg
                className="w-5 h-5 fill-current"
                style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px" }}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  opacity="0.1"
                />
                <path d="M17 3c-3.87 0-7 3.13-7 7 0 1.63.56 3.13 1.5 4.33C9.64 15.65 8 18.63 8 22h2c0-4.42 3.58-8 8-8 1.63 0 3.13.56 4.33 1.5.86-1.42 1.37-3.08 1.37-4.85 0-4.22-3.48-7.65-6.7-7.65zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </div>
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-[#1B3629]">
                  Lore
                </span>
                <span className="text-[10px] font-mono bg-[#E0ECE3] text-[#244533] px-2 py-0.5 rounded-full font-semibold">
                  Enterprise
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[#688274] hover:text-[#18261E] p-1.5 rounded-lg hover:bg-[#EEF4EF] transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse to icon rail"}
          >
            {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Core Navigation Items */}
        <div className="mt-4 space-y-1">
          {coreItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === "library" && currentView === "detail");

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={isCollapsed ? item.label : undefined}
                className={`w-full relative flex items-center ${
                  isCollapsed ? "justify-center px-0 py-2.5" : "justify-between px-3 py-2"
                } rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#E6EFE8] text-[#1E3E2B] font-semibold shadow-2xs"
                    : "text-[#55695C] hover:bg-[#EEF4EF] hover:text-[#224332]"
                }`}
              >
                {/* 3px leading bar on active item (Section 5.1 Polish) */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-[#1E3E2B] rounded-r" />
                )}

                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? "text-[#224332]" : "text-[#708477]"
                    }`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </div>

                {!isCollapsed && item.badge !== undefined && (
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

                {isCollapsed && item.badge !== undefined && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-[#1E3E2B]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Collapsible "More..." Group (Polish Guide Section 5.1 & Fix 10) */}
        {!isCollapsed ? (
          <div className="mt-4 pt-3 border-t border-[#E8EEE8]">
            <button
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#668273] hover:text-[#18261E] rounded-xl hover:bg-[#EEF4EF] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span>More Features & Tools</span>
                {isMoreActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E3E2B]" />
                )}
              </div>
              {isMoreOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-[#7C9587]" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-[#7C9587]" />
              )}
            </button>

            {isMoreOpen && (
              <div className="mt-1 space-y-0.5 pl-1.5 animate-in fade-in duration-150">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full relative flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#E6EFE8] text-[#1E3E2B] font-semibold"
                          : "text-[#55695C] hover:bg-[#EEF4EF] hover:text-[#224332]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1 bottom-1 w-[3px] bg-[#1E3E2B] rounded-r" />
                      )}
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-3.5 h-3.5 ${
                            isActive ? "text-[#224332]" : "text-[#708477]"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 pt-2 border-t border-[#E8EEE8] space-y-1">
            {moreItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  title={item.label}
                  className={`w-full relative flex items-center justify-center py-2 rounded-xl transition-all ${
                    isActive
                      ? "bg-[#E6EFE8] text-[#1E3E2B]"
                      : "text-[#55695C] hover:bg-[#EEF4EF]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom User Profile Capsule & Dropdown Menu */}
      <div className="p-3 border-t border-[#E5EBE5] relative">
        {/* User profile dropdown if toggled */}
        {isUserMenuOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-white rounded-2xl border border-[#D5E1D8] shadow-elevated p-2 text-xs space-y-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-150">
            {onSwitchPersona && (
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onSwitchPersona();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#244533] hover:bg-[#F2F6F3] font-medium transition-colors text-left"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#2E7D52]" />
                <span>Switch Role Persona</span>
              </button>
            )}

            {onViewWebsite && (
              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  onViewWebsite();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#244533] hover:bg-[#F2F6F3] font-medium transition-colors text-left"
              >
                <Globe className="w-3.5 h-3.5 text-[#2E7D52]" />
                <span>Marketing Website</span>
              </button>
            )}

            <div className="h-px bg-[#EEF3EF] my-1" />

            <button
              onClick={() => {
                setIsUserMenuOpen(false);
                onSignOut();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[#B91C1C] hover:bg-[#FEF2F2] font-semibold transition-colors text-left"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        )}

        <div
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className={`flex items-center ${
            isCollapsed ? "justify-center p-2" : "justify-between p-2.5"
          } rounded-xl bg-white border border-[#E3EAE4] hover:border-[#D1DFD3] transition-all cursor-pointer group shadow-2xs`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-[#D5E1D8] shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#224332] text-white flex items-center justify-center font-medium text-xs font-serif shadow-inner shrink-0">
                {currentUser?.name
                  ? currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </div>
            )}

            {!isCollapsed && (
              <div className="text-left min-w-0">
                <div className="text-xs font-semibold text-[#1B3629] leading-tight truncate">
                  {currentUser?.name || "Utkarsh Ghom"}
                </div>
                <div className="text-[10px] text-[#718579] leading-tight truncate">
                  {currentUser?.role || "Lead Architect"}
                </div>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <ChevronRight
              className={`w-4 h-4 text-[#8BA093] transition-transform ${
                isUserMenuOpen ? "rotate-90" : "group-hover:translate-x-0.5"
              }`}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
