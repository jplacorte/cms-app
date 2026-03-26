import { BlockRegistry } from "@/lib/block-map";

export default function GridContainer(props: any) {
  const nestedBlocks = props.children || [];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.columns || 2}, minmax(0, 1fr))`,
        gap: `${props.gap || 24}px`,
        padding: `${props.paddingY || 24}px 0px`,
        width: "100%",
      }}
    >
      {nestedBlocks.length === 0 ? (
        <div
          style={{ gridColumn: `span ${props.columns || 2}` }}
          className="p-8 border-2 border-dashed border-slate-300 rounded text-center text-slate-400 text-sm"
        >
          Empty Grid. Drop elements inside this grid to fill the columns.
        </div>
      ) : (
        nestedBlocks.map((child: any) => {
          const ChildComponent = BlockRegistry[child.type];
          return ChildComponent ? (
            <div key={child.id} style={{ minHeight: "50px" }}>
              <ChildComponent {...child.data} children={child.children} />
            </div>
          ) : null;
        })
      )}
    </div>
  );
}
