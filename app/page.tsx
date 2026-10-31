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
import DecisionTimelineView from "@/components/DecisionTimelineView";
import AuditGovernanceView from "@/components/AuditGovernanceView";
import PilotKitModal from "@/components/PilotKitModal";
import PublicWebsite from "@/components/PublicWebsite";
import CommandPalette from "@/components/CommandPalette";
import OnboardingModal from "@/components/OnboardingModal";
import AuthModal, { UserSession, demoUsers } from "@/components/AuthModal";
import DemoControls from "@/components/DemoControls";
import { initialKnowledgeRecords, KnowledgeRecord } from "@/lib/data";

export default function App() {
  // Authentication & Session State: Default to public landing screen, login to enter workspace
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPublicWebsite, setIsPublicWebsite] = useState(true);

  // Clear stray hash in URL on load (Section 2 Item 6 Polish)
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  // Navigation & Data
  const [currentView, setCurrentView] = useState<NavView>("home");
  const [records, setRecords] = useState<KnowledgeRecord[]>(initialKnowledgeRecords);
  const [selectedRecord, setSelectedRecord] = useState<KnowledgeRecord | null>(null);
  const [askQuery, setAskQuery] = useState<string>("");
  const [autoStartVoice, setAutoStartVoice] = useState<boolean>(false);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isPilotKitOpen, setIsPilotKitOpen] = useState(false);

  // Handlers
  const handleSelectRecord = (record: KnowledgeRecord) => {
    setSelectedRecord(record);
    setCurrentView("detail");
  };

  const handleAskQuery = (query: string) => {
    setAskQuery(query);
    setAutoStartVoice(false);
    setCurrentView("ask");
  };

  const handleStartVoiceSearch = () => {
    setAskQuery("");
    setAutoStartVoice(true);
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
        name: currentUser?.name || "Rohit Sharma",
        role: currentUser?.role || "Hardware Engineer",
        avatar:
          currentUser?.avatar ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
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

  const handleLoginSuccess = (user: UserSession) => {
    setCurrentUser(user);
    setIsPublicWebsite(false);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setIsPublicWebsite(true);
  };

  const pendingReviewCount = records.filter(
    (r) => r.status === "review_due" || r.status === "draft"
  ).length;

  // Render Public Marketing Website if not logged in or toggled
  if (isPublicWebsite || currentUser === null) {
    return (
      <>
        <PublicWebsite
          onEnterApp={() => {
            if (!currentUser) setCurrentUser(demoUsers[0]);
            setIsPublicWebsite(false);
          }}
          onOpenOnboarding={() => setIsOnboardingOpen(true)}
          onOpenAuth={() => setIsAuthModalOpen(true)}
        />
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
        <OnboardingModal
          isOpen={isOnboardingOpen}
          onClose={() => setIsOnboardingOpen(false)}
          onFinish={() => {
            setIsOnboardingOpen(false);
            if (!currentUser) setCurrentUser(demoUsers[0]);
            setIsPublicWebsite(false);
          }}
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
        currentUser={currentUser}
        onSignOut={handleSignOut}
        onViewWebsite={() => setIsPublicWebsite(true)}
        onSwitchPersona={() => setIsAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          currentUser={currentUser}
          onSearchClick={() => setIsCommandPaletteOpen(true)}
          onOpenPilotKit={() => setIsPilotKitOpen(true)}
          onUserMenuClick={() => setIsAuthModalOpen(true)}
        />

        <main className="flex-1 pb-16">
          {/* 1. Personalized Employee Home ("Pick up where you left off" - Screen 4) */}
          {currentView === "home" && (
            <PersonalizedEmployeeHome
              records={records}
              currentUser={currentUser}
              onSelectRecord={handleSelectRecord}
              onNavigate={(v) => setCurrentView(v as any)}
              onAskQuery={handleAskQuery}
            />
          )}

          {/* 2. Executive Knowledge Pulse / Original Dashboard (Screen 1 & Image 2) */}
          {currentView === "dashboard" && (
            <DashboardHome
              records={records}
              userName={currentUser?.name?.split(" ")[0] || "Utkarsh"}
              onNavigate={(v) => setCurrentView(v as any)}
              onSelectRecord={handleSelectRecord}
              onAskQuery={handleAskQuery}
              onStartVoiceCapture={handleStartVoiceCapture}
              onStartVoiceSearch={handleStartVoiceSearch}
            />
          )}

          {/* 3. Ask Lore (AI Mentor with Citations - Screen 5) */}
          {currentView === "ask" && (
            <AskLoreView
              initialQuery={askQuery}
              autoStartVoice={autoStartVoice}
              records={records}
              onOpenRecord={handleSelectRecord}
              onStartCapture={handleStartVoiceCapture}
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

          {/* 5b. Decision History & Freshness Timeline (Strategy Phase 3) */}
          {currentView === "timeline" && (
            <DecisionTimelineView onSelectRecord={handleSelectRecord} />
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

          {/* 13. Audit & Governance (Strategy Phase 3/4) */}
          {currentView === "governance" && <AuditGovernanceView />}

          {/* 14. Settings & Security */}
          {currentView === "settings" && <SettingsView />}

          {/* 15. Knowledge Detail & Review (Screen 5) */}
          {currentView === "detail" && selectedRecord && (
            <KnowledgeDetailView
              record={selectedRecord}
              onBack={() => setCurrentView("library")}
              onApproveRecord={handleApproveRecord}
            />
          )}
        </main>
      </div>

      {/* Floating Dismissible Demo Controls & Sample Data Banner (Polish Guide Section 2 Item 7 & Section 5.8) */}
      <DemoControls
        currentUser={currentUser}
        onSelectUser={(u) => {
          setCurrentUser(u);
          if (u.role === "Software Engineer") setCurrentView("home");
          else if (u.role === "Lead Architect") setCurrentView("capture");
          else if (u.role === "VP of Engineering") setCurrentView("review");
        }}
        onResetSeed={handleQuickSeed}
        onOpenPilotKit={() => setIsPilotKitOpen(true)}
      />

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

      {/* Design Partner Pilot Kit Modal (Strategy Phase 0/3) */}
      <PilotKitModal
        isOpen={isPilotKitOpen}
        onClose={() => setIsPilotKitOpen(false)}
      />

      {/* Auth Modal with Work Email & 1-Click Role Personas */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}
