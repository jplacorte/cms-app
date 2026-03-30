"use client";

import { ContainerSectionProps } from "@/lib/types";
import { EditorBlock } from "@/store/useEditorStore";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DynamicBlockWrapper from "../Editor/Wrappers/DynamicBlockWrapper";

function ContainerSectionEditor({
  id,
  bgColor = "#f8fafc",
  paddingY = 40,
  paddingX = 24,
  minHeight = "150px",
  direction = "column",
  gap = 16,
  borderRadius = "8px",
  alignItems = "center",
  justifyContent = "flex-start",
  borderWidth = 0,
  borderColor = "transparent",
  shadow = false,
  customClassName = "",
  children: nestedBlocks = [],
}: ContainerSectionProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `container-${id}`,
  });

  return (
    <section
      ref={setNodeRef}
      className={`relative ${customClassName}`}
      style={{
        backgroundColor: bgColor,
        padding: `${paddingY}px ${paddingX}px`,
        minHeight,
        display: "flex",
        flexDirection: direction as React.CSSProperties["flexDirection"],
        alignItems,
        justifyContent,
        gap: `${gap}px`,
        border: isOver ? "2px solid #22c55e" : `${borderWidth}px solid ${borderColor}`,
        borderRadius: borderRadius,
        boxShadow: shadow ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
        width: "100%",
        height: "100%",
        transition: "border 0.2s ease",
      }}
    >
      <SortableContext
        items={nestedBlocks.map((b) => b.id)}
        strategy={verticalListSortingStrategy}
      >
        {nestedBlocks.length === 0 ? (
          <p className="text-slate-400 text-sm pointer-events-none w-full text-center">
            Empty Section. Drop elements here.
          </p>
        ) : (
          nestedBlocks.map((child: EditorBlock) => (
            <DynamicBlockWrapper key={child.id} block={child} isEditor={true} />
          ))
        )}
      </SortableContext>
    </section>
  );
}

function ContainerSectionLive({
  bgColor = "#f8fafc",
  paddingY = 40,
  paddingX = 24,
  minHeight = "150px",
  direction = "column",
  gap = 16,
  borderRadius = "8px",
  alignItems = "center",
  justifyContent = "flex-start",
  borderWidth = 0,
  borderColor = "transparent",
  shadow = false,
  customClassName = "",
  children: nestedBlocks = [],
}: ContainerSectionProps) {
  return (
    <section
      className={`relative ${customClassName}`}
      style={{
        backgroundColor: bgColor,
        padding: `${paddingY}px ${paddingX}px`,
        minHeight,
        display: "flex",
        flexDirection: direction as React.CSSProperties["flexDirection"],
        alignItems,
        justifyContent,
        gap: `${gap}px`,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: borderRadius,
        boxShadow: shadow ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" : "none",
        width: "100%",
        height: "100%",
        transition: "border 0.2s ease",
      }}
    >
      {nestedBlocks.map((child: EditorBlock) => (
        <DynamicBlockWrapper key={child.id} block={child} isEditor={false} />
      ))}
    </section>
  );
}

export default function ContainerSection(props: ContainerSectionProps & { isEditor?: boolean }) {
  if (props.isEditor) return <ContainerSectionEditor {...props} />;
  return <ContainerSectionLive {...props} />;
}
