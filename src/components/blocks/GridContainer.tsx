import { BlockRegistry } from "@/lib/block-map";
import { GridContainerProps } from "@/lib/types";
import { EditorBlock } from "@/store/useEditorStore";

export default function GridContainer({
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
  children: nestedBlocks = [],
}: GridContainerProps) {
  return (
    <div
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
      }}
    >
      {nestedBlocks.length === 0 ? (
        <div
          style={{ gridColumn: `span ${columns}` }}
          className="p-8 border-2 border-dashed border-slate-300 rounded text-center text-slate-400 text-sm"
        >
          Empty Grid. Drop elements inside this grid to fill the columns.
        </div>
      ) : (
        nestedBlocks.map((child: EditorBlock) => {
          const ChildComponent = BlockRegistry[child.type];
          return ChildComponent ? (
            <div key={child.id} style={{ minHeight: "50px" }}>
              <ChildComponent {...child.data}>
                {child.children}
              </ChildComponent>
            </div>
          ) : null;
        })
      )}
    </div>
  );
}
