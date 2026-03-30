import { SpacerBlockProps } from "@/lib/types";

export default function SpacerBlock({ height = 40 }: SpacerBlockProps) {
  return (
    <div
      style={{
        height: `${height}px`,
        width: "100%",
      }}
      aria-hidden="true"
    />
  );
}
