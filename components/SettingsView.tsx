"use client";

import React, { useState } from "react";
import { Key, Shield, Radio, Check, Save } from "lucide-react";

export default function SettingsView() {
  const [bolnaKey, setBolnaKey] = useState("bolna_live_••••••••••••••••");
  const [bolnaAgentId, setBolnaAgentId] = useState("agent_symphony_lore_capture");
  const [llmProvider, setLlmProvider] = useState("gemini");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
          Configuration
        </span>
        <h1 className="font-serif text-3xl font-bold text-[#18261E]">
          Settings & Agent Integrations
        </h1>
        <p className="text-xs text-[#6B8073] mt-0.5">
          Manage Bolna Symphony voice credentials, extraction models, and organizational security.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-6">
        {/* Bolna Voice Engine */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#EDF3EE] pb-2">
            <Radio className="w-4 h-4 text-[#2E5840]" />
            <h3 className="font-semibold text-sm text-[#18261E]">
              Bolna Symphony Voice Agent
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#446251] mb-1">
                Bolna API Key
              </label>
              <input
                type="password"
                value={bolnaKey}
                onChange={(e) => setBolnaKey(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAF8] rounded-xl border border-[#D5E1D8] text-xs text-[#18261E] focus:outline-none focus:border-[#224332]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#446251] mb-1">
                Bolna Agent ID
              </label>
              <input
                type="text"
                value={bolnaAgentId}
                onChange={(e) => setBolnaAgentId(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAF8] rounded-xl border border-[#D5E1D8] text-xs text-[#18261E] focus:outline-none focus:border-[#224332]"
              />
            </div>
          </div>
        </div>

        {/* Intelligence & Extraction Model */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-[#EDF3EE] pb-2">
            <Key className="w-4 h-4 text-[#2E5840]" />
            <h3 className="font-semibold text-sm text-[#18261E]">
              Inference & Extraction Model
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#446251] mb-1">
                Primary Model Provider
              </label>
              <select
                value={llmProvider}
                onChange={(e) => setLlmProvider(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8FAF8] rounded-xl border border-[#D5E1D8] text-xs text-[#18261E] focus:outline-none focus:border-[#224332]"
              >
                <option value="gemini">Google Gemini 1.5 Flash / Pro</option>
                <option value="openai">OpenAI GPT-4o</option>
                <option value="anthropic">Anthropic Claude 3.5 Sonnet</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#446251] mb-1">
                Organization Realm
              </label>
              <input
                type="text"
                defaultValue="Northstar Systems Inc."
                className="w-full px-3 py-2 bg-[#F8FAF8] rounded-xl border border-[#D5E1D8] text-xs text-[#18261E] focus:outline-none focus:border-[#224332]"
              />
            </div>
          </div>
        </div>

        {/* Trust & Provenance Rules */}
        <div className="p-4 rounded-2xl bg-[#F0F5F1] border border-[#D3E3D7] flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#2E7D52] shrink-0 mt-0.5" />
          <div className="text-xs text-[#3B5A47] leading-relaxed">
            <strong>Zero-Knowledge Security Guardrail Enabled:</strong> Lore enforces that passwords, cryptographic seeds, and API keys are blocked from vector memory indexing.
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all"
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved Settings!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
