import { DividerBlockProps } from "@/lib/types";

export default function DividerBlock({
  width = 100,
  thickness = 1,
  style = "solid",
  color = "#e2e8f0",
  paddingY = 16,
}: DividerBlockProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: `${paddingY}px 0`,
        width: "100%",
      }}
    >
      <hr
        style={{
          width: `${width}%`,
          border: "none",
          borderTop: `${thickness}px ${style} ${color}`,
          margin: 0,
        }}
      />
    </div>
  );
}
