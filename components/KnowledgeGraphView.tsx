"use client";

import React, { useState } from "react";
import {
  Share2,
  Users,
  Cpu,
  FolderGit2,
  CheckCircle2,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  subLabel: string;
  category: "people" | "systems" | "projects" | "decisions" | "center";
  x: number;
  y: number;
  color: string;
  borderColor: string;
}

export default function KnowledgeGraphView() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const centerNode: GraphNode = {
    id: "lidar",
    label: "LiDAR Sensor",
    subLabel: "Core Hardware System",
    category: "center",
    x: 400,
    y: 250,
    color: "#1E3E2B",
    borderColor: "#162D20",
  };

  const peripheralNodes: GraphNode[] = [
    {
      id: "rohit",
      label: "Rohit Sharma",
      subLabel: "Primary Hardware SME",
      category: "people",
      x: 400,
      y: 90,
      color: "#FFFFFF",
      borderColor: "#C5D8CC",
    },
    {
      id: "field_dep",
      label: "Field Deployment",
      subLabel: "Active Project",
      category: "projects",
      x: 630,
      y: 140,
      color: "#FFFFFF",
      borderColor: "#FBCFE8",
    },
    {
      id: "temp_drift",
      label: "Temperature Drift",
      subLabel: "Observed Hardware Issue",
      category: "decisions",
      x: 640,
      y: 270,
      color: "#FFFFFF",
      borderColor: "#FED7AA",
    },
    {
      id: "hw_team",
      label: "Hardware Team",
      subLabel: "Responsible Dept",
      category: "people",
      x: 580,
      y: 380,
      color: "#FFFFFF",
      borderColor: "#C5D8CC",
    },
    {
      id: "motor_ctrl",
      label: "Motor Controller",
      subLabel: "Related Actuator System",
      category: "systems",
      x: 350,
      y: 400,
      color: "#FFFFFF",
      borderColor: "#BFDBFE",
    },
    {
      id: "calib_tools",
      label: "Calibration Tools",
      subLabel: "Bench Utility System",
      category: "systems",
      x: 180,
      y: 330,
      color: "#FFFFFF",
      borderColor: "#BFDBFE",
    },
    {
      id: "sensor_calib",
      label: "Sensor Calibration",
      subLabel: "Verified Procedure SOP",
      category: "decisions",
      x: 180,
      y: 170,
      color: "#FFFFFF",
      borderColor: "#C6EAD3",
    },
  ];

  const visibleNodes = peripheralNodes.filter(
    (n) => activeCategory === "all" || n.category === activeCategory
  );

  return (
    <div className="p-8 max-w-[1440px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[#2D563E] uppercase tracking-wider">
            RELATIONAL MEMORY
          </span>
          <h1 className="font-serif text-3xl font-bold text-[#18261E]">
            Knowledge Graph
          </h1>
          <p className="text-xs text-[#6B8073] mt-0.5">
            Connect people, systems, projects and decisions across your organization.
          </p>
        </div>

        {/* Filter Pills matching Screen 8 */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-[#D5E1D8] shadow-2xs">
          {[
            { id: "all", label: "All" },
            { id: "people", label: "People" },
            { id: "systems", label: "Systems" },
            { id: "projects", label: "Projects" },
            { id: "decisions", label: "Decisions" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#224332] text-white font-semibold"
                  : "text-[#547060] hover:bg-[#EEF4EF]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas Graph Visualization */}
      <div className="relative bg-white rounded-3xl border border-[#DCE5DF] p-6 shadow-card h-[520px] overflow-hidden flex items-center justify-center">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#2F5D44_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <svg className="w-full h-full max-w-4xl" viewBox="0 0 800 500">
          {/* Connector lines from Center to Peripheral */}
          {visibleNodes.map((node) => (
            <line
              key={`line-${node.id}`}
              x1={centerNode.x}
              y1={centerNode.y}
              x2={node.x}
              y2={node.y}
              stroke={selectedNode?.id === node.id ? "#224332" : "#D4E1D7"}
              strokeWidth={selectedNode?.id === node.id ? "2.5" : "1.5"}
              strokeDasharray={node.category === "projects" ? "4 4" : "none"}
            />
          ))}

          {/* Center Hub Node (LiDAR Sensor) */}
          <g
            className="cursor-pointer group"
            onClick={() => setSelectedNode(centerNode)}
          >
            <circle
              cx={centerNode.x}
              cy={centerNode.y}
              r="48"
              fill="#1C3A29"
              stroke="#13271C"
              strokeWidth="3"
              className="group-hover:scale-105 transition-transform origin-center shadow-lg"
            />
            <text
              x={centerNode.x}
              y={centerNode.y - 4}
              textAnchor="middle"
              fill="#FFFFFF"
              fontSize="12"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              LiDAR
            </text>
            <text
              x={centerNode.x}
              y={centerNode.y + 12}
              textAnchor="middle"
              fill="#A7D4B8"
              fontSize="10"
              fontFamily="sans-serif"
            >
              Sensor Hub
            </text>
          </g>

          {/* Peripheral Nodes */}
          {visibleNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <g
                key={node.id}
                className="cursor-pointer group"
                onClick={() => setSelectedNode(node)}
              >
                {/* Node Pill Box */}
                <rect
                  x={node.x - 70}
                  y={node.y - 20}
                  width="140"
                  height="40"
                  rx="12"
                  fill="#FFFFFF"
                  stroke={isSelected ? "#224332" : node.borderColor}
                  strokeWidth={isSelected ? "2.5" : "1.5"}
                  className="shadow-sm group-hover:fill-[#F4F8F5] transition-all"
                />
                <text
                  x={node.x}
                  y={node.y - 2}
                  textAnchor="middle"
                  fill="#18261E"
                  fontSize="11"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.label}
                </text>
                <text
                  x={node.x}
                  y={node.y + 11}
                  textAnchor="middle"
                  fill="#6C8777"
                  fontSize="9"
                  fontFamily="sans-serif"
                >
                  {node.subLabel}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Node Details Drawer */}
        {selectedNode && (
          <div className="absolute bottom-6 right-6 w-80 bg-white/95 backdrop-blur-md rounded-2xl border border-[#D5E1D8] p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-[#2D563E] uppercase tracking-wider">
                Node Properties
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs text-[#7A9384] hover:text-[#18261E]"
              >
                ✕
              </button>
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-[#18261E]">
                {selectedNode.label}
              </h4>
              <p className="text-xs text-[#637E6F] mt-0.5">
                {selectedNode.subLabel}
              </p>
            </div>
            <div className="text-xs text-[#294232] bg-[#F2F7F4] p-3 rounded-xl border border-[#DEE9E1]">
              <strong>Provenance:</strong> Linked across 4 verified interviews and 2 active deployment projects.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
