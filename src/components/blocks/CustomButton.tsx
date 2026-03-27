import { CustomButtonProps } from "@/lib/types";

export default function CustomButton({
  text = "Click Me",
  href = "#",
  bgColor = "#000000",
  textColor = "#ffffff",
  borderRadius = "4px",
  paddingX = 24,
  paddingY = 12,
  fontSize = 16,
  fontWeight = "600",
  borderWidth = 0,
  borderColor = "#000000",
}: CustomButtonProps) {
  return (
    <a
      href={href}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius,
        padding: `${paddingY}px ${paddingX}px`,
        fontSize: `${fontSize}px`,
        fontWeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "40px",
        boxSizing: "border-box",
        border: borderWidth
          ? `${borderWidth}px solid ${borderColor}`
          : "none",
        textDecoration: "none",
        transition: "opacity 0.2s ease",
      }}
    >
      {text}
    </a>
  );
}
