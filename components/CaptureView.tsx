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
  CheckCircle2,
  AlertCircle,
  FileText,
  Volume2,
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
  const [isRecording, setIsRecording] = useState(true);
  const [seconds, setSeconds] = useState(754); // 12:34 start
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

  // Timer simulation
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEndInterview = () => {
    setIsRecording(false);
    setIsExtracting(true);

    // Simulate structured LLM extraction
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
      {/* Top Banner / Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[#2F5740] uppercase tracking-wider">
            Voice Capture Studio
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E] mt-1">
            Capture Knowledge (Voice Interview)
          </h1>
          <p className="text-xs text-[#6B8073]">
            Natural conversations. Structured knowledge.
          </p>
        </div>
        <button
          onClick={onCancel}
          className="text-xs text-[#6B8073] hover:text-[#224332] font-semibold bg-white border border-[#D5E1D8] px-3 py-1.5 rounded-xl"
        >
          Exit Studio
        </button>
      </div>

      {/* Main Studio Frame matching Image 1 Screen 3 */}
      <div className="bg-white rounded-3xl border border-[#DDE5DF] shadow-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        {/* Left Column: Waveform, Recording Controls & Topic info */}
        <div className="lg:col-span-7 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#E2EBE4] bg-gradient-to-b from-[#FAFBF9] to-white">
          <div>
            {/* Header info */}
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

            {/* Recording badge */}
            <div className="mt-4 flex items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-[#FEE2E2] text-[#B91C1C] px-3 py-1 rounded-full text-xs font-semibold border border-[#FECACA]">
                <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-ping" />
                <span>Recording — {formatTime(seconds)}</span>
              </div>
              <span className="text-xs text-[#7B9486]">
                Bolna Voice Agent Connected
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
                    ? `${Math.max(12, (height * (0.6 + Math.sin((i + seconds) * 0.8) * 0.4)))}px`
                    : "10px",
                  opacity: isRecording ? 0.75 + (i % 3) * 0.1 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Controls row matching design */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* Pause / Resume */}
              <button
                onClick={() => setIsRecording(!isRecording)}
                className="w-10 h-10 rounded-full bg-white border border-[#D5E1D8] hover:bg-[#F2F6F3] text-[#2F523E] flex items-center justify-center transition-colors shadow-2xs"
                title={isRecording ? "Pause" : "Resume"}
              >
                {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              {/* Stop / Center Record icon */}
              <button
                onClick={handleEndInterview}
                className="w-12 h-12 rounded-full bg-[#DC2626] hover:bg-[#B91C1C] text-white flex items-center justify-center transition-transform active:scale-95 shadow-md"
                title="Finish Interview"
              >
                <Square className="w-5 h-5 fill-current" />
              </button>

              {/* Reset */}
              <button
                onClick={() => setSeconds(0)}
                className="w-10 h-10 rounded-full bg-white border border-[#D5E1D8] hover:bg-[#F2F6F3] text-[#2F523E] flex items-center justify-center transition-colors shadow-2xs"
                title="Restart Counter"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* End Interview primary button */}
            <button
              onClick={handleEndInterview}
              disabled={isExtracting}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {isExtracting ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin text-[#A7F3D0]" />
                  <span>Extracting Knowledge...</span>
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

        {/* Right Column: Current Question & Live Transcript */}
        <div className="lg:col-span-5 p-6 bg-[#FAFBF9] flex flex-col justify-between space-y-5">
          {/* Top: Current Question Card in deep forest style */}
          <div className="bg-[#1C3A29] text-white p-5 rounded-2xl shadow-sm border border-[#162D20]">
            <span className="text-[10px] font-semibold text-[#8FD6AD] uppercase tracking-wider block mb-1">
              Current Question (Adaptive Interviewer)
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

          {/* Live Transcript Stream */}
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
              <span>Lore captures decisions, caveats, and failure modes automatically.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
