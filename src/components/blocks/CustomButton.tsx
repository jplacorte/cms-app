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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minHeight: "40px", // FIX: Prevents the button from collapsing to 0 height
        boxSizing: "border-box", // FIX: Keeps padding inside the bounding box
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
