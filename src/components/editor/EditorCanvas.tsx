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
import {
  ChevronDownIcon,
  ChevronUpIcon,
  GripVertical,
  TrashIcon,
} from "lucide-react";

// --- 1. The Sortable Item Component ---
// We extract the individual block into its own component so we can use the useSortable hook
function SortableBlock({
  block,
  index,
  totalBlocks,
}: {
  block: EditorBlock;
  index: number;
  totalBlocks: number;
}) {
  const { activeBlockId, moveBlock, removeBlock, setActiveBlock } =
    useEditorStore();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id });

  // Apply the CSS transforms calculated by dnd-kit
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  const Component = BlockRegistry[block.type];

  if (!Component) {
    return (
      <div className="p-4 bg-red-50 text-red-500 border border-red-200 rounded-lg">
        Unknown block type: {block.type}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      // Add the onClick handler here:
      onClick={() => setActiveBlock(block.id)}
      className={`group relative bg-white rounded-xl shadow-sm ring-1 ring-slate-200 transition-all ${
        isDragging
          ? "ring-2 ring-blue-500 shadow-lg opacity-80"
          : activeBlockId === block.id
            ? "ring-2 ring-indigo-500 shadow-md" // Highlight the active block!
            : "hover:ring-2 hover:ring-blue-400"
      }`}
    >
      {/* Drag Handle (Left side) */}
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-10 top-1/2 -translate-y-1/2 p-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={20} />
      </div>

      {/* Editor Controls (Right side - Visible on Hover) */}
      <div className="absolute -right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2 z-10">
        <button
          onClick={() => moveBlock(index, index - 1)}
          disabled={index === 0}
          className="p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-blue-600 disabled:opacity-50"
        >
          <ChevronUpIcon size={16} />
        </button>
        <button
          onClick={() => moveBlock(index, index + 1)}
          disabled={index === totalBlocks - 1}
          className="p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-blue-600 disabled:opacity-50"
        >
          <ChevronDownIcon size={16} />
        </button>
        <button
          onClick={() => removeBlock(block.id)}
          className="p-2 bg-white rounded-full shadow-md text-slate-400 hover:text-red-600"
        >
          <TrashIcon size={16} />
        </button>
      </div>

      {/* The Actual Rendered Block */}
      <div className="p-1 pointer-events-none">
        <Component {...block.data} />
      </div>
    </div>
  );
}

// --- 2. The Main Canvas Component ---
export default function EditorCanvas() {
  const { blocks, reorderBlocks } = useEditorStore();

  // Configure sensors for drag detection (Pointer for mouse/touch, Keyboard for accessibility)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Requires a 5px movement before dragging starts (prevents accidental clicks)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex((block) => block.id === active.id);
      const newIndex = blocks.findIndex((block) => block.id === over.id);
      reorderBlocks(oldIndex, newIndex);
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
      <div className="flex-1 overflow-y-auto bg-slate-100 p-8 pb-32 ml-8">
        {" "}
        {/* Added ml-8 to make room for drag handles */}
        <div className="max-w-5xl mx-auto space-y-4">
          <SortableContext
            items={blocks.map((b) => b.id)}
            strategy={verticalListSortingStrategy}
          >
            {blocks.map((block, index) => (
              <SortableBlock
                key={block.id}
                block={block}
                index={index}
                totalBlocks={blocks.length}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
}
