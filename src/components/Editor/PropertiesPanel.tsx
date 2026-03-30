"use client";

import { EditorBlock, useEditorStore } from "@/store/useEditorStore";
import { SectionHeading } from "@/lib/ui/SectionHeading";
import { TextInput } from "@/lib/ui/TextInput";

// Property Components
import NavbarBlock from "./properties/NavbarBlock";
import HeroSection from "./properties/HeroSection";
import CustomButton from "./properties/CustomButton";
import TextBlock from "./properties/TextBlock";
import ImageBlock from "./properties/ImageBlock";
import GridContainer from "./properties/GridContainer";
import ContainerSection from "./properties/ContainerSection";
import MetricsGrid from "./properties/MetricsGrid";
import SpacerBlock from "./properties/SpacerBlock";
import DividerBlock from "./properties/DividerBlock";
import VideoBlock from "./properties/VideoBlock";
import AccordionBlock from "./properties/AccordionBlock";
import TestimonialBlock from "./properties/TestimonialBlock";
import PricingTableBlock from "./properties/PricingTableBlock";
import SidebarNavBlock from "./properties/SidebarNavBlock";
import FooterBlock from "./properties/FooterBlock";
import ContactFormBlock from "./properties/ContactFormBlock";
import CardBlock from "./properties/CardBlock";
import SocialLinksBlock from "./properties/SocialLinksBlock";

const findBlockInTree = (
  blocks: EditorBlock[],
  id: string,
): EditorBlock | undefined => {
  for (const block of blocks) {
    if (block.id === id) return block;
    if (block.children) {
      const found = findBlockInTree(block.children, id);
      if (found) return found;
    }
  }
  return undefined;
};

export default function PropertiesPanel() {
  const { blocks, activeBlockId, updateBlock, setActiveBlock } =
    useEditorStore();

  const activeBlock = activeBlockId
    ? findBlockInTree(blocks, activeBlockId)
    : undefined;

  if (!activeBlock) {
    return (
      <div className="w-96 bg-slate-50 border-l border-slate-200 p-6 flex flex-col items-center justify-center text-center text-slate-400 z-10 shrink-0">
        <p className="text-sm">
          Select a block on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (activeBlock.data || {}) as any;
  const handleChange = (key: string, value: unknown) => {
    updateBlock(activeBlock.id, { [key]: value });
  };

  const weightOptions = [
    { value: "300", label: "Light" },
    { value: "400", label: "Normal" },
    { value: "500", label: "Medium" },
    { value: "600", label: "Semibold" },
    { value: "700", label: "Bold" },
    { value: "800", label: "Extra Bold" },
    { value: "900", label: "Black" },
  ];
  
  const transformOptions = [
    { value: "none", label: "Normal" },
    { value: "uppercase", label: "UPPERCASE" },
    { value: "lowercase", label: "lowercase" },
    { value: "capitalize", label: "Capitalize" },
  ];

  const textAlignOptions = [
    { value: "left", label: "Left" },
    { value: "center", label: "Center" },
    { value: "right", label: "Right" },
    { value: "justify", label: "Justify" },
  ];

  const renderProperties = () => {
    const props = { data, handleChange };
    
    switch (activeBlock.type) {
      case "NavbarBlock":
        return <NavbarBlock {...props} weightOptions={weightOptions} />;
      case "HeroSection":
        return (
          <HeroSection 
            {...props} 
            weightOptions={weightOptions} 
            transformOptions={transformOptions} 
            textAlignOptions={textAlignOptions} 
          />
        );
      case "CustomButton":
        return <CustomButton {...props} weightOptions={weightOptions} />;
      case "TextBlock":
        return <TextBlock {...props} weightOptions={weightOptions} textAlignOptions={textAlignOptions} />;
      case "ImageBlock":
        return <ImageBlock {...props} />;
      case "GridContainer":
        return <GridContainer {...props} />;
      case "ContainerSection":
        return <ContainerSection {...props} />;
      case "MetricsGrid":
        return <MetricsGrid {...props} />;
      case "SpacerBlock":
        return <SpacerBlock {...props} />;
      case "DividerBlock":
        return <DividerBlock {...props} />;
      case "VideoBlock":
        return <VideoBlock {...props} />;
      case "AccordionBlock":
        return <AccordionBlock {...props} />;
      case "TestimonialBlock":
        return <TestimonialBlock {...props} />;
      case "PricingTableBlock":
        return <PricingTableBlock {...props} />;
      case "SidebarNavBlock":
        return <SidebarNavBlock {...props} />;
      case "FooterBlock":
        return <FooterBlock {...props} />;
      case "ContactFormBlock":
        return <ContactFormBlock {...props} />;
      case "CardBlock":
        return <CardBlock {...props} />;
      case "SocialLinksBlock":
        return <SocialLinksBlock {...props} textAlignOptions={textAlignOptions} />;
      default:
        return (
          <div className="p-4 text-sm text-slate-500 italic">
            No specific properties for this block type.
          </div>
        );
    }
  };

  return (
    <div className="w-96 bg-white border-l border-slate-200 flex flex-col h-full shadow-[-4px_0_24px_rgba(0,0,0,0.02)] z-10 overflow-y-auto shrink-0">
      <div className="flex justify-between items-center p-4 border-b border-slate-100 sticky top-0 bg-white z-20">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          Edit {activeBlock.type}
        </h2>
        <button
          onClick={() => setActiveBlock(null)}
          className="text-slate-400 hover:text-slate-600 text-lg"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-6">
        {renderProperties()}

        {/* GLOBAL ADVANCED SETTINGS */}
        <div className="space-y-4 pt-4 border-t border-slate-200 mt-6">
          <SectionHeading>Advanced Settings</SectionHeading>
          <TextInput 
            label="Font Family" 
            value={data.fontFamily as string || ""} 
            onChange={(v) => handleChange("fontFamily", v)} 
            placeholder="e.g. Inter, Roboto, sans-serif" 
          />
          <TextInput 
            label="Custom Tailwind Classes" 
            value={data.className || ""} 
            onChange={(v) => handleChange("className", v)} 
            placeholder="e.g. hidden md:flex shadow-xl" 
          />
        </div>
      </div>
    </div>
  );
}