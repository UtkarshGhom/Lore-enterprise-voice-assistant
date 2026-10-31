"use client";

import React, { useState } from "react";
import { Check, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinish: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
  onFinish,
}: OnboardingModalProps) {
  const [step, setStep] = useState(3); // Default at Step 3 like Screen 3
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "robotics_overview",
    "deployment",
    "sensor_calib",
  ]);

  if (!isOpen) return null;

  const topics = [
    {
      id: "robotics_overview",
      title: "Robotics system overview",
      description: "Essential knowledge for your team",
    },
    {
      id: "deployment",
      title: "Deployment process",
      description: "Step-by-step guide and common issues",
    },
    {
      id: "sensor_calib",
      title: "Sensor calibration",
      description: "Latest procedure and troubleshooting",
    },
    {
      id: "incident_rec",
      title: "Incident recovery",
      description: "How to handle common failure scenarios",
    },
  ];

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const stepsList = [
    { num: 1, label: "Welcome" },
    { num: 2, label: "Your role" },
    { num: 3, label: "Recommended topics" },
    { num: 4, label: "Integrations" },
    { num: 5, label: "Complete" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-[#D5E1D8] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[460px]">
        {/* Left Stepper Column matching Screen 3 */}
        <div className="w-full md:w-64 bg-[#F8FAF8] p-6 border-b md:border-b-0 md:border-r border-[#E2EBE4] flex flex-col justify-between">
          <div>
            {/* Lore Brand */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-7 h-7 rounded-lg bg-[#E6EFE8] flex items-center justify-center text-[#224332]">
                <Sparkles className="w-4 h-4 text-[#2E5840]" />
              </div>
              <span className="font-serif text-xl font-bold text-[#18261E]">
                Lore
              </span>
            </div>

            {/* Stepper items */}
            <div className="space-y-4">
              {stepsList.map((s) => (
                <div key={s.num} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                      s.num === step
                        ? "bg-[#224332] text-white ring-4 ring-[#224332]/10"
                        : s.num < step
                        ? "bg-[#E0ECE3] text-[#224332]"
                        : "bg-[#EDF2EE] text-[#8BA193]"
                    }`}
                  >
                    {s.num < step ? "✓" : s.num}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      s.num === step
                        ? "text-[#18261E] font-semibold"
                        : "text-[#71897C]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-[#7A9486] pt-4 border-t border-[#E8EFEA]">
            Personalized for <strong>Robotics Team</strong>
          </div>
        </div>

        {/* Right Content Column */}
        <div className="flex-1 p-8 flex flex-col justify-between bg-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-xs text-[#8BA193] hover:text-[#18261E]"
          >
            ✕
          </button>

          <div>
            <span className="text-[10px] font-semibold text-[#2D5840] uppercase tracking-wider">
              Step 3 of 5
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#18261E] mt-1">
              Let&apos;s personalize your experience
            </h2>
            <p className="text-xs text-[#637F70] mt-1 leading-relaxed">
              Based on your role and team, we&apos;ve selected some key topics to help you get started.
            </p>

            {/* Topic checklist matching Screen 3 */}
            <div className="mt-6 space-y-3">
              {topics.map((t) => {
                const isSelected = selectedTopics.includes(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => toggleTopic(t.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isSelected
                        ? "bg-[#F3F8F5] border-[#BED6C6] shadow-2xs"
                        : "bg-white border-[#E2EBE4] hover:bg-[#FAFBF9]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected
                          ? "bg-[#224332] text-white"
                          : "border border-[#C8D6CD]"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#18261E]">
                        {t.title}
                      </h4>
                      <p className="text-[11px] text-[#6E8879] mt-0.5">
                        {t.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-8 pt-4 border-t border-[#EEF3EF] flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-xs font-semibold text-[#668072] hover:text-[#18261E]"
            >
              Back
            </button>
            <button
              onClick={() => {
                onFinish();
                onClose();
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
