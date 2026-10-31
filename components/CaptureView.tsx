"use client";

import React, { useState, useEffect } from "react";
import {
  Mic,
  Square,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Upload,
  Video,
  FileText,
  Monitor,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface CaptureViewProps {
  onCompleteCapture: (extractedRecord: Partial<KnowledgeRecord>) => void;
  onCancel: () => void;
}

export default function CaptureView({
  onCompleteCapture,
  onCancel,
}: CaptureViewProps) {
  const [captureMethod, setCaptureMethod] = useState<
    "pr_debrief" | "voice" | "document" | "meeting" | "screen"
  >("pr_debrief");
  const [selectedPR, setSelectedPR] = useState("PR #208");
  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(754); // 12:34
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [isExtracting, setIsExtracting] = useState(false);

  const interviewQuestions = [
    "What kind of issues did you face with the previous calibration method?",
    "Why was multi-point calibration chosen over continuous active software correction?",
    "What are the specific thermal limits where single-point calibration fails?",
    "What is the most common mistake field technicians make during deployment?",
  ];

  const transcriptItems = [
    { time: "12:21", speaker: "Rohit", text: "The main issue was sensor drift during hot afternoon shifts in field deployment." },
    { time: "12:24", speaker: "Rohit", text: "It was especially visible in ambient temperatures above 35°C where yaw readings jumped 4%." },
    { time: "12:28", speaker: "Lore", text: "What kind of issues did you face with the previous calibration method?" },
    { time: "12:32", speaker: "Rohit", text: "We noticed single-point zeroing only calibrated at room temperature (21°C), ignoring ADC thermal expansion." },
    { time: "12:38", speaker: "Rohit", text: "So we decided to switch to a 5-point calibration curve with polynomial temperature compensation." },
    { time: "12:45", speaker: "Lore", text: "What are the exceptions where this new protocol does not apply?" },
    { time: "12:51", speaker: "Rohit", text: "Indoor cleanroom units with active air conditioning don't need it—standard zeroing is fine there." },
  ];

  useEffect(() => {
    let interval: any;
    if (isRecording && captureMethod === "voice") {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, captureMethod]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndInterview = () => {
    setIsRecording(false);
    setIsExtracting(true);

    setTimeout(() => {
      setIsExtracting(false);
      onCompleteCapture({
        title: "Sensor Calibration & Temperature Drift Mitigation",
        summary: "Step-by-step 5-point calibration procedure with temperature compensation for outdoor robotics.",
        category: "Hardware",
        status: "draft",
        contributor: {
          name: "Rohit Sharma",
          role: "Hardware Engineer",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        },
        date: "Oct 31, 2026",
        systemOrProject: "Industrial Robotics Field Units (Gen-4)",
        context: "Outdoor robotic field units experienced 4% yaw drift when operating under direct sunlight >35°C.",
        decisionOrProcedure: "Deploy a 5-point calibration protocol utilizing quadratic thermal compensation curves.",
        rationale: "Addresses ADC reference voltage drift without requiring expensive active thermistor chillers.",
        exceptions: [
          "Indoor cleanroom units operating under continuous 21°C climate control.",
        ],
        risks: [
          "Skipping thermal soak period creates residual bias in the gyro registers.",
        ],
        applicability: "All field hardware rev 3.2 and above.",
        keyInsights: [
          "Thermal expansion of PCB substrate shifted sensor zero-point by 18 LSBs.",
          "Multi-point calibration reduced outdoor failure rate by 32%.",
          "5-step field checklist must be completed before signing off unit commissioning.",
        ],
      });
    }, 1200);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            KNOWLEDGE CREATION
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Capture Knowledge Studio
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Choose how you want to capture and preserve tacit organizational experience.
          </p>
        </div>

        <button
          onClick={onCancel}
          className="text-xs text-[#637E6F] hover:text-[#18261E] font-semibold bg-white border border-[#D5E1D8] px-3.5 py-1.5 rounded-xl shadow-2xs"
        >
          Exit Studio
        </button>
      </div>

      {/* Modal / Method Selector Tabs matching v2.0 Strategy */}
      <div className="flex items-center gap-2 border-b border-[#E2EBE4] pb-2 overflow-x-auto">
        {[
          { id: "pr_debrief", label: "PR Change Debrief (New)", icon: FileText },
          { id: "voice", label: "Voice Interview", icon: Mic },
          { id: "document", label: "Document Upload", icon: Upload },
          { id: "meeting", label: "Meeting Capture", icon: Video },
          { id: "screen", label: "Screen Recording", icon: Monitor },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = captureMethod === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCaptureMethod(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#224332] text-white shadow-2xs"
                  : "bg-white text-[#526D5D] hover:bg-[#EEF4EF] border border-[#D9E4DC]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* View 0: PR Change Debrief (Core Strategy v2.0 Wedge) */}
      {captureMethod === "pr_debrief" && (
        <div className="bg-white rounded-3xl border border-[#DDE5DF] shadow-card p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEF3EF]">
            <div>
              <span className="text-[10px] font-semibold text-[#2D5840] uppercase tracking-wider block">
                Engineering Change Debrief
              </span>
              <h3 className="font-serif text-xl font-bold text-[#18261E] mt-0.5">
                Capture the &ldquo;Why&rdquo; Behind the Code
              </h3>
              <p className="text-xs text-[#6B8073]">
                Prompted automatically when a qualifying PR touches designated critical services.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#526F5E] font-medium">Select PR:</span>
              <select
                value={selectedPR}
                onChange={(e) => setSelectedPR(e.target.value)}
                className="bg-[#F8FAF8] border border-[#D5E1D8] text-xs font-mono font-semibold text-[#18261E] px-3 py-1.5 rounded-xl focus:outline-none"
              >
                <option value="PR #208">PR #208: Add BNO085 Polynomial Temperature Compensation</option>
                <option value="PR #142">PR #142: Migrate Payment Retries to Deterministic UUIDv5</option>
                <option value="PR #389">PR #389: Graceful SIGTERM & ArgoCD Canary Hooks</option>
              </select>
            </div>
          </div>

          {/* 3 Guided Questions for Authors */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-2">
              <span className="text-[10px] font-semibold text-[#2E5840] uppercase tracking-wider block">
                1. Context & Rationale
              </span>
              <p className="text-xs font-semibold text-[#18261E]">
                Why was this specific approach chosen instead of the standard library or default framework behavior?
              </p>
              <textarea
                defaultValue="Default single-point calibration fails in outdoor ambient heat >35°C due to ADC reference voltage drift. The 5-point polynomial curve eliminates 32% of field yaw errors without hardware Peltier chillers."
                rows={2}
                className="w-full text-xs text-[#355342] bg-white p-2.5 rounded-xl border border-[#D5E1D8] focus:outline-none focus:border-[#224332]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-2">
              <span className="text-[10px] font-semibold text-[#2E5840] uppercase tracking-wider block">
                2. Alternatives Considered
              </span>
              <p className="text-xs font-semibold text-[#18261E]">
                What alternative solutions did you evaluate, and why were they rejected?
              </p>
              <textarea
                defaultValue="Evaluated hardware Peltier thermoelectric cooler (rejected: adds $140 BOM cost and 12W power draw). Evaluated periodic runtime zeroing (rejected: caused position stutter during arm moves)."
                rows={2}
                className="w-full text-xs text-[#355342] bg-white p-2.5 rounded-xl border border-[#D5E1D8] focus:outline-none focus:border-[#224332]"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#F8FAF8] border border-[#DEE7E0] space-y-2">
              <span className="text-[10px] font-semibold text-[#2E5840] uppercase tracking-wider block">
                3. Known Invalidation Conditions & Failure Modes
              </span>
              <p className="text-xs font-semibold text-[#18261E]">
                Under what conditions does this advice break, or when should another engineer rewrite this?
              </p>
              <textarea
                defaultValue="Does not apply to indoor cleanroom units operating under continuous 21°C climate control. This logic is superseded if hardware rev 4 switches to digital I2C bus sensors with internal thermistors."
                rows={2}
                className="w-full text-xs text-[#355342] bg-white p-2.5 rounded-xl border border-[#D5E1D8] focus:outline-none focus:border-[#224332]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#6B8576]">
              <Sparkles className="w-4 h-4 text-[#2E7D52]" />
              <span>Self-approval enabled: record will be indexed to Lore and exposed to Coding Agents via MCP.</span>
            </div>

            <button
              onClick={handleEndInterview}
              disabled={isExtracting}
              className="px-6 py-3 rounded-2xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#A7F3D0]" />
                  <span>Indexing Verified Decision...</span>
                </>
              ) : (
                <>
                  <span>Approve & Publish Decision Record</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* View 1: Voice Interview Studio (Screen 6) */}
      {captureMethod === "voice" && (
        <div className="bg-white rounded-3xl border border-[#DDE5DF] shadow-card overflow-hidden">
          {/* Pinned Consent & Retention Bar (Polish Guide Section 5.4) */}
          <div className="bg-[#1C3526] text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
              <span className="font-semibold">Recording is active.</span>
              <span className="text-white/80">You control what is shared. Scrubbed of secrets and purges in 30 days.</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className="hover:text-[#A7F3D0] underline font-medium"
              >
                {isRecording ? "Pause" : "Resume"}
              </button>
              <span>•</span>
              <button
                onClick={() => setSeconds(0)}
                className="hover:text-[#FECACA] underline font-medium"
              >
                Restart
              </button>
              <span>•</span>
              <button
                onClick={onCancel}
                className="text-[#FCA5A5] hover:text-[#EF4444] font-semibold"
              >
                Delete Recording
              </button>
            </div>
          </div>

          {/* Chapter Progress Dots (Polish Guide Section 5.4) */}
          <div className="bg-[#F2F7F4] border-b border-[#E1ECE3] px-6 py-2 flex items-center justify-between text-xs overflow-x-auto">
            <span className="text-[10px] uppercase font-bold text-[#4B6B58] tracking-wider shrink-0 mr-4">
              Debrief Chapters:
            </span>
            <div className="flex items-center gap-6">
              {[
                { name: "1. Context", active: true },
                { name: "2. Architectural Why", active: true },
                { name: "3. Alternatives Rejected", active: false },
                { name: "4. Risks & Invalidation", active: false },
                { name: "5. Wrap-up", active: false },
              ].map((ch, idx) => (
                <div key={idx} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      ch.active ? "bg-[#224332]" : "bg-[#CBD9CF]"
                    }`}
                  />
                  <span
                    className={`text-[11px] ${
                      ch.active ? "font-semibold text-[#18261E]" : "text-[#71897C]"
                    }`}
                  >
                    {ch.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
          {/* Left Column: Waveform, Recording Controls & Topic info */}
          <div className="lg:col-span-7 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2EBE4] bg-gradient-to-b from-[#FAFBF9] to-white">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F2EB] text-[#224332] flex items-center justify-center border border-[#D3E3D7]">
                  <Mic className="w-5 h-5 text-[#2E5840]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base text-[#18261E]">
                    Interview with Rohit Sharma
                  </h3>
                  <p className="text-xs text-[#637C6D]">
                    Topic: Sensor Calibration & Field Deployment
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="inline-flex items-center gap-2 bg-[#FEE2E2] text-[#B91C1C] px-3 py-1 rounded-full text-xs font-semibold border border-[#FECACA]">
                  <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                  <span>Recording — {formatTime(seconds)}</span>
                </div>
                <span className="text-xs text-[#7B9486]">
                  Bolna Symphony Voice Agent Connected
                </span>
              </div>
            </div>

            {/* Large Vibrant Emerald Audio Waveform Visualizer */}
            <div className="my-8 py-8 flex items-center justify-center gap-1.5 h-32 px-4 bg-[#F2F7F4] rounded-2xl border border-[#DFECE2]">
              {[
                24, 45, 78, 32, 90, 60, 42, 85, 105, 55, 38, 92, 110, 75, 48,
                65, 98, 115, 80, 52, 90, 68, 40, 85, 60, 42, 70, 95, 50, 30,
              ].map((height, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-[#2F6649] transition-all duration-150"
                  style={{
                    height: isRecording
                      ? `${Math.max(12, height * (0.6 + Math.sin((i + seconds) * 0.8) * 0.4))}px`
                      : "10px",
                    opacity: isRecording ? 0.75 + (i % 3) * 0.1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className="w-10 h-10 rounded-full bg-white border border-[#D5E1D8] hover:bg-[#F2F6F3] text-[#2F523E] flex items-center justify-center shadow-2xs"
                >
                  {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={handleEndInterview}
                  className="w-12 h-12 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
                >
                  <Square className="w-5 h-5 fill-current" />
                </button>

                <button
                  onClick={() => setSeconds(0)}
                  className="w-10 h-10 rounded-full bg-white border border-[#D5E1D8] hover:bg-[#F2F6F3] text-[#2F523E] flex items-center justify-center shadow-2xs"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleEndInterview}
                disabled={isExtracting}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {isExtracting ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#A7F3D0]" />
                    <span>Extracting Structured Knowledge...</span>
                  </>
                ) : (
                  <>
                    <span>End Interview & Review Draft</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Live Transcript & Adaptive Question */}
          <div className="lg:col-span-5 p-6 bg-[#FAFBF9] flex flex-col justify-between space-y-5">
            <div className="bg-[#1C3A29] text-white p-5 rounded-2xl shadow-sm border border-[#162D20]">
              <span className="text-[10px] font-semibold text-[#8FD6AD] uppercase tracking-wider block mb-1">
                Adaptive Interviewer
              </span>
              <h4 className="font-serif text-base sm:text-lg font-medium leading-snug">
                &ldquo;{interviewQuestions[activeQuestionIndex]}&rdquo;
              </h4>
              <div className="mt-3 flex items-center justify-between text-[11px] text-[#A6CDB5]">
                <span>Question {activeQuestionIndex + 1} of {interviewQuestions.length}</span>
                <button
                  onClick={() =>
                    setActiveQuestionIndex((prev) => (prev + 1) % interviewQuestions.length)
                  }
                  className="underline hover:text-white"
                >
                  Next question →
                </button>
              </div>
            </div>

            <div className="flex-1 bg-white p-4 rounded-2xl border border-[#DFECE2] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#EEF3EF] mb-3">
                  <span className="text-xs font-semibold text-[#2B4B38] uppercase tracking-wider">
                    Live Transcript
                  </span>
                  <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2 py-0.5 rounded-md font-semibold">
                    Real-time
                  </span>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {transcriptItems.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <span className="font-mono text-[10px] text-[#869E8F] shrink-0 pt-0.5">
                        {item.time}
                      </span>
                      <div className="min-w-0">
                        <span className="font-semibold text-[#203427] mr-1">
                          {item.speaker}:
                        </span>
                        <span className="text-[#4E6657]">{item.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#EDF3EE] flex items-center gap-2 text-[11px] text-[#71897C]">
                <Sparkles className="w-3.5 h-3.5 text-[#306847]" />
                <span>Capturing decision context and failure exceptions.</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* View 2: Document Upload */}
      {captureMethod === "document" && (
        <div className="bg-white rounded-3xl border border-[#DCE5DF] p-12 shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-[#2E5840]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#18261E]">
            Upload Documentation, Specs or Post-Mortems
          </h3>
          <p className="text-xs text-[#668272] max-w-md mx-auto">
            Drag and drop PDF, DOCX, or Markdown files. Lore will parse and convert raw documents into structured, traceable decision records.
          </p>
          <div className="pt-4">
            <button
              onClick={handleEndInterview}
              className="px-6 py-3 rounded-2xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm"
            >
              Select File to Ingest
            </button>
          </div>
        </div>
      )}

      {/* View 3: Meeting Capture */}
      {captureMethod === "meeting" && (
        <div className="bg-white rounded-3xl border border-[#DCE5DF] p-12 shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mx-auto">
            <Video className="w-8 h-8 text-[#2E5840]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#18261E]">
            Connect Live Meeting or Import Recording
          </h3>
          <p className="text-xs text-[#668272] max-w-md mx-auto">
            Invite Lore to your Zoom, Google Meet, or Microsoft Teams architectural review to automatically summarize decisions and action items.
          </p>
          <div className="pt-4">
            <button
              onClick={handleEndInterview}
              className="px-6 py-3 rounded-2xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm"
            >
              Connect Zoom / Google Meet
            </button>
          </div>
        </div>
      )}

      {/* View 4: Screen Recording */}
      {captureMethod === "screen" && (
        <div className="bg-white rounded-3xl border border-[#DCE5DF] p-12 shadow-card text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mx-auto">
            <Monitor className="w-8 h-8 text-[#2E5840]" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#18261E]">
            Record Operational Walkthrough
          </h3>
          <p className="text-xs text-[#668272] max-w-md mx-auto">
            Capture a live screen demonstration of your internal tools, debuggers, or calibration software while you speak through the steps.
          </p>
          <div className="pt-4">
            <button
              onClick={handleEndInterview}
              className="px-6 py-3 rounded-2xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm"
            >
              Start Screen Recording
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
