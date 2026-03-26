export default function CustomButton(props: any) {
  return (
    <a
      href={props.href || "#"}
      style={{
        backgroundColor: props.bgColor || "#000000",
        color: props.textColor || "#ffffff",
        borderRadius: props.borderRadius || "4px",
        padding: `${props.paddingY || 12}px ${props.paddingX || 24}px`,
        fontSize: `${props.fontSize || 16}px`,
        display: "inline-block",
        textAlign: "center",
        border: props.borderWidth
          ? `${props.borderWidth}px solid ${props.borderColor}`
          : "none",
        textDecoration: "none",
      }}
    >
      {props.text || "Click Me"}
    </a>
  );
}
