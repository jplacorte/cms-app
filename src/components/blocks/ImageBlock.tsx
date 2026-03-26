export default function ImageBlock(props: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: props.align || "center",
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src={
          props.src ||
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop"
        }
        alt={props.alt || "Placeholder image"}
        style={{
          width: "100%", // Changed to 100% to fill the Resizable wrapper
          height: "100%", // Changed to 100% to fill the Resizable wrapper
          borderRadius: props.borderRadius || "0px",
          objectFit: "cover", // Ensures the image crops beautifully as you resize the box
          boxShadow: props.boxShadow
            ? "0 10px 15px -3px rgb(0 0 0 / 0.1)"
            : "none",
        }}
      />
    </div>
  );
}
