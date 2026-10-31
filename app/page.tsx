"use client";

import React, { useState } from "react";
import Sidebar, { NavView } from "@/components/Sidebar";
import Header from "@/components/Header";
import DashboardHome from "@/components/DashboardHome";
import AskLoreView from "@/components/AskLoreView";
import CaptureView from "@/components/CaptureView";
import KnowledgeLibraryView from "@/components/KnowledgeLibraryView";
import KnowledgeDetailView from "@/components/KnowledgeDetailView";
import ReviewQueueView from "@/components/ReviewQueueView";
import KnowledgeGapsView from "@/components/KnowledgeGapsView";
import TeamView from "@/components/TeamView";
import SettingsView from "@/components/SettingsView";
import { initialKnowledgeRecords, KnowledgeRecord, Contributor } from "@/lib/data";

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>("home");
  const [records, setRecords] = useState<KnowledgeRecord[]>(initialKnowledgeRecords);
  const [selectedRecord, setSelectedRecord] = useState<KnowledgeRecord | null>(null);
  const [askQuery, setAskQuery] = useState<string>("");
  const [activePersona, setActivePersona] = useState<"expert" | "learner" | "manager">("learner");

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

  const pendingReviewCount = records.filter(
    (r) => r.status === "review_due" || r.status === "draft"
  ).length;

  return (
    <div className="flex min-h-screen bg-[#F7F9F6]">
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === "library") setSelectedRecord(null);
          setCurrentView(view);
        }}
        reviewCount={pendingReviewCount}
      />

      {/* 2. Main Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          activePersona={activePersona}
          onPersonaChange={(p) => {
            setActivePersona(p);
            if (p === "expert") setCurrentView("capture");
            else if (p === "manager") setCurrentView("review");
            else setCurrentView("home");
          }}
          onSearchClick={() => setCurrentView("library")}
          onQuickSeed={handleQuickSeed}
        />

        {/* Dynamic View Viewport */}
        <main className="flex-1 pb-12">
          {currentView === "home" && (
            <DashboardHome
              records={records}
              onNavigate={setCurrentView}
              onSelectRecord={handleSelectRecord}
              onAskQuery={handleAskQuery}
              onStartVoiceCapture={handleStartVoiceCapture}
            />
          )}

          {currentView === "ask" && (
            <AskLoreView
              initialQuery={askQuery}
              records={records}
              onOpenRecord={handleSelectRecord}
            />
          )}

          {currentView === "capture" && (
            <CaptureView
              onCompleteCapture={handleCompleteCapture}
              onCancel={() => setCurrentView("home")}
            />
          )}

          {currentView === "library" && (
            <KnowledgeLibraryView
              records={records}
              onSelectRecord={handleSelectRecord}
              onNewCapture={handleStartVoiceCapture}
            />
          )}

          {currentView === "detail" && selectedRecord && (
            <KnowledgeDetailView
              record={selectedRecord}
              onBack={() => setCurrentView("library")}
              onApproveRecord={handleApproveRecord}
            />
          )}

          {currentView === "review" && (
            <ReviewQueueView
              records={records}
              onApprove={handleApproveRecord}
              onOpenRecord={handleSelectRecord}
            />
          )}

          {currentView === "gaps" && (
            <KnowledgeGapsView
              onStartCaptureWithTopic={(topic, expert) => {
                setCurrentView("capture");
              }}
            />
          )}

          {currentView === "team" && (
            <TeamView
              onScheduleInterview={(expert) => {
                setCurrentView("capture");
              }}
            />
          )}

          {currentView === "settings" && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
