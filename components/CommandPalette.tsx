"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  User,
  FolderGit2,
  GitCommit,
  Mic,
  Clock,
  Command,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (type: string, payload?: any) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectAction,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectAction("open_palette");
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onSelectAction]);

  if (!isOpen) return null;

  const items = [
    {
      id: "1",
      category: "knowledge",
      title: "Sensor Calibration Procedure",
      subtitle: "Knowledge • Updated 2 days ago",
      icon: BookOpen,
      action: () => onSelectAction("navigate_record", "rec-1"),
    },
    {
      id: "2",
      category: "people",
      title: "Rohit Sharma",
      subtitle: "Person • Hardware Engineering Lead",
      icon: User,
      action: () => onSelectAction("navigate_team"),
    },
    {
      id: "3",
      category: "projects",
      title: "Project Apollo",
      subtitle: "Project • 28 related records",
      icon: FolderGit2,
      action: () => onSelectAction("navigate_library"),
    },
    {
      id: "4",
      category: "decisions",
      title: "Decision: Motor Controller Redesign",
      subtitle: "Decision • Oct 12, 2026 • Verified",
      icon: GitCommit,
      action: () => onSelectAction("navigate_record", "rec-4"),
    },
    {
      id: "5",
      category: "commands",
      title: "Start a new interview",
      subtitle: "Command • Capture knowledge via voice",
      icon: Mic,
      action: () => onSelectAction("navigate_capture"),
    },
    {
      id: "6",
      category: "commands",
      title: "Open review queue",
      subtitle: "Command • 3 items awaiting expert sign-off",
      icon: Clock,
      action: () => onSelectAction("navigate_review"),
    },
  ];

  const filtered = items.filter((item) => {
    const matchesCategory =
      selectedFilter === "all" || item.category === selectedFilter;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#D5E1D8] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#EDF3EE] flex items-center gap-3 bg-[#FAFBF9]">
          <Search className="w-5 h-5 text-[#547562]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search knowledge, people, projects, or run a command..."
            className="flex-1 bg-transparent text-sm text-[#18261E] placeholder-[#7F9789] focus:outline-none font-medium"
          />
          <div className="flex items-center gap-1">
            <kbd className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-md border border-[#D5E1D8] text-[#557362]">
              ESC
            </kbd>
          </div>
        </div>

        {/* Category Pills matching Screen 2 */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#EDF3EE] bg-white overflow-x-auto">
          {[
            { id: "all", label: "All", count: 12 },
            { id: "knowledge", label: "Knowledge", count: 8 },
            { id: "people", label: "People", count: 4 },
            { id: "projects", label: "Projects", count: 3 },
            { id: "decisions", label: "Decisions", count: 2 },
            { id: "commands", label: "Commands", count: 6 },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                selectedFilter === cat.id
                  ? "bg-[#224332] text-white font-semibold"
                  : "bg-[#F2F6F3] text-[#526F5E] hover:bg-[#E5ECE7]"
              }`}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75">{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#F2F6F3]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#7B9485]">
              No matches found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="p-3 rounded-2xl hover:bg-[#F2F7F4] flex items-center justify-between cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4 text-[#2E5B42]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#18261E] group-hover:text-[#224332]">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#6E8879]">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8BA294] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </div>
              );
            })
          )}
        </div>

        {/* Bottom hint */}
        <div className="p-3 bg-[#FAFBF9] border-t border-[#EDF3EE] flex items-center justify-between text-[11px] text-[#789383]">
          <span>Tip: Press <strong>⌘ + K</strong> anywhere to summon command search.</span>
          <span>Press <strong>Enter</strong> to select</span>
        </div>
      </div>
    </div>
  );
}
