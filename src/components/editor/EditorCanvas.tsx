"use client";

import { BlockRegistry } from "@/lib/block-map";
import { EditorBlock, useEditorStore } from "@/store/useEditorStore";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, TrashIcon } from "lucide-react";
import { Resizable } from "re-resizable";
import { useState } from "react";

function SortableBlock({ block }: { block: EditorBlock }) {
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
  const isActive = activeBlockId === block.id;

  // Local state for smooth real-time resizing preview
  const [localSize, setLocalSize] = useState<{ width: string | number; height: string | number } | null>(null);

  const currentWidth = localSize?.width ?? ((block.data.width as string | number) || (block.type === "CustomButton" ? "auto" : "100%"));
  const currentHeight = isText ? "auto" : (localSize?.height ?? ((block.data.height as string | number) || "auto"));

  // THE FIX: The outer wrapper handles position (dnd-kit) but NOT size
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    width: "100%", // Let it span the container
  };

  const Component = BlockRegistry[block.type];
  if (!Component) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        setActiveBlock(block.id);
      }}
      className="group relative"
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
          className={`w-full h-full rounded border-2 transition-colors ${
            isActive
              ? "border-indigo-500 shadow-md bg-white/50"
              : "border-transparent hover:border-slate-300"
          }`}
        >
          <div
            className={`w-full ${isText ? "h-auto" : "h-full"} pointer-events-none flex flex-col overflow-visible`}
          >
            <Component {...block.data} id={block.id}>
              {block.children}
            </Component>
          </div>
        </div>
      </Resizable>
    </div>
  );
}

export default function EditorCanvas() {
  const { blocks, reorderBlocks, moveBlockBetweenContainers } =
    useEditorStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const overIdStr = String(over.id);

    // Drop into a specific container
    if (overIdStr.startsWith("container-")) {
      const targetContainerId = overIdStr.replace("container-", "");
      moveBlockBetweenContainers(active.id as string, targetContainerId);
      return;
    }

    // Standard reordering
    const oldIndex = blocks.findIndex((block) => block.id === active.id);
    const newIndex = blocks.findIndex((block) => block.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      reorderBlocks(null, oldIndex, newIndex);
    }
  };

  if (blocks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl m-8 p-12 text-slate-400">
        <p className="text-lg font-medium">Your canvas is empty</p>
        <p className="text-sm">
          Select a block from the sidebar to start building.
        </p>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      {/* CANVAS PADDING FIX: Increased top padding (p-12) so the new outside-toolbar never gets cut off by the top of the screen */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-12 pb-32 ml-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.map((block) => (
              <SortableBlock key={block.id} block={block} />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
