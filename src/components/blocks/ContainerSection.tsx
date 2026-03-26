import { BlockRegistry } from "@/lib/block-map";
import { useDroppable } from "@dnd-kit/core";

export default function ContainerSection(props: any) {
  // 1. Register this specific section as a valid drop zone!
  const { isOver, setNodeRef } = useDroppable({
    id: `container-${props.id}`,
  });

  const nestedBlocks = props.children || [];
  return (
    <section
      ref={setNodeRef}
      style={{
        backgroundColor: props.bgColor || "#f8fafc",
        padding: `${props.paddingY || 40}px ${props.paddingX || 24}px`,
        minHeight: props.minHeight || "150px",
        display: "flex",
        flexDirection: props.direction || "column",
        alignItems: props.alignItems || "center",
        justifyContent: props.justifyContent || "flex-start",
        gap: `${props.gap || 16}px`,
        border: isOver ? "2px solid #22c55e" : "2px dashed #cbd5e1",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
        transition: "border 0.2s ease",
      }}
    >
      {nestedBlocks.length === 0 ? (
        <p className="text-slate-400 text-sm pointer-events-none">
          Empty Section. Drop elements here.
        </p>
      ) : (
        nestedBlocks.map((child: any) => {
          const ChildComponent = BlockRegistry[child.type];
          return ChildComponent ? (
            <div key={child.id} className="w-full relative z-10">
              <ChildComponent
                {...child.data}
                id={child.id}
                children={child.children}
              />
            </div>
          ) : null;
        })
      )}
    </section>
  );
}
