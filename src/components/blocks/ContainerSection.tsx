import { BlockRegistry } from "@/lib/block-map";

export default function ContainerSection(props: any) {
  // If this container has blocks nested inside it, they are passed down here
  const nestedBlocks = props.children || [];

  return (
    <section
      style={{
        backgroundColor: props.bgColor || "#f8fafc",
        padding: `${props.paddingY || 64}px ${props.paddingX || 24}px`,
        minHeight: props.minHeight || "200px",
        display: "flex",
        flexDirection: props.direction || "column",
        alignItems: props.alignItems || "center",
        justifyContent: props.justifyContent || "flex-start",
        gap: `${props.gap || 16}px`,
        borderRadius: props.borderRadius || "0px",
        border: props.borderWidth
          ? `${props.borderWidth}px dashed ${props.borderColor}`
          : "none",
      }}
    >
      {nestedBlocks.length === 0 ? (
        <p className="text-slate-400 text-sm border-2 border-dashed border-slate-300 p-8 rounded">
          Empty Section. Drag elements here.
        </p>
      ) : (
        nestedBlocks.map((child: any) => {
          const ChildComponent = BlockRegistry[child.type];
          return ChildComponent ? (
            <ChildComponent
              key={child.id}
              {...child.data}
              children={child.children}
            />
          ) : null;
        })
      )}
    </section>
  );
}
