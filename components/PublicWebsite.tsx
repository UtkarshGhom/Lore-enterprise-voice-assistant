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
} from "lucide-react";

interface PublicWebsiteProps {
  onEnterApp: () => void;
  onOpenOnboarding: () => void;
}

export default function PublicWebsite({
  onEnterApp,
  onOpenOnboarding,
}: PublicWebsiteProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Lore has transformed how we preserve tribal knowledge. New engineering hires ramp up 3x faster without constantly tapping senior staff.",
      author: "Priya Sharma",
      role: "Engineering Manager, TechCorp",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "The voice capture interviews are effortless. Our lead architects speak for 10 minutes and Lore extracts complete, verifiable decision records.",
      author: "Marcus Vance",
      role: "VP of Robotics, Apex Automation",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      quote: "The zero-hallucination guarantee gives our compliance team peace of mind. Every single claim links directly back to the original interview timestamp.",
      author: "Elena Rostova",
      role: "Head of Operational Excellence",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F7F2] text-[#202923] selection:bg-[#DEECE2] selection:text-[#1B3629]">
      {/* 1. Public Top Navigation matching Images 2 & 3 */}
      <header className="sticky top-0 z-40 bg-[#F7F7F2]/90 backdrop-blur-md border-b border-[#E7E9E1] px-6 sm:px-12 h-20 flex items-center justify-between">
        <div className="flex items-center gap-10">
          {/* Botanical Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-[#E8F0EA] flex items-center justify-center text-[#1E3E2B] shrink-0">
              <svg className="w-5 h-5 fill-current" style={{ width: "20px", height: "20px", maxWidth: "20px", maxHeight: "20px" }} viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" opacity="0.1"/>
                <path d="M17 3c-3.87 0-7 3.13-7 7 0 1.63.56 3.13 1.5 4.33C9.64 15.65 8 18.63 8 22h2c0-4.42 3.58-8 8-8 1.63 0 3.13.56 4.33 1.5.86-1.42 1.37-3.08 1.37-4.85 0-4.22-3.48-7.65-6.7-7.65zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#162D1F]">
              Lore
            </span>
          </div>

          {/* Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#4D6555]">
            <a href="#product" className="hover:text-[#18261E] transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-[#18261E] transition-colors">
              Solutions
            </a>
            <a href="#integrations" className="hover:text-[#18261E] transition-colors">
              Integrations
            </a>
            <a href="#trust" className="hover:text-[#18261E] transition-colors">
              Security
            </a>
            <a href="#pricing" className="hover:text-[#18261E] transition-colors">
              Pricing
            </a>
          </nav>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onEnterApp}
            className="text-xs font-semibold text-[#294B37] hover:text-[#18261E] px-4 py-2 rounded-xl transition-colors hidden sm:block"
          >
            Sign In
          </button>
          <button
            onClick={onEnterApp}
            className="flex items-center gap-2 bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all hover:shadow-md active:scale-95"
          >
            <span>Launch Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. Panoramic Hero Section with Watercolor Landscape */}
      <section className="relative overflow-hidden pt-12 pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Soft mountain graphic backdrop */}
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-[#EBF2EC]/70 via-[#F7F7F2]/40 to-[#F7F7F2] -z-10 rounded-b-[4rem] pointer-events-none" />

        <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E8F0EA] border border-[#D3E1D7] text-xs font-semibold text-[#2C573E]">
            <Sparkles className="w-3.5 h-3.5 text-[#306847]" />
            <span>The Verified Context Layer for Engineers & Coding Agents</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#14261B] leading-[1.08]">
            The Verified <span className="italic font-normal">Why</span> Behind <br />
            Your Code Changes.
          </h1>

          <p className="text-base sm:text-lg text-[#556D5E] max-w-2xl mx-auto leading-relaxed">
            Lore captures unwritten architectural rationale at the moment of code change. It creates a human-verified decision layer that engineers and AI coding agents can query to never repeat past mistakes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onEnterApp}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#224332] hover:bg-[#183224] text-white text-sm font-semibold shadow-elevated transition-transform active:scale-95"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenOnboarding}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#F2F6F3] text-[#244533] text-sm font-semibold border border-[#D5E1D8] shadow-2xs transition-colors"
            >
              <Play className="w-4 h-4 fill-current text-[#224332]" />
              <span>Interactive Tour</span>
            </button>
          </div>

          {/* Trust points row */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#5E7969]">
            <span className="flex items-center gap-1.5">
              <Mic className="w-4 h-4 text-[#2E6B47]" /> 3-Min PR Change Debrief
            </span>
            <span className="flex items-center gap-1.5">
              <Search className="w-4 h-4 text-[#2E6B47]" /> Verified Decision Records
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#2E6B47]" /> Read-Only MCP Agent Endpoint
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#2E6B47]" /> Zero-Hallucination Guardrail
            </span>
          </div>
        </div>

        {/* 3. Hero Interactive Floating Demonstration Card (Matches Images 2 & 3) */}
        <div className="mt-14 relative max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-md border border-[#D8E4DC] p-6 sm:p-8 shadow-2xl">
            {/* Top Query from Senior Engineer */}
            <div className="flex items-start justify-end gap-3 mb-6">
              <div className="bg-[#EBF2EC] text-[#162B1E] px-4 py-2.5 rounded-2xl rounded-tr-xs text-xs sm:text-sm font-medium border border-[#D3E1D7]">
                Why did we choose this architecture for payment retries?
              </div>
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Expert"
                className="w-8 h-8 rounded-full object-cover border border-[#D5E1D8]"
              />
            </div>

            {/* Audio Wave Visualizer Center Pill */}
            <div className="my-6 p-4 rounded-2xl bg-[#F4F8F5] border border-[#DEECE2] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#224332] text-white flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#18261E] block">
                    Ask Lore anything...
                  </span>
                  <span className="text-[11px] text-[#698474]">
                    Retrieving from 24 verified organizational records
                  </span>
                </div>
              </div>

              {/* Waveform bars */}
              <div className="flex items-center gap-1 h-6">
                {[12, 24, 18, 30, 22, 14, 28, 20, 10].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-[#32674B]"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Grounded Response Card with Verified Badge */}
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
                  <CheckCircle2 className="w-3 h-3" /> Verified by Backend Team
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#273B2F] leading-relaxed">
                The billing service enforces deterministic idempotency keys because client timeouts were producing duplicate payment transactions. Using a persistent UUIDv5 across retry attempts ensures payment gateways recognize repeated operations without charging the customer twice.
              </p>

              <div className="pt-3 border-t border-[#EDF3EE] flex items-center justify-between text-xs text-[#52705E]">
                <span className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-[#2E5840]" /> Source: Architecture Interview with Ananya Kulkarni (05:12)
                </span>
                <span className="font-semibold text-[#224332] cursor-pointer hover:underline">
                  View Source Transcript →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four Core Pillars matching Image 2 */}
      <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto border-t border-[#E8EDE7]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-[#DCE5DF] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-4">
              <Mic className="w-5 h-5 text-[#2B573F]" />
            </div>
            <h3 className="font-semibold text-base text-[#18261E]">Capture Knowledge</h3>
            <p className="text-xs text-[#60796B] mt-2 leading-relaxed">
              Conduct natural voice interviews with departing or senior employees. Lore asks adaptive follow-ups to extract reasoning and exceptions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#DCE5DF] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-4">
              <Search className="w-5 h-5 text-[#2B573F]" />
            </div>
            <h3 className="font-semibold text-base text-[#18261E]">Ask Lore</h3>
            <p className="text-xs text-[#60796B] mt-2 leading-relaxed">
              Get direct, contextual answers backed by verified sources. If knowledge doesn&apos;t exist, Lore admits it rather than hallucinating.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#DCE5DF] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-[#2B573F]" />
            </div>
            <h3 className="font-semibold text-base text-[#18261E]">Connect Insights</h3>
            <p className="text-xs text-[#60796B] mt-2 leading-relaxed">
              Explore relational graphs linking people, hardware sensors, code repositories, and operational decisions in one visual map.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#DCE5DF] shadow-2xs">
            <div className="w-10 h-10 rounded-2xl bg-[#EAF2ED] text-[#224332] flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-[#2B573F]" />
            </div>
            <h3 className="font-semibold text-base text-[#18261E]">Trust the Memory</h3>
            <p className="text-xs text-[#60796B] mt-2 leading-relaxed">
              Human-in-the-loop review queue ensures raw drafts are vetted before becoming organizational truth. Complete audit trails included.
            </p>
          </div>
        </div>
      </section>

      {/* 5. How It Works (1. Capture -> 2. Organize -> 3. Ask) matching Images 2 & 3 */}
      <section id="how-it-works" className="py-20 px-6 sm:px-12 bg-[#F1F5F2] border-y border-[#E2EAE3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-[#2D5840] uppercase tracking-wider">
              HOW IT WORKS
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#18261E]">
              From Conversations to Company Knowledge
            </h2>
            <p className="text-sm text-[#5B7767]">
              A simple, structured workflow to capture, organize and share institutional intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-4">
              <div className="text-4xl font-serif font-bold text-[#2C573F]">01</div>
              <h3 className="font-semibold text-lg text-[#18261E]">Capture</h3>
              <p className="text-xs text-[#60796B] leading-relaxed">
                Record expert conversations or ingest documents, meeting transcripts, and Slack channels. Adaptive AI asks targeted follow-ups.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-4">
              <div className="text-4xl font-serif font-bold text-[#2C573F]">02</div>
              <h3 className="font-semibold text-lg text-[#18261E]">Organize & Verify</h3>
              <p className="text-xs text-[#60796B] leading-relaxed">
                Lore structures messy recordings into decisions, context, procedures, and failure modes. Experts review and sign off.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl border border-[#DCE5DF] p-8 shadow-card space-y-4">
              <div className="text-4xl font-serif font-bold text-[#2C573F]">03</div>
              <h3 className="font-semibold text-lg text-[#18261E]">Ask & Mentor</h3>
              <p className="text-xs text-[#60796B] leading-relaxed">
                New hires and cross-functional teams ask questions in plain language and receive grounded answers with citations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Social Proof & Testimonials matching Image 2 */}
      <section className="py-20 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#DCE5DF] p-8 sm:p-12 shadow-card flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/3 space-y-4">
            <span className="text-xs font-semibold text-[#305E43] uppercase tracking-wider">
              Trusted by Innovative Teams
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
              Join forward-thinking companies that rely on Lore.
            </h3>
            <div className="flex items-center gap-6 pt-2 opacity-60 grayscale hover:grayscale-0 transition-all">
              <span className="font-bold text-sm tracking-widest text-[#244532]">GOOGLE</span>
              <span className="font-bold text-sm tracking-widest text-[#244532]">ADOBE</span>
              <span className="font-bold text-sm tracking-widest text-[#244532]">STRIPE</span>
              <span className="font-bold text-sm tracking-widest text-[#244532]">AIRBNB</span>
            </div>
          </div>

          <div className="lg:w-2/3 bg-[#F8FAF8] p-8 rounded-2xl border border-[#DEE7E0] relative">
            <p className="font-serif italic text-base sm:text-lg text-[#23382B] leading-relaxed">
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

              {/* Carousel controls */}
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
        </div>
      </section>

      {/* 7. Final Conversion CTA Banner matching Images 2 & 3 */}
      <section className="pb-24 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="rounded-3xl bg-[#183626] text-white p-10 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Ready to unlock your organization&apos;s knowledge?
            </h2>
            <p className="text-xs sm:text-sm text-[#A9CDB7]">
              Start your workspace today and turn everyday experience into forever memory.
            </p>
            <div className="pt-2 flex justify-center">
              <button
                onClick={onEnterApp}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-[#183626] hover:bg-[#EBF2EC] text-xs font-semibold shadow-md transition-all"
              >
                <span>Launch Workspace Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
