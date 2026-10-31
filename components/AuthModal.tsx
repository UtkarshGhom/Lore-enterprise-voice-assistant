"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Github,
  Mail,
  Lock,
  UserCheck,
  Check,
  Building,
} from "lucide-react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Lead Architect" | "VP of Engineering" | "Software Engineer";
  team: string;
  avatar: string;
  githubLogin?: string;
}

export const demoUsers: UserSession[] = [
  {
    id: "usr-1",
    name: "Alex Chen",
    email: "alex.chen@northstar.io",
    role: "Lead Architect",
    team: "Core Platform & Infrastructure",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    githubLogin: "alexchen-dev",
  },
  {
    id: "usr-2",
    name: "Elena Rostova",
    email: "elena.r@northstar.io",
    role: "VP of Engineering",
    team: "Engineering Leadership",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    githubLogin: "elena-eng",
  },
  {
    id: "usr-3",
    name: "David Kim",
    email: "david.kim@northstar.io",
    role: "Software Engineer",
    team: "Payments & Billing (New Hire)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    githubLogin: "dkim99",
  },
];

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserSession) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "demo">("signin");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: `usr-${Date.now()}`,
        name: email.split("@")[0] || "Engineer",
        email: email || "engineer@company.io",
        role: "Software Engineer",
        team: "Core Platform",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      });
      onClose();
    }, 600);
  };

  const handleSelectDemoUser = (user: UserSession) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#D5E1D8] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xs text-[#7A9384] hover:text-[#18261E] bg-[#F2F6F3] w-7 h-7 rounded-full flex items-center justify-center"
        >
          ✕
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="w-10 h-10 rounded-2xl bg-[#E8F0EA] flex items-center justify-center mx-auto text-[#1E3E2B]">
            <svg
              className="w-5 h-5 fill-current"
              style={{ width: "22px", height: "22px" }}
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" opacity="0.1"/>
              <path d="M17 3c-3.87 0-7 3.13-7 7 0 1.63.56 3.13 1.5 4.33C9.64 15.65 8 18.63 8 22h2c0-4.42 3.58-8 8-8 1.63 0 3.13.56 4.33 1.5.86-1.42 1.37-3.08 1.37-4.85 0-4.22-3.48-7.65-6.7-7.65zm0 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#18261E]">
            Welcome to Lore
          </h2>
          <p className="text-xs text-[#526D5D]">
            The verified decision memory for engineering teams.
          </p>
        </div>

        {/* Tab switch between Direct Login & 1-Click Persona Login */}
        <div className="flex items-center gap-1 p-1 bg-[#F2F6F3] rounded-2xl text-xs font-semibold">
          <button
            onClick={() => setAuthMode("signin")}
            className={`flex-1 py-1.5 rounded-xl transition-all ${
              authMode === "signin"
                ? "bg-white text-[#18261E] shadow-2xs"
                : "text-[#5A7968] hover:text-[#18261E]"
            }`}
          >
            Work Email / SSO
          </button>
          <button
            onClick={() => setAuthMode("demo")}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              authMode === "demo"
                ? "bg-white text-[#18261E] shadow-2xs"
                : "text-[#5A7968] hover:text-[#18261E]"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2E7D52]" />
            <span>1-Click Personas</span>
          </button>
        </div>

        {authMode === "signin" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* OAuth Buttons */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleSelectDemoUser(demoUsers[0])}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white border border-[#D5E1D8] hover:bg-[#F8FAF8] text-xs font-semibold text-[#18261E] shadow-2xs transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Continue with GitHub</span>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoUser(demoUsers[1])}
                className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-white border border-[#D5E1D8] hover:bg-[#F8FAF8] text-xs font-semibold text-[#18261E] shadow-2xs transition-all"
              >
                <Building className="w-4 h-4 text-[#4285F4]" />
                <span>Sign in with Google Workspace SSO</span>
              </button>
            </div>

            <div className="flex items-center gap-3 py-1">
              <div className="h-px bg-[#EEF3EF] flex-1" />
              <span className="text-[10px] text-[#869E8F] uppercase tracking-wider font-semibold">
                or work email
              </span>
              <div className="h-px bg-[#EEF3EF] flex-1" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3C5846] mb-1">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#7A9384] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAF8] border border-[#D5E1D8] rounded-xl focus:outline-none focus:border-[#224332]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3C5846] mb-1">
                  Password / Magic Link
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#7A9384] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs bg-[#F8FAF8] border border-[#D5E1D8] rounded-xl focus:outline-none focus:border-[#224332]"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#224332] hover:bg-[#1B3629] text-white text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>{isLoading ? "Signing in..." : "Continue to Workspace"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-[#5C7867] text-center mb-1">
              Test Lore immediately as different engineering stakeholders:
            </p>

            {demoUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => handleSelectDemoUser(user)}
                className="p-3.5 rounded-2xl border border-[#DCE5DF] bg-[#FAFBF9] hover:bg-white hover:border-[#BED6C6] hover:shadow-card transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#D5E1D8]"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-[#18261E] group-hover:text-[#224332]">
                      {user.name}
                    </h4>
                    <span className="text-[10px] text-[#698474] block">
                      {user.role} · {user.team}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#85A090] group-hover:translate-x-1 group-hover:text-[#224332] transition-transform" />
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-[#EEF3EF] text-center">
          <span className="text-[11px] text-[#789384] flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D52]" /> Zero-knowledge tenant isolation with RLS enabled
          </span>
        </div>
      </div>
    </div>
  );
}
