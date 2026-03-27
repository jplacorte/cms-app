"use client";

import { TextBlockProps } from "@/lib/types";

export default function TextBlock({
  content = "New paragraph text",
  tag = "p",
  textColor = "#334155",
  fontSize = 16,
  fontWeight = "400",
  textAlign = "left",
  lineHeight = "1.6",
  letterSpacing = 0,
}: TextBlockProps) {
  const Tag = tag as keyof React.JSX.IntrinsicElements;

  return (
    <Tag
      style={{
        color: textColor,
        fontSize: `${fontSize}px`,
        fontWeight,
        textAlign: textAlign as React.CSSProperties["textAlign"],
        lineHeight,
        letterSpacing: `${letterSpacing}px`,
        width: "100%",
        display: "block",
        wordBreak: "break-word",
        whiteSpace: "normal",
        userSelect: "none",
      }}
    >
      {content}
    </Tag>
  );
}
