"use client";

import { useEditorStore } from "@/store/useEditorStore";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableBlock } from "./SortableBlock";

export default function EditorCanvas() {

  const { blocks, moveBlock } =
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
    moveBlock(active.id as string, overIdStr);
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
