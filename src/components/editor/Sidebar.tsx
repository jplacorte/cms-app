"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { BarChart3, LayoutTemplate } from "lucide-react";

export default function EditorSidebar() {
  const addBlock = useEditorStore((state) => state.addBlock);

  const handleAddHero = () => {
    addBlock("HeroSection", {
      heading: "Build the Future.",
      subheading: "Modern architectures and scalable systems for the open web.",
      ctaText: "View Projects",
      ctaLink: "/projects",
    });
  };

  const handleAddMetrics = () => {
    addBlock("MetricsGrid", {
      metrics: [
        {
          id: "1",
          layoutType: "standard",
          title: "SYSTEM UPTIME",
          value: "99.9%",
          subtext: "Trailing 30 days",
          badge: { text: "STABLE", variant: "default" },
        },
        {
          id: "2",
          layoutType: "highlight",
          title: "SERVER LOAD",
          value: "42%",
          subtext: "Capacity remaining",
          progressPercentage: 42,
        },
      ],
    });
  };

  return (
    <div className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col h-full shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
      <h2 className="text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
        Components
      </h2>

      <div className="space-y-3">
        <button
          onClick={handleAddHero}
          className="w-full flex items-center gap-3 text-left px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-slate-700 font-medium text-sm"
        >
          <LayoutTemplate size={18} className="text-blue-500" />
          Hero Section
        </button>

        <button
          onClick={handleAddMetrics}
          className="w-full flex items-center gap-3 text-left px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all text-slate-700 font-medium text-sm"
        >
          <BarChart3 size={18} className="text-emerald-500" />
          Metrics Grid
        </button>
      </div>
    </div>
  );
}
