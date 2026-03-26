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
import { useEffect, useState } from "react";

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

  const isInline = block.type === "CustomButton";
  const isText = block.type === "TextBlock";
  const defaultWidth = isInline ? "auto" : "100%";

  const [size, setSize] = useState({
    width: block.data.width || defaultWidth,
    height: isText ? "auto" : block.data.height || "auto",
  });

  useEffect(() => {
    setSize({
      width: block.data.width || defaultWidth,
      height: isText ? "auto" : block.data.height || "auto",
    });
  }, [block.data.width, block.data.height, defaultWidth, isText]);

  const isActive = activeBlockId === block.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    width: size.width,
    height: isText ? "auto" : size.height,
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
      className={`group relative rounded select-none border-2 transition-colors ${
        isDragging
          ? "border-blue-500 z-50 shadow-2xl"
          : isActive
            ? "border-indigo-500 shadow-md"
            : "border-transparent hover:border-slate-300"
      }`}
    >
      {/* TOOLBAR: Moved to z-40 so handles (z-50) are always on top */}
      <div
        className={`absolute -top-11 left-0 bg-indigo-600 text-white rounded-md shadow-lg flex items-center gap-1 p-1 z-40 transition-all ${
          isActive || isDragging
            ? "opacity-100 visible"
            : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
        }`}
      >
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing p-1.5 hover:bg-indigo-700 rounded"
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

      <div className="w-full h-full relative">
        <Resizable
          size={{ width: size.width, height: isText ? "auto" : size.height }}
          minWidth={40} // Allows much more "free" movement than 150px
          onResize={(e, direction, ref, d) => {
            setSize({
              width: ref.style.width,
              height: isText ? "auto" : ref.style.height,
            });
          }}
          onResizeStop={(e, direction, ref, d) => {
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
            // INCREASED HIT AREA (20px) + VISIBLE INDICATOR
            right: {
              width: "20px",
              right: "-10px",
              cursor: "col-resize",
              zIndex: 50,
              display: isActive ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            },
            bottom: {
              height: "20px",
              bottom: "-10px",
              cursor: "row-resize",
              zIndex: 50,
              display: isActive && !isText ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
            },
            bottomRight: {
              width: "16px",
              height: "16px",
              right: "-8px",
              bottom: "-8px",
              zIndex: 51,
              backgroundColor: "#6366f1",
              borderRadius: "50%",
              border: "2px solid white",
              display: isActive && !isText ? "block" : "none",
            },
          }}
          // ADD VISIBLE LINES FOR THE HANDLES
          handleComponent={{
            right: (
              <div className="w-1 h-8 bg-indigo-400 rounded-full opacity-50 hover:opacity-100" />
            ),
            bottom: (
              <div className="h-1 w-8 bg-indigo-400 rounded-full opacity-50 hover:opacity-100" />
            ),
          }}
        >
          {/* THE ULTIMATE FIX: pointer-events-none on the inner wrapper kills all interference */}
          <div
            className={`w-full ${isText ? "h-auto" : "h-full"} pointer-events-none flex flex-col overflow-visible`}
          >
            <Component
              {...block.data}
              id={block.id}
              children={block.children}
            />
          </div>
        </Resizable>
      </div>
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
