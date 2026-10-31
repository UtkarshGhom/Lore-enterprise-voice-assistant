"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  MoreVertical,
  Volume2,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { KnowledgeRecord } from "@/lib/data";

interface KnowledgeLibraryViewProps {
  records: KnowledgeRecord[];
  onSelectRecord: (record: KnowledgeRecord) => void;
  onNewCapture: () => void;
}

export default function KnowledgeLibraryView({
  records,
  onSelectRecord,
  onNewCapture,
}: KnowledgeLibraryViewProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Engineering",
    "Robotics",
    "Hardware",
    "Operations",
    "Product",
    "DevOps",
  ];

  const filtered = records.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(search.toLowerCase()) ||
      rec.summary.toLowerCase().includes(search.toLowerCase()) ||
      rec.contributor.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || rec.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Top Header & Search matching Screen 4 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            Repository
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Knowledge Library
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Search, filter and explore all institutional knowledge records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#7A9182] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search knowledge..."
              className="pl-9 pr-4 py-2 bg-white rounded-xl border border-[#D5E1D8] text-xs text-[#18261E] placeholder-[#7F9789] focus:outline-none focus:border-[#224332] w-64 shadow-2xs"
            />
          </div>

          {/* + New Button */}
          <button
            onClick={onNewCapture}
            className="flex items-center gap-1.5 bg-[#224332] hover:bg-[#1B3629] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Capture</span>
          </button>
        </div>
      </div>

      {/* Category Pills matching Screen 4 */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-[#224332] text-white font-semibold shadow-2xs"
                : "bg-white text-[#526D5D] hover:bg-[#EEF4F0] border border-[#D9E4DC]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Knowledge Items Table */}
      <div className="bg-white rounded-3xl border border-[#DCE6DF] overflow-hidden shadow-card">
        <div className="divide-y divide-[#EDF3EF]">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-[#738C7D] text-sm">
              No knowledge records found matching your query.
            </div>
          ) : (
            filtered.map((record) => (
              <div
                key={record.id}
                onClick={() => onSelectRecord(record)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F9FAF8] transition-colors cursor-pointer group"
              >
                {/* Thumbnail & Title */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#EAEFEA] shrink-0 border border-[#DDE7DF]">
                    <img
                      src={record.thumbnail}
                      alt={record.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm text-[#18261E] group-hover:text-[#224332] truncate transition-colors">
                        {record.title}
                      </h3>
                      <span className="text-[10px] font-mono bg-[#EEF4EF] text-[#42614F] px-2 py-0.5 rounded-md">
                        {record.category}
                      </span>
                    </div>
                    <p className="text-xs text-[#637E6F] mt-1 line-clamp-1">
                      {record.summary}
                    </p>
                  </div>
                </div>

                {/* Contributor and Date info */}
                <div className="flex items-center gap-6 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={record.contributor.avatar}
                      alt={record.contributor.name}
                      className="w-7 h-7 rounded-full object-cover border border-[#DFE7E1]"
                    />
                    <div>
                      <div className="text-xs font-semibold text-[#1C2C22]">
                        {record.contributor.name}
                      </div>
                      <div className="text-[10px] text-[#768C7F]">
                        {record.date}
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="w-28 text-right">
                    {record.status === "verified" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF7EF] text-[#1E7445] border border-[#C6EAD3]">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                    {record.status === "review_due" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF7ED] text-[#C2410C] border border-[#FED7AA]">
                        <Clock className="w-3 h-3" /> Review due
                      </span>
                    )}
                    {record.status === "draft" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]">
                        Draft
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg hover:bg-[#EAEFEA] text-[#869E8F] transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
