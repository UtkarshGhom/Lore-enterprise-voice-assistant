"use client";

import React, { useState } from "react";
import Sidebar, { NavView } from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardHome from "@/components/DashboardHome";
import PersonalizedEmployeeHome from "@/components/PersonalizedEmployeeHome";
import AskLoreView from "@/components/AskLoreView";
import CaptureView from "@/components/CaptureView";
import KnowledgeLibraryView from "@/components/KnowledgeLibraryView";
import KnowledgeDetailView from "@/components/KnowledgeDetailView";
import ReviewQueueView from "@/components/ReviewQueueView";
import KnowledgeGapsView from "@/components/KnowledgeGapsView";
import KnowledgeGraphView from "@/components/KnowledgeGraphView";
import IntegrationsView from "@/components/IntegrationsView";
import CollectionsView from "@/components/CollectionsView";
import TeamView from "@/components/TeamView";
import SettingsView from "@/components/SettingsView";
import EvaluationView from "@/components/EvaluationView";
import PublicWebsite from "@/components/PublicWebsite";
import CommandPalette from "@/components/CommandPalette";
import OnboardingModal from "@/components/OnboardingModal";
import { initialKnowledgeRecords, KnowledgeRecord } from "@/lib/data";

export default function App() {
  const [isPublicWebsite, setIsPublicWebsite] = useState(false);
  const [currentView, setCurrentView] = useState<NavView>("home");
  const [records, setRecords] = useState<KnowledgeRecord[]>(initialKnowledgeRecords);
  const [selectedRecord, setSelectedRecord] = useState<KnowledgeRecord | null>(null);
  const [askQuery, setAskQuery] = useState<string>("");
  const [activePersona, setActivePersona] = useState<"expert" | "learner" | "manager">("learner");

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Handlers
  const handleSelectRecord = (record: KnowledgeRecord) => {
    setSelectedRecord(record);
    setCurrentView("detail");
  };

  const handleAskQuery = (query: string) => {
    setAskQuery(query);
    setCurrentView("ask");
  };

  const handleStartVoiceCapture = () => {
    setCurrentView("capture");
  };

  const handleCompleteCapture = (newRec: Partial<KnowledgeRecord>) => {
    const fullRecord: KnowledgeRecord = {
      id: `rec-${Date.now()}`,
      title: newRec.title || "Voice Captured Incident",
      summary: newRec.summary || "Structured institutional memory capture.",
      contributor: newRec.contributor || {
        name: "Rohit Sharma",
        role: "Hardware Engineer",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      },
      date: newRec.date || "Today",
      status: "draft",
      category: (newRec.category as any) || "Hardware",
      thumbnail:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=500&q=80",
      systemOrProject: newRec.systemOrProject,
      context: newRec.context,
      decisionOrProcedure: newRec.decisionOrProcedure,
      rationale: newRec.rationale,
      exceptions: newRec.exceptions,
      risks: newRec.risks,
      applicability: newRec.applicability,
      keyInsights: newRec.keyInsights,
      audioDuration: "03:45",
      transcriptExcerpt: "Extracted during adaptive Bolna voice interview session...",
    };

    setRecords((prev) => [fullRecord, ...prev]);
    setSelectedRecord(fullRecord);
    setCurrentView("detail");
  };

  const handleApproveRecord = (id: string) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "verified" } : r))
    );
    if (selectedRecord && selectedRecord.id === id) {
      setSelectedRecord({ ...selectedRecord, status: "verified" });
    }
  };

  const handleQuickSeed = () => {
    setRecords(initialKnowledgeRecords);
    alert("Workspace seed reset to Northstar Systems baseline.");
  };

  const handlePaletteAction = (type: string, payload?: any) => {
    setIsCommandPaletteOpen(false);
    if (type === "navigate_record") {
      const found = records.find((r) => r.id === payload);
      if (found) handleSelectRecord(found);
    } else if (type === "navigate_capture") {
      setCurrentView("capture");
    } else if (type === "navigate_review") {
      setCurrentView("review");
    } else if (type === "navigate_library") {
      setCurrentView("library");
    } else if (type === "navigate_team") {
      setCurrentView("team");
    } else if (type === "open_palette") {
      setIsCommandPaletteOpen(true);
    }
  };

  const pendingReviewCount = records.filter(
    (r) => r.status === "review_due" || r.status === "draft"
  ).length;

  // Render Public Marketing Website if toggled
  if (isPublicWebsite) {
    return (
      <>
        <PublicWebsite
          onEnterApp={() => setIsPublicWebsite(false)}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
        />
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onFinish={() => setIsPublicWebsite(false)}
        />
      </>
    );
  }

  // Render Authenticated SaaS Workspace
  return (
    <div className="flex min-h-screen bg-[#F7F9F6]">
      {/* Dual-tier Authenticated Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === "library") setSelectedRecord(null);
          setCurrentView(view);
        }}
        reviewCount={pendingReviewCount}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onViewWebsite={() => setIsPublicWebsite(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activePersona={activePersona}
          onPersonaChange={(p) => {
            setActivePersona(p);
            if (p === "expert") setCurrentView("capture");
            else if (p === "manager") setCurrentView("review");
            else setCurrentView("home");
          }}
          onSearchClick={() => setIsCommandPaletteOpen(true)}
          onQuickSeed={handleQuickSeed}
        />

        <main className="flex-1 pb-12">
          {/* 1. Personalized Employee Home ("Pick up where you left off" - Screen 4) */}
          {currentView === "home" && (
            <PersonalizedEmployeeHome
              records={records}
              onSelectRecord={handleSelectRecord}
              onNavigate={(v) => setCurrentView(v as any)}
              onAskQuery={handleAskQuery}
            />
          )}

          {/* 2. Executive Knowledge Pulse / Original Dashboard (Screen 1 & Image 2) */}
          {currentView === "dashboard" && (
            <DashboardHome
              records={records}
              onNavigate={(v) => setCurrentView(v as any)}
              onSelectRecord={handleSelectRecord}
              onAskQuery={handleAskQuery}
              onStartVoiceCapture={handleStartVoiceCapture}
            />
          )}

          {/* 3. Ask Lore (AI Mentor with Citations - Screen 5) */}
          {currentView === "ask" && (
            <AskLoreView
              initialQuery={askQuery}
              records={records}
              onOpenRecord={handleSelectRecord}
            />
          )}

          {/* 4. Knowledge Capture Studio (Voice, Docs, Meetings, Screen - Screen 6) */}
          {currentView === "capture" && (
            <CaptureView
              onCompleteCapture={handleCompleteCapture}
              onCancel={() => setCurrentView("home")}
            />
          )}

          {/* 5. Knowledge Library Explorer (Screen 7) */}
          {currentView === "library" && (
            <KnowledgeLibraryView
              records={records}
              onSelectRecord={handleSelectRecord}
              onNewCapture={handleStartVoiceCapture}
            />
          )}

          {/* 6. Collections (Curated Workspaces - Section 6) */}
          {currentView === "collections" && (
            <CollectionsView
              onSelectCollection={(title) => {
                setCurrentView("library");
              }}
            />
          )}

          {/* 7. Knowledge Graph (Interactive Node Relational Map - Screen 8) */}
          {currentView === "graph" && <KnowledgeGraphView />}

          {/* 8. People & Expertise (Expert Directory - Screen 9) */}
          {currentView === "team" && (
            <TeamView
              onScheduleInterview={(expert) => {
                setCurrentView("capture");
              }}
            />
          )}

          {/* 9. Review & Governance (Screen 10) */}
          {currentView === "review" && (
            <ReviewQueueView
              records={records}
              onApprove={handleApproveRecord}
              onOpenRecord={handleSelectRecord}
            />
          )}

          {/* 10. Knowledge Gaps Intelligence (Feature H) */}
          {currentView === "gaps" && (
            <KnowledgeGapsView
              onStartCaptureWithTopic={(topic, expert) => {
                setCurrentView("capture");
              }}
            />
          )}

          {/* 11. Numeric Evaluation Gates & MCP Studio (Strategy v2.0 Section 7.5) */}
          {currentView === "evals" && <EvaluationView />}

          {/* 12. Integrations Marketplace (Screen 11) */}
          {currentView === "integrations" && <IntegrationsView />}

          {/* 12. Settings & Security */}
          {currentView === "settings" && <SettingsView />}

          {/* 13. Knowledge Detail & Review (Screen 5) */}
          {currentView === "detail" && selectedRecord && (
            <KnowledgeDetailView
              record={selectedRecord}
              onBack={() => setCurrentView("library")}
              onApproveRecord={handleApproveRecord}
            />
          )}
        </main>
      </div>

      {/* Global Command Palette Modal (Screen 2) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handlePaletteAction}
      />

      {/* Onboarding Flow Modal (Screen 3) */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onFinish={() => {
          setIsOnboardingOpen(false);
          setIsPublicWebsite(false);
        }}
      />
    </div>
  );
}
