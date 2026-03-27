import { CardBlockProps } from "@/lib/types";

export default function CardBlock({
  imageUrl,
  imageHeight = "200px",
  title,
  description,
  linkText,
  linkUrl = "#",
  bgColor = "#ffffff",
  borderColor = "#e2e8f0",
  borderRadius = "16px",
  shadow = false,
  titleColor = "#0f172a",
  descriptionColor = "#64748b",
  linkColor = "#2563eb",
}: CardBlockProps) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius,
        overflow: "hidden",
        border: `1px solid ${borderColor}`,
        width: "100%",
        boxShadow: shadow ? "0 4px 12px rgba(0,0,0,0.08)" : "none",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title || "Card image"}
          style={{
            width: "100%",
            height: imageHeight,
            objectFit: "cover",
          }}
        />
      )}
      <div style={{ padding: "24px" }}>
        {title && (
          <h3
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: titleColor,
              margin: 0,
              marginBlockEnd: "8px",
            }}
          >
            {title}
          </h3>
        )}
        {description && (
          <p
            style={{
              fontSize: "14px",
              lineHeight: "1.6",
              color: descriptionColor,
              margin: 0,
              marginBlockEnd: linkText ? "16px" : "0",
            }}
          >
            {description}
          </p>
        )}
        {linkText && (
          <a
            href={linkUrl}
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: linkColor,
              textDecoration: "none",
            }}
          >
            {linkText} →
          </a>
        )}
      </div>
    </div>
  );
}
