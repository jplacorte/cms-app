import { ImageBlockProps } from "@/lib/types";

export default function ImageBlock({
  src,
  alt = "Placeholder image",
  borderRadius = "0px",
  objectFit = "cover",
  boxShadow = false,
  align = "center",
}: ImageBlockProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: align,
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={
          src ||
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
        }
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          borderRadius,
          objectFit: objectFit as React.CSSProperties["objectFit"],
          boxShadow: boxShadow
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1)"
            : "none",
        }}
      />
    </div>
  );
}
