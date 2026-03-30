"use client";

import { BlockRegistry } from "@/lib/block-map";
import { EditorBlock, useEditorStore } from "@/store/useEditorStore";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, TrashIcon } from "lucide-react";
import { Resizable } from "re-resizable";
import { useState } from "react";

export function SortableBlock({ block }: { block: EditorBlock }) {
  const { activeBlockId, removeBlock, setActiveBlock, updateBlock } =
    useEditorStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  const isText = block.type === "TextBlock";
  const isContainer = block.type === "ContainerSection" || block.type === "GridContainer";
  const isActive = activeBlockId === block.id;

  // Local state for smooth real-time resizing preview
  const [localSize, setLocalSize] = useState<{ width: string | number; height: string | number } | null>(null);

  const currentWidth = localSize?.width ?? ((block.data.width as string | number) || (block.type === "CustomButton" ? "auto" : "100%"));
  const currentHeight = isText ? "auto" : (localSize?.height ?? ((block.data.height as string | number) || "auto"));

  const isAutoHeight = currentHeight === "auto";
  const heightClass = isAutoHeight ? "h-auto" : "h-full";

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    width: "100%", // Let it span the container
  };

  const Component = BlockRegistry[block.type];
  if (!Component) return null;

  // Render a Google Font globally if requested
  const fontFamily = block.data.fontFamily as string;
  const fontUrl = fontFamily ? `https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, "+")}:wght@300;400;500;600;700&display=swap` : null;

  return (
    <>
      {fontUrl && <link href={fontUrl} rel="stylesheet" />}
      <div
      ref={setNodeRef}
      style={{ ...style, fontFamily: fontFamily || "inherit" }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveBlock(block.id);
      }}
      className={`relative group ${block.data.className || ""}`}
    >
      {/* Floating Toolbar */}
      <div
        className={`absolute -top-11 left-0 bg-indigo-600 text-white rounded-md shadow-lg flex items-center gap-1 p-1 z-50 transition-all ${
          isActive || isDragging
            ? "opacity-100 visible"
            : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
        }`}
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab p-1.5 hover:bg-indigo-700 rounded"
        >
          <GripVertical size={14} />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeBlock(block.id);
          }}
          className="p-1.5 hover:bg-red-500 rounded"
        >
          <TrashIcon size={14} />
        </button>
      </div>

      <Resizable
        size={{ width: currentWidth, height: currentHeight }}
        minWidth={60}
        onResize={(_, __, ref) => {
          setLocalSize({
            width: ref.style.width,
            height: isText ? "auto" : ref.style.height,
          });
        }}
        onResizeStop={(_, __, ref) => {
          setLocalSize(null);
          updateBlock(block.id, {
            width: ref.style.width,
            height: isText ? "auto" : ref.style.height,
          });
        }}
        enable={{
          right: isActive,
          bottom: isActive && !isText,
          bottomRight: isActive && !isText,
        }}
        handleStyles={{
          right: {
            width: "30px",
            right: "-15px",
            zIndex: 60,
            display: isActive ? "flex" : "none",
            alignItems: "center",
            justifyContent: "center",
          },
          bottom: {
            height: "30px",
            bottom: "-15px",
            zIndex: 60,
            display: isActive && !isText ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          },
          bottomRight: {
            width: "20px",
            height: "20px",
            right: "-10px",
            bottom: "-10px",
            zIndex: 70,
            backgroundColor: "#6366f1",
            borderRadius: "50%",
            border: "2px solid white",
            display: isActive && !isText ? "block" : "none",
          },
        }}
        handleComponent={{
          right: (
            <div className="w-1.5 h-10 bg-indigo-400 rounded-full opacity-40 group-hover:opacity-100" />
          ),
          bottom: (
            <div className="h-1.5 w-10 bg-indigo-400 rounded-full opacity-40 group-hover:opacity-100" />
          ),
        }}
      >
        <div
          className={`w-full ${heightClass} rounded border-2 transition-colors relative flex flex-col ${
            isActive
              ? "border-indigo-500 shadow-md bg-white/50"
              : "border-transparent hover:border-slate-300"
          }`}
        >
          {/* Transparent overlay for ALL non-containers to catch clicks perfectly and prevent inner interaction issues */}
          {!isContainer && <div className="absolute inset-0 z-10" />}

          <div
            className={`w-full ${heightClass} ${isContainer ? "" : "pointer-events-none"} flex flex-col overflow-visible`}
          >
            <Component {...block.data} id={block.id} customClassName={block.data.className as string}>
              {block.children}
            </Component>
          </div>
        </div>
      </Resizable>
    </div>
    </>
  );
}
