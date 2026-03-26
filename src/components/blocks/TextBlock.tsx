export default function TextBlock(props: any) {
  const Tag = props.tag || "p";

  return (
    <Tag
      style={{
        color: props.textColor || "#334155",
        fontSize: `${props.fontSize || 16}px`,
        fontWeight: props.fontWeight || "400",
        textAlign: props.textAlign || "left",
        lineHeight: props.lineHeight || "1.6",
        margin: props.margin || "0px",
        width: "100%",
        display: "block",
        wordBreak: "break-word",
        whiteSpace: "normal",
        userSelect: "none", // FIX: Prevents that blue highlight from blocking you
      }}
    >
      {props.content || "New paragraph text"}
    </Tag>
  );
}
