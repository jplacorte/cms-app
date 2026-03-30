"use client";

import { GridContainerProps } from "@/lib/types";
import { EditorBlock } from "@/store/useEditorStore";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import DynamicBlockWrapper from "../Editor/Wrappers/DynamicBlockWrapper";

function GridContainerEditor({
  columns = 2,
  gap = 24,
  paddingY = 24,
  paddingX = 0,
  bgColor = "transparent",
  borderRadius = "0px",
  alignItems = "stretch",
  borderWidth = 0,
  borderColor = "transparent",
  shadow = false,
  customClassName = "",
  children: nestedBlocks = [],
  id,
}: GridContainerProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `container-${id}`,
  });

  return (
    <div
      ref={setNodeRef}
      className={customClassName}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        padding: `${paddingY}px ${paddingX}px`,
        alignItems,
        width: "100%",
        backgroundColor: bgColor,
        borderRadius,
        border: isOver ? "2px solid #22c55e" : `${borderWidth}px solid ${borderColor}`,
        boxShadow: shadow ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
        transition: "border 0.2s ease",
      }}
    >
      <SortableContext items={nestedBlocks.map((b) => b.id)} strategy={rectSortingStrategy}>
        {nestedBlocks.length === 0 ? (
          <div
            style={{ gridColumn: `span ${columns}` }}
            className="p-8 border-2 border-dashed border-slate-300 rounded text-center text-slate-400 text-sm"
          >
            Empty Grid. Drop elements inside this grid to fill the columns.
          </div>
        ) : (
          nestedBlocks.map((child: EditorBlock) => (
            <div key={child.id} style={{ minHeight: "50px", width: "100%" }}>
              <DynamicBlockWrapper block={child} isEditor={true} />
            </div>
          ))
        )}
      </SortableContext>
    </div>
  );
}

function GridContainerLive({
  columns = 2,
  gap = 24,
  paddingY = 24,
  paddingX = 0,
  bgColor = "transparent",
  borderRadius = "0px",
  alignItems = "stretch",
  borderWidth = 0,
  borderColor = "transparent",
  shadow = false,
  customClassName = "",
  children: nestedBlocks = [],
}: GridContainerProps) {
  return (
    <div
      className={customClassName}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
        padding: `${paddingY}px ${paddingX}px`,
        alignItems,
        width: "100%",
        backgroundColor: bgColor,
        borderRadius,
        border: `${borderWidth}px solid ${borderColor}`,
        boxShadow: shadow ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
        transition: "border 0.2s ease",
      }}
    >
      {nestedBlocks.map((child: EditorBlock) => (
        <div key={child.id} style={{ width: "100%" }}>
          <DynamicBlockWrapper block={child} isEditor={false} />
        </div>
      ))}
    </div>
  );
}

export default function GridContainer(props: GridContainerProps & { isEditor?: boolean }) {
  if (props.isEditor) return <GridContainerEditor {...props} />;
  return <GridContainerLive {...props} />;
}
