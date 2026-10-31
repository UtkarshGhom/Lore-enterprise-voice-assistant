"use client";

import React, { useState } from "react";
import {
  Mic,
  Sparkles,
  ArrowRight,
  Shield,
  Search,
  CheckCircle2,
  Share2,
  Users,
  Play,
  Layers,
  ChevronRight,
  ChevronLeft,
  Volume2,
  FileCheck,
  GitCommit,
  Lock,
} from "lucide-react";

interface PublicWebsiteProps {
  onEnterApp: () => void;
  onOpenOnboarding: () => void;
  onOpenAuth: () => void;
}

export default function PublicWebsite({
  onEnterApp,
  onOpenOnboarding,
  onOpenAuth,
}: PublicWebsiteProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Lore has transformed how we preserve architectural decisions. When our lead engineers merge code, Lore captures the 'why' in 3 minutes so new hires don't keep breaking past conventions.",
      author: "Priya Sharma",
      role: "Engineering Manager, TechCorp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "Our coding agents (Cursor & Claude Code) query Lore's read-only MCP server before refactoring legacy components. It completely stopped agents from re-introducing previously rejected bugs.",
      author: "Marcus Vance",
      role: "VP of Robotics, Apex Systems",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "The strict citation requirement and honest abstention give our compliance and platform leads peace of mind. Every single statement links directly back to the verified PR debrief.",
      author: "Elena Rostova",
      role: "Head of Platform Engineering",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202923] selection:bg-[#DEECE2] selection:text-[#1B3629]">
      {/* 1. Public Top Navigation (Sticky hairline border on scroll) */}
      <header className="sticky top-0 z-40 bg-[#F7F7F2]/90 backdrop-blur-md border-b border-[#E7E9E1] px-6 sm:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#E8F0EA] flex items-center justify-center text-[#1E3E2B] shrink-0">
              <svg
                className="w-5 h-5 fill-current"
                style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px" }}
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" opacity="0.1"/>
                <path d="M17 3c-3.87 0-7 3.13-7 7 0 1.63.56 3.13 1.5 4.33C9.64 15.65 8 18.63 8 22h2c0-4.42 3.58-8 8-8 1.63 0 3.13.56 4.33 1.5.86-1.42 1.37-3.08 1.37-4.85 0-4.22-3.48-7.65-6.7-7.65zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#162D1F]">
              Lore
            </span>
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-[#4C5A50]">
            <a href="#how-it-works" className="hover:text-[#18261E] transition-colors">
              How It Works
            </a>
            <a href="#mcp" className="hover:text-[#18261E] transition-colors">
              Coding Agents (MCP)
            </a>
            <a href="#evidence" className="hover:text-[#18261E] transition-colors">
              Evidence & Trust
            </a>
            <a href="#pricing" className="hover:text-[#18261E] transition-colors">
              Pilot Program
            </a>
          </nav>
        </div>

        {/* Right Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="text-xs font-semibold text-[#294B37] hover:text-[#18261E] px-4 py-2 rounded-xl transition-colors"
          >
            Sign in
          </button>
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-2 bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            <span>Get started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Hero Section with Product Stage (Section 4.1 Polish) */}
      <section className="relative overflow-hidden pt-12 pb-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-5 pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F0EA] border border-[#D3E1D7] text-xs font-semibold text-[#2C573E]">
            <Sparkles className="w-3.5 h-3.5 text-[#306847]" />
            <span>Decision memory for engineering teams</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#14261B] leading-[1.12]">
            The Verified <span className="italic font-normal">Why</span> Behind <br />
            Your Code Changes.
          </h1>

          <p className="text-sm sm:text-base text-[#4C5A50] max-w-2xl mx-auto leading-relaxed">
            Captures unwritten architectural rationale at the moment of code change, validates it with team leads, and gives engineers and AI coding agents the context they need to never repeat past mistakes.
          </p>

          {/* Consolidated Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#224332] hover:bg-[#183224] text-white text-xs font-semibold shadow-elevated transition-transform active:scale-95"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F2F6F3] text-[#244533] text-xs font-semibold border border-[#D5E1D8] shadow-2xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current text-[#224332]" />
              <span>Watch the 60-second tour</span>
            </button>
          </div>

          {/* Sourced Answers Trust Row (Section 2 Item 2 Polish) */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#4C5A50]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#2E6B47]" /> Every answer cites its source
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#2E6B47]" /> Permission-aware retrieval
            </span>
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-[#2E6B47]" /> You approve what is shared
            </span>
            <span className="flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-[#2E6B47]" /> Voice or text, your choice
            </span>
          </div>
        </div>

        {/* 3. The Product Stage (Live Floating Demo Card - Section 4.1 Polish) */}
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="text-right pb-2">
            <span className="text-[10px] font-mono text-[#789384] bg-white/80 px-2 py-0.5 rounded border border-[#DFE7E1]">
              Illustrative product preview
            </span>
          </div>

          <div className="relative rounded-3xl bg-white border border-[#D8E4DC] p-6 sm:p-8 shadow-card space-y-5">
            {/* Mock User / Coding Agent Question */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-[#EBF2EC] text-[#162B1E] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs font-medium border border-[#D3E1D7]">
                Why did we choose deterministic UUIDv5 idempotency keys for payment retries?
              </div>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                alt="New Hire"
                className="w-8 h-8 rounded-full object-cover border border-[#D5E1D8]"
              />
            </div>

            {/* Lore Verified Answer Card */}
            <div className="p-5 rounded-2xl bg-[#FAFBF9] border border-[#DEE7E0] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#E6EFE8] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-[#2E5B42]" />
                  </div>
                  <span className="text-xs font-semibold text-[#18261E]">
                    Lore Knowledge Mentor
                  </span>
                </div>
                <span className="text-[10px] bg-[#E8F6ED] text-[#1E7445] px-2.5 py-0.5 rounded-full font-semibold border border-[#C5E9D3] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Verified by Ananya Kulkarni
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#273B2F] leading-relaxed">
                The billing service enforces deterministic UUIDv5 idempotency keys <span className="inline-block bg-[#EBF2EC] text-[#1E3E2B] px-1.5 py-0.2 rounded text-[11px] font-mono font-semibold">[1]</span> because network timeouts between client checkouts and Stripe were producing duplicate payment charges. Using a persistent key generated from <code>user_id + order_id + attempt_window</code> guarantees Stripe deduplicates retried requests.
              </p>

              {/* Evaluated Alternatives block */}
              <div className="p-3 rounded-xl bg-white border border-[#E2EBE5] text-xs text-[#3E5C4B] space-y-1">
                <div className="font-semibold text-[11px] uppercase tracking-wider text-[#2D563E]">
                  Evaluated Alternatives:
                </div>
                <div>• Random client UUIDv4: Rejected (client re-generates new key on re-render)</div>
                <div>• DB row locks during checkout: Rejected (caused connection pool exhaustion)</div>
              </div>

              {/* Source Card Link */}
              <div className="pt-2 border-t border-[#EDF3EE] flex items-center justify-between text-xs text-[#52705E]">
                <span className="flex items-center gap-1.5">
                  <GitCommit className="w-3.5 h-3.5 text-[#2E5840]" />
                  <span>Linked PR: <strong>PR #142 (Merged)</strong> · Core Billing Gateway</span>
                </span>
                <button
                  onClick={onOpenAuth}
                  className="font-semibold text-[#224332] hover:underline"
                >
                  Inspect Decision Record →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works (Capture ➔ Connect ➔ Ask) */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 bg-[#F1F5F2] border-y border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#2D5840] uppercase tracking-wider">
              HOW IT WORKS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#18261E]">
              From Code Changes to Permanent Rationale
            </h2>
            <p className="text-xs sm:text-sm text-[#5B7767]">
              A non-intrusive workflow that captures decisions at the moment of change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-3">
              <div className="text-3xl font-serif font-bold text-[#2C573F]">01</div>
              <h3 className="font-semibold text-base text-[#18261E]">PR Change Debrief</h3>
              <p className="text-xs text-[#4C5A50] leading-relaxed">
                When a qualifying PR touches critical services, Lore prompts a 3-minute opt-in debrief (voice note or text) asking why the change was made and what was rejected.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-3">
              <div className="text-3xl font-serif font-bold text-[#2C573F]">02</div>
              <h3 className="font-semibold text-base text-[#18261E]">Author Review</h3>
              <p className="text-xs text-[#4C5A50] leading-relaxed">
                Lore extracts the structured decision (context, alternatives, invalidation rules). The author self-approves, creating a versioned Trust Layer.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-3">
              <div className="text-3xl font-serif font-bold text-[#2C573F]">03</div>
              <h3 className="font-semibold text-base text-[#18261E]">Engineers & Agents Query</h3>
              <p className="text-xs text-[#4C5A50] leading-relaxed">
                Developers ask questions in Slack or the web UI, while AI coding agents query via MCP to understand past constraints before proposing refactors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Coding Agents Section (MCP Server) */}
      <section id="mcp" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#DCE5DF] p-8 sm:p-12 shadow-card flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2 space-y-4">
            <span className="text-xs font-semibold text-[#305E43] uppercase tracking-wider">
              AGENT-FIRST CONTEXT ENGINE
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#18261E]">
              Built for Cursor, Claude Code, and Copilot.
            </h3>
            <p className="text-xs sm:text-sm text-[#4C5A50] leading-relaxed">
              AI agents are now writing large portions of codebase changes. Without verified rationale, coding agents frequently revert intentional workarounds or violate architectural constraints.
            </p>
            <p className="text-xs text-[#4C5A50] leading-relaxed">
              Lore exposes a <strong>read-only Model Context Protocol (MCP) server</strong> so coding agents can fetch human-verified decisions before refactoring code.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAuth}
                className="px-5 py-2.5 rounded-xl bg-[#224332] text-white text-xs font-semibold hover:bg-[#1B3629] transition-all"
              >
                Test MCP Endpoint →
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 bg-[#14231A] text-[#A6D5B8] p-5 rounded-2xl font-mono text-xs border border-[#233B2D] shadow-inner overflow-x-auto w-full">
            <div className="text-[10px] text-[#558668] pb-2 border-b border-[#233B2D] mb-3">
              // Coding Agent JSON-RPC 2.0 query to Lore MCP
            </div>
            <pre className="text-[11px] leading-relaxed">
{`{
  "jsonrpc": "2.0",
  "method": "tools/call",
  "params": {
    "name": "get_verified_decision",
    "arguments": { "system_or_keyword": "billing" }
  }
}

// Lore Response:
{
  "title": "Billing Idempotency Keys Architecture",
  "decision": "Enforce deterministic UUIDv5",
  "alternatives_rejected": ["Random UUIDv4", "DB row locks"],
  "status": "verified",
  "linked_pr": "PR #142 (Merged)"
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* 6. Social Proof / Design Partner Testimonials */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#F8FAF8] border border-[#DEE7E0] p-8 sm:p-12 relative">
          <p className="font-serif italic text-base sm:text-lg text-[#23382B] leading-relaxed max-w-3xl">
            &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
          </p>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={testimonials[activeTestimonial].avatar}
                alt={testimonials[activeTestimonial].author}
                className="w-10 h-10 rounded-full object-cover border border-[#D5E1D8]"
              />
              <div>
                <div className="text-xs font-semibold text-[#18261E]">
                  {testimonials[activeTestimonial].author}
                </div>
                <div className="text-[11px] text-[#698474]">
                  {testimonials[activeTestimonial].role}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setActiveTestimonial((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1
                  )
                }
                className="w-8 h-8 rounded-full bg-white border border-[#D5E1D8] flex items-center justify-center hover:bg-[#EEF4EF] text-[#2F5740]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
                }
                className="w-8 h-8 rounded-full bg-white border border-[#D5E1D8] flex items-center justify-center hover:bg-[#EEF4EF] text-[#2F5740]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Conversion Band */}
      <section className="pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#183626] text-white p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Ready to preserve the why behind your code?
            </h2>
            <p className="text-xs sm:text-sm text-[#A9CDB7]">
              Join the engineering design-partner pilot program. Connect your first repo in minutes.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-[#183626] hover:bg-[#EBF2EC] text-xs font-semibold shadow-md transition-all"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Polished Enterprise Footer (Section 4.5 Polish) */}
      <footer className="border-t border-[#E7E9E1] bg-[#F7F7F2] py-12 px-6 sm:px-12 text-xs text-[#5C7867]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-xs text-[#18261E] mb-3">Product</h4>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:underline">PR Change Debrief</a></li>
              <li><a href="#mcp" className="hover:underline">Coding Agent MCP</a></li>
              <li><a href="#evidence" className="hover:underline">Verification Engine</a></li>
              <li><button onClick={onOpenAuth} className="hover:underline text-left">Pilot Workspace</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-[#18261E] mb-3">Integrations</h4>
            <ul className="space-y-2">
              <li>GitHub App & Webhooks</li>
              <li>Slack DM Capture</li>
              <li>Jira & Confluence</li>
              <li>Cursor & Claude Code</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-[#18261E] mb-3">Security & Trust</h4>
            <ul className="space-y-2">
              <li>Zero-Knowledge Tenant Isolation</li>
              <li>DPDP & GDPR Audio Purge</li>
              <li>Row-Level Security (RLS)</li>
              <li>security@lore.engineering</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xs text-[#18261E] mb-3">Company</h4>
            <p className="font-serif italic text-sm text-[#244533] leading-relaxed mb-2">
              &ldquo;Capture once. Understand forever.&rdquo;
            </p>
            <p className="text-[11px] text-[#6E8879]">
              Built with engineering design partners across robotics, fintech, and platform teams.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#E7E9E1] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#789384]">
          <span>© 2026 Lore Technologies Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#1E7445]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" /> Systems Operational
            </span>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
