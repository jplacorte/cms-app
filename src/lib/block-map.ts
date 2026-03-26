import HeroBlock from "@/components/blocks/HeroBlock";
import StatCardsBlock from "@/components/blocks/StatCardsBlock";
import React from "react";

// We map the exact string types from our JSON to the React components
export const BlockRegistry: Record<string, React.ElementType> = {
  HeroSection: HeroBlock,
  MetricsGrid: StatCardsBlock,
};
