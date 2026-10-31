"use client";

import React, { useState } from "react";
import { Sparkles, RefreshCw, ChevronDown, ChevronUp, UserCheck, Shield, EyeOff, Eye } from "lucide-react";
import { UserSession, demoUsers } from "./AuthModal";

interface DemoControlsProps {
  currentUser: UserSession | null;
  onSelectUser: (user: UserSession) => void;
  onResetSeed: () => void;
  onOpenPilotKit?: () => void;
}

export default function DemoControls({
  currentUser,
  onSelectUser,
  onResetSeed,
  onOpenPilotKit,
}: DemoControlsProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (isCollapsed) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsCollapsed(false)}
          title="Open Demo Controls & Persona Switcher"
          className="flex items-center gap-2 bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold px-3 py-2 rounded-full shadow-lg border border-[#3C644E] transition-all hover:scale-105"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#A7F3D0]" />
          <span>Demo Controls</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full text-white/90 font-mono">
            Sample Data
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl border border-[#D5E1D8] shadow-elevated p-3 text-xs space-y-2.5 animate-in slide-in-from-bottom-2 duration-200">
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 pb-2 border-b border-[#EDF3EE]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span className="font-semibold text-[#18261E]">Demo Controls</span>
          <span className="text-[10px] bg-[#E8F0EA] text-[#224332] px-2 py-0.5 rounded-full font-mono font-medium">
            Sample Data
          </span>
        </div>

        <button
          onClick={() => setIsCollapsed(true)}
          title="Minimize toolbar"
          className="text-[#647C6F] hover:text-[#18261E] p-1 rounded-lg hover:bg-[#EEF4EF] transition-colors"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Persona quick switch */}
      <div className="space-y-1">
        <span className="text-[10px] text-[#637C6D] uppercase tracking-wider font-semibold block">
          Switch Active Persona:
        </span>
        <div className="grid grid-cols-3 gap-1.5">
          {demoUsers.map((u) => {
            const isCurrent = currentUser?.id === u.id;
            const firstName = u.name.split(" ")[0];
            return (
              <button
                key={u.id}
                onClick={() => onSelectUser(u)}
                className={`py-1.5 px-2 rounded-xl text-left border transition-all ${
                  isCurrent
                    ? "bg-[#224332] text-white border-[#224332] shadow-2xs font-semibold"
                    : "bg-[#F8FAF8] hover:bg-white text-[#294B37] border-[#D9E4DC]"
                }`}
              >
                <div className="text-[11px] truncate font-medium">{firstName}</div>
                <div
                  className={`text-[9px] truncate ${
                    isCurrent ? "text-white/80" : "text-[#71897C]"
                  }`}
                >
                  {u.role === "Lead Architect"
                    ? "Architect"
                    : u.role === "VP of Engineering"
                    ? "VP Eng"
                    : "New Hire"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between pt-1 text-[11px]">
        <button
          onClick={onResetSeed}
          className="flex items-center gap-1.5 text-[#3C644E] hover:text-[#18261E] transition-colors py-1 px-1.5 rounded-lg hover:bg-[#EEF4EF]"
        >
          <RefreshCw className="w-3 h-3 text-[#2E5840]" />
          <span>Reset Seed Baseline</span>
        </button>

        {onOpenPilotKit && (
          <button
            onClick={onOpenPilotKit}
            className="text-[#1E5C38] font-semibold hover:underline"
          >
            Design Partner Kit →
          </button>
        )}
      </div>
    </div>
  );
}
