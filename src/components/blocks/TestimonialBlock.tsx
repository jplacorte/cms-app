import { TestimonialBlockProps } from "@/lib/types";

export default function TestimonialBlock({
  quote = '"This service transformed our business. Highly recommended!"',
  name = "Jane Doe",
  title = "CEO, Acme Corp",
  avatarUrl = "",
  bgColor = "#f8fafc",
  borderRadius = "16px",
  quoteColor = "#334155",
  nameColor = "#0f172a",
  titleColor = "#64748b",
}: TestimonialBlockProps) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius,
        padding: "40px 32px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          lineHeight: "1.7",
          color: quoteColor,
          fontStyle: "italic",
          maxWidth: "640px",
          margin: "0 auto 24px auto",
        }}
      >
        {quote}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={name}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: "700", fontSize: "15px", color: nameColor }}>{name}</div>
          <div style={{ fontSize: "13px", color: titleColor }}>{title}</div>
        </div>
      </div>
    </div>
  );
}
